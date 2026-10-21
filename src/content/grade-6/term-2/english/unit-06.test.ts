import { describe, expect, it } from 'vitest';
import { unit } from './unit-06';

function question(id: string) {
  return Object.values(unit.difficultyTracks)
    .flatMap((track) => track.tasks)
    .flatMap((task) => task.sessions)
    .flatMap((session) => session.activities)
    .find((activity) => activity.id === `${unit.id}/${id}`);
}

describe('grade 6 English Term 2 Unit 6 question cards', () => {
  it('quotes dictionary and food expressions, with accurate meanings', () => {
    const dictionary = question('basic/task-01/session-01/question-05');
    expect(dictionary?.kind).toBe('choice');
    if (dictionary?.kind !== 'choice') return;
    expect(dictionary.options.find(({ id }) => id === dictionary.correctOptionId)?.label)
      .toBe('What does the expression ‘English-Chinese dictionary’ mean?');
    expect(dictionary.explanation).toContain('英汉词典');

    const hotPot = question('basic/task-02/session-01/question-05');
    expect(hotPot?.prompt).toContain('短语‘hot pot’');
    expect(hotPot?.kind).toBe('choice');
    if (hotPot?.kind !== 'choice') return;
    expect(hotPot.options.find(({ id }) => id === hotPot.correctOptionId)?.label)
      .toBe('I know the phrase “hot pot”.');
  });

  it('calls multiword terms expressions and orders a natural sentence', () => {
    const yesNo = question('advanced/task-01/session-01/question-05');
    expect(yesNo?.prompt).toContain('expression ‘an amazing place’');
    expect(yesNo?.kind).toBe('choice');
    if (yesNo?.kind !== 'choice') return;
    expect(yesNo.options.find(({ id }) => id === yesNo.correctOptionId)?.label).toBe('Yes, I do.');

    const order = question('basic/task-01/session-01/question-08');
    expect(order?.prompt).toContain('我想学习这个词语');
    expect(order?.kind).toBe('order');
    if (order?.kind !== 'order') return;
    expect(order.correctOrder.map((id) => order.items.find((item) => item.id === id)?.label).join(' '))
      .toBe('I would like to learn this word .');
  });

  it('keeps shopping places separate from the dictionary, evaluation, and food terms', () => {
    const cases = [
      ['basic/task-01/session-01/question-07', ['shopping centre', 'shopping mall', 'English-Chinese dictionary', 'amazing']],
      ['basic/task-02/session-01/question-07', ['shopping centre', 'a shopping centre', 'English-Chinese dictionary', 'hot pot']],
      ['advanced/task-01/session-01/question-07', ['shopping centre', 'a shopping mall', 'English-Chinese dictionary', 'eat hot pot']],
      ['advanced/task-02/session-01/question-07', ['shopping mall', 'a shopping centre', 'amazing', 'hot pot']],
      ['high/task-01/session-01/question-07', ['shopping mall', 'a shopping mall', 'amazing', 'eat hot pot']],
      ['high/task-02/session-01/question-07', ['a shopping centre', 'a shopping mall', 'hot pot', 'eat hot pot']],
    ] as const;

    for (const [id, labels] of cases) {
      const activity = question(id);
      expect(activity?.kind, id).toBe('categorize');
      if (activity?.kind !== 'categorize') continue;
      expect(activity.categories.map(({ label }) => label), id).toEqual(['购物场所', '词典、评价和美食']);
      expect(activity.items.map(({ label }) => label), id).toEqual(labels);
      expect(activity.items.map(({ categoryId }) => categoryId.split('/').at(-1)), id).toEqual([
        'category-01', 'category-01', 'category-02', 'category-02',
      ]);
    }
  });

  it('combines the theme goal with accurate vocabulary in the challenge tier', () => {
    const challenge = question('high/task-01/session-01/question-05');
    expect(challenge?.kind).toBe('choice');
    if (challenge?.kind !== 'choice') return;
    expect(challenge.prompt).toContain('A题');
    expect(challenge.prompt).toContain('B题');
    expect(challenge.options.find(({ id }) => id === challenge.correctOptionId)?.label)
      .toContain('Use the expression ‘shopping mall’');
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
