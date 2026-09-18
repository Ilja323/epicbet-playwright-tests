import { test, expect } from '../src/fixtures/base.fixture';

test('Visitor searches for an unknown team and no match result is shown', {
  tag: ['@e2e', '@search'],
}, async ({ mainPage }) => {
  const search = await mainPage.openSearch();
  await expect(search.input).toBeVisible();

  await search.searchFor('ThisTeamDefinitelyDoesNotExist123');
  await expect(search.input).toHaveValue('ThisTeamDefinitelyDoesNotExist123');

  await expect(search.page.getByText('Manchester United', { exact: true })).not.toBeVisible();
  await expect(mainPage.page).not.toHaveURL(/\/sports\?matchId=\d+/);
});