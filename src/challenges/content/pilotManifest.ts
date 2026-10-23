import type { ChallengeManifest } from '../domain/types';
import coreManifest from './pilot-manifest.json';
import grade1MathUnit05Manifest from './pilot-manifest-grade1-math-unit05.json';
import grade1MathUnit06Manifest from './pilot-manifest-grade1-math-unit06.json';
import grade1MathUnit07Manifest from './pilot-manifest-grade1-math-unit07.json';
import grade1MathUnit08Manifest from './pilot-manifest-grade1-math-unit08.json';
import grade1MathUnit09Manifest from './pilot-manifest-grade1-math-unit09.json';

export function mergeChallengeManifestFragments(fragments: readonly ChallengeManifest[]): ChallengeManifest {
  if (fragments.length === 0) throw new Error('At least one challenge manifest fragment is required.');

  const version = fragments[0].version;
  const questions = fragments.flatMap(({ questions: fragmentQuestions }) => fragmentQuestions);
  const groups = fragments.flatMap(({ groups: fragmentGroups }) => fragmentGroups);
  if (fragments.some((fragment) => fragment.version !== version)) {
    throw new Error('Challenge manifest fragments must use the same version.');
  }

  const questionIds = questions.map(({ questionId }) => questionId);
  if (new Set(questionIds).size !== questionIds.length) {
    throw new Error('Challenge manifest fragments contain duplicate question IDs.');
  }
  const groupIds = groups.map(({ definition }) => definition.id);
  if (new Set(groupIds).size !== groupIds.length) {
    throw new Error('Challenge manifest fragments contain duplicate group IDs.');
  }

  return { version, questions, groups };
}

const pilotManifest = mergeChallengeManifestFragments([
  coreManifest as ChallengeManifest,
  grade1MathUnit05Manifest as ChallengeManifest,
  grade1MathUnit06Manifest as ChallengeManifest,
  grade1MathUnit07Manifest as ChallengeManifest,
  grade1MathUnit08Manifest as ChallengeManifest,
  grade1MathUnit09Manifest as ChallengeManifest,
]);

export default pilotManifest;
