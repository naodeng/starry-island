import { buildMathUnit } from '../buildMathUnit';
import { arrange, choose, makeTask, pair, q8, sortInto } from '../questionAuthoring';

interface CampusMap {
  center: string;
  north: string;
  south: string;
  east: string;
  west: string;
}

function guideQuestions(map: CampusMap) {
  return q8([
    choose(
      `以${map.center}为中心，${map.north}在它的哪个方向？`,
      ['北面', '南面', '西面'], 0,
      '地图上方表示北。',
      `${map.north}在${map.center}北面。`,
    ),
    pair(
      `根据${map.center}周围的位置，把地点和方向配起来。`,
      [[`${map.center}北面`, map.north], [`${map.center}南面`, map.south], [`${map.center}东面`, map.east]],
      '先确定中心地点，再看周围的方位。',
      `${map.north}在北面，${map.south}在南面，${map.east}在东面。`,
    ),
    choose(
      `从${map.center}到${map.west}，应该朝哪个方向走？`,
      ['西', '东', '南'], 0,
      '先找出${map.west}相对中心的位置。'.replace('${map.west}', map.west),
      `${map.west}在${map.center}西面，应向西走。`,
    ),
    sortInto(
      `检查这张以${map.center}为中心的方位记录。`,
      ['方位正确', '方位需要改正'],
      [
        { label: `${map.north}在${map.center}北面`, categoryIndex: 0 },
        { label: `${map.south}在${map.center}南面`, categoryIndex: 0 },
        { label: `${map.east}在${map.center}西面`, categoryIndex: 1 },
        { label: `${map.west}在${map.center}东面`, categoryIndex: 1 },
      ],
      '逐条对照地图中的东、南、西、北。',
      `${map.east}在东面，${map.west}在西面；另外两处记录也与地图方向一致。`,
    ),
    choose(
      `站在${map.center}附近面向北，右手指向哪个方向？`,
      ['东', '西', '南'], 0,
      '面向北时，左右两侧分别是东和西。',
      '面向北时，右手边是东。',
    ),
    pair(
      `把${map.center}地图上的方向和对应位置配起来。`,
      [['地图上方', '北'], ['地图下方', '南'], ['地图右侧', '东']],
      '常见平面地图通常把北放在上方。',
      '地图上方是北、下方是南、右侧是东。',
    ),
    choose(
      `参观完${map.north}后，要回到${map.center}，沿什么方向走？`,
      ['向南', '向北', '向东'], 0,
      '从北侧地点回到中心，方向与去时相反。',
      `${map.north}在${map.center}北面，返回中心应向南。`,
    ),
    arrange(
      `绘制${map.center}周边的简易方位图。`,
      ['在北侧放${map.north}'.replace('${map.north}', map.north), '先把${map.center}放在中心'.replace('${map.center}', map.center), '在东侧放${map.east}'.replace('${map.east}', map.east), '确认地图上方是北'.replace('${map.center}', map.center)],
      [3, 1, 0, 2],
      '先约定方向，再确定中心位置和周边地点。',
      '先确认上方为北，标出中心，再按方位填写地点并检查。',
    ),
  ]);
}

const maps: CampusMap[] = [
  { center: '教学楼', north: '旗台', south: '校门', east: '图书角', west: '操场' },
  { center: '图书馆', north: '阅读长廊', south: '校门口', east: '花园', west: '美术室' },
  { center: '操场', north: '旗台', south: '篮球场', east: '教学楼', west: '跑道入口' },
  { center: '科学教室', north: '天文角', south: '实验桌区', east: '植物角', west: '走廊' },
  { center: '校园花园', north: '小池塘', south: '校门', east: '树荫休息处', west: '教学楼' },
  { center: '食堂', north: '饮水处', south: '操场入口', east: '洗手池', west: '教学楼' },
];
const taskSpecs = [
  ['校园方位观察员', '认清中心地点周围的方向和位置。'],
  ['图书馆路线小向导', '根据地点的相对方位选择行走方向。'],
  ['操场地图解读员', '将地图方向与校园位置对应起来。'],
  ['科学教室寻路员', '按方位说明找到校园中的地点。'],
  ['花园地图绘制员', '先确定地图方向，再标注周边地点。'],
  ['食堂路线核对员', '检查方位记录并说明如何返回中心。'],
] as const;
const companions = ['companion-01', 'companion-02', 'companion-03', 'companion-04'] as const;

function makeTasks(indices: readonly number[], offset: number) {
  return indices.map((index, taskIndex) => {
    const [title, objective] = taskSpecs[index]!;
    return makeTask(title, objective, companions[(taskIndex + offset) % companions.length]!, guideQuestions(maps[index]!));
  });
}

export const unit = buildMathUnit({
  formalUnitNumber: null,
  entryId: 'integrated-practice-01',
  type: 'integrated-practice',
  title: '综合实践 · 校园小导游',
  sourceTopics: ['辨认校园平面图上的东、南、西、北', '描述校园地点的相对方位', '根据方位规划和检查简单路线'],
  basicTasks: makeTasks([0, 1], 0) as [ReturnType<typeof makeTask>, ReturnType<typeof makeTask>],
  advancedTasks: makeTasks([2, 3], 2) as [ReturnType<typeof makeTask>, ReturnType<typeof makeTask>],
  highTasks: makeTasks([4, 5], 0) as [ReturnType<typeof makeTask>, ReturnType<typeof makeTask>],
});
