import { test, expect } from '../src/fixtures/base.fixture';

test('Visitor opens Football, then Basketball, then Live from Sports', {
  tag: ['@e2e', '@navigation', '@critical'],
}, async ({ mainPage }) => {
  await mainPage.openFootball();
  await expect(mainPage.page).toHaveURL(/\/sports\/football/);
  await expect(mainPage.page.getByTestId('category-list')).toBeVisible();
  await expect(mainPage.footballLink).toBeVisible();

  await mainPage.openBasketball();
  await expect(mainPage.page).toHaveURL(/\/sports\/basketball/);
  await expect(mainPage.page.getByTestId('category-list')).toBeVisible();
  await expect(mainPage.basketballLink).toBeVisible();

  await mainPage.openLive();
  await expect(mainPage.page).toHaveURL(/\/sports\/live/);
  await expect(mainPage.page.getByTestId('category-list')).toBeVisible();
  await expect(mainPage.liveLink).toBeVisible();
});