import { describe, expect, it } from 'vitest';
import { loadUnit } from '../../content/unitLoader';
import { derivePilotQuestionKnowledgePointIds } from './pilotQuestionKnowledgePoints';
import { pilotChineseSupplementalActivities } from './pilotChineseSupplementalActivities';

describe('五年级语文补充闯关题', () => {
  it('每个难度提供十四道唯一候选题', () => {
    expect(pilotChineseSupplementalActivities).toHaveLength(42);
    expect(new Set(pilotChineseSupplementalActivities.map(({ activity }) => activity.id)).size).toBe(42);
    expect(Object.fromEntries(['basic', 'advanced', 'high'].map((difficulty) => [
      difficulty,
      pilotChineseSupplementalActivities.filter((item) => item.difficulty === difficulty).length,
    ]))).toEqual({ basic: 14, advanced: 14, high: 14 });
  });

  it('每道题声明的知识点与可见题目内容一致', () => {
    const mismatches = pilotChineseSupplementalActivities.flatMap((item) => {
      try {
        const actual = derivePilotQuestionKnowledgePointIds(item.sourceUnitId, item.activity);
        return JSON.stringify([...actual].sort()) === JSON.stringify([...item.knowledgePointIds].sort())
          ? []
          : [{ id: item.activity.id, expected: item.knowledgePointIds, actual }];
      } catch (error) {
        return [{ id: item.activity.id, expected: item.knowledgePointIds, actual: [String(error)] }];
      }
    });

    expect(mismatches).toEqual([]);
  });

  it('为单元内全部受支持课程候选题逐题生成知识点', async () => {
    const unit = await loadUnit('grade-5/term-1/chinese/unit-01');
    expect(unit).toBeDefined();
    const supportedKinds = new Set(['choice', 'match', 'order', 'categorize', 'arithmetic']);
    const activities = Object.values(unit!.difficultyTracks)
      .flatMap((track) => track.tasks.flatMap((task) => task.sessions.flatMap((session) => session.activities)))
      .filter((activity) => supportedKinds.has(activity.kind));
    const unclassifiedIds = activities.flatMap((activity) => {
      try {
        return derivePilotQuestionKnowledgePointIds('grade-5/term-1/chinese/unit-01', activity).length > 0 ? [] : [activity.id];
      } catch {
        return [activity.id];
      }
    });

    expect(activities).toHaveLength(48);
    expect(unclassifiedIds).toEqual([]);
  });

  it('题干模板不重复，选择题选项唯一且正确项未泄露在题干或提示中', () => {
    const normalizedPrompts = pilotChineseSupplementalActivities.map(({ activity }) => activity.prompt
      .normalize('NFKC')
      .replace(/\s*\d+(?:\.\d+)?\s*/gu, '#')
      .replace(/\p{P}/gu, '')
      .replace(/\s+/gu, ' ')
      .trim());

    expect(new Set(normalizedPrompts).size).toBe(normalizedPrompts.length);
    for (const { activity } of pilotChineseSupplementalActivities) {
      expect(activity.kind).toBe('choice');
      if (activity.kind !== 'choice') continue;
      expect(new Set(activity.options.map(({ id }) => id)).size).toBe(activity.options.length);
      expect(new Set(activity.options.map(({ label }) => label)).size).toBe(activity.options.length);
      const correct = activity.options.find(({ id }) => id === activity.correctOptionId);
      expect(correct).toBeDefined();
      expect(activity.prompt).not.toContain(correct?.label);
      expect(activity.hint).not.toContain(correct?.label);
    }
  });
});
