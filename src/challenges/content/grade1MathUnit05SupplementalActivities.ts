import type { ChoiceActivityDefinition, Difficulty } from '../../content/types';

export interface Grade1MathUnit05SupplementalActivity {
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

const sourceUnitId = 'grade-1/term-1/math/unit-05';
const idPrefix = 'challenge-supplement-grade-1-term-1-math-unit-05';

const drafts: Record<Difficulty, ActivityDraft[]> = {
  basic: [
    { knowledgePointIds: ['number-sequence-within-ten'], prompt: '从 6 开始往后数两次，会数到几？', options: ['7', '8', '9'], correctOptionIndex: 1, hint: '从 6 后面接着数：7 是第一次，后面再数一个。', explanation: '从 6 往后数两次是 7、8，所以会数到 8。' },
    { knowledgePointIds: ['number-sequence-within-ten'], prompt: '9 前面紧挨着的数是几？', options: ['8', '7', '10'], correctOptionIndex: 0, hint: '按顺序读一读：7、8、9、10。', explanation: '数的顺序中，8 紧挨在 9 前面。' },
    { knowledgePointIds: ['number-composition-within-ten'], prompt: '7 可以分成 5 和几？', options: ['3', '2', '1'], correctOptionIndex: 1, hint: '从 5 接着数到 7，还要数几个？', explanation: '5 和 2 合起来是 7，所以 7 可以分成 5 和 2。' },
    { knowledgePointIds: ['number-composition-within-ten'], prompt: '10 里面有几个十和几个一？', options: ['1 个十和 0 个一', '0 个十和 10 个一', '1 个十和 1 个一'], correctOptionIndex: 0, hint: '10 是一个完整的十，还剩几个单独的一？', explanation: '10 由 1 个十和 0 个一组成。' },
    { knowledgePointIds: ['addition-within-ten'], prompt: '4 颗红珠和 3 颗蓝珠合在一起，一共有几颗？', options: ['6', '7', '8'], correctOptionIndex: 1, hint: '把两种颜色的珠子数量合起来，用加法。', explanation: '4 + 3 = 7，一共有 7 颗珠子。' },
    { knowledgePointIds: ['addition-within-ten'], prompt: '计算：5 + 4 = ?', options: ['8', '9', '10'], correctOptionIndex: 1, hint: '从 5 开始接着数 4 个数。', explanation: '5 + 4 = 9。' },
    { knowledgePointIds: ['subtraction-within-ten'], prompt: '盘子里有 9 个橘子，拿走 5 个，还剩几个？', options: ['3', '4', '5'], correctOptionIndex: 1, hint: '从 9 里面去掉 5 个，用减法。', explanation: '9 - 5 = 4，还剩 4 个橘子。' },
    { knowledgePointIds: ['subtraction-within-ten'], prompt: '计算：7 - 2 = ?', options: ['4', '5', '6'], correctOptionIndex: 1, hint: '从 7 开始倒着数两个数。', explanation: '7 - 2 = 5。' },
    { knowledgePointIds: ['comparison-within-ten'], prompt: '6 和 8 比，哪个数大？', options: ['6', '8', '一样大'], correctOptionIndex: 1, hint: '沿着数的顺序往后，后面的数更大。', explanation: '8 排在 6 后面，所以 8 比 6 大。' },
    { knowledgePointIds: ['comparison-within-ten'], prompt: '哪个数比 7 大、又比 9 小？', options: ['6', '8', '10'], correctOptionIndex: 1, hint: '把 7、8、9 按顺序读一遍。', explanation: '8 在 7 和 9 之间，符合两个条件。' },
    { knowledgePointIds: ['checking-within-ten', 'addition-within-ten'], prompt: '小安算出 6 + 3 = 9。用减法检查时，哪道算式能回到 6？', options: ['9 - 3 = 6', '9 - 2 = 6', '6 - 3 = 9'], correctOptionIndex: 0, hint: '从和里减去一个加数，看看能不能回到另一个加数。', explanation: '9 - 3 = 6，能回到原来的一个加数，检查成立。' },
    { knowledgePointIds: ['number-composition-within-ten', 'addition-within-ten'], prompt: '把 3 和 5 合起来，得数是多少？', options: ['7', '8', '9'], correctOptionIndex: 1, hint: '合起来表示把两部分相加。', explanation: '3 + 5 = 8，所以 3 和 5 合起来是 8。' },
    { knowledgePointIds: ['subtraction-within-ten', 'comparison-within-ten'], prompt: '10 个积木拿走 4 个后，剩下的积木比 5 个多还是少？', options: ['多', '少', '一样多'], correctOptionIndex: 0, hint: '先算剩下几个，再和 5 比较。', explanation: '10 - 4 = 6，6 比 5 多。' },
    { knowledgePointIds: ['number-sequence-within-ten', 'checking-within-ten'], prompt: '数数时从 7 直接跳到 9。漏掉了哪个数？', options: ['6', '8', '10'], correctOptionIndex: 1, hint: '7 后面、9 前面还有一个数。', explanation: '完整的顺序是 7、8、9，所以漏掉了 8。' },
    { knowledgePointIds: ['number-composition-within-ten', 'subtraction-within-ten'], prompt: '10 个圆点里圈出 8 个，没圈的有几个？', options: ['1', '2', '3'], correctOptionIndex: 1, hint: '从总数 10 里面去掉圈出的 8 个。', explanation: '10 - 8 = 2，所以还有 2 个圆点没圈。' },
  ],
  advanced: [
    { knowledgePointIds: ['number-composition-within-ten', 'addition-within-ten'], prompt: '6 + □ = 9，方框里应填几？', options: ['2', '3', '4'], correctOptionIndex: 1, hint: '从 6 接着数到 9，数了几个数？', explanation: '6 + 3 = 9，所以方框里填 3。' },
    { knowledgePointIds: ['number-composition-within-ten', 'subtraction-within-ten'], prompt: '10 - □ = 6，方框里应填几？', options: ['3', '4', '5'], correctOptionIndex: 1, hint: '想一想 6 和几合起来是 10。', explanation: '6 + 4 = 10，所以 10 - 4 = 6，方框里填 4。' },
    { knowledgePointIds: ['number-sequence-within-ten', 'comparison-within-ten'], prompt: '把 9、6、8 从小到大排列，正确顺序是哪一项？', options: ['6、8、9', '9、8、6', '8、6、9'], correctOptionIndex: 0, hint: '比较它们在数数顺序中的位置。', explanation: '6 在最前，接着是 8，最后是 9。' },
    { knowledgePointIds: ['addition-within-ten', 'subtraction-within-ten', 'comparison-within-ten'], prompt: '6 + 2 和 9 - 1 的结果相比，哪项正确？', options: ['前一个结果大', '后一个结果大', '两个结果相等'], correctOptionIndex: 2, hint: '先分别算出两道算式的得数。', explanation: '6 + 2 = 8，9 - 1 = 8，两个结果相等。' },
    { knowledgePointIds: ['number-composition-within-ten', 'addition-within-ten'], prompt: '哪道算式表示把 4 和几合成 10？', options: ['4 + 6 = 10', '4 - 6 = 10', '10 + 4 = 6'], correctOptionIndex: 0, hint: '合成表示两部分合在一起。', explanation: '4 和 6 合起来是 10，算式是 4 + 6 = 10。' },
    { knowledgePointIds: ['number-composition-within-ten', 'subtraction-within-ten'], prompt: '8 个星星分成两组，一组有 5 个，另一组有几个？', options: ['2', '3', '4'], correctOptionIndex: 1, hint: '从总数 8 里去掉已知的一组 5 个。', explanation: '8 - 5 = 3，另一组有 3 个星星。' },
    { knowledgePointIds: ['addition-within-ten'], prompt: '小宁有 7 张卡片，小海有 2 张。把两人的卡片放在一起，下面哪道算式合适？', options: ['7 + 2 = 9', '7 - 2 = 5', '9 - 7 = 1'], correctOptionIndex: 0, hint: '放在一起后数量增加，要把两个数量合起来。', explanation: '两人的卡片合起来是 7 + 2 = 9 张。' },
    { knowledgePointIds: ['number-composition-within-ten', 'subtraction-within-ten'], prompt: '10 个气球里有 6 个黄色，其余是绿色。绿色气球有几个？', options: ['3', '4', '5'], correctOptionIndex: 1, hint: '用总数减去黄色气球的数量。', explanation: '10 - 6 = 4，绿色气球有 4 个。' },
    { knowledgePointIds: ['checking-within-ten', 'addition-within-ten'], prompt: '同伴说 6 + 4 = 9。哪项检查能发现这个结果不对？', options: ['把 9 - 4 算一算，结果是 5，不是 6', '把 6 - 4 算一算，结果是 2', '只看算式里有没有数字 9'], correctOptionIndex: 0, hint: '用和减去其中一个加数，应该得到另一个加数。', explanation: '如果和是 9，9 - 4 = 5，不能回到 6；正确的和应是 10。' },
    { knowledgePointIds: ['checking-within-ten', 'subtraction-within-ten', 'addition-within-ten'], prompt: '算式 9 - 4 = 5，哪道加法可以检查它？', options: ['5 + 4 = 9', '9 + 4 = 5', '5 + 3 = 9'], correctOptionIndex: 0, hint: '差加上减数，应该回到被减数。', explanation: '5 + 4 = 9，差加减数回到了 9，减法检查成立。' },
    { knowledgePointIds: ['number-composition-within-ten', 'addition-within-ten'], prompt: '小组要用 9 根小棒分成两份。下面哪一组数量符合要求？', options: ['4 根和 5 根', '3 根和 5 根', '6 根和 4 根'], correctOptionIndex: 0, hint: '分别把每一组的两个数合起来。', explanation: '4 + 5 = 9；另外两组分别合成 8 和 10。' },
    { knowledgePointIds: ['addition-within-ten', 'subtraction-within-ten', 'comparison-within-ten'], prompt: '8 - 3 和 4 + 1 的结果相比，哪项正确？', options: ['8 - 3 的结果大', '4 + 1 的结果大', '两个结果一样大'], correctOptionIndex: 2, hint: '先算减法和加法，再比较两个得数。', explanation: '8 - 3 = 5，4 + 1 = 5，两个结果一样大。' },
    { knowledgePointIds: ['number-sequence-within-ten', 'number-composition-within-ten'], prompt: '从 6 数到 10，数到 8 后还要数几个数才到 10？', options: ['1 个', '2 个', '3 个'], correctOptionIndex: 1, hint: '接着数：9、10。', explanation: '8 后面数 9、10，共数两个数。' },
    { knowledgePointIds: ['checking-within-ten', 'comparison-within-ten'], prompt: '同伴把 7、9、8 排成 7、9、8。怎样检查顺序是否从小到大？', options: ['逐个看后一个数是否比前一个数大', '看三个数写得是否一样长', '只比较第一个数和最后一个数'], correctOptionIndex: 0, hint: '从小到大排列时，每走一步数都要变大。', explanation: '7 后面应先是 8，再是 9；逐个比较相邻数能发现 9 和 8 的位置错了。' },
    { knowledgePointIds: ['checking-within-ten', 'subtraction-within-ten', 'addition-within-ten'], prompt: '同伴算 8 - 3 = 6。哪项能检查并改正这个结果？', options: ['5 + 3 = 8，所以差应是 5', '6 + 3 = 8，所以差是 6', '8 + 3 = 5，所以差应是 5'], correctOptionIndex: 0, hint: '差加上减数应等于被减数。', explanation: '5 + 3 = 8；6 + 3 = 9，所以 8 - 3 的正确结果是 5。' },
  ],
  high: [
    { knowledgePointIds: ['addition-within-ten', 'subtraction-within-ten'], prompt: '桌上有 10 个梨，先拿走 2 个，又放回 1 个。现在有几个？', options: ['8', '9', '10'], correctOptionIndex: 1, hint: '按发生的先后，先减去 2，再加上 1。', explanation: '10 - 2 = 8，放回 1 个后是 8 + 1 = 9。' },
    { knowledgePointIds: ['number-sequence-within-ten', 'checking-within-ten'], prompt: '小乐从 6 开始数：6、7、9、10。要把顺序补完整，应在 7 和 9 之间加上几？', options: ['8', '5', '10'], correctOptionIndex: 0, hint: '检查每两个相邻数之间是否差 1。', explanation: '6、7、8、9、10 才是连续的数序，所以应补上 8。' },
    { knowledgePointIds: ['subtraction-within-ten', 'comparison-within-ten'], prompt: '红盒有 8 个棋子，蓝盒有 5 个。红盒比蓝盒多几个？', options: ['2', '3', '4'], correctOptionIndex: 1, hint: '求相差多少，可以从较多的数量里去掉较少的数量。', explanation: '8 - 5 = 3，红盒比蓝盒多 3 个棋子。' },
    { knowledgePointIds: ['number-composition-within-ten', 'addition-within-ten', 'subtraction-within-ten'], prompt: '6 + □ 的结果要和 9 - 1 一样，方框里填几？', options: ['1', '2', '3'], correctOptionIndex: 1, hint: '先算右边，再想 6 加几能得到这个数。', explanation: '9 - 1 = 8，6 + 2 = 8，所以方框里填 2。' },
    { knowledgePointIds: ['number-composition-within-ten', 'addition-within-ten'], prompt: '7 颗珠子要分成两组，两组都不能是 0 颗。哪种分法符合要求？', options: ['1 颗和 6 颗', '0 颗和 7 颗', '3 颗和 5 颗'], correctOptionIndex: 0, hint: '两组都要有珠子，而且合起来正好是 7 颗。', explanation: '1 + 6 = 7，且两组都不是 0 颗。' },
    { knowledgePointIds: ['number-composition-within-ten', 'subtraction-within-ten'], prompt: '一共 10 张贴纸，已经送出 4 张。要知道还剩多少张，应把哪两个数相减？', options: ['10 - 4', '10 - 6', '4 - 10'], correctOptionIndex: 0, hint: '从总数中去掉已经送出的数量。', explanation: '总数是 10，送出 4 张，用 10 - 4 求剩下的数量。' },
    { knowledgePointIds: ['checking-within-ten', 'subtraction-within-ten', 'addition-within-ten'], prompt: '同伴把 10 - 6 算成 5。用加法检查并改正，正确答案是哪一个？', options: ['3', '4', '5'], correctOptionIndex: 1, hint: '减法结果加上 6，应该回到 10。', explanation: '4 + 6 = 10；5 + 6 = 11，所以正确答案是 4。' },
    { knowledgePointIds: ['checking-within-ten', 'subtraction-within-ten', 'addition-within-ten'], prompt: '9 - 3 = 6。哪道算式能说明这个减法算对了？', options: ['6 + 3 = 9', '9 + 3 = 6', '6 + 2 = 9'], correctOptionIndex: 0, hint: '把差和减数合起来，看是否回到原来的数。', explanation: '6 + 3 = 9，差加减数等于被减数，说明减法结果正确。' },
    { knowledgePointIds: ['addition-within-ten', 'subtraction-within-ten'], prompt: '花盆里有 4 朵花，又开了 3 朵，后来摘下 2 朵。现在有几朵？', options: ['5', '6', '7'], correctOptionIndex: 0, hint: '先把新开的花加上，再减去摘下的花。', explanation: '4 + 3 = 7，7 - 2 = 5，现在有 5 朵。' },
    { knowledgePointIds: ['number-sequence-within-ten', 'comparison-within-ten'], prompt: '一个数比 7 大，比 10 小，而且比 8 大。这个数是几？', options: ['8', '9', '10'], correctOptionIndex: 1, hint: '先找出 7 和 10 之间的数，再检查它是否大于 8。', explanation: '7 和 10 之间有 8、9；只有 9 比 8 大。' },
    { knowledgePointIds: ['number-composition-within-ten', 'addition-within-ten', 'checking-within-ten'], prompt: '9 可以分成 5 和 4。把其中一个部分加回另一个部分，哪道算式能检查这个组成？', options: ['5 + 4 = 9', '9 + 4 = 5', '5 - 4 = 9'], correctOptionIndex: 0, hint: '两个部分合起来，应回到原来的总数。', explanation: '5 + 4 = 9，两个部分相加回到了总数。' },
    { knowledgePointIds: ['number-sequence-within-ten', 'number-composition-within-ten', 'comparison-within-ten'], prompt: '把 6、8、10 按从小到大排列。中间的数比 6 多几？', options: ['1', '2', '3'], correctOptionIndex: 1, hint: '先排好顺序，再用中间数减去 6。', explanation: '顺序是 6、8、10；8 - 6 = 2，中间的数比 6 多 2。' },
    { knowledgePointIds: ['addition-within-ten', 'subtraction-within-ten', 'comparison-within-ten'], prompt: '两道算式 9 - 4 和 3 + 2 的得数各是多少？哪项比较正确？', options: ['9 - 4 的得数更大', '3 + 2 的得数更大', '两个得数相等'], correctOptionIndex: 2, hint: '先分别算出两个得数，再比较。', explanation: '9 - 4 = 5，3 + 2 = 5，两个得数相等。' },
    { knowledgePointIds: ['checking-within-ten', 'number-sequence-within-ten'], prompt: '同伴从 8 往后数时说“8、10”。哪项能指出问题并改正？', options: ['漏了 9，应数成 8、9、10', '漏了 7，应数成 7、8、10', '没有漏数，顺序正确'], correctOptionIndex: 0, hint: '从一个数往后数，每次增加 1。', explanation: '10 前面的数是 9，连续数数应为 8、9、10。' },
    { knowledgePointIds: ['number-composition-within-ten', 'addition-within-ten', 'subtraction-within-ten'], prompt: '有 7 个棋子，再添 3 个凑成 10 个，然后拿走 4 个。现在有几个？', options: ['5', '6', '7'], correctOptionIndex: 1, hint: '先把 7 和 3 合成 10，再从 10 里去掉 4。', explanation: '7 + 3 = 10，10 - 4 = 6，现在有 6 个棋子。' },
  ],
};

export const grade1MathUnit05SupplementalActivities: Grade1MathUnit05SupplementalActivity[] =
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
