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
import { grade2Term1ChineseUnit08SupplementalActivities } from './grade2Term1ChineseUnit08SupplementalActivities';
import { derivePilotQuestionKnowledgePointIds } from './pilotQuestionKnowledgePoints';
import { fingerprintActivity } from './fingerprint';
import { analyzeQuestionUniqueness } from './questionUniqueness';
import { loadChallengeQualityInputs } from './qualityInputs';

declare const process: { cwd(): string };

const unitId = 'grade-2/term-1/chinese/unit-08';
const groupId = 'grade-2-term-1-chinese-unit-08';
const coreKnowledgePointIds = [
  'fairy-tale-story-clues',
  'friendly-communication-repair',
  'action-and-consequence',
  'fact-inference-and-perspective',
  'responsible-action-adjustment',
];

const expectedSupplementAnswers = {
  basic: [
    '先交代发生的情况，再按先后讲行动和结果',
    '先问伙伴愿不愿意说，再认真听他说完',
    '行动后观察变化，再判断结果是否符合原目标',
    '区分故事写出的行动和自己对原因的推想',
    '回到故事前后线索，核对自己的理解',
    '承认刚才没有听完，并问伙伴还想补充什么',
    '看看行动之后出现了什么变化',
    '先说清误会，再听伙伴的想法并商量办法',
    '把角色做的事和事情结果联系起来',
    '先征求伙伴意见，再决定是否一起行动',
    '保留看到的现象，把还没证实的原因说成猜想',
    '说明角色遇到的情况和采取的办法',
    '先停下并查看周围，再和成人商量下一步',
    '复述一件事时，分清开头、经过和结果',
  ],
  advanced: [
    '核对角色行动前后的线索，再说明可能的原因',
    '说明双方各自知道什么，再寻找误会从哪里开始',
    '比较行动前的目标和行动后的实际变化',
    '先标出故事明确写出的事，再说明自己的推想',
    '给出具体行动和结果作为判断依据',
    '表达自己的感受，也留出时间听伙伴说明',
    '发现结果不合预期时，先检查条件再调整办法',
    '把发生的事、人物行动和关系变化按顺序连起来',
    '结合角色实际行动和行动后的影响判断，不替角色断定动机',
    '行动前考虑环境和他人，行动后检查影响',
    '指出消息传递的过程，并核对对方是否收到',
    '结合前后情节解释角色为什么改变做法',
    '先听取伙伴的感受，再讨论怎样修复关系',
    '记录目标、行动、结果和下一次的改进办法',
  ],
  high: [
    '按情境、行动、结果和后续调整组织复盘',
    '先分别写出两人的线索，再依据故事判断误会',
    '比较行动目标、实际影响和需要修正的地方',
    '把故事事实、人物想法和读者推测分开说明',
    '用两处前后线索支持对人物行动的解释',
    '设计先倾听、再表达、最后共同商量的修复步骤',
    '只说明观察到的变化，把未验证的部分保留为推想',
    '用开头、关键行动、结果和关系变化讲清故事',
    '补充可核对的情节证据，并说明结论的限度',
    '先确认伙伴意愿，再采取不会妨碍他人的行动',
    '既记录不合目标的影响，也保留有效的做法',
    '联系角色的处境和后续变化解释做法调整',
    '列出安全条件、行动步骤和停止后求助的办法',
    '整合故事线索、沟通修复与行动复盘制作分享卡',
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

describe('二年级上册语文第八单元闯关', () => {
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
    expect(grade2Term1ChineseUnit08SupplementalActivities).toHaveLength(42);
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const tier = candidates.filter((candidate) => candidate.difficulty === difficulty);
      expect(new Set(tier.flatMap(({ knowledgePointIds }) => knowledgePointIds))).toEqual(new Set(coreKnowledgePointIds));
      const authored = grade2Term1ChineseUnit08SupplementalActivities
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
