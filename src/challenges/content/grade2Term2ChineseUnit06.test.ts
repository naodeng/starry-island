import { describe, expect, it } from 'vitest';
// @ts-expect-error Node.js is used only to verify the unit-scoped review ledger.
import { existsSync, readFileSync } from 'node:fs';
// @ts-expect-error Node.js is used only to resolve the unit-scoped review ledger.
import { resolve } from 'node:path';
import type { ActivityDefinition } from '../../content/types';
import { loadUnit } from '../../content/unitLoader';
import {
  grade2Term2ChineseUnit06CoreKnowledgePointIds,
  grade2Term2ChineseUnit06SupplementalActivities,
} from './grade2Term2ChineseUnit06SupplementalActivities';
import unit06Manifest from './pilot-manifest-grade2-term2-chinese-unit06.json';
import { fingerprintActivity } from './fingerprint';
import { parseChallengeManifest } from './manifestSchema';
import { validateChallengeManifest } from './validateManifest';

declare const process: { cwd(): string };

const unitId = 'grade-2/term-2/chinese/unit-06';
const groupId = 'grade-2-term-2-chinese-unit-06';
const coreKnowledgePointIdSet = new Set<string>(grade2Term2ChineseUnit06CoreKnowledgePointIds);
const expectedAnswers = {
  basic: [
    '乌云变厚，风变大', '明晚可能有雨',
    '乌云聚拢，雨点落下，雨停后地面留下水迹', '窗外的雨点落在地面上',
    '留在室内安全的位置，并听从成人安排', '我看到乌云变多，猜想可能要下雨',
    '留在安全处，隔一段时间再记录水洼边缘', '对照地图方向标记，并请成人确认路线',
    '观察北极星所在的大致方位', '停在安全地点，联系老师、家长或同行成人',
    '先看地图上的方向标记，再按说明使用指南针', '把用品固定在指定位置，用完后放回去',
    '没有固定好的小物品可能会飘动', '可靠的航天科普读物或教育资料',
  ],
  advanced: [
    '写下同一地点的时间和现象，并按雨前、雨中、雨后排列',
    '先停在安全位置，把差异告诉成人并一起核对路线',
    '乌云变多是观察到的线索，但不能单凭它确定每次都会下雨',
    '留在安全地点，和成人一起查看地图或使用指南针',
    '把星空线索与地图一起核对，并向同行成人确认',
    '用固定装置收好用品，并在使用后放回原处',
    '说明固定用品能减少飘动，方便宇航员安全使用',
    '我观察到午后乌云变厚，猜想傍晚可能下雨',
    '听从带队成人安排，停在安全位置并按计划联系集合',
    '写清固定用品能减少飘动，使用后归位更方便',
    '在安全地点、相近位置隔一段时间再观察并记录',
    '查看可靠的星空图或请成人一起确认，再与地图对照',
    '“乌云变多”是观察，“可能会下雨”是推测',
    '分别标出观察的时间地点与预测内容，并说明预测尚未发生',
  ],
  high: [
    '写明时间地点，按雨前、雨中、雨后记现象，并加上安全观察方法',
    '先和成人看地图、确认集合点，沿约定路线结伴行走并及时报告变化',
    '先说观察到的现象，再介绍固定用品的办法和它的作用',
    '标清时间地点，再找出可以直接对照的现象',
    '停在安全地点，联系带队成人并按约定等待帮助',
    '先停在安全地点，联系成人确认替代路线并按约定行动',
    '在成人安排的室内安全位置记录，并在天气平稳后再观察室外变化',
    '写成“我观察到乌云变多，这可能是天气变化的线索”',
    '标明哪些内容来自科普资料，哪些是自己设计的画面',
    '用轻软道具在桌面演示，并按老师要求收好物品',
    '停在安全位置，联系同行成人并等待确认路线',
    '保留每次观察和猜想，回看哪些线索支持或不支持判断',
    '先留在安全处，向带队成人说明差异并一起核对资料',
    '分别标出观察的时间地点与预测内容，并说明预测尚未发生',
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

describe('二年级下册语文第六单元闯关内容', () => {
  it('源课覆盖四个登记主题，并保留 48 道兼容活动', async () => {
    const unit = await loadUnit(unitId);
    const activities = Object.values(unit!.difficultyTracks).flatMap((track) => track.tasks)
      .flatMap((task) => task.sessions.flatMap((session) => session.activities));

    expect(unit?.sourceTopics).toEqual([
      '《古诗二首》：借助画面线索理解季节与景物',
      '《雷雨》：按雨前、雨中和雨后观察天气变化',
      '《要是你在野外迷了路》：认识辨认方向的自然线索并重视安全',
      '《太空生活趣事多》：了解太空环境中的生活现象',
    ]);
    expect(activities).toHaveLength(48);
    expect(Object.fromEntries(['choice', 'match', 'order', 'categorize'].map((kind) => [
      kind,
      activities.filter((activity) => activity.kind === kind).length,
    ]))).toEqual({ choice: 18, match: 12, order: 7, categorize: 11 });
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      expect(unit?.difficultyTracks[difficulty].tasks).toHaveLength(2);
      expect(unit?.difficultyTracks[difficulty].tasks.flatMap((task) => task.sessions)
        .flatMap((session) => session.activities)).toHaveLength(16);
    }
  });

  it('每档新增 14 道原创题，覆盖全部核心知识点并保留唯一答案', () => {
    expect(grade2Term2ChineseUnit06SupplementalActivities).toHaveLength(42);
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const authored = grade2Term2ChineseUnit06SupplementalActivities.filter((candidate) => candidate.difficulty === difficulty);
      expect(authored).toHaveLength(14);
      expect(authored.map(({ activity }) => expectedAnswer(activity))).toEqual(expectedAnswers[difficulty]);
      expect(new Set(authored.flatMap(({ knowledgePointIds }) => knowledgePointIds)))
        .toEqual(new Set(grade2Term2ChineseUnit06CoreKnowledgePointIds));
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
    expect(new Set(grade2Term2ChineseUnit06SupplementalActivities.map(({ activity }) => activity.prompt)).size).toBe(42);
  });

  it('清单记录全组 90 道候选、五个任务和完整审核指纹', async () => {
    const unit = await loadUnit(unitId);
    const sourceActivities = Object.values(unit!.difficultyTracks).flatMap((track) => track.tasks)
      .flatMap((task) => task.sessions.flatMap((session) => session.activities));
    const allActivities = [...sourceActivities, ...grade2Term2ChineseUnit06SupplementalActivities.map(({ activity }) => activity)];
    const questions = unit06Manifest.questions;
    const group = unit06Manifest.groups.find(({ definition }) => definition.id === groupId);
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
      coreKnowledgePointIds: grade2Term2ChineseUnit06CoreKnowledgePointIds,
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
        .toEqual(new Set(grade2Term2ChineseUnit06CoreKnowledgePointIds));
      expect(tierQuestions.every(({ knowledgePointIds }) => knowledgePointIds.every((id) => coreKnowledgePointIdSet.has(id)))).toBe(true);
    }

    const parsedManifest = parseChallengeManifest(unit06Manifest);
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
