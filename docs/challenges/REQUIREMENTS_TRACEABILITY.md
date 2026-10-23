# 需求追踪矩阵

状态：表内所有 REQ 均为**已确认的产品决定**。REQ-085 冻结该基线。下表首先作为产品决策索引；实现状态和证据只针对当前本地功能切片单独记录。仓库分支信息见[仓库现状基线](REPOSITORY_BASELINE.md)，交付范围见[迭代计划](ROADMAP.md)。

## 当前本地功能切片证据（本地工作区，2026-10-23）

下列状态只适用于一年级数学单元 1～8、二年级数学单元 2、二年级数学前半学期、三年级英语单元 1 和五年级语文单元 1 十二个试点组，不表示全课程覆盖、远端持续集成、部署或 V1.0 已就绪。

| REQ | 当前切片状态 | 证据 |
|---|---|---|
| REQ-010、028、036～047 | 题库质量命令、声明式清单校验、生命周期/状态推导、指纹变化报告、确定性去重与相似题提示、两倍候选池和组卷覆盖检查、每任务 100 种子模拟、全课程覆盖盘点和课程源素材盘点已在当前分支实现。覆盖工具核对 254 个正式单元组、108 个学期阶段组与 540 个学期任务；当前有 11 个单元组和 1 个学期组。源素材盘点统计活动数量与题型兼容性，不等于题目已审核；完整题库内容、全课程教学审核和远端 Actions 执行仍未完成。Quality 工作流仅在 `v1.*` 标签要求完整覆盖 | `scripts/challenges/quality.mjs`、`scripts/challenges/coverage.mjs`、`scripts/challenges/source-inventory.mjs`；`src/challenges/content/coverage.ts`、`sourceInventory.ts`；`.github/workflows/quality.yml`；本地 CLI、单测和构建记录见[测试方案](TEST_STRATEGY.md) |
| REQ-001 | 路由和进度隔离已实现 | `src/App.tsx`；`src/App.test.tsx`；`tests/e2e/challenge-flow.spec.ts` |
| REQ-004 | 任务组与任务层级已实现；高阶整份试卷覆盖多个必需知识点 | `src/challenges/content/pilotManifest.ts` 及其 JSON 清单片段；组卷测试 |
| REQ-005 | 通过线和整数比较已实现 | `src/challenges/domain/grading.ts`、`grading.test.ts` |
| REQ-006 | 首答锁定已实现；闯关页不显示提示或重试 | `src/challenges/domain/attempt.test.ts`；`ChallengeRunner.test.tsx` |
| REQ-008 | 最佳/最近/次数/曾通过摘要已实现；不保留完整作答历史 | `src/challenges/storage/indexedDbRepository.test.ts`；[数据模型](DATA_MODEL.md) |
| REQ-009 | 部分实现：确定性组卷覆盖十二个代表性试点组；完整课程覆盖尚未实现 | `src/challenges/domain/assemble.ts`；试点内容测试 |
| REQ-011 | 已登记试点候选池满足题量要求 | 题库清单；试点清单测试 |
| REQ-012 | 最近三次已完成试点挑战的题目优先避让已实现 | 数据仓库与组卷测试 |
| REQ-013 / 014 | 部分实现：复用已支持控件；测量题不纳入试点 | `ChallengeActivityRenderer.tsx`；清单校验测试 |
| REQ-015 | 部分实现：检查试点候选池和组装后试卷的知识点覆盖 | 题库清单与试点内容测试 |
| REQ-016 / 017 | 记录用时、确认后保存答案与刷新恢复已实现；完整载入后可断网完成挑战。配额异常时会保护待保存答案、明确刷新丢失风险并提供安全重试；真实配额耗尽、空间释放和离线冷启动/刷新尚未验证 | `src/challenges/ui/ChallengeRunner.tsx`；错误与组件测试；`tests/e2e/challenge-flow.spec.ts` |
| REQ-018 | 丢弃确认已实现，丢弃不增加完成进度 | `ChallengeRunner.tsx`；数据仓库测试 |
| REQ-019 / 020 / 021 | 试点星级和五任务徽章推导已实现 | `progress.ts`、`progress.test.ts`；闯关界面测试 |
| REQ-022 / 023 | 结果页按知识点汇总答错题，并提供到现有学习任务的复习入口；导航不改动课程进度 | `studyRecommendations.ts`、`studyRecommendations.test.ts`；`pilotContent.test.ts`；`ChallengeResult.test.tsx` |
| REQ-024 / 025 | 当前十二个代表性试点题池接入错题本和跨完成挑战掌握规则；其他课程仍未覆盖 | `wrongQuestions.ts`、`wrongQuestions.test.ts`；`indexedDbRepository.test.ts`；`ChallengeWrongQuestions.test.tsx`；`tests/e2e/challenge-flow.spec.ts` |
| REQ-031 | 当前试点提供本机累计完成次数、曾通过任务、徽章和各登记组进度；不保存历史曲线或连续天数 | `src/challenges/domain/growth.ts`、`growth.test.ts`；`ChallengeGrowth.tsx`、页面测试；`getAllTaskProgress()` 仓库测试 |
| REQ-033 / 061 / 062 | 版本化 JSON 导出、SHA-256 校验、导入预览及安全合并已在本地实现；设置迁移单独见 REQ-063 | `src/challenges/domain/backup.ts`、`backupMerge.ts`；IndexedDB 原子合并测试；详见[测试方案](TEST_STRATEGY.md) |
| REQ-063 | 当前本地切片已实现：备份可选携带主题与语音开关；导入单独预览且默认不应用，只有闯关记录安全合并成功后才更新设置；旧版无偏好字段的 v1 备份继续有效，课程进度排除在外 | `src/challenges/domain/backup.ts`；`ChallengeCenter.tsx`；`ChallengePage.tsx`；备份领域/界面单测与 `tests/e2e/challenge-flow.spec.ts` |
| REQ-039 | 当前本地切片已实现快照结构版本 `1`；数据库 v4 迁移有效旧活动快照及 24 小时恢复点内快照。旧 v1 备份先校验原始摘要再归一化已知旧快照；未知版本拒绝 | `snapshotSchema.ts`；`backup.ts`；`indexedDbRepository.ts` 及测试 |
| REQ-040 | 当前清单加载器会提供显式 `disabled` 题目 ID；`active`、`disabled`、`deprecated` 生命周期记录仍由清单验证器分别处理 | `pilotContent.ts`；`validateManifest.ts` 及测试 |
| REQ-041 | 当前本地切片在写入租约内重新读取快照后、恢复或自动补记成绩前检查停用题；命中时保留快照、不计成绩并释放租约。未命中时即使组不可用仍可恢复；无快照时不可新开。旧静态页面无法收到后续发布的停用状态 | `ChallengePage.test.tsx`；`ChallengeRunner.test.tsx`；`tests/e2e/challenge-flow.spec.ts` |
| REQ-048 | 已实现数据库结构版本 1→2→3→4 的顺序迁移；v4 在 IndexedDB 升级事务内迁移有效旧活动快照及恢复点数据，未知或异常内容保留给隔离流程 | `src/challenges/storage/indexedDbRepository.ts`；`indexedDbRepository.test.ts` |
| REQ-049 | 已实现记录读取前的结构校验和异常记录原子隔离。用户可主动打开每页最多 50 条的安全摘要；仅已知来源/原因、完整有效或可按既有规则迁移、原键一致且目标空闲的记录可只读预览并逐条确认。五分钟内存令牌绑定原隔离行；确认时同一 IndexedDB 读写事务重验、写入目标并删除隔离副本。未知格式、目标冲突和存储失败保留原文，仍可按原版本 1 格式导出；不推测成绩或改动课程进度。仓库合成样例通过浏览器回归；这不表示用户设备上存在可恢复数据 | `src/challenges/domain/quarantineRecovery.ts`；`src/challenges/storage/indexedDbRepository.ts`；`repository.ts`；`ChallengeDataManagement.tsx`；`ChallengePage.tsx`；`tests/e2e/challenge-flow.spec.ts`；[数据模型](DATA_MODEL.md)；[测试记录](TEST_STRATEGY.md) |
| REQ-050 | 页面与试点题库载入后，断开浏览器网络仍可开始并完成完整挑战；不涵盖冷启动离线或离线刷新 | `tests/e2e/challenge-flow.spec.ts`；本机 IndexedDB 持久化 |
| REQ-051 | 静态应用没有 Service Worker 或自动重载；新版本只在用户自行打开/刷新后生效，已确认保存的答题会从原冻结快照恢复；当前没有单独的更新等待界面 | `src/challenges/ui/ChallengeRunner.tsx`；`tests/e2e/challenge-flow.spec.ts` 刷新恢复流程；静态 Vite/Pages 部署 |
| REQ-052 | 闯关界面通过窄屏、深色、键盘焦点和减少动态效果检查；隔离数据提示文字在深色模式下达到 4.5:1 对比度。屏幕阅读器和独立无障碍审查仍未完成 | `tests/e2e/challenge-flow.spec.ts`；`src/challenges/ui/challenge.css` |
| REQ-053 | 已实现按需朗读当前题干；只使用设备本地中文语音并受现有语音开关控制，不读取选项/答案/讲解。语音流畅度未作为本次验收项 | `src/sound/localChineseSpeech.ts`；`ChallengeActivityRenderer.tsx` 及测试；闯关浏览器测试 |
| REQ-054 | 已按挑战组年级映射低（1～2）、中（3～4）、高（5～6）三档，只调整题干字号和留白；年级映射覆盖 1～6 年级。当前真实内容覆盖二、三年级，中、高年级档均有浏览器样式切换验证，但五、六年级尚无真实题库 | `densityTier.ts` 及测试；`ChallengeRunner.test.tsx`；闯关浏览器测试 |
| REQ-060 | 清除闯关数据前持续提醒先导出长期备份，并说明 24 小时恢复点不能替代长期备份或防止浏览器清理、设备损坏；文案有组件测试，清除与恢复流程有浏览器测试 | `src/challenges/ui/ChallengeDataManagement.tsx`；`ChallengeDataManagement.test.tsx`；`tests/e2e/challenge-flow.spec.ts` |
| REQ-065～069 | 分级清除、强确认、单一 24 小时恢复点、自动替换及成功后消费已在当前工作区实现并通过全量本地验证；尚未推送 | `src/challenges/domain/recovery.ts`；`indexedDbRepository.ts`；`ChallengeDataManagement.tsx`；存储与浏览器流程测试 |
| REQ-070 | 当前闯关答题写入和数据管理操作使用统一错误分类与中文恢复提示；最新本地验证记录见测试方案；全课程及正式发布门禁仍未完成 | `src/challenges/domain/errors.ts`、`errors.test.ts`；`ChallengeRunner.tsx`；`ChallengeDataManagement.tsx`；[测试记录](TEST_STRATEGY.md) |
| REQ-071 | 用户点击后下载白名单诊断 JSON；单测及端到端校验确认没有题目、答案、任务 ID、网址或课程进度字段，也不自动上传 | `src/challenges/domain/diagnostics.ts`、`diagnostics.test.ts`；`ChallengePage.tsx`；`ChallengeCenter.tsx`；`tests/e2e/challenge-flow.spec.ts` |
| REQ-072 | 本地新增 GitHub 问题反馈表单，收集复现步骤与环境并提示公开可见和隐私边界；尚未进入远端默认分支 | `.github/ISSUE_TEMPLATE/bug-report.yml`；`config.yml`；[表单说明](ISSUE_FORMS.md) |
| REQ-073 | 本地新增题目修正表单，要求问题描述、修正理由和可核对依据；明确由维护者人工审核且不会自动发布 | `.github/ISSUE_TEMPLATE/question-correction.yml`；[表单说明](ISSUE_FORMS.md) |
| REQ-074 | 最佳成绩和曾通过状态保持单调；没有完整作答历史时不自动重评分或撤销奖励。可靠证据下的补偿仍是人工处理，当前没有自动补偿工具 | `attempt.ts`、`attempt.test.ts`；`progress.test.ts`；[数据模型](DATA_MODEL.md) |
| REQ-075 | 已有根更新日志作为 GitHub 发布摘要，并新增结构化题库变更记录格式；本地记录不代表内容变更审批证明 | `CHANGELOG.zh-CN.md`；[内容变更记录](CONTENT_CHANGELOG.md) |
| REQ-076 | 当前分支配置了题库质量门禁、中文摘要和报告产物，并新增只读题目 ID 影响分析，按候选池列出所有可能受影响的同难度任务；未知 ID 明确要求完整门禁。仍需作者完成必要人工教学检查；本分支尚未推送，远端 Actions 结果未核实 | `scripts/challenges/impact.mjs`；`src/challenges/content/impactAnalysis.ts`；`.github/workflows/quality.yml`；`DEVELOPMENT_GUIDE.md`；`TEST_STRATEGY.md` |
| REQ-077 | 低、中、高三级风险与对应检查范围已写入协作指南；人工检查不能由当前 CI 自动证明 | `DEVELOPMENT_GUIDE.md`；[决策冲突与限制](DECISION_CONFLICTS.md) |
| REQ-078 / 079 | 当前试点允许作者自审；审核记录保留状态、审核人和时间，内容指纹单独用于变更追踪 | `src/challenges/content/pilotManifest.ts` 及其 JSON 清单片段；`validateManifest.ts` 相关测试 |
| REQ-081 | 指纹变化提示不自动撤销审核或暂停关联挑战；严重确认问题仍按静态发布流程处理 | `fingerprint.ts`；题库清单校验测试；[产品需求文档](PRD.md) |
| REQ-082～084 | 采用静态发布修复；发布摘要维护于 GitHub 更新日志；客户端没有个性化题目修订通知 | `CHANGELOG.zh-CN.md`；静态 Vite/Pages 架构；[产品需求文档](PRD.md) |
| REQ-027 | 根据用户确认的章节顺序划分前半学期；不是学校日历 | 试点题库清单；清单测试 |
| REQ-028 | 部分实现：题库质量命令校验当前试点清单；全课程盘点可按 254 个正式单元组、108 个学期阶段组和冻结的 36 个年级/学期/学科组合核对目录及登记状态，`v1.*` 标签启用严格完整性检查。当前登记 10 个单元组和 1 个学期组，题库内容仍未覆盖全课程 | `validateManifest.ts`；`scripts/challenges/quality.mjs`；`scripts/challenges/coverage.mjs`；[测试方案](TEST_STRATEGY.md) |
| REQ-029 | 部分实现：闯关中心支持十二个试点组；课程上下文入口已覆盖一年级数学单元 1～8、二年级数学单元 2、三年级英语单元 1 和五年级语文单元 1，其他课程入口尚未覆盖 | `ChallengeCenter.tsx`；`unitLinks.ts`；课程目录和路由测试 |
| REQ-037 / REQ-080 | 指纹变化会生成提示，同时按 REQ-080 保留审核状态 | `fingerprint.ts`；题库清单校验测试 |
| REQ-055 / 056 | 减少动态效果样式和闯关静音容器已实现 | `challenge.css`；`App.test.tsx` |
| REQ-058 / 059 | 部分实现：修订号拒绝过期写入；支持时 Web Locks 提供任务级单写者和等待后重新读取/接管，否则以修订号校验兜底 | 写入锁、数据仓库、答题页和浏览器测试 |
| REQ-085 | 决策基线和工程文档已建立 | 根 README、本目录及基础引擎实施计划 |

未出现在本切片状态表中的 REQ 不代表已经实现。标记后续阶段完成前，必须依据发布证据逐一核对全部 85 项决定。

## 85 项已确认决定索引

| ID | 已确认决定 | 主要文档或验证 |
|---|---|---|
| REQ-001 | 保留学习任务；闯关模式独立 | 产品需求文档 / 验收测试 |
| REQ-002 | 单元闯关对应编号单元；复习内容放入学期挑战 | 产品需求文档 / 验收测试 |
| REQ-003 | 学期划分三个阶段，每阶段五个任务 | 产品需求文档 / 验收测试 |
| REQ-004 | 基础和进阶各两任务共同覆盖核心知识；高阶整合 | 产品需求文档 / 验收测试 |
| REQ-005 | 通过线为 70% / 80% / 85% | 产品需求文档 / 验收测试 |
| REQ-006 | 首答即最终答案；不提示、不重试 | 产品需求文档 / 验收测试 |
| REQ-007 | 所有已发布挑战直接开放 | 产品需求文档 / 验收测试 |
| REQ-008 | 保存最好/最近成绩、次数和曾通过状态；不保留完整历史 | 产品需求文档 / 验收测试 |
| REQ-009 | 审核题池并随机组卷 | 产品需求文档 / 验收测试 |
| REQ-010 | 复用已审题目，缺口通过补题填补 | 产品需求文档 / 验收测试 |
| REQ-011 | 候选题池至少为目标题量的两倍 | 产品需求文档 / 验收测试 |
| REQ-012 | 跨任务复用题目；避开近期重复 | 产品需求文档 / 验收测试 |
| REQ-013 | 根据教学场景支持合适题型 | 产品需求文档 / 验收测试 |
| REQ-014 | 优先复用现有控件，必要时增加通用题型 | 产品需求文档 / 验收测试 |
| REQ-015 | 单元组共同覆盖知识点 | 产品需求文档 / 验收测试 |
| REQ-016 | 不限时，只记录经过时间 | 产品需求文档 / 验收测试 |
| REQ-017 | 自动保存并恢复固定试卷快照 | 产品需求文档 / 验收测试 |
| REQ-018 | 支持确认后丢弃并重新组卷 | 产品需求文档 / 验收测试 |
| REQ-019 | 闯关奖励与学习奖励分离 | 产品需求文档 / 验收测试 |
| REQ-020 | 按难度设定星级门槛 | 产品需求文档 / 验收测试 |
| REQ-021 | 五个任务都通过后点亮组徽章 | 产品需求文档 / 验收测试 |
| REQ-022 | 展示结果和薄弱点建议 | 产品需求文档 / 验收测试 |
| REQ-023 | 关联现有学习任务 | 产品需求文档 / 验收测试 |
| REQ-024 | 提供轻量错题本 | 产品需求文档 / 验收测试 |
| REQ-025 | 后续两次挑战连续答对后标记掌握 | 产品需求文档 / 验收测试 |
| REQ-026 | 全局避开最近三次已完成挑战的题目 | 产品需求文档 / 验收测试 |
| REQ-027 | 学期范围按教学阶段划分 | 产品需求文档 / 验收测试 |
| REQ-028 | 声明式覆盖校验和持续集成 | 产品需求文档 / 验收测试 |
| REQ-029 | 闯关中心与课程上下文入口 | 产品需求文档 / 验收测试 |
| REQ-030 | 任务卡展示进度和奖励 | 产品需求文档 / 验收测试 |
| REQ-031 | 本地闯关成长统计 | 产品需求文档 / 验收测试 |
| REQ-032 | 复用现有身份模型 | 产品需求文档 / 验收测试 |
| REQ-033 | 本地 JSON 备份/导入 | 产品需求文档 / 验收测试 |
| REQ-034 | 按引擎→试点→完整覆盖分阶段交付 | 产品需求文档 / 验收测试 |
| REQ-035 | 部分实现：本地试点覆盖一年级、二年级、三年级和五年级的数学、英语、语文，且有单元/学期组；仅代表性切片，尚非所需完整跨年级学科覆盖 | `pilotManifest.ts` 及其 JSON 清单片段；[试点内容审计](pilot-content-audit.md) |
| REQ-036 | 设置严格发布质量门禁；清单解析或输入加载失败也生成本次错误诊断，不能留下旧成功报告 | 质量检查命令行工具 / 持续集成测试 |
| REQ-037 | Git 审核清单和内容指纹 | 质量检查命令行工具 / 持续集成测试 |
| REQ-038 | 题目 ID 全局稳定；`taskId` 在清单所有组间全局唯一，且组 ID 和任务 ID 符合路由格式，防止不可访问或本机进度串用 | `src/challenges/domain/ids.ts`；清单质量检查与路由测试 |
| REQ-039 | 未完成快照支持版本化 | 质量检查命令行工具 / 持续集成测试 |
| REQ-040 | 题目生命周期含启用/停用/弃用三种状态 | 质量检查命令行工具 / 持续集成测试 |
| REQ-041 | 严重缺陷阻止未完成挑战继续 | 质量检查命令行工具 / 持续集成测试 |
| REQ-042 | 输出静态就绪度质量报告 | 质量检查命令行工具 / 持续集成测试 |
| REQ-043 | 进行多种子组卷模拟；知识点数多于目标题数时仍通过实际覆盖搜索判断可行性 | 质量检查命令行工具 / 持续集成测试 |
| REQ-044 | 确定性去重并标记相似题 | 质量检查命令行工具 / 持续集成测试 |
| REQ-045 | 有效且已审核题池至少为目标数量两倍 | 质量检查命令行工具 / 持续集成测试 |
| REQ-046 | 展示可用/计划中/不可用状态 | 质量检查命令行工具 / 持续集成测试 |
| REQ-047 | 使用声明式发布清单 | 质量检查命令行工具 / 持续集成测试 |
| REQ-048 | 支持版本化数据迁移 | 数据模型 / 集成测试 |
| REQ-049 | 隔离损坏数据 | 数据模型 / 集成测试 |
| REQ-050 | 已载入挑战支持离线完成 | 数据模型 / 集成测试 |
| REQ-051 | 安全延迟更新 | 数据模型 / 集成测试 |
| REQ-052 | 满足无障碍基线 | 数据模型 / 集成测试 |
| REQ-053 | 按需语音且避免泄露答案 | 数据模型 / 集成测试 |
| REQ-054 | 根据年级层级控制界面密度 | 数据模型 / 集成测试 |
| REQ-055 | 中性进度反馈并减少动态效果 | 数据模型 / 集成测试 |
| REQ-056 | 可选音效默认静音 | 数据模型 / 集成测试 |
| REQ-057 | 安全离开并确认丢弃 | 数据模型 / 集成测试 |
| REQ-058 | 跨标签页单写者控制 | 数据模型 / 集成测试 |
| REQ-059 | 确认写入并在失败时暂停 | 数据模型 / 集成测试 |
| REQ-060 | 在合适时机提醒备份 | 数据模型 / 集成测试 |
| REQ-061 | 导入前预览并安全合并 | 数据模型 / 集成测试 |
| REQ-062 | 使用 SHA-256 检查备份完整性 | 数据模型 / 集成测试 |
| REQ-063 | 偏好设置可选地随备份携带 | 数据模型 / 集成测试 |
| REQ-064 | 不新建专门的儿童隐私合规系统 | 数据模型 / 集成测试 |
| REQ-065 | 分级清除并进行强确认 | 数据模型 / 集成测试 |
| REQ-066 | 删除前创建快照并有限度撤销 | 数据模型 / 集成测试 |
| REQ-067 | 仅保留一个 24 小时恢复点 | 数据模型 / 集成测试 |
| REQ-068 | 新删除操作自动替换旧恢复点 | 数据模型 / 集成测试 |
| REQ-069 | 成功恢复后消费恢复点 | 数据模型 / 集成测试 |
| REQ-070 | 统一错误分类和恢复流程 | 治理 / 发布测试 |
| REQ-071 | 手动导出脱敏诊断信息 | 治理 / 发布测试 |
| REQ-072 | 使用标准 GitHub 缺陷反馈表单 | 治理 / 发布测试 |
| REQ-073 | 题目修正表单及人工审核 | 治理 / 发布测试 |
| REQ-074 | 保留历史奖励；只根据证据补偿 | 治理 / 发布测试 |
| REQ-075 | 结构化记录内容变更与发布摘要 | 治理 / 发布测试 |
| REQ-076 | 按影响范围回归，并进行完整发布验证 | 治理 / 发布测试 |
| REQ-077 | 设置三级变更风险 | 治理 / 发布测试 |
| REQ-078 | 允许作者自审 | 治理 / 发布测试 |
| REQ-079 | 审核记录保持最小字段 | 治理 / 发布测试 |
| REQ-080 | 编辑后保留审核状态，覆盖 REQ-037 自动撤销规则 | 治理 / 发布测试 |
| REQ-081 | 编辑本身不额外触发发布暂停 | 治理 / 发布测试 |
| REQ-082 | 严重问题通过常规静态发布修复 | 治理 / 发布测试 |
| REQ-083 | 发布说明仅发布在 GitHub | 治理 / 发布测试 |
| REQ-084 | 不发送个性化修订通知 | 治理 / 发布测试 |
| REQ-085 | 冻结基线并建立工程文档 | 方案包 / 审查 |

## 追踪流程

不能仅凭决策索引就把需求标记为完成。经审查的实现拉取请求建立后，补充负责人和远端/发布证据。

## 关键决策覆盖说明

- REQ-080 只在“指纹变化是否自动撤销审核”这一点上覆盖 REQ-037。
- REQ-078/079 允许作者自审，并将审核记录限制为最小字段。
- REQ-081 不允许绕过现有强制质量门禁。
- REQ-068 选择自动替换恢复点。
- REQ-082/083/084 排除紧急远程禁用以及应用内内容更新通知。
