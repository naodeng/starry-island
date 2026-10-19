import { buildEnglishUnit } from '../../../../grade-2/term-1/english/buildEnglishUnit';
import { lessonProfile, makeTask, phraseQuestion } from '../../../../grade-2/term-1/english/questionAuthoring';
// 主题边界依据固定册次目录；练习词为原创主题词，不声称逐词核验了教材页词表。
const profile1 = lessonProfile(
  [
    { word: 'English-Chinese dictionary', meaning: '英汉词典' }, { word: 'shopping centre', meaning: '购物中心' },
    { word: 'shopping mall', meaning: '大型购物中心' }, { word: 'amazing', meaning: '令人惊叹的' },
  ],
  [
    phraseQuestion('你不明白词语“English-Chinese dictionary”的意思，哪句可以请同伴解释？', ['What does English-Chinese dictionary mean?', 'Where is English-Chinese dictionary?', 'How are you?'], 0, '先说清你想询问词义；与同伴交流时还可以在句末加 please。 What does English-Chinese dictionary mean? 是完整、语序正确的词义问句。'),
    phraseQuestion('朋友问 “What does amazing mean?” 哪句回答了词义？', ['它的意思是“购物中心”。', '它的意思是“大型购物中心”。', '它的意思是“令人惊叹的”。'], 2, '回答词义时要核对英文词语和中文意思是否匹配。 “amazing”表示“令人惊叹的”；另两个选项把其他词语的意思错配过来。'),
  ],
  ['购物场所', '词典、评价和美食'],
  [
    { label: 'shopping centre', categoryIndex: 0 }, { label: 'shopping mall', categoryIndex: 0 },
    { label: 'English-Chinese dictionary', categoryIndex: 1 }, { label: 'amazing', categoryIndex: 1 },
  ],
  { prompt: '把词卡排成“我想了解这个词语”。', items: ['word', 'this', 'know', 'I', 'would', 'like', 'to', '.'], correctOrderIndices: [3, 4, 5, 6, 2, 1, 0, 7] },
);
const profile2 = lessonProfile(
  [
    { word: 'hot pot', meaning: '火锅' }, { word: 'an English-Chinese dictionary', meaning: '一本英汉词典' },
    { word: 'a shopping centre', meaning: '一个购物中心' }, { word: 'a shopping mall', meaning: '一个大型购物中心' },
  ],
  [
    phraseQuestion('想表达“我认识词语“hot pot””，哪句语法正确？', ['I knows the word “hot pot”.', 'I am know the word “hot pot”.', 'I know the word “hot pot”.'], 2, '先找主语 I，再检查动词是否使用原形。 I know the word “hot pot”. 语序和动词形式正确。'),
    phraseQuestion('哪句正确地表达“我也认识词语“a shopping centre””？', ['I also knows the word “a shopping centre”.', 'I also know the word “a shopping centre”.', 'I know also the word “a shopping centre”.'], 1, 'also 放在主语后、主要动词前；I 后面用 know。 I also know the word “a shopping centre”. 表达“我也认识这个词语”。'),
  ],
  ['购物场所', '词典、评价和美食'],
  [
    { label: 'shopping centre', categoryIndex: 0 }, { label: 'a shopping centre', categoryIndex: 0 },
    { label: 'English-Chinese dictionary', categoryIndex: 1 }, { label: 'hot pot', categoryIndex: 1 },
  ],
  { prompt: '把词卡排成“这个词语对我来说是新的”。', items: ['to', 'new', 'word', 'is', 'This', 'me', '.'], correctOrderIndices: [4, 2, 3, 1, 0, 5, 6] },
);
const profile3 = lessonProfile(
  [
    { word: 'an amazing place', meaning: '一个令人惊叹的地方' }, { word: 'eat hot pot', meaning: '吃火锅' },
    { word: 'the shopping centre', meaning: '这家购物中心' }, { word: 'the hot pot', meaning: '这锅火锅' },
  ],
  [
    phraseQuestion('A问：“Do you know the word “an amazing place”?” 哪句是合适的肯定简答？', ['Yes, it is.', 'Yes, I do.', 'Yes, I am.'], 1, 'Do you ...? 的肯定简答使用 do。 Do you ...? 的肯定简答是 Yes, I do.'),
    phraseQuestion('朋友说 “I know the word “the shopping centre”.” 你也想表达认识这个词语，哪句最合适？', ['I know the word “the shopping centre”, too.', 'I knows the word “the shopping centre”, too.', 'I am know the word “the shopping centre”, too.'], 0, 'I 后用 know；too 放在句末表示“也”。 I know the word “the shopping centre”, too. 语法正确并表达“我也认识这个词语”。'),
  ],
  ['购物场所', '词典、评价和美食'],
  [
    { label: 'shopping centre', categoryIndex: 0 }, { label: 'a shopping mall', categoryIndex: 0 },
    { label: 'English-Chinese dictionary', categoryIndex: 1 }, { label: 'eat hot pot', categoryIndex: 1 },
  ],
  { prompt: '把词卡排成表达“我不认识这个词语”的句子。', items: ['word', 'the', 'not', 'I', 'know', 'do', '.'], correctOrderIndices: [3, 5, 2, 4, 1, 0, 6] },
);
const profile4 = lessonProfile(
  [
    { word: 'English-Chinese dictionary', meaning: '英汉词典' }, { word: 'hot pot', meaning: '火锅' },
    { word: 'an amazing place', meaning: '一个令人惊叹的地方' }, { word: 'shopping centre', meaning: '购物中心' },
  ],
  [
    phraseQuestion('原创便笺写着：“hot pot — 火锅”。哪句话准确报告便笺内容？', ['The note is about the word “hot pot”.', 'The note are about the word “hot pot”.', 'The note about is the word “hot pot”.'], 0, 'note 是单数，be 动词用 is；按便笺的词条报告主题。 The note is about the word “hot pot”. 正确表达便笺主题。'),
    phraseQuestion('小卡片把 “shopping centre” 和 “购物中心” 配在一起。判断卡片时应怎样做？', ['Change the word to a different topic.', 'Ignore the Chinese meaning.', 'Check that the English word and meaning match.'], 2, '核对词义对应关系，不能只看卡片上有英文。 “shopping centre”和“购物中心”相匹配，报告时应保留这组对应。'),
  ],
  ['购物场所', '词典、评价和美食'],
  [
    { label: 'shopping mall', categoryIndex: 0 }, { label: 'a shopping centre', categoryIndex: 0 },
    { label: 'amazing', categoryIndex: 1 }, { label: 'hot pot', categoryIndex: 1 },
  ],
  { prompt: '把词卡排成提醒同伴先读便笺再核对词义的句子。', items: ['the', 'Read', 'note', 'first', '.'], correctOrderIndices: [1, 0, 2, 3, 4] },
);
const profile5 = lessonProfile(
  [
    { word: 'shopping mall', meaning: '大型购物中心' }, { word: 'a shopping centre', meaning: '一个购物中心' },
    { word: 'the shopping centre', meaning: '这家购物中心' }, { word: 'amazing', meaning: '令人惊叹的' },
  ],
  [
    phraseQuestion('小组要做一张介绍“大型购物中心”的卡片，哪项同时符合主题目标和词义准确这两个要求？', ['Copy a word without checking what it means.', 'Leave the card blank.', 'Use the word “shopping mall” with its correct meaning “大型购物中心”.'], 2, '选择同时符合主题目标且词义核对过的选项。 目标是介绍“大型购物中心”，应使用对应词语 “shopping mall” 并附上正确词义。'),
    phraseQuestion('资料中有“the shopping centre”和“amazing”两张词卡。要确保词形和词义都准确，哪种做法能同时做到？', ['Change the spelling to make them look alike.', 'Read each card, check its spelling and meaning, and then share.', 'Copy both cards without reading them.'], 1, '分享前逐张核对词形和词义。 逐张检查能发现拼写或词义不匹配，另外两种做法会增加错误。'),
  ],
  ['购物场所', '词典、评价和美食'],
  [
    { label: 'shopping mall', categoryIndex: 0 }, { label: 'a shopping mall', categoryIndex: 0 },
    { label: 'amazing', categoryIndex: 1 }, { label: 'eat hot pot', categoryIndex: 1 },
  ],
  { prompt: '把词卡排成询问同伴能否一起核对卡片的问句。', items: ['check', 'Can', 'cards', 'the', 'we', 'together', '?'], correctOrderIndices: [1, 4, 0, 3, 2, 5, 6] },
);
const profile6 = lessonProfile(
  [
    { word: 'shopping centre', meaning: '购物中心' }, { word: 'an English-Chinese dictionary', meaning: '一本英汉词典' },
    { word: 'eat hot pot', meaning: '吃火锅' }, { word: 'the hot pot', meaning: '这锅火锅' },
  ],
  [
    phraseQuestion('你要向同伴介绍“一本英汉词典”，哪句语法完整，并且准确对应词卡意思？', ['This card about the word “an English-Chinese dictionary”.', 'This card is about the word “an English-Chinese dictionary”.', 'This card are about the word “an English-Chinese dictionary”.'], 1, 'This card 是单数主语，后面用 is。 This card is about the word “an English-Chinese dictionary”. 句子完整并对应主题词。'),
    phraseQuestion('同伴听完你介绍“the hot pot”后想继续了解。哪句既礼貌地邀请对方继续交流，又让对方选择接下来想了解的内容？', ['What would you like to know?', 'The card is ready.', 'I know the word.'], 0, '选择能把对话交给同伴并邀请其提出问题的完整问句。 What would you like to know? 自然地邀请同伴继续提问；第二句只说明卡片已准备好，第三句只说明自己认识这个词，二者都没有回应同伴的疑问。'),
  ],
  ['购物场所', '词典、评价和美食'],
  [
    { label: 'a shopping centre', categoryIndex: 0 }, { label: 'a shopping mall', categoryIndex: 0 },
    { label: 'hot pot', categoryIndex: 1 }, { label: 'eat hot pot', categoryIndex: 1 },
  ],
  { prompt: '把词卡排成“这张卡片已经准备好了”。', items: ['ready', 'card', 'The', 'is', '.'], correctOrderIndices: [2, 1, 3, 0, 4] },
);
export const unit = buildEnglishUnit({
  grade: 6,
  term: 2,
  formalUnitNumber: 6,
  entryId: 'unit-06',
  title: 'Unit 6 · Summer Vacation',
  sourceTopics: [
    '暑假购物与美食文化；识别购物地点、词典和特色食物。',
    '练习围绕目录主题设计原创词卡、问答、信息核对和简短表达；核心词卡已与固定快照附录单元词表对照；教材正文未逐页核对；扩展词不宣称来自原文。',
  ],
  basicTasks: [
    makeTask('认读与辨析主题词', '认读本主题的核心词汇，准确辨认英文形式和中文意思。', 'companion-01', profile1),
    makeTask('在短句中使用主题词', '根据词义和主题线索整理词语，并在简短句子中使用目标词。', 'companion-02', profile2),
  ],
  advancedTasks: [
    makeTask('在对话中选择合适表达', '结合熟悉的交流情境理解问答目的，选择自然且语法正确的表达。', 'companion-03', profile3),
    makeTask('阅读线索并准确转述', '从原创便笺或简单资料中找出与主题有关的信息，并避免超出材料作推断。', 'companion-04', profile4),
  ],
  highTasks: [
    makeTask('根据条件核对主题信息', '综合两个明确条件比较选项，选择符合主题目标的行动或信息。', 'companion-01', profile5),
    makeTask('组织表达并检查信息', '按交流目的组织简短表达，核对词义、语序和信息是否与情境一致。', 'companion-02', profile6),
  ],
});
