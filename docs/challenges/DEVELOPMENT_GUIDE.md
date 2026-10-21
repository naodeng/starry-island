# 闯关系统开发协作指南

本文是闯关系统的协作指南，不是仓库根目录的 `AGENTS.md`，也不会覆盖根目录规则。仓库规范优先；本文只补充闯关功能的约束。

## Mission

Implement the challenge subsystem without altering existing learning Task semantics or deleting learner progress.

## Working rules

1. Read the repository [`README.md`](../../README.md), this directory's [方案入口](README.md), [PRD](PRD.md), [决策冲突](DECISION_CONFLICTS.md), [仓库基线](REPOSITORY_BASELINE.md), and [需求追踪矩阵](REQUIREMENTS_TRACEABILITY.md) before challenge changes.
2. Inspect current repository before assuming paths, data shapes, PR merge state or dependencies.
3. Follow TDD: red → green → refactor; tests accompany every behavior change.
4. Preserve local-first and static deployment; do not add backend services without explicit approval.
5. Use deterministic seeds for paper generation and tests. Never bypass knowledge coverage or release gates.
6. Keep incomplete attempt snapshots consistent across upgrades; never overwrite progress on migration failure.
7. Do not weaken Q78–Q84 user decisions by reintroducing rejected independent approval, automatic approval invalidation, emergency control services or in-app notifications.
8. Avoid collecting sensitive student information. Diagnostic exports use allowlists.
9. Update requirements matrix and release notes for any behavior-affecting change.
10. No claim of feature completion without passing tests and a checked acceptance criterion. The planning documents themselves do not mean a feature is implemented.

## Pull request checklist

- [ ] Linked REQ IDs and acceptance conditions
- [ ] Failing test observed before implementation
- [ ] Unit/integration/E2E coverage appropriate to change
- [ ] Existing learning regression checked
- [ ] Content/coverage/readiness reports checked
- [ ] Schema migration and rollback risks documented
- [ ] No unapproved server dependencies or personal-data collection
