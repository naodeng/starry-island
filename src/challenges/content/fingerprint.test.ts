import { describe, expect, it } from 'vitest';
import type { ActivityDefinition } from '../../content/types';
import { fingerprintActivity } from './fingerprint';

const nodeCryptoSpecifier = ['node', 'crypto'].join(':');
const { webcrypto } = await import(nodeCryptoSpecifier);
const subtleCrypto = webcrypto.subtle;

function choiceActivity(overrides: Partial<Extract<ActivityDefinition, { kind: 'choice' }>> = {}) {
  return {
    id: 'grade-2/term-1/math/unit-01/basic/task-01/session-01/question-01',
    kind: 'choice',
    prompt: '哪一个长度单位更适合测量铅笔？',
    hint: '铅笔比课桌短。',
    explanation: '较短的物体通常用厘米测量。',
    options: [
      { id: 'centimeter', label: '厘米' },
      { id: 'meter', label: '米' },
    ],
    correctOptionId: 'centimeter',
    ...overrides,
  } satisfies ActivityDefinition;
}

describe('fingerprintActivity', () => {
  it('sorts object keys recursively while preserving array order', async () => {
    const first = choiceActivity();
    const second = {
      correctOptionId: 'centimeter',
      options: [
        { label: '厘米', id: 'centimeter' },
        { label: '米', id: 'meter' },
      ],
      explanation: '较短的物体通常用厘米测量。',
      hint: '铅笔比课桌短。',
      prompt: '哪一个长度单位更适合测量铅笔？',
      kind: 'choice',
      id: 'grade-2/term-1/math/unit-01/basic/task-01/session-01/question-01',
    } satisfies ActivityDefinition;

    await expect(fingerprintActivity(first, subtleCrypto)).resolves.toBe(
      await fingerprintActivity(second, subtleCrypto),
    );

    const reversedOptions = choiceActivity({ options: [...first.options].reverse() });
    await expect(fingerprintActivity(reversedOptions, subtleCrypto)).resolves.not.toBe(
      await fingerprintActivity(first, subtleCrypto),
    );
  });

  it('changes when question wording or the correct answer changes', async () => {
    const original = choiceActivity();
    const originalFingerprint = await fingerprintActivity(original, subtleCrypto);

    await expect(fingerprintActivity(choiceActivity({ prompt: '测量铅笔适合用哪个单位？' }), subtleCrypto))
      .resolves.not.toBe(originalFingerprint);
    await expect(fingerprintActivity(choiceActivity({ correctOptionId: 'meter' }), subtleCrypto))
      .resolves.not.toBe(originalFingerprint);
  });

  it('ignores activity identity so duplicate content under different IDs has one fingerprint', async () => {
    const original = choiceActivity();
    const copied = choiceActivity({ id: 'grade-2/term-1/math/unit-02/basic/task-01/session-01/question-99' });
    await expect(fingerprintActivity(copied, subtleCrypto)).resolves.toBe(
      await fingerprintActivity(original, subtleCrypto),
    );
  });
});
