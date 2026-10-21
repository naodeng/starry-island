import { describe, expect, it } from 'vitest';
import { curriculum } from '../../curriculum';

const chineseUnits = Object.entries(curriculum.units)
  .filter(([id, unit]) => (id.startsWith('grade-1/') || id.startsWith('grade-3/')) && unit.subject === 'chinese');

function questionFingerprint(question: (typeof chineseUnits)[number][1]['difficultyTracks']['basic']['tasks'][number]['sessions'][number]['activities'][number]): string {
  if (question.kind === 'choice') {
    const correctLabel = question.options.find(({ id }) => id === question.correctOptionId)?.label;
    return JSON.stringify([question.kind, question.prompt, question.hint, question.explanation,
      [...question.options.map(({ label }) => label)].sort(), correctLabel]);
  }
  if (question.kind === 'match') {
    return JSON.stringify([question.kind, question.prompt, question.hint, question.explanation,
      question.pairs.map(({ left, right }) => [left, right]).sort(([left], [right]) => left.localeCompare(right))]);
  }
  if (question.kind === 'order') {
    const labelById = new Map(question.items.map(({ id, label }) => [id, label]));
    return JSON.stringify([question.kind, question.prompt, question.hint, question.explanation,
      question.correctOrder.map((id) => labelById.get(id)), question.items.map(({ label }) => label).sort()]);
  }
  if (question.kind === 'categorize') {
    const labelById = new Map(question.categories.map(({ id, label }) => [id, label]));
    return JSON.stringify([question.kind, question.prompt, question.hint, question.explanation,
      question.items.map(({ label, categoryId }) => [label, labelById.get(categoryId)] as const)
        .sort((left, right) => left[0].localeCompare(right[0])),
      question.categories.map(({ label }) => label)]);
  }
  return JSON.stringify(question);
}

function activitiesFor(unitId: string) {
  const unit = curriculum.units[unitId];
  if (!unit) throw new Error(`Missing curriculum unit: ${unitId}`);
  return Object.values(unit.difficultyTracks)
    .flatMap(({ tasks }) => tasks)
    .flatMap(({ sessions }) => sessions)
    .flatMap(({ activities }) => activities);
}

function categorizedLabels(unitId: string): Set<string> {
  return new Set(activitiesFor(unitId).flatMap((question) =>
    question.kind === 'categorize' ? question.items.map(({ label }) => label)
      : question.kind === 'match' && question.prompt === '把补充拼音卡和类别连起来。'
        ? question.pairs.map(({ left }) => left) : [],
  ));
}

describe('grade 1 and 3 Chinese course review', () => {
  it('does not repeat the same category as two separate standards in an answer', () => {
    const duplicateCategoryStandard = /“([^”]+)”和“\1”的标准/;
    const failures = chineseUnits.flatMap(([unitId]) => activitiesFor(unitId)
      .filter((activity) => activity.kind === 'choice')
      .flatMap((activity) => {
        const answer = activity.options.find(({ id }) => id === activity.correctOptionId)?.label ?? '';
        return duplicateCategoryStandard.test(answer) ? [`${activity.id}: ${answer}`] : [];
      }));

    expect(failures).toEqual([]);
  });

  it('does not reuse a complete question across the two tasks of the same course and tier', () => {
    const failures: string[] = [];
    for (const [unitId, unit] of chineseUnits) {
      for (const [difficulty, track] of Object.entries(unit.difficultyTracks)) {
        const [firstTask, secondTask] = track.tasks;
        const first = firstTask?.sessions.flatMap(({ activities }) => activities) ?? [];
        const second = secondTask?.sessions.flatMap(({ activities }) => activities) ?? [];
        const firstQuestions = new Set(first.map(questionFingerprint));
        second.forEach((question, index) => {
          if (firstQuestions.has(questionFingerprint(question))) {
            failures.push(`${unitId} ${difficulty} q${index + 1}`);
          }
        });
      }
    }
    expect(failures).toEqual([]);
  });

  it('keeps Grade 1 word-card review language concrete for beginning readers', () => {
    const unitId = 'grade-1/term-1/chinese/unit-01';
    const activities = activitiesFor(unitId);
    const text = activities.flatMap((activity) => [
      activity.prompt,
      activity.hint,
      activity.explanation,
      ...(activity.kind === 'choice' ? activity.options.map(({ label }) => label) : []),
      ...(activity.kind === 'order' ? activity.items.map(({ label }) => label) : []),
    ]).join('\n');
    const activityBySuffix = (suffix: string) => activities.find(({ id }) => id.endsWith(suffix));
    const scenarioCheck = activityBySuffix('/basic/task-02/session-01/question-06');
    const introductionOrder = activityBySuffix('/high/task-01/session-01/question-05');

    expect(text).not.toMatch(/观点—线索—核对—表达|要核对“|要向伙伴证明|在新情境中判断|处理后的结果/);
    expect(scenarioCheck?.prompt).toBe('想知道问题有没有解决，应该看什么？');
    expect(introductionOrder?.kind).toBe('order');
    if (introductionOrder?.kind === 'order') {
      expect(introductionOrder.prompt).toBe('把介绍词卡的步骤排好。');
      expect(introductionOrder.items.map(({ label }) => label)).toEqual([
        '先读清两张词卡', '说出每张词卡的意思', '看看哪里相同或不同', '把发现说给伙伴听',
      ]);
    }
  });

  it('ties Grade 1 scenario answers to their actual questions in advanced and high tracks', () => {
    const expected = [
      ['grade-1/term-1/chinese/unit-04', '同一棵树在春天和秋天的变化', '在不同时间观察并记录叶子的变化', '观察并记录，才能比较变化'],
      ['grade-1/term-1/chinese/unit-05', '在校园里看见一个不认识的字', '请教老师或查识字卡，再试着认读', '借助老师或识字卡核对'],
      ['grade-1/term-2/chinese/unit-02', '想介绍家人', '这是我的妈妈。周末我们常一起散步。', '说出人物关系和一件具体事情'],
      ['grade-1/term-2/chinese/unit-04', '要介绍一个节日习俗', '先问家人或看书，再说自己了解到的习俗', '问家人或看书核对过'],
    ] as const;

    for (const [unitId, promptFragment, answerFragment, explanationFragment] of expected) {
      const unit = curriculum.units[unitId];
      expect(unit).toBeDefined();
      if (!unit) continue;

      for (const difficulty of ['advanced', 'high'] as const) {
        const question = unit.difficultyTracks[difficulty].tasks[0]!.sessions[0]!.activities[5]!;
        expect(question.kind).toBe('choice');
        if (question.kind !== 'choice') continue;

        expect(question.prompt).toContain(promptFragment);
        expect(question.explanation).toContain(explanationFragment);
        expect(question.options.find(({ id }) => id === question.correctOptionId)?.label).toContain(answerFragment);
      }
    }
  });

  it('keeps the Grade 1 日月水火 category cards and explanation aligned', () => {
    const unit = curriculum.units['grade-1/term-1/chinese/unit-05'];
    expect(unit).toBeDefined();
    if (!unit) return;

    const basicSort = unit.difficultyTracks.basic.tasks[0]!.sessions[0]!.activities[3]!;
    expect(basicSort.kind).toBe('categorize');
    if (basicSort.kind === 'categorize') {
      const fireCard = basicSort.items.find(({ label }) => label === '火');
      expect(fireCard).toBeDefined();
      expect(basicSort.categories.find(({ id }) => id === fireCard?.categoryId)?.label).toBe('自然事物');
    }

    const explanation = unit.difficultyTracks.high.tasks[0]!.sessions[0]!.activities[7]!;
    expect(explanation.kind).toBe('choice');
    if (explanation.kind === 'choice') {
      expect(explanation.options.find(({ id }) => id === explanation.correctOptionId)?.label)
        .toMatch(/“(水|火)”和“(水|火)”都符合“自然事物”/);
      expect(explanation.explanation).toMatch(/都符合“自然事物”/);
      expect(explanation.explanation).not.toContain('“生活用具”');
    }
  });

  it('uses context-specific classification and sharing answers for Grade 1 friendship cards', () => {
    const unit = curriculum.units['grade-1/term-2/chinese/unit-03'];
    expect(unit).toBeDefined();
    if (!unit) return;

    const friendshipReason = unit.difficultyTracks.high.tasks[0]!.sessions[0]!.activities[7]!;
    expect(friendshipReason.kind).toBe('choice');
    if (friendshipReason.kind === 'choice') {
      expect(friendshipReason.prompt).toContain('“同学”和“让一让”');
      expect(friendshipReason.options.find(({ id }) => id === friendshipReason.correctOptionId)?.label)
        .toContain('让一让是给别人留出机会');
      expect(friendshipReason.explanation).toContain('都能帮助伙伴友好相处');
    }

    const sharing = unit.difficultyTracks.advanced.tasks[1]!.sessions[0]!.activities[7]!;
    expect(sharing.kind).toBe('choice');
    if (sharing.kind === 'choice') {
      expect(sharing.prompt).toContain('同伴也想玩玩具');
      expect(sharing.options.find(({ id }) => id === sharing.correctOptionId)?.label)
        .toContain('商量轮流玩');
      expect(sharing.explanation).toContain('给伙伴留出机会');
    }
  });

  it('defines 分钟 as a unit for measuring duration in the Grade 1 habits unit', () => {
    const unit = curriculum.units['grade-1/term-2/chinese/unit-07'];
    expect(unit).toBeDefined();
    if (!unit) return;

    const question = unit.difficultyTracks.high.tasks[0]!.sessions[0]!.activities[0]!;
    expect(question.kind).toBe('choice');
    if (question.kind === 'choice') {
      expect(question.prompt).toContain('“分钟”');
      expect(question.explanation).toContain('计量时间长短的单位');
      expect(question.options.find(({ id }) => id === question.correctOptionId)?.label)
        .toBe('计量时间长短的单位');
    }
  });

  it('varies at least half of each task across every pair of difficulty levels', () => {
    const tierPairs = [['basic', 'advanced'], ['basic', 'high'], ['advanced', 'high']] as const;
    const failures: string[] = [];

    for (const [unitId, unit] of chineseUnits) {
      for (const taskIndex of [0, 1]) {
        for (const [leftTier, rightTier] of tierPairs) {
          const left = unit.difficultyTracks[leftTier].tasks[taskIndex]!.sessions[0]!.activities;
          const right = unit.difficultyTracks[rightTier].tasks[taskIndex]!.sessions[0]!.activities;
          const distinctSlots = left.filter((question, index) =>
            questionFingerprint(question) !== questionFingerprint(right[index]!),
          ).length;
          if (distinctSlots < 4) failures.push(`${unitId} task ${taskIndex + 1} ${leftTier}/${rightTier}: ${distinctSlots}/8`);
        }
      }
    }

    expect(failures).toEqual([]);
  });

  it('covers the textbook single finals and initial groups in the first pinyin unit', () => {
    expect(categorizedLabels('grade-1/term-1/chinese/unit-02')).toEqual(new Set([
      'a', 'o', 'e', 'i', 'u', 'ü', 'b', 'p', 'm', 'f', 'd', 't', 'n', 'l', 'g', 'k', 'h',
      'j', 'q', 'x', 'z', 'c', 's', 'zh', 'ch', 'sh', 'r', 'y', 'w',
    ]));
  });

  it('covers the textbook compound finals, nasal finals, and whole syllables in the second pinyin unit', () => {
    expect(categorizedLabels('grade-1/term-1/chinese/unit-03')).toEqual(new Set([
      'ai', 'ei', 'ui', 'ao', 'ou', 'iu', 'ie', 'üe', 'er', 'an', 'en', 'in', 'un', 'ün',
      'ang', 'eng', 'ing', 'ong', 'zhi', 'chi', 'shi', 'ri', 'zi', 'ci', 'si', 'yi', 'wu',
      'yu', 'ye', 'yue', 'yuan', 'yin', 'yun', 'ying',
    ]));
  });

  it('limits pinyin card sorts to eight items and keeps the unit-two explanation in scope', () => {
    const firstUnit = activitiesFor('grade-1/term-1/chinese/unit-02');
    const secondUnit = activitiesFor('grade-1/term-1/chinese/unit-03');
    for (const activity of [...firstUnit, ...secondUnit]) {
      if (activity.kind === 'categorize') expect(activity.items.length).toBeLessThanOrEqual(8);
    }
    const firstUnitText = firstUnit.flatMap((activity) => [activity.prompt, activity.hint, activity.explanation]).join('\n');
    expect(firstUnitText).not.toContain('整体认读音节');
  });

  it('balances the final two textbook cards across categories and varies whole-syllable practice', () => {
    const unit = curriculum.units['grade-1/term-1/chinese/unit-03'];
    expect(unit).toBeDefined();
    if (!unit) return;

    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const firstTask = unit.difficultyTracks[difficulty].tasks[0]!.sessions[0]!.activities;
      const complement = firstTask[2]!;
      const firstSyllableQuestion = firstTask[5]!;
      const secondSyllableQuestion = unit.difficultyTracks[difficulty].tasks[1]!.sessions[0]!.activities[5]!;

      expect(complement.kind).toBe('match');
      if (complement.kind === 'match') {
        expect(new Set(complement.pairs.map(({ right }) => right))).toEqual(new Set(['韵母', '整体认读音节']));
      }
      expect(firstSyllableQuestion.prompt).toContain('zhi');
      expect(secondSyllableQuestion.prompt).toContain('ying');
    }
  });

  it('classifies “交流” as an expression and communication activity', () => {
    const questions = activitiesFor('grade-3/term-1/chinese/unit-01');
    const communication = questions.flatMap((question) => {
      if (question.kind !== 'categorize') return [];
      const card = question.items.find(({ label }) => label === '交流');
      if (!card) return [];
      const category = question.categories.find(({ id }) => id === card.categoryId);
      return category ? [category.label] : [];
    });
    expect(communication.length).toBeGreaterThan(0);
    expect(new Set(communication)).toEqual(new Set(['表达形式']));
  });

  it('does not present whole syllables as letter-by-letter spelling or dictionary meanings', () => {
    const pinyinQuestions = activitiesFor('grade-1/term-1/chinese/unit-03');
    const text = pinyinQuestions.flatMap((question) => [
      question.prompt,
      question.hint,
      question.explanation,
      ...(question.kind === 'order' ? question.items.map(({ label }) => label) : []),
    ]).join('\n');
    expect(text).not.toMatch(/按顺序读出字母音/);
    expect(text).not.toMatch(/解释.{0,8}(zhi|ang).{0,8}意思/i);
  });

  it('uses pinyin-specific language in advanced and high application questions', () => {
    for (const unitId of ['grade-1/term-1/chinese/unit-02', 'grade-1/term-1/chinese/unit-03']) {
      const unit = curriculum.units[unitId];
      expect(unit).toBeDefined();
      if (!unit) continue;

      for (const difficulty of ['advanced', 'high'] as const) {
        for (const task of unit.difficultyTracks[difficulty].tasks) {
          const question = task.sessions[0]?.activities[7];
          expect(question?.kind).toBe('choice');
          if (!question || question.kind !== 'choice') continue;
          const text = [question.prompt, question.hint, question.explanation, ...question.options.map(({ label }) => label)]
            .join('\n');
          expect(text).not.toMatch(/词义|词语意思|主题线索|用在新的.{0,12}情境/);
        }
      }
    }
  });

  it('keeps Grade 1 pinyin scenario questions tied to the requested tone or syllable', () => {
    const initials = curriculum.units['grade-1/term-1/chinese/unit-02'];
    const finals = curriculum.units['grade-1/term-1/chinese/unit-03'];
    expect(initials).toBeDefined();
    expect(finals).toBeDefined();
    if (!initials || !finals) return;

    const questionAt = (unit: typeof initials, difficulty: 'basic' | 'advanced' | 'high', taskIndex: number) =>
      unit.difficultyTracks[difficulty].tasks[taskIndex]!.sessions[0]!.activities[5]!;
    const fourthTone = questionAt(initials, 'basic', 1);
    const thirdTone = questionAt(initials, 'advanced', 0);
    const splitSyllable = questionAt(finals, 'basic', 1);

    expect(fourthTone.kind).toBe('choice');
    expect(fourthTone.prompt).toContain('pa 的第四声');
    expect(fourthTone.hint).toContain('第四声');
    expect(thirdTone.kind).toBe('choice');
    expect(thirdTone.prompt).toContain('第三声');
    expect(splitSyllable.kind).toBe('choice');
    expect(splitSyllable.prompt).toContain('ying');
    expect(splitSyllable.prompt).not.toContain('处理后的结果');
  });

  it('keeps the grade-three imagination task about coherent creative ideas', () => {
    const unit = curriculum.units['grade-3/term-2/chinese/unit-05'];
    expect(unit).toBeDefined();
    if (!unit) return;

    for (const difficulty of ['advanced', 'high'] as const) {
      const question = unit.difficultyTracks[difficulty].tasks[1]?.sessions[0]?.activities[5];
      expect(question?.kind).toBe('choice');
      if (question?.kind !== 'choice') continue;
      const text = [question.prompt, question.hint, question.explanation, ...question.options.map(({ label }) => label)].join('\n');
      expect(text).toMatch(/想象|新奇事物/);
      expect(text).not.toMatch(/观察到的具体线索|回看实际线索|观察到什么/);
    }
  });
});
