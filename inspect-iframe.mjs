/**
 * Inspect inside the Stripe App sandbox iframe for Bridge.
 */
import { chromium } from 'playwright';

const STRIPE_BASE = 'https://dashboard.stripe.com/acct_1TeKt6CkFrCfdrLW/test';
const BRIDGE_APP_URL = `${STRIPE_BASE}/apps/installed/com.bridge.payment-sync`;

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function main() {
  console.log('🔌 Connecting to Edge...');
  const browser = await chromium.connectOverCDP('http://127.0.0.1:9222');
  const ctx = browser.contexts()[0];
  const pages = ctx.pages();
  const page = pages[0];

  await page.goto(BRIDGE_APP_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await sleep(5000);

  // Find the extensions sandbox iframe
  const iframes = await page.$$('iframe');
  console.log(`📦 ${iframes.length} iframes`);
  
  for (let i = 0; i < iframes.length; i++) {
    const src = await iframes[i].getAttribute('src') || '';
    if (src.includes('sandbox') || src.includes('extensions')) {
      console.log(`\n🔍 Found extensions iframe [${i}]:`);
      
      try {
        // Try to access iframe content
        const iframeContent = await iframes[i].contentFrame();
        if (iframeContent) {
          const title = await iframeContent.title();
          const text = await iframeContent.evaluate(() => document.body?.innerText || 'no content');
          console.log(`   Title: ${title}`);
          console.log(`   Content: ${text.substring(0, 2000)}`);
          
          // Check for errors
          const html = await iframeContent.evaluate(() => document.documentElement?.outerHTML || '');
          console.log(`\n   HTML (first 2000 chars):`);
          console.log(html.substring(0, 2000));
          
          // Check for Bridge/react content
          const hasBridge = html.includes('Bridge') || html.includes('bridge');
          const hasReact = html.includes('__react') || html.includes('react');
          console.log(`\n   Has Bridge: ${hasBridge}, Has React: ${hasReact}`);
        } else {
          console.log(`   Cannot access iframe content (cross-origin?)`);
          // Get iframe attributes
          const attrs = await page.evaluate((el) => {
            const a = {};
            for (const attr of el.attributes) a[attr.name] = attr.value;
            return a;
          }, iframes[i]);
          console.log(`   Attributes:`, JSON.stringify(attrs, null, 2));
        }
      } catch (e) {
        console.log(`   Error accessing iframe: ${e.message}`);
      }
    }
  }

  // Also try navigating to the sandbox directly
  console.log(`\n📍 Navigating to sandbox directly...`);
  await page.goto(`${STRIPE_BASE}/tailor/extensions/sandbox.html?previewmode=false&merchantId=acct_1TeKt6CkFrCfdrLW&appID=com.bridge.payment-sync&view=App`, 
    { waitUntil: 'domcontentloaded', timeout: 30000 });
  await sleep(8000);
  
  const sandboxText = await page.evaluate(() => document.body?.innerText || '');
  console.log(`Sandbox content: ${sandboxText.substring(0, 2000)}`);
  
  const sandboxHtml = await page.evaluate(() => document.documentElement?.outerHTML || '');
  console.log(`\nSandbox HTML (first 1500 chars):`);
  console.log(sandboxHtml.substring(0, 1500));

  console.log('\n✅ Done. Browser stays open.');
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
