# 闯关系统 MVP 实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**目标：** 交付一条可验证的闯关 MVP 纵向切片：一个正式单元组和一个学期阶段组（各含 2 个 basic、2 个 advanced、1 个 high 任务）通过内容门禁，可确定性组卷、首答计分、可靠保存、恢复作答并查看结果。

**架构建议：** 闯关域逻辑、闯关内容登记、本地持久化和闯关 UI 独立于现有学习流程。拟用纯 TypeScript 函数负责组卷与计分、浏览器 IndexedDB 提交闯关记录；这是待评审的工程实现建议，不是新增产品决策。UI 复用现有题型控件，但不复用含提示、重试的学习反馈编排。

**技术栈：** React 19、TypeScript、Vite 8、Vitest、Playwright Chromium、浏览器 IndexedDB；不增加运行时依赖。IndexedDB 单元测试可增加仅开发依赖 [fake-indexeddb](https://github.com/dumbmatter/fakeIndexedDB)（Apache-2.0，执行时核对锁定版本与许可）。

**规格：** [闯关 PRD](../../challenges/PRD.md)、[架构设计](../../challenges/ARCHITECTURE.md)、[数据模型](../../challenges/DATA_MODEL.md)、[测试方案](../../challenges/TEST_STRATEGY.md)、[仓库基线](../../challenges/REPOSITORY_BASELINE.md)。

## 全局约束

- 只实现 MVP 纵向切片；不把一个试点描述成 36 组课程或 540 项学期任务已覆盖。
- REQ-001～REQ-085 是产品决策来源；REQ-080 保留修改后的 `approved` 状态，内容指纹仍用于变更追踪和质量检查。
- 产品已确认的架构原则是 Local First 与静态部署；本计划建议把闯关数据放入 IndexedDB，不迁移或覆盖 `china-study-progress-v1`；既有学习 Task、答题反馈、声音和进度规则保持原样。
- 闯关路由和题目清单按需加载；不得从应用入口静态导入整个课程题库，避免增加首屏 JavaScript。
- 构建审计需分别记录最大单一 JS chunk 与首屏 JS 压缩总量。当前 500 KB 单 chunk 告警已由 manifest 分块消除，但初始 JS 传输量未实质下降；本 MVP 只防止挑战代码增加首屏负担，不宣称完成首屏性能优化。若要继续降低初始传输量，另立拆分课程索引/进度元数据的架构任务。
- `src/app/router.ts` 只解析 `/challenges` 路径结构，不导入挑战 manifest；任务/组 ID 与 readiness 在懒加载挑战页面中校验，避免路由模块把挑战清单带入初始 JS。
- 首版只使用在闯关情境下通过“无提示/无答案泄露”检查的题型；现有测量题绘制了与正确答案等比例的图形，未增加独立安全呈现并通过审查前不得登记进闯关清单。
- 持续使用 Local First、静态部署及现有 React/Vite 技术栈；不增加后端、账号或在线出题服务。
- 学期阶段按用户在实施阶段确认的教材章节顺序尽可能等分；数学上册 9 个正式单元据此划为 first-half=01–04、second-half=05–09。该映射是项目计划决策，不代表已核实的学校授课日历。
- 组卷只使用 Active、已登记审核、唯一且兼容的题目；题池必须至少为目标题量的 2 倍，知识覆盖不满足时明确失败，不静默放宽。
- 闯关不显示提示、不提供重试；每题首次提交即锁定。离开或刷新后恢复同一份题目快照、顺序和锁定答案。
- 未收到 IndexedDB 成功确认前，不显示答案已保存；写入失败时暂停后续提交并提供重试或退出恢复路径。
- 按 TDD 执行；课程阶段映射、教学内容质量与仓库实现事实必须分别记录证据。

## Review Focus

- 学期阶段题目被错映到教学范围：阶段映射必须有教材目录或已核实课程顺序依据，未核实的阶段不得标记为可用；由 Task 1 的清单门禁测试覆盖。
- 内容变更指纹导致 REQ-080 的审核状态被自动撤销：测试必须证明审核状态保留，同时结构、答案和覆盖质量门禁仍运行；由 Task 1/4 覆盖。
- 两个标签页使用旧 revision 或 IndexedDB 写入失败：拒绝覆盖、暂停下一题并保留已确认状态；由 Task 5/6/7 的 repository 与浏览器恢复测试覆盖。
- 闯关页面被静态导入导致初始 JS 变大：中心和题目内容必须按需加载，比较初始 JS 压缩体积及最大 chunk；由 Task 6/7 的构建审计覆盖。
- 闯关 UI 意外暴露提示/答案或改变学习播放器：使用独立反馈编排，并验证既有学习 Task、提示、重试和进度；由 Task 6/7 的组件与回归测试覆盖。

---

## 文件结构与职责

以下为计划新增的实现路径；实际执行前仍需在目标分支复核文件状态。现有学习文件保持原有职责，不改写成闯关通用层。

| 路径 | 职责 |
|---|---|
| `src/challenges/domain/types.ts` | 闯关任务、候选题、答题值、试卷快照、作答、结果和任务进度的严格类型 |
| `src/challenges/domain/grading.ts` | 首答正确性、通过线、星级与整数边界计算 |
| `src/challenges/domain/assemble.ts` | 以种子生成满足题量、去重和知识覆盖约束的题单 |
| `src/challenges/domain/attempt.ts` | 无提示、无重试的答题状态机与完成结果 |
| `src/challenges/domain/progress.ts` | 每组五任务通过状态与徽章单调计算 |
| `src/challenges/domain/progress.test.ts` | 组进度与徽章边界测试 |
| `src/challenges/content/pilot-manifest.json` | MVP 两个完整试点组、题目引用、知识点映射、状态与审核登记 |
| `src/challenges/content/pilotSupplementalActivities.ts` | 不适合修改现有学习 Task 来扩充题池时，保存闯关专用原创题；按需加载，不改变学习课程数据 |
| `src/challenges/content/fingerprint.ts` | 对题目规范化内容计算稳定 SHA-256 指纹 |
| `src/challenges/content/validateManifest.ts` | 校验清单引用、题池规模、唯一性、审核状态和覆盖声明 |
| `src/challenges/content/pilotQuestionKnowledgePoints.ts` | 根据试点题目内容映射知识点 |
| `src/challenges/content/pilotQuestionKnowledgePoints.test.ts` | 验证试点知识点映射边界 |
| `src/challenges/content/lookup.ts` | 从课程 unit key 查找已登记的单元挑战组 |
| `src/challenges/content/lookup.test.ts` | 试点单元映射与非试点单元无入口测试 |
| `src/challenges/storage/repository.ts` | 闯关存储接口与 revision 冲突错误 |
| `src/challenges/storage/indexedDbRepository.ts` | IndexedDB 数据库、schema v1、原子保存与迁移入口 |
| `src/challenges/storage/indexedDbRepository.test.ts` | 基于 `fake-indexeddb` 的 schema、原子提交和 revision 单元测试 |
| `src/challenges/ui/ChallengeCenter.tsx` | 已发布试点任务卡片和进度入口 |
| `src/challenges/ui/ChallengeRunner.tsx` | 闯关页面、恢复、提交、保存失败和离开流程 |
| `src/challenges/ui/ChallengeActivityRenderer.tsx` | 复用已通过闯关泄露检查的现有题型控件，编排首答锁定且不展示提示或重试 |
| `src/challenges/ui/ChallengeResult.tsx` | 完成后的得分、星级、错题与讲解回顾 |
| `src/challenges/ui/challenge.css` | 兼容既有主题、窄屏、焦点和 reduced-motion 的闯关样式 |
| `src/app/router.ts` | 增加闯关中心和任务路由，不改变学习路径解析 |
| `src/app/router.test.ts` | 挑战中心、组、任务路径与既有学习 URL 回归 |
| `src/App.tsx` | 懒加载并挂载闯关页面，保持现有学习分支不变 |
| `src/App.test.tsx` | 挑战路径挂载和原学习路径分支回归 |
| `src/components/catalog/CourseCatalog.tsx` | 提供首页闯关中心入口 |
| `src/components/catalog/UnitOverview.tsx` | 试点单元提供进入对应闯关组的上下文入口 |
| `src/challenges/**/*.test.ts(x)` | 闯关领域、清单、存储和组件单元测试 |
| `src/components/catalog/CourseCatalog.test.tsx`、`UnitOverview.test.tsx` | 首页和单元上下文入口回归测试 |
| `tests/e2e/challenge-flow.spec.ts` | 闯关开始、保存、刷新恢复、完成和学习回归浏览器流程 |
| `docs/challenges/pilot-content-audit.md` | 试点选择、题量、阶段映射、审核和内容缺口证据 |
| `docs/challenges/REQUIREMENTS_TRACEABILITY.md` | 补充实际代码路径、测试路径和证据状态 |

## 接口契约

高阶整合约束落在整份已组装的高阶任务上：任务必须覆盖至少两个核心知识点；单题只登记实际涉及的知识点，不为满足门槛虚构逐题整合标记。SHA-256 指纹、IndexedDB 与测试专用 fake-indexeddb 同样属于本计划建议的实现手段，不构成新的产品决策。

```ts
import type { ActivityDefinition, Difficulty, SubjectId } from '../../content/types';

// src/challenges/domain/types.ts
export type ChallengeAnswer = string | number | string[] | Record<string, string>;

export interface ChallengeQuestionRecord {
  questionId: string;
  activityId: string; // 当前课程 ActivityDefinition.id；MVP 将其登记为稳定来源引用
  difficulty: Difficulty;
  knowledgePointIds: string[];
  lifecycle: 'active' | 'disabled' | 'deprecated';
  approved: boolean;
  answerLeakageReviewed: boolean;
  approvedContentFingerprint: string;
  approvedAt?: string;
}

export interface ChallengeQuestionSnapshot extends ChallengeQuestionRecord {
  activity: ActivityDefinition;
  contentFingerprint: string; // 当前内容的 SHA-256；与审核时指纹不同也不自动撤销 approved
}

export interface ChallengeTaskDefinition {
  id: string;
  difficulty: Difficulty;
  targetCount: number;
  requiredKnowledgePointIds: string[];
}

export interface ChallengeGroupDefinition {
  id: string;
  kind: 'unit' | 'semester';
  grade: number;
  semester: 1 | 2;
  subject: SubjectId;
  sourceUnitIds: string[];
  stage?: 'first-half' | 'second-half' | 'end-term';
  coreKnowledgePointIds: string[];
  mappingEvidence: { source: string; checkedAt: string; notes: string };
  tasks: [ChallengeTaskDefinition, ChallengeTaskDefinition, ChallengeTaskDefinition, ChallengeTaskDefinition, ChallengeTaskDefinition];
}

export interface ChallengeManifest {
  version: string;
  questions: ChallengeQuestionRecord[];
  groups: ChallengeGroupManifest[];
}

export interface ChallengeGroupManifest {
  definition: ChallengeGroupDefinition;
  questionIds: string[];
  releaseIntent: 'released' | 'planned' | 'suspended';
  unavailableReason?: string;
}

export interface ContentFingerprintChange {
  questionId: string;
  approvedContentFingerprint: string;
  currentContentFingerprint: string;
}

export type ChallengeReleaseStatus = 'ready' | 'planned' | 'unavailable';

export interface ValidationIssue {
  code: string;
  path: string;
  message: string;
  groupId?: string;
}

export interface PilotManifestValidationReport {
  errors: ValidationIssue[];
  contentChanges: ContentFingerprintChange[];
  groupStatusById: Record<string, ChallengeReleaseStatus>;
}

export interface ChallengeAttempt {
  attemptId: string;
  taskId: string;
  difficulty: Difficulty;
  status: 'in-progress' | 'completed';
  questions: ChallengeQuestionSnapshot[]; // 已冻结内容和顺序
  assemblySeed: string;
  contentManifestVersion: string;
  answers: Record<string, ChallengeAnswer>; // 首答已确认答案
  currentIndex: number;
  startedAt: string;
  elapsedMs: number;
  revision: number;
}

export interface ChallengeResult {
  correctCount: number;
  totalCount: number;
  scorePercent: number;
  passed: boolean;
  stars: 0 | 1 | 2 | 3;
  elapsedMs: number;
}

export interface TaskProgress {
  taskId: string;
  bestCorrect: number;
  bestTotal: number;
  latestCorrect: number;
  latestTotal: number;
  completedCount: number;
  everPassed: boolean;
  updatedAt: string;
  revision: number;
}

export interface CompletionUpdate {
  completedAttempt: ChallengeAttempt;
  result: ChallengeResult;
  progress: TaskProgress;
}
```

- `gradeAttempt(difficulty, correctCount, totalCount, elapsedMs = 0): ChallengeResult`：空题卷、非整数、负数或超出总题数的计数抛出 `RangeError`；分数百分比四舍五入为整数展示；通过线与星级按正确题数和 `ceil(totalCount * threshold)` 比较；保留经过时间但不设限时规则。
- `fingerprintActivity(activity, subtleCrypto = crypto.subtle): Promise<string>`：递归按 key 排序对象属性、保留数组顺序后序列化，用 Web Crypto SHA-256 输出小写十六进制；题目快照记录当前指纹，审核时指纹单独保存在 manifest。
- `assemblePaper(task, candidates: readonly ChallengeQuestionSnapshot[], seed, recentQuestionIds): ChallengeQuestionSnapshot[]`：候选按清单审核状态与题目难度先过滤；硬性题池不足、任务知识点不可满足或组卷失败抛出具名 `AssemblyError`，不降低门槛。
- `submitFirstAnswer(attempt, questionId, answer): { attempt: ChallengeAttempt; correct: boolean }`：已提交题目拒绝再次答题；答案用 `src/learning/answers.ts` 的纯校验规则判定，不修改现有学习交互。
- `finalizeAttempt(attempt, progress, completedAt): CompletionUpdate`：只有所有题都已有首次答案时才成功；返回 `status: 'completed'` 的 `completedAttempt`、结果和更新进度；`completedAttempt.revision` 保持最后一题已确认保存后的 revision，因为完成事务只比较该 revision 后写入进度并删除活动快照，不再保存已完成 attempt。
- `deriveGroupProgress(group, taskProgress): { passedCount: number; badgeEarned: boolean }`：仅当该组登记的五个任务全部 `everPassed` 时点亮徽章，后续较低成绩不撤销。
- `ChallengeRepository`：以 `taskId` 为单一活动快照主键，`getActiveAttempt(taskId): Promise<ChallengeAttempt | null>`、`getRecentQuestionIds(): Promise<string[]>`、`beginAttempt(attempt): Promise<void>`、`saveAnswer(taskId, expectedRevision, nextAttempt): Promise<ChallengeAttempt>`、`completeAttempt(taskId, expectedRevision, completedAttempt, progress): Promise<void>`、`discardAttempt(taskId, expectedRevision): Promise<void>`；`saveAnswer` 仅接受 revision 加一且只新增当前题的一次答案。完成调用必须携带 `status: 'completed'` 且 `revision === expectedRevision` 的完整快照；事务核对数据库中的活动快照仍为该 revision 的 `in-progress` 记录、attempt/task 身份一致及答案完整，再原子更新 task progress、最近三次完成 attempt 的 question ID 集合并删除活动快照。冲突抛 `RevisionConflictError`，失败拒绝并保留原记录。
- `ChallengeRepository` 另提供 `getTaskProgress(taskId): Promise<TaskProgress | null>` 与 `getGroupProgress(taskIds): Promise<TaskProgress[]>`；以便中心页计算任务卡、组进度和徽章。
- `createChallengeRepository(options?: { factory?: IDBFactory; databaseName?: string }): ChallengeRepository`：默认使用全局 `indexedDB` 和 `starry-island-challenges`；测试传入 fake factory 与独立数据库名。`close(): void` 关闭连接并用于清理测试。
- `getUnitChallengeGroup(unitKey, manifest): ChallengeGroupManifest | undefined`：只匹配 `kind === 'unit'` 且单元 key 完全一致的已登记组。
- `getChallengeGroupPath(groupId): string` 与 `getChallengeTaskPath(taskId): string`：分别生成 `/challenges/group/${encodeURIComponent(groupId)}`、`/challenges/task/${encodeURIComponent(taskId)}`。
- `TaskProgress` 保存 `bestCorrect`、`bestTotal`、`latestCorrect`、`latestTotal`、`completedCount`、`everPassed`、`updatedAt`、`revision`；不保存完整作答历史。完成事务写入进度并删除进行中快照，答案级结果 review 仅在完成后的当前页面会话内存中；离开或刷新后不恢复历史 review，重新进入只显示已保存的进度摘要。该行为需在 E2E 中明确验证，避免误把即时结果页描述为可持久回看。

## 实施任务

### Task 1：建立试点题池与发布清单质量门

**文件：**

- 新建：`src/challenges/domain/types.ts`（定义一次，包含本节全部类型）
- 新建：`src/challenges/content/pilot-manifest.json`
- 新建：`src/challenges/content/pilotSupplementalActivities.ts`（仅在现有候选池不足时使用；不改变学习 Task）
- 新建：`src/challenges/content/fingerprint.ts`
- 新建：`src/challenges/content/fingerprint.test.ts`
- 新建：`src/challenges/content/lookup.ts`
- 新建：`src/challenges/content/lookup.test.ts`
- 新建：`src/challenges/content/validateManifest.ts`
- 新建：`src/challenges/content/validateManifest.test.ts`
- 新建：`docs/challenges/pilot-content-audit.md`

**接口：**

- 消费：`src/content/types.ts` 的 `ActivityDefinition`、`CurriculumUnit`、`Difficulty`、`SubjectId`。
- 产出：manifest 为一个全局题目 registry 加两个 group 定义；group 每组必须含 2 basic、2 advanced、1 high。`validatePilotManifest(manifest, activitiesById: ReadonlyMap<string, ActivityDefinition>, sourceUnitByActivityId: ReadonlyMap<string, string>, unitsById: ReadonlyMap<string, CurriculumUnit>): Promise<PilotManifestValidationReport>` 返回稳定错误、内容变更与组 readiness；`fingerprintActivity(activity, subtleCrypto?): Promise<string>` 用于快照和内容差异报告。

- [x] **Step 1：写失败测试**：覆盖规范化 JSON 的 key 顺序与数组顺序、题目/答案变化会改变 SHA-256；重复 `questionId`/`activityId`/内容指纹、不存在的 `activity.id`、未知/非正式单元引用、禁用/未审核/未通过答案泄露审查的题及当前未支持安全呈现的测量题、正式单元与学期阶段引用范围、不是恰好一个 unit group 与一个 semester group、每组不是 2/2/1 难度结构、basic/advanced 成对覆盖不全、高阶任务要求知识点少于两个、单元任务不是 15 题/学期任务不是 25 题、任一难度候选量低于同难度最大目标题量的 2×、阶段证据缺失、release status 计算，以及审核后内容指纹变化进入 `contentChanges` 但仍保留 `approved`。
- [x] **Step 2：运行目标测试确认失败**：`npm run test:unit -- src/challenges/content`；预期新模块缺失或断言失败。
- [x] **Step 3：审计现有候选并选定试点**：试点单元选择 Grade 2 Term 1 Math Unit 2（100 以内的加法和减法（二）），目录顺序来自已核对清单；学期 first-half 按用户确认的等分规则覆盖正式单元 01–04。每组配置 2 basic、2 advanced、1 high 任务。登记逐题题型、知识点、内容审核、答案泄露审查、重复情况和审核时 SHA-256 指纹；知识点标签必须对应单题实际内容，basic/advanced 两题目标知识点联合覆盖全部 core 知识点，高阶任务组卷后覆盖至少两个知识点。每组按 difficulty 共享候选池：单元 basic/advanced/high 各至少 30 个唯一候选；学期 basic/advanced/high 各至少 50 个唯一候选；跨任务复用仅在课程映射与知识点均成立时允许。现有课程 Task 不得为闯关池扩容而被改写；不足时将原创候选放入 `pilotSupplementalActivities.ts` 并逐题审核，不得先把 group 标记为 ready。
- [x] **Step 4：实现严格清单校验**：实现 `validatePilotManifest()`；使用 `unitsById` 验证正式单元资格及 group 来源范围；错误组不得显示为 ready；`releaseIntent` 为 planned 时状态为 planned，为 suspended 时状态为 unavailable，released 仅在所有硬门通过时映射为 ready。
- [x] **Step 5：运行清单测试并校验完整试点数据**：目标测试通过；清单测试对正式 `curriculum` 检查两个完整试点组共十个任务的全部引用与硬门；`pilot-content-audit.md` 与数据清单的计数相符。
- [x] **Step 6：运行课程回归测试**：`npm run test:unit -- src/content`；预期现有课程题目、答案与目录测试通过。

**交付门：** 若找不到具备可核实阶段映射且满足 2× 候选要求的组合，完成审计报告并暂停后续 UI/发布实现，提交缺口事实供产品裁定；不合成阶段、不削弱池门槛。

### Task 2：实现通过线、首答判分与星级计算

**文件：**

- 新建：`src/challenges/domain/grading.ts`
- 新建：`src/challenges/domain/grading.test.ts`

**接口：**

- 消费：Task 1 的 `Difficulty`、`ChallengeResult`。
- 产出：`gradeAttempt(difficulty, correctCount, totalCount, elapsedMs = 0): ChallengeResult`。

- [x] **Step 1：写失败测试**：校验 basic/advanced/high 通过线分别为 70/80/85%，边界使用 `ceil`；星级边界为 70/85/95、80/90/100、85/95/100%；验证百分比显示、elapsed 记录、零题、elapsed 非有限/负数、分数非整数、负数和正确数大于总题数。
- [x] **Step 2：运行目标测试确认失败**：`npm run test:unit -- src/challenges/domain/grading.test.ts`；预期函数未定义或测试失败。
- [x] **Step 3：实现 `gradeAttempt()`**：比较整数正确数阈值；分数仅用于结果展示，采用 `Math.round(correctCount / totalCount * 100)`；验证 elapsed 为有限且非负数。
- [x] **Step 4：运行目标测试确认通过**：`npm run test:unit -- src/challenges/domain/grading.test.ts`；所有边界断言通过。

### Task 3：实现组进度与徽章

**文件：**

- 新建：`src/challenges/domain/progress.ts`
- 新建：`src/challenges/domain/progress.test.ts`

**接口：**

- 消费：Task 1 的 `ChallengeGroupDefinition` 与 Task 2 的 `TaskProgress`。
- 产出：`deriveGroupProgress(group, taskProgress): { passedCount: number; badgeEarned: boolean }`。

- [x] **Step 1：写失败测试**：零至四个任务 `everPassed` 时徽章未点亮；五个任务均通过时点亮；更弱的新成绩不会撤销 `everPassed` 或徽章；不属于该组的任务进度不计入。
- [x] **Step 2：运行目标测试确认失败**：`npm run test:unit -- src/challenges/domain/progress.test.ts`；预期函数缺失或断言失败。
- [x] **Step 3：实现纯组进度函数**：只按 group 声明的五个 task ID 查询状态；缺少进度等同未通过。
- [x] **Step 4：运行目标测试确认通过**：目标测试所有组合通过。

### Task 4：实现可重现的约束组卷

**文件：**

- 新建：`src/challenges/domain/assemble.ts`
- 新建：`src/challenges/domain/assemble.test.ts`

**接口：**

- 消费：Task 1 的 `ChallengeTaskDefinition`、`ChallengeQuestionSnapshot`。
- 产出：`assemblePaper(task, candidates, seed, recentQuestionIds): ChallengeQuestionSnapshot[]` 及 `AssemblyError`。

- [x] **Step 1：写失败测试**：同一任务/候选/seed 返回相同题序；seed 改变可产生不同有效题序；仅 Active 且 approved 且同难度候选参与；候选按稳定 ID 去重；有效池不足 `2 * targetCount`、任务必需知识点未覆盖或题数无法满足时报 `AssemblyError`；最近三次已用题只作为软偏好，不能破坏硬覆盖；变更指纹不自动改变 `approved`。
- [x] **Step 2：运行目标测试确认失败**：`npm run test:unit -- src/challenges/domain/assemble.test.ts`；预期组卷函数尚不存在或失败。
- [x] **Step 3：实现 seeded constrained sampler**：使用固定算法的可注入 seed PRNG；先满足必需知识点，再补足题数；对同一题 ID 使用稳定排序作为 seed 输入顺序，避免对象枚举顺序影响结果。
- [x] **Step 4：运行目标测试确认通过**：`npm run test:unit -- src/challenges/domain/assemble.test.ts`；重复运行同一 seed 结果一致，所有不可满足情况 fail closed。

### Task 5：实现首答状态机与事务存储

**文件：**

- 新建：`src/challenges/domain/attempt.ts`
- 新建：`src/challenges/domain/attempt.test.ts`
- 新建：`src/challenges/storage/repository.ts`
- 新建：`src/challenges/storage/indexedDbRepository.ts`
- 新建：`src/challenges/storage/indexedDbRepository.test.ts`
- 修改：`package.json`、`package-lock.json`（仅当采用 `fake-indexeddb` 开发依赖）
- 修改：`docs/challenges/DATA_MODEL.md`、`docs/challenges/ARCHITECTURE.md`

**接口：**

- 消费：Task 2 的 `gradeAttempt()` 与 Task 4 的 `assemblePaper()`；题目判分复用 `src/learning/answers.ts` 中的 `submitAnswer()`。
- 产出：`submitFirstAnswer()`、`finalizeAttempt()` 和 `ChallengeRepository`；IndexedDB object stores `attempts`、`taskProgress`、`challengeMeta`，数据库名 `starry-island-challenges`，schema version 1。MVP 仅保留未完成快照及最近三次 attempt 的题目 ID 集合；错题本、备份和完整作答历史属后续阶段。

- [x] **Step 1：写状态机失败测试**：第一次答对/答错均被保存；只能提交当前 `currentIndex` 指向的题；同题再次提交被拒；未答完不能完成；答完后计算得分并返回 `status: 'completed'` 且沿用最后一次已保存 revision 的快照；丢弃不增加完成数；错误答案只在完成 review 时呈现讲解；完成后 best 按得分比例比较且 ever-passed 单调保持。
- [x] **Step 2：运行目标测试确认失败**：`npm run test:unit -- src/challenges/domain/attempt.test.ts`；预期状态机测试失败。
- [x] **Step 3：实现纯状态机**：返回新状态而不变更输入对象；只把第一次提交计入答题结果，完成态不可再次提交。
- [x] **Step 4：运行状态机测试确认通过**：目标测试全部通过，并确认使用 `submitAnswer()` 得到的结果与学习现有判题逻辑一致。
- [x] **Step 5：写 IndexedDB repository 失败测试**：通过注入 `IDBFactory` 和隔离数据库名，覆盖首次 schema 建立、已有活动快照时拒绝第二个 begin、每题确认保存、只新增当前题一次答案、expected revision 过期拒绝、完成时拒绝错误状态/错误 revision/不完整答案的快照，并验证完整完成快照与进度写入、最近三次 question ID 更新和活动快照删除同事务提交、事务失败时原记录仍可读、discard 不写成绩。
- [x] **Step 6：运行 repository 测试确认失败**：`npm run test:unit -- src/challenges/storage/indexedDbRepository.test.ts`；预期首次运行时测试因数据库 adapter 缺失而失败。
- [x] **Step 7：核对并加入测试专用 IndexedDB 实现**：执行时复核 `fake-indexeddb` 兼容性、Apache-2.0 声明和锁定版本；只写入 `devDependencies`，不得进入生产 bundle。
- [x] **Step 8：实现 IndexedDB repository**：object store 以 `taskId` 为 keyPath 保证每任务只有一个进行中快照；读写事务内检查 revision；完成事务验证传入快照状态、revision、身份、题数和答案完整性，并同时写入任务进度、最近三次 question ID 集合、删除活动快照；拒绝旧 revision；只在事务完成事件后 resolve；数据库打开、升级或事务失败时返回明确存储错误。将 IndexedDB 选择、recent-use 数据和 schema v1 决策同步到 `DATA_MODEL.md` 与 `ARCHITECTURE.md`。
- [x] **Step 9：运行 repository 测试确认通过**：`npm run test:unit -- src/challenges/domain/attempt.test.ts src/challenges/storage/indexedDbRepository.test.ts`；检查 `package-lock.json` 中依赖只在开发依赖树。

### Task 6：实现闯关路由、题目 UI 和结果页

**文件：**

- 新建：`src/challenges/ui/ChallengeCenter.tsx`
- 新建：`src/challenges/ui/ChallengeRunner.tsx`
- 新建：`src/challenges/ui/ChallengeActivityRenderer.tsx`
- 新建：`src/challenges/ui/ChallengeResult.tsx`
- 新建：`src/challenges/ui/challenge.css`
- 新建：`src/challenges/ui/ChallengeCenter.test.tsx`
- 新建：`src/challenges/ui/ChallengeActivityRenderer.test.tsx`
- 新建：`src/challenges/ui/ChallengeRunner.test.tsx`
- 修改：`src/app/router.ts`、`src/app/router.test.ts`
- 修改：`src/App.tsx`、`src/App.test.tsx`
- 修改：`src/components/catalog/CourseCatalog.tsx`、`src/components/catalog/CourseCatalog.test.tsx`
- 修改：`src/components/catalog/UnitOverview.tsx`、`src/components/catalog/UnitOverview.test.tsx`
- 新建：`tests/e2e/challenge-flow.spec.ts`

**接口：**

- 消费：Tasks 1–5 的 pilot manifest、domain functions、`ChallengeRepository`。
- 产出：`/challenges` 中心、`/challenges/group/${encodeURIComponent(groupId)}` 组页和 `/challenges/task/${encodeURIComponent(taskId)}` 任务路由；未登记或不可用内容显示原因，不进入作答。

- [x] **Step 1：写路由测试**：中心路径、结构正确的 group/task 路径、缺失段、非法百分号编码和现有课程路径分别解析正确；`router.ts` 不导入挑战清单；未知但结构正确的 ID 由懒加载挑战页面显示不可用，已有 session URL 和 legacy URL 解析结果不变。
- [x] **Step 2：运行 router 测试确认失败**：`npm run test:unit -- src/app/router.test.ts`；预期挑战路径被识别为 not found。
- [x] **Step 3：实现新增挑战路由**：在既有路由解析中添加独立分支，不改动学习路径匹配顺序与学习参数。
- [x] **Step 4：写 UI 与 E2E 测试确认失败**：闯关题面不出现提示、学习鼓励反馈和 retry；已允许题型不暴露正确答案；测量题在没有安全呈现前不能进入 runner；未知 group/task 显示不可用；提交后禁用本题答题控件；完成后展示分数、星级、错题答案与讲解；注入拒绝写入的 repository 时停留在当前题且展示恢复操作。Playwright 覆盖中心入口、两种 group、首答保存/恢复、完成和结果刷新、学习回归；组件与 repository 测试覆盖拒绝写入的重试、确认丢弃和不计成绩。
- [x] **Step 5：运行 UI 单元测试确认失败**：`npm run test:unit -- src/challenges/ui src/app/router.test.ts src/components/catalog/CourseCatalog.test.tsx src/components/catalog/UnitOverview.test.tsx`；挑战 UI 断言预期失败；Playwright E2E 在 Task 7 的组件挂载完成后运行。
- [x] **Step 6：实现页面和题型编排**：复用已审查的 `ChoiceActivity`、`MatchActivity`、`OrderActivity`、`CategorizeActivity`、`ArithmeticActivity` 输入控件，但不调用包含 hint/retry 的 `ActivityRenderer`；MVP 不注册或渲染 `MeasurementActivity`；在全部题目完成前不显示对错；闯关页面设置 `data-sound-silent="true"`，保持闯关答题默认静音。
- [x] **Step 7：实现中心与入口**：`CourseCatalog` 提供 `/challenges` 入口；试点 `UnitOverview` 提供 `/challenges/group/{groupId}` 上下文入口；中心通过 `unitLoader` 按需加载被登记课程单元、运行清单门禁，并使用 `groupStatusById` 显示 ready/planned/unavailable，不在 React 中硬编码 readiness；中心显示两个完整 group 的 2/2/1 任务结构、最近/最佳进度、组徽章和安全返回；完成提交成功后进入结果页；退出进行中 attempt 前要求确认 discard 或继续保存。
- [x] **Step 8：运行 UI/router 单元测试确认通过**：运行 Task 6 Step 5 的 Vitest 命令；挑战断言全部通过，原学习路由、学习 Task 反馈、进度和设置行为无回归。浏览器 E2E 在 Task 7 执行。

### Task 7：完成纵向切片验收与需求追踪

**文件：**

- 修改：`docs/challenges/REQUIREMENTS_TRACEABILITY.md`
- 修改：`docs/challenges/ROADMAP.md`
- 修改：`docs/challenges/README.md`

**接口：**

- 消费：Task 6 的页面、路由和 Task 5 的持久化行为。
- 产出：可复现的 MVP 验收证据；未实现的 REQ 继续标记为未实现，不按文档完成度推断。

- [x] **Step 1：运行 E2E 验收流程**：`npx playwright test tests/e2e/challenge-flow.spec.ts`；打开闯关中心；分别开始 unit 组和 semester 组任务，提交首答并刷新恢复题单/进度；完成 unit 任务并核对成绩、星级和结果页刷新；现有学习回归仍由完整 E2E 覆盖。保存失败重试和确认丢弃由 ChallengeRunner 组件测试及 repository 原子性测试验证；组徽章由 Task 3 的全组合测试验证。
- [x] **Step 2：运行扩展测试与完整门禁**：`npm run test:unit`、`npm run test:coverage`、`npm run test:e2e`、`npm run build`、`git diff --check`；E2E 若受本机 Chromium 权限阻止，保留失败证据并在允许的 CI 环境验证，不标记为通过。
- [x] **Step 3：手动检查 UI 与浏览器恢复**：Chromium 截图检查桌面与窄屏、浅色与深色、闯关中心/学期组/答题页；E2E 检查键盘焦点与 reduced-motion；E2E 和组件测试检查首答锁定、刷新恢复、成绩展示，组件测试检查保存失败重试和确认丢弃。必要的儿童教学内容由课程审核者逐题确认。确认闯关路由与单元内容按需导入，并记录初始 JS 压缩体积和最大 JS chunk（当前审计值 316.56 kB），解释体积变化，不以提高 Vite 告警阈值代替体积检查。
- [x] **Step 4：更新需求追踪与路线图**：仅将本切片确实实现并有测试证据的 REQ 标为已实现；明确其它年级/学科/单元组和其余学期阶段组、共 540 个学期任务仍未覆盖。
- [x] **Step 5：复核最终差异与证据**：确认只修改计划范围内文件、REQ 状态与验证证据一致、无构建产物或无关改动；桌面与窄屏、浅色与深色、键盘焦点、reduced motion、答题后锁定、刷新恢复、错误保存恢复均有记录；不将构建成功等同于 UX 已验收。

## MVP 完成标准

- 一个正式单元组和一个学期阶段组均有完整 2/2/1 任务结构、可追溯课程/阶段映射、逐题审核记录与各难度至少 2× 有效唯一候选池；任何门禁失败的 group 保持不可用。
- 同一随机种子得到相同题单；题量、题型、知识点和审核门槛满足 manifest。
- 通过线、首答锁定、星级、结果 review、单任务进度与五任务徽章更新符合 PRD；无完整作答历史，仅保留最近三次题目 ID 用于减少重复。
- 闯关刷新恢复同一题单和已确认答案；并发旧写入被拒；未确认的写入不会被 UI 当作成功。
- 现有学习 Task、进度、提示/重试及主题/声音设置回归通过。
- 单元、覆盖率、E2E、构建及人工 UI 检查如实记录；没有把本地未能运行的 E2E 写成通过。
- 本 MVP 不代表 Pilot 跨年级覆盖，也不代表 v1.0 全课程覆盖或正式发布。

## 自审

- **规格覆盖：** 计划覆盖试点清单门禁、组卷、计分、首答状态、持久化、恢复、结果页、组徽章、学习回归和交付验证；备份导入、全站错题本视图、完整 540 任务、质量 CLI 与 GitHub issue/release 流程留在后续阶段。
- **步骤清晰度：** 每个行为先列可观察测试，再列实现和命令；内容/阶段证据门、IndexedDB 冲突语义与 REQ-080 规则都有明确检查。
- **类型一致性：** `Difficulty`/`SubjectId` 来自 `src/content/types.ts`；候选类型、答题值、attempt/result 从 Task 1 起供后续任务使用；储存接口按 revision 驱动并贯穿 UI。
- **Review Focus：** 五类风险分别落到清单校验、审核状态测试、事务 revision 测试、写失败流程和学习回归测试。
- **范围比例：** 仅规划两个完整的代表性五任务组，不细化 540 个任务的重复实现，也不把完整备份/治理台账塞入 MVP。
