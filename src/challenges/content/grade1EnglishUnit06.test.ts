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

declare const process: { cwd(): string };

const unitId = 'grade-1/term-1/english/unit-06';
const groupId = 'grade-1-term-1-english-unit-06';
const coreKnowledgePointIds = ['fruit-word-vocabulary', 'fruit-classification', 'fruit-preferences'];
const excludedRepeatedCourseActivityIds = [
  'grade-1/term-1/english/unit-06/basic/task-02/session-01/question-05',
  'grade-1/term-1/english/unit-06/advanced/task-01/session-01/question-01',
  'grade-1/term-1/english/unit-06/advanced/task-01/session-01/question-02',
  'grade-1/term-1/english/unit-06/advanced/task-01/session-01/question-05',
  'grade-1/term-1/english/unit-06/advanced/task-01/session-01/question-07',
  'grade-1/term-1/english/unit-06/advanced/task-02/session-01/question-01',
  'grade-1/term-1/english/unit-06/advanced/task-02/session-01/question-02',
  'grade-1/term-1/english/unit-06/advanced/task-02/session-01/question-05',
  'grade-1/term-1/english/unit-06/advanced/task-02/session-01/question-07',
  'grade-1/term-1/english/unit-06/high/task-01/session-01/question-05',
  'grade-1/term-1/english/unit-06/high/task-01/session-01/question-07',
  'grade-1/term-1/english/unit-06/high/task-01/session-01/question-08',
  'grade-1/term-1/english/unit-06/high/task-02/session-01/question-05',
  'grade-1/term-1/english/unit-06/high/task-02/session-01/question-07',
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

describe('Grade 1 Term 1 English Unit 6 challenge', () => {
  it('registers the unit route and a ready 30-candidate-per-difficulty group', async () => {
    expect(getPilotUnitChallengeGroupId(unitId)).toBe(groupId);
    const challengeManifest = manifest as { groups: Array<{ definition: { id: string; coreKnowledgePointIds: string[] }; questionIds: string[] }> };
    const group = challengeManifest.groups.find(({ definition }) => definition.id === groupId);
    expect(group).toBeDefined();
    expect(group?.questionIds).toHaveLength(90);
    expect(group?.definition.coreKnowledgePointIds).toEqual(coreKnowledgePointIds);

    const content = await loadPilotChallengeContent();
    const loaded = content.groups.find(({ group: candidate }) => candidate.definition.id === groupId);
    expect(loaded?.status).toBe('ready');
    expect(loaded?.candidates).toHaveLength(90);
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      expect(loaded?.candidates.filter((candidate) => candidate.difficulty === difficulty)).toHaveLength(30);
    }

    expect(growthGroups.find(({ id }) => id === groupId)?.sourceUnitIds).toEqual([unitId]);
  });

  it('audits all 90 candidates against the Chinese self-review ledger and actual answer keys', async () => {
    const challengeManifest = manifest as { groups: Array<{ definition: { id: string }; questionIds: string[] }> };
    const group = challengeManifest.groups.find(({ definition }) => definition.id === groupId);
    const content = await loadPilotChallengeContent();
    const loaded = content.groups.find(({ group: candidate }) => candidate.definition.id === groupId);
    const candidatesByQuestionId = new Map((loaded?.candidates ?? []).map((candidate) => [candidate.questionId, candidate]));
    const ledgerPath = resolve(process.cwd(), `docs/challenges/${groupId}-question-review.tsv`);

    expect(existsSync(ledgerPath)).toBe(true);
    if (!existsSync(ledgerPath)) return;
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

  it('uses 56 unique choice supplements with balanced answer positions and in-scope fruit vocabulary', async () => {
    const content = await loadPilotChallengeContent();
    const candidates = content.groups.find(({ group }) => group.definition.id === groupId)?.candidates ?? [];
    const supplemental = candidates.filter(({ activity }) => activity.id.startsWith(
      'challenge-supplement-grade-1-term-1-english-unit-06-',
    ));

    expect(supplemental).toHaveLength(56);
    expect(new Set(supplemental.map(({ activity }) => activity.prompt)).size).toBe(56);
    expect(supplemental.every(({ activity }) => activity.kind === 'choice')).toBe(true);
    expect(Object.fromEntries(['basic', 'advanced', 'high'].map((difficulty) => [
      difficulty,
      supplemental.filter(({ difficulty: candidateDifficulty }) => candidateDifficulty === difficulty).length,
    ]))).toEqual({ basic: 15, advanced: 22, high: 19 });

    for (const excludedActivityId of excludedRepeatedCourseActivityIds) {
      expect(candidates.some(({ activityId }) => activityId === excludedActivityId), excludedActivityId).toBe(false);
    }

    const correctPositionCounts = Object.fromEntries(['basic', 'advanced', 'high'].map((difficulty) => {
      const counts = [0, 0, 0];
      for (const candidate of supplemental.filter(({ difficulty: candidateDifficulty }) => candidateDifficulty === difficulty)) {
        const activity = candidate.activity;
        if (activity.kind !== 'choice') continue;
        const correctIndex = activity.options.findIndex(({ id }) => id === activity.correctOptionId);
        counts[correctIndex] += 1;
      }
      return [difficulty, counts];
    }));
    expect(correctPositionCounts).toEqual({
      basic: [5, 5, 5],
      advanced: [8, 7, 7],
      high: [6, 7, 6],
    });

    for (const candidate of supplemental) {
      const activity = candidate.activity;
      if (activity.kind !== 'choice') continue;
      expect(activity.prompt, activity.id).not.toMatch(/strawberr|grape|watermelon/iu);
      expect(new Set(activity.options.map(({ label }) => label)).size, activity.id)
        .toBe(activity.options.length);
      const correct = activity.options.find(({ id }) => id === activity.correctOptionId);
      expect(correct, activity.id).toBeDefined();
      expect(activity.hint, activity.id).not.toContain(correct!.label);
    }
  });

  it('does not reveal every fruit translation in the high-tier prompt', async () => {
    const content = await loadPilotChallengeContent();
    const candidates = content.groups.find(({ group }) => group.definition.id === groupId)?.candidates ?? [];
    const highTen = candidates.find(({ activityId }) => activityId === 'challenge-supplement-grade-1-term-1-english-unit-06-high-10');

    expect(highTen?.activity.kind).toBe('choice');
    expect(highTen?.activity.prompt).not.toMatch(/apple\s*[=＝]\s*苹果|pear\s*[=＝]\s*梨|banana\s*[=＝]\s*香蕉|orange\s*[=＝]\s*橙子/u);
  });
});
