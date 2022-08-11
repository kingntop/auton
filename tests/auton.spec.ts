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

import path from 'path';


test.describe('Auton', async () => {



  test.beforeAll(async ({
    browser
  }) => {
    // page = await browser.newPage(); //Create a new Page instance
  });
  test.beforeEach(async () => {});

  test.afterEach(async () => {});

  test.afterAll(async () => {});

  test('TestCase', async ({
    
  }) => {
    const urlList = await getUrlList();
    for (let i = 0; i < urlList.length; i++) {
      const browser = await chromium.launch({});
      const context = await browser.newContext({
        recordVideo: {
          dir: path.resolve(`videos/${urlList[i].TEST_ID}`),
          size: {
            width: 1920,
            height: 1080
          }
        },
        viewport: {
          width: 1920,
          height: 1080
        }
      });
      await context.tracing.start({
        screenshots: true,snapshots: true
      })
      const page = await context.newPage();
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
      await context.tracing.stop({path:`trace/${urlList[i].TEST_ID}.zip`});
      await browser.close();
      await context.close();
    } 
  
  })

});