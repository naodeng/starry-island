import { describe, expect, it } from 'vitest';
// @ts-expect-error Node.js is used only to inspect the review ledger during Vitest.
import { existsSync, readFileSync } from 'node:fs';
// @ts-expect-error Node.js paths are used only to locate the review ledger during Vitest.
import { resolve } from 'node:path';
import type { ActivityDefinition } from '../../content/types';
import { submitAnswer } from '../../learning/answers';
import { loadUnit } from '../../content/unitLoader';
import { loadChallengeQualityInputs } from './qualityInputs';
import { fingerprintActivity } from './fingerprint';
import { analyzeQuestionUniqueness } from './questionUniqueness';
import { growthGroups } from './growthGroups';
import { loadPilotChallengeContent } from './pilotContent';
import manifest from './pilotManifest';
import { getPilotUnitChallengeGroupId } from './unitLinks';
import { derivePilotQuestionKnowledgePointIds } from './pilotQuestionKnowledgePoints';
import { grade2Term1EnglishUnit05SupplementalActivities } from './grade2Term1EnglishUnit05SupplementalActivities';

const sourceUnitId = 'grade-2/term-1/english/unit-05';
const groupId = 'grade-2-term-1-english-unit-05';
const coreKnowledgePointIds = [
  'park-and-nature-vocabulary',
  'can-see-sentences',
  'questions-about-objects-and-observations',
];
const excludedDuplicateActivityIds = [
  sourceUnitId + '/advanced/task-02/session-01/question-01',
  sourceUnitId + '/advanced/task-02/session-01/question-02',
  sourceUnitId + '/advanced/task-02/session-01/question-03',
  sourceUnitId + '/advanced/task-02/session-01/question-04',
  sourceUnitId + '/high/task-01/session-01/question-03',
  sourceUnitId + '/high/task-02/session-01/question-08',
];
declare const process: { cwd(): string };

const expectedSupplementAnswers = {
  basic: [
    '湖', 'boat', 'tree', 'grass', 'flower', 'hill', 'What is this?', 'What can you see?',
    'I can see a boat.', 'I can see a tree.', 'I can see grass.', 'I can see a flower.',
    'I can see a lake.', 'I can see a hill.',
  ],
  advanced: [
    'grass — 草', 'lake；boat', 'What is this?', 'What can you see?', 'I can see a flower.',
    '我能看见一棵树。', 'I can see grass.',
    '植物：tree、flower、grass；其他景物：lake、boat、hill。',
    'I can see a lake.', 'I can see grass.',
    'What can you see? — I can see a tree.',
    'I can see a lake.；I can see a hill.；I can see a flower.',
    'What is this?；What can you see?',
    'I can see a lake.；I can see a tree.；I can see grass.',
    'A：I can see grass.；B：I can see a tree.',
    'What is this? 问眼前这是什么；What can you see? 问能看见什么。',
    'tree；hill；flower',
    '水面景物：lake；植物：flower；水上物品：boat。',
  ],
  high: [
    'A：I can see a lake.；B：I can see a tree.；C：I can see grass.',
    'A 保留；B 改为 I can see grass.',
    'I can see a boat.；I can see a flower.；I can see grass.',
    'A：What is this? 问眼前这是什么；B：What can you see? 问能看见什么。',
    '植物：tree、flower、grass；其他景物：lake、boat、hill。',
    '把③的 flower 改为 hill。',
    'What can you see? — I can see a boat.',
    'I can see a tree.；I can see a lake.；I can see a hill.',
    'A、B、C 三句都与观察卡相符。',
    'What is this?；What can you see?',
    '把②改为 I can see a lake.',
    '船：I can see a boat.；湖：I can see a lake.',
    'I can see grass.；I can see a tree.；I can see a flower.',
    'A：I can see a hill.；B：I can see a flower.；C：I can see grass.',
    'I can see a lake.；I can see a boat.；I can see a flower.',
    'I can see a flower.；I can see grass.；I can see a boat.',
  ],
} as const;

function answerSummary(activity: ActivityDefinition): string {
  switch (activity.kind) {
    case 'choice': return activity.options.find(({ id }) => id === activity.correctOptionId)?.label ?? '';
    case 'match': return activity.pairs.map(({ left, right }) => left + '→' + right).join('；');
    case 'order': {
      const labels = new Map(activity.items.map(({ id, label }) => [id, label]));
      return activity.correctOrder.map((id) => labels.get(id) ?? '').join(' → ');
    }
    case 'categorize': {
      const categories = new Map(activity.categories.map(({ id, label }) => [id, label]));
      return activity.items.map(({ label, categoryId }) => label + '→' + (categories.get(categoryId) ?? '')).join('；');
    }
    case 'arithmetic': return activity.expression + '=' + activity.correctAnswer;
    case 'measurement': return activity.targetLengthCm + ' 厘米';
  }
}

function readTsv(path: string): Array<Record<string, string>> {
  const lines = readFileSync(path, 'utf8').trim().split(/\r?\n/u) as string[];
  const [headerLine = '', ...dataLines] = lines;
  const headers = headerLine.replace(/^\uFEFF/u, '').split('\t');
  return dataLines.map((line) => {
    const values = line.split('\t');
    return Object.fromEntries(headers.map((header, index) => [header, values[index] ?? '']));
  });
}

describe('二年级上册英语第五单元闯关', () => {
  it('把 In the Park 登记为正式闯关组并保留原课程活动和六个学习任务', async () => {
    expect(getPilotUnitChallengeGroupId(sourceUnitId)).toBe(groupId);
    expect(growthGroups.find(({ id }) => id === groupId)).toMatchObject({
      id: groupId,
      kind: 'unit',
      grade: 2,
      semester: 1,
      subject: 'english',
      sourceUnitIds: [sourceUnitId],
    });

    const group = manifest.groups.find(({ definition }) => definition.id === groupId);
    expect(group).toMatchObject({
      releaseIntent: 'released',
      definition: {
        id: groupId,
        kind: 'unit',
        grade: 2,
        semester: 1,
        subject: 'english',
        sourceUnitIds: [sourceUnitId],
        learningTaskUnitIds: [sourceUnitId],
        coreKnowledgePointIds,
      },
    });
    expect(group?.definition.tasks).toHaveLength(5);
    expect(group?.questionIds).toHaveLength(90);
    expect(new Set(group?.questionIds).size).toBe(90);
    expect(Object.fromEntries(['basic', 'advanced', 'high'].map((difficulty) => [
      difficulty,
      manifest.questions.filter((question) => group?.questionIds.includes(question.questionId)
        && question.difficulty === difficulty).length,
    ]))).toEqual({ basic: 30, advanced: 30, high: 30 });

    const [content, unit] = await Promise.all([loadPilotChallengeContent(), loadUnit(sourceUnitId)]);
    const loaded = content.groups.find(({ group: candidate }) => candidate.definition.id === groupId);
    expect(loaded?.status, JSON.stringify(loaded?.issues, null, 2)).toBe('ready');
    expect(loaded?.candidates).toHaveLength(90);
    const courseActivities = Object.values(unit!.difficultyTracks).flatMap((track) => track.tasks)
      .flatMap((task) => task.sessions.flatMap((session) => session.activities));
    expect(courseActivities).toHaveLength(48);
    expect(loaded?.learningTasks).toHaveLength(6);
    expect(excludedDuplicateActivityIds.every((id) => courseActivities.some((activity) => activity.id === id))).toBe(true);
    expect(excludedDuplicateActivityIds.every((id) => loaded?.candidates.every(({ activityId }) => activityId !== id))).toBe(true);
    expect(courseActivities.filter(({ kind }) => kind === 'match').every(({ prompt }) =>
      prompt === '把词卡和对应的中文意思或信息连起来。')).toBe(true);
    expect(courseActivities.filter(({ kind }) => kind === 'categorize').every(({ prompt }) =>
      prompt === '把词卡放进合适的词语小队。')).toBe(true);
  });

  it('逐题核对48道原创题的答案、知识点、选项和实际评分', async () => {
    expect(grade2Term1EnglishUnit05SupplementalActivities).toHaveLength(48);
    const inputs = await loadChallengeQualityInputs();

    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const supplements = grade2Term1EnglishUnit05SupplementalActivities.filter((item) => item.difficulty === difficulty);
      expect(supplements).toHaveLength(expectedSupplementAnswers[difficulty].length);
      supplements.forEach(({ activity, knowledgePointIds }, index) => {
        expect(answerSummary(activity), difficulty + ' 第 ' + (index + 1) + ' 题答案').toBe(expectedSupplementAnswers[difficulty][index]);
        expect(activity.kind).toBe('choice');
        expect(activity.options).toHaveLength(3);
        expect(new Set(activity.options.map(({ label }) => label)).size).toBe(3);
        expect(activity.prompt.trim().length).toBeGreaterThan(0);
        expect(activity.hint?.trim().length).toBeGreaterThan(0);
        expect(activity.explanation?.trim().length).toBeGreaterThan(0);
        expect(knowledgePointIds.length).toBeGreaterThan(0);
        expect(knowledgePointIds.every((id) => coreKnowledgePointIds.includes(id))).toBe(true);
        expect(derivePilotQuestionKnowledgePointIds(sourceUnitId, activity)).toEqual(knowledgePointIds);
        expect(submitAnswer(activity, activity.correctOptionId)).toBe(true);
        const wrongOptionId = activity.options.find(({ id }) => id !== activity.correctOptionId)?.id;
        expect(submitAnswer(activity, wrongOptionId)).toBe(false);
        expect(inputs.activitiesById.get(activity.id)).toEqual(activity);
      });
    }
  });

  it('逐题台账、知识点、审核指纹与90道候选一致，并仅排除跨难度重复源题', async () => {
    const group = manifest.groups.find(({ definition }) => definition.id === groupId);
    const questions = manifest.questions.filter((question) => group?.questionIds.includes(question.questionId));
    const sourceQuestions = questions.filter((question) => question.activityId.startsWith(sourceUnitId + '/'));
    const supplementalQuestions = questions.filter((question) =>
      question.activityId.startsWith('challenge-supplement-' + groupId + '-'));
    expect(sourceQuestions).toHaveLength(42);
    expect(Object.fromEntries(['basic', 'advanced', 'high'].map((difficulty) => [
      difficulty,
      sourceQuestions.filter((question) => question.difficulty === difficulty).length,
    ]))).toEqual({ basic: 16, advanced: 12, high: 14 });
    expect(supplementalQuestions).toHaveLength(48);
    expect(Object.fromEntries(['basic', 'advanced', 'high'].map((difficulty) => [
      difficulty,
      supplementalQuestions.filter((question) => question.difficulty === difficulty).length,
    ]))).toEqual({ basic: 14, advanced: 18, high: 16 });

    const inputs = await loadChallengeQualityInputs();
    const ledgerPath = resolve(process.cwd(), 'docs/challenges/' + groupId + '-question-review.tsv');
    expect(existsSync(ledgerPath)).toBe(true);
    if (!existsSync(ledgerPath)) return;
    const rows = readTsv(ledgerPath);
    const candidateByQuestionId = new Map(questions.map((question) => [
      question.questionId,
      inputs.activitiesById.get(question.activityId)!,
    ]));
    expect(rows).toHaveLength(90);
    expect(new Set(rows.map(({ 题目ID }) => 题目ID))).toEqual(new Set(group?.questionIds));
    expect(rows.every(({ 审核状态 }) => 审核状态.includes('作者逐题自审通过')
      && 审核状态.includes('未独立教育者复核'))).toBe(true);
    expect(rows.filter(({ 来源 }) => 来源 === '课程原题')).toHaveLength(42);
    expect(rows.filter(({ 来源 }) => 来源 === '原创补题')).toHaveLength(48);

    const fingerprints: string[] = [];
    for (const row of rows) {
      const activity = candidateByQuestionId.get(row['题目ID']!);
      const question = questions.find(({ questionId }) => questionId === row['题目ID']);
      expect(activity, row['题目ID']).toBeDefined();
      expect(question, row['题目ID']).toBeDefined();
      expect(derivePilotQuestionKnowledgePointIds(sourceUnitId, activity!)).toEqual(question!.knowledgePointIds);
      expect(row['活动ID'], row['题目ID']).toBe(activity!.id);
      expect(row['题干'], row['题目ID']).toBe(activity!.prompt);
      expect(row['正确答案'], row['题目ID']).toBe(answerSummary(activity!));
      expect(row['知识点'], row['题目ID']).toBe(question!.knowledgePointIds.join('；'));
      expect(row['提示'], row['题目ID']).toBe(activity!.hint);
      expect(row['解析'], row['题目ID']).toBe(activity!.explanation);
      if (activity!.kind === 'choice') {
        expect(row['选项'], row['题目ID']).toBe(activity!.options.map(({ label }) => label).join(' / '));
      }
      fingerprints.push(await fingerprintActivity(activity!));
      expect(question!.approvedContentFingerprint).toBe(fingerprints[fingerprints.length - 1]);
    }
    expect(new Set(fingerprints).size).toBe(90);
    expect(excludedDuplicateActivityIds.every((activityId) => rows.every(({ 活动ID }) => 活动ID !== activityId))).toBe(true);

    const uniqueness = await analyzeQuestionUniqueness(questions, inputs.activitiesById, inputs.sourceUnitByActivityId);
    expect(uniqueness.exactDuplicateGroups).toEqual([]);
    const reviewedTemplateQuestionIds = new Set(uniqueness.similarQuestionPairs.flatMap(({ questionIds }) => questionIds));
    expect(rows.filter(({ 题目ID }) => reviewedTemplateQuestionIds.has(题目ID))
      .every(({ 审核状态 }) => 审核状态.includes('相似题提示人工复核'))).toBe(true);
  });
});
