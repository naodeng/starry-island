import { describe, expect, it } from 'vitest';
import type {
  ChallengeGroupManifest,
  ChallengeManifest,
  ChallengeQuestionRecord,
  ChallengeTaskDefinition,
} from '../domain/types';
import { analyzeQuestionImpacts } from './impactAnalysis';

function question(questionId: string, difficulty: ChallengeQuestionRecord['difficulty'] = 'basic'): ChallengeQuestionRecord {
  return {
    questionId,
    activityId: `activity-${questionId}`,
    difficulty,
    knowledgePointIds: ['knowledge-point'],
    lifecycle: 'active',
    approved: true,
    answerLeakageReviewed: true,
    approvedContentFingerprint: 'fingerprint',
  };
}

function task(id: string, difficulty: ChallengeTaskDefinition['difficulty']): ChallengeTaskDefinition {
  return { id, difficulty, targetCount: 1, requiredKnowledgePointIds: ['knowledge-point'] };
}

function group(
  id: string,
  questionIds: string[],
  tasks: ChallengeTaskDefinition[],
  releaseIntent: ChallengeGroupManifest['releaseIntent'] = 'released',
): ChallengeGroupManifest {
  return {
    definition: {
      id,
      kind: 'unit',
      grade: 2,
      semester: 1,
      subject: 'math',
      sourceUnitIds: ['grade-2/term-1/math/unit-01'],
      coreKnowledgePointIds: ['knowledge-point'],
      mappingEvidence: { source: 'fixture', checkedAt: '2026-10-23', notes: 'fixture' },
      tasks: tasks as ChallengeGroupManifest['definition']['tasks'],
    },
    questionIds,
    releaseIntent,
    ...(releaseIntent === 'suspended' ? { unavailableReason: 'fixture' } : {}),
  };
}

function manifest(groups: ChallengeGroupManifest[], questions: ChallengeQuestionRecord[]): ChallengeManifest {
  return { version: 'fixture-v1', questions, groups };
}

describe('analyzeQuestionImpacts', () => {
  it('lists every same-difficulty task in groups that reference a changed question', () => {
    const input = manifest([
      group('group-b', ['question-basic', 'question-high'], [
        task('basic-01', 'basic'),
        task('basic-02', 'basic'),
        task('advanced-01', 'advanced'),
        task('high-01', 'high'),
        task('advanced-02', 'advanced'),
      ]),
      group('group-a', ['question-basic'], [
        task('basic-03', 'basic'),
        task('advanced-03', 'advanced'),
        task('high-02', 'high'),
        task('advanced-04', 'advanced'),
        task('high-03', 'high'),
      ], 'planned'),
    ], [question('question-basic'), question('question-high', 'high')]);

    const report = analyzeQuestionImpacts(input, ['question-basic']);

    expect(report).toEqual({
      manifestVersion: 'fixture-v1',
      requiresFullQualityGate: false,
      impacts: [{
        questionId: 'question-basic',
        status: 'mapped',
        difficulty: 'basic',
        groups: [
          { groupId: 'group-a', releaseIntent: 'planned', taskIds: ['basic-03'] },
          { groupId: 'group-b', releaseIntent: 'released', taskIds: ['basic-01', 'basic-02'] },
        ],
      }],
    });
  });

  it('deduplicates input IDs and requires the full quality gate for IDs that cannot be mapped', () => {
    const input = manifest([
      group('group-a', ['question-basic'], [
        task('basic-01', 'basic'),
        task('basic-02', 'basic'),
        task('advanced-01', 'advanced'),
        task('high-01', 'high'),
        task('high-02', 'high'),
      ]),
    ], [question('question-basic'), question('question-unreferenced')]);

    const report = analyzeQuestionImpacts(input, ['question-basic', 'question-removed', 'question-basic', 'question-unreferenced']);

    expect(report.impacts.map(({ questionId, status, reason }) => ({ questionId, status, reason }))).toEqual([
      { questionId: 'question-basic', status: 'mapped', reason: undefined },
      { questionId: 'question-removed', status: 'unmapped', reason: '题目 ID 不在当前清单中。' },
      { questionId: 'question-unreferenced', status: 'unmapped', reason: '题目未被任何挑战组引用。' },
    ]);
    expect(report.requiresFullQualityGate).toBe(true);
  });
});
