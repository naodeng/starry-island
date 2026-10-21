import { describe, expect, it } from 'vitest';
import { unit } from './unit-02';

function question(id: string) {
  return Object.values(unit.difficultyTracks)
    .flatMap((track) => track.tasks)
    .flatMap((task) => task.sessions)
    .flatMap((session) => session.activities)
    .find((activity) => activity.id === `${unit.id}/${id}`);
}

describe('grade 6 English Term 2 Unit 2 question cards', () => {
  it('distinguishes names from common places and keeps place meanings aligned', () => {
    const queenPark = question('basic/task-01/session-01/question-02');
    expect(queenPark?.kind).toBe('choice');
    if (queenPark?.kind !== 'choice') return;
    expect(queenPark.options.find(({ id }) => id === queenPark.correctOptionId)?.label).toBe('Queen’s Park');

    const lake = question('high/task-02/session-01/question-05');
    expect(lake?.kind).toBe('choice');
    if (lake?.kind !== 'choice') return;
    expect(lake.prompt).toContain('词卡名称');
    expect(lake.options.find(({ id }) => id === lake.correctOptionId)?.label)
      .toContain('the name ‘Lake Ontario’');

    const show = question('basic/task-01/session-01/question-01');
    expect(show?.kind).toBe('choice');
    if (show?.kind !== 'choice') return;
    expect(show.explanation).toContain('带领某人参观');
  });

  it('uses expression for multiword terms and orders a natural learning sentence', () => {
    const show = question('basic/task-01/session-01/question-05');
    expect(show?.prompt).toContain('表达 show around');
    expect(show?.kind).toBe('choice');
    if (show?.kind !== 'choice') return;
    expect(show.options.find(({ id }) => id === show.correctOptionId)?.label)
      .toBe('What does the expression ‘show around’ mean?');

    const yesNo = question('advanced/task-01/session-01/question-05');
    expect(yesNo?.prompt).toContain('expression ‘a public library’');
    expect(yesNo?.kind).toBe('choice');
    if (yesNo?.kind !== 'choice') return;
    expect(yesNo.options.find(({ id }) => id === yesNo.correctOptionId)?.label).toBe('Yes, I do.');

    const order = question('basic/task-01/session-01/question-08');
    expect(order?.kind).toBe('order');
    if (order?.kind !== 'order') return;
    expect(order.correctOrder.map((id) => order.items.find((item) => item.id === id)?.label).join(' '))
      .toBe('I would like to learn this word .');
  });

  it('separates proper place names from ordinary places in every classification', () => {
    const cases = [
      ['basic/task-01/session-01/question-07', ['Queen’s Park', 'art gallery', 'downtown', 'Lake Ontario'], ['category-01', 'category-02', 'category-02', 'category-01']],
      ['basic/task-02/session-01/question-07', ['Queen’s Park', 'public library', 'downtown', 'a park'], ['category-01', 'category-02', 'category-02', 'category-02']],
      ['advanced/task-01/session-01/question-07', ['Queen’s Park', 'stadium', 'downtown', 'the downtown area'], ['category-01', 'category-02', 'category-02', 'category-02']],
      ['advanced/task-02/session-01/question-07', ['art gallery', 'public library', 'Lake Ontario', 'a park'], ['category-02', 'category-02', 'category-01', 'category-02']],
      ['high/task-01/session-01/question-07', ['art gallery', 'stadium', 'Lake Ontario', 'the downtown area'], ['category-02', 'category-02', 'category-01', 'category-02']],
      ['high/task-02/session-01/question-07', ['Queen’s Park', 'Lake Ontario', 'a park', 'the downtown area'], ['category-01', 'category-01', 'category-02', 'category-02']],
    ] as const;

    for (const [id, labels, categories] of cases) {
      const activity = question(id);
      expect(activity?.kind, id).toBe('categorize');
      if (activity?.kind !== 'categorize') continue;
      expect(activity.categories.map(({ label }) => label), id).toEqual(['专名地点', '普通场所和区域']);
      expect(activity.items.map(({ label }) => label), id).toEqual(labels);
      expect(activity.items.map(({ categoryId }) => categoryId.split('/').at(-1)), id).toEqual(categories);
    }
  });

  it('combines two independent checks at the challenge tier', () => {
    const challenge = question('high/task-01/session-01/question-05');
    expect(challenge?.kind).toBe('choice');
    if (challenge?.kind !== 'choice') return;
    expect(challenge.prompt).toContain('A题');
    expect(challenge.prompt).toContain('B题');
    expect(challenge.options.find(({ id }) => id === challenge.correctOptionId)?.label)
      .toContain('Use the expression ‘art gallery’');
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
