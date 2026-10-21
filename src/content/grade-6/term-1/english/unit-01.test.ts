import { describe, expect, it } from 'vitest';
import { unit } from './unit-01';

function question(id: string) {
  return Object.values(unit.difficultyTracks)
    .flatMap((track) => track.tasks)
    .flatMap((task) => task.sessions)
    .flatMap((session) => session.activities)
    .find((activity) => activity.id === `${unit.id}/${id}`);
}

describe('grade 6 English Unit 1 question cards', () => {
  it('asks naturally about target phrases and the Chinese name of the landmark', () => {
    const tea = question('basic/task-01/session-01/question-05');
    expect(tea?.kind).toBe('choice');
    if (tea?.kind !== 'choice') return;
    expect(tea.options.find(({ id }) => id === tea.correctOptionId)?.label).toBe('What does “morning tea” mean?');

    const palace = question('basic/task-01/session-01/question-06');
    expect(palace?.prompt).toContain('How do you say ‘the Potala Palace’ in Chinese?');
    expect(palace?.kind).toBe('choice');
    if (palace?.kind !== 'choice') return;
    expect(palace.options.find(({ id }) => id === palace.correctOptionId)?.label).toBe('它的名称是“布达拉宫”。');
  });

  it('uses categories that describe every card in each sorting activity', () => {
    const cases = [
      ['basic/task-01/session-01/question-07', ['地理方位', '饮食'], ['north', 'south', 'morning tea', 'soup']],
      ['basic/task-02/session-01/question-07', ['地理方位', '地点和景点'], ['north', 'east', 'garden', 'the Summer Palace']],
      ['advanced/task-01/session-01/question-07', ['地理方位', '地点和饮食'], ['north', 'west', 'garden', 'morning tea']],
      ['advanced/task-02/session-01/question-07', ['地理方位', '中国景点'], ['south', 'east', 'the Potala Palace', 'the Summer Palace']],
      ['high/task-01/session-01/question-07', ['地理方位', '景点与饮食'], ['south', 'west', 'the Potala Palace', 'morning tea']],
      ['high/task-02/session-01/question-07', ['地理方位', '景点与饮食'], ['east', 'west', 'the Summer Palace', 'morning tea']],
    ] as const;

    for (const [id, expectedCategories, expectedLabels] of cases) {
      const activity = question(id);
      expect(activity?.kind, id).toBe('categorize');
      if (activity?.kind !== 'categorize') continue;
      expect(activity.categories.map(({ label }) => label), id).toEqual(expectedCategories);
      expect(activity.items.map(({ label }) => label), id).toEqual(expectedLabels);
      expect(new Set(activity.items.map(({ categoryId }) => categoryId)).size, id).toBe(2);
    }
  });

  it('uses a natural place-name sentence and distinguishes the tier goals', () => {
    const name = question('basic/task-02/session-01/question-05');
    expect(name?.prompt).toContain('the Summer Palace 这个地名');
    expect(name?.kind).toBe('choice');
    if (name?.kind !== 'choice') return;
    expect(name.options.find(({ id }) => id === name.correctOptionId)?.label).toBe('I know the name “the Summer Palace”.');

    const advanced = question('advanced/task-02/session-01/question-05');
    expect(advanced?.prompt).toContain('原创便笺');
    const high = question('high/task-01/session-01/question-05');
    expect(high?.prompt).toContain('A题');
    expect(high?.prompt).toContain('B题');
    const ordered = question('basic/task-01/session-01/question-08');
    expect(ordered?.kind).toBe('order');
    if (ordered?.kind !== 'order') return;
    expect(ordered.correctOrder.map((id) => ordered.items.find((item) => item.id === id)?.label)).toEqual([
      'I', 'would', 'like', 'to', 'learn', 'this', 'word', '.',
    ]);
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
