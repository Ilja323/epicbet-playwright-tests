# EpicBet - Playwright Test Assignment

Automated end-to-end tests for [epicbet.com](https://epicbet.com/) written in TypeScript with Playwright.

## Live Allure Report

https://Ilja323.github.io/epicbet-playwright-tests/

Updated automatically on every push to main.

## Tech stack

- Playwright Test - test runner + browser automation
- TypeScript - strict typing
- Page Object Model (BasePage, MainPage, FootballPage) + UI components + custom fixtures
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
    │   ├── pages/             # BasePage, MainPage, FootballPage, Betslip, SearchOverlay
    │   ├── fixtures/          # Custom Playwright fixtures
    ├── tests/                 # All smoke and E2E scenarios
    ├── playwright.config.ts
    └── tsconfig.json

## Page Object structure

Each page class has two clearly separated sections:

- LOCATORS — all element selectors
- ACTIONS — high-level user actions

## Test scenarios

1. Smoke: Sports page shows the main controls
2. E2E: navigation opens Football, Basketball, and Live
3. E2E: Football event shows positive odds
4. E2E: Search opens the first Manchester United match
5. E2E: Visitor adds an odd to the betslip without signing in

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