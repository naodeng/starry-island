import { buildEnglishUnit } from '../../../../grade-2/term-1/english/buildEnglishUnit';
import { lessonProfile, makeTask, phraseQuestion } from '../../../../grade-2/term-1/english/questionAuthoring';

// 核对固定 TapX 快照：英语四年级上册目录 PDF 第6页；U5 印刷页48–57（PDF页53–62）。
const schoolSafetyBasics = lessonProfile(
  [
    { word: 'careful', meaning: '小心的；仔细的' },
    { word: 'dangerous', meaning: '危险的' },
    { word: 'stairs', meaning: '楼梯' },
    { word: 'window ledge', meaning: '窗台' },
  ],
  [
    phraseQuestion('哪句话提醒孩子不要跑下楼梯？', ["Don't run down the stairs. It's dangerous!", 'Please run down the stairs.', 'The stairs are in the playground.'], 0, '先找出明确提醒不要做的动作，再核对地点是不是楼梯。'),
    phraseQuestion('看到有人爬窗台，哪句提醒最符合本单元？', ["Don't climb on the window ledge.", 'Please climb on the window ledge.', 'The window ledge is a green light.'], 0, '课文提醒不要爬窗台，因为这样做有危险。'),
  ],
  ['安全提醒', '危险行为'],
  [
    { label: 'Be careful!', categoryIndex: 0 }, { label: "Don't run down the stairs.", categoryIndex: 0 },
    { label: 'Run down the stairs.', categoryIndex: 1 }, { label: 'Climb on the window ledge.', categoryIndex: 1 },
  ],
  { prompt: '把词卡排成“不要爬窗台。”', items: ["Don't", 'climb', 'on', 'the', 'window', 'ledge.'], correctOrderIndices: [0, 1, 2, 3, 4, 5] },
);

const streetSafetyBasics = lessonProfile(
  [
    { word: 'sidewalk', meaning: '人行道' },
    { word: 'green light', meaning: '绿灯' },
    { word: 'traffic', meaning: '来往车辆；交通' },
    { word: 'playground', meaning: '操场；游乐场' },
  ],
  [
    phraseQuestion('走在街边时，课文建议行人走哪里？', ['Use the sidewalk.', 'Play football in the street.', 'Run between the cars.'], 0, '人行道是行人安全行走的地方；街道不是踢球的场地。'),
    phraseQuestion('交通灯还是红色时，应该怎样做？', ['Stop and wait.', 'Run across the street.', 'Play football in the street.'], 0, '课文写到红灯时要停下；绿灯亮了再按提示通行。'),
  ],
  ['街道安全规则', '居家或校园安全规则'],
  [
    { label: 'Please use the sidewalk.', categoryIndex: 0 }, { label: 'Please wait for the green light.', categoryIndex: 0 },
    { label: "Don't leave toys on the floor.", categoryIndex: 1 }, { label: "Don't climb on the window ledge.", categoryIndex: 1 },
  ],
  { prompt: '把词卡排成“请等绿灯。”', items: ['green', 'Please', 'light.', 'wait', 'for', 'the'], correctOrderIndices: [1, 3, 4, 5, 0, 2] },
);

const homeAndSchoolRules = lessonProfile(
  [
    { word: 'throw', meaning: '扔；投' },
    { word: 'stranger', meaning: '陌生人' },
    { word: 'door', meaning: '门' },
    { word: 'toys', meaning: '玩具' },
  ],
  [
    phraseQuestion('地上有玩具，容易让人绊倒。哪句提醒和 Fun Time 的安全图相符？', ["Don't leave toys on the floor.", 'Throw toys out of the window.', 'Play with toys on the stairs.'], 0, 'Fun Time 提醒不要把玩具留在地板上，以免绊倒。'),
    phraseQuestion('有人敲门，但家长不在身边。哪句安全规则适合提醒孩子？', ["Don't open the door for a stranger.", 'Open the door for every stranger.', 'Run down the stairs to answer the door.'], 0, '教材提醒不要给陌生人开门；有需要时先找可信任的大人。'),
  ],
  ['不安全的行为', '安全提醒'],
  [
    { label: "Don't throw things out of the window.", categoryIndex: 0 }, { label: "Don't open the door for a stranger.", categoryIndex: 0 },
    { label: 'Please be careful.', categoryIndex: 1 }, { label: 'Please use the sidewalk.', categoryIndex: 1 },
  ],
  { prompt: '把词卡排成“不要把东西从窗户扔出去。”', items: ['window.', 'of', 'out', 'the', 'things', 'throw', "Don't"], correctOrderIndices: [6, 5, 4, 2, 1, 3, 0] },
);

const readingTrafficAndPlaygroundRules = lessonProfile(
  [
    { word: 'red', meaning: '红色的' },
    { word: 'stop', meaning: '停下' },
    { word: 'safe', meaning: '安全的' },
    { word: 'football', meaning: '足球' },
  ],
  [
    phraseQuestion('交通灯是绿色，警察提醒 “Please go.”。这时可以怎样做？', ['Follow the signal and cross carefully.', 'Stop in the middle of the road and play.', 'Run down the stairs.'], 0, '绿灯时也要按照交通信号，在安全的地方小心通行。'),
    phraseQuestion('读一读安全规则：Don’t play football in the street. Please play football in the playground. 足球应该在哪里踢？', ['In the playground.', 'In the street.', 'Between moving cars.'], 0, '规则说明街道不是踢球的地方，应该到操场踢球。'),
  ],
  ['街道或交通规则', '游戏与居家规则'],
  [
    { label: 'The light is red. Stop.', categoryIndex: 0 }, { label: 'Please use the sidewalk.', categoryIndex: 0 },
    { label: 'Please play football in the playground.', categoryIndex: 1 }, { label: "Don't leave toys on the floor.", categoryIndex: 1 },
  ],
  { prompt: '把词卡排成“灯是红色的。停下。”', items: ['Stop.', 'light', 'red.', 'The', 'is'], correctOrderIndices: [3, 1, 4, 2, 0] },
);

const littleBearLearnsAboutFireworks = lessonProfile(
  [
    { word: 'firecracker', meaning: '鞭炮' },
    { word: 'hurt', meaning: '受伤的；疼痛的' },
    { word: 'burn', meaning: '烧伤；燃烧' },
    { word: 'nurse', meaning: '护士' },
  ],
  [
    phraseQuestion('Little Bear 点燃鞭炮时，家人为什么提醒他 “Be careful!”？', ['Firecrackers can hurt someone.', 'A nurse is carrying a purse.', 'The playground has a green light.'], 0, 'Story Time 中 Little Bear 点鞭炮后受了伤，家人的提醒是在告诉他注意危险。'),
    phraseQuestion('本单元 Let’s Spell 中，哪组三个词都含有字母组合 “ur”？', ['hurt, nurse, burn', 'heart, nurse, burn', 'hurt, nice, burn'], 0, '逐个检查字母：hurt、nurse 和 burn 都含有 u 和 r。'),
  ],
  ['故事中的危险或伤情', '照护或求助'],
  [
    { label: 'Little Bear lights a firecracker.', categoryIndex: 0 }, { label: 'His arm hurts.', categoryIndex: 0 },
    { label: 'Take him to the nurse.', categoryIndex: 1 }, { label: 'Ask a trusted adult for help.', categoryIndex: 1 },
  ],
  { prompt: '把词卡排成“请带他去找护士。”', items: ['Please', 'take', 'him', 'to', 'the', 'nurse.'], correctOrderIndices: [0, 1, 2, 3, 4, 5] },
);

const littleBearGetsHelpAfterAnAccident = lessonProfile(
  [
    { word: 'broken leg', meaning: '骨折的腿' },
    { word: 'call 120', meaning: '拨打120求助' },
    { word: 'hospital', meaning: '医院' },
    { word: 'next time', meaning: '下次' },
  ],
  [
    phraseQuestion('Story Time 中，小熊被自行车撞倒后说 “My leg hurts. I can’t walk.”。接下来应该怎么办？', ['Ask an adult for help and call 120.', 'Keep walking alone in the street.', 'Play football beside the road.'], 0, '故事里同伴询问小熊情况并拨打120；遇到受伤情况要向可信任的大人求助。'),
    phraseQuestion('小熊腿受伤后被送去哪里？', ['To the hospital.', 'To the playground.', 'To the window ledge.'], 0, '故事中的救援人员把小熊送到医院。'),
  ],
  ['事故与伤情线索', '求助和照护行动'],
  [
    { label: 'A bike is coming.', categoryIndex: 0 }, { label: 'The child has a broken leg.', categoryIndex: 0 },
    { label: 'Call 120.', categoryIndex: 1 }, { label: 'Take the child to the hospital.', categoryIndex: 1 },
  ],
  { prompt: '把词卡排成“小熊说：下次请走人行道。”', items: ['Please', 'use', 'the', 'sidewalk', 'next', 'time.'], correctOrderIndices: [0, 1, 2, 3, 4, 5] },
);

export const unit = buildEnglishUnit({
  grade: 4,
  term: 1,
  formalUnitNumber: 5,
  entryId: 'unit-05',
  title: 'Unit 5 · Safety',
  sourceTopics: [
    '居家和校园规则：Don’t run down the stairs、Don’t climb on the window ledge、Don’t play with fire；用 Be careful! 和 It’s dangerous! 提醒安全',
    '街道安全表达：use the sidewalk、wait for the green light、The light is red. Stop.；不要在街上踢足球，应到 playground 活动',
    'Fun Time 安全提醒：不要从窗户扔东西、不要在有火源处做饭、留心来往车辆、不要给陌生人开门、不要把玩具留在地板上',
    'Story Time：Little Bear 点鞭炮、被热水烫伤、下楼摔伤及自行车碰撞后，朋友提醒、求助并送医的连续情节',
    'Let’s Spell：hurt、nurse、purse、purple、turtle、burn 等含有 “ur” 的词及听辨、拼写练习',
    '自我评价目标：辨认并书写部分安全规则，用简单英语提醒同伴安全行动',
  ],
  basicTasks: [
    makeTask('认读校园安全提醒', '辨认楼梯、窗台等地点和危险行为，读懂简短的安全提醒。', 'companion-03', schoolSafetyBasics),
    makeTask('遵守街道安全规则', '根据人行道、交通灯和活动场地等线索选择安全做法。', 'companion-02', streetSafetyBasics),
  ],
  advancedTasks: [
    makeTask('读懂居家安全规则', '从 Fun Time 的图片和句子中辨认抛物、陌生人开门和地面玩具等风险。', 'companion-04', homeAndSchoolRules),
    makeTask('整理街道与游乐场规则', '结合红绿灯、安全通行和踢球场地的规则提取信息。', 'companion-01', readingTrafficAndPlaygroundRules),
  ],
  highTasks: [
    makeTask('理解小熊故事中的危险与求助', '根据连续故事判断危险、受伤和照护行动，并练习本单元 ur 拼写词。', 'companion-03', littleBearLearnsAboutFireworks),
    makeTask('从交通事故故事中提取信息', '联系受伤线索、拨打120、送医和下次安全通行的故事信息。', 'companion-04', littleBearGetsHelpAfterAnAccident),
  ],
});
