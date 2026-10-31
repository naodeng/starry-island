import { describe, expect, it, vi } from 'vitest';
import { curriculum } from '../content/curriculum';
import { curriculumManifest } from '../content/curriculumManifest';
import type { CurriculumProgressSource } from '../content/curriculumManifest';
import type { CurriculumUnit } from '../content/types';
import { getSessionsForDifficulty } from '../content/sessionUtils';
import type { ProgressState } from '../storage/progress';
import { resolveContinueLearningDestination, resolveLearningSessionDestination } from './continueLearning';

const UNIT_KEYS = [
  'grade-2/term-1/chinese/unit-01',
  'grade-2/term-1/chinese/unit-02',
  'grade-2/term-1/chinese/unit-03',
];
const emptyProgress: ProgressState = { schemaVersion: 4, completedSessionIds: [], recentCompletions: [], learningStart: null };

function createSource(unitKeys = UNIT_KEYS): CurriculumProgressSource {
  const source = structuredClone(curriculumManifest);
  const selected = new Set(unitKeys);
  source.grades = source.grades.flatMap((grade) => {
    const terms = grade.terms.flatMap((term) => {
      const subjects = term.subjects.flatMap((subject) => {
        const units = subject.units.filter((unit) => selected.has(`${grade.id}/${term.id}/${subject.id}/${unit.id}`));
        return units.length ? [{ ...subject, units }] : [];
      });
      return subjects.length ? [{ ...term, subjects }] : [];
    });
    return terms.length ? [{ ...grade, terms }] : [];
  });
  source.units = Object.fromEntries(unitKeys.map((key) => [key, source.units[key]!]));
  return source;
}

function createTestOptions(unitKeys = UNIT_KEYS) {
  const source = createSource(unitKeys);
  const loadUnit = vi.fn(async (unitKey: string): Promise<CurriculumUnit | undefined> => curriculum.units[unitKey]);
  return { source, loadUnit };
}

function getEntry(source: CurriculumProgressSource, unitKey: string) {
  const [gradeId, termId, subjectId, unitId] = unitKey.split('/');
  return source.grades.find((grade) => grade.id === gradeId)!
    .terms.find((term) => term.id === termId)!
    .subjects.find((subject) => subject.id === subjectId)!
    .units.find((unit) => unit.id === unitId)!;
}

describe('continue learning destinations', () => {
  it('resolvesOnlyRegisteredVerifiedOpenSessions', async () => {
    const { source, loadUnit } = createTestOptions([UNIT_KEYS[0]!]);
    const unit = curriculum.units[UNIT_KEYS[0]!];
    const advancedSession = getSessionsForDifficulty(unit, 'advanced')[0]!;

    const destination = await resolveLearningSessionDestination(advancedSession.id, { source, loadUnit });

    expect(destination).toMatchObject({
      path: `/${UNIT_KEYS[0]}/advanced/${advancedSession.id.split('/').at(-2)}/${advancedSession.id.split('/').at(-1)}`,
      difficulty: 'advanced',
      sessionTitle: advancedSession.title,
    });
    expect(await resolveLearningSessionDestination(`${advancedSession.id}/unknown`, { source, loadUnit })).toBeNull();
  });

  it('selectsEarliestIncompleteVerifiedBasicSession', async () => {
    const { source, loadUnit } = createTestOptions();
    const firstUnitSession = getSessionsForDifficulty(curriculum.units[UNIT_KEYS[0]!], 'basic')[0]!;

    const destination = await resolveContinueLearningDestination(emptyProgress, { source, loadUnit });

    expect(destination).toMatchObject({
      path: `/${UNIT_KEYS[0]}/basic/${firstUnitSession.id.split('/').at(-2)}/${firstUnitSession.id.split('/').at(-1)}`,
      sessionTitle: firstUnitSession.title,
    });
    expect(loadUnit).toHaveBeenCalledWith(UNIT_KEYS[0]);
  });

  it('skipsSessionsAssumedCompleteBeforeLearningStart', async () => {
    const { source, loadUnit } = createTestOptions();
    const nextUnitSession = getSessionsForDifficulty(curriculum.units[UNIT_KEYS[1]!], 'basic')[0]!;

    const destination = await resolveContinueLearningDestination({
      ...emptyProgress,
      learningStart: { grade: 2, term: 1, unit: 2 },
    }, { source, loadUnit });

    expect(destination?.path).toContain(`${UNIT_KEYS[1]}/basic/`);
    expect(destination?.sessionTitle).toBe(nextUnitSession.title);
    expect(loadUnit).not.toHaveBeenCalledWith(UNIT_KEYS[0]);
  });

  it('skipsComingSoonAndUnverifiedCurriculumEntries', async () => {
    const { source, loadUnit } = createTestOptions();
    getEntry(source, UNIT_KEYS[0]!).status = 'comingSoon';
    const unverifiedEntry = getEntry(source, UNIT_KEYS[1]!);
    const edition = source.textbooks[unverifiedEntry.textbookEditionId]!;
    const unverifiedEditionId = `${edition.id}-pending-test`;
    source.textbooks[unverifiedEditionId] = { ...edition, id: unverifiedEditionId, verificationStatus: 'pending' };
    unverifiedEntry.textbookEditionId = unverifiedEditionId;

    const destination = await resolveContinueLearningDestination(emptyProgress, { source, loadUnit });

    expect(destination?.path).toContain(`${UNIT_KEYS[2]}/basic/`);
    expect(loadUnit).toHaveBeenCalledTimes(1);
    expect(loadUnit).toHaveBeenCalledWith(UNIT_KEYS[2]);
  });

  it('returnsNullWhenAllBasicSessionsAreComplete', async () => {
    const { source, loadUnit } = createTestOptions(UNIT_KEYS.slice(0, 2));
    const completedSessionIds = UNIT_KEYS.slice(0, 2).flatMap((unitKey) => getSessionsForDifficulty(curriculum.units[unitKey]!, 'basic').map(({ id }) => id));

    const destination = await resolveContinueLearningDestination({ ...emptyProgress, completedSessionIds }, { source, loadUnit });

    expect(destination).toBeNull();
    expect(loadUnit).not.toHaveBeenCalled();
  });

  it('returnsNullWhenManifestSessionHasNoTaskOwner', async () => {
    const { source, loadUnit } = createTestOptions([UNIT_KEYS[0]!]);
    source.units[UNIT_KEYS[0]!] = {
      ...source.units[UNIT_KEYS[0]!]!,
      sessionIds: {
        basic: ['orphan-session-id'],
        advanced: [],
        high: [],
      },
    };

    const destination = await resolveContinueLearningDestination(emptyProgress, { source, loadUnit });

    expect(destination).toBeNull();
    expect(loadUnit).toHaveBeenCalledWith(UNIT_KEYS[0]);
  });
});
