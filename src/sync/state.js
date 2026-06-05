/**
 * Sync State — PostgreSQL persistence layer for sync state and dedup.
 *
 * Survives server restarts so we never re-push the same transaction twice.
 * Stores: merchants, last sync time, total synced count, processor txn IDs, recent errors.
 * All functions are async (PostgreSQL native).
 */
import { query, closePool } from '../db.js';

/**
 * Initialize the database schema.
 * Safe to call multiple times (IF NOT EXISTS).
 */
export async function initDatabase() {
  await query(`
    CREATE TABLE IF NOT EXISTS merchants (
      id TEXT PRIMARY KEY,
      stripe_key TEXT NOT NULL DEFAULT '',
      paypal_client_id TEXT NOT NULL DEFAULT '',
      paypal_client_secret TEXT NOT NULL DEFAULT '',
      paypal_environment TEXT NOT NULL DEFAULT 'sandbox',
      api_key TEXT NOT NULL UNIQUE,
      display_name TEXT NOT NULL DEFAULT '',
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    );
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS sync_state (
      id INTEGER PRIMARY KEY DEFAULT 1,
      merchant_id TEXT NOT NULL DEFAULT '',
      last_sync_at TIMESTAMP,
      total_synced INTEGER DEFAULT 0,
      updated_at TIMESTAMP
    );
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS synced_transactions (
      id SERIAL PRIMARY KEY,
      merchant_id TEXT NOT NULL DEFAULT '',
      processor_txn_id TEXT NOT NULL,
      processor_name TEXT NOT NULL,
      stripe_record_id TEXT,
      synced_at TIMESTAMP NOT NULL DEFAULT NOW(),
      UNIQUE(merchant_id, processor_txn_id, processor_name)
    );
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS sync_errors (
      id SERIAL PRIMARY KEY,
      merchant_id TEXT NOT NULL DEFAULT '',
      error_message TEXT NOT NULL,
      processor_txn_id TEXT,
      occurred_at TIMESTAMP NOT NULL DEFAULT NOW()
    );
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS synced_refunds (
      id SERIAL PRIMARY KEY,
      merchant_id TEXT NOT NULL DEFAULT '',
      refund_processor_txn_id TEXT NOT NULL,
      payment_processor_txn_id TEXT NOT NULL,
      processor_name TEXT NOT NULL,
      stripe_payment_record_id TEXT,
      stripe_refund_record_id TEXT,
      amount_refunded INTEGER NOT NULL,
      currency TEXT NOT NULL,
      synced_at TIMESTAMP NOT NULL DEFAULT NOW(),
      UNIQUE(merchant_id, refund_processor_txn_id, processor_name)
    );
  `);

  // Ensure the default state row exists (backward compat)
  const { rows } = await query('SELECT id FROM sync_state WHERE id = 1');
  if (rows.length === 0) {
    await query('INSERT INTO sync_state (id, total_synced) VALUES (1, 0)');
  }

  console.log('✅ Database schema initialized');
}

// ── Merchant CRUD ──────────────────────────────────────────────

function generateApiKey() {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let key = 'brg_';
  for (let i = 0; i < 40; i++) {
    key += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return key;
}

/**
 * Register a new merchant. Returns the merchant object with generated API key.
 */
export async function createMerchant(displayName) {
  const id = `merchant_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const apiKey = generateApiKey();
  await query(
    'INSERT INTO merchants (id, api_key, display_name) VALUES ($1, $2, $3)',
    [id, apiKey, displayName || 'Unnamed merchant']
  );
  return getMerchant(id);
}

/**
 * Get a merchant by ID.
 */
export async function getMerchant(id) {
  const { rows } = await query('SELECT * FROM merchants WHERE id = $1', [id]);
  return rows[0] || null;
}

/**
 * Get a merchant by API key.
 */
export async function getMerchantByApiKey(apiKey) {
  const { rows } = await query('SELECT * FROM merchants WHERE api_key = $1', [apiKey]);
  return rows[0] || null;
}

/**
 * Update a merchant's credentials.
 */
export async function updateMerchantCredentials(id, credentials) {
  const fields = [];
  const values = [];
  let idx = 1;
  for (const [key, val] of Object.entries(credentials)) {
    if (['stripe_key', 'paypal_client_id', 'paypal_client_secret', 'paypal_environment', 'display_name'].includes(key)) {
      fields.push(`${key} = $${idx}`);
      values.push(val);
      idx++;
    }
  }
  if (fields.length === 0) return getMerchant(id);
  fields.push(`updated_at = NOW()`);
  values.push(id);
  await query(
    `UPDATE merchants SET ${fields.join(', ')} WHERE id = $${idx}`,
    values
  );
  return getMerchant(id);
}

/**
 * List all merchants.
 */
export async function getAllMerchants() {
  const { rows } = await query('SELECT * FROM merchants ORDER BY created_at DESC');
  return rows;
}

/**
 * Delete a merchant and all their data.
 */
export async function deleteMerchant(id) {
  await query('DELETE FROM synced_transactions WHERE merchant_id = $1', [id]);
  await query('DELETE FROM sync_errors WHERE merchant_id = $1', [id]);
  await query('DELETE FROM synced_refunds WHERE merchant_id = $1', [id]);
  await query('DELETE FROM merchants WHERE id = $1', [id]);
}

/**
 * Get the current sync state.
 */
export async function getState() {
  const { rows } = await query('SELECT * FROM sync_state WHERE id = 1');
  const state = rows[0];
  const totalSynced = state?.total_synced || 0;

  // Count unique processor txns in the DB for accuracy
  const { rows: countRows } = await query('SELECT COUNT(*) as count FROM synced_transactions');
  const count = parseInt(countRows[0]?.count || '0', 10);

  return {
    lastSyncAt: state?.last_sync_at || null,
    totalSynced: count || totalSynced,
  };
}

/**
 * Mark a transaction as successfully synced.
 */
export async function markSynced(processorTxnId, processorName, stripeRecordId, merchantId = '') {
  await query(
    `INSERT INTO synced_transactions (merchant_id, processor_txn_id, processor_name, stripe_record_id)
     VALUES ($1, $2, $3, $4)
     ON CONFLICT (merchant_id, processor_txn_id, processor_name) DO NOTHING`,
    [merchantId, processorTxnId, processorName, stripeRecordId || null]
  );
}

/**
 * Check if a transaction has already been synced.
 */
export async function isAlreadySynced(processorTxnId, processorName, merchantId = '') {
  const { rows } = await query(
    'SELECT id FROM synced_transactions WHERE merchant_id = $1 AND processor_txn_id = $2 AND processor_name = $3',
    [merchantId, processorTxnId, processorName]
  );
  return rows.length > 0;
}

/**
 * Update the aggregate sync state after a sync cycle.
 */
export async function updateSyncState(merchantId = '') {
  const now = new Date().toISOString();
  await query(
    `INSERT INTO sync_state (id, merchant_id, last_sync_at, updated_at)
     VALUES (1, $1, $2, $2)
     ON CONFLICT (id) DO UPDATE SET merchant_id = $1, last_sync_at = $2, updated_at = $2`,
    [merchantId, now]
  );
}

/**
 * Log a sync error.
 */
export async function addSyncError(errorMessage, processorTxnId, merchantId = '') {
  await query(
    'INSERT INTO sync_errors (merchant_id, error_message, processor_txn_id) VALUES ($1, $2, $3)',
    [merchantId, errorMessage, processorTxnId || null]
  );

  // Keep only last 100 errors (scoped to merchant)
  await query(
    `DELETE FROM sync_errors WHERE id NOT IN (
      SELECT id FROM sync_errors WHERE merchant_id = $1 ORDER BY id DESC LIMIT 100
    )`,
    [merchantId]
  );
}

/**
 * Get the most recent sync errors.
 */
export async function getRecentErrors(limit = 10, merchantId = '') {
  if (merchantId) {
    const { rows } = await query(
      `SELECT error_message as error, processor_txn_id as "txnId", occurred_at as time
       FROM sync_errors
       WHERE merchant_id = $1
       ORDER BY id DESC
       LIMIT $2`,
      [merchantId, limit]
    );
    return rows;
  }
  const { rows } = await query(
    `SELECT error_message as error, processor_txn_id as "txnId", occurred_at as time
     FROM sync_errors
     ORDER BY id DESC
     LIMIT $1`,
    [limit]
  );
  return rows;
}

/**
 * Get all processor transaction IDs currently tracked (for debugging).
 */
export async function getAllSyncedIds(processorName, merchantId = '') {
  if (merchantId) {
    const { rows } = await query(
      `SELECT processor_txn_id, stripe_record_id, synced_at
       FROM synced_transactions
       WHERE merchant_id = $1 AND processor_name = $2
       ORDER BY synced_at DESC
       LIMIT 50`,
      [merchantId, processorName]
    );
    return rows;
  }
  const { rows } = await query(
    `SELECT processor_txn_id, stripe_record_id, synced_at
     FROM synced_transactions
     WHERE processor_name = $1
     ORDER BY synced_at DESC
     LIMIT 50`,
    [processorName]
  );
  return rows;
}

/**
 * Look up the Stripe Payment Record ID from a processor transaction ID.
 */
export async function lookupStripeRecordId(processorTxnId, processorName, merchantId = '') {
  const { rows } = await query(
    'SELECT stripe_record_id FROM synced_transactions WHERE merchant_id = $1 AND processor_txn_id = $2 AND processor_name = $3',
    [merchantId, processorTxnId, processorName]
  );
  return rows[0]?.stripe_record_id || null;
}

/**
 * Mark a refund as synced to Stripe.
 */
export async function markRefundSynced(
  refundProcessorTxnId,
  paymentProcessorTxnId,
  processorName,
  stripePaymentRecordId,
  stripeRefundRecordId,
  amountRefunded,
  currency,
  merchantId = ''
) {
  await query(
    `INSERT INTO synced_refunds
      (merchant_id, refund_processor_txn_id, payment_processor_txn_id, processor_name,
       stripe_payment_record_id, stripe_refund_record_id, amount_refunded, currency)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     ON CONFLICT (merchant_id, refund_processor_txn_id, processor_name) DO NOTHING`,
    [
      merchantId,
      refundProcessorTxnId,
      paymentProcessorTxnId,
      processorName,
      stripePaymentRecordId || null,
      stripeRefundRecordId || null,
      amountRefunded,
      currency,
    ]
  );
}

/**
 * Check if a refund has already been synced.
 */
export async function isRefundAlreadySynced(refundProcessorTxnId, processorName, merchantId = '') {
  const { rows } = await query(
    'SELECT id FROM synced_refunds WHERE merchant_id = $1 AND refund_processor_txn_id = $2 AND processor_name = $3',
    [merchantId, refundProcessorTxnId, processorName]
  );
  return rows.length > 0;
}

/**
 * Get all synced refunds for debugging.
 */
export async function getAllSyncedRefunds(limit = 20, merchantId = '') {
  if (merchantId) {
    const { rows } = await query(
      'SELECT * FROM synced_refunds WHERE merchant_id = $1 ORDER BY synced_at DESC LIMIT $2',
      [merchantId, limit]
    );
    return rows;
  }
  const { rows } = await query(
    'SELECT * FROM synced_refunds ORDER BY synced_at DESC LIMIT $1',
    [limit]
  );
  return rows;
}

/**
 * Close the database connection pool.
 */
export async function closeDatabase() {
  await closePool();
}


