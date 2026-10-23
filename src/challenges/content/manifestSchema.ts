import type { ChallengeManifest } from '../domain/types';

const DIFFICULTIES = new Set(['basic', 'advanced', 'high']);
const LIFECYCLES = new Set(['active', 'disabled', 'deprecated']);
const RELEASE_INTENTS = new Set(['released', 'planned', 'suspended']);
const GROUP_KINDS = new Set(['unit', 'semester']);
const STAGES = new Set(['first-half', 'second-half', 'end-term']);

export class ChallengeManifestFormatError extends Error {
  readonly path: string;

  constructor(path: string, expected: string) {
    super(`Invalid challenge manifest at ${path}: expected ${expected}.`);
    this.name = 'ChallengeManifestFormatError';
    this.path = path;
  }
}

function fail(path: string, expected: string): never {
  throw new ChallengeManifestFormatError(path, expected);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function requiredString(value: unknown, path: string): string {
  if (typeof value !== 'string' || value.trim() === '') return fail(path, 'a non-empty string');
  return value;
}

function stringArray(value: unknown, path: string): string[] {
  if (!Array.isArray(value)) return fail(path, 'an array of non-empty strings');
  return value.map((item, index) => requiredString(item, `${path}[${index}]`));
}

function optionalString(record: Record<string, unknown>, key: string, path: string): void {
  if (record[key] !== undefined && typeof record[key] !== 'string') fail(path, 'a string when present');
}

function parseQuestion(value: unknown, path: string): void {
  if (!isRecord(value)) fail(path, 'an object');
  requiredString(value.questionId, `${path}.questionId`);
  requiredString(value.activityId, `${path}.activityId`);
  if (typeof value.difficulty !== 'string' || !DIFFICULTIES.has(value.difficulty)) {
    fail(`${path}.difficulty`, 'basic, advanced, or high');
  }
  stringArray(value.knowledgePointIds, `${path}.knowledgePointIds`);
  if (typeof value.lifecycle !== 'string' || !LIFECYCLES.has(value.lifecycle)) {
    fail(`${path}.lifecycle`, 'active, disabled, or deprecated');
  }
  if (typeof value.approved !== 'boolean') fail(`${path}.approved`, 'a boolean');
  if (typeof value.answerLeakageReviewed !== 'boolean') fail(`${path}.answerLeakageReviewed`, 'a boolean');
  requiredString(value.approvedContentFingerprint, `${path}.approvedContentFingerprint`);
  optionalString(value, 'approvedBy', `${path}.approvedBy`);
  optionalString(value, 'approvedAt', `${path}.approvedAt`);
}

function parseTask(value: unknown, path: string): void {
  if (!isRecord(value)) fail(path, 'an object');
  requiredString(value.id, `${path}.id`);
  if (typeof value.difficulty !== 'string' || !DIFFICULTIES.has(value.difficulty)) {
    fail(`${path}.difficulty`, 'basic, advanced, or high');
  }
  if (!Number.isInteger(value.targetCount) || (value.targetCount as number) <= 0) {
    fail(`${path}.targetCount`, 'a positive integer');
  }
  stringArray(value.requiredKnowledgePointIds, `${path}.requiredKnowledgePointIds`);
}

function parseGroup(value: unknown, path: string): void {
  if (!isRecord(value)) fail(path, 'an object');
  const intent = value.releaseIntent;
  if (typeof intent !== 'string' || !RELEASE_INTENTS.has(intent)) {
    fail(`${path}.releaseIntent`, 'released, planned, or suspended');
  }
  const definition = value.definition;
  if (!isRecord(definition)) fail(`${path}.definition`, 'an object');
  requiredString(definition.id, `${path}.definition.id`);
  if (typeof definition.kind !== 'string' || !GROUP_KINDS.has(definition.kind)) {
    fail(`${path}.definition.kind`, 'unit or semester');
  }
  if (!Number.isInteger(definition.grade) || (definition.grade as number) < 1) {
    fail(`${path}.definition.grade`, 'a positive integer');
  }
  if (definition.semester !== 1 && definition.semester !== 2) {
    fail(`${path}.definition.semester`, '1 or 2');
  }
  requiredString(definition.subject, `${path}.definition.subject`);
  stringArray(definition.sourceUnitIds, `${path}.definition.sourceUnitIds`);
  if (definition.learningTaskUnitIds !== undefined) {
    stringArray(definition.learningTaskUnitIds, `${path}.definition.learningTaskUnitIds`);
  }
  if (definition.stage !== undefined && (typeof definition.stage !== 'string' || !STAGES.has(definition.stage))) {
    fail(`${path}.definition.stage`, 'first-half, second-half, or end-term when present');
  }
  stringArray(definition.coreKnowledgePointIds, `${path}.definition.coreKnowledgePointIds`);

  const evidence = definition.mappingEvidence;
  if (!isRecord(evidence)) fail(`${path}.definition.mappingEvidence`, 'an object');
  requiredString(evidence.source, `${path}.definition.mappingEvidence.source`);
  requiredString(evidence.checkedAt, `${path}.definition.mappingEvidence.checkedAt`);
  requiredString(evidence.notes, `${path}.definition.mappingEvidence.notes`);

  if (!Array.isArray(definition.tasks)) fail(`${path}.definition.tasks`, 'an array of tasks');
  definition.tasks.forEach((task, index) => parseTask(task, `${path}.definition.tasks[${index}]`));
  stringArray(value.questionIds, `${path}.questionIds`);
  optionalString(value, 'unavailableReason', `${path}.unavailableReason`);
  if (intent === 'suspended' && !requiredString(value.unavailableReason, `${path}.unavailableReason`)) {
    fail(`${path}.unavailableReason`, 'a non-empty reason for suspended groups');
  }
}

export function parseChallengeManifest(value: unknown): ChallengeManifest {
  if (!isRecord(value)) fail('$', 'an object');
  requiredString(value.version, 'version');
  if (!Array.isArray(value.questions)) fail('questions', 'an array of questions');
  if (value.questions.length === 0) fail('questions', 'a non-empty array of questions');
  value.questions.forEach((question, index) => parseQuestion(question, `questions[${index}]`));
  if (!Array.isArray(value.groups)) fail('groups', 'a non-empty array of groups');
  if (value.groups.length === 0) fail('groups', 'a non-empty array of groups');
  value.groups.forEach((group, index) => parseGroup(group, `groups[${index}]`));
  return value as unknown as ChallengeManifest;
}
