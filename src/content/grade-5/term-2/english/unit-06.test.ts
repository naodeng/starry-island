import { describe, expect, it } from 'vitest';
import { unit } from './unit-06';

function question(id: string) {
  return Object.values(unit.difficultyTracks)
    .flatMap((track) => track.tasks)
    .flatMap((task) => task.sessions)
    .flatMap((session) => session.activities)
    .find((activity) => activity.id === `${unit.id}/${id}`);
}

describe('grade 5 English Unit 6 question cards', () => {
  it('uses quoted phrases and a natural sentence for vocabulary learning', () => {
    const meaning = question('basic/task-01/session-01/question-05');
    expect(meaning?.prompt).toContain('was born');
    expect(meaning?.kind).toBe('choice');
    if (meaning?.kind !== 'choice') return;
    expect(meaning.options.find(({ id }) => id === meaning.correctOptionId)?.label).toBe('What does “was born” mean?');

    const sentence = question('basic/task-01/session-01/question-08');
    expect(sentence?.kind).toBe('order');
    if (sentence?.kind !== 'order') return;
    expect(sentence.correctOrder.map((id) => sentence.items.find((item) => item.id === id)?.label)).toEqual([
      'I', 'would', 'like', 'to', 'learn', 'this', 'phrase', '.',
    ]);
  });

  it('maps age clues, milestones, and past-tense forms correctly', () => {
    const note = question('basic/task-02/session-01/question-01');
    expect(note?.prompt).toContain('Leo learned to walk when he was one.');
    expect(note?.prompt).toContain('He started to speak when he was two.');
    expect(question('basic/task-02/session-01/question-02')?.prompt).toContain('Leo started to speak when he was two.');

    const past = question('basic/task-02/session-01/question-03');
    expect(past?.kind).toBe('choice');
    if (past?.kind !== 'choice') return;
    expect(past.options.find(({ id }) => id === past.correctOptionId)?.label).toBe('learned');

    const forms = question('basic/task-02/session-01/question-04');
    expect(forms?.kind).toBe('match');
    if (forms?.kind !== 'match') return;
    expect(forms.pairs.map(({ left, right }) => [left, right])).toEqual([
      ['start to speak', 'started to speak'],
      ['learn to walk', 'learned to walk'],
      ['go to kindergarten', 'went to kindergarten'],
    ]);

    const milestones = question('advanced/task-02/session-01/question-06');
    expect(milestones?.kind).toBe('categorize');
    if (milestones?.kind !== 'categorize') return;
    expect(milestones.items.find(({ label }) => label === 'Mia went to kindergarten when she was three.')?.categoryId).toBe(milestones.categories[0]?.id);
    expect(milestones.items.find(({ label }) => label === 'Mia went to school in 2018.')?.categoryId).toBe(milestones.categories[1]?.id);

    for (const id of ['advanced/task-02/session-01/question-02', 'advanced/task-02/session-01/question-05']) {
      expect(question(id)?.prompt, id).toContain('born in 2016.');
      expect(question(id)?.prompt, id).toContain('learned to walk when she was one.');
      expect(question(id)?.prompt, id).toContain('went to kindergarten when she was three.');
    }
    expect(question('advanced/task-02/session-01/question-06')?.prompt).toContain('.”请把信息分到');
  });

  it('combines separate age and order requirements in high-tier checks', () => {
    const timeline = question('high/task-01/session-01/question-01');
    expect(timeline?.kind).toBe('choice');
    expect(timeline?.prompt).toContain('before “learned to walk”');
    expect(timeline?.prompt).toContain('learned to walk” before “started to speak.');
    if (timeline?.kind !== 'choice') return;
    expect(timeline.options.find(({ id }) => id === timeline.correctOptionId)?.label).toContain('Born → learned to walk → started to speak.');

    const correction = question('high/task-01/session-01/question-02');
    expect(correction?.prompt).toContain('at three');
    expect(correction?.prompt).toContain('at two');
    if (correction?.kind !== 'choice') return;
    expect(correction.options.find(({ id }) => id === correction.correctOptionId)?.label).toContain('B从“Went to kindergarten at three → started to speak at two.”改为“Started to speak at two → went to kindergarten at three.”');

    const review = question('high/task-02/session-01/question-05');
    expect(question('high/task-02/session-01/question-02')?.prompt).toContain('Sam was born in 2015.');
    expect(review?.prompt).toContain('keeps the year, ages, and past-tense verbs');
    expect(review?.prompt).toContain('Sam was born in 2015.');
    expect(review?.prompt).toContain('He went to kindergarten when he was three.');
    expect(review?.prompt).toContain('Rita go to kindergarten when she was three.');
    if (review?.kind !== 'choice') return;
    expect(review.options.find(({ id }) => id === review.correctOptionId)?.label).toContain('Rita went to kindergarten when she was three.');
  });

  it('renders 48 distinct cards with usable prompts, feedback, and answer keys', () => {
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
