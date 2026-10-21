import { describe, expect, it } from 'vitest';
import { unit } from './review-01';

function question(id: string) {
  return Object.values(unit.difficultyTracks)
    .flatMap((track) => track.tasks)
    .flatMap((task) => task.sessions)
    .flatMap((session) => session.activities)
    .find((activity) => activity.id === `${unit.id}/${id}`);
}

describe('grade 6 English Revision 1 question cards', () => {
  it('uses a quoted phrase, accurate landmark name, and natural learning sentence', () => {
    const phrase = question('basic/task-01/session-01/question-05');
    expect(phrase?.kind).toBe('choice');
    if (phrase?.kind !== 'choice') return;
    expect(phrase.options.find(({ id }) => id === phrase.correctOptionId)?.label).toBe('What does “morning tea” mean?');

    const tower = question('basic/task-01/session-01/question-06');
    expect(tower?.kind).toBe('choice');
    if (tower?.kind !== 'choice') return;
    expect(tower.options.find(({ id }) => id === tower.correctOptionId)?.label).toBe('加拿大国家电视塔');

    const order = question('basic/task-01/session-01/question-08');
    expect(order?.kind).toBe('order');
    if (order?.kind !== 'order') return;
    expect(order.correctOrder.map((id) => order.items.find((item) => item.id === id)?.label)).toEqual([
      'I', 'would', 'like', 'to', 'learn', 'this', 'phrase', '.',
    ]);
  });

  it('keeps animal categories and place facts aligned with each card', () => {
    const animal = question('basic/task-02/session-01/question-02');
    expect(animal?.prompt).toContain('A penguin is a bird.');
    expect(animal?.kind).toBe('choice');
    if (animal?.kind !== 'choice') return;
    expect(animal.options.find(({ id }) => id === animal.correctOptionId)?.label).toBe('A bird.');

    const facts = question('advanced/task-02/session-01/question-05');
    expect(facts?.prompt).toContain('London—city in the UK');
    expect(facts?.prompt).toContain('Yangtze River—China');
    expect(facts?.prompt).toContain('penguin—bird');

    const display = question('high/task-02/session-01/question-07');
    expect(display?.kind).toBe('categorize');
    if (display?.kind !== 'categorize') return;
    expect(display.items.find(({ label }) => label === 'The CN Tower is in Toronto.')?.categoryId).toBe(display.categories[0]?.id);
    expect(display.items.find(({ label }) => label === 'A penguin is a reptile.')?.categoryId).toBe(display.categories[1]?.id);
  });

  it('combines multiple location and animal checks with the correct answer keys', () => {
    const plan = question('high/task-01/session-01/question-01');
    expect(plan?.kind).toBe('choice');
    expect(plan?.prompt).toContain('landmark matched with its city');
    expect(plan?.prompt).toContain('animal matched with its group');
    if (plan?.kind !== 'choice') return;
    expect(plan.options.find(({ id }) => id === plan.correctOptionId)?.label).toContain('whale—mammal.');

    const source = question('high/task-02/session-01/question-05');
    expect(source?.prompt).toContain('London is in the UK.');
    expect(source?.prompt).toContain('The Yangtze River is in China.');
    expect(source?.prompt).toContain('A whale is a mammal.');
    if (source?.kind !== 'choice') return;
    expect(source.options.find(({ id }) => id === source.correctOptionId)?.label).toContain('Yangtze River—China; whale—mammal.');
  });

  it('renders 48 distinct cards with non-empty feedback and valid answer references', () => {
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
