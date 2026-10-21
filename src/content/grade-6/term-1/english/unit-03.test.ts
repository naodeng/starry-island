import { describe, expect, it } from 'vitest';
import { unit } from './unit-03';

function question(id: string) {
  return Object.values(unit.difficultyTracks)
    .flatMap((track) => track.tasks)
    .flatMap((task) => task.sessions)
    .flatMap((session) => session.activities)
    .find((activity) => activity.id === `${unit.id}/${id}`);
}

describe('grade 6 English Unit 3 question cards', () => {
  it('quotes animal-group words and keeps translations aligned', () => {
    const reptile = question('basic/task-01/session-01/question-05');
    expect(reptile?.kind).toBe('choice');
    if (reptile?.kind !== 'choice') return;
    expect(reptile.options.find(({ id }) => id === reptile.correctOptionId)?.label).toBe('What does “reptile” mean?');

    const mammal = question('basic/task-01/session-01/question-06');
    expect(mammal?.prompt).toContain('What does ‘mammal’ mean?');
    expect(mammal?.kind).toBe('choice');
    if (mammal?.kind !== 'choice') return;
    expect(mammal.options.find(({ id }) => id === mammal.correctOptionId)?.label).toBe('它的意思是“哺乳动物”。');

    const tusk = question('advanced/task-01/session-01/question-04');
    expect(tusk?.kind).toBe('choice');
    if (tusk?.kind !== 'choice') return;
    expect(tusk.options.find(({ id }) => id === tusk.correctOptionId)?.label).toBe('长牙');
  });

  it('separates animal groups from animal names in each sort', () => {
    const ids = [
      'basic/task-01/session-01/question-07',
      'basic/task-02/session-01/question-07',
      'advanced/task-01/session-01/question-07',
      'advanced/task-02/session-01/question-07',
      'high/task-01/session-01/question-07',
      'high/task-02/session-01/question-07',
    ];

    for (const id of ids) {
      const activity = question(id);
      expect(activity?.kind, id).toBe('categorize');
      if (activity?.kind !== 'categorize') continue;
      expect(activity.categories.map(({ label }) => label), id).toEqual(['动物类别', '动物名称']);
      expect(activity.items.map(({ categoryId }) => categoryId), id).toHaveLength(4);
      expect(new Set(activity.items.map(({ categoryId }) => categoryId)).size, id).toBe(2);
    }

    const penguin = question('high/task-02/session-01/question-01');
    expect(penguin?.kind).toBe('choice');
    if (penguin?.kind !== 'choice') return;
    expect(penguin.options.find(({ id }) => id === penguin.correctOptionId)?.label).toContain('penguin');
  });

  it('makes the high tier check independent criteria together', () => {
    const first = question('high/task-01/session-01/question-01');
    expect(first?.kind).toBe('choice');
    if (first?.kind !== 'choice') return;
    expect(first.prompt).toContain('fish');
    expect(first.prompt).toContain('鲨鱼');
    expect(first.options.find(({ id }) => id === first.correctOptionId)?.label).toContain('shark');

    const correction = question('high/task-01/session-01/question-02');
    expect(correction?.prompt).toContain('只改正B题并保留A题');
    expect(correction?.kind).toBe('choice');
    if (correction?.kind !== 'choice') return;
    expect(correction.options.find(({ id }) => id === correction.correctOptionId)?.label).toContain('shark');
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
