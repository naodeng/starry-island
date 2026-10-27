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
import { grade2Term1EnglishUnit03SupplementalActivities } from './grade2Term1EnglishUnit03SupplementalActivities';

const sourceUnitId = 'grade-2/term-1/english/unit-03';
const groupId = 'grade-2-term-1-english-unit-03';
const coreKnowledgePointIds = ['height-and-size-words', 'appearance-words', 'friendly-description'];
declare const process: { cwd(): string };

const expectedSupplementAnswers = {
  basic: [
    '高的', 'short', '大的', '瘦的', 'The character is tall.', 'She is short.', 'big', 'thin', '英俊的', 'pretty',
    '他很英俊。', '漂亮的', 'tall', 'short', 'tall 和 short', 'handsome', '外貌描述词', 'tall 表示身高；pretty 表示外貌。',
  ],
  advanced: [
    'He is tall.', 'big', '较高', 'The character is thin.', 'handsome', 'The box is big.', 'The character is short.',
    '把 tall 换成 short。', '外貌', 'tall；pretty', 'tall 放身高栏，handsome 放外貌栏。', 'tall；short',
    'He is tall.；He is handsome.', 'tall；big', 'The character is thin.', 'handsome 是“英俊的”，pretty 是“漂亮的”。',
    '把 C 的 big 改成 tall。', 'big；tall', 'pretty；short', 'tall、short、big、thin；handsome、pretty',
  ],
  high: [
    'tall；pretty；big', 'C 的 pretty 应改为 handsome。', '身高用 tall；整体大小用 big。', 'A 身高；B 体型；C 外貌。',
    'tall；pretty；big', 'tall、short 描述身高；handsome、pretty 描述外貌。',
    '身高：tall、short；大小/体型：big、thin；外貌：handsome、pretty。', 'short；pretty；thin',
    'tall and handsome；short and pretty', '把④的 handsome 改为 thin。', 'short；handsome；big', '三项都与各自描述一致。',
    'thin；tall；pretty', '把 C 的 short 改成 big。', 'He is tall and handsome.', 'A：short、thin；B：pretty、big。',
    'handsome、pretty 留在外貌栏；tall 移到身高栏。', '三条都相符。',
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

describe('二年级上册英语第三单元闯关', () => {
  it('把 My Friends 登记为正式闯关组并保留原48道课程活动与六个学习任务', async () => {
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

  it('逐题核对56道原创题的答案、知识点、选项与实际评分', async () => {
    expect(grade2Term1EnglishUnit03SupplementalActivities).toHaveLength(56);
    const inputs = await loadChallengeQualityInputs();

    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const supplements = grade2Term1EnglishUnit03SupplementalActivities.filter((item) => item.difficulty === difficulty);
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

  it('候选池只复用34道不同目标课程题，逐题台账和题目指纹与清单一致', async () => {
    const group = manifest.groups.find(({ definition }) => definition.id === groupId);
    const questions = manifest.questions.filter((question) => group?.questionIds.includes(question.questionId));
    const sourceQuestions = questions.filter((question) => question.activityId.startsWith(`${sourceUnitId}/`));
    const supplementalQuestions = questions.filter((question) => question.activityId.startsWith(`challenge-supplement-${groupId}-`));
    const excludedSourceActivityIds = [
      `${sourceUnitId}/basic/task-01/session-01/question-03`,
      `${sourceUnitId}/high/task-01/session-01/question-03`,
      `${sourceUnitId}/basic/task-01/session-01/question-07`,
      `${sourceUnitId}/basic/task-02/session-01/question-07`,
      `${sourceUnitId}/advanced/task-01/session-01/question-07`,
      `${sourceUnitId}/advanced/task-02/session-01/question-07`,
      `${sourceUnitId}/high/task-01/session-01/question-07`,
      `${sourceUnitId}/advanced/task-01/session-01/question-04`,
      `${sourceUnitId}/advanced/task-02/session-01/question-01`,
      `${sourceUnitId}/advanced/task-02/session-01/question-02`,
      `${sourceUnitId}/basic/task-02/session-01/question-04`,
      `${sourceUnitId}/advanced/task-02/session-01/question-04`,
      `${sourceUnitId}/high/task-01/session-01/question-04`,
      `${sourceUnitId}/high/task-02/session-01/question-03`,
    ];

    expect(sourceQuestions).toHaveLength(34);
    expect(Object.fromEntries(['basic', 'advanced', 'high'].map((difficulty) => [
      difficulty,
      sourceQuestions.filter((question) => question.difficulty === difficulty).length,
    ]))).toEqual({ basic: 12, advanced: 10, high: 12 });
    expect(supplementalQuestions).toHaveLength(56);
    expect(Object.fromEntries(['basic', 'advanced', 'high'].map((difficulty) => [
      difficulty,
      supplementalQuestions.filter((question) => question.difficulty === difficulty).length,
    ]))).toEqual({ basic: 18, advanced: 20, high: 18 });
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
    expect(rows.every(({ 审核状态 }) => 审核状态.includes('作者逐题自审通过') && 审核状态.includes('未独立教育者复核'))).toBe(true);
    expect(rows.filter(({ 来源 }) => 来源 === '课程原题')).toHaveLength(34);
    expect(rows.filter(({ 来源 }) => 来源 === '原创补题')).toHaveLength(56);
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
    expect(uniqueness.similarQuestionPairs).toEqual([]);
  });
});
