import { test, expect, chromium } from '@playwright/test';

import {
  replaceK,
  yesterday,
  today
} from "./common/utils";

import {
  getProjectUrlList,
  postApex
} from "./common/apex";

test('test', async ({  }) => {
  
  
  const lists = await getProjectUrlList();
  for (let i = 0; i < lists.length; i++) {
    const browser = await chromium.launch();
    const context = await browser.newContext({
      recordVideo: {
        dir: "./video/" 
      }
    });
    let page = await context.newPage();
    async function playtest(code:string) {
      await eval(` 
      (async () =>
      {
        ${code}
        return 0;
      }
      )();`);
      return 1;
    }
    const strcode = lists[i].TSCODE;
    const startTime = new Date();
    const a = await playtest(strcode); 
    const endTime = new Date();
    const elapsed = endTime - startTime;
    console.log(a, elapsed);
    await page.screenshot({
      path: "./screenshot/" + today + ".png"
    })

    await context.close();
    await browser.close();
  }
});