import { describe, expect, it } from 'vitest';
// @ts-expect-error Node.js is used only to inspect the local question-review ledger during Vitest.
import { existsSync, readFileSync } from 'node:fs';
// @ts-expect-error Node.js is used only to resolve the local question-review ledger during Vitest.
import { resolve } from 'node:path';
import type { ActivityDefinition } from '../../content/types';
import { loadUnit } from '../../content/unitLoader';
import { getPilotUnitChallengeGroupId } from './unitLinks';
import manifest from './pilotManifest';
import { loadPilotChallengeContent } from './pilotContent';
import { derivePilotQuestionKnowledgePointIds } from './pilotQuestionKnowledgePoints';
import { fingerprintActivity } from './fingerprint';
import { growthGroups } from './growthGroups';
import { analyzeQuestionUniqueness } from './questionUniqueness';
import { loadChallengeQualityInputs } from './qualityInputs';

declare const process: { cwd(): string };

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
    case 'arithmetic':
      return String(activity.correctAnswer);
    case 'measurement':
      return String(activity.targetLengthCm);
  }
}

const unitId = 'grade-1/term-2/math/unit-01';
const groupId = 'grade-1-term-2-math-unit-01';

describe('Grade 1 Term 2 Math Unit 1 challenge', () => {
  it('registers the official unit route in the challenge center', () => {
    expect(getPilotUnitChallengeGroupId(unitId)).toBe(groupId);
    expect(growthGroups.find(({ id }) => id === groupId)).toMatchObject({
      kind: 'unit',
      grade: 1,
      semester: 2,
      subject: 'math',
      sourceUnitIds: [unitId],
    });
  });

  it('loads a ready 30-candidate-per-difficulty group while preserving the 48 course activities', async () => {
    const rawManifest = manifest as { groups: Array<{ definition: { id: string; sourceUnitIds: string[] }; questionIds: string[] }> };
    const group = rawManifest.groups.find(({ definition }) => definition.id === groupId);
    expect(group).toBeDefined();
    expect(group?.questionIds).toHaveLength(90);
    expect(group?.definition.sourceUnitIds).toEqual([unitId]);

    const [content, unit] = await Promise.all([loadPilotChallengeContent(), loadUnit(unitId)]);
    const loaded = content.groups.find(({ group: candidate }) => candidate.definition.id === groupId);
    expect(loaded?.status).toBe('ready');
    expect(loaded?.candidates).toHaveLength(90);
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      expect(loaded?.candidates.filter((candidate) => candidate.difficulty === difficulty)).toHaveLength(30);
    }
    expect(Object.values(unit!.difficultyTracks).flatMap((track) => track.tasks)
      .flatMap((task) => task.sessions.flatMap((session) => session.activities))).toHaveLength(48);
    expect(loaded?.learningTasks).toHaveLength(6);
  });

  it('audits all 90 candidates against the actual answers, mapped knowledge points, and self-review ledger', async () => {
    const rawManifest = manifest as { groups: Array<{ definition: { id: string }; questionIds: string[] }> };
    const group = rawManifest.groups.find(({ definition }) => definition.id === groupId);
    const content = await loadPilotChallengeContent();
    const loaded = content.groups.find(({ group: candidate }) => candidate.definition.id === groupId);
    const candidatesByQuestionId = new Map((loaded?.candidates ?? []).map((candidate) => [candidate.questionId, candidate]));
    const ledgerPath = resolve(process.cwd(), `docs/challenges/${groupId}-question-review.tsv`);

    expect(existsSync(ledgerPath)).toBe(true);
    if (!existsSync(ledgerPath)) return;
    const rows = readTsv(ledgerPath);
    expect(rows.map(({ 题目ID }) => 题目ID)).toHaveLength(90);
    expect(new Set(rows.map(({ 题目ID }) => 题目ID))).toEqual(new Set(group?.questionIds));
    expect(rows.every(({ 审核状态 }) => 审核状态.includes('作者自审通过') && 审核状态.includes('未独立教育者复核'))).toBe(true);

    for (const row of rows) {
      const candidate = candidatesByQuestionId.get(row['题目ID']);
      expect(candidate, row['题目ID']).toBeDefined();
      expect(row['正确选项'], row['题目ID']).toBe(expectedAnswerSummary(candidate!.activity));
      expect(row['知识点'], row['题目ID']).not.toBe('');
      expect(candidate!.knowledgePointIds.length, row['题目ID']).toBeGreaterThan(0);
      expect(derivePilotQuestionKnowledgePointIds(unitId, candidate!.activity), row['题目ID'])
        .toEqual(candidate!.knowledgePointIds);
      expect(candidate!.approved, row['题目ID']).toBe(true);
      expect(candidate!.answerLeakageReviewed, row['题目ID']).toBe(true);
    }

    const fingerprints = await Promise.all((loaded?.candidates ?? []).map(({ activity }) => fingerprintActivity(activity)));
    expect(new Set(fingerprints).size).toBe(90);
  });

  it('does not repeat a normalized question template between same-tier tasks', async () => {
    const inputs = await loadChallengeQualityInputs();
    const group = inputs.manifest.groups.find(({ definition }) => definition.id === groupId);
    const groupQuestionIds = new Set(group?.questionIds ?? []);
    const questions = inputs.manifest.questions.filter(({ questionId }) => groupQuestionIds.has(questionId));
    const uniqueness = await analyzeQuestionUniqueness(
      questions,
      inputs.activitiesById,
      inputs.sourceUnitByActivityId,
    );
    const sameTierCrossTaskPairs = uniqueness.similarQuestionPairs.filter(({ questionIds }) => {
      const left = questionIds[0].match(/\/unit-01\/(basic|advanced|high)\/task-0([12])\/session-01\/question-/u);
      const right = questionIds[1].match(/\/unit-01\/(basic|advanced|high)\/task-0([12])\/session-01\/question-/u);
      return Boolean(left && right && left[1] === right[1] && left[2] !== right[2]);
    });

    expect(sameTierCrossTaskPairs).toEqual([]);
  });
});
