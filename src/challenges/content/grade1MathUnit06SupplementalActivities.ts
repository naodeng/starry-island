import type { ChoiceActivityDefinition, Difficulty } from '../../content/types';

export interface Grade1MathUnit06SupplementalActivity {
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

const sourceUnitId = 'grade-1/term-1/math/unit-06';
const idPrefix = 'challenge-supplement-grade-1-term-1-math-unit-06';

const drafts: Record<Difficulty, ActivityDraft[]> = {
  basic: [
    { knowledgePointIds: ['teen-number-composition'], prompt: '1 个十和 1 个一合起来是多少？', options: ['11', '10', '12'], correctOptionIndex: 0, hint: '先看十位上的 1，再看个位上的 1。', explanation: '1 个十是 10，再加上 1 个一，合起来是 11。' },
    { knowledgePointIds: ['teen-number-composition'], prompt: '15 里面有几个十和几个一？', options: ['1 个十和 5 个一', '5 个十和 1 个一', '1 个十和 0 个一'], correctOptionIndex: 0, hint: '十位上的数表示几个十，个位上的数表示几个一。', explanation: '15 的十位是 1，个位是 5，所以有 1 个十和 5 个一。' },
    { knowledgePointIds: ['teen-number-composition'], prompt: '2 个十表示多少？', options: ['12', '20', '2'], correctOptionIndex: 1, hint: '一个十是 10，两个十就是两个 10。', explanation: '10 和 10 合起来是 20，所以 2 个十表示 20。' },
    { knowledgePointIds: ['teen-number-composition', 'number-sequence-eleven-to-twenty'], prompt: '从 10 开始接着数 8 个一，会数到哪个数？', options: ['17', '18', '19'], correctOptionIndex: 1, hint: '从 10 后面开始数：11 是第一个。', explanation: '从 10 后面数 8 个数，会数到 11、12、13、14、15、16、17、18。' },
    { knowledgePointIds: ['number-sequence-eleven-to-twenty'], prompt: '14 后面紧挨着的数是几？', options: ['13', '15', '16'], correctOptionIndex: 1, hint: '按顺序接着数：13、14、……', explanation: '14 后面紧挨着 15。' },
    { knowledgePointIds: ['number-sequence-eleven-to-twenty'], prompt: '20 前面紧挨着的数是几？', options: ['18', '19', '17'], correctOptionIndex: 1, hint: '从 18、19 再数到 20。', explanation: '19 后面是 20，所以 20 前面紧挨着 19。' },
    { knowledgePointIds: ['number-sequence-eleven-to-twenty'], prompt: '从 16 往前数一个数，会数到几？', options: ['15', '17', '14'], correctOptionIndex: 0, hint: '在数数顺序中，16 前面的数小 1。', explanation: '16 前面紧挨着 15。' },
    { knowledgePointIds: ['number-sequence-eleven-to-twenty', 'number-comparison-eleven-to-twenty'], prompt: '把 13、11、16 按从小到大排列，哪项正确？', options: ['11、13、16', '16、13、11', '13、11、16'], correctOptionIndex: 0, hint: '从 11 开始沿着数数顺序往后排。', explanation: '11 比 13 小，13 比 16 小，所以顺序是 11、13、16。' },
    { knowledgePointIds: ['number-comparison-eleven-to-twenty'], prompt: '12 和 18 比，哪个数大？', options: ['12', '18', '一样大'], correctOptionIndex: 1, hint: '从 12 接着数，看看什么时候数到 18。', explanation: '18 排在 12 后面，所以 18 比 12 大。' },
    { knowledgePointIds: ['number-comparison-eleven-to-twenty'], prompt: '17 和 17 比，哪项正确？', options: ['第一个数大', '第二个数大', '两个数一样大'], correctOptionIndex: 2, hint: '两个数的十位和个位都相同。', explanation: '两个数都是 17，所以它们一样大。' },
    { knowledgePointIds: ['number-comparison-eleven-to-twenty'], prompt: '11、15、19 这三个数中，哪个最小？', options: ['11', '15', '19'], correctOptionIndex: 0, hint: '比较十位相同的数，再看个位。', explanation: '这三个数的十位都是 1，个位 1 最小，所以 11 最小。' },
    { knowledgePointIds: ['number-sequence-eleven-to-twenty', 'number-comparison-eleven-to-twenty'], prompt: '比 15 大、又比 17 小的数是几？', options: ['14', '16', '18'], correctOptionIndex: 1, hint: '按顺序读一读 15、16、17。', explanation: '16 在 15 后面、17 前面，符合两个条件。' },
    { knowledgePointIds: ['teen-number-composition'], prompt: '十位是 1、个位是 2，这个数是几？', options: ['12', '11', '10'], correctOptionIndex: 0, hint: '十位的 1 表示 1 个十，个位的 2 表示 2 个一。', explanation: '1 个十和 2 个一合起来是 12。' },
    { knowledgePointIds: ['number-sequence-eleven-to-twenty', 'number-comparison-eleven-to-twenty'], prompt: '从 18 后面接着数 2 个数，第二个数是几？', options: ['19', '20', '17'], correctOptionIndex: 1, hint: '先数 19，再数下一个。', explanation: '18 后面第一个数是 19，第二个数是 20。' },
    { knowledgePointIds: ['teen-number-composition'], prompt: '17 的十位上的 1 表示几个十？', options: ['1 个十', '1 个一', '7 个十'], correctOptionIndex: 0, hint: '十位上的数字表示几个十。', explanation: '17 的十位是 1，表示 1 个十。' },
    { knowledgePointIds: ['number-sequence-eleven-to-twenty'], prompt: '16 前面紧挨着的数是几？', options: ['15', '17', '14'], correctOptionIndex: 0, hint: '按数数顺序从 14 往后读。', explanation: '14、15、16 连着数，16 前面紧挨着 15。' },
    { knowledgePointIds: ['number-comparison-eleven-to-twenty'], prompt: '11、13、18 这三个数中，哪个最大？', options: ['11', '13', '18'], correctOptionIndex: 2, hint: '按顺序比较这三个数。', explanation: '18 排在 11 和 13 后面，所以 18 最大。' },
    { knowledgePointIds: ['number-sequence-eleven-to-twenty', 'number-comparison-eleven-to-twenty'], prompt: '12 和 14 中间紧挨着的数是几？', options: ['11', '13', '15'], correctOptionIndex: 1, hint: '从 12 往后数一个数，再看看是不是还在 14 前面。', explanation: '12 后面紧挨着 13，13 也在 14 前面。' },
  ],
  advanced: [
    { knowledgePointIds: ['teen-number-composition'], prompt: '一个数由 1 个十和 7 个一组成，它是几？', options: ['17', '16', '18'], correctOptionIndex: 0, hint: '把 10 和 7 个一合起来写成两位数。', explanation: '1 个十是 10，7 个一是 7，合起来是 17。' },
    { knowledgePointIds: ['teen-number-composition'], prompt: '18 的个位上有几个一？', options: ['1 个', '8 个', '18 个'], correctOptionIndex: 1, hint: '看一看 18 的个位数字。', explanation: '18 的个位数字是 8，所以个位上有 8 个一。' },
    { knowledgePointIds: ['number-sequence-eleven-to-twenty'], prompt: '从 13 到 16 中间缺了哪两个数？', options: ['14 和 15', '12 和 14', '15 和 17'], correctOptionIndex: 0, hint: '按顺序补上 13 后面的两个数。', explanation: '13、14、15、16 是连续的数，所以缺少 14 和 15。' },
    { knowledgePointIds: ['number-sequence-eleven-to-twenty', 'number-comparison-eleven-to-twenty'], prompt: '把 15、11、18 从小到大排列，哪项正确？', options: ['11、15、18', '18、15、11', '15、11、18'], correctOptionIndex: 0, hint: '先找最小的，再找中间的，最后找最大的。', explanation: '11 最小，接着是 15，18 最大，顺序是 11、15、18。' },
    { knowledgePointIds: ['number-sequence-eleven-to-twenty'], prompt: '13、14、□、16，方框里应填几？', options: ['12', '15', '17'], correctOptionIndex: 1, hint: '每次按顺序增加一个数。', explanation: '14 后面是 15，15 后面是 16，所以方框里填 15。' },
    { knowledgePointIds: ['number-comparison-eleven-to-twenty'], prompt: '12、14、16 中，哪个数比 12 大、又比 16 小？', options: ['12', '14', '16'], correctOptionIndex: 1, hint: '检查每个数是否同时满足两个大小条件。', explanation: '14 比 12 大，也比 16 小。' },
    { knowledgePointIds: ['number-comparison-eleven-to-twenty'], prompt: '下面哪个数比 18 小？', options: ['19', '20', '16'], correctOptionIndex: 2, hint: '沿着数数顺序，18 前面的数比较小。', explanation: '16 排在 18 前面，所以 16 比 18 小。' },
    { knowledgePointIds: ['teen-number-composition', 'number-sequence-eleven-to-twenty'], prompt: '把 1 个十和 4 个一写成一个数，应该怎样写？', options: ['14', '15', '5'], correctOptionIndex: 0, hint: '十位写 1，个位写 4。', explanation: '1 个十和 4 个一合起来是 14。' },
    { knowledgePointIds: ['number-comparison-eleven-to-twenty'], prompt: '15、18、12 中，哪个数最大？', options: ['12', '15', '18'], correctOptionIndex: 2, hint: '这三个数的十位相同，比较个位。', explanation: '18 的个位 8 最大，所以 18 最大。' },
    { knowledgePointIds: ['number-sequence-eleven-to-twenty'], prompt: '从 14 开始往后数 3 个数，最后数到几？', options: ['16', '17', '18'], correctOptionIndex: 1, hint: '依次数出 14 后面的三个数。', explanation: '14 后面依次是 15、16、17，第三个数是 17。' },
    { knowledgePointIds: ['teen-number-composition'], prompt: '数 16 中，十位上的 1 表示什么？', options: ['1 个一', '1 个十', '10 个十'], correctOptionIndex: 1, hint: '同一个数字在十位和个位上表示的数不一样。', explanation: '16 的十位是 1，表示 1 个十。' },
    { knowledgePointIds: ['number-sequence-eleven-to-twenty', 'number-comparison-eleven-to-twenty'], prompt: '把 20、11、18 从大到小排列，哪项正确？', options: ['20、18、11', '11、18、20', '18、20、11'], correctOptionIndex: 0, hint: '从数数顺序的后面往前排。', explanation: '20 最大，18 在中间，11 最小，所以从大到小是 20、18、11。' },
    { knowledgePointIds: ['number-comparison-eleven-to-twenty'], prompt: '哪个数是大于 15 的最小数？', options: ['15', '16', '17'], correctOptionIndex: 1, hint: '找到 15 后面紧挨着的数。', explanation: '比 15 大的最小数是紧挨着它的 16。' },
    { knowledgePointIds: ['teen-number-composition', 'number-comparison-eleven-to-twenty'], prompt: '十位是 1 的数中，哪个数比 17 大？', options: ['16', '18', '17'], correctOptionIndex: 1, hint: '先看十位，再比较个位是否大于 7。', explanation: '18 的十位是 1，个位 8 比 7 大，所以 18 比 17 大。' },
    { knowledgePointIds: ['teen-number-composition', 'number-comparison-eleven-to-twenty'], prompt: '1 个十和 9 个一组成的数，比 18 大几？', options: ['1', '2', '3'], correctOptionIndex: 0, hint: '先合成这个数，再比较它和 18。', explanation: '1 个十和 9 个一组成 19；19 比 18 大 1。' },
    { knowledgePointIds: ['number-sequence-eleven-to-twenty'], prompt: '□、16、17 按从小到大排列，方框里应填几？', options: ['15', '18', '19'], correctOptionIndex: 0, hint: '方框里的数要紧挨着 16，并排在它前面。', explanation: '15 后面是 16，16 后面是 17，所以方框里填 15。' },
  ],
  high: [
    { knowledgePointIds: ['teen-number-composition', 'number-comparison-eleven-to-twenty'], prompt: '一个数比 14 大、比 17 小，个位是 6。这个数是几？', options: ['15', '16', '17'], correctOptionIndex: 1, hint: '从 14 后面开始数，找出个位是 6 的数。', explanation: '14 和 17 之间有 15、16；个位是 6 的是 16。' },
    { knowledgePointIds: ['number-sequence-eleven-to-twenty'], prompt: '小明把数字卡从大到小写成 20、19、18、16、15。哪项找出了漏掉的数，并补成每次少 1 的完整顺序？', options: ['漏了 17；20、19、18、17、16、15', '漏了 16；20、19、18、16、15', '漏了 17；20、19、17、18、16、15'], correctOptionIndex: 0, hint: '逐个比较相邻数字，看每一步是否都少 1。', explanation: '18 后面应是 17，再到 16、15；原顺序漏了 17。' },
    { knowledgePointIds: ['teen-number-composition', 'number-comparison-eleven-to-twenty'], prompt: '18 有 1 个十和 8 个一，再添上 2 个一是几？', options: ['18', '19', '20'], correctOptionIndex: 2, hint: '从 18 接着往后数两个数。', explanation: '18 后面接着数两个数是 19、20，所以再添上 2 个一是 20。' },
    { knowledgePointIds: ['number-comparison-eleven-to-twenty', 'teen-number-composition'], prompt: '小禾说“18 比 16 小，因为 8 比 6 大”。哪项指出了她比较方法里的错误？', options: ['十位相同，再比较个位；8 比 6 大，所以 18 比 16 大', '个位数越大，整个数就越小，所以小禾说得对', '只看十位，18 和 16 一样大'], correctOptionIndex: 0, hint: '两个数的十位都是 1，再比较个位上的数字。', explanation: '18 和 16 的十位相同；个位 8 大于 6，因此 18 大于 16。小禾把比较结果说反了。' },
    { knowledgePointIds: ['teen-number-composition'], prompt: '小安把 1 个十和 4 个一写成了 5。应该怎样改正？', options: ['写成 14', '写成 15', '写成 10'], correctOptionIndex: 0, hint: '十位的 1 要表示 1 个十，不是 1 个一。', explanation: '1 个十是 10，再加 4 个一是 14，所以应写成 14。' },
    { knowledgePointIds: ['teen-number-composition', 'number-comparison-eleven-to-twenty'], prompt: '13、18、15 中，哪个数和“比 19 小 1”的数一样？', options: ['13', '18', '15'], correctOptionIndex: 1, hint: '先找到比 19 小 1 的数，再在三个数里找它。', explanation: '比 19 小 1 的数是 18，所以应选 18。' },
    { knowledgePointIds: ['number-sequence-eleven-to-twenty'], prompt: '14、15、□、17，方框里填几才能让数顺着排列？', options: ['13', '16', '18'], correctOptionIndex: 1, hint: '每个数后面紧挨着的数都大 1。', explanation: '15 后面紧挨着 16，16 后面是 17。' },
    { knowledgePointIds: ['teen-number-composition', 'number-comparison-eleven-to-twenty'], prompt: '十位是 1，个位比 6 多 2，这个数是几？', options: ['17', '18', '19'], correctOptionIndex: 1, hint: '先想 6 再添 2 个一是多少，再和 1 个十合起来。', explanation: '6 个一再添 2 个一是 8 个一，和 1 个十合起来是 18。' },
    { knowledgePointIds: ['number-sequence-eleven-to-twenty', 'number-comparison-eleven-to-twenty'], prompt: '18、17、□、15，按从大到小的顺序排列，方框里填几？', options: ['14', '16', '19'], correctOptionIndex: 1, hint: '每往后一个数都小 1。', explanation: '18、17 后面应是 16，再后面是 15。' },
    { knowledgePointIds: ['number-comparison-eleven-to-twenty'], prompt: '下面三句话中，哪一句不正确？', options: ['14 比 15 小', '18 比 16 大', '17 比 19 大'], correctOptionIndex: 2, hint: '把每句话里的两个数按数数顺序比较。', explanation: '17 排在 19 前面，所以 17 比 19 小，不是大。' },
    { knowledgePointIds: ['teen-number-composition'], prompt: '小禾说 1 个十和 3 个一合起来是 4。哪项能说明她少看了什么？', options: ['还要把 1 个十记作 10，合起来是 13', '个位上的 3 表示 1 个十', '十位上的 1 表示 1 个一'], correctOptionIndex: 0, hint: '注意十位上的 1 表示的不是 1 个一。', explanation: '十位上的 1 表示 1 个十，也就是 10；10 和 3 合起来是 13。' },
    { knowledgePointIds: ['number-sequence-eleven-to-twenty', 'number-comparison-eleven-to-twenty'], prompt: '小组要把 11、15、12、14、13 从小到大排好，再找排在第 4 张的数字卡。应选哪张？', options: ['13', '14', '15'], correctOptionIndex: 1, hint: '先把五个数按顺序排好，再从最小的数开始数到第 4 张。', explanation: '从小到大是 11、12、13、14、15；第 4 张是 14。' },
    { knowledgePointIds: ['teen-number-composition', 'number-sequence-eleven-to-twenty', 'number-comparison-eleven-to-twenty'], prompt: '一个数有 1 个十，个位比 9 少 1；它比 17 大。这个数是几？', options: ['17', '18', '19'], correctOptionIndex: 1, hint: '先求个位，再把十位和个位合成一个数。', explanation: '比 9 少 1 的数是 8，1 个十和 8 个一合成 18，且 18 比 17 大。' },
    { knowledgePointIds: ['teen-number-composition', 'number-comparison-eleven-to-twenty'], prompt: '1 个十和 9 个一组成的数，比 18 大还是小？', options: ['19，比 18 大', '17，比 18 小', '18，和 18 一样大'], correctOptionIndex: 0, hint: '先把 1 个十和 9 个一合起来，再和 18 比一比。', explanation: '1 个十和 9 个一合起来是 19；19 比 18 大。' },
    { knowledgePointIds: ['number-sequence-eleven-to-twenty', 'number-comparison-eleven-to-twenty'], prompt: '老师把 11～20 的数卡分成“不大于 15”和“大于 15”两组，并要求每组从小到大排列。哪种分法和顺序都正确？', options: ['11、12、13、14、15；16、17、18、19、20', '11、12、13、14；15、16、17、18、19、20', '11、12、13、14、15、16；17、18、19、20'], correctOptionIndex: 0, hint: '先判断 15 属于哪一组，再检查每组内部的数序。', explanation: '不大于 15 的一组要包含 15；大于 15 的一组从 16 开始，两组都按从小到大排列。' },
    { knowledgePointIds: ['teen-number-composition', 'number-comparison-eleven-to-twenty'], prompt: '1 个十和 6 个一组成的数与 17 比，哪个数大？', options: ['16 大', '17 大', '两个数一样大'], correctOptionIndex: 1, hint: '先把 1 个十和 6 个一合起来，再和 17 比较。', explanation: '1 个十和 6 个一组成 16；17 比 16 大。' },
    { knowledgePointIds: ['number-sequence-eleven-to-twenty', 'number-comparison-eleven-to-twenty'], prompt: '15 和 19 之间有几个数？', options: ['2 个', '3 个', '4 个'], correctOptionIndex: 1, hint: '依次数出 15 后面、19 前面的数。', explanation: '15 和 19 之间是 16、17、18，一共有 3 个数。' },
    { knowledgePointIds: ['teen-number-composition', 'number-sequence-eleven-to-twenty'], prompt: '18 由 1 个十和 8 个一组成，再添 1 个一后是多少？', options: ['17', '19', '20'], correctOptionIndex: 1, hint: '从 18 接着往后数一个数。', explanation: '18 后面紧挨着 19，所以再添 1 个一后是 19。' },
  ],
};

export const grade1MathUnit06SupplementalActivities: Grade1MathUnit06SupplementalActivity[] =
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
