import { describe, expect, it } from 'vitest';
// @ts-expect-error Node.js is used only to inspect the local review ledger during Vitest.
import { existsSync, readFileSync } from 'node:fs';
// @ts-expect-error Node.js is used only to resolve the local review ledger during Vitest.
import { resolve } from 'node:path';
import type { ActivityDefinition } from '../../content/types';
import { grade1Term2EnglishUnit01SupplementalActivities } from './grade1Term2EnglishUnit01SupplementalActivities';
import { loadUnit } from '../../content/unitLoader';
import { derivePilotQuestionKnowledgePointIds } from './pilotQuestionKnowledgePoints';
import { fingerprintActivity } from './fingerprint';
import { loadPilotChallengeContent } from './pilotContent';
import manifest from './pilotManifest';
import { getPilotUnitChallengeGroupId } from './unitLinks';
import { growthGroups } from './growthGroups';

const groupId = 'grade-1-term-2-english-unit-01';
const unitId = 'grade-1/term-2/english/unit-01';
declare const process: { cwd(): string };

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
    case 'measurement':
      return String(activity.targetLengthCm);
    case 'arithmetic':
      return String(activity.correctAnswer);
  }
}

describe('Grade 1 Term 2 English Unit 1 challenge', () => {
  it('maps all source and original candidates to the four unit targets without duplicate prompts', async () => {
    const unit = await loadUnit(unitId);
    expect(unit).toBeDefined();

    const sourceActivities = Object.values(unit!.difficultyTracks).flatMap((track) =>
      track.tasks.flatMap((task) => task.sessions.flatMap((session) => session.activities)));
    expect(sourceActivities).toHaveLength(48);
    expect(new Set(sourceActivities.map(({ id }) => id)).size).toBe(48);

    const allowedKnowledgePoints = new Set([
      'classroom-object-vocabulary', 'position-word-vocabulary',
      'asking-about-location', 'location-sentences-and-instructions',
    ]);
    for (const activity of sourceActivities) {
      const ids = derivePilotQuestionKnowledgePointIds(unitId, activity);
      expect(ids.length, activity.id).toBeGreaterThan(0);
      expect(ids.every((id) => allowedKnowledgePoints.has(id)), activity.id).toBe(true);
    }

    const fingerprints = await Promise.all([
      ...sourceActivities,
      ...grade1Term2EnglishUnit01SupplementalActivities.map(({ activity }) => activity),
    ].map((activity) => fingerprintActivity(activity)));
    expect(new Set(fingerprints).size).toBe(fingerprints.length);
    for (const { knowledgePointIds } of grade1Term2EnglishUnit01SupplementalActivities) {
      expect(knowledgePointIds.length).toBeGreaterThan(0);
      expect(knowledgePointIds.every((id) => allowedKnowledgePoints.has(id))).toBe(true);
    }
  });

  it('keeps independently checked answer keys and hints that do not reveal them', () => {
    const expectedAnswers = {
      basic: [
        'blackboard', 'chair', 'desk', '在桌子上', 'under', '椅子上', 'Where is the blackboard?',
        'The schoolbag is under the chair.', '在书包里面', '椅子在桌子上', 'on', '书桌在黑板下面',
        'The chair is under the desk.', 'blackboard',
      ],
      advanced: [
        'Where is the pencil box?', 'Put your schoolbag on the desk.', 'The desk is under the blackboard.',
        '把 on 改成 under', 'desk 是物品；in 是位置词', 'Where is the schoolbag?',
        '书包在椅子下面；铅笔盒在书包里', 'The blackboard is in the classroom.', 'The chair is under the desk.',
        '铅笔盒仍在书包里，书包在椅子上', 'Where is the blackboard?', '应把铅笔盒放在桌子上',
        '第一句说明椅子的位置，第二句询问书桌的位置', 'desk 和 blackboard 是物品，under 表示位置',
        'schoolbag', '黑板下面', 'The desk is under the blackboard.', 'on the desk', 'Where is the blackboard?', 'my',
      ],
      high: [
        '铅笔盒在椅子下面', 'A 在问椅子的位置，B 说椅子在桌子下面', '把 on 改成 under',
        'blackboard 放物品栏，under 放位置词栏',
        'Where is the desk? — The desk is under the blackboard.',
        '铅笔盒在书包里，书包在桌子上',
        'Where is the blackboard? — The blackboard is in the classroom.',
        '问题问书桌的位置，回答却说明椅子的位置',
        '书包在椅子下面，铅笔盒在书包里', '不同；第一句是书桌在黑板下面',
        'Where is the desk? — The desk is under the blackboard.',
        'in 表示在书包里面，不是 on 表示在书包上面', 'chair、under、desk',
        '把 desk 改成 chair：Where is the chair?',
        '书桌', '书桌在黑板下面，椅子在书桌下面', '书包', '黑板在教室里，书桌在黑板下面',
      ],
    } as const;

    expect(grade1Term2EnglishUnit01SupplementalActivities).toHaveLength(52);
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const items = grade1Term2EnglishUnit01SupplementalActivities.filter((item) => item.difficulty === difficulty);
      const correctAnswers = items.map(({ activity }) =>
        activity.options.find(({ id }) => id === activity.correctOptionId)?.label);

      expect(items).toHaveLength({ basic: 14, advanced: 20, high: 18 }[difficulty]);
      expect(new Set(items.map(({ activity }) => activity.prompt)).size).toBe(items.length);
      expect(correctAnswers).toEqual(expectedAnswers[difficulty]);
      const correctPositionCounts = [0, 0, 0];
      for (const { activity } of items) {
        expect(activity.options).toHaveLength(3);
        expect(new Set(activity.options.map(({ label }) => label)).size).toBe(3);
        correctPositionCounts[activity.options.findIndex(({ id }) => id === activity.correctOptionId)] += 1;
        const correctAnswer = activity.options.find(({ id }) => id === activity.correctOptionId)?.label ?? '';
        expect(activity.hint).not.toContain(correctAnswer);
      }
      expect(Math.max(...correctPositionCounts) - Math.min(...correctPositionCounts)).toBeLessThanOrEqual(1);
    }
  });

  it('registers a term-two unit group with a course entry and private growth projection', () => {
    const group = manifest.groups.find(({ definition }) => definition.id === groupId);

    expect(group).toBeDefined();
    if (!group) return;

    expect(group.definition).toMatchObject({
      id: groupId,
      kind: 'unit',
      grade: 1,
      semester: 2,
      subject: 'english',
      sourceUnitIds: [unitId],
    });
    expect(getPilotUnitChallengeGroupId(unitId)).toBe(groupId);
    expect(group.questionIds).toHaveLength(90);
    const duplicateCourseQuestions = [
      `${unitId}/advanced/task-01/session-01/question-01`,
      `${unitId}/advanced/task-01/session-01/question-02`,
      `${unitId}/advanced/task-01/session-01/question-05`,
      `${unitId}/advanced/task-02/session-01/question-01`,
      `${unitId}/advanced/task-02/session-01/question-02`,
      `${unitId}/advanced/task-02/session-01/question-05`,
      `${unitId}/high/task-01/session-01/question-05`,
      `${unitId}/high/task-01/session-01/question-07`,
      `${unitId}/high/task-02/session-01/question-05`,
      `${unitId}/high/task-02/session-01/question-07`,
    ];
    expect(group.questionIds.map((id) => id.replace('challenge-question:', '')))
      .not.toEqual(expect.arrayContaining(duplicateCourseQuestions));
    expect(growthGroups.find(({ id }) => id === groupId)).toMatchObject({
      id: groupId,
      kind: 'unit',
      grade: 1,
      semester: 2,
      subject: 'english',
      sourceUnitIds: [unitId],
    });
    expect(JSON.stringify(growthGroups.find(({ id }) => id === groupId)))
      .not.toMatch(/questionIds|questionId|prompt|answer/i);
  });

  it('audits all 90 released candidates against the Chinese question-review ledger', async () => {
    const group = manifest.groups.find(({ definition }) => definition.id === groupId);
    const loadedContent = await loadPilotChallengeContent();
    const loaded = loadedContent.groups.find(({ group: candidate }) => candidate.definition.id === groupId);
    const candidatesByQuestionId = new Map((loaded?.candidates ?? []).map((candidate) => [candidate.questionId, candidate]));
    const ledgerPath = resolve(process.cwd(), `docs/challenges/${groupId}-question-review.tsv`);

    expect(existsSync(ledgerPath)).toBe(true);
    if (!existsSync(ledgerPath)) return;
    expect(loaded?.status).toBe('ready');
    expect(loaded?.candidates).toHaveLength(90);
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      expect(loaded?.candidates.filter((candidate) => candidate.difficulty === difficulty)).toHaveLength(30);
    }
    expect(group?.questionIds).toHaveLength(90);
    const rows = readTsv(ledgerPath);
    expect(rows.map(({ 题目ID }) => 题目ID)).toHaveLength(90);
    expect(new Set(rows.map(({ 题目ID }) => 题目ID))).toEqual(new Set(group?.questionIds));
    expect(rows.every(({ 审核状态 }) => 审核状态.includes('作者自审通过') && 审核状态.includes('未独立教育者复核'))).toBe(true);

    for (const row of rows) {
      const candidate = candidatesByQuestionId.get(row['题目ID']);
      expect(candidate, row['题目ID']).toBeDefined();
      expect(row['正确选项'], row['题目ID']).toBe(expectedAnswerSummary(candidate!.activity));
      expect(row['知识点'], row['题目ID']).not.toBe('');
      expect(candidate!.knowledgePointIds.length, row['题目ID']).toBeGreaterThan(0);
      expect(derivePilotQuestionKnowledgePointIds(unitId, candidate!.activity), row['题目ID'])
        .toEqual(candidate!.knowledgePointIds);
    }

    const courseRow = readTsv(resolve(process.cwd(), 'docs/curriculum/grade-1-and-3-question-review.tsv'))
      .find((row) => row['课程ID'] === unitId);
    expect(courseRow).toMatchObject({ 题目总数: '48', 已审数量: '48', 状态: '完成' });
  });
});
