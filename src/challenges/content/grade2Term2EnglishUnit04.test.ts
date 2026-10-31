import { describe, expect, it } from 'vitest';
// @ts-expect-error Node.js is used only to inspect the review ledger during Vitest.
import { existsSync, readFileSync } from 'node:fs';
// @ts-expect-error Node.js is used only to resolve the review ledger during Vitest.
import { resolve } from 'node:path';
import type { ActivityDefinition } from '../../content/types';
import { submitAnswer } from '../../learning/answers';
import { loadUnit } from '../../content/unitLoader';
import type { ChallengeQuestionRecord } from '../domain/types';
import { fingerprintActivity } from './fingerprint';
import { analyzeQuestionUniqueness } from './questionUniqueness';
import { parseChallengeManifest } from './manifestSchema';
import { grade2Term2EnglishUnit04SupplementalActivities } from './grade2Term2EnglishUnit04SupplementalActivities';
import manifest from './pilot-manifest-grade2-term2-english-unit04.json';

declare const process: { cwd(): string };

const sourceUnitId = 'grade-2/term-2/english/unit-04';
const groupId = 'grade-2-term-2-english-unit-04';
const coreKnowledgePointIds = [
  'digital-time-vocabulary',
  'time-question-and-answer',
  'time-report-sentences',
  'time-clue-and-report-reasoning',
];
const expectedSupplementAnswers = {
  basic: [
    '七点四十分', '11:30', '2:50—两点五十分', "It's 5:00.", 'What time is it?', "It's 11:30.",
    '整点', "It's", "It's 2:50.",
    '问句：What time is it?；报时句：It\'s 7:40.', "It's 7:40.",
    '钟面 11:30；报时句 It\'s 11:30.', "It's → 5:00 → .", '七点四十分；It\'s 7:40.',
  ],
  advanced: [
    "It's 7:40.；It's 11:30.", "It's 5:00.", '报时句中的 7:40 与钟面 2:50 不同。',
    '数字：11:30、2:50；句子：What time is it?、It\'s 5:00.',
    '第二行需要修改。', '问句合适，回答也与钟面一致。', '这样报时句里的数字才能与钟面一致。',
    '11:30', "A: What time is it? B: It's 2:50.",
    '整点：5:00；非整点：7:40、11:30、2:50。', "It's 7:40.", 'B 行正确。',
    '问句：What time is it?；回答：It\'s 11:30.', "It's 5:00.；It's 2:50.",
  ],
  high: [
    '第三条记录需修改。', '七点四十分；7:40；It\'s 7:40.',
    "A: What time is it? B: It's 11:30.", '两条报时句都与各自钟面相同。', '3条记录相符。',
    '问句合适，回答应改为 It\'s 5:00.',
    '钟面和报时句中的数字都是 2:50，因此信息相符。', '11:30；十一点三十分',
    "It's 2:50.", 'What time is it?',
    '11:30 和 It\'s 2:50 不相符。', '这是报时句，用来报告时间。',
    '问句和报时都与钟面相符，可以保留。',
    '把两条报时分别改为 It\'s 7:40. 和 It\'s 11:30.',
  ],
} as const;
const expectedSupplementKnowledgePointIds = {
  basic: [
    ['digital-time-vocabulary'], ['digital-time-vocabulary'],
    ['digital-time-vocabulary', 'time-clue-and-report-reasoning'],
    ['time-report-sentences', 'time-clue-and-report-reasoning'],
    ['time-question-and-answer'], ['time-report-sentences'],
    ['digital-time-vocabulary', 'time-clue-and-report-reasoning'], ['time-report-sentences'],
    ['time-question-and-answer', 'time-report-sentences'], ['time-question-and-answer', 'time-report-sentences'],
    ['time-report-sentences', 'time-clue-and-report-reasoning'], ['time-report-sentences', 'time-clue-and-report-reasoning'],
    ['time-report-sentences'], ['digital-time-vocabulary', 'time-report-sentences'],
  ],
  advanced: [
    ['digital-time-vocabulary', 'time-report-sentences', 'time-clue-and-report-reasoning'],
    ['time-question-and-answer', 'time-report-sentences'],
    ['digital-time-vocabulary', 'time-report-sentences', 'time-clue-and-report-reasoning'],
    ['digital-time-vocabulary', 'time-question-and-answer', 'time-report-sentences'],
    ['time-report-sentences', 'time-clue-and-report-reasoning'],
    ['time-question-and-answer', 'time-report-sentences', 'time-clue-and-report-reasoning'],
    ['time-report-sentences', 'time-clue-and-report-reasoning'],
    ['digital-time-vocabulary', 'time-report-sentences'],
    ['time-question-and-answer', 'time-report-sentences'],
    ['digital-time-vocabulary', 'time-clue-and-report-reasoning'],
    ['time-report-sentences', 'time-clue-and-report-reasoning'],
    ['time-report-sentences', 'time-clue-and-report-reasoning'],
    ['time-question-and-answer', 'time-report-sentences'],
    ['time-report-sentences', 'time-clue-and-report-reasoning'],
  ],
  high: [
    ['digital-time-vocabulary', 'time-report-sentences', 'time-clue-and-report-reasoning'],
    ['digital-time-vocabulary', 'time-report-sentences', 'time-clue-and-report-reasoning'],
    ['time-question-and-answer', 'time-report-sentences', 'time-clue-and-report-reasoning'],
    ['time-report-sentences', 'time-clue-and-report-reasoning'],
    ['digital-time-vocabulary', 'time-report-sentences', 'time-clue-and-report-reasoning'],
    ['time-question-and-answer', 'time-report-sentences', 'time-clue-and-report-reasoning'],
    ['time-report-sentences', 'time-clue-and-report-reasoning'],
    ['digital-time-vocabulary', 'time-report-sentences'],
    ['digital-time-vocabulary', 'time-report-sentences', 'time-clue-and-report-reasoning'],
    ['time-question-and-answer', 'time-report-sentences'],
    ['digital-time-vocabulary', 'time-report-sentences', 'time-clue-and-report-reasoning'],
    ['time-question-and-answer', 'time-report-sentences'],
    ['time-question-and-answer', 'time-report-sentences', 'time-clue-and-report-reasoning'],
    ['time-report-sentences', 'time-clue-and-report-reasoning'],
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

function sourceTaskId(activityId: string): string {
  const match = activityId.match(/^(grade-2\/term-2\/english\/unit-04\/(?:basic|advanced|high)\/task-0[12])\/session-\d+\/question-\d+$/u);
  return match?.[1] ?? '';
}

function expectedSourceKnowledgePointIds(activityId: string): string[] {
  const match = activityId.match(/\/(basic|advanced|high)\/task-(01|02)\/session-\d+\/question-(\d+)$/u);
  if (!match) return [];
  const [, difficulty, taskNumber, questionNumberText] = match;
  const questionNumber = Number(questionNumberText);
  const vocabulary = 'digital-time-vocabulary';
  const questions = 'time-question-and-answer';
  const reports = 'time-report-sentences';
  const reasoning = 'time-clue-and-report-reasoning';

  if (difficulty === 'high' && taskNumber === '02') {
    if (questionNumber <= 2) return [vocabulary, reports, reasoning];
    if (questionNumber === 3) return [questions, reports, reasoning, vocabulary];
    if (questionNumber === 4 || questionNumber === 6 || questionNumber === 8) return [reports, reasoning];
    if (questionNumber === 5) return [questions];
    if (questionNumber === 7) return [questions, reports];
  }
  if (difficulty === 'high' && taskNumber === '01' && questionNumber <= 2) return [vocabulary, reasoning];
  if (questionNumber === 3 && taskNumber === '02' && (difficulty === 'basic' || difficulty === 'advanced')) {
    return [vocabulary, reasoning];
  }
  if (questionNumber <= 4) return [vocabulary];
  if (questionNumber === 5) return [reports, reasoning];
  if (questionNumber === 6) {
    if (difficulty === 'basic' && taskNumber === '02') return [reports];
    if (difficulty === 'high') return [reports, reasoning];
    return [questions];
  }
  if (questionNumber === 7) {
    if (difficulty === 'basic') return [vocabulary, reasoning];
    if (difficulty === 'advanced' && taskNumber === '01') return [vocabulary, reports];
    if (difficulty === 'advanced') return [questions, reports];
    return [vocabulary, questions, reports];
  }
  return [reports];
}

describe('二年级下册英语第四单元 Time 闯关内容', () => {
  it('确认48道课程活动的题源兼容数为每档16道唯一候选', async () => {
    const unit = await loadUnit(sourceUnitId);
    expect(unit).toBeDefined();
    if (!unit) return;

    expect(unit.sourceTopics).toEqual(['认识和读出数字时间', 'What time is it?', '用简短句子报告钟面显示的时间']);
    const activities = Object.values(unit.difficultyTracks).flatMap((track) => track.tasks)
      .flatMap((task) => task.sessions.flatMap((session) => session.activities));
    expect(activities).toHaveLength(48);
    const fingerprints = await Promise.all(activities.map((activity) => fingerprintActivity(activity)));
    expect(new Set(fingerprints).size).toBe(48);
    expect(Object.fromEntries((['basic', 'advanced', 'high'] as const).map((difficulty) => [
      difficulty,
      activities.filter((activity) => activity.id.includes(`/${difficulty}/`)).length,
    ]))).toEqual({ basic: 16, advanced: 16, high: 16 });
  });

  it('为每档补足至少30道唯一候选并按五个挑战任务分组', () => {
    expect(() => parseChallengeManifest(manifest)).not.toThrow();
    const group = manifest.groups.find(({ definition }) => definition.id === groupId);
    expect(group).toMatchObject({
      releaseIntent: 'released',
      definition: {
        id: groupId,
        kind: 'unit',
        grade: 2,
        semester: 2,
        subject: 'english',
        sourceUnitIds: [sourceUnitId],
        learningTaskUnitIds: [sourceUnitId],
        coreKnowledgePointIds,
        tasks: [
          { id: `${groupId}/basic-01`, difficulty: 'basic', targetCount: 15 },
          { id: `${groupId}/basic-02`, difficulty: 'basic', targetCount: 15 },
          { id: `${groupId}/advanced-01`, difficulty: 'advanced', targetCount: 15 },
          { id: `${groupId}/advanced-02`, difficulty: 'advanced', targetCount: 15 },
          { id: `${groupId}/high-01`, difficulty: 'high', targetCount: 15 },
        ],
      },
    });
    expect(group?.questionIds).toHaveLength(90);
    expect(new Set(group?.questionIds).size).toBe(90);
    expect(manifest.questions).toHaveLength(90);
    expect(new Set(manifest.questions.map(({ questionId }) => questionId)).size).toBe(90);
    expect(grade2Term2EnglishUnit04SupplementalActivities).toHaveLength(42);
    expect(Object.fromEntries((['basic', 'advanced', 'high'] as const).map((difficulty) => [
      difficulty,
      grade2Term2EnglishUnit04SupplementalActivities.filter((item) => item.difficulty === difficulty).length,
    ]))).toEqual({ basic: 14, advanced: 14, high: 14 });

    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const candidates = manifest.questions.filter((question) => question.difficulty === difficulty);
      expect(candidates).toHaveLength(30);
      const covered = new Set(candidates.flatMap(({ knowledgePointIds }) => knowledgePointIds));
      expect(coreKnowledgePointIds.every((id) => covered.has(id))).toBe(true);
    }
  });

  it('逐题核对42道原创题的答案、知识点、源任务、选项、提示和解释', () => {
    const byActivityId = new Map(grade2Term2EnglishUnit04SupplementalActivities
      .map(({ activity }) => [activity.id, activity]));
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const records = manifest.questions.filter((question) => question.questionId
        .startsWith(`challenge-question:challenge-supplement-${groupId}-${difficulty}-`));
      expect(records).toHaveLength(expectedSupplementAnswers[difficulty].length);
      records.forEach((question, index) => {
        const supplemental = grade2Term2EnglishUnit04SupplementalActivities.find(({ activity }) => activity.id === question.activityId);
        const activity = byActivityId.get(question.activityId);
        expect(activity, question.activityId).toBeDefined();
        expect(activity?.kind).toBe('choice');
        if (activity?.kind !== 'choice' || !supplemental) return;
        expect(answerSummary(activity), `${difficulty} 第 ${index + 1} 题答案`).toBe(expectedSupplementAnswers[difficulty][index]);
        expect(question.difficulty).toBe(difficulty);
        expect(question.knowledgePointIds).toEqual(supplemental.knowledgePointIds);
        expect(question.knowledgePointIds).toEqual(expectedSupplementKnowledgePointIds[difficulty][index]);
        expect(question.knowledgePointIds.length).toBeGreaterThan(0);
        expect(question.knowledgePointIds.every((id) => coreKnowledgePointIds.includes(id))).toBe(true);
        expect(supplemental.sourceTaskId).toBe(`${sourceUnitId}/${difficulty}/task-${index < 7 ? '01' : '02'}`);
        expect(activity.options).toHaveLength(3);
        expect(new Set(activity.options.map(({ label }) => label)).size).toBe(3);
        expect(activity.options.some(({ id }) => id === activity.correctOptionId)).toBe(true);
        expect(submitAnswer(activity, activity.correctOptionId)).toBe(true);
        expect(activity.explanation.length).toBeGreaterThan(0);
        expect(activity.hint.length).toBeGreaterThan(0);
        expect(question.approved).toBe(true);
        expect(question.answerLeakageReviewed).toBe(true);
        expect(question.approvedBy).toContain('self-review');
        expect(question.lifecycle).toBe('active');
      });
    }
  });

  it('逐题台账、源Task映射、90道候选与内容指纹一致且新增题无近似重复', async () => {
    const group = manifest.groups.find(({ definition }) => definition.id === groupId);
    const unit = await loadUnit(sourceUnitId);
    expect(unit).toBeDefined();
    if (!unit) return;
    const sourceActivities = Object.values(unit.difficultyTracks).flatMap((track) => track.tasks)
      .flatMap((task) => task.sessions.flatMap((session) => session.activities));
    const supplemental = grade2Term2EnglishUnit04SupplementalActivities;
    const allActivities = [...sourceActivities, ...supplemental.map(({ activity }) => activity)];
    const activitiesById = new Map(allActivities.map((activity) => [activity.id, activity]));
    const sourceUnitByActivityId = new Map(allActivities.map((activity) => [activity.id, sourceUnitId]));
    const sourceTaskByActivityId = new Map([
      ...sourceActivities.map((activity) => [activity.id, sourceTaskId(activity.id)] as const),
      ...supplemental.map(({ activity, sourceTaskId: taskId }) => [activity.id, taskId] as const),
    ]);
    const candidateRecords = (
      manifest.questions.filter((question) => group?.questionIds.includes(question.questionId))
    ) as unknown as ChallengeQuestionRecord[];
    const ledgerPath = resolve(process.cwd(), `docs/challenges/${groupId}-question-review.tsv`);
    expect(existsSync(ledgerPath)).toBe(true);
    if (!existsSync(ledgerPath)) return;
    const rows = readTsv(ledgerPath);
    expect(rows).toHaveLength(90);
    expect(new Set(rows.map(({ 题目ID }) => 题目ID)).size).toBe(90);
    expect(rows.filter(({ 来源 }) => 来源 === '课程原题')).toHaveLength(48);
    expect(rows.filter(({ 来源 }) => 来源 === '原创补题')).toHaveLength(42);
    expect(rows.every(({ 审核状态 }) => 审核状态 === '作者自审通过；未独立教育者复核')).toBe(true);

    const expectedTaskIds = (['basic', 'advanced', 'high'] as const)
      .flatMap((difficulty) => ['01', '02'].map((task) => `${sourceUnitId}/${difficulty}/task-${task}`));
    for (const taskId of expectedTaskIds) {
      const mappedQuestionIds = candidateRecords.filter((question) => sourceTaskByActivityId.get(question.activityId) === taskId);
      expect(mappedQuestionIds.length, `源任务 ${taskId} 至少有映射题`).toBeGreaterThan(0);
      expect(mappedQuestionIds.every((question) => question.knowledgePointIds.length > 0)).toBe(true);
    }

    const candidateByQuestionId = new Map(candidateRecords.map((question) => [question.questionId, question]));
    const fingerprints = await Promise.all(candidateRecords.map(async (question) => {
      const activity = activitiesById.get(question.activityId);
      expect(activity, question.activityId).toBeDefined();
      if (!activity) return '';
      const fingerprint = await fingerprintActivity(activity);
      expect(question.approvedContentFingerprint, question.questionId).toBe(fingerprint);
      expect(question.approved).toBe(true);
      expect(question.answerLeakageReviewed).toBe(true);
      expect(question.lifecycle).toBe('active');
      expect(question.approvedBy).toContain('self-review');
      expect(question.approvedAt).toBe('2026-10-28T00:00:00.000Z');
      if (!question.activityId.startsWith('challenge-supplement-')) {
        expect(question.knowledgePointIds).toEqual(expectedSourceKnowledgePointIds(question.activityId));
      }
      return fingerprint;
    }));
    expect(new Set(fingerprints).size).toBe(90);

    for (const row of rows) {
      const candidate = candidateByQuestionId.get(row['题目ID']);
      expect(candidate, row['题目ID']).toBeDefined();
      const activity = activitiesById.get(candidate!.activityId)!;
      expect(row['活动ID'], row['题目ID']).toBe(candidate!.activityId);
      expect(row['源任务'], row['题目ID']).toBe(sourceTaskByActivityId.get(candidate!.activityId));
      expect(row['正确答案'], row['题目ID']).toBe(answerSummary(activity));
      expect(row['知识点'], row['题目ID']).toBe(candidate!.knowledgePointIds.join('；'));
      expect(row['题干'], row['题目ID']).toBe(activity.prompt);
      expect(row['选项'], row['题目ID']).toBe(activity.kind === 'choice'
        ? activity.options.map(({ label }) => label).join(' / ')
        : '');
      expect(row['提示'], row['题目ID']).toBe(activity.hint);
      expect(row['解析'], row['题目ID']).toBe(activity.explanation);
      expect(row['来源']).toBe(candidate!.activityId.startsWith('challenge-supplement-') ? '原创补题' : '课程原题');
      expect(row['教材版本与知识范围']).toContain('tapx-fallback');
      expect(row['教材版本与知识范围']).toContain('5a80345f2043ba6f8db8d7be9cf3db82725ff1f7');
      expect(row['教材版本与知识范围']).toContain('学校开课状态未确认');
      expect(row['答案与范围核查'].length).toBeGreaterThan(0);
      expect(row['内容指纹'], row['题目ID']).toBe(candidate!.approvedContentFingerprint);
    }

    const uniqueness = await analyzeQuestionUniqueness(candidateRecords, activitiesById, sourceUnitByActivityId);
    expect(uniqueness.exactDuplicateGroups).toEqual([]);
    const supplementalQuestionIds = new Set(candidateRecords
      .filter(({ activityId }) => activityId.startsWith('challenge-supplement-'))
      .map(({ questionId }) => questionId));
    expect(uniqueness.similarQuestionPairs.filter(({ questionIds }) => questionIds
      .some((id) => supplementalQuestionIds.has(id)))).toEqual([]);
  });
});
