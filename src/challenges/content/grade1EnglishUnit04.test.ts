import { describe, expect, it } from 'vitest';
// @ts-expect-error Node.js is used only to inspect the local review ledger during Vitest.
import { existsSync, readFileSync } from 'node:fs';
// @ts-expect-error Node.js is used only to resolve the local review ledger during Vitest.
import { resolve } from 'node:path';
import type { ActivityDefinition } from '../../content/types';
import manifest from './pilotManifest';
import { loadPilotChallengeContent } from './pilotContent';
import { getPilotUnitChallengeGroupId } from './unitLinks';
import { derivePilotQuestionKnowledgePointIds } from './pilotQuestionKnowledgePoints';
import { growthGroups } from './growthGroups';
import unitManifest from './pilot-manifest-grade1-term1-english-unit04.json';

declare const process: { cwd(): string };

const unitId = 'grade-1/term-1/english/unit-04';
const groupId = 'grade-1-term-1-english-unit-04';
const excludedRepeatedCourseActivityIds = [
  `${unitId}/advanced/task-01/session-01/question-01`,
  `${unitId}/advanced/task-01/session-01/question-02`,
  `${unitId}/advanced/task-01/session-01/question-05`,
  `${unitId}/advanced/task-02/session-01/question-01`,
  `${unitId}/advanced/task-02/session-01/question-02`,
  `${unitId}/advanced/task-02/session-01/question-05`,
  `${unitId}/high/task-01/session-01/question-05`,
  `${unitId}/high/task-01/session-01/question-06`,
  `${unitId}/high/task-01/session-01/question-07`,
  `${unitId}/high/task-02/session-01/question-05`,
  `${unitId}/high/task-02/session-01/question-06`,
  `${unitId}/high/task-02/session-01/question-07`,
];

function readTsv(path: string): Array<Record<string, string>> {
  const lines = readFileSync(path, 'utf8').trim().split(/\r?\n/u) as string[];
  const [headerLine = '', ...dataLines] = lines;
  const headers = headerLine.replace(/^\uFEFF/u, '').split('\t');
  return dataLines.map((line: string) => {
    const values = line.split('\t');
    return Object.fromEntries(headers.map((header: string, index: number) => [header, values[index] ?? '']));
  });
}

function expectedAnswerSummary(activity: ActivityDefinition): string {
  switch (activity.kind) {
    case 'choice':
      return activity.options.find(({ id }) => id === activity.correctOptionId)?.label ?? '';
    case 'match':
      return activity.pairs.map(({ left, right }) => `${left}→${right}`).join('；');
    case 'order': {
      const labelsById = new Map(activity.items.map(({ id, label }) => [id, label]));
      return activity.correctOrder.map((id) => labelsById.get(id) ?? '').join(' → ');
    }
    case 'categorize': {
      const labelsByCategoryId = new Map(activity.categories.map(({ id, label }) => [id, label]));
      return activity.items.map(({ label, categoryId }) => `${label}→${labelsByCategoryId.get(categoryId) ?? ''}`).join('；');
    }
    case 'measurement':
      return String(activity.targetLengthCm);
    case 'arithmetic':
      return String(activity.correctAnswer);
  }
}

describe('Grade 1 Term 1 English Unit 4 challenge', () => {
  it('registers the unit route and a ready 30-candidate-per-difficulty group', async () => {
    expect(getPilotUnitChallengeGroupId(unitId)).toBe(groupId);
    const challengeManifest = manifest as { groups: Array<{ definition: { id: string; coreKnowledgePointIds: string[] }; questionIds: string[] }> };
    const group = challengeManifest.groups.find(({ definition }) => definition.id === groupId);
    expect(group).toBeDefined();
    expect(group?.questionIds).toHaveLength(90);
    expect(group?.questionIds).not.toEqual(expect.arrayContaining(
      excludedRepeatedCourseActivityIds.map((activityId) => `challenge-question:${activityId}`),
    ));
    expect(group?.definition.coreKnowledgePointIds).toEqual([
      'number-word-vocabulary',
      'number-sequence',
      'quantity-question',
      'quantity-sentence',
    ]);

    const content = await loadPilotChallengeContent();
    const loaded = content.groups.find(({ group: candidate }) => candidate.definition.id === groupId);
    expect(loaded?.status).toBe('ready');
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      expect(loaded?.candidates.filter((candidate) => candidate.difficulty === difficulty)).toHaveLength(30);
    }

    expect(growthGroups.find(({ id }) => id === groupId)?.sourceUnitIds).toEqual([unitId]);
    expect(unitManifest.groups[0]?.definition.mappingEvidence.source).toContain(
      'grade-1-and-3-textbook-inventory.md#固定快照目录映射',
    );
  });

  it('audits all 90 candidates against the Chinese self-review ledger and actual answer keys', async () => {
    const challengeManifest = manifest as { groups: Array<{ definition: { id: string }; questionIds: string[] }> };
    const group = challengeManifest.groups.find(({ definition }) => definition.id === groupId);
    const content = await loadPilotChallengeContent();
    const loaded = content.groups.find(({ group: candidate }) => candidate.definition.id === groupId);
    const candidatesByQuestionId = new Map((loaded?.candidates ?? []).map((candidate) => [candidate.questionId, candidate]));
    const ledgerPath = resolve(process.cwd(), `docs/challenges/${groupId}-question-review.tsv`);

    expect(existsSync(ledgerPath)).toBe(true);
    expect(group?.questionIds).toHaveLength(90);
    const rows = readTsv(ledgerPath);
    expect(rows.map(({ 题目ID }) => 题目ID)).toHaveLength(90);
    expect(new Set(rows.map(({ 题目ID }) => 题目ID))).toEqual(new Set(group?.questionIds));
    expect(rows.every((row) => row['审核状态']?.includes('作者自审通过'))).toBe(true);
    expect(rows.every(({ 审核状态 }) => 审核状态.includes('未独立教育者复核'))).toBe(true);

    for (const row of rows) {
      const candidate = candidatesByQuestionId.get(row['题目ID']);
      expect(candidate, row['题目ID']).toBeDefined();
      expect(row['正确选项'], row['题目ID']).toBe(expectedAnswerSummary(candidate!.activity));
      expect(row['知识点'], row['题目ID']).not.toBe('');
      expect(candidate!.knowledgePointIds.length, row['题目ID']).toBeGreaterThan(0);
      expect(derivePilotQuestionKnowledgePointIds(unitId, candidate!.activity), row['题目ID'])
        .toEqual(candidate!.knowledgePointIds);
    }

    const courseRow = readTsv(resolve(process.cwd(), 'docs/curriculum/grade-1-and-3-question-review.tsv'))
      .find((row) => row['课程ID'] === unitId);
    expect(courseRow).toMatchObject({ 题目总数: '48', 已审数量: '48', 状态: '完成' });
  });

  it('balances supplemental questions and keeps answer options distinct', async () => {
    const content = await loadPilotChallengeContent();
    const candidates = content.groups.find(({ group }) => group.definition.id === groupId)?.candidates ?? [];
    const supplemental = candidates.filter(({ activity }) => activity.id.startsWith(
      'challenge-supplement-grade-1-term-1-english-unit-04-',
    ));

    expect(supplemental).toHaveLength(54);
    expect(new Set(supplemental.map(({ activity }) => activity.prompt)).size).toBe(54);
    expect(supplemental.map(({ activity }) => activity.prompt).join('\n')).not.toContain('本铅笔');
    expect(supplemental.every(({ activity }) => activity.kind === 'choice')).toBe(true);
    expect(Object.fromEntries(['basic', 'advanced', 'high'].map((difficulty) => [
      difficulty,
      supplemental.filter(({ difficulty: candidateDifficulty }) => candidateDifficulty === difficulty).length,
    ]))).toEqual({ basic: 14, advanced: 20, high: 20 });
    const positionsByDifficulty = Object.fromEntries(['basic', 'advanced', 'high'].map((difficulty) => {
      const positions = supplemental
        .filter(({ difficulty: candidateDifficulty }) => candidateDifficulty === difficulty)
        .map(({ activity }) => activity.kind === 'choice'
          ? activity.options.findIndex(({ id }) => id === activity.correctOptionId)
          : -1);
      return [difficulty, [0, 1, 2].map((position) => positions.filter((answerPosition) => answerPosition === position).length)];
    }));
    expect(positionsByDifficulty).toEqual({ basic: [5, 5, 4], advanced: [7, 6, 7], high: [6, 7, 7] });
    for (const candidate of supplemental) {
      if (candidate.activity.kind !== 'choice') continue;
      expect(new Set(candidate.activity.options.map(({ label }) => label)).size, candidate.activity.id)
        .toBe(candidate.activity.options.length);
      const correctOptionId = candidate.activity.correctOptionId;
      const correct = candidate.activity.options.find(({ id }) => id === correctOptionId);
      expect(correct, candidate.activity.id).toBeDefined();
      expect(candidate.activity.hint, candidate.activity.id)
        .not.toContain(correct!.label);
    }
  });
});
