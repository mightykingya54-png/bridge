/**
 * Sync Engine — Core sync orchestration.
 *
 * Fetches transactions from a processor and pushes them
 * to Stripe Payment Records, using per-merchant credentials.
 */
import { fetchTransactions } from '../connectors/paypal.js';
import { pushPaymentRecord, pushRefundRecord } from '../connectors/stripe.js';
import {
  isAlreadySynced,
  markSynced,
  addSyncError,
  updateSyncState,
  recordSyncRun,
  lookupStripeRecordId,
  markRefundSynced,
  isRefundAlreadySynced,
} from './state.js';

const SYNC_LOOKBACK_DAYS = 30;

/**
 * Run one sync cycle for a specific merchant.
 *
 * @param {Object} options
 * @param {Object} options.merchant - Merchant object with stripe_key, paypal_client_id, etc.
 * @param {string} [options.startDate]
 * @param {string} [options.endDate]
 */
export async function runSync(options = {}) {
  const { merchant } = options;
  if (!merchant) throw new Error('Merchant config required for sync');
  const merchantId = merchant.id;

  // Determine date range
  const endDate = options.endDate
    ? new Date(options.endDate)
    : new Date();

  let startDate;
  if (options.startDate) {
    startDate = new Date(options.startDate);
  } else {
    // Always sync last 7 days by default (PayPal might not have old data)
    startDate = new Date(Date.now() - SYNC_LOOKBACK_DAYS * 24 * 60 * 60 * 1000);
  }

  const paypalCreds = {
    clientId: merchant.paypal_client_id,
    clientSecret: merchant.paypal_client_secret,
    environment: merchant.paypal_environment,
  };

  // Fetch all pages from PayPal
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

  // Process each transaction
  let pushed = 0;
  let skipped = 0;
  let errorCount = 0;
  let totalRevenueCents = 0;
  let revenueCurrency = 'USD';
  const recordIds = [];

  for (const txn of allTransactions) {
    if (await isAlreadySynced(txn.processorTxnId, txn.processorName, merchantId)) {
      skipped++;
      continue;
    }

    try {
      const record = await pushPaymentRecord(txn, merchant.stripe_key);
      await markSynced(txn.processorTxnId, txn.processorName, record.id, merchantId);
      recordIds.push(record.id);
      totalRevenueCents += txn.amount || 0;
      revenueCurrency = txn.currency || 'USD';
      pushed++;
    } catch (err) {
      if (err.code === 'idempotency_error' || err.statusCode === 400) {
        await markSynced(txn.processorTxnId, txn.processorName, null, merchantId);
        skipped++;
      } else {
        errorCount++;
        await addSyncError(err.message, txn.processorTxnId, merchantId);
      }
    }
  }

  await updateSyncState(merchantId);

  // Determine run status
  let runStatus = 'success';
  let runErrorMsg = null;
  if (errorCount > 0 && pushed === 0) {
    runStatus = 'failed';
    runErrorMsg = `${errorCount} transaction(s) failed`;
  } else if (errorCount > 0) {
    runStatus = 'partial';
    runErrorMsg = `${errorCount} transaction(s) failed`;
  }

  await recordSyncRun(merchantId, {
    pushed,
    skipped,
    errors: errorCount,
    totalRevenueCents,
    currency: revenueCurrency,
    status: runStatus,
    errorMessage: runErrorMsg,
  });

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
 */
export async function processRefund(refund) {
  const merchant = refund.merchant;
  if (!merchant) throw new Error('Merchant config required for refund');
  const merchantId = merchant.id;

  if (await isRefundAlreadySynced(refund.processorTxnId, refund.processorName, merchantId)) {
    return { success: true, skipped: true };
  }

  const stripePaymentRecordId = await lookupStripeRecordId(
    refund.paymentProcessorTxnId,
    refund.processorName,
    merchantId
  );

  if (!stripePaymentRecordId) {
    const msg = `Cannot process refund ${refund.processorTxnId}: original payment ${refund.paymentProcessorTxnId} not found in DB.`;
    await addSyncError(msg, refund.processorTxnId, merchantId);
    return { success: false, error: msg };
  }

  try {
    const result = await pushRefundRecord(stripePaymentRecordId, refund, merchant.stripe_key);

    await markRefundSynced(
      refund.processorTxnId,
      refund.paymentProcessorTxnId,
      refund.processorName,
      stripePaymentRecordId,
      result.id,
      refund.amount,
      refund.currency,
      merchantId
    );

    return {
      success: true,
      stripePaymentRecordId,
      stripeRefundRecordId: result.id,
    };
  } catch (err) {
    if (err.code === 'idempotency_error' || err.statusCode === 400) {
      await markRefundSynced(
        refund.processorTxnId,
        refund.paymentProcessorTxnId,
        refund.processorName,
        stripePaymentRecordId,
        null,
        refund.amount,
        refund.currency,
        merchantId
      );
      return { success: true, skipped: true };
    }
    await addSyncError(err.message, refund.processorTxnId, merchantId);
    return { success: false, error: err.message };
  }
}
