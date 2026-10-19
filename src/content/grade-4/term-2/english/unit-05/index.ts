import { buildEnglishUnit } from '../../../../grade-2/term-1/english/buildEnglishUnit';
import { lessonProfile, makeTask, phraseQuestion } from '../../../../grade-2/term-1/english/questionAuthoring';

const recognizingFreeTimeActivities = lessonProfile(
  [
    { word: 'go for a picnic', meaning: '去野餐' },
    { word: 'go skating', meaning: '去滑冰' },
    { word: 'go camping', meaning: '去露营' },
    { word: 'do the housework', meaning: '做家务' },
  ],
  [
    phraseQuestion('一家人带上食物，到公园铺好垫子，一起在户外吃午餐。他们最可能要做什么？', ['Go camping.', 'Go for a picnic.', 'Do the housework.'], 1, '带上食物到户外一起吃午餐，符合去野餐的情境。'),
    phraseQuestion('读一读：food 的 oo 发音和哪个词相同？', ['book', 'zoo', 'good'], 1, 'food 和 zoo 中的 oo 都发长音；book 和 good 中的 oo 发短音。'),
  ],
  ['go 开头的活动', 'do 开头的家务'],
  [
    { label: 'go for a picnic', categoryIndex: 0 }, { label: 'go skating', categoryIndex: 0 },
    { label: 'go camping', categoryIndex: 0 }, { label: 'do the housework', categoryIndex: 1 },
  ],
  { prompt: '把词卡排成“你空闲时做什么？”', items: ['your', 'free time', 'do', 'in', 'What', 'you', 'do', '?'], correctOrderIndices: [4, 2, 5, 6, 3, 0, 1, 7] },
);

const understandingFrequencyPhrases = lessonProfile(
  [
    { word: 'every day', meaning: '每天' },
    { word: 'once a week', meaning: '每周一次' },
    { word: 'twice a week', meaning: '每周两次' },
    { word: 'once a year', meaning: '每年一次' },
  ],
  [
    phraseQuestion('Mia 的练习记录写着：“I play the violin every day.” 哪个频率短语和记录相符？', ['Once a week.', 'Every day.', 'Never.'], 1, '记录说 Mia 每天练琴，所以应选择 every day。'),
    phraseQuestion('朋友问：“How often do you go skating?” 哪句话回答了滑冰的频率？', ['I go skating on Tuesday.', 'I go skating twice a week.', 'I like skating.'], 1, 'twice a week 说明每周做两次；另外两句没有回答频率。'),
  ],
  ['频率表达', '活动表达'],
  [
    { label: 'every day', categoryIndex: 0 }, { label: 'once a week', categoryIndex: 0 },
    { label: 'go camping', categoryIndex: 1 }, { label: 'play the violin', categoryIndex: 1 },
  ],
  { prompt: '把词卡排成“我每周两次拉小提琴”。', items: ['week.', 'play', 'a', 'twice', 'I', 'violin', 'the'], correctOrderIndices: [4, 1, 6, 5, 3, 2, 0] },
);

const interpretingAnActivitySurvey = lessonProfile(
  [
    { word: 'often', meaning: '经常' },
    { word: 'once a month', meaning: '每月一次' },
    { word: 'three times a week', meaning: '每周三次' },
    { word: 'never', meaning: '从不' },
  ],
  [
    phraseQuestion('滑冰调查表上，Ben 在星期二和星期四都打了勾。哪句报告准确？', ['Ben goes skating twice a week.', 'Ben go skating twice a week.', 'Ben goes skating three times a week.'], 0, '两个勾表示每周滑冰两次；描述 Ben 的活动时用 goes。'),
    phraseQuestion('音乐社每周二、四、六活动，Jo 每次都参加。Jo 每周参加几次？', ['Once a week.', 'Twice a week.', 'Three times a week.'], 2, '一周有星期二、星期四和星期六三次活动，Jo 每次都参加。'),
  ],
  ['表达经常做', '表达从不做'],
  [
    { label: 'I often read after dinner.', categoryIndex: 0 }, { label: 'We never go skating on school nights.', categoryIndex: 1 },
    { label: 'Ben often plays ping-pong.', categoryIndex: 0 }, { label: 'Lily never goes camping in winter.', categoryIndex: 1 },
  ],
  { prompt: '把词卡排成“Ben 多久去滑一次冰？”', items: ['go', 'often', 'Ben', 'skating', 'How', 'does', '?'], correctOrderIndices: [4, 1, 5, 2, 0, 3, 6] },
);

const readingTomorrowPlans = lessonProfile(
  [
    { word: 'tomorrow', meaning: '明天' },
    { word: 'go skating', meaning: '去滑冰' },
    { word: 'read books', meaning: '读书' },
    { word: 'play the violin', meaning: '拉小提琴' },
  ],
  [
    phraseQuestion('一张原创计划卡写着：“Tomorrow is Saturday. I am going skating with my sister.” 写卡的人明天准备做什么？', ['Read books with a friend.', 'Go skating with a sister.', 'Play the violin after dinner.'], 1, '计划卡直接写明明天要和姐姐一起去滑冰。'),
    phraseQuestion('Maya 每晚常读书；她还在计划卡上写：“I am going skating tomorrow.” 哪句说的是明天的一次计划？', ['Maya often reads books at night.', 'Maya reads books every night.', 'Maya is going skating tomorrow.'], 2, 'tomorrow 和 is going skating 表示明天的一次计划，前两句说的是日常习惯。'),
  ],
  ['明天的一次计划', '日常习惯'],
  [
    { label: 'I am going skating tomorrow.', categoryIndex: 0 }, { label: 'We often read books after dinner.', categoryIndex: 1 },
    { label: 'She plays the violin every Friday.', categoryIndex: 1 }, { label: 'They are going for a picnic tomorrow.', categoryIndex: 0 },
  ],
  { prompt: '把词卡排成“你明天准备做什么？”', items: ['tomorrow', 'do', 'What', 'going', 'you', 'to', 'are', '?'], correctOrderIndices: [2, 6, 4, 3, 5, 1, 0, 7] },
);

const planningAWeeklyExerciseRoutine = lessonProfile(
  [
    { word: 'exercise', meaning: '锻炼' },
    { word: 'twice a week', meaning: '每周两次' },
    { word: 'three times a week', meaning: '每周三次' },
    { word: 'once a year', meaning: '每年一次' },
  ],
  [
    phraseQuestion('运动角只在星期二、四、六开放。Mei 星期二打乒乓球、星期四滑冰，目标是每周运动三次。哪项安排能达到目标？', ['Add skating on Saturday.', 'Read a book on Saturday.', 'Skip Thursday and read on Saturday.'], 0, '星期二、四已有两次运动；星期六再参加一次运动，正好每周三次。'),
    phraseQuestion('Kai 想每周至少运动两次。哪张计划卡符合目标？', ['I play football twice a week.', 'I go camping once a year.', 'I never exercise.'], 0, '每周两次达到目标；一年一次和从不锻炼都不符合每周至少两次的要求。'),
  ],
  ['球类运动', '阅读或音乐活动'],
  [
    { label: 'play football', categoryIndex: 0 }, { label: 'play ping-pong', categoryIndex: 0 },
    { label: 'read books', categoryIndex: 1 }, { label: 'play the violin', categoryIndex: 1 },
  ],
  { prompt: '把词卡排成“我每周锻炼三次”。', items: ['week.', 'three', 'I', 'times', 'exercise', 'a'], correctOrderIndices: [2, 4, 1, 3, 5, 0] },
);

const choosingAFunTimeActivity = lessonProfile(
  [
    { word: 'take care of a pet', meaning: '照顾宠物' },
    { word: 'cooking', meaning: '烹饪' },
    { word: 'gardening', meaning: '园艺' },
    { word: 'knitting', meaning: '编织' },
  ],
  [
    phraseQuestion('兴趣日通知：园艺组星期六上午种花；烹饪组星期日下午活动；编织桌星期六上午开放。Ming 只有星期六上午有空，而且想种花。Ming 应选哪项？', ['Join the garden group on Saturday morning.', 'Join the cooking group on Sunday afternoon.', 'Try knitting at the table on Saturday morning.'], 0, '星期六上午 Ming 有空，园艺组也在这时种花，符合时间和兴趣两个条件。'),
    phraseQuestion('Yu 想用毛线做一个小袋子，准备和家人一起学习。哪种兴趣最适合？', ['Gardening.', 'Knitting.', 'Cooking.'], 1, '编织可以用毛线制作小物件，符合 Yu 的计划。'),
  ],
  ['照料生命或植物', '制作食物或物品'],
  [
    { label: 'take care of a pet', categoryIndex: 0 }, { label: 'gardening', categoryIndex: 0 },
    { label: 'cooking', categoryIndex: 1 }, { label: 'knitting', categoryIndex: 1 },
  ],
  { prompt: '把词卡排成“我可以和妈妈一起学做饭”。', items: ['mother.', 'can', 'I', 'learn', 'cook', 'with', 'my', 'to'], correctOrderIndices: [2, 1, 3, 7, 4, 5, 6, 0] },
);

export const unit = buildEnglishUnit({
  grade: 4,
  term: 2,
  formalUnitNumber: 5,
  entryId: 'unit-05',
  title: 'Unit 5 · Free Time',
  sourceTopics: [
    '空闲时间活动词汇：go for a picnic、go skating、go camping、play the violin、do the housework；用 What do you do in your free time? 和 I often ... 询问、介绍活动',
    '活动频率表达：How often do you ...? / How often does ...?；often、never、every day、once/twice a week、three times a week、once a month、once a year',
    '明日计划与习惯辨别：What are you going to do tomorrow?；根据活动记录、调查和计划卡提取人物、活动与频率信息',
    '单词拼读：zoo、food、room 与 book、cook、good 等含 oo 的词，辨认 oo 拼写并练习长短元音读音',
    'Fun Time 兴趣拓展：照料宠物、烹饪、园艺和编织；在成人陪伴的情境中选择活动，并分享自己的空闲时间安排',
    'Story Time 阅读与规划：从原创相似生活情境中提取运动频率线索，思考并安排每周运动活动',
  ],
  basicTasks: [
    makeTask('认读空闲时间活动词语', '认读野餐、滑冰、露营和做家务等词组，理解空闲时间提问，并辨认 oo 的常见读音。', 'companion-03', recognizingFreeTimeActivities),
    makeTask('理解频率短语并回答问句', '辨认每天、每周次数和从不等频率表达，并用频率短语回答 How often ...?。', 'companion-02', understandingFrequencyPhrases),
  ],
  advancedTasks: [
    makeTask('读调查表并转述活动频率', '从原创活动调查中提取每周次数，正确报告第三人称活动并读懂 often、never 等频率线索。', 'companion-04', interpretingAnActivitySurvey),
    makeTask('分辨明日计划和日常习惯', '阅读原创计划卡，判断人物明天的安排，并区分一次计划与常做的活动。', 'companion-01', readingTomorrowPlans),
  ],
  highTasks: [
    makeTask('按目标规划每周运动', '综合开放日期、已安排的运动和每周目标，选择可行的运动计划并核对频率；区分球类运动与阅读或音乐活动。', 'companion-03', planningAWeeklyExerciseRoutine),
    makeTask('按时间和兴趣选择活动', '结合开放时间、个人目标和活动特点，选择适合的 Fun Time 活动并说明理由。', 'companion-04', choosingAFunTimeActivity),
  ],
});
