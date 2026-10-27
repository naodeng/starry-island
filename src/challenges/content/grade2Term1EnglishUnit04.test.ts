import { describe, expect, it } from 'vitest';
// @ts-expect-error Node.js is used only to inspect the review ledger during Vitest.
import { existsSync, readFileSync } from 'node:fs';
// @ts-expect-error The path is used only to resolve the review ledger during Vitest.
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
import { grade2Term1EnglishUnit04SupplementalActivities } from './grade2Term1EnglishUnit04SupplementalActivities';

const sourceUnitId = 'grade-2/term-1/english/unit-04';
const groupId = 'grade-2-term-1-english-unit-04';
const coreKnowledgePointIds = [
  'community-place-vocabulary',
  'location-and-destination-phrases',
  'place-purpose-and-sentences',
];
const excludedSourceActivityIds = [
  `${sourceUnitId}/advanced/task-02/session-01/question-01`,
  `${sourceUnitId}/advanced/task-02/session-01/question-02`,
  `${sourceUnitId}/advanced/task-02/session-01/question-04`,
  `${sourceUnitId}/high/task-01/session-01/question-04`,
  `${sourceUnitId}/high/task-02/session-01/question-04`,
  `${sourceUnitId}/high/task-02/session-01/question-08`,
];
declare const process: { cwd(): string };

const expectedSupplementAnswers = {
  basic: [
    'bookshop', 'supermarket', 'zoo', 'park', 'school', 'hospital',
    'I am going to the bookshop.', 'She is at the park.', 'Where are you going?',
    'She is at the hospital.', 'He is at the zoo.', 'Where is she?',
    'We are going to school.', 'at',
  ],
  advanced: [
    'A：I am going to the supermarket.；B：I am at the hospital.',
    'Where are you going?；I am going to the zoo.',
    '把 B 的 park 改成 hospital。',
    'bookshop → supermarket → zoo',
    'We are going to school.',
    'A：Where are you?；B：Where are you going?',
    'bookshop→买书；zoo→看动物。',
    'She is at the hospital.',
    'A：I am at the park.；B：I am going to the bookshop.',
    'school 用于学习；hospital 用于就医。',
    'Where is he?；He is at the zoo.',
    'A：书店；B：I am going to the park.',
    'at the bookshop',
    'going to the supermarket',
    'We are going to school.；She is at the hospital.',
    '把 at the park 换成 going to the park。',
    'Where are you going?',
  ],
  high: [
    'A：I am at the zoo.；B：She is at the park.；C：We are going to school.',
    'A改为“I am going to the bookshop.”；B、C保持原句。',
    'A：bookshop；B：supermarket；C：zoo。',
    'A：Where are you?；B：Where are you going?；C：Where is she?',
    '购物：bookshop、supermarket；游览休闲：zoo、park；学习就医：school、hospital。',
    'He is at school.；He is going to the hospital.',
    'A→zoo；B→bookshop；C→school。',
    'A、C 用 going to 表示前往；B 用 at 表示所在地点。',
    '把 B 的 Where are you? 改为 Where are you going?。',
    'A：I am at the supermarket.；B：She is going to the park.',
    '学习/就医：school、hospital；购物：bookshop、supermarket。',
    'A：Where is he?；B：He is at the hospital.；C：I am going to the zoo.',
    'I am at the zoo.',
    '先按用途选地点，再根据“正在那里/正要前往”选 at 或 going to。',
    'We are at school.；She is going to the hospital.；I am at the park.',
    'A：I am at the zoo.；B：I am going to the bookshop.',
    'A：at the zoo；B：going to the supermarket；C：at school。',
  ],
} as const;

function answerSummary(activity: ActivityDefinition): string {
  switch (activity.kind) {
    case 'choice': return activity.options.find(({ id }) => id === activity.correctOptionId)?.label ?? '';
    case 'match': return activity.pairs.map(({ left, right }) => `${left}→${right}`).join('；');
    case 'order': {
      const labels = new Map(activity.items.map(({ id, label }) => [id, label]));
      return activity.correctOrder.map((id) => labels.get(id) ?? '').join(' → ');
    }
    case 'categorize': {
      const categories = new Map(activity.categories.map(({ id, label }) => [id, label]));
      return activity.items.map(({ label, categoryId }) => `${label}→${categories.get(categoryId) ?? ''}`).join('；');
    }
    case 'arithmetic': return `${activity.expression}=${activity.correctAnswer}`;
    case 'measurement': return `${activity.targetLengthCm} 厘米`;
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

describe('二年级上册英语第四单元闯关', () => {
  it('把 In the Community 登记为正式闯关组并保留原48道课程活动和六个学习任务', async () => {
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
    expect(Object.values(unit!.difficultyTracks).flatMap((track) => track.tasks)
      .flatMap((task) => task.sessions.flatMap((session) => session.activities))).toHaveLength(48);
    expect(loaded?.learningTasks).toHaveLength(6);
  });

  it('逐题核对48道原创题的答案、知识点、选项与实际评分', async () => {
    expect(grade2Term1EnglishUnit04SupplementalActivities).toHaveLength(48);
    const inputs = await loadChallengeQualityInputs();

    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const supplements = grade2Term1EnglishUnit04SupplementalActivities.filter((item) => item.difficulty === difficulty);
      expect(supplements).toHaveLength(expectedSupplementAnswers[difficulty].length);
      supplements.forEach(({ activity, knowledgePointIds }, index) => {
        expect(answerSummary(activity), `${difficulty} 第 ${index + 1} 题答案`).toBe(expectedSupplementAnswers[difficulty][index]);
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

  it('保留42道兼容课程题，逐题台账、知识点和内容指纹与清单一致', async () => {
    const group = manifest.groups.find(({ definition }) => definition.id === groupId);
    const questions = manifest.questions.filter((question) => group?.questionIds.includes(question.questionId));
    const sourceQuestions = questions.filter((question) => question.activityId.startsWith(`${sourceUnitId}/`));
    const supplementalQuestions = questions.filter((question) => question.activityId.startsWith(`challenge-supplement-${groupId}-`));
    expect(sourceQuestions).toHaveLength(42);
    expect(supplementalQuestions).toHaveLength(48);
    expect(excludedSourceActivityIds.filter((activityId) => sourceQuestions.some((question) => question.activityId === activityId))).toEqual([]);
    expect(Object.fromEntries(['basic', 'advanced', 'high'].map((difficulty) => [
      difficulty,
      sourceQuestions.filter((question) => question.difficulty === difficulty).length,
    ]))).toEqual({ basic: 16, advanced: 13, high: 13 });
    expect(Object.fromEntries(['basic', 'advanced', 'high'].map((difficulty) => [
      difficulty,
      supplementalQuestions.filter((question) => question.difficulty === difficulty).length,
    ]))).toEqual({ basic: 14, advanced: 17, high: 17 });

    const inputs = await loadChallengeQualityInputs();
    const ledgerPath = resolve(process.cwd(), `docs/challenges/${groupId}-question-review.tsv`);
    expect(existsSync(ledgerPath)).toBe(true);
    if (!existsSync(ledgerPath)) return;
    const rows = readTsv(ledgerPath);
    const candidateByQuestionId = new Map(questions.map((question) => [
      question.questionId,
      inputs.activitiesById.get(question.activityId)!,
    ]));
    expect(rows).toHaveLength(90);
    expect(new Set(rows.map(({ 题目ID }) => 题目ID))).toEqual(new Set(group?.questionIds));
    expect(rows.every(({ 审核状态 }) => 审核状态.includes('作者逐题自审通过') && 审核状态.includes('未独立教育者复核'))).toBe(true);
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
      expect(question!.approvedContentFingerprint).toBe(fingerprints.at(-1));
    }
    expect(new Set(fingerprints).size).toBe(90);
    const unit = await loadUnit(sourceUnitId);
    const courseActivityIds = new Set(Object.values(unit!.difficultyTracks).flatMap((track) => track.tasks)
      .flatMap((task) => task.sessions.flatMap((session) => session.activities.map((activity) => activity.id))));
    expect(excludedSourceActivityIds.every((activityId) => courseActivityIds.has(activityId))).toBe(true);
    const uniqueness = await analyzeQuestionUniqueness(questions, inputs.activitiesById, inputs.sourceUnitByActivityId);
    expect(uniqueness.exactDuplicateGroups).toEqual([]);
    expect(uniqueness.similarQuestionPairs).toEqual([]);
  });
});
