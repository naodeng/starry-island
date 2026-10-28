import type { ChoiceActivityDefinition, Difficulty } from '../../content/types';

export type Grade2Term2EnglishUnit03KnowledgePointId =
  | 'season-vocabulary'
  | 'season-weather-description'
  | 'season-preference-question-and-answer'
  | 'season-clue-and-reasoning';

export interface Grade2Term2EnglishUnit03SupplementalActivity {
  difficulty: Difficulty;
  sourceUnitId: string;
  knowledgePointIds: Grade2Term2EnglishUnit03KnowledgePointId[];
  activity: ChoiceActivityDefinition;
}

interface Draft {
  knowledgePointIds: Grade2Term2EnglishUnit03KnowledgePointId[];
  prompt: string;
  answer: string;
  distractors: [string, string];
  hint: string;
  explanation: string;
}

const sourceUnitId = 'grade-2/term-2/english/unit-03';
const idPrefix = 'challenge-supplement-grade-2-term-2-english-unit-03';
const seasons: Grade2Term2EnglishUnit03KnowledgePointId = 'season-vocabulary';
const weather: Grade2Term2EnglishUnit03KnowledgePointId = 'season-weather-description';
const preference: Grade2Term2EnglishUnit03KnowledgePointId = 'season-preference-question-and-answer';
const reasoning: Grade2Term2EnglishUnit03KnowledgePointId = 'season-clue-and-reasoning';

const q = (
  knowledgePointIds: Grade2Term2EnglishUnit03KnowledgePointId[],
  prompt: string,
  answer: string,
  distractors: [string, string],
  hint: string,
  explanation: string,
): Draft => ({ knowledgePointIds, prompt, answer, distractors, hint, explanation });

const drafts: Record<Difficulty, Draft[]> = {
  basic: [
    q([seasons], '季节记录卡要给“春天”贴英文标签，哪张词卡合适？', 'spring', ['summer', 'autumn'], '先核对这张卡表示的季节名称。', 'spring 表示春天。'),
    q([seasons], '词卡 winter 对应哪一个季节？', '冬天', ['夏天', '秋天'], '把 winter 和本单元的四季中文名称逐一核对。', 'winter 表示冬天。'),
    q([seasons], '两张季节卡按“夏天、秋天”的顺序排列，哪组英文标签也保持了这个顺序？', 'summer；autumn', ['autumn；summer', 'summer；winter'], '先找到 summer 和 autumn，再按照题目给出的顺序检查。', 'summer 表示夏天，autumn 表示秋天。'),
    q([seasons], '小组按照提示“春天、夏天、秋天、冬天”放置四张卡，哪组英文名称符合提示顺序？', 'spring、summer、autumn、winter', ['spring、autumn、summer、winter', 'winter、spring、summer、autumn'], '题目已经给出顺序，逐个换成对应的英文季节词。', '四个词依次表示春天、夏天、秋天和冬天。'),
    q([weather, reasoning], '季节词卡要保留英文 warm，后面却贴着“凉爽的”，哪项中文释义修改正确？', '把“凉爽的”改成“暖和的”。', ['把“凉爽的”改成“寒冷的”。', '把“凉爽的”改成“炎热的”。'], '保留 warm 这个英文词，再核对它对应的中文意思。', 'warm 表示暖和的，不是凉爽的。'),
    q([weather, reasoning], '夏天记录是炎热，但句子写成 It is cold in summer.；只改天气词，哪项能修正句子？', '把 cold 改成 hot。', ['把 cold 改成 cool。', '把 summer 改成 winter。'], '保留 summer，只替换与炎热线索不符的天气词。', 'hot 表示炎热；把 cold 改成 hot 后，句子与夏天记录相符。'),
    q([weather, reasoning], '天气词卡要分成“暖和或炎热”与“凉爽或寒冷”两栏，哪组分类正确？', '暖和或炎热：warm、hot；凉爽或寒冷：cool、cold', ['暖和或炎热：warm、cold；凉爽或寒冷：hot、cool', '暖和或炎热：cool、cold；凉爽或寒冷：warm、hot'], '逐个核对 warm、hot、cool、cold 的中文意思。', 'warm 和 hot 表示暖和、炎热；cool 和 cold 表示凉爽、寒冷。'),
    q([preference], '同学选秋天作为自己最喜欢的季节，要用 I like ... best. 介绍，哪句合适？', 'I like autumn best.', ['I like winter best.', 'I like summer best.'], '保留句型 I like ... best.，再放入同学选的季节。', '把 autumn 放进 I like ... best.，表达最喜欢秋天。'),
    q([preference], '心愿卡要写“我最喜欢春天”，哪句话能准确表达这个意思？', 'I like spring best.', ['I like summer best.', 'I like winter best.'], '注意 best 表示“最喜欢”，再检查季节是否为春天。', 'I like spring best. 表示“我最喜欢春天”。'),
    q([preference], '把“我最喜欢的季节是冬天”写成英文，哪句合适？', 'My favourite season is winter.', ['My favourite season is autumn.', 'My favourite season is summer.'], '保留 favourite season is ... 的句型，并核对 winter。', 'My favourite season is winter. 表示“我最喜欢的季节是冬天”。'),
    q([preference], '采访时想问朋友最喜欢哪个季节，哪句是合适的问句？', 'Which season do you like best?', ['What season is it today?', 'Spring is warm.'], '找询问喜好的问句；不要选询问今天季节或描述天气的句子。', 'Which season do you like best? 用来询问最喜欢的季节。'),
    q([preference], '采访记录写着“问：你最喜欢哪个季节？答：我最喜欢夏天。”哪组对话问答相配？', 'A: Which season do you like best? B: I like summer best.', ['A: Which season do you like best? B: I like winter best.', 'A: What season is it today? B: I like summer best.'], '分别核对问题是否询问喜好，以及回答是否选了夏天。', '问句询问最喜欢的季节，回答表达最喜欢夏天。'),
    q([weather], '天气词卡要写出 warm、windy 的中文意思，哪组对应顺序正确？', 'warm—暖和的；windy—有风的', ['warm—凉爽的；windy—有风的', 'warm—暖和的；windy—寒冷的'], '分别核对两个天气词的意思，再检查顺序。', 'warm 表示暖和的，windy 表示有风的。'),
    q([weather, seasons, reasoning], '句子练习要求使用 It is ... in ... 结构，内容是“冬天寒冷、春天暖和”。哪组短句符合要求？', 'It is cold in winter.；It is warm in spring.', ['It is warm in winter.；It is cold in spring.', 'Winter is cold.；Spring is warm.'], '先核对两季的天气，再检查句子是否都使用指定结构。', '两句都使用 It is ... in ... 结构，并分别对应冬冷、春暖。'),
  ],
  advanced: [
    q([seasons, weather, reasoning], '两张观察卡分别是“秋天、凉爽”和“冬天、寒冷”，哪组句子按卡片顺序都匹配？', 'Autumn is cool.；Winter is cold.', ['Autumn is cold.；Winter is cool.', 'Autumn is hot.；Winter is warm.'], '分别核对季节名称和天气词，再保留卡片顺序。', '秋天凉爽对应 Autumn is cool.；冬天寒冷对应 Winter is cold.'),
    q([weather, reasoning], '季节墙上秋天卡写着“凉爽”，旁边却贴了 Autumn is hot.。只改天气词，哪项能修正这句？', '把 hot 改成 cool。', ['把 Autumn 改成 Winter。', '把 hot 改成 warm。'], '保留正确的季节，只替换与凉爽线索不符的天气词。', 'cool 表示凉爽，应把 hot 改为 cool。'),
    q([preference, weather], '季节展示板分“喜好表达”和“天气描述”两栏，哪项分类正确？', '喜好表达：I like summer best.；天气描述：Summer is hot.', ['喜好表达：Summer is hot.；天气描述：I like summer best.', '喜好表达：summer;天气描述：Which season do you like best?'], '看句子表达的是个人喜好，还是季节天气特点。', 'I like summer best. 表达喜好；Summer is hot. 描述季节天气。'),
    q([weather, seasons, reasoning], '季节观察表写“春天暖和、冬天寒冷”，哪组报告没有把两条天气信息对调？', 'Spring is warm.；Winter is cold.', ['Spring is cold.；Winter is warm.', 'Spring is hot.；Winter is cool.'], '按表格分别核对 spring/winter 与 warm/cold。', '春天对应 warm，冬天对应 cold；正确选项保持了两组对应关系。'),
    q([weather, seasons, reasoning], '春天记录同时注明暖和和有风。哪组短句分别说出了这两个特点？', 'Spring is warm.；It is windy in spring.', ['Spring is cold.；It is windy in spring.', 'Spring is warm.；It is rainy in winter.'], '把天气记录分成两项，再逐句检查季节和天气词。', 'Spring is warm. 说春天暖和；It is windy in spring. 说春天有风。'),
    q([preference], '活动单只要求问朋友最喜欢的季节，不询问今天是什么季节。哪句符合要求？', 'Which season do you like best?', ['What season is it today?', 'Spring is warm.'], '关注问题要了解的是个人喜好，而不是天气描述。', 'Which season do you like best? 询问个人最喜欢的季节。'),
    q([preference, seasons], '两位同学的记录是：Mia 最喜欢秋天，Leo 最喜欢冬天。哪组介绍按 Mia、Leo 的顺序正确？', 'Mia: My favourite season is autumn.；Leo: My favourite season is winter.', ['Mia: My favourite season is winter.；Leo: My favourite season is autumn.', 'Mia: I like summer best.；Leo: I like spring best.'], '逐项核对两个人的名字和最喜欢的季节。', 'Mia 对应 autumn，Leo 对应 winter；正确选项按记录顺序介绍。'),
    q([preference, seasons], '季节喜好卡的选择是 winter，哪句既使用 favourite season 句型又保留了这个选择？', 'My favourite season is winter.', ['My favourite season is summer.', 'My favourite season is spring.'], '先找 favourite season is ... 结构，再核对冬天对应 winter。', 'winter 是冬天；句子完整表达最喜欢的季节是冬天。'),
    q([weather, seasons, reasoning], '两条天气线索依次是“夏天炎热”“秋天凉爽”，哪组句子按线索顺序正确？', 'It is hot in summer.；Autumn is cool.', ['It is cool in summer.；Autumn is hot.', 'It is hot in winter.；Spring is cool.'], '逐条核对 hot/summer 和 cool/autumn，再保留顺序。', '夏天炎热对应 It is hot in summer.；秋天凉爽对应 Autumn is cool.'),
    q([seasons], '秋天和冬天的词卡拼写需要校对，哪组能同时把 autum、wintr 改正确？', 'autumn、winter', ['autumn、wintr', 'autum、winter'], '对照四季词卡，分别检查两个季节词的字母顺序。', '秋天拼写为 autumn，冬天拼写为 winter。'),
    q([preference, reasoning], '同伴问最喜欢哪个季节，回答卡标的是 autumn。哪组问答的交流目的和季节信息都合适？', 'A: Which season do you like best? B: I like autumn best.', ['A: Which season do you like best? B: I like summer best.', 'A: What season is it today? B: I like autumn best.'], '先检查问句是否询问喜好，再核对回答里的季节。', '问句询问最喜欢的季节，回答选择 autumn。'),
    q([seasons, weather, reasoning], '天气观察卡不是让你猜季节，而是要求按“冬天、春天”顺序描述“冷、暖和”。哪组短句符合卡片？', 'Winter is cold.；Spring is warm.', ['Winter is warm.；Spring is cold.', 'Summer is hot.；Autumn is cool.'], '题目已给出季节和天气的顺序，逐条检查对应关系。', 'Winter is cold. 对应冬天寒冷；Spring is warm. 对应春天暖和。'),
    q([preference, weather], '校对员要检查哪项是季节喜好表达、哪项是天气句，哪组标注准确？', 'I like spring best. 是喜好表达；Spring is warm. 是天气描述。', ['I like spring best. 是天气描述；Spring is warm. 是喜好表达。', 'spring 是喜好问句；Which season do you like best? 是天气描述。'], '分别看句子是否说“喜欢”，或是否描述季节天气。', 'I like spring best. 表达喜好；Spring is warm. 描述春天天气。'),
    q([preference, seasons], '一张采访卡记录朋友最喜欢春天，另一张要求用 favourite season 介绍同一选择。哪组两句保持了相同的季节？', 'I like spring best.；My favourite season is spring.', ['I like spring best.；My favourite season is winter.', 'I like autumn best.；My favourite season is summer.'], '比较两句话中出现的季节词是否都与春天记录相同。', '两句都保留 spring，分别用 like ... best 和 favourite season 表达喜好。'),
  ],
  high: [
    q([seasons, weather, reasoning], '季节向导要介绍“春天暖和、夏天炎热”，哪份双句介绍的季节和天气都准确？', 'Spring is warm.；Summer is hot.', ['Spring is hot.；Summer is warm.', 'Spring is cold.；Summer is cool.'], '核对两张卡的季节，再检查 warm 和 hot 是否放对位置。', '春天暖和，夏天炎热；正确选项逐项对应两张卡。'),
    q([weather, reasoning], '天气检查表说冬天寒冷；记录员写了 Winter is hot.。只修正错误的天气词，哪项合适？', '把 hot 改成 cold。', ['把 Winter 改成 Summer。', '把 hot 改成 warm。'], '保持 winter 不变，只找与“寒冷”线索不符的词。', 'cold 表示寒冷，应把 hot 改成 cold。'),
    q([preference, seasons], '访谈表记录 Ava 最喜欢夏天、Ben 最喜欢秋天。哪组介绍既按姓名顺序，也没有交换季节？', 'Ava: I like summer best.；Ben: I like autumn best.', ['Ava: I like autumn best.；Ben: I like summer best.', 'Ava: My favourite season is winter.；Ben: I like spring best.'], '先核对姓名顺序，再逐人核对最喜欢的季节。', 'Ava 对应 summer，Ben 对应 autumn；正确选项保留两条记录。'),
    q([preference, weather, reasoning], '介绍卡要求先提问“最喜欢哪个季节”，再说明“春天暖和”。哪组内容顺序符合要求？', 'Which season do you like best?；Spring is warm.', ['Spring is warm.；Which season do you like best?', 'Which season do you like best?；Winter is cold.'], '先确认第一句是喜好问句，再核对第二句是否描述记录里的春天。', '先询问季节喜好，再用 Spring is warm. 介绍记录中的天气特点。'),
    q([weather, seasons, reasoning], '天气墙有两行：甲“autumn / cool”，乙“summer / hot”。哪组句子顺序对应两行记录？', 'Autumn is cool.；Summer is hot.', ['Autumn is hot.；Summer is cool.', 'Winter is cold.；Spring is warm.'], '逐行核对季节名称和天气词，答案还要保持甲、乙顺序。', '甲对应 Autumn is cool.，乙对应 Summer is hot.。'),
    q([preference, seasons], '同伴已经选了 winter，主持人要问喜好并记录回答。哪组对话完整且没有改动同伴的选择？', 'A: Which season do you like best? B: My favourite season is winter.', ['A: What season is it today? B: My favourite season is winter.', 'A: Which season do you like best? B: My favourite season is summer.'], '分别检查问题是否询问喜好、回答是否保留 winter。', '问句询问最喜欢的季节，回答记录为 winter。'),
    q([seasons, weather, reasoning], '季节卡顺序是“秋天、冬天、夏天”，天气提示依次是“凉爽、寒冷、炎热”。哪组报告同时保留顺序和搭配？', 'Autumn is cool.；Winter is cold.；Summer is hot.', ['Autumn is cold.；Winter is cool.；Summer is hot.', 'Summer is hot.；Autumn is cool.；Winter is cold.'], '把三张季节卡和三条天气提示逐项配对，再检查呈现顺序。', '正确句子依次对应秋天凉爽、冬天寒冷、夏天炎热。'),
    q([weather, reasoning], '向导稿已有 It is warm in spring.，观察卡还记录有风。只补上遗漏的天气信息，哪句合适？', 'It is windy in spring.', ['It is cool in spring.', 'It is windy in winter.'], '保留已经写出的暖和信息，只补充观察卡中的有风特点。', 'It is windy in spring. 补充了春天有风的信息。'),
    q([preference, reasoning], '采访者需要了解朋友最喜欢哪个季节；朋友的答题卡选了 autumn。哪组交流目的和回答一致？', 'A: Which season do you like best? B: I like autumn best.', ['A: Which season do you like best? B: I like winter best.', 'A: What season is it today? B: I like autumn best.'], '区分喜好问句和询问今天季节的问句，再核对回答。', 'A 询问喜好，B 说明最喜欢 autumn。'),
    q([weather, seasons, reasoning], '两条描述是“Spring is warm.” 和 “Winter is cold.”。哪项总结准确说明了两句中的季节天气关系？', 'spring 对应 warm，winter 对应 cold。', ['spring 对应 cold，winter 对应 warm。', 'summer 对应 warm，autumn 对应 cold。'], '分别在两句中找季节词和天气词，再配对总结。', '第一句是春天暖和，第二句是冬天寒冷。'),
    q([preference, weather, seasons], '季节介绍要包含“最喜欢的季节是秋天”和“秋天凉爽”两项。哪组句子都完成了要求？', 'My favourite season is autumn.；Autumn is cool.', ['My favourite season is winter.；Autumn is cool.', 'My favourite season is autumn.；Summer is hot.'], '第一句核对喜好，第二句核对秋天的天气描述。', '第一句表达最喜欢秋天，第二句描述秋天凉爽。'),
    q([preference, seasons, reasoning], '整理采访记录时发现一句话说“我最喜欢夏天”，另一项记录是“朋友最喜欢冬天”。哪组标签和句子能分别保留两项信息？', '我：I like summer best.；朋友：My favourite season is winter.', ['我：I like winter best.；朋友：My favourite season is summer.', '我：I like summer best.；朋友：My favourite season is spring.'], '分别核对“我”和“朋友”的选择，不要把两人的季节交换。', '正确选项保留我选 summer、朋友选 winter 两条信息。'),
    q([weather, seasons, reasoning], '季节小册按“暖和或炎热”记录春天、夏天，按“凉爽或寒冷”记录秋天、冬天。哪组四句都符合这些记录？', 'Spring is warm.；Summer is hot.；Autumn is cool.；Winter is cold.', ['Spring is cold.；Summer is cool.；Autumn is warm.；Winter is hot.', 'Spring is warm.；Summer is cool.；Autumn is hot.；Winter is cold.'], '逐句核对四季名称和 warm、hot、cool、cold 的搭配。', '四句依次对应春暖、夏热、秋凉、冬冷。'),
    q([preference, weather, reasoning], '介绍卡要求先问季节喜好，再说“我最喜欢春天，春天暖和”。哪组对话顺序和意思都合适？', 'A: Which season do you like best? B: I like spring best. Spring is warm.', ['A: I like spring best. Spring is warm. B: Which season do you like best?', 'A: Which season do you like best? B: I like winter best. Winter is cold.'], '先检查问句位置，再核对回答和天气句是否都对应春天。', '问句在前；回答表达最喜欢春天并说明春天暖和。'),
  ],
};

const correctPositionOffset: Record<Difficulty, number> = { basic: 0, advanced: 1, high: 2 };

function createActivity(difficulty: Difficulty, index: number, draft: Draft): Grade2Term2EnglishUnit03SupplementalActivity {
  const correctIndex = ((index + correctPositionOffset[difficulty]) % 3) as 0 | 1 | 2;
  const labels = [...draft.distractors];
  labels.splice(correctIndex, 0, draft.answer);
  return {
    difficulty,
    sourceUnitId,
    knowledgePointIds: [...draft.knowledgePointIds],
    activity: {
      id: `${idPrefix}-${difficulty}-${String(index + 1).padStart(2, '0')}`,
      kind: 'choice',
      prompt: draft.prompt,
      options: labels.map((label, optionIndex) => ({ id: `option-${optionIndex + 1}`, label })),
      correctOptionId: `option-${correctIndex + 1}`,
      hint: draft.hint,
      explanation: draft.explanation,
    },
  };
}

export const grade2Term2EnglishUnit03SupplementalActivities: Grade2Term2EnglishUnit03SupplementalActivity[] = (
  Object.entries(drafts) as Array<[Difficulty, Draft[]]>
).flatMap(([difficulty, activities]) => activities.map((activity, index) => createActivity(difficulty, index, activity)));
