/**
 * Sync State — SQLite persistence layer for sync state and dedup.
 *
 * Survives server restarts so we never re-push the same transaction twice.
 * Stores: last sync time, total synced count, processor txn IDs, recent errors.
 */
import Database from 'better-sqlite3';
import { mkdirSync, existsSync } from 'fs';
import { dirname, resolve } from 'path';
import { config } from '../config.js';

// Ensure the data directory exists
const dbPath = resolve(process.cwd(), config.databasePath);
const dbDir = dirname(dbPath);
if (!existsSync(dbDir)) {
  mkdirSync(dbDir, { recursive: true });
}

const db = new Database(dbPath);

// Enable WAL mode for better concurrent access
db.pragma('journal_mode = WAL');

/**
 * Initialize the database schema.
 * Safe to call multiple times (IF NOT EXISTS).
 */
export function initDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS merchants (
      id TEXT PRIMARY KEY,
      stripe_key TEXT NOT NULL DEFAULT '',
      paypal_client_id TEXT NOT NULL DEFAULT '',
      paypal_client_secret TEXT NOT NULL DEFAULT '',
      paypal_environment TEXT NOT NULL DEFAULT 'sandbox',
      api_key TEXT NOT NULL UNIQUE,
      display_name TEXT NOT NULL DEFAULT '',
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS sync_state (
      id INTEGER PRIMARY KEY DEFAULT 1,
      merchant_id TEXT NOT NULL DEFAULT '',
      last_sync_at TEXT,
      total_synced INTEGER DEFAULT 0,
      updated_at TEXT
    );

    CREATE TABLE IF NOT EXISTS synced_transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      merchant_id TEXT NOT NULL DEFAULT '',
      processor_txn_id TEXT NOT NULL,
      processor_name TEXT NOT NULL,
      stripe_record_id TEXT,
      synced_at TEXT NOT NULL DEFAULT (datetime('now')),
      UNIQUE(merchant_id, processor_txn_id, processor_name)
    );

    CREATE TABLE IF NOT EXISTS sync_errors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      merchant_id TEXT NOT NULL DEFAULT '',
      error_message TEXT NOT NULL,
      processor_txn_id TEXT,
      occurred_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS synced_refunds (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      merchant_id TEXT NOT NULL DEFAULT '',
      refund_processor_txn_id TEXT NOT NULL,
      payment_processor_txn_id TEXT NOT NULL,
      processor_name TEXT NOT NULL,
      stripe_payment_record_id TEXT,
      stripe_refund_record_id TEXT,
      amount_refunded INTEGER NOT NULL,
      currency TEXT NOT NULL,
      synced_at TEXT NOT NULL DEFAULT (datetime('now')),
      UNIQUE(merchant_id, refund_processor_txn_id, processor_name)
    );
  `);

  // Ensure the default state row exists (backward compat)
  const row = db.prepare('SELECT id FROM sync_state WHERE id = 1').get();
  if (!row) {
    db.prepare('INSERT INTO sync_state (id, total_synced) VALUES (1, 0)').run();
  }
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
export function createMerchant(displayName) {
  const id = `merchant_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const apiKey = generateApiKey();
  db.prepare(`
    INSERT INTO merchants (id, api_key, display_name)
    VALUES (?, ?, ?)
  `).run(id, apiKey, displayName || 'Unnamed merchant');
  return getMerchant(id);
}

/**
 * Get a merchant by ID.
 */
export function getMerchant(id) {
  return db.prepare('SELECT * FROM merchants WHERE id = ?').get(id) || null;
}

/**
 * Get a merchant by API key.
 */
export function getMerchantByApiKey(apiKey) {
  return db.prepare('SELECT * FROM merchants WHERE api_key = ?').get(apiKey) || null;
}

/**
 * Update a merchant's credentials.
 */
export function updateMerchantCredentials(id, credentials) {
  const fields = [];
  const values = [];
  for (const [key, val] of Object.entries(credentials)) {
    if (['stripe_key', 'paypal_client_id', 'paypal_client_secret', 'paypal_environment', 'display_name'].includes(key)) {
      fields.push(`${key} = ?`);
      values.push(val);
    }
  }
  if (fields.length === 0) return getMerchant(id);
  fields.push('updated_at = datetime(\'now\')');
  values.push(id);
  db.prepare(`UPDATE merchants SET ${fields.join(', ')} WHERE id = ?`).run(...values);
  return getMerchant(id);
}

/**
 * List all merchants.
 */
export function getAllMerchants() {
  return db.prepare('SELECT * FROM merchants ORDER BY created_at DESC').all();
}

/**
 * Delete a merchant.
 */
export function deleteMerchant(id) {
  db.prepare('DELETE FROM synced_transactions WHERE merchant_id = ?').run(id);
  db.prepare('DELETE FROM sync_errors WHERE merchant_id = ?').run(id);
  db.prepare('DELETE FROM synced_refunds WHERE merchant_id = ?').run(id);
  db.prepare('DELETE FROM merchants WHERE id = ?').run(id);
}

/**
 * Get the current sync state.
 */
export function getState() {
  const state = db.prepare('SELECT * FROM sync_state WHERE id = 1').get();
  const totalSynced = state?.total_synced || 0;

  // Count unique processor txns in the DB for accuracy
  const count = db.prepare('SELECT COUNT(*) as count FROM synced_transactions').get();

  return {
    lastSyncAt: state?.last_sync_at || null,
    totalSynced: count?.count || totalSynced,
  };
}

/**
 * Mark a transaction as successfully synced.
 */
export function markSynced(processorTxnId, processorName, stripeRecordId, merchantId = '') {
  db.prepare(`
    INSERT OR IGNORE INTO synced_transactions (merchant_id, processor_txn_id, processor_name, stripe_record_id)
    VALUES (?, ?, ?, ?)
  `).run(merchantId, processorTxnId, processorName, stripeRecordId || null);
}

/**
 * Check if a transaction has already been synced.
 */
export function isAlreadySynced(processorTxnId, processorName, merchantId = '') {
  const row = db.prepare(`
    SELECT id FROM synced_transactions
    WHERE merchant_id = ? AND processor_txn_id = ? AND processor_name = ?
  `).get(merchantId, processorTxnId, processorName);
  return !!row;
}

/**
 * Update the aggregate sync state after a sync cycle.
 */
export function updateSyncState(merchantId = '') {
  const now = new Date().toISOString();
  db.prepare(`
    INSERT OR REPLACE INTO sync_state (id, merchant_id, last_sync_at, updated_at)
    VALUES (1, ?, ?, ?)
  `).run(merchantId, now, now);
}

/**
 * Log a sync error.
 */
export function addSyncError(errorMessage, processorTxnId, merchantId = '') {
  db.prepare(`
    INSERT INTO sync_errors (merchant_id, error_message, processor_txn_id)
    VALUES (?, ?, ?)
  `).run(merchantId, errorMessage, processorTxnId || null);

  // Keep only last 100 errors (scoped to merchant)
  db.prepare(`
    DELETE FROM sync_errors WHERE id NOT IN (
      SELECT id FROM sync_errors WHERE merchant_id = ? ORDER BY id DESC LIMIT 100
    )
  `).run(merchantId);
}

/**
 * Get the most recent sync errors.
 */
export function getRecentErrors(limit = 10, merchantId = '') {
  if (merchantId) {
    return db.prepare(`
      SELECT error_message as error, processor_txn_id as txnId, occurred_at as time
      FROM sync_errors
      WHERE merchant_id = ?
      ORDER BY id DESC
      LIMIT ?
    `).all(merchantId, limit);
  }
  return db.prepare(`
    SELECT error_message as error, processor_txn_id as txnId, occurred_at as time
    FROM sync_errors
    ORDER BY id DESC
    LIMIT ?
  `).all(limit);
}

/**
 * Get all processor transaction IDs currently tracked (for debugging).
 */
export function getAllSyncedIds(processorName, merchantId = '') {
  if (merchantId) {
    return db.prepare(`
      SELECT processor_txn_id, stripe_record_id, synced_at
      FROM synced_transactions
      WHERE merchant_id = ? AND processor_name = ?
      ORDER BY synced_at DESC
      LIMIT 50
    `).all(merchantId, processorName);
  }
  return db.prepare(`
    SELECT processor_txn_id, stripe_record_id, synced_at
    FROM synced_transactions
    WHERE processor_name = ?
    ORDER BY synced_at DESC
    LIMIT 50
  `).all(processorName);
}

/**
 * Look up the Stripe Payment Record ID from a processor transaction ID.
 * Used when we encounter a refund in PayPal data — we need to know
 * which Stripe payment record the refund belongs to.
 */
export function lookupStripeRecordId(processorTxnId, processorName, merchantId = '') {
  const row = db.prepare(`
    SELECT stripe_record_id FROM synced_transactions
    WHERE merchant_id = ? AND processor_txn_id = ? AND processor_name = ?
  `).get(merchantId, processorTxnId, processorName);
  return row?.stripe_record_id || null;
}

/**
 * Mark a refund as synced to Stripe.
 */
export function markRefundSynced(
  refundProcessorTxnId,
  paymentProcessorTxnId,
  processorName,
  stripePaymentRecordId,
  stripeRefundRecordId,
  amountRefunded,
  currency,
  merchantId = ''
) {
  db.prepare(`
    INSERT OR IGNORE INTO synced_refunds
      (merchant_id, refund_processor_txn_id, payment_processor_txn_id, processor_name,
       stripe_payment_record_id, stripe_refund_record_id, amount_refunded, currency)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    merchantId,
    refundProcessorTxnId,
    paymentProcessorTxnId,
    processorName,
    stripePaymentRecordId || null,
    stripeRefundRecordId || null,
    amountRefunded,
    currency
  );
}

/**
 * Check if a refund has already been synced.
 */
export function isRefundAlreadySynced(refundProcessorTxnId, processorName, merchantId = '') {
  const row = db.prepare(`
    SELECT id FROM synced_refunds
    WHERE merchant_id = ? AND refund_processor_txn_id = ? AND processor_name = ?
  `).get(merchantId, refundProcessorTxnId, processorName);
  return !!row;
}

/**
 * Get all synced refunds for debugging.
 */
export function getAllSyncedRefunds(limit = 20, merchantId = '') {
  if (merchantId) {
    return db.prepare(`
      SELECT * FROM synced_refunds WHERE merchant_id = ? ORDER BY synced_at DESC LIMIT ?
    `).all(merchantId, limit);
  }
  return db.prepare(`
    SELECT * FROM synced_refunds ORDER BY synced_at DESC LIMIT ?
  `).all(limit);
}

/**
 * Close the database connection.
 */
export function closeDatabase() {
  db.close();
}

// Initialize on import
initDatabase();
