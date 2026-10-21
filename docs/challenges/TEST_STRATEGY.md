# TDD and Quality Gates

Status: this document contains both verified local MVP evidence and future release gates. No statement here implies GitHub Actions or deployment has run for this working tree.

## Local MVP verification — 2026-10-21

- `npm run test:unit`: 124 test files, 856 tests passed for the committed MVP baseline. After the cross-tab reliability follow-up, `npm run test:coverage` ran 124 files and 859 tests passed.
- Post-follow-up coverage: 92.54% statements, 86.93% branches, 92.51% functions and 94.23% lines. The existing `src/app/router.ts` 100% statement/line gate passed.
- `npm run test:e2e`: 21 Chromium tests passed with two workers, including both pilot groups, first-answer recovery, unit-task completion/review, summary-only refresh, keyboard focus, reduced motion, narrow-screen behavior, and the existing course/learning/settings regression suite. A five-worker run previously had one course reload exceed its 5-second locator wait; that scenario passed in isolation and in the two-worker full suite, so the default Playwright worker count is now capped at two to reduce browser contention.
- `npm run build`: TypeScript and Vite production build passed without the 500 kB chunk warning. Largest JavaScript chunk: `curriculum-manifest` 316.56 kB (26.83 kB gzip); app entry: 292.36 kB (86.90 kB gzip); lazy `ChallengePage`: 189.41 kB (31.07 kB gzip). Entry plus the initial manifest chunk total about 113.73 kB gzip, essentially unchanged from the audited baseline; the fix addresses the warning and keeps challenge UI lazy, not total initial transfer size.
- Chromium screenshot review covered desktop light/dark, mobile light/dark, the chapter-ordered semester group, and a mobile challenge question. Browser assertions covered keyboard focus and reduced motion. Screenshots and test results are local evidence only.
- `git diff --check` is run at final review. None of these local checks imply remote CI, deployment or release approval.

## Cross-tab conflict safety follow-up — 2026-10-21

- A regression test first reproduced a stale page accepting another tab's answer when both snapshots had the same revision. The runner now compares the entire persisted attempt before treating an uncertain write as committed.
- `npm run test:coverage`: 124 files, 859 tests passed; 92.54% statements, 86.93% branches, 92.51% functions and 94.23% lines.
- `npm run test:e2e -- tests/e2e/challenge-flow.spec.ts --workers=1`: 2 browser tests passed after the snapshot change. The full 21-test browser suite passed on the committed MVP immediately before this follow-up.
- `npm run build`: passed without a 500 kB JavaScript chunk warning; the largest JS chunk remains 316.56 kB. Chromium requires local execution with macOS Mach bootstrap access; its first sandboxed launch was denied before tests started.

## Web Locks writer lease follow-up — 2026-10-21

- The runner now queues start/resume behind an exclusive task-scoped Web Lock, re-reads IndexedDB after acquisition, and releases the lease after completion, discard or page teardown. Unsupported browsers use the existing revision checks.
- `src/challenges/storage/writerLock.test.ts` covers unsupported browsers, queued acquisition/release and aborting a queued request.
- `npm run test:coverage`: 125 files and 864 tests passed; 92.19% statements, 86.79% branches, 92.58% functions and 93.85% lines. The final run includes explicit lease-release assertions for completion and confirmed discard.
- `npm run test:unit -- src/challenges/ui/ChallengeRunner.test.tsx src/challenges/storage/writerLock.test.ts`: 11/11 passed.
- `npm run test:e2e -- tests/e2e/challenge-flow.spec.ts --workers=1`: 3/3 passed on the final code, including waiting behind an active page and resuming the same question after that page closes.
- `npm run test:e2e -- --workers=1`: 22/22 passed after the Web Locks integration and before the final two lease-cleanup edge-case fixes; the focused challenge browser suite and all unit tests were rerun after those fixes.
- `npm run build`: passed after the final source changes without a 500 kB JavaScript chunk warning; the largest JavaScript chunk remains 316.56 kB.
- This is local evidence only. Explicit browser-process crash recovery, backup, migration, quota and storage corruption behavior remain unimplemented.

## Implemented MVP verification coverage

- Pure unit tests cover score/pass/star boundaries, first-answer locking, seeded assembly, group progress, manifest readiness, fingerprints, answer-key compatibility, and storage revision transitions.
- Manifest integration tests load the real source units, compare each registered question's tags with its content-derived mapping, validate the 2× pools, and assemble every pilot task against the actual candidates.
- Repository tests use `fake-indexeddb` to check persistence, revision conflicts across two connections to the same database, and atomic completion updates. Runner tests cover the same-revision/different-answer conflict and an ambiguous response after an exact successful write.
- The challenge browser test checks a narrow viewport, dark theme, reduced motion, reload recovery and unchanged learning-progress storage.
- Existing application and learning tests remain part of the same repository gates.

## Known test gaps

- No explicit browser-process crash recovery, storage quota/eviction/corruption test, backup/import/migration test, or offline/update test exists for the challenge system.
- No standalone manifest quality report or multi-seed statistical simulation is wired into CI.
- Browser tests exercise focus navigation and reduced motion, but no independent accessibility audit or assistive-technology review has been performed.
- Save-retry and confirmed discard are covered at component level; browser E2E does not inject IndexedDB write failures or exercise the browser confirmation dialog.
- Automated scoring and structure checks do not replace semantic curriculum review. See [pilot-content-audit.md](pilot-content-audit.md).

## TDD loop

For each capability: write failing domain tests → implement minimum behavior → refactor → add integration/browser failure cases → update requirements matrix and documentation.

## Unit and property tests (Vitest)

- Passing thresholds use integer `ceil`; 1st answer only; star thresholds and badge monotonicity.
- Seeded assembly determinism; pool effective count; dedup; hard coverage; format constraints; last-three-attempt preference not overriding coverage.
- Wrong-book transitions across **separate completed attempts**, reset on wrong.
- Release status from manifest and readiness gates; content lifecycle and reviewed-status rules.
- Schema migrations, invalid data isolation, checksum validation, import conflict handling.
- Deletion scope, 24h expiry, replacement of prior recovery point, single-use restore, crash-recovery protocol.

## Integration and browser tests (Playwright)

- Existing learning Task regressions across all supported question widgets.
- Begin, autosave, refresh, resume same order and locked answers; discard and reroll; complete and rewards.
- Storage quota/write failure, unsupported-Web-Locks stale-write conflicts, browser-process crash recovery, and browser reload.
- Offline continuation of loaded paper; safe update handling.
- Accessible focus order, keyboard/touch, reduced motion, speech restriction and sound defaults.
- Child-friendly error recovery and diagnostic export allowlist.

## Curriculum/content validation

- Unique IDs, referential integrity, normalized content fingerprints, approval manifest and lifecycle.
- Effective eligible pool ≥2× count; required basic/advanced joint coverage; high integration; stage knowledge coverage.
- Multi-seed assembly simulations with utilization, selection frequency, adjacent repeat, distribution and failure rate.
- Hard constraints block releases; diversity metrics initially informational.
- Content change impact analysis tests every referencing task; if unknown, broaden to full validation.

## CI tiers

The repository currently has one `Quality` GitHub Actions job: `npm ci`, `npm run test:unit`, `npm run test:coverage`, `npm run build` (including `tsc -b`), and `npm run test:e2e`. There is no standalone lint script at the audited commit. The tiers below are a proposed future split, not a description of current CI:

1. PR fast checks: types/build, unit tests, manifest schema, and impacted-task checks.
2. PR expanded checks when impact cannot be resolved, plus critical browser regressions.
3. Release gate: full curriculum validation, required simulation suites, Vitest/Playwright, learning regressions, human pedagogical checks, and readiness report.

For the existing chunk warning, record both the largest emitted JS chunk and total initial compressed JS before and after any change. A per-chunk result below 500 kB does not prove that initial transfer size decreased. Do not set a new total-size budget until the baseline and browser loading behavior have been measured.

Never turn a hard failure into a warning to ship. Approval retention (REQ-080) does not exempt a changed question from mandatory structural/scoring/coverage checks.
