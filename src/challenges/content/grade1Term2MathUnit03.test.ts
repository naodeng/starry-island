import { describe, expect, it } from 'vitest';
import { loadUnit } from '../../content/unitLoader';
import { analyzeQuestionUniqueness } from './questionUniqueness';
import { loadChallengeQualityInputs } from './qualityInputs';
import pilotManifest from './pilotManifest';

const groupId = 'grade-1-term-2-math-unit-03';
const sourcePrefix = 'challenge-question:grade-1/term-2/math/unit-03/';
const supplementPrefix = 'challenge-question:challenge-supplement-grade-1-term-2-math-unit-03-';

describe('Grade 1 Term 2 Math Unit 3 candidate selection', () => {
  it('replaces exact duplicate source candidates in the challenge pool while keeping lesson activities intact', async () => {
    const group = pilotManifest.groups.find(({ definition }) => definition.id === groupId);
    const sourceQuestionIds = group?.questionIds.filter((questionId) => questionId.startsWith(sourcePrefix)) ?? [];
    const supplementQuestionIds = group?.questionIds.filter((questionId) => questionId.startsWith(supplementPrefix)) ?? [];
    const byDifficulty = Object.fromEntries(['basic', 'advanced', 'high'].map((difficulty) => [
      difficulty,
      sourceQuestionIds.filter((questionId) => questionId.includes(`/${difficulty}/`)).length,
    ]));

    expect(group?.questionIds).toHaveLength(90);
    expect(byDifficulty).toEqual({ basic: 14, advanced: 8, high: 7 });
    expect(supplementQuestionIds).toHaveLength(61);
    const excludedActivityIds = [
      `${sourcePrefix}advanced/task-01/session-01/question-01`,
      `${sourcePrefix}advanced/task-01/session-01/question-02`,
      `${sourcePrefix}advanced/task-01/session-01/question-05`,
      `${sourcePrefix}advanced/task-01/session-01/question-06`,
      `${sourcePrefix}advanced/task-01/session-01/question-07`,
      `${sourcePrefix}advanced/task-02/session-01/question-05`,
      `${sourcePrefix}advanced/task-02/session-01/question-07`,
      `${sourcePrefix}high/task-01/session-01/question-01`,
      `${sourcePrefix}high/task-01/session-01/question-02`,
      `${sourcePrefix}high/task-01/session-01/question-05`,
      `${sourcePrefix}high/task-01/session-01/question-07`,
      `${sourcePrefix}high/task-02/session-01/question-01`,
      `${sourcePrefix}high/task-02/session-01/question-05`,
      `${sourcePrefix}high/task-02/session-01/question-02`,
      `${sourcePrefix}high/task-02/session-01/question-07`,
      `${sourcePrefix}basic/task-02/session-01/question-02`,
      `${sourcePrefix}basic/task-02/session-01/question-06`,
      `${sourcePrefix}advanced/task-02/session-01/question-02`,
      `${sourcePrefix}high/task-02/session-01/question-06`,
    ];
    for (const questionId of excludedActivityIds) {
      expect(group?.questionIds).not.toContain(questionId);
    }

    const unit = await loadUnit('grade-1/term-2/math/unit-03');
    const lessonActivityIds = Object.values(unit!.difficultyTracks)
      .flatMap((track) => track.tasks.flatMap((task) => task.sessions.flatMap((session) => session.activities.map(({ id }) => id))));
    for (const questionId of excludedActivityIds) {
      expect(lessonActivityIds).toContain(questionId.replace('challenge-question:', ''));
    }
  });

  it('keeps thirty candidates in each tier and does not repeat exact candidate content', async () => {
    const group = pilotManifest.groups.find(({ definition }) => definition.id === groupId);
    const questionsById = new Map(pilotManifest.questions.map((question) => [question.questionId, question]));
    const tierCounts = Object.fromEntries(['basic', 'advanced', 'high'].map((difficulty) => [
      difficulty,
      group?.questionIds.filter((questionId) => questionsById.get(questionId)?.difficulty === difficulty).length,
    ]));

    expect(tierCounts).toEqual({ basic: 30, advanced: 30, high: 30 });
    const activeQuestionIds = new Set(group?.questionIds ?? []);
    const duplicateGroups = pilotManifest.questions.filter(({ questionId }) => activeQuestionIds.has(questionId));
    expect(new Set(duplicateGroups.map(({ activityId }) => activityId)).size).toBe(90);

    const inputs = await loadChallengeQualityInputs(pilotManifest);
    const questions = inputs.manifest.questions.filter(({ questionId }) => activeQuestionIds.has(questionId));
    const uniqueness = await analyzeQuestionUniqueness(questions, inputs.activitiesById, inputs.sourceUnitByActivityId);
    expect(uniqueness.exactDuplicateGroups).toEqual([]);
    const difficultyByQuestionId = new Map(questions.map(({ questionId, difficulty }) => [questionId, difficulty]));
    expect(uniqueness.similarQuestionPairs.filter(({ questionIds: [leftId, rightId] }) =>
      difficultyByQuestionId.get(leftId) === difficultyByQuestionId.get(rightId))).toEqual([]);
    expect(uniqueness.similarQuestionPairs.map(({ questionIds }) => questionIds)).toEqual([
      [
        `${sourcePrefix}advanced/task-02/session-01/question-01`,
        `${sourcePrefix}basic/task-02/session-01/question-01`,
      ],
      [
        `${sourcePrefix}advanced/task-02/session-01/question-06`,
        `${sourcePrefix}basic/task-01/session-01/question-06`,
      ],
    ]);
  });
});
