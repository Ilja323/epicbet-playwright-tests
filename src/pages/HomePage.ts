import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;

  readonly logo: Locator;
  readonly sportsLink: Locator;
  readonly searchButton: Locator;
  readonly searchInput: Locator;

  constructor(page: Page) {
    this.page = page;

    // Header
    this.logo = page.locator('header img').first();

    // Навигация — на EpicBet используется эстонский "Sport" или иконка
    // Уточним после codegen; пока — по data-testid, если есть
    this.sportsLink = page
      .getByRole('link', { name: /sport|спорт/i })
      .first();

    // Поиск — подтверждено через codegen
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

  /**
   * Полный флоу поиска:
   *  1. Клик по кнопке "Epic otsing"
   *  2. Ожидание появления input
   *  3. Ввод текста + Enter
   */
  async search(term: string): Promise<void> {
    await this.searchButton.click();
    await this.searchInput.waitFor({ state: 'visible', timeout: 10_000 });
    await this.searchInput.fill(term);
    await this.searchInput.press('Enter');
  }
}