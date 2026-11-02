import type { ChallengeManifest } from '../domain/types';

export interface ChallengeQuestionImpact {
  questionId: string;
  status: 'mapped' | 'unmapped';
  difficulty?: ChallengeManifest['questions'][number]['difficulty'];
  reason?: string;
  groups: Array<{
    groupId: string;
    releaseIntent: ChallengeManifest['groups'][number]['releaseIntent'];
    taskIds: string[];
  }>;
}

export interface ChallengeImpactReport {
  manifestVersion: string;
  requiresFullQualityGate: boolean;
  impacts: ChallengeQuestionImpact[];
}

function compareText(left: string, right: string): number {
  return left < right ? -1 : left > right ? 1 : 0;
}

export function analyzeQuestionImpacts(manifest: ChallengeManifest, questionIds: readonly string[]): ChallengeImpactReport {
  const questionsById = new Map(manifest.questions.map((question) => [question.questionId, question]));
  const uniqueQuestionIds = [...new Set(questionIds)];
  const impacts = uniqueQuestionIds.map((questionId): ChallengeQuestionImpact => {
    const question = questionsById.get(questionId);
    if (!question) {
      return {
        questionId,
        status: 'unmapped',
        reason: '题目 ID 不在当前清单中。',
        groups: [],
      };
    }

    const groups = manifest.groups
      .filter(({ questionIds: groupQuestionIds }) => groupQuestionIds.includes(questionId))
      .map(({ definition, questionIds: _groupQuestionIds, releaseIntent }) => ({
        groupId: definition.id,
        releaseIntent,
        taskIds: definition.tasks
          .filter(({ difficulty }) => difficulty === question.difficulty)
          .map(({ id }) => id),
      }))
      .filter(({ taskIds }) => taskIds.length > 0)
      .sort((left, right) => compareText(left.groupId, right.groupId));

    if (groups.length === 0) {
      return {
        questionId,
        status: 'unmapped',
        difficulty: question.difficulty,
        reason: manifest.groups.some(({ questionIds: groupQuestionIds }) => groupQuestionIds.includes(questionId))
          ? '题目当前未映射到同难度挑战任务。'
          : '题目未被任何挑战组引用。',
        groups: [],
      };
    }

    return {
      questionId,
      status: 'mapped',
      difficulty: question.difficulty,
      groups,
    };
  });

  return {
    manifestVersion: manifest.version,
    requiresFullQualityGate: impacts.some(({ status }) => status === 'unmapped'),
    impacts,
  };
}
