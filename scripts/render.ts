import {chromium} from 'playwright';
import path from 'node:path';

const browser = await chromium.launch({
  headless: true,
  args: ['--disable-web-security'], // Required to bypass CORS issues on file:// protoco;
});
const page = await browser.newPage();
const url = `file://${path.resolve(import.meta.dirname, '../dist/index.html')}`;
const downloadPromise = page.waitForEvent('download');
await page.goto(url);
const download = await downloadPromise;
const savePath = './playwright-downloads/' + download.suggestedFilename();
await download.saveAs(savePath);
await browser.close();
