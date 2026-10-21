import { describe, expect, it } from 'vitest';
import { unit } from './unit-01';

function question(id: string) {
  return Object.values(unit.difficultyTracks)
    .flatMap((track) => track.tasks)
    .flatMap((task) => task.sessions)
    .flatMap((session) => session.activities)
    .find((activity) => activity.id === `${unit.id}/${id}`);
}

describe('grade 6 English Term 2 Unit 1 question cards', () => {
  it('disambiguates live and quotes target words in meaning questions', () => {
    const live = question('basic/task-01/session-01/question-05');
    expect(live?.prompt).toContain('live（居住）');
    expect(live?.kind).toBe('choice');
    if (live?.kind !== 'choice') return;
    expect(live.options.find(({ id }) => id === live.correctOptionId)?.label).toBe('What does ‘live’ mean?');
    expect(live.explanation).toContain('与表示“活着”的 live 区分开');

    const airport = question('basic/task-01/session-01/question-06');
    expect(airport?.prompt).toContain('What does ‘airport’ mean?');
    expect(airport?.kind).toBe('choice');
    if (airport?.kind !== 'choice') return;
    expect(airport.options.find(({ id }) => id === airport.correctOptionId)?.label).toBe('它的意思是“机场”。');
  });

  it('calls multiword items expressions and orders a natural learning sentence', () => {
    const yesNo = question('advanced/task-01/session-01/question-05');
    expect(yesNo?.prompt).toContain('expression ‘arrive at the airport’');
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

  it('classifies actions separately from people, places, and objects', () => {
    const cases = [
      ['basic/task-01/session-01/question-07', ['live', 'arrive', 'scarf', 'airport']],
      ['basic/task-02/session-01/question-07', ['live', 'meet', 'scarf', 'pupil']],
      ['advanced/task-01/session-01/question-07', ['live', 'arrive at the airport', 'scarf', 'wardrobe']],
      ['advanced/task-02/session-01/question-07', ['arrive', 'meet', 'airport', 'pupil']],
      ['high/task-01/session-01/question-07', ['arrive', 'arrive at the airport', 'airport', 'wardrobe']],
      ['high/task-02/session-01/question-07', ['meet', 'arrive at the airport', 'pupil', 'wardrobe']],
    ] as const;

    for (const [id, labels] of cases) {
      const activity = question(id);
      expect(activity?.kind, id).toBe('categorize');
      if (activity?.kind !== 'categorize') continue;
      expect(activity.categories.map(({ label }) => label), id).toEqual(['动作表达', '人物、地点和物品']);
      expect(activity.items.map(({ label }) => label), id).toEqual(labels);
      expect(activity.items.map(({ categoryId }) => categoryId.split('/').at(-1)), id).toEqual([
        'category-01', 'category-01', 'category-02', 'category-02',
      ]);
    }
  });

  it('combines the two stated checks in the challenge tier', () => {
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
