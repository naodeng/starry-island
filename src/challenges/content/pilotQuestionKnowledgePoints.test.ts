import { describe, expect, it } from 'vitest';
import type { ActivityDefinition } from '../../content/types';
import { loadUnit } from '../../content/unitLoader';
import { derivePilotQuestionKnowledgePointIds } from './pilotQuestionKnowledgePoints';
import { grade1MathUnit09SupplementalActivities } from './grade1MathUnit09SupplementalActivities';
import { grade1MathUnit08SupplementalActivities } from './grade1MathUnit08SupplementalActivities';
import { grade1Term2MathUnit02SupplementalActivities } from './grade1Term2MathUnit02SupplementalActivities';
import { grade1Term2MathUnit03SupplementalActivities } from './grade1Term2MathUnit03SupplementalActivities';
import { grade1Term2MathUnit04SupplementalActivities } from './grade1Term2MathUnit04SupplementalActivities';
import { grade1Term2MathUnit05SupplementalActivities } from './grade1Term2MathUnit05SupplementalActivities';
import { grade1Term2MathUnit06SupplementalActivities } from './grade1Term2MathUnit06SupplementalActivities';
import { grade1Term2MathUnit07SupplementalActivities } from './grade1Term2MathUnit07SupplementalActivities';
import { grade1Term2MathUnit08SupplementalActivities } from './grade1Term2MathUnit08SupplementalActivities';

const base = {
  id: 'fixture',
  hint: '',
  explanation: '',
} as const;

function choice(prompt: string, labels: string[] = []): ActivityDefinition {
  return {
    ...base,
    kind: 'choice',
    prompt,
    options: labels.map((label, index) => ({ id: String(index), label })),
    correctOptionId: '0',
  };
}

describe('derivePilotQuestionKnowledgePointIds', () => {
  it('maps every Grade 1 Term 1 Chinese theme activity to its registered theme knowledge point', async () => {
    const pointByUnit = new Map([
      ['grade-1/term-1/chinese/unit-01', 'daily-life-literacy-and-character-meanings'],
      ['grade-1/term-1/chinese/unit-02', 'initials-finals-and-tone-marking'],
      ['grade-1/term-1/chinese/unit-03', 'compound-nasal-finals-and-whole-syllables'],
      ['grade-1/term-1/chinese/unit-04', 'seasons-weather-and-natural-observation'],
      ['grade-1/term-1/chinese/unit-05', 'common-character-meanings-in-daily-life'],
      ['grade-1/term-1/chinese/unit-06', 'shadow-observation-and-animal-features'],
      ['grade-1/term-1/chinese/unit-07', 'size-and-distance-comparison'],
      ['grade-1/term-1/chinese/unit-08', 'nature-imagination-and-story-sequence'],
    ]);

    for (const [sourceUnitId, expectedPointId] of pointByUnit) {
      const unit = await loadUnit(sourceUnitId);
      const activities = Object.values(unit!.difficultyTracks).flatMap((track) => track.tasks
        .flatMap((task) => task.sessions.flatMap((session) => session.activities)));
      expect(activities).toHaveLength(48);
      expect(activities.map((activity) => derivePilotQuestionKnowledgePointIds(sourceUnitId, activity)))
        .toEqual(Array.from({ length: 48 }, () => [expectedPointId]));
    }
  });

  it('maps every Grade 1 Term 2 Math Unit 1 activity to a plane-shape knowledge point', async () => {
    const sourceUnitId = 'grade-1/term-2/math/unit-01';
    const unit = await loadUnit(sourceUnitId);
    expect(unit).toBeDefined();
    const activities = Object.values(unit!.difficultyTracks).flatMap((track) => track.tasks
      .flatMap((task) => task.sessions.flatMap((session) => session.activities)));
    const tagged = activities.map((activity) => derivePilotQuestionKnowledgePointIds(sourceUnitId, activity));

    expect(activities).toHaveLength(48);
    expect(tagged.every((knowledgePointIds) => knowledgePointIds.length > 0)).toBe(true);
    expect(new Set(tagged.flat())).toEqual(new Set([
      'plane-shape-recognition',
      'plane-shape-features',
      'plane-shape-composition',
    ]));
    expect(activities.some((activity) => activity.prompt.includes('整体轮廓')
      && derivePilotQuestionKnowledgePointIds(sourceUnitId, activity).includes('plane-shape-features'))).toBe(true);
  });

  it('maps every Grade 1 Term 2 Math Unit 2 source activity to subtraction knowledge points', async () => {
    const sourceUnitId = 'grade-1/term-2/math/unit-02';
    const unit = await loadUnit(sourceUnitId);
    expect(unit).toBeDefined();
    const activities = Object.values(unit!.difficultyTracks).flatMap((track) => track.tasks
      .flatMap((task) => task.sessions.flatMap((session) => session.activities)));
    const tagged = activities.map((activity) => derivePilotQuestionKnowledgePointIds(sourceUnitId, activity));

    expect(activities).toHaveLength(48);
    expect(tagged.every((knowledgePointIds) => knowledgePointIds.includes('subtraction-within-20'))).toBe(true);
    expect(new Set(tagged.flat())).toEqual(new Set([
      'subtraction-within-20',
      'subtraction-strategy',
      'inverse-operation-check',
    ]));
  });

  it('maps every Grade 1 Term 2 Math Unit 3 source activity to classification knowledge points', async () => {
    const sourceUnitId = 'grade-1/term-2/math/unit-03';
    const unit = await loadUnit(sourceUnitId);
    expect(unit).toBeDefined();
    const activities = Object.values(unit!.difficultyTracks).flatMap((track) => track.tasks
      .flatMap((task) => task.sessions.flatMap((session) => session.activities)));
    const tagged = activities.map((activity) => derivePilotQuestionKnowledgePointIds(sourceUnitId, activity));

    expect(activities).toHaveLength(48);
    expect(tagged.every((knowledgePointIds) => knowledgePointIds.length > 0)).toBe(true);
    expect(new Set(tagged.flat())).toEqual(new Set([
      'classification-standard',
      'classification-recording',
      'classification-results',
      'classification-checking',
    ]));
  });

  it('maps all Grade 1 Term 2 English Unit 3 source activities to the four toy knowledge points', async () => {
    const sourceUnitId = 'grade-1/term-2/english/unit-03';
    const unit = await loadUnit(sourceUnitId);
    expect(unit).toBeDefined();
    const activities = Object.values(unit!.difficultyTracks).flatMap((track) => track.tasks
      .flatMap((task) => task.sessions.flatMap((session) => session.activities)));
    const tagged = activities.map((activity) => derivePilotQuestionKnowledgePointIds(sourceUnitId, activity));

    expect(activities).toHaveLength(48);
    expect(tagged.every((knowledgePointIds) => knowledgePointIds.length > 0)).toBe(true);
    expect(new Set(tagged.flat())).toEqual(new Set([
      'toy-word-meanings',
      'toy-type-classification',
      'toy-description-sentences',
      'toy-sentence-word-order',
    ]));
  });

  it('maps all Grade 1 Term 2 English Unit 4 source activities to the four food knowledge points', async () => {
    const sourceUnitId = 'grade-1/term-2/english/unit-04';
    const unit = await loadUnit(sourceUnitId);
    expect(unit).toBeDefined();
    const activities = Object.values(unit!.difficultyTracks).flatMap((track) => track.tasks
      .flatMap((task) => task.sessions.flatMap((session) => session.activities)));
    const tagged = activities.map((activity) => derivePilotQuestionKnowledgePointIds(sourceUnitId, activity));

    expect(activities).toHaveLength(48);
    expect(tagged.every((knowledgePointIds) => knowledgePointIds.length > 0)).toBe(true);
    expect(new Set(tagged.flat())).toEqual(new Set([
      'food-word-meanings',
      'food-category-classification',
      'food-preference-expressions',
      'food-sentence-word-order',
    ]));
  });

  it('maps every Grade 1 Term 2 Math Unit 4 source activity to number and place-value knowledge points', async () => {
    const sourceUnitId = 'grade-1/term-2/math/unit-04';
    const unit = await loadUnit(sourceUnitId);
    expect(unit).toBeDefined();
    const activities = Object.values(unit!.difficultyTracks).flatMap((track) => track.tasks
      .flatMap((task) => task.sessions.flatMap((session) => session.activities)));
    const tagged = activities.map((activity) => derivePilotQuestionKnowledgePointIds(sourceUnitId, activity));

    expect(activities).toHaveLength(48);
    expect(tagged.every((knowledgePointIds) => knowledgePointIds.length > 0)).toBe(true);
    expect(new Set(tagged.flat())).toEqual(new Set([
      'two-digit-number-composition',
      'number-sequence-to-100',
      'number-comparison-to-100',
      'tens-and-hundreds',
    ]));
    const tagsByActivityId = new Map(activities.map((activity) => [
      activity.id,
      derivePilotQuestionKnowledgePointIds(sourceUnitId, activity),
    ]));
    expect(tagsByActivityId.get(`${sourceUnitId}/basic/task-01/session-01/question-01`))
      .toEqual(['two-digit-number-composition']);
    expect(tagsByActivityId.get(`${sourceUnitId}/basic/task-01/session-01/question-04`))
      .toEqual(['number-sequence-to-100']);
    expect(tagsByActivityId.get(`${sourceUnitId}/basic/task-01/session-01/question-06`))
      .toEqual(['tens-and-hundreds']);
    expect(tagsByActivityId.get(`${sourceUnitId}/basic/task-01/session-01/question-07`))
      .toEqual(['number-comparison-to-100']);
    expect(tagsByActivityId.get(`${sourceUnitId}/advanced/task-01/session-01/question-08`))
      .toEqual(['tens-and-hundreds']);
  });

  it('maps every Grade 1 Term 2 Math Unit 6 source activity to addition and subtraction knowledge points', async () => {
    const sourceUnitId = 'grade-1/term-2/math/unit-06';
    const unit = await loadUnit(sourceUnitId);
    expect(unit).toBeDefined();
    const activities = Object.values(unit!.difficultyTracks).flatMap((track) => track.tasks
      .flatMap((task) => task.sessions.flatMap((session) => session.activities)));
    const tagged = activities.map((activity) => derivePilotQuestionKnowledgePointIds(sourceUnitId, activity));

    expect(activities).toHaveLength(48);
    expect(tagged.every((knowledgePointIds) => knowledgePointIds.length > 0)).toBe(true);
    expect(new Set(tagged.flat())).toEqual(new Set([
      'two-digit-add-subtract-one',
      'tens-add-subtract',
      'two-digit-add-subtract-tens',
    ]));
    const tagsByActivityId = new Map(activities.map((activity) => [
      activity.id,
      derivePilotQuestionKnowledgePointIds(sourceUnitId, activity),
    ]));
    expect(tagsByActivityId.get(`${sourceUnitId}/basic/task-01/session-01/question-01`))
      .toEqual(['two-digit-add-subtract-one']);
    expect(tagsByActivityId.get(`${sourceUnitId}/basic/task-01/session-01/question-04`))
      .toEqual(['tens-add-subtract']);
    expect(tagsByActivityId.get(`${sourceUnitId}/basic/task-01/session-01/question-05`))
      .toContain('two-digit-add-subtract-one');
    expect(tagsByActivityId.get(`${sourceUnitId}/advanced/task-01/session-01/question-05`))
      .toEqual(['two-digit-add-subtract-one', 'tens-add-subtract']);
  });

  it('uses authored knowledge-point tags for Grade 1 Term 2 Math Unit 6 supplements', () => {
    for (const supplemental of grade1Term2MathUnit06SupplementalActivities) {
      expect(derivePilotQuestionKnowledgePointIds(supplemental.sourceUnitId, supplemental.activity))
        .toEqual(supplemental.knowledgePointIds);
    }
    expect(new Set(grade1Term2MathUnit06SupplementalActivities.flatMap(({ knowledgePointIds }) => knowledgePointIds))).toEqual(new Set([
      'two-digit-add-subtract-one',
      'tens-add-subtract',
      'two-digit-add-subtract-tens',
    ]));
  });

  it('maps every Grade 1 Term 2 Math Unit 7 activity to pattern knowledge points', async () => {
    const sourceUnitId = 'grade-1/term-2/math/unit-07';
    const unit = await loadUnit(sourceUnitId);
    expect(unit).toBeDefined();
    const activities = Object.values(unit!.difficultyTracks).flatMap((track) => track.tasks
      .flatMap((task) => task.sessions.flatMap((session) => session.activities)));
    const tagged = activities.map((activity) => derivePilotQuestionKnowledgePointIds(sourceUnitId, activity));

    expect(activities).toHaveLength(48);
    expect(tagged.every((knowledgePointIds) => knowledgePointIds.length > 0)).toBe(true);
    expect(new Set(tagged.flat())).toEqual(new Set([
      'repeating-shape-patterns',
      'number-patterns',
      'pattern-rule-validation',
    ]));
  });

  it('uses authored knowledge-point tags for Grade 1 Term 2 Math Unit 7 supplements', () => {
    for (const supplemental of grade1Term2MathUnit07SupplementalActivities) {
      expect(derivePilotQuestionKnowledgePointIds(supplemental.sourceUnitId, supplemental.activity))
        .toEqual(supplemental.knowledgePointIds);
    }
    expect(new Set(grade1Term2MathUnit07SupplementalActivities.flatMap(({ knowledgePointIds }) => knowledgePointIds))).toEqual(new Set([
      'repeating-shape-patterns',
      'number-patterns',
      'pattern-rule-validation',
    ]));
  });

  it('maps every Grade 1 Term 2 Math Unit 8 activity and keeps authored review tags', async () => {
    const sourceUnitId = 'grade-1/term-2/math/unit-08';
    const unit = await loadUnit(sourceUnitId);
    expect(unit).toBeDefined();
    const activities = Object.values(unit!.difficultyTracks).flatMap((track) => track.tasks
      .flatMap((task) => task.sessions.flatMap((session) => session.activities)));
    const failures = activities.flatMap((activity) => {
      try {
        derivePilotQuestionKnowledgePointIds(sourceUnitId, activity);
        return [];
      } catch (error) {
        return [{ id: activity.id, prompt: activity.prompt, error: String(error) }];
      }
    });
    expect(failures).toEqual([]);
    const tagged = activities.map((activity) => derivePilotQuestionKnowledgePointIds(sourceUnitId, activity));

    expect(activities).toHaveLength(48);
    expect(tagged.every((knowledgePointIds) => knowledgePointIds.length > 0)).toBe(true);
    expect(new Set(tagged.flat())).toEqual(new Set([
      'plane-shape-recognition',
      'plane-shape-features',
      'classification-standard',
      'classification-recording',
      'classification-results',
      'classification-checking',
      'currency-denominations',
      'two-digit-add-subtract-one',
      'two-digit-add-subtract-tens',
      'inverse-operation-check',
      'subtraction-within-20',
      'subtraction-strategy',
      'number-comparison-to-100',
      'number-sequence-to-100',
      'two-digit-number-composition',
      'repeating-shape-patterns',
      'pattern-rule-validation',
      'yuan-jiao-fen-conversion',
      'money-composition-and-comparison',
    ]));
    expect(tagged[7]).toContain('inverse-operation-check');
    expect(tagged[15]).toContain('two-digit-add-subtract-one');
    const classifications = activities.find(({ id }) => id === `${sourceUnitId}/basic/task-02/session-01/question-04`)!;
    expect(derivePilotQuestionKnowledgePointIds(sourceUnitId, classifications)).not.toContain('currency-denominations');
    const moneyReview = activities.find(({ id }) => id === `${sourceUnitId}/basic/task-02/session-01/question-03`)!;
    expect(derivePilotQuestionKnowledgePointIds(sourceUnitId, moneyReview)).toContain('yuan-jiao-fen-conversion');
    expect(derivePilotQuestionKnowledgePointIds(sourceUnitId, moneyReview)).toContain('money-composition-and-comparison');

    for (const supplemental of grade1Term2MathUnit08SupplementalActivities) {
      expect(derivePilotQuestionKnowledgePointIds(supplemental.sourceUnitId, supplemental.activity))
        .toEqual(supplemental.knowledgePointIds);
    }
  });

  it('uses authored knowledge-point tags for Grade 1 Term 2 Math Unit 2 supplements', () => {
    for (const supplemental of grade1Term2MathUnit02SupplementalActivities) {
      expect(derivePilotQuestionKnowledgePointIds(supplemental.sourceUnitId, supplemental.activity))
        .toEqual(supplemental.knowledgePointIds);
    }
    expect(new Set(grade1Term2MathUnit02SupplementalActivities.flatMap(({ knowledgePointIds }) => knowledgePointIds))).toEqual(new Set([
      'subtraction-within-20',
      'subtraction-strategy',
      'inverse-operation-check',
    ]));
  });

  it('uses authored knowledge-point tags for Grade 1 Term 2 Math Unit 3 supplements', () => {
    for (const supplemental of grade1Term2MathUnit03SupplementalActivities) {
      expect(derivePilotQuestionKnowledgePointIds(supplemental.sourceUnitId, supplemental.activity))
        .toEqual(supplemental.knowledgePointIds);
    }
    expect(new Set(grade1Term2MathUnit03SupplementalActivities.flatMap(({ knowledgePointIds }) => knowledgePointIds))).toEqual(new Set([
      'classification-standard',
      'classification-recording',
      'classification-results',
      'classification-checking',
    ]));
  });

  it('uses authored knowledge-point tags for Grade 1 Term 2 Math Unit 4 supplements', () => {
    for (const supplemental of grade1Term2MathUnit04SupplementalActivities) {
      expect(derivePilotQuestionKnowledgePointIds(supplemental.sourceUnitId, supplemental.activity))
        .toEqual(supplemental.knowledgePointIds);
    }
    expect(new Set(grade1Term2MathUnit04SupplementalActivities.flatMap(({ knowledgePointIds }) => knowledgePointIds))).toEqual(new Set([
      'two-digit-number-composition',
      'number-sequence-to-100',
      'number-comparison-to-100',
      'tens-and-hundreds',
    ]));
  });

  it('uses authored knowledge-point tags for Grade 1 Term 2 Math Unit 5 supplements', () => {
    for (const supplemental of grade1Term2MathUnit05SupplementalActivities) {
      expect(derivePilotQuestionKnowledgePointIds(supplemental.sourceUnitId, supplemental.activity))
        .toEqual(supplemental.knowledgePointIds);
    }
    expect(new Set(grade1Term2MathUnit05SupplementalActivities.flatMap(({ knowledgePointIds }) => knowledgePointIds))).toEqual(new Set([
      'currency-denominations',
      'yuan-jiao-fen-conversion',
      'money-composition-and-comparison',
      'money-addition-and-change',
    ]));
  });

  it('为一年级上册数学第二单元的位置活动映射知识点', async () => {
    const sourceUnitId = 'grade-1/term-1/math/unit-02';
    const unit = await loadUnit(sourceUnitId);
    expect(unit).toBeDefined();
    const activities = Object.values(unit!.difficultyTracks).flatMap((track) => track.tasks
      .flatMap((task) => task.sessions.flatMap((session) => session.activities)));
    const tagged = activities.map((activity) => derivePilotQuestionKnowledgePointIds(sourceUnitId, activity));
    const covered = new Set(tagged.flat());

    expect(activities).toHaveLength(48);
    expect(tagged.every((knowledgePointIds) => knowledgePointIds.length > 0)).toBe(true);
    expect(covered).toEqual(new Set(['relative-position', 'reference-point', 'route-sequence']));
  });

  it('为一年级上册数学第三单元全部原课程题映射组成、加减、比较和验算知识点', async () => {
    const sourceUnitId = 'grade-1/term-1/math/unit-03';
    const unit = await loadUnit(sourceUnitId);
    expect(unit).toBeDefined();
    const activities = Object.values(unit!.difficultyTracks).flatMap((track) => track.tasks
      .flatMap((task) => task.sessions.flatMap((session) => session.activities)));
    const tagged = activities.map((activity) => derivePilotQuestionKnowledgePointIds(sourceUnitId, activity));
    const covered = new Set(tagged.flat());

    expect(activities).toHaveLength(48);
    expect(tagged.every((knowledgePointIds) => knowledgePointIds.length > 0)).toBe(true);
    expect(covered).toEqual(new Set([
      'number-composition-within-five',
      'addition-within-five',
      'subtraction-within-five',
      'comparison-within-five',
      'checking-within-five',
    ]));
  });

  it('为一年级上册数学第四单元全部原课程题映射立体图形知识点', async () => {
    const sourceUnitId = 'grade-1/term-1/math/unit-04';
    const unit = await loadUnit(sourceUnitId);
    expect(unit).toBeDefined();
    const activities = Object.values(unit!.difficultyTracks).flatMap((track) => track.tasks
      .flatMap((task) => task.sessions.flatMap((session) => session.activities)));
    const tagged = activities.map((activity) => derivePilotQuestionKnowledgePointIds(sourceUnitId, activity));
    const covered = new Set(tagged.flat());

    expect(activities).toHaveLength(48);
    expect(tagged.every((knowledgePointIds) => knowledgePointIds.length > 0)).toBe(true);
    expect(covered).toEqual(new Set(['solid-shape-recognition', 'solid-shape-features', 'solid-shape-use']));
  });

  it('为一年级上册数学第五单元全部原课程题映射数与运算知识点', async () => {
    const sourceUnitId = 'grade-1/term-1/math/unit-05';
    const unit = await loadUnit(sourceUnitId);
    expect(unit).toBeDefined();
    const activities = Object.values(unit!.difficultyTracks).flatMap((track) => track.tasks
      .flatMap((task) => task.sessions.flatMap((session) => session.activities)));
    const tagged = activities.map((activity) => derivePilotQuestionKnowledgePointIds(sourceUnitId, activity));
    const covered = new Set(tagged.flat());

    expect(activities).toHaveLength(48);
    expect(tagged.every((knowledgePointIds) => knowledgePointIds.length > 0)).toBe(true);
    expect(covered).toEqual(new Set([
      'number-sequence-within-ten',
      'number-composition-within-ten',
      'addition-within-ten',
      'subtraction-within-ten',
      'comparison-within-ten',
      'checking-within-ten',
    ]));
  });

  it('为一年级上册数学第六单元全部原课程题映射数的组成、数序和大小比较', async () => {
    const sourceUnitId = 'grade-1/term-1/math/unit-06';
    const unit = await loadUnit(sourceUnitId);
    expect(unit).toBeDefined();
    const activities = Object.values(unit!.difficultyTracks).flatMap((track) => track.tasks
      .flatMap((task) => task.sessions.flatMap((session) => session.activities)));
    const tagged = activities.map((activity) => derivePilotQuestionKnowledgePointIds(sourceUnitId, activity));
    const covered = new Set(tagged.flat());

    expect(activities).toHaveLength(48);
    expect(tagged.every((knowledgePointIds) => knowledgePointIds.length > 0)).toBe(true);
    expect(covered).toEqual(new Set([
      'teen-number-composition',
      'number-sequence-eleven-to-twenty',
      'number-comparison-eleven-to-twenty',
    ]));
  });

  it('maps a route-ordering activity to route sequence knowledge', async () => {
    const sourceUnitId = 'grade-1/term-1/math/unit-02';
    const unit = await loadUnit(sourceUnitId);
    const activities = Object.values(unit!.difficultyTracks).flatMap((track) => track.tasks
      .flatMap((task) => task.sessions.flatMap((session) => session.activities)));
    const route = activities.find((activity) => activity.prompt.includes('路线顺序'));

    expect(route).toBeDefined();
    expect(derivePilotQuestionKnowledgePointIds(sourceUnitId, route!)).toEqual(['route-sequence']);
  });

  it('maps a route card that names its observation direction to both route and reference knowledge', async () => {
    const sourceUnitId = 'grade-1/term-1/math/unit-02';
    const unit = await loadUnit(sourceUnitId);
    const activities = Object.values(unit!.difficultyTracks).flatMap((track) => track.tasks
      .flatMap((task) => task.sessions.flatMap((session) => session.activities)));
    const route = activities.find((activity) => activity.kind === 'choice'
      && activity.options.some(({ label }) => label.includes('起点和观察方向')));

    expect(route).toBeDefined();
    expect(derivePilotQuestionKnowledgePointIds(sourceUnitId, route!)).toEqual(['route-sequence', 'reference-point']);
  });

  it('为一年级上册数学第一单元的全部原课程题标注可追踪知识点', async () => {
    const sourceUnitId = 'grade-1/term-1/math/unit-01';
    const unit = await loadUnit(sourceUnitId);
    expect(unit).toBeDefined();
    const activities = Object.values(unit!.difficultyTracks).flatMap((track) => track.tasks
      .flatMap((task) => task.sessions.flatMap((session) => session.activities)));
    const tagged = activities.map((activity) => derivePilotQuestionKnowledgePointIds(sourceUnitId, activity));
    const covered = new Set(tagged.flat());

    expect(activities).toHaveLength(48);
    expect(tagged.every((knowledgePointIds) => knowledgePointIds.length > 0)).toBe(true);
    expect(covered).toEqual(new Set(['counting-one-to-one', 'number-sequence', 'quantity-comparison', 'zero-as-none']));
  });

  it('does not map a one-more arithmetic activity to one-to-one counting', async () => {
    const sourceUnitId = 'grade-1/term-1/math/unit-01';
    const unit = await loadUnit(sourceUnitId);
    const activities = Object.values(unit!.difficultyTracks).flatMap((track) => track.tasks
      .flatMap((task) => task.sessions.flatMap((session) => session.activities)));
    const arithmetic = activities.find((activity) => activity.kind === 'arithmetic' && activity.prompt.startsWith('算一算：'));

    expect(arithmetic).toBeDefined();
    expect(derivePilotQuestionKnowledgePointIds(sourceUnitId, arithmetic!)).toEqual(['number-sequence']);
  });

  it('maps the rebuilt Grade 2 Term 1 Math units to the new textbook knowledge points', async () => {
    const definitions = [
      ['grade-2/term-1/math/unit-01', ['classification-standards', 'classification-counts-and-comparison', 'complete-and-nonduplicated-records']],
      ['grade-2/term-1/math/unit-02', ['equal-groups-multiplication', 'multiplication-facts']],
      ['grade-2/term-1/math/unit-03', ['equal-sharing-and-grouping', 'division-facts-and-multiplication-check']],
      ['grade-2/term-1/math/unit-04', ['length-units', 'measurement-and-estimation']],
      ['grade-2/term-1/math/unit-05', ['multiplication-facts-7-9', 'division-facts-7-9']],
      ['grade-2/term-1/math/unit-06', ['term-review-method-selection', 'term-review-result-checking']],
      ['grade-2/term-1/math/integrated-practice-01', ['direction-and-reference-points']],
      ['grade-2/term-1/math/integrated-practice-02', ['body-based-measurement-and-estimation']],
    ] as const;

    for (const [sourceUnitId, expectedPointIds] of definitions) {
      const unit = await loadUnit(sourceUnitId);
      const activities = Object.values(unit!.difficultyTracks).flatMap((track) => track.tasks
        .flatMap((task) => task.sessions.flatMap((session) => session.activities)));
      expect(activities).toHaveLength(48);
      expect(activities.map((activity) => derivePilotQuestionKnowledgePointIds(sourceUnitId, activity)))
        .toEqual(Array.from({ length: 48 }, () => expectedPointIds));
    }
  });

  it('maps length-unit selection separately from measuring and estimating', () => {
    expect(derivePilotQuestionKnowledgePointIds(
      'grade-2/term-1/math/unit-04',
      choice('测量一支铅笔，哪个单位更方便？', ['厘米', '米']),
    )).toEqual(['length-units', 'measurement-and-estimation']);
    expect(derivePilotQuestionKnowledgePointIds(
      'grade-2/term-1/math/unit-04',
      choice('把物体一端对准0刻度，再读出另一端的长度。'),
    )).toEqual(['length-units', 'measurement-and-estimation']);
  });

  it('maps first-half multiplication and division to the new textbook ranges', () => {
    expect(derivePilotQuestionKnowledgePointIds(
      'grade-2/term-1/math/unit-02',
      { ...base, kind: 'arithmetic', prompt: '计算。', expression: '4 × 5', correctAnswer: 20 },
    )).toEqual(['equal-groups-multiplication', 'multiplication-facts']);
    expect(derivePilotQuestionKnowledgePointIds(
      'grade-2/term-1/math/unit-03',
      { ...base, kind: 'arithmetic', prompt: '计算。', expression: '30 ÷ 5', correctAnswer: 6 },
    )).toEqual(['equal-sharing-and-grouping', 'division-facts-and-multiplication-check']);
    expect(derivePilotQuestionKnowledgePointIds(
      'grade-2/term-1/math/unit-05',
      { ...base, kind: 'arithmetic', prompt: '计算。', expression: '9 × 7', correctAnswer: 63 },
    )).toEqual(['multiplication-facts-7-9', 'division-facts-7-9']);
  });

  it('maps Grade 1 Unit 8 carrying addition, ten-complement strategy, stories, and checks distinctly', () => {
    const sourceUnitId = 'grade-1/term-1/math/unit-08';

    expect(derivePilotQuestionKnowledgePointIds(
      sourceUnitId,
      { ...base, kind: 'arithmetic', prompt: '计算。', expression: '8 + 5', correctAnswer: 13 },
    )).toEqual(['addition-within-twenty', 'carry-addition-within-twenty', 'make-ten-strategy']);
    expect(derivePilotQuestionKnowledgePointIds(
      sourceUnitId,
      { ...base, kind: 'arithmetic', prompt: '计算。', expression: '10 + 5', correctAnswer: 15 },
    )).toEqual(['addition-within-twenty']);
    expect(derivePilotQuestionKnowledgePointIds(
      sourceUnitId,
      choice('原有 8 个苹果，又放入 5 个。应该列什么算式？', ['8 + 5', '8 - 5']),
    )).toEqual(['addition-within-twenty', 'carry-addition-within-twenty', 'make-ten-strategy', 'addition-situation-modeling']);
    expect(derivePilotQuestionKnowledgePointIds(
      sourceUnitId,
      choice('同学把 8 + 5 算成 12，哪项检查能发现错误？', ['12 - 5 = 7', '12 - 5 = 8']),
    )).toEqual(['addition-within-twenty', 'carry-addition-within-twenty', 'make-ten-strategy', 'addition-checking']);
    expect(derivePilotQuestionKnowledgePointIds(
      sourceUnitId,
      grade1MathUnit08SupplementalActivities[0]!.activity,
    )).toEqual(['make-ten-strategy', 'carry-addition-within-twenty']);
  });

  it('maps Grade 1 Unit 9 review activities to taught number, position, shape, and clock points', () => {
    const sourceUnitId = 'grade-1/term-1/math/unit-09';

    expect(derivePilotQuestionKnowledgePointIds(
      sourceUnitId,
      choice('计算：8 + 4 = ?', ['12', '11', '13']),
    )).toEqual(['addition-within-twenty']);
    expect(derivePilotQuestionKnowledgePointIds(
      sourceUnitId,
      choice('比较 9 和 5，哪句话正确？', ['9 比 5 大', '9 比 5 小']),
    )).toEqual(['comparison-within-ten']);
    expect(derivePilotQuestionKnowledgePointIds(
      sourceUnitId,
      choice('比较 18 和 13，哪句话正确？', ['18 比 13 大', '18 比 13 小']),
    )).toEqual(['number-comparison-eleven-to-twenty']);
    expect(derivePilotQuestionKnowledgePointIds(
      sourceUnitId,
      choice('小狗在小猫左边，小猫在小狗的哪边？', ['右边', '左边']),
    )).toEqual(['relative-position']);
    expect(derivePilotQuestionKnowledgePointIds(
      sourceUnitId,
      choice('哪种立体图形有弯曲侧面和两个圆形平面？', ['圆柱体', '球体']),
    )).toEqual(['solid-shape-recognition', 'solid-shape-features']);
    expect(derivePilotQuestionKnowledgePointIds(
      sourceUnitId,
      choice('分针指向 12，时针指向 5，表示什么时刻？', ['5 时整', '5 时半']),
    )).toEqual(['clock-whole-hour-reading']);
    expect(derivePilotQuestionKnowledgePointIds(
      sourceUnitId,
      grade1MathUnit09SupplementalActivities[0]!.activity,
    )).toEqual(['addition-within-twenty']);
    expect(() => derivePilotQuestionKnowledgePointIds(
      sourceUnitId,
      choice('盒子里有 14 个积木，拿出 5 个后，还剩几个？', ['9', '8', '10']),
    )).toThrow('outside the Grade 1 Term 1 review scope');
  });

  it('classifies every retained Grade 1 Unit 9 course candidate and rejects direct teen subtraction', async () => {
    const sourceUnitId = 'grade-1/term-1/math/unit-09';
    const unit = await loadUnit(sourceUnitId);
    const excludedActivityIds = new Set([
      `${sourceUnitId}/basic/task-01/session-01/question-07`,
      `${sourceUnitId}/basic/task-02/session-01/question-07`,
      `${sourceUnitId}/advanced/task-01/session-01/question-07`,
      `${sourceUnitId}/advanced/task-01/session-01/question-08`,
      `${sourceUnitId}/advanced/task-02/session-01/question-07`,
      `${sourceUnitId}/high/task-01/session-01/question-01`,
      `${sourceUnitId}/high/task-01/session-01/question-07`,
      `${sourceUnitId}/high/task-02/session-01/question-07`,
    ]);
    const outOfScopeSubtractionIds = [
      `${sourceUnitId}/basic/task-01/session-01/question-07`,
      `${sourceUnitId}/basic/task-02/session-01/question-07`,
      `${sourceUnitId}/advanced/task-01/session-01/question-07`,
      `${sourceUnitId}/advanced/task-01/session-01/question-08`,
      `${sourceUnitId}/advanced/task-02/session-01/question-07`,
      `${sourceUnitId}/high/task-01/session-01/question-07`,
      `${sourceUnitId}/high/task-02/session-01/question-07`,
    ];
    const retainedActivities = Object.values(unit!.difficultyTracks).flatMap((track) => track.tasks
      .flatMap((task) => task.sessions.flatMap((session) => session.activities)))
      .filter(({ id }) => !excludedActivityIds.has(id));

    expect(retainedActivities).toHaveLength(40);
    expect(retainedActivities.every((activity) => derivePilotQuestionKnowledgePointIds(sourceUnitId, activity).length > 0)).toBe(true);
    for (const activityId of outOfScopeSubtractionIds) {
      const activity = Object.values(unit!.difficultyTracks).flatMap((track) => track.tasks)
        .flatMap((task) => task.sessions.flatMap((session) => session.activities))
        .find(({ id }) => id === activityId)!;
      expect(() => derivePilotQuestionKnowledgePointIds(sourceUnitId, activity)).toThrow('outside the Grade 1 Term 1 review scope');
    }
  });

  it('keeps retired Grade 2 Term 1 Math unit paths unsupported', () => {
    expect(() => derivePilotQuestionKnowledgePointIds(
      'grade-2/term-1/math/unit-07',
      choice('认识时间。'),
    )).toThrow('No pilot knowledge-point mapping exists');
  });

  it('maps self-introduction and age questions to the Grade 3 English unit points', () => {
    const sourceUnitId = 'grade-3/term-1/english/unit-01';

    expect(derivePilotQuestionKnowledgePointIds(
      sourceUnitId,
      choice('“My name is Amy.” 表示什么？', ['我的名字叫 Amy。', '我有一个苹果。', '我喜欢蓝色。']),
    )).toEqual(['name-and-self-introduction']);
    expect(derivePilotQuestionKnowledgePointIds(
      sourceUnitId,
      choice('别人问 “How old are you?”，是在问什么？', ['你几岁？', '你叫什么？', '你喜欢什么？']),
    )).toEqual(['age-and-class']);
    expect(derivePilotQuestionKnowledgePointIds(
      sourceUnitId,
      choice('核对 name 和 age 两项个人信息。', ['姓名与年龄都正确', '只核对姓名', '只核对年龄']),
    )).toEqual(['name-and-self-introduction', 'age-and-class']);
    expect(derivePilotQuestionKnowledgePointIds(
      sourceUnitId,
      choice('向伙伴介绍句子前，先检查什么？', ['核对关键词的意思，再按正确词序读一遍。']),
    )).toEqual(['name-and-self-introduction']);
  });

  it('fails closed for an unsupported source unit or a question with no detectable core point', () => {
    expect(() => derivePilotQuestionKnowledgePointIds('grade-6/term-1/math/unit-01', choice('计算。'))).toThrow();
    expect(() => derivePilotQuestionKnowledgePointIds(
      'grade-2/term-1/math/unit-07',
      choice('请看图。'),
    )).toThrow();
  });
});
