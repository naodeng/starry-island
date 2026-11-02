import type { ChoiceActivityDefinition, Difficulty } from '../../content/types';

export type Grade2Term2EnglishUnit02KnowledgePointId =
  | 'weather-condition-vocabulary'
  | 'weather-question-and-answer'
  | 'weather-report-sentences'
  | 'weather-clue-and-report-reasoning';

export interface Grade2Term2EnglishUnit02SupplementalActivity {
  difficulty: Difficulty;
  sourceUnitId: string;
  knowledgePointIds: Grade2Term2EnglishUnit02KnowledgePointId[];
  activity: ChoiceActivityDefinition;
}

interface Draft {
  knowledgePointIds: Grade2Term2EnglishUnit02KnowledgePointId[];
  prompt: string;
  answer: string;
  distractors: [string, string];
  hint: string;
  explanation: string;
}

const sourceUnitId = 'grade-2/term-2/english/unit-02';
const idPrefix = 'challenge-supplement-grade-2-term-2-english-unit-02';
const vocabulary: Grade2Term2EnglishUnit02KnowledgePointId = 'weather-condition-vocabulary';
const questions: Grade2Term2EnglishUnit02KnowledgePointId = 'weather-question-and-answer';
const reports: Grade2Term2EnglishUnit02KnowledgePointId = 'weather-report-sentences';
const reasoning: Grade2Term2EnglishUnit02KnowledgePointId = 'weather-clue-and-report-reasoning';

const q = (
  knowledgePointIds: Grade2Term2EnglishUnit02KnowledgePointId[],
  prompt: string,
  answer: string,
  distractors: [string, string],
  hint: string,
  explanation: string,
): Draft => ({ knowledgePointIds, prompt, answer, distractors, hint, explanation });

const drafts: Record<Difficulty, Draft[]> = {
  basic: [
    q([vocabulary], '天气墙要给“有风的”贴上英文标签，应该选哪一个？', 'windy', ['sunny', 'rainy'], '回想这个词卡在本单元里的中文意思。', 'windy 表示“有风的”。'),
    q([vocabulary], '天气词卡要表示“下雨的”，应选哪个英文词？', 'rainy', ['cloudy', 'sunny'], '检查哪个词对应雨天的天气描述。', 'rainy 表示“下雨的”。'),
    q([vocabulary], '小词典要同时核对晴朗和下雨两张卡，哪组中英文都正确？', 'sunny—晴朗的；rainy—下雨的', ['sunny—多云的；rainy—有风的', 'sunny—下雨的；rainy—晴朗的'], '逐张核对两项天气词的中文意思。', 'sunny 表示“晴朗的”，rainy 表示“下雨的”。'),
    q([vocabulary, reasoning], '天气词按两组整理：A“有阳光或下雨”，B“有风或多云”。哪组词卡分组正确？', 'A：sunny、rainy；B：windy、cloudy', ['A：sunny、cloudy；B：rainy、windy', 'A：windy、rainy；B：sunny、cloudy'], '先把天气词按中文意思分成两组，再检查字母顺序。', 'sunny 和 rainy 分在 A 组；windy 和 cloudy 分在 B 组。'),
    q([vocabulary, reasoning], '观察记录写着：天空被云遮住了，太阳看不清。哪张天气词卡最符合这条线索？', 'cloudy', ['sunny', 'rainy'], '依据天空中云的情况判断，不要把它和下雨混为一谈。', 'cloudy 表示“多云的”，与天空有云的线索相符。'),
    q([vocabulary], '校对员发现 windy 被写成“多云的”。哪项修改能修正这张词卡？', '把 windy 的意思改成“有风的”。', ['把 windy 的意思改成“晴朗的”。', '把 cloudy 的意思改成“有风的”。'], '先保留英文词，再核对它对应的中文意思。', 'windy 表示“有风的”；cloudy 才表示“多云的”。'),
    q([vocabulary], '播报员要按“多云、有风、晴朗”的顺序读出三张英文词卡，哪组顺序正确？', 'cloudy、windy、sunny', ['windy、sunny、cloudy', 'sunny、cloudy、windy'], '把每个中文天气词换成英文，再保留给定顺序。', '多云是 cloudy，有风是 windy，晴朗是 sunny。'),
    q([questions], '天气采访单要询问“今天天气怎么样？”，哪张卡应放进提问栏？', "What's the weather like today?", ['What day is it today?', 'What is your name?'], '选择询问天气情况的问句，不要选询问日期或姓名的句子。', "What's the weather like today? 用来询问今天天气。"),
    q([reports, reasoning], '天气图卡标着今天有雨，哪句完整报告和图卡相符？', "It's rainy today.", ["It's sunny today.", "It's cloudy today."], '先确认图卡的天气，再选择对应的完整报告句。', "It's rainy today. 表示“今天天气下雨”。"),
    q([reports, reasoning], '天气记录卡写着“sunny”，但配套句子写成 It\'s rainy today.；只修改句子，哪项能让它符合记录卡？', '把 rainy 改成 sunny。', ['把 rainy 改成 windy。', '把 rainy 改成 cloudy。'], '保留 sunny 记录卡，只替换报告中与它不符的天气词。', 'sunny 表示晴朗；把 rainy 改成 sunny 后，报告与记录卡一致。'),
    q([questions, reports], '两张问句卡里，哪张是在询问天气，而不是询问日期？', "What's the weather like?", ['What day is it today?', 'What is your name?'], '看问句想了解的是天气、日期还是姓名。', "What's the weather like? 用来询问天气情况。"),
    q([reports], '天气栏写着“北京、今天、有风”，哪句报告把地点、天气和时间都写对了？', "It's windy in Beijing today.", ["It's cloudy in Beijing today.", "It's windy in Shanghai today."], '逐项核对天气词、城市和 today 的位置。', "It's windy in Beijing today. 保留了北京、有风和今天这三项信息。"),
    q([reports, vocabulary], '天气卡上画着云，句子需要是一条完整报告而不是单个词。应该选择哪句？', "It's cloudy.", ['cloudy', "It's rainy."], '完整报告句要包含开头和天气描述。', "It's cloudy. 是完整句子；cloudy 单独出现时只是一个天气词。"),
    q([questions, reports], '对话卡：A 要询问今天天气；B 看到有雨的天气图。哪组对话的问答都合适？', "A: What's the weather like today? B: It's rainy today.", ["A: What day is it today? B: It's rainy today.", "A: What's the weather like today? B: It's sunny today."], '先检查A是否询问天气，再检查B是否与图卡相符。', 'A询问今天天气，B报告下雨；问句和回答都符合情境。'),
  ],
  advanced: [
    q([vocabulary, reasoning], '天气观察依次记录：天空晴朗、树叶被风吹动、正在下雨。哪组词按顺序匹配三条记录？', 'sunny、windy、rainy', ['cloudy、sunny、windy', 'rainy、cloudy、sunny'], '分别依据天空、树叶和降雨线索判断，再保留原顺序。', '晴朗是 sunny，树叶被风吹动对应 windy，下雨对应 rainy。'),
    q([vocabulary], '小组的四张天气词卡要和中文释义对齐，哪组三项都没有配错？', 'cloudy—多云的；windy—有风的；sunny—晴朗的', ['cloudy—晴朗的；windy—下雨的；sunny—有风的', 'cloudy—有风的；windy—晴朗的；sunny—多云的'], '逐个检查英文词的意思，不只看其中一张卡。', 'cloudy、windy 和 sunny 分别表示多云、有风和晴朗。'),
    q([vocabulary, reasoning], '天气图按“太阳被云遮住、树叶被风吹动、太阳明亮”排列。哪组天气词顺序符合三张图？', 'cloudy、windy、sunny', ['sunny、cloudy、rainy', 'windy、rainy、cloudy'], '逐张看图，再按图的排列顺序选词。', '云遮住太阳对应 cloudy，树叶被风吹对应 windy，阳光明亮对应 sunny。'),
    q([vocabulary, reasoning], '天气卡A写“有风”，卡B写“下雨”。哪组英文标签按A、B顺序正确？', 'windy；rainy', ['rainy；cloudy', 'cloudy；sunny'], '分别核对两张卡的中文天气词。', '有风是 windy，下雨是 rainy。'),
    q([reports, vocabulary, reasoning], '天气观察记录先写树叶被风吹动，后写天空正在下雨。哪组完整报告按这两条线索的顺序正确？', "It's windy today.；It's rainy today.", ["It's rainy today.；It's windy today.", "It's cloudy today.；It's rainy today."], '分别判断两条线索，再按观察记录的顺序检查报告句。', '树叶被风吹动对应 windy，下雨对应 rainy；报告顺序与记录一致。'),
    q([reports, reasoning], '树叶被风吹动，播报卡要用完整英文句描述天气。哪句合适？', "It's windy.", ["It's sunny.", "It's rainy."], '用树叶被风吹动的线索判断天气词。', "It's windy. 表示“有风”。"),
    q([reports, vocabulary, reasoning], '天气记录写着“上海、下雨、今天”。哪句报告准确保留三项信息？', "It's rainy in Shanghai today.", ["It's cloudy in Shanghai today.", "It's rainy in Beijing today."], '检查句子里的天气词、地点和 today 是否对应记录。', "It's rainy in Shanghai today. 与地点、天气和时间记录一致。"),
    q([reports, vocabulary, reasoning], '地图记录A是“上海、多云”，B是“北京、晴朗”。哪组报告按A、B顺序对应正确？', "It's cloudy in Shanghai today.；It's sunny in Beijing today.", ["It's sunny in Shanghai today.；It's cloudy in Beijing today.", "It's cloudy in Beijing today.；It's sunny in Shanghai today."], '先逐项对照城市和天气，再确认两句的顺序。', 'A对应上海多云，B对应北京晴朗；两句按记录顺序排列。'),
    q([reports, reasoning], `北京今天有风，但记录句写着“It's cloudy in Beijing today.”。只改天气词，应该怎样修正？`, '把 cloudy 改成 windy。', ['把 Beijing 改成 Shanghai。', '把 cloudy 改成 sunny。'], '保留正确的城市和时间，只修正与天气卡不符的部分。', '天气卡显示有风，应把 cloudy 改为 windy。'),
    q([questions], '天气主持人需要问“天气怎么样？”，而不是询问星期几。哪句适合放进提问栏？', "What's the weather like?", ['What day is it today?', "It's cloudy today."], '区分询问天气的问句和询问日期或报告天气的句子。', "What's the weather like? 询问天气情况。"),
    q([questions, reports, reasoning], '天气问题的答案卡显示“多云”。哪组问答的内容和句式都合适？', "A: What's the weather like today? B: It's cloudy today.", ["A: What day is it today? B: It's cloudy today.", "A: What's the weather like today? B: It's sunny today."], '先确认A问的是天气，再核对B与多云天气卡是否相符。', "A询问今天的天气；B用 It's cloudy today. 报告多云。"),
    q([reports, reasoning], '城市天气表记录“北京多云、上海有风”。哪组报告没有把城市和天气交换？', "It's cloudy in Beijing today.；It's windy in Shanghai today.", ["It's windy in Beijing today.；It's cloudy in Shanghai today.", "It's cloudy in Shanghai today.；It's windy in Beijing today."], '逐条检查地点和天气词，再按表格顺序核对。', '北京对应 cloudy，上海对应 windy；所选句子保留了表格内容。'),
    q([vocabulary, reports], '天气卡写着晴朗，哪一项是完整报告句，而不是单独的词卡？', "It's sunny today.", ['sunny', 'windy'], '完整报告要把天气词放进句子中。', "It's sunny today. 是完整报告句；sunny 和 windy 是天气词。"),
    q([questions, reports, vocabulary], '广播记录需要一条天气问句和一条下雨报告。哪组句子按“先问、后答”排列正确？', "What's the weather like today?；It's rainy today.", ["It's rainy today.；What's the weather like today?", "What's the weather like today?；It's sunny today."], '先看排列顺序，再确认天气报告和题目给出的雨天记录一致。', '问句在前，雨天报告在后；两句的天气信息和顺序都正确。'),
  ],
  high: [
    q([vocabulary, reports, reasoning], '播报单A记录“上海、下雨”，B记录“北京、多云”。哪组报告按A、B顺序都准确？', "A: It's rainy in Shanghai today.；B: It's cloudy in Beijing today.", ["A: It's cloudy in Shanghai today.；B: It's rainy in Beijing today.", "A: It's rainy in Beijing today.；B: It's cloudy in Shanghai today."], '两条记录都要核对城市、天气词和先后顺序。', 'A是上海下雨，B是北京多云；正确选项保留了两条记录。'),
    q([reports, reasoning], 'A栏记录正确：北京今天晴朗。B栏记录显示上海有风，但句子写成 cloudy。哪项只修正B栏？', 'A保留原句；B把 cloudy 改成 windy。', ['A把 sunny 改成 windy；B保留 cloudy。', 'A、B交换 Beijing 和 Shanghai。'], '保留已经正确的A栏，只改B栏里与天气卡不符的词。', 'A对应 sunny，正确；B对应 windy，因此只需把 cloudy 改成 windy。'),
    q([questions, reports], '天气展示牌要区分“询问天气”和“报告天气”，哪项分类正确？', "What's the weather like today? 是问句；It's rainy today. 是报告。", ["It's rainy today? 是问句；What's the weather like today. 是报告。", 'What day is it today? 是天气报告；sunny 是问句。'], '看每一项是在提问、报告，还是只写了一个天气词。', "What's the weather like today? 询问天气；It's rainy today. 报告天气。"),
    q([questions, vocabulary, reports], '天气采访卡给出下雨图，要求先提问，再报告图上的天气。哪组对话同时符合要求？', "A: What's the weather like? B: It's rainy.", ["A: What's the weather like? B: It's sunny.", "A: What is your name? B: It's rainy."], '分别核对A是否询问天气，以及B是否报告雨天。', 'A询问天气，B报告下雨，顺序与采访卡一致。'),
    q([vocabulary, reports, reasoning], '城市卡依次为“北京、有风”“上海、晴朗”。哪组句子按卡片顺序完整播报？', "It's windy in Beijing today.；It's sunny in Shanghai today.", ["It's sunny in Beijing today.；It's windy in Shanghai today.", "It's windy in Shanghai today.；It's sunny in Beijing today."], '逐张核对天气、地点，再保持北京卡在前、上海卡在后。', '北京有风，上海晴朗；两句依照卡片顺序报告天气。'),
    q([vocabulary, reports, reasoning], '天气校对员收到两项记录：甲“cloudy—多云”，乙“windy—晴朗”。哪项只改错的一项？', '甲保留；乙把“晴朗”改成“有风”。', ['甲把“多云”改成“有风”；乙保留。', '甲、乙两项的英文词互换。'], '分别核对两组中英文，只改不一致的一组。', 'cloudy—多云正确；windy 表示有风，应修正乙的中文意思。'),
    q([reports, vocabulary, reasoning], '上海的天气卡显示多云。报告需要包含天气、地点和 today，哪句同时满足三项要求？', "It's cloudy in Shanghai today.", ["It's sunny in Shanghai today.", "It's cloudy in Beijing today."], '逐项核对卡片上的天气和城市，再检查句子是否写出 today。', "It's cloudy in Shanghai today. 包含多云、上海和今天。"),
    q([questions, reports, reasoning], '同伴先问今天的天气，天气图显示有风。哪组记录既保留问句，又给出匹配的报告？', "What's the weather like today?；It's windy today.", ["What day is it today?；It's windy today.", "What's the weather like today?；It's cloudy today."], '先检查问句的目的，再对照天气图核对回答。', '问句询问今天天气，报告句与有风的图卡相符。'),
    q([reports, reasoning], '天气报告A的城市和时间都正确，但天气卡显示下雨；报告写成晴朗。最直接的修正是什么？', '把 sunny 改成 rainy。', ['把 sunny 改成 cloudy。', '把 sunny 改成 windy。'], '保留城市和时间，只替换与下雨图卡不符的天气词。', '下雨对应 rainy，因此应把 sunny 改成 rainy。'),
    q([vocabulary, reasoning], '分类板有“天气词”和“天气报告句”两栏。哪一组放置正确？', "天气词：windy；报告句：It's cloudy today.", ["天气词：It's cloudy today.；报告句：windy", "天气词：What's the weather like?；报告句：sunny"], '区分单个天气词、完整报告句和提问句。', "windy 是天气词，It's cloudy today. 是完整报告句。"),
    q([reports, vocabulary, reasoning], '天气登记表写着A“北京、晴朗”、B“上海、下雨”。哪项检查结论正确？', "两条报告依次是 It's sunny in Beijing today. 和 It's rainy in Shanghai today.", ["A写 It's rainy in Beijing today.；B写 It's sunny in Shanghai today.", "A写 It's sunny in Shanghai today.；B写 It's rainy in Beijing today."], '分别核对两座城市的天气，再检查A、B的顺序。', 'A对应北京晴朗，B对应上海下雨；两条完整报告都与登记表一致。'),
    q([questions, reports, vocabulary], '一张卡片要写天气问题，另一张卡片记录今天多云。哪组内容按“问题、报告”顺序正确？', "What's the weather like today?；It's cloudy today.", ["It's cloudy today.；What's the weather like today?", "What is your name?；It's rainy today."], '先判断哪句话提问，再核对报告是否表示多云。', "天气问句在前，It's cloudy today. 报告多云在后。"),
    q([vocabulary, reports, reasoning], '三张天气卡依次为“有风、晴朗、多云”，并都要写成简短报告。哪组句子顺序与卡片一致？', "It's windy.；It's sunny.；It's cloudy.", ["It's sunny.；It's cloudy.；It's windy.", "It's cloudy.；It's windy.；It's sunny."], '逐张把天气词放进报告句，并保留卡片顺序。', '三句依次报告有风、晴朗和多云，与三张卡一致。'),
    q([questions, reports, vocabulary, reasoning], '天气电台收到两张记录：北京多云、上海有风。主持人要先问天气，再按记录顺序播报两地。哪份稿件三项信息都对应？', "What's the weather like today?；It's cloudy in Beijing today.；It's windy in Shanghai today.", ["What's the weather like today?；It's windy in Beijing today.；It's cloudy in Shanghai today.", "What day is it today?；It's cloudy in Beijing today.；It's windy in Shanghai today."], '先检查开头是否询问天气，再逐句核对北京、上海和天气词。', '第一句询问天气；后两句依次报告北京多云和上海有风，顺序与记录一致。'),
  ],
};

const positionOffset: Record<Difficulty, number> = { basic: 0, advanced: 1, high: 2 };

function createActivity(difficulty: Difficulty, index: number, draft: Draft): Grade2Term2EnglishUnit02SupplementalActivity {
  const correctIndex = ((index + positionOffset[difficulty]) % 3) as 0 | 1 | 2;
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

export const grade2Term2EnglishUnit02SupplementalActivities: Grade2Term2EnglishUnit02SupplementalActivity[] = (
  Object.entries(drafts) as Array<[Difficulty, Draft[]]>
).flatMap(([difficulty, activities]) => activities.map((activity, index) => createActivity(difficulty, index, activity)));
