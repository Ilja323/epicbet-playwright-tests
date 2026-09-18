import { Page } from '@playwright/test';

export class SearchOverlay {
  readonly page: Page;

  // LOCATORS
  readonly input;
  readonly firstMatchResult;

  constructor(page: Page) {
    this.page = page;
    this.input = page.getByTestId('search-input');
    this.firstMatchResult = page.getByText('Manchester United', { exact: true }).locator('..');
  }

  // ACTIONS
  async searchFor(team: string): Promise<void> {
    await this.input.fill(team);
    await this.input.press('Enter');
  }

  async openFirstMatch(): Promise<void> {
    await this.firstMatchResult.dispatchEvent('click');
    await this.page.waitForLoadState('domcontentloaded');
  }
}