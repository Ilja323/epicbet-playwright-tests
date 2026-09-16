import { Page, Locator } from '@playwright/test';

export class SportsPage {
  readonly page: Page;
  readonly eventRows: Locator;
  readonly pageHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.eventRows = page.locator('[data-testid="event-row"], .event-row');
    this.pageHeading = page.locator('h1, h2').first();
  }

  async waitForLoad(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
  }
}
