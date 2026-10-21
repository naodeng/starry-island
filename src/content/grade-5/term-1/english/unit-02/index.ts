import { buildEnglishUnit } from '../../../../grade-2/term-1/english/buildEnglishUnit';
import { arrange, choose, pair, q8, sortInto } from '../../../../grade-2/term-1/english/questionAuthoring';
import type { EightEnglishQuestions, EnglishTaskSpec } from '../../../../grade-2/term-1/english/questionAuthoring';

// 核对固定 TapX 快照：英语五年级上册目录 PDF 第6页；U2 印刷页14–25（PDF页19–30）。
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
  formalUnitNumber: 2,
  entryId: 'unit-02',
  title: 'Unit 2 · Teachers',
  sourceTopics: [
    '询问并介绍教师所教的学科：What does he/she teach? He/She teaches ...',
    '询问教师的外貌和特点：What does he/she look like? What is he/she like?；使用 tall、short、slim、curly、straight、young、nice、pretty、handsome、kind、funny、active 等词描述人物',
    '结合衣着、发型、眼镜、教学学科、兴趣和具体行为辨认教师，区分外貌信息与性格信息',
    '阅读 Tim 的邮件、Albert 的教师资料表，提取 Ms Green、Mr White、Mrs Smith、Mrs Young、Mr Cooper 和 John Hart 的教学学科与特点',
    'Let’s Spell：辨认 brown、bread、price、princess、crayon、cry、green、grass、fruit 和 friends 中的 br、pr、cr、gr、fr 字母组合',
    'Fun Time：了解加拿大班级与校园日常信息，包括班级人数、课堂环境和午餐时间',
    'Story Time：按顺序理解 Miss Kitty 缺席、Mrs Tiger 接班、学生改变行为及 Miss Kitty 回来的故事',
  ],
  basicTasks: [
    questionTask('认读教师外貌与特点词', '理解常见外貌和性格词的含义，并从人物资料中找到相符的信息。', 'companion-01', q8([
      choose('Which word describes hair with curls?', ['curly', 'young', 'kind'], 0, '找一个用来描述头发形状的词。', 'curly 表示卷曲的，可以描述头发。'),
      choose('Mrs Wu has long curly hair. Which detail tells us about her hair?', ['It is long and curly.', 'She teaches maths.', 'She is funny.'], 0, '选择直接描述头发外形的内容。', 'long 和 curly 都描述 Mrs Wu 的头发。'),
      choose('John Hart often wears jeans. What kind of information is this?', ['clothes', 'school subject', 'personality'], 0, 'jeans 是穿在身上的衣物。', 'wears jeans 介绍 John 的穿着，不是学科或性格。'),
      pair('把词语和相符的信息连起来。', [
        ['slim', '身材较瘦'],
        ['young', '年纪较轻'],
        ['funny', '有趣、好笑'],
      ], '判断词语说的是身材、年龄还是给人的感觉。', 'slim 描述身材，young 描述年龄，funny 描述有趣的特点。'),
      sortInto('把信息分到“外貌或穿着”与“性格或表现”。', ['外貌或穿着', '性格或表现'], [
        { label: 'short and slim', categoryIndex: 0 }, { label: 'wears glasses', categoryIndex: 0 },
        { label: 'kind and funny', categoryIndex: 1 }, { label: 'often tells stories', categoryIndex: 1 },
      ], '想一想这些信息能不能从一个人的外形或穿着直接看出来。', '身材和眼镜属于外貌或穿着；待人特点和课堂行为属于性格或表现。'),
      choose('Choose the correct sentence.', ['He wears glasses.', 'He wear glasses.', 'He is wear glasses.'], 0, '主语是 he 时，注意一般现在时动词的形式。', 'He wears glasses. 中 wears 与 he 搭配正确。'),
      choose('Mrs Li is short and has ___ hair.', ['short', 'kind', 'maths'], 0, '选择能描述头发长度的词。', 'short hair 表示短发；kind 描述性格，maths 是学科。'),
      arrange('把词卡排成“赵老师戴眼镜。”', ['glasses.', 'Mr Zhao', 'wears'], [1, 2, 0], '先放人物，再放动作和物品。', '完整句子是 Mr Zhao wears glasses.。'),
    ])),
    questionTask('询问教师所教的学科', '使用 What does ... teach? 询问学科，并用 teaches 回答；辨认人物资料中的学科信息。', 'companion-02', q8([
      choose('The textbook profile says Mrs Wu teaches English. What does Mrs Wu teach?', ['She teaches English.', 'She is short.', 'She has curly hair.'], 0, '选择回答学科的问题。', '资料说 Mrs Wu 教英语，She teaches English. 回答了学科问题。'),
      choose('The textbook profile says Mr Zhao is a maths teacher. What does Mr Zhao teach?', ['He teaches maths.', 'He is wearing a blue T-shirt.', 'He has short hair.'], 0, '从题干给出的教师资料中找出他教的科目。', 'Mr Zhao 教数学，He teaches maths. 回答了学科问题。'),
      pair('资料说 Mrs Li 教语文、Mr Zhu 教音乐、Ms Green 教英语。把问题和合适的回答连起来。', [
        ['What does Mrs Li teach?', 'She teaches Chinese.'],
        ['What does Mr Zhu teach?', 'He teaches music.'],
        ['What does Ms Green teach?', 'She teaches English.'],
      ], '先认出每位教师，再把问题与学科回答对应。', 'Mrs Li 教语文，Mr Zhu 教音乐，Ms Green 教英语。'),
      choose('Which sentence has the correct subject and verb?', ['She teaches Chinese.', 'She teach Chinese.', 'She teaches is Chinese.'], 0, '单数主语 she 后的 teach 要使用正确形式。', 'She teaches Chinese. 语法正确，teaches 表示她教。'),
      arrange('把词卡排成“朱老师教什么？”', ['What', 'does', 'Mr Zhu', 'teach?'], [0, 1, 2, 3], '疑问词放在句首，接 does 和人物，再放动词和问号。', '完整问句是 What does Mr Zhu teach?。'),
      sortInto('把句子分到“询问学科”或“回答学科”。', ['询问学科', '回答学科'], [
        { label: 'What does he teach?', categoryIndex: 0 }, { label: 'What does Mrs Li teach?', categoryIndex: 0 },
        { label: 'He teaches maths.', categoryIndex: 1 }, { label: 'She teaches Chinese.', categoryIndex: 1 },
      ], '看句子是在提问，还是告诉别人教师所教的科目。', 'What does ... teach? 是询问；He/She teaches ... 是回答。'),
      choose('Which question asks about Mrs Li’s character or general qualities?', ['What is Mrs Li like?', 'What does Mrs Li teach?', 'Where is Mrs Li?'], 0, '找出询问“她是什么样的人”的问题。', 'What is ... like? 询问人物特点；另外两项分别询问学科和地点。'),
      choose('Yaoyao says, “Mrs Li teaches Chinese and tells interesting stories.” Which subject does Mrs Li teach?', ['Mrs Li teaches Chinese.', 'Mrs Li teaches PE.', 'Mrs Li teaches art.'], 0, '从 Yaoyao 的话中找出 Mrs Li 所教的科目。', 'Yaoyao 说 Mrs Li 教语文，也会讲有趣的故事。'),
    ])),
  ],
  advancedTasks: [
    questionTask('从邮件中整理教师资料', '阅读多位教师的介绍，提取姓名、学科、外貌和擅长的事情，并用信息支持判断。', 'companion-03', q8([
      choose('Tim writes, “Ms Green is my favourite teacher.” Who is Tim’s favourite teacher?', ['Ms Green', 'Mr White', 'Mrs Smith'], 0, '在邮件中找出 Tim 明确表达最喜欢的教师。', 'Tim 说 Ms Green 是他最喜欢的老师。'),
      pair('Tim’s email says Ms Green teaches English and often sings songs; Mr White teaches art and draws animals well; Mrs Smith teaches music and plays the piano well. Match each teacher with the information.', [
        ['Ms Green', 'teaches English and often sings songs'],
        ['Mr White', 'teaches art and draws animals well'],
        ['Mrs Smith', 'teaches music and plays the piano well'],
      ], '每位教师都有不同的学科与特长线索。', '邮件分别说明 Ms Green 教英语、Mr White 教美术、Mrs Smith 教音乐。'),
      sortInto('把邮件信息分到“外貌”或“教学与特长”。', ['外貌', '教学与特长'], [
        { label: 'Ms Green is tall and slim.', categoryIndex: 0 }, { label: 'Mr White wears glasses.', categoryIndex: 0 },
        { label: 'Mrs Smith can play the piano well.', categoryIndex: 1 }, { label: 'Mr White is good at drawing animals.', categoryIndex: 1 },
      ], '先区分能看到的外形线索与工作或技能信息。', '身材和眼镜描述外貌；教音乐、弹钢琴或画动物描述教学与特长。'),
      choose('What is the clearest evidence that Mr White is good at drawing?', ['He draws animals well.', 'He wears glasses.', 'He is not very tall.'], 0, '选择与画画能力直接相关的句子。', '邮件明确说 Mr White 擅长画动物，这能直接支持他的绘画能力。'),
      choose('Tim’s email says Mr White teaches art and draws animals well. Which sentence is supported by this information?', ['Mr White teaches art.', 'Mr White teaches science.', 'Mr White is Mrs Smith’s brother.'], 0, '只选择题干明确提供的信息。', '题干说 Mr White 教美术；没有提到他教科学或与 Mrs Smith 的亲属关系。'),
      choose('Tim’s email says Mrs Smith teaches music and plays the piano well. Which introduction matches her?', ['She teaches music and can play the piano well.', 'She teaches English and often sings in class.', 'She teaches art and draws animals.'], 0, '把姓名与她的教学学科和技能配对。', 'Mrs Smith 教音乐，并且钢琴弹得很好。'),
      choose('Tim says Ms Green is tall and slim and has long curly hair. Which detail is not included in that description?', ['She has short brown hair.', 'She is tall.', 'She has long curly hair.'], 0, '核对题干列出的每一项资料。', '题干说 Ms Green 身材高瘦、留长卷发，没有说她留短棕发。'),
      arrange('整理一段介绍 Mrs Smith 的资料。', [
        'She can play the piano very well.',
        'Mrs Smith is Tim’s music teacher.',
        'She has small eyes and short hair.',
        'These details tell us about her work and appearance.',
      ], [1, 2, 0, 3], '先介绍人物和学科，再补充外貌与技能。', '先说明 Mrs Smith 是音乐老师，再介绍外貌、钢琴技能，最后概括资料类别。'),
    ])),
    questionTask('阅读教师表格与校园资料', '从 Albert 的教师资料和加拿大校园短文中找证据，比较教师特点并避免无依据推断。', 'companion-04', q8([
      choose('Albert writes, “John Hart is my favourite teacher. He teaches maths and is kind and funny.” Why does Albert like John Hart?', ['He teaches maths and is kind and funny.', 'He teaches PE and is very strong.', 'He teaches English and often tells stories.'], 0, '根据 Albert 在题干中给出的理由作答。', 'Albert 说 John 教数学、待人友善又有趣。'),
      pair('Albert’s teacher profiles say Mrs Young teaches English, Mr Cooper teaches PE and John Hart teaches maths. Match each teacher with their subject.', [
        ['Mrs Young', 'English'],
        ['Mr Cooper', 'PE'],
        ['John Hart', 'maths'],
      ], '逐段查看 Albert 学校教师的介绍。', 'Mrs Young 教英语，Mr Cooper 教体育，John Hart 教数学。'),
      choose('Which detail about Mrs Young describes her appearance?', ['She has long, brown, curly hair.', 'She often tells stories in class.', 'She teaches English.'], 0, '选择能描述她外形的细节。', '长、棕色、卷曲的头发是外貌信息；讲故事和教英语说明她的课堂活动与工作。'),
      choose('What supports the description “Mr Cooper is active”?', ['He often plays sports with his students after school.', 'He has short grey hair.', 'He wears jeans.'], 0, '选择能体现积极参加活动的行为。', '放学后经常和学生一起运动，是 active 的具体行为线索。'),
      choose('Fun Time says, “There are 25 students in the Canadian class.” How many students are in the class?', ['25', '12', '50'], 0, '从题干给出的 Fun Time 资料中找出班级人数。', '题干说班里有25名学生。'),
      choose('Fun Time says, “The students often have lunch at 12 o’clock.” When do they often have lunch?', ['At 12 o’clock.', 'At 9 o’clock.', 'At 3 o’clock.'], 0, '从题干给出的校园日常资料中找午餐时间。', '题干说学生经常在12点吃午餐。'),
      sortInto('Fun Time says Miss Black teaches English, maths and art; the Canadian class has 25 students; the classroom has toys and books. Sort each statement into “stated” or “not provided”.', ['明确说了', '没有提供'], [
        { label: 'Miss Black teaches English, maths and art.', categoryIndex: 0 }, { label: 'The Canadian class has 25 students.', categoryIndex: 0 },
        { label: 'Every student lives beside the school.', categoryIndex: 1 }, { label: 'The classroom has toys and books.', categoryIndex: 0 },
      ], '只依据 Fun Time 的文字内容判断。', '教师教三门学科、班级人数和教室用品都有文字依据；学生住在哪里没有提到。'),
      choose('Albert’s profiles say Mr Cooper teaches PE and John Hart teaches maths. Which comparison uses only this information?', ['Mr Cooper teaches PE, while John Hart teaches maths.', 'Mrs Young is older than every teacher.', 'John Hart never wears jeans.'], 0, '选择题干中两个都有依据的事实。', '题干列出 Mr Cooper 教体育、John Hart 教数学，没有提供教师年龄比较或 John 的穿着习惯。'),
    ])),
  ],
  highTasks: [
    questionTask('理解 Miss Kitty 的故事变化', '按事件先后理解故事，比较两位教师的行为，并说明学生从经历中作出的改变。', 'companion-01', q8([
      choose('In the story, Miss Kitty is nice, young and funny. What is she like at the beginning?', ['She is nice, young and funny.', 'She is unfriendly and shouts.', 'She is very naughty.'], 0, '根据题干给出的故事介绍作答。', '题干说明 Miss Kitty 是一位 nice、young and funny 的老师。'),
      choose('In the story, Mrs Tiger shouts when students cannot answer or are not quiet. Why do the students feel sad when she teaches them?', ['She shouts when they cannot answer or are not quiet.', 'She asks them to play outside.', 'She tells them funny stories.'], 0, '根据题干给出的 Mrs Tiger 课堂表现作答。', '题干说明 Mrs Tiger 会因为学生答不出问题或不够安静而大喊。'),
      pair('Story facts: Miss Kitty returns after the students promise to study hard; Mrs Tiger shouts when students cannot answer; the students promise to listen and be good. Match each character with an event.', [
        ['Miss Kitty', 'comes back after the students promise to study hard'],
        ['Mrs Tiger', 'shouts when students cannot answer'],
        ['The students', 'say they will listen and be good'],
      ], '按故事人物回忆他们各自做了什么。', '学生承诺改变后，Miss Kitty 回来了；Mrs Tiger 会大喊；学生说会认真听课。'),
      sortInto('In the story, the students are naughty in Miss Kitty’s class. She is absent, and Mrs Tiger comes to teach. Later, the students study and listen, and Miss Kitty returns. Sort the events into “before Mrs Tiger arrives” or “after Miss Kitty returns”.', ['Mrs Tiger 到来前', 'Miss Kitty 回来后'], [
        { label: 'The students are naughty in Miss Kitty’s class.', categoryIndex: 0 }, { label: 'Miss Kitty does not come to school.', categoryIndex: 0 },
        { label: 'The students study hard and listen in class.', categoryIndex: 1 }, { label: 'Miss Kitty comes back to school.', categoryIndex: 1 },
      ], '先想故事前半段的问题，再看学生承诺改变后的结果。', '学生在 Miss Kitty 班里淘气、她缺席发生在前面；她回来后学生答应认真学习和听讲。'),
      arrange('In the story, the students are naughty first. Miss Kitty is absent and Mrs Tiger teaches them. They ask for Miss Kitty to return, then she comes back after they promise to study hard. Put these events in order.', [
        'The students ask for Miss Kitty to come back.',
        'Miss Kitty is absent and Mrs Tiger comes to teach.',
        'The students are naughty in Miss Kitty’s class.',
        'Miss Kitty returns, and the students promise to study hard.',
      ], [2, 1, 0, 3], '先排出故事开始时的课堂情况，再放缺席、请求和结尾。', '故事先写学生淘气，然后 Miss Kitty 缺席、Mrs Tiger 来上课，最后学生请求 Miss Kitty 回来并答应努力学习。'),
      choose('In the story, after Mrs Tiger teaches them, the students ask Miss Kitty to return. What do they promise?', ['They will be good, listen and study hard.', 'They will shout and throw paper.', 'They will stop coming to school.'], 0, '选择题干中情节之后，学生亲口作出的承诺。', '学生承诺会表现好、认真听讲并努力学习。'),
      choose('In the story, the students promise to be good, listen and study hard. What happens next?', ['Miss Kitty comes back, and the students say they will listen.', 'Mrs Tiger becomes their favourite teacher.', 'The students leave the school.'], 0, '根据题干给出的承诺和故事结尾作答。', '学生作出承诺后，Miss Kitty 回来，他们表示会认真学习和听讲。'),
      arrange('按事件线索整理故事复述。', [
        'Then a different teacher comes, and the students feel sad.',
        'First, introduce Miss Kitty and describe the class behaviour.',
        'Finally, tell what the students promise and what happens next.',
        'Next, explain that Miss Kitty is absent from school.',
      ], [1, 3, 0, 2], '用 First、Next、Then、Finally 连接主要事件。', '复述先介绍人物和课堂情况，再说 Miss Kitty 缺席、Mrs Tiger 到来，最后讲学生的承诺与结局。'),
    ])),
    questionTask('综合组织一段教师介绍', '综合使用姓名、学科、外貌、特点和具体行为介绍教师，选择有依据的信息并安排清晰顺序。', 'companion-03', q8([
      sortInto('把介绍教师时可以询问的内容分到“人物资料”或“故事顺序”。', ['人物资料', '故事顺序'], [
        { label: 'What is his/her name?', categoryIndex: 0 }, { label: 'What does he/she teach?', categoryIndex: 0 },
        { label: 'What does he/she look like?', categoryIndex: 0 }, { label: 'Which event happened first?', categoryIndex: 1 },
      ], '这部分写作是介绍一位教师，不是复述故事。', '姓名、学科和外貌是教师介绍资料；先后顺序属于复述故事的线索。'),
      pair('把问题和它要收集的信息连起来。', [
        ['What does he teach?', 'his school subject'],
        ['What does she look like?', 'her appearance'],
        ['What is he like?', 'his general qualities'],
      ], '注意 teach、look like 和 be like 分别询问什么。', 'teach 询问学科，look like 询问外貌，be like 询问人物特点。'),
      choose('Which introduction gives a clear example to support a teacher’s quality?', ['Mr Cooper is active. He often plays sports with his students.', 'Mr Cooper is active because he wears jeans.', 'Mr Cooper is the best teacher at every school.'], 0, '选择特点和具体行为能对应上的介绍。', '和学生一起运动是 active 的具体例子；穿牛仔裤不能证明活跃，夸大比较也没有来源。'),
      choose('Which detail should you use to say that Mrs Young teaches English?', ['The teacher profile names English as her subject.', 'She has curly hair.', 'She is pretty.'], 0, '学科信息应来自教学资料，而不是外貌。', '资料表明确写出 Mrs Young 教英语。'),
      arrange('按清楚的顺序整理教师介绍。', [
        'Add a detail about what the teacher looks like or is like.',
        'Say the teacher’s name and the subject he or she teaches.',
        'Finish with a specific action or skill that supports your description.',
        'Check that each detail is true and belongs to the same teacher.',
      ], [1, 0, 2, 3], '先让读者知道介绍谁，再补充特点和例子，最后核对信息。', '先说姓名和学科，再写外貌或特点、支持特点的行为，最后检查资料是否都指向同一位教师。'),
      choose('You know a teacher is kind, but the textbook gives no personal example. Which sentence is careful?', ['The description says the teacher is kind.', 'The teacher helps every child every day.', 'The teacher is kind because she has curly hair.'], 0, '不要为人物补造材料没有写出的事例。', '第一句只报告已有信息；另外两句添加了没有来源支持的行为或推断。'),
      sortInto('Tim’s email says Mrs Smith teaches music and plays the piano well. It describes one male teacher as tall, strong and teaching PE, and another as teaching maths and being kind and funny. Sort the details into “from Mrs Smith’s email” or “about another teacher”.', ['来自 Mrs Smith 的邮件资料', '其他教师的资料'], [
        { label: 'She teaches music.', categoryIndex: 0 }, { label: 'She plays the piano well.', categoryIndex: 0 },
        { label: 'He is tall and strong and teaches PE.', categoryIndex: 1 }, { label: 'He teaches maths and is kind and funny.', categoryIndex: 1 },
      ], '核对姓名、代词和学科，避免把不同教师的资料放在一起。', 'Mrs Smith 教音乐并且钢琴弹得好；体育教师和数学教师的资料属于其他人。'),
      choose('Which plan best answers “Who is your favourite teacher and why?”', ['Name the teacher, say what he or she teaches, and give a reason with a detail.', 'List several teachers without saying which one you like.', 'Describe the classroom but leave out the teacher.'], 0, '回答要点名一位教师并说明喜欢的理由。', '第一种计划能回答人物是谁、教什么以及喜欢的原因。'),
    ])),
  ],
});
