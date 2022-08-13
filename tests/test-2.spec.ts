import { chromium, devices, firefox, webkit, test } from '@playwright/test';
import path from 'path';

const browsers = {
  chromium,
  firefox,
  webkit
};

test('TestCase', async ({
page
}) => {

  for (const [browserName, browser] of Object.entries(browsers)) {
    // Launch a new headless browser instance
    // Note: This is expensive, use contexts for different scenarios
    // instead of starting multiple browser instances
    const launched = await browser.launch();

    // Create a new browser context and start a recording
    // We'll record at native viewport size (1080p)
    const ctx = await launched.newContext({
      recordVideo: {
        dir: path.resolve(`videos/${browserName}`),
        size: { width: 1920, height: 1080 }
      },
      viewport: { width: 1920, height: 1080 }
    });

    // Create a new page (tab) and navigate to a page
    const page = await ctx.newPage();
    await page.goto('https://brunoscheufler.com');

    // Once the page is loaded, navigate to another page
    await page.goto(
      'https://brunoscheufler.com/blog/2021-03-18-when-velocity-implies-simplicity'
    );

    await page.goto(
      'about:blank'
    );


    // End the recording, close the context and terminate the browser
    await ctx.close();
    await launched.close();
  }

});