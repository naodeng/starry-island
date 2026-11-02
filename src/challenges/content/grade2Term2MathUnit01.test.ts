import { describe, expect, it } from 'vitest';
// @ts-expect-error Node.js is used only to inspect the local review ledger during Vitest.
import { existsSync, readFileSync } from 'node:fs';
// @ts-expect-error Node.js is used only to resolve the local review ledger during Vitest.
import { resolve } from 'node:path';
import type { ActivityDefinition, Difficulty } from '../../content/types';
import { loadUnit } from '../../content/unitLoader';
import { fingerprintActivity } from './fingerprint';
import { grade2Term2MathUnit01SupplementalActivities } from './grade2Term2MathUnit01SupplementalActivities';

declare const process: { cwd(): string };

const unitId = 'grade-2/term-2/math/unit-01';
const groupId = 'grade-2-term-2-math-unit-01';
const sourceTopics = [
  '调查、记录并整理数据',
  '读统计表并根据数据回答问题',
];
const knowledgePointIds = [
  'survey-design-and-data-collection',
  'organizing-survey-data',
  'reading-and-reasoning-with-statistical-tables',
] as const;

const expectedSupplementAnswers: Record<Difficulty, readonly string[]> = {
  basic: [
    '把每次选择逐个记下来，便于数总数',
    '每人选择一次，并按相同规则登记',
    '17本',
    '第3项',
    '两项并列最多',
    '回看原始记录后再补填',
    '二年级三班的同学',
    '哪种活动得到的票数最多',
    '先把同类记录放在一起，再逐类计数',
    '4本',
    '每人只选一种最喜欢的书',
    '3张',
    '2种',
    '先说明调查对象和规则，再记录各项人数',
  ],
  advanced: [
    '每位同学只选一项，记录每项人数并核对总数',
    '只能说明这次参加调查的同学的选择',
    '10张',
    '17人',
    '是否有参加者的选择没有记进表里',
    '回到原始记录查清后再填',
    '补记星期三，再核对整周记录天数',
    '调查类别、每类人数和调查对象',
    '8票',
    '乙组还差2票才与甲组相同',
    '逐张对照原始记录，删除重复计入的那一张',
    '结论只写本次参加调查的同学中哪项最多',
    '先按选择分类，再数每类记录并填写统计表',
    '逐项核对原始记录和统计表的合计',
  ],
  high: [
    '先定调查问题与规则，再记录、整理并核对总数',
    '故事书和科普书并列最多，合计20票',
    '先核对原始卡片中每类记录，再补表并重算合计',
    '只能说这次被调查的同学中，蓝色票数最多',
    '先找出对应数据，再检查结论有没有超出调查范围',
    '按班级分开记录各项运动的人数',
    '每人只能投一票时，先查重复记录或人数登记',
    '先明确想知道的内容，再设选项并统一记录方法',
    '13票',
    '应如实报告两项并列，不能只保留其中一项',
    '两种合计相同，各12票',
    '说明调查对象、时间和记录方式，再报告数据结论',
    '先找出总数差异，再逐类核对原始记录',
    '记录每项数据及票数，并写明这次调查的范围',
  ],
};

const expectedSupplementKnowledgePoints: Record<Difficulty, readonly (readonly string[])[]> = {
  basic: [
    [knowledgePointIds[1]], [knowledgePointIds[0]], [knowledgePointIds[2]], [knowledgePointIds[2]],
    [knowledgePointIds[2]], [knowledgePointIds[1]], [knowledgePointIds[0]], [knowledgePointIds[2]],
    [knowledgePointIds[1]], [knowledgePointIds[2]], [knowledgePointIds[0]], [knowledgePointIds[1]],
    [knowledgePointIds[2]], [knowledgePointIds[0], knowledgePointIds[1]],
  ],
  advanced: [
    [knowledgePointIds[0], knowledgePointIds[1]], [knowledgePointIds[2]], [knowledgePointIds[1], knowledgePointIds[2]],
    [knowledgePointIds[2]], [knowledgePointIds[0], knowledgePointIds[1]], [knowledgePointIds[1]],
    [knowledgePointIds[1], knowledgePointIds[2]], [knowledgePointIds[0], knowledgePointIds[1]],
    [knowledgePointIds[2]], [knowledgePointIds[2]], [knowledgePointIds[1]], [knowledgePointIds[2]],
    [knowledgePointIds[1], knowledgePointIds[2]], [knowledgePointIds[1], knowledgePointIds[2]],
  ],
  high: [
    [knowledgePointIds[0], knowledgePointIds[1]], [knowledgePointIds[2]], [knowledgePointIds[1], knowledgePointIds[2]],
    [knowledgePointIds[2]], [knowledgePointIds[2]], [knowledgePointIds[0], knowledgePointIds[1]],
    [knowledgePointIds[0], knowledgePointIds[1]], [knowledgePointIds[0], knowledgePointIds[1]],
    [knowledgePointIds[2]], [knowledgePointIds[2]], [knowledgePointIds[2]], [knowledgePointIds[0], knowledgePointIds[2]],
    [knowledgePointIds[1], knowledgePointIds[2]], [knowledgePointIds[0], knowledgePointIds[1]],
  ],
};

const expectedSourceKnowledgePoints: Record<Difficulty, readonly (readonly string[])[]> = {
  basic: [
    [knowledgePointIds[2]], [knowledgePointIds[1]], [knowledgePointIds[0], knowledgePointIds[1]], [knowledgePointIds[0]],
    [knowledgePointIds[2]], [knowledgePointIds[2]], [knowledgePointIds[0], knowledgePointIds[1]], [knowledgePointIds[2]],
    [knowledgePointIds[2]], [knowledgePointIds[1]], [knowledgePointIds[2]], [knowledgePointIds[2]],
    [knowledgePointIds[2]], [knowledgePointIds[2]], [knowledgePointIds[1]], [knowledgePointIds[2]],
  ],
  advanced: [
    [knowledgePointIds[2]], [knowledgePointIds[2]], [knowledgePointIds[0], knowledgePointIds[1]], [knowledgePointIds[0]],
    [knowledgePointIds[0]], [knowledgePointIds[2]], [knowledgePointIds[0], knowledgePointIds[1]], [knowledgePointIds[0], knowledgePointIds[1]],
    [knowledgePointIds[2]], [knowledgePointIds[2]], [knowledgePointIds[1], knowledgePointIds[2]], [knowledgePointIds[1]],
    [knowledgePointIds[2]], [knowledgePointIds[0]], [knowledgePointIds[0], knowledgePointIds[1]], [knowledgePointIds[2]],
  ],
  high: [
    [knowledgePointIds[2]], [knowledgePointIds[2]], [knowledgePointIds[2]], [knowledgePointIds[2]],
    [knowledgePointIds[2]], [knowledgePointIds[2]], [knowledgePointIds[2]], [knowledgePointIds[2]],
    [knowledgePointIds[2]], [knowledgePointIds[2]], [knowledgePointIds[0], knowledgePointIds[1]], [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[2]],
    [knowledgePointIds[2]], [knowledgePointIds[1]], [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[2]], [knowledgePointIds[1], knowledgePointIds[2]],
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
  const headers = headerLine.replace(/^\uFEFF/u, '').split('\t');
  return dataLines.map((line) => {
    const values = line.split('\t');
    return Object.fromEntries(headers.map((header, index) => [header, values[index] ?? '']));
  });
}

describe('二年级下册数学第一单元闯关题目草案', () => {
  it('核实源题量并按每档 14 道原创题补齐 30 道唯一候选', async () => {
    const unit = await loadUnit(unitId);
    const sourceByDifficulty = Object.fromEntries(
      (['basic', 'advanced', 'high'] as const).map((difficulty) => [
        difficulty,
        Object.values(unit!.difficultyTracks[difficulty].tasks)
          .flatMap((task) => task.sessions.flatMap((session) => session.activities)),
      ]),
    ) as Record<Difficulty, ActivityDefinition[]>;

    expect(unit?.sourceTopics).toEqual(sourceTopics);
    expect(Object.values(unit!.difficultyTracks).flatMap((track) => track.tasks)).toHaveLength(6);
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      expect(sourceByDifficulty[difficulty]).toHaveLength(16);
      expect(grade2Term2MathUnit01SupplementalActivities.filter((item) => item.difficulty === difficulty)).toHaveLength(14);
      expect(sourceByDifficulty[difficulty].length + grade2Term2MathUnit01SupplementalActivities.filter((item) => item.difficulty === difficulty).length).toBe(30);
    }
  });

  it('逐题核对 42 道原创题答案、知识点、唯一选项和答案泄漏', () => {
    expect(grade2Term2MathUnit01SupplementalActivities).toHaveLength(42);
    expect(new Set(grade2Term2MathUnit01SupplementalActivities.map(({ activity }) => activity.id)).size).toBe(42);
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const authored = grade2Term2MathUnit01SupplementalActivities.filter((item) => item.difficulty === difficulty);
      expect(authored.map(({ activity }) => answerSummary(activity))).toEqual(expectedSupplementAnswers[difficulty]);
      authored.forEach(({ activity, sourceUnitId, knowledgePointIds: mappedIds }, index) => {
        expect(sourceUnitId).toBe(unitId);
        expect(mappedIds, activity.id).toEqual(expectedSupplementKnowledgePoints[difficulty][index]);
        expect(mappedIds.every((id) => knowledgePointIds.includes(id as (typeof knowledgePointIds)[number]))).toBe(true);
        expect(activity.options).toHaveLength(3);
        expect(new Set(activity.options.map(({ label }) => label)).size).toBe(3);
        expect(activity.hint.trim()).not.toBe('');
        expect(activity.explanation.trim()).not.toBe('');
        const answer = answerSummary(activity);
        const visiblePromptAndHint = `${activity.prompt} ${activity.hint}`;
        if (/^\d/u.test(answer)) {
          const escapedAnswer = answer.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&');
          expect(new RegExp(`(?<!\\d)${escapedAnswer}(?!\\d)`, 'u').test(visiblePromptAndHint), activity.id).toBe(false);
        } else {
          expect(visiblePromptAndHint, activity.id).not.toContain(answer);
        }
      });
    }
  });

  it('为全部 48 道源题与 42 道原创题提供完整 manifest 指纹和逐题审校台账', async () => {
    const manifestPath = resolve(process.cwd(), 'src/challenges/content/pilot-manifest-grade2-term2-math-unit01.json');
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
    };
    const unit = await loadUnit(unitId);
    const sourceActivities = Object.values(unit!.difficultyTracks).flatMap((track) => track.tasks)
      .flatMap((task) => task.sessions.flatMap((session) => session.activities));
    const allActivities = [...sourceActivities, ...grade2Term2MathUnit01SupplementalActivities.map(({ activity }) => activity)];
    const sourceKnowledgePoints = new Map<string, string[]>();
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const activities = unit!.difficultyTracks[difficulty].tasks
        .flatMap((task) => task.sessions.flatMap((session) => session.activities));
      expect(activities).toHaveLength(expectedSourceKnowledgePoints[difficulty].length);
      activities.forEach((activity, index) => sourceKnowledgePoints.set(activity.id, [...expectedSourceKnowledgePoints[difficulty][index]]));
    }
    const rows = readTsv(ledgerPath);
    const expectedIds = new Set(allActivities.map(({ id }) => `challenge-question:${id}`));
    expect(manifest.version).toMatch(/^pilot-\d{4}-\d{2}-\d{2}\.\d+$/u);
    expect(manifest.questions).toHaveLength(90);
    expect(new Set(manifest.questions.map(({ questionId }) => questionId))).toEqual(expectedIds);
    expect(new Set(manifest.questions.map(({ approvedContentFingerprint }) => approvedContentFingerprint))).toHaveLength(90);
    expect(rows).toHaveLength(90);
    expect(new Set(rows.map(({ 题目ID }) => 题目ID))).toEqual(expectedIds);
    expect(rows.every(({ 审核状态 }) => 审核状态.includes('AI 主审已复核') && 审核状态.includes('独立教育者复核数 0'))).toBe(true);

    const activityByQuestionId = new Map(allActivities.map((activity) => [`challenge-question:${activity.id}`, activity]));
    const ledgerById = new Map(rows.map((row) => [row['题目ID'], row]));
    const supplementByActivityId = new Map(grade2Term2MathUnit01SupplementalActivities.map((item) => [item.activity.id, item]));
    for (const question of manifest.questions) {
      const activity = activityByQuestionId.get(question.questionId);
      expect(activity, question.questionId).toBeDefined();
      expect(question.activityId).toBe(activity!.id);
      const supplemental = supplementByActivityId.get(activity!.id);
      const sourceDifficulty = (['basic', 'advanced', 'high'] as const).find((difficulty) => activity!.id.includes(`/${difficulty}/`));
      expect(question.difficulty).toBe(supplemental?.difficulty ?? sourceDifficulty);
      expect(question.knowledgePointIds.length).toBeGreaterThan(0);
      expect(question.knowledgePointIds.every((id) => knowledgePointIds.includes(id as (typeof knowledgePointIds)[number]))).toBe(true);
      expect(question.knowledgePointIds).toEqual(supplemental?.knowledgePointIds ?? sourceKnowledgePoints.get(activity!.id));
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
      expect(row['检查项']).toContain('唯一答案');
      if (activity!.kind === 'arithmetic') expect(row['检查项']).toContain('含算式题独立复算');
      expect(row['内容指纹']).toBe(question.approvedContentFingerprint);
    }
  });

  it('按任务顺序为 48 道课程源题记录确定的知识点映射计划', async () => {
    const unit = await loadUnit(unitId);
    const sourceActivities = Object.values(unit!.difficultyTracks).flatMap((track) => track.tasks)
      .flatMap((task) => task.sessions.flatMap((session) => session.activities));
    expect(sourceActivities).toHaveLength(48);
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const activities = sourceActivities.filter((activity) => activity.id.includes(`/${difficulty}/`));
      const planned = expectedSourceKnowledgePoints[difficulty].flat();
      expect(activities).toHaveLength(16);
      expect(planned.length).toBeGreaterThanOrEqual(16);
      expect(planned.every((id) => knowledgePointIds.includes(id as (typeof knowledgePointIds)[number]))).toBe(true);
    }
  });
});
