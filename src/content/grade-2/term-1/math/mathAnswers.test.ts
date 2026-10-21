import { describe, expect, it } from 'vitest';
import { curriculum } from '../../../curriculum';
import type { CurriculumUnit } from '../../../types';

function evaluateArithmeticExpression(expression: string): number {
  const normalized = expression.replace(/\s+/g, '');
  const tokens = normalized.match(/\d+(?:\.\d+)?|[()+\-×÷]/g) ?? [];
  if (tokens.join('') !== normalized) throw new Error(`不支持的算式：${expression}`);
  let cursor = 0;

  const factor = (): number => {
    const token = tokens[cursor++];
    if (token === '(') {
      const value = sum();
      if (tokens[cursor++] !== ')') throw new Error(`括号不成对：${expression}`);
      return value;
    }
    const value = Number(token);
    if (!Number.isFinite(value)) throw new Error(`缺少数值：${expression}`);
    return value;
  };

  const product = (): number => {
    let value = factor();
    while (tokens[cursor] === '×' || tokens[cursor] === '÷') {
      const operator = tokens[cursor++];
      const right = factor();
      value = operator === '×' ? value * right : value / right;
    }
    return value;
  };

  const sum = (): number => {
    let value = product();
    while (tokens[cursor] === '+' || tokens[cursor] === '-') {
      const operator = tokens[cursor++];
      const right = product();
      value = operator === '+' ? value + right : value - right;
    }
    return value;
  };

  const answer = sum();
  if (cursor !== tokens.length) throw new Error(`算式未完整读取：${expression}`);
  return answer;
}

function expectedArithmeticAnswer(prompt: string, exactAnswer: number): number {
  if (/保留整数/.test(prompt)) return Math.round(exactAnswer);

  const precisionToken = prompt.match(/保留(一|二|两|三|四|五|六|七|八|九|\d+)位小数/)?.[1];
  if (!precisionToken) return exactAnswer;

  const precision = ({ 一: 1, 二: 2, 两: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9 } as Record<string, number>)[precisionToken]
    ?? Number(precisionToken);
  const factor = 10 ** precision;
  return Math.round((exactAnswer + Number.EPSILON) * factor) / factor;
}

function registeredMathUnits(): Array<[string, CurriculumUnit]> {
  return Object.entries(curriculum.units).filter(([, unit]) => unit.subject === 'math');
}

function activitiesForUnit(unitKey: string) {
  const unit = curriculum.units[unitKey];
  if (!unit) throw new Error(`缺少课程：${unitKey}`);
  return Object.values(unit.difficultyTracks)
    .flatMap(({ tasks }) => tasks)
    .flatMap(({ sessions }) => sessions)
    .flatMap(({ activities }) => activities);
}

describe('registered math answers', () => {
  it('computes every arithmetic answer from its written expression', () => {
    const activities = registeredMathUnits().flatMap(([, unit]) => Object.values(unit.difficultyTracks)
      .flatMap(({ tasks }) => tasks.flatMap(({ sessions }) => sessions.flatMap(({ activities: sessionActivities }) => sessionActivities))))
      .filter((activity) => activity.kind === 'arithmetic');

    expect(activities.length).toBeGreaterThan(0);
    for (const activity of activities) {
      if (activity.kind !== 'arithmetic') continue;
      const exactAnswer = evaluateArithmeticExpression(activity.expression);
      expect(activity.correctAnswer, `${activity.prompt} (${activity.expression})`)
        .toBeCloseTo(expectedArithmeticAnswer(activity.prompt, exactAnswer), 10);
    }
  });

  it('links every math choice answer to an existing option', () => {
    const choices = registeredMathUnits().flatMap(([, unit]) => activitiesForUnit(unit.id))
      .filter((activity) => activity.kind === 'choice');

    expect(choices.length).toBeGreaterThan(0);
    for (const choice of choices) {
      if (choice.kind !== 'choice') continue;
      expect(choice.options.some(({ id }) => id === choice.correctOptionId), choice.prompt).toBe(true);
    }
  });

  it('keeps every ruler target within the visible measurement range', () => {
    for (const [, unit] of registeredMathUnits()) {
      for (const { tasks } of Object.values(unit.difficultyTracks)) {
        for (const { sessions } of tasks) {
          for (const { activities } of sessions) {
            for (const activity of activities) {
              if (activity.kind !== 'measurement') continue;
              expect(activity.targetLengthCm).toBeGreaterThanOrEqual(activity.minCm);
              expect(activity.targetLengthCm).toBeLessThanOrEqual(activity.maxCm);
            }
          }
        }
      }
    }
  });

  it('keeps grade-one term-two addition and subtraction within the taught no-carry range', () => {
    const unitKeys = [
      'grade-1/term-2/math/unit-06',
      'grade-1/term-2/math/unit-08',
    ];
    const arithmeticQuestions = unitKeys.flatMap(activitiesForUnit)
      .filter((activity) => activity.kind === 'arithmetic');

    expect(arithmeticQuestions.length).toBeGreaterThan(0);
    for (const question of arithmeticQuestions) {
      if (question.kind !== 'arithmetic') continue;
      const match = question.expression.match(/^(\d+) ([+-]) (\d+)$/);
      expect(match, question.expression).not.toBeNull();
      const left = Number(match?.[1]);
      const operator = match?.[2];
      const right = Number(match?.[3]);

      expect(left, question.expression).toBeGreaterThanOrEqual(10);
      expect(left, question.expression).toBeLessThan(100);
      if (operator === '+') {
        const isSingleDigit = right < 10;
        const isMultipleOfTen = right >= 10 && right % 10 === 0;
        expect(isSingleDigit || isMultipleOfTen, question.expression).toBe(true);
        if (isSingleDigit) expect((left % 10) + right, question.expression).toBeLessThan(10);
        expect(left + right, question.expression).toBeLessThanOrEqual(100);
      } else {
        const isSingleDigit = right < 10;
        const isMultipleOfTen = right >= 10 && right % 10 === 0;
        expect(isSingleDigit || isMultipleOfTen, question.expression).toBe(true);
        if (isSingleDigit) expect(left % 10, question.expression).toBeGreaterThanOrEqual(right);
        if (isMultipleOfTen) expect(left % 10, question.expression).toBe(0);
        expect(left, question.expression).toBeGreaterThanOrEqual(right);
      }
    }
  });

  it('uses numeric fields throughout the grade-three number-coding match question', () => {
    const matches = activitiesForUnit('grade-3/term-1/math/integrated-practice-01')
      .filter((activity) => activity.kind === 'match');
    const codingMatch = matches.find((activity) => activity.kind === 'match' && activity.prompt.includes('编码中的部分'));

    expect(codingMatch, 'number-coding match question').toBeDefined();
    if (codingMatch?.kind !== 'match') return;
    expect(codingMatch.pairs.some(({ left, right }) => left === '编号开头的数字' && right === '物品类别')).toBe(true);
    expect(JSON.stringify(codingMatch.pairs)).not.toContain('字母');
  });

  it.each([
    {
      unitKey: 'grade-3/term-1/math/unit-10',
      topics: ['分钟', '进位', '毫米', '×', '周长', '分之一', '集合', '倍'],
    },
    {
      unitKey: 'grade-3/term-2/math/unit-09',
      topics: ['方向', '÷', '一班', '×', '面积', '月', '0.', '搭配'],
    },
  ])('reviews the full grade-three semester topic set in %s', ({ unitKey, topics }) => {
    const serializedActivities = JSON.stringify(activitiesForUnit(unitKey));

    for (const topic of topics) {
      expect(serializedActivities, `${unitKey} should review ${topic}`).toContain(topic);
    }
  });
});
