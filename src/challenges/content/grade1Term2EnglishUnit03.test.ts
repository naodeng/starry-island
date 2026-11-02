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
import { grade1Term2EnglishUnit03SupplementalActivities } from './grade1Term2EnglishUnit03SupplementalActivities';

const groupId = 'grade-1-term-2-english-unit-03';
const unitId = 'grade-1/term-2/english/unit-03';
const allowedKnowledgePoints = new Set([
  'toy-word-meanings', 'toy-type-classification',
  'toy-description-sentences', 'toy-sentence-word-order',
]);
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

describe('一年级下册英语第三单元闯关', () => {
  it('把48道课程活动映射到本单元四个知识点，挑战池排除重复课程题', async () => {
    const unit = await loadUnit(unitId);
    expect(unit).toBeDefined();
    const sourceActivities = Object.values(unit!.difficultyTracks).flatMap((track) =>
      track.tasks.flatMap((task) => task.sessions.flatMap((session) => session.activities)));
    expect(sourceActivities).toHaveLength(48);

    for (const activity of sourceActivities) {
      const mapped = derivePilotQuestionKnowledgePointIds(unitId, activity);
      expect(mapped.length, activity.id).toBeGreaterThan(0);
      expect(mapped.every((id) => allowedKnowledgePoints.has(id)), activity.id).toBe(true);
    }
    expect(new Set(sourceActivities.flatMap((activity) => derivePilotQuestionKnowledgePointIds(unitId, activity)))).toEqual(allowedKnowledgePoints);

    const questionIds = manifest.groups.find(({ definition }) => definition.id === groupId)?.questionIds ?? [];
    const activitiesById = new Map([
      ...sourceActivities,
      ...grade1Term2EnglishUnit03SupplementalActivities.map(({ activity }) => activity),
    ].map((activity) => [`challenge-question:${activity.id}`, activity]));
    const candidateActivities = questionIds.map((questionId) => activitiesById.get(questionId)).filter((activity): activity is ActivityDefinition => activity !== undefined);
    const fingerprints = await Promise.all(candidateActivities.map((activity) => fingerprintActivity(activity)));
    expect(fingerprints).toHaveLength(90);
    expect(new Set(fingerprints).size).toBe(90);
  });

  it('复核52道原创题的答案、选项、提示和难度分布', () => {
    const expectedAnswers = {
      basic: [
        '球', '玩偶', '火车', '飞机', '玩具熊', '小汽车', 'ball、doll 和 bear', 'train、car 和 plane',
        'ball', '它是一架飞机。', 'This is a doll.', 'It is a train.', 'This is a doll.', 'This is a bear.',
      ],
      advanced: [
        'car', 'ball 和 bear', '这是一列火车。', 'It is a plane.', 'ball、doll 和 bear', '它们都是交通工具玩具。',
        'This is a bear.', '一个玩偶', 'It is a train.', 'This is a plane.', '飞机', '这是一辆小汽车。',
        'bear—玩具熊；train—火车', 'This is a ball.',
        'ball 和 doll', 'bear 和 car', 'It is a car.', 'It is a doll.', 'plane 和 doll', 'It is a bear.',
      ],
      high: [
        'A 是一个玩偶；B 是一架飞机。', 'train、car、plane', '他手里的球。', 'This is a plane.', 'doll 和 train',
        '它是一架飞机。', 'This is a bear.', 'It is a doll.', 'train',
        'This is a ball. — 这是一个球。',
        'ball、doll、bear 是其他玩具；train、car、plane 是交通工具玩具',
        'This is a bear.', 'It is a plane.',
        'car—小汽车；This is a car.—这是一辆小汽车。',
        'A 和 C', 'train 和 plane', 'This is a car.', '玩具熊。',
      ],
    } as const;

    expect(grade1Term2EnglishUnit03SupplementalActivities).toHaveLength(52);
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const entries = grade1Term2EnglishUnit03SupplementalActivities.filter((item) => item.difficulty === difficulty);
      const correctAnswers = entries.map(({ activity }) => activity.options.find(({ id }) => id === activity.correctOptionId)?.label);
      expect(entries).toHaveLength({ basic: 14, advanced: 20, high: 18 }[difficulty]);
      expect(new Set(entries.map(({ activity }) => activity.prompt)).size).toBe(entries.length);
      expect(correctAnswers).toEqual(expectedAnswers[difficulty]);

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
      id: groupId,
      kind: 'unit',
      grade: 1,
      semester: 2,
      subject: 'english',
      sourceUnitIds: [unitId],
    });
    expect(getPilotUnitChallengeGroupId(unitId)).toBe(groupId);
    expect(group.questionIds).toHaveLength(90);
    const ids = group.questionIds.map((id) => id.replace('challenge-question:', ''));
    expect(ids.filter((id) => id.startsWith(`${unitId}/`))).toHaveLength(38);
    expect(ids.filter((id) => id.startsWith('challenge-supplement-grade-1-term-2-english-unit-03-'))).toHaveLength(52);
    expect(ids).not.toEqual(expect.arrayContaining([
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
    ]));
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
