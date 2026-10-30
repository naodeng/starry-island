import { beforeEach, describe, expect, it, vi } from 'vitest';
import { curriculum } from '../content/curriculum';
import { getSessionsForDifficulty } from '../content/sessionUtils';
import { completeSession, loadProgress, migrateGrade2Term1MathProgress, saveProgress, setLearningStart } from './progress';
import type { ProgressState } from './progress';

const STORAGE_KEY = 'china-study-progress-v1';
const unit01 = curriculum.units['grade-2/term-1/chinese/unit-01'];
const unit02 = curriculum.units['grade-2/term-1/chinese/unit-02'];
const currentSessionId = getSessionsForDifficulty(unit01, 'basic')[0].id;
const laterSessionId = getSessionsForDifficulty(unit02, 'basic')[0].id;
const grade2Term1MathSessionId = getSessionsForDifficulty(curriculum.units['grade-2/term-1/math/unit-02'], 'basic')[0].id;
const grade2Term2MathSessionId = getSessionsForDifficulty(curriculum.units['grade-2/term-2/math/unit-01'], 'basic')[0].id;
const emptyProgress: ProgressState = { schemaVersion: 4, completedSessionIds: [], recentCompletions: [], learningStart: null };

describe('progress storage', () => {
  beforeEach(() => {
    window.localStorage.clear();
    saveProgress(emptyProgress);
    window.localStorage.clear();
  });

  it('migratesV1V2AndV3WithoutInventingRecentCompletionTimes', () => {
    const legacyRecords = [
      { schemaVersion: 1, completedSessionIds: [currentSessionId, 'grade-2/term-1/chinese/unit-01/session-01'] },
      { schemaVersion: 2, completedSessionIds: [currentSessionId], learningStart: { grade: 2, term: 1, unit: 2 } },
      { schemaVersion: 3, completedSessionIds: [currentSessionId], learningStart: null },
    ];

    for (const legacy of legacyRecords) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(legacy));
      const migrated = loadProgress();

      expect(migrated.schemaVersion).toBe(4);
      expect(migrated.completedSessionIds).toEqual([currentSessionId]);
      expect(migrated.recentCompletions).toEqual([]);
      expect(migrated.learningStart).toEqual(legacy.schemaVersion === 2 ? { grade: 2, term: 1, unit: 2 } : null);
      expect(JSON.parse(window.localStorage.getItem(STORAGE_KEY)!)).toMatchObject({ schemaVersion: 4, recentCompletions: [] });
    }
  });

  it('preservesValidSchema4RecentCompletionsAndDropsInvalidEntries', () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({
      schemaVersion: 4,
      completedSessionIds: [currentSessionId],
      recentCompletions: [
        { sessionId: currentSessionId, completedAt: '2026-10-24T01:02:03.000Z' },
        null,
        42,
        { sessionId: 'removed/session', completedAt: '2026-10-24T01:02:03.000Z' },
        { sessionId: currentSessionId, completedAt: 'yesterday' },
        { sessionId: currentSessionId, completedAt: 42 },
      ],
      learningStart: null,
    }));

    expect(loadProgress().recentCompletions).toEqual([
      { sessionId: currentSessionId, completedAt: '2026-10-24T01:02:03.000Z' },
    ]);
  });

  it('ignoresLegacyCompletionsForNewSessions', () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({
      schemaVersion: 2,
      completedSessionIds: ['grade-2/term-1/chinese/unit-01/session-01', currentSessionId],
      learningStart: null,
    }));

    expect(loadProgress().completedSessionIds).toEqual([currentSessionId]);
  });

  it('fallsBackOnCorruptOrUnavailableStorage', () => {
    window.localStorage.setItem(STORAGE_KEY, '{not json');
    expect(loadProgress()).toEqual(emptyProgress);

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ schemaVersion: 99, completedSessionIds: [] }));
    expect(loadProgress()).toEqual(emptyProgress);
    expect(window.localStorage.getItem(STORAGE_KEY)).toBeNull();

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({
      schemaVersion: 4,
      completedSessionIds: [currentSessionId],
      recentCompletions: [],
      learningStart: { grade: 2, term: 1, unit: 0.5 },
    }));
    expect(loadProgress()).toEqual(emptyProgress);

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({
      schemaVersion: 4,
      completedSessionIds: [],
      recentCompletions: [],
      learningStart: { grade: 2, term: 1, unit: 0 },
    }));
    expect(loadProgress().learningStart).toBeNull();

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ schemaVersion: 4, completedSessionIds: [], recentCompletions: [], learningStart: 'invalid' }));
    expect(loadProgress()).toEqual(emptyProgress);

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ schemaVersion: 4, completedSessionIds: [], recentCompletions: [], learningStart: { grade: 7, term: 1, unit: 1 } }));
    expect(loadProgress().learningStart).toBeNull();

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ schemaVersion: 4, completedSessionIds: [], recentCompletions: [], learningStart: { grade: 2, term: 3, unit: 1 } }));
    expect(loadProgress().learningStart).toBeNull();

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ schemaVersion: 4, completedSessionIds: null, recentCompletions: [], learningStart: null }));
    expect(loadProgress()).toEqual(emptyProgress);

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ schemaVersion: 4, completedSessionIds: [], recentCompletions: null, learningStart: null }));
    expect(loadProgress()).toEqual(emptyProgress);

    window.localStorage.setItem(STORAGE_KEY, 'null');
    expect(loadProgress()).toEqual(emptyProgress);

    const getItem = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('storage blocked'); });
    expect(loadProgress()).toEqual(emptyProgress);
    getItem.mockRestore();
  });

  it('usesInMemoryProgressWhenStorageIsMissingOrUnavailable', () => {
    const expected = saveProgress({ ...emptyProgress, completedSessionIds: [currentSessionId] });
    window.localStorage.clear();
    expect(loadProgress()).toEqual(expected);

    vi.stubGlobal('window', undefined);
    try {
      expect(loadProgress()).toEqual(expected);
      expect(saveProgress(emptyProgress)).toEqual(emptyProgress);
    } finally {
      vi.unstubAllGlobals();
    }
  });

  it('keepsSavedProgressInMemoryWhenStorageWritesFail', () => {
    const setItem = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('storage blocked'); });
    const next = saveProgress({ ...emptyProgress, completedSessionIds: [currentSessionId] });
    expect(next.completedSessionIds).toEqual([currentSessionId]);
    setItem.mockRestore();
  });

  it('rejectsInvalidProgressShapesWhenSaving', () => {
    const invalid = saveProgress({ ...emptyProgress, completedSessionIds: null } as unknown as Parameters<typeof saveProgress>[0]);
    expect(invalid).toEqual(emptyProgress);
  });

  it('recordsCompletionTimeForARegisteredSession', () => {
    const completedAt = '2026-10-24T01:02:03.000Z';
    const next = completeSession(emptyProgress, currentSessionId, completedAt);

    expect(next).toEqual({
      ...emptyProgress,
      completedSessionIds: [currentSessionId],
      recentCompletions: [{ sessionId: currentSessionId, completedAt }],
    });
    expect(JSON.parse(window.localStorage.getItem(STORAGE_KEY)!)).toMatchObject({
      schemaVersion: 4,
      recentCompletions: [{ sessionId: currentSessionId, completedAt }],
    });
  });

  it('keepsCompletionIdsUniqueWhenACompletedSessionIsRepeated', () => {
    const once = completeSession(emptyProgress, currentSessionId, '2026-10-24T01:02:03.000Z');
    const twice = completeSession(once, currentSessionId, '2026-10-24T01:03:03.000Z');

    expect(twice.completedSessionIds).toEqual([currentSessionId]);
    expect(twice.recentCompletions).toEqual([
      { sessionId: currentSessionId, completedAt: '2026-10-24T01:03:03.000Z' },
      { sessionId: currentSessionId, completedAt: '2026-10-24T01:02:03.000Z' },
    ]);
  });

  it('keepsOnlyTheMostRecentTwentyCompletionEvents', () => {
    let progress = emptyProgress;
    for (let index = 0; index < 25; index += 1) {
      const completedAt = new Date(Date.UTC(2026, 0, 1, 0, index)).toISOString();
      progress = completeSession(progress, currentSessionId, completedAt);
    }

    expect(progress.recentCompletions).toHaveLength(20);
    expect(progress.recentCompletions[0]?.completedAt).toBe(new Date(Date.UTC(2026, 0, 1, 0, 24)).toISOString());
    expect(progress.recentCompletions.at(-1)?.completedAt).toBe(new Date(Date.UTC(2026, 0, 1, 0, 5)).toISOString());
  });

  it('rejectsUnknownSessionsAndInvalidEventTimes', () => {
    expect(completeSession(emptyProgress, 'not-a-registered-session', '2026-10-24T01:02:03.000Z')).toEqual(emptyProgress);
    expect(completeSession(emptyProgress, currentSessionId, 'not-a-time')).toEqual(emptyProgress);
    expect(completeSession(emptyProgress, '   ', '2026-10-24T01:02:03.000Z')).toEqual(emptyProgress);
  });

  it('setLearningStartReplacesLaterProgressAndPreservesActivityHistory', () => {
    saveProgress({
      ...emptyProgress,
      completedSessionIds: [laterSessionId],
      recentCompletions: [{ sessionId: laterSessionId, completedAt: '2026-10-24T01:02:03.000Z' }],
    });

    const next = setLearningStart({ grade: 2, term: 1, unit: 2 });
    const expectedEarlierSessions = [
      ...getSessionsForDifficulty(curriculum.units['grade-2/term-1/chinese/unit-01'], 'basic'),
      ...getSessionsForDifficulty(curriculum.units['grade-2/term-1/math/unit-01'], 'basic'),
    ].map((session) => session.id);

    expect(next.learningStart).toEqual({ grade: 2, term: 1, unit: 2 });
    expect(next.completedSessionIds).toEqual(expect.arrayContaining(expectedEarlierSessions));
    expect(next.completedSessionIds).not.toContain(laterSessionId);
    expect(next.recentCompletions).toEqual([{ sessionId: laterSessionId, completedAt: '2026-10-24T01:02:03.000Z' }]);

    const rejected = setLearningStart({ grade: 2, term: 1, unit: 99 });
    expect(rejected).toEqual(next);
  });

  it('clearsOnlyGrade2Term1MathProgressAndPreservesUnknownFieldsAndLearningStart', () => {
    const t1Timestamp = '2026-10-28T01:00:00.000Z';
    const t2Timestamp = '2026-10-28T02:00:00.000Z';
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({
      schemaVersion: 4,
      completedSessionIds: [grade2Term1MathSessionId, grade2Term2MathSessionId, currentSessionId],
      recentCompletions: [
        { sessionId: grade2Term1MathSessionId, completedAt: t1Timestamp },
        { sessionId: grade2Term2MathSessionId, completedAt: t2Timestamp },
        { sessionId: currentSessionId, completedAt: t1Timestamp },
      ],
      learningStart: { grade: 2, term: 1, unit: 3 },
      futureField: { keep: true },
    }));

    expect(migrateGrade2Term1MathProgress()).toBe('migrated');
    expect(JSON.parse(window.localStorage.getItem(STORAGE_KEY)!)).toEqual({
      schemaVersion: 4,
      completedSessionIds: [grade2Term2MathSessionId, currentSessionId],
      recentCompletions: [
        { sessionId: grade2Term2MathSessionId, completedAt: t2Timestamp },
        { sessionId: currentSessionId, completedAt: t1Timestamp },
      ],
      learningStart: { grade: 2, term: 1, unit: 3 },
      futureField: { keep: true },
    });
    loadProgress();
    expect(JSON.parse(window.localStorage.getItem(STORAGE_KEY)!).futureField).toEqual({ keep: true });
  });

  it('marksAnEmptyMigrationAndDoesNotClearNewProgressWhenRetried', () => {
    expect(migrateGrade2Term1MathProgress()).toBe('migrated');
    completeSession(loadProgress(), grade2Term1MathSessionId, '2026-10-28T03:00:00.000Z');

    expect(migrateGrade2Term1MathProgress()).toBe('already-migrated');
    expect(loadProgress().completedSessionIds).toContain(grade2Term1MathSessionId);
  });

  it('doesNotWriteTheMigrationMarkerWhenProgressWriteFailsAndCanRetry', () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({
      schemaVersion: 4,
      completedSessionIds: [grade2Term1MathSessionId, currentSessionId],
      recentCompletions: [],
      learningStart: null,
    }));
    const setItem = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(function (this: Storage, key: string, value: string) {
      if (key === STORAGE_KEY) throw new Error('quota exceeded');
      return Storage.prototype.setItem.call(this, key, value);
    });

    expect(() => migrateGrade2Term1MathProgress()).toThrow('quota exceeded');
    setItem.mockRestore();
    expect(migrateGrade2Term1MathProgress()).toBe('migrated');
    expect(loadProgress().completedSessionIds).toEqual([currentSessionId]);
  });
});
