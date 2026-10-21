import { buildEnglishUnit } from '../../../../grade-2/term-1/english/buildEnglishUnit';
import { arrange, choose, lessonProfile, makeTask, pair, phraseQuestion, q8, sortInto } from '../../../../grade-2/term-1/english/questionAuthoring';
import type { EightEnglishQuestions, EnglishTaskSpec } from '../../../../grade-2/term-1/english/questionAuthoring';

// 主题边界依据固定册次目录；练习词和情境为原创，不声称逐词核验教材正文。
const profile1 = lessonProfile(
  [
    { word: 'was born', meaning: '出生' }, { word: 'started to speak', meaning: '开始说话' },
    { word: 'learned to walk', meaning: '学会走路' }, { word: 'learned to ride a bike', meaning: '学会骑自行车' },
  ],
  [
    phraseQuestion('你不明白短语 “was born” 的意思，哪句可以请同伴解释？', ['What does “was born” mean?', 'Where is “was born”?', 'How are you?'], 0, '先说清你想询问短语的意思。 What does “was born” mean? 是完整、语序正确的词义问句。'),
    phraseQuestion('朋友问：“What does ‘learned to ride a bike’ mean?” 哪项回答了短语的意思？', ['学会说英语', '学会走路', '学会骑自行车'], 2, '回答词义时要核对英文短语和中文意思是否匹配。 “learned to ride a bike”表示“学会骑自行车”。'),
  ],
  ['出生和早期能力', '入园、上学和其他新技能'],
  [
    { label: 'was born', categoryIndex: 0 }, { label: 'started to speak', categoryIndex: 0 },
    { label: 'went to kindergarten', categoryIndex: 1 }, { label: 'learned to ride a bike', categoryIndex: 1 },
  ],
  { prompt: '把词卡排成“我想学会这个表达”。', items: ['phrase', 'this', 'learn', 'I', 'would', 'like', 'to', '.'], correctOrderIndices: [3, 4, 5, 6, 2, 1, 0, 7] },
);

function customTask(
  title: string,
  objective: string,
  companionId: EnglishTaskSpec['companionId'],
  questions: EightEnglishQuestions,
): EnglishTaskSpec {
  return { title, objective, companionId, questions };
}

const basicTask2 = customTask(
  '读成长时间线并使用过去式',
  '从简短成长时间线读取年龄信息，辨认常见过去式，并按先后顺序组织成长经历。',
  'companion-02',
  q8([
    choose('A timeline says: “Leo learned to walk when he was one. He started to speak when he was two.” What did Leo do when he was one?', ['He started to speak.', 'He learned to walk.', 'He went to school.'], 1, '在时间线中找 when he was one 对应的经历。', '时间线说 Leo 一岁时学会走路。'),
    choose('A timeline says: “Leo started to speak when he was two.” How old was he then?', ['One.', 'Two.', 'Three.'], 1, '把 started to speak 和对应的年龄连起来。', 'Leo 两岁时开始说话。'),
    choose('What is the past form of learn?', ['learns', 'learning', 'learned'], 2, '注意 learn 是规则动词，过去式加 -ed。', 'learn 的过去式是 learned。'),
    pair('把动词原形和成长记录中使用的过去式连起来。', [
      ['start to speak', 'started to speak'], ['learn to walk', 'learned to walk'], ['go to kindergarten', 'went to kindergarten'],
    ], '逐组比较动词原形和过去式。', 'start、learn、go 在这些经历中的过去式分别是 started、learned、went。'),
    choose('Which sentence correctly tells what Ben did when he was five?', ['Ben learn to swim when he was five.', 'Ben learned to swim when he was five.', 'Ben is learned to swim when he was five.'], 1, 'when he was five 指过去的经历；检查主要动词形式。', 'learned 是 learn 的过去式，句子语序也正确。'),
    choose('Which sentence correctly uses “go to kindergarten” for a past event?', ['Mia went to kindergarten when she was four.', 'Mia go to kindergarten when she was four.', 'Mia goes to kindergarten when she was four.'], 0, 'when she was four 表示过去；go 的过去式是不规则变化。', 'go 的过去式是 went。'),
    sortInto('把词语分到“年龄或时间线索”或“成长经历”。', ['年龄或时间线索', '成长经历'], [
      { label: 'when he was one', categoryIndex: 0 }, { label: 'when she was five', categoryIndex: 0 },
      { label: 'learned to walk', categoryIndex: 1 }, { label: 'went to kindergarten', categoryIndex: 1 },
    ], '时间线索说明什么时候；成长经历说明发生了什么。', 'when he was one 和 when she was five 是时间线索；另外两项是成长经历。'),
    arrange('把词卡排成“她四岁时上了幼儿园”。', ['four.', 'was', 'she', 'when', 'kindergarten', 'went', 'to', 'She'], [7, 5, 6, 4, 3, 2, 1, 0], '先放主语和过去式动词，再放经历和年龄线索。', '完整句子是 “She went to kindergarten when she was four.”'),
  ]),
);

const advancedTask1 = customTask(
  '在对话中询问成长经历',
  '结合问答目的和年龄线索，选择自然的成长经历问句与过去式回答。',
  'companion-03',
  q8([
    choose('A: “When did you learn to walk?” B: “___” Which answer fits?', ['I learned to walk when I was one.', 'I learn to walk tomorrow.', 'I am learn to walk when I was one.'], 0, '问题询问过去发生的成长经历和时间。', 'I learned to walk when I was one. 用过去式回答了经历和年龄。'),
    choose('A: “Did you start to study English when you were six?” B: “___” Choose the correct short answer if you did.', ['Yes, I do.', 'Yes, I did.', 'Yes, I was.'], 1, 'Did you ...? 的肯定简答使用 did。', '肯定回答 Did you ...? 时说 “Yes, I did.”'),
    pair('把成长经历问句和合适回答连起来。', [
      ['When were you born?', 'I was born in 2016.'],
      ['What did you learn when you were five?', 'I learned to swim when I was five.'],
      ['What did you do after kindergarten?', 'I started to study English.'],
    ], '先判断问句询问出生时间、学会的事情还是之后做的事。', '出生时间、五岁时学会的事和入园后的经历各有对应回答。'),
    choose('Which question asks when a past milestone happened?', ['When did you learn to ride a bike?', 'What are you doing now?', 'Where do you live?'], 0, '选择询问过去经历及其时间的问题。', 'When did you learn to ride a bike? 询问何时学会骑自行车。'),
    choose('A friend asks, “Did you learn to swim when you were five?” Which short answer is correct if you did?', ['Yes, I did.', 'Yes, I do.', 'Yes, I was.'], 0, 'Did you ...? 的肯定简答使用 did。', '正确的肯定简答是 “Yes, I did.”'),
    choose('Your friend asks what you did at age four. Which answer is complete and natural?', ['I went to kindergarten when I was four.', 'I go to kindergarten when I was four.', 'I am go to kindergarten when I was four.'], 0, '回答过去经历时用过去式，并保留年龄线索。', 'went 是 go 的过去式；整句自然地说明四岁时上了幼儿园。'),
    sortInto('把句子分到“成长经历问句”或“成长经历回答”。', ['成长经历问句', '成长经历回答'], [
      { label: 'When did you start to speak?', categoryIndex: 0 }, { label: 'What did you learn when you were six?', categoryIndex: 0 },
      { label: 'I started to speak when I was two.', categoryIndex: 1 }, { label: 'I learned to ride a bike.', categoryIndex: 1 },
    ], '问句询问过去的经历；回答说明做过什么或何时发生。', '前两句询问成长经历，后两句用过去式回答。'),
    arrange('按询问年龄、回答经历、追问后续里程碑、回答的顺序整理对话。', [
      'When did you learn to walk?', 'I learned to walk when I was one.',
      'Did you go to kindergarten when you were three?', 'Yes, I did.',
    ], [0, 1, 2, 3], '先问学会走路的年龄并回答，再确认上幼儿园的时间。', '对话先谈学会走路的年龄，再谈三岁时是否上幼儿园。'),
  ]),
);

const advancedTask2 = customTask(
  '阅读成长记录并核对时间',
  '从题面提供的原创成长记录提取年龄和经历，只报告记录明确支持的信息并整理先后顺序。',
  'companion-04',
  q8([
    choose('Mia’s timeline says: “Mia was born in 2016. She learned to walk when she was one. She started to speak when she was two. She went to kindergarten when she was three.” In what year was Mia born?', ['2015.', '2016.', '2019.'], 1, '在时间线中找 was born 后面的年份。', '记录明确写着 Mia was born in 2016。'),
    choose('Mia’s timeline says: “She was born in 2016. She learned to walk when she was one. She started to speak when she was two. She went to kindergarten when she was three.” What did she do when she was one?', ['She learned to walk.', 'She started to speak.', 'She went to kindergarten.'], 0, '把 when she was one 和对应经历连起来。', '记录说 Mia 一岁时学会走路。'),
    choose('Mia’s timeline says she started to speak when she was two. How old was she then?', ['One.', 'Two.', 'Three.'], 1, '在记录中找 started to speak 对应的年龄。', 'Mia 两岁时开始说话。'),
    pair('Mia 的时间线写着：born in 2016；learned to walk when she was one；started to speak when she was two；went to kindergarten when she was three。把年龄或年份和经历连起来。', [
      ['2016', 'was born'], ['when she was one', 'learned to walk'], ['when she was three', 'went to kindergarten'],
    ], '根据时间线中的年份和年龄定位经历。', '2016 年出生，一岁时学会走路，三岁时上了幼儿园。'),
    choose('Mia’s timeline says: “Mia was born in 2016. She learned to walk when she was one. She started to speak when she was two. She went to kindergarten when she was three.” Which summary matches it?', ['She was born in 2016, learned to walk at one, started to speak at two, and went to kindergarten at three.', 'She was born in 2019, started to speak at one, and learned to walk at three.', 'She went to kindergarten before she was born.'], 0, '核对摘要中的年份、年龄和经历顺序。', '第一项准确保留了时间线中的年份、年龄和成长经历。'),
    sortInto('时间线写着：“Mia was born in 2016. She learned to walk when she was one. She started to speak when she was two. She went to kindergarten when she was three.”请把信息分到“记录提到”或“记录未提到”。', ['记录提到', '记录未提到'], [
      { label: 'Mia was born in 2016.', categoryIndex: 0 }, { label: 'Mia went to kindergarten when she was three.', categoryIndex: 0 },
      { label: 'Mia learned to swim when she was two.', categoryIndex: 1 }, { label: 'Mia went to school in 2018.', categoryIndex: 1 },
    ], '只依据这段时间线，不要补充没有写出的活动或年份。', '出生年份和三岁入园都在记录中；游泳和 2018 年上学没有提到。'),
    choose('The timeline says Mia started to speak when she was two. What can you report?', ['Mia started to speak when she was two.', 'Mia learned to swim when she was two.', 'Mia went to kindergarten when she was two.'], 0, '只转述时间线明确写出的经历。', '记录写的是 Mia 两岁时开始说话。'),
    arrange('按 Mia 时间线中的年龄顺序整理成长经历。', [
      'First, Mia was born in 2016.',
      'Next, she learned to walk when she was one.',
      'Then, she started to speak when she was two.',
      'Finally, she went to kindergarten when she was three.',
    ], [0, 1, 2, 3], '先看出生年份，再按一岁、两岁、三岁的年龄排序。', '时间线从出生开始，再依次记录一岁、两岁和三岁时的经历。'),
  ]),
);

const highTask1 = customTask(
  '按成长时间线的多个条件核对记录',
  '综合年龄、经历和事件先后比较时间线，找出同时符合全部条件的版本。',
  'companion-01',
  q8([
    choose('A timeline must place “was born” before “learned to walk” and “learned to walk” before “started to speak.” Which record meets both order requirements?', ['Born → learned to walk → started to speak.', 'Learned to walk → born → started to speak.', 'Started to speak → learned to walk → born.'], 0, '同时检查出生、学会走路和开始说话的顺序。', '第一项符合出生早于学会走路、学会走路早于开始说话两项要求。'),
    choose('The same timeline must show that Mia went to kindergarten at three, after she started to speak at two. Which record meets both conditions?', ['Started to speak at two → went to kindergarten at three.', 'Went to kindergarten at three → started to speak at two.', 'Started to speak at three → went to kindergarten at two.'], 0, '同时核对两个年龄和先后关系。', '第一项既保留两岁开始说话、三岁入园，也符合时间顺序。'),
    choose('A growth chart says “born in 2016; learned to walk at one; started to speak at two; kindergarten at three.” Which summary keeps all four facts in order?', ['Born in 2016 → walked at one → spoke at two → kindergarten at three.', 'Born in 2016 → spoke at one → walked at two → kindergarten at three.', 'Kindergarten at three → born in 2016 → walked at one → spoke at two.'], 0, '一起检查年份、三个年龄和时间先后。', '第一项准确保留出生年份以及一岁、两岁、三岁时的经历。'),
    pair('把时间线要求和符合的记录连起来。', [
      ['出生早于一岁时的经历', 'born in 2016 → learned to walk at one'],
      ['两岁时开始说话', 'started to speak at two'],
      ['三岁时上幼儿园', 'went to kindergarten at three'],
    ], '逐项核对年龄与成长经历。', '三项配对分别保留出生、一岁学走路、两岁说话和三岁入园的信息。'),
    choose('The chart must show walking at one before speaking at two, and kindergarten at three. Which line meets both age and order conditions?', ['Walked at one → spoke at two → went to kindergarten at three.', 'Spoke at two → walked at one → went to kindergarten at three.', 'Walked at one → went to kindergarten at two → spoke at three.'], 0, '检查年龄数字和事件是否按时间先后排列。', '第一项的三个年龄和经历都与要求一致。'),
    choose('A classmate wrote “Mia went to kindergarten when she was two” but the chart says age three. Which edit fixes the age and keeps the event?', ['Mia went to kindergarten when she was three.', 'Mia started to speak when she was three.', 'Mia went to kindergarten when she was one.'], 0, '只修改记录里写错的年龄，保留入园这件事。', '时间线说 Mia 三岁时上幼儿园，因此应把 two 改为 three。'),
    sortInto('要求是“先出生，再一岁学会走路，最后两岁开始说话”。把时间线分到“满足全部顺序”或“至少有一处不符”。', ['满足全部顺序', '至少有一处不符'], [
      { label: 'Born → learned to walk at one → started to speak at two.', categoryIndex: 0 },
      { label: 'Learned to walk at one → born → started to speak at two.', categoryIndex: 1 },
      { label: 'Born → started to speak at one → learned to walk at two.', categoryIndex: 1 },
      { label: 'Born → learned to walk at one → started to speak at two → went to kindergarten at three.', categoryIndex: 0 },
    ], '从左到右检查出生、年龄和成长事件的先后。', '第一项和第四项符合给出的顺序；中间两项有事件或年龄错误。'),
    arrange('按整理成长时间线的顺序排步骤。', [
      'First, write down the age for each milestone.',
      'Next, put the milestones from earliest to latest.',
      'Then, check each age against the notes.',
      'Finally, share the finished timeline.',
    ], [0, 1, 2, 3], '先记录年龄，再排序、核对，最后分享。', '步骤依次是记录年龄、按时间排序、核对信息、分享时间线。'),
  ]),
);

const highTask2 = customTask(
  '校对成长记录并核实时间顺序',
  '综合成长记录中的年龄和过去式，校正错误后准确报告时间线。',
  'companion-02',
  q8([
    choose('A note says: “Sam was born in 2015. He learned to walk when he was one. He started to speak when he was two. He went to kindergarten when he was three.” What happened when Sam was two?', ['He learned to walk.', 'He started to speak.', 'He went to kindergarten.'], 1, '在记录中找 when he was two 对应的经历。', '记录说 Sam 两岁时开始说话。'),
    choose('Sam’s note says: “Sam was born in 2015. He learned to walk when he was one. He started to speak when he was two. He went to kindergarten when he was three.” What happened when Sam was three?', ['He went to kindergarten.', 'He was born.', 'He learned to walk.'], 0, '把三岁和记录中的经历对应起来。', 'Sam 三岁时上了幼儿园。'),
    choose('A friend wrote, “Sam learn to walk when he was one.” Which correction is right?', ['Sam learned to walk when he was one.', 'Sam learns to walk when he was one.', 'Sam is learn to walk when he was one.'], 0, '这是过去发生的经历；检查 learn 的过去式。', 'learn 的过去式是 learned。'),
    pair('Sam 的记录写着：born in 2015；learned to walk at one；started to speak at two；went to kindergarten at three。把年龄和经历连起来。', [
      ['2015', 'was born'], ['at one', 'learned to walk'], ['at three', 'went to kindergarten'],
    ], '依据记录中的年龄和年份配对。', '2015 年出生，一岁学会走路，三岁上幼儿园。'),
    choose('Sam’s note says: “Sam was born in 2015. He learned to walk when he was one. He started to speak when he was two. He went to kindergarten when he was three.” Which report keeps the year, ages, and past-tense verbs correct?', ['Sam was born in 2015, learned to walk at one, started to speak at two, and went to kindergarten at three.', 'Sam was born in 2015, started to speak at one, learned to walk at two, and went to kindergarten at three.', 'Sam is born in 2015 and go to kindergarten when he was three.'], 0, '一起核对年份、年龄、经历顺序和过去式。', '第一项保留了记录中的年份、年龄、先后顺序和过去式。'),
    choose('A note says, “Rita go to kindergarten when she was three.” Which edit fixes the past-tense verb?', ['Rita went to kindergarten when she was three.', 'Rita goes to kindergarten when she was three.', 'Rita is go to kindergarten when she was three.'], 0, 'when she was three 指过去；go 的过去式是不规则变化。', 'go 的过去式是 went。'),
    sortInto('把句子分到“时间和过去式相符”或“至少一处不相符”。', ['时间和过去式相符', '至少一处不相符'], [
      { label: 'Sam learned to walk when he was one.', categoryIndex: 0 }, { label: 'Rita went to kindergarten when she was three.', categoryIndex: 0 },
      { label: 'Sam learn to walk when he was one.', categoryIndex: 1 }, { label: 'Rita go to kindergarten when she was three.', categoryIndex: 1 },
    ], '同时检查年龄线索和动词形式。', '前两句使用正确过去式；后两句动词仍是原形。'),
    arrange('按 Sam 记录中的年龄顺序整理成长经历。', [
      'First, Sam was born in 2015.',
      'Next, he learned to walk when he was one.',
      'Then, he started to speak when he was two.',
      'Finally, he went to kindergarten when he was three.',
    ], [0, 1, 2, 3], '从出生年份开始，再按一岁、两岁、三岁排序。', 'Sam 的经历依次是出生、学会走路、开始说话和上幼儿园。'),
  ]),
);

export const unit = buildEnglishUnit({
  grade: 5,
  term: 2,
  formalUnitNumber: 6,
  entryId: 'unit-06',
  title: 'Unit 6 · Growing Up',
  sourceTopics: [
    '成长经历与过去会做的事情，按时间顺序介绍个人变化。',
    '练习围绕目录主题设计原创词卡、问答、信息核对和简短表达；词汇与固定快照附录单元词表对照；教材正文未逐页核对；扩展词不宣称来自原文。',
  ],
  basicTasks: [
    makeTask('认读与辨析成长经历表达', '认读出生、早期能力和学习经历词组，准确辨认英文形式和中文意思。', 'companion-01', profile1),
    basicTask2,
  ],
  advancedTasks: [advancedTask1, advancedTask2],
  highTasks: [highTask1, highTask2],
});
