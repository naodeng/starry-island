import { describe, expect, it } from 'vitest';
// @ts-expect-error Node.js is used only to inspect the local question-review ledger during Vitest.
import { existsSync, readFileSync } from 'node:fs';
// @ts-expect-error Node.js is used only to resolve the local question-review ledger during Vitest.
import { resolve } from 'node:path';
import type { ActivityDefinition } from '../../content/types';
import { loadUnit } from '../../content/unitLoader';
import { growthGroups } from './growthGroups';
import { loadPilotChallengeContent } from './pilotContent';
import { getPilotUnitChallengeGroupId } from './unitLinks';
import manifest from './pilotManifest';
import { grade2Term1ChineseUnit07SupplementalActivities } from './grade2Term1ChineseUnit07SupplementalActivities';
import { derivePilotQuestionKnowledgePointIds } from './pilotQuestionKnowledgePoints';
import { fingerprintActivity } from './fingerprint';
import { analyzeQuestionUniqueness } from './questionUniqueness';
import { loadChallengeQualityInputs } from './qualityInputs';

declare const process: { cwd(): string };

const unitId = 'grade-2/term-1/chinese/unit-07';
const groupId = 'grade-2-term-1-chinese-unit-07';
const coreKnowledgePointIds = [
  'seasonal-scenery-clues',
  'weather-observation-and-change',
  'fog-and-visibility-inference',
  'story-event-sequence',
  'care-and-safe-action',
];

const expectedSupplementAnswers = {
  basic: [
    '树枝先长出新芽，几天后新叶展开',
    '在同一地点记下时间、天气和远处景物清晰度',
    '诗句中的景物和动作可以帮助想象画面',
    '把观察到的变化和自己的感受分开写',
    '先记录雪和阳光的变化，再查看地面状况',
    '把描写景物的词和对应的季节线索联系起来',
    '先后两次在相近条件下观察，再对照记录',
    '远处景物的轮廓逐渐变清楚',
    '按照事情发生的先后讲清开头、经过和结果',
    '先听清对方的需要，再决定怎样帮忙',
    '说出故事中的具体行动，再解释自己的感受',
    '没有看到的部分先标记为猜想，继续找线索',
    '提醒伙伴慢慢走，并请老师一起看看情况',
    '记录已经知道的变化，也写下还需要观察的问题',
  ],
  advanced: [
    '固定地点和观察对象，记录不同时段的能见度',
    '先找故事写出的行动，再判断它可能说明什么',
    '同时保留天气、时间和景物记录，再解释差异',
    '先说明遇到的情况，再依次讲行动和结果',
    '先问伙伴需要什么，再商量合适的做法',
    '用景物线索想象画面，并说明依据哪一个词',
    '按相同的观察方法记录两次结果',
    '区分文中明确写出的事和读者作出的推想',
    '把雾前雾后的观察放在一起比较',
    '从天气现象和景物变化中找相互对应的线索',
    '发现结论和记录不一致时，回看观察条件',
    '先辨认故事里的问题，再按行动先后讲结果',
    '在湿滑处放慢脚步，必要时找成人协助',
    '把天气现象、人物行动和自己的感受分别记录',
  ],
  high: [
    '设定安全地点、观察时间、记录项目和停止条件',
    '先写出观察线索，再画出它们共同呈现的季节变化',
    '在相同地点观察雾前后，并记录视线变化和时间',
    '先听伙伴说需要什么，再一起商量是否采取帮助',
    '依据已记录的现象提出推想，并注明还需验证的部分',
    '按事情的开头、行动、变化和结果整理故事卡',
    '把安全提醒写成具体、友好的可执行建议',
    '同时展示观察事实和个人感受，并标清两者不同',
    '发现两条线索冲突时，补充观察后再决定',
    '记录每一步行动及环境变化，再讨论事情结果',
    '检查建议是否适合情境，并请成人核对安全性',
    '将诗句里的景物词与画面想象分栏记录',
    '选择能重复观察的项目，避免只凭一次结果下结论',
    '汇总季节线索、故事顺序和安全行动，制作主题卡',
  ],
} as const;

function expectedAnswerSummary(activity: ActivityDefinition): string {
  switch (activity.kind) {
    case 'choice':
      return activity.options.find(({ id }) => id === activity.correctOptionId)?.label ?? '';
    case 'match':
      return activity.pairs.map(({ left, right }) => `${left}→${right}`).join('；');
    case 'order': {
      const labelsById = new Map(activity.items.map(({ id, label }) => [id, label]));
      return activity.correctOrder.map((id) => labelsById.get(id) ?? '').join(' → ');
    }
    case 'categorize': {
      const labelsByCategoryId = new Map(activity.categories.map(({ id, label }) => [id, label]));
      return activity.items.map(({ label, categoryId }) => `${label}→${labelsByCategoryId.get(categoryId) ?? ''}`).join('；');
    }
    case 'arithmetic':
      return String(activity.correctAnswer);
    case 'measurement':
      return String(activity.targetLengthCm);
  }
}

function readTsv(path: string): Array<Record<string, string>> {
  const lines = readFileSync(path, 'utf8').trim().split(/\r?\n/u) as string[];
  const [headerLine = '', ...dataLines] = lines;
  const headers = headerLine.replace(/^\uFEFF/u, '').split('\t');
  return dataLines.map((line: string) => {
    const values = line.split('\t');
    return Object.fromEntries(headers.map((header: string, index: number) => [header, values[index] ?? '']));
  });
}

describe('二年级上册语文第七单元闯关', () => {
  it('注册课程入口、成长组和 90 道题的题库组', () => {
    expect(getPilotUnitChallengeGroupId(unitId)).toBe(groupId);
    expect(growthGroups.find(({ id }) => id === groupId)).toMatchObject({
      id: groupId,
      kind: 'unit',
      grade: 2,
      semester: 1,
      subject: 'chinese',
      sourceUnitIds: [unitId],
    });
    const group = manifest.groups.find(({ definition }) => definition.id === groupId);
    expect(group?.questionIds).toHaveLength(90);
    expect(group?.definition.sourceUnitIds).toEqual([unitId]);
  });

  it('每档加载 30 道候选，保留原有 48 道学习活动和六个学习任务', async () => {
    const [content, unit] = await Promise.all([loadPilotChallengeContent(), loadUnit(unitId)]);
    const loaded = content.groups.find(({ group: candidate }) => candidate.definition.id === groupId);
    expect(loaded?.status).toBe('ready');
    expect(loaded?.candidates).toHaveLength(90);
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      expect(loaded?.candidates.filter((candidate) => candidate.difficulty === difficulty)).toHaveLength(30);
    }
    expect(Object.values(unit!.difficultyTracks).flatMap((track) => track.tasks)
      .flatMap((task) => task.sessions.flatMap((session) => session.activities))).toHaveLength(48);
    expect(loaded?.learningTasks).toHaveLength(6);
  });

  it('逐档覆盖五个知识点，并独立核对 42 道原创题的答案', async () => {
    const content = await loadPilotChallengeContent();
    const candidates = content.groups.find(({ group }) => group.definition.id === groupId)?.candidates ?? [];
    expect(grade2Term1ChineseUnit07SupplementalActivities).toHaveLength(42);
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const tier = candidates.filter((candidate) => candidate.difficulty === difficulty);
      expect(new Set(tier.flatMap(({ knowledgePointIds }) => knowledgePointIds))).toEqual(new Set(coreKnowledgePointIds));
      const authored = grade2Term1ChineseUnit07SupplementalActivities
        .filter(({ difficulty: candidateDifficulty }) => candidateDifficulty === difficulty);
      expect(authored).toHaveLength(14);
      authored.forEach(({ activity }, index) => {
        expect(expectedAnswerSummary(activity), `${difficulty} 第 ${index + 1} 题`)
          .toBe(expectedSupplementAnswers[difficulty][index]);
        expect(activity.kind).toBe('choice');
        if (activity.kind === 'choice') {
          expect(activity.options).toHaveLength(3);
          expect(new Set(activity.options.map(({ label }) => label)).size).toBe(3);
          expect(`${activity.prompt} ${activity.hint}`).not.toContain(expectedAnswerSummary(activity));
        }
      });
    }
  });

  it('逐题核对题目映射、指纹、唯一性和中文审校台账', async () => {
    const group = manifest.groups.find(({ definition }) => definition.id === groupId);
    const [content, inputs] = await Promise.all([loadPilotChallengeContent(), loadChallengeQualityInputs()]);
    const candidates = content.groups.find(({ group: candidate }) => candidate.definition.id === groupId)?.candidates ?? [];
    const candidateByQuestionId = new Map(candidates.map((candidate) => [candidate.questionId, candidate]));
    const ledgerPath = resolve(process.cwd(), `docs/challenges/${groupId}-question-review.tsv`);

    expect(existsSync(ledgerPath)).toBe(true);
    if (!existsSync(ledgerPath)) return;
    const rows = readTsv(ledgerPath);
    expect(rows.map(({ 题目ID }) => 题目ID)).toHaveLength(90);
    expect(new Set(rows.map(({ 题目ID }) => 题目ID))).toEqual(new Set(group?.questionIds));
    expect(rows.every(({ 审核状态 }) => 审核状态.includes('作者逐题自审通过') && 审核状态.includes('未独立教育者复核'))).toBe(true);
    for (const row of rows) {
      const candidate = candidateByQuestionId.get(row['题目ID']);
      expect(candidate, row['题目ID']).toBeDefined();
      expect(row['正确选项'], row['题目ID']).toBe(expectedAnswerSummary(candidate!.activity));
      expect(row['知识点'], row['题目ID']).not.toBe('');
      expect(derivePilotQuestionKnowledgePointIds(unitId, candidate!.activity), row['题目ID'])
        .toEqual(candidate!.knowledgePointIds);
      expect(candidate!.approved, row['题目ID']).toBe(true);
      expect(candidate!.answerLeakageReviewed, row['题目ID']).toBe(true);
      if (candidate!.questionId.includes('challenge-supplement-')) {
        expect(`${candidate!.activity.prompt} ${candidate!.activity.hint}`, row['题目ID'])
          .not.toContain(expectedAnswerSummary(candidate!.activity));
      }
    }

    const fingerprints = await Promise.all(candidates.map(({ activity }) => fingerprintActivity(activity)));
    expect(new Set(fingerprints).size).toBe(90);
    const questionIds = new Set(group?.questionIds ?? []);
    const questions = inputs.manifest.questions.filter(({ questionId }) => questionIds.has(questionId));
    const uniqueness = await analyzeQuestionUniqueness(questions, inputs.activitiesById, inputs.sourceUnitByActivityId);
    expect(uniqueness.exactDuplicateGroups).toEqual([]);
    expect(uniqueness.similarQuestionPairs.filter(({ reason }) => reason.startsWith('交互内容与答案结构相同'))).toEqual([]);
  });
});
