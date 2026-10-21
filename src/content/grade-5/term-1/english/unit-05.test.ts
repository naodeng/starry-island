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
  it('includes the profile or story facts needed by referenced questions', () => {
    const prompts = [
      ['advanced/task-01/session-01/question-05', 'Jane 看介绍不同国家动物的节目'],
      ['high/task-02/session-01/question-01', 'two family members want to watch different shows'],
      ['high/task-02/session-01/question-01', 'power goes off and the family cannot watch TV'],
      ['high/task-02/session-01/question-02', 'power goes off and the family cannot watch TV'],
      ['high/task-02/session-01/question-03', 'after the power goes off, the family plays a game together'],
      ['high/task-02/session-01/question-07', 'the family cannot watch TV'],
    ] as const;

    for (const [id, requiredText] of prompts) {
      expect(question(id)?.prompt, id).toContain(requiredText);
    }
  });
});
