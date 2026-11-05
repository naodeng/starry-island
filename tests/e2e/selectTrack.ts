import { expect, type Page } from '@playwright/test';

export async function selectCourseTrack(page: Page, grade: string, term: string) {
  await page.goto('/settings');
  await expect(page.getByRole('heading', { name: '设置', level: 1 })).toBeVisible();
  await page.getByRole('button', { name: '调整学习赛道' }).click();

  const dialog = page.getByRole('dialog', { name: '调整学习赛道' });
  await dialog.getByRole('button', { name: grade, exact: true }).click();
  await dialog.getByRole('button', { name: term, exact: true }).click();
  await dialog.getByRole('button', { name: '保存设置' }).click();
  await expect(dialog).toHaveCount(0);
}
