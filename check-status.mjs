/**
 * Check Stripe App version status and debug empty iframe.
 * Also check for console errors.
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

  // Listen for console messages
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push({ text: msg.text(), location: msg.location()?.url });
  });
  page.on('pageerror', err => errors.push({ text: err.message }));

  await page.goto(BRIDGE_APP_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await sleep(8000);

  // Check the extensions iframe for errors
  const iframes = await page.$$('iframe');
  for (let i = 0; i < iframes.length; i++) {
    const src = await iframes[i].getAttribute('src') || '';
    if (src.includes('extensions') || src.includes('sandbox')) {
      console.log(`\n🔍 Iframe [${i}]: ${src.substring(0, 150)}`);
      
      try {
        const frame = await iframes[i].contentFrame();
        if (frame) {
          const bodyHTML = await frame.evaluate(() => document.body?.innerHTML || 'empty');
          console.log(`   Body HTML length: ${bodyHTML.length}`);
          if (bodyHTML.length > 0) {
            console.log(`   Body content: ${bodyHTML.substring(0, 1000)}`);
          } else {
            console.log(`   ⚠️  Body is EMPTY — app not rendering!`);
          }
          
          // Check for scripts loaded
          const scripts = await frame.evaluate(() => 
            Array.from(document.querySelectorAll('script')).map(s => s.src || 'inline')
          );
          console.log(`   Scripts: ${scripts.join(', ')}`);
          
          // Check for network errors
          const resources = await frame.evaluate(() => 
            performance.getEntriesByType('resource').map(r => ({
              name: r.name.substring(0, 80),
              duration: r.duration,
              size: r.transferSize,
            }))
          );
          console.log(`   Resources loaded: ${resources.length}`);
          resources.slice(0, 10).forEach(r => {
            const status = r.size === 0 ? '⚠️ FAILED' : `✅ ${r.size} bytes`;
            console.log(`      ${status}: ${r.name}`);
          });
        }
      } catch (e) {
        console.log(`   Error: ${e.message}`);
      }
    }
  }

  // Print console errors
  console.log(`\n📋 Console errors (${errors.length}):`);
  errors.forEach(e => console.log(`   ❌ ${e.text}`));

  // Try to check the app version from Stripe API
  console.log('\n📍 Checking app version...');
  const versionInfo = await page.evaluate(() => {
    // Try to find version info in the DOM
    const scripts = document.querySelectorAll('script');
    for (const s of scripts) {
      if (s.src?.includes('apps.')) return s.src;
    }
    return 'not found';
  });
  console.log(`   App loader script: ${versionInfo}`);

  // Navigate to app's detail page and look for version/status
  const pageText = await page.evaluate(() => document.body.innerText);
  console.log(`\n📝 App page text:`);
  console.log(pageText.substring(0, 2000));

  console.log('\n✅ Done.');
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
