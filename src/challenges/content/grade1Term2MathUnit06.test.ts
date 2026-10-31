import { describe, expect, it } from 'vitest';
import { loadUnit } from '../../content/unitLoader';
import { analyzeQuestionUniqueness } from './questionUniqueness';
import { loadChallengeQualityInputs } from './qualityInputs';
import pilotManifest from './pilotManifest';

const groupId = 'grade-1-term-2-math-unit-06';
const sourceUnitId = 'grade-1/term-2/math/unit-06';
const sourcePrefix = `challenge-question:${sourceUnitId}/`;
const supplementPrefix = 'challenge-question:challenge-supplement-grade-1-term-2-math-unit-06-';

describe('Grade 1 Term 2 Math Unit 6 challenge coverage', () => {
  it('registers the 100以内加减法 challenge group with 30 candidates per tier', () => {
    const group = pilotManifest.groups.find(({ definition }) => definition.id === groupId);

    expect(group).toBeDefined();
    expect(group?.definition).toMatchObject({
      id: groupId,
      kind: 'unit',
      grade: 1,
      semester: 2,
      subject: 'math',
      sourceUnitIds: [sourceUnitId],
      learningTaskUnitIds: [sourceUnitId],
      coreKnowledgePointIds: [
        'two-digit-add-subtract-one',
        'tens-add-subtract',
        'two-digit-add-subtract-tens',
      ],
      tasks: [
        { id: `${groupId}/basic-01`, difficulty: 'basic', targetCount: 15, requiredKnowledgePointIds: ['two-digit-add-subtract-one'] },
        { id: `${groupId}/basic-02`, difficulty: 'basic', targetCount: 15, requiredKnowledgePointIds: ['tens-add-subtract', 'two-digit-add-subtract-tens'] },
        { id: `${groupId}/advanced-01`, difficulty: 'advanced', targetCount: 15, requiredKnowledgePointIds: ['two-digit-add-subtract-one', 'tens-add-subtract'] },
        { id: `${groupId}/advanced-02`, difficulty: 'advanced', targetCount: 15, requiredKnowledgePointIds: ['two-digit-add-subtract-tens', 'tens-add-subtract'] },
        { id: `${groupId}/high-01`, difficulty: 'high', targetCount: 15, requiredKnowledgePointIds: [
          'two-digit-add-subtract-one',
          'tens-add-subtract',
          'two-digit-add-subtract-tens',
        ] },
      ],
    });
    expect(group?.questionIds).toHaveLength(90);
    const questionById = new Map(pilotManifest.questions.map((question) => [question.questionId, question]));
    expect(Object.fromEntries(['basic', 'advanced', 'high'].map((difficulty) => [
      difficulty,
      group?.questionIds.filter((questionId) => questionById.get(questionId)?.difficulty === difficulty).length,
    ]))).toEqual({ basic: 30, advanced: 30, high: 30 });
  });

  it('preserves every learning activity and only includes distinct reviewed challenge candidates', async () => {
    const group = pilotManifest.groups.find(({ definition }) => definition.id === groupId);
    const sourceQuestionIds = group?.questionIds.filter((questionId) => questionId.startsWith(sourcePrefix)) ?? [];
    const supplementQuestionIds = group?.questionIds.filter((questionId) => questionId.startsWith(supplementPrefix)) ?? [];
    const questionById = new Map(pilotManifest.questions.map((question) => [question.questionId, question]));
    const sourceCountByDifficulty = Object.fromEntries(['basic', 'advanced', 'high'].map((difficulty) => [
      difficulty,
      sourceQuestionIds.filter((questionId) => questionById.get(questionId)?.difficulty === difficulty).length,
    ]));
    const unit = await loadUnit(sourceUnitId);
    const lessonActivityIds = Object.values(unit!.difficultyTracks)
      .flatMap((track) => track.tasks.flatMap((task) => task.sessions.flatMap((session) => session.activities.map(({ id }) => id))));

    expect(lessonActivityIds).toHaveLength(48);
    expect(sourceCountByDifficulty).toEqual({ basic: 5, advanced: 5, high: 5 });
    expect(supplementQuestionIds).toHaveLength(75);
    expect(sourceQuestionIds.every((questionId) => lessonActivityIds.includes(questionId.slice('challenge-question:'.length)))).toBe(true);
    expect(sourceQuestionIds.length + supplementQuestionIds.length).toBe(90);

    const activeQuestionIds = new Set(group?.questionIds ?? []);
    const inputs = await loadChallengeQualityInputs(pilotManifest);
    const questions = inputs.manifest.questions.filter(({ questionId }) => activeQuestionIds.has(questionId));
    const uniqueness = await analyzeQuestionUniqueness(questions, inputs.activitiesById, inputs.sourceUnitByActivityId);
    const difficultyByQuestionId = new Map(questions.map(({ questionId, difficulty }) => [questionId, difficulty]));

    expect(uniqueness.exactDuplicateGroups).toEqual([]);
    expect(uniqueness.similarQuestionPairs.filter(({ questionIds: [leftId, rightId] }) =>
      difficultyByQuestionId.get(leftId) === difficultyByQuestionId.get(rightId))).toEqual([]);
    expect(uniqueness.similarQuestionPairs).toEqual([]);
  });
});
