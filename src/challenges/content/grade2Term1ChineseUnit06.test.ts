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
import { grade2Term1ChineseUnit06SupplementalActivities } from './grade2Term1ChineseUnit06SupplementalActivities';
import { derivePilotQuestionKnowledgePointIds } from './pilotQuestionKnowledgePoints';
import { fingerprintActivity } from './fingerprint';
import { analyzeQuestionUniqueness } from './questionUniqueness';
import { loadChallengeQualityInputs } from './qualityInputs';

declare const process: { cwd(): string };

const unitId = 'grade-2/term-1/chinese/unit-06';
const groupId = 'grade-2-term-1-chinese-unit-06';
const coreKnowledgePointIds = [
  'story-event-sequence',
  'character-action-and-quality',
  'story-evidence-and-inference',
  'cooperation-and-respect',
  'reflection-and-action-planning',
];

const expectedSupplementAnswers = {
  basic: [
    '先交代事情背景，再按顺序讲行动和结果',
    '他按步骤检查并完成工作',
    '人物和伙伴一起完成工作',
    '故事写到的环境和人物行动',
    '听清任务，再和伙伴商量分工',
    '听完伙伴的理由，再礼貌说自己的想法',
    '前一句是故事信息，后一句是个人感受',
    '人物和大家做了什么',
    '先说开头情况，再按发生顺序讲到结果',
    '指出故事里让自己敬佩的行动',
    '轮流完成约好的工作',
    '故事里还有哪些行动线索可以帮助理解？',
    '说清伙伴做了哪件事，并向他表示谢谢',
    '分开记录故事信息和自己的读后感受',
  ],
  advanced: [
    '结合事情背景、人物行动和后来结果',
    '引用他按步骤检查并完成工作的行动',
    '前一句是故事信息，后一句是个人评价',
    '交代背景，按顺序讲行动和结果，再说自己的感受',
    '回到故事，比较两种说法分别依据什么',
    '先记下行动，再按故事顺序补上后来的结果',
    '主动承担一项大家需要完成的工作',
    '先说故事里的行动，再说明它带给自己的感受',
    '一起回看分工和实际发生的事，再商量调整',
    '故事中他关心伙伴的一项具体行动',
    '先说故事中的合作行动，再说自己想尝试的一件小事',
    '分别记下每段故事的背景和人物行动',
    '说明看到的行动，并把自己的理解说成一种想法',
    '对照大家遇到的问题，看看办法能不能帮助解决',
  ],
  high: [
    '写明要解决的小问题、行动步骤、分工和回顾办法',
    '约定轮流发言，先听完伙伴再回应',
    '先听每个人愿意做什么，再一起安排分工',
    '先听清理由，再商量是否需要调整办法',
    '记录行动前后的具体情况，再一起比较',
    '说出故事中伙伴共同完成的一项行动，再讲自己的理解',
    '写下已经观察到的变化，也记下还想继续了解的事',
    '听听伙伴的原因，再一起商量合适的分工',
    '指出一项故事行动，再说自己准备尝试什么',
    '目前还不知道结果，需要继续观察',
    '先说清共同目标，再分别记录两种办法的行动和结果',
    '先记遇到的问题，再记行动、分工和后来情况',
    '说出伙伴做的一件具体事情，并说明它怎样帮助小组',
    '保留新记录，和原想法一起检查后再决定是否调整',
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

describe('二年级上册语文第六单元闯关', () => {
  it('注册课程路由、成长组和 90 道题的题库组', () => {
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
    expect(grade2Term1ChineseUnit06SupplementalActivities).toHaveLength(42);
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const tier = candidates.filter((candidate) => candidate.difficulty === difficulty);
      expect(new Set(tier.flatMap(({ knowledgePointIds }) => knowledgePointIds))).toEqual(new Set(coreKnowledgePointIds));
      const authored = grade2Term1ChineseUnit06SupplementalActivities
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
