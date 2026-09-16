import { test, expect } from '../../src/fixtures/base.fixture';

test.describe('E2E: sports navigation', () => {
  test('opens sports section', async ({ homePage, sportsPage }) => {
    await homePage.navigateToSports();
    await sportsPage.waitForLoad();
    await expect(homePage.page).toHaveURL(/sport|live/i, { timeout: 15_000 });
  });

  test('search returns result', async ({ homePage }) => {
    await homePage.search('Manchester');
    await expect(
      homePage.page.getByText(/Manchester/i).first()
    ).toBeVisible({ timeout: 20_000 });
  });
});
