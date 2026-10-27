import { describe, expect, it } from 'vitest';
// @ts-expect-error Node.js is used only to inspect the local question-review ledger during Vitest.
import { existsSync, readFileSync } from 'node:fs';
// @ts-expect-error Node.js is used only to resolve the local question-review ledger during Vitest.
import { resolve } from 'node:path';
import type { ActivityDefinition } from '../../content/types';
import { submitAnswer } from '../../learning/answers';
import { loadUnit } from '../../content/unitLoader';
import { fingerprintActivity } from './fingerprint';
import { analyzeQuestionUniqueness } from './questionUniqueness';
import { loadChallengeQualityInputs } from './qualityInputs';
import { growthGroups } from './growthGroups';
import { loadPilotChallengeContent } from './pilotContent';
import manifest from './pilotManifest';
import { getPilotUnitChallengeGroupId } from './unitLinks';
import { grade2Term1MathUnit07SupplementalActivities } from './grade2Term1MathUnit07SupplementalActivities';
import { derivePilotQuestionKnowledgePointIds } from './pilotQuestionKnowledgePoints';

declare const process: { cwd(): string };

const unitId = 'grade-2/term-1/math/unit-07';
const groupId = 'grade-2-term-1-math-unit-07';
const coreKnowledgePointIds = ['clock-reading-and-time-units', 'time-relationships-and-application'];
const allowedKnowledgePointIds = [
  'clock-reading-and-time-units',
  'time-relationships-and-application',
  'clock-hand-roles',
  'clock-five-minute-reading',
  'hour-minute-conversion',
  'elapsed-time-calculation',
  'time-schedule-planning',
];
const expectedSupplementAnswers = {
  basic: [
    '5分', '15分', '45分', '7', '10分', '1时', '2时半', '15分',
    '相等', '2时', '1时', '钟面上的时间点', '5个', '1个数字间隔',
  ],
  advanced: [
    '3时10分', '11时25分', '5时10分', '1时30分', '40分', '30分', '活动时长',
    '45分', '12时5分', '30分', '15分', '7时50分', '先看分针并按5分间隔读出分钟', '先计算经过时间再比较结束时刻',
  ],
  high: [
    '9时15分', '两项活动首尾相接，没有重叠', '11时15分', '重叠5分钟', '50分',
    '40分', '3时10分', '20分', '120分', '7时10分', '35分',
    '记录开始时刻、持续时间和结束时刻', '后一项活动开始早于前一项结束', '先核对时间是否重叠，再调整其中一项',
  ],
} as const;

function answerSummary(activity: ActivityDefinition): string {
  switch (activity.kind) {
    case 'choice': return activity.options.find(({ id }) => id === activity.correctOptionId)?.label ?? '';
    case 'arithmetic': return String(activity.correctAnswer);
    case 'match': return activity.pairs.map(({ left, right }) => `${left}→${right}`).join('；');
    case 'order': {
      const labels = new Map(activity.items.map(({ id, label }) => [id, label]));
      return activity.correctOrder.map((id) => labels.get(id) ?? '').join(' → ');
    }
    case 'categorize': {
      const labels = new Map(activity.categories.map(({ id, label }) => [id, label]));
      return activity.items.map(({ label, categoryId }) => `${label}→${labels.get(categoryId) ?? ''}`).join('；');
    }
    case 'measurement': return String(activity.targetLengthCm);
  }
}

function readTsv(path: string): Array<Record<string, string>> {
  const lines: string[] = readFileSync(path, 'utf8').trim().split(/\r?\n/u);
  const [headerLine = '', ...dataLines] = lines;
  const headers: string[] = headerLine.replace(/^\uFEFF/u, '').split('\t');
  return dataLines.map((line: string) => {
    const values = line.split('\t');
    return Object.fromEntries(headers.map((header: string, index: number) => [header, values[index] ?? '']));
  });
}

describe('二年级上册数学第七单元闯关', () => {
  it('课程入口、成长索引和清单对齐，三档各有30道候选', () => {
    expect(getPilotUnitChallengeGroupId(unitId)).toBe(groupId);
    expect(growthGroups.find(({ id }) => id === groupId)).toMatchObject({
      id: groupId,
      kind: 'unit',
      grade: 2,
      semester: 1,
      subject: 'math',
      sourceUnitIds: [unitId],
    });
    const group = manifest.groups.find(({ definition }) => definition.id === groupId);
    expect(group).toMatchObject({
      releaseIntent: 'released',
      definition: {
        id: groupId,
        kind: 'unit',
        grade: 2,
        semester: 1,
        subject: 'math',
        sourceUnitIds: [unitId],
        learningTaskUnitIds: [unitId],
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
  });

  it('题目加载后可用，且原有课程活动与学习任务完整保留', async () => {
    const [content, unit] = await Promise.all([loadPilotChallengeContent(), loadUnit(unitId)]);
    const loaded = content.groups.find(({ group: candidate }) => candidate.definition.id === groupId);
    expect(loaded?.status, JSON.stringify(loaded?.issues, null, 2)).toBe('ready');
    expect(loaded?.candidates).toHaveLength(90);
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      expect(loaded?.candidates.filter((candidate) => candidate.difficulty === difficulty)).toHaveLength(30);
    }
    expect(Object.values(unit!.difficultyTracks).flatMap((track) => track.tasks)
      .flatMap((task) => task.sessions.flatMap((session) => session.activities))).toHaveLength(48);
    expect(loaded?.learningTasks).toHaveLength(6);
  });

  it('逐题核对42道原创题的答案、知识点和生产评分', () => {
    expect(grade2Term1MathUnit07SupplementalActivities).toHaveLength(42);
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const authored = grade2Term1MathUnit07SupplementalActivities
        .filter(({ difficulty: candidateDifficulty }) => candidateDifficulty === difficulty);
      expect(authored).toHaveLength(14);
      authored.forEach(({ activity, knowledgePointIds }, index) => {
        const answer = answerSummary(activity);
        expect(answer, `${difficulty} 第 ${index + 1} 题`).toBe(expectedSupplementAnswers[difficulty][index]);
        expect(derivePilotQuestionKnowledgePointIds(unitId, activity), `${difficulty} 第 ${index + 1} 题知识点`)
          .toEqual(knowledgePointIds);
        expect(knowledgePointIds.length).toBeGreaterThan(0);
        expect(knowledgePointIds.every((id) => allowedKnowledgePointIds.includes(id))).toBe(true);
        expect(activity.kind).toBe('choice');
        if (activity.kind !== 'choice') return;
        expect(activity.options).toHaveLength(3);
        expect(new Set(activity.options.map(({ label }) => label)).size).toBe(3);
        expect(submitAnswer(activity, activity.correctOptionId)).toBe(true);
        expect(activity.hint).not.toContain(answer);
        expect(activity.prompt).not.toContain(answer);
      });
    }
  });

  it('原课程48道活动都映射到本单元时间知识点', async () => {
    const unit = await loadUnit(unitId);
    const activities = Object.values(unit!.difficultyTracks).flatMap((track) => track.tasks)
      .flatMap((task) => task.sessions.flatMap((session) => session.activities));
    expect(activities).toHaveLength(48);
    for (const activity of activities) {
      const ids = derivePilotQuestionKnowledgePointIds(unitId, activity);
      expect(ids.length, activity.id).toBeGreaterThan(0);
      expect(ids.every((id) => allowedKnowledgePointIds.includes(id)), activity.id).toBe(true);
    }
    expect(new Set(activities.flatMap((activity) => derivePilotQuestionKnowledgePointIds(unitId, activity))))
      .toEqual(new Set(allowedKnowledgePointIds));
  });

  it('逐题台账、审核指纹和题库清单一致且没有完全重复题', async () => {
    const group = manifest.groups.find(({ definition }) => definition.id === groupId);
    const [content, inputs] = await Promise.all([loadPilotChallengeContent(), loadChallengeQualityInputs()]);
    const candidates = content.groups.find(({ group: candidate }) => candidate.definition.id === groupId)?.candidates ?? [];
    const candidateByQuestionId = new Map(candidates.map((candidate) => [candidate.questionId, candidate]));
    const ledgerPath = resolve(process.cwd(), `docs/challenges/${groupId}-question-review.tsv`);
    expect(existsSync(ledgerPath)).toBe(true);
    if (!existsSync(ledgerPath)) return;
    const rows = readTsv(ledgerPath);
    expect(rows).toHaveLength(90);
    expect(new Set(rows.map(({ 题目ID }) => 题目ID))).toEqual(new Set(group?.questionIds));
    expect(rows.every(({ 审核状态 }) => 审核状态.includes('作者逐题自审通过') && 审核状态.includes('未独立教育者复核'))).toBe(true);
    expect(new Set(candidates.map(({ activity }) => activity.prompt)).size).toBe(candidates.length);
    for (const row of rows) {
      const candidate = candidateByQuestionId.get(row['题目ID']);
      expect(candidate, row['题目ID']).toBeDefined();
      expect(row['题干'], row['题目ID']).toBe(candidate!.activity.prompt);
      expect(row['正确答案'], row['题目ID']).toBe(answerSummary(candidate!.activity));
      expect(row['知识点'], row['题目ID']).toBe(candidate!.knowledgePointIds.join('；'));
      expect(row['提示'], row['题目ID']).toBe(candidate!.activity.hint);
      expect(row['解析'], row['题目ID']).toBe(candidate!.activity.explanation);
      if (candidate!.activity.kind === 'choice') {
        expect(row['选项'], row['题目ID']).toBe(candidate!.activity.options.map(({ label }) => label).join(' / '));
      }
      expect(candidate!.approved, row['题目ID']).toBe(true);
      expect(candidate!.answerLeakageReviewed, row['题目ID']).toBe(true);
    }
    const fingerprints = await Promise.all(candidates.map(({ activity }) => fingerprintActivity(activity)));
    expect(new Set(fingerprints).size).toBe(90);
    candidates.forEach((candidate, index) => {
      expect(candidate.approvedContentFingerprint, candidate.questionId).toBe(fingerprints[index]);
    });
    const questionIds = new Set(group?.questionIds ?? []);
    const questions = inputs.manifest.questions.filter(({ questionId }) => questionIds.has(questionId));
    const uniqueness = await analyzeQuestionUniqueness(questions, inputs.activitiesById, inputs.sourceUnitByActivityId);
    expect(uniqueness.exactDuplicateGroups).toEqual([]);
    expect(uniqueness.similarQuestionPairs.every(({ reason }) => reason.startsWith('题干经 Unicode NFKC'))).toBe(true);
  });
});
