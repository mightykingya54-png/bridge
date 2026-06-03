/**
 * Test 1: Verify Stripe connection and push a test payment record.
 * Run: node src/test/test-stripe-payment-records.js
 *
 * This is the critical proof-of-concept. If this fails, the idea is dead.
 *
 * === CORE ASSUMPTION VALIDATED 2026-06-03 ===
 * Stripe's Payment Records API (POST /v1/payment_records/report_payment)
 * accepts custom third-party processor data. Full working parameter schema:
 *   - processor_details[type]=custom
 *   - processor_details[custom][payment_reference]=<txn_id>
 *   - payment_method_details[type]=custom
 *   - payment_method_details[custom][display_name]=<str>
 *   - outcome=guaranteed + guaranteed[guaranteed_at]=<timestamp>
 *   - amount_requested[currency]=usd + amount_requested[value]=<cents>
 *   - initiated_at=<timestamp>
 */
import 'dotenv/config';
import { testConnection, pushPaymentRecord } from '../connectors/stripe.js';

async function main() {
  console.log('🔌 Testing Stripe connection...');
  try {
    const info = await testConnection();
    console.log(`✅ Connected to Stripe!`);
    console.log(`   Account: ${info.accountId}`);
    console.log(`   Name: ${info.businessName || 'N/A'}`);
  } catch (err) {
    console.error(`❌ Stripe connection failed: ${err.message}`);
    console.error(`   Fix: Set STRIPE_SECRET_KEY in .env to a valid test key`);
    process.exit(1);
  }

  console.log('');
  console.log('🧪 Pushing a test payment record to Stripe Payment Records API...');
  console.log('   This simulates a PayPal payment being pushed into Stripe.');
  console.log('');

  try {
    const record = await pushPaymentRecord({
      processorTxnId: `test_txn_${Date.now()}`,
      amount: 2999, // $29.99 in cents
      currency: 'usd',
      initiatedAt: Math.floor(Date.now() / 1000) - 86400, // yesterday
      outcome: 'guaranteed',
      processorName: 'paypal',
      description: 'Test payment imported from PayPal via Bridge',
      payerDisplay: 'PayPal account buyer@example.com',
    });

    console.log(`✅ Payment record created!`);
    console.log(`   ID: ${record.id}`);
    console.log(`   Amount: $${(record.amount_requested.value / 100).toFixed(2)} ${record.amount_requested.currency.toUpperCase()}`);
    console.log(`   Processor Ref: ${record.processor_details.custom.payment_reference}`);
    console.log(`   Payer: ${record.payment_method_details.custom.display_name}`);
    console.log('');

    console.log('   Next: Check your Stripe Dashboard → Revenue Recognition');
    console.log('   or: https://dashboard.stripe.com/test/payment-records');
    console.log('');

    console.log('✅ TEST PASSED — Stripe Payment Records API works with custom processors!');
    console.log('   The core assumption is fully validated.');
  } catch (err) {
    console.error(`❌ Failed to push payment record: ${err.message}`);
    if (err.raw?.message) console.error(`   Detail: ${err.raw.message}`);
    process.exit(1);
  }
}

main();
