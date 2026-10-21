# Technical Architecture

Status: the sections below distinguish the implemented local MVP from deferred product architecture. The application remains a static React/Vite SPA; no backend, database server, or online AI service was added.

## Boundaries

Existing learning routes, answer checking, progress, achievements, hints, retry feedback, and sound are coupled to the learning flow. Challenge mode uses separate routes, UI orchestration, and IndexedDB persistence. It reuses supported answer widgets and the pure production answer checker, without changing the existing learning interaction flow.

## Implemented MVP modules

| Concern | Path |
|---|---|
| Challenge records, scoring, progress, assembly, attempt state | `src/challenges/domain/` |
| Pilot manifest, fingerprints, question registry, readiness validation | `src/challenges/content/` |
| Unit lookup and contextual links | `src/challenges/content/lookup.ts`, `unitLinks.ts` |
| Repository interface and IndexedDB schema v1 | `src/challenges/storage/` |
| Lazy routes and challenge screens | `src/app/router.ts`, `src/App.tsx`, `src/challenges/ui/` |
| Test coverage | `src/challenges/**/*.test.*`, app/catalog tests, `tests/e2e/challenge-flow.spec.ts` |

The current pilot contains one formal unit group and one first-half semester group. Their exact scope, source mapping, content evidence and limits are in [pilot-content-audit.md](pilot-content-audit.md).

## Paper assembly

1. Resolve a task definition, source scope, difficulty, required knowledge points and target count.
2. Filter to active, approved, answer-leakage-reviewed, supported and unique candidates.
3. Require at least twice the task target count for each difficulty pool, with coverage for every required point. Fail closed when the set cannot satisfy these constraints.
4. Use a seed for reproducible candidate order; prefer avoiding question IDs from the last three completed attempts globally without weakening coverage.
5. Persist a snapshot of selected activity content, answer/scoring source, order, manifest version and assembly seed.

Each question carries only the knowledge points it exercises. A high task is required to cover at least two points across the assembled paper; individual questions may exercise one point. The assembly tests run against the actual pilot pools and every declared task.

## State and persistence

An attempt moves from `available` to `in-progress`, then to `completed` or `discarded`. Each first answer is saved under an IndexedDB revision check before advancing. Completion validates the saved attempt and atomically updates best/latest/count/ever-passed progress, recent question IDs and removal of the active attempt. Incomplete or discarded work receives no credit.

The IndexedDB v1 database is `starry-island-challenges` with `attempts`, `taskProgress`, and `challengeMeta` object stores. A stale revision is rejected. The implementation does not claim a cross-tab writer lease or takeover UI. IndexedDB schema upgrades beyond initial version 1, backup/restore, corruption quarantine and browser storage eviction recovery remain future work.

Detailed stored records and the no-full-history result behavior are documented in [DATA_MODEL.md](DATA_MODEL.md).

## Deferred architecture

- Wrong-question notebook and learning-task recommendations.
- Backup/export/import, deletion snapshots, migration and corruption recovery.
- Standalone quality CLI, multi-seed diagnostics and manifest report artifact.
- Cross-tab coordination UX, storage-quota recovery, update deferral and cold-start offline support.
- Complete lifecycle governance, issue forms and release reporting.

These items remain requirements for later pilot/v1.0 phases where listed in the PRD; they are not present merely because they appear in the proposed product model.

## Static build and chunk warning

The route module does not statically import challenge UI or the pilot question manifest. Challenge pages and source units are lazy-loaded. The existing synchronous curriculum manifest remains a separate initial JavaScript chunk via `vite.config.ts`; this removes the 500 kB per-chunk warning but does not materially reduce initial JS transfer. See [REPOSITORY_BASELINE.md](REPOSITORY_BASELINE.md) for the measured build output and the distinction between chunk size and total initial transfer.
