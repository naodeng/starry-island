import type { ChoiceActivityDefinition, Difficulty } from '../../content/types';

interface ActivityDraft {
  knowledgePointIds: string[];
  prompt: string;
  answer: string;
  distractors: [string, string];
  hint: string;
  explanation: string;
}

export interface Grade1Term2MathUnit05SupplementalActivity {
  difficulty: Difficulty;
  sourceUnitId: string;
  knowledgePointIds: string[];
  activity: ChoiceActivityDefinition;
}

const sourceUnitId = 'grade-1/term-2/math/unit-05';
const idPrefix = 'challenge-supplement-grade-1-term-2-math-unit-05';
const denominations = ['currency-denominations'];
const conversion = ['yuan-jiao-fen-conversion'];
const composition = ['money-composition-and-comparison'];
const operation = ['money-addition-and-change'];
const conversionAndComposition = [...conversion, ...composition];

const drafts: Record<Difficulty, ActivityDraft[]> = {
  basic: [
    { knowledgePointIds: conversion, prompt: '3 元可以换成多少角？', answer: '30 角', distractors: ['3 角', '300 角'], hint: '1 元可以换成 10 角。', explanation: '3 元是 3 个 10 角，合起来是 30 角。' },
    { knowledgePointIds: conversion, prompt: '把 6 角都换成 1 分，能得到多少分？', answer: '60 分', distractors: ['6 分', '600 分'], hint: '1 角等于 10 分。', explanation: '6 个 10 分是 60 分。' },
    { knowledgePointIds: conversion, prompt: '40 分正好可以换成几角？', answer: '4 角', distractors: ['40 角', '4 元'], hint: '每 10 分可以换 1 角。', explanation: '40 分里有 4 个 10 分，等于 4 角。' },
    { knowledgePointIds: denominations, prompt: '1 元能换几个 1 角？', answer: '10 个', distractors: ['1 个', '100 个'], hint: '1 元等于 10 角。', explanation: '每个是 1 角，10 个 1 角合起来是 1 元。' },
    { knowledgePointIds: composition, prompt: '2 角和 3 角合起来是多少？', answer: '5 角', distractors: ['5 分', '1 元'], hint: '两份钱的单位相同，可以把角数合起来。', explanation: '2 角加 3 角是 5 角。' },
    { knowledgePointIds: conversionAndComposition, prompt: '12 角可以写成几元几角？', answer: '1 元 2 角', distractors: ['12 元', '2 元 1 角'], hint: '先从 12 角里找出 10 角。', explanation: '10 角是 1 元，剩下 2 角，所以是 1 元 2 角。' },
    { knowledgePointIds: conversionAndComposition, prompt: '两张 5 角合起来，金额是多少？', answer: '1 元', distractors: ['5 元', '10 元'], hint: '5 角加 5 角是 10 角。', explanation: '10 角就是 1 元。' },
    { knowledgePointIds: composition, prompt: '比 1 元少 2 角的是多少钱？', answer: '8 角', distractors: ['2 角', '12 角'], hint: '1 元等于 10 角。', explanation: '10 角少 2 角是 8 角。' },
    { knowledgePointIds: conversionAndComposition, prompt: '下面哪句话表示的金额都一样？', answer: '1 元、10 角和 100 分', distractors: ['1 元、10 角和 10 分', '1 元、1 角和 100 分'], hint: '回想元、角、分之间各能换成多少。', explanation: '1 元等于 10 角，也等于 100 分。' },
    { knowledgePointIds: denominations, prompt: '两个 5 角硬币正好换成哪种金额？', answer: '1 元', distractors: ['2 元', '5 元'], hint: '把两个 5 角合起来。', explanation: '5 角加 5 角是 10 角，也就是 1 元。' },
    { knowledgePointIds: conversion, prompt: '80 分与几角相等？', answer: '8 角', distractors: ['80 角', '8 元'], hint: '10 分是 1 角。', explanation: '80 分里有 8 个 10 分，所以等于 8 角。' },
    { knowledgePointIds: composition, prompt: '5 角再加 2 角，一共是多少？', answer: '7 角', distractors: ['7 分', '1 元 2 角'], hint: '单位相同，把两个角数相加。', explanation: '5 角加 2 角是 7 角。' },
    { knowledgePointIds: composition, prompt: '9 角和 1 元相比，哪一个金额更多？', answer: '1 元', distractors: ['9 角', '一样多'], hint: '把 1 元换成角再比较。', explanation: '1 元是 10 角，比 9 角多 1 角。' },
    { knowledgePointIds: conversionAndComposition, prompt: '1 元 2 角一共是多少角？', answer: '12 角', distractors: ['3 角', '120 角'], hint: '先把 1 元换成 10 角，再加上 2 角。', explanation: '10 角加 2 角是 12 角。' },
    { knowledgePointIds: conversion, prompt: '把 1 元换成角，应该得到多少角？', answer: '10 角', distractors: ['1 角', '100 角'], hint: '想想 10 个 1 角合起来是多少。', explanation: '1 元等于 10 角。' },
    { knowledgePointIds: conversion, prompt: '如果有 3 张 1 元，全部换成角后有几角？', answer: '30 角', distractors: ['3 角', '300 角'], hint: '每张 1 元可以换成 10 角。', explanation: '3 张 1 元是 3 个 10 角，合起来是 30 角。' },
    { knowledgePointIds: conversion, prompt: '1 角能换成多少分？', answer: '10 分', distractors: ['1 分', '100 分'], hint: '角和分之间也可以用 10 个来换。', explanation: '1 角等于 10 分。' },
    { knowledgePointIds: operation, prompt: '一支铅笔 6 角，付 10 角，应该找回多少？', answer: '4 角', distractors: ['6 角', '16 角'], hint: '用付出的钱减去铅笔的价钱。', explanation: '10 角减 6 角是 4 角。' },
    { knowledgePointIds: conversionAndComposition, prompt: '4 角和 6 角合起来正好是多少？', answer: '1 元', distractors: ['10 元', '1 角'], hint: '先算出一共多少角。', explanation: '4 角加 6 角是 10 角，10 角就是 1 元。' },
    { knowledgePointIds: conversion, prompt: '1 元可以换成多少分？', answer: '100 分', distractors: ['10 分', '1000 分'], hint: '1 元有 10 角，每角有 10 分。', explanation: '10 个 10 分合起来是 100 分。' },
  ],
  advanced: [
    { knowledgePointIds: composition, prompt: '1 元 4 角和 13 角相比，哪一个金额更大？', answer: '1 元 4 角', distractors: ['13 角', '两者一样多'], hint: '把 1 元 4 角换成角再比较。', explanation: '1 元 4 角是 14 角，比 13 角多 1 角。' },
    { knowledgePointIds: conversionAndComposition, prompt: '8 角加上 70 分，一共是多少角？', answer: '15 角', distractors: ['78 角', '8 角 70 分'], hint: '先把 70 分换成角。', explanation: '70 分是 7 角，8 角加 7 角是 15 角。' },
    { knowledgePointIds: operation, prompt: '两样文具分别要 7 角和 6 角，付 20 角后应找回多少？', answer: '7 角', distractors: ['13 角', '9 角'], hint: '先算两样文具一共多少钱，再用付款金额减去总价。', explanation: '总价是 13 角，20 角减 13 角是 7 角。' },
    { knowledgePointIds: composition, prompt: '比较 9 角和 1 元，应该选择哪句话？', answer: '1 元比 9 角多 1 角', distractors: ['9 角比 1 元多 1 角', '两者正好一样多'], hint: '把 1 元换算成 10 角。', explanation: '10 角比 9 角多 1 角，所以 1 元更多。' },
    { knowledgePointIds: operation, prompt: '一本本子 6 角，一支笔 8 角，买下它们要准备多少角？', answer: '14 角', distractors: ['2 角', '68 角'], hint: '两件物品都用角作单位，直接相加。', explanation: '6 角加 8 角是 14 角，也就是 1 元 4 角。' },
    { knowledgePointIds: conversionAndComposition, prompt: '手里有 1 元和 3 角，合起来是多少角？', answer: '13 角', distractors: ['4 角', '103 角'], hint: '先把 1 元换成 10 角。', explanation: '10 角加 3 角是 13 角。' },
    { knowledgePointIds: conversionAndComposition, prompt: '16 角用“元和角”表示，应该怎样写？', answer: '1 元 6 角', distractors: ['16 元', '6 元 1 角'], hint: '10 角换成 1 元后，还剩几角？', explanation: '16 角里有 10 角和 6 角，所以是 1 元 6 角。' },
    { knowledgePointIds: operation, prompt: '有 2 元，买东西用了 11 角，还剩多少钱？', answer: '9 角', distractors: ['11 角', '31 角'], hint: '先把 2 元换成角，再减去用掉的钱。', explanation: '2 元是 20 角，20 角减 11 角还剩 9 角。' },
    { knowledgePointIds: composition, prompt: '哪一种写法表示 15 角？', answer: '1 元 5 角', distractors: ['1 元 5 分', '15 元'], hint: '10 角可以换成 1 元。', explanation: '15 角由 10 角和 5 角组成，也就是 1 元 5 角。' },
    { knowledgePointIds: operation, prompt: '有 1 元 2 角，买一本 7 角的本子后还剩多少？', answer: '5 角', distractors: ['7 角', '19 角'], hint: '先把 1 元 2 角写成 12 角。', explanation: '12 角减 7 角是 5 角。' },
    { knowledgePointIds: composition, prompt: '1 元 4 角比 1 元 3 角多多少？', answer: '1 角', distractors: ['7 角', '1 元'], hint: '两笔金额都有 1 元，先比较剩下的角。', explanation: '4 角比 3 角多 1 角，所以总金额多 1 角。' },
    { knowledgePointIds: conversionAndComposition, prompt: '50 分再加 3 角，一共是多少角？', answer: '8 角', distractors: ['53 角', '3 角 50 分'], hint: '50 分可以换成几角？', explanation: '50 分是 5 角，5 角加 3 角是 8 角。' },
    { knowledgePointIds: operation, prompt: '三件小物品分别是 5 角、7 角和 6 角，一共需要多少角？', answer: '18 角', distractors: ['18 分', '12 角'], hint: '按顺序把三个价钱相加。', explanation: '5 角加 7 角再加 6 角是 18 角。' },
    { knowledgePointIds: [...denominations, ...conversionAndComposition], prompt: '两枚 5 角硬币能换成多少元？', answer: '1 元', distractors: ['5 元', '10 元'], hint: '先把两枚硬币合成角，再换成元。', explanation: '两枚 5 角一共 10 角，等于 1 元。' },
    { knowledgePointIds: conversionAndComposition, prompt: '90 分比 1 元少多少分？', answer: '10 分', distractors: ['1 分', '10 角'], hint: '先把 1 元换成分。', explanation: '1 元是 100 分，100 分减 90 分是 10 分。' },
    { knowledgePointIds: conversionAndComposition, prompt: '17 角换成元和角，结果是什么？', answer: '1 元 7 角', distractors: ['17 元', '7 元 1 角'], hint: '从 17 角中换出 10 角。', explanation: '10 角是 1 元，剩下 7 角，所以是 1 元 7 角。' },
    { knowledgePointIds: operation, prompt: '买一盒彩笔要 16 角，付 20 角，应找回几角？', answer: '4 角', distractors: ['16 角', '6 角'], hint: '用付款的钱减去彩笔的价钱。', explanation: '20 角减 16 角是 4 角。' },
    { knowledgePointIds: conversionAndComposition, prompt: '1 元和 3 角合起来，比 12 角多多少？', answer: '1 角', distractors: ['3 角', '13 角'], hint: '先把 1 元和 3 角合成角，再比较。', explanation: '1 元和 3 角是 13 角，13 角比 12 角多 1 角。' },
    { knowledgePointIds: operation, prompt: '4 角、4 角和 5 角这三份钱合起来是多少？', answer: '13 角', distractors: ['9 角', '45 角'], hint: '把三份角数依次相加。', explanation: '4 加 4 再加 5 等于 13，所以一共 13 角。' },
    { knowledgePointIds: operation, prompt: '8 角还差多少钱才到 1 元？', answer: '2 角', distractors: ['8 角', '18 角'], hint: '1 元等于 10 角。', explanation: '10 角减 8 角是 2 角。' },
    { knowledgePointIds: operation, prompt: '两件东西分别是 12 角和 7 角，付 2 元后找回多少？', answer: '1 角', distractors: ['19 角', '3 角'], hint: '先算总价，再把 2 元换成角来减。', explanation: '总价是 19 角，2 元是 20 角，找回 1 角。' },
    { knowledgePointIds: conversionAndComposition, prompt: '1 元和 5 角合起来是多少角？', answer: '15 角', distractors: ['6 角', '105 角'], hint: '把 1 元先换成 10 角。', explanation: '10 角加 5 角是 15 角。' },
    { knowledgePointIds: operation, prompt: '买三样东西分别花 3 角、8 角和 4 角，一共花了多少？', answer: '15 角', distractors: ['15 分', '5 角'], hint: '这三样东西的价钱单位都是角。', explanation: '3 角加 8 角再加 4 角是 15 角。' },
    { knowledgePointIds: operation, prompt: '两件东西分别要 8 角和 5 角，付 2 元后说找回 7 角。怎样核对这张小票？', answer: '8 角 + 5 角 + 7 角 = 20 角', distractors: ['8 角 + 5 角 = 7 角', '2 元等于 2 角，所以记录不对'], hint: '商品总价和找零合起来，应等于付出的钱。', explanation: '商品总价是 13 角，找回 7 角，合起来是 20 角，也就是 2 元。' },
  ],
  high: [
    { knowledgePointIds: conversion, prompt: '小林说“1 元等于 10 分”。怎样改正这句话？', answer: '1 元等于 100 分', distractors: ['1 元等于 10 分，所以不用改', '1 元等于 1000 分'], hint: '先把 1 元换成角，再把角换成分。', explanation: '1 元等于 10 角，每角等于 10 分，所以 1 元等于 100 分。' },
    { knowledgePointIds: conversionAndComposition, prompt: '下面哪组说法把同一笔钱表示正确了？', answer: '1 元 = 10 角 = 100 分', distractors: ['1 元 = 10 角 = 10 分', '1 元 = 100 角 = 10 分'], hint: '分别核对元到角、角到分的换算。', explanation: '1 元等于 10 角，10 角也等于 100 分。' },
    { knowledgePointIds: denominations, prompt: '要用 3 枚钱正好凑出 16 角，可以选哪一组？', answer: '1 元、5 角和 1 角', distractors: ['1 元、5 角和 5 角', '5 角、5 角和 5 角'], hint: '把 1 元先看作 10 角，再把三枚钱合起来。', explanation: '1 元是 10 角，10 加 5 再加 1 正好是 16 角。' },
    { knowledgePointIds: conversionAndComposition, prompt: '比较 1 元 5 角和 150 分，下面判断正确的是？', answer: '两笔钱一样多', distractors: ['1 元 5 角更多', '150 分更多'], hint: '把两笔钱都换算成角。', explanation: '1 元 5 角是 15 角，150 分也是 15 角。' },
    { knowledgePointIds: operation, prompt: '收银记录写着：商品 12 角，付 20 角，找零 9 角。应该怎样改？', answer: '找零应为 8 角', distractors: ['找零应为 12 角', '原记录正确'], hint: '用付款金额减去商品价重新计算。', explanation: '20 角减 12 角是 8 角，原记录多找了 1 角。' },
    { knowledgePointIds: operation, prompt: '买两件东西，一件 7 角、一件 8 角。用 1 元和 5 角付款，正好够吗？', answer: '正好够，一共 15 角', distractors: ['不够，少 1 角', '多出 5 角'], hint: '把付款和总价分别换成角后比较。', explanation: '1 元和 5 角是 15 角，两件东西也要 15 角，正好够。' },
    { knowledgePointIds: denominations, prompt: '想用 1 元和角面值的钱凑出 18 角，哪种安排可以做到？', answer: '1 元再加 5 角和 3 个 1 角', distractors: ['1 元再加 5 角', '1 元再加 9 个 1 角，合成 19 角'], hint: '先用 1 元凑出 10 角，还需要补多少角？', explanation: '18 角减去 1 元的 10 角还差 8 角，5 角和 3 个 1 角正好是 8 角。' },
    { knowledgePointIds: operation, prompt: '一张小票上写着“12 角 + 8 角 = 20 角”。怎样看出这笔记录自洽？', answer: '20 角正好是 2 元', distractors: ['20 角是 20 元', '20 角等于 2 分'], hint: '把 20 角换成元。', explanation: '10 角是 1 元，20 角就是 2 元，等式两边金额相同。' },
    { knowledgePointIds: conversionAndComposition, prompt: '用 1 元纸币和 1 角硬币组成 1 元 2 角，最少要几件？', answer: '3 件：1 张 1 元和 2 枚 1 角', distractors: ['2 件：1 张 1 元和 1 枚 1 角', '12 件：12 张 1 元'], hint: '1 元已经凑好，还需要补上 2 角。', explanation: '1 元 2 角由 1 张 1 元和 2 枚 1 角组成，共 3 件。' },
    { knowledgePointIds: denominations, prompt: '只有 1 角和 5 角两种硬币时，怎样用两枚硬币凑出 6 角？', answer: '1 枚 5 角和 1 枚 1 角', distractors: ['2 枚 5 角', '2 枚 1 角'], hint: '把两枚硬币的角数分别相加。', explanation: '5 角加 1 角正好是 6 角。' },
    { knowledgePointIds: composition, prompt: '比较 1 元 5 角和 12 角，它们相差多少？', answer: '3 角', distractors: ['1 角', '17 角'], hint: '先把 1 元 5 角换成角。', explanation: '1 元 5 角是 15 角，15 角减 12 角是 3 角。' },
    { knowledgePointIds: conversionAndComposition, prompt: '如果把 6 角全部换成 60 分，手里的钱会变多吗？', answer: '不会，金额不变', distractors: ['会多出 54 分', '会少 6 元'], hint: '先确认 1 角和多少分相等。', explanation: '1 角等于 10 分，6 角等于 60 分，只是换了表示方式。' },
    { knowledgePointIds: conversion, prompt: '同学写“2 元 = 20 角 = 20 分”，哪一步需要改？', answer: '20 角应换成 200 分', distractors: ['2 元应换成 200 角', '三步都正确'], hint: '1 角等于 10 分，所以 20 角是多少分？', explanation: '2 元等于 20 角；20 角应换成 200 分，不是 20 分。' },
    { knowledgePointIds: denominations, prompt: '要凑 1 元 7 角，只有 1 元、5 角和 1 角面值的钱，选哪组最合适？', answer: '1 元、5 角和两个 1 角', distractors: ['1 元、5 角和一个 1 角', '两个 5 角和两个 1 角'], hint: '先凑出 1 元，再想还差几角。', explanation: '1 元 7 角还差 7 角，用 5 角加两个 1 角正好补足。' },
    { knowledgePointIds: operation, prompt: '小乐有 8 角，还差 2 角到 1 元。他再拿到 10 分后，还差多少？', answer: '还差 1 角', distractors: ['已经多出 1 角', '还差 2 角'], hint: '10 分能换成几角？', explanation: '10 分是 1 角，8 角加 1 角是 9 角，距离 10 角还差 1 角。' },
    { knowledgePointIds: operation, prompt: '两样物品分别 7 角和 8 角，付 2 元后应该找回多少？', answer: '5 角', distractors: ['15 角', '3 角'], hint: '先算总价 15 角，再把 2 元换成角计算。', explanation: '2 元是 20 角，20 角减 15 角是 5 角。' },
    { knowledgePointIds: conversionAndComposition, prompt: '下面哪种拆分也能表示 1 元？', answer: '5 角 + 5 角，或 10 个 1 角', distractors: ['5 角 + 1 角', '10 分 + 1 角'], hint: '把每一种拆分都合成角来核对。', explanation: '5 角加 5 角是 10 角，10 个 1 角也是 10 角，二者都等于 1 元。' },
    { knowledgePointIds: conversionAndComposition, prompt: '3 枚 5 角硬币合起来，应该怎样写？', answer: '1 元 5 角', distractors: ['15 元', '3 元 5 角'], hint: '先算出 3 个 5 角一共多少角。', explanation: '3 个 5 角是 15 角，也就是 1 元 5 角。' },
    { knowledgePointIds: operation, prompt: '有 1 元和 3 角，花掉 8 角后还剩多少？', answer: '5 角', distractors: ['8 角', '21 角'], hint: '先把 1 元和 3 角合成 13 角。', explanation: '13 角减 8 角还剩 5 角。' },
    { knowledgePointIds: conversion, prompt: '检查下面三条等式，哪一条不正确？', answer: '1 元 = 10 分', distractors: ['1 元 = 10 角', '1 角 = 10 分'], hint: '每换一个相邻单位，都是 10 个换 1 个。', explanation: '1 元是 100 分，不是 10 分；另外两条等式正确。' },
    { knowledgePointIds: conversionAndComposition, prompt: '13 角换成“元和角”后，哪种写法正确？', answer: '1 元 3 角', distractors: ['13 元', '3 元 1 角'], hint: '10 角先换成 1 元。', explanation: '13 角由 10 角和 3 角组成，也就是 1 元 3 角。' },
    { knowledgePointIds: operation, prompt: '两样东西各 8 角和 7 角，付 20 角；找回 5 角后，小票上的总价应是多少？', answer: '15 角', distractors: ['13 角', '25 角'], hint: '用付款金额减去找零来核对总价。', explanation: '20 角减 5 角是 15 角，也和 8 角加 7 角的结果相同。' },
    { knowledgePointIds: conversionAndComposition, prompt: '小雨说 16 角是 1 元 6 角，小星说是 1 元 60 分。谁说得对？', answer: '两个人都对', distractors: ['只有小雨对', '只有小星对'], hint: '把小星说的 60 分换成角。', explanation: '60 分是 6 角，所以 1 元 60 分和 1 元 6 角表示相同金额。' },
    { knowledgePointIds: conversionAndComposition, prompt: '小文要说明 1 元 5 角和 150 分一样多，哪种说明完整？', answer: '1 元是 100 分，5 角是 50 分，合起来 150 分', distractors: ['1 元是 10 分，5 角是 50 分', '只要看到两个金额里都有数字 5 就相等'], hint: '把元和角分别换成分后再合起来。', explanation: '1 元等于 100 分，5 角等于 50 分，合起来正好是 150 分。' },
    { knowledgePointIds: operation, prompt: '三样东西分别要 4 角、6 角和 7 角，付 2 元后应找回多少？', answer: '3 角', distractors: ['17 角', '7 角'], hint: '先合计三样东西的价钱，再把 2 元换成角计算。', explanation: '总价是 17 角，2 元是 20 角，20 角减 17 角是 3 角。' },
  ],
};

function createActivity(draft: ActivityDraft, difficulty: Difficulty, index: number): Grade1Term2MathUnit05SupplementalActivity {
  const id = `${idPrefix}-${difficulty}-${String(index + 1).padStart(2, '0')}`;
  const correctOptionIndex = index % 3;
  const labels = [draft.answer, ...draft.distractors];
  [labels[0], labels[correctOptionIndex]] = [labels[correctOptionIndex]!, labels[0]!];
  const options = labels.map((label, optionIndex) => ({ id: `${id}/option-${String(optionIndex + 1).padStart(2, '0')}`, label }));
  const activity: ChoiceActivityDefinition = {
    id,
    kind: 'choice',
    prompt: draft.prompt,
    options,
    correctOptionId: options[correctOptionIndex]!.id,
    hint: draft.hint,
    explanation: draft.explanation,
  };
  return { difficulty, sourceUnitId, knowledgePointIds: draft.knowledgePointIds, activity };
}

export const grade1Term2MathUnit05SupplementalActivities = (Object.entries(drafts) as [Difficulty, ActivityDraft[]][])
  .flatMap(([difficulty, items]) => items.map((draft, index) => createActivity(draft, difficulty, index)));
