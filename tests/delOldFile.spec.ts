import {
  test,
  // expect,
  chromium
} from '@playwright/test';

import dayjs from "dayjs";
import { readdir} from 'fs/promises';
import fs from 'fs';

import {
  getCodeList,
  postDelApex
} from "./common/apex";

const path = '/logs/public';


test('Old File Remove', async ({ page }) => {


  const lists = await getCodeList();

  let aMonthBefore:string = '99999999';
  let aMonthBeforeDB:string = '99999999';

  for (const list of lists) {
    if (list.GBN === 'FDEL' && list.CODE ==='FILE') {
      const days = parseInt(list.VAL);
      console.log(days)
      aMonthBefore = dayjs().subtract(days, "d").format("YYYYMMDD");
    }
    if (list.GBN === 'FDEL' && list.CODE ==='DB') {
      aMonthBeforeDB = list.VAL
    }
  }

  const files = await getFileList(path);
  console.log(aMonthBefore)
  
  for (const file of files) {
    const regex = new RegExp(/\d{8}/);
    const match = regex.exec(file);

    if (match) {
      const date = match[0];
      if (date <= aMonthBefore) {
        try {
          fs.unlinkSync(file)
          console.log(`${file} is older than a month`);
        } catch(err) {
          console.error(err)
        }
      }
    }
  }
  await postDelApex(aMonthBeforeDB.trim())
  await page.goto('http://localhost/');
  
});

const getFileList = async (path) => {
  let files = [];
  const items = await readdir(path, { withFileTypes: true });
  for (const item of items) {
      if (item.isDirectory()) {
          files = [
              ...files,
              ...(await getFileList(`${path}/${item.name}`)),
          ];
      } else {
        files.push(`${path}/${item.name}`);
      }
  }
  return files;
};
