import { describe, expect, it } from 'vitest';
// @ts-expect-error Node.js is used only to inspect the local question-review ledger during Vitest.
import { existsSync, readFileSync } from 'node:fs';
// @ts-expect-error Node.js is used only to resolve the local question-review ledger during Vitest.
import { resolve } from 'node:path';
import type { ActivityDefinition } from '../../content/types';
import { loadUnit } from '../../content/unitLoader';
import manifest from './pilotManifest';
import { growthGroups } from './growthGroups';
import { loadPilotChallengeContent } from './pilotContent';
import { getPilotUnitChallengeGroupId } from './unitLinks';
import { derivePilotQuestionKnowledgePointIds } from './pilotQuestionKnowledgePoints';
import { fingerprintActivity } from './fingerprint';
import { analyzeQuestionUniqueness } from './questionUniqueness';
import { loadChallengeQualityInputs } from './qualityInputs';

declare const process: { cwd(): string };

const unitId = 'grade-2/term-1/chinese/unit-03';
const groupId = 'grade-2-term-1-chinese-unit-03';
const coreKnowledgePointIds = [
  'problem-solving-sequence',
  'evidence-based-inference',
  'letter-communication',
  'observation-and-feelings',
  'story-sequence-and-revision',
];

const expectedSupplementAnswers = {
  basic: [
    '回想最后一次看见它的时间和地点',
    '对照调整前后的记录，看看书本是否更稳',
    '称呼',
    '她可能想让滴水的伞不挡路',
    '发现桌面被打湿，先停下来查看情况',
    '看看哪一步不稳，再调整后重新试一试',
    '书名或读书时的一件具体事情',
    '我看到她拉好被子，觉得她很关心孩子',
    '弄清问题 → 想办法 → 试一试 → 检查结果',
    '我看到他收好画纸；我觉得他很珍惜作品',
    '写明今天去了哪里，并补充一件在那里做的事',
    '查看书名和借阅记录，再请老师一起确认',
    '补上人物具体做了什么',
    '能确认他暂时没有说话；原因还需要更多线索',
  ],
  advanced: [
    '先记录球停下的位置，再调整挡板并比较新位置',
    '能确认他把信放进了书包；还不能确定他为什么这样做',
    '写出具体事情和大致时间',
    '在花盆旁边加支撑',
    '他把纸收进文件夹；他是否喜欢这张纸还需要更多线索',
    '用同一张卡片分别查找，记录哪种方法更快、更少出错',
    '写出活动名称和一件具体经过',
    '我看到她把水杯放到弟弟手边，觉得她很体贴',
    '补充他先从书包里拿出借来的书，再走到同学身边',
    '卡片已经交给小林；他的回应还不知道',
    '先检查翘起的位置，只改变固定方式后再观察',
    '写明朋友帮忙的具体事情，再表达感谢',
    '我看到他在整理书；他可能想让书架更整齐',
    '每次只改变盒子的倾斜程度，重复放卡片并记录结果',
  ],
  high: [
    '记下每次桥面做法和承重数量，再比较调整前后的结果',
    '她停下来观察污点；具体想法还要看后续线索',
    '写称呼和问候，按活动经过先后分享，再说明邀请并礼貌结束',
    '他看见树枝正碰着玻璃',
    '写下她询问办法的行动，并把“可能在思考”标为推想',
    '写出人物怎样寻找书签，以及怎样找到并放回书',
    '先按书的类别设计标签，试找几本书，再按查找情况修改',
    '大家怎样试用办法，以及画面发生了什么变化',
    '说明看到用品散放的情况，提出分类建议，并用商量的语气询问',
    '我看到她收好画纸；她可能想保护作品',
    '说明大家怎样分类并试找卡片，再写找到后的结果',
    '写一件看见的具体行动，再说它让你有什么感受',
    '写清同学帮忙整理的具体物品或步骤，再表达感谢',
    '各自找出动作、语言或前后情节作依据，再说明哪种解释更贴合',
  ],
} as const;

function readTsv(path: string): Array<Record<string, string>> {
  const lines = readFileSync(path, 'utf8').trim().split(/\r?\n/u) as string[];
  const [headerLine = '', ...dataLines] = lines;
  const headers = headerLine.replace(/^\uFEFF/u, '').split('\t');
  return dataLines.map((line: string) => {
    const values = line.split('\t');
    return Object.fromEntries(headers.map((header: string, index: number) => [header, values[index] ?? '']));
  });
}

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

describe('Grade 2 Term 1 Chinese Unit 3 challenge', () => {
  it('registers the curriculum unit route, growth group, and 90-question manifest group', () => {
    expect(getPilotUnitChallengeGroupId(unitId)).toBe(groupId);
    expect(growthGroups.find(({ id }) => id === groupId)).toMatchObject({
      id: groupId,
      kind: 'unit',
      grade: 2,
      semester: 1,
      subject: 'chinese',
      sourceUnitIds: [unitId],
    });

    const rawManifest = manifest as {
      groups: Array<{ definition: { id: string; sourceUnitIds: string[] }; questionIds: string[] }>;
    };
    const group = rawManifest.groups.find(({ definition }) => definition.id === groupId);
    expect(group?.questionIds).toHaveLength(90);
    expect(group?.definition.sourceUnitIds).toEqual([unitId]);
  });

  it('loads a ready group with three complete difficulty pools while preserving course activities', async () => {
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

  it('covers all five unit knowledge points at every difficulty', async () => {
    const { groups } = await loadPilotChallengeContent();
    const candidates = groups.find(({ group: candidate }) => candidate.definition.id === groupId)?.candidates ?? [];

    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const covered = new Set(candidates.filter((candidate) => candidate.difficulty === difficulty)
        .flatMap(({ knowledgePointIds }) => knowledgePointIds));
      expect([...covered].sort()).toEqual([...coreKnowledgePointIds].sort());
    }
  });

  it('checks every authored answer, mapping, fingerprint, uniqueness result, and ledger row', async () => {
    const rawManifest = manifest as { groups: Array<{ definition: { id: string }; questionIds: string[] }> };
    const group = rawManifest.groups.find(({ definition }) => definition.id === groupId);
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

    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const authored = candidates.filter(({ difficulty: candidateDifficulty, questionId }) => (
        candidateDifficulty === difficulty && questionId.includes(`challenge-supplement-grade-2-term-1-chinese-unit-03-${difficulty}-`)
      ));
      expect(authored).toHaveLength(14);
      authored.forEach(({ activity }, index) => {
        expect(expectedAnswerSummary(activity), `${difficulty} question ${index + 1}`)
          .toBe(expectedSupplementAnswers[difficulty][index]);
      });
    }

    for (const row of rows) {
      const candidate = candidateByQuestionId.get(row['题目ID']);
      expect(candidate, row['题目ID']).toBeDefined();
      expect(row['正确选项'], row['题目ID']).toBe(expectedAnswerSummary(candidate!.activity));
      expect(row['知识点'], row['题目ID']).not.toBe('');
      expect(candidate!.knowledgePointIds.length, row['题目ID']).toBeGreaterThan(0);
      expect(derivePilotQuestionKnowledgePointIds(unitId, candidate!.activity), row['题目ID'])
        .toEqual(candidate!.knowledgePointIds);
      expect(candidate!.approved, row['题目ID']).toBe(true);
      expect(candidate!.answerLeakageReviewed, row['题目ID']).toBe(true);
      if (candidate!.questionId.includes('challenge-supplement-')) {
        const correctAnswer = expectedAnswerSummary(candidate!.activity);
        expect(`${candidate!.activity.prompt} ${candidate!.activity.hint}`, row['题目ID']).not.toContain(correctAnswer);
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
