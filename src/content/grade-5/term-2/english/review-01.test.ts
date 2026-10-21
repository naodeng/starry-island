import { describe, expect, it } from 'vitest';
import { unit } from './review-01';

function question(id: string) {
  return Object.values(unit.difficultyTracks)
    .flatMap((track) => track.tasks)
    .flatMap((task) => task.sessions)
    .flatMap((session) => session.activities)
    .find((activity) => activity.id === `${unit.id}/${id}`);
}

describe('grade 5 English Revision 1 question cards', () => {
  it('classifies calendar under days rather than contact methods', () => {
    for (const id of [
      'basic/task-01/session-01/question-07',
      'basic/task-02/session-01/question-07',
      'advanced/task-01/session-01/question-07',
    ]) {
      const activity = question(id);
      expect(activity?.kind).toBe('categorize');
      if (activity?.kind !== 'categorize') continue;
      const calendar = activity.items.find((item) => item.label === 'calendar');
      expect(calendar?.categoryId).toBe(activity.categories[0]?.id);
    }
  });

  it('uses a natural English phrase for learning a word', () => {
    const activity = question('basic/task-01/session-01/question-08');

    expect(activity?.kind).toBe('order');
    if (activity?.kind !== 'order') return;
    const orderedWords = activity.correctOrder.map((id) => activity.items.find((item) => item.id === id)?.label);
    expect(orderedWords).toEqual(['I', 'would', 'like', 'to', 'learn', 'this', 'word', '.']);
  });
});
