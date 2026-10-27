import { describe, expect, it } from 'vitest';
// @ts-expect-error Node.js is used only to inspect the local question-review ledger during Vitest.
import { existsSync, readFileSync } from 'node:fs';
// @ts-expect-error Node.js is used only to resolve the local question-review ledger during Vitest.
import { resolve } from 'node:path';
import type { ActivityDefinition } from '../../content/types';
import { loadUnit } from '../../content/unitLoader';
import { fingerprintActivity } from './fingerprint';
import { analyzeQuestionUniqueness } from './questionUniqueness';
import { loadChallengeQualityInputs } from './qualityInputs';
import { growthGroups } from './growthGroups';
import { loadPilotChallengeContent } from './pilotContent';
import manifest from './pilotManifest';
import { getPilotUnitChallengeGroupId } from './unitLinks';
import { grade2Term1MathUnit04SupplementalActivities } from './grade2Term1MathUnit04SupplementalActivities';
import { derivePilotQuestionKnowledgePointIds } from './pilotQuestionKnowledgePoints';

declare const process: { cwd(): string };

const unitId = 'grade-2/term-1/math/unit-04';
const groupId = 'grade-2-term-1-math-unit-04';
const allowedKnowledgePointIds = ['equal-groups-multiplication', 'multiplication-facts'];
const expectedSupplementAnswers = {
  basic: [
    '4 × 2', '4 × 3', '有2组', '18颗', '4 + 4 + 4 + 4 + 4', '5 × 4', '4盘，每盘放3个橘子',
    '12颗', '15颗', '16张', '10颗', '18块', '积相同，都是6', '6 × 2',
    '相同加数出现的次数', '4 + 4 + 4', '一共有5组', '4 × 6', '8枚', '四五二十',
    '2行，每行4个点', '6 × 2', '不合适，应写成3 × 4', '5 × 4 = 20', '16', '2组，每组6个',
  ],
  advanced: [
    '6 × 2', '3排彩旗，每排5面', '四六二十四', '三六十八', '都是20', '每组有3个', '4 × 5', '6 × 4',
    '30', '4个3，写成4 × 3', '20张', '5 × 2', '3 × 5等于15，3 + 5等于8', '2 × 6', '5个6', '五六三十',
    '20人', '4 × 6 = 24', '4', '3个6', '再加一个6，积改为18',
  ],
  high: [
    '有4组，每组5个，求一共有多少个', '24张', '4行，每行摆5颗棋子', '都等于18', '每组有4个',
    '36张', '6 × 2', '算5 × 4，改为20人', '3 × 6是18，4 × 5是20', '3组5个，列式3 × 5',
    '用4 × 6，得到24本', '5 + 5，得10', '5组，每组6块，列式5 × 6',
    '3 × 6也等于18，但要按约定把组数写在前面', '4 × 5 + 3', '24把',
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

function leaksAnswerInPromptOrHint(activity: ActivityDefinition, answer: string): boolean {
  const visiblePromptAndHint = `${activity.prompt} ${activity.hint}`;
  const numericAnswer = /^\d+(?:颗|张|个|本|人|面)?$/u.test(answer) ? answer.match(/^\d+/u)?.[0] : undefined;
  if (numericAnswer) return new RegExp(`(?<!\\d)${numericAnswer}(?!\\d)`, 'u').test(visiblePromptAndHint);
  return visiblePromptAndHint.includes(answer);
}

describe('二年级上册数学第四单元闯关', () => {
  it('课程入口、成长索引和题库清单指向同一正式单元', () => {
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
        coreKnowledgePointIds: allowedKnowledgePointIds,
      },
    });
    expect(group?.definition.tasks).toHaveLength(5);
    expect(group?.questionIds).toHaveLength(90);
    expect(new Set(group?.questionIds).size).toBe(90);
    expect(group?.questionIds.filter((questionId) => questionId.startsWith(`challenge-question:${unitId}/`)))
      .toHaveLength(27);
  });

  it('三档各提供30道可用题，同时保留原有六个学习任务和48道活动', async () => {
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

  it('逐题核对63道原创题的答案、知识点和选项设计', () => {
    expect(grade2Term1MathUnit04SupplementalActivities).toHaveLength(63);
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const authored = grade2Term1MathUnit04SupplementalActivities
        .filter(({ difficulty: candidateDifficulty }) => candidateDifficulty === difficulty);
      expect(authored).toHaveLength(expectedSupplementAnswers[difficulty].length);
      authored.forEach(({ activity, knowledgePointIds }, index) => {
        const answer = answerSummary(activity);
        expect(answer, `${difficulty} 第 ${index + 1} 题`).toBe(expectedSupplementAnswers[difficulty][index]);
        expect(derivePilotQuestionKnowledgePointIds(unitId, activity), `${difficulty} 第 ${index + 1} 题知识点`)
          .toEqual(knowledgePointIds);
        expect(knowledgePointIds.length).toBeGreaterThan(0);
        expect(knowledgePointIds.every((id) => allowedKnowledgePointIds.includes(id))).toBe(true);
        expect(activity.options).toHaveLength(3);
        expect(new Set(activity.options.map(({ label }) => label)).size).toBe(3);
        expect(activity.hint).not.toContain(answer);
        expect(leaksAnswerInPromptOrHint(activity, answer), `${difficulty} 第 ${index + 1} 题答案泄漏`)
          .toBe(false);
      });
    }
  });

  it('原课程48道活动均映射到本单元乘法知识点', async () => {
    const unit = await loadUnit(unitId);
    const sourceActivities = Object.values(unit!.difficultyTracks).flatMap((track) => track.tasks)
      .flatMap((task) => task.sessions.flatMap((session) => session.activities));
    expect(sourceActivities).toHaveLength(48);
    const mappedIds = sourceActivities.flatMap((activity) => derivePilotQuestionKnowledgePointIds(unitId, activity));
    expect(mappedIds.length).toBeGreaterThanOrEqual(48);
    expect(mappedIds.every((id) => allowedKnowledgePointIds.includes(id))).toBe(true);
  });

  it('题目清单、逐题台账、内容指纹和重复检查保持一致', async () => {
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
    for (const row of rows) {
      const candidate = candidateByQuestionId.get(row['题目ID']);
      expect(candidate, row['题目ID']).toBeDefined();
      expect(row['正确选项'], row['题目ID']).toBe(answerSummary(candidate!.activity));
      expect(row['知识点'], row['题目ID']).toBe(candidate!.knowledgePointIds.join('；'));
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
    expect(uniqueness.similarQuestionPairs.filter(({ reason }) => reason.startsWith('交互内容与答案结构相同'))).toEqual([]);
    expect(uniqueness.similarQuestionPairs.filter(({ reason }) => reason.includes('将数字替换为占位符后相同'))).toEqual([]);
  });
});
