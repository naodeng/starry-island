import { describe, expect, it } from 'vitest';
// @ts-expect-error Node.js is used only to inspect the local question-review ledger during Vitest.
import { existsSync, readFileSync } from 'node:fs';
// @ts-expect-error Node.js is used only to resolve the local question-review ledger during Vitest.
import { resolve } from 'node:path';
import type { ActivityDefinition } from '../../content/types';
import { loadUnit } from '../../content/unitLoader';
import { fingerprintActivity } from './fingerprint';
import { analyzeQuestionUniqueness } from './questionUniqueness';
import { loadChallengeQualityInputs } from './qualityInputs';
import { growthGroups } from './growthGroups';
import { loadPilotChallengeContent } from './pilotContent';
import manifest from './pilotManifest';
import { getPilotUnitChallengeGroupId } from './unitLinks';
import { grade2Term1MathUnit03SupplementalActivities } from './grade2Term1MathUnit03SupplementalActivities';
import { derivePilotQuestionKnowledgePointIds } from './pilotQuestionKnowledgePoints';

declare const process: { cwd(): string };

const unitId = 'grade-2/term-1/math/unit-03';
const groupId = 'grade-2-term-1-math-unit-03';
const expectedSupplementAnswers = {
  basic: [
    '一个顶点和两条直边', '顶点', '直的', '书本封面的方形拐角', '两片刀刃之间形成的角',
    '方形纸张的拐角', '从同一点伸出的两条直边', '直角', '一样大', '小于方形角', '大于方形角',
    '保持原来的大小', '大小不变，只改变方向', '先对齐顶点和一条边，再比较另一条边',
  ],
  advanced: [
    '先对齐顶点和一条边，再比较另一条边', '外侧的角更大', '两个角一样大',
    '大小不变，只改变方向', '门轴相接处是顶点，门和门框方向是两条边',
    '大于方形角', '甲角比乙角大', '比较开口，不看边长',
    '两条直边在一个点相遇', '大小相同', '小于方形角', '两条边相遇的地方',
    '圆盘的弯曲边缘', '使用同一个方形角作参照并先对齐',
  ],
  high: [
    '选择安全物品、标出角的组成，再用共同参照比较', '一样大', '纸张大小不会改变角的大小',
    '另一条边的位置', '选择安全可观察的物品并保持距离', '小于参照角',
    '观察对象、对齐方法和另一条边的位置', '大小不变，只改变朝向', '张开程度相同',
    '角的张开程度更大', '一个顶点和两条直边', '弯曲边缘没有两条直边相交',
    '先对齐顶点和一条边，再比较张开程度', '用方形角作参照并说明观察到的边的位置',
  ],
} as const;

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

describe('二年级上册数学第三单元闯关', () => {
  it('课程入口、成长索引和题库清单指向同一正式单元', () => {
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
    expect(group?.questionIds.filter((questionId) => questionId.startsWith(`challenge-question:${unitId}/`)))
      .toHaveLength(48);
  });

  it('三档各提供30道可用题，同时保留原有六个学习任务和48道活动', async () => {
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

  it('逐题核对42道原创题的答案、知识点和选项设计', () => {
    expect(grade2Term1MathUnit03SupplementalActivities).toHaveLength(42);
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const authored = grade2Term1MathUnit03SupplementalActivities
        .filter(({ difficulty: candidateDifficulty }) => candidateDifficulty === difficulty);
      expect(authored).toHaveLength(expectedSupplementAnswers[difficulty].length);
      authored.forEach(({ activity, knowledgePointIds }, index) => {
        const answer = answerSummary(activity);
        expect(answer, `${difficulty} 第 ${index + 1} 题`).toBe(expectedSupplementAnswers[difficulty][index]);
        expect(derivePilotQuestionKnowledgePointIds(unitId, activity), `${difficulty} 第 ${index + 1} 题知识点`)
          .toEqual(knowledgePointIds);
        expect(knowledgePointIds.every((id) => ['angle-parts', 'angle-comparison'].includes(id))).toBe(true);
        expect(activity.kind).toBe('choice');
        if (activity.kind === 'choice') {
          expect(activity.options).toHaveLength(3);
          expect(new Set(activity.options.map(({ label }) => label)).size).toBe(3);
        }
        expect(activity.hint).not.toContain(answer);
        expect(leaksAnswerInPromptOrHint(activity, answer), `${difficulty} 第 ${index + 1} 题答案泄漏`)
          .toBe(false);
      });
    }
  });

  it('原课程全部48道活动仍映射到角的组成或角的比较知识点', async () => {
    const unit = await loadUnit(unitId);
    const sourceActivities = Object.values(unit!.difficultyTracks).flatMap((track) => track.tasks)
      .flatMap((task) => task.sessions.flatMap((session) => session.activities));
    expect(sourceActivities).toHaveLength(48);
    const allowedKnowledgePointIds = new Set(['angle-parts', 'angle-comparison']);
    const mappedIds = sourceActivities.flatMap((activity) => derivePilotQuestionKnowledgePointIds(unitId, activity));
    expect(mappedIds.length).toBeGreaterThanOrEqual(48);
    expect(mappedIds.every((id) => allowedKnowledgePointIds.has(id))).toBe(true);
  });

  it('题目清单、审校台账、内容指纹和重复检查保持一致', async () => {
    const group = manifest.groups.find(({ definition }) => definition.id === groupId);
    const [content, inputs] = await Promise.all([loadPilotChallengeContent(), loadChallengeQualityInputs()]);
    const candidates = content.groups.find(({ group: candidate }) => candidate.definition.id === groupId)?.candidates ?? [];
    const candidateByQuestionId = new Map(candidates.map((candidate) => [candidate.questionId, candidate]));
    const ledgerPath = resolve(process.cwd(), `docs/challenges/${groupId}-question-review.tsv`);

    expect(existsSync(ledgerPath)).toBe(true);
    if (!existsSync(ledgerPath)) return;
    const rows = readTsv(ledgerPath);
    expect(rows).toHaveLength(90);
    expect(new Set(rows.map(({ 题目ID }) => 题目ID))).toEqual(new Set(group?.questionIds));
    expect(rows.every(({ 审核状态 }) => 审核状态.includes('作者逐题自审通过') && 审核状态.includes('未独立教育者复核'))).toBe(true);
    const mappingMismatches: Array<{ questionId: string; manifestIds: string[]; derivedIds: string[] }> = [];
    for (const row of rows) {
      const candidate = candidateByQuestionId.get(row['题目ID']);
      expect(candidate, row['题目ID']).toBeDefined();
      expect(row['正确选项'], row['题目ID']).toBe(answerSummary(candidate!.activity));
      expect(row['知识点'], row['题目ID']).toBe(candidate!.knowledgePointIds.join('；'));
      const derivedIds = derivePilotQuestionKnowledgePointIds(unitId, candidate!.activity);
      if (JSON.stringify(derivedIds) !== JSON.stringify(candidate!.knowledgePointIds)) {
        mappingMismatches.push({ questionId: row['题目ID'], manifestIds: candidate!.knowledgePointIds, derivedIds });
      }
      expect(candidate!.approved, row['题目ID']).toBe(true);
      expect(candidate!.answerLeakageReviewed, row['题目ID']).toBe(true);
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
