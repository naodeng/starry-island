# 星岛学园设置与备份恢复页面实施计划

> **执行方式：** 由当前会话按用户此前选择的 Native 方式实施，遵循 TDD。过程文档使用中文。

**目标：** 将弹窗设置改为独立设置页，并把闯关备份、恢复、诊断及隔离记录管理移到独立的 `/settings/backup` 页面。

**架构：** `/settings` 使用共享页眉，复用主题、语音开关和学习起点行为；`/settings/backup` 单独惰性加载闯关数据管理页面。把当前 ChallengeCenter 中的备份/导入 UI 与 ChallengePage 中的仓库操作迁出，复用既有领域逻辑、IndexedDB 仓库和 `ChallengeDataManagement`。新的数据管理页面不得加载闯关题库。

**技术栈：** React、TypeScript、Vite、animal-island-ui、Vitest、Playwright；不新增依赖或后端服务。

**规格：** [全局导航、首页与成长中心设计规格](../specs/2026-10-24-starry-island-navigation-home-growth-design.md)

**依赖：** 计划一完成共享页眉和路由骨架；成长计划完成后，设置中的成就入口指向 `/growth`。

## 全局约束

- 保留系统/浅色/深色主题、设备本地语音偏好和当前学习起点选择行为。
- 学习起点仍清楚说明会替换其后的本机进度；只有有效课程位置可保存。
- 闯关备份仅包含挑战域数据；课程进度和课程活动历史不得进入备份。
- 保留用户此前确认的备份可选偏好、默认不应用偏好、预览确认、安全合并、隔离记录先预览后恢复等行为。
- 迁移页面时不复制已有领域规则，不自动清除、覆盖或导入数据。
- `/challenges` 只保留挑战入口、路线和成长/错题导航，不显示备份、诊断、恢复点或隔离记录管理。
- `/settings/backup` 通过独立懒加载页面实现，不导入 ChallengePage 或 `pilotContent`。

## 审查重点

- 学习起点更改继续调用现有 `setLearningStart`，保留二次确认和替换进度说明。
- 旧课程目录内的设置入口仍可工作，进入 `/settings`；全局菜单设置入口也可工作。
- 新数据页面读取失败时明确说明且不改本机记录；导入仍须预览并确认。
- 挑战中心不能再挂载或触发数据管理回调；数据管理路由不加载挑战内容模块。
- 备份成功合并后才应用用户主动勾选的偏好，且课程进度完全不受影响。

---

### 任务 1：将弹窗设置迁移到 `/settings` 页面

**文件：**

- 修改：`src/app/router.ts`、`src/app/router.test.ts`
- 修改：`src/App.tsx`
- 新建：`src/components/settings/SettingsPage.tsx`、`src/components/settings/SettingsPage.test.tsx`
- 修改：`src/components/settings/SettingsDialog.tsx`、`src/components/settings/SettingsDialog.test.tsx`
- 修改：`src/components/catalog/CourseCatalog.tsx`、`src/components/catalog/CourseCatalog.test.tsx`
- 新建或修改：`src/styles/settings.css`

**接口：**

- AppRoute 增加 `settings` 和 `settingsBackup`。
- `SettingsPage` 接收现有 `ProgressState`、`onApplyLearningStart` 和导航回调；偏好仍由现有 ThemeProvider、SoundProvider 管理。
- 原课程目录设置入口成为 `/settings` 链接；设置内课程成就入口指向 `/growth`。

- [x] **步骤 1：编写路由和页面失败测试**

  在 router 测试中覆盖 `/settings` 与 `/settings/backup`；新增 `SettingsPage.test.tsx` 覆盖主题选项、语音开关、学习起点选择、进度替换说明、保存反馈和成长入口。

- [x] **步骤 2：确认测试按预期失败**

  运行：`npm run test:unit -- src/app/router.test.ts src/components/settings/SettingsPage.test.tsx`

  预期：路由和新页面尚不存在而失败。

- [x] **步骤 3：实现独立设置页并迁移目录入口**

  使用语义化 `main`/`h1` 与现有 Animal Island 控件；沿用 `getRegisteredLearningPositions`、`setLearningStart`、ThemeSwitcher 和 SoundProvider。移除 CourseCatalog 对设置弹窗的依赖；保留原设置入口的可达性并导航到 `/settings`。

- [x] **步骤 4：验证旧设置行为和课程回归**

  运行：`npm run test:unit -- src/components/settings/SettingsPage.test.tsx src/components/settings/SettingsDialog.test.tsx src/components/catalog/CourseCatalog.test.tsx src/storage/progress.test.ts`

  运行：`npm run test:unit`

  预期：已有偏好和学习起点测试仍通过；旧弹窗不再有重复的独立入口。

  提交信息：`feat(settings): move preferences to a dedicated page`

### 任务 2：把挑战数据管理迁到独立页面

**文件：**

- 修改：`src/app/router.ts`、`src/app/router.test.ts`、`src/App.tsx`
- 新建：`src/challenges/ui/ChallengeBackupPanel.tsx`、`src/challenges/ui/ChallengeBackupPanel.test.tsx`
- 新建：`src/challenges/ui/ChallengeDataManagementPage.tsx`、`src/challenges/ui/ChallengeDataManagementPage.test.tsx`
- 修改：`src/challenges/ui/ChallengeCenter.tsx`、`src/challenges/ui/ChallengeCenter.test.tsx`
- 修改：`src/challenges/ui/ChallengePage.tsx`、`src/challenges/ui/ChallengePage.test.tsx`
- 保留并复用：`src/challenges/ui/ChallengeDataManagement.tsx`、`src/challenges/ui/ChallengeDataManagement.test.tsx`
- 修改：`src/challenges/ui/challenge.css`

**接口：**

- 新路由 `/settings/backup` 懒加载 `ChallengeDataManagementPage`；该页面创建并关闭独立 ChallengeRepository。
- `ChallengeBackupPanel` 承载当前 ChallengeCenter 的导出、文件选择、预览、偏好勾选、确认/取消、诊断导出 UI。
- `ChallengeDataManagementPage` 组合备份面板与既有 `ChallengeDataManagement`；仓库处理沿用既有 backup、backupMerge、recovery、quarantineRecovery 逻辑。
- `ChallengeCenter` 删除数据管理 props 与面板，仅显示前往 `/settings/backup` 的入口。
- `ChallengePage` 的题库加载仅对闯关中心、挑战组、挑战任务路由执行；备份管理页不复用此模块。

- [x] **步骤 1：迁移现有 UI 测试到新所有者并写页面失败测试**

  将 `ChallengeCenter.test.tsx` 的导入导出、偏好、预览、安全合并和诊断用例迁至 `ChallengeBackupPanel.test.tsx`；保留中心页面入口断言。为数据管理页补充恢复点/隔离记录属性转交、导入失败保护和无题库加载断言。

- [x] **步骤 2：先确认新面板和页面测试失败**

  运行：`npm run test:unit -- src/challenges/ui/ChallengeBackupPanel.test.tsx src/challenges/ui/ChallengeDataManagementPage.test.tsx src/challenges/ui/ChallengeCenter.test.tsx`

  预期：独立数据管理页面和新入口尚不存在而失败；迁移的现有合并语义测试仍有可执行的明确断言。

- [x] **步骤 3：抽取备份 UI 和数据管理页面**

  将当前已验证的面板状态/文案移动到 `ChallengeBackupPanel`，不重写合并算法。数据管理页集中管理 repository、导出、导入预览和确认、恢复点、诊断及隔离记录操作；使用 `try/finally` 或 effect cleanup 关闭仓库。

- [x] **步骤 4：从 ChallengeCenter 移除数据管理责任**

  删除中心页备份/诊断/恢复/隔离记录 props 和对应渲染；增加“设置与数据管理”入口指向 `/settings/backup`。挑战路线继续使用原清单、进度和路由。

- [x] **步骤 5：新增懒加载路由并隔离题库模块**

  App 对 `/settings/backup` 单独 `lazy()` 导入数据管理页。ChallengePage 仅当路由需要挑战路线/题目内容时调用 `loadPilotChallengeContent`。加测试或构建图检查，确保管理页面依赖图不包含 `pilotContent`/完整题目活动。

- [ ] **步骤 6：运行单测、浏览器回归、构建并提交**

  运行：`npm run test:unit -- src/challenges/ui/ChallengeBackupPanel.test.tsx src/challenges/ui/ChallengeDataManagementPage.test.tsx src/challenges/ui/ChallengeDataManagement.test.tsx src/challenges/ui/ChallengeCenter.test.tsx src/challenges/ui/ChallengePage.test.tsx`

  运行：`npm run test:unit`

  运行：`npm run test:e2e -- tests/e2e/settings-achievements.spec.ts tests/e2e/challenge-flow.spec.ts`

  运行：`npm run build`

  运行：`git diff --check`

  手动检查桌面/窄屏、浅/深色、键盘焦点和 reduced motion。预期：备份与隔离恢复流程保持原有语义，闯关中心不再承载设置数据管理。

  提交信息：`feat(settings): move challenge backup and recovery out of challenge center`

  验证记录：全量单测、生产构建、`git diff --check` 与桌面/窄屏页面检查已通过。Playwright E2E 未能启动，macOS Chromium 报 `bootstrap_check_in` 权限错误并退出 `SIGTRAP`；因此该步骤保持未完成，需在可启动 Chromium 的环境复验。
