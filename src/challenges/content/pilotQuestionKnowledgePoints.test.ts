import { describe, expect, it } from 'vitest';
import type { ActivityDefinition } from '../../content/types';
import { loadUnit } from '../../content/unitLoader';
import { derivePilotQuestionKnowledgePointIds } from './pilotQuestionKnowledgePoints';
import { grade1MathUnit09SupplementalActivities } from './grade1MathUnit09SupplementalActivities';
import { grade1MathUnit08SupplementalActivities } from './grade1MathUnit08SupplementalActivities';

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
  it('为一年级上册数学第二单元的位置活动映射知识点', async () => {
    const sourceUnitId = 'grade-1/term-1/math/unit-02';
    const unit = await loadUnit(sourceUnitId);
    expect(unit).toBeDefined();
    const activities = Object.values(unit!.difficultyTracks).flatMap((track) => track.tasks
      .flatMap((task) => task.sessions.flatMap((session) => session.activities)));
    const tagged = activities.map((activity) => derivePilotQuestionKnowledgePointIds(sourceUnitId, activity));
    const covered = new Set(tagged.flat());

    expect(activities).toHaveLength(48);
    expect(tagged.every((knowledgePointIds) => knowledgePointIds.length > 0)).toBe(true);
    expect(covered).toEqual(new Set(['relative-position', 'reference-point', 'route-sequence']));
  });

  it('为一年级上册数学第三单元全部原课程题映射组成、加减、比较和验算知识点', async () => {
    const sourceUnitId = 'grade-1/term-1/math/unit-03';
    const unit = await loadUnit(sourceUnitId);
    expect(unit).toBeDefined();
    const activities = Object.values(unit!.difficultyTracks).flatMap((track) => track.tasks
      .flatMap((task) => task.sessions.flatMap((session) => session.activities)));
    const tagged = activities.map((activity) => derivePilotQuestionKnowledgePointIds(sourceUnitId, activity));
    const covered = new Set(tagged.flat());

    expect(activities).toHaveLength(48);
    expect(tagged.every((knowledgePointIds) => knowledgePointIds.length > 0)).toBe(true);
    expect(covered).toEqual(new Set([
      'number-composition-within-five',
      'addition-within-five',
      'subtraction-within-five',
      'comparison-within-five',
      'checking-within-five',
    ]));
  });

  it('为一年级上册数学第四单元全部原课程题映射立体图形知识点', async () => {
    const sourceUnitId = 'grade-1/term-1/math/unit-04';
    const unit = await loadUnit(sourceUnitId);
    expect(unit).toBeDefined();
    const activities = Object.values(unit!.difficultyTracks).flatMap((track) => track.tasks
      .flatMap((task) => task.sessions.flatMap((session) => session.activities)));
    const tagged = activities.map((activity) => derivePilotQuestionKnowledgePointIds(sourceUnitId, activity));
    const covered = new Set(tagged.flat());

    expect(activities).toHaveLength(48);
    expect(tagged.every((knowledgePointIds) => knowledgePointIds.length > 0)).toBe(true);
    expect(covered).toEqual(new Set(['solid-shape-recognition', 'solid-shape-features', 'solid-shape-use']));
  });

  it('为一年级上册数学第五单元全部原课程题映射数与运算知识点', async () => {
    const sourceUnitId = 'grade-1/term-1/math/unit-05';
    const unit = await loadUnit(sourceUnitId);
    expect(unit).toBeDefined();
    const activities = Object.values(unit!.difficultyTracks).flatMap((track) => track.tasks
      .flatMap((task) => task.sessions.flatMap((session) => session.activities)));
    const tagged = activities.map((activity) => derivePilotQuestionKnowledgePointIds(sourceUnitId, activity));
    const covered = new Set(tagged.flat());

    expect(activities).toHaveLength(48);
    expect(tagged.every((knowledgePointIds) => knowledgePointIds.length > 0)).toBe(true);
    expect(covered).toEqual(new Set([
      'number-sequence-within-ten',
      'number-composition-within-ten',
      'addition-within-ten',
      'subtraction-within-ten',
      'comparison-within-ten',
      'checking-within-ten',
    ]));
  });

  it('为一年级上册数学第六单元全部原课程题映射数的组成、数序和大小比较', async () => {
    const sourceUnitId = 'grade-1/term-1/math/unit-06';
    const unit = await loadUnit(sourceUnitId);
    expect(unit).toBeDefined();
    const activities = Object.values(unit!.difficultyTracks).flatMap((track) => track.tasks
      .flatMap((task) => task.sessions.flatMap((session) => session.activities)));
    const tagged = activities.map((activity) => derivePilotQuestionKnowledgePointIds(sourceUnitId, activity));
    const covered = new Set(tagged.flat());

    expect(activities).toHaveLength(48);
    expect(tagged.every((knowledgePointIds) => knowledgePointIds.length > 0)).toBe(true);
    expect(covered).toEqual(new Set([
      'teen-number-composition',
      'number-sequence-eleven-to-twenty',
      'number-comparison-eleven-to-twenty',
    ]));
  });

  it('maps a route-ordering activity to route sequence knowledge', async () => {
    const sourceUnitId = 'grade-1/term-1/math/unit-02';
    const unit = await loadUnit(sourceUnitId);
    const activities = Object.values(unit!.difficultyTracks).flatMap((track) => track.tasks
      .flatMap((task) => task.sessions.flatMap((session) => session.activities)));
    const route = activities.find((activity) => activity.prompt.includes('路线顺序'));

    expect(route).toBeDefined();
    expect(derivePilotQuestionKnowledgePointIds(sourceUnitId, route!)).toEqual(['route-sequence']);
  });

  it('maps a route card that names its observation direction to both route and reference knowledge', async () => {
    const sourceUnitId = 'grade-1/term-1/math/unit-02';
    const unit = await loadUnit(sourceUnitId);
    const activities = Object.values(unit!.difficultyTracks).flatMap((track) => track.tasks
      .flatMap((task) => task.sessions.flatMap((session) => session.activities)));
    const route = activities.find((activity) => activity.kind === 'choice'
      && activity.options.some(({ label }) => label.includes('起点和观察方向')));

    expect(route).toBeDefined();
    expect(derivePilotQuestionKnowledgePointIds(sourceUnitId, route!)).toEqual(['route-sequence', 'reference-point']);
  });

  it('为一年级上册数学第一单元的全部原课程题标注可追踪知识点', async () => {
    const sourceUnitId = 'grade-1/term-1/math/unit-01';
    const unit = await loadUnit(sourceUnitId);
    expect(unit).toBeDefined();
    const activities = Object.values(unit!.difficultyTracks).flatMap((track) => track.tasks
      .flatMap((task) => task.sessions.flatMap((session) => session.activities)));
    const tagged = activities.map((activity) => derivePilotQuestionKnowledgePointIds(sourceUnitId, activity));
    const covered = new Set(tagged.flat());

    expect(activities).toHaveLength(48);
    expect(tagged.every((knowledgePointIds) => knowledgePointIds.length > 0)).toBe(true);
    expect(covered).toEqual(new Set(['counting-one-to-one', 'number-sequence', 'quantity-comparison', 'zero-as-none']));
  });

  it('does not map a one-more arithmetic activity to one-to-one counting', async () => {
    const sourceUnitId = 'grade-1/term-1/math/unit-01';
    const unit = await loadUnit(sourceUnitId);
    const activities = Object.values(unit!.difficultyTracks).flatMap((track) => track.tasks
      .flatMap((task) => task.sessions.flatMap((session) => session.activities)));
    const arithmetic = activities.find((activity) => activity.kind === 'arithmetic' && activity.prompt.startsWith('算一算：'));

    expect(arithmetic).toBeDefined();
    expect(derivePilotQuestionKnowledgePointIds(sourceUnitId, arithmetic!)).toEqual(['number-sequence']);
  });

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

  it('maps Grade 1 Unit 8 carrying addition, ten-complement strategy, stories, and checks distinctly', () => {
    const sourceUnitId = 'grade-1/term-1/math/unit-08';

    expect(derivePilotQuestionKnowledgePointIds(
      sourceUnitId,
      { ...base, kind: 'arithmetic', prompt: '计算。', expression: '8 + 5', correctAnswer: 13 },
    )).toEqual(['addition-within-twenty', 'carry-addition-within-twenty', 'make-ten-strategy']);
    expect(derivePilotQuestionKnowledgePointIds(
      sourceUnitId,
      { ...base, kind: 'arithmetic', prompt: '计算。', expression: '10 + 5', correctAnswer: 15 },
    )).toEqual(['addition-within-twenty']);
    expect(derivePilotQuestionKnowledgePointIds(
      sourceUnitId,
      choice('原有 8 个苹果，又放入 5 个。应该列什么算式？', ['8 + 5', '8 - 5']),
    )).toEqual(['addition-within-twenty', 'carry-addition-within-twenty', 'make-ten-strategy', 'addition-situation-modeling']);
    expect(derivePilotQuestionKnowledgePointIds(
      sourceUnitId,
      choice('同学把 8 + 5 算成 12，哪项检查能发现错误？', ['12 - 5 = 7', '12 - 5 = 8']),
    )).toEqual(['addition-within-twenty', 'carry-addition-within-twenty', 'make-ten-strategy', 'addition-checking']);
    expect(derivePilotQuestionKnowledgePointIds(
      sourceUnitId,
      grade1MathUnit08SupplementalActivities[0]!.activity,
    )).toEqual(['make-ten-strategy', 'carry-addition-within-twenty']);
  });

  it('maps Grade 1 Unit 9 review activities to taught number, position, shape, and clock points', () => {
    const sourceUnitId = 'grade-1/term-1/math/unit-09';

    expect(derivePilotQuestionKnowledgePointIds(
      sourceUnitId,
      choice('计算：8 + 4 = ?', ['12', '11', '13']),
    )).toEqual(['addition-within-twenty']);
    expect(derivePilotQuestionKnowledgePointIds(
      sourceUnitId,
      choice('比较 9 和 5，哪句话正确？', ['9 比 5 大', '9 比 5 小']),
    )).toEqual(['comparison-within-ten']);
    expect(derivePilotQuestionKnowledgePointIds(
      sourceUnitId,
      choice('比较 18 和 13，哪句话正确？', ['18 比 13 大', '18 比 13 小']),
    )).toEqual(['number-comparison-eleven-to-twenty']);
    expect(derivePilotQuestionKnowledgePointIds(
      sourceUnitId,
      choice('小狗在小猫左边，小猫在小狗的哪边？', ['右边', '左边']),
    )).toEqual(['relative-position']);
    expect(derivePilotQuestionKnowledgePointIds(
      sourceUnitId,
      choice('哪种立体图形有弯曲侧面和两个圆形平面？', ['圆柱体', '球体']),
    )).toEqual(['solid-shape-recognition', 'solid-shape-features']);
    expect(derivePilotQuestionKnowledgePointIds(
      sourceUnitId,
      choice('分针指向 12，时针指向 5，表示什么时刻？', ['5 时整', '5 时半']),
    )).toEqual(['clock-whole-hour-reading']);
    expect(derivePilotQuestionKnowledgePointIds(
      sourceUnitId,
      grade1MathUnit09SupplementalActivities[0]!.activity,
    )).toEqual(['addition-within-twenty']);
    expect(() => derivePilotQuestionKnowledgePointIds(
      sourceUnitId,
      choice('盒子里有 14 个积木，拿出 5 个后，还剩几个？', ['9', '8', '10']),
    )).toThrow('outside the Grade 1 Term 1 review scope');
  });

  it('classifies every retained Grade 1 Unit 9 course candidate and rejects direct teen subtraction', async () => {
    const sourceUnitId = 'grade-1/term-1/math/unit-09';
    const unit = await loadUnit(sourceUnitId);
    const excludedActivityIds = new Set([
      `${sourceUnitId}/basic/task-01/session-01/question-07`,
      `${sourceUnitId}/basic/task-02/session-01/question-07`,
      `${sourceUnitId}/advanced/task-01/session-01/question-07`,
      `${sourceUnitId}/advanced/task-01/session-01/question-08`,
      `${sourceUnitId}/advanced/task-02/session-01/question-07`,
      `${sourceUnitId}/high/task-01/session-01/question-01`,
      `${sourceUnitId}/high/task-01/session-01/question-07`,
      `${sourceUnitId}/high/task-02/session-01/question-07`,
    ]);
    const outOfScopeSubtractionIds = [
      `${sourceUnitId}/basic/task-01/session-01/question-07`,
      `${sourceUnitId}/basic/task-02/session-01/question-07`,
      `${sourceUnitId}/advanced/task-01/session-01/question-07`,
      `${sourceUnitId}/advanced/task-01/session-01/question-08`,
      `${sourceUnitId}/advanced/task-02/session-01/question-07`,
      `${sourceUnitId}/high/task-01/session-01/question-07`,
      `${sourceUnitId}/high/task-02/session-01/question-07`,
    ];
    const retainedActivities = Object.values(unit!.difficultyTracks).flatMap((track) => track.tasks
      .flatMap((task) => task.sessions.flatMap((session) => session.activities)))
      .filter(({ id }) => !excludedActivityIds.has(id));

    expect(retainedActivities).toHaveLength(40);
    expect(retainedActivities.every((activity) => derivePilotQuestionKnowledgePointIds(sourceUnitId, activity).length > 0)).toBe(true);
    for (const activityId of outOfScopeSubtractionIds) {
      const activity = Object.values(unit!.difficultyTracks).flatMap((track) => track.tasks)
        .flatMap((task) => task.sessions.flatMap((session) => session.activities))
        .find(({ id }) => id === activityId)!;
      expect(() => derivePilotQuestionKnowledgePointIds(sourceUnitId, activity)).toThrow('outside the Grade 1 Term 1 review scope');
    }
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

  it('maps self-introduction and age questions to the Grade 3 English unit points', () => {
    const sourceUnitId = 'grade-3/term-1/english/unit-01';

    expect(derivePilotQuestionKnowledgePointIds(
      sourceUnitId,
      choice('“My name is Amy.” 表示什么？', ['我的名字叫 Amy。', '我有一个苹果。', '我喜欢蓝色。']),
    )).toEqual(['name-and-self-introduction']);
    expect(derivePilotQuestionKnowledgePointIds(
      sourceUnitId,
      choice('别人问 “How old are you?”，是在问什么？', ['你几岁？', '你叫什么？', '你喜欢什么？']),
    )).toEqual(['age-and-class']);
    expect(derivePilotQuestionKnowledgePointIds(
      sourceUnitId,
      choice('核对 name 和 age 两项个人信息。', ['姓名与年龄都正确', '只核对姓名', '只核对年龄']),
    )).toEqual(['name-and-self-introduction', 'age-and-class']);
    expect(derivePilotQuestionKnowledgePointIds(
      sourceUnitId,
      choice('向伙伴介绍句子前，先检查什么？', ['核对关键词的意思，再按正确词序读一遍。']),
    )).toEqual(['name-and-self-introduction']);
  });

  it('fails closed for an unsupported source unit or a question with no detectable core point', () => {
    expect(() => derivePilotQuestionKnowledgePointIds('grade-2/term-1/math/unit-09', choice('计算。'))).toThrow();
    expect(() => derivePilotQuestionKnowledgePointIds(
      'grade-2/term-1/math/unit-02',
      choice('请看图。'),
    )).toThrow();
  });
});
