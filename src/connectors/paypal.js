/**
 * PayPal Connector — Fetch transactions from PayPal Reporting API.
 *
 * Now accepts per-merchant credentials (clientId, clientSecret, environment).
 * Falls back to global config for backward compatibility.
 */
import { config } from '../config.js';

/**
 * Determine the PayPal API base URL from environment.
 */
function getBaseUrl(environment) {
  return environment === 'live'
    ? 'https://api-m.paypal.com'
    : 'https://api-m.sandbox.paypal.com';
}

/**
 * Get a PayPal access token using provided credentials.
 */
async function getAccessToken(clientId, clientSecret, environment) {
  const baseUrl = getBaseUrl(environment);
  const creds = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  const res = await fetch(`${baseUrl}/v1/oauth2/token`, {
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
 * Convert PayPal amount string to cents (Stripe format).
 */
function toCents(amountStr, currency) {
  const amount = parseFloat(amountStr);
  if (isNaN(amount)) return 0;

  const zeroDecimalCurrencies = ['JPY', 'KRW', 'VND', 'IDR', 'BYR', 'XOF', 'XAF', 'CLP'];
  if (zeroDecimalCurrencies.includes(currency.toUpperCase())) {
    return Math.round(amount);
  }
  return Math.round(amount * 100);
}

/**
 * Normalize a PayPal transaction into Stripe-compatible format.
 */
function normalizeTransaction(txn, payerInfo) {
  const txnAmount = txn.transaction_amount || {};
  const initiatedAt = txn.transaction_initiation_date
    ? Math.floor(new Date(txn.transaction_initiation_date).getTime() / 1000)
    : Math.floor(Date.now() / 1000);

  const isCompleted = txn.transaction_status === 'S';
  const outcome = isCompleted ? 'guaranteed' : 'informational';

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
 *
 * @param {string} startDate - ISO date string
 * @param {string} endDate - ISO date string
 * @param {Object} [creds] - PayPal credentials (falls back to config)
 * @param {string} [creds.clientId]
 * @param {string} [creds.clientSecret]
 * @param {string} [creds.environment]
 * @param {number} [page=1]
 */
export async function fetchTransactions(startDate, endDate, creds, page = 1) {
  const clientId = creds?.clientId || config.paypal.clientId;
  const clientSecret = creds?.clientSecret || config.paypal.clientSecret;
  const environment = creds?.environment || config.paypal.environment;

  if (!clientId || !clientSecret) {
    throw new Error('PayPal not configured. Set your PayPal API credentials in the Bridge app settings.');
  }

  const baseUrl = getBaseUrl(environment);
  const token = await getAccessToken(clientId, clientSecret, environment);

  const params = new URLSearchParams({
    start_date: startDate,
    end_date: endDate,
    page_size: '100',
    page: String(page),
    transaction_status: 'S',
  });

  const res = await fetch(`${baseUrl}/v1/reporting/transactions?${params}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    const text = await res.text();
    if (res.status === 404 && text.includes('not available')) {
      return { transactions: [], total: 0, page, totalPages: 1 };
    }
    throw new Error(`PayPal reporting API error: ${res.status} — ${text}`);
  }

  const data = await res.json();
  const transactions = (data.transaction_details || []).map(d => {
    const txn = d.transaction_info || {};
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
 * Test PayPal connection with given credentials.
 */
export async function testConnection(creds) {
  const clientId = creds?.clientId || config.paypal.clientId;
  const clientSecret = creds?.clientSecret || config.paypal.clientSecret;
  const environment = creds?.environment || config.paypal.environment;
  const baseUrl = getBaseUrl(environment);
  const token = await getAccessToken(clientId, clientSecret, environment);

  const res = await fetch(`${baseUrl}/v1/identity/oauth2/userinfo?schema=paypalv1.1`, {
    headers: { 'Authorization': `Bearer ${token}` },
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
