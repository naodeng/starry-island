import { describe, expect, it } from 'vitest';
// @ts-expect-error Node.js is used only to inspect the review ledger during Vitest.
import { existsSync, readFileSync } from 'node:fs';
// @ts-expect-error The path is used only to resolve the review ledger during Vitest.
import { resolve } from 'node:path';
import type { ActivityDefinition } from '../../content/types';
import { submitAnswer } from '../../learning/answers';
import { loadUnit } from '../../content/unitLoader';
import { fingerprintActivity } from './fingerprint';
import { analyzeQuestionUniqueness } from './questionUniqueness';
import { loadChallengeQualityInputs } from './qualityInputs';
import { growthGroups } from './growthGroups';
import { loadPilotChallengeContent } from './pilotContent';
import manifest from './pilotManifest';
import { getPilotUnitChallengeGroupId } from './unitLinks';
import { derivePilotQuestionKnowledgePointIds } from './pilotQuestionKnowledgePoints';

declare const process: { cwd(): string };

const sourceUnitId = 'grade-2/term-1/english/unit-01';
const groupId = 'grade-2-term-1-english-unit-01';
const coreKnowledgePointIds = ['family-member-vocabulary', 'family-introduction', 'he-she-pronouns'];
const expectedSupplementAnswers = {
  basic: [
    '爸爸', '妈妈', '姐姐或妹妹', '哥哥或弟弟', '爷爷或外公', '奶奶或外婆', 'This is my mother.',
    'This is my brother.', 'He is my father.', 'She is my sister.', 'He', 'She', 'This is my sister.', 'mother — she',
  ],
  advanced: [
    'This is my grandfather.', 'This is my grandmother.', '把 He 改成 She。', 'father：he；sister：she',
    'This is my sister.', 'This is my grandfather.', 'brother 是男性，sister 是女性。', 'She', 'He is my father.',
    'This is my brother.', '两组都正确。', 'She is my sister.', 'This is my grandmother.',
    'A：She is my mother.；B：He is my grandfather.', 'she、he、she', '把 sister—he 改成 sister—she。',
    '把 She 改成 He。', 'He is my grandfather.；She is my sister.', '三组配对都正确。',
    'mother、brother、grandmother', 'He is my father.；She is my sister.；She is my grandmother.',
    'mother、brother、grandfather',
    '姐姐或妹妹',
  ],
  high: [
    'He is my father.；She is my grandmother.', '把 He 改成 She，保留 my sister。',
    '爷爷那行应把 She 改为 He。', 'he、she、she', 'She is my sister.',
    '甲：He is my brother.；乙：She is my grandmother.', 'father 用 he 介绍，mother 用 she 介绍。',
    'This is my grandmother.', '甲：He is my brother.；乙：She is my mother.',
    '保留第一行；第二行把 He 改为 She。',
    'He is my grandfather.；She is my mother.；He is my brother.',
    'grandmother—She；father—He；sister—She', '把 She 改成 He。',
    'A、B 保留；C 把 She 改成 He。', 'She is my sister.；He is my grandfather.；He is my father.',
    '保留 A、C；把 B 的 He 改成 She。', 'He、She',
  ],
} as const;

function answerSummary(activity: ActivityDefinition): string {
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
    case 'arithmetic': return `${activity.expression}=${activity.correctAnswer}`;
    case 'measurement': return `${activity.targetLengthCm} 厘米`;
  }
}

function readTsv(path: string): Array<Record<string, string>> {
  const lines = readFileSync(path, 'utf8').trim().split(/\r?\n/u) as string[];
  const [headerLine = '', ...dataLines] = lines;
  const headers = headerLine.replace(/^\uFEFF/u, '').split('\t');
  return dataLines.map((line) => {
    const values = line.split('\t');
    return Object.fromEntries(headers.map((header, index) => [header, values[index] ?? '']));
  });
}

describe('二年级上册英语第一单元闯关', () => {
  it('把 My Family 登记为正式闯关组并为每档提供30道候选题', () => {
    expect(getPilotUnitChallengeGroupId(sourceUnitId)).toBe(groupId);
    expect(growthGroups.find(({ id }) => id === groupId)).toMatchObject({
      id: groupId,
      kind: 'unit',
      grade: 2,
      semester: 1,
      subject: 'english',
      sourceUnitIds: [sourceUnitId],
    });

    const challengeManifest = manifest;
    const group = challengeManifest.groups.find(({ definition }) => definition.id === groupId);
    expect(group).toMatchObject({
      releaseIntent: 'released',
      definition: {
        id: groupId,
        kind: 'unit',
        grade: 2,
        semester: 1,
        subject: 'english',
        sourceUnitIds: [sourceUnitId],
        learningTaskUnitIds: [sourceUnitId],
        coreKnowledgePointIds,
      },
    });
    expect(group?.definition.tasks).toHaveLength(5);
    expect(group?.questionIds).toHaveLength(90);
    expect(new Set(group?.questionIds).size).toBe(90);
    expect(Object.fromEntries(['basic', 'advanced', 'high'].map((difficulty) => [
      difficulty,
      challengeManifest.questions.filter((question) => group?.questionIds.includes(question.questionId)
        && question.difficulty === difficulty).length,
    ]))).toEqual({ basic: 30, advanced: 30, high: 30 });
  });

  it('加载成功且保留原课程的48道活动和六个学习任务', async () => {
    const [content, unit] = await Promise.all([loadPilotChallengeContent(), loadUnit(sourceUnitId)]);
    const loaded = content.groups.find(({ group }) => group.definition.id === groupId);
    expect(loaded?.status, JSON.stringify(loaded?.issues, null, 2)).toBe('ready');
    expect(loaded?.candidates).toHaveLength(90);
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      expect(loaded?.candidates.filter((candidate) => candidate.difficulty === difficulty)).toHaveLength(30);
    }
    expect(Object.values(unit!.difficultyTracks).flatMap((track) => track.tasks)
      .flatMap((task) => task.sessions.flatMap((session) => session.activities))).toHaveLength(48);
    expect(loaded?.learningTasks).toHaveLength(6);
  });

  it('从闯关池排除跨难度重复课程候选且保持课程内容不变', async () => {
    const group = manifest.groups.find(({ definition }) => definition.id === groupId);
    const questions = manifest.questions.filter((question) => group?.questionIds.includes(question.questionId));
    const sourceQuestions = questions.filter((question) => question.activityId.startsWith(`${sourceUnitId}/`));
    const supplementalQuestions = questions.filter((question) => question.activityId.startsWith('challenge-supplement-grade-2-term-1-english-unit-01-'));
    const excludedSourceActivityIds = [
      `${sourceUnitId}/advanced/task-01/session-01/question-03`,
      `${sourceUnitId}/high/task-01/session-01/question-03`,
      `${sourceUnitId}/advanced/task-01/session-01/question-04`,
      `${sourceUnitId}/advanced/task-01/session-01/question-07`,
      `${sourceUnitId}/advanced/task-02/session-01/question-07`,
      `${sourceUnitId}/high/task-01/session-01/question-04`,
      `${sourceUnitId}/advanced/task-02/session-01/question-04`,
      `${sourceUnitId}/high/task-02/session-01/question-04`,
      `${sourceUnitId}/advanced/task-02/session-01/question-01`,
      `${sourceUnitId}/advanced/task-02/session-01/question-02`,
      `${sourceUnitId}/advanced/task-02/session-01/question-03`,
      `${sourceUnitId}/advanced/task-02/session-01/question-06`,
    ];

    expect(sourceQuestions).toHaveLength(36);
    expect(Object.fromEntries(['basic', 'advanced', 'high'].map((difficulty) => [
      difficulty,
      sourceQuestions.filter((question) => question.difficulty === difficulty).length,
    ]))).toEqual({ basic: 16, advanced: 7, high: 13 });
    expect(supplementalQuestions).toHaveLength(54);
    expect(excludedSourceActivityIds.filter((activityId) => sourceQuestions.some((question) => question.activityId === activityId))).toEqual([]);

    const unit = await loadUnit(sourceUnitId);
    const courseActivityIds = new Set(Object.values(unit!.difficultyTracks).flatMap((track) => track.tasks)
      .flatMap((task) => task.sessions.flatMap((session) => session.activities.map((activity) => activity.id))));
    expect(excludedSourceActivityIds.every((activityId) => courseActivityIds.has(activityId))).toBe(true);
  });

  it('逐题核对54道原创题的答案、知识点和实际评分', async () => {
    const inputs = await loadChallengeQualityInputs();
    const supplementalRecords = manifest.questions.filter(({ questionId }) => questionId.startsWith(`challenge-question:challenge-supplement-${groupId}`));
    expect(supplementalRecords).toHaveLength(54);
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const records = supplementalRecords.filter((question) => question.difficulty === difficulty);
      expect(records).toHaveLength(expectedSupplementAnswers[difficulty].length);
      records.forEach((question, index) => {
        const activity = inputs.activitiesById.get(question.activityId);
        expect(activity, question.activityId).toBeDefined();
        expect(activity?.kind).toBe('choice');
        if (activity?.kind !== 'choice') return;
        const answer = answerSummary(activity);
        expect(answer, `${difficulty} 第 ${index + 1} 题答案`).toBe(expectedSupplementAnswers[difficulty][index]);
        expect(derivePilotQuestionKnowledgePointIds(sourceUnitId, activity), `${difficulty} 第 ${index + 1} 题知识点`)
          .toEqual(question.knowledgePointIds);
        expect(question.knowledgePointIds.every((id) => coreKnowledgePointIds.includes(id))).toBe(true);
        expect(activity.options).toHaveLength(3);
        expect(new Set(activity.options.map(({ label }) => label)).size).toBe(3);
        expect(activity.options.some(({ id }) => id === activity.correctOptionId)).toBe(true);
        expect(submitAnswer(activity, activity.correctOptionId)).toBe(true);
        expect(activity.prompt).not.toContain(answer);
        expect(activity.hint).not.toContain(answer);
      });
    }
  });

  it('逐题台账与90道候选的答案、指纹、来源及唯一性一致', async () => {
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
    expect(rows.every(({ 审核状态 }) => 审核状态.includes('逐题自审通过') && 审核状态.includes('未独立教育者复核'))).toBe(true);
    expect(rows.filter(({ 来源 }) => 来源 === '课程原题')).toHaveLength(36);
    expect(rows.filter(({ 来源 }) => 来源 === '原创补题')).toHaveLength(54);
    for (const row of rows) {
      const candidate = candidateByQuestionId.get(row['题目ID']);
      expect(candidate, row['题目ID']).toBeDefined();
      expect(row['活动ID'], row['题目ID']).toBe(candidate!.activityId);
      expect(row['题干'], row['题目ID']).toBe(candidate!.activity.prompt);
      expect(row['正确答案'], row['题目ID']).toBe(answerSummary(candidate!.activity));
      expect(row['知识点'], row['题目ID']).toBe(candidate!.knowledgePointIds.join('；'));
      expect(row['提示'], row['题目ID']).toBe(candidate!.activity.hint);
      expect(row['解析'], row['题目ID']).toBe(candidate!.activity.explanation);
      if (candidate!.activity.kind === 'choice') {
        expect(row['选项'], row['题目ID']).toBe(candidate!.activity.options.map(({ label }) => label).join(' / '));
      }
      expect(candidate!.approved, row['题目ID']).toBe(true);
      expect(candidate!.answerLeakageReviewed, row['题目ID']).toBe(true);
    }
    const fingerprints = await Promise.all(candidates.map(({ activity }) => fingerprintActivity(activity)));
    expect(new Set(fingerprints).size).toBe(90);
    candidates.forEach((candidate, index) => {
      expect(candidate.approvedContentFingerprint, candidate.questionId).toBe(fingerprints[index]);
    });
    const allQuestionIds = new Set(inputs.manifest.questions.map(({ questionId }) => questionId));
    expect(group?.questionIds.every((questionId) => allQuestionIds.has(questionId))).toBe(true);
    const questions = inputs.manifest.questions.filter(({ questionId }) => group?.questionIds.includes(questionId));
    const uniqueness = await analyzeQuestionUniqueness(questions, inputs.activitiesById, inputs.sourceUnitByActivityId);
    expect(uniqueness.exactDuplicateGroups).toEqual([]);
  });

  it('每档都覆盖家庭称谓、介绍句和 he/she 核心知识点', () => {
    const group = manifest.groups.find(({ definition }) => definition.id === groupId);
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const questions = manifest.questions.filter((question) => group?.questionIds.includes(question.questionId)
        && question.difficulty === difficulty);
      const covered = new Set(questions.flatMap(({ knowledgePointIds }) => knowledgePointIds));
      expect(coreKnowledgePointIds.every((id) => covered.has(id))).toBe(true);
    }
  });
});
