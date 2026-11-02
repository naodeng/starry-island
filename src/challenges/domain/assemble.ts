import type { ActivityDefinition, Difficulty } from '../../content/types';
import type { ChallengeQuestionSnapshot, ChallengeTaskDefinition } from './types';

const SAFE_ACTIVITY_KINDS = new Set(['choice', 'match', 'order', 'categorize', 'arithmetic']);

export class AssemblyError extends Error {
  constructor(
    message: string,
    readonly code: 'insufficient-candidates' | 'missing-knowledge-point' | 'uncoverable-task',
  ) {
    super(message);
    this.name = 'AssemblyError';
  }
}

function isEligible(candidate: ChallengeQuestionSnapshot, difficulty: Difficulty): boolean {
  const activity: ActivityDefinition = candidate.activity;
  return candidate.lifecycle === 'active'
    && candidate.approved
    && candidate.answerLeakageReviewed
    && candidate.difficulty === difficulty
    && candidate.activityId === activity.id
    && SAFE_ACTIVITY_KINDS.has(activity.kind);
}

function seedNumber(seed: string): number {
  let hash = 2166136261;
  for (let index = 0; index < seed.length; index += 1) {
    hash ^= seed.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function seededRandom(seed: string): () => number {
  let state = seedNumber(seed);
  return () => {
    let value = state += 0x6d2b79f5;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle<T>(items: readonly T[], random: () => number): T[] {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
}

function shuffleChoiceOptions(question: ChallengeQuestionSnapshot, seed: string): ChallengeQuestionSnapshot {
  if (question.activity.kind !== 'choice') return question;
  return {
    ...question,
    activity: {
      ...question.activity,
      options: shuffle(question.activity.options, seededRandom(`${seed}:${question.questionId}:options`)),
    },
  };
}

function uniqueEligibleCandidates(
  candidates: readonly ChallengeQuestionSnapshot[],
  difficulty: Difficulty,
): ChallengeQuestionSnapshot[] {
  const seenQuestionIds = new Set<string>();
  const seenActivityIds = new Set<string>();
  return [...candidates]
    .filter((candidate) => isEligible(candidate, difficulty))
    .sort((left, right) => left.questionId.localeCompare(right.questionId))
    .filter((candidate) => {
      if (seenQuestionIds.has(candidate.questionId) || seenActivityIds.has(candidate.activityId)) return false;
      seenQuestionIds.add(candidate.questionId);
      seenActivityIds.add(candidate.activityId);
      return true;
    });
}

function findCoverageSet(
  orderedCandidates: readonly ChallengeQuestionSnapshot[],
  requiredKnowledgePointIds: readonly string[],
  targetCount: number,
): ChallengeQuestionSnapshot[] | null {
  const required = new Set(requiredKnowledgePointIds);

  function search(
    selected: ChallengeQuestionSnapshot[],
    covered: Set<string>,
  ): ChallengeQuestionSnapshot[] | null {
    if ([...required].every((knowledgePointId) => covered.has(knowledgePointId))) return selected;
    if (selected.length >= targetCount) return null;

    const uncovered = [...required].filter((knowledgePointId) => !covered.has(knowledgePointId));
    let pivot = uncovered[0];
    let pivotCandidates: ChallengeQuestionSnapshot[] = [];
    for (const knowledgePointId of uncovered) {
      const options = orderedCandidates.filter((candidate) => !selected.includes(candidate)
        && candidate.knowledgePointIds.includes(knowledgePointId)
        && candidate.knowledgePointIds.some((id) => !covered.has(id)));
      if (options.length < pivotCandidates.length || pivotCandidates.length === 0) {
        pivot = knowledgePointId;
        pivotCandidates = options;
      }
    }
    if (!pivot || pivotCandidates.length === 0) return null;

    for (const candidate of pivotCandidates) {
      const nextCovered = new Set(covered);
      for (const knowledgePointId of candidate.knowledgePointIds) {
        if (required.has(knowledgePointId)) nextCovered.add(knowledgePointId);
      }
      const result = search([...selected, candidate], nextCovered);
      if (result) return result;
    }
    return null;
  }

  return search([], new Set());
}

export function assemblePaper(
  task: ChallengeTaskDefinition,
  candidates: readonly ChallengeQuestionSnapshot[],
  seed: string,
  recentQuestionIds: readonly string[] = [],
): ChallengeQuestionSnapshot[] {
  if (!Number.isInteger(task.targetCount) || task.targetCount <= 0) {
    throw new RangeError('targetCount must be a positive integer.');
  }
  if (!['basic', 'advanced', 'high'].includes(task.difficulty)) {
    throw new RangeError(`Unsupported difficulty: ${task.difficulty}`);
  }
  if (task.requiredKnowledgePointIds.length === 0 || new Set(task.requiredKnowledgePointIds).size !== task.requiredKnowledgePointIds.length) {
    throw new RangeError('requiredKnowledgePointIds must be non-empty and unique.');
  }
  const eligible = uniqueEligibleCandidates(candidates, task.difficulty);
  if (eligible.length < task.targetCount * 2) {
    throw new AssemblyError(
      `The eligible pool has ${eligible.length} unique candidates; requires at least ${task.targetCount * 2}.`,
      'insufficient-candidates',
    );
  }

  const availableKnowledgePoints = new Set(eligible.flatMap(({ knowledgePointIds }) => knowledgePointIds));
  const missingKnowledgePoint = task.requiredKnowledgePointIds.find((id) => !availableKnowledgePoints.has(id));
  if (missingKnowledgePoint) {
    throw new AssemblyError(`No eligible candidate covers required knowledge point ${missingKnowledgePoint}.`, 'missing-knowledge-point');
  }

  const randomized = shuffle(eligible, seededRandom(seed));
  const recentIds = new Set(recentQuestionIds);
  const preferred = randomized.filter(({ questionId }) => !recentIds.has(questionId));
  const recent = randomized.filter(({ questionId }) => recentIds.has(questionId));
  const selected = findCoverageSet([...preferred, ...recent], task.requiredKnowledgePointIds, task.targetCount);
  if (!selected) {
    throw new AssemblyError('No paper of the requested size can cover every required knowledge point.', 'uncoverable-task');
  }

  const selectedIds = new Set(selected.map(({ questionId }) => questionId));
  const paper = [...selected];
  for (const candidate of [...preferred, ...recent]) {
    if (paper.length === task.targetCount) break;
    if (!selectedIds.has(candidate.questionId)) {
      selectedIds.add(candidate.questionId);
      paper.push(candidate);
    }
  }
  return paper.map((question) => shuffleChoiceOptions(question, seed));
}
