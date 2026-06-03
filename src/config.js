import dotenv from 'dotenv';
import { existsSync } from 'fs';
import { resolve } from 'path';

const envPath = resolve(process.cwd(), '.env');
if (existsSync(envPath)) {
  dotenv.config({ path: envPath });
} else {
  console.warn('⚠️  No .env file found. Copy .env.example to .env and fill in your keys.');
}

function required(name) {
  const val = process.env[name];
  if (!val) {
    throw new Error(`Missing required env var: ${name}. Set it in .env`);
  }
  return val;
}

export const config = {
  stripe: {
    secretKey: required('STRIPE_SECRET_KEY'),
  },
  paypal: {
    clientId: process.env.PAYPAL_CLIENT_ID || '',
    clientSecret: process.env.PAYPAL_CLIENT_SECRET || '',
    environment: process.env.PAYPAL_ENVIRONMENT || 'sandbox',
  },
  port: parseInt(process.env.PORT || '3000', 10),
  databasePath: process.env.DATABASE_PATH || './data/bridge.db',
};
