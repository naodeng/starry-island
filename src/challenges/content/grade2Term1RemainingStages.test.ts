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
  {
    id: 'grade-2-term-1-chinese-second-half', subject: 'chinese', stage: 'second-half', checkedAt: '2026-10-27',
    sourceUnitIds: [5, 6, 7, 8].map((unit) => `grade-2/term-1/chinese/unit-${String(unit).padStart(2, '0')}`),
    expectedPerDifficulty: 120,
  },
  {
    id: 'grade-2-term-1-chinese-end-term', subject: 'chinese', stage: 'end-term', checkedAt: '2026-10-27',
    sourceUnitIds: [1, 2, 3, 4, 5, 6, 7, 8].map((unit) => `grade-2/term-1/chinese/unit-${String(unit).padStart(2, '0')}`),
    expectedPerDifficulty: 240,
  },
  {
    id: 'grade-2-term-1-math-second-half', subject: 'math', stage: 'second-half', checkedAt: '2026-10-29',
    sourceUnitIds: [4, 5, 6].map((unit) => `grade-2/term-1/math/unit-${String(unit).padStart(2, '0')}`)
      .concat('grade-2/term-1/math/integrated-practice-02'),
    expectedPerDifficulty: 106,
  },
  {
    id: 'grade-2-term-1-math-end-term', subject: 'math', stage: 'end-term', checkedAt: '2026-10-29',
    sourceUnitIds: [1, 2, 3, 4, 5, 6].map((unit) => `grade-2/term-1/math/unit-${String(unit).padStart(2, '0')}`)
      .concat(['grade-2/term-1/math/integrated-practice-01', 'grade-2/term-1/math/integrated-practice-02']),
    expectedPerDifficulty: 212,
  },
  {
    id: 'grade-2-term-1-english-first-half', subject: 'english', stage: 'first-half', checkedAt: '2026-10-27',
    sourceUnitIds: [1, 2, 3].map((unit) => `grade-2/term-1/english/unit-${String(unit).padStart(2, '0')}`),
    expectedPerDifficulty: 90,
  },
  {
    id: 'grade-2-term-1-english-second-half', subject: 'english', stage: 'second-half', checkedAt: '2026-10-27',
    sourceUnitIds: [4, 5, 6].map((unit) => `grade-2/term-1/english/unit-${String(unit).padStart(2, '0')}`),
    expectedPerDifficulty: 90,
  },
  {
    id: 'grade-2-term-1-english-end-term', subject: 'english', stage: 'end-term', checkedAt: '2026-10-27',
    sourceUnitIds: [1, 2, 3, 4, 5, 6].map((unit) => `grade-2/term-1/english/unit-${String(unit).padStart(2, '0')}`),
    expectedPerDifficulty: 180,
  },
] as const;

function answerKey(activity: ActivityDefinition): string {
  switch (activity.kind) {
    case 'choice': return activity.options.find(({ id }) => id === activity.correctOptionId)?.label ?? '';
    case 'arithmetic': return `${activity.expression}=${activity.correctAnswer}`;
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
  it.each(stages)('$id 按新版教材范围组卷并逐题核对审校台账', async ({ id, subject, stage, checkedAt, sourceUnitIds, expectedPerDifficulty }) => {
    const group = challengeManifest.groups.find(({ definition }) => definition.id === id);
    expect(group, `阶段组 ${id} 尚未登记`).toBeDefined();
    if (!group) return;

    const formalSourceIds = sourceUnitIds.filter((sourceUnitId) => /\/unit-\d{2}$/u.test(sourceUnitId));
    const sourceGroups = formalSourceIds.map((sourceUnitId) => challengeManifest.groups.find(({ definition }) => (
      definition.id === `grade-2-term-1-${subject}-unit-${sourceUnitId.slice(-2)}`
    )));
    expect(sourceGroups.every(Boolean), `${id} 的正式单元来源组均须存在`).toBe(true);
    const practiceIds = new Set(sourceUnitIds.filter((sourceUnitId) => sourceUnitId.includes('/integrated-practice-')));
    const practiceQuestionIds = challengeManifest.questions
      .filter(({ questionId }) => [...practiceIds].some((practiceId) => questionId.startsWith(`challenge-question:${practiceId}/`)))
      .map(({ questionId }) => questionId);
    const expectedQuestionIds = new Set([
      ...sourceGroups.flatMap((sourceGroup) => sourceGroup?.questionIds ?? []),
      ...practiceQuestionIds,
    ]);
    const expectedKnowledgePointIds = [...new Set([
      ...sourceGroups.flatMap((sourceGroup) => sourceGroup?.definition.coreKnowledgePointIds ?? []),
      ...challengeManifest.questions
        .filter(({ questionId }) => expectedQuestionIds.has(questionId))
        .flatMap(({ knowledgePointIds }) => knowledgePointIds),
    ])].sort();

    expect(group.releaseIntent).toBe('released');
    expect(group.definition).toMatchObject({
      id,
      kind: 'semester',
      grade: 2,
      semester: 1,
      subject,
      stage,
      sourceUnitIds,
      coreKnowledgePointIds: expectedKnowledgePointIds,
      mappingEvidence: { checkedAt },
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

    const questionsById = new Map(challengeManifest.questions.map((question) => [question.questionId, question]));
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const candidates = group.questionIds.map((questionId) => questionsById.get(questionId))
        .filter((question) => question?.difficulty === difficulty);
      expect(candidates).toHaveLength(expectedPerDifficulty);
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
      const status = rowById.get(candidate.questionId)?.['审核状态'] ?? '';
      const aiMathReview = subject === 'math'
        && status.includes('AI 主审已复核')
        && status.includes('独立教育者复核数 0');
      expect(status.includes('作者自审通过') || aiMathReview, candidate.questionId).toBe(true);
      if (subject === 'math') expect(aiMathReview, candidate.questionId).toBe(true);
    }
  });

  it('补齐数学单元2台账并逐题对照统一答案键', async () => {
    const group = challengeManifest.groups.find(({ definition }) => definition.id === 'grade-2-term-1-math-unit-02');
    const loaded = await loadPilotChallengeContent();
    const candidates = loaded.groups.find(({ group: candidateGroup }) =>
      candidateGroup.definition.id === 'grade-2-term-1-math-unit-02')?.candidates ?? [];
    const path = resolve(process.cwd(), 'docs/challenges/grade-2-term-1-math-unit-02-question-review.tsv');
    const rows = parseLedger(readFileSync(path, 'utf8'));
    const rowById = new Map(rows.map((row) => [row['题目ID'] ?? '', row]));

    expect(group?.questionIds).toHaveLength(90);
    expect(rows).toHaveLength(90);
    expect(new Set(rowById.keys())).toEqual(new Set(group?.questionIds));
    for (const candidate of candidates) {
      expect(rowById.get(candidate.questionId)?.['正确答案/键']).toBe(answerKey(candidate.activity));
    }
  });
});
