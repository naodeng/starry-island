import { describe, expect, it } from 'vitest';
import type { ChallengeManifest } from '../domain/types';
import { loadChallengeQualityInputs } from './qualityInputs';
import rawManifest from './pilotManifest';
import { pilotSupplementalActivities } from './pilotSupplementalActivities';
import { pilotEnglishSupplementalActivities } from './pilotEnglishSupplementalActivities';
import { grade1Term1EnglishUnit04SupplementalActivities } from './grade1Term1EnglishUnit04SupplementalActivities';
import { grade1Term1EnglishUnit05SupplementalActivities } from './grade1Term1EnglishUnit05SupplementalActivities';
import { grade1Term1EnglishUnit06SupplementalActivities } from './grade1Term1EnglishUnit06SupplementalActivities';
import { grade1Term2MathUnit01SupplementalActivities } from './grade1Term2MathUnit01SupplementalActivities';
import { grade1Term2MathUnit02SupplementalActivities } from './grade1Term2MathUnit02SupplementalActivities';
import { grade1Term2MathUnit06SupplementalActivities } from './grade1Term2MathUnit06SupplementalActivities';
import { grade1Term2MathUnit07SupplementalActivities } from './grade1Term2MathUnit07SupplementalActivities';
import { grade1Term2MathUnit08SupplementalActivities } from './grade1Term2MathUnit08SupplementalActivities';
import { grade1Term2EnglishUnit01SupplementalActivities } from './grade1Term2EnglishUnit01SupplementalActivities';
import { grade1Term2EnglishUnit02SupplementalActivities } from './grade1Term2EnglishUnit02SupplementalActivities';
import { grade1Term2EnglishUnit03SupplementalActivities } from './grade1Term2EnglishUnit03SupplementalActivities';
import { grade1Term2EnglishUnit04SupplementalActivities } from './grade1Term2EnglishUnit04SupplementalActivities';
import { grade1Term2EnglishUnit05SupplementalActivities } from './grade1Term2EnglishUnit05SupplementalActivities';
import { grade1Term2EnglishUnit06SupplementalActivities } from './grade1Term2EnglishUnit06SupplementalActivities';
import { grade1Term2ChineseSemesterSupplementalActivities } from './grade1Term2ChineseSemesterSupplementalActivities';
import { grade2Term1ChineseUnit04SupplementalActivities } from './grade2Term1ChineseUnit04SupplementalActivities';
import { grade2Term1ChineseUnit05SupplementalActivities } from './grade2Term1ChineseUnit05SupplementalActivities';
import { grade2Term1ChineseUnit06SupplementalActivities } from './grade2Term1ChineseUnit06SupplementalActivities';
import { grade2Term1ChineseUnit07SupplementalActivities } from './grade2Term1ChineseUnit07SupplementalActivities';
import { grade2Term1ChineseUnit08SupplementalActivities } from './grade2Term1ChineseUnit08SupplementalActivities';
import { grade2Term1MathUnit04SupplementalActivities } from './grade2Term1MathUnit04SupplementalActivities';
import { grade2Term1MathTextbookSupplementalActivities } from './grade2Term1MathTextbookSupplementalActivities';
import { grade2Term1EnglishUnit01SupplementalActivities } from './grade2Term1EnglishUnit01SupplementalActivities';
import { grade2Term1EnglishUnit02SupplementalActivities } from './grade2Term1EnglishUnit02SupplementalActivities';
import { grade2Term1EnglishUnit03SupplementalActivities } from './grade2Term1EnglishUnit03SupplementalActivities';
import { validateChallengeManifest } from './validateManifest';

function clonePilotManifest(): ChallengeManifest {
  return structuredClone(rawManifest) as unknown as ChallengeManifest;
}

describe('loadChallengeQualityInputs', () => {
  it('keeps supplemental question sources correct when another unit group is listed first', async () => {
    const manifest = clonePilotManifest();
    const currentUnitGroup = manifest.groups.find(({ definition }) => definition.kind === 'unit')!;
    const plannedUnitGroup = structuredClone(currentUnitGroup);
    plannedUnitGroup.definition.id = 'grade-2-term-1-math-unit-01-planned';
    plannedUnitGroup.definition.sourceUnitIds = ['grade-2/term-1/math/unit-01'];
    plannedUnitGroup.questionIds = [];
    plannedUnitGroup.releaseIntent = 'planned';
    plannedUnitGroup.definition.tasks = plannedUnitGroup.definition.tasks.map((task, index) => ({
      ...task,
      id: `${plannedUnitGroup.definition.id}/task-${index + 1}`,
    })) as ChallengeManifest['groups'][number]['definition']['tasks'];
    manifest.groups.unshift(plannedUnitGroup);

    const input = await loadChallengeQualityInputs(manifest);
    const supplemental = pilotSupplementalActivities[0];

    expect(input.manifest.groups[0].definition.id).toBe(plannedUnitGroup.definition.id);
    expect(input.sourceUnitByActivityId.get(supplemental.activity.id)).toBe('grade-2/term-1/math/unit-02');
  });

  it('loads supplemental question sources for a semester-only manifest', async () => {
    const manifest = clonePilotManifest();
    manifest.groups = manifest.groups.filter(({ definition }) => definition.id === 'grade-2-term-1-math-first-half');
    const referencedQuestionIds = new Set(manifest.groups.flatMap(({ questionIds }) => questionIds));
    manifest.questions = manifest.questions.filter(({ questionId }) => referencedQuestionIds.has(questionId));

    const input = await loadChallengeQualityInputs(manifest);

    expect(input.manifest.groups).toHaveLength(1);
    expect(input.manifest.groups[0].definition.kind).toBe('semester');
    expect(input.sourceUnitByActivityId.get(pilotSupplementalActivities[0].activity.id)).toBe('grade-2/term-1/math/unit-02');
  });

  it('loads Grade 3 English supplemental activities from their declared unit', async () => {
    const manifest = clonePilotManifest();
    const activityId = pilotEnglishSupplementalActivities.find(({ difficulty }) => difficulty === 'basic')!.activity.id;
    const question = manifest.questions.find(({ activityId: id }) => id === activityId);
    const input = await loadChallengeQualityInputs(manifest);

    expect(question).toBeDefined();
    expect(input.activitiesById.has(activityId)).toBe(true);
    expect(input.sourceUnitByActivityId.get(activityId)).toBe('grade-3/term-1/english/unit-01');
  });

  it('loads Grade 1 English Unit 4 supplemental activities from their declared unit', async () => {
    const manifest = clonePilotManifest();
    const activityId = grade1Term1EnglishUnit04SupplementalActivities[0]!.activity.id;
    const question = manifest.questions.find(({ activityId: id }) => id === activityId);
    const input = await loadChallengeQualityInputs(manifest);

    expect(question).toBeDefined();
    expect(input.activitiesById.has(activityId)).toBe(true);
    expect(input.sourceUnitByActivityId.get(activityId)).toBe('grade-1/term-1/english/unit-04');
  });

  it('loads Grade 1 English Unit 5 supplemental activities from their declared unit', async () => {
    const manifest = clonePilotManifest();
    const activityId = grade1Term1EnglishUnit05SupplementalActivities[0]!.activity.id;
    const question = manifest.questions.find(({ activityId: id }) => id === activityId);
    const input = await loadChallengeQualityInputs(manifest);

    expect(question).toBeDefined();
    expect(input.activitiesById.has(activityId)).toBe(true);
    expect(input.sourceUnitByActivityId.get(activityId)).toBe('grade-1/term-1/english/unit-05');
  });

  it('loads Grade 1 English Unit 6 supplemental activities from their declared unit', async () => {
    const manifest = clonePilotManifest();
    const activityId = grade1Term1EnglishUnit06SupplementalActivities[0]!.activity.id;
    const question = manifest.questions.find(({ activityId: id }) => id === activityId);
    const input = await loadChallengeQualityInputs(manifest);

    expect(question).toBeDefined();
    expect(input.activitiesById.has(activityId)).toBe(true);
    expect(input.sourceUnitByActivityId.get(activityId)).toBe('grade-1/term-1/english/unit-06');
  });

  it('loads Grade 1 Term 2 Math Unit 1 supplemental activities from their declared unit', async () => {
    const manifest = clonePilotManifest();
    const activityId = grade1Term2MathUnit01SupplementalActivities[0]!.activity.id;
    const question = manifest.questions.find(({ activityId: id }) => id === activityId);
    const input = await loadChallengeQualityInputs(manifest);

    expect(question).toBeDefined();
    expect(input.activitiesById.has(activityId)).toBe(true);
    expect(input.sourceUnitByActivityId.get(activityId)).toBe('grade-1/term-2/math/unit-01');
  });

  it('loads Grade 1 Term 2 Math Unit 2 supplemental activities from their declared unit', async () => {
    const manifest = clonePilotManifest();
    const activityId = grade1Term2MathUnit02SupplementalActivities[0]!.activity.id;
    const question = manifest.questions.find(({ activityId: id }) => id === activityId);
    const input = await loadChallengeQualityInputs(manifest);

    expect(question).toBeDefined();
    expect(input.activitiesById.has(activityId)).toBe(true);
    expect(input.sourceUnitByActivityId.get(activityId)).toBe('grade-1/term-2/math/unit-02');
  });

  it('loads Grade 1 Term 2 Math Unit 6 supplemental activities from their declared unit', async () => {
    const manifest = clonePilotManifest();
    const activityId = grade1Term2MathUnit06SupplementalActivities[0]!.activity.id;
    const question = manifest.questions.find(({ activityId: id }) => id === activityId);
    const input = await loadChallengeQualityInputs(manifest);

    expect(question).toBeDefined();
    expect(input.activitiesById.has(activityId)).toBe(true);
    expect(input.sourceUnitByActivityId.get(activityId)).toBe('grade-1/term-2/math/unit-06');
  });

  it('loads Grade 1 Term 2 Math Unit 7 supplemental activities from their declared unit', async () => {
    const activityId = grade1Term2MathUnit07SupplementalActivities[0]!.activity.id;
    const question = rawManifest.questions.find(({ activityId: id }) => id === activityId);
    const input = await loadChallengeQualityInputs(rawManifest);

    expect(question).toBeDefined();
    expect(input.activitiesById.has(activityId)).toBe(true);
    expect(input.sourceUnitByActivityId.get(activityId)).toBe('grade-1/term-2/math/unit-07');
  });

  it('loads Grade 1 Term 2 Math Unit 8 supplemental activities from their declared unit', async () => {
    const activityId = grade1Term2MathUnit08SupplementalActivities[0]!.activity.id;
    const question = rawManifest.questions.find(({ activityId: id }) => id === activityId);
    const input = await loadChallengeQualityInputs(rawManifest);

    expect(question).toBeDefined();
    expect(input.activitiesById.has(activityId)).toBe(true);
    expect(input.sourceUnitByActivityId.get(activityId)).toBe('grade-1/term-2/math/unit-08');
  });

  it('loads Grade 1 Term 2 English Unit 1 supplemental activities from their declared unit', async () => {
    const activityId = grade1Term2EnglishUnit01SupplementalActivities[0]!.activity.id;
    const question = rawManifest.questions.find(({ activityId: id }) => id === activityId);
    const input = await loadChallengeQualityInputs(rawManifest);

    expect(question).toBeDefined();
    expect(input.activitiesById.has(activityId)).toBe(true);
    expect(input.sourceUnitByActivityId.get(activityId)).toBe('grade-1/term-2/english/unit-01');
  });

  it('loads Grade 1 Term 2 English Unit 2 supplemental activities from their declared unit', async () => {
    const activityId = grade1Term2EnglishUnit02SupplementalActivities[0]!.activity.id;
    const question = rawManifest.questions.find(({ activityId: id }) => id === activityId);
    const input = await loadChallengeQualityInputs(rawManifest);

    expect(question).toBeDefined();
    expect(input.activitiesById.has(activityId)).toBe(true);
    expect(input.sourceUnitByActivityId.get(activityId)).toBe('grade-1/term-2/english/unit-02');
  });

  it('loads Grade 1 Term 2 English Unit 3 supplemental activities from their declared unit', async () => {
    const manifest = clonePilotManifest();
    const activityId = grade1Term2EnglishUnit03SupplementalActivities[0]!.activity.id;
    const question = manifest.questions.find(({ activityId: id }) => id === activityId);
    const input = await loadChallengeQualityInputs(manifest);

    expect(question).toBeDefined();
    expect(input.activitiesById.has(activityId)).toBe(true);
    expect(input.sourceUnitByActivityId.get(activityId)).toBe('grade-1/term-2/english/unit-03');
  });

  it('loads Grade 1 Term 2 English Unit 4 supplemental activities from their declared unit', async () => {
    const manifest = clonePilotManifest();
    const activityId = grade1Term2EnglishUnit04SupplementalActivities[0]!.activity.id;
    const question = manifest.questions.find(({ activityId: id }) => id === activityId);
    const input = await loadChallengeQualityInputs(manifest);

    expect(question).toBeDefined();
    expect(input.activitiesById.has(activityId)).toBe(true);
    expect(input.sourceUnitByActivityId.get(activityId)).toBe('grade-1/term-2/english/unit-04');
  });

  it('loads Grade 2 Chinese Unit 4 supplemental activities from their declared unit', async () => {
    const manifest = clonePilotManifest();
    const activityId = grade2Term1ChineseUnit04SupplementalActivities[0]!.activity.id;
    const question = manifest.questions.find(({ activityId: id }) => id === activityId);
    const input = await loadChallengeQualityInputs(manifest);

    expect(question).toBeDefined();
    expect(input.activitiesById.has(activityId)).toBe(true);
    expect(input.sourceUnitByActivityId.get(activityId)).toBe('grade-2/term-1/chinese/unit-04');
  });

  it('loads Grade 2 Chinese Unit 5 supplemental activities from their declared unit', async () => {
    const manifest = clonePilotManifest();
    const activityId = grade2Term1ChineseUnit05SupplementalActivities[0]!.activity.id;
    const question = manifest.questions.find(({ activityId: id }) => id === activityId);
    const input = await loadChallengeQualityInputs(manifest);

    expect(question).toBeDefined();
    expect(input.activitiesById.has(activityId)).toBe(true);
    expect(input.sourceUnitByActivityId.get(activityId)).toBe('grade-2/term-1/chinese/unit-05');
  });

  it('loads Grade 2 Chinese Unit 6 supplemental activities from their declared unit', async () => {
    const manifest = clonePilotManifest();
    const activityId = grade2Term1ChineseUnit06SupplementalActivities[0]!.activity.id;
    const question = manifest.questions.find(({ activityId: id }) => id === activityId);
    const input = await loadChallengeQualityInputs(manifest);

    expect(question).toBeDefined();
    expect(input.activitiesById.has(activityId)).toBe(true);
    expect(input.sourceUnitByActivityId.get(activityId)).toBe('grade-2/term-1/chinese/unit-06');
  });

  it('loads Grade 2 Chinese Unit 7 supplemental activities from their declared unit', async () => {
    const manifest = clonePilotManifest();
    const activityId = grade2Term1ChineseUnit07SupplementalActivities[0]!.activity.id;
    const question = manifest.questions.find(({ activityId: id }) => id === activityId);
    const input = await loadChallengeQualityInputs(manifest);

    expect(question).toBeDefined();
    expect(input.activitiesById.has(activityId)).toBe(true);
    expect(input.sourceUnitByActivityId.get(activityId)).toBe('grade-2/term-1/chinese/unit-07');
  });

  it('loads Grade 2 Chinese Unit 8 supplemental activities from their declared unit', async () => {
    const manifest = clonePilotManifest();
    const activityId = grade2Term1ChineseUnit08SupplementalActivities[0]!.activity.id;
    const question = manifest.questions.find(({ activityId: id }) => id === activityId);
    const input = await loadChallengeQualityInputs(manifest);

    expect(question).toBeDefined();
    expect(input.activitiesById.has(activityId)).toBe(true);
    expect(input.sourceUnitByActivityId.get(activityId)).toBe('grade-2/term-1/chinese/unit-08');
  });

  it('loads Grade 2 Math Unit 4 supplemental activities from their declared unit', async () => {
    const manifest = clonePilotManifest();
    const activityId = grade2Term1MathUnit04SupplementalActivities[0]!.activity.id;
    const question = manifest.questions.find(({ activityId: id }) => id === activityId);
    const input = await loadChallengeQualityInputs(manifest);

    expect(question).toBeDefined();
    expect(input.activitiesById.has(activityId)).toBe(true);
    expect(input.sourceUnitByActivityId.get(activityId)).toBe('grade-2/term-1/math/unit-04');
  });

  it('loads Grade 2 Math Unit 5 supplemental activities from their declared unit', async () => {
    const manifest = clonePilotManifest();
    const activityId = grade2Term1MathTextbookSupplementalActivities.find(({ sourceUnitId }) => sourceUnitId.endsWith('unit-05'))!.activity.id;
    const question = manifest.questions.find(({ activityId: id }) => id === activityId);
    const input = await loadChallengeQualityInputs(manifest);

    expect(question).toBeDefined();
    expect(input.activitiesById.has(activityId)).toBe(true);
    expect(input.sourceUnitByActivityId.get(activityId)).toBe('grade-2/term-1/math/unit-05');
  });

  it('loads Grade 2 Math Unit 6 supplemental activities from their declared unit', async () => {
    const manifest = clonePilotManifest();
    const activityId = grade2Term1MathTextbookSupplementalActivities.find(({ sourceUnitId }) => sourceUnitId.endsWith('unit-06'))!.activity.id;
    const question = manifest.questions.find(({ activityId: id }) => id === activityId);
    const input = await loadChallengeQualityInputs(manifest);

    expect(question).toBeDefined();
    expect(input.activitiesById.has(activityId)).toBe(true);
    expect(input.sourceUnitByActivityId.get(activityId)).toBe('grade-2/term-1/math/unit-06');
  });

  it('loads Grade 2 English Unit 1 supplemental activities from their declared unit', async () => {
    const manifest = clonePilotManifest();
    const activityId = grade2Term1EnglishUnit01SupplementalActivities[0]!.activity.id;
    const question = manifest.questions.find(({ activityId: id }) => id === activityId);
    const input = await loadChallengeQualityInputs(manifest);

    expect(grade2Term1EnglishUnit01SupplementalActivities).toHaveLength(54);
    expect(question).toBeDefined();
    expect(input.activitiesById.has(activityId)).toBe(true);
    expect(input.sourceUnitByActivityId.get(activityId)).toBe('grade-2/term-1/english/unit-01');
  });

  it('loads Grade 2 English Unit 2 supplemental activities from their declared unit', async () => {
    const manifest = clonePilotManifest();
    const activityId = grade2Term1EnglishUnit02SupplementalActivities[0]!.activity.id;
    const question = manifest.questions.find(({ activityId: id }) => id === activityId);
    const input = await loadChallengeQualityInputs(manifest);

    expect(grade2Term1EnglishUnit02SupplementalActivities).toHaveLength(54);
    expect(question).toBeDefined();
    expect(input.activitiesById.has(activityId)).toBe(true);
    expect(input.sourceUnitByActivityId.get(activityId)).toBe('grade-2/term-1/english/unit-02');
  });

  it('loads Grade 2 English Unit 3 supplemental activities from their declared unit', async () => {
    const manifest = clonePilotManifest();
    const activityId = grade2Term1EnglishUnit03SupplementalActivities[0]!.activity.id;
    const question = manifest.questions.find(({ activityId: id }) => id === activityId);
    const input = await loadChallengeQualityInputs(manifest);

    expect(grade2Term1EnglishUnit03SupplementalActivities).toHaveLength(56);
    expect(question).toBeDefined();
    expect(input.activitiesById.has(activityId)).toBe(true);
    expect(input.sourceUnitByActivityId.get(activityId)).toBe('grade-2/term-1/english/unit-03');
  });

  it('loads Grade 1 Term 2 English Unit 5 supplemental activities from their declared unit', async () => {
    const manifest = clonePilotManifest();
    const activityId = grade1Term2EnglishUnit05SupplementalActivities[0]!.activity.id;
    const question = manifest.questions.find(({ activityId: id }) => id === activityId);
    const input = await loadChallengeQualityInputs(manifest);

    expect(question).toBeDefined();
    expect(input.activitiesById.has(activityId)).toBe(true);
    expect(input.sourceUnitByActivityId.get(activityId)).toBe('grade-1/term-2/english/unit-05');
  });

  it('loads Grade 1 Term 2 English Unit 6 supplemental activities from their declared unit', async () => {
    const manifest = clonePilotManifest();
    const activityId = grade1Term2EnglishUnit06SupplementalActivities[0]!.activity.id;
    const question = manifest.questions.find(({ activityId: id }) => id === activityId);
    const input = await loadChallengeQualityInputs(manifest);

    expect(question).toBeDefined();
    expect(input.activitiesById.has(activityId)).toBe(true);
    expect(input.sourceUnitByActivityId.get(activityId)).toBe('grade-1/term-2/english/unit-06');
  });

  it('loads Grade 1 Term 2 Chinese semester supplements from their mapped themes', async () => {
    const activityId = grade1Term2ChineseSemesterSupplementalActivities[0]!.activity.id;
    const question = rawManifest.questions.find(({ activityId: id }) => id === activityId);
    const input = await loadChallengeQualityInputs(rawManifest);

    expect(question).toBeDefined();
    expect(input.activitiesById.has(activityId)).toBe(true);
    expect(input.sourceUnitByActivityId.get(activityId)).toBe('grade-1/term-2/chinese/unit-01');
  });

  it('blocks Grade 1 Term 1 review links that point to a different term', async () => {
    const manifest = clonePilotManifest();
    const reviewGroup = manifest.groups.find(({ definition }) => definition.id === 'grade-1-term-1-math-unit-09')!;
    reviewGroup.definition.learningTaskUnitIds = ['grade-1/term-2/math/unit-01'];
    const input = await loadChallengeQualityInputs(manifest);

    const report = await validateChallengeManifest(
      input.manifest,
      input.activitiesById,
      input.sourceUnitByActivityId,
      input.unitsById,
    );

    expect(report.groupIssuesById[reviewGroup.definition.id]).toContainEqual(expect.objectContaining({
      code: 'mismatched-learning-task-unit',
      path: `groups.${reviewGroup.definition.id}.learningTaskUnitIds`,
    }));
  });
});
