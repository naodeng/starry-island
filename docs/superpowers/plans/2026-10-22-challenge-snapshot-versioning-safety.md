# 闯关快照版本与严重题目停用实施计划

> **执行者说明：** 实施时必须使用 `superpowers:executing-plans` 技能逐项执行。任务步骤使用复选框追踪。

**目标：** 为进行中的闯关快照增加独立结构版本，安全迁移 IndexedDB v3 与旧 v1 备份，并确保已停用的严重缺陷题只阻断相关快照。

**架构：** `snapshotSchemaVersion` 与 `contentManifestVersion` 分离；数据库升级负责本地旧记录，备份导入先验证原始 SHA-256 再归一化旧快照。进入不可用任务时先读取已有快照：只有快照引用当前清单的 `disabled` 题目才暂停，其他快照可继续；不可用组不允许新开挑战。

**技术栈：** React 19、TypeScript 7、IndexedDB、Vitest 5、Playwright、Node.js 22.16.0。

**设计规格：** [闯关题库质量命令行工具与发布门禁设计](../specs/2026-10-22-challenge-question-bank-quality-cli-design.md)（第 1、2、5.3 节）。

## 全局约束

- 新建快照的 `snapshotSchemaVersion` 为 `1`；`contentManifestVersion` 继续记录题库内容版本，不得互相替代。
- IndexedDB 原结构版本为 3，本计划升级至 v4；迁移活动记录与 24 小时恢复点内的进行中快照时，保留冻结题目、答案、题目顺序、种子和修订号。
- 旧 v1 JSON 备份仍可导入，备份外层仍为 v1；必须先校验原始文件摘要，再补齐旧快照版本字段。
- 未知快照版本不得推测转换或覆盖；必须保留原始记录并走现有隔离/恢复提示路径。
- `unavailable` 组禁止新开，但不能只因组状态变化中断已保存快照；仅当前已载入清单中显式 `disabled` 的引用题会触发安全暂停。
- 静态应用的旧页面或离线旧版本无法收到远端停用状态；不得新增后端、强制自动重载或即时远程禁用服务。
- 不修改 `china-study-progress-v1`、现有课程学习交互或闯关历史奖励；不引入新依赖。
- 按 TDD 先写并运行失败测试，再实现；过程文档使用中文。

## 审查重点

1. **IndexedDB v3 旧快照**：升级只补充结构版本，其他字段与已保存答案不变。对应任务 2 的 v3→v4 迁移测试。
2. **旧 v1 备份**：先按原始内容校验摘要，再归一化；篡改摘要不得被归一化掩盖。对应任务 3 的兼容与损坏文件测试。
3. **未知快照版本**：不把未知值当旧版本迁移，原始内容仍可恢复。对应任务 2、3 的隔离/拒绝测试。
4. **不可用组中的进行中挑战**：先检查快照；未引用 disabled 题时继续，引用时暂停且不写入或丢弃记录。对应任务 4 的组件与仓库状态断言。
5. **静态旧页面/离线运行**：不宣称新发布能即时中止仍使用旧清单的标签页。对应任务 4 的现有限制说明，并回归已载入挑战断网完成流程。

## 文件职责

- `src/challenges/domain/types.ts`：进行中快照和备份数据的类型。
- `src/challenges/domain/snapshotSchema.ts`：当前快照结构版本常量及已知版本辅助判断。
- `src/challenges/domain/backup.ts`：当前快照验证、旧 v1 备份输入类型与导入归一化。
- `src/challenges/storage/indexedDbRepository.ts`：数据库版本迁移、有效记录检查和异常记录保留。
- `src/challenges/content/pilotContent.ts`：向任务运行器提供当前清单中的安全停用题目 ID。
- `src/challenges/ui/ChallengePage.tsx`、`ChallengeRunner.tsx`：区分恢复已保存挑战与新开挑战，执行安全暂停提示。
- `docs/challenges/DATA_MODEL.md`、`ARCHITECTURE.md`、`REQUIREMENTS_TRACEABILITY.md`、`TEST_STRATEGY.md`：记录版本、迁移和证据边界。

---

### Task 1: 新增进行中快照结构版本

**文件：**

- 新建：`src/challenges/domain/snapshotSchema.ts`
- 修改：`src/challenges/domain/types.ts`
- 修改：`src/challenges/ui/ChallengeRunner.tsx`
- 测试：`src/challenges/ui/ChallengeRunner.test.tsx`、`src/challenges/domain/attempt.test.ts`

**接口：**

- 新增：`CURRENT_ATTEMPT_SNAPSHOT_SCHEMA_VERSION`，常量值为 `1`。
- `ChallengeAttempt` 新增必填字段 `snapshotSchemaVersion: number`。
- 新建挑战时写入当前快照结构版本，保留现有 `contentManifestVersion` 的写入行为。

- [ ] **步骤 1：先写失败测试**

  在 `ChallengeRunner.test.tsx` 增加 `writes snapshot schema version 1 when starting a challenge`：开始挑战后检查 IndexedDB 中的快照含 `snapshotSchemaVersion: 1`，且 `contentManifestVersion` 仍为传入的题库版本。

- [ ] **步骤 2：确认测试失败**

  运行：`npm run test:unit -- src/challenges/ui/ChallengeRunner.test.tsx`

  预期：新断言因当前快照缺少结构版本字段而失败。

- [ ] **步骤 3：实现最小改动**

  在 `snapshotSchema.ts` 导出当前版本常量；更新 `ChallengeAttempt` 并在 `ChallengeRunner.startAttempt()` 创建记录时写入该常量。更新现有测试构造器，使新建的受支持快照均明确携带版本。

- [ ] **步骤 4：运行相关测试**

  运行：`npm run test:unit -- src/challenges/ui/ChallengeRunner.test.tsx src/challenges/domain/attempt.test.ts`

  预期：全部通过，答题、评分和修订号断言保持不变。

- [ ] **步骤 5：提交本任务**

  提交信息：`feat(challenges): version active attempt snapshots`

### Task 2: 将 IndexedDB v3 快照迁移到 v4

**文件：**

- 修改：`src/challenges/storage/indexedDbRepository.ts`
- 测试：`src/challenges/storage/indexedDbRepository.test.ts`

**接口：**

- `CHALLENGE_DATABASE_VERSION` 从 `3` 增至 `4`。
- 数据库升级路径为现有 v1→v2→v3 后再执行 v3→v4；`attempts` 与 `recovery-point` 中符合旧结构的进行中快照补入结构版本 `1`。
- 迁移函数接收升级事务；对 `attempts` 使用该事务中的游标更新。不得在 `upgradeneeded` 完成后另开事务补版本。
- 当前数据库记录验证拒绝未知结构版本，既有隔离仓库保留原始异常记录。

- [ ] **步骤 1：先写失败迁移测试**

  增加 `upgrades a version 3 challenge database without changing its active attempt`：创建含活动快照、恢复点、成绩和最近题目记录的 v3 数据库；升级后断言活动快照和恢复点内快照仅增加版本 `1`，已保存答案、顺序、索引、种子、内容版本和修订号完全保留，其他仓库记录仍可读。

- [ ] **步骤 2：确认测试失败**

  运行：`npm run test:unit -- src/challenges/storage/indexedDbRepository.test.ts -t "version 3 challenge database"`

  预期：当前仓库版本仍为 3，迁移测试失败。

- [ ] **步骤 3：实现 v3→v4 迁移**

  将迁移回调扩展为可使用 `IDBTransaction`，在 v3→v4 的 `upgradeneeded` 事务内遍历并更新旧活动快照，并读取/更新 `recovery-point` 中经完整结构校验的旧快照；仅为确认属于旧结构且缺少字段的快照补版本 `1`。恢复点无法安全归一化时保持原样交给后续隔离流程。迁移失败应中止升级事务，由 IndexedDB 回滚，保留升级前数据库。将记录校验收紧为仅接受当前已支持的结构版本；未知版本记录由现有隔离仓库保留原始内容。

- [ ] **步骤 4：运行迁移和隔离测试**

  运行：`npm run test:unit -- src/challenges/storage/indexedDbRepository.test.ts`

  预期：v1、v2、v3 升级用例和异常记录隔离用例通过；原有数据字段无丢失。

- [ ] **步骤 5：提交本任务**

  提交信息：`fix(challenges): migrate active snapshot schema`

### Task 3: 兼容旧 v1 JSON 备份中的快照

**文件：**

- 修改：`src/challenges/domain/backup.ts`
- 修改：`src/challenges/ui/ChallengePage.tsx`
- 测试：`src/challenges/domain/backup.test.ts`、新增 `src/challenges/ui/ChallengePage.test.tsx` 或现有备份导入端到端用例

**接口：**

- 新增旧备份输入类型 `ChallengeBackupImportData`，允许 `attempts` 中的已知旧快照缺少 `snapshotSchemaVersion`。
- 新增 `normalizeImportedChallengeBackupData(data: ChallengeBackupImportData): ChallengeBackupData`；只接受当前版本或已知的无版本旧快照，统一产出当前 `ChallengeBackupData`。
- `parseChallengeBackup()` 返回已通过原始结构与摘要校验、但尚未归一化的导入类型；只有调用方在其成功后才能归一化，再生成预览或传给仓库。
- `ChallengeBackup` 外层格式和版本保持 `starry-island-challenge-backup` / `1`；新导出包含快照结构版本。

- [ ] **步骤 1：先写失败兼容测试**

  在 `backup.test.ts` 增加：旧 v1 备份缺少快照结构字段仍能通过原始摘要验证；归一化后字段为 `1` 且答案/题目快照不变；字段为未知版本时拒绝；篡改旧备份载荷时摘要验证失败。另断言新导出的进行中快照含版本字段且外层仍为 v1。

- [ ] **步骤 2：确认测试失败**

  运行：`npm run test:unit -- src/challenges/domain/backup.test.ts`

  预期：旧记录当前不能被正确区分和归一化，新增断言失败。

- [ ] **步骤 3：实现验证与归一化顺序**

  拆分“备份导入形状校验”和“当前本地记录校验”：`parseChallengeBackup()` 必须先接受当前快照或已知旧快照形状，基于未修改的导入载荷校验 SHA-256，返回导入类型；页面仅在解析成功后调用归一化函数，再生成预览或合并。仓库和新导出仍严格要求当前版本字段。不得在摘要校验前复制、补字段或序列化改写输入。旧偏好字段仍按原备份规则处理。

- [ ] **步骤 4：运行备份与导入测试**

  运行：`npm run test:unit -- src/challenges/domain/backup.test.ts src/challenges/domain/backupMerge.test.ts`，并运行：`npm run test:e2e -- tests/e2e/challenge-flow.spec.ts --workers=1`。

  预期：旧 v1 与新 v1 备份可导入，完整性失败和未知结构不会写入 IndexedDB，合并仍保留本机进行中记录。

- [ ] **步骤 5：提交本任务**

  提交信息：`fix(challenges): preserve legacy snapshot backups`

### Task 4: 按当前清单安全暂停严重缺陷快照

**文件：**

- 修改：`src/challenges/content/pilotContent.ts`
- 修改：`src/challenges/ui/ChallengePage.tsx`
- 修改：`src/challenges/ui/ChallengeRunner.tsx`
- 测试：`src/challenges/ui/ChallengeRunner.test.tsx`、必要时 `tests/e2e/challenge-flow.spec.ts`

**接口：**

- `LoadedPilotGroup` 增加 `disabledQuestionIds: string[]`，来源为当前已加载清单的显式 `disabled` 记录。
- 任务页把“能否新开挑战”和“能否恢复已保存快照”分开：先读取快照；只有无快照且组状态不是 `ready` 时显示不可开场提示。
- 恢复时如快照 ID 命中 `disabledQuestionIds`，释放写入租约、保留原记录并显示中文安全暂停说明；不得自动丢弃、保存答案或记成绩。
- 停用检查必须在租约内重新读取快照后执行，并先于“所有题目已有答案”的自动补记成绩分支；`startAttempt()` 发现并转为恢复另一标签页的现有快照时也执行同一检查。

- [x] **步骤 1：先写失败页面测试**

  在 `ChallengeRunner.test.tsx` 覆盖不可用组且无快照时不能新开、命中 disabled 的已答快照安全暂停以及并发恢复安全检查；在 `ChallengePage.test.tsx` 覆盖不可用组路由仍能恢复未命中 disabled 的冻结快照。

- [x] **步骤 2：确认测试失败**

  运行：`npm run test:unit -- src/challenges/ui/ChallengeRunner.test.tsx src/challenges/ui/ChallengePage.test.tsx`

  结果：不可用组直接新开测试因显示开始按钮而失败；已答且命中 disabled 的快照被错误自动补记成绩；页面级恢复测试因 `ChallengePage` 过早拦截而失败。

- [x] **步骤 3：实现恢复优先检查**

  由内容加载器生成 `disabledQuestionIds`。调整 `ChallengePage`，使任务运行器可以先检查现有快照；调整运行器，仅在新开场景要求组状态为 `ready`，恢复场景在租约内重新读取快照后、任何自动完成或续答处理前按快照 ID 执行安全检查。`startAttempt()` 的并发恢复分支也必须检查。安全暂停时明确释放写入租约且不触碰持久化状态或成绩。

- [x] **步骤 4：运行组件和相关浏览器回归**

  运行：`npm run test:unit -- src/challenges/ui/ChallengeRunner.test.tsx src/challenges/ui/ChallengePage.test.tsx src/challenges/content/pilotContent.test.ts`

  若新增/修改任务页或恢复 UI，再运行：`npm run test:e2e -- tests/e2e/challenge-flow.spec.ts --workers=1`

  结果：上述定向单测 20 项通过；`tests/e2e/challenge-flow.spec.ts` 14 项通过；全量单测 141 个文件、961 项通过；`npm run build` 和 `git diff --check` 通过。旧页面限制在 Task 5 文档中说明，不新增自动重载。

- [x] **步骤 5：提交本任务**

  提交信息：`fix(challenges): pause disabled active attempts safely`

### Task 5: 同步需求与验证证据

**文件：**

- 修改：`docs/challenges/DATA_MODEL.md`
- 修改：`docs/challenges/ARCHITECTURE.md`
- 修改：`docs/challenges/REQUIREMENTS_TRACEABILITY.md`
- 修改：`docs/challenges/TEST_STRATEGY.md`

- [x] **步骤 1：先写文档断言或清单检查**

  已用 `rg` 核对 `snapshotSchemaVersion`、数据库 v4、旧 v1 备份先校验摘要再归一化、disabled 暂停时机及静态旧页面限制；文档没有把本地证据写成远端 CI 或即时远程禁用。

- [x] **步骤 2：更新中文文档**

  已更新数据模型、架构设计、需求追踪矩阵和测试方案。REQ-039、REQ-040、REQ-041 标为当前本地功能切片证据；题库质量 CLI、全课程闯关覆盖和远端发布仍未完成。

- [x] **步骤 3：运行全量质量验证**

  运行：`npm run test:coverage`、`npm run test:e2e -- --workers=1`、`npm run build`、`git diff --check`。

  结果：覆盖率测试 141 个文件、961 项通过（语句 89.72%、分支 84.54%、函数 90.22%、行 91.28%）；完整 Chromium 回归 33/33 通过；构建通过，最大 JavaScript 分块 316.56 kB，无超过 500 kB 提示；`git diff --check` 通过。验证仅为本地证据。

- [x] **步骤 4：提交文档与最终证据**

  提交信息：`docs(challenges): document snapshot safety migration`

## 计划外内容

- 不实现题库质量 CLI、全课程题目扩充、远程禁用、Service Worker 或即时强制更新；这些由配套的题库质量 CLI 实施计划或后续需求处理。
