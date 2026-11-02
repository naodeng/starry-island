import type { ChoiceActivityDefinition, Difficulty } from '../../content/types';

export interface Grade2Term1ChineseUnit07SupplementalActivity {
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

const sourceUnitId = 'grade-2/term-1/chinese/unit-07';
const idPrefix = 'challenge-supplement-grade-2-term-1-chinese-unit-07';
const seasonal = 'seasonal-scenery-clues';
const weather = 'weather-observation-and-change';
const fog = 'fog-and-visibility-inference';
const story = 'story-event-sequence';
const care = 'care-and-safe-action';

const drafts: Record<Difficulty, ActivityDraft[]> = {
  basic: [
    { knowledgePointIds: [seasonal, weather], prompt: '春天连续观察同一棵树，哪条记录最能说明变化？', answer: '树枝先长出新芽，几天后新叶展开', distractors: ['只写“今天很漂亮”，不记看到什么', '每天换一棵树，再比较叶子的数量'], hint: '找一条能看出前后不同的记录。', explanation: '先后记录新芽和新叶，能说明同一棵树在一段时间里的变化。' },
    { knowledgePointIds: [fog, weather], prompt: '想比较雾散前后远处教学楼看得清不清，怎样记录更合适？', answer: '在同一地点记下时间、天气和远处景物清晰度', distractors: ['只记一次观察，不写时间和地点', '每次换一个地方，再比较不同景物'], hint: '比较前后时尽量保留相同的观察条件。', explanation: '记录时间、天气、地点和同一景物，才更容易看出雾前后的差别。' },
    { knowledgePointIds: [seasonal], prompt: '读到描写山、草和云的诗句，想象画面时哪种做法更有根据？', answer: '诗句中的景物和动作可以帮助想象画面', distractors: ['只想象自己最喜欢的玩具', '不看诗句内容，直接猜作者在哪里'], hint: '先留意诗句写了什么，再把线索连起来。', explanation: '从诗句中的景物和动作出发，想象更贴近读到的内容。' },
    { knowledgePointIds: [weather, fog], prompt: '观察天气时发现远处变模糊，同时自己觉得有些冷，怎样记录更清楚？', answer: '把观察到的变化和自己的感受分开写', distractors: ['把“我觉得冷”写成远处变模糊的原因', '只写感受，不记录看到的景物'], hint: '一栏写看见的现象，另一栏写自己的感受。', explanation: '观察现象和个人感受是不同信息，分开记录更方便核对。' },
    { knowledgePointIds: [weather, fog, care], prompt: '雪后阳光出来了，准备去操场观察，先做什么更稳妥？', answer: '先记录雪和阳光的变化，再查看地面状况', distractors: ['不看地面情况就沿着最快的路线跑', '只观察远处，不告诉老师自己要去哪里'], hint: '观察之前先确认周围环境是否适合安全活动。', explanation: '先了解天气变化并检查地面，遇到湿滑处还应放慢脚步或请成人帮助。' },
    { knowledgePointIds: [seasonal], prompt: '读诗时怎样把景物词和季节线索联系起来？', answer: '把描写景物的词和对应的季节线索联系起来', distractors: ['看到一个景物词，就不看其他线索', '只按诗句的字数判断季节'], hint: '季节判断要看景物、天气等信息是否相互支持。', explanation: '结合多个景物和天气线索，比只看一个词更容易理解画面。' },
    { knowledgePointIds: [weather], prompt: '想知道花坛里的叶子一周内怎样变化，哪种观察办法更可靠？', answer: '先后两次在相近条件下观察，再对照记录', distractors: ['只凭一张旧照片猜一周后的样子', '每次看不同的植物，也不写观察日期'], hint: '让两次记录可以放在一起比较。', explanation: '相近地点和观察对象、清楚的时间记录，能帮助比较变化。' },
    { knowledgePointIds: [fog], prompt: '雾慢慢散开时，远处的树通常会出现什么可观察变化？', answer: '远处景物的轮廓逐渐变清楚', distractors: ['树的位置自己移动到近处', '树叶颜色一定马上全部改变'], hint: '留意视线能看到的程度，而不是猜树本身发生了什么。', explanation: '雾变薄后，视线受遮挡减少，远处景物的轮廓可能变得清楚。' },
    { knowledgePointIds: [story], prompt: '向伙伴复述一段故事，怎样安排内容更容易听懂？', answer: '按照事情发生的先后讲清开头、经过和结果', distractors: ['先讲结果，再把中间经过随意插入', '只说人物名字，不说发生了什么'], hint: '用时间顺序帮助听众跟上故事。', explanation: '按事情发生的顺序讲开头、经过和结果，故事会更连贯。' },
    { knowledgePointIds: [care], prompt: '同学在雾天觉得看不清路，你怎样回应更合适？', answer: '先听清对方的需要，再决定怎样帮忙', distractors: ['不询问就拉着同学往前跑', '笑话同学胆小，不理会他的担心'], hint: '帮助别人前先了解对方的情况。', explanation: '先倾听并确认需要，再一起选择安全做法，体现尊重和关心。' },
    { knowledgePointIds: [story, care], prompt: '读完一个互相关心的故事，怎样说自己的感受更具体？', answer: '说出故事中的具体行动，再解释自己的感受', distractors: ['只说“我喜欢”，不提故事内容', '把自己猜想的人物想法当作故事事实'], hint: '让感受和故事里能找到的线索连起来。', explanation: '指出一项具体行动，能说明自己的感受从哪里来。' },
    { knowledgePointIds: [fog, story], prompt: '故事里只写远处看不清，怎样判断是不是因为起雾？', answer: '没有看到的部分先标记为猜想，继续找线索', distractors: ['把自己的猜测直接写成故事已经说明的事实', '因为没有写原因，就说远处一定没有景物'], hint: '区别已经看到的信息和还需要核对的想法。', explanation: '先保留故事明确写出的内容，再找其他线索支持原因判断。' },
    { knowledgePointIds: [care, fog], prompt: '伙伴在雾天靠近校门时看不清方向，哪种做法更安全？', answer: '提醒伙伴慢慢走，并请老师一起看看情况', distractors: ['让伙伴闭上眼睛跟着声音跑', '让伙伴独自走到更远处寻找路线'], hint: '视线不清时，找可信任的成人一起确认更稳妥。', explanation: '放慢脚步并寻求老师帮助，能减少走错路或碰撞的风险。' },
    { knowledgePointIds: [weather, seasonal], prompt: '整理一周的季节观察卡，哪种记录最方便回看？', answer: '记录已经知道的变化，也写下还需要观察的问题', distractors: ['只写一句“季节变了”，不保留线索', '删掉和原来想法不同的观察结果'], hint: '记录既要留下发现，也要保留还没弄清楚的地方。', explanation: '把现有线索和待观察的问题都记下，之后可以继续核对变化。' },
  ],
  advanced: [
    { knowledgePointIds: [fog, weather], prompt: '要判断雾在操场上是否变薄，哪组观察记录更能支持比较？', answer: '固定地点和观察对象，记录不同时段的能见度', distractors: ['只记“今天雾很大”，不写什么时候观察', '每次改看不同的物体，再用感觉判断'], hint: '比较时让观察对象和地点保持一致。', explanation: '同一地点、同一对象和不同时段的记录可以显示能见度变化。' },
    { knowledgePointIds: [story], prompt: '读故事时想判断人物为什么停下来帮助伙伴，先看什么更合适？', answer: '先找故事写出的行动，再判断它可能说明什么', distractors: ['只看标题就确定人物的全部想法', '先猜一个原因，再把故事内容改成支持它'], hint: '理解人物时先回到故事中寻找线索。', explanation: '从文中写出的行动出发，再提出有依据的理解，避免把猜测当事实。' },
    { knowledgePointIds: [weather, fog], prompt: '两次天气观察都没有记错，景物看起来却不同，怎样解释更稳妥？', answer: '同时保留天气、时间和景物记录，再解释差异', distractors: ['只按自己喜欢的季节决定哪次记录正确', '删掉看起来不同的一次记录'], hint: '差异可能与观察条件有关，先把相关信息放在一起看。', explanation: '天气、时间和景物记录能帮助找出差异，不应只凭喜好选一条。' },
    { knowledgePointIds: [story], prompt: '介绍故事中的一次互助，哪种讲法能让听众听清事情经过？', answer: '先说明遇到的情况，再依次讲行动和结果', distractors: ['先评价人物，再省略发生的事情', '只说结尾，不说之前遇到了什么'], hint: '帮助行动要放在事情经过中理解。', explanation: '情况、行动和结果按顺序呈现，能让听众理解故事发展。' },
    { knowledgePointIds: [care], prompt: '伙伴看起来有些冷，但没有开口，你准备怎样做？', answer: '先问伙伴需要什么，再商量合适的做法', distractors: ['不询问就替伙伴作所有决定', '告诉伙伴不要表达自己的感受'], hint: '不要只根据表情替别人作判断。', explanation: '先询问并听取伙伴的想法，再一起决定是否需要帮助。' },
    { knowledgePointIds: [seasonal], prompt: '诗句里写到山影和草木，怎样说明自己想象的画面？', answer: '用景物线索想象画面，并说明依据哪一个词', distractors: ['只说画面颜色，不指出诗句线索', '把自己想象的细节说成诗句原文'], hint: '把读到的词和自己的想象分开表达。', explanation: '指出依据的景物词，再补充个人想象，能说清画面的来源。' },
    { knowledgePointIds: [weather], prompt: '想比较同一株植物雨前和雨后的状态，记录怎样做更有用？', answer: '按相同的观察方法记录两次结果', distractors: ['雨前只记高度，雨后只记颜色，再直接下结论', '只记自己觉得哪次更好看'], hint: '让记录项目相近，再看哪些地方发生变化。', explanation: '使用相同观察项目能减少比较中的差异，更容易找出变化。' },
    { knowledgePointIds: [story], prompt: '复述故事时，怎样区分故事明确写出的内容和自己的理解？', answer: '区分文中明确写出的事和读者作出的推想', distractors: ['把所有推想都说成故事原句', '只说自己的想法，不提故事线索'], hint: '告诉听众哪些能回到故事核对，哪些是自己的看法。', explanation: '明确区分故事信息和个人推想，能让表达更准确。' },
    { knowledgePointIds: [fog], prompt: '早晨和中午都观察同一棵远处的树，想比较雾的影响，怎样整理？', answer: '把雾前雾后的观察放在一起比较', distractors: ['只留下中午的记录，删除早晨的记录', '用两棵不同的树代替前后比较'], hint: '保留前后记录，并确认观察的是同一对象。', explanation: '前后观察放在一起比较，才能看出雾对视线的影响。' },
    { knowledgePointIds: [seasonal, weather], prompt: '想说明一幅季节画面为什么像秋天，哪种做法更有依据？', answer: '从天气现象和景物变化中找相互对应的线索', distractors: ['只看画纸的颜色就决定季节', '把自己喜欢的季节当作唯一答案'], hint: '寻找不止一条能互相支持的线索。', explanation: '天气和景物变化相互支持时，季节判断更有根据。' },
    { knowledgePointIds: [weather, fog], prompt: '记录中的结论和实际观察不一致，下一步先检查什么？', answer: '发现结论和记录不一致时，回看观察条件', distractors: ['为了保留原结论，直接改掉观察记录', '不再看记录，马上选一个新答案'], hint: '先看看时间、地点和观察对象有没有变化。', explanation: '回看观察条件能帮助发现差异来源，不应先改写事实记录。' },
    { knowledgePointIds: [story], prompt: '故事里伙伴遇到困难后得到帮助，复述时先后怎样安排？', answer: '先辨认故事里的问题，再按行动先后讲结果', distractors: ['先说自己的感想，再猜出故事问题', '只讲帮助之后的结果，不提前面的困难'], hint: '听众需要先知道为什么会采取行动。', explanation: '先交代问题，再说行动和结果，能解释故事发展。' },
    { knowledgePointIds: [care, fog], prompt: '雪后小路有些湿滑，伙伴走得不稳，怎样建议更安全？', answer: '在湿滑处放慢脚步，必要时找成人协助', distractors: ['催伙伴快跑，赶紧走过湿滑处', '为了不麻烦别人，继续走不告诉成人'], hint: '遇到可能滑倒的地方，先降低速度并寻求合适帮助。', explanation: '放慢脚步并在需要时请成人协助，比催促或隐瞒情况安全。' },
    { knowledgePointIds: [weather, story], prompt: '整理一次雾天观察和互助记录，怎样让信息更容易理解？', answer: '把天气现象、人物行动和自己的感受分别记录', distractors: ['把观察、行动和感受写成一个无法区分的结论', '只保留自己最喜欢的一句话'], hint: '不同类型的信息可以分别记录，再放在一起回看。', explanation: '分开记录天气、行动和感受，之后更容易核对事情经过。' },
  ],
  high: [
    { knowledgePointIds: [weather, fog, care], prompt: '小组准备做一次雾天观察，哪份计划更完整？', answer: '设定安全地点、观察时间、记录项目和停止条件', distractors: ['只写“出去看看”，不确定地点和成人安排', '为了观察清楚，走到车辆经过的路边'], hint: '计划既要说明怎样观察，也要先考虑安全。', explanation: '明确地点、时间、观察项目和何时停止，能让活动更有条理也更安全。' },
    { knowledgePointIds: [seasonal, weather], prompt: '同学想把一周的季节变化画成一张图，怎样让图有依据？', answer: '先写出观察线索，再画出它们共同呈现的季节变化', distractors: ['先画喜欢的景物，再随意添加观察记录', '只抄一种颜色，不记录天气或景物'], hint: '让每个画面都能找到对应的观察线索。', explanation: '先整理记录再画图，可以让季节变化和实际线索相对应。' },
    { knowledgePointIds: [fog, weather], prompt: '想让伙伴看出雾散前后有什么变化，怎样安排记录？', answer: '在相同地点观察雾前后，并记录视线变化和时间', distractors: ['每次选不同地点，只写“看起来好多了”', '只画雾的颜色，不记观察对象'], hint: '保留同一观察对象和清楚的时间信息。', explanation: '相同地点、同一对象和前后时间记录，有助于看清雾散后的变化。' },
    { knowledgePointIds: [care, story], prompt: '故事中的伙伴遇到困难，怎样设计一个尊重对方的互助办法？', answer: '先听伙伴说需要什么，再一起商量是否采取帮助', distractors: ['不问对方就替他决定所有步骤', '把伙伴遇到的困难讲给别人取笑'], hint: '让帮助回应伙伴实际表达的需要。', explanation: '先倾听并共同商量，既能提供帮助，也尊重伙伴的选择。' },
    { knowledgePointIds: [weather, seasonal], prompt: '记录显示花坛里有新芽，但还没有看到花，怎样写结论更准确？', answer: '依据已记录的现象提出推想，并注明还需验证的部分', distractors: ['直接写成花已经开放', '删除没有看到花的记录，只保留原来的想法'], hint: '结论要符合已经记录的内容。', explanation: '新芽是观察到的现象，花是否开放还要继续观察，不能把推想当作事实。' },
    { knowledgePointIds: [story], prompt: '准备给低年级伙伴讲一个互助故事，怎样整理故事卡？', answer: '按事情的开头、行动、变化和结果整理故事卡', distractors: ['先写结论，其他部分按想起的顺序补充', '只贴人物图片，不记录事情经过'], hint: '让听众知道事情怎样开始、发展并结束。', explanation: '按开头、行动、变化和结果整理，听众更容易跟上故事。' },
    { knowledgePointIds: [care, fog], prompt: '你发现同伴准备独自穿过视线不清的小路，怎样提醒更合适？', answer: '把安全提醒写成具体、友好的可执行建议', distractors: ['用责备的话让同伴觉得害怕', '只写“你不可以走”，不说明下一步怎么办'], hint: '建议要让对方知道可以怎样安全行动。', explanation: '清楚说明可执行的做法并保持尊重，比责备或只禁止更有帮助。' },
    { knowledgePointIds: [weather, story], prompt: '写观察日记时想表达“我很惊讶”，怎样保留信息层次？', answer: '同时展示观察事实和个人感受，并标清两者不同', distractors: ['把自己的感觉改写成所有人都看到的事实', '只写感受，删掉天气和景物记录'], hint: '记录事实和感受时使用不同的表达位置。', explanation: '事实说明观察到什么，感受说明自己的反应，分开表达更准确。' },
    { knowledgePointIds: [fog, weather], prompt: '两条天气线索给出的判断不一样，小组怎样继续调查？', answer: '发现两条线索冲突时，补充观察后再决定', distractors: ['只选自己最喜欢的一条，马上宣布结论', '删掉两条记录，重新编一个相同的答案'], hint: '保留已有线索，再寻找能帮助判断的新信息。', explanation: '补充观察并对照记录，能让判断建立在更多证据上。' },
    { knowledgePointIds: [story, care], prompt: '要回顾一次小组帮助伙伴的过程，记录什么更能说明事情怎样发展？', answer: '记录每一步行动及环境变化，再讨论事情结果', distractors: ['只记最后谁完成得最快', '只写“大家很努力”，不记录采取了什么行动'], hint: '留下事情发生过程中的行动和变化。', explanation: '行动和环境变化能帮助小组回想事情经过，再共同讨论结果。' },
    { knowledgePointIds: [care, weather], prompt: '准备发布一张校园雾天提示卡，怎样确认建议合适？', answer: '检查建议是否适合情境，并请成人核对安全性', distractors: ['只检查字体大小，不看建议是否安全', '让同学投票选一句最刺激的话'], hint: '涉及安全的内容要结合实际场景，并请可信任的成人确认。', explanation: '检查情境并请成人核对，能避免提示不准确或不安全。' },
    { knowledgePointIds: [seasonal], prompt: '怎样把诗句里的景物和自己想象的画面分清楚？', answer: '将诗句里的景物词与画面想象分栏记录', distractors: ['把想象补充的所有内容都写成诗句原文', '只抄诗句，不标出自己想到的画面'], hint: '留出不同位置，一边记读到的词，一边记想到的画面。', explanation: '分栏记录能说明哪些来自诗句，哪些是读者的想象。' },
    { knowledgePointIds: [weather], prompt: '观察一片树叶的变化时，怎样避免只凭一次观察就下结论？', answer: '选择能重复观察的项目，避免只凭一次结果下结论', distractors: ['只看一次就说整棵树都发生了相同变化', '每次换不同的叶子，也不记日期'], hint: '后续记录要能和前一次对照。', explanation: '多次记录相同项目能帮助确认变化，单次观察不能代表所有情况。' },
    { knowledgePointIds: [seasonal, weather, fog, story, care], prompt: '要做一张介绍本单元学习方法的主题卡，哪种安排最完整？', answer: '汇总季节线索、故事顺序和安全行动，制作主题卡', distractors: ['只写天气名称，不说如何观察或行动', '只画人物，不标明故事和环境线索'], hint: '把读诗、观察、讲故事和友好行动中的方法联系起来。', explanation: '同时呈现季节线索、故事顺序和安全互助方法，能综合本单元主题。' },
  ],
};

export const grade2Term1ChineseUnit07SupplementalActivities: Grade2Term1ChineseUnit07SupplementalActivity[] = Object.entries(drafts).flatMap(([difficulty, items]) => (
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
