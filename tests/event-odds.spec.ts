import { test, expect } from '../src/fixtures/base.fixture';
import { FootballPage } from '../src/pages/FootballPage';

test('Visitor opens the first football event and sees positive odds', {
  tag: ['@e2e', '@odds', '@critical'],
  annotation: [
    { type: 'severity', description: 'Critical: the first football event shows usable odds' },
    { type: 'description', description: 'Checks that the first football match is clickable and displays positive coefficients.' },
  ],
}, async ({ mainPage }) => {
  await mainPage.openFootball();
  const footballPage = new FootballPage(mainPage.page);
  await expect(footballPage.firstOutcome).toBeVisible();
  await footballPage.selectFirstOutcome();
  await expect.poll(() => footballPage.positiveOutcomeCount(), { timeout: 15_000 }).toBeGreaterThan(0);
});