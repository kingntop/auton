import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {

  // Go to https://shop.hyundai.com/
  await page.goto('https://shop.hyundai.com/');

  // Click button:has-text("현대브랜드관")
  await page.locator('button:has-text("현대브랜드관")').click();
  await expect(page).toHaveURL('https://hyundai.auton.kr/submain/hyundaiBrand');

  // Click button:has-text("My Car")
  await page.locator('button:has-text("My Car")').click();
  await expect(page).toHaveURL('https://hyundai.auton.kr/submain/mycar');

  // Click li:nth-child(6) > .product_a > .product_img > img >> nth=0
  await page.locator('li:nth-child(6) > .product_a > .product_img > img').first().click();


});