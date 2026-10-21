# Local Data Model

Status: the first challenge persistence schema is implemented locally. Product-wide migration, export/import, backups and recovery snapshots remain proposed work; sections marked deferred are not current behavior.

## Existing learning data boundary

The existing learning progress remains in `china-study-progress-v1` and is not read or written by the challenge repository. Challenge data uses the separate IndexedDB database `starry-island-challenges`, schema version 1.

## Implemented IndexedDB records

| Object store | Key | Stored value |
|---|---|---|
| `attempts` | `taskId` | One incomplete attempt per task, including frozen question snapshots, seed, cursor, first answers, elapsed time and monotonic revision |
| `taskProgress` | `taskId` | Best and latest correct/total, completion count, ever-passed flag, update time and revision |
| `challengeMeta` | `key` | The question IDs from the last three completed attempts, under `recent-question-ids` |

The corresponding typed records are `ChallengeAttempt`, `ChallengeQuestionSnapshot`, `ChallengeResult`, and `TaskProgress` in `src/challenges/domain/types.ts`. Repository operations are declared in `src/challenges/storage/repository.ts` and implemented in `indexedDbRepository.ts`.

### Write and completion rules

- A new attempt starts at revision 0 with no answers. Each confirmed first answer increments the revision exactly once and advances one question.
- Writes use IndexedDB transactions. A stale revision is rejected; an answer cannot be changed or added for a different question.
- Completion recalculates the score using the production answer checker, validates the progress update, then atomically writes progress and recent IDs and removes the incomplete snapshot.
- The UI advances only after the repository confirms the answer write. Failed writes pause the attempt and expose retry/exit actions.
- No completed attempt or answer history is retained. Detailed wrong-answer explanations are available only on the immediate result page; after refresh/revisit, only the saved task progress summary remains.
- Discard removes the active snapshot and does not update score, completion count or recent-question history.

The repository tests use the development-only `fake-indexeddb` package. Browser-level save/reload behavior is covered separately; this does not substitute for cross-tab, quota, eviction or corruption testing.

## Versioning and fingerprints

Challenge database version 1 creates the three stores above. No prior challenge schema exists to migrate. Future schema upgrades must preserve learning progress and keep the original challenge data until the validated new generation commits.

Question content uses a canonical SHA-256 fingerprint. The manifest stores the approved fingerprint and validation reports current changes. Per REQ-080, a changed fingerprint does not automatically clear `approved`; it is a change signal, not proof that the current wording received a new review.

## Deferred: backup, restore and recovery

The following are product requirements or design proposals, not implemented in this MVP:

- Versioned JSON export/import with checksum, preview, conflict handling and explicit user action.
- One 24-hour local recovery snapshot, verified before deletion or replacement and consumed only after successful restore.
- Safe clearing, invalid-record quarantine, raw export on request and corruption isolation.
- Legacy migrations, import merge rules, storage quota recovery and browser-eviction handling.

Browser storage may be evicted; a future 24-hour snapshot would not guarantee retention. See [PRD.md](PRD.md) for the full confirmed product requirements.

## Privacy boundary

All MVP challenge data is stored in the current browser. No account, server, tracker or challenge diagnostic upload was added. This local-first implementation is not a claim of legal compliance.
