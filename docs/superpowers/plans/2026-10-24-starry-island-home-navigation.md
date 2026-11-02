# 星岛学园全局导航与首页实施计划

> **执行者说明：** 使用 superpowers:executing-plans 逐项实施。本计划沿用用户此前选择的 Native 方式，由当前会话按任务实现；过程文档使用中文。

**目标：** 增加全局浮层导航和任务首页，提供继续学习、分域进度、近期学习记录和闯关入口，同时保留课程目录与课程深链。

**架构：** 将 / 用作首页、将课程目录移至 /courses；在 AppFrame 增加共享页眉和右侧抽屉。课程完成记录加入现有本地进度对象的有界历史；继续学习使用已核实课程清单与基础版场次定位。闯关摘要异步读取，不载入挑战题库，不阻塞课程入口。

**技术栈：** React、TypeScript、Vite、animal-island-ui、Vitest、Playwright；不新增依赖或服务端。

**规格：** ../specs/2026-10-24-starry-island-navigation-home-growth-design.md

## 全局约束

- 课程进度与闯关记录继续分域保存；学习进度仅在现有 localStorage 中维护。
- 进度数据结构由第 3 版升至第 4 版；迁移保留完成场次 ID 和学习起点，不伪造旧活动时间；近期活动最多 20 条，首页最多显示 3 条。
- 继续学习使用已核实、已开放课程的基础版场次；全部基础版完成后提供浏览课程入口。
- 首页不得静态导入挑战页面、完整 pilotManifest 或挑战题库；挑战成长索引只保留组级摘要，且需由测试对照正式组清单防止漂移。IndexedDB 延迟或失败不能阻塞首页课程入口。
- /achievements 和 /challenges/growth 由后续成长计划接管；本计划不删除或重定向它们。
- / 成为首页后，所有标注“返回课程目录”的现有操作进入 /courses；课程单元、任务、场次 URL 保持不变。
- 使用中文界面文案和中文过程文档；兼容浅/深色、键盘、可见焦点和减少动态效果。
- 每项行为先写失败测试并确认失败，再写最小实现；每个任务运行完整单元测试后提交精确文件。本计划不推送分支。

## 审查重点

- **旧进度迁移：** 第 1/2/3 版记录保留场次和学习起点、无历史时间；任务 1 覆盖。
- **重复完成和假定完成：** 完成 ID 继续唯一，但真实重做可产生新活动；设置学习起点不产生活动；任务 1 覆盖。
- **不可继续课程：** 未开放或教材未核实单元不被自动选中，路径不能由标题拼造；任务 2 覆盖。
- **目录路由变化：** 课程页返回目录的链接不会错误回到首页，课程深链不变；任务 3 覆盖。
- **闯关存储不可用：** 首页和课程入口在挑战 IndexedDB 慢或失败时可用，题库不进入首屏依赖；任务 4 覆盖。

---

### 任务 1：增加有界课程完成活动历史

**文件：**

- 修改：src/storage/progress.ts
- 修改：src/storage/progress.test.ts
- 修改：src/components/catalog/CourseCatalog.test.tsx
- 修改：src/components/settings/SettingsDialog.test.tsx

**接口：**

- ProgressState 改为 schemaVersion: 4，增加 recentCompletions: RecentCompletion[]。
- RecentCompletion 为 { sessionId: string; completedAt: string }。
- completeSession(progress, sessionId, completedAt = new Date().toISOString()) 保持完成 ID 集合唯一；每次有效场次完成调用追加活动，保留最近 20 条。
- parseProgress 接受版本 1、2、3、4；旧版本迁移出空活动列表，不推测时间。
- setLearningStart 保留已有真实活动历史，但不追加活动。
- 不修改 src/challenges/domain/diagnostics.test.ts 中闯关诊断报告自身的 schema 版本。

- [x] **步骤 1：写失败迁移与活动测试**

  在 src/storage/progress.test.ts 增加 migratesV1V2AndV3WithoutInventingRecentCompletionTimes、recordsCompletionTimeForARegisteredSession、keepsCompletionIdsUniqueWhenACompletedSessionIsRepeated、keepsOnlyTheMostRecentTwentyCompletionEvents、rejectsUnknownSessionsAndInvalidEventTimes 和 preservesActivityHistoryWhenLearningStartChanges。用固定系统时间验证事件时间；同时断言设置学习起点不新增历史事件。

- [x] **步骤 2：确认测试按预期失败**

  运行：npm run test:unit -- src/storage/progress.test.ts

  预期：因进度类型仍为第 3 版且没有活动事件而失败。

- [x] **步骤 3：实现第 4 版进度结构**

  在 progress.ts 规范化并验证 recentCompletions，过滤非当前注册课程场次和无效时间，按时间保留最近 20 项。所有保存路径输出第 4 版；迁移旧对象时只保留已有完成 ID、学习起点并写入空历史。完成已完成的场次时仍保持完成 ID 去重，但记录这次真实完成活动。

- [x] **步骤 4：运行聚焦测试和完整单测**

  运行：npm run test:unit -- src/storage/progress.test.ts

  预期：迁移、活动边界、重复完成和学习起点测试通过。

  运行：npm run test:unit

  预期：所有现有进度消费者、成就和课程测试通过；无类型错误。

- [x] **步骤 5：提交任务**

  提交信息：feat(progress): record recent learning completions

### 任务 2：解析首页的下一场基础版课程

**文件：**

- 新建：src/app/continueLearning.ts
- 新建：src/app/continueLearning.test.ts

**接口：**

- LearningSessionDestination 包含 path、年级、学期、学科、单元、任务、场次的展示标题；resolveLearningSessionDestination(sessionId, options?) 只接受当前注册、已核实且开放的场次。
- ContinueLearningDestination 复用 LearningSessionDestination；resolveContinueLearningDestination(progress, options?) 返回 Promise<ContinueLearningDestination | null>。
- options 允许测试注入 CurriculumProgressSource 和单元加载函数。
- 搜索顺序使用 getKnownCurriculumPositions；按 getEffectiveCompletedSessionIds 跳过已完成的基础版场次；加载目标单元后，从基础版任务中确认场次归属，并用 getSessionPath 生成链接。
- 无未完成基础版场次、目标未能从已登记任务中确认或没有可用课程时返回 null。

- [x] **步骤 1：写失败目标选择测试**

  新增 resolvesOnlyRegisteredVerifiedOpenSessions、selectsEarliestIncompleteVerifiedBasicSession、skipsSessionsAssumedCompleteBeforeLearningStart、skipsComingSoonAndUnverifiedCurriculumEntries、returnsNullWhenAllBasicSessionsAreComplete 和 returnsNullWhenManifestSessionHasNoTaskOwner。使用小型合成清单和注入的单元加载函数。

- [x] **步骤 2：确认测试按预期失败**

  运行：npm run test:unit -- src/app/continueLearning.test.ts

  预期：目标解析模块或导出函数不存在而失败。

- [x] **步骤 3：实现目标解析**

  只读取清单元数据筛选第一个未完成基础版场次；仅加载目标场次所属单元。近期活动最多取 3 条并并发/有界地解析，不推断时间、不从标题或目录文本推导 URL。通过规范路由构造场次链接。

- [x] **步骤 4：运行聚焦测试和完整单测**

  运行：npm run test:unit -- src/app/continueLearning.test.ts

  预期：目标排序、学习起点、不可用课程和空结果边界通过。

  运行：npm run test:unit

  预期：完整单元测试通过。

- [x] **步骤 5：提交任务**

  提交信息：feat(home): resolve the next basic learning session

### 任务 3：建立首页/课程路由并加入全局抽屉

**文件：**

- 修改：src/app/router.ts、src/app/router.test.ts、src/App.tsx
- 修改：src/components/catalog/UnitOverview.tsx
- 修改：src/components/achievements/AchievementPage.tsx
- 新建：src/components/achievements/AchievementPage.test.tsx
- 修改：src/challenges/ui/ChallengeCenter.tsx、src/challenges/ui/ChallengePage.tsx
- 新建：src/components/layout/AppHeader.tsx、src/components/layout/AppHeader.test.tsx
- 新建：src/components/layout/AppNavigationDrawer.tsx、src/components/layout/AppNavigationDrawer.test.tsx
- 新建或修改：src/styles/app-shell.css

**路由接口：**

- 新增 home 路由种类，/ 解析为首页；/courses 解析为现有课程目录。
- 原课程单元、任务、场次路径和 /achievements、/challenges/growth 继续按当前逻辑解析。
- 课程内面包屑及所有“返回课程目录”按钮指向 /courses；品牌入口指向 /。

- [x] **步骤 1：写路由和课程返回链接失败测试**

  在 router.test.ts 增加 resolvesHomeAndCourseCatalogSeparately，断言 / 为首页、/courses 为课程目录，既有深链仍解析。验证单元、成就、挑战中心和挑战错误页的“返回课程目录”目标为 /courses。

- [x] **步骤 2：确认测试按预期失败**

  运行：npm run test:unit -- src/app/router.test.ts src/components/catalog/UnitOverview.test.tsx src/components/achievements/AchievementPage.test.tsx src/challenges/ui/ChallengeCenter.test.tsx src/challenges/ui/ChallengePage.test.tsx

  预期：首页路由尚不存在，课程目录仍占用 /，返回链接仍指向 /。

- [x] **步骤 3：实现路由语义和现有返回路径调整**

  更新 resolveRoute 和 App 路由分支；将课程目录注册到 /courses。只把明确标注“返回课程目录”或面包屑“课程目录”的目标改为 /courses，不要把品牌首页改为课程目录。

- [x] **步骤 4：写失败的全局菜单交互测试**

  测试菜单按钮的中文名称和 aria-expanded；打开时焦点进入导航；Escape/遮罩/关闭按钮关闭后焦点回触发按钮；选择导航项会关闭抽屉并调用对应路径回调。导航后新页面标题焦点由现有路由效果处理，不由抽屉再次覆盖。

- [x] **步骤 5：实现共享页眉和导航抽屉**

  在 AppFrame 显示品牌标识/项目名称和最右侧菜单按钮；抽屉浮在页面上方，包含首页、课程、闯关、成长、错题，底部放设置。使用仓库安装版本支持的组件；尊重浅/深色和减少动态效果。

- [x] **步骤 6：运行聚焦测试、完整单测和提交**

  运行：npm run test:unit -- src/app/router.test.ts src/components/layout/AppHeader.test.tsx src/components/layout/AppNavigationDrawer.test.tsx

  运行：npm run test:unit

  预期：新导航测试和所有现有路由/课程测试通过。

  提交信息：feat(navigation): add shared header and floating menu

### 任务 4：首页仪表盘与异步闯关摘要

**文件：**

- 新建：src/components/home/HomeDashboard.tsx、src/components/home/HomeDashboard.test.tsx
- 新建：src/challenges/content/growthGroups.ts、src/challenges/content/growthGroups.test.ts
- 新建：src/challenges/domain/growthSummaryReader.ts、src/challenges/domain/growthSummaryReader.test.ts
- 新建或修改：src/styles/home-dashboard.css
- 修改：src/App.tsx、src/components/catalog/CourseCatalog.test.tsx

**接口：**

- loadChallengeGrowthSummary 返回现有 ChallengeGrowthSummary。
- growthGroups 只保存展示和成长汇总需要的组元数据与任务 ID；测试对照 pilotManifest 的正式组清单，防止内容发布后摘要索引漂移。
- 加载器异步读取轻量组索引和 IndexedDB 汇总进度，不导入 pilotManifest、pilotContent.ts、ChallengePage.tsx、课程练习内容或补充题库。
- 首页接收 ProgressState、导航回调和挑战摘要状态 loading/ready/error；近期记录通过 resolveLearningSessionDestination 映射为可验证的课程链接，最近活动时间只使用 recentCompletions.completedAt。

- [x] **步骤 1：写失败的首页和加载边界测试**

  新增 showsTheFourHomeSectionsInApprovedOrder、showsContinueLearningForTheResolvedBasicSession、showsCourseAndChallengeProgressSeparately、showsThreeLatestRealLearningEventsWithRegisteredCourseLinks、offersCourseBrowseWhenBasicTrackIsComplete、keepsCourseEntryAvailableWhileChallengeSummaryLoads 和 keepsCourseEntryAvailableWhenChallengeStorageFails。

  对组索引新增 matchesChallengeGrowthFieldsInOfficialGroupsWithoutQuestionMetadata；对挑战摘要加载器新增 derivesSummaryFromLightweightGroupsAndSavedProgressWithoutLoadingPilotManifest，使用 IndexedDB 仓库夹具，并用构建依赖检查确认生产摘要路径没有完整 pilotManifest 或 loadPilotChallengeContent。

- [x] **步骤 2：确认测试按预期失败**

  运行：npm run test:unit -- src/components/home/HomeDashboard.test.tsx src/challenges/content/growthGroups.test.ts src/challenges/domain/growthSummaryReader.test.ts

  预期：新组件或轻量摘要加载器尚不存在而失败。

- [x] **步骤 3：实现组级成长索引和轻量挑战摘要加载器**

  维护只含展示字段和五个任务 ID 的组级索引；测试以正式 pilotManifest 校验成长算法和视图依赖字段的组 ID、任务 ID 与展示元数据一致。通过 deriveChallengeGrowth 计算已登记任务进度；以独立 IndexedDB 查询读取任务汇总。摘要读取失败返回错误状态，不抛出到首页课程入口。

- [x] **步骤 4：实现四区首页并接入应用**

  首页按规格顺序展示继续学习、课程/闯关分域进度、最多三条真实课程完成活动、闯关入口。课程目标解析和挑战统计异步处理，挑战加载状态不影响主操作。课程目录从 /courses 打开。

- [x] **步骤 5：运行组件测试、单测、构建并提交**

  运行：npm run test:unit -- src/components/home/HomeDashboard.test.tsx src/challenges/content/growthGroups.test.ts src/challenges/domain/growthSummaryReader.test.ts src/components/catalog/CourseCatalog.test.tsx

  运行：npm run test:unit

  运行：npm run build

  预期：首页四区和失败/空数据状态通过；构建无类型错误，首页摘要没有同步引入挑战题库。

  提交信息：feat(home): add local learning dashboard

### 任务 5：浏览器主流程与响应式回归

**文件：**

- 修改：tests/e2e/catalog.spec.ts
- 新建：tests/e2e/home-dashboard.spec.ts

- [x] **步骤 1：写首页浏览器失败场景**

  覆盖首页四区、抽屉开闭与 Escape、课程入口进入有效基础版场次、完成场次后近期记录出现、挑战摘要存储失败时仍可继续学习、旧课程路径和 /courses 目录导航。

- [x] **步骤 2：运行端到端测试并修复**

  运行：npm run test:e2e -- tests/e2e/home-dashboard.spec.ts tests/e2e/catalog.spec.ts

  预期：桌面主流程通过；如遇到环境启动失败，报告明确的浏览器环境边界，不以跳过断言代替通过。

- [x] **步骤 3：完成交付验证并提交**

  运行：npm run test:unit

  运行：npm run test:e2e -- tests/e2e/home-dashboard.spec.ts tests/e2e/catalog.spec.ts

  运行：npm run build

  运行：git diff --check

  手动检查桌面/窄屏、浅色/深色、键盘焦点和减少动态效果。预期：课程任务可从首页正常完成，首页首屏不依赖挑战题库。

  提交信息：test(home): verify dashboard and navigation flows
