import { describe, expect, it } from 'vitest';
import { unit } from './unit-01';

function question(id: string) {
  return Object.values(unit.difficultyTracks)
    .flatMap((track) => track.tasks)
    .flatMap((task) => task.sessions)
    .flatMap((session) => session.activities)
    .find((activity) => activity.id === `${unit.id}/${id}`);
}

describe('grade 5 English Unit 1 question cards', () => {
  it('provides the food-chart, letter, and story facts used by reading questions', () => {
    const prompts = [
      ['advanced/task-01/session-01/question-02', 'turn them off at 9 p.m.'],
      ['advanced/task-01/session-01/question-06', 'Worried sometimes watches TV at night'],
      ['advanced/task-02/session-01/question-01', 'plenty of fruit and vegetables'],
      ['advanced/task-02/session-01/question-02', 'only a little candy and oil'],
      ['advanced/task-02/session-01/question-06', 'plenty of fruit and vegetables'],
      ['high/task-02/session-01/question-01', 'Mrs Brown finds a little man after walking by the sea'],
      ['high/task-02/session-01/question-01', 'first wish is for a big dinner'],
      ['high/task-02/session-01/question-03', 'chooses good health at the end'],
      ['high/task-02/session-01/question-04', 'a little green bottle starts the magic'],
      ['high/task-02/session-01/question-05', 'Mrs Brown walks by the sea'],
      ['high/task-02/session-01/question-06', 'finds a magic bottle, makes wishes, and finally chooses good health'],
    ] as const;

    for (const [id, requiredText] of prompts) {
      expect(question(id)?.prompt, id).toContain(requiredText);
    }
  });

  it('makes ordering questions uniquely solvable from explicit sequence cues', () => {
    const activities = [
      question('basic/task-01/session-01/question-08'),
      question('advanced/task-02/session-01/question-08'),
      question('high/task-01/session-01/question-07'),
    ];

    for (const activity of activities) {
      expect(activity?.kind).toBe('order');
      if (activity?.kind !== 'order') continue;
      const orderedLabels = activity.correctOrder.map((id) => activity.items.find((item) => item.id === id)?.label);
      expect(orderedLabels.join(' ')).toMatch(/First|Next|Then|Finally/u);
    }
  });
});
