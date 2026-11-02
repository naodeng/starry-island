import { describe, expect, it } from 'vitest';
// @ts-expect-error Node built-ins are used only to inspect the review ledgers in Vitest.
import { existsSync, readFileSync } from 'node:fs';
// @ts-expect-error Node built-ins are used only to resolve local review ledgers.
import { resolve } from 'node:path';
import type { ActivityDefinition } from '../../content/types';
import type { ChallengeManifest } from '../domain/types';
import { loadPilotChallengeContent } from './pilotContent';
import { growthGroups } from './growthGroups';
import manifest from './pilotManifest';

declare const process: { cwd(): string };

const stageId = 'grade-2-term-1-chinese-first-half';
const sourceUnitIds = [1, 2, 3, 4].map((unit) => `grade-2/term-1/chinese/unit-${String(unit).padStart(2, '0')}`);
const sourceGroupIds = [1, 2, 3, 4].map((unit) => `grade-2-term-1-chinese-unit-${String(unit).padStart(2, '0')}`);
const challengeManifest = manifest as ChallengeManifest;

function readTsv(path: string): Array<Record<string, string>> {
  const lines = readFileSync(path, 'utf8').trim().split(/\r?\n/u) as string[];
  const [headerLine = '', ...dataLines] = lines;
  const headers = headerLine.replace(/^\uFEFF/u, '').split('\t');
  return dataLines.map((line) => {
    const values = line.split('\t');
    return Object.fromEntries(headers.map((header, index) => [header, values[index] ?? '']));
  });
}

function answerKey(activity: ActivityDefinition): string {
  switch (activity.kind) {
    case 'choice': return activity.options.find(({ id }) => id === activity.correctOptionId)?.label ?? '';
    case 'match': return activity.pairs.map(({ left, right }) => `${left}→${right}`).join('；');
    case 'order': {
      const labelsById = new Map(activity.items.map(({ id, label }) => [id, label]));
      return activity.correctOrder.map((id) => labelsById.get(id) ?? '').join(' → ');
    }
    case 'categorize': {
      const labelsByCategoryId = new Map(activity.categories.map(({ id, label }) => [id, label]));
      return activity.items.map(({ label, categoryId }) => `${label}→${labelsByCategoryId.get(categoryId) ?? ''}`).join('；');
    }
    case 'arithmetic': return `${activity.expression}=${activity.correctAnswer}`;
    case 'measurement': return `${activity.targetLengthCm} 厘米`;
  }
}

describe('二年级上册语文前半学期挑战组', () => {
  it('按教材前四个单元映射题库，并汇总四个单元组的知识点', () => {
    const group = challengeManifest.groups.find(({ definition }) => definition.id === stageId);
    const sourceGroups = challengeManifest.groups.filter(({ definition }) => sourceGroupIds.includes(definition.id));
    const sourceQuestionIds = sourceGroups.flatMap(({ questionIds }) => questionIds);
    const coreKnowledgePointIds = [...new Set(sourceGroups.flatMap(({ definition }) => definition.coreKnowledgePointIds))].sort();

    expect(sourceGroups).toHaveLength(4);
    expect(group?.releaseIntent).toBe('released');
    expect(group?.definition).toMatchObject({
      id: stageId,
      kind: 'semester',
      grade: 2,
      semester: 1,
      subject: 'chinese',
      stage: 'first-half',
      sourceUnitIds,
      coreKnowledgePointIds,
      mappingEvidence: { checkedAt: '2026-10-27' },
    });
    expect(group?.definition.tasks.map(({ targetCount }) => targetCount)).toEqual([25, 25, 25, 25, 25]);
    expect(group?.questionIds).toHaveLength(360);
    expect(new Set(group?.questionIds)).toEqual(new Set(sourceQuestionIds));
    expect(growthGroups.find(({ id }) => id === stageId)).toMatchObject({
      id: stageId,
      kind: 'semester',
      grade: 2,
      semester: 1,
      subject: 'chinese',
      stage: 'first-half',
      sourceUnitIds,
    });
  });

  it('保持每档至少 50 道候选，且所有阶段知识点都有题目覆盖', () => {
    const group = challengeManifest.groups.find(({ definition }) => definition.id === stageId);
    const questionsById = new Map(challengeManifest.questions.map((question) => [question.questionId, question]));

    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const candidates = group?.questionIds.map((id) => questionsById.get(id))
        .filter((question) => question?.difficulty === difficulty) ?? [];
      expect(candidates).toHaveLength(120);
      expect(candidates.length).toBeGreaterThanOrEqual(50);
      const coveredKnowledgePointIds = new Set(candidates.flatMap((question) => question?.knowledgePointIds ?? []));
      expect(group?.definition.coreKnowledgePointIds.every((id) => coveredKnowledgePointIds.has(id))).toBe(true);
    }
  });

  it('为每道阶段题保留原单元审校证据并核对实际答案', async () => {
    const group = challengeManifest.groups.find(({ definition }) => definition.id === stageId);
    const content = await loadPilotChallengeContent();
    const loaded = content.groups.find(({ group: candidate }) => candidate.definition.id === stageId);
    const ledgerPath = resolve(process.cwd(), `docs/challenges/${stageId}-question-review.tsv`);

    expect(group).toBeDefined();
    if (!group) return;
    expect(loaded?.status, JSON.stringify(loaded?.issues, null, 2)).toBe('ready');
    expect(loaded?.candidates).toHaveLength(360);
    expect(existsSync(ledgerPath)).toBe(true);
    if (!existsSync(ledgerPath)) return;

    const rows = readTsv(ledgerPath);
    const rowsByQuestionId = new Map(rows.map((row) => [row['题目ID'], row]));
    expect(rows).toHaveLength(group.questionIds.length);
    expect(new Set(rowsByQuestionId.keys())).toEqual(new Set(group.questionIds));
    expect(rows.every(({ 审核状态 }) => 审核状态.includes('作者自审通过') && 审核状态.includes('未独立教育者复核'))).toBe(true);

    for (const candidate of loaded?.candidates ?? []) {
      const question = challengeManifest.questions.find(({ questionId }) => questionId === candidate.questionId)!;
      const unitNumber = question.activityId.match(/(?:chinese\/unit-|chinese-unit-)(\d{2})/u)?.[1];
      expect(unitNumber, candidate.questionId).toBeDefined();
      const sourceLedgerName = `grade-2-term-1-chinese-unit-${unitNumber}-question-review.tsv`;
      const row = rowsByQuestionId.get(candidate.questionId);
      expect(row?.['正确答案/键'], candidate.questionId).toBe(answerKey(candidate.activity));
      expect(row?.['知识点标识'], candidate.questionId).toBe(candidate.knowledgePointIds.join('；'));
      expect(row?.['题意与答案复核'], candidate.questionId).toContain(`docs/challenges/${sourceLedgerName}`);
    }
  });
});
