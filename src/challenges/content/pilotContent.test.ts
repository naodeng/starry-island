import { describe, expect, it } from 'vitest';
import { submitAnswer } from '../../learning/answers';
import { assemblePaper } from '../domain/assemble';
import { loadPilotChallengeContent } from './pilotContent';

function knownCorrectAnswer(activity: Parameters<typeof submitAnswer>[0]): Parameters<typeof submitAnswer>[1] {
  switch (activity.kind) {
    case 'choice':
      return activity.correctOptionId;
    case 'match':
      return Object.fromEntries(activity.pairs.map(({ id }) => [id, id]));
    case 'order':
      return activity.correctOrder;
    case 'categorize':
      return Object.fromEntries(activity.items.map(({ id, categoryId }) => [id, categoryId]));
    case 'measurement':
      return activity.targetLengthCm;
    case 'arithmetic':
      return activity.correctAnswer;
  }
}

describe('loadPilotChallengeContent', () => {
  it('loads only groups whose real curriculum candidates pass the release gate', async () => {
    const content = await loadPilotChallengeContent();

    expect(content.groups.every(({ status }) => status === 'ready')).toBe(true);
    const grade2Term1MathIds = content.groups
      .map(({ group }) => group.definition.id)
      .filter((id) => id.startsWith('grade-2-term-1-math-'))
      .sort();
    expect(grade2Term1MathIds).toEqual([
      'grade-2-term-1-math-end-term',
      'grade-2-term-1-math-first-half',
      ...Array.from({ length: 6 }, (_, index) => `grade-2-term-1-math-unit-${String(index + 1).padStart(2, '0')}`),
      'grade-2-term-1-math-second-half',
    ].sort());
    for (let unit = 1; unit <= 6; unit += 1) {
      expect(content.groups.find(({ group }) => group.definition.id === `grade-2-term-1-math-unit-${String(unit).padStart(2, '0')}`)?.candidates)
        .toHaveLength(90);
    }
    expect(content.groups.find(({ group }) => group.definition.id === 'grade-2-term-1-math-first-half')?.candidates).toHaveLength(318);
    expect(content.groups.find(({ group }) => group.definition.id === 'grade-2-term-1-math-second-half')?.candidates).toHaveLength(318);
    expect(content.groups.find(({ group }) => group.definition.id === 'grade-2-term-1-math-end-term')?.candidates).toHaveLength(636);
    expect(content.groups.find(({ group }) => group.definition.id === 'grade-2-term-2-chinese-unit-04')?.candidates).toHaveLength(90);
    expect(content.groups.find(({ group }) => group.definition.id === 'grade-2-term-2-chinese-unit-05')?.candidates).toHaveLength(90);
    expect(content.groups.find(({ group }) => group.definition.id === 'grade-2-term-2-chinese-unit-06')?.candidates).toHaveLength(90);
    expect(content.groups.find(({ group }) => group.definition.id === 'grade-2-term-2-chinese-unit-07')?.candidates).toHaveLength(90);
    expect(content.groups.find(({ group }) => group.definition.id === 'grade-2-term-2-math-unit-01')?.candidates).toHaveLength(90);
    expect(content.groups.find(({ group }) => group.definition.id === 'grade-2-term-2-math-unit-02')?.candidates).toHaveLength(90);
    expect(content.groups.find(({ group }) => group.definition.id === 'grade-2-term-2-english-unit-01')?.candidates).toHaveLength(90);
    expect(content.groups.find(({ group }) => group.definition.id === 'grade-2-term-2-english-unit-02')?.candidates).toHaveLength(90);
    for (let unit = 4; unit <= 10; unit += 1) {
      expect(content.groups.find(({ group }) => group.definition.id === `grade-2-term-2-math-unit-${String(unit).padStart(2, '0')}`)?.candidates).toHaveLength(90);
    }
    for (let unit = 4; unit <= 6; unit += 1) {
      expect(content.groups.find(({ group }) => group.definition.id === `grade-2-term-2-english-unit-${String(unit).padStart(2, '0')}`)?.candidates).toHaveLength(90);
    }

    expect(content.groups.find(({ group }) => group.definition.id === 'grade-2-term-1-chinese-unit-01')?.candidates).toHaveLength(90);
    expect(content.groups.find(({ group }) => group.definition.id === 'grade-2-term-1-chinese-unit-02')?.candidates).toHaveLength(90);
    expect(content.groups.find(({ group }) => group.definition.id === 'grade-2-term-1-chinese-unit-03')?.candidates).toHaveLength(90);
    expect(content.groups.find(({ group }) => group.definition.id === 'grade-2-term-1-chinese-unit-04')?.candidates).toHaveLength(90);
    expect(content.groups.find(({ group }) => group.definition.id === 'grade-2-term-1-chinese-unit-05')?.candidates).toHaveLength(90);
    expect(content.groups.find(({ group }) => group.definition.id === 'grade-2-term-1-chinese-unit-06')?.candidates).toHaveLength(90);
    expect(content.groups.find(({ group }) => group.definition.id === 'grade-2-term-1-chinese-unit-07')?.candidates).toHaveLength(90);
    expect(content.groups.find(({ group }) => group.definition.id === 'grade-2-term-1-chinese-unit-08')?.candidates).toHaveLength(90);
    expect(content.groups.find(({ group }) => group.definition.id === 'grade-2-term-2-chinese-unit-01')?.candidates).toHaveLength(90);
    expect(content.groups.find(({ group }) => group.definition.id === 'grade-2-term-2-chinese-unit-02')?.candidates).toHaveLength(90);
    expect(content.groups.find(({ group }) => group.definition.id === 'grade-2-term-2-chinese-unit-08')?.candidates).toHaveLength(90);
    expect(content.groups.find(({ group }) => group.definition.id === 'grade-2-term-2-math-unit-03')?.candidates).toHaveLength(90);
    expect(content.groups.find(({ group }) => group.definition.id === 'grade-2-term-2-english-unit-03')?.candidates).toHaveLength(90);
    expect(content.groups.find(({ group }) => group.definition.id === 'grade-2-term-2-chinese-first-half')?.candidates).toHaveLength(360);
    expect(content.groups.find(({ group }) => group.definition.id === 'grade-2-term-2-chinese-second-half')?.candidates).toHaveLength(360);
    expect(content.groups.find(({ group }) => group.definition.id === 'grade-2-term-2-chinese-end-term')?.candidates).toHaveLength(720);
    expect(content.groups.find(({ group }) => group.definition.id === 'grade-2-term-2-math-first-half')?.candidates).toHaveLength(450);
    expect(content.groups.find(({ group }) => group.definition.id === 'grade-2-term-2-math-second-half')?.candidates).toHaveLength(498);
    expect(content.groups.find(({ group }) => group.definition.id === 'grade-2-term-2-math-end-term')?.candidates).toHaveLength(948);
    expect(content.groups.find(({ group }) => group.definition.id === 'grade-2-term-2-english-first-half')?.candidates).toHaveLength(270);
    expect(content.groups.find(({ group }) => group.definition.id === 'grade-2-term-2-english-second-half')?.candidates).toHaveLength(270);
    expect(content.groups.find(({ group }) => group.definition.id === 'grade-2-term-2-english-end-term')?.candidates).toHaveLength(540);

    expect(content.groups.find(({ group }) => group.definition.id === 'grade-1-term-2-english-unit-03')?.candidates).toHaveLength(90);
    expect(content.groups.find(({ group }) => group.definition.id === 'grade-1-term-2-english-unit-04')?.candidates).toHaveLength(90);
    expect(content.groups.find(({ group }) => group.definition.id === 'grade-1-term-2-english-unit-05')?.candidates).toHaveLength(90);
    expect(content.groups.find(({ group }) => group.definition.id === 'grade-1-term-2-english-unit-06')?.candidates).toHaveLength(90);
    expect(content.groups.find(({ group }) => group.definition.id === 'grade-1-term-2-chinese-first-half')?.candidates).toHaveLength(156);
    expect(content.groups.find(({ group }) => group.definition.id === 'grade-1-term-2-chinese-second-half')?.candidates).toHaveLength(156);
    expect(content.groups.find(({ group }) => group.definition.id === 'grade-1-term-2-chinese-end-term')?.candidates).toHaveLength(305);
    expect(content.groups.find(({ group }) => group.definition.id === 'grade-1-term-2-math-first-half')?.candidates).toHaveLength(344);
    expect(content.groups.find(({ group }) => group.definition.id === 'grade-1-term-2-math-second-half')?.candidates).toHaveLength(360);
    expect(content.groups.find(({ group }) => group.definition.id === 'grade-1-term-2-math-end-term')?.candidates).toHaveLength(703);
    expect(content.groups.find(({ group }) => group.definition.id === 'grade-1-term-2-english-first-half')?.candidates).toHaveLength(269);
    expect(content.groups.find(({ group }) => group.definition.id === 'grade-1-term-2-english-second-half')?.candidates).toHaveLength(268);
    expect(content.groups.find(({ group }) => group.definition.id === 'grade-1-term-2-english-end-term')?.candidates).toHaveLength(536);
    expect(content.groups.every(({ disabledQuestionIds }) => disabledQuestionIds.length === 0)).toBe(true);
    expect(content.groups[1]?.candidates.every(({ contentFingerprint, activity }) => contentFingerprint && activity.id)).toBe(true);
    expect(content.validation.errors).toEqual([]);
  });

  it('scores the declared correct answer for every unique pilot candidate through the production grader', async () => {
    const content = await loadPilotChallengeContent();
    const candidatesByQuestionId = new Map(content.groups.flatMap(({ candidates }) => candidates)
      .map((candidate) => [candidate.questionId, candidate]));
    const candidates = [...candidatesByQuestionId.values()];

    expect(candidates).toHaveLength(7590);
    expect(candidates.every(({ activity }) => submitAnswer(activity, knownCorrectAnswer(activity)))).toBe(true);
  });

  it('scores every Grade 2 Term 1 Math Unit 1 candidate through the production grader', async () => {
    const content = await loadPilotChallengeContent();
    const group = content.groups.find(({ group }) => group.definition.id === 'grade-2-term-1-math-unit-01');
    const candidates = group?.candidates ?? [];

    expect(candidates).toHaveLength(90);
    expect(new Set(candidates.map(({ questionId }) => questionId)).size).toBe(90);
    expect(candidates.every(({ activity }) => submitAnswer(activity, knownCorrectAnswer(activity)))).toBe(true);
  });

  it('scores every Grade 1 math Unit 1 candidate through the production grader', async () => {
    const content = await loadPilotChallengeContent();
    const group = content.groups.find(({ group }) => group.definition.id === 'grade-1-term-1-math-unit-01');
    const candidates = group?.candidates ?? [];

    expect(candidates).toHaveLength(90);
    expect(new Set(candidates.map(({ questionId }) => questionId)).size).toBe(90);
    expect(candidates.every(({ activity }) => submitAnswer(activity, knownCorrectAnswer(activity)))).toBe(true);
  });

  it('scores every Grade 1 Term 2 Math Unit 2 candidate through the production grader', async () => {
    const content = await loadPilotChallengeContent();
    const group = content.groups.find(({ group }) => group.definition.id === 'grade-1-term-2-math-unit-02');
    const candidates = group?.candidates ?? [];

    expect(candidates).toHaveLength(90);
    expect(new Set(candidates.map(({ questionId }) => questionId)).size).toBe(90);
    expect(candidates.every(({ activity }) => submitAnswer(activity, knownCorrectAnswer(activity)))).toBe(true);
  });

  it('scores every Grade 1 English Unit 1 candidate through the production grader', async () => {
    const content = await loadPilotChallengeContent();
    const group = content.groups.find(({ group }) => group.definition.id === 'grade-1-term-1-english-unit-01');
    const candidates = group?.candidates ?? [];

    expect(candidates).toHaveLength(90);
    expect(new Set(candidates.map(({ questionId }) => questionId)).size).toBe(90);
    expect(candidates.every(({ activity }) => submitAnswer(activity, knownCorrectAnswer(activity)))).toBe(true);
  });

  it('scores every Grade 1 English Unit 4 candidate through the production grader', async () => {
    const content = await loadPilotChallengeContent();
    const group = content.groups.find(({ group }) => group.definition.id === 'grade-1-term-1-english-unit-04');
    const candidates = group?.candidates ?? [];

    expect(candidates).toHaveLength(90);
    expect(new Set(candidates.map(({ questionId }) => questionId)).size).toBe(90);
    expect(candidates.every(({ activity }) => submitAnswer(activity, knownCorrectAnswer(activity)))).toBe(true);
  });

  it('scores every Grade 1 English Unit 5 candidate through the production grader', async () => {
    const content = await loadPilotChallengeContent();
    const group = content.groups.find(({ group }) => group.definition.id === 'grade-1-term-1-english-unit-05');
    const candidates = group?.candidates ?? [];

    expect(candidates).toHaveLength(90);
    expect(new Set(candidates.map(({ questionId }) => questionId)).size).toBe(90);
    expect(candidates.every(({ activity }) => submitAnswer(activity, knownCorrectAnswer(activity)))).toBe(true);
  });

  it('scores every Grade 1 English Unit 6 candidate through the production grader', async () => {
    const content = await loadPilotChallengeContent();
    const group = content.groups.find(({ group }) => group.definition.id === 'grade-1-term-1-english-unit-06');
    const candidates = group?.candidates ?? [];

    expect(candidates).toHaveLength(90);
    expect(new Set(candidates.map(({ questionId }) => questionId)).size).toBe(90);
    expect(candidates.every(({ activity }) => submitAnswer(activity, knownCorrectAnswer(activity)))).toBe(true);
  });

  it('scores every Grade 1 math Unit 2 candidate through the production grader', async () => {
    const content = await loadPilotChallengeContent();
    const group = content.groups.find(({ group }) => group.definition.id === 'grade-1-term-1-math-unit-02');
    const candidates = group?.candidates ?? [];

    expect(candidates).toHaveLength(90);
    expect(new Set(candidates.map(({ questionId }) => questionId)).size).toBe(90);
    expect(candidates.every(({ activity }) => submitAnswer(activity, knownCorrectAnswer(activity)))).toBe(true);
  });

  it('scores every Grade 1 math Unit 3 candidate through the production grader', async () => {
    const content = await loadPilotChallengeContent();
    const group = content.groups.find(({ group }) => group.definition.id === 'grade-1-term-1-math-unit-03');
    const candidates = group?.candidates ?? [];

    expect(candidates).toHaveLength(90);
    expect(new Set(candidates.map(({ questionId }) => questionId)).size).toBe(90);
    expect(candidates.every(({ activity }) => submitAnswer(activity, knownCorrectAnswer(activity)))).toBe(true);
  });

  it('scores every Grade 1 math Unit 4 candidate through the production grader', async () => {
    const content = await loadPilotChallengeContent();
    const group = content.groups.find(({ group }) => group.definition.id === 'grade-1-term-1-math-unit-04');
    const candidates = group?.candidates ?? [];

    expect(candidates).toHaveLength(90);
    expect(new Set(candidates.map(({ questionId }) => questionId)).size).toBe(90);
    expect(candidates.every(({ activity }) => submitAnswer(activity, knownCorrectAnswer(activity)))).toBe(true);
  });

  it('scores every Grade 1 math Unit 6 candidate through the production grader', async () => {
    const content = await loadPilotChallengeContent();
    const group = content.groups.find(({ group }) => group.definition.id === 'grade-1-term-1-math-unit-06');
    const candidates = group?.candidates ?? [];

    expect(candidates).toHaveLength(90);
    expect(new Set(candidates.map(({ questionId }) => questionId)).size).toBe(90);
    expect(candidates.every(({ activity }) => submitAnswer(activity, knownCorrectAnswer(activity)))).toBe(true);
  });

  it('scores every Grade 1 math Unit 7 candidate through the production grader', async () => {
    const content = await loadPilotChallengeContent();
    const group = content.groups.find(({ group }) => group.definition.id === 'grade-1-term-1-math-unit-07');
    const candidates = group?.candidates ?? [];

    expect(candidates).toHaveLength(90);
    expect(new Set(candidates.map(({ questionId }) => questionId)).size).toBe(90);
    expect(candidates.every(({ activity }) => submitAnswer(activity, knownCorrectAnswer(activity)))).toBe(true);
  });

  it('scores every Grade 1 math Unit 8 candidate through the production grader', async () => {
    const content = await loadPilotChallengeContent();
    const group = content.groups.find(({ group }) => group.definition.id === 'grade-1-term-1-math-unit-08');
    const candidates = group?.candidates ?? [];

    expect(candidates).toHaveLength(90);
    expect(new Set(candidates.map(({ questionId }) => questionId)).size).toBe(90);
    expect(candidates.every(({ activity }) => submitAnswer(activity, knownCorrectAnswer(activity)))).toBe(true);
  });

  it('assembles every pilot task with its declared knowledge coverage from the real tagged pools', async () => {
    const content = await loadPilotChallengeContent();

    for (const { group, candidates } of content.groups) {
      for (const task of group.definition.tasks) {
        const paper = assemblePaper(task, candidates, `coverage:${task.id}`);
        const covered = new Set(paper.flatMap(({ knowledgePointIds }) => knowledgePointIds));
        expect(paper).toHaveLength(task.targetCount);
        expect(task.requiredKnowledgePointIds.every((id) => covered.has(id))).toBe(true);
      }
    }
  });

  it('connects new textbook knowledge points to the matching existing learning tasks', async () => {
    const content = await loadPilotChallengeContent();
    const unitGroup = content.groups.find(({ group }) => group.definition.id === 'grade-2-term-1-math-unit-02');
    const multiplicationTask = unitGroup?.learningTasks.find(({ taskId }) => taskId === 'grade-2/term-1/math/unit-02/basic/task-01');

    expect(multiplicationTask).toMatchObject({
      title: '相同加数转换器',
      knowledgePointIds: ['equal-groups-multiplication', 'multiplication-facts'],
    });
    expect(multiplicationTask?.activityIds).toContain('grade-2/term-1/math/unit-02/basic/task-01/session-01/question-01');
  });

  it('provides an existing learning task for every tagged knowledge point in each pilot group', async () => {
    const content = await loadPilotChallengeContent();
    const missingKnowledgePoints: string[] = [];

    for (const { candidates, learningTasks, group } of content.groups) {
      const knowledgePointIds = new Set(candidates.flatMap(({ knowledgePointIds: ids }) => ids));
      for (const knowledgePointId of knowledgePointIds) {
        if (!learningTasks.some(({ knowledgePointIds: taskIds }) => taskIds.includes(knowledgePointId))) {
          missingKnowledgePoints.push(`${group.definition.id}: ${knowledgePointId}`);
        }
      }
    }

    expect(missingKnowledgePoints).toEqual([]);
  });

  it('keeps Unit 9 question provenance separate from its cross-unit review links', async () => {
    const content = await loadPilotChallengeContent();
    const reviewGroup = content.groups.find(({ group }) => group.definition.id === 'grade-1-term-1-math-unit-09');
    const candidateActivityIds = new Set(reviewGroup?.candidates.map(({ activityId }) => activityId));

    expect(reviewGroup).toBeDefined();
    expect(reviewGroup?.group.definition.sourceUnitIds).toEqual(['grade-1/term-1/math/unit-09']);
    expect(reviewGroup?.group.definition.learningTaskUnitIds).toEqual([
      'grade-1/term-1/math/unit-01',
      'grade-1/term-1/math/unit-02',
      'grade-1/term-1/math/unit-03',
      'grade-1/term-1/math/unit-04',
      'grade-1/term-1/math/unit-05',
      'grade-1/term-1/math/unit-06',
      'grade-1/term-1/math/unit-07',
      'grade-1/term-1/math/unit-08',
      'grade-1/term-1/math/unit-09',
    ]);
    expect(reviewGroup?.candidates).toHaveLength(90);
    const excludedActivityIds = [
      'grade-1/term-1/math/unit-09/basic/task-01/session-01/question-07',
      'grade-1/term-1/math/unit-09/basic/task-02/session-01/question-07',
      'grade-1/term-1/math/unit-09/advanced/task-01/session-01/question-07',
      'grade-1/term-1/math/unit-09/advanced/task-01/session-01/question-08',
      'grade-1/term-1/math/unit-09/advanced/task-02/session-01/question-07',
      'grade-1/term-1/math/unit-09/high/task-01/session-01/question-01',
      'grade-1/term-1/math/unit-09/high/task-01/session-01/question-07',
      'grade-1/term-1/math/unit-09/high/task-02/session-01/question-07',
    ];
    expect(excludedActivityIds.filter((activityId) => candidateActivityIds.has(activityId))).toEqual([]);
    expect(reviewGroup?.learningTasks.map(({ unitKey }) => unitKey)).toEqual(expect.arrayContaining([
      'grade-1/term-1/math/unit-02',
      'grade-1/term-1/math/unit-04',
      'grade-1/term-1/math/unit-07',
      'grade-1/term-1/math/unit-08',
    ]));
  });

  it('links the new English knowledge points to existing Grade 3 learning tasks', async () => {
    const content = await loadPilotChallengeContent();
    const englishGroup = content.groups.find(({ group }) => group.definition.id === 'grade-3-term-1-english-unit-01');

    expect(englishGroup?.learningTasks.some(({ knowledgePointIds }) => knowledgePointIds.includes('name-and-self-introduction'))).toBe(true);
    expect(englishGroup?.learningTasks.some(({ knowledgePointIds }) => knowledgePointIds.includes('age-and-class'))).toBe(true);
  });

  it('links each new Chinese knowledge point to an existing Grade 5 learning task', async () => {
    const content = await loadPilotChallengeContent();
    const chineseGroup = content.groups.find(({ group }) => group.definition.id === 'grade-5-term-1-chinese-unit-01');
    const knowledgePointIds = new Set(chineseGroup?.candidates.flatMap(({ knowledgePointIds: ids }) => ids));

    expect(knowledgePointIds).toEqual(new Set(['object-and-emotion', 'reading-evidence', 'class-charter', 'beloved-object-writing']));
    for (const knowledgePointId of knowledgePointIds) {
      expect(chineseGroup?.learningTasks.some(({ knowledgePointIds: taskIds }) => taskIds.includes(knowledgePointId))).toBe(true);
    }
  });

  it('keeps each new English multiple-choice answer scorable and out of its prompt and hint', async () => {
    const content = await loadPilotChallengeContent();
    const englishGroup = content.groups.find(({ group }) => group.definition.id === 'grade-3-term-1-english-unit-01');
    const supplemental = englishGroup?.candidates.filter(({ activityId }) => activityId.startsWith(
      'challenge-supplement-grade-3-term-1-english-unit-01-',
    )) ?? [];

    expect(supplemental).toHaveLength(42);
    for (const { activity } of supplemental) {
      expect(activity.kind).toBe('choice');
      if (activity.kind !== 'choice') continue;
      const correctOption = activity.options.find(({ id }) => id === activity.correctOptionId);
      expect(correctOption).toBeDefined();
      expect(new Set(activity.options.map(({ label }) => label)).size).toBe(activity.options.length);
      expect(activity.prompt).not.toContain(correctOption?.label);
      expect(activity.hint).not.toContain(correctOption?.label);
      expect(submitAnswer(activity, activity.correctOptionId)).toBe(true);
    }
  });
});
