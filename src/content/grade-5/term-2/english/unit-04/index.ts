import { buildEnglishUnit } from '../../../../grade-2/term-1/english/buildEnglishUnit';
import { lessonProfile, makeTask, phraseQuestion } from '../../../../grade-2/term-1/english/questionAuthoring';
// 主题边界依据固定册次目录；练习词为原创主题词，不声称逐词核验了教材页词表。
const profile1 = lessonProfile(
  [
    { word: 'cleaned the window', meaning: '擦了窗户' }, { word: 'watched TV', meaning: '看了电视' },
    { word: 'climbed a hill', meaning: '爬了山' }, { word: 'visited grandparents', meaning: '看望了祖父母' },
  ],
  [
    phraseQuestion('你不明白词语“cleaned the window”的意思，哪句可以请同伴解释？', ['What does cleaned the window mean?', 'Where is cleaned the window?', 'How are you?'], 0, '先说清你想询问词义；与同伴交流时还可以在句末加 please。 What does cleaned the window mean? 是完整、语序正确的词义问句。'),
    phraseQuestion('朋友问 “What does visited grandparents mean?” 哪句回答了词义？', ['它的意思是“看了电视”。', '它的意思是“爬了山”。', '它的意思是“看望了祖父母”。'], 2, '回答词义时要核对英文词语和中文意思是否匹配。 “visited grandparents”表示“看望了祖父母”；另两个选项把其他词语的意思错配过来。'),
  ],
  ['出游和运动活动', '居家休闲活动'],
  [
    { label: 'climbed a hill', categoryIndex: 0 }, { label: 'jumped rope', categoryIndex: 0 },
    { label: 'watched TV', categoryIndex: 1 }, { label: 'played computer games', categoryIndex: 1 },
  ],
  { prompt: '把词卡排成“我想了解这个词语”。', items: ['word', 'this', 'know', 'I', 'would', 'like', 'to', '.'], correctOrderIndices: [3, 4, 5, 6, 2, 1, 0, 7] },
);
const profile2 = lessonProfile(
  [
    { word: 'danced', meaning: '跳舞了' }, { word: 'jumped rope', meaning: '跳了绳' },
    { word: 'listened to music', meaning: '听了音乐' }, { word: 'rowed a boat', meaning: '划了船' },
  ],
  [
    phraseQuestion('想表达“我认识词语“danced””，哪句语法正确？', ['I knows the word “danced”.', 'I am know the word “danced”.', 'I know the word “danced”.'], 2, '先找主语 I，再检查动词是否使用原形。 I know the word “danced”. 语序和动词形式正确。'),
    phraseQuestion('哪句正确地表达“我也认识词语“listened to music””？', ['I also knows the word “listened to music”.', 'I also know the word “listened to music”.', 'I know also the word “listened to music”.'], 1, 'also 放在主语后、主要动词前；I 后面用 know。 I also know the word “listened to music”. 表达“我也认识这个词语”。'),
  ],
  ['出游和运动活动', '居家休闲活动'],
  [
    { label: 'climbed a hill', categoryIndex: 0 }, { label: 'rowed a boat', categoryIndex: 0 },
    { label: 'watched TV', categoryIndex: 1 }, { label: 'stayed at home', categoryIndex: 1 },
  ],
  { prompt: '把词卡排成“这个词语对我来说是新的”。', items: ['to', 'new', 'word', 'is', 'This', 'me', '.'], correctOrderIndices: [4, 2, 3, 1, 0, 5, 6] },
);
const profile3 = lessonProfile(
  [
    { word: 'played computer games', meaning: '玩了电脑游戏' }, { word: 'stayed at home', meaning: '待在家里' },
    { word: 'played the piano', meaning: '弹了钢琴' }, { word: 'washed clothes', meaning: '洗了衣服' },
  ],
  [
    phraseQuestion('A问：“Do you know the word “played computer games”?” 哪句是合适的肯定简答？', ['Yes, it is.', 'Yes, I do.', 'Yes, I am.'], 1, 'Do you ...? 的肯定简答使用 do。 Do you ...? 的肯定简答是 Yes, I do.'),
    phraseQuestion('朋友说 “I know the word “played the piano”.” 你也想表达认识这个词语，哪句最合适？', ['I know the word “played the piano”, too.', 'I knows the word “played the piano”, too.', 'I am know the word “played the piano”, too.'], 0, 'I 后用 know；too 放在句末表示“也”。 I know the word “played the piano”, too. 语法正确并表达“我也认识这个词语”。'),
  ],
  ['出游和运动活动', '居家休闲活动'],
  [
    { label: 'climbed a hill', categoryIndex: 0 }, { label: 'danced', categoryIndex: 0 },
    { label: 'watched TV', categoryIndex: 1 }, { label: 'played the piano', categoryIndex: 1 },
  ],
  { prompt: '把词卡排成表达“我不认识这个词语”的句子。', items: ['word', 'the', 'not', 'I', 'know', 'do', '.'], correctOrderIndices: [3, 5, 2, 4, 1, 0, 6] },
);
const profile4 = lessonProfile(
  [
    { word: 'cleaned the window', meaning: '擦了窗户' }, { word: 'danced', meaning: '跳舞了' },
    { word: 'played computer games', meaning: '玩了电脑游戏' }, { word: 'watched TV', meaning: '看了电视' },
  ],
  [
    phraseQuestion('原创便笺写着：“danced — 跳舞了”。哪句话准确报告便笺内容？', ['The note is about the word “danced”.', 'The note are about the word “danced”.', 'The note about is the word “danced”.'], 0, 'note 是单数，be 动词用 is；按便笺的词条报告主题。 The note is about the word “danced”. 正确表达便笺主题。'),
    phraseQuestion('小卡片把 “watched TV” 和 “看了电视” 配在一起。判断卡片时应怎样做？', ['Change the word to a different topic.', 'Ignore the Chinese meaning.', 'Check that the English word and meaning match.'], 2, '核对词义对应关系，不能只看卡片上有英文。 “watched TV”和“看了电视”相匹配，报告时应保留这组对应。'),
  ],
  ['出游和运动活动', '居家休闲活动'],
  [
    { label: 'jumped rope', categoryIndex: 0 }, { label: 'rowed a boat', categoryIndex: 0 },
    { label: 'played computer games', categoryIndex: 1 }, { label: 'stayed at home', categoryIndex: 1 },
  ],
  { prompt: '把词卡排成提醒同伴先读便笺再核对词义的句子。', items: ['the', 'Read', 'note', 'first', '.'], correctOrderIndices: [1, 0, 2, 3, 4] },
);
const profile5 = lessonProfile(
  [
    { word: 'climbed a hill', meaning: '爬了山' }, { word: 'listened to music', meaning: '听了音乐' },
    { word: 'played the piano', meaning: '弹了钢琴' }, { word: 'visited grandparents', meaning: '看望了祖父母' },
  ],
  [
    phraseQuestion('小组要做一张介绍“爬了山”的卡片，哪项同时符合主题目标和词义准确这两个要求？', ['Copy a word without checking what it means.', 'Leave the card blank.', 'Use the word “climbed a hill” with its correct meaning “爬了山”.'], 2, '选择同时符合主题目标且词义核对过的选项。 目标是介绍“爬了山”，应使用对应词语 “climbed a hill” 并附上正确词义。'),
    phraseQuestion('资料中有“played the piano”和“visited grandparents”两张词卡。要确保词形和词义都准确，哪种做法能同时做到？', ['Change the spelling to make them look alike.', 'Read each card, check its spelling and meaning, and then share.', 'Copy both cards without reading them.'], 1, '分享前逐张核对词形和词义。 逐张检查能发现拼写或词义不匹配，另外两种做法会增加错误。'),
  ],
  ['出游和运动活动', '居家休闲活动'],
  [
    { label: 'jumped rope', categoryIndex: 0 }, { label: 'danced', categoryIndex: 0 },
    { label: 'played computer games', categoryIndex: 1 }, { label: 'played the piano', categoryIndex: 1 },
  ],
  { prompt: '把词卡排成询问同伴能否一起核对卡片的问句。', items: ['check', 'Can', 'cards', 'the', 'we', 'together', '?'], correctOrderIndices: [1, 4, 0, 3, 2, 5, 6] },
);
const profile6 = lessonProfile(
  [
    { word: 'watched TV', meaning: '看了电视' }, { word: 'jumped rope', meaning: '跳了绳' },
    { word: 'stayed at home', meaning: '待在家里' }, { word: 'washed clothes', meaning: '洗了衣服' },
  ],
  [
    phraseQuestion('你要向同伴介绍“跳了绳”，哪句语法完整，并且准确对应词卡意思？', ['This card about the word “jumped rope”.', 'This card is about the word “jumped rope”.', 'This card are about the word “jumped rope”.'], 1, 'This card 是单数主语，后面用 is。 This card is about the word “jumped rope”. 句子完整并对应主题词。'),
    phraseQuestion('同伴听完你介绍“washed clothes”后想继续了解。哪句既礼貌地邀请对方继续交流，又让对方选择接下来想了解的内容？', ['What would you like to know?', 'The card is ready.', 'I know the word.'], 0, '选择能把对话交给同伴并邀请其提出问题的完整问句。 What would you like to know? 自然地邀请同伴继续提问；第二句只说明卡片已准备好，第三句只说明自己认识这个词，二者都没有回应同伴的疑问。'),
  ],
  ['出游和运动活动', '居家休闲活动'],
  [
    { label: 'rowed a boat', categoryIndex: 0 }, { label: 'danced', categoryIndex: 0 },
    { label: 'stayed at home', categoryIndex: 1 }, { label: 'played the piano', categoryIndex: 1 },
  ],
  { prompt: '把词卡排成“这张卡片已经准备好了”。', items: ['ready', 'card', 'The', 'is', '.'], correctOrderIndices: [2, 1, 3, 0, 4] },
);
export const unit = buildEnglishUnit({
  grade: 5,
  term: 2,
  formalUnitNumber: 4,
  entryId: 'unit-04',
  title: 'Unit 4 · Last Weekend',
  sourceTopics: [
    '谈论上周末做过的活动，理解一般过去时常见动词形式和时间线索。',
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
