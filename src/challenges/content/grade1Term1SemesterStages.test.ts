import { describe, expect, it } from 'vitest';
// @ts-expect-error Node.js reads local review records only in this test.
import { existsSync, readFileSync } from 'node:fs';
// @ts-expect-error Node.js resolves local review records only in this test.
import { resolve } from 'node:path';
import type { ActivityDefinition } from '../../content/types';
import type { ChallengeGroupManifest, ChallengeManifest } from '../domain/types';
import { loadPilotChallengeContent } from './pilotContent';
import manifest from './pilotManifest';

declare const process: { cwd(): string };

const stages = [
  ...(['chinese', 'english'] as const).flatMap((subject) => [
    {
      id: `grade-1-term-1-${subject}-first-half`,
      subject,
      stage: 'first-half',
      units: subject === 'chinese' ? [1, 2, 3, 4] : [1, 2, 3],
    },
    {
      id: `grade-1-term-1-${subject}-second-half`,
      subject,
      stage: 'second-half',
      units: subject === 'chinese' ? [5, 6, 7, 8] : [4, 5, 6],
    },
    {
      id: `grade-1-term-1-${subject}-end-term`,
      subject,
      stage: 'end-term',
      units: subject === 'chinese' ? [1, 2, 3, 4, 5, 6, 7, 8] : [1, 2, 3, 4, 5, 6],
    },
  ]),
];

function stageGroup(groupId: string): ChallengeGroupManifest | undefined {
  return (manifest as ChallengeManifest).groups.find(({ definition }) => definition.id === groupId);
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

function expectedAnswerKey(activity: ActivityDefinition): string {
  switch (activity.kind) {
    case 'choice':
      return activity.options.find(({ id }) => id === activity.correctOptionId)?.label ?? '';
    case 'arithmetic':
      return `${activity.expression}=${activity.correctAnswer}`;
    case 'match':
      return activity.pairs.map(({ left, right }) => `${left}→${right}`).join('；');
    case 'order': {
      const labelsById = new Map(activity.items.map(({ id, label }) => [id, label]));
      return activity.correctOrder.map((id) => labelsById.get(id) ?? '').join(' → ');
    }
    case 'categorize': {
      const categoriesById = new Map(activity.categories.map(({ id, label }) => [id, label]));
      return activity.items.map(({ label, categoryId }) => `${label}→${categoriesById.get(categoryId) ?? ''}`).join('；');
    }
    case 'measurement':
      return `${activity.targetLengthCm} 厘米`;
  }
}

describe('Grade 1 Term 1 Chinese and English semester challenge groups', () => {
  it.each(stages)('$id follows the approved textbook chapter split and has a complete candidate pool', (stageSpec) => {
    const group = stageGroup(stageSpec.id);
    expect(group, `missing semester group ${stageSpec.id}`).toBeDefined();
    expect(group?.definition).toMatchObject({
      id: stageSpec.id,
      kind: 'semester',
      grade: 1,
      semester: 1,
      subject: stageSpec.subject,
      stage: stageSpec.stage,
      sourceUnitIds: stageSpec.units.map((unit) =>
        `grade-1/term-1/${stageSpec.subject}/unit-${String(unit).padStart(2, '0')}`),
      mappingEvidence: {
        checkedAt: '2026-10-26',
      },
    });
    expect(group?.definition.tasks.map(({ targetCount }) => targetCount)).toEqual([25, 25, 25, 25, 25]);

    const questionsById = new Map((manifest as ChallengeManifest).questions.map((question) => [question.questionId, question]));
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const candidates = group?.questionIds.map((id) => questionsById.get(id)).filter((question) => question?.difficulty === difficulty) ?? [];
      expect(candidates.length, `${stageSpec.id} ${difficulty} candidates`).toBeGreaterThanOrEqual(50);
      const candidateKnowledgePointIds = new Set(candidates.flatMap((question) => question?.knowledgePointIds ?? []));
      expect(group?.definition.coreKnowledgePointIds.every((id) => candidateKnowledgePointIds.has(id))).toBe(true);
    }
  });

  it('keeps the three English stage pools tied to the corresponding released unit challenge pools', () => {
    const challengeManifest = manifest as ChallengeManifest;
    for (const stageSpec of stages.filter(({ subject }) => subject === 'english')) {
      const group = stageGroup(stageSpec.id);
      const sourceGroups = stageSpec.units.map((unit) =>
        challengeManifest.groups.find(({ definition }) => definition.id === `grade-1-term-1-english-unit-${String(unit).padStart(2, '0')}`));
      const expectedQuestionIds = new Set(sourceGroups.flatMap((sourceGroup) => sourceGroup?.questionIds ?? []));
      expect(new Set(group?.questionIds)).toEqual(expectedQuestionIds);
    }
  });

  it('has a Chinese review-ledger row for every stage candidate and preserves course source evidence', () => {
    const challengeManifest = manifest as ChallengeManifest;
    const questionIds = new Set(challengeManifest.questions.map(({ questionId }) => questionId));
    const sourceChineseQuestionIds = new Set(challengeManifest.questions
      .filter(({ activityId }) => activityId.startsWith('grade-1/term-1/chinese/unit-'))
      .map(({ questionId }) => questionId));
    for (const stageSpec of stages.filter(({ subject }) => subject === 'chinese')) {
      const group = stageGroup(stageSpec.id);
      expect(group?.questionIds.every((id) => questionIds.has(id))).toBe(true);
      expect(group?.questionIds.every((id) => sourceChineseQuestionIds.has(id))).toBe(true);
    }
  });

  it('records every stage candidate in a Chinese ledger with the actual answer and source review reference', async () => {
    const content = await loadPilotChallengeContent();
    for (const stageSpec of stages) {
      const group = stageGroup(stageSpec.id)!;
      const loadedGroup = content.groups.find(({ group: candidate }) => candidate.definition.id === stageSpec.id);
      const ledgerPath = resolve(process.cwd(), `docs/challenges/${stageSpec.id}-question-review.tsv`);
      expect(existsSync(ledgerPath), `missing ${ledgerPath}`).toBe(true);
      if (!existsSync(ledgerPath)) return;
      const rows = readTsv(ledgerPath);
      const rowsByQuestionId = new Map(rows.map((row) => [row['题目ID'], row]));
      expect(rows).toHaveLength(group.questionIds.length);
      expect(new Set(rowsByQuestionId.keys())).toEqual(new Set(group.questionIds));
      expect(rows.every((row) => row['审核状态']?.includes('作者自审通过') && row['审核状态']?.includes('未独立教育者复核'))).toBe(true);
      for (const candidate of loadedGroup?.candidates ?? []) {
        const row = rowsByQuestionId.get(candidate.questionId);
        expect(row?.['正确答案/键'], candidate.questionId).toBe(expectedAnswerKey(candidate.activity));
        expect(row?.['知识点标识'], candidate.questionId).toBe(candidate.knowledgePointIds.join('；'));
        if (stageSpec.subject === 'chinese') {
          expect(row?.['题意与答案复核']).toContain('docs/curriculum/grade-1-and-3-question-review.tsv');
        } else {
          const unitNumber = candidate.activity.id.match(/(?:english\/unit-|english-unit-)(\d{2})/u)?.[1];
          expect(unitNumber, candidate.questionId).toBeDefined();
          expect(row?.['题意与答案复核']).toContain(`grade-1-term-1-english-unit-${unitNumber}-question-review.tsv`);
        }
      }
    }
  });
});
