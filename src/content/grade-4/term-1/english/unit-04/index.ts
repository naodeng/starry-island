import { buildEnglishUnit } from '../../../../grade-2/term-1/english/buildEnglishUnit';
import { lessonProfile, makeTask, phraseQuestion } from '../../../../grade-2/term-1/english/questionAuthoring';

const schoolSupplies = lessonProfile(
  [
    { word: 'pen', meaning: '钢笔' },
    { word: 'knife', meaning: '小刀' },
    { word: 'eraser', meaning: '橡皮' },
    { word: 'crayon', meaning: '蜡笔' },
  ],
  [
    phraseQuestion('同伴问 “Do you have erasers?” 你想肯定地回答“有”，选哪句？', ['Yes, we do.', "Sorry, we don't.", 'Sure. Here you are.'], 0, 'Do you have ...? 的肯定回答是 Yes, we do.；后两句分别表示没有和递给对方。'),
    phraseQuestion('想问同伴“你有橡皮吗？”，哪句语法正确？', ['Do you have erasers?', 'Are you have erasers?', 'Can you has erasers?'], 0, '询问有没有某物用 Do you have ...?，you 后用 have。'),
  ],
  ['文具名称', '对话句子'],
  [
    { label: 'pen', categoryIndex: 0 }, { label: 'crayon', categoryIndex: 0 },
    { label: 'Do you have erasers?', categoryIndex: 1 }, { label: 'Yes, we do.', categoryIndex: 1 },
  ],
  { prompt: '把词卡排成“你有蜡笔吗？”，注意问号。', items: ['crayons', 'you', '?', 'Do', 'have'], correctOrderIndices: [3, 1, 4, 0, 2] },
);

const askingToUseSupplies = lessonProfile(
  [
    { word: 'glue stick', meaning: '胶棒' },
    { word: 'scissors', meaning: '剪刀' },
    { word: 'paper', meaning: '纸' },
    { word: 'ruler', meaning: '尺子' },
  ],
  [
    phraseQuestion('想礼貌地请求借用同伴的尺子，哪句表达正确？', ['Can I use your ruler, please?', 'Can I use you ruler, please?', 'Do I use your ruler, please?'], 0, '礼貌请求可以说 Can I use your ...?；your 后要接 ruler，please 放在句末。'),
    phraseQuestion('同伴要借尺子，但你没有尺子。哪句回答符合情况？', ["Sorry, I don't have one.", 'Sure. Here you are.', "Sorry, I'm using it."], 0, '你没有尺子时可以说 I don’t have one；另外两句分别表示可以借出和正在使用。'),
  ],
  ['借用请求', '请求回应'],
  [
    { label: 'Can I use your scissors, please?', categoryIndex: 0 }, { label: 'Can I use your glue stick?', categoryIndex: 0 },
    { label: 'Sure. Here you are.', categoryIndex: 1 }, { label: "Sorry, I'm using it.", categoryIndex: 1 },
  ],
  { prompt: '把词卡排成“我可以用一下你的剪刀吗？”，注意礼貌用语。', items: ['please?', 'scissors,', 'use', 'your', 'I', 'Can'], correctOrderIndices: [5, 4, 2, 3, 1, 0] },
);

const askingForHelpAtTheCentre = lessonProfile(
  [
    { word: 'Information Centre', meaning: '咨询中心' },
    { word: 'phone', meaning: '电话' },
    { word: 'find', meaning: '找到' },
    { word: 'hamburger shop', meaning: '汉堡包店' },
  ],
  [
    phraseQuestion('一个孩子在公园里找不到爸爸，于是去 Information Centre 求助。他最需要借用什么？', ['A phone.', 'A crayon.', 'A glue stick.'], 0, '孩子想联系爸爸，所以需要借电话；蜡笔和胶棒不能帮助他打电话。'),
    phraseQuestion('故事信息：Steven 在公园里找不到爸爸，于是到 Information Centre 借电话联系爸爸。爸爸接通后告诉 Steven，他正在 hamburger shop。Steven 的爸爸在哪里？', ['At the hamburger shop.', 'At the Information Centre.', 'At the school gate.'], 0, '故事信息说明 Steven 的爸爸正在 hamburger shop。'),
  ],
  ['求助资源或地点', '求助动作'],
  [
    { label: 'phone', categoryIndex: 0 }, { label: 'Information Centre', categoryIndex: 0 },
    { label: 'ask to use a phone', categoryIndex: 1 }, { label: 'find a parent', categoryIndex: 1 },
  ],
  { prompt: '把词卡排成“打扰一下。我可以用一下你的电话吗？”，注意句子标点。', items: ['phone?', 'Excuse', 'use', 'I', 'me.', 'your', 'Can'], correctOrderIndices: [1, 4, 6, 3, 2, 5, 0] },
);

const choosingAPoliteReply = lessonProfile(
  [
    { word: 'use', meaning: '使用' },
    { word: 'please', meaning: '请' },
    { word: 'Sorry, I’m using it.', meaning: '对不起，我正在用。' },
    { word: 'Sure. Here you are.', meaning: '当然可以，给你。' },
  ],
  [
    phraseQuestion('同伴礼貌地请求借胶棒，而你正在用它。哪句回答符合情况？', ["Sorry, I'm using it.", 'Sure. Here you are.', "Sorry, I don't have one."], 0, '胶棒正在使用时，应说明 I’m using it；其他选项表示可以借出或手边没有。'),
    phraseQuestion('同伴把钢笔递给你，并说 “Here you are.” 你想表达感谢，哪句合适？', ['Thank you.', 'Sorry, I’m using it.', 'Do you have a pen?'], 0, '收到别人递来的物品后，可以说 Thank you.；另外两句不是感谢回应。'),
  ],
  ['肯定回应或感谢', '暂时不能借用'],
  [
    { label: 'Sure. Here you are.', categoryIndex: 0 }, { label: 'Thank you.', categoryIndex: 0 },
    { label: "Sorry, I’m using it.", categoryIndex: 1 }, { label: "Sorry, I don't have one.", categoryIndex: 1 },
  ],
  { prompt: '把词卡排成“当然可以，给你。”', items: ['are.', 'you', 'Here'], correctOrderIndices: [2, 1, 0] },
);

const readingARescueStory = lessonProfile(
  [
    { word: 'plane', meaning: '飞机' },
    { word: 'hurt', meaning: '受伤的' },
    { word: 'snow', meaning: '雪' },
    { word: 'SOS', meaning: '求救信号' },
  ],
  [
    phraseQuestion('故事信息：Mary 和妈妈乘小飞机出行，飞机出了故障，妈妈受伤；Mary 在雪地写 SOS；飞行员看到后打电话求助，最后直升机救援。根据这些信息，哪组事件顺序正确？', ['乘小飞机出行 → 飞机出故障 → 妈妈受伤 → Mary 在雪地写 SOS → 飞行员求助 → 直升机救援。', '在雪地写 SOS → 乘小飞机出行 → 直升机救援 → 飞机出故障。', '飞机出故障 → 直升机救援 → Mary 和妈妈乘飞机离开。'], 0, '题面给出的故事顺序是乘机、飞机出故障、妈妈受伤、Mary 写 SOS、飞行员求助，最后直升机救援。'),
    phraseQuestion('故事信息：Mary 和妈妈乘小飞机出行，途中飞机出了故障，妈妈受伤，Mary 在雪地写下 SOS。飞行员看到 SOS 后，接下来发生了什么？', ['The pilot calls for help.', 'Mary and her mother fly home.', 'They find the Information Centre.'], 0, '飞行员看到求救信号后打电话求助，之后直升机赶来救援。'),
  ],
  ['遇到的困难', '求助行动'],
  [
    { label: 'The plane has a problem.', categoryIndex: 0 }, { label: 'Mary’s mother is hurt.', categoryIndex: 0 },
    { label: 'Mary writes SOS in the snow.', categoryIndex: 1 }, { label: 'A pilot calls for help.', categoryIndex: 1 },
  ],
  { prompt: '把词卡排成“他们需要帮助”。', items: ['help', '.', 'need', 'They'], correctOrderIndices: [3, 2, 0, 1] },
);

const matchingEmergencyNumbers = lessonProfile(
  [
    { word: '119', meaning: '火灾求助电话' },
    { word: '110', meaning: '报警电话' },
    { word: '120', meaning: '医疗急救电话' },
    { word: '122', meaning: '交通事故报警电话' },
  ],
  [
    phraseQuestion('按照 U4 Fun Time 的火灾情境，应该拨打哪个求助号码？', ['119', '110', '122'], 0, '教材 Fun Time 的火灾场景对应 119。'),
    phraseQuestion('按照 U4 Fun Time 的交通事故情境，Andy 建议拨打哪个号码？', ['122', '120', '119'], 0, '教材 Fun Time 的交通事故场景对应 122。'),
  ],
  ['求助电话号码', '需要求助的情况'],
  [
    { label: '110', categoryIndex: 0 }, { label: '120', categoryIndex: 0 },
    { label: 'A building is on fire.', categoryIndex: 1 }, { label: 'Someone is hurt and cannot move.', categoryIndex: 1 },
  ],
  { prompt: '把词卡排成“我们应该拨打 122。”', items: ['122.', 'should', 'We', 'call'], correctOrderIndices: [2, 1, 3, 0] },
);

export const unit = buildEnglishUnit({
  grade: 4,
  term: 1,
  formalUnitNumber: 4,
  entryId: 'unit-04',
  title: 'Unit 4 · Asking for Help',
  sourceTopics: [
    '文具词汇：pen、knife、eraser、crayon、scissors、glue stick、paper，以及补充词 ruler、pencil、schoolbag',
    '询问是否有文具并回应：Do you have ...?、Yes, we do.、Sorry, we don’t.',
    '礼貌请求借用物品：Can I use your ... (please)?；回应 Sure. Here you are.、Sorry, I’m using it.、Sorry, I don’t have one.',
    '在 Information Centre 寻求帮助：Excuse me.、phone、find；理解 Steven 找不到爸爸并通过电话联系到汉堡包店的故事',
    '阅读求助与救援故事：Mary 和妈妈遇险、在雪地写 SOS、飞行员发现信号并求助、直升机救援',
    'Fun Time 的求助场景与号码：火灾 119、迷路求助 110、医疗急救 120、交通事故 122',
    '自我评价目标：说出文具名称、认读并书写部分词语；用 Can I use your ...? 向同伴借用文具',
  ],
  basicTasks: [
    makeTask('认读文具并询问是否有物品', '辨认常见文具名称，使用 Do you have ...? 询问并用简短句回答。', 'companion-03', schoolSupplies),
    makeTask('礼貌请求借用文具', '用 Can I use your ...? 礼貌请求借用文具，并根据对方是否有空回应。', 'companion-02', askingToUseSupplies),
  ],
  advancedTasks: [
    makeTask('在咨询中心求助并借用电话', '从简短故事中提取求助地点、所需物品和家人所在地点的信息。', 'companion-04', askingForHelpAtTheCentre),
    makeTask('根据情境选择礼貌回应', '区分愿意递交物品、正在使用和没有该物品等回应，并用英语表达感谢。', 'companion-01', choosingAPoliteReply),
  ],
  highTasks: [
    makeTask('整理故事中的求助与救援顺序', '依据连续图文线索安排求助事件顺序，并区分遇到的困难和求助行动。', 'companion-03', readingARescueStory),
    makeTask('匹配 Fun Time 求助情境与号码', '从火灾、迷路、受伤和交通事故情境中提取教材给出的求助号码。', 'companion-04', matchingEmergencyNumbers),
  ],
});
