import { buildEnglishUnit } from '../../../../grade-2/term-1/english/buildEnglishUnit';
import { arrange, choose, lessonProfile, makeTask, pair, phraseQuestion, q8, sortInto } from '../../../../grade-2/term-1/english/questionAuthoring';
import type { EightEnglishQuestions, EnglishTaskSpec } from '../../../../grade-2/term-1/english/questionAuthoring';
// 主题边界依据固定册次目录；练习词为原创主题词，不声称逐词核验了教材页词表。
const profile1 = lessonProfile(
  [
    { word: 'cleaned the window', meaning: '擦了窗户' }, { word: 'watched TV', meaning: '看了电视' },
    { word: 'climbed a hill', meaning: '爬了山' }, { word: 'visited grandparents', meaning: '看望了祖父母' },
  ],
  [
    phraseQuestion('你不明白短语“cleaned the window”的意思，哪句可以请同伴解释？', ['What does “cleaned the window” mean?', 'Where is “cleaned the window”?', 'How are you?'], 0, '先说清你想询问短语的意思；与同伴交流时还可以在句末加 please。 What does “cleaned the window” mean? 是完整、语序正确的词义问句。'),
    phraseQuestion('朋友问：“What does ‘visited grandparents’ mean?” 哪句回答了短语的意思？', ['它的意思是“看了电视”。', '它的意思是“爬了山”。', '它的意思是“看望了祖父母”。'], 2, '回答词义时要核对英文短语和中文意思是否匹配。 “visited grandparents”表示“看望了祖父母”；另两个选项把其他表达的意思错配过来。'),
  ],
  ['出游和运动活动', '居家休闲活动'],
  [
    { label: 'climbed a hill', categoryIndex: 0 }, { label: 'jumped rope', categoryIndex: 0 },
    { label: 'watched TV', categoryIndex: 1 }, { label: 'played computer games', categoryIndex: 1 },
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
  '用过去时说周末活动',
  '在简单情境中认读周末活动，选择一般过去时动词形式，并使用时间线索表达经历。',
  'companion-02',
  q8([
    choose('Last Saturday, Nina danced at a school party. What activity did she do?', ['She danced.', 'She jumped rope.', 'She watched TV.'], 0, '题目已经给出日期和活动线索。', 'Nina 上周六在学校派对上跳了舞。'),
    choose('Tom rowed a boat last Sunday. What did he do?', ['He listened to music.', 'He rowed a boat.', 'He stayed at home.'], 1, '在句子里找出 Tom 做的活动。', 'rowed a boat 表示划船。'),
    choose('What is the past form of jump?', ['jumped', 'jumps', 'jumping'], 0, '一般过去时中，规则动词 jump 加 -ed。', 'jump 的过去式是 jumped。'),
    pair('把活动原形和对应的过去式连起来。', [
      ['dance', 'danced'],
      ['listen to music', 'listened to music'],
      ['visit grandparents', 'visited grandparents'],
    ], '比较每组动词的原形和过去式。', 'dance、listen、visit 都是规则动词，过去式分别加 -ed。'),
    choose('Which sentence correctly tells what you did last weekend?', ['I watched TV last weekend.', 'I watch TV last weekend.', 'I watching TV last weekend.'], 0, 'last weekend 提示事情已经发生；检查动词形式。', 'last weekend 表示过去时间，因此用 watched。'),
    choose('Which sentence correctly uses “play the piano” with the past-time word “yesterday”?', ['I played the piano yesterday.', 'I play the piano yesterday.', 'I plays the piano yesterday.'], 0, 'yesterday 是过去时间线索。', '过去发生的动作使用 played。'),
    sortInto('把词语分到“过去时间线索”或“活动表达”。', ['过去时间线索', '活动表达'], [
      { label: 'yesterday', categoryIndex: 0 },
      { label: 'last Sunday', categoryIndex: 0 },
      { label: 'cleaned the window', categoryIndex: 1 },
      { label: 'visited grandparents', categoryIndex: 1 },
    ], '时间线索告诉我们什么时候；活动表达告诉我们做了什么。', 'yesterday 和 last Sunday 表示过去时间；另外两项表示活动。'),
    arrange('把词卡排成“我们上周六爬了山”。', ['Saturday.', 'hill', 'a', 'climbed', 'We', 'last'], [4, 3, 2, 1, 5, 0], '先放主语和过去式动词，再放活动与时间。', '完整句子是 “We climbed a hill last Saturday.”'),
  ]),
);

const advancedTask1 = customTask(
  '在对话中谈论周末经历',
  '结合过去时间和问答目的，使用 did 提问、用过去式回答，并选择自然的对话表达。',
  'companion-03',
  q8([
    choose('A: “What did you do last weekend?” B: “___” Which answer fits?', ['I climbed a hill with my cousin.', 'I climb a hill last weekend.', 'I am climb a hill.'], 0, '问题询问已经结束的周末活动。', 'I climbed a hill with my cousin. 用过去式回答了上周末做的事。'),
    choose('A: “Did you play computer games yesterday?” B: “___” Which short answer is correct?', ['Yes, I did.', 'Yes, I do.', 'Yes, I was.'], 0, 'Did you ...? 的肯定简答用 did。', 'Did you ...? 的肯定简答是“Yes, I did.”'),
    pair('把关于周末的问句和合适回答连起来。', [
      ['What did you do last weekend?', 'I stayed at home.'],
      ['Did you watch TV yesterday?', 'Yes, I did.'],
      ['What did you do after lunch?', 'I listened to music.'],
    ], '看问句是在问做过什么，还是确认某个活动。', '三个回答分别说出在家、看电视和听音乐的经历。'),
    choose('Which question asks about a finished weekend?', ['What did you do last weekend?', 'What do you do every day?', 'Where do you live?'], 0, '选择带有过去时间并询问已完成活动的问题。', 'What did you do last weekend? 询问上周末做过什么。'),
    choose('A friend asks, “What did you do on Saturday?” Which answer is correct?', ['I visited my grandparents.', 'I visit my grandparents.', 'I am visiting my grandparents yesterday.'], 0, 'on Saturday 指已经结束的一天，用过去式回答。', 'visited 是 visit 的过去式，句子回答了周六做的事。'),
    choose('You did not row a boat last Sunday. How can you answer “Did you row a boat?”', ['No, I didn’t.', 'No, I don’t.', 'No, I wasn’t.'], 0, 'Did you ...? 的否定简答使用 didn’t。', 'No, I didn’t. 表示上周日没有划船。'),
    sortInto('把句子分到“过去活动问句”或“过去活动回答”。', ['过去活动问句', '过去活动回答'], [
      { label: 'What did you do yesterday?', categoryIndex: 0 },
      { label: 'Did you climb a hill?', categoryIndex: 0 },
      { label: 'I watched TV.', categoryIndex: 1 },
      { label: 'Yes, I did.', categoryIndex: 1 },
    ], '问句询问过去的活动；回答说明活动或作肯定简答。', '前两句是过去活动问句，后两句是过去活动回答。'),
    arrange('按询问、回答、追问、回答的顺序整理对话。', [
      'What did you do last weekend?',
      'I climbed a hill on Saturday.',
      'Did you stay at home on Sunday?',
      'Yes, I did.',
    ], [0, 1, 2, 3], '先问周末做了什么并回答，再问周日情况并回答。', '对话依次询问周末活动、回答周六经历，再确认周日活动。'),
  ]),
);

const advancedTask2 = customTask(
  '阅读周末记录并准确转述',
  '从题面提供的原创周末记录提取日期、活动和感受，只报告记录明确支持的信息。',
  'companion-04',
  q8([
    choose('Leo’s weekend note says: “Last Saturday, I climbed a hill with my dad. On Sunday morning, I stayed at home. In the afternoon, I played the piano. I felt happy.” What did Leo do on Saturday?', ['He climbed a hill with his dad.', 'He stayed at home.', 'He watched TV.'], 0, '回到记录中找 Saturday 对应的活动。', '记录说 Leo 上周六和爸爸一起爬了山。'),
    choose('According to Leo’s note, what did he do on Sunday?', ['He rowed a boat.', 'He stayed at home in the morning and played the piano in the afternoon.', 'He climbed a hill with his dad.'], 1, '把 Sunday 和记录里的两项活动对应起来。', '记录说 Leo 周日上午在家，下午弹了钢琴。'),
    choose('Leo’s note says, “I felt happy.” How did he feel?', ['Happy.', 'Angry.', 'Tired.'], 0, '找出记录直接写出的感受。', 'Leo 在记录中说自己 felt happy。'),
    pair('周末记录写着：Last Saturday—climbed a hill with his dad；Sunday morning—stayed at home；Sunday afternoon—played the piano。把日子和对应活动连起来。', [
      ['Last Saturday', 'climbed a hill with his dad'],
      ['On Sunday morning', 'stayed at home'],
      ['On Sunday afternoon', 'played the piano'],
    ], '根据记录中的时间词定位活动。', 'Saturday 对应和爸爸爬山；周日上午在家，下午弹琴。'),
    choose('Which summary matches Leo’s note?', ['He climbed a hill on Saturday and played the piano at home on Sunday afternoon.', 'He watched TV on Saturday and rowed a boat on Sunday.', 'He played the piano on Saturday and climbed a hill alone on Sunday.'], 0, '核对摘要中的日期、活动和同伴信息。', '第一项保留了记录中的周六爬山和周日下午弹琴。'),
    sortInto('记录写着：“Last Saturday, I climbed a hill with my dad. On Sunday morning, I stayed at home. In the afternoon, I played the piano. I felt happy.”把信息分到“记录提到”或“记录未提到”。', ['记录提到', '记录未提到'], [
      { label: 'Leo climbed a hill with his dad on Saturday.', categoryIndex: 0 },
      { label: 'Leo played the piano at home on Sunday afternoon.', categoryIndex: 0 },
      { label: 'Leo watched a film on Saturday.', categoryIndex: 1 },
      { label: 'Leo felt angry on Sunday.', categoryIndex: 1 },
    ], '只依据这段记录，不要补充没有写出的活动或感受。', '爬山、弹琴和开心都在记录中；看电影和生气没有提到。'),
    choose('Leo wrote that he felt happy after his weekend. What can you report?', ['The note says Leo felt happy.', 'Leo won a race.', 'Leo climbed three hills.'], 0, '只转述记录明确写出的感受。', '记录写了 Leo 感到开心，没有提到比赛或爬山次数。'),
    arrange('按记录里的时间顺序整理 Leo 的周末。', [
      'First, Leo climbed a hill with his dad on Saturday.',
      'Next, he stayed at home on Sunday morning.',
      'Then, he played the piano in the afternoon.',
      'Finally, he wrote that he felt happy.',
    ], [0, 1, 2, 3], '根据 Saturday、Sunday 和 First、Next、Then、Finally 排列。', '周六先爬山，周日待在家并弹琴，记录最后写下他的感受。'),
  ]),
);

const highTask1 = customTask(
  '按周末安排的多个条件核对方案',
  '综合日期、活动地点和活动类型比较周末方案，判断计划是否满足全部要求。',
  'companion-01',
  q8([
    choose('A family wants to do an outdoor activity on Saturday. Which plan matches both the day and activity type?', ['Climb a hill on Saturday.', 'Watch TV on Saturday.', 'Climb a hill on Sunday.'], 0, '同时核对活动类型和安排日期。', '只有周六爬山同时符合户外活动和日期要求。'),
    choose('The family wants a quiet activity at home on Sunday. Which plan fits both needs?', ['Play the piano at home on Sunday.', 'Row a boat on Sunday.', 'Play the piano outdoors on Saturday.'], 0, '同时核对活动地点、活动类型和日期。', '周日在家弹钢琴符合安静的室内活动要求。'),
    choose('The schedule must show an outdoor activity Saturday and an at-home activity Sunday. Which record matches?', ['Saturday: climb a hill. Sunday: play the piano at home.', 'Saturday: stay at home. Sunday: climb a hill.', 'Saturday: watch TV. Sunday: row a boat.'], 0, '逐项检查两天的安排是否符合要求。', '第一项把周六户外爬山和周日在家弹琴分别安排在正确日期。'),
    pair('把安排要求和符合的活动连起来。', [
      ['周六进行户外活动', 'climb a hill'],
      ['周日在家安静活动', 'play the piano at home'],
      ['周六在家休闲', 'watch TV at home'],
    ], '核对日期、地点和活动类型。', '爬山是户外活动；在家弹琴和看电视属于居家活动。'),
    choose('Your family wants an outdoor activity on Saturday, then a quiet activity at home on Sunday. Which weekend plan meets both requirements?', ['Climb a hill on Saturday; play the piano at home on Sunday.', 'Watch TV on Saturday; climb a hill on Sunday.', 'Row a boat on Saturday; watch a film outdoors on Sunday.'], 0, '检查两个活动是否都安排在指定日期并符合地点要求。', '第一项周六户外爬山、周日在家弹琴，满足全部要求。'),
    choose('The family also wants an at-home activity on Sunday. Which plan meets this condition?', ['Stay at home and play the piano on Sunday.', 'Climb a hill on Sunday.', 'Row a boat on Sunday.'], 0, '选择地点和日期都符合条件的活动。', '周日在家弹琴符合居家活动要求。'),
    sortInto('要求是“周六户外活动，周日在家活动”。把方案分到“满足要求”或“至少漏掉一项”。', ['满足要求', '至少漏掉一项'], [
      { label: 'Climb a hill on Saturday; play the piano at home on Sunday.', categoryIndex: 0 },
      { label: 'Watch TV on Saturday; play the piano on Sunday.', categoryIndex: 1 },
      { label: 'Climb a hill on Sunday; stay at home on Saturday.', categoryIndex: 1 },
      { label: 'Climb a hill on Saturday; row a boat on Sunday.', categoryIndex: 1 },
    ], '逐项检查周六活动、周日活动及对应日期。', '只有第一项符合周六户外、周日在家的完整要求。'),
    arrange('按先计划周六、再计划周日、最后核对日程的顺序整理步骤。', [
      'First, choose an outdoor activity for Saturday.',
      'Next, choose an at-home activity for Sunday.',
      'Then, write both activities on the weekend calendar.',
      'Finally, check that each activity is on the right day.',
    ], [0, 1, 2, 3], '注意 First、Next、Then、Finally 表示的步骤顺序。', '先选两天的活动，再写入日历，最后核对日期。'),
  ]),
);

const highTask2 = customTask(
  '按时间顺序整理经历并核对过去时',
  '整合周末日记中的时间和活动，检查过去时形式及事件顺序后作准确报告。',
  'companion-02',
  q8([
    choose('A diary says: “I climbed a hill on Saturday. I played the piano at home on Sunday.” What did the writer do on Saturday?', ['Climbed a hill.', 'Played the piano.', 'Watched TV.'], 0, '在日记中找 Saturday 对应的活动。', '日记说写日记的人周六爬了山。'),
    choose('According to the same diary, what did the writer do at home on Sunday?', ['Rowed a boat.', 'Played the piano.', 'Climbed a hill.'], 1, '核对 Sunday 和 at home 的活动信息。', '日记说写日记的人周日在家弹钢琴。'),
    choose('A friend wrote, “I climb a hill last Saturday.” Which correction is right?', ['I climbed a hill last Saturday.', 'I climbs a hill last Saturday.', 'I am climb a hill last Saturday.'], 0, 'last Saturday 要求使用过去式。', 'climbed 是 climb 的过去式，和 last Saturday 搭配正确。'),
    pair('日记写着：Saturday—climbed a hill；Sunday at home—played the piano；both activities happened last weekend。把时间和活动连起来。', [
      ['Saturday', 'climbed a hill'],
      ['Sunday at home', 'played the piano'],
      ['last weekend', 'both activities happened'],
    ], '对照日记中的日期和活动。', '爬山在周六，弹琴在周日在家；两项都发生在上周末。'),
    choose('Which report keeps the diary’s activities, days, and past-tense verbs correct?', ['I climbed a hill on Saturday and played the piano at home on Sunday.', 'I climb a hill on Saturday and play the piano at home on Sunday.', 'I played the piano on Saturday and climbed a hill at home on Sunday.'], 0, '一起核对活动、日期和过去式。', '第一项保留了日记中的活动、星期和过去时动词。'),
    choose('A note says, “We row a boat yesterday.” Which edit fixes the verb tense?', ['We rowed a boat yesterday.', 'We rows a boat yesterday.', 'We are row a boat yesterday.'], 0, 'yesterday 表示过去，选择过去式。', 'row 的过去式是 rowed。'),
    sortInto('把句子分到“时间和过去式相符”或“有一处不相符”。', ['时间和过去式相符', '有一处不相符'], [
      { label: 'I watched TV last night.', categoryIndex: 0 },
      { label: 'We rowed a boat on Sunday.', categoryIndex: 0 },
      { label: 'I watch TV yesterday.', categoryIndex: 1 },
      { label: 'We are played the piano last weekend.', categoryIndex: 1 },
    ], '同时检查时间线索和动词形式。', '前两句用过去式；后两句的时间和动词形式不匹配。'),
    arrange('按日记的先后顺序整理周末活动。', [
      'First, I climbed a hill on Saturday.',
      'Next, I stayed at home on Sunday morning.',
      'Then, I played the piano on Sunday afternoon.',
      'Finally, I wrote about the weekend.',
    ], [0, 1, 2, 3], '根据 First、Next、Then、Finally 排列日记步骤。', '日记先写周六活动，再写周日活动，最后记录周末经历。'),
  ]),
);

export const unit = buildEnglishUnit({
  grade: 5,
  term: 2,
  formalUnitNumber: 4,
  entryId: 'unit-04',
  title: 'Unit 4 · Last Weekend',
  sourceTopics: [
    '谈论上周末做过的活动，理解一般过去时常见动词形式和时间线索。',
    '练习围绕目录主题设计原创词卡、问答、信息核对和简短表达；核心词卡已与固定快照附录单元词表对照；教材正文未逐页核对；扩展词不宣称来自原文。',
  ],
  basicTasks: [
    makeTask('认读与辨析周末活动表达', '认读本主题的活动词组，准确辨认英文形式和中文意思。', 'companion-01', profile1),
    basicTask2,
  ],
  advancedTasks: [
    advancedTask1,
    advancedTask2,
  ],
  highTasks: [
    highTask1,
    highTask2,
  ],
});
