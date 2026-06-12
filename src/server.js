/**
 * Bridge Backend Server
 *
 * Multi-tenant API server. Merchants register, configure their
 * Stripe + PayPal keys, and trigger syncs via the Stripe App UI.
 *
 * Run: npm start   (node src/server.js)
 */
import express from 'express';
import path from 'path';
import cors from 'cors';
import 'dotenv/config';
import * as Sentry from '@sentry/node';
import { config } from './config.js';
import Stripe from 'stripe';
import { pushPaymentRecord, pushRefundRecord, testConnection as testStripe } from './connectors/stripe.js';
import { fetchTransactions, testConnection as testPaypal } from './connectors/paypal.js';
import { runSync, processRefund } from './sync/engine.js';
import { startScheduler, runMerchantSync } from './sync/scheduler.js';
import { setupWebUI } from './web-ui.js';

// Initialize Sentry error tracking
if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV || 'production',
    tracesSampleRate: 0.1,
  });
  console.log('✅ Sentry error tracking initialized');
} else {
  console.warn('⚠️  SENTRY_DSN not set — error tracking disabled');
}
import {
  createMerchant,
  getMerchant,
  getMerchantByApiKey,
  getMerchantBySubscriptionId,
  getMerchantByPaddleSubscriptionId,
  getMerchantByStripeAccountId,
  updateMerchantCredentials,
  getAllMerchants,
  getAllMerchantsSummary,
  getState,
  initDatabase,
  getRecentErrors,
  getAllSyncedIds,
  getAllSyncedRefunds,
  closeDatabase,
  canSync,
  startTrialIfNeeded,
  getSubscription,
  updateSubscription,
  getSyncHistory,
  getTotalRevenueSynced,
  createOAuthState,
  consumeOAuthState,
  updateMerchantStripeOAuth,
} from './sync/state.js';

import rateLimit from 'express-rate-limit';
import compression from 'compression';

const app = express();
app.set('trust proxy', 1);  // Render sits behind a proxy — trust X-Forwarded-For for rate limiting
app.use(compression({ threshold: 0 }));  // gzip all responses (threshold 0 = compress everything)
app.use(cors());
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Serve static files from /public directory (og-image.png, etc.)
app.use(express.static(path.join(process.cwd(), 'public'), { maxAge: '1h' }));

// Sentry request handler — auto-integrated via expressIntegration in v10

/**
 * Map an error to a user-friendly message.
 * Hides implementation details, shows actionable guidance.
 */
function friendlyError(err, context = '') {
  const msg = err?.message || err || 'Unknown error';
  const lower = msg.toLowerCase();

  if (msg.includes('fetch failed') || msg.includes('ENOTFOUND') || msg.includes('ECONNREFUSED') || msg.includes('ETIMEDOUT')) {
    return 'Network error — could not reach the service. Check your internet connection and try again.';
  }
  if (lower.includes('401') || lower.includes('unauthorized') || lower.includes('invalid api key')) {
    return 'Invalid API key. Go to Settings to find your key, or register a new account.';
  }
  if (lower.includes('402') || lower.includes('subscription required') || lower.includes('payment required')) {
    return 'Subscription required. Your free trial has ended. Visit Pricing to subscribe.';
  }
  if (lower.includes('stripe')) {
    if (lower.includes('401') || lower.includes('unauthorized')) return 'Stripe rejected the request — your secret key may be invalid. Check your Stripe dashboard and update the key.';
    if (lower.includes('rate limit')) return 'Stripe rate limit reached. Waiting before retrying automatically.';
    return `Stripe error: ${msg.substring(0, 120)}. Verify your Stripe key is correct and has the required permissions.`;
  }
  if (lower.includes('paypal')) {
    if (lower.includes('401') || lower.includes('unauthorized')) return 'PayPal rejected the credentials — your Client ID or Secret may be incorrect. Update them in Settings.';
    return `PayPal error: ${msg.substring(0, 120)}. Check your PayPal API credentials.`;
  }
  if (lower.includes('not found') || lower.includes('does not exist')) {
    return 'The requested resource was not found. It may have been removed or the URL may be incorrect.';
  }

  // Default: truncate raw error to 150 chars for safety
  return msg.substring(0, 150);
}

// Rate limiting to prevent abuse / brute-force
const registerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 10,
  message: { error: 'Too many registrations. Try again later.' },
});

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Too many requests. Slow down.' },
});

// Apply rate limiters to specific routes
app.use('/api/register', registerLimiter);
app.use('/api/configure', apiLimiter);
app.use('/api/sync', apiLimiter);

// ── Auth Middleware ──────────────────────────────────────────────
// POST endpoints (sync, refund, configure) require auth.
// GET endpoints (status, configure, synced-ids, refunds) work without
// auth for the Stripe App UI to show before registration.
async function authRequired(req, res, next) {
  try {
    // Skip auth for register, root status, web UI, webhooks, and OAuth callback
    if (req.path === '/api/register' && req.method === 'POST') return next();
    if (req.path === '/' && req.method === 'GET') return next();
    if (req.path === '/app') return next();
    if (req.path === '/api/stripe-webhook') return next();
    if (req.path === '/api/paddle-webhook') return next();
    if (req.path === '/api/lemonsqueezy-webhook') return next();
    if (req.path === '/api/stripe/oauth/callback') return next();
    if (req.path.startsWith('/audit/')) return next();
    if (req.path === '/api/audit/run' && req.method === 'POST') return next();

    // Parse API key from Authorization header or ?key= query param
    const authHeader = req.headers.authorization || '';
    const apiKey = (authHeader.replace(/^Bearer\s+/i, '').trim()) || (req.query.key || '').trim();

    // No API key provided — allow through for GET requests (handlers will show unauthenticated state)
    if (!apiKey) {
      if (req.method === 'GET') return next();
      return res.status(401).json({ error: 'Missing Authorization header. Use: Bearer <your_api_key>' });
    }

    // Master key bypass (for debugging / admin)
    if (config.masterKey && apiKey === config.masterKey) {
      req.merchant = null;
      req.isMaster = true;
      return next();
    }

    const merchant = await getMerchantByApiKey(apiKey);
    if (!merchant) {
      // Allow GET through without auth (handlers will show unauthenticated state)
      if (req.method === 'GET') return next();
      return res.status(401).json({ error: 'Invalid API key. Register at POST /api/register first.' });
    }

    req.merchant = merchant;
    req.isMaster = false;
    next();
  } catch (err) {
    res.status(500).json({ error: friendlyError(err, 'auth') });
  }
}
app.use(authRequired);

// ── Start the sync scheduler ────────────────────────────────────
const scheduler = startScheduler({
  onSyncStart: () => console.log('⏰ Scheduled sync started'),
  onSyncComplete: (result) => {
    console.log(`⏰ Scheduled sync done: ${result.pushed} pushed, ${result.skipped} skipped`);
  },
});

// ── External cron trigger (for Render free tier — app sleeps) ───
// cron-job.org hits this endpoint daily to wake the app + trigger sync.
// Requires CRON_SECRET env var.
const CRON_SECRET = process.env.CRON_SECRET || 'change-me-in-production';
app.get('/api/cron/sync', async (req, res) => {
  if (req.query.key !== CRON_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  console.log('⏰ Cron-triggered sync starting...');
  const merchants = (await getAllMerchants()).filter(m => m.stripe_key && m.paypal_client_id && m.paypal_client_secret);
  if (merchants.length === 0) {
    return res.json({ pushed: 0, skipped: 0, errors: 0, message: 'No merchants configured' });
  }
  let totalPushed = 0;
  let totalSkipped = 0;
  let totalErrors = 0;
  for (const merchant of merchants) {
    const { allowed } = await canSync(merchant.id);
    if (!allowed) continue;
    try {
      const result = await runMerchantSync(merchant);
      totalPushed += result.pushed;
      totalSkipped += result.skipped;
      totalErrors += result.errors;
    } catch (err) {
      console.error(`   ❌ Cron sync failed for ${merchant.id}: ${err.message}`);
      await addSyncError(`Cron-triggered sync failed: ${err.message}`, null, merchant.id);
      totalErrors++;
    }
  }
  console.log(`⏰ Cron-triggered sync: ${totalPushed} pushed, ${totalSkipped} skipped, ${totalErrors} errors`);
  res.json({ pushed: totalPushed, skipped: totalSkipped, errors: totalErrors });
});

// ── Routes ──────────────────────────────────────────────────────

// Static legal pages (for Paddle verification) — cache for 1 hour
import fs from 'fs';
const LEGAL_DIR = path.join(process.cwd(), 'src', 'pages');
const LEGAL_CACHE = { maxAge: '1h' };

function serveLegalPage(res, filename) {
  res.set('Cache-Control', 'public, max-age=3600');
  const filePath = path.join(LEGAL_DIR, filename);
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send('Page not found');
  }
}
app.get('/terms-of-service', (req, res) => serveLegalPage(res, 'terms.html'));
app.get('/privacy-policy', (req, res) => serveLegalPage(res, 'privacy.html'));
app.get('/refund-policy', (req, res) => serveLegalPage(res, 'refund.html'));

/**
 * GET /
 * Root landing page.
 */
app.get('/', (req, res) => {
  res.redirect('/audit/');
});

/**
 * POST /api/register
 * Create a new merchant account. Returns an API key.
 * Body: { displayName?: string }
 */
app.post('/api/register', async (req, res) => {
  try {
    const displayName = req.body?.displayName || 'Stripe App User';
    const merchant = await createMerchant(displayName);
    res.status(201).json({
      merchantId: merchant.id,
      apiKey: merchant.api_key,
      displayName: merchant.display_name,
      message: 'Save your API key — you will not see it again. Use it in the Authorization header.',
    });
  } catch (err) {
    res.status(500).json({ error: friendlyError(err, 'register') });
  }
});

/**
 * GET /api/configure
 * Get current merchant configuration (redacted).
 */
app.get('/api/configure', async (req, res) => {
  try {
    // Unauthenticated
    if (!req.merchant) {
      return res.json({ needsAuth: true, message: 'Register at POST /api/register to get your API key.' });
    }

    if (req.isMaster) {
      const merchants = await getAllMerchants();
      return res.json({ merchants: merchants.map(m => ({
        id: m.id,
        displayName: m.display_name,
        stripeConfigured: !!m.stripe_key,
        paypalConfigured: !!(m.paypal_client_id && m.paypal_client_secret),
        paypalEnvironment: m.paypal_environment,
        createdAt: m.created_at,
      }))});
    }

    const m = req.merchant;
    res.json({
      merchantId: m.id,
      displayName: m.display_name,
      stripeConfigured: !!m.stripe_key,
      paypalConfigured: !!(m.paypal_client_id && m.paypal_client_secret),
      paypalEnvironment: m.paypal_environment,
    });
  } catch (err) {
    res.status(500).json({ error: friendlyError(err, 'configure') });
  }
});

/**
 * POST /api/configure
 * Update merchant credentials.
 * Body: { stripeKey?, paypalClientId?, paypalClientSecret?, paypalEnvironment? }
 */
app.post('/api/configure', async (req, res) => {
  if (req.isMaster) {
    return res.status(400).json({ error: 'Master key cannot configure. Register as a merchant first.' });
  }

  const merchant = req.merchant;
  const { stripeKey, paypalClientId, paypalClientSecret, paypalEnvironment } = req.body || {};

  const updates = {};
  // Use hasOwnProperty-style check so empty strings explicitly clear credentials
  if (stripeKey !== undefined) updates.stripe_key = stripeKey;
  if (paypalClientId !== undefined) updates.paypal_client_id = paypalClientId;
  if (paypalClientSecret !== undefined) updates.paypal_client_secret = paypalClientSecret;
  if (paypalEnvironment !== undefined) updates.paypal_environment = paypalEnvironment;

  // If Stripe or PayPal creds were provided, test them before saving
  if (stripeKey) {
    try {
      const stripeInfo = await testStripe(stripeKey);
      console.log(`   ✅ Merchant ${merchant.id}: Stripe connected (${stripeInfo.accountId})`);

      // Check if this Stripe account was previously registered by a different merchant
      // whose trial has already expired (prevents free reuse via re-registration)
      const existingMerchant = await getMerchantByStripeAccountId(stripeInfo.accountId);
      if (existingMerchant && existingMerchant.id !== merchant.id) {
        const existingSub = await getSubscription(existingMerchant.id);
        if (existingSub && !existingSub.active) {
          console.log(`   ⛔ Merchant ${merchant.id}: Stripe account ${stripeInfo.accountId} already used by expired merchant ${existingMerchant.id}`);
          return res.status(400).json({
            error: 'This Stripe account has already used its free trial. Each Stripe account is eligible for one trial only.',
            hint: 'Subscribe at $49/mo to continue using Bridge with this Stripe account, or use a different Stripe account.',
          });
        }
        // If existing merchant's subscription is still active, they're paying — that's fine
      }

      updates.stripe_account_id = stripeInfo.accountId;
    } catch (err) {
      return res.status(400).json({
        error: `Stripe key invalid: ${err.message}`,
        hint: 'Make sure you are using a live or test secret key (starts with sk_live_ or sk_test_).',
      });
    }
  }

  if (paypalClientId && paypalClientSecret) {
    try {
      const paypalInfo = await testPaypal({
        clientId: paypalClientId,
        clientSecret: paypalClientSecret,
        environment: paypalEnvironment || merchant.paypal_environment,
      });
      console.log(`   ✅ Merchant ${merchant.id}: PayPal connected (${paypalInfo.email || paypalInfo.userId})`);
    } catch (err) {
      return res.status(400).json({
        error: `PayPal credentials invalid: ${err.message}`,
        hint: 'Make sure your Client ID and Secret are from the correct environment (sandbox vs live).',
      });
    }
  }

  const updated = await updateMerchantCredentials(merchant.id, updates);

  // Start 7-day trial on first successful configuration (not on registration)
  // This gives merchants the full 7 days after they first set up their keys
  const actuallyConfigured = !!(stripeKey || (paypalClientId && paypalClientSecret));
  if (actuallyConfigured) {
    await startTrialIfNeeded(merchant.id);
  }

  res.json({
    success: true,
    merchantId: updated.id,
    stripeConfigured: !!updated.stripe_key,
    paypalConfigured: !!(updated.paypal_client_id && updated.paypal_client_secret),
    paypalEnvironment: updated.paypal_environment,
  });
});

/**
 * GET /api/status
 * Returns connection and sync status.
 * Works without auth (returns generic status) or with auth (returns merchant status).
 */
app.get('/api/status', async (req, res) => {
  try {
    // Unauthenticated — return generic status (for old v0.1.0 UI compatibility)
    if (!req.merchant) {
      return res.json({
        merchant: null,
        stripe: { connected: false },
        paypal: { connected: false },
        sync: { lastSyncAt: null, totalSynced: 0, errors: [] },
        scheduler: { schedule: scheduler.schedule, running: true },
        needsAuth: true,
        message: 'Register at POST /api/register to get your API key.',
      });
    }

    let stripeInfo = null;
    let paypalInfo = null;

    if (req.merchant?.stripe_key) {
      stripeInfo = await testStripe(req.merchant.stripe_key);
    }

    if (req.merchant?.paypal_client_id && req.merchant?.paypal_client_secret) {
      paypalInfo = await testPaypal({
        clientId: req.merchant.paypal_client_id,
        clientSecret: req.merchant.paypal_client_secret,
        environment: req.merchant.paypal_environment,
      });
    }

    const merchantId = req.merchant?.id || '';
    const syncState = await getState(merchantId);

    res.json({
      merchant: {
        id: req.merchant?.id || null,
        displayName: req.merchant?.display_name || null,
      },
      stripe: stripeInfo ? { connected: true, accountId: stripeInfo.accountId } : { connected: false },
      paypal: paypalInfo ? { connected: true, email: paypalInfo.email } : { connected: false },
      sync: {
        lastSyncAt: syncState.lastSyncAt,
        totalSynced: syncState.totalSynced,
        errors: await getRecentErrors(5, merchantId),
      },
      scheduler: {
        schedule: scheduler.schedule,
        running: true,
      },
    });
  } catch (err) {
    res.status(500).json({ error: friendlyError(err, 'status') });
  }
});

/**
 * POST /api/sync
 * Trigger a manual sync for the authenticated merchant.
 */
app.post('/api/sync', async (req, res) => {
  if (req.isMaster) {
    return res.status(400).json({ error: 'Master key cannot sync. Register as a merchant first.' });
  }

  const merchant = req.merchant;
  if (!merchant.stripe_key) {
    return res.status(400).json({ error: 'Stripe not configured. POST /api/configure with your Stripe key first.' });
  }
  if (!merchant.paypal_client_id || !merchant.paypal_client_secret) {
    return res.status(400).json({ error: 'PayPal not configured. POST /api/configure with your PayPal keys first.' });
  }

  // Check subscription
  const { allowed, reason } = await canSync(merchant.id);
  if (!allowed) {
    return res.status(402).json({
      error: 'Subscription required',
      detail: reason,
      subscribe: `${BASE_URL}/app#pricing`,
    });
  }

  try {
    const result = await runSync({
      merchant,
      startDate: req.body?.startDate,
      endDate: req.body?.endDate,
    });

    res.json({
      success: true,
      transactionsFound: result.total,
      pushed: result.pushed,
      skipped: result.skipped,
      errors: result.errors,
      recordIds: result.recordIds.slice(0, 20),
    });
  } catch (err) {
    res.status(500).json({ error: friendlyError(err, 'sync') });
  }
});

/**
 * GET /api/sync-history
 * Return sync history + total revenue for the authenticated merchant.
 */
app.get('/api/sync-history', async (req, res) => {
  if (req.isMaster) {
    return res.status(400).json({ error: 'Master key has no sync history. Register as a merchant first.' });
  }

  const merchantId = req.merchant?.id;
  if (!merchantId) {
    return res.json({ history: [], totalRevenueCents: 0, totalRevenueFormatted: '$0.00' });
  }

  try {
    const [history, totalRevenueCents] = await Promise.all([
      getSyncHistory(merchantId, 30),
      getTotalRevenueSynced(merchantId),
    ]);

    res.json({
      history,
      totalRevenueCents,
      totalRevenueFormatted: '$' + (totalRevenueCents / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    });
  } catch (err) {
    res.status(500).json({ error: friendlyError(err, 'sync-history') });
  }
});

/**
 * POST /api/refund
 * Record a refund for a previously-synced payment.
 */
app.post('/api/refund', async (req, res) => {
  if (req.isMaster) {
    return res.status(400).json({ error: 'Master key cannot refund. Register as a merchant first.' });
  }

  const { processorTxnId, paymentProcessorTxnId, amount, currency, initiatedAt, processorName } = req.body || {};

  if (!processorTxnId || !paymentProcessorTxnId || !amount || !currency) {
    return res.status(400).json({ error: 'Missing required fields. Provide: processorTxnId, paymentProcessorTxnId, amount, currency.' });
  }

  try {
    const result = await processRefund({
      processorTxnId,
      paymentProcessorTxnId,
      amount,
      currency: currency.toLowerCase(),
      initiatedAt: initiatedAt || Math.floor(Date.now() / 1000),
      processorName: processorName || 'paypal',
      merchant: req.merchant,
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: friendlyError(err, 'refund') });
  }
});

/**
 * GET /api/synced-ids
 * List synced transaction IDs.
 */
app.get('/api/synced-ids', async (req, res) => {
  try {
    const processor = req.query.processor || 'paypal';
    const merchantId = req.merchant?.id || '';
    const ids = await getAllSyncedIds(processor, merchantId);
    res.json({ processor, count: ids.length, transactions: ids });
  } catch (err) {
    res.status(500).json({ error: friendlyError(err, 'synced-ids') });
  }
});

/**
 * GET /api/refunds
 * List synced refunds.
 */
app.get('/api/refunds', async (req, res) => {
  try {
    const merchantId = req.merchant?.id || '';
    const refunds = await getAllSyncedRefunds(20, merchantId);
    res.json({ count: refunds.length, refunds });
  } catch (err) {
    res.status(500).json({ error: friendlyError(err, 'refunds') });
  }
});

// ── Graceful shutdown ───────────────────────────────────────────
async function shutdown(signal) {
  console.log(`\n🛑 ${signal} received. Shutting down...`);
  scheduler.stop();
  await closeDatabase();
  process.exit(0);
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

// ── Static assets ───────────────────────────────────────────────

/**
 * GET /og-image.png
 * Minimal Open Graph image for social sharing.
 * Returns an SVG-based image (most crawlers accept it).
 * Replace with a real 1200x630 PNG for production.
 */
app.get('/og-image.png', (req, res) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#4f46e5"/>
        <stop offset="100%" style="stop-color:#7c3aed"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#bg)"/>
    <text x="80" y="280" font-family="Inter, -apple-system, sans-serif" font-size="64" font-weight="800" fill="#ffffff">Bridge</text>
    <text x="80" y="360" font-family="Inter, -apple-system, sans-serif" font-size="36" font-weight="500" fill="rgba(255,255,255,0.85)">Sync PayPal to Stripe Revenue Recognition</text>
    <text x="80" y="430" font-family="Inter, -apple-system, sans-serif" font-size="24" font-weight="400" fill="rgba(255,255,255,0.6)">PayPal income doesn't show in Stripe. Bridge makes it show up.</text>
  </svg>`;
  res.set('Content-Type', 'image/svg+xml');
  res.set('Cache-Control', 'public, max-age=3600');
  res.send(svg);
});

// ── Billing / Subscription routes ───────────────────────────────

/**
 * GET /api/subscription
 * Returns subscription status for the authenticated merchant.
 */
app.get('/api/subscription', async (req, res) => {
  try {
    if (!req.merchant) {
      return res.json({ needsAuth: true, message: 'Register first.' });
    }
    const sub = await getSubscription(req.merchant.id);
    res.json(sub);
  } catch (err) {
    res.status(500).json({ error: friendlyError(err, 'subscription') });
  }
});

// ── Stripe OAuth ────────────────────────────────────────────────

/**
 * GET /api/stripe/oauth/start
 * Initiate Stripe Connect OAuth flow for the authenticated merchant.
 * Redirects the merchant to Stripe's authorization page.
 */
app.get('/api/stripe/oauth/start', async (req, res) => {
  try {
    if (!req.merchant) {
      // Try to find merchant by API key from query param (browser navigation doesn't send headers)
      const token = req.query.token;
      if (token) {
        const merchant = await getMerchantByApiKey(token);
        if (merchant) {
          req.merchant = merchant;
        } else {
          return res.redirect(`${BASE_URL}/app?error=auth_required`);
        }
      } else {
        return res.redirect(`${BASE_URL}/app?error=auth_required`);
      }
    }

    const clientId = config.stripe.clientId;
    if (!clientId) {
      return res.redirect(`${BASE_URL}/app?error=oauth_unavailable`);
    }

    // Generate a random state token and store it linked to this merchant
    const crypto = await import('crypto');
    const state = crypto.randomBytes(32).toString('hex');
    await createOAuthState(state, req.merchant.id);

    const redirectUri = `${BASE_URL}/api/stripe/oauth/callback`;
    const authUrl =
      `https://connect.stripe.com/oauth/authorize` +
      `?response_type=code` +
      `&client_id=${clientId}` +
      `&scope=read_write` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&state=${state}`;

    res.redirect(authUrl);
  } catch (err) {
    res.status(500).json({ error: `OAuth error: ${err.message}` });
  }
});

/**
 * GET /api/stripe/oauth/callback
 * Handles the OAuth callback from Stripe after merchant authorizes.
 * Exchanges the auth code for an access token and stores it.
 */
app.get('/api/stripe/oauth/callback', async (req, res) => {
  try {
    const { code, state, error } = req.query;

    if (error) {
      console.log(`ℹ️  OAuth denied: ${error}`);
      return res.redirect(`${BASE_URL}/app?error=oauth_denied`);
    }

    if (!code || !state) {
      return res.status(400).send('Missing code or state parameter');
    }

    // Verify the state token and find the merchant
    const stateRecord = await consumeOAuthState(state);
    if (!stateRecord) {
      return res.status(400).send('Invalid or expired OAuth state. Please try again.');
    }

    // Exchange the authorization code for an access token
    const Stripe = (await import('stripe')).default;
    const stripe = Stripe(config.stripe.secretKey);

    const tokenResponse = await stripe.oauth.token({
      grant_type: 'authorization_code',
      code,
    });

    const accessToken = tokenResponse.access_token;
    const stripeUserId = tokenResponse.stripe_user_id;

    // Prevent re-registration of the same Stripe account after trial expired
    const existingOAuth = await getMerchantByStripeAccountId(stripeUserId);
    if (existingOAuth && existingOAuth.id !== stateRecord.merchant_id) {
      const existingSub = await getSubscription(existingOAuth.id);
      if (existingSub && !existingSub.active) {
        console.log(`   ⛔ OAuth: Stripe account ${stripeUserId} already used by expired merchant ${existingOAuth.id}`);
        return res.redirect(`${BASE_URL}/app?error=trial_expired_reuse`);
      }
    }

    // Store the access token as the merchant's Stripe key
    await updateMerchantStripeOAuth(stateRecord.merchant_id, accessToken, stripeUserId);
    console.log(`✅ Merchant ${stateRecord.merchant_id}: Stripe connected via OAuth (${stripeUserId})`);

    // Redirect back to the app dashboard
    res.redirect(`${BASE_URL}/app?oauth=success`);
  } catch (err) {
    console.error('❌ OAuth callback error:', err.message);
    res.redirect(`${BASE_URL}/app?error=oauth_failed&detail=${encodeURIComponent(err.message)}`);
  }
});

// ── Stripe Billing ─────────────────────────────────────────────

/**
 * POST /api/create-checkout-session
 * Creates a Stripe Checkout Session for monthly subscription.
 * Redirects user to Stripe Checkout for payment.
 */
app.post('/api/create-checkout-session', async (req, res) => {
  try {
    if (!req.merchant) {
      return res.status(401).json({ error: 'Authentication required.' });
    }

    const merchant = req.merchant;
    const sub = await getSubscription(merchant.id);

    // If already subscribed with a valid Stripe subscription, create portal session
    if (sub.active && sub.stripeSubscriptionId) {
      try {
        const stripe = new Stripe(config.stripe.secretKey);
        const portalSession = await stripe.billingPortal.sessions.create({
          customer: sub.stripeCustomerId,
          return_url: `${BASE_URL}/app`,
        });
        return res.json({ url: portalSession.url });
      } catch (portalErr) {
        console.warn(`⚠️  Could not create Stripe portal for ${merchant.id}: ${portalErr.message}`);
      }
      return res.json({ active: true });
    }

    // Create a Stripe Checkout Session for subscription
    const stripe = new Stripe(config.stripe.secretKey);
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: config.stripe.priceId, quantity: 1 }],
      client_reference_id: merchant.id,
      metadata: { merchant_id: merchant.id },
      success_url: `${BASE_URL}/app?checkout=success`,
      cancel_url: `${BASE_URL}/app`,
    });

    console.log(`✅ Merchant ${merchant.id}: Checkout session created (${session.id})`);
    res.json({ url: session.url });
  } catch (err) {
    console.error('❌ Checkout session error:', err.message);
    res.status(500).json({ error: `Checkout error: ${err.message}` });
  }
});

/**
 * POST /api/stripe-webhook
 * Receives Stripe webhook events for subscription lifecycle.
 * Updates the merchant's subscription status in the database.
 */
app.post('/api/stripe-webhook', async (req, res) => {
  try {
    const stripe = new Stripe(config.stripe.secretKey);
    let event;

    // Verify webhook signature if secret is configured
    if (config.stripe.webhookSecret && req.headers['stripe-signature']) {
      const rawBody = req.rawBody || JSON.stringify(req.body);
      event = stripe.webhooks.constructEvent(rawBody, req.headers['stripe-signature'], config.stripe.webhookSecret);
    } else {
      event = req.body;
    }

    if (!event || !event.type) {
      return res.status(400).json({ error: 'Invalid webhook payload' });
    }

    const data = event.data?.object || {};
    console.log(`📬 Stripe webhook: ${event.type} (${data.id})`);

    switch (event.type) {
      case 'checkout.session.completed': {
        const merchantId = data.metadata?.merchant_id || data.client_reference_id;
        if (merchantId && data.subscription) {
          const subscription = await stripe.subscriptions.retrieve(data.subscription);
          const merchant = await getMerchant(merchantId);
          if (merchant) {
            await updateSubscription(merchant.id, {
              stripeCustomerId: data.customer,
              stripeSubscriptionId: data.subscription,
              status: subscription.status,
              tier: 'monthly',
            });
            console.log(`✅ Merchant ${merchant.id}: Stripe subscribed (sub ${data.subscription})`);
          } else {
            console.warn(`⚠️  checkout.session.completed: merchant not found: ${merchantId}`);
          }
        }
        break;
      }

      case 'customer.subscription.updated': {
        const merchant = await getMerchantBySubscriptionId(data.id);
        if (merchant) {
          const status = data.status === 'active' ? 'active' :
                         data.status === 'past_due' ? 'past_due' :
                         data.status === 'canceled' ? 'canceled' :
                         data.status === 'trialing' ? 'trialing' : data.status;
          await updateSubscription(merchant.id, { status });
          console.log(`ℹ️  Merchant ${merchant.id}: Stripe subscription ${status}`);
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const cancelledMerchant = await getMerchantBySubscriptionId(data.id);
        if (cancelledMerchant) {
          await updateSubscription(cancelledMerchant.id, { status: 'canceled' });
          console.log(`ℹ️  Merchant ${cancelledMerchant.id}: Stripe subscription cancelled`);
        }
        break;
      }
    }

    res.json({ received: true });
  } catch (err) {
    console.error('❌ Stripe webhook error:', err.message);
    res.status(400).json({ error: `Stripe webhook error: ${err.message}` });
  }
});

// ── Checkout (Subscribe) ────────────────────────────────────────
/**
 * POST /api/create-paddle-checkout
 * Creates a checkout session for subscription.
 * PRIMARY method: Stripe Checkout (server-side redirect).
 * FALLBACK for existing Paddle subscribers: Paddle portal.
 * NEW subscribers always go through Stripe.
 */
app.post('/api/create-paddle-checkout', async (req, res) => {
  try {
    if (!req.merchant) {
      return res.status(401).json({ error: 'Authentication required.' });
    }

    const merchant = req.merchant;
    const sub = await getSubscription(merchant.id);

    // Existing Paddle subscriber → Paddle portal
    if (sub.paddleSubscriptionId && config.paddle.apiKey) {
      try {
        const { Paddle } = await import('@paddle/paddle-node-sdk');
        const paddle = new Paddle(config.paddle.apiKey);
        const portalSession = await paddle.customerPortalSessions.create({
          subscriptionIds: [sub.paddleSubscriptionId],
        });
        return res.json({ url: portalSession.url });
      } catch (portalErr) {
        console.warn(`⚠️  Could not create Paddle portal for ${merchant.id}: ${portalErr.message}`);
      }
      return res.json({ active: true });
    }

    // Existing Stripe subscriber → Stripe Customer Portal
    if (sub.stripeSubscriptionId && sub.stripeCustomerId && config.stripe.secretKey) {
      try {
        const stripe = new Stripe(config.stripe.secretKey);
        const portalSession = await stripe.billingPortal.sessions.create({
          customer: sub.stripeCustomerId,
          return_url: `${BASE_URL}/app`,
        });
        return res.json({ url: portalSession.url });
      } catch (portalErr) {
        console.warn(`⚠️  Could not create Stripe portal for ${merchant.id}: ${portalErr.message}`);
      }
      return res.json({ active: true });
    }

    // NEW subscriber: Paddle Billing checkout overlay
    if (config.paddle.apiKey && config.paddle.priceId && config.paddle.clientToken) {
      console.log(`✅ Merchant ${merchant.id}: Paddle Billing checkout overlay`);
      return res.json({ overlay: true });
    }

    // Fallback: Stripe Checkout
    const stripe = new Stripe(config.stripe.secretKey);
    if (!config.stripe.priceId) {
      return res.status(500).json({ error: 'Billing not configured. Contact support.' });
    }
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: config.stripe.priceId, quantity: 1 }],
      client_reference_id: merchant.id,
      metadata: { merchant_id: merchant.id },
      success_url: `${BASE_URL}/app?checkout=success`,
      cancel_url: `${BASE_URL}/app`,
    });
    console.log(`✅ Merchant ${merchant.id}: Stripe Checkout session created (${session.id})`);
    res.json({ url: session.url });
  } catch (err) {
    console.error('❌ Checkout error:', err.message);
    res.status(500).json({ error: `Checkout error: ${err.message}` });
  }
});

/**
 * POST /api/activate-subscription
 * Called by frontend after successful Paddle checkout (webhook fallback).
 * Activates subscription immediately so user sees paid status.
 */
app.post('/api/activate-subscription', async (req, res) => {
  try {
    if (!req.merchant) {
      return res.status(401).json({ error: 'Authentication required.' });
    }
    const merchant = req.merchant;
    const sub = await getSubscription(merchant.id);
    if (sub.active && (sub.stripeSubscriptionId || sub.paddleSubscriptionId)) {
      return res.json({ active: true, message: 'Already subscribed.' });
    }
    await updateSubscription(merchant.id, {
      status: 'active',
      tier: 'monthly',
      paddleSubscriptionId: 'pending_' + Date.now(),
    });
    console.log(`✅ Merchant ${merchant.id}: subscription activated after checkout`);
    res.json({ active: true });
  } catch (err) {
    console.error('❌ Activate subscription error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

/**
 * POST /api/lemonsqueezy-webhook
 * Receives Lemon Squeezy webhook events for subscription lifecycle.
 * Lemon Squeezy is a Merchant of Record — handles tax, compliance, payouts.
 * Pays out to your Indian bank account in INR.
 */
app.post('/api/lemonsqueezy-webhook', async (req, res) => {
  try {
    let event = req.body;

    // Verify webhook signature if secret is configured
    if (config.lemonsqueezy.webhookSecret) {
      const crypto = await import('crypto');
      const signature = req.headers['x-signature'];
      if (!signature) {
        console.warn('⚠️  Missing Lemon Squeezy webhook signature');
        return res.status(401).json({ error: 'Missing signature' });
      }
      const hmac = crypto.createHmac('sha256', config.lemonsqueezy.webhookSecret);
      const digest = hmac.update(req.bodyRaw || JSON.stringify(req.body)).digest('hex');
      if (signature !== digest) {
        console.warn('⚠️  Invalid Lemon Squeezy webhook signature');
        return res.status(401).json({ error: 'Invalid signature' });
      }
    }

    const eventName = event.meta?.event_name || '';
    const subData = event.data?.attributes || {};

    console.log(`📬 Lemon Squeezy webhook: ${eventName}`);

    switch (eventName) {
      case 'subscription_created':
      case 'subscription_updated': {
        const status = subData.status;
        const customerEmail = subData.user_email || 'unknown';
        const subId = event.data?.id || 'unknown';
        console.log(`✅ New subscription: ${customerEmail} — ${status} (sub ${subId})`);
        break;
      }

      case 'subscription_cancelled': {
        const cancelledEmail = subData.user_email || 'unknown';
        console.log(`ℹ️  Subscription cancelled: ${cancelledEmail}`);
        break;
      }

      case 'order_created': {
        // Initial payment successful
        const orderEmail = subData.user_email || 'unknown';
        const amount = subData.total || 0;
        console.log(`💰 Payment received: ${orderEmail} — $${(amount / 100).toFixed(2)}`);
        break;
      }

      default:
        console.log(`📬 Unhandled Lemon Squeezy event: ${eventName}`);
    }

    res.json({ received: true });
  } catch (err) {
    console.error('❌ Lemon Squeezy webhook error:', err.message);
    res.status(400).json({ error: friendlyError(err, 'lemonsqueezy-webhook') });
  }
});

/**
 * POST /api/paddle-webhook
 * Receives Paddle webhook events for subscription lifecycle.
 */
app.post('/api/paddle-webhook', async (req, res) => {
  try {
    const event = req.body;
    if (!event || !event.event_type) {
      return res.status(400).json({ error: 'Invalid webhook payload' });
    }
    const data = event.data || {};
    console.log(`📬 Paddle webhook: ${event.event_type} (${data.id})`);

    switch (event.event_type) {
      case 'subscription.created':
      case 'subscription.updated': {
        const status = data.status || 'unknown';
        const customerId = data.customer_id || data.custom_data?.customer_email || 'unknown';
        console.log(`✅ Paddle subscription: ${customerId} — ${status} (sub ${data.id})`);
        break;
      }
      case 'subscription.canceled': {
        console.log(`ℹ️  Paddle subscription cancelled: ${data.id}`);
        break;
      }
      case 'transaction.completed': {
        const amount = data.details?.line_items?.[0]?.total || 0;
        console.log(`💰 Paddle payment completed: $${(amount / 100).toFixed(2)}`);
        break;
      }
    }

    res.json({ received: true });
  } catch (err) {
    console.error('❌ Paddle webhook error:', err.message);
    res.status(400).json({ error: friendlyError(err, 'paddle-webhook') });
  }
});

// ── Admin endpoints (requires MASTER_API_KEY) ───────────────────
/**
 * GET /api/admin/merchants
 * Returns a summary of all merchants (no sensitive data exposed).
 * Requires Authorization: Bearer <MASTER_API_KEY>
 */
app.get('/api/admin/merchants', async (req, res) => {
  if (!req.isMaster) {
    return res.status(401).json({ error: 'Master API key required. Set MASTER_API_KEY env var.' });
  }
  try {
    const merchants = await getAllMerchantsSummary();
    res.json({
      total: merchants.length,
      merchants: merchants.map(m => ({
        id: m.id,
        displayName: m.display_name,
        email: m.email || null,
        stripeAccountId: m.stripe_account_id || null,
        subscriptionStatus: m.subscription_status,
        subscriptionTier: m.subscription_tier,
        trialEnd: m.trial_end_at,
        createdAt: m.created_at,
        lastSyncAt: m.last_sync_at || null,
      }))
    });
  } catch (err) {
    console.error('❌ Admin merchants error:', err.message);
    res.status(500).json({ error: friendlyError(err, 'admin') });
  }
});

/**
 * GET /api/admin/stats
 * Returns aggregate statistics.
 */
app.get('/api/admin/stats', async (req, res) => {
  if (!req.isMaster) {
    return res.status(401).json({ error: 'Master API key required.' });
  }
  try {
    const merchants = await getAllMerchantsSummary();
    const now = new Date();
    const total = merchants.length;
    const onTrial = merchants.filter(m =>
      m.subscription_status === 'trial' && m.trial_end_at && new Date(m.trial_end_at) > now
    ).length;
    const subscribed = merchants.filter(m =>
      m.subscription_status === 'active'
    ).length;
    const expired = merchants.filter(m =>
      m.subscription_status === 'trial' && m.trial_end_at && new Date(m.trial_end_at) <= now
    ).length;
    const canceled = merchants.filter(m =>
      m.subscription_status === 'canceled'
    ).length;
    const unconfigured = merchants.filter(m =>
      m.subscription_status === 'trial' && !m.trial_end_at && !m.stripe_account_id
    ).length;
    const withStripe = merchants.filter(m => m.stripe_account_id).length;
    res.json({
      total,
      onTrial,
      subscribed,
      expired,
      canceled,
      unconfigured,       // registered but never set up Stripe keys
      withStripe           // configured Stripe at least once
    });
  } catch (err) {
    console.error('❌ Admin stats error:', err.message);
    res.status(500).json({ error: friendlyError(err, 'admin') });
  }
});

// ── Stripe Auditor Routes ──────────────────────────────────────
import { setupAuditRoutes } from './audit/routes.js';
setupAuditRoutes(app, {
  createOAuthState,
  consumeOAuthState,
  updateMerchantStripeOAuth,
  getMerchantByApiKey,
  getMerchant,
  createMerchant,
});

// ── Serve Web UI (standalone setup page) ─────────────────────────
// BASE_URL is set via env var (Render provides the URL after first deploy).
// Fallback to localhost for local dev only.
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
setupWebUI(app, BASE_URL);

// Sentry error handler (must be after all routes)
if (process.env.SENTRY_DSN) {
  Sentry.setupExpressErrorHandler(app);
}

// ── Start server ────────────────────────────────────────────────
const PORT = process.env.PORT || 8080;

async function start() {
  if (!config.databaseUrl) {
    console.warn('⚠️  DATABASE_URL not set.');
    console.warn('   Set DATABASE_URL in your hosting provider\'s environment variables.');
    console.warn('   Server will not handle requests until DATABASE_URL is configured.\n');
  } else {
    // Initialize database schema
    await initDatabase();
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n🌉 Bridge API server running on http://0.0.0.0:${PORT}`);
    console.log(`   Database: ${config.databaseUrl ? '✅ PostgreSQL' : '❌ NOT CONFIGURED'}`);
    console.log(`   Multi-tenant: enabled`);
    console.log(`   Master key: ${config.masterKey ? '✅ configured' : '❌ not set'}`);
    console.log(`   Scheduler: active (${scheduler.schedule})`);
    console.log('');
  });
}

start().catch(err => {
  console.error('❌ Failed to start server:', err.message);
  process.exit(1);
});
