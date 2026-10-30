import { curriculumManifest } from '../content/curriculumManifest';
import { getAssumedCompletedSessionIds, getRegisteredLearningPositions } from '../achievements/position';
import type { LearningPosition } from '../achievements/position';

export interface ProgressState {
  schemaVersion: 4;
  completedSessionIds: string[];
  recentCompletions: RecentCompletion[];
  learningStart: LearningPosition | null;
}

export interface RecentCompletion {
  sessionId: string;
  completedAt: string;
}

const STORAGE_KEY = 'china-study-progress-v1';
const GRADE_2_TERM_1_MATH_MIGRATION_KEY = 'starry-island-migration-grade-2-term-1-math-v1';
const GRADE_2_TERM_1_MATH_MIGRATION_PENDING_NOTICE = 'complete-v1:notice-pending';
const GRADE_2_TERM_1_MATH_MIGRATION_COMPLETE = 'complete-v1';
const GRADE_2_TERM_1_MATH_SESSION_PREFIX = 'grade-2/term-1/math/';
const MAX_RECENT_COMPLETIONS = 20;
let memoryProgress: ProgressState = createEmptyProgress();

function createEmptyProgress(): ProgressState {
  return { schemaVersion: 4, completedSessionIds: [], recentCompletions: [], learningStart: null };
}

function copyProgress(progress: ProgressState): ProgressState {
  return {
    ...progress,
    schemaVersion: 4,
    completedSessionIds: [...progress.completedSessionIds],
    recentCompletions: progress.recentCompletions.map((completion) => ({ ...completion })),
    learningStart: progress.learningStart ? { ...progress.learningStart } : null,
  };
}

function getCurrentSessionIds(): Set<string> {
  return new Set(Object.values(curriculumManifest.units).flatMap((unit) => Object.values(unit.sessionIds).flat()));
}

function parseLearningStart(value: unknown): LearningPosition | null {
  if (value === null || value === undefined) return null;
  if (!value || typeof value !== 'object') return null;
  const position = value as { grade?: unknown; term?: unknown; unit?: unknown };
  if (!Number.isInteger(position.grade) || Number(position.grade) < 1 || Number(position.grade) > 6
    || (position.term !== 1 && position.term !== 2)
    || !Number.isSafeInteger(position.unit) || Number(position.unit) < 1) return null;
  return { grade: Number(position.grade), term: position.term, unit: Number(position.unit) };
}

function isCanonicalIsoDateTime(value: unknown): value is string {
  if (typeof value !== 'string') return false;
  const timestamp = Date.parse(value);
  return Number.isFinite(timestamp) && new Date(timestamp).toISOString() === value;
}

function parseProgress(value: unknown): ProgressState | null {
  if (!value || typeof value !== 'object') return null;
  const candidate = value as {
    schemaVersion?: unknown;
    completedSessionIds?: unknown;
    recentCompletions?: unknown;
    learningStart?: unknown;
  };
  if ((candidate.schemaVersion !== 1 && candidate.schemaVersion !== 2 && candidate.schemaVersion !== 3 && candidate.schemaVersion !== 4)
    || !Array.isArray(candidate.completedSessionIds)) return null;
  if (candidate.schemaVersion === 4 && !Array.isArray(candidate.recentCompletions)) return null;

  const currentSessionIds = getCurrentSessionIds();
  const completedSessionIds = [...new Set(candidate.completedSessionIds.filter((id): id is string => (
    typeof id === 'string' && currentSessionIds.has(id)
  )))];
  const learningStart = parseLearningStart(candidate.learningStart);
  if (candidate.learningStart !== null && candidate.learningStart !== undefined && learningStart === null) return null;

  const recentCompletions = candidate.schemaVersion === 4
    ? (candidate.recentCompletions as unknown[])
      .flatMap((entry): RecentCompletion[] => {
        if (!entry || typeof entry !== 'object') return [];
        const completion = entry as { sessionId?: unknown; completedAt?: unknown };
        if (typeof completion.sessionId !== 'string'
          || !currentSessionIds.has(completion.sessionId)
          || !isCanonicalIsoDateTime(completion.completedAt)) return [];
        return [{ sessionId: completion.sessionId, completedAt: completion.completedAt }];
      })
      .sort((left, right) => Date.parse(right.completedAt) - Date.parse(left.completedAt))
      .slice(0, MAX_RECENT_COMPLETIONS)
    : [];

  return { ...candidate, schemaVersion: 4, completedSessionIds, recentCompletions, learningStart };
}

export function loadProgress(): ProgressState {
  try {
    if (typeof window === 'undefined') return copyProgress(memoryProgress);
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === null) return copyProgress(memoryProgress);
    const parsed = parseProgress(JSON.parse(raw) as unknown);
    if (!parsed) {
      memoryProgress = createEmptyProgress();
      window.localStorage.removeItem(STORAGE_KEY);
      return copyProgress(memoryProgress);
    }
    memoryProgress = parsed;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
    return copyProgress(memoryProgress);
  } catch {
    return copyProgress(memoryProgress);
  }
}

/**
 * Removes legacy Grade 2 Term 1 Math completion events once, before the new
 * textbook curriculum is mounted. The progress value is rewritten first and
 * the marker second so a failed marker write can safely retry the same filter.
 */
export function migrateGrade2Term1MathProgress(): 'migrated' | 'already-migrated' {
  if (typeof window === 'undefined') throw new Error('Progress migration requires browser storage.');

  const migrationMarker = window.localStorage.getItem(GRADE_2_TERM_1_MATH_MIGRATION_KEY);
  if (migrationMarker === GRADE_2_TERM_1_MATH_MIGRATION_COMPLETE
    || migrationMarker === GRADE_2_TERM_1_MATH_MIGRATION_PENDING_NOTICE) {
    return 'already-migrated';
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw !== null) {
    let value: unknown;
    try {
      value = JSON.parse(raw) as unknown;
    } catch (error) {
      throw new Error('Saved learning progress could not be read; migration was not applied.', { cause: error });
    }
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
      throw new Error('Saved learning progress has an unsupported format; migration was not applied.');
    }
    const record = value as Record<string, unknown>;
    if (!Array.isArray(record.completedSessionIds)) {
      throw new Error('Saved learning progress has no completion list; migration was not applied.');
    }

    const completedSessionIds = record.completedSessionIds.filter((id) => (
      typeof id !== 'string' || !id.startsWith(GRADE_2_TERM_1_MATH_SESSION_PREFIX)
    ));
    let recentCompletions = record.recentCompletions;
    if (Array.isArray(recentCompletions)) {
      recentCompletions = recentCompletions.filter((entry) => {
        if (!entry || typeof entry !== 'object' || Array.isArray(entry)) return true;
        const sessionId = (entry as Record<string, unknown>).sessionId;
        return typeof sessionId !== 'string' || !sessionId.startsWith(GRADE_2_TERM_1_MATH_SESSION_PREFIX);
      });
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({
      ...record,
      completedSessionIds,
      ...(Array.isArray(record.recentCompletions) ? { recentCompletions } : {}),
    }));
  }

  window.localStorage.setItem(GRADE_2_TERM_1_MATH_MIGRATION_KEY, GRADE_2_TERM_1_MATH_MIGRATION_PENDING_NOTICE);
  return 'migrated';
}

export function hasPendingGrade2Term1MathMigrationNotice(): boolean {
  return typeof window !== 'undefined'
    && window.localStorage.getItem(GRADE_2_TERM_1_MATH_MIGRATION_KEY) === GRADE_2_TERM_1_MATH_MIGRATION_PENDING_NOTICE;
}

export function acknowledgeGrade2Term1MathMigrationNotice(): void {
  if (typeof window === 'undefined') return;
  if (hasPendingGrade2Term1MathMigrationNotice()) {
    window.localStorage.setItem(GRADE_2_TERM_1_MATH_MIGRATION_KEY, GRADE_2_TERM_1_MATH_MIGRATION_COMPLETE);
  }
}

export function saveProgress(progress: ProgressState): ProgressState {
  const normalized = parseProgress(progress) ?? createEmptyProgress();
  memoryProgress = normalized;
  try {
    if (typeof window !== 'undefined') window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
  } catch {
    // Keep this session's progress in memory when browser storage is unavailable.
  }
  return copyProgress(memoryProgress);
}

export function completeSession(progress: ProgressState, sessionId: string, completedAt = new Date().toISOString()): ProgressState {
  if (!sessionId.trim() || !getCurrentSessionIds().has(sessionId) || !isCanonicalIsoDateTime(completedAt)) return saveProgress(progress);
  return saveProgress({
    ...progress,
    schemaVersion: 4,
    completedSessionIds: [...new Set([...progress.completedSessionIds, sessionId])],
    recentCompletions: [...progress.recentCompletions, { sessionId, completedAt }],
    learningStart: progress.learningStart,
  });
}

export function setLearningStart(startAt: LearningPosition): ProgressState {
  const isRegistered = getRegisteredLearningPositions().some((position) => (
    position.grade === startAt.grade && position.term === startAt.term && position.unit === startAt.unit
  ));
  if (!isRegistered) return loadProgress();
  const progress = loadProgress();
  return saveProgress({
    ...progress,
    completedSessionIds: getAssumedCompletedSessionIds(startAt),
    learningStart: startAt,
  });
}
