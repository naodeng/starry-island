import { describe, expect, it } from 'vitest';
import { fingerprintActivity } from './fingerprint';
import { grade1Term2MathUnit02SupplementalActivities } from './grade1Term2MathUnit02SupplementalActivities';

describe('Grade 1 Term 2 Math Unit 2 supplemental challenge activities', () => {
  it('keeps the originally reviewed answer keys after rotating answer positions', () => {
    const expectedCorrectLabels = [
      '8', '5个', '8颗', '7', '7张', '9个', '7个', '9',
      '13拆成10和3；10−5=5；5+3=8', '再减2，得8', '14', '13−6', '8+5=13', '13−5',
      '15拆成10和5，10−7=3，再加5得8', '再减2，得8', '10−2=8', '7本', '14', '8+6=14',
      '正确结果是7，因为7+8=15', '两个差都是7', '16−8，因为减去的数较小', '减2，结果是8', '8片',
      '乙盒多1颗', '8', '8',
      '8+6=14，所以差应是8', '7个', '两种方法都得到7', '5张', '14', '再减5，得5',
      '拆出的3要加回来；4+3=7', '8张', '6', '差应是7，因为7+5=12', '两人都剩8张',
      '差变成6，比原来少1', '7+6=13，回到了被减数', '10−6=4，再加3，得7',
      '8张', '小明算1+6=7；小红算10−3=7，结果相同',
    ];
    const originalActivities = grade1Term2MathUnit02SupplementalActivities.filter(({ activity }) => {
      const [difficulty, sequence] = activity.id.split('-').slice(-2);
      return Number(sequence) <= (difficulty === 'high' ? 16 : 14);
    });
    const actualCorrectLabels = originalActivities.map(({ activity }) =>
      activity.options.find(({ id }) => id === activity.correctOptionId)?.label);

    expect(actualCorrectLabels).toEqual(expectedCorrectLabels);
  });

  it('uses distinct prompts for different unknown-number and subtraction-selection skills', () => {
    const promptsById = new Map(grade1Term2MathUnit02SupplementalActivities.map(({ activity }) => [activity.id, activity.prompt]));

    expect(promptsById.get('challenge-supplement-grade-1-term-2-math-unit-02-advanced-11'))
      .toBe('小树原有15片叶子，被风吹掉一些后还剩7片。风吹掉了几片？');
    expect(promptsById.get('challenge-supplement-grade-1-term-2-math-unit-02-advanced-13'))
      .toBe('有一道减法，差是6，被减数是14，减数是多少？');
    expect(promptsById.get('challenge-supplement-grade-1-term-2-math-unit-02-basic-14'))
      .toBe('小军有13块积木，送给朋友5块。哪道算式表示还剩的积木？');
    expect(promptsById.get('challenge-supplement-grade-1-term-2-math-unit-02-high-07'))
      .toBe('小亮计算13−6，把13拆成10和3，先算10−6=4，再算4−3=1。错在哪里？');
    expect(promptsById.get('challenge-supplement-grade-1-term-2-math-unit-02-high-16'))
      .toBe('计算16−9时，小明先算10减9再加6，小红先从16减6到10再减3。哪句话说明两种方法都对？');
    expect(promptsById.get('challenge-supplement-grade-1-term-2-math-unit-02-high-17'))
      .toBe('有一道减法，15−8=7。如果被减数增加1、减数不变，新的差是多少？');
    expect(promptsById.get('challenge-supplement-grade-1-term-2-math-unit-02-high-18'))
      .toBe('盒子里有16块橡皮，先送走7块，后来又放进3块。盒子里现在有几块？');
  });

  it('adds two reviewed high-tier replacements and keeps all 46 IDs and fingerprints unique', async () => {
    expect(grade1Term2MathUnit02SupplementalActivities).toHaveLength(46);
    expect(new Set(grade1Term2MathUnit02SupplementalActivities.map(({ activity }) => activity.id)).size).toBe(46);
    expect(new Set(await Promise.all(grade1Term2MathUnit02SupplementalActivities.map(({ activity }) => fingerprintActivity(activity))))
      .size).toBe(46);

    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const items = grade1Term2MathUnit02SupplementalActivities.filter((item) => item.difficulty === difficulty);
      const expectedCount = difficulty === 'high' ? 18 : 14;
      expect(items).toHaveLength(expectedCount);
      const answerPositions = [0, 0, 0];
      const normalizedPrompts = items.map(({ activity }) => activity.prompt.replace(/[^\p{L}\p{N}]/gu, ''));
      expect(new Set(normalizedPrompts).size).toBe(expectedCount);

      for (const { activity, sourceUnitId, knowledgePointIds } of items) {
        expect(sourceUnitId).toBe('grade-1/term-2/math/unit-02');
        expect(activity.options).toHaveLength(3);
        expect(new Set(activity.options.map(({ label }) => label)).size).toBe(3);
        expect(activity.options.some(({ id }) => id === activity.correctOptionId)).toBe(true);
        expect(activity.prompt).not.toBe('');
        expect(activity.hint).not.toBe('');
        expect(activity.explanation).not.toBe('');
        expect(knowledgePointIds.length).toBeGreaterThan(0);
        const answerPosition = activity.options.findIndex(({ id }) => id === activity.correctOptionId);
        answerPositions[answerPosition] = (answerPositions[answerPosition] ?? 0) + 1;
      }

      expect([...answerPositions].sort()).toEqual(difficulty === 'high' ? [6, 6, 6] : [4, 5, 5]);
    }
  });

  it('checks the new high-tier relation and mixed-operation answers', () => {
    const answers = new Map(grade1Term2MathUnit02SupplementalActivities.map(({ activity }) => [
      activity.id,
      activity.options.find(({ id }) => id === activity.correctOptionId)?.label,
    ]));

    expect(answers.get('challenge-supplement-grade-1-term-2-math-unit-02-high-17')).toBe('8');
    expect(answers.get('challenge-supplement-grade-1-term-2-math-unit-02-high-18')).toBe('12块');
  });
});
