import { buildMathUnit } from '../buildMathUnit';
import { arrange, choose, chooseNumber, makeTask, pair, q8, sortInto } from '../questionAuthoring';

interface DivisionSet {
  dividend: number;
  divisor: number;
  context: string;
  unit: string;
}

function divisionQuestions(set: DivisionSet) {
  const quotient = set.dividend / set.divisor;
  return q8([
    chooseNumber(
      `${set.dividend}${set.unit}${set.context}平均分成${set.divisor}份，每份是多少？`,
      quotient,
      [quotient + 1, quotient + 2],
      '把总数平均分到指定的份数，再数每份有多少。',
      `${set.dividend}除以${set.divisor}等于${quotient}，每份有${quotient}${set.unit}。`,
    ),
    chooseNumber(
      `${set.dividend}${set.unit}${set.context}每${quotient}${set.unit}放一组，可以放几组？`,
      set.divisor,
      [set.divisor + 1, set.divisor + 2],
      '每组数量已经知道，数一数能分成多少个这样的组。',
      `${set.dividend}除以每组${quotient}等于${set.divisor}组。`,
    ),
    choose(
      `把${set.dividend}${set.unit}${set.context}“平均分成${set.divisor}份”，要检查什么？`,
      ['每份数量相同', '只要第一份最多', '可以有物品没有分到'],
      0,
      '平均分要让每份一样多，并把总数分完。',
      '每份一样多且没有遗漏，才是平均分。',
    ),
    pair(
      `把${set.context}的乘法和除法算式与结果配起来。`,
      [[`${set.divisor} × ${quotient}`, `${set.dividend}`], [`${set.dividend} ÷ ${set.divisor}`, `${quotient}`], [`${set.dividend} ÷ ${quotient}`, `${set.divisor}`]],
      '乘法可以帮助检查除法结果。',
      `${set.divisor}乘${quotient}等于${set.dividend}，所以${set.dividend}除以${set.divisor}等于${quotient}，除以${quotient}等于${set.divisor}。`,
    ),
    sortInto(
      `检查${set.context}的分法，哪些是平均分？`,
      ['平均分完', '不是平均分'],
      [
        { label: '每份一样多，且全部分完', categoryIndex: 0 },
        { label: '有一份比其他份多', categoryIndex: 1 },
        { label: '有物品没有分到任何一份', categoryIndex: 1 },
        { label: '每份数量相同，没有剩下', categoryIndex: 0 },
      ],
      '同时检查每份是否一样多、总数是否分完。',
      '平均分要求每份同样多，并且总数都分配完。',
    ),
    arrange(
      `整理${set.context}平均分成${set.divisor}份的步骤。`,
      ['检查每份是不是一样多', '确定要分成几份', '逐份分配并分完总数', '记录每份数量'],
      [1, 2, 0, 3],
      '先明确份数，再分配和检查。',
      '先确定份数，平均分配后检查每份，最后记录每份数量。',
    ),
    chooseNumber(
      `${set.divisor}份${set.context}，每份${quotient}${set.unit}，一共有多少${set.unit}？`,
      set.dividend,
      [set.dividend + 1, set.dividend + 2],
      '用“份数 × 每份数量”求总数。',
      `${set.divisor}乘${quotient}等于${set.dividend}。`,
    ),
    chooseNumber(
      `${set.dividend} ÷ ${set.dividend} = ？`,
      1,
      [0, 2],
      '一个数里有几个这样的数？',
      `${set.dividend}里面有1个${set.dividend}，所以商是1。`,
    ),
  ]);
}

const sets: DivisionSet[] = [
  { dividend: 6, divisor: 1, context: '星星贴纸', unit: '张' },
  { dividend: 8, divisor: 2, context: '图书卡片', unit: '张' },
  { dividend: 15, divisor: 3, context: '小积木', unit: '块' },
  { dividend: 20, divisor: 5, context: '彩笔', unit: '支' },
  { dividend: 20, divisor: 5, context: '树叶书签', unit: '枚' },
  { dividend: 30, divisor: 6, context: '游戏棋子', unit: '枚' },
];

const taskSpecs = [
  ['平均分贴纸', '理解平均分成几份，求每份有多少。'],
  ['分组整理卡片', '理解每几个一组，求可以分成几组。'],
  ['积木公平分', '用乘法口诀检查除法结果是否正确。'],
  ['彩笔分装站', '在生活情境中选择合适的除法关系。'],
  ['书签分组挑战', '比较两种平均分问题并说清已知条件。'],
  ['棋子平均分复核', '综合检查总数、份数和每份数量的关系。'],
] as const;
const companionIds = ['companion-01', 'companion-02', 'companion-03', 'companion-04'] as const;

function makeTasks(indices: readonly number[], offset: number) {
  return indices.map((setIndex, taskIndex) => {
    const [title, objective] = taskSpecs[setIndex]!;
    return makeTask(title, objective, companionIds[(taskIndex + offset) % companionIds.length]!, divisionQuestions(sets[setIndex]!));
  });
}

export const unit = buildMathUnit({
  formalUnitNumber: 3,
  title: '第三单元 · 1～6 的表内除法',
  sourceTopics: ['理解平均分和包含除法', '用1～6的乘法口诀求商', '联系乘除法关系检查结果'],
  basicTasks: makeTasks([0, 1], 0) as [ReturnType<typeof makeTask>, ReturnType<typeof makeTask>],
  advancedTasks: makeTasks([2, 3], 2) as [ReturnType<typeof makeTask>, ReturnType<typeof makeTask>],
  highTasks: makeTasks([4, 5], 0) as [ReturnType<typeof makeTask>, ReturnType<typeof makeTask>],
});
