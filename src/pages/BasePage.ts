import { Locator, Page } from '@playwright/test';

export abstract class BasePage {
  constructor(readonly page: Page) {}

  protected async open(url: string): Promise<void> {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  protected async clickAndWait(locator: Locator): Promise<void> {
    await locator.click();
    await this.page.waitForLoadState('domcontentloaded');
  }
}