/**
 * Connect to Edge via CDP, navigate to Bridge app page,
 * find and click "Open" button, then inspect the drawer.
 */
import { chromium } from 'playwright';

const STRIPE_BASE = 'https://dashboard.stripe.com/acct_1TeKt6CkFrCfdrLW/test';
const BRIDGE_APP_URL = `${STRIPE_BASE}/apps/installed/com.bridge.payment-sync`;
const DASHBOARD_HOME = `${STRIPE_BASE}/dashboard`;

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function main() {
  console.log('🔌 Connecting to Edge on port 9222...');
  const browser = await chromium.connectOverCDP('http://127.0.0.1:9222');
  
  const ctx = browser.contexts()[0];
  const existingPages = ctx.pages();
  console.log(`📄 ${existingPages.length} existing page(s)`);

  // Use an existing tab or create a new one
  let page;
  if (existingPages.length > 0) {
    page = existingPages[0];
    console.log(`   Using existing tab: ${await page.title()}`);
  } else {
    page = await ctx.newPage();
  }

  // Navigate to Bridge app page
  console.log(`\n📍 Navigating to Bridge app page...`);
  await page.goto(BRIDGE_APP_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });

  // Check if logged in (URL should not contain login)
  const url = page.url();
  console.log(`   URL: ${url.substring(0, 100)}`);
  
  if (url.includes('login')) {
    console.log('❌ Need to login. The debug browser has no session.');
    console.log('   Please log into Stripe in the Edge browser window, then press Enter.');
    await new Promise(resolve => process.stdin.once('data', resolve));
    
    await page.goto(BRIDGE_APP_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await sleep(5000);
  }

  // Wait for page to render
  await sleep(5000);

  // Get page content
  const pageText = await page.evaluate(() => document.body.innerText);
  console.log(`\n📝 Page text (first 1000 chars):`);
  console.log(pageText.substring(0, 1000));

  // Find ALL buttons
  const buttons = await page.$$('button');
  console.log(`\n🔘 ${buttons.length} button(s) found:`);
  for (let i = 0; i < buttons.length; i++) {
    const text = await buttons[i].evaluate(el => el.innerText?.trim() || el.textContent?.trim() || '');
    const isVisible = await buttons[i].isVisible();
    console.log(`   [${i}] "${text.substring(0, 50)}" visible=${isVisible}`);
  }

  // Find all links
  const links = await page.$$('a');
  console.log(`\n🔗 ${links.length} link(s) found:`);
  for (let i = 0; i < Math.min(links.length, 20); i++) {
    const text = await links[i].evaluate(el => el.innerText?.trim() || '');
    const href = await links[i].getAttribute('href') || '';
    if (text || href.includes('bridge')) {
      console.log(`   [${i}] "${text.substring(0, 40)}" href="${href.substring(0, 80)}"`);
    }
  }

  // Find element by text "Open"
  const openBtn = await page.locator('button:has-text("Open")');
  const openCount = await openBtn.count();
  console.log(`\n🔍 "Open" buttons: ${openCount}`);
  
  if (openCount > 0) {
    await openBtn.first().click();
    console.log('   Clicked "Open"!');
    await sleep(8000);
    console.log(`   New URL: ${page.url()}`);
  }

  // Check for app drawer/iframe
  const iframes = await page.$$('iframe');
  console.log(`\n📦 ${iframes.length} iframes on the page:`);
  for (let i = 0; i < iframes.length; i++) {
    const src = await iframes[i].getAttribute('src') || '';
    const id = await iframes[i].getAttribute('id') || '';
    console.log(`   [${i}] id="${id}" src="${src.substring(0, 120)}"`);
  }

  // Check current page content
  const currentText = await page.evaluate(() => document.body.innerText);
  console.log(`\n📝 Current page text (first 1500 chars):`);
  console.log(currentText.substring(0, 1500));

  console.log('\n\n✅ Done. Browser stays open. Press Ctrl+C to exit.');
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
