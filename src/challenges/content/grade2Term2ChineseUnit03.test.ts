import { describe, expect, it } from 'vitest';
// @ts-expect-error Node.js is used only to inspect the local review ledger during Vitest.
import { existsSync, readFileSync } from 'node:fs';
// @ts-expect-error Node.js is used only to resolve the local review ledger during Vitest.
import { resolve } from 'node:path';
import type { ActivityDefinition } from '../../content/types';
import { loadUnit } from '../../content/unitLoader';
import { growthGroups } from './growthGroups';
import { loadPilotChallengeContent } from './pilotContent';
import manifest from './pilotManifest';
import { getPilotUnitChallengeGroupId } from './unitLinks';
import { derivePilotQuestionKnowledgePointIds } from './pilotQuestionKnowledgePoints';
import { grade2Term2ChineseUnit03SupplementalActivities } from './grade2Term2ChineseUnit03SupplementalActivities';
import { loadChallengeQualityInputs } from './qualityInputs';
import { fingerprintActivity } from './fingerprint';

declare const process: { cwd(): string };

const unitId = 'grade-2/term-2/chinese/unit-03';
const groupId = 'grade-2-term-2-chinese-unit-03';
const coreKnowledgePointIds = [
  'cultural-presentation',
  'festival-customs',
  'character-components',
  'food-vocabulary',
  'culture-source-checking',
  'cultural-respect',
];

const expectedSupplementAnswers = {
  basic: [
    '对照地图或可靠介绍确认地点和河流位置', '核对节日和常见活动，也说明各地做法可能不同',
    '可能和树木有关，还要结合整个字和词语判断', '按词语里表示制作方法的动作归类',
    '认真听他的分享，并说明不同家庭做法可能不一样', '写出食物名称和一种制作方法',
    '先找可靠介绍或询问熟悉当地的人', '说清楚具体地点，再核对地图或介绍资料',
    '先看偏旁提供的线索，再结合词语和句子理解', '查找可信的节日介绍并核对时间线索',
    '先看图例和地名，再确认地图上的位置', '说清这是某地常见做法，不代表所有地方都一样',
    '先确认图片内容与要介绍的节日或美食有关', '按地点、节日、汉字和美食分工，再合在一起检查',
  ],
  advanced: [
    '先核对地图、地名和文字来源是否指向同一地点', '比较不同资料说明的地区和习俗范围',
    '结合部件、整个字和上下文，再查字典确认', '把菜名、烹饪动作和个人感受分开记录',
    '说明资料中的说法，并标出自己的家庭经验', '查清地图图例和方向后再介绍路线',
    '先了解同学说的是哪个地区，再查资料比较其他地方的做法', '将相同偏旁的字放一起观察，再比较词语中的具体意思',
    '找到两条可靠资料，标清共同点和不同点', '先核对食材或做法的来源，不确定的地方注明还要查证',
    '用地图、节日名称和季节线索互相核对', '先听完伙伴的经验，再讨论哪些内容可以作为共同介绍',
    '让每条展板信息都能找到对应资料或明确标为个人体验', '共同检查地名、节日、字义和美食词语是否准确易读',
  ],
  high: [
    '选择一个地点，查地图和介绍资料后标明信息来源', '把节日习俗写成当地示例，并邀请伙伴补充不同经验',
    '展示偏旁线索、词语语境和查证结果，不把猜想写成结论', '先核对菜名和制作方法，再把个人感受单独标出',
    '同时介绍地点、节庆或美食中的一个主题，并标注来源范围', '把展板分成资料、个人体验和待确认问题三部分',
    '邀请伙伴从地图位置、文字准确和页面易读三个方面提出建议', '先查清同一习俗在不同地区的做法，再用具体地点作说明',
    '把看不懂的字圈出，查部件和字典，再用上下文检查理解', '每种美食都写清名称、做法来源和体验者的感受',
    '分别核对节日时间、常见习俗及不同地区的说明', '遇到说法不一致时保存来源，询问老师后再决定怎样展示',
    '每人负责一类资料，标注来源后一起检查是否互相矛盾', '用清楚的图例和地名说明区域，不用刻板印象概括居民',
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
  const lines: string[] = readFileSync(path, 'utf8').trim().split(/\r?\n/u);
  const [headerLine = '', ...dataLines] = lines;
  const headers = headerLine.replace(/^\uFEFF/u, '').split('\t');
  return dataLines.map((line) => {
    const values = line.split('\t');
    return Object.fromEntries(headers.map((header, index) => [header, values[index] ?? '']));
  });
}

describe('二年级下册语文第三单元闯关', () => {
  it('新增 42 道原创题逐档覆盖知识点且答案键符合逐题自审', () => {
    expect(grade2Term2ChineseUnit03SupplementalActivities).toHaveLength(42);
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const authored = grade2Term2ChineseUnit03SupplementalActivities.filter((candidate) => candidate.difficulty === difficulty);
      expect(authored).toHaveLength(14);
      expect(authored.map(({ activity }) => expectedAnswer(activity))).toEqual(expectedSupplementAnswers[difficulty]);
      expect(new Set(authored.flatMap(({ knowledgePointIds }) => knowledgePointIds))).toEqual(new Set(coreKnowledgePointIds));
      authored.forEach(({ activity }, index) => {
        expect(activity.kind, `${difficulty} 第 ${index + 1} 题`).toBe('choice');
        expect(new Set(activity.options.map(({ label }) => label)).size, `${difficulty} 第 ${index + 1} 题选项`).toBe(3);
        expect(`${activity.prompt} ${activity.hint}`, `${difficulty} 第 ${index + 1} 题提示泄漏`).not.toContain(expectedAnswer(activity));
      });
    }
    expect(new Set(grade2Term2ChineseUnit03SupplementalActivities.map(({ activity }) => activity.prompt)).size).toBe(42);
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

  it('逐题核对答案键、知识点映射、内容指纹与中文作者自审台账', async () => {
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
    expect(new Set(await Promise.all(candidates.map(({ activity }) => fingerprintActivity(activity)))).size).toBe(90);
  });
});
