# 闯关系统仓库现状基线

状态：Phase 0 只读审计记录。审计日期：2026-10-21。本文记录核对过的事实，不代表这些事实永远有效；实现前需对目标分支重新执行检查。

## 仓库版本与远端状态

- 本地审计源码：`main`，HEAD `fdb988770081f0bb7429cb880a6e1387549248f9`（PR #5 合并提交）。
- PR [#5](https://github.com/naodeng/starry-island/pull/5) 已于 2026-10-21 合并。
- 审计时 GitHub `main` 为 `4e125db745fb4967166f7778b2d9146894519fa8`。它比本地 HEAD 多一个发布提交，仅修改 `package.json`、`package-lock.json` 的版本号及 `CHANGELOG.zh-CN.md`；没有改动应用源码或 Vite 构建配置。本地仓库尚未快进到该提交。
- 因此本次构建警告来自本地审计源码；应用源码与远端发布提交一致，但本地包版本仍是 `0.2.0`，远端已为 `0.3.0`。

## 已核实的应用与课程事实

- 产品是 React 19 / TypeScript / Vite 8 静态 SPA，部署目标为 Cloudflare Pages；Node 版本由 `.node-version` 固定。
- `npm run build` 运行 `tsc -b && vite build`。当前 CI workflow 覆盖安装、单元测试、覆盖率、构建和 Playwright Chromium；`package.json` 没有单独 lint 脚本。
- `src/content/curriculum.ts` 和模块化课程目录是课程内容来源；`src/content/curriculum-manifest.json` 是同步导入的目录与进度索引，不是闯关题目审核清单。
- Manifest 包含 6 个年级、36 个教材条目、311 个课程目录条目、1,868 个场次 ID（基础 624、进阶 622、高阶 622）。其中 254 个条目为当前已登记的正式编号且可计成就的单元，另有 57 个主题、复习或综合实践条目。V1.0 闯关单元范围不能简单按 311 估算。
- 课程共有 14,944 道运行时题目（v0.3.0 发布记录）。这只是存量数量，不表示它们已具备稳定的闯关题目 ID、题目级知识点/学期阶段映射、闯关题型适配或闯关审核状态；有效候选池数量目前未知。
- 课程只有单元级 `sourceTopics`；尚未发现题目级知识点标签、学期前半/后半映射、闯关发布清单或闯关审核台账。组卷覆盖、2×有效题池和 540 项交付所需的补题量仍需单独审计。
- 学习进度保存在 `china-study-progress-v1`，当前格式为 schema v3，内容是已完成的学习 session ID 与可选学习起点。设置学习起点会按现有规则替换其后的本地进度。主题与声音偏好使用独立键。
- 路由、学习答题、学习进度和成就属于现有学习流程。闯关实现应新增隔离的领域状态与 UI 流程，不能把闯关答题语义混入原有学习 Task，也不能以闯关 schema 覆盖学习进度。

## 构建分块问题

本地 `npm run build` 成功，但输出警告：

```text
dist/assets/index-f2QQNK82.js  607.74 kB │ gzip: 113.94 kB
```

构建产物审计显示，最大的单一输入来源是 `src/content/curriculum-manifest.json`：文件 469,129 bytes，打包后贡献约 341,657 bytes。该 manifest 被 `src/app/router.ts`、`src/storage/progress.ts` 和成就模块同步依赖，因此会随初始应用加载。拆分前 `vite.config.ts` 未配置 chunk 拆分策略。

### 优化结果与后续方案

1. **已应用于本地工作区：单独输出课程 manifest chunk。** 使用 Vite 8 / Rolldown 的 `build.rolldownOptions.output.codeSplitting` 将 JSON 模块分到具名 chunk，保持同步模块语义。最终验证构建（2026-10-21）：入口 chunk `292.36 kB`（gzip `86.90 kB`），manifest chunk `316.56 kB`（gzip `26.83 kB`），懒加载 ChallengePage chunk `189.41 kB`（gzip `31.07 kB`）；构建不再出现超过 500 kB 的 JavaScript chunk 警告。入口和 manifest 仍属于初始依赖，gzip 合计约 `113.73 kB`，初始传输量没有实质下降。
2. **更进一步：减少首屏数据加载。** 将轻量目录索引与 session/成就元数据分离，并把当前同步依赖改为按需或异步读取。当前首页、路由校验、存储解析和成就摘要都同步依赖完整 manifest；这一方案会改变初始化和数据校验边界，属于独立架构改造，需另行设计和评审。

方案 1 已按用户确认应用于本地工作区；没有提高 `chunkSizeWarningLimit`。如果后续目标包含降低首屏传输量，再单独设计方案 2。不要把 `chunkSizeWarningLimit` 调高作为优化，也不要在未验证模块顺序与路由/进度回归前调整拆分策略。

实现参考：[Vite 生产构建指南](https://vite.dev/guide/build)说明 `build.rolldownOptions.output.codeSplitting`；[Rolldown code-splitting 文档](https://rolldown.rs/reference/OutputOptions.codeSplitting)说明分组配置，并提醒手动拆分可能改变副作用执行顺序。Rolldown 的 `maxSize` 是目标值，不是硬上限。

## MVP 之后仍未覆盖的实现事实

- 全部年级/学科的 540 个学期任务与单元闯关的阶段映射、有效候选题量及内容审核工作量。
- 补充原创题与知识点自动映射尚未经过独立教师审校；现有自审和自动测试不能替代必要的教学审核。
- IndexedDB 配额耗尽、浏览器驱逐/损坏、跨标签页单写者接管、离线更新、备份/导入和未来 schema 迁移。
- 线上 Cloudflare Pages、GitHub Actions、PR 和部署状态不由本地构建及测试验证。

## 本次修改验证

- `npm run build`：通过，最大 JS chunk 为 `316.56 kB`，无 500 kB chunk 警告。
- `npm run test:unit`：124 个文件、856 项通过。
- `npm run test:coverage`：124 个文件、856 项通过；语句 92.45%、分支 86.88%、函数 92.49%、行 94.13%，原有路由覆盖门槛通过。
- `npm run test:e2e`：21 项 Chromium 测试通过。默认 worker 已限制为 2，降低课程全量浏览器测试期间的资源争用。
- Chromium 截图人工检查覆盖桌面/窄屏、浅色/深色、学期组入口和闯关答题页；键盘焦点、reduced-motion、保存重试和丢弃由自动化测试覆盖。
- 结果仅代表本地工作区；未执行提交、推送、PR、远端 CI 或部署。
