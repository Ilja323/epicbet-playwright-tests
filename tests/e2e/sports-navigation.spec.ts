import { test, expect } from '../../src/fixtures/base.fixture';

/**
 * E2E: sports navigation
 *
 * Covers the main navigation flow: opening the Sports section
 * and searching for a team via the search bar.
 */
test.describe('E2E: sports navigation', () => {
  test(
    'opens sports section',
    {
      tag: ['@e2e', '@navigation', '@critical'],
      annotation: [
        { type: 'severity', description: 'critical' },
        { type: 'owner', description: 'Ilja323' },
        { type: 'feature', description: 'Navigation' },
        { type: 'story', description: 'E2E-NAV-001' },
        { type: 'description', description: 'User opens Sports section via main menu' },
      ],
    },
    async ({ homePage, sportsPage }) => {
      await test.step('Click Sports link', async () => {
        await homePage.navigateToSports();
      });

      await test.step('Wait for sports page to load', async () => {
        await sportsPage.waitForLoad();
      });

      await test.step('Verify URL changed to sports', async () => {
        await expect(homePage.page).toHaveURL(/sport|live/i, { timeout: 15_000 });
      });
    }
  );

  test(
    'search returns result',
    {
      tag: ['@e2e', '@search'],
      annotation: [
        { type: 'severity', description: 'normal' },
        { type: 'owner', description: 'Ilja323' },
        { type: 'feature', description: 'Search' },
        { type: 'story', description: 'E2E-SRCH-001' },
        { type: 'description', description: 'User searches for "Manchester" and sees results' },
      ],
    },
    async ({ homePage }) => {
      await test.step('Type search query "Manchester"', async () => {
        await homePage.search('Manchester');
      });

      await test.step('Verify result is visible', async () => {
        await expect(
          homePage.page.getByText(/Manchester/i).first()
        ).toBeVisible({ timeout: 20_000 });
      });
    }
  );
});