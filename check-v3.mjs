import { chromium } from 'playwright';
const URL = 'https://dashboard.stripe.com/acct_1TeKt6CkFrCfdrLW/test/apps/installed/com.bridge.payment-sync';

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function main() {
  const browser = await chromium.connectOverCDP('http://127.0.0.1:9222');
  const page = browser.contexts()[0].pages()[0];
  
  // Hard refresh
  await page.goto(URL, { timeout: 15000 });
  await sleep(8000);
  
  console.log('URL:', (await page.url()).substring(0, 120));
  console.log('Title:', await page.title());
  
  // Check for any version info in DOM
  const text = await page.evaluate(() => document.body.innerText);
  console.log('\nPage text:\n' + text.substring(0, 3000));
  
  // Check all iframes
  const count = await page.locator('iframe').count();
  console.log('\nIframes:', count);
  for (let i = 0; i < count; i++) {
    const iframe = page.locator('iframe').nth(i);
    const src = await iframe.getAttribute('src') || '';
    console.log('  [' + i + '] src=' + src.substring(0, 120));
    if (src.includes('sandbox') || src.includes('extensions') || src.includes('tailor')) {
      console.log('  ^^^ APP FRAME');
    }
  }
  
  // Check for buttons/links
  const btns = await page.locator('button').all();
  console.log('\nButtons:', btns.length);
  for (const btn of btns) {
    console.log('  Button:', await btn.innerText());
  }
  
  const links = await page.locator('a').all();
  console.log('\nLinks:', links.length);
  for (let i = 0; i < Math.min(links.length, 20); i++) {
    const t = await links[i].innerText();
    const h = await links[i].getAttribute('href') || '';
    if (t) console.log('  Link: "' + t.substring(0, 50) + '" href=' + h.substring(0, 80));
  }
  
  await browser.close();
}
main().catch(e => console.error(e.message));
