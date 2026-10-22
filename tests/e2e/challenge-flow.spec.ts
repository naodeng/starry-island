import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { expect, test } from '@playwright/test';

const taskId = 'grade-2-term-1-math-unit-02/basic-01';
const taskUrl = `/challenges/task/${encodeURIComponent(taskId)}`;
const semesterTaskId = 'grade-2-term-1-math-first-half/basic-01';
const semesterTaskUrl = `/challenges/task/${encodeURIComponent(semesterTaskId)}`;

test('opens the Grade 5 Chinese pilot with matching subject routes and preserves learning progress', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ colorScheme: 'dark', reducedMotion: 'reduce' });
  await page.goto('/challenges');
  await expect(page.getByRole('heading', { name: '闯关中心' })).toBeVisible();
  const learningProgressBefore = await page.evaluate(() => localStorage.getItem('china-study-progress-v1'));
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);

  const mathGroup = page.locator('.challenge-group-card').filter({ hasText: '二年级上册数学 · 第二单元' });
  const englishGroup = page.locator('.challenge-group-card').filter({ hasText: '三年级上册英语 · 第一单元' });
  const chineseGroup = page.locator('.challenge-group-card').filter({ hasText: '五年级上册语文 · 第一单元' });

  await expect(mathGroup).toContainText('练习两位数加减法、进位退位和数量关系。');
  await expect(englishGroup).toContainText('练习本单元的自我介绍、年龄和班级表达。');
  await expect(chineseGroup).toContainText('阅读本单元课文，练习文本线索、表达方法与习作。');
  await expect(englishGroup).not.toContainText('练习两位数加减法、进位退位和数量关系。');
  await expect(chineseGroup).not.toContainText('练习两位数加减法、进位退位和数量关系。');

  await chineseGroup.getByRole('button', { name: '查看挑战任务' }).click();
  await expect(page).toHaveURL('/challenges/group/grade-5-term-1-chinese-unit-01');
  await expect(page.getByRole('heading', { name: '五年级上册语文 · 第一单元' })).toBeVisible();
  const startButtons = page.getByRole('button', { name: '开始挑战' });
  await expect(startButtons).toHaveCount(5);
  await startButtons.first().click();
  await expect(page).toHaveURL(/\/challenges\/task\/grade-5-term-1-chinese-unit-01%2Fbasic-01$/);
  await page.getByRole('button', { name: '开始挑战' }).click();
  await expect(page.locator('.challenge-activity h2')).toBeVisible();
  expect(await page.evaluate(() => localStorage.getItem('china-study-progress-v1'))).toBe(learningProgressBefore);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});

function stableSerialize(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(stableSerialize).join(',')}]`;
  if (typeof value === 'object' && value !== null) {
    const record = value as Record<string, unknown>;
    return `{${Object.keys(record).filter((key) => record[key] !== undefined).sort().map((key) => `${JSON.stringify(key)}:${stableSerialize(record[key])}`).join(',')}}`;
  }
  return JSON.stringify(value) ?? 'null';
}

test('keeps growth statistics readable in both themes', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });

  for (const theme of ['light', 'dark'] as const) {
    await page.emulateMedia({ colorScheme: theme, reducedMotion: theme === 'dark' ? 'reduce' : 'no-preference' });
    await page.goto('/challenges/growth');
    await expect(page.getByRole('heading', { name: '闯关成长记录' })).toBeVisible();
    await expect(page).toHaveTitle('闯关成长记录 | 星岛学园');
    await expect.poll(() => page.evaluate(() => document.documentElement.dataset.theme)).toBe(theme);

    const textContrasts = await page.locator('.challenge-growth-metric, .challenge-growth-route').evaluateAll((cards) => {
      const luminance = (color: string) => {
        const channels = (color.match(/[\d.]+/g) ?? []).slice(0, 3).map(Number).map((channel) => {
          const normalized = channel / 255;
          return normalized <= 0.04045 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
        });
        return channels[0]! * 0.2126 + channels[1]! * 0.7152 + channels[2]! * 0.0722;
      };
      return cards.flatMap((card) => {
        const background = luminance(getComputedStyle(card).backgroundColor);
        return Array.from(card.querySelectorAll('p, strong, h3')).map((text) => {
          const foreground = luminance(getComputedStyle(text).color);
          return (Math.max(background, foreground) + 0.05) / (Math.min(background, foreground) + 0.05);
        });
      });
    });

    expect(textContrasts.every((contrast) => contrast >= 4.5), `${theme} card contrast ratios: ${textContrasts.join(', ')}`).toBe(true);

    await page.setViewportSize({ width: 390, height: 844 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await page.keyboard.press('Tab');
    const backButton = page.getByRole('button', { name: '返回闯关中心' });
    expect(await backButton.evaluate((element) => document.activeElement === element && element.matches(':focus-visible'))).toBe(true);
    if (theme === 'dark') {
      expect(await backButton.evaluate((element) => Number.parseFloat(getComputedStyle(element).transitionDuration))).toBeLessThan(0.001);
    }
    await page.setViewportSize({ width: 1280, height: 900 });
  }
});

test('downloads a versioned local backup with a valid checksum', async ({ page }) => {
  await page.goto('/challenges');
  await expect(page.getByRole('heading', { name: '闯关中心' })).toBeVisible();
  const learningProgressBefore = await page.evaluate(() => localStorage.getItem('china-study-progress-v1'));
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: '导出闯关备份' }).click();
  const download = await downloadPromise;
  const downloadedPath = await download.path();
  expect(download.suggestedFilename()).toMatch(/^starry-island-challenges-.+\.json$/);
  expect(downloadedPath).toBeTruthy();
  const backup = JSON.parse(readFileSync(downloadedPath!, 'utf8')) as Record<string, unknown>;
  const integrity = backup.integrity as { algorithm: string; digest: string };
  const { integrity: _integrity, ...payload } = backup;

  expect(backup).toMatchObject({
    format: 'starry-island-challenge-backup',
    version: 1,
    data: { attempts: [], taskProgress: [], recentQuestionAttempts: [], wrongQuestions: [] },
  });
  expect(integrity.algorithm).toBe('SHA-256');
  expect(integrity.digest).toBe(createHash('sha256').update(stableSerialize(payload)).digest('hex'));
  await expect(page.getByRole('status')).toHaveText('闯关备份已生成并下载到此设备。');
  expect(await page.evaluate(() => localStorage.getItem('china-study-progress-v1'))).toBe(learningProgressBefore);
});

test('ports theme and speech preferences only after explicit opt-in', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'reduce' });
  await page.addInitScript(() => {
    localStorage.setItem('china-study-theme-v1', 'light');
    localStorage.setItem('china-study-sound-enabled-v1', 'true');
  });
  await page.goto('/challenges');
  await expect(page.getByRole('heading', { name: '闯关中心' })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.setViewportSize({ width: 390, height: 844 });
  const learningProgressBefore = await page.evaluate(() => localStorage.getItem('china-study-progress-v1'));
  const exportPreferences = page.getByRole('checkbox', { name: '备份同时携带主题和语音偏好' });
  await expect(exportPreferences).not.toBeChecked();

  const withoutPreferencesPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: '导出闯关备份' }).click();
  const withoutPreferences = await withoutPreferencesPromise;
  const withoutPreferencesPath = await withoutPreferences.path();
  expect(withoutPreferencesPath).toBeTruthy();
  expect(JSON.parse(readFileSync(withoutPreferencesPath!, 'utf8'))).not.toHaveProperty('preferences');

  await exportPreferences.focus();
  await page.keyboard.press('Space');
  await expect(exportPreferences).toBeChecked();
  const withPreferencesPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: '导出闯关备份' }).click();
  const withPreferences = await withPreferencesPromise;
  const withPreferencesPath = await withPreferences.path();
  expect(withPreferencesPath).toBeTruthy();
  const exportedBackup = JSON.parse(readFileSync(withPreferencesPath!, 'utf8')) as Record<string, unknown>;
  const exportedIntegrity = exportedBackup.integrity as { digest: string };
  const { integrity: _exportedIntegrity, ...exportedPayload } = exportedBackup;
  expect(exportedBackup.preferences).toEqual({ theme: 'light', soundEnabled: true });
  expect(exportedIntegrity.digest).toBe(createHash('sha256').update(stableSerialize(exportedPayload)).digest('hex'));

  const payload = {
    format: 'starry-island-challenge-backup',
    version: 1,
    createdAt: '2026-10-22T00:00:00.000Z',
    data: { attempts: [], taskProgress: [], recentQuestionAttempts: [], wrongQuestions: [] },
    preferences: { theme: 'dark', soundEnabled: false },
  };
  const backup = {
    ...payload,
    integrity: { algorithm: 'SHA-256', digest: createHash('sha256').update(stableSerialize(payload)).digest('hex') },
  };
  const backupPath = testInfo.outputPath('preferences-backup.json');
  writeFileSync(backupPath, JSON.stringify(backup));
  const backupInput = page.locator('input[type="file"]');
  await backupInput.setInputFiles(backupPath);
  const preview = page.getByRole('group', { name: '导入预览' });
  await expect(preview).toContainText('备份设置：主题为深色，语音已关闭。');
  const applyPreferences = page.getByRole('checkbox', { name: '应用备份中的主题和语音偏好' });
  await expect(applyPreferences).not.toBeChecked();
  await page.getByRole('button', { name: '确认安全合并' }).click();
  await expect(page.getByRole('status').filter({ hasText: '闯关备份已安全合并到此设备' })).toBeVisible();
  await expect.poll(() => page.evaluate(() => [
    localStorage.getItem('china-study-theme-v1'),
    localStorage.getItem('china-study-sound-enabled-v1'),
  ])).toEqual(['light', 'true']);

  await backupInput.setInputFiles(backupPath);
  const secondPreview = page.getByRole('group', { name: '导入预览' });
  const applyImportedPreferences = page.getByRole('checkbox', { name: '应用备份中的主题和语音偏好' });
  await expect(applyImportedPreferences).not.toBeChecked();
  await applyImportedPreferences.focus();
  await page.keyboard.press('Space');
  await expect(applyImportedPreferences).toBeChecked();
  await page.evaluate(() => new Promise<void>((resolve, reject) => {
    const request = indexedDB.open('starry-island-challenges');
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const database = request.result;
      const transaction = database.transaction('taskProgress', 'readwrite');
      transaction.objectStore('taskProgress').put({
        taskId: 'concurrent-preview-change',
        bestCorrect: 1,
        bestTotal: 1,
        latestCorrect: 0,
        latestTotal: 1,
        completedCount: 1,
        everPassed: true,
        updatedAt: '2026-10-22T00:00:00.000Z',
        revision: 1,
      });
      transaction.oncomplete = () => {
        database.close();
        resolve();
      };
      transaction.onerror = () => reject(transaction.error);
    };
  }));
  await page.getByRole('button', { name: '确认安全合并' }).click();
  await expect(page.getByRole('alert')).toHaveText('预览后本机记录发生变化，请重新选择文件并查看最新预览。');
  await expect.poll(() => page.evaluate(() => [
    localStorage.getItem('china-study-theme-v1'),
    localStorage.getItem('china-study-sound-enabled-v1'),
  ])).toEqual(['light', 'true']);

  await backupInput.setInputFiles(backupPath);
  const confirmedPreview = page.getByRole('group', { name: '导入预览' });
  await expect(confirmedPreview).toContainText('新增成绩 0 项，合并成绩 0 项');
  const confirmedApplyPreferences = page.getByRole('checkbox', { name: '应用备份中的主题和语音偏好' });
  await expect(confirmedApplyPreferences).not.toBeChecked();
  await confirmedApplyPreferences.focus();
  await page.keyboard.press('Space');
  await expect(confirmedApplyPreferences).toBeChecked();
  await page.getByRole('button', { name: '确认安全合并' }).click();
  await expect(page.getByRole('status').filter({ hasText: '闯关备份已安全合并到此设备' })).toBeVisible();
  await expect.poll(() => page.evaluate(() => [
    localStorage.getItem('china-study-theme-v1'),
    localStorage.getItem('china-study-sound-enabled-v1'),
    document.documentElement.dataset.theme,
  ])).toEqual(['dark', 'false', 'dark']);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  expect(await page.evaluate(() => localStorage.getItem('china-study-progress-v1'))).toBe(learningProgressBefore);
  await expect(secondPreview).not.toBeAttached();
});

test('downloads a user-requested diagnostics report containing only allowlisted fields', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ colorScheme: 'dark', reducedMotion: 'reduce' });
  await page.goto('/challenges');
  await expect(page.getByRole('heading', { name: '闯关中心' })).toBeVisible();
  const learningProgressBefore = await page.evaluate(() => localStorage.getItem('china-study-progress-v1'));
  await expect(page.getByText(/只有点击后才会生成并下载；不会自动上传。/)).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);

  const downloadPromise = page.waitForEvent('download');
  const diagnosticsButton = page.getByRole('button', { name: '手动导出脱敏诊断信息' });
  await diagnosticsButton.focus();
  expect(await diagnosticsButton.evaluate((button) => document.activeElement === button)).toBe(true);
  await page.keyboard.press('Enter');
  const download = await downloadPromise;
  const downloadedPath = await download.path();
  expect(download.suggestedFilename()).toMatch(/^starry-island-diagnostics-.+\.json$/);
  expect(downloadedPath).toBeTruthy();
  const report = JSON.parse(readFileSync(downloadedPath!, 'utf8')) as Record<string, unknown>;
  expect(Object.keys(report)).toEqual(['format', 'version', 'generatedAt', 'appVersion', 'storage', 'capabilities']);
  expect(report).toMatchObject({
    format: 'starry-island-challenge-diagnostics',
    version: 1,
    storage: {
      schemaVersion: 4,
      recordCounts: { activeAttempts: 0, taskProgress: 0, recentCompletionGroups: 0, wrongQuestions: 0 },
    },
  });
  expect(String(report.appVersion)).toMatch(/^[\da-z.+_-]{1,40}$/i);
  expect(Number.isFinite(Date.parse(String(report.generatedAt)))).toBe(true);
  expect(Object.keys(report.capabilities as object)).toEqual(['indexedDB', 'webLocks']);
  expect(JSON.stringify(report)).not.toMatch(/student|questionId|prompt|answer|userAgent|china-study-progress-v1/i);
  await expect(page.getByRole('status')).toHaveText('诊断信息已生成并下载到此设备；没有上传任何数据。');
  expect(await page.evaluate(() => localStorage.getItem('china-study-progress-v1'))).toBe(learningProgressBefore);
});

test('isolates malformed local records and exports them only after an explicit action', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ colorScheme: 'dark', reducedMotion: 'reduce' });
  await page.goto('/');
  await page.evaluate(() => new Promise<void>((resolve, reject) => {
    const open = indexedDB.open('starry-island-challenges', 2);
    open.onerror = () => reject(open.error);
    open.onupgradeneeded = () => {
      open.result.createObjectStore('attempts', { keyPath: 'taskId' });
      open.result.createObjectStore('taskProgress', { keyPath: 'taskId' });
      open.result.createObjectStore('challengeMeta', { keyPath: 'key' });
      open.result.createObjectStore('wrongQuestions', { keyPath: 'questionId' });
    };
    open.onsuccess = () => {
      const database = open.result;
      const transaction = database.transaction('taskProgress', 'readwrite');
      transaction.objectStore('taskProgress').put({ taskId: 'damaged-progress', bestCorrect: 'invalid' });
      transaction.oncomplete = () => {
        database.close();
        resolve();
      };
      transaction.onerror = () => reject(transaction.error);
    };
  }));

  await page.goto('/challenges');
  await expect(page.getByRole('heading', { name: '闯关中心' })).toBeVisible();
  await expect(page.getByText(/发现 1 条结构异常的闯关记录/)).toBeVisible();
  await expect(page.getByText(/文件可能包含题目和作答内容/)).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  expect(await page.evaluate(() => document.documentElement.dataset.theme)).toBe('dark');
  const contrastRatios = await page.locator('#challenge-quarantine-heading').evaluate((heading) => {
    const card = heading.closest<HTMLElement>('.challenge-recovery-point');
    const detail = card?.querySelector('p');
    if (!card || !detail) return [];
    const luminance = (color: string) => {
      const [red, green, blue] = (color.match(/[\d.]+/g) ?? []).slice(0, 3).map(Number).map((channel) => {
        const normalized = channel / 255;
        return normalized <= 0.04045 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
      });
      return red! * 0.2126 + green! * 0.7152 + blue! * 0.0722;
    };
    const background = luminance(getComputedStyle(card).backgroundColor);
    return [heading, detail].map((element) => {
      const foreground = luminance(getComputedStyle(element).color);
      return (Math.max(background, foreground) + 0.05) / (Math.min(background, foreground) + 0.05);
    });
  });
  expect(contrastRatios).toHaveLength(2);
  expect(contrastRatios.every((contrast) => contrast >= 4.5)).toBe(true);

  const exportButton = page.getByRole('button', { name: '导出隔离记录' });
  await exportButton.focus();
  expect(await exportButton.evaluate((button) => document.activeElement === button)).toBe(true);
  const downloadPromise = page.waitForEvent('download');
  await page.keyboard.press('Enter');
  const download = await downloadPromise;
  const downloadedPath = await download.path();
  expect(download.suggestedFilename()).toMatch(/^starry-island-quarantined-data-.+\.json$/);
  expect(downloadedPath).toBeTruthy();
  expect(JSON.parse(readFileSync(downloadedPath!, 'utf8'))).toMatchObject({
    format: 'starry-island-challenge-quarantine',
    version: 1,
    records: [{ sourceStore: 'taskProgress', record: { taskId: 'damaged-progress', bestCorrect: 'invalid' } }],
  });
  await expect(page.getByRole('status')).toContainText('没有上传任何数据');
});

test('previews and safely merges an active attempt without duplicating data', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'reduce' });
  await page.goto('/challenges');
  await expect(page.getByRole('heading', { name: '闯关中心' })).toBeVisible();
  const learningProgressBefore = await page.evaluate(() => localStorage.getItem('china-study-progress-v1'));
  const question = {
    questionId: 'backup-question',
    activityId: 'backup-activity',
    difficulty: 'basic',
    knowledgePointIds: ['addition'],
    lifecycle: 'active',
    approved: true,
    answerLeakageReviewed: true,
    approvedContentFingerprint: 'approved',
    contentFingerprint: 'current',
    activity: {
      id: 'backup-activity', kind: 'arithmetic', prompt: '1 + 1', hint: '数一数',
      explanation: '1 加 1 等于 2。', expression: '1 + 1', correctAnswer: 2,
    },
  };
  const data = {
    attempts: [{
      attemptId: 'backup-attempt', taskId, difficulty: 'basic', status: 'in-progress', questions: [question],
      assemblySeed: 'seed', contentManifestVersion: 'v1', answers: {}, currentIndex: 0,
      startedAt: '2026-10-22T00:00:00.000Z', elapsedMs: 1000, revision: 0,
    }],
    taskProgress: [{
      taskId, bestCorrect: 1, bestTotal: 1, latestCorrect: 0, latestTotal: 1,
      completedCount: 1, everPassed: true, updatedAt: '2026-10-22T00:00:00.000Z', revision: 1,
    }],
    recentQuestionAttempts: [['backup-question']],
    wrongQuestions: [{
      questionId: 'backup-question', question, wrongCount: 2,
      lastWrongAt: '2026-10-21T00:00:00.000Z', correctAttemptStreak: 0,
    }],
  };
  const payload = {
    format: 'starry-island-challenge-backup',
    version: 1,
    createdAt: '2026-10-22T00:00:00.000Z',
    data,
  };
  const backup = {
    ...payload,
    integrity: { algorithm: 'SHA-256', digest: createHash('sha256').update(stableSerialize(payload)).digest('hex') },
  };
  const backupPath = testInfo.outputPath('challenge-import.json');
  writeFileSync(backupPath, JSON.stringify(backup));

  const backupTrigger = page.getByRole('button', { name: '选择闯关备份文件' });
  const backupInput = page.locator('input[type="file"]');
  await backupTrigger.focus();
  expect(await backupTrigger.evaluate((button) => document.activeElement === button)).toBe(true);
  expect(await backupTrigger.evaluate((button) => getComputedStyle(button).outlineStyle)).not.toBe('none');
  await backupInput.setInputFiles(backupPath);
  const preview = page.getByRole('group', { name: '导入预览' });
  await expect(preview).toContainText('新增进行中答题 1 项，保留本机冲突答题 0 项');
  await expect(preview).toContainText('新增成绩 1 项，合并成绩 0 项');
  await expect(preview).toContainText('重复成绩与错题次数不会相加。');
  await page.getByRole('button', { name: '确认安全合并' }).click();

  await expect(page.getByRole('status').filter({ hasText: '闯关备份已安全合并到此设备' }))
    .toHaveText('闯关备份已安全合并到此设备；课程进度没有改变。');
  expect(await page.evaluate(() => localStorage.getItem('china-study-progress-v1'))).toBe(learningProgressBefore);

  await backupInput.setInputFiles(backupPath);
  await expect(page.getByRole('group', { name: '导入预览' })).toContainText('保留本机冲突答题 1 项，进行中任务成绩暂缓合并 1 项');
  await page.getByRole('button', { name: '确认安全合并' }).click();
  await expect(page.getByRole('status').filter({ hasText: '闯关备份已安全合并到此设备' }))
    .toHaveText('闯关备份已安全合并到此设备；课程进度没有改变。');

  const stored = await page.evaluate(async (taskIdToRead) => new Promise((resolve, reject) => {
    const open = indexedDB.open('starry-island-challenges');
    open.onerror = () => reject(open.error);
    open.onsuccess = () => {
      const database = open.result;
      const transaction = database.transaction(['attempts', 'taskProgress', 'challengeMeta', 'wrongQuestions'], 'readonly');
      const attemptRequest = transaction.objectStore('attempts').get(taskIdToRead);
      const progressRequest = transaction.objectStore('taskProgress').get(taskIdToRead);
      const recentRequest = transaction.objectStore('challengeMeta').get('recent-question-ids');
      const wrongRequest = transaction.objectStore('wrongQuestions').get('backup-question');
      transaction.oncomplete = () => {
        resolve({
          attempt: attemptRequest.result,
          progress: progressRequest.result,
          recent: recentRequest.result,
          wrongQuestion: wrongRequest.result,
        });
        database.close();
      };
      transaction.onerror = () => reject(transaction.error);
    };
  }), taskId);
  expect(stored).toMatchObject({
    attempt: { attemptId: 'backup-attempt', currentIndex: 0, snapshotSchemaVersion: 1 },
    progress: { completedCount: 1, bestCorrect: 1 },
    recent: { attemptQuestionIds: [['backup-question']] },
    wrongQuestion: { wrongCount: 2 },
  });
  expect(await page.evaluate(() => localStorage.getItem('china-study-progress-v1'))).toBe(learningProgressBefore);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);

  const diagnosticsDownloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: '手动导出脱敏诊断信息' }).click();
  const diagnosticsDownload = await diagnosticsDownloadPromise;
  const diagnosticsPath = await diagnosticsDownload.path();
  expect(diagnosticsPath).toBeTruthy();
  const report = JSON.parse(readFileSync(diagnosticsPath!, 'utf8')) as Record<string, unknown>;
  const storage = report.storage as { recordCounts: Record<string, number> };
  expect(storage.recordCounts).toEqual({
    activeAttempts: 1,
    taskProgress: 1,
    recentCompletionGroups: 1,
    wrongQuestions: 1,
  });
  expect(JSON.stringify(report)).not.toContain('backup-question');
  expect(JSON.stringify(report)).not.toContain('1 + 1');
});

test('opens the local wrong-question notebook from the challenge center', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'no-preference' });
  await page.goto('/challenges');
  await expect.poll(() => page.evaluate(() => document.documentElement.dataset.theme)).toBe('light');
  await expect(page.getByRole('heading', { name: '闯关中心' })).toBeVisible();
  await page.getByRole('button', { name: '打开错题本' }).click();

  await expect(page.getByRole('heading', { name: '错题本' })).toBeVisible();
  await expect(page.getByRole('status')).toHaveText('完成挑战后，答错的题会出现在这里。');
  await expect(page.getByRole('button', { name: '返回闯关中心' })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);

  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ colorScheme: 'dark', reducedMotion: 'reduce' });
  await expect.poll(() => page.evaluate(() => document.documentElement.dataset.theme)).toBe('dark');
  await page.reload();
  await expect(page.getByRole('heading', { name: '错题本' })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);

  const backButton = page.getByRole('button', { name: '返回闯关中心' });
  await backButton.focus();
  await page.keyboard.press('Tab');
  const allFilter = page.getByRole('button', { name: '全部' });
  expect(await allFilter.evaluate((element) => document.activeElement === element && element.matches(':focus-visible'))).toBe(true);
  expect(await allFilter.evaluate((element) => Number.parseFloat(getComputedStyle(element).transitionDuration))).toBeLessThan(0.001);

  await page.setViewportSize({ width: 1280, height: 900 });
  await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'no-preference' });
  await expect.poll(() => page.evaluate(() => document.documentElement.dataset.theme)).toBe('light');
  await page.reload();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});

test('opens the Grade 3 English Unit 1 pilot without changing course progress', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ colorScheme: 'dark', reducedMotion: 'reduce' });
  await page.goto('/challenges');
  await expect(page.getByRole('heading', { name: '闯关中心' })).toBeVisible();
  await expect(page.getByRole('heading', { name: '三年级上册英语 · 第一单元' })).toBeVisible();
  const learningProgressBefore = await page.evaluate(() => localStorage.getItem('china-study-progress-v1'));
  const englishCard = page.locator('.challenge-group-card').filter({
    has: page.getByRole('heading', { name: '三年级上册英语 · 第一单元' }),
  });

  await englishCard.getByRole('button', { name: '查看挑战任务' }).click();
  await expect(page).toHaveURL('/challenges/group/grade-3-term-1-english-unit-01');
  await expect(page.getByRole('heading', { name: '三年级上册英语 · 第一单元' })).toBeVisible();
  await expect(page.getByRole('button', { name: '开始挑战' })).toHaveCount(5);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);

  await page.getByRole('button', { name: '开始挑战' }).first().click();
  await expect(page).toHaveURL(/\/challenges\/task\/grade-3-term-1-english-unit-01%2Fbasic-01$/);
  await page.getByRole('button', { name: '开始挑战' }).click();
  await expect(page.locator('.challenge-activity h2')).toBeVisible();
  expect(await page.evaluate(() => localStorage.getItem('china-study-progress-v1'))).toBe(learningProgressBefore);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});

test('clears and restores an in-progress challenge through the 24-hour recovery point', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ colorScheme: 'dark', reducedMotion: 'reduce' });
  await page.goto(taskUrl);
  const learningProgressBefore = await page.evaluate(() => localStorage.getItem('china-study-progress-v1'));
  await page.getByRole('button', { name: '开始挑战' }).click();
  await expect(page.getByText('已完成 0/15 题')).toBeVisible();

  await page.goto('/challenges');
  await expect(page.getByRole('heading', { name: '数据管理与恢复' })).toBeVisible();
  await page.getByRole('button', { name: '清除全部闯关数据' }).click();
  const confirmation = page.getByRole('group', { name: '清除确认' });
  await expect(confirmation).toBeVisible();
  const phrase = confirmation.getByRole('textbox', { name: '输入“清空闯关数据”以确认' });
  await phrase.fill('清空闯关数据');
  await confirmation.getByRole('button', { name: '确认清除全部闯关数据' }).click();
  await expect(page.getByRole('status').filter({ hasText: '已创建 24 小时恢复点' })).toBeVisible();

  const afterClear = await page.evaluate(async (taskIdToRead) => new Promise<{ attempt: unknown; recoveryPoint: unknown }>((resolve, reject) => {
    const open = indexedDB.open('starry-island-challenges');
    open.onerror = () => reject(open.error);
    open.onsuccess = () => {
      const database = open.result;
      const transaction = database.transaction(['attempts', 'challengeMeta'], 'readonly');
      const attempt = transaction.objectStore('attempts').get(taskIdToRead);
      const recoveryPoint = transaction.objectStore('challengeMeta').get('recovery-point');
      transaction.oncomplete = () => {
        resolve({ attempt: attempt.result, recoveryPoint: recoveryPoint.result });
        database.close();
      };
      transaction.onerror = () => reject(transaction.error);
    };
  }), taskId);
  expect(afterClear.attempt).toBeUndefined();
  expect(afterClear.recoveryPoint).toMatchObject({
    format: 'starry-island-challenge-recovery',
    data: { attempts: [{ taskId }] },
  });

  await page.getByRole('button', { name: '恢复已清除的闯关记录' }).click();
  await page.getByRole('group', { name: '恢复确认' }).getByRole('button', { name: '确认恢复闯关记录' }).click();
  await expect(page.getByRole('status').filter({ hasText: '已恢复闯关记录' })).toBeVisible();

  const restoredAttempt = await page.evaluate(async (taskIdToRead) => new Promise<unknown>((resolve, reject) => {
    const open = indexedDB.open('starry-island-challenges');
    open.onerror = () => reject(open.error);
    open.onsuccess = () => {
      const database = open.result;
      const transaction = database.transaction(['attempts', 'challengeMeta'], 'readonly');
      const attempt = transaction.objectStore('attempts').get(taskIdToRead);
      const recoveryPoint = transaction.objectStore('challengeMeta').get('recovery-point');
      transaction.oncomplete = () => {
        resolve({ attempt: attempt.result, recoveryPoint: recoveryPoint.result });
        database.close();
      };
      transaction.onerror = () => reject(transaction.error);
    };
  }), taskId);
  expect(restoredAttempt).toMatchObject({
    attempt: { taskId, currentIndex: 0, revision: 0, answers: {} },
    recoveryPoint: undefined,
  });
  expect(await page.evaluate(() => localStorage.getItem('china-study-progress-v1'))).toBe(learningProgressBefore);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});

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
  await expect.poll(() => page.evaluate(() => document.documentElement.dataset.theme)).toBe('dark');
  expect(await page.evaluate(async () => ('serviceWorker' in navigator
    ? (await navigator.serviceWorker.getRegistrations()).length
    : 0))).toBe(0);

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
  await expect(page.getByRole('heading', { name: '可以再练一练' })).toBeVisible();
  await expect(page.locator('.challenge-result-score')).toHaveText(/\d+ 分/);
  await expect(page.getByLabel('本次闯关结果')).toContainText(/\d+\/15 题答对/);
  await expect(page.getByLabel('本次闯关结果')).toContainText(/\d+ 颗星/);

  await page.setViewportSize({ width: 1280, height: 900 });
  await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'no-preference' });
  await expect.poll(() => page.evaluate(() => document.documentElement.dataset.theme)).toBe('light');
  const taskRecordCard = page.locator('.challenge-result-summary > *');
  await expect.poll(() => taskRecordCard.evaluate((element) => getComputedStyle(element).color)).toBe('rgb(39, 51, 74)');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ colorScheme: 'dark', reducedMotion: 'reduce' });
  await expect.poll(() => page.evaluate(() => document.documentElement.dataset.theme)).toBe('dark');
  await expect.poll(() => taskRecordCard.evaluate((element) => getComputedStyle(element).color)).toBe('rgb(237, 243, 233)');

  const reviewTaskButton = page.getByRole('button', { name: /^复习：/ }).first();
  await expect(reviewTaskButton).toBeVisible();
  await page.keyboard.press('Tab');
  expect(await reviewTaskButton.evaluate((element) => document.activeElement === element && element.matches(':focus-visible'))).toBe(true);
  await reviewTaskButton.click();
  await expect(page).toHaveURL(/\/grade-2\/term-1\/math\/unit-02\/(basic|advanced|high)\/task-0[12]$/);
  await expect(page.locator('.unit-hero h1')).toBeVisible();
  expect(await page.evaluate(() => localStorage.getItem('china-study-progress-v1'))).toBe(learningProgressBefore);
  await page.goBack();
  await expect(page.getByText(/最好成绩 \d+\/15 · 已完成 1 次/)).toBeVisible();

  await page.reload();
  await expect(page.getByText(/最好成绩 \d+\/15 · 已完成 1 次/)).toBeVisible();
  await expect(page.getByText('本次答案回顾')).toHaveCount(0);
  expect(await page.evaluate(() => localStorage.getItem('china-study-progress-v1'))).toBe(learningProgressBefore);
});

test('completes a loaded challenge after the browser goes offline', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(taskUrl);
  await expect(page.getByRole('heading', { name: '基础闯关 1' })).toBeVisible();
  const learningProgressBefore = await page.evaluate(() => localStorage.getItem('china-study-progress-v1'));

  await page.context().setOffline(true);
  expect(await page.evaluate(() => navigator.onLine)).toBe(false);
  await page.getByRole('button', { name: '开始挑战' }).click();
  await expect(page.locator('.challenge-activity h2')).toBeVisible();

  for (let completed = 0; completed < 15; completed += 1) {
    await submitCurrentAnswer(page);
    if (completed < 14) await expect(page.getByText(`已完成 ${completed + 1}/15 题`)).toBeVisible();
  }

  await expect(page.getByText('本次答案回顾')).toBeVisible();
  await expect(page.getByLabel('本次闯关结果')).toContainText(/\d+\/15 题答对/);
  expect(await page.evaluate(() => localStorage.getItem('china-study-progress-v1'))).toBe(learningProgressBefore);
});

test('reads only the visible prompt with a local Chinese voice when requested', async ({ page }) => {
  await page.addInitScript(() => {
    const localVoice = { default: false, lang: 'zh-CN', localService: true, name: '本地中文语音', voiceURI: 'local-zh' };
    const audioPlays: string[] = [];
    class TestAudio {
      currentTime = 0;
      paused = true;
      volume = 1;
      preload = 'auto';
      constructor(public src: string) {}
      play() {
        this.paused = false;
        audioPlays.push(this.src);
        return Promise.resolve();
      }
      pause() { this.paused = true; }
    }
    class TestUtterance {
      lang = '';
      voice: typeof localVoice | null = null;
      constructor(public text: string) {}
    }
    Object.defineProperty(window, 'Audio', { configurable: true, value: TestAudio });
    Object.defineProperty(window, 'challengeAudioPlays', { configurable: true, value: audioPlays });
    Object.defineProperty(window, 'SpeechSynthesisUtterance', { configurable: true, value: TestUtterance });
    Object.defineProperty(window, 'speechSynthesis', {
      configurable: true,
      value: {
        getVoices: () => [
          { default: false, lang: 'zh-CN', localService: false, name: '远程中文语音', voiceURI: 'remote-zh' },
          { default: false, lang: 'en-US', localService: true, name: '本地英语语音', voiceURI: 'local-en' },
          localVoice,
        ],
        speak: (utterance: TestUtterance) => {
          (window as Window & { challengeSpeechCapture?: unknown }).challengeSpeechCapture = {
            text: utterance.text,
            lang: utterance.voice?.lang,
            localService: utterance.voice?.localService,
          };
        },
        cancel: () => undefined,
      },
    });
  });
  await page.goto(taskUrl);
  await page.getByRole('button', { name: '开始挑战' }).click();

  const prompt = page.locator('.challenge-activity h2');
  await expect(prompt).toBeVisible();
  const visiblePrompt = (await prompt.textContent())?.trim() ?? '';
  const audioPlaysBeforeRead = await page.evaluate(() => (window as Window & { challengeAudioPlays: string[] }).challengeAudioPlays.length);
  await page.getByRole('button', { name: '朗读题目' }).click();

  await expect(page.getByRole('status')).toHaveText('正在朗读题目。');
  expect(await page.evaluate(() => (window as Window & { challengeAudioPlays: string[] }).challengeAudioPlays.length)).toBe(audioPlaysBeforeRead);
  expect(await page.evaluate(() => (window as Window & { challengeSpeechCapture?: { text: string; lang: string; localService: boolean } }).challengeSpeechCapture)).toEqual({
    text: visiblePrompt,
    lang: 'zh-CN',
    localService: true,
  });
});

test('adapts prompt density to grade tiers while preserving theme and narrow-screen layout', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.emulateMedia({ colorScheme: 'dark', reducedMotion: 'reduce' });
  await page.goto(taskUrl);
  await page.getByRole('button', { name: '开始挑战' }).click();

  const activity = page.locator('.challenge-activity');
  await expect(activity).toHaveAttribute('data-grade-tier', 'low');
  const tierMetrics = await activity.evaluate(async (element) => {
    const prompt = element.querySelector('h2');
    if (!(prompt instanceof HTMLElement)) return null;
    const metrics: Record<string, { fontSize: number; gap: number; padding: number; color: string; background: string }> = {};
    for (const tier of ['low', 'middle', 'high']) {
      element.dataset.gradeTier = tier;
      await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
      const panelStyle = getComputedStyle(element);
      const promptStyle = getComputedStyle(prompt);
      metrics[tier] = {
        fontSize: Number.parseFloat(promptStyle.fontSize),
        gap: Number.parseFloat(panelStyle.rowGap),
        padding: Number.parseFloat(panelStyle.paddingTop),
        color: promptStyle.color,
        background: panelStyle.backgroundColor,
      };
    }
    element.dataset.gradeTier = 'low';
    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
    return metrics;
  });

  expect(tierMetrics).not.toBeNull();
  expect(tierMetrics!.low!.fontSize).toBeGreaterThan(tierMetrics!.middle!.fontSize);
  expect(tierMetrics!.middle!.fontSize).toBeGreaterThan(tierMetrics!.high!.fontSize);
  expect(tierMetrics!.low!.gap).toBeGreaterThan(tierMetrics!.middle!.gap);
  expect(tierMetrics!.middle!.gap).toBeGreaterThan(tierMetrics!.high!.gap);
  expect(tierMetrics!.low!.padding).toBeGreaterThan(tierMetrics!.middle!.padding);
  expect(tierMetrics!.middle!.padding).toBeGreaterThan(tierMetrics!.high!.padding);
  expect(new Set(Object.values(tierMetrics!).map(({ color }) => color)).size).toBe(1);
  expect(new Set(Object.values(tierMetrics!).map(({ background }) => background)).size).toBe(1);
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  expect(await page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches)).toBe(true);

  await page.setViewportSize({ width: 390, height: 844 });
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'reduce' });
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  expect(await page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches)).toBe(true);
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
