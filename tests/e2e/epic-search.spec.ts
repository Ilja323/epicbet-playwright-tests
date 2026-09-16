import { test, expect } from '../../src/fixtures/base.fixture';

/**
 * E2E: EpicSearchPage
 *
 * Covers the search flow: user opens search from MainPage,
 * types a query, and sees results.
 */
test.describe('E2E: EpicSearchPage', () => {
  test(
    'opens Epic Search from MainPage',
    {
      tag: ['@e2e', '@search'],
      annotation: [
        { type: 'severity', description: 'normal' },
        { type: 'owner', description: 'Ilja323' },
        { type: 'feature', description: 'EpicSearchPage' },
        { type: 'story', description: 'E2E-SEARCH-001' },
      ],
    },
    async ({ mainPage, epicSearchPage }) => {
      await test.step('Open Epic Search', async () => {
        await mainPage.openSearch();
      });

      await test.step('Verify search input is visible', async () => {
        await epicSearchPage.waitForOpen();
        await expect(epicSearchPage.searchInput).toBeVisible();
      });
    }
  );

  test(
    'search returns result',
    {
      tag: ['@e2e', '@search'],
      annotation: [
        { type: 'severity', description: 'normal' },
        { type: 'owner', description: 'Ilja323' },
        { type: 'feature', description: 'EpicSearchPage' },
        { type: 'story', description: 'E2E-SEARCH-002' },
      ],
    },
    async ({ mainPage, epicSearchPage }) => {
      await test.step('Open Epic Search', async () => {
        await mainPage.openSearch();
      });

      await test.step('Type query "Manchester"', async () => {
        await epicSearchPage.search('Manchester');
      });

      await test.step('Verify result is visible', async () => {
        await expect(
          epicSearchPage.resultByText(/Manchester/i)
        ).toBeVisible({ timeout: 20_000 });
      });
    }
  );
});