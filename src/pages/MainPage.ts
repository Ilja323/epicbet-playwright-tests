import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { SearchOverlay } from './SearchOverlay';

export class MainPage extends BasePage {
  readonly url = 'https://epicbet.com/en/sports';

  // LOCATORS
  readonly header: Locator;
  readonly logo: Locator;
  readonly searchButton: Locator;
  readonly footballLink: Locator;
  readonly basketballLink: Locator;
  readonly liveLink: Locator;
  readonly searchOverlay: SearchOverlay;

  constructor(page: Page) {
    super(page);

    this.header = page.getByTestId('header');
    this.logo = this.header.getByLabel('Epicbet');
    this.searchButton = page.getByTestId('search-button');
    const categoryList = page.getByTestId('category-list');
    this.footballLink = categoryList.getByRole('link', { name: 'Football', exact: true });
    this.basketballLink = categoryList.getByRole('link', { name: 'Basketball', exact: true });
    this.liveLink = categoryList.getByRole('link', { name: 'Live', exact: true });
    this.searchOverlay = new SearchOverlay(page);
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
    await this.clickAndWait(this.footballLink);
  }

  async openBasketball(): Promise<void> {
    await this.clickAndWait(this.basketballLink);
  }

  async openLive(): Promise<void> {
    await this.clickAndWait(this.liveLink);
  }
}
