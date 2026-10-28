import { describe, expect, it } from 'vitest';
// @ts-expect-error Node.js is used only to inspect the local review ledger during Vitest.
import { existsSync, readFileSync } from 'node:fs';
// @ts-expect-error Node.js is used only to resolve the local review ledger during Vitest.
import { resolve } from 'node:path';
import type { ActivityDefinition, Difficulty } from '../../content/types';
import { loadUnit } from '../../content/unitLoader';
import { submitAnswer } from '../../learning/answers';
import { fingerprintActivity } from './fingerprint';
import { grade2Term2MathUnit03SupplementalActivities } from './grade2Term2MathUnit03SupplementalActivities';

declare const process: { cwd(): string };

const sourceUnitId = 'grade-2/term-2/math/unit-03';
const groupId = 'grade-2-term-2-math-unit-03';
const sourceTopics = ['认识轴对称图形和对称轴', '识别生活中的平移与旋转现象'];
const knowledgePointIds = [
  'axis-symmetry-and-symmetry-axis',
  'translation-direction-and-orientation',
  'rotation-around-fixed-center',
] as const;

const expectedSupplementAnswers: Record<Difficulty, readonly string[]> = {
  basic: [
    '平移', '旋转', '两侧对应点到对称轴的距离相等', '旋转中心仍在原处', '旋转', '沿可能的折痕对折，看两边能否完全重合', '完全重合',
    '固定的中心点', '不能', '位置改变，朝向保持不变', '保持原来的朝向', '对称轴', '大小和形状不变，只改变位置', '转动中心仍在原处',
  ],
  advanced: [
    '前两种是平移，后一种是旋转', '物体绕固定中心转动', '沿对称轴折叠，让另一边与已知一边重合',
    '不能，只颜色相同还要检查两边形状和位置', '对称看折叠后两边是否对应，平移和旋转描述位置怎样变化',
    '移动路线是直线，图形朝向始终不变', '平移', '先旋转，后平移', '对折后两边完全重合',
    '先确认折痕，再比较两边对应部分', '平移不改变图形朝向，旋转绕固定中心进行',
    '先标明对称轴，再沿轴补出对应一侧', '先看是否直线移动，再看是否绕固定点转动',
    '平移沿直线移动且方向不变，旋转绕固定点转动',
  ],
  high: [
    '沿标出的轴折叠后，两侧图案可以完全重合', '每次沿同一方向直线移动，图案朝向保持不变',
    '叶片围绕花心转动，花心位置不变', '沿直线移动时朝向不变；绕固定点转动时中心不动',
    '先沿轴对折检查，再将图案沿直线移到旁边', '先说明物体怎样移动，再指出是否改变朝向或绕点转动',
    '让每个复制图案沿同一方向移动并保持相同朝向', '对折检查两边对应，必要时修正一侧图案',
    '标明固定中心和转动前后的位置', '对称需要两边形状、位置对应，颜色相同还不够',
    '先直线移动且不改变朝向，再绕固定点转动', '说明折痕并检查折叠后两边能否重合',
    '平移时朝向不变；图案转了方向，说明还发生了转动',
    '第一幅是平移，第二幅是旋转，转动中心保持不动',
  ],
};

const expectedSupplementKnowledgePoints: Record<Difficulty, readonly (readonly string[])[]> = {
  basic: [
    [knowledgePointIds[1]], [knowledgePointIds[2]], [knowledgePointIds[0]], [knowledgePointIds[2]],
    [knowledgePointIds[2]], [knowledgePointIds[0]], [knowledgePointIds[0]], [knowledgePointIds[2]],
    [knowledgePointIds[0]], [knowledgePointIds[1]], [knowledgePointIds[1]], [knowledgePointIds[0]],
    [knowledgePointIds[1]], [knowledgePointIds[2]],
  ],
  advanced: [
    [knowledgePointIds[1], knowledgePointIds[2]], [knowledgePointIds[2]], [knowledgePointIds[0]],
    [knowledgePointIds[0]], [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[2]],
    [knowledgePointIds[1]], [knowledgePointIds[1]], [knowledgePointIds[1], knowledgePointIds[2]],
    [knowledgePointIds[0]], [knowledgePointIds[0]], [knowledgePointIds[1], knowledgePointIds[2]],
    [knowledgePointIds[0]], [knowledgePointIds[1], knowledgePointIds[2]], [knowledgePointIds[1], knowledgePointIds[2]],
  ],
  high: [
    [knowledgePointIds[0]], [knowledgePointIds[1]], [knowledgePointIds[2]],
    [knowledgePointIds[1], knowledgePointIds[2]], [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[2]],
    [knowledgePointIds[1], knowledgePointIds[2]], [knowledgePointIds[1]], [knowledgePointIds[0]],
    [knowledgePointIds[2]], [knowledgePointIds[0]], [knowledgePointIds[1], knowledgePointIds[2]],
    [knowledgePointIds[0]], [knowledgePointIds[1], knowledgePointIds[2]], [knowledgePointIds[1], knowledgePointIds[2]],
  ],
};

const expectedSourceKnowledgePoints: Record<Difficulty, readonly (readonly string[])[]> = {
  basic: [
    [knowledgePointIds[0]], [knowledgePointIds[0]], [knowledgePointIds[0]], [knowledgePointIds[0]],
    [knowledgePointIds[0]], [knowledgePointIds[0]], [knowledgePointIds[0]], [knowledgePointIds[0]],
    [knowledgePointIds[1]], [knowledgePointIds[2]], [knowledgePointIds[1], knowledgePointIds[2]],
    [knowledgePointIds[1], knowledgePointIds[2]], [knowledgePointIds[1]],
    [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[2]], [knowledgePointIds[1], knowledgePointIds[2]],
    [knowledgePointIds[1]],
  ],
  advanced: [
    [knowledgePointIds[1]], [knowledgePointIds[2]], [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[2]],
    [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[2]], [knowledgePointIds[2]], [knowledgePointIds[0]],
    [knowledgePointIds[1], knowledgePointIds[2]], [knowledgePointIds[1], knowledgePointIds[2]],
    [knowledgePointIds[1]], [knowledgePointIds[2]], [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[2]],
    [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[2]], [knowledgePointIds[2]], [knowledgePointIds[0]],
    [knowledgePointIds[1], knowledgePointIds[2]], [knowledgePointIds[1], knowledgePointIds[2]],
  ],
  high: [
    [knowledgePointIds[0]], [knowledgePointIds[1]], [knowledgePointIds[2]],
    [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[2]], [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[2]],
    [knowledgePointIds[1], knowledgePointIds[2]], [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[2]], [knowledgePointIds[1]],
    [knowledgePointIds[1]], [knowledgePointIds[0]], [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[2]],
    [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[2]], [knowledgePointIds[2]], [knowledgePointIds[0]],
    [knowledgePointIds[0], knowledgePointIds[1], knowledgePointIds[2]], [knowledgePointIds[1]],
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

describe('Grade 2 Term 2 Math Unit 3 motion and symmetry', () => {
  it('accepts either order for the two independent movement observations', async () => {
    const unit = await loadUnit(sourceUnitId);
    const activity = Object.values(unit?.difficultyTracks ?? {})
      .flatMap(({ tasks }) => tasks)
      .flatMap(({ sessions }) => sessions.flatMap(({ activities }) => activities))
      .find(({ id }) => id === 'grade-2/term-2/math/unit-03/advanced/task-02/session-01/question-07');

    expect(activity?.kind).toBe('order');
    if (activity?.kind !== 'order') return;
    expect(activity.acceptedOrders).toHaveLength(1);
    expect(submitAnswer(activity, activity.correctOrder)).toBe(true);
    expect(submitAnswer(activity, activity.acceptedOrders?.[0])).toBe(true);
    expect(submitAnswer(activity, [
      activity.correctOrder[0], activity.correctOrder[3], activity.correctOrder[1], activity.correctOrder[2],
    ])).toBe(false);
  });

  it('audits the source-topic scope and adds 14 original candidates per difficulty', async () => {
    const unit = await loadUnit(sourceUnitId);
    expect(unit?.sourceTopics).toEqual(sourceTopics);
    expect(Object.values(unit!.difficultyTracks).flatMap((track) => track.tasks)).toHaveLength(6);
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const source = unit!.difficultyTracks[difficulty].tasks
        .flatMap((task) => task.sessions.flatMap((session) => session.activities));
      const supplemental = grade2Term2MathUnit03SupplementalActivities.filter((item) => item.difficulty === difficulty);
      expect(source).toHaveLength(16);
      expect(supplemental).toHaveLength(14);
      expect(source.length + supplemental.length).toBe(30);
    }
  });

  it('varies the basic questions instead of repeating the same movement template', () => {
    const activityById = new Map(grade2Term2MathUnit03SupplementalActivities
      .map(({ activity }) => [activity.id, activity]));
    const symmetryApplication = activityById.get('challenge-supplement-grade-2-term-2-math-unit-03-basic-03');
    const rotationApplication = activityById.get('challenge-supplement-grade-2-term-2-math-unit-03-basic-04');
    const translationProperty = activityById.get('challenge-supplement-grade-2-term-2-math-unit-03-basic-13');

    expect(symmetryApplication?.prompt).toContain('距离有什么关系');
    expect(rotationApplication?.prompt).toContain('旋转');
    expect(translationProperty?.prompt).toContain('大小和形状');
  });

  it('checks every original answer, KP plan, option, and taught-content boundary', () => {
    expect(grade2Term2MathUnit03SupplementalActivities).toHaveLength(42);
    expect(new Set(grade2Term2MathUnit03SupplementalActivities.map(({ activity }) => activity.id)).size).toBe(42);
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const authored = grade2Term2MathUnit03SupplementalActivities.filter((item) => item.difficulty === difficulty);
      expect(authored.map(({ activity }) => answerSummary(activity))).toEqual(expectedSupplementAnswers[difficulty]);
      authored.forEach(({ activity, sourceUnitId: activityUnitId, knowledgePointIds: mappedIds }, index) => {
        expect(activityUnitId).toBe(sourceUnitId);
        expect(mappedIds, activity.id).toEqual(expectedSupplementKnowledgePoints[difficulty][index]);
        expect(mappedIds.every((id) => knowledgePointIds.includes(id as (typeof knowledgePointIds)[number]))).toBe(true);
        expect(activity.options).toHaveLength(3);
        expect(new Set(activity.options.map(({ label }) => label)).size).toBe(3);
        expect(activity.hint.trim()).not.toBe('');
        expect(activity.explanation.trim()).not.toBe('');
        const correct = answerSummary(activity);
        expect(`${activity.prompt} ${activity.hint}`, activity.id).not.toContain(correct);
        expect(`${activity.prompt} ${activity.hint} ${activity.explanation}`, activity.id)
          .not.toMatch(/坐标|角度|度数|顺时针|逆时针|平行|垂直|对称中心|中心对称|旋转对称|放大|缩小/u);
      });
    }
  });

  it('audits all source and original mappings, fingerprints, group configuration, and review rows', async () => {
    const manifestPath = resolve(process.cwd(), 'src/challenges/content/pilot-manifest-grade2-term2-math-unit03.json');
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
    const unit = await loadUnit(sourceUnitId);
    const sourceActivities: ActivityDefinition[] = [];
    const sourceKnowledgePoints = new Map<string, string[]>();
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const source = unit!.difficultyTracks[difficulty].tasks
        .flatMap((task) => task.sessions.flatMap((session) => session.activities));
      expect(source).toHaveLength(expectedSourceKnowledgePoints[difficulty].length);
      source.forEach((activity, index) => sourceKnowledgePoints.set(activity.id, [...expectedSourceKnowledgePoints[difficulty][index]]));
      sourceActivities.push(...source);
    }
    const activities = [...sourceActivities, ...grade2Term2MathUnit03SupplementalActivities.map(({ activity }) => activity)];
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
      sourceUnitIds: [sourceUnitId],
      learningTaskUnitIds: [sourceUnitId],
      coreKnowledgePointIds: knowledgePointIds,
    });
    expect(group.definition.mappingEvidence.source).toContain('grade-2-textbook-inventory.md');
    expect(group.definition.mappingEvidence.notes).toContain('TapXWorld');
    expect(group.definition.mappingEvidence.notes).toContain('尚无独立教育者复核');
    expect(group.definition.tasks).toHaveLength(5);
    expect(group.definition.tasks.every(({ targetCount }) => targetCount === 15)).toBe(true);
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const plannedIds = group.definition.tasks.filter((task) => task.difficulty === difficulty)
        .flatMap(({ requiredKnowledgePointIds }) => requiredKnowledgePointIds);
      expect(new Set(plannedIds)).toEqual(new Set(knowledgePointIds));
    }
    expect(group.questionIds).toHaveLength(90);
    expect(new Set(group.questionIds)).toEqual(expectedIds);
    expect(new Set(manifest.questions.map(({ questionId }) => questionId))).toEqual(expectedIds);
    expect(new Set(manifest.questions.map(({ approvedContentFingerprint }) => approvedContentFingerprint))).toHaveLength(90);
    expect(rows).toHaveLength(90);
    expect(new Set(rows.map(({ 题目ID }) => 题目ID))).toEqual(expectedIds);
    expect(rows.every(({ 审核状态 }) => 审核状态.includes('作者逐题自审通过') && 审核状态.includes('未独立教育者复核'))).toBe(true);

    const activityByQuestionId = new Map(activities.map((activity) => [`challenge-question:${activity.id}`, activity]));
    const ledgerById = new Map(rows.map((row) => [row['题目ID'], row]));
    const supplementByActivityId = new Map(grade2Term2MathUnit03SupplementalActivities.map((item) => [item.activity.id, item]));
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
      expect(row['检查项']).toContain('唯一答案');
      expect(row['内容指纹']).toBe(question.approvedContentFingerprint);
    }
  });
});
