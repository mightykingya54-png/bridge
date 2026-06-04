import { chromium } from 'playwright';
const BRIDGE_APP_URL = 'https://dashboard.stripe.com/acct_1TeKt6CkFrCfdrLW/test/apps/installed/com.bridge.payment-sync';

async function main() {
  const browser = await chromium.connectOverCDP('http://127.0.0.1:9222');
  const page = browser.contexts()[0].pages()[0];
  
  const errors = [];
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('pageerror', err => errors.push(err.message));
  
  await page.goto(BRIDGE_APP_URL, { waitUntil: 'domcontentloaded', timeout: 15000 });
  await new Promise(r => setTimeout(r, 8000));
  
  const text = await page.evaluate(() => document.body.innerText);
  console.log('=== MAIN PAGE TEXT ===');
  console.log(text.substring(0, 3000));
  
  // Check iframes
  const iframes = await page.$$('iframe');
  for (let i = 0; i < iframes.length; i++) {
    const src = await iframes[i].getAttribute('src') || '';
    if (src.includes('sandbox') || src.includes('extensions')) {
      try {
        const frame = await iframes[i].contentFrame();
        if (frame) {
          const ft = await frame.evaluate(() => document.body?.innerText || 'empty');
          const fh = await frame.evaluate(() => document.body?.innerHTML || 'empty');
          console.log(`\n=== IFRAME [${i}] TEXT ===`);
          console.log(ft.substring(0, 2000));
          console.log(`\n=== IFRAME HTML ===`);
          console.log(fh.substring(0, 2000));
        }
      } catch(e) {
        console.log(`\nIframe error: ${e.message}`);
      }
    }
  }
  
  console.log('\n=== ERRORS ===');
  errors.forEach(e => console.log(`  ❌ ${e}`));
  
  await browser.close();
}
main().catch(e => { console.error(e.message); process.exit(1); });
