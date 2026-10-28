import { describe, expect, it } from 'vitest';
// @ts-expect-error Node.js is used only to verify that the unit-scoped content module exists.
import { existsSync, readFileSync } from 'node:fs';
// @ts-expect-error Node.js is used only to resolve the unit-scoped content module.
import { resolve } from 'node:path';
import type { ActivityDefinition } from '../../content/types';
import { loadUnit } from '../../content/unitLoader';
import {
  grade2Term2ChineseUnit04CoreKnowledgePointIds,
  grade2Term2ChineseUnit04SupplementalActivities,
} from './grade2Term2ChineseUnit04SupplementalActivities';
import unit04Manifest from './pilot-manifest-grade2-term2-chinese-unit04.json';
import { fingerprintActivity } from './fingerprint';
import { parseChallengeManifest } from './manifestSchema';
import { validateChallengeManifest } from './validateManifest';

declare const process: { cwd(): string };

const unitId = 'grade-2/term-2/chinese/unit-04';
const groupId = 'grade-2-term-2-chinese-unit-04';
const coreKnowledgePointIdSet = new Set<string>(grade2Term2ChineseUnit04CoreKnowledgePointIds);
const expectedAnswers = {
  basic: [
    '它像一艘弯弯的小船', '雨点敲在屋檐上，发出轻轻的答答声', '窗台上有一颗透明的小水珠',
    '我觉得那片云像一只慢慢游动的鲸鱼', '放学后，小队在校园的小花园集合', '沿着脚印看看它通向哪里',
    '轮流补充一句，并先听完伙伴的话', '复述他的想法，再问大家要不要把桥接进情节',
    '草根旁的小缝和一颗圆圆的露珠', '小路、池塘和树丛之间的位置', '她想到可能要下雨，想先保护画纸',
    '先看看路面是否平稳，再决定怎样通过', '水面亮亮的，岸边传来青蛙的叫声',
    '先写花瓣随风轻轻摇动，再写我觉得它像在打招呼',
  ],
  advanced: [
    '湿痕亮亮的，我觉得它像一面小镜子', '记下这道沟，再观察周围有没有新的线索',
    '先听见树叶沙沙响，再看见风把一片叶子送到小路边',
    '一滴水落在身边，地面出现了浅浅的小水洼',
    '先发现落叶挡路，再商量办法，清开后继续前进',
    '先说清共同目标，再比较两个办法怎样帮助角色找到路',
    '他听见池塘边传来求助声，便想去看看发生了什么',
    '先看石头旁边哪里干燥，再试着走一小段并回头检查',
    '角色尝试的办法，以及办法带来的变化',
    '窗沿有一条细细的亮边，旁边的灰尘慢慢浮动',
    '分别说出结尾怎样回应困难，再一起选择或连接合适的部分',
    '我看见树影在摇动，猜想可能是风吹动了树枝',
    '先交代角色在哪里、要去哪里，再说他遇到了什么',
    '看看鲸鱼怎样帮助情节发展，并商量它是否符合大家的故事方向',
  ],
  high: [
    '先商量角色和地点，再轮流补充线索与办法，最后检查结尾是否解决问题',
    '听每个人说明理由，再看哪个结尾更回应角色遇到的困难',
    '先观察脚边哪里不滑，再沿着安全的叶片边缘慢慢前进',
    '先说明这是一个想象，再补充看到花瓣轻轻摇动的线索',
    '介绍地点和角色、发现铃铛不见、沿声音线索寻找、说明找到后的结果',
    '补上羽毛上的颜色线索，并说明角色沿着线索去了操场',
    '各自找出角色前后的行动线索，再说明哪种理解得到支持',
    '小鸟先看见小路和花坛，小蚂蚁先注意身旁的泥土和细缝',
    '找共同线索把它们连起来，连不起来时再商量保留哪个',
    '补充他沿着水迹找到被雨淋湿的帽子，并说明接下来怎样处理',
    '先听他说想补充什么，再安排轮流发言并共同检查每个点子',
    '树叶挡住刺眼的阳光，旁边的小路没有吵闹声',
    '对小虫子来说，草叶上的露珠像一颗大弹珠',
    '回看前文的线索，补一句说明角色听见或看见了什么',
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
  const tsvLines = (readFileSync(path, 'utf8') as string).trim().split(/\r?\n/u);
  const [headerLine = '', ...dataLines] = tsvLines;
  const headers = headerLine.replace(/^\uFEFF/u, '').split('\t');
  return dataLines.map((line: string) => Object.fromEntries(headers.map((header: string, index: number) => [header, line.split('\t')[index] ?? ''])));
}

describe('二年级下册语文第四单元闯关内容', () => {
  it('源课覆盖四个登记主题，并保留 48 道分档课程活动', async () => {
    const unit = await loadUnit(unitId);
    const activities = Object.values(unit!.difficultyTracks).flatMap((track) => track.tasks)
      .flatMap((task) => task.sessions.flatMap((session) => session.activities));

    expect(unit?.sourceTopics).toEqual([
      '《彩色的梦》：用颜色和景物组织想象',
      '《枫树上的喜鹊》：从观察和想象理解人物交流',
      '《沙滩上的童话》：合作创编故事情节',
      '《我是一只小虫子》：换个角度观察生活',
    ]);
    expect(activities).toHaveLength(48);
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      expect(unit?.difficultyTracks[difficulty].tasks).toHaveLength(2);
      expect(unit?.difficultyTracks[difficulty].tasks.flatMap((task) => task.sessions)
        .flatMap((session) => session.activities)).toHaveLength(16);
    }
  });

  it('每档新增 14 道原创题，覆盖全部核心知识点并保留唯一答案', () => {
    expect(grade2Term2ChineseUnit04SupplementalActivities).toHaveLength(42);
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const authored = grade2Term2ChineseUnit04SupplementalActivities.filter((candidate) => candidate.difficulty === difficulty);
      expect(authored).toHaveLength(14);
      expect(authored.map(({ activity }) => expectedAnswer(activity))).toEqual(expectedAnswers[difficulty]);
      expect(new Set(authored.flatMap(({ knowledgePointIds }) => knowledgePointIds)))
        .toEqual(new Set(grade2Term2ChineseUnit04CoreKnowledgePointIds));
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
    expect(new Set(grade2Term2ChineseUnit04SupplementalActivities.map(({ activity }) => activity.prompt)).size).toBe(42);
  });

  it('清单记录全组 90 道候选、五个任务和完整审核指纹', async () => {
    const unit = await loadUnit(unitId);
    const sourceActivities = Object.values(unit!.difficultyTracks).flatMap((track) => track.tasks)
      .flatMap((task) => task.sessions.flatMap((session) => session.activities));
    const allActivities = [...sourceActivities, ...grade2Term2ChineseUnit04SupplementalActivities.map(({ activity }) => activity)];
    const questions = unit04Manifest.questions;
    const group = unit04Manifest.groups.find(({ definition }) => definition.id === groupId);
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
      coreKnowledgePointIds: grade2Term2ChineseUnit04CoreKnowledgePointIds,
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
        .toEqual(new Set(grade2Term2ChineseUnit04CoreKnowledgePointIds));
    }

    const parsedManifest = parseChallengeManifest(unit04Manifest);
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
