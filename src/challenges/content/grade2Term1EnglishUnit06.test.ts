import { describe, expect, it } from 'vitest';
// @ts-expect-error Node.js is used only to inspect the review ledger during Vitest.
import { existsSync, readFileSync } from 'node:fs';
// @ts-expect-error Node.js paths are used only to locate the review ledger.
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

const sourceUnitId = 'grade-2/term-1/english/unit-06';
const groupId = 'grade-2-term-1-english-unit-06';
const coreKnowledgePointIds = [
  'holiday-vocabulary',
  'holiday-greetings',
  'gratitude-and-polite-responses',
];
const excludedSourceActivityIds = [
  `${sourceUnitId}/basic/task-02/session-01/question-02`,
  `${sourceUnitId}/basic/task-02/session-01/question-07`,
  `${sourceUnitId}/advanced/task-01/session-01/question-01`,
  `${sourceUnitId}/advanced/task-01/session-01/question-02`,
  `${sourceUnitId}/advanced/task-01/session-01/question-03`,
  `${sourceUnitId}/advanced/task-01/session-01/question-04`,
  `${sourceUnitId}/advanced/task-02/session-01/question-01`,
  `${sourceUnitId}/advanced/task-02/session-01/question-02`,
  `${sourceUnitId}/advanced/task-02/session-01/question-04`,
  `${sourceUnitId}/advanced/task-02/session-01/question-07`,
  `${sourceUnitId}/advanced/task-01/session-01/question-07`,
  `${sourceUnitId}/high/task-01/session-01/question-03`,
  `${sourceUnitId}/high/task-01/session-01/question-04`,
  `${sourceUnitId}/high/task-01/session-01/question-07`,
  `${sourceUnitId}/high/task-02/session-01/question-03`,
  `${sourceUnitId}/high/task-02/session-01/question-04`,
  `${sourceUnitId}/high/task-02/session-01/question-08`,
];
declare const process: { cwd(): string };

const expectedSupplementAnswers = {
  basic: [
    '卡片', 'present', '圣诞树', '圣诞老人', 'Merry Christmas!', 'Happy New Year!',
    'Thank you.', 'You are welcome.', 'Christmas', 'Year', 'Merry Christmas!', 'Happy New Year!', 'present', '不客气。',
    'Father Christmas', '新年祝福',
  ],
  advanced: [
    'Happy New Year to you, too!', 'Merry Christmas!', '先说 Thank you.，再回应 You are welcome。',
    'present；card', 'Father Christmas 是节日人物；Christmas tree 是节日物品。',
    '把 Happy New Year! 换成 Merry Christmas!', 'Happy New Year!；Thank you.',
    '卡片和礼物是物品；Merry Christmas! 是节日祝福。',
    'You are welcome. 可以回应 Thank you.', '礼物：Thank you.；听到感谢：You are welcome。',
    'Merry Christmas! 表达节日问候；Thank you. 表达感谢。', 'card、present、Christmas tree',
    '圣诞节：Merry Christmas!；新年：Happy New Year!', '先判断是圣诞节还是新年，再选择对应祝福。',
    '也祝你新年快乐。', 'Thank you.', 'Merry Christmas!', 'card 是卡片，present 是礼物。',
    '礼貌地回应感谢。', '物品是 card；收到后说 Thank you.', 'Happy New Year!', 'card', 'Happy New Year!',
  ],
  high: [
    '朋友送礼物：Thank you.；对方回应：You are welcome。',
    '圣诞节：Merry Christmas!；新年：Happy New Year!',
    'present；card；Christmas tree',
    '节日祝福：Merry Christmas!、Happy New Year!；感谢：Thank you.；回应：You are welcome。',
    '先判断对话表达的是祝福还是感谢，再选择相应回应。',
    '把 present 配为礼物，把 card 配为卡片。',
    'Merry Christmas!；Thank you.；You are welcome。',
    '新年问候：Happy New Year!；回应感谢：You are welcome。',
    'present：礼物；Christmas tree：圣诞树；Father Christmas：圣诞老人。',
    'Happy New Year to you, too!',
    '把 Thank you. 配为感谢，把 You are welcome. 配为回应。',
    '先认出 present 和 card，再说 Thank you.',
    '物品：card、present、Christmas tree；人物：Father Christmas。',
    '祝福卡：Merry Christmas!；回应卡：You are welcome。',
    'card 是卡片，可以写上节日祝福。',
    'Merry Christmas!；You are welcome。',
    'Christmas tree 标为圣诞树，present 标为礼物。',
    '收到礼物时应说 Thank you.。',
    '圣诞祝福写 Merry Christmas!；感谢写 Thank you.。',
    'card；Father Christmas；Happy New Year!',
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

describe('二年级上册英语第六单元闯关', () => {
  it('登记 Happy Holidays 闯关组并保留原课程活动、学习任务和进度入口', async () => {
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
  });

  it('逐题核对59道原创题的答案、知识点和实际评分', async () => {
    const content = await loadPilotChallengeContent();
    const group = content.groups.find(({ group: candidate }) => candidate.definition.id === groupId);
    const supplements = group?.candidates.filter(({ activityId }) => activityId.startsWith('challenge-supplement-' + groupId + '-')) ?? [];
    expect(supplements).toHaveLength(59);

    const knowledgePoints = new Set<string>();
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const candidates = supplements.filter((candidate) => candidate.difficulty === difficulty);
      expect(candidates).toHaveLength(expectedSupplementAnswers[difficulty].length);
      candidates.forEach((candidate, index) => {
        const { activity } = candidate;
        const question = manifest.questions.find(({ questionId }) => questionId === candidate.questionId);
        expect(answerSummary(activity), difficulty + ' 第 ' + (index + 1) + ' 题答案').toBe(expectedSupplementAnswers[difficulty][index]);
        expect(activity.kind).toBe('choice');
        if (activity.kind !== 'choice') return;
        expect(activity.options).toHaveLength(3);
        expect(new Set(activity.options.map(({ label }) => label)).size).toBe(3);
        expect(activity.prompt.trim().length).toBeGreaterThan(0);
        expect(activity.hint?.trim().length).toBeGreaterThan(0);
        expect(activity.explanation?.trim().length).toBeGreaterThan(0);
        expect(question?.knowledgePointIds.length).toBeGreaterThan(0);
        question?.knowledgePointIds.forEach((id) => knowledgePoints.add(id));
        expect(question?.knowledgePointIds.every((id) => coreKnowledgePointIds.includes(id))).toBe(true);
        expect(derivePilotQuestionKnowledgePointIds(sourceUnitId, activity)).toEqual(question?.knowledgePointIds);
        expect(submitAnswer(activity, activity.correctOptionId)).toBe(true);
        const wrongOptionId = activity.options.find(({ id }) => id !== activity.correctOptionId)?.id;
        expect(submitAnswer(activity, wrongOptionId)).toBe(false);
      });
    }
    expect(knowledgePoints).toEqual(new Set(coreKnowledgePointIds));
  });

  it('逐题审校台账、知识点、审核指纹与90道候选一致', async () => {
    const group = manifest.groups.find(({ definition }) => definition.id === groupId);
    const questions = manifest.questions.filter((question) => group?.questionIds.includes(question.questionId));
    const sourceQuestions = questions.filter((question) => question.activityId.startsWith(sourceUnitId + '/'));
    const supplementalQuestions = questions.filter((question) => question.activityId.startsWith('challenge-supplement-' + groupId + '-'));
    expect(sourceQuestions).toHaveLength(31);
    expect(excludedSourceActivityIds.filter((activityId) => sourceQuestions.some((question) => question.activityId === activityId))).toEqual([]);
    expect(Object.fromEntries(['basic', 'advanced', 'high'].map((difficulty) => [
      difficulty,
      sourceQuestions.filter((question) => question.difficulty === difficulty).length,
    ]))).toEqual({ basic: 14, advanced: 7, high: 10 });
    expect(supplementalQuestions).toHaveLength(59);
    expect(Object.fromEntries(['basic', 'advanced', 'high'].map((difficulty) => [
      difficulty,
      supplementalQuestions.filter((question) => question.difficulty === difficulty).length,
    ]))).toEqual({ basic: 16, advanced: 23, high: 20 });

    const inputs = await loadChallengeQualityInputs();
    const ledgerPath = resolve(process.cwd(), 'docs/challenges/' + groupId + '-question-review.tsv');
    expect(existsSync(ledgerPath)).toBe(true);
    if (!existsSync(ledgerPath)) return;
    const rows = readTsv(ledgerPath);
    expect(rows).toHaveLength(90);
    expect(new Set(rows.map(({ 题目ID }) => 题目ID))).toEqual(new Set(group?.questionIds));
    expect(rows.every(({ 审核状态 }) => 审核状态.includes('作者逐题自审通过')
      && 审核状态.includes('未独立教育者复核'))).toBe(true);

    const fingerprints: string[] = [];
    for (const row of rows) {
      const question = questions.find(({ questionId }) => questionId === row['题目ID']);
      const activity = inputs.activitiesById.get(question!.activityId)!;
      expect(row['活动ID']).toBe(activity.id);
      expect(row['题干']).toBe(activity.prompt);
      expect(row['正确答案']).toBe(answerSummary(activity));
      expect(row['知识点']).toBe(question!.knowledgePointIds.join('；'));
      expect(row['提示']).toBe(activity.hint);
      expect(row['解析']).toBe(activity.explanation);
      fingerprints.push(await fingerprintActivity(activity));
      expect(question!.approvedContentFingerprint).toBe(fingerprints[fingerprints.length - 1]);
    }
    expect(new Set(fingerprints).size).toBe(90);

    const unit = await loadUnit(sourceUnitId);
    const courseActivityIds = new Set(Object.values(unit!.difficultyTracks).flatMap((track) => track.tasks)
      .flatMap((task) => task.sessions.flatMap((session) => session.activities.map((activity) => activity.id))));
    expect(excludedSourceActivityIds.every((activityId) => courseActivityIds.has(activityId))).toBe(true);

    const uniqueness = await analyzeQuestionUniqueness(questions, inputs.activitiesById, inputs.sourceUnitByActivityId);
    expect(uniqueness.exactDuplicateGroups).toEqual([]);
    const similarQuestionIds = new Set(uniqueness.similarQuestionPairs.flatMap(({ questionIds }) => questionIds));
    expect(rows.filter(({ 题目ID }) => similarQuestionIds.has(题目ID))
      .every(({ 审核状态 }) => 审核状态.includes('相似题提示人工复核'))).toBe(true);
  });
});
