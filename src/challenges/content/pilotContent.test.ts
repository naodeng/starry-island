import { describe, expect, it } from 'vitest';
import { submitAnswer } from '../../learning/answers';
import { assemblePaper } from '../domain/assemble';
import { loadPilotChallengeContent } from './pilotContent';

function knownCorrectAnswer(activity: Parameters<typeof submitAnswer>[0]): Parameters<typeof submitAnswer>[1] {
  switch (activity.kind) {
    case 'choice':
      return activity.correctOptionId;
    case 'match':
      return Object.fromEntries(activity.pairs.map(({ id }) => [id, id]));
    case 'order':
      return activity.correctOrder;
    case 'categorize':
      return Object.fromEntries(activity.items.map(({ id, categoryId }) => [id, categoryId]));
    case 'measurement':
      return activity.targetLengthCm;
    case 'arithmetic':
      return activity.correctAnswer;
  }
}

describe('loadPilotChallengeContent', () => {
  it('loads only groups whose real curriculum candidates pass the release gate', async () => {
    const content = await loadPilotChallengeContent();

    expect(content.groups.map(({ group, status }) => [group.definition.id, status])).toEqual([
      ['grade-2-term-1-math-unit-02', 'ready'],
      ['grade-2-term-1-math-first-half', 'ready'],
    ]);
    expect(content.groups[0]?.candidates).toHaveLength(90);
    expect(content.groups[1]?.candidates).toHaveLength(226);
    expect(content.groups[1]?.candidates.every(({ contentFingerprint, activity }) => contentFingerprint && activity.id)).toBe(true);
    expect(content.validation.errors).toEqual([]);
  });

  it('scores the declared correct answer for every unique candidate through the production grader', async () => {
    const content = await loadPilotChallengeContent();
    const candidates = content.groups[1]!.candidates;

    expect(new Set(candidates.map(({ questionId }) => questionId)).size).toBe(candidates.length);
    expect(candidates.every(({ activity }) => submitAnswer(activity, knownCorrectAnswer(activity)))).toBe(true);
  });

  it('assembles every pilot task with its declared knowledge coverage from the real tagged pools', async () => {
    const content = await loadPilotChallengeContent();

    for (const { group, candidates } of content.groups) {
      for (const task of group.definition.tasks) {
        const paper = assemblePaper(task, candidates, `coverage:${task.id}`);
        const covered = new Set(paper.flatMap(({ knowledgePointIds }) => knowledgePointIds));
        expect(paper).toHaveLength(task.targetCount);
        expect(task.requiredKnowledgePointIds.every((id) => covered.has(id))).toBe(true);
      }
    }
  });
});
