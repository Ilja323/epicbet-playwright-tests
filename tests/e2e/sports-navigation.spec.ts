import { test, expect } from '../../src/fixtures/base.fixture';

/**
 * E2E: MainPage navigation
 *
 * Covers the main navigation flow: opening the Sports section
 * via the main menu.
 */
test.describe('E2E: MainPage navigation', () => {
  test(
    'opens sports section',
    {
      tag: ['@e2e', '@navigation', '@critical'],
      annotation: [
        { type: 'severity', description: 'critical' },
        { type: 'owner', description: 'Ilja323' },
        { type: 'feature', description: 'Navigation' },
        { type: 'story', description: 'E2E-NAV-001' },
      ],
    },
    async ({ mainPage }) => {
      await test.step('Click Sports link', async () => {
        await mainPage.navigateToSports();
      });

      await test.step('Verify URL changed to sports', async () => {
        await expect(mainPage.page).toHaveURL(/sport|live/i, { timeout: 15_000 });
      });
    }
  );
});