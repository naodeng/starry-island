import { expect, test } from '@playwright/test';

const taskId = 'grade-2-term-1-math-unit-02/basic-01';
const taskUrl = `/challenges/task/${encodeURIComponent(taskId)}`;
const semesterTaskId = 'grade-2-term-1-math-first-half/basic-01';
const semesterTaskUrl = `/challenges/task/${encodeURIComponent(semesterTaskId)}`;

async function submitCurrentAnswer(page: import('@playwright/test').Page) {
  const activity = page.locator('.challenge-activity');
  if (await activity.locator('.choice-activity').count()) {
    await activity.locator('.choice-options button').first().click();
  } else if (await activity.locator('.match-activity').count()) {
    const columns = activity.locator('.match-column');
    const left = columns.nth(0).getByRole('button');
    const right = columns.nth(1).getByRole('button');
    for (let index = 0; index < await left.count(); index += 1) {
      await left.nth(index).click();
      await right.nth(index).click();
    }
  } else if (await activity.locator('.categorize-activity').count()) {
    const rows = activity.locator('.categorize-row');
    for (let index = 0; index < await rows.count(); index += 1) {
      await rows.nth(index).getByRole('button').first().click();
    }
  } else if (await activity.locator('.order-activity').count()) {
    // The renderer rotates an already-correct default order, so it is always submittable.
  } else if (await activity.locator('.arithmetic-activity').count()) {
    await activity.getByRole('spinbutton', { name: '输入计算结果' }).fill('0');
  } else {
    throw new Error('The pilot contains an activity format that the challenge test cannot submit.');
  }

  const submit = activity.locator('.activity-submit-action');
  await expect(submit).toBeEnabled();
  await submit.click();
}

test('saves, restores and completes a challenge without changing learning progress', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ colorScheme: 'dark', reducedMotion: 'reduce' });
  await page.goto(taskUrl);

  await expect(page.getByRole('heading', { name: '基础闯关 1' })).toBeVisible();
  const learningProgressBefore = await page.evaluate(() => localStorage.getItem('china-study-progress-v1'));
  await page.getByRole('button', { name: '开始挑战' }).click();
  const questionHeading = page.locator('.challenge-activity h2');
  await expect(questionHeading).toBeVisible();
  await expect(page.getByText('已完成 0/15 题')).toBeVisible();
  await expect(page.getByRole('button', { name: /提示|重试/ })).toHaveCount(0);
  await expect(page.getByText('解题说明')).toHaveCount(0);

  await submitCurrentAnswer(page);
  await expect(page.getByText('已完成 1/15 题')).toBeVisible();
  const nextPrompt = await questionHeading.textContent();

  await page.reload();

  await expect(page.getByText('已恢复上次保存的进度')).toBeVisible();
  await expect(page.locator('.challenge-activity h2')).toHaveText(nextPrompt ?? '');
  await expect(page.getByText('已完成 1/15 题')).toBeVisible();
  expect(await page.evaluate(() => localStorage.getItem('china-study-progress-v1'))).toBe(learningProgressBefore);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);

  for (let completed = 1; completed < 15; completed += 1) {
    await submitCurrentAnswer(page);
    if (completed < 14) await expect(page.getByText(`已完成 ${completed + 1}/15 题`)).toBeVisible();
  }

  await expect(page.getByText('本次答案回顾')).toBeVisible();
  await expect(page.locator('.challenge-result-score')).toHaveText(/\d+ 分/);
  await expect(page.getByLabel('本次闯关结果')).toContainText(/\d+\/15 题答对/);
  await expect(page.getByLabel('本次闯关结果')).toContainText(/\d+ 颗星/);

  await page.reload();
  await expect(page.getByText(/最好成绩 \d+\/15 · 已完成 1 次/)).toBeVisible();
  await expect(page.getByText('本次答案回顾')).toHaveCount(0);
  expect(await page.evaluate(() => localStorage.getItem('china-study-progress-v1'))).toBe(learningProgressBefore);
});

test('starts and restores a submitted answer in the chapter-ordered semester pilot', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(semesterTaskUrl);

  await expect(page.getByRole('heading', { name: '基础闯关 1' })).toBeVisible();
  await expect(page.getByText('25 道题 · 不限时 · 首次提交后不能修改答案')).toBeVisible();
  const learningProgressBefore = await page.evaluate(() => localStorage.getItem('china-study-progress-v1'));
  await page.getByRole('button', { name: '开始挑战' }).click();
  await expect(page.locator('.challenge-activity h2')).toBeVisible();
  await submitCurrentAnswer(page);
  await expect(page.getByText('已完成 1/25 题')).toBeVisible();
  const nextPrompt = await page.locator('.challenge-activity h2').textContent();

  await page.reload();

  await expect(page.getByText('已恢复上次保存的进度')).toBeVisible();
  await expect(page.locator('.challenge-activity h2')).toHaveText(nextPrompt ?? '');
  await expect(page.getByText('已完成 1/25 题')).toBeVisible();
  expect(await page.evaluate(() => localStorage.getItem('china-study-progress-v1'))).toBe(learningProgressBefore);
});

test('waits for the active challenge writer and takes over after that page closes', async ({ page, context }) => {
  await page.goto(taskUrl);
  await page.getByRole('button', { name: '开始挑战' }).click();
  const firstPageQuestion = page.locator('.challenge-activity h2');
  await expect(firstPageQuestion).toBeVisible();
  const prompt = await firstPageQuestion.textContent();

  const secondPage = await context.newPage();
  await secondPage.goto(taskUrl);
  await expect(secondPage.getByRole('heading', { name: '这次挑战正在另一个页面进行' })).toBeVisible();

  await page.close();
  await expect(secondPage.locator('.challenge-activity h2')).toHaveText(prompt ?? '');
  await expect(secondPage.getByText('已恢复上次保存的进度')).toBeVisible();
});
