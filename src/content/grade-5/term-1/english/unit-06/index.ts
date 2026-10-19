import { buildEnglishUnit } from '../../../../grade-2/term-1/english/buildEnglishUnit';
import { arrange, choose, pair, q8, sortInto } from '../../../../grade-2/term-1/english/questionAuthoring';
import type { EightEnglishQuestions, EnglishTaskSpec } from '../../../../grade-2/term-1/english/questionAuthoring';

// 核对固定 TapX 快照：英语五年级上册目录 PDF 第6页；U6 印刷页68–79（PDF页73–84）。
function task(title: string, objective: string, companionId: EnglishTaskSpec['companionId'], questions: EightEnglishQuestions): EnglishTaskSpec {
  return { title, objective, companionId, questions };
}

export const unit = buildEnglishUnit({
  grade: 5,
  term: 1,
  formalUnitNumber: 6,
  entryId: 'unit-06',
  title: 'Unit 6 · Chores',
  sourceTopics: [
    '识别 clean the room、make the bed、take out the rubbish、wash clothes、tidy the desk、sweep the floor 等家务表达',
    '询问是否帮父母做家务：Do you help your parents do chores at home? 并用 Yes, I do. / No, I don’t. 回答',
    '询问常做什么家务及多久做一次：What chores do you usually do? How often do you do it?',
    '使用 once、twice、three times a week 等频率短语介绍家务习惯',
    '从 Bill、Joy、Bob、Jack、Susan 和 Nancy 等人物资料中提取家务分工与时间顺序',
    '辨认 ch、sh、tch 在 chop、ship、watch 等词中的常见拼写和读音',
    '阅读 Zigzig 机器人回家帮忙的故事，理解做家务、关心家人及活动先后',
  ],
  basicTasks: [
    task('认读家务表达并询问是否帮忙', '认读常见家务短语，使用一般疑问句询问并作简短回答。', 'companion-01', q8([
      choose('Which phrase means “整理床铺”？', ['make the bed', 'feed the fish', 'sweep the floor'], 0, '想一想 bed 是什么物品。', 'make the bed 表示整理床铺。'),
      choose('“倒垃圾”用英语怎么说？', ['take out the rubbish', 'water the plants', 'wash the clothes'], 0, '找出表示把 rubbish 拿出去的短语。', 'take out the rubbish 表示把垃圾拿出去。'),
      pair('把家务短语和中文意思连起来。', [['clean the room', '打扫房间'], ['feed the cat', '喂猫'], ['do the dishes', '洗餐具']], '根据动作和物品词判断短语意思。', 'clean the room 是打扫房间，feed the cat 是喂猫，do the dishes 是洗餐具。'),
      choose('Which question asks whether someone helps at home?', ['Do you help your parents do chores at home?', 'How old are your parents?', 'Where is your home?'], 0, '留意问句中的 help 和 chores。', 'Do you help your parents do chores at home? 询问是否在家帮父母做家务。'),
      choose('How can you answer “Do you help your parents at home?” positively?', ['Yes, I do.', 'Yes, I am.', 'Yes, I can’t.'], 0, 'Do 开头的一般疑问句通常用 do 简短回答。', '肯定回答为 Yes, I do.。'),
      sortInto('把短语分到“室内家务”或“照料植物和动物”。', ['室内家务', '照料植物和动物'], [{ label: 'tidy the desk', categoryIndex: 0 }, { label: 'wash clothes', categoryIndex: 0 }, { label: 'water the plants', categoryIndex: 1 }, { label: 'feed the fish', categoryIndex: 1 }], '看动作主要整理物品、清洁，还是照料生物。', '整理桌面和洗衣服属于室内家务；浇植物、喂鱼属于照料植物和动物。'),
      choose('“我通常扫地”哪句话表达正确？', ['I usually sweep the floor.', 'I usually floor sweep.', 'I am sweep the floor usually.'], 0, 'usually 放在实义动词前，注意短语 sweep the floor。', 'I usually sweep the floor. 语序和家务短语都正确。'),
      arrange('整理询问是否帮忙并回答的对话。', ['Do you help your parents do chores at home?', 'Yes, I do.', 'What chores do you do?', 'I tidy my desk.'], [0, 1, 2, 3], '先问是否帮忙，再继续问具体做什么。', '先确认是否帮忙，再追问家务种类并回答。'),
    ])),
    task('描述常做的家务和频率', '使用 usually 和频率短语说清家务习惯，并理解 How often 的问答。', 'companion-02', q8([
      choose('Which question asks how frequently a chore is done?', ['How often do you water the plants?', 'What colour are the plants?', 'Where do you buy the plants?'], 0, '频率问题要问一件事多久做一次。', 'How often do you ...? 用来询问做某事的频率。'),
      choose('“我一周扫三次地”可以怎样说？', ['I sweep the floor three times a week.', 'I three sweep floors every week.', 'I sweep three floor week.'], 0, '把次数放在 times a week 前。', 'three times a week 表示一周三次。'),
      pair('把频率短语和中文意思连起来。', [['once a week', '一周一次'], ['twice a week', '一周两次'], ['three times a week', '一周三次']], 'once 是一次，twice 是两次。', '三个短语分别表示一周一次、两次和三次。'),
      choose('Amy does a chore every day. Which phrase matches?', ['once a day', 'twice a week', 'three times a month'], 0, 'every day 表示每天一次或每天都做。', 'once a day 表示每天一次。'),
      choose('Bill waters the plants three times a week. What does Bill usually do?', ['He waters the plants.', 'He washes the clothes.', 'He walks the dog.'], 0, '从人物记录中找出和频率短语相邻的动作。', 'Bill 通常每周浇三次植物。'),
      sortInto('把表达分到“家务动作”或“频率信息”。', ['家务动作', '频率信息'], [{ label: 'make the bed', categoryIndex: 0 }, { label: 'walk the dog', categoryIndex: 0 }, { label: 'twice a week', categoryIndex: 1 }, { label: 'every Saturday', categoryIndex: 1 }], '动作说明做什么，时间短语说明多久或何时做。', 'make the bed、walk the dog 是动作；twice a week 和 every Saturday 提供时间或频率。'),
      choose('问同学多久整理一次桌面，哪句话合适？', ['How often do you tidy your desk?', 'How many do you tidy your desk?', 'How old do you tidy your desk?'], 0, '询问频率使用 How often。', 'How often do you tidy your desk? 询问整理桌面的频率。'),
      arrange('整理介绍家务频率的句子。', ['I', 'usually', 'feed the fish', 'twice a week.'], [0, 1, 2, 3], '先主语，再 usually 和家务动作，最后补频率。', '可以说 I usually feed the fish twice a week.。'),
    ])),
  ],
  advancedTasks: [
    task('比较人物家务安排并完成调查', '从人物记录中提取家务动作、频率和时间，使用完整句子介绍结果。', 'companion-03', q8([
      choose('Bill usually waters plants and enjoys feeding fish. Which chores are linked to Bill?', ['Watering plants and feeding fish.', 'Making a bed and walking a dog.', 'Washing dishes and taking out rubbish.'], 0, '从 Bill 的人物信息中找两项动作。', 'Bill 的记录提到浇植物和喂鱼。'),
      choose('Joy tidies her desk and cleans her room. What does Joy do?', ['She tidies her desk and cleans her room.', 'She feeds a dog and sweeps a garden.', 'She washes a car and cooks lunch.'], 0, '把 Joy 的两个动作都读出来。', 'Joy 整理桌面并打扫房间。'),
      choose('In a survey, Bob takes out the rubbish and Jack sweeps the floor. Who takes out the rubbish?', ['Bob.', 'Jack.', 'Both, according to the notes.'], 0, '核对人物姓名旁边对应的动作。', '记录说明 Bob 倒垃圾，Jack 扫地。'),
      pair('把人物和记录中的家务连起来。', [['Bob', 'take out the rubbish'], ['Jack', 'sweep the floor'], ['Joy', 'tidy the desk']], '逐项按人物信息配对。', '调查记录分别把倒垃圾、扫地和整理桌面对应到 Bob、Jack 和 Joy。'),
      sortInto('把问句分到“问做什么”或“问多久一次”。', ['问做什么', '问多久一次'], [{ label: 'What chores do you usually do?', categoryIndex: 0 }, { label: 'Do you help at home?', categoryIndex: 0 }, { label: 'How often do you do it?', categoryIndex: 1 }, { label: 'How many times a week?', categoryIndex: 1 }], '看疑问词和答案需要的信息。', 'What chores 和 Do you help 问家务内容或是否帮忙；How often、How many times 问频率。'),
      choose('调查同学后，哪种汇报最清楚？', ['说出同学、家务动作和频率', '只说“大家都做很多事”', '把没记录的频率猜出来'], 0, '汇报要使用收集到的具体信息。', '包含人物、动作和频率，听众更容易理解调查结果。'),
      arrange('完成一次家务习惯调查并汇报。', ['询问同学做哪些家务', '继续询问每项家务多久做一次', '记录人物、动作和频率', '用完整句子介绍调查结果'], [0, 1, 2, 3], '先提问收集信息，再整理后汇报。', '询问内容和频率、记录要点，最后用完整句汇报。'),
      choose('同学说“I tidy my room twice a week.” 你还想知道具体做什么，可以问什么？', ['What chores do you usually do?', 'Where do you live?', 'How old is your room?'], 0, '想了解具体家务动作。', 'What chores do you usually do? 用来询问通常做哪些家务。'),
    ])),
    task('辨认 ch、sh、tch 拼写并理解故事', '在常见词中辨认 ch、sh、tch，并按顺序理解机器人帮助家人的故事。', 'companion-04', q8([
      choose('Which word begins with ch?', ['chair', 'ship', 'watch'], 0, '注意单词开头的字母组合。', 'chair 以 ch 开头。'),
      choose('Which word begins with sh?', ['sheep', 'chore', 'catch'], 0, '在选项开头找 sh。', 'sheep 以 sh 开头。'),
      choose('Which word ends with tch?', ['watch', 'fish', 'chair'], 0, '注意词尾三个字母的组合。', 'watch 以 tch 结尾。'),
      pair('把单词和目标拼写组合连起来。', [['chop', 'ch'], ['shell', 'sh'], ['kitchen', 'tch']], '观察每个词中出现的字母组合。', 'chop 含 ch，shell 含 sh，kitchen 含 tch。'),
      sortInto('把单词分到“ch/sh/tch 读音组合”或“本单元其他拼写”。', ['ch/sh/tch 组合', '其他拼写'], [{ label: 'brush', categoryIndex: 0 }, { label: 'catch', categoryIndex: 0 }, { label: 'water', categoryIndex: 1 }, { label: 'floor', categoryIndex: 1 }], 'brush 含 sh，catch 含 tch；另两词不含这三种组合。', 'brush 和 catch 属于目标拼写组；water、floor 不含 ch、sh 或 tch。'),
      choose('Why does Zigzig go home after learning chores?', ['It wants to help its tired mother.', 'It wants to watch a sports show.', 'It needs to buy a new desk.'], 0, '留意故事中妈妈疲倦和机器人回家的原因。', 'Zigzig 回家是为了帮助疲倦的妈妈。'),
      choose('Which chore can Zigzig do for its family?', ['Feed the fish.', 'Read the weather.', 'Play football.'], 0, '从机器人会做的家务中选择。', '故事提到机器人能帮忙喂鱼等家务。'),
      arrange('整理机器人回家帮忙的故事事件。', ['Zigzig learns how to do chores', 'It goes home to help its mother', 'It does chores for the family', 'The family can share the work'], [0, 1, 2, 3], '按学习、回家、帮忙的先后排列。', '机器人先学做家务，再回家帮助妈妈，随后分担家务。'),
    ])),
  ],
  highTasks: [
    task('制订公平可行的家庭分工计划', '综合使用家务词汇、频率表达和礼貌协商，制定适合家庭成员的分工。', 'companion-01', q8([
      choose('Two children both want to walk the dog on Saturday. What is a fair plan?', ['Take turns on different days.', 'Let one child do it every time without asking.', 'Stop caring for the dog.'], 0, '公平安排要让大家都有机会并照顾宠物需要。', '轮流安排能公平分工，也能保证宠物得到照顾。'),
      choose('A parent is tired. Which offer is helpful and polite?', ['I can wash the dishes for you.', 'You must wash all the dishes.', 'I never help at home.'], 0, '用 I can ... 表达主动帮助。', 'I can wash the dishes for you. 是清楚而友好的帮助提议。'),
      pair('把家庭任务和合适的时间安排连起来。', [['Feed a pet every day', 'daily'], ['Water plants three times each week', 'three times a week'], ['Clean a room on Sunday', 'on Sunday']], '任务需求决定频率或具体日期。', '喂宠物每天一次，浇植物一周三次，打扫安排在星期日。'),
      choose('A chore is too difficult for a younger child. What should the family do?', ['Choose a safe, suitable task and ask an adult for help when needed.', 'Make the child do it alone.', 'Never share any chores.'], 0, '家务计划还要考虑年龄和安全。', '选择适龄、安全的任务，必要时请大人帮助。'),
      sortInto('把计划分到“清楚的分工”或“还不清楚”。', ['清楚的分工', '还不清楚'], [{ label: 'Mia feeds the fish each morning.', categoryIndex: 0 }, { label: 'Leo takes out the rubbish on Tuesday.', categoryIndex: 0 }, { label: 'Someone will do something later.', categoryIndex: 1 }, { label: 'We will clean things sometimes.', categoryIndex: 1 }], '检查计划是否说明了人物、任务和时间。', '前两句包含人物、动作和时间；后两句缺少具体安排。'),
      choose('How can family members avoid doing the same chore twice?', ['Write down who does each chore and when.', 'Keep the plan secret.', 'Never talk about chores.'], 0, '公开记录能让每个人看到安排。', '记录人物、任务和时间可以减少遗漏或重复。'),
      arrange('整理协商家庭家务分工的步骤。', ['列出需要完成的家务', '询问每个人能做什么和何时有空', '公平分配适龄任务并写下时间', '一起检查计划是否可行'], [0, 1, 2, 3], '先看任务需求，再了解成员情况，最后安排和检查。', '列任务、听成员意愿、分配时间并共同检查计划。'),
      choose('A family member cannot do a chore on the planned day. What is the best response?', ['Talk with the family and change the plan together.', 'Blame the person and never change the plan.', 'Leave the chore undone without telling anyone.'], 0, '计划可以根据实际情况协商调整。', '及时沟通并一起调整，既能完成任务，也尊重家庭成员。'),
    ])),
    task('综合阅读家务记录并清楚汇报', '整合人物、家务、频率和故事信息，写出连贯且不添加臆测的简短报告。', 'companion-03', q8([
      choose('Notes say “Jack—sweep the floor; water plants”. Which report is supported?', ['Jack sweeps the floor and waters the plants.', 'Jack washes clothes every day.', 'Jack never helps at home.'], 0, '只选择记录中明确出现的信息。', '笔记明确记录 Jack 扫地并浇植物。'),
      choose('Notes say “Susan and Nancy—Sunday; make beds”. What can you safely report?', ['They make their beds on Sunday.', 'They walk two dogs every morning.', 'They never do chores.'], 0, '不要给资料增加没有写出的家务或频率。', '记录只支持 Susan 和 Nancy 星期日整理床铺。'),
      pair('把阅读信息和可以作出的结论连起来。', [['人物姓名和家务动作', '谁做什么'], ['three times a week', '一周的频率'], ['on Sunday morning', '具体日期时段']], '结论应和材料中的信息类型对应。', '姓名动作说明分工，频率短语说明次数，日期时段说明何时进行。'),
      choose('A report says “Joy cleans her room every day,” but the notes only say she cleans it. What should you do?', ['Remove the unsupported frequency.', 'Keep “every day” because it sounds likely.', 'Change Joy’s name.'], 0, '汇报不能把没有记录的频率当成事实。', '原记录没有频率，因此应该删去 every day。'),
      sortInto('把句子分到“有材料支持”或“加入了猜测”。', ['有材料支持', '加入了猜测'], [{ label: 'Bob takes out the rubbish.', categoryIndex: 0 }, { label: 'The notes say Jack sweeps the floor.', categoryIndex: 0 }, { label: 'Bob does every chore at home.', categoryIndex: 1 }, { label: 'Jack sweeps the floor seven times a week.', categoryIndex: 1 }], '检查每个细节是否在记录中出现。', '前两句复述已有记录；后两句添加了未提供的信息。'),
      choose('Which report is easiest to understand?', ['Name the person, chore and time in clear sentences.', 'Use only a list of unrelated words.', 'Mix different people’s chores together.'], 0, '听众需要知道谁在什么时候做什么。', '人物、家务和时间信息清楚，报告更易理解。'),
      arrange('整理一段准确的家务调查报告。', ['阅读并核对调查笔记', '按人物整理家务和时间', '用完整句子报告明确的信息', '检查是否加入了没有依据的细节'], [0, 1, 2, 3], '先核对信息，再整理、报告并检查。', '核对笔记后按人物整理，写成完整句，再删掉无依据内容。'),
      choose('You do not know how often a student does a chore. What can you ask?', ['How often do you do it?', 'What colour is it?', 'How old are you doing it?'], 0, '使用 How often 询问频率。', 'How often do you do it? 能补充未知的家务频率。'),
    ])),
  ],
});
