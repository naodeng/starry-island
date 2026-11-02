import { describe, expect, it } from 'vitest';
// @ts-expect-error Node.js is used only to verify the unit-scoped review ledger.
import { existsSync, readFileSync } from 'node:fs';
// @ts-expect-error Node.js is used only to resolve the unit-scoped review ledger.
import { resolve } from 'node:path';
import type { ActivityDefinition } from '../../content/types';
import { loadUnit } from '../../content/unitLoader';
import {
  grade2Term2ChineseUnit08CoreKnowledgePointIds,
  grade2Term2ChineseUnit08SupplementalActivities,
} from './grade2Term2ChineseUnit08SupplementalActivities';
import unit08Manifest from './pilot-manifest-grade2-term2-chinese-unit08.json';
import { fingerprintActivity } from './fingerprint';
import { parseChallengeManifest } from './manifestSchema';
import { validateChallengeManifest } from './validateManifest';

declare const process: { cwd(): string };

const unitId = 'grade-2/term-2/chinese/unit-08';
const groupId = 'grade-2-term-2-chinese-unit-08';
const coreKnowledgePointIdSet = new Set<string>(grade2Term2ChineseUnit08CoreKnowledgePointIds);
const expectedAnswers = {
  basic: [
    '先找出写到的地点和景物，再根据线索补充画面',
    '这是作者的想象表达，不等于月亮真的会说话',
    '查阅科普资料并说明来源，不只依据神话情节',
    '先交代困难，再讲行动，最后说结果',
    '回看人物遇到的困难和后来的结果',
    '保留主要事情，用自己的话讲，不把个人感受说成情节',
    '先想人物和故事发生的自然环境',
    '把想象画面注明是故事创作',
    '先看故事中行动的线索，再用自己的话描述',
    '把人物遇到的困难和行动按先后写清楚',
    '把未确认的内容标成待查，不先说成历史事实',
    '让人物遇到的困难能引出行动，结尾回应这个困难',
    '找出事件发生先后，再联系困难与行动',
    '依据文本中的自然景物补充想象，不把补充内容说成已证事实',
  ],
  advanced: [
    '把资料能支持的内容和自己想象的部分分开说明',
    '回到故事核对事件，保留有依据的内容并标明补充想象',
    '按困难出现、人物行动、结果变化整理',
    '标明神话画面属于故事；自然问题另查科普资料',
    '补上促使人物行动的困难线索，再检查结尾是否回应',
    '保留文字写到的景物，把额外添加的部分标成想象',
    '查找可靠历史或博物馆资料，不只凭故事判断',
    '先交代人物和背景，再说困难、行动和结果',
    '选择能在资料或说明牌中找到出处的内容，并标出来源',
    '回看行动前后的情节，说明结果怎样回应人物遇到的困难',
    '补上行动发生前的原因线索，再让结果接上后续情节',
    '把文字线索、补充的想象和实际生活资料分别标明',
    '不把一个故事的生活画面说成所有古人都一样，继续查找资料',
    '按课文讲清事件，再另用“我觉得”表达个人感受',
  ],
  high: [
    '先标注神话内容，再分开写可查资料和自己的想象',
    '安排人物、自然环境、困难、行动和结果，再检查前后是否连贯',
    '请伙伴指出不清楚的地方，调整情节连接后再请人试读',
    '先按故事线索列出人物和困难，再依事件顺序复述行动与结果',
    '把景物想象标成创作，并另外说明哪些内容来自资料',
    '每条古代生活信息都标清故事线索或可查资料的出处',
    '欣赏神话的想象画面，另用科普资料说明自然现象',
    '补上连接两个事件的线索，再按前后顺序试读',
    '说明人物遇到的困难和故事中的行动，不把神话当成科学证明',
    '按故事事件顺序介绍，再将个人感受放在单独一栏',
    '把实际记录、课文情节和自己的联想用不同标记区分',
    '创作人物遇到困难后的行动，并让结尾回应开头的问题',
    '分别标明故事出处和资料来源，不把两类内容混写',
    '先确定主题和资料，再设计情节、检查顺序并请伙伴试读',
  ],
} as const;

function expectedAnswer(activity: ActivityDefinition): string {
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
    case 'arithmetic': return String(activity.correctAnswer);
    case 'measurement': return String(activity.targetLengthCm);
  }
}

function readTsv(path: string): Array<Record<string, string>> {
  const lines = (readFileSync(path, 'utf8') as string).trim().split(/\r?\n/u);
  const [headerLine = '', ...dataLines] = lines;
  const headers = headerLine.replace(/^\uFEFF/u, '').split('\t');
  return dataLines.map((line: string) => Object.fromEntries(headers.map((header: string, index: number) => [header, line.split('\t')[index] ?? ''])));
}

describe('二年级下册语文第八单元闯关内容', () => {
  it('源课覆盖三个登记主题，并保留 48 道兼容活动', async () => {
    const unit = await loadUnit(unitId);
    const activities = Object.values(unit!.difficultyTracks).flatMap((track) => track.tasks)
      .flatMap((task) => task.sessions.flatMap((session) => session.activities));

    expect(unit?.sourceTopics).toEqual([
      '《祖先的摇篮》：借助想象感受远古生活主题并体会自然环境',
      '《当世界年纪还小的时候》：欣赏想象表达并区分故事与事实',
      '《羿射九日》：认识神话中的人物、困难和解决过程',
    ]);
    expect(activities).toHaveLength(48);
    expect(Object.fromEntries(['choice', 'match', 'order', 'categorize'].map((kind) => [
      kind,
      activities.filter((activity) => activity.kind === kind).length,
    ]))).toEqual({ choice: 18, match: 12, order: 9, categorize: 9 });
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      expect(unit?.difficultyTracks[difficulty].tasks).toHaveLength(2);
      expect(unit?.difficultyTracks[difficulty].tasks.flatMap((task) => task.sessions)
        .flatMap((session) => session.activities)).toHaveLength(16);
    }
  });

  it('每档补 14 道原创题，覆盖全部核心知识点并保留唯一答案', () => {
    expect(grade2Term2ChineseUnit08SupplementalActivities).toHaveLength(42);
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const authored = grade2Term2ChineseUnit08SupplementalActivities.filter((candidate) => candidate.difficulty === difficulty);
      expect(authored).toHaveLength(14);
      expect(authored.map(({ activity }) => expectedAnswer(activity))).toEqual(expectedAnswers[difficulty]);
      expect(new Set(authored.flatMap(({ knowledgePointIds }) => knowledgePointIds)))
        .toEqual(new Set(grade2Term2ChineseUnit08CoreKnowledgePointIds));
      authored.forEach(({ activity, knowledgePointIds }, index) => {
        expect(activity.kind, `${difficulty} 第 ${index + 1} 题`).toBe('choice');
        expect(new Set(activity.options.map(({ label }) => label)).size, `${difficulty} 第 ${index + 1} 题选项`).toBe(3);
        expect(knowledgePointIds.every((id) => coreKnowledgePointIdSet.has(id))).toBe(true);
        expect(activity.hint.length, `${difficulty} 第 ${index + 1} 题提示`).toBeGreaterThan(0);
        expect(activity.explanation.length, `${difficulty} 第 ${index + 1} 题讲解`).toBeGreaterThan(0);
        expect(`${activity.prompt} ${activity.hint}`, `${difficulty} 第 ${index + 1} 题提示泄漏`)
          .not.toContain(expectedAnswer(activity));
      });
    }
    expect(new Set(grade2Term2ChineseUnit08SupplementalActivities.map(({ activity }) => activity.prompt)).size).toBe(42);
  });

  it('清单记录全组 90 道候选、五个任务和完整审核指纹', async () => {
    const unit = await loadUnit(unitId);
    const sourceActivities = Object.values(unit!.difficultyTracks).flatMap((track) => track.tasks)
      .flatMap((task) => task.sessions.flatMap((session) => session.activities));
    const allActivities = [...sourceActivities, ...grade2Term2ChineseUnit08SupplementalActivities.map(({ activity }) => activity)];
    const questions = unit08Manifest.questions;
    const group = unit08Manifest.groups.find(({ definition }) => definition.id === groupId);
    const ledgerPath = resolve(process.cwd(), `docs/challenges/${groupId}-question-review.tsv`);

    expect(group?.releaseIntent).toBe('released');
    expect(group?.definition).toMatchObject({
      id: groupId,
      kind: 'unit',
      grade: 2,
      semester: 2,
      subject: 'chinese',
      sourceUnitIds: [unitId],
      learningTaskUnitIds: [unitId],
      coreKnowledgePointIds: grade2Term2ChineseUnit08CoreKnowledgePointIds,
    });
    expect(group?.definition.tasks).toHaveLength(5);
    expect(group?.definition.tasks.map(({ targetCount }) => targetCount)).toEqual([15, 15, 15, 15, 15]);
    expect(questions).toHaveLength(90);
    expect(group?.questionIds).toHaveLength(90);
    expect(new Set(group?.questionIds)).toEqual(new Set(allActivities.map(({ id }) => `challenge-question:${id}`)));
    expect(new Set(questions.map(({ approvedContentFingerprint }) => approvedContentFingerprint))).toHaveLength(90);
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const tierQuestions = questions.filter((question) => question.difficulty === difficulty);
      expect(tierQuestions).toHaveLength(30);
      expect(new Set(tierQuestions.flatMap(({ knowledgePointIds }) => knowledgePointIds)))
        .toEqual(new Set(grade2Term2ChineseUnit08CoreKnowledgePointIds));
      expect(tierQuestions.every(({ knowledgePointIds }) => knowledgePointIds.every((id) => coreKnowledgePointIdSet.has(id)))).toBe(true);
    }

    const parsedManifest = parseChallengeManifest(unit08Manifest);
    const activitiesById = new Map(allActivities.map((activity) => [activity.id, activity]));
    const sourceUnitByActivityId = new Map(allActivities.map((activity) => [activity.id, unitId] as const));
    const report = await validateChallengeManifest(parsedManifest, activitiesById, sourceUnitByActivityId, new Map([[unitId, unit!]]));
    expect(report.errors).toEqual([]);
    expect(report.contentChanges).toEqual([]);
    expect(report.questionUniqueness.exactDuplicateGroups).toEqual([]);
    expect(report.groupStatusById[groupId]).toBe('ready');

    expect(existsSync(ledgerPath)).toBe(true);
    if (!existsSync(ledgerPath)) return;
    const rows = readTsv(ledgerPath);
    const rowsById = new Map(rows.map((row) => [row['题目ID'], row]));
    expect(rows).toHaveLength(90);
    expect(new Set(rowsById.keys())).toEqual(new Set(group?.questionIds));
    expect(rows.every(({ 审核状态 }) => 审核状态.includes('作者逐题自审通过') && 审核状态.includes('未独立教育者复核'))).toBe(true);
    expect(rows.every(({ 复核说明, 检查项 }) => Boolean(复核说明) && Boolean(检查项))).toBe(true);

    for (const question of questions) {
      const activity = activitiesById.get(question.activityId);
      const row = rowsById.get(question.questionId);
      expect(activity, question.activityId).toBeDefined();
      expect(row, question.questionId).toBeDefined();
      expect(question.lifecycle, question.questionId).toBe('active');
      expect(question.approved, question.questionId).toBe(true);
      expect(question.answerLeakageReviewed, question.questionId).toBe(true);
      expect(question.approvedBy, question.questionId).toBe('Codex content-author self-review');
      expect(question.approvedAt, question.questionId).toBe('2026-10-28T00:00:00.000Z');
      expect(question.approvedContentFingerprint, question.questionId).toMatch(/^[0-9a-f]{64}$/u);
      expect(row!['正确选项'], question.questionId).toBe(expectedAnswer(activity!));
      expect(row!['知识点'], question.questionId).toBe(question.knowledgePointIds.join('；'));
      expect(row!['内容指纹'], question.questionId).toBe(question.approvedContentFingerprint);
      expect(await fingerprintActivity(activity!), question.questionId).toBe(question.approvedContentFingerprint);
    }
  });
});
