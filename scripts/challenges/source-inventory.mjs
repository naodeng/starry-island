import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createServer } from 'vite';

const reportFileNames = ['curriculum-source-inventory-report.json', 'curriculum-source-inventory-report.md'];
const repositoryRoot = process.cwd();

function usage() {
  return '用法：npm run challenge:source-audit -- [--report-dir <目录>]';
}

function parseArguments(args) {
  const options = { reportDirectory: '.quality-reports/curriculum-source-inventory', help: false };
  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index];
    if (argument === '--help' || argument === '-h') {
      options.help = true;
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

async function loadCurrentData() {
  const server = await createServer({
    root: repositoryRoot,
    server: { middlewareMode: true, hmr: false, ws: false },
    appType: 'custom',
  });
  try {
    const [inventoryModule, { curriculum }] = await Promise.all([
      server.ssrLoadModule('/src/challenges/content/sourceInventory.ts'),
      server.ssrLoadModule('/src/content/curriculum.ts'),
    ]);
    return { inventoryModule, units: Object.values(curriculum.units) };
  } finally {
    await server.close();
  }
}

function createFailureReport(error) {
  const message = (error instanceof Error ? error.message : String(error)).replace(/\s+/gu, ' ').trim();
  return {
    reportSchemaVersion: 1,
    catalogBaselineMatches: false,
    error: { code: 'curriculum-source-inventory-failed', message },
  };
}

function renderFailureMarkdown(report) {
  return [
    '# 全课程闯关源素材盘点',
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

export async function runSourceInventoryCommand(args = [], dependencies = {}, cwd = process.cwd()) {
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
    const currentData = dependencies.loadInventoryModule && dependencies.loadUnits
      ? undefined
      : await (dependencies.loadCurrentData ?? loadCurrentData)();
    const inventoryModule = dependencies.loadInventoryModule
      ? await dependencies.loadInventoryModule()
      : currentData.inventoryModule;
    const units = dependencies.loadUnits
      ? await dependencies.loadUnits()
      : currentData.units;
    const report = inventoryModule.analyzeCurriculumSourceInventory(units);
    await writeReport(reportDirectory, report, inventoryModule.renderCurriculumSourceInventoryMarkdown(report));
    const summary = report.summary.byDifficulty;
    stdout(`源素材盘点完成：${report.formalUnitCount}/${report.expectedFormalUnitCount} 个正式单元；达到每难度最低素材量的单元：基础 ${summary.basic.unitsMeetingMinimum}、进阶 ${summary.advanced.unitsMeetingMinimum}、高阶 ${summary.high.unitsMeetingMinimum}；报告目录：${reportDirectory}\n`);
    return 0;
  } catch (error) {
    const report = createFailureReport(error);
    stderr(`全课程源素材盘点失败：${report.error.message}\n`);
    try {
      await mkdir(reportDirectory, { recursive: true });
      await writeReport(reportDirectory, report, renderFailureMarkdown(report));
    } catch (reportError) {
      stderr(`无法写入源素材盘点错误报告：${reportError instanceof Error ? reportError.message : String(reportError)}\n`);
    }
    return 2;
  }
}

const invokedPath = process.argv[1] ? resolve(process.argv[1]) : '';
if (invokedPath === resolve(process.cwd(), 'scripts/challenges/source-inventory.mjs')) {
  process.exitCode = await runSourceInventoryCommand(process.argv.slice(2));
}
