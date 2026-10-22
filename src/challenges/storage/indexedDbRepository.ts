import { submitAnswer } from '../../learning/answers';
import { isChallengeBackupData } from '../domain/backup';
import type { ChallengeBackupData } from '../domain/backup';
import { mergeChallengeBackupData } from '../domain/backupMerge';
import { gradeAttempt } from '../domain/grading';
import type { ChallengeAnswer, ChallengeAttempt, TaskProgress, WrongQuestionRecord } from '../domain/types';
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
import type { ChallengeRepository, ChallengeRepositoryOptions } from './repository';
import { transitionWrongQuestion } from '../domain/wrongQuestions';

export const CHALLENGE_DATABASE_VERSION = 2;
const DEFAULT_DATABASE_NAME = 'starry-island-challenges';
const ATTEMPTS_STORE = 'attempts';
const PROGRESS_STORE = 'taskProgress';
const META_STORE = 'challengeMeta';
const WRONG_QUESTIONS_STORE = 'wrongQuestions';
const RECENT_QUESTION_IDS_KEY = 'recent-question-ids';
const RECOVERY_POINT_KEY = 'recovery-point';
const MAX_RECENT_ATTEMPTS = 3;

interface RecentQuestionIdsRecord {
  key: typeof RECENT_QUESTION_IDS_KEY;
  attemptQuestionIds: string[][];
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

export function createChallengeRepository(options: ChallengeRepositoryOptions = {}): ChallengeRepository {
  const factory = options.factory ?? globalThis.indexedDB;
  const databaseName = options.databaseName ?? DEFAULT_DATABASE_NAME;
  let databasePromise: Promise<IDBDatabase> | undefined;
  let database: IDBDatabase | undefined;

  function openDatabase(): Promise<IDBDatabase> {
    if (!factory) return Promise.reject(new ChallengeRepositoryError('IndexedDB is unavailable in this browser.'));
    if (databasePromise) return databasePromise;

    databasePromise = new Promise((resolve, reject) => {
      let request: IDBOpenDBRequest;
      try {
        request = factory.open(databaseName, CHALLENGE_DATABASE_VERSION);
      } catch (error) {
        reject(new ChallengeRepositoryError('Could not open the challenge database.', { cause: error }));
        return;
      }
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(ATTEMPTS_STORE)) db.createObjectStore(ATTEMPTS_STORE, { keyPath: 'taskId' });
        if (!db.objectStoreNames.contains(PROGRESS_STORE)) db.createObjectStore(PROGRESS_STORE, { keyPath: 'taskId' });
        if (!db.objectStoreNames.contains(META_STORE)) db.createObjectStore(META_STORE, { keyPath: 'key' });
        if (!db.objectStoreNames.contains(WRONG_QUESTIONS_STORE)) db.createObjectStore(WRONG_QUESTIONS_STORE, { keyPath: 'questionId' });
      };
      request.onsuccess = () => {
        database = request.result;
        database.onversionchange = () => {
          database?.close();
          database = undefined;
          databasePromise = undefined;
        };
        resolve(request.result);
      };
      request.onerror = () => {
        databasePromise = undefined;
        reject(new ChallengeRepositoryError('Could not open the challenge database.', { cause: request.error }));
      };
      request.onblocked = () => {
        databasePromise = undefined;
        reject(new ChallengeRepositoryError('The challenge database upgrade is blocked by another open tab.'));
      };
    });
    return databasePromise;
  }

  async function transaction<T>(
    storeNames: string | string[],
    mode: IDBTransactionMode,
    work: (tx: IDBTransaction, setResult: (value: T) => void, fail: (error: Error) => void) => void,
  ): Promise<T> {
    const db = await openDatabase();
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
      database?.close();
      database = undefined;
      databasePromise = undefined;
    },
  };
}
