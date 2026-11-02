import type { ChoiceActivityDefinition, Difficulty } from '../../content/types';

export interface Grade2Term2MathUnit01SupplementalActivity {
  difficulty: Difficulty;
  sourceUnitId: string;
  knowledgePointIds: string[];
  activity: ChoiceActivityDefinition;
}

interface ActivityDraft {
  knowledgePointIds: string[];
  prompt: string;
  answer: string;
  distractors: [string, string];
  hint: string;
  explanation: string;
}

const sourceUnitId = 'grade-2/term-2/math/unit-01';
const idPrefix = 'challenge-supplement-grade-2-term-2-math-unit-01';
const survey = 'survey-design-and-data-collection';
const organize = 'organizing-survey-data';
const readTables = 'reading-and-reasoning-with-statistical-tables';

const drafts: Record<Difficulty, ActivityDraft[]> = {
  basic: [
    { knowledgePointIds: [organize], prompt: '一张调查记录卡上的“正”字记号主要用来做什么？', answer: '把每次选择逐个记下来，便于数总数', distractors: ['写下每位同学的身高', '记住调查问题的答案'], hint: '想想每收到一张选票时怎样留下记录。', explanation: '调查时逐次添记，之后可以按记号数出每项总数。' },
    { knowledgePointIds: [survey], prompt: '小组调查课间活动，怎样让大家都有相同的投票机会？', answer: '每人选择一次，并按相同规则登记', distractors: ['让最先到场的同学投两次', '只请小组长选出大家的答案'], hint: '先想清每位参加者能做几次选择。', explanation: '每人都按同一规则选择一次，调查机会才相同。' },
    { knowledgePointIds: [readTables], prompt: '借阅表记录故事书8本、百科书5本、漫画书4本，一共借出多少本？', answer: '17本', distractors: ['16本', '18本'], hint: '把表中三类书的本数合起来。', explanation: '8＋5＋4＝17，一共借出17本。' },
    { knowledgePointIds: [readTables], prompt: '运动调查表三项的票数分别是6、7、9。哪一项票数最多？', answer: '第3项', distractors: ['第1项', '第2项'], hint: '逐项比较表里的票数。', explanation: '9票比7票和6票都多，所以第3项票数最多。' },
    { knowledgePointIds: [readTables], prompt: '手工活动投票为纸风车6票、剪纸4票、泥塑6票。报告最多项时怎样说？', answer: '两项并列最多', distractors: ['只有纸风车最多', '只有泥塑最多'], hint: '注意比较是否有两项的票数相同。', explanation: '纸风车和泥塑都是6票，应报告两项并列最多。' },
    { knowledgePointIds: [organize], prompt: '统计表里“阅读角”一项空着，原始投票卡还在。怎样补齐这项数据？', answer: '回看原始记录后再补填', distractors: ['照着票数最多的一项填写', '随便写一个数让表格完整'], hint: '没有登记在表里的数据不能靠猜。', explanation: '回看原始投票卡，按实际记录补填，结果才准确。' },
    { knowledgePointIds: [survey], prompt: '调查单写着“最喜欢的水果”，范围栏注明二年级三班。谁是这次调查的对象？', answer: '二年级三班的同学', distractors: ['二年级二班的同学', '全校所有同学'], hint: '先找范围栏里被询问的一群人。', explanation: '范围栏指出调查对象是二年级三班的同学，不能把结果说成其他人群的选择。' },
    { knowledgePointIds: [readTables], prompt: '统计表列出几种课间活动的票数。要回答“哪种活动最受欢迎”，应该比较什么？', answer: '哪种活动得到的票数最多', distractors: ['活动名称哪一个字最多', '表格最后写的是哪种活动'], hint: '“最受欢迎”要看表示选择人数的数据。', explanation: '比较各项票数，票数最多的活动就是这次调查中选择人数最多的活动。' },
    { knowledgePointIds: [organize], prompt: '桌上有几张水果选择卡，怎样整理后更容易知道每种水果有多少人选？', answer: '先把同类记录放在一起，再逐类计数', distractors: ['把卡片打乱后只数卡片总数', '只保留最后收到的一张卡'], hint: '按选择内容分一分，再数每一组。', explanation: '先按水果类别整理，再数每类卡片，能得到各项人数。' },
    { knowledgePointIds: [readTables], prompt: '图书角记录故事书11本、科普书7本。故事书比科普书多多少本？', answer: '4本', distractors: ['18本', '3本'], hint: '求相差多少，用较大的数减较小的数。', explanation: '11−7＝4，故事书比科普书多4本。' },
    { knowledgePointIds: [survey], prompt: '想调查同学最喜欢哪种书，哪种提问方式能让结果更清楚？', answer: '每人只选一种最喜欢的书', distractors: ['每人把所有看过的书都选上', '让同学猜别人最喜欢哪种书'], hint: '提问方式要和“最喜欢哪种”这个问题对应。', explanation: '每人只选一种最喜欢的书，记录结果后更容易比较。' },
    { knowledgePointIds: [organize], prompt: '五张活动卡是：跳绳、画画、跳绳、阅读、跳绳。跳绳这一组有几张卡？', answer: '3张', distractors: ['2张', '4张'], hint: '把写着“跳绳”的卡逐张数一数。', explanation: '五张卡中有三张写着“跳绳”，所以这一组有3张。' },
    { knowledgePointIds: [readTables], prompt: '五种颜色的票数分别是3、7、4、7、5。获得最高票数的颜色有几种？', answer: '2种', distractors: ['1种', '3种'], hint: '先找最大的票数，再数一数有几项达到它。', explanation: '最高票数是7，有两种颜色都是7票。' },
    { knowledgePointIds: [survey, organize], prompt: '准备做一次班级小调查，开始记录前先做什么更合适？', answer: '先说明调查对象和规则，再记录各项人数', distractors: ['先随便写几项人数', '先宣布哪一项会是最多的'], hint: '记录前先让参加者知道调查什么、怎样选择。', explanation: '说明对象和规则后再收集、整理人数，结果更容易读懂。' },
  ],
  advanced: [
    { knowledgePointIds: [survey, organize], prompt: '班级想调查最喜爱的运动，怎样安排能得到可核对的统计结果？', answer: '每位同学只选一项，记录每项人数并核对总数', distractors: ['不说明规则，最后只报最受欢迎的一项', '让每人选几项却把所有票当作人数'], hint: '既要统一选择规则，也要检查整理后的数据。', explanation: '一人选一项、逐类记录并核对总数，能让调查过程和结果互相检查。' },
    { knowledgePointIds: [readTables], prompt: '一张表记录了参加本次调查的同学选择：画画9票、阅读7票、运动6票。能得出哪项结论？', answer: '只能说明这次参加调查的同学的选择', distractors: ['能说明全校同学都最喜欢画画', '能确定下次调查仍会是画画最多'], hint: '看看表格记录的是哪些人、哪一次调查。', explanation: '数据来自本次参加调查的同学，结论不能扩大到没有参加的人或未来。' },
    { knowledgePointIds: [organize, readTables], prompt: '三类贴纸共27张，星星9张、月亮8张，剩下的云朵贴纸有多少张？', answer: '10张', distractors: ['11张', '18张'], hint: '先把已知的两类合起来，再从总数中减去。', explanation: '9＋8＝17，27−17＝10，所以云朵贴纸有10张。' },
    { knowledgePointIds: [readTables], prompt: '甲组有12人参加调查，乙组有5人参加。两个小组合起来有多少人参加？', answer: '17人', distractors: ['7人', '18人'], hint: '把两个小组的参加人数相加。', explanation: '12＋5＝17，两个小组共17人参加。' },
    { knowledgePointIds: [survey, organize], prompt: '20人都参加了每人一票的调查，统计表合计只有18票。首先核对什么？', answer: '是否有参加者的选择没有记进表里', distractors: ['是否有人投了两次', '是否把两类票数相加'], hint: '在每人都投一票的规则下，票数少于人数时要查遗漏。', explanation: '20人各投一票应有20票；表中少了2票，先查是否有参加者的选择漏记。' },
    { knowledgePointIds: [organize], prompt: '统计表缺少一种活动的票数，但手边没有原始记录。怎样处理更准确？', answer: '回到原始记录查清后再填', distractors: ['用其他活动的票数代替', '按照自己的喜好估一个数'], hint: '缺少证据时，不能把猜测写成统计结果。', explanation: '先找回原始记录；如果无法查清，应保留“待核对”，不能随意补数。' },
    { knowledgePointIds: [organize, readTables], prompt: '一周天气表中周三一格空着，观察日记写着周三下雨，而且每天都观察过。下一步怎样做？', answer: '补记星期三，再核对整周记录天数', distractors: ['把周三当作晴天，不再检查', '删除整周表格重新猜测'], hint: '把日记里的记录补到对应日期，再检查每一天是否都有记录。', explanation: '按周三日记补记后，再核对一周七天是否逐日登记。' },
    { knowledgePointIds: [survey, organize], prompt: '小组准备整理一次“最喜欢的课外活动”调查，统计表至少要写哪些信息？', answer: '调查类别、每类人数和调查对象', distractors: ['只写最受欢迎的活动名称', '只写调查表的颜色和张数'], hint: '别人需要知道调查了什么、谁参加以及各项有多少人。', explanation: '类别、人数和调查对象能帮助读者看懂这次调查记录。' },
    { knowledgePointIds: [readTables], prompt: '阅读调查表中运动14票、绘画9票、音乐6票。运动比音乐多多少票？', answer: '8票', distractors: ['20票', '9票'], hint: '用运动的票数减去音乐的票数。', explanation: '14−6＝8，运动比音乐多8票。' },
    { knowledgePointIds: [readTables], prompt: '甲组得到12票，乙组得到7票。乙组再得到3票后，还差几票与甲组相同？', answer: '乙组还差2票才与甲组相同', distractors: ['乙组还差5票', '乙组已经比甲组多1票'], hint: '先把乙组新得到的票数加上，再和甲组比较。', explanation: '乙组现在有7＋3＝10票，12−10＝2票，还差2票。' },
    { knowledgePointIds: [organize], prompt: '同一张投票卡被登记了两次，怎样修正统计表？', answer: '逐张对照原始记录，删除重复计入的那一张', distractors: ['把每一类都减去一票', '不检查卡片，直接把总数改小'], hint: '只修正能在原始记录中确认的重复项。', explanation: '找到重复的那张卡后只去掉一次重复计数，再核对各类合计。' },
    { knowledgePointIds: [readTables], prompt: '调查记录了本班参加活动同学的选择，结论怎样写更准确？', answer: '结论只写本次参加调查的同学中哪项最多', distractors: ['写成所有年级的同学都选同一项', '写成以后每次调查都会得到相同结果'], hint: '结论范围要和表中实际记录的对象一致。', explanation: '只报告本次被调查同学的数据，不把结果扩大到未调查的人或以后。' },
    { knowledgePointIds: [organize, readTables], prompt: '一叠选择卡上有几种不同的图书，怎样整理成一张能回答“哪种书最受欢迎”的表？', answer: '先按选择分类，再数每类记录并填写统计表', distractors: ['先把卡片按颜色排好，不记书的类别', '只把最先看到的一种书写进表格'], hint: '表格的数据类别要和调查问题相对应。', explanation: '按书的种类分类并逐类计数，才能比较哪种书被选择最多。' },
    { knowledgePointIds: [organize, readTables], prompt: '每人只能投一票，原始记录共有24人，统计表各类合计26票。怎样开始复核？', answer: '逐项核对原始记录和统计表的合计', distractors: ['把26票直接改成24票，不看分类', '只比较票数最多的一类是否合理'], hint: '从记录来源和表中各类数据逐项查起。', explanation: '逐项对照原始记录，才能找出多出的票是重复计数还是分类有误。' },
  ],
  high: [
    { knowledgePointIds: [survey, organize], prompt: '小组要做一份可信的活动偏好调查，哪种步骤安排最完整？', answer: '先定调查问题与规则，再记录、整理并核对总数', distractors: ['先写结论，再挑选能支持结论的票数', '先统计总数，之后再决定调查了什么'], hint: '按提出问题、收集记录、整理和检查的顺序想。', explanation: '先明确调查内容和规则，再收集、整理数据并核对，结论才能有依据。' },
    { knowledgePointIds: [readTables], prompt: '图书调查中故事书10票、科普书10票、漫画书4票。最多的两类合起来有多少票？', answer: '故事书和科普书并列最多，合计20票', distractors: ['故事书单独最多，共10票', '三类一共只有20票'], hint: '先找出并列最多的类别，再把它们的票数相加。', explanation: '故事书和科普书各10票，并列最多；两类合计10＋10＝20票。' },
    { knowledgePointIds: [organize, readTables], prompt: '整理卡片时发现统计表合计比原始卡片少一票。怎样找出差错并修正？', answer: '先核对原始卡片中每类记录，再补表并重算合计', distractors: ['把差额加到票数最多的一类', '不看原始卡片，直接把合计改大一票'], hint: '先确认哪一张卡、属于哪一类，再改动统计表。', explanation: '逐类对照原始卡片，找到漏记的类别后补上，再重新计算总数。' },
    { knowledgePointIds: [readTables], prompt: '一次调查表写明调查了参加活动的本班同学，蓝色12票、绿色8票、黄色5票。哪句话符合数据范围？', answer: '只能说这次被调查的同学中，蓝色票数最多', distractors: ['能说明全校同学都最喜欢蓝色', '能确定下个月蓝色一定仍然最多'], hint: '把结论限定在表格记录的对象和这一次调查。', explanation: '表格只记录了本次参加调查的同学，不能代表全校或未来的选择。' },
    { knowledgePointIds: [readTables], prompt: '小组报告说“大家都喜欢阅读”，统计表只有本班一次投票数据。怎样检查这句话是否准确？', answer: '先找出对应数据，再检查结论有没有超出调查范围', distractors: ['只看阅读是不是表格第一行', '只要有阅读票数就说明所有人都喜欢'], hint: '看清数据能支持哪些人、哪一次的结论。', explanation: '用具体票数支持结论，并限定为本班这次投票，不能把部分数据说成“大家都喜欢”。' },
    { knowledgePointIds: [survey, organize], prompt: '要比较两个班各自最喜欢的运动，怎样记录才不把两班数据混在一起？', answer: '按班级分开记录各项运动的人数', distractors: ['把两班人数先合成一张总票数', '只记合计票数最多的运动'], hint: '保留每个班和每种运动对应的票数。', explanation: '分开记录班级和运动类别，才能分别比较两个班的调查结果。' },
    { knowledgePointIds: [survey, organize], prompt: '班级共有24人参加一人一票的调查，统计表却合计26票。哪种核查最有针对性？', answer: '每人只能投一票时，先查重复记录或人数登记', distractors: ['先猜哪种选择应该最多', '先删除票数最少的一类'], hint: '把总票数和参加人数、投票规则一起核对。', explanation: '一人一票时总数不应超过参加人数，应先检查重复投票、重复计数或人数登记。' },
    { knowledgePointIds: [survey, organize], prompt: '想知道班级同学更常选择哪种课间活动，怎样准备调查才方便整理？', answer: '先明确想知道的内容，再设选项并统一记录方法', distractors: ['先记录同学的身高，再猜活动选择', '让每人随意写答案，之后不做分类'], hint: '问题、选择项目和记录方式要互相对应。', explanation: '明确调查问题、设置清楚选项并统一记录方法，便于之后分类和统计。' },
    { knowledgePointIds: [readTables], prompt: '两个小组都调查最喜欢的运动：甲组篮球8票、跳绳6票；乙组篮球5票、跳绳9票。篮球一共多少票？', answer: '13票', distractors: ['14票', '17票'], hint: '先找出两个小组中名称相同的类别。', explanation: '篮球类别要合并8票和5票，8＋5＝13票。' },
    { knowledgePointIds: [readTables], prompt: '两种阅读活动各得9票，另一种得6票。报告调查结果时怎样表达？', answer: '应如实报告两项并列，不能只保留其中一项', distractors: ['任选一项说成唯一最多', '把其中一项票数改成10票'], hint: '相同的最高票数要如实保留。', explanation: '两项都是9票，所以应报告并列最多，不应删除或修改其中一项。' },
    { knowledgePointIds: [readTables], prompt: '两班图书选择分别是：甲班故事书7票、科普书5票；乙班故事书5票、科普书7票。两班合起来哪种书票数更多？', answer: '两种合计相同，各12票', distractors: ['故事书更多', '科普书更多'], hint: '先把相同类别的两班票数分别相加。', explanation: '故事书合计7＋5＝12票，科普书合计5＋7＝12票，两种合计相同。' },
    { knowledgePointIds: [survey, readTables], prompt: '要向同学介绍一份小调查，怎样让听者知道结论从哪里来？', answer: '说明调查对象、时间和记录方式，再报告数据结论', distractors: ['只说最喜欢的项目，不说调查了谁', '把这一次的结果说成以后都不会变化'], hint: '交代数据的来源和范围，再说表中发现。', explanation: '说明对象、时间和记录方式后再报告结果，听者才能判断结论适用范围。' },
    { knowledgePointIds: [organize, readTables], prompt: '统计表三类票数相加为21，原始记录上共有20张有效选票。怎样查找总数差异？', answer: '先找出总数差异，再逐类核对原始记录', distractors: ['把21改成20，不查每一类', '随便从票数最多的一类减去一票'], hint: '从总数发现问题后，要回到各类记录定位原因。', explanation: '先确认两种总数相差一票，再逐类对照原始选票，才能确定重复或分类错误。' },
    { knowledgePointIds: [survey, organize], prompt: '一份统计结果要交给另一个小组复查，记录里应保留哪些信息？', answer: '记录每项数据及票数，并写明这次调查的范围', distractors: ['只留下票数最多的一项', '只写表格用了几种颜色'], hint: '复查者要知道数据从哪里来、每类记了多少。', explanation: '保留类别、票数和调查范围，其他小组才能核对记录并理解结论。' },
  ],
};

export const grade2Term2MathUnit01SupplementalActivities: Grade2Term2MathUnit01SupplementalActivity[] = Object.entries(drafts).flatMap(([difficulty, items]) => (
  items.map((draft, index) => {
    const correctOptionIndex = (index % 3) as 0 | 1 | 2;
    const options = [...draft.distractors];
    options.splice(correctOptionIndex, 0, draft.answer);
    return {
      difficulty: difficulty as Difficulty,
      sourceUnitId,
      knowledgePointIds: draft.knowledgePointIds,
      activity: {
        id: `${idPrefix}-${difficulty}-${String(index + 1).padStart(2, '0')}`,
        kind: 'choice' as const,
        prompt: draft.prompt,
        options: options.map((label, optionIndex) => ({ id: `option-${optionIndex + 1}`, label })),
        correctOptionId: `option-${correctOptionIndex + 1}`,
        hint: draft.hint,
        explanation: draft.explanation,
      },
    };
  })
));
