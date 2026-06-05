import dotenv from 'dotenv';
import { existsSync } from 'fs';
import { resolve } from 'path';

const envPath = resolve(process.cwd(), '.env');
if (existsSync(envPath)) {
  dotenv.config({ path: envPath });
} else {
  console.warn('⚠️  No .env file found. Copy .env.example to .env and fill in your keys.');
}

/**
 * Server config.
 * STRIPE_SECRET_KEY is now OPTIONAL.
 * Merchants provide their own keys at runtime via the Stripe App UI.
 */
export const config = {
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY || '', // optional now
  },
  paypal: {
    clientId: process.env.PAYPAL_CLIENT_ID || '',
    clientSecret: process.env.PAYPAL_CLIENT_SECRET || '',
    environment: process.env.PAYPAL_ENVIRONMENT || 'sandbox',
  },
  port: parseInt(process.env.PORT || '3000', 10),
  databaseUrl: process.env.DATABASE_URL || '',
  /** Master API key for the server operator. Optional — used for admin/debug. */
  masterKey: process.env.MASTER_API_KEY || '',
};
