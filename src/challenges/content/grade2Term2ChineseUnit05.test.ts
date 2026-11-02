import { describe, expect, it } from 'vitest';
// @ts-expect-error Node.js is used only to verify that the unit-scoped content module exists.
import { existsSync, readFileSync } from 'node:fs';
// @ts-expect-error Node.js is used only to resolve the unit-scoped content module.
import { resolve } from 'node:path';
import type { ActivityDefinition } from '../../content/types';
import { loadUnit } from '../../content/unitLoader';
import {
  grade2Term2ChineseUnit05CoreKnowledgePointIds,
  grade2Term2ChineseUnit05SupplementalActivities,
} from './grade2Term2ChineseUnit05SupplementalActivities';
import unit05Manifest from './pilot-manifest-grade2-term2-chinese-unit05.json';
import { fingerprintActivity } from './fingerprint';
import { parseChallengeManifest } from './manifestSchema';
import { validateChallengeManifest } from './validateManifest';

declare const process: { cwd(): string };

const unitId = 'grade-2/term-2/chinese/unit-05';
const groupId = 'grade-2-term-2-chinese-unit-05';
const coreKnowledgePointIdSet = new Set<string>(grade2Term2ChineseUnit05CoreKnowledgePointIds);
const expectedAnswers = {
  basic: [
    '禾苗受到损伤，后来枯萎了', '再检查其他地方是否也需要修补', '这株植物最近长高了一些',
    '先了解他们分别站在哪里，再比较看到的部分', '留在安全地点，把情况告诉可信任的成人并一起确认',
    '前一句是亲自观察，后一句是听来的说法', '停在远离水边的安全处，马上找成人帮助',
    '修补后问题是否减少或再次出现', '画纸上画着一个黄色的圆形',
    '再观察土壤和叶片，并请懂得照料植物的人一起判断',
    '说出各自观察的位置和看到的部分', '找出漏掉的原因，补做后再检查一遍',
    '回想原目标、找出困难、想一个改进办法，再看结果',
    '急着改变事情却不顾条件，可能带来不好的结果',
  ],
  advanced: [
    '拉扯可能伤到了植物，还可以继续观察其他变化',
    '标出观察位置，请同学分别描述，再对照两份记录',
    '先留在安全的公共地点，查看园区指示并向工作人员或同行成人确认',
    '标明这是听来的说法，暂时不把它当作已确认的事实',
    '指出角色做了什么、结果怎样，再说明自己从中想到的经验',
    '过一会儿再检查漏点和周围，看看有没有新的水迹',
    '留在显眼的公共地点，联系同行成人或工作人员',
    '把新旧记录放在一起比较，再说明要修改哪一部分想法',
    '记录两人坐的位置，再从各自的位置看看画面有什么变化',
    '遵守路牌，留在开放路线并向同行成人确认',
    '说明自己从哪个位置观察，并指出看到的轮廓',
    '当时依据了哪些信息，后来又发现了什么新线索',
    '回看结果，找出需要改变的一步，再尝试合适的新办法',
    '写下每种说法来自亲自走过、地图指示还是别人转述',
  ],
  high: [
    '先定角色目标和困难，再安排行动与结果，最后让角色回看并调整',
    '选定两个安全位置，请同学分别记录所见，再一起比较轮廓',
    '先停在安全的开放区域，核对路牌并向同行成人或工作人员询问',
    '重新观察破损位置，找原因后调整修补方法，再检查效果',
    '用图片或模型表现水域，让角色停在岸边并向成人求助',
    '角色记下这次修补有效，并约好之后再检查',
    '请两人分别说明观察位置、看到的轮廓和判断依据',
    '先和家人核对开放路线、集合地点和求助办法',
    '先展示每个位置的观察记录，再单独说明小组的理解',
    '先听完建议，再观察实际情况并请可信任的成人一起判断',
    '留在安全区域，告诉带队成人并一起选择开放路线',
    '记下原先依据、后来发现的新线索和自己调整的地方',
    '注明观察位置、各自看到的部分，并遵守安全标线',
    '在结果前补上角色采取的行动和能看见的变化线索',
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

describe('二年级下册语文第五单元闯关内容', () => {
  it('源课覆盖三个登记主题，并保留 48 道兼容活动', async () => {
    const unit = await loadUnit(unitId);
    const activities = Object.values(unit!.difficultyTracks).flatMap((track) => track.tasks)
      .flatMap((task) => task.sessions.flatMap((session) => session.activities));

    expect(unit?.sourceTopics).toEqual([
      '《寓言二则》：从事情结果回看行动选择',
      '《画杨桃》：理解观察角度不同会带来不同画面',
      '《小马过河》：结合信息、询问和安全尝试作判断',
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

  it('每档新增 14 道原创题，覆盖全部核心知识点并保留唯一答案', () => {
    expect(grade2Term2ChineseUnit05SupplementalActivities).toHaveLength(42);
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const authored = grade2Term2ChineseUnit05SupplementalActivities.filter((candidate) => candidate.difficulty === difficulty);
      expect(authored).toHaveLength(14);
      expect(authored.map(({ activity }) => expectedAnswer(activity))).toEqual(expectedAnswers[difficulty]);
      expect(new Set(authored.flatMap(({ knowledgePointIds }) => knowledgePointIds)))
        .toEqual(new Set(grade2Term2ChineseUnit05CoreKnowledgePointIds));
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
    expect(new Set(grade2Term2ChineseUnit05SupplementalActivities.map(({ activity }) => activity.prompt)).size).toBe(42);
  });

  it('清单记录全组 90 道候选、五个任务和完整审核指纹', async () => {
    const unit = await loadUnit(unitId);
    const sourceActivities = Object.values(unit!.difficultyTracks).flatMap((track) => track.tasks)
      .flatMap((task) => task.sessions.flatMap((session) => session.activities));
    const allActivities = [...sourceActivities, ...grade2Term2ChineseUnit05SupplementalActivities.map(({ activity }) => activity)];
    const questions = unit05Manifest.questions;
    const group = unit05Manifest.groups.find(({ definition }) => definition.id === groupId);
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
      coreKnowledgePointIds: grade2Term2ChineseUnit05CoreKnowledgePointIds,
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
        .toEqual(new Set(grade2Term2ChineseUnit05CoreKnowledgePointIds));
    }

    const parsedManifest = parseChallengeManifest(unit05Manifest);
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
