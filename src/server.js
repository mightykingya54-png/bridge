/**
 * Bridge Backend Server
 * Handles API requests from the Stripe App UI, runs the sync scheduler,
 * and reports status from the SQLite database.
 *
 * Run: npm start   (node src/server.js)
 */
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { config } from './config.js';
import { testConnection as testStripe } from './connectors/stripe.js';
import { testConnection as testPaypal } from './connectors/paypal.js';
import { runSync, processRefund } from './sync/engine.js';
import { startScheduler } from './sync/scheduler.js';
import { getState, getRecentErrors, getAllSyncedIds, getAllSyncedRefunds, closeDatabase } from './sync/state.js';

const app = express();
app.use(cors());
app.use(express.json());

// Start the scheduled sync (default: daily at 6 AM)
const scheduler = startScheduler({
  onSyncStart: () => console.log('⏰ Scheduled sync started'),
  onSyncComplete: (result) => {
    console.log(`⏰ Scheduled sync done: ${result.pushed} pushed, ${result.skipped} skipped`);
  },
});

const paypalConnected = !!(config.paypal.clientId && config.paypal.clientSecret);

/**
 * GET /
 * Root landing page — shows Bridge is running.
 */
app.get('/', async (req, res) => {
  res.json({
    app: 'Bridge',
    version: '0.1.0',
    status: 'running',
    endpoints: {
      status: '/api/status',
      sync: 'POST /api/sync',
      refund: 'POST /api/refund',
      syncedIds: '/api/synced-ids',
      refunds: '/api/refunds',
    },
    docs: 'https://github.com/mightykingya54-png/bridge',
  });
});

/**
 * GET /api/status
 * Returns current connection and sync status from persistent DB.
 */
app.get('/api/status', async (req, res) => {
  try {
    const stripeInfo = await testStripe();
    const syncState = getState();
    const errors = getRecentErrors(10);

    res.json({
      stripe: { connected: true, accountId: stripeInfo.accountId },
      paypal: { connected: paypalConnected },
      sync: {
        lastSyncAt: syncState.lastSyncAt,
        totalSynced: syncState.totalSynced,
        errors,
      },
      scheduler: {
        schedule: scheduler.schedule,
        running: true,
      },
      processor: paypalConnected ? 'paypal' : null,
    });
  } catch (err) {
    const syncState = getState();
    res.json({
      stripe: { connected: false, error: err.message },
      paypal: { connected: paypalConnected },
      sync: {
        lastSyncAt: syncState.lastSyncAt,
        totalSynced: syncState.totalSynced,
        errors: getRecentErrors(10),
      },
      scheduler: {
        schedule: scheduler.schedule,
        running: true,
      },
      processor: null,
    });
  }
});

/**
 * GET /api/paypal/auth-url
 * Returns the PayPal OAuth URL for merchant authorization.
 */
app.get('/api/paypal/auth-url', async (req, res) => {
  res.json({
    url: 'https://developer.paypal.com/dashboard/applications',
    message: 'For testing, configure PayPal API keys in the .env file.',
  });
});

/**
 * POST /api/sync
 * Trigger a manual sync. Options:
 *   { startDate?: ISO string, endDate?: ISO string }
 */
app.post('/api/sync', async (req, res) => {
  if (!paypalConnected) {
    return res.status(400).json({ error: 'PayPal not configured' });
  }

  try {
    const result = await runSync({
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
 *
 * Body:
 *   processorTxnId: string (refund's own PayPal txn ID)
 *   paymentProcessorTxnId: string (original payment's PayPal txn ID)
 *   amount: number (cents)
 *   currency: string
 *   initiatedAt: number (unix timestamp, optional)
 *   processorName: string (optional, default 'paypal')
 */
app.post('/api/refund', async (req, res) => {
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
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET /api/synced-ids
 * List recently synced transaction IDs for debugging.
 */
app.get('/api/synced-ids', async (req, res) => {
  const processor = req.query.processor || 'paypal';
  const ids = getAllSyncedIds(processor);
  res.json({ processor, count: ids.length, transactions: ids });
});

/**
 * GET /api/refunds
 * List recently synced refunds for debugging.
 */
app.get('/api/refunds', async (req, res) => {
  const refunds = getAllSyncedRefunds();
  res.json({ count: refunds.length, refunds });
});

/**
 * Graceful shutdown.
 */
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down...');
  scheduler.stop();
  closeDatabase();
  process.exit(0);
});

process.on('SIGTERM', () => {
  scheduler.stop();
  closeDatabase();
  process.exit(0);
});

/**
 * Start server.
 */
const PORT = 8080;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n🌉 Bridge API server running on http://0.0.0.0:${PORT}`);
  console.log(`   Stripe: ${config.stripe.secretKey ? '✅ configured' : '❌ missing'}`);
  console.log(`   PayPal: ${paypalConnected ? '✅ configured' : '❌ missing'}`);
  console.log(`   Database: ${config.databasePath}`);
  console.log(`   Scheduler: active (${scheduler.schedule})`);
  console.log('');
});
