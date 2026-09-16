import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;

  readonly sportsLink: Locator;
  readonly searchButton: Locator;
  readonly searchInput: Locator;

  constructor(page: Page) {
    this.page = page;

    this.sportsLink = page
      .getByRole('link', { name: /sport|спорт/i })
      .first();

    this.searchButton = page.getByTestId('search-button');
    this.searchInput = page.getByTestId('search-input');
  }

  async goto(): Promise<void> {
    await this.page.goto('/', { waitUntil: 'domcontentloaded' });
  }

  async navigateToSports(): Promise<void> {
    await this.sportsLink.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async search(term: string): Promise<void> {
    await this.searchButton.click();
    await this.searchInput.waitFor({ state: 'visible', timeout: 10_000 });
    await this.searchInput.fill(term);
    await this.searchInput.press('Enter');
  }
}