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

// http://146.56.47.30:3000/images//652BDE771ADB3C5F215AB01A83537A374B3820A7/1.png

let uidInfo:any = {};

test.describe('test', async () => {

  test.beforeAll(async ({ browser }) => {

     const infos = await getUidAll();

     for (const info of infos) {
         let rimraf = require("rimraf");
         rimraf("images/" + info.uid, function () { console.log("done"); });
     }

  })

  test('test', async ({  }) => {

      const browserTypes =  [chromium, webkit];
      let  Json = []
      const infos = await getUidAll();
      for (const info of infos) {
          uidInfo = await getUid(info.uid)
 

          for (const browserType of browserTypes)  {

              for (const screen of uidInfo.screen) {
                  
                  const browser = await browserType.launch();
                  const device = devices[screen.description]
                  const context = await browser.newContext( {...device });

                  if (browserType.name() == device.defaultBrowserType) {
                      const page = await context.newPage()
                      let  start_mi = Date.now();
                      await page.goto(uidInfo.url, { waitUntil: 'networkidle'  });
                      page.on("pageerror", (err) => {
                          console.log(err.message)
                      })
                      await page.screenshot({ path: 'images/' + info.uid + '/' + screen.code +'.png', fullPage: true });
                      let end_mi = Date.now();
                      console.log(start_mi, end_mi, end_mi - start_mi, browserType.name(), browser.version());
                      
                      const apexJson = {
                          code : screen.code,
                          uid : info.uid,
                          status : 0,
                          dcl : end_mi - start_mi
                      }     

                      Json.push(apexJson)
                  }
              }
          }
          
          postApex(info.uid, Json)
      }

  });
})