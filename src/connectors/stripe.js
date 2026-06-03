import Stripe from 'stripe';
import { config } from '../config.js';

const stripe = new Stripe(config.stripe.secretKey);

/**
 * Push an external (non-Stripe) payment into Stripe's Payment Records API.
 *
 * @param {Object} payment
 * @param {string} payment.processorTxnId - Unique processor transaction ID (e.g. PayPal txn ID)
 * @param {number} payment.amount - Amount in cents
 * @param {string} payment.currency - Currency code (e.g. 'usd')
 * @param {number} payment.initiatedAt - Unix timestamp when payment was taken
 * @param {'guaranteed'|'informational'} [payment.outcome] - Default 'guaranteed'
 * @param {string} payment.processorName - e.g. 'paypal'
 * @param {string} [payment.description]
 * @param {string} [payment.payerDisplay] - Display name for payer (e.g. PayPal email)
 */
export async function pushPaymentRecord(payment) {
  const idempotencyKey = `${payment.processorName}_${payment.processorTxnId}`;
  const now = Math.floor(Date.now() / 1000);

  // Build optional/conditional params
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

  // Only add guaranteed block if outcome is guaranteed
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
    // Enhance error with readable detail
    if (err.raw?.message) {
      err.message = `${err.message} — ${err.raw.message}`;
    }
    throw err;
  }
}

/**
 * Push a refund for an existing PaymentRecord.
 * Endpoint: POST /v1/payment_records/{id}/report_refund
 *
 * Schema from OpenAPI spec:
 *   amount[currency] + amount[value]  (required)
 *   initiated_at  (unix timestamp)
 *   outcome=refunded
 *   refunded[refunded_at]=<timestamp>
 *   processor_details[type]=custom
 *   processor_details[custom][refund_reference]=<refund_id>
 *   metadata (optional)
 */
export async function pushRefundRecord(paymentRecordId, refund) {
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
 * Test that the Stripe connection works by fetching account info.
 */
export async function testConnection() {
  const account = await stripe.accounts.retrieve();
  return {
    connected: true,
    accountId: account.id,
    businessName: account.business_profile?.name || account.settings?.dashboard?.display_name,
  };
}

export { stripe };
