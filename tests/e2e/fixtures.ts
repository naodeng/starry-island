import { expect, test as base } from '@playwright/test';

export { expect };

export const test = base.extend({
  page: async ({ page }, use) => {
    await page.addInitScript(() => {
      localStorage.setItem('starry-island-migration-grade-2-term-1-math-v1', 'complete-v1');
      if (localStorage.getItem('starry-island-course-track-v1') === null) {
        localStorage.setItem('starry-island-course-track-v1', JSON.stringify({ gradeId: 'grade-2', termId: 'term-1' }));
      }
    });
    await use(page);
  },
});
