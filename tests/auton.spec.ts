import {
  chromium,
  Browser,
  BrowserContext,
  Page,
  test,
  expect
} from '@playwright/test';

import {
  AdmZip
} from 'adm-zip'

import rimraf from "rimraf"

const appUrl = 'https://www.auton.kr/';

let browser: Broswer;
let browserContext: BrowserContext;
let page: Page;

function getFormatDate(){
  var rightNow = new Date();
  return  rightNow.toISOString().slice(0,10).replace(/-/g,"");
}

async function createZipArchive() {
  const zip = new AdmZip();
  const outputFile = "test.zip";
  zip.addLocalFolder("./test");
  zip.writeZip(outputFile);
  console.log(`Created ${outputFile} successfully`);
}

test.beforeAll(async () => {
  browser = await chromium.launch({
    headless: false
  });
  rimraf('./image', error => {
    if (error) throw new Error(error);
  });
  rimraf('./report', error => {
    if (error) throw new Error(error);
  });
  rimraf('./trace', error => {
    if (error) throw new Error(error);
  });

});

test.beforeEach(async () => {
  browserContext = await browser.newContext();
  page = await browserContext.newPage();
  await browserContext.tracing.start({
    screenshots: true,
    snapshots: true
  });
  // await page.goto(`${appUrl}/`);
});

test.afterEach(async () => {
  // const timestamp = Math.round(new Date() / 1000);
  await page.screenshot({
    path: 'image/' + getFormatDate() + '_screen.png'
  });
  await browserContext.tracing.stop({
    path: 'trace/' + getFormatDate() + '_trace.zip'
  });
  if (!page.isClosed()) {
    await page.close();
    await browserContext.close();
  }
});

test.afterAll(async () => {
  await browser.close();
});

test.describe('Home Page', () => {
  test('test', async ({
  }) => {

  // Go to https://auton.kr/
  await page.goto('https://auton.kr/');

  // Click a:has-text("네트워크")
  await page.hover('#header')
  await page.locator('a:has-text("네트워크")').click();
  await expect(page).toHaveURL('https://auton.kr/network/master');

  // Click #header >> text=홍보센터
  await page.hover('#header')
  await page.locator('#header >> text=홍보센터').click();
  await expect(page).toHaveURL('https://auton.kr/prinfo/news');

  // Click #header >> text=뉴스/매거진
  await page.hover('#header')
  await page.locator('#header >> text=뉴스/매거진').click();
  await expect(page).toHaveURL('https://auton.kr/prinfo/news');

  // Click #header >> text=회사소개
  await page.hover('#header')
  await page.locator('#header >> text=회사소개').click();
  await expect(page).toHaveURL('https://auton.kr/company/about');
  });

});