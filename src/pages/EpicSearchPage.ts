import { Page, Locator } from '@playwright/test';

/**
 * EpicSearchPage — EpicBet search overlay / page.
 *
 * Opened by clicking the "Epic otsing" (Epic Search) button on MainPage.
 *
 * Structure:
 *  1. LOCATORS — all element selectors for this page (fill placeholders with real selectors)
 *  2. ACTIONS  — high-level user actions performed on this page
 */
export class EpicSearchPage {
  readonly page: Page;

  // ============================================================
  // LOCATORS
  // ============================================================

  /** Search input field */
  readonly searchInput: Locator;

  /** Container with search results */
  readonly resultsContainer: Locator;

  /** Individual result rows / cards */
  readonly resultItems: Locator;

  // TODO: add more locators, e.g.:
  // readonly closeButton: Locator;
  // readonly clearButton: Locator;
  // readonly emptyStateMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.searchInput = page.getByTestId('search-input');

    this.resultsContainer = page.locator('[data-testid="search-results"]'); // TODO: replace with real selector
    this.resultItems = page.locator('[data-testid="search-result-item"]');  // TODO: replace with real selector
  }

  // ============================================================
  // ACTIONS
  // ============================================================

  /** Wait until the search overlay / page is fully visible */
  async waitForOpen(): Promise<void> {
    await this.searchInput.waitFor({ state: 'visible', timeout: 10_000 });
  }

  /** Type a query into the search input and submit it */
  async search(term: string): Promise<void> {
    await this.waitForOpen();
    await this.searchInput.fill(term);
    await this.searchInput.press('Enter');
  }

  /** Find a result item by a visible text fragment */
  resultByText(text: string | RegExp): Locator {
    return this.page.getByText(text).first();
  }

  // TODO: add more actions, e.g.:
  // async clearSearch(): Promise<void> { ... }
  // async close(): Promise<void> { ... }
}