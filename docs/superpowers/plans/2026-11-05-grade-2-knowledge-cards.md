# 二年级知识卡片 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 新增二年级知识卡片页，覆盖 51 个已开放课程条目、153 个知识点，每张卡提供讲解和原创例题。

**Architecture:** 内容按学期与学科拆成六个数据模块，通过稳定课程键映射到目录。新增独立 `/knowledge` 路由和可复用的卡片浏览页；全局导航及二年级单元页链接到该页，继续使用现有目录、教材元数据、UI 原语和样式变量。

**Tech Stack:** React 19、TypeScript、Vite、现有 `curriculumManifest`、React Router-style 本地路由、项目 UI 原语。

**Spec:** `docs/superpowers/specs/2026-11-05-grade-2-knowledge-cards.md`

## Global Constraints

- Node.js 版本见 `.node-version`（当前为 22.16.0），使用 npm。
- 新增界面优先复用本地 UI 原语与变量，并保持键盘操作、可见焦点、语义化标签、两种主题和 `prefers-reduced-motion`。
- 修改用户可见课程内容时，检查年龄适配、表达清楚和答案正确性。
- 题目、提示和解释须为原创；不得复制教材 PDF、扫描页、插图或大段受版权保护的课文。
- 完成后运行 `npm run build`、`git diff --check`，并手动检查桌面/窄屏、浅色/深色、键盘焦点和 reduced motion。
- 保留现有未跟踪目录 `.taste-skill/app-review-2026-11-03/`。

## Review Focus

- 知识点卡片与正确的年级/学期/学科/条目对应，且 153 个知识点没有遗漏或重复。
- 二年级语文和英语回退教材内容不混入未核实的修订版内容；数学内容遵从当前用户提供教材登记。
- 数学例题的算式、结果和单位一致，语文表达适龄，英语词义、拼写和语法准确。
- 英语卡片继续显示学校开课状态未确认的提示。
- 直接打开某单元卡片路径、切换学期/学科/单元后，显示的条目与卡片内容一致。

---

### Task 1: 建立卡片数据并撰写二年级内容

**Files:**
- Create: `src/content/knowledgeCards/types.ts`
- Create: `src/content/knowledgeCards/grade-2/term-1/chinese.ts`
- Create: `src/content/knowledgeCards/grade-2/term-1/math.ts`
- Create: `src/content/knowledgeCards/grade-2/term-1/english.ts`
- Create: `src/content/knowledgeCards/grade-2/term-2/chinese.ts`
- Create: `src/content/knowledgeCards/grade-2/term-2/math.ts`
- Create: `src/content/knowledgeCards/grade-2/term-2/english.ts`
- Create: `src/content/knowledgeCards/grade-2/index.ts`
- Test: `src/content/knowledgeCards/grade-2/index.test.ts`

**Interfaces:**
- Produce `KnowledgeCardDefinition`: stable `id`, `topic`, `explanation`, and an `example` with `prompt`, `answer`, and `reasoning` strings.
- Produce `knowledgeCardsByUnit: Record<string, KnowledgeCardDefinition[]>`, keyed by canonical unit key such as `grade-2/term-1/math/unit-01`.

- [x] Write `grade2KnowledgeCardsCoverTheRegisteredTopicsExactly`: assert all 51 grade-2 unit keys are present, each card topic matches the unit's `sourceTopics` in order, and all 153 explanation/example fields are non-empty.
- [x] Run `npx vitest run src/content/knowledgeCards/grade-2/index.test.ts`; expect the test to fail because the registry has not been created.
- [x] Define the card type and six term/subject data modules.
- [x] Add a card for every existing `sourceTopic` in all 51 entries; keep topic labels aligned with the source course and include age-appropriate original explanations and answerable examples.
- [x] Review each card against the local textbook inventory and existing unit material; check math answers and units, Chinese wording and source boundaries, and English spelling/meaning/grammar.
- [x] Export the combined unit-key registry from `grade-2/index.ts`.
- [x] Re-run `npx vitest run src/content/knowledgeCards/grade-2/index.test.ts`; PASS for 51 entries and 153 cards.

### Task 2: Add knowledge-card routes and navigation

**Files:**
- Modify: `src/app/router.ts`
- Modify: `src/App.tsx`
- Modify: `src/components/layout/AppNavigationDrawer.tsx`
- Modify: `src/components/catalog/UnitOverview.tsx`
- Test: `src/app/router.test.ts`
- Test: `src/components/layout/AppNavigationDrawer.test.tsx`
- Test: `src/components/catalog/UnitOverview.test.tsx`

**Interfaces:**
- Produce `getKnowledgePath(unitKey?: string): string`.
- Add an `AppRoute` variant for the library, optionally carrying a validated grade-2 unit key.
- Consume `knowledgeCardsByUnit` keys from Task 1.

- [x] Add route assertions for `/knowledge`, a valid grade-2 unit path, and malformed, unsupported-grade, and unknown-unit paths; add navigation-current and unit-entry assertions.
- [x] Run `npx vitest run src/app/router.test.ts src/components/layout/AppNavigationDrawer.test.tsx src/components/catalog/UnitOverview.test.tsx`; expect failures for the missing route and entry.
- [x] Resolve `/knowledge` and `/knowledge/grade-2/term-{1|2}/{chinese|math|english}/{unit-slug}`; reject malformed or unsupported grade/unit paths.
- [x] Add a global navigation entry and lazy-load the library page.
- [x] Show a direct card-page link on grade-2 unit overview pages only.
- [x] Re-run `npx vitest run src/app/router.test.ts src/components/layout/AppNavigationDrawer.test.tsx src/components/catalog/UnitOverview.test.tsx`; PASS.

### Task 3: Build the knowledge-card library UI

**Files:**
- Create: `src/components/knowledge/KnowledgeCardsPage.tsx`
- Test: `src/components/knowledge/KnowledgeCardsPage.test.tsx`
- Modify: `src/styles/catalog.css`
- Modify: `src/App.tsx`

**Interfaces:**
- Consume `route.unitKey`, `onNavigate`, `curriculumManifest`, and `knowledgeCardsByUnit`.
- Use existing `Select`, `Button`, and `Card` primitives; save grade-2 term/subject selection through `courseSelection` storage.

- [x] Write UI assertions for the default selection/card, changing the term or subject, opening the answer disclosure, and navigating back to the course.
- [x] Run `npx vitest run src/components/knowledge/KnowledgeCardsPage.test.tsx`; expect failures because the page does not exist.
- [x] Render term, subject, and entry selectors; initialize from a grade-2 deep link or saved selection, otherwise default to grade-2 term-1 Chinese.
- [x] Render one article per topic with title, explanation, example prompt, and an accessible disclosure for answer and reasoning.
- [x] Add a link from the selected entry back to its course unit.
- [x] Preserve textbook-source and English school-offering disclosures from current metadata.
- [x] Add responsive two-column/one-column card styling with theme tokens and reduced-motion support.
- [x] Re-run `npx vitest run src/components/knowledge/KnowledgeCardsPage.test.tsx`; PASS.

### Task 4: Verify the delivered feature

**Files:**
- Review: all files above

- [x] Run `npm run build`; resolve any type or production-build errors.
- [x] Run `git diff --check`.
- [x] Run `npm run test:unit` and review the complete output.
- [x] Manually inspect the global entry, unit deep link, semester/subject/entry selection, card answer disclosure, and course return link on desktop and narrow screen in both themes; check keyboard focus and reduced motion.
- [x] Confirm only authorized files changed and the pre-existing `.taste-skill/app-review-2026-11-03/` directory remains untouched.
