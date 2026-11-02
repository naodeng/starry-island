# 星岛学园全站页面 UI 审查与优化实施计划

> **执行说明：** 按任务逐项执行本计划，并使用 `superpowers:executing-plans` 技能。步骤通过复选框（`- [ ]`）追踪。

**目标：** 逐页优化星岛学园的全站界面，补齐空数据呈现，并提升桌面、平板、手机、两种主题及键盘操作下的清晰度和可用性。

**架构：** 先建立可复用的空状态表现和全局外观约束，再依赖现有路由与组件逐组优化页面，不更改业务数据流。页面族共享同一视觉系统和空状态规则，保留 React/Vite 结构；实施顺序由共用外壳到各页面，最后做全站人工检查。

**技术栈：** React、TypeScript、Vite、`animal-island-ui`、`naive-icons`、Vitest、Playwright。

**设计规格：** `docs/superpowers/specs/2026-10-30-starry-island-whole-site-ui-review-design.md`

## 全局约束

- 保持 本地优先、静态部署、React/Vite；不新增账号、后端、遥测、网络语音或依赖。
- 保持课程与闯关进度数据分离，不改课程、题目、评分、存储语义、路由和现有学习/挑战流程。
- 使用仓库已有的 `animal-island-ui` 组件、`--animal-*` / `--island-*` 变量及 `naive-icons`；不使用 emoji、Unicode 图标、手绘 SVG 或页面私有主题变量。
- 区分空数据、筛选/选择无结果、计划开放、加载、读取失败及保存失败；错误不能显示成空数据。
- 兼容浅色、深色、系统主题、键盘、触控和 `prefers-reduced-motion`；颜色不能作为唯一状态提示。
- 中文文案面向 7–12 岁学生，准确、简短、鼓励且不施加连续学习压力。
- 保留当前工作区已有修改；本计划不包含提交或推送，也不整理与本计划无关的脏文件。

## 审查重点

1. **学习/闯关存储错误被空状态掩盖（任务 7、8）：**挑战 IndexedDB 读取失败、答题保存失败和备份失败的测试继续断言保护说明、重试入口及数据未被覆盖。
2. **有效内容被误判为未开放或空数据（任务 4、7）：**课程注册表、题库质量门禁和路线状态继续决定页面内容；现有的 计划开放/暂不可用 路线测试验证这些情况不进入正常空态。
3. **窄屏中文内容溢出或操作被遮挡（任务 10）：**在 390px 手动检查长标题、卡片、学科/错题切换、菜单和主要操作。
4. **浅/深色对比与焦点不可见（任务 1、2、10）：**组件测试验证空态语义和操作；手动检查空态、选中/禁用、错误卡、菜单和弹窗的两种主题及键盘焦点。
5. **视觉调整影响学生现有交互（任务 3–9）：**各页面族单测覆盖答题、反馈、闯关提交、返回导航、学习起点确认和语音开关；任务 10 执行端到端回归。

---

## 文件地图

- 新增 `src/components/shared/EmptyState.tsx`：全站数据空态的共同结构；根据标题级别、图标和可选操作适配不同页面语义。
- 新增 `src/components/shared/EmptyState.test.tsx` 与 `src/styles/empty-state.css`：验证语义、可选操作与主题 token 样式。
- 新增 `src/components/shared/LoadingState.tsx`、`LoadingState.test.tsx` 和 `src/styles/loading-state.css`：统一加载文案、指南针/星环轻动画、辅助技术状态播报及减少动态效果支持。
- 任务 1 还会先将空状态组件接入首页最近学习记录区域，并在首页单测中验证真实消费者；任务 3 再继续首页其他区域的优化。
- 修改 `src/components/layout/AppHeader.tsx`、`AppNavigationDrawer.tsx` 及 `src/styles/app-shell.css`：优化共享页眉和浮层导航的布局、状态显示和窄屏触达，不改变路由。
- 修改 `src/components/home/HomeDashboard.tsx`、`src/styles/home-dashboard.css`：优化首页四区及无学习/闯关记录状态。
- 修改 `src/components/catalog/CourseCatalog.tsx`、`UnitOverview.tsx`、`src/styles/catalog.css`：优化课程选择、课程/单元/任务展示与空状态。
- 修改 `src/components/game/SessionPlayer.tsx`、`SessionSummary.tsx`、题型活动组件及 `src/styles/game.css`：优化答题内容可读性、反馈和结果页，只调整 UI。
- 修改 `src/components/growth/GrowthPage.tsx`、`AchievementDashboard.tsx`、`AchievementSummary.tsx`、`src/styles/growth.css`：统一成长概览、学习星图、闯关成长的层级与空状态。
- 修改 `src/challenges/ui/ChallengeCenter.tsx`、`ChallengeGroup.tsx`、`ChallengeRunner.tsx`、`ChallengeResult.tsx`、`ChallengeWrongQuestions.tsx` 及 `src/challenges/ui/challenge.css`：优化路线、任务、结果、错题与保存/读取状态。
- 修改 `src/components/settings/SettingsPage.tsx`、`SettingsPanel.tsx`、`src/styles/settings.css` 和数据管理页面/组件样式：优化偏好页和备份、恢复点、隔离记录区域，不改安全合并流程。
- 修改 `src/App.tsx`、`src/components/layout/ProjectLegalFooter.tsx` 及必要页面样式：优化加载、未开放、错误、未找到、教材迁移提示和页脚的呈现。
- 挑战本机读取增加严格模式安全的仓库生命周期管理与有限等待保护：`src/challenges/ui/useChallengeRepository.ts`、`readWithTimeout.ts` 及其页面回归测试。

## 实施任务

### 任务 1：建立可复用的空状态组件

**涉及文件：**
- 新建：`src/components/shared/EmptyState.tsx`
- 新建：`src/components/shared/EmptyState.test.tsx`
- 新建：`src/styles/empty-state.css`
- 修改：`src/components/home/HomeDashboard.tsx`
- 测试：`src/components/home/HomeDashboard.test.tsx`

**接口：**
- `EmptyStateProps`：`title: string`、`description: string`、可选 `icon: ReactNode`、`headingLevel: 2 | 3`、可选 `action: { label: string; onAction: () => void }`、可选 `className: string`。
- 组件使用 Animal Island `Card` 和可选 `Button`；装饰图标对辅助技术隐藏；不使用默认占位文案或假计数。

- [x] 先在 `HomeDashboard.test.tsx` 写 `showsRecentLearningEmptyStateWithTitleAndDescription`，断言空记录区出现独立标题和说明；运行 `npm run test:unit -- src/components/home/HomeDashboard.test.tsx`，确认以断言失败（当前页面只显示一行说明）。
- [x] 新建只负责标题和说明的 `EmptyState` 最小版本并接入 HomeDashboard 空记录区；重跑 HomeDashboard 单测，确认该断言通过。
- [x] 再写 `EmptyState.test.tsx` 的四个行为测试：`renders an empty state with its heading and description`、`omits the action when none is provided`、`renders a labelled action and invokes it by keyboard`、`hides a decorative icon from assistive technology`；运行 `npm run test:unit -- src/components/shared/EmptyState.test.tsx`，确认以预期的行为断言失败，而非模块解析错误。
- [x] 完成组件接口和 CSS，支持可选 `Button` 操作与装饰图标；样式使用仓库主题变量，卡片不覆盖库组件的颜色、阴影或圆角。
- [x] 运行 `npm run test:unit -- src/components/shared/EmptyState.test.tsx src/components/home/HomeDashboard.test.tsx`，确认组件和真实首页消费者测试通过；最近记录空态不重复添加已有的“浏览课程”入口。

### 任务 2：优化共享页眉、浮层菜单和全局布局

**涉及文件：**
- 修改：`src/components/layout/AppHeader.tsx`
- 修改：`src/components/layout/AppNavigationDrawer.tsx`
- 修改：`src/styles/app-shell.css`
- 测试：`src/components/layout/AppHeader.test.tsx`
- 测试：`src/components/layout/AppNavigationDrawer.test.tsx`

- [x] 补充 `AppHeader.test.tsx` 中 品牌标识 导航及菜单可访问名/`aria-expanded` 测试；补充 `AppNavigationDrawer.test.tsx` 中当前入口状态、Escape/遮罩关闭和焦点恢复测试；窄屏菜单与品牌布局由 任务 10 在真实视口检查。
- [x] 运行 `npm run test:unit -- src/components/layout/AppHeader.test.tsx src/components/layout/AppNavigationDrawer.test.tsx`，确认新增断言失败。
- [x] 调整页眉间距、菜单按钮触达面积、遮罩/抽屉响应式布局和焦点可见性；保留菜单默认收起、浮层覆盖、Escape/遮罩关闭及焦点恢复行为。
- [x] 重跑上述单测，确认通过；不新增图标资产，不改导航顺序和路由。

### 任务 3：首页四区与零进度呈现

**涉及文件：**
- 修改：`src/components/home/HomeDashboard.tsx`
- 修改：`src/styles/home-dashboard.css`
- 测试：`src/components/home/HomeDashboard.test.tsx`

- [x] 保留现有的无可继续场次入口、课程/闯关计数分开、近期记录空态以及闯关摘要加载/失败测试；新增“所有闯关成果计数为零时显示说明性空态”测试。
- [x] 运行 `npm run test:unit -- src/components/home/HomeDashboard.test.tsx`，确认新增断言失败。
- [x] 使用 任务 1 空状态组件，逐项调整主次层级、双进度卡、近期记录和闯关入口；保持四区阅读顺序及真实数据来源。
- [x] 重跑单测，确认通过。

### 任务 4：课程目录、单元和任务选择

**涉及文件：**
- 修改：`src/components/catalog/CourseCatalog.tsx`
- 修改：`src/components/catalog/UnitOverview.tsx`
- 修改：`src/styles/catalog.css`
- 测试：`src/components/catalog/CourseCatalog.test.tsx`
- 测试：`src/components/catalog/UnitOverview.test.tsx`

- [x] 新增 `CourseCatalog.test.tsx` 的科目无登记单元空态测试，并确认年级、学期、学科选择仍可用；新增 `UnitOverview.test.tsx` 的待开放难度说明测试，保留现有返回目录路径测试。
- [x] 运行 `npm run test:unit -- src/components/catalog/CourseCatalog.test.tsx src/components/catalog/UnitOverview.test.tsx`，确认新增断言失败。
- [x] 优化课程选择、课程卡、教材信息、任务轨道和空状态的阅读层级与窄屏顺序；只将真实空列表接入空状态，结构缺失仍按内容问题处理。
- [x] 重跑上述单测，确认通过。

### 任务 5：学习答题、反馈与结果页

**涉及文件：**
- 修改：`src/components/game/SessionPlayer.tsx`
- 修改：`src/components/game/SessionSummary.tsx`
- 修改：`src/components/game/ActivityFeedback.tsx`
- 修改：`src/components/game/ActivityRenderer.tsx`
- 修改：六种题型活动组件（`ChoiceActivity.tsx`、`MatchActivity.tsx`、`OrderActivity.tsx`、`CategorizeActivity.tsx`、`ArithmeticActivity.tsx`、`MeasurementActivity.tsx`）
- 修改：`src/styles/game.css`
- 测试：以上组件各自已有的 `*.test.tsx` 文件

- [x] 在 `SessionPlayer.test.tsx` 验证切换新题和显示结果后焦点进入新内容；在 `ActivityRenderer.test.tsx` 验证反馈出现时题干仍在且以状态播报，并为六种题型验证有名称的答题控件。保留现有 `ActivityFeedback` 状态播报和本地语音开关测试。
- [x] 运行 `npm run test:unit -- src/components/game`，确认新增断言至少有一个按预期失败。
- [x] 按题型检查桌面/窄屏内容密度、点击/触控区域、长文案换行和焦点样式；只改展示与必要的语义标记。
- [x] 重跑 `npm run test:unit -- src/components/game`，确认学习流程回归通过。

### 任务 6：成长概览、学习星图和成就

**涉及文件：**
- 修改：`src/components/growth/GrowthPage.tsx`
- 复核： `src/components/achievements/AchievementDashboard.tsx`、`src/components/achievements/AchievementSummary.tsx`（保留已有零进度展示）
- 修改：`src/styles/growth.css`
- 测试：`src/components/growth/GrowthPage.test.tsx`
- 测试：`src/components/achievements/AchievementDashboard.test.tsx`
- 测试：`src/components/achievements/AchievementSummary.test.tsx`

- [x] 在 `GrowthPage.test.tsx` 增加课程与闯关分别为空、近期记录为空、存储异常不冒充空记录的测试；保留已有键盘切换测试。`AchievementDashboard.test.tsx` 和 `AchievementSummary.test.tsx` 已覆盖零进度头衔及进度条，复核后不重复添加。
- [x] 先运行 `npm run test:unit -- src/components/growth/GrowthPage.test.tsx`，新增的两项空态测试按预期失败；错误态区分已由既有断言覆盖。
- [x] 复用 任务 1 空状态组件与样式，优化成长概览卡片和近期记录空态；复核星图区、徽章和课程列表已有的窄屏网格规则，不新增成就门槛或汇总算法。
- [x] 重跑 `npm run test:unit -- src/components/growth/GrowthPage.test.tsx src/components/achievements/AchievementDashboard.test.tsx src/components/achievements/AchievementSummary.test.tsx`，3 个文件、13 项测试通过。

### 任务 7：闯关中心、路线、答题、结果和错题本

**涉及文件：**
- 修改：`src/challenges/ui/ChallengeCenter.tsx`
- 修改：`src/challenges/ui/ChallengeGroup.tsx`
- 修改：`src/challenges/ui/ChallengeResult.tsx`
- 修改：`src/challenges/ui/ChallengeWrongQuestions.tsx`
- 修改：`src/challenges/ui/challenge.css`
- 复核： `src/challenges/ui/ChallengePage.tsx`、`src/challenges/ui/ChallengeRunner.tsx`（保留已有质量门禁、读取错误和答案保存保护）
- 测试：对应的 `ChallengeCenter.test.tsx`、`ChallengePage.test.tsx`、`ChallengeRunner.test.tsx`、`ChallengeResult.test.tsx`、`ChallengeWrongQuestions.test.tsx`

- [x] 增加无挑战路线、错题本空记录及筛选分类为空的测试；验证题库加载错误与质量门禁状态仍有明确区分；增加全答对反馈断言。配额失败重试及最终答案写入后才展示结果已由现有 `ChallengeRunner` 测试覆盖。
- [x] 先运行计划中的 5 个测试文件，3 项新空态断言按预期失败，其余 37 项通过。
- [x] 复用共享空状态，调整挑战入口、错题本和全答对结果文案；将未通过门禁的路线标为“暂不可用”。保留单题提交、音效时序、评分、状态机和 IndexedDB 边界。
- [x] 重跑上述挑战单测：5 个文件、40 项测试通过；运行 `npm run challenge:quality`：0 个阻断，1723 条提示。

### 任务 8：设置、偏好和备份/恢复页

**涉及文件：**
- 修改：`src/components/settings/SettingsPanel.tsx`
- 修改：`src/styles/settings.css`
- 修改：`src/challenges/ui/ChallengeBackupPanel.tsx`
- 修改：`src/challenges/ui/ChallengeDataManagement.tsx`
- 修改：`src/challenges/ui/challenge.css`
- 复核： `SettingsPage`、`ThemeSwitcher`、`ChallengeDataManagementPage` 现有偏好、入口及错误恢复行为
- 测试：`src/components/settings/SettingsPage.test.tsx`、新增 `src/components/settings/SettingsPanel.test.tsx`
- 测试：`src/components/settings/SettingsDialog.test.tsx`
- 测试：`src/challenges/ui/ChallengeDataManagementPage.test.tsx`
- 测试：`src/challenges/ui/ChallengeDataManagement.test.tsx`
- 测试：`src/challenges/ui/ChallengeBackupPanel.test.tsx`

- [x] 核对设置页偏好分区和备份入口；增加无可选课程起点、无恢复点、隔离列表为空、导入文件未选择时的断言。
- [x] 首轮定向测试中 4 类新增空态断言按预期失败；另修正一处测试文本定位过于严格的问题。
- [x] 复用空状态组件，明确恢复点、隔离记录和导入预览的内容层级；不改变备份内容、偏好默认值、安全合并或恢复事务。
- [x] 重跑 `npm run test:unit -- src/components/settings src/challenges/ui/ChallengeDataManagementPage.test.tsx src/challenges/ui/ChallengeDataManagement.test.tsx src/challenges/ui/ChallengeBackupPanel.test.tsx`，6 个文件、36 项测试通过。

### 任务 9：路由加载、错误、未开放、未找到与全局提示

**涉及文件：**
- 修改：`src/App.tsx`
- 修改：`src/components/layout/ProjectLegalFooter.tsx`
- 修改：`src/styles/app-shell.css` 和涉及的页面样式
- 测试：`src/App.test.tsx`、`src/app/router.test.ts`、`src/app/TextbookMigrationGate.test.tsx`
- 端到端测试：`tests/e2e/smoke.spec.ts`、`tests/e2e/catalog.spec.ts`、`tests/e2e/home-dashboard.spec.ts`、`tests/e2e/growth-center.spec.ts`、`tests/e2e/challenge-flow.spec.ts`、`tests/e2e/settings-achievements.spec.ts`

- [x] 在 `App.test.tsx` 覆盖加载、加载失败、教材准备中、未找到路由的说明与恢复操作；在 `TextbookMigrationGate.test.tsx` 验证加载/错误卡片遵循组件规范、迁移保护说明和重试入口可见；保留 `router.test.ts` 的路由解析覆盖。
- [x] 运行 `npm run test:unit -- src/App.test.tsx src/app/router.test.ts src/app/TextbookMigrationGate.test.tsx`：3 个文件、33 项测试通过。构建曾发现测试夹具用了无效状态 `planned`，按实际类型修正为 `comingSoon` 后通过。
- [x] 统一系统状态页面的卡片、宽度和间距表现；检查迁移提示不遮挡主要操作；没有改变路由解析或加载时序。
- [x] 路由、错题本、挑战准备和数据管理页共用有状态播报的 `LoadingState`；星环、指南针和提示点轻柔循环，不延迟内容。`prefers-reduced-motion: reduce` 时关闭全部动画。
- [x] 排查错题本/数据管理长期停留在读取状态：挑战仓库清理延后到微任务，避免 React 严格模式副作用重放后复用已关闭实例；本机读取超过 10 秒后进入错误态并提供重新读取入口。覆盖严格模式重放和永久 pending 的回归用例。
- [x] 根据最终复查补齐闯关进度与答题页的读取保护：进度读取超过 10 秒后停止显示伪造的 `0/5`，明确标记进度暂不可用并提供重试；答题页初始恢复及开始/完成前的本机读取超时后显示可恢复状态。开始前读取超时时不创建半成品挑战；若最后答案已写入但进度读取超时，保留完整答案并提供“重试保存成绩”，不误报为答案未保存。以永久 pending 的测试确认这些路径。
- [x] 运行六组 Playwright 回归：`npm run test:e2e -- tests/e2e/smoke.spec.ts tests/e2e/catalog.spec.ts tests/e2e/home-dashboard.spec.ts tests/e2e/growth-center.spec.ts tests/e2e/challenge-flow.spec.ts tests/e2e/settings-achievements.spec.ts`，90 项全部通过。首轮发现零进度摘要被空态改动隐藏、错题本标题断言因空态副标题产生歧义；已保留零值指标并精确标题查询后重跑通过。

### 任务 10：全站回归与验收

**涉及文件：**
- 复核：本计划涉及的所有文件
- 验证：`npm run test:unit`、`npm run test:e2e`、`npm run build`、`git diff --check`

- [x] 浏览器抽查首页、全局页眉与浮层菜单、设置页和成长页；成长页空状态检查了浅色与深色主题。深色检查发现共享空状态卡片对比度不足，已补充深色主题变量并重启 Vite 复核。
- [x] 重启开发预览并在错题本页面确认读取结束后出现标题、记录数和空态；开发预览之前曾提供旧转译模块，因此旧版“持续读取”画面不作为代码故障证据。严格模式生命周期问题由组件集成回归测试复现并验证修复。
- [ ] 尚未完成全部路由、390px/768px/1365px 视口、两种主题、键盘顺序、焦点、减少动态效果及所有适用数据状态的逐项人工验收。动效的减少动态效果规则已由 CSS 明确声明，但完整浏览器矩阵仍待逐项复核；端到端自动化覆盖相关页面并通过，不能替代人工验收。
- [x] 运行全量单测：`npm run test:unit -- --testTimeout=10000`，267 个测试文件、1,688 项通过。默认 5 秒阈值的首次全量运行有 2 项成就/成长测试在负载下超时；两文件独立重跑 12/12 通过，提高测试运行时限后全量通过。
- [x] 运行页面族端到端回归：91 项全部通过，包含正常加载动画及 `prefers-reduced-motion` 浏览器断言；首轮发现零进度摘要被空态改动隐藏、错题标题查询歧义后已修复重跑通过。
- [x] 运行 `npm run build`：TypeScript 与 Vite 构建通过；最大 JavaScript 分块为 435.26 KB，低于 500 KB 提示线。
- [x] 运行 `git diff --check`：通过；检查 `git status --short`，确认大量既有课程、教材迁移和题库审校修改仍在工作区，未暂存、覆盖或提交。
- [x] 运行 `npm run challenge:quality`：0 个阻断项、1,723 条提示。
- [x] 只读独立审查发现的进度读取/答题恢复问题已补测并修复；复审未发现严重问题或重复提交/重复计分风险。
- [x] 汇报自动化验证和人工检查限制；不提交、不推送。

**验收限制：**本轮实现、组件测试与自动化回归已覆盖计划内页面族，但规格要求的全路由人工视觉与交互检查尚未全部完成。错题本长时间读取现象在预览服务器刷新后消失；严格模式生命周期问题有回归测试证据。完整的视口、主题、键盘及减少动态效果人工矩阵仍待完成。
