import { chromium } from 'playwright';
const URL = 'https://dashboard.stripe.com/acct_1TeKt6CkFrCfdrLW/test/apps/installed/com.bridge.payment-sync';

async function main() {
  const browser = await chromium.connectOverCDP('http://127.0.0.1:9222');
  const page = browser.contexts()[0].pages()[0];
  await page.goto(URL, { timeout: 15000 });
  await new Promise(r => setTimeout(r, 6000));

  const iframes = await page.$$('iframe');
  console.log('Iframes:', iframes.length);

  for (let i = 0; i < iframes.length; i++) {
    const src = await iframes[i].getAttribute('src') || '';
    if (src.includes('sandbox') || src.includes('extensions')) {
      console.log('Sandbox iframe:', src.substring(0, 120));
      try {
        const frame = await iframes[i].contentFrame();
        if (frame) {
          const h = await frame.evaluate(() => document.body?.innerHTML || 'empty');
          console.log('Body length:', h.length);
          console.log('Body:', h.substring(0, 500));
        } else {
          console.log('No content frame');
        }
      } catch(e) {
        console.log('Error:', e.message);
      }
    }
  }

  console.log('\nPage text:', (await page.evaluate(() => document.body.innerText)).substring(0, 1000));
  await browser.close();
}
main().catch(e => console.error(e.message));
