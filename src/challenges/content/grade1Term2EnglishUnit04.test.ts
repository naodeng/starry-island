import { describe, expect, it } from 'vitest';
// @ts-expect-error Node built-ins are available in Vitest, while this browser-first tsconfig omits @types/node.
import { existsSync, readFileSync } from 'node:fs';
// @ts-expect-error Node built-ins are available in Vitest, while this browser-first tsconfig omits @types/node.
import { resolve } from 'node:path';
import type { ActivityDefinition } from '../../content/types';
import { loadUnit } from '../../content/unitLoader';
import { submitAnswer } from '../../learning/answers';
import { derivePilotQuestionKnowledgePointIds } from './pilotQuestionKnowledgePoints';
import { fingerprintActivity } from './fingerprint';
import { loadPilotChallengeContent } from './pilotContent';
import manifest from './pilotManifest';
import { getPilotUnitChallengeGroupId } from './unitLinks';
import { growthGroups } from './growthGroups';
import { grade1Term2EnglishUnit04SupplementalActivities } from './grade1Term2EnglishUnit04SupplementalActivities';

const groupId = 'grade-1-term-2-english-unit-04';
const unitId = 'grade-1/term-2/english/unit-04';
const allowedKnowledgePoints = new Set([
  'food-word-meanings', 'food-category-classification',
  'food-preference-expressions', 'food-sentence-word-order',
]);
const excludedRepeatedSourceIds = [
  `${unitId}/advanced/task-01/session-01/question-01`,
  `${unitId}/advanced/task-01/session-01/question-02`,
  `${unitId}/advanced/task-01/session-01/question-05`,
  `${unitId}/advanced/task-02/session-01/question-01`,
  `${unitId}/advanced/task-02/session-01/question-02`,
  `${unitId}/advanced/task-02/session-01/question-05`,
  `${unitId}/high/task-01/session-01/question-05`,
  `${unitId}/high/task-01/session-01/question-07`,
  `${unitId}/high/task-02/session-01/question-05`,
  `${unitId}/high/task-02/session-01/question-07`,
];
declare const process: { cwd(): string };

function readTsv(path: string): Array<Record<string, string>> {
  const lines = readFileSync(path, 'utf8').trim().split(/\r?\n/u) as string[];
  const [headerLine = '', ...dataLines] = lines;
  const headers = headerLine.replace(/^\uFEFF/u, '').split('\t');
  return dataLines.map((line: string) => {
    const values = line.split('\t');
    return Object.fromEntries(headers.map((header: string, index: number) => [header, values[index] ?? '']));
  });
}

function knownCorrectAnswer(activity: ActivityDefinition): Parameters<typeof submitAnswer>[1] {
  switch (activity.kind) {
    case 'choice': return activity.correctOptionId;
    case 'match': return Object.fromEntries(activity.pairs.map(({ id }) => [id, id]));
    case 'order': return activity.correctOrder;
    case 'categorize': return Object.fromEntries(activity.items.map(({ id, categoryId }) => [id, categoryId]));
    case 'measurement': return activity.targetLengthCm;
    case 'arithmetic': return activity.correctAnswer;
  }
}

describe('一年级下册英语第四单元闯关', () => {
  it('映射48道课程活动到本单元知识点，排除10道跨难度重复并与原创题保持指纹唯一', async () => {
    const unit = await loadUnit(unitId);
    expect(unit).toBeDefined();
    const sourceActivities = Object.values(unit!.difficultyTracks).flatMap((track) =>
      track.tasks.flatMap((task) => task.sessions.flatMap((session) => session.activities)));
    expect(sourceActivities).toHaveLength(48);

    const mapped = sourceActivities.map((activity) => derivePilotQuestionKnowledgePointIds(unitId, activity));
    expect(mapped.every((ids) => ids.length > 0)).toBe(true);
    expect(mapped.flat().every((id) => allowedKnowledgePoints.has(id))).toBe(true);
    expect(new Set(mapped.flat())).toEqual(allowedKnowledgePoints);

    const excluded = new Set(excludedRepeatedSourceIds);
    const challengeSourceActivities = sourceActivities.filter((activity) => !excluded.has(activity.id));
    expect(challengeSourceActivities).toHaveLength(38);
    expect(grade1Term2EnglishUnit04SupplementalActivities).toHaveLength(52);
    const candidates = [
      ...challengeSourceActivities,
      ...grade1Term2EnglishUnit04SupplementalActivities.map(({ activity }) => activity),
    ];
    const fingerprints = await Promise.all(candidates.map((activity) => fingerprintActivity(activity)));
    expect(new Set(fingerprints).size).toBe(90);
  });

  it('复核52道原创题的答案、选项、提示、知识点及难度分布', () => {
    const expectedAnswers = {
      basic: [
        '米饭', 'noodles', '鸡肉', 'egg', '米饭或面条', '其他食物', '你喜欢面条吗？', 'Yes, I do.',
        '不，我不喜欢。', 'Do you like rice?', 'Do you like chicken?', 'Yes, I do.',
        'noodles—面条', 'chicken 和 egg',
      ],
      advanced: [
        'chicken—鸡肉；egg—鸡蛋', '其他食物', 'rice 和 noodles；chicken', 'Do you like chicken?',
        'Yes, I do.', '前者是否定回答，后者是肯定回答', 'Do you like noodles?', '你喜欢鸡蛋吗？',
        'rice 和 noodles', 'Do you like chicken?', '鸡蛋', 'vegetable 属于其他食物，rice 属于米饭或面条组',
        'Do you like noodles?—你喜欢面条吗？', 'Do you like rice?',
        'rice 和 noodles', 'noodles 和 egg', 'Do you like chicken? — Yes, I do.', 'Do you like fish?',
        'egg 表示鸡蛋；A问的正是B这句话', 'Do you like fish? — No, I don’t.',
      ],
      high: [
        'A：rice、noodles；B：chicken、egg', 'A: Do you like rice? B: Yes, I do.', 'Do you like egg?',
        'Do you like chicken? — Yes, I do.', 'rice 放回米饭或面条组，egg 放入其他食物组',
        'A表示肯定，B表示否定', 'Do you like egg? — No, I don’t.', '米饭、面条、鸡肉',
        'rice、noodles；vegetable、fish、chicken、egg', 'Do you like noodles?',
        'chicken 是鸡肉；这句问“你喜欢鸡肉吗？”', 'Do you like noodles? — Yes, I do.',
        'A和B都正确', 'Do you like rice?',
        '选 noodles；问 Do you like egg?', 'rice 和 vegetable',
        'A问是否喜欢面条，B回答不喜欢', '两条记录都正确',
      ],
    } as const;

    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const entries = grade1Term2EnglishUnit04SupplementalActivities.filter((item) => item.difficulty === difficulty);
      const answers = entries.map(({ activity }) => activity.options.find(({ id }) => id === activity.correctOptionId)?.label);
      expect(entries).toHaveLength({ basic: 14, advanced: 20, high: 18 }[difficulty]);
      expect(new Set(entries.map(({ activity }) => activity.prompt)).size).toBe(entries.length);
      expect(answers).toEqual(expectedAnswers[difficulty]);

      const answerPositions = [0, 0, 0];
      for (const { activity, knowledgePointIds } of entries) {
        expect(activity.options).toHaveLength(3);
        expect(new Set(activity.options.map(({ label }) => label)).size).toBe(3);
        expect(knowledgePointIds.length).toBeGreaterThan(0);
        expect(knowledgePointIds.every((id) => allowedKnowledgePoints.has(id))).toBe(true);
        const answerIndex = activity.options.findIndex(({ id }) => id === activity.correctOptionId);
        answerPositions[answerIndex] += 1;
        expect(activity.hint).not.toContain(activity.options[answerIndex]?.label ?? '');
      }
      expect(Math.max(...answerPositions) - Math.min(...answerPositions)).toBeLessThanOrEqual(1);
    }
  });

  it('登记课程入口、成长索引和90道候选题', () => {
    const group = manifest.groups.find(({ definition }) => definition.id === groupId);
    expect(group).toBeDefined();
    if (!group) return;

    expect(group.definition).toMatchObject({
      id: groupId, kind: 'unit', grade: 1, semester: 2, subject: 'english', sourceUnitIds: [unitId],
    });
    expect(getPilotUnitChallengeGroupId(unitId)).toBe(groupId);
    expect(group.questionIds).toHaveLength(90);
    const ids = group.questionIds.map((id) => id.replace('challenge-question:', ''));
    expect(ids.filter((id) => id.startsWith(`${unitId}/`))).toHaveLength(38);
    expect(ids.filter((id) => id.startsWith('challenge-supplement-grade-1-term-2-english-unit-04-'))).toHaveLength(52);
    expect(ids).not.toEqual(expect.arrayContaining(excludedRepeatedSourceIds));
    expect(growthGroups.find(({ id }) => id === groupId)).toMatchObject({
      id: groupId, kind: 'unit', grade: 1, semester: 2, subject: 'english', sourceUnitIds: [unitId],
    });
    expect(JSON.stringify(growthGroups.find(({ id }) => id === groupId))).not.toMatch(/questionIds|questionId|prompt|answer/i);
  });

  it('逐题对应中文作者自审台账并能通过实际评分器', async () => {
    const loadedContent = await loadPilotChallengeContent();
    const loaded = loadedContent.groups.find(({ group }) => group.definition.id === groupId);
    const group = manifest.groups.find(({ definition }) => definition.id === groupId);
    const candidatesById = new Map((loaded?.candidates ?? []).map((candidate) => [candidate.questionId, candidate]));
    const ledgerPath = resolve(process.cwd(), `docs/challenges/${groupId}-question-review.tsv`);
    expect(existsSync(ledgerPath)).toBe(true);
    if (!existsSync(ledgerPath)) return;

    expect(loaded?.status).toBe('ready');
    expect(group).toBeDefined();
    if (!group) return;
    expect(loaded?.candidates).toHaveLength(90);
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      expect(loaded?.candidates.filter((candidate) => candidate.difficulty === difficulty)).toHaveLength(30);
    }
    const rows = readTsv(ledgerPath);
    expect(rows).toHaveLength(90);
    expect(new Set(rows.map(({ 题目ID }) => 题目ID))).toEqual(new Set(group.questionIds));
    expect(rows.every(({ 审核状态 }) => 审核状态.includes('作者自审通过') && 审核状态.includes('未独立教育者复核'))).toBe(true);
    for (const row of rows) {
      const candidate = candidatesById.get(row['题目ID']);
      expect(candidate, row['题目ID']).toBeDefined();
      expect(candidate!.knowledgePointIds.length, row['题目ID']).toBeGreaterThan(0);
      expect(submitAnswer(candidate!.activity, knownCorrectAnswer(candidate!.activity)), row['题目ID']).toBe(true);
    }
  });
});
