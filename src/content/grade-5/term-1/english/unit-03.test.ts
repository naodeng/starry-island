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
  it('keeps the animal-to-feature answer and explanation aligned', () => {
    const activity = question('basic/task-01/session-01/question-05');

    expect(activity?.kind).toBe('match');
    if (activity?.kind !== 'match') return;
    expect(activity.pairs.some((pair) => pair.left === 'bee' && pair.right === 'small')).toBe(true);
    expect(activity.explanation).toContain('蜜蜂很小');
    expect(activity.explanation).not.toContain('蝴蝶');
  });

  it('shows the referenced dialogue and animal facts on each current card', () => {
    const prompts = [
      ['basic/task-02/session-01/question-01', 'My favourite animal is the elephant'],
      ['basic/task-02/session-01/question-02', 'My favourite animal is the bee'],
      ['basic/task-02/session-01/question-05', 'A penguin cannot fly, but it can swim'],
      ['advanced/task-01/session-01/question-01', 'a tiger lives in a forest and eats other animals'],
      ['advanced/task-01/session-01/question-02', 'elephants can live on grassland or in a forest'],
      ['advanced/task-01/session-01/question-03', 'pandas live in bamboo forests and eat bamboo'],
      ['advanced/task-01/session-01/question-04', 'black and white, eats small fish and can swim'],
      ['advanced/task-01/session-01/question-05', 'tigers live in forests and elephants can also live in forests'],
      ['advanced/task-01/session-01/question-06', 'tigers eat other animals'],
      ['advanced/task-02/session-01/question-01', 'from Australia'],
      ['advanced/task-02/session-01/question-02', 'white with black ears and a black face'],
      ['advanced/task-02/session-01/question-03', 'short but strong'],
      ['advanced/task-02/session-01/question-04', 'both say they have big brown eyes'],
      ['advanced/task-02/session-01/question-05', 'climb trees and catch mice'],
      ['advanced/task-02/session-01/question-06', 'the baby dog is from America'],
      ['advanced/task-02/session-01/question-08', 'both animals have big brown eyes'],
      ['high/task-01/session-01/question-01', 'Tibetan antelopes live in very high places'],
      ['high/task-01/session-01/question-02', 'snow leopards live high in the mountains'],
      ['high/task-01/session-01/question-03', 'hunters kill Tibetan antelopes and snow leopards for their fur'],
      ['high/task-01/session-01/question-04', 'both Tibetan antelopes and snow leopards as beautiful animals with fur'],
      ['high/task-01/session-01/question-05', 'Animals are our friends'],
      ['high/task-02/session-01/question-01', 'Cat first says Elephant is her favourite'],
      ['high/task-02/session-01/question-02', 'Dog says no because Elephant is too big and heavy'],
      ['high/task-02/session-01/question-03', 'Cat describes Butterfly as friendly and beautiful'],
      ['high/task-02/session-01/question-04', 'Dog says Butterfly is too small'],
      ['high/task-02/session-01/question-05', 'Dog says Turtle is too slow to play football'],
      ['high/task-02/session-01/question-06', 'Think about animals’ good qualities'],
      ['high/task-02/session-01/question-07', 'Dog rejects Elephant as too big and heavy'],
    ] as const;

    for (const [id, requiredText] of prompts) {
      expect(question(id)?.prompt, id).toContain(requiredText);
    }
  });
});
