/**
 * Sync Engine — Core sync orchestration.
 *
 * Fetches transactions from a processor (PayPal) and pushes them
 * to Stripe Payment Records, using SQLite for persistent dedup.
 *
 * Used by both the scheduled cron job and the manual API endpoint.
 */
import { fetchTransactions } from '../connectors/paypal.js';
import { pushPaymentRecord, pushRefundRecord } from '../connectors/stripe.js';
import {
  isAlreadySynced,
  markSynced,
  addSyncError,
  updateSyncState,
  getState,
  lookupStripeRecordId,
  markRefundSynced,
  isRefundAlreadySynced,
} from './state.js';

const SYNC_LOOKBACK_DAYS = 30; // how far back to scan on first sync

/**
 * Run one sync cycle.
 *
 * @param {Object} [options]
 * @param {string} [options.startDate] - ISO date (default: last sync or 30 days back)
 * @param {string} [options.endDate] - ISO date (default: now)
 * @returns {Promise<{pushed: number, skipped: number, errors: number, total: number, recordIds: string[]}>}
 */
export async function runSync(options = {}) {
  const state = getState();

  // Determine date range
  const endDate = options.endDate
    ? new Date(options.endDate)
    : new Date();

  let startDate;
  if (options.startDate) {
    startDate = new Date(options.startDate);
  } else if (state.lastSyncAt) {
    // Start from last sync minus 1h overlap for edge cases
    startDate = new Date(new Date(state.lastSyncAt).getTime() - 60 * 60 * 1000);
  } else {
    // First ever sync: look back SYNC_LOOKBACK_DAYS
    startDate = new Date(Date.now() - SYNC_LOOKBACK_DAYS * 24 * 60 * 60 * 1000);
  }

  // Fetch all pages from PayPal
  let page = 1;
  let totalPages = 1;
  let allTransactions = [];

  while (page <= totalPages) {
    const batch = await fetchTransactions(
      startDate.toISOString(),
      endDate.toISOString(),
      page
    );
    allTransactions = allTransactions.concat(batch.transactions || []);
    totalPages = batch.totalPages || 1;
    page++;
  }

  // Process each transaction
  let pushed = 0;
  let skipped = 0;
  let errorCount = 0;
  const recordIds = [];

  for (const txn of allTransactions) {
    // DB-level dedup
    if (isAlreadySynced(txn.processorTxnId, txn.processorName)) {
      skipped++;
      continue;
    }

    try {
      const record = await pushPaymentRecord(txn);
      markSynced(txn.processorTxnId, txn.processorName, record.id);
      recordIds.push(record.id);
      pushed++;
    } catch (err) {
      // Stripe idempotency = already exists (race condition on concurrent runs)
      if (err.code === 'idempotency_error' || err.statusCode === 400) {
        markSynced(txn.processorTxnId, txn.processorName, null);
        skipped++;
      } else {
        errorCount++;
        addSyncError(err.message, txn.processorTxnId);
      }
    }
  }

  // Update aggregate sync state
  updateSyncState();

  return {
    pushed,
    skipped,
    errors: errorCount,
    total: allTransactions.length,
    recordIds,
    type: 'payment',
  };
}

/**
 * Process a refund for a payment record that was previously synced.
 *
 * @param {Object} refund
 * @param {string} refund.processorTxnId - Refund's processor transaction ID
 * @param {string} refund.paymentProcessorTxnId - Original payment's processor transaction ID
 * @param {number} refund.amount - Refund amount in cents
 * @param {string} refund.currency - Currency code
 * @param {number} refund.initiatedAt - Unix timestamp
 * @param {string} refund.processorName - e.g. 'paypal'
 * @returns {Promise<{success: boolean, stripePaymentRecordId: string, stripeRefundRecordId: string, skipped: boolean}>}
 */
export async function processRefund(refund) {
  // Check DB dedup first
  if (isRefundAlreadySynced(refund.processorTxnId, refund.processorName)) {
    return { success: true, skipped: true };
  }

  // Look up the original payment's Stripe Payment Record ID
  const stripePaymentRecordId = lookupStripeRecordId(
    refund.paymentProcessorTxnId,
    refund.processorName
  );

  if (!stripePaymentRecordId) {
    const msg = `Cannot process refund ${refund.processorTxnId}: original payment ${refund.paymentProcessorTxnId} not found in DB. Payment may not have been synced yet.`;
    addSyncError(msg, refund.processorTxnId);
    return { success: false, skipped: false, error: msg };
  }

  try {
    const result = await pushRefundRecord(stripePaymentRecordId, refund);

    markRefundSynced(
      refund.processorTxnId,
      refund.paymentProcessorTxnId,
      refund.processorName,
      stripePaymentRecordId,
      result.id,
      refund.amount,
      refund.currency
    );

    return {
      success: true,
      skipped: false,
      stripePaymentRecordId,
      stripeRefundRecordId: result.id,
    };
  } catch (err) {
    // Stripe idempotency — already exists
    if (err.code === 'idempotency_error' || err.statusCode === 400) {
      markRefundSynced(
        refund.processorTxnId,
        refund.paymentProcessorTxnId,
        refund.processorName,
        stripePaymentRecordId,
        null,
        refund.amount,
        refund.currency
      );
      return { success: true, skipped: true };
    }
    addSyncError(err.message, refund.processorTxnId);
    return { success: false, skipped: false, error: err.message };
  }
}
