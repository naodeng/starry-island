import { describe, expect, it } from 'vitest';
import { unit } from './unit-04';

function question(id: string) {
  return Object.values(unit.difficultyTracks)
    .flatMap((track) => track.tasks)
    .flatMap((task) => task.sessions)
    .flatMap((session) => session.activities)
    .find((activity) => activity.id === `${unit.id}/${id}`);
}

describe('grade 6 English Term 2 Unit 4 question cards', () => {
  it('quotes target terms and uses expression or phrase for multiword items', () => {
    const talk = question('basic/task-01/session-01/question-05');
    expect(talk?.kind).toBe('choice');
    if (talk?.kind !== 'choice') return;
    expect(talk.options.find(({ id }) => id === talk.correctOptionId)?.label)
      .toBe('What does the expression ‘talk about’ mean?');
    expect(talk.explanation).toContain('谈论某事');

    const sport = question('advanced/task-01/session-01/question-05');
    expect(sport?.prompt).toContain('expression ‘play hockey’');
    expect(sport?.kind).toBe('choice');
    if (sport?.kind !== 'choice') return;
    expect(sport.options.find(({ id }) => id === sport.correctOptionId)?.label).toBe('Yes, I do.');
  });

  it('orders a natural sentence and keeps target categories aligned', () => {
    const order = question('basic/task-01/session-01/question-08');
    expect(order?.prompt).toContain('我想学习这个词语');
    expect(order?.kind).toBe('order');
    if (order?.kind !== 'order') return;
    expect(order.correctOrder.map((id) => order.items.find((item) => item.id === id)?.label).join(' '))
      .toBe('I would like to learn this word .');

    const cases = [
      ['basic/task-01/session-01/question-07', ['hockey', 'talk about hockey', 'beaver', 'raccoon']],
      ['basic/task-02/session-01/question-07', ['hockey', 'play hockey', 'beaver', 'moose']],
      ['advanced/task-01/session-01/question-07', ['hockey', 'a special game', 'beaver', 'a beaver']],
      ['advanced/task-02/session-01/question-07', ['talk about hockey', 'play hockey', 'raccoon', 'moose']],
      ['high/task-01/session-01/question-07', ['talk about hockey', 'a special game', 'raccoon', 'a beaver']],
      ['high/task-02/session-01/question-07', ['play hockey', 'a special game', 'moose', 'a beaver']],
    ] as const;

    for (const [id, labels] of cases) {
      const activity = question(id);
      expect(activity?.kind, id).toBe('categorize');
      if (activity?.kind !== 'categorize') continue;
      expect(activity.categories.map(({ label }) => label), id).toEqual(['冰球和比赛表达', '野生动物']);
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
