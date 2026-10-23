import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { analyzeCurriculumCoverage, renderCurriculumCoverageMarkdown } from './coverage.ts';
import { runCoverageCommand } from '../../../scripts/challenges/coverage.mjs';

const curriculum = {
  grades: [{ id: 'grade-1', title: '一年级', terms: [{
    id: 'term-1', title: '上学期', subjects: [{ id: 'math', title: '数学', units: [] }],
  }] }],
};
const manifest = { version: 'coverage-test-v1', questions: [], groups: [] };

async function createTempDirectory() {
  return mkdtemp(join(tmpdir(), 'starry-island-coverage-'));
}

function dependencies(output, errors) {
  return {
    stdout: (value) => output.push(value),
    stderr: (value) => errors.push(value),
    loadInputs: async () => ({ curriculum, manifest }),
    loadCoverageModule: async () => ({ analyzeCurriculumCoverage, renderCurriculumCoverageMarkdown }),
  };
}

describe('runCoverageCommand', () => {
  const tempDirectories = [];
  afterEach(async () => {
    await Promise.all(tempDirectories.splice(0).map((directory) => rm(directory, { recursive: true, force: true })));
  });

  it('writes a Chinese inventory report without blocking incremental pilot work', async () => {
    const cwd = await createTempDirectory();
    tempDirectories.push(cwd);
    const output = [];
    const errors = [];

    const exitCode = await runCoverageCommand(['--report-dir', 'reports'], dependencies(output, errors), cwd);

    expect(exitCode).toBe(0);
    expect(errors).toEqual([]);
    expect(output.join('')).toContain('0/3 个学期阶段组');
    const report = JSON.parse(await readFile(resolve(cwd, 'reports/curriculum-coverage-report.json'), 'utf8'));
    const markdown = await readFile(resolve(cwd, 'reports/curriculum-coverage-report.md'), 'utf8');
    expect(report.complete).toBe(false);
    expect(report.expected).toEqual({ unitGroups: 0, unitTasks: 0, semesterGroups: 3, semesterTasks: 15 });
    expect(markdown).toContain('尚未达到 V1.0 全课程覆盖');
  });

  it('returns a failing exit code when strict V1 coverage is incomplete', async () => {
    const cwd = await createTempDirectory();
    tempDirectories.push(cwd);
    const output = [];
    const errors = [];

    const exitCode = await runCoverageCommand(['--report-dir', 'reports', '--require-complete'], dependencies(output, errors), cwd);

    expect(exitCode).toBe(1);
    expect(output.join('')).toContain('门禁未通过');
    expect(errors).toEqual([]);
    expect(JSON.parse(await readFile(resolve(cwd, 'reports/curriculum-coverage-report.json'), 'utf8')).complete).toBe(false);
  });

  it('replaces stale reports with an explicit failure report when inputs cannot load', async () => {
    const cwd = await createTempDirectory();
    tempDirectories.push(cwd);
    const reportDirectory = resolve(cwd, 'reports');
    await mkdir(reportDirectory, { recursive: true });
    await writeFile(resolve(reportDirectory, 'curriculum-coverage-report.json'), JSON.stringify({ complete: true }), 'utf8');
    await writeFile(resolve(reportDirectory, 'curriculum-coverage-report.md'), '# 旧成功报告', 'utf8');
    const output = [];
    const errors = [];

    const exitCode = await runCoverageCommand(['--report-dir', 'reports'], {
      ...dependencies(output, errors),
      loadInputs: async () => { throw new Error('课程清单读取失败'); },
    }, cwd);

    expect(exitCode).toBe(2);
    const report = JSON.parse(await readFile(resolve(reportDirectory, 'curriculum-coverage-report.json'), 'utf8'));
    const markdown = await readFile(resolve(reportDirectory, 'curriculum-coverage-report.md'), 'utf8');
    expect(report).toMatchObject({ complete: false, manifestVersion: 'unknown', error: { message: '课程清单读取失败' } });
    expect(markdown).toContain('本次盘点未完成');
    expect(markdown).not.toContain('旧成功报告');
    expect(errors.join('')).toContain('课程清单读取失败');
  });
});
