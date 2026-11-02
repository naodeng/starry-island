import { describe, expect, it } from 'vitest';
// @ts-expect-error Node.js is used only to inspect the local question-review ledger during Vitest.
import { existsSync, readFileSync } from 'node:fs';
// @ts-expect-error Node.js is used only to resolve the local question-review ledger during Vitest.
import { resolve } from 'node:path';
import type { ActivityDefinition } from '../../content/types';
import { derivePilotQuestionKnowledgePointIds } from './pilotQuestionKnowledgePoints';
import { loadPilotChallengeContent } from './pilotContent';
import { loadUnit } from '../../content/unitLoader';
import { fingerprintActivity } from './fingerprint';
import { analyzeQuestionUniqueness } from './questionUniqueness';
import { loadChallengeQualityInputs } from './qualityInputs';
import { growthGroups } from './growthGroups';
import manifest from './pilotManifest';

declare const process: { cwd(): string };

function answerKey(activity: ActivityDefinition): string {
  switch (activity.kind) {
    case 'choice':
      return activity.options.find(({ id }) => id === activity.correctOptionId)?.label ?? '';
    case 'arithmetic':
      return `${activity.expression}=${activity.correctAnswer}`;
    case 'match':
      return activity.pairs.map(({ left, right }) => `${left}→${right}`).join('；');
    case 'order': {
      const labels = new Map(activity.items.map(({ id, label }) => [id, label]));
      return activity.correctOrder.map((id) => labels.get(id) ?? '').join(' → ');
    }
    case 'categorize': {
      const categories = new Map(activity.categories.map(({ id, label }) => [id, label]));
      return activity.items.map(({ label, categoryId }) => `${label}→${categories.get(categoryId) ?? ''}`).join('；');
    }
    case 'measurement':
      return `${activity.targetLengthCm} 厘米`;
  }
}

function readLedger(path: string): Array<Record<string, string>> {
  const [headerLine = '', ...lines] = readFileSync(path, 'utf8').trim().split(/\r?\n/u);
  const headers = headerLine.replace(/^\uFEFF/u, '').split('\t');
  return lines.map((line: string) => Object.fromEntries(
    line.split('\t').map((value: string, index: number) => [headers[index] ?? `column-${index}`, value]),
  ));
}

export function registerGrade2Term1MathUnitContract(unitNumber: number): void {
  const unitId = `grade-2/term-1/math/unit-${String(unitNumber).padStart(2, '0')}`;
  const groupId = `grade-2-term-1-math-unit-${String(unitNumber).padStart(2, '0')}`;

  describe(`二年级上册数学 U${unitNumber} 闯关`, () => {
    it('保留新版课程的48道学习活动，并提供三档各30道挑战候选题', async () => {
      const [content, unit] = await Promise.all([loadPilotChallengeContent(), loadUnit(unitId)]);
      const loaded = content.groups.find(({ group }) => group.definition.id === groupId);
      const group = manifest.groups.find(({ definition }) => definition.id === groupId);

      expect(loaded?.status, JSON.stringify(loaded?.issues, null, 2)).toBe('ready');
      expect(group?.questionIds).toHaveLength(90);
      expect(new Set(group?.questionIds).size).toBe(90);
      expect(loaded?.candidates).toHaveLength(90);
      expect(Object.values(unit!.difficultyTracks).flatMap(({ tasks }) => tasks)
        .flatMap(({ sessions }) => sessions.flatMap(({ activities }) => activities))).toHaveLength(48);
      for (const difficulty of ['basic', 'advanced', 'high'] as const) {
        expect(loaded?.candidates.filter((candidate) => candidate.difficulty === difficulty)).toHaveLength(30);
      }
    });

    it('逐题核对候选题答案、知识点、内容指纹和AI审校台账', async () => {
      const [content, inputs] = await Promise.all([loadPilotChallengeContent(), loadChallengeQualityInputs()]);
      const group = manifest.groups.find(({ definition }) => definition.id === groupId);
      const loaded = content.groups.find(({ group: candidate }) => candidate.definition.id === groupId);
      const candidates = loaded?.candidates ?? [];
      const candidateById = new Map(candidates.map((candidate) => [candidate.questionId, candidate]));
      const ledgerPath = resolve(process.cwd(), `docs/challenges/${groupId}-question-review.tsv`);

      expect(existsSync(ledgerPath)).toBe(true);
      if (!existsSync(ledgerPath)) return;
      const rows = readLedger(ledgerPath);
      expect(rows).toHaveLength(90);
      expect(new Set(rows.map(({ 题目ID }) => 题目ID))).toEqual(new Set(group?.questionIds));

      for (const row of rows) {
        const candidate = candidateById.get(row['题目ID'] ?? '');
        expect(candidate, row['题目ID']).toBeDefined();
        expect(row['正确答案/键'], row['题目ID']).toBe(answerKey(candidate!.activity));
        expect(row['知识点'], row['题目ID']).toBe(candidate!.knowledgePointIds.join('；'));
        expect(derivePilotQuestionKnowledgePointIds(unitId, candidate!.activity), row['题目ID'])
          .toEqual(candidate!.knowledgePointIds);
        expect(candidate!.approved, row['题目ID']).toBe(true);
        expect(candidate!.answerLeakageReviewed, row['题目ID']).toBe(true);
        expect(row['审核状态'], row['题目ID']).toContain('AI 主审已复核');
        expect(row['审核状态'], row['题目ID']).toContain('独立教育者复核数 0');
      }

      const fingerprints = await Promise.all(candidates.map(({ activity }) => fingerprintActivity(activity)));
      expect(new Set(fingerprints).size).toBe(90);
      candidates.forEach((candidate, index) => {
        expect(candidate.approvedContentFingerprint, candidate.questionId).toBe(fingerprints[index]);
      });

      const questionIds = new Set(group?.questionIds ?? []);
      const questions = inputs.manifest.questions.filter(({ questionId }) => questionIds.has(questionId));
      const uniqueness = await analyzeQuestionUniqueness(questions, inputs.activitiesById, inputs.sourceUnitByActivityId);
      expect(uniqueness.exactDuplicateGroups).toEqual([]);
    });
  });
}

export function registerRetiredGrade2Term1MathUnitContract(unitNumber: number): void {
  const unitId = `grade-2/term-1/math/unit-${String(unitNumber).padStart(2, '0')}`;
  const groupId = `grade-2-term-1-math-unit-${String(unitNumber).padStart(2, '0')}`;

  describe(`二年级上册旧版数学 U${unitNumber} 下线`, () => {
    it('不再注册旧版课程、单元挑战组或题目', async () => {
      expect(await loadUnit(unitId)).toBeUndefined();
      expect(growthGroups.some(({ id }) => id === groupId)).toBe(false);
      expect(manifest.groups.some(({ definition }) => definition.id === groupId)).toBe(false);
      expect(manifest.questions.some(({ activityId }) => activityId.startsWith(`${unitId}/`))).toBe(false);
    });
  });
}
