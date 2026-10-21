import { buildEnglishUnit } from '../../../../grade-2/term-1/english/buildEnglishUnit';
import { lessonProfile, makeTask, phraseQuestion } from '../../../../grade-2/term-1/english/questionAuthoring';

const sportsWords = lessonProfile(
  [
    { word: 'running', meaning: '跑步' },
    { word: 'basketball', meaning: '篮球' },
    { word: 'roller skating', meaning: '滑旱冰' },
    { word: 'jumping rope', meaning: '跳绳' },
  ],
  [
    phraseQuestion('想问同伴“你喜欢跑步吗？”，哪句正确？', ['Do you like running?', 'Are you like running?', 'Do you likes running?'], 0, '询问对方是否喜欢某项运动，用 Do you like …?'),
    phraseQuestion('朋友告诉你他喜欢篮球，想说“我也喜欢乒乓球”，应选哪句？', ['I also like ping-pong.', 'I also likes ping-pong.', 'I like also ping-pong.'], 0, 'also 放在主语后、主要动词 like 前。'),
  ],
  ['球类运动', '其他运动'],
  [
    { label: 'basketball', categoryIndex: 0 }, { label: 'ping-pong', categoryIndex: 0 },
    { label: 'running', categoryIndex: 1 }, { label: 'roller skating', categoryIndex: 1 },
  ],
  { prompt: '把词卡排成一句表达喜欢跑步的话。', items: ['running', '.', 'I', 'like'], correctOrderIndices: [2, 3, 0, 1] },
);

const sportsHabits = lessonProfile(
  [
    { word: 'basketball', meaning: '篮球' },
    { word: 'ping-pong', meaning: '乒乓球' },
    { word: 'roller skating', meaning: '滑旱冰' },
    { word: 'jumping rope', meaning: '跳绳' },
  ],
  [
    phraseQuestion('想问“你经常打篮球吗？”，哪句正确？', ['Do you often play basketball?', 'Are you often play basketball?', 'Do you often plays basketball?'], 0, 'often 前用 Do you 提问，后面的 play 保持原形。'),
    phraseQuestion('想问同伴“你擅长吗？”，哪句正确？', ['Are you good at it?', 'Do you good at it?', 'Are you good it?'], 0, '询问是否擅长用 Are you good at …?'),
  ],
  ['play + 运动', 'go + 活动'],
  [
    { label: 'play basketball', categoryIndex: 0 }, { label: 'go roller skating', categoryIndex: 1 },
    { label: 'play ping-pong', categoryIndex: 0 }, { label: 'go swimming', categoryIndex: 1 },
  ],
  { prompt: '把词卡排成“你经常打乒乓球吗？”，注意问号。', items: ['often', '?', 'play', 'Do', 'ping-pong', 'you'], correctOrderIndices: [3, 5, 0, 2, 4, 1] },
);

const sportLikesAndSkills = lessonProfile(
  [
    { word: 'jumping rope', meaning: '跳绳' },
    { word: 'roller skating', meaning: '滑旱冰' },
    { word: 'running', meaning: '跑步' },
    { word: 'interesting', meaning: '有趣的' },
  ],
  [
    phraseQuestion('想说“我喜欢跳绳。它很有趣。”哪组句子正确？', ["I like jumping rope. It's interesting.", 'I like jumping rope. It interesting.', "I likes jumping rope. It's interesting."], 0, "like 后面用原形，It's 是 It is 的缩写，interesting 表示“有趣的”。"),
    phraseQuestion('想说“我擅长跑步”，哪句正确？', ['I am good at running.', 'I am good running.', 'I good at running.'], 0, '完整句子要有 am，good at 后接 running。'),
  ],
  ['表达喜欢', '表达擅长'],
  [
    { label: 'I like jumping rope.', categoryIndex: 0 }, { label: 'I am good at running.', categoryIndex: 1 },
    { label: 'I also like ping-pong.', categoryIndex: 0 }, { label: 'I am good at basketball.', categoryIndex: 1 },
  ],
  { prompt: '把词卡排成“我擅长跑步”。', items: ['at', 'I', 'running', '.', 'good', 'am'], correctOrderIndices: [1, 5, 4, 0, 2, 3] },
);

const sportQuestionAndAnswer = lessonProfile(
  [
    { word: 'running', meaning: '跑步' },
    { word: 'ping-pong', meaning: '乒乓球' },
    { word: 'roller skating', meaning: '滑旱冰' },
    { word: 'basketball', meaning: '篮球' },
  ],
  [
    phraseQuestion('A says, “Do you often play ping-pong?” Which answer fits?', ['Yes, I do.', 'Yes, I am.', 'Yes, it is.'], 0, 'Do you often …? 的肯定简答是 Yes, I do.'),
    phraseQuestion('A asks, “Are you good at roller skating?” Which answer fits?', ['No, I am not.', "No, I don't.", 'No, it does not.'], 0, "Are you …? 的否定简答是 No, I am not.，也可说 No, I'm not."),
  ],
  ['询问喜欢或经常做', '询问是否擅长'],
  [
    { label: 'Do you like running?', categoryIndex: 0 }, { label: 'Are you good at it?', categoryIndex: 1 },
    { label: 'Do you often play basketball?', categoryIndex: 0 }, { label: 'Are you good at ping-pong?', categoryIndex: 1 },
  ],
  { prompt: '把词卡排成一句说明经常打篮球的话。', items: ['basketball', 'often', '.', 'I', 'play'], correctOrderIndices: [3, 1, 4, 0, 2] },
);

const talkAboutSports = lessonProfile(
  [
    { word: 'roller skating', meaning: '滑旱冰' },
    { word: 'ping-pong', meaning: '乒乓球' },
    { word: 'jumping rope', meaning: '跳绳' },
    { word: 'basketball', meaning: '篮球' },
  ],
  [
    phraseQuestion('同伴说 “I like roller skating.” 哪句话表示“我也喜欢滑旱冰”？', ['I also like roller skating.', 'I am good at it.', 'Do you often play it?'], 0, 'also like 表示“也喜欢”，要保留同伴提到的运动。'),
    phraseQuestion('Which expression means “你呢？” and returns the topic to the other person?', ['What about you?', 'Yes, I do.', 'I am good at it.'], 0, 'What about you? 可以把话题交给对方，让对方也说说自己的情况。'),
  ],
  ['表达喜欢', '表达擅长'],
  [
    { label: 'I like ping-pong.', categoryIndex: 0 }, { label: 'I am good at jumping rope.', categoryIndex: 1 },
    { label: 'I also like basketball.', categoryIndex: 0 }, { label: 'I am good at roller skating.', categoryIndex: 1 },
  ],
  { prompt: '把词卡排成“我也喜欢乒乓球”。', items: ['ping-pong', 'also', '.', 'I', 'like'], correctOrderIndices: [3, 1, 4, 0, 2] },
);

const sportsMiniInterview = lessonProfile(
  [
    { word: 'basketball', meaning: '篮球' },
    { word: 'running', meaning: '跑步' },
    { word: 'jumping rope', meaning: '跳绳' },
    { word: 'ping-pong', meaning: '乒乓球' },
  ],
  [
    phraseQuestion('想问同伴“你经常去滑旱冰吗？”，哪句正确？', ['Do you often go roller skating?', 'Are you often go roller skating?', 'Do you often goes roller skating?'], 0, 'often 询问习惯时用 Do you often …?；本单元搭配是 go roller skating。'),
    phraseQuestion('Someone asks, “Are you good at it?” Which answer is correct?', ['Yes, I am.', 'Yes, I do.', 'Yes, it does.'], 0, 'Are you …? 要用 am 回答：Yes, I am. 或 No, I am not.'),
  ],
  ['回答 Do you …?', '回答 Are you …?'],
  [
    { label: 'Yes, I do.', categoryIndex: 0 }, { label: 'No, I am not.', categoryIndex: 1 },
    { label: "No, I don't.", categoryIndex: 0 }, { label: 'Yes, I am.', categoryIndex: 1 },
  ],
  { prompt: '把词卡排成一个礼貌的回问：“你呢？”，注意问号。', items: ['you', '?', 'What', 'about'], correctOrderIndices: [2, 3, 0, 1] },
);

export const unit = buildEnglishUnit({
  grade: 4,
  term: 1,
  formalUnitNumber: 1,
  entryId: 'unit-01',
  title: 'Unit 1 · Sports and Games',
  sourceTopics: [
    '运动词汇：running、basketball、roller skating、jumping rope、ping-pong、swimming；描述运动的 interesting',
    '运动搭配：play basketball、play ping-pong、go roller skating、go swimming',
    '表达喜好：Do you like …?、I like …、I also like …、What about you?',
    '询问习惯和能力：Do you often …?、Are you good at it?',
    "简短回答与表达：Yes, I do. / No, I don't.；Yes, I am. / No, I'm not.；I often …；I am good at …",
  ],
  basicTasks: [
    makeTask('认读运动词卡', '认读并理解本单元常见运动词汇，按球类和其他运动进行辨认。', 'companion-03', sportsWords),
    makeTask('询问习惯与擅长项目', '辨认 play 与 go 的运动搭配，练习询问经常做什么及是否擅长。', 'companion-02', sportsHabits),
  ],
  advancedTasks: [
    makeTask('介绍喜欢和擅长的运动', '用 I like … 与 I am good at … 区分表达喜好和能力，并完成规范语序。', 'companion-04', sportLikesAndSkills),
    makeTask('听懂问题并选择回答', '根据 Do you …? 与 Are you …? 的问句，选择人称和助动词匹配的简短回答。', 'companion-01', sportQuestionAndAnswer),
  ],
  highTasks: [
    makeTask('接续运动话题', '结合对方已表达的喜好，选择自然的回话、追问或自我介绍。', 'companion-03', talkAboutSports),
    makeTask('设计运动小采访', '综合运动词汇、习惯与能力问答，组织一段语法和语序正确的简短交流。', 'companion-04', sportsMiniInterview),
  ],
});
