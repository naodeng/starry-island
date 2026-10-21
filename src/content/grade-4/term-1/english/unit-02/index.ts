import { buildEnglishUnit } from '../../../../grade-2/term-1/english/buildEnglishUnit';
import { lessonProfile, makeTask, phraseQuestion } from '../../../../grade-2/term-1/english/questionAuthoring';

const weekendActivityWords = lessonProfile(
  [
    { word: 'pick fruit', meaning: '采摘水果' },
    { word: 'go fishing', meaning: '去钓鱼' },
    { word: 'climb a hill', meaning: '爬山' },
    { word: 'visit my grandparents', meaning: '看望祖父母' },
  ],
  [
    phraseQuestion('想问同伴“你经常去钓鱼吗？”，哪句正确？', ['Do you often go fishing?', 'Do you often goes fishing?', 'Are you often go fishing?'], 0, '用 Do you often…? 询问经常做的事，后面的动词用原形。'),
    phraseQuestion('想正确地说“我经常看望祖父母”，哪句正确？', ['I often visit my grandparents.', 'I often visiting my grandparents.', 'I often visits my grandparents.'], 0, '主语 I 后用 often，再接动词原形 visit。'),
  ],
  ['以 go 开头的活动', '不以 go 开头的活动'],
  [
    { label: 'go fishing', categoryIndex: 0 }, { label: 'climb a hill', categoryIndex: 1 },
    { label: 'go to the cinema', categoryIndex: 0 }, { label: 'visit my grandparents', categoryIndex: 1 },
  ],
  { prompt: '把词卡排成“我周末经常去钓鱼”。', items: ['I', 'often', 'go fishing', 'on', 'the weekend', '.'], correctOrderIndices: [0, 1, 2, 3, 4, 5] },
);

const weekendQuestionsAndAnswers = lessonProfile(
  [
    { word: 'go to the cinema', meaning: '去电影院' },
    { word: 'go to a drawing club', meaning: '去绘画俱乐部' },
    { word: 'play computer games', meaning: '玩电脑游戏' },
    { word: 'go to a dancing club', meaning: '去舞蹈俱乐部' },
  ],
  [
    phraseQuestion('A asks, “Do you often go to the cinema on the weekend?” B goes there often. Which answer fits?', ['Yes, I do.', 'Yes, I am.', "No, I don't."], 0, 'Do you often…? 的肯定简答是 Yes, I do.'),
    phraseQuestion('想说“去绘画俱乐部很有趣”，哪句正确？', ["It's fun.", 'It fun.', 'It are fun.'], 0, 'It is 可以缩写为 It\'s；fun 表示“有趣的”。'),
  ],
  ['问句', '陈述或简短回答'],
  [
    { label: 'Do you often go to a drawing club?', categoryIndex: 0 }, { label: "No, I don't.", categoryIndex: 1 },
    { label: 'What do you do on the weekend?', categoryIndex: 0 }, { label: 'It\'s fun.', categoryIndex: 1 },
  ],
  { prompt: '把词卡排成“我经常去绘画俱乐部”。', items: ['go', 'I', 'a', 'often', 'to', 'drawing club', '.'], correctOrderIndices: [1, 3, 0, 4, 2, 5, 6] },
);

const weekendStorySequence = lessonProfile(
  [
    { word: 'Saturday', meaning: '星期六' },
    { word: 'morning', meaning: '早晨' },
    { word: 'afternoon', meaning: '下午' },
    { word: 'evening', meaning: '傍晚；晚上' },
  ],
  [
    phraseQuestion('读一读安排：On Saturday morning, I go fishing. In the afternoon, I pick fruit. In the evening, I visit my grandparents. What do I do first?', ['Go fishing.', 'Pick fruit.', 'Visit my grandparents.'], 0, 'morning 在 afternoon 和 evening 之前，所以最先去钓鱼。'),
    phraseQuestion('安排是：星期六上午去钓鱼，下午采摘水果，晚上看望祖父母。去钓鱼之后接着做什么？', ['Pick fruit.', 'Visit my grandparents.', 'Go to the cinema.'], 0, '安排中上午去钓鱼，下午采摘水果，晚上看望祖父母。'),
  ],
  ['时间表达', '周末活动'],
  [
    { label: 'Saturday morning', categoryIndex: 0 }, { label: 'go fishing', categoryIndex: 1 },
    { label: 'Sunday evening', categoryIndex: 0 }, { label: 'pick fruit', categoryIndex: 1 },
  ],
  { prompt: '把词卡排成“我星期六早晨经常去钓鱼”。', items: ['morning', 'I', 'fishing', 'often', 'on', 'Saturday', 'go', '.'], correctOrderIndices: [1, 3, 6, 2, 4, 5, 0, 7] },
);

const erSpellingWords = lessonProfile(
  [
    { word: 'water', meaning: '水' },
    { word: 'ruler', meaning: '尺子' },
    { word: 'tiger', meaning: '老虎' },
    { word: 'worker', meaning: '工人' },
  ],
  [
    phraseQuestion('哪个单词的拼写表示“工人”？', ['worker', 'workar', 'workor'], 0, 'worker 的词尾是 er；检查字母顺序 w-o-r-k-e-r。'),
    phraseQuestion('“舞者”对应哪个英文词？', ['dancer', 'teacher', 'singer'], 0, 'dancer 表示舞者；teacher 表示教师，singer 表示歌手。'),
  ],
  ['表示人物的词', '其他词'],
  [
    { label: 'worker', categoryIndex: 0 }, { label: 'sister', categoryIndex: 0 },
    { label: 'ruler', categoryIndex: 1 }, { label: 'water', categoryIndex: 1 },
  ],
  { prompt: '把词卡排成“The tiger is in the water.”', items: ['water', 'in', 'the', '.', 'is', 'tiger', 'The'], correctOrderIndices: [6, 5, 4, 1, 2, 0, 3] },
);

const weekendPlanChoices = lessonProfile(
  [
    { word: 'climb a hill', meaning: '爬山' },
    { word: 'go fishing', meaning: '去钓鱼' },
    { word: 'play computer games', meaning: '玩电脑游戏' },
    { word: 'go to the cinema', meaning: '去电影院' },
  ],
  [
    phraseQuestion('安安想安排两项活动：星期六上午去户外，星期日下午在家玩。哪份计划符合要求？', ['Go fishing on Saturday morning; play computer games on Sunday afternoon.', 'Play computer games on Saturday morning; go fishing on Sunday afternoon.', 'Go to the cinema on Saturday morning; climb a hill on Sunday afternoon.'], 0, '周六上午需要户外活动，周日下午需要在家玩的活动；只有第一份安排同时符合两项条件。'),
    phraseQuestion('计划写着“Saturday morning: go fishing”。星期日下午的室内活动可以选哪项？', ['Play computer games.', 'Climb a hill.', 'Go fishing.'], 0, '玩电脑游戏适合安排在家里；另外两项是户外活动。'),
  ],
  ['适合户外的活动', '适合室内的活动'],
  [
    { label: 'go fishing', categoryIndex: 0 }, { label: 'climb a hill', categoryIndex: 0 },
    { label: 'play computer games', categoryIndex: 1 }, { label: 'go to the cinema', categoryIndex: 1 },
  ],
  { prompt: '把词卡排成“我星期六早晨经常爬山”。', items: ['Saturday', 'climb', 'I', 'morning', '.', 'often', 'a', 'hill', 'on'], correctOrderIndices: [2, 5, 1, 6, 7, 8, 0, 3, 4] },
);

const weekendRoutineAndPlan = lessonProfile(
  [
    { word: 'visit my grandparents', meaning: '看望祖父母' },
    { word: 'go to a drawing club', meaning: '去绘画俱乐部' },
    { word: 'pick fruit', meaning: '采摘水果' },
    { word: 'play computer games', meaning: '玩电脑游戏' },
  ],
  [
    phraseQuestion('想用开放式问题请同伴介绍周末通常做什么，哪句合适？', ['What do you do on the weekend?', 'Do you often go fishing?', 'Are you often go fishing?'], 0, 'What do you do on the weekend? 可以开放地请对方介绍周末活动；Do you often…? 只询问某一项活动。'),
    phraseQuestion('Which sentence tells a plan for this weekend?', ['I am going to visit my grandparents this weekend.', 'I often pick fruit on the weekend.', 'Yes, I do.'], 0, 'I am going to… this weekend 表示本周末的计划；I often… 表示经常做的事。'),
  ],
  ['经常做的周末活动', '本周末的计划'],
  [
    { label: 'I often play computer games.', categoryIndex: 0 }, { label: 'I am going to pick fruit this weekend.', categoryIndex: 1 },
    { label: 'I often visit my grandparents.', categoryIndex: 0 }, { label: 'I am going to play computer games this weekend.', categoryIndex: 1 },
  ],
  { prompt: '把词卡排成“我本周末打算采摘水果”。', items: ['this', 'pick', 'I', 'to', 'weekend', '.', 'am', 'fruit', 'going'], correctOrderIndices: [2, 6, 8, 3, 1, 7, 0, 4, 5] },
);

export const unit = buildEnglishUnit({
  grade: 4,
  term: 1,
  formalUnitNumber: 2,
  entryId: 'unit-02',
  title: 'Unit 2 · On the Weekend',
  sourceTopics: [
    '周末活动词汇：visit my grandparents、pick fruit、climb a hill、go fishing、go to the cinema、go to a drawing club、go to a dancing club、play computer games',
    '询问和介绍周末日常：Do you often … (on the weekend)?、What do you do on the weekend?、I often …；Yes, I do. / No, I don\'t.',
    '表达活动感受：It\'s fun.',
    '按 Saturday morning、afternoon、evening 理解周末活动的先后顺序',
    '本周末计划句型：I am going to … this weekend.',
    'Let\'s Spell 中 -er 词尾拼写与词义：water、ruler、tiger、worker、sister、dancer、teacher、singer',
  ],
  basicTasks: [
    makeTask('认读周末活动', '认读周末常见活动词组，辨认 go 开头的活动表达。', 'companion-02', weekendActivityWords),
    makeTask('询问周末日常', '用 Do you often…? 和 What do you do…? 询问周末活动，并选择合适的回答。', 'companion-03', weekendQuestionsAndAnswers),
  ],
  advancedTasks: [
    makeTask('读懂周末活动安排', '结合 Saturday morning、afternoon、evening 的顺序，提取活动先后信息。', 'companion-04', weekendStorySequence),
    makeTask('辨认 -er 词尾拼写', '认读本单元 Let’s Spell 中 -er 结尾的单词，核对拼写和词义。', 'companion-01', erSpellingWords),
  ],
  highTasks: [
    makeTask('按条件安排周末活动', '结合室内外与时间条件比较活动安排，选出符合要求的计划。', 'companion-03', weekendPlanChoices),
    makeTask('区分日常与周末计划', '在简短交流中区分 I often… 表达的日常活动与 I am going to… 表达的本周末计划。', 'companion-04', weekendRoutineAndPlan),
  ],
});
