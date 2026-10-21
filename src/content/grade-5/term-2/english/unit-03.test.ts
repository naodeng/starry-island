import { describe, expect, it } from 'vitest';
import { unit } from './unit-03';

function question(id: string) {
  return Object.values(unit.difficultyTracks)
    .flatMap((track) => track.tasks)
    .flatMap((task) => task.sessions)
    .flatMap((session) => session.activities)
    .find((activity) => activity.id === `${unit.id}/${id}`);
}

describe('grade 5 English Unit 3 question cards', () => {
  it('keeps each communication or note question self-contained', () => {
    const evidence = [
      ['basic/task-02/session-01/question-01', 'short message now'],
      ['basic/task-02/session-01/question-02', 'see and talk with your cousin online'],
      ['basic/task-02/session-01/question-03', 'writes a message on paper and sends it'],
      ['advanced/task-01/session-01/question-01', 'Can we talk about the plan now?'],
      ['advanced/task-01/session-01/question-02', 'send the class details by email'],
      ['advanced/task-01/session-01/question-04', 'use the contact method your friend prefers'],
      ['advanced/task-02/session-01/question-01', 'Please call me after school'],
      ['advanced/task-02/session-01/question-06', 'After dinner, I will send a short message'],
      ['high/task-01/session-01/question-01', 'one very short written message now'],
      ['high/task-01/session-01/question-05', 'collect written replies'],
      ['high/task-02/session-01/question-01', 'This card about the phrase'],
      ['high/task-02/session-01/question-02', 'mail a present — 邮寄礼物'],
    ] as const;

    for (const [id, requiredText] of evidence) {
      expect(question(id)?.prompt, id).toContain(requiredText);
    }
  });

  it('uses natural wording for asking about a phrase and learning a vocabulary item', () => {
    const meaningQuestion = question('basic/task-01/session-01/question-05');
    expect(meaningQuestion?.kind).toBe('choice');
    if (meaningQuestion?.kind !== 'choice') return;
    expect(meaningQuestion.options[0]?.label).toBe('What does “send an email” mean?');

    const sentence = question('basic/task-01/session-01/question-08');
    expect(sentence?.kind).toBe('order');
    if (sentence?.kind !== 'order') return;
    const words = sentence.correctOrder.map((id) => sentence.items.find((item) => item.id === id)?.label);
    expect(words).toEqual(['I', 'would', 'like', 'to', 'learn', 'this', 'word', '.']);
  });

  it('maps communication needs and evidence classifications to the correct categories', () => {
    const methods = question('basic/task-02/session-01/question-07');
    expect(methods?.kind).toBe('categorize');
    if (methods?.kind !== 'categorize') return;
    expect(methods.items.find((item) => item.label === 'see and talk with a friend online')?.categoryId).toBe(methods.categories[0]?.id);
    expect(methods.items.find((item) => item.label === 'write a letter for a friend to read later')?.categoryId).toBe(methods.categories[1]?.id);

    const note = question('advanced/task-02/session-01/question-06');
    expect(note?.kind).toBe('categorize');
    if (note?.kind !== 'categorize') return;
    expect(note.items.find((item) => item.label === 'send a short message after dinner')?.categoryId).toBe(note.categories[0]?.id);
    expect(note.items.find((item) => item.label === 'make a video call after dinner')?.categoryId).toBe(note.categories[1]?.id);

    const criteria = question('high/task-01/session-01/question-07');
    expect(criteria?.kind).toBe('categorize');
    if (criteria?.kind !== 'categorize') return;
    expect(criteria.items.find((item) => item.label.startsWith('Email the timetable before lunch'))?.categoryId).toBe(criteria.categories[0]?.id);
    expect(criteria.items.find((item) => item.label.startsWith('Email the timetable after lunch'))?.categoryId).toBe(criteria.categories[1]?.id);
  });

  it('renders the combined high-tier checks and the explicitly ordered email plan', () => {
    expect(question('high/task-01/session-01/question-01')?.prompt).toContain('fits all three requirements');
    expect(question('high/task-01/session-01/question-01')?.prompt).toContain('see and speak with a cousin online');
    expect(question('high/task-01/session-01/question-05')?.prompt).toContain('collect written replies');
    expect(question('high/task-02/session-01/question-05')?.prompt).toContain('write a letter');

    const plan = question('high/task-01/session-01/question-08');
    expect(plan?.kind).toBe('order');
    if (plan?.kind !== 'order') return;
    const orderedSteps = plan.correctOrder.map((id) => plan.items.find((item) => item.id === id)?.label);
    expect(orderedSteps).toEqual([
      'First, list the details classmates need.',
      'Next, write the timetable in the email.',
      'Then, ask for written replies.',
      'Finally, check the message before sending it.',
    ]);
  });
});
