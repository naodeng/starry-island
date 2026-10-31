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
import { grade2Term1EnglishUnit02SupplementalActivities } from './grade2Term1EnglishUnit02SupplementalActivities';

const sourceUnitId = 'grade-2/term-1/english/unit-02';
const groupId = 'grade-2-term-1-english-unit-02';
const coreKnowledgePointIds = ['people-vocabulary', 'friend-classmate-vocabulary', 'he-she-pronouns'];
declare const process: { cwd(): string };

const expectedSupplementAnswers = {
  basic: [
    'boy', 'girl', 'man', 'woman', 'classmate', 'friend', 'He is a boy.', 'She is a girl.',
    'He is my friend.', 'She is my classmate.', 'He is a man.', 'She is a woman.', 'He', 'She',
    'She；He', 'classmate；friend',
  ],
  advanced: [
    'boy；woman', '他是我的同班同学，也是我的朋友。', 'He is my classmate.', 'She is my friend.',
    'He is a man.', 'She is a girl.', 'boy；classmate', '把 She 改成 He。', '把 He 改成 She。',
    'She is my friend.；She is my classmate.', '四个称呼放入人物词语栏，两个关系放入关系词语栏。',
    '成年女性', 'girl；friend', 'She；He', 'She is my classmate.；He is my friend.',
    'classmate', 'man；woman', 'A 是人物称呼，B 是同班关系。',
    'He is my friend.；She is my classmate.', 'girl；man；friend',
    '把 classmate 改成 friend。',
  ],
  high: [
    'He is my friend.；She is my classmate.', 'A、B 两条都符合记录。',
    'She is my friend.；He is my classmate.', '只有 C 的代词与人物词不一致。',
    'woman；classmate；boy', '把第二句的 She 改成 He。',
    'boy 和 girl 是人物称呼；friend 和 classmate 是关系词。', 'She；He；He',
    '第一句介绍朋友，第二句介绍同班同学。', 'C 的 She 改为 He。',
    '这位男孩可以既是同班同学，也是朋友。',
    'He is my friend.；She is my classmate.；She is my friend.',
    'She is a girl.；He is a man.；She is a woman.', 'friend；woman；classmate',
    'A：She is my friend.；B：He is my classmate.',
    'man 是成年男性；He 表示“他”；friend 和 classmate 表示不同同伴关系。',
    'C：把 He is my classmate. 改为 He is my friend。',
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

describe('二年级上册英语第二单元闯关', () => {
  it('把 Boys and Girls 登记为正式闯关组并为每档提供30道候选题', async () => {
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

  it('逐题核对54道原创题的答案、知识点、选项与实际评分', async () => {
    expect(grade2Term1EnglishUnit02SupplementalActivities).toHaveLength(54);
    const [inputs] = await Promise.all([loadChallengeQualityInputs()]);

    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const supplements = grade2Term1EnglishUnit02SupplementalActivities.filter((item) => item.difficulty === difficulty);
      expect(supplements).toHaveLength(expectedSupplementAnswers[difficulty].length);
      supplements.forEach(({ activity, knowledgePointIds }, index) => {
        const answer = answerSummary(activity);
        expect(answer, `${difficulty} 第 ${index + 1} 题答案`).toBe(expectedSupplementAnswers[difficulty][index]);
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

  it('新组候选池排除12道重复课程题且逐题台账与清单一致', async () => {
    const group = manifest.groups.find(({ definition }) => definition.id === groupId);
    const questions = manifest.questions.filter((question) => group?.questionIds.includes(question.questionId));
    const sourceQuestions = questions.filter((question) => question.activityId.startsWith(`${sourceUnitId}/`));
    const supplementalQuestions = questions.filter((question) => question.activityId.startsWith(`challenge-supplement-${groupId}-`));
    const excludedSourceActivityIds = [
      `${sourceUnitId}/advanced/task-01/session-01/question-03`,
      `${sourceUnitId}/advanced/task-01/session-01/question-04`,
      `${sourceUnitId}/advanced/task-02/session-01/question-01`,
      `${sourceUnitId}/advanced/task-02/session-01/question-02`,
      `${sourceUnitId}/advanced/task-02/session-01/question-04`,
      `${sourceUnitId}/advanced/task-02/session-01/question-07`,
      `${sourceUnitId}/basic/task-01/session-01/question-07`,
      `${sourceUnitId}/basic/task-02/session-01/question-07`,
      `${sourceUnitId}/advanced/task-01/session-01/question-07`,
      `${sourceUnitId}/high/task-01/session-01/question-04`,
      `${sourceUnitId}/high/task-02/session-01/question-04`,
      `${sourceUnitId}/high/task-02/session-01/question-07`,
    ];

    expect(sourceQuestions).toHaveLength(36);
    expect(Object.fromEntries(['basic', 'advanced', 'high'].map((difficulty) => [
      difficulty,
      sourceQuestions.filter((question) => question.difficulty === difficulty).length,
    ]))).toEqual({ basic: 14, advanced: 9, high: 13 });
    expect(supplementalQuestions).toHaveLength(54);
    expect(excludedSourceActivityIds.filter((activityId) => sourceQuestions.some((question) => question.activityId === activityId))).toEqual([]);

    const unit = await loadUnit(sourceUnitId);
    const courseActivityIds = new Set(Object.values(unit!.difficultyTracks).flatMap((track) => track.tasks)
      .flatMap((task) => task.sessions.flatMap((session) => session.activities.map((activity) => activity.id))));
    expect(excludedSourceActivityIds.every((activityId) => courseActivityIds.has(activityId))).toBe(true);
    const inputs = await loadChallengeQualityInputs();
    const candidates = questions.map((question) => inputs.activitiesById.get(question.activityId)!);
    const ledgerPath = resolve(process.cwd(), `docs/challenges/${groupId}-question-review.tsv`);
    expect(existsSync(ledgerPath)).toBe(true);
    if (!existsSync(ledgerPath)) return;
    const rows = readTsv(ledgerPath);
    const candidateByQuestionId = new Map(questions.map((question, index) => [question.questionId, candidates[index]!]));
    expect(rows).toHaveLength(90);
    expect(new Set(rows.map(({ 题目ID }) => 题目ID))).toEqual(new Set(group?.questionIds));
    expect(rows.every(({ 审核状态 }) => 审核状态.includes('逐题自审通过') && 审核状态.includes('未独立教育者复核'))).toBe(true);
    const templateReviewRows = rows.filter(({ 活动ID }) => [
      `${sourceUnitId}/basic/task-01/session-01/question-03`,
      `${sourceUnitId}/high/task-01/session-01/question-03`,
    ].includes(活动ID));
    expect(templateReviewRows).toHaveLength(2);
    expect(templateReviewRows.every(({ 审核状态 }) => 审核状态.includes('模板提示已复核'))).toBe(true);
    expect(rows.filter(({ 来源 }) => 来源 === '课程原题')).toHaveLength(36);
    expect(rows.filter(({ 来源 }) => 来源 === '原创补题')).toHaveLength(54);
    for (const row of rows) {
      const activity = candidateByQuestionId.get(row['题目ID']!);
      const question = questions.find(({ questionId }) => questionId === row['题目ID']);
      expect(activity, row['题目ID']).toBeDefined();
      expect(row['活动ID'], row['题目ID']).toBe(activity!.id);
      expect(row['题干'], row['题目ID']).toBe(activity!.prompt);
      expect(row['正确答案'], row['题目ID']).toBe(answerSummary(activity!));
      expect(row['知识点'], row['题目ID']).toBe(question!.knowledgePointIds.join('；'));
      expect(row['提示'], row['题目ID']).toBe(activity!.hint);
      expect(row['解析'], row['题目ID']).toBe(activity!.explanation);
      if (activity!.kind === 'choice') {
        expect(row['选项'], row['题目ID']).toBe(activity!.options.map(({ label }) => label).join(' / '));
      }
    }
    const fingerprints = await Promise.all(candidates.map((activity) => fingerprintActivity(activity)));
    expect(new Set(fingerprints).size).toBe(90);
    const uniqueness = await analyzeQuestionUniqueness(questions, inputs.activitiesById, inputs.sourceUnitByActivityId);
    expect(uniqueness.exactDuplicateGroups).toEqual([]);
    expect(uniqueness.similarQuestionPairs.map(({ questionIds }) => questionIds)).toEqual([[
      `challenge-question:${sourceUnitId}/basic/task-01/session-01/question-03`,
      `challenge-question:${sourceUnitId}/high/task-01/session-01/question-03`,
    ]]);
  });
});
