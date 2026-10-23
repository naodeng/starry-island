import { describe, expect, it } from 'vitest';
import { submitAnswer } from '../../learning/answers';
import { loadUnit } from '../../content/unitLoader';
import { grade1MathUnit04SupplementalActivities } from './grade1MathUnit04SupplementalActivities';

const difficulties = ['basic', 'advanced', 'high'] as const;
const knowledgePointIds = [
  'solid-shape-recognition',
  'solid-shape-features',
  'solid-shape-use',
];

describe('一年级上册数学第四单元闯关补充题', () => {
  it('为每档补足十四道唯一候选题，且全部答案可由生产评分器接受', () => {
    expect(grade1MathUnit04SupplementalActivities).toHaveLength(42);
    expect(new Set(grade1MathUnit04SupplementalActivities.map(({ activity }) => activity.id)).size).toBe(42);
    expect(Object.fromEntries(difficulties.map((difficulty) => [
      difficulty,
      grade1MathUnit04SupplementalActivities.filter((item) => item.difficulty === difficulty).length,
    ]))).toEqual({ basic: 14, advanced: 14, high: 14 });

    for (const { activity, sourceUnitId } of grade1MathUnit04SupplementalActivities) {
      expect(sourceUnitId).toBe('grade-1/term-1/math/unit-04');
      expect(activity.kind).toBe('choice');
      expect(activity.options).toHaveLength(3);
      expect(new Set(activity.options.map(({ label }) => label)).size).toBe(3);
      expect(activity.options.some(({ id }) => id === activity.correctOptionId)).toBe(true);
      expect(submitAnswer(activity, activity.correctOptionId)).toBe(true);
    }
  });

  it('每档都覆盖辨认立体图形、观察特征和生活应用', () => {
    for (const difficulty of difficulties) {
      const covered = new Set(grade1MathUnit04SupplementalActivities
        .filter((item) => item.difficulty === difficulty)
        .flatMap(({ knowledgePointIds }) => knowledgePointIds));
      expect(knowledgePointIds.filter((id) => covered.has(id))).toEqual(knowledgePointIds);
    }
  });

  it('题干、选项、提示和讲解使用通顺的形体词语', () => {
    for (const { activity } of grade1MathUnit04SupplementalActivities) {
      const copy = [activity.prompt, ...activity.options.map(({ label }) => label), activity.hint, activity.explanation].join(' ');
      expect(copy).not.toContain('平平面');
    }
  });

  it('补充题题干和提示不直接泄露正确选项', () => {
    for (const { activity } of grade1MathUnit04SupplementalActivities) {
      const correctLabel = activity.options.find(({ id }) => id === activity.correctOptionId)!.label;
      const escapedLabel = correctLabel.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&');
      const directAnswerDisclosure = new RegExp(`(?:答案(?:是|为)|正确答案|应选|应该选择)\\s*${escapedLabel}`, 'u');
      expect(activity.prompt).not.toMatch(directAnswerDisclosure);
      expect(activity.hint).not.toMatch(directAnswerDisclosure);
    }
  });

  it('补充题题干互不重复，也不照搬本单元原课程题干', async () => {
    const unit = await loadUnit('grade-1/term-1/math/unit-04');
    expect(unit).toBeDefined();
    const courseActivities = Object.values(unit!.difficultyTracks).flatMap((track) => track.tasks
      .flatMap((task) => task.sessions.flatMap((session) => session.activities)));
    const normalizePrompt = (prompt: string) => prompt.normalize('NFKC').replace(/[\s\p{P}\p{S}]/gu, '');
    const supplementalPrompts = grade1MathUnit04SupplementalActivities.map(({ activity }) => normalizePrompt(activity.prompt));
    const coursePrompts = new Set(courseActivities.map(({ prompt }) => normalizePrompt(prompt)));

    expect(new Set(supplementalPrompts).size).toBe(supplementalPrompts.length);
    expect(supplementalPrompts.every((prompt) => !coursePrompts.has(prompt))).toBe(true);
  });
});
