import { describe, expect, it } from 'vitest';
// @ts-expect-error Node.js is used only to inspect the review ledger during Vitest.
import { existsSync, readFileSync } from 'node:fs';
// @ts-expect-error Node.js is used only to resolve the review ledger during Vitest.
import { resolve } from 'node:path';
import type { ActivityDefinition } from '../../content/types';
import { loadUnit } from '../../content/unitLoader';
import type { ChallengeQuestionRecord } from '../domain/types';
import { fingerprintActivity } from './fingerprint';
import { analyzeQuestionUniqueness } from './questionUniqueness';
import { parseChallengeManifest } from './manifestSchema';
import { grade2Term2EnglishUnit06SupplementalActivities } from './grade2Term2EnglishUnit06SupplementalActivities';
import manifest from './pilot-manifest-grade2-term2-english-unit06.json';

declare const process: { cwd(): string };

const sourceUnitId = 'grade-2/term-2/english/unit-06';
const groupId = 'grade-2-term-2-english-unit-06';
const coreKnowledgePointIds = [
  'weekday-vocabulary-and-sequence',
  'day-question-and-answer',
  'weekday-activity-sentences',
  'week-plan-clue-and-reasoning',
];

const expectedSupplementQuestions: Record<'basic' | 'advanced' | 'high', Array<{ answer: string; knowledgePointIds: string[] }>> = {
  basic: [
    { answer: 'Monday → Wednesday → Sunday', knowledgePointIds: [coreKnowledgePointIds[0]!, coreKnowledgePointIds[3]!] },
    { answer: 'Wednesday', knowledgePointIds: [coreKnowledgePointIds[0]!, coreKnowledgePointIds[3]!] },
    { answer: "A: What day is it today? B: It's Sunday today.", knowledgePointIds: [coreKnowledgePointIds[1]!, coreKnowledgePointIds[2]!] },
    { answer: "It's Saturday today.", knowledgePointIds: [coreKnowledgePointIds[1]!, coreKnowledgePointIds[2]!] },
    { answer: "把 Thursday 改为 Wednesday：It's Wednesday today.", knowledgePointIds: [coreKnowledgePointIds[2]!, coreKnowledgePointIds[3]!] },
    { answer: 'Saturday', knowledgePointIds: [coreKnowledgePointIds[0]!, coreKnowledgePointIds[3]!] },
    { answer: '活动安排在星期日。', knowledgePointIds: [coreKnowledgePointIds[2]!, coreKnowledgePointIds[3]!] },
    { answer: 'Tuesday → Thursday → Saturday', knowledgePointIds: [coreKnowledgePointIds[0]!, coreKnowledgePointIds[3]!] },
    { answer: 'Friday', knowledgePointIds: [coreKnowledgePointIds[0]!] },
    { answer: "问句：What day is it today?；回答：It's Wednesday today.", knowledgePointIds: [coreKnowledgePointIds[1]!, coreKnowledgePointIds[2]!] },
    { answer: 'on', knowledgePointIds: [coreKnowledgePointIds[2]!, coreKnowledgePointIds[3]!] },
    { answer: 'Monday → Tuesday → Wednesday → Thursday → Friday → Saturday → Sunday', knowledgePointIds: [coreKnowledgePointIds[0]!, coreKnowledgePointIds[3]!] },
    { answer: 'Monday and Tuesday', knowledgePointIds: [coreKnowledgePointIds[0]!, coreKnowledgePointIds[3]!] },
    { answer: "Let's play football on Wednesday.", knowledgePointIds: [coreKnowledgePointIds[2]!, coreKnowledgePointIds[3]!] },
  ],
  advanced: [
    { answer: 'Monday → Wednesday → Thursday → Saturday', knowledgePointIds: [coreKnowledgePointIds[0]!, coreKnowledgePointIds[3]!] },
    { answer: 'Thursday', knowledgePointIds: [coreKnowledgePointIds[0]!, coreKnowledgePointIds[3]!] },
    { answer: "A: What day is it today? B: It's Tuesday today.", knowledgePointIds: [coreKnowledgePointIds[1]!, coreKnowledgePointIds[2]!] },
    { answer: '前一句询问今天星期几；后一句报告今天是星期五。', knowledgePointIds: [coreKnowledgePointIds[1]!, coreKnowledgePointIds[2]!] },
    { answer: "Let's play football on Thursday.", knowledgePointIds: [coreKnowledgePointIds[2]!, coreKnowledgePointIds[3]!] },
    { answer: "Let's play football on Sunday.", knowledgePointIds: [coreKnowledgePointIds[2]!, coreKnowledgePointIds[3]!] },
    { answer: 'Monday, Tuesday, Wednesday, Thursday, Friday', knowledgePointIds: [coreKnowledgePointIds[0]!, coreKnowledgePointIds[3]!] },
    { answer: 'Wednesday', knowledgePointIds: [coreKnowledgePointIds[0]!, coreKnowledgePointIds[3]!] },
    { answer: "A: What day is it today? B: It's Sunday today.；A: What day is it today? B: It's Tuesday today.", knowledgePointIds: [coreKnowledgePointIds[1]!, coreKnowledgePointIds[2]!, coreKnowledgePointIds[3]!] },
    { answer: "Let's play football on Thursday.", knowledgePointIds: [coreKnowledgePointIds[2]!, coreKnowledgePointIds[3]!] },
    { answer: 'Wednesday → Thursday → Friday', knowledgePointIds: [coreKnowledgePointIds[0]!, coreKnowledgePointIds[3]!] },
    { answer: "It's Monday today.；Let's play football on Sunday.", knowledgePointIds: [coreKnowledgePointIds[1]!, coreKnowledgePointIds[2]!, coreKnowledgePointIds[3]!] },
    { answer: "It's Thursday today.", knowledgePointIds: [coreKnowledgePointIds[1]!, coreKnowledgePointIds[2]!, coreKnowledgePointIds[3]!] },
    { answer: "Wednesday → Thursday → Saturday；Let's play football on Thursday.", knowledgePointIds: [coreKnowledgePointIds[2]!, coreKnowledgePointIds[3]!] },
  ],
  high: [
    { answer: 'Monday → Tuesday → Friday → Sunday', knowledgePointIds: [coreKnowledgePointIds[0]!, coreKnowledgePointIds[3]!] },
    { answer: "A: What day is it today? B: It's Saturday today.；后一天：Sunday", knowledgePointIds: [coreKnowledgePointIds[1]!, coreKnowledgePointIds[2]!, coreKnowledgePointIds[3]!] },
    { answer: 'Saturday；Friday', knowledgePointIds: [coreKnowledgePointIds[0]!, coreKnowledgePointIds[3]!] },
    { answer: "It's Friday today.；Let's play football on Thursday.", knowledgePointIds: [coreKnowledgePointIds[1]!, coreKnowledgePointIds[2]!, coreKnowledgePointIds[3]!] },
    { answer: '工作日：Monday、Tuesday、Wednesday、Thursday、Friday；周末：Saturday、Sunday', knowledgePointIds: [coreKnowledgePointIds[0]!, coreKnowledgePointIds[3]!] },
    { answer: "Let's play football on Tuesday.；Let's play football on Saturday.", knowledgePointIds: [coreKnowledgePointIds[2]!, coreKnowledgePointIds[3]!] },
    { answer: "星期四：Thursday；问答：What day is it today? — It's Thursday today.；活动：Let's play football on Sunday.", knowledgePointIds: coreKnowledgePointIds },
    { answer: 'Tuesday → Thursday → Saturday → Sunday', knowledgePointIds: [coreKnowledgePointIds[0]!, coreKnowledgePointIds[3]!] },
    { answer: "Wednesday → Thursday → Friday；It's Wednesday today.；Let's play football on Friday.", knowledgePointIds: [coreKnowledgePointIds[0]!, coreKnowledgePointIds[2]!, coreKnowledgePointIds[3]!] },
    { answer: 'Sunday 是活动安排的日期；这句话不是在报告今天星期几。', knowledgePointIds: [coreKnowledgePointIds[2]!, coreKnowledgePointIds[3]!] },
    { answer: 'Monday', knowledgePointIds: [coreKnowledgePointIds[0]!, coreKnowledgePointIds[3]!] },
    { answer: 'Wednesday → Thursday → Friday', knowledgePointIds: [coreKnowledgePointIds[0]!, coreKnowledgePointIds[3]!] },
    { answer: 'Friday 是星期一到星期五中的工作日；Sunday 是周末。', knowledgePointIds: [coreKnowledgePointIds[0]!, coreKnowledgePointIds[2]!, coreKnowledgePointIds[3]!] },
    { answer: 'Monday–Friday 是工作日；What day is it today? — It’s Saturday today.；Let’s play football on Sunday.', knowledgePointIds: coreKnowledgePointIds },
  ],
};

const expectedSourceTaskKnowledgePointIds: Record<string, string[]> = {
  [`${sourceUnitId}/basic/task-01`]: [coreKnowledgePointIds[0]!, coreKnowledgePointIds[1]!, coreKnowledgePointIds[3]!],
  [`${sourceUnitId}/basic/task-02`]: [coreKnowledgePointIds[0]!, coreKnowledgePointIds[1]!, coreKnowledgePointIds[3]!],
  [`${sourceUnitId}/advanced/task-01`]: [coreKnowledgePointIds[0]!, coreKnowledgePointIds[1]!, coreKnowledgePointIds[3]!],
  [`${sourceUnitId}/advanced/task-02`]: [coreKnowledgePointIds[0]!, coreKnowledgePointIds[1]!, coreKnowledgePointIds[3]!],
  [`${sourceUnitId}/high/task-01`]: [coreKnowledgePointIds[0]!, coreKnowledgePointIds[2]!, coreKnowledgePointIds[3]!],
  [`${sourceUnitId}/high/task-02`]: [coreKnowledgePointIds[0]!, coreKnowledgePointIds[2]!, coreKnowledgePointIds[3]!],
};

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
  const match = activityId.match(/^(grade-2\/term-2\/english\/unit-06\/(?:basic|advanced|high)\/task-0[12])\/session-\d+\/question-\d+$/u);
  return match?.[1] ?? '';
}

describe('二年级下册英语第六单元 My Week 闯关内容', () => {
  it('确认课程主题、48道题源及每档16道兼容唯一候选', async () => {
    const unit = await loadUnit(sourceUnitId);
    expect(unit).toBeDefined();
    if (!unit) return;

    expect(unit.sourceTopics).toEqual([
      '星期一至星期日',
      '询问和回答今天是星期几',
      '在星期安排简单活动',
    ]);
    const activities = Object.values(unit.difficultyTracks).flatMap((track) => track.tasks)
      .flatMap((task) => task.sessions.flatMap((session) => session.activities));
    expect(activities).toHaveLength(48);
    const stats = await Promise.all((['basic', 'advanced', 'high'] as const).map(async (difficulty) => {
      const candidates = activities.filter((activity) => activity.id.includes(`/${difficulty}/`));
      const fingerprints = await Promise.all(candidates.map((activity) => fingerprintActivity(activity)));
      return [difficulty, { sourceCount: candidates.length, uniqueCount: new Set(fingerprints).size }] as const;
    }));
    expect(Object.fromEntries(stats)).toEqual({
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
    expect(grade2Term2EnglishUnit06SupplementalActivities).toHaveLength(42);
    expect(Object.fromEntries((['basic', 'advanced', 'high'] as const).map((difficulty) => [
      difficulty,
      grade2Term2EnglishUnit06SupplementalActivities.filter((item) => item.difficulty === difficulty).length,
    ]))).toEqual({ basic: 14, advanced: 14, high: 14 });
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const candidates = manifest.questions.filter((question) => question.difficulty === difficulty);
      expect(candidates).toHaveLength(30);
      const covered = new Set(candidates.flatMap(({ knowledgePointIds }) => knowledgePointIds));
      expect(coreKnowledgePointIds.every((id) => covered.has(id))).toBe(true);
    }
  });

  it('逐题固定42道原创补题的核定答案、知识点和唯一选项', () => {
    expect(grade2Term2EnglishUnit06SupplementalActivities).toHaveLength(42);
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const items = grade2Term2EnglishUnit06SupplementalActivities.filter((item) => item.difficulty === difficulty);
      expect(items).toHaveLength(14);
      expect(items.map(({ activity, knowledgePointIds }) => ({
        answer: answerSummary(activity),
        knowledgePointIds,
      }))).toEqual(expectedSupplementQuestions[difficulty]);
      for (const item of items) {
        expect(item.sourceUnitId).toBe(sourceUnitId);
        expect(item.sourceTaskId).toMatch(new RegExp(`^${sourceUnitId}/${difficulty}/task-0[12]$`, 'u'));
        expect(item.activity.id).toMatch(/^challenge-supplement-grade-2-term-2-english-unit-06-/u);
        expect(item.activity.kind).toBe('choice');
        if (item.activity.kind !== 'choice') continue;
        const labels = item.activity.options.map(({ label }) => label);
        expect(labels).toHaveLength(3);
        expect(new Set(labels).size).toBe(3);
        expect(labels.filter((label) => label === answerSummary(item.activity))).toHaveLength(1);
        expect(item.activity.hint.trim().length).toBeGreaterThan(0);
        expect(item.activity.explanation.trim().length).toBeGreaterThan(0);
      }
    }
  });

  it('逐题台账、源Task映射、90道候选与内容指纹一致且无精确重复', async () => {
    const group = manifest.groups.find(({ definition }) => definition.id === groupId);
    const unit = await loadUnit(sourceUnitId);
    expect(unit).toBeDefined();
    if (!unit) return;
    const sourceActivities = Object.values(unit.difficultyTracks).flatMap((track) => track.tasks)
      .flatMap((task) => task.sessions.flatMap((session) => session.activities));
    const supplemental = grade2Term2EnglishUnit06SupplementalActivities;
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
      expect(mapped.filter((question) => !question.activityId.startsWith('challenge-supplement-'))
        .every((question) => question.knowledgePointIds.join('；') === expectedSourceTaskKnowledgePointIds[taskId]!.join('；'))).toBe(true);
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
