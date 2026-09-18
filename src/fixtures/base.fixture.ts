import { test as base, Page } from '@playwright/test';
import { MainPage } from '../pages/MainPage';

const CF_MARKERS = [
  'text=/just a moment/i',
  'text=/checking your browser/i',
  'text=/verify you are human/i',
  'text=/attention required/i',
  'text=/access denied/i',
  'text=/enable cookies/i',
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
  mainPage: async ({ page }, use) => {
    const mainPage = new MainPage(page);
    await mainPage.goto();

    const ua = await page.evaluate(() => navigator.userAgent);
    console.log('[debug] Browser UA:', ua);

    const ready = await waitForAppReady(page);
    if (!ready) {
      const title = await page.title().catch(() => 'unknown');
      const body = (await page.locator('body').innerText({ timeout: 2_000 }).catch(() => '')).slice(0, 300);
      console.error(`[cf] Page did not become ready. URL: ${page.url()} Title: ${title} Body: ${body}`);
      throw new Error(
        `[cf] Application did not load in 60s. URL: ${page.url()} Title: ${title} Body: ${body}`
      );
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
