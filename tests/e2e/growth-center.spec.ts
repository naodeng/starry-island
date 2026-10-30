import { expect, test } from './fixtures';

test('keeps course growth and challenge growth in separate views', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/growth');

  await expect(page.getByRole('heading', { name: '成长中心', level: 1 })).toBeVisible();
  await expect(page.getByRole('tab', { name: '成长概览' })).toHaveAttribute('aria-selected', 'true');
  const learningSummary = page.getByRole('region', { name: '课程学习成长摘要' });
  const challengeSummary = page.getByRole('region', { name: '闯关成长摘要' });
  await expect(learningSummary).toContainText('已点亮 0 座知识岛');
  await expect(challengeSummary).toContainText('0 次挑战');
  await expect(challengeSummary).toContainText('0 个任务');
  await expect(challengeSummary).toContainText('0 枚徽章');
  await expect(page.getByRole('region', { name: '最近课程学习' })).toContainText('完成一场课程学习后');
  await expect(page.getByRole('region', { name: '最近闯关活动' })).toHaveCount(0);

  await page.getByRole('tab', { name: '学习星图' }).click();
  await expect(page.getByRole('heading', { name: '每完成一点，星岛就亮一点' })).toBeVisible();
  await expect(page.locator('.exploration-zone')).toHaveCount(12);
  await expect(page.getByRole('region', { name: '闯关成长摘要' })).toHaveCount(0);

  await page.getByRole('tab', { name: '闯关成长' }).click();
  await expect(page.getByRole('heading', { name: '闯关成长记录', level: 2 })).toBeVisible();
  await expect(page.getByRole('heading', { name: '各路线进度' })).toBeVisible();
  await expect(page.getByRole('region', { name: '学习星图' })).toHaveCount(0);
});

test('keeps both historical growth links on their original views', async ({ page }) => {
  await page.goto('/achievements');
  await expect(page.getByRole('tab', { name: '学习星图' })).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByRole('heading', { name: '每完成一点，星岛就亮一点' })).toBeVisible();

  await page.goto('/challenges/growth');
  await expect(page.getByRole('tab', { name: '闯关成长' })).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByRole('heading', { name: '闯关成长记录', level: 2 })).toBeVisible();
});
