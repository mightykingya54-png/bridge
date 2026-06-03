import { config } from '../config.js';

const BASE_URL = config.paypal.environment === 'live'
  ? 'https://api-m.paypal.com'
  : 'https://api-m.sandbox.paypal.com';

/**
 * Get a PayPal access token (OAuth2 client credentials).
 */
async function getAccessToken() {
  const creds = Buffer.from(`${config.paypal.clientId}:${config.paypal.clientSecret}`).toString('base64');
  const res = await fetch(`${BASE_URL}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${creds}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`PayPal auth failed: ${res.status} — ${text}`);
  }

  const data = await res.json();
  return data.access_token;
}

/**
 * Map PayPal transaction status to Stripe PaymentRecord status.
 */
function mapStatus(paypalStatus) {
  switch (paypalStatus) {
    case 'COMPLETED': return 'succeeded';
    case 'PENDING': return 'pending';
    case 'DENIED':
    case 'FAILED': return 'failed';
    case 'REFUNDED':
    case 'PARTIALLY_REFUNDED': return 'succeeded'; // refund handled separately
    default: return 'pending';
  }
}

/**
 * Convert PayPal amount string to cents (Stripe format).
 * PayPal: "10.50" -> Stripe: 1050
 */
function toCents(amountStr, currency) {
  const amount = parseFloat(amountStr);
  if (isNaN(amount)) return 0;

  // Currencies without cents (JPY, KRW, etc.)
  const zeroDecimalCurrencies = ['JPY', 'KRW', 'VND', 'IDR', 'BYR', 'XOF', 'XAF', 'CLP'];
  if (zeroDecimalCurrencies.includes(currency.toUpperCase())) {
    return Math.round(amount);
  }
  return Math.round(amount * 100);
}

/**
 * Normalize a PayPal transaction from the Reporting API into the format
 * expected by pushPaymentRecord.
 *
 * PayPal Reporting API transaction_info fields:
 *   transaction_id, transaction_amount, transaction_initiation_date,
 *   transaction_status, fee_amount, invoice_id, custom_field, etc.
 *
 * pushPaymentRecord expects:
 *   { processorTxnId, amount, currency, initiatedAt, outcome, processorName,
 *     description, payerDisplay? }
 */
function normalizeTransaction(txn, payerInfo) {
  // Amount from transaction_amount object: { currency_code, value }
  const txnAmount = txn.transaction_amount || {};
  const feeAmount = txn.fee_amount || {};

  // Parse timestamps — PayPal uses ISO 8601 format
  const initiatedAt = txn.transaction_initiation_date
    ? Math.floor(new Date(txn.transaction_initiation_date).getTime() / 1000)
    : Math.floor(Date.now() / 1000);

  // Map PayPal single-letter status to our outcome
  // S=Settlement(completed), D=Denied, P=Pending, V=Voided, F=Failed
  const isCompleted = txn.transaction_status === 'S';
  const outcome = isCompleted ? 'guaranteed' : 'informational';

  // Build a readable display name for the payer
  let payerDisplay = '';
  if (payerInfo && typeof payerInfo === 'object' && !Array.isArray(payerInfo)) {
    const name = payerInfo.payer_name || {};
    const email = payerInfo.email_address || '';
    if (name.given_name || name.surname) {
      payerDisplay = `PayPal account ${name.given_name || ''} ${name.surname || ''}`.trim();
    }
    if (email) {
      payerDisplay = payerDisplay ? `${payerDisplay} (${email})` : `PayPal account ${email}`;
    }
  }

  return {
    processorTxnId: txn.transaction_id || `paypal_${initiatedAt}`,
    amount: toCents(txnAmount.value || '0', txnAmount.currency_code || 'USD'),
    currency: (txnAmount.currency_code || 'USD').toLowerCase(),
    initiatedAt,
    outcome,
    processorName: 'paypal',
    description: `${txn.transaction_subject || ''}`.trim() || `PayPal transaction ${txn.transaction_id || ''}`,
    payerDisplay,
  };
}

/**
 * Fetch completed transactions from PayPal within a date range.
 * PayPal returns max 20 per page by default.
 *
 * @param {string} startDate - ISO date string
 * @param {string} endDate - ISO date string
 * @param {number} page - page number (1-indexed)
 * @returns {Promise<{transactions: Array, total: number}>}
 */
export async function fetchTransactions(startDate, endDate, page = 1) {
  const token = await getAccessToken();

  const params = new URLSearchParams({
    start_date: startDate,
    end_date: endDate,
    page_size: '100',
    page: String(page),
    transaction_status: 'S', // S=Settlement (completed), D=Denied, P=Pending, V=Voided, F=Failed
  });

  const res = await fetch(`${BASE_URL}/v1/reporting/transactions?${params}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    const text = await res.text();
    // PayPal returns 404 when there's no data for the given date range.
    // This is not an error — it just means no transactions in that window.
    if (res.status === 404 && text.includes('not available')) {
      return {
        transactions: [],
        total: 0,
        page,
        totalPages: 1,
      };
    }
    throw new Error(`PayPal reporting API error: ${res.status} — ${text}`);
  }

  const data = await res.json();
  const transactions = (data.transaction_details || []).map(d => {
    const txn = d.transaction_info || {};
    // payer_info can be an object or an empty array when not available
    const payer = d.payer_info && !Array.isArray(d.payer_info) ? d.payer_info : {};
    return normalizeTransaction(txn, payer);
  });

  return {
    transactions,
    total: data.total_items || transactions.length,
    page: data.page || page,
    totalPages: data.total_pages || 1,
  };
}

/**
 * Test PayPal connection by fetching account info.
 */
export async function testConnection() {
  const token = await getAccessToken();

  const res = await fetch(`${BASE_URL}/v1/identity/oauth2/userinfo?schema=paypalv1.1`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`PayPal identity check failed: ${res.status} — ${text}`);
  }

  const data = await res.json();
  return {
    connected: true,
    userId: data.user_id,
    email: data.emails?.[0]?.value,
  };
}
