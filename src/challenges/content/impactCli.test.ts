// @ts-expect-error Node built-ins are available in Vitest, while this browser-first tsconfig omits @types/node.
import { spawnSync } from 'node:child_process';
// @ts-expect-error Node built-ins are available in Vitest, while this browser-first tsconfig omits @types/node.
import { readFile } from 'node:fs/promises';
// @ts-expect-error Node built-ins are available in Vitest, while this browser-first tsconfig omits @types/node.
import { resolve } from 'node:path';
// @ts-expect-error Node built-ins are available in Vitest, while this browser-first tsconfig omits @types/node.
import { pathToFileURL } from 'node:url';
import { describe, expect, it } from 'vitest';
import type { ChallengeManifest } from '../domain/types';
import rawManifest from './pilotManifest';

declare const process: {
  cwd(): string;
  env: Record<string, string | undefined>;
  execPath: string;
};

const repoRoot = process.cwd();
const cliPath = resolve(repoRoot, 'scripts/challenges/impact.mjs');

function runCli(args: string[]) {
  return spawnSync(process.execPath, [cliPath, ...args], {
    cwd: repoRoot,
    encoding: 'utf8',
    env: { ...process.env, CI: '' },
    timeout: 120_000,
  });
}

describe('challenge impact CLI', () => {
  it('prints Chinese usage for help without loading the curriculum', () => {
    const result = runCli(['--help']);

    expect(result.error).toBeUndefined();
    expect(result.status).toBe(0);
    expect(result.stdout).toContain('用法：npm run challenge:impact');
    expect(result.stdout).toContain('--question-id');
  });

  it('rejects invocation without a question ID', () => {
    const result = runCli([]);

    expect(result.error).toBeUndefined();
    expect(result.status).toBe(2);
    expect(result.stderr).toContain('至少提供一个 --question-id');
  });

  it('lists every same-difficulty task for multiple questions in the real pilot manifest', async () => {
    const manifestBefore = await readFile(resolve(repoRoot, 'src/challenges/content/pilot-manifest.json'), 'utf8');
    const manifestFragmentPaths = [
      resolve(repoRoot, 'src/challenges/content/pilot-manifest-grade1-math-unit05.json'),
      resolve(repoRoot, 'src/challenges/content/pilot-manifest-grade1-math-unit06.json'),
      resolve(repoRoot, 'src/challenges/content/pilot-manifest-grade1-math-unit07.json'),
    ];
    const manifestFragmentsBefore = await Promise.all(manifestFragmentPaths.map((path) => readFile(path, 'utf8')));
    const manifest = rawManifest as unknown as ChallengeManifest;
    const changedQuestions = [manifest.questions[0], manifest.questions.find(({ difficulty }) => difficulty !== manifest.questions[0].difficulty)!];
    const expectedGroups = manifest.groups.filter(({ questionIds }) => (
      changedQuestions.some(({ questionId }) => questionIds.includes(questionId))
    ));
    const result = runCli(changedQuestions.flatMap(({ questionId }) => ['--question-id', questionId]));

    expect(result.error).toBeUndefined();
    expect(result.status).toBe(0);
    expect(result.stderr).toBe('');
    expect(result.stdout.trimStart()).toMatch(/^# 闯关题目影响分析/u);
    expect(result.stdout).toContain('# 闯关题目影响分析');
    for (const question of changedQuestions) expect(result.stdout).toContain(question.questionId);
    for (const group of expectedGroups) {
      expect(result.stdout).toContain(group.definition.id);
      const matchingDifficulties = new Set(changedQuestions
        .filter(({ questionId }) => group.questionIds.includes(questionId))
        .map(({ difficulty }) => difficulty));
      for (const task of group.definition.tasks.filter(({ difficulty }) => matchingDifficulties.has(difficulty))) {
        expect(result.stdout).toContain(task.id);
      }
    }
    expect(await readFile(resolve(repoRoot, 'src/challenges/content/pilot-manifest.json'), 'utf8')).toBe(manifestBefore);
    expect(await Promise.all(manifestFragmentPaths.map((path) => readFile(path, 'utf8')))).toEqual(manifestFragmentsBefore);
  });

  it('returns a distinct status and requires the full quality gate when an ID is unknown', () => {
    const result = runCli(['--question-id', 'question-removed-from-current-manifest']);

    expect(result.error).toBeUndefined();
    expect(result.status).toBe(1);
    expect(result.stdout).toContain('范围未知');
    expect(result.stdout).toContain('npm run challenge:quality');
  });

  it('loads the manifest with the middleware loader without opening a TCP listener', () => {
    const manifest = rawManifest as unknown as ChallengeManifest;
    const questionId = manifest.questions[0].questionId;
    const script = `
      import { Server } from 'node:net';
      const originalListen = Server.prototype.listen;
      let listenCalls = 0;
      Server.prototype.listen = function (...args) {
        listenCalls += 1;
        return originalListen.apply(this, args);
      };
      try {
        const { runImpactCommand } = await import(${JSON.stringify(pathToFileURL(cliPath).href)});
        const code = await runImpactCommand(['--question-id', ${JSON.stringify(questionId)}], {
          stdout: () => {},
          stderr: (value) => process.stderr.write(value),
        });
        process.exitCode = code === 0 && listenCalls === 0 ? 0 : 99;
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
});
