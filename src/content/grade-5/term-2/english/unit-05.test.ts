import { describe, expect, it } from 'vitest';
import { unit } from './unit-05';

function question(id: string) {
  return Object.values(unit.difficultyTracks)
    .flatMap((track) => track.tasks)
    .flatMap((task) => task.sessions)
    .flatMap((session) => session.activities)
    .find((activity) => activity.id === `${unit.id}/${id}`);
}

describe('grade 5 English Unit 5 question cards', () => {
  it('keeps the phrase, proper-name, category, and word-order questions clear', () => {
    const phrase = question('basic/task-01/session-01/question-05');
    expect(phrase?.prompt).toContain('went to the beach');
    expect(phrase?.kind).toBe('choice');
    if (phrase?.kind !== 'choice') return;
    expect(phrase.options.find((option) => option.id === phrase.correctOptionId)?.label).toBe('What does “went to the beach” mean?');

    const properName = question('basic/task-01/session-01/question-06');
    expect(properName?.prompt).toContain('How do you say ‘the Stone Forest’ in Chinese?');
    expect(properName?.explanation).toContain('石林');
    expect(properName?.kind).toBe('choice');
    if (properName?.kind !== 'choice') return;
    expect(properName.options.find(({ id }) => id === properName.correctOptionId)?.label).toBe('石林');

    const categories = question('basic/task-01/session-01/question-07');
    expect(categories?.kind).toBe('categorize');
    if (categories?.kind !== 'categorize') return;
    expect(categories.categories.map(({ label }) => label)).toEqual(['旅行活动', '地点或评价']);
    expect(categories.items.find(({ label }) => label === 'delicious')?.categoryId).toBe(categories.categories[1]?.id);

    const sentence = question('basic/task-01/session-01/question-08');
    expect(sentence?.kind).toBe('order');
    if (sentence?.kind !== 'order') return;
    expect(sentence.correctOrder.map((id) => sentence.items.find((item) => item.id === id)?.label)).toEqual([
      'I', 'would', 'like', 'to', 'learn', 'this', 'phrase', '.',
    ]);
  });

  it('checks past-tense keys, travel dialogue, and self-contained note evidence', () => {
    const past = question('basic/task-02/session-01/question-03');
    expect(past?.kind).toBe('choice');
    if (past?.kind !== 'choice') return;
    expect(past.options.find(({ id }) => id === past.correctOptionId)?.label).toBe('went');

    const match = question('basic/task-02/session-01/question-04');
    expect(match?.kind).toBe('match');
    if (match?.kind !== 'match') return;
    expect(match.pairs.map(({ left, right }) => [left, right])).toEqual([
      ['go to the beach', 'went to the beach'], ['swim', 'swam'], ['eat ice cream', 'ate ice cream'],
    ]);

    const dialogue = question('advanced/task-01/session-01/question-01');
    expect(dialogue?.prompt).toContain('Where did you go last summer?');
    const passage = question('advanced/task-02/session-01/question-01');
    expect(passage?.prompt).toContain('Last summer, I went to the Stone Forest with my family.');
    expect(passage?.prompt).toContain('We saw flowers and took photos.');
    expect(passage?.prompt).toContain('I ate ice cream and felt happy.');
  });

  it('combines distinct trip constraints in the high tier and preserves the stated evidence', () => {
    const plan = question('high/task-01/session-01/question-01');
    expect(plan?.kind).toBe('choice');
    expect(plan?.prompt).toContain('nature site on Saturday');
    expect(plan?.prompt).toContain('swim at the beach on Sunday');
    if (plan?.kind !== 'choice') return;
    const correct = plan.options.find(({ id }) => id === plan.correctOptionId)?.label;
    expect(correct).toContain('Visit the Stone Forest on Saturday.');
    expect(correct).toContain('Swim at the beach on Sunday.');

    const diary = question('high/task-02/session-01/question-01');
    expect(diary?.kind).toBe('choice');
    expect(diary?.prompt).toContain('On Saturday, we went to the beach and swam.');
    expect(diary?.prompt).toContain('On Sunday, we visited the Stone Forest and took photos.');
    const pastCheck = question('high/task-02/session-01/question-05');
    expect(pastCheck?.kind).toBe('choice');
    expect(pastCheck?.prompt).toContain('past-tense verbs');
    expect(pastCheck?.prompt).toContain('yesterday');
    if (pastCheck?.kind !== 'choice') return;
    expect(pastCheck.options.find(({ id }) => id === pastCheck.correctOptionId)?.label).toContain('Mia took photos at the Stone Forest yesterday.');
  });

  it('renders all 48 cards with non-empty prompts, hints, and explanations', () => {
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
