import { test, expect } from '../../src/fixtures/base.fixture';

test.describe('Smoke: home page', () => {
  test('loads and shows logo', async ({ homePage }) => {
    await expect(homePage.page).toHaveTitle(/./);
    await expect(homePage.logo).toBeVisible({ timeout: 15_000 });
  });
});
