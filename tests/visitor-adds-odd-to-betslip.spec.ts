import { test, expect } from '../src/fixtures/base.fixture';
import { FootballPage } from '../src/pages/FootballPage';

test('Visitor selects an odd and sees it in the betslip without signing in', {
  tag: ['@e2e', '@betslip', '@critical'],
  annotation: [
    { type: 'severity', description: 'Critical: a visitor can add an odd without login' },
    { type: 'description', description: 'Checks that selecting an odd opens the betslip with a visible coefficient.' },
  ],
}, async ({ mainPage }) => {
  await mainPage.openFootball();
  const footballPage = new FootballPage(mainPage.page);
  await expect(footballPage.firstOutcome).toBeVisible();
  await footballPage.selectFirstOutcome();
  await expect(footballPage.betslip.container).toBeVisible();
  await expect.poll(() => footballPage.betslip.selectionCount()).toBeGreaterThan(0);
});