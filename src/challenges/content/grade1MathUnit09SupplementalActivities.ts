import type { Difficulty } from '../../content/types';
import type { ActivityDefinition } from '../../content/types';

interface ActivityDraft {
  knowledgePointIds: string[];
  prompt: string;
  options: [string, string, string];
  correctOptionIndex: 0 | 1 | 2;
  hint: string;
  explanation: string;
}

interface Grade1MathUnit09SupplementalActivity {
  difficulty: Difficulty;
  sourceUnitId: string;
  knowledgePointIds: string[];
  activity: Extract<ActivityDefinition, { kind: 'choice' }>;
}

const sourceUnitId = 'grade-1/term-1/math/unit-09';
const idPrefix = 'challenge-supplement-grade-1-term-1-math-unit-09';

const points = {
  addition: 'addition-within-twenty',
  sequence: 'number-sequence-eleven-to-twenty',
  comparison: 'comparison-within-ten',
  teenComparison: 'number-comparison-eleven-to-twenty',
  subtraction: 'subtraction-within-ten',
  position: 'relative-position',
  shape: 'solid-shape-recognition',
  shapeFeatures: 'solid-shape-features',
  shapeUse: 'solid-shape-use',
  wholeHour: 'clock-whole-hour-reading',
  additionCheck: 'addition-checking',
  modeling: 'addition-situation-modeling',
} as const;

function question(
  knowledgePointIds: string[],
  prompt: string,
  options: [string, string, string],
  correctOptionIndex: 0 | 1 | 2,
  hint: string,
  explanation: string,
): ActivityDraft {
  return { knowledgePointIds, prompt, options, correctOptionIndex, hint, explanation };
}

const drafts: Record<Difficulty, ActivityDraft[]> = {
  basic: [
    question([points.addition], '计算：8 + 4 = ?', ['12', '11', '13'], 0, '先从 8 接着往后数 4 个数。', '8 再数 4 个数是 12，所以 8 + 4 = 12。'),
    question([points.sequence], '从 16 往后数一个数，接下来是几？', ['17', '15', '18'], 0, '从 16 接着数一个数。', '16 后面的一个数是 17。'),
    question([points.teenComparison], '18 和 13 比，哪句话正确？', ['18 比 13 大', '18 比 13 小', '18 和 13 一样大'], 0, '比较十位和个位表示的数量。', '18 个比 13 个多，所以 18 比 13 大。'),
    question([points.subtraction], '计算：9 - 3 = ?', ['6', '5', '7'], 0, '从 9 个里面去掉 3 个。', '9 个去掉 3 个，还剩 6 个。'),
    question([points.position], '小狗在小猫左边，小猫在小狗的哪一边？', ['右边', '左边', '上面'], 0, '把两个小动物的位置关系倒过来说。', '小狗在小猫左边，小猫就在小狗右边。'),
    question([points.shape], '哪种立体图形的整体外形最像一颗骰子？', ['正方体', '球体', '圆柱体'], 0, '骰子的各个面看起来方方的。', '骰子整体接近正方体。'),
    question([points.shapeFeatures], '哪种立体图形有两个圆圆的平面和一个弯曲的面？', ['圆柱体', '球体', '正方体'], 0, '想想圆筒上下两端的形状。', '圆柱体有两个圆形平面和一个弯曲的侧面。'),
    question([points.shapeUse], '轻轻推一下，哪种立体图形最容易向各个方向滚动？', ['球体', '正方体', '长方体'], 0, '比较每种图形的表面是不是弯曲的。', '球体表面弯曲，轻轻推动时容易向各个方向滚动。'),
    question([points.wholeHour], '分针指向 12，时针指向 5，钟面表示什么时刻？', ['5 时整', '6 时整', '12 时整'], 0, '分针指向 12 表示整时。', '分针指向 12、时针指向 5，表示 5 时整。'),
    question([points.wholeHour], '钟面上分针指向 12、时针指向 6。下面哪句话说明它是整时？', ['分针指向 12 表示整时', '时针指向 6 表示整时', '钟面上有 12 个数字表示整时'], 0, '先看分针指向哪里。', '分针指向 12 表示整时，再看时针确定小时数。'),
    question([points.sequence], '1 个十和 4 个一合起来是几？', ['14', '12', '15'], 0, '十位上有 1 个十，个位上有 4 个一。', '1 个十和 4 个一合起来是 14。'),
    question([points.addition, points.modeling], '书架上有 12 本书，又放上 6 本，现在有多少本？', ['18 本', '17 本', '19 本'], 0, '“又放上”表示数量增加，要把两部分合起来。', '12 + 6 = 18，现在有 18 本。'),
    question([points.sequence], '把数按从小到大排列，17、12、15 中最前面的是几？', ['12', '15', '17'], 0, '先比较这几个数的十位和个位。', '12 小于 15，也小于 17，所以排在最前面。'),
    question([points.comparison], '10 和 7 比，哪句话正确？', ['10 比 7 大', '10 比 7 小', '10 和 7 一样大'], 0, '从 7 往后数到 10，看看谁的数量多。', '10 个比 7 个多，所以 10 比 7 大。'),
    question([points.addition, points.additionCheck], '同学把 7 + 8 算成 16。用凑十法重新计算，应该怎样改？', ['改成 15，因为 7 + 8 = 7 + 3 + 5 = 15', '改成 14，因为 7 + 8 = 7 + 3 + 4 = 14', '保留 16，因为 7 + 8 凑成 10'], 0, '把 8 分成 3 和 5，先让 7 和 3 凑成 10。', '7 + 8 = 7 + 3 + 5 = 10 + 5 = 15，应改成 15。'),
    question([points.subtraction], '盘子里有 8 颗葡萄，吃掉 3 颗，还剩几颗？', ['5 颗', '4 颗', '6 颗'], 0, '从 8 颗里去掉 3 颗。', '8 - 3 = 5，还剩 5 颗。'),
  ],
  advanced: [
    question([points.addition], '计算：9 + 8 = ?', ['17', '16', '18'], 0, '先把 8 分成 1 和 7，让 9 先凑成 10。', '9 + 8 = 9 + 1 + 7 = 10 + 7 = 17。'),
    question([points.sequence], '数列是 14、15、□、17，方框里填几？', ['16', '15', '18'], 0, '这些数每次按顺序增加 1。', '14、15、16、17 是连续的数，方框里填 16。'),
    question([points.teenComparison], '16 和 19 比，哪句话正确？', ['16 比 19 小', '16 比 19 大', '16 和 19 一样大'], 0, '两个数的十位相同，再比较个位。', '十位相同，6 个一比 9 个一少，所以 16 比 19 小。'),
    question([points.subtraction], '计算：10 - 3 = ?', ['7', '6', '8'], 0, '从 10 个里面去掉 3 个。', '10 个去掉 3 个，还剩 7 个。'),
    question([points.position], '课桌在书架前面，书架在课桌的哪一边？', ['后面', '前面', '右边'], 0, '把两个物体的位置关系倒过来说。', '课桌在书架前面，所以书架在课桌后面。'),
    question([points.shape], '橡皮擦盒的整体外形最接近哪种立体图形？', ['长方体', '球体', '圆柱体'], 0, '观察盒子的整体轮廓。', '长方形盒子整体接近长方体。'),
    question([points.shapeFeatures], '哪种立体图形有弯弯的侧面，也有平平的圆形底面？', ['圆柱体', '正方体', '球体'], 0, '留意图形侧面和底面的形状。', '圆柱体的侧面弯曲，底面是圆形的平面。'),
    question([points.shapeUse], '轻轻推正方体、球体和圆柱体。哪种图形没有弯曲表面，不能像另两种那样沿弯曲表面滚动？', ['正方体', '球体', '圆柱体'], 0, '分别想想三种图形的表面是平的还是弯的。', '正方体的面都是平的；球体和圆柱体都有弯曲表面，可以沿弯曲表面滚动。'),
    question([points.wholeHour], '钟面上时针指向 8，分针指向 12，表示什么时刻？', ['8 时整', '7 时整', '12 时整'], 0, '整时时分针指向 12。', '时针指向 8、分针指向 12，表示 8 时整。'),
    question([points.wholeHour], '两个钟面上的分针都指向 12，一个时针指向 4，另一个时针指向 8。按小时数从小到大，应该怎样记录？', ['4 时整 → 8 时整', '8 时整 → 4 时整', '4 时整 → 6 时整'], 0, '先比较时针指向的数，再按从小到大排列。', '4 小于 8，所以先记 4 时整，再记 8 时整。'),
    question([points.sequence], '1 个十和 9 个一合起来是几？', ['19', '18', '20'], 0, '把 1 个十和 9 个一合起来读数。', '1 个十和 9 个一合起来是 19。'),
    question([points.addition, points.modeling], '操场上有 7 个同学，又来了 8 个，现在有多少个？', ['15 个', '14 个', '16 个'], 0, '“又来了”表示人数增加。', '7 + 8 = 15，现在有 15 个同学。'),
    question([points.addition, points.additionCheck], '同学说 9 + 6 = 14。用凑十法检查，哪项能说明他算错了？', ['9 + 6 = 9 + 1 + 5 = 15，所以应改成 15', '9 + 6 = 9 + 1 + 4 = 14，所以 14 正确', '9 + 6 = 9 + 6 = 14，不需要再算'], 0, '把 6 分成 1 和 5，让 9 先凑成 10。', '9 + 6 = 9 + 1 + 5 = 10 + 5 = 15，所以 14 不正确。'),
    question([points.comparison], '10 和 8 比，哪句话正确？', ['10 比 8 大', '10 比 8 小', '10 和 8 一样大'], 0, '从 8 往后数到 10，看看数量的多少。', '10 个比 8 个多，所以 10 比 8 大。'),
    question([points.sequence], '从 19 接着往后数一个数，数到几？', ['20', '18', '19'], 0, '19 后面再数一个数。', '19 后面是 20。'),
    question([points.subtraction], '小盒里有 9 张卡片，拿走 4 张，还剩几张？', ['5 张', '4 张', '6 张'], 0, '从 9 张里去掉 4 张。', '9 - 4 = 5，还剩 5 张。'),
    question([points.position], '小树在长椅后面，长椅在小树的哪一边？', ['前面', '后面', '左边'], 0, '把前后关系换一个参照物来表达。', '小树在长椅后面，所以长椅在小树前面。'),
  ],
  high: [
    question([points.addition, points.modeling], '盒子里有 8 个红球、7 个蓝球，又放进 4 个黄球，一共有几个球？', ['19 个', '18 个', '20 个'], 0, '先把前两部分合起来，再加上后来放进的数量。', '8 + 7 = 15，15 + 4 = 19，一共有 19 个球。'),
    question([points.addition], '9 + □ = 17，方框里填几？', ['8', '7', '9'], 0, '从 9 接着数到 17，一共还要数几个数？', '9 + 8 = 17，方框里填 8。'),
    question([points.sequence], '把 14、19、12 按从小到大排列，最中间的是几？', ['14', '12', '19'], 0, '先排出最小的数，再看剩下两个数。', '12 小于 14，14 小于 19，所以最中间的是 14。'),
    question([points.comparison, points.sequence], '三张数量卡写着 8、6、9。要按从少到多排好，并找出中间那张卡，哪项正确？', ['6、8、9；中间是 8', '8、6、9；中间是 9', '9、8、6；中间是 8'], 0, '先比较三个数并排出顺序，再找中间位置。', '从少到多是 6、8、9，所以中间那张卡是 8。'),
    question([points.subtraction, points.addition], '盒子里有 8 颗糖，先拿走 3 颗，再放回 2 颗。哪项按顺序记录了变化并算出最后数量？', ['8 − 3 + 2 = 7', '8 + 3 − 2 = 9', '8 − 3 − 2 = 3'], 0, '按题目顺序先减去拿走的糖，再加回放回的糖。', '先算 8 − 3 = 5，再算 5 + 2 = 7，最后有 7 颗糖。'),
    question([points.shape, points.shapeFeatures, points.shapeUse], '把正方体、球体和圆柱体分别放在同一张平桌上轻推，哪条观察记录正确？', ['球体能向各个方向滚动，圆柱体能沿弯曲侧面滚动，正方体的面都是平的', '球体只有平面，圆柱体只能向各个方向滚动，正方体的表面是弯的', '三种图形都有弯曲表面，都能向各个方向滚动'], 0, '分别判断三种图形有没有弯曲表面，以及弯曲部分能怎样滚动。', '球体表面弯曲，可向各个方向滚动；圆柱体能沿弯曲侧面滚动；正方体各面平，轻推时不会像它们那样沿弯曲面滚动。'),
    question([points.shape, points.shapeFeatures], '方方的骰子和长方的书本，整体外形分别接近哪两种立体图形？', ['正方体和长方体', '球体和圆柱体', '长方体和球体'], 0, '先看骰子和书本整体外轮廓的不同。', '骰子整体接近正方体，书本整体接近长方体。'),
    question([points.position], '小猫在门里面，小狗站在门的另一侧。以门为参照，小狗在哪里？', ['门外面', '门里面', '门上面'], 0, '先看小狗和门内的小猫分别在门的哪一侧。', '小猫在门里面，小狗站在门的另一侧，所以小狗在门外面。'),
    question([points.wholeHour], '同学看到分针指向 12、时针指向 9，却读成“12 时整”。哪项订正正确？', ['应读作 9 时整；分针指向 12 表示整时，时针指向 9 决定小时数', '应读作 12 时整；分针指向 12 就决定小时数', '应读作 8 时整；把时针指向 9 看成前一个数'], 0, '先用分针判断整时，再用时针确定小时数。', '分针指向 12 表示整时；时针指向 9，所以应读作 9 时整。'),
    question([points.wholeHour], '三个钟面上的分针都指向 12，时针分别指向 9、5、7。同学写成“9 时整、5 时整、7 时整”，哪项按小时数从小到大的记录正确？', ['5 时整 → 7 时整 → 9 时整', '7 时整 → 5 时整 → 9 时整', '9 时整 → 7 时整 → 5 时整'], 0, '先把三个小时数按从小到大排列。', '5 小于 7，7 小于 9，所以应记录为 5 时整、7 时整、9 时整。'),
    question([points.addition, points.additionCheck], '同学把 9 + 8 算成 18。用凑十法检查，哪项能纠正他的结果？', ['9 + 8 = 9 + 1 + 7 = 17，应改成 17', '9 + 8 = 9 + 1 + 6 = 16，应改成 16', '9 + 8 = 18，不需要重新计算'], 0, '把 8 分成 1 和 7，让 9 先凑成 10。', '9 + 8 = 9 + 1 + 7 = 10 + 7 = 17，所以应改成 17。'),
    question([points.addition], '先算 7 + 8，再把得数加 4，最后得几？', ['19', '18', '20'], 0, '先求出 7 + 8，再接着加 4。', '7 + 8 = 15，15 + 4 = 19。'),
    question([points.sequence], '从 11 数到 20，18 后面的两个数依次是几和几？', ['19 和 20', '17 和 19', '18 和 20'], 0, '18 后面接着数两个数。', '18 后面依次是 19、20。'),
    question([points.teenComparison], '小明说“13 比 17 大，因为 3 比 7 小”。哪项判断能说明他错在哪里？', ['不对，十位相同后比较个位；7 比 3 大，所以 17 比 13 大', '对，个位小的数一定更大', '不对，因为 13 和 17 的十位不同'], 0, '两数十位相同，再比较个位上的 3 和 7。', '3 小于 7，所以 13 小于 17；不能因为个位较小就说整个数较大。'),
    question([points.subtraction], '书架上有 10 本书，拿走 6 本，还剩几本？', ['4 本', '3 本', '5 本'], 0, '从 10 本里去掉 6 本。', '10 - 6 = 4，还剩 4 本。'),
    question([points.shapeFeatures, points.shapeUse], '把圆柱体轻轻放在桌上，哪种情况最可能发生？', ['可以用平平的圆形底面放稳，也能沿侧面滚动', '每个面都是方方的，不能滚动', '整个表面都弯曲，不能平稳放下'], 0, '圆柱体有平面底，也有弯曲的侧面。', '圆柱体可以用平平的底面放稳，也可以沿弯曲的侧面滚动。'),
    question([points.position, 'reference-point'], '你面向黑板时，书包在你的左边；转身背向黑板后，书包在你的哪边？', ['右边', '左边', '前面'], 0, '转身后，左右方向会改变。', '转过身后左右相反，书包在右边。'),
  ],
};

export const grade1MathUnit09SupplementalActivities: Grade1MathUnit09SupplementalActivity[] =
  (Object.entries(drafts) as [Difficulty, ActivityDraft[]][]).flatMap(([difficulty, items]) => items.map((draft, index) => {
    const options = draft.options.map((label, optionIndex) => ({ id: `option-${optionIndex + 1}`, label }));
    return {
      difficulty,
      sourceUnitId,
      knowledgePointIds: [...draft.knowledgePointIds],
      activity: {
        id: `${idPrefix}-${difficulty}-${String(index + 1).padStart(2, '0')}`,
        kind: 'choice',
        prompt: draft.prompt,
        hint: draft.hint,
        explanation: draft.explanation,
        options,
        correctOptionId: options[draft.correctOptionIndex]!.id,
      },
    };
  }));
