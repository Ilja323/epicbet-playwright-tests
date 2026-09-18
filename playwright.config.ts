import { defineConfig, devices } from '@playwright/test';

const TEST_USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 SisuTestAssignment';

const isCI = !!process.env.CI;
const shouldRunHeadless = process.env.PW_HEADLESS
  ? process.env.PW_HEADLESS === 'true'
  : isCI;

export default defineConfig({
  testDir: './tests',

  // Cloudflare throttling — one worker to avoid triggering the anti-bot mechanism
  fullyParallel: false,
  workers: 1,

  timeout: 90_000,
  expect: { timeout: 15_000 },

  forbidOnly: isCI,
  retries: isCI ? 1 : 0,

  reporter: [
    // Console-only reporter for live feedback during a run
    ['list'],
    // Single source of truth for reports — Allure
    [
      'allure-playwright',
      {
        resultsDir: 'allure-results',
        detail: true,
        suiteTitle: true,
        environmentInfo: {
          Framework: 'Playwright',
          Language: 'TypeScript',
          Node: process.version,
          Environment: isCI ? 'GitHub Actions' : 'Local',
        },
      },
    ],
  ],

  use: {
    baseURL: process.env.BASE_URL ?? 'https://epicbet.com/',
    headless: shouldRunHeadless,
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
        launchOptions: {
          args: ['--disable-blink-features=AutomationControlled'],
        },
      },
    },
  ],
});