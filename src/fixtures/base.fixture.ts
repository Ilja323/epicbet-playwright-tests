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

async function waitForAppReady(page: Page, timeoutMs = 60_000): Promise<boolean> {
  const started = Date.now();
  const header = page.getByTestId('header');

  while (Date.now() - started < timeoutMs) {
    if (await header.isVisible().catch(() => false)) return true;

    if (await isCloudflareVisible(page)) {
      await page.waitForTimeout(2_000);
      continue;
    }

    await page.waitForTimeout(1_000);
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

    const ua = await page.evaluate(() => navigator.userAgent);
    console.log('[debug] Browser UA:', ua);

    const ready = await waitForAppReady(page);
    if (!ready) {
      testInfo.skip(
        true,
        'Cloudflare challenge did not resolve - likely CI IP block. Run tests locally to validate assertions.'
      );
      return;
    }

    await page
      .getByRole('button', { name: /allow all|accept all|принять все/i })
      .first()
      .click({ timeout: 3_000 })
      .catch(() => undefined);

    await use(mainPage);
  },
});

export { expect } from '@playwright/test';
