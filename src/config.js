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
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || '',
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',
    priceId: process.env.STRIPE_PRICE_ID || 'price_1TgQjYCYeLNgFTf85f95Mmsq',
    clientId: process.env.STRIPE_CLIENT_ID || 'ca_UeE3JQaWHr8NVoAicSPISj1C8dToZuV2',
  },
  paypal: {
    clientId: process.env.PAYPAL_CLIENT_ID || '',
    clientSecret: process.env.PAYPAL_CLIENT_SECRET || '',
    environment: process.env.PAYPAL_ENVIRONMENT || 'sandbox',
  },
  lemonsqueezy: {
    apiKey: process.env.LEMONSQUEEZY_API_KEY || '',
    storeId: process.env.LEMONSQUEEZY_STORE_ID || '',
    variantId: process.env.LEMONSQUEEZY_VARIANT_ID || '',
    webhookSecret: process.env.LEMONSQUEEZY_WEBHOOK_SECRET || '',
  },
  port: parseInt(process.env.PORT || '3000', 10),
  databaseUrl: process.env.DATABASE_URL || '',
  /** Master API key for the server operator. Optional — used for admin/debug. */
  masterKey: process.env.MASTER_API_KEY || '',
  /** AES-256 encryption key for credentials at rest.
   * If set in env, it's used directly. Otherwise, a key is generated
   * on first startup and stored in the database (persists across deploys). */
  encryptionKey: process.env.ENCRYPTION_KEY || '',
  /** Sentry DSN for error tracking */
  sentryDsn: process.env.SENTRY_DSN || '',
};
