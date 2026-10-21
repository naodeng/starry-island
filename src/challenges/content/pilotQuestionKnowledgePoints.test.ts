import { describe, expect, it } from 'vitest';
import type { ActivityDefinition } from '../../content/types';
import { derivePilotQuestionKnowledgePointIds } from './pilotQuestionKnowledgePoints';

const base = {
  id: 'fixture',
  hint: '',
  explanation: '',
} as const;

function choice(prompt: string, labels: string[] = []): ActivityDefinition {
  return {
    ...base,
    kind: 'choice',
    prompt,
    options: labels.map((label, index) => ({ id: String(index), label })),
    correctOptionId: '0',
  };
}

describe('derivePilotQuestionKnowledgePointIds', () => {
  it('tags length-unit selection separately from measuring and estimating', () => {
    expect(derivePilotQuestionKnowledgePointIds(
      'grade-2/term-1/math/unit-01',
      choice('测量一支铅笔，哪个单位更方便？', ['厘米', '米']),
    )).toEqual(['length-units']);
    expect(derivePilotQuestionKnowledgePointIds(
      'grade-2/term-1/math/unit-01',
      choice('把物体一端对准0刻度，再读出另一端的长度。'),
    )).toEqual(['measurement-and-estimation']);
  });

  it('derives only the operations present in a two-digit calculation', () => {
    expect(derivePilotQuestionKnowledgePointIds(
      'grade-2/term-1/math/unit-02',
      { ...base, kind: 'arithmetic', prompt: '计算。', expression: '38 + 27', correctAnswer: 65 },
    )).toEqual(['two-digit-addition']);
    expect(derivePilotQuestionKnowledgePointIds(
      'grade-2/term-1/math/unit-02',
      { ...base, kind: 'arithmetic', prompt: '计算。', expression: '52 - 27', correctAnswer: 25 },
    )).toEqual(['two-digit-subtraction']);
    expect(derivePilotQuestionKnowledgePointIds(
      'grade-2/term-1/math/unit-02',
      { ...base, kind: 'arithmetic', prompt: '先加再减。', expression: '28 + 19 - 16', correctAnswer: 31 },
    )).toEqual(['two-digit-addition', 'two-digit-subtraction']);
  });

  it('distinguishes angle parts from angle comparison and multiplication meaning from facts', () => {
    expect(derivePilotQuestionKnowledgePointIds(
      'grade-2/term-1/math/unit-03',
      choice('角由哪些部分组成？', ['顶点和两条边']),
    )).toEqual(['angle-parts']);
    expect(derivePilotQuestionKnowledgePointIds(
      'grade-2/term-1/math/unit-03',
      choice('这个角比直角大还是小？', ['大', '小']),
    )).toEqual(['angle-comparison']);
    expect(derivePilotQuestionKnowledgePointIds(
      'grade-2/term-1/math/unit-04',
      choice('4个5相加可以写成哪道乘法算式？', ['4 × 5']),
    )).toEqual(['equal-groups-multiplication', 'multiplication-facts']);
  });

  it('fails closed for an unsupported source unit or a question with no detectable core point', () => {
    expect(() => derivePilotQuestionKnowledgePointIds('grade-2/term-1/math/unit-09', choice('计算。'))).toThrow();
    expect(() => derivePilotQuestionKnowledgePointIds(
      'grade-2/term-1/math/unit-02',
      choice('请看图。'),
    )).toThrow();
  });
});
