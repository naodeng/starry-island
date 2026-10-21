import { describe, expect, it } from 'vitest';
import { curriculum } from '../../curriculum';
import { addedCourseCatalog } from '../catalog';

function evaluateArithmetic(expression: string): number {
  const tokens = expression.replace(/×/g, '*').replace(/÷/g, '/')
    .match(/\d+(?:\.\d+)?|[()+*/-]/g);
  if (!tokens) throw new Error(`No arithmetic tokens found in: ${expression}`);
  let cursor = 0;

  const parsePrimary = (): number => {
    const token = tokens[cursor++];
    if (token === undefined) throw new Error(`Unexpected end of expression: ${expression}`);
    if (token === '(') {
      const value = parseExpression();
      if (tokens[cursor++] !== ')') throw new Error(`Missing closing parenthesis: ${expression}`);
      return value;
    }
    if (token === '-') return -parsePrimary();
    const value = Number(token);
    if (!Number.isFinite(value)) throw new Error(`Invalid number ${token} in: ${expression}`);
    return value;
  };

  const parseProduct = (): number => {
    let value = parsePrimary();
    while (tokens[cursor] === '*' || tokens[cursor] === '/') {
      const operator = tokens[cursor++];
      const right = parsePrimary();
      value = operator === '*' ? value * right : value / right;
    }
    return value;
  };

  const parseExpression = (): number => {
    let value = parseProduct();
    while (tokens[cursor] === '+' || tokens[cursor] === '-') {
      const operator = tokens[cursor++];
      const right = parseProduct();
      value = operator === '+' ? value + right : value - right;
    }
    return value;
  };

  const answer = parseExpression();
  if (cursor !== tokens.length) throw new Error(`Unexpected token ${tokens[cursor]} in: ${expression}`);
  return answer;
}

function questionFingerprint(activity: (typeof curriculum.units)[string]['difficultyTracks']['basic']['tasks'][number]['sessions'][number]['activities'][number]): string {
  if (activity.kind === 'choice') {
    const correct = activity.options.find(({ id }) => id === activity.correctOptionId)?.label;
    return JSON.stringify([activity.kind, activity.prompt, activity.hint, activity.explanation,
      [...activity.options.map(({ label }) => label)].sort(), correct]);
  }
  if (activity.kind === 'arithmetic') {
    return JSON.stringify([activity.kind, activity.prompt, activity.hint, activity.explanation,
      activity.expression, activity.correctAnswer]);
  }
  if (activity.kind === 'match') {
    return JSON.stringify([activity.kind, activity.prompt, activity.hint, activity.explanation,
      activity.pairs.map(({ left, right }) => [left, right]).sort(([left], [right]) => left.localeCompare(right))]);
  }
  if (activity.kind === 'order') {
    const labelById = new Map(activity.items.map(({ id, label }) => [id, label]));
    return JSON.stringify([activity.kind, activity.prompt, activity.hint, activity.explanation,
      activity.correctOrder.map((id) => labelById.get(id)), [...activity.items.map(({ label }) => label)].sort()]);
  }
  if (activity.kind === 'categorize') {
    const categoryById = new Map(activity.categories.map(({ id, label }) => [id, label]));
    return JSON.stringify([activity.kind, activity.prompt, activity.hint, activity.explanation,
      activity.items.map(({ label, categoryId }) => [label, categoryById.get(categoryId)] as const)
        .sort((left, right) => left[0].localeCompare(right[0])), activity.categories.map(({ label }) => label)]);
  }
  return JSON.stringify(activity);
}

function choiceAnswerSignature(unitId: string, difficulty: 'basic' | 'advanced' | 'high', taskIndex: number, questionIndex: number): string {
  const question = curriculum.units[unitId]?.difficultyTracks[difficulty].tasks[taskIndex]?.sessions[0]?.activities[questionIndex];
  if (!question || question.kind !== 'choice') throw new Error(`Expected a choice question: ${unitId}/${difficulty}/${taskIndex + 1}/${questionIndex + 1}`);
  const correct = question.options.find(({ id }) => id === question.correctOptionId)?.label;
  return JSON.stringify([[...question.options.map(({ label }) => label)].sort(), correct]);
}

describe('added math question quality', () => {
  it('keeps Grade 1 Term 2 Unit 1 generated questions within visual recognition and simple composing', () => {
    const unitId = 'grade-1/term-2/math/unit-01';
    const unit = curriculum.units[unitId];
    expect(unit, `Missing generated math unit ${unitId}`).toBeDefined();
    if (!unit) return;

    const activities = Object.values(unit.difficultyTracks)
      .flatMap((track) => track.tasks)
      .flatMap((task) => task.sessions)
      .flatMap((session) => session.activities);
    expect(activities).toHaveLength(48);

    for (const activity of activities) {
      const content = [activity.prompt, activity.hint, activity.explanation,
        ...(activity.kind === 'choice' ? activity.options.map(({ label }) => label) : []),
        ...(activity.kind === 'match' ? activity.pairs.flatMap(({ left, right }) => [left, right]) : []),
        ...(activity.kind === 'categorize' ? [
          ...activity.categories,
          ...activity.items.map(({ label }) => label),
        ] : []),
        ...(activity.kind === 'order' ? activity.items.map(({ label }) => label) : []),
      ].join(' ');
      expect(content, activity.id).not.toMatch(/顶点|直角|对边|边长|边相交|边的长度|相等/);
    }

    for (const track of Object.values(unit.difficultyTracks)) {
      for (const task of track.tasks) {
        for (const activity of task.sessions.flatMap(({ activities: sessionActivities }) => sessionActivities)) {
          if (activity.kind === 'match') {
            const leftLabels = activity.pairs.map(({ left }) => left);
            const rightLabels = activity.pairs.map(({ right }) => right);
            expect(new Set(leftLabels).size, activity.id).toBe(leftLabels.length);
            expect(new Set(rightLabels).size, activity.id).toBe(rightLabels.length);
          }
        }
      }
    }
  });

  it('quotes source questions naturally in high-tier peer-correction prompts', () => {
    const affectedQuestionIds = [
      'grade-1/term-1/math/unit-09/high/task-02/session-01/question-06',
      'grade-1/term-1/math/integrated-practice-01/high/task-02/session-01/question-06',
      'grade-1/term-2/math/unit-08/high/task-02/session-01/question-06',
    ];

    for (const questionId of affectedQuestionIds) {
      const question = Object.values(curriculum.units)
        .flatMap((unit) => Object.values(unit.difficultyTracks))
        .flatMap((track) => track.tasks)
        .flatMap((task) => task.sessions)
        .flatMap((session) => session.activities)
        .find((activity) => activity.id === questionId);

      expect(question, `Missing generated math question ${questionId}`).toBeDefined();
      expect(question?.prompt).not.toContain('？时选了');
      expect(question?.prompt).toMatch(/^同伴选了“.+”来回答“.+”，应该改选哪一项？$/);
    }
  });

  it('keeps five-within addition/subtraction questions inside the taught operation range', () => {
    const affectedQuestionIds = [
      'grade-1/term-1/math/unit-03/advanced/task-01/session-01/question-08',
      'grade-1/term-1/math/unit-03/advanced/task-02/session-01/question-01',
      'grade-1/term-1/math/unit-03/advanced/task-02/session-01/question-08',
    ];

    for (const questionId of affectedQuestionIds) {
      const question = Object.values(curriculum.units)
        .flatMap((unit) => Object.values(unit.difficultyTracks))
        .flatMap((track) => track.tasks)
        .flatMap((task) => task.sessions)
        .flatMap((session) => session.activities)
        .find((activity) => activity.id === questionId);

      expect(question, `Missing generated math question ${questionId}`).toBeDefined();
      expect(question?.kind).toBe('choice');
      if (question?.kind !== 'choice') continue;
      expect(question.hint).toContain('加法或减法');
      expect(question.hint).not.toMatch(/相同份数|平均分/);
      expect(question.options.every(({ label }) => !/[×÷]/.test(label))).toBe(true);
      expect(question.options.filter(({ id }) => id === question.correctOptionId)).toHaveLength(1);
    }
  });

  it('keeps peer-correction order prompts readable when the source instruction is quoted', () => {
    const affectedQuestionIds = [
      'grade-1/term-1/math/unit-04/high/task-01/session-01/question-06',
      'grade-1/term-1/math/unit-04/high/task-02/session-01/question-06',
    ];

    for (const questionId of affectedQuestionIds) {
      const question = Object.values(curriculum.units)
        .flatMap((unit) => Object.values(unit.difficultyTracks))
        .flatMap((track) => track.tasks)
        .flatMap((task) => task.sessions)
        .flatMap((session) => session.activities)
        .find((activity) => activity.id === questionId);

      expect(question, `Missing generated math question ${questionId}`).toBeDefined();
      expect(question?.kind).toBe('choice');
      expect(question?.prompt).not.toContain('按“按“');
      expect(question?.prompt).toContain('请按“');
    }
  });

  it('nests quotation marks in peer-correction prompts without duplicating Chinese double quotes', () => {
    const questionId = 'grade-1/term-1/math/unit-07/high/task-01/session-01/question-04';
    const question = Object.values(curriculum.units)
      .flatMap((unit) => Object.values(unit.difficultyTracks))
      .flatMap((track) => track.tasks)
      .flatMap((task) => task.sessions)
      .flatMap((session) => session.activities)
      .find((activity) => activity.id === questionId);

    expect(question, `Missing generated math question ${questionId}`).toBeDefined();
    expect(question?.prompt).toContain('回答“读出钟面上的‘几时’，主要看哪根指针？”');
    expect(question?.prompt).not.toContain('“几时”');
  });

  it('explains first-grade money conversions without the multiplication symbol', () => {
    const affectedQuestionIds = ['basic', 'advanced', 'high'].flatMap((difficulty) => [
      `grade-1/term-2/math/unit-05/${difficulty}/task-02/session-01/question-01`,
      `grade-1/term-2/math/unit-05/${difficulty}/task-02/session-01/question-02`,
    ]);

    for (const questionId of affectedQuestionIds) {
      const question = Object.values(curriculum.units)
        .flatMap((unit) => Object.values(unit.difficultyTracks))
        .flatMap((track) => track.tasks)
        .flatMap((task) => task.sessions)
        .flatMap((session) => session.activities)
        .find((activity) => activity.id === questionId);

      expect(question, `Missing generated math question ${questionId}`).toBeDefined();
      expect(question?.kind).toBe('choice');
      expect(question?.explanation).not.toContain('×');
      expect(question?.explanation).toMatch(/合起来是 (50 角|30 分)。$/);
    }
  });

  it('does not repeat a complete question within a task', () => {
    for (const entry of addedCourseCatalog.filter(({ subject }) => subject === 'math')) {
      const unit = curriculum.units[entry.id];
      expect(unit, `Missing math curriculum unit ${entry.id}`).toBeDefined();
      if (!unit) continue;

      for (const [difficulty, track] of Object.entries(unit.difficultyTracks)) {
        for (const [taskIndex, task] of track.tasks.entries()) {
          const activities = task.sessions.flatMap(({ activities: sessionActivities }) => sessionActivities);
          const fingerprints = activities.map(questionFingerprint);
          expect(new Set(fingerprints).size, `${entry.id} ${difficulty} task ${taskIndex + 1} repeats a complete question`)
            .toBe(fingerprints.length);
        }
      }
    }
  });

  it('does not reuse a complete question across the two tasks of the same course and tier', () => {
    const failures: string[] = [];
    for (const entry of addedCourseCatalog.filter(({ subject }) => subject === 'math')) {
      const unit = curriculum.units[entry.id];
      expect(unit, `Missing math curriculum unit ${entry.id}`).toBeDefined();
      if (!unit) continue;

      for (const [difficulty, track] of Object.entries(unit.difficultyTracks)) {
        const [firstTask, secondTask] = track.tasks;
        const first = firstTask?.sessions.flatMap(({ activities }) => activities) ?? [];
        const second = secondTask?.sessions.flatMap(({ activities }) => activities) ?? [];
        const firstQuestions = new Set(first.map(questionFingerprint));
        second.forEach((activity, index) => {
          if (firstQuestions.has(questionFingerprint(activity))) {
            failures.push(`${entry.id} ${difficulty} q${index + 1}`);
          }
        });
      }
    }
    expect(failures).toEqual([]);
  });

  it('keeps similar-looking checkpoints focused on different information or reasoning', () => {
    const comparisons = [
      ['grade-1/term-1/math/unit-01', 'basic', 0, 0, 6],
      ['grade-1/term-1/math/unit-07', 'advanced', 0, 1, 7],
      ['grade-1/term-2/math/unit-03', 'advanced', 0, 5, 7],
      ['grade-3/term-1/math/unit-05', 'advanced', 0, 3, 6],
      ['grade-3/term-1/math/unit-05', 'advanced', 0, 3, 7],
      ['grade-3/term-1/math/unit-08', 'advanced', 1, 3, 7],
      ['grade-3/term-2/math/unit-03', 'basic', 0, 0, 7],
    ] as const;
    for (const [unitId, difficulty, taskIndex, leftIndex, rightIndex] of comparisons) {
      expect(choiceAnswerSignature(unitId, difficulty, taskIndex, leftIndex), `${unitId} ${difficulty} task ${taskIndex + 1}`)
        .not.toBe(choiceAnswerSignature(unitId, difficulty, taskIndex, rightIndex));
    }
  });

  it('keeps every choice question answerable with three distinct options', () => {
    for (const entry of addedCourseCatalog.filter(({ subject }) => subject === 'math')) {
      const unit = curriculum.units[entry.id];
      expect(unit, `Missing math curriculum unit ${entry.id}`).toBeDefined();
      if (!unit) continue;
      for (const track of Object.values(unit.difficultyTracks)) {
        for (const task of track.tasks) {
          for (const activity of task.sessions.flatMap(({ activities }) => activities)) {
            if (activity.kind !== 'choice') continue;
            expect(new Set(activity.options.map(({ label }) => label)).size,
              `${activity.id} has repeated answer choices`).toBe(3);
            expect(activity.options.some(({ id }) => id === activity.correctOptionId),
              `${activity.id} answer key is not one of its options`).toBe(true);
          }
        }
      }
    }
  });

  it('recomputes every generated arithmetic answer', () => {
    const arithmeticActivities = addedCourseCatalog.filter(({ subject }) => subject === 'math')
      .flatMap(({ id }) => {
        const unit = curriculum.units[id];
        return unit ? Object.values(unit.difficultyTracks).flatMap(({ tasks }) => tasks)
          .flatMap(({ sessions }) => sessions).flatMap(({ activities }) => activities)
          .filter((activity) => activity.kind === 'arithmetic') : [];
      });
    expect(arithmeticActivities).toHaveLength(366);
    for (const activity of arithmeticActivities) {
      if (activity.kind !== 'arithmetic') continue;
      expect(evaluateArithmetic(activity.expression), activity.id).toBe(activity.correctAnswer);
    }
  });

  it('keeps perimeter questions inside perimeter and side-length content', () => {
    for (const unitId of ['grade-3/term-1/math/unit-07', 'grade-3/term-1/math/unit-10']) {
      const unit = curriculum.units[unitId];
      expect(unit, `Missing perimeter curriculum unit ${unitId}`).toBeDefined();
      if (!unit) continue;
      const content = Object.values(unit.difficultyTracks).flatMap(({ tasks }) => tasks)
        .flatMap(({ sessions }) => sessions).flatMap(({ activities }) => activities)
        .flatMap((activity) => [activity.prompt, activity.hint, activity.explanation,
          ...(activity.kind === 'choice' ? activity.options.map(({ label }) => label) : [])]).join('\n');
      expect(content, unitId).not.toMatch(/面积|长\s*[×x*]\s*宽/);
    }
  });

  it('covers unit and non-unit fractions within the grade-three textbook topic', () => {
    const unit = curriculum.units['grade-3/term-1/math/unit-08'];
    expect(unit).toBeDefined();
    if (!unit) return;
    expect(unit.sourceTopics.join(' ')).toMatch(/几分之一、几分之几/);
    const content = Object.values(unit.difficultyTracks).flatMap(({ tasks }) => tasks)
      .flatMap(({ sessions }) => sessions).flatMap(({ activities }) => activities)
      .flatMap((activity) => [activity.prompt, activity.hint, activity.explanation,
        ...(activity.kind === 'choice' ? activity.options.map(({ label }) => label) : [])]).join('\n');
    expect(content).toMatch(/几分之几|分子不是 1|分子是 1/);
  });

  it('lists all but one pairing before asking which combination is missing', () => {
    const unit = curriculum.units['grade-3/term-2/math/unit-08'];
    expect(unit).toBeDefined();
    if (!unit) return;

    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const question = unit.difficultyTracks[difficulty].tasks[1]?.sessions[0]?.activities[6];
      expect(question?.kind).toBe('choice');
      if (question?.kind !== 'choice') continue;

      const expected = ['牛奶 + 面包', '牛奶 + 饼干', '果汁 + 面包', '果汁 + 饼干', '豆浆 + 面包', '豆浆 + 饼干'];
      const listed = expected.filter((combination) => question.prompt.includes(`“${combination}”`));
      expect(listed).toHaveLength(5);
      const answer = question.options.find(({ id }) => id === question.correctOptionId)?.label;
      expect(answer).toBe('豆浆 + 饼干');
      expect(question.prompt).not.toContain(`“${answer}”`);
      expect(question.explanation).toMatch(/每种饮料都和每种点心搭配过，共 6 种/);
    }
  });

  it('states both choice orders in combination-ordering questions', () => {
    const unit = curriculum.units['grade-3/term-2/math/unit-08'];
    expect(unit).toBeDefined();
    if (!unit) return;

    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      for (const [taskIndex, task] of unit.difficultyTracks[difficulty].tasks.entries()) {
        const question = task.sessions[0]?.activities[3];
        expect(question, `${difficulty} task ${taskIndex + 1}`).toBeDefined();
        expect(question?.prompt).toContain(taskIndex === 0 ? '黑裤子、白裤子、灰裤子' : '面包、饼干');
        if (difficulty === 'high') {
          expect(question?.prompt).toContain(taskIndex === 0 ? '红上衣、蓝上衣' : '牛奶、果汁、豆浆');
        }
      }
    }
  });

  it('keeps Grade 3 review cards self-contained and uses student-friendly multiplication wording', () => {
    const review = curriculum.units['grade-3/term-2/math/unit-09'];
    const combinations = curriculum.units['grade-3/term-2/math/unit-08'];
    expect(review).toBeDefined();
    expect(combinations).toBeDefined();
    if (!review || !combinations) return;

    const tableQuestion = review.difficultyTracks.advanced.tasks[0]?.sessions[0]?.activities[5];
    expect(tableQuestion?.kind).toBe('choice');
    expect(tableQuestion?.prompt).toContain('一班 4 人、二班 5 人');

    const methodQuestion = review.difficultyTracks.advanced.tasks[1]?.sessions[0]?.activities[5];
    expect(methodQuestion?.kind).toBe('choice');
    expect(methodQuestion?.explanation).not.toContain('阅读');

    const routeQuestion = review.difficultyTracks.high.tasks[1]?.sessions[0]?.activities[0];
    expect(routeQuestion?.kind).toBe('choice');
    expect(routeQuestion?.prompt).toContain('没有写明从哪里出发、先走哪一段');

    for (const task of combinations.difficultyTracks.basic.tasks) {
      const question = task.sessions[0]?.activities[7];
      expect(question?.prompt).toContain(task === combinations.difficultyTracks.basic.tasks[0] ? '红上衣、蓝上衣' : '牛奶、果汁、豆浆');
    }

    const multiplicationQuestion = review.difficultyTracks.high.tasks[0]?.sessions[0]?.activities[2];
    expect(multiplicationQuestion?.kind).toBe('choice');
    if (multiplicationQuestion?.kind === 'choice') {
      expect(multiplicationQuestion.options.some(({ label }) => label.includes('因数'))).toBe(false);
      expect(multiplicationQuestion.explanation).toContain('拆成 10 和 6');
    }
  });

  it('preserves the source table when converting matching questions to choices', () => {
    const unit = curriculum.units['grade-3/term-2/math/unit-03'];
    expect(unit).toBeDefined();
    if (!unit) return;

    const question = unit.difficultyTracks.advanced.tasks[0]?.sessions[0]?.activities[2];
    expect(question?.kind).toBe('choice');
    if (question?.kind !== 'choice') return;

    expect(question.prompt).toContain('把活动和两个班对应的人数连起来');
    expect(question.prompt).toContain('阅读：一班 4 人、二班 5 人');
    expect(question.options.some(({ label }) => label === '阅读 — 一班 4 人、二班 5 人')).toBe(true);
    expect(question.options.find(({ id }) => id === question.correctOptionId)?.label)
      .toBe('阅读 — 一班 4 人、二班 5 人');
  });

  it('keeps matching instructions and keyed answers in all differentiated math choices', () => {
    const convertedQuestions = Object.entries(curriculum.units)
      .filter(([unitId]) => /^grade-[13]\/term-[12]\/math\//.test(unitId))
      .flatMap(([, unit]) => (['advanced', 'high'] as const).flatMap((difficulty) =>
        unit.difficultyTracks[difficulty].tasks.map((task) => task.sessions[0]?.activities[2])))
      .filter((question): question is Extract<NonNullable<typeof question>, { kind: 'choice' }> => question?.kind === 'choice'
        && (question.prompt.includes('应该和哪项信息对应') || question.prompt.includes('错连到')));

    expect(convertedQuestions).toHaveLength(160);
    for (const question of convertedQuestions) {
      const target = question.prompt.match(/(?:词条|同伴把)“([^”]+)”/)?.[1];
      expect(target).toBeTruthy();
      expect(question.prompt.startsWith('原题要求：') || question.prompt.indexOf(' 词条“') > 0).toBe(true);

      const correctOption = question.options.find(({ id }) => id === question.correctOptionId)?.label;
      expect(correctOption?.startsWith(`${target} — `)).toBe(true);
      const correctRightLabel = correctOption?.slice(`${target} — `.length);
      expect(correctRightLabel).toBeTruthy();
      expect(question.explanation).toContain(`“${target}”对应“${correctRightLabel}”`);
    }
  });

  it('uses the finite-counter enumeration described by 摆一摆，想一想', () => {
    const unit = curriculum.units['grade-1/term-2/math/integrated-practice-01'];
    expect(unit).toBeDefined();
    if (!unit) return;
    for (const [difficulty, track] of Object.entries(unit.difficultyTracks)) {
      for (const [taskIndex, task] of track.tasks.entries()) {
        for (const activity of task.sessions.flatMap(({ activities }) => activities)) {
          const content = [activity.prompt, activity.hint, activity.explanation].join(' ');
          expect(content, `${difficulty} task ${taskIndex + 1} ${activity.id}`).toMatch(/棋子|摆法|十位|个位|数位组合/);
        }
      }
    }

    const basicTasks = unit.difficultyTracks.basic.tasks;
    for (const [taskIndex, task] of basicTasks.entries()) {
      const counterCount = taskIndex + 2;
      const activities = task.sessions[0]?.activities ?? [];
      const countQuestion = activities[0];
      expect(countQuestion?.kind).toBe('choice');
      if (countQuestion?.kind === 'choice') {
        const correct = countQuestion.options.find(({ id }) => id === countQuestion.correctOptionId)?.label;
        expect(Number(correct)).toBe(counterCount + 1);
      }

      const matchingQuestion = activities[2];
      expect(matchingQuestion?.kind).toBe('match');
      if (matchingQuestion?.kind === 'match') {
        const expectedValues = Array.from({ length: counterCount + 1 }, (_, tens) => String(tens * 10 + counterCount - tens));
        expect(matchingQuestion.pairs.map(({ right }) => right).sort((left, right) => Number(left) - Number(right)))
          .toEqual(expectedValues);
        for (const { left, right } of matchingQuestion.pairs) {
          const match = left.match(/十位放 (\d+) 枚，个位放 (\d+) 枚/);
          expect(match).not.toBeNull();
          expect(Number(match?.[1]) + Number(match?.[2])).toBe(counterCount);
          expect(Number(match?.[1]) * 10 + Number(match?.[2])).toBe(Number(right));
        }
      }
    }
  });

  it('keeps advanced and high ordering questions faithful to numeric ordering', () => {
    const unit = curriculum.units['grade-1/term-2/math/integrated-practice-01'];
    expect(unit).toBeDefined();
    if (!unit) return;

    for (const [difficulty, counterCounts] of [
      ['advanced', [3, 4]],
      ['high', [4, 5]],
    ] as const) {
      unit.difficultyTracks[difficulty].tasks.forEach((task, taskIndex) => {
        const question = task.sessions[0]?.activities[3];
        expect(question?.kind, `${difficulty} task ${taskIndex + 1}`).toBe('choice');
        if (question?.kind !== 'choice') return;

        const counterCount = counterCounts[taskIndex]!;
        const expectedOrder = Array.from({ length: counterCount + 1 }, (_, tens) => String(tens * 10 + counterCount - tens))
          .join(' → ');
        const correctLabel = question.options.find(({ id }) => id === question.correctOptionId)?.label;
        expect(question.prompt).toMatch(/从小到大/);
        expect(correctLabel, `${difficulty} task ${taskIndex + 1} must preserve the full ordered result`).toBe(expectedOrder);
      });
    }
  });

  it('meaningfully differentiates math tasks and difficulty tracks', () => {
    for (const entry of addedCourseCatalog.filter(({ subject }) => subject === 'math')) {
      const unit = curriculum.units[entry.id];
      expect(unit, `Missing math curriculum unit ${entry.id}`).toBeDefined();
      if (!unit) continue;
      for (let taskIndex = 0; taskIndex < 2; taskIndex += 1) {
        for (const [leftName, rightName] of [['basic', 'advanced'], ['basic', 'high'], ['advanced', 'high']] as const) {
          const left = unit.difficultyTracks[leftName].tasks[taskIndex]?.sessions[0]?.activities ?? [];
          const right = unit.difficultyTracks[rightName].tasks[taskIndex]?.sessions[0]?.activities ?? [];
          const distinctSlots = left.reduce((count, activity, index) =>
            count + (questionFingerprint(activity) === questionFingerprint(right[index]!) ? 0 : 1), 0);
          expect(distinctSlots, `${entry.id} task ${taskIndex + 1} ${leftName}/${rightName} only differs in ${distinctSlots}/8 question prompts`)
            .toBeGreaterThanOrEqual(4);
        }
      }
    }
  });

  it('keeps Grade 3 area-unit classification within the unit topics', () => {
    const unit = curriculum.units['grade-3/term-2/math/unit-05'];
    expect(unit).toBeDefined();
    if (!unit) return;

    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      for (const [taskIndex, task] of unit.difficultyTracks[difficulty].tasks.entries()) {
        const question = task.sessions[0]?.activities[4];
        expect(question?.kind).toBe('categorize');
        if (question?.kind !== 'categorize') continue;
        const labels = question.items.map(({ label }) => label);
        expect(labels).toEqual(taskIndex === 0
          ? ['厘米', '米', '平方厘米', '平方米']
          : ['毫米', '分米', '平方分米', '平方米']);
      }
    }
  });

  it('states the month inside Grade 3 calendar questions that use a month-specific explanation', () => {
    const unit = curriculum.units['grade-3/term-2/math/unit-06'];
    expect(unit).toBeDefined();
    if (!unit) return;

    const question = unit.difficultyTracks.basic.tasks[1]?.sessions[0]?.activities[7];
    expect(question?.kind).toBe('choice');
    if (question?.kind !== 'choice') return;
    expect(question.prompt).toContain('9 月');
    expect(question.explanation).toContain('9 月');
  });

  it('asks for the remaining time to one hour without implying the hour has already passed', () => {
    const unit = curriculum.units['grade-3/term-1/math/unit-01'];
    expect(unit).toBeDefined();
    if (!unit) return;

    const question = unit.difficultyTracks.basic.tasks[0]?.sessions[0]?.activities[6];
    expect(question?.kind).toBe('arithmetic');
    if (question?.kind !== 'arithmetic') return;
    expect(question.prompt).toBe('一段活动已经用了 15 分钟，满 1 小时还差多少分钟？');
    expect(question.expression).toBe('60 - 15');
    expect(question.correctAnswer).toBe(45);
  });

  it('does not repeat calculation instructions already present in a review prompt', () => {
    const unit = curriculum.units['grade-3/term-1/math/unit-10'];
    expect(unit).toBeDefined();
    if (!unit) return;

    for (const question of [
      unit.difficultyTracks.advanced.tasks[0]?.sessions[0]?.activities[3],
      unit.difficultyTracks.advanced.tasks[1]?.sessions[0]?.activities[3],
    ]) {
      expect(question?.kind).toBe('arithmetic');
      expect(question?.prompt.match(/列式计算并核对/g)).toHaveLength(1);
      expect(question?.prompt).toContain('一共有多少个？');
    }
  });

  it('includes the two class counts in every generated double-entry table sum question', () => {
    const unit = curriculum.units['grade-3/term-2/math/unit-03'];
    expect(unit).toBeDefined();
    if (!unit) return;

    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      for (const task of unit.difficultyTracks[difficulty].tasks) {
        const question = task.sessions[0]?.activities[1];
        expect(question?.kind).toBe('arithmetic');
        if (question?.kind !== 'arithmetic') continue;
        const operands = question.expression.match(/\d+/g)?.map(Number) ?? [];
        expect(operands).toHaveLength(2);
        expect(question.prompt).toContain(`一班 ${operands[0]} 人、二班 ${operands[1]} 人`);
        expect(question.correctAnswer).toBe(operands[0]! + operands[1]!);
      }
    }
  });

  it('states both choice counts in combination arithmetic prompts', () => {
    const unit = curriculum.units['grade-3/term-2/math/unit-08'];
    expect(unit).toBeDefined();
    if (!unit) return;

    for (const difficulty of ['advanced', 'high'] as const) {
      for (const [taskIndex, task] of unit.difficultyTracks[difficulty].tasks.entries()) {
        const question = task.sessions[0]?.activities[1];
        expect(question?.kind).toBe('arithmetic');
        if (question?.kind !== 'arithmetic') continue;
        const first = taskIndex === 0 ? '2 种上衣和 3 种裤子' : '3 种饮料和 2 种点心';
        expect(question.prompt).toContain(first);
        if (difficulty === 'high') expect(question.prompt).toContain('原有 6 种搭配');
      }
    }
  });
});
