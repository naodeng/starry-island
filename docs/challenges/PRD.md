# Product Requirements Document (PRD)

Status: **confirmed product baseline**, based on REQ-001–REQ-085. This PRD describes the planned product scope, not the current implementation boundary. The local MVP slice and its unimplemented areas are recorded in [ROADMAP.md](ROADMAP.md), [REQUIREMENTS_TRACEABILITY.md](REQUIREMENTS_TRACEABILITY.md), and [pilot-content-audit.md](pilot-content-audit.md).

## Goal and non-goals

Deliver a separate, reliable challenge mode for Chinese elementary grades 1–6, semesters 1–2, Chinese, mathematics and English. Preserve existing learning Tasks and progress. Do not introduce cloud accounts, a backend, live AI-generated questions, full attempt history, or a content administration console in v1.0.

## Curriculum and scope

- Unit challenges apply to formal numbered textbook units. Review/integrated-practice material contributes to semester challenges.
- Each grade × semester × subject has three fixed semester stages: first half, second half, cumulative end-term. Across 6×2×3 combinations: **108 stage groups and 540 semester challenge tasks** (5 per group). Unit task counts depend on audited numbered-unit inventory and must not be invented.
- Each challenge group: 2 basic, 2 advanced, 1 high-difficulty task. Each basic pair and advanced pair jointly cover all required core knowledge points; high difficulty emphasizes integration.
- Unit tasks target ~15 questions; semester tasks default 25, maximum 30. Candidate pools require at least 2× effective approved unique compatible questions (15→30, 25→50, 30→60).
- Released tasks are freely accessible, with no prerequisite locks. Planned tasks show 即将开放; suspended tasks show 暂不可用.

## Grading and rewards

- Basic passing ≥70%; advanced ≥80%; high ≥85%; compare correct count to `ceil(total * threshold)`.
- First submitted answer per question is final; no retry or hint during challenge; answer/explanation review follows completion. Untimed; record elapsed time only.
- Stars based on best score: basic 70/85/95%, advanced 80/90/100%, high 85/95/100% for 1/2/3 stars respectively. Badges granted after all five tasks in a group have ever passed; no revocation on weaker subsequent attempts.
- Persist best/latest scores, completed attempt count, ever-passed; **not** full attempt histories.
- Wrong-question notebook tracks stable question ID, wrong count, last wrong date, and mastery state. Two correct answers in separate later challenge attempts consecutively mark mastered; wrong resets the streak.

## Experience

- Dedicated 闯关中心 with contextual entry points; grade/semester/subject/difficulty filtering, challenge cards, progress and badges.
- Autosave after every answer, resume identical ordered paper and locked responses; only one unfinished attempt per task. Discard with confirmation does not count as completed.
- Results show score, correct count, stars, elapsed, best, wrong review, weak knowledge and local rule-based suggestions linking existing learning Tasks.
- Child-friendly accessible interface with grade-tier density (1–2, 3–4, 5–6), keyboard/focus/touch/contrast checks, reduced motion, optional on-demand speech with anti-answer-leak rules, default-muted optional short sounds.
- Unified error taxonomy with child-friendly messages, genuine recovery actions, and optional manually exported whitelisted diagnostics.

## Local data and safety

- Local-first persistence; robust migrations, snapshots, conflict detection across tabs, confirmed writes, export/import, backup reminders, and corruption isolation.
- High-risk deletion: graded confirmation and backup reminder. Before deletion create a recoverable snapshot valid for 24 hours, at most one; subsequent deletion **automatically replaces** the older snapshot, safely after successful new snapshot creation. Successful restore consumes the snapshot exactly once.
- No dedicated child privacy compliance/consent framework in v1.0 (REQ-064); this is **not** a claim of legal compliance. Avoid unnecessary transmission or personal data collection.

## Content governance and releases

- Stable question IDs, declarative review manifests, content fingerprints, lifecycle Active/Disabled/Deprecated, change logs and CI readiness reports.
- **Final user choices**: authors may self-approve (REQ-078), approval record can be minimal (REQ-079), edits retain existing approved state (REQ-080), and do not automatically suspend associated challenges (REQ-081). Existing mandatory content validation and release gates still apply. Severe confirmed defects must be disabled and repaired via normal static release (REQ-082).
- GitHub Issue Forms for bugs and question corrections; manual review for reported question defects; release notes on GitHub only, no in-app update announcements or personalized revision notifications.

## Acceptance conditions

The following conditions define complete pilot/v1.0 acceptance, not the current MVP exit criteria.

1. All published task types meet pool, coverage, assembly, scoring and lifecycle checks.
2. No existing learning Task regression or local progress loss.
3. Resume, storage failures, cross-tab conflicts, migration, backup and deletion/recovery have automated tests.
4. Pilot represents low/middle/high grades, all three subjects, unit/semester, and interaction types.
5. Release quality report identifies exactly which challenges are ready, planned or unavailable and why.
