import { describe, expect, it } from 'vitest';
import rawManifest from './pilotManifest';
import { parseChallengeManifest } from './manifestSchema';

function expectPathError(value: unknown, path: string) {
  let caught: unknown;
  try {
    parseChallengeManifest(value);
  } catch (error) {
    caught = error;
  }
  expect(caught).toBeInstanceOf(Error);
  expect((caught as Error).message).toContain(path);
}

describe('parseChallengeManifest', () => {
  it('rejects malformed root, question and group references with field paths', () => {
    expectPathError(null, '$');

    const missingQuestions = structuredClone(rawManifest) as unknown as Record<string, unknown>;
    delete missingQuestions.questions;
    expectPathError(missingQuestions, 'questions');

    const malformedQuestion = structuredClone(rawManifest) as unknown as {
      questions: Array<Record<string, unknown>>;
    };
    malformedQuestion.questions[0].activityId = 42;
    expectPathError(malformedQuestion, 'questions[0].activityId');

    const invalidReleaseIntent = structuredClone(rawManifest) as unknown as {
      groups: Array<Record<string, unknown>>;
    };
    invalidReleaseIntent.groups[0].releaseIntent = 'published';
    expectPathError(invalidReleaseIntent, 'groups[0].releaseIntent');

    const malformedTask = structuredClone(rawManifest) as unknown as {
      groups: Array<{ definition: { tasks: Array<Record<string, unknown>> } }>;
    };
    malformedTask.groups[0].definition.tasks[0].targetCount = '15';
    expectPathError(malformedTask, 'groups[0].definition.tasks[0].targetCount');
  });

  it('parses the current pilot manifest without changing its data', () => {
    expect(parseChallengeManifest(rawManifest)).toEqual(rawManifest);
  });
});
