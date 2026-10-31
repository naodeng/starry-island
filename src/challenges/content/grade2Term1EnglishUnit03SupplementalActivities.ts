import type { ChoiceActivityDefinition, Difficulty } from '../../content/types';

export type Grade2Term1EnglishUnit03KnowledgePointId =
  | 'height-and-size-words'
  | 'appearance-words'
  | 'friendly-description';

export interface Grade2Term1EnglishUnit03SupplementalActivity {
  difficulty: Difficulty;
  sourceUnitId: string;
  knowledgePointIds: Grade2Term1EnglishUnit03KnowledgePointId[];
  activity: ChoiceActivityDefinition;
}

interface Draft {
  knowledgePointIds: Grade2Term1EnglishUnit03KnowledgePointId[];
  prompt: string;
  answer: string;
  distractors: [string, string];
  hint: string;
  explanation: string;
}

const sourceUnitId = 'grade-2/term-1/english/unit-03';
const idPrefix = 'challenge-supplement-grade-2-term-1-english-unit-03';
const heightSize: Grade2Term1EnglishUnit03KnowledgePointId = 'height-and-size-words';
const appearance: Grade2Term1EnglishUnit03KnowledgePointId = 'appearance-words';
const description: Grade2Term1EnglishUnit03KnowledgePointId = 'friendly-description';

const q = (
  knowledgePointIds: Grade2Term1EnglishUnit03KnowledgePointId[],
  prompt: string,
  answer: string,
  distractors: [string, string],
  hint: string,
  explanation: string,
): Draft => ({ knowledgePointIds, prompt, answer, distractors, hint, explanation });

const drafts: Record<Difficulty, Draft[]> = {
  basic: [
    q([heightSize], '词卡 “tall” 对应哪个意思？', '高的', ['大的', '瘦的'], '这是描述身高的词。', 'tall 表示“高的”。'),
    q([heightSize], '人物卡写着“身材较矮”。哪张英文词卡最合适？', 'short', ['tall', 'thin'], '描述身高时，想一想 tall 的相反方向。', '描述人物身高时，short 表示“身材较矮的”。'),
    q([heightSize], '“big”可以表示什么？', '大的', ['高的', '英俊的'], '它表示大小，不是身高。', 'big 表示“大”。'),
    q([heightSize], '描述卡用 “thin” 记录一种体型特征。对应的中文意思是？', '瘦的', ['高的', '漂亮的'], '只核对这个词的词义，不用它评价人物。', 'thin 表示“瘦的”；这里是在辨认词义，不是在评价人物。'),
    q([heightSize, description], '身高资料写着“这位卡通人物很高”。哪句话表达相同的信息？', 'The character is tall.', ['The character is short.', 'The character is thin.'], '资料说的是身高。', 'tall 表示高，The character is tall. 符合资料。'),
    q([heightSize, description], '人物介绍卡需要表达“她身材较矮”。应选哪句？', 'She is short.', ['She is tall.', 'She is pretty.'], '人物卡强调的是身高特征。', '描述人物身高时，short 表示身材较矮。'),
    q([heightSize], '桌上的大号背包可以用哪个词描述大小？', 'big', ['short', 'thin'], '看背包的整体大小，不是人物身高。', 'big 表示“大”，适合描述这个背包的大小。'),
    q([heightSize, description], '卡通人物的资料明确写着“瘦”。要保留这项资料，哪个英文词合适？', 'thin', ['tall', 'big'], '先读清资料中的体型词。', 'thin 表示“瘦的”；它与 tall、big 的意思不同。'),
    q([appearance], '词卡 “handsome” 的中文意思是？', '英俊的', ['高的', '瘦的'], '这是本单元的外貌描述词。', 'handsome 表示“英俊的”。'),
    q([appearance], '“漂亮的”对应哪个英文词？', 'pretty', ['handsome', 'big'], '在 handsome 和 pretty 中选择相应词卡。', 'pretty 表示“漂亮的”。'),
    q([appearance, description], '句子 “He is handsome.” 表达哪种意思？', '他很英俊。', ['他个子很高。', '他身材较矮。'], '注意句子中的形容词。', 'handsome 表示英俊；整句是在描述外貌。'),
    q([appearance, description], '句子 “She is pretty.” 中，pretty 表示什么？', '漂亮的', ['瘦的', '大的'], '它不是身高词。', 'pretty 表示“漂亮的”。'),
    q([heightSize], '人物身高记录为“高”。给记录选择英文词，哪项正确？', 'tall', ['big', 'short'], '把“高”与身高描述词对应起来。', '描述身高较高时使用 tall。'),
    q([heightSize], '一张人物卡注明“身材较矮”，哪项不会把身高方向弄反？', 'short', ['tall', 'big'], 'big 描述大小，不能代替身高方向。', 'short 描述身材较矮；tall 表示高。'),
    q([heightSize], '哪一组中的两个词都可以描述人物身高？', 'tall 和 short', ['big 和 handsome', 'pretty 和 thin'], '先找出一个表示高、一个表示较矮的词。', 'tall 和 short 都能描述身高。'),
    q([appearance], '角色词汇卡上写着 “英俊的”。应配哪张英文卡？', 'handsome', ['pretty', 'thin'], '把中文词义与外貌词匹配。', 'handsome 对应“英俊的”。'),
    q([appearance], '“pretty” 属于哪一类词？', '外貌描述词', ['身高描述词', '大小描述词'], '它表达外貌，不表示高矮或大小。', 'pretty 是外貌描述词，表示“漂亮的”。'),
    q([heightSize, appearance], '想分别记录人物的身高和外貌，哪组词的类别对应正确？', 'tall 表示身高；pretty 表示外貌。', ['tall 表示外貌；pretty 表示身高。', 'tall 和 pretty 都表示大小。'], '分别辨认两个词描述的特征。', 'tall 描述身高，pretty 描述外貌。'),
  ],
  advanced: [
    q([heightSize, description], '身高卡写着“高”，介绍句应选哪句？', 'He is tall.', ['He is short.', 'He is thin.'], '保留卡片上的身高信息。', 'tall 表示高，He is tall. 与卡片一致。'),
    q([heightSize, description], '一只大号行李箱需要贴英文尺寸词卡，哪项表达“大”？', 'big', ['tall', 'handsome'], '这里描述行李箱的大小。', 'big 表示“大”；tall 是描述高度，handsome 描述外貌。'),
    q([heightSize], '身高登记表有“较高”和“较矮”两栏。应把 tall 放在哪栏？', '较高', ['较矮', '外貌'], 'tall 描述身高的方向。', 'tall 表示“高的”，应放在“较高”栏。'),
    q([heightSize, description], '卡通人物资料注明“瘦”。哪句保留了这一体型信息？', 'The character is thin.', ['The character is tall.', 'The character is big.'], '只核对资料卡中写明的体型特征。', 'thin 表示“瘦的”；另外两句分别改成身高和大小描述。'),
    q([appearance, description], '一张词义卡要求匹配“英俊的”，不评价人物，只核对英文词义。哪项正确？', 'handsome', ['pretty', 'short'], '在两个外貌词中找到相应词义。', 'handsome 对应“英俊的”。'),
    q([heightSize, appearance], '图片说明“盒子尺寸很大”。哪项准确描述了大小，而不是高度或外貌？', 'The box is big.', ['The box is tall.', 'The box is handsome.'], 'big 表示大小，tall 表示高度。', '盒子大小大可以说 The box is big.。'),
    q([heightSize, description], '记录卡写着“这位角色身高较矮”。哪句没有把 short 和 tall 混淆？', 'The character is short.', ['The character is tall.', 'The character is big.'], '看清卡片描述的是身高。', 'short 表示身材较矮，第一句与记录一致。'),
    q([heightSize, description], '同伴把“身材较矮”选成 tall。要保留人物卡信息，应把哪个词换掉？', '把 tall 换成 short。', ['把 tall 换成 pretty。', '把 short 换成 handsome。'], '纠正身高词，不要改成外貌词。', 'short 表示身材较矮，应替换表示高的 tall。'),
    q([appearance, description], '句子 “She is pretty.” 的描述重点是什么？', '外貌', ['身高', '大小'], '观察 pretty 所属的词义类别。', 'pretty 表示漂亮，描述重点是外貌。'),
    q([heightSize, appearance, description], '两张卡分别写着“身高较高”和“外貌漂亮”。哪组词按顺序匹配？', 'tall；pretty', ['short；handsome', 'big；thin'], '第一项是身高，第二项是外貌。', 'tall 描述身高较高，pretty 描述漂亮。'),
    q([heightSize, appearance], '词语分类表分为“身高”和“外貌”两栏。哪组放置正确？', 'tall 放身高栏，handsome 放外貌栏。', ['tall 放外貌栏，handsome 放身高栏。', '两个词都放大小栏。'], '分别想一想 tall 与 handsome 描述的内容。', 'tall 描述身高；handsome 描述外貌。'),
    q([heightSize, description], '读两条资料：A“卡通树很高”；B“人物卡写着身材较矮”。哪组词按 A、B 顺序对应？', 'tall；short', ['short；tall', 'big；thin'], '先后区分“高”和“身材较矮”。', 'A 对应 tall，B 对应 short。'),
    q([heightSize, appearance, description], '一张人物卡写“高”，另一张外貌卡写“英俊”。哪组短句按卡片顺序对应？', 'He is tall.；He is handsome.', ['He is short.；He is pretty.', 'He is big.；He is tall.'], '逐句核对每张卡片所描述的特征。', 'tall 描述身高，handsome 描述外貌。'),
    q([heightSize, description], '请区分两项记录：①人物身高较高；②背包整体很大。哪组词按顺序正确？', 'tall；big', ['big；tall', 'thin；short'], '高矮与整体大小是不同信息。', 'tall 表示身高较高，big 表示整体较大。'),
    q([heightSize, description], '哪句话适合贴在“人物体型较瘦”的卡片下？', 'The character is thin.', ['The character is handsome.', 'The character is tall.'], '要选择体型词，不是外貌或身高词。', 'thin 表示“瘦的”，与卡片记录相符。'),
    q([appearance, description], '两张词义卡分别写着 handsome 和 pretty。哪项说明没有交换它们的意思？', 'handsome 是“英俊的”，pretty 是“漂亮的”。', ['handsome 是“漂亮的”，pretty 是“高的”。', 'handsome 是“瘦的”，pretty 是“大”的。'], '检查两个英文词各自的中文意思。', 'handsome 表示英俊，pretty 表示漂亮。'),
    q([heightSize, appearance, description], '校对记录：A“人物较矮—short”；B“外貌词—pretty”；C“人物身高较高—big”。哪项只改正错配？', '把 C 的 big 改成 tall。', ['把 A 的 short 改成 tall。', '把 B 的 pretty 改成 big。'], 'A、B 都符合，检查 C 的身高词。', 'C 描述身高较高，应使用 tall；big 描述大小。'),
    q([heightSize, appearance], '要用一个词说“背包大”，用另一个词说“人物高”。哪组词没有互换类别？', 'big；tall', ['tall；big', 'pretty；short'], '第一个描述背包大小，第二个描述人物身高。', 'big 表示大，tall 表示高。'),
    q([heightSize, appearance, description], '给两张卡排序：A“漂亮的外貌”；B“身材较矮”。哪组英文按 A、B 顺序正确？', 'pretty；short', ['short；handsome', 'tall；pretty'], '先匹配外貌，再匹配身高。', 'pretty 对应漂亮，short 描述身材较矮。'),
    q([heightSize, appearance, description], '四张词卡要分成“身高或大小”和“外貌”两组。哪项整理方法正确？', 'tall、short、big、thin；handsome、pretty', ['tall、pretty；big、handsome、short、thin', 'handsome、thin；pretty、big、tall、short'], '把身高/大小词和外貌词分开。', 'tall、short、big、thin 描述身高、体型或大小；handsome、pretty 描述外貌。'),
  ],
  high: [
    q([heightSize, appearance, description], '资料按顺序写着“人物身高较高、外貌漂亮、背包很大”。哪组词逐项对应？', 'tall；pretty；big', ['short；handsome；thin', 'big；tall；pretty'], '依次检查身高、外貌和物品大小。', 'tall 对应较高，pretty 对应漂亮，big 对应背包大。'),
    q([heightSize, appearance, description], '记录 A“人物较矮—short”；B“人物很高—tall”；C“外貌英俊—pretty”。哪项只指出错配？', 'C 的 pretty 应改为 handsome。', ['A 的 short 应改为 tall。', 'B 的 tall 应改为 short。'], 'A、B 的身高词都正确，检查 C 的外貌词。', 'handsome 对应“英俊的”，C 的 pretty 与记录不符。'),
    q([heightSize, description], '卡通人物身高卡写“高”，大小卡写“整体较大”。哪组记录同时区分了两种信息？', '身高用 tall；整体大小用 big。', ['身高用 big；整体大小用 tall。', '两项都用 pretty。'], '不要把身高和整体大小合成同一特征。', 'tall 描述身高，big 描述整体大小。'),
    q([heightSize, appearance, description], '三条英文记录中，A “The character is tall.”；B “The character is thin.”；C “The character is pretty.”。哪项概括了三条各自描述的特征？', 'A 身高；B 体型；C 外貌。', ['A 外貌；B 身高；C 大小。', 'A 大小；B 外貌；C 身高。'], '逐句看形容词对应的词义类别。', 'tall 描述身高，thin 描述体型，pretty 描述外貌。'),
    q([heightSize, appearance, description], '同伴给两张人物资料卡分别写了“高”和“漂亮”，又把一个大箱子记作 big。哪组词按资料顺序正确？', 'tall；pretty；big', ['big；tall；handsome', 'short；thin；pretty'], '区分人物身高、人物外貌和物品大小。', 'tall 对应高，pretty 对应漂亮，big 对应箱子大。'),
    q([heightSize, appearance], '哪项完整说明了四个词与类别的关系？', 'tall、short 描述身高；handsome、pretty 描述外貌。', ['tall、pretty 描述大小；short、handsome 描述身高。', '四个词都只表示身高。'], '把两个身高词和两个外貌词分别归类。', 'tall、short 是身高词，handsome、pretty 是外貌词。'),
    q([heightSize, appearance], '六张卡要按“身高、大小/体型、外貌”整理。哪组分栏正确？', '身高：tall、short；大小/体型：big、thin；外貌：handsome、pretty。', ['身高：big、pretty；大小/体型：tall、handsome；外貌：short、thin。', '身高：handsome、pretty；大小/体型：short；外貌：tall、big、thin。'], '逐词核对其描述对象和特征类别。', 'tall、short 描述身高；big、thin 描述大小或体型；handsome、pretty 描述外貌。'),
    q([heightSize, appearance, description], '卡片顺序是“身材较矮、外貌漂亮、体型较瘦”。哪组三词按顺序符合卡片？', 'short；pretty；thin', ['tall；handsome；big', 'pretty；short；tall'], '保留原顺序，逐项匹配身高、外貌和体型。', 'short 对应较矮，pretty 对应漂亮，thin 对应瘦。'),
    q([heightSize, appearance, description], '核对两条介绍：甲卡“身高高、外貌英俊”；乙卡“身材较矮、外貌漂亮”。哪组短语按甲、乙顺序正确？', 'tall and handsome；short and pretty', ['short and pretty；tall and handsome', 'big and thin；handsome and tall'], '每张卡都要同时核对两种特征。', '甲对应 tall 和 handsome，乙对应 short 和 pretty。'),
    q([heightSize, appearance, description], '记录表四项中，前三项正确：①人物高—tall；②箱子大—big；③卡片写漂亮—pretty；④人物瘦—handsome。只修正一项应选哪项？', '把④的 handsome 改为 thin。', ['把①的 tall 改为 short。', '把③的 pretty 改为 big。'], '前三项均匹配，④应使用体型词。', 'thin 表示“瘦的”，handsome 表示“英俊的”。'),
    q([heightSize, appearance, description], '一张卡的三条信息是：人物较矮、人物外貌英俊、背包较大。哪份英文词卡列表完整且顺序正确？', 'short；handsome；big', ['tall；pretty；thin', 'big；short；handsome'], '按卡片顺序区分身高、外貌与物品大小。', '三项依次对应 short、handsome 和 big。'),
    q([heightSize, appearance, description], '朋友的练习卡把“人物高、物品大、人物瘦”配成 tall、big、thin。哪项反馈最准确？', '三项都与各自描述一致。', ['只有 tall 正确，big 和 thin 应交换。', 'tall 与 big 应交换，thin 也应改成 pretty。'], '逐项核对每个形容词描述的特征。', 'tall 表示高，big 表示大，thin 表示瘦，三项均对应。'),
    q([heightSize, appearance, description], '三张描述卡依次是“体型较瘦”“身高较高”“外貌漂亮”。哪组词保持顺序且没有把类别混淆？', 'thin；tall；pretty', ['tall；pretty；thin', 'big；short；handsome'], '按体型、身高、外貌的顺序读取。', 'thin 对应瘦，tall 对应高，pretty 对应漂亮。'),
    q([heightSize, appearance, description], '校对员要只更正不符合卡片的词：A“人物高—tall”；B“外貌漂亮—pretty”；C“物品大—short”。哪项改法准确？', '把 C 的 short 改成 big。', ['把 A 的 tall 改成 short。', '把 B 的 pretty 改成 handsome。'], 'A、B 符合，C 描述的是物品大小。', 'big 表示大；short 在这里不能表示物品整体很大。'),
    q([heightSize, appearance, description], '介绍卡要先写身高，再写外貌：人物“高、英俊”。哪句保留两个信息及顺序？', 'He is tall and handsome.', ['He is handsome and short.', 'He is big and pretty.'], '检查句子里的两个描述词是否分别对应卡片。', 'tall 对应高，handsome 对应英俊，顺序与卡片一致。'),
    q([heightSize, appearance, description], '记录 A“人物身高较矮、体型较瘦”；记录 B“外貌漂亮、背包很大”。哪组词按 A、B 顺序都正确？', 'A：short、thin；B：pretty、big。', ['A：tall、handsome；B：thin、short。', 'A：pretty、big；B：short、thin。'], '每条记录都要分别检查人物特征与物品大小。', 'A 对应 short、thin；B 对应 pretty、big。'),
    q([heightSize, appearance], '有人把 handsome、pretty、tall 都放进“外貌”栏。哪项整理能改正分类？', 'handsome、pretty 留在外貌栏；tall 移到身高栏。', ['tall 留在外貌栏；handsome 移到身高栏。', '三个词都移到大小栏。'], '注意 tall 描述的是身高。', 'handsome 和 pretty 描述外貌，tall 描述身高。'),
    q([heightSize, appearance, description], '三条审核规则是：①身高词不代替大小词；②外貌词不代替体型词；③形容词只按卡片信息描述，不比较人物价值。哪条规则与本单元练习相符？', '三条都相符。', ['只有①相符，②和③不相符。', '只有③相符，①和②不相符。'], '检查词义类别，也留意描述是否保持尊重。', 'big、tall 等词义不同；外貌与体型词也要区分，并应依据卡片中性描述。'),
  ],
};

export const grade2Term1EnglishUnit03SupplementalActivities: Grade2Term1EnglishUnit03SupplementalActivity[] =
  (Object.entries(drafts) as [Difficulty, Draft[]][]).flatMap(([difficulty, items]) => items.map((item, index) => {
    const correctOptionIndex = ((index + 1) % 3) as 0 | 1 | 2;
    const options = [...item.distractors];
    options.splice(correctOptionIndex, 0, item.answer);
    return {
      difficulty,
      sourceUnitId,
      knowledgePointIds: item.knowledgePointIds,
      activity: {
        id: `${idPrefix}-${difficulty}-${String(index + 1).padStart(2, '0')}`,
        kind: 'choice',
        prompt: item.prompt,
        options: options.map((label, optionIndex) => ({ id: `option-${optionIndex + 1}`, label })),
        correctOptionId: `option-${correctOptionIndex + 1}`,
        hint: item.hint,
        explanation: item.explanation,
      },
    };
  }));
