import type { ChallengeAttempt, TaskProgress, WrongQuestionRecord } from './types';

export interface ChallengeBackupData {
  attempts: ChallengeAttempt[];
  taskProgress: TaskProgress[];
  recentQuestionAttempts: string[][];
  wrongQuestions: WrongQuestionRecord[];
}

export interface ChallengeBackup {
  format: 'starry-island-challenge-backup';
  version: 1;
  createdAt: string;
  data: ChallengeBackupData;
  integrity: {
    algorithm: 'SHA-256';
    digest: string;
  };
}

type CryptoProvider = Pick<Crypto, 'subtle'> | undefined;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isAttempt(value: unknown): value is ChallengeAttempt {
  if (!isRecord(value)) return false;
  return typeof value.attemptId === 'string'
    && typeof value.taskId === 'string'
    && (value.status === 'in-progress' || value.status === 'completed')
    && Array.isArray(value.questions)
    && isRecord(value.answers)
    && Number.isSafeInteger(value.currentIndex)
    && Number.isSafeInteger(value.revision);
}

function isTaskProgress(value: unknown): value is TaskProgress {
  if (!isRecord(value)) return false;
  return typeof value.taskId === 'string'
    && Number.isSafeInteger(value.bestCorrect)
    && Number.isSafeInteger(value.bestTotal)
    && Number.isSafeInteger(value.latestCorrect)
    && Number.isSafeInteger(value.latestTotal)
    && Number.isSafeInteger(value.completedCount)
    && typeof value.everPassed === 'boolean'
    && typeof value.updatedAt === 'string'
    && Number.isSafeInteger(value.revision);
}

function isWrongQuestion(value: unknown): value is WrongQuestionRecord {
  if (!isRecord(value)) return false;
  return typeof value.questionId === 'string'
    && isAttemptQuestionSnapshot(value.question)
    && Number.isSafeInteger(value.wrongCount)
    && typeof value.lastWrongAt === 'string'
    && (value.correctAttemptStreak === 0 || value.correctAttemptStreak === 1 || value.correctAttemptStreak === 2)
    && (value.masteredAt === undefined || typeof value.masteredAt === 'string');
}

function isAttemptQuestionSnapshot(value: unknown): boolean {
  return isRecord(value) && typeof value.questionId === 'string' && isRecord(value.activity);
}

function isBackupData(value: unknown): value is ChallengeBackupData {
  return isRecord(value)
    && Array.isArray(value.attempts)
    && value.attempts.every(isAttempt)
    && Array.isArray(value.taskProgress)
    && value.taskProgress.every(isTaskProgress)
    && Array.isArray(value.recentQuestionAttempts)
    && value.recentQuestionAttempts.every((ids) => Array.isArray(ids) && ids.every((id) => typeof id === 'string'))
    && Array.isArray(value.wrongQuestions)
    && value.wrongQuestions.every(isWrongQuestion);
}

function stableSerialize(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map((item) => stableSerialize(item)).join(',')}]`;
  if (isRecord(value)) {
    const entries = Object.keys(value)
      .filter((key) => value[key] !== undefined)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${stableSerialize(value[key])}`);
    return `{${entries.join(',')}}`;
  }
  const serialized = JSON.stringify(value);
  if (serialized === undefined) throw new Error('Backup data contains a value that cannot be serialized.');
  return serialized;
}

async function sha256(value: unknown, cryptoProvider: CryptoProvider): Promise<string> {
  if (!cryptoProvider?.subtle) throw new Error('This browser does not support SHA-256 backup verification.');
  const digest = await cryptoProvider.subtle.digest('SHA-256', new TextEncoder().encode(stableSerialize(value)));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

function isChallengeBackup(value: unknown): value is ChallengeBackup {
  return isRecord(value)
    && value.format === 'starry-island-challenge-backup'
    && value.version === 1
    && typeof value.createdAt === 'string'
    && Number.isFinite(Date.parse(value.createdAt))
    && isBackupData(value.data)
    && isRecord(value.integrity)
    && value.integrity.algorithm === 'SHA-256'
    && typeof value.integrity.digest === 'string'
    && /^[a-f0-9]{64}$/.test(value.integrity.digest);
}

export async function createChallengeBackup(
  data: ChallengeBackupData,
  createdAt = new Date().toISOString(),
  cryptoProvider: CryptoProvider = globalThis.crypto,
): Promise<ChallengeBackup> {
  if (!isBackupData(data) || !Number.isFinite(Date.parse(createdAt))) {
    throw new Error('The challenge backup data is invalid.');
  }
  const canonicalData = JSON.parse(stableSerialize(data)) as ChallengeBackupData;
  const payload = {
    format: 'starry-island-challenge-backup' as const,
    version: 1 as const,
    createdAt,
    data: canonicalData,
  };
  return {
    ...payload,
    integrity: { algorithm: 'SHA-256', digest: await sha256(payload, cryptoProvider) },
  };
}

export async function verifyChallengeBackup(
  value: unknown,
  cryptoProvider: CryptoProvider = globalThis.crypto,
): Promise<boolean> {
  if (!isChallengeBackup(value)) return false;
  const { integrity: _integrity, ...payload } = value;
  return await sha256(payload, cryptoProvider) === value.integrity.digest;
}
