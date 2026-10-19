import { buildEnglishUnit } from '../../../../grade-2/term-1/english/buildEnglishUnit';
import { arrange, choose, pair, q8, sortInto } from '../../../../grade-2/term-1/english/questionAuthoring';
import type { EightEnglishQuestions, EnglishTaskSpec } from '../../../../grade-2/term-1/english/questionAuthoring';

// 核对固定 TapX 快照：英语五年级上册目录 PDF 第6页；U1 印刷页2–13（PDF页7–18）。
function questionTask(
  title: string,
  objective: string,
  companionId: EnglishTaskSpec['companionId'],
  questions: EightEnglishQuestions,
): EnglishTaskSpec {
  return { title, objective, companionId, questions };
}

export const unit = buildEnglishUnit({
  grade: 5,
  term: 1,
  formalUnitNumber: 1,
  entryId: 'unit-01',
  title: 'Unit 1 · Classmates',
  sourceTopics: [
    '人物品质词汇：clever、careless、polite、quiet、cute、friendly、helpful、active 和 popular',
    '询问并描述同学的特点：What is he/she like? / He/She is ...；结合简短行为线索选择恰当的品质词',
    '从外貌、兴趣、擅长的活动和日常表现介绍同学；练习 big eyes、tall、short、be good at 等表达',
    '对照 Sally 与 Sam 的共同点和不同点，依据阅读信息介绍人物，避免把个人特点扩大成无依据结论',
    'Let’s Spell：辨认 black、blue、class、clever、fly、flag、gloves、glasses、plane、plate、slim 和 sleep 中的 bl、cl、fl、gl、pl、sl 字母组合',
    'Fun Time：了解演员 Charlie Chaplin 的职业及帮助他人的事例',
    'Story Time：从露营故事中的同伴、活动和行为线索辨认人物特点，并按事件顺序复述',
  ],
  basicTasks: [
    questionTask('认读同学特点词汇', '理解常见品质词的含义，并把人物的具体表现与合适的描述词联系起来。', 'companion-03', q8([
      choose('A classmate often remembers to say “please” and “thank you”. Which word describes this behaviour?', ['active', 'polite', 'careless'], 1, '留意他待人时使用的礼貌用语。', '使用礼貌用语说明这位同学有礼貌，polite 最合适。'),
      choose('Nina helps a new classmate find the art room. Which word best describes Nina?', ['helpful', 'quiet', 'popular'], 0, '想一想她为新同学做了什么。', '她主动帮助同学，helpful 符合这个行为。'),
      pair('把品质词和最能说明它的行为连起来。', [
        ['clever', '很快找到解决谜题的方法'],
        ['friendly', '主动邀请新同学一起活动'],
        ['careless', '出门时忘了带自己的水壶'],
        ['active', '常参加课间的运动游戏'],
      ], '根据每个行为的含义选择词语，不要只看人物姓名。', '善于思考、友好待人、偶尔粗心和积极参加活动分别对应四个品质词。'),
      choose('Which word means “安静的，不爱说话的”?', ['quiet', 'cute', 'clever'], 0, '在词义中找与“安静”最接近的一项。', 'quiet 表示安静的；cute 是可爱的，clever 是聪明的。'),
      sortInto('把词语分到“品质或相处特点”与“外貌特点”。', ['品质或相处特点', '外貌特点'], [
        { label: 'helpful', categoryIndex: 0 }, { label: 'popular', categoryIndex: 0 },
        { label: 'tall', categoryIndex: 1 }, { label: 'big eyes', categoryIndex: 1 },
      ], '判断这个词是在说一个人怎样待人，还是在说他/她看起来怎样。', 'helpful 和 popular 描述相处特点；tall 和 big eyes 描述外貌。'),
      choose('Which sentence gives a clue that a student is active?', ['She joins the school running game.', 'She sits quietly and reads at lunch.', 'She has a small pencil case.'], 0, '找一找哪项写了积极参加活动。', '参加跑步活动是积极行动的线索；安静阅读和文具大小不能说明 active。'),
      choose('A student is good at drawing. What does this tell us?', ['Drawing is one of the things the student does well.', 'The student never draws pictures.', 'The student is the tallest in class.'], 0, 'good at 后面常接擅长的活动或事情。', 'be good at drawing 表示擅长画画；另外两项没有这个意思。'),
      arrange('把词卡排成“莉莉很友好。”', ['friendly.', 'Lily', 'is'], [1, 2, 0], '先找表示人物的词，再找 be 动词和特点词。', '自然语序为 Lily is friendly.。'),
    ])),
    questionTask('询问并描述同学', '使用 What is ... like? 询问人物特点，并用 He/She is ...、has ... 和 be good at ... 描述同学。', 'companion-02', q8([
      choose('Which question asks about a classmate’s personality or general characteristics?', ['What is Helen like?', 'Where is Helen’s classroom?', 'When does Helen go home?'], 0, '看哪一句是在询问“她是什么样的人”。', 'What is Helen like? 询问人物特点；另外两句分别询问地点和时间。'),
      choose('A: “What is Ben like?”  B: “___”', ['He is friendly and quiet.', 'He is next to the window.', 'He goes home at four.'], 0, '回答要描述 Ben 的特点。', 'friendly 和 quiet 描述人物特点，适合回答 What is Ben like?。'),
      pair('把问题和合适的回答连起来。', [
        ['What is your friend like?', 'She is active and helpful.'],
        ['What is he good at?', 'He is good at science.'],
        ['What are her hobbies?', 'She likes drawing and reading.'],
      ], '先看问题询问的是特点、擅长的事，还是兴趣爱好。', '三个问题分别对应品质描述、擅长内容和兴趣活动。'),
      sortInto('把句子分到“询问人物”或“介绍人物”。', ['询问人物', '介绍人物'], [
        { label: 'What is your classmate like?', categoryIndex: 0 }, { label: 'What is she good at?', categoryIndex: 0 },
        { label: 'He is clever and polite.', categoryIndex: 1 }, { label: 'She has big eyes.', categoryIndex: 1 },
      ], '看句子是在提出问题，还是已经提供人物信息。', 'What 开头的两句在提问；另外两句直接描述人物。'),
      choose('Lily 是女孩。哪句代词和 be 动词搭配正确？', ['She is friendly.', 'He are friendly.', 'They is friendly.'], 0, '主语是单数女孩时，选择合适的代词和 be 动词。', 'She 与 is 搭配正确，句子表示莉莉很友好。'),
      choose('哪句话是在介绍同学擅长的活动？', ['Tom is good at playing football.', 'Tom has a green schoolbag.', 'Tom is very tall.'], 0, '找一找哪句使用了 good at。', 'good at playing football 表示擅长踢足球。'),
      choose('A: “What is May like?”  B: “___”', ['She is polite and popular.', 'She likes drawing after school.', 'She is good at music.'], 0, '先确认回答的是“她是什么样的”。', 'polite 和 popular 描述 May 的特点，第一项最直接地回答问题。'),
      arrange('把词卡排成“你的同学是什么样的？”', ['like?', 'classmate', 'What', 'is', 'your'], [2, 3, 4, 1, 0], '疑问词放在句首，再排列 be 动词和人物信息。', '完整问句是 What is your classmate like?。'),
    ])),
  ],
  advancedTasks: [
    questionTask('根据人物信息选择描述', '从简短资料中提取行为、外貌和擅长的事情，用证据判断合适的描述词。', 'companion-04', q8([
      choose('Rui solves number puzzles quickly and explains his idea to his team. Which description fits best?', ['He is clever.', 'He is careless.', 'He is quiet.'], 0, '想想解决问题快、能说明思路体现了什么特点。', '解决谜题并说明思路支持 clever；题干没有说明他粗心或安静。'),
      choose('Mia often invites classmates who are sitting alone to join her group. Which word fits her actions?', ['friendly', 'careless', 'short'], 0, '她怎样对待身边的同学？', '主动邀请别人一起活动体现 friendly。'),
      pair('把人物资料和有依据的介绍连起来。', [
        ['Leo practises the keyboard and can play several songs.', 'He is good at playing music.'],
        ['An and her classmates often choose her to lead team games.', 'She is popular with her classmates.'],
        ['Bo sometimes leaves his notebook at home.', 'He can be careless.'],
      ], '每条介绍都要和资料里的行为相对应。', '练习键盘、同伴愿意选他带队和忘带笔记本分别支持三项描述。'),
      sortInto('把资料分到“支持 helpful”或“不能单独说明 helpful”。', ['支持 helpful', '不能单独说明 helpful'], [
        { label: 'She stays after class to help a partner pack the art materials.', categoryIndex: 0 },
        { label: 'He is tall and has long arms.', categoryIndex: 1 },
        { label: 'He explains a game rule to a classmate who missed it.', categoryIndex: 0 },
        { label: 'She likes reading books by herself.', categoryIndex: 1 },
      ], '要找实际帮助别人的行为，外貌或个人爱好本身不等于帮助他人。', '整理材料和解释游戏规则是帮助同学的行为；身高和独自阅读不能单独证明 helpful。'),
      choose('Sam is quiet and likes drawing. Which sentence adds a different, supported detail?', ['He enjoys English class at school.', 'He is careless because he draws.', 'He is popular because he is quiet.'], 0, '根据人物资料选择有依据、但不重复当前信息的介绍。', '资料还说明 Sam 喜欢在学校学习英语；另外两项把无关特点硬连起来。'),
      choose('Jia is polite, and she remembers to greet classmates. Which piece of information is the clearest evidence?', ['She says hello when she meets them.', 'She has a blue schoolbag.', 'She runs quickly in a race.'], 0, '选择直接体现礼貌行为的线索。', '主动向同学问好与 polite 直接相关；书包颜色和跑步速度不是礼貌的证据。'),
      arrange('整理一段简短的人物介绍。', [
        'He is helpful and friendly.',
        'This is my classmate Rui.',
        'He often helps our group put the books away.',
        'He is good at reading aloud.',
      ], [1, 2, 0, 3], '先说明介绍谁，再用行为和擅长的事情补充特点。', '先介绍 Rui，再举出帮助小组的行为，然后概括品质并补充朗读特长。'),
      choose('Which introduction is most careful about using evidence?', ['Jin often shares his art tools, so he is helpful to his group.', 'Jin has one blue pen, so he is popular with everyone.', 'Jin reads quietly, so he is always careless.'], 0, '找出证据与人物特点之间有清楚联系的一句。', '分享工具是帮助小组的行为，能支持 helpful；另外两项的推断不由给出的线索得出。'),
    ])),
    questionTask('辨认常见辅音字母组合', '辨认 Let’s Spell 中 bl、cl、fl、gl、pl 和 sl 开头的单词，并在短句中核对拼写。', 'companion-01', q8([
      choose('Which word begins with the letters “bl”?', ['black', 'class', 'plate'], 0, '看每个单词开头的两个字母。', 'black 以 bl 开头；class 以 cl 开头，plate 以 pl 开头。'),
      choose('哪一个词以字母组合 “cl” 开头？', ['gloves', 'clever', 'sleep'], 1, '比较每个单词的前两个字母。', 'clever 以 cl 开头；gloves 以 gl 开头，sleep 以 sl 开头。'),
      pair('把字母组合和一个对应单词连起来。', [
        ['fl', 'flag'], ['gl', 'glasses'], ['pl', 'plane'],
      ], '逐个看单词开头的字母，不要依据中文意思猜。', 'flag、glasses、plane 分别以 fl、gl、pl 开头。'),
      sortInto('按单词开头的组合分类。', ['bl 或 cl', 'fl 或 gl'], [
        { label: 'black', categoryIndex: 0 }, { label: 'class', categoryIndex: 0 },
        { label: 'fly', categoryIndex: 1 }, { label: 'gloves', categoryIndex: 1 },
      ], '对照目标组合检查每个词的第一个和第二个字母。', 'black 和 class 分别以 bl、cl 开头；fly 和 gloves 分别以 fl、gl 开头。'),
      choose('Choose the word that completes “The little ___ is blue.”', ['plane', 'class', 'sleep'], 0, '选一个能放在句中、并来自本单元词卡的名词。', 'plane 表示飞机，符合句意；class 和 sleep 不能放在这里。'),
      choose('Which word begins with “sl”?', ['plate', 'slim', 'blue'], 1, '留意 s 后面跟的是哪个字母。', 'slim 以 sl 开头；plate 以 pl 开头，blue 以 bl 开头。'),
      arrange('把词卡排成“我的飞机是蓝色的。”', ['blue.', 'is', 'plane', 'My'], [3, 2, 1, 0], '先找主语，再排列 be 动词、名词和颜色词。', '完整句子是 My plane is blue.。'),
      choose('在 “class” 中，开头的两个字母是什么？', ['cl', 'fl', 'gl'], 0, '从左向右看单词的前两个字母。', 'class 的前两个字母是 c 和 l，组成 cl。'),
    ])),
  ],
  highTasks: [
    questionTask('比较两位同学的共同点与不同点', '综合阅读人物信息，区分共同特点、个人兴趣和行为证据，用完整句子进行比较。', 'companion-03', q8([
      choose('Sally and Sam both have big eyes. What can we say about them?', ['They share this appearance detail.', 'They have exactly the same hobbies.', 'They are both careless.'], 0, '只选择资料明确提供给两个人的共同信息。', '两人都被描述为 big eyes；题目没有说他们的兴趣完全相同或都粗心。'),
      pair('把人物和资料中明确提到的特点连起来。', [
        ['Sally', 'active and popular'],
        ['Sam', 'quiet and interested in drawing'],
        ['Both classmates', 'big eyes'],
      ], '比较时区分单独属于一人的内容和共同内容。', '资料分别提到 Sally 活跃、受欢迎，Sam 安静并喜欢画画，两人都被描述为大眼睛。'),
      sortInto('把资料分到“共同点”或“只属于一位同学”。', ['共同点', '只属于一位同学'], [
        { label: 'Sally and Sam both have big eyes.', categoryIndex: 0 },
        { label: 'Sally likes going to parties.', categoryIndex: 1 },
        { label: 'Sam enjoys drawing pictures.', categoryIndex: 1 },
        { label: 'Both of them study English at school.', categoryIndex: 0 },
      ], '比较两人的原始资料，不要把不同兴趣合并成共同点。', '大眼睛和在学校学习英语是两人共有的信息；参加聚会和画画分别是各自的兴趣线索。'),
      choose('Sam sometimes cannot find his pencil case in the morning. Which word does this detail support?', ['careless', 'popular', 'cute'], 0, '关注忘记或找不到物品这一行为线索。', '经常找不到自己的文具可以支持有时粗心这一描述。'),
      choose('Which sentence compares the classmates without saying that they are the same in every way?', ['They share one appearance detail, but their interests and personalities differ.', 'They have the same personality and like every activity.', 'Neither of them likes studying English.'], 0, '既说出有依据的共同点，也保留不同信息。', '第一句只概括共同的外貌细节，并说明兴趣与性格不同，没有扩大结论。'),
      pair('把阅读信息和适合的介绍句连起来。', [
        ['Sally has many friends and joins activities.', 'She is active and popular.'],
        ['Sam enjoys making pictures.', 'He likes drawing.'],
        ['They are both described with the same eye detail.', 'They both have big eyes.'],
      ], '每句介绍都要能从对应人物资料中找到依据。', '参加活动且朋友多、喜欢画画、两人共有的外貌信息分别支持三组介绍。'),
      arrange('按顺序写一段比较两位同学的话。', [
        'Then mention one or two details that are different.',
        'First, name the classmates you are comparing.',
        'Finally, use a sentence to sum up what you noticed.',
        'Next, state one detail that they share.',
      ], [1, 3, 0, 2], '先交代人物，再说共同点、不同点，最后概括。', '先说比较对象，再介绍共同点和差异，最后用一句话概括。'),
      choose('Which conclusion is supported by the information about Sally and Sam?', ['They share a few details, and each has personal interests.', 'They always choose the same activities.', 'Their appearance tells us everything about their characters.'], 0, '结论要同时照顾共同信息和个人信息。', '两人有共同的外貌或学习信息，也各有兴趣与性格特点；外貌不能说明一个人的全部性格。'),
    ])),
    questionTask('从故事与事例中判断人物特点', '结合露营故事和 Fun Time 的人物事例，按事件顺序提取行为线索并谨慎描述人物。', 'companion-04', q8([
      choose('In the camping story, Jill shows Phil how to fish. Which word best fits this action?', ['helpful', 'careless', 'popular'], 0, '她正在帮助同伴学习一项活动。', 'Jill 帮助 Phil 学习钓鱼，helpful 最符合这个行为。'),
      choose('John picks up the rubbish after dinner. Which quality does this show?', ['helpful', 'quiet', 'cute'], 0, '想想他的行动怎样帮助了大家。', '收拾大家留下的垃圾是在为营地共同劳动，体现 helpful。'),
      pair('把故事中的行为和可能的描述词连起来。', [
        ['Mary sings and dances for the group.', 'She is good at singing and dancing.'],
        ['Tom cannot find his glasses again.', 'He can be careless.'],
        ['Jack puts a toy snake on a chair as a trick.', 'He is playing a naughty trick.'],
      ], '根据故事里的具体行为判断，不要把一次行为说成一个人的全部特点。', '唱歌跳舞、找不到眼镜和捉弄同伴分别对应才艺、偶尔粗心和淘气的行为。'),
      sortInto('按露营故事发生的先后分组。', ['前半段', '后半段'], [
        { label: 'Jill teaches Phil how to fish.', categoryIndex: 0 },
        { label: 'Jack hides a toy snake as a joke.', categoryIndex: 0 },
        { label: 'Mary sings and dances for everyone.', categoryIndex: 1 },
        { label: 'The campers say good night to their teacher.', categoryIndex: 1 },
      ], '先回想白天的活动，再回想晚上休息前发生的事。', '钓鱼和玩具蛇的插曲出现在前半段；表演和道晚安在故事后半段。'),
      choose('Fun Time 介绍的 Charlie Chaplin 是做什么工作的？', ['He was an actor.', 'He was a science teacher.', 'He was a football coach.'], 0, '回想介绍中提到的职业。', 'Fun Time 将 Charlie Chaplin 介绍为演员。'),
      choose('故事说 Chaplin 曾帮助生活困难的人。哪种描述最有事例依据？', ['He was helpful to other people.', 'He was careless with his school things.', 'He was quiet in English class.'], 0, '选择能由“帮助别人”直接支持的品质词。', '帮助有需要的人支持 helpful；另外两项与材料无关。'),
      arrange('按露营活动的顺序整理几个事件。', [
        'The group has dinner together.',
        'The classmates arrive at camp with their teacher.',
        'Jill and Phil go out in a boat to fish.',
        'The children get ready for bed and say good night.',
      ], [1, 2, 0, 3], '从到达营地开始，再排白天活动、晚餐和睡前事件。', '同学们先到营地，再去钓鱼，随后吃晚饭，最后准备睡觉。'),
      choose('When you describe a classmate, what is the best way to support your description?', ['Give a clear example of what the classmate says or does.', 'Guess the classmate’s personality from a favourite colour.', 'Say the classmate is the best at everything.'], 0, '想一想哪种材料能让介绍更可信、更具体。', '具体言行能支持人物描述；颜色和夸大判断都不能说明一个人的全部特点。'),
    ])),
  ],
});
