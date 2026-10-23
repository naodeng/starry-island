// @ts-expect-error Node built-ins are available in Vitest, while this browser-first tsconfig omits @types/node.
import { spawnSync } from 'node:child_process';
// @ts-expect-error Node built-ins are available in Vitest, while this browser-first tsconfig omits @types/node.
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
// @ts-expect-error Node built-ins are available in Vitest, while this browser-first tsconfig omits @types/node.
import { tmpdir } from 'node:os';
// @ts-expect-error Node built-ins are available in Vitest, while this browser-first tsconfig omits @types/node.
import { join, resolve } from 'node:path';
// @ts-expect-error Node built-ins are available in Vitest, while this browser-first tsconfig omits @types/node.
import { pathToFileURL } from 'node:url';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import type { ChallengeQualityReport } from '../domain/types';
import { pilotSupplementalActivities } from './pilotSupplementalActivities';
import { pilotChineseSupplementalActivities } from './pilotChineseSupplementalActivities';
import { grade1MathUnit01SupplementalActivities } from './grade1MathUnit01SupplementalActivities';
import { grade1MathUnit02SupplementalActivities } from './grade1MathUnit02SupplementalActivities';
import { grade1MathUnit03SupplementalActivities } from './grade1MathUnit03SupplementalActivities';
import { parseChallengeManifest } from './manifestSchema';

declare const process: {
  cwd(): string;
  env: Record<string, string | undefined>;
  execPath: string;
};

const repoRoot = process.cwd();
const cliPath = resolve(repoRoot, 'scripts/challenges/quality.mjs');
const manifestPath = resolve(repoRoot, 'src/challenges/content/pilot-manifest.json');
let reportDirectory: string;

function runCli(args: string[], options: { ci?: string } = {}) {
  const env = { ...process.env };
  delete env.CI;
  if (options.ci !== undefined) env.CI = options.ci;
  return spawnSync(process.execPath, [cliPath, ...args], {
    cwd: repoRoot,
    encoding: 'utf8',
    env,
    timeout: 120_000,
  });
}

describe('challenge quality CLI', () => {
  beforeAll(async () => {
    reportDirectory = await mkdtemp(join(tmpdir(), 'starry-island-quality-'));
  });

  afterAll(async () => {
    await rm(reportDirectory, { recursive: true, force: true });
  });

  it('loads the real pilot, writes deterministic reports and leaves source content unchanged', async () => {
    const manifestBefore = await readFile(manifestPath, 'utf8');
    const args = ['--report-dir', reportDirectory];
    const firstRun = runCli(args);
    expect(firstRun.error).toBeUndefined();
    expect(firstRun.status).toBe(0);

    const jsonPath = join(reportDirectory, 'challenge-quality-report.json');
    const markdownPath = join(reportDirectory, 'challenge-quality-report.md');
    const firstJson = await readFile(jsonPath, 'utf8');
    const markdown = await readFile(markdownPath, 'utf8');
    const report = JSON.parse(firstJson) as {
      overall: { passed: boolean };
      groups: Array<{ status: string }>;
    };

    expect(report.overall.passed).toBe(true);
    expect(report.groups).toHaveLength(7);
    expect(report.groups.map(({ status }) => status)).toEqual(['ready', 'ready', 'ready', 'ready', 'ready', 'ready', 'ready']);
    expect(markdown).toContain('# 闯关题库质量报告');
    expect(firstJson).not.toContain(pilotSupplementalActivities[0].activity.prompt);
    expect(firstJson).not.toContain(pilotChineseSupplementalActivities[0].activity.prompt);
    expect(firstJson).not.toContain(grade1MathUnit01SupplementalActivities[0].activity.prompt);
    expect(firstJson).not.toContain(grade1MathUnit02SupplementalActivities[0].activity.prompt);
    expect(firstJson).not.toContain(grade1MathUnit03SupplementalActivities[0].activity.prompt);

    const secondRun = runCli(args);
    expect(secondRun.status).toBe(0);
    expect(await readFile(jsonPath, 'utf8')).toBe(firstJson);
    expect(await readFile(manifestPath, 'utf8')).toBe(manifestBefore);
  });

  it('rejects a quick seed count below 100 in CI with parameter exit code 2', () => {
    const result = runCli(['--seed-count', '99', '--report-dir', reportDirectory], { ci: 'true' });

    expect(result.error).toBeUndefined();
    expect(result.status).toBe(2);
    expect(result.stderr).toContain('100');
  });

  it('runs the real Vite SSR loader without opening a TCP listener', () => {
    const noListenReportDirectory = join(reportDirectory, 'no-listen');
    const script = `
      import { Server } from 'node:net';
      const originalListen = Server.prototype.listen;
      let listenCalls = 0;
      Server.prototype.listen = function (...args) {
        listenCalls += 1;
        return originalListen.apply(this, args);
      };
      try {
        const { runQualityCommand } = await import(${JSON.stringify(pathToFileURL(cliPath).href)});
        const code = await runQualityCommand(['--report-dir', ${JSON.stringify(noListenReportDirectory)}, '--seed-count', '1'], {
          env: { ...process.env, CI: undefined },
        });
        process.exitCode = listenCalls === 0 ? code : 99;
      } finally {
        Server.prototype.listen = originalListen;
      }
    `;
    const result = spawnSync(process.execPath, ['--input-type=module', '--eval', script], {
      cwd: repoRoot,
      encoding: 'utf8',
      env: { ...process.env, CI: '' },
      timeout: 120_000,
    });

    expect(result.error).toBeUndefined();
    expect(result.status, result.stderr).toBe(0);
  });

  it('returns gate exit code 1 and writes diagnostics when a global integrity issue fails quality', async () => {
    // @ts-expect-error Node ESM 命令模块通过 Vitest 动态加载；此浏览器优先配置未声明该模块类型。
    const { runQualityCommand } = await import('../../../scripts/challenges/quality.mjs');
    const failedReport: ChallengeQualityReport = {
      reportSchemaVersion: 1,
      manifestVersion: 'fixture-v1',
      overall: { passed: false, blockingIssueCount: 1, warningCount: 0, releasedGroupCount: 1, readyReleasedGroupCount: 0 },
      errors: [{ classification: 'global-blocking', code: 'missing-question', path: 'groups.group-a.questionIds', message: 'Question ID is missing.' }],
      warnings: [],
      groups: [],
      contentChanges: [],
      exactDuplicateGroups: [],
      similarQuestionPairs: [],
    };
    const failedReportDirectory = join(reportDirectory, 'failed-gate');
    const stdout: string[] = [];
    const stderr: string[] = [];

    const exitCode = await runQualityCommand(['--report-dir', failedReportDirectory], {
      cwd: repoRoot,
      env: { CI: 'true' },
      loadQualityModules: async () => ({
        loadChallengeQualityInputs: async () => ({}),
        buildChallengeQualityReport: async () => failedReport,
        renderChallengeQualityMarkdown: () => '# 闯关题库质量报告\n\n门禁未通过。\n',
      }),
      stdout: (value: string) => stdout.push(value),
      stderr: (value: string) => stderr.push(value),
    });

    expect(exitCode).toBe(1);
    expect(stderr).toEqual([]);
    expect(stdout.join('')).toContain('未通过');
    const json = await readFile(join(failedReportDirectory, 'challenge-quality-report.json'), 'utf8');
    const markdown = await readFile(join(failedReportDirectory, 'challenge-quality-report.md'), 'utf8');
    expect(json).toContain('missing-question');
    expect(markdown).toContain('门禁未通过');
  });

  it('overwrites a previous success report with a diagnostic when manifest loading fails', async () => {
    // @ts-expect-error Node ESM 命令模块通过 Vitest 动态加载；此浏览器优先配置未声明该模块类型。
    const { runQualityCommand } = await import('../../../scripts/challenges/quality.mjs');
    const failedReportDirectory = join(reportDirectory, 'load-failure');
    await mkdir(failedReportDirectory, { recursive: true });
    await writeFile(join(failedReportDirectory, 'challenge-quality-report.json'), '{"overall":{"passed":true}}\n', 'utf8');
    await writeFile(join(failedReportDirectory, 'challenge-quality-report.md'), '# 旧报告：通过\n', 'utf8');
    const stderr: string[] = [];

    const exitCode = await runQualityCommand(['--report-dir', failedReportDirectory], {
      cwd: repoRoot,
      env: { CI: 'true' },
      loadQualityModules: async () => ({
        loadChallengeQualityInputs: async () => parseChallengeManifest({
          version: 'bad-fixture',
          questions: [null],
          groups: [],
        }),
      }),
      stderr: (value: string) => stderr.push(value),
    });

    expect(exitCode).toBe(2);
    expect(stderr.join('')).toContain('questions[0]');
    const json = await readFile(join(failedReportDirectory, 'challenge-quality-report.json'), 'utf8');
    const markdown = await readFile(join(failedReportDirectory, 'challenge-quality-report.md'), 'utf8');
    expect(json).not.toContain('"passed":true');
    expect(json).toContain('invalid-challenge-manifest');
    expect(json).toContain('questions[0]');
    expect(markdown).not.toContain('旧报告：通过');
    expect(markdown).toContain('invalid-challenge-manifest');
    expect(markdown).toContain('questions[0]');
  });
});
