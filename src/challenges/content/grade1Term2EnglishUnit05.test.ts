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

const groupId = 'grade-1-term-2-english-unit-05';
const unitId = 'grade-1/term-2/english/unit-05';
const allowedKnowledgePoints = new Set([
  'drink-word-meanings', 'drink-category-classification',
  'drink-polite-requests', 'drink-request-word-order',
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

function displayCorrectAnswer(activity: ActivityDefinition): string {
  switch (activity.kind) {
    case 'choice': return activity.options.find(({ id }) => id === activity.correctOptionId)?.label ?? '';
    case 'match': return activity.pairs.map(({ left, right }) => `${left}—${right}`).join('；');
    case 'order': {
      const labels = new Map(activity.items.map(({ id, label }) => [id, label]));
      return activity.correctOrder.map((id) => labels.get(id) ?? id).join(' → ');
    }
    case 'categorize': {
      const categories = new Map(activity.categories.map(({ id, label }) => [id, label]));
      return activity.items.map(({ label, categoryId }) => `${label}—${categories.get(categoryId) ?? categoryId}`).join('；');
    }
    case 'measurement': return `${activity.targetLengthCm} 厘米`;
    case 'arithmetic': return `${activity.expression}=${activity.correctAnswer}`;
  }
}

describe('一年级下册英语第五单元闯关', () => {
  it('为 Drink 单元登记90道候选的独立挑战组', async () => {
    const unit = await loadUnit(unitId);
    expect(unit?.title).toBe('第五单元 · Drink');
    expect(unit?.sourceTopics).toEqual(['常见饮品和礼貌请求表达']);

    const group = manifest.groups.find(({ definition }) => definition.id === groupId);
    expect(group).toBeDefined();
    if (!group) return;

    expect(group.definition).toMatchObject({
      id: groupId,
      kind: 'unit',
      grade: 1,
      semester: 2,
      subject: 'english',
      sourceUnitIds: [unitId],
    });
    expect(group.questionIds).toHaveLength(90);
    expect(getPilotUnitChallengeGroupId(unitId)).toBe(groupId);
    expect(growthGroups.find(({ id }) => id === groupId)).toMatchObject({
      id: groupId, kind: 'unit', grade: 1, semester: 2, subject: 'english', sourceUnitIds: [unitId],
    });
    expect(JSON.stringify(growthGroups.find(({ id }) => id === groupId))).not.toMatch(/questionIds|questionId|prompt|answer/i);
  });

  it('只排除10道跨难度重复课程题并为48道源题标注饮品知识点', async () => {
    const unit = await loadUnit(unitId);
    expect(unit).toBeDefined();
    const sourceActivities = Object.values(unit!.difficultyTracks).flatMap((track) =>
      track.tasks.flatMap((task) => task.sessions.flatMap((session) => session.activities)));
    expect(sourceActivities).toHaveLength(48);

    const sourceMappings = sourceActivities.map((activity) => derivePilotQuestionKnowledgePointIds(unitId, activity));
    expect(sourceMappings.every((ids) => ids.length > 0)).toBe(true);
    expect(sourceMappings.flat().every((id) => allowedKnowledgePoints.has(id))).toBe(true);
    expect(new Set(sourceMappings.flat())).toEqual(allowedKnowledgePoints);

    const group = manifest.groups.find(({ definition }) => definition.id === groupId);
    expect(group).toBeDefined();
    if (!group) return;
    const excluded = new Set(excludedRepeatedSourceIds);
    const retainedIds = group.questionIds.map((id) => id.replace('challenge-question:', ''))
      .filter((id) => id.startsWith(`${unitId}/`));
    expect(retainedIds).toHaveLength(38);
    expect(retainedIds).not.toEqual(expect.arrayContaining(excludedRepeatedSourceIds));
    expect(sourceActivities.filter(({ id }) => excluded.has(id))).toHaveLength(10);
  });

  it('逐题核对52道原创题的答案、提示、知识点和难度', async () => {
    const loadedContent = await loadPilotChallengeContent();
    const loaded = loadedContent.groups.find(({ group }) => group.definition.id === groupId);
    expect(loaded?.status).toBe('ready');
    expect(loaded?.candidates).toHaveLength(90);
    if (!loaded) return;

    const supplements = loaded.candidates.filter(({ questionId }) =>
      questionId.startsWith('challenge-question:challenge-supplement-grade-1-term-2-english-unit-05-'));
    expect(supplements).toHaveLength(52);
    const expectedAnswers = {
      basic: [
        '水', 'juice', '牛奶', 'tea', 'water 和 milk', '礼貌请求句', '我可以喝点水吗？',
        'Can I have juice?', 'Can I have milk?', 'Can I have water?', 'Can I have tea?',
        '礼貌地请求牛奶', 'Can I have tea?', 'Can I have water?',
      ],
      advanced: [
        '牛奶和茶', '“Can I have juice?”是请求喝果汁', 'milk—牛奶；water—水', 'water 和 juice',
        '礼貌请求句', '我可以喝点牛奶吗？', 'Can I have tea?', 'Can I have water? 和 Can I have tea?',
        'juice—果汁', 'Can I have milk?', 'Can I have water?', '我可以喝点牛奶吗？',
        'A保留 milk—牛奶；B改为 tea—茶', '两句都在礼貌地请求饮品',
        'water 是饮品词，Can I have water? 是礼貌请求', 'Can I have juice?',
        'Can I have tea?', 'water 和 milk；Can I have tea?', '“Can I have tea?”用于礼貌地要茶',
        '饮品词语和礼貌请求句',
      ],
      high: [
        'water—水；Can I have tea?—礼貌请求', 'juice—果汁；Can I have milk?',
        'milk—牛奶；Can I have milk?', 'tea—茶；Can I have water?',
        'water、juice、milk、tea；Can I have water?、Can I have tea?',
        'Can I have milk?', '“Can I have water?”应译为“我可以喝点水吗？”',
        'Can I have juice?；water', 'Can I have milk?；tea',
        '“Can I have tea?”表示礼貌地请求喝茶', '水、果汁、牛奶、茶',
        'Can I have water? 和 Can I have tea?', '“Can I have juice?”是礼貌请求；juice 是果汁',
        'Can I have tea?', '饮品词 water；请求句 Can I have milk?',
        'tea—茶；juice—果汁；Can I have milk?', 'Can I have water?；Can I have tea?',
        'water—饮品词语；Can I have water?—礼貌请求句',
      ],
    } as const;

    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const entries = supplements.filter(({ difficulty: candidateDifficulty }) => candidateDifficulty === difficulty);
      const answers = entries.map(({ activity }) => activity.kind === 'choice'
        ? activity.options.find(({ id }) => id === activity.correctOptionId)?.label
        : undefined);
      expect(entries).toHaveLength({ basic: 14, advanced: 20, high: 18 }[difficulty]);
      expect(answers).toEqual(expectedAnswers[difficulty]);
      expect(new Set(entries.map(({ activity }) => activity.prompt)).size).toBe(entries.length);
      expect(JSON.stringify(entries)).not.toMatch(/a (?:book|ruler|chair)/iu);

      const answerPositions = [0, 0, 0];
      for (const { activity, knowledgePointIds } of entries) {
        expect(activity.kind).toBe('choice');
        if (activity.kind !== 'choice') continue;
        expect(activity.options).toHaveLength(3);
        expect(new Set(activity.options.map(({ label }) => label)).size).toBe(3);
        expect(knowledgePointIds.length).toBeGreaterThan(0);
        expect(knowledgePointIds.every((id) => allowedKnowledgePoints.has(id))).toBe(true);
        const answerIndex = activity.options.findIndex(({ id }) => id === activity.correctOptionId);
        answerPositions[answerIndex] += 1;
        expect(activity.hint).not.toContain(activity.options[answerIndex]?.label ?? '');
        expect(submitAnswer(activity, activity.correctOptionId)).toBe(true);
      }
      expect(Math.max(...answerPositions) - Math.min(...answerPositions)).toBeLessThanOrEqual(1);
    }
  });

  it('核对90道候选与中文自审台账逐题一致', async () => {
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
      expect(row['正确选项'], row['题目ID']).toBe(displayCorrectAnswer(candidate!.activity));
      expect(submitAnswer(candidate!.activity, knownCorrectAnswer(candidate!.activity)), row['题目ID']).toBe(true);
    }

    const fingerprints = await Promise.all(loaded!.candidates.map(({ activity }) => fingerprintActivity(activity)));
    expect(new Set(fingerprints).size).toBe(90);
  });
});
