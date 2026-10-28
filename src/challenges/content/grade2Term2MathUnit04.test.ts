import { describe, expect, it } from 'vitest';
// @ts-expect-error Node.js is used only to inspect this unit's review ledger during Vitest.
import { existsSync, readFileSync } from 'node:fs';
// @ts-expect-error Node.js is used only to resolve this unit's review ledger during Vitest.
import { resolve } from 'node:path';
import type { ActivityDefinition, Difficulty } from '../../content/types';
import { loadUnit } from '../../content/unitLoader';
import { fingerprintActivity } from './fingerprint';
import { grade2Term2MathUnit04SupplementalActivities } from './grade2Term2MathUnit04SupplementalActivities';

declare const process: { cwd(): string };

const unitId = 'grade-2/term-2/math/unit-04';
const groupId = 'grade-2-term-2-math-unit-04';
const sourceTopics = ['用7、8、9的乘法口诀求商', '用除法解决简单平均分问题'];
const knowledgePointIds = [
  'division-facts-from-multiplication',
  'division-as-equal-sharing-and-grouping',
  'meaning-and-units-of-quotients',
] as const;

const expectedSupplementAnswers: Record<Difficulty, readonly string[]> = {
  basic: [
    '8', '8', '63÷7=9，因为7×9=63', '每份8张', '每盒7颗', '8盒', '每人5朵',
    '每袋9枚', '每组6个', '盒数', '72÷8=9', '64÷8=8', '9×8=72', '每份5枚，9×5=45',
  ],
  advanced: [
    '分成7组时每组9枚，分成9组时每组7枚，前者更多', '每队9张', '前题每人9张，后题能装9盒',
    '应算8×9=72；除数8乘商9回到72', '63÷9=7 和63÷7=9', '56÷8=7，能装成7袋',
    '72÷8=9比64÷8=8大', '9×9=81，所以81÷9=9', '56÷7=8，每队8张',
    '72个棋子每9个装一盒，可以装几盒', '72张图卡平均分给9位同学，每人几张',
    '每组8人，64人平均分成8组，商8表示每组的人数', '56÷7=8，56÷8=7，前者每份多1',
    '63÷9=7，9×7=63，商表示7袋',
  ],
  high: [
    '先7×9=63，再63÷9=7支/班', '8个/袋装9袋；9个/袋装8袋', '每队应是7枚，因为8×8=64不等于56',
    '9×9=81，说明9组每组9张正好是81张', '63÷9=7，每人7个；9×7=63可验算',
    '每盒装8本时商9表示盒数；平均分给8队时商9表示每队本数',
    '72÷9=8箱，再用8×9=72核对', '先算8×7=56，再算56÷7=8张/台',
    '先核对总数，再确认每份数量相等', '72÷8=9，验算应写8×9=72',
    '9个/袋只需8袋，比8个/袋的9袋少1袋', '先用9×7=63求总数，再用63÷7=9求份数',
    '72÷9=8，72÷8=9；除数和商的位置互换',
    '两题的商都是8，但一道表示每份数量，另一道表示份数',
  ],
};

const expectedSupplementKnowledgePoints: Record<Difficulty, readonly (readonly string[])[]> = {
  basic: [
    [knowledgePointIds[0]], [knowledgePointIds[0]], [knowledgePointIds[0]],
    [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[2]],
    [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[2]],
    [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[2]],
    [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[2]],
    [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[2]],
    [knowledgePointIds[1], knowledgePointIds[2]], [knowledgePointIds[2]],
    [knowledgePointIds[0]], [knowledgePointIds[0]],
    [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[2]],
    [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[2]],
  ],
  advanced: [
    [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[2]],
    [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[2]],
    [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[2]],
    [knowledgePointIds[0]], [knowledgePointIds[0]],
    [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[2]],
    [knowledgePointIds[0]], [knowledgePointIds[0]],
    [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[2]],
    [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[2]],
    [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[2]],
    [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[2]],
    [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[2]],
    [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[2]],
  ],
  high: [
    [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[2]],
    [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[2]],
    [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[2]],
    [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[2]],
    [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[2]],
    [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[2]],
    [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[2]],
    [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[2]],
    [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[2]],
    [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[2]],
    [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[2]],
    [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[2]],
    [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[2]],
    [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[2]],
  ],
};

const expectedSourceKnowledgePoints: Record<Difficulty, readonly (readonly string[])[]> = {
  basic: [
    [knowledgePointIds[0]], [knowledgePointIds[0]], [knowledgePointIds[0]],
    [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[2]], [knowledgePointIds[0]],
    [knowledgePointIds[0]], [knowledgePointIds[0]], [knowledgePointIds[0]],
    [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[2]],
    [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[2]],
    [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[2]],
    [knowledgePointIds[1], knowledgePointIds[2]], [knowledgePointIds[2]],
    [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[2]],
    [knowledgePointIds[1], knowledgePointIds[2]],
    [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[2]],
  ],
  advanced: [
    [knowledgePointIds[0]], [knowledgePointIds[0]], [knowledgePointIds[0]], [knowledgePointIds[0]],
    [knowledgePointIds[0]], [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[2]],
    [knowledgePointIds[0]], [knowledgePointIds[0], knowledgePointIds[2]],
    [knowledgePointIds[0]], [knowledgePointIds[0]], [knowledgePointIds[0]], [knowledgePointIds[0]],
    [knowledgePointIds[0]], [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[2]],
    [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[2]], [knowledgePointIds[0], knowledgePointIds[2]],
  ],
  high: [
    [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[2]],
    [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[2]],
    [knowledgePointIds[1], knowledgePointIds[2]],
    [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[2]],
    [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[2]],
    [knowledgePointIds[0]],
    [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[2]],
    [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[2]],
    [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[2]],
    [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[2]],
    [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[2]],
    [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[2]],
    [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[2]],
    [knowledgePointIds[2]],
    [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[2]],
    [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[2]],
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

describe('二年级下册数学第四单元闯关题目草案', () => {
  it('核实源题量并按每档14道原创题补齐30道唯一候选', async () => {
    const unit = await loadUnit(unitId);
    expect(unit?.sourceTopics).toEqual(sourceTopics);
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const source = unit!.difficultyTracks[difficulty].tasks
        .flatMap((task) => task.sessions.flatMap((session) => session.activities));
      const supplemental = grade2Term2MathUnit04SupplementalActivities.filter((item) => item.difficulty === difficulty);
      expect(source).toHaveLength(16);
      expect(supplemental).toHaveLength(14);
      expect(source.length + supplemental.length).toBe(30);
    }
    expect(Object.values(unit!.difficultyTracks).flatMap((track) => track.tasks)).toHaveLength(6);
  });

  it('逐题核对42道原创题的答案、知识点、选项和范围', () => {
    expect(grade2Term2MathUnit04SupplementalActivities).toHaveLength(42);
    expect(new Set(grade2Term2MathUnit04SupplementalActivities.map(({ activity }) => activity.id)).size).toBe(42);
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const authored = grade2Term2MathUnit04SupplementalActivities.filter((item) => item.difficulty === difficulty);
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
        expect(`${activity.prompt} ${activity.hint} ${activity.explanation}`).not.toMatch(/余数|有余数|小数|分数|混合运算/u);
      });
      expect(new Set(authored.flatMap(({ knowledgePointIds: ids }) => ids))).toEqual(new Set(knowledgePointIds));
    }
  });

  it('为48道源题和42道原创题提供逐题知识点计划、manifest指纹和审校台账', async () => {
    const manifestPath = resolve(process.cwd(), 'src/challenges/content/pilot-manifest-grade2-term2-math-unit04.json');
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
    const supplements = grade2Term2MathUnit04SupplementalActivities.map(({ activity }) => activity);
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
    expect(group.definition.mappingEvidence.notes).toContain('不纳入有余数除法');
    expect(group.definition.mappingEvidence.notes).toContain('尚无独立教育者复核');
    expect(group.definition.tasks).toHaveLength(5);
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
    const supplementByActivityId = new Map(grade2Term2MathUnit04SupplementalActivities.map((item) => [item.activity.id, item]));
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
      expect(row['检查项']).toContain('乘法验算');
      expect(row['内容指纹']).toBe(question.approvedContentFingerprint);
    }
  });
});
