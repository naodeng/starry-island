import type { ChallengeAttempt, TaskProgress, WrongQuestionRecord } from './types';
import { CURRENT_ATTEMPT_SNAPSHOT_SCHEMA_VERSION } from './snapshotSchema';

export interface ChallengeBackupData {
  attempts: ChallengeAttempt[];
  taskProgress: TaskProgress[];
  recentQuestionAttempts: string[][];
  wrongQuestions: WrongQuestionRecord[];
}

export interface ChallengeBackupPreferences {
  theme: 'system' | 'light' | 'dark';
  soundEnabled: boolean;
}

export interface CreateChallengeBackupOptions {
  createdAt?: string;
  preferences?: ChallengeBackupPreferences;
  cryptoProvider?: Pick<Crypto, 'subtle'>;
}

export interface ChallengeBackup {
  format: 'starry-island-challenge-backup';
  version: 1;
  createdAt: string;
  data: ChallengeBackupData;
  preferences?: ChallengeBackupPreferences;
  integrity: {
    algorithm: 'SHA-256';
    digest: string;
  };
}

export type ChallengeAttemptRecoveryImport = ChallengeAttempt
  | (Omit<ChallengeAttempt, 'snapshotSchemaVersion'> & { snapshotSchemaVersion?: undefined });

export interface ChallengeRecoverySnapshotImportData {
  attempts: ChallengeAttemptRecoveryImport[];
  taskProgress: TaskProgress[];
  recentQuestionAttempts: string[][];
  wrongQuestions: WrongQuestionRecord[];
}

export interface ChallengeBackupImport extends Omit<ChallengeBackup, 'data'> {
  data: ChallengeBackupData;
}

type CryptoProvider = Pick<Crypto, 'subtle'> | undefined;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function isTimestamp(value: unknown): value is string {
  return typeof value === 'string' && Number.isFinite(Date.parse(value));
}

function isChallengeBackupPreferences(value: unknown): value is ChallengeBackupPreferences {
  return isRecord(value)
    && (value.theme === 'system' || value.theme === 'light' || value.theme === 'dark')
    && typeof value.soundEnabled === 'boolean';
}

function isActivity(value: unknown): boolean {
  if (!isRecord(value)
    || !isNonEmptyString(value.id)
    || typeof value.prompt !== 'string'
    || typeof value.hint !== 'string'
    || typeof value.explanation !== 'string') return false;

  switch (value.kind) {
    case 'choice':
      return Array.isArray(value.options)
        && value.options.length > 0
        && value.options.every((option) => isRecord(option) && isNonEmptyString(option.id) && typeof option.label === 'string')
        && isNonEmptyString(value.correctOptionId)
        && value.options.some((option) => isRecord(option) && option.id === value.correctOptionId);
    case 'match':
      return Array.isArray(value.pairs)
        && value.pairs.length > 0
        && value.pairs.every((pair) => isRecord(pair)
          && isNonEmptyString(pair.id)
          && typeof pair.left === 'string'
          && typeof pair.right === 'string');
    case 'order':
      {
        const items = value.items;
        const correctOrder = value.correctOrder;
        return Array.isArray(items)
          && items.length > 0
          && items.every((item) => isRecord(item) && isNonEmptyString(item.id) && typeof item.label === 'string')
          && Array.isArray(correctOrder)
          && correctOrder.length === items.length
          && correctOrder.every((id) => typeof id === 'string')
          && new Set(correctOrder).size === correctOrder.length
          && items.every((item) => {
            if (!isRecord(item) || typeof item.id !== 'string') return false;
            return correctOrder.includes(item.id);
          });
      }
    case 'categorize': {
      const categories = value.categories;
      const items = value.items;
      return Array.isArray(categories)
        && categories.length > 0
        && categories.every((category) => isRecord(category) && isNonEmptyString(category.id) && typeof category.label === 'string')
        && Array.isArray(items)
        && items.length > 0
        && items.every((item) => isRecord(item)
          && isNonEmptyString(item.id)
          && typeof item.label === 'string'
          && categories.some((category) => isRecord(category) && category.id === item.categoryId));
    }
    case 'measurement':
      return typeof value.objectLabel === 'string'
        && Number.isFinite(value.targetLengthCm)
        && Number.isFinite(value.minCm)
        && Number.isFinite(value.maxCm);
    case 'arithmetic':
      return typeof value.expression === 'string'
        && Number.isFinite(value.correctAnswer)
        && (value.carryBorrowSteps === undefined
          || (Array.isArray(value.carryBorrowSteps) && value.carryBorrowSteps.every((step) => typeof step === 'string')));
    default:
      return false;
  }
}

function isQuestionSnapshot(value: unknown): boolean {
  return isRecord(value)
    && isNonEmptyString(value.questionId)
    && isNonEmptyString(value.activityId)
    && (value.difficulty === 'basic' || value.difficulty === 'advanced' || value.difficulty === 'high')
    && Array.isArray(value.knowledgePointIds)
    && value.knowledgePointIds.every((id) => isNonEmptyString(id))
    && (value.lifecycle === 'active' || value.lifecycle === 'disabled' || value.lifecycle === 'deprecated')
    && typeof value.approved === 'boolean'
    && typeof value.answerLeakageReviewed === 'boolean'
    && typeof value.approvedContentFingerprint === 'string'
    && typeof value.contentFingerprint === 'string'
    && (value.approvedBy === undefined || typeof value.approvedBy === 'string')
    && (value.approvedAt === undefined || isTimestamp(value.approvedAt))
    && isActivity(value.activity)
    && isRecord(value.activity)
    && value.activity.id === value.activityId;
}

function hasValidAttemptFields(value: unknown): boolean {
  if (!isRecord(value)
    || !isNonEmptyString(value.attemptId)
    || !isNonEmptyString(value.taskId)
    || !(value.difficulty === 'basic' || value.difficulty === 'advanced' || value.difficulty === 'high')
    || value.status !== 'in-progress'
    || !Array.isArray(value.questions)
    || value.questions.length === 0
    || !value.questions.every(isQuestionSnapshot)
    || value.questions.some((question) => isQuestionSnapshot(question) && question.difficulty !== value.difficulty)
    || new Set(value.questions.map((question) => (question as { questionId: string }).questionId)).size !== value.questions.length
    || !isRecord(value.answers)
    || !isNonEmptyString(value.assemblySeed)
    || !isNonEmptyString(value.contentManifestVersion)
    || !isTimestamp(value.startedAt)
    || !Number.isSafeInteger(value.elapsedMs)
    || (value.elapsedMs as number) < 0
    || !Number.isSafeInteger(value.currentIndex)
    || !Number.isSafeInteger(value.revision)
    || (value.currentIndex as number) < 0
    || (value.currentIndex as number) > value.questions.length
    || value.revision !== value.currentIndex
    || (value.revision as number) < 0) return false;

  const questionIds = value.questions.map((question) => (question as { questionId: string }).questionId);
  const answerIds = Object.keys(value.answers);
  return answerIds.length === value.currentIndex
    && answerIds.every((id) => questionIds.slice(0, value.currentIndex as number).includes(id))
    && Object.values(value.answers).every((answer) => typeof answer === 'string'
      || (typeof answer === 'number' && Number.isFinite(answer))
      || (Array.isArray(answer) && answer.every((item) => typeof item === 'string'))
      || (isRecord(answer) && Object.values(answer).every((item) => typeof item === 'string')));
}

function isAttempt(value: unknown): value is ChallengeAttempt {
  return isRecord(value)
    && value.snapshotSchemaVersion === CURRENT_ATTEMPT_SNAPSHOT_SCHEMA_VERSION
    && hasValidAttemptFields(value);
}

function isAttemptRecoveryImport(value: unknown): value is ChallengeAttemptRecoveryImport {
  return isRecord(value)
    && (value.snapshotSchemaVersion === undefined || value.snapshotSchemaVersion === CURRENT_ATTEMPT_SNAPSHOT_SCHEMA_VERSION)
    && hasValidAttemptFields(value);
}

function isTaskProgress(value: unknown): value is TaskProgress {
  return isRecord(value)
    && isNonEmptyString(value.taskId)
    && Number.isSafeInteger(value.bestCorrect)
    && (value.bestCorrect as number) >= 0
    && Number.isSafeInteger(value.bestTotal)
    && (value.bestTotal as number) > 0
    && (value.bestCorrect as number) <= (value.bestTotal as number)
    && Number.isSafeInteger(value.latestCorrect)
    && (value.latestCorrect as number) >= 0
    && Number.isSafeInteger(value.latestTotal)
    && (value.latestTotal as number) > 0
    && (value.latestCorrect as number) <= (value.latestTotal as number)
    && Number.isSafeInteger(value.completedCount)
    && (value.completedCount as number) > 0
    && typeof value.everPassed === 'boolean'
    && isTimestamp(value.updatedAt)
    && Number.isSafeInteger(value.revision)
    && (value.revision as number) > 0;
}

function isWrongQuestion(value: unknown): value is WrongQuestionRecord {
  return isRecord(value)
    && isNonEmptyString(value.questionId)
    && isQuestionSnapshot(value.question)
    && isRecord(value.question)
    && value.question.questionId === value.questionId
    && Number.isSafeInteger(value.wrongCount)
    && (value.wrongCount as number) > 0
    && isTimestamp(value.lastWrongAt)
    && (value.correctAttemptStreak === 0 || value.correctAttemptStreak === 1 || value.correctAttemptStreak === 2)
    && (value.lastCorrectAt === undefined || isTimestamp(value.lastCorrectAt))
    && (value.masteredAt === undefined || isTimestamp(value.masteredAt))
    && (value.correctAttemptStreak !== 2 || isTimestamp(value.masteredAt))
    && (value.correctAttemptStreak === 2 || value.masteredAt === undefined);
}

function hasValidBackupData(value: unknown, validateAttempt: (attempt: unknown) => boolean): boolean {
  if (!isRecord(value)
    || !Array.isArray(value.attempts)
    || !value.attempts.every(validateAttempt)
    || !Array.isArray(value.taskProgress)
    || !value.taskProgress.every(isTaskProgress)
    || !Array.isArray(value.recentQuestionAttempts)
    || value.recentQuestionAttempts.length > 3
    || !value.recentQuestionAttempts.every((ids) => Array.isArray(ids)
      && ids.every((id) => isNonEmptyString(id))
      && new Set(ids).size === ids.length)
    || !Array.isArray(value.wrongQuestions)
    || !value.wrongQuestions.every(isWrongQuestion)) return false;

  const attemptTasks = value.attempts.map((attempt) => (attempt as ChallengeAttempt).taskId);
  const attemptIds = value.attempts.map((attempt) => (attempt as ChallengeAttempt).attemptId);
  const progressIds = value.taskProgress.map((progress) => (progress as TaskProgress).taskId);
  const wrongIds = value.wrongQuestions.map((record) => (record as WrongQuestionRecord).questionId);
  return new Set(attemptTasks).size === attemptTasks.length
    && new Set(attemptIds).size === attemptIds.length
    && new Set(progressIds).size === progressIds.length
    && new Set(wrongIds).size === wrongIds.length;
}

function isBackupData(value: unknown): value is ChallengeBackupData {
  return hasValidBackupData(value, isAttempt);
}

function isRecoverySnapshotImportData(value: unknown): value is ChallengeRecoverySnapshotImportData {
  return hasValidBackupData(value, isAttemptRecoveryImport);
}

export function isChallengeBackupData(value: unknown): value is ChallengeBackupData {
  return isBackupData(value);
}

export function normalizeRecoverySnapshotData(data: ChallengeRecoverySnapshotImportData): ChallengeBackupData {
  if (!isRecoverySnapshotImportData(data)) throw new Error('恢复点结构无效。');
  const attempts = data.attempts.map((attempt): ChallengeAttempt => {
    if (attempt.snapshotSchemaVersion === undefined) {
      return { ...attempt, snapshotSchemaVersion: CURRENT_ATTEMPT_SNAPSHOT_SCHEMA_VERSION } as ChallengeAttempt;
    }
    if (attempt.snapshotSchemaVersion !== CURRENT_ATTEMPT_SNAPSHOT_SCHEMA_VERSION) {
      throw new Error('备份中的闯关快照版本不受支持。');
    }
    return attempt as ChallengeAttempt;
  });
  const normalized = { ...data, attempts };
  if (!isBackupData(normalized)) throw new Error('恢复点结构无效。');
  return normalized;
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

function isChallengeBackup(value: unknown): value is ChallengeBackupImport {
  return isRecord(value)
    && value.format === 'starry-island-challenge-backup'
    && value.version === 1
    && isTimestamp(value.createdAt)
    && isBackupData(value.data)
    && (value.preferences === undefined || isChallengeBackupPreferences(value.preferences))
    && isRecord(value.integrity)
    && value.integrity.algorithm === 'SHA-256'
    && typeof value.integrity.digest === 'string'
    && /^[a-f0-9]{64}$/.test(value.integrity.digest);
}

export async function createChallengeBackup(
  data: ChallengeBackupData,
  options: CreateChallengeBackupOptions = {},
): Promise<ChallengeBackup> {
  const createdAt = options.createdAt ?? new Date().toISOString();
  const preferences = options.preferences;
  const cryptoProvider = options.cryptoProvider ?? globalThis.crypto;
  if (!isBackupData(data) || !Number.isFinite(Date.parse(createdAt))) {
    throw new Error('The challenge backup data is invalid.');
  }
  if (preferences !== undefined && !isChallengeBackupPreferences(preferences)) {
    throw new Error('The challenge backup preferences are invalid.');
  }
  const canonicalData = JSON.parse(stableSerialize(data)) as ChallengeBackupData;
  const payload = {
    format: 'starry-island-challenge-backup' as const,
    version: 1 as const,
    createdAt,
    data: canonicalData,
    ...(preferences ? { preferences: JSON.parse(stableSerialize(preferences)) as ChallengeBackupPreferences } : {}),
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
  try {
    return await sha256(payload, cryptoProvider) === value.integrity.digest;
  } catch {
    return false;
  }
}

export async function parseChallengeBackup(
  value: unknown,
  cryptoProvider: CryptoProvider = globalThis.crypto,
): Promise<ChallengeBackupImport> {
  if (!isChallengeBackup(value)) throw new Error('备份文件格式或数据结构无效。');
  const { integrity: _integrity, ...payload } = value;
  if (await sha256(payload, cryptoProvider) !== value.integrity.digest) {
    throw new Error('备份文件完整性校验失败，文件内容可能已损坏。');
  }
  return value;
}
