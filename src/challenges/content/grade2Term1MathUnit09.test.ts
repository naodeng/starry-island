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
import { derivePilotQuestionKnowledgePointIds } from './pilotQuestionKnowledgePoints';

declare const process: { cwd(): string };

const sourceUnitId = 'grade-2/term-1/math/unit-09';
const groupId = 'grade-2-term-1-math-unit-09';
const coreKnowledgePointIds = ['term-review-method-selection', 'term-review-result-checking'];
const allowedKnowledgePointIds = [
  ...coreKnowledgePointIds,
  'length-units-and-measurement',
  'two-digit-addition-and-subtraction',
  'multiplication-facts-and-equal-groups',
  'angle-comparison-by-opening',
  'solid-figure-observation',
  'clock-reading-and-elapsed-time',
  'systematic-pairing-and-enumeration',
  'problem-solving-and-verification',
];
const expectedSupplementAnswers = {
  basic: [
    '83', '45', '235厘米', '9厘米', '24本', '35人', '一样大', '顶面',
    '30分钟', '6种', '35 + 28 = 63', '米', '40分钟', '先固定一个第一类选项，再逐项搭配所有第二类选项', '45分钟',
  ],
  advanced: [
    '95', '35', '48支', '29张', '15厘米', '小于直角的角', '正面能看到2个面，侧面看到1个面',
    '45分钟', '4时15分', '5种', '23本', '45 + 39 = 84', '还差2组',
    '110厘米，也就是1米10厘米', '张开程度相同的角一样大', '重叠5分钟',
  ],
  high: [
    '60厘米', '55', '34块', '19支', '一样大，因为角看张开程度',
    '上面看到1个正方形，正面看到2个正方形', '9时20分', '重叠15分钟', '7种',
    '210厘米，也就是2米10厘米', '3乘6',
    '找到缺少的那组搭配并补齐', '先用乘法求总数，再减去已用数量',
    '用减法逆运算检查：92 − 24 = 68',
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

describe('二年级上册数学第九单元总复习闯关', () => {
  it('课程入口、成长索引和清单登记为同一正式单元组，三档各有30道候选', () => {
    expect(getPilotUnitChallengeGroupId(sourceUnitId)).toBe(groupId);
    expect(growthGroups.find(({ id }) => id === groupId)).toMatchObject({
      id: groupId,
      kind: 'unit',
      grade: 2,
      semester: 1,
      subject: 'math',
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
        subject: 'math',
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
  });

  it('题目可加载，保留原课程的48道活动与六个学习任务', async () => {
    const [content, unit] = await Promise.all([loadPilotChallengeContent(), loadUnit(sourceUnitId)]);
    const loaded = content.groups.find(({ group }) => group.definition.id === groupId);
    expect(loaded?.status, JSON.stringify(loaded?.issues, null, 2)).toBe('ready');
    expect(loaded?.candidates).toHaveLength(90);
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      expect(loaded?.candidates.filter((candidate) => candidate.difficulty === difficulty)).toHaveLength(30);
    }
    expect(Object.values(unit!.difficultyTracks).flatMap((track) => track.tasks)
      .flatMap((task) => task.sessions.flatMap((session) => session.activities))).toHaveLength(48);
    expect(loaded?.learningTasks).toHaveLength(6);
  });

  it('逐题核对45道原创题的答案、知识点和实际评分', async () => {
    const inputs = await loadChallengeQualityInputs();
    const supplementalRecords = manifest.questions.filter(({ questionId }) => questionId.startsWith(`challenge-question:challenge-supplement-${groupId}`));
    expect(supplementalRecords).toHaveLength(45);
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const records = supplementalRecords.filter((question) => question.difficulty === difficulty);
      expect(records).toHaveLength(expectedSupplementAnswers[difficulty].length);
      records.forEach((question, index) => {
        const activity = inputs.activitiesById.get(question.activityId);
        expect(activity, question.activityId).toBeDefined();
        expect(activity?.kind).toBe('choice');
        if (activity?.kind !== 'choice') return;
        const answer = answerSummary(activity);
        expect(answer, `${difficulty} 第 ${index + 1} 题`).toBe(expectedSupplementAnswers[difficulty][index]);
        expect(derivePilotQuestionKnowledgePointIds(sourceUnitId, activity), `${difficulty} 第 ${index + 1} 题知识点`)
          .toEqual(question.knowledgePointIds);
        expect(question.knowledgePointIds.every((id) => allowedKnowledgePointIds.includes(id))).toBe(true);
        expect(activity.options).toHaveLength(3);
        expect(new Set(activity.options.map(({ label }) => label)).size).toBe(3);
        expect(activity.options.some(({ id }) => id === activity.correctOptionId)).toBe(true);
        expect(submitAnswer(activity, activity.correctOptionId)).toBe(true);
        expect(activity.prompt).not.toContain(answer);
        expect(activity.hint).not.toContain(answer);
      });
    }
  });

  it('复习候选包含46道不重复课程题，并映射到本册知识范围', async () => {
    const unit = await loadUnit(sourceUnitId);
    const courseActivities = Object.values(unit!.difficultyTracks).flatMap((track) => track.tasks)
      .flatMap((task) => task.sessions.flatMap((session) => session.activities));
    const records = manifest.questions.filter(({ questionId }) => questionId.startsWith(`challenge-question:${sourceUnitId}/`));
    expect(courseActivities).toHaveLength(48);
    expect(records).toHaveLength(45);
    expect(records.some(({ activityId }) => activityId.endsWith('/basic/task-01/session-01/question-05'))).toBe(false);
    expect(records.some(({ activityId }) => activityId.endsWith('/advanced/task-02/session-01/question-01'))).toBe(false);
    expect(records.some(({ activityId }) => activityId.endsWith('/advanced/task-02/session-01/question-03'))).toBe(false);
    for (const activity of courseActivities) {
      const ids = derivePilotQuestionKnowledgePointIds(sourceUnitId, activity);
      expect(ids.length, activity.id).toBeGreaterThan(0);
      expect(ids.every((id) => allowedKnowledgePointIds.includes(id)), activity.id).toBe(true);
    }
  });

  it('每档覆盖本册核心复习知识点', () => {
    const group = manifest.groups.find(({ definition }) => definition.id === groupId);
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const questions = manifest.questions.filter((question) => group?.questionIds.includes(question.questionId)
        && question.difficulty === difficulty);
      const covered = new Set(questions.flatMap(({ knowledgePointIds }) => knowledgePointIds));
      expect(coreKnowledgePointIds.every((id) => covered.has(id))).toBe(true);
      expect(allowedKnowledgePointIds.slice(2).every((id) => covered.has(id))).toBe(true);
    }
  });

  it('逐题台账、候选答案、审核指纹和唯一性检查一致', async () => {
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
    expect(rows.every(({ 审核状态 }) => 审核状态.includes('逐题自审通过') && 审核状态.includes('未独立教育者复核'))).toBe(true);
    expect(rows.filter(({ 来源 }) => 来源 === '课程原题')).toHaveLength(45);
    expect(rows.filter(({ 来源 }) => 来源 === '原创补题')).toHaveLength(45);
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
    const allQuestionIds = new Set(inputs.manifest.questions.map(({ questionId }) => questionId));
    expect(group?.questionIds.every((questionId) => allQuestionIds.has(questionId))).toBe(true);
    const questions = inputs.manifest.questions.filter(({ questionId }) => group?.questionIds.includes(questionId));
    const uniqueness = await analyzeQuestionUniqueness(questions, inputs.activitiesById, inputs.sourceUnitByActivityId);
    expect(uniqueness.exactDuplicateGroups).toEqual([]);
  });
});
