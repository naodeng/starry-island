import { describe, expect, it } from 'vitest';
import { unit } from './unit-05';

function question(id: string) {
  return Object.values(unit.difficultyTracks)
    .flatMap((track) => track.tasks)
    .flatMap((task) => task.sessions)
    .flatMap((session) => session.activities)
    .find((activity) => activity.id === `${unit.id}/${id}`);
}

describe('grade 6 English Unit 5 question cards', () => {
  it('quotes target words in meaning questions and keeps the answer key', () => {
    const inventor = question('basic/task-01/session-01/question-05');
    expect(inventor?.prompt).toContain('inventor');
    expect(inventor?.kind).toBe('choice');
    if (inventor?.kind !== 'choice') return;
    expect(inventor.options.find(({ id }) => id === inventor.correctOptionId)?.label).toBe('What does ‘inventor’ mean?');
    expect(inventor.explanation).toContain('“What does ‘inventor’ mean?”');

    const poet = question('basic/task-01/session-01/question-06');
    expect(poet?.prompt).toContain('What does ‘poet’ mean?');
    expect(poet?.kind).toBe('choice');
    if (poet?.kind !== 'choice') return;
    expect(poet.options.find(({ id }) => id === poet.correctOptionId)?.label).toBe('它的意思是“诗人”。');
  });

  it('orders a natural sentence and uses distinct goals across tiers', () => {
    const learn = question('basic/task-01/session-01/question-08');
    expect(learn?.prompt).toContain('我想学习这个词语');
    expect(learn?.kind).toBe('order');
    if (learn?.kind !== 'order') return;
    expect(learn.correctOrder.map((id) => learn.items.find((item) => item.id === id)?.label).join(' '))
      .toBe('I would like to learn this word .');

    const challenge = question('high/task-01/session-01/question-05');
    expect(challenge?.kind).toBe('choice');
    if (challenge?.kind !== 'choice') return;
    expect(challenge.prompt).toContain('A题');
    expect(challenge.prompt).toContain('B题');
    expect(challenge.options.find(({ id }) => id === challenge.correctOptionId)?.label)
      .toContain('check its spelling and meaning');
  });

  it('keeps profession and creative-work classifications aligned', () => {
    const cases = [
      ['basic/task-01/session-01/question-07', ['inventor', 'artist', 'poem', 'paint']],
      ['basic/task-02/session-01/question-07', ['inventor', 'scientist', 'poem', 'invention']],
      ['advanced/task-01/session-01/question-07', ['inventor', 'poet', 'poem', 'invent']],
      ['advanced/task-02/session-01/question-07', ['artist', 'scientist', 'paint', 'invention']],
      ['high/task-01/session-01/question-07', ['artist', 'poet', 'paint', 'invent']],
      ['high/task-02/session-01/question-07', ['scientist', 'poet', 'invention', 'invent']],
    ] as const;

    for (const [id, labels] of cases) {
      const activity = question(id);
      expect(activity?.kind, id).toBe('categorize');
      if (activity?.kind !== 'categorize') continue;
      expect(activity.categories.map(({ label }) => label), id).toEqual(['人物职业', '作品和创作']);
      expect(activity.items.map(({ label }) => label), id).toEqual(labels);
      expect(activity.items.map(({ categoryId }) => categoryId.split('/').at(-1)), id).toEqual([
        'category-01', 'category-01', 'category-02', 'category-02',
      ]);
    }
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
