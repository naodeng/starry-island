import { describe, expect, it } from 'vitest';
import { loadUnit } from '../../content/unitLoader';
import { analyzeQuestionUniqueness } from './questionUniqueness';
import { loadChallengeQualityInputs } from './qualityInputs';
import pilotManifest from './pilotManifest';

const groupId = 'grade-1-term-2-math-unit-07';
const sourceUnitId = 'grade-1/term-2/math/unit-07';
const sourcePrefix = `challenge-question:${sourceUnitId}/`;
const supplementPrefix = 'challenge-question:challenge-supplement-grade-1-term-2-math-unit-07-';

describe('Grade 1 Term 2 Math Unit 7 challenge coverage', () => {
  it('registers 找规律 with 30 candidates per tier and all three learning targets', () => {
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
      coreKnowledgePointIds: ['repeating-shape-patterns', 'number-patterns', 'pattern-rule-validation'],
      tasks: [
        { id: `${groupId}/basic-01`, difficulty: 'basic', targetCount: 15, requiredKnowledgePointIds: ['repeating-shape-patterns'] },
        { id: `${groupId}/basic-02`, difficulty: 'basic', targetCount: 15, requiredKnowledgePointIds: ['number-patterns', 'pattern-rule-validation'] },
        { id: `${groupId}/advanced-01`, difficulty: 'advanced', targetCount: 15, requiredKnowledgePointIds: ['number-patterns', 'pattern-rule-validation'] },
        { id: `${groupId}/advanced-02`, difficulty: 'advanced', targetCount: 15, requiredKnowledgePointIds: ['repeating-shape-patterns', 'number-patterns'] },
        { id: `${groupId}/high-01`, difficulty: 'high', targetCount: 15, requiredKnowledgePointIds: [
          'repeating-shape-patterns', 'number-patterns', 'pattern-rule-validation',
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

  it('keeps learning activities intact and selects only distinct reviewed candidates', async () => {
    const group = pilotManifest.groups.find(({ definition }) => definition.id === groupId);
    const sourceQuestionIds = group?.questionIds.filter((questionId) => questionId.startsWith(sourcePrefix)) ?? [];
    const supplementQuestionIds = group?.questionIds.filter((questionId) => questionId.startsWith(supplementPrefix)) ?? [];
    const questionById = new Map(pilotManifest.questions.map((question) => [question.questionId, question]));
    const unit = await loadUnit(sourceUnitId);
    const lessonActivityIds = Object.values(unit!.difficultyTracks)
      .flatMap((track) => track.tasks.flatMap((task) => task.sessions.flatMap((session) => session.activities.map(({ id }) => id))));

    expect(lessonActivityIds).toHaveLength(48);
    expect(sourceQuestionIds).toHaveLength(15);
    expect(Object.fromEntries(['basic', 'advanced', 'high'].map((difficulty) => [
      difficulty,
      sourceQuestionIds.filter((questionId) => questionById.get(questionId)?.difficulty === difficulty).length,
    ]))).toEqual({ basic: 5, advanced: 5, high: 5 });
    expect(supplementQuestionIds).toHaveLength(75);
    expect(sourceQuestionIds.every((questionId) => lessonActivityIds.includes(questionId.slice('challenge-question:'.length)))).toBe(true);

    const activeQuestionIds = new Set(group?.questionIds ?? []);
    const inputs = await loadChallengeQualityInputs(pilotManifest);
    const questions = inputs.manifest.questions.filter(({ questionId }) => activeQuestionIds.has(questionId));
    const uniqueness = await analyzeQuestionUniqueness(questions, inputs.activitiesById, inputs.sourceUnitByActivityId);

    expect(uniqueness.exactDuplicateGroups).toEqual([]);
    expect(uniqueness.similarQuestionPairs).toEqual([]);
  });
});
