import { describe, expect, it } from 'vitest';
// @ts-expect-error Node.js is used only to inspect the local question-review ledger during Vitest.
import { existsSync, readFileSync } from 'node:fs';
// @ts-expect-error Node.js is used only to resolve the local question-review ledger during Vitest.
import { resolve } from 'node:path';
import type { ActivityDefinition } from '../../content/types';
import { loadUnit } from '../../content/unitLoader';
import manifest from './pilotManifest';
import { growthGroups } from './growthGroups';
import { getPilotUnitChallengeGroupId } from './unitLinks';
import { loadPilotChallengeContent } from './pilotContent';
import { derivePilotQuestionKnowledgePointIds } from './pilotQuestionKnowledgePoints';
import { fingerprintActivity } from './fingerprint';
import { analyzeQuestionUniqueness } from './questionUniqueness';
import { loadChallengeQualityInputs } from './qualityInputs';
import { grade2Term1ChineseUnit02SupplementalActivities } from './grade2Term1ChineseUnit02SupplementalActivities';

declare const process: { cwd(): string };

const unitId = 'grade-2/term-1/chinese/unit-02';
const groupId = 'grade-2-term-1-chinese-unit-02';

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

describe('Grade 2 Term 1 Chinese Unit 2 challenge', () => {
  const expectedSupplementAnswers = {
    basic: [
      '棵',
      '事物可能出现的地点',
      '麻雀、白鹭',
      '树木或木本植物',
      '播种、照料、收获',
      '操场边有两棵高高的树',
    ],
    advanced: [
      '河面上有两艘小船',
      '先写地点，再列出桥、树和鸟',
      '结合整个词和句子线索',
      '按一年中的时间顺序',
      '写成“池塘边有一棵树”',
      '树木和动物',
      '小桥旁有一条小河和几棵柳树',
      '秋天',
      '一座石桥、一片稻田、一条小鱼',
      '根据这次分类要回答的问题来定',
      '地点和看到的事物',
      '播种',
      '说出偏旁线索，再用整个词或句子核对',
      '三只白鹭',
      '两座石桥、三棵柳树、四只白鹭',
    ],
    high: [
      '先说池塘边，再用合适量词介绍三样事物',
      '再核对“枫树”这个完整词确实指一种树',
      '说清地点，并选两三样具体事物和特点',
      '按作物生长过程排列，并说明每步观察到的变化',
      '先找偏旁线索，再核对词义并分组',
      '按春天播种、后续照料、成熟收获的顺序重新组织',
      '先标明地点，再把树木、动物和农作物分别列出',
      '偏旁可作线索，还要看完整词语的意思',
      '地点保持相同，分别记下季节、植物和天气线索',
      '在每个地点下面再标出树木或动物类别',
      '指出卡片上的成熟谷物和收获活动',
      '池塘边停着两艘小船',
      '根据转凉和谷物成熟的线索填写秋天',
      '先按地点分区，再在区内标注树木或动物',
    ],
  } as const;

  it('uses the independently reviewed correct answer for every authored question', () => {
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const activities = grade2Term1ChineseUnit02SupplementalActivities
        .filter((item) => item.difficulty === difficulty);
      expect(activities).toHaveLength(expectedSupplementAnswers[difficulty].length);
      activities.forEach(({ activity }, index) => {
        const correctLabel = activity.options.find(({ id }) => id === activity.correctOptionId)?.label;
        expect(correctLabel, `${difficulty} question ${index + 1}`).toBe(expectedSupplementAnswers[difficulty][index]);
      });
    }
  });

  it('registers the curriculum unit route and its challenge group', () => {
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

  it('loads a ready group with 30 unique candidates at each difficulty while preserving course activities', async () => {
    const [content, unit] = await Promise.all([loadPilotChallengeContent(), loadUnit(unitId)]);
    const loaded = content.groups.find(({ group: candidate }) => candidate.definition.id === groupId);

    expect(loaded?.status).toBe('ready');
    expect(loaded?.candidates).toHaveLength(90);
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      expect(loaded?.candidates.filter((candidate) => candidate.difficulty === difficulty)).toHaveLength(30);
    }
    expect(Object.values(unit!.difficultyTracks).flatMap((track) => track.tasks)
      .flatMap((task) => task.sessions.flatMap((session) => session.activities))).toHaveLength(56);
    expect(loaded?.learningTasks).toHaveLength(7);
  });

  it('assigns every core knowledge point to a task in each difficulty tier', () => {
    const definition = manifest.groups.find(({ definition: candidate }) => candidate.id === groupId)?.definition;
    expect(definition).toBeDefined();
    if (!definition) return;

    const coreKnowledgePointIds = new Set(definition.coreKnowledgePointIds);
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const requiredKnowledgePointIds = new Set(definition.tasks
        .filter((task) => task.difficulty === difficulty)
        .flatMap((task) => task.requiredKnowledgePointIds ?? []));
      expect(requiredKnowledgePointIds, difficulty).toEqual(coreKnowledgePointIds);
    }
  });

  it('audits all 90 candidate answers, mappings, uniqueness, fingerprints, and the author review ledger', async () => {
    const rawManifest = manifest as { groups: Array<{ definition: { id: string }; questionIds: string[] }> };
    const group = rawManifest.groups.find(({ definition }) => definition.id === groupId);
    const [content, inputs] = await Promise.all([loadPilotChallengeContent(), loadChallengeQualityInputs()]);
    const loaded = content.groups.find(({ group: candidate }) => candidate.definition.id === groupId);
    const candidates = loaded?.candidates ?? [];
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
    }

    const fingerprints = await Promise.all(candidates.map(({ activity }) => fingerprintActivity(activity)));
    expect(new Set(fingerprints).size).toBe(90);

    const questionIds = new Set(group?.questionIds ?? []);
    const questions = inputs.manifest.questions.filter(({ questionId }) => questionIds.has(questionId));
    const uniqueness = await analyzeQuestionUniqueness(questions, inputs.activitiesById, inputs.sourceUnitByActivityId);
    expect(uniqueness.exactDuplicateGroups).toEqual([]);
    expect(uniqueness.similarQuestionPairs.filter(({ reason }) => reason.startsWith('交互内容与答案结构相同'))).toEqual([]);
  });

  it('does not reveal the exact correct choice in a prompt or hint', async () => {
    const content = await loadPilotChallengeContent();
    const candidates = content.groups.find(({ group: candidate }) => candidate.definition.id === groupId)?.candidates ?? [];
    const leaks = candidates.flatMap(({ questionId, activity }) => {
      if (activity.kind !== 'choice') return [];
      const correctLabel = activity.options.find(({ id }) => id === activity.correctOptionId)?.label ?? '';
      if (correctLabel.length < 2) return [];
      return `${activity.prompt} ${activity.hint}`.includes(correctLabel) ? [questionId] : [];
    });
    expect(leaks).toEqual([]);
  });
});
