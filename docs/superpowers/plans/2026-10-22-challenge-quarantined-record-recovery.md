# 闯关隔离记录安全恢复实施计划

> **执行者说明：** 实施时必须使用 `superpowers:executing-plans` 技能逐项执行。本计划使用复选框追踪步骤；按用户已选择的 Native 方式由当前会话逐项实现，不使用子代理。

**目标：** 为闯关隔离记录增加只读预览、逐条确认和单事务恢复能力，只恢复当前有效记录或已知旧快照格式。

**架构：** 在纯领域函数中集中处理来源、原因、格式、键和有效期资格，复用现有备份验证与旧快照归一化。仓库提供按主键分页的安全摘要、五分钟单次预览令牌，并在 IndexedDB 读写事务中重新验证后写入原目标仓库并删除隔离副本。界面不呈现原始内容，现有隔离 JSON 导出格式保持不变。

**技术栈：** React、TypeScript、IndexedDB、Vitest、`fake-indexeddb`、Playwright；不新增依赖或服务端。

**规格：** [闯关隔离记录安全恢复设计](../specs/2026-10-22-challenge-quarantined-record-recovery-design.md)

## 全局约束

- 只恢复通过当前完整校验的记录，或按既有规则确定性归一化的旧快照；旧快照只补入结构版本 `1`。
- 未知格式、缺少关键字段、来源/原因未知、来源键不一致、目标键冲突或无法稳定比较的值保留在隔离仓库。
- 先预览，用户逐条确认后才写入；活动记录写入和隔离记录删除必须处于同一个 IndexedDB 读写事务。
- 列表按隔离主键倒序，每页最多 50 条；预览令牌只在本机 Repository 实例内存中有效 5 分钟，确认、取消、替换、过期或关闭仓库后失效。
- 不重算成绩、不推断答案、不与活动记录合并；恢复点仅恢复为元数据，不自动执行其合并流程。
- 不修改课程 Task、`china-study-progress-v1`、现有答题器或学习交互；保持 Local First、静态部署和无上传边界。
- 普通备份、诊断和现有隔离 JSON 导出格式不增加隔离主键或预览令牌。
- 使用现有结构校验器，不另造一套规则；不新增依赖；过程文档和界面文案使用中文。
- 每个任务先写失败测试、验证失败、完成最小实现、运行相应验证并提交该任务的精确文件。

## 审查重点

- **已知旧格式与字段保真：** 旧进行中快照只补 `snapshotSchemaVersion: 1`，恢复点仅使用已存在的归一化规则；由任务 1 单测及任务 2 仓库测试覆盖。
- **缺字段、未知版本、来源键不匹配：** 不可恢复且隔离原文不变；由任务 1 的拒绝矩阵覆盖。
- **过期恢复点与无法稳定比较的值：** 不创建可确认预览；由任务 1 覆盖过期、循环引用和非普通对象。
- **预览后的竞争与主键冲突：** 并发更改时拒绝旧预览，不覆盖、不重复恢复；由任务 2 覆盖目标冲突、旧令牌和两个 Repository 实例竞争。
- **分页、隐私与导出兼容：** 每页最多 50 条，列表无原始题目/答案，隔离 JSON 格式维持版本 1；由任务 2、3、4 覆盖。

---

### 任务 1：定义可恢复资格和无损归一化

**文件：**

- 新建：`src/challenges/domain/quarantineRecovery.ts`
- 新建：`src/challenges/domain/quarantineRecovery.test.ts`

**接口：**

- `prepareQuarantinedRecordForRestore(input: QuarantinedRecordCandidate, now?: string): QuarantineRecoveryPreparation`
- `serializeQuarantineComparableValue(value: unknown): string | null`：对完整隔离行和候选做确定性比较序列化；遇到循环引用或不支持类型返回 `null`。
- `QuarantinedRecordCandidate` 为 `{ sourceStore: string; sourceKey: IDBValidKey; reasonCode: string; record: unknown }`。
- `QuarantineRecoveryPreparation` 是判别联合：`{ status: 'eligible'; targetStore: QuarantineTargetStore; targetKey: IDBValidKey; record: unknown; normalization: QuarantineNormalization }` 或 `{ status: 'blocked'; reason: QuarantineEligibilityBlockReason }`。
- `QuarantineTargetStore` 为 `'attempts' | 'taskProgress' | 'wrongQuestions' | 'challengeMeta'`；领域拒绝原因 `QuarantineEligibilityBlockReason` 为 `'unsupported-source' | 'unknown-reason' | 'invalid-record' | 'unsupported-snapshot-version' | 'source-key-mismatch' | 'inactive-recovery-point' | 'uncomparable-value'`。
- `QuarantineNormalization` 仅允许 `'none' | 'attempt-snapshot-v1' | 'recovery-point-snapshot-v1'`。

- [ ] **步骤 1：写资格规则失败测试**

  新增 `accepts-current-attempt-without-normalization`、`accepts-current-task-progress-without-normalization`、`accepts-current-wrong-question-without-normalization`、`accepts-current-recent-question-meta-without-normalization`、`accepts-active-current-recovery-point-without-normalization`、`normalizes-known-legacy-attempt-by-adding-only-version`、`normalizes-known-legacy-attempts-in-recovery-point` 和 `rejects-records-missing-required-fields`。逐项比较候选与原记录，断言唯一允许的新字段是 `snapshotSchemaVersion: 1`。

- [ ] **步骤 2：运行测试确认失败**

  运行：`npm run test:unit -- src/challenges/domain/quarantineRecovery.test.ts`

  预期：因模块或 `prepareQuarantinedRecordForRestore` 尚不存在而失败。

- [ ] **步骤 3：实现纯资格函数**

  在新模块中用现有 `isChallengeBackupData()`、`normalizeImportedChallengeBackupData()`、`isChallengeRecoveryPoint()` 与 `isChallengeRecoveryPointActive()` 校验各类型；集中维护允许的 `sourceStore`/`reasonCode` 对。校验 `sourceKey` 与记录业务主键相等。使用显式稳定序列化校验隔离行和候选；只接受 `null`、布尔、字符串、有限数字、数组、普通对象及对象属性 `undefined`，拒绝循环引用和其他结构化克隆类型。不得复制 `backup.ts` 的结构校验逻辑。

- [ ] **步骤 4：补齐拒绝边界并运行测试**

  新增 `rejects-unknown-source-and-reason`、`rejects-source-key-mismatch-and-unknown-snapshot-version`、`rejects-expired-or-future-recovery-points` 和 `rejects-cyclic-or-unsupported-structured-clone-values`。断言被拒绝的候选没有可写记录。

  运行：`npm run test:unit -- src/challenges/domain/quarantineRecovery.test.ts`

  预期：全部通过，不接触 IndexedDB。

- [ ] **步骤 5：提交任务**

  提交信息：`feat(challenges): validate quarantine recovery candidates`

### 任务 2：实现分页预览和原子仓库恢复

**文件：**

- 修改：`src/challenges/storage/repository.ts`
- 修改：`src/challenges/storage/indexedDbRepository.ts`
- 修改：`src/challenges/storage/indexedDbRepository.test.ts`

**接口：**

- `getQuarantinedRecordPage(afterKey?: IDBValidKey): Promise<QuarantinedRecordPage>`：以倒序游标读取最多 51 条，用前 50 条作为当前页并返回下一页边界；页面项仅含 `quarantineId`、安全元数据、资格状态、阻断原因和目标摘要，不含 `record`。只读事务覆盖隔离仓库与当前页候选对应的活动仓库；不升级 IndexedDB 结构版本。
- `previewQuarantinedRecord(quarantineId: IDBValidKey, now?: string): Promise<QuarantineRecoveryPreview>`：只读复核隔离行和目标键；合格时返回安全摘要与不透明令牌，不合格时返回固定原因。
- `cancelQuarantinedRecordPreview(token: string): void`：使当前令牌失效。
- `confirmQuarantinedRecordRestore(token: string): Promise<QuarantineRestoreResult>`：结果为 `restored`、`stale-preview` 或 `target-conflict`；存储异常沿用仓库错误分类。
- 仓库层 `QuarantineRecoveryBlockReason` 在领域拒绝原因上增加 `'target-conflict'`。
- `QuarantinedRecordSummary` 为 `{ quarantineId: IDBValidKey; sourceStore: string; sourceKey: IDBValidKey; quarantinedAt: string; reasonCode: string; status: 'eligible' | 'blocked'; blockReason?: QuarantineRecoveryBlockReason; targetStore?: QuarantineTargetStore; targetKey?: IDBValidKey }`。
- `QuarantinedRecordPage` 为 `{ items: QuarantinedRecordSummary[]; nextCursor: IDBValidKey | null }`；页面项不含原始记录。
- `QuarantineRecoveryPreview` 为 `{ status: 'eligible'; quarantineId: IDBValidKey; sourceStore: string; sourceKey: IDBValidKey; token: string; targetStore: QuarantineTargetStore; targetKey: IDBValidKey; normalization: QuarantineNormalization; expiresAt: string }` 或 `{ status: 'blocked'; quarantineId: IDBValidKey; sourceStore: string; reason: QuarantineRecoveryBlockReason }`。
- `QuarantineRestoreResult` 为 `{ status: 'restored' } | { status: 'stale-preview' } | { status: 'target-conflict' }`。
- 令牌状态仅存当前 Repository 闭包中的一个条目，包含预览时隔离行、候选和失效时间；`close()` 清除令牌。
- `getQuarantinedRecords()` 保持原签名和原始记录结构，继续专供现有导出使用。

- [ ] **步骤 1：先写分页和只读预览失败测试**

  新增 `pages-quarantined-records-by-primary-key-descending`，断言每页最多 50 条且翻页无重复/遗漏；新增 `returns-safe-page-summaries-without-raw-records`，断言摘要不含原始 `record` 且 `getQuarantinedRecords()` 的导出源格式不含分页主键；新增 `previews-record-without-mutating-indexeddb` 和 `marks-active-primary-key-as-conflict`。

- [ ] **步骤 2：写确认与并发失败测试**

  新增 `restores-confirmed-record-and-legacy-attempt-atomically`、`restores-recovery-point-only-to-meta-store`、`keeps-quarantined-record-on-target-key-conflict`、`rejects-preview-after-quarantined-row-changes`、`expires-preview-token-after-five-minutes`、`replaces-and-cancels-single-pending-preview`、`invalidates-preview-token-on-close`、`allows-only-one-of-two-repositories-to-restore` 和 `rolls-back-both-stores-when-restore-transaction-aborts`。通过 `fake-indexeddb` 的事务中止测试断言活动仓库与隔离仓库整体回滚，不在生产 API 中增加测试钩子。

- [ ] **步骤 3：实现仓库接口和分页读取**

  在 `repository.ts` 声明精确返回类型。在 `indexedDbRepository.ts` 使用 `quarantinedRecords.openCursor(range, 'prev')`；有 `afterKey` 时以排除该键的上界限定下一页。每页在同一只读事务中调用任务 1 的纯资格函数，并读取对应目标主键。只将安全摘要返回 UI；不修改 `CHALLENGE_DATABASE_VERSION`。

- [ ] **步骤 4：实现内存令牌及事务确认**

  预览时将隔离行、候选及 `Date.now() + 5 * 60 * 1000` 绑定到令牌；新预览替换旧令牌。确认时打开同时覆盖隔离仓库和目标仓库的单个 `readwrite` 事务，重读完整隔离行并通过 `serializeQuarantineComparableValue()` 与预览时的序列化结果比较，重跑资格校验，重查目标键；目标空闲时用 `add()` 写入，再删除精确 `quarantineId`。任何请求异常中止事务；事务提交前不向调用方报告成功。成功、取消、令牌过期、仓库关闭后清理令牌。

- [ ] **步骤 5：运行仓库测试和提交**

  运行：`npm run test:unit -- src/challenges/storage/indexedDbRepository.test.ts`

  预期：新分页、预览、恢复、冲突、过期和事务回滚用例通过；既有隔离、迁移、备份和恢复点用例保持通过。

  提交信息：`feat(challenges): restore quarantine records atomically`

### 任务 3：增加安全列表、逐条预览与确认界面

**文件：**

- 修改：`src/challenges/ui/ChallengeDataManagement.tsx`
- 修改：`src/challenges/ui/ChallengeDataManagement.test.tsx`
- 修改：`src/challenges/ui/ChallengeCenter.tsx`
- 修改：`src/challenges/ui/ChallengeCenter.test.tsx`
- 修改：`src/challenges/ui/ChallengePage.tsx`
- 修改：`src/challenges/ui/challenge.css`

**接口：**

- 将任务 2 的分页、预览、取消和确认回调从 `ChallengePage` 传至 `ChallengeCenter` 与 `ChallengeDataManagement`。
- 视图只接收安全摘要和预览结果，不接收原始隔离记录。

- [ ] **步骤 1：写界面失败测试**

  新增 `does-not-load-or-restore-quarantine-records-on-mount` 和 `renders-only-safe-page-summary-and-preview`。断言默认不加载列表、不生成预览、不恢复；用户打开列表后只显示摘要；不可恢复项显示固定中文原因且无确认按钮；可恢复项显示目标仓库、目标键和唯一版本转换；原文中的题目、选项、答案、讲解不出现在 DOM。

- [ ] **步骤 2：补充交互与错误测试**

  新增 `cancels-preview-without-calling-restore`、`confirms-once-and-refreshes-quarantine-count`、`shows-safe-guidance-for-conflict-expired-preview-and-storage-error` 和 `keeps-export-available-for-unrecoverable-records`。键盘可操作分页、列表项、预览、确认和取消。

- [ ] **步骤 3：实现 UI 状态和回调串接**

  在 `ChallengeDataManagement` 实现分页加载、单条选择、只读预览、逐条确认与取消状态。来源/原因通过固定中文映射显示。成功后在 `ChallengePage` 刷新隔离计数和闯关进度；保留现有 `getQuarantinedRecords()` 原始导出回调，不把摘要或令牌写进导出文件。

- [ ] **步骤 4：运行组件测试并提交**

  运行：`npm run test:unit -- src/challenges/ui/ChallengeDataManagement.test.tsx src/challenges/ui/ChallengeCenter.test.tsx`

  预期：预览、取消、确认、失败、隐私和可访问状态断言通过。

  提交信息：`feat(challenges): add quarantine recovery preview`

### 任务 4：浏览器回归与中文文档同步

**文件：**

- 修改：`tests/e2e/challenge-flow.spec.ts`
- 修改：`docs/challenges/DATA_MODEL.md`
- 修改：`docs/challenges/ARCHITECTURE.md`
- 修改：`docs/challenges/ROADMAP.md`
- 修改：`docs/challenges/REQUIREMENTS_TRACEABILITY.md`
- 修改：`docs/challenges/TEST_STRATEGY.md`

- [ ] **步骤 1：先写浏览器端到端失败场景**

  新增 `restores-known-legacy-attempt-after-preview-and-confirmation` 与 `keeps-conflicting-quarantined-record-and-export-available`。在浏览器 IndexedDB 中加入旧格式快照及主键冲突样例，并重新载入页面以读取夹具。验证确认后旧快照的答案和题序不变、只增加结构版本 `1`、隔离数量减少一条；冲突记录仍隔离且可原始导出；`china-study-progress-v1` 前后完全一致。

- [ ] **步骤 2：实现需要的测试夹具和修正回归问题**

  测试夹具仅写入本地 Playwright 浏览器配置文件的 IndexedDB；不改课程内容或学习进度。若测试暴露实现问题，修复对应前序任务并重新运行其单测。

- [ ] **步骤 3：更新中文项目文档**

  将已实现的资格白名单、每页 50 条、令牌五分钟有效、预览和事务语义、不可恢复边界及测试证据同步到数据模型、架构、路线图、需求追踪和测试方案。明确当前仓库测试不代表用户设备实际存在可恢复记录。

- [ ] **步骤 4：运行端到端与完整交付验证**

  运行：`npm run test:e2e -- tests/e2e/challenge-flow.spec.ts`

  运行：`npm run test:unit`

  运行：`npm run build`

  运行：`git diff --check`

  并手动检查数据管理页窄屏/桌面、浅色/深色、键盘焦点、屏幕阅读器语义和减少动态效果。预期：恢复路径通过；构建无 TypeScript 错误；没有新增 500 KB JavaScript 分块警告；学习进度保持不变。

- [ ] **步骤 5：提交任务并检查工作区**

  提交信息：`test(challenges): verify quarantine recovery flow`

  最终确认只提交计划/实现所涉及的文件，保留其他工作区改动；不推送分支。
