import {
  test,
  expect,
  chromium,
  firefox,
  webkit,
  devices

} from '@playwright/test';


import {
  yesterday,
  yesterdayDB
} from "./common/utils";
import {
  getUid,
  postApexScreen,
  getUidAll
} from "./common/apex";



test('test', async ({}) => {

  let Json = []
  const uidInfos = await getUidAll();
  for (const uidInfo of uidInfos) {
    console.log(uidInfo.uid);
    const screenInfo = await getUid(uidInfo.uid);
    const screens = screenInfo.screen;
    for (const screen of screens) {
      const browser = await chromium.launch();
      const device = devices[screen.description]
      const context = await browser.newContext({
        ...device
      });
      const page = await context.newPage()
      let start_mi = Date.now();
      await page.goto(uidInfo.url, {
        waitUntil: 'domcontentloaded'
      });
      await page.screenshot({
        path: 'public/home/' + uidInfo.uid + '/' + screen.code + '.png',
        fullPage: true
      });
      let end_mi = Date.now();
      console.log(start_mi, end_mi, end_mi - start_mi);
      const apexJson = {
        code: screen.code,
        uid: uidInfo.uid,
        status: 0,
        elapsed: end_mi - start_mi
      }
      Json.push(apexJson)
    }
    console.log(uidInfo.uid);
    postApexScreen(uidInfo.uid, Json)
  }
});