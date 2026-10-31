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
import { grade2Term2EnglishUnit05SupplementalActivities } from './grade2Term2EnglishUnit05SupplementalActivities';
import manifest from './pilot-manifest-grade2-term2-english-unit05.json';

declare const process: { cwd(): string };

const sourceUnitId = 'grade-2/term-2/english/unit-05';
const groupId = 'grade-2-term-2-english-unit-05';
const coreKnowledgePointIds = [
  'daily-routine-vocabulary',
  'daily-time-question-and-answer',
  'routine-schedule-sentences',
  'daily-routine-clue-and-reasoning',
];
const expectedSupplementAnswers = {
  basic: [
    '起床', 'eat breakfast', 'When do you go to school every day?', 'I get up at 6:30.',
    'I go to school at 8:00.', 'eat breakfast', 'A: When do you get up every day? B: I get up at 6:30.',
    'go home', '去上学', 'I eat breakfast at 7:00.', 'at',
    'get up — 起床；eat breakfast — 吃早餐', 'When do you eat breakfast every day?',
    '记录A正确；记录B应改为 I go to school at 7:30.',
  ],
  advanced: [
    'A: When do you get up every day? B: I get up at 6:30.；A: When do you eat breakfast every day? B: I eat breakfast at seven.',
    '“我去上学”对应 go to school；句子使用 I go to school at 8:00.',
    'I eat breakfast at 7:00.',
    'get up at 6:30；eat breakfast at seven',
    '询问每天什么时候回家的问句',
    '先问“When do you eat breakfast every day?”，再回答“I eat breakfast at 7:00.”',
    '问题是 When do you get up every day?；回答是 I get up at 6:30.',
    'I go home at four.',
    '第二条记录有误：把 I eat breakfast at 7:00. 改为 I get up at 7:00.',
    'I go home at four.',
    'A是问句；B是回答句。',
    'A和C正确；B应改为 go home — 回家。',
    'A: When do you eat breakfast every day? B: I eat breakfast at seven.',
    'A: When do you go home every day? B: I go home at four.',
  ],
  high: [
    'get up — 起床；I get up at 6:30.；eat breakfast — 吃早餐；I eat breakfast at seven.',
    'A保留 I go to school at 8:00.；B改为 get up.',
    'get up → eat breakfast → go to school → go home',
    'I get up at 6:30.；I eat breakfast at 7:00.；I go to school at 8:00.；I go home at four.',
    'A保留 When do you go home every day?；B改为 I go home at four.',
    '先保留正确的早餐回答；把起床回答改为 I get up at 6:30.',
    'get up 和 eat breakfast 属于早晨活动；go home 属于放学后的活动。',
    '把 B 的 I eat breakfast at seven. 改为 I get up at seven.',
    'A: When do you get up every day? B: I get up at 6:30.；A: When do you go to school every day? B: I go to school at 8:00.',
    'When do you eat breakfast every day? 是问句；I eat breakfast at 7:00. 是回答。',
    'at four 表示句子中的时间。',
    '“I go to school at 8:00.”和“我八点去上学。”相符。',
    'eat breakfast',
    '先把错误的 go home at 8:00 改为 go to school at 8:00；再把错误的 get up at four 改为 go home at four.',
  ],
} as const;
const expectedSupplementKnowledgePointIds = {
  basic: [
    ['daily-routine-vocabulary'], ['daily-routine-vocabulary'], ['daily-time-question-and-answer'],
    ['daily-time-question-and-answer', 'routine-schedule-sentences'], ['routine-schedule-sentences'],
    ['routine-schedule-sentences'], ['daily-time-question-and-answer', 'routine-schedule-sentences', 'daily-routine-clue-and-reasoning'],
    ['daily-routine-vocabulary'], ['daily-routine-vocabulary'],
    ['daily-time-question-and-answer', 'routine-schedule-sentences'], ['routine-schedule-sentences'],
    ['daily-routine-vocabulary', 'daily-routine-clue-and-reasoning'], ['daily-time-question-and-answer'],
    ['daily-routine-clue-and-reasoning', 'routine-schedule-sentences'],
  ],
  advanced: [
    ['daily-time-question-and-answer', 'routine-schedule-sentences'],
    ['daily-routine-vocabulary', 'routine-schedule-sentences'], ['routine-schedule-sentences'],
    ['daily-routine-vocabulary', 'routine-schedule-sentences'], ['daily-time-question-and-answer'],
    ['daily-routine-clue-and-reasoning', 'daily-time-question-and-answer', 'routine-schedule-sentences'],
    ['daily-time-question-and-answer', 'routine-schedule-sentences'], ['routine-schedule-sentences'],
    ['daily-routine-clue-and-reasoning', 'routine-schedule-sentences'], ['daily-time-question-and-answer'],
    ['daily-time-question-and-answer', 'routine-schedule-sentences'],
    ['daily-routine-vocabulary', 'daily-routine-clue-and-reasoning'],
    ['daily-time-question-and-answer', 'routine-schedule-sentences'],
    ['daily-time-question-and-answer', 'routine-schedule-sentences', 'daily-routine-clue-and-reasoning'],
  ],
  high: [
    ['daily-routine-vocabulary', 'routine-schedule-sentences', 'daily-routine-clue-and-reasoning'],
    ['daily-routine-vocabulary', 'routine-schedule-sentences', 'daily-routine-clue-and-reasoning'],
    ['daily-routine-vocabulary', 'daily-routine-clue-and-reasoning'],
    ['routine-schedule-sentences', 'daily-routine-clue-and-reasoning'],
    ['daily-time-question-and-answer', 'routine-schedule-sentences', 'daily-routine-clue-and-reasoning'],
    ['daily-time-question-and-answer', 'routine-schedule-sentences', 'daily-routine-clue-and-reasoning'],
    ['daily-routine-vocabulary', 'daily-routine-clue-and-reasoning'],
    ['daily-routine-vocabulary', 'routine-schedule-sentences', 'daily-routine-clue-and-reasoning'],
    ['daily-time-question-and-answer', 'routine-schedule-sentences', 'daily-routine-clue-and-reasoning'],
    ['daily-time-question-and-answer', 'routine-schedule-sentences'],
    ['routine-schedule-sentences', 'daily-routine-clue-and-reasoning'],
    ['routine-schedule-sentences', 'daily-routine-clue-and-reasoning'],
    ['daily-routine-vocabulary', 'daily-routine-clue-and-reasoning'],
    ['daily-routine-vocabulary', 'routine-schedule-sentences', 'daily-routine-clue-and-reasoning'],
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
  const match = activityId.match(/^(grade-2\/term-2\/english\/unit-05\/(?:basic|advanced|high)\/task-0[12])\/session-\d+\/question-\d+$/u);
  return match?.[1] ?? '';
}

function expectedSourceKnowledgePointIds(activityId: string): string[] {
  const match = activityId.match(/\/(basic|advanced|high)\/task-(01|02)\/session-\d+\/question-(\d+)$/u);
  if (!match) return [];
  const [, difficulty, taskNumber, questionNumberText] = match;
  const questionNumber = Number(questionNumberText);
  const vocabulary = 'daily-routine-vocabulary';
  const questions = 'daily-time-question-and-answer';
  const sentences = 'routine-schedule-sentences';
  const reasoning = 'daily-routine-clue-and-reasoning';

  if (taskNumber === '02' && questionNumber === 3) return [vocabulary, reasoning];
  if (difficulty === 'high' && questionNumber <= 2) return [vocabulary, sentences, reasoning];
  if (difficulty === 'high' && questionNumber === 3) return [vocabulary, reasoning];
  if (difficulty === 'high' && questionNumber === 5) return [questions, sentences, reasoning];
  if (difficulty === 'high' && questionNumber === 6) return [questions, sentences, reasoning];
  if (difficulty === 'high' && questionNumber === 7) {
    if (taskNumber === '01') return [questions, sentences, reasoning];
    return [vocabulary, reasoning];
  }
  if (questionNumber <= 4) return [vocabulary];
  if (questionNumber === 5) return [questions];
  if (questionNumber === 6) return [sentences];
  if (questionNumber === 7) {
    if (difficulty === 'advanced') return [questions, sentences, reasoning];
    return [vocabulary, reasoning];
  }
  return [sentences, reasoning];
}

describe('二年级下册英语第五单元 My Day 闯关内容', () => {
  it('确认课程主题、48道题源及每档16道兼容唯一候选', async () => {
    const unit = await loadUnit(sourceUnitId);
    expect(unit).toBeDefined();
    if (!unit) return;

    expect(unit.sourceTopics).toEqual([
      'get up、eat breakfast、go to school、go home',
      'When do you…every day? 日常活动问答',
      '用 at 加时间介绍一天安排',
    ]);
    const activities = Object.values(unit.difficultyTracks).flatMap((track) => track.tasks)
      .flatMap((task) => task.sessions.flatMap((session) => session.activities));
    expect(activities).toHaveLength(48);
    const sourceStats = await Promise.all((['basic', 'advanced', 'high'] as const).map(async (difficulty) => {
      const candidates = activities.filter((activity) => activity.id.includes(`/${difficulty}/`));
      const fingerprints = await Promise.all(candidates.map((activity) => fingerprintActivity(activity)));
      return [difficulty, { sourceCount: candidates.length, uniqueCount: new Set(fingerprints).size }] as const;
    }));
    expect(Object.fromEntries(sourceStats)).toEqual({
      basic: { sourceCount: 16, uniqueCount: 16 },
      advanced: { sourceCount: 16, uniqueCount: 16 },
      high: { sourceCount: 16, uniqueCount: 16 },
    });
    expect(activities.every(({ kind }) => ['choice', 'match', 'categorize', 'order'].includes(kind))).toBe(true);
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
    expect(grade2Term2EnglishUnit05SupplementalActivities).toHaveLength(42);
    expect(Object.fromEntries((['basic', 'advanced', 'high'] as const).map((difficulty) => [
      difficulty,
      grade2Term2EnglishUnit05SupplementalActivities.filter((item) => item.difficulty === difficulty).length,
    ]))).toEqual({ basic: 14, advanced: 14, high: 14 });
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const candidates = manifest.questions.filter((question) => question.difficulty === difficulty);
      expect(candidates).toHaveLength(30);
      const covered = new Set(candidates.flatMap(({ knowledgePointIds }) => knowledgePointIds));
      expect(coreKnowledgePointIds.every((id) => covered.has(id))).toBe(true);
    }
  });

  it('逐题核对42道原创题的答案、知识点、源任务、干扰项、提示与解析', () => {
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const records = manifest.questions.filter((question) => question.questionId
        .startsWith(`challenge-question:challenge-supplement-${groupId}-${difficulty}-`));
      expect(records).toHaveLength(expectedSupplementAnswers[difficulty].length);
      records.forEach((question, index) => {
        const supplemental = grade2Term2EnglishUnit05SupplementalActivities.find(({ activity }) => activity.id === question.activityId);
        const activity = supplemental?.activity;
        expect(activity, question.activityId).toBeDefined();
        expect(activity?.kind).toBe('choice');
        if (!activity || activity.kind !== 'choice' || !supplemental) return;
        expect(answerSummary(activity), `${difficulty} 第 ${index + 1} 题答案`).toBe(expectedSupplementAnswers[difficulty][index]);
        expect(question.difficulty).toBe(difficulty);
        expect(question.knowledgePointIds).toEqual(expectedSupplementKnowledgePointIds[difficulty][index]);
        expect(question.knowledgePointIds).toEqual(supplemental.knowledgePointIds);
        expect(question.knowledgePointIds.length).toBeGreaterThan(0);
        expect(question.knowledgePointIds.every((id) => coreKnowledgePointIds.includes(id))).toBe(true);
        expect(supplemental.sourceTaskId).toBe(`${sourceUnitId}/${difficulty}/task-${index < 7 ? '01' : '02'}`);
        expect(activity.options).toHaveLength(3);
        expect(new Set(activity.options.map(({ label }) => label)).size).toBe(3);
        expect(activity.options.some(({ id }) => id === activity.correctOptionId)).toBe(true);
        expect(submitAnswer(activity, activity.correctOptionId)).toBe(true);
        expect(activity.prompt.length).toBeGreaterThan(0);
        expect(activity.hint.length).toBeGreaterThan(0);
        expect(activity.explanation.length).toBeGreaterThan(0);
        expect(question.approved).toBe(true);
        expect(question.answerLeakageReviewed).toBe(true);
        expect(question.approvedBy).toContain('self-review');
        expect(question.lifecycle).toBe('active');
      });
    }
  });

  it('逐题台账、源Task映射、90道候选与内容指纹一致且无精确重复', async () => {
    const group = manifest.groups.find(({ definition }) => definition.id === groupId);
    const unit = await loadUnit(sourceUnitId);
    expect(unit).toBeDefined();
    if (!unit) return;
    const sourceActivities = Object.values(unit.difficultyTracks).flatMap((track) => track.tasks)
      .flatMap((task) => task.sessions.flatMap((session) => session.activities));
    const supplemental = grade2Term2EnglishUnit05SupplementalActivities;
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
      const mapped = candidateRecords.filter((question) => sourceTaskByActivityId.get(question.activityId) === taskId);
      expect(mapped.length, `源任务 ${taskId} 至少有映射题`).toBeGreaterThan(0);
      expect(mapped.every((question) => question.knowledgePointIds.length > 0)).toBe(true);
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
  });
});
