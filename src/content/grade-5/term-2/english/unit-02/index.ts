import { buildEnglishUnit } from '../../../../grade-2/term-1/english/buildEnglishUnit';
import { arrange, choose, pair, q8, sortInto } from '../../../../grade-2/term-1/english/questionAuthoring';
import type { EightEnglishQuestions, EnglishTaskSpec } from '../../../../grade-2/term-1/english/questionAuthoring';

// 核对固定 TapX 快照：英语五年级下册目录 PDF 第5页；U2 印刷页14–25（PDF页18–29）。
function task(title: string, objective: string, companionId: EnglishTaskSpec['companionId'], questions: EightEnglishQuestions): EnglishTaskSpec {
  return { title, objective, companionId, questions };
}

export const unit = buildEnglishUnit({
  grade: 5,
  term: 2,
  formalUnitNumber: 2,
  entryId: 'unit-02',
  title: 'Unit 2 · Special Days',
  sourceTopics: [
    '询问和表达日期：When is ...? It’s on ...；练习 January 1st、March 12th、June 1st、July 5th、September 10th、October 1st、December 25th 等日期',
    '表达按星期确定的节日日期：Mother’s Day is on the second Sunday in May；Father’s Day is on the third Sunday in June',
    '谈论如何庆祝特别的日子：How are you going to celebrate it? I’m/We’re going to ...；使用 make a poster、plant trees、fly a kite、have a picnic、do chores 等活动词组',
    '阅读 New Year’s Day、Children’s Day、Teachers’ Day、Father’s Day、Mother’s Day 和 Christmas 的庆祝方式',
    'Let’s Spell：辨认 drink、dress、driver、train、tree、trip、dry、try、trick、travel、drive 中的 tr 和 dr 字母组合',
    'Fun Time：了解端午节、屈原、粽子和龙舟竞赛，以及西方万圣节的日期和装扮活动；制作和分享特别日历',
    'Story Time：按顺序复述 Mary 为妈妈准备母亲节礼物、早餐并理解妈妈流泪是因为感动的故事',
  ],
  basicTasks: [
    task('询问节日日期', '认读本单元常见节日和日期，用 When is ...? 及 It’s on ... 进行问答。', 'companion-01', q8([
      choose('A calendar says Tree Planting Day is on March 12th. When is Tree Planting Day?', ['It’s on March 12th.', 'It’s on July 5th.', 'It’s on December 25th.'], 0, '在日历信息中找出植树节对应的日期。', '日历写着 March 12th，所以植树节是3月12日。'),
      choose('A calendar says Children’s Day is on June 1st. Children’s Day is on ___.', ['June 1st', 'October 1st', 'September 10th'], 0, '根据句子里的日历信息补全日期。', '日历写着 Children’s Day is on June 1st。'),
      choose('In this calendar, Mother’s Day is on the second Sunday in May. When is Mother’s Day?', ['It’s on the second Sunday in May.', 'It’s on March 12th.', 'It’s on the first Monday in June.'], 0, '注意日历用五月里的第几个星期日表示日期。', '日历写着 Mother’s Day is on the second Sunday in May。'),
      pair('日历写着：New Year’s Day—January 1st；Teachers’ Day—September 10th；Christmas Day—December 25th。把特别的日子和对应日期连起来。', [['New Year’s Day', 'January 1st'], ['Teachers’ Day', 'September 10th'], ['Christmas Day', 'December 25th']], '先读日历中的对应信息，再完成连线。', '日历分别把元旦、教师节、圣诞节与 January 1st、September 10th、December 25th 对应起来。'),
      sortInto('把日期分到“月份中的固定日”或“月份中的星期”。', ['月份中的固定日', '月份中的星期'], [
        { label: 'October 1st', categoryIndex: 0 }, { label: 'July 5th', categoryIndex: 0 },
        { label: 'the second Sunday in May', categoryIndex: 1 }, { label: 'the third Sunday in June', categoryIndex: 1 },
      ], '有些节日用某月的几号表示，有些用某月的第几个星期几表示。', 'October 1st 和 July 5th 是固定日；母亲节和父亲节按星期表达。'),
      choose('“九月十日”用英语怎样写？', ['September 10th', 'October 1st', 'June 1st'], 0, '在教师节的日历信息中找到月份和日期。', '教师节日期是 September 10th。'),
      choose('Which sentence asks for a special day’s date?', ['When is National Day?', 'How are you going to celebrate it?', 'What do you do on that day?'], 0, '找出询问“什么时候”的问题。', 'When is National Day? 询问国庆节的日期；另外两句询问庆祝活动。'),
      arrange('把词卡排成“植树节在三月十二日。”', ['12th.', 'It’s', 'on', 'March'], [1, 2, 3, 0], '从 It’s 开始，再放介词和日期。', '完整表达为“It’s on March 12th.”'),
    ])),
    task('谈论特别日子的庆祝计划', '使用 be going to 说出准备和当天的活动，并把庆祝安排与节日相联系。', 'companion-02', q8([
      choose('Which question asks about a plan for a special day?', ['How are you going to celebrate it?', 'When is it?', 'What is your name?'], 0, '注意哪个问题询问“打算怎样庆祝”。', 'How are you going to celebrate it? 询问庆祝计划。'),
      choose('Children’s Day is coming. Which answer tells a plan?', ['I’m going to have a party.', 'It is on June 1st.', 'I like June.'], 0, 'be going to 后面接打算做的活动。', 'I’m going to have a party. 表达将要举行派对的计划。'),
      choose('On Tree Planting Day, children plant trees with their classmates. What can they do?', ['Plant trees with their classmates.', 'Clean the teachers’ office.', 'Eat only birthday cake.'], 0, '从题目给出的庆祝活动中找出孩子们能做的事。', '题目说明孩子们会和同学一起种树。'),
      pair('把活动和适合表达它的英文连起来。', [['制作海报', 'make a poster'], ['放风筝', 'fly a kite'], ['一起野餐', 'have a picnic']], '先认出动作，再匹配英文词组。', 'make a poster、fly a kite 和 have a picnic 分别表示制作海报、放风筝和野餐。'),
      sortInto('植树节前，同学们先读树木相关的书，再制作树木海报；节日当天，他们和同学一起种树，种完后放风筝。把安排分到“节日前准备”或“节日当天活动”。', ['节日前准备', '节日当天活动'], [
        { label: 'read some books about trees', categoryIndex: 0 }, { label: 'make a poster about trees', categoryIndex: 0 },
        { label: 'plant trees with classmates', categoryIndex: 1 }, { label: 'fly kites after planting', categoryIndex: 1 },
      ], '看活动发生在节日之前还是当天。', '读书、做海报是节日前准备；种树和之后放风筝是当天的安排。'),
      choose('Which sentence is correct?', ['We are going to plant trees.', 'We going to plant trees.', 'We are going plant trees.'], 0, 'be going to 结构需要 be 动词和动词原形。', 'We are going to plant trees. 中 are going to 后接动词原形 plant。'),
      choose('“我打算给妈妈买花。”可以怎样说？', ['I’m going to buy flowers for my mum.', 'I’m going to fly a tree for my mum.', 'I’m going to clean a kite for my mum.'], 0, '选择和中文动作相符的表达。', 'buy flowers for my mum 表示给妈妈买花。'),
      arrange('把词卡排成“我们打算做一张树木海报。”', ['a poster', 'We’re', 'about trees.', 'going to make'], [1, 3, 0, 2], '先放主语，再放 going to 和活动。', '完整表达为“We’re going to make a poster about trees.”'),
    ])),
  ],
  advancedTasks: [
    task('阅读不同节日的庆祝方式', '从题目给出的节日记录中提取节日、时间、人物和活动信息，并把有记录支持和未提及的说法分开。', 'companion-03', q8([
      choose('At a class New Year’s Eve party, the children plan to say hello to the new year at midnight. What do they plan to do?', ['Say hello to the new year at midnight.', 'Plant trees at school.', 'Clean the teachers’ office.'], 0, '题目已经给出跨年派对上的计划。', '题目说明孩子们计划在午夜向新的一年问好。'),
      choose('A class plans to play games and have fun on Children’s Day. What is the plan?', ['Play games and have fun.', 'Ask for candy in costumes.', 'Race dragon boats.'], 0, '根据题目给出的儿童节计划作答。', '题目说明这个班计划玩游戏、享受节日。'),
      choose('For a class Teachers’ Day event, children plan to say “thank you” to teachers and help clean the office. How can they show thanks?', ['Say “thank you” and help clean the office.', 'Make breakfast for every father.', 'Put Christmas trees in their homes.'], 0, '从题目给出的两个行动中找出表达感谢的方式。', '题目说明孩子们会向老师道谢并帮助打扫办公室。'),
      pair('一组活动记录：Father’s Day—make cards for fathers；Mother’s Day—make breakfast or help with chores；Christmas—give presents and put up a tree。把节日和庆祝活动连起来。', [['Father’s Day', 'make cards for fathers'], ['Mother’s Day', 'make breakfast or help with chores'], ['Christmas', 'give presents and put up a tree']], '根据活动记录逐项连线。', '活动记录分别列出了父亲节、母亲节和圣诞节的庆祝方式。'),
      sortInto('记录写着：Some children make cards for their fathers. Many families put up Christmas trees. 把信息分到“记录提到”或“记录没有提到”。', ['记录提到', '记录没有提到'], [
        { label: 'Some children make cards for their fathers.', categoryIndex: 0 }, { label: 'Many families put up Christmas trees.', categoryIndex: 0 },
        { label: 'Every family travels to another country on Christmas.', categoryIndex: 1 }, { label: 'Children never play games on Children’s Day.', categoryIndex: 1 },
      ], '只根据这两条记录分类，不要把“没有提到”理解成现实中一定不发生。', '记录提到了父亲节卡片和圣诞树；它没有说每个家庭都出国，也没有说孩子从不在儿童节玩游戏。'),
      choose('The Mother’s Day note says children can help their mothers do chores. Which detail belongs to that note?', ['Children can help their mothers do chores.', 'Children wear monster costumes.', 'People race boats in big boats.'], 0, '题目已经给出母亲节记录的内容。', '这条母亲节记录说孩子们可以帮妈妈做家务。'),
      arrange('整理阅读节日记录的步骤。', ['看清问题询问哪个节日或信息', '回到对应记录找日期和活动', '把人物、节日和活动对应起来', '检查答案有没有超出记录'], [0, 1, 2, 3], '先定位问题，再找依据并核对范围。', '按问题定位记录、提取对应信息，最后确认答案有记录依据。'),
      choose('A class note says many people put Christmas trees in their homes. What can you safely say?', ['Many people decorate their homes with Christmas trees.', 'Every person celebrates Christmas in the same way.', 'Christmas is always in summer everywhere.'], 0, '用记录支持的范围作概括，不把 many 改成 everyone。', 'many people 表示许多人；不能推成所有人或所有地方。'),
    ])),
    task('了解节日资料并辨认 tr、dr 拼写', '根据节日资料和月份信息回答问题，认读含 tr 与 dr 的常见单词。', 'companion-04', q8([
      choose('People eat zongzi at this special Chinese festival. Which festival is it?', ['The Dragon Boat Festival', 'Halloween', 'Christmas Day'], 0, '粽子是题目中辨认节日的线索。', '端午节是中国的特别节日，人们会吃粽子。'),
      choose('A calendar says Halloween is on October 31st. When is Halloween?', ['October 31st', 'January 1st', 'June 1st'], 0, '根据日历信息找到万圣节的日期。', '日历写着 Halloween is on October 31st。'),
      choose('Which word begins with the letters dr?', ['drink', 'train', 'tree'], 0, '观察每个单词开头的两个字母。', 'drink 以 dr 开头；train 和 tree 以 tr 开头。'),
      pair('把单词和中文意思连起来。', [['driver', '司机'], ['trip', '旅行'], ['dress', '连衣裙']], '依据熟悉的词义辨认拼写。', 'driver 是司机，trip 是旅行，dress 在这里指连衣裙。'),
      sortInto('把单词分到“以tr开头”或“以dr开头”。', ['以tr开头', '以dr开头'], [
        { label: 'tree', categoryIndex: 0 }, { label: 'travel', categoryIndex: 0 },
        { label: 'drive', categoryIndex: 1 }, { label: 'dry', categoryIndex: 1 },
      ], '逐个检查单词最开头的两个字母。', 'tree 和 travel 以 tr 开头；drive 和 dry 以 dr 开头。'),
      choose('A class note says some people race Dragon Boats as part of the Dragon Boat Festival celebration. Why do they race?', ['It is part of their Dragon Boat Festival celebration.', 'They are celebrating Halloween.', 'It is a way to celebrate Teachers’ Day.'], 0, '题目已经说明龙舟竞赛与端午节的关系。', '这条记录说龙舟竞赛是端午节庆祝活动的一部分。'),
      choose('On Halloween, children sometimes wear costumes like monsters or famous people. What do they sometimes wear?', ['Costumes like monsters or famous people.', 'School uniforms for Tree Planting Day.', 'Christmas trees.'], 0, '根据题目给出的万圣节装扮信息作答。', '题目说明孩子们有时会装扮成怪物或名人。'),
      arrange('按准备、核对、分享的顺序整理班级特别日历的步骤。', ['先写上年份、月份和日期', '接着填入自己知道的特别日子', '核对每个节日和日期是否对应', '确认无误后再和朋友分享日历'], [0, 1, 2, 3], '注意“先”“接着”和“确认无误后”等顺序提示。', '先写时间框架，再填写节日；核对无误后才分享日历。'),
    ])),
  ],
  highTasks: [
    task('设计班级特别日子计划', '综合日期表达和 be going to 结构，为特别日子安排活动并用清楚的问答交流。', 'companion-01', q8([
      choose('A class is planning for Tree Planting Day. Its calendar says the day is on March 12th. Which date should they write?', ['March 12th', 'July 5th', 'December 25th'], 0, '根据题目给出的班级日历确认日期。', '班级日历写着植树节是 March 12th。'),
      choose('Which reply correctly tells what your class plans to do?', ['We’re going to make a poster and plant trees.', 'We going plant a poster.', 'We are go to trees.'], 0, '主语 we 搭配 are going to，后面接两个活动。', 'We’re going to make a poster and plant trees. 语法和活动搭配都正确。'),
      pair('把交流问题和合适回答连起来。', [['When is Children’s Day?', 'It’s on June 1st.'], ['How are you going to celebrate it?', 'We’re going to have a party.'], ['What do you do on that day?', 'We often play games.']], '分别判断问题在问日期、计划还是通常活动。', '三个问题各自询问日期、将来计划和通常做法。'),
      choose('The class wants everyone to help with a celebration. Which plan gives students clear choices?', ['Some students make a poster, some bring flowers, and others prepare games.', 'One student does everything without telling the class.', 'Nobody knows what the plan is.'], 0, '清楚的分工能让每个人知道自己可以做什么。', '具体分工把海报、鲜花和游戏安排给不同同学。'),
      sortInto('把句子分到“日期信息”或“活动计划”。', ['日期信息', '活动计划'], [
        { label: 'It’s on the second Sunday in May.', categoryIndex: 0 }, { label: 'It’s on September 10th.', categoryIndex: 0 },
        { label: 'I’m going to buy flowers.', categoryIndex: 1 }, { label: 'We’re going to sing and dance.', categoryIndex: 1 },
      ], '日期回答说明什么时候，计划回答说明打算做什么。', '前两句回答日期；后两句说明庆祝活动计划。'),
      choose('Which sentence uses an ordinal date correctly?', ['My birthday is on July 5th.', 'My birthday is on July five.', 'My birthday is in July 5th.'], 0, '日期中使用序数词，并搭配 on。', 'July 5th 是正确的日期写法，具体日期前用 on。'),
      arrange('整理一次关于节日计划的对话。', ['When is Children’s Day?', 'It’s on June 1st.', 'How are you going to celebrate it?', 'We’re going to go to the park.'], [0, 1, 2, 3], '先问日期并回答，再询问庆祝计划。', '先确认日子，再交流准备做的活动。'),
      choose('A friend suggests an activity but the class calendar already shows a different plan. What is a helpful reply?', ['Let’s check the calendar and agree on one plan together.', 'Ignore the calendar and change the date.', 'Tell your friend that their idea is silly.'], 0, '交流时可以核对信息并一起商量。', '查看日历并协商能尊重同伴，也能保持计划清楚。'),
    ])),
    task('复述母亲节故事并解释人物感受', '按故事顺序复述 Mary 的准备和庆祝活动，并用情节线索理解人物感受。', 'companion-02', q8([
      choose('Mary hopes her mother will enjoy a special day on Mother’s Day. What does Mary want to do?', ['Make the day special for her mother.', 'Buy a new school.', 'Plant trees in the bedroom.'], 0, '题目已经给出 Mary 的母亲节心愿。', 'Mary 想让妈妈在母亲节过得特别而开心。'),
      choose('Mary wakes up at 5 o’clock on Sunday morning. What time does she wake up?', ['At 5 o’clock.', 'At 8 o’clock.', 'At 12 o’clock.'], 0, '根据题目给出的故事信息作答。', '题目说明 Mary 在星期天早上5点起床。'),
      choose('Before she wakes her mother, Mary makes paper flowers and a card. What does she make?', ['Paper flowers and a card.', 'A dragon boat and a calendar.', 'A Christmas tree and a costume.'], 0, '题目已经给出 Mary 准备的手工作品。', '题目说明 Mary 先做了纸花和一张卡片。'),
      pair('把故事中的行动和对象连起来。', [['make paper flowers', 'for her mother'], ['cook eggs for breakfast', 'because her mother likes eggs'], ['say “Happy Mother’s Day!”', 'when she wakes her mother']], '留意每个行动的对象和故事中的理由。', '纸花送给妈妈，早餐按妈妈喜好准备，问候发生在叫醒妈妈时。'),
      sortInto('把事情分到“Mary做的事”或“妈妈的反应”。', ['Mary做的事', '妈妈的反应'], [
        { label: 'She makes a card.', categoryIndex: 0 }, { label: 'She cooks breakfast.', categoryIndex: 0 },
        { label: 'She starts to cry.', categoryIndex: 1 }, { label: 'She is happy because Mary loves her.', categoryIndex: 1 },
      ], '区分故事主人公的行动和妈妈的情绪反应。', '做卡片、做早餐是 Mary 的行动；流泪和开心是妈妈的反应。'),
      choose('Mary’s mother cries because she is happy and knows Mary loves her. Why does she cry at the end?', ['She is happy and knows Mary loves her.', 'She does not like Mary’s flowers.', 'She is angry about the breakfast.'], 0, '题目已经提供故事结尾的原因。', '妈妈知道 Mary 爱她，所以感动、开心地流泪。'),
      arrange('整理 Mary 为妈妈准备母亲节的过程。', ['Mary gets up early.', 'She makes flowers and a card.', 'She cooks breakfast and wakes her mother.', 'Her mother feels happy and they hug.'], [0, 1, 2, 3], '按起床、准备礼物、庆祝和结尾排列。', 'Mary 早起准备礼物和早餐，叫醒妈妈后，故事以母女相拥结束。'),
      choose('Mary worries when her mother starts to cry. What should a reader do before deciding why?', ['Read the next part for more information.', 'Stop reading at the first sentence.', 'Guess that every tear means sadness.'], 0, '故事后文会解释妈妈为什么流泪。', '读完后文才能知道妈妈是开心流泪，不能只凭最初猜测。'),
    ])),
  ],
});
