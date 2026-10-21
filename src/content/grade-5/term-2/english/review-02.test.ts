import { describe, expect, it } from 'vitest';
import { unit } from './review-02';

describe('grade 5 English Revision 2 question cards', () => {
  it('uses a natural English phrase for learning a word', () => {
    const activity = unit.difficultyTracks.basic.tasks[0]?.sessions[0]?.activities[7];

    expect(activity?.kind).toBe('order');
    if (activity?.kind !== 'order') return;
    const orderedWords = activity.correctOrder.map((id) => activity.items.find((item) => item.id === id)?.label);
    expect(orderedWords).toEqual(['I', 'would', 'like', 'to', 'learn', 'this', 'word', '.']);
  });
});
