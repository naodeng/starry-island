import { buildEnglishUnit } from '../../../../grade-2/term-1/english/buildEnglishUnit';
import { arrange, choose, lessonProfile, makeTask, pair, phraseQuestion, q8, sortInto } from '../../../../grade-2/term-1/english/questionAuthoring';
import type { EightEnglishQuestions, EnglishTaskSpec } from '../../../../grade-2/term-1/english/questionAuthoring';

// 主题边界依据固定册次目录；练习词和情境为原创，不声称逐词核验教材正文。
const profile1 = lessonProfile(
  [
    { word: 'went to the beach', meaning: '去了海滩' }, { word: 'swam', meaning: '游泳了' },
    { word: 'ate ice cream', meaning: '吃了冰淇淋' }, { word: 'the Stone Forest', meaning: '石林' },
  ],
  [
    phraseQuestion('你不明白短语 “went to the beach” 的意思，哪句可以请同伴解释？', ['What does “went to the beach” mean?', 'Where is “went to the beach”?', 'How are you?'], 0, '先说清你想询问短语的意思。 What does “went to the beach” mean? 是完整、语序正确的词义问句。'),
    phraseQuestion('朋友问：How do you say ‘the Stone Forest’ in Chinese? 哪个中文名称正确？', ['海滩', '石林', '动物园'], 1, '回答名称时要核对英文地点和中文名称是否匹配。 the Stone Forest 对应中文地名“石林”。'),
  ],
  ['旅行活动', '地点或评价'],
  [
    { label: 'went to the beach', categoryIndex: 0 }, { label: 'swam', categoryIndex: 0 },
    { label: 'the Stone Forest', categoryIndex: 1 }, { label: 'delicious', categoryIndex: 1 },
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
  '读懂旅行活动并认出过去式',
  '根据简单的旅行线索理解活动表达，选择常见动词的过去式，并按时间和活动整理信息。',
  'companion-02',
  q8([
    choose('Last Saturday, Amy went to the beach. Where did she go?', ['To the beach.', 'To the Stone Forest.', 'To school.'], 0, '找出句子中 went to 后面的地点。', 'Amy 上周六去了海滩。'),
    choose('Ben swam at the beach yesterday. What did he do?', ['He ate ice cream.', 'He swam.', 'He took photos.'], 1, '找出句子里 Ben 做的活动。', 'swam 表示“游泳了”。'),
    choose('What is the past form of go?', ['goed', 'goes', 'went'], 2, '想一想 go 的不规则过去式。', 'go 的过去式是 went。'),
    pair('把旅行活动的原形和过去式连起来。', [
      ['go to the beach', 'went to the beach'], ['swim', 'swam'], ['eat ice cream', 'ate ice cream'],
    ], '逐组比较动词原形和过去式。', 'go、swim、eat 的过去式分别是 went、swam、ate。'),
    choose('Which sentence correctly tells what Lily did yesterday?', ['Lily eats ice cream yesterday.', 'Lily ate ice cream yesterday.', 'Lily is eat ice cream yesterday.'], 1, 'yesterday 提示事情已经发生；检查动词形式。', '过去发生的动作使用 ate。'),
    choose('Which sentence correctly uses “take photos” with “last Sunday”?', ['We took photos last Sunday.', 'We take photos last Sunday.', 'We taking photos last Sunday.'], 0, 'last Sunday 是过去时间线索。', 'take 的过去式是 took。'),
    sortInto('把词语分到“过去时间线索”或“旅行活动”。', ['过去时间线索', '旅行活动'], [
      { label: 'yesterday', categoryIndex: 0 }, { label: 'last summer', categoryIndex: 0 },
      { label: 'swam in the sea', categoryIndex: 1 }, { label: 'took photos', categoryIndex: 1 },
    ], '时间线索说明什么时候；旅行活动说明做了什么。', 'yesterday 和 last summer 表示过去时间；另外两项表示旅行活动。'),
    arrange('把词卡排成“我们去年夏天在海里游泳了”。', ['summer.', 'the', 'in', 'swam', 'We', 'sea', 'last'], [4, 3, 2, 1, 5, 6, 0], '先找主语和过去式动词，再放地点和时间。', '完整句子是 “We swam in the sea last summer.”'),
  ]),
);

const advancedTask1 = customTask(
  '在对话中谈论旅行经历',
  '结合问答目的和过去时间，选择自然的旅行对话表达，并区分问题、回答和活动信息。',
  'companion-03',
  q8([
    choose('A: “Where did you go last summer?” B: “___” Which answer fits?', ['I went to the beach with my family.', 'I go to the beach last summer.', 'I am going to the beach yesterday.'], 0, '问题询问去年夏天去过的地点。', 'I went to the beach with my family. 用过去式回答了地点问题。'),
    choose('A: “What did you do there?” B: “___” Which answer fits?', ['I took photos and swam.', 'I take photos tomorrow.', 'I am swim there.'], 0, '问题询问在那里的旅行活动。', 'I took photos and swam. 用过去式说出两项活动。'),
    pair('把旅行问句和合适回答连起来。', [
      ['Where did you go?', 'I went to the Stone Forest.'],
      ['What did you buy?', 'I bought some gifts.'],
      ['How did you feel?', 'I felt happy.'],
    ], '先判断问句询问地点、购买物品还是感受。', '地点、购买物品和感受分别对应去了石林、买了礼物和感到开心。'),
    choose('Which question asks about a finished trip?', ['Where did you go last summer?', 'Where do you live?', 'What are you doing now?'], 0, '选择带有过去时间并询问已结束旅行的问题。', 'Where did you go last summer? 询问去年夏天去过哪里。'),
    choose('A friend asks, “Did you see flowers at the park?” Which short answer is correct if you did?', ['Yes, I do.', 'Yes, I did.', 'Yes, I was.'], 1, 'Did you ...? 的肯定简答使用 did。', 'Did you ...? 的肯定简答是 “Yes, I did.”'),
    choose('You ate some ice cream on your trip. How can you describe it?', ['It was delicious.', 'It were delicious.', 'It delicious was.'], 0, '选择语序自然、be 动词与主语一致的表达。', 'It was delicious. 表示“它很好吃”，语序和 was 都正确。'),
    sortInto('把句子分到“旅行问句”或“旅行回答”。', ['旅行问句', '旅行回答'], [
      { label: 'Where did you go last weekend?', categoryIndex: 0 }, { label: 'What did you see there?', categoryIndex: 0 },
      { label: 'I saw some flowers.', categoryIndex: 1 }, { label: 'I bought a postcard.', categoryIndex: 1 },
    ], '问句询问过去的旅行信息；回答说明地点或活动。', '前两句是旅行问句，后两句是过去旅行经历的回答。'),
    arrange('按询问地点、回答地点、询问活动、回答活动的顺序整理对话。', [
      'Where did you go last summer?', 'I went to the beach.', 'What did you do there?', 'I swam and took photos.',
    ], [0, 1, 2, 3], '先询问地点，再询问在那里做过什么。', '对话先问去哪里，再问做了什么，回答都使用过去时。'),
  ]),
);

const advancedTask2 = customTask(
  '阅读旅行记录并准确转述',
  '从题面提供的原创旅行记录提取地点、活动和感受，只报告材料明确支持的信息。',
  'companion-04',
  q8([
    choose('Maya’s note says: “Last summer, I went to the Stone Forest with my family. We saw flowers and took photos. I ate ice cream and felt happy.” Where did Maya go?', ['To the beach.', 'To the Stone Forest.', 'To the zoo.'], 1, '回到记录中找 Maya 去过的地点。', '记录说 Maya 去了石林。'),
    choose('According to Maya’s note, what did her family do there?', ['They saw flowers and took photos.', 'They swam in the sea.', 'They watched TV at home.'], 0, '把活动和记录中的内容对应起来。', '记录提到看花和拍照，没有提到游泳或看电视。'),
    choose('Maya wrote, “I ate ice cream and felt happy.” How did she feel?', ['Sad.', 'Tired.', 'Happy.'], 2, '找出记录直接写出的感受。', 'Maya 在记录中说自己感到开心。'),
    pair('记录写着：Last summer—went to the Stone Forest；there—saw flowers and took photos；later—ate ice cream。把时间或地点线索和对应内容连起来。', [
      ['Last summer', 'went to the Stone Forest'], ['At the Stone Forest', 'saw flowers and took photos'], ['Later', 'ate ice cream'],
    ], '根据记录中的时间和地点线索定位活动。', '去年夏天去了石林，在那里看花拍照，后来吃了冰淇淋。'),
    choose('Which summary matches Maya’s note?', ['She went to the Stone Forest, saw flowers, took photos, and ate ice cream.', 'She went to the beach and swam all day.', 'She stayed at home and watched a film.'], 0, '核对摘要里的地点和活动是否都出现在记录中。', '第一项准确保留了记录中的地点和活动。'),
    sortInto('旅行记录写着：“Last summer, Maya went to the Stone Forest. She saw flowers and took photos. She ate ice cream and felt happy.”把信息分到“记录提到”或“记录未提到”。', ['记录提到', '记录未提到'], [
      { label: 'Maya went to the Stone Forest.', categoryIndex: 0 }, { label: 'Maya took photos.', categoryIndex: 0 },
      { label: 'Maya swam in the sea.', categoryIndex: 1 }, { label: 'Maya felt angry.', categoryIndex: 1 },
    ], '只依据这段记录，不要补充没有写出的活动或感受。', '去石林、拍照和开心都在记录中；海里游泳和生气没有提到。'),
    choose('The note says Maya ate ice cream and felt happy. What can you report?', ['The note says Maya felt happy.', 'Maya bought a camera.', 'Maya visited the beach twice.'], 0, '只转述材料明确写出的感受。', '记录写了 Maya 感到开心，没有提到买相机或去海滩的次数。'),
    arrange('按 Maya 记录中的时间顺序整理旅行活动。', [
      'First, Maya went to the Stone Forest with her family.',
      'Next, they saw flowers and took photos.',
      'Then, Maya ate ice cream.',
      'Finally, she wrote that she felt happy.',
    ], [0, 1, 2, 3], '根据 First、Next、Then、Finally 和记录内容排列。', '先到石林，再看花拍照，之后吃冰淇淋，最后写下感受。'),
  ]),
);

const highTask1 = customTask(
  '按旅行计划的多个条件核对方案',
  '综合日期、地点和活动类型比较旅行方案，判断计划是否满足每一项要求。',
  'companion-01',
  q8([
    choose('A family wants to visit a nature site on Saturday. Which plan matches both the day and place type?', ['Visit the Stone Forest on Saturday.', 'Visit the beach on Sunday.', 'Watch TV at home on Saturday.'], 0, '同时核对日期和地点类型。', '只有周六去自然景点符合日期和地点类型要求。'),
    choose('The family wants to swim at the beach on Sunday. Which plan fits both needs?', ['Swim at the beach on Sunday.', 'Take photos at the Stone Forest on Sunday.', 'Swim at the beach on Saturday.'], 0, '同时核对活动、地点和日期。', '周日在海滩游泳满足活动、地点和日期要求。'),
    choose('The schedule must show a nature site on Saturday and beach swimming on Sunday. Which record matches?', ['Saturday: visit the Stone Forest. Sunday: swim at the beach.', 'Saturday: swim at the beach. Sunday: visit the Stone Forest.', 'Saturday: visit the Stone Forest. Sunday: watch TV at home.'], 0, '逐项检查两天的安排是否符合要求。', '第一项把自然景点和海滩游泳分别安排在正确日期。'),
    pair('把旅行要求和符合的活动连起来。', [
      ['周六游览自然景点', 'visit the Stone Forest'], ['周日在海滩游泳', 'swim at the beach'], ['旅途中拍照', 'take photos'],
    ], '核对每项要求与活动内容。', '石林是自然景点；海滩游泳和拍照分别对应另两项要求。'),
    choose('Your family wants a nature visit on Saturday, then beach swimming on Sunday. Which weekend plan meets both requirements?', ['Visit the Stone Forest on Saturday; swim at the beach on Sunday.', 'Swim at the beach on Saturday; visit the Stone Forest on Sunday.', 'Visit the Stone Forest on Saturday; watch TV on Sunday.'], 0, '检查两项活动是否都符合指定日期和要求。', '第一项周六去石林、周日在海滩游泳，满足全部条件。'),
    choose('The family also wants to take photos at the Stone Forest on Saturday. Which plan includes this activity at the right place and time?', ['Take photos at the Stone Forest on Saturday.', 'Take photos at the beach on Sunday.', 'Eat ice cream at home on Saturday.'], 0, '核对拍照活动、地点和日期。', '周六在石林拍照符合新增条件。'),
    sortInto('要求是“周六去石林，周日在海滩游泳”。把方案分到“满足要求”或“至少漏掉一项”。', ['满足要求', '至少漏掉一项'], [
      { label: 'Visit the Stone Forest on Saturday; swim at the beach on Sunday.', categoryIndex: 0 },
      { label: 'Swim at the beach on Saturday; visit the Stone Forest on Sunday.', categoryIndex: 1 },
      { label: 'Visit the Stone Forest on Saturday; eat ice cream at home on Sunday.', categoryIndex: 1 },
      { label: 'Take photos at the Stone Forest on Sunday; swim at the beach on Saturday.', categoryIndex: 1 },
    ], '逐项检查地点、活动和对应日期。', '只有第一项同时满足周六去石林和周日在海滩游泳。'),
    arrange('按先安排周六、再安排周日、最后核对行程的顺序整理步骤。', [
      'First, choose a nature site for Saturday.',
      'Next, choose a beach activity for Sunday.',
      'Then, write both plans on the trip calendar.',
      'Finally, check that each plan is on the right day.',
    ], [0, 1, 2, 3], '注意 First、Next、Then、Finally 表示的步骤顺序。', '先选两天的活动，再写进日历，最后核对日期。'),
  ]),
);

const highTask2 = customTask(
  '核对旅行日记并组织时间顺序',
  '综合旅行日记中的地点、活动和日期，检查过去时形式及事件顺序后作准确报告。',
  'companion-02',
  q8([
    choose('A diary says: “On Saturday, we went to the beach and swam. On Sunday, we visited the Stone Forest and took photos.” Where did the family go on Saturday?', ['To the beach.', 'To the Stone Forest.', 'To a museum.'], 0, '在日记中找 Saturday 对应的地点。', '日记说一家人周六去了海滩。'),
    choose('According to the same diary, what did they do at the Stone Forest?', ['They ate ice cream.', 'They took photos.', 'They swam in the sea.'], 1, '核对 Stone Forest 对应的活动。', '日记说他们在石林拍了照片。'),
    choose('A friend wrote, “We go to the beach last Saturday.” Which correction is right?', ['We went to the beach last Saturday.', 'We goes to the beach last Saturday.', 'We are go to the beach last Saturday.'], 0, 'last Saturday 要求使用过去式。', 'go 的过去式是 went，和 last Saturday 搭配正确。'),
    pair('日记写着：Saturday—went to the beach and swam；Sunday—visited the Stone Forest and took photos。把日期和活动连起来。', [
      ['Saturday', 'went to the beach and swam'], ['Sunday', 'visited the Stone Forest'], ['At the Stone Forest', 'took photos'],
    ], '对照日记中的日期和地点定位活动。', '周六去了海滩并游泳；周日去了石林并拍照。'),
    choose('Which report keeps the diary’s activities, days, and past-tense verbs correct?', ['We went to the beach and swam on Saturday. We visited the Stone Forest on Sunday.', 'We go to the beach and swim on Saturday. We visit the Stone Forest on Sunday.', 'We visited the Stone Forest on Saturday and swam at home on Sunday.'], 0, '一起核对活动、日期和过去式。', '第一项保留了日记中的活动和日期，并正确使用过去式。'),
    choose('A note says, “Mia take photos at the Stone Forest yesterday.” Which edit fixes the verb?', ['Mia took photos at the Stone Forest yesterday.', 'Mia takes photos at the Stone Forest yesterday.', 'Mia is took photos at the Stone Forest yesterday.'], 0, 'yesterday 表示过去；take 的过去式是不规则变化。', 'take 的过去式是 took。'),
    sortInto('把句子分到“时间和过去式相符”或“有一处不相符”。', ['时间和过去式相符', '有一处不相符'], [
      { label: 'We swam at the beach last weekend.', categoryIndex: 0 }, { label: 'Mia took photos yesterday.', categoryIndex: 0 },
      { label: 'We swim at the beach last weekend.', categoryIndex: 1 }, { label: 'Mia is took photos yesterday.', categoryIndex: 1 },
    ], '同时检查时间线索和动词形式。', '前两句用过去式；后两句的时间和动词形式不匹配。'),
    arrange('按日记中的先后顺序整理周末旅行。', [
      'First, we went to the beach on Saturday.',
      'Next, we swam there.',
      'Then, we visited the Stone Forest on Sunday.',
      'Finally, we took photos there.',
    ], [0, 1, 2, 3], '根据 First、Next、Then、Finally 排列日记里的活动。', '日记先写周六海滩活动，再写周日石林活动。'),
  ]),
);

export const unit = buildEnglishUnit({
  grade: 5,
  term: 2,
  formalUnitNumber: 5,
  entryId: 'unit-05',
  title: 'Unit 5 · Have a Great Trip',
  sourceTopics: [
    '旅行经历与旅途活动；从简短描述中识别地点、活动和感受。',
    '练习围绕目录主题设计原创词卡、问答、信息核对和简短表达；词汇与固定快照附录单元词表对照；教材正文未逐页核对；扩展词不宣称来自原文。',
  ],
  basicTasks: [
    makeTask('认读与辨析旅行表达', '认读本主题的地点与旅行活动表达，准确辨认英文形式和中文意思。', 'companion-01', profile1),
    basicTask2,
  ],
  advancedTasks: [advancedTask1, advancedTask2],
  highTasks: [highTask1, highTask2],
});
