/**
 * Stripe Connector — Push transactions to Stripe Payment Records API.
 *
 * Now accepts a stripeKey parameter for per-merchant usage.
 * Falls back to the global config key for backward compatibility.
 */
import Stripe from 'stripe';
import { config } from '../config.js';

/**
 * Create a Stripe client with the given secret key.
 * Falls back to config's secret key if not provided.
 */
function getClient(stripeKey) {
  const key = stripeKey || config.stripe.secretKey;
  if (!key) {
    throw new Error('No Stripe secret key provided. Configure your Stripe key in the Bridge app settings.');
  }
  // Cache clients by key to avoid creating new instances each time
  const cache = getClient._cache || (getClient._cache = new Map());
  if (!cache.has(key)) {
    cache.set(key, new Stripe(key));
  }
  return cache.get(key);
}

/**
 * Push an external (non-Stripe) payment into Stripe's Payment Records API.
 *
 * @param {Object} payment
 * @param {string} payment.processorTxnId
 * @param {number} payment.amount - Amount in cents
 * @param {string} payment.currency
 * @param {number} payment.initiatedAt - Unix timestamp
 * @param {string} [payment.outcome]
 * @param {string} payment.processorName
 * @param {string} [payment.description]
 * @param {string} [payment.payerDisplay]
 * @param {string} [stripeKey] - Per-merchant Stripe key (optional, falls back to config)
 */
export async function pushPaymentRecord(payment, stripeKey) {
  const stripe = getClient(stripeKey);
  const idempotencyKey = `${payment.processorName}_${payment.processorTxnId}`;
  const now = Math.floor(Date.now() / 1000);

  const params = {
    amount_requested: {
      currency: payment.currency,
      value: payment.amount,
    },
    initiated_at: payment.initiatedAt,
    outcome: payment.outcome || 'guaranteed',
    payment_method_details: {
      type: 'custom',
      custom: {
        display_name: payment.payerDisplay || `${payment.processorName} payment`,
      },
    },
    processor_details: {
      type: 'custom',
      custom: {
        payment_reference: payment.processorTxnId,
      },
    },
    description: payment.description || `Imported from ${payment.processorName}`,
  };

  if ((payment.outcome || 'guaranteed') === 'guaranteed') {
    params.guaranteed = { guaranteed_at: now };
  }

  try {
    const record = await stripe.rawRequest(
      'post',
      '/v1/payment_records/report_payment',
      params,
      { idempotencyKey },
    );
    return record;
  } catch (err) {
    if (err.raw?.message) {
      err.message = `${err.message} — ${err.raw.message}`;
    }
    throw err;
  }
}

/**
 * Push a refund for an existing PaymentRecord.
 */
export async function pushRefundRecord(paymentRecordId, refund, stripeKey) {
  const stripe = getClient(stripeKey);
  const idempotencyKey = `refund_${refund.processorName}_${refund.processorTxnId}`;
  const now = Math.floor(Date.now() / 1000);

  const params = {
    amount: {
      currency: refund.currency,
      value: refund.amount,
    },
    initiated_at: refund.initiatedAt || now,
    outcome: 'refunded',
    refunded: {
      refunded_at: now,
    },
    processor_details: {
      type: 'custom',
      custom: {
        refund_reference: refund.processorTxnId,
      },
    },
    metadata: refund.metadata || {},
  };

  try {
    const result = await stripe.rawRequest(
      'post',
      `/v1/payment_records/${paymentRecordId}/report_refund`,
      params,
      { idempotencyKey },
    );
    return result;
  } catch (err) {
    if (err.raw?.message) {
      err.message = `${err.message} — ${err.raw.message}`;
    }
    throw err;
  }
}

/**
 * Test that a Stripe connection works by fetching account info.
 */
export async function testConnection(stripeKey) {
  const stripe = getClient(stripeKey);
  const account = await stripe.accounts.retrieve();
  return {
    connected: true,
    accountId: account.id,
    businessName: account.business_profile?.name || account.settings?.dashboard?.display_name,
  };
}
