import { describe, expect, it } from 'vitest';
import { unit } from './unit-04';

function question(id: string) {
  return Object.values(unit.difficultyTracks)
    .flatMap((track) => track.tasks)
    .flatMap((task) => task.sessions)
    .flatMap((session) => session.activities)
    .find((activity) => activity.id === `${unit.id}/${id}`);
}

describe('grade 5 English Unit 4 question cards', () => {
  it('provides the time, activity, and note facts each card needs', () => {
    const evidence = [
      ['basic/task-02/session-01/question-01', 'Last Saturday, Nina danced'],
      ['basic/task-02/session-01/question-05', 'last weekend'],
      ['basic/task-02/session-01/question-07', '过去时间线索'],
      ['advanced/task-01/session-01/question-01', 'What did you do last weekend?'],
      ['advanced/task-02/session-01/question-01', 'Last Saturday, I climbed a hill with my dad'],
      ['advanced/task-02/session-01/question-04', 'Sunday afternoon—played the piano'],
      ['advanced/task-02/session-01/question-06', 'On Sunday morning, I stayed at home'],
      ['high/task-01/session-01/question-01', 'outdoor activity on Saturday'],
      ['high/task-01/session-01/question-01', 'quiet activity at home on Sunday'],
      ['high/task-01/session-01/question-07', '周六户外活动，周日在家活动'],
      ['high/task-02/session-01/question-04', 'both activities happened last weekend'],
    ] as const;

    for (const [id, requiredText] of evidence) {
      expect(question(id)?.prompt, id).toContain(requiredText);
    }
  });

  it('uses quoted English expressions and a natural vocabulary-learning sentence', () => {
    const meaningQuestion = question('basic/task-01/session-01/question-05');
    expect(meaningQuestion?.kind).toBe('choice');
    if (meaningQuestion?.kind !== 'choice') return;
    expect(meaningQuestion.options[0]?.label).toBe('What does “cleaned the window” mean?');

    const sentence = question('basic/task-01/session-01/question-08');
    expect(sentence?.kind).toBe('order');
    if (sentence?.kind !== 'order') return;
    const words = sentence.correctOrder.map((id) => sentence.items.find((item) => item.id === id)?.label);
    expect(words).toEqual(['I', 'would', 'like', 'to', 'learn', 'this', 'phrase', '.']);
  });

  it('maps weekend records and all-requirement plans to the correct keys', () => {
    const note = question('advanced/task-02/session-01/question-06');
    expect(note?.kind).toBe('categorize');
    if (note?.kind !== 'categorize') return;
    expect(note.items.find((item) => item.label === 'Leo climbed a hill with his dad on Saturday.')?.categoryId).toBe(note.categories[0]?.id);
    expect(note.items.find((item) => item.label === 'Leo felt angry on Sunday.')?.categoryId).toBe(note.categories[1]?.id);

    const plan = question('high/task-01/session-01/question-07');
    expect(plan?.kind).toBe('categorize');
    if (plan?.kind !== 'categorize') return;
    expect(plan.items.find((item) => item.label.startsWith('Climb a hill on Saturday'))?.categoryId).toBe(plan.categories[0]?.id);
    expect(plan.items.find((item) => item.label.startsWith('Climb a hill on Sunday'))?.categoryId).toBe(plan.categories[1]?.id);
  });

  it('keeps the past-tense and schedule sequence answer keys aligned', () => {
    const pastTense = question('basic/task-02/session-01/question-03');
    expect(pastTense?.kind).toBe('choice');
    if (pastTense?.kind !== 'choice') return;
    expect(pastTense.options.find((option) => option.id === pastTense.correctOptionId)?.label).toBe('jumped');

    const dialogue = question('advanced/task-01/session-01/question-08');
    expect(dialogue?.kind).toBe('order');
    if (dialogue?.kind !== 'order') return;
    const dialogueLines = dialogue.correctOrder.map((id) => dialogue.items.find((item) => item.id === id)?.label);
    expect(dialogueLines).toEqual([
      'What did you do last weekend?',
      'I climbed a hill on Saturday.',
      'Did you stay at home on Sunday?',
      'Yes, I did.',
    ]);

    const schedule = question('high/task-01/session-01/question-08');
    expect(schedule?.kind).toBe('order');
    if (schedule?.kind !== 'order') return;
    const steps = schedule.correctOrder.map((id) => schedule.items.find((item) => item.id === id)?.label);
    expect(steps).toEqual([
      'First, choose an outdoor activity for Saturday.',
      'Next, choose an at-home activity for Sunday.',
      'Then, write both activities on the weekend calendar.',
      'Finally, check that each activity is on the right day.',
    ]);

    const weekend = question('high/task-02/session-01/question-08');
    expect(weekend?.kind).toBe('order');
    if (weekend?.kind !== 'order') return;
    const orderedEvents = weekend.correctOrder.map((id) => weekend.items.find((item) => item.id === id)?.label);
    expect(orderedEvents).toEqual([
      'First, I climbed a hill on Saturday.',
      'Next, I stayed at home on Sunday morning.',
      'Then, I played the piano on Sunday afternoon.',
      'Finally, I wrote about the weekend.',
    ]);
  });
});
