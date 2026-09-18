import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { SearchOverlay } from './SearchOverlay';

export class MainPage extends BasePage {
  readonly url = 'https://epicbet.com/en/sports';

  // LOCATORS
  readonly header = this.page.getByTestId('header');
  readonly logo = this.header.getByLabel('Epicbet');
  readonly searchButton = this.page.getByTestId('search-button');
  readonly footballLink = this.page.getByRole('link', { name: 'Football', exact: true });
  readonly basketballLink = this.page.getByRole('link', { name: 'Basketball', exact: true });
  readonly liveLink = this.page.getByRole('link', { name: 'Live', exact: true });
  readonly searchOverlay = new SearchOverlay(this.page);

  constructor(page: Page) {
    super(page);
  }

  // ACTIONS
  async goto(): Promise<void> {
    await this.open(this.url);
  }

  async openSearch(): Promise<SearchOverlay> {
    await this.searchButton.click();
    return this.searchOverlay;
  }

  async openFootball(): Promise<void> {
    await this.footballLink.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async openBasketball(): Promise<void> {
    await this.basketballLink.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async openLive(): Promise<void> {
    await this.liveLink.click();
    await this.page.waitForLoadState('domcontentloaded');
  }
}
