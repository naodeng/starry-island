import { buildEnglishUnit } from '../../../../grade-2/term-1/english/buildEnglishUnit';
import { lessonProfile, makeTask, phraseQuestion } from '../../../../grade-2/term-1/english/questionAuthoring';

const neighbourhoodPlaces = lessonProfile(
  [
    { word: 'bank', meaning: '银行' },
    { word: 'restaurant', meaning: '餐馆' },
    { word: 'post office', meaning: '邮局' },
    { word: 'grocery', meaning: '食品杂货店' },
  ],
  [
    phraseQuestion('原创地图标注：银行在公园对面。哪句表示这个位置？', ['The bank is across from the park.', 'The bank is next to the park.', 'The bank is between the park and the school.'], 0, 'across from 表示“在……对面”。'),
    phraseQuestion('原创地图标注：邮局在银行和食品杂货店之间。哪句符合标注？', ['The post office is between the bank and the grocery.', 'The post office is across from the bank.', 'The post office is next to the grocery.'], 0, 'between ... and ... 表示“在……和……之间”。'),
  ],
  ['地点名称', '位置关系'],
  [
    { label: 'bank', categoryIndex: 0 }, { label: 'restaurant', categoryIndex: 0 },
    { label: 'across from', categoryIndex: 1 }, { label: 'between', categoryIndex: 1 },
  ],
  { prompt: '把词卡排成“银行在哪里？”', items: ['bank', 'Where', 'the', 'is', '?'], correctOrderIndices: [1, 3, 2, 0, 4] },
);

const locationAndDirectionPhrases = lessonProfile(
  [
    { word: 'across from', meaning: '在……对面' },
    { word: 'next to', meaning: '紧挨着' },
    { word: 'turn left', meaning: '向左转' },
    { word: 'go straight', meaning: '直行' },
  ],
  [
    phraseQuestion('原创地图标注：书店在医院对面。应选哪句？', ['The bookshop is across from the hospital.', 'The bookshop is next to the hospital.', 'The bookshop is between the hospital and the school.'], 0, 'across from 表示对面；next to 表示紧挨着。'),
    phraseQuestion('地图标注：书店紧挨着邮局。哪句正确？', ['The bookshop is next to the post office.', 'The bookshop is across from the post office.', 'The bookshop is between the post office and the school.'], 0, 'next to 表示“紧挨着”。'),
  ],
  ['位置关系', '路线指令'],
  [
    { label: 'across from', categoryIndex: 0 }, { label: 'next to', categoryIndex: 0 },
    { label: 'go straight', categoryIndex: 1 }, { label: 'turn left', categoryIndex: 1 },
  ],
  { prompt: '把词卡排成“在第一个十字路口向左转”。', items: ['crossroads', 'left', 'Turn', 'first', 'the', 'at', '.'], correctOrderIndices: [2, 1, 5, 4, 3, 0, 6] },
);

const askingForDirections = lessonProfile(
  [
    { word: 'neighbourhood', meaning: '街区；附近' },
    { word: 'crossroads', meaning: '十字路口' },
    { word: 'get to', meaning: '到达' },
    { word: 'leave', meaning: '离开' },
  ],
  [
    phraseQuestion('对话：A 问 “Excuse me. Is there a post office in the neighbourhood?” 哪句回答正确？', ['Yes, there is.', 'Yes, it is.', 'Yes, there are.'], 0, 'Is there ...? 询问附近是否有一个地点，可以用 Yes, there is. 回答。'),
    phraseQuestion('有人问 “How can I get to the post office?” 哪句是在告诉对方路线？', ['Go straight and turn right at the first crossroads.', 'Yes, there is.', 'The post office is next to the school.'], 0, 'Go straight and turn right ... 给出行进路线；其他选项分别是回答是否存在和描述位置。'),
  ],
  ['问路表达', '路线指令'],
  [
    { label: 'Is there a post office in the neighbourhood?', categoryIndex: 0 }, { label: 'How can I get there?', categoryIndex: 0 },
    { label: 'Go straight.', categoryIndex: 1 }, { label: 'Turn right at the first crossroads.', categoryIndex: 1 },
  ],
  { prompt: '把词卡排成“我怎样才能到邮局？”', items: ['post office', 'How', 'get', 'to', 'the', 'can', 'I', '?'], correctOrderIndices: [1, 5, 6, 2, 3, 4, 0, 7] },
);

const readingNeighbourhoodMap = lessonProfile(
  [
    { word: 'hospital', meaning: '医院' },
    { word: 'bookshop', meaning: '书店' },
    { word: 'supermarket', meaning: '超市' },
    { word: 'cinema', meaning: '电影院' },
  ],
  [
    phraseQuestion('原创地图标注：超市紧挨着邮局。超市在哪里？', ['It is next to the post office.', 'It is across from the post office.', 'It is between the post office and the school.'], 0, '地图标注说超市紧挨着邮局，对应 next to the post office。'),
    phraseQuestion('原创地图标注：医院在银行和学校之间。回答 “Where is the hospital?” 应选哪句？', ['It is between the bank and the school.', 'It is next to the bank.', 'It is across from the school.'], 0, 'between the bank and the school 与地图标注完全相符。'),
  ],
  ['地点名称', '位置关系'],
  [
    { label: 'hospital', categoryIndex: 0 }, { label: 'cinema', categoryIndex: 0 },
    { label: 'across from', categoryIndex: 1 }, { label: 'between', categoryIndex: 1 },
  ],
  { prompt: '把词卡排成“电影院在学校对面”。', items: ['school', 'is', 'cinema', 'The', 'from', 'across', 'the', '.'], correctOrderIndices: [3, 2, 1, 5, 4, 6, 0, 7] },
);

const followingARoute = lessonProfile(
  [
    { word: 'go straight', meaning: '直行' },
    { word: 'turn left', meaning: '向左转' },
    { word: 'turn right', meaning: '向右转' },
    { word: 'crossroads', meaning: '十字路口' },
  ],
  [
    phraseQuestion('路线卡：从家出发先直行，再在第一个十字路口左转。应该在哪里左转？', ['At the first crossroads.', 'At the second crossroads.', 'Across from the school.'], 0, '路线卡明确写着 at the first crossroads。'),
    phraseQuestion('路线记录：从家出发先直行，再在第一个十字路口右转；银行在左边。哪条指示符合记录？', ['Go straight and turn right at the first crossroads. The bank is on your left.', 'Go straight and turn left at the first crossroads. The bank is on your left.', 'Go straight and turn right at the second crossroads. The bank is on your right.'], 0, '只有第一项同时符合直行、在第一个路口右转、银行在左边三条记录。'),
  ],
  ['行进动作', '路口信息'],
  [
    { label: 'go straight', categoryIndex: 0 }, { label: 'turn right', categoryIndex: 0 },
    { label: 'the first crossroads', categoryIndex: 1 }, { label: 'the second crossroads', categoryIndex: 1 },
  ],
  { prompt: '把词卡排成“直行，在第一个十字路口向右转”。', items: ['turn right', 'and', 'Go', 'straight', 'the', 'first', 'at', 'crossroads', '.'], correctOrderIndices: [2, 3, 1, 0, 6, 4, 5, 7, 8] },
);

const planningAVisit = lessonProfile(
  [
    { word: 'before', meaning: '在……之前' },
    { word: 'get to', meaning: '到达' },
    { word: 'leave', meaning: '离开' },
    { word: 'send', meaning: '寄；发送' },
  ],
  [
    phraseQuestion('小组计划在 4:00 前到达邮局。哪句符合时间要求？', ['They get to the post office before 4:00.', 'They leave the post office before 4:00.', 'They get to the post office at 4:00.'], 0, 'before 4:00 表示在四点之前到达；at 4:00 是四点整。'),
    phraseQuestion('原创地图标注：玩具店在银行对面。根据这条位置关系，“The bank is ___ the toy shop.” 应填什么？', ['across from', 'next to', 'between'], 0, 'across from 表示“在……对面”；这条关系反过来描述仍然成立。'),
  ],
  ['地点名称', '时间或行程表达'],
  [
    { label: 'toy shop', categoryIndex: 0 }, { label: 'bank', categoryIndex: 0 },
    { label: 'before 4:00', categoryIndex: 1 }, { label: 'get to', categoryIndex: 1 },
  ],
  { prompt: '把词卡排成“我们四点前离开家”。', items: ['before', 'We', '4:00', '.', 'leave', 'home'], correctOrderIndices: [1, 4, 5, 0, 2, 3] },
);

export const unit = buildEnglishUnit({
  grade: 4,
  term: 2,
  formalUnitNumber: 1,
  entryId: 'unit-01',
  title: 'Unit 1 · My Neighbourhood',
  sourceTopics: [
    '社区地点词汇：bank、restaurant、post office、grocery、hospital、bookshop、school、supermarket，以及教材地图中的 park、cinema、toy shop',
    '描述地点位置：across from、next to、between ... and ...；询问 Where is ...?',
    '礼貌问路与路线回答：Excuse me.、Is there ... in the neighbourhood?、How can I get there/to ...?、You’re welcome.',
    '路线指令：go straight、turn left、turn right、at the first/second crossroads；辨认 on your left/right',
    '从起点规划邻里路线，按顺序描述经过地点，并理解 before、leave、get to、send 等行程信息',
  ],
  basicTasks: [
    makeTask('认读社区地点词汇', '认读银行、餐馆、邮局和食品杂货店等地点词汇，并从简单地图标注中辨认位置关系。', 'companion-03', neighbourhoodPlaces),
    makeTask('辨认位置与方向短语', '区分 across from、next to 等位置关系和 go straight、turn left 等路线指令。', 'companion-02', locationAndDirectionPhrases),
  ],
  advancedTasks: [
    makeTask('礼貌问路并听懂指引', '根据问路情境选择合适回答，辨认路线指令并整理完整问句。', 'companion-04', askingForDirections),
    makeTask('读懂街区位置图', '结合简短地图标注提取地点之间的位置关系，并用自然语序回答 Where is ...?。', 'companion-01', readingNeighbourhoodMap),
  ],
  highTasks: [
    makeTask('按路线卡到达指定地点', '同时核对行进动作、转弯方向和第几个十字路口，判断路线记录是否一致。', 'companion-03', followingARoute),
    makeTask('安排有时间要求的邻里行程', '综合地点关系与到达时间要求，判断行程信息并组织离家和到达的表达。', 'companion-04', planningAVisit),
  ],
});
