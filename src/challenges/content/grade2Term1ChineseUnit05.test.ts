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
import { grade2Term1ChineseUnit05SupplementalActivities } from './grade2Term1ChineseUnit05SupplementalActivities';
import { derivePilotQuestionKnowledgePointIds } from './pilotQuestionKnowledgePoints';
import { fingerprintActivity } from './fingerprint';
import { analyzeQuestionUniqueness } from './questionUniqueness';
import { loadChallengeQualityInputs } from './qualityInputs';

declare const process: { cwd(): string };

const unitId = 'grade-2/term-1/chinese/unit-05';
const groupId = 'grade-2-term-1-chinese-unit-05';
const coreKnowledgePointIds = [
  'observation-position-and-viewpoint',
  'action-time-and-result',
  'plant-observation-and-change',
  'evidence-based-inference',
  'problem-solving-sequence',
];

const expectedSupplementAnswers = {
  basic: [
    '先问清两个人分别站在哪里看',
    '先记下寒号鸟做了什么，再记结果怎样',
    '把叶片颜色和变化日期记下来',
    '叶片边缘有几处卷起',
    '先看看青蛙能看到哪些方向的景物',
    '记下发现小虫的位置和数量，再请大人一起确认',
    '我看见叶子上有小洞；我猜可能有小虫',
    '先记行动和时间，再写后来发生的事',
    '把同一株植物不同日期的叶片记录放在一起比较',
    '你观察时站在哪里？',
    '记录到了斑点数量增加',
    '先写下看到的线索，再把原因写成“可能”',
    '记下两个人各自说了什么和看到了什么',
    '再找一条能支持或修改想法的观察线索',
  ],
  advanced: [
    '分别记录观察位置和看到的景物，再比较范围',
    '先后记录拖延行动和遇冷后的结果',
    '固定观察对象和位置，按日期记录叶片变化',
    '能说明做窝行动较晚，之后遇到寒冷；还需结合其他线索解释结果',
    '把“大家看到的都一样”改为“观察位置不同，看到的范围可能不同”',
    '对照叶片记录、土壤状态和照料时间再判断',
    '保持同一盆植物和观察时间，只改变一个照料条件并记录',
    '先列出直接看到的变化，再写可能原因和还需确认的事',
    '目前只能说两件事先后发生，不能只凭这一条记录确定唯一原因',
    '引用故事中可核对的行动和结果，再说明自己的理解',
    '使用相同的观察位置、方法和间隔时间',
    '提出一个能通过后续观察回答的问题',
    '先保留原想法，再记录新线索并说明是否需要修改',
    '用“我看到……，所以我猜……，还想确认……”表达',
  ],
  high: [
    '先说清要了解的问题，再定观察对象、时间和记录办法',
    '在大人同意下选一个安全条件，观察前后并如实记录',
    '每次在相同位置、用相同方法记录日期和叶片变化',
    '把角色行动、发生时间和后续结果列在同一张记录表',
    '先检查记录是否完整，再判断办法有没有带来变化',
    '固定植物和观察时间，只调整一个照料办法后继续记录',
    '说明目前的记录没有显示变化，并提出还要观察什么',
    '分别列出两个人的位置、说法和观察线索，再比较能解释的部分',
    '先复述双方依据，再一起找能核对的新线索',
    '只保留能回答问题的记录，并标清日期和观察对象',
    '分别记录行动和结果，再把因果关系表述为有线索支持的推想',
    '写清观察问题、固定条件、记录内容和回顾办法',
    '先复查观察方法是否一致，再增加一次记录后作判断',
    '先介绍记录到的事实，再说可能解释和仍需确认的问题',
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

describe('二年级上册语文第五单元闯关', () => {
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
    expect(grade2Term1ChineseUnit05SupplementalActivities).toHaveLength(42);
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const tier = candidates.filter((candidate) => candidate.difficulty === difficulty);
      expect(new Set(tier.flatMap(({ knowledgePointIds }) => knowledgePointIds))).toEqual(new Set(coreKnowledgePointIds));
      const authored = grade2Term1ChineseUnit05SupplementalActivities
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
