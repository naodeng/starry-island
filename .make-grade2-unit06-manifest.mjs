import { writeFileSync } from 'node:fs';
import { createServer } from 'vite';
const server = await createServer({ root: process.cwd(), server: { middlewareMode: true, hmr: false, ws: false }, appType: 'custom' });
try {
  const [{ unit }, { derivePilotQuestionKnowledgePointIds }, { fingerprintActivity }, { grade2Term1MathUnit06SupplementalActivities }] = await Promise.all([
    server.ssrLoadModule('/src/content/grade-2/term-1/math/unit-06/index.ts'),
    server.ssrLoadModule('/src/challenges/content/pilotQuestionKnowledgePoints.ts'),
    server.ssrLoadModule('/src/challenges/content/fingerprint.ts'),
    server.ssrLoadModule('/src/challenges/content/grade2Term1MathUnit06SupplementalActivities.ts'),
  ]);
  const unitId = 'grade-2/term-1/math/unit-06';
  const groupId = 'grade-2-term-1-math-unit-06';
  const activities = [];
  for (const difficulty of ['basic', 'advanced', 'high']) {
    for (const task of unit.difficultyTracks[difficulty].tasks) {
      for (const session of task.sessions) {
        for (const activity of session.activities) activities.push({ activity, difficulty, knowledgePointIds: derivePilotQuestionKnowledgePointIds(unitId, activity) });
      }
    }
  }
  for (const item of grade2Term1MathUnit06SupplementalActivities) activities.push({ activity: item.activity, difficulty: item.difficulty, knowledgePointIds: item.knowledgePointIds });
  if (activities.length !== 90) throw new Error(`expected 90 candidates, got ${activities.length}`);
  const questions = await Promise.all(activities.map(async ({ activity, difficulty, knowledgePointIds }) => ({
    questionId: `challenge-question:${activity.id}`, activityId: activity.id, difficulty, knowledgePointIds,
    lifecycle: 'active', approved: true, answerLeakageReviewed: true,
    approvedContentFingerprint: await fingerprintActivity(activity),
    approvedBy: 'Codex content-author self-review', approvedAt: '2026-10-27T00:00:00.000Z',
  })));
  const required = {
    'basic-01': ['multiplication-facts'], 'basic-02': ['equal-groups-multiplication'],
    'advanced-01': ['multiplication-facts'], 'advanced-02': ['equal-groups-multiplication'],
    'high-01': ['equal-groups-multiplication', 'multiplication-facts'],
  };
  const tasks = Object.entries(required).map(([taskId, requiredKnowledgePointIds]) => ({
    id: `${groupId}/${taskId}`, difficulty: taskId.startsWith('basic') ? 'basic' : taskId.startsWith('advanced') ? 'advanced' : 'high', targetCount: 15, requiredKnowledgePointIds,
  }));
  const manifest = {
    version: 'pilot-2026-10-27.1', questions,
    groups: [{ releaseIntent: 'released', definition: {
      id: groupId, kind: 'unit', grade: 2, semester: 1, subject: 'math', sourceUnitIds: [unitId], learningTaskUnitIds: [unitId],
      coreKnowledgePointIds: ['equal-groups-multiplication', 'multiplication-facts'],
      mappingEvidence: {
        source: 'docs/curriculum/grade-2-textbook-inventory.md#二年级上册数学；docs/curriculum/grade-2-question-review.tsv；src/content/grade-2/term-1/math/unit-06/index.ts',
        checkedAt: '2026-10-27',
        notes: '对应7、8、9的乘法口诀及相同数量分组的简单应用。教材目录使用项目裁定的 TapXWorld 固定回退快照（tapx-fallback），不表示采用人教社修订版。保留48道兼容原课程活动，另新增42道原创选择题，使每档各有30道候选；原课程活动、六个学习任务、学习进度和交互均不变。',
      }, tasks,
    }, questionIds: questions.map(({ questionId }) => questionId) }],
  };
  writeFileSync('src/challenges/content/pilot-manifest-grade2-term1-math-unit06.json', `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(`wrote ${questions.length} candidates; source=${activities.filter(({ activity }) => activity.id.includes('/unit-06/')).length}, supplemental=${grade2Term1MathUnit06SupplementalActivities.length}`);
} finally { await server.close(); }
