import { defineConfig, devices } from '@playwright/test';

const TEST_USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 SisuTestAssignment';

const isCI = !!process.env.CI;

export default defineConfig({
  testDir: './tests',

  // Cloudflare throttling — один воркер
  fullyParallel: false,
  workers: 1,

  timeout: 90_000,
  expect: { timeout: 15_000 },

  forbidOnly: isCI,
  retries: isCI ? 1 : 0,

  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
    ['junit', { outputFile: 'results.xml' }],
    [
      'allure-playwright',
      {
        resultsDir: 'allure-results',
        detail: true,         // шаги внутри теста
        suiteTitle: true,     // группировка по describe
        environmentInfo: {
          Framework: 'Playwright',
          Language: 'TypeScript',
          Node: process.version,
          CI: isCI ? 'GitHub Actions' : 'Local',
        },
      },
    ],
  ],

  use: {
    baseURL: process.env.BASE_URL ?? 'https://epicbet.com/',
    headless: isCI,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    viewport: { width: 1366, height: 768 },
    locale: 'en-US',
    timezoneId: 'Europe/Tallinn',
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        userAgent: TEST_USER_AGENT,
      },
    },
  ],
});