import { test, expect } from '../src/fixtures/base.fixture';

test('Visitor opens Football, then Basketball, then Live from Sports', {
  tag: ['@e2e', '@navigation', '@critical'],
  annotation: [
    { type: 'severity', description: 'Critical: Sports navigation opens three categories' },
    { type: 'owner', description: 'Ilja323' },
    { type: 'description', description: 'Checks the Football, Basketball, and Live navigation sequence.' },
    { type: 'story', description: 'E2E-NAV-001' },
  ],
}, async ({ mainPage }) => {
  await mainPage.openFootball();
  await expect(mainPage.page).toHaveURL(/\/sports\/football/);
  await mainPage.openBasketball();
  await expect(mainPage.page).toHaveURL(/\/sports\/basketball/);
  await mainPage.openLive();
  await expect(mainPage.page).toHaveURL(/\/sports\/live/);
});