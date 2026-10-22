import type { ActivityDefinition, Difficulty, SubjectId } from '../../content/types';

export type ChallengeAnswer = string | number | string[] | Record<string, string>;

export interface ChallengeQuestionRecord {
  questionId: string;
  activityId: string;
  difficulty: Difficulty;
  knowledgePointIds: string[];
  lifecycle: 'active' | 'disabled' | 'deprecated';
  approved: boolean;
  answerLeakageReviewed: boolean;
  approvedContentFingerprint: string;
  approvedBy?: string;
  approvedAt?: string;
}

export interface ChallengeQuestionSnapshot extends ChallengeQuestionRecord {
  activity: ActivityDefinition;
  contentFingerprint: string;
}

export interface ChallengeTaskDefinition {
  id: string;
  difficulty: Difficulty;
  targetCount: number;
  requiredKnowledgePointIds: string[];
}

export interface ChallengeGroupDefinition {
  id: string;
  kind: 'unit' | 'semester';
  grade: number;
  semester: 1 | 2;
  subject: SubjectId;
  sourceUnitIds: string[];
  stage?: 'first-half' | 'second-half' | 'end-term';
  coreKnowledgePointIds: string[];
  mappingEvidence: { source: string; checkedAt: string; notes: string };
  tasks: [
    ChallengeTaskDefinition,
    ChallengeTaskDefinition,
    ChallengeTaskDefinition,
    ChallengeTaskDefinition,
    ChallengeTaskDefinition,
  ];
}

export interface ChallengeGroupManifest {
  definition: ChallengeGroupDefinition;
  questionIds: string[];
  releaseIntent: 'released' | 'planned' | 'suspended';
  unavailableReason?: string;
}

export interface ChallengeManifest {
  version: string;
  questions: ChallengeQuestionRecord[];
  groups: ChallengeGroupManifest[];
}

export interface ContentFingerprintChange {
  questionId: string;
  approvedContentFingerprint: string;
  currentContentFingerprint: string;
}

export type ChallengeReleaseStatus = 'ready' | 'planned' | 'unavailable';

export interface ValidationIssue {
  code: string;
  path: string;
  message: string;
  groupId?: string;
}

export interface PilotManifestValidationReport {
  errors: ValidationIssue[];
  contentChanges: ContentFingerprintChange[];
  groupStatusById: Record<string, ChallengeReleaseStatus>;
}

export interface ChallengeAttempt {
  attemptId: string;
  taskId: string;
  difficulty: Difficulty;
  status: 'in-progress' | 'completed';
  snapshotSchemaVersion: number;
  questions: ChallengeQuestionSnapshot[];
  assemblySeed: string;
  contentManifestVersion: string;
  answers: Record<string, ChallengeAnswer>;
  currentIndex: number;
  startedAt: string;
  elapsedMs: number;
  revision: number;
}

export interface ChallengeResult {
  correctCount: number;
  totalCount: number;
  scorePercent: number;
  passed: boolean;
  stars: 0 | 1 | 2 | 3;
  elapsedMs: number;
}

export interface TaskProgress {
  taskId: string;
  bestCorrect: number;
  bestTotal: number;
  latestCorrect: number;
  latestTotal: number;
  completedCount: number;
  everPassed: boolean;
  updatedAt: string;
  revision: number;
}

export interface WrongQuestionRecord {
  questionId: string;
  question: ChallengeQuestionSnapshot;
  wrongCount: number;
  lastWrongAt: string;
  correctAttemptStreak: 0 | 1 | 2;
  lastCorrectAt?: string;
  masteredAt?: string;
}

export interface CompletionUpdate {
  completedAttempt: ChallengeAttempt;
  result: ChallengeResult;
  progress: TaskProgress;
}
