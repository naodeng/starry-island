import { describe, expect, it } from 'vitest';
// @ts-expect-error Node.js is used only to verify the unit-scoped review ledger.
import { existsSync, readFileSync } from 'node:fs';
// @ts-expect-error Node.js is used only to resolve the unit-scoped review ledger.
import { resolve } from 'node:path';
import type { ActivityDefinition } from '../../content/types';
import { loadUnit } from '../../content/unitLoader';
import {
  grade2Term2ChineseUnit07CoreKnowledgePointIds,
  grade2Term2ChineseUnit07SupplementalActivities,
} from './grade2Term2ChineseUnit07SupplementalActivities';
import unit07Manifest from './pilot-manifest-grade2-term2-chinese-unit07.json';
import { fingerprintActivity } from './fingerprint';
import { parseChallengeManifest } from './manifestSchema';
import { validateChallengeManifest } from './validateManifest';

declare const process: { cwd(): string };

const unitId = 'grade-2/term-2/chinese/unit-07';
const groupId = 'grade-2-term-2-chinese-unit-07';
const coreKnowledgePointIdSet = new Set<string>(grade2Term2ChineseUnit07CoreKnowledgePointIds);
const expectedAnswers = {
  basic: [
    '分别写下看到的特点，不急着说哪一只不正常',
    '它可能正在寻找食物',
    '保持距离记下外形，请老师一起确认',
    '先查找可靠介绍，不只凭耳朵大小下结论',
    '按事情实际发生的先后介绍',
    '找出新情况出现前后，角色做法和结果有什么不同',
    '听听他们哪里看不懂，再换成清楚的图示',
    '观察大家卡在哪里，再调整分类并重新试用',
    '写下草地的变化，再把它会不会影响动物生活说成猜想',
    '记下不同日期看到的水边植物、遮挡和小动物活动',
    '记下日期和观察结果，过一段时间再继续观察',
    '给每张观察图写上日期，再按日期排列',
    '先记下遇到的新情况，再写出调整后的办法和结果',
    '先在安全位置观察几次，并记录出现的时间和地点',
  ],
  advanced: [
    '先核对时间、地点和光线，再对照各自的记录',
    '多次记录不同时间的活动，再查可靠资料核实',
    '回看结尾前的事件，找出和结果相关的线索',
    '请使用者指出卡住的地方，再试着调整图示和摆放位置',
    '先收集读者需要，再商量分类方法并查看是否方便查找',
    '把植物变化记下来，并继续观察动物活动和其他环境线索',
    '观察池边现状并请管理人员介绍动物和场地需要',
    '说明照片日期和能看到的变化，不猜测照片之间每天怎样变化',
    '核对原记录后补上日期，再按时间顺序排列',
    '按顺序说明原计划、遇到的新情况、调整办法和后来的结果',
    '记下这次的时间和地点，再观察它在其他时候的活动',
    '说明两种变化都被观察到，并把它们的关系留作进一步核实',
    '保留已有记录，按约定时间继续观察，不打扰小动物',
    '先分开介绍，再按外形、活动等方面逐项比较',
  ],
  high: [
    '先约定安全观察位置和时间，记录动物特点及周围环境',
    '改成描述照片中看到的情况，并把“总住在”列为待核实说法',
    '按顺序记录调整内容、读者遇到的困难和再次试用的结果',
    '先了解读者需要，分出适合的内容，再请读者试着查找',
    '先记录变化并咨询场地管理人员，再决定是否需要行动',
    '按日期排列实际记录，并把自己补画的部分标明是创作',
    '按较合适的间隔观察，继续记日期和变化，期间不翻动藏身处',
    '按事件顺序说出遇到的问题，再比较两种办法带来的结果',
    '用相近时间和方式记录两处环境与动物活动，再比较线索',
    '按顺序讲清故事里发生的事，再单独说明自己的理解',
    '说清两次记录的日期和变化，不补写没有观察到的每一天',
    '先听清范围，按约定记录环境和动物活动，再整理结果并归还用品',
    '请读者指出不明白的步骤，改写后再请伙伴试着照做',
    '先介绍观察对象与地点，再按时间展示事实，最后补充核实过的说明',
  ],
} as const;

function expectedAnswer(activity: ActivityDefinition): string {
  switch (activity.kind) {
    case 'choice': return activity.options.find(({ id }) => id === activity.correctOptionId)?.label ?? '';
    case 'match': return activity.pairs.map(({ left, right }) => `${left}→${right}`).join('；');
    case 'order': {
      const labels = new Map(activity.items.map(({ id, label }) => [id, label]));
      return activity.correctOrder.map((id) => labels.get(id) ?? '').join(' → ');
    }
    case 'categorize': {
      const categories = new Map(activity.categories.map(({ id, label }) => [id, label]));
      return activity.items.map(({ label, categoryId }) => `${label}→${categories.get(categoryId) ?? ''}`).join('；');
    }
    case 'arithmetic': return String(activity.correctAnswer);
    case 'measurement': return String(activity.targetLengthCm);
  }
}

function readTsv(path: string): Array<Record<string, string>> {
  const lines = (readFileSync(path, 'utf8') as string).trim().split(/\r?\n/u);
  const [headerLine = '', ...dataLines] = lines;
  const headers = headerLine.replace(/^\uFEFF/u, '').split('\t');
  return dataLines.map((line: string) => Object.fromEntries(headers.map((header: string, index: number) => [header, line.split('\t')[index] ?? ''])));
}

describe('二年级下册语文第七单元闯关内容', () => {
  it('源课覆盖四个登记主题，并保留 48 道兼容活动', async () => {
    const unit = await loadUnit(unitId);
    const activities = Object.values(unit!.difficultyTracks).flatMap((track) => track.tasks)
      .flatMap((task) => task.sessions.flatMap((session) => session.activities));

    expect(unit?.sourceTopics).toEqual([
      '《大象的耳朵》：观察动物特点并尊重差异',
      '《蜘蛛开店》：梳理事件顺序并根据新情况调整办法',
      '《青蛙卖泥塘》：认识环境变化与动物生活的关系',
      '《小毛虫》：按顺序了解成长变化并耐心等待',
    ]);
    expect(activities).toHaveLength(48);
    expect(Object.fromEntries(['choice', 'match', 'order', 'categorize'].map((kind) => [
      kind,
      activities.filter((activity) => activity.kind === kind).length,
    ]))).toEqual({ choice: 18, match: 12, order: 9, categorize: 9 });
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      expect(unit?.difficultyTracks[difficulty].tasks).toHaveLength(2);
      expect(unit?.difficultyTracks[difficulty].tasks.flatMap((task) => task.sessions)
        .flatMap((session) => session.activities)).toHaveLength(16);
    }
  });

  it('每档补 14 道原创题，覆盖全部核心知识点并保留唯一答案', () => {
    expect(grade2Term2ChineseUnit07SupplementalActivities).toHaveLength(42);
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const authored = grade2Term2ChineseUnit07SupplementalActivities.filter((candidate) => candidate.difficulty === difficulty);
      expect(authored).toHaveLength(14);
      expect(authored.map(({ activity }) => expectedAnswer(activity))).toEqual(expectedAnswers[difficulty]);
      expect(new Set(authored.flatMap(({ knowledgePointIds }) => knowledgePointIds)))
        .toEqual(new Set(grade2Term2ChineseUnit07CoreKnowledgePointIds));
      authored.forEach(({ activity, knowledgePointIds }, index) => {
        expect(activity.kind, `${difficulty} 第 ${index + 1} 题`).toBe('choice');
        expect(new Set(activity.options.map(({ label }) => label)).size, `${difficulty} 第 ${index + 1} 题选项`).toBe(3);
        expect(knowledgePointIds.every((id) => coreKnowledgePointIdSet.has(id))).toBe(true);
        expect(activity.hint.length, `${difficulty} 第 ${index + 1} 题提示`).toBeGreaterThan(0);
        expect(activity.explanation.length, `${difficulty} 第 ${index + 1} 题讲解`).toBeGreaterThan(0);
        expect(`${activity.prompt} ${activity.hint}`, `${difficulty} 第 ${index + 1} 题提示泄漏`)
          .not.toContain(expectedAnswer(activity));
      });
    }
    expect(new Set(grade2Term2ChineseUnit07SupplementalActivities.map(({ activity }) => activity.prompt)).size).toBe(42);
  });

  it('清单记录全组 90 道候选、五个任务和完整审核指纹', async () => {
    const unit = await loadUnit(unitId);
    const sourceActivities = Object.values(unit!.difficultyTracks).flatMap((track) => track.tasks)
      .flatMap((task) => task.sessions.flatMap((session) => session.activities));
    const allActivities = [...sourceActivities, ...grade2Term2ChineseUnit07SupplementalActivities.map(({ activity }) => activity)];
    const questions = unit07Manifest.questions;
    const group = unit07Manifest.groups.find(({ definition }) => definition.id === groupId);
    const ledgerPath = resolve(process.cwd(), `docs/challenges/${groupId}-question-review.tsv`);

    expect(group?.releaseIntent).toBe('released');
    expect(group?.definition).toMatchObject({
      id: groupId,
      kind: 'unit',
      grade: 2,
      semester: 2,
      subject: 'chinese',
      sourceUnitIds: [unitId],
      learningTaskUnitIds: [unitId],
      coreKnowledgePointIds: grade2Term2ChineseUnit07CoreKnowledgePointIds,
    });
    expect(group?.definition.tasks).toHaveLength(5);
    expect(group?.definition.tasks.map(({ targetCount }) => targetCount)).toEqual([15, 15, 15, 15, 15]);
    expect(questions).toHaveLength(90);
    expect(group?.questionIds).toHaveLength(90);
    expect(new Set(group?.questionIds)).toEqual(new Set(allActivities.map(({ id }) => `challenge-question:${id}`)));
    expect(new Set(questions.map(({ approvedContentFingerprint }) => approvedContentFingerprint))).toHaveLength(90);
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const tierQuestions = questions.filter((question) => question.difficulty === difficulty);
      expect(tierQuestions).toHaveLength(30);
      expect(new Set(tierQuestions.flatMap(({ knowledgePointIds }) => knowledgePointIds)))
        .toEqual(new Set(grade2Term2ChineseUnit07CoreKnowledgePointIds));
      expect(tierQuestions.every(({ knowledgePointIds }) => knowledgePointIds.every((id) => coreKnowledgePointIdSet.has(id)))).toBe(true);
    }

    const parsedManifest = parseChallengeManifest(unit07Manifest);
    const activitiesById = new Map(allActivities.map((activity) => [activity.id, activity]));
    const sourceUnitByActivityId = new Map(allActivities.map((activity) => [activity.id, unitId] as const));
    const report = await validateChallengeManifest(parsedManifest, activitiesById, sourceUnitByActivityId, new Map([[unitId, unit!]]));
    expect(report.errors).toEqual([]);
    expect(report.contentChanges).toEqual([]);
    expect(report.questionUniqueness.exactDuplicateGroups).toEqual([]);
    expect(report.groupStatusById[groupId]).toBe('ready');

    expect(existsSync(ledgerPath)).toBe(true);
    if (!existsSync(ledgerPath)) return;
    const rows = readTsv(ledgerPath);
    const rowsById = new Map(rows.map((row) => [row['题目ID'], row]));
    expect(rows).toHaveLength(90);
    expect(new Set(rowsById.keys())).toEqual(new Set(group?.questionIds));
    expect(rows.every(({ 审核状态 }) => 审核状态.includes('作者逐题自审通过') && 审核状态.includes('未独立教育者复核'))).toBe(true);
    expect(rows.every(({ 复核说明, 检查项 }) => Boolean(复核说明) && Boolean(检查项))).toBe(true);

    for (const question of questions) {
      const activity = activitiesById.get(question.activityId);
      const row = rowsById.get(question.questionId);
      expect(activity, question.activityId).toBeDefined();
      expect(row, question.questionId).toBeDefined();
      expect(question.lifecycle, question.questionId).toBe('active');
      expect(question.approved, question.questionId).toBe(true);
      expect(question.answerLeakageReviewed, question.questionId).toBe(true);
      expect(question.approvedBy, question.questionId).toBe('Codex content-author self-review');
      expect(question.approvedAt, question.questionId).toBe('2026-10-28T00:00:00.000Z');
      expect(question.approvedContentFingerprint, question.questionId).toMatch(/^[0-9a-f]{64}$/u);
      expect(row!['正确选项'], question.questionId).toBe(expectedAnswer(activity!));
      expect(row!['知识点'], question.questionId).toBe(question.knowledgePointIds.join('；'));
      expect(row!['内容指纹'], question.questionId).toBe(question.approvedContentFingerprint);
      expect(await fingerprintActivity(activity!), question.questionId).toBe(question.approvedContentFingerprint);
    }
  });
});
