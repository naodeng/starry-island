import { describe, expect, it } from 'vitest';
import { submitAnswer } from '../../learning/answers';
import { loadUnit } from '../../content/unitLoader';
import { grade1MathUnit05SupplementalActivities } from './grade1MathUnit05SupplementalActivities';

const difficulties = ['basic', 'advanced', 'high'] as const;
const knowledgePointIds = [
  'number-sequence-within-ten',
  'number-composition-within-ten',
  'addition-within-ten',
  'subtraction-within-ten',
  'comparison-within-ten',
  'checking-within-ten',
];

describe('一年级上册数学第五单元闯关补充题', () => {
  it('每档补足十五道唯一候选题，且登记答案能通过生产评分器', () => {
    expect(grade1MathUnit05SupplementalActivities).toHaveLength(45);
    expect(new Set(grade1MathUnit05SupplementalActivities.map(({ activity }) => activity.id)).size).toBe(45);
    expect(Object.fromEntries(difficulties.map((difficulty) => [
      difficulty,
      grade1MathUnit05SupplementalActivities.filter((item) => item.difficulty === difficulty).length,
    ]))).toEqual({ basic: 15, advanced: 15, high: 15 });

    for (const { activity, sourceUnitId } of grade1MathUnit05SupplementalActivities) {
      expect(sourceUnitId).toBe('grade-1/term-1/math/unit-05');
      expect(activity.kind).toBe('choice');
      expect(activity.options).toHaveLength(3);
      expect(new Set(activity.options.map(({ label }) => label)).size).toBe(3);
      expect(activity.options.some(({ id }) => id === activity.correctOptionId)).toBe(true);
      expect(submitAnswer(activity, activity.correctOptionId)).toBe(true);
    }
  });

  it('每档均覆盖数序、数的组成、加减、比较和计算检查', () => {
    for (const difficulty of difficulties) {
      const covered = new Set(grade1MathUnit05SupplementalActivities
        .filter((item) => item.difficulty === difficulty)
        .flatMap(({ knowledgePointIds }) => knowledgePointIds));
      expect(knowledgePointIds.filter((id) => covered.has(id))).toEqual(knowledgePointIds);
    }
  });

  it('每题都有面向一年级学生的提示和解释，且没有直接泄露答案', () => {
    for (const { activity } of grade1MathUnit05SupplementalActivities) {
      expect(activity.hint.trim().length).toBeGreaterThan(0);
      expect(activity.explanation.trim().length).toBeGreaterThan(0);
      const correctLabel = activity.options.find(({ id }) => id === activity.correctOptionId)!.label;
      const escapedLabel = correctLabel.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&');
      const directAnswerDisclosure = new RegExp(`(?:答案(?:是|为)|正确答案|应选|应该选择)\\s*${escapedLabel}`, 'u');
      expect(activity.prompt).not.toMatch(directAnswerDisclosure);
      expect(activity.hint).not.toMatch(directAnswerDisclosure);
    }
  });

  it('补充题题干互不重复，也不照搬本单元原课程题干', async () => {
    const unit = await loadUnit('grade-1/term-1/math/unit-05');
    expect(unit).toBeDefined();
    const courseActivities = Object.values(unit!.difficultyTracks).flatMap((track) => track.tasks
      .flatMap((task) => task.sessions.flatMap((session) => session.activities)));
    const normalizePrompt = (prompt: string) => prompt.normalize('NFKC').replace(/[\s\p{P}\p{S}]/gu, '');
    const supplementalPrompts = grade1MathUnit05SupplementalActivities.map(({ activity }) => normalizePrompt(activity.prompt));
    const coursePrompts = new Set(courseActivities.map(({ prompt }) => normalizePrompt(prompt)));

    expect(new Set(supplementalPrompts).size).toBe(supplementalPrompts.length);
    expect(supplementalPrompts.every((prompt) => !coursePrompts.has(prompt))).toBe(true);
  });
});
