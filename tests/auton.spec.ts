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

  let  videoUrl = []
  
  for (let i = 0; i < urlList.length; i++) {
    const browser = await firefox.launch({ });
    const context = await browser.newContext({});
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
      const upJson = {
        id: urlList[i].TEST_ID,
        url: url,
        elapsed: elapsed,
        cdate: today,
        success: 'Y',
        screenshot: `/screenshot/${urlList[i].TEST_ID}/${today}.png`,
        traces: `/trace/${urlList[i].TEST_ID}/${today}.zip`
      }
      videoUrl.push(upJson)
    } catch (err) {
      const upJson = {
        id: urlList[i].TEST_ID,
        elapsed: 0,
        cdate: today,
        success: 'N'
      }
      console.log(upJson)
      const result = await postApex(upJson);
    }
    await browser.close();
  }
  
  for (let i = 0; i < videoUrl.length; i++) {

    const browser = await chromium.launch({ });
    const context = await browser.newContext({
      recordVideo: {
        dir: `./video/${urlList[i].TEST_ID}/${today}`
      }
    });

    try {
      const page = await context.newPage();
      const url = videoUrl[i].url;
      const startTime = new Date();
      await page.goto(url, {
        waitUntil: 'networkidle',
        timeout: 3000
      });
      const files = fs.readdirSync(`./video/${urlList[i].TEST_ID}/${today}`);
      console.log(files[0])
      const upJson = {
        id: videoUrl[i].id,
        url: videoUrl[i].url,
        elapsed: videoUrl[i].elapsed,
        cdate: videoUrl[i].cdate,
        success: videoUrl[i].success,
        screenshot: videoUrl[i].screenshot,
        video: `/video/${videoUrl[i].id}/${today}/${files[0]}`,
        traces: videoUrl[i].traces
      }
      const result = await postApex(upJson);
      console.log(upJson)
    } catch (err) { }
    await browser.close();
  }
})
