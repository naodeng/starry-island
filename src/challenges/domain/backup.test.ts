import { describe, expect, it } from 'vitest';
import type { ChallengeBackupData } from './backup';
import {
  createChallengeBackup,
  isChallengeBackupData,
  normalizeImportedChallengeBackupData,
  parseChallengeBackup,
  verifyChallengeBackup,
} from './backup';
import type { ChallengeAttempt, TaskProgress } from './types';

const emptyData: ChallengeBackupData = {
  attempts: [],
  taskProgress: [],
  recentQuestionAttempts: [],
  wrongQuestions: [],
};

function makeAttempt(): ChallengeAttempt {
  const activity = {
    id: 'activity-legacy', kind: 'arithmetic' as const, prompt: '1 + 1', hint: '数一数', explanation: '等于 2。',
    expression: '1 + 1', correctAnswer: 2,
  };
  const question = {
    questionId: 'question-legacy', activityId: activity.id, difficulty: 'basic' as const,
    knowledgePointIds: ['addition'], lifecycle: 'active' as const, approved: true, answerLeakageReviewed: true,
    approvedContentFingerprint: 'fingerprint', contentFingerprint: 'fingerprint', activity,
  };
  return {
    attemptId: 'attempt-legacy', taskId: 'task-legacy', difficulty: 'basic', status: 'in-progress',
    snapshotSchemaVersion: 1, questions: [question], assemblySeed: 'legacy-seed', contentManifestVersion: 'manifest-v1',
    answers: { [question.questionId]: 2 }, currentIndex: 1, startedAt: '2026-01-01T00:00:00.000Z',
    elapsedMs: 1234, revision: 1,
  };
}

function stableSerialize(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(stableSerialize).join(',')}]`;
  if (typeof value === 'object' && value !== null) {
    const record = value as Record<string, unknown>;
    return `{${Object.keys(record).filter((key) => record[key] !== undefined).sort().map((key) => `${JSON.stringify(key)}:${stableSerialize(record[key])}`).join(',')}}`;
  }
  return JSON.stringify(value) ?? 'undefined';
}

async function signedBackup<TData>(data: TData) {
  const payload = {
    format: 'starry-island-challenge-backup' as const,
    version: 1 as const,
    createdAt: '2026-10-22T00:00:00.000Z',
    data,
  };
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(stableSerialize(payload)));
  return {
    ...payload,
    integrity: {
      algorithm: 'SHA-256' as const,
      digest: Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join(''),
    },
  };
}

describe('challenge backup checksum', () => {
  it('exports the current snapshot schema without changing the backup format version', async () => {
    const backup = await createChallengeBackup({ ...emptyData, attempts: [makeAttempt()] }, { createdAt: '2026-10-22T00:00:00.000Z' });

    expect(backup.version).toBe(1);
    expect(backup.data.attempts[0]?.snapshotSchemaVersion).toBe(1);
  });

  it('verifies a legacy in-progress snapshot before normalizing it to schema version 1', async () => {
    const { snapshotSchemaVersion: _version, ...legacyAttempt } = makeAttempt();
    const backup = await signedBackup({ ...emptyData, attempts: [legacyAttempt] });
    expect(isChallengeBackupData({ ...emptyData, attempts: [legacyAttempt] })).toBe(false);

    const parsed = await parseChallengeBackup(backup);
    const normalized = normalizeImportedChallengeBackupData(parsed.data);
    expect(normalized.attempts[0]).toMatchObject({
      snapshotSchemaVersion: 1,
      answers: makeAttempt().answers,
      questions: makeAttempt().questions,
      currentIndex: 1,
      revision: 1,
    });
    expect(isChallengeBackupData(normalized)).toBe(true);
  });

  it('rejects tampered legacy payloads and unknown snapshot schema versions', async () => {
    const { snapshotSchemaVersion: _version, ...legacyAttempt } = makeAttempt();
    const legacy = await signedBackup({ ...emptyData, attempts: [legacyAttempt] });
    const tampered = {
      ...legacy,
      data: { ...legacy.data, attempts: [{ ...legacyAttempt, answers: { 'question-legacy': 3 } }] },
    };
    await expect(parseChallengeBackup(tampered)).rejects.toThrow('完整性校验失败');

    const future = await signedBackup({
      ...emptyData,
      attempts: [{ ...legacyAttempt, snapshotSchemaVersion: 99 }],
    });
    await expect(parseChallengeBackup(future)).rejects.toThrow('备份文件格式或数据结构无效');
  });

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
      questions: [question], assemblySeed: 'seed', contentManifestVersion: 'v1', snapshotSchemaVersion: 1, answers: {},
      currentIndex: 0, startedAt: '2026-01-01T00:00:00.000Z', elapsedMs: 0, revision: 0,
    };

    expect(isChallengeBackupData({ ...emptyData, attempts: [attempt] })).toBe(true);
    expect(isChallengeBackupData({ ...emptyData, attempts: [attempt, attempt] })).toBe(false);
    expect(isChallengeBackupData({ ...emptyData, attempts: [{ ...attempt, currentIndex: 1 }] })).toBe(false);
    expect(isChallengeBackupData({ ...emptyData, recentQuestionAttempts: [['same', 'same']] })).toBe(false);
  });
});
