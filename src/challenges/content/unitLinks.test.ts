import { describe, expect, it } from 'vitest';
import { curriculum } from '../../content/curriculum';
import pilotManifest from './pilotManifest';
import { getPilotUnitChallengeGroupId, PILOT_UNIT_GROUPS } from './unitLinks';

describe('getPilotUnitChallengeGroupId', () => {
  it('returns the contextual challenge only for the registered pilot unit', () => {
    expect(getPilotUnitChallengeGroupId('grade-2/term-1/math/unit-01')).toBe('grade-2-term-1-math-unit-01');
    expect(getPilotUnitChallengeGroupId('grade-2/term-1/math/unit-03')).toBe('grade-2-term-1-math-unit-03');
    expect(getPilotUnitChallengeGroupId('grade-2/term-1/math/unit-04')).toBe('grade-2-term-1-math-unit-04');
    expect(getPilotUnitChallengeGroupId('grade-2/term-1/math/unit-05')).toBe('grade-2-term-1-math-unit-05');
    expect(getPilotUnitChallengeGroupId('grade-2/term-1/math/unit-06')).toBe('grade-2-term-1-math-unit-06');
    expect(getPilotUnitChallengeGroupId('grade-2/term-1/math/unit-07')).toBeUndefined();
    expect(getPilotUnitChallengeGroupId('grade-2/term-1/math/unit-08')).toBeUndefined();
    expect(getPilotUnitChallengeGroupId('grade-2/term-1/math/unit-09')).toBeUndefined();
    expect(getPilotUnitChallengeGroupId('grade-2/term-1/english/unit-01')).toBe('grade-2-term-1-english-unit-01');
    expect(getPilotUnitChallengeGroupId('grade-2/term-1/english/unit-02')).toBe('grade-2-term-1-english-unit-02');
    expect(getPilotUnitChallengeGroupId('grade-2/term-1/english/unit-03')).toBe('grade-2-term-1-english-unit-03');
    expect(getPilotUnitChallengeGroupId('grade-2/term-1/english/unit-05')).toBe('grade-2-term-1-english-unit-05');
    expect(getPilotUnitChallengeGroupId('grade-2/term-1/english/unit-06')).toBe('grade-2-term-1-english-unit-06');
    expect(getPilotUnitChallengeGroupId('grade-2/term-1/math/unit-02')).toBe('grade-2-term-1-math-unit-02');
    expect(getPilotUnitChallengeGroupId('grade-2/term-1/chinese/unit-02')).toBe('grade-2-term-1-chinese-unit-02');
    expect(getPilotUnitChallengeGroupId('grade-2/term-1/chinese/unit-03')).toBe('grade-2-term-1-chinese-unit-03');
    expect(getPilotUnitChallengeGroupId('grade-2/term-1/chinese/unit-04')).toBe('grade-2-term-1-chinese-unit-04');
    expect(getPilotUnitChallengeGroupId('grade-2/term-1/chinese/unit-05')).toBe('grade-2-term-1-chinese-unit-05');
    expect(getPilotUnitChallengeGroupId('grade-2/term-1/chinese/unit-06')).toBe('grade-2-term-1-chinese-unit-06');
    expect(getPilotUnitChallengeGroupId('grade-2/term-1/chinese/unit-07')).toBe('grade-2-term-1-chinese-unit-07');
    expect(getPilotUnitChallengeGroupId('grade-2/term-1/chinese/unit-08')).toBe('grade-2-term-1-chinese-unit-08');
    expect(getPilotUnitChallengeGroupId('grade-2/term-2/chinese/unit-01')).toBe('grade-2-term-2-chinese-unit-01');
    expect(getPilotUnitChallengeGroupId('grade-2/term-2/chinese/unit-02')).toBe('grade-2-term-2-chinese-unit-02');
    expect(getPilotUnitChallengeGroupId('grade-2/term-2/english/unit-01')).toBe('grade-2-term-2-english-unit-01');
    expect(getPilotUnitChallengeGroupId('grade-2/term-2/english/unit-02')).toBe('grade-2-term-2-english-unit-02');
    expect(getPilotUnitChallengeGroupId('grade-2/term-2/math/unit-01')).toBe('grade-2-term-2-math-unit-01');
    expect(getPilotUnitChallengeGroupId('grade-2/term-2/math/unit-02')).toBe('grade-2-term-2-math-unit-02');
    expect(getPilotUnitChallengeGroupId('grade-2/term-2/chinese/unit-08')).toBe('grade-2-term-2-chinese-unit-08');
    expect(getPilotUnitChallengeGroupId('grade-2/term-2/math/unit-03')).toBe('grade-2-term-2-math-unit-03');
    expect(getPilotUnitChallengeGroupId('grade-2/term-2/english/unit-03')).toBe('grade-2-term-2-english-unit-03');
    for (let unit = 4; unit <= 10; unit += 1) {
      const unitNumber = String(unit).padStart(2, '0');
      expect(getPilotUnitChallengeGroupId(`grade-2/term-2/math/unit-${unitNumber}`)).toBe(`grade-2-term-2-math-unit-${unitNumber}`);
    }
    for (let unit = 4; unit <= 6; unit += 1) {
      const unitNumber = String(unit).padStart(2, '0');
      expect(getPilotUnitChallengeGroupId(`grade-2/term-2/english/unit-${unitNumber}`)).toBe(`grade-2-term-2-english-unit-${unitNumber}`);
    }
    expect(getPilotUnitChallengeGroupId('grade-2/term-2/chinese/unit-05')).toBe('grade-2-term-2-chinese-unit-05');
    expect(getPilotUnitChallengeGroupId('grade-2/term-2/chinese/unit-06')).toBe('grade-2-term-2-chinese-unit-06');
    expect(getPilotUnitChallengeGroupId('grade-2/term-2/chinese/unit-07')).toBe('grade-2-term-2-chinese-unit-07');
    expect(getPilotUnitChallengeGroupId('grade-2/term-2/chinese/unit-04')).toBe('grade-2-term-2-chinese-unit-04');
    expect(getPilotUnitChallengeGroupId('grade-3/term-1/english/unit-01')).toBe('grade-3-term-1-english-unit-01');
    expect(getPilotUnitChallengeGroupId('grade-5/term-1/chinese/unit-01')).toBe('grade-5-term-1-chinese-unit-01');
    expect(getPilotUnitChallengeGroupId('grade-1/term-1/math/unit-01')).toBe('grade-1-term-1-math-unit-01');
    expect(getPilotUnitChallengeGroupId('grade-1/term-2/math/unit-01')).toBe('grade-1-term-2-math-unit-01');
    expect(getPilotUnitChallengeGroupId('grade-1/term-2/math/unit-02')).toBe('grade-1-term-2-math-unit-02');
    expect(getPilotUnitChallengeGroupId('grade-1/term-2/math/unit-03')).toBe('grade-1-term-2-math-unit-03');
    expect(getPilotUnitChallengeGroupId('grade-1/term-2/math/unit-04')).toBe('grade-1-term-2-math-unit-04');
    expect(getPilotUnitChallengeGroupId('grade-1/term-2/math/unit-05')).toBe('grade-1-term-2-math-unit-05');
    expect(getPilotUnitChallengeGroupId('grade-1/term-2/math/unit-06')).toBe('grade-1-term-2-math-unit-06');
    expect(getPilotUnitChallengeGroupId('grade-1/term-2/math/unit-07')).toBe('grade-1-term-2-math-unit-07');
    expect(getPilotUnitChallengeGroupId('grade-1/term-2/math/unit-08')).toBe('grade-1-term-2-math-unit-08');
    expect(getPilotUnitChallengeGroupId('grade-1/term-2/english/unit-01')).toBe('grade-1-term-2-english-unit-01');
    expect(getPilotUnitChallengeGroupId('grade-1/term-2/english/unit-02')).toBe('grade-1-term-2-english-unit-02');
    expect(getPilotUnitChallengeGroupId('grade-1/term-2/english/unit-03')).toBe('grade-1-term-2-english-unit-03');
    expect(getPilotUnitChallengeGroupId('grade-1/term-2/english/unit-04')).toBe('grade-1-term-2-english-unit-04');
    expect(getPilotUnitChallengeGroupId('grade-1/term-2/english/unit-05')).toBe('grade-1-term-2-english-unit-05');
    expect(getPilotUnitChallengeGroupId('grade-1/term-2/english/unit-06')).toBe('grade-1-term-2-english-unit-06');
    expect(getPilotUnitChallengeGroupId('grade-1/term-1/math/unit-02')).toBe('grade-1-term-1-math-unit-02');
    expect(getPilotUnitChallengeGroupId('grade-1/term-1/math/unit-03')).toBe('grade-1-term-1-math-unit-03');
    expect(getPilotUnitChallengeGroupId('grade-1/term-1/math/unit-04')).toBe('grade-1-term-1-math-unit-04');
    expect(getPilotUnitChallengeGroupId('grade-1/term-1/math/unit-05')).toBe('grade-1-term-1-math-unit-05');
    expect(getPilotUnitChallengeGroupId('grade-1/term-1/math/unit-06')).toBe('grade-1-term-1-math-unit-06');
    expect(getPilotUnitChallengeGroupId('grade-1/term-1/math/unit-07')).toBe('grade-1-term-1-math-unit-07');
    expect(getPilotUnitChallengeGroupId('grade-1/term-1/math/unit-08')).toBe('grade-1-term-1-math-unit-08');
    expect(getPilotUnitChallengeGroupId('grade-1/term-1/math/unit-09')).toBe('grade-1-term-1-math-unit-09');
    expect(getPilotUnitChallengeGroupId('grade-1/term-1/english/unit-03')).toBe('grade-1-term-1-english-unit-03');
    expect(getPilotUnitChallengeGroupId('grade-1/term-1/english/unit-04')).toBe('grade-1-term-1-english-unit-04');
    expect(getPilotUnitChallengeGroupId('grade-1/term-1/english/unit-05')).toBe('grade-1-term-1-english-unit-05');
    expect(getPilotUnitChallengeGroupId('grade-1/term-1/english/unit-06')).toBe('grade-1-term-1-english-unit-06');
  });

  it('only links curriculum units to challenge groups that are registered in the current manifest', () => {
    const registeredGroupIds = new Set(pilotManifest.groups.map(({ definition }) => definition.id));
    const linkedGroupIds = curriculum.grades.flatMap((grade) => grade.terms.flatMap((term) => term.subjects.flatMap((subject) => subject.units
      .map(({ curriculumUnitKey }) => curriculumUnitKey ? getPilotUnitChallengeGroupId(curriculumUnitKey) : undefined)
      .filter((groupId): groupId is string => groupId !== undefined))));

    expect(linkedGroupIds.filter((groupId) => !registeredGroupIds.has(groupId))).toEqual([]);
  });

  it('keeps every explicit course-context link attached to an existing challenge group', () => {
    const registeredGroupIds = new Set(pilotManifest.groups.map(({ definition }) => definition.id));
    const staleLinks = Object.entries(PILOT_UNIT_GROUPS).filter(([, groupId]) => !registeredGroupIds.has(groupId));

    expect(staleLinks).toEqual([]);
  });
});
