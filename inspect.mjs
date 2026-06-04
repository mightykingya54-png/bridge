/**
 * Connect to running Edge via CDP and inspect Stripe dashboard.
 * 
 * The script connects to Edge running at localhost:9222.
 * It navigates to Stripe dashboard, waits for you to log in,
 * then inspects the DOM for the Bridge app panel.
 */

import { chromium } from 'playwright';

const STRIPE_DASHBOARD = 'https://dashboard.stripe.com/acct_1TeKt6CkFrCfdrLW/test';
const STRIPE_APPS_PAGE = 'https://dashboard.stripe.com/acct_1TeKt6CkFrCfdrLW/test/apps/installed/com.bridge.payment-sync';

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function main() {
  console.log('🔌 Connecting to Edge browser on port 9222...');
  
  const browser = await chromium.connectOverCDP('http://127.0.0.1:9222');
  
  const contexts = browser.contexts();
  console.log(`📋 Browser has ${contexts.length} context(s)`);
  
  // Get existing pages
  const pages = browser.contexts()[0]?.pages() || [];
  console.log(`📄 Browser has ${pages.length} existing page(s)`);

  // Open new page for Stripe dashboard
  const page = await browser.contexts()[0].newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  console.log(`\n📍 Navigating to Stripe Dashboard...`);
  await page.goto(STRIPE_DASHBOARD, { waitUntil: 'domcontentloaded', timeout: 30000 });
  
  const currentUrl = page.url();
  const pageTitle = await page.title();
  console.log(`   URL: ${currentUrl}`);
  console.log(`   Title: ${pageTitle}`);

  // Check if we need to log in
  if (currentUrl.includes('login') || currentUrl.includes('auth')) {
    console.log('\n🔐 LOGIN REQUIRED. Please sign into Stripe in the new Edge window.');
    console.log('   I\'ll wait up to 120 seconds for you to complete login...');
    
    for (let i = 0; i < 24; i++) {
      await sleep(5000);
      const newUrl = page.url();
      if (!newUrl.includes('login') && !newUrl.includes('auth') && newUrl.includes('dashboard.stripe.com')) {
        console.log(`   ✅ Logged in! URL: ${newUrl.substring(0, 80)}`);
        break;
      }
      if (i % 2 === 0) console.log(`   Waiting... (${(i+1)*5}s)`);
    }
  }

  await sleep(8000); // Let dashboard fully render

  // ─── INSPECT DASHBOARD HOME ───
  console.log('\n═══════════════ INSPECTING DASHBOARD HOME ═══════════════');

  // Get all text on page
  const bodyText = await page.evaluate(() => document.body?.innerText || '');
  console.log(`\n📝 Dashboard text content (first 2000 chars):`);
  console.log(bodyText.substring(0, 2000));

  // Search for specific strings
  console.log('\n🔍 Searching for key terms in DOM:');
  const dom = await page.content();
  for (const term of ['Bridge', 'bridge', 'com.bridge', 'Connect PayPal', 'Sync Now', 'Payment Records', 'payment-sync', 'payment_records']) {
    const found = dom.includes(term);
    console.log(`   ${found ? '✅' : '❌'} "${term}"`);
  }

  // Find all iframes
  const iframes = await page.$$('iframe');
  console.log(`\n📦 ${iframes.length} iframe(s) found:`);
  for (let i = 0; i < Math.min(iframes.length, 30); i++) {
    const src = await iframes[i].getAttribute('src') || '(no src)';
    const id = await iframes[i].getAttribute('id') || '(no id)';
    const w = await iframes[i].getAttribute('width') || '(auto)';
    const h = await iframes[i].getAttribute('height') || '(auto)';
    if (src.includes('bridge') || src.includes('stripe') || id.includes('app') || id.includes('extension')) {
      console.log(`   Iframe ${i}: id="${id}" size=${w}x${h} src="${src.substring(0, 150)}"`);
    }
  }

  // Check for Stripe App viewport containers
  console.log('\n🔎 Searching for viewport containers:');
  const selectors = [
    '[class*="AppViewport"]', '[class*="viewport"]', '[class*="app-card"]',
    '[class*="Extension"]', '[data-testid*="app"]', '[data-testid*="extension"]',
    'stripe-app-viewport', '[data-stripe-app-id]', '[data-app-id]',
    '[class*="dashboard-app"]', '[class*="marketplace"]', '[class*="installed-app"]',
    'section[class*="app"]', 'div[class*="app-container"]', 'div[class*="app-card"]',
  ];
  for (const sel of selectors) {
    const el = await page.$$(sel);
    if (el.length > 0) {
      console.log(`   ✅ "${sel}" — ${el.length} matches`);
      // Log first match's text
      const text = await el[0].evaluate(e => e.outerHTML?.substring(0, 300));
      console.log(`      HTML: ${text}`);
    }
  }

  // Try to find React root or app mount point
  console.log('\n🔎 Searching for React/App mount points:');
  const mountPoints = await page.evaluate(() => {
    const results = [];
    document.querySelectorAll('div[id*="root"], div[id*="app"], div[id*="mount"]').forEach(el => {
      results.push({ id: el.id, class: el.className, html: el.innerHTML.substring(0, 100) });
    });
    return results;
  });
  console.log(`   Found ${mountPoints.length} mount points:`);
  mountPoints.forEach(mp => console.log(`      id="${mp.id}" class="${mp.class}"`));

  // Navigate to Bridge app specific page
  console.log(`\n\n═══════════════ Navigating to Bridge App Page ═══════════════`);
  await page.goto(STRIPE_APPS_PAGE, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await sleep(10000);

  const appBody = await page.evaluate(() => document.body?.innerText || '');
  console.log(`\n📝 Bridge app page content (first 2000 chars):`);
  console.log(appBody.substring(0, 2000));

  const appDom = await page.content();
  console.log('\n🔍 Bridge page search:');
  for (const term of ['Bridge', 'bridge', 'Open', 'Configure', 'Settings', 'error', 'Error', 'not found', 'processing', 'Processing']) {
    const found = appDom.includes(term);
    console.log(`   ${found ? '✅' : '❌'} "${term}"`);
  }

  // Check console errors
  console.log('\n📋 Console errors (captured during page load):');
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log(`   ❌ ${msg.text()}`);
    }
  });

  // Wait 5 more seconds for any late console errors
  await sleep(5000);

  console.log('\n\n✅ Inspection complete. The browser window stays open.');
  console.log('You can close it manually when done.');
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
