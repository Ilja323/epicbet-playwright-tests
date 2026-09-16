import { Locator, Page } from '@playwright/test';

export class Betslip {
  // LOCATORS
  readonly container: Locator;
  readonly selections: Locator;
  readonly toggle: Locator;
  readonly stakeInput: Locator;
  readonly placeBetButton: Locator;
  readonly registrationDialog: Locator;
  readonly closeRegistrationButton: Locator;

  constructor(page: Page) {
    this.toggle = page.getByTestId('betslip-button');
    this.container = page.getByTestId('betslip-container');
    this.selections = this.container.getByTestId('betslip-selection');
    this.stakeInput = this.container.getByRole('textbox');
    this.placeBetButton = this.container.getByRole('button', { name: 'Place bet', exact: true });
    this.registrationDialog = page.getByRole('dialog');
    this.closeRegistrationButton = this.registrationDialog.getByRole('button', { name: /close/i });
  }

  // ACTIONS
  async open(): Promise<void> {
    if (await this.container.isVisible().catch(() => false)) return;
    await this.toggle.click({ force: true });
  }

  async enterStake(amount: string): Promise<void> {
    await this.stakeInput.fill(amount);
  }

  async placeBet(): Promise<void> {
    await this.placeBetButton.click();
  }

  async closeRegistration(): Promise<void> {
    await this.closeRegistrationButton.click();
  }

  async selectionCount(): Promise<number> {
    return this.selections.count();
  }
}