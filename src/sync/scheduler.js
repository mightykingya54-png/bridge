/**
 * Sync Scheduler — Automatically runs sync on a cron schedule.
 *
 * Default: every 24 hours (configurable via SCHEDULE env var).
 * Uses sync state to determine date range (last sync → now).
 *
 * Run as part of the server: import { startScheduler } and call it.
 */
import cron from 'node-cron';
import { config } from '../config.js';
import { fetchTransactions } from '../connectors/paypal.js';
import { pushPaymentRecord } from '../connectors/stripe.js';
import {
  getState,
  updateSyncState,
  isAlreadySynced,
  markSynced,
  addSyncError,
} from './state.js';

// Default: run daily at 6:00 AM
const DEFAULT_SCHEDULE = '0 6 * * *';
const SYNC_LOOKBACK_DAYS = 30; // how far back to look on first sync

/**
 * Start the sync scheduler.
 * @param {Object} callbacks - { onSyncStart, onSyncComplete } for logging
 * @returns {{ stop: Function, schedule: string }}
 */
export function startScheduler(callbacks = {}) {
  const schedule = process.env.SCHEDULE || DEFAULT_SCHEDULE;

  if (!cron.validate(schedule)) {
    console.error(`❌ Invalid cron schedule: "${schedule}". Using default.`);
    schedule = DEFAULT_SCHEDULE;
  }

  console.log(`⏰ Sync scheduler: cron "${schedule}" (${describeSchedule(schedule)})`);

  const task = cron.schedule(schedule, async () => {
    console.log('⏰ Scheduled sync starting...');
    callbacks.onSyncStart?.();
    try {
      const result = await runScheduledSync();
      console.log(
        `⏰ Sync complete: ${result.pushed} pushed, ${result.skipped} skipped, ${result.errors} errors`
      );
      callbacks.onSyncComplete?.(result);
    } catch (err) {
      console.error(`❌ Scheduled sync failed: ${err.message}`);
      addSyncError(`Scheduled sync failed: ${err.message}`);
      callbacks.onSyncComplete?.({ error: err.message });
    }
  });

  return {
    stop: () => {
      task.stop();
      console.log('⏰ Sync scheduler stopped');
    },
    schedule,
  };
}

/**
 * Run one sync cycle using DB-based state for dedup and date tracking.
 * Exported so the API endpoint can also use it.
 */
export async function runScheduledSync() {
  const paypalConfigured = config.paypal.clientId && config.paypal.clientSecret;
  if (!paypalConfigured) {
    throw new Error('PayPal not configured — set PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET');
  }

  const state = getState();

  // Determine date range
  const endDate = new Date();
  let startDate;

  if (state.lastSyncAt) {
    // Start from last sync (minus 1h overlap to catch edge cases)
    startDate = new Date(new Date(state.lastSyncAt).getTime() - 60 * 60 * 1000);
  } else {
    // First sync: look back SYNC_LOOKBACK_DAYS days
    startDate = new Date(Date.now() - SYNC_LOOKBACK_DAYS * 24 * 60 * 60 * 1000);
  }

  const startStr = startDate.toISOString();
  const endStr = endDate.toISOString();

  console.log(`   Range: ${startStr} → ${endStr}`);

  // Fetch all pages from PayPal
  let page = 1;
  let totalPages = 1;
  let allTransactions = [];

  while (page <= totalPages) {
    const batch = await fetchTransactions(startStr, endStr, page);
    allTransactions = allTransactions.concat(batch.transactions);
    totalPages = batch.totalPages || 1;
    page++;
  }

  console.log(`   Found ${allTransactions.length} PayPal transactions`);

  // Push each transaction to Stripe, using DB for dedup
  let pushed = 0;
  let skipped = 0;
  let errorCount = 0;

  for (const txn of allTransactions) {
    // Check DB-based dedup
    if (isAlreadySynced(txn.processorTxnId, txn.processorName)) {
      skipped++;
      continue;
    }

    try {
      const record = await pushPaymentRecord(txn);
      markSynced(txn.processorTxnId, txn.processorName, record.id);
      pushed++;
    } catch (err) {
      // Idempotency collision = already exists in Stripe (race condition)
      if (err.code === 'idempotency_error' || err.statusCode === 400) {
        markSynced(txn.processorTxnId, txn.processorName, null);
        skipped++;
      } else {
        errorCount++;
        addSyncError(err.message, txn.processorTxnId);
        console.error(`   ❌ Error syncing ${txn.processorTxnId}: ${err.message}`);
      }
    }
  }

  // Update sync state
  updateSyncState();

  return {
    pushed,
    skipped,
    errors: errorCount,
    total: allTransactions.length,
  };
}

/**
 * Describe a cron schedule in human-readable form.
 */
function describeSchedule(schedule) {
  const descriptions = {
    '0 6 * * *': 'Daily at 6:00 AM',
    '0 */6 * * *': 'Every 6 hours',
    '0 0 * * *': 'Daily at midnight',
    '*/30 * * * *': 'Every 30 minutes',
    '0 * * * *': 'Every hour',
  };
  return descriptions[schedule] || `cron: ${schedule}`;
}
