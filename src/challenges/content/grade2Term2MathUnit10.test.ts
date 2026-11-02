import { describe, expect, it } from 'vitest';
// @ts-expect-error Node.js is used only to inspect this unit's review ledger during Vitest.
import { existsSync, readFileSync } from 'node:fs';
// @ts-expect-error Node.js is used only to resolve this unit's review ledger during Vitest.
import { resolve } from 'node:path';
import type { ActivityDefinition, Difficulty } from '../../content/types';
import { loadUnit } from '../../content/unitLoader';
import { fingerprintActivity } from './fingerprint';
import { grade2Term2MathUnit10SupplementalActivities } from './grade2Term2MathUnit10SupplementalActivities';

declare const process: { cwd(): string };

const unitId = 'grade-2/term-2/math/unit-10';
const groupId = 'grade-2-term-2-math-unit-10';
const sourceTopics = ['复习万以内数、表内乘除法和混合运算', '综合复习图形运动、质量和数据整理'];
const knowledgePointIds = [
  'number-composition-and-place-value',
  'zero-as-placeholder',
  'reading-and-writing-within-10000',
  'comparing-and-ordering-within-10000',
  'multiplication-facts',
  'division-facts-from-multiplication',
  'division-as-equal-sharing-and-grouping',
  'quotient-and-remainder-meaning',
  'remainder-less-than-divisor',
  'interpreting-remainder-in-context',
  'two-digit-addition-and-subtraction',
  'addition-and-subtraction-within-10000',
  'mixed-operations-multiplication-division-before-addition-subtraction',
  'mixed-operations-parentheses-first',
  'mixed-operations-same-level-left-to-right',
  'axis-symmetry-and-symmetry-axis',
  'translation-direction-and-orientation',
  'rotation-around-fixed-center',
  'mass-unit-conversion',
  'mass-comparison-and-estimation',
  'survey-design-and-data-collection',
  'organizing-survey-data',
  'reading-and-reasoning-with-statistical-tables',
  'integrated-review-and-answer-checking',
] as const;
const challengeCoreKnowledgePointIds = [
  'mass-unit-conversion',
  'translation-direction-and-orientation',
  'organizing-survey-data',
  'reading-and-reasoning-with-statistical-tables',
] as const;

const expectedSupplementAnswers: Record<Difficulty, readonly string[]> = {
  basic: [
    '48', '9', '5,072', '百位', '4,000克', '轴对称', '旋转', '4个', '1,200克', '24',
    '足球和篮球并列最多', '平移', '4,900', '先确定调查问题',
  ],
  advanced: [
    '39', '31', '6袋，还剩1张', '600克', '先算括号里的加法', '科普书', '平移', '6',
    '五千零八十', '1,250克', '把数据分类记录', '对称轴', '450克', '16',
  ],
  high: [
    '6盒，还剩5张', '54', '3,725', '红色和蓝色并列最多', '2,650克',
    '先计算括号里的内容', '3,800', '1把', '5组，还剩3人', '平移',
    '7块', '2,750克', '70', '先明确调查问题和记录规则',
  ],
};

const expectedSupplementKnowledgePoints: Record<Difficulty, readonly (readonly string[])[]> = {
  basic: [
    [knowledgePointIds[4]], [knowledgePointIds[5]], [knowledgePointIds[2], knowledgePointIds[1]],
    [knowledgePointIds[0], knowledgePointIds[1]], [knowledgePointIds[18]],
    [knowledgePointIds[15]], [knowledgePointIds[17]], [knowledgePointIds[6]],
    [knowledgePointIds[18]], [knowledgePointIds[12]],
    [knowledgePointIds[22]], [knowledgePointIds[16]], [knowledgePointIds[3]],
    [knowledgePointIds[20], knowledgePointIds[21]],
  ],
  advanced: [
    [knowledgePointIds[4], knowledgePointIds[10]], [knowledgePointIds[12]],
    [knowledgePointIds[7], knowledgePointIds[8], knowledgePointIds[9]],
    [knowledgePointIds[18], knowledgePointIds[19]], [knowledgePointIds[12], knowledgePointIds[13]],
    [knowledgePointIds[22]], [knowledgePointIds[16], knowledgePointIds[17]],
    [knowledgePointIds[5], knowledgePointIds[6]], [knowledgePointIds[2], knowledgePointIds[1]],
    [knowledgePointIds[18]], [knowledgePointIds[20], knowledgePointIds[21]],
    [knowledgePointIds[15]], [knowledgePointIds[18], knowledgePointIds[10]],
    [knowledgePointIds[14]],
  ],
  high: [
    [knowledgePointIds[7], knowledgePointIds[8], knowledgePointIds[9]],
    [knowledgePointIds[4]], [knowledgePointIds[11]], [knowledgePointIds[22]],
    [knowledgePointIds[18]], [knowledgePointIds[12], knowledgePointIds[13]],
    [knowledgePointIds[11]], [knowledgePointIds[10], knowledgePointIds[23]],
    [knowledgePointIds[7], knowledgePointIds[8], knowledgePointIds[9]],
    [knowledgePointIds[16], knowledgePointIds[17]], [knowledgePointIds[6], knowledgePointIds[5]],
    [knowledgePointIds[18]], [knowledgePointIds[0], knowledgePointIds[1]],
    [knowledgePointIds[20], knowledgePointIds[21]],
  ],
};

const expectedSourceKnowledgePoints: Record<Difficulty, readonly (readonly string[])[]> = {
  basic: [
    [knowledgePointIds[4]], // 01 multiplication fact
    [knowledgePointIds[5]], // 02 division fact from multiplication
    [knowledgePointIds[10]], // 03 two-digit addition
    [knowledgePointIds[0], knowledgePointIds[1]], // 04 place value and zero
    [knowledgePointIds[18]], // 05 mass conversion
    [knowledgePointIds[4], knowledgePointIds[5], knowledgePointIds[10]], // 06 mixed arithmetic facts
    [knowledgePointIds[7], knowledgePointIds[8], knowledgePointIds[9]], // 07 remainder in context
    [knowledgePointIds[10]], // 08 written addition
    [knowledgePointIds[15]], // 09 axis symmetry
    [knowledgePointIds[16]], // 10 translation
    [knowledgePointIds[18], knowledgePointIds[19]], // 11 compare mass
    [knowledgePointIds[10]], // 12 add two given counts
    [knowledgePointIds[16], knowledgePointIds[17]], // 13 translation and rotation
    [knowledgePointIds[4], knowledgePointIds[6], knowledgePointIds[10]], // 14 operation in context
    [knowledgePointIds[22]], // 15 compare table entries
    [knowledgePointIds[20], knowledgePointIds[21], knowledgePointIds[23]], // 16 collect and organize data
  ],
  advanced: [
    [knowledgePointIds[4], knowledgePointIds[10]], // 01 multiply then add
    [knowledgePointIds[12]], // 02 multiplication before subtraction
    [knowledgePointIds[7], knowledgePointIds[8], knowledgePointIds[9]], // 03 remainder and group count
    [knowledgePointIds[4], knowledgePointIds[6], knowledgePointIds[10]], // 04 choose operations
    [knowledgePointIds[18], knowledgePointIds[19]], // 05 compare mass
    [knowledgePointIds[12], knowledgePointIds[13]], // 06 operation precedence
    [knowledgePointIds[22]], // 07 compare survey counts
    [knowledgePointIds[12], knowledgePointIds[13]], // 08 parentheses and order
    [knowledgePointIds[11]], // 09 addition within 10,000
    [knowledgePointIds[5]], // 10 division fact
    [knowledgePointIds[16]], // 11 translation
    [knowledgePointIds[22], knowledgePointIds[6], knowledgePointIds[18]], // 12 review methods
    [knowledgePointIds[8], knowledgePointIds[18], knowledgePointIds[19]], // 13 checking remainder and units
    [knowledgePointIds[18]], // 14 mass conversion
    [knowledgePointIds[15]], // 15 symmetry axis
    [knowledgePointIds[23]], // 16 integrated solution process
  ],
  high: [
    [knowledgePointIds[7], knowledgePointIds[8], knowledgePointIds[9]], // 01 remainder in context
    [knowledgePointIds[4]], // 02 multiplication facts
    [knowledgePointIds[11]], // 03 addition within 10,000
    [knowledgePointIds[0], knowledgePointIds[7], knowledgePointIds[18]], // 04 review checks
    [knowledgePointIds[4], knowledgePointIds[10]], // 05 repeated groups and addition
    [knowledgePointIds[8], knowledgePointIds[18], knowledgePointIds[23]], // 06 review habits
    [knowledgePointIds[22]], // 07 compare survey counts
    [knowledgePointIds[23]], // 08 solution process
    [knowledgePointIds[4], knowledgePointIds[5], knowledgePointIds[6]], // 09 multiply then share
    [knowledgePointIds[18]], // 10 mass conversion
    [knowledgePointIds[7], knowledgePointIds[8], knowledgePointIds[9]], // 11 transport and remainder
    [knowledgePointIds[9], knowledgePointIds[12], knowledgePointIds[18]], // 12 review check methods
    [knowledgePointIds[18], knowledgePointIds[22], knowledgePointIds[23]], // 13 integrated answer completeness
    [knowledgePointIds[12]], // 14 mixed operation order
    [knowledgePointIds[22], knowledgePointIds[10]], // 15 table comparison and subtraction
    [knowledgePointIds[23]], // 16 integrated review process
  ],
};

function answerSummary(activity: ActivityDefinition): string {
  switch (activity.kind) {
    case 'choice':
      return activity.options.find(({ id }) => id === activity.correctOptionId)?.label ?? '';
    case 'match':
      return activity.pairs.map(({ left, right }) => `${left}→${right}`).join('；');
    case 'order': {
      const labelsById = new Map(activity.items.map(({ id, label }) => [id, label]));
      return activity.correctOrder.map((id) => labelsById.get(id) ?? '').join(' → ');
    }
    case 'categorize': {
      const labelsByCategoryId = new Map(activity.categories.map(({ id, label }) => [id, label]));
      return activity.items.map(({ label, categoryId }) => `${label}→${labelsByCategoryId.get(categoryId) ?? ''}`).join('；');
    }
    case 'arithmetic':
      return String(activity.correctAnswer);
    case 'measurement':
      return String(activity.targetLengthCm);
  }
}

function readTsv(path: string): Array<Record<string, string>> {
  const lines: string[] = readFileSync(path, 'utf8').trim().split(/\r?\n/u);
  const [headerLine = '', ...dataLines] = lines;
  const headers: string[] = headerLine.replace(/^\uFEFF/u, '').split('\t');
  return dataLines.map((line: string) => {
    const values = line.split('\t');
    return Object.fromEntries(headers.map((header: string, index: number) => [header, values[index] ?? '']));
  });
}

describe('二年级下册数学第十单元闯关', () => {
  it('总复习用两袋合计换算替代第八单元的直接换算原题', async () => {
    const reviewUnit = await loadUnit(unitId);
    const massUnit = await loadUnit('grade-2/term-2/math/unit-08');
    const reviewQuestion = reviewUnit!.difficultyTracks.advanced.tasks[1].sessions[0].activities[5];
    const originalQuestion = massUnit!.difficultyTracks.basic.tasks[0].sessions[0].activities[5];

    expect(reviewQuestion.id).toBe(`${unitId}/advanced/task-02/session-01/question-06`);
    expect(reviewQuestion.prompt).toBe('一袋面粉重2千克，一袋大米重1千克，合起来多少克？');
    expect(answerSummary(reviewQuestion)).toBe('3000');
    expect(reviewQuestion.explanation).toContain('3,000克');
    expect(reviewQuestion.prompt).not.toBe(originalQuestion.prompt);
    expect(answerSummary(originalQuestion)).toBe('2000');
  });

  it('总复习改用情境应用呈现乘法口诀，避免照搬上册原题', () => {
    const activity = grade2Term2MathUnit10SupplementalActivities.find(
      ({ activity: candidate }) => candidate.id === 'challenge-supplement-grade-2-term-2-math-unit-10-basic-01',
    )!.activity;
    expect(activity.prompt).toBe('6盒彩笔每盒8支，一共有多少支？');
    expect(answerSummary(activity)).toBe('48');
    expect(activity.explanation).toContain('48支');
  });

  it('审计原课程活动并按每档14道原创题补足30道候选', async () => {
    const unit = await loadUnit(unitId);
    expect(unit?.sourceTopics).toEqual(sourceTopics);
    expect(Object.values(unit!.difficultyTracks).flatMap((track) => track.tasks)).toHaveLength(6);
    expect(Object.values(unit!.difficultyTracks).flatMap((track) => track.tasks
      .flatMap((task) => task.sessions.flatMap((session) => session.activities)))).toHaveLength(48);
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const source = unit!.difficultyTracks[difficulty].tasks
        .flatMap((task) => task.sessions.flatMap((session) => session.activities));
      const supplemental = grade2Term2MathUnit10SupplementalActivities.filter((item) => item.difficulty === difficulty);
      expect(source).toHaveLength(16);
      expect(supplemental).toHaveLength(14);
      expect(source.length + supplemental.length).toBe(30);
    }
  });

  it('逐题核对42道原创题答案、知识点、范围及年龄适配', () => {
    expect(grade2Term2MathUnit10SupplementalActivities).toHaveLength(42);
    expect(new Set(grade2Term2MathUnit10SupplementalActivities.map(({ activity }) => activity.id)).size).toBe(42);
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const authored = grade2Term2MathUnit10SupplementalActivities.filter((item) => item.difficulty === difficulty);
      expect(authored.map(({ activity }) => answerSummary(activity))).toEqual(expectedSupplementAnswers[difficulty]);
      expect(new Set(authored.map(({ activity }) => activity.prompt)).size).toBe(14);
      authored.forEach(({ activity, sourceUnitId, knowledgePointIds: mappedIds }, index) => {
        expect(sourceUnitId).toBe(unitId);
        expect(mappedIds, activity.id).toEqual(expectedSupplementKnowledgePoints[difficulty][index]);
        expect(mappedIds.every((id) => knowledgePointIds.includes(id as (typeof knowledgePointIds)[number]))).toBe(true);
        expect(activity.kind, activity.id).toBe('choice');
        expect(activity.options).toHaveLength(3);
        expect(new Set(activity.options.map(({ label }) => label)).size).toBe(3);
        expect(activity.prompt.length, activity.id).toBeLessThan(100);
        expect(activity.hint.trim()).not.toBe('');
        expect(activity.explanation.trim()).not.toBe('');
        expect(activity.hint, activity.id).not.toContain(answerSummary(activity));
        expect(`${activity.prompt} ${activity.hint} ${activity.explanation}`, activity.id).not.toMatch(/小数点|分数|万位|平方|面积|长方体/u);
      });
      expect(authored.every(({ knowledgePointIds: ids }) => ids.length > 0)).toBe(true);
    }
  });

  it('为48道源题和42道原创题提供逐题映射、清单指纹及中文审校台账', async () => {
    const manifestPath = resolve(process.cwd(), 'src/challenges/content/pilot-manifest-grade2-term2-math-unit10.json');
    const ledgerPath = resolve(process.cwd(), `docs/challenges/${groupId}-question-review.tsv`);
    expect(existsSync(manifestPath)).toBe(true);
    expect(existsSync(ledgerPath)).toBe(true);
    if (!existsSync(manifestPath) || !existsSync(ledgerPath)) return;

    const manifest = JSON.parse(readFileSync(manifestPath, 'utf8')) as {
      version: string;
      questions: Array<{
        questionId: string;
        activityId: string;
        difficulty: Difficulty;
        knowledgePointIds: string[];
        lifecycle: string;
        approved: boolean;
        answerLeakageReviewed: boolean;
        approvedContentFingerprint: string;
        approvedBy: string;
        approvedAt: string;
      }>;
      groups: Array<{
        releaseIntent: string;
        definition: {
          id: string;
          kind: string;
          grade: number;
          semester: number;
          subject: string;
          sourceUnitIds: string[];
          learningTaskUnitIds: string[];
          coreKnowledgePointIds: string[];
          mappingEvidence: { source: string; checkedAt: string; notes: string };
          tasks: Array<{ id: string; difficulty: Difficulty; targetCount: number; requiredKnowledgePointIds: string[] }>;
        };
        questionIds: string[];
      }>;
    };
    const unit = await loadUnit(unitId);
    const sourceActivities: ActivityDefinition[] = [];
    const sourceKnowledgePoints = new Map<string, string[]>();
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const activities = unit!.difficultyTracks[difficulty].tasks
        .flatMap((task) => task.sessions.flatMap((session) => session.activities));
      expect(activities).toHaveLength(expectedSourceKnowledgePoints[difficulty].length);
      activities.forEach((activity, index) => sourceKnowledgePoints.set(activity.id, [...expectedSourceKnowledgePoints[difficulty][index]]));
      sourceActivities.push(...activities);
    }
    const supplements = grade2Term2MathUnit10SupplementalActivities.map(({ activity }) => activity);
    const activities = [...sourceActivities, ...supplements];
    const expectedIds = new Set(activities.map(({ id }) => `challenge-question:${id}`));
    const rows = readTsv(ledgerPath);
    expect(manifest.version).toMatch(/^pilot-\d{4}-\d{2}-\d{2}\.\d+$/u);
    expect(manifest.questions).toHaveLength(90);
    expect(manifest.groups).toHaveLength(1);
    const group = manifest.groups[0];
    expect(group.releaseIntent).toBe('released');
    expect(group.definition).toMatchObject({
      id: groupId,
      kind: 'unit',
      grade: 2,
      semester: 2,
      subject: 'math',
      sourceUnitIds: [unitId],
      learningTaskUnitIds: [
        'grade-2/term-2/math/unit-05',
        'grade-2/term-2/math/unit-07',
        unitId,
      ],
      coreKnowledgePointIds: challengeCoreKnowledgePointIds,
    });
    expect(group.definition.mappingEvidence.source).toContain('grade-2-textbook-inventory.md');
    expect(group.definition.mappingEvidence.notes).toContain('ISBN 978-7-107-37176-9');
    expect(group.definition.mappingEvidence.notes).toContain('ISBN 978-7-107-37176-9');
    expect(group.definition.mappingEvidence.notes).toContain('版次、印次未知');
    expect(group.definition.mappingEvidence.notes).toContain('AI 主审');
    expect(group.definition.mappingEvidence.notes).toContain('独立教育者复核未完成');
    expect(group.definition.tasks).toHaveLength(5);
    expect(group.definition.tasks.map(({ id }) => id).sort()).toEqual([
      `${groupId}/advanced-01`, `${groupId}/advanced-02`, `${groupId}/basic-01`,
      `${groupId}/basic-02`, `${groupId}/high-01`,
    ]);
    expect(group.definition.tasks.every(({ targetCount }) => targetCount === 15)).toBe(true);
    expect(Object.fromEntries(group.definition.tasks.map(({ id, requiredKnowledgePointIds }) => [id.split('/').at(-1), requiredKnowledgePointIds]))).toEqual({
      'basic-01': ['mass-unit-conversion', 'translation-direction-and-orientation'],
      'basic-02': ['organizing-survey-data', 'reading-and-reasoning-with-statistical-tables'],
      'advanced-01': ['mass-unit-conversion', 'translation-direction-and-orientation'],
      'advanced-02': ['organizing-survey-data', 'reading-and-reasoning-with-statistical-tables'],
      'high-01': ['mass-unit-conversion', 'translation-direction-and-orientation'],
    });
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const planned = group.definition.tasks.filter((task) => task.difficulty === difficulty)
        .flatMap(({ requiredKnowledgePointIds: ids }) => ids);
      const available = new Set(activities.flatMap((activity) => {
        const supplement = grade2Term2MathUnit10SupplementalActivities.find(({ activity: candidate }) => candidate.id === activity.id);
        const sourceDifficulty = (['basic', 'advanced', 'high'] as const).find((candidate) => activity.id.includes(`/${candidate}/`));
        if (supplement?.difficulty !== difficulty && sourceDifficulty !== difficulty) return [];
        return supplement?.knowledgePointIds ?? sourceKnowledgePoints.get(activity.id) ?? [];
      }));
      expect(planned.every((id) => available.has(id))).toBe(true);
    }
    expect(new Set(group.questionIds)).toEqual(expectedIds);
    expect(new Set(manifest.questions.map(({ questionId }) => questionId))).toEqual(expectedIds);
    expect(new Set(manifest.questions.map(({ approvedContentFingerprint }) => approvedContentFingerprint))).toHaveLength(90);
    expect(rows).toHaveLength(90);
    expect(new Set(rows.map(({ 题目ID }) => 题目ID))).toEqual(expectedIds);
    expect(rows.every(({ 审核状态 }) => (
      (审核状态.includes('AI 主审已复核') || 审核状态.includes('AI 主审已复核'))
      && (审核状态.includes('未独立教育者复核') || 审核状态.includes('独立教育者复核数 0'))
    ))).toBe(true);

    const activityByQuestionId = new Map(activities.map((activity) => [`challenge-question:${activity.id}`, activity]));
    const ledgerById = new Map(rows.map((row) => [row['题目ID'], row]));
    const supplementByActivityId = new Map(grade2Term2MathUnit10SupplementalActivities.map((item) => [item.activity.id, item]));
    for (const question of manifest.questions) {
      const activity = activityByQuestionId.get(question.questionId);
      expect(activity, question.questionId).toBeDefined();
      const supplemental = supplementByActivityId.get(activity!.id);
      const sourceDifficulty = (['basic', 'advanced', 'high'] as const).find((difficulty) => activity!.id.includes(`/${difficulty}/`));
      expect(question.activityId).toBe(activity!.id);
      expect(question.difficulty).toBe(supplemental?.difficulty ?? sourceDifficulty);
      expect(question.knowledgePointIds, question.questionId).toEqual(supplemental?.knowledgePointIds ?? sourceKnowledgePoints.get(activity!.id));
      expect(question.knowledgePointIds.length).toBeGreaterThan(0);
      expect(question.knowledgePointIds.every((id) => knowledgePointIds.includes(id as (typeof knowledgePointIds)[number]))).toBe(true);
      expect(question.lifecycle).toBe('active');
      expect(question.approved).toBe(true);
      expect(question.answerLeakageReviewed).toBe(true);
      const aiReviewedIds = new Set([
        `${unitId}/advanced/task-02/session-01/question-06`,
        'challenge-supplement-grade-2-term-2-math-unit-10-basic-01',
      ]);
      expect(question.approvedBy).toBe('AI 主审（非独立教师复核）');
      expect(question.approvedAt).toMatch(/^2026-10-28T/u);
      expect(question.approvedContentFingerprint).toBe(await fingerprintActivity(activity!));

      const row = ledgerById.get(question.questionId)!;
      expect(row['难度']).toBe(question.difficulty === 'basic' ? '基础' : question.difficulty === 'advanced' ? '进阶' : '高阶');
      expect(row['正确选项']).toBe(answerSummary(activity!));
      expect(row['知识点']).toBe(question.knowledgePointIds.join('；'));
      expect(row['复核说明']).toContain('ISBN 978-7-107-37176-9');
      expect(row['检查项']).toContain('二年级');
      if (aiReviewedIds.has(question.activityId)) {
        expect(row['审核状态']).toContain('AI 主审已复核');
        expect(row['审核状态']).toContain('独立教育者复核数 0');
      } else {
        expect(row['审核状态']).toContain('AI 主审已复核');
        expect(row['审核状态']).toContain('独立教育者复核数 0');
      }
      expect(row['内容指纹']).toBe(question.approvedContentFingerprint);
    }
  });
});
