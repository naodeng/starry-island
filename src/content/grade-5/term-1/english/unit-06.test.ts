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
  it('includes the records or story facts needed by referenced questions', () => {
    const prompts = [
      ['advanced/task-01/session-01/question-04', 'Bob takes out the rubbish'],
      ['advanced/task-02/session-01/question-06', 'mother is tired'],
      ['advanced/task-02/session-01/question-07', 'feeding the fish'],
    ] as const;

    for (const [id, requiredText] of prompts) {
      expect(question(id)?.prompt, id).toContain(requiredText);
    }
  });
});
