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

const groupId = 'grade-1-term-2-english-unit-06';
const unitId = 'grade-1/term-2/english/unit-06';
const allowedKnowledgePoints = new Set([
  'clothes-word-meanings', 'clothes-category-classification',
  'clothes-description-sentences', 'clothes-description-word-order',
]);
const excludedRepeatedSourceIds = [
  `${unitId}/advanced/task-01/session-01/question-01`,
  `${unitId}/advanced/task-01/session-01/question-02`,
  `${unitId}/advanced/task-01/session-01/question-05`,
  `${unitId}/advanced/task-01/session-01/question-06`,
  `${unitId}/advanced/task-02/session-01/question-02`,
  `${unitId}/advanced/task-02/session-01/question-01`,
  `${unitId}/advanced/task-02/session-01/question-05`,
  `${unitId}/advanced/task-02/session-01/question-06`,
  `${unitId}/high/task-01/session-01/question-05`,
  `${unitId}/high/task-01/session-01/question-06`,
  `${unitId}/high/task-01/session-01/question-07`,
  `${unitId}/high/task-02/session-01/question-05`,
  `${unitId}/high/task-02/session-01/question-06`,
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

describe('一年级下册英语第六单元闯关', () => {
  it('为 Clothes 单元登记90道候选的独立挑战组', async () => {
    const unit = await loadUnit(unitId);
    expect(unit?.title).toBe('第六单元 · Clothes');
    expect(unit?.sourceTopics).toEqual(['常见衣物名称和颜色描述']);

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

  it('只排除14道跨难度重复课程题并为48道源题标注衣物知识点', async () => {
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
    expect(retainedIds).toHaveLength(34);
    expect(retainedIds).not.toEqual(expect.arrayContaining(excludedRepeatedSourceIds));
    expect(sourceActivities.filter(({ id }) => excluded.has(id))).toHaveLength(14);
  });

  it('逐题核对56道原创题的答案、提示、知识点和难度', async () => {
    const loadedContent = await loadPilotChallengeContent();
    const loaded = loadedContent.groups.find(({ group }) => group.definition.id === groupId);
    expect(loaded?.status).toBe('ready');
    expect(loaded?.candidates).toHaveLength(90);
    if (!loaded) return;

    const supplements = loaded.candidates.filter(({ questionId }) =>
      questionId.startsWith('challenge-question:challenge-supplement-grade-1-term-2-english-unit-06-'));
    expect(supplements).toHaveLength(56);
    const expectedAnswers = {
      basic: [
        '衬衫', 'T-shirt', '裙子', 'dress', '袜子', 'shorts', 'shirt 和 T-shirt',
        'skirt 和 dress', '这是我的衬衫。', 'This is my T-shirt.', 'skirt', 'dress', 'shirt', 'dress',
      ],
      advanced: [
        '衬衫和 T 恤衫', 'skirt—裙子；dress—连衣裙', '上衣', 'socks 和 shorts',
        'This is my skirt.', '把 skirt 换成 dress', '衬衫', 'T 恤衫', 'shirt—衬衫',
        'socks—袜子；shorts—短裤', '把“裙子”改成“衬衫”', 'T 恤衫', '其他衣物',
        'T-shirt 和 dress', 'shirt', 'This is my dress.', '把 skirt 换成 T-shirt',
        'T 恤衫和连衣裙', 'shirt—上衣；skirt—其他衣物', 'shirt；This is my shirt.',
        '连衣裙', '裙子',
      ],
      high: [
        'skirt—裙子；dress—连衣裙', 'skirt', 'dress', '两张都应改放到“其他衣物”',
        'skirt', '其他衣物', 'shirt—衬衫；T-shirt—T 恤衫', '这是我的 T 恤衫。',
        'This is my dress.', 'shirt，意思是衬衫', 'T-shirt；socks', '把 dress 换成 skirt',
        'shirt 和 T-shirt 是上衣；dress 和 shorts 是其他衣物',
        'This is my shirt.；shirt', 'This is my shirt.', 'This is my T-shirt.',
        'This is my skirt.', 'shorts—短裤；shirt—衬衫', '把 shirt 换成 T-shirt',
        '句子中的 T-shirt 与目标衣物一致',
      ],
    } as const;

    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const entries = supplements.filter(({ difficulty: candidateDifficulty }) => candidateDifficulty === difficulty);
      const answers = entries.map(({ activity }) => activity.kind === 'choice'
        ? activity.options.find(({ id }) => id === activity.correctOptionId)?.label
        : undefined);
      expect(entries).toHaveLength({ basic: 14, advanced: 22, high: 20 }[difficulty]);
      expect(answers).toEqual(expectedAnswers[difficulty]);
      expect(new Set(entries.map(({ activity }) => activity.prompt)).size).toBe(entries.length);
      expect(JSON.stringify(entries)).not.toMatch(/\b(?:water|juice|milk|tea|book|ruler|chair)\b/iu);

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
