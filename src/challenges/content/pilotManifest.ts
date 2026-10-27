import type { ChallengeManifest } from '../domain/types';
import coreManifest from './pilot-manifest.json';
import grade1MathUnit05Manifest from './pilot-manifest-grade1-math-unit05.json';
import grade1MathUnit06Manifest from './pilot-manifest-grade1-math-unit06.json';
import grade1MathUnit07Manifest from './pilot-manifest-grade1-math-unit07.json';
import grade1MathUnit08Manifest from './pilot-manifest-grade1-math-unit08.json';
import grade1MathUnit09Manifest from './pilot-manifest-grade1-math-unit09.json';
import grade1Term1MathManifest from './pilot-manifest-grade1-term1-math.json';
import grade1Term1EnglishManifest from './pilot-manifest-grade1-term1-english.json';
import grade1Term1EnglishUnit02Manifest from './pilot-manifest-grade1-term1-english-unit02.json';
import grade1Term1EnglishUnit03Manifest from './pilot-manifest-grade1-term1-english-unit03.json';
import grade1Term1EnglishUnit04Manifest from './pilot-manifest-grade1-term1-english-unit04.json';
import grade1Term1EnglishUnit05Manifest from './pilot-manifest-grade1-term1-english-unit05.json';
import grade1Term1EnglishUnit06Manifest from './pilot-manifest-grade1-term1-english-unit06.json';
import grade1Term1SemesterManifest from './pilot-manifest-grade1-term1-semester.json';
import grade1Term2MathManifest from './pilot-manifest-grade1-term2-math.json';
import grade1Term2EnglishUnit01Manifest from './pilot-manifest-grade1-term2-english-unit01.json';
import grade1Term2EnglishUnit02Manifest from './pilot-manifest-grade1-term2-english-unit02.json';
import grade1Term2EnglishUnit03Manifest from './pilot-manifest-grade1-term2-english-unit03.json';
import grade1Term2EnglishUnit04Manifest from './pilot-manifest-grade1-term2-english-unit04.json';
import grade1Term2EnglishUnit05Manifest from './pilot-manifest-grade1-term2-english-unit05.json';
import grade1Term2EnglishUnit06Manifest from './pilot-manifest-grade1-term2-english-unit06.json';
import grade1Term2SemesterManifest from './pilot-manifest-grade1-term2-semester.json';
import grade2Term1ChineseUnit01Manifest from './pilot-manifest-grade2-term1-chinese-unit01.json';
import grade2Term1ChineseUnit02Manifest from './pilot-manifest-grade2-term1-chinese-unit02.json';
import grade2Term1ChineseUnit03Manifest from './pilot-manifest-grade2-term1-chinese-unit03.json';
import grade2Term1ChineseUnit04Manifest from './pilot-manifest-grade2-term1-chinese-unit04.json';
import grade2Term1ChineseUnit05Manifest from './pilot-manifest-grade2-term1-chinese-unit05.json';
import grade2Term1ChineseUnit06Manifest from './pilot-manifest-grade2-term1-chinese-unit06.json';
import grade2Term1ChineseUnit07Manifest from './pilot-manifest-grade2-term1-chinese-unit07.json';
import grade2Term1ChineseUnit08Manifest from './pilot-manifest-grade2-term1-chinese-unit08.json';
import grade2Term1MathUnit01Manifest from './pilot-manifest-grade2-term1-math-unit01.json';
import grade2Term1MathUnit03Manifest from './pilot-manifest-grade2-term1-math-unit03.json';
import grade2Term1MathUnit04Manifest from './pilot-manifest-grade2-term1-math-unit04.json';
import grade2Term1MathUnit05Manifest from './pilot-manifest-grade2-term1-math-unit05.json';
import grade2Term1MathUnit06Manifest from './pilot-manifest-grade2-term1-math-unit06.json';
import grade2Term1MathUnit07Manifest from './pilot-manifest-grade2-term1-math-unit07.json';
import grade2Term1MathUnit08Manifest from './pilot-manifest-grade2-term1-math-unit08.json';
import grade2Term1MathUnit09Manifest from './pilot-manifest-grade2-term1-math-unit09.json';
import grade2Term1EnglishUnit01Manifest from './pilot-manifest-grade2-term1-english-unit01.json';
import grade2Term1EnglishUnit02Manifest from './pilot-manifest-grade2-term1-english-unit02.json';
import grade2Term1EnglishUnit03Manifest from './pilot-manifest-grade2-term1-english-unit03.json';

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
  grade1Term1MathManifest as unknown as ChallengeManifest,
  grade1Term1EnglishManifest as unknown as ChallengeManifest,
  grade1Term1EnglishUnit02Manifest as unknown as ChallengeManifest,
  grade1Term1EnglishUnit03Manifest as unknown as ChallengeManifest,
  grade1Term1EnglishUnit04Manifest as unknown as ChallengeManifest,
  grade1Term1EnglishUnit05Manifest as unknown as ChallengeManifest,
  grade1Term1EnglishUnit06Manifest as unknown as ChallengeManifest,
  grade1Term1SemesterManifest as unknown as ChallengeManifest,
  grade1Term2MathManifest as unknown as ChallengeManifest,
  grade1Term2EnglishUnit01Manifest as unknown as ChallengeManifest,
  grade1Term2EnglishUnit02Manifest as unknown as ChallengeManifest,
  grade1Term2EnglishUnit03Manifest as unknown as ChallengeManifest,
  grade1Term2EnglishUnit04Manifest as unknown as ChallengeManifest,
  grade1Term2EnglishUnit05Manifest as unknown as ChallengeManifest,
  grade1Term2EnglishUnit06Manifest as unknown as ChallengeManifest,
  grade1Term2SemesterManifest as unknown as ChallengeManifest,
  grade2Term1ChineseUnit01Manifest as unknown as ChallengeManifest,
  grade2Term1ChineseUnit02Manifest as unknown as ChallengeManifest,
  grade2Term1ChineseUnit03Manifest as unknown as ChallengeManifest,
  grade2Term1ChineseUnit04Manifest as unknown as ChallengeManifest,
  grade2Term1ChineseUnit05Manifest as unknown as ChallengeManifest,
  grade2Term1ChineseUnit06Manifest as unknown as ChallengeManifest,
  grade2Term1ChineseUnit07Manifest as unknown as ChallengeManifest,
  grade2Term1ChineseUnit08Manifest as unknown as ChallengeManifest,
  grade2Term1MathUnit01Manifest as unknown as ChallengeManifest,
  grade2Term1MathUnit03Manifest as unknown as ChallengeManifest,
  grade2Term1MathUnit04Manifest as unknown as ChallengeManifest,
  grade2Term1MathUnit05Manifest as unknown as ChallengeManifest,
  grade2Term1MathUnit06Manifest as unknown as ChallengeManifest,
  grade2Term1MathUnit07Manifest as unknown as ChallengeManifest,
  grade2Term1MathUnit08Manifest as unknown as ChallengeManifest,
  grade2Term1MathUnit09Manifest as unknown as ChallengeManifest,
  grade2Term1EnglishUnit01Manifest as unknown as ChallengeManifest,
  grade2Term1EnglishUnit02Manifest as unknown as ChallengeManifest,
  grade2Term1EnglishUnit03Manifest as unknown as ChallengeManifest,
]);

export default pilotManifest;
