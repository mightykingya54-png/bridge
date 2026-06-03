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
    CREATE TABLE IF NOT EXISTS sync_state (
      id INTEGER PRIMARY KEY DEFAULT 1,
      last_sync_at TEXT,
      total_synced INTEGER DEFAULT 0,
      updated_at TEXT
    );

    CREATE TABLE IF NOT EXISTS synced_transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      processor_txn_id TEXT NOT NULL,
      processor_name TEXT NOT NULL,
      stripe_record_id TEXT,
      synced_at TEXT NOT NULL DEFAULT (datetime('now')),
      UNIQUE(processor_txn_id, processor_name)
    );

    CREATE TABLE IF NOT EXISTS sync_errors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      error_message TEXT NOT NULL,
      processor_txn_id TEXT,
      occurred_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS synced_refunds (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      refund_processor_txn_id TEXT NOT NULL,
      payment_processor_txn_id TEXT NOT NULL,
      processor_name TEXT NOT NULL,
      stripe_payment_record_id TEXT,
      stripe_refund_record_id TEXT,
      amount_refunded INTEGER NOT NULL,
      currency TEXT NOT NULL,
      synced_at TEXT NOT NULL DEFAULT (datetime('now')),
      UNIQUE(refund_processor_txn_id, processor_name)
    );
  `);

  // Ensure the state row exists
  const row = db.prepare('SELECT id FROM sync_state WHERE id = 1').get();
  if (!row) {
    db.prepare('INSERT INTO sync_state (id, total_synced) VALUES (1, 0)').run();
  }
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
export function markSynced(processorTxnId, processorName, stripeRecordId) {
  db.prepare(`
    INSERT OR IGNORE INTO synced_transactions (processor_txn_id, processor_name, stripe_record_id)
    VALUES (?, ?, ?)
  `).run(processorTxnId, processorName, stripeRecordId || null);
}

/**
 * Check if a transaction has already been synced.
 */
export function isAlreadySynced(processorTxnId, processorName) {
  const row = db.prepare(`
    SELECT id FROM synced_transactions
    WHERE processor_txn_id = ? AND processor_name = ?
  `).get(processorTxnId, processorName);
  return !!row;
}

/**
 * Update the aggregate sync state after a sync cycle.
 */
export function updateSyncState() {
  const now = new Date().toISOString();
  db.prepare(`
    UPDATE sync_state SET last_sync_at = ?, updated_at = ?
    WHERE id = 1
  `).run(now, now);
}

/**
 * Log a sync error.
 */
export function addSyncError(errorMessage, processorTxnId) {
  db.prepare(`
    INSERT INTO sync_errors (error_message, processor_txn_id)
    VALUES (?, ?)
  `).run(errorMessage, processorTxnId || null);

  // Keep only last 100 errors
  db.prepare(`
    DELETE FROM sync_errors WHERE id NOT IN (
      SELECT id FROM sync_errors ORDER BY id DESC LIMIT 100
    )
  `).run();
}

/**
 * Get the most recent sync errors.
 */
export function getRecentErrors(limit = 10) {
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
export function getAllSyncedIds(processorName) {
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
export function lookupStripeRecordId(processorTxnId, processorName) {
  const row = db.prepare(`
    SELECT stripe_record_id FROM synced_transactions
    WHERE processor_txn_id = ? AND processor_name = ?
  `).get(processorTxnId, processorName);
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
  currency
) {
  db.prepare(`
    INSERT OR IGNORE INTO synced_refunds
      (refund_processor_txn_id, payment_processor_txn_id, processor_name,
       stripe_payment_record_id, stripe_refund_record_id, amount_refunded, currency)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(
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
export function isRefundAlreadySynced(refundProcessorTxnId, processorName) {
  const row = db.prepare(`
    SELECT id FROM synced_refunds
    WHERE refund_processor_txn_id = ? AND processor_name = ?
  `).get(refundProcessorTxnId, processorName);
  return !!row;
}

/**
 * Get all synced refunds for debugging.
 */
export function getAllSyncedRefunds(limit = 20) {
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
