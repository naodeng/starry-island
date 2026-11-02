import { describe, expect, it } from 'vitest';
import { loadUnit } from '../../content/unitLoader';
import pilotManifest from './pilotManifest';

const groupId = 'grade-1-term-2-math-unit-02';
const sourcePrefix = 'challenge-question:grade-1/term-2/math/unit-02/';

describe('Grade 1 Term 2 Math Unit 2 candidate selection', () => {
  it('replaces duplicate and out-of-scope candidates while preserving the original lesson activities', async () => {
    const group = pilotManifest.groups.find(({ definition }) => definition.id === groupId);
    const sourceQuestionIds = group?.questionIds.filter((questionId) => questionId.startsWith(sourcePrefix)) ?? [];
    const byDifficulty = Object.fromEntries(['basic', 'advanced', 'high'].map((difficulty) => [
      difficulty,
      sourceQuestionIds.filter((questionId) => questionId.includes(`/${difficulty}/`)).length,
    ]));

    expect(group?.questionIds).toHaveLength(90);
    expect(byDifficulty).toEqual({ basic: 16, advanced: 16, high: 12 });
    const excludedActivityIds = [
      `${sourcePrefix}high/task-01/session-01/question-02`,
      `${sourcePrefix}high/task-02/session-01/question-02`,
      `${sourcePrefix}high/task-02/session-01/question-05`,
      `${sourcePrefix}high/task-02/session-01/question-08`,
    ];
    for (const questionId of excludedActivityIds) {
      expect(group?.questionIds).not.toContain(questionId);
    }

    const unit = await loadUnit('grade-1/term-2/math/unit-02');
    const lessonActivityIds = Object.values(unit!.difficultyTracks)
      .flatMap((track) => track.tasks.flatMap((task) => task.sessions.flatMap((session) => session.activities.map(({ id }) => id))));
    for (const questionId of excludedActivityIds) {
      expect(lessonActivityIds).toContain(questionId.replace('challenge-question:', ''));
    }
  });

  it('retains 30 candidates per tier after replacement', () => {
    const group = pilotManifest.groups.find(({ definition }) => definition.id === groupId);
    const questionsById = new Map(pilotManifest.questions.map((question) => [question.questionId, question]));
    const tierCounts = Object.fromEntries(['basic', 'advanced', 'high'].map((difficulty) => [
      difficulty,
      group?.questionIds.filter((questionId) => questionsById.get(questionId)?.difficulty === difficulty).length,
    ]));

    expect(tierCounts).toEqual({ basic: 30, advanced: 30, high: 30 });
    expect(pilotManifest.questions.filter(({ activityId }) => activityId.startsWith(
      'challenge-supplement-grade-1-term-2-math-unit-02-',
    ))).toHaveLength(46);
  });
});
