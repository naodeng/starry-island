import { buildEnglishUnit } from '../../../../grade-2/term-1/english/buildEnglishUnit';
import { lessonProfile, makeTask, phraseQuestion } from '../../../../grade-2/term-1/english/questionAuthoring';

const everydayTransportWords = lessonProfile(
  [
    { word: 'by bus', meaning: '乘公交车' },
    { word: 'by boat', meaning: '乘小船' },
    { word: 'by ship', meaning: '乘轮船' },
    { word: 'by car', meaning: '乘小汽车' },
  ],
  [
    phraseQuestion('想说“我通常坐公交车去上学”，哪句正确？', ['I usually go to school by bus.', 'I usually go school by bus.', 'I usually go to school with bus.'], 0, '说交通方式时用 by bus；go to school 中要保留 to。'),
    phraseQuestion('伙伴说 “I usually go to the park by car. What about you?” 你要回答“我通常乘小船去公园”，哪句正确？', ['I usually go to the park by boat.', 'I usually go to the park by bus.', 'I usually go to the zoo by boat.'], 0, '用 What about you? 接着交流时，可以说自己的路线；by boat 表示乘小船，目的地仍是 the park。'),
  ],
  ['by + 交通工具或船', '步行'],
  [
    { label: 'by bus', categoryIndex: 0 }, { label: 'by ship', categoryIndex: 0 },
    { label: 'on foot', categoryIndex: 1 }, { label: 'by boat', categoryIndex: 0 },
  ],
  { prompt: '把词卡排成“我通常开车去公园”。', items: ['usually', 'by', 'I', 'car', 'go', 'the', 'to', 'park', '.'], correctOrderIndices: [2, 0, 4, 6, 5, 7, 1, 3, 8] },
);

const schoolTravelPhrases = lessonProfile(
  [
    { word: 'by taxi', meaning: '乘出租车' },
    { word: 'by bike', meaning: '骑自行车' },
    { word: 'by school bus', meaning: '乘校车' },
    { word: 'on foot', meaning: '步行' },
  ],
  [
    phraseQuestion('同伴问 “How do you usually go to school?” 你要说“我通常步行上学”，选哪句？', ['I usually go to school on foot.', 'I usually go to school by foot.', 'I usually goes to school on foot.'], 0, '固定说法是 on foot；主语 I 后用 go。'),
    phraseQuestion('想说“我通常乘校车上学”，哪句正确？', ['I usually go to school by school bus.', 'I usually go to school by bike.', 'I usually go to the park by school bus.'], 0, 'by school bus 是乘校车，by bike 是骑车；去公园和上学的目的地也不同。'),
  ],
  ['问对方的出行方式', '介绍自己的出行方式'],
  [
    { label: 'How do you usually go to school?', categoryIndex: 0 }, { label: 'How do you usually go to the park?', categoryIndex: 0 },
    { label: 'I usually go to school by bike.', categoryIndex: 1 }, { label: 'I usually go to the park on foot.', categoryIndex: 1 },
  ],
  { prompt: '把词卡排成询问同伴平时怎么上学的问题。', items: ['school', 'How', 'usually', 'go', 'you', 'to', 'do', '?'], correctOrderIndices: [1, 6, 4, 2, 3, 5, 0, 7] },
);

const travelModesAndDestinations = lessonProfile(
  [
    { word: 'by subway', meaning: '乘地铁' },
    { word: 'by plane', meaning: '乘飞机' },
    { word: 'by train', meaning: '乘火车' },
    { word: 'by taxi', meaning: '乘出租车' },
  ],
  [
    phraseQuestion('想说“我通常乘地铁上学”，哪句正确？', ['I usually go to school by subway.', 'I usually goes to school by subway.', 'I usually go school by subway.'], 0, 'I usually 后接 go；go to school 中要有 to，交通方式用 by subway。'),
    phraseQuestion('想说“我通常乘火车去公园”，哪句正确？', ['I usually go to the park by train.', 'I usually go to the park by bus.', 'I usually go to school by train.'], 0, 'by train 是乘火车；其余句子分别换了交通方式或目的地。'),
  ],
  ['陆地交通方式', '水上交通方式'],
  [
    { label: 'by subway', categoryIndex: 0 }, { label: 'by boat', categoryIndex: 1 },
    { label: 'by train', categoryIndex: 0 }, { label: 'by ship', categoryIndex: 1 },
  ],
  { prompt: '把词卡排成“我通常乘地铁上学”。', items: ['subway', 'I', 'school', 'usually', 'by', 'to', 'go', '.'], correctOrderIndices: [1, 3, 6, 5, 2, 4, 0, 7] },
);

const surveyAndReport = lessonProfile(
  [
    { word: 'often', meaning: '经常' },
    { word: 'by school bus', meaning: '乘校车' },
    { word: 'by subway', meaning: '乘地铁' },
    { word: 'by bike', meaning: '骑自行车' },
  ],
  [
    phraseQuestion('调查记录写着“Sue 经常乘地铁上学”，哪句转述正确？', ['Sue often goes to school by subway.', 'Sue often go to school by subway.', 'Sue often goes school by subway.'], 0, '介绍 Sue 平时的情况时，often 后用 goes；go to school 中保留 to。'),
    phraseQuestion('记录写着“Binbin 通常骑自行车上学”，哪句转述正确？', ['Binbin usually goes to school by bike.', 'Binbin usually go to school by bike.', 'Binbin usually goes to school on bike.'], 0, '介绍 Binbin 的日常路线时，go 要变为 goes；本单元用 by bike。'),
  ],
  ['介绍自己', '介绍同伴'],
  [
    { label: 'I usually go to school by bike.', categoryIndex: 0 }, { label: 'I often go to school by subway.', categoryIndex: 0 },
    { label: 'Sue often goes to school by subway.', categoryIndex: 1 }, { label: 'Binbin usually goes to school by bike.', categoryIndex: 1 },
  ],
  { prompt: '把词卡排成一句介绍 Sue 的上学方式。', items: ['often', 'Sue', 'subway', 'by', 'goes', 'school', 'to', '.'], correctOrderIndices: [1, 0, 4, 6, 5, 3, 2, 7] },
);

const dailyTravelRecord = lessonProfile(
  [
    { word: 'on foot', meaning: '步行' },
    { word: 'by bike', meaning: '骑自行车' },
    { word: 'by car', meaning: '乘小汽车' },
    { word: 'by bus', meaning: '乘公交车' },
  ],
  [
    phraseQuestion('出行记录：Ming 平时步行上学；下雨天坐小汽车上学。下雨天 Ming 怎么去学校？', ['By car.', 'On foot.', 'By bike.'], 0, '记录里的下雨天路线是乘小汽车；平时的路线才是步行。'),
    phraseQuestion('出行记录：Ming 平时步行上学；妈妈骑自行车上班；爸爸乘公交车上班。谁通常骑自行车上班？', ['Mum.', 'Dad.', 'Ming.'], 0, '记录把骑自行车上班的路线对应给 Mum。'),
  ],
  ['Ming 的出行', '父母的出行'],
  [
    { label: 'Ming usually goes to school on foot.', categoryIndex: 0 }, { label: 'Mum usually goes to work by bike.', categoryIndex: 1 },
    { label: 'Ming goes to school by car on rainy days.', categoryIndex: 0 }, { label: 'Dad usually goes to work by bus.', categoryIndex: 1 },
  ],
  { prompt: '把词卡排成“Ming 下雨天乘小汽车上学”。', items: ['rainy', 'Ming', 'by', 'days', '.', 'goes', 'car', 'school', 'on', 'to'], correctOrderIndices: [1, 5, 9, 7, 2, 6, 8, 0, 3, 4] },
);

const tripPosterAndArWords = lessonProfile(
  [
    { word: 'park', meaning: '公园' },
    { word: 'car', meaning: '小汽车' },
    { word: 'card', meaning: '卡片' },
    { word: 'farm', meaning: '农场' },
  ],
  [
    phraseQuestion('小组要去 Fruit Garden，在 school gate 集合并坐校车去。哪张海报同时符合要求？', ['Meeting Place: school gate. Transportation: by school bus.', 'Meeting Place: Fruit Garden. Transportation: by school bus.', 'Meeting Place: school gate. Transportation: by bike.'], 0, '海报要同时写出集合地点 school gate 和交通方式 by school bus。'),
    phraseQuestion('哪个英文词表示“公园”，拼写也符合本单元的 ar 词卡？', ['park', 'prka', 'parc'], 0, 'park 表示“公园”，字母顺序是 p-a-r-k。'),
  ],
  ['交通方式', '地点信息'],
  [
    { label: 'by school bus', categoryIndex: 0 }, { label: 'by bike', categoryIndex: 0 },
    { label: 'school gate', categoryIndex: 1 }, { label: 'Fruit Garden', categoryIndex: 1 },
  ],
  { prompt: '把词卡排成“我通常骑自行车去公园”。', items: ['by', 'park', 'I', 'bike', 'to', 'usually', 'the', 'go', '.'], correctOrderIndices: [2, 5, 7, 4, 6, 1, 0, 3, 8] },
);

export const unit = buildEnglishUnit({
  grade: 4,
  term: 1,
  formalUnitNumber: 3,
  entryId: 'unit-03',
  title: 'Unit 3 · Transportation',
  sourceTopics: [
    '交通方式词组：by bus、by boat、by ship、by car、by taxi、by bike、on foot、by school bus、by subway、by plane、by train',
    '询问和介绍日常出行方式：How do you usually go to school?、I usually go to ... by ...、I usually go to school on foot.、What about you?',
    '根据调查介绍同伴的日常路线：... often goes to school by ...',
    '阅读日常出行记录，辨认平时交通方式与雨天出行变化',
    '活动海报信息：Time、Meeting Place、Transportation；识别集合地点和出行方式',
    'Let’s Spell 中 ar 拼读词：park、car、bar、arm、card、farm',
  ],
  basicTasks: [
    makeTask('认读常见交通方式', '认读公交车、船和汽车的交通方式词组，并练习用 by + 交通方式介绍日常路线。', 'companion-03', everydayTransportWords),
    makeTask('询问平时怎么上学', '辨认 on foot、by bike、by taxi 和 by school bus，并用 How do you usually ...? 询问出行方式。', 'companion-02', schoolTravelPhrases),
  ],
  advancedTasks: [
    makeTask('按目的地描述交通方式', '把地铁、飞机、火车等交通词组用于熟悉的学校和公园情境，正确表达通常路线。', 'companion-04', travelModesAndDestinations),
    makeTask('读懂调查并转述路线', '从简单调查记录提取交通方式，用 often goes 等句式介绍同伴的日常路线。', 'companion-01', surveyAndReport),
  ],
  highTasks: [
    makeTask('比较日常与雨天路线', '综合人物和天气信息，从出行记录中找出平时路线与雨天变化并组织完整表达。', 'companion-03', dailyTravelRecord),
    makeTask('核对活动海报与 ar 拼写', '同时核对集合地点和交通方式，并辨认本单元 ar 拼读词的拼写与词义。', 'companion-04', tripPosterAndArWords),
  ],
});
