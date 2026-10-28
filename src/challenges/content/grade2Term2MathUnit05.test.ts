import { describe, expect, it } from 'vitest';
// @ts-expect-error Node.js is used only to inspect this unit's review ledger during Vitest.
import { existsSync, readFileSync } from 'node:fs';
// @ts-expect-error Node.js is used only to resolve this unit's review ledger during Vitest.
import { resolve } from 'node:path';
import type { ActivityDefinition, Difficulty } from '../../content/types';
import { loadUnit } from '../../content/unitLoader';
import { fingerprintActivity } from './fingerprint';
import { grade2Term2MathUnit05SupplementalActivities } from './grade2Term2MathUnit05SupplementalActivities';

declare const process: { cwd(): string };

const unitId = 'grade-2/term-2/math/unit-05';
const groupId = 'grade-2-term-2-math-unit-05';
const sourceTopics = ['含有加减乘除的两步运算', '认识小括号并按运算顺序计算'];
const knowledgePointIds = [
  'mixed-operations-multiplication-division-before-addition-subtraction',
  'mixed-operations-same-level-left-to-right',
  'mixed-operations-parentheses-first',
] as const;

const expectedSupplementAnswers: Record<Difficulty, readonly string[]> = {
  basic: [
    '37', '12', '36', '4×5', '7+5', '先算18−6', '从左往右，先算除法', '10颗',
    '6+2×5=16；(6+2)×5=40', '(4+2)×3=18', '4×6−5=19', '先算3×4，最后结果是20',
    '乘除同级，从左往右先做除法', '40',
  ],
  advanced: [
    '7+4×5=27；(7+4)×5=55，后者大28', '先48÷6=8，再8+7=15', '先算18÷3=6，再算30−6=24',
    '20−5+2=17；20−(5+2)=13', '48÷6×2=16张',
    '先算8+5=13，再算2×13=26', '先算42−6=36，再算36÷4=9袋', '30÷5+2=8个/盒',
    '先算20÷5，再把商乘2', '36÷(3+3)=6；36÷3+3=15', '14', '3×5+4=19',
    '(18−6)÷3=4', '32',
  ],
  high: [
    '5×6−4=26', '先算4×5=20，再加原有6颗，得26颗', '4×(8−3)=20', '第一间6+4×3=18把；第二间(6+2)×3=24把',
    '先算20−8=12，再算12÷3=4把/排', '10', '(12+8)÷4+3=8', '应先算6×2，18−12=6',
    '8+24÷6=12盒', '6×4+5=29；6×(4+5)=54，差25', '18−3×4=6', '20−6+3=17个',
    '24÷3÷2=4张/组', '3×(6+2)=24',
  ],
};

const expectedSupplementKnowledgePoints: Record<Difficulty, readonly (readonly string[])[]> = {
  basic: [
    [knowledgePointIds[0]], [knowledgePointIds[0]], [knowledgePointIds[0]], [knowledgePointIds[0]],
    [knowledgePointIds[2]], [knowledgePointIds[1]], [knowledgePointIds[1]], [knowledgePointIds[2]],
    [knowledgePointIds[0], knowledgePointIds[2]], [knowledgePointIds[2]], [knowledgePointIds[0]],
    [knowledgePointIds[0]], [knowledgePointIds[1]], [knowledgePointIds[2]],
  ],
  advanced: [
    [knowledgePointIds[0], knowledgePointIds[2]], [knowledgePointIds[0]], [knowledgePointIds[0]],
    [knowledgePointIds[1]], [knowledgePointIds[1]], [knowledgePointIds[2]], [knowledgePointIds[0]],
    [knowledgePointIds[0]], [knowledgePointIds[0], knowledgePointIds[1]],
    [knowledgePointIds[0], knowledgePointIds[2]], [knowledgePointIds[1]], [knowledgePointIds[0]],
    [knowledgePointIds[2]], [knowledgePointIds[0], knowledgePointIds[2]],
  ],
  high: [
    [knowledgePointIds[0]], [knowledgePointIds[0]], [knowledgePointIds[2]],
    [knowledgePointIds[0], knowledgePointIds[2]], [knowledgePointIds[2]],
    [knowledgePointIds[0], knowledgePointIds[2]], [knowledgePointIds[0], knowledgePointIds[2]],
    [knowledgePointIds[0], knowledgePointIds[2]], [knowledgePointIds[0]],
    [knowledgePointIds[0], knowledgePointIds[2]], [knowledgePointIds[0]], [knowledgePointIds[1]],
    [knowledgePointIds[1]], [knowledgePointIds[2]],
  ],
};

const expectedSourceKnowledgePoints: Record<Difficulty, readonly (readonly string[])[]> = {
  basic: [
    [knowledgePointIds[0]], [knowledgePointIds[0]], [knowledgePointIds[0]], [knowledgePointIds[0]],
    [knowledgePointIds[0]], [knowledgePointIds[0]], [knowledgePointIds[0]], [knowledgePointIds[0]],
    [knowledgePointIds[2]], [knowledgePointIds[0]], [knowledgePointIds[2]], [knowledgePointIds[0]],
    [knowledgePointIds[0], knowledgePointIds[2]], [knowledgePointIds[0], knowledgePointIds[2]],
    [knowledgePointIds[2]], [knowledgePointIds[2]],
  ],
  advanced: [
    [knowledgePointIds[0]], [knowledgePointIds[0]], [knowledgePointIds[2]],
    [...knowledgePointIds], [knowledgePointIds[0], knowledgePointIds[2]], [knowledgePointIds[0]],
    [knowledgePointIds[1]], [...knowledgePointIds], [knowledgePointIds[0]], [knowledgePointIds[0]],
    [knowledgePointIds[2]], [...knowledgePointIds], [...knowledgePointIds], [knowledgePointIds[1]],
    [knowledgePointIds[1]], [knowledgePointIds[2]],
  ],
  high: [
    [knowledgePointIds[0]], [knowledgePointIds[0]], [knowledgePointIds[2]], [...knowledgePointIds],
    [...knowledgePointIds], [...knowledgePointIds], [...knowledgePointIds], [...knowledgePointIds],
    [knowledgePointIds[0]], [knowledgePointIds[0]], [knowledgePointIds[2]], [...knowledgePointIds],
    [...knowledgePointIds], [knowledgePointIds[0]], [...knowledgePointIds], [...knowledgePointIds],
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

describe('二年级下册数学第五单元闯关题目草案', () => {
  it('核对单元源题量，并组成每档30道、总计90道候选题', async () => {
    const unit = await loadUnit(unitId);
    expect(unit?.sourceTopics).toEqual(sourceTopics);
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const source = unit!.difficultyTracks[difficulty].tasks
        .flatMap((task) => task.sessions.flatMap((session) => session.activities));
      const supplemental = grade2Term2MathUnit05SupplementalActivities.filter((item) => item.difficulty === difficulty);
      expect(source).toHaveLength(16);
      expect(supplemental).toHaveLength(14);
      expect(source.length + supplemental.length).toBe(30);
    }
    expect(Object.values(unit!.difficultyTracks).flatMap((track) => track.tasks)).toHaveLength(6);
  });

  it('逐题核对42道原创题的答案、知识点、选项和二年级混合运算范围', () => {
    expect(grade2Term2MathUnit05SupplementalActivities).toHaveLength(42);
    expect(new Set(grade2Term2MathUnit05SupplementalActivities.map(({ activity }) => activity.id)).size).toBe(42);
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const authored = grade2Term2MathUnit05SupplementalActivities.filter((item) => item.difficulty === difficulty);
      expect(authored.map(({ activity }) => answerSummary(activity))).toEqual(expectedSupplementAnswers[difficulty]);
      authored.forEach(({ activity, sourceUnitId, knowledgePointIds: mappedIds }, index) => {
        expect(sourceUnitId).toBe(unitId);
        expect(mappedIds, activity.id).toEqual(expectedSupplementKnowledgePoints[difficulty][index]);
        expect(mappedIds.every((id) => knowledgePointIds.includes(id as (typeof knowledgePointIds)[number]))).toBe(true);
        expect(activity.options).toHaveLength(3);
        expect(new Set(activity.options.map(({ label }) => label)).size).toBe(3);
        expect(activity.hint.trim()).not.toBe('');
        expect(activity.explanation.trim()).not.toBe('');
        expect(activity.hint).not.toContain(answerSummary(activity));
        expect(`${activity.prompt} ${activity.hint} ${activity.explanation}`).not.toMatch(/小数|分数|方程|负数|余数|括号套括号/u);
      });
      expect(new Set(authored.flatMap(({ knowledgePointIds: ids }) => ids))).toEqual(new Set(knowledgePointIds));
    }
  });

  it('为48道源题和42道原创题提供逐题映射、指纹和自审记录', async () => {
    const manifestPath = resolve(process.cwd(), 'src/challenges/content/pilot-manifest-grade2-term2-math-unit05.json');
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
    const supplements = grade2Term2MathUnit05SupplementalActivities.map(({ activity }) => activity);
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
    const supplementByActivityId = new Map(grade2Term2MathUnit05SupplementalActivities.map((item) => [item.activity.id, item]));
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
      expect(row['检查项']).toContain('运算顺序');
      expect(row['内容指纹']).toBe(question.approvedContentFingerprint);
    }
  });
});
