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
  postApex,
  getUidAll
} from "./common/apex";



test('test', async ({}) => {

  const browserTypes = [chromium, webkit];
  let Json = []
  const infos = await getUidAll();
  for (const info of infos) {
    const uidInfo = await getUid(info.uid)
    for (const screen of uidInfo.screen) {
      const browser = await browserType.launch();
      const device = devices[screen.description]
      const context = await browser.newContext({
        ...device
      });
      const page = await context.newPage()
      let start_mi = Date.now();
      await page.goto(uidInfo.url, {
        waitUntil: 'networkidle'
      });
      page.on("pageerror", (err) => {
        console.log(err.message)
      })
      await page.screenshot({
        path: 'images/' + info.uid + '/' + screen.code + '.png',
        fullPage: true
      });
      let end_mi = Date.now();
      console.log(start_mi, end_mi, end_mi - start_mi, browserType.name(), browser.version());
      const apexJson = {
        code: screen.code,
        uid: info.uid,
        status: 0,
        dcl: end_mi - start_mi
      }
      Json.push(apexJson)
    }
    postApex(info.uid, Json)
  }
});