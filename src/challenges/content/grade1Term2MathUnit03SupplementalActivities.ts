import type { ChoiceActivityDefinition, Difficulty } from '../../content/types';

export interface Grade1Term2MathUnit03SupplementalActivity {
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

const sourceUnitId = 'grade-1/term-2/math/unit-03';
const idPrefix = 'challenge-supplement-grade-1-term-2-math-unit-03';
const standard = ['classification-standard'];
const recording = ['classification-recording'];
const results = ['classification-results'];
const checking = ['classification-checking'];

const drafts: Record<Difficulty, ActivityDraft[]> = {
  basic: [
    { knowledgePointIds: standard, prompt: '把书本、铅笔和积木分成“学习用品”和“玩具”两组，按什么分类最合适？', answer: '按物品的用途分成学习用品和玩具', distractors: ['看物品的颜色', '看物品的大小'], hint: '想想哪些物品用来学习，哪些用来玩。', explanation: '书本和铅笔用来学习，积木用来玩，按用途分类能分清这两组。' },
    { knowledgePointIds: standard, prompt: '要整理颜色不同的画纸，应该先选哪项分类标准？', answer: '看物品的颜色', distractors: ['看画纸的厚薄', '看画纸是谁的'], hint: '要比较的是画纸的哪一方面？', explanation: '按照颜色分类，可以把相同颜色的画纸放在一起。' },
    { knowledgePointIds: standard, prompt: '收拾球、积木和绘本时，想分出“可以玩的”和“用来阅读的”，该按什么分组？', answer: '按物品的用途分组', distractors: ['按物品的颜色分组', '按物品放在房间的哪边分组'], hint: '球和积木可以做什么？绘本又用来做什么？', explanation: '球和积木可以玩，绘本用来阅读；按用途分组符合整理目的。' },
    { knowledgePointIds: recording, prompt: '同学们要统计一盒彩色卡片的数量，怎样记录不容易漏数？', answer: '给每张卡片做一个记号，数过的卡片放到一边', distractors: ['看一眼卡片堆，直接猜一个数', '数完后把卡片放回去再数一遍'], hint: '想一个办法，让数过和没数过的卡片分得开。', explanation: '每数一张做一个记号并移到一边，可以避免漏数或重复数。' },
    { knowledgePointIds: results, prompt: '记录表上写着红色积木3块、蓝色积木4块，一共有多少块？', answer: '红色3块，蓝色4块，共7块', distractors: ['红色3块，蓝色4块，共6块', '红色3块，蓝色4块，共8块'], hint: '把红色和蓝色两组的数量合起来。', explanation: '3块加4块等于7块，所以一共有7块。' },
    { knowledgePointIds: checking, prompt: '桌上有8块积木，记录表写红色4块、蓝色3块。记录少了多少块？', answer: '少了1块', distractors: ['少了2块', '多了1块'], hint: '先把记录的两组数量合起来，再和8比较。', explanation: '4加3等于7，桌上有8块，记录少了1块。' },
    { knowledgePointIds: recording, prompt: '整理两盒彩笔时，怎样记录每种颜色的支数更可靠？', answer: '把每盒彩笔只数一次，再分别记录', distractors: ['两盒彩笔放在一起估一估', '每支彩笔数两次后记下较大的数'], hint: '数过的彩笔要能和还没数的分开。', explanation: '每盒只数一次并分别记录，可以减少漏数和重复数。' },
    { knowledgePointIds: standard, prompt: '小红想把苹果分成“大苹果”和“小苹果”两组，应按什么分类？', answer: '把苹果按大小分组', distractors: ['把苹果按数量分组', '把苹果按谁先拿到分组'], hint: '“大”和“小”说的是苹果的哪种特点？', explanation: '“大”和“小”表示大小，所以应按大小分类。' },
    { knowledgePointIds: results, prompt: '盒子里红色书签有2枚，蓝色书签有2枚，两种颜色的书签一共有几枚？', answer: '4枚', distractors: ['3枚', '5枚'], hint: '把两种颜色的书签数量加起来。', explanation: '2枚加2枚等于4枚，一共有4枚书签。' },
    { knowledgePointIds: results, prompt: '记录表上红色积木3块、蓝色积木4块，哪一组多？多几个？', answer: '蓝色组多1块', distractors: ['红色组多1块', '两组一样多'], hint: '比较4和3，看看哪个数大。', explanation: '4比3多1，所以蓝色组多1块。' },
    { knowledgePointIds: standard, prompt: '按“水果”和“文具”整理物品时，一支铅笔应该怎样放？', answer: '每件物品只放进一个组', distractors: ['同时放进水果组和文具组', '不看分类标准，放进任意一组'], hint: '每件物品都要按同一个标准来判断。', explanation: '铅笔是文具，应只放进文具组，不能重复放进两个组。' },
    { knowledgePointIds: standard, prompt: '先把红、蓝两种颜色的积木分开，再分别数一数。第一步应该做什么？', answer: '先按颜色分类，再分别数两组', distractors: ['先把所有积木数两遍', '先按积木的大小分组'], hint: '题目要求分别知道两种颜色各有多少块。', explanation: '先按颜色分组，再分别清点，才能得到红色和蓝色各自的数量。' },
    { knowledgePointIds: results, prompt: '图形记录表上三角形2个、圆形3个，一共有几个图形？', answer: '三角形2个，圆形3个，共5个', distractors: ['三角形2个，圆形3个，共4个', '三角形2个，圆形3个，共6个'], hint: '把三角形和圆形的数量合起来。', explanation: '2个加3个等于5个，一共有5个图形。' },
    { knowledgePointIds: checking, prompt: '清点后发现桌上有5本书，记录表上只记了4本。记录少了几本？', answer: '少数了1本', distractors: ['少数了2本', '多记了1本'], hint: '用实际数量减去记录的数量。', explanation: '5本减去记录的4本，少记了1本。' },
    { knowledgePointIds: recording, prompt: '记录表只写了物品总数，还想知道每组各有多少，应该补记什么？', answer: '在每个组名旁分别记录数量', distractors: ['只把物品总数再写一次', '只记录物品的颜色'], hint: '要读出各组数量，记录表上需要分别写出哪些信息？', explanation: '只有总数看不出各组各有多少，应在每个组名旁分别记下数量。' },
    { knowledgePointIds: standard, prompt: '两组分别是“大积木”和“小积木”，一块蓝色小积木应放在哪组？', answer: '小积木组', distractors: ['蓝色积木组', '大积木组和小积木组都放'], hint: '这次分类标准是积木的大小，不是颜色。', explanation: '题目按大小分组，蓝色小积木应放入小积木组。' },
  ],
  advanced: [
    { knowledgePointIds: standard, prompt: '要统计哪些玩具能滚动，可以按哪项标准把玩具分组？', answer: '按是否带轮子分类', distractors: ['按玩具的颜色分类', '按玩具放在哪个柜子分类'], hint: '想知道玩具能不能滚动，先看它有什么特点。', explanation: '是否带轮子与能否滚动有关，按这一标准分类能帮助回答问题。' },
    { knowledgePointIds: recording, prompt: '小组统计猫和狗的数量，怎样做能避免同一只动物被记两次？', answer: '把每只动物只数一次，并记在对应的一组', distractors: ['先把猫和狗合起来估数', '每只动物都记在猫和狗两组'], hint: '数过的动物要做标记，也要放进合适的组。', explanation: '每只动物只清点一次，并按类别记录，能避免重复。' },
    { knowledgePointIds: results, prompt: '记录表上猫有2只、狗有3只。一共有几只小动物？', answer: '猫2只，狗3只，共5只', distractors: ['猫2只，狗3只，共4只', '猫2只，狗3只，共6只'], hint: '把猫和狗的数量合在一起。', explanation: '2只加3只等于5只，一共有5只小动物。' },
    { knowledgePointIds: results, prompt: '盒子里蓝色书签4枚、红色书签3枚。哪种颜色的书签多？', answer: '蓝色书签多1枚', distractors: ['红色书签多1枚', '两种颜色一样多'], hint: '比较4枚和3枚。', explanation: '蓝色有4枚，红色有3枚，蓝色多1枚。' },
    { knowledgePointIds: standard, prompt: '同学想知道几只杯子分别是什么颜色，怎样整理更方便？', answer: '把所有杯子按颜色分组后分别清点', distractors: ['按杯子的摆放位置分组', '把杯子混在一起只记录总数'], hint: '问题关心的是杯子的哪种特点？', explanation: '按颜色分组并分别清点，就能知道每种颜色有多少只。' },
    { knowledgePointIds: results, prompt: '盘子里苹果4个、梨3个，水果一共有几个？', answer: '苹果4个，梨3个，共7个', distractors: ['苹果4个，梨3个，共6个', '苹果4个，梨3个，共8个'], hint: '把两种水果的数量相加。', explanation: '4个加3个等于7个，一共有7个水果。' },
    { knowledgePointIds: recording, prompt: '数完一堆图形后，怎样检查有没有漏记或重复记？', answer: '把每个图形只记录一次，再核对总数', distractors: ['只看记录表，不再看图形', '把其中一个图形多记一次'], hint: '记录的每一项要和实际图形一一对应。', explanation: '每个图形只记录一次，并核对记录总数与实际数量是否一致。' },
    { knowledgePointIds: results, prompt: '篮子里苹果4个、梨3个，苹果比梨多几个？', answer: '1个', distractors: ['2个', '7个'], hint: '用苹果的数量减去梨的数量。', explanation: '4减3等于1，苹果比梨多1个。' },
    { knowledgePointIds: results, prompt: '记录表上黄色卡片4张、绿色卡片5张，两种卡片一共几张？', answer: '黄色4张，绿色5张，共9张', distractors: ['黄色4张，绿色5张，共8张', '黄色4张，绿色5张，共10张'], hint: '把两种颜色的卡片数量相加。', explanation: '4张加5张等于9张。' },
    { knowledgePointIds: results, prompt: '玩具车组有5辆，积木组有3件。哪组数量多？多几个？', answer: '玩具车组多2辆', distractors: ['积木组多2件', '两组一样多'], hint: '比较5和3，相差几个？', explanation: '5比3多2，所以玩具车组多2辆。' },
    { knowledgePointIds: recording, prompt: '登记瓶子里的饮料时，同一个瓶子应该怎么记录？', answer: '每个瓶子只能按一种饮料记录，不能重复算', distractors: ['一个瓶子同时记进两种饮料', '只记录瓶子的颜色，不看饮料'], hint: '每个瓶子里的饮料只属于一个类别。', explanation: '每个瓶子应按实际饮料记入一个类别，不能重复计数。' },
    { knowledgePointIds: checking, prompt: '一共有8块积木，红色3块、蓝色5块。怎样核对这份记录？', answer: '两组数量相加应等于全部积木数', distractors: ['只比较红色组和蓝色组谁多', '只数红色积木，不看蓝色组'], hint: '把两组记录合起来和8比较。', explanation: '3加5等于8，与全部积木数相同，记录总数核对正确。' },
    { knowledgePointIds: standard, prompt: '想知道红色和蓝色卡片哪种更多，整理时先怎样做？', answer: '明确按颜色比较，再把卡片分组记录', distractors: ['按卡片大小分组记录', '只记卡片摆在桌子的哪一边'], hint: '问题问的是卡片的哪一个特点？', explanation: '题目要比较颜色，应按颜色整理并记录，不能用大小或摆放位置代替。' },
    { knowledgePointIds: results, prompt: '停车场有红色小车3辆、蓝色小车4辆，一共有几辆？', answer: '红色3辆，蓝色4辆，共7辆', distractors: ['红色3辆，蓝色4辆，共6辆', '红色3辆，蓝色4辆，共8辆'], hint: '把两种颜色的小车数量合起来。', explanation: '3辆加4辆等于7辆，一共有7辆小车。' },
    { knowledgePointIds: checking, prompt: '桌上有6支铅笔，记录表上只记了5支。应该怎样修正？', answer: '重新清点并补记漏掉的1支铅笔', distractors: ['把记录改成4支', '不核对，保留5支'], hint: '先确认实际数量和已记录数量相差多少。', explanation: '重新数后确认有6支，记录5支少了1支，应补记1支。' },
    { knowledgePointIds: results, prompt: '记录表上红色纽扣5颗、蓝色纽扣2颗、黄色纽扣4颗。哪种颜色的纽扣最少？', answer: '蓝色最少，有2颗', distractors: ['黄色最少，有4颗', '红色最少，有5颗'], hint: '分别比较三组记录的数量。', explanation: '2颗比4颗和5颗都少，所以蓝色纽扣最少，有2颗。' },
    { knowledgePointIds: standard, prompt: '整理书包时，想分别知道文具和书本有多少，怎样分组？', answer: '按物品类别分成文具和书本，再分别计数', distractors: ['按物品颜色分成两组', '只记录书包里物品的总数'], hint: '问题要分别知道哪两类物品的数量？', explanation: '按物品类别分成文具和书本，再分别计数，能回答两个数量问题。' },
    { knowledgePointIds: [recording[0]!, checking[0]!], prompt: '三组物品记录的数量加起来比实际总数少1件，应该怎样复核？', answer: '按同一标准重新分组，再逐组清点并核对总数', distractors: ['只把其中一组的数量加1', '不再清点，直接改写总数'], hint: '既要检查分类，也要确认每件物品都只数一次。', explanation: '重新按同一标准分组并逐组清点，再把各组数量与总数比较，才能找到漏记。' },
    { knowledgePointIds: checking, prompt: '清点小猫3只、小狗2只，记录表共记了5只；实际还有一只小猫没记。记录有什么问题？', answer: '可能少数或漏记了1只', distractors: ['可能多记了1只', '记录数量和实际数量完全相同'], hint: '把记录的5只和实际6只比较。', explanation: '实际有6只，记录表只有5只，少了1只，说明可能漏数或漏记。' },
    { knowledgePointIds: results, prompt: '记录表有红色卡片3张、蓝色4张、黄色2张。三种颜色一共有几张？', answer: '红色3张、蓝色4张、黄色2张，共9张', distractors: ['红色3张、蓝色4张、黄色2张，共8张', '红色3张、蓝色4张、黄色2张，共10张'], hint: '先把三组卡片的数量依次合起来。', explanation: '3张加4张再加2张等于9张。' },
    { knowledgePointIds: [standard[0]!, checking[0]!], prompt: '整理卡片后发现有一张蓝色卡片放进了红色组，怎样检查并改正？', answer: '逐张核对颜色和所在组，再重新计数', distractors: ['只比较两组数量，不看卡片颜色', '把红色组和蓝色组的数量对调'], hint: '检查分类是否正确，要逐张对照颜色和所在组。', explanation: '逐张检查颜色和所在组，把放错的卡片移回正确组，再重新计数。' },
    { knowledgePointIds: results, prompt: '图形记录表里圆形5个、三角形4个、正方形3个。哪两组的数量合起来是9个？', answer: '圆形和三角形', distractors: ['圆形和正方形', '三角形和正方形'], hint: '分别把两组的数量相加，找出等于9的一组。', explanation: '圆形5个加三角形4个是9个；圆形和正方形是8个，三角形和正方形是7个。' },
  ],
  high: [
    { knowledgePointIds: results, prompt: '记录表上红色图书4本、蓝色图书3本。哪种颜色的图书少？少几本？', answer: '蓝色图书少1本', distractors: ['红色图书少1本', '两种颜色一样多'], hint: '比较4本和3本，数量较少的一组少多少？', explanation: '蓝色有3本，红色有4本，蓝色图书少1本。' },
    { knowledgePointIds: standard, prompt: '同学按颜色整理了水果。要检查每个水果有没有放对组，先做什么？', answer: '先确定分类标准，再逐件检查放置是否正确', distractors: ['先比较哪种水果更多', '先把所有水果放进同一组'], hint: '检查放置是否正确，需要先知道按什么标准分组。', explanation: '先明确按颜色分类，再逐件查看颜色和所在组是否一致。' },
    { knowledgePointIds: results, prompt: '记录表上小猫3只、小狗2只。小动物共有几只？小猫多几只？', answer: '小猫3只、小狗2只，共5只；小猫多1只', distractors: ['小猫3只、小狗2只，共4只；小狗多1只', '小猫3只、小狗2只，共6只；小猫多2只'], hint: '先把两组数量相加，再比较3和2。', explanation: '3加2等于5只；3比2多1只。' },
    { knowledgePointIds: [recording[0]!, checking[0]!], prompt: '桌上实际有7张卡片，记录表却记了8张。检查后发现一张被记了两次，错在哪里？', answer: '有1张卡片被重复记录', distractors: ['有1张卡片漏记', '卡片总数和记录数相同'], hint: '记录比实际多，想想是否有卡片被数了不止一次。', explanation: '记录8张、实际7张，多出1张；有一张卡片被重复记了。' },
    { knowledgePointIds: [results[0]!, checking[0]!], prompt: '桌上共有8个积木，红色3个、蓝色5个。哪项记录能证明分类总数对得上？', answer: '两组数量相加是8，与总数相同', distractors: ['红色比蓝色少2个，所以记录正确', '只数红色组有3个，所以总数正确'], hint: '把红、蓝两组的数量相加，再与8比较。', explanation: '3加5等于8，与积木总数相同，分类记录的总数核对正确。' },
    { knowledgePointIds: results, prompt: '红色积木2个、蓝色积木3个，蓝色比红色多几个？', answer: '蓝色比红色多1个', distractors: ['红色比蓝色多1个', '蓝色比红色多2个'], hint: '用较多的一组减去较少的一组。', explanation: '3减2等于1，蓝色比红色多1个。' },
    { knowledgePointIds: recording, prompt: '统计动物园里猫和狗的数量时，怎样避免把同一只动物数两次？', answer: '每只小动物只能记录一次', distractors: ['每只动物都记在猫和狗两组', '数过的动物再从头数一遍但不做标记'], hint: '每数完一只，就做标记或移到已数的一边。', explanation: '每只动物只记录一次，并把数过的动物标记出来，能避免重复计数。' },
    { knowledgePointIds: results, prompt: '记录表按大小整理苹果：大苹果4个，小苹果2个。小苹果有几个？', answer: '2个', distractors: ['4个', '6个'], hint: '找到记录表中“小苹果”这一组的数量。', explanation: '记录表写着小苹果2个，所以小苹果有2个。' },
    { knowledgePointIds: standard, prompt: '同学整理书包里的物品，想知道文具各有多少。应怎样分类记录？', answer: '把所有物品按同一标准分组后，再分别计数', distractors: ['按物品的摆放顺序记录，不分组', '只记录物品总数，不区分文具和书本'], hint: '要知道文具数量，就需要把文具和其他物品分清。', explanation: '按物品类别用同一个标准分组，再分别计数，才能读出文具数量。' },
    { knowledgePointIds: results, prompt: '花坛里红花3朵、黄花4朵，一共有几朵花？', answer: '总数应是7朵', distractors: ['总数应是6朵', '总数应是8朵'], hint: '把红花和黄花的数量加起来。', explanation: '3朵加4朵等于7朵，一共有7朵花。' },
    { knowledgePointIds: [recording[0]!, checking[0]!], prompt: '小组数积木时，记录比桌上实际数量少1块。最可能是哪种情况？', answer: '少记录了1块', distractors: ['有1块积木被重复记录', '记录数量和实际数量一样'], hint: '记录少于实际数量，可能发生了什么？', explanation: '记录比实际少1块，说明可能漏数或漏记了1块。' },
    { knowledgePointIds: [recording[0]!, checking[0]!], prompt: '两组同学统计图形，记录数和图形总数对不上。先怎样查找问题？', answer: '先检查是否有物品漏记或重复记录', distractors: ['直接把其中一组数量改大', '不看图形，只保留记录表'], hint: '重新清点时，要留意有没有没数到或数了两遍的图形。', explanation: '逐个重新清点并检查漏记、重复，才能找到记录不一致的原因。' },
    { knowledgePointIds: [results[0]!, checking[0]!], prompt: '篮子里实际有9张贴纸，红色4张、蓝色4张。记录表少了几张？', answer: '贴纸总数比记录多1张', distractors: ['记录表比实际多1张', '记录总数和实际数量相同'], hint: '先把两种颜色的贴纸数量相加，再和9比较。', explanation: '4加4等于8，实际有9张，贴纸总数比记录多1张。' },
    { knowledgePointIds: [standard[0]!, checking[0]!], prompt: '要检查“按颜色分类”的记录有没有错，哪种检查方法合适？', answer: '先找出分类标准，再逐项检查记录', distractors: ['只比较物品的大小', '只看记录表写得是否整齐'], hint: '记录要符合题目要求的分类标准。', explanation: '先确认标准是颜色，再检查每件物品是否记在相同颜色的一组。' },
    { knowledgePointIds: [recording[0]!, checking[0]!], prompt: '记录表写红色3个、蓝色4个，实际物品总数是8个。怎样重新核对？', answer: '重新数每种颜色，并检查有没有漏放或重复', distractors: ['直接把总数改成7个', '只重新数红色物品'], hint: '先比较两组记录的和与实际总数，再检查每件物品。', explanation: '3加4等于7，与实际总数8不符；应重新按颜色清点，并检查是否漏放或重复记录。' },
    { knowledgePointIds: [results[0]!, checking[0]!], prompt: '桌上有7件物品，分类记录是红色3件、蓝色4件。怎样确认记录总数没有漏？', answer: '分类数量之和应与物品总数一致', distractors: ['只要红色组数量正确就够了', '红色组和蓝色组必须数量一样'], hint: '把两组记录相加并和7比较。', explanation: '3加4等于7，与桌上物品总数一致，记录没有漏。' },
    { knowledgePointIds: [results[0]!, checking[0]!], prompt: '文具盒里有铅笔3支、橡皮2块、尺子1把，共6件。记录表写文具7件，错在哪里？', answer: '记录比实际多1件', distractors: ['记录比实际少1件', '记录数量和实际数量相同'], hint: '把三种文具的数量合起来，再和7比较。', explanation: '3加2再加1等于6，记录写7件，多了1件。' },
    { knowledgePointIds: [recording[0]!, checking[0]!], prompt: '桌上实际有8块积木，记录表上红色3块、蓝色4块。少记录了几块？', answer: '还少记录1块', distractors: ['多记录了1块', '记录数和实际数量相同'], hint: '先把红色和蓝色的记录数相加。', explanation: '3加4等于7，实际有8块，少记录了1块。' },
    { knowledgePointIds: [standard[0]!, checking[0]!], prompt: '实际有红色4本、蓝色3本，共7本；记录总数也是7本，但有一本蓝色书被记到红色组。怎样找出错分？', answer: '逐件检查颜色和记录组别，总数相同也可能分错', distractors: ['不用检查，因为总数和7相同', '只重数红色组，不看书的颜色'], hint: '总数相同只能说明数量合上，还要检查每本书是否按颜色放对。', explanation: '虽然总数正确，但有一本书分错组；逐件核对颜色和组别才能发现。' },
    { knowledgePointIds: results, prompt: '记录表有小猫4只、小狗3只、小鸟2只。共有几只？小猫比小狗多几只？', answer: '共9只，小猫比小狗多1只', distractors: ['共8只，小狗比小猫多1只', '共9只，小猫比小狗多2只'], hint: '先把三组数量合起来，再比较小猫和小狗。', explanation: '4加3加2等于9只；4比3多1只。' },
    { knowledgePointIds: [standard[0]!, checking[0]!], prompt: '8个果子按颜色分组：红色4个、绿色4个。一枚绿色果子被放进红色组，总数还会一样吗？', answer: '总数相同不能发现错分，要逐件检查', distractors: ['总数会少1个，只比较总数就能发现', '总数会多1个，不用检查分类'], hint: '想想一枚果子只是换了组，是否改变了所有果子的总数。', explanation: '换组不会改变总数，所以还需逐件按颜色检查是否放对组。' },
    { knowledgePointIds: results, prompt: '记录表上红色4件、蓝色3件、黄色2件。红色比黄色多几件？蓝色和黄色合起来几件？', answer: '红色比黄色多2件，蓝色和黄色共5件', distractors: ['红色比黄色多1件，蓝色和黄色共6件', '红色比黄色多2件，蓝色和黄色共4件'], hint: '分别计算4减2和3加2。', explanation: '4减2等于2；3加2等于5。' },
    { knowledgePointIds: [recording[0]!, results[0]!], prompt: '记录表只写“积木共10块”，还想知道红色组有多少块，应补充什么记录？', answer: '把红色组和其他组的数量分别记下来', distractors: ['只把总数10再写一遍', '只记录积木的摆放位置'], hint: '总数不能说明每组各有多少，需要补充分组数量。', explanation: '总数10块不能看出红色组数量，应分别记录红色组和其他组的数量。' },
  ],
};

function createActivity(draft: ActivityDraft, difficulty: Difficulty, index: number): Grade1Term2MathUnit03SupplementalActivity {
  const id = `${idPrefix}-${difficulty}-${String(index + 1).padStart(2, '0')}`;
  const correctOptionIndex = index % 3;
  const labels = [draft.answer, ...draft.distractors];
  [labels[0], labels[correctOptionIndex]] = [labels[correctOptionIndex]!, labels[0]!];
  const options = labels.map((label, optionIndex) => ({ id: `${id}/option-${String(optionIndex + 1).padStart(2, '0')}`, label }));

  const activity: ChoiceActivityDefinition = {
    id,
    kind: 'choice',
    prompt: draft.prompt,
    options,
    correctOptionId: options[correctOptionIndex]!.id,
    hint: draft.hint,
    explanation: draft.explanation,
  };

  return { difficulty, sourceUnitId, knowledgePointIds: draft.knowledgePointIds, activity };
}

export const grade1Term2MathUnit03SupplementalActivities = (Object.entries(drafts) as [Difficulty, ActivityDraft[]][])
  .flatMap(([difficulty, items]) => items.map((draft, index) => createActivity(draft, difficulty, index)));
