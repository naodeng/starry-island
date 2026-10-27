import { describe, expect, it } from 'vitest';
// @ts-expect-error Node.js reads the local review ledger only in this test.
import { readFileSync } from 'node:fs';
// @ts-expect-error Node.js resolves local review ledgers only in this test.
import { resolve } from 'node:path';
import type { ActivityDefinition } from '../../content/types';
import type { ChallengeManifest } from '../domain/types';
import { loadPilotChallengeContent } from './pilotContent';
import manifest from './pilotManifest';

declare const process: { cwd(): string };

const challengeManifest = manifest as ChallengeManifest;
const stages = [
  { id: 'grade-2-term-1-chinese-second-half', subject: 'chinese', stage: 'second-half', units: [5, 6, 7, 8] },
  { id: 'grade-2-term-1-chinese-end-term', subject: 'chinese', stage: 'end-term', units: [1, 2, 3, 4, 5, 6, 7, 8] },
  { id: 'grade-2-term-1-math-second-half', subject: 'math', stage: 'second-half', units: [5, 6, 7, 8, 9] },
  { id: 'grade-2-term-1-math-end-term', subject: 'math', stage: 'end-term', units: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
  { id: 'grade-2-term-1-english-first-half', subject: 'english', stage: 'first-half', units: [1, 2, 3] },
  { id: 'grade-2-term-1-english-second-half', subject: 'english', stage: 'second-half', units: [4, 5, 6] },
  { id: 'grade-2-term-1-english-end-term', subject: 'english', stage: 'end-term', units: [1, 2, 3, 4, 5, 6] },
] as const;

function answerKey(activity: ActivityDefinition): string {
  switch (activity.kind) {
    case 'choice': return activity.options.find(({ id }) => id === activity.correctOptionId)?.label ?? '';
    case 'arithmetic': return String(activity.correctAnswer);
    case 'match': return activity.pairs.map(({ left, right }) => `${left}→${right}`).join('；');
    case 'order': {
      const labels = new Map(activity.items.map(({ id, label }) => [id, label]));
      return activity.correctOrder.map((id) => labels.get(id) ?? '').join(' → ');
    }
    case 'categorize': {
      const categories = new Map(activity.categories.map(({ id, label }) => [id, label]));
      return activity.items.map(({ label, categoryId }) => `${label}→${categories.get(categoryId) ?? ''}`).join('；');
    }
    case 'measurement': return `${activity.targetLengthCm} 厘米`;
  }
}

function parseLedger(content: string): Array<Record<string, string>> {
  const [headerLine = '', ...rows] = content.trim().split(/\r?\n/u);
  const headers = headerLine.replace(/^\uFEFF/u, '').split('\t');
  return rows.map((line) => {
    const values = line.split('\t');
    return Object.fromEntries(headers.map((header, index) => [header, values[index] ?? '']));
  });
}

describe('二年级上册剩余阶段组', () => {
  it.each(stages)('$id 按教材章节顺序复用来源单元题库并逐题核对审校台账', async ({ id, subject, stage, units }) => {
    const group = challengeManifest.groups.find(({ definition }) => definition.id === id);
    expect(group, `阶段组 ${id} 尚未登记`).toBeDefined();
    if (!group) return;

    const sourceGroups = units.map((unit) => challengeManifest.groups.find(({ definition }) =>
      definition.id === `grade-2-term-1-${subject}-unit-${String(unit).padStart(2, '0')}`));
    expect(sourceGroups.every(Boolean), `${id} 的来源单元闯关组均须存在`).toBe(true);
    const expectedQuestionIds = new Set(sourceGroups.flatMap((sourceGroup) => sourceGroup?.questionIds ?? []));
    const unresolvedMathDifficultyQuestionIds = id === 'grade-2-term-1-math-end-term'
      ? new Set(sourceGroups[1]?.questionIds.filter((questionId) =>
        /^challenge-question:challenge-supplement-grade-2-term-1-math-unit-02-(?:advanced|high)-/u.test(questionId)) ?? [])
      : new Set<string>();
    if (id === 'grade-2-term-1-math-end-term') expect(unresolvedMathDifficultyQuestionIds).toHaveLength(28);
    for (const questionId of unresolvedMathDifficultyQuestionIds) expectedQuestionIds.delete(questionId);
    const expectedKnowledgePointIds = [...new Set(sourceGroups.flatMap((sourceGroup) =>
      sourceGroup?.definition.coreKnowledgePointIds ?? []))].sort();

    expect(group.releaseIntent).toBe('released');
    expect(group.definition).toMatchObject({
      id,
      kind: 'semester',
      grade: 2,
      semester: 1,
      subject,
      stage,
      sourceUnitIds: units.map((unit) => `grade-2/term-1/${subject}/unit-${String(unit).padStart(2, '0')}`),
      coreKnowledgePointIds: expectedKnowledgePointIds,
      mappingEvidence: { checkedAt: '2026-10-27' },
    });
    expect(new Set(group.questionIds)).toEqual(expectedQuestionIds);
    expect(group.definition.tasks.map(({ targetCount }) => targetCount)).toEqual([25, 25, 25, 25, 25]);
    for (const difficulty of ['basic', 'advanced'] as const) {
      const taskKnowledgePointIds = new Set(group.definition.tasks
        .filter((task) => task.difficulty === difficulty)
        .flatMap((task) => task.requiredKnowledgePointIds));
      expect(taskKnowledgePointIds).toEqual(new Set(expectedKnowledgePointIds));
    }
    expect(new Set(group.definition.tasks.find(({ difficulty }) => difficulty === 'high')?.requiredKnowledgePointIds))
      .toEqual(new Set(expectedKnowledgePointIds));
    if (subject === 'english') expect(group.definition.mappingEvidence.notes).toContain('未确认');
    if (id === 'grade-2-term-1-math-end-term') {
      expect(group.definition.mappingEvidence.notes).toContain('难度边界待教育者复核');
      expect(group.definition.mappingEvidence.notes).toContain('本阶段不纳入这 28 道');
    }

    const questionsById = new Map(challengeManifest.questions.map((question) => [question.questionId, question]));
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const candidates = group.questionIds.map((questionId) => questionsById.get(questionId))
        .filter((question) => question?.difficulty === difficulty);
      const expectedCandidateCount = units.length * 30 - (id === 'grade-2-term-1-math-end-term' && difficulty !== 'basic' ? 14 : 0);
      expect(candidates).toHaveLength(expectedCandidateCount);
      const coveredKnowledgePoints = new Set(candidates.flatMap((question) => question?.knowledgePointIds ?? []));
      expect(expectedKnowledgePointIds.every((knowledgePointId) => coveredKnowledgePoints.has(knowledgePointId))).toBe(true);
    }

    const content = await loadPilotChallengeContent();
    const loadedGroup = content.groups.find(({ group: candidateGroup }) => candidateGroup.definition.id === id);
    const ledgerPath = resolve(process.cwd(), `docs/challenges/${id}-question-review.tsv`);
    const ledgerRows = parseLedger(readFileSync(ledgerPath, 'utf8'));
    const rowById = new Map(ledgerRows.map((row) => [row['题目ID'] ?? '', row]));
    expect(ledgerRows).toHaveLength(expectedQuestionIds.size);
    expect(new Set(rowById.keys())).toEqual(expectedQuestionIds);
    for (const candidate of loadedGroup?.candidates ?? []) {
      expect(rowById.get(candidate.questionId)?.['正确答案/键'], candidate.questionId).toBe(answerKey(candidate.activity));
      expect(rowById.get(candidate.questionId)?.['审核状态'], candidate.questionId).toContain('作者自审通过');
      expect(rowById.get(candidate.questionId)?.['审核状态'], candidate.questionId).toContain('未独立教育者复核');
    }
  });

  it('补齐数学单元 2 闯关台账中的 48 道课程题，并逐题对照实际答案键', async () => {
    const group = challengeManifest.groups.find(({ definition }) => definition.id === 'grade-2-term-1-math-unit-02');
    const loaded = await loadPilotChallengeContent();
    const candidates = loaded.groups.find(({ group: candidateGroup }) =>
      candidateGroup.definition.id === 'grade-2-term-1-math-unit-02')?.candidates ?? [];
    const ledgerPath = `${process.cwd()}/docs/challenges/grade-2-term-1-math-unit-02-question-review.tsv`;
    const rows = parseLedger(readFileSync(ledgerPath, 'utf8'));
    const rowById = new Map(rows.map((row) => [row['题目记录 ID'] ?? row['题目ID'] ?? '', row]));

    expect(group?.questionIds).toHaveLength(90);
    expect(rows).toHaveLength(90);
    expect(new Set(rowById.keys())).toEqual(new Set(group?.questionIds));
    for (const candidate of candidates) {
      expect(rowById.get(candidate.questionId)?.['标准答案']).toBe(answerKey(candidate.activity));
    }
  });
});
