import type { ChallengeBackupData } from './backup';
import type { TaskProgress, WrongQuestionRecord } from './types';

export interface ChallengeBackupMergeSummary {
  addedActiveAttempts: number;
  preservedLocalActiveAttempts: number;
  preservedProgressForActiveTasks: number;
  addedProgressRecords: number;
  mergedProgressRecords: number;
  addedWrongQuestions: number;
  mergedWrongQuestions: number;
}

export interface ChallengeBackupMergePlan {
  data: ChallengeBackupData;
  summary: ChallengeBackupMergeSummary;
}

function ratio(correct: number, total: number): number {
  return total > 0 ? correct / total : 0;
}

function newerProgress(local: TaskProgress, imported: TaskProgress): TaskProgress {
  const best = ratio(imported.bestCorrect, imported.bestTotal) > ratio(local.bestCorrect, local.bestTotal)
    ? imported
    : local;
  const localIsNewer = Date.parse(local.updatedAt) >= Date.parse(imported.updatedAt);
  const latest = localIsNewer ? local : imported;
  const latestTieWinner = localIsNewer && local.updatedAt === imported.updatedAt
    && ratio(imported.latestCorrect, imported.latestTotal) > ratio(local.latestCorrect, local.latestTotal)
    ? imported
    : latest;

  return {
    taskId: local.taskId,
    bestCorrect: best.bestCorrect,
    bestTotal: best.bestTotal,
    latestCorrect: latestTieWinner.latestCorrect,
    latestTotal: latestTieWinner.latestTotal,
    completedCount: Math.max(local.completedCount, imported.completedCount),
    everPassed: local.everPassed || imported.everPassed,
    updatedAt: latestTieWinner.updatedAt,
    revision: Math.max(local.revision, imported.revision),
  };
}

function activityTimestamp(record: WrongQuestionRecord): number {
  return Math.max(
    Date.parse(record.lastWrongAt),
    record.lastCorrectAt ? Date.parse(record.lastCorrectAt) : 0,
    record.masteredAt ? Date.parse(record.masteredAt) : 0,
  );
}

function mergeWrongQuestion(local: WrongQuestionRecord, imported: WrongQuestionRecord): WrongQuestionRecord {
  const latestWrong = Date.parse(local.lastWrongAt) >= Date.parse(imported.lastWrongAt) ? local : imported;
  const localStateIsNewer = activityTimestamp(local) >= activityTimestamp(imported);
  const state = localStateIsNewer ? local : imported;
  const stateTieWinner = activityTimestamp(local) === activityTimestamp(imported)
    && imported.correctAttemptStreak > local.correctAttemptStreak
    ? imported
    : state;
  const correctAttemptStreak = stateTieWinner.correctAttemptStreak;

  return {
    questionId: local.questionId,
    question: latestWrong.question,
    wrongCount: Math.max(local.wrongCount, imported.wrongCount),
    lastWrongAt: latestWrong.lastWrongAt,
    correctAttemptStreak,
    ...(stateTieWinner.lastCorrectAt ? { lastCorrectAt: stateTieWinner.lastCorrectAt } : {}),
    ...(correctAttemptStreak === 2 && stateTieWinner.masteredAt ? { masteredAt: stateTieWinner.masteredAt } : {}),
  };
}

function sameQuestionAttempt(left: readonly string[], right: readonly string[]): boolean {
  return left.length === right.length && left.every((id, index) => id === right[index]);
}

function mergeRecentAttempts(local: string[][], imported: string[][]): string[][] {
  const localUnique: string[][] = [];
  for (const attempt of local) {
    if (!localUnique.some((candidate) => sameQuestionAttempt(attempt, candidate))) localUnique.push(attempt);
  }
  const importedUnique: string[][] = [];
  for (const attempt of imported) {
    if (localUnique.some((candidate) => sameQuestionAttempt(attempt, candidate))) continue;
    if (!importedUnique.some((candidate) => sameQuestionAttempt(attempt, candidate))) importedUnique.push(attempt);
  }
  return [...importedUnique, ...localUnique].slice(-3).map((attempt) => [...attempt]);
}

export function mergeChallengeBackupData(
  local: ChallengeBackupData,
  imported: ChallengeBackupData,
): ChallengeBackupMergePlan {
  const localAttemptsByTask = new Map(local.attempts.map((attempt) => [attempt.taskId, attempt]));
  const attempts = [...local.attempts];
  let addedActiveAttempts = 0;
  let preservedLocalActiveAttempts = 0;
  for (const attempt of imported.attempts) {
    if (localAttemptsByTask.has(attempt.taskId)) {
      preservedLocalActiveAttempts += 1;
      continue;
    }
    localAttemptsByTask.set(attempt.taskId, attempt);
    attempts.push(attempt);
    addedActiveAttempts += 1;
  }

  const localProgressByTask = new Map(local.taskProgress.map((progress) => [progress.taskId, progress]));
  const localActiveTaskIds = new Set(local.attempts.map((attempt) => attempt.taskId));
  const taskProgress = [...local.taskProgress];
  let preservedProgressForActiveTasks = 0;
  let addedProgressRecords = 0;
  let mergedProgressRecords = 0;
  for (const progress of imported.taskProgress) {
    if (localActiveTaskIds.has(progress.taskId)) {
      preservedProgressForActiveTasks += 1;
      continue;
    }
    const current = localProgressByTask.get(progress.taskId);
    if (!current) {
      localProgressByTask.set(progress.taskId, progress);
      taskProgress.push(progress);
      addedProgressRecords += 1;
      continue;
    }
    const merged = newerProgress(current, progress);
    localProgressByTask.set(progress.taskId, merged);
    taskProgress[taskProgress.findIndex(({ taskId }) => taskId === progress.taskId)] = merged;
    mergedProgressRecords += 1;
  }

  const localWrongById = new Map(local.wrongQuestions.map((record) => [record.questionId, record]));
  const wrongQuestions = [...local.wrongQuestions];
  let addedWrongQuestions = 0;
  let mergedWrongQuestions = 0;
  for (const record of imported.wrongQuestions) {
    const current = localWrongById.get(record.questionId);
    if (!current) {
      localWrongById.set(record.questionId, record);
      wrongQuestions.push(record);
      addedWrongQuestions += 1;
      continue;
    }
    const merged = mergeWrongQuestion(current, record);
    localWrongById.set(record.questionId, merged);
    wrongQuestions[wrongQuestions.findIndex(({ questionId }) => questionId === record.questionId)] = merged;
    mergedWrongQuestions += 1;
  }

  return {
    data: {
      attempts,
      taskProgress,
      recentQuestionAttempts: mergeRecentAttempts(local.recentQuestionAttempts, imported.recentQuestionAttempts),
      wrongQuestions,
    },
    summary: {
      addedActiveAttempts,
      preservedLocalActiveAttempts,
      preservedProgressForActiveTasks,
      addedProgressRecords,
      mergedProgressRecords,
      addedWrongQuestions,
      mergedWrongQuestions,
    },
  };
}
