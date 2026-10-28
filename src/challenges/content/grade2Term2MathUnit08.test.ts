import { describe, expect, it } from 'vitest';
// @ts-expect-error Node.js is used only to inspect this unit's review ledger during Vitest.
import { existsSync, readFileSync } from 'node:fs';
// @ts-expect-error Node.js is used only to resolve this unit's review ledger during Vitest.
import { resolve } from 'node:path';
import type { ActivityDefinition, Difficulty } from '../../content/types';
import { loadUnit } from '../../content/unitLoader';
import { fingerprintActivity } from './fingerprint';
import { grade2Term2MathUnit08SupplementalActivities } from './grade2Term2MathUnit08SupplementalActivities';

declare const process: { cwd(): string };

const unitId = 'grade-2/term-2/math/unit-08';
const groupId = 'grade-2-term-2-math-unit-08';
const sourceTopics = ['认识质量单位克和千克', '建立物品轻重估计并进行简单的质量换算'];
const knowledgePointIds = ['mass-unit-conversion', 'mass-comparison-and-estimation'] as const;

const expectedSupplementAnswers: Record<Difficulty, readonly string[]> = {
  basic: [
    '克', '5千克', '4,300克', '质量', '橘子重350克', '150克', '80克', '装着课本的书包',
    '2千克500克', '200克', '6,000克', '1,250克更重，重50克', '18千克', '1千克更重，重50克',
  ],
  advanced: [
    '2,200克', '1千克500克', '2千克更重，重150克', '650克', '3,050克', '1千克250克 + 750克',
    '1千克600克更重，重50克', '950克＜1千克100克＜1千克250克', '2千克300克', '1,300克',
    '1千克750克', '1千克250克更重，重50克', '1,700克', '1,500克',
  ],
  high: [
    '还差550克', '1千克20克', '3,005克', '800克、700克和500克',
    '1千克500克那组更重，重100克', '2千克500克', '1千克700克', '1千克400克、900克和700克',
    '第二份装载超过3千克', '还需50克', '4,080克', '先核对每件物品的读数和单位，再统一单位求和',
    '850克', '1千克900克比1,800克重100克',
  ],
};

const conversion = knowledgePointIds[0];
const comparison = knowledgePointIds[1];
const expectedSupplementKnowledgePoints: Record<Difficulty, readonly (readonly string[])[]> = {
  basic: [
    [comparison], [comparison], [conversion], [comparison], [comparison], [conversion, comparison], [conversion, comparison],
    [comparison], [conversion], [comparison], [conversion], [conversion, comparison], [comparison], [conversion, comparison],
  ],
  advanced: [
    [conversion], [conversion], [conversion, comparison], [conversion], [conversion], [conversion],
    [conversion, comparison], [conversion, comparison], [conversion], [conversion], [conversion],
    [conversion, comparison], [conversion], [conversion],
  ],
  high: [
    [conversion], [conversion, comparison], [conversion], [conversion], [conversion, comparison], [conversion],
    [conversion], [conversion], [conversion, comparison], [conversion], [conversion], [conversion, comparison],
    [conversion], [conversion, comparison],
  ],
};

const expectedSourceKnowledgePoints: Record<Difficulty, readonly (readonly string[])[]> = {
  basic: [
    [comparison], [comparison], [conversion], [comparison], [comparison], [conversion], [comparison], [comparison],
    [conversion], [conversion], [conversion], [conversion], [comparison], [conversion], [conversion, comparison], [conversion],
  ],
  advanced: [
    [conversion], [conversion], [conversion, comparison], [conversion], [comparison], [conversion], [comparison], [comparison],
    [conversion], [conversion], [conversion], [conversion], [conversion], [conversion], [comparison], [conversion],
  ],
  high: [
    [conversion], [conversion], [conversion, comparison], [comparison], [conversion], [conversion], [conversion], [comparison],
    [conversion], [conversion], [conversion], [conversion, comparison], [conversion], [comparison], [conversion], [conversion, comparison],
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

describe('二年级下册数学第八单元闯关题目草案', () => {
  it('核对单元源题量，并组成每档30道、总计90道候选题', async () => {
    const unit = await loadUnit(unitId);
    expect(unit?.sourceTopics).toEqual(sourceTopics);
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const source = unit!.difficultyTracks[difficulty].tasks
        .flatMap((task) => task.sessions.flatMap((session) => session.activities));
      const supplemental = grade2Term2MathUnit08SupplementalActivities.filter((item) => item.difficulty === difficulty);
      expect(source).toHaveLength(16);
      expect(supplemental).toHaveLength(14);
      expect(source.length + supplemental.length).toBe(30);
    }
    expect(Object.values(unit!.difficultyTracks).flatMap((track) => track.tasks)).toHaveLength(6);
  });

  it('逐题核对42道原创题的答案、知识点、单位、提示和二年级质量范围', () => {
    expect(grade2Term2MathUnit08SupplementalActivities).toHaveLength(42);
    expect(new Set(grade2Term2MathUnit08SupplementalActivities.map(({ activity }) => activity.id)).size).toBe(42);
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const authored = grade2Term2MathUnit08SupplementalActivities.filter((item) => item.difficulty === difficulty);
      expect(authored.map(({ activity }) => answerSummary(activity))).toEqual(expectedSupplementAnswers[difficulty]);
      authored.forEach(({ activity, sourceUnitId, knowledgePointIds: mappedIds }, index) => {
        expect(sourceUnitId).toBe(unitId);
        expect(mappedIds, activity.id).toEqual(expectedSupplementKnowledgePoints[difficulty][index]);
        expect(mappedIds.every((id) => knowledgePointIds.includes(id as (typeof knowledgePointIds)[number]))).toBe(true);
        expect(activity.options).toHaveLength(3);
        expect(new Set(activity.options.map(({ label }) => label))).toHaveLength(3);
        expect(activity.hint.trim()).not.toBe('');
        expect(activity.explanation.trim()).not.toBe('');
        expect(activity.hint).not.toContain(answerSummary(activity));
        expect(`${activity.prompt} ${activity.hint} ${activity.explanation}`).not.toMatch(/小数|分数|吨|毫克|体积|方程|负数/u);
      });
      expect(new Set(authored.flatMap(({ knowledgePointIds: ids }) => ids))).toEqual(new Set(knowledgePointIds));
    }
  });

  it('为48道源题和42道原创题提供逐题映射、指纹和作者自审记录', async () => {
    const manifestPath = resolve(process.cwd(), 'src/challenges/content/pilot-manifest-grade2-term2-math-unit08.json');
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
    const supplements = grade2Term2MathUnit08SupplementalActivities.map(({ activity }) => activity);
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
    expect(group.definition.mappingEvidence.notes).toContain('TapXWorld');
    expect(group.definition.mappingEvidence.notes).toContain('不将回退目录称为最新版');
    expect(group.definition.mappingEvidence.notes).toContain('尚无独立教育者复核');
    expect(group.definition.tasks).toHaveLength(5);
    expect(group.definition.tasks.map(({ id }) => id)).toEqual([
      `${groupId}/basic-01`, `${groupId}/basic-02`, `${groupId}/advanced-01`, `${groupId}/advanced-02`, `${groupId}/high-01`,
    ]);
    expect(group.definition.tasks.every(({ targetCount }) => targetCount === 15)).toBe(true);
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const planned = group.definition.tasks.filter((task) => task.difficulty === difficulty)
        .flatMap(({ requiredKnowledgePointIds: ids }) => ids);
      expect(new Set(planned)).toEqual(new Set(knowledgePointIds));
    }
    expect(new Set(group.questionIds)).toEqual(expectedIds);
    expect(new Set(manifest.questions.map(({ questionId }) => questionId))).toEqual(expectedIds);
    expect(new Set(manifest.questions.map(({ approvedContentFingerprint }) => approvedContentFingerprint))).toHaveLength(90);
    expect(rows).toHaveLength(90);
    expect(new Set(rows.map(({ 题目ID }) => 题目ID))).toEqual(expectedIds);
    expect(rows.every(({ 审核状态 }) => 审核状态.includes('作者逐题自审通过') && 审核状态.includes('未独立教育者复核'))).toBe(true);

    const activityByQuestionId = new Map(activities.map((activity) => [`challenge-question:${activity.id}`, activity]));
    const ledgerById = new Map(rows.map((row) => [row['题目ID'], row]));
    const supplementByActivityId = new Map(grade2Term2MathUnit08SupplementalActivities.map((item) => [item.activity.id, item]));
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
      expect(question.approvedBy).toBe('Codex content-author self-review');
      expect(question.approvedAt).toMatch(/^2026-10-28T/u);
      expect(question.approvedContentFingerprint).toBe(await fingerprintActivity(activity!));

      const row = ledgerById.get(question.questionId)!;
      expect(row['难度']).toBe(question.difficulty === 'basic' ? '基础' : question.difficulty === 'advanced' ? '进阶' : '高阶');
      expect(row['正确选项']).toBe(answerSummary(activity!));
      expect(row['知识点']).toBe(question.knowledgePointIds.join('；'));
      expect(row['复核说明']).toContain('TapXWorld');
      expect(row['检查项']).toContain('质量');
      expect(row['内容指纹']).toBe(question.approvedContentFingerprint);
    }
  });
});
