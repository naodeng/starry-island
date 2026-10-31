# 星岛学园成长中心实施计划

> **执行方式：** 由当前会话按用户此前选择的 Native 方式实施，遵循 TDD。过程文档使用中文。

**目标：** 把课程星图/宇宙头衔与闯关徽章/进度放入一个成长入口，分别保留两域的数据和规则，并为旧成长链接保留正确视图。

**架构：** 复用 `AchievementDashboard`、`deriveChallengeGrowth` 和计划一提供的轻量组索引/摘要读取器。新增成长中心容器，包含概览、学习星图、闯关成长三个视图。`/growth` 默认进入概览；`/achievements` 默认进入学习星图；`/challenges/growth` 默认进入闯关成长。

**技术栈：** React、TypeScript、Vite、animal-island-ui、Vitest、Playwright；不新增依赖或后端服务。

**规格：** [全局导航、首页与成长中心设计规格](../specs/2026-10-24-starry-island-navigation-home-growth-design.md)

**依赖：** 计划一 `2026-10-24-starry-island-home-navigation.md` 提供共享导航、课程完成事件、已验证场次链接解析及轻量闯关成长摘要。

## 全局约束

- 不改变课程头衔、星区探索、闯关通过和徽章的既有算法。
- 两域数据分开展示，禁止相加或合成总百分比、等级和分数。
- 最近课程事件只使用真实 `recentCompletions`；不得用当前进度或迁移时间补造活动。
- 挑战记录没有逐次可靠时间戳时，只展示汇总、路线进度和徽章，不展示猜测的挑战时间线。
- 旧链接分别进入其原对应视图；新导航指向 `/growth`。
- 兼容浅/深色、键盘、屏幕阅读器、可见焦点、窄屏和减少动态效果。

## 审查重点

- `/achievements` 必须默认看到学习星图，`/challenges/growth` 必须默认看到闯关成长；二者不可误映射到同一域。
- 闯关成长不得导入 `ChallengePage`、`pilotManifest` 或题目正文；只消费计划一的轻量摘要读取器。
- IndexedDB 失败只影响闯关视图，不隐藏课程成就或其他成长入口。
- 已有课程成就 DOM/交互继续工作，不引入新徽章或未确认里程碑规则。
- 成长页只显示最多 3 条有时间和有效课程链接的真实近期学习活动。

---

### 任务 1：增加统一成长路由和兼容视图

**文件：**

- 修改：`src/app/router.ts`、`src/app/router.test.ts`
- 修改：`src/App.tsx`
- 新建：`src/components/growth/GrowthPage.tsx`、`src/components/growth/GrowthPage.test.tsx`
- 修改：`src/components/achievements/AchievementPage.tsx`（迁移或移除重复页面包装）
- 修改：`src/challenges/ui/ChallengeGrowth.tsx`、`src/challenges/ui/ChallengeGrowth.test.tsx`
- 新建或修改：`src/styles/growth.css`、`src/styles/achievement.css`、`src/challenges/ui/challenge.css`

**接口：**

- AppRoute 增加 `growth` 路由种类及 `initialView: 'overview' | 'learning' | 'challenge'`。
- `/growth`、`/achievements`、`/challenges/growth` 均由 App 的成长中心承载，分别使用 overview、learning、challenge 初始视图。
- 成长中心的视图切换为可访问按钮；标题由父页面统一提供，子视图不产生嵌套 `main`/重复 `h1`。
- 学习视图复用 `AchievementDashboard`；挑战视图复用 `ChallengeGrowth` 的已有数据呈现；概览消费计划一的异步摘要读取器。

- [x] **步骤 1：先写路由与别名失败测试**

  在 `router.test.ts` 增加 `resolvesGrowthOverviewRoute`、`mapsAchievementsAliasToLearningView`、`mapsChallengeGrowthAliasToChallengeView`。断言已有课程深链及挑战任务/组路径未改变。

- [x] **步骤 2：确认测试因路由类型缺失而失败**

  运行：`npm run test:unit -- src/app/router.test.ts`

  预期：新成长路由与别名视图断言失败。

- [x] **步骤 3：实现路由解析和最小页面容器**

  让 `/growth` 成为新入口；旧路径分别指定初始视图。暂时保留旧路径本身，不做会丢失来源视图的统一重定向。

- [x] **步骤 4：先写页面结构和视图切换失败测试**

  覆盖三个视图标签、`/growth` 默认概览、两个旧路径进入对应视图、视图切换不合并两域数字、点击“学习星图/闯关成长”后只显示目标内容、键盘可切换按钮且焦点清楚。

  运行：`npm run test:unit -- src/components/growth/GrowthPage.test.tsx src/challenges/ui/ChallengeGrowth.test.tsx`

  预期：组件尚未实现或旧挑战成长仍为独立页面时失败。

- [x] **步骤 5：整合学习星图与闯关成长视图**

  将现有视图呈现调整为可嵌入容器的语义 section，复用原来的算法和内容；处理加载、空记录和存储不可用状态。路由后的主标题焦点继续由现有路由效果管理。

- [x] **步骤 6：运行聚焦测试和完整单测后提交**

  运行：`npm run test:unit -- src/app/router.test.ts src/components/growth/GrowthPage.test.tsx src/components/achievements/AchievementDashboard.test.tsx src/challenges/ui/ChallengeGrowth.test.tsx`

  运行：`npm run test:unit`

  预期：新旧路由映射正确，原有星图和闯关成长测试通过。

  提交信息：`feat(growth): combine learning and challenge growth views`

  交付提交：`806ebf0`。

### 任务 2：实现有证据的成长概览和近期活动

**文件：**

- 修改：`src/components/growth/GrowthPage.tsx`、`src/components/growth/GrowthPage.test.tsx`
- 修改：`src/styles/growth.css`
- 修改：`tests/e2e/settings-achievements.spec.ts`、`tests/e2e/challenge-flow.spec.ts`

- [x] **步骤 1：写概览失败测试**

  增加 `showsLearningAndChallengeMetricsSeparately`、`showsOnlyTimestampedCourseCompletionEvents`、`doesNotInferChallengeEventsFromUpdatedAt`、`keepsLearningViewWhenChallengeStorageFails`、`opensOriginalViewFromLegacyPaths`。用明确的完成时间和挑战 `updatedAt` 夹具验证来源边界。

- [x] **步骤 2：确认概览测试失败**

  运行：`npm run test:unit -- src/components/growth/GrowthPage.test.tsx`

  预期：概览卡片、近期活动和数据隔离断言失败。

- [x] **步骤 3：实现概览**

  并列展示课程完整单元/当前头衔与闯关完成挑战/通过任务/徽章，各使用原域字段。课程近期事件取最近 3 条 `recentCompletions`，用计划一的 `resolveLearningSessionDestination` 核实位置和链接；没有对应时间或场次时跳过该条，不回填。闯关摘要加载失败时显示可恢复说明，并保留其他视图和入口。

- [ ] **步骤 4：跑浏览器回归和全量验证**

  运行：`npm run test:unit -- src/components/growth/GrowthPage.test.tsx src/achievements/progress.test.ts src/challenges/domain/growth.test.ts`

  运行：`npm run test:e2e -- tests/e2e/settings-achievements.spec.ts tests/e2e/challenge-flow.spec.ts`

  运行：`npm run build`

  运行：`git diff --check`

  手动检查桌面/窄屏、浅/深色、键盘焦点和 reduced motion。预期：新成长入口和旧别名均可用，课程 Task 与挑战主流程不受影响。

  提交信息：`feat(growth): add evidence-based growth overview`

  验证记录：全量单测、生产构建、`git diff --check` 已通过。Playwright E2E 未能启动，macOS Chromium 报 `bootstrap_check_in` 权限错误并退出 `SIGTRAP`；因此该步骤保持未完成，需在可启动 Chromium 的环境复验。
