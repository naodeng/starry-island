import { describe, expect, it } from 'vitest';
import type { ChallengeBackupData } from './backup';
import { createChallengeBackup, verifyChallengeBackup } from './backup';
import type { TaskProgress } from './types';

const emptyData: ChallengeBackupData = {
  attempts: [],
  taskProgress: [],
  recentQuestionAttempts: [],
  wrongQuestions: [],
};

describe('challenge backup checksum', () => {
  it('creates a versioned local backup with a SHA-256 checksum', async () => {
    const backup = await createChallengeBackup(emptyData, '2026-10-22T00:00:00.000Z');

    expect(backup).toMatchObject({
      format: 'starry-island-challenge-backup',
      version: 1,
      createdAt: '2026-10-22T00:00:00.000Z',
      integrity: { algorithm: 'SHA-256' },
      data: emptyData,
    });
    expect(backup.integrity.digest).toMatch(/^[a-f0-9]{64}$/);
    await expect(verifyChallengeBackup(backup)).resolves.toBe(true);
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
    const first = await createChallengeBackup({ ...emptyData, taskProgress: [progress] }, '2026-10-22T00:00:00.000Z');
    const second = await createChallengeBackup({ ...emptyData, taskProgress: [reordered] }, '2026-10-22T00:00:00.000Z');
    const changed = { ...first, data: { ...first.data, recentQuestionAttempts: [['new-question']] } };

    expect(first.integrity.digest).toBe(second.integrity.digest);
    await expect(verifyChallengeBackup(changed)).resolves.toBe(false);
  });

  it('rejects unsupported versions and malformed backup shapes', async () => {
    const backup = await createChallengeBackup(emptyData, '2026-10-22T00:00:00.000Z');

    await expect(verifyChallengeBackup({ ...backup, version: 2 })).resolves.toBe(false);
    await expect(verifyChallengeBackup({ ...backup, data: { ...emptyData, attempts: null } })).resolves.toBe(false);
  });
});
