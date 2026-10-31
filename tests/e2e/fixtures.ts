import { expect, test as base } from '@playwright/test';

export { expect };

export const test = base.extend({
  page: async ({ page }, use) => {
    await page.addInitScript(() => {
      localStorage.setItem('starry-island-migration-grade-2-term-1-math-v1', 'complete-v1');
    });
    await use(page);
  },
});
