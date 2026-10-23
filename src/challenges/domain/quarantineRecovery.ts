import { isChallengeBackupData, normalizeImportedChallengeBackupData } from './backup';
import type { ChallengeBackupData, ChallengeBackupImportData } from './backup';
import { isChallengeRecoveryPoint, isChallengeRecoveryPointActive } from './recovery';
import type { ChallengeAttempt, TaskProgress, WrongQuestionRecord } from './types';

export interface QuarantinedRecordCandidate {
  sourceStore: string;
  sourceKey: IDBValidKey;
  reasonCode: string;
  record: unknown;
}

export type QuarantineTargetStore = 'attempts' | 'taskProgress' | 'wrongQuestions' | 'challengeMeta';

export type QuarantineEligibilityBlockReason =
  | 'unsupported-source'
  | 'unknown-reason'
  | 'invalid-record'
  | 'unsupported-snapshot-version'
  | 'source-key-mismatch'
  | 'inactive-recovery-point'
  | 'uncomparable-value';

export type QuarantineNormalization = 'none' | 'attempt-snapshot-v1' | 'recovery-point-snapshot-v1';

export type QuarantineRecoveryPreparation =
  | {
    status: 'eligible';
    targetStore: QuarantineTargetStore;
    targetKey: IDBValidKey;
    record: unknown;
    normalization: QuarantineNormalization;
  }
  | { status: 'blocked'; reason: QuarantineEligibilityBlockReason };

const CURRENT_SNAPSHOT_VERSION = 1;
const EMPTY_BACKUP_DATA: ChallengeBackupData = {
  attempts: [],
  taskProgress: [],
  recentQuestionAttempts: [],
  wrongQuestions: [],
};

const ALLOWED_REASONS: Record<string, readonly string[]> = {
  attempts: ['invalid-attempts'],
  taskProgress: ['invalid-taskProgress'],
  wrongQuestions: ['invalid-wrongQuestions'],
  challengeMeta: ['invalid-recent-question-ids', 'invalid-recovery-point'],
};

type PlainRecord = Record<string, unknown>;

function isRecord(value: unknown): value is PlainRecord {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isPlainObject(value: object): value is PlainRecord {
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function serializeValue(value: unknown, ancestors: Set<object>, nestedInObject: boolean): string | null {
  if (value === null) return 'null';
  if (value === undefined) return nestedInObject ? 'undefined' : null;
  if (typeof value === 'string' || typeof value === 'boolean') return JSON.stringify(value);
  if (typeof value === 'number') {
    if (!Number.isFinite(value)) return null;
    return Object.is(value, -0) ? '-0' : String(value);
  }
  if (typeof value !== 'object') return null;
  if (ancestors.has(value)) return null;

  ancestors.add(value);
  try {
    if (Array.isArray(value)) {
      if (Object.getPrototypeOf(value) !== Array.prototype || Object.getOwnPropertySymbols(value).length > 0) return null;
      const ownKeys = Reflect.ownKeys(value);
      if (ownKeys.some((key) => {
        if (key === 'length') return false;
        if (typeof key !== 'string' || !/^(0|[1-9]\d*)$/.test(key)) return true;
        const index = Number(key);
        return !Number.isSafeInteger(index) || index >= value.length || String(index) !== key;
      })) return null;
      const parts: string[] = [];
      for (let index = 0; index < value.length; index += 1) {
        if (!Object.prototype.hasOwnProperty.call(value, index)) return null;
        const descriptor = Object.getOwnPropertyDescriptor(value, String(index));
        if (!descriptor?.enumerable || !('value' in descriptor)) return null;
        const part = serializeValue(descriptor.value, ancestors, false);
        if (part === null) return null;
        parts.push(part);
      }
      return `[${parts.join(',')}]`;
    }

    if (!isPlainObject(value) || Object.getOwnPropertySymbols(value).length > 0) return null;
    const keys = Reflect.ownKeys(value);
    if (keys.some((key) => typeof key !== 'string')) return null;
    keys.sort((left, right) => (left as string) < (right as string) ? -1 : (left as string) > (right as string) ? 1 : 0);
    const parts: string[] = [];
    for (const key of keys) {
      if (typeof key !== 'string') return null;
      const descriptor = Object.getOwnPropertyDescriptor(value, key);
      if (!descriptor?.enumerable || !('value' in descriptor)) return null;
      const serialized = serializeValue(descriptor.value, ancestors, true);
      if (serialized === null) return null;
      parts.push(`${JSON.stringify(key)}:${serialized}`);
    }
    return `{${parts.join(',')}}`;
  } finally {
    ancestors.delete(value);
  }
}

export function serializeQuarantineComparableValue(value: unknown): string | null {
  return serializeValue(value, new Set(), false);
}

function blocked(reason: QuarantineEligibilityBlockReason): QuarantineRecoveryPreparation {
  return { status: 'blocked', reason };
}

function eligible(
  targetStore: QuarantineTargetStore,
  targetKey: IDBValidKey,
  record: unknown,
  normalization: QuarantineNormalization,
): QuarantineRecoveryPreparation {
  return { status: 'eligible', targetStore, targetKey, record, normalization };
}

function normalizedAttempt(record: PlainRecord): ChallengeAttempt | null {
  try {
    const data = normalizeImportedChallengeBackupData({
      ...EMPTY_BACKUP_DATA,
      attempts: [record as ChallengeBackupImportData['attempts'][number]],
    });
    return data.attempts[0] ?? null;
  } catch {
    return null;
  }
}

function isUnknownSnapshotVersion(record: PlainRecord): boolean {
  return record.snapshotSchemaVersion !== undefined
    && record.snapshotSchemaVersion !== CURRENT_SNAPSHOT_VERSION;
}

function sameExceptSnapshotVersion(original: PlainRecord, normalized: PlainRecord): boolean {
  const { snapshotSchemaVersion: _version, ...normalizedFields } = normalized;
  const originalValue = serializeQuarantineComparableValue(original);
  const normalizedValue = serializeQuarantineComparableValue(normalizedFields);
  return originalValue !== null && originalValue === normalizedValue;
}

function isValidTaskProgress(value: unknown): value is TaskProgress {
  return isChallengeBackupData({ ...EMPTY_BACKUP_DATA, taskProgress: [value as TaskProgress] });
}

function isValidWrongQuestion(value: unknown): value is WrongQuestionRecord {
  return isChallengeBackupData({ ...EMPTY_BACKUP_DATA, wrongQuestions: [value as WrongQuestionRecord] });
}

function isValidRecentQuestionMetadata(value: unknown): value is PlainRecord & { key: 'recent-question-ids'; attemptQuestionIds: string[][] } {
  if (!isRecord(value) || value.key !== 'recent-question-ids' || !Array.isArray(value.attemptQuestionIds)) return false;
  return isChallengeBackupData({
    ...EMPTY_BACKUP_DATA,
    recentQuestionAttempts: value.attemptQuestionIds as string[][],
  });
}

function recoveryPointWithNormalizedAttempts(record: PlainRecord): PlainRecord | null {
  if (record.key !== 'recovery-point'
    || record.format !== 'starry-island-challenge-recovery'
    || record.version !== 1
    || !isRecord(record.data)) return null;

  try {
    const data = normalizeImportedChallengeBackupData(record.data as unknown as ChallengeBackupImportData);
    return { ...record, data };
  } catch {
    return null;
  }
}

function sameExceptLegacyAttemptVersions(original: PlainRecord, normalized: PlainRecord): boolean {
  const originalData = original.data;
  const normalizedData = normalized.data;
  if (!isRecord(originalData) || !isRecord(normalizedData)
    || !Array.isArray(originalData.attempts) || !Array.isArray(normalizedData.attempts)
    || originalData.attempts.length !== normalizedData.attempts.length) return false;
  const originalAttempts = originalData.attempts;
  const normalizedAttempts = normalizedData.attempts;

  const attemptsWithoutAddedVersions = normalizedAttempts.map((attempt, index) => {
    const originalAttempt = originalAttempts[index];
    if (!isRecord(originalAttempt) || !isRecord(attempt) || originalAttempt.snapshotSchemaVersion !== undefined) return attempt;
    const { snapshotSchemaVersion: _version, ...fields } = attempt;
    if (Object.prototype.hasOwnProperty.call(originalAttempt, 'snapshotSchemaVersion')) {
      fields.snapshotSchemaVersion = undefined;
    }
    return fields;
  });
  const comparableNormalized = {
    ...normalized,
    data: { ...normalizedData, attempts: attemptsWithoutAddedVersions },
  };
  const originalValue = serializeQuarantineComparableValue(original);
  const normalizedValue = serializeQuarantineComparableValue(comparableNormalized);
  return originalValue !== null && originalValue === normalizedValue;
}

function hasUnknownSnapshotVersionInRecoveryPoint(record: PlainRecord): boolean {
  return isRecord(record.data)
    && Array.isArray(record.data.attempts)
    && record.data.attempts.some((attempt) => isRecord(attempt) && isUnknownSnapshotVersion(attempt));
}

export function prepareQuarantinedRecordForRestore(
  input: QuarantinedRecordCandidate,
  now = new Date().toISOString(),
): QuarantineRecoveryPreparation {
  const allowedReasons = ALLOWED_REASONS[input.sourceStore];
  if (!allowedReasons) return blocked('unsupported-source');
  if (!allowedReasons.includes(input.reasonCode)) return blocked('unknown-reason');
  if (serializeQuarantineComparableValue(input) === null) return blocked('uncomparable-value');

  if (input.sourceStore === 'attempts') {
    if (typeof input.sourceKey !== 'string' || !isRecord(input.record)) return blocked('invalid-record');
    if (isUnknownSnapshotVersion(input.record)) return blocked('unsupported-snapshot-version');

    const normalized = normalizedAttempt(input.record);
    if (!normalized || !isChallengeBackupData({ ...EMPTY_BACKUP_DATA, attempts: [normalized] })) {
      return blocked('invalid-record');
    }
    if (normalized.taskId !== input.sourceKey) return blocked('source-key-mismatch');

    const wasLegacy = input.record.snapshotSchemaVersion === undefined;
    if (wasLegacy && !sameExceptSnapshotVersion(input.record, normalized as unknown as PlainRecord)) {
      return blocked('invalid-record');
    }
    return eligible('attempts', normalized.taskId, normalized, wasLegacy ? 'attempt-snapshot-v1' : 'none');
  }

  if (input.sourceStore === 'taskProgress') {
    if (typeof input.sourceKey !== 'string' || !isValidTaskProgress(input.record)) return blocked('invalid-record');
    if (input.record.taskId !== input.sourceKey) return blocked('source-key-mismatch');
    return eligible('taskProgress', input.record.taskId, input.record, 'none');
  }

  if (input.sourceStore === 'wrongQuestions') {
    if (typeof input.sourceKey !== 'string' || !isValidWrongQuestion(input.record)) return blocked('invalid-record');
    if (input.record.questionId !== input.sourceKey) return blocked('source-key-mismatch');
    return eligible('wrongQuestions', input.record.questionId, input.record, 'none');
  }

  if (input.reasonCode === 'invalid-recent-question-ids') {
    if (typeof input.sourceKey !== 'string' || !isValidRecentQuestionMetadata(input.record)) return blocked('invalid-record');
    if (input.record.key !== input.sourceKey) return blocked('source-key-mismatch');
    return eligible('challengeMeta', input.record.key, input.record, 'none');
  }

  if (typeof input.sourceKey !== 'string' || !isRecord(input.record)) return blocked('invalid-record');
  if (input.record.key !== input.sourceKey) return blocked('source-key-mismatch');
  if (input.record.version !== 1) return blocked('invalid-record');
  if (hasUnknownSnapshotVersionInRecoveryPoint(input.record)) return blocked('unsupported-snapshot-version');

  const isAlreadyCurrent = isChallengeRecoveryPoint(input.record);
  const normalizedPoint = isAlreadyCurrent ? input.record : recoveryPointWithNormalizedAttempts(input.record);
  if (!normalizedPoint || !isChallengeRecoveryPoint(normalizedPoint)) return blocked('invalid-record');
  if (!isChallengeRecoveryPointActive(normalizedPoint, now)) return blocked('inactive-recovery-point');

  if (isAlreadyCurrent) return eligible('challengeMeta', 'recovery-point', input.record, 'none');
  const originalData = input.record.data;
  const normalizedData = normalizedPoint.data;
  if (!isRecord(originalData) || !isRecord(normalizedData)) return blocked('invalid-record');
  const normalizedAttempts = normalizedData.attempts;
  if (!Array.isArray(normalizedAttempts)) return blocked('invalid-record');
  const hasLegacyAttempt = Array.isArray(originalData.attempts)
    && originalData.attempts.some((attempt) => isRecord(attempt) && attempt.snapshotSchemaVersion === undefined);
  if (!hasLegacyAttempt || !sameExceptLegacyAttemptVersions(input.record, normalizedPoint)) return blocked('invalid-record');
  return eligible('challengeMeta', 'recovery-point', normalizedPoint, 'recovery-point-snapshot-v1');
}
