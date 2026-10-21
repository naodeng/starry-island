import { buildEnglishUnit } from '../../../../grade-2/term-1/english/buildEnglishUnit';
import { lessonProfile, makeTask, phraseQuestion } from '../../../../grade-2/term-1/english/questionAuthoring';
// 主题边界依据固定册次目录；练习词为原创主题词，不声称逐词核验了教材页词表。
const profile1 = lessonProfile(
  [
    { word: 'show around', meaning: '带领某人参观' }, { word: 'Queen’s Park', meaning: '皇后公园' },
    { word: 'art gallery', meaning: '美术馆' }, { word: 'public library', meaning: '公共图书馆' },
  ],
  [
    phraseQuestion('你不明白表达 show around（带领某人参观）的意思，哪句可以请同伴解释？', ['What does the expression ‘show around’ mean?', 'Where is show around?', 'How are you?'], 0, '“Show around”表示“带领某人参观”。“What does the expression ‘show around’ mean?” 是完整、语序正确的词义问句；与同伴交流时还可以在句末加 please。'),
    phraseQuestion('朋友问：“What does the phrase ‘public library’ mean?” 哪句回答了短语的意思？', ['它的意思是“皇后公园”。', '它的意思是“美术馆”。', '它的意思是“公共图书馆”。'], 2, '回答词义时要核对英文短语和中文意思是否匹配。“public library”表示“公共图书馆”；另两个选项把其他表达的意思错配过来。'),
  ],
  ['专名地点', '普通场所和区域'],
  [
    { label: 'Queen’s Park', categoryIndex: 0 }, { label: 'art gallery', categoryIndex: 1 },
    { label: 'downtown', categoryIndex: 1 }, { label: 'Lake Ontario', categoryIndex: 0 },
  ],
  { prompt: '把词卡排成“我想学习这个词语”。', items: ['word', 'this', 'learn', 'I', 'would', 'like', 'to', '.'], correctOrderIndices: [3, 4, 5, 6, 2, 1, 0, 7] },
);
const profile2 = lessonProfile(
  [
    { word: 'downtown', meaning: '市中心' }, { word: 'Lake Ontario', meaning: '安大略湖' },
    { word: 'stadium', meaning: '体育场' }, { word: 'an art gallery', meaning: '美术馆' },
  ],
  [
    phraseQuestion('想表达“我认识词语‘downtown’”，哪句语法正确？', ['I knows the word “downtown”.', 'I am know the word “downtown”.', 'I know the word “downtown”.'], 2, '先找主语 I，再检查动词是否使用原形。“I know the word ‘downtown’.” 语序和动词形式正确。'),
    phraseQuestion('哪句正确地表达“我也认识词语‘stadium’”？', ['I also knows the word “stadium”.', 'I also know the word “stadium”.', 'I know also the word “stadium”.'], 1, 'also 放在主语后、主要动词前；I 后面用 know。“I also know the word ‘stadium’.” 表达“我也认识这个词语”。'),
  ],
  ['专名地点', '普通场所和区域'],
  [
    { label: 'Queen’s Park', categoryIndex: 0 }, { label: 'public library', categoryIndex: 1 },
    { label: 'downtown', categoryIndex: 1 }, { label: 'a park', categoryIndex: 1 },
  ],
  { prompt: '把词卡排成“这个词语对我来说是新的”。', items: ['to', 'new', 'word', 'is', 'This', 'me', '.'], correctOrderIndices: [4, 2, 3, 1, 0, 5, 6] },
);
const profile3 = lessonProfile(
  [
    { word: 'a public library', meaning: '公共图书馆' }, { word: 'a park', meaning: '公园' },
    { word: 'the downtown area', meaning: '市中心区域' }, { word: 'a stadium', meaning: '体育场' },
  ],
  [
    phraseQuestion('A 问：“Do you know the expression ‘a public library’?” 哪句是合适的肯定简答？', ['Yes, it is.', 'Yes, I do.', 'Yes, I am.'], 1, 'Do you ...? 的肯定简答使用 do。“Do you know the expression ‘a public library’?” 的肯定简答是 “Yes, I do.”'),
    phraseQuestion('朋友说 “I know the expression ‘the downtown area’.” 你也想表达认识这个表达，哪句最合适？', ['I know the expression “the downtown area”, too.', 'I knows the expression “the downtown area”, too.', 'I am know the expression “the downtown area”, too.'], 0, 'I 后用 know；too 放在句末表示“也”。“I know the expression ‘the downtown area’, too.” 语法正确并表达“我也认识这个表达”。'),
  ],
  ['专名地点', '普通场所和区域'],
  [
    { label: 'Queen’s Park', categoryIndex: 0 }, { label: 'stadium', categoryIndex: 1 },
    { label: 'downtown', categoryIndex: 1 }, { label: 'the downtown area', categoryIndex: 1 },
  ],
  { prompt: '把词卡排成表达“我不认识这个词语”的句子。', items: ['word', 'the', 'not', 'I', 'know', 'do', '.'], correctOrderIndices: [3, 5, 2, 4, 1, 0, 6] },
);
const profile4 = lessonProfile(
  [
    { word: 'show around', meaning: '带领某人参观' }, { word: 'downtown', meaning: '市中心' },
    { word: 'a public library', meaning: '公共图书馆' }, { word: 'Queen’s Park', meaning: '皇后公园' },
  ],
  [
    phraseQuestion('原创便笺写着：“downtown — 市中心”。哪句话准确报告便笺内容？', ['The note is about the word “downtown”.', 'The note are about the word “downtown”.', 'The note about is the word “downtown”.'], 0, 'note 是单数，be 动词用 is；按便笺的词条报告主题。“The note is about the word ‘downtown’.” 正确表达便笺主题。'),
    phraseQuestion('小卡片把 “Queen’s Park” 和 “皇后公园” 配在一起。判断卡片时应怎样做？', ['Change the word to a different topic.', 'Ignore the Chinese meaning.', 'Check that the English word and meaning match.'], 2, '核对词义对应关系，不能只看卡片上有英文。 “Queen’s Park”和“皇后公园”相匹配，报告时应保留这组对应。'),
  ],
  ['专名地点', '普通场所和区域'],
  [
    { label: 'art gallery', categoryIndex: 1 }, { label: 'public library', categoryIndex: 1 },
    { label: 'Lake Ontario', categoryIndex: 0 }, { label: 'a park', categoryIndex: 1 },
  ],
  { prompt: '把词卡排成提醒同伴先读便笺再核对词义的句子。', items: ['the', 'Read', 'note', 'first', '.'], correctOrderIndices: [1, 0, 2, 3, 4] },
);
const profile5 = lessonProfile(
  [
    { word: 'art gallery', meaning: '美术馆' }, { word: 'stadium', meaning: '体育场' },
    { word: 'the downtown area', meaning: '市中心区域' }, { word: 'public library', meaning: '公共图书馆' },
  ],
  [
    phraseQuestion('小组要做一张介绍“美术馆”的卡片，哪项同时符合主题目标和词义准确这两个要求？', ['Copy a word without checking what it means.', 'Leave the card blank.', 'Use the expression “art gallery” with its correct meaning “美术馆”.'], 2, '选择同时符合主题目标且词义核对过的选项。目标是介绍“美术馆”，应使用对应表达“art gallery”并附上正确词义。'),
    phraseQuestion('资料中有“the downtown area”和“public library”两张词卡。要确保词形和词义都准确，哪种做法能同时做到？', ['Change the spelling to make them look alike.', 'Read each card, check its spelling and meaning, and then share.', 'Copy both cards without reading them.'], 1, '分享前逐张核对词形和词义。逐张检查能发现拼写或词义不匹配，另外两种做法会增加错误。'),
  ],
  ['专名地点', '普通场所和区域'],
  [
    { label: 'art gallery', categoryIndex: 1 }, { label: 'stadium', categoryIndex: 1 },
    { label: 'Lake Ontario', categoryIndex: 0 }, { label: 'the downtown area', categoryIndex: 1 },
  ],
  { prompt: '把词卡排成询问同伴能否一起核对卡片的问句。', items: ['check', 'Can', 'cards', 'the', 'we', 'together', '?'], correctOrderIndices: [1, 4, 0, 3, 2, 5, 6] },
);
const profile6 = lessonProfile(
  [
    { word: 'Queen’s Park', meaning: '皇后公园' }, { word: 'Lake Ontario', meaning: '安大略湖' },
    { word: 'a park', meaning: '公园' }, { word: 'a stadium', meaning: '体育场' },
  ],
  [
    phraseQuestion('你要向同伴介绍“安大略湖”，哪句语法完整，并且准确对应词卡名称？', ['This card about the name “Lake Ontario”.', 'This card is about the name “Lake Ontario”.', 'This card are about the name “Lake Ontario”.'], 1, 'This card 是单数主语，后面用 is。正确句子是 “This card is about the name ‘Lake Ontario’.”'),
    phraseQuestion('同伴听完你介绍“a stadium”后想继续了解。哪句既礼貌地邀请对方继续交流，又让对方选择接下来想了解的内容？', ['What would you like to know?', 'The card is ready.', 'I know the word.'], 0, '选择能把对话交给同伴并邀请其提出问题的完整问句。 What would you like to know? 自然地邀请同伴继续提问；第二句只说明卡片已准备好，第三句只说明自己认识这个词，二者都没有回应同伴的疑问。'),
  ],
  ['专名地点', '普通场所和区域'],
  [
    { label: 'Queen’s Park', categoryIndex: 0 }, { label: 'Lake Ontario', categoryIndex: 0 },
    { label: 'a park', categoryIndex: 1 }, { label: 'the downtown area', categoryIndex: 1 },
  ],
  { prompt: '把词卡排成“这张卡片已经准备好了”。', items: ['ready', 'card', 'The', 'is', '.'], correctOrderIndices: [2, 1, 3, 0, 4] },
);
export const unit = buildEnglishUnit({
  grade: 6,
  term: 2,
  formalUnitNumber: 2,
  entryId: 'unit-02',
  title: 'Unit 2 · All Around Me',
  sourceTopics: [
    '城市公共地点与地标；根据地名线索识别周边场所。',
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
