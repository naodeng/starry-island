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
      choose('When is Tree Planting Day?', ['It’s on March 12th.', 'It’s on July 5th.', 'It’s on December 25th.'], 0, '查找课本日历上植树节旁的日期。', '植树节是3月12日，英文写作 March 12th。'),
      choose('Children’s Day is on ___.', ['June 1st', 'October 1st', 'September 10th'], 0, '六月的第一天是儿童节。', 'Children’s Day is on June 1st.'),
      choose('When is Mother’s Day in the unit?', ['It’s on the second Sunday in May.', 'It’s on March 12th.', 'It’s on the first Monday in June.'], 0, '注意这个节日按五月里的星期来表达日期。', '课本用 the second Sunday in May 表达母亲节日期。'),
      pair('把特别的日子和对应日期连起来。', [['New Year’s Day', 'January 1st'], ['Teachers’ Day', 'September 10th'], ['Christmas Day', 'December 25th']], '先读节日名称，再核对日历日期。', '元旦是一月一日，教师节是九月十日，圣诞节是十二月二十五日。'),
      sortInto('把日期分到“月份中的固定日”或“月份中的星期”。', ['月份中的固定日', '月份中的星期'], [
        { label: 'October 1st', categoryIndex: 0 }, { label: 'July 5th', categoryIndex: 0 },
        { label: 'the second Sunday in May', categoryIndex: 1 }, { label: 'the third Sunday in June', categoryIndex: 1 },
      ], '有些节日用某月的几号表示，有些用某月的第几个星期几表示。', 'October 1st 和 July 5th 是固定日；母亲节和父亲节按星期表达。'),
      choose('“九月十日”用英语怎样写？', ['September 10th', 'October 1st', 'June 1st'], 0, '在教师节的日历信息中找到月份和日期。', '教师节日期是 September 10th。'),
      choose('Which sentence asks for a special day’s date?', ['When is National Day?', 'How are you going to celebrate it?', 'What do you do on that day?'], 0, '找出询问“什么时候”的问题。', 'When is National Day? 询问国庆节的日期；另外两句询问庆祝活动。'),
      arrange('把词卡排成“植树节在三月十二日。”', ['12th.', 'It’s', 'on', 'March'], [1, 2, 3, 0], '从 It’s 开始，再放介词和日期。', '完整表达是 It’s on March 12th.。'),
    ])),
    task('谈论特别日子的庆祝计划', '使用 be going to 说出准备和当天的活动，并把庆祝安排与节日相联系。', 'companion-02', q8([
      choose('Which question asks about a plan for a special day?', ['How are you going to celebrate it?', 'When is it?', 'What is your name?'], 0, '注意哪个问题询问“打算怎样庆祝”。', 'How are you going to celebrate it? 询问庆祝计划。'),
      choose('Children’s Day is coming. Which answer tells a plan?', ['I’m going to have a party.', 'It is on June 1st.', 'I like June.'], 0, 'be going to 后面接打算做的活动。', 'I’m going to have a party. 表达将要举行派对的计划。'),
      choose('What can children do on Tree Planting Day?', ['Plant trees with their classmates.', 'Clean the teachers’ office.', 'Eat only birthday cake.'], 0, '把植树节和课本中的庆祝活动联系起来。', '课本提到孩子们会和同学一起种树。'),
      pair('把活动和适合表达它的英文连起来。', [['制作海报', 'make a poster'], ['放风筝', 'fly a kite'], ['一起野餐', 'have a picnic']], '先认出动作，再匹配英文词组。', 'make a poster、fly a kite 和 have a picnic 分别表示制作海报、放风筝和野餐。'),
      sortInto('把安排分到“节日前准备”或“节日当天活动”。', ['节日前准备', '节日当天活动'], [
        { label: 'read some books about trees', categoryIndex: 0 }, { label: 'make a poster about trees', categoryIndex: 0 },
        { label: 'plant trees with classmates', categoryIndex: 1 }, { label: 'fly kites after planting', categoryIndex: 1 },
      ], '看活动发生在节日之前还是当天。', '读书、做海报是节日前准备；种树和之后放风筝是当天的安排。'),
      choose('Which sentence is correct?', ['We are going to plant trees.', 'We going to plant trees.', 'We are going plant trees.'], 0, 'be going to 结构需要 be 动词和动词原形。', 'We are going to plant trees. 中 are going to 后接动词原形 plant。'),
      choose('“我打算给妈妈买花。”可以怎样说？', ['I’m going to buy flowers for my mum.', 'I’m going to fly a tree for my mum.', 'I’m going to clean a kite for my mum.'], 0, '选择和中文动作相符的表达。', 'buy flowers for my mum 表示给妈妈买花。'),
      arrange('把词卡排成“我们打算做一张树木海报。”', ['a poster', 'We’re', 'about trees.', 'going to make'], [1, 3, 0, 2], '先放主语，再放 going to 和活动。', '完整句子是 We’re going to make a poster about trees.。'),
    ])),
  ],
  advancedTasks: [
    task('阅读不同节日的庆祝方式', '从短文中提取节日、时间、人物和活动信息，并将事实与无依据的说法区分开。', 'companion-03', q8([
      choose('What do people do together when New Year’s Day begins?', ['They say hello to the new year at 12 o’clock.', 'They plant trees at school.', 'They clean the teachers’ office.'], 0, '短文提到派对从前一天开始，并说明午夜时做什么。', '人们在12点一起向新的一年问好。'),
      choose('What do many children do on Children’s Day?', ['Play games and have fun.', 'Ask for candy in costumes.', 'Race dragon boats.'], 0, '把节日和短文中介绍的儿童活动对应起来。', '短文说孩子们喜欢玩游戏、享受节日。'),
      choose('How can children show thanks to teachers on Teachers’ Day?', ['Say “thank you” and help clean the office.', 'Make breakfast for every father.', 'Put Christmas trees in their homes.'], 0, '找教师节段落中出现的两个行动。', '短文提到孩子们向老师道谢，也帮助打扫教师办公室。'),
      pair('把节日和短文中的庆祝活动连起来。', [['Father’s Day', 'make cards for fathers'], ['Mother’s Day', 'make breakfast or help with chores'], ['Christmas', 'give presents and put up a tree']], '用段落里的节日名称找对应活动。', '三个段落分别介绍父亲节、母亲节和圣诞节的家庭活动。'),
      sortInto('把信息分到“短文支持”或“短文没有说明”。', ['短文支持', '短文没有说明'], [
        { label: 'Some children make cards for their fathers.', categoryIndex: 0 }, { label: 'Many families put up Christmas trees.', categoryIndex: 0 },
        { label: 'Every family travels to another country on Christmas.', categoryIndex: 1 }, { label: 'Children never play games on Children’s Day.', categoryIndex: 1 },
      ], '只把短文明确提供或合理概括的信息放在有依据的一边。', '卡片和圣诞树都在短文中提到；另外两句把没有说的事情说成了绝对事实。'),
      choose('Which detail belongs to the Mother’s Day paragraph?', ['Children can help their mothers do chores.', 'Children wear monster costumes.', 'People race boats in big boats.'], 0, '按节日名称定位对应段落。', '短文说孩子们可以在母亲节帮妈妈做家务。'),
      arrange('整理阅读节日短文的步骤。', ['看清问题询问哪个节日或信息', '回到对应段落找日期和活动', '把人物、节日和活动对应起来', '检查答案有没有超出短文'], [0, 1, 2, 3], '先定位问题，再找依据并核对范围。', '按问题定位段落、提取对应信息，最后确认答案有文本依据。'),
      choose('The passage says many people put Christmas trees in their homes. What can you safely say?', ['Many people decorate their homes with Christmas trees.', 'Every person celebrates Christmas in the same way.', 'Christmas is always in summer everywhere.'], 0, '用短文支持的范围作概括，不把 many 改成 everyone。', 'many people 表示许多人；不能推成所有人或所有地方。'),
    ])),
    task('了解节日资料并辨认 tr、dr 拼写', '根据节日资料和月份信息回答问题，认读含 tr 与 dr 的常见单词。', 'companion-04', q8([
      choose('Which festival is described as a special Chinese festival when people eat zongzi?', ['The Dragon Boat Festival', 'Halloween', 'Christmas Day'], 0, '找出端午节资料中的食物和活动线索。', '端午节是中国的特别节日，人们会吃粽子，有些地方举行龙舟赛。'),
      choose('When is Halloween in the book?', ['October 31st', 'January 1st', 'June 1st'], 0, '查找万圣节短文中的日期。', '书中介绍万圣节在每年的 October 31st。'),
      choose('Which word begins with the letters dr?', ['drink', 'train', 'tree'], 0, '观察每个单词开头的两个字母。', 'drink 以 dr 开头；train 和 tree 以 tr 开头。'),
      pair('把单词和中文意思连起来。', [['driver', '司机'], ['trip', '旅行'], ['dress', '连衣裙；穿衣']], '依据熟悉的词义辨认拼写。', 'driver 是司机，trip 是旅行，dress 可表示连衣裙或穿衣。'),
      sortInto('把单词分到“以tr开头”或“以dr开头”。', ['以tr开头', '以dr开头'], [
        { label: 'tree', categoryIndex: 0 }, { label: 'travel', categoryIndex: 0 },
        { label: 'drive', categoryIndex: 1 }, { label: 'dry', categoryIndex: 1 },
      ], '逐个检查单词最开头的两个字母。', 'tree 和 travel 以 tr 开头；drive 和 dry 以 dr 开头。'),
      choose('Why do some people in southern China race Dragon Boats?', ['It is part of their Dragon Boat Festival celebration.', 'They are celebrating Halloween.', 'It is a way to celebrate Teachers’ Day.'], 0, '把龙舟比赛和端午节的介绍对应起来。', '短文说中国南方有些地方会在端午节举行龙舟赛。'),
      choose('What do children sometimes wear on Halloween?', ['Costumes like monsters or famous people.', 'School uniforms for Tree Planting Day.', 'Christmas trees.'], 0, '留意万圣节装扮的例子。', '短文说孩子们会穿成怪物或名人的样子。'),
      arrange('准备一张包含特别日子的班级日历。', ['写上年份、月份和日期', '填入自己知道的特别日子', '和朋友分享并比较日历', '检查节日和日期是否对应'], [0, 1, 2, 3], '先画出时间框架，再填写、分享和检查。', '先写年份月份日期，再填节日并与朋友交流，最后核对信息。'),
    ])),
  ],
  highTasks: [
    task('设计班级特别日子计划', '综合日期表达和 be going to 结构，为特别日子安排活动并用清楚的问答交流。', 'companion-01', q8([
      choose('A class is planning for Tree Planting Day. Which date should they write on the calendar?', ['March 12th', 'July 5th', 'December 25th'], 0, '先确定节日，再选它对应的日期。', '植树节是 March 12th。'),
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
      choose('What does Mary want to do for her mother?', ['Give her mother a special day.', 'Buy a new school.', 'Plant trees in the bedroom.'], 0, '故事开头写 Mary 想为妈妈准备什么。', 'Mary 很爱妈妈，想让妈妈过一个特别的母亲节。'),
      choose('What time does Mary wake up on Sunday morning?', ['At 5 o’clock.', 'At 8 o’clock.', 'At 12 o’clock.'], 0, '找到故事中 Mary 一早起床的时间。', 'Mary 在星期天早上5点起床准备活动。'),
      choose('What does Mary make before she wakes her mother?', ['Paper flowers and a card.', 'A dragon boat and a calendar.', 'A Christmas tree and a costume.'], 0, '回想她准备的两样手工作品。', '她先做了纸花，又制作了一张卡片。'),
      pair('把故事中的行动和对象连起来。', [['make paper flowers', 'for her mother'], ['cook eggs for breakfast', 'because her mother likes eggs'], ['say “Happy Mother’s Day!”', 'when she wakes her mother']], '留意每个行动的对象和故事中的理由。', '纸花送给妈妈，早餐按妈妈喜好准备，问候发生在叫醒妈妈时。'),
      sortInto('把事情分到“Mary做的事”或“妈妈的反应”。', ['Mary做的事', '妈妈的反应'], [
        { label: 'She makes a card.', categoryIndex: 0 }, { label: 'She cooks breakfast.', categoryIndex: 0 },
        { label: 'She starts to cry.', categoryIndex: 1 }, { label: 'She is happy because Mary loves her.', categoryIndex: 1 },
      ], '区分故事主人公的行动和妈妈的情绪反应。', '做卡片、做早餐是 Mary 的行动；流泪和开心是妈妈的反应。'),
      choose('Why does Mary’s mother cry at the end?', ['She is happy and knows Mary loves her.', 'She does not like Mary’s flowers.', 'She is angry about the breakfast.'], 0, '继续读下去，找到 Mary 担心之后的解释。', '妈妈是因为感动和开心而流泪，她知道 Mary 爱她。'),
      arrange('整理 Mary 为妈妈准备母亲节的过程。', ['Mary gets up early.', 'She makes flowers and a card.', 'She cooks breakfast and wakes her mother.', 'Her mother feels happy and they hug.'], [0, 1, 2, 3], '按起床、准备礼物、庆祝和结尾排列。', 'Mary 早起准备礼物和早餐，叫醒妈妈后，故事以母女相拥结束。'),
      choose('Mary worries when her mother starts to cry. What should a reader do before deciding why?', ['Read the next part for more information.', 'Stop reading at the first sentence.', 'Guess that every tear means sadness.'], 0, '故事后文会解释妈妈为什么流泪。', '读完后文才能知道妈妈是开心流泪，不能只凭最初猜测。'),
    ])),
  ],
});
