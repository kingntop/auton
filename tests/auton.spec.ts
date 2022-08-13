import {
  test,
  chromium,
  firefox,
  expect
} from '@playwright/test';

import {
  replaceK,
  yesterday,
  today
} from "./common/utils";

import path from 'path';

import {
  LoginPage
} from "./pages/loginpage";

import { user } from './testdata';


// Apex 연동
import {

  getUrlList,
  postApex
} from "./common/apex";

import fs from 'fs';

test.describe('two tests', () => {

  test.beforeAll(async () => {
    console.log('Before tests');
  });
  test.beforeEach(async ({ page }) => {
    console.log('Before tests');
  });
  test.afterEach(async ({ page }) => {
    console.log('Before tests');
  });
  
  test.afterAll(async () => {
    console.log('After tests');
  });

  test('TestCase', async ({}) => {
    const urlList = await getUrlList();

    for (let i = 0; i < urlList.length; i++) {

      const browser = await chromium.launch();
      const dirVideo = `./video/${urlList[i].TEST_ID}/${today}`
      let elapsed: number = 0;
      let success = 'Y';
      let error = '';
      const context = await browser.newContext({
        recordVideo: {
          dir: dirVideo
        }
      });
      await context.tracing.start({
        screenshots: true,
        snapshots: true
      })
      let page = await context.newPage();


      await new LoginPage(page).login(user.email, user.password)

      try {
        const startTime = new Date();
        await page.goto(urlList[i].URL, {
          waitUntil: 'domcontentloaded',
          timeout: 5000
        });
        const endTime = new Date();
        elapsed = endTime - startTime;
        await page.waitForTimeout(2000);
        await page.waitForSelector(urlList[i].EXPECT);
        await page.screenshot({
          path: `./screenshot/${urlList[i].TEST_ID}/${today}.png`
        });
      } catch (err) {
        console.log(err)
        success = 'N';
        error = err.toString();
      }
      await context.tracing.stop({
        path: `./trace/${urlList[i].TEST_ID}/${today}.zip`
      });
      await context.close();
      await browser.close();
      const files = fs.readdirSync(dirVideo);
      const videoDir = `${dirVideo}/${files[0]}`.replace('./', '/');
      const upJson = {
        id: urlList[i].TEST_ID,
        url: urlList[i].url,
        elapsed: elapsed,
        cdate: today,
        success: success,
        error: error,
        screenshot: `/screenshot/${urlList[i].TEST_ID}/${today}.png`,
        traces: `/trace/${urlList[i].TEST_ID}/${today}.zip`,
        video: `${videoDir}`,
      }
      const result = await postApex(upJson);
    }
  })
});