import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createServer } from 'vite';

const reportFileNames = ['curriculum-coverage-report.json', 'curriculum-coverage-report.md'];

const repositoryRoot = process.cwd();

function usage() {
  return '用法：npm run challenge:coverage -- [--report-dir <目录>] [--require-complete]';
}

function parseArguments(args) {
  const options = { reportDirectory: '.quality-reports/curriculum-coverage', requireComplete: false, help: false };
  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index];
    if (argument === '--help' || argument === '-h') {
      options.help = true;
      continue;
    }
    if (argument === '--require-complete') {
      options.requireComplete = true;
      continue;
    }
    if (argument !== '--report-dir') throw new Error(`未知参数：${argument}`);
    const value = args[index + 1];
    if (!value || value.startsWith('--')) throw new Error('参数 --report-dir 缺少取值。');
    options.reportDirectory = value;
    index += 1;
  }
  return options;
}

async function loadCurrentCoverageModule() {
  const server = await createServer({
    root: repositoryRoot,
    server: { middlewareMode: true, hmr: false, ws: false },
    appType: 'custom',
  });
  try {
    const [coverageModule, manifestModule] = await Promise.all([
      server.ssrLoadModule('/src/challenges/content/coverage.ts'),
      server.ssrLoadModule('/src/challenges/content/pilotManifest.ts'),
    ]);
    return { ...coverageModule, manifest: manifestModule.default };
  } finally {
    await server.close();
  }
}

async function loadCurrentInputs(manifest) {
  const curriculumText = await readFile(resolve(repositoryRoot, 'src/content/curriculum-manifest.json'), 'utf8');
  return { curriculum: JSON.parse(curriculumText), manifest };
}

function createFailureReport(error) {
  const message = (error instanceof Error ? error.message : String(error)).replace(/\s+/gu, ' ').trim();
  return {
    reportSchemaVersion: 1,
    manifestVersion: 'unknown',
    complete: false,
    error: { code: 'curriculum-coverage-audit-failed', message },
  };
}

function renderFailureMarkdown(report) {
  return [
    '# 闯关全课程覆盖报告',
    '',
    '## 本次盘点未完成',
    '',
    `- 错误码：${report.error.code}`,
    `- 说明：${report.error.message}`,
    '',
  ].join('\n');
}

async function writeReport(directory, report, markdown) {
  await Promise.all([
    writeFile(resolve(directory, reportFileNames[0]), `${JSON.stringify(report, null, 2)}\n`, 'utf8'),
    writeFile(resolve(directory, reportFileNames[1]), markdown, 'utf8'),
  ]);
}

export async function runCoverageCommand(args = [], dependencies = {}, cwd = process.cwd()) {
  const stdout = dependencies.stdout ?? ((value) => process.stdout.write(value));
  const stderr = dependencies.stderr ?? ((value) => process.stderr.write(value));
  let options;
  try {
    options = parseArguments(args);
  } catch (error) {
    stderr(`${error instanceof Error ? error.message : String(error)}\n${usage()}\n`);
    return 2;
  }
  if (options.help) {
    stdout(`${usage()}\n`);
    return 0;
  }

  const reportDirectory = resolve(cwd, options.reportDirectory);
  try {
    await mkdir(reportDirectory, { recursive: true });
    await Promise.all(reportFileNames.map((name) => rm(resolve(reportDirectory, name), { force: true })));
    const coverageModule = await (dependencies.loadCoverageModule ?? loadCurrentCoverageModule)();
    const inputs = dependencies.loadInputs
      ? await dependencies.loadInputs()
      : await loadCurrentInputs(coverageModule.manifest);
    const report = coverageModule.analyzeCurriculumCoverage(inputs.curriculum, inputs.manifest);
    await writeReport(reportDirectory, report, coverageModule.renderCurriculumCoverageMarkdown(report));
    const auditStatus = report.complete ? 'V1.0 覆盖门禁通过' : options.requireComplete ? 'V1.0 覆盖门禁未通过' : '覆盖盘点完成';
    stdout(`${auditStatus}：${report.registered.releasedUnitGroups}/${report.expected.unitGroups} 个正式单元组、${report.registered.releasedSemesterGroups}/${report.expected.semesterGroups} 个学期阶段组已发布；登记单元任务 ${report.registered.unitTasks}/${report.expected.unitTasks}、学期任务 ${report.registered.semesterTasks}/${report.expected.semesterTasks}。报告目录：${reportDirectory}\n`);
    return options.requireComplete && !report.complete ? 1 : 0;
  } catch (error) {
    const report = createFailureReport(error);
    stderr(`闯关全课程覆盖盘点失败：${report.error.message}\n`);
    try {
      await mkdir(reportDirectory, { recursive: true });
      await writeReport(reportDirectory, report, renderFailureMarkdown(report));
    } catch (reportError) {
      stderr(`无法写入覆盖盘点错误报告：${reportError instanceof Error ? reportError.message : String(reportError)}\n`);
    }
    return 2;
  }
}

const invokedPath = process.argv[1] ? resolve(process.argv[1]) : '';
if (invokedPath === resolve(process.cwd(), 'scripts/challenges/coverage.mjs')) {
  process.exitCode = await runCoverageCommand(process.argv.slice(2));
}
