import type { ChoiceActivityDefinition, Difficulty } from '../../content/types';

export interface Grade2Term1MathUnit09SupplementalActivity {
  difficulty: Difficulty;
  sourceUnitId: string;
  knowledgePointIds: string[];
  activity: ChoiceActivityDefinition;
}

interface ActivityDraft {
  knowledgePointIds: string[];
  prompt: string;
  answer: string;
  distractors: [string, string];
  hint: string;
  explanation: string;
}

const sourceUnitId = 'grade-2/term-1/math/unit-09';
const idPrefix = 'challenge-supplement-grade-2-term-1-math-unit-09';
const reviewMethod = 'term-review-method-selection';
const resultChecking = 'term-review-result-checking';
const length = 'length-units-and-measurement';
const additionSubtraction = 'two-digit-addition-and-subtraction';
const multiplication = 'multiplication-facts-and-equal-groups';
const angle = 'angle-comparison-by-opening';
const solid = 'solid-figure-observation';
const time = 'clock-reading-and-elapsed-time';
const pairing = 'systematic-pairing-and-enumeration';
const reasoning = 'problem-solving-and-verification';

function draft(
  knowledgePointIds: string[],
  prompt: string,
  answer: string,
  distractors: [string, string],
  hint: string,
  explanation: string,
): ActivityDraft {
  return {
    knowledgePointIds: [...new Set([reviewMethod, resultChecking, ...knowledgePointIds])],
    prompt,
    answer,
    distractors,
    hint,
    explanation,
  };
}

const drafts: Record<Difficulty, ActivityDraft[]> = {
  basic: [
    draft([additionSubtraction], '计算：56 + 27。', '83', ['73', '93'], '个位6加7满十，记得向十位进1。', '个位相加得到13，个位写3；十位5加2再加进位1，得到8，所以结果是83。'),
    draft([additionSubtraction], '计算：91 − 46。', '45', ['55', '35'], '个位1不够减6，要从十位退1。', '91减46需要退位，计算结果是45。'),
    draft([length], '2米35厘米合起来是多少厘米？', '235厘米', ['55厘米', '2035厘米'], '先把2米换成厘米，再加上35厘米。', '2米等于200厘米，200加35等于235厘米。'),
    draft([length], '尺子上，线段从4厘米刻度开始，到13厘米刻度结束。线段长多少厘米？', '9厘米', ['13厘米', '17厘米'], '用结束刻度减去开始刻度。', '13减4等于9，线段长9厘米。'),
    draft([multiplication], '4排书架每排放6本书，一共放多少本？', '24本', ['10本', '20本'], '把4个6合起来。', '4乘6等于24本。'),
    draft([multiplication], '5组同学每组7人，一共有多少人？', '35人', ['12人', '30人'], '用乘法口诀计算5个7。', '5乘7等于35人。'),
    draft([angle], '两只角的张开程度相同，只是两条边画出的长度不同。它们的大小怎样？', '一样大', ['边长的角更大', '两只角都变成直角'], '比较两边张开的程度，不比较边的长度。', '角的大小看张开程度，边画得长短不影响角的大小。'),
    draft([solid], '观察一个单独的小正方体，从正上方看，主要能看到哪个面？', '顶面', ['底面', '背面'], '观察者站在物体上方。', '从正上方观察小正方体，能看到顶面。'),
    draft([time], '一项活动从8时20分开始，到8时50分结束，经过多少分钟？', '30分钟', ['20分钟', '50分钟'], '结束分钟数减去开始分钟数。', '50分减20分，经过30分钟。'),
    draft([pairing], '2顶帽子和3条围巾任意搭配，每次各选一种，共有几种？', '6种', ['5种', '8种'], '固定一顶帽子，分别配3条围巾。', '2顶帽子各配3条围巾，共有2乘3等于6种搭配。'),
    draft([additionSubtraction, reasoning], '用加法检查63 − 28 = 35是否正确，应该怎样算？', '35 + 28 = 63', ['63 + 28 = 91', '35 + 63 = 98'], '把差和减数相加。', '差加减数应等于被减数，35加28等于63。'),
    draft([length], '测量一条较长的走廊，下面哪种单位更合适？', '米', ['厘米', '分钟'], '想想走廊比课本长得多。', '走廊通常较长，用米记录更合适。'),
    draft([time], '下面哪个说法表示一段时间的长短？', '40分钟', ['上午9时', '6时30分'], '它回答“持续多久”。', '40分钟表示时长；另外两个说法表示具体时刻。'),
    draft([pairing, reasoning], '列出两类物品的搭配时，怎样做更容易不漏？', '先固定一个第一类选项，再逐项搭配所有第二类选项', ['想到哪组就写哪组', '只记录最先想到的一组'], '给记录安排一个固定顺序。', '固定第一类的一个选项并逐项配完第二类，再换下一个，可以减少遗漏。'),
    draft([time], '6时15分到7时整，经过多少分钟？', '45分钟', ['35分钟', '55分钟'], '先从6时15分数到6时30分，再数到7时整。', '从6时15分到6时30分是15分钟，再到7时整是30分钟，共45分钟。'),
  ],
  advanced: [
    draft([additionSubtraction], '班级图书角有68本故事书，又添了27本，现在一共有多少本？', '95', ['85', '105'], '个位8加7满十。', '个位相加得到15，个位写5并向十位进1；十位相加得到9，结果是95本。'),
    draft([additionSubtraction], '书架上有92本书，借给同学57本后，还剩多少本？', '35', ['45', '39'], '个位2不够减7，需要退位。', '从十位退1后，12减7等于5，8减5等于3，还剩35本。'),
    draft([multiplication], '6盒彩笔每盒8支，一共有多少支？', '48支', ['14支', '42支'], '用乘法口诀算6个8。', '6乘8等于48支。'),
    draft([multiplication, additionSubtraction], '4盒卡片每盒6张，另外还有5张散卡。一共有多少张？', '29张', ['24张', '35张'], '先算4盒有多少张，再加上散卡。', '4乘6等于24，24加5等于29张。'),
    draft([length], '1米50厘米和165厘米相比，前者短多少厘米？', '15厘米', ['5厘米', '35厘米'], '先把前一个长度换成厘米。', '1米50厘米等于150厘米，165减150等于15厘米。'),
    draft([angle], '一个直角和另一个角相比，哪个角张开得更小？', '小于直角的角', ['直角', '两个角一定一样大'], '用直角作参照，比较张开程度。', '小于直角的角张开程度更小，所以它更小。'),
    draft([solid], '两个相同小正方体左右紧挨着排成一行。从正面和右侧观察，分别能看到几个正方形面？', '正面能看到2个面，侧面看到1个面', ['两个方向都看到2个面', '正面看到1个面，侧面看到2个面'], '正面能看到两个方块，右侧只对着最右边的方块。', '从正面能看到两个并排的面；从右侧看，两个方块重叠在同一方向，只看到一个面。'),
    draft([time], '活动从10时25分开始，到11时10分结束，经过多少分钟？', '45分钟', ['35分钟', '55分钟'], '先从10时25分数到11时，再数到11时10分。', '从10时25分到11时是35分钟，再加10分钟，共45分钟。'),
    draft([time], '阅读小组3时40分开始整理展示卡，35分钟后完成。完成时刻是？', '4时15分', ['4时5分', '4时25分'], '先数到4时，再继续数剩下的分钟。', '从3时40分到4时用了20分钟，还剩15分钟，完成于4时15分。'),
    draft([pairing], '3件外套和2顶帽子各选一种，其中一件外套不能配其中一顶帽子。还剩几种搭配？', '5种', ['4种', '6种'], '先数没有限制时的搭配，再去掉不合适的一组。', '3乘2共有6种，去掉1种不能搭配的情况，还剩5种。'),
    draft([multiplication, additionSubtraction], '5个书架每个放8本书，借出17本后还剩多少本？', '23本', ['17本', '31本'], '先算书架上一共有多少本，再减去借出的数量。', '5乘8等于40，40减17等于23本。'),
    draft([additionSubtraction, reasoning], '小明算出84 − 39 = 45。下面哪种算式可以检查结果？', '45 + 39 = 84', ['84 + 39 = 123', '45 + 84 = 129'], '用减法的逆运算验算。', '差45加减数39等于被减数84，结果正确。'),
    draft([pairing], '4条路线各能配2个出发时间，共有8种搭配。清单里只有6种不同配对，怎样判断？', '还差2组', ['已经多出2组', '刚好记录完整'], '比较清单中的不同配对数和应有总数。', '应有8种不同搭配，已有6种，还少2种。'),
    draft([length, additionSubtraction], '一段绳子长75厘米，另一段长35厘米。两段接起来共长多少厘米？', '110厘米，也就是1米10厘米', ['100厘米，也就是1米', '110米'], '先把厘米数相加，再把100厘米换成1米。', '75加35等于110厘米；100厘米是1米，所以是1米10厘米。'),
    draft([angle, reasoning], '两只角张开程度相同，一只角的边画得更长。下面哪种说法正确？', '张开程度相同的角一样大', ['边画得长的角更大', '边画得短的角一定更小'], '角的大小不是看边画了多长。', '两只角张开程度相同，角的大小就相同。'),
    draft([time, reasoning], '活动甲从9时10分到9时40分，活动乙从9时35分到9时50分。两项活动重叠几分钟？', '重叠5分钟', ['重叠10分钟', '没有重叠'], '比较甲结束前，乙已经开始的那段时间。', '乙在9时35分开始，甲到9时40分才结束，重叠5分钟。'),
  ],
  high: [
    draft([length, additionSubtraction], '一根绳子长1米30厘米，另一根长70厘米。第一根比第二根长多少厘米？', '60厘米', ['40厘米', '200厘米'], '先把1米30厘米换成厘米，再相减。', '1米30厘米等于130厘米，130减70等于60厘米。'),
    draft([additionSubtraction], '计算：46 + 38 − 29。', '55', ['45', '65'], '先算加法，再用和减去29。', '46加38等于84，84减29等于55。'),
    draft([multiplication, additionSubtraction], '7组积木每组6块，拿走8块后还剩多少块？', '34块', ['42块', '26块'], '先求7组积木的总数。', '7乘6等于42，42减8等于34块。'),
    draft([multiplication, additionSubtraction], '3盒蜡笔每盒8支，其中5支用完了，还剩多少支？', '19支', ['13支', '24支'], '先求蜡笔总数，再减去用完的支数。', '3乘8等于24，24减5等于19支。'),
    draft([angle, reasoning], '两只角的边长短不同，但张开程度相同。怎样比较它们？', '一样大，因为角看张开程度', ['边长的角更大', '边短的角更大'], '用相同的参照比较两边张开程度。', '边的长度不决定角的大小，张开程度相同就一样大。'),
    draft([solid], '两个小正方体上下叠放。从正上方和正面观察，能看到几个正方形面？', '上面看到1个正方形，正面看到2个正方形', ['两个方向都看到2个正方形', '上面看到2个正方形，正面看到1个正方形'], '上下叠放时，从上方看两个方块在同一位置。', '从上面看只看到最上面的一个面；从正面能看到上下两个面。'),
    draft([time], '活动从8时45分开始，持续35分钟，结束时刻是？', '9时20分', ['9时10分', '9时30分'], '先数到9时，再继续数剩下的分钟。', '从8时45分到9时是15分钟，还剩20分钟，结束于9时20分。'),
    draft([time, reasoning], '活动甲在2时50分结束，活动乙在2时35分开始。两项活动重叠多少分钟？', '重叠15分钟', ['间隔15分钟', '两项活动首尾相接'], '比较乙的开始时刻和甲的结束时刻。', '乙提前15分钟开始，因此两项活动重叠15分钟。'),
    draft([pairing, reasoning], '3种帽子和3条围巾任意搭配，有9种可能。其中2组不能搭配，还剩几种？', '7种', ['6种', '9种'], '先求全部搭配数，再去掉不能使用的两组。', '3乘3共有9种，去掉2种不合适的搭配，还剩7种。'),
    draft([length, additionSubtraction], '两段彩带分别长1米45厘米和65厘米，接起来共长多少厘米？', '210厘米，也就是2米10厘米', ['110厘米，也就是1米10厘米', '210米'], '先把米换成厘米，再把两段长度相加。', '1米45厘米等于145厘米，145加65等于210厘米，也就是2米10厘米。'),
    draft([multiplication, reasoning], '3组每组6个球，下面哪种算式能表示总数？', '3乘6', ['3加6', '6减3'], '相同数量的几组相加，可以用乘法表示。', '3组每组6个，表示3个6相加，用3乘6。'),
    draft([pairing, reasoning], '3种帽子和5条围巾共有15种搭配。清单已经列出14种，且没有重复。接下来应该怎样做？', '找到缺少的那组搭配并补齐', ['把其中一组再抄一遍', '把搭配总数改成14种'], '没有重复但数量不足，说明仍有一种搭配没列出。', '应有15种不同搭配，已有14种且无重复，还要找出遗漏的一组。'),
    draft([multiplication, additionSubtraction], '每盒有6块橡皮，先买4盒，再把其中7块送给同学。下面怎样计算剩下的块数？', '先用乘法求总数，再减去已用数量', ['把4和6相加后再加7', '用7减去4盒'], '先算出4盒共有多少块。', '先算4乘6求总数，再减去送出的7块。'),
    draft([additionSubtraction, reasoning], '小华计算68 + 24 = 92，怎样用减法检查这个结果？', '用减法逆运算检查：92 − 24 = 68', ['92 + 24 = 116', '68 − 24 = 44'], '用和减去一个加数，应得到另一个加数。', '92减24等于68，和减去一个加数得到另一个加数，说明计算正确。'),
  ],
};

export const grade2Term1MathUnit09SupplementalActivities: Grade2Term1MathUnit09SupplementalActivity[] = Object.entries(drafts).flatMap(([difficulty, items]) => (
  items.map((item, index) => {
    const correctOptionIndex = ((index * 2 + 1) % 3) as 0 | 1 | 2;
    const options = [...item.distractors];
    options.splice(correctOptionIndex, 0, item.answer);
    return {
      difficulty: difficulty as Difficulty,
      sourceUnitId,
      knowledgePointIds: item.knowledgePointIds,
      activity: {
        id: `${idPrefix}-${difficulty}-${String(index + 1).padStart(2, '0')}`,
        kind: 'choice' as const,
        prompt: item.prompt,
        options: options.map((label, optionIndex) => ({ id: `option-${optionIndex + 1}`, label })),
        correctOptionId: `option-${correctOptionIndex + 1}`,
        hint: item.hint,
        explanation: item.explanation,
      },
    };
  })
));
