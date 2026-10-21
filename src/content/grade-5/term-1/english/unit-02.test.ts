import { describe, expect, it } from 'vitest';
import { unit } from './unit-02';

function question(id: string) {
  return Object.values(unit.difficultyTracks)
    .flatMap((track) => track.tasks)
    .flatMap((task) => task.sessions)
    .flatMap((session) => session.activities)
    .find((activity) => activity.id === `${unit.id}/${id}`);
}

describe('grade 5 English Unit 2 question cards', () => {
  it('keeps the Mr Zhu word-order answer grammatical and unique', () => {
    const activity = question('basic/task-02/session-01/question-05');

    expect(activity?.kind).toBe('order');
    if (activity?.kind !== 'order') return;
    const orderedLabels = activity.correctOrder.map((id) => activity.items.find((item) => item.id === id)?.label);
    expect(activity.items.map((item) => item.label)).toEqual(['What', 'does', 'Mr Zhu', 'teach?']);
    expect(orderedLabels).toEqual(['What', 'does', 'Mr Zhu', 'teach?']);
  });

  it('includes the source facts required by referenced reading questions', () => {
    const prompts = [
      ['basic/task-02/session-01/question-01', 'Mrs Wu teaches English'],
      ['basic/task-02/session-01/question-02', 'Mr Zhao is a maths teacher'],
      ['basic/task-02/session-01/question-03', 'Mrs Li 教语文'],
      ['basic/task-02/session-01/question-08', 'Yaoyao says'],
      ['advanced/task-01/session-01/question-01', 'Ms Green is my favourite teacher'],
      ['advanced/task-01/session-01/question-02', 'Mr White teaches art'],
      ['advanced/task-01/session-01/question-05', 'Mr White teaches art'],
      ['advanced/task-01/session-01/question-06', 'Mrs Smith teaches music'],
      ['advanced/task-02/session-01/question-01', 'John Hart is my favourite teacher'],
      ['advanced/task-02/session-01/question-02', 'Mrs Young teaches English'],
      ['advanced/task-02/session-01/question-05', '25 students'],
      ['advanced/task-02/session-01/question-06', 'lunch at 12 o’clock'],
      ['advanced/task-02/session-01/question-07', 'classroom has toys and books'],
      ['advanced/task-02/session-01/question-08', 'Mr Cooper teaches PE'],
      ['high/task-01/session-01/question-01', 'Miss Kitty is nice, young and funny'],
      ['high/task-01/session-01/question-02', 'Mrs Tiger shouts'],
      ['high/task-01/session-01/question-03', 'Miss Kitty returns'],
      ['high/task-01/session-01/question-04', 'the students are naughty'],
      ['high/task-01/session-01/question-05', 'the students are naughty first'],
      ['high/task-01/session-01/question-06', 'students ask Miss Kitty to return'],
      ['high/task-01/session-01/question-07', 'promise to be good, listen and study hard'],
      ['high/task-02/session-01/question-07', 'Mrs Smith teaches music'],
    ] as const;

    for (const [id, requiredText] of prompts) {
      expect(question(id)?.prompt, id).toContain(requiredText);
    }
  });
});
