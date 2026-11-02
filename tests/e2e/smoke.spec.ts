import { expect, test } from './fixtures';

test('loads catalog and refreshes a nested unit', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: '星岛学园首页' })).toBeVisible();

  await page.goto('/grade-2/term-1/english/unit-01');
  await expect(page.getByRole('heading', { name: '第一单元 · My Family' })).toBeVisible();

  await page.goto('/grade-2/term-1/english/review-01');
  await expect(page.getByRole('heading', { name: '复习一 · Units 1–3' })).toBeVisible();

  await page.goto('/grade-2/term-1/math/unit-01');
  await expect(page.getByRole('heading', { name: '第一单元 · 分类与整理' })).toBeVisible();

  await page.goto('/grade-2/term-1/math/integrated-practice-01');
  await expect(page.getByRole('heading', { name: '综合实践 · 校园小导游' })).toBeVisible();

  await page.goto('/grade-2/term-1/math/integrated-practice-02');
  await expect(page.getByRole('heading', { name: '综合实践 · 身体上的尺子' })).toBeVisible();

  await page.goto('/grade-2/term-2/math/unit-10');
  await expect(page.getByRole('heading', { name: '第十单元 · 总复习' })).toBeVisible();

  await page.goto('/grade-2/term-2/math/integrated-practice-01');
  await expect(page.getByRole('heading', { name: '综合实践 · 小小设计师' })).toBeVisible();

  await page.goto('/grade-2/term-2/english/unit-01');
  await expect(page.getByRole('heading', { name: '第一单元 · Playtime' })).toBeVisible();

  await page.goto('/grade-2/term-2/english/review-01');
  await expect(page.getByRole('heading', { name: '复习一 · Units 1–3' })).toBeVisible();

  await page.goto('/grade-2/term-1/chinese/unit-01');
  await expect(page.getByRole('heading', { name: '第一单元 · 大自然的秘密' })).toBeVisible();
  await page.reload();

  await expect(page.getByRole('heading', { name: '第一单元 · 大自然的秘密' })).toBeVisible();
});

test('announces route loading and respects reduced motion', async ({ page }) => {
  let challengePageChunkWasDelayed = false;
  await page.route('**/assets/ChallengePage-*.js', async (route) => {
    challengePageChunkWasDelayed = true;
    await new Promise((resolve) => setTimeout(resolve, 1_500));
    await route.continue();
  });
  await page.goto('/challenges', { waitUntil: 'domcontentloaded' });

  const loadingStatus = page.getByRole('status').filter({ hasText: '正在准备这段学习旅程' });
  await expect(loadingStatus).toBeVisible();
  expect(challengePageChunkWasDelayed).toBe(true);

  const orbit = page.locator('.loading-state-orbit');
  await expect(orbit).toHaveCSS('animation-name', 'loading-state-orbit');

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(orbit).toHaveCSS('animation-name', 'none');
});
