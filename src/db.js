/**
 * Database — PostgreSQL connection pool.
 * Uses DATABASE_URL env var.
 * Falls back to a descriptive error if not configured.
 *
 * Render free Postgres short hostnames (like "dpg-xxxxx") need their
 * full domain suffix to resolve outside of Render's internal network.
 * This is detected and fixed automatically.
 */
import pg from 'pg';

const { Pool } = pg;

const RAW_DATABASE_URL = process.env.DATABASE_URL || '';

/**
 * Fix a Render short hostname by appending the known region suffix.
 * Internal Render hostnames look like "dpg-xxxxx" and need the
 * full ".oregon-postgres.render.com" suffix to resolve in DNS.
 */
function fixRenderHostname(url) {
  try {
    const u = new URL(url);
    const host = u.hostname;

    // If hostname already has a dot, assume it's fully qualified
    if (host.includes('.')) return url;

    // Short hostname (like "dpg-xxxxx") — append Render region suffix
    // Bridge DB is in Oregon (US West)
    const fqdn = `${host}.oregon-postgres.render.com`;
    u.hostname = fqdn;
    console.log(`✅ Fixed Render short hostname: ${host} → ${fqdn}`);
    return u.toString();
  } catch {
    return url;
  }
}

const DATABASE_URL = fixRenderHostname(RAW_DATABASE_URL);

let pool = null;

export function getPool() {
  if (!pool) {
    if (!RAW_DATABASE_URL) {
      console.warn('⚠️  DATABASE_URL not set. Database operations will fail.');
      console.warn('   Set DATABASE_URL in your hosting provider\'s environment variables.');
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
