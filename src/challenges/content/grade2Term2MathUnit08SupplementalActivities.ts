import type { ChoiceActivityDefinition, Difficulty } from '../../content/types';

export interface Grade2Term2MathUnit08SupplementalActivity {
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

const sourceUnitId = 'grade-2/term-2/math/unit-08';
const idPrefix = 'challenge-supplement-grade-2-term-2-math-unit-08';
const conversion = 'mass-unit-conversion';
const comparison = 'mass-comparison-and-estimation';

const drafts: Record<Difficulty, ActivityDraft[]> = {
  basic: [
    { knowledgePointIds: [comparison], prompt: '一颗小玻璃珠的质量，记录时通常选哪种单位？', answer: '克', distractors: ['千克', '厘米'], hint: '玻璃珠很轻；先想它是长度还是质量，再选常用质量单位。', explanation: '小玻璃珠是轻小物品，通常用克记录质量。' },
    { knowledgePointIds: [comparison], prompt: '装着几本书的书包质量大约是5，哪个单位更合理？', answer: '5千克', distractors: ['5克', '5厘米'], hint: '想想书包和书加起来有多重，克和厘米分别适不适合。', explanation: '装着几本书的书包比较重，用5千克描述比5克合理；厘米是长度单位。' },
    { knowledgePointIds: [conversion], prompt: '4千克300克合起来是多少克？', answer: '4,300克', distractors: ['4,030克', '430克'], hint: '先把4千克换成4,000克，再加上300克。', explanation: '4千克等于4,000克，4,000克加300克是4,300克。' },
    { knowledgePointIds: [comparison], prompt: '“2千克”这条记录说明物品的什么？', answer: '质量', distractors: ['长度', '温度'], hint: '千克是用来表示哪一类测量结果的单位？', explanation: '千克是质量单位，“2千克”表示物品的质量。' },
    { knowledgePointIds: [comparison], prompt: '橘子称得350克，下面哪条记录把质量说清楚了？', answer: '橘子重350克', distractors: ['橘子长350克', '橘子重350千克'], hint: '质量要用“重”来描述，单位还要符合橘子的轻重。', explanation: '350克是橘子的质量；“长”描述长度，350千克对一个橘子也不合理。' },
    { knowledgePointIds: [conversion, comparison], prompt: '1千克比850克多多少克？', answer: '150克', distractors: ['50克', '250克'], hint: '先把1千克换成1,000克，再用1,000减850。', explanation: '1,000克减850克等于150克。' },
    { knowledgePointIds: [conversion, comparison], prompt: '2千克80克比2,000克多多少克？', answer: '80克', distractors: ['800克', '20克'], hint: '注意两个记录单位不同，先用千克和克的进率统一单位。', explanation: '2千克80克是2,080克；2,080减2,000是80克。' },
    { knowledgePointIds: [comparison], prompt: '下面哪种物品的质量通常用千克记录更合适？', answer: '装着课本的书包', distractors: ['一张薄纸', '一枚回形针'], hint: '比较三种物品的轻重，较重的物品常用千克。', explanation: '装着课本的书包比一张纸或一枚回形针重得多，通常用千克记录。' },
    { knowledgePointIds: [conversion], prompt: '2,500克可以写成哪种千克和克的记录？', answer: '2千克500克', distractors: ['2千克50克', '25千克'], hint: '2,000克是2千克，剩下的克数继续保留。', explanation: '2,500克由2,000克和500克组成，所以是2千克500克。' },
    { knowledgePointIds: [comparison], prompt: '一小包普通饼干的质量更可能接近哪一个？', answer: '200克', distractors: ['200千克', '200米'], hint: '饼干包很轻；排除不可能的质量或长度单位。', explanation: '一小包饼干可能有几百克；200千克太重，米是长度单位。' },
    { knowledgePointIds: [conversion], prompt: '电子秤显示一桶面粉重6千克。若记录栏只写“克”，数值应填多少？', answer: '6,000克', distractors: ['600克', '60,000克'], hint: '每千克有1,000克，把6千克换成克后填入。', explanation: '6千克等于6,000克，所以“克”栏应填6,000克。' },
    { knowledgePointIds: [conversion, comparison], prompt: '1千克200克和1,250克相比，哪一个更重？重多少？', answer: '1,250克更重，重50克', distractors: ['1千克200克更重，重50克', '两者一样重'], hint: '把1千克200克先换成克，再比较。', explanation: '1千克200克是1,200克；1,250克比1,200克多50克。' },
    { knowledgePointIds: [comparison], prompt: '一只小羊的质量更可能接近哪一个记录？', answer: '18千克', distractors: ['18克', '18厘米'], hint: '小羊是较重的动物，厘米不是质量单位。', explanation: '小羊不可能只有18克；18千克比18克更符合动物的质量，厘米是长度单位。' },
    { knowledgePointIds: [conversion, comparison], prompt: '900克加50克，与1千克相比，哪一个更重？相差多少？', answer: '1千克更重，重50克', distractors: ['900克加50克更重，重50克', '两者一样重'], hint: '先算900克加50克，再把1千克换成克比较。', explanation: '900克加50克是950克；1千克是1,000克，比950克多50克。' },
  ],
  advanced: [
    { knowledgePointIds: [conversion], prompt: '一袋水果重1千克750克，另有450克苹果，合起来是多少克？', answer: '2,200克', distractors: ['2,020克', '2,700克'], hint: '先把1千克750克换成1,750克，再加450克。', explanation: '1,750克加450克等于2,200克。' },
    { knowledgePointIds: [conversion], prompt: '两盒材料分别重800克和700克，合起来怎样记录？', answer: '1千克500克', distractors: ['1千克50克', '15千克'], hint: '800克加700克是多少克？超过1,000克后换成千克和克。', explanation: '800克加700克是1,500克，也就是1千克500克。' },
    { knowledgePointIds: [conversion, comparison], prompt: '2千克和1,850克相比，谁更重？相差多少？', answer: '2千克更重，重150克', distractors: ['1,850克更重，重150克', '两者一样重'], hint: '把2千克换成克，再算两个质量相差多少。', explanation: '2千克是2,000克；2,000克减1,850克是150克，所以2千克更重。' },
    { knowledgePointIds: [conversion], prompt: '礼盒目标质量是2千克，已有1千克350克，还差多少克？', answer: '650克', distractors: ['750克', '1,350克'], hint: '先把目标和已有质量都换成克，再用目标减已有。', explanation: '2千克是2,000克，已有1,350克；2,000减1,350还差650克。' },
    { knowledgePointIds: [conversion], prompt: '把3千克50克误写成350克，应该改成多少克？', answer: '3,050克', distractors: ['350克', '3,500克'], hint: '3千克是3,000克，50克不能丢掉。', explanation: '3,000克加50克是3,050克。' },
    { knowledgePointIds: [conversion], prompt: '哪一组材料合起来正好是2千克？', answer: '1千克250克 + 750克', distractors: ['1千克250克 + 500克', '1千克500克 + 750克'], hint: '把两部分都换成克后相加，再与2,000克比较。', explanation: '1千克250克是1,250克；1,250加750等于2,000克，正好是2千克。' },
    { knowledgePointIds: [conversion, comparison], prompt: '1千克600克和1,550克相比，哪一个更重？', answer: '1千克600克更重，重50克', distractors: ['1,550克更重，重50克', '两者一样重'], hint: '把1千克600克换成克再比较。', explanation: '1千克600克是1,600克，比1,550克多50克。' },
    { knowledgePointIds: [conversion, comparison], prompt: '把950克、1千克250克和1千克100克按从轻到重排列，哪项正确？', answer: '950克＜1千克100克＜1千克250克', distractors: ['1千克100克＜950克＜1千克250克', '1千克250克＜1千克100克＜950克'], hint: '先统一成克，再从小到大比较。', explanation: '三个质量分别是950克、1,100克和1,250克，所以顺序如答案所示。' },
    { knowledgePointIds: [conversion], prompt: '2,300克换成千克和克，应怎样记录？', answer: '2千克300克', distractors: ['2千克30克', '23千克'], hint: '先找出其中的2,000克，再看剩下多少克。', explanation: '2,300克等于2,000克加300克，也就是2千克300克。' },
    { knowledgePointIds: [conversion], prompt: '目标是3千克，已经放入500克和1千克200克，还需要多少克？', answer: '1,300克', distractors: ['1,200克', '1,500克'], hint: '先求已经放入的总质量，再从3,000克中减去。', explanation: '已放入500克加1,200克，共1,700克；3,000减1,700还差1,300克。' },
    { knowledgePointIds: [conversion], prompt: '秤上记录为1,750克，哪项用“千克和克”表达同一质量？', answer: '1千克750克', distractors: ['1千克75克', '17千克50克'], hint: '先找出1,750克里完整的1,000克，再看剩下多少克。', explanation: '1,750克由1,000克和750克组成，所以是1千克750克。' },
    { knowledgePointIds: [conversion, comparison], prompt: '1千克250克和1,200克相比，哪一个更重？相差多少？', answer: '1千克250克更重，重50克', distractors: ['1,200克更重，重50克', '两者一样重'], hint: '把1千克250克换成克后再比较。', explanation: '1千克250克是1,250克，比1,200克多50克。' },
    { knowledgePointIds: [conversion], prompt: '两盒彩泥各重850克，合起来是多少克？', answer: '1,700克', distractors: ['1,600克', '1,750克'], hint: '把两盒的质量相加，注意满1,000克可以换成1千克。', explanation: '850克加850克是1,700克，也可以记作1千克700克。' },
    { knowledgePointIds: [conversion], prompt: '一袋米重1千克200克，再放入300克豆子，总质量是多少克？', answer: '1,500克', distractors: ['1,230克', '1,800克'], hint: '先把1千克200克换成1,200克，再加300克。', explanation: '1,200克加300克等于1,500克。' },
  ],
  high: [
    { knowledgePointIds: [conversion], prompt: '目标总质量是4千克，已有1千克600克和1千克850克，还差多少克？', answer: '还差550克', distractors: ['还差450克', '还差650克'], hint: '先把已有的两份质量换成克并相加，再从4,000克中减去。', explanation: '已有1,600克加1,850克共3,450克；4,000减3,450还差550克。' },
    { knowledgePointIds: [conversion, comparison], prompt: '980克、1千克250克和1千克20克三件商品中，哪一个质量居中？', answer: '1千克20克', distractors: ['980克', '1千克250克'], hint: '把三个质量统一成克，比较后找中间的那个。', explanation: '三个质量分别是980克、1,250克和1,020克；从轻到重是980克、1,020克、1,250克，所以中间的是1千克20克。' },
    { knowledgePointIds: [conversion], prompt: '3千克5克换成克，正确结果是多少？', answer: '3,005克', distractors: ['305克', '3,500克'], hint: '3千克是3,000克，再加上个位数的5克。', explanation: '3,000克加5克等于3,005克。' },
    { knowledgePointIds: [conversion], prompt: '要装满2千克的盒子，哪一组预称好的材料正好够？', answer: '800克、700克和500克', distractors: ['800克和700克', '700克和500克'], hint: '把每组质量相加，与2,000克比较。', explanation: '800克加700克加500克正好是2,000克；少其中一份都不到2千克。' },
    { knowledgePointIds: [conversion, comparison], prompt: '方案甲由1千克和500克组成；方案乙是1千克400克。哪项比较正确？', answer: '1千克500克那组更重，重100克', distractors: ['1千克400克那组更重，重100克', '两组一样重'], hint: '分别换成克后再比较两组总质量。', explanation: '方案甲是1,500克，方案乙是1,400克；方案甲重100克。' },
    { knowledgePointIds: [conversion], prompt: '三袋食材分别重1千克250克、750克和500克，合起来是多少？', answer: '2千克500克', distractors: ['2千克50克', '2千克250克'], hint: '把三袋都换成克相加，再把满1,000克的部分换成千克。', explanation: '1,250克加750克加500克等于2,500克，也就是2千克500克。' },
    { knowledgePointIds: [conversion], prompt: '4千克物品取出2千克300克后，还剩多少克？', answer: '1千克700克', distractors: ['1千克70克', '2千克300克'], hint: '先把4千克换成4,000克，再减去2,300克。', explanation: '4,000克减2,300克等于1,700克，也就是1千克700克。' },
    { knowledgePointIds: [conversion], prompt: '要把3千克的箱子装满，现有1千克400克、900克和700克。哪一组正好装满？', answer: '1千克400克、900克和700克', distractors: ['1千克400克和900克', '900克和700克'], hint: '把各组质量换成克相加，目标是3,000克。', explanation: '1,400克加900克加700克正好是3,000克；任意少一份都达不到目标。' },
    { knowledgePointIds: [conversion, comparison], prompt: '三份装载的质量分别是：甲1千克500克，乙2千克100克加950克，丙1千克250克加1千克600克。哪份超过3千克？', answer: '第二份装载超过3千克', distractors: ['第一份装载超过3千克', '第三份装载超过3千克'], hint: '把每份装载中的质量统一成克，再和3,000克比较。', explanation: '甲是1,500克，乙是3,050克，丙是2,850克；只有第二份超过3,000克。' },
    { knowledgePointIds: [conversion], prompt: '目标总质量是5千克，已有2千克200克、1千克750克和1千克，还差多少克？', answer: '还需50克', distractors: ['还需150克', '还需250克'], hint: '先算已有质量的总和，并与5,000克比较。', explanation: '已有2,200克加1,750克加1,000克共4,950克；还差50克。' },
    { knowledgePointIds: [conversion], prompt: '4千克80克写成多少克才正确？', answer: '4,080克', distractors: ['4,800克', '480克'], hint: '4千克换成4,000克，再加80克。', explanation: '4,000克加80克等于4,080克。' },
    { knowledgePointIds: [conversion, comparison], prompt: '几件物品的合计与逐件相加不一致，先怎样核查最稳妥？', answer: '先核对每件物品的读数和单位，再统一单位求和', distractors: ['先删掉单位，只把数字相加', '直接相信合计记录，不再检查'], hint: '先确认每个数据可靠且单位清楚，再做总和。', explanation: '逐件核对读数和单位后，统一单位相加，才能查清合计是否正确。' },
    { knowledgePointIds: [conversion], prompt: '4千克目标中已有2千克250克和900克，还差多少克？', answer: '850克', distractors: ['750克', '950克'], hint: '把目标换成4,000克，再减去2,250克和900克的总和。', explanation: '已知质量共2,250克加900克等于3,150克；4,000减3,150还差850克。' },
    { knowledgePointIds: [conversion, comparison], prompt: '1千克900克和1,800克相比，谁更重？相差多少？', answer: '1千克900克比1,800克重100克', distractors: ['1,800克更重100克', '两者一样重'], hint: '把1千克900克换成克再比较。', explanation: '1千克900克是1,900克，比1,800克多100克。' },
  ],
};

export const grade2Term2MathUnit08SupplementalActivities: Grade2Term2MathUnit08SupplementalActivity[] = (
  Object.entries(drafts) as Array<[Difficulty, ActivityDraft[]]>
).flatMap(([difficulty, questions]) => questions.map((draft, index) => {
  const correctOptionIndex = (index % 3) as 0 | 1 | 2;
  const options = [...draft.distractors];
  options.splice(correctOptionIndex, 0, draft.answer);
  return {
    difficulty,
    sourceUnitId,
    knowledgePointIds: draft.knowledgePointIds,
    activity: {
      id: `${idPrefix}-${difficulty}-${String(index + 1).padStart(2, '0')}`,
      kind: 'choice' as const,
      prompt: draft.prompt,
      options: options.map((label, optionIndex) => ({ id: `option-${optionIndex + 1}`, label })),
      correctOptionId: `option-${correctOptionIndex + 1}`,
      hint: draft.hint,
      explanation: draft.explanation,
    },
  };
}));
