import { describe, expect, it } from 'vitest';
import type { ChallengeBackupData } from './backup';
import { createChallengeBackup, isChallengeBackupData, parseChallengeBackup, verifyChallengeBackup } from './backup';
import type { TaskProgress } from './types';

const emptyData: ChallengeBackupData = {
  attempts: [],
  taskProgress: [],
  recentQuestionAttempts: [],
  wrongQuestions: [],
};

describe('challenge backup checksum', () => {
  it('creates a versioned local backup with a SHA-256 checksum', async () => {
    const backup = await createChallengeBackup(emptyData, { createdAt: '2026-10-22T00:00:00.000Z' });

    expect(backup).toMatchObject({
      format: 'starry-island-challenge-backup',
      version: 1,
      createdAt: '2026-10-22T00:00:00.000Z',
      integrity: { algorithm: 'SHA-256' },
      data: emptyData,
    });
    expect(backup.integrity.digest).toMatch(/^[a-f0-9]{64}$/);
    await expect(verifyChallengeBackup(backup)).resolves.toBe(true);
    await expect(verifyChallengeBackup(backup, {} as Crypto)).resolves.toBe(false);
  });

  it('uses stable object-key ordering and detects changed backup data', async () => {
    const progress: TaskProgress = {
      taskId: 'task-1',
      bestCorrect: 12,
      bestTotal: 15,
      latestCorrect: 12,
      latestTotal: 15,
      completedCount: 1,
      everPassed: true,
      updatedAt: '2026-10-22T00:00:00.000Z',
      revision: 1,
    };
    const reordered = Object.fromEntries(Object.entries(progress).reverse()) as unknown as TaskProgress;
    const first = await createChallengeBackup({ ...emptyData, taskProgress: [progress] }, { createdAt: '2026-10-22T00:00:00.000Z' });
    const second = await createChallengeBackup({ ...emptyData, taskProgress: [reordered] }, { createdAt: '2026-10-22T00:00:00.000Z' });
    const changed = { ...first, data: { ...first.data, recentQuestionAttempts: [['new-question']] } };

    expect(first.integrity.digest).toBe(second.integrity.digest);
    await expect(verifyChallengeBackup(changed)).resolves.toBe(false);
  });

  it('rejects unsupported versions and malformed backup shapes', async () => {
    const backup = await createChallengeBackup(emptyData, { createdAt: '2026-10-22T00:00:00.000Z' });

    await expect(verifyChallengeBackup({ ...backup, version: 2 })).resolves.toBe(false);
    await expect(verifyChallengeBackup({ ...backup, data: { ...emptyData, attempts: null } })).resolves.toBe(false);
  });

  it('optionally includes portable preferences in the checksum while keeping old backups valid', async () => {
    const preferences = { theme: 'dark', soundEnabled: false } as const;
    const backup = await createChallengeBackup(emptyData, {
      createdAt: '2026-10-22T00:00:00.000Z',
      preferences,
    });

    expect(backup.preferences).toEqual(preferences);
    await expect(verifyChallengeBackup(backup)).resolves.toBe(true);
    await expect(parseChallengeBackup(backup)).resolves.toMatchObject({ preferences });

    const legacyBackup = await createChallengeBackup(emptyData, { createdAt: '2026-10-22T00:00:00.000Z' });
    expect(legacyBackup).not.toHaveProperty('preferences');
    await expect(parseChallengeBackup(legacyBackup)).resolves.toMatchObject({ data: emptyData });
  });

  it('rejects malformed optional preferences before importing a backup', async () => {
    const backup = await createChallengeBackup(emptyData, { createdAt: '2026-10-22T00:00:00.000Z' });

    await expect(verifyChallengeBackup({
      ...backup,
      preferences: { theme: 'neon', soundEnabled: 'off' },
    })).resolves.toBe(false);
  });

  it('rejects duplicate record keys and malformed answer snapshots before import', () => {
    const activity = {
      id: 'activity-1', kind: 'arithmetic', prompt: '1 + 1', hint: '数一数', explanation: '等于 2。',
      expression: '1 + 1', correctAnswer: 2,
    };
    const question = {
      questionId: 'question-1', activityId: 'activity-1', difficulty: 'basic', knowledgePointIds: ['addition'],
      lifecycle: 'active', approved: true, answerLeakageReviewed: true,
      approvedContentFingerprint: 'fingerprint', contentFingerprint: 'fingerprint', activity,
    };
    const attempt = {
      attemptId: 'attempt-1', taskId: 'task-1', difficulty: 'basic', status: 'in-progress',
      questions: [question], assemblySeed: 'seed', contentManifestVersion: 'v1', answers: {},
      currentIndex: 0, startedAt: '2026-01-01T00:00:00.000Z', elapsedMs: 0, revision: 0,
    };

    expect(isChallengeBackupData({ ...emptyData, attempts: [attempt] })).toBe(true);
    expect(isChallengeBackupData({ ...emptyData, attempts: [attempt, attempt] })).toBe(false);
    expect(isChallengeBackupData({ ...emptyData, attempts: [{ ...attempt, currentIndex: 1 }] })).toBe(false);
    expect(isChallengeBackupData({ ...emptyData, recentQuestionAttempts: [['same', 'same']] })).toBe(false);
  });
});
