# 学习课程本机语音朗读实施计划

> **供执行代理使用：** 按任务逐项执行本计划；每项使用复选框跟踪，并遵循 TDD。

**目标：** 为学习课程的六类互动题目添加手动本机语音朗读，作答正确后可朗读正确答案和讲解。

**架构：** 在 `src/learning` 新增纯函数，根据结构化活动定义生成题目和正确答案的朗读文本。`ActivityRenderer` 复用现有本地中文语音工具和语音偏好，管理按钮、状态提示及播放生命周期；不改动评分逻辑。

**技术栈：** React、TypeScript、浏览器 `speechSynthesis`、Vitest、Testing Library。

**规格：** [学习课程本机语音朗读设计规格](../specs/2026-10-28-learning-course-local-speech-design.md)

## 全局约束

- 作答前手动朗读题干及当前活动中可供作答的内容；配对两侧候选项和分类候选项分组朗读，不透露映射；不得朗读答案、提示或讲解。
- 仅在正确提交、答案反馈解锁后朗读答案和讲解。
- 复用现有语音开关和设备本地中文语音；关闭语音时停止朗读；不联网回退。
- 切换题目或离开答题页时停止正在播放的语音。
- 不改动答题、评分、课程进度、重试次数或闯关页语音规则。
- 不添加在线服务、账号、网络请求或依赖。
- 所有新增按钮须支持键盘操作，并提供可读的播放状态和设备能力提示。

## 审查重点

- 浏览器不支持 `speechSynthesis` 或没有本地中文语音时，显示说明且不发起网络请求；由任务 2 的组件测试覆盖。
- 设备语音列表尚未准备好时，提示稍后重试且不报错；由任务 2 的组件测试覆盖。
- 结构化答案必须覆盖六种活动类型，不能把学生输入当成正确答案；由任务 1 的逐类型测试覆盖。
- 语音偏好关闭时不得提供可用的朗读操作，且正在播放时会停止；由任务 2 的组件测试覆盖。
- 连续答题或离开页面时不得继续朗读上一题；由任务 2 的组件测试覆盖。

---

### 任务一：为六类活动生成朗读文本

**文件：**

- 新建：`src/learning/activitySpeech.ts`
- 新建：`src/learning/activitySpeech.test.ts`

**接口：**

- `getActivityQuestionSpeechText(activity: ActivityDefinition): string`：返回题干与作答所需的可见内容。
- `getActivityAnswerSpeechText(activity: ActivityDefinition): string`：依据结构化正确答案生成答案摘要，并附上 `activity.explanation`。

- [x] **步骤 1：写失败测试**

  为选择、配对、排序、分类、测量、计算各写一组题目文本和答案文本断言。确认题目文本含所有可选作答内容；配对题只分组列出左右候选项，分类题只分组列出类别和待分类项目，排序题只读项目而不读正确顺序。答案文本使用正确选项、正确配对、正确顺序、正确分类、目标长度或正确算式结果，并包含讲解。

- [x] **步骤 2：运行测试确认失败**

  运行：`npm run test:unit -- src/learning/activitySpeech.test.ts --reporter=dot`

  预期：因模块尚未实现而失败。

- [x] **步骤 3：实现两个纯函数**

  在 `activitySpeech.ts` 对 `ActivityDefinition` 使用穷尽式 `switch`。所有答案均从题目结构化正确答案字段推导，不依赖学生提交值或界面文案。

- [x] **步骤 4：运行测试确认通过**

  运行：`npm run test:unit -- src/learning/activitySpeech.test.ts --reporter=dot`

  预期：六种活动类型全部通过。

### 任务二：在学习答题页加入本机朗读操作

**文件：**

- 修改：`src/components/game/ActivityRenderer.tsx`
- 新建：`src/components/game/ActivityRenderer.test.tsx`
- 修改：`src/styles/game.css`

**接口：**

- 消费任务 1 的 `getActivityQuestionSpeechText` 和 `getActivityAnswerSpeechText`。
- 消费 `speakWithLocalChineseVoice(text)`、`stopLocalSpeech()` 与 `useSound()`。
- 提供“朗读题目”和仅在 `status === 'correct'` 时显示的“朗读答案与讲解”按钮。

- [x] **步骤 1：写失败组件测试**

  验证朗读题目会把生成的题干文本传给本地语音；选择题朗读内容包含各选项。验证作答前和答错时没有答案朗读按钮，答对后按钮朗读正确答案与讲解。

- [x] **步骤 2：写失败设置与生命周期测试**

  验证关闭语音后朗读按钮不可用；本地中文语音缺失、语音列表尚未加载和浏览器不支持时显示说明；提交答案、切换活动及卸载组件时调用 `stopLocalSpeech()`。

- [x] **步骤 3：运行组件测试确认失败**

  运行：`npm run test:unit -- src/components/game/ActivityRenderer.test.tsx --reporter=dot`

  预期：新朗读行为断言失败。

- [x] **步骤 4：实现手动朗读和状态提示**

  在 `ActivityRenderer` 添加本机朗读状态与按钮，复用现有语音偏好；把状态提示放在朗读控件附近并使用 `role="status"`。提交答案时、活动更换或组件卸载时停止朗读。答案按钮只在正确反馈出现时渲染。

- [x] **步骤 5：添加聚焦的朗读控件样式**

  在 `game.css` 中为题目朗读控件和状态提示添加与现有课程按钮一致的布局、间距、窄屏换行和可见焦点样式；兼容浅色、深色主题和 reduced motion。

- [x] **步骤 6：运行组件测试确认通过**

  运行：`npm run test:unit -- src/components/game/ActivityRenderer.test.tsx --reporter=dot`

  预期：朗读可见内容、答案解锁时机、语音开关和生命周期断言全部通过。

- [ ] **步骤 7：手动检查学习答题页**

  在桌面和窄屏宽度下检查浅色、深色主题、键盘焦点和 `prefers-reduced-motion`。确认朗读按钮不挤压题目操作，状态提示可见，窄屏无横向溢出。

### 任务三：验证课程回归和生产构建

**文件：**

- 验证：`src/components/game/SessionPlayer.test.tsx`
- 验证：`src/components/game/ActivityRenderer.test.tsx`
- 验证：完整课程构建和 `git diff --check`

- [x] **步骤 1：运行课程交互回归**

  运行：`npm run test:unit -- src/components/game/ActivityRenderer.test.tsx src/components/game/SessionPlayer.test.tsx --reporter=dot`

  预期：现有答题、重试、反馈和场次进度行为通过。

- [x] **步骤 2：运行生产构建**

  运行：`npm run build`

  预期：TypeScript 检查和 Vite 生产构建通过。

- [x] **步骤 3：检查补丁格式**

  运行：`git diff --check`

  预期：无空白错误。

## 执行结果

### 已完成

- 六类活动的题干与结构化答案朗读文本均已实现；纯函数测试 12 项通过。
- 学习答题页已加入“朗读题目”与答对后出现的“朗读答案与讲解”控件，并复用现有本机中文语音和偏好设置。
- 组件测试覆盖语音能力提示、答案解锁时机、关闭语音偏好，以及提交、切题和卸载时停止播放；组件与课程回归共 24 项通过。
- `npm run build` 和 `git diff --check` 通过。

### 尚未完成的人工检查

- 桌面与窄屏、浅色与深色的人工视觉检查未能完成。Playwright Chromium 启动时遇到 macOS 沙箱权限错误；本地预览标签页呈现空白，因此没有把它记作视觉验收通过。键盘可操作性由原生语义按钮和组件测试确认；实际焦点外观仍需浏览器中检查。

### 全量单测结果

- 最新 `npm run test:unit -- --reporter=dot` 结果为 246 个测试文件通过、1 个测试文件失败（1586 项通过、1 项失败）。唯一失败是闯关备份组件测试找不到“导出闯关备份”按钮，发生在 `src/challenges/ui/ChallengeBackupPanel.test.tsx`；这与本次学习课程朗读代码不在同一功能范围。学习朗读及课程交互相关的 4 个测试文件单独运行全部通过。
