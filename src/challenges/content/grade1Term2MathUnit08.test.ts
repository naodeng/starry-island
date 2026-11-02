// @ts-expect-error Node.js is used only to inspect the local question-review ledger during Vitest.
import { readFileSync } from 'node:fs';
// @ts-expect-error Node.js is used only to resolve the local question-review ledger during Vitest.
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import type { ActivityDefinition } from '../../content/types';
import { loadUnit } from '../../content/unitLoader';
import { analyzeQuestionUniqueness } from './questionUniqueness';
import { loadPilotChallengeContent } from './pilotContent';
import { loadChallengeQualityInputs } from './qualityInputs';
import pilotManifest from './pilotManifest';

const groupId = 'grade-1-term-2-math-unit-08';
const sourceUnitId = 'grade-1/term-2/math/unit-08';
const sourcePrefix = `challenge-question:${sourceUnitId}/`;
const supplementPrefix = 'challenge-question:challenge-supplement-grade-1-term-2-math-unit-08-';
const reviewKnowledgePoints = [
  'plane-shape-recognition',
  'subtraction-within-20',
  'classification-standard',
  'number-sequence-to-100',
  'yuan-jiao-fen-conversion',
  'two-digit-add-subtract-one',
  'repeating-shape-patterns',
];

declare const process: { cwd(): string };

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

function readTsv(path: string): Array<Record<string, string>> {
  const lines = readFileSync(path, 'utf8').trim().split(/\r?\n/u) as string[];
  const [headerLine = '', ...dataLines] = lines;
  const headers = headerLine.replace(/^\uFEFF/u, '').split('\t');
  return dataLines.map((line: string) => {
    const values = line.split('\t');
    return Object.fromEntries(headers.map((header: string, index: number) => [header, values[index] ?? '']));
  });
}

describe('Grade 1 Term 2 Math Unit 8 challenge coverage', () => {
  it('registers 总复习 with 30 candidates per tier and the seven unit review targets', () => {
    const group = pilotManifest.groups.find(({ definition }) => definition.id === groupId);

    expect(group).toBeDefined();
    expect(group?.definition).toMatchObject({
      id: groupId,
      kind: 'unit',
      grade: 1,
      semester: 2,
      subject: 'math',
      sourceUnitIds: [sourceUnitId],
      learningTaskUnitIds: [
        'grade-1/term-2/math/unit-01',
        'grade-1/term-2/math/unit-02',
        'grade-1/term-2/math/unit-03',
        'grade-1/term-2/math/unit-04',
        'grade-1/term-2/math/unit-05',
        'grade-1/term-2/math/unit-06',
        'grade-1/term-2/math/unit-07',
        sourceUnitId,
      ],
      coreKnowledgePointIds: reviewKnowledgePoints,
      tasks: [
        { id: `${groupId}/basic-01`, difficulty: 'basic', targetCount: 15, requiredKnowledgePointIds: ['plane-shape-recognition', 'number-sequence-to-100', 'classification-standard'] },
        { id: `${groupId}/basic-02`, difficulty: 'basic', targetCount: 15, requiredKnowledgePointIds: ['subtraction-within-20', 'yuan-jiao-fen-conversion', 'two-digit-add-subtract-one', 'repeating-shape-patterns'] },
        { id: `${groupId}/advanced-01`, difficulty: 'advanced', targetCount: 15, requiredKnowledgePointIds: ['number-sequence-to-100', 'yuan-jiao-fen-conversion', 'two-digit-add-subtract-one'] },
        { id: `${groupId}/advanced-02`, difficulty: 'advanced', targetCount: 15, requiredKnowledgePointIds: ['plane-shape-recognition', 'subtraction-within-20', 'classification-standard', 'repeating-shape-patterns'] },
        { id: `${groupId}/high-01`, difficulty: 'high', targetCount: 15, requiredKnowledgePointIds: reviewKnowledgePoints },
      ],
    });
    expect(group?.questionIds).toHaveLength(90);
    const questionById = new Map(pilotManifest.questions.map((question) => [question.questionId, question]));
    expect(Object.fromEntries(['basic', 'advanced', 'high'].map((difficulty) => [
      difficulty,
      group?.questionIds.filter((questionId) => questionById.get(questionId)?.difficulty === difficulty).length,
    ]))).toEqual({ basic: 30, advanced: 30, high: 30 });
  });

  it('keeps the original 48 learning activities and uses only 15 as challenge sources', async () => {
    const group = pilotManifest.groups.find(({ definition }) => definition.id === groupId);
    const sourceQuestionIds = group?.questionIds.filter((questionId) => questionId.startsWith(sourcePrefix)) ?? [];
    const supplementQuestionIds = group?.questionIds.filter((questionId) => questionId.startsWith(supplementPrefix)) ?? [];
    const questionById = new Map(pilotManifest.questions.map((question) => [question.questionId, question]));
    const unit = await loadUnit(sourceUnitId);
    const lessonActivityIds = Object.values(unit!.difficultyTracks)
      .flatMap((track) => track.tasks.flatMap((task) => task.sessions.flatMap((session) => session.activities.map(({ id }) => id))));

    expect(lessonActivityIds).toHaveLength(48);
    expect(sourceQuestionIds).toHaveLength(15);
    expect(Object.fromEntries(['basic', 'advanced', 'high'].map((difficulty) => [
      difficulty,
      sourceQuestionIds.filter((questionId) => questionById.get(questionId)?.difficulty === difficulty).length,
    ]))).toEqual({ basic: 5, advanced: 5, high: 5 });
    expect(supplementQuestionIds).toHaveLength(75);
    expect(sourceQuestionIds.every((questionId) => lessonActivityIds.includes(questionId.slice('challenge-question:'.length)))).toBe(true);

    const activeQuestionIds = new Set(group?.questionIds ?? []);
    const inputs = await loadChallengeQualityInputs(pilotManifest);
    const questions = inputs.manifest.questions.filter(({ questionId }) => activeQuestionIds.has(questionId));
    const uniqueness = await analyzeQuestionUniqueness(questions, inputs.activitiesById, inputs.sourceUnitByActivityId);

    expect(uniqueness.exactDuplicateGroups).toEqual([]);
    expect(uniqueness.similarQuestionPairs).toEqual([]);
  });

  it('records an author review and the correct answer for every candidate in the Chinese ledger', async () => {
    const content = await loadPilotChallengeContent();
    const group = content.groups.find(({ group: loadedGroup }) => loadedGroup.definition.id === groupId);
    const ledger = readTsv(resolve(process.cwd(), 'docs/challenges/grade-1-term-2-math-unit-08-question-review.tsv'));
    const rowsById = new Map(ledger.map((row) => [row['题目ID'], row]));

    expect(ledger).toHaveLength(90);
    expect(new Set(rowsById.keys())).toEqual(new Set(group?.candidates.map(({ questionId }) => questionId)));
    for (const candidate of group?.candidates ?? []) {
      const row = rowsById.get(candidate.questionId);
      const answer = expectedAnswerSummary(candidate.activity);
      const normalizedPrompt = candidate.activity.prompt.replace(/\s+/gu, ' ').trim();

      expect(row, candidate.questionId).toBeDefined();
      expect(row?.['正确答案'], candidate.questionId).toBe(answer);
      expect(row?.['知识点'], candidate.questionId).not.toBe('');
      expect(row?.['题意与答案复核'], candidate.questionId).toContain(normalizedPrompt);
      expect(row?.['题意与答案复核'], candidate.questionId).toContain(answer);
      expect(row?.['选项与答案泄漏检查'], candidate.questionId).not.toBe('');
      expect(row?.['审核状态'], candidate.questionId).toBe('作者自审通过（未独立教育者复核）');
    }
  });
});
