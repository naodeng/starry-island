import { describe, expect, it } from 'vitest';
// @ts-expect-error The browser-first project omits Node.js declarations; these APIs only read the local review ledger in Vitest.
import { existsSync, readFileSync } from 'node:fs';
// @ts-expect-error The browser-first project omits Node.js declarations; this path is only used by the local Vitest test.
import { resolve } from 'node:path';
import type { ChallengeGroupManifest, ChallengeManifest } from '../domain/types';
import type { ActivityDefinition } from '../../content/types';
import manifest from './pilotManifest';
import { loadPilotChallengeContent } from './pilotContent';

declare const process: { cwd(): string };

const grade1Term1MathFirstHalfId = 'grade-1-term-1-math-first-half';
const expectedSourceUnitIds = [
  'grade-1/term-1/math/unit-01',
  'grade-1/term-1/math/unit-02',
  'grade-1/term-1/math/unit-03',
  'grade-1/term-1/math/unit-04',
];
const grade1Term1MathStageSpecs = [
  {
    id: 'grade-1-term-1-math-first-half',
    stage: 'first-half',
    sourceUnitIds: [
      'grade-1/term-1/math/unit-01',
      'grade-1/term-1/math/unit-02',
      'grade-1/term-1/math/unit-03',
      'grade-1/term-1/math/unit-04',
    ],
  },
  {
    id: 'grade-1-term-1-math-second-half',
    stage: 'second-half',
    sourceUnitIds: [
      'grade-1/term-1/math/unit-05',
      'grade-1/term-1/math/unit-06',
      'grade-1/term-1/math/unit-07',
      'grade-1/term-1/math/unit-08',
      'grade-1/term-1/math/unit-09',
    ],
    learningTaskUnitIds: [
      'grade-1/term-1/math/unit-01',
      'grade-1/term-1/math/unit-02',
      'grade-1/term-1/math/unit-03',
      'grade-1/term-1/math/unit-04',
      'grade-1/term-1/math/unit-05',
      'grade-1/term-1/math/unit-06',
      'grade-1/term-1/math/unit-07',
      'grade-1/term-1/math/unit-08',
      'grade-1/term-1/math/unit-09',
    ],
  },
  {
    id: 'grade-1-term-1-math-end-term',
    stage: 'end-term',
    sourceUnitIds: [
      'grade-1/term-1/math/unit-01',
      'grade-1/term-1/math/unit-02',
      'grade-1/term-1/math/unit-03',
      'grade-1/term-1/math/unit-04',
      'grade-1/term-1/math/unit-05',
      'grade-1/term-1/math/unit-06',
      'grade-1/term-1/math/unit-07',
      'grade-1/term-1/math/unit-08',
      'grade-1/term-1/math/unit-09',
    ],
  },
] as const;
const grade2Term2ChineseStageSpecs = [
  { id: 'grade-2-term-2-chinese-first-half', stage: 'first-half', unitNumbers: [1, 2, 3, 4] },
  { id: 'grade-2-term-2-chinese-second-half', stage: 'second-half', unitNumbers: [5, 6, 7, 8] },
  { id: 'grade-2-term-2-chinese-end-term', stage: 'end-term', unitNumbers: [1, 2, 3, 4, 5, 6, 7, 8] },
] as const;
const grade2Term2OtherSubjectStageSpecs = [
  { subject: 'math', id: 'grade-2-term-2-math-first-half', stage: 'first-half', unitNumbers: [1, 2, 3, 4, 5] },
  {
    subject: 'math',
    id: 'grade-2-term-2-math-second-half',
    stage: 'second-half',
    unitNumbers: [6, 7, 8, 9, 10],
    learningTaskUnitIds: [5, 6, 7, 8, 9, 10].map((unit) => `grade-2/term-2/math/unit-${String(unit).padStart(2, '0')}`),
  },
  { subject: 'math', id: 'grade-2-term-2-math-end-term', stage: 'end-term', unitNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
  { subject: 'english', id: 'grade-2-term-2-english-first-half', stage: 'first-half', unitNumbers: [1, 2, 3] },
  { subject: 'english', id: 'grade-2-term-2-english-second-half', stage: 'second-half', unitNumbers: [4, 5, 6] },
  { subject: 'english', id: 'grade-2-term-2-english-end-term', stage: 'end-term', unitNumbers: [1, 2, 3, 4, 5, 6] },
] as const;
const grade2Term2ChineseEndTermHighKnowledgePointsByUnit = [
  ['spring-sensory-observation', 'planting-sequence-and-care'],
  ['food-labor-chain', 'respectful-help'],
  ['character-components', 'cultural-respect'],
  ['sensory-imagery-details', 'viewpoint-observation'],
  ['fable-action-consequence', 'reflective-revision'],
  ['weather-sequence-observation', 'safe-navigation-and-help-seeking'],
  ['animal-needs-and-environment-change', 'needs-based-planning-and-revision'],
  ['myth-character-challenge-and-solution', 'original-imaginative-story-writing'],
] as const;

function readTsv(path: string): Array<Record<string, string>> {
  const lines = readFileSync(path, 'utf8').trim().split(/\r?\n/u) as string[];
  const [headerLine = '', ...dataLines] = lines;
  const headers = headerLine.replace(/^\uFEFF/u, '').split('\t');
  return dataLines.map((line: string) => {
    const values = line.split('\t');
    return Object.fromEntries(headers.map((header: string, index: number) => [header, values[index] ?? '']));
  });
}

function reviewQuestionId(row: Record<string, string>): string {
  return row['题目ID'] ?? row['题目记录 ID'] ?? '';
}

function reviewLedgerAnswer(row: Record<string, string>): string {
  return row['正确答案/键'] ?? row['正确选项'] ?? row['正确答案'] ?? '';
}

function hasAuthorSelfReview(row: Record<string, string>): boolean {
  const status = row['审核状态'] ?? '';
  return status.includes('作者自审通过') || status.includes('作者逐题自审通过');
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

describe('semester stage mappings', () => {
  it('splits Grade 1 Term 1 Math after the first four of nine formal chapters', () => {
    const challengeManifest = manifest as ChallengeManifest;
    const firstHalf = challengeManifest.groups.find(({ definition }) => definition.id === grade1Term1MathFirstHalfId) as ChallengeGroupManifest | undefined;

    expect(firstHalf).toBeDefined();
    expect(firstHalf?.definition).toMatchObject({
      id: grade1Term1MathFirstHalfId,
      kind: 'semester',
      grade: 1,
      semester: 1,
      subject: 'math',
      stage: 'first-half',
      sourceUnitIds: expectedSourceUnitIds,
    });
    expect(firstHalf?.definition.tasks.map(({ targetCount }) => targetCount)).toEqual([25, 25, 25, 25, 25]);

    const sourceGroupIds = expectedSourceUnitIds.map((sourceUnitId) => `grade-1-term-1-math-unit-${sourceUnitId.slice(-2)}`);
    const sourceQuestionIds = new Set(challengeManifest.groups
      .filter(({ definition }) => sourceGroupIds.includes(definition.id))
      .flatMap(({ questionIds }) => questionIds));
    expect(new Set(firstHalf?.questionIds)).toEqual(sourceQuestionIds);

    const questionsById = new Map(challengeManifest.questions.map((question) => [question.questionId, question]));
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const candidates = firstHalf?.questionIds.map((id) => questionsById.get(id)).filter((question) => question?.difficulty === difficulty) ?? [];
      expect(candidates.length).toBeGreaterThanOrEqual(50);
      const candidateKnowledgePointIds = new Set(candidates.flatMap((question) => question?.knowledgePointIds ?? []));
      expect(firstHalf?.definition.coreKnowledgePointIds.every((id) => candidateKnowledgePointIds.has(id))).toBe(true);
    }
  });

  it('maps the second half and end-term stages to the remaining and complete formal chapter ranges', () => {
    const challengeManifest = manifest as ChallengeManifest;
    const questionsById = new Map(challengeManifest.questions.map((question) => [question.questionId, question]));

    for (const stageSpec of grade1Term1MathStageSpecs.slice(1)) {
      const group = challengeManifest.groups.find(({ definition }) => definition.id === stageSpec.id) as ChallengeGroupManifest | undefined;
      expect(group?.definition).toMatchObject({
        id: stageSpec.id,
        kind: 'semester',
        grade: 1,
        semester: 1,
        subject: 'math',
        stage: stageSpec.stage,
        sourceUnitIds: stageSpec.sourceUnitIds,
        ...(stageSpec.stage === 'second-half' ? { learningTaskUnitIds: stageSpec.learningTaskUnitIds } : {}),
      });
      expect(group?.definition.tasks.map(({ targetCount }) => targetCount)).toEqual([25, 25, 25, 25, 25]);

      const sourceGroupIds = stageSpec.sourceUnitIds.map((sourceUnitId) => `grade-1-term-1-math-unit-${sourceUnitId.slice(-2)}`);
      const sourceQuestionIds = new Set(challengeManifest.groups
        .filter(({ definition }) => sourceGroupIds.includes(definition.id))
        .flatMap(({ questionIds }) => questionIds));
      expect(new Set(group?.questionIds)).toEqual(sourceQuestionIds);

      for (const difficulty of ['basic', 'advanced', 'high'] as const) {
        const candidates = group?.questionIds.map((id) => questionsById.get(id)).filter((question) => question?.difficulty === difficulty) ?? [];
        expect(candidates.length).toBeGreaterThanOrEqual(50);
        const candidateKnowledgePointIds = new Set(candidates.flatMap((question) => question?.knowledgePointIds ?? []));
        expect(
          group?.definition.coreKnowledgePointIds.every((id) => candidateKnowledgePointIds.has(id)),
          `${stageSpec.id} ${difficulty}: missing ${group?.definition.coreKnowledgePointIds.filter((id) => !candidateKnowledgePointIds.has(id)).join(', ')}`,
        ).toBe(true);
      }
    }
  });

  it('keeps a Chinese question-review ledger row for every candidate in each released Grade 1 Term 1 Math stage', () => {
    const challengeManifest = manifest as ChallengeManifest;
    for (const stageSpec of grade1Term1MathStageSpecs) {
      const group = challengeManifest.groups.find(({ definition }) => definition.id === stageSpec.id)!;
      const ledgerPath = resolve(process.cwd(), `docs/challenges/${stageSpec.id}-question-review.tsv`);

      expect(existsSync(ledgerPath)).toBe(true);
      const rows = readTsv(ledgerPath);
      const questionIds = rows.map(({ 题目ID }) => 题目ID);
      expect(questionIds).toHaveLength(group.questionIds.length);
      expect(new Set(questionIds)).toEqual(new Set(group.questionIds));
      expect(rows.every((row) => Boolean(reviewLedgerAnswer(row)) && hasAuthorSelfReview(row))).toBe(true);
      expect(rows.every(({ 审核状态 }) => 审核状态.includes('未独立教育者复核'))).toBe(true);
    }
  });

  it('links challenge supplements to their question ledgers and course activities to complete course-review rows', () => {
    const courseLedgerPath = resolve(process.cwd(), 'docs/curriculum/grade-1-and-3-question-review.tsv');
    const courseRows = new Map(readTsv(courseLedgerPath).map((row) => [row['课程ID'], row]));

    for (const stageSpec of grade1Term1MathStageSpecs) {
      const stageLedgerPath = resolve(process.cwd(), `docs/challenges/${stageSpec.id}-question-review.tsv`);
      for (const row of readTsv(stageLedgerPath)) {
        const rawQuestionId = row['题目ID'].replace(/^challenge-question:/u, '');
        const unitMatch = rawQuestionId.match(/grade-1(?:\/term-1\/math\/unit-|-term-1-math-unit-)(\d{2})/u);
        expect(unitMatch, row['题目ID']).not.toBeNull();
        const unitNumber = unitMatch?.[1];
        expect(stageSpec.sourceUnitIds.map((id) => id.slice(-2))).toContain(unitNumber);

        if (rawQuestionId.includes('challenge-supplement-')) {
          const challengeLedgerPath = resolve(process.cwd(), `docs/challenges/grade-1-term-1-math-unit-${unitNumber}-question-review.tsv`);
          expect(existsSync(challengeLedgerPath)).toBe(true);
        const reviewedQuestionIds = new Set(readTsv(challengeLedgerPath).map(reviewQuestionId));
          expect(reviewedQuestionIds.has(row['题目ID']), `source ledger is missing ${row['题目ID']}`).toBe(true);
          expect(row['题意与答案复核']).toContain(`docs/challenges/grade-1-term-1-math-unit-${unitNumber}-question-review.tsv`);
        } else {
          const sourceMatch = rawQuestionId.match(/^(grade-1\/term-1\/math\/unit-\d{2})\/(basic|advanced|high)\/task-(01|02)\/session-01\/question-(0[1-8])$/u);
          expect(sourceMatch, row['题目ID']).not.toBeNull();
          const unitId = sourceMatch?.[1] ?? '';
          const courseRow = courseRows.get(unitId);
          expect(courseRow).toBeDefined();
          expect(courseRow).toMatchObject({
            题目总数: '48',
            已审数量: '48',
            答案正确性: '完成',
            题目清晰度: '完成',
            年龄适配: '完成',
            教材主题对齐: '完成',
            难度归属: '完成',
            状态: '完成',
          });
          expect(courseRow?.['复核证据']).toContain(`${unitId}/{basic|advanced|high}/task-{01|02}/session-01/question-{01..08}`);
          expect(row['题意与答案复核']).toContain('docs/curriculum/grade-1-and-3-question-review.tsv');
        }
      }
    }
  });

  it('records each source activity answer in a human-readable form that matches the activity data', async () => {
    const content = await loadPilotChallengeContent();
    for (const stageSpec of grade1Term1MathStageSpecs) {
      const group = content.groups.find(({ group }) => group.definition.id === stageSpec.id);
      const stageLedgerPath = resolve(process.cwd(), `docs/challenges/${stageSpec.id}-question-review.tsv`);
      const reviewByQuestionId = new Map(readTsv(stageLedgerPath).map((row) => [row['题目ID'], row]));

      expect(group).toBeDefined();
      expect(group?.candidates).toHaveLength(reviewByQuestionId.size);
      for (const candidate of group?.candidates ?? []) {
        expect(reviewByQuestionId.get(candidate.questionId)?.['正确答案/键']).toBe(expectedAnswerKey(candidate.activity));
      }
    }
  });

  it('maps Grade 2 Term 2 Chinese stages to the confirmed chapter split and complete source pools', () => {
    const challengeManifest = manifest as ChallengeManifest;
    const questionsById = new Map(challengeManifest.questions.map((question) => [question.questionId, question]));

    for (const stageSpec of grade2Term2ChineseStageSpecs) {
      const group = challengeManifest.groups.find(({ definition }) => definition.id === stageSpec.id) as ChallengeGroupManifest | undefined;
      const sourceUnitIds = stageSpec.unitNumbers.map((unit) => `grade-2/term-2/chinese/unit-${String(unit).padStart(2, '0')}`);
      const sourceGroupIds = sourceUnitIds.map((unitId) => `grade-2-term-2-chinese-unit-${unitId.slice(-2)}`);
      const sourceQuestionIds = new Set(challengeManifest.groups
        .filter(({ definition }) => sourceGroupIds.includes(definition.id))
        .flatMap(({ questionIds }) => questionIds));

      expect(group?.definition).toMatchObject({
        id: stageSpec.id,
        kind: 'semester',
        grade: 2,
        semester: 2,
        subject: 'chinese',
        stage: stageSpec.stage,
        sourceUnitIds,
        ...('learningTaskUnitIds' in stageSpec ? { learningTaskUnitIds: stageSpec.learningTaskUnitIds } : {}),
      });
      expect(group?.definition.tasks.map(({ targetCount }) => targetCount)).toEqual([25, 25, 25, 25, 25]);
      expect(new Set(group?.questionIds)).toEqual(sourceQuestionIds);

      for (const difficulty of ['basic', 'advanced', 'high'] as const) {
        const candidates = group?.questionIds.map((id) => questionsById.get(id)).filter((question) => question?.difficulty === difficulty) ?? [];
        expect(candidates.length).toBeGreaterThanOrEqual(50);
        const candidateKnowledgePointIds = new Set(candidates.flatMap((question) => question?.knowledgePointIds ?? []));
        expect(
          group?.definition.coreKnowledgePointIds.every((id) => candidateKnowledgePointIds.has(id)),
          `${stageSpec.id} ${difficulty}: missing ${group?.definition.coreKnowledgePointIds.filter((id) => !candidateKnowledgePointIds.has(id)).join(', ')}`,
        ).toBe(true);
      }
    }
  });

  it('keeps a Chinese review-ledger row for every Grade 2 Term 2 stage candidate', () => {
    const challengeManifest = manifest as ChallengeManifest;
    for (const stageSpec of grade2Term2ChineseStageSpecs) {
      const group = challengeManifest.groups.find(({ definition }) => definition.id === stageSpec.id)!;
      const ledgerPath = resolve(process.cwd(), `docs/challenges/${stageSpec.id}-question-review.tsv`);

      expect(existsSync(ledgerPath)).toBe(true);
      const rows = readTsv(ledgerPath);
      expect(rows.map(reviewQuestionId)).toHaveLength(group.questionIds.length);
      expect(new Set(rows.map(reviewQuestionId))).toEqual(new Set(group.questionIds));
      expect(rows.every((row) => Boolean(reviewLedgerAnswer(row)) && hasAuthorSelfReview(row))).toBe(true);
      expect(rows.every(({ 审核状态 }) => 审核状态.includes('未独立教育者复核'))).toBe(true);
    }
  });

  it('uses two representative high-level knowledge points from each of the eight Chinese chapters', () => {
    const challengeManifest = manifest as ChallengeManifest;
    const endTerm = challengeManifest.groups.find(({ definition }) => definition.id === 'grade-2-term-2-chinese-end-term');
    const highTask = endTerm?.definition.tasks.find(({ difficulty }) => difficulty === 'high');
    const expectedKnowledgePointIds = grade2Term2ChineseEndTermHighKnowledgePointsByUnit.flat();

    expect(highTask?.requiredKnowledgePointIds).toEqual(expectedKnowledgePointIds);
    for (let unitNumber = 1; unitNumber <= 8; unitNumber += 1) {
      const unitGroupId = `grade-2-term-2-chinese-unit-${String(unitNumber).padStart(2, '0')}`;
      const unitGroup = challengeManifest.groups.find(({ definition }) => definition.id === unitGroupId);
      const expectedUnitKnowledgePointIds = grade2Term2ChineseEndTermHighKnowledgePointsByUnit[unitNumber - 1];

      expect(expectedUnitKnowledgePointIds?.every((id) => unitGroup?.definition.coreKnowledgePointIds.includes(id))).toBe(true);
    }
  });

  it('maps Grade 2 Term 2 Math and English stages to the chapter-order split and full source pools', () => {
    const challengeManifest = manifest as ChallengeManifest;
    const questionsById = new Map(challengeManifest.questions.map((question) => [question.questionId, question]));

    for (const stageSpec of grade2Term2OtherSubjectStageSpecs) {
      const group = challengeManifest.groups.find(({ definition }) => definition.id === stageSpec.id) as ChallengeGroupManifest | undefined;
      const sourceUnitIds = stageSpec.unitNumbers.map((unit) =>
        `grade-2/term-2/${stageSpec.subject}/unit-${String(unit).padStart(2, '0')}`);
      const sourceGroupIds = sourceUnitIds.map((_unitId, index) =>
        `grade-2-term-2-${stageSpec.subject}-unit-${String(stageSpec.unitNumbers[index]).padStart(2, '0')}`);
      const sourceGroups = challengeManifest.groups.filter(({ definition }) => sourceGroupIds.includes(definition.id));
      const sourceQuestionIds = new Set(sourceGroups.flatMap(({ questionIds }) => questionIds));
      const highTask = group?.definition.tasks.find(({ difficulty }) => difficulty === 'high');

      expect(group?.definition).toMatchObject({
        id: stageSpec.id,
        kind: 'semester',
        grade: 2,
        semester: 2,
        subject: stageSpec.subject,
        stage: stageSpec.stage,
        sourceUnitIds,
      });
      expect(group?.definition.tasks.map(({ targetCount }) => targetCount)).toEqual([25, 25, 25, 25, 25]);
      expect(new Set(group?.questionIds)).toEqual(sourceQuestionIds);
      expect(sourceGroups).toHaveLength(stageSpec.unitNumbers.length);
      const allCandidateKnowledgePointIds = new Set(group?.questionIds
        .flatMap((id) => questionsById.get(id)?.knowledgePointIds ?? []));
      expect(group?.definition.coreKnowledgePointIds.every((id) => allCandidateKnowledgePointIds.has(id))).toBe(true);

      for (const difficulty of ['basic', 'advanced', 'high'] as const) {
        const candidates = group?.questionIds
          .map((id) => questionsById.get(id))
          .filter((question) => question?.difficulty === difficulty) ?? [];
        const candidateKnowledgePointIds = new Set(candidates.flatMap((question) => question?.knowledgePointIds ?? []));
        const taskKnowledgePointIds = new Set(group?.definition.tasks
          .filter((task) => task.difficulty === difficulty)
          .flatMap(({ requiredKnowledgePointIds }) => requiredKnowledgePointIds));

        expect(candidates.length).toBeGreaterThanOrEqual(50);
        expect([...taskKnowledgePointIds].every((id) => candidateKnowledgePointIds.has(id))).toBe(true);
        if (difficulty !== 'high') {
          const availableCoreKnowledgePointIds = [...candidateKnowledgePointIds]
            .filter((id) => group?.definition.coreKnowledgePointIds.includes(id));
          expect(
            availableCoreKnowledgePointIds.every((id) => taskKnowledgePointIds.has(id)),
            `${stageSpec.id} ${difficulty}: task coverage missing ${availableCoreKnowledgePointIds.filter((id) => !taskKnowledgePointIds.has(id)).join(', ')}`,
          ).toBe(true);
        }
      }

      for (const sourceGroup of sourceGroups) {
        const sourceHighQuestionIds = sourceGroup.questionIds.filter((id) => questionsById.get(id)?.difficulty === 'high');
        const sourceHighKnowledgePoints = new Set(sourceHighQuestionIds
          .flatMap((id) => questionsById.get(id)?.knowledgePointIds ?? []));
        expect(sourceGroup.definition.coreKnowledgePointIds
          .filter((id) => sourceHighKnowledgePoints.has(id) && highTask?.requiredKnowledgePointIds.includes(id)).length).toBeGreaterThanOrEqual(2);
      }
    }
  });

  it('keeps an author-reviewed ledger row for every Grade 2 Term 2 Math and English stage candidate', () => {
    const challengeManifest = manifest as ChallengeManifest;
    for (const stageSpec of grade2Term2OtherSubjectStageSpecs) {
      const group = challengeManifest.groups.find(({ definition }) => definition.id === stageSpec.id);
      const ledgerPath = resolve(process.cwd(), `docs/challenges/${stageSpec.id}-question-review.tsv`);

      expect(group).toBeDefined();
      expect(existsSync(ledgerPath)).toBe(true);
      const rows = readTsv(ledgerPath);
      const questionIds = group?.questionIds ?? [];
      expect(rows.map(reviewQuestionId)).toHaveLength(questionIds.length);
      expect(new Set(rows.map(reviewQuestionId))).toEqual(new Set(questionIds));
      expect(rows.every((row) => Boolean(reviewLedgerAnswer(row)) && hasAuthorSelfReview(row))).toBe(true);
      expect(rows.every(({ 审核状态 }) => 审核状态.includes('未独立教育者复核'))).toBe(true);
    }
  });
});
