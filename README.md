## Requirements

- Node.js 20+
- npm 9+

## Setup

    npm ci
    npx playwright install --with-deps chromium

## Running tests

    npm test                # all tests
    npm run test:headed     # visible browser
    npm run test:ui         # Playwright UI mode
    npm run test:debug      # debug with inspector
    npm run typecheck       # tsc --noEmit

## Running by tags

    npm run test:smoke       # @smoke
    npm run test:e2e         # @e2e
    npm run test:critical    # @critical
    npm run test:navigation  # @navigation
    npm run test:search      # @search

## Manual GitHub Actions run

Use GitHub Actions → Playwright Tests → Run workflow and select a tag:

- all
- @smoke
- @e2e
- @critical
- @navigation
- @search

## Reports

Single source of truth: Allure.

    npm run allure:clean      # remove results and report from previous runs
    npm test                  # create results for the current run
    npm run allure:generate   # build HTML from allure-results/
    npm run allure:open       # open generated report locally
    npm run allure:serve      # generate + serve + auto-open

## Project structure

    .
    ├── .github/workflows/     # CI + Pages deploy
    ├── src/
    │   ├── pages/             # BasePage, MainPage, FootballPage, Betslip, SearchOverlay
    │   ├── fixtures/          # Custom Playwright fixtures
    ├── tests/                 # All smoke and E2E scenarios
    ├── playwright.config.ts
    └── tsconfig.json

## Cloudflare

- SisuTestAssignment suffix in the browser User-Agent
- workers: 1 to avoid rate-limiting
- retries: 1 in CI for flaky CF challenges
- waitForCloudflare helper in src/fixtures/base.fixture.ts

## CI

GitHub Actions:

1. Installs dependencies (npm ci)
2. Installs Chromium with system deps
3. Runs Playwright tests (CI=true)
4. Generates Allure report
5. Uploads artifacts: allure-report, allure-results, test-results
6. Deploys allure-report to GitHub Pages (only on main)

Live report: https://Ilja323.github.io/epicbet-playwright-tests/