# Delivery Roadmap

Status: the MVP vertical slice was committed locally on `codex/challenge-system-mvp` as `566b189`. It has not been pushed, merged, or deployed. A follow-up cross-tab conflict-safety change is currently uncommitted in the same worktree. Local validation results are recorded in [TEST_STRATEGY.md](TEST_STRATEGY.md).

## Phase 0 — Repository audit and baseline (complete)

The read-only audit is recorded in [REPOSITORY_BASELINE.md](REPOSITORY_BASELINE.md). It counted 311 catalog entries, 254 formal numbered achievement-eligible units, 57 other entries, and 1,868 learning session IDs. It confirmed the existing learning progress key and CI commands, and found that question-level challenge eligibility and knowledge-point coverage were not represented.

The audit also found a 607.74 kB single-chunk warning. The current Vite configuration emits the curriculum manifest as its own initial chunk; this removes the per-chunk warning without materially reducing total initial JavaScript transfer. Final local output and gzip sizes are recorded in [REPOSITORY_BASELINE.md](REPOSITORY_BASELINE.md).

## MVP — Engine and vertical slice (implemented and committed locally)

- A dedicated `/challenges` center and group/task routes, lazy-loaded outside the existing learning route flow.
- A formal Grade 2 Term 1 Math Unit 2 group and a first-half semester group using units 01–04. The split follows the user's confirmed chapter-order equal split for the nine-unit term; it is not a school-calendar assertion.
- Declarative candidate manifest, per-question knowledge-point tags, release validation, stable content fingerprints, duplicate detection, and seeded assembly that fails closed when question count or coverage cannot be met.
- First-answer scoring, no hints or retry, post-completion explanation review, IndexedDB save/resume, discard, atomic progress completion, recent-three question tracking, stars and task progress.
- Existing learning storage and interactions remain separate; the browser flow checks that learning progress is unchanged.

Current sample size: 90 candidates for the unit group (30 per difficulty) and 226 candidates for the semester group (75 basic, 75 advanced, 76 high). The full content review boundary and remaining gaps are in [pilot-content-audit.md](pilot-content-audit.md).

Exit evidence required for this MVP slice: focused and full unit tests, type-check/build, browser recovery flow, `git diff --check`, and a clear record of content-review limits. This evidence is local only and does not imply remote CI or release approval.

## Pilot — Cross-grade and cross-subject evidence (not implemented)

Select representative low (1–2), middle (3–4), and high (5–6) grades, all three subjects, unit and semester challenges, difficulty tiers, and interaction formats. Add the wrong-question notebook, richer growth view, learning links, age-tier accessibility review, failure/recovery, backup/migration, and authoring quality tooling.

Reliability work can proceed independently of the paused curriculum expansion. The local conflict-safety slice now includes shared IndexedDB revision checks, full-snapshot verification for ambiguous writes, and a Web Locks writer lease with browser-tested wait/re-read takeover after a page closes. Browsers without Web Locks rely on revision checks. Backups, migrations, explicit crash recovery and storage-failure recovery remain open; this does not mark the broader Pilot complete.

Exit: passing content audit, cross-tab failure tests, accessible interaction review, and successful release-gate dry run.

## v1.0 — Complete curriculum coverage (not implemented)

- All audited formal numbered unit challenges.
- Three semester stages × five tasks × 36 grade/semester/subject combinations = **540 semester tasks**.
- Release reporting, full question lifecycle and review workflow, change logs, Issue Forms, release notes, diagnostics, safe clear/recovery, and complete automated plus human content gates.

Exit: no released challenge violates hard gates; end-to-end data safety tests pass; quality report and release notes are ready.

## Later (not v1.0 commitments)

Optional backend sync, multi-student accounts, richer analytics, multi-version recycle bin, advanced governance, AI-assisted authoring/review, and an in-app update center. Revisit only with usage evidence.

## Estimation guidance

Do not provide calendar commitments before the curriculum inventory and question-pool shortfall audit are complete. The largest variable remains writing and pedagogically reviewing enough effective questions for every task.
