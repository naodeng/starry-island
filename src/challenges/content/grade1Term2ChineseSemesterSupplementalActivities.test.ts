import { describe, expect, it } from 'vitest';
// @ts-expect-error Node built-ins are available in Vitest for checking the author review ledger.
import { existsSync, readFileSync } from 'node:fs';
// @ts-expect-error Node built-ins are available in Vitest for resolving the review ledger.
import { resolve } from 'node:path';
import { derivePilotQuestionKnowledgePointIds } from './pilotQuestionKnowledgePoints';
import { fingerprintActivity } from './fingerprint';
import { grade1Term2ChineseSemesterSupplementalActivities } from './grade1Term2ChineseSemesterSupplementalActivities';

declare const process: { cwd(): string };

function readTsv(path: string): Array<Record<string, string>> {
  const lines = readFileSync(path, 'utf8').trim().split(/\r?\n/u) as string[];
  const [headerLine = '', ...dataLines] = lines;
  const headers = headerLine.replace(/^\uFEFF/u, '').split('\t');
  return dataLines.map((line: string) => {
    const values = line.split('\t');
    return Object.fromEntries(headers.map((header: string, index: number) => [header, values[index] ?? '']));
  });
}

describe('一年级下册语文阶段组原创高阶补题', () => {
  it('逐题核对答案、来源主题、提示、选项和活动指纹', async () => {
    const expectedAnswers = [
      '这两天看到的花有变化',
      '在相同时间、相近位置观察并分别记下看到的叶子',
      '观察时看到的叶子样子和先后时间',
      '爸爸陪“我”练习，休息后继续尝试',
      '我想学会照顾阳台上的花，先和家人一起每天观察一次',
      '这次旅行发生在海边',
      '约定顺序，用完后交给下一位',
      '对照每次掷骰和前进步数，看是不是一次一格',
      '写明谁先开始、每人整理哪一层、完成后告诉下一位',
      '写下观察日期、时间和月亮看起来的样子',
      '先问“您好，我可以拿一块点心吗？”并等对方回应',
      '“窗外有月亮”是观察，“像小船”是小安的想象',
      '按座位方向检查每个人是否都读到一页',
      '这只麻雀的嘴短而尖，并在地上啄食',
      '在转弯处慢慢走，并留意前面的同学',
      '站在稍远处安静观察，把看到的动作记下来',
      '每天在相近时间观察同一处，并写下日期和样子',
      '这两次观察到的蜻蜓数量不同',
      '每张卡写的天气和观察时间，再按时间先后核对',
      '对照课表逐项检查，再把用品放进固定位置',
      '用完尺子后放回书包里固定的文具袋',
      '再看一次课表，确认当天用品都装好了',
      '先把胡萝卜放在窗边，后来发现影子变短',
      '因为它想让纸船留在屋里，不被雨淋湿',
      '再找能辨认脚印和时间的线索，不能只凭“湿”判断动物',
      '小刺猬把水杯打翻了',
    ];
    const items = grade1Term2ChineseSemesterSupplementalActivities;

    expect(items).toHaveLength(26);
    expect(items.every(({ difficulty }) => difficulty === 'high')).toBe(true);
    expect(items.map(({ activity }) => activity.prompt).length).toBe(new Set(items.map(({ activity }) => activity.prompt)).size);
    expect(items.map(({ activity }) => activity.options.find(({ id }) => id === activity.correctOptionId)?.label)).toEqual(expectedAnswers);

    const correctPositionCounts = [0, 0, 0];
    for (const [index, item] of items.entries()) {
      const { activity, sourceUnitId, knowledgePointIds } = item;
      const correctPosition = activity.options.findIndex(({ id }) => id === activity.correctOptionId);
      const correctAnswer = activity.options[correctPosition]?.label ?? '';
      correctPositionCounts[correctPosition] += 1;
      expect(sourceUnitId).toMatch(/^grade-1\/term-2\/chinese\/unit-0[1-8]$/u);
      expect(knowledgePointIds).toEqual(derivePilotQuestionKnowledgePointIds(sourceUnitId, activity));
      expect(activity.options).toHaveLength(3);
      expect(new Set(activity.options.map(({ label }) => label)).size).toBe(3);
      expect(activity.hint).not.toContain(correctAnswer);
      expect(activity.explanation.trim().length).toBeGreaterThan(0);
      expect(correctPosition).toBe(index % 3);
    }
    expect(Math.max(...correctPositionCounts) - Math.min(...correctPositionCounts)).toBeLessThanOrEqual(1);
    expect(new Set(await Promise.all(items.map(({ activity }) => fingerprintActivity(activity)))).size).toBe(items.length);
  });

  it('在中文逐题台账中完整记录原创题干、正确选项、解析和审核边界', () => {
    const path = resolve(process.cwd(), 'docs/challenges/grade-1-term-2-chinese-semester-supplemental-question-review.tsv');
    expect(existsSync(path)).toBe(true);
    if (!existsSync(path)) return;
    const rows = readTsv(path);
    const reviewById = new Map(rows.map((row) => [row['题目ID'], row]));

    expect(reviewById.size).toBe(grade1Term2ChineseSemesterSupplementalActivities.length);
    for (const { activity } of grade1Term2ChineseSemesterSupplementalActivities) {
      const row = reviewById.get(`challenge-question:${activity.id}`);
      const correctAnswer = activity.options.find(({ id }) => id === activity.correctOptionId)?.label ?? '';
      expect(row?.['题干']).toBe(activity.prompt);
      expect(row?.['选项与正确答案']).toContain(`答案键：${correctAnswer}`);
      expect(row?.['解析与反馈']).toContain(activity.explanation);
      expect(row?.['逐题审核记录']).toContain('唯一答案');
      expect(row?.['审核状态']).toContain('作者自审通过');
      expect(row?.['审核状态']).toContain('未独立教育者复核');
    }
  });
});
