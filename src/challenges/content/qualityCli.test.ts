// @ts-expect-error Node built-ins are available in Vitest, while this browser-first tsconfig omits @types/node.
import { spawnSync } from 'node:child_process';
// @ts-expect-error Node built-ins are available in Vitest, while this browser-first tsconfig omits @types/node.
import { mkdtemp, readFile, rm } from 'node:fs/promises';
// @ts-expect-error Node built-ins are available in Vitest, while this browser-first tsconfig omits @types/node.
import { tmpdir } from 'node:os';
// @ts-expect-error Node built-ins are available in Vitest, while this browser-first tsconfig omits @types/node.
import { join, resolve } from 'node:path';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { pilotSupplementalActivities } from './pilotSupplementalActivities';

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
    expect(report.groups).toHaveLength(2);
    expect(report.groups.map(({ status }) => status)).toEqual(['ready', 'ready']);
    expect(markdown).toContain('# 闯关题库质量报告');
    expect(firstJson).not.toContain(pilotSupplementalActivities[0].activity.prompt);

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
});
