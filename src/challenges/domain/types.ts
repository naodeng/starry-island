import type { ActivityDefinition, CurriculumUnit, Difficulty, SubjectId } from '../../content/types';

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
  learningTaskUnitIds?: string[];
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

export type ValidationIssueClassification = 'global-blocking' | 'released-group-blocking' | 'informational';

export interface ValidationIssue {
  code: string;
  path: string;
  message: string;
  classification: ValidationIssueClassification;
  groupId?: string;
}

export interface ChallengeManifestValidationReport {
  errors: ValidationIssue[];
  globalIssues: ValidationIssue[];
  groupIssuesById: Record<string, ValidationIssue[]>;
  informationalIssues: ValidationIssue[];
  contentChanges: ContentFingerprintChange[];
  groupStatusById: Record<string, ChallengeReleaseStatus>;
  questionUniqueness: QuestionUniquenessReport;
}

export type PilotManifestValidationReport = ChallengeManifestValidationReport;

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

export interface ChallengeQualityInputs {
  manifest: ChallengeManifest;
  activitiesById: ReadonlyMap<string, ActivityDefinition>;
  sourceUnitByActivityId: ReadonlyMap<string, string>;
  unitsById: ReadonlyMap<string, CurriculumUnit>;
}

export interface ChallengeDifficultyQualityStats {
  targetCount: number;
  minimumRequiredCount: number;
  effectiveUniqueCount: number;
  coveredKnowledgePointIds: string[];
  missingKnowledgePointIds: string[];
}

export interface ChallengeSimulationFailure {
  seed: string;
  code: string;
  message: string;
}

export interface ChallengeSimulationSummary {
  sampleCount: number;
  successCount: number;
  failureCount: number;
  failures: ChallengeSimulationFailure[];
}

export interface ChallengeQualityTaskReport {
  taskId: string;
  difficulty: Difficulty;
  targetCount: number;
  requiredKnowledgePointIds: string[];
  simulation: ChallengeSimulationSummary;
}

export interface ChallengeQualityFingerprintChange extends ContentFingerprintChange {
  groupIds: string[];
  taskIds: string[];
}

export interface ChallengeQualityGroupReport {
  groupId: string;
  kind: ChallengeGroupDefinition['kind'];
  releaseIntent: ChallengeGroupManifest['releaseIntent'];
  status: ChallengeReleaseStatus;
  blockingIssues: ValidationIssue[];
  warnings: ValidationIssue[];
  difficultyStats: Record<Difficulty, ChallengeDifficultyQualityStats>;
  tasks: ChallengeQualityTaskReport[];
  simulation: ChallengeSimulationSummary;
}

export interface ChallengeQualityReport {
  reportSchemaVersion: 1;
  manifestVersion: string;
  overall: {
    passed: boolean;
    blockingIssueCount: number;
    warningCount: number;
    releasedGroupCount: number;
    readyReleasedGroupCount: number;
  };
  errors: ValidationIssue[];
  warnings: ValidationIssue[];
  groups: ChallengeQualityGroupReport[];
  contentChanges: ChallengeQualityFingerprintChange[];
  exactDuplicateGroups: ExactDuplicateQuestionGroup[];
  similarQuestionPairs: SimilarQuestionPair[];
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
