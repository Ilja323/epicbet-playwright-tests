import { test, expect } from '../../src/fixtures/base.fixture';

test.describe('E2E: sports navigation', () => {
  test(
    'opens sports section',
    {
      annotation: [
        { type: 'severity', description: 'critical' },
        { type: 'owner', description: 'Ilja323' },
        { type: 'feature', description: 'Navigation' },
      ],
    },
    async ({ homePage, sportsPage }) => {
      await test.step('Click Sports link', async () => {
        await homePage.navigateToSports();
      });

      await test.step('Wait for sports page to load', async () => {
        await sportsPage.waitForLoad();
      });

      await test.step('Verify URL changed', async () => {
        await expect(homePage.page).toHaveURL(/sport|live/i, { timeout: 15_000 });
      });
    }
  );

  test(
    'search returns result',
    {
      annotation: [
        { type: 'severity', description: 'normal' },
        { type: 'owner', description: 'Ilja323' },
        { type: 'feature', description: 'Search' },
      ],
    },
    async ({ homePage }) => {
      await test.step('Type search query', async () => {
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