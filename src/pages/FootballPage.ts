import { Locator, Page } from '@playwright/test';
import { Betslip } from './Betslip';

export class FootballPage {
  // LOCATORS
  readonly firstOutcome: Locator;
  readonly outcomeButtons: Locator;
  readonly betslip: Betslip;

  constructor(page: Page) {
    this.outcomeButtons = page.locator('[data-testid="outcome-button"]:not([disabled])');
    this.firstOutcome = this.outcomeButtons.first();
    this.betslip = new Betslip(page);
  }

  // ACTIONS
  async selectFirstOutcome(): Promise<void> {
    await this.firstOutcome.click();
  }

  async positiveOutcomeCount(): Promise<number> {
    const values = await this.outcomeButtons.allTextContents();
    return values.filter((value) => /\d+\.\d{2}$/.test(value.trim())).length;
  }
}