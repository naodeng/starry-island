# Requirements Traceability Matrix

Status: all entries record **confirmed product decisions**. REQ-085 freezes the baseline. The matrix below remains the decision index; implementation progress is tracked separately and only for the local MVP slice. See [REPOSITORY_BASELINE.md](REPOSITORY_BASELINE.md) for the checkout and [ROADMAP.md](ROADMAP.md) for the delivered boundary.

## MVP slice evidence (local working tree, 2026-10-21)

These statuses apply only to the Unit 2 and first-half semester pilot groups. They do not certify full-course coverage, remote CI, deployment or v1.0 readiness.

| REQ | Status in this slice | Evidence |
|---|---|---|
| REQ-001 | Implemented for route and progress isolation | `src/App.tsx`; `src/App.test.tsx`; `tests/e2e/challenge-flow.spec.ts` |
| REQ-004 | Implemented at group/task level; a high paper covers multiple required points | `src/challenges/content/pilot-manifest.json`; `src/challenges/domain/assemble.test.ts`; `src/challenges/content/pilotContent.test.ts` |
| REQ-005 | Implemented scoring thresholds and integer comparison | `src/challenges/domain/grading.ts`, `grading.test.ts` |
| REQ-006 | Implemented first-answer lock; challenge runner does not expose hints/retry | `src/challenges/domain/attempt.test.ts`; `src/challenges/ui/ChallengeRunner.test.tsx` |
| REQ-008 | Implemented best/latest/count/ever-passed summary; no full attempt history | `src/challenges/storage/indexedDbRepository.test.ts`; `docs/challenges/DATA_MODEL.md` |
| REQ-009 | Partial: seeded assembly is implemented for the two pilot groups only | `src/challenges/domain/assemble.ts`; `src/challenges/content/pilotContent.test.ts` |
| REQ-011 | Implemented for the declared pilot candidate pools | `src/challenges/content/pilot-manifest.json`; `src/challenges/content/pilotManifest.test.ts` |
| REQ-012 | Implemented recent-three preference from completed pilot attempts | `src/challenges/storage/indexedDbRepository.test.ts`; `src/challenges/domain/assemble.test.ts` |
| REQ-013 / 014 | Partial: supported existing widgets are reused; measurement is excluded from the pilot | `src/challenges/ui/ChallengeActivityRenderer.tsx`; manifest validation tests |
| REQ-015 | Partial: candidate and assembled-paper coverage is checked for pilot knowledge points | `src/challenges/content/pilotManifest.test.ts`; `src/challenges/content/pilotContent.test.ts` |
| REQ-016 / 017 | Partial: elapsed time, confirmed answer persistence and refresh recovery are implemented; wider offline/quota recovery remains open | `src/challenges/storage/`; `tests/e2e/challenge-flow.spec.ts` |
| REQ-018 | Implemented discard confirmation without completion credit | `src/challenges/ui/ChallengeRunner.tsx`; repository tests |
| REQ-019 / 020 / 021 | Implemented pilot stars and five-task badge derivation | `src/challenges/domain/progress.ts`, `progress.test.ts`; challenge UI tests |
| REQ-027 | Implemented first-half mapping using the user-confirmed chapter-order split; not a school calendar | `src/challenges/content/pilot-manifest.json`; `pilotManifest.test.ts` |
| REQ-028 | Partial: runtime manifest gate exists; no dedicated CI report command was added | `src/challenges/content/validateManifest.ts`; `TEST_STRATEGY.md` |
| REQ-029 | Partial: center and Unit 2 contextual entry exist; other groups are not covered | catalog and router tests |
| REQ-037 / REQ-080 | Implemented fingerprint change reporting while retaining approved state as REQ-080 requires | `src/challenges/content/fingerprint.ts`; `validateManifest.test.ts` |
| REQ-055 / REQ-056 | Implemented reduced-motion styling and silent challenge wrapper | `src/challenges/ui/challenge.css`; `src/App.test.tsx` |
| REQ-058 / REQ-059 | Partial: IndexedDB revision conflicts and confirmed writes are implemented; no writer lease/takeover UI | `src/challenges/storage/indexedDbRepository.test.ts`; `ChallengeRunner.test.tsx` |
| REQ-085 | Implemented as this frozen baseline and traceability package | `README.md`, this directory, and `docs/superpowers/plans/2026-10-21-challenge-system-mvp.md` |

An REQ absent from this slice table is not thereby implemented. Reconcile all 85 decisions against release evidence before marking any later phase complete.

| ID | Confirmed decision | Primary artifact / verification |
|---|---|---|
| REQ-001 | Preserve learning Tasks; separate challenge mode | PRD / acceptance tests |
| REQ-002 | Numbered unit challenges; review content in semester | PRD / acceptance tests |
| REQ-003 | Three semester stages × five tasks | PRD / acceptance tests |
| REQ-004 | Two basic/two advanced cover core; high integrates | PRD / acceptance tests |
| REQ-005 | Pass thresholds 70/80/85 | PRD / acceptance tests |
| REQ-006 | First answer final; no hints/retry | PRD / acceptance tests |
| REQ-007 | All released challenges unlocked | PRD / acceptance tests |
| REQ-008 | Best/latest/count/ever passed; no full history | PRD / acceptance tests |
| REQ-009 | Audited pools and randomized assembly | PRD / acceptance tests |
| REQ-010 | Reuse audited questions, fill gaps | PRD / acceptance tests |
| REQ-011 | Candidate pool ≥2× target | PRD / acceptance tests |
| REQ-012 | Reuse across tasks; avoid recent | PRD / acceptance tests |
| REQ-013 | Flexible formats per context | PRD / acceptance tests |
| REQ-014 | Reuse widgets, generic new only if needed | PRD / acceptance tests |
| REQ-015 | Unit group joint coverage | PRD / acceptance tests |
| REQ-016 | Untimed, elapsed recorded | PRD / acceptance tests |
| REQ-017 | Autosave and resume fixed snapshot | PRD / acceptance tests |
| REQ-018 | Discard/reroll with confirmation | PRD / acceptance tests |
| REQ-019 | Separate challenge rewards | PRD / acceptance tests |
| REQ-020 | Star thresholds by tier | PRD / acceptance tests |
| REQ-021 | Group badges when five pass | PRD / acceptance tests |
| REQ-022 | Results and weak-point suggestions | PRD / acceptance tests |
| REQ-023 | Link learning Tasks | PRD / acceptance tests |
| REQ-024 | Lightweight wrong notebook | PRD / acceptance tests |
| REQ-025 | Two later correct attempts for mastery | PRD / acceptance tests |
| REQ-026 | Avoid last 3 completed attempts globally | PRD / acceptance tests |
| REQ-027 | Teaching-phase semester scopes | PRD / acceptance tests |
| REQ-028 | Declarative coverage and CI | PRD / acceptance tests |
| REQ-029 | Challenge center and contextual links | PRD / acceptance tests |
| REQ-030 | Cards with progress/awards | PRD / acceptance tests |
| REQ-031 | Local challenge growth stats | PRD / acceptance tests |
| REQ-032 | Reuse existing identity model | PRD / acceptance tests |
| REQ-033 | Local JSON backup/import | PRD / acceptance tests |
| REQ-034 | Engine→pilot→full phased delivery | PRD / acceptance tests |
| REQ-035 | Cross-grade/cross-subject pilot | PRD / acceptance tests |
| REQ-036 | Hard release quality gates | Quality CLI / CI tests |
| REQ-037 | Git review manifest and fingerprints | Quality CLI / CI tests |
| REQ-038 | Stable global question IDs | Quality CLI / CI tests |
| REQ-039 | Versioned incomplete snapshots | Quality CLI / CI tests |
| REQ-040 | Active/Disabled/Deprecated lifecycle | Quality CLI / CI tests |
| REQ-041 | Severe defects block incomplete attempt | Quality CLI / CI tests |
| REQ-042 | Static readiness quality reports | Quality CLI / CI tests |
| REQ-043 | Multi-seed assembly simulation | Quality CLI / CI tests |
| REQ-044 | Deterministic dedup and similarity flags | Quality CLI / CI tests |
| REQ-045 | 2× effective approved unique pool | Quality CLI / CI tests |
| REQ-046 | Ready/planned/unavailable display | Quality CLI / CI tests |
| REQ-047 | Declarative release manifest | Quality CLI / CI tests |
| REQ-048 | Versioned migrations | Data model / integration tests |
| REQ-049 | Quarantine corrupt data | Data model / integration tests |
| REQ-050 | Loaded challenge works offline | Data model / integration tests |
| REQ-051 | Safe update deferral | Data model / integration tests |
| REQ-052 | Accessibility baseline | Data model / integration tests |
| REQ-053 | On-demand conditional speech | Data model / integration tests |
| REQ-054 | Grade-tier UI density | Data model / integration tests |
| REQ-055 | Neutral progress and reduced motion | Data model / integration tests |
| REQ-056 | Muted optional sound | Data model / integration tests |
| REQ-057 | Safe exit and discard confirmation | Data model / integration tests |
| REQ-058 | Cross-tab single-writer | Data model / integration tests |
| REQ-059 | Confirmed writes and failure pause | Data model / integration tests |
| REQ-060 | Contextual backup reminders | Data model / integration tests |
| REQ-061 | Import preview and safe merge | Data model / integration tests |
| REQ-062 | Backup SHA-256 integrity | Data model / integration tests |
| REQ-063 | Optional portable preferences | Data model / integration tests |
| REQ-064 | No dedicated child privacy compliance system | Data model / integration tests |
| REQ-065 | Tiered clearing and strong confirmation | Data model / integration tests |
| REQ-066 | Pre-delete snapshot and limited undo | Data model / integration tests |
| REQ-067 | 24h single recovery point | Data model / integration tests |
| REQ-068 | Auto-replace old snapshot on new deletion | Data model / integration tests |
| REQ-069 | Consume snapshot after successful restore | Data model / integration tests |
| REQ-070 | Unified errors and recovery | Governance / release tests |
| REQ-071 | Manual redacted diagnostics | Governance / release tests |
| REQ-072 | Standard GitHub Bug Issue Form | Governance / release tests |
| REQ-073 | Question correction form and human review | Governance / release tests |
| REQ-074 | Preserve historic rewards; evidence-based compensation | Governance / release tests |
| REQ-075 | Structured content change log/release summary | Governance / release tests |
| REQ-076 | Impact-directed regression + full release | Governance / release tests |
| REQ-077 | Three-tier change risk | Governance / release tests |
| REQ-078 | Author self-approval permitted | Governance / release tests |
| REQ-079 | Minimal approval record | Governance / release tests |
| REQ-080 | Approval retained after edits (overrides 037) | Governance / release tests |
| REQ-081 | No extra release suspension on edits | Governance / release tests |
| REQ-082 | Normal static release for severe fixes | Governance / release tests |
| REQ-083 | GitHub-only release notes | Governance / release tests |
| REQ-084 | No personalized revision notifications | Governance / release tests |
| REQ-085 | Freeze baseline and author engineering documents | Planning package / review |

## Tracking workflow

Do not mark any requirement Done based solely on this decision index. Add owner and remote/release evidence when a reviewed implementation PR exists.

## Critical override notes

- REQ-080 supersedes REQ-037 **only** for automatic invalidation of approval on fingerprint change.
- REQ-078/079 allow author self-review and minimal approval metadata.
- REQ-081 does not permit bypassing existing hard quality gates.
- REQ-068 chooses automatic recovery-point replacement.
- REQ-082/083/084 exclude emergency remote disable and in-app content update notifications.
