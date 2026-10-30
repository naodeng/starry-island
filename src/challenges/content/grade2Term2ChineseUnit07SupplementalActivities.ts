import type { ChoiceActivityDefinition, Difficulty } from '../../content/types';

export interface Grade2Term2ChineseUnit07SupplementalActivity {
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

const sourceUnitId = 'grade-2/term-2/chinese/unit-07';
const idPrefix = 'challenge-supplement-grade-2-term-2-chinese-unit-07';
const traits = 'animal-traits-and-respectful-observation';
const sequence = 'story-event-sequence-and-cause-effect';
const planning = 'needs-based-planning-and-revision';
const environment = 'animal-needs-and-environment-change';
const growth = 'growth-sequence-and-patient-waiting';
const evidence = 'observation-evidence-and-inference';

export const grade2Term2ChineseUnit07CoreKnowledgePointIds = [
  traits,
  sequence,
  planning,
  environment,
  growth,
  evidence,
] as const;

const drafts: Record<Difficulty, ActivityDraft[]> = {
  basic: [
    {
      knowledgePointIds: [traits, evidence],
      prompt: '伙伴看到两只外形不同的小兔，怎样写观察记录更合适？',
      answer: '分别写下看到的特点，不急着说哪一只不正常',
      distractors: ['只记下更像自己想象的那一只', '把外形不同当作取笑动物的理由'],
      hint: '先记录实际看到的样子，再尊重每只动物。',
      explanation: '分别记下特点能保留观察结果，也不会把不同外形说成错误。',
    },
    {
      knowledgePointIds: [evidence],
      prompt: '看到蜗牛爬过一片叶子，哪句话还需要继续观察来核实？',
      answer: '它可能正在寻找食物',
      distractors: ['蜗牛刚才爬过这片叶子', '叶子上留下了一道湿痕'],
      hint: '想想哪句话是在解释原因，而不是记录看到的线索。',
      explanation: '爬过叶子和留下湿痕是可见线索；寻找食物只是可能的解释。',
    },
    {
      knowledgePointIds: [traits],
      prompt: '在校园角落发现一只不认识的小虫，怎样观察更合适？',
      answer: '保持距离记下外形，请老师一起确认',
      distractors: ['抓起来带回教室，再慢慢辨认', '用树枝拨动它，看它会不会逃走'],
      hint: '观察时既要照顾小动物，也要保证自己的安全。',
      explanation: '保持距离并请老师帮助，能减少惊扰小虫或被它伤到的风险。',
    },
    {
      knowledgePointIds: [traits, evidence],
      prompt: '有人说“耳朵小的动物一定听不清”，怎样回应更有依据？',
      answer: '先查找可靠介绍，不只凭耳朵大小下结论',
      distractors: ['不查资料，马上说小耳朵动物都听不清', '只看一张图片就判断它的听力'],
      hint: '外形能被看见，听力还需要其他信息来了解。',
      explanation: '不能只用一个外形特点推断动物能力；查可靠资料能帮助核实。',
    },
    {
      knowledgePointIds: [sequence],
      prompt: '讲一个小故事时，怎样安排“开始、变化、结果”更清楚？',
      answer: '按事情实际发生的先后介绍',
      distractors: ['先讲结果，再随便挑几件事放在中间', '把不相关的事情混在一起讲'],
      hint: '想想听故事的人怎样才能跟上时间顺序。',
      explanation: '按先后介绍，听众就容易了解事情怎样一步步发展。',
    },
    {
      knowledgePointIds: [sequence, evidence],
      prompt: '故事中的角色先试了一个办法，后来遇到新情况。要说明变化，先找什么？',
      answer: '找出新情况出现前后，角色做法和结果有什么不同',
      distractors: ['只记角色的名字，不看发生了什么', '先猜结尾，再把猜想当成故事内容'],
      hint: '比较变化前后的行动和结果。',
      explanation: '前后的行动与结果能帮助读者看清故事变化，猜想要和故事线索分开。',
    },
    {
      knowledgePointIds: [planning],
      prompt: '班级书签摊的低年级同学看不懂摊位标记，先怎样改进？',
      answer: '听听他们哪里看不懂，再换成清楚的图示',
      distractors: ['不听反馈，只把标记写得更小', '取消所有标记，让大家自己猜'],
      hint: '改进办法要回应使用者遇到的困难。',
      explanation: '先了解困难再调整图示，能让新的安排更适合读者。',
    },
    {
      knowledgePointIds: [planning, evidence],
      prompt: '小组试用的分类牌没有帮大家找到图书，下一步怎样做？',
      answer: '观察大家卡在哪里，再调整分类并重新试用',
      distractors: ['不看使用情况，重复贴同一张牌', '怪大家没有认真找，就不再检查'],
      hint: '用实际使用情况找出需要调整的地方。',
      explanation: '观察困难、调整安排并再次试用，能检查新办法是否有效。',
    },
    {
      knowledgePointIds: [environment, evidence],
      prompt: '公园池边的一块草地变少了，怎样介绍这个变化最准确？',
      answer: '写下草地的变化，再把它会不会影响动物生活说成猜想',
      distractors: ['直接说池边所有动物都已经离开', '说草地变少一定是动物造成的'],
      hint: '把眼前的变化和对原因的猜测分开。',
      explanation: '草地变少是看到的变化，动物是否受影响、原因是什么还要继续观察。',
    },
    {
      knowledgePointIds: [environment],
      prompt: '想了解小池周围的环境，哪组记录更有帮助？',
      answer: '记下不同日期看到的水边植物、遮挡和小动物活动',
      distractors: ['只记今天最喜欢的一种颜色', '只写“池塘很好看”，不说明看到什么'],
      hint: '环境记录要写出具体事物和观察时间。',
      explanation: '植物、遮挡和动物活动都是环境线索，分日期记录更方便比较。',
    },
    {
      knowledgePointIds: [growth, evidence],
      prompt: '看见一只小毛虫结了茧，连续两天外面看起来差不多，怎样做更好？',
      answer: '记下日期和观察结果，过一段时间再继续观察',
      distractors: ['马上拆开它的茧，看看里面有没有变化', '因为两天没变化，就说它不会再长大'],
      hint: '成长需要时间，观察时不要打扰小动物。',
      explanation: '记录日期并继续观察，能看见较长时间里的变化，也能保护小动物。',
    },
    {
      knowledgePointIds: [growth, sequence],
      prompt: '制作成长记录时，怎样让伙伴看懂变化的先后？',
      answer: '给每张观察图写上日期，再按日期排列',
      distractors: ['把图片打乱，只按颜色排放', '只留最后一张图片，不写日期'],
      hint: '时间标记可以帮助读者理解变化顺序。',
      explanation: '日期和先后排列能说明记录的时间过程，不会把不同阶段混在一起。',
    },
    {
      knowledgePointIds: [sequence, planning],
      prompt: '故事中的角色发现原办法不合适，怎样整理它接下来的行动？',
      answer: '先记下遇到的新情况，再写出调整后的办法和结果',
      distractors: ['删掉新情况，只保留最初的办法', '不看结果，只列出许多办法'],
      hint: '让新线索、调整和结果连在一起。',
      explanation: '记录问题、行动和结果，能看出角色为什么调整以及调整后怎样。',
    },
    {
      knowledgePointIds: [environment, planning],
      prompt: '公园工作人员在池边增加了一处遮挡，小组想知道动物会不会使用，怎样开始？',
      answer: '先在安全位置观察几次，并记录出现的时间和地点',
      distractors: ['立刻把动物搬到遮挡处', '只看一次就确定所有动物都喜欢这里'],
      hint: '先观察实际情况，不要擅自改变动物的生活环境。',
      explanation: '多次记录能帮助了解真实情况；儿童不应随意搬动动物。',
    },
  ],
  advanced: [
    {
      knowledgePointIds: [traits, evidence],
      prompt: '两组同学在不同时间观察同一种鸟，记录的颜色看起来不一样。怎样比较更合理？',
      answer: '先核对时间、地点和光线，再对照各自的记录',
      distractors: ['只相信写得更长的一组', '不看观察条件，就说一组肯定看错了'],
      hint: '比较记录前，先看看观察条件是否相近。',
      explanation: '时间、地点和光线可能影响看到的样子；核对条件后再比较更公平。',
    },
    {
      knowledgePointIds: [traits, evidence],
      prompt: '自然角的说明牌说一种鸟“总在白天活动”，怎样核实这句话？',
      answer: '多次记录不同时间的活动，再查可靠资料核实',
      distractors: ['给说明牌加上更大的标题', '把一次看到的情况说成每天都会发生'],
      hint: '“总是”说的是很多时候，一次观察说明不了这么多。',
      explanation: '多次观察和可靠资料能支持更大范围的说法，单次观察只能说明当时情况。',
    },
    {
      knowledgePointIds: [sequence, evidence],
      prompt: '故事结尾出现一个新结果，想知道它可能怎样发生，先做什么？',
      answer: '回看结尾前的事件，找出和结果相关的线索',
      distractors: ['只看结尾就确定唯一原因', '把自己熟悉的故事结尾套进来'],
      hint: '原因线索常在结果之前出现。',
      explanation: '回看前面的事件能找到依据；如果线索不足，就把解释说成可能。',
    },
    {
      knowledgePointIds: [planning, evidence],
      prompt: '自然角的动物观察指南换了标记，伙伴还是找不到小动物的观察记录。下一步怎样改进？',
      answer: '请伙伴指出卡住的地方，再调整图示和摆放位置并试用',
      distractors: ['只把标记换成另一种颜色，不再询问', '说伙伴不仔细，把问题留着不管'],
      hint: '请伙伴说出哪里找不到，再决定改哪一处。',
      explanation: '具体反馈能指出图示或摆放哪里不清楚，调整后再试用能检查是否改好。',
    },
    {
      knowledgePointIds: [planning, sequence],
      prompt: '小组准备制作动物观察指南，发现同学想了解的动物和成长阶段不同。怎样安排更合适？',
      answer: '先了解读者想知道什么，再按动物特点和成长过程分类并试着查找',
      distractors: ['按图片颜色随便排列，不问读者', '只介绍组织者喜欢的动物，之后不检查'],
      hint: '了解读者需要，再用清楚的线索分类并检查。',
      explanation: '动物特点和成长过程是指南的主题线索；请伙伴试着查找，能检查分类是否清楚。',
    },
    {
      knowledgePointIds: [environment, evidence],
      prompt: '小池边的植物减少后，有同学说“小动物一定是因为没食物才离开”。怎样处理？',
      answer: '把植物变化记下来，并继续观察动物活动和其他环境线索',
      distractors: ['把同学的说法直接写成已经证实的原因', '不记录植物变化，只保留结论'],
      hint: '一个变化还不能说明全部原因。',
      explanation: '记录植物和动物活动，再找其他线索，才能谨慎讨论可能的关系。',
    },
    {
      knowledgePointIds: [environment, planning],
      prompt: '小组想让池边“更适合所有动物”，第一步怎样做更稳妥？',
      answer: '观察池边现状并请管理人员介绍动物和场地需要',
      distractors: ['先搬来几种动物，再看它们能不能适应', '随意挖开池边，认为环境会自动变好'],
      hint: '改变环境之前，要先了解已有的动物和场地。',
      explanation: '先了解现场情况并请管理人员指导，能减少因不了解需要而造成的影响。',
    },
    {
      knowledgePointIds: [growth, evidence],
      prompt: '两张成长照片相隔一个月，外形有变化。怎样介绍才有依据？',
      answer: '说明照片日期和能看到的变化，不猜测照片之间每天怎样变化',
      distractors: ['把两张照片没拍到的过程说成自己亲眼看见', '只说“变化特别大”，不指出依据'],
      hint: '说清记录时间和照片里能直接比较的地方。',
      explanation: '照片能支持两次观察之间的比较，但不能说明没有记录的每一天发生了什么。',
    },
    {
      knowledgePointIds: [growth, sequence],
      prompt: '成长记录图里有几张照片没有日期，怎样补充最有帮助？',
      answer: '核对原记录后补上日期，再按时间顺序排列',
      distractors: ['凭照片颜色猜日期并随意排列', '把没有日期的照片全部删掉'],
      hint: '顺序要有记录支持，不能只凭颜色猜。',
      explanation: '核对记录能恢复时间顺序，让读者更可靠地了解变化过程。',
    },
    {
      knowledgePointIds: [sequence, planning, evidence],
      prompt: '一个角色按照原计划做事后发现结果不理想，怎样讲清它的调整？',
      answer: '按顺序说明原计划、遇到的新情况、调整办法和后来的结果',
      distractors: ['只说新的结果，不提之前发生了什么', '先讲自己的猜测，再把它当成角色的行动'],
      hint: '让听众听出变化前后发生了什么。',
      explanation: '按顺序讲线索、行动和结果，听众就能理解调整是怎样发生的。',
    },
    {
      knowledgePointIds: [traits, environment],
      prompt: '看到一只小鸟在阴凉处停留，怎样避免把一次观察说成它总喜欢阴凉？',
      answer: '记下这次的时间和地点，再观察它在其他时候的活动',
      distractors: ['把一次停留说成所有小鸟的习惯', '不记录观察，只凭想象解释原因'],
      hint: '要了解习惯，需要不同时间的观察。',
      explanation: '一次停留只能说明这次的情况，重复观察才能了解活动与环境的关系。',
    },
    {
      knowledgePointIds: [environment, evidence, planning],
      prompt: '池水变浅和动物活动减少同时被记录下来，怎样写结论更合适？',
      answer: '说明两种变化都被观察到，并把它们的关系留作进一步核实',
      distractors: ['直接说池水变浅就是唯一原因', '删掉其中一项记录，只保留自己的解释'],
      hint: '同时出现的变化不一定已经证明谁造成了谁。',
      explanation: '记录能说明两种变化同时出现，但判断原因还需要更多证据。',
    },
    {
      knowledgePointIds: [growth, planning],
      prompt: '成长记录连续几天没有明显变化，怎样继续完成观察计划？',
      answer: '保留已有记录，按约定时间继续观察，不打扰小动物',
      distractors: ['拆开藏身处，强行寻找变化', '删掉旧记录，改成自己期待的样子'],
      hint: '计划可以继续执行，动物需要安静生长。',
      explanation: '保留记录并耐心等待，能让观察真实持续，也不会惊扰动物。',
    },
    {
      knowledgePointIds: [traits, sequence],
      prompt: '小组介绍两只动物的相同点和不同点，怎样组织内容更清楚？',
      answer: '先分开介绍，再按外形、活动等方面逐项比较',
      distractors: ['把所有特点混在一段里，不说属于哪只动物', '只选一个相同点，就说两只动物完全一样'],
      hint: '先分清观察对象，再用相同方面作比较。',
      explanation: '分开介绍后逐项比较，能帮助读者看清相同点和不同点。',
    },
  ],
  high: [
    {
      knowledgePointIds: [traits, environment, evidence],
      prompt: '小组要比较两处动物活动情况，哪份观察计划最有帮助？',
      answer: '先约定安全观察位置和时间，记录动物特点及周围环境',
      distractors: ['追着动物移动，看到什么就记什么', '只选最热闹的一处，不记录时间和环境'],
      hint: '计划要同时说明在哪里、什么时候、记录什么。',
      explanation: '相近的记录方法和安全位置能帮助比较两处情况，也减少对动物的打扰。',
    },
    {
      knowledgePointIds: [traits, evidence],
      prompt: '一张照片只拍到一只鸟在树下，报告却写“这种鸟总住在树下”。怎样修改？',
      answer: '改成描述照片中看到的情况，并把“总住在”列为待核实说法',
      distractors: ['保留原句，因为一张照片已经能代表全部', '删除照片日期，再把猜想写成结论'],
      hint: '照片能说明拍到的情况，不能代表每一次活动。',
      explanation: '写明照片实际记录的内容，再核实范围更大的说法，能避免过度推断。',
    },
    {
      knowledgePointIds: [planning, sequence, evidence],
      prompt: '书架分类调整后，仍有读者找不到书。哪种复盘最能帮助下一次改进？',
      answer: '按顺序记录调整内容、读者遇到的困难和再次试用的结果',
      distractors: ['只写“大家不满意”，不记具体情况', '把第一次的困难删掉，只留下新分类'],
      hint: '保留变化前后的记录，才能看出调整是否有帮助。',
      explanation: '把办法、困难和新结果连起来，能判断下一步该改哪里。',
    },
    {
      knowledgePointIds: [planning, traits, evidence],
      prompt: '小组准备做动物主题摊位，但不同年级想看的内容不一样。怎样安排更合理？',
      answer: '先了解读者需要，分出适合的内容，再请读者试着查找',
      distractors: ['只按组织者的喜好摆放，不收集反馈', '把所有资料堆在一起，让读者自己翻找'],
      hint: '先听需要，再安排内容并检查是否方便。',
      explanation: '了解不同读者的需要后作出安排，并通过试找检查效果，能让服务更合适。',
    },
    {
      knowledgePointIds: [environment, planning, evidence],
      prompt: '公园池边环境发生变化，小组想帮助动物，哪种计划更稳妥？',
      answer: '先记录变化并咨询场地管理人员，再决定是否需要行动',
      distractors: ['自行搬动动物和植物，之后再告诉成人', '只凭一次观察就认定应该改造池边'],
      hint: '帮助动物之前先了解情况，并请熟悉场地的成人指导。',
      explanation: '先观察和咨询能了解场地需要，儿童不应自行改变动物的栖息环境。',
    },
    {
      knowledgePointIds: [growth, sequence, evidence],
      prompt: '伙伴想把成长记录做成路线图，怎样安排才不把观察和想象混在一起？',
      answer: '按日期排列实际记录，并把自己补画的部分标明是创作',
      distractors: ['把想象补画的过程说成亲眼观察到的', '不写日期，只按图片好看程度排列'],
      hint: '用时间整理记录，并标清创作内容。',
      explanation: '日期支持成长顺序，标注创作能让读者分清记录与想象。',
    },
    {
      knowledgePointIds: [growth, planning],
      prompt: '成长观察小组担心等得太久，哪种调整既能坚持记录又不打扰动物？',
      answer: '按较合适的间隔观察，继续记日期和变化，期间不翻动藏身处',
      distractors: ['每天反复翻开藏身处，寻找最新变化', '停止记录，直接写下期待的结果'],
      hint: '观察间隔可以安排好，但不要为了看得快而打扰动物。',
      explanation: '安排合适的观察时间并保持安静，能持续记录成长而不破坏动物的环境。',
    },
    {
      knowledgePointIds: [sequence, planning],
      prompt: '故事中的角色先后尝试了两种办法，第二种更合适。怎样说明原因更清楚？',
      answer: '按事件顺序说出遇到的问题，再比较两种办法带来的结果',
      distractors: ['只说第二种办法好，不提问题和结果', '把两种办法的先后顺序调换'],
      hint: '顺序和结果都能帮助解释选择。',
      explanation: '先说明问题和行动，再比较结果，读者能看出后一种办法为什么更合适。',
    },
    {
      knowledgePointIds: [environment, traits, evidence],
      prompt: '两处花园的动物活动不同，小组想了解环境是否有关，先怎样做？',
      answer: '用相近时间和方式记录两处环境与动物活动，再比较线索',
      distractors: ['只看一处就说另一处环境一定不好', '把两处记录合在一起，不标地点'],
      hint: '比较时尽量让记录条件相近，并保留地点信息。',
      explanation: '相近条件和清楚地点能让比较更有依据，但相关线索仍需谨慎解释。',
    },
    {
      knowledgePointIds: [sequence, evidence, traits],
      prompt: '介绍一个动物故事时，怎样让读者分清故事行动和自己的看法？',
      answer: '按顺序讲清故事里发生的事，再单独说明自己的理解',
      distractors: ['把自己的猜想插进故事里，当作角色做过的事', '只讲结尾，不说前面发生了什么'],
      hint: '先讲故事线索，再说明个人想法。',
      explanation: '分开叙述故事事件和个人看法，读者就能知道哪些是故事、哪些是解释。',
    },
    {
      knowledgePointIds: [growth, evidence, traits],
      prompt: '小组想说明小毛虫的成长变化，手上只有两次观察记录。怎样表达范围最准确？',
      answer: '说清两次记录的日期和变化，不补写没有观察到的每一天',
      distractors: ['把两次观察之间的所有过程都写成已经亲眼看到', '只写“它每天都一样”，不看记录'],
      hint: '结论要和已有记录的时间范围相符。',
      explanation: '两次记录能说明这两个时点的情况，不能代替中间每一天的观察。',
    },
    {
      knowledgePointIds: [environment, planning, sequence],
      prompt: '管理人员同意小组观察池边，但提醒不要触碰动物。哪种行动顺序合适？',
      answer: '先听清范围，按约定记录环境和动物活动，再整理结果并归还用品',
      distractors: ['先触碰动物找位置，结束后再问能不能这样做', '不听场地要求，记录完就把用品留在池边'],
      hint: '把安全约定放在观察行动之前。',
      explanation: '先听规则、按范围观察并整理用品，能同时照顾动物和公共环境。',
    },
    {
      knowledgePointIds: [planning, sequence, evidence],
      prompt: '读者说观察指南看不懂，小组怎样修改后确认问题解决了？',
      answer: '请读者指出不明白的步骤，改写后再请伙伴试着照做',
      distractors: ['只把标题换个颜色，不让读者再试', '责怪读者没看懂，就宣布指南完成'],
      hint: '根据具体反馈修改，还要检查新版本是否清楚。',
      explanation: '指出困难、修改并再次试用，能确认指南是否真的更容易理解。',
    },
    {
      knowledgePointIds: [traits, sequence, planning, environment, growth, evidence],
      prompt: '制作一页动物观察分享，怎样安排能兼顾特点、环境、变化和可信记录？',
      answer: '先介绍观察对象与地点，再按时间展示事实，最后补充核实过的说明',
      distractors: ['先写结论，再把猜想和记录混在一起', '只放动物图片，不说明地点、时间或信息来源'],
      hint: '让对象、环境、时间顺序和资料依据都找得到。',
      explanation: '按对象与地点、时间记录和核实说明来组织，能让分享完整又容易检查。',
    },
  ],
};

export const grade2Term2ChineseUnit07SupplementalActivities: Grade2Term2ChineseUnit07SupplementalActivity[] = Object.entries(drafts).flatMap(([difficulty, items]) => (
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
