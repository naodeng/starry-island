import { describe, expect, it } from 'vitest';
import { loadUnit } from '../../content/unitLoader';
import { analyzeQuestionUniqueness } from './questionUniqueness';
import { loadChallengeQualityInputs } from './qualityInputs';
import pilotManifest from './pilotManifest';

const groupId = 'grade-1-term-2-math-unit-04';
const sourcePrefix = 'challenge-question:grade-1/term-2/math/unit-04/';
const supplementPrefix = 'challenge-question:challenge-supplement-grade-1-term-2-math-unit-04-';

describe('Grade 1 Term 2 Math Unit 4 challenge coverage', () => {
  it('registers the 100以内数的认识 challenge group with the approved five-task structure', () => {
    const group = pilotManifest.groups.find(({ definition }) => definition.id === groupId);

    expect(group).toBeDefined();
    expect(group?.definition).toMatchObject({
      id: groupId,
      kind: 'unit',
      grade: 1,
      semester: 2,
      subject: 'math',
      sourceUnitIds: ['grade-1/term-2/math/unit-04'],
      learningTaskUnitIds: ['grade-1/term-2/math/unit-04'],
      coreKnowledgePointIds: [
        'two-digit-number-composition',
        'number-sequence-to-100',
        'number-comparison-to-100',
        'tens-and-hundreds',
      ],
      tasks: [
        { id: `${groupId}/basic-01`, difficulty: 'basic', targetCount: 15, requiredKnowledgePointIds: ['two-digit-number-composition'] },
        { id: `${groupId}/basic-02`, difficulty: 'basic', targetCount: 15, requiredKnowledgePointIds: ['number-sequence-to-100', 'number-comparison-to-100', 'tens-and-hundreds'] },
        { id: `${groupId}/advanced-01`, difficulty: 'advanced', targetCount: 15, requiredKnowledgePointIds: ['two-digit-number-composition', 'number-sequence-to-100'] },
        { id: `${groupId}/advanced-02`, difficulty: 'advanced', targetCount: 15, requiredKnowledgePointIds: ['number-comparison-to-100', 'tens-and-hundreds'] },
        { id: `${groupId}/high-01`, difficulty: 'high', targetCount: 15, requiredKnowledgePointIds: [
          'two-digit-number-composition',
          'number-sequence-to-100',
          'number-comparison-to-100',
          'tens-and-hundreds',
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

  it('keeps only distinct course activity goals in the challenge pool without changing lesson Tasks', async () => {
    const group = pilotManifest.groups.find(({ definition }) => definition.id === groupId);
    const sourceQuestionIds = group?.questionIds.filter((questionId) => questionId.startsWith(sourcePrefix)) ?? [];
    const supplementQuestionIds = group?.questionIds.filter((questionId) => questionId.startsWith(supplementPrefix)) ?? [];
    const questionById = new Map(pilotManifest.questions.map((question) => [question.questionId, question]));
    const byDifficulty = Object.fromEntries(['basic', 'advanced', 'high'].map((difficulty) => [
      difficulty,
      sourceQuestionIds.filter((questionId) => questionById.get(questionId)?.difficulty === difficulty).length,
    ]));

    expect(byDifficulty).toEqual({ basic: 6, advanced: 2, high: 3 });
    expect(supplementQuestionIds).toHaveLength(79);
    const unit = await loadUnit('grade-1/term-2/math/unit-04');
    const lessonActivityIds = Object.values(unit!.difficultyTracks)
      .flatMap((track) => track.tasks.flatMap((task) => task.sessions.flatMap((session) => session.activities.map(({ id }) => id))));
    expect(lessonActivityIds).toHaveLength(48);

    const excludedIds = [
      'basic/task-01/session-01/question-02',
      'basic/task-01/session-01/question-08',
      'basic/task-02/session-01/question-01',
      'basic/task-02/session-01/question-02',
      'basic/task-02/session-01/question-03',
      'basic/task-02/session-01/question-04',
      'basic/task-02/session-01/question-05',
      'basic/task-02/session-01/question-06',
      'basic/task-02/session-01/question-07',
      'basic/task-02/session-01/question-08',
      ...['01', '02', '03', '04', '05', '06', '07'].map((question) => `advanced/task-01/session-01/question-${question}`),
      ...['01', '02', '03', '04', '05', '06', '07'].map((question) => `advanced/task-02/session-01/question-${question}`),
      ...['01', '02', '05', '06', '07'].map((question) => `high/task-01/session-01/question-${question}`),
      ...['01', '02', '03', '04', '05', '06', '07', '08'].map((question) => `high/task-02/session-01/question-${question}`),
    ];
    for (const suffix of excludedIds) {
      expect(group?.questionIds).not.toContain(`${sourcePrefix}${suffix}`);
      expect(lessonActivityIds).toContain(`grade-1/term-2/math/unit-04/${suffix}`);
    }
  });

  it('has no exact or same-tier near-duplicate candidate content', async () => {
    const group = pilotManifest.groups.find(({ definition }) => definition.id === groupId);
    const activeQuestionIds = new Set(group?.questionIds ?? []);
    const inputs = await loadChallengeQualityInputs(pilotManifest);
    const questions = inputs.manifest.questions.filter(({ questionId }) => activeQuestionIds.has(questionId));
    const uniqueness = await analyzeQuestionUniqueness(questions, inputs.activitiesById, inputs.sourceUnitByActivityId);
    const difficultyByQuestionId = new Map(questions.map(({ questionId, difficulty }) => [questionId, difficulty]));

    expect(uniqueness.exactDuplicateGroups).toEqual([]);
    expect(uniqueness.similarQuestionPairs.filter(({ questionIds: [leftId, rightId] }) =>
      difficultyByQuestionId.get(leftId) === difficultyByQuestionId.get(rightId))).toEqual([]);
  });
});
