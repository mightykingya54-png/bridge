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
  updateMerchantCredentials,
  getAllMerchants,
  getState,
  initDatabase,
  getRecentErrors,
  getAllSyncedIds,
  getAllSyncedRefunds,
  closeDatabase,
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
    // Skip auth for register endpoint, root status, and web UI
    if (req.path === '/api/register' && req.method === 'POST') return next();
    if (req.path === '/' && req.method === 'GET') return next();
    if (req.path === '/app') return next();

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
