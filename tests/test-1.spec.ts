import { test, expect } from '@playwright/test';

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
      await page.goto('https://auton.kr/company/about');
    });
  
  });