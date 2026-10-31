import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { analyzeCurriculumSourceInventory, renderCurriculumSourceInventoryMarkdown } from './sourceInventory.ts';
import { runSourceInventoryCommand } from '../../../scripts/challenges/source-inventory.mjs';

async function createTempDirectory() {
  return mkdtemp(join(tmpdir(), 'starry-island-source-audit-'));
}

function dependencies(output, errors, loadUnits = async () => []) {
  return {
    stdout: (value) => output.push(value),
    stderr: (value) => errors.push(value),
    loadUnits,
    loadInventoryModule: async () => ({ analyzeCurriculumSourceInventory, renderCurriculumSourceInventoryMarkdown }),
  };
}

describe('runSourceInventoryCommand', () => {
  const tempDirectories = [];
  afterEach(async () => {
    await Promise.all(tempDirectories.splice(0).map((directory) => rm(directory, { recursive: true, force: true })));
  });

  it('writes a Chinese, non-blocking inventory report without question content', async () => {
    const cwd = await createTempDirectory();
    tempDirectories.push(cwd);
    const output = [];
    const errors = [];

    const exitCode = await runSourceInventoryCommand(['--report-dir', 'reports'], dependencies(output, errors), cwd);

    expect(exitCode).toBe(0);
    expect(errors).toEqual([]);
    expect(output.join('')).toContain('0/254 个正式单元');
    const report = JSON.parse(await readFile(resolve(cwd, 'reports/curriculum-source-inventory-report.json'), 'utf8'));
    const markdown = await readFile(resolve(cwd, 'reports/curriculum-source-inventory-report.md'), 'utf8');
    expect(report.catalogBaselineMatches).toBe(false);
    expect(markdown).toContain('不代表题目已审核或可以发布');
  });

  it('replaces stale reports with a failure report when course modules cannot load', async () => {
    const cwd = await createTempDirectory();
    tempDirectories.push(cwd);
    const reportDirectory = resolve(cwd, 'reports');
    await mkdir(reportDirectory, { recursive: true });
    await writeFile(resolve(reportDirectory, 'curriculum-source-inventory-report.json'), JSON.stringify({ catalogBaselineMatches: true }), 'utf8');
    await writeFile(resolve(reportDirectory, 'curriculum-source-inventory-report.md'), '# 旧成功报告', 'utf8');
    const output = [];
    const errors = [];

    const exitCode = await runSourceInventoryCommand(['--report-dir', 'reports'], dependencies(output, errors, async () => {
      throw new Error('课程模块载入失败');
    }), cwd);

    expect(exitCode).toBe(2);
    const report = JSON.parse(await readFile(resolve(reportDirectory, 'curriculum-source-inventory-report.json'), 'utf8'));
    const markdown = await readFile(resolve(reportDirectory, 'curriculum-source-inventory-report.md'), 'utf8');
    expect(report).toMatchObject({ catalogBaselineMatches: false, error: { message: '课程模块载入失败' } });
    expect(markdown).toContain('本次盘点未完成');
    expect(markdown).not.toContain('旧成功报告');
    expect(errors.join('')).toContain('课程模块载入失败');
  });

  it('shows help without loading the application curriculum', async () => {
    const output = [];
    const errors = [];
    const exitCode = await runSourceInventoryCommand(['--help'], {
      ...dependencies(output, errors),
      loadUnits: async () => { throw new Error('不应载入课程'); },
    });

    expect(exitCode).toBe(0);
    expect(output.join('')).toContain('challenge:source-audit');
    expect(errors).toEqual([]);
  });
});
