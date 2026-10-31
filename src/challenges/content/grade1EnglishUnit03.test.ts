import { describe, expect, it } from 'vitest';
// @ts-expect-error Node.js is used only to inspect the local review ledger during Vitest.
import { existsSync, readFileSync } from 'node:fs';
// @ts-expect-error Node.js is used only to resolve the local review ledger during Vitest.
import { resolve } from 'node:path';
import type { ActivityDefinition } from '../../content/types';
import type { ChallengeManifest } from '../domain/types';
import manifest from './pilotManifest';
import { loadPilotChallengeContent } from './pilotContent';
import { getPilotUnitChallengeGroupId } from './unitLinks';
import { loadUnit } from '../../content/unitLoader';
import { derivePilotQuestionKnowledgePointIds } from './pilotQuestionKnowledgePoints';
import { growthGroups } from './growthGroups';
import unitManifest from './pilot-manifest-grade1-term1-english-unit03.json';

declare const process: { cwd(): string };

const groupId = 'grade-1-term-1-english-unit-03';
const unitId = 'grade-1/term-1/english/unit-03';
const supplementalPrefix = 'challenge-supplement-grade-1-term-1-english-unit-03-';
const excludedCourseActivityIds = [
  `${unitId}/basic/task-01/session-01/question-05`,
  `${unitId}/basic/task-01/session-01/question-07`,
  `${unitId}/basic/task-02/session-01/question-05`,
  `${unitId}/basic/task-02/session-01/question-07`,
  `${unitId}/advanced/task-01/session-01/question-01`,
  `${unitId}/advanced/task-01/session-01/question-02`,
  `${unitId}/advanced/task-01/session-01/question-05`,
  `${unitId}/advanced/task-01/session-01/question-06`,
  `${unitId}/advanced/task-01/session-01/question-07`,
  `${unitId}/advanced/task-01/session-01/question-08`,
  `${unitId}/advanced/task-02/session-01/question-01`,
  `${unitId}/advanced/task-02/session-01/question-02`,
  `${unitId}/advanced/task-02/session-01/question-03`,
  `${unitId}/advanced/task-02/session-01/question-05`,
  `${unitId}/advanced/task-02/session-01/question-06`,
  `${unitId}/advanced/task-02/session-01/question-07`,
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

describe('Grade 1 Term 1 English Unit 3 challenge', () => {
  it('maps course vocabulary and simple sentence activities to animal knowledge points', async () => {
    const unit = await loadUnit(unitId);
    const activities = Object.values(unit?.difficultyTracks ?? {}).flatMap((track) =>
      track.tasks.flatMap((task) => task.sessions.flatMap((session) => session.activities)),
    );
    const sentenceActivity = activities.find(({ id }) => id === `${unitId}/high/task-01/session-01/question-08`);
    const vocabularyActivity = activities.find(({ id }) => id === `${unitId}/basic/task-01/session-01/question-01`);

    expect(sentenceActivity).toBeDefined();
    expect(vocabularyActivity).toBeDefined();
    expect(derivePilotQuestionKnowledgePointIds(unitId, sentenceActivity!)).toContain('animal-description-sentences');
    expect(derivePilotQuestionKnowledgePointIds(unitId, vocabularyActivity!)).toContain('animal-word-vocabulary');
  });

  it('does not reveal the correct evaluation in the advanced prompt', async () => {
    const content = await loadPilotChallengeContent();
    const candidates = content.groups.find(({ group }) => group.definition.id === groupId)?.candidates ?? [];
    const advancedTwentySix = candidates.find(({ activityId }) => activityId === 'challenge-supplement-grade-1-term-1-english-unit-03-advanced-26');

    expect(advancedTwentySix?.activity.kind).toBe('choice');
    expect(advancedTwentySix?.activity.prompt).not.toContain('It is a cat.＝它是一只猫');
    expect(advancedTwentySix?.activity.prompt).toContain('It is a cat.＝它是一只狗');
  });

  it('registers a ready 30-candidate-per-difficulty group and its course entry', async () => {
    const challengeManifest = manifest as ChallengeManifest;
    const group = challengeManifest.groups.find(({ definition }) => definition.id === groupId);
    const fragmentGroup = (unitManifest as unknown as ChallengeManifest).groups[0];

    expect(fragmentGroup.definition.tasks.map(({ id }) => id)).toEqual([
      `${groupId}/basic-01`,
      `${groupId}/basic-02`,
      `${groupId}/advanced-01`,
      `${groupId}/advanced-02`,
      `${groupId}/high-01`,
    ]);

    expect(group).toBeDefined();
    if (!group) return;

    expect(group.definition).toMatchObject({
      id: groupId,
      kind: 'unit',
      grade: 1,
      semester: 1,
      subject: 'english',
      sourceUnitIds: [unitId],
      coreKnowledgePointIds: [
        'animal-word-vocabulary',
        'animal-preference-sentences',
        'animal-description-sentences',
      ],
    });
    expect(group.questionIds).toHaveLength(90);
    expect(group.questionIds).not.toEqual(expect.arrayContaining(
      excludedCourseActivityIds.map((activityId) => `challenge-question:${activityId}`),
    ));
    expect(group.definition.mappingEvidence.source).toContain(
      'grade-1-and-3-textbook-inventory.md#固定快照目录映射',
    );
    expect(getPilotUnitChallengeGroupId(unitId)).toBe(groupId);
    expect(growthGroups.find(({ id }) => id === groupId)).toMatchObject({
      id: groupId,
      kind: 'unit',
      grade: 1,
      semester: 1,
      subject: 'english',
      sourceUnitIds: [unitId],
    });
    expect(JSON.stringify(growthGroups.find(({ id }) => id === groupId))).not.toMatch(/questionIds|questionId|prompt|answer/i);

    const content = await loadPilotChallengeContent();
    const loadedGroup = content.groups.find(({ group: candidate }) => candidate.definition.id === groupId);
    expect(loadedGroup?.status).toBe('ready');
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      expect(loadedGroup?.candidates.filter((candidate) => candidate.difficulty === difficulty)).toHaveLength(30);
    }

    const supplemental = (loadedGroup?.candidates ?? []).filter(({ activity }) => activity.id.startsWith(supplementalPrefix));
    expect(supplemental).toHaveLength(64);
    expect(Object.fromEntries(['basic', 'advanced', 'high'].map((difficulty) => [
      difficulty,
      supplemental.filter(({ difficulty: candidateDifficulty }) => candidateDifficulty === difficulty).length,
    ]))).toEqual({ basic: 18, advanced: 26, high: 20 });
    expect(JSON.stringify(supplemental.map(({ activity }) => activity))).not.toMatch(/\bI like (?:dogs|a dog)\b/iu);
    for (const candidate of supplemental) {
      expect(candidate.activity.kind, candidate.activity.id).toBe('choice');
      expect(candidate.activity.kind === 'choice' ? candidate.activity.hint : '', candidate.activity.id)
        .not.toMatch(/\b(?:cat|dog|bird|tiger)\b|猫|狗|鸟|老虎/iu);
    }
    const supplementalAnswerPositions = supplemental.map(({ activity }) => activity.kind === 'choice'
      ? activity.options.findIndex(({ id }) => id === activity.correctOptionId)
      : -1);
    expect([0, 1, 2].map((position) => supplementalAnswerPositions.filter((answerPosition) => answerPosition === position).length))
      .toEqual([21, 21, 22]);

    const ledgerPath = resolve(process.cwd(), `docs/challenges/${groupId}-question-review.tsv`);
    expect(existsSync(ledgerPath)).toBe(true);
    const rows = readTsv(ledgerPath);
    expect(rows.map(({ 题目ID }) => 题目ID)).toHaveLength(group.questionIds.length);
    expect(new Set(rows.map(({ 题目ID }) => 题目ID))).toEqual(new Set(group.questionIds));
    expect(rows.every((row) => row['正确选项'] && row['审核状态']?.includes('作者自审通过'))).toBe(true);
    expect(rows.every(({ 审核状态 }) => 审核状态.includes('未独立教育者复核'))).toBe(true);

    const candidatesByQuestionId = new Map((loadedGroup?.candidates ?? []).map((candidate) => [candidate.questionId, candidate]));
    for (const row of rows) {
      const candidate = candidatesByQuestionId.get(row['题目ID']);
      expect(candidate, row['题目ID']).toBeDefined();
      expect(row['正确选项'], row['题目ID']).toBe(expectedAnswerSummary(candidate!.activity));
      expect(row['知识点']).not.toBe('');
      expect(candidate!.knowledgePointIds.length).toBeGreaterThan(0);
      const rawQuestionId = row['题目ID'].replace(/^challenge-question:/u, '');
      if (rawQuestionId.startsWith(supplementalPrefix)) {
        expect(row['题意与答案复核']).toContain('闯关专用原创题');
      } else {
        expect(rawQuestionId).toMatch(/^grade-1\/term-1\/english\/unit-03\//u);
        expect(row['题意与答案复核']).toContain('docs/curriculum/grade-1-and-3-question-review.tsv');
      }
    }
    const courseRow = readTsv(resolve(process.cwd(), 'docs/curriculum/grade-1-and-3-question-review.tsv'))
      .find((row) => row['课程ID'] === unitId);
    expect(courseRow).toMatchObject({ 题目总数: '48', 已审数量: '48', 状态: '完成' });
  });
});
