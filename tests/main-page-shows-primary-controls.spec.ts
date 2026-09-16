import { test, expect } from '../src/fixtures/base.fixture';

test.describe('Smoke: Sports page loads', () => {
  test('Visitor opens Sports and sees the header, logo, and search button', {
    tag: ['@smoke', '@critical'],
    annotation: [
      { type: 'severity', description: 'Critical: the Sports page shows its primary controls' },
      { type: 'owner', description: 'Ilja323' },
      { type: 'description', description: 'Checks that the Sports page loads with the main navigation and search control.' },
    ],
  }, async ({ mainPage }) => {
    await expect(mainPage.header).toBeVisible();
    await expect(mainPage.logo).toBeVisible();
    await expect(mainPage.searchButton).toBeVisible();
  });
});