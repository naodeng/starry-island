import type { ActivityDefinition } from '../../content/types';
import type { ChallengeQuestionRecord } from '../domain/types';
import { fingerprintActivity } from './fingerprint';

export interface ExactDuplicateQuestionGroup {
  fingerprint: string;
  representativeQuestionId: string;
  questionIds: string[];
}

export interface SimilarQuestionPair {
  questionIds: [string, string];
  sourceUnitId: string;
  activityKind: ActivityDefinition['kind'];
  reason: string;
}

export interface QuestionUniquenessReport {
  exactDuplicateGroups: ExactDuplicateQuestionGroup[];
  similarQuestionPairs: SimilarQuestionPair[];
  currentFingerprintByQuestionId: Record<string, string>;
}

function compareText(left: string, right: string): number {
  return left < right ? -1 : left > right ? 1 : 0;
}

function normalizePrompt(prompt: string): string {
  return prompt
    .normalize('NFKC')
    .replace(/\s*\d+(?:\.\d+)?\s*/gu, '#')
    .replace(/\p{P}/gu, '')
    .replace(/\s+/gu, ' ')
    .trim();
}

export async function analyzeQuestionUniqueness(
  questions: readonly ChallengeQuestionRecord[],
  activitiesById: ReadonlyMap<string, ActivityDefinition>,
  sourceUnitByActivityId: ReadonlyMap<string, string>,
  subtleCrypto: SubtleCrypto = globalThis.crypto.subtle,
): Promise<QuestionUniquenessReport> {
  const fingerprints = await Promise.all(questions.map(async (question) => {
    const activity = activitiesById.get(question.activityId);
    if (!activity) return undefined;
    return {
      question,
      activity,
      sourceUnitId: sourceUnitByActivityId.get(question.activityId),
      fingerprint: await fingerprintActivity(activity, subtleCrypto),
    };
  }));

  const fingerprintsByQuestionId: Record<string, string> = {};
  const exactGroupsByFingerprint = new Map<string, string[]>();
  for (const result of fingerprints) {
    if (!result) continue;
    fingerprintsByQuestionId[result.question.questionId] = result.fingerprint;
    const questionIds = exactGroupsByFingerprint.get(result.fingerprint) ?? [];
    questionIds.push(result.question.questionId);
    exactGroupsByFingerprint.set(result.fingerprint, questionIds);
  }

  const exactDuplicateGroups = [...exactGroupsByFingerprint.entries()]
    .map(([fingerprint, questionIds]) => {
      const sortedQuestionIds = [...new Set(questionIds)].sort(compareText);
      return {
        fingerprint,
        representativeQuestionId: sortedQuestionIds[0],
        questionIds: sortedQuestionIds,
      };
    })
    .filter((group) => group.questionIds.length > 1)
    .sort((left, right) => compareText(left.representativeQuestionId, right.representativeQuestionId)
      || compareText(left.fingerprint, right.fingerprint));

  const exactFingerprintSet = new Set(exactDuplicateGroups.map(({ fingerprint }) => fingerprint));
  const templateBuckets = new Map<string, Array<{ questionId: string; fingerprint: string; sourceUnitId: string; activityKind: ActivityDefinition['kind'] }>>();
  for (const result of fingerprints) {
    if (!result?.sourceUnitId || !result.activity.prompt.trim()) continue;
    const normalizedPrompt = normalizePrompt(result.activity.prompt);
    if (!normalizedPrompt) continue;
    const key = JSON.stringify([result.sourceUnitId, result.activity.kind, normalizedPrompt]);
    const bucket = templateBuckets.get(key) ?? [];
    bucket.push({
      questionId: result.question.questionId,
      fingerprint: result.fingerprint,
      sourceUnitId: result.sourceUnitId,
      activityKind: result.activity.kind,
    });
    templateBuckets.set(key, bucket);
  }

  const similarQuestionPairs: SimilarQuestionPair[] = [];
  for (const bucket of templateBuckets.values()) {
    const byFingerprint = new Map<string, (typeof bucket)[number]>();
    for (const candidate of [...bucket].sort((left, right) => compareText(left.questionId, right.questionId))) {
      if (!byFingerprint.has(candidate.fingerprint)) byFingerprint.set(candidate.fingerprint, candidate);
    }
    const candidates = [...byFingerprint.values()].sort((left, right) => compareText(left.questionId, right.questionId));
    for (let leftIndex = 0; leftIndex < candidates.length; leftIndex += 1) {
      for (let rightIndex = leftIndex + 1; rightIndex < candidates.length; rightIndex += 1) {
        const left = candidates[leftIndex];
        const right = candidates[rightIndex];
        if (left.fingerprint === right.fingerprint || exactFingerprintSet.has(left.fingerprint) || exactFingerprintSet.has(right.fingerprint)) continue;
        similarQuestionPairs.push({
          questionIds: [left.questionId, right.questionId],
          sourceUnitId: left.sourceUnitId,
          activityKind: left.activityKind,
          reason: '题干经 Unicode NFKC、空白与标点规范化，并将数字替换为占位符后相同；这只是候选提示。',
        });
      }
    }
  }
  similarQuestionPairs.sort((left, right) => compareText(left.questionIds[0], right.questionIds[0])
    || compareText(left.questionIds[1], right.questionIds[1]));

  return {
    exactDuplicateGroups,
    similarQuestionPairs,
    currentFingerprintByQuestionId: Object.fromEntries(Object.entries(fingerprintsByQuestionId).sort(([left], [right]) => compareText(left, right))),
  };
}
