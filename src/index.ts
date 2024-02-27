import {chromium} from 'playwright'
import path from 'node:path'

const browser = await chromium.launch({headless: false});
const page = await browser.newPage();
const url = `file://${path.resolve(import.meta.dirname, './index.html')}`;
await page.goto(url);
await browser.close();
