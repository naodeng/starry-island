import { describe, expect, it } from 'vitest';
// @ts-expect-error Node built-ins are available in Vitest; this test reads local review ledgers.
import { existsSync, readFileSync } from 'node:fs';
// @ts-expect-error Node built-ins are available in Vitest; this test reads local review ledgers.
import { resolve } from 'node:path';
import type { ActivityDefinition } from '../../content/types';
import { loadUnit } from '../../content/unitLoader';
import { loadChallengeQualityInputs } from './qualityInputs';
import { derivePilotQuestionKnowledgePointIds } from './pilotQuestionKnowledgePoints';
import { loadPilotChallengeContent } from './pilotContent';
import { analyzeQuestionUniqueness } from './questionUniqueness';
import { grade1Term2ChineseSemesterSupplementalActivities } from './grade1Term2ChineseSemesterSupplementalActivities';
import manifest from './pilotManifest';
import { growthGroups } from './growthGroups';

declare const process: { cwd(): string };

const subjects = [
  { subject: 'chinese', firstHalf: [1, 2, 3, 4], secondHalf: [5, 6, 7, 8], all: [1, 2, 3, 4, 5, 6, 7, 8] },
  { subject: 'math', firstHalf: [1, 2, 3, 4], secondHalf: [5, 6, 7, 8], all: [1, 2, 3, 4, 5, 6, 7, 8] },
  { subject: 'english', firstHalf: [1, 2, 3], secondHalf: [4, 5, 6], all: [1, 2, 3, 4, 5, 6] },
] as const;
const stageNames = ['first-half', 'second-half', 'end-term'] as const;

const stageSpecs = subjects.flatMap(({ subject, firstHalf, secondHalf, all }) => [
  { id: `grade-1-term-2-${subject}-first-half`, subject, semester: 2, stage: stageNames[0], unitNumbers: firstHalf },
  { id: `grade-1-term-2-${subject}-second-half`, subject, semester: 2, stage: stageNames[1], unitNumbers: secondHalf },
  { id: `grade-1-term-2-${subject}-end-term`, subject, semester: 2, stage: stageNames[2], unitNumbers: all },
]);

function readTsv(path: string): Array<Record<string, string>> {
  const lines = readFileSync(path, 'utf8').trim().split(/\r?\n/u) as string[];
  const [headerLine = '', ...dataLines] = lines;
  const headers = headerLine.replace(/^\uFEFF/u, '').split('\t');
  return dataLines.map((line: string) => {
    const values = line.split('\t');
    return Object.fromEntries(headers.map((header: string, index: number) => [header, values[index] ?? '']));
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
      const categoriesById = new Map(activity.categories.map(({ id, label }) => [id, label]));
      return activity.items.map(({ label, categoryId }) => `${label}→${categoriesById.get(categoryId) ?? ''}`).join('；');
    }
    case 'arithmetic': return `${activity.expression}=${activity.correctAnswer}`;
    case 'measurement': return `${activity.targetLengthCm} 厘米`;
  }
}

function unitId(subject: string, number: number): string {
  return `grade-1/term-2/${subject}/unit-${String(number).padStart(2, '0')}`;
}

async function selectSemanticRepresentatives(questionIds: string[]) {
  const questionsById = new Map(manifest.questions.map((question) => [question.questionId, question]));
  const inputs = await loadChallengeQualityInputs(manifest);
  const questions = questionIds.map((questionId) => questionsById.get(questionId)).filter((question) => question !== undefined);
  const stageSources = new Map(questions.map((question) => [question.activityId, 'semester-semantic-scope']));
  const uniqueness = await analyzeQuestionUniqueness(questions, inputs.activitiesById, stageSources);
  const parentById = new Map(questionIds.map((questionId) => [questionId, questionId]));
  const find = (questionId: string): string => {
    const parent = parentById.get(questionId) ?? questionId;
    if (parent === questionId) return questionId;
    const root = find(parent);
    parentById.set(questionId, root);
    return root;
  };
  const unite = (left: string, right: string) => {
    const leftRoot = find(left);
    const rightRoot = find(right);
    if (leftRoot !== rightRoot) parentById.set(rightRoot, leftRoot);
  };
  for (const duplicate of uniqueness.exactDuplicateGroups) {
    for (const questionId of duplicate.questionIds.slice(1)) unite(duplicate.questionIds[0], questionId);
  }
  for (const pair of uniqueness.similarQuestionPairs.filter(({ reason }) => reason.includes('交互内容与答案结构相同'))) {
    unite(pair.questionIds[0], pair.questionIds[1]);
  }
  const membersByRoot = new Map<string, string[]>();
  for (const questionId of questionIds) {
    const root = find(questionId);
    membersByRoot.set(root, [...(membersByRoot.get(root) ?? []), questionId]);
  }
  const difficultyRank = { basic: 0, advanced: 1, high: 2 } as const;
  return [...membersByRoot.values()].map((members) => [...members].sort((left, right) => {
    const leftDifficulty = questionsById.get(left)?.difficulty ?? 'high';
    const rightDifficulty = questionsById.get(right)?.difficulty ?? 'high';
    return difficultyRank[leftDifficulty] - difficultyRank[rightDifficulty] || left.localeCompare(right);
  })[0]).sort();
}

describe('一年级下册语文、数学和英语学期阶段组', () => {
  it('按教材顺序等分阶段并为每种交互内容保留一个来源题目代表', async () => {
    const questionById = new Map(manifest.questions.map((question) => [question.questionId, question]));

    expect(stageSpecs).toHaveLength(9);
    for (const spec of stageSpecs) {
      const group = manifest.groups.find(({ definition }) => definition.id === spec.id);
      const sourceUnitIds = spec.unitNumbers.map((number) => unitId(spec.subject, number));
      expect(group, spec.id).toBeDefined();
      expect(group?.definition).toMatchObject({
        id: spec.id,
        kind: 'semester',
        grade: 1,
        semester: 2,
        subject: spec.subject,
        stage: spec.stage,
        sourceUnitIds,
      });
      expect(group?.definition.tasks.map(({ targetCount }) => targetCount)).toEqual([25, 25, 25, 25, 25]);
      expect(new Set(group?.questionIds).size).toBe(group?.questionIds.length);

      let expectedQuestionIds: string[];
      if (spec.subject === 'chinese') {
        const units = await Promise.all(sourceUnitIds.map((id) => loadUnit(id)));
        expectedQuestionIds = units.flatMap((unit) => Object.values(unit?.difficultyTracks ?? {}).flatMap((track) =>
          track.tasks.flatMap((task) => task.sessions.flatMap((session) => session.activities.map(({ id }) => `challenge-question:${id}`)))))
          .concat(grade1Term2ChineseSemesterSupplementalActivities
            .filter(({ sourceUnitId }) => sourceUnitIds.includes(sourceUnitId))
            .map(({ activity }) => `challenge-question:${activity.id}`));
      } else {
        const sourceGroupIds = spec.unitNumbers.map((number) => `grade-1-term-2-${spec.subject}-unit-${String(number).padStart(2, '0')}`);
        expectedQuestionIds = manifest.groups
          .filter(({ definition }) => sourceGroupIds.includes(definition.id))
          .flatMap(({ questionIds }) => questionIds);
      }
      expectedQuestionIds = expectedQuestionIds.filter((questionId) => questionById.has(questionId));
      const expectedRepresentatives = await selectSemanticRepresentatives(expectedQuestionIds);
      expect(new Set(group?.questionIds)).toEqual(new Set(expectedRepresentatives));
      expect(group?.questionIds.every((id) => questionById.has(id))).toBe(true);
      const expectedCoreKnowledgePointIds = spec.subject === 'chinese'
        ? group?.questionIds.flatMap((questionId) => questionById.get(questionId)?.knowledgePointIds ?? [])
        : manifest.groups
          .filter(({ definition }) => definition.kind === 'unit'
            && definition.id.startsWith('grade-1-term-2-' + spec.subject + '-unit-')
            && sourceUnitIds.some((sourceUnitId) => definition.sourceUnitIds.includes(sourceUnitId)))
          .flatMap(({ definition }) => definition.coreKnowledgePointIds);
      expect(group?.definition.coreKnowledgePointIds).toEqual([...new Set(expectedCoreKnowledgePointIds)].sort());
      expect(group?.definition.coreKnowledgePointIds.every((id) => group.questionIds
        .some((questionId) => questionById.get(questionId)?.knowledgePointIds.includes(id)))).toBe(true);

      const growthGroup = growthGroups.find(({ id }) => id === spec.id);
      expect(growthGroup).toMatchObject({ id: spec.id, kind: 'semester', grade: 1, semester: 2, subject: spec.subject });
    }
  }, 30_000);

  it('阶段候选池不重复收录同一交互内容，并且各难度仍满足 50 题门槛', async () => {
    const content = await loadPilotChallengeContent();
    for (const spec of stageSpecs) {
      const group = content.groups.find(({ group: candidate }) => candidate.definition.id === spec.id);
      expect(group, spec.id).toBeDefined();
      const candidates = group?.candidates ?? [];
      for (const difficulty of ['basic', 'advanced', 'high'] as const) {
        expect(candidates.filter((candidate) => candidate.difficulty === difficulty).length, `${spec.id}/${difficulty}`)
          .toBeGreaterThanOrEqual(50);
      }
      const activitiesById = new Map(candidates.map(({ activity }) => [activity.id, activity]));
      const commonStageScope = new Map(candidates.map(({ activity }) => [activity.id, spec.id]));
      const uniqueness = await analyzeQuestionUniqueness(candidates, activitiesById, commonStageScope);
      expect(uniqueness.exactDuplicateGroups, spec.id).toEqual([]);
      expect(uniqueness.similarQuestionPairs.filter(({ reason }) => reason.includes('交互内容与答案结构相同')), spec.id)
        .toEqual([]);
    }
  });

  it('为八个语文主题的课程活动提供稳定、非空的知识点映射', async () => {
    for (let number = 1; number <= 8; number += 1) {
      const id = unitId('chinese', number);
      const unit = await loadUnit(id);
      expect(unit, id).toBeDefined();
      for (const track of Object.values(unit?.difficultyTracks ?? {})) {
        for (const task of track.tasks) {
          for (const session of task.sessions) {
            for (const activity of session.activities) {
              expect(derivePilotQuestionKnowledgePointIds(id, activity).length, activity.id).toBeGreaterThan(0);
            }
          }
        }
      }
    }
  });

  it('逐题台账覆盖每个阶段的全部候选且答案键与实际活动一致', async () => {
    const content = await loadPilotChallengeContent();
    for (const spec of stageSpecs) {
      const stage = content.groups.find(({ group }) => group.definition.id === spec.id);
      const ledgerPath = resolve(process.cwd(), `docs/challenges/${spec.id}-question-review.tsv`);
      expect(existsSync(ledgerPath), spec.id).toBe(true);
      expect(stage, spec.id).toBeDefined();
      const rows = readTsv(ledgerPath);
      const reviewById = new Map(rows.map((row) => [row['题目ID'], row]));
      expect(reviewById.size).toBe(stage?.candidates.length);
      expect(new Set(reviewById.keys())).toEqual(new Set(stage?.candidates.map(({ questionId }) => questionId)));
      for (const candidate of stage?.candidates ?? []) {
        const row = reviewById.get(candidate.questionId);
        expect(row?.['正确答案/键'], candidate.questionId).toBe(answerKey(candidate.activity));
        expect(row?.['审核状态']).toContain('作者自审通过');
        expect(row?.['审核状态']).toContain('未独立教育者复核');
        if (spec.subject === 'chinese') {
          const isNewSupplement = candidate.activity.id.startsWith('challenge-supplement-grade-1-term-2-chinese-semester-');
          expect(row?.['题意与答案复核']).toContain(isNewSupplement
            ? 'docs/challenges/grade-1-term-2-chinese-semester-supplemental-question-review.tsv'
            : 'docs/curriculum/grade-1-and-3-question-review.tsv');
        } else {
          const sourceUnitNumber = spec.unitNumbers.find((number) => {
            const sourceGroup = manifest.groups.find(({ definition }) => (
              definition.id === `grade-1-term-2-${spec.subject}-unit-${String(number).padStart(2, '0')}`
            ));
            return sourceGroup?.questionIds.includes(candidate.questionId);
          });
          expect(sourceUnitNumber, candidate.questionId).toBeDefined();
          expect(row?.['题意与答案复核']).toContain(
            `docs/challenges/grade-1-term-2-${spec.subject}-unit-${String(sourceUnitNumber).padStart(2, '0')}-question-review.tsv`,
          );
        }
      }
    }
  });
});
