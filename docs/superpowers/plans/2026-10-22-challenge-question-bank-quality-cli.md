# 闯关题库质量命令行工具与发布门禁实施计划

> **执行者说明：** 实施时必须使用 `superpowers:executing-plans` 技能逐项执行。任务步骤使用复选框追踪。

**目标：** 建立本地与 GitHub Actions 共用的只读题库质量命令，校验挑战清单、模拟发布任务并生成确定性就绪度报告。

**架构：** 浏览器与命令行共享同一套无界面清单校验、候选池、状态推导和组卷器。命令行由仓库现有 Vite 在中间件模式加载 TypeScript 与 `import.meta.glob` 内容模块；不引入 Node 以外的新运行依赖。质量门禁与快照版本迁移分为两份计划，快照实施见[配套计划](2026-10-22-challenge-snapshot-versioning-safety.md)。

**技术栈：** React 19、TypeScript 7、Vite 8.3、Node.js 22.16.0、Vitest 5、GitHub Actions。

**设计规格：** [闯关题库质量命令行工具与发布门禁设计](../specs/2026-10-22-challenge-question-bank-quality-cli-design.md)（第 3～10 节）。

## 全局约束

- 题库清单是唯一发布事实源；CLI 只读题库和课程，不改写审核状态、指纹、源文件或浏览器数据。
- 不新增后端、数据库服务器、网络审核服务或第三方运行依赖；命令自身不访问网络。
- 每个难度按有效、已审核、兼容且去重后的候选数检查至少 2× 目标题量，并执行题目/任务知识覆盖检查。
- 每个 `released` 任务在 CI 中执行 100 个由清单版本、任务 ID、序号生成的固定种子；不得通过参数降低 CI 门槛。
- 精确重复：从候选数中去重，且被 `released` 组引用时阻断该组；只提示的相似题不阻断、不自动处置。
- 指纹变化保留 `approved` 和发布意图，不因指纹差异单独令 CI 失败；报告不能将旧审核说成针对新内容的新审核。
- `ready` / `planned` / `unavailable` 由清单意图和共享校验器推导；既有 Quality 工作流的单测、覆盖率、构建与浏览器测试全部保留。
- 不能用机器检查替代必要的人工教学审校；不修改现有学习流程、学习进度或奖励。
- 使用 TDD；本计划及过程文档使用中文。

## 审查重点

1. **泛化校验面对单组、多组与不完整 JSON**：不能残留“必须恰好一个单元组和一个学期组”的试点限制，也不能因缺字段崩溃。对应任务 1 的解析和通用组数测试。
2. **题库审核指纹变化**：报告差异但保持 approved、状态和退出码。对应任务 1/3 的指纹变更回归测试。
3. **重复边界**：被发布组引用的精确重复阻断；只在计划范围重复不影响其他发布组；相似提示不阻断。对应任务 2 的状态与候选池断言。
4. **真实课程加载及模拟稳定性**：Vite SSR 能处理 `import.meta.glob`，100 种子全部执行，重复运行报告核心内容一致。对应任务 3/4 的真实试点和命令行测试。
5. **报告和退出行为**：报告不含题干/答案/讲解，发生硬门禁失败时非零退出，报告文件仍可用于诊断。对应任务 4/5 的临时目录与 CI artifact 测试。

## 文件职责

- `src/challenges/content/manifestSchema.ts`：从未知 JSON 解析并验证清单最小结构。
- `src/challenges/content/validateManifest.ts`：通用组/题目结构、资格、覆盖与状态校验；不再假定只有两个试点组。
- `src/challenges/content/questionUniqueness.ts`：精确重复代表项、确定性相似题候选。
- `src/challenges/content/qualityReport.ts`：多种子模拟、就绪度报告类型与确定性报告生成。
- `src/challenges/content/qualityInputs.ts`：加载清单引用的课程单元、活动和补充题数据，检查 ID 映射冲突。
- `scripts/challenges/quality.mjs`：调用 Vite SSR 加载共享 TypeScript 逻辑，处理 CLI 参数、JSON/Markdown 输出和退出码。
- `.github/workflows/quality.yml`：增加质量命令与报告产物，不删改现有质量步骤。
- `docs/challenges/REQUIREMENTS_TRACEABILITY.md`、`TEST_STRATEGY.md`、`ARCHITECTURE.md`、`DEVELOPMENT_GUIDE.md`：记录工具的本地与远端证据边界。

---

### 任务 1：泛化清单解析、校验与状态推导

**文件：**

- 新建：`src/challenges/content/manifestSchema.ts`、`src/challenges/content/manifestSchema.test.ts`
- 修改：`src/challenges/content/validateManifest.ts`、`src/challenges/domain/types.ts`
- 修改：`src/challenges/content/pilotContent.ts`
- 测试：`src/challenges/content/validateManifest.test.ts`、`src/challenges/content/pilotManifest.test.ts`

**接口：**

- 新增 `parseChallengeManifest(value: unknown): ChallengeManifest`；无效输入抛出包含字段路径的格式错误，不返回部分清单。
- 新增通用 `validateChallengeManifest(...)`；入参使用 `ChallengeManifest`、活动/来源/单元只读映射及可选 `SubtleCrypto`，返回全局问题、组问题、指纹变化和组状态。
- 校验结果显式区分全局完整性阻断、`released` 组阻断和信息性提示；不能仅凭扁平 `errors` 数组决定 CI 退出码。
- 组状态由一个共享解析函数推导；`planned`、`suspended` 和 `released` 行为严格遵守规格状态表。

- [x] **步骤 1：先写失败解析测试**

  在 `manifestSchema.test.ts` 增加 `rejects malformed root, question and group references with field paths`：对非对象根、缺少 `questions`、无效 `releaseIntent`、错误任务结构断言抛出对应路径错误；合法当前试点清单能解析。

- [x] **步骤 2：确认测试失败**

  运行：`npm run test:unit -- src/challenges/content/manifestSchema.test.ts`

  预期：解析器尚不存在，测试失败。

- [x] **步骤 3：实现结构解析与通用校验**

  加入显式运行时结构检查，再运行业务校验。删除通用校验器对“恰好两个组”的假设；至少有一个组，所有任务/组引用和停用原因按规格验证。校验问题携带全局、发布组或信息性分类，状态推导与 CI 门禁使用该分类；计划/暂停组的候选池不足不阻断其他组，清单解析、稳定 ID、必要引用等全局完整性错误仍阻断 CI。保留独立试点测试断言当前试点清单仍包含预期的两个组。

- [x] **步骤 4：测试通用组数和审核语义**

  在 `validateManifest.test.ts` 增加 `accepts one or more structurally valid groups`、`keeps a group ready when only its approved content fingerprint changed` 和 `keeps planned and suspended status independent from pool readiness`。

  运行：`npm run test:unit -- src/challenges/content/manifestSchema.test.ts src/challenges/content/validateManifest.test.ts src/challenges/content/pilotManifest.test.ts`

  预期：通用清单测试和真实试点内容校验全部通过；指纹变化不撤销审核、不改变状态。

- [x] **步骤 5：提交本任务**

  提交信息：`refactor(challenges): generalize manifest validation`

### 任务 2：实现精确去重与相似题提示

**文件：**

- 新建：`src/challenges/content/questionUniqueness.ts`
- 新建：`src/challenges/content/questionUniqueness.test.ts`
- 修改：`src/challenges/content/validateManifest.ts` 及其测试

**接口：**

- 新增 `analyzeQuestionUniqueness(questions, activitiesById, sourceUnitByActivityId): QuestionUniquenessReport`。
- `QuestionUniquenessReport` 返回按 `questionId` 排序的精确重复组和相似题对；代表题为稳定 ID 字典序最小项。
- 相似题规则仅比较同课程范围、同交互题型；按规格规范化题干的 Unicode、空白、标点和数字字面量。

- [x] **步骤 1：先写失败去重测试**

  增加 `selects the same canonical representative regardless of input order`：打乱输入后精确重复组与代表 ID 不变。增加组校验断言：`released` 组引用重复题时 unavailable；重复记录只在 planned 组时不改变其他 ready 组状态。

- [x] **步骤 2：确认测试失败**

  运行：`npm run test:unit -- src/challenges/content/questionUniqueness.test.ts src/challenges/content/validateManifest.test.ts`

  预期：新分析器不存在，精确重复门禁区分测试失败。

- [x] **步骤 3：实现确定性重复与相似候选分析**

  使用现有 `fingerprintActivity()` 语义识别完整内容精确重复；报告重复代表项，不修改清单。相似候选仅作为可读报告提示，不改变题目资格或状态。

- [x] **步骤 4：测试资格计数和相似提示**

  增加断言：精确重复项不重复计入两倍候选池；重复题被已发布组引用时阻断该组；只在计划组被引用的重复项不改变无关发布组状态；规范化后相同的数值模板产生稳定提示；相似提示本身不阻断组状态。

  运行：`npm run test:unit -- src/challenges/content/questionUniqueness.test.ts src/challenges/content/validateManifest.test.ts src/challenges/content/assemble.test.ts`

  预期：精确去重、门禁与生产组卷约束一致，所有单测通过。

- [x] **步骤 5：提交本任务**

  提交信息：`feat(challenges): report deterministic question duplicates`

### 任务 3：构建质量报告与多种子模拟

**文件：**

- 新建：`src/challenges/content/qualityReport.ts`
- 新建：`src/challenges/content/qualityReport.test.ts`
- 修改：`src/challenges/content/validateManifest.ts`、`src/challenges/domain/types.ts`

**接口：**

- `ChallengeQualityInputs` 包含清单、`activitiesById`、`sourceUnitByActivityId`、`unitsById`。
- 新增 `buildChallengeQualityReport(input: ChallengeQualityInputs, options?: { seedCount?: number }): Promise<ChallengeQualityReport>`。
- `ChallengeQualityReport` 包含 `reportSchemaVersion: 1`、`manifestVersion`、总体门禁结果、稳定排序的错误/警告、组与任务统计、指纹差异、精确重复、相似题对和种子模拟摘要；不得包含题干、答案、讲解、学生或浏览器数据。
- `seedCount` 默认值为 100；每个 seed 由清单版本、任务 ID 和序号稳定派生。`planned` / `suspended` 组不执行发布模拟。

- [x] **步骤 1：先写失败报告测试**

  增加 `buildChallengeQualityReport runs all 100 deterministic seeds for each released task`：使用真实试点内容构建报告，断言每个 released 任务恰好执行 100 次模拟且成功数/失败数准确。增加固定输入重复运行后报告深度相等的断言。

- [x] **步骤 2：确认测试失败**

  运行：`npm run test:unit -- src/challenges/content/qualityReport.test.ts`

  预期：报告构建器不存在，测试失败。

- [x] **步骤 3：实现报告构建器**

  调用共享通用校验、精确重复分析和生产 `assemblePaper()`；对每个 released 任务完整运行固定种子数量。任何组卷失败均保留具体组/任务/seed 诊断并阻断该组。所有数组按稳定 ID 和错误码排序，不加入默认时间戳或随机值。

- [x] **步骤 4：测试阻断、覆盖和脱敏**

  增加测试：任一种子失败令对应 released 组 unavailable；两倍池与知识覆盖缺项按规格失败；指纹变更只出现在报告且不让单独有效的发布组失败；JSON/Markdown 序列化不包含题干、答案、讲解或个人数据；相同输入生成相同核心 JSON/Markdown。

  运行：`npm run test:unit -- src/challenges/content/qualityReport.test.ts src/challenges/content/pilotManifest.test.ts`

  预期：全部报告断言通过；当前真实试点任务在 100 种子下保持可组卷。

- [x] **步骤 5：提交本任务**

  提交信息：`feat(challenges): simulate challenge release readiness`

### 任务 4：加载真实课程并增加本地质量命令

**文件：**

- 新建：`src/challenges/content/qualityInputs.ts`
- 新建：`scripts/challenges/quality.mjs`
- 新建：`src/challenges/content/qualityCli.test.ts`
- 修改：`package.json`、`.gitignore`

**接口：**

- `loadChallengeQualityInputs(): Promise<ChallengeQualityInputs>` 加载当前挑战清单所引用的全部来源单元、活动、补充题和单元元数据；遇到活动 ID 被多个来源静默覆盖时返回错误。
- `npm run challenge:quality` 默认运行完整的 100 种子门禁并写入 `.quality-reports/challenge-quality-report.json`、`.quality-reports/challenge-quality-report.md`。
- CLI 通过 Vite `createServer({ server: { middlewareMode: true }, appType: 'custom' })` 与 `ssrLoadModule()` 加载 TypeScript；`finally` 中关闭 Vite server。只允许报告目录参数和本地快速诊断参数；CI 环境不接受低于 100 的种子数。
- 退出码：`0` 表示没有阻断问题；`1` 表示质量门禁失败；`2` 表示参数、加载或报告写入错误。

- [x] **步骤 1：先写失败输入加载与 CLI 测试**

  `qualityCli.test.ts` 增加测试：从命令行载入真实试点清单及课程单元、生成两个报告文件；同一清单执行两次 JSON 核心内容相同；`--seed-count 99` 在 `CI=true` 时返回参数错误；命令无须打开监听端口、不访问网络，报告内容不含题目正文。

- [x] **步骤 2：确认测试失败**

  运行：`npm run test:unit -- src/challenges/content/qualityCli.test.ts`

  预期：加载器和命令入口尚不存在，测试失败。

- [x] **步骤 3：实现 Vite SSR 加载器和 CLI**

  `qualityInputs.ts` 通过现有 `loadUnit()` 加载清单所需课程，统一映射活动来源和补充题。`quality.mjs` 使用仓库已有 Vite 依赖在中间件模式加载共享逻辑；不启动网络监听、不增加第三方依赖。将 `.quality-reports/` 加入 `.gitignore`。

- [x] **步骤 4：运行命令行集成测试**

  运行：`npm run test:unit -- src/challenges/content/qualityCli.test.ts`

  并运行：`npm run challenge:quality -- --report-dir /tmp/starry-island-quality-report`

  预期：当前两个真实试点组报告为 ready，命令返回 0；输出 JSON 与中文 Markdown；源清单无差异。

- [x] **步骤 5：提交本任务**

  提交信息：`feat(challenges): add local question bank quality CLI`

### 任务 5：接入持续集成并记录发布证据

**文件：**

- 复用任务 4 已加入 `package.json` 的命令；修改：`.github/workflows/quality.yml`
- 修改：`docs/challenges/REQUIREMENTS_TRACEABILITY.md`
- 修改：`docs/challenges/TEST_STRATEGY.md`
- 修改：`docs/challenges/ARCHITECTURE.md`
- 修改：`docs/challenges/DEVELOPMENT_GUIDE.md`
- 按需修改：`docs/challenges/README.md`

- [x] **步骤 1：定义 CI 失败和报告产物验收**

  在 CLI 集成测试固定 `released` 质量失败退出码为 `1`，报告仍被写出；全局完整性错误也必须非零退出；`planned` 或 `suspended` 题池不足本身不阻断其他 ready 组。验证工作流摘要和 artifact 上传使用 `if: always()`，门禁失败时仍保留诊断产物，且后续步骤不得把原质量命令失败改写为成功。

- [x] **步骤 2：将命令加入现有 Quality 工作流**

  在 `npm ci` 后运行 `npm run challenge:quality` 并保存 JSON/Markdown 到 `.quality-reports/`；用独立的 `if: always()` 步骤将存在的中文 Markdown 追加到 `GITHUB_STEP_SUMMARY`，并以 `if: always()` 上传已有报告。质量命令保持自身失败状态，不用摘要/上传步骤吞掉退出码。保留原单测、覆盖率、构建和 Playwright 步骤。

- [x] **步骤 3：同步中文协作文档和需求状态**

  记录命令用法、报告字段、固定 100 种子规则、失败分类、人工教学审核边界和 CI 证据。将 REQ-036～047 标记为当前实际完成的本地功能范围；不声称全课程题库覆盖，也不将本地结果描述为远端 CI 已通过。

- [x] **步骤 4：运行完整发布检查**

  运行：`npm run challenge:quality`、`npm run test:coverage`、`npm run build`、`npm run test:e2e -- --workers=1`、`git diff --check`。

  预期：所有本地门禁通过；完整报告可读取；现有学习任务和学习进度回归通过。远端 Actions 状态以实际推送后的工作流为准。

- [x] **步骤 5：提交本任务**

  提交信息：`ci(challenges): gate releases on question bank quality`

## 计划范围外

- 不批量创建或人工审校全课程挑战题，不以存量课程题数推断题池已足够。
- 不新增在线后台、远程紧急停用、云端 AI 审核、浏览器内公开报告或自动批准。
- 不将可能相似题自动删除；不将内容指纹变化自动转成未审核或发布失败。
