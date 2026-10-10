'use strict';
// Render index.html -> PDF (A4 portrait) + PNG per halaman. Jalankan: node src/render.js
const path = require('path');
const fs = require('fs');
const { chromium } = require(process.env.PLAYWRIGHT_PATH || 'playwright');
const root = path.join(__dirname, '..');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 794, height: 1123 }, deviceScaleFactor: Number(process.env.DSF || 2) });
  await page.goto('file://' + path.join(root, 'index.html'));
  await page.evaluate(() => document.fonts.ready);
  const out = path.join(root, 'halaman');
  fs.mkdirSync(out, { recursive: true });
  const ids = ['cover', ...Array.from({ length: 15 }, (_, i) => 'p' + (i + 1))];
  const only = process.env.ONLY ? process.env.ONLY.split(',') : ids;
  for (const id of only) {
    const name = id === 'cover' ? '00-cover' : String(id.slice(1)).padStart(2, '0') + '-halaman';
    await page.locator('#' + id).screenshot({ path: path.join(out, name + '.png') });
  }
  if (!process.env.NOPDF) {
    await page.pdf({ path: path.join(root, 'Petualangan-Kiko-dan-Teman-Baik.pdf'), width: '794px', height: '1123px', printBackground: true, preferCSSPageSize: true });
  }
  await browser.close();
})();
