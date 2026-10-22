import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';

const defaultReportDirectory = '.quality-reports';

function usage() {
  return '用法：npm run challenge:quality [-- --report-dir <目录>] [--seed-count <数量>]';
}

function isCiEnvironment(value) {
  return Boolean(value) && !['0', 'false', 'no'].includes(value.toLowerCase());
}

function parseArguments(args, ciValue) {
  const options = { reportDirectory: defaultReportDirectory, seedCount: 100, help: false };
  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index];
    if (argument === '--help' || argument === '-h') {
      options.help = true;
      continue;
    }
    if (argument !== '--report-dir' && argument !== '--seed-count') {
      throw new Error(`未知参数：${argument}`);
    }
    const value = args[index + 1];
    if (!value || value.startsWith('--')) throw new Error(`参数 ${argument} 缺少取值。`);
    index += 1;
    if (argument === '--report-dir') options.reportDirectory = value;
    else {
      if (!/^\d+$/u.test(value)) throw new Error('--seed-count 必须是正整数。');
      options.seedCount = Number(value);
      if (!Number.isSafeInteger(options.seedCount) || options.seedCount <= 0) throw new Error('--seed-count 必须是正整数。');
    }
  }
  if (isCiEnvironment(ciValue) && options.seedCount < 100) {
    throw new Error('CI 环境至少执行 100 次组卷模拟，--seed-count 不能低于 100。');
  }
  return options;
}

export async function runQualityCommand(args = [], dependencies = {}) {
  const cwd = dependencies.cwd ?? process.cwd();
  const env = dependencies.env ?? process.env;
  const stdout = dependencies.stdout ?? ((value) => process.stdout.write(value));
  const stderr = dependencies.stderr ?? ((value) => process.stderr.write(value));
  let options;
  try {
    options = parseArguments(args, env.CI);
  } catch (error) {
    stderr(`${error instanceof Error ? error.message : String(error)}\n${usage()}\n`);
    return 2;
  }
  if (options.help) {
    stdout(`${usage()}\n`);
    return 0;
  }

  let viteServer;
  let exitCode = 2;
  try {
    let modules = dependencies.loadQualityModules ? await dependencies.loadQualityModules() : undefined;
    if (!modules) {
      const repositoryRoot = fileURLToPath(new URL('../..', import.meta.url));
      viteServer = await createServer({
        root: repositoryRoot,
        server: { middlewareMode: true },
        appType: 'custom',
      });
      const [inputsModule, reportModule] = await Promise.all([
        viteServer.ssrLoadModule('/src/challenges/content/qualityInputs.ts'),
        viteServer.ssrLoadModule('/src/challenges/content/qualityReport.ts'),
      ]);
      modules = { ...inputsModule, ...reportModule };
    }
    const { loadChallengeQualityInputs, buildChallengeQualityReport, renderChallengeQualityMarkdown } = modules;
    const inputs = await loadChallengeQualityInputs();
    const report = await buildChallengeQualityReport(inputs, { seedCount: options.seedCount });
    const reportDirectory = resolve(cwd, options.reportDirectory);
    await mkdir(reportDirectory, { recursive: true });
    await writeFile(resolve(reportDirectory, 'challenge-quality-report.json'), `${JSON.stringify(report, null, 2)}\n`, 'utf8');
    await writeFile(resolve(reportDirectory, 'challenge-quality-report.md'), renderChallengeQualityMarkdown(report), 'utf8');
    stdout(`闯关题库质量门禁${report.overall.passed ? '通过' : '未通过'}：${report.overall.blockingIssueCount} 个阻断，${report.overall.warningCount} 条提示。报告目录：${reportDirectory}\n`);
    exitCode = report.overall.passed ? 0 : 1;
  } catch (error) {
    stderr(`闯关题库质量命令失败：${error instanceof Error ? error.message : String(error)}\n`);
    exitCode = 2;
  } finally {
    if (viteServer) {
      try {
        await viteServer.close();
      } catch (error) {
        stderr(`关闭 Vite 加载器失败：${error instanceof Error ? error.message : String(error)}\n`);
        exitCode = 2;
      }
    }
  }
  return exitCode;
}

const invokedPath = process.argv[1] ? resolve(process.argv[1]) : '';
if (import.meta.url.startsWith('file:') && invokedPath === fileURLToPath(import.meta.url)) {
  process.exitCode = await runQualityCommand(process.argv.slice(2));
}
