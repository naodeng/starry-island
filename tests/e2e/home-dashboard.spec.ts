import { expect, test } from './fixtures';
import { installAudioSpy } from './audioSpy';

test('showsTheFourHomeSectionsAndReturnsFocusAfterEscape', async ({ page }) => {
  await installAudioSpy(page);
  await page.goto('/');

  await expect(page.getByRole('heading', { name: '今天，想从哪里出发？' })).toBeVisible();
  expect(await page.locator('main h2').allTextContents()).toEqual([
    '继续学习',
    '当前进度',
    '最近学习记录',
    '闯关入口',
  ]);

  const trigger = page.getByRole('button', { name: '打开导航菜单' });
  await trigger.click();
  const drawer = page.getByRole('dialog', { name: '全局导航' });
  await expect(drawer.getByRole('navigation', { name: '主要页面' }).getByRole('button', { name: '首页' })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(drawer).toBeHidden();
  await expect(page.getByRole('button', { name: '打开导航菜单' })).toBeFocused();
});

test('continuesIntoARegisteredBasicSessionAndKeepsCourseRoutesAvailable', async ({ page }) => {
  await installAudioSpy(page);
  await page.goto('/');

  await page.getByRole('button', { name: '继续学习' }).click();
  await expect(page).toHaveURL(/\/grade-\d+\/term-[12]\/(chinese|math|english)\/unit-\d{2}\/basic\/task-\d{2}\/session-\d{2}$/);
  await expect(page.getByRole('region', { name: '挑战进度' })).toContainText('挑战 1 / 8');

  await page.goto('/courses');
  await expect(page.getByRole('button', { name: /进入单元/ }).first()).toBeVisible();
  await page.goto('/grade-2/term-1/chinese/unit-01');
  await expect(page.getByRole('heading', { name: '第一单元 · 大自然的秘密' })).toBeVisible();
});

test('keepsTheAppGatedWhenTheLocalChallengeMigrationFails', async ({ page }) => {
  await page.addInitScript(() => {
    const originalOpen = IDBFactory.prototype.open;
    IDBFactory.prototype.open = function open(name: string, version?: number) {
      if (name === 'starry-island-challenges') throw new DOMException('Injected storage failure', 'UnknownError');
      return version === undefined ? originalOpen.call(this, name) : originalOpen.call(this, name, version);
    };
  });
  await installAudioSpy(page);
  await page.goto('/');

  await expect(page.getByRole('alert')).toContainText('课程更新暂时没有完成');
  await expect(page.getByRole('alert')).toContainText('本机现有记录没有被整体清除');
  await expect(page.getByRole('button', { name: '重试更新' })).toBeEnabled();
  await expect(page.getByRole('button', { name: '继续学习' })).toHaveCount(0);
});

test('rendersTheHomeDashboardOnPhoneAndDesktopInBothThemesWithReducedMotion', async ({ page }) => {
  await installAudioSpy(page);
  await page.emulateMedia({ reducedMotion: 'reduce' });

  for (const viewport of [
    { width: 390, height: 844 },
    { width: 1280, height: 900 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto('/');
    await expect(page.getByRole('heading', { name: '今天，想从哪里出发？' })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(viewport.width);
    const shellBounds = await page.locator('.home-dashboard-shell').boundingBox();
    expect(shellBounds?.x).toBeGreaterThanOrEqual(viewport.width === 390 ? 12 : 0);

    for (const theme of ['light', 'dark']) {
      await page.evaluate((preference) => localStorage.setItem('china-study-theme-v1', preference), theme);
      await page.reload();
      await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
      await expect(page.getByRole('button', { name: '继续学习' })).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(viewport.width);
      const continueCopyContrast = await page.locator('.home-continue-copy').evaluate((copy) => {
        const panel = copy.closest('.home-continue-panel')!;
        const backgroundColor = getComputedStyle(panel).backgroundColor;
        const luminance = (color: string) => {
          const channels = (color.match(/[\d.]+/g) ?? []).slice(0, 3).map(Number).map((channel) => channel / 255);
          const [red, green, blue] = channels.map((channel) => channel <= 0.04045
            ? channel / 12.92
            : ((channel + 0.055) / 1.055) ** 2.4);
          return 0.2126 * red! + 0.7152 * green! + 0.0722 * blue!;
        };
        const background = luminance(backgroundColor);
        return Array.from(copy.querySelectorAll('h2, p')).map((element) => {
          const foreground = luminance(getComputedStyle(element).color);
          return (Math.max(foreground, background) + 0.05) / (Math.min(foreground, background) + 0.05);
        });
      });
      expect(continueCopyContrast.every((ratio) => ratio >= 4.5)).toBe(true);
    }
  }

  await page.getByRole('button', { name: '打开导航菜单' }).click();
  const drawer = page.getByRole('dialog', { name: '全局导航' });
  await expect(drawer).toBeVisible();
  expect(await drawer.evaluate((element) => getComputedStyle(element).animationName)).toBe('none');
});
