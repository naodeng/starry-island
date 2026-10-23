import type { ChoiceActivityDefinition, Difficulty } from '../../content/types';

export interface Grade1MathUnit01SupplementalActivity {
  difficulty: Difficulty;
  sourceUnitId: string;
  knowledgePointIds: string[];
  activity: ChoiceActivityDefinition;
}

interface ActivityDraft {
  knowledgePointIds: string[];
  prompt: string;
  options: [string, string, string];
  correctOptionIndex: 0 | 1 | 2;
  hint: string;
  explanation: string;
}

const sourceUnitId = 'grade-1/term-1/math/unit-01';
const idPrefix = 'challenge-supplement-grade-1-term-1-math-unit-01';

const drafts: Record<Difficulty, ActivityDraft[]> = {
  basic: [
    { knowledgePointIds: ['number-sequence'], prompt: '数数顺序是 1、□、3，方框里应该填几？', options: ['0', '2', '4'], correctOptionIndex: 1, hint: '从 1 向后数一个，再看能不能接到 3。', explanation: '1 后面是 2，2 后面是 3，所以方框里填 2。' },
    { knowledgePointIds: ['number-sequence'], prompt: '3 前面的一个数是多少？', options: ['4', '2', '1'], correctOptionIndex: 1, hint: '从 3 向前数一个。', explanation: '按数的顺序，3 前面的一个数是 2。' },
    { knowledgePointIds: ['counting-one-to-one'], prompt: '桌上有 4 个圆片，怎样数更不容易重复？', options: ['每数一个就把它移到另一边', '只看一眼就猜', '同一个圆片多点几次'], correctOptionIndex: 0, hint: '让数过的圆片和没数过的圆片分开。', explanation: '数过一个就移开一个，可以避免漏数或重复数。' },
    { knowledgePointIds: ['quantity-comparison'], prompt: '3 和 5 比，哪个数更大？', options: ['3', '5', '一样大'], correctOptionIndex: 1, hint: '沿着数的顺序看谁排在后面。', explanation: '5 排在 3 后面，所以 5 比 3 大。' },
    { knowledgePointIds: ['zero-as-none'], prompt: '盒子里一个积木也没有，可以用哪个数表示？', options: ['1', '0', '2'], correctOptionIndex: 1, hint: '想一想“没有”可以怎样记数。', explanation: '一个积木也没有，用 0 表示。' },
    { knowledgePointIds: ['quantity-comparison'], prompt: '左边有 2 颗珠子，右边有 4 颗，哪边的珠子更多？', options: ['左边', '右边', '一样多'], correctOptionIndex: 1, hint: '分别数一数两边的珠子再比较。', explanation: '4 比 2 多，右边的珠子更多。' },
    { knowledgePointIds: ['number-sequence', 'zero-as-none'], prompt: '0 后面的一个数是多少？', options: ['2', '1', '0'], correctOptionIndex: 1, hint: '从 0 开始向后数一个。', explanation: '0 后面的一个数是 1。' },
    { knowledgePointIds: ['quantity-comparison'], prompt: '下面哪个数比 3 小？', options: ['4', '2', '5'], correctOptionIndex: 1, hint: '比 3 小的数排在 3 前面。', explanation: '2 排在 3 前面，所以 2 比 3 小。' },
    { knowledgePointIds: ['counting-one-to-one'], prompt: '要数清 5 支铅笔，哪种做法合适？', options: ['一支一支地点数并记录', '只数最后一支', '随便估一个数'], correctOptionIndex: 0, hint: '每支铅笔都要数到，而且只数一次。', explanation: '按顺序一支一支地点数，每支只数一次，结果更清楚。' },
    { knowledgePointIds: ['zero-as-none'], prompt: '盘子里原有 1 个苹果，拿走后一个也没有。现在有几个？', options: ['0 个', '1 个', '2 个'], correctOptionIndex: 0, hint: '拿走后先看盘子里还剩几个苹果。', explanation: '苹果拿走后一个也没有，用 0 个表示。' },
    { knowledgePointIds: ['quantity-comparison'], prompt: '4 和 1 比，哪个数更小？', options: ['4', '1', '一样大'], correctOptionIndex: 1, hint: '排在数的顺序前面的数更小。', explanation: '1 排在 4 前面，所以 1 比 4 小。' },
    { knowledgePointIds: ['number-sequence'], prompt: '从 1 开始往后数，接下来是 2 还是 4？', options: ['4', '2', '1'], correctOptionIndex: 1, hint: '1 后面紧挨着哪个数？', explanation: '从 1 往后数，接下来是 2。' },
    { knowledgePointIds: ['quantity-comparison'], prompt: '两排圆片各有 3 个，哪句话正确？', options: ['第一排更多', '第二排更多', '两排一样多'], correctOptionIndex: 2, hint: '分别数一数两排圆片。', explanation: '两排都是 3 个，所以一样多。' },
    { knowledgePointIds: ['counting-one-to-one'], prompt: '地上散放着 5 块积木，怎样数更不容易漏掉？', options: ['数过一块就把它排成一列', '只数颜色最亮的', '从中间随便开始并反复数同一块'], correctOptionIndex: 0, hint: '把数过和还没数的积木区分开。', explanation: '数过一块就移到一列中，能减少漏数和重复数。' },
  ],
  advanced: [
    { knowledgePointIds: ['number-sequence'], prompt: '从 0 开始向后数：0、1、2，接下来是几？', options: ['4', '3', '2'], correctOptionIndex: 1, hint: '接着 2 再向后数一个。', explanation: '2 后面的一个数是 3。' },
    { knowledgePointIds: ['counting-one-to-one'], prompt: '篮子里有 2 个红球和 1 个蓝球，怎样数出球的总数？', options: ['把每个球都数一次', '只数红球', '把同一个球数两遍'], correctOptionIndex: 0, hint: '红球和蓝球都要数到，每个球只数一次。', explanation: '把 2 个红球和 1 个蓝球逐个数一次，一共是 3 个球。' },
    { knowledgePointIds: ['counting-one-to-one', 'number-sequence'], prompt: '数 5 个纽扣时，已经数过的纽扣放在哪里更清楚？', options: ['和没数过的混在一起', '移到另一边并按数数顺序摆好', '每次都从头猜'], correctOptionIndex: 1, hint: '让数数的顺序看得见。', explanation: '把数过的纽扣依次移开，能按顺序数且不容易重复。' },
    { knowledgePointIds: ['quantity-comparison'], prompt: '小盒有 3 颗珠子，大盒有 2 颗，哪个盒子里的珠子更多？', options: ['大盒', '小盒', '一样多'], correctOptionIndex: 1, hint: '比较 3 和 2。', explanation: '3 比 2 多，所以小盒里的珠子更多。' },
    { knowledgePointIds: ['zero-as-none', 'quantity-comparison'], prompt: '盘子里有 3 个橘子，拿走 3 个后，盘子里还剩几个？', options: ['1 个', '0 个', '3 个'], correctOptionIndex: 1, hint: '拿走和原来一样多的橘子后，还剩吗？', explanation: '3 个橘子都拿走后，一个也没有，剩下 0 个。' },
    { knowledgePointIds: ['number-sequence'], prompt: '哪一组数是按从小到大的顺序排列的？', options: ['2、1、3', '1、2、3', '3、2、1'], correctOptionIndex: 1, hint: '从最小的数开始，逐个向后比较。', explanation: '1 小于 2，2 小于 3，所以 1、2、3 是从小到大的顺序。' },
    { knowledgePointIds: ['quantity-comparison'], prompt: '左边有 4 颗珠子，右边有 5 颗，哪边少 1 颗？', options: ['左边', '右边', '一样多'], correctOptionIndex: 0, hint: '比较 4 和 5，少的那边数量小。', explanation: '4 比 5 少 1，所以左边少 1 颗。' },
    { knowledgePointIds: ['counting-one-to-one', 'quantity-comparison'], prompt: '两组各有 2 个红片和 2 个蓝片，怎样判断两组是否一样多？', options: ['各组逐个点数后比较', '只看颜色猜测', '只数红片，不数蓝片'], correctOptionIndex: 0, hint: '每组的两种颜色都要数到。', explanation: '每组都有 2 个红片和 2 个蓝片，逐个数后都是 4 个，一样多。' },
    { knowledgePointIds: ['number-sequence', 'zero-as-none'], prompt: '数数时从 0 开始，0 后面紧挨着哪个数？', options: ['1', '0', '2'], correctOptionIndex: 0, hint: '从 0 向后数一个。', explanation: '从 0 向后数一个是 1。' },
    { knowledgePointIds: ['quantity-comparison'], prompt: '两排各有 3 个积木，哪句话正确？', options: ['上排更多', '下排更多', '两排一样多'], correctOptionIndex: 2, hint: '每排分别数一数。', explanation: '两排都是 3 个，所以数量一样多。' },
    { knowledgePointIds: ['zero-as-none'], prompt: '小朋友手里有 1 张卡片，交出去后手里没有卡片了。用哪个数表示现在的数量？', options: ['0', '1', '2'], correctOptionIndex: 0, hint: '“没有卡片”对应没有数量。', explanation: '手里没有卡片，用 0 表示。' },
    { knowledgePointIds: ['number-sequence'], prompt: '3 前面紧挨着的一个数是多少？', options: ['4', '2', '1'], correctOptionIndex: 1, hint: '从 3 向前数一个。', explanation: '3 前面紧挨着的数是 2。' },
    { knowledgePointIds: ['counting-one-to-one', 'quantity-comparison'], prompt: '红篮有 2 个球，蓝篮有 1 个球。怎样知道哪个篮子的球更多？', options: ['把两个篮子的球都逐个数一遍再比较', '只数红篮', '不用数，按篮子颜色判断'], correctOptionIndex: 0, hint: '两边都要数，才能公平比较。', explanation: '逐个数出红篮 2 个、蓝篮 1 个，红篮更多。' },
    { knowledgePointIds: ['counting-one-to-one'], prompt: '数一堆 4 个小石子时，哪种做法不容易把同一颗数两次？', options: ['数过一颗就把它移开', '把石子搅在一起反复看', '只数最靠近自己的石子'], correctOptionIndex: 0, hint: '给每颗数过的石子做一个清楚的标记。', explanation: '数过一颗就移开一颗，每颗只对应一次点数。' },
  ],
  high: [
    { knowledgePointIds: ['number-sequence', 'zero-as-none'], prompt: '小明从 0 开始数，写成 0、1、3、4，老师说中间漏了一个数。哪项补全后顺序连续？', options: ['补 2；0、1、2、3、4', '补 4；0、1、3、4、4', '不用补；0、1、3、4 已连续'], correctOptionIndex: 0, hint: '检查 1 后面和 3 前面之间还缺哪个数。', explanation: '从 0 开始每次增加 1，1 后面应是 2，再到 3、4。' },
    { knowledgePointIds: ['counting-one-to-one', 'quantity-comparison'], prompt: '甲盘有 2 个红片和 1 个蓝片，乙盘有 2 个圆片。哪句话正确？', options: ['甲盘比乙盘多 1 个', '乙盘比甲盘多 1 个', '两盘一样多'], correctOptionIndex: 0, hint: '先逐个数出两盘的总数，再比较。', explanation: '甲盘有 3 个，乙盘有 2 个，甲盘多 1 个。' },
    { knowledgePointIds: ['counting-one-to-one', 'quantity-comparison'], prompt: '一组有 2 颗红珠和 2 颗蓝珠，另一组有 4 颗绿珠。怎样判断两组是否一样多？', options: ['逐个数两组，得到 4 和 4', '只数第一组的红珠', '看到颜色不同就判断不一样多'], correctOptionIndex: 0, hint: '颜色不同也可以按个数比较。', explanation: '第一组有 4 颗，另一组也有 4 颗，所以一样多。' },
    { knowledgePointIds: ['number-sequence', 'quantity-comparison'], prompt: '把 1、3、2 从小到大排列后，最大的数是几？', options: ['1', '2', '3'], correctOptionIndex: 2, hint: '先排好顺序，再看排在最后的数。', explanation: '从小到大是 1、2、3，最大的数是 3。' },
    { knowledgePointIds: ['zero-as-none', 'counting-one-to-one'], prompt: '盒子里有 3 个积木，全部拿出来后，盒子里剩几个？', options: ['0 个', '1 个', '3 个'], correctOptionIndex: 0, hint: '把 3 个都拿走后，再看盒子里有没有积木。', explanation: '3 个积木都拿走后，盒子里一个也没有，用 0 个表示。' },
    { knowledgePointIds: ['number-sequence', 'zero-as-none'], prompt: '数数从 0 开始，接着数到 2，正确的顺序是哪一组？', options: ['0、1、2', '1、0、2', '2、1、0'], correctOptionIndex: 0, hint: '从 0 向后数，不要跳过 1。', explanation: '从 0 开始向后数是 0、1、2。' },
    { knowledgePointIds: ['counting-one-to-one', 'number-sequence'], prompt: '桌上有 5 个玩具，已经数过 3 个。哪种方法能找出还没数的玩具？', options: ['把数过的 3 个移到一边，再逐个数剩下的', '把所有玩具混在一起猜', '只数最大的玩具'], correctOptionIndex: 0, hint: '把数过的和没数过的分开。', explanation: '数过的 3 个移开后，再逐个数剩下的玩具，就不会重复数。' },
    { knowledgePointIds: ['number-sequence', 'quantity-comparison'], prompt: '号码卡 3、5、4 要从小到大排队。排好后，哪个数在中间？', options: ['3', '4', '5'], correctOptionIndex: 1, hint: '先排出完整顺序，再找中间的一张卡。', explanation: '从小到大是 3、4、5，所以 4 在中间。' },
    { knowledgePointIds: ['zero-as-none', 'quantity-comparison'], prompt: '小碟里有 0 颗糖，大碟里有 1 颗糖，哪边的糖更多？', options: ['小碟', '大碟', '一样多'], correctOptionIndex: 1, hint: '0 表示没有，比较 0 和 1。', explanation: '小碟里没有糖，大碟里有 1 颗，所以大碟更多。' },
    { knowledgePointIds: ['counting-one-to-one', 'quantity-comparison'], prompt: '红色一堆有 4 颗，蓝色一堆有 2 颗。怎样比较哪堆更多？', options: ['两堆都逐个数，再比较 4 和 2', '只数红色一堆', '按颜色深浅判断'], correctOptionIndex: 0, hint: '比较前要知道两堆各有几个。', explanation: '红色一堆有 4 颗，蓝色一堆有 2 颗，红色一堆更多。' },
    { knowledgePointIds: ['number-sequence', 'quantity-comparison'], prompt: '把 2、4、5 按从小到大排列，最小的数是几？', options: ['5', '2', '4'], correctOptionIndex: 1, hint: '找出排在数序最前面的数。', explanation: '从小到大是 2、4、5，最小的数是 2。' },
    { knowledgePointIds: ['zero-as-none', 'number-sequence'], prompt: '从 0 开始依次数到 3，完整的数序是哪一组？', options: ['0、1、2、3', '0、2、3', '3、2、1、0'], correctOptionIndex: 0, hint: '每次向后数一个，不能跳过中间的数。', explanation: '从 0 开始依次数到 3 是 0、1、2、3。' },
    { knowledgePointIds: ['counting-one-to-one', 'quantity-comparison'], prompt: '两组物品混在一起后，怎样判断每组谁更多？', options: ['按颜色分开，逐个数，再比较数量', '只看哪组颜色更亮', '随便拿几件来比较'], correctOptionIndex: 0, hint: '先按组分清楚，再点数和比较。', explanation: '先按组分开并逐个数，才能根据数量判断哪组更多。' },
    { knowledgePointIds: ['zero-as-none', 'quantity-comparison'], prompt: '一个篮子里没有球，另一个篮子里有 1 个球。第一个篮子比第二个篮子少几个球？', options: ['0 个', '1 个', '2 个'], correctOptionIndex: 1, hint: '没有球是 0 个，比较 0 和 1。', explanation: '0 比 1 少 1，所以第一个篮子少 1 个球。' },
    { knowledgePointIds: ['zero-as-none', 'quantity-comparison'], prompt: '红盒里没有橡皮，蓝盒里有 2 块。哪句话正确？', options: ['红盒比蓝盒多', '蓝盒比红盒多', '两盒一样多'], correctOptionIndex: 1, hint: '没有橡皮可以用 0 表示，再比较 0 和 2。', explanation: '红盒有 0 块，蓝盒有 2 块，所以蓝盒更多。' },
    { knowledgePointIds: ['zero-as-none', 'number-sequence', 'quantity-comparison'], prompt: '三张卡写着 0、2、3。小组要按从小到大排好，并说明 0 可以表示什么。哪项两部分都正确？', options: ['0、2、3；0 可以表示没有', '0、3、2；0 表示有 1 个', '2、0、3；0 表示有 2 个'], correctOptionIndex: 0, hint: '先按数的大小排列，再回想 0 表示的数量。', explanation: '从小到大是 0、2、3；0 可以表示一个也没有。' },
  ],
};

export const grade1MathUnit01SupplementalActivities: Grade1MathUnit01SupplementalActivity[] = Object.entries(drafts).flatMap(([difficulty, items]) => (
  items.map((draft, index) => ({
    difficulty: difficulty as Difficulty,
    sourceUnitId,
    knowledgePointIds: draft.knowledgePointIds,
    activity: {
      id: `${idPrefix}-${difficulty}-${String(index + 1).padStart(2, '0')}`,
      kind: 'choice' as const,
      prompt: draft.prompt,
      options: draft.options.map((label, optionIndex) => ({ id: `option-${optionIndex + 1}`, label })),
      correctOptionId: `option-${draft.correctOptionIndex + 1}`,
      hint: draft.hint,
      explanation: draft.explanation,
    },
  }))
));
