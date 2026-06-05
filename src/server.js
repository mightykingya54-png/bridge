/**
 * Bridge Backend Server
 *
 * Multi-tenant API server. Merchants register, configure their
 * Stripe + PayPal keys, and trigger syncs via the Stripe App UI.
 *
 * Run: npm start   (node src/server.js)
 */
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { config } from './config.js';
import { pushPaymentRecord, pushRefundRecord, testConnection as testStripe } from './connectors/stripe.js';
import { fetchTransactions, testConnection as testPaypal } from './connectors/paypal.js';
import { runSync, processRefund } from './sync/engine.js';
import { startScheduler } from './sync/scheduler.js';
import { setupWebUI } from './web-ui.js';
import {
  createMerchant,
  getMerchant,
  getMerchantByApiKey,
  getMerchantBySubscriptionId,
  updateMerchantCredentials,
  getAllMerchants,
  getState,
  initDatabase,
  getRecentErrors,
  getAllSyncedIds,
  getAllSyncedRefunds,
  closeDatabase,
  canSync,
  getSubscription,
  updateSubscription,
  createOAuthState,
  consumeOAuthState,
  updateMerchantStripeOAuth,
} from './sync/state.js';

const app = express();
app.use(cors());
app.use(express.json());

// ── Auth Middleware ──────────────────────────────────────────────
// POST endpoints (sync, refund, configure) require auth.
// GET endpoints (status, configure, synced-ids, refunds) work without
// auth for the Stripe App UI to show before registration.
async function authRequired(req, res, next) {
  try {
    // Skip auth for register, root status, web UI, Stripe webhook, and OAuth callback
    if (req.path === '/api/register' && req.method === 'POST') return next();
    if (req.path === '/' && req.method === 'GET') return next();
    if (req.path === '/app') return next();
    if (req.path === '/api/stripe-webhook') return next();
    if (req.path === '/api/stripe/oauth/callback') return next();

    // Parse API key from Authorization header (for any method)
    const authHeader = req.headers.authorization || '';
    const apiKey = authHeader.replace(/^Bearer\s+/i, '').trim();

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
    res.status(500).json({ error: `Auth error: ${err.message}` });
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

// ── Routes ──────────────────────────────────────────────────────

/**
 * GET /
 * Root landing page.
 */
app.get('/', (req, res) => {
  res.json({
    app: 'Bridge',
    version: '0.2.0',
    status: 'running',
    endpoints: {
      register: 'POST /api/register',
      configure: 'POST /api/configure',
      status: '/api/status',
      sync: 'POST /api/sync',
      refund: 'POST /api/refund',
      syncedIds: '/api/synced-ids',
      refunds: '/api/refunds',
    },
    auth: 'Send Authorization: Bearer <api_key> header. Get your API key from POST /api/register.',
    docs: 'https://github.com/mightykingya54-png/bridge',
  });
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
    res.status(500).json({ error: err.message });
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
    res.status(500).json({ error: err.message });
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
  if (stripeKey) updates.stripe_key = stripeKey;
  if (paypalClientId) updates.paypal_client_id = paypalClientId;
  if (paypalClientSecret) updates.paypal_client_secret = paypalClientSecret;
  if (paypalEnvironment) updates.paypal_environment = paypalEnvironment;

  // If Stripe or PayPal creds were provided, test them before saving
  if (stripeKey) {
    try {
      const stripeInfo = await testStripe(stripeKey);
      console.log(`   ✅ Merchant ${merchant.id}: Stripe connected (${stripeInfo.accountId})`);
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
    const syncState = await getState();

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
    res.status(500).json({ error: err.message });
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
    res.status(500).json({ error: err.message });
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
    return res.status(400).json({
      error: 'Missing required fields: processorTxnId, paymentProcessorTxnId, amount, currency',
    });
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
    res.status(500).json({ error: err.message });
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
    res.status(500).json({ error: err.message });
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
    res.status(500).json({ error: err.message });
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
    res.status(500).json({ error: err.message });
  }
});

/**
 * POST /api/create-checkout
 * Creates a Stripe Checkout Session for a monthly subscription.
 * Returns the URL to redirect the user to.
 */
app.post('/api/create-checkout', async (req, res) => {
  try {
    if (!req.merchant) {
      return res.status(401).json({ error: 'Authentication required.' });
    }

    const Stripe = (await import('stripe')).default;
    const stripe = Stripe(config.stripe.secretKey);

    const merchant = req.merchant;
    const sub = await getSubscription(merchant.id);

    // If already subscribed with a valid subscription, redirect to billing portal
    if (sub.active && sub.stripeSubscriptionId) {
      const session = await stripe.billingPortal.sessions.create({
        customer: sub.stripeCustomerId,
        return_url: `${BASE_URL}/app`,
      });
      return res.json({ url: session.url });
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{
        price: config.stripe.priceId,
        quantity: 1,
      }],
      customer: sub.stripeCustomerId || undefined,
      client_reference_id: merchant.id,
      metadata: { merchant_id: merchant.id },
      success_url: `${BASE_URL}/app?checkout=success`,
      cancel_url: `${BASE_URL}/app#pricing`,
    });

    res.json({ url: session.url });
  } catch (err) {
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
    // req.body is already parsed by express.json() middleware
    const Stripe = (await import('stripe')).default;
    const stripe = Stripe(config.stripe.secretKey);
    const event = req.body;

    if (!event || !event.type) {
      return res.status(400).json({ error: 'Invalid webhook payload' });
    }

    const session = event.data?.object;

    switch (event.type) {
      case 'checkout.session.completed': {
        const merchantId = session.client_reference_id || session.metadata?.merchant_id;
        if (merchantId && session.subscription) {
          const subscription = await stripe.subscriptions.retrieve(session.subscription);
          await updateSubscription(merchantId, {
            stripeCustomerId: session.customer,
            stripeSubscriptionId: session.subscription,
            status: subscription.status,
            tier: 'monthly',
          });
          console.log(`✅ Merchant ${merchantId}: subscribed (sub ${session.subscription})`);
        }
        break;
      }

      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        const merchant = await getMerchantBySubscriptionId(subscription.id);
        if (merchant) {
          const status = event.type === 'customer.subscription.deleted' ? 'canceled' : subscription.status;
          await updateSubscription(merchant.id, { status });
          console.log(`ℹ️  Merchant ${merchant.id}: subscription ${status}`);
        }
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object;
        const subId = invoice.subscription;
        if (subId) {
          const merchant = await getMerchantBySubscriptionId(subId);
          if (merchant) {
            await updateSubscription(merchant.id, { status: 'past_due' });
            console.log(`⚠️  Merchant ${merchant.id}: payment failed, status = past_due`);
          }
        }
        break;
      }
    }

    res.json({ received: true });
  } catch (err) {
    console.error('❌ Webhook error:', err.message);
    res.status(400).json({ error: err.message });
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

// ── Serve Web UI (standalone setup page) ─────────────────────────
const BASE_URL = config.stripe.secretKey
  ? 'https://bridge-production-ad61.up.railway.app'
  : `http://0.0.0.0:${PORT}`;
setupWebUI(app, BASE_URL);

// ── Start server ────────────────────────────────────────────────
const PORT = 8080;

async function start() {
  if (!config.databaseUrl) {
    console.warn('⚠️  DATABASE_URL not set. Waiting for PostgreSQL plugin...');
    console.warn('   Go to Railway dashboard → Project → Plugins → Add PostgreSQL');
    console.warn('   Server will not handle requests until DATABASE_URL is configured.');
    console.warn('   For now, start the server, add PostgreSQL in Railway UI, and redeploy.\n');
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
