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
import { grade2Term1MathUnit06SupplementalActivities } from './grade2Term1MathUnit06SupplementalActivities';
import { derivePilotQuestionKnowledgePointIds } from './pilotQuestionKnowledgePoints';

declare const process: { cwd(): string };

const unitId = 'grade-2/term-1/math/unit-06';
const groupId = 'grade-2-term-1-math-unit-06';
const allowedKnowledgePointIds = ['equal-groups-multiplication', 'multiplication-facts'];
const expectedSupplementAnswers = {
  basic: [
    '14', '28', '56', '24', '40', '72', '18', '36', '63', '42', '56', '45', '8 × 9', '总数相同，都是63朵',
  ],
  advanced: [
    '得数相同，都是63', '48', '72', '49', '64', '6', '8', '7 × 8', '两种摆法都是56颗',
    '算式应为9 × 7，得数是63', '8 × 9', '8 × 7 = 56', '8 × 7，9 × 7，8 × 8', '9 × 6 = 54个',
  ],
  high: [
    '80本', '两个积相同，都是56', '63个', '53颗', '相差1个，8组每组8个多', '81人',
    '每个盒子的贴纸数是否相同', '改为8 × 7 = 56个', '7 × 9，8 × 8，8 × 9', '71人',
    '64支', '分别写8 × 9和9 × 8，再比较两个积', '65张', '63个',
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
  const numericAnswer = /^\d+(?:本|颗|个|人|支|张)?$/u.test(answer) ? answer.match(/^\d+/u)?.[0] : undefined;
  if (numericAnswer) return new RegExp(`(?<!\\d)${numericAnswer}(?!\\d)`, 'u').test(visiblePromptAndHint);
  return visiblePromptAndHint.includes(answer);
}

describe('二年级上册数学第六单元闯关', () => {
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
      .toHaveLength(48);
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

  it('逐题核对42道原创题的答案、知识点与答案泄漏', () => {
    expect(grade2Term1MathUnit06SupplementalActivities).toHaveLength(42);
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const authored = grade2Term1MathUnit06SupplementalActivities
        .filter(({ difficulty: candidateDifficulty }) => candidateDifficulty === difficulty);
      expect(authored).toHaveLength(14);
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

  it('题库、逐题台账和审核指纹保持一致且没有完全重复题', async () => {
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
    expect(uniqueness.similarQuestionPairs).toHaveLength(233);
    expect(uniqueness.similarQuestionPairs.every(({ reason }) => reason.startsWith('题干经 Unicode NFKC'))).toBe(true);
  });
});
