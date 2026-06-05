/**
 * Sync Scheduler — Runs sync for ALL configured merchants on a cron schedule.
 *
 * Iterates through all registered merchants that have both Stripe and PayPal
 * configured, and runs a sync for each one.
 */
import cron from 'node-cron';
import { fetchTransactions } from '../connectors/paypal.js';
import { pushPaymentRecord } from '../connectors/stripe.js';
import {
  getAllMerchants,
  isAlreadySynced,
  markSynced,
  addSyncError,
} from './state.js';

const DEFAULT_SCHEDULE = '0 6 * * *';
const SYNC_LOOKBACK_DAYS = 7;

/**
 * Start the sync scheduler.
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

    const merchants = (await getAllMerchants()).filter(m => m.stripe_key && m.paypal_client_id && m.paypal_client_secret);

    if (merchants.length === 0) {
      console.log('⏰ No merchants configured. Skipping scheduled sync.');
      return;
    }

    let totalPushed = 0;
    let totalSkipped = 0;
    let totalErrors = 0;

    for (const merchant of merchants) {
      console.log(`   Sync for merchant ${merchant.id} (${merchant.display_name || 'unnamed'})...`);
      try {
        const result = await runMerchantSync(merchant);
        totalPushed += result.pushed;
        totalSkipped += result.skipped;
        totalErrors += result.errors;
      } catch (err) {
        console.error(`   ❌ Merchant ${merchant.id} sync failed: ${err.message}`);
        await addSyncError(`Scheduled sync failed: ${err.message}`, null, merchant.id);
        totalErrors++;
      }
    }

    console.log(`⏰ Sync complete: ${totalPushed} pushed, ${totalSkipped} skipped, ${totalErrors} errors across ${merchants.length} merchants`);
    callbacks.onSyncComplete?.({ pushed: totalPushed, skipped: totalSkipped, errors: totalErrors });
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
 * Run one sync for a single merchant.
 */
async function runMerchantSync(merchant) {
  const endDate = new Date();
  const startDate = new Date(Date.now() - SYNC_LOOKBACK_DAYS * 24 * 60 * 60 * 1000);

  const paypalCreds = {
    clientId: merchant.paypal_client_id,
    clientSecret: merchant.paypal_client_secret,
    environment: merchant.paypal_environment,
  };

  let page = 1;
  let totalPages = 1;
  let allTransactions = [];

  while (page <= totalPages) {
    const batch = await fetchTransactions(
      startDate.toISOString(),
      endDate.toISOString(),
      paypalCreds,
      page
    );
    allTransactions = allTransactions.concat(batch.transactions || []);
    totalPages = batch.totalPages || 1;
    page++;
  }

  let pushed = 0;
  let skipped = 0;
  let errorCount = 0;

  for (const txn of allTransactions) {
    if (await isAlreadySynced(txn.processorTxnId, txn.processorName, merchant.id)) {
      skipped++;
      continue;
    }

    try {
      const record = await pushPaymentRecord(txn, merchant.stripe_key);
      await markSynced(txn.processorTxnId, txn.processorName, record.id, merchant.id);
      pushed++;
    } catch (err) {
      if (err.code === 'idempotency_error' || err.statusCode === 400) {
        await markSynced(txn.processorTxnId, txn.processorName, null, merchant.id);
        skipped++;
      } else {
        errorCount++;
        await addSyncError(err.message, txn.processorTxnId, merchant.id);
      }
    }
  }

  return { pushed, skipped, errors: errorCount, total: allTransactions.length };
}

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
