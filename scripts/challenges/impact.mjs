import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';

function usage() {
  return '用法：npm run challenge:impact -- --question-id <题目ID> [--question-id <题目ID> ...]';
}

function parseArguments(args) {
  const options = { questionIds: [], help: false };
  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index];
    if (argument === '--help' || argument === '-h') {
      options.help = true;
      continue;
    }
    if (argument !== '--question-id') throw new Error(`未知参数：${argument}`);
    const value = args[index + 1];
    if (!value || value.startsWith('--')) throw new Error('参数 --question-id 缺少非空题目 ID。');
    options.questionIds.push(value);
    index += 1;
  }
  if (!options.help && options.questionIds.length === 0) {
    throw new Error('至少提供一个 --question-id。');
  }
  return options;
}

function markdownCell(value) {
  return String(value).replace(/\s+/gu, ' ').replaceAll('|', '\\|').trim();
}

const difficultyLabels = { basic: '基础', advanced: '进阶', high: '高阶' };
const releaseIntentLabels = { released: '已发布', planned: '计划中', suspended: '已暂停' };

function renderImpactMarkdown(report) {
  const rows = report.impacts.map((impact) => {
    const scope = impact.status === 'unmapped'
      ? `范围未知：${impact.reason}`
      : impact.groups.map(({ groupId, releaseIntent, taskIds }) => (
        `${groupId}（${releaseIntentLabels[releaseIntent]}）：${taskIds.join('、')}`
      )).join('<br>');
    return `| ${markdownCell(impact.questionId)} | ${difficultyLabels[impact.difficulty] ?? '未知'} | ${markdownCell(scope)} |`;
  });
  const guidance = report.requiresFullQualityGate
    ? '至少一个题目无法从当前清单映射。请运行 `npm run challenge:quality` 执行完整题库质量门禁，并按开发指南扩大检查范围。'
    : '以上是按清单候选池推导的可能受影响任务范围，不代表题目内容正确或质量门禁通过。仍需运行 `npm run challenge:quality` 并完成适用的回归与教学检查。';

  return [
    '# 闯关题目影响分析',
    '',
    `- 清单版本：${markdownCell(report.manifestVersion)}`,
    `- 题目数量：${report.impacts.length}`,
    `- 影响范围状态：${report.requiresFullQualityGate ? '存在未知范围，需完整检查' : '已映射'}`,
    '',
    '| 题目 ID | 难度 | 可能受影响的挑战组 / 任务 |',
    '|---|---|---|',
    ...rows,
    '',
    '## 检查提示',
    '',
    guidance,
    '',
  ].join('\n');
}

export async function runImpactCommand(args = [], dependencies = {}) {
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

  let viteServer;
  try {
    let modules = dependencies.loadImpactModules ? await dependencies.loadImpactModules() : undefined;
    if (!modules) {
      const repositoryRoot = fileURLToPath(new URL('../..', import.meta.url));
      viteServer = await createServer({
        root: repositoryRoot,
        logLevel: 'silent',
        server: { middlewareMode: true, hmr: false, ws: false },
        appType: 'custom',
      });
      const [inputsModule, analysisModule] = await Promise.all([
        viteServer.ssrLoadModule('/src/challenges/content/qualityInputs.ts'),
        viteServer.ssrLoadModule('/src/challenges/content/impactAnalysis.ts'),
      ]);
      modules = { ...inputsModule, ...analysisModule };
    }
    const inputs = await modules.loadChallengeQualityInputs();
    const report = modules.analyzeQuestionImpacts(inputs.manifest, options.questionIds);
    stdout(renderImpactMarkdown(report));
    return report.requiresFullQualityGate ? 1 : 0;
  } catch (error) {
    stderr(`闯关题目影响分析失败：${error instanceof Error ? error.message : String(error)}\n`);
    return 2;
  } finally {
    if (viteServer) {
      try {
        await viteServer.close();
      } catch (error) {
        stderr(`关闭 Vite 加载器失败：${error instanceof Error ? error.message : String(error)}\n`);
      }
    }
  }
}

const invokedPath = process.argv[1] ? resolve(process.argv[1]) : '';
if (import.meta.url.startsWith('file:') && invokedPath === fileURLToPath(import.meta.url)) {
  process.exitCode = await runImpactCommand(process.argv.slice(2));
}
