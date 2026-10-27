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
import { grade2Term1ChineseUnit04SupplementalActivities } from './grade2Term1ChineseUnit04SupplementalActivities';
import { derivePilotQuestionKnowledgePointIds } from './pilotQuestionKnowledgePoints';
import { fingerprintActivity } from './fingerprint';
import { analyzeQuestionUniqueness } from './questionUniqueness';
import { loadChallengeQualityInputs } from './qualityInputs';

declare const process: { cwd(): string };

const unitId = 'grade-2/term-1/chinese/unit-04';
const groupId = 'grade-2-term-1-chinese-unit-04';
const coreKnowledgePointIds = [
  'landscape-location-and-features',
  'observation-and-imagination',
  'travel-order-and-description',
  'regional-products-and-hospitality',
  'landscape-information-organization',
];

const expectedSupplementAnswers = {
  basic: [
    '先说清风景在哪里',
    '先记录看见的石头外形，再说它像什么',
    '地点、主要景物、一个细节、自己的发现',
    '湖面有波纹',
    '近处',
    '先画出山峰和湖的位置，再标上关键词',
    '我看见石头有尖角，它让我想到一只小鸟',
    '先说地点，再介绍那里的一种景物或物产',
    '当地种着许多葡萄，成熟后果实香甜',
    '先到湖边，再沿小路走到果园，最后介绍村口',
    '景色',
    '先到、接着来到、最后看到',
    '我听到你说葡萄沟的葡萄很甜，我还想知道当地人怎样照料葡萄',
    '开头点明地点，主体介绍景物、物产和待客情况，结尾分享感受或邀请交流',
  ],
  advanced: [
    '补充具体景物和它的一处特点',
    '五光十色',
    '看到石面有弯弯纹路→观察依据；纹路让我想到一条小路→想象表达；湖面有几圈波纹→观察依据；波纹像轻轻荡开的圆环→想象表达',
    '说明大致地点 → 描写主要景物轮廓 → 补充近处的一处细节 → 说出自己注意到的变化',
    '标记观察时间再比较',
    '地点→在哪里；特点→看起来怎样；路线词→怎样继续游览',
    '石头上方有两个尖尖的凸起，我把它们想成兔耳',
    '听伙伴提出的问题 → 检查地点和顺序 → 补充观察细节 → 再次分享',
    '我看见湖面有波纹，像一圈圈圆环',
    '山石表面有尖角→外形；湖水映出岸边树木→倒影；葡萄串挨在一起→排列',
    '分别写下各自看到的轮廓线索，并注明“有人想到……”，不要求大家想成一样',
    '先说看见的景物，再说明它让自己想到什么',
    '先介绍湖区，再按游览顺序说岸边景物和当地物产',
    '地点“湖边”；特点“水面有波纹”；联想“波纹像圆环”',
  ],
  high: [
    '先说路线和地点，再介绍沿途景物、特点与物产',
    '标出湖边的实际景物，并把“像……”的想象单独标明',
    '先标清起点和路线，再按游览顺序介绍景物',
    '位置→从入口沿小路到湖边；景物→湖边有石桥；感受→我觉得这里很宁静',
    '给符号加上容易理解的图例，并在地图上保持相同用法',
    '先说明所在地点和当地物产，再用礼貌的话邀请伙伴了解',
    '把亲眼看到的景物和想象出来的地点分别标注',
    '先交代地点和路线，再介绍景物，最后分享感受',
    '先交代在哪儿，再按位置和外形介绍石头，最后说明自己的联想',
    '把景点信息和地方物产分开列出，并分别写明具体特点',
    '先说明地点和路线，再补充沿途景物的特点',
    '把观察到的纹路和由纹路想到的画面分别说清楚',
    '给路线拐点和景点使用相同编号，并在图例中说明对应关系',
    '先听完介绍，再复述听到的信息，并提出具体问题',
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

describe('二年级上册语文第四单元闯关', () => {
  it('注册正式课程路由、成长组和 90 道题的题库组', () => {
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

  it('加载三档各 30 道的就绪题库，同时保留原有 48 道学习活动', async () => {
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

  it('每档覆盖本单元五个知识点，并逐题核对 42 道原创题的正确答案', async () => {
    const content = await loadPilotChallengeContent();
    const candidates = content.groups.find(({ group }) => group.definition.id === groupId)?.candidates ?? [];
    expect(grade2Term1ChineseUnit04SupplementalActivities).toHaveLength(42);
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const covered = new Set(candidates.filter((candidate) => candidate.difficulty === difficulty)
        .flatMap(({ knowledgePointIds }) => knowledgePointIds));
      expect([...covered].sort()).toEqual([...coreKnowledgePointIds].sort());
      const authored = grade2Term1ChineseUnit04SupplementalActivities
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

  it('逐题核对 90 道题的答案映射、指纹、唯一性和中文审校台账', async () => {
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
