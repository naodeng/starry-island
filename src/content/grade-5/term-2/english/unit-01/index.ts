import { buildEnglishUnit } from '../../../../grade-2/term-1/english/buildEnglishUnit';
import { arrange, choose, pair, q8, sortInto } from '../../../../grade-2/term-1/english/questionAuthoring';
import type { EightEnglishQuestions, EnglishTaskSpec } from '../../../../grade-2/term-1/english/questionAuthoring';

// 核对固定 TapX 快照：英语五年级下册目录页；U1 印刷页2–13（PDF页7–18）。
function task(title: string, objective: string, companionId: EnglishTaskSpec['companionId'], questions: EightEnglishQuestions): EnglishTaskSpec {
  return { title, objective, companionId, questions };
}

export const unit = buildEnglishUnit({
  grade: 5,
  term: 2,
  formalUnitNumber: 1,
  entryId: 'unit-01',
  title: 'Unit 1 · Keeping Healthy',
  sourceTopics: [
    '使用 should/shouldn’t 给出健康建议，如 exercise every day、go to bed early、wash hands before eating',
    '询问并描述身体不适：What’s wrong? I’ve got a stomachache/headache/toothache. I’m tired.',
    '使用 What should I/we do? 和 You should/shouldn’t ... 提出建议',
    '从 Linda 给 Worried 的信中提取疲倦、课堂睡觉、睡眠和屏幕使用等问题及相应建议',
    '理解饮食图中 different kinds of food 的建议：少量油和糖、适量肉奶、充足果蔬及主食',
    '在 head、bread、sweater、weather、healthy、heavy 等词中辨认 ea 的常见发音',
    '阅读《The Best Wish》，按 Mrs Brown 遇见神奇小人、许愿和最后选择健康的顺序整理故事',
  ],
  basicTasks: [
    task('谈论健康习惯并给出建议', '使用 should 和 shouldn’t 谈健康行为，并能辨认日常生活中的良好习惯。', 'companion-01', q8([
      choose('Which sentence gives good advice about exercise?', ['You should exercise every day.', 'You should eat too much candy.', 'You shouldn’t go to bed early.'], 0, '健康建议鼓励适量运动。', 'You should exercise every day. 表示每天锻炼是好习惯。'),
      choose('Which action is a good habit before eating?', ['Wash your hands.', 'Eat with dirty hands.', 'Drink too much juice.'], 0, '想一想吃饭前需要保持什么卫生习惯。', '饭前洗手有助于保持清洁。'),
      pair('把健康习惯和对应表达连起来。', [['早睡', 'go to bed early'], ['饭前洗手', 'wash hands before eating'], ['每天锻炼', 'exercise every day']], '读懂动作和时间短语。', '三个短语分别表示早睡、饭前洗手和每天锻炼。'),
      choose('A child eats candy very often. Which advice is suitable?', ['You shouldn’t eat too much candy.', 'You should eat candy before every meal.', 'You shouldn’t wash your hands.'], 0, '建议需要说明怎样减少不健康的习惯。', 'You shouldn’t eat too much candy. 是合适的提醒。'),
      choose('“我们应该早点睡觉”怎么说？', ['We should go to bed early.', 'We should early go bed.', 'We shouldn’t go to bed early.'], 0, 'should 后接动词原形。', 'We should go to bed early. 语序和动词形式正确。'),
      sortInto('把行为分到“建议做”或“不建议做”。', ['建议做', '不建议做'], [{ label: 'drink milk every day', categoryIndex: 0 }, { label: 'wash hands before eating', categoryIndex: 0 }, { label: 'eat with dirty hands', categoryIndex: 1 }, { label: 'eat too much candy', categoryIndex: 1 }], '用 should/shouldn’t 判断行为是否健康。', '每天喝奶、饭前洗手是健康习惯；脏手吃饭和过多糖果不建议。'),
      choose('Which word completes the sentence: “You ___ brush your teeth every day.”?', ['should', 'shouldn’t', 'wrong'], 0, '每天刷牙是推荐的健康习惯。', 'should 用于给出应当做的建议。'),
      arrange('整理一段给同学的健康建议。', ['You should wash your hands.', 'You should eat more fruit.', 'You should exercise often.', 'You should go to bed early.'], [0, 1, 2, 3], '可以按清洁、饮食、运动和休息的顺序提出建议。', '先讲卫生，再讲饮食、运动和睡眠，建议清楚完整。'),
    ])),
    task('询问身体不适并提出帮助', '使用 What’s wrong? 询问情况，识别常见症状并用 should/shouldn’t 回答。', 'companion-02', q8([
      choose('Which question asks about a person’s problem?', ['What’s wrong?', 'What time is it?', 'Where is your school?'], 0, '找出询问身体或情况有什么问题的表达。', 'What’s wrong? 用来询问对方怎么了。'),
      choose('“我肚子疼”可以怎样说？', ['I’ve got a stomachache.', 'I’ve got a sweater.', 'I’m got a headache.'], 0, 'stomachache 表示肚子疼。', 'I’ve got a stomachache. 表示“我肚子疼”。'),
      pair('把症状和英文表达连起来。', [['头疼', 'headache'], ['牙疼', 'toothache'], ['疲倦', 'tired']], '观察词尾 ache 和描述状态的形容词。', 'headache 是头疼，toothache 是牙疼，tired 表示疲倦。'),
      choose('Frank says he often has a stomachache after eating candy. What should he do?', ['He should drink some water and shouldn’t eat too much candy.', 'He should eat more candy.', 'He shouldn’t wash his hands.'], 0, '把护士给 Frank 的建议和他的情况对应起来。', '喝水并减少糖果能回应胃痛和吃糖过多的问题。'),
      choose('Which reply is a good answer to “I’ve got a toothache. What should I do?”', ['You should see a dentist.', 'You should eat more candy.', 'You shouldn’t brush your teeth.'], 0, '牙齿疼痛需要向专业人员寻求帮助。', '建议看牙医能回应 toothache。'),
      sortInto('把表达分到“症状”或“建议”。', ['症状', '建议'], [{ label: 'I’m tired.', categoryIndex: 0 }, { label: 'I’ve got a headache.', categoryIndex: 0 }, { label: 'You should drink some water.', categoryIndex: 1 }, { label: 'You shouldn’t watch too much TV.', categoryIndex: 1 }], '症状说身体状况，建议说应该或不应该做什么。', 'tired、headache 描述不适；should 和 shouldn’t 引出建议。'),
      choose('Which pair has the correct question and answer?', ['What’s wrong? — I’ve got a headache.', 'What’s wrong? — It’s Tuesday.', 'How old are you? — I’ve got a toothache.'], 0, '问题询问情况，回答要说出具体症状。', 'What’s wrong? 和 I’ve got a headache. 可以自然对应。'),
      arrange('整理一段询问症状并回应的对话。', ['What’s wrong?', 'I’ve got a headache.', 'What should I do?', 'You should rest and drink some water.'], [0, 1, 2, 3], '先询问不适，再说明症状和请求建议。', '询问、描述症状、询问建议、给出建议，顺序自然。'),
    ])),
  ],
  advancedTasks: [
    task('阅读健康来信并选择相关建议', '从 Worried 的信中提取困扰，判断 Linda 的每条建议如何回应具体问题。', 'companion-03', q8([
      choose('Worried often feels tired and sleepy in class. Which advice is most relevant?', ['Exercise every day and go to bed early.', 'Watch more TV at night.', 'Eat more candy before class.'], 0, '从信中找出白天困倦和夜里作息的联系。', '每天运动、早点睡觉对应疲倦和课堂困倦的问题。'),
      choose('Worried sometimes cannot sleep because of computer games and TV. What should he do?', ['Turn off the computer and TV at 9 p.m.', 'Play computer games all night.', 'Watch more TV in bed.'], 0, '阅读 Linda 对晚间屏幕使用的建议。', 'Linda 建议晚上九点关掉电脑和电视，帮助改善睡眠。'),
      choose('Linda asks Worried to walk more and help his mum. What does she suggest?', ['Doing more activity and helping at home.', 'Staying in bed all day.', 'Eating only sweets.'], 0, '把 walk more 和 help your mum 放在一起理解。', '多走路并帮妈妈做家务，增加活动并参与家庭劳动。'),
      pair('把 Worried 的问题和 Linda 的建议连起来。', [['上课常感到困倦', '早点睡并每天锻炼'], ['睡前玩电脑或看电视太久', '晚上九点关掉屏幕'], ['活动少', '多走路并帮忙做家务']], '注意信中 each problem 和对应建议的先后。', '三项建议分别回应困倦、晚间屏幕和活动不足。'),
      sortInto('把信中信息分到“Worried 的问题”或“Linda 的建议”。', ['Worried 的问题', 'Linda 的建议'], [{ label: 'He sometimes sleeps in class.', categoryIndex: 0 }, { label: 'He doesn’t get good marks.', categoryIndex: 0 }, { label: 'He should exercise every day.', categoryIndex: 1 }, { label: 'He should go to bed before 9:30.', categoryIndex: 1 }], '区分描述现状的句子和给出的建议。', '上课睡觉、成绩不理想是问题；exercise 和 bedtime 是建议。'),
      choose('Which detail is supported by the letter?', ['Worried sometimes watches TV at night.', 'Worried never goes to school.', 'Linda asks him to eat more candy.'], 0, '选择信中直接提到的行为。', '信里提到 Worried 晚上会玩电脑或看电视。'),
      arrange('整理阅读健康来信并作答的步骤。', ['找出写信人描述的困扰', '圈出回复中出现的建议', '把每条建议和相关困扰配对', '用材料中的信息作答'], [0, 1, 2, 3], '先识别问题，再找建议并建立对应。', '读懂困扰、标出建议、逐条对应，最后依据材料回答。'),
      choose('如果回复中有一条建议没有回应 Worried 信里的困扰，阅读时应怎样判断？', ['把建议和问题逐项核对，不把它当作对应答案', '因为它出现在回复里就套用到任何问题', '忽略信件中的所有信息'], 0, '答案要根据问题和建议之间的关系来选。', '逐项核对能避免把无关建议误配给问题。'),
    ])),
    task('理解饮食建议并辨认 ea 拼写', '读懂不同食物的建议数量，识别 head、bread、healthy 等词中的 ea 拼写和词义。', 'companion-04', q8([
      choose('According to the food chart, which food should we eat plenty of?', ['Fruit and vegetables.', 'Oil and candy.', 'Only meat.'], 0, '查看图中“plenty of”对应的食物类别。', '图中建议多吃水果和蔬菜。'),
      choose('Which food should we have only a little of?', ['Candy and oil.', 'Fruit and vegetables.', 'Bread and rice.'], 0, '找图中标为 little 的一层。', '糖果和油脂属于只建议少量食用的食物。'),
      choose('Which word has the same ea sound as “head” in this unit?', ['bread', 'tea', 'meat'], 0, '比较单词中 ea 的读音。', 'head 和 bread 中的 ea 都读作短元音 /e/。'),
      pair('把单词和对应意思连起来。', [['healthy', '健康的'], ['weather', '天气'], ['heavy', '重的']], '利用熟悉的词义线索。', 'healthy 表示健康的，weather 表示天气，heavy 表示重的。'),
      sortInto('把单词分到“本单元 ea 发短元音”或“其他读音”。', ['ea 发短元音', '其他读音'], [{ label: 'head', categoryIndex: 0 }, { label: 'bread', categoryIndex: 0 }, { label: 'meat', categoryIndex: 1 }, { label: 'tea', categoryIndex: 1 }], 'head、bread 的 ea 与 meat、tea 的读音不同。', 'head、bread 中 ea 发短元音；meat、tea 中 ea 发长元音。'),
      choose('Which sentence agrees with the food chart?', ['We should eat plenty of fruit and vegetables.', 'We should eat too much candy.', 'We shouldn’t eat any vegetables.'], 0, '图表建议多吃哪类食物？', '图表强调多吃水果和蔬菜。'),
      choose('Which word names something we wear when it is cold?', ['sweater', 'weather', 'healthy'], 0, '区分衣物、天气和健康形容词。', 'sweater 是毛衣，天气冷时可以穿。'),
      arrange('整理健康饮食海报上的建议。', ['Eat plenty of fruit and vegetables.', 'Have some milk and meat.', 'Eat only a little candy and oil.', 'Choose different kinds of food.'], [0, 1, 2, 3], '按食物类别给出适量、均衡的提醒。', '先突出果蔬，再补充适量食物、少量糖油和多样选择。'),
    ])),
  ],
  highTasks: [
    task('为同学写出安全、具体的健康建议', '结合症状、饮食、休息和运动等信息，选择适合的建议并用清楚英语表达。', 'companion-01', q8([
      choose('A friend has a headache after playing computer games for a long time. Which advice is best?', ['You should rest and shouldn’t watch too much TV.', 'You should play games longer.', 'You shouldn’t drink water.'], 0, '建议要回应长时间看屏幕和头疼。', '休息并减少屏幕时间，比继续玩更合适。'),
      choose('A friend has a toothache. Which suggestion is safest?', ['You should tell an adult and see a dentist.', 'You should eat more candy.', 'You shouldn’t tell anyone.'], 0, '牙痛需要成人帮助和专业检查。', '告诉成人并看牙医是安全、合适的做法。'),
      pair('把健康问题和合适建议连起来。', [['I’m tired at school.', 'Go to bed early.'], ['I have a stomachache.', 'Drink some water and tell an adult.'], ['I eat with dirty hands.', 'Wash your hands before eating.']], '建议要和问题对应，并注意身体不适时寻求成人帮助。', '睡眠、胃部不适和卫生问题分别对应不同建议。'),
      choose('Which advice is clear and encouraging?', ['You can walk more and help your family.', 'You are bad because you feel tired.', 'You must never talk about health.'], 0, '选择语气友好且行动具体的建议。', 'walk more 和 help your family 是具体、鼓励式的建议。'),
      sortInto('把建议分到“可以独立养成的习惯”或“需要告诉成人”。', ['日常习惯', '告诉成人'], [{ label: 'go to bed early', categoryIndex: 0 }, { label: 'wash hands before eating', categoryIndex: 0 }, { label: 'a strong toothache', categoryIndex: 1 }, { label: 'a stomachache that does not go away', categoryIndex: 1 }], '区分日常健康习惯和持续不适的求助情况。', '早睡和洗手是日常习惯；持续疼痛应告诉成人寻求帮助。'),
      choose('A student feels tired because they sleep late. What is a reasonable first change?', ['Go to bed earlier.', 'Watch TV later.', 'Skip breakfast every day.'], 0, '先调整与睡眠不足直接相关的习惯。', '早点睡能直接回应晚睡造成的疲倦。'),
      arrange('写一段简短健康回复。', ['礼貌回应对方的问题', '说明一到两条相关建议', '用 should/shouldn’t 写清做法', '提醒持续不舒服时告诉成人'], [0, 1, 2, 3], '先表示回应，再提出具体建议并照顾安全。', '回复需友好、相关、表达清楚，持续不适时寻求成人帮助。'),
      choose('Why should advice match the person’s problem?', ['It helps the person understand what action may help.', 'It makes every health problem the same.', 'It means the advice needs no clear words.'], 0, '相关建议更容易被理解和执行。', '把建议和问题对应，能让对方知道下一步可以做什么。'),
    ])),
    task('复述故事并核对健康信息来源', '按《The Best Wish》的事件顺序复述，区分故事情节、健康建议和个人推测。', 'companion-03', q8([
      choose('In “The Best Wish”, what happens before Mrs Brown meets the little man?', ['She is walking by the sea on a hot day.', 'She is doing homework at school.', 'She is buying a sweater in winter.'], 0, '故事开头先交代天气、地点和 Mrs Brown 的活动。', '故事开始时，Mrs Brown 在炎热天气里沿海边散步。'),
      choose('What does Mrs Brown wish for first?', ['A big dinner.', 'A new school.', 'A bicycle.'], 0, '注意第一次许愿后出现的变化。', '她先许愿要一顿丰盛的晚餐。'),
      choose('What is Mrs Brown’s final wish?', ['Good health.', 'A very expensive car.', 'A bigger dinner.'], 0, '比较最后一次愿望和前面的物质愿望。', '故事最后她选择祝愿自己身体健康。'),
      pair('把故事线索和它说明的内容连起来。', [['Little green bottle on the beach', '故事中的神奇事件起点'], ['Three wishes', 'Mrs Brown 可以作出的选择'], ['Good health', '她最后选择的愿望']], '按故事发展理解物品、机会和结尾。', '瓶子引出事件，三个愿望构成选择，健康是最后愿望。'),
      sortInto('把陈述分到“故事明确提供”或“没有材料支持”。', ['明确提供', '没有材料支持'], [{ label: 'Mrs Brown walks by the sea.', categoryIndex: 0 }, { label: 'She chooses good health at the end.', categoryIndex: 0 }, { label: 'She moves to another country.', categoryIndex: 1 }, { label: 'The story gives the bottle a price.', categoryIndex: 1 }], '只把故事中出现的信息当作事实。', '海边散步和最后的愿望有故事依据；搬家和瓶子价格没有说明。'),
      choose('How can you retell the story without missing its main idea?', ['Keep the main events and Mrs Brown’s final choice.', 'List every food word from the unit.', 'Change the final wish to a new car.'], 0, '复述要保留故事关键事件和结尾变化。', '主要事件与最后选择构成故事主线，复述应准确保留。'),
      arrange('整理《The Best Wish》的主要事件。', ['Mrs Brown finds a bottle on the beach.', 'A little man offers three wishes.', 'Her first wishes lead to unexpected results.', 'She wishes for good health.'], [0, 1, 2, 3], '依照遇见瓶子、获得愿望、经历结果和最后选择排列。', '先发现瓶子，再得到愿望，经历愿望带来的变化，最后选择健康。'),
      choose('When writing health advice, which detail should you check before sharing?', ['Whether it matches the unit’s advice and the person’s problem.', 'Whether it sounds surprising.', 'Whether it uses the longest sentence.'], 0, '核对信息与具体问题是否对应。', '建议要有依据并适合具体情况，不能只为显得有趣。'),
    ])),
  ],
});
