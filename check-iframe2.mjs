import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.connectOverCDP('http://127.0.0.1:9222');
  const page = browser.contexts()[0].pages()[0];
  
  const currentUrl = page.url();
  console.log('Current URL:', currentUrl);
  
  await page.goto('https://dashboard.stripe.com/acct_1TeKt6CkFrCfdrLW/test/apps/installed/com.bridge.payment-sync', { timeout: 15000 });
  await new Promise(r => setTimeout(r, 6000));
  
  console.log('After nav URL:', (await page.url()).substring(0, 120));
  
  const iframes = await page.locator('iframe').all();
  console.log('Iframes:', iframes.length);
  
  for (let i = 0; i < iframes.length; i++) {
    const src = await iframes[i].getAttribute('src') || 'no-src';
    const id = await iframes[i].getAttribute('id') || '';
    console.log('  [' + i + '] id=' + id + ' src=' + src.substring(0, 100));
    
    if (src.includes('sandbox') || src.includes('extensions') || src.includes('tailor')) {
      console.log('  ^^^ APP IFRAME');
      try {
        const frame = await iframes[i].contentFrame();
        if (frame) {
          const html = await frame.evaluate(() => document.body?.innerHTML || 'empty');
          console.log('  Body length:', html.length);
          console.log('  Body:', html.substring(0, 600));
        } else {
          console.log('  No content frame');
        }
      } catch(e) {
        console.log('  Error:', e.message);
      }
    }
  }
  
  const text = await page.evaluate(() => document.body.innerText);
  console.log('\nText:', text.substring(0, 2000));
  
  await browser.close();
}
main().catch(e => console.error(e.message));
