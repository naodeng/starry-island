import { buildEnglishUnit } from '../../../../grade-2/term-1/english/buildEnglishUnit';
import { lessonProfile, makeTask, phraseQuestion } from '../../../../grade-2/term-1/english/questionAuthoring';

const scenicPlaces = lessonProfile(
  [
    { word: 'West Lake', meaning: '西湖' },
    { word: 'the Mogao Caves', meaning: '莫高窟' },
    { word: 'the Great Wall', meaning: '长城' },
    { word: 'row a boat', meaning: '划船' },
  ],
  [
    phraseQuestion('原创行程卡：一家人到杭州游玩，计划在西湖体验湖上活动。哪项符合安排？', ['They can row a boat on West Lake.', 'They can visit the Mogao Caves in Dunhuang.', 'They can swim in the sea in Sanya.'], 0, '行程卡给出的地点是西湖，湖上活动是划船。'),
    phraseQuestion('旅行卡上写着“Dunhuang—Mogao Caves”。哪句与旅行卡相符？', ['I want to visit the Mogao Caves in Dunhuang.', 'I want to row a boat on West Lake.', 'I want to ski in Harbin.'], 0, '莫高窟在敦煌；另外两句说的是西湖和哈尔滨的旅行计划。'),
  ],
  ['景点名称', '旅行活动'],
  [
    { label: 'West Lake', categoryIndex: 0 }, { label: 'the Mogao Caves', categoryIndex: 0 },
    { label: 'the Great Wall', categoryIndex: 0 }, { label: 'row a boat', categoryIndex: 1 },
  ],
  { prompt: '把词卡排成“我们可以在西湖划船”。', items: ['boat', 'West Lake', 'can', '.', 'We', 'on', 'row', 'a'], correctOrderIndices: [4, 2, 6, 7, 0, 5, 1, 3] },
);

const holidayActivities = lessonProfile(
  [
    { word: 'row a boat', meaning: '划船' },
    { word: 'take photos', meaning: '拍照' },
    { word: 'ski', meaning: '滑雪' },
    { word: 'eat seafood', meaning: '吃海鲜' },
  ],
  [
    phraseQuestion('梦境记录：周明一家计划去哈尔滨。哪项活动符合他的旅行梦？', ['They can ski there.', 'They can row a boat there.', 'They can eat seafood there.'], 0, '课文梦境中，周明想去哈尔滨滑雪；划船和吃海鲜出现在其他旅行地点。'),
    phraseQuestion('原创旅行便笺写着：“West Lake; a boat ride; photos.” 哪组活动符合便笺？', ['Row a boat and take photos.', 'Ski and eat seafood.', 'Visit the Great Wall and swim in the sea.'], 0, '便笺中的 boat ride 对应 row a boat，photos 对应 take photos。'),
  ],
  ['旅行活动', '旅行地点'],
  [
    { label: 'row a boat', categoryIndex: 0 }, { label: 'ski', categoryIndex: 0 },
    { label: 'eat seafood', categoryIndex: 0 }, { label: 'Sanya', categoryIndex: 1 },
  ],
  { prompt: '把词卡排成“我想在三亚吃海鲜”。', items: ['seafood', 'Sanya', '.', 'want', 'I', 'to', 'eat', 'in'], correctOrderIndices: [4, 3, 5, 6, 0, 7, 1, 2] },
);

const askingAboutVacationPlans = lessonProfile(
  [
    { word: 'summer vacation', meaning: '暑假' },
    { word: 'Sanya', meaning: '三亚' },
    { word: 'swim in the sea', meaning: '在海里游泳' },
    { word: 'eat seafood', meaning: '吃海鲜' },
  ],
  [
    phraseQuestion('朋友想问暑假准备去哪个地方。下面哪句是在询问目的地？', ['Where do you want to go this summer vacation?', 'What do you want to do there?', 'I want to go to Sanya.'], 0, 'Where do you want to go? 询问要去哪里；What do you want to do there? 询问到那里想做什么。'),
    phraseQuestion('A 问：“What do you want to do there?” 哪句回答了在海边想做的活动？', ['I want to swim in the sea and eat seafood.', 'I want to go to Sanya this summer vacation.', 'I want to visit the Mogao Caves with my parents.'], 0, '问题询问到目的地后想做什么，第一句给出了游泳和吃海鲜两项活动。'),
  ],
  ['旅行计划问句', '旅行计划回答'],
  [
    { label: 'Where do you want to go this summer vacation?', categoryIndex: 0 },
    { label: 'What do you want to do there?', categoryIndex: 0 },
    { label: 'I want to go to Sanya.', categoryIndex: 1 },
    { label: 'I want to eat seafood.', categoryIndex: 1 },
  ],
  { prompt: '把词卡排成“你想在那里做什么？”', items: ['there', '?', 'want', 'do', 'What', 'to', 'you', 'do'], correctOrderIndices: [4, 3, 6, 2, 5, 7, 0, 1] },
);

const readingFamilyTravelDream = lessonProfile(
  [
    { word: 'Harbin', meaning: '哈尔滨' },
    { word: 'by train', meaning: '乘火车' },
    { word: 'Sanya', meaning: '三亚' },
    { word: 'by plane', meaning: '乘飞机' },
  ],
  [
    phraseQuestion('家庭旅行梦里，妈妈想带孩子去哈尔滨。哪项也符合她选择的交通方式？', ['They go to Harbin by train.', 'They go to Sanya by plane.', 'They go to Dunhuang by train.'], 0, '梦境写到妈妈想乘火车去哈尔滨；另外两项把目的地或计划人物混在了一起。'),
    phraseQuestion('爸爸计划带孩子去三亚。到那里后，他们可以做什么？', ['They can swim in the sea.', 'They can ski in Harbin.', 'They can row a boat on West Lake.'], 0, '梦境中爸爸选择三亚，那里可以在海里游泳。'),
  ],
  ['旅行目的地', '出行方式'],
  [
    { label: 'Harbin', categoryIndex: 0 }, { label: 'Sanya', categoryIndex: 0 },
    { label: 'by train', categoryIndex: 1 }, { label: 'by plane', categoryIndex: 1 },
  ],
  { prompt: '把词卡排成“我们可以乘火车去哈尔滨”。', items: ['train', '.', 'Harbin', 'can', 'by', 'We', 'go', 'to'], correctOrderIndices: [5, 3, 6, 7, 2, 4, 0, 1] },
);

const planningAMultiStopTrip = lessonProfile(
  [
    { word: 'Beijing', meaning: '北京' },
    { word: 'Kunming', meaning: '昆明' },
    { word: 'Thailand', meaning: '泰国' },
    { word: 'Australia', meaning: '澳大利亚' },
  ],
  [
    phraseQuestion('行程卡记录四站：北京、昆明、泰国、澳大利亚。哪项按故事顺序排列？', ['Beijing → Kunming → Thailand → Australia.', 'Kunming → Beijing → Thailand → Australia.', 'Beijing → Thailand → Kunming → Australia.'], 0, '故事先到北京，接着乘火车去昆明，然后去泰国，最后去澳大利亚。'),
    phraseQuestion('旅行计划写着“春天到 Thailand”。哪项是故事提到的当地活动？', ['Eat seafood.', 'See the flowers.', 'Row a boat.'], 0, '故事写到他们在泰国吃海鲜；看花是昆明一站的活动。'),
  ],
  ['旅行地点', '旅行活动'],
  [
    { label: 'Beijing', categoryIndex: 0 }, { label: 'Thailand', categoryIndex: 0 },
    { label: 'visit the Great Wall', categoryIndex: 1 }, { label: 'see the flowers', categoryIndex: 1 },
  ],
  { prompt: '把词卡排成“他们乘飞机去泰国”。', items: ['plane', 'Thailand', '.', 'by', 'go', 'They', 'to'], correctOrderIndices: [5, 4, 6, 1, 3, 0, 2] },
);

const choosingAFunTravelPlan = lessonProfile(
  [
    { word: 'Volunteer Travel', meaning: '志愿旅行' },
    { word: 'Space Travel', meaning: '太空旅行' },
    { word: 'Round the World Travel', meaning: '环球旅行' },
    { word: 'clean the countryside', meaning: '清洁乡村' },
  ],
  [
    phraseQuestion('你想参加能帮助村庄和孩子们的旅行。哪种旅行介绍符合这个愿望？', ['Volunteer Travel.', 'Space Travel.', 'Round the World Travel.'], 0, '志愿旅行介绍了帮助他人、教孩子或清洁乡村等活动。'),
    phraseQuestion('有人想环游许多国家。Fun Time 提到这类行程可能需要多久？', ['A year or maybe two.', 'A few minutes.', 'One train ride.'], 0, '环球旅行需要较长时间，介绍说可能需要一年，也可能两年。'),
  ],
  ['旅行方式', '志愿活动'],
  [
    { label: 'Volunteer Travel', categoryIndex: 0 }, { label: 'Space Travel', categoryIndex: 0 },
    { label: 'teach children', categoryIndex: 1 }, { label: 'clean the countryside', categoryIndex: 1 },
  ],
  { prompt: '把词卡排成“我想帮助别人”。', items: ['people', 'want', '.', 'I', 'help', 'to'], correctOrderIndices: [3, 1, 5, 4, 0, 2] },
);

export const unit = buildEnglishUnit({
  grade: 4,
  term: 2,
  formalUnitNumber: 3,
  entryId: 'unit-03',
  title: 'Unit 3 · Travel Plans',
  sourceTopics: [
    '景点和旅行活动：West Lake、the Great Wall、Mogao Caves、sea、ski、row a boat、take photos、eat seafood；用 I want to ... 和 We can ... 表达旅行愿望与活动',
    '暑假旅行计划交际：Where do you want to go this summer vacation?、What do you want to do there?，以及用 I want to ... 回答目的地和活动',
    '阅读家庭旅行梦境：Harbin by train 并滑雪、Sanya by plane 并在海里游泳、Dunhuang 参观莫高窟、Hangzhou 在西湖划船',
    '阅读多站旅行故事：Beijing、Kunming、Thailand、Australia 的地点顺序、交通方式和当地活动',
    'Fun Time 旅行方式阅读：Volunteer Travel 帮助他人、教孩子或清洁乡村；Space Travel；Round the World Travel 及其所需时间',
    '自我评价目标：说出景点名称并认读、默写部分词语；用 I want to ... 表达想在景点做的事',
  ],
  basicTasks: [
    makeTask('认读景点名称并表达游玩活动', '辨认西湖、莫高窟和长城等景点，结合地点线索读懂简单的游玩安排。', 'companion-03', scenicPlaces),
    makeTask('理解景点活动词汇', '区分滑雪、划船、拍照和吃海鲜等活动，并根据旅行地点提取相关信息。', 'companion-02', holidayActivities),
  ],
  advancedTasks: [
    makeTask('询问并回答暑假旅行计划', '辨认询问目的地和询问当地活动的不同问句，并用 I want to ... 回答。', 'companion-04', askingAboutVacationPlans),
    makeTask('读懂家庭旅行梦境', '综合目的地、交通方式和活动线索，判断家庭成员各自的旅行安排。', 'companion-01', readingFamilyTravelDream),
  ],
  highTasks: [
    makeTask('规划多站旅行顺序', '按故事线索组织多站行程，综合核对城市顺序、交通方式和各地活动。', 'companion-03', planningAMultiStopTrip),
    makeTask('比较不同旅行方式', '从 Fun Time 的短文中提取志愿旅行、太空旅行和环球旅行的活动与时间信息。', 'companion-04', choosingAFunTravelPlan),
  ],
});
