import { describe, expect, it } from 'vitest';
// @ts-expect-error Node.js is used only to inspect the local review ledger during Vitest.
import { existsSync, readFileSync } from 'node:fs';
// @ts-expect-error Node.js is used only to resolve the local review ledger during Vitest.
import { resolve } from 'node:path';
import type { ChallengeManifest } from '../domain/types';
import type { ActivityDefinition } from '../../content/types';
import manifest from './pilotManifest';
import { loadPilotChallengeContent } from './pilotContent';
import { getPilotUnitChallengeGroupId } from './unitLinks';
import { loadUnit } from '../../content/unitLoader';
import { derivePilotQuestionKnowledgePointIds } from './pilotQuestionKnowledgePoints';
import { growthGroups } from './growthGroups';

declare const process: { cwd(): string };

const groupId = 'grade-1-term-1-english-unit-02';
const unitId = 'grade-1/term-1/english/unit-02';

function readTsv(path: string): Array<Record<string, string>> {
  const lines = readFileSync(path, 'utf8').trim().split(/\r?\n/u) as string[];
  const [headerLine = '', ...dataLines] = lines;
  const headers = headerLine.replace(/^\uFEFF/u, '').split('\t');
  return dataLines.map((line: string) => {
    const values = line.split('\t');
    return Object.fromEntries(headers.map((header: string, index: number) => [header, values[index] ?? '']));
  });
}

function expectedAnswerKey(activity: ActivityDefinition): string {
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
      const categoriesById = new Map(activity.categories.map(({ id, label }) => [id, label]));
      return activity.items.map(({ label, categoryId }) => `${label}→${categoriesById.get(categoryId) ?? ''}`).join('；');
    }
    case 'arithmetic':
      return `${activity.expression}=${activity.correctAnswer}`;
    case 'measurement':
      return `${activity.targetLengthCm} 厘米`;
  }
}

describe('Grade 1 Term 1 English Unit 2 challenge', () => {
  it('maps the sentence-check course activity to the sentence knowledge point', async () => {
    const unit = await loadUnit(unitId);
    const activity = Object.values(unit?.difficultyTracks ?? {}).flatMap((track) =>
      track.tasks.flatMap((task) => task.sessions.flatMap((session) => session.activities)),
    ).find(({ id }) => id === `${unitId}/high/task-01/session-01/question-08`);

    expect(activity).toBeDefined();
    expect(derivePilotQuestionKnowledgePointIds(unitId, activity!)).toContain('face-description-sentences');
  });

  it('does not give away face vocabulary or its translation in supplemental hints', async () => {
    const content = await loadPilotChallengeContent();
    const candidates = content.groups.find(({ group }) => group.definition.id === groupId)?.candidates ?? [];
    const supplemental = candidates.filter(({ activity }) => activity.id.startsWith(
      'challenge-supplement-grade-1-term-1-english-unit-02-',
    ));

    expect(supplemental).toHaveLength(42);
    for (const candidate of supplemental) {
      expect(candidate.activity.kind, candidate.activity.id).toBe('choice');
      expect(candidate.activity.kind === 'choice' ? candidate.activity.hint : '', candidate.activity.id)
        .not.toMatch(/\b(?:eye|ear|nose|mouth)\b|眼睛|耳朵|鼻子|嘴/iu);
    }
  });

  it('registers a ready 30-candidate-per-difficulty group and its course entry', async () => {
    const challengeManifest = manifest as ChallengeManifest;
    const group = challengeManifest.groups.find(({ definition }) => definition.id === groupId);

    expect(group).toBeDefined();
    if (!group) return;

    expect(group.definition).toMatchObject({
      id: groupId,
      kind: 'unit',
      grade: 1,
      semester: 1,
      subject: 'english',
      sourceUnitIds: [unitId],
    });
    expect(group.questionIds).toHaveLength(90);
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

    const supplementalAnswerPositions = (loadedGroup?.candidates ?? [])
      .filter((candidate) => candidate.questionId.includes('challenge-supplement-grade-1-term-1-english-unit-02-'))
      .map((candidate) => {
        const { activity } = candidate;
        return activity.kind === 'choice'
          ? activity.options.findIndex(({ id }) => id === activity.correctOptionId)
          : -1;
      });
    expect(supplementalAnswerPositions).toHaveLength(42);
    expect([0, 1, 2].map((position) => supplementalAnswerPositions.filter((answerPosition) => answerPosition === position).length))
      .toEqual([14, 14, 14]);

    const ledgerPath = resolve(process.cwd(), `docs/challenges/${groupId}-question-review.tsv`);
    expect(existsSync(ledgerPath)).toBe(true);
    const rows = readTsv(ledgerPath);
    expect(rows.map(({ 题目ID }) => 题目ID)).toHaveLength(group.questionIds.length);
    expect(new Set(rows.map(({ 题目ID }) => 题目ID))).toEqual(new Set(group.questionIds));
    expect(rows.every((row) => row['正确选项'] && row['审核状态']?.includes('作者自审通过'))).toBe(true);
    expect(rows.every(({ 审核状态 }) => 审核状态.includes('未独立教育者复核'))).toBe(true);

    const candidatesByQuestionId = new Map((loadedGroup?.candidates ?? []).map((candidate) => [candidate.questionId, candidate]));
    const courseLedgerPath = resolve(process.cwd(), 'docs/curriculum/grade-1-and-3-question-review.tsv');
    const courseRow = readTsv(courseLedgerPath).find((row) => row['课程ID'] === unitId);
    expect(courseRow).toMatchObject({ 题目总数: '48', 已审数量: '48', 状态: '完成' });
    for (const row of rows) {
      const candidate = candidatesByQuestionId.get(row['题目ID']);
      expect(candidate, row['题目ID']).toBeDefined();
      expect(row['正确选项'], row['题目ID']).toBe(expectedAnswerKey(candidate!.activity));
      expect(row['知识点']).not.toBe('');
      const rawQuestionId = row['题目ID'].replace(/^challenge-question:/u, '');
      if (rawQuestionId.startsWith('challenge-supplement-grade-1-term-1-english-unit-02-')) {
        expect(row['题意与答案复核']).toContain('闯关专用原创题');
      } else {
        expect(rawQuestionId).toMatch(/^grade-1\/term-1\/english\/unit-02\//u);
        expect(row['题意与答案复核']).toContain('docs/curriculum/grade-1-and-3-question-review.tsv');
      }
    }
  });
});
