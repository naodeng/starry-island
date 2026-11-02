import { describe, expect, it } from 'vitest';
import { grade2Term1MathTextbookSupplementalActivities } from './grade2Term1MathTextbookSupplementalActivities';

describe('二年级上册数学新教材补充闯关题', () => {
  it('为六个正式单元的每档提供足量原创候选题', () => {
    const units = ['01', '02', '03', '04', '05', '06'];
    const difficulties = ['basic', 'advanced', 'high'] as const;

    for (const unit of units) {
      for (const difficulty of difficulties) {
        const questions = grade2Term1MathTextbookSupplementalActivities.filter(({ activity, difficulty: level }) => (
          activity.id.includes(`unit-${unit}-${difficulty}-`) && level === difficulty
        ));
        const expectedCount = unit !== '04' ? 14 : difficulty === 'basic' ? 17 : 15;
        expect(questions, `unit-${unit} ${difficulty}`).toHaveLength(expectedCount);
        expect(new Set(questions.map(({ activity }) => activity.id)).size).toBe(questions.length);
        expect(new Set(questions.map(({ activity }) => activity.prompt)).size, `duplicate prompt in unit-${unit} ${difficulty}`).toBe(questions.length);
      }
    }
  });

  it('每题选项唯一且正确选项存在，知识点非空', () => {
    for (const { activity, knowledgePointIds } of grade2Term1MathTextbookSupplementalActivities) {
      expect(activity.kind, activity.id).toBe('choice');
      if (activity.kind !== 'choice') continue;
      expect(new Set(activity.options.map(({ label }) => label)).size, activity.id).toBe(activity.options.length);
      expect(activity.options.some(({ id }) => id === activity.correctOptionId), activity.id).toBe(true);
      expect(knowledgePointIds.length, activity.id).toBeGreaterThan(0);
      expect(activity.explanation.trim(), activity.id).not.toBe('');
    }
  });

  it('题面、提示和解析中没有遗留模板占位符', () => {
    for (const { activity } of grade2Term1MathTextbookSupplementalActivities) {
      const visibleText = [activity.prompt, activity.hint, activity.explanation];
      if (activity.kind === 'choice') visibleText.push(...activity.options.map(({ label }) => label));
      expect(visibleText.join('\n'), activity.id).not.toMatch(/\$\{[^}]+\}/u);
    }
  });

  it('长度单位选择与物体的常见尺度相符', () => {
    const basicLengthQuestions = grade2Term1MathTextbookSupplementalActivities
      .filter(({ difficulty, sourceUnitId }) => difficulty === 'basic' && sourceUnitId.endsWith('/unit-04'));
    const expectedUnitByObject = new Map([
      ['橡皮短边', '厘米'], ['铅笔长度', '厘米'], ['书本宽度', '厘米'], ['课桌高度', '厘米'],
      ['教室门高', '米'], ['操场一圈', '米'], ['书签长边', '厘米'], ['约2米长的彩带', '米'],
      ['走廊长度', '米'], ['窗台宽度', '厘米'], ['花坛边长', '米'], ['尺子长度', '厘米'],
      ['纸条长度', '厘米'], ['黑板宽度', '米'], ['杯垫宽度', '厘米'], ['跳绳长度', '米'],
      ['地垫短边', '厘米'], ['操场直道长度', '米'],
    ]);

    for (const { activity } of basicLengthQuestions) {
      if (activity.kind !== 'choice' || !activity.prompt.startsWith('测量')) continue;
      const object = activity.prompt.match(/^测量(.+?)时/u)?.[1];
      const expectedUnit = object ? expectedUnitByObject.get(object) : undefined;
      const answer = activity.options.find(({ id }) => id === activity.correctOptionId)?.label;
      expect(expectedUnit, activity.id).toBeDefined();
      expect(answer, activity.id).toBe(expectedUnit);
    }
  });
});
