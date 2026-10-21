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
  it('includes the labels or story facts needed by referenced questions', () => {
    const prompts = [
      ['basic/task-02/session-01/question-05', 'a pencil box—20 yuan'],
      ['advanced/task-01/session-01/question-01', 'she likes blue'],
      ['advanced/task-01/session-01/question-02', 'does not like orange'],
      ['advanced/task-01/session-01/question-04', 'small blue schoolbag for 60 yuan'],
      ['advanced/task-01/session-01/question-05', 'Lucy has 100 yuan'],
      ['advanced/task-01/session-01/question-06', 'has 100 yuan and chooses a schoolbag for 60 yuan'],
      ['advanced/task-01/session-01/question-07', 'likes blue, not orange'],
      ['high/task-02/session-01/question-01', 'Peter has $25 at first'],
      ['high/task-02/session-01/question-02', 'Peter has $25 at first'],
      ['high/task-02/session-01/question-04', 'it is gone when Peter returns the next day'],
    ] as const;

    for (const [id, requiredText] of prompts) {
      expect(question(id)?.prompt, id).toContain(requiredText);
    }
  });
});
