/**
 * Sync State — PostgreSQL persistence layer for sync state and dedup.
 *
 * Survives server restarts so we never re-push the same transaction twice.
 * Stores: merchants, last sync time, total synced count, processor txn IDs, recent errors.
 * All functions are async (PostgreSQL native).
 */
import crypto from 'crypto';
import { query, closePool } from '../db.js';
import { config } from '../config.js';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16;  // 128-bit IV for GCM

// Encryption key — initialized at startup, cached in memory
let _encryptionKey = null;

/**
 * Initialize the encryption key on first startup.
 * Priority: 1) ENCRYPTION_KEY env var  2) server_secrets DB table  3) new generated key
 */
async function initEncryptionKey() {
  if (_encryptionKey) return;

  // 1. Check env var
  if (config.encryptionKey) {
    _encryptionKey = crypto.createHash('sha256').update(config.encryptionKey).digest();
    console.log('🔐 Encryption: using ENCRYPTION_KEY from environment');
    return;
  }

  // 2. Check DB for existing key
  try {
    const { rows } = await query("SELECT value FROM server_secrets WHERE key = 'encryption_key'");
    if (rows.length > 0) {
      _encryptionKey = Buffer.from(rows[0].value, 'hex');
      console.log('🔐 Encryption: loaded key from database');
      return;
    }
  } catch {
    // Table might not exist yet during initDatabase — will be handled after schema init
  }

  // 3. Generate new key and store in DB
  const rawKey = crypto.randomBytes(32);
  _encryptionKey = rawKey; // already 32 bytes
  try {
    await query("INSERT INTO server_secrets (key, value) VALUES ('encryption_key', $1) ON CONFLICT (key) DO NOTHING", [rawKey.toString('hex')]);
    console.log('🔐 Encryption: generated and stored new key in database');
  } catch {
    // Table might not exist yet — key still works in memory for this session
    console.warn('⚠️  Could not store encryption key in DB. Data will be lost on restart.');
  }
}

function getEncryptionKey() {
  if (!_encryptionKey) {
    throw new Error('Encryption key not initialized. Call initEncryptionKey() first.');
  }
  return _encryptionKey;
}

/**
 * Encrypt a plaintext string using AES-256-GCM.
 * Returns: iv:authTag:ciphertext (all hex-encoded)
 */
export function encrypt(plaintext) {
  if (!plaintext) return '';
  const key = getEncryptionKey();
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  let encrypted = cipher.update(plaintext, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const authTag = cipher.getAuthTag().toString('hex');
  return `${iv.toString('hex')}:${authTag}:${encrypted}`;
}

/**
 * Decrypt a ciphertext string that was encrypted with encrypt().
 * Input format: iv:authTag:ciphertext (hex-encoded)
 */
export function decrypt(ciphertext) {
  if (!ciphertext || !ciphertext.includes(':')) return ciphertext;
  const key = getEncryptionKey();
  const parts = ciphertext.split(':');
  if (parts.length !== 3) return ciphertext; // not encrypted, return as-is
  const iv = Buffer.from(parts[0], 'hex');
  const authTag = Buffer.from(parts[1], 'hex');
  const encrypted = parts[2];
  try {
    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    decipher.setAuthTag(authTag);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  } catch {
    // If decryption fails, return as-is (backward compat with unencrypted data)
    return ciphertext;
  }
}

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

  // Add subscription columns if they don't exist (safe for existing DBs)
  try {
    await query(`ALTER TABLE merchants ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT DEFAULT ''`);
    await query(`ALTER TABLE merchants ADD COLUMN IF NOT EXISTS stripe_subscription_id TEXT DEFAULT ''`);
    await query(`ALTER TABLE merchants ADD COLUMN IF NOT EXISTS subscription_status TEXT DEFAULT 'trial'`);
    await query(`ALTER TABLE merchants ADD COLUMN IF NOT EXISTS subscription_tier TEXT DEFAULT 'free'`);
    await query(`ALTER TABLE merchants ADD COLUMN IF NOT EXISTS trial_end_at TIMESTAMP`);
    await query(`ALTER TABLE merchants ADD COLUMN IF NOT EXISTS stripe_account_id TEXT DEFAULT ''`);
  } catch (e) {
    // Some Postgres versions don't support IF NOT EXISTS for columns — ignore
  }

  // Server secrets table (encryption keys, etc.)
  await query(`
    CREATE TABLE IF NOT EXISTS server_secrets (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    );
  `);

  // OAuth state table for Stripe Connect flow
  await query(`
    CREATE TABLE IF NOT EXISTS oauth_states (
      id SERIAL PRIMARY KEY,
      state TEXT UNIQUE NOT NULL,
      merchant_id TEXT NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      used BOOLEAN NOT NULL DEFAULT FALSE
    );
  `);

  // Ensure the default state row exists (backward compat)
  const { rows } = await query('SELECT id FROM sync_state WHERE id = 1');
  if (rows.length === 0) {
    await query('INSERT INTO sync_state (id, total_synced) VALUES (1, 0)');
  }

  // Initialize encryption key (env var → DB → generate new)
  await initEncryptionKey();

  console.log('✅ Database schema initialized');
}

// ── Merchant CRUD ──────────────────────────────────────────────

/**
 * Decrypt sensitive fields on a merchant row fetched from DB.
 * Always decrypts stripe_key, paypal_client_id, paypal_client_secret.
 */
function decryptMerchant(merchant) {
  if (!merchant) return merchant;
  return {
    ...merchant,
    stripe_key: decrypt(merchant.stripe_key || ''),
    paypal_client_id: decrypt(merchant.paypal_client_id || ''),
    paypal_client_secret: decrypt(merchant.paypal_client_secret || ''),
  };
}

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
  return decryptMerchant(rows[0] || null);
}

/**
 * Get a merchant by API key.
 */
export async function getMerchantByApiKey(apiKey) {
  const { rows } = await query('SELECT * FROM merchants WHERE api_key = $1', [apiKey]);
  return decryptMerchant(rows[0] || null);
}

/**
 * Find a merchant by their Stripe account ID (acct_xxx).
 */
export async function getMerchantByStripeAccountId(stripeAccountId) {
  if (!stripeAccountId) return null;
  const { rows } = await query('SELECT * FROM merchants WHERE stripe_account_id = $1', [stripeAccountId]);
  return decryptMerchant(rows[0] || null);
}

/**
 * Update a merchant's credentials.
 */
export async function updateMerchantCredentials(id, credentials) {
  const fields = [];
  const values = [];
  let idx = 1;

  // Encrypt sensitive fields before storing
  const encrypted = { ...credentials };
  if (encrypted.stripe_key) encrypted.stripe_key = encrypt(encrypted.stripe_key);
  if (encrypted.paypal_client_id) encrypted.paypal_client_id = encrypt(encrypted.paypal_client_id);
  if (encrypted.paypal_client_secret) encrypted.paypal_client_secret = encrypt(encrypted.paypal_client_secret);

  for (const [key, val] of Object.entries(encrypted)) {
    if (['stripe_key', 'stripe_account_id', 'paypal_client_id', 'paypal_client_secret', 'paypal_environment', 'display_name'].includes(key)) {
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

// ── Subscription / Billing ──────────────────────────────────────

/**
 * Update a merchant's subscription details after Stripe checkout/webhook.
 */
export async function updateSubscription(merchantId, { stripeCustomerId, stripeSubscriptionId, status, tier }) {
  const fields = [];
  const values = [];
  let idx = 1;

  if (stripeCustomerId) { fields.push(`stripe_customer_id = $${idx}`); values.push(stripeCustomerId); idx++; }
  if (stripeSubscriptionId) { fields.push(`stripe_subscription_id = $${idx}`); values.push(stripeSubscriptionId); idx++; }
  if (status) { fields.push(`subscription_status = $${idx}`); values.push(status); idx++; }
  if (tier) { fields.push(`subscription_tier = $${idx}`); values.push(tier); idx++; }

  if (fields.length === 0) return getMerchant(merchantId);

  fields.push('updated_at = NOW()');
  values.push(merchantId);
  await query(`UPDATE merchants SET ${fields.join(', ')} WHERE id = $${idx}`, values);
  return getMerchant(merchantId);
}

/**
 * Get subscription summary for a merchant.
 */
export async function getSubscription(merchantId) {
  const { rows } = await query(
    `SELECT stripe_customer_id, stripe_subscription_id, subscription_status, subscription_tier, trial_end_at, created_at
     FROM merchants WHERE id = $1`,
    [merchantId]
  );
  if (!rows[0]) return null;

  const sub = rows[0];
  const now = new Date();
  const trialEnd = sub.trial_end_at ? new Date(sub.trial_end_at) : null;
  const createdAt = new Date(sub.created_at);

  // Default trial: 7 days from account creation
  const effectiveTrialEnd = trialEnd || new Date(createdAt.getTime() + 7 * 24 * 60 * 60 * 1000);
  const trialActive = now < effectiveTrialEnd;

  return {
    stripeCustomerId: sub.stripe_customer_id || null,
    stripeSubscriptionId: sub.stripe_subscription_id || null,
    status: sub.subscription_status || 'trial',
    tier: sub.subscription_tier || 'free',
    trialEnd: effectiveTrialEnd.toISOString(),
    trialActive,
    active: ['active', 'trialing', 'trial'].includes(sub.subscription_status || 'trial') && trialActive,
  };
}

/**
 * Check if a merchant can sync (based on subscription status).
 * Free tier: unlimited during 7-day trial, then blocked.
 */
export async function canSync(merchantId) {
  const sub = await getSubscription(merchantId);
  if (!sub) return { allowed: false, reason: 'Merchant not found' };
  if (sub.active) return { allowed: true };
  return { allowed: false, reason: 'Trial expired. Subscribe at /app to continue syncing.' };
}

// ── OAuth ───────────────────────────────────────────────────────

/**
 * Create a new OAuth state token for a merchant.
 */
export async function createOAuthState(state, merchantId) {
  await query(
    'INSERT INTO oauth_states (state, merchant_id) VALUES ($1, $2)',
    [state, merchantId]
  );
}

/**
 * Consume (look up and mark used) an OAuth state token.
 * Returns the state record or null if invalid/expired.
 */
export async function consumeOAuthState(state) {
  const { rows } = await query(
    'SELECT * FROM oauth_states WHERE state = $1 AND used = FALSE ORDER BY created_at DESC LIMIT 1',
    [state]
  );
  if (rows.length === 0) return null;
  await query('UPDATE oauth_states SET used = TRUE WHERE id = $1', [rows[0].id]);
  return rows[0];
}

/**
 * Update a merchant's Stripe credentials after successful OAuth.
 */
export async function updateMerchantStripeOAuth(merchantId, accessToken, stripeAccountId) {
  const encryptedKey = encrypt(accessToken);
  await query(
    'UPDATE merchants SET stripe_key = $1, stripe_account_id = $2, updated_at = NOW() WHERE id = $3',
    [encryptedKey, stripeAccountId, merchantId]
  );
  return getMerchant(merchantId);
}

/**
 * Count synced transactions for a merchant (for usage-based billing).
 */
export async function countSyncedTransactions(merchantId) {
  const { rows } = await query(
    'SELECT COUNT(*) as count FROM synced_transactions WHERE merchant_id = $1',
    [merchantId]
  );
  return parseInt(rows[0]?.count || '0', 10);
}

/**
 * Find a merchant by Stripe subscription ID.
 */
export async function getMerchantBySubscriptionId(subscriptionId) {
  const { rows } = await query('SELECT * FROM merchants WHERE stripe_subscription_id = $1', [subscriptionId]);
  return decryptMerchant(rows[0] || null);
}

/**
 * List all merchants.
 */
export async function getAllMerchants() {
  const { rows } = await query('SELECT * FROM merchants ORDER BY created_at DESC');
  return rows.map(decryptMerchant);
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


