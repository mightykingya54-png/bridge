/**
 * Inspect Stripe Dashboard for Bridge App panel.
 * Launches fresh browser — you log in once, I inspect.
 */

import { chromium } from 'playwright';

const STRIPE_URL = 'https://dashboard.stripe.com/acct_1TeKt6CkFrCfdrLW/test';
const BRIDGE_APP_URL = 'https://dashboard.stripe.com/acct_1TeKt6CkFrCfdrLW/test/apps/installed/com.bridge.payment-sync';

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function main() {
  console.log('🚀 Launching Playwright browser...');
  console.log('A new browser window will open. Please:');
  console.log('  1. Log into Stripe (sandbox account)');
  console.log('  2. Complete 2FA if prompted');
  console.log('  3. The script will automatically continue\n');

  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto(STRIPE_URL, { waitUntil: 'domcontentloaded' });

  // Wait for login to complete (check URL stops containing "login")
  for (let i = 0; i < 36; i++) {
    await sleep(5000);
    const url = page.url();
    if (url.includes('dashboard.stripe.com') && !url.includes('login') && !url.includes('auth') && !url.includes('interstitial')) {
      console.log(`✅ Logged in! (${url.substring(0, 70)})`);
      break;
    }
    console.log(`⏳ Waiting for login... (${(i+1)*5}s)`);
  }

  // Let dashboard render
  await sleep(8000);

  // ─── INSPECT DASHBOARD HOME ───
  console.log('\n═══════════ DASHBOARD HOME INSPECTION ═══════════');

  // Full page text content
  const text = await page.evaluate(() => document.body.innerText);
  console.log(`\n📝 Dashboard text (first 3000 chars):`);
  console.log(text.substring(0, 3000));

  // DOM search
  console.log('\n🔍 Searching for Bridge-related content:');
  const html = await page.content();
  for (const term of ['Bridge', 'bridge', 'com.bridge', 'Connect PayPal', 'Sync Now', 'Payment Records', 'payment-sync']) {
    console.log(`   ${html.includes(term) ? '✅' : '❌'} "${term}"`);
  }

  // Iframes
  const iframes = await page.$$('iframe');
  console.log(`\n📦 ${iframes.length} iframes found:`);
  for (let i = 0; i < iframes.length; i++) {
    const src = await iframes[i].getAttribute('src') || '';
    const id = await iframes[i].getAttribute('id') || '';
    const cl = await iframes[i].getAttribute('class') || '';
    if (src || id) {
      console.log(`   [${i}] id="${id}" class="${cl.substring(0,60)}" src="${src.substring(0,120)}"`);
    }
  }

  // Shadow DOMs
  console.log('\n🔎 Custom elements / shadows:');
  const customEls = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('*')).filter(el => 
      el.tagName.includes('-') || el.shadowRoot
    ).map(el => ({
      tag: el.tagName,
      hasShadow: !!el.shadowRoot,
      id: el.id,
      class: el.className?.substring(0, 40),
    }));
  });
  console.log(`   ${customEls.length} custom elements:`);
  customEls.forEach(el => console.log(`      <${el.tag}> shadow=${el.hasShadow} id="${el.id}"`));

  // Navigate to Bridge app page
  console.log(`\n═══════════ BRIDGE APP PAGE ═══════════`);
  await page.goto(BRIDGE_APP_URL, { waitUntil: 'domcontentloaded' });
  await sleep(8000);

  const appText = await page.evaluate(() => document.body.innerText);
  console.log(`\n📝 App page text:`);
  console.log(appText.substring(0, 2000));

  // Check for any errors in console
  page.on('console', msg => {
    if (msg.type() === 'error') console.log(`   ❌ Console Error: ${msg.text()}`);
  });
  page.on('pageerror', err => console.log(`   ❌ Page Error: ${err.message}`));

  await sleep(3000);

  console.log('\n\n✅ Inspection complete. Browser stays open for you to examine.');
  console.log('Press Ctrl+C to close terminal (browser stays open).');
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
