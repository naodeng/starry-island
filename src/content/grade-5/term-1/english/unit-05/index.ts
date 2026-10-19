import { buildEnglishUnit } from '../../../../grade-2/term-1/english/buildEnglishUnit';
import { arrange, choose, pair, q8, sortInto } from '../../../../grade-2/term-1/english/questionAuthoring';
import type { EightEnglishQuestions, EnglishTaskSpec } from '../../../../grade-2/term-1/english/questionAuthoring';

// 核对固定 TapX 快照：英语五年级上册目录 PDF 第6页；U5 印刷页56–67（PDF页61–72）。
function task(
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
  formalUnitNumber: 5,
  entryId: 'unit-05',
  title: 'Unit 5 · TV Shows',
  sourceTopics: [
    '识别 cartoons、sports shows、nature shows、news shows、music shows 和 variety shows 等节目类型',
    '询问和介绍喜爱的电视节目及原因：What are your favourite TV shows? My favourite TV shows are ... They are ...',
    '询问和描述通常收看节目的时间：When do you usually watch ...? I usually watch them on ...',
    '从 Jane、Mack、Coco 等人物的阅读信息中提取节目类型、收看时间、内容和感受',
    '辨认 wh 在 white、whale、whisker、what、where、when 等词中的拼写',
    '了解广告、谈话节目和综艺节目的基本特点，制作介绍节目类型的海报',
    '阅读家庭成员收看不同节目的故事，理解节目时间冲突、停电后改做游戏的情节',
  ],
  basicTasks: [
    task('认读节目类型并表达喜好', '认读常见电视节目名称和描述词，使用复数节目名称表达喜欢的节目及简单感受。', 'companion-01', q8([
      choose('Which phrase means “自然节目”？', ['nature shows', 'music shows', 'news shows'], 0, '想一想哪类节目会介绍动物、植物或自然环境。', 'nature shows 是自然节目。'),
      choose('Which TV show can include songs by singers?', ['music shows', 'sports shows', 'news shows'], 0, '根据节目名称判断它主要和什么内容有关。', 'music shows 与音乐、歌曲有关。'),
      pair('把节目名称和常见内容连起来。', [
        ['cartoons', 'animated stories'], ['sports shows', 'games and sports'], ['news shows', 'reports about events'],
      ], '先读懂节目名称，再匹配适合的节目内容。', 'cartoons 是动画片，sports shows 介绍体育，news shows 报道新闻。'),
      choose('“My favourite TV shows are cartoons. They are wonderful.” 这句话表达什么？', ['喜爱的节目是动画片，觉得它们很精彩', '不喜欢电视节目', '动画片每周只播放一次'], 0, '找出 favourite 和 wonderful 分别表达的意思。', '这句话说最喜欢的电视节目是动画片，并认为它们很精彩。'),
      choose('Which word can describe a TV show in a positive way?', ['fantastic', 'sharpener', 'exercise book'], 0, '区分表示感受的形容词和购物物品名词。', 'fantastic 表示“极好的”，可以用来描述喜欢的节目。'),
      choose('小刚想说“我喜欢体育节目”，哪句话合适？', ['I like sports shows.', 'I am a sports show.', 'I sports show on Friday.'], 0, '用 like 后面接喜欢的节目名称。', 'I like sports shows. 表示“我喜欢体育节目”。'),
      sortInto('把节目放进“节目类型”或“感受词”。', ['节目类型', '感受词'], [
        { label: 'cartoons', categoryIndex: 0 }, { label: 'nature shows', categoryIndex: 0 },
        { label: 'wonderful', categoryIndex: 1 }, { label: 'interesting', categoryIndex: 1 },
      ], '观察词语是在说节目类别，还是在描述喜欢后的感受。', 'cartoons 和 nature shows 是节目类型；wonderful 和 interesting 表达感受。'),
      arrange('把词卡排成介绍最喜欢节目的句子。', ['My favourite TV shows', 'are', 'music shows.', 'They’re fantastic.'], [0, 1, 2, 3], '先说最喜欢的节目，再补充一条完整的感受句。', '可以说 My favourite TV shows are music shows. They’re fantastic.'),
    ])),
    task('询问通常收看节目的时间', '使用 when 和 usually 询问或回答收看时间，并读懂星期和一天中的时段信息。', 'companion-02', q8([
      choose('Which question asks when someone usually watches nature shows?', ['When do you usually watch nature shows?', 'Where are the nature shows?', 'How much are the nature shows?'], 0, '找出询问时间的疑问词。', 'When do you usually watch ...? 用来询问通常什么时候收看。'),
      choose('Sam usually watches cartoons on Friday. Which answer is correct?', ['He usually watches them on Friday.', 'He usually watch it at Friday.', 'He watches Friday cartoons usually on.'], 0, '句子主语是 he，留意动词形式和星期前的介词。', '可以说 He usually watches them on Friday.。'),
      choose('Which phrase means “星期二晚上”？', ['on Tuesday evening', 'in Tuesday evening', 'at Tuesday evening'], 0, '星期和一天中的时段放在一起时，注意常用的介词。', '可以说 on Tuesday evening，表示星期二晚上。'),
      choose('Mia says, “I usually watch them on Saturday evening.” What does she tell us?', ['Her usual viewing time.', 'Her school address.', 'The price of a television.'], 0, '理解 usually watch 和时间短语传达的信息。', '她告诉我们通常在星期六晚上看这些节目。'),
      pair('把时间短语和对应的中文意思连起来。', [
        ['on Monday', '星期一'], ['on Friday evening', '星期五晚上'], ['every evening', '每天晚上'],
      ], '关注星期名称和 every 表示的频率。', 'on Monday 是星期一，on Friday evening 是星期五晚上，every evening 是每天晚上。'),
      choose('同学想询问你通常什么时候看新闻节目，可以说什么？', ['When do you usually watch news shows?', 'What colour are your news shows?', 'How many news shows are you?'], 0, '用 when 问时间，用 usually 询问日常习惯。', 'When do you usually watch news shows? 是询问通常收看时间的问句。'),
      sortInto('把句子分到“喜爱什么节目”或“通常什么时候收看”。', ['喜爱的节目', '收看时间'], [
        { label: 'My favourite shows are music shows.', categoryIndex: 0 }, { label: 'I like cartoons best.', categoryIndex: 0 },
        { label: 'I usually watch them on Sunday.', categoryIndex: 1 }, { label: 'I watch nature shows every evening.', categoryIndex: 1 },
      ], '看句子重点是在说节目名称，还是在说收看的时间。', '前两句说喜爱的节目；后两句说明通常的收看时间。'),
      arrange('整理一个询问与回答收看时间的对话。', ['When do you usually watch sports shows?', 'I usually watch them on Saturday.', 'Great, thank you for telling me.', 'You’re welcome.'], [0, 1, 2, 3], '先问通常的时间，再回答并作礼貌回应。', '先问收看时间，再回答通常星期六观看，随后礼貌回应。'),
    ])),
  ],
  advancedTasks: [
    task('从人物资料中提取节目线索', '综合阅读节目内容、喜好和时间信息，匹配人物并比较不同收看习惯。', 'companion-03', q8([
      choose('Jane watches a show about animals from different countries. Which kind of show does she enjoy?', ['Nature shows.', 'Sports shows.', 'News shows.'], 0, '根据动物和自然内容判断节目类型。', '介绍不同国家动物的节目属于 nature shows。'),
      choose('Jane usually watches her favourite shows on Tuesday. What can we say?', ['Tuesday is her usual viewing day.', 'She watches them every morning.', 'She never watches TV.'], 0, '把人物资料中的星期和 usual 联系起来。', '资料说明 Jane 通常星期二看她喜欢的节目。'),
      choose('Mack watches a programme with football, basketball and table tennis. What does he like?', ['Sports shows.', 'Cartoons.', 'Music shows.'], 0, '这些活动都属于哪一类？', '足球、篮球和乒乓球都是体育项目，因此 Mack 喜欢 sports shows。'),
      choose('Coco watches music shows on Friday at 7:30 pm. What might she enjoy there?', ['Songs and singers.', 'Weather reports only.', 'A school maths lesson.'], 0, '根据 music show 的节目类型判断可能出现的内容。', '音乐节目中可能听到歌曲并看到歌手。'),
      pair('把人物和阅读资料中的线索连起来。', [
        ['Jane', '学习不同国家的动物'], ['Mack', '喜欢包含多种体育项目的节目'], ['Coco', '星期五晚上看音乐节目'],
      ], '分别抓住人物名字旁边的内容和时间线索。', 'Jane 的节目介绍动物，Mack 看体育节目，Coco 的音乐节目在星期五晚上。'),
      sortInto('把人物资料分到“节目内容”或“收看时间”。', ['节目内容', '收看时间'], [
        { label: '介绍不同国家的动物', categoryIndex: 0 }, { label: '有足球和篮球活动', categoryIndex: 0 },
        { label: 'Tuesday', categoryIndex: 1 }, { label: 'Friday at 7:30 pm', categoryIndex: 1 },
      ], '判断信息是在讲节目里有什么，还是在讲什么时候收看。', '动物和体育项目属于节目内容；星期和具体时间属于收看时间。'),
      choose('If Mack watches sports shows every evening, which statement agrees with the information?', ['He watches them each evening.', 'He only watches them on Friday.', 'He watches them once a year.'], 0, '理解 every evening 表示的频率。', 'every evening 表示每天晚上，所以第一句符合资料。'),
      arrange('按调查记录整理人物收看信息。', ['写下人物喜欢的节目类型', '记录他们通常收看的时间', '根据节目内容或时间找出对应人物', '用完整句子介绍调查结果'], [0, 1, 2, 3], '先记录问题答案，再比较资料并组织介绍。', '先收集喜好和时间，再匹配人物，最后用完整句子汇报。'),
    ])),
    task('了解节目特点并辨认 wh 拼写', '根据简短说明分辨广告、谈话节目和综艺节目，识别 wh 词语拼写。', 'companion-04', q8([
      choose('Which word begins with “wh”?', ['whale', 'nature', 'cartoon'], 0, '观察单词开头的两个字母。', 'whale 以 wh 开头。'),
      choose('Which word has “wh” at the beginning and means “在哪里”？', ['where', 'wonderful', 'window'], 0, '找出表示地点疑问的词。', 'where 表示“在哪里”，开头写作 wh。'),
      choose('Which word contains “wh” and asks about time?', ['when', 'what', 'white'], 0, '想一想哪个词可以问“什么时候”。', 'when 表示“什么时候”，开头包含 wh。'),
      choose('What is a common feature of a short advertisement?', ['It tells people about something for sale.', 'It is always a full-length film.', 'It teaches every sport in detail.'], 0, '广告会用简短信息介绍可以购买的东西。', '广告常用简短内容告诉人们有新商品或服务。'),
      pair('把节目类型和可能出现的内容连起来。', [
        ['talk shows', 'people talk about different topics'], ['variety shows', 'singing, dancing or jokes'], ['advertisements', 'short messages about things to buy'],
      ], '根据节目名称和介绍中的主要活动进行配对。', '谈话节目以交流话题为主，综艺节目可以有歌舞和笑话，广告介绍可购买的事物。'),
      sortInto('把词语分到“含 wh”或“不含 wh”。', ['含 wh', '不含 wh'], [
        { label: 'white', categoryIndex: 0 }, { label: 'whisker', categoryIndex: 0 },
        { label: 'sports', categoryIndex: 1 }, { label: 'fantastic', categoryIndex: 1 },
      ], '检查单词中是否连续出现字母 w 和 h。', 'white 和 whisker 含有 wh；sports 和 fantastic 不含 wh。'),
      choose('A family wants to learn about an interesting topic while enjoying people talking. Which show may fit?', ['A talk show.', 'A weather report only.', 'A silent cartoon.'], 0, '谈话节目通常由人物围绕话题交流。', 'talk shows 会请人谈论不同有趣的话题。'),
      arrange('整理制作一张节目介绍海报的步骤。', ['选择一种节目类型', '想好节目内容和喜欢它的理由', '用简短文字和图画安排版面', '检查信息清楚后展示海报'], [0, 1, 2, 3], '从选择主题开始，再计划内容、设计和检查。', '先确定节目，再准备说明和理由，设计版面并检查后展示。'),
    ])),
  ],
  highTasks: [
    task('设计节目调查并汇报结果', '综合使用喜好、理由和时间问句收集资料，准确汇报人物的节目选择和收看习惯。', 'companion-01', q8([
      choose('You want to learn a classmate’s favourite TV shows. Which question should you ask?', ['What are your favourite TV shows?', 'How much is your favourite show?', 'Where is your show’s pencil box?'], 0, '先问节目名称，不要把电视节目当成商品。', '这句话询问对方最喜欢的电视节目。'),
      choose('Which follow-up question helps you learn the usual viewing time?', ['When do you usually watch them?', 'Who bought the television?', 'How tall are the shows?'], 0, '继续询问对方通常在什么时候收看。', 'When do you usually watch them? 询问通常的收看时间。'),
      choose('A class survey shows that three pupils like music shows. Which report is clearest?', ['Three pupils like music shows.', 'Three shows are pupils.', 'Music shows like three pupils.'], 0, '用人物数量作主语，再说他们喜欢什么。', 'Three pupils like music shows. 清楚地汇报了调查人数和节目类型。'),
      choose('Two friends like cartoons and often watch them on Sunday. How can you report this?', ['They like cartoons and usually watch them on Sunday.', 'They is a cartoon on Sunday.', 'Sunday likes watching them.'], 0, '先说喜好，再说通常的收看时间。', '这句话按照喜好和时间汇报了调查结果。'),
      pair('把调查问题和它要收集的信息连起来。', [
        ['What are your favourite TV shows?', '节目喜好'], ['When do you usually watch them?', '收看时间'], ['Why do you like them?', '喜欢的理由'],
      ], '区分名称、时间和原因这三类信息。', '三个问题分别收集节目类型、收看时间和喜爱理由。'),
      sortInto('把海报信息分到“必要介绍”或“可以补充”。', ['必要介绍', '可以补充'], [
        { label: '节目名称和主要内容', categoryIndex: 0 }, { label: '说明喜欢的原因', categoryIndex: 0 },
        { label: '装饰边框的颜色', categoryIndex: 1 }, { label: '作者喜欢的其他爱好', categoryIndex: 1 },
      ], '优先选择能让读者认识节目并理解推荐理由的信息。', '名称、内容和理由直接介绍节目；边框颜色和其他爱好可以作为装饰性补充。'),
      choose('A student’s notes say “nature shows; Friday; learn about animals”. Which short report uses all three notes?', ['I like nature shows. I watch them on Friday and learn about animals.', 'I watch sports on Monday and play an animal.', 'Friday likes nature shows.'], 0, '把三条笔记分别放进节目、时间和内容的表达中。', '第一句话完整使用了节目类型、收看时间和学习内容三项记录。'),
      arrange('整理一次小组节目调查并汇报的流程。', ['准备喜好、时间和理由问题', '向同学提问并记录原话要点', '按相同节目或时间整理答案', '用完整句子向全班介绍发现'], [0, 1, 2, 3], '先准备问题和记录，再归纳相似信息并汇报。', '先设计调查问题，再收集、整理答案，最后清楚介绍调查发现。'),
    ])),
    task('分析家庭收看故事并协商安排', '根据不同家庭成员的节目偏好和播放时间理解故事冲突，提出尊重彼此的替代活动。', 'companion-03', q8([
      choose('In the story, two family members want to watch different shows at the same time. What is the problem?', ['They cannot both use the TV for different shows at once.', 'They have no favourite shows.', 'They are shopping for clothes.'], 0, '留意几个人都想在同一时刻使用电视的情节。', '他们想同时看不同节目，电视播放安排发生了冲突。'),
      choose('What changes when the power goes off?', ['The family cannot watch TV.', 'All the shows become sports shows.', 'The television gets a new price.'], 0, '关注停电后电视还能不能播放。', '停电后无法继续看电视。'),
      choose('What do the family members do after they stop watching TV?', ['They play a game together.', 'They buy a new schoolbag.', 'They go to a shop to buy a puppy.'], 0, '回忆故事结尾的共同活动。', '停电后，家人改为一起玩游戏。'),
      pair('把故事事件和它带来的变化连起来。', [
        ['成员想看不同的节目', '需要协商播放安排'], ['电源中断', '不能继续看电视'], ['大家一起玩游戏', '共同参与另一种活动'],
      ], '按故事中的原因和结果配对。', '不同偏好带来安排问题，停电使电视无法播放，一起游戏成为新的共同活动。'),
      sortInto('把家庭活动分到“需要电视”或“可以一起进行”。', ['需要电视', '可以一起进行'], [
        { label: '看一集动画片', categoryIndex: 0 }, { label: '播放体育节目', categoryIndex: 0 },
        { label: '玩一个桌面游戏', categoryIndex: 1 }, { label: '轮流介绍喜欢的节目', categoryIndex: 1 },
      ], '想一想活动是否必须使用电视。', '看节目需要电视；桌面游戏和交流喜好不依赖电视。'),
      choose('Which plan is fair when family members prefer different shows?', ['Take turns choosing at agreed times.', 'Let one person choose every day without asking.', 'Turn off the TV whenever someone disagrees.'], 0, '寻找能轮流表达喜好的安排。', '商量轮流选择的时间，能让不同家庭成员都有机会。'),
      choose('Why is playing a game together a good ending to the story?', ['It gives the family a shared activity when TV is unavailable.', 'It proves that nobody likes TV.', 'It makes every TV show start at the same time.'], 0, '把结尾活动和停电后的处境联系起来。', '电视不能使用时，一起玩游戏让家人仍能共同活动。'),
      arrange('整理一次尊重彼此的家庭节目安排。', ['每个人说出喜欢的节目和通常时间', '找出时间冲突的部分', '商量轮流收看或选择共同活动', '确认大家理解并接受安排'], [0, 1, 2, 3], '先听取偏好，再识别冲突并讨论双方都能接受的安排。', '听取每个人的喜好和时间，找出冲突，再商量轮流或共同活动并确认。'),
    ])),
  ],
});
