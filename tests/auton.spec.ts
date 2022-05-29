import {
  chromium,
  Browser,
  BrowserContext,
  Page,
  test,
  expect
} from '@playwright/test';

import rimraf from "rimraf"
import axios, {
  AxiosResponse
} from 'axios';
import fs from 'fs';
import FormData from 'form-data';


const appUrl = 'https://www.auton.kr/';
const image_url = 'https://g575dfbc1dbf538-playwright.adb.ap-seoul-1.oraclecloudapps.com/ords/playwright/images/images/';
const json_url = 'https://g575dfbc1dbf538-playwright.adb.ap-seoul-1.oraclecloudapps.com/ords/playwright/jons//jsons/'
const serial_id = Math.random().toString(36).slice(2);

let browser: Broswer;
let browserContext: BrowserContext;
let page: Page;

let page_id:Number;

function getFormatDate() {
  var rightNow = new Date();
  return rightNow.toISOString().slice(0, 10).replace(/-/g, "");
}

async function upload_image(url: String, fileType: String, fileName: String, fileLocation) {
  const form_data = new FormData();
  form_data.append('file', fs.createReadStream(fileLocation));

  const request_config = {
    headers: {
      "filename": fileName,
      "image_type": fileType,
      "page_id":page_id,
      "serial_id": serial_id,
      "Content-Type": "multipart/form-data"
    },
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
    data: form_data
  };
  return axios
    .post(url, form_data, request_config);
}

test.describe.configure({
  mode: 'serial'
});

test.beforeAll(async () => {
  console.log(serial_id)
  browser = await chromium.launch({
    headless: false
  });
  rimraf('./image', error => {
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

  upload_image(image_url, 'image/png', getFormatDate() + '_screen.png', 'image/' + getFormatDate() + '_screen.png');

  await browserContext.tracing.stop({
    path: 'trace/' + getFormatDate() + '_trace.zip'
  });

  upload_image(image_url, 'application/zip', getFormatDate() + '_trace.zip', 'trace/' + getFormatDate() + '_trace.zip');
  if (!page.isClosed()) {
    await page.close();
    await browserContext.close();
  }
});

test.afterAll(async () => {
  upload_image(json_url, 'application/json', 'reports.json', 'report/reports.json');
  await browser.close();
});

test.describe('Home Page', () => {
  test('홍보센터', async ({}) => {
    page_id = 1;
    await page.goto('https://auton.kr/prinfo/news');
    await page.hover('#header')
    await page.locator('#header >> text=홍보센터').click();
    await expect(page).toHaveURL('https://auton.kr/prinfo/news');
  });

  test('뉴스/매거진', async ({}) => {
    page_id = 2;
    await page.goto('https://auton.kr/prinfo/news');
    await page.hover('#header')
    await page.locator('#header >> text=뉴스/매거진').click();
    await expect(page).toHaveURL('https://auton.kr/prinfo/news');
  });

  test('회사소개', async ({}) => {
    page_id = 3;
    await page.goto('https://auton.kr/company/about');
    await page.hover('#header')
    await page.locator('#header >> text=회사소개').click();
    await expect(page).toHaveURL('https://auton.kr/company/about');
  });

});