import type { ChoiceActivityDefinition, Difficulty } from '../../content/types';

export interface Grade2Term1ChineseUnit05SupplementalActivity {
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

const sourceUnitId = 'grade-2/term-1/chinese/unit-05';
const idPrefix = 'challenge-supplement-grade-2-term-1-chinese-unit-05';
const viewpoint = 'observation-position-and-viewpoint';
const action = 'action-time-and-result';
const plant = 'plant-observation-and-change';
const evidence = 'evidence-based-inference';
const problem = 'problem-solving-sequence';

const drafts: Record<Difficulty, ActivityDraft[]> = {
  basic: [
    { knowledgePointIds: [viewpoint], prompt: '两位同学从不同地方看同一棵树，描述不一样。先了解什么更有帮助？', answer: '先问清两个人分别站在哪里看', distractors: ['只听先开口的同学', '马上认定两个人中有一个没看清'], hint: '观察位置会影响能看到的部分。', explanation: '先了解观察位置，才能比较两个人看到的范围和细节。' },
    { knowledgePointIds: [action], prompt: '复述寒号鸟的经历时，怎样记录才能看出行动和结果的联系？', answer: '先记下寒号鸟做了什么，再记结果怎样', distractors: ['只写天气，不提角色做过什么', '只记最后的结果，不记发生经过'], hint: '把事情经过和后来结果都留下。', explanation: '记录行动和后续结果，才能结合故事情节思考两者的联系。' },
    { knowledgePointIds: [plant], prompt: '想比较一株植物叶片的变化，观察卡上先记什么？', answer: '把叶片颜色和变化日期记下来', distractors: ['只写自己最喜欢的颜色', '只记植物的名字，不记叶片情况'], hint: '想想哪些信息能帮助下次比较。', explanation: '日期和叶片样子能帮助把不同时间的观察放在一起比较。' },
    { knowledgePointIds: [evidence], prompt: '下面哪句只记录直接看到的情况？', answer: '叶片边缘有几处卷起', distractors: ['植物一定是缺水了', '它不喜欢现在的花盆'], hint: '判断句子是在说眼前现象，还是在猜原因。', explanation: '叶片边缘卷起是可观察到的现象；另外两句是在推测原因或想法。' },
    { knowledgePointIds: [viewpoint], prompt: '青蛙和小鸟对天空大小有不同看法，讨论前先了解哪件事？', answer: '先看看青蛙能看到哪些方向的景物', distractors: ['先决定谁说话更有道理', '先猜它们最喜欢哪种天气'], hint: '留意故事人物所在的位置和视线范围。', explanation: '了解青蛙的观察位置与视野，能帮助解释它为什么这样想。' },
    { knowledgePointIds: [plant, evidence], prompt: '观察叶片时发现几个小虫子，怎样记录更稳妥？', answer: '记下发现小虫的位置和数量，再请大人一起确认', distractors: ['马上断定植物一定会枯死', '不记录，只凭记忆说有很多虫子'], hint: '先留下看得到的信息，再确认它意味着什么。', explanation: '位置和数量是具体观察；影响和处理办法还需要更多信息并请大人协助。' },
    { knowledgePointIds: [evidence], prompt: '哪句话把观察和推想分开表达了？', answer: '我看见叶子上有小洞；我猜可能有小虫', distractors: ['叶子有小洞，所以一定是小虫咬的', '我没有看过叶子，但知道它出了问题'], hint: '看看哪句话说明了亲眼所见，也给猜测留出余地。', explanation: '小洞是观察到的现象，“可能有小虫”是尚待确认的推想。' },
    { knowledgePointIds: [action], prompt: '想看清一次行动和后续结果，记录顺序怎样安排？', answer: '先记行动和时间，再写后来发生的事', distractors: ['先猜最后结果，再补一个想象的行动', '只记录自己最喜欢的情节'], hint: '按故事发生的先后来记。', explanation: '先后记录行动、时间和后续情况，方便回看事情经过。' },
    { knowledgePointIds: [plant], prompt: '两张观察卡记录了同一株植物，怎样比较叶片变化？', answer: '把同一株植物不同日期的叶片记录放在一起比较', distractors: ['拿不同植物的一张记录直接当成前后变化', '只看最后一张，不看之前记录'], hint: '比较时确认观察对象是同一株。', explanation: '使用同一株植物的不同日期记录，才能了解它前后的变化。' },
    { knowledgePointIds: [viewpoint, evidence], prompt: '伙伴说“这里什么也看不见”，怎样提问能帮助弄清他的观察？', answer: '你观察时站在哪里？', distractors: ['你是不是不喜欢这里？', '你为什么不照我的说法回答？'], hint: '问一个能了解观察条件的问题。', explanation: '询问观察位置能帮助了解伙伴看见了什么，不先替他猜想原因。' },
    { knowledgePointIds: [plant], prompt: '一张观察卡写着“叶片今天比昨天多了两处小斑点”。哪项概括没有超出这条记录？', answer: '记录到了斑点数量增加', distractors: ['证明这些斑点只由虫子造成', '说明整株植物已经停止生长'], hint: '说清记录里看得到的变化，不添加还没确认的原因。', explanation: '记录支持斑点数量增加，还没有说明斑点原因或整株植物的生长情况。' },
    { knowledgePointIds: [evidence], prompt: '想解释叶片变化的原因，记录时怎样写更合适？', answer: '先写下看到的线索，再把原因写成“可能”', distractors: ['不记录线索，直接写唯一原因', '把别人的猜测当作自己的观察'], hint: '观察和原因判断属于不同内容。', explanation: '先记录线索，再谨慎提出推想，能避免把猜测当成事实。' },
    { knowledgePointIds: [viewpoint], prompt: '两位同学讲了不同的观察结果，怎样整理才不漏掉各自的依据？', answer: '记下两个人各自说了什么和看到了什么', distractors: ['只写自己赞成的一种说法', '把两个人的话合成一句，不注明是谁观察的'], hint: '保留说法和观察者之间的对应关系。', explanation: '分别记录说法及其观察线索，比较时才知道依据来自哪里。' },
    { knowledgePointIds: [problem, evidence], prompt: '目前的观察还不能说明原因，下一步做什么更合适？', answer: '再找一条能支持或修改想法的观察线索', distractors: ['坚持第一次猜测，不再查看', '把没有记录的内容补写成观察结果'], hint: '新线索可以帮助检查原来的想法。', explanation: '继续收集相关线索，才能判断原有推想是否需要调整。' },
  ],
  advanced: [
    { knowledgePointIds: [viewpoint], prompt: '两位同学对操场远处的旗子描述不同，怎样比较他们的观察更公平？', answer: '分别记录观察位置和看到的景物，再比较范围', distractors: ['只保留离旗子较近同学的说法', '请第三个人直接选出谁一定正确'], hint: '比较前先弄清各自在哪里、看到了什么。', explanation: '保留双方位置和观察内容，再比较能看到的范围，结论更有依据。' },
    { knowledgePointIds: [action], prompt: '要讨论寒号鸟的行动与后来情况，哪种记录最能保留先后关系？', answer: '先后记录拖延行动和遇冷后的结果', distractors: ['只写“它很懒”，不记录事情经过', '把结尾结果写在前面并省去行动'], hint: '把情节中的行动和后续情况按发生顺序留下。', explanation: '按先后记录行动和结果，才方便结合故事讨论它们的联系。' },
    { knowledgePointIds: [plant, problem], prompt: '要观察一株植物叶片一周内的变化，怎样安排记录便于比较？', answer: '固定观察对象和位置，按日期记录叶片变化', distractors: ['每天换一株植物，只记最明显的一次', '每次从不同位置随意观察，不标日期'], hint: '尽量让每次观察条件相近，并留下时间。', explanation: '固定对象和位置、标明日期，能让前后观察更容易比较。' },
    { knowledgePointIds: [action, evidence], prompt: '记录写着“做窝行动较晚，之后遇到寒冷”。目前最稳妥的说法是什么？', answer: '能说明做窝行动较晚，之后遇到寒冷；还需结合其他线索解释结果', distractors: ['这已经证明后来的一切都只有一个原因', '这两件事没有先后关系，不必再读故事'], hint: '区分已经记下的情节和还需要分析的原因。', explanation: '记录支持行动在前、遇冷在后的情节顺序；完整解释还需结合其他线索。' },
    { knowledgePointIds: [viewpoint, evidence], prompt: '有人说“大家看到的都一样”，怎样改写能给不同观察留下空间？', answer: '把“大家看到的都一样”改为“观察位置不同，看到的范围可能不同”', distractors: ['改成“只有我看到的才是真的”', '改成“位置不同也一定看到完全相同的景物”'], hint: '让说法考虑观察位置可能带来的差别。', explanation: '观察位置可能影响视野，因此不能先假定每个人看到的范围都一样。' },
    { knowledgePointIds: [plant, evidence], prompt: '叶片出现变化，想判断是否与照料有关，先检查哪些资料？', answer: '对照叶片记录、土壤状态和照料时间再判断', distractors: ['只听一次猜测就决定原因', '不看记录，只挑最显眼的一片叶子'], hint: '把植物变化和已有观察记录、照料情况放在一起看。', explanation: '同时检查变化、土壤和照料时间能提供更多线索，但仍应谨慎判断。' },
    { knowledgePointIds: [plant, problem], prompt: '想比较两种照料办法对一株植物的影响，怎样减少其他条件造成的差别？', answer: '保持同一盆植物和观察时间，只改变一个照料条件并记录', distractors: ['同时换植物、位置和浇水办法', '只挑结果最好的一天写进记录'], hint: '比较时尽量只改变正在检查的一项条件。', explanation: '保持对象和观察时间相同，只改变一个条件，有助于看出记录是否随它变化。' },
    { knowledgePointIds: [evidence, problem], prompt: '整理一段关于叶片变化的说明，怎样区分已看到和仍待确认的部分？', answer: '先列出直接看到的变化，再写可能原因和还需确认的事', distractors: ['把原因放在前面，并把猜想写成已经观察', '只写结论，不保留观察记录'], hint: '可以把观察、解释和待查问题分别写。', explanation: '分开列出观察、推想和待确认内容，读者能看清证据支持到哪里。' },
    { knowledgePointIds: [evidence, action], prompt: '只有一条“先做了某事，后来发生变化”的记录，能直接断定唯一原因吗？', answer: '目前只能说两件事先后发生，不能只凭这一条记录确定唯一原因', distractors: ['可以，时间先后已经证明只有这一个原因', '可以，只要结果不同就不需要其他记录'], hint: '先后记录能说明顺序，原因判断还要看更多线索。', explanation: '一条先后记录不能单独证明唯一原因，结论应与现有证据相称。' },
    { knowledgePointIds: [action, evidence], prompt: '讨论寓言中一个人物的做法时，哪种说明更有根据？', answer: '引用故事中可核对的行动和结果，再说明自己的理解', distractors: ['只说自己喜欢哪个人物，不提故事线索', '不看经过，直接把自己的想法当成故事结论'], hint: '把故事里能找到的行动或结果和理解连起来。', explanation: '引用可核对的情节再说明理解，能让观点有具体依据。' },
    { knowledgePointIds: [plant, problem], prompt: '两次观察同一株植物的变化，怎样让记录条件尽量一致？', answer: '使用相同的观察位置、方法和间隔时间', distractors: ['每次改用不同工具并随机选择时间', '一次观察多株，另一次只观察一株'], hint: '比较前后记录时尽量保持观察方法一致。', explanation: '位置、方法和时间间隔相同，记录之间更便于比较。' },
    { knowledgePointIds: [problem], prompt: '对一个观察结果仍有疑问，哪种后续问题最容易通过记录来回答？', answer: '提出一个能通过后续观察回答的问题', distractors: ['提出和观察无关、没有办法核对的猜想', '问谁的想法最受欢迎'], hint: '选一个可以继续观察并留下记录的问题。', explanation: '能用后续观察核对的问题，便于设计下一步记录。' },
    { knowledgePointIds: [evidence, problem], prompt: '新记录和原先想法不一样，怎样处理更合适？', answer: '先保留原想法，再记录新线索并说明是否需要修改', distractors: ['删去不符合预想的新记录', '不检查线索，马上认定原想法永远正确'], hint: '把原先想法和新证据放在一起检查。', explanation: '保留记录并对照新线索，能说明原来的推想是否需要调整。' },
    { knowledgePointIds: [evidence, viewpoint], prompt: '想向伙伴说明自己怎样从观察得到一个想法，哪种说法最清楚？', answer: '用“我看到……，所以我猜……，还想确认……”表达', distractors: ['只说“我知道”，不告诉伙伴依据', '把猜想说成所有人都确认过的事实'], hint: '表达时给出线索，也说明仍要核对的部分。', explanation: '观察、推想和待确认问题分开表达，依据与结论的关系更清楚。' },
  ],
  high: [
    { knowledgePointIds: [problem], prompt: '准备研究一个日常观察问题，怎样让计划从开始就清楚可做？', answer: '先说清要了解的问题，再定观察对象、时间和记录办法', distractors: ['先定结论，再挑符合结论的记录', '先写很多办法，不说明要解决什么问题'], hint: '问题、对象、时间和记录办法要互相对应。', explanation: '先明确问题，再决定观察谁、何时观察和如何记录，计划才可执行。' },
    { knowledgePointIds: [problem, plant], prompt: '准备检查植物叶片的一种变化，怎样先保证观察安排安全、可靠？', answer: '在大人同意下选一个安全条件，观察前后并如实记录', distractors: ['自行使用不熟悉的药水或工具', '只在结果符合预想时记录'], hint: '使用安全的观察方法，也要保留实际结果。', explanation: '在成人同意下安全观察并如实记录，能保护参与者并保留可信信息。' },
    { knowledgePointIds: [plant, evidence], prompt: '要连续观察一株植物的叶片，哪种记录方法方便比较前后变化？', answer: '每次在相同位置、用相同方法记录日期和叶片变化', distractors: ['只在最后一天凭记忆写一次', '每次换不同植株和观察角度，不记日期'], hint: '把观察方法、日期和对象都保持清楚。', explanation: '相同位置和方法加上日期记录，能帮助比较叶片的前后变化。' },
    { knowledgePointIds: [action, evidence], prompt: '小组要讨论故事里行动与结果的联系，哪种记录最有助于回看经过？', answer: '把角色行动、发生时间和后续结果列在同一张记录表', distractors: ['只记录角色的性格评价', '先写结论，省略故事中的行动和时间'], hint: '把行动、时间和后来的事情对应起来。', explanation: '同表记录行动、时间与结果，方便回看故事顺序和比较线索。' },
    { knowledgePointIds: [problem, evidence], prompt: '试用一个办法后，怎样判断记录是否支持“办法有变化”这个想法？', answer: '先检查记录是否完整，再判断办法有没有带来变化', distractors: ['只挑一条最符合想法的记录', '不查看前后记录，按喜欢的办法下结论'], hint: '先确认前后信息都在，再比较变化。', explanation: '检查记录完整性并比较前后情况，结论才有证据支持。' },
    { knowledgePointIds: [plant, problem], prompt: '想看看一种照料调整后叶片有没有变化，怎样设计比较更清楚？', answer: '固定植物和观察时间，只调整一个照料办法后继续记录', distractors: ['同时移动花盆、改变浇水并换掉植物', '只记录调整后的一天，不记录之前情况'], hint: '保留调整前的信息，每次只检查一个改变。', explanation: '固定对象和时间、只改变一个办法并连续记录，更容易比较前后情况。' },
    { knowledgePointIds: [evidence, problem], prompt: '连续记录后暂时没有看到变化，怎样写结论更准确？', answer: '说明目前的记录没有显示变化，并提出还要观察什么', distractors: ['把结果改写成已经发生了变化', '因为没变化就删掉全部记录'], hint: '结论要符合目前的观察，也可以留下下一步问题。', explanation: '如实说明当前记录并提出后续观察方向，不夸大也不丢弃证据。' },
    { knowledgePointIds: [viewpoint, evidence], prompt: '两位同学对同一处景物有不同看法，怎样整理材料再比较？', answer: '分别列出两个人的位置、说法和观察线索，再比较能解释的部分', distractors: ['先按人数决定哪种说法正确', '把两种说法合并，删掉各自的位置和线索'], hint: '保留每种说法对应的观察条件和线索。', explanation: '分别保留位置、说法和线索，比较时才知道每个观点依据什么。' },
    { knowledgePointIds: [viewpoint, problem], prompt: '小组成员对观察结论有分歧，怎样继续合作更有效？', answer: '先复述双方依据，再一起找能核对的新线索', distractors: ['要求少数同学立刻放弃自己的观察', '不查看材料，直接投票决定事实'], hint: '先听懂不同依据，再一起查找可以核对的信息。', explanation: '复述各自依据并寻找新线索，能让分歧转为下一步共同观察。' },
    { knowledgePointIds: [evidence, problem], prompt: '一张记录表信息很多，整理时怎样保留与问题有关的材料？', answer: '只保留能回答问题的记录，并标清日期和观察对象', distractors: ['保留最有趣的内容，不管是否有关', '删掉和预想不一样的记录'], hint: '记录要能帮助回答原来的问题，同时方便复查。', explanation: '筛选相关记录并注明日期、对象，便于回到证据核对判断。' },
    { knowledgePointIds: [action, evidence], prompt: '要解释一个故事行动和后来结果的关系，怎样避免把推测说成事实？', answer: '分别记录行动和结果，再把因果关系表述为有线索支持的推想', distractors: ['只看到结果就断定唯一原因', '省去故事行动，直接写人物一定在想什么'], hint: '把情节中发生的事和自己对关系的理解分开。', explanation: '记录行动与结果，再用有依据的推想解释，能避免断言未确认的原因。' },
    { knowledgePointIds: [problem, plant], prompt: '给伙伴设计一张植物观察卡，哪些栏目能让计划可执行？', answer: '写清观察问题、固定条件、记录内容和回顾办法', distractors: ['只写植物名称和一句结论', '只画装饰，不说明什么时候观察'], hint: '计划要告诉伙伴观察什么、怎么记和怎样比较。', explanation: '问题、条件、记录与回顾互相配合，伙伴才能按卡片完成观察。' },
    { knowledgePointIds: [plant, evidence, problem], prompt: '两次观察记录看起来互相矛盾，接下来怎样查明情况？', answer: '先复查观察方法是否一致，再增加一次记录后作判断', distractors: ['删掉其中一条，不再检查', '挑自己更喜欢的一条当成唯一事实'], hint: '先查记录条件，再补充一次可比较的观察。', explanation: '复查方法并增加可比较的记录，能帮助理解差异来自哪里。' },
    { knowledgePointIds: [evidence, viewpoint], prompt: '向伙伴介绍一次观察发现时，怎样同时说明证据、推想和疑问？', answer: '先介绍记录到的事实，再说可能解释和仍需确认的问题', distractors: ['只讲最肯定的结论，不展示观察记录', '把还没确认的想法说成所有人都看到的事实'], hint: '先让伙伴知道看到了什么，再说明想法和未解决处。', explanation: '按事实、可能解释、待确认问题来分享，能清楚说明证据的范围。' },
  ],
};

export const grade2Term1ChineseUnit05SupplementalActivities: Grade2Term1ChineseUnit05SupplementalActivity[] = Object.entries(drafts).flatMap(([difficulty, items]) => (
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
