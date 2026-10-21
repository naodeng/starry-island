# Decision Overrides, Open Risks and Review Findings

## Explicit supersessions

1. **REQ-037 vs REQ-080**: Earlier rule invalidated approval whenever normalized content fingerprint changed. Latest choice **REQ-080 A** retains approval. Implement latest choice; retain fingerprints and changed-content audit trails. Do not label an old approval as a fresh review.
2. **REQ-078/079 vs stronger review recommendations**: Authors may self-approve and record only reviewer, time, approved; do not impose independent reviewers or structured human evidence as hidden requirements. REQ-077 still requires risk classification and necessary human checks, without proof artifacts mandated by REQ-079.
3. **REQ-081**: No automatic publication suspension merely due to content changes. Existing hard quality gates and explicit serious-defect disablement remain.
4. **REQ-082–084**: Normal static repair/release; GitHub-only notes; no personalized or generic in-app content update notification.
5. **REQ-068 A**: Automatic replacement of prior recovery point, not conflict-choice UX. Safeguard replacement transaction and deletion confirmation.
6. **REQ-064 A**: No new dedicated child privacy compliance system; avoid asserting that local-first alone ensures regulatory compliance.

## Design ambiguities to validate, not quietly decide

- **Content review vs approval retention**: If a high-risk edit retains `approved`, REQ-077 still calls for manual checks. Decide whether existing CI can verify the check without structured evidence; if not, mark this as a governance limitation rather than claiming enforcement.
- **REQ-074 compensation vs REQ-008 minimal history**: Accurate rescoring often impossible without saved answer evidence. Support only provable compensation, otherwise preserve achievement.
- **REQ-068 atomic replacement vs browser storage**: `localStorage` cannot atomically update multiple keys; choose IndexedDB transaction or journaled generation commits and test crashes.
- **Question bank scale**: 540 semester tasks plus unit tasks, with ≥2× effective pool and coverage constraints. Existing 14,944 questions are historical context, not proof that v1.0 is ready. Audit duplicates, format, difficulty, approval and reuse first.
- **Local checkout drift**: At the Phase 0 audit, local `main` was at `fdb9887` while remote `main` was at `4e125db` (v0.3.0 release). The remote-only commit changed package version and release notes, not application source. Implementation proceeded in the current checkout after managed worktree writes were blocked; the result is local and uncommitted. Recheck branch/remote state before opening a PR.
- **Chunk warning vs initial load**: A separate eager manifest chunk can clear the 500 kB per-chunk warning without reducing the total initial JavaScript payload. If initial load is the goal, agree on the broader asynchronous manifest redesign first.
- **24h recovery**: A browser may evict local data; not a guaranteed backup.
- **Automatic snapshot replacement**: New snapshot cannot be claimed safe if insufficient quota prevents retaining old until commit; deletion must fail safely.

## Confirmed during Phase 0 and MVP

- The challenge data model is separate from `china-study-progress-v1`; content fingerprints use normalized JSON and SHA-256; REQ-080 approval retention is covered by manifest tests.
- The user confirmed splitting Grade 2 Term 1 Math's nine formal units by chapter order: first-half 01–04 and second-half 05–09. This is a planning split, not verified school pacing; only first-half is implemented in the pilot.
- The 607.74 kB per-chunk warning is resolved by emitting the curriculum manifest as a separate initial chunk. The largest emitted JS chunk is 316.56 kB (26.83 kB gzip); the 189.41 kB ChallengePage chunk (31.07 kB gzip) is lazy. The sum of the entry and manifest gzip sizes remains about 113.73 kB, so the change does not materially reduce initial transfer.
- Local TypeScript/build, Vitest coverage, and Playwright results do not establish remote CI, deployment, or release evidence. Recheck the branch and remote state before opening a PR; the implementation remains uncommitted in the current checkout.

## Remaining checks before broader release

- **Content review and approval retention**: if a high-risk edit retains `approved`, REQ-077 still calls for manual checks. Determine whether existing CI can verify required checks without structured evidence; otherwise document the governance limitation.
- **REQ-074 compensation vs REQ-008 minimal history**: accurate rescoring is often impossible without saved answer evidence. Support only provable compensation, otherwise preserve achievement.
- **REQ-068 atomic replacement vs browser storage**: `localStorage` cannot atomically update multiple keys; use IndexedDB transactions or journaled generation commits and test crashes.
- **Question bank scale**: 540 semester tasks plus unit tasks, with ≥2× effective pool and coverage constraints. Existing 14,944 questions are historical context, not proof that v1.0 is ready. Audit duplicates, format, difficulty, approval and reuse first.
- **24h recovery**: a browser may evict local data; it is not a guaranteed backup.
- **Automatic snapshot replacement**: a new snapshot cannot be claimed safe if insufficient quota prevents retaining the old one until commit; deletion must fail safely.
- **Initial-load performance**: the chunk-warning fix did not materially reduce initial JS transfer. If that is the goal, agree on a broader asynchronous manifest redesign and set a total-transfer budget from measured browser data.
