import { describe, expect, it } from 'vitest';
import type { ActivityDefinition, CurriculumUnit } from '../../content/types';
import { loadUnit } from '../../content/unitLoader';
import type { ChallengeManifest } from '../domain/types';
import { derivePilotQuestionKnowledgePointIds } from './pilotQuestionKnowledgePoints';
import { parseChallengeManifest } from './manifestSchema';
import { pilotSupplementalActivities } from './pilotSupplementalActivities';
import { pilotEnglishSupplementalActivities } from './pilotEnglishSupplementalActivities';
import { pilotChineseSupplementalActivities } from './pilotChineseSupplementalActivities';
import { grade1MathUnit01SupplementalActivities } from './grade1MathUnit01SupplementalActivities';
import { grade1MathUnit02SupplementalActivities } from './grade1MathUnit02SupplementalActivities';
import { grade1MathUnit03SupplementalActivities } from './grade1MathUnit03SupplementalActivities';
import { grade1MathUnit04SupplementalActivities } from './grade1MathUnit04SupplementalActivities';
import { grade1MathUnit05SupplementalActivities } from './grade1MathUnit05SupplementalActivities';
import { grade1MathUnit06SupplementalActivities } from './grade1MathUnit06SupplementalActivities';
import { grade1MathUnit07SupplementalActivities } from './grade1MathUnit07SupplementalActivities';
import { grade1MathUnit08SupplementalActivities } from './grade1MathUnit08SupplementalActivities';
import { grade1MathUnit09SupplementalActivities } from './grade1MathUnit09SupplementalActivities';
import { grade1Term1EnglishUnit01SupplementalActivities } from './grade1Term1EnglishUnit01SupplementalActivities';
import { grade1Term1EnglishUnit02SupplementalActivities } from './grade1Term1EnglishUnit02SupplementalActivities';
import { grade1Term1EnglishUnit03SupplementalActivities } from './grade1Term1EnglishUnit03SupplementalActivities';
import { grade1Term1EnglishUnit04SupplementalActivities } from './grade1Term1EnglishUnit04SupplementalActivities';
import { grade1Term1EnglishUnit05SupplementalActivities } from './grade1Term1EnglishUnit05SupplementalActivities';
import { mergeChallengeManifestFragments } from './pilotManifest';
import { validateChallengeManifest } from './validateManifest';
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
import grade1Term2SemesterManifest from './pilot-manifest-grade1-term2-semester.json';
import { grade1Term1EnglishUnit06SupplementalActivities } from './grade1Term1EnglishUnit06SupplementalActivities';
import { grade1Term2MathUnit01SupplementalActivities } from './grade1Term2MathUnit01SupplementalActivities';
import { grade1Term2MathUnit02SupplementalActivities } from './grade1Term2MathUnit02SupplementalActivities';
import { grade1Term2MathUnit03SupplementalActivities } from './grade1Term2MathUnit03SupplementalActivities';
import { grade1Term2MathUnit04SupplementalActivities } from './grade1Term2MathUnit04SupplementalActivities';
import { grade1Term2MathUnit05SupplementalActivities } from './grade1Term2MathUnit05SupplementalActivities';
import { grade1Term2MathUnit06SupplementalActivities } from './grade1Term2MathUnit06SupplementalActivities';
import { grade1Term2MathUnit07SupplementalActivities } from './grade1Term2MathUnit07SupplementalActivities';
import { grade1Term2MathUnit08SupplementalActivities } from './grade1Term2MathUnit08SupplementalActivities';
import { grade1Term2EnglishUnit01SupplementalActivities } from './grade1Term2EnglishUnit01SupplementalActivities';
import { grade1Term2EnglishUnit02SupplementalActivities } from './grade1Term2EnglishUnit02SupplementalActivities';
import { grade1Term2EnglishUnit03SupplementalActivities } from './grade1Term2EnglishUnit03SupplementalActivities';
import { grade1Term2EnglishUnit04SupplementalActivities } from './grade1Term2EnglishUnit04SupplementalActivities';
import grade1Term2EnglishUnit05Manifest from './pilot-manifest-grade1-term2-english-unit05.json';
import grade1Term2EnglishUnit06Manifest from './pilot-manifest-grade1-term2-english-unit06.json';
import { grade1Term2EnglishUnit05SupplementalActivities } from './grade1Term2EnglishUnit05SupplementalActivities';
import { grade1Term2EnglishUnit06SupplementalActivities } from './grade1Term2EnglishUnit06SupplementalActivities';
import { grade1Term2ChineseSemesterSupplementalActivities } from './grade1Term2ChineseSemesterSupplementalActivities';
import { grade2Term1ChineseUnit01SupplementalActivities } from './grade2Term1ChineseUnit01SupplementalActivities';
import grade2Term1ChineseUnit01Manifest from './pilot-manifest-grade2-term1-chinese-unit01.json';
import { grade2Term1ChineseUnit02SupplementalActivities } from './grade2Term1ChineseUnit02SupplementalActivities';
import grade2Term1ChineseUnit02Manifest from './pilot-manifest-grade2-term1-chinese-unit02.json';
import { grade2Term1ChineseUnit03SupplementalActivities } from './grade2Term1ChineseUnit03SupplementalActivities';
import grade2Term1ChineseUnit03Manifest from './pilot-manifest-grade2-term1-chinese-unit03.json';
import { grade2Term1ChineseUnit04SupplementalActivities } from './grade2Term1ChineseUnit04SupplementalActivities';
import grade2Term1ChineseUnit04Manifest from './pilot-manifest-grade2-term1-chinese-unit04.json';
import { grade2Term1ChineseUnit05SupplementalActivities } from './grade2Term1ChineseUnit05SupplementalActivities';
import grade2Term1ChineseUnit05Manifest from './pilot-manifest-grade2-term1-chinese-unit05.json';
import { grade2Term1ChineseUnit06SupplementalActivities } from './grade2Term1ChineseUnit06SupplementalActivities';
import { grade2Term1ChineseUnit07SupplementalActivities } from './grade2Term1ChineseUnit07SupplementalActivities';
import grade2Term1ChineseUnit06Manifest from './pilot-manifest-grade2-term1-chinese-unit06.json';
import grade2Term1ChineseUnit07Manifest from './pilot-manifest-grade2-term1-chinese-unit07.json';
import { grade2Term1ChineseUnit08SupplementalActivities } from './grade2Term1ChineseUnit08SupplementalActivities';
import { grade2Term1MathUnit01SupplementalActivities } from './grade2Term1MathUnit01SupplementalActivities';
import { grade2Term1MathUnit03SupplementalActivities } from './grade2Term1MathUnit03SupplementalActivities';
import { grade2Term1MathUnit04SupplementalActivities } from './grade2Term1MathUnit04SupplementalActivities';
import { grade2Term1MathUnit05SupplementalActivities } from './grade2Term1MathUnit05SupplementalActivities';
import { grade2Term1MathUnit06SupplementalActivities } from './grade2Term1MathUnit06SupplementalActivities';
import { grade2Term1MathUnit07SupplementalActivities } from './grade2Term1MathUnit07SupplementalActivities';
import { grade2Term1MathUnit08SupplementalActivities } from './grade2Term1MathUnit08SupplementalActivities';
import { grade2Term1MathUnit09SupplementalActivities } from './grade2Term1MathUnit09SupplementalActivities';
import { grade2Term1EnglishUnit01SupplementalActivities } from './grade2Term1EnglishUnit01SupplementalActivities';
import { grade2Term1EnglishUnit02SupplementalActivities } from './grade2Term1EnglishUnit02SupplementalActivities';
import { grade2Term1EnglishUnit03SupplementalActivities } from './grade2Term1EnglishUnit03SupplementalActivities';
import { grade2Term1EnglishUnit04SupplementalActivities } from './grade2Term1EnglishUnit04SupplementalActivities';
import { grade2Term1EnglishUnit05SupplementalActivities } from './grade2Term1EnglishUnit05SupplementalActivities';
import { grade2Term1EnglishUnit06SupplementalActivities } from './grade2Term1EnglishUnit06SupplementalActivities';
import grade2Term1ChineseUnit08Manifest from './pilot-manifest-grade2-term1-chinese-unit08.json';
import grade2Term1ChineseFirstHalfManifest from './pilot-manifest-grade2-term1-chinese-first-half.json';
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
import grade2Term1EnglishUnit04Manifest from './pilot-manifest-grade2-term1-english-unit04.json';
import grade2Term1EnglishUnit05Manifest from './pilot-manifest-grade2-term1-english-unit05.json';
import grade2Term1EnglishUnit06Manifest from './pilot-manifest-grade2-term1-english-unit06.json';
import grade2Term1ChineseStagesManifest from './pilot-manifest-grade2-term1-chinese-stages.json';
import grade2Term1MathStagesManifest from './pilot-manifest-grade2-term1-math-stages.json';
import grade2Term1EnglishStagesManifest from './pilot-manifest-grade2-term1-english-stages.json';
import rawManifest from './pilotManifest';

const manifest: ChallengeManifest = parseChallengeManifest(rawManifest);
const sourceUnitIds = [1, 2, 3, 4].map((number) => `grade-2/term-1/math/unit-${String(number).padStart(2, '0')}`);
const englishSourceUnitId = 'grade-3/term-1/english/unit-01';
const chineseSourceUnitId = 'grade-5/term-1/chinese/unit-01';
const grade1MathSourceUnitId = 'grade-1/term-1/math/unit-01';
const grade1MathUnit02SourceUnitId = 'grade-1/term-1/math/unit-02';
const grade1MathUnit03SourceUnitId = 'grade-1/term-1/math/unit-03';
const grade1MathUnit04SourceUnitId = 'grade-1/term-1/math/unit-04';
const grade1MathUnit05SourceUnitId = 'grade-1/term-1/math/unit-05';
const grade1MathUnit06SourceUnitId = 'grade-1/term-1/math/unit-06';
const grade1MathUnit07SourceUnitId = 'grade-1/term-1/math/unit-07';
const grade1MathUnit08SourceUnitId = 'grade-1/term-1/math/unit-08';
const grade1MathUnit09SourceUnitId = 'grade-1/term-1/math/unit-09';
const grade1Term2MathUnit03SourceUnitId = 'grade-1/term-2/math/unit-03';
const grade1Term2MathUnit04SourceUnitId = 'grade-1/term-2/math/unit-04';
const grade1Term2MathUnit05SourceUnitId = 'grade-1/term-2/math/unit-05';
const grade1Term2MathUnit06SourceUnitId = 'grade-1/term-2/math/unit-06';
const grade1Term2MathUnit08SourceUnitId = 'grade-1/term-2/math/unit-08';
const grade1Term2EnglishUnit05SourceUnitId = 'grade-1/term-2/english/unit-05';
const grade1Term2EnglishUnit06SourceUnitId = 'grade-1/term-2/english/unit-06';
const grade1EnglishUnit01SourceUnitId = 'grade-1/term-1/english/unit-01';
const grade1EnglishUnit04SourceUnitId = 'grade-1/term-1/english/unit-04';
const grade1EnglishUnit05SourceUnitId = 'grade-1/term-1/english/unit-05';
const grade1EnglishUnit06SourceUnitId = 'grade-1/term-1/english/unit-06';
const safeKinds = new Set(['choice', 'match', 'order', 'categorize', 'arithmetic']);

describe('pilot manifest against the real curriculum', () => {
  it('merges independently bundled manifest fragments without losing registry entries', () => {
    expect(coreManifest.groups).toHaveLength(8);
    expect(grade1MathUnit05Manifest.groups.map(({ definition }) => definition.id)).toEqual(['grade-1-term-1-math-unit-05']);
    expect(grade1MathUnit06Manifest.groups.map(({ definition }) => definition.id)).toEqual(['grade-1-term-1-math-unit-06']);
    expect(grade1MathUnit07Manifest.groups.map(({ definition }) => definition.id)).toEqual(['grade-1-term-1-math-unit-07']);
    expect(grade1MathUnit08Manifest.groups.map(({ definition }) => definition.id)).toEqual(['grade-1-term-1-math-unit-08']);
    expect(grade1MathUnit09Manifest.groups.map(({ definition }) => definition.id)).toEqual(['grade-1-term-1-math-unit-09']);
    expect(grade1Term1MathManifest.groups.map(({ definition }) => definition.id)).toEqual([
      'grade-1-term-1-math-first-half',
      'grade-1-term-1-math-second-half',
      'grade-1-term-1-math-end-term',
    ]);
    expect(grade1Term1EnglishManifest.groups.map(({ definition }) => definition.id)).toEqual(['grade-1-term-1-english-unit-01']);
    expect(grade1Term1EnglishUnit02Manifest.groups.map(({ definition }) => definition.id)).toEqual(['grade-1-term-1-english-unit-02']);
    expect(grade1Term1EnglishUnit03Manifest.groups.map(({ definition }) => definition.id)).toEqual(['grade-1-term-1-english-unit-03']);
    expect(grade1Term1EnglishUnit04Manifest.groups.map(({ definition }) => definition.id)).toEqual(['grade-1-term-1-english-unit-04']);
    expect(grade1Term1EnglishUnit05Manifest.groups.map(({ definition }) => definition.id)).toEqual(['grade-1-term-1-english-unit-05']);
    expect(grade1Term1EnglishUnit06Manifest.groups.map(({ definition }) => definition.id)).toEqual(['grade-1-term-1-english-unit-06']);
    expect(grade1Term1SemesterManifest.groups.map(({ definition }) => definition.id)).toEqual([
      'grade-1-term-1-chinese-first-half',
      'grade-1-term-1-chinese-second-half',
      'grade-1-term-1-chinese-end-term',
      'grade-1-term-1-english-first-half',
      'grade-1-term-1-english-second-half',
      'grade-1-term-1-english-end-term',
    ]);
    expect(grade1Term2MathManifest.groups.map(({ definition }) => definition.id)).toEqual([
      'grade-1-term-2-math-unit-01',
      'grade-1-term-2-math-unit-02',
      'grade-1-term-2-math-unit-03',
      'grade-1-term-2-math-unit-04',
      'grade-1-term-2-math-unit-05',
      'grade-1-term-2-math-unit-06',
      'grade-1-term-2-math-unit-07',
      'grade-1-term-2-math-unit-08',
    ]);
    expect(grade1Term2EnglishUnit01Manifest.groups.map(({ definition }) => definition.id)).toEqual([
      'grade-1-term-2-english-unit-01',
    ]);
    expect(grade1Term2EnglishUnit02Manifest.groups.map(({ definition }) => definition.id)).toEqual([
      'grade-1-term-2-english-unit-02',
    ]);
    expect(grade1Term2EnglishUnit03Manifest.groups.map(({ definition }) => definition.id)).toEqual([
      'grade-1-term-2-english-unit-03',
    ]);
    expect(grade1Term2EnglishUnit04Manifest.groups.map(({ definition }) => definition.id)).toEqual([
      'grade-1-term-2-english-unit-04',
    ]);
    expect(grade1Term2EnglishUnit05Manifest.groups.map(({ definition }) => definition.id)).toEqual([
      'grade-1-term-2-english-unit-05',
    ]);
    expect(grade1Term2EnglishUnit06Manifest.groups.map(({ definition }) => definition.id)).toEqual([
      'grade-1-term-2-english-unit-06',
    ]);
    expect(grade1Term2SemesterManifest.groups.map(({ definition }) => definition.id)).toEqual([
      'grade-1-term-2-chinese-first-half',
      'grade-1-term-2-chinese-second-half',
      'grade-1-term-2-chinese-end-term',
      'grade-1-term-2-math-first-half',
      'grade-1-term-2-math-second-half',
      'grade-1-term-2-math-end-term',
      'grade-1-term-2-english-first-half',
      'grade-1-term-2-english-second-half',
      'grade-1-term-2-english-end-term',
    ]);
    expect(grade2Term1ChineseUnit01Manifest.groups.map(({ definition }) => definition.id)).toEqual([
      'grade-2-term-1-chinese-unit-01',
    ]);
    expect(grade2Term1ChineseUnit02Manifest.groups.map(({ definition }) => definition.id)).toEqual([
      'grade-2-term-1-chinese-unit-02',
    ]);
    expect(grade2Term1ChineseUnit03Manifest.groups.map(({ definition }) => definition.id)).toEqual([
      'grade-2-term-1-chinese-unit-03',
    ]);
    expect(grade2Term1ChineseUnit04Manifest.groups.map(({ definition }) => definition.id)).toEqual([
      'grade-2-term-1-chinese-unit-04',
    ]);
    expect(grade2Term1ChineseUnit05Manifest.groups.map(({ definition }) => definition.id)).toEqual([
      'grade-2-term-1-chinese-unit-05',
    ]);
    expect(grade2Term1ChineseUnit06Manifest.groups.map(({ definition }) => definition.id)).toEqual([
      'grade-2-term-1-chinese-unit-06',
    ]);
    expect(grade2Term1ChineseUnit07Manifest.groups.map(({ definition }) => definition.id)).toEqual([
      'grade-2-term-1-chinese-unit-07',
    ]);
    expect(grade2Term1ChineseUnit08Manifest.groups.map(({ definition }) => definition.id)).toEqual([
      'grade-2-term-1-chinese-unit-08',
    ]);
    expect(grade2Term1MathUnit01Manifest.groups.map(({ definition }) => definition.id)).toEqual([
      'grade-2-term-1-math-unit-01',
    ]);
    expect(grade2Term1MathUnit03Manifest.groups.map(({ definition }) => definition.id)).toEqual([
      'grade-2-term-1-math-unit-03',
    ]);
    expect(grade2Term1MathUnit04Manifest.groups.map(({ definition }) => definition.id)).toEqual([
      'grade-2-term-1-math-unit-04',
    ]);
    expect(grade2Term1MathUnit05Manifest.groups.map(({ definition }) => definition.id)).toEqual([
      'grade-2-term-1-math-unit-05',
    ]);
    expect(grade2Term1MathUnit06Manifest.groups.map(({ definition }) => definition.id)).toEqual([
      'grade-2-term-1-math-unit-06',
    ]);
    expect(grade2Term1MathUnit07Manifest.groups.map(({ definition }) => definition.id)).toEqual([
      'grade-2-term-1-math-unit-07',
    ]);
    expect(grade2Term1MathUnit08Manifest.groups.map(({ definition }) => definition.id)).toEqual([
      'grade-2-term-1-math-unit-08',
    ]);
    expect(grade2Term1MathUnit09Manifest.groups.map(({ definition }) => definition.id)).toEqual([
      'grade-2-term-1-math-unit-09',
    ]);
    expect(grade2Term1EnglishUnit01Manifest.groups.map(({ definition }) => definition.id)).toEqual([
      'grade-2-term-1-english-unit-01',
    ]);
    expect(grade2Term1EnglishUnit02Manifest.groups.map(({ definition }) => definition.id)).toEqual([
      'grade-2-term-1-english-unit-02',
    ]);
    expect(grade2Term1EnglishUnit03Manifest.groups.map(({ definition }) => definition.id)).toEqual([
      'grade-2-term-1-english-unit-03',
    ]);
    expect(grade2Term1EnglishUnit04Manifest.groups.map(({ definition }) => definition.id)).toEqual([
      'grade-2-term-1-english-unit-04',
    ]);
    expect(grade2Term1EnglishUnit05Manifest.groups.map(({ definition }) => definition.id)).toEqual([
      'grade-2-term-1-english-unit-05',
    ]);
    expect(grade2Term1EnglishUnit06Manifest.groups.map(({ definition }) => definition.id)).toEqual([
      'grade-2-term-1-english-unit-06',
    ]);
    expect(grade2Term1ChineseStagesManifest.groups.map(({ definition }) => definition.id)).toEqual([
      'grade-2-term-1-chinese-second-half',
      'grade-2-term-1-chinese-end-term',
    ]);
    expect(grade2Term1MathStagesManifest.groups.map(({ definition }) => definition.id)).toEqual([
      'grade-2-term-1-math-second-half',
      'grade-2-term-1-math-end-term',
    ]);
    expect(grade2Term1EnglishStagesManifest.groups.map(({ definition }) => definition.id)).toEqual([
      'grade-2-term-1-english-first-half',
      'grade-2-term-1-english-second-half',
      'grade-2-term-1-english-end-term',
    ]);
    expect(mergeChallengeManifestFragments([
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
      grade2Term1ChineseFirstHalfManifest as unknown as ChallengeManifest,
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
      grade2Term1EnglishUnit04Manifest as unknown as ChallengeManifest,
      grade2Term1EnglishUnit05Manifest as unknown as ChallengeManifest,
      grade2Term1EnglishUnit06Manifest as unknown as ChallengeManifest,
      grade2Term1ChineseStagesManifest as unknown as ChallengeManifest,
      grade2Term1MathStagesManifest as unknown as ChallengeManifest,
      grade2Term1EnglishStagesManifest as unknown as ChallengeManifest,
    ])).toEqual(rawManifest);
  });

  it('rejects manifest fragments with mismatched versions', () => {
    expect(() => mergeChallengeManifestFragments([])).toThrow('At least one challenge manifest fragment is required.');
    expect(() => mergeChallengeManifestFragments([
      { version: 'v1', questions: [], groups: [] },
      { version: 'v2', questions: [], groups: [] },
    ])).toThrow('Challenge manifest fragments must use the same version.');
  });

  it('rejects duplicate question and group identifiers across fragments', () => {
    const firstQuestion = (coreManifest as ChallengeManifest).questions[0];
    const firstGroup = (coreManifest as ChallengeManifest).groups[0];

    expect(() => mergeChallengeManifestFragments([
      { version: 'v1', questions: [firstQuestion], groups: [] },
      { version: 'v1', questions: [firstQuestion], groups: [] },
    ])).toThrow('Challenge manifest fragments contain duplicate question IDs.');
    expect(() => mergeChallengeManifestFragments([
      { version: 'v1', questions: [], groups: [firstGroup] },
      { version: 'v1', questions: [], groups: [firstGroup] },
    ])).toThrow('Challenge manifest fragments contain duplicate group IDs.');
  });

  it('resolves all candidates and passes every released group gate', async () => {
    const activitiesById = new Map<string, ActivityDefinition>();
    const sourceUnitByActivityId = new Map<string, string>();
    const unitsById = new Map<string, CurriculumUnit>();

    for (const sourceUnitId of [...sourceUnitIds, 'grade-2/term-1/math/unit-05', 'grade-2/term-1/math/unit-06', 'grade-2/term-1/math/unit-07', 'grade-2/term-1/math/unit-08', 'grade-2/term-1/math/unit-09', 'grade-2/term-1/english/unit-01', 'grade-2/term-1/english/unit-02', 'grade-2/term-1/english/unit-03', 'grade-2/term-1/english/unit-04', 'grade-2/term-1/english/unit-05', 'grade-2/term-1/english/unit-06', 'grade-2/term-1/chinese/unit-01', 'grade-2/term-1/chinese/unit-02', 'grade-2/term-1/chinese/unit-03', 'grade-2/term-1/chinese/unit-04', 'grade-2/term-1/chinese/unit-05', 'grade-2/term-1/chinese/unit-06', 'grade-2/term-1/chinese/unit-07', 'grade-2/term-1/chinese/unit-08', englishSourceUnitId, chineseSourceUnitId, grade1MathSourceUnitId, grade1MathUnit02SourceUnitId, grade1MathUnit03SourceUnitId, grade1MathUnit04SourceUnitId, grade1MathUnit05SourceUnitId, grade1MathUnit06SourceUnitId, grade1MathUnit07SourceUnitId, grade1MathUnit08SourceUnitId, grade1MathUnit09SourceUnitId, grade1EnglishUnit01SourceUnitId, 'grade-1/term-1/english/unit-02', 'grade-1/term-1/english/unit-03', grade1EnglishUnit04SourceUnitId, grade1EnglishUnit05SourceUnitId, grade1EnglishUnit06SourceUnitId, 'grade-1/term-2/math/unit-01', 'grade-1/term-2/math/unit-02', grade1Term2MathUnit03SourceUnitId, grade1Term2MathUnit04SourceUnitId, grade1Term2MathUnit05SourceUnitId, grade1Term2MathUnit06SourceUnitId, 'grade-1/term-2/math/unit-07', grade1Term2MathUnit08SourceUnitId, 'grade-1/term-2/english/unit-01', 'grade-1/term-2/english/unit-02', 'grade-1/term-2/english/unit-03', 'grade-1/term-2/english/unit-04', grade1Term2EnglishUnit05SourceUnitId, grade1Term2EnglishUnit06SourceUnitId, ...Array.from({ length: 8 }, (_, index) => `grade-1/term-1/chinese/unit-${String(index + 1).padStart(2, '0')}`), ...Array.from({ length: 8 }, (_, index) => `grade-1/term-2/chinese/unit-${String(index + 1).padStart(2, '0')}`)]) {
      const unit = await loadUnit(sourceUnitId);
      expect(unit).toBeDefined();
      unitsById.set(sourceUnitId, unit!);
      for (const track of Object.values(unit!.difficultyTracks)) {
        for (const task of track.tasks) {
          for (const session of task.sessions) {
            for (const activity of session.activities) {
              if (!safeKinds.has(activity.kind)) continue;
              activitiesById.set(activity.id, activity);
              sourceUnitByActivityId.set(activity.id, sourceUnitId);
            }
          }
        }
      }
    }

    for (const supplemental of pilotSupplementalActivities) {
      activitiesById.set(supplemental.activity.id, supplemental.activity);
      sourceUnitByActivityId.set(supplemental.activity.id, sourceUnitIds[1]);
    }
    for (const supplemental of pilotEnglishSupplementalActivities) {
      activitiesById.set(supplemental.activity.id, supplemental.activity);
      sourceUnitByActivityId.set(supplemental.activity.id, supplemental.sourceUnitId);
    }
    for (const supplemental of pilotChineseSupplementalActivities) {
      activitiesById.set(supplemental.activity.id, supplemental.activity);
      sourceUnitByActivityId.set(supplemental.activity.id, supplemental.sourceUnitId);
    }
    for (const supplemental of grade1MathUnit01SupplementalActivities) {
      activitiesById.set(supplemental.activity.id, supplemental.activity);
      sourceUnitByActivityId.set(supplemental.activity.id, supplemental.sourceUnitId);
    }
    for (const supplemental of grade1MathUnit02SupplementalActivities) {
      activitiesById.set(supplemental.activity.id, supplemental.activity);
      sourceUnitByActivityId.set(supplemental.activity.id, supplemental.sourceUnitId);
    }
    for (const supplemental of grade1MathUnit03SupplementalActivities) {
      activitiesById.set(supplemental.activity.id, supplemental.activity);
      sourceUnitByActivityId.set(supplemental.activity.id, supplemental.sourceUnitId);
    }
    for (const supplemental of grade1MathUnit04SupplementalActivities) {
      activitiesById.set(supplemental.activity.id, supplemental.activity);
      sourceUnitByActivityId.set(supplemental.activity.id, supplemental.sourceUnitId);
    }
    for (const supplemental of grade1MathUnit05SupplementalActivities) {
      activitiesById.set(supplemental.activity.id, supplemental.activity);
      sourceUnitByActivityId.set(supplemental.activity.id, supplemental.sourceUnitId);
    }
    for (const supplemental of grade1MathUnit06SupplementalActivities) {
      activitiesById.set(supplemental.activity.id, supplemental.activity);
      sourceUnitByActivityId.set(supplemental.activity.id, supplemental.sourceUnitId);
    }
    for (const supplemental of grade1MathUnit07SupplementalActivities) {
      activitiesById.set(supplemental.activity.id, supplemental.activity);
      sourceUnitByActivityId.set(supplemental.activity.id, supplemental.sourceUnitId);
    }
    for (const supplemental of grade1MathUnit08SupplementalActivities) {
      activitiesById.set(supplemental.activity.id, supplemental.activity);
      sourceUnitByActivityId.set(supplemental.activity.id, supplemental.sourceUnitId);
    }
    for (const supplemental of grade1MathUnit09SupplementalActivities) {
      activitiesById.set(supplemental.activity.id, supplemental.activity);
      sourceUnitByActivityId.set(supplemental.activity.id, supplemental.sourceUnitId);
    }
    for (const supplemental of grade1Term1EnglishUnit01SupplementalActivities) {
      activitiesById.set(supplemental.activity.id, supplemental.activity);
      sourceUnitByActivityId.set(supplemental.activity.id, supplemental.sourceUnitId);
    }
    for (const supplemental of grade1Term1EnglishUnit02SupplementalActivities) {
      activitiesById.set(supplemental.activity.id, supplemental.activity);
      sourceUnitByActivityId.set(supplemental.activity.id, supplemental.sourceUnitId);
    }
    for (const supplemental of grade1Term1EnglishUnit03SupplementalActivities) {
      activitiesById.set(supplemental.activity.id, supplemental.activity);
      sourceUnitByActivityId.set(supplemental.activity.id, supplemental.sourceUnitId);
    }
    for (const supplemental of grade1Term1EnglishUnit04SupplementalActivities) {
      activitiesById.set(supplemental.activity.id, supplemental.activity);
      sourceUnitByActivityId.set(supplemental.activity.id, supplemental.sourceUnitId);
    }
    for (const supplemental of grade1Term1EnglishUnit05SupplementalActivities) {
      activitiesById.set(supplemental.activity.id, supplemental.activity);
      sourceUnitByActivityId.set(supplemental.activity.id, supplemental.sourceUnitId);
    }
    for (const supplemental of grade1Term1EnglishUnit06SupplementalActivities) {
      activitiesById.set(supplemental.activity.id, supplemental.activity);
      sourceUnitByActivityId.set(supplemental.activity.id, supplemental.sourceUnitId);
    }
    for (const supplemental of grade1Term2MathUnit01SupplementalActivities) {
      activitiesById.set(supplemental.activity.id, supplemental.activity);
      sourceUnitByActivityId.set(supplemental.activity.id, supplemental.sourceUnitId);
    }
    for (const supplemental of grade1Term2MathUnit02SupplementalActivities) {
      activitiesById.set(supplemental.activity.id, supplemental.activity);
      sourceUnitByActivityId.set(supplemental.activity.id, supplemental.sourceUnitId);
    }
    for (const supplemental of grade1Term2MathUnit03SupplementalActivities) {
      activitiesById.set(supplemental.activity.id, supplemental.activity);
      sourceUnitByActivityId.set(supplemental.activity.id, supplemental.sourceUnitId);
    }
    for (const supplemental of grade1Term2MathUnit04SupplementalActivities) {
      activitiesById.set(supplemental.activity.id, supplemental.activity);
      sourceUnitByActivityId.set(supplemental.activity.id, supplemental.sourceUnitId);
    }
    for (const supplemental of grade1Term2MathUnit05SupplementalActivities) {
      activitiesById.set(supplemental.activity.id, supplemental.activity);
      sourceUnitByActivityId.set(supplemental.activity.id, supplemental.sourceUnitId);
    }
    for (const supplemental of grade1Term2MathUnit06SupplementalActivities) {
      activitiesById.set(supplemental.activity.id, supplemental.activity);
      sourceUnitByActivityId.set(supplemental.activity.id, supplemental.sourceUnitId);
    }
    for (const supplemental of grade1Term2MathUnit07SupplementalActivities) {
      activitiesById.set(supplemental.activity.id, supplemental.activity);
      sourceUnitByActivityId.set(supplemental.activity.id, supplemental.sourceUnitId);
    }
    for (const supplemental of grade1Term2MathUnit08SupplementalActivities) {
      activitiesById.set(supplemental.activity.id, supplemental.activity);
      sourceUnitByActivityId.set(supplemental.activity.id, supplemental.sourceUnitId);
    }
    for (const supplemental of grade1Term2EnglishUnit01SupplementalActivities) {
      activitiesById.set(supplemental.activity.id, supplemental.activity);
      sourceUnitByActivityId.set(supplemental.activity.id, supplemental.sourceUnitId);
    }
    for (const supplemental of grade1Term2EnglishUnit02SupplementalActivities) {
      activitiesById.set(supplemental.activity.id, supplemental.activity);
      sourceUnitByActivityId.set(supplemental.activity.id, supplemental.sourceUnitId);
    }
    for (const supplemental of grade1Term2EnglishUnit03SupplementalActivities) {
      activitiesById.set(supplemental.activity.id, supplemental.activity);
      sourceUnitByActivityId.set(supplemental.activity.id, supplemental.sourceUnitId);
    }
    for (const supplemental of grade1Term2EnglishUnit04SupplementalActivities) {
      activitiesById.set(supplemental.activity.id, supplemental.activity);
      sourceUnitByActivityId.set(supplemental.activity.id, supplemental.sourceUnitId);
    }
    for (const supplemental of grade1Term2EnglishUnit05SupplementalActivities) {
      activitiesById.set(supplemental.activity.id, supplemental.activity);
      sourceUnitByActivityId.set(supplemental.activity.id, supplemental.sourceUnitId);
    }
    for (const supplemental of grade1Term2EnglishUnit06SupplementalActivities) {
      activitiesById.set(supplemental.activity.id, supplemental.activity);
      sourceUnitByActivityId.set(supplemental.activity.id, supplemental.sourceUnitId);
    }
    for (const supplemental of grade1Term2ChineseSemesterSupplementalActivities) {
      activitiesById.set(supplemental.activity.id, supplemental.activity);
      sourceUnitByActivityId.set(supplemental.activity.id, supplemental.sourceUnitId);
    }
    for (const supplemental of grade2Term1ChineseUnit01SupplementalActivities) {
      activitiesById.set(supplemental.activity.id, supplemental.activity);
      sourceUnitByActivityId.set(supplemental.activity.id, supplemental.sourceUnitId);
    }
    for (const supplemental of grade2Term1ChineseUnit02SupplementalActivities) {
      activitiesById.set(supplemental.activity.id, supplemental.activity);
      sourceUnitByActivityId.set(supplemental.activity.id, supplemental.sourceUnitId);
    }
    for (const supplemental of grade2Term1ChineseUnit03SupplementalActivities) {
      activitiesById.set(supplemental.activity.id, supplemental.activity);
      sourceUnitByActivityId.set(supplemental.activity.id, supplemental.sourceUnitId);
    }
    for (const supplemental of grade2Term1ChineseUnit04SupplementalActivities) {
      activitiesById.set(supplemental.activity.id, supplemental.activity);
      sourceUnitByActivityId.set(supplemental.activity.id, supplemental.sourceUnitId);
    }
    for (const supplemental of grade2Term1ChineseUnit05SupplementalActivities) {
      activitiesById.set(supplemental.activity.id, supplemental.activity);
      sourceUnitByActivityId.set(supplemental.activity.id, supplemental.sourceUnitId);
    }
    for (const supplemental of grade2Term1ChineseUnit06SupplementalActivities) {
      activitiesById.set(supplemental.activity.id, supplemental.activity);
      sourceUnitByActivityId.set(supplemental.activity.id, supplemental.sourceUnitId);
    }
    for (const supplemental of grade2Term1ChineseUnit07SupplementalActivities) {
      activitiesById.set(supplemental.activity.id, supplemental.activity);
      sourceUnitByActivityId.set(supplemental.activity.id, supplemental.sourceUnitId);
    }
    for (const supplemental of grade2Term1ChineseUnit08SupplementalActivities) {
      activitiesById.set(supplemental.activity.id, supplemental.activity);
      sourceUnitByActivityId.set(supplemental.activity.id, supplemental.sourceUnitId);
    }
    for (const supplemental of grade2Term1MathUnit01SupplementalActivities) {
      activitiesById.set(supplemental.activity.id, supplemental.activity);
      sourceUnitByActivityId.set(supplemental.activity.id, supplemental.sourceUnitId);
    }
    for (const supplemental of grade2Term1MathUnit03SupplementalActivities) {
      activitiesById.set(supplemental.activity.id, supplemental.activity);
      sourceUnitByActivityId.set(supplemental.activity.id, supplemental.sourceUnitId);
    }
    for (const supplemental of grade2Term1MathUnit04SupplementalActivities) {
      activitiesById.set(supplemental.activity.id, supplemental.activity);
      sourceUnitByActivityId.set(supplemental.activity.id, supplemental.sourceUnitId);
    }
    for (const supplemental of grade2Term1MathUnit05SupplementalActivities) {
      activitiesById.set(supplemental.activity.id, supplemental.activity);
      sourceUnitByActivityId.set(supplemental.activity.id, supplemental.sourceUnitId);
    }
    for (const supplemental of grade2Term1MathUnit06SupplementalActivities) {
      activitiesById.set(supplemental.activity.id, supplemental.activity);
      sourceUnitByActivityId.set(supplemental.activity.id, supplemental.sourceUnitId);
    }
    for (const supplemental of grade2Term1MathUnit07SupplementalActivities) {
      activitiesById.set(supplemental.activity.id, supplemental.activity);
      sourceUnitByActivityId.set(supplemental.activity.id, supplemental.sourceUnitId);
    }
    for (const supplemental of grade2Term1MathUnit08SupplementalActivities) {
      activitiesById.set(supplemental.activity.id, supplemental.activity);
      sourceUnitByActivityId.set(supplemental.activity.id, supplemental.sourceUnitId);
    }
    for (const supplemental of grade2Term1MathUnit09SupplementalActivities) {
      activitiesById.set(supplemental.activity.id, supplemental.activity);
      sourceUnitByActivityId.set(supplemental.activity.id, supplemental.sourceUnitId);
    }
    for (const supplemental of grade2Term1EnglishUnit01SupplementalActivities) {
      activitiesById.set(supplemental.activity.id, supplemental.activity);
      sourceUnitByActivityId.set(supplemental.activity.id, supplemental.sourceUnitId);
    }
    for (const supplemental of grade2Term1EnglishUnit02SupplementalActivities) {
      activitiesById.set(supplemental.activity.id, supplemental.activity);
      sourceUnitByActivityId.set(supplemental.activity.id, supplemental.sourceUnitId);
    }
    for (const supplemental of grade2Term1EnglishUnit03SupplementalActivities) {
      activitiesById.set(supplemental.activity.id, supplemental.activity);
      sourceUnitByActivityId.set(supplemental.activity.id, supplemental.sourceUnitId);
    }
    for (const supplemental of grade2Term1EnglishUnit04SupplementalActivities) {
      activitiesById.set(supplemental.activity.id, supplemental.activity);
      sourceUnitByActivityId.set(supplemental.activity.id, supplemental.sourceUnitId);
    }
    for (const supplemental of grade2Term1EnglishUnit05SupplementalActivities) {
      activitiesById.set(supplemental.activity.id, supplemental.activity);
      sourceUnitByActivityId.set(supplemental.activity.id, supplemental.sourceUnitId);
    }
    for (const supplemental of grade2Term1EnglishUnit06SupplementalActivities) {
      activitiesById.set(supplemental.activity.id, supplemental.activity);
      sourceUnitByActivityId.set(supplemental.activity.id, supplemental.sourceUnitId);
    }

    const report = await validateChallengeManifest(manifest, activitiesById, sourceUnitByActivityId, unitsById);
    expect(report.errors).toEqual([]);
    expect(report.contentChanges).toEqual([]);
    for (const question of manifest.questions) {
      const activity = activitiesById.get(question.activityId)!;
      const sourceUnitId = sourceUnitByActivityId.get(question.activityId)!;
      expect(question.knowledgePointIds, question.questionId).toEqual(derivePilotQuestionKnowledgePointIds(sourceUnitId, activity));
    }
    expect(report.groupStatusById).toEqual({
      'grade-2-term-1-chinese-unit-01': 'ready',
      'grade-2-term-1-chinese-unit-02': 'ready',
      'grade-2-term-1-chinese-unit-03': 'ready',
      'grade-2-term-1-chinese-unit-04': 'ready',
      'grade-2-term-1-chinese-unit-05': 'ready',
      'grade-2-term-1-chinese-unit-06': 'ready',
      'grade-2-term-1-chinese-unit-07': 'ready',
      'grade-2-term-1-chinese-unit-08': 'ready',
      'grade-2-term-1-chinese-first-half': 'ready',
      'grade-2-term-1-math-unit-01': 'ready',
      'grade-2-term-1-math-unit-03': 'ready',
      'grade-2-term-1-math-unit-04': 'ready',
      'grade-2-term-1-math-unit-05': 'ready',
      'grade-2-term-1-math-unit-06': 'ready',
      'grade-2-term-1-math-unit-07': 'ready',
      'grade-2-term-1-math-unit-08': 'ready',
      'grade-2-term-1-math-unit-09': 'ready',
      'grade-2-term-1-english-unit-01': 'ready',
      'grade-2-term-1-english-unit-02': 'ready',
      'grade-2-term-1-english-unit-03': 'ready',
      'grade-2-term-1-english-unit-04': 'ready',
      'grade-2-term-1-english-unit-05': 'ready',
      'grade-2-term-1-english-unit-06': 'ready',
      'grade-2-term-1-math-unit-02': 'ready',
      'grade-2-term-1-math-first-half': 'ready',
      'grade-3-term-1-english-unit-01': 'ready',
      'grade-5-term-1-chinese-unit-01': 'ready',
      'grade-1-term-1-math-unit-01': 'ready',
      'grade-1-term-1-math-unit-02': 'ready',
      'grade-1-term-1-math-unit-03': 'ready',
      'grade-1-term-1-math-unit-04': 'ready',
      'grade-1-term-1-math-unit-05': 'ready',
      'grade-1-term-1-math-unit-06': 'ready',
      'grade-1-term-1-math-unit-07': 'ready',
      'grade-1-term-1-math-unit-08': 'ready',
      'grade-1-term-1-math-unit-09': 'ready',
      'grade-1-term-1-math-first-half': 'ready',
      'grade-1-term-1-math-second-half': 'ready',
      'grade-1-term-1-math-end-term': 'ready',
      'grade-1-term-1-english-unit-01': 'ready',
      'grade-1-term-1-english-unit-02': 'ready',
      'grade-1-term-1-english-unit-03': 'ready',
      'grade-1-term-1-english-unit-04': 'ready',
      'grade-1-term-1-english-unit-05': 'ready',
      'grade-1-term-1-english-unit-06': 'ready',
      'grade-1-term-1-chinese-first-half': 'ready',
      'grade-1-term-1-chinese-second-half': 'ready',
      'grade-1-term-1-chinese-end-term': 'ready',
      'grade-1-term-1-english-first-half': 'ready',
      'grade-1-term-1-english-second-half': 'ready',
      'grade-1-term-1-english-end-term': 'ready',
      'grade-1-term-2-math-unit-01': 'ready',
      'grade-1-term-2-math-unit-02': 'ready',
      'grade-1-term-2-math-unit-03': 'ready',
      'grade-1-term-2-math-unit-04': 'ready',
      'grade-1-term-2-math-unit-05': 'ready',
      'grade-1-term-2-math-unit-06': 'ready',
      'grade-1-term-2-math-unit-07': 'ready',
      'grade-1-term-2-math-unit-08': 'ready',
      'grade-1-term-2-english-unit-01': 'ready',
      'grade-1-term-2-english-unit-02': 'ready',
      'grade-1-term-2-english-unit-03': 'ready',
      'grade-1-term-2-english-unit-04': 'ready',
      'grade-1-term-2-english-unit-05': 'ready',
      'grade-1-term-2-english-unit-06': 'ready',
      'grade-1-term-2-chinese-first-half': 'ready',
      'grade-1-term-2-chinese-second-half': 'ready',
      'grade-1-term-2-chinese-end-term': 'ready',
      'grade-1-term-2-math-first-half': 'ready',
      'grade-1-term-2-math-second-half': 'ready',
      'grade-1-term-2-math-end-term': 'ready',
      'grade-1-term-2-english-first-half': 'ready',
      'grade-1-term-2-english-second-half': 'ready',
      'grade-1-term-2-english-end-term': 'ready',
      'grade-2-term-1-chinese-second-half': 'ready',
      'grade-2-term-1-chinese-end-term': 'ready',
      'grade-2-term-1-math-second-half': 'ready',
      'grade-2-term-1-math-end-term': 'ready',
      'grade-2-term-1-english-first-half': 'ready',
      'grade-2-term-1-english-second-half': 'ready',
      'grade-2-term-1-english-end-term': 'ready',
    });
    expect(manifest.groups[0].questionIds).toHaveLength(90);
    expect(manifest.groups[1].questionIds).toHaveLength(226);
    expect(manifest.groups[2]?.questionIds).toHaveLength(90);
    expect(manifest.groups[4]?.questionIds).toHaveLength(90);
    expect(manifest.questions).toHaveLength(5575);
    expect(manifest.groups).toHaveLength(81);
  });

  it('registers all 90 Grade 1 Term 2 Math Unit 8 review candidates with source mappings', () => {
    const group = manifest.groups.find(({ definition }) => definition.id === 'grade-1-term-2-math-unit-08');
    const questionById = new Map(manifest.questions.map((question) => [question.questionId, question]));
    const questions = group?.questionIds.map((questionId) => questionById.get(questionId)!);

    expect(group?.definition.coreKnowledgePointIds).toEqual([
      'plane-shape-recognition',
      'subtraction-within-20',
      'classification-standard',
      'number-sequence-to-100',
      'yuan-jiao-fen-conversion',
      'two-digit-add-subtract-one',
      'repeating-shape-patterns',
    ]);
    expect(questions).toHaveLength(90);
    expect(Object.fromEntries(['basic', 'advanced', 'high'].map((difficulty) => [
      difficulty,
      questions?.filter((question) => question.difficulty === difficulty).length,
    ]))).toEqual({ basic: 30, advanced: 30, high: 30 });
    expect(questions?.every((question) => question.approved && question.answerLeakageReviewed
      && question.approvedContentFingerprint.length === 64 && question.knowledgePointIds.length > 0)).toBe(true);
  });

  it('registers Grade 1 math Unit 2 with verified position and route knowledge coverage', () => {
    const group = manifest.groups.find(({ definition }) => definition.id === 'grade-1-term-1-math-unit-02');

    expect(group?.definition).toMatchObject({
      kind: 'unit',
      grade: 1,
      semester: 1,
      subject: 'math',
      sourceUnitIds: [grade1MathUnit02SourceUnitId],
      coreKnowledgePointIds: ['relative-position', 'reference-point', 'route-sequence'],
    });
    expect(group?.questionIds).toHaveLength(90);
    expect(group?.releaseIntent).toBe('released');
  });

  it('registers Grade 2 Term 1 Math Unit 7 with 48 source and 42 original time questions', () => {
    const group = manifest.groups.find(({ definition }) => definition.id === 'grade-2-term-1-math-unit-07');
    const questions = manifest.questions.filter(({ questionId }) => group?.questionIds.includes(questionId));
    const sourceCandidates = questions.filter(({ activityId }) => activityId.startsWith('grade-2/term-1/math/unit-07/'));
    const supplementalCandidates = questions.filter(({ activityId }) => activityId.startsWith('challenge-supplement-grade-2-term-1-math-unit-07-'));

    expect(group?.definition).toMatchObject({
      kind: 'unit',
      grade: 2,
      semester: 1,
      subject: 'math',
      sourceUnitIds: ['grade-2/term-1/math/unit-07'],
      coreKnowledgePointIds: [
        'clock-reading-and-time-units',
        'time-relationships-and-application',
      ],
    });
    expect(group?.releaseIntent).toBe('released');
    expect(questions).toHaveLength(90);
    expect(sourceCandidates).toHaveLength(48);
    expect(supplementalCandidates).toHaveLength(42);
    expect(Object.fromEntries(['basic', 'advanced', 'high'].map((difficulty) => [
      difficulty,
      questions.filter((question) => question.difficulty === difficulty).length,
    ]))).toEqual({ basic: 30, advanced: 30, high: 30 });
  });

  it('registers fourteen original Grade 1 math Unit 2 challenge candidates per difficulty', () => {
    const supplemental = manifest.questions.filter(({ activityId }) => activityId.startsWith(
      'challenge-supplement-grade-1-term-1-math-unit-02-',
    ));

    expect(supplemental).toHaveLength(42);
    expect(new Set(supplemental.map(({ activityId }) => activityId)).size).toBe(42);
    expect(Object.fromEntries(['basic', 'advanced', 'high'].map((difficulty) => [
      difficulty,
      supplemental.filter((question) => question.difficulty === difficulty).length,
    ]))).toEqual({ basic: 14, advanced: 14, high: 14 });
  });

  it('registers Grade 1 math Unit 3 with 30 unique candidates per difficulty', () => {
    const group = manifest.groups.find(({ definition }) => definition.id === 'grade-1-term-1-math-unit-03');
    const questions = manifest.questions.filter(({ activityId }) => activityId.includes('grade-1/term-1/math/unit-03/')
      || activityId.startsWith('challenge-supplement-grade-1-term-1-math-unit-03-'));

    expect(group?.definition).toMatchObject({
      kind: 'unit',
      grade: 1,
      semester: 1,
      subject: 'math',
      sourceUnitIds: [grade1MathUnit03SourceUnitId],
      coreKnowledgePointIds: [
        'number-composition-within-five',
        'addition-within-five',
        'subtraction-within-five',
        'comparison-within-five',
        'checking-within-five',
      ],
    });
    expect(group?.questionIds).toHaveLength(90);
    expect(new Set(questions.map(({ questionId }) => questionId)).size).toBe(90);
    expect(Object.fromEntries(['basic', 'advanced', 'high'].map((difficulty) => [
      difficulty,
      questions.filter((question) => question.difficulty === difficulty).length,
    ]))).toEqual({ basic: 30, advanced: 30, high: 30 });
    expect(group?.releaseIntent).toBe('released');
  });

  it('excludes the three duplicate source activities from the Unit 3 challenge pool without editing the course', () => {
    const group = manifest.groups.find(({ definition }) => definition.id === 'grade-1-term-1-math-unit-03');
    const excludedActivityIds = [
      'grade-1/term-1/math/unit-03/advanced/task-02/session-01/question-02',
      'grade-1/term-1/math/unit-03/high/task-01/session-01/question-01',
      'grade-1/term-1/math/unit-03/high/task-01/session-01/question-02',
    ];

    for (const activityId of excludedActivityIds) {
      expect(manifest.questions.some((question) => question.activityId === activityId)).toBe(false);
    }
    expect(group?.questionIds).toHaveLength(90);
  });

  it('registers Grade 1 math Unit 4 with 30 unique candidates per difficulty', () => {
    const group = manifest.groups.find(({ definition }) => definition.id === 'grade-1-term-1-math-unit-04');
    const questions = manifest.questions.filter(({ questionId }) => group?.questionIds.includes(questionId));

    expect(group?.definition).toMatchObject({
      kind: 'unit',
      grade: 1,
      semester: 1,
      subject: 'math',
      sourceUnitIds: [grade1MathUnit04SourceUnitId],
      coreKnowledgePointIds: ['solid-shape-recognition', 'solid-shape-features', 'solid-shape-use'],
    });
    expect(group?.releaseIntent).toBe('released');
    expect(questions).toHaveLength(90);
    expect(new Set(questions.map(({ questionId }) => questionId)).size).toBe(90);
    expect(Object.fromEntries(['basic', 'advanced', 'high'].map((difficulty) => [
      difficulty,
      questions.filter((question) => question.difficulty === difficulty).length,
    ]))).toEqual({ basic: 30, advanced: 30, high: 30 });
  });

  it('registers Grade 1 math Unit 5 with 30 unique candidates per difficulty and core coverage', () => {
    const group = manifest.groups.find(({ definition }) => definition.id === 'grade-1-term-1-math-unit-05');
    const questions = manifest.questions.filter(({ questionId }) => group?.questionIds.includes(questionId));

    expect(group?.definition).toMatchObject({
      kind: 'unit',
      grade: 1,
      semester: 1,
      subject: 'math',
      sourceUnitIds: [grade1MathUnit05SourceUnitId],
      coreKnowledgePointIds: [
        'number-sequence-within-ten',
        'number-composition-within-ten',
        'addition-within-ten',
        'subtraction-within-ten',
        'comparison-within-ten',
        'checking-within-ten',
      ],
    });
    expect(group?.releaseIntent).toBe('released');
    expect(questions).toHaveLength(90);
    expect(new Set(questions.map(({ questionId }) => questionId)).size).toBe(90);
    expect(Object.fromEntries(['basic', 'advanced', 'high'].map((difficulty) => [
      difficulty,
      questions.filter((question) => question.difficulty === difficulty).length,
    ]))).toEqual({ basic: 30, advanced: 30, high: 30 });
    expect(Object.fromEntries(['basic', 'advanced', 'high'].map((difficulty) => [
      difficulty,
      questions.filter((question) => question.difficulty === difficulty
        && question.activityId.includes('grade-1/term-1/math/unit-05/')).length,
    ]))).toEqual({ basic: 15, advanced: 15, high: 15 });
    expect(Object.fromEntries(['basic', 'advanced', 'high'].map((difficulty) => [
      difficulty,
      questions.filter((question) => question.difficulty === difficulty
        && question.activityId.startsWith('challenge-supplement-grade-1-term-1-math-unit-05-')).length,
    ]))).toEqual({ basic: 15, advanced: 15, high: 15 });
    for (const duplicateSourceId of [
      `${grade1MathUnit05SourceUnitId}/basic/task-01/session-01/question-02`,
      `${grade1MathUnit05SourceUnitId}/advanced/task-02/session-01/question-02`,
      `${grade1MathUnit05SourceUnitId}/high/task-01/session-01/question-02`,
    ]) {
      expect(questions.some(({ activityId }) => activityId === duplicateSourceId)).toBe(false);
    }
  });

  it('registers Grade 1 math Unit 6 with 30 in-scope candidates per difficulty', () => {
    const group = manifest.groups.find(({ definition }) => definition.id === 'grade-1-term-1-math-unit-06');
    const questions = manifest.questions.filter(({ questionId }) => group?.questionIds.includes(questionId));

    expect(group?.definition).toMatchObject({
      kind: 'unit',
      grade: 1,
      semester: 1,
      subject: 'math',
      sourceUnitIds: [grade1MathUnit06SourceUnitId],
      coreKnowledgePointIds: [
        'teen-number-composition',
        'number-sequence-eleven-to-twenty',
        'number-comparison-eleven-to-twenty',
      ],
    });
    expect(group?.releaseIntent).toBe('released');
    expect(questions).toHaveLength(90);
    expect(new Set(questions.map(({ questionId }) => questionId)).size).toBe(90);
    expect(Object.fromEntries(['basic', 'advanced', 'high'].map((difficulty) => [
      difficulty,
      questions.filter((question) => question.difficulty === difficulty).length,
    ]))).toEqual({ basic: 30, advanced: 30, high: 30 });
    expect(Object.fromEntries(['basic', 'advanced', 'high'].map((difficulty) => [
      difficulty,
      questions.filter((question) => question.difficulty === difficulty
        && question.activityId.startsWith('challenge-supplement-grade-1-term-1-math-unit-06-')).length,
    ]))).toEqual({ basic: 18, advanced: 16, high: 18 });
    expect(Object.fromEntries(['basic', 'advanced', 'high'].map((difficulty) => [
      difficulty,
      questions.filter((question) => question.difficulty === difficulty
        && question.activityId.startsWith(`${grade1MathUnit06SourceUnitId}/`)).length,
    ]))).toEqual({ basic: 12, advanced: 14, high: 12 });
    for (const excludedQuestionId of [
      `${grade1MathUnit06SourceUnitId}/basic/task-01/session-01/question-04`,
      `${grade1MathUnit06SourceUnitId}/basic/task-02/session-01/question-04`,
      `${grade1MathUnit06SourceUnitId}/basic/task-01/session-01/question-08`,
      `${grade1MathUnit06SourceUnitId}/basic/task-02/session-01/question-08`,
      `${grade1MathUnit06SourceUnitId}/advanced/task-01/session-01/question-04`,
      `${grade1MathUnit06SourceUnitId}/advanced/task-02/session-01/question-04`,
      `${grade1MathUnit06SourceUnitId}/high/task-01/session-01/question-04`,
      `${grade1MathUnit06SourceUnitId}/high/task-02/session-01/question-04`,
      `${grade1MathUnit06SourceUnitId}/high/task-01/session-01/question-08`,
      `${grade1MathUnit06SourceUnitId}/high/task-02/session-01/question-08`,
    ]) {
      expect(questions.some(({ activityId }) => activityId === excludedQuestionId)).toBe(false);
    }
  });

  it('registers Grade 1 math Unit 7 with 30 in-scope clock candidates per difficulty', () => {
    const group = manifest.groups.find(({ definition }) => definition.id === 'grade-1-term-1-math-unit-07');
    const questions = manifest.questions.filter(({ questionId }) => group?.questionIds.includes(questionId));

    expect(group?.definition).toMatchObject({
      kind: 'unit',
      grade: 1,
      semester: 1,
      subject: 'math',
      sourceUnitIds: [grade1MathUnit07SourceUnitId],
      coreKnowledgePointIds: ['clock-whole-hour-reading', 'clock-half-hour-reading', 'clock-hand-roles'],
    });
    expect(group?.releaseIntent).toBe('released');
    expect(questions).toHaveLength(90);
    expect(Object.fromEntries(['basic', 'advanced', 'high'].map((difficulty) => [
      difficulty,
      questions.filter((question) => question.difficulty === difficulty).length,
    ]))).toEqual({ basic: 30, advanced: 30, high: 30 });
    expect(Object.fromEntries(['basic', 'advanced', 'high'].map((difficulty) => [
      difficulty,
      questions.filter((question) => question.difficulty === difficulty
        && question.activityId.startsWith('challenge-supplement-grade-1-term-1-math-unit-07-')).length,
    ]))).toEqual({ basic: 15, advanced: 15, high: 15 });
    expect(Object.fromEntries(['basic', 'advanced', 'high'].map((difficulty) => [
      difficulty,
      questions.filter((question) => question.difficulty === difficulty
        && question.activityId.startsWith(`${grade1MathUnit07SourceUnitId}/`)).length,
    ]))).toEqual({ basic: 15, advanced: 15, high: 15 });
    for (const difficulty of ['basic', 'advanced', 'high']) {
      expect(questions.some(({ activityId }) => activityId === `${grade1MathUnit07SourceUnitId}/${difficulty}/task-02/session-01/question-04`)).toBe(false);
    }
  });

  it('registers Grade 1 math Unit 8 with 30 candidates per difficulty and all addition concepts', () => {
    const group = manifest.groups.find(({ definition }) => definition.id === 'grade-1-term-1-math-unit-08');
    const questions = manifest.questions.filter(({ questionId }) => group?.questionIds.includes(questionId));
    const sourceCandidates = questions.filter(({ activityId }) => activityId.startsWith(`${grade1MathUnit08SourceUnitId}/`));
    const supplementalCandidates = questions.filter(({ activityId }) => activityId.startsWith('challenge-supplement-grade-1-term-1-math-unit-08-'));

    expect(group?.definition).toMatchObject({
      kind: 'unit',
      grade: 1,
      semester: 1,
      subject: 'math',
      sourceUnitIds: [grade1MathUnit08SourceUnitId],
      coreKnowledgePointIds: [
        'make-ten-strategy',
        'carry-addition-within-twenty',
        'addition-within-twenty',
        'addition-situation-modeling',
        'addition-checking',
      ],
    });
    expect(group?.releaseIntent).toBe('released');
    expect(questions).toHaveLength(90);
    expect(sourceCandidates).toHaveLength(43);
    expect(supplementalCandidates).toHaveLength(47);
    expect(sourceCandidates.some(({ activityId }) => [
      `${grade1MathUnit08SourceUnitId}/advanced/task-01/session-01/question-01`,
      `${grade1MathUnit08SourceUnitId}/advanced/task-01/session-01/question-02`,
      `${grade1MathUnit08SourceUnitId}/high/task-01/session-01/question-01`,
      `${grade1MathUnit08SourceUnitId}/high/task-01/session-01/question-02`,
      `${grade1MathUnit08SourceUnitId}/high/task-02/session-01/question-02`,
    ].includes(activityId))).toBe(false);
    expect(Object.fromEntries(['basic', 'advanced', 'high'].map((difficulty) => [
      difficulty,
      questions.filter((question) => question.difficulty === difficulty).length,
    ]))).toEqual({ basic: 30, advanced: 30, high: 30 });
    expect(Object.fromEntries(['basic', 'advanced', 'high'].map((difficulty) => [
      difficulty,
      questions.filter((question) => question.difficulty === difficulty
        && question.activityId.startsWith('challenge-supplement-grade-1-term-1-math-unit-08-')).length,
    ]))).toEqual({ basic: 14, advanced: 16, high: 17 });
    expect(Object.fromEntries(['basic', 'advanced', 'high'].map((difficulty) => [
      difficulty,
      questions.filter((question) => question.difficulty === difficulty
        && question.activityId.startsWith(`${grade1MathUnit08SourceUnitId}/`)).length,
    ]))).toEqual({ basic: 16, advanced: 14, high: 13 });
  });

  it('registers Grade 1 math Unit 9 with an in-scope review pool and separate study links', () => {
    const group = manifest.groups.find(({ definition }) => definition.id === 'grade-1-term-1-math-unit-09');
    const questions = manifest.questions.filter(({ questionId }) => group?.questionIds.includes(questionId));
    const sourceCandidates = questions.filter(({ activityId }) => activityId.startsWith(`${grade1MathUnit09SourceUnitId}/`));
    const supplementalCandidates = questions.filter(({ activityId }) => activityId.startsWith('challenge-supplement-grade-1-term-1-math-unit-09-'));
    const excludedActivityIds = [
      `${grade1MathUnit09SourceUnitId}/basic/task-01/session-01/question-07`,
      `${grade1MathUnit09SourceUnitId}/basic/task-02/session-01/question-07`,
      `${grade1MathUnit09SourceUnitId}/advanced/task-01/session-01/question-07`,
      `${grade1MathUnit09SourceUnitId}/advanced/task-01/session-01/question-08`,
      `${grade1MathUnit09SourceUnitId}/advanced/task-02/session-01/question-07`,
      `${grade1MathUnit09SourceUnitId}/high/task-01/session-01/question-01`,
      `${grade1MathUnit09SourceUnitId}/high/task-01/session-01/question-07`,
      `${grade1MathUnit09SourceUnitId}/high/task-02/session-01/question-07`,
    ];

    expect(group?.definition).toMatchObject({
      kind: 'unit',
      grade: 1,
      semester: 1,
      subject: 'math',
      sourceUnitIds: [grade1MathUnit09SourceUnitId],
      learningTaskUnitIds: Array.from({ length: 9 }, (_, index) => `grade-1/term-1/math/unit-${String(index + 1).padStart(2, '0')}`),
      coreKnowledgePointIds: [
        'addition-within-twenty',
        'number-sequence-eleven-to-twenty',
        'comparison-within-ten',
        'number-comparison-eleven-to-twenty',
        'subtraction-within-ten',
        'relative-position',
        'solid-shape-recognition',
        'solid-shape-features',
        'solid-shape-use',
        'clock-whole-hour-reading',
        'clock-half-hour-reading',
      ],
    });
    expect(group?.releaseIntent).toBe('released');
    expect(questions).toHaveLength(90);
    expect(sourceCandidates).toHaveLength(40);
    expect(supplementalCandidates).toHaveLength(50);
    expect(sourceCandidates.some(({ activityId }) => excludedActivityIds.includes(activityId))).toBe(false);
    expect(Object.fromEntries(['basic', 'advanced', 'high'].map((difficulty) => [
      difficulty,
      questions.filter((question) => question.difficulty === difficulty).length,
    ]))).toEqual({ basic: 30, advanced: 30, high: 30 });
    expect(Object.fromEntries(['basic', 'advanced', 'high'].map((difficulty) => [
      difficulty,
      questions.filter((question) => question.difficulty === difficulty
        && question.activityId.startsWith('challenge-supplement-grade-1-term-1-math-unit-09-')).length,
    ]))).toEqual({ basic: 16, advanced: 17, high: 17 });
    expect(Object.fromEntries(['basic', 'advanced', 'high'].map((difficulty) => [
      difficulty,
      questions.filter((question) => question.difficulty === difficulty
        && question.activityId.startsWith(`${grade1MathUnit09SourceUnitId}/`)).length,
    ]))).toEqual({ basic: 14, advanced: 13, high: 13 });
  });

  it('registers the first-grade math unit as a complete candidate pool without changing the course tasks', () => {
    const group = manifest.groups.find(({ definition }) => definition.id === 'grade-1-term-1-math-unit-01');
    const questions = manifest.questions.filter(({ questionId }) => group?.questionIds.includes(questionId));

    expect(group?.definition).toMatchObject({
      kind: 'unit',
      grade: 1,
      semester: 1,
      subject: 'math',
      sourceUnitIds: [grade1MathSourceUnitId],
      coreKnowledgePointIds: ['counting-one-to-one', 'number-sequence', 'quantity-comparison', 'zero-as-none'],
    });
    expect(group?.releaseIntent).toBe('released');
    expect(questions).toHaveLength(90);
    expect(Object.fromEntries(['basic', 'advanced', 'high'].map((difficulty) => [
      difficulty,
      questions.filter((question) => question.difficulty === difficulty).length,
    ]))).toEqual({ basic: 30, advanced: 30, high: 30 });
  });

  it('keeps duplicate generated course questions out of the released pool and supplies unique replacements', () => {
    const group = manifest.groups.find(({ definition }) => definition.id === 'grade-1-term-1-math-unit-01')!;
    const duplicateCourseQuestionIds = [
      'challenge-question:grade-1/term-1/math/unit-01/high/task-01/session-01/question-02',
      'challenge-question:grade-1/term-1/math/unit-01/high/task-02/session-01/question-02',
    ];
    expect(duplicateCourseQuestionIds.every((questionId) => !group.questionIds.includes(questionId))).toBe(true);
    expect(grade1MathUnit01SupplementalActivities).toHaveLength(44);
    expect(Object.fromEntries(['basic', 'advanced', 'high'].map((difficulty) => [
      difficulty,
      grade1MathUnit01SupplementalActivities.filter((item) => item.difficulty === difficulty).length,
    ]))).toEqual({ basic: 14, advanced: 14, high: 16 });
  });

  it('keeps the Grade 3 English group scoped to its one confirmed textbook unit', () => {
    const englishGroup = manifest.groups.find(({ definition }) => definition.id === 'grade-3-term-1-english-unit-01');

    expect(englishGroup?.definition).toMatchObject({
      kind: 'unit',
      grade: 3,
      semester: 1,
      subject: 'english',
      sourceUnitIds: [englishSourceUnitId],
      coreKnowledgePointIds: ['name-and-self-introduction', 'age-and-class'],
    });
    expect(englishGroup?.questionIds).toHaveLength(90);
  });

  it('registers fourteen original English challenge candidates per difficulty', () => {
    const supplemental = manifest.questions.filter(({ activityId }) => activityId.startsWith(
      'challenge-supplement-grade-3-term-1-english-unit-01-',
    ));

    expect(supplemental).toHaveLength(42);
    expect(new Set(supplemental.map(({ activityId }) => activityId)).size).toBe(42);
    expect(Object.fromEntries(['basic', 'advanced', 'high'].map((difficulty) => [
      difficulty,
      supplemental.filter((question) => question.difficulty === difficulty).length,
    ]))).toEqual({ basic: 14, advanced: 14, high: 14 });
    expect(supplemental.every(({ knowledgePointIds }) => knowledgePointIds.length > 0)).toBe(true);
  });

  it('registers the high-grade Chinese pilot against its verified first-unit scope', () => {
    const chineseGroup = manifest.groups.find(({ definition }) => definition.id === 'grade-5-term-1-chinese-unit-01');

    expect(chineseGroup?.definition).toMatchObject({
      kind: 'unit',
      grade: 5,
      semester: 1,
      subject: 'chinese',
      sourceUnitIds: [chineseSourceUnitId],
      coreKnowledgePointIds: ['object-and-emotion', 'reading-evidence', 'class-charter', 'beloved-object-writing'],
    });
    expect(chineseGroup?.questionIds).toHaveLength(90);
    expect(chineseGroup?.releaseIntent).toBe('released');
  });

  it('registers fourteen original Chinese challenge candidates per difficulty', () => {
    const supplemental = manifest.questions.filter(({ activityId }) => activityId.startsWith(
      'challenge-supplement-grade-5-term-1-chinese-unit-01-',
    ));

    expect(supplemental).toHaveLength(42);
    expect(new Set(supplemental.map(({ activityId }) => activityId)).size).toBe(42);
    expect(Object.fromEntries(['basic', 'advanced', 'high'].map((difficulty) => [
      difficulty,
      supplemental.filter((question) => question.difficulty === difficulty).length,
    ]))).toEqual({ basic: 14, advanced: 14, high: 14 });
    expect(supplemental.every(({ knowledgePointIds }) => knowledgePointIds.length > 0)).toBe(true);
  });

  it('keeps chapter boundary evidence explicit and the unit group scoped to Unit 2', () => {
    const unitGroup = manifest.groups.find(({ definition }) => definition.kind === 'unit')!;
    const semesterGroup = manifest.groups.find(({ definition }) => definition.kind === 'semester')!;
    expect(unitGroup.definition.sourceUnitIds).toEqual([sourceUnitIds[1]]);
    expect(semesterGroup.definition.sourceUnitIds).toEqual(sourceUnitIds);
    expect(semesterGroup.definition.stage).toBe('first-half');
    expect(semesterGroup.definition.mappingEvidence.notes).toContain('first-half=01–04');
    expect(semesterGroup.definition.mappingEvidence.notes).toContain('不声称代表学校授课日历');
  });
});
