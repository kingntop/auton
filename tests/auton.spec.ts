import {
  test,
  chromium,
  expect
} from '@playwright/test';

import {
  replaceK,
  yesterday,
} from "./common/utils";

// Apex 연동
import {

  getUrlList
} from "./common/apex";


test.describe('Auton', async () => {

  test.beforeAll(async () => {});

  test.beforeEach(async () => {});

  test.afterEach(async () => {});

  test.afterAll(async () => {});

  test('TestCase', async ({
    page
  }) => {

    const browser = await chromium.launch({});
    const context = await browser.newContext({
        /* pass any options */ });
    page = await context.newPage();

    const urlList = await getUrlList();
    console.log(urlList)

    for (let i = 0; i < urlList.length; i++) {
      const url = urlList[i].URL;

      try {
        const url = urlList[i].URL;
        await page.goto(url, {
          waitUntil: 'networkidle'
        });
        await page.waitForTimeout(1000);
        await page.screenshot({
          path: './screenshot/' + urlList[i].TEST_ID + '.png'
        });
      } catch (e) {}
    }
  })
    
});