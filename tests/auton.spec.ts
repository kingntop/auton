import {
  test,
  expect
} from '@playwright/test';

import {
  replaceK,
  yesterday,
} from "./common/utils";

// Apex 연동
import {
  getUid,
  postApex,
  getUrlList
} from "./common/apex";


test.describe('Auton', async () => {


  test.beforeAll(async () => {

  });


  test.beforeEach(async () => {


  });

  test.afterEach(async () => {

  });

  test.afterAll(async () => {

  });


  test('회사소개', async ({page}) => {

    const urlList = await getUrlList();
    console.log(urlList)

    for (const urlJson of urlList) {
      const url = urlJson.url;
      
      await page.goto(url);
      await page.screenshot({path: './screenshot/' + replaceK(url) + '.png'});

    }
    await page.goto('https://auton.kr/company/about');


  });

});