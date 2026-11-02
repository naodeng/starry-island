import { describe, expect, it } from 'vitest';
// @ts-expect-error Node.js reads the author self-review ledger in a local test.
import { existsSync, readFileSync } from 'node:fs';
// @ts-expect-error Node.js resolves the self-review ledger from the project root.
import { resolve } from 'node:path';
import type { ActivityDefinition } from '../../content/types';
import { loadUnit } from '../../content/unitLoader';
import { derivePilotQuestionKnowledgePointIds } from './pilotQuestionKnowledgePoints';
import { fingerprintActivity } from './fingerprint';
import { loadPilotChallengeContent } from './pilotContent';
import manifest from './pilotManifest';
import { getPilotUnitChallengeGroupId } from './unitLinks';
import { growthGroups } from './growthGroups';
import { grade1Term2EnglishUnit02SupplementalActivities } from './grade1Term2EnglishUnit02SupplementalActivities';

const groupId = 'grade-1-term-2-english-unit-02';
const unitId = 'grade-1/term-2/english/unit-02';
const allowedKnowledgePoints = new Set([
  'room-object-vocabulary', 'position-word-vocabulary',
  'room-location-sentences', 'room-sentence-word-order',
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

function expectedAnswerSummary(activity: ActivityDefinition): string {
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
    case 'measurement':
      return String(activity.targetLengthCm);
    case 'arithmetic':
      return String(activity.correctAnswer);
  }
}

describe('一年级下册英语第二单元闯关', () => {
  it('将38道不重复的课程活动映射到本单元四个知识点', async () => {
    const unit = await loadUnit(unitId);
    expect(unit).toBeDefined();
    const activities = Object.values(unit!.difficultyTracks).flatMap((track) =>
      track.tasks.flatMap((task) => task.sessions.flatMap((session) => session.activities)));
    expect(activities).toHaveLength(48);

    const courseQuestions = activities.filter((activity) => ![
      `${unitId}/advanced/task-02/session-01/question-02`,
      `${unitId}/advanced/task-01/session-01/question-01`,
      `${unitId}/advanced/task-01/session-01/question-05`,
      `${unitId}/high/task-01/session-01/question-05`,
      `${unitId}/advanced/task-01/session-01/question-02`,
      `${unitId}/advanced/task-02/session-01/question-01`,
      `${unitId}/advanced/task-02/session-01/question-05`,
      `${unitId}/high/task-02/session-01/question-05`,
      `${unitId}/high/task-01/session-01/question-07`,
      `${unitId}/high/task-02/session-01/question-07`,
    ].includes(activity.id));
    expect(courseQuestions).toHaveLength(38);
    const ids = courseQuestions.flatMap((activity) => derivePilotQuestionKnowledgePointIds(unitId, activity));
    expect(ids.length).toBeGreaterThan(0);
    for (const activity of courseQuestions) {
      const mapped = derivePilotQuestionKnowledgePointIds(unitId, activity);
      expect(mapped.length, activity.id).toBeGreaterThan(0);
      expect(mapped.every((id) => allowedKnowledgePoints.has(id)), activity.id).toBe(true);
    }

    const candidateFingerprints = await Promise.all([
      ...courseQuestions,
      ...grade1Term2EnglishUnit02SupplementalActivities.map(({ activity }) => activity),
    ].map((activity) => fingerprintActivity(activity)));
    expect(new Set(candidateFingerprints).size).toBe(candidateFingerprints.length);
  });

  it('核对52道原创题的答案、选项、提示和难度分布', () => {
    const expectedAnswers = {
      basic: [
        '灯', 'bed', '门', 'box', 'bed', '旁边或靠近', '在……后面', '在床旁边', '在门后面', 'box', 'near',
        'light—灯', 'The box is behind the door.', '位置词',
      ],
      advanced: [
        '盒子在床旁边', 'The box is behind the door.', 'The box is near the bed.', '把 behind 改成 near', 'light 和 door',
        '床在门旁边', 'behind', 'The bed is behind the door.', '门', 'The light is near the door.',
        'bed 是房间物品，behind 是位置词', '盒子和它的位置说明', '盒子靠近门', 'The box is behind the door.',
        'light—灯，bed—床，door—门，box—盒子', 'near 表示靠近或在旁边', '床在灯后面',
        'The light is near the door.', '都在说盒子相对床的位置', 'box、door 和 behind',
      ],
      high: [
        '盒子在床旁边，床在门后面', 'The light is near the door. The box is behind the bed.',
        'bed 是房间物品，near 是位置词', 'The box is near the door.',
        '主语和参照物顺序反了，草稿说的是灯在床后面', 'The bed is behind the light.', 'The box is behind the door.',
        'near 和 behind 表示不同位置', 'The bed is near the door. The box is behind the light.',
        '门在盒子后面', 'The box is near the door.', 'The light is behind the bed.',
        'The box is near the bed.', 'box、door 是房间物品；behind 是位置词', 'The bed is behind the light.',
        'The bed is behind the door.；The box is near the light.', '盒子在床旁边',
        'The light is near the door. The bed is behind the box.',
      ],
    } as const;

    expect(grade1Term2EnglishUnit02SupplementalActivities).toHaveLength(52);
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const entries = grade1Term2EnglishUnit02SupplementalActivities.filter((item) => item.difficulty === difficulty);
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
        const answer = activity.options[answerIndex]?.label ?? '';
        expect(activity.hint).not.toContain(answer);
      }
      expect(Math.max(...answerPositions) - Math.min(...answerPositions)).toBeLessThanOrEqual(1);
    }

    const directionalRelationQuestion = grade1Term2EnglishUnit02SupplementalActivities
      .find(({ activity }) => activity.id.endsWith('-high-05'))!.activity;
    expect(directionalRelationQuestion.prompt).toContain('床在灯后面');
    expect(directionalRelationQuestion.explanation).toContain('却表示灯在床后面');
    const sentenceOrderQuestion = grade1Term2EnglishUnit02SupplementalActivities
      .find(({ activity }) => activity.id.endsWith('-high-07'))!.activity;
    expect(sentenceOrderQuestion.options.map(({ label }) => label)).not.toContain('Behind the door is the box .');
  });

  it('登记课程入口、成长索引和90道候选题，且不加入10道重复课程题', () => {
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
    expect(ids.filter((id) => id.startsWith('challenge-supplement-grade-1-term-2-english-unit-02-'))).toHaveLength(52);
    const excluded = [
      `${unitId}/advanced/task-02/session-01/question-02`,
      `${unitId}/advanced/task-01/session-01/question-01`,
      `${unitId}/advanced/task-01/session-01/question-05`,
      `${unitId}/high/task-01/session-01/question-05`,
      `${unitId}/advanced/task-01/session-01/question-02`,
      `${unitId}/advanced/task-02/session-01/question-01`,
      `${unitId}/advanced/task-02/session-01/question-05`,
      `${unitId}/high/task-02/session-01/question-05`,
      `${unitId}/high/task-01/session-01/question-07`,
      `${unitId}/high/task-02/session-01/question-07`,
    ];
    expect(ids).not.toEqual(expect.arrayContaining(excluded));
    expect(growthGroups.find(({ id }) => id === groupId)).toMatchObject({
      id: groupId, kind: 'unit', grade: 1, semester: 2, subject: 'english', sourceUnitIds: [unitId],
    });
    expect(JSON.stringify(growthGroups.find(({ id }) => id === groupId))).not.toMatch(/questionIds|questionId|prompt|answer/i);
  });

  it('把90道就绪候选逐题对应到中文自审台账', async () => {
    const loadedContent = await loadPilotChallengeContent();
    const loaded = loadedContent.groups.find(({ group }) => group.definition.id === groupId);
    const candidatesById = new Map((loaded?.candidates ?? []).map((candidate) => [candidate.questionId, candidate]));
    const ledgerPath = resolve(process.cwd(), `docs/challenges/${groupId}-question-review.tsv`);
    expect(existsSync(ledgerPath)).toBe(true);
    if (!existsSync(ledgerPath)) return;

    expect(loaded?.status).toBe('ready');
    expect(loaded?.candidates).toHaveLength(90);
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      expect(loaded?.candidates.filter((candidate) => candidate.difficulty === difficulty)).toHaveLength(30);
    }
    const rows = readTsv(ledgerPath);
    expect(rows.map(({ 题目ID }) => 题目ID)).toHaveLength(90);
    expect(new Set(rows.map(({ 题目ID }) => 题目ID))).toEqual(new Set(manifest.groups.find(({ definition }) => definition.id === groupId)?.questionIds));
    expect(rows.every(({ 审核状态 }) => 审核状态.includes('作者自审通过') && 审核状态.includes('未独立教育者复核'))).toBe(true);
    for (const row of rows) {
      const candidate = candidatesById.get(row['题目ID']);
      expect(candidate, row['题目ID']).toBeDefined();
      expect(row['正确选项'], row['题目ID']).toBe(expectedAnswerSummary(candidate!.activity));
      expect(row['知识点'], row['题目ID']).not.toBe('');
      expect(candidate!.knowledgePointIds.length, row['题目ID']).toBeGreaterThan(0);
    }
  });
});
