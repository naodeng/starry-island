import type { ChoiceActivityDefinition, Difficulty } from '../../content/types';

export interface Grade1MathUnit03SupplementalActivity {
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

const sourceUnitId = 'grade-1/term-1/math/unit-03';
const idPrefix = 'challenge-supplement-grade-1-term-1-math-unit-03';

const drafts: Record<Difficulty, ActivityDraft[]> = {
  basic: [
    { knowledgePointIds: ['number-composition-within-five'], prompt: '5 可以分成 2 和几？', options: ['2', '3', '4'], correctOptionIndex: 1, hint: '想一想，两个数合起来要正好是 5。', explanation: '2 和 3 合起来是 5，所以另一个数是 3。' },
    { knowledgePointIds: ['number-composition-within-five'], prompt: '4 里面有 3 个，剩下几个？', options: ['1', '2', '3'], correctOptionIndex: 0, hint: '从 4 个里面去掉 3 个。', explanation: '4 − 3 = 1，剩下 1 个。' },
    { knowledgePointIds: ['addition-within-five', 'subtraction-within-five', 'comparison-within-five'], prompt: '下面哪道算式的得数是 3？', options: ['1 + 2', '2 + 2', '5 − 1'], correctOptionIndex: 0, hint: '分别算出三道算式的得数，再和 3 比较。', explanation: '1 + 2 = 3；2 + 2 = 4，5 − 1 = 4。' },
    { knowledgePointIds: ['subtraction-within-five'], prompt: '盘子里有 5 块饼干，拿走 1 块，还剩几块？', options: ['3', '4', '5'], correctOptionIndex: 1, hint: '从原来的 5 块中去掉拿走的 1 块。', explanation: '5 − 1 = 4，还剩 4 块。' },
    { knowledgePointIds: ['comparison-within-five'], prompt: '比较 3 和 4，哪个数大？', options: ['3', '4', '一样大'], correctOptionIndex: 1, hint: '从小到大数一数这两个数。', explanation: '3 后面是 4，所以 4 比 3 大。' },
    { knowledgePointIds: ['addition-within-five'], prompt: '2 + 2 = ?', options: ['3', '4', '5'], correctOptionIndex: 1, hint: '从 2 开始，再数 2 个数。', explanation: '2 + 2 = 4。' },
    { knowledgePointIds: ['number-composition-within-five', 'addition-within-five'], prompt: '书架上有 1 本书，又放上 3 本，现在有几本？', options: ['3', '4', '5'], correctOptionIndex: 1, hint: '把原来的书和新放上的书合在一起算。', explanation: '1 本和 3 本合起来是 4 本，1 + 3 = 4。' },
    { knowledgePointIds: ['subtraction-within-five'], prompt: '有 5 颗珠子，拿走 3 颗，还剩几颗？', options: ['1', '2', '3'], correctOptionIndex: 1, hint: '从 5 开始倒着数 3 个数。', explanation: '5 − 3 = 2，还剩 2 颗。' },
    { knowledgePointIds: ['number-composition-within-five'], prompt: '哪两个数合起来是 5？', options: ['1 和 3', '2 和 3', '3 和 3'], correctOptionIndex: 1, hint: '分别把每组选项中的两个数加起来。', explanation: '2 + 3 = 5，另外两组分别是 4 和 6。' },
    { knowledgePointIds: ['number-composition-within-five'], prompt: '4 可以分成下面哪两个数？', options: ['1 和 2', '1 和 3', '2 和 3'], correctOptionIndex: 1, hint: '检查每组两个数合起来是不是 4。', explanation: '1 + 3 = 4，所以 4 可以分成 1 和 3。' },
    { knowledgePointIds: ['number-composition-within-five', 'addition-within-five'], prompt: '0 + 几 = 5？', options: ['4', '5', '6'], correctOptionIndex: 1, hint: '0 表示没有再增加的数量。', explanation: '0 加上 5 还是 5，所以另一个数是 5。' },
    { knowledgePointIds: ['comparison-within-five'], prompt: '哪个数不大于 1？', options: ['0', '2', '3'], correctOptionIndex: 0, hint: '不大于 1，表示和 1 一样大或比 1 小。', explanation: '0 比 1 小，符合“不大于 1”。' },
    { knowledgePointIds: ['checking-within-five', 'addition-within-five'], prompt: '同学说 1 + 1 = 3。重新计算后，正确结果是多少？', options: ['1', '2', '3'], correctOptionIndex: 1, hint: '从 1 开始，再添 1 个。', explanation: '1 + 1 = 2，原来的说法多算了 1。' },
    { knowledgePointIds: ['number-composition-within-five'], prompt: '4 颗珠子分装在两个盒子里，一个盒子放 1 颗，另一个盒子放几颗？', options: ['2', '3', '4'], correctOptionIndex: 1, hint: '先从总数 4 颗中去掉已经放好的 1 颗。', explanation: '4 − 1 = 3，另一个盒子放 3 颗。' },
  ],
  advanced: [
    { knowledgePointIds: ['number-composition-within-five', 'addition-within-five'], prompt: '2 + □ = 5，方框里填几？', options: ['2', '3', '4'], correctOptionIndex: 1, hint: '想一想 2 再添几个才到 5。', explanation: '2 + 3 = 5，所以方框里填 3。' },
    { knowledgePointIds: ['number-composition-within-five', 'subtraction-within-five'], prompt: '5 − □ = 1，方框里填几？', options: ['3', '4', '5'], correctOptionIndex: 1, hint: '从 5 里去掉几个会剩下 1？', explanation: '5 − 4 = 1，所以方框里填 4。' },
    { knowledgePointIds: ['number-composition-within-five'], prompt: '4 可以写成哪一组两个数相加？', options: ['1 + 2', '1 + 3', '2 + 3'], correctOptionIndex: 1, hint: '逐个计算三个算式。', explanation: '1 + 3 = 4；另外两个算式的得数分别是 3 和 5。' },
    { knowledgePointIds: ['addition-within-five', 'comparison-within-five'], prompt: '哪一项中的两道算式得数都等于 4？', options: ['1 + 3 和 2 + 2', '1 + 2 和 2 + 2', '1 + 3 和 2 + 3'], correctOptionIndex: 0, hint: '分别算出每一项中两道算式的得数。', explanation: '1 + 3 = 4，2 + 2 = 4；另外两项至少有一道算式不等于 4。' },
    { knowledgePointIds: ['comparison-within-five', 'addition-within-five', 'subtraction-within-five'], prompt: '比较 5 − 1 和 2 + 1，哪个算式的得数大？', options: ['5 − 1', '2 + 1', '一样大'], correctOptionIndex: 0, hint: '先分别算出两个算式的得数，再比较。', explanation: '5 − 1 = 4，2 + 1 = 3，4 比 3 大。' },
    { knowledgePointIds: ['number-composition-within-five', 'addition-within-five'], prompt: '池塘边有 1 只小鸭，又游来 2 只。现在有几只小鸭？', options: ['2', '3', '4'], correctOptionIndex: 1, hint: '把原来的小鸭和后来游来的小鸭合起来。', explanation: '1 + 2 = 3，现在有 3 只小鸭。' },
    { knowledgePointIds: ['number-composition-within-five', 'addition-within-five', 'subtraction-within-five'], prompt: '小盒里有 2 个红球和 2 个蓝球。拿走 1 个蓝球后，盒里还剩几个球？', options: ['2', '3', '4'], correctOptionIndex: 1, hint: '先把红球和蓝球合起来，再去掉拿走的 1 个。', explanation: '原来有 2 + 2 = 4 个球，拿走 1 个后剩 3 个。' },
    { knowledgePointIds: ['number-composition-within-five', 'addition-within-five'], prompt: '图书角原有 2 本书，又收到 3 本。应列哪道算式？', options: ['2 + 3', '3 − 2', '2 + 2'], correctOptionIndex: 0, hint: '收到的新书和原来的书要合在一起。', explanation: '原有 2 本，又增加 3 本，用加法计算，列式 2 + 3。' },
    { knowledgePointIds: ['checking-within-five', 'subtraction-within-five', 'number-composition-within-five'], prompt: '用逆运算检查 4 − 2 = 2，哪道算式可以帮助核对？', options: ['2 + 2 = 4', '2 − 2 = 0', '4 + 2 = 6'], correctOptionIndex: 0, hint: '把差和减去的数合起来，看能不能回到原来的数。', explanation: '2 + 2 = 4，回到了被减数 4，所以 4 − 2 = 2 正确。' },
    { knowledgePointIds: ['number-composition-within-five', 'addition-within-five', 'comparison-within-five'], prompt: '4 支彩笔平均分成两组，哪道算式表示每组数量相同？', options: ['1 + 3', '2 + 2', '1 + 2'], correctOptionIndex: 1, hint: '两组要一样多，而且合起来还要是 4 支。', explanation: '2 + 2 表示两组各有 2 支，合起来是 4 支；另外两项不是两组同样多且总数为 4。' },
    { knowledgePointIds: ['comparison-within-five', 'addition-within-five', 'subtraction-within-five'], prompt: '比较 3 + 1 和 5 − 1，哪项说法正确？', options: ['3 + 1 的得数大', '5 − 1 的得数大', '两道算式得数一样'], correctOptionIndex: 2, hint: '分别计算，再比较两个得数。', explanation: '3 + 1 = 4，5 − 1 = 4，两道算式得数一样。' },
    { knowledgePointIds: ['number-composition-within-five', 'subtraction-within-five'], prompt: '5 个苹果分给小明和小红，小明拿到 3 个。小红拿到几个？', options: ['1', '2', '3'], correctOptionIndex: 1, hint: '从 5 个苹果里去掉小明拿到的 3 个。', explanation: '5 − 3 = 2，小红拿到 2 个。' },
    { knowledgePointIds: ['addition-within-five', 'subtraction-within-five', 'checking-within-five'], prompt: '哪组算式的得数相同？', options: ['4 − 1 和 1 + 1', '3 + 1 和 5 − 1', '2 + 1 和 5 − 3'], correctOptionIndex: 1, hint: '分别算出每组的两个得数。', explanation: '3 + 1 = 4，5 − 1 = 4；第一组的得数是 3 和 2，第三组的得数是 3 和 2。' },
    { knowledgePointIds: ['number-composition-within-five', 'addition-within-five'], prompt: '3 可以分成 1 和 2。下面哪道算式表示把这两个数合起来？', options: ['3 − 1', '1 + 2', '2 − 1'], correctOptionIndex: 1, hint: '合起来用加法，分开可以用减法。', explanation: '1 + 2 表示把 1 和 2 合起来，得数是 3。' },
    { knowledgePointIds: ['number-composition-within-five', 'addition-within-five', 'comparison-within-five'], prompt: '哪道算式表示把 2 和 3 合起来，结果正好是 5？', options: ['2 + 3 = 5', '2 + 2 = 5', '3 + 3 = 5'], correctOptionIndex: 0, hint: '检查等号两边的得数是否相同。', explanation: '2 + 3 = 5，另外两道算式的结果分别是 4 和 6。' },
  ],
  high: [
    { knowledgePointIds: ['number-composition-within-five', 'addition-within-five', 'subtraction-within-five'], prompt: '5 颗星星分成两堆，第一堆有 2 颗；从第二堆拿走 1 颗后，第二堆还剩几颗？', options: ['1', '2', '3'], correctOptionIndex: 1, hint: '先求第二堆原来有几颗，再去掉 1 颗。', explanation: '第二堆原有 5 − 2 = 3 颗，拿走 1 颗后还剩 2 颗。' },
    { knowledgePointIds: ['number-composition-within-five', 'addition-within-five'], prompt: '1 + □ = 4，□ + 1 = 4。两个方框应该填同一个数，填几？', options: ['2', '3', '4'], correctOptionIndex: 1, hint: '分别想一想，1 再添几个会变成 4。', explanation: '1 + 3 = 4；交换加数后 3 + 1 也等于 4。' },
    { knowledgePointIds: ['number-composition-within-five'], prompt: '哪一项表示把 5 分成两部分，而且两部分合起来仍是 5？', options: ['1 和 3', '2 和 3', '3 和 3'], correctOptionIndex: 1, hint: '把每项的两个数加起来检查。', explanation: '2 + 3 = 5，另外两项分别合成 4 和 6。' },
    { knowledgePointIds: ['addition-within-five', 'subtraction-within-five', 'checking-within-five'], prompt: '□ − 1 = 2 + 1，方框里应该填几？', options: ['3', '4', '5'], correctOptionIndex: 1, hint: '先算出右边的得数，再想什么数减去 1 会得到它。', explanation: '2 + 1 = 3，4 − 1 = 3，所以方框里填 4。' },
    { knowledgePointIds: ['number-composition-within-five', 'addition-within-five', 'subtraction-within-five'], prompt: '盒子里有 3 块积木，先放进 1 块，再拿出 2 块。现在有几块？', options: ['1', '2', '3'], correctOptionIndex: 1, hint: '按先放进、再拿出的顺序计算。', explanation: '先算 3 + 1 = 4，再算 4 − 2 = 2。' },
    { knowledgePointIds: ['comparison-within-five', 'addition-within-five', 'subtraction-within-five'], prompt: '小组甲算出 2 + 1，小组乙算出 5 − 2。哪项比较结果正确？', options: ['甲的得数大', '乙的得数大', '两个得数一样'], correctOptionIndex: 2, hint: '先算出甲、乙各自的得数。', explanation: '2 + 1 = 3，5 − 2 = 3，两个得数一样。' },
    { knowledgePointIds: ['number-composition-within-five', 'addition-within-five'], prompt: '“4 = 1 + 3”表示什么？', options: ['把 4 分成 1 和 3', '从 4 里拿走 3 后剩 4', '把 1 和 3 合起来是 5'], correctOptionIndex: 0, hint: '检查等号两边的数是否相等，并看加法表示什么关系。', explanation: '1 + 3 = 4，所以 4 可以分成 1 和 3。' },
    { knowledgePointIds: ['checking-within-five', 'addition-within-five', 'subtraction-within-five'], prompt: '要检查 2 + 1 = 3，哪种方法能核对加法结果？', options: ['用 3 − 1 看是否等于 2', '用 3 + 1 看是否等于 2', '把 2 改成 4 再计算'], correctOptionIndex: 0, hint: '用和减去一个加数，看看是否得到另一个加数。', explanation: '3 − 1 = 2，得到另一个加数，说明 2 + 1 = 3。' },
    { knowledgePointIds: ['number-composition-within-five', 'subtraction-within-five'], prompt: '5 颗棋子分成 3 颗和 2 颗两堆。从 3 颗的一堆拿走 1 颗，两堆一共剩几颗？', options: ['3', '4', '5'], correctOptionIndex: 1, hint: '原来共有 5 颗，只拿走了 1 颗。', explanation: '5 − 1 = 4，两堆合起来还剩 4 颗。' },
    { knowledgePointIds: ['number-composition-within-five', 'addition-within-five', 'checking-within-five'], prompt: '4 颗珠子分进红、蓝、黄三个盒子，红盒和蓝盒各放 1 颗。哪项既补出黄盒数量，又核对总数仍是 4？', options: ['黄盒放 2 颗，因为 1 + 1 + 2 = 4', '黄盒放 1 颗，因为 1 + 1 + 1 = 4', '黄盒放 3 颗，因为 1 + 1 + 3 = 4'], correctOptionIndex: 0, hint: '先用总数减去已放进红盒和蓝盒的珠子，再把三盒数量相加检查。', explanation: '红盒和蓝盒共放 2 颗，4 − 2 = 2，所以黄盒放 2 颗；1 + 1 + 2 = 4，核对正确。' },
    { knowledgePointIds: ['subtraction-within-five', 'addition-within-five', 'checking-within-five'], prompt: '同学说“5 − 2 = 4”。哪项既给出正确得数，也能用加法核对？', options: ['3，因为 3 + 2 = 5', '4，因为 4 + 2 = 5', '2，因为 2 + 2 = 4'], correctOptionIndex: 0, hint: '先重新计算，再把得数和减去的数合起来核对。', explanation: '5 − 2 = 3，3 + 2 = 5，得到原来的数；同学的得数 4 不正确。' },
    { knowledgePointIds: ['comparison-within-five', 'addition-within-five', 'subtraction-within-five'], prompt: '小红原来有 3 朵花，又收到 1 朵；小明有 5 朵，送给朋友 1 朵。现在谁的花多？', options: ['小红的花多', '小明的花多', '两人一样多'], correctOptionIndex: 2, hint: '先分别算出两人现在有几朵，再比较。', explanation: '小红有 3 + 1 = 4 朵，小明有 5 − 1 = 4 朵，两人一样多。' },
    { knowledgePointIds: ['addition-within-five', 'subtraction-within-five', 'checking-within-five'], prompt: '盒子里有 5 块积木，拿走 2 块，又放回 1 块。现在有几块？', options: ['3', '4', '5'], correctOptionIndex: 1, hint: '按先拿走、再放回的顺序计算。', explanation: '先算 5 − 2 = 3，再算 3 + 1 = 4。' },
    { knowledgePointIds: ['number-composition-within-five', 'addition-within-five'], prompt: '3 颗红珠和 2 颗蓝珠合在一起；如果拿走 2 颗蓝珠，还剩几颗红珠和蓝珠？', options: ['2', '3', '5'], correctOptionIndex: 1, hint: '先算合起来的数量，再减去拿走的珠子。', explanation: '3 + 2 = 5，5 − 2 = 3，还剩 3 颗。' },
    { knowledgePointIds: ['number-composition-within-five', 'subtraction-within-five', 'checking-within-five'], prompt: '4 颗棋子放进两个盒子，一个盒子有 3 颗。想知道另一个盒子有几颗，哪道算式合适？', options: ['4 + 3', '4 − 3', '3 − 4'], correctOptionIndex: 1, hint: '总数去掉已经知道的一部分，就能求另一部分。', explanation: '4 − 3 = 1，另一个盒子有 1 颗棋子。' },
    { knowledgePointIds: ['number-composition-within-five', 'addition-within-five', 'checking-within-five'], prompt: '小红有 1 张卡片，小明有 3 张卡片。两人的卡片合起来是 4 张吗？', options: ['是，因为 1 + 3 = 4', '不是，因为 1 + 3 = 3', '是，因为 1 + 3 = 5'], correctOptionIndex: 0, hint: '把两人的卡片数相加，再和 4 比较。', explanation: '1 + 3 = 4，所以两人的卡片合起来正好是 4 张。' },
  ],
};

export const grade1MathUnit03SupplementalActivities: Grade1MathUnit03SupplementalActivity[] =
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
