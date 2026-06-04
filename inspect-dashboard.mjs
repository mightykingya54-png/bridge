/**
 * Inspect Stripe Dashboard for Bridge App panel.
 * 
 * Usage: node inspect-dashboard.mjs
 * 
 * This script opens a browser window. The user must log into Stripe,
 * then the script examines the DOM for the Bridge app panel.
 */

import { chromium } from 'playwright';

const STRIPE_DASHBOARD = 'https://dashboard.stripe.com/acct_1TeKt6CkFrCfdrLW/test';
const BRIDGE_APP_URL = 'https://dashboard.stripe.com/acct_1TeKt6CkFrCfdrLW/test/apps/installed/com.bridge.payment-sync';

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  console.log('🚀 Launching browser...');
  
  const browser = await chromium.launch({
    headless: false, // Show the browser so user can log in
    args: ['--disable-blink-features=AutomationControlled'],
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    locale: 'en-US',
  });

  const page = await context.newPage();

  console.log(`\n📍 Navigated to Stripe Dashboard: ${STRIPE_DASHBOARD}`);
  console.log('   ⚠️  If not logged in, please log in now.');
  console.log('   ⏳ Waiting 120 seconds for you to log in...\n');
  
  await page.goto(STRIPE_DASHBOARD, { waitUntil: 'domcontentloaded', timeout: 30000 });

  // Wait for the page to load or for user to log in
  // Check every 5 seconds if we're on the dashboard
  for (let i = 0; i < 24; i++) {
    const url = page.url();
    const title = await page.title();
    console.log(`  [${i*5}s] URL: ${url.substring(0, 80)}...`);
    
    // If we see dashboard content, proceed
    if (url.includes('dashboard.stripe.com') && !url.includes('login')) {
      console.log('   ✅ Looks like we are on the dashboard!');
      break;
    }
    
    // If there's a login button, notify
    const loginBtn = await page.$('button:has-text("Sign in"), a:has-text("Sign in")');
    if (loginBtn) {
      console.log('   🔐 Login required. Please sign in with your Stripe account.');
    }
    
    await sleep(5000);
  }

  // Wait a bit more for dashboard to fully render
  console.log('\n⏳ Waiting for dashboard to fully render...');
  await sleep(10000);

  // Now try to find Bridge app panel
  console.log('\n🔍 Searching for Bridge App panel on dashboard...');
  
  const pageContent = await page.content();
  
  // Search for any Bridge-related content in the DOM
  const searches = [
    'Bridge',
    'bridge',
    'com.bridge',
    'payment-sync',
    'payment_records',
    'Connect PayPal',
    'Sync Now',
    'stripe.dashboard.home.overview',
  ];
  
  for (const term of searches) {
    const found = pageContent.includes(term);
    console.log(`   ${found ? '✅' : '❌'} "${term}" found in DOM`);
  }

  // Try to find iframe elements (Stripe App renders in an iframe)
  const iframes = await page.$$('iframe');
  console.log(`\n📦 Found ${iframes.length} iframe(s) on the page:`);
  
  for (let i = 0; i < iframes.length; i++) {
    const src = await iframes[i].getAttribute('src');
    const id = await iframes[i].getAttribute('id');
    const name = await iframes[i].getAttribute('name');
    console.log(`   Iframe ${i}: id="${id}" name="${name}" src="${src?.substring(0, 100)}"`);
  }

  // Check for any shadow DOM elements that might contain the app
  console.log('\n🔎 Checking for app-related elements...');
  
  // Try to find by various selectors
  const selectors = [
    '[data-testid*="bridge"]',
    '[data-testid*="app"]',
    '[data-testid*="extension"]',
    '[class*="bridge"]',
    '[class*="Extension"]',
    '[class*="AppViewport"]',
    '[data-stripe-app-id]',
    'stripe-app-viewport',
  ];
  
  for (const selector of selectors) {
    const elements = await page.$$(selector);
    console.log(`   ${selector}: ${elements.length} element(s)`);
  }

  // Navigate to the apps installed page
  console.log(`\n📍 Navigating to Bridge app page: ${BRIDGE_APP_URL}`);
  await page.goto(BRIDGE_APP_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await sleep(8000);

  const bridgePageContent = await page.content();
  console.log(`\n🔍 Bridge app page content (first 2000 chars):`);
  console.log(bridgePageContent.substring(0, 2000));

  // Check for error messages
  const bodyText = await page.evaluate(() => document.body?.innerText || '');
  console.log(`\n📝 App page text content:`);
  console.log(bodyText.substring(0, 1500));

  // Wait for user to press Enter to close
  console.log('\n\n✅ Inspection complete. Press Enter to close browser...');
  await new Promise(resolve => {
    process.stdin.once('data', () => {
      resolve();
    });
  });

  await browser.close();
  console.log('Browser closed.');
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
