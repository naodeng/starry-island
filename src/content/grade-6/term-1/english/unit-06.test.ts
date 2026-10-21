import { describe, expect, it } from 'vitest';
import { unit } from './unit-06';

function question(id: string) {
  return Object.values(unit.difficultyTracks)
    .flatMap((track) => track.tasks)
    .flatMap((task) => task.sessions)
    .flatMap((session) => session.activities)
    .find((activity) => activity.id === `${unit.id}/${id}`);
}

describe('grade 6 English Unit 6 question cards', () => {
  it('quotes target phrases and keeps their meanings and answer keys aligned', () => {
    const winterVacation = question('basic/task-01/session-01/question-05');
    expect(winterVacation?.kind).toBe('choice');
    if (winterVacation?.kind !== 'choice') return;
    expect(winterVacation.options.find(({ id }) => id === winterVacation.correctOptionId)?.label)
      .toBe('What does ‘winter vacation’ mean?');

    const dumpling = question('basic/task-01/session-01/question-02');
    expect(dumpling?.kind).toBe('choice');
    if (dumpling?.kind !== 'choice') return;
    expect(dumpling.options.find(({ id }) => id === dumpling.correctOptionId)?.label).toBe('dumpling');
    expect(dumpling.explanation).toContain('饺子');
    expect(dumpling.explanation).not.toContain('汤团');
  });

  it('uses a natural sentence order and distinguishes objects from actions and feelings', () => {
    const learn = question('basic/task-01/session-01/question-08');
    expect(learn?.prompt).toContain('我想学习这个词语');
    expect(learn?.kind).toBe('order');
    if (learn?.kind !== 'order') return;
    expect(learn.correctOrder.map((id) => learn.items.find((item) => item.id === id)?.label).join(' '))
      .toBe('I would like to learn this word .');

    const cases = [
      ['basic/task-01/session-01/question-07', ['dumpling', 'fan', 'bring', 'be afraid of']],
      ['basic/task-02/session-01/question-07', ['dumpling', 'ice lantern', 'bring', 'hear']],
      ['advanced/task-01/session-01/question-07', ['dumpling', 'pen pal', 'bring', 'look forward to']],
      ['advanced/task-02/session-01/question-07', ['fan', 'ice lantern', 'be afraid of', 'hear']],
      ['high/task-01/session-01/question-07', ['fan', 'pen pal', 'be afraid of', 'look forward to']],
      ['high/task-02/session-01/question-07', ['ice lantern', 'pen pal', 'hear', 'look forward to']],
    ] as const;

    for (const [id, labels] of cases) {
      const activity = question(id);
      expect(activity?.kind, id).toBe('categorize');
      if (activity?.kind !== 'categorize') continue;
      expect(activity.categories.map(({ label }) => label), id).toEqual(['人物和物品', '动作与感受表达']);
      expect(activity.items.map(({ label }) => label), id).toEqual(labels);
      expect(activity.items.map(({ categoryId }) => categoryId.split('/').at(-1)), id).toEqual([
        'category-01', 'category-01', 'category-02', 'category-02',
      ]);
    }
  });

  it('combines the theme goal with accurate word meaning in the challenge tier', () => {
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
