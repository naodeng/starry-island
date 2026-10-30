import { buildMathUnit } from '../buildMathUnit';
import { arrange, calculate, chooseNumber, makeTask, pair, q8, sortInto } from '../questionAuthoring';

interface FactSet {
  factor: number;
  partner: number;
  context: string;
  item: string;
}

function factQuestions(set: FactSet) {
  const product = set.factor * set.partner;
  return q8([
    calculate(
      `${set.factor}组${set.partner}个${set.context}，一共有多少${set.item}？`,
      `${set.factor} × ${set.partner}`,
      product,
      '用乘法口诀计算组数乘每组数量。',
      `${set.factor}乘${set.partner}等于${product}。`,
    ),
    chooseNumber(
      `${product}${set.item}${set.context}平均分成${set.factor}组，每组多少${set.item}？`,
      set.partner,
      [set.partner + 1, set.partner + 2],
      '用乘法口诀的逆向关系求每组数量。',
      `${product}除以${set.factor}等于${set.partner}。`,
    ),
    chooseNumber(
      `${product}${set.item}${set.context}每${set.partner}${set.item}装一袋，可以装几袋？`,
      set.factor,
      [set.factor + 1, set.factor + 2],
      '用总数除以每袋数量。',
      `${product}除以${set.partner}等于${set.factor}袋。`,
    ),
    chooseNumber(
      `${set.factor} × ${set.partner} = ？`,
      product,
      [product + set.factor, product - set.partner],
      `回想${set.factor}的乘法口诀。`,
      `${set.factor}乘${set.partner}等于${product}。`,
    ),
    pair(
      `把${set.factor}和${set.partner}的乘除法算式配成一组。`,
      [[`${set.factor} × ${set.partner}`, `${product}`], [`${product} ÷ ${set.factor}`, `${set.partner}`], [`${product} ÷ ${set.partner}`, `${set.factor}`]],
      '乘法和除法可以用同一组数互相检查。',
      `${set.factor}、${set.partner}和${product}组成一组乘除法关系。`,
    ),
    sortInto(
      `判断下面的算式是不是${set.factor}和${set.partner}的乘除法关系。`,
      ['是这一组关系', '不是这一组关系'],
      [
        { label: `${set.factor} × ${set.partner} = ${product}`, categoryIndex: 0 },
        { label: `${product} ÷ ${set.factor} = ${set.partner}`, categoryIndex: 0 },
        { label: `${product} ÷ ${set.partner} = ${set.factor}`, categoryIndex: 0 },
        { label: `${product} ÷ ${set.factor} = ${set.partner + 1}`, categoryIndex: 1 },
      ],
      '检查三个数是否满足乘法或除法关系。',
      `只有乘积为${product}且商对应${set.factor}或${set.partner}的算式属于这一组。`,
    ),
    arrange(
      `解决“${set.factor}组，每组${set.partner}个${set.context}”的问题。`,
      ['写出乘法算式', '看清组数和每组数量', '用口诀求出总数', '检查单位和得数'],
      [1, 0, 2, 3],
      '先找出组数和每组数量。',
      '读清数量信息，列乘法算式，用口诀计算后检查单位和答案。',
    ),
    calculate(
      `${product}${set.item}${set.context}平均分给${product}个小组，每组几个？`,
      `${product} ÷ ${product}`,
      1,
      '每组一个，正好分成同样多的组。',
      `${product}除以${product}等于1。`,
    ),
  ]);
}

const sets: FactSet[] = [
  { factor: 7, partner: 4, context: '贴纸', item: '张' },
  { factor: 8, partner: 3, context: '棋子', item: '枚' },
  { factor: 9, partner: 5, context: '彩笔', item: '支' },
  { factor: 7, partner: 8, context: '卡片', item: '张' },
  { factor: 8, partner: 9, context: '积木', item: '块' },
  { factor: 9, partner: 7, context: '种子包', item: '包' },
];
const taskSpecs = [
  ['7的乘除口诀站', '练习7的乘法口诀，并用对应的除法关系求商。'],
  ['8的乘除分组场', '理解8的口诀在分组、求总数和平均分中的应用。'],
  ['9的乘除关系屋', '熟练运用9的乘法口诀和对应除法。'],
  ['大数组合解码', '运用7、8的口诀解决分组问题并检查结果。'],
  ['积木总量复核', '用8、9的乘除法关系核对物品总量和分组。'],
  ['口诀应用规划师', '综合使用7、8、9口诀解决平均分和总量问题。'],
] as const;
const companions = ['companion-01', 'companion-02', 'companion-03', 'companion-04'] as const;

function makeTasks(indices: readonly number[], offset: number) {
  return indices.map((index, taskIndex) => {
    const [title, objective] = taskSpecs[index]!;
    return makeTask(title, objective, companions[(taskIndex + offset) % companions.length]!, factQuestions(sets[index]!));
  });
}

export const unit = buildMathUnit({
  formalUnitNumber: 5,
  title: '第五单元 · 7～9 的表内乘、除法',
  sourceTopics: ['练习7、8、9的乘法口诀', '用7～9的口诀求商', '运用乘除法关系解决分组问题'],
  basicTasks: makeTasks([0, 1], 0) as [ReturnType<typeof makeTask>, ReturnType<typeof makeTask>],
  advancedTasks: makeTasks([2, 3], 2) as [ReturnType<typeof makeTask>, ReturnType<typeof makeTask>],
  highTasks: makeTasks([4, 5], 0) as [ReturnType<typeof makeTask>, ReturnType<typeof makeTask>],
});
