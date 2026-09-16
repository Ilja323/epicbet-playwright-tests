import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SportsPage } from '../pages/SportsPage';

type Fixtures = {
  homePage: HomePage;
  sportsPage: SportsPage;
};

export const test = base.extend<Fixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await use(homePage);
  },

  sportsPage: async ({ page }, use) => {
    await use(new SportsPage(page));
  },
});

export { expect } from '@playwright/test';
