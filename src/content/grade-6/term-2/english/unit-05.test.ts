import { describe, expect, it } from 'vitest';
import { unit } from './unit-05';

function question(id: string) {
  return Object.values(unit.difficultyTracks)
    .flatMap((track) => track.tasks)
    .flatMap((task) => task.sessions)
    .flatMap((session) => session.activities)
    .find((activity) => activity.id === `${unit.id}/${id}`);
}

describe('grade 6 English Term 2 Unit 5 question cards', () => {
  it('quotes meaning targets and provides a grammatical, relevant distractor', () => {
    const countryside = question('basic/task-01/session-01/question-05');
    expect(countryside?.kind).toBe('choice');
    if (countryside?.kind !== 'choice') return;
    expect(countryside.options.find(({ id }) => id === countryside.correctOptionId)?.label)
      .toBe('What does ‘countryside’ mean?');
    expect(countryside.options.map(({ label }) => label)).toContain('How do you spell ‘countryside’?');

    const meaning = question('basic/task-01/session-01/question-06');
    expect(meaning?.prompt).toContain('What does ‘squirrel’ mean?');
    expect(meaning?.kind).toBe('choice');
    if (meaning?.kind !== 'choice') return;
    expect(meaning.options.find(({ id }) => id === meaning.correctOptionId)?.label).toBe('它的意思是“松鼠”。');
  });

  it('uses phrase for multiword vocabulary and orders a natural sentence', () => {
    const thanksgiving = question('basic/task-02/session-01/question-06');
    expect(thanksgiving?.prompt).toContain('短语‘Thanksgiving dinner’');
    expect(thanksgiving?.kind).toBe('choice');
    if (thanksgiving?.kind !== 'choice') return;
    expect(thanksgiving.options.find(({ id }) => id === thanksgiving.correctOptionId)?.label)
      .toBe('I also know the phrase “Thanksgiving dinner”.');

    const phrase = question('advanced/task-01/session-01/question-05');
    expect(phrase?.prompt).toContain('phrase ‘a squirrel’');
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

  it('keeps food and holiday terms separate from rural animals and places', () => {
    const cases = [
      ['basic/task-01/session-01/question-07', ['Thanksgiving', 'roast turkey', 'countryside', 'squirrel']],
      ['basic/task-02/session-01/question-07', ['Thanksgiving', 'Thanksgiving dinner', 'countryside', 'swan']],
      ['advanced/task-01/session-01/question-07', ['Thanksgiving', 'a roast turkey', 'countryside', 'a squirrel']],
      ['advanced/task-02/session-01/question-07', ['roast turkey', 'Thanksgiving dinner', 'squirrel', 'swan']],
      ['high/task-01/session-01/question-07', ['roast turkey', 'a roast turkey', 'squirrel', 'a squirrel']],
      ['high/task-02/session-01/question-07', ['Thanksgiving dinner', 'a roast turkey', 'swan', 'a squirrel']],
    ] as const;

    for (const [id, labels] of cases) {
      const activity = question(id);
      expect(activity?.kind, id).toBe('categorize');
      if (activity?.kind !== 'categorize') continue;
      expect(activity.categories.map(({ label }) => label), id).toEqual(['节日和食物', '乡村动物和地点']);
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
      .toContain('Use the phrase ‘roast turkey’');
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
