import { test, expect } from '@playwright/test';
import checkDiskSpace from 'check-disk-space'

import {
  replaceK,
  yesterday,
  today,
  errMsg
} from "./common/utils";

import {
  postApeResource
} from "./common/apex";

import fs from 'fs';


async function resourceUsage() {

  const checkDiskSpace = require('check-disk-space').default
  const osu = require('node-os-utils')
  const cpu = osu.cpu
  const mem = osu.mem

  const disk = await checkDiskSpace('/logs').then((diskSpace) => {
      return diskSpace;
  })

  const memory = await mem.info()
    .then(info => {
      return info
    })

  const cpus =  await cpu.usage()
      .then(cpuPercentage => {
        return cpuPercentage
      })

  return  {
    cdate : today,
    cpus : cpus,
    memory : memory.usedMemMb/  memory.totalMemMb,
    disk : disk.free / disk.size
  }
  }

test('test', async ({ page }) => {

  const usage = await resourceUsage()

  await postApeResource(usage)

 console.log(usage)
});