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
import { grade2Term2MathUnit06SupplementalActivities } from './grade2Term2MathUnit06SupplementalActivities';

declare const process: { cwd(): string };

const unitId = 'grade-2/term-2/math/unit-06';
const groupId = 'grade-2-term-2-math-unit-06';
const sourceTopics = ['认识有余数除法的商和余数', '理解余数必须小于除数并解决简单问题'];
const knowledgePointIds = [
  'quotient-and-remainder-meaning',
  'remainder-less-than-divisor',
  'remainder-division-checking',
  'interpreting-remainder-in-context',
] as const;

const expectedSupplementAnswers: Record<Difficulty, readonly string[]> = {
  basic: [
    '3余2', '余数3', '除数×商+余数=被除数', '余数比除数小', '余数小于除数', '还剩2个梨，未装满一篮',
    '4余3', '5余1', '商表示完整组数，余数表示剩余数量', '除数×商+余数=原来的总数',
    '3余2', '余数3', '9÷4=2余1', '商×除数后再加余数',
  ],
  advanced: [
    '4盒余3个', '5辆坐满，还剩2人', '剩下的同学还需要安排座位', '余数必须小于7',
    '6袋余1张', '3组余4个', '余数表示尚未装满一袋的卡片数', '余数6',
    '4余2', '5盒余2块', '7×4+3=31', '至少需要第5辆车', '余数配上题目中的物品或人数单位', '先求完整组数，再解释余数怎么办',
  ],
  high: [
    '5箱余2个', '4组余3人', '整组数量加余数等于总数', '为剩下的3位同学安排座位', '6盒余2张', '重新计算商和余数',
    '余数9和除数8', '先求商和余数，再核对并安排剩余部分', '5辆坐满，还剩1人', '再安排一辆车给剩下的人',
    '把剩下的卡片收好', '至少需要第6辆车', '不可能，余数必须小于除数', '5包余4张',
  ],
};

const expectedSupplementKnowledgePoints: Record<Difficulty, readonly (readonly string[])[]> = {
  basic: [
    [knowledgePointIds[0]], [knowledgePointIds[0]], [knowledgePointIds[2]], [knowledgePointIds[1]],
    [knowledgePointIds[1]], [knowledgePointIds[0], knowledgePointIds[3]], [knowledgePointIds[0]], [knowledgePointIds[0]],
    [knowledgePointIds[0]], [knowledgePointIds[2]], [knowledgePointIds[0]], [knowledgePointIds[1]],
    [knowledgePointIds[0], knowledgePointIds[1]], [knowledgePointIds[2]],
  ],
  advanced: [
    [knowledgePointIds[0], knowledgePointIds[3]], [knowledgePointIds[0], knowledgePointIds[3]],
    [knowledgePointIds[3]], [knowledgePointIds[1]], [knowledgePointIds[0], knowledgePointIds[1]],
    [knowledgePointIds[0], knowledgePointIds[3]], [knowledgePointIds[3]], [knowledgePointIds[1]],
    [knowledgePointIds[0]], [knowledgePointIds[0]], [knowledgePointIds[2]],
    [knowledgePointIds[3]], [knowledgePointIds[3]], [knowledgePointIds[0], knowledgePointIds[3]],
  ],
  high: [
    [knowledgePointIds[0], knowledgePointIds[3]], [knowledgePointIds[0], knowledgePointIds[3]],
    [knowledgePointIds[2]], [knowledgePointIds[3]], [knowledgePointIds[0], knowledgePointIds[3]],
    [knowledgePointIds[1], knowledgePointIds[2]], [knowledgePointIds[1]],
    [knowledgePointIds[2], knowledgePointIds[3]], [knowledgePointIds[0], knowledgePointIds[3]],
    [knowledgePointIds[3]], [knowledgePointIds[3]], [knowledgePointIds[3]],
    [knowledgePointIds[1]], [knowledgePointIds[0], knowledgePointIds[3]],
  ],
};

const expectedSourceKnowledgePoints: Record<Difficulty, readonly (readonly string[])[]> = {
  basic: [
    [knowledgePointIds[0], knowledgePointIds[1]], [knowledgePointIds[0]], [knowledgePointIds[0]],
    [knowledgePointIds[0], knowledgePointIds[1]], [knowledgePointIds[0]], [knowledgePointIds[1]],
    [knowledgePointIds[0]], [knowledgePointIds[0], knowledgePointIds[1]],
    [knowledgePointIds[0]], [knowledgePointIds[0]], [knowledgePointIds[0], knowledgePointIds[2]],
    [knowledgePointIds[1]], [knowledgePointIds[1]], [knowledgePointIds[2]],
    [knowledgePointIds[0], knowledgePointIds[1]], [knowledgePointIds[1], knowledgePointIds[2]],
  ],
  advanced: [
    [knowledgePointIds[0], knowledgePointIds[3]], [knowledgePointIds[0], knowledgePointIds[3]],
    [knowledgePointIds[3]], [knowledgePointIds[3]], [knowledgePointIds[3]],
    [knowledgePointIds[0]], [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[3]], [knowledgePointIds[3]],
    [knowledgePointIds[0]], [knowledgePointIds[0]], [knowledgePointIds[2]], [knowledgePointIds[1]],
    [knowledgePointIds[0]], [knowledgePointIds[2]], [knowledgePointIds[0], knowledgePointIds[1]], [knowledgePointIds[1], knowledgePointIds[2]],
  ],
  high: [
    [knowledgePointIds[0], knowledgePointIds[3]], [knowledgePointIds[0], knowledgePointIds[3]],
    [knowledgePointIds[2]], [knowledgePointIds[3]], [knowledgePointIds[0], knowledgePointIds[3]],
    [knowledgePointIds[1], knowledgePointIds[2]], [knowledgePointIds[1]], [knowledgePointIds[2], knowledgePointIds[3]],
    [knowledgePointIds[0], knowledgePointIds[3]], [knowledgePointIds[0], knowledgePointIds[3]],
    [knowledgePointIds[3]], [knowledgePointIds[1], knowledgePointIds[3]],
    [knowledgePointIds[0], knowledgePointIds[3]], [knowledgePointIds[1]],
    [knowledgePointIds[0], knowledgePointIds[3]], [knowledgePointIds[1], knowledgePointIds[2], knowledgePointIds[3]],
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

describe('二年级下册数学第六单元闯关题目草案', () => {
  it('核实课程源题量，并复用源题补齐每档30道候选', async () => {
    const unit = await loadUnit(unitId);
    expect(unit?.sourceTopics).toEqual(sourceTopics);
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const source = unit!.difficultyTracks[difficulty].tasks
        .flatMap((task) => task.sessions.flatMap((session) => session.activities));
      const supplemental = grade2Term2MathUnit06SupplementalActivities.filter((item) => item.difficulty === difficulty);
      expect(source).toHaveLength(16);
      expect(supplemental).toHaveLength(14);
      expect(source.length + supplemental.length).toBe(30);
    }
    expect(Object.values(unit!.difficultyTracks).flatMap((track) => track.tasks)).toHaveLength(6);
  });

  it('逐题核对42道原创题答案、知识点、选项、提示和解析', () => {
    expect(grade2Term2MathUnit06SupplementalActivities).toHaveLength(42);
    expect(new Set(grade2Term2MathUnit06SupplementalActivities.map(({ activity }) => activity.id)).size).toBe(42);
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const authored = grade2Term2MathUnit06SupplementalActivities.filter((item) => item.difficulty === difficulty);
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
      });
      expect(new Set(authored.flatMap(({ knowledgePointIds: ids }) => ids))).toEqual(new Set(knowledgePointIds));
    }
  });

  it('为48道课程源题和42道原创题提供知识点映射、指纹和审校台账', async () => {
    const manifestPath = resolve(process.cwd(), 'src/challenges/content/pilot-manifest-grade2-term2-math-unit06.json');
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
    const supplements = grade2Term2MathUnit06SupplementalActivities.map(({ activity }) => activity);
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
    expect(group.definition.mappingEvidence.notes).toContain('ISBN 978-7-107-37176-9');
    expect(group.definition.mappingEvidence.notes).toContain('用户提供的人教版');
    expect(group.definition.mappingEvidence.notes).toContain('独立教育者复核未完成');
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
    expect(rows.every(({ 审核状态 }) => 审核状态.includes('AI 主审已复核') && 审核状态.includes('独立教育者复核数 0'))).toBe(true);

    const ledgerById = new Map(rows.map((row) => [row['题目ID'], row]));
    const supplementByActivityId = new Map(grade2Term2MathUnit06SupplementalActivities.map((item) => [item.activity.id, item]));
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
      expect(row['检查项']).toContain('除数×商+余数');
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
