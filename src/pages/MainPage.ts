import { Page, Locator } from '@playwright/test';

/**
 * MainPage — EpicBet home / main page.
 *
 * URL: /
 *
 * Structure:
 *  1. LOCATORS — all element selectors for this page (fill placeholders with real selectors)
 *  2. ACTIONS  — high-level user actions performed on this page
 */
export class MainPage {
  readonly page: Page;

  // ============================================================
  // LOCATORS
  // ============================================================

  /** Logo in the site header */
  readonly logo: Locator;

  /** "Epic otsing" search trigger button in the header */
  readonly searchButton: Locator;

  /** Link to the Sports section in the main navigation */
  readonly sportsLink: Locator;

  /** Generic main navigation container */
  readonly mainNavigation: Locator;

  // TODO: add more locators for elements you need on the main page, e.g.:
  // readonly liveBettingLink: Locator;
  // readonly promotionsBanner: Locator;
  // readonly loginButton: Locator;
  // readonly registerButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.logo = page.locator('header img').first(); // TODO: replace with real selector

    this.searchButton = page.getByTestId('search-button');

    this.sportsLink = page
      .getByRole('link', { name: /sport|спорт/i })
      .first(); // TODO: verify on real page

    this.mainNavigation = page.locator('header nav').first(); // TODO: replace with real selector
  }

  // ============================================================
  // ACTIONS
  // ============================================================

  /** Open the main page */
  async goto(): Promise<void> {
    await this.page.goto('/', { waitUntil: 'domcontentloaded' });
  }

  /** Click the "Epic otsing" button to open the search UI */
  async openSearch(): Promise<void> {
    await this.searchButton.click();
  }

  /** Navigate to the Sports section via the main menu */
  async navigateToSports(): Promise<void> {
    await this.sportsLink.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  // TODO: add more actions you need, e.g.:
  // async openLive(): Promise<void> { ... }
  // async openPromotions(): Promise<void> { ... }
}