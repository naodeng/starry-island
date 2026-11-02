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
import { grade2Term2EnglishUnit01SupplementalActivities } from './grade2Term2EnglishUnit01SupplementalActivities';
import manifest from './pilot-manifest-grade2-term2-english-unit01.json';

declare const process: { cwd(): string };

const sourceUnitId = 'grade-2/term-2/english/unit-01';
const groupId = 'grade-2-term-2-english-unit-01';
const coreKnowledgePointIds = [
  'playtime-activity-vocabulary',
  'can-cannot-ability-statements',
  'can-ability-questions-and-answers',
  'ability-records-and-activity-planning',
];
const expectedSupplementAnswers = {
  basic: [
    '游泳', 'ride a bike', '踢足球', 'fly a kite', 'play football',
    'swim、ride a bike、fly a kite', 'swim—游泳；fly a kite—放风筝',
    'I can swim.；I cannot play football.', 'I can fly a kite.；I cannot ride a bike.',
    'We cannot swim.', 'She can fly a kite.', 'I can play football.', 'Can your friend swim?', 'Can you play football?',
  ],
  advanced: [
    'swim；ride a bike', '把 fly a kite 连到放风筝。', 'play football；ride a bike',
    '球类：play football；其他：swim、fly a kite', 'Can you fly a kite?',
    'Can you swim?；Can you ride a bike?', 'Can your friend play football?',
    'She can ride a bike.；She cannot swim.', 'He cannot fly a kite.',
    'We can play football.；We cannot ride a bike.', 'She cannot swim.', '她会骑自行车。',
    'Can he play football?', 'Can your friend swim?',
  ],
  high: [
    'I can swim.；I cannot fly a kite.', 'A: I can play football.；B: I cannot ride a bike.',
    'I can play football.；I cannot swim.',
    'I can swim.；I cannot ride a bike.；I can fly a kite.',
    '保留两行；A用 can，B用 cannot。', '让她负责骑自行车活动。', 'Can she ride a bike?',
    'I can fly a kite.；I cannot swim.', '只把 cannot 改成 can。',
    'He can swim.；He cannot play football.', 'Can you swim?；I can swim.',
    'I can fly a kite.；I cannot ride a bike.；I can play football.',
    '先问 Can you fly a kite?；记录仍写 cannot。', '甲参加游泳，乙参加骑自行车。',
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

describe('二年级下册英语第一单元 Playtime 闯关内容', () => {
  it('确认48道课程活动的题源兼容数为每档16道唯一候选', async () => {
    const unit = await loadUnit(sourceUnitId);
    expect(unit).toBeDefined();
    if (!unit) return;

    const activities = Object.values(unit.difficultyTracks).flatMap((track) => track.tasks)
      .flatMap((task) => task.sessions.flatMap((session) => session.activities));
    expect(activities).toHaveLength(48);
    const fingerprints = await Promise.all(activities.map((activity) => fingerprintActivity(activity)));
    expect(new Set(fingerprints).size).toBe(48);
    expect(Object.fromEntries(['basic', 'advanced', 'high'].map((difficulty) => [
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
      },
    });
    expect(group?.definition.tasks.map(({ id }) => id)).toEqual([
      `${groupId}/basic-01`, `${groupId}/basic-02`, `${groupId}/advanced-01`,
      `${groupId}/advanced-02`, `${groupId}/high-01`,
    ]);
    expect(group?.definition.tasks.every(({ targetCount }) => targetCount === 15)).toBe(true);
    expect(group?.questionIds).toHaveLength(90);
    expect(new Set(group?.questionIds).size).toBe(90);
    expect(manifest.questions).toHaveLength(90);
    expect(new Set(manifest.questions.map(({ questionId }) => questionId))).toEqual(new Set(group?.questionIds));
    expect(Object.fromEntries(['basic', 'advanced', 'high'].map((difficulty) => [
      difficulty,
      manifest.questions.filter((question) => group?.questionIds.includes(question.questionId)
        && question.difficulty === difficulty).length,
    ]))).toEqual({ basic: 30, advanced: 30, high: 30 });
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const covered = new Set(manifest.questions
        .filter((question) => group?.questionIds.includes(question.questionId) && question.difficulty === difficulty)
        .flatMap(({ knowledgePointIds }) => knowledgePointIds));
      expect(coreKnowledgePointIds.every((id) => covered.has(id))).toBe(true);
    }
    expect(grade2Term2EnglishUnit01SupplementalActivities).toHaveLength(42);
    expect(Object.fromEntries(['basic', 'advanced', 'high'].map((difficulty) => [
      difficulty,
      grade2Term2EnglishUnit01SupplementalActivities.filter((item) => item.difficulty === difficulty).length,
    ]))).toEqual({ basic: 14, advanced: 14, high: 14 });
  });

  it('逐题核对42道原创题的答案、知识点、选项、提示、解析和评分', async () => {
    const activitiesById = new Map(grade2Term2EnglishUnit01SupplementalActivities.map(({ activity }) => [activity.id, activity]));
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const records = manifest.questions.filter((question) => question.questionId.startsWith(`challenge-question:challenge-supplement-${groupId}-${difficulty}-`));
      expect(records).toHaveLength(expectedSupplementAnswers[difficulty].length);
      records.forEach((question, index) => {
        const activity = activitiesById.get(question.activityId);
        expect(activity, question.activityId).toBeDefined();
        expect(activity?.kind).toBe('choice');
        if (activity?.kind !== 'choice') return;
        const answer = answerSummary(activity);
        expect(answer, `${difficulty} 第 ${index + 1} 题答案`).toBe(expectedSupplementAnswers[difficulty][index]);
        expect(question.knowledgePointIds).toEqual(grade2Term2EnglishUnit01SupplementalActivities
          .find((item) => item.activity.id === activity.id)?.knowledgePointIds);
        expect(question.knowledgePointIds.every((id) => coreKnowledgePointIds.includes(id))).toBe(true);
        expect(activity.options).toHaveLength(3);
        expect(new Set(activity.options.map(({ label }) => label)).size).toBe(3);
        expect(activity.options.some(({ id }) => id === activity.correctOptionId)).toBe(true);
        expect(submitAnswer(activity, activity.correctOptionId)).toBe(true);
        expect(activity.prompt).not.toContain(answer);
        expect(activity.hint).not.toContain(answer);
        expect(activity.explanation.length).toBeGreaterThan(0);
        expect(question.approved).toBe(true);
        expect(question.answerLeakageReviewed).toBe(true);
        expect(question.approvedBy).toContain('self-review');
        expect(question.lifecycle).toBe('active');
      });
    }
  });

  it('逐题台账、90道候选与内容指纹一致且没有完全重复题', async () => {
    const group = manifest.groups.find(({ definition }) => definition.id === groupId);
    const unit = await loadUnit(sourceUnitId);
    expect(unit).toBeDefined();
    if (!unit) return;
    const sourceActivities = Object.values(unit.difficultyTracks).flatMap((track) => track.tasks)
      .flatMap((task) => task.sessions.flatMap((session) => session.activities));
    const allActivities = [...sourceActivities, ...grade2Term2EnglishUnit01SupplementalActivities.map(({ activity }) => activity)];
    const activitiesById = new Map(allActivities.map((activity) => [activity.id, activity]));
    const sourceUnitByActivityId = new Map(allActivities.map((activity) => [activity.id, sourceUnitId]));
    const candidateRecords = (
      manifest.questions.filter((question) => group?.questionIds.includes(question.questionId))
    ) as unknown as ChallengeQuestionRecord[];
    const ledgerPath = resolve(process.cwd(), `docs/challenges/${groupId}-question-review.tsv`);
    expect(existsSync(ledgerPath)).toBe(true);
    if (!existsSync(ledgerPath)) return;
    const rows = readTsv(ledgerPath);
    expect(rows).toHaveLength(90);
    expect(new Set(rows.map(({ 题目ID }) => 题目ID))).toEqual(new Set(group?.questionIds));
    expect(rows.filter(({ 来源 }) => 来源 === '课程原题')).toHaveLength(48);
    expect(rows.filter(({ 来源 }) => 来源 === '原创补题')).toHaveLength(42);
    expect(rows.every(({ 审核状态 }) => 审核状态.includes('作者自审通过') && 审核状态.includes('未独立教育者复核'))).toBe(true);

    const candidateByQuestionId = new Map(candidateRecords.map((question) => [question.questionId, question]));
    const fingerprints = await Promise.all(candidateRecords.map(async (question) => {
      const activity = activitiesById.get(question.activityId);
      expect(activity, question.activityId).toBeDefined();
      if (!activity) return '';
      const fingerprint = await fingerprintActivity(activity);
      expect(question.approvedContentFingerprint, question.questionId).toBe(fingerprint);
      return fingerprint;
    }));
    expect(new Set(fingerprints).size).toBe(90);

    for (const row of rows) {
      const candidate = candidateByQuestionId.get(row['题目ID']);
      expect(candidate, row['题目ID']).toBeDefined();
      const activity = activitiesById.get(candidate!.activityId)!;
      expect(row['活动ID'], row['题目ID']).toBe(candidate!.activityId);
      expect(row['正确答案'], row['题目ID']).toBe(answerSummary(activity));
      expect(row['知识点'], row['题目ID']).toBe(candidate!.knowledgePointIds.join('；'));
      expect(row['题干'], row['题目ID']).toBe(activity.prompt);
      expect(row['选项'], row['题目ID']).toBe(activity.kind === 'choice'
        ? activity.options.map(({ label }) => label).join(' / ')
        : '');
      expect(row['提示'], row['题目ID']).toBe(activity.hint);
      expect(row['解析'], row['题目ID']).toBe(activity.explanation);
      expect(row['教材版本与知识范围']).toContain('tapx-fallback');
      expect(row['教材版本与知识范围']).toContain('学校开课状态未确认');
      expect(row['答案与范围核查'].length).toBeGreaterThan(0);
      expect(row['内容指纹'], row['题目ID']).toBe(candidate!.approvedContentFingerprint);
    }

    const uniqueness = await analyzeQuestionUniqueness(candidateRecords, activitiesById, sourceUnitByActivityId);
    expect(uniqueness.exactDuplicateGroups).toEqual([]);
    const supplementalQuestionIds = new Set(candidateRecords
      .filter(({ activityId }) => activityId.startsWith('challenge-supplement-'))
      .map(({ questionId }) => questionId));
    expect(uniqueness.similarQuestionPairs.filter(({ questionIds }) => questionIds.some((id) => supplementalQuestionIds.has(id))))
      .toEqual([]);
  });
});
