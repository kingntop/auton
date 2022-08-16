import {
  test,
  // expect,
  chromium
} from '@playwright/test';

import {
  replaceK,
  yesterday,
  today
} from "./common/utils";

import {
  getProjectUrlList,
  postApex
} from "./common/apex";
import fs from 'fs';
test('Projects Test', async ({}, expect) => {

  const lists = await getProjectUrlList();
  for (let i = 0; i < lists.length; i++) {
    const dirVideo = `./public/video/${lists[i].PROJECT_ID}/${today}`
    let elapsed: number = 0;
    let success = 'Y';
    let error = '';

    const browser = await chromium.launch();
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
    const { expect } = require('@playwright/test');
    const navigationPromise = page.waitForNavigation()
    try {
      async function playtest(code: string) {
        await eval(` 
              (async () =>
              {
                ${code}
              }
              )();`);
      }
      const strcode = lists[i].TSCODE;
      const startTime = new Date();
      await playtest(strcode);
      const endTime = new Date();
      
      elapsed = endTime - startTime;
      console.log(elapsed);
    } catch (err) {
      success = 'N';
      error = err.toString();
    }
    await page.screenshot({
      path:  `./public/screenshot/${lists[i].PROJECT_ID}/${today}.png`,
    })
    await context.tracing.stop({
      path: `./public/trace/${lists[i].PROJECT_ID}/${today}.zip`
    });
    await context.close();
    await browser.close();
    const files = fs.readdirSync(dirVideo);
    const videoDir = `${dirVideo}/${files[0]}`.replace('./', '/');
    const upJson = {
      id: lists[i].PROJECT_ID,
      name : lists[i].PROJECT_NAME,
      gbn: 'P',
      elapsed: elapsed,
      cdate: today,
      success: success,
      error: error,
      screenshot: `/public/screenshot/${lists[i].PROJECT_ID}/${today}.png`,
      traces: `/public/trace/${lists[i].PROJECT_ID}/${today}.zip`,
      video: `${videoDir}`,
    }
    console.log(upJson)
    const result = await postApex(upJson);
  }
});