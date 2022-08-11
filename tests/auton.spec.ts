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

// Apex 연동
import {

  getUrlList,
  postApex
} from "./common/apex";


import fs from 'fs';


test('TestCase', async ({

}) => {
  const urlList = await getUrlList();
  
  for (let i = 0; i < urlList.length; i++) {

    const browser = await firefox.launch({});
    const context = await browser.newContext({
      recordVideo: {
        dir: `./video/${urlList[i].TEST_ID}/${today}`,
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
      screenshots: true,
      snapshots: true
    })
    try {
      const page = await context.newPage();
      const url = urlList[i].URL;
      const startTime = new Date();
      await page.goto(url, {
        waitUntil: 'networkidle',
        timeout: 3000
      });
      const endTime = new Date();
      const elapsed = endTime - startTime;
      await page.waitForTimeout(1000);
      await page.screenshot({
        path: `./screenshot/${urlList[i].TEST_ID}/${today}.png`
      });
      await context.tracing.stop({
        path: `./trace/${urlList[i].TEST_ID}/${today}.zip`
      });
      const files = fs.readdirSync(`./video/${urlList[i].TEST_ID}/${today}`);
      console.log(files[0])
      const upJson = {
        id: urlList[i].TEST_ID,
        url: url,
        elapsed: elapsed,
        cdate: today,
        success: 'Y',
        screenshot: `/screenshot/${urlList[i].TEST_ID}/${today}.png`,
        video: `/video/${urlList[i].TEST_ID}/${today}/${files[0]}`,
        trace: `/trace/${urlList[i].TEST_ID}/${today}.zip`
      }

      const result = await postApex(upJson);
      console.log(upJson)
    } catch (err) {
      const upJson = {
        id: urlList[i].TEST_ID,
        elapsed: 0,
        cdate: today,
        success: 'N'
      }
      console.log(upJson)
    }
    await context.close();
    await browser.close();

  }
})
