import type { ChoiceActivityDefinition, Difficulty } from '../../content/types';

export interface Grade2Term2ChineseUnit02SupplementalActivity {
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

const sourceUnitId = 'grade-2/term-2/chinese/unit-02';
const idPrefix = 'challenge-supplement-grade-2-term-2-chinese-unit-02';
const laborChain = 'food-labor-chain';
const laborRespect = 'respect-for-labor';
const cooperation = 'fair-cooperation';
const helpfulChoice = 'respectful-help';
const growth = 'independent-growth';
const storyEvidence = 'story-action-evidence';

const drafts: Record<Difficulty, ActivityDraft[]> = {
  basic: [
    { knowledgePointIds: [laborChain], prompt: '粮食要变成一份点心，哪件事属于加工环节？', answer: '把收获的粮食清理并加工成可用的原料', distractors: ['把点心端到餐桌上', '给完成的点心画一张宣传画'], hint: '加工发生在收获原料之后、做成食物之前。', explanation: '清理和加工原料，是把粮食进一步变成可制作材料的环节。' },
    { knowledgePointIds: [laborChain, laborRespect], prompt: '想感谢制作点心的人，哪句话说得具体？', answer: '谢谢你按步骤准备材料并认真制作点心', distractors: ['点心好像自己出现在桌上', '我只想看看包装是什么颜色'], hint: '感谢时可以说出对方做过的事情。', explanation: '说出准备和制作等劳动步骤，能让感谢对应到具体付出。' },
    { knowledgePointIds: [laborRespect], prompt: '取用餐点后发现自己拿多了，怎样做更珍惜劳动成果？', answer: '先按自己能吃完的量取用，需要时再添', distractors: ['为了好看再多拿一些，不吃也没关系', '把餐点拆开玩一会儿再放回去'], hint: '取用前估一估自己的需要。', explanation: '按需要取用并吃完，是珍惜食物和劳动成果的做法。' },
    { knowledgePointIds: [cooperation], prompt: '小组要布置阅读角，怎样分工更容易一起完成？', answer: '先商量每个人愿意负责的一小部分', distractors: ['让一个人做完所有事情，其他人等待', '大家同时做同一件事，不先商量'], hint: '合作前先说清目标和各自负责的部分。', explanation: '商量并分工能让伙伴都有参与机会，也减少重复劳动。' },
    { knowledgePointIds: [cooperation], prompt: '一位伙伴还没有参加小组整理，怎样邀请更友好？', answer: '问问他想负责哪一项，再一起安排', distractors: ['不问原因就替他决定所有事情', '告诉他小组不需要他参与'], hint: '邀请时给伙伴表达想法和选择的机会。', explanation: '询问并一起安排，能让伙伴参与到适合自己的任务中。' },
    { knowledgePointIds: [laborChain, laborRespect], prompt: '一份餐点经过种植、加工和制作，说明了什么？', answer: '不同环节的劳动共同带来了这份成果', distractors: ['只有最后制作的人做了所有工作', '原料不需要任何人照料就会到桌上'], hint: '从原料到成品，想想中间经过了哪些人和步骤。', explanation: '成果连接着多个劳动环节，认识这些环节能帮助我们尊重劳动者。' },
    { knowledgePointIds: [cooperation, laborRespect], prompt: '小组做完手工后，下一步怎样把劳动收好？', answer: '检查作品并把材料和工具放回合适的位置', distractors: ['把剩余材料留在通道里', '不检查就把工具放到地上离开'], hint: '完成作品后还要整理共同使用的物品。', explanation: '检查成果并归还工具，是合作劳动的一部分，也让下一组更方便使用。' },
    { knowledgePointIds: [cooperation, helpfulChoice], prompt: '小组只有几盒彩笔，怎样安排更公平？', answer: '清点数量后商量轮流使用或共同使用', distractors: ['先拿到的人一直保留所有彩笔', '把彩笔藏起来避免别人使用'], hint: '先了解有多少，再商量大家都能参与的办法。', explanation: '清点并协商使用顺序，比争抢更能照顾每位伙伴。' },
    { knowledgePointIds: [helpfulChoice], prompt: '同学抱着一摞书走得有些慢，想帮忙时先做什么？', answer: '先问他是否需要帮忙，再听听他的想法', distractors: ['不询问就把书从他手中拿走', '站在旁边替他决定该去哪里'], hint: '帮助前先了解对方是否需要以及需要什么。', explanation: '先询问能尊重同学的选择，也能提供更合适的帮助。' },
    { knowledgePointIds: [helpfulChoice], prompt: '伙伴正在尝试系鞋带，你怎样支持他？', answer: '给他一点时间练习，并问是否需要提示', distractors: ['马上替他系好，不让他再试', '催他快点并说他肯定学不会'], hint: '支持伙伴不一定要替他完成事情。', explanation: '给伙伴尝试的空间，同时在需要时提供支持，能兼顾帮助和独立练习。' },
    { knowledgePointIds: [storyEvidence], prompt: '读到一个人物把散落的书放回书架，哪句话是在说看得见的行动？', answer: '他把书一本本放回书架', distractors: ['他一定觉得自己最能干', '所有同学都喜欢他这样做'], hint: '行动是故事里直接写出的事情；想法需要更多线索。', explanation: '“把书放回书架”是可以观察到的行动，其他说法是在推测人物想法或他人感受。' },
    { knowledgePointIds: [growth], prompt: '一道题暂时不会做，怎样既尝试又照顾自己的学习？', answer: '先读清题目并试一种办法，仍不懂时再请教', distractors: ['不看题目就放弃', '把别人的答案抄下来当作自己会了'], hint: '可以先做自己能做的一步，再决定是否求助。', explanation: '先尝试并在需要时求助，是积极解决困难的过程。' },
    { knowledgePointIds: [growth, helpfulChoice], prompt: '伙伴说“我想先自己试试”，你可以怎么回应？', answer: '好，我在旁边等你，需要时可以叫我', distractors: ['不行，我现在就替你做完', '你不接受帮助就不能参加'], hint: '关心伙伴时也要尊重他的决定。', explanation: '尊重伙伴先尝试的选择，并让他知道需要时可以求助。' },
    { knowledgePointIds: [storyEvidence, cooperation], prompt: '讲一件小组劳动的经过，怎样让别人听明白？', answer: '按先商量、分工、完成和整理的顺序来说', distractors: ['只说最后的结果，不提大家做了什么', '把几个人的行动混在一起，不分先后'], hint: '找出事情发生的步骤和先后关系。', explanation: '按事情顺序说明行动，能让听的人理解伙伴怎样合作完成任务。' },
  ],
  advanced: [
    { knowledgePointIds: [helpfulChoice, cooperation], prompt: '班级准备帮助新同学熟悉校园，计划里还没有询问新同学。最需要补上什么？', answer: '先听听新同学想了解什么，再商量介绍内容', distractors: ['增加更多路线图装饰', '安排大家替新同学做所有决定'], hint: '帮助计划应该回应当事人的实际需要。', explanation: '先了解新同学的想法，才能安排更适合他的介绍内容。' },
    { knowledgePointIds: [cooperation, laborRespect], prompt: '小组合作整理图书后，怎样判断分工是否合适？', answer: '看每个人是否知道自己的任务，并一起检查结果', distractors: ['只看谁做得最快，不看其他情况', '不听伙伴意见，直接宣布已经完成'], hint: '既检查共同结果，也留意伙伴是否都能参与。', explanation: '任务清楚、伙伴参与和共同检查，能帮助小组判断并改进合作方式。' },
    { knowledgePointIds: [laborChain, laborRespect], prompt: '有人说“餐点只由厨房里的一个人做出来”。怎样补充会更完整？', answer: '从原料照料、加工、运输到制作都有劳动参与', distractors: ['每份餐点都由同一个人完成所有环节', '餐点的来源不重要，只要能吃就行'], hint: '从成品往前想一想原料怎样来到制作地点。', explanation: '餐点经历多个环节，完整地认识劳动链能避免忽略其他劳动者。' },
    { knowledgePointIds: [storyEvidence, helpfulChoice], prompt: '故事写到一个人停下来听伙伴说明困难，接下来哪种判断最稳妥？', answer: '可以确认他在倾听；他为什么这样做还要结合更多线索', distractors: ['可以确定他已经知道所有答案', '可以确定伙伴马上不再有困难'], hint: '区分故事写出的动作和根据动作作出的猜想。', explanation: '倾听是故事中可确认的行动；行动的原因和后续结果还需要其他情节支持。' },
    { knowledgePointIds: [cooperation, laborRespect], prompt: '小组制作的作品不太稳，怎样复盘更能帮助下次改进？', answer: '找出一个可能影响稳固的步骤，调整后再试并记录', distractors: ['只说某位伙伴做得不好，不看步骤', '不讨论原因，马上换成完全不同的作品'], hint: '复盘要围绕过程和可以尝试的改进办法。', explanation: '检查步骤、提出调整并再试，能让小组从劳动过程里学习。' },
    { knowledgePointIds: [laborChain, cooperation], prompt: '制作活动中，准备、加工和整理由不同伙伴负责。怎样让环节接得更顺？', answer: '说清每项任务何时交接，并一起检查材料是否齐全', distractors: ['每个人只管自己的部分，不告诉下一位', '让所有伙伴同时开始同一个环节'], hint: '合作时要让前后环节知道何时衔接。', explanation: '交接时间和材料检查能帮助不同劳动环节顺利连接。' },
    { knowledgePointIds: [helpfulChoice, growth], prompt: '伙伴做事遇到困难，但暂时不想别人代做。怎样继续支持？', answer: '询问他愿意听提示、一起想办法，还是先独立尝试', distractors: ['不听他的意见，直接完成任务', '告诉其他人他不愿接受帮助'], hint: '同一件事可以有不同的支持方式，让伙伴参与选择。', explanation: '询问伙伴愿意接受哪种支持，既回应困难也保留自主选择。' },
    { knowledgePointIds: [laborRespect, storyEvidence], prompt: '记录一次共同劳动时，怎样写才有具体依据？', answer: '写出谁负责了哪一步，以及后来怎样交接', distractors: ['只写“大家很努力”不说明行动', '替每个人写下没有说过的心情'], hint: '用具体行动和过程来支持对劳动的描述。', explanation: '分工和交接是可观察的行动，比笼统评价或猜想更有依据。' },
    { knowledgePointIds: [growth, storyEvidence], prompt: '一个故事人物试过两种办法仍没解决问题，哪种续写更合理？', answer: '写清他向可信任的人说明困难，再一起试新办法', distractors: ['写成问题忽然消失，不交代经过', '写成他一定不再遇到任何困难'], hint: '让后续行动回应已经出现的困难。', explanation: '说明困难并寻求支持，能让故事中的解决过程连贯，也不过度承诺结果。' },
    { knowledgePointIds: [helpfulChoice, cooperation], prompt: '小组准备为伙伴搬运图书，伙伴说想自己拿一部分。怎样安排更合适？', answer: '商量每个人方便拿的数量和路线，再一起出发', distractors: ['不听伙伴意见，把所有书都拿走', '让伙伴独自拿完全部图书'], hint: '合作方案既要考虑需要，也要听取参与者的选择。', explanation: '共同商量数量和路线能让伙伴参与，也更容易安全完成任务。' },
    { knowledgePointIds: [laborChain, laborRespect], prompt: '两张记录分别写“完成了点心”和“准备原料、加工、制作并整理”。哪张更能表现劳动过程？', answer: '写明准备、加工、制作和整理步骤的记录', distractors: ['只写最终点心外观的记录', '只写“大家做得很好”的记录'], hint: '过程记录要让读者看见中间的劳动环节。', explanation: '列出步骤能体现劳动过程，也能说明不同环节怎样形成成果。' },
    { knowledgePointIds: [storyEvidence, helpfulChoice], prompt: '故事只写了伙伴收起工具，没有写他的感受。读者怎样表达理解更谨慎？', answer: '能确认他收起了工具；感受还需要其他情节说明', distractors: ['他一定不喜欢这次活动', '他一定觉得活动最有趣'], hint: '不要把没有写出的感受当成确定事实。', explanation: '动作是已知线索，人物感受属于推测，需结合更多文字线索。' },
    { knowledgePointIds: [growth, cooperation], prompt: '小组里有人已经完成自己的部分，有人还在练习。怎样安排接下来的时间？', answer: '先问对方需不需要提示，再商量是否一起检查或继续练习', distractors: ['把未完成的部分全部替他做掉', '要求所有人马上停止，不再交流'], hint: '合作支持可以先了解需要，再决定下一步。', explanation: '先询问需求并共同选择支持方式，既尊重练习也帮助小组前进。' },
    { knowledgePointIds: [cooperation, laborRespect], prompt: '小组发现两位伙伴一直做同一项简单任务，怎样改进分工？', answer: '重新看看任务需要和每个人的意愿，再商量轮换', distractors: ['继续让他们重复同一项任务，不作讨论', '取消其他伙伴已经完成的工作'], hint: '合适的分工要兼顾任务需要和伙伴参与。', explanation: '根据任务和意愿重新协商，可以让劳动更均衡，也让每个人获得参与机会。' },
  ],
  high: [
    { knowledgePointIds: [cooperation, helpfulChoice, laborRespect], prompt: '班级想让借用文具更方便。哪份计划同时说明目标、做法和回顾方式？', answer: '先询问同学需要哪些文具，商量借还位置，一周后再问是否方便', distractors: ['直接把所有文具锁起来，不再借用', '只做一张海报，不询问也不回顾'], hint: '完整计划要先了解需要，再采取行动并检查效果。', explanation: '询问需要、商量借还办法并回顾使用情况，形成了可参与、可检查的服务流程。' },
    { knowledgePointIds: [storyEvidence, helpfulChoice], prompt: '故事写到一个人先询问伙伴，再按伙伴的选择帮忙。怎样概括最贴近情节？', answer: '他先了解伙伴的需要，并尊重对方选择合适的帮助', distractors: ['他替伙伴决定了所有事情', '伙伴以后一定不会再遇到困难'], hint: '概括时连接故事中的询问行动和后续做法。', explanation: '询问和尊重选择是故事明确写出的行动；不要把一次帮助扩大成永久结果。' },
    { knowledgePointIds: [laborChain, cooperation, laborRespect], prompt: '一项班级点心展示要呈现食物背后的劳动，哪种安排更完整？', answer: '按原料准备、加工、制作和整理展示各环节，并邀请伙伴说明自己的任务', distractors: ['只展示成品并把其他环节都省略', '由一人介绍所有环节，不确认实际分工'], hint: '既呈现劳动链，也让参与者讲清自己做了什么。', explanation: '展示不同环节和真实分工，能体现成果由多项劳动共同完成。' },
    { knowledgePointIds: [growth, storyEvidence], prompt: '故事人物第一次尝试没有成功，第二次在伙伴提示下完成。哪种复述保留了过程中的成长？', answer: '他先试了一次，听取提示后又练习，最后完成了任务', distractors: ['他一开始就完全会做，不需要练习', '伙伴替他完成了任务，所以他没有参与'], hint: '按顺序说出人物尝试、获得支持和后续行动。', explanation: '保留尝试与调整过程，能看到人物如何在支持下继续练习。' },
    { knowledgePointIds: [helpfulChoice, cooperation], prompt: '一次互助活动中，有人不想公开自己的困难。小组怎样继续提供支持？', answer: '私下询问他愿意怎样参与，并尊重他不公开说明的选择', distractors: ['在全班面前替他讲出困难', '因为他不公开说明就取消所有帮助'], hint: '提供帮助时也要保护伙伴的选择和感受。', explanation: '私下询问并尊重是否公开，能在支持伙伴的同时保护隐私和自主权。' },
    { knowledgePointIds: [laborChain, laborRespect], prompt: '小组想比较两种整理原料的方法哪种更方便，怎样收集有用信息？', answer: '使用相同数量的原料，记录每种方法的步骤和用时后再比较', distractors: ['每种方法使用不同数量，只凭一次感觉决定', '先选喜欢的方法，再只记录支持它的情况'], hint: '比较前尽量让条件相同，并留下可以核对的记录。', explanation: '相同数量和步骤、用时记录能让比较更公平，也避免只按喜好下结论。' },
    { knowledgePointIds: [cooperation, growth], prompt: '小组任务完成后，回顾发现一位伙伴的想法没有被听见。下次怎样改进？', answer: '安排轮流表达的时间，并在决定前确认每个人是否说过想法', distractors: ['以后只听声音最大的人提出的办法', '不再邀请伙伴参与计划'], hint: '改进做法要能让不同伙伴都有表达机会。', explanation: '轮流表达并确认每个人都被听见，可以让合作更公平。' },
    { knowledgePointIds: [storyEvidence, helpfulChoice], prompt: '读书记录要说明人物为什么愿意帮助别人，哪种写法最有依据？', answer: '先写出人物做了什么，再把原因写成“我觉得可能是”并说明线索', distractors: ['把自己的猜想写成故事已经说出的事实', '只写人物很好，不说明故事中的行动'], hint: '把故事线索和自己的理解分开写。', explanation: '行动是文本线索，原因解释应标出是自己的理解，并说明依据。' },
    { knowledgePointIds: [laborChain, cooperation], prompt: '小组制作展示材料时，前一环节总是来不及交接。怎样调整更有效？', answer: '先记录各环节需要的时间，再商量交接点并试行一次', distractors: ['要求每个人同时开始，不记录过程', '只责怪最后接手的伙伴'], hint: '先找出问题发生在哪个环节，再设计可试行的调整。', explanation: '记录时间、商量交接点并试行，能围绕实际情况改善流程。' },
    { knowledgePointIds: [growth, helpfulChoice], prompt: '同伴已经尝试两次仍遇到困难，他说想再试一次。怎样回应最支持成长？', answer: '尊重他再试的决定，并问他是否想要提示或需要休息', distractors: ['不问他想法，马上替他完成', '告诉他必须一次成功才算努力'], hint: '支持成长要同时关心需要并保留选择。', explanation: '尊重继续尝试的决定，同时询问提示或休息需求，比替做或施压更合适。' },
    { knowledgePointIds: [laborRespect, cooperation, storyEvidence], prompt: '小组介绍一项共同劳动，怎样避免把集体成果说成某一个人的功劳？', answer: '按过程说明不同伙伴承担的环节，并感谢大家的贡献', distractors: ['只介绍最后完成作品的人', '不提具体行动，只比较谁做得最多'], hint: '回想每个环节由谁参与，以及如何衔接。', explanation: '说明不同环节和贡献，能更准确地呈现合作成果，也避免排名比较。' },
    { knowledgePointIds: [storyEvidence, growth], prompt: '两个读者对人物的选择有不同理解，怎样讨论更有根据？', answer: '各自找出人物的行动和前后情节，再说明自己的理解', distractors: ['只坚持先想到的答案，不再看故事', '把其中一人的想法当成唯一事实'], hint: '回到共同的故事线索，看看哪些理解能得到支持。', explanation: '比较行动和前后情节，能让不同理解建立在证据上。' },
    { knowledgePointIds: [helpfulChoice, cooperation, laborRespect], prompt: '班级服务试行后，有同学说安排不方便。接下来怎样改进并尊重参与者？', answer: '听听具体困难，和大家商量一个新办法，再约定何时回顾', distractors: ['不听意见，照旧执行到底', '因为有意见就停止所有服务'], hint: '回顾要听取实际体验，并一起决定下一步。', explanation: '收集具体反馈、共同调整并再次回顾，能让服务持续改进。' },
    { knowledgePointIds: [growth, laborRespect], prompt: '介绍一次合作活动的收获，哪种说法既具体又看见伙伴的劳动？', answer: '说说自己学会了哪一步，并感谢伙伴承担的不同环节', distractors: ['只说自己一个人完成了所有事情', '只比较谁做得最多、谁做得最少'], hint: '想想自己学到了什么，也想想共同成果来自哪些行动。', explanation: '具体说出学习收获并感谢不同贡献，比独占成果或排名更能体现合作与尊重。' },
  ],
};

export const grade2Term2ChineseUnit02SupplementalActivities: Grade2Term2ChineseUnit02SupplementalActivity[] = Object.entries(drafts).flatMap(([difficulty, items]) => (
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
