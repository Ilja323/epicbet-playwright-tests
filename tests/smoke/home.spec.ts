import { test, expect } from '../../src/fixtures/base.fixture';

/**
 * Smoke: home page
 *
 * Verifies that the home page loads and shows the main UI element
 * (search button) within the expected time.
 *
 * Test ID: SMOKE-001
 */
test.describe('Smoke: home page', () => {
  test(
    'loads and shows main UI elements',
    {
      tag: ['@smoke', '@critical'],
      annotation: [
        { type: 'severity', description: 'critical' },
        { type: 'owner', description: 'Ilja323' },
        { type: 'feature', description: 'Home' },
        { type: 'story', description: 'SMOKE-001' },
        { type: 'description', description: 'Home page loads and main UI is visible' },
      ],
    },
    async ({ homePage }) => {
      await test.step('Verify page title is set', async () => {
        await expect(homePage.page).toHaveTitle(/./);
      });

      await test.step('Verify search button is visible', async () => {
        await expect(homePage.searchButton).toBeVisible({ timeout: 15_000 });
      });
    }
  );
});