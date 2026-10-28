import { describe, expect, it } from 'vitest';
// @ts-expect-error Node.js is used only to inspect this unit's review ledger during Vitest.
import { existsSync, readFileSync } from 'node:fs';
// @ts-expect-error Node.js is used only to resolve this unit's review files during Vitest.
import { resolve } from 'node:path';
import type { ActivityDefinition, Difficulty } from '../../content/types';
import { loadUnit } from '../../content/unitLoader';
import { assemblePaper } from '../domain/assemble';
import type { ChallengeQuestionSnapshot } from '../domain/types';
import { fingerprintActivity } from './fingerprint';
import { grade2Term2MathUnit09SupplementalActivities } from './grade2Term2MathUnit09SupplementalActivities';

declare const process: { cwd(): string };

const unitId = 'grade-2/term-2/math/unit-09';
const groupId = 'grade-2-term-2-math-unit-09';
const sourceTopics = ['根据条件进行简单推理', '整理信息并按顺序解决问题'];
const knowledgePointIds = [
  'deduction-by-elimination',
  'ordering-and-transitive-relations',
  'unique-inference-from-clues',
  'clue-sufficiency-and-uncertainty',
] as const;

const expectedSupplementAnswers: Record<Difficulty, readonly string[]> = {
  basic: [
    '黄色', '圆形磁贴', '3号卡', '小雨在小川前面', '根据线索排除不符合的颜色', '灰色卡片',
    '小杨最后到', '乙在甲和丙中间', '红旗在第二位', '第二步是贴图案',
    '先收集线索，再排除选项', '还不能确定谁先到', '先读条件，再排除答案', '留下的答案符合全部线索',
  ],
  advanced: [
    '蓝色书签', '丁站', '小灯一定在小树前', '甲在中间', '还不能确定甲和乙谁先到',
    '小涛拿蓝色', '甲在第一，丙在第三，乙在中间', '先整理条件，再检查结论',
    '丙站', '小星一定在小阳前', '丙拿黄卡，丁拿绿卡', '信息还不够',
    '小雨第一，小林第二，小安第三', '小青和小红的先后还不能确定',
  ],
  high: [
    '丙和丁都在乙后', '黄盒在中间', '丙站在第三', '现有线索不足，不能确定唯一位置',
    '先测量，再记录、整理、汇报', '小林拿铜牌', '小河、小宁、小乐', '还需要知道小青和小红谁先到',
    '小田在小树之前', '不能确定甲和乙谁先到', '方形',
    '先收集，再比较，最后记录', '所有条件都要能支持答案', '不能只凭“不是第一”确定唯一位置',
  ],
};

const expectedSupplementKnowledgePoints: Record<Difficulty, readonly (readonly string[])[]> = {
  basic: [
    [knowledgePointIds[0], knowledgePointIds[2]], [knowledgePointIds[0]], [knowledgePointIds[0], knowledgePointIds[2]],
    [knowledgePointIds[1], knowledgePointIds[2]], [knowledgePointIds[3]], [knowledgePointIds[0], knowledgePointIds[2]],
    [knowledgePointIds[1], knowledgePointIds[2]], [knowledgePointIds[1], knowledgePointIds[2]],
    [knowledgePointIds[1], knowledgePointIds[2]], [knowledgePointIds[1], knowledgePointIds[2]],
    [knowledgePointIds[0], knowledgePointIds[3]], [knowledgePointIds[3]], [knowledgePointIds[0], knowledgePointIds[3]],
    [knowledgePointIds[0], knowledgePointIds[3]],
  ],
  advanced: [
    [knowledgePointIds[0], knowledgePointIds[2]], [knowledgePointIds[1], knowledgePointIds[2]],
    [knowledgePointIds[1], knowledgePointIds[2]], [knowledgePointIds[1], knowledgePointIds[2]],
    [knowledgePointIds[3]], [knowledgePointIds[0], knowledgePointIds[3]],
    [knowledgePointIds[1], knowledgePointIds[2]], [knowledgePointIds[0], knowledgePointIds[3]],
    [knowledgePointIds[1], knowledgePointIds[2]], [knowledgePointIds[1], knowledgePointIds[2]],
    [knowledgePointIds[0], knowledgePointIds[2]], [knowledgePointIds[3]],
    [knowledgePointIds[1], knowledgePointIds[2]], [knowledgePointIds[3]],
  ],
  high: [
    [knowledgePointIds[1], knowledgePointIds[2]], [knowledgePointIds[1], knowledgePointIds[2]],
    [knowledgePointIds[1], knowledgePointIds[2]], [knowledgePointIds[3]],
    [knowledgePointIds[1], knowledgePointIds[2]], [knowledgePointIds[0], knowledgePointIds[2]],
    [knowledgePointIds[1], knowledgePointIds[2]], [knowledgePointIds[3]],
    [knowledgePointIds[1], knowledgePointIds[2]], [knowledgePointIds[3]],
    [knowledgePointIds[0], knowledgePointIds[2]], [knowledgePointIds[1], knowledgePointIds[2]],
    [knowledgePointIds[0], knowledgePointIds[3]], [knowledgePointIds[3]],
  ],
};

const expectedSourceKnowledgePoints: Record<Difficulty, readonly (readonly string[])[]> = {
  basic: [
    [knowledgePointIds[0], knowledgePointIds[2]], [knowledgePointIds[0], knowledgePointIds[2]],
    [knowledgePointIds[0], knowledgePointIds[2], knowledgePointIds[3]], [knowledgePointIds[0]],
    [knowledgePointIds[3]], [knowledgePointIds[0], knowledgePointIds[2]],
    [knowledgePointIds[0], knowledgePointIds[2]], [knowledgePointIds[0], knowledgePointIds[3]],
    [knowledgePointIds[1]], [knowledgePointIds[1]], [knowledgePointIds[1], knowledgePointIds[3]],
    [knowledgePointIds[1]], [knowledgePointIds[1], knowledgePointIds[2]], [knowledgePointIds[1], knowledgePointIds[3]],
    [knowledgePointIds[1], knowledgePointIds[2]], [knowledgePointIds[1], knowledgePointIds[2]],
  ],
  advanced: [
    [knowledgePointIds[0], knowledgePointIds[2]], [knowledgePointIds[0], knowledgePointIds[2]],
    [knowledgePointIds[0], knowledgePointIds[2]], [knowledgePointIds[1], knowledgePointIds[2]],
    [knowledgePointIds[3]], [knowledgePointIds[1], knowledgePointIds[2]],
    [knowledgePointIds[1], knowledgePointIds[3]], [knowledgePointIds[1], knowledgePointIds[2]],
    [knowledgePointIds[0], knowledgePointIds[2]], [knowledgePointIds[1], knowledgePointIds[2]],
    [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[2]], [knowledgePointIds[3]],
    [knowledgePointIds[1], knowledgePointIds[2]], [knowledgePointIds[1], knowledgePointIds[2]],
    [knowledgePointIds[0], knowledgePointIds[2]], [knowledgePointIds[0], knowledgePointIds[2]],
  ],
  high: [
    [knowledgePointIds[1], knowledgePointIds[2]], [knowledgePointIds[1], knowledgePointIds[2]],
    [knowledgePointIds[1], knowledgePointIds[2]], [knowledgePointIds[3]],
    [knowledgePointIds[1], knowledgePointIds[2]], [knowledgePointIds[0], knowledgePointIds[2]],
    [knowledgePointIds[1], knowledgePointIds[3]], [knowledgePointIds[1], knowledgePointIds[2]],
    [knowledgePointIds[1], knowledgePointIds[2]], [knowledgePointIds[0], knowledgePointIds[2]],
    [knowledgePointIds[1], knowledgePointIds[2]], [knowledgePointIds[1], knowledgePointIds[3]],
    [knowledgePointIds[1], knowledgePointIds[2]], [knowledgePointIds[0], knowledgePointIds[2]],
    [knowledgePointIds[1], knowledgePointIds[2]], [knowledgePointIds[3], knowledgePointIds[1]],
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

describe('二年级下册数学第九单元闯关题目草案', () => {
  it('核实课程源题量，并复用源题补齐每档30道候选', async () => {
    const unit = await loadUnit(unitId);
    expect(unit?.sourceTopics).toEqual(sourceTopics);
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const source = unit!.difficultyTracks[difficulty].tasks
        .flatMap((task) => task.sessions.flatMap((session) => session.activities));
      const supplemental = grade2Term2MathUnit09SupplementalActivities.filter((item) => item.difficulty === difficulty);
      expect(source).toHaveLength(16);
      expect(supplemental).toHaveLength(14);
      expect(source.length + supplemental.length).toBe(30);
    }
    expect(Object.values(unit!.difficultyTracks).flatMap((track) => track.tasks)).toHaveLength(6);
  });

  it('逐题核对42道原创题的答案、知识点、选项、提示和解析', () => {
    expect(grade2Term2MathUnit09SupplementalActivities).toHaveLength(42);
    expect(new Set(grade2Term2MathUnit09SupplementalActivities.map(({ activity }) => activity.id)).size).toBe(42);
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const authored = grade2Term2MathUnit09SupplementalActivities.filter((item) => item.difficulty === difficulty);
      expect(authored.map(({ activity }) => answerSummary(activity))).toEqual(expectedSupplementAnswers[difficulty]);
      authored.forEach(({ activity, sourceUnitId, knowledgePointIds: mappedIds }, index) => {
        expect(sourceUnitId).toBe(unitId);
        expect(activity.id).toBe(`challenge-supplement-${groupId}-${difficulty}-${String(index + 1).padStart(2, '0')}`);
        expect(mappedIds, activity.id).toEqual(expectedSupplementKnowledgePoints[difficulty][index]);
        expect(mappedIds.length).toBeGreaterThan(0);
        expect(mappedIds.every((id) => knowledgePointIds.includes(id as (typeof knowledgePointIds)[number]))).toBe(true);
        expect(activity.options).toHaveLength(3);
        expect(new Set(activity.options.map(({ label }) => label)).size).toBe(3);
        expect(activity.hint.trim()).not.toBe('');
        expect(activity.explanation.trim()).not.toBe('');
        expect(activity.hint).not.toContain(answerSummary(activity));
      });
      expect(new Set(authored.flatMap(({ knowledgePointIds: ids }) => ids))).toEqual(new Set(knowledgePointIds));
    }
  });

  it('为48道课程源题和42道原创题提供映射、指纹、审校台账与100种子组卷覆盖', async () => {
    const manifestPath = resolve(process.cwd(), 'src/challenges/content/pilot-manifest-grade2-term2-math-unit09.json');
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
        lifecycle: 'active' | 'disabled' | 'deprecated';
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
    const supplements = grade2Term2MathUnit09SupplementalActivities.map(({ activity }) => activity);
    const activities = [...sourceActivities, ...supplements];
    const expectedIds = new Set(activities.map(({ id }) => `challenge-question:${id}`));
    const activityByQuestionId = new Map(activities.map((activity) => [`challenge-question:${activity.id}`, activity]));
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

    const ledgerById = new Map(rows.map((row) => [row['题目ID'], row]));
    const supplementByActivityId = new Map(grade2Term2MathUnit09SupplementalActivities.map((item) => [item.activity.id, item]));
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
      expect(row['检查项']).toContain('线索');
      expect(row['内容指纹']).toBe(question.approvedContentFingerprint);
    }

    const candidates: ChallengeQuestionSnapshot[] = manifest.questions.map((question) => ({
      ...question,
      activity: activityByQuestionId.get(question.questionId)!,
      contentFingerprint: question.approvedContentFingerprint,
    }));
    for (const task of group.definition.tasks) {
      for (let seedNumber = 1; seedNumber <= 100; seedNumber += 1) {
        const paper = assemblePaper(task, candidates, `${manifest.version}:${task.id}:${seedNumber}`);
        const covered = new Set(paper.flatMap(({ knowledgePointIds: ids }) => ids));
        expect(paper, `${task.id} seed ${seedNumber}`).toHaveLength(task.targetCount);
        expect(new Set(paper.map(({ questionId }) => questionId)).size).toBe(task.targetCount);
        expect(task.requiredKnowledgePointIds.every((id) => covered.has(id))).toBe(true);
      }
    }
  });
});
