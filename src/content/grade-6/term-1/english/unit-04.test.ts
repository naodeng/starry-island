import { describe, expect, it } from 'vitest';
import { unit } from './unit-04';

function question(id: string) {
  return Object.values(unit.difficultyTracks)
    .flatMap((track) => track.tasks)
    .flatMap((task) => task.sessions)
    .flatMap((session) => session.activities)
    .find((activity) => activity.id === `${unit.id}/${id}`);
}

describe('grade 6 English Unit 4 question cards', () => {
  it('quotes feeling words in meaning questions and preserves the answer key', () => {
    const happy = question('basic/task-01/session-01/question-05');
    expect(happy?.kind).toBe('choice');
    if (happy?.kind !== 'choice') return;
    expect(happy.options.find(({ id }) => id === happy.correctOptionId)?.label).toBe('What does “happy” mean?');

    const worried = question('basic/task-01/session-01/question-06');
    expect(worried?.prompt).toContain('What does ‘worried’ mean?');
    expect(worried?.kind).toBe('choice');
    if (worried?.kind !== 'choice') return;
    expect(worried.options.find(({ id }) => id === worried.correctOptionId)?.label).toBe('它的意思是“担心的”。');
  });

  it('separates feeling words from actions and activities in every sort', () => {
    const cases = [
      ['basic/task-01/session-01/question-07', ['感受', '行动与活动'], ['happy', 'sad', 'win', 'race']],
      ['basic/task-02/session-01/question-07', ['感受', '行动与活动'], ['happy', 'angry', 'win', 'cry']],
      ['advanced/task-01/session-01/question-07', ['感受', '行动与活动'], ['happy', 'worried', 'win', 'test']],
      ['advanced/task-02/session-01/question-07', ['感受', '行动与活动'], ['sad', 'angry', 'race', 'cry']],
      ['high/task-01/session-01/question-07', ['感受', '行动与活动'], ['sad', 'worried', 'race', 'test']],
      ['high/task-02/session-01/question-07', ['感受', '行动与活动'], ['angry', 'worried', 'cry', 'test']],
    ] as const;

    for (const [id, categories, labels] of cases) {
      const activity = question(id);
      expect(activity?.kind, id).toBe('categorize');
      if (activity?.kind !== 'categorize') continue;
      expect(activity.categories.map(({ label }) => label), id).toEqual(categories);
      expect(activity.items.map(({ label }) => label), id).toEqual(labels);
      expect(activity.items.map(({ categoryId }) => categoryId.split('/').at(-1)), id).toEqual([
        'category-01', 'category-01', 'category-02', 'category-02',
      ]);
    }
  });

  it('combines distinct conditions in the challenge tier', () => {
    const challenge = question('high/task-01/session-01/question-05');
    expect(challenge?.prompt).toContain('A题');
    expect(challenge?.prompt).toContain('B题');
    expect(challenge?.kind).toBe('choice');
    if (challenge?.kind !== 'choice') return;
    const answer = challenge.options.find(({ id }) => id === challenge.correctOptionId)?.label;
    expect(answer).toContain('angry');
    expect(answer).toContain('check its spelling and meaning');
  });

  it('renders 48 distinct cards with valid answer references and complete feedback', () => {
    const activities = Object.values(unit.difficultyTracks)
      .flatMap((track) => track.tasks)
      .flatMap((task) => task.sessions)
      .flatMap((session) => session.activities);
    expect(activities).toHaveLength(48);
    expect(new Set(activities.map(({ id }) => id)).size).toBe(48);

    for (const activity of activities) {
      expect(activity.prompt.trim(), activity.id).not.toBe('');
      expect(activity.hint.trim(), activity.id).not.toBe('');
      expect(activity.explanation.trim(), activity.id).not.toBe('');
      if (activity.kind === 'choice') {
        expect(activity.options.map(({ id }) => id), activity.id).toContain(activity.correctOptionId);
      }
      if (activity.kind === 'order') {
        expect(activity.correctOrder, activity.id).toHaveLength(activity.items.length);
        expect(new Set(activity.correctOrder).size, activity.id).toBe(activity.items.length);
      }
    }
  });
});
