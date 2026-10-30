import { buildMathUnit } from '../buildMathUnit';
import { arrange, choose, chooseNumber, makeTask, pair, q8, sortInto } from '../questionAuthoring';

interface BodyMeasureSet {
  person: string;
  object: string;
  unit: string;
  amount: number;
  use: string;
}

function bodyRulerQuestions(set: BodyMeasureSet) {
  return q8([
    choose(
      `${set.person}想用身体上的尺子估计${set.object}，选哪种方法？`,
      [set.use, '随便换用不同人的手和脚', '只写数字不说用了什么'], 0,
      '身体尺来自自己的身体部位或步子。',
      `${set.use}，并记下用了哪种身体尺，别人才能理解记录。`,
    ),
    choose(
      `记录${set.person}测量${set.object}时，哪项信息不能漏？`,
      [`${set.amount}${set.unit}，并注明使用${set.unit}`, '只写${set.amount}'.replace('${set.amount}', String(set.amount)), '只写物品颜色'], 0,
      '记录长度时要说明数量和测量单位。',
      `记录${set.amount}${set.unit}并注明身体尺，数据才完整。`,
    ),
    chooseNumber(
      `${set.person}用同一${set.unit}重复测同一${set.object}，第一次记录${set.amount}个，第二次也记录${set.amount}个。两次记录相差几个？`,
      0,
      [1, 2],
      '两个记录的数相同。',
      `${set.amount}减${set.amount}等于0，两次记录相差0个身体尺。`,
    ),
    pair(
      `以${set.object}为例，把测量情境和身体尺配起来。`,
      [['量一量课本的宽', '拃'], ['估计走廊有多长', '步'], ['张开双臂估一估较长的物体', '庹']],
      '不同身体尺适合描述不同的长度。',
      '拃、步和庹都是身体尺，可以帮助估测不同长度。',
    ),
    sortInto(
      `检查${set.person}的${set.object}测量记录。`,
      ['记录清楚', '还需要补充或统一'],
      [
        { label: `${set.amount}${set.unit}，写明由${set.person}测量`, categoryIndex: 0 },
        { label: '使用相同的身体尺重复测量', categoryIndex: 0 },
        { label: '只写长度数字，没有单位', categoryIndex: 1 },
        { label: '两次比较时换了测量的人和身体尺', categoryIndex: 1 },
      ],
      '检查是否注明测量者、身体尺和数量。',
      '清楚记录测量者和所用身体尺；比较时也应统一方法。',
    ),
    choose(
      `两位同学用自己的${set.unit}量${set.object}，记录不同，怎样比较更公平？`,
      ['让同一位同学用同一身体尺再测', '直接认为记录大的同学更准确', '把两个数字相加'], 0,
      '不同人的身体尺长度可能不同。',
      '身体尺因人而异；同一人用同一方法测量，更适合比较。',
    ),
    choose(
      `${set.person}用身体尺测出的${set.object}长度，怎样表达更合适？`,
      ['说明是估测，并注明使用的身体尺', '说成所有人都一样的精确长度', '不告诉别人用了什么单位'], 0,
      '身体尺的长度会因人而异。',
      '身体尺适合估测和比较，要说明方法，不把结果当作统一的精确长度。',
    ),
    arrange(
      `完成${set.person}的身体尺测量记录。`,
      ['记录数量、身体尺和测量者', '选择合适的身体尺', '重复测量并核对结果', '确定要测量的物品'],
      [3, 1, 2, 0],
      '先选测量对象，再选方法。',
      '确定物品、选择身体尺、重复核对，最后把数量和方法记录清楚。',
    ),
  ]);
}

const sets: BodyMeasureSet[] = [
  { person: '小星', object: '课本的宽度', unit: '拃', amount: 5, use: '用自己的拃从课本一边量到另一边' },
  { person: '小海', object: '教室到图书角的距离', unit: '步', amount: 18, use: '用自己的步子沿安全路线估量' },
  { person: '小雨', object: '桌面的长边', unit: '庹', amount: 2, use: '张开双臂，用自己的庹估一估' },
  { person: '小禾', object: '画纸的宽度', unit: '拃', amount: 6, use: '用自己的拃沿画纸短边测量' },
  { person: '小安', object: '操场边一段安全路线', unit: '步', amount: 32, use: '在老师安排的安全路线用自己的步子估量' },
  { person: '小宁', object: '展示台的长边', unit: '庹', amount: 3, use: '在老师允许的情况下用自己的庹估一估' },
];
const taskSpecs = [
  ['认识身体尺', '认识拃、步和庹可以帮助估测长度。'],
  ['脚步路线记录员', '用同一人的步子估量安全路线并记下方法。'],
  ['张开双臂估一估', '用庹估量较长物体并说明这是身体尺记录。'],
  ['重复测量观察员', '重复测量并检查身体尺记录是否清楚。'],
  ['公平比较小队', '理解不同人的身体尺不同，比较时统一测量者和方法。'],
  ['身体尺记录设计师', '选择合适的身体尺，记录数量、单位和测量者。'],
] as const;
const companions = ['companion-01', 'companion-02', 'companion-03', 'companion-04'] as const;

function makeTasks(indices: readonly number[], offset: number) {
  return indices.map((index, taskIndex) => {
    const [title, objective] = taskSpecs[index]!;
    return makeTask(title, objective, companions[(taskIndex + offset) % companions.length]!, bodyRulerQuestions(sets[index]!));
  });
}

export const unit = buildMathUnit({
  formalUnitNumber: null,
  entryId: 'integrated-practice-02',
  type: 'integrated-practice',
  title: '综合实践 · 身体上的尺子',
  sourceTopics: ['用拃、庹、步等身体尺估测长度', '用身体尺重复测量并比较记录', '说明身体尺因人而异并记录测量方法'],
  basicTasks: makeTasks([0, 1], 0) as [ReturnType<typeof makeTask>, ReturnType<typeof makeTask>],
  advancedTasks: makeTasks([2, 3], 2) as [ReturnType<typeof makeTask>, ReturnType<typeof makeTask>],
  highTasks: makeTasks([4, 5], 0) as [ReturnType<typeof makeTask>, ReturnType<typeof makeTask>],
});
