import { describe, expect, it } from 'vitest';
import type { ActivityDefinition, CurriculumUnit } from '../../content/types';
import { loadUnit } from '../../content/unitLoader';
import type { ChallengeManifest } from '../domain/types';
import { derivePilotQuestionKnowledgePointIds } from './pilotQuestionKnowledgePoints';
import { parseChallengeManifest } from './manifestSchema';
import { pilotSupplementalActivities } from './pilotSupplementalActivities';
import { pilotEnglishSupplementalActivities } from './pilotEnglishSupplementalActivities';
import { pilotChineseSupplementalActivities } from './pilotChineseSupplementalActivities';
import { grade1MathUnit01SupplementalActivities } from './grade1MathUnit01SupplementalActivities';
import { validateChallengeManifest } from './validateManifest';
import rawManifest from './pilot-manifest.json';

const manifest: ChallengeManifest = parseChallengeManifest(rawManifest);
const sourceUnitIds = [1, 2, 3, 4].map((number) => `grade-2/term-1/math/unit-${String(number).padStart(2, '0')}`);
const englishSourceUnitId = 'grade-3/term-1/english/unit-01';
const chineseSourceUnitId = 'grade-5/term-1/chinese/unit-01';
const grade1MathSourceUnitId = 'grade-1/term-1/math/unit-01';
const safeKinds = new Set(['choice', 'match', 'order', 'categorize', 'arithmetic']);

describe('pilot manifest against the real curriculum', () => {
  it('resolves all candidates and passes every released group gate', async () => {
    const activitiesById = new Map<string, ActivityDefinition>();
    const sourceUnitByActivityId = new Map<string, string>();
    const unitsById = new Map<string, CurriculumUnit>();

    for (const sourceUnitId of [...sourceUnitIds, englishSourceUnitId, chineseSourceUnitId, grade1MathSourceUnitId]) {
      const unit = await loadUnit(sourceUnitId);
      expect(unit).toBeDefined();
      unitsById.set(sourceUnitId, unit!);
      for (const track of Object.values(unit!.difficultyTracks)) {
        for (const task of track.tasks) {
          for (const session of task.sessions) {
            for (const activity of session.activities) {
              if (!safeKinds.has(activity.kind)) continue;
              activitiesById.set(activity.id, activity);
              sourceUnitByActivityId.set(activity.id, sourceUnitId);
            }
          }
        }
      }
    }

    for (const supplemental of pilotSupplementalActivities) {
      activitiesById.set(supplemental.activity.id, supplemental.activity);
      sourceUnitByActivityId.set(supplemental.activity.id, sourceUnitIds[1]);
    }
    for (const supplemental of pilotEnglishSupplementalActivities) {
      activitiesById.set(supplemental.activity.id, supplemental.activity);
      sourceUnitByActivityId.set(supplemental.activity.id, supplemental.sourceUnitId);
    }
    for (const supplemental of pilotChineseSupplementalActivities) {
      activitiesById.set(supplemental.activity.id, supplemental.activity);
      sourceUnitByActivityId.set(supplemental.activity.id, supplemental.sourceUnitId);
    }
    for (const supplemental of grade1MathUnit01SupplementalActivities) {
      activitiesById.set(supplemental.activity.id, supplemental.activity);
      sourceUnitByActivityId.set(supplemental.activity.id, supplemental.sourceUnitId);
    }

    const report = await validateChallengeManifest(manifest, activitiesById, sourceUnitByActivityId, unitsById);
    expect(report.errors).toEqual([]);
    expect(report.contentChanges).toEqual([]);
    for (const question of manifest.questions) {
      const activity = activitiesById.get(question.activityId)!;
      const sourceUnitId = sourceUnitByActivityId.get(question.activityId)!;
      expect(question.knowledgePointIds, question.questionId).toEqual(derivePilotQuestionKnowledgePointIds(sourceUnitId, activity));
    }
    expect(report.groupStatusById).toEqual({
      'grade-2-term-1-math-unit-02': 'ready',
      'grade-2-term-1-math-first-half': 'ready',
      'grade-3-term-1-english-unit-01': 'ready',
      'grade-5-term-1-chinese-unit-01': 'ready',
      'grade-1-term-1-math-unit-01': 'ready',
    });
    expect(manifest.groups[0].questionIds).toHaveLength(90);
    expect(manifest.groups[1].questionIds).toHaveLength(226);
    expect(manifest.groups[2]?.questionIds).toHaveLength(90);
    expect(manifest.groups[4]?.questionIds).toHaveLength(90);
    expect(manifest.questions).toHaveLength(496);
    expect(manifest.groups).toHaveLength(5);
  });

  it('registers the first-grade math unit as a complete candidate pool without changing the course tasks', () => {
    const group = manifest.groups.find(({ definition }) => definition.id === 'grade-1-term-1-math-unit-01');
    const questions = manifest.questions.filter(({ questionId }) => group?.questionIds.includes(questionId));

    expect(group?.definition).toMatchObject({
      kind: 'unit',
      grade: 1,
      semester: 1,
      subject: 'math',
      sourceUnitIds: [grade1MathSourceUnitId],
      coreKnowledgePointIds: ['counting-one-to-one', 'number-sequence', 'quantity-comparison', 'zero-as-none'],
    });
    expect(group?.releaseIntent).toBe('released');
    expect(questions).toHaveLength(90);
    expect(Object.fromEntries(['basic', 'advanced', 'high'].map((difficulty) => [
      difficulty,
      questions.filter((question) => question.difficulty === difficulty).length,
    ]))).toEqual({ basic: 30, advanced: 30, high: 30 });
  });

  it('keeps duplicate generated course questions out of the released pool and supplies unique replacements', () => {
    const group = manifest.groups.find(({ definition }) => definition.id === 'grade-1-term-1-math-unit-01')!;
    const duplicateCourseQuestionIds = [
      'challenge-question:grade-1/term-1/math/unit-01/high/task-01/session-01/question-02',
      'challenge-question:grade-1/term-1/math/unit-01/high/task-02/session-01/question-02',
    ];
    expect(duplicateCourseQuestionIds.every((questionId) => !group.questionIds.includes(questionId))).toBe(true);
    expect(grade1MathUnit01SupplementalActivities).toHaveLength(44);
    expect(Object.fromEntries(['basic', 'advanced', 'high'].map((difficulty) => [
      difficulty,
      grade1MathUnit01SupplementalActivities.filter((item) => item.difficulty === difficulty).length,
    ]))).toEqual({ basic: 14, advanced: 14, high: 16 });
  });

  it('keeps the Grade 3 English group scoped to its one confirmed textbook unit', () => {
    const englishGroup = manifest.groups.find(({ definition }) => definition.id === 'grade-3-term-1-english-unit-01');

    expect(englishGroup?.definition).toMatchObject({
      kind: 'unit',
      grade: 3,
      semester: 1,
      subject: 'english',
      sourceUnitIds: [englishSourceUnitId],
      coreKnowledgePointIds: ['name-and-self-introduction', 'age-and-class'],
    });
    expect(englishGroup?.questionIds).toHaveLength(90);
  });

  it('registers fourteen original English challenge candidates per difficulty', () => {
    const supplemental = manifest.questions.filter(({ activityId }) => activityId.startsWith(
      'challenge-supplement-grade-3-term-1-english-unit-01-',
    ));

    expect(supplemental).toHaveLength(42);
    expect(new Set(supplemental.map(({ activityId }) => activityId)).size).toBe(42);
    expect(Object.fromEntries(['basic', 'advanced', 'high'].map((difficulty) => [
      difficulty,
      supplemental.filter((question) => question.difficulty === difficulty).length,
    ]))).toEqual({ basic: 14, advanced: 14, high: 14 });
    expect(supplemental.every(({ knowledgePointIds }) => knowledgePointIds.length > 0)).toBe(true);
  });

  it('registers the high-grade Chinese pilot against its verified first-unit scope', () => {
    const chineseGroup = manifest.groups.find(({ definition }) => definition.id === 'grade-5-term-1-chinese-unit-01');

    expect(chineseGroup?.definition).toMatchObject({
      kind: 'unit',
      grade: 5,
      semester: 1,
      subject: 'chinese',
      sourceUnitIds: [chineseSourceUnitId],
      coreKnowledgePointIds: ['object-and-emotion', 'reading-evidence', 'class-charter', 'beloved-object-writing'],
    });
    expect(chineseGroup?.questionIds).toHaveLength(90);
    expect(chineseGroup?.releaseIntent).toBe('released');
  });

  it('registers fourteen original Chinese challenge candidates per difficulty', () => {
    const supplemental = manifest.questions.filter(({ activityId }) => activityId.startsWith(
      'challenge-supplement-grade-5-term-1-chinese-unit-01-',
    ));

    expect(supplemental).toHaveLength(42);
    expect(new Set(supplemental.map(({ activityId }) => activityId)).size).toBe(42);
    expect(Object.fromEntries(['basic', 'advanced', 'high'].map((difficulty) => [
      difficulty,
      supplemental.filter((question) => question.difficulty === difficulty).length,
    ]))).toEqual({ basic: 14, advanced: 14, high: 14 });
    expect(supplemental.every(({ knowledgePointIds }) => knowledgePointIds.length > 0)).toBe(true);
  });

  it('keeps chapter boundary evidence explicit and the unit group scoped to Unit 2', () => {
    const unitGroup = manifest.groups.find(({ definition }) => definition.kind === 'unit')!;
    const semesterGroup = manifest.groups.find(({ definition }) => definition.kind === 'semester')!;
    expect(unitGroup.definition.sourceUnitIds).toEqual([sourceUnitIds[1]]);
    expect(semesterGroup.definition.sourceUnitIds).toEqual(sourceUnitIds);
    expect(semesterGroup.definition.stage).toBe('first-half');
    expect(semesterGroup.definition.mappingEvidence.notes).toContain('first-half=01–04');
    expect(semesterGroup.definition.mappingEvidence.notes).toContain('不声称代表学校授课日历');
  });
});
