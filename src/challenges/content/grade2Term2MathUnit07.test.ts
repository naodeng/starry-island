import { describe, expect, it } from 'vitest';
// @ts-expect-error Node.js is used only to inspect this unit's review ledger during Vitest.
import { existsSync, readFileSync } from 'node:fs';
// @ts-expect-error Node.js is used only to resolve this unit's review ledger during Vitest.
import { resolve } from 'node:path';
import type { ActivityDefinition, Difficulty } from '../../content/types';
import { loadUnit } from '../../content/unitLoader';
import { fingerprintActivity } from './fingerprint';
import { grade2Term2MathUnit07SupplementalActivities } from './grade2Term2MathUnit07SupplementalActivities';

declare const process: { cwd(): string };

const unitId = 'grade-2/term-2/math/unit-07';
const groupId = 'grade-2-term-2-math-unit-07';
const sourceTopics = ['认识万以内数的组成与数位', '读写万以内的数并比较大小'];
const knowledgePointIds = [
  'number-composition-and-place-value',
  'zero-as-placeholder',
  'reading-and-writing-within-10000',
  'comparing-and-ordering-within-10000',
] as const;

const expectedSupplementAnswers: Record<Difficulty, readonly string[]> = {
  basic: [
    '700', '2,536', '一个表示400，另一个表示4', '5,000+90', '五千零六十', '4,009', '6,420',
    '4,082 < 4,820 < 4,902', '八千零六十', '7,020', '三千五百零六', '3,804', '5,790', '5,008',
  ],
  advanced: [
    '8,465', '4,308', '7,520', '1,035', '5,608', '5,690', '9,000+2', '6,906',
    '七千零六十四', '8,090', '6在十位，表示60；3,600中的6在百位表示600', '四千零七十',
    '7,072 < 7,207 < 7,270', '5,380更大，两个数千位和百位相同，十位8大于0',
  ],
  high: [
    '2,860', '3,648', '8,064', '6,180', '3,057', '百位是0，读数时要读出“零”',
    '千位的7表示7,000，百位的7表示700', '4,086 < 4,608 < 4,680', '8,204', '4,019',
    '6,000+300+4', '7,528', '8,099', '七千零五十六',
  ],
};

const expectedSupplementKnowledgePoints: Record<Difficulty, readonly (readonly string[])[]> = {
  basic: [
    [knowledgePointIds[0]], [knowledgePointIds[0]], [knowledgePointIds[0]],
    [knowledgePointIds[0], knowledgePointIds[1]], [knowledgePointIds[2], knowledgePointIds[1]],
    [knowledgePointIds[2], knowledgePointIds[1]], [knowledgePointIds[3]], [knowledgePointIds[3]],
    [knowledgePointIds[2], knowledgePointIds[1]], [knowledgePointIds[2], knowledgePointIds[1]],
    [knowledgePointIds[2], knowledgePointIds[1]], [knowledgePointIds[0], knowledgePointIds[1]],
    [knowledgePointIds[3]], [knowledgePointIds[0], knowledgePointIds[1]],
  ],
  advanced: [
    [knowledgePointIds[0]], [knowledgePointIds[3]], [knowledgePointIds[0]], [knowledgePointIds[0]],
    [knowledgePointIds[0], knowledgePointIds[3]], [knowledgePointIds[3]],
    [knowledgePointIds[0], knowledgePointIds[1]], [knowledgePointIds[0], knowledgePointIds[1]],
    [knowledgePointIds[2], knowledgePointIds[1]], [knowledgePointIds[3], knowledgePointIds[1]],
    [knowledgePointIds[0], knowledgePointIds[1]], [knowledgePointIds[2], knowledgePointIds[1]],
    [knowledgePointIds[3]], [knowledgePointIds[3]],
  ],
  high: [
    [knowledgePointIds[0], knowledgePointIds[3]], [knowledgePointIds[0], knowledgePointIds[3]],
    [knowledgePointIds[0], knowledgePointIds[1]], [knowledgePointIds[3]],
    [knowledgePointIds[0], knowledgePointIds[3]], [knowledgePointIds[2], knowledgePointIds[1]],
    [knowledgePointIds[0]], [knowledgePointIds[3]], [knowledgePointIds[0], knowledgePointIds[3]],
    [knowledgePointIds[0], knowledgePointIds[3]], [knowledgePointIds[0], knowledgePointIds[1]],
    [knowledgePointIds[0], knowledgePointIds[3]], [knowledgePointIds[3], knowledgePointIds[1]],
    [knowledgePointIds[2], knowledgePointIds[1]],
  ],
};

const expectedSourceKnowledgePoints: Record<Difficulty, readonly (readonly string[])[]> = {
  basic: [
    [knowledgePointIds[0]], // 01 数位名称
    [knowledgePointIds[0]], // 02 数的组成
    [knowledgePointIds[0], knowledgePointIds[1]], // 03 组成与0占位
    [knowledgePointIds[0]], // 04 数位上的计数单位
    [knowledgePointIds[0]], // 05 相同数位合并
    [knowledgePointIds[0], knowledgePointIds[1]], // 06 个位判断
    [knowledgePointIds[1]], // 07 0占位
    [knowledgePointIds[0]], // 08 数位顺序
    [knowledgePointIds[2], knowledgePointIds[1]], // 09 读数写数及0占位
    [knowledgePointIds[2], knowledgePointIds[1]], // 10 读数及0占位
    [knowledgePointIds[0], knowledgePointIds[1]], // 11 数的组成与0占位
    [knowledgePointIds[2], knowledgePointIds[1]], // 12 读数配数字
    [knowledgePointIds[0]], // 13 相同数位上的减法
    [knowledgePointIds[2], knowledgePointIds[1]], // 14 读数写数及0占位
    [knowledgePointIds[1], knowledgePointIds[2]], // 15 读写数中的0占位
    [knowledgePointIds[0], knowledgePointIds[2], knowledgePointIds[1]], // 16 数的读写步骤
  ],
  advanced: [
    [knowledgePointIds[0], knowledgePointIds[1]], // 01 数位组成与0占位
    [knowledgePointIds[3]], // 02 比较大小
    [knowledgePointIds[0]], // 03 数位名称
    [knowledgePointIds[3]], // 04 比较方法
    [knowledgePointIds[0], knowledgePointIds[3]], // 05 组数与最大数比较
    [knowledgePointIds[3]], // 06 比较大小
    [knowledgePointIds[3]], // 07 比较判断
    [knowledgePointIds[3]], // 08 比较步骤
    [knowledgePointIds[0], knowledgePointIds[1]], // 09 数位组成与0占位
    [knowledgePointIds[2], knowledgePointIds[1]], // 10 读数及0占位
    [knowledgePointIds[0], knowledgePointIds[1]], // 11 数位意义与0占位
    [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[2]], // 12 数位、读写与占位
    [knowledgePointIds[3]], // 13 比较大小
    [knowledgePointIds[0], knowledgePointIds[1]], // 14 数的组成与0占位
    [knowledgePointIds[3]], // 15 比较大小
    [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[2]], // 16 数位、读写与占位
  ],
  high: [
    [knowledgePointIds[0], knowledgePointIds[1]], // 01 数位组成与0占位
    [knowledgePointIds[3]], // 02 比较大小
    [knowledgePointIds[0], knowledgePointIds[3]], // 03 数的范围与邻近整百
    [knowledgePointIds[3]], // 04 比较大小
    [knowledgePointIds[0], knowledgePointIds[3]], // 05 数字卡片组数并比较
    [knowledgePointIds[3]], // 06 比较大小
    [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[3]], // 07 组成、占位与范围比较
    [knowledgePointIds[0], knowledgePointIds[3]], // 08 组合数位条件
    [knowledgePointIds[2], knowledgePointIds[1]], // 09 读数及0占位
    [knowledgePointIds[3]], // 10 比较大小
    [knowledgePointIds[0], knowledgePointIds[3]], // 11 数位条件与范围
    [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[3]], // 12 数值任务、占位与比较
    [knowledgePointIds[3]], // 13 比较结论
    [knowledgePointIds[0], knowledgePointIds[3]], // 14 数字卡片组数并比较
    [knowledgePointIds[3]], // 15 比较步骤
    [knowledgePointIds[0], knowledgePointIds[3]], // 16 多条件组数
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

describe('二年级下册数学第七单元闯关', () => {
  it('审计原课程活动并按每档14道原创题补足30道候选', async () => {
    const unit = await loadUnit(unitId);
    expect(unit?.sourceTopics).toEqual(sourceTopics);
    expect(Object.values(unit!.difficultyTracks).flatMap((track) => track.tasks)).toHaveLength(6);
    expect(Object.values(unit!.difficultyTracks).flatMap((track) => track.tasks
      .flatMap((task) => task.sessions.flatMap((session) => session.activities)))).toHaveLength(48);
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const source = unit!.difficultyTracks[difficulty].tasks
        .flatMap((task) => task.sessions.flatMap((session) => session.activities));
      const supplemental = grade2Term2MathUnit07SupplementalActivities.filter((item) => item.difficulty === difficulty);
      expect(source).toHaveLength(16);
      expect(supplemental).toHaveLength(14);
      expect(source.length + supplemental.length).toBe(30);
    }
  });

  it('逐题核对42道原创题的答案、知识点、选项与教材范围', () => {
    expect(grade2Term2MathUnit07SupplementalActivities).toHaveLength(42);
    expect(new Set(grade2Term2MathUnit07SupplementalActivities.map(({ activity }) => activity.id)).size).toBe(42);
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const authored = grade2Term2MathUnit07SupplementalActivities.filter((item) => item.difficulty === difficulty);
      expect(authored.map(({ activity }) => answerSummary(activity))).toEqual(expectedSupplementAnswers[difficulty]);
      expect(new Set(authored.map(({ activity }) => activity.prompt)).size).toBe(14);
      authored.forEach(({ activity, sourceUnitId, knowledgePointIds: mappedIds }, index) => {
        expect(sourceUnitId).toBe(unitId);
        expect(mappedIds, activity.id).toEqual(expectedSupplementKnowledgePoints[difficulty][index]);
        expect(mappedIds.every((id) => knowledgePointIds.includes(id as (typeof knowledgePointIds)[number]))).toBe(true);
        expect(activity.kind, activity.id).toBe('choice');
        expect(activity.options).toHaveLength(3);
        expect(new Set(activity.options.map(({ label }) => label)).size).toBe(3);
        expect(activity.prompt.length, activity.id).toBeLessThan(90);
        expect(activity.hint.trim()).not.toBe('');
        expect(activity.explanation.trim()).not.toBe('');
        expect(activity.hint, activity.id).not.toContain(answerSummary(activity));
        expect(`${activity.prompt} ${activity.hint} ${activity.explanation}`, activity.id).not.toMatch(/有余数|余数除法|小数点|分数|万位|几万/u);
      });
      expect(new Set(authored.flatMap(({ knowledgePointIds: ids }) => ids))).toEqual(new Set(knowledgePointIds));
    }
  });

  it('为48道源题和42道原创题提供逐题映射、清单指纹及中文审校台账', async () => {
    const manifestPath = resolve(process.cwd(), 'src/challenges/content/pilot-manifest-grade2-term2-math-unit07.json');
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
    const supplements = grade2Term2MathUnit07SupplementalActivities.map(({ activity }) => activity);
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
      learningTaskUnitIds: [unitId],
      coreKnowledgePointIds: knowledgePointIds,
    });
    expect(group.definition.mappingEvidence.source).toContain('grade-2-textbook-inventory.md');
    expect(group.definition.mappingEvidence.notes).toContain('ISBN 978-7-107-37176-9');
    expect(group.definition.mappingEvidence.notes).toContain('ISBN 978-7-107-37176-9');
    expect(group.definition.mappingEvidence.notes).toContain('版次、印次未知');
    expect(group.definition.mappingEvidence.notes).toContain('AI 主审');
    expect(group.definition.mappingEvidence.notes).toContain('独立教育者复核未完成');
    expect(group.definition.tasks).toHaveLength(5);
    expect(group.definition.tasks.every(({ targetCount }) => targetCount === 15)).toBe(true);
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const planned = group.definition.tasks.filter((task) => task.difficulty === difficulty)
        .flatMap(({ requiredKnowledgePointIds: ids }) => ids);
      expect(new Set(planned)).toEqual(new Set(knowledgePointIds));
      expect(activities.filter((activity) => activity.id.includes(`/${difficulty}/`)
        || supplements.some((supplement) => supplement.id === activity.id
          && grade2Term2MathUnit07SupplementalActivities.find((item) => item.activity.id === supplement.id)?.difficulty === difficulty))).toHaveLength(30);
    }
    expect(new Set(group.questionIds)).toEqual(expectedIds);
    expect(new Set(manifest.questions.map(({ questionId }) => questionId))).toEqual(expectedIds);
    expect(new Set(manifest.questions.map(({ approvedContentFingerprint }) => approvedContentFingerprint))).toHaveLength(90);
    expect(rows).toHaveLength(90);
    expect(new Set(rows.map(({ 题目ID }) => 题目ID))).toEqual(expectedIds);
    expect(rows.every(({ 审核状态 }) => 审核状态.includes('AI 主审已复核') && 审核状态.includes('独立教育者复核数 0'))).toBe(true);

    const activityByQuestionId = new Map(activities.map((activity) => [`challenge-question:${activity.id}`, activity]));
    const ledgerById = new Map(rows.map((row) => [row['题目ID'], row]));
    const supplementByActivityId = new Map(grade2Term2MathUnit07SupplementalActivities.map((item) => [item.activity.id, item]));
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
      expect(question.approvedBy).toBe('AI 主审（非独立教师复核）');
      expect(question.approvedAt).toMatch(/^2026-10-28T/u);
      expect(question.approvedContentFingerprint).toBe(await fingerprintActivity(activity!));

      const row = ledgerById.get(question.questionId)!;
      expect(row['难度']).toBe(question.difficulty === 'basic' ? '基础' : question.difficulty === 'advanced' ? '进阶' : '高阶');
      expect(row['正确选项']).toBe(answerSummary(activity!));
      expect(row['知识点']).toBe(question.knowledgePointIds.join('；'));
      expect(row['复核说明']).toContain('ISBN 978-7-107-37176-9');
      expect(row['检查项']).toContain('万以内');
      expect(row['审核状态']).toContain('AI 主审已复核');
      expect(row['审核状态']).toContain('独立教育者复核数 0');
      expect(row['内容指纹']).toBe(question.approvedContentFingerprint);
    }
  });
});
