import { test as base, Page, TestInfo } from '@playwright/test';
import { MainPage } from '../pages/MainPage';

const CF_MARKERS = [
  'text=/just a moment/i',
  'text=/checking your browser/i',
  'text=/verify you are human/i',
  'iframe[src*="challenges.cloudflare.com"]',
];

async function isCloudflareVisible(page: Page): Promise<boolean> {
  for (const marker of CF_MARKERS) {
    const visible = await page
      .locator(marker)
      .first()
      .isVisible()
      .catch(() => false);
    if (visible) return true;
  }
  return false;
}

async function waitForCloudflare(page: Page, timeoutMs = 60_000): Promise<boolean> {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    if (!(await isCloudflareVisible(page))) return true;
    await page.waitForTimeout(2_000);
  }
  return false;
}

type Fixtures = {
  mainPage: MainPage;
};

export const test = base.extend<Fixtures>({
  mainPage: async ({ page }, use, testInfo: TestInfo) => {
    const mainPage = new MainPage(page);
    await mainPage.goto();

    const cfPassed = await waitForCloudflare(page);
    if (!cfPassed) {
      testInfo.skip(
        true,
        'Cloudflare challenge did not resolve - likely CI IP block. Run tests locally to validate assertions.'
      );
      return;
    }

    await page
      .getByRole('button', { name: /allow all|accept all/i })
      .first()
      .click({ timeout: 3_000 })
      .catch(() => undefined);

    await use(mainPage);
  },
});

export { expect } from '@playwright/test';
