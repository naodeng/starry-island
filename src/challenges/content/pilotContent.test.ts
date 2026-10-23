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

    expect(content.groups.map(({ group, status }) => [group.definition.id, status])).toEqual([
      ['grade-2-term-1-math-unit-02', 'ready'],
      ['grade-2-term-1-math-first-half', 'ready'],
      ['grade-3-term-1-english-unit-01', 'ready'],
      ['grade-5-term-1-chinese-unit-01', 'ready'],
      ['grade-1-term-1-math-unit-01', 'ready'],
      ['grade-1-term-1-math-unit-02', 'ready'],
      ['grade-1-term-1-math-unit-03', 'ready'],
    ]);
    expect(content.groups[0]?.candidates).toHaveLength(90);
    expect(content.groups[1]?.candidates).toHaveLength(226);
    expect(content.groups[2]?.candidates).toHaveLength(90);
    expect(content.groups[3]?.candidates).toHaveLength(90);
    expect(content.groups[4]?.candidates).toHaveLength(90);
    expect(content.groups[5]?.candidates).toHaveLength(90);
    expect(content.groups[6]?.candidates).toHaveLength(90);
    expect(content.groups.every(({ disabledQuestionIds }) => disabledQuestionIds.length === 0)).toBe(true);
    expect(content.groups[1]?.candidates.every(({ contentFingerprint, activity }) => contentFingerprint && activity.id)).toBe(true);
    expect(content.validation.errors).toEqual([]);
  });

  it('scores the declared correct answer for every unique pilot candidate through the production grader', async () => {
    const content = await loadPilotChallengeContent();
    const candidatesByQuestionId = new Map(content.groups.flatMap(({ candidates }) => candidates)
      .map((candidate) => [candidate.questionId, candidate]));
    const candidates = [...candidatesByQuestionId.values()];

    expect(candidates).toHaveLength(676);
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

  it('connects pilot knowledge points to existing learning tasks without changing their content', async () => {
    const content = await loadPilotChallengeContent();
    const unitGroup = content.groups.find(({ group }) => group.definition.id === 'grade-2-term-1-math-unit-02');
    const additionTask = unitGroup?.learningTasks.find(({ taskId }) => taskId === 'grade-2/term-1/math/unit-02/basic/task-01');
    const subtractionTask = unitGroup?.learningTasks.find(({ taskId }) => taskId === 'grade-2/term-1/math/unit-02/basic/task-02');

    expect(additionTask).toMatchObject({ title: '进位加法能量站', knowledgePointIds: ['two-digit-addition'] });
    expect(subtractionTask).toMatchObject({ title: '退位减法与生活题', knowledgePointIds: ['two-digit-subtraction'] });
    expect(additionTask?.activityIds).toContain('grade-2/term-1/math/unit-02/basic/task-01/session-01/question-01');
  });

  it('provides an existing learning task for every tagged knowledge point in each pilot group', async () => {
    const content = await loadPilotChallengeContent();

    for (const { candidates, learningTasks } of content.groups) {
      const knowledgePointIds = new Set(candidates.flatMap(({ knowledgePointIds: ids }) => ids));
      for (const knowledgePointId of knowledgePointIds) {
        expect(learningTasks.some(({ knowledgePointIds: taskIds }) => taskIds.includes(knowledgePointId))).toBe(true);
      }
    }
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
