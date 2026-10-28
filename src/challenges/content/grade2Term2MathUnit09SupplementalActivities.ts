import type { ChoiceActivityDefinition, Difficulty } from '../../content/types';

export interface Grade2Term2MathUnit09SupplementalActivity {
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

const sourceUnitId = 'grade-2/term-2/math/unit-09';
const idPrefix = 'challenge-supplement-grade-2-term-2-math-unit-09';
const elimination = 'deduction-by-elimination';
const ordering = 'ordering-and-transitive-relations';
const uniqueInference = 'unique-inference-from-clues';
const sufficiency = 'clue-sufficiency-and-uncertainty';

const drafts: Record<Difficulty, ActivityDraft[]> = {
  basic: [
    { knowledgePointIds: [elimination, uniqueInference], prompt: '红、黄、蓝三张不同颜色卡各一张，三位同学各拿一张且不重复。小禾拿红色，小青不拿蓝色。小青拿什么颜色？', answer: '黄色', distractors: ['红色', '蓝色'], hint: '红色已经由小禾拿走，再看小青不能拿哪种颜色。', explanation: '小青不能拿红色，因为红色已给小禾；她也不拿蓝色，所以拿黄色。' },
    { knowledgePointIds: [elimination], prompt: '盒里只有圆形和方形磁贴。拿出来的不是方形，拿出来的是什么？', answer: '圆形磁贴', distractors: ['方形磁贴', '两种磁贴都有'], hint: '先列出盒里所有可能，再划掉不符合的形状。', explanation: '只有圆形和方形两种，既然不是方形，就一定是圆形。' },
    { knowledgePointIds: [elimination, uniqueInference], prompt: '1号、2号、3号卡各一张，三位同学各拿一张且不重复。小安拿2号，小林拿1号。小禾拿哪张？', answer: '3号卡', distractors: ['1号卡', '2号卡'], hint: '看看哪张卡还没有被拿走。', explanation: '1号和2号卡已经分别给了小林和小安，剩下3号卡给小禾。' },
    { knowledgePointIds: [ordering, uniqueInference], prompt: '小敏比小雨早到，小雨比小川早到。哪项关系一定成立？', answer: '小雨在小川前面', distractors: ['小川在小雨前面', '小敏在小雨后面'], hint: '先读清每一条“谁比谁先到”的线索。', explanation: '题目直接说明小雨比小川早到，所以小雨在小川前面。' },
    { knowledgePointIds: [sufficiency], prompt: '红、黄、蓝三张不同卡片，已知小乐拿红卡。哪种做法符合推理要求？', answer: '根据线索排除不符合的颜色', distractors: ['没读其他线索就猜小雨拿蓝卡', '按自己喜欢的颜色选答案'], hint: '只用题目给出的条件，不把猜测当作线索。', explanation: '推理时应依据已知条件排除可能，不凭喜好或没有根据的猜测选答案。' },
    { knowledgePointIds: [elimination, uniqueInference], prompt: '白、灰、黑三张卡各一张，三位同学各拿一张且不重复。小林不拿白卡，小宇拿黑卡。小林拿哪张？', answer: '灰色卡片', distractors: ['白色卡片', '黑色卡片'], hint: '小林既不能拿白卡，也不能拿已经给小宇的黑卡。', explanation: '白卡不符合小林的条件，黑卡已给小宇，所以小林拿灰卡。' },
    { knowledgePointIds: [ordering, uniqueInference], prompt: '小林比小青早到，小青比小杨早到。谁最后到？', answer: '小杨最后到', distractors: ['小林最后到', '小青最后到'], hint: '把三人的先后关系连成一条顺序。', explanation: '顺序是小林、小青、小杨，所以最后到的是小杨。' },
    { knowledgePointIds: [ordering, uniqueInference], prompt: '甲在乙前面，乙在丙前面。谁在甲和丙中间？', answer: '乙在甲和丙中间', distractors: ['甲在中间', '丙在中间'], hint: '先按“甲在乙前”放好甲和乙，再放乙和丙。', explanation: '顺序是甲、乙、丙，所以乙在甲和丙中间。' },
    { knowledgePointIds: [ordering, uniqueInference], prompt: '红、黄、蓝三面旗从第一位到第三位排列。黄旗在第一位，蓝旗在第三位。红旗在哪一位？', answer: '红旗在第二位', distractors: ['红旗在第一位', '红旗在第三位'], hint: '三个位置中，第一位和第三位已经确定。', explanation: '只剩第二位没有旗子，所以红旗在第二位。' },
    { knowledgePointIds: [ordering, uniqueInference], prompt: '做手工时先涂底色，等底色干了再贴图案，最后写名字。第二步做什么？', answer: '第二步是贴图案', distractors: ['第二步是涂底色', '第二步是写名字'], hint: '把题目里的“先、再、最后”按顺序排好。', explanation: '顺序是涂底色、贴图案、写名字，因此第二步是贴图案。' },
    { knowledgePointIds: [elimination, sufficiency], prompt: '做一道排队推理题时，哪种顺序更可靠？', answer: '先收集线索，再排除选项', distractors: ['先随便选答案，再找理由', '只看一条线索就不再检查'], hint: '先读完条件，再看哪些答案不符合。', explanation: '先整理已知线索，再排除不符合的选项，最后核对留下的答案。' },
    { knowledgePointIds: [sufficiency], prompt: '三位同学排队，只知道甲不是最后一位。谁最先到？', answer: '还不能确定谁先到', distractors: ['甲一定最先到', '乙一定最先到'], hint: '想一想甲可能在第一位，也可能在第二位。', explanation: '甲不是最后一位，但还可能是第一或第二；其他人的顺序也不确定。' },
    { knowledgePointIds: [elimination, sufficiency], prompt: '开始解决“谁拿哪张卡”的推理题，第一步应该做什么？', answer: '先读条件，再排除答案', distractors: ['先按名字顺序分卡', '先挑看起来最顺眼的卡'], hint: '先弄清有哪些卡、有哪些分配条件。', explanation: '读清条件后才能排除不符合的选择，不能按名字或喜好猜答案。' },
    { knowledgePointIds: [elimination, sufficiency], prompt: '用线索推出一个答案后，提交前要检查什么？', answer: '留下的答案符合全部线索', distractors: ['只检查最后一条线索', '只要答案看起来合理就可以'], hint: '把留下的答案逐条放回题目的条件里核对。', explanation: '一个可靠答案必须符合题目给出的每一条线索。' },
  ],
  advanced: [
    { knowledgePointIds: [elimination, uniqueInference], prompt: '红、黄、蓝三种书签各一张，三位伙伴各拿一种且不重复。小禾拿红色，小涛不拿黄色。小涛拿什么？', answer: '蓝色书签', distractors: ['红色书签', '黄色书签'], hint: '先排除小涛不能拿的黄色，再排除已经给小禾的红色。', explanation: '红色已给小禾，小涛不拿黄色，因此小涛只能拿蓝色书签。' },
    { knowledgePointIds: [ordering, uniqueInference], prompt: '甲、乙、丙、丁四个站按条件排列：甲在乙前，乙在丙前，丙在丁前。最后一站是哪个？', answer: '丁站', distractors: ['乙站', '丙站'], hint: '把三条先后关系接成一条完整顺序。', explanation: '顺序为甲、乙、丙、丁，所以最后一站是丁站。' },
    { knowledgePointIds: [ordering, uniqueInference], prompt: '小灯在小船前面，小船在小树前面。哪项结论一定成立？', answer: '小灯一定在小树前', distractors: ['小树一定在小灯前', '小灯和小树的先后不能确定'], hint: '把两条“在……前面”的线索连起来。', explanation: '小灯先于小船，小船又先于小树，所以小灯一定在小树前。' },
    { knowledgePointIds: [ordering, uniqueInference], prompt: '甲、乙、丙三人排成一排。丙在最后，甲不是第一位。谁在中间？', answer: '甲在中间', distractors: ['乙在中间', '丙在中间'], hint: '丙已在最后，甲又不能在第一位。', explanation: '丙占第三位，甲不在第一位，只能在第二位；所以甲在中间。' },
    { knowledgePointIds: [sufficiency], prompt: '甲和乙排在丙前面，但没有其他顺序线索。能确定甲和乙谁先到吗？', answer: '还不能确定甲和乙谁先到', distractors: ['甲一定先到', '乙一定先到'], hint: '题目只把甲、乙都放在丙前面，没有比较甲和乙。', explanation: '甲、乙的先后关系没有给出，因此无法确定谁先到。' },
    { knowledgePointIds: [elimination, sufficiency], prompt: '小涛从红、黄、蓝三张不同颜色卡中拿一张，不拿红卡，也不拿黄卡。哪项结论正确？', answer: '小涛拿蓝色', distractors: ['小涛拿红色', '小涛拿黄色'], hint: '从三种颜色里划掉小涛不能拿的两种。', explanation: '红色和黄色都不符合条件，只剩蓝色。' },
    { knowledgePointIds: [ordering, uniqueInference], prompt: '甲、乙、丙三人各站一个不同位置。甲在第一位，丙在第三位。乙在哪一位？', answer: '甲在第一，丙在第三，乙在中间', distractors: ['乙在第一，甲在第三', '甲、乙、丙都在第一位'], hint: '第一和第三两个位置已经有人。', explanation: '乙只能站在剩下的第二位，顺序是甲、乙、丙。' },
    { knowledgePointIds: [elimination, sufficiency], prompt: '几条线索已经分别记下，怎样继续才能减少漏看条件？', answer: '先整理条件，再检查结论', distractors: ['挑一条最喜欢的线索直接作答', '不核对条件，马上提交'], hint: '把线索放在一起，再看结论是否和它们都相符。', explanation: '先整理线索、排除不符合的答案，再逐条检查结论。' },
    { knowledgePointIds: [ordering, uniqueInference], prompt: '四个检查站按顺序经过：甲在乙前，乙在丙前，丙在丁前。第三站是哪一站？', answer: '丙站', distractors: ['乙站', '丁站'], hint: '先从前到后写出四站的顺序。', explanation: '顺序是甲、乙、丙、丁，第三站是丙站。' },
    { knowledgePointIds: [ordering, uniqueInference], prompt: '小星在小月前，小月在小阳前。哪项结论一定成立？', answer: '小星一定在小阳前', distractors: ['小阳一定在小星前', '小星和小阳谁先不能确定'], hint: '把两条先后关系连成一条线。', explanation: '小星先于小月，小月先于小阳，所以小星一定先于小阳。' },
    { knowledgePointIds: [elimination, uniqueInference], prompt: '甲、乙、丙、丁分别拿红、蓝、黄、绿四张不同卡。甲拿红，乙拿蓝，丙不拿绿。哪项分配正确？', answer: '丙拿黄卡，丁拿绿卡', distractors: ['丙拿绿卡，丁拿黄卡', '丙拿红卡，丁拿蓝卡'], hint: '红卡和蓝卡已经分出，丙不能拿绿卡。', explanation: '丙只能拿黄卡，丁拿剩下的绿卡。' },
    { knowledgePointIds: [sufficiency], prompt: '三人排队只知道乙不是第一位。能确定乙排第几吗？', answer: '信息还不够', distractors: ['乙一定排第二', '乙一定排第三'], hint: '乙可能排第二，也可能排第三。', explanation: '这两种位置都符合“乙不是第一位”，所以条件不足以确定唯一位置。' },
    { knowledgePointIds: [ordering, uniqueInference], prompt: '三位同学排队。小雨在小林前面，小林在小安前面。完整顺序是什么？', answer: '小雨第一，小林第二，小安第三', distractors: ['小安第一，小林第二，小雨第三', '小林第一，小雨第二，小安第三'], hint: '把两条先后线索按从前到后连接起来。', explanation: '小雨先于小林，小林先于小安，所以顺序是小雨、小林、小安。' },
    { knowledgePointIds: [sufficiency], prompt: '小青和小红都比小蓝早到，但没有两人之间的线索。能确定小青和小红谁先到吗？', answer: '小青和小红的先后还不能确定', distractors: ['小青一定先到', '小红一定先到'], hint: '两人都早于小蓝，并没有说明彼此的先后。', explanation: '小青和小红的相对顺序仍有两种可能，因此不能确定谁先到。' },
  ],
  high: [
    { knowledgePointIds: [ordering, uniqueInference], prompt: '甲在乙前，丙在乙后，丁在丙后。哪两站一定在乙后？', answer: '丙和丁都在乙后', distractors: ['只有甲在乙后', '甲和丁在乙后'], hint: '先根据“丙在乙后”确定丙的位置，再看丁和丙的关系。', explanation: '丙在乙后，丁又在丙后，所以丙和丁都在乙后。' },
    { knowledgePointIds: [ordering, uniqueInference], prompt: '红盒在黄盒左边，蓝盒在黄盒右边。三盒彩球从左到右排好，哪盒在中间？', answer: '黄盒在中间', distractors: ['红盒在中间', '蓝盒在中间'], hint: '黄盒左边有红盒，右边有蓝盒。', explanation: '红盒在黄盒左边、蓝盒在黄盒右边，所以黄盒在中间。' },
    { knowledgePointIds: [ordering, uniqueInference], prompt: '甲站在乙站前，乙站在丙站前，丙站在丁站前。第四个站点顺序中的第三站是哪一站？', answer: '丙站在第三', distractors: ['乙站在第三', '丁站在第三'], hint: '把四个站点从前到后排成一列。', explanation: '顺序是甲、乙、丙、丁，丙站在第三。' },
    { knowledgePointIds: [sufficiency], prompt: '三人排队只知道甲不是第一位。哪项判断正确？', answer: '现有线索不足，不能确定唯一位置', distractors: ['甲一定是第一位', '甲一定是最后一位'], hint: '甲可能排第二，也可能排第三。', explanation: '“甲不是第一位”仍允许第二、第三两种情况，所以不能确定唯一位置。' },
    { knowledgePointIds: [ordering, uniqueInference], prompt: '四项任务按顺序完成：测量在记录前，记录在整理前，整理在汇报前。第一项任务是什么？', answer: '先测量，再记录、整理、汇报', distractors: ['先记录，再测量、整理、汇报', '先汇报，再测量、记录、整理'], hint: '把连续的先后关系一段一段接起来。', explanation: '测量先于记录，记录先于整理，整理先于汇报，所以测量是第一项。' },
    { knowledgePointIds: [elimination, uniqueInference], prompt: '金、银、铜三枚不同奖牌分别给三位同学。小林不是金牌，小雨拿银牌。小林拿什么？', answer: '小林拿铜牌', distractors: ['小林拿金牌', '小林拿银牌'], hint: '银牌已给小雨，小林也不能拿金牌。', explanation: '小林不能拿金牌，银牌已经给小雨，因此小林拿铜牌。' },
    { knowledgePointIds: [ordering, uniqueInference], prompt: '小河在小宁前，小宁在小乐前，小雨在小乐后。前三位依次是谁？', answer: '小河、小宁、小乐', distractors: ['小雨、小乐、小宁', '小宁、小河、小雨'], hint: '先连起前三人的先后，再看小雨和小乐的关系。', explanation: '小河先于小宁，小宁先于小乐，小雨又在小乐后，所以前三位是小河、小宁、小乐。' },
    { knowledgePointIds: [sufficiency], prompt: '小青和小红都比小蓝早到。若要确定小青和小红谁先到，还需要什么线索？', answer: '还需要知道小青和小红谁先到', distractors: ['再知道小蓝穿什么颜色的衣服', '再确认小青和小红都比小蓝早到'], hint: '现有信息已经比较了两人和小蓝的关系。', explanation: '要比较小青和小红，必须补充她们两人之间的先后线索。' },
    { knowledgePointIds: [ordering, uniqueInference], prompt: '小田先于小鹿，小鹿先于小树。哪项关系一定成立？', answer: '小田在小树之前', distractors: ['小树在小田之前', '小田和小树谁先不能确定'], hint: '把小田、小鹿、小树的先后关系连起来。', explanation: '小田先于小鹿，小鹿又先于小树，因此小田先于小树。' },
    { knowledgePointIds: [sufficiency], prompt: '四人排队，甲和乙分别占第二、第三位，但没有线索说明谁在前。能确定甲和乙谁先吗？', answer: '不能确定甲和乙谁先到', distractors: ['甲一定在乙前', '乙一定在甲前'], hint: '交换甲、乙的位置后，已有条件仍然成立吗？', explanation: '甲乙交换位置都不违反条件，所以无法确定谁在前。' },
    { knowledgePointIds: [elimination, uniqueInference], prompt: '三位伙伴各拿一种不同形状卡片：圆、方、三角。小安不是圆形，小宇拿三角形，小安也不能拿小宇的卡片。小安拿什么？', answer: '方形', distractors: ['三角形', '圆形'], hint: '小安排除圆形后，还要排除已经由小宇拿走的三角形。', explanation: '小安不能拿圆形，也不能拿小宇的三角形，只剩方形。' },
    { knowledgePointIds: [ordering, uniqueInference], prompt: '四项工作按条件安排：收集在比较前，比较在记录前。哪项一定最先？', answer: '先收集，再比较，最后记录', distractors: ['先记录，再收集、比较', '先比较，再记录、收集'], hint: '把两条“在……前”的线索接起来。', explanation: '收集先于比较，比较先于记录，因此顺序是收集、比较、记录。' },
    { knowledgePointIds: [elimination, sufficiency], prompt: '写下推理答案前，哪项检查最可靠？', answer: '所有条件都要能支持答案', distractors: ['只要符合一条线索就可以', '答案听起来合理就不用检查'], hint: '把答案逐条放回所有已知条件中检验。', explanation: '可靠结论必须得到全部相关线索支持，不能忽略不符合的条件。' },
    { knowledgePointIds: [sufficiency], prompt: '三人排队，只知道小林不是第一位。能确定小林具体排第几吗？', answer: '不能只凭“不是第一”确定唯一位置', distractors: ['小林一定排第二', '小林一定排第三'], hint: '小林可能在第二位，也可能在第三位。', explanation: '“不是第一”仍允许第二、第三两种情况，所以不能确定唯一位置。' },
  ],
};

export const grade2Term2MathUnit09SupplementalActivities: Grade2Term2MathUnit09SupplementalActivity[] = Object.entries(drafts).flatMap(([difficulty, items]) => (
  items.map((draft, index) => {
    const correctOptionIndex = (index % 3) as 0 | 1 | 2;
    const options = [...draft.distractors];
    options.splice(correctOptionIndex, 0, draft.answer);
    return {
      difficulty: difficulty as Difficulty,
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
  })
));
