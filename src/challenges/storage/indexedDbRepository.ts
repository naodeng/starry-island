import { submitAnswer } from '../../learning/answers';
import { isChallengeBackupData, normalizeImportedChallengeBackupData } from '../domain/backup';
import type { ChallengeBackupData, ChallengeBackupImportData } from '../domain/backup';
import { prepareQuarantinedRecordForRestore, serializeQuarantineComparableValue } from '../domain/quarantineRecovery';
import type {
  QuarantineRecoveryPreparation,
} from '../domain/quarantineRecovery';
import { mergeChallengeBackupData } from '../domain/backupMerge';
import { gradeAttempt } from '../domain/grading';
import type { ChallengeAnswer, ChallengeAttempt, TaskProgress, WrongQuestionRecord } from '../domain/types';
import { CURRENT_ATTEMPT_SNAPSHOT_SCHEMA_VERSION } from '../domain/snapshotSchema';
import {
  createChallengeRecoveryPoint,
  getChallengeDataClearCounts,
  hasChallengeDataToClear,
  isChallengeRecoveryPoint,
  isChallengeRecoveryPointActive,
} from '../domain/recovery';
import type {
  ChallengeClearScope,
  ChallengeDataClearResult,
  ChallengeRecoveryPoint,
  ChallengeRecoveryPointSummary,
} from '../domain/recovery';
import {
  ActiveAttemptExistsError,
  ChallengeRepositoryError,
  InvalidAttemptTransitionError,
  RevisionConflictError,
} from './repository';
import type {
  ChallengeRepository,
  ChallengeRepositoryOptions,
  QuarantineRecoveryBlockReason,
  QuarantinedChallengeRecord,
  QuarantinedRecordPage,
  QuarantinedRecordSummary,
  QuarantineRecoveryPreview,
  QuarantineRestoreResult,
} from './repository';
import { transitionWrongQuestion } from '../domain/wrongQuestions';

export const CHALLENGE_DATABASE_VERSION = 4;
const DEFAULT_DATABASE_NAME = 'starry-island-challenges';
const ATTEMPTS_STORE = 'attempts';
const PROGRESS_STORE = 'taskProgress';
const META_STORE = 'challengeMeta';
const WRONG_QUESTIONS_STORE = 'wrongQuestions';
const QUARANTINED_RECORDS_STORE = 'quarantinedRecords';
const RECENT_QUESTION_IDS_KEY = 'recent-question-ids';
const RECOVERY_POINT_KEY = 'recovery-point';
const MAX_RECENT_ATTEMPTS = 3;
const QUARANTINE_PAGE_SIZE = 50;
const QUARANTINE_PREVIEW_TTL_MS = 5 * 60 * 1000;
const QUARANTINE_READ_STORES = [
  QUARANTINED_RECORDS_STORE,
  ATTEMPTS_STORE,
  PROGRESS_STORE,
  WRONG_QUESTIONS_STORE,
  META_STORE,
] as const;

interface PendingQuarantinePreview {
  token: string;
  quarantineId: IDBValidKey;
  row: QuarantinedChallengeRecord;
  rowFingerprint: string;
  preparation: Extract<QuarantineRecoveryPreparation, { status: 'eligible' }>;
  expiresAtMs: number;
}

interface RecentQuestionIdsRecord {
  key: typeof RECENT_QUESTION_IDS_KEY;
  attemptQuestionIds: string[][];
}

function isValidAttemptRecord(value: unknown): value is ChallengeAttempt {
  return typeof value === 'object'
    && value !== null
    && !Array.isArray(value)
    && (value as Record<string, unknown>).snapshotSchemaVersion === CURRENT_ATTEMPT_SNAPSHOT_SCHEMA_VERSION
    && isChallengeBackupData({
    attempts: [value as ChallengeAttempt], taskProgress: [], recentQuestionAttempts: [], wrongQuestions: [],
  });
}

function isValidLegacyAttemptRecord(value: unknown): boolean {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) return false;
  const record = value as Record<string, unknown>;
  if (record.snapshotSchemaVersion !== undefined) return false;
  return isChallengeBackupData({
    attempts: [{ ...record, snapshotSchemaVersion: CURRENT_ATTEMPT_SNAPSHOT_SCHEMA_VERSION } as unknown as ChallengeAttempt],
    taskProgress: [], recentQuestionAttempts: [], wrongQuestions: [],
  });
}

function isValidProgressRecord(value: unknown): value is TaskProgress {
  return isChallengeBackupData({
    attempts: [], taskProgress: [value as TaskProgress], recentQuestionAttempts: [], wrongQuestions: [],
  });
}

function isValidWrongQuestionRecord(value: unknown): value is WrongQuestionRecord {
  return isChallengeBackupData({
    attempts: [], taskProgress: [], recentQuestionAttempts: [], wrongQuestions: [value as WrongQuestionRecord],
  });
}

function isValidRecentQuestionRecord(value: unknown): value is RecentQuestionIdsRecord {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) return false;
  const record = value as Record<string, unknown>;
  return record.key === RECENT_QUESTION_IDS_KEY
    && Array.isArray(record.attemptQuestionIds)
    && record.attemptQuestionIds.length <= MAX_RECENT_ATTEMPTS
    && record.attemptQuestionIds.every((ids) => Array.isArray(ids)
      && ids.every((id) => typeof id === 'string' && id.trim().length > 0)
      && new Set(ids).size === ids.length);
}

function ensureObjectStore(database: IDBDatabase, name: string, options: IDBObjectStoreParameters): void {
  if (!database.objectStoreNames.contains(name)) database.createObjectStore(name, options);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

const DATABASE_MIGRATIONS: Array<(database: IDBDatabase, transaction: IDBTransaction) => void> = [
  (database) => {
    ensureObjectStore(database, ATTEMPTS_STORE, { keyPath: 'taskId' });
    ensureObjectStore(database, PROGRESS_STORE, { keyPath: 'taskId' });
    ensureObjectStore(database, META_STORE, { keyPath: 'key' });
  },
  (database) => ensureObjectStore(database, WRONG_QUESTIONS_STORE, { keyPath: 'questionId' }),
  (database) => ensureObjectStore(database, QUARANTINED_RECORDS_STORE, { autoIncrement: true }),
  (_database, transaction) => {
    const cursorRequest = transaction.objectStore(ATTEMPTS_STORE).openCursor();
    cursorRequest.onsuccess = () => {
      const cursor = cursorRequest.result;
      if (!cursor) return;
      const attempt = cursor.value as Record<string, unknown>;
      if (isValidLegacyAttemptRecord(attempt)) {
        cursor.update({ ...attempt, snapshotSchemaVersion: CURRENT_ATTEMPT_SNAPSHOT_SCHEMA_VERSION });
      }
      cursor.continue();
    };

    const metaStore = transaction.objectStore(META_STORE);
    const recoveryPointRequest = metaStore.get(RECOVERY_POINT_KEY);
    recoveryPointRequest.onsuccess = () => {
      const recoveryPoint = recoveryPointRequest.result;
      if (isChallengeRecoveryPoint(recoveryPoint) || !isRecord(recoveryPoint)) return;
      try {
        const data = normalizeImportedChallengeBackupData(recoveryPoint.data as ChallengeBackupImportData);
        const migrated = { ...recoveryPoint, data };
        if (isChallengeRecoveryPoint(migrated)) metaStore.put(migrated);
      } catch {
        // Leave malformed or unknown snapshots untouched for the existing quarantine path.
      }
    };
  },
];

function applyDatabaseMigrations(database: IDBDatabase, transaction: IDBTransaction, oldVersion: number): void {
  for (let version = oldVersion; version < CHALLENGE_DATABASE_VERSION; version += 1) {
    DATABASE_MIGRATIONS[version]?.(database, transaction);
  }
}

function isValidRecordForStore(storeName: string, record: unknown, key: IDBValidKey): boolean {
  if (storeName === ATTEMPTS_STORE) {
    return isValidAttemptRecord(record) && typeof key === 'string' && record.taskId === key;
  }
  if (storeName === PROGRESS_STORE) {
    return isValidProgressRecord(record) && typeof key === 'string' && record.taskId === key;
  }
  if (storeName === WRONG_QUESTIONS_STORE) {
    return isValidWrongQuestionRecord(record) && typeof key === 'string' && record.questionId === key;
  }
  return false;
}

function quarantineInvalidRecords(database: IDBDatabase): Promise<void> {
  return new Promise((resolve, reject) => {
    let transaction: IDBTransaction;
    try {
      transaction = database.transaction(
        [ATTEMPTS_STORE, PROGRESS_STORE, META_STORE, WRONG_QUESTIONS_STORE, QUARANTINED_RECORDS_STORE],
        'readwrite',
      );
    } catch (error) {
      reject(new ChallengeRepositoryError('Could not validate local challenge data.', { cause: error }));
      return;
    }

    const quarantined = transaction.objectStore(QUARANTINED_RECORDS_STORE);
    const quarantine = (store: IDBObjectStore, key: IDBValidKey, record: unknown, reasonCode: string) => {
      store.delete(key);
      quarantined.add({
        sourceStore: store.name,
        sourceKey: key,
        quarantinedAt: new Date().toISOString(),
        reasonCode,
        record,
      } satisfies QuarantinedChallengeRecord);
    };

    for (const storeName of [ATTEMPTS_STORE, PROGRESS_STORE, WRONG_QUESTIONS_STORE]) {
      const store = transaction.objectStore(storeName);
      let records: unknown[] | undefined;
      let keys: IDBValidKey[] | undefined;
      const inspectWhenReady = () => {
        if (!records || !keys) return;
        records.forEach((record, index) => {
          const key = keys?.[index];
          if (key === undefined || !isValidRecordForStore(storeName, record, key)) {
            if (key !== undefined) quarantine(store, key, record, `invalid-${storeName}`);
          }
        });
      };
      const recordsRequest = store.getAll();
      recordsRequest.onsuccess = () => {
        records = recordsRequest.result;
        inspectWhenReady();
      };
      recordsRequest.onerror = () => transaction.abort();
      const keysRequest = store.getAllKeys();
      keysRequest.onsuccess = () => {
        keys = keysRequest.result;
        inspectWhenReady();
      };
      keysRequest.onerror = () => transaction.abort();
    }

    const metaStore = transaction.objectStore(META_STORE);
    const metaRequest = metaStore.getAll();
    metaRequest.onsuccess = () => {
      for (const record of metaRequest.result as unknown[]) {
        if (typeof record !== 'object' || record === null || Array.isArray(record)) continue;
        const candidate = record as Record<string, unknown>;
        if (candidate.key === RECENT_QUESTION_IDS_KEY && !isValidRecentQuestionRecord(record)) {
          quarantine(metaStore, RECENT_QUESTION_IDS_KEY, record, 'invalid-recent-question-ids');
        } else if (candidate.key === RECOVERY_POINT_KEY && !isChallengeRecoveryPoint(record)) {
          quarantine(metaStore, RECOVERY_POINT_KEY, record, 'invalid-recovery-point');
        }
      }
    };
    metaRequest.onerror = () => transaction.abort();

    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(new ChallengeRepositoryError('Could not validate local challenge data.', { cause: transaction.error }));
    transaction.onabort = () => reject(new ChallengeRepositoryError('Could not validate local challenge data; original records were retained.', { cause: transaction.error }));
  });
}

function stableSerialize(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(stableSerialize).join(',')}]`;
  if (typeof value === 'object' && value !== null) {
    const record = value as Record<string, unknown>;
    return `{${Object.keys(record).sort().map((key) => `${JSON.stringify(key)}:${stableSerialize(record[key])}`).join(',')}}`;
  }
  return JSON.stringify(value);
}

function sameValue(left: unknown, right: unknown): boolean {
  return stableSerialize(left) === stableSerialize(right);
}

function isValidInitialAttempt(attempt: ChallengeAttempt): boolean {
  return attempt.status === 'in-progress'
    && attempt.revision === 0
    && attempt.currentIndex === 0
    && attempt.questions.length > 0
    && Object.keys(attempt.answers).length === 0
    && new Set(attempt.questions.map(({ questionId }) => questionId)).size === attempt.questions.length;
}

function isValidNextAnswer(
  previous: ChallengeAttempt,
  next: ChallengeAttempt,
  taskId: string,
  expectedRevision: number,
): boolean {
  if (next.taskId !== taskId || next.status !== 'in-progress' || next.revision !== expectedRevision + 1) return false;
  if (previous.currentIndex >= previous.questions.length || next.currentIndex !== previous.currentIndex + 1) return false;
  const currentQuestionId = previous.questions[previous.currentIndex]?.questionId;
  if (!currentQuestionId || !Object.prototype.hasOwnProperty.call(next.answers, currentQuestionId)) return false;

  const previousAnswerIds = Object.keys(previous.answers);
  const nextAnswerIds = Object.keys(next.answers);
  if (!Number.isFinite(next.elapsedMs) || next.elapsedMs < previous.elapsedMs) return false;
  if (nextAnswerIds.length !== previousAnswerIds.length + 1
    || previousAnswerIds.some((id) => !Object.prototype.hasOwnProperty.call(next.answers, id))
    || nextAnswerIds.some((id) => id !== currentQuestionId && !previousAnswerIds.includes(id))) return false;
  if (previousAnswerIds.some((id) => !sameValue(previous.answers[id], next.answers[id]))) return false;

  const withoutMutableFields = (attempt: ChallengeAttempt) => {
    const { answers: _answers, currentIndex: _currentIndex, elapsedMs: _elapsedMs, revision: _revision, ...stableFields } = attempt;
    return stableFields;
  };
  return sameValue(withoutMutableFields(previous), withoutMutableFields(next));
}

function validateCompleteAttempt(attempt: ChallengeAttempt): void {
  const questionIds = attempt.questions.map(({ questionId }) => questionId);
  if (attempt.questions.length === 0
    || attempt.currentIndex !== attempt.questions.length
    || new Set(questionIds).size !== questionIds.length
    || questionIds.some((id) => !Object.prototype.hasOwnProperty.call(attempt.answers, id))
    || Object.keys(attempt.answers).some((id) => !questionIds.includes(id))) {
    throw new InvalidAttemptTransitionError('A completed attempt must contain exactly one answer for every question.');
  }
}

function validateProgressUpdate(
  attempt: ChallengeAttempt,
  previous: TaskProgress | undefined,
  next: TaskProgress,
): void {
  if (next.taskId !== attempt.taskId) throw new InvalidAttemptTransitionError('Progress must belong to the completed task.');
  const correctCount = attempt.questions.reduce((count, question) => (
    count + Number(submitAnswer(question.activity, attempt.answers[question.questionId] as ChallengeAnswer))
  ), 0);
  const result = gradeAttempt(attempt.difficulty, correctCount, attempt.questions.length, attempt.elapsedMs);
  const previousHasBest = previous !== undefined && previous.bestTotal > 0;
  const improvesBest = !previousHasBest
    || result.correctCount * previous.bestTotal > previous.bestCorrect * result.totalCount;
  const expected = {
    taskId: attempt.taskId,
    bestCorrect: improvesBest ? result.correctCount : previous.bestCorrect,
    bestTotal: improvesBest ? result.totalCount : previous.bestTotal,
    latestCorrect: result.correctCount,
    latestTotal: result.totalCount,
    completedCount: (previous?.completedCount ?? 0) + 1,
    everPassed: Boolean(previous?.everPassed || result.passed),
    revision: (previous?.revision ?? 0) + 1,
  };
  const actual = {
    taskId: next.taskId,
    bestCorrect: next.bestCorrect,
    bestTotal: next.bestTotal,
    latestCorrect: next.latestCorrect,
    latestTotal: next.latestTotal,
    completedCount: next.completedCount,
    everPassed: next.everPassed,
    revision: next.revision,
  };
  if (!sameValue(actual, expected) || !Number.isFinite(Date.parse(next.updatedAt))) {
    throw new InvalidAttemptTransitionError('Progress does not match the completed attempt or prior progress revision.');
  }
}

function flattenRecentQuestionIds(record: RecentQuestionIdsRecord | undefined): string[] {
  const ids = record?.attemptQuestionIds ?? [];
  const seen = new Set<string>();
  const recent: string[] = [];
  for (const attemptIds of [...ids].reverse()) {
    for (const id of attemptIds) {
      if (seen.has(id)) continue;
      seen.add(id);
      recent.push(id);
    }
  }
  return recent;
}

function summarizeQuarantinedRecord(
  quarantineId: IDBValidKey,
  row: QuarantinedChallengeRecord,
  preparation: QuarantineRecoveryPreparation,
  overrideReason?: QuarantineRecoveryBlockReason,
): QuarantinedRecordSummary {
  if (preparation.status === 'blocked') {
    return {
      quarantineId,
      sourceStore: row.sourceStore,
      sourceKey: row.sourceKey,
      quarantinedAt: row.quarantinedAt,
      reasonCode: row.reasonCode,
      status: 'blocked',
      blockReason: preparation.reason,
    };
  }
  if (overrideReason) {
    return {
      quarantineId,
      sourceStore: row.sourceStore,
      sourceKey: row.sourceKey,
      quarantinedAt: row.quarantinedAt,
      reasonCode: row.reasonCode,
      status: 'blocked',
      blockReason: overrideReason,
      targetStore: preparation.targetStore,
      targetKey: preparation.targetKey,
    };
  }
  return {
    quarantineId,
    sourceStore: row.sourceStore,
    sourceKey: row.sourceKey,
    quarantinedAt: row.quarantinedAt,
    reasonCode: row.reasonCode,
    status: 'eligible',
    targetStore: preparation.targetStore,
    targetKey: preparation.targetKey,
  };
}

export function createChallengeRepository(options: ChallengeRepositoryOptions = {}): ChallengeRepository {
  const factory = options.factory ?? globalThis.indexedDB;
  const databaseName = options.databaseName ?? DEFAULT_DATABASE_NAME;
  let databasePromise: Promise<IDBDatabase> | undefined;
  let sanitationPromise: Promise<void> | undefined;
  let database: IDBDatabase | undefined;
  let pendingPreview: PendingQuarantinePreview | null = null;
  let previewGeneration = 0;
  let repositoryClosed = false;

  function openDatabase(): Promise<IDBDatabase> {
    if (!factory) return Promise.reject(new ChallengeRepositoryError('IndexedDB is unavailable in this browser.'));
    if (databasePromise) return databasePromise;

    let resolveOpen!: (value: IDBDatabase) => void;
    let rejectOpen!: (reason: Error) => void;
    const openingPromise = new Promise<IDBDatabase>((resolve, reject) => {
      resolveOpen = resolve;
      rejectOpen = reject;
    });
    databasePromise = openingPromise;
    let settled = false;
    let request: IDBOpenDBRequest;
    try {
      request = factory.open(databaseName, CHALLENGE_DATABASE_VERSION);
    } catch (error) {
      settled = true;
      if (databasePromise === openingPromise) databasePromise = undefined;
      rejectOpen(new ChallengeRepositoryError('Could not open the challenge database.', { cause: error }));
      return openingPromise;
    }
    request.onupgradeneeded = (event) => {
      const upgradeTransaction = request.transaction;
      if (!upgradeTransaction) throw new ChallengeRepositoryError('Could not obtain the challenge database upgrade transaction.');
      applyDatabaseMigrations(request.result, upgradeTransaction, event.oldVersion);
    };
    request.onsuccess = () => {
      const openedDatabase = request.result;
      if (settled || repositoryClosed) {
        openedDatabase.close();
        return;
      }
      settled = true;
      database = openedDatabase;
      openedDatabase.onversionchange = () => {
        openedDatabase.close();
        if (database === openedDatabase) {
          database = undefined;
          if (databasePromise === openingPromise) databasePromise = undefined;
          sanitationPromise = undefined;
          pendingPreview = null;
          previewGeneration += 1;
        }
      };
      resolveOpen(openedDatabase);
    };
    request.onerror = () => {
      if (settled) return;
      settled = true;
      if (databasePromise === openingPromise) databasePromise = undefined;
      rejectOpen(new ChallengeRepositoryError('Could not open the challenge database.', { cause: request.error }));
    };
    request.onblocked = () => {
      if (settled) return;
      settled = true;
      if (databasePromise === openingPromise) databasePromise = undefined;
      rejectOpen(new ChallengeRepositoryError('The challenge database upgrade is blocked by another open tab.'));
    };
    return openingPromise;
  }

  async function transaction<T>(
    storeNames: string | string[],
    mode: IDBTransactionMode,
    work: (tx: IDBTransaction, setResult: (value: T) => void, fail: (error: Error) => void) => void,
    options: { skipSanitation?: boolean } = {},
  ): Promise<T> {
    const db = await openDatabase();
    if (!options.skipSanitation) {
      if (!sanitationPromise) {
        sanitationPromise = quarantineInvalidRecords(db).catch((error: unknown) => {
          sanitationPromise = undefined;
          throw error;
        });
      }
      await sanitationPromise;
    }
    return new Promise<T>((resolve, reject) => {
      let tx: IDBTransaction;
      let result: T;
      let failure: Error | undefined;
      try {
        tx = db.transaction(storeNames, mode);
      } catch (error) {
        reject(new ChallengeRepositoryError('Could not start the challenge database transaction.', { cause: error }));
        return;
      }
      const fail = (error: Error) => {
        failure = error;
        try {
          tx.abort();
        } catch {
          reject(error);
        }
      };
      tx.oncomplete = () => resolve(result);
      tx.onerror = () => {
        failure ??= new ChallengeRepositoryError('The challenge database transaction failed.', { cause: tx.error });
      };
      tx.onabort = () => reject(failure ?? new ChallengeRepositoryError('The challenge database transaction was aborted.', { cause: tx.error }));
      try {
        work(tx, (value) => { result = value; }, fail);
      } catch (error) {
        fail(error instanceof Error ? error : new ChallengeRepositoryError('Unexpected challenge database error.', { cause: error }));
      }
    });
  }

  function onRequest<T>(
    request: IDBRequest<T>,
    fail: (error: Error) => void,
    onSuccess: (result: T) => void,
  ): void {
    request.onsuccess = () => onSuccess(request.result);
    request.onerror = () => fail(new ChallengeRepositoryError('A challenge database request failed.', { cause: request.error }));
  }

function readBackupSnapshot(
  tx: IDBTransaction,
  fail: (error: Error) => void,
  setResult: (value: ChallengeBackupData) => void,
): void {
  let attempts: ChallengeAttempt[] | undefined;
  let taskProgress: TaskProgress[] | undefined;
  let recentQuestionAttempts: string[][] | undefined;
  let wrongQuestions: WrongQuestionRecord[] | undefined;

  const setWhenReady = () => {
    if (attempts && taskProgress && recentQuestionAttempts && wrongQuestions) {
      setResult({ attempts, taskProgress, recentQuestionAttempts, wrongQuestions });
    }
  };

  onRequest(tx.objectStore(ATTEMPTS_STORE).getAll(), fail, (records) => {
    attempts = records as ChallengeAttempt[];
    setWhenReady();
  });
  onRequest(tx.objectStore(PROGRESS_STORE).getAll(), fail, (records) => {
    taskProgress = records as TaskProgress[];
    setWhenReady();
  });
  onRequest(tx.objectStore(META_STORE).get(RECENT_QUESTION_IDS_KEY), fail, (record) => {
    recentQuestionAttempts = (record as RecentQuestionIdsRecord | undefined)?.attemptQuestionIds ?? [];
    setWhenReady();
  });
  onRequest(tx.objectStore(WRONG_QUESTIONS_STORE).getAll(), fail, (records) => {
    wrongQuestions = records as WrongQuestionRecord[];
    setWhenReady();
  });
}

  return {
    getActiveAttempt(taskId) {
      return transaction<ChallengeAttempt | null>(ATTEMPTS_STORE, 'readonly', (tx, setResult, fail) => {
        onRequest(tx.objectStore(ATTEMPTS_STORE).get(taskId), fail, (attempt) => setResult(attempt ?? null));
      });
    },

    getRecentQuestionIds() {
      return transaction<string[]>(META_STORE, 'readonly', (tx, setResult, fail) => {
        onRequest(tx.objectStore(META_STORE).get(RECENT_QUESTION_IDS_KEY), fail, (record) => {
          setResult(flattenRecentQuestionIds(record as RecentQuestionIdsRecord | undefined));
        });
      });
    },

    getTaskProgress(taskId) {
      return transaction<TaskProgress | null>(PROGRESS_STORE, 'readonly', (tx, setResult, fail) => {
        onRequest(tx.objectStore(PROGRESS_STORE).get(taskId), fail, (progress) => setResult(progress ?? null));
      });
    },

    getAllTaskProgress() {
      return transaction<TaskProgress[]>(PROGRESS_STORE, 'readonly', (tx, setResult, fail) => {
        onRequest(tx.objectStore(PROGRESS_STORE).getAll(), fail, (progress) => setResult(progress as TaskProgress[]));
      });
    },

    getBackupSnapshot() {
      return transaction<ChallengeBackupData>(
        [ATTEMPTS_STORE, PROGRESS_STORE, META_STORE, WRONG_QUESTIONS_STORE],
        'readonly',
        (tx, setResult, fail) => readBackupSnapshot(tx, fail, setResult),
      );
    },

    mergeBackupData(imported, expectedLocal) {
      return transaction(
        [ATTEMPTS_STORE, PROGRESS_STORE, META_STORE, WRONG_QUESTIONS_STORE],
        'readwrite',
        (tx, setResult, fail) => {
          readBackupSnapshot(tx, fail, (local) => {
            if (!sameValue(local, expectedLocal)) {
              fail(new RevisionConflictError('本机闯关记录在预览后发生变化，请重新选择文件并查看最新预览。'));
              return;
            }
            try {
              const plan = mergeChallengeBackupData(local, imported);
              const attempts = tx.objectStore(ATTEMPTS_STORE);
              const progresses = tx.objectStore(PROGRESS_STORE);
              const meta = tx.objectStore(META_STORE);
              const wrongQuestions = tx.objectStore(WRONG_QUESTIONS_STORE);
              plan.data.attempts.forEach((attempt) => attempts.put(attempt));
              plan.data.taskProgress.forEach((progress) => progresses.put(progress));
              plan.data.wrongQuestions.forEach((record) => wrongQuestions.put(record));
              meta.put({ key: RECENT_QUESTION_IDS_KEY, attemptQuestionIds: plan.data.recentQuestionAttempts } satisfies RecentQuestionIdsRecord);
              setResult(plan.summary);
            } catch (error) {
              fail(error instanceof Error ? error : new ChallengeRepositoryError('Could not merge the challenge backup.', { cause: error }));
            }
          });
        },
      );
    },

    getRecoveryPoint(now = new Date().toISOString()) {
      return transaction<ChallengeRecoveryPoint | null>(META_STORE, 'readonly', (tx, setResult, fail) => {
        onRequest(tx.objectStore(META_STORE).get(RECOVERY_POINT_KEY), fail, (record) => {
          setResult(isChallengeRecoveryPointActive(record, now) ? record : null);
        });
      });
    },

    clearChallengeData(scope: ChallengeClearScope, createdAt = new Date().toISOString()) {
      let normalizedCreatedAt: string;
      try {
        normalizedCreatedAt = createChallengeRecoveryPoint({
          attempts: [], taskProgress: [], recentQuestionAttempts: [], wrongQuestions: [],
        }, createdAt).createdAt;
      } catch (error) {
        return Promise.reject(error);
      }

      return transaction<ChallengeDataClearResult>(
        [ATTEMPTS_STORE, PROGRESS_STORE, META_STORE, WRONG_QUESTIONS_STORE],
        'readwrite',
        (tx, setResult, fail) => {
          readBackupSnapshot(tx, fail, (data) => {
            if (!isChallengeBackupData(data)) {
              fail(new ChallengeRepositoryError('本机闯关记录结构异常，不能安全创建恢复点；数据没有更改。'));
              return;
            }
            const counts = getChallengeDataClearCounts(data, scope);
            if (!hasChallengeDataToClear(counts)) {
              setResult({ counts, recoveryPoint: null });
              return;
            }

            let recoveryPoint;
            try {
              recoveryPoint = createChallengeRecoveryPoint(data, normalizedCreatedAt);
            } catch (error) {
              fail(error instanceof Error ? error : new ChallengeRepositoryError('不能创建闯关恢复点；数据没有更改。', { cause: error }));
              return;
            }

            const meta = tx.objectStore(META_STORE);
            meta.put(recoveryPoint);
            if (scope === 'in-progress' || scope === 'all') tx.objectStore(ATTEMPTS_STORE).clear();
            if (scope === 'wrong-questions' || scope === 'all') tx.objectStore(WRONG_QUESTIONS_STORE).clear();
            if (scope === 'all') {
              tx.objectStore(PROGRESS_STORE).clear();
              meta.delete(RECENT_QUESTION_IDS_KEY);
            }
            const summary: ChallengeRecoveryPointSummary = {
              createdAt: recoveryPoint.createdAt,
              expiresAt: recoveryPoint.expiresAt,
            };
            setResult({ counts, recoveryPoint: summary });
          });
        },
      );
    },

    restoreRecoveryPoint(now = new Date().toISOString()) {
      return transaction(
        [ATTEMPTS_STORE, PROGRESS_STORE, META_STORE, WRONG_QUESTIONS_STORE],
        'readwrite',
        (tx, setResult, fail) => {
          let local: ChallengeBackupData | undefined;
          let point: unknown;
          let localReady = false;
          let pointReady = false;
          let scheduled = false;
          const meta = tx.objectStore(META_STORE);

          const restoreWhenRead = () => {
            if (!localReady || !pointReady || scheduled) return;
            scheduled = true;
            if (!isChallengeRecoveryPoint(point) || !isChallengeRecoveryPointActive(point, now)) {
              setResult(null);
              return;
            }
            if (!isChallengeBackupData(local)) {
              fail(new ChallengeRepositoryError('本机闯关记录结构异常，恢复已停止；数据没有更改。'));
              return;
            }

            try {
              const plan = mergeChallengeBackupData(local, point.data);
              const attempts = tx.objectStore(ATTEMPTS_STORE);
              const progresses = tx.objectStore(PROGRESS_STORE);
              const wrongQuestions = tx.objectStore(WRONG_QUESTIONS_STORE);
              plan.data.attempts.forEach((attempt) => attempts.put(attempt));
              plan.data.taskProgress.forEach((progress) => progresses.put(progress));
              plan.data.wrongQuestions.forEach((record) => wrongQuestions.put(record));
              meta.put({ key: RECENT_QUESTION_IDS_KEY, attemptQuestionIds: plan.data.recentQuestionAttempts } satisfies RecentQuestionIdsRecord);
              const recoveryPointRetained = plan.summary.preservedProgressForActiveTasks > 0;
              if (!recoveryPointRetained) meta.delete(RECOVERY_POINT_KEY);
              setResult({ summary: plan.summary, recoveryPointRetained });
            } catch (error) {
              fail(error instanceof Error ? error : new ChallengeRepositoryError('闯关恢复失败；恢复点仍保留。', { cause: error }));
            }
          };

          onRequest(meta.get(RECOVERY_POINT_KEY), fail, (record) => {
            point = record;
            pointReady = true;
            restoreWhenRead();
          });
          readBackupSnapshot(tx, fail, (data) => {
            local = data;
            localReady = true;
            restoreWhenRead();
          });
        },
      );
    },

    getGroupProgress(taskIds) {
      const ids = new Set(taskIds);
      return transaction<TaskProgress[]>(PROGRESS_STORE, 'readonly', (tx, setResult, fail) => {
        onRequest(tx.objectStore(PROGRESS_STORE).getAll(), fail, (progress) => {
          setResult((progress as TaskProgress[]).filter(({ taskId }) => ids.has(taskId)));
        });
      });
    },

    getWrongQuestions() {
      return transaction<WrongQuestionRecord[]>(WRONG_QUESTIONS_STORE, 'readonly', (tx, setResult, fail) => {
        onRequest(tx.objectStore(WRONG_QUESTIONS_STORE).getAll(), fail, (records) => {
          setResult((records as WrongQuestionRecord[]).sort((left, right) => (
            right.lastWrongAt.localeCompare(left.lastWrongAt) || left.questionId.localeCompare(right.questionId)
          )));
        });
      });
    },

    getQuarantinedRecordCount() {
      return transaction<number>(QUARANTINED_RECORDS_STORE, 'readonly', (tx, setResult, fail) => {
        onRequest(tx.objectStore(QUARANTINED_RECORDS_STORE).count(), fail, setResult);
      });
    },

    getQuarantinedRecords() {
      return transaction<QuarantinedChallengeRecord[]>(QUARANTINED_RECORDS_STORE, 'readonly', (tx, setResult, fail) => {
        onRequest(tx.objectStore(QUARANTINED_RECORDS_STORE).getAll(), fail, (records) => {
          setResult(records as QuarantinedChallengeRecord[]);
        });
      });
    },

    getQuarantinedRecordPage(afterKey) {
      return transaction<QuarantinedRecordPage>([...QUARANTINE_READ_STORES], 'readonly', (tx, setResult, fail) => {
        const store = tx.objectStore(QUARANTINED_RECORDS_STORE);
        const rows: Array<{ quarantineId: IDBValidKey; row: QuarantinedChallengeRecord }> = [];
        let cursorFinished = false;
        let pendingTargetReads = 0;
        let items: Array<QuarantinedRecordSummary | undefined> = [];
        let nextCursor: IDBValidKey | null = null;

        const finishWhenReady = () => {
          if (cursorFinished && pendingTargetReads === 0) {
            setResult({
              items: items as QuarantinedRecordSummary[],
              nextCursor,
            });
          }
        };

        const processRows = () => {
          const visibleRows = rows.slice(0, QUARANTINE_PAGE_SIZE);
          const hasMore = rows.length > QUARANTINE_PAGE_SIZE;
          items = Array(visibleRows.length);
          nextCursor = hasMore ? visibleRows[visibleRows.length - 1]?.quarantineId ?? null : null;

          visibleRows.forEach(({ quarantineId, row }, index) => {
            const candidate = {
              sourceStore: row.sourceStore,
              sourceKey: row.sourceKey,
              reasonCode: row.reasonCode,
              record: row.record,
            };
            const rowFingerprint = serializeQuarantineComparableValue({ quarantineId, row });
            const preparation = rowFingerprint === null
              ? { status: 'blocked' as const, reason: 'uncomparable-value' as const }
              : prepareQuarantinedRecordForRestore(candidate);
            if (preparation.status === 'blocked') {
              items[index] = summarizeQuarantinedRecord(quarantineId, row, preparation);
              return;
            }

            pendingTargetReads += 1;
            const targetRead = tx.objectStore(preparation.targetStore).get(preparation.targetKey);
            onRequest(targetRead, fail, (target) => {
              items[index] = summarizeQuarantinedRecord(
                quarantineId,
                row,
                preparation,
                target === undefined ? undefined : 'target-conflict',
              );
              pendingTargetReads -= 1;
              finishWhenReady();
            });
          });
          cursorFinished = true;
          finishWhenReady();
        };

        let range: IDBKeyRange | undefined;
        try {
          range = afterKey === undefined ? undefined : globalThis.IDBKeyRange.upperBound(afterKey, true);
        } catch (error) {
          fail(new ChallengeRepositoryError('The quarantine page cursor is invalid.', { cause: error }));
          return;
        }
        const cursorRequest = store.openCursor(range, 'prev');
        cursorRequest.onerror = () => fail(new ChallengeRepositoryError('Could not read quarantined challenge records.', { cause: cursorRequest.error }));
        cursorRequest.onsuccess = () => {
          const cursor = cursorRequest.result;
          if (!cursor) {
            processRows();
            return;
          }
          rows.push({ quarantineId: cursor.primaryKey, row: cursor.value as QuarantinedChallengeRecord });
          if (rows.length > QUARANTINE_PAGE_SIZE) {
            processRows();
            return;
          }
          cursor.continue();
        };
      }, { skipSanitation: true });
    },

    previewQuarantinedRecord(quarantineId, now = new Date().toISOString()) {
      pendingPreview = null;
      const generation = ++previewGeneration;
      const nowMs = Date.parse(now);
      const blockedPreview = (sourceStore: string, reason: QuarantineRecoveryBlockReason): QuarantineRecoveryPreview => ({
        status: 'blocked', quarantineId, sourceStore, reason,
      });
      if (repositoryClosed) return Promise.resolve(blockedPreview('', 'invalid-record'));
      if (!Number.isFinite(nowMs)) return Promise.resolve(blockedPreview('', 'invalid-record'));

      return transaction<QuarantineRecoveryPreview>([...QUARANTINE_READ_STORES], 'readonly', (tx, setResult, fail) => {
        onRequest(tx.objectStore(QUARANTINED_RECORDS_STORE).get(quarantineId), fail, (value) => {
          if (!value || !isRecord(value)) {
            setResult(blockedPreview('', 'invalid-record'));
            return;
          }
          const row = value as unknown as QuarantinedChallengeRecord;
          const candidate = {
            sourceStore: row.sourceStore,
            sourceKey: row.sourceKey,
            reasonCode: row.reasonCode,
            record: row.record,
          };
          const rowFingerprint = serializeQuarantineComparableValue({ quarantineId, row });
          if (rowFingerprint === null) {
            setResult(blockedPreview(row.sourceStore, 'uncomparable-value'));
            return;
          }
          const preparation = prepareQuarantinedRecordForRestore(candidate, now);
          if (preparation.status === 'blocked') {
            setResult(blockedPreview(row.sourceStore, preparation.reason));
            return;
          }

          onRequest(tx.objectStore(preparation.targetStore).get(preparation.targetKey), fail, (target) => {
            if (target !== undefined) {
              setResult(blockedPreview(row.sourceStore, 'target-conflict'));
              return;
            }
            if (generation !== previewGeneration || repositoryClosed) {
              setResult(blockedPreview(row.sourceStore, 'invalid-record'));
              return;
            }
            const expiresAtMs = Date.now() + QUARANTINE_PREVIEW_TTL_MS;
            const token = crypto.randomUUID();
            pendingPreview = {
              token,
              quarantineId,
              row,
              rowFingerprint,
              preparation,
              expiresAtMs,
            };
            setResult({
              status: 'eligible',
              quarantineId,
              sourceStore: row.sourceStore,
              sourceKey: row.sourceKey,
              token,
              targetStore: preparation.targetStore,
              targetKey: preparation.targetKey,
              normalization: preparation.normalization,
              expiresAt: new Date(expiresAtMs).toISOString(),
            });
          });
        });
      }, { skipSanitation: true });
    },

    cancelQuarantinedRecordPreview(token) {
      if (pendingPreview?.token !== token) return;
      pendingPreview = null;
      previewGeneration += 1;
    },

    confirmQuarantinedRecordRestore(token) {
      const pending = pendingPreview;
      if (!pending || pending.token !== token || Date.now() >= pending.expiresAtMs || repositoryClosed) {
        if (pending?.token === token) pendingPreview = null;
        return Promise.resolve({ status: 'stale-preview' });
      }
      pendingPreview = null;
      previewGeneration += 1;

      return transaction<QuarantineRestoreResult>(
        [QUARANTINED_RECORDS_STORE, pending.preparation.targetStore],
        'readwrite',
        (tx, setResult, fail) => {
          const quarantineStore = tx.objectStore(QUARANTINED_RECORDS_STORE);
          onRequest(quarantineStore.get(pending.quarantineId), fail, (value) => {
            if (!value || !isRecord(value)) {
              setResult({ status: 'stale-preview' });
              return;
            }
            const row = value as unknown as QuarantinedChallengeRecord;
            const rowFingerprint = serializeQuarantineComparableValue({ quarantineId: pending.quarantineId, row });
            if (rowFingerprint === null || rowFingerprint !== pending.rowFingerprint) {
              setResult({ status: 'stale-preview' });
              return;
            }
            const preparation = prepareQuarantinedRecordForRestore({
              sourceStore: row.sourceStore,
              sourceKey: row.sourceKey,
              reasonCode: row.reasonCode,
              record: row.record,
            });
            if (preparation.status !== 'eligible'
              || preparation.targetStore !== pending.preparation.targetStore
              || preparation.targetKey !== pending.preparation.targetKey) {
              setResult({ status: 'stale-preview' });
              return;
            }

            const targetStore = tx.objectStore(preparation.targetStore);
            onRequest(targetStore.get(preparation.targetKey), fail, (target) => {
              if (target !== undefined) {
                setResult({ status: 'target-conflict' });
                return;
              }

              let addRequest: IDBRequest<IDBValidKey>;
              try {
                addRequest = targetStore.add(preparation.record) as IDBRequest<IDBValidKey>;
              } catch (error) {
                fail(new ChallengeRepositoryError('Could not restore the quarantined challenge record.', { cause: error }));
                return;
              }
              onRequest(addRequest, fail, () => {
                let deleteRequest: IDBRequest<undefined>;
                try {
                  deleteRequest = quarantineStore.delete(pending.quarantineId);
                } catch (error) {
                  fail(new ChallengeRepositoryError('Could not remove the restored quarantine copy.', { cause: error }));
                  return;
                }
                onRequest(deleteRequest, fail, () => setResult({ status: 'restored' }));
              });
            });
          });
        },
        { skipSanitation: true },
      );
    },

    beginAttempt(attempt) {
      if (!isValidInitialAttempt(attempt)) {
        return Promise.reject(new InvalidAttemptTransitionError('A new attempt must start at revision zero with no saved answers.'));
      }
      return transaction<void>(ATTEMPTS_STORE, 'readwrite', (tx, _setResult, fail) => {
        const store = tx.objectStore(ATTEMPTS_STORE);
        onRequest(store.get(attempt.taskId), fail, (existing) => {
          if (existing) {
            fail(new ActiveAttemptExistsError(attempt.taskId));
            return;
          }
          store.add(attempt);
        });
      });
    },

    saveAnswer(taskId, expectedRevision, nextAttempt) {
      if (!Number.isInteger(expectedRevision) || expectedRevision < 0
        || nextAttempt.taskId !== taskId || nextAttempt.revision !== expectedRevision + 1) {
        return Promise.reject(new InvalidAttemptTransitionError('The next answer must match the task and increment revision exactly once.'));
      }
      return transaction<ChallengeAttempt>(ATTEMPTS_STORE, 'readwrite', (tx, setResult, fail) => {
        const store = tx.objectStore(ATTEMPTS_STORE);
        onRequest(store.get(taskId), fail, (existing) => {
          const current = existing as ChallengeAttempt | undefined;
          if (!current || current.status !== 'in-progress' || current.revision !== expectedRevision) {
            fail(new RevisionConflictError());
            return;
          }
          if (!isValidNextAnswer(current, nextAttempt, taskId, expectedRevision)) {
            fail(new InvalidAttemptTransitionError('The saved attempt may add only the current question’s first answer.'));
            return;
          }
          store.put(nextAttempt);
          setResult(nextAttempt);
        });
      });
    },

    completeAttempt(taskId, expectedRevision, completedAttempt, progress) {
      if (!Number.isInteger(expectedRevision) || expectedRevision < 0
        || taskId !== completedAttempt.taskId
        || completedAttempt.status !== 'completed'
        || completedAttempt.revision !== expectedRevision) {
        return Promise.reject(new InvalidAttemptTransitionError('Completion status, identity, and revision must match the last saved attempt.'));
      }
      try {
        validateCompleteAttempt(completedAttempt);
      } catch (error) {
        return Promise.reject(error);
      }
      return transaction<void>([ATTEMPTS_STORE, PROGRESS_STORE, META_STORE, WRONG_QUESTIONS_STORE], 'readwrite', (tx, _setResult, fail) => {
        const attempts = tx.objectStore(ATTEMPTS_STORE);
        const progresses = tx.objectStore(PROGRESS_STORE);
        const meta = tx.objectStore(META_STORE);
        const wrongQuestions = tx.objectStore(WRONG_QUESTIONS_STORE);
        let activeReady = false;
        let progressReady = false;
        let recentReady = false;
        let commitScheduled = false;
        let active: ChallengeAttempt | undefined;
        let previousProgress: TaskProgress | undefined;
        let recent: RecentQuestionIdsRecord | undefined;

        const commitWhenRead = () => {
          if (!activeReady || !progressReady || !recentReady || commitScheduled) return;
          commitScheduled = true;
          if (!active || active.status !== 'in-progress' || active.revision !== expectedRevision) {
            fail(new RevisionConflictError());
            return;
          }
          if (!sameValue({ ...active, status: 'completed' }, completedAttempt)) {
            fail(new InvalidAttemptTransitionError('The completed snapshot must exactly match the last saved attempt.'));
            return;
          }
          try {
            validateProgressUpdate(active, previousProgress, progress);
          } catch (error) {
            fail(error instanceof Error ? error : new InvalidAttemptTransitionError('Invalid task progress update.'));
            return;
          }
          const attemptQuestionIds = active.questions.map(({ questionId }) => questionId);
          const attemptQuestionIdsByCompletion = [...(recent?.attemptQuestionIds ?? []), attemptQuestionIds].slice(-MAX_RECENT_ATTEMPTS);
          onRequest(wrongQuestions.getAll(), fail, (records) => {
            const previousById = new Map((records as WrongQuestionRecord[]).map((record) => [record.questionId, record]));
            for (const question of active!.questions) {
              const previous = previousById.get(question.questionId);
              const updated = transitionWrongQuestion(
                previous,
                question,
                active!.answers[question.questionId] as ChallengeAnswer,
                progress.updatedAt,
              );
              if (updated && updated !== previous) wrongQuestions.put(updated);
            }
            progresses.put(progress);
            meta.put({ key: RECENT_QUESTION_IDS_KEY, attemptQuestionIds: attemptQuestionIdsByCompletion } satisfies RecentQuestionIdsRecord);
            attempts.delete(taskId);
          });
        };

        onRequest(attempts.get(taskId), fail, (value) => {
          active = value as ChallengeAttempt | undefined;
          activeReady = true;
          commitWhenRead();
        });
        onRequest(progresses.get(taskId), fail, (value) => {
          previousProgress = value as TaskProgress | undefined;
          progressReady = true;
          commitWhenRead();
        });
        onRequest(meta.get(RECENT_QUESTION_IDS_KEY), fail, (value) => {
          recent = value as RecentQuestionIdsRecord | undefined;
          recentReady = true;
          commitWhenRead();
        });
      });
    },

    discardAttempt(taskId, expectedRevision) {
      if (!Number.isInteger(expectedRevision) || expectedRevision < 0) {
        return Promise.reject(new InvalidAttemptTransitionError('expectedRevision must be a non-negative integer.'));
      }
      return transaction<void>(ATTEMPTS_STORE, 'readwrite', (tx, _setResult, fail) => {
        const store = tx.objectStore(ATTEMPTS_STORE);
        onRequest(store.get(taskId), fail, (existing) => {
          const current = existing as ChallengeAttempt | undefined;
          if (!current || current.status !== 'in-progress' || current.revision !== expectedRevision) {
            fail(new RevisionConflictError());
            return;
          }
          store.delete(taskId);
        });
      });
    },

    close() {
      repositoryClosed = true;
      pendingPreview = null;
      previewGeneration += 1;
      database?.close();
      database = undefined;
      databasePromise = undefined;
      sanitationPromise = undefined;
    },
  };
}
