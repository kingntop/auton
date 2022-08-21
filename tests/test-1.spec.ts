import {
  test,
  // expect,
  chromium
} from '@playwright/test';

import {
  replaceK,
  yesterday,
  today,
  errMsg
} from "./common/utils";

import {
  getProjectUrlList,
  postApex
} from "./common/apex";


function awaitExpectCode(strcode: string) {
  const waitforTime = 'await page.waitForTimeout(1000); \n';
  const result = strcode.split(/\r?\n/);
  let waitResult= []
  for (const line of result) {
    if (line.includes('await expect')) {
      waitResult.push(waitforTime);
    }
    if (line.substring(0, 6) === 'import') {
      continue
    }
    if (line.substring(0, 5) === 'test(') {
      continue
    }
    if (line.substring(0, 3) === '});') {
      continue
    }
    waitResult.push(line);
  }
  const strcode2 = waitResult.join('\n');
  return strcode2;
}

import fs from 'fs';
test('Projects Test', async ({page}, expect) => {

  var usage = require('cpu-percentage');
  var fs = require('fs');
   
  var start = usage();
  fs.readFile(__filename, 'utf8', function(err, data) {
    console.log(usage(start));
  });

  await page.goto('https://www.google.com');
  
});