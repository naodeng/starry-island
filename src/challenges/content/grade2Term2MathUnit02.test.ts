import { describe, expect, it } from 'vitest';
// @ts-expect-error Node.js is used only to inspect the local review ledger during Vitest.
import { existsSync, readFileSync } from 'node:fs';
// @ts-expect-error Node.js is used only to resolve the local review ledger during Vitest.
import { resolve } from 'node:path';
import type { ActivityDefinition, Difficulty } from '../../content/types';
import { loadUnit } from '../../content/unitLoader';
import { fingerprintActivity } from './fingerprint';
import { grade2Term2MathUnit02SupplementalActivities } from './grade2Term2MathUnit02SupplementalActivities';

declare const process: { cwd(): string };

const unitId = 'grade-2/term-2/math/unit-02';
const groupId = 'grade-2-term-2-math-unit-02';
const sourceTopics = ['平均分的两种含义', '用乘法口诀求商并解决平均分问题'];
const knowledgePointIds = [
  'division-as-equal-sharing-and-grouping',
  'division-facts-from-multiplication',
  'meaning-and-units-of-quotients',
] as const;
const supportedKnowledgePointIds = [...knowledgePointIds, 'length-units'] as const;

const expectedSupplementAnswers: Record<Difficulty, readonly string[]> = {
  basic: [
    '18张卡平均分成3份，每份几张',
    '盒数',
    '24÷6=4',
    '每瓶5朵',
    '袋数',
    '每队棋子的数量',
    '6×4=24',
    '每份有几个',
    '4段',
    '15÷3',
    '参加分配的同学人数',
    '求每份数量和求份数是两种不同问题',
    '6×7=42',
    '每人6颗',
  ],
  advanced: [
    '一题求每份数量，另一题求份数',
    '每组4张和4袋的单位不同',
    '42÷6=7',
    '每台8条',
    '两个商都是7，但一个表示每组数量，一个表示组数',
    '商7表示每队7个，不是队伍数',
    '16个/桌',
    '36÷4',
    '36÷4的商是9，比36÷6的6大',
    '5表示同学人数，4表示每人数量',
    '6×8=48',
    '4篮',
    '4×6=24，再看每份是不是一样多',
    '每架9本',
  ],
  high: [
    '每桌10支',
    '72÷8=9，9×8=72',
    '同一个商可以表示每份数量，也可以表示份数',
    '每队都调整为6个球，合计24个球',
    '商7表示每份数量，6×7=42可验算',
    '第一题的7表示组数，第二题的7表示每份数量',
    '第一题8根/队，第二题8袋',
    '每班10个苹果',
    '每队都分6张，合计24张，方案符合平均分',
    '前题写每人4个，后题写4袋',
    '9×8=72，所以72÷8=9',
    '每份的数量；可以分成的组数',
    '先看题目已知份数还是每份数量，再确定商的单位',
    '写清总数、分组条件、商的单位，并用乘法核对',
  ],
};

const expectedSupplementKnowledgePoints: Record<Difficulty, readonly (readonly string[])[]> = {
  basic: [
    [knowledgePointIds[0], knowledgePointIds[2]], [knowledgePointIds[0], knowledgePointIds[2]],
    [knowledgePointIds[1]], [knowledgePointIds[0], knowledgePointIds[2]], [knowledgePointIds[0], knowledgePointIds[2]],
    [knowledgePointIds[0], knowledgePointIds[2]], [knowledgePointIds[1]], [knowledgePointIds[0], knowledgePointIds[2]],
    [knowledgePointIds[0], knowledgePointIds[2]], [knowledgePointIds[0], knowledgePointIds[2]],
    [knowledgePointIds[0], knowledgePointIds[2]], [knowledgePointIds[0], knowledgePointIds[2]],
    [knowledgePointIds[1]], [knowledgePointIds[0], knowledgePointIds[2]],
  ],
  advanced: [
    [knowledgePointIds[0], knowledgePointIds[2]], [knowledgePointIds[0], knowledgePointIds[2]],
    [knowledgePointIds[1]], [knowledgePointIds[0], knowledgePointIds[1]], [knowledgePointIds[0], knowledgePointIds[2]],
    [knowledgePointIds[0], knowledgePointIds[2]], [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[2]],
    [knowledgePointIds[0], knowledgePointIds[2]], [knowledgePointIds[1], knowledgePointIds[2]],
    [knowledgePointIds[0], knowledgePointIds[2]], [knowledgePointIds[1]], [knowledgePointIds[0], knowledgePointIds[2]],
    [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[2]], [knowledgePointIds[0], knowledgePointIds[2]],
  ],
  high: [
    [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[2]], [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[2]],
    [knowledgePointIds[0], knowledgePointIds[2]], [knowledgePointIds[0], knowledgePointIds[2]],
    [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[2]], [knowledgePointIds[0], knowledgePointIds[2]],
    [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[2]], [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[2]],
    [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[2]], [knowledgePointIds[0], knowledgePointIds[2]],
    [knowledgePointIds[1], knowledgePointIds[2]], [knowledgePointIds[0], knowledgePointIds[2]],
    [knowledgePointIds[0], knowledgePointIds[2]], [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[2]],
  ],
};

const expectedSourceKnowledgePoints: Record<Difficulty, readonly (readonly string[])[]> = {
  basic: [
    [knowledgePointIds[0], knowledgePointIds[2]], [knowledgePointIds[0], knowledgePointIds[2]],
    [knowledgePointIds[0], knowledgePointIds[2]], [knowledgePointIds[0], knowledgePointIds[1]],
    [knowledgePointIds[0]], [knowledgePointIds[0]], [knowledgePointIds[0], knowledgePointIds[2]], [knowledgePointIds[1]],
    [knowledgePointIds[1]], [knowledgePointIds[1]], [knowledgePointIds[0], knowledgePointIds[2]],
    [knowledgePointIds[1]], [knowledgePointIds[1]], [knowledgePointIds[1]], [knowledgePointIds[1]],
    [knowledgePointIds[1], knowledgePointIds[2]],
  ],
  advanced: [
    [knowledgePointIds[0], knowledgePointIds[2]], [knowledgePointIds[0], knowledgePointIds[2]],
    [knowledgePointIds[0], knowledgePointIds[2]], [knowledgePointIds[0], knowledgePointIds[2]],
    [knowledgePointIds[1]], [knowledgePointIds[0], knowledgePointIds[2], 'length-units'],
    [knowledgePointIds[1]], [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[2]],
    [knowledgePointIds[1]], [knowledgePointIds[0], knowledgePointIds[2]],
    [knowledgePointIds[0], knowledgePointIds[2]], [knowledgePointIds[0], knowledgePointIds[2]],
    [knowledgePointIds[1]], [knowledgePointIds[1]], [knowledgePointIds[0], knowledgePointIds[2]],
    [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[2]],
  ],
  high: [
    [knowledgePointIds[0], knowledgePointIds[2]], [knowledgePointIds[0], knowledgePointIds[2]],
    [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[2]], [knowledgePointIds[0], knowledgePointIds[2]],
    [knowledgePointIds[1]], [knowledgePointIds[0], knowledgePointIds[2]], [knowledgePointIds[1]],
    [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[2]],
    [knowledgePointIds[0], knowledgePointIds[2]], [knowledgePointIds[0], knowledgePointIds[2]],
    [knowledgePointIds[1]], [knowledgePointIds[0], knowledgePointIds[2]],
    [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[2]], [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[2]],
    [knowledgePointIds[0], knowledgePointIds[2]], [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[2]],
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

describe('二年级下册数学第二单元闯关题目草案', () => {
  it('核实源题量并按每档14道原创题补齐30道唯一候选', async () => {
    const unit = await loadUnit(unitId);
    expect(unit?.sourceTopics).toEqual(sourceTopics);
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const source = unit!.difficultyTracks[difficulty].tasks
        .flatMap((task) => task.sessions.flatMap((session) => session.activities));
      const supplemental = grade2Term2MathUnit02SupplementalActivities.filter((item) => item.difficulty === difficulty);
      expect(source).toHaveLength(16);
      expect(supplemental).toHaveLength(14);
      expect(source.length + supplemental.length).toBe(30);
    }
    expect(Object.values(unit!.difficultyTracks).flatMap((track) => track.tasks)).toHaveLength(6);
  });

  it('逐题核对42道原创题的答案、知识点、选项和范围', () => {
    expect(grade2Term2MathUnit02SupplementalActivities).toHaveLength(42);
    expect(new Set(grade2Term2MathUnit02SupplementalActivities.map(({ activity }) => activity.id)).size).toBe(42);
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const authored = grade2Term2MathUnit02SupplementalActivities.filter((item) => item.difficulty === difficulty);
      expect(authored.map(({ activity }) => answerSummary(activity))).toEqual(expectedSupplementAnswers[difficulty]);
      authored.forEach(({ activity, sourceUnitId, knowledgePointIds: mappedIds }, index) => {
        expect(sourceUnitId).toBe(unitId);
        expect(mappedIds, activity.id).toEqual(expectedSupplementKnowledgePoints[difficulty][index]);
        expect(mappedIds.every((id) => knowledgePointIds.includes(id as (typeof knowledgePointIds)[number]))).toBe(true);
        expect(activity.options).toHaveLength(3);
        expect(new Set(activity.options.map(({ label }) => label)).size).toBe(3);
        expect(activity.hint.trim()).not.toBe('');
        expect(activity.explanation.trim()).not.toBe('');
        expect(`${activity.prompt} ${activity.hint}`).not.toContain(answerSummary(activity));
        expect(`${activity.prompt} ${activity.hint}`).not.toMatch(/余数|有余数/u);
      });
    }
  });

  it('为48道源题和42道原创题提供逐题知识点计划、manifest指纹和审校台账', async () => {
    const manifestPath = resolve(process.cwd(), 'src/challenges/content/pilot-manifest-grade2-term2-math-unit02.json');
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
    const supplements = grade2Term2MathUnit02SupplementalActivities.map(({ activity }) => activity);
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
    expect(group.definition.mappingEvidence.notes).toContain('用户提供的人教版');
    expect(group.definition.mappingEvidence.notes).toContain('不纳入有余数除法');
    expect(group.definition.mappingEvidence.notes).toContain('独立教育者复核未完成');
    expect(group.definition.tasks).toHaveLength(5);
    expect(new Set(group.questionIds)).toEqual(expectedIds);
    expect(new Set(manifest.questions.map(({ questionId }) => questionId))).toEqual(expectedIds);
    expect(new Set(manifest.questions.map(({ approvedContentFingerprint }) => approvedContentFingerprint))).toHaveLength(90);
    expect(rows).toHaveLength(90);
    expect(new Set(rows.map(({ 题目ID }) => 题目ID))).toEqual(expectedIds);
    expect(rows.every(({ 审核状态 }) => 审核状态.includes('AI 主审已复核') && 审核状态.includes('独立教育者复核数 0'))).toBe(true);

    const activityByQuestionId = new Map(activities.map((activity) => [`challenge-question:${activity.id}`, activity]));
    const ledgerById = new Map(rows.map((row) => [row['题目ID'], row]));
    const supplementByActivityId = new Map(grade2Term2MathUnit02SupplementalActivities.map((item) => [item.activity.id, item]));
    for (const question of manifest.questions) {
      const activity = activityByQuestionId.get(question.questionId);
      expect(activity, question.questionId).toBeDefined();
      const supplemental = supplementByActivityId.get(activity!.id);
      const sourceDifficulty = (['basic', 'advanced', 'high'] as const).find((difficulty) => activity!.id.includes(`/${difficulty}/`));
      expect(question.activityId).toBe(activity!.id);
      expect(question.difficulty).toBe(supplemental?.difficulty ?? sourceDifficulty);
      expect(question.knowledgePointIds.length).toBeGreaterThan(0);
        expect(question.knowledgePointIds.every((id) => supportedKnowledgePointIds.includes(id as (typeof supportedKnowledgePointIds)[number]))).toBe(true);
      expect(question.knowledgePointIds, question.questionId).toEqual(supplemental?.knowledgePointIds ?? sourceKnowledgePoints.get(activity!.id));
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
      expect(row['检查项']).toContain('乘法验算');
      expect(row['内容指纹']).toBe(question.approvedContentFingerprint);
    }
  });
});
