import { buildEnglishUnit } from '../../../../grade-2/term-1/english/buildEnglishUnit';
import { lessonProfile, makeTask, phraseQuestion } from '../../../../grade-2/term-1/english/questionAuthoring';

const recognizingHobbyWords = lessonProfile(
  [
    { word: 'reading books', meaning: '读书' },
    { word: 'skateboarding', meaning: '玩滑板' },
    { word: 'drawing pictures', meaning: '画画' },
    { word: 'making models', meaning: '制作模型' },
  ],
  [
    phraseQuestion('兴趣卡写着：孩子在安静时喜欢翻读故事书。哪项最符合这张卡？', ['Reading books.', 'Skateboarding.', 'Making models.'], 0, '翻读故事书对应 reading books。'),
    phraseQuestion('看这组单词：sing、ring、song。它们都以哪两个字母结尾？', ['sh', 'ng', 'ck'], 1, 'sing、ring 和 song 的末尾都有字母 ng。'),
  ],
  ['兴趣活动', '收集物品'],
  [
    { label: 'reading books', categoryIndex: 0 }, { label: 'skateboarding', categoryIndex: 0 },
    { label: 'stamps', categoryIndex: 1 }, { label: 'erasers', categoryIndex: 1 },
  ],
  { prompt: '把词卡排成“我喜欢画画”。', items: ['pictures', '.', 'drawing', 'like', 'I'], correctOrderIndices: [4, 3, 2, 0, 1] },
);

const askingAndAnsweringAboutHobbies = lessonProfile(
  [
    { word: 'doing jigsaw puzzles', meaning: '拼拼图' },
    { word: 'collecting erasers', meaning: '收集橡皮' },
    { word: 'singing', meaning: '唱歌' },
    { word: 'dancing', meaning: '跳舞' },
  ],
  [
    phraseQuestion('你想了解新同学的兴趣爱好，应该问哪句话？', ['What is your name?', 'What are your hobbies?', 'Where do you live?'], 1, 'What are your hobbies? 是询问对方兴趣爱好的表达。'),
    phraseQuestion('朋友问：“What are your hobbies?” 哪句话直接回答了兴趣爱好？', ['I am nine years old.', 'I like doing jigsaw puzzles.', 'This is my notebook.'], 1, 'I like doing jigsaw puzzles. 说明了自己喜欢的活动。'),
  ],
  ['询问兴趣', '介绍兴趣'],
  [
    { label: 'What are your hobbies?', categoryIndex: 0 }, { label: 'I like singing.', categoryIndex: 1 },
    { label: 'My hobby is dancing.', categoryIndex: 1 }, { label: 'I like doing jigsaw puzzles.', categoryIndex: 1 },
  ],
  { prompt: '把词卡排成“你的兴趣爱好是什么？”', items: ['your', 'hobbies', 'are', 'What', '?'], correctOrderIndices: [3, 2, 0, 1, 4] },
);

const reportingAHobbySurvey = lessonProfile(
  [
    { word: 'often', meaning: '经常' },
    { word: 'never', meaning: '从不' },
    { word: 'fishing', meaning: '钓鱼' },
    { word: 'collecting stamps', meaning: '集邮' },
  ],
  [
    phraseQuestion('社团调查记录：Nina 勾选了 reading 和 fishing；Sam 只勾选了 reading。哪句报告准确？', ['Nina likes reading and fishing.', 'Nina like reading and fishing.', 'Sam likes reading and fishing.'], 0, '调查表里 Nina 勾选了两项；描述一位同学的兴趣时用 likes。'),
    phraseQuestion('Eli 的记录写着：“I often go fishing on Sunday. I never go fishing on Monday.” 记录里，Eli 经常在哪天去钓鱼？', ['On Monday.', 'On Sunday.', 'Every day.'], 1, 'often 表示经常；记录明确说他经常在星期日钓鱼，从不在星期一去。'),
  ],
  ['主语搭配 likes', '主语搭配 like'],
  [
    { label: 'Mona likes fishing.', categoryIndex: 0 }, { label: 'My cousins like reading.', categoryIndex: 1 },
    { label: 'I like drawing.', categoryIndex: 1 }, { label: 'Dad likes collecting stamps.', categoryIndex: 0 },
  ],
  { prompt: '把词卡排成“Tara 经常在星期日去钓鱼”。', items: ['Tara', 'often', 'goes', 'fishing', 'on', 'Sunday', '.'], correctOrderIndices: [0, 1, 2, 3, 4, 5, 6] },
);

const readingHobbyNotes = lessonProfile(
  [
    { word: 'drawing pictures', meaning: '画画' },
    { word: 'making models', meaning: '制作模型' },
    { word: 'stickers', meaning: '贴纸' },
    { word: 'stamps', meaning: '邮票' },
  ],
  [
    phraseQuestion('兴趣记录：Evan 用纸片做小船模型；Mira 在笔记本里画图。谁喜欢画画？', ['Evan.', 'Mira.', 'Both Evan and Mira.'], 1, '记录把画图这项活动和 Mira 联系在一起；Evan 做的是模型。'),
    phraseQuestion('社团卡片写着：“Nora 每周把新贴纸放进收藏册。” Nora 喜欢什么？', ['Collecting stickers.', 'Fishing.', 'Singing.'], 0, '把新贴纸放进收藏册说明她喜欢收集贴纸。'),
  ],
  ['创作活动', '可收集的物品'],
  [
    { label: 'making models', categoryIndex: 0 }, { label: 'drawing pictures', categoryIndex: 0 },
    { label: 'stamps', categoryIndex: 1 }, { label: 'stickers', categoryIndex: 1 },
  ],
  { prompt: '把词卡排成“我的朋友喜欢画画”。', items: ['pictures', '.', 'likes', 'My', 'drawing', 'friend'], correctOrderIndices: [3, 5, 2, 4, 0, 1] },
);

const planningAHobbyDay = lessonProfile(
  [
    { word: 'playing the guitar', meaning: '弹吉他' },
    { word: 'acting', meaning: '表演' },
    { word: 'painting', meaning: '绘画' },
    { word: 'ping-pong', meaning: '乒乓球' },
  ],
  [
    phraseQuestion('兴趣日安排：绘画桌开放时间是 3:00—3:20，吉他角是 3:20—3:40。小安想先画画，再弹吉他。哪份安排可行？', ['Play guitar at 3:00, then paint at 3:20.', 'Paint at 3:00, then play guitar at 3:20.', 'Paint at 3:20, then play guitar at 3:00.'], 1, '先参加 3:00 开始的绘画活动，再参加 3:20 开始的吉他活动，符合她的顺序要求。'),
    phraseQuestion('小组展示要求每人介绍一种舞台表演兴趣和一种运动兴趣。哪一组符合要求？', ['Painting and collecting stamps.', 'Playing ping-pong and skateboarding.', 'Acting and playing ping-pong.'], 2, '表演和乒乓球分别符合舞台表演兴趣与运动兴趣。'),
  ],
  ['舞台表演兴趣', '运动兴趣'],
  [
    { label: 'playing the guitar', categoryIndex: 0 }, { label: 'acting', categoryIndex: 0 },
    { label: 'playing ping-pong', categoryIndex: 1 }, { label: 'skateboarding', categoryIndex: 1 },
  ],
  { prompt: '把词卡排成“先画一幅画，然后打乒乓球”。', items: ['First,', 'paint', 'a', 'picture.', 'Then,', 'play', 'ping-pong.'], correctOrderIndices: [0, 1, 2, 3, 4, 5, 6] },
);

const followingAHobbyStory = lessonProfile(
  [
    { word: 'collecting stamps', meaning: '集邮' },
    { word: 'making models', meaning: '制作模型' },
    { word: 'singing songs', meaning: '唱歌' },
    { word: 'stickers', meaning: '贴纸' },
  ],
  [
    phraseQuestion('社团展示记录：Ari 先写好姓名卡，接着把模型飞机放上展示桌，最后向同学介绍制作模型的兴趣。哪件事第二发生？', ['Ari writes his name card.', 'Ari puts the model plane on the table.', 'Ari talks about making models.'], 1, '记录用“先、接着、最后”标出了顺序；把模型放上桌发生在中间。'),
    phraseQuestion('Mia 带来邮票册，还说自己每周都会把新邮票放进去。哪句话最符合这些线索？', ['Mia likes collecting stamps.', 'Mia likes playing ping-pong.', 'Mia likes drawing pictures.'], 0, '邮票册和不断加入新邮票说明 Mia 喜欢集邮。'),
  ],
  ['兴趣活动', '可收集的物品'],
  [
    { label: 'making models', categoryIndex: 0 }, { label: 'singing songs', categoryIndex: 0 },
    { label: 'stamps', categoryIndex: 1 }, { label: 'stickers', categoryIndex: 1 },
  ],
  { prompt: '把词卡排成“我们喜欢放学后制作模型”。', items: ['school.', 'models', 'after', 'like', 'We', 'making'], correctOrderIndices: [4, 3, 5, 1, 2, 0] },
);

export const unit = buildEnglishUnit({
  grade: 4,
  term: 2,
  formalUnitNumber: 4,
  entryId: 'unit-04',
  title: 'Unit 4 · Hobbies',
  sourceTopics: [
    '兴趣活动词汇与表达：reading、skateboarding、drawing pictures、making models、doing jigsaw puzzles、singing、dancing、collecting erasers；用 What are your hobbies? 和 I like ... 询问、介绍兴趣',
    '兴趣调查与转述：根据调查记录描述同学喜欢的活动，练习第三人称单数 likes，并结合 often、never 理解活动频率',
    '阅读兴趣记录和简短故事：联系人物、兴趣、活动物品及事件先后；练习提取信息和根据线索判断',
    '单词拼读：在 listening、running、sing、ring、song、long、ping-pong 等词中识读 ng 相关拼写及 -ing 形式',
    '兴趣展示与表达：Fun Time 展示 playing the guitar、acting、collecting spiders、riding a unicycle 等不同兴趣；通过卡片创作和分享自己的兴趣介绍',
  ],
  basicTasks: [
    makeTask('认读兴趣词语并发现拼写规律', '认读本单元常见兴趣活动词语，根据熟悉的线索找到对应表达，并识别 ng 结尾的常见单词。', 'companion-03', recognizingHobbyWords),
    makeTask('询问并介绍兴趣爱好', '理解询问兴趣的表达，并用简单句回答自己喜欢的活动。', 'companion-02', askingAndAnsweringAboutHobbies),
  ],
  advancedTasks: [
    makeTask('整理调查并转述兴趣', '从简单调查和活动记录中提取信息，正确使用 likes、often 和 never 转述兴趣与频率。', 'companion-04', reportingAHobbySurvey),
    makeTask('阅读兴趣记录寻找依据', '阅读原创兴趣便笺，联系人物与活动线索，判断兴趣并区分创作活动和收藏物品。', 'companion-01', readingHobbyNotes),
  ],
  highTasks: [
    makeTask('根据时间安排兴趣日活动', '综合活动时段和展示要求，规划先后顺序，并区分表演兴趣与运动兴趣。', 'companion-03', planningAHobbyDay),
    makeTask('结合故事线索推理兴趣', '整合活动顺序、展示物品和人物线索，判断兴趣并复述关键事件。', 'companion-04', followingAHobbyStory),
  ],
});
