# Pilot Content Audit

Audit date: 2026-10-21. This report describes the local MVP manifest, not a complete course audit or remote release approval.

## Scope and chapter mapping

- Unit pilot: Grade 2, Term 1, Math, Unit 2 — `100以内的加法和减法（二）`.
- Semester pilot: the first half of Grade 2, Term 1 Math, using formal units 01–04.
- The user confirmed dividing the nine formal units as evenly as possible by textbook chapter order: first half 01–04, second half 05–09. This is a planning boundary and is not a claim about any school's actual teaching calendar.
- Unit 2 sources only its own unit questions plus the 42 challenge-only supplemental items. The semester group draws from units 01–04 and the same 42 supplements.
- The existing learning Task content was not changed to expand either pool.

## Candidate inventory

| Group | Basic | Advanced | High | Total | Minimum per tier |
|---|---:|---:|---:|---:|---:|
| Unit 2 | 30 | 30 | 30 | 90 | 30 (15-question target × 2) |
| First-half semester | 75 | 75 | 76 | 226 | 50 (25-question target × 2) |

Each group has two tasks per basic and advanced difficulty and one high task. The unit group targets 15 questions per task; the semester group targets 25. All candidate question IDs and activity IDs resolve uniquely, and content fingerprint validation finds no duplicate candidate content in the effective manifest.

The semester candidate distribution by source and difficulty is:

| Source | Basic | Advanced | High |
|---|---:|---:|---:|
| Unit 1 | 13 | 15 | 14 |
| Unit 2 | 16 | 16 | 16 |
| Unit 3 | 16 | 16 | 16 |
| Unit 4 | 16 | 14 | 16 |
| Challenge-only supplements | 14 | 14 | 14 |
| **Total** | **75** | **75** | **76** |

Existing measurement activities are excluded because the current drawing UI reveals the target length. The content validator permits only challenge renderer formats that are currently safe to present.

## Knowledge-point mapping and coverage

The manifest stores per-question knowledge-point IDs. The pilot mapping derives them from the source unit and the question prompt, expression and interaction content. Tests compare all 226 records against the mapping function, then use the production assembler with a fixed seed to build every declared task from the real candidate pools and verify each task's required points are covered.

An initial mapping assigned every unit-level point to every question in that unit. That could produce false coverage, so it was replaced by the per-question mapping before this audit. Two Grade 2 Math Unit 1 high-task questions about safe measurement-activity planning receive an auxiliary `measurement-activity-planning` tag; they do not count toward the unit's core knowledge-point coverage.

High integration is a property of the assembled high task, not an assertion that every individual question integrates two concepts. Each high task requires at least two core knowledge points, and assembly tests verify the completed paper covers them.

The mapping function is a deterministic content-based classifier and test oracle. It is a structural safeguard, not independent proof that every tag is pedagogically perfect; future subject review may refine the manifest.

## Answer and content checks

- The existing question-review ledger marks the 48 questions in each of Grade 2 Term 1 Math Units 1–4 as reviewed for answer correctness, clarity, age fit, textbook topic and difficulty: [grade-2-question-review.tsv](../curriculum/grade-2-question-review.tsv).
- The 42 new Unit 2 supplemental questions are authored only for the challenge system. Tests evaluate each `+`/`-` expression against its declared answer and check that the numeric result is not exposed in the prompt or hint.
- All 226 candidates are also passed through the production answer checker using their declared correct response. This verifies compatibility between the manifest key and runtime scorer; for reused questions it does not independently prove the answer is semantically correct.
- The runner withholds hints and explanations and locks each first answer. Wrong-answer explanation review appears after the entire challenge is complete.
- Content approval is recorded as `Codex content-author self-review`, permitted by REQ-078. No independent educator review was performed for the 42 supplemental items or this challenge mapping.

## Readiness and limits

Both pilot groups pass the current manifest and assembly gates in local tests. This means the pools meet the implemented structural, compatibility, fingerprint, candidate-count and tagged-coverage checks. It is not a release sign-off for all content quality, a substitute for any necessary teaching review, or evidence that the whole Starry Island challenge system is ready.

The following remain outside this audit: second-half and end-term tasks, other grades or subjects, full-course coverage, cross-browser and cross-tab failure review, storage quota/eviction behavior, migrations, backup/restore, and GitHub CI/deployment evidence.
