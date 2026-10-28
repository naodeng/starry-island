import { describe, expect, it } from 'vitest';
// @ts-expect-error Node.js is used only to inspect the local question-review ledger during Vitest.
import { existsSync, readFileSync } from 'node:fs';
// @ts-expect-error Node.js is used only to resolve the local question-review ledger during Vitest.
import { resolve } from 'node:path';
import type { ActivityDefinition } from '../../content/types';
import { fingerprintActivity } from './fingerprint';
import { analyzeQuestionUniqueness } from './questionUniqueness';
import { loadChallengeQualityInputs } from './qualityInputs';
import { loadUnit } from '../../content/unitLoader';
import { growthGroups } from './growthGroups';
import { loadPilotChallengeContent } from './pilotContent';
import manifest from './pilotManifest';
import { getPilotUnitChallengeGroupId } from './unitLinks';
import { grade2Term1MathUnit01SupplementalActivities } from './grade2Term1MathUnit01SupplementalActivities';
import { derivePilotQuestionKnowledgePointIds } from './pilotQuestionKnowledgePoints';

declare const process: { cwd(): string };

const unitId = 'grade-2/term-1/math/unit-01';
const groupId = 'grade-2-term-1-math-unit-01';
const expectedSupplementAnswers = {
  basic: [
    '厘米', '米', '600厘米', '1米长的木条', '6格', '线段是直的，有两个端点',
    '窗台高度约和桌子差不多', '8个', '130厘米', '彩带大约有这么长',
    '在60后写上厘米或米等合适单位', '7格', '一块橡皮的长边', '线段两端分别对应的刻度',
    '95厘米、1米、1米20厘米', '蜡笔长约20厘米', '7厘米',
  ],
  advanced: [
    '估测约1米，测量结果98厘米', '彩纸更长', '83厘米', '65厘米', '9格',
    '两种结果接近，估测不必和读数完全相同', '1米长的彩带更长，长5厘米', '铅笔是否从尺子的同一刻度起量',
    '合适的长度单位', '用8减2', '12厘米', '估测和尺子读数接近，可同时保留并注明各自方法',
    '再读起点，并用终点减去起点', '140厘米长的彩带', '10厘米',
  ],
  high: [
    '分别说明估测和读数方法，并保留两项结果', '每次写明对象、数值和单位，并用同一方法测量',
    '125厘米', '重新对准同一端点和起点后再读数',
    '沿直线分段量，记录每段后再合并长度', '8厘米',
    '估测值、尺子读数和各自使用的方法', '核实原记录使用的单位，再补记单位和估测依据',
    '从4到16的丝带更长', '线段两端位置、起点刻度和读出的长度单位',
    '两条纸带一样长', '相隔7格，并补上合适单位',
    '先记估测，再统一起点和单位读数，最后比较',
    '两段合长120厘米，与整段读数一致',
    '1米是100厘米，合起来应是105厘米',
    '核对是否使用相同起点和方法，再看差异是否能由估测解释',
  ],
} as const;

function expectedAnswerSummary(activity: (typeof grade2Term1MathUnit01SupplementalActivities)[number]['activity']): string {
  return activity.options.find(({ id }) => id === activity.correctOptionId)?.label ?? '';
}

function answerSummary(activity: ActivityDefinition): string {
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
  const lines: string[] = readFileSync(path, 'utf8').trim().split(/\r?\n/u);
  const [headerLine = '', ...dataLines] = lines;
  const headers = headerLine.replace(/^\uFEFF/u, '').split('\t');
  return dataLines.map((line) => {
    const values = line.split('\t');
    return Object.fromEntries(headers.map((header, index) => [header, values[index] ?? '']));
  });
}

function leaksAnswerInPromptOrHint(activity: ActivityDefinition, answer: string): boolean {
  if (answer.length <= 2) return false;
  const visiblePromptAndHint = `${activity.prompt} ${activity.hint}`;
  if (/^\d/u.test(answer)) {
    const escapedAnswer = answer.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&');
    return new RegExp(`(?<!\\d)${escapedAnswer}(?!\\d)`, 'u').test(visiblePromptAndHint);
  }
  return visiblePromptAndHint.includes(answer);
}

describe('二年级上册数学第一单元闯关', () => {
  it('课程入口、轻量成长索引和题库清单指向同一正式单元', () => {
    expect(getPilotUnitChallengeGroupId(unitId)).toBe(groupId);
    expect(growthGroups.find(({ id }) => id === groupId)).toMatchObject({
      id: groupId,
      kind: 'unit',
      grade: 2,
      semester: 1,
      subject: 'math',
      sourceUnitIds: [unitId],
    });

    const group = manifest.groups.find(({ definition }) => definition.id === groupId);
    expect(group).toMatchObject({
      releaseIntent: 'released',
      definition: {
        id: groupId,
        kind: 'unit',
        grade: 2,
        semester: 1,
        subject: 'math',
        sourceUnitIds: [unitId],
        learningTaskUnitIds: [unitId],
      },
    });
    expect(group?.definition.tasks).toHaveLength(5);
    expect(group?.questionIds).toHaveLength(90);
    expect(new Set(group?.questionIds).size).toBe(90);
    const reusedCourseQuestionIds = group?.questionIds
      .filter((questionId) => questionId.startsWith(`challenge-question:${unitId}/`)) ?? [];
    const mathFirstHalf = manifest.groups.find(({ definition }) => definition.id === 'grade-2-term-1-math-first-half');
    expect(reusedCourseQuestionIds).toHaveLength(42);
    expect(reusedCourseQuestionIds.every((questionId) => mathFirstHalf?.questionIds.includes(questionId))).toBe(true);
  });

  it('提供三档各 30 道可用题，同时保留原有六个学习任务和 48 道活动', async () => {
    const [content, unit] = await Promise.all([loadPilotChallengeContent(), loadUnit(unitId)]);
    const loaded = content.groups.find(({ group: candidate }) => candidate.definition.id === groupId);
    expect(loaded?.status, JSON.stringify(loaded?.issues, null, 2)).toBe('ready');
    expect(loaded?.candidates).toHaveLength(90);
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      expect(loaded?.candidates.filter((candidate) => candidate.difficulty === difficulty)).toHaveLength(30);
    }
    expect(Object.values(unit!.difficultyTracks).flatMap((track) => track.tasks)
      .flatMap((task) => task.sessions.flatMap((session) => session.activities))).toHaveLength(48);
    expect(loaded?.learningTasks).toHaveLength(6);
  });

  it('逐题核对 48 道原创题的答案、知识点和选项设计', () => {
    expect(grade2Term1MathUnit01SupplementalActivities).toHaveLength(48);
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const authored = grade2Term1MathUnit01SupplementalActivities
        .filter(({ difficulty: candidateDifficulty }) => candidateDifficulty === difficulty);
      expect(authored).toHaveLength(expectedSupplementAnswers[difficulty].length);
      authored.forEach(({ activity, knowledgePointIds }, index) => {
        expect(expectedAnswerSummary(activity), `${difficulty} 第 ${index + 1} 题`)
          .toBe(expectedSupplementAnswers[difficulty][index]);
        expect(derivePilotQuestionKnowledgePointIds(unitId, activity), `${difficulty} 第 ${index + 1} 题知识点`)
          .toEqual(knowledgePointIds);
        expect(activity.options).toHaveLength(3);
        expect(new Set(activity.options.map(({ label }) => label)).size, `${difficulty} 第 ${index + 1} 题选项`)
          .toBe(3);
        expect(activity.hint).not.toContain(expectedAnswerSummary(activity));
      });
    }

    const advancedLengthComparison = grade2Term1MathUnit01SupplementalActivities
      .find(({ activity }) => activity.id.endsWith('advanced-07'))?.activity;
    expect(advancedLengthComparison?.prompt).toContain('1米');
    expect(advancedLengthComparison?.prompt).toContain('95厘米');
    expect(advancedLengthComparison?.prompt).not.toMatch(/[×*]/u);
  });

  it('为原课程的全部 48 道活动提供本单元范围内的知识点映射', async () => {
    const unit = await loadUnit(unitId);
    const sourceActivities = Object.values(unit!.difficultyTracks).flatMap((track) => track.tasks)
      .flatMap((task) => task.sessions.flatMap((session) => session.activities));
    expect(sourceActivities).toHaveLength(48);
    const allowedKnowledgePointIds = new Set([
      'length-units',
      'measurement-and-estimation',
      'measurement-activity-planning',
    ]);
    const mappedIds = sourceActivities.flatMap((activity) => derivePilotQuestionKnowledgePointIds(unitId, activity));
    expect(mappedIds.length).toBeGreaterThanOrEqual(48);
    expect(mappedIds.every((id) => allowedKnowledgePointIds.has(id))).toBe(true);
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
    const manuallyReviewedTemplateIds = [
      'challenge-question:grade-2/term-1/math/unit-01/basic/task-01/session-01/question-07',
      'challenge-question:grade-2/term-1/math/unit-01/advanced/task-01/session-01/question-03',
      'challenge-question:grade-2/term-1/math/unit-01/advanced/task-01/session-01/question-06',
      'challenge-question:grade-2/term-1/math/unit-01/advanced/task-02/session-01/question-05',
    ];
    for (const questionId of manuallyReviewedTemplateIds) {
      const row = rows.find(({ 题目ID }) => 题目ID === questionId);
      expect(row?.['审校记录'], questionId).toContain('自动相似题提示复核');
    }
    const mappingMismatches: Array<{ questionId: string; prompt: string; manifestIds: string[]; derivedIds: string[] }> = [];
    for (const row of rows) {
      const candidate = candidateByQuestionId.get(row['题目ID']);
      expect(candidate, row['题目ID']).toBeDefined();
      expect(row['正确选项'], row['题目ID']).toBe(answerSummary(candidate!.activity));
      expect(row['知识点'], row['题目ID']).toBe(candidate!.knowledgePointIds.join('；'));
      const derivedIds = derivePilotQuestionKnowledgePointIds(unitId, candidate!.activity);
      if (JSON.stringify(derivedIds) !== JSON.stringify(candidate!.knowledgePointIds)) {
        mappingMismatches.push({ questionId: row['题目ID'], prompt: candidate!.activity.prompt, manifestIds: candidate!.knowledgePointIds, derivedIds });
      }
      expect(candidate!.approved, row['题目ID']).toBe(true);
      expect(candidate!.answerLeakageReviewed, row['题目ID']).toBe(true);
      if (candidate!.activity.id.startsWith('challenge-supplement-')) {
        expect(leaksAnswerInPromptOrHint(candidate!.activity, answerSummary(candidate!.activity)), row['题目ID'])
          .toBe(false);
      }
    }
    expect(mappingMismatches).toEqual([]);

    const fingerprints = await Promise.all(candidates.map(({ activity }) => fingerprintActivity(activity)));
    expect(new Set(fingerprints).size).toBe(90);
    candidates.forEach((candidate, index) => {
      expect(candidate.approvedContentFingerprint, candidate.questionId).toBe(fingerprints[index]);
    });
    const questionIds = new Set(group?.questionIds ?? []);
    const questions = inputs.manifest.questions.filter(({ questionId }) => questionIds.has(questionId));
    const uniqueness = await analyzeQuestionUniqueness(questions, inputs.activitiesById, inputs.sourceUnitByActivityId);
    expect(uniqueness.exactDuplicateGroups).toEqual([]);
    expect(uniqueness.similarQuestionPairs.filter(({ reason }) => reason.startsWith('交互内容与答案结构相同'))).toEqual([]);
  });
});
