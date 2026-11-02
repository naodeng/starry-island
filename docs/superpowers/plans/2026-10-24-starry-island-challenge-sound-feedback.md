# 星岛学园闯关声音反馈实施计划

> **执行方式：** 由当前会话按用户此前选择的 Native 方式实施，遵循 TDD。过程文档使用中文。

**目标：** 在挑战答案确认保存后复用现有本地答题音效；挑战完成提示只在最终结果保存成功后播放一次。

**架构：** ChallengeRunner 使用现有 SoundProvider、`getAnswerSoundFeedback` 与本地音频素材。保留 AppFrame 对挑战页的 `data-sound-silent` 点击音隔离；结果音由 runner 显式调用 `playCue`，不依赖事件冒泡。

**技术栈：** React、TypeScript、Vitest、现有 SoundProvider；不新增音频资源或依赖。

**规格：** [全局导航、首页与成长中心设计规格](../specs/2026-10-24-starry-island-navigation-home-growth-design.md)

**依赖：** 导航/首页计划完成，使挑战音效与共享页眉交互音隔离边界稳定；本计划可在设置迁移前后实施。

## 全局约束

- 只在 IndexedDB 确认保存答案后播放答案结果音。
- 保存失败、配额阻塞、冲突未决、未保存和重试尚未成功时不播放结果音。
- 复用现有正确、错误、连续正确和任务完成音效与现有语音/提示音开关。
- `data-sound-silent` 只抑制 AppFrame 的交互点击音；挑战页保留此属性，避免答题控件点击声与答题结果声叠加。
- 任务完成音只在 `completeAttempt` 成功后播放；重渲染、返回页面或恢复答题不可重播。
- 不新增“进行中”音频、在线语音或新声效文件。音频失败不能影响作答和保存。

## 审查重点

- 先存答案再播声；测试检查 Promise/仓库调用次序。
- 普通问题保存成功只播一次；重复提交、重复渲染或最终完成重试不双播。
- 最后一题的正确反馈依照 `getAnswerSoundFeedback` 的 session-complete 规则；若最终成绩保存失败，不能先播完成音。
- 最后一题错误仍播放错误反馈，不冒充成功完成反馈。
- 静音偏好生效，`play()` 拒绝或 Audio 不可用不影响成绩、路由和 UI。

---

### 任务：为闯关答案与完成状态增加持久化后声音

**文件：**

- 修改：`src/challenges/ui/ChallengeRunner.tsx`
- 修改：`src/challenges/ui/ChallengeRunner.test.tsx`
- 必要时修改：`src/sound/soundCues.ts`、`src/sound/soundCues.test.ts`
- 必要时修改：`src/sound/SoundProvider.test.tsx`
- 修改：`tests/e2e/challenge-flow.spec.ts`

**实现边界：**

- 提交时记录已确认答案对应的 `FeedbackStatus` 和提交序号，只在 `repository.saveAnswer` 成功后根据 `getAnswerSoundFeedback` 决定播放音效。
- 最后一题使用现有 `session-complete` 规则；只有 `completeSavedAttempt`/`completeAttempt` 成功后确认播放完成音。若已有规则无法区分“答案已保存”和“成绩已完成”，用明确的本地状态或 ref 做一次性门控，不改变评分逻辑。
- 通过 SoundProvider 的 `enabled` 和 `playCue` 使用已有资源；异常由 SoundProvider 安全吞并，不阻塞挑战。

- [x] **步骤 1：写持久化与播放次序失败测试**

  在 `ChallengeRunner.test.tsx` 增加：`playsOneAnswerCueAfterSavedAnswer`、`doesNotPlayAnswerCueWhenSaveFails`、`playsCueOnlyAfterSuccessfulRetry`、`playsCompletionCueOnlyAfterAttemptAndProgressAreSaved`、`doesNotReplayCuesAfterRerenderOrRestoringCompletedResult`、`keepsIncorrectFinalAnswerAsIncorrectFeedback`。使用 fake audio 或受控 SoundProvider 测试替身，分别控制答案保存和成绩保存 Promise。

- [x] **步骤 2：确认声音次序测试按预期失败**

  运行：`npm run test:unit -- src/challenges/ui/ChallengeRunner.test.tsx src/sound/soundCues.test.ts`

  预期：ChallengeRunner 当前未调用结果音，次序和失败保护断言失败。

- [x] **步骤 3：接入答案保存成功后的声音反馈**

  保存前不播放。答案保存成功后更新 runner 状态并按现有 streak 规则播放一次。存储异常、活动答题仍未保存、保存重试尚未成功或跨标签页冲突时不播放。

- [x] **步骤 4：接入任务完成的一次性声音门控**

  最终成绩持久化完成后按现有声音规则播放完成音；`retryComplete` 成功恢复完成记录时只播放尚未播放的完成反馈。确认 `data-sound-silent` 仍覆盖挑战按钮的全局点击音，但不影响 runner 显式调用 `playCue`。

- [ ] **步骤 5：运行单测、完整回归、浏览器验证并提交**

  运行：`npm run test:unit -- src/challenges/ui/ChallengeRunner.test.tsx src/challenges/domain/attempt.test.ts src/sound/soundCues.test.ts src/sound/SoundProvider.test.tsx`

  运行：`npm run test:unit`

  运行：`npm run test:e2e -- tests/e2e/challenge-flow.spec.ts tests/e2e/learning-flow.spec.ts`

  运行：`npm run build`

  运行：`git diff --check`

  手动验证语音提示开/关、音频播放拒绝时仍能答题、普通答案和最后一题结果声的时序。预期：闯关结果音在数据确认后各播放一次，课程声音和课程答题路径回归通过。

  提交信息：`feat(challenges): play answer cues after saved progress`

  验证记录：声音相关单测、全量单测、生产构建和 `git diff --check` 已通过。Playwright E2E 未能启动，macOS Chromium 报 `bootstrap_check_in` 权限错误并退出 `SIGTRAP`；浏览器中的完整挑战音效流程仍需在可启动 Chromium 的环境复验。
