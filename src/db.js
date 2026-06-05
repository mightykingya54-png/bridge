/**
 * Database — PostgreSQL connection pool.
 * Uses DATABASE_URL env var (set automatically by Railway PostgreSQL plugin).
 * Falls back to a descriptive error if not configured.
 */
import pg from 'pg';

const { Pool } = pg;

const DATABASE_URL = process.env.DATABASE_URL || '';

let pool = null;

export function getPool() {
  if (!pool) {
    if (!DATABASE_URL) {
      console.warn('⚠️  DATABASE_URL not set. Database operations will fail.');
      console.warn('   Add PostgreSQL from Railway dashboard: Project → Plugins → PostgreSQL');
      return null;
    }
    pool = new Pool({
      connectionString: DATABASE_URL,
      max: 5,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    });
    console.log('✅ PostgreSQL pool created');
  }
  return pool;
}

export async function query(text, params = []) {
  const p = getPool();
  if (!p) {
    throw new Error('DATABASE_URL not configured. Add PostgreSQL from Railway dashboard.');
  }
  const start = Date.now();
  const result = await p.query(text, params);
  const duration = Date.now() - start;
  if (duration > 100) {
    console.warn(`⚠️  Slow query (${duration}ms): ${text.substring(0, 80)}`);
  }
  return result;
}

export async function closePool() {
  if (pool) {
    await pool.end();
    pool = null;
    console.log('✅ PostgreSQL pool closed');
  }
}
