import { buildEnglishUnit } from '../../../../grade-2/term-1/english/buildEnglishUnit';
import { lessonProfile, makeTask, phraseQuestion } from '../../../../grade-2/term-1/english/questionAuthoring';
// 主题边界依据固定册次目录；练习词为原创主题词，不声称逐词核验了教材页词表。
const profile1 = lessonProfile(
  [
    { word: 'shop', meaning: '商店' }, { word: 'how much', meaning: '（价钱）多少' },
    { word: 'only', meaning: '只；仅仅' }, { word: 'saleswoman', meaning: '女售货员' },
  ],
  [
    phraseQuestion('你不明白词语“shop”的意思，哪句可以请同伴解释？', ['What does shop mean?', 'Where is shop?', 'How are you?'], 0, '先说清你想询问词义；与同伴交流时还可以在句末加 please。 What does shop mean? 是完整、语序正确的词义问句。'),
    phraseQuestion('朋友问 “What does saleswoman mean?” 哪句回答了词义？', ['它的意思是“（价钱）多少”。', '它的意思是“只；仅仅”。', '它的意思是“女售货员”。'], 2, '回答词义时要核对英文词语和中文意思是否匹配。 “saleswoman”表示“女售货员”；另两个选项把其他词语的意思错配过来。'),
  ],
  ['购物和节目', '家务'],
  [
    { label: 'shop', categoryIndex: 0 }, { label: 'how much', categoryIndex: 0 },
    { label: 'chore', categoryIndex: 1 }, { label: 'sweep', categoryIndex: 1 },
  ],
  { prompt: '把词卡排成“我想了解这个词语”。', items: ['word', 'this', 'know', 'I', 'would', 'like', 'to', '.'], correctOrderIndices: [3, 4, 5, 6, 2, 1, 0, 7] },
);
const profile2 = lessonProfile(
  [
    { word: 'cartoons', meaning: '动画片' }, { word: 'news shows', meaning: '新闻节目' },
    { word: 'a lot', meaning: '很多' }, { word: 'chore', meaning: '家务' },
  ],
  [
    phraseQuestion('想表达“我认识词语“cartoons””，哪句语法正确？', ['I knows the word “cartoons”.', 'I am know the word “cartoons”.', 'I know the word “cartoons”.'], 2, '先找主语 I，再检查动词是否使用原形。 I know the word “cartoons”. 语序和动词形式正确。'),
    phraseQuestion('哪句正确地表达“我也认识词语“a lot””？', ['I also knows the word “a lot”.', 'I also know the word “a lot”.', 'I know also the word “a lot”.'], 1, 'also 放在主语后、主要动词前；I 后面用 know。 I also know the word “a lot”. 表达“我也认识这个词语”。'),
  ],
  ['购物和节目', '家务'],
  [
    { label: 'shop', categoryIndex: 0 }, { label: 'only', categoryIndex: 0 },
    { label: 'chore', categoryIndex: 1 }, { label: 'clean the room', categoryIndex: 1 },
  ],
  { prompt: '把词卡排成“这个词语对我来说是新的”。', items: ['to', 'new', 'word', 'is', 'This', 'me', '.'], correctOrderIndices: [4, 2, 3, 1, 0, 5, 6] },
);
const profile3 = lessonProfile(
  [
    { word: 'sweep', meaning: '扫' }, { word: 'clean the room', meaning: '打扫房间' },
    { word: 'wash', meaning: '洗' }, { word: 'help', meaning: '帮忙' },
  ],
  [
    phraseQuestion('A问：“Do you know the word “sweep”?” 哪句是合适的肯定简答？', ['Yes, it is.', 'Yes, I do.', 'Yes, I am.'], 1, 'Do you ...? 的肯定简答使用 do。 Do you ...? 的肯定简答是 Yes, I do.'),
    phraseQuestion('朋友说 “I know the word “wash”.” 你也想表达认识这个词语，哪句最合适？', ['I know the word “wash”, too.', 'I knows the word “wash”, too.', 'I am know the word “wash”, too.'], 0, 'I 后用 know；too 放在句末表示“也”。 I know the word “wash”, too. 语法正确并表达“我也认识这个词语”。'),
  ],
  ['购物和节目', '家务'],
  [
    { label: 'shop', categoryIndex: 0 }, { label: 'saleswoman', categoryIndex: 0 },
    { label: 'chore', categoryIndex: 1 }, { label: 'wash', categoryIndex: 1 },
  ],
  { prompt: '把词卡排成表达“我不认识这个词语”的句子。', items: ['word', 'the', 'not', 'I', 'know', 'do', '.'], correctOrderIndices: [3, 5, 2, 4, 1, 0, 6] },
);
const profile4 = lessonProfile(
  [
    { word: 'shop', meaning: '商店' }, { word: 'cartoons', meaning: '动画片' },
    { word: 'sweep', meaning: '扫' }, { word: 'how much', meaning: '（价钱）多少' },
  ],
  [
    phraseQuestion('原创便笺写着：“cartoons — 动画片”。哪句话准确报告便笺内容？', ['The note is about the word “cartoons”.', 'The note are about the word “cartoons”.', 'The note about is the word “cartoons”.'], 0, 'note 是单数，be 动词用 is；按便笺的词条报告主题。 The note is about the word “cartoons”. 正确表达便笺主题。'),
    phraseQuestion('小卡片把 “how much” 和 “（价钱）多少” 配在一起。判断卡片时应怎样做？', ['Change the word to a different topic.', 'Ignore the Chinese meaning.', 'Check that the English word and meaning match.'], 2, '核对词义对应关系，不能只看卡片上有英文。 “how much”和“（价钱）多少”相匹配，报告时应保留这组对应。'),
  ],
  ['购物和节目', '家务'],
  [
    { label: 'how much', categoryIndex: 0 }, { label: 'only', categoryIndex: 0 },
    { label: 'sweep', categoryIndex: 1 }, { label: 'clean the room', categoryIndex: 1 },
  ],
  { prompt: '把词卡排成提醒同伴先读便笺再核对词义的句子。', items: ['the', 'Read', 'note', 'first', '.'], correctOrderIndices: [1, 0, 2, 3, 4] },
);
const profile5 = lessonProfile(
  [
    { word: 'only', meaning: '只；仅仅' }, { word: 'a lot', meaning: '很多' },
    { word: 'wash', meaning: '洗' }, { word: 'saleswoman', meaning: '女售货员' },
  ],
  [
    phraseQuestion('小组要做一张介绍“只；仅仅”的卡片，哪项同时符合主题目标和词义准确这两个要求？', ['Copy a word without checking what it means.', 'Leave the card blank.', 'Use the word “only” with its correct meaning “只；仅仅”.'], 2, '选择同时符合主题目标且词义核对过的选项。 目标是介绍“只；仅仅”，应使用对应词语 “only” 并附上正确词义。'),
    phraseQuestion('资料中有“wash”和“saleswoman”两张词卡。要确保词形和词义都准确，哪种做法能同时做到？', ['Change the spelling to make them look alike.', 'Read each card, check its spelling and meaning, and then share.', 'Copy both cards without reading them.'], 1, '分享前逐张核对词形和词义。 逐张检查能发现拼写或词义不匹配，另外两种做法会增加错误。'),
  ],
  ['购物和节目', '家务'],
  [
    { label: 'how much', categoryIndex: 0 }, { label: 'saleswoman', categoryIndex: 0 },
    { label: 'sweep', categoryIndex: 1 }, { label: 'wash', categoryIndex: 1 },
  ],
  { prompt: '把词卡排成询问同伴能否一起核对卡片的问句。', items: ['check', 'Can', 'cards', 'the', 'we', 'together', '?'], correctOrderIndices: [1, 4, 0, 3, 2, 5, 6] },
);
const profile6 = lessonProfile(
  [
    { word: 'how much', meaning: '（价钱）多少' }, { word: 'news shows', meaning: '新闻节目' },
    { word: 'clean the room', meaning: '打扫房间' }, { word: 'help', meaning: '帮忙' },
  ],
  [
    phraseQuestion('你要向同伴介绍“新闻节目”，哪句语法完整，并且准确对应词卡意思？', ['This card about the word “news shows”.', 'This card is about the word “news shows”.', 'This card are about the word “news shows”.'], 1, 'This card 是单数主语，后面用 is。 This card is about the word “news shows”. 句子完整并对应主题词。'),
    phraseQuestion('同伴听完你介绍“help”后想继续了解。哪句既礼貌地邀请对方继续交流，又让对方选择接下来想了解的内容？', ['What would you like to know?', 'The card is ready.', 'I know the word.'], 0, '选择能把对话交给同伴并邀请其提出问题的完整问句。 What would you like to know? 自然地邀请同伴继续提问；第二句只说明卡片已准备好，第三句只说明自己认识这个词，二者都没有回应同伴的疑问。'),
  ],
  ['购物和节目', '家务'],
  [
    { label: 'only', categoryIndex: 0 }, { label: 'saleswoman', categoryIndex: 0 },
    { label: 'clean the room', categoryIndex: 1 }, { label: 'wash', categoryIndex: 1 },
  ],
  { prompt: '把词卡排成“这张卡片已经准备好了”。', items: ['ready', 'card', 'The', 'is', '.'], correctOrderIndices: [2, 1, 3, 0, 4] },
);
export const unit = buildEnglishUnit({
  grade: 5,
  term: 1,
  formalUnitNumber: null,
  entryId: 'review-02',
  type: 'review',
  title: 'Revision 2 · Units 4–6',
  sourceTopics: [
    '复习已开放 U4–U6：购物、电视节目与家务。',
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
