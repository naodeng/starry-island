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
import { grade2Term2ChineseUnit02SupplementalActivities } from './grade2Term2ChineseUnit02SupplementalActivities';
import { loadChallengeQualityInputs } from './qualityInputs';
import { fingerprintActivity } from './fingerprint';

declare const process: { cwd(): string };

const unitId = 'grade-2/term-2/chinese/unit-02';
const groupId = 'grade-2-term-2-chinese-unit-02';
const coreKnowledgePointIds = [
  'food-labor-chain',
  'respect-for-labor',
  'fair-cooperation',
  'respectful-help',
  'independent-growth',
  'story-action-evidence',
];

const expectedSupplementAnswers = {
  basic: [
    '把收获的粮食清理并加工成可用的原料', '谢谢你按步骤准备材料并认真制作点心', '先按自己能吃完的量取用，需要时再添',
    '先商量每个人愿意负责的一小部分', '问问他想负责哪一项，再一起安排', '不同环节的劳动共同带来了这份成果',
    '检查作品并把材料和工具放回合适的位置', '清点数量后商量轮流使用或共同使用', '先问他是否需要帮忙，再听听他的想法',
    '给他一点时间练习，并问是否需要提示', '他把书一本本放回书架', '先读清题目并试一种办法，仍不懂时再请教',
    '好，我在旁边等你，需要时可以叫我', '按先商量、分工、完成和整理的顺序来说',
  ],
  advanced: [
    '先听听新同学想了解什么，再商量介绍内容', '看每个人是否知道自己的任务，并一起检查结果',
    '从原料照料、加工、运输到制作都有劳动参与', '可以确认他在倾听；他为什么这样做还要结合更多线索',
    '找出一个可能影响稳固的步骤，调整后再试并记录', '说清每项任务何时交接，并一起检查材料是否齐全',
    '询问他愿意听提示、一起想办法，还是先独立尝试', '写出谁负责了哪一步，以及后来怎样交接',
    '写清他向可信任的人说明困难，再一起试新办法', '商量每个人方便拿的数量和路线，再一起出发',
    '写明准备、加工、制作和整理步骤的记录', '能确认他收起了工具；感受还需要其他情节说明',
    '先问对方需不需要提示，再商量是否一起检查或继续练习',
    '重新看看任务需要和每个人的意愿，再商量轮换',
  ],
  high: [
    '先询问同学需要哪些文具，商量借还位置，一周后再问是否方便',
    '他先了解伙伴的需要，并尊重对方选择合适的帮助',
    '按原料准备、加工、制作和整理展示各环节，并邀请伙伴说明自己的任务',
    '他先试了一次，听取提示后又练习，最后完成了任务',
    '私下询问他愿意怎样参与，并尊重他不公开说明的选择',
    '使用相同数量的原料，记录每种方法的步骤和用时后再比较',
    '安排轮流表达的时间，并在决定前确认每个人是否说过想法',
    '先写出人物做了什么，再把原因写成“我觉得可能是”并说明线索',
    '先记录各环节需要的时间，再商量交接点并试行一次',
    '尊重他再试的决定，并问他是否想要提示或需要休息',
    '按过程说明不同伙伴承担的环节，并感谢大家的贡献',
    '各自找出人物的行动和前后情节，再说明自己的理解',
    '听听具体困难，和大家商量一个新办法，再约定何时回顾',
    '说说自己学会了哪一步，并感谢伙伴承担的不同环节',
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

describe('二年级下册语文第二单元闯关', () => {
  it('新增 42 道原创题逐档覆盖知识点且答案键符合逐题自审', () => {
    expect(grade2Term2ChineseUnit02SupplementalActivities).toHaveLength(42);
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const authored = grade2Term2ChineseUnit02SupplementalActivities.filter((candidate) => candidate.difficulty === difficulty);
      expect(authored).toHaveLength(14);
      expect(authored.map(({ activity }) => expectedAnswer(activity))).toEqual(expectedSupplementAnswers[difficulty]);
      expect(new Set(authored.flatMap(({ knowledgePointIds }) => knowledgePointIds))).toEqual(new Set(coreKnowledgePointIds));
      authored.forEach(({ activity }, index) => {
        expect(activity.kind, `${difficulty} 第 ${index + 1} 题`).toBe('choice');
        expect(new Set(activity.options.map(({ label }) => label)).size, `${difficulty} 第 ${index + 1} 题选项`).toBe(3);
        expect(`${activity.prompt} ${activity.hint}`, `${difficulty} 第 ${index + 1} 题提示泄漏`).not.toContain(expectedAnswer(activity));
      });
    }
    expect(new Set(grade2Term2ChineseUnit02SupplementalActivities.map(({ activity }) => activity.prompt)).size).toBe(42);
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
