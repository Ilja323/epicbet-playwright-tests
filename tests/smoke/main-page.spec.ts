import { test, expect } from '../../src/fixtures/base.fixture';

/**
 * Smoke: MainPage
 *
 * Verifies that the main page loads and the main UI element is visible.
 *
 * Test ID: SMOKE-001
 */
test.describe('Smoke: MainPage', () => {
  test(
    'loads and shows main UI elements',
    {
      tag: ['@smoke', '@critical'],
      annotation: [
        { type: 'severity', description: 'critical' },
        { type: 'owner', description: 'Ilja323' },
        { type: 'feature', description: 'MainPage' },
        { type: 'story', description: 'SMOKE-001' },
      ],
    },
    async ({ mainPage }) => {
      await test.step('Verify page title is set', async () => {
        await expect(mainPage.page).toHaveTitle(/./);
      });

      await test.step('Verify search button is visible', async () => {
        await expect(mainPage.searchButton).toBeVisible({ timeout: 15_000 });
      });
    }
  );
});