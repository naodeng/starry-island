import { describe, expect, it } from 'vitest';
import { unit } from './unit-03';

function question(id: string) {
  return Object.values(unit.difficultyTracks)
    .flatMap((track) => track.tasks)
    .flatMap((task) => task.sessions)
    .flatMap((session) => session.activities)
    .find((activity) => activity.id === `${unit.id}/${id}`);
}

describe('grade 6 English Term 2 Unit 3 question cards', () => {
  it('quotes single-word targets and clarifies volunteer as a noun', () => {
    const volunteer = question('basic/task-01/session-01/question-05');
    expect(volunteer?.prompt).toContain('volunteer（志愿者）');
    expect(volunteer?.kind).toBe('choice');
    if (volunteer?.kind !== 'choice') return;
    expect(volunteer.options.find(({ id }) => id === volunteer.correctOptionId)?.label)
      .toBe('What does ‘volunteer’ mean?');
    expect(volunteer.explanation).toContain('作名词');
  });

  it('uses phrase for multiword vocabulary and orders a natural sentence', () => {
    const phrase = question('advanced/task-01/session-01/question-05');
    expect(phrase?.prompt).toContain('phrase ‘a sandwich’');
    expect(phrase?.kind).toBe('choice');
    if (phrase?.kind !== 'choice') return;
    expect(phrase.options.find(({ id }) => id === phrase.correctOptionId)?.label).toBe('Yes, I do.');

    const order = question('basic/task-01/session-01/question-08');
    expect(order?.prompt).toContain('我想学习这个词语');
    expect(order?.kind).toBe('order');
    if (order?.kind !== 'order') return;
    expect(order.correctOrder.map((id) => order.items.find((item) => item.id === id)?.label).join(' '))
      .toBe('I would like to learn this word .');
  });

  it('keeps the category examples aligned with food, clothing, service, habits, and quantity', () => {
    const cases = [
      ['basic/task-01/session-01/question-07', ['sandwich', 'top', 'volunteer', 'habit']],
      ['basic/task-02/session-01/question-07', ['sandwich', 'a sandwich', 'volunteer', 'less']],
      ['advanced/task-01/session-01/question-07', ['sandwich', 'a top', 'volunteer', 'at least']],
      ['advanced/task-02/session-01/question-07', ['top', 'a sandwich', 'habit', 'less']],
      ['high/task-01/session-01/question-07', ['top', 'a top', 'habit', 'at least']],
      ['high/task-02/session-01/question-07', ['a sandwich', 'a top', 'less', 'at least']],
    ] as const;

    for (const [id, labels] of cases) {
      const activity = question(id);
      expect(activity?.kind, id).toBe('categorize');
      if (activity?.kind !== 'categorize') continue;
      expect(activity.categories.map(({ label }) => label), id).toEqual(['食物和衣物', '志愿服务、习惯和数量']);
      expect(activity.items.map(({ label }) => label), id).toEqual(labels);
      expect(activity.items.map(({ categoryId }) => categoryId.split('/').at(-1)), id).toEqual([
        'category-01', 'category-01', 'category-02', 'category-02',
      ]);
    }
  });

  it('combines goal and accuracy checks in the challenge tier', () => {
    const challenge = question('high/task-01/session-01/question-05');
    expect(challenge?.kind).toBe('choice');
    if (challenge?.kind !== 'choice') return;
    expect(challenge.prompt).toContain('A题');
    expect(challenge.prompt).toContain('B题');
    expect(challenge.options.find(({ id }) => id === challenge.correctOptionId)?.label)
      .toContain('check its spelling and meaning');
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
