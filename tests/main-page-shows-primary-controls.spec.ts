import { test, expect } from '../src/fixtures/base.fixture';

test('Visitor opens Sports and sees the header, logo, and search button', {
  tag: ['@smoke', '@critical'],
}, async ({ mainPage }) => {
  await expect(mainPage.header).toBeVisible();
  await expect(mainPage.logo).toBeVisible();
  await expect(mainPage.searchButton).toBeVisible();
});