import { buildEnglishUnit } from '../../../../grade-2/term-1/english/buildEnglishUnit';
import { lessonProfile, makeTask, phraseQuestion } from '../../../../grade-2/term-1/english/questionAuthoring';

// 核对固定 TapX 快照：英语四年级上册目录 PDF 第6页；U6 印刷页58–67（PDF页63–72）。
const recognizingCommunityJobs = lessonProfile(
  [
    { word: 'police officer', meaning: '警察' },
    { word: 'bus driver', meaning: '公交车司机' },
    { word: 'doctor', meaning: '医生' },
    { word: 'nurse', meaning: '护士' },
  ],
  [
    phraseQuestion('一位同学说：“I want to be a police officer in the future.” 他想从事哪种职业？', ['警察', '公交车司机', '护士'], 0, '句子中的职业名称是 police officer。'),
    phraseQuestion('医院里，哪种职业会为病人提供护理帮助？', ['A nurse.', 'A taxi driver.', 'A farmer.'], 0, '护士在医院里照顾病人；出租车司机和农民从事其他工作。'),
  ],
  ['医院里的工作', '其他职业'],
  [
    { label: 'doctor', categoryIndex: 0 }, { label: 'nurse', categoryIndex: 0 },
    { label: 'police officer', categoryIndex: 1 }, { label: 'bus driver', categoryIndex: 1 },
  ],
  { prompt: '把词卡排成“我将来想当一名警察。”', items: ['officer.', 'want', 'a', 'police', 'be', 'to', 'I'], correctOrderIndices: [6, 1, 5, 4, 2, 3, 0] },
);

const talkingAboutFutureJobs = lessonProfile(
  [
    { word: 'taxi driver', meaning: '出租车司机' },
    { word: 'farmer', meaning: '农民' },
    { word: 'worker', meaning: '工人' },
    { word: 'cook', meaning: '厨师' },
  ],
  [
    phraseQuestion('同伴问：“What do you want to be in the future?” 哪句回答了将来想从事的职业？', ['I want to be a farmer.', 'I have many toy cars.', 'My mother works in a hospital.'], 0, 'I want to be a farmer. 直接回答了将来想做什么工作。'),
    phraseQuestion('小林喜欢吃东西，也常在家做饭。他想成为哪种职业？', ['A cook.', 'A worker.', 'A taxi driver.'], 0, '喜欢做饭的线索对应 cook；另外两项不表示做饭。'),
  ],
  ['驾驶车辆的职业', '其他职业'],
  [
    { label: 'taxi driver', categoryIndex: 0 }, { label: 'bus driver', categoryIndex: 0 },
    { label: 'farmer', categoryIndex: 1 }, { label: 'cook', categoryIndex: 1 },
  ],
  { prompt: '把词卡排成“你将来想做什么工作？”', items: ['future?', 'want', 'be', 'do', 'the', 'What', 'in', 'you', 'to'], correctOrderIndices: [5, 3, 7, 1, 8, 2, 6, 4, 0] },
);

const readingAFutureJobSurvey = lessonProfile(
  [
    { word: 'survey', meaning: '调查' },
    { word: 'name', meaning: '姓名' },
    { word: 'job', meaning: '工作；职业' },
    { word: 'in the future', meaning: '将来' },
  ],
  [
    phraseQuestion('调查表中，Joy 在 “police officer” 一栏打了勾。哪句话转述了她的选择？', ['Joy wants to be a police officer.', 'Joy want to be a doctor.', 'Joy wants to be a nurse.'], 0, 'Joy 的勾选落在 police officer 一栏；介绍一位同学的想法时，主语 Joy 后用 wants。'),
    phraseQuestion('要问同学“你将来想做什么工作？”，哪句合适？', ['What do you want to be in the future?', 'Where are you from?', 'What is your favourite food?'], 0, 'What do you want to be in the future? 询问将来的职业愿望。'),
  ],
  ['调查问题', '回答或记录'],
  [
    { label: 'What do you want to be in the future?', categoryIndex: 0 }, { label: 'What job do you want?', categoryIndex: 0 },
    { label: 'I want to be a nurse.', categoryIndex: 1 }, { label: 'Joy wants to be a police officer.', categoryIndex: 1 },
  ],
  { prompt: '把词卡排成“她将来想当一名护士。”', items: ['nurse.', 'wants', 'She', 'a', 'be', 'to'], correctOrderIndices: [2, 1, 5, 4, 3, 0] },
);

const matchingJobCluesAndSpelling = lessonProfile(
  [
    { word: 'driver', meaning: '司机' },
    { word: 'farmer', meaning: '农民' },
    { word: 'doctor', meaning: '医生' },
    { word: 'worker', meaning: '工人' },
  ],
  [
    phraseQuestion('哪一个职业单词的拼写中含有字母组合 “ar”？', ['farmer', 'doctor', 'driver'], 0, '检查每个词的字母：farmer 中能找到连续的 ar。'),
    phraseQuestion('本单元 Let’s Spell 的词卡中，哪两个词都含有连续字母 “or”？', ['horn and pork', 'arm and dirt', 'turtle and bird'], 0, 'horn 和 pork 的拼写中都有连续的 or。'),
  ],
  ['驾驶车辆的工作', '其他工作'],
  [
    { label: 'bus driver', categoryIndex: 0 }, { label: 'taxi driver', categoryIndex: 0 },
    { label: 'farmer', categoryIndex: 1 }, { label: 'doctor', categoryIndex: 1 },
  ],
  { prompt: '把词卡排成“我想将来当一名出租车司机。”', items: ['taxi', 'want', 'driver.', 'a', 'to', 'be', 'I'], correctOrderIndices: [6, 1, 4, 5, 3, 0, 2] },
);

const followingTheMonkeyJobStory = lessonProfile(
  [
    { word: 'job', meaning: '工作；职业' },
    { word: 'fireman', meaning: '消防员' },
    { word: 'taxi driver', meaning: '出租车司机' },
    { word: 'football player', meaning: '足球运动员' },
  ],
  [
    phraseQuestion('Story Time 开始时，小猴子告诉鹦鹉自己想要什么？', ['A job.', 'A toy car.', 'A new schoolbag.'], 0, '故事开头，小猴子说自己想要一份工作。'),
    phraseQuestion('小猴子觉得自己个子太矮，不适合开出租车后，朋友建议他试试什么？', ['Being a singer.', 'Being a farmer.', 'Being a nurse.'], 0, '故事里鹦鹉先建议消防员、出租车司机和歌手，后来又建议足球运动员。'),
  ],
  ['小猴子的想法或困难', '鹦鹉给出的建议'],
  [
    { label: 'I want a job.', categoryIndex: 0 }, { label: 'I am too small.', categoryIndex: 0 },
    { label: 'You can be a fireman.', categoryIndex: 1 }, { label: 'You can be a taxi driver.', categoryIndex: 1 },
  ],
  { prompt: '按故事先后整理小猴子找到合适工作的过程。', items: ['小猴子告诉鹦鹉自己想找一份工作', '鹦鹉建议他当消防员', '小猴子觉得自己太小，不能当消防员', '鹦鹉接着建议他开出租车', '小猴子觉得自己太矮，不能开出租车', '鹦鹉又建议他当歌手', '鹦鹉最后想到足球运动员这个工作', '小猴子踢起足球，觉得这份工作很适合自己'], correctOrderIndices: [0, 1, 2, 3, 4, 5, 6, 7] },
);

const connectingInterestsAndFutureJobs = lessonProfile(
  [
    { word: 'vet', meaning: '兽医' },
    { word: 'writer', meaning: '作家' },
    { word: 'hairdresser', meaning: '美发师' },
    { word: 'fashion designer', meaning: '服装设计师' },
  ],
  [
    phraseQuestion('兴趣卡写着：“I love animals. I have many pets at home.” 这位同学将来想做什么？', ['A vet.', 'A writer.', 'A bus driver.'], 0, '喜欢动物、照顾宠物的线索对应兽医。'),
    phraseQuestion('兴趣卡写着：“I like pretty clothes. I am good at drawing.” 哪种职业和这些线索最匹配？', ['A fashion designer.', 'A farmer.', 'A police officer.'], 0, '喜欢漂亮衣服并擅长画画，与服装设计师的工作相符。'),
  ],
  ['照顾动物或提供美发服务', '写作或服装设计'],
  [
    { label: 'vet', categoryIndex: 0 }, { label: 'hairdresser', categoryIndex: 0 },
    { label: 'writer', categoryIndex: 1 }, { label: 'fashion designer', categoryIndex: 1 },
  ],
  { prompt: '把词卡排成“我将来想当一名兽医。”', items: ['vet', 'future.', 'a', 'be', 'want', 'the', 'I', 'to', 'in'], correctOrderIndices: [6, 4, 7, 3, 2, 0, 8, 5, 1] },
);

export const unit = buildEnglishUnit({
  grade: 4,
  term: 1,
  formalUnitNumber: 6,
  entryId: 'unit-06',
  title: 'Unit 6 · Jobs',
  sourceTopics: [
    '职业词汇：police officer、bus driver、taxi driver、doctor、nurse、farmer、worker 和 cook；用 What do you want to be in the future? 与 I want to be a ... 询问和表达职业愿望',
    '根据调查表中的姓名与职业勾选记录，介绍同学将来想从事的工作，练习 wants to be 的第三人称表达',
    '根据爱好推测合适的职业：喜欢动物与兽医、喜欢读书与作家、喜欢衣物和画画与服装设计师、喜欢帮助人变美与美发师',
    'Story Time：小猴子依次尝试消防员、出租车司机和歌手，最后发现足球运动员适合自己',
    'Let’s Spell：辨认 arm、horn、driver、dirt、bar、pork、fur、bird 等单词中的 ar、or、ir、ur 等字母组合',
    '自我评价目标：认读职业词汇、介绍将来的职业愿望，并从兴趣线索中理解职业选择',
  ],
  basicTasks: [
    makeTask('认读常见职业名称', '辨认警察、司机、医生和护士等职业词汇，并根据工作场景选择合适的名称。', 'companion-03', recognizingCommunityJobs),
    makeTask('询问将来的职业愿望', '使用 What do you want to be in the future? 询问，并用 I want to be a ... 回答。', 'companion-02', talkingAboutFutureJobs),
  ],
  advancedTasks: [
    makeTask('阅读职业愿望调查表', '从姓名和职业勾选中提取信息，用完整句子介绍同学的职业愿望。', 'companion-04', readingAFutureJobSurvey),
    makeTask('根据职业线索辨认拼写', '从工作类型和 Let’s Spell 词卡中识别职业与字母组合，核对相关词语拼写。', 'companion-01', matchingJobCluesAndSpelling),
  ],
  highTasks: [
    makeTask('梳理小猴寻找工作的故事', '根据连续故事线索整理小猴子遇到的困难、朋友的建议和最终选择。', 'companion-03', followingTheMonkeyJobStory),
    makeTask('从兴趣线索选择未来职业', '结合人物的兴趣和擅长的事情，判断 Fun Time 中介绍的职业选择。', 'companion-04', connectingInterestsAndFutureJobs),
  ],
});
