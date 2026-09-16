import { test as base, Page } from '@playwright/test';
import { MainPage } from '../pages/MainPage';

async function waitForCloudflare(page: Page): Promise<void> {
  const markers = [
    'text=/just a moment/i',
    'text=/checking your browser/i',
    'text=/verify you are human/i',
    'iframe[src*="challenges.cloudflare.com"]',
  ];

  for (let attempt = 0; attempt < 30; attempt++) {
    let cfVisible = false;

    for (const marker of markers) {
      if (await page.locator(marker).first().isVisible().catch(() => false)) {
        cfVisible = true;
        break;
      }
    }

    if (!cfVisible) return;
    await page.waitForTimeout(2000);
  }

  console.warn('[cf] Cloudflare challenge did not pass in 60s');
}

type Fixtures = {
  mainPage: MainPage;
};

export const test = base.extend<Fixtures>({
  mainPage: async ({ page }, use) => {
    const mainPage = new MainPage(page);
    await mainPage.goto();
    await waitForCloudflare(page);
    await page.getByRole('button', { name: 'Allow all' }).click().catch(() => undefined);
    await use(mainPage);
  },
});

export { expect } from '@playwright/test';