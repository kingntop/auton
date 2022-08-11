import {
  test,
  expect
} from '@playwright/test';

// import {
//   replaceK,
//   yesterday,
// } from "./common/utils";

// Apex 연동
import {

  getUrlList
} from "./common/apex";


test.describe('Auton', async () => {

  test.beforeAll(async () => {});

  test.beforeEach(async () => {});

  test.afterEach(async () => {});

  test.afterAll(async () => {});

  test('회사소개', async ({
    page
  }) => {

    const urlList = await getUrlList();
    console.log(urlList)

    for (const urlJson of urlList) {
      try {
        const url = urlJson.URL;
        await page.goto(url);
        await page.screenshot({
          path: './screenshot/' + urlJson.TEST_ID + '.png'
        });
      } catch (e) {}
    }
  });
});