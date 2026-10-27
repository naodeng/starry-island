import { describe, expect, it } from 'vitest';
// @ts-expect-error Node.js is used only to inspect the local review ledger during Vitest.
import { existsSync, readFileSync } from 'node:fs';
// @ts-expect-error Node.js is used only to resolve the local review ledger during Vitest.
import { resolve } from 'node:path';
import type { ActivityDefinition } from '../../content/types';
import { loadUnit } from '../../content/unitLoader';
import { growthGroups } from './growthGroups';
import { loadPilotChallengeContent } from './pilotContent';
import { getPilotUnitChallengeGroupId } from './unitLinks';
import manifest from './pilotManifest';
import { derivePilotQuestionKnowledgePointIds } from './pilotQuestionKnowledgePoints';
import { grade2Term2ChineseUnit01SupplementalActivities } from './grade2Term2ChineseUnit01SupplementalActivities';
import { loadChallengeQualityInputs } from './qualityInputs';

declare const process: { cwd(): string };

const unitId = 'grade-2/term-2/chinese/unit-01';
const groupId = 'grade-2-term-2-chinese-unit-01';
const coreKnowledgePointIds = [
  'spring-sensory-observation',
  'spring-poetry-imagery',
  'observation-facts-and-inference',
  'plant-growth-recording',
  'sharing-kindness-and-consequence',
  'planting-sequence-and-care',
];

const expectedSupplementAnswers = {
  basic: [
    '上午在树旁听到两声鸟叫', '手背感觉到风变暖了', '我在校门旁看见一朵花开了',
    '我看见嫩叶，觉得它们像绿色的小扇子', '每次在同一位置测量并写下日期',
    '先问同桌需要哪种颜色，再借给他用', '和成人一起选好位置并准备树坑',
    '我听见雨点敲在窗台上', '柳条像轻轻摆动的绿色丝带',
    '适量浇水，过一段时间再观察并记下变化', '邀请伙伴一起观察并轮流介绍发现',
    '适量浇水并整理工具和周围地面', '在相近时间记录身体感受和天气情况，并与昨天相近时间的记录对照',
    '先商量分工，再轮流用水壶并收好工具',
  ],
  advanced: [
    '每天在相近时间和地点记下触感及天气',
    '两次观察时都看到新叶，是否持续增加还要继续记录',
    '先说明这是诗中的比喻，再观察风吹柳枝的样子并记下来',
    '查找故事中关于种子、传递和生长的线索',
    '两次记录的日期和相同的观察范围',
    '先询问是否愿意分享，也可以邀请他只讲一个发现',
    '先请成人一起检查地点，再决定是否换到合适位置',
    '注明日期，再写叶片颜色和数到的数量',
    '写下谁分享了什么，以及伙伴后来怎样回应',
    '按日期观察土壤和叶片，再根据记录决定是否需要照料',
    '故事把传递花种和后来出现花联系起来，但不必推断每个人的心情',
    '商量轮流挖土、扶苗和整理工具，并注意安全距离',
    '记下闻到花香，并说明当时没有看到花',
    '对照浇水日期和前后测量记录，也继续观察其他条件',
  ],
  high: [
    '说明日期、测量位置和前后高度，并区分记录与推测',
    '回看记录或询问相关参与者，并把已确认和未确认部分分开',
    '记下日期、土壤和天气，先请成人一起检查再调整照料',
    '先说这是一种想象，再指出风吹动树叶等观察线索',
    '设置观察路线并轮流介绍，不采摘花朵',
    '两次记录时新叶数量不同，后续还可继续观察',
    '暂停劳动，和成人及伙伴商量新位置后再继续',
    '在相近地点和时间记录各自感受及天气，再比较记录',
    '继续记录土壤、天气和叶片变化，并比较不同时间的情况',
    '先讲故事写出的分享行动和后续变化，再说明自己的理解',
    '定期观察土壤和叶片，记录后再商量是否浇水',
    '询问伙伴的观察时间和地点，核实后补充声音记录',
    '按准备、栽种、照料和整理的过程写，并注明共同分工',
    '先写时间地点和观察，再列前后记录，最后单独写联想',
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
  const tsvLines: string[] = readFileSync(path, 'utf8').trim().split(/\r?\n/u);
  const [headerLine = '', ...lines] = tsvLines;
  const headers: string[] = headerLine.replace(/^\uFEFF/u, '').split('\t');
  return lines.map((line: string) => Object.fromEntries(headers.map((header: string, index: number) => [header, line.split('\t')[index] ?? ''])));
}

describe('二年级下册语文第一单元闯关', () => {
  it('将春风比喻归回《咏柳》，把未见诗句标成假设，并提供可对照的风感记录', () => {
    const findSupplement = (activitySuffix: string) => grade2Term2ChineseUnit01SupplementalActivities
      .find(({ activity }) => activity.id.endsWith(activitySuffix))?.activity;
    const advanced03 = findSupplement('-advanced-03');
    const high04 = findSupplement('-high-04');
    const basic13 = findSupplement('-basic-13');

    expect(advanced03?.prompt).toContain('《咏柳》');
    expect(high04?.prompt).toContain('如果把春风想象成');
    expect(basic13 && expectedAnswer(basic13)).toBe('在相近时间记录身体感受和天气情况，并与昨天相近时间的记录对照');
  });

  it('新增 42 道原创题逐档覆盖知识点且答案键符合逐题自审', () => {
    expect(grade2Term2ChineseUnit01SupplementalActivities).toHaveLength(42);
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const authored = grade2Term2ChineseUnit01SupplementalActivities
        .filter((candidate) => candidate.difficulty === difficulty);
      expect(authored).toHaveLength(14);
      expect(authored.map(({ activity }) => expectedAnswer(activity))).toEqual(expectedSupplementAnswers[difficulty]);
      expect(new Set(authored.flatMap(({ knowledgePointIds }) => knowledgePointIds))).toEqual(new Set(coreKnowledgePointIds));
      authored.forEach(({ activity }, index) => {
        expect(activity.kind, `${difficulty} 第 ${index + 1} 题`).toBe('choice');
        expect(new Set(activity.options.map(({ label }) => label)).size, `${difficulty} 第 ${index + 1} 题选项`).toBe(3);
        expect(`${activity.prompt} ${activity.hint}`, `${difficulty} 第 ${index + 1} 题提示泄漏`).not.toContain(expectedAnswer(activity));
      });
    }
    expect(new Set(grade2Term2ChineseUnit01SupplementalActivities.map(({ activity }) => activity.prompt)).size).toBe(42);
  });

  it('登记课程入口、成长索引和五任务题库组', () => {
    expect(getPilotUnitChallengeGroupId(unitId)).toBe(groupId);
    expect(growthGroups.find(({ id }) => id === groupId)).toMatchObject({
      id: groupId,
      kind: 'unit',
      grade: 2,
      semester: 2,
      subject: 'chinese',
      sourceUnitIds: [unitId],
    });
    const group = manifest.groups.find(({ definition }) => definition.id === groupId);
    expect(group?.questionIds).toHaveLength(90);
    expect(group?.definition).toMatchObject({
      id: groupId,
      kind: 'unit',
      grade: 2,
      semester: 2,
      subject: 'chinese',
      sourceUnitIds: [unitId],
      coreKnowledgePointIds,
    });
  });

  it('每档载入 30 道候选并保留课程原有 48 道活动与六个学习任务', async () => {
    const [content, unit] = await Promise.all([loadPilotChallengeContent(), loadUnit(unitId)]);
    const loaded = content.groups.find(({ group }) => group.definition.id === groupId);
    expect(loaded?.status).toBe('ready');
    expect(loaded?.candidates).toHaveLength(90);
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const candidates = loaded?.candidates.filter((candidate) => candidate.difficulty === difficulty) ?? [];
      expect(candidates).toHaveLength(30);
      expect(new Set(candidates.flatMap(({ knowledgePointIds }) => knowledgePointIds))).toEqual(new Set(coreKnowledgePointIds));
    }
    expect(Object.values(unit!.difficultyTracks).flatMap((track) => track.tasks)
      .flatMap((task) => task.sessions.flatMap((session) => session.activities))).toHaveLength(48);
    expect(loaded?.learningTasks).toHaveLength(6);
  });

  it('逐题核对答案键、知识点映射与中文作者自审台账', async () => {
    const group = manifest.groups.find(({ definition }) => definition.id === groupId);
    const [content, inputs] = await Promise.all([loadPilotChallengeContent(), loadChallengeQualityInputs()]);
    const candidates = content.groups.find(({ group: candidate }) => candidate.definition.id === groupId)?.candidates ?? [];
    const byId = new Map(candidates.map((candidate) => [candidate.questionId, candidate]));
    const ledgerPath = resolve(process.cwd(), `docs/challenges/${groupId}-question-review.tsv`);
    expect(existsSync(ledgerPath)).toBe(true);
    if (!existsSync(ledgerPath)) return;
    const rows = readTsv(ledgerPath);
    expect(rows).toHaveLength(90);
    expect(new Set(rows.map(({ 题目ID }) => 题目ID))).toEqual(new Set(group?.questionIds));
    expect(rows.every(({ 审核状态 }) => 审核状态.includes('作者逐题自审通过') && 审核状态.includes('未独立教育者复核'))).toBe(true);
    for (const row of rows) {
      const candidate = byId.get(row['题目ID']);
      expect(candidate, row['题目ID']).toBeDefined();
      expect(row['正确选项'], row['题目ID']).toBe(expectedAnswer(candidate!.activity));
      expect(derivePilotQuestionKnowledgePointIds(unitId, candidate!.activity), row['题目ID'])
        .toEqual(candidate!.knowledgePointIds);
      expect(candidate!.approved, row['题目ID']).toBe(true);
      expect(candidate!.contentFingerprint, row['题目ID']).toBe(row['内容指纹']);
    }
    expect(candidates.every(({ activity }) => inputs.activitiesById.has(activity.id))).toBe(true);
    expect(candidates.every(({ activity }) => inputs.sourceUnitByActivityId.get(activity.id) === unitId)).toBe(true);
  });
});
