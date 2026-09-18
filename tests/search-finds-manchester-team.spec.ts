import { test, expect } from '../src/fixtures/base.fixture';

test('Visitor searches for Manchester United and opens the first match', {
  tag: ['@e2e', '@search'],
  annotation: [
    { type: 'severity', description: 'Normal: search finds a Manchester team' },
    { type: 'description', description: 'Checks that the first Manchester United search result opens its match page.' },
  ],
}, async ({ mainPage }) => {
  const search = await mainPage.openSearch();
  await expect(search.input).toBeVisible();
  await search.searchFor('Manchester United');
  await expect(search.firstMatchResult).toBeVisible({ timeout: 20_000 });
  await search.openFirstMatch();
  await expect(mainPage.page).toHaveURL(/\/sports\?matchId=\d+/);
});