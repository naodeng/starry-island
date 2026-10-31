import { buildMathUnit } from '../buildMathUnit';
import { arrange, choose, chooseNumber, makeTask, pair, q8, sortInto } from '../questionAuthoring';

interface ClassificationSet {
  theme: string;
  criterion: string;
  categories: readonly [string, string];
  examples: readonly [string, string, string, string, string, string];
  counts: readonly [number, number];
  total: number;
  comparison: string;
}

function makeClassificationQuestions(set: ClassificationSet, difficulty: '基础' | '进阶' | '高阶') {
  const [firstCount, secondCount] = set.counts;
  const comparison = firstCount === secondCount ? '两类数量一样多' : `${firstCount > secondCount ? set.categories[0] : set.categories[1]}更多`;
  const comparisonOptions = firstCount === secondCount
    ? [comparison, `${set.categories[0]}更多`, `${set.categories[1]}更多`]
    : [comparison, `${firstCount > secondCount ? set.categories[1] : set.categories[0]}更多`, '两类数量一样多'];
  return q8([
    choose(
      `整理${set.theme}时，${difficulty}任务要按“${set.criterion}”分类，哪种做法合适？`,
      [`每件物品只按${set.criterion}放入一类`, '看到喜欢的就随手放', '把同一件物品重复算进两类'],
      0,
      '先说清分类标准，再按同一标准逐件整理。',
      `按${set.criterion}分类时，每件物品按对应特征放入一类，记录才清楚。`,
    ),
    sortInto(
      `把${set.theme}按${set.criterion}分到“${set.categories[0]}”或“${set.categories[1]}”。`,
      [...set.categories],
      set.examples.map((label, index) => ({ label, categoryIndex: index < set.counts[0] ? 0 : 1 })),
      `逐件观察${set.criterion}，不要漏掉或重复。`,
      `按照${set.criterion}检查后，前${set.counts[0]}项属于${set.categories[0]}，其余属于${set.categories[1]}。`,
    ),
    chooseNumber(
      `整理记录中，“${set.categories[0]}”有${firstCount}件，“${set.categories[1]}”有${secondCount}件，一共多少件？`,
      set.total,
      [set.total + 1, Math.max(1, set.total - 1)],
      '把两个类别的数量合起来。',
      `${firstCount}加${secondCount}等于${set.total}，分类前后总数相同。`,
    ),
    pair(
      `把${set.theme}的类别和一个对应例子配起来。`,
      [[set.categories[0], set.examples[0]], [set.categories[1], set.examples[set.counts[0]]!], ['分类前先看', set.criterion]],
      '先确认每个例子符合哪个类别特征。',
      `类别由${set.criterion}决定；分类前先观察特征，再把例子放到对应类别。`,
    ),
    choose(
      `根据记录：${set.categories[0]} ${firstCount}件，${set.categories[1]} ${secondCount}件。哪种判断正确？`,
      comparisonOptions as [string, string, string],
      0,
      '比较两个类别的数量。',
      firstCount === secondCount ? `${firstCount}和${secondCount}相同，两类数量一样多。` : `${firstCount}和${secondCount}相比，${comparison}。`,
    ),
    sortInto(
      `检查${set.theme}的分类记录。`,
      ['记录清楚', '需要重新整理'],
      [
        { label: `先确定${set.criterion}，再逐件分类`, categoryIndex: 0 },
        { label: '每件物品只记录一次', categoryIndex: 0 },
        { label: '中途换了标准却没注明', categoryIndex: 1 },
        { label: '有物品没有放入任何类别', categoryIndex: 1 },
      ],
      '检查标准是否一致、每件物品是否都被记录。',
      '统一标准、完整记录且不重复，结果才可靠。',
    ),
    arrange(
      `整理${set.theme}并比较两类数量。`,
      ['数一数每类有几件', '先确定分类标准', '比较并记录结果', '逐件放入对应类别'],
      [1, 3, 0, 2],
      '先定标准，再动手分类。',
      '确定标准、逐件分类、统计数量，最后比较并记录。',
    ),
    chooseNumber(
      `改按“${set.comparison}”整理后，${set.theme}仍然一共多少件？`,
      set.total,
      [set.total + 2, Math.max(1, set.total - 2)],
      '换的是分类标准，物品没有增加或减少。',
      `分类标准改变会改变各类数量，但总件数仍是${set.total}。`,
    ),
  ]);
}

const sets: ClassificationSet[] = [
  { theme: '彩球', criterion: '颜色', categories: ['红色', '蓝色'], examples: ['红色圆球', '红色方球', '红色三角球', '红色长方球', '蓝色圆球', '蓝色方球'], counts: [4, 2], total: 6, comparison: '形状' },
  { theme: '文具', criterion: '用途', categories: ['书写工具', '测量工具'], examples: ['铅笔', '水彩笔', '蜡笔', '彩色记号笔', '直尺', '三角尺'], counts: [4, 2], total: 6, comparison: '颜色' },
  { theme: '校园植物', criterion: '叶片颜色', categories: ['绿色', '黄色'], examples: ['绿叶小树', '绿色草叶', '绿叶灌木', '绿色藤叶', '黄叶小树', '黄色落叶'], counts: [4, 2], total: 6, comparison: '叶片形状' },
  { theme: '运动用品', criterion: '使用场景', categories: ['室内使用', '户外使用'], examples: ['桌上棋盘', '室内软球', '足球', '飞盘', '跳绳', '篮球'], counts: [2, 4], total: 6, comparison: '颜色' },
  { theme: '图书角用品', criterion: '形状', categories: ['圆形', '长方形'], examples: ['圆形计时器', '圆形贴纸', '圆形书签', '长方形故事书', '长方形书签卡', '长方形书架标签'], counts: [3, 3], total: 6, comparison: '用途' },
  { theme: '教室物品', criterion: '是否可以移动', categories: ['可以移动', '固定在教室'], examples: ['椅子', '书本', '文具盒', '活动白板', '黑板', '门框'], counts: [4, 2], total: 6, comparison: '用途' },
];

const taskSpecs = [
  ['彩球分类小队', '按一个清楚的标准分类，记录各类数量。'],
  ['文具整理观察员', '选择合适标准整理文具，检查记录是否完整。'],
  ['校园叶片统计员', '按特征分类并比较不同类别的数量。'],
  ['运动用品整理师', '用一致的分类标准整理物品并核对总数。'],
  ['图书角分类设计师', '根据不同特征整理物品，解释分类结果。'],
  ['教室整理规划师', '设计分类步骤，检查记录是否完整且不重复。'],
] as const;
const companionIds = ['companion-01', 'companion-02', 'companion-03', 'companion-04'] as const;

function makeTasks(indices: readonly number[], companionOffset: number) {
  return indices.map((setIndex, taskIndex) => {
    const [title, objective] = taskSpecs[setIndex]!;
    const difficulty = taskIndex < 2 ? '基础' : taskIndex < 4 ? '进阶' : '高阶';
    return makeTask(
      title,
      objective,
      companionIds[(taskIndex + companionOffset) % companionIds.length]!,
      makeClassificationQuestions(sets[setIndex]!, difficulty),
    );
  });
}

export const unit = buildMathUnit({
  formalUnitNumber: 1,
  title: '第一单元 · 分类与整理',
  sourceTopics: ['按物品特征选择分类标准', '分类、计数并用简单表格整理结果', '比较分类数量并理解分类标准变化时总数不变'],
  basicTasks: makeTasks([0, 1], 0) as [ReturnType<typeof makeTask>, ReturnType<typeof makeTask>],
  advancedTasks: makeTasks([2, 3], 2) as [ReturnType<typeof makeTask>, ReturnType<typeof makeTask>],
  highTasks: makeTasks([4, 5], 0) as [ReturnType<typeof makeTask>, ReturnType<typeof makeTask>],
});
