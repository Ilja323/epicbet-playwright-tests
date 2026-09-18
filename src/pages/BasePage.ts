import { Page } from '@playwright/test';

export abstract class BasePage {
  constructor(readonly page: Page) {}

  protected async open(url: string): Promise<void> {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }
}