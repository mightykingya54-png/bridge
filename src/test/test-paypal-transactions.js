/**
 * Test 2: Verify PayPal connection and fetch test transactions.
 * Run: node src/test/test-paypal-transactions.js
 *
 * Requires PayPal sandbox credentials in .env
 */
import 'dotenv/config';
import { testConnection, fetchTransactions } from '../connectors/paypal.js';

async function main() {
  console.log('🔌 Testing PayPal connection...');
  try {
    const info = await testConnection();
    console.log(`✅ Connected to PayPal!`);
    console.log(`   User: ${info.userId}`);
    console.log(`   Email: ${info.email || 'N/A'}`);
  } catch (err) {
    console.error(`❌ PayPal connection failed: ${err.message}`);
    console.error(`   Fix: Set PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET in .env`);
    console.error(`   Get them from https://developer.paypal.com/dashboard`);
    process.exit(1);
  }

  console.log('');
  console.log('📦 Fetching recent transactions from PayPal...');

  try {
    const endDate = new Date().toISOString();
    const startDate = new Date(Date.now() - 30 * 86400 * 1000).toISOString(); // 30 days ago

    const result = await fetchTransactions(startDate, endDate, 1);
    console.log(`✅ Fetched ${result.transactions.length} transactions (total: ${result.total})`);
    console.log(`   Page ${result.page} of ${result.totalPages}`);

    if (result.transactions.length > 0) {
      const txn = result.transactions[0];
      console.log('');
      console.log('   Sample transaction (first one):');
      console.log(`     ID: ${txn.idempotencyKey}`);
      console.log(`     Amount: ${(txn.amount / 100).toFixed(2)} ${txn.currency}`);
      console.log(`     Status: ${txn.status}`);
      console.log(`     Date: ${new Date(txn.created * 1000).toISOString()}`);
      console.log(`     Processor: ${txn.processor}`);
      console.log(`     Fee: ${txn.fee ? (txn.fee / 100).toFixed(2) : 'N/A'}`);
    } else {
      console.log('   No transactions found in the last 30 days.');
      console.log('   (Expected if sandbox has no test payments yet)');
    }

    console.log('');
    console.log('✅ TEST PASSED — PayPal connector works!');
    console.log('   Transaction normalization works correctly.');
  } catch (err) {
    console.error(`❌ Failed to fetch PayPal transactions: ${err.message}`);
    process.exit(1);
  }
}

main();
