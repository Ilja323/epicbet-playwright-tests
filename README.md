# EpicBet - Playwright Test Assignment

Automated end-to-end tests for [epicbet.com](https://epicbet.com/) written in TypeScript with Playwright.

## Live Allure Report

https://Ilja323.github.io/epicbet-playwright-tests/

Updated automatically on every push to main.

## Tech stack

- Playwright Test - test runner + browser automation
- TypeScript - strict typing
- Page Object Model (MainPage, EpicSearchPage) + custom fixtures
- Allure - test reporting
- GitHub Actions CI + GitHub Pages

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

Or via CLI (PowerShell needs quotes around @):

    npx playwright test --grep "@smoke"
    npx playwright test --grep-invert "@e2e"

## Reports

Single source of truth: Allure.

    npm run allure:generate   # build HTML from allure-results/
    npm run allure:open       # open generated report locally
    npm run allure:serve      # generate + serve + auto-open

In CI, the report is published to GitHub Pages automatically.

## Project structure

    .
    ├── .github/workflows/     # CI + Pages deploy
    ├── src/
    │   ├── pages/             # MainPage, EpicSearchPage
    │   ├── fixtures/          # Custom Playwright fixtures
    │   ├── utils/             # Constants, helpers
    │   └── data/              # Test data
    ├── tests/
    │   ├── smoke/             # Fast smoke checks
    │   └── e2e/               # User-flow scenarios
    ├── playwright.config.ts
    └── tsconfig.json

## Page Object structure

Each page class has two clearly separated sections:

- LOCATORS — all element selectors
- ACTIONS — high-level user actions

## Test scenarios

1. Smoke: MainPage - home page loads and main UI is visible
2. E2E: navigation - user opens the Sports section
3. E2E: Epic Search - user opens search and finds a result

## Cloudflare

The assignment mentions Cloudflare checks. We handle them via:

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