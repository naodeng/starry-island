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
import { grade2Term1MathUnit05SupplementalActivities } from './grade2Term1MathUnit05SupplementalActivities';
import { derivePilotQuestionKnowledgePointIds } from './pilotQuestionKnowledgePoints';

declare const process: { cwd(): string };

const unitId = 'grade-2/term-1/math/unit-05';
const groupId = 'grade-2-term-1-math-unit-05';
const allowedKnowledgePointIds = ['object-view-directions', 'visible-view-information'];
const expectedSupplementAnswers = {
  basic: [
    '三个正面左右并排', '一个正面', '每个方向各看到一个面', '两个正面上下排列', '上层方块的顶面',
    '三个顶面左右排成一行', '站在这一排的正前方', '从上方往下观察', '不能，还要观察其他方向',
    '不能只凭这个视图判断', '可能从多个面变成一个面', '观察方向和看到的排列',
    '主要看到最前面的方块，后面的方块被挡住', '换到另一方向继续观察',
  ],
  advanced: [
    '前一种左右排，后一种上下排', '两行顶面，每行三个', '不能，顶面视图没有显示高度',
    '正面可见三个面横向排列', '保持方块不动，只改变观察位置', '上面可见的位置有三个顶面排成一行',
    '同一位置上下叠着两块方块', '不能确定下面是否还叠着方块', '这个方向的视图中可见一个面',
    '左右相邻的两个位置', '再从侧面或后面观察', '两人站的位置和观察方向',
    '从正面和侧面看到的方向不同', '每个顶面下面都没有其他方块',
  ],
  high: [
    '方块怎样摆放以及每幅图的观察方向', '正面可见两个面左右并排，顶面可见两个顶面前后排列',
    '从正面或侧面观察高度', '保留可见顶面的记录，把背后情况标为待观察',
    '固定模型并确认每幅图的观察方向', '同一位置上下叠放两块方块',
    '顶面图没有显示这些位置下面是否还有方块',
    '再比较正面或侧面显示的高度和前后位置',
    '分别给两幅图标明正面和侧面观察方向',
    '正面图没有展示背面，需要再观察',
    '固定的方块摆放、每次观察方向和可见排列', '两人的观察方向不同',
    '固定摆放、确定方向、观察记录、再比较推想',
    '标出观察方向，并注明它只显示该方向可见部分',
  ],
} as const;

function answerSummary(activity: ActivityDefinition): string {
  switch (activity.kind) {
    case 'choice': return activity.options.find(({ id }) => id === activity.correctOptionId)?.label ?? '';
    case 'arithmetic': return String(activity.correctAnswer);
    case 'match': return activity.pairs.map(({ left, right }) => `${left}→${right}`).join('；');
    case 'order': {
      const labels = new Map(activity.items.map(({ id, label }) => [id, label]));
      return activity.correctOrder.map((id) => labels.get(id) ?? '').join(' → ');
    }
    case 'categorize': {
      const labels = new Map(activity.categories.map(({ id, label }) => [id, label]));
      return activity.items.map(({ label, categoryId }) => `${label}→${labels.get(categoryId) ?? ''}`).join('；');
    }
    case 'measurement': return String(activity.targetLengthCm);
  }
}

function readTsv(path: string): Array<Record<string, string>> {
  const lines: string[] = readFileSync(path, 'utf8').trim().split(/\r?\n/u);
  const [headerLine = '', ...dataLines] = lines;
  const headers: string[] = headerLine.replace(/^\uFEFF/u, '').split('\t');
  return dataLines.map((line: string) => {
    const values = line.split('\t');
    return Object.fromEntries(headers.map((header: string, index: number) => [header, values[index] ?? '']));
  });
}

function leaksAnswerInPromptOrHint(activity: ActivityDefinition, answer: string): boolean {
  const visiblePromptAndHint = `${activity.prompt} ${activity.hint}`;
  const numericAnswer = /^\d+(?:个|面|层|块|行|列)?$/u.test(answer) ? answer.match(/^\d+/u)?.[0] : undefined;
  if (numericAnswer) return new RegExp(`(?<!\\d)${numericAnswer}(?!\\d)`, 'u').test(visiblePromptAndHint);
  return visiblePromptAndHint.includes(answer);
}

describe('二年级上册数学第五单元闯关', () => {
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

  it('闯关就绪且不更改原课程活动和学习任务', async () => {
    const [content, unit] = await Promise.all([loadPilotChallengeContent(), loadUnit(unitId)]);
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

  it('逐题核对42道原创题的答案、知识点与答案泄漏', () => {
    expect(grade2Term1MathUnit05SupplementalActivities).toHaveLength(42);
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const authored = grade2Term1MathUnit05SupplementalActivities
        .filter(({ difficulty: candidateDifficulty }) => candidateDifficulty === difficulty);
      expect(authored).toHaveLength(14);
      authored.forEach(({ activity, knowledgePointIds }, index) => {
        const answer = answerSummary(activity);
        expect(answer, `${difficulty} 第 ${index + 1} 题`).toBe(expectedSupplementAnswers[difficulty][index]);
        expect(derivePilotQuestionKnowledgePointIds(unitId, activity), `${difficulty} 第 ${index + 1} 题知识点`)
          .toEqual(knowledgePointIds);
        expect(knowledgePointIds.length).toBeGreaterThan(0);
        expect(knowledgePointIds.every((id) => allowedKnowledgePointIds.includes(id))).toBe(true);
        expect(activity.options).toHaveLength(3);
        expect(new Set(activity.options.map(({ label }) => label)).size).toBe(3);
        expect(activity.hint).not.toContain(answer);
        expect(leaksAnswerInPromptOrHint(activity, answer), `${difficulty} 第 ${index + 1} 题答案泄漏`)
          .toBe(false);
      });
    }
  });

  it('证据判断题给出观察条件且只有一个有依据的结论', () => {
    const advanced = grade2Term1MathUnit05SupplementalActivities.filter(({ difficulty }) => difficulty === 'advanced');
    const high = grade2Term1MathUnit05SupplementalActivities.filter(({ difficulty }) => difficulty === 'high');

    expect(advanced[13]?.activity.prompt).toContain('左右相邻');
    expect(high[1]?.activity.prompt).toContain('前后');
    expect(answerSummary(high[1]!.activity)).toBe('正面可见两个面左右并排，顶面可见两个顶面前后排列');
    expect(high[11]?.activity.prompt).toContain('正面和上面');
    expect(answerSummary(high[11]!.activity)).toBe('两人的观察方向不同');
  });

  it('原课程48道活动均映射到本单元观察知识点', async () => {
    const unit = await loadUnit(unitId);
    const sourceActivities = Object.values(unit!.difficultyTracks).flatMap((track) => track.tasks)
      .flatMap((task) => task.sessions.flatMap((session) => session.activities));
    expect(sourceActivities).toHaveLength(48);
    const mappedIds = sourceActivities.flatMap((activity) => derivePilotQuestionKnowledgePointIds(unitId, activity));
    expect(mappedIds.length).toBeGreaterThanOrEqual(48);
    expect(mappedIds.every((id) => allowedKnowledgePointIds.includes(id))).toBe(true);
  });

  it('题库、逐题台账和审核指纹保持一致且没有完全重复题', async () => {
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
    for (const row of rows) {
      const candidate = candidateByQuestionId.get(row['题目ID']);
      expect(candidate, row['题目ID']).toBeDefined();
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
    const questionIds = new Set(group?.questionIds ?? []);
    const questions = inputs.manifest.questions.filter(({ questionId }) => questionIds.has(questionId));
    const uniqueness = await analyzeQuestionUniqueness(questions, inputs.activitiesById, inputs.sourceUnitByActivityId);
    expect(uniqueness.exactDuplicateGroups).toEqual([]);
  });
});
