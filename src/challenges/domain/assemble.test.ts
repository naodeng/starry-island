import { describe, expect, it } from 'vitest';
import type { ActivityDefinition, Difficulty } from '../../content/types';
import type { ChallengeQuestionSnapshot, ChallengeTaskDefinition } from './types';
import { assemblePaper, AssemblyError } from './assemble';

const task: ChallengeTaskDefinition = {
  id: 'task-basic-1',
  difficulty: 'basic',
  targetCount: 2,
  requiredKnowledgePointIds: ['length', 'units'],
};

function candidate(
  index: number,
  overrides: Partial<ChallengeQuestionSnapshot> = {},
): ChallengeQuestionSnapshot {
  const activity: ActivityDefinition = {
    id: `activity-${index}`,
    kind: 'arithmetic',
    prompt: `Question ${index}`,
    hint: 'hint',
    explanation: 'explanation',
    expression: `${index} + 1`,
    correctAnswer: index + 1,
  };
  return {
    questionId: `question-${String(index).padStart(2, '0')}`,
    activityId: activity.id,
    difficulty: 'basic',
    knowledgePointIds: index % 2 ? ['length'] : ['units'],
    lifecycle: 'active',
    approved: true,
    answerLeakageReviewed: true,
    approvedContentFingerprint: 'approved-old-content',
    approvedBy: 'test-author',
    approvedAt: '2026-01-01T00:00:00.000Z',
    contentFingerprint: 'current-edited-content',
    activity,
    ...overrides,
  };
}

const candidates = Array.from({ length: 8 }, (_, index) => candidate(index));

describe('assemblePaper', () => {
  it('returns a stable sequence for the same task, candidates, and seed', () => {
    const first = assemblePaper(task, candidates, 'star-seed');
    const second = assemblePaper(task, [...candidates].reverse(), 'star-seed');
    expect(second.map(({ questionId }) => questionId)).toEqual(first.map(({ questionId }) => questionId));
  });

  it('uses the seed to vary the sampled paper while keeping its constraints', () => {
    const first = assemblePaper(task, candidates, 'seed-one');
    const second = assemblePaper(task, candidates, 'seed-two');
    expect(second.map(({ questionId }) => questionId)).not.toEqual(first.map(({ questionId }) => questionId));
    expect(first).toHaveLength(task.targetCount);
    expect(first.every(({ difficulty }) => difficulty === task.difficulty)).toBe(true);
  });

  it('filters inactive, unapproved, unreviewed, unsafe, wrong-difficulty, and duplicate candidates', () => {
    const eligible = candidates.slice(0, 4);
    const rejected = [
      candidate(8, { lifecycle: 'disabled' }),
      candidate(9, { approved: false }),
      candidate(10, { answerLeakageReviewed: false }),
      candidate(11, { difficulty: 'advanced' }),
      candidate(12, { activity: { ...candidate(12).activity, kind: 'measurement', targetLengthCm: 5, objectLabel: 'line', minCm: 1, maxCm: 10 } }),
      { ...eligible[0], questionId: 'duplicate-id' },
      candidate(13, { ...eligible[0] }),
    ];
    expect(() => assemblePaper({ ...task, targetCount: 2 }, [...eligible, ...rejected], 'filter'))
      .not.toThrow();
  });

  it('fails when the unique eligible pool is smaller than twice the target size', () => {
    expect(() => assemblePaper(task, candidates.slice(0, 3), 'small-pool'))
      .toThrowError(AssemblyError);
  });

  it('fails when a required knowledge point has no eligible candidate', () => {
    expect(() => assemblePaper({ ...task, requiredKnowledgePointIds: ['absent'] }, candidates, 'missing-core'))
      .toThrowError(AssemblyError);
  });

  it('uses recent question IDs only as a soft preference', () => {
    const pool = [
      candidate(0, { knowledgePointIds: ['length', 'units'] }),
      candidate(1, { knowledgePointIds: ['length', 'units'] }),
      candidate(2, { knowledgePointIds: ['length', 'units'] }),
      candidate(3, { knowledgePointIds: ['length', 'units'] }),
    ];
    const paper = assemblePaper(task, pool, 'recent', ['question-00', 'question-01']);
    expect(paper.every(({ questionId }) => !['question-00', 'question-01'].includes(questionId))).toBe(true);
  });

  it('allows fewer questions than knowledge points when each question covers several points', () => {
    const knowledgePointIds = ['length', 'units', 'estimation'];
    const multiTagPool = Array.from({ length: 4 }, (_, index) => candidate(index, { knowledgePointIds }));

    const paper = assemblePaper({ ...task, targetCount: 2, requiredKnowledgePointIds: knowledgePointIds }, multiTagPool, 'multi-tag');

    expect(paper).toHaveLength(2);
    expect(new Set(paper.flatMap(({ knowledgePointIds: ids }) => ids))).toEqual(new Set(knowledgePointIds));
  });

  it('keeps approved candidates eligible when their content fingerprint changes', () => {
    const changed = candidate(0, { approvedContentFingerprint: 'before-edit', contentFingerprint: 'after-edit' });
    const paper = assemblePaper(task, [changed, ...candidates.slice(1)], 'fingerprint');
    expect(paper).toContainEqual(changed);
  });

  it('rejects an invalid target size and unsupported difficulty', () => {
    expect(() => assemblePaper({ ...task, targetCount: 0 }, candidates, 'zero')).toThrow(RangeError);
    expect(() => assemblePaper({ ...task, difficulty: 'impossible' as Difficulty }, candidates, 'bad-difficulty')).toThrow(RangeError);
  });
});
