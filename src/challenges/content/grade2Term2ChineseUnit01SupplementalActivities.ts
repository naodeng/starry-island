import type { ChoiceActivityDefinition, Difficulty } from '../../content/types';

export interface Grade2Term2ChineseUnit01SupplementalActivity {
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

const sourceUnitId = 'grade-2/term-2/chinese/unit-01';
const idPrefix = 'challenge-supplement-grade-2-term-2-chinese-unit-01';
const sensory = 'spring-sensory-observation';
const poetry = 'spring-poetry-imagery';
const evidence = 'observation-facts-and-inference';
const growth = 'plant-growth-recording';
const sharing = 'sharing-kindness-and-consequence';
const planting = 'planting-sequence-and-care';

const drafts: Record<Difficulty, ActivityDraft[]> = {
  basic: [
    { knowledgePointIds: [sensory], prompt: '想把听到的春日声音记下来，哪条记录最清楚？', answer: '上午在树旁听到两声鸟叫', distractors: ['树旁的叶子是绿色的', '鸟儿一定正在找新家'], hint: '记录听觉线索时，写下听到了什么和在哪里听到。', explanation: '“听到鸟叫”是声音线索，地点和次数让记录更具体。' },
    { knowledgePointIds: [sensory], prompt: '观察天气时，哪一项属于触觉感受？', answer: '手背感觉到风变暖了', distractors: ['看见天空有白云', '听见雨点落在窗台上'], hint: '触觉和身体接触时感到的冷热、轻重等有关。', explanation: '风吹过皮肤时感到暖，是触觉收集到的线索。' },
    { knowledgePointIds: [evidence], prompt: '只在校门旁看见一朵花开放，怎样说更准确？', answer: '我在校门旁看见一朵花开了', distractors: ['全城的花今天都开了', '明天这里一定会开很多花'], hint: '说出自己实际观察到的范围，不替没有观察的地方下结论。', explanation: '记录具体地点和现象，不把一次观察扩大成普遍结论。' },
    { knowledgePointIds: [sensory, evidence, poetry], prompt: '看到柳枝上有嫩叶后，哪句话把观察和想象分清了？', answer: '我看见嫩叶，觉得它们像绿色的小扇子', distractors: ['我看见嫩叶在给大家扇风', '柳树每天都在和路人说话'], hint: '“看见”可以记录现象，“像”可以引出自己的联想。', explanation: '嫩叶是观察到的事实，“像小扇子”是根据外形作出的联想。' },
    { knowledgePointIds: [growth], prompt: '想比较一棵小树两周内的高度，怎样记录合适？', answer: '每次在同一位置测量并写下日期', distractors: ['每次站在不同地方凭感觉比较', '只记最后一次的高度'], hint: '前后记录要有可以比较的条件。', explanation: '固定测量位置并注明日期，才能看出高度变化。' },
    { knowledgePointIds: [sharing], prompt: '同桌忘带彩笔，怎样分享更友好？', answer: '先问同桌需要哪种颜色，再借给他用', distractors: ['不询问就把同桌的东西拿来交换', '借出后一直催同桌马上还'], hint: '分享前确认对方需要什么，也说清怎样使用。', explanation: '先询问再借用，能照顾伙伴的需要和物品归还。' },
    { knowledgePointIds: [planting], prompt: '种树前先做哪一步？', answer: '和成人一起选好位置并准备树坑', distractors: ['先把树苗放倒在地上', '先把所有叶子摘下来'], hint: '先准备适合种植的位置，再安放树苗。', explanation: '选址和准备树坑是栽种前的准备，之后再扶正、填土和照料。' },
    { knowledgePointIds: [sensory], prompt: '想记录春雨开始了，哪条观察最能说明你听到的线索？', answer: '我听见雨点敲在窗台上', distractors: ['窗台旁的花盆是棕色的', '雨水一定会让明天变晴'], hint: '找出句子里通过耳朵收集到的信息。', explanation: '“听见雨点敲在窗台上”记录了声音，其他选项不是听到的现象。' },
    { knowledgePointIds: [poetry, sensory], prompt: '春日联想要根据观察到的景物，哪种表达最合适？', answer: '柳条像轻轻摆动的绿色丝带', distractors: ['柳条正在给远方的云朵写信', '柳条每天都能听懂大家的话'], hint: '可以把看见的形状和动作，想成相似的画面。', explanation: '柳条的绿色和摆动能支持“像丝带”的联想；会写信、听懂说话则没有观察依据。' },
    { knowledgePointIds: [growth], prompt: '发现花盆里的土摸起来干了，怎样照料并留下记录？', answer: '适量浇水，过一段时间再观察并记下变化', distractors: ['一次倒满整壶水后不再查看', '把植物拔出来检查根部'], hint: '照料后还要回来观察，看看发生了什么变化。', explanation: '依据土壤情况适量浇水，并持续观察，比过度浇水或拔出植物安全。' },
    { knowledgePointIds: [sharing], prompt: '小组种下的花开了，怎样分享这件事更合适？', answer: '邀请伙伴一起观察并轮流介绍发现', distractors: ['只允许一个人靠近花坛', '把所有花摘下来分给大家'], hint: '分享可以是共同参与和交流，不需要损坏植物。', explanation: '邀请伙伴观察、轮流表达，既分享发现也保护花朵。' },
    { knowledgePointIds: [planting], prompt: '树苗扶正、填好土后，接下来怎样做？', answer: '适量浇水并整理工具和周围地面', distractors: ['把工具留在通道中就离开', '用力拉树苗检查是否长高'], hint: '栽种后还有照料和整理工作。', explanation: '适量浇水、收好工具并整理现场，能让劳动过程完整安全。' },
    { knowledgePointIds: [sensory, evidence], prompt: '要确认今天风比昨天凉，最有帮助的做法是什么？', answer: '在相近时间记录身体感受和天气情况，并与昨天相近时间的记录对照', distractors: ['只看一张没有日期的旧照片', '听别人说今天一定更冷'], hint: '比较需要前后有可对照的观察记录。', explanation: '记录今天和昨天相近时间的风感与天气，再进行对照，比较依据更充分。' },
    { knowledgePointIds: [planting, sharing], prompt: '小组要给树苗浇水，怎样安排更有序？', answer: '先商量分工，再轮流用水壶并收好工具', distractors: ['大家同时挤到树坑旁抢水壶', '由一个人浇很多水，其他人不观察'], hint: '合作前先商量每个人做什么。', explanation: '分工和轮流能减少拥挤，也方便大家一起照料和整理。' },
  ],
  advanced: [
    { knowledgePointIds: [sensory, evidence], prompt: '连续几天想了解春风有没有变暖，怎样留下可比较的记录？', answer: '每天在相近时间和地点记下触感及天气', distractors: ['每天随意换地点，只记“很舒服”', '等到月底凭记忆写结论'], hint: '让观察条件尽量相同，并把感受写具体。', explanation: '相近的时间、地点和具体记录，有助于比较连续变化。' },
    { knowledgePointIds: [evidence, growth], prompt: '两次记录都显示小树有新叶，但观察日期不同。现在能说什么？', answer: '两次观察时都看到新叶，是否持续增加还要继续记录', distractors: ['小树每天都长出相同数量的新叶', '新叶一定是浇水造成的'], hint: '记录能支持观察到的内容，不能单独证明所有原因。', explanation: '两次记录说明各自观察时有新叶，但不足以证明每天的变化或原因。' },
    { knowledgePointIds: [sensory, poetry], prompt: '《咏柳》中把二月春风比作剪刀。想用观察补充这幅春日画面，先做什么？', answer: '先说明这是诗中的比喻，再观察风吹柳枝的样子并记下来', distractors: ['把春风当成真的剪刀，到树下剪枝', '只凭诗句说自己听见了剪刀声'], hint: '诗中用词是想象，自己的观察需要实际收集。', explanation: '“剪刀”是诗中的比喻；观察风怎样吹动柳枝，再另行记录，能区分诗句想象与实际线索。' },
    { knowledgePointIds: [evidence], prompt: '读到“花开满了小路”，想判断花从哪里来，哪种依据更可靠？', answer: '查找故事中关于种子、传递和生长的线索', distractors: ['只凭自己喜欢的答案作决定', '把现实生活里见过的事当作故事情节'], hint: '回到故事已经写出的内容找线索。', explanation: '故事中的种子和传递线索才是解释情节的依据，个人喜好不能代替文本证据。' },
    { knowledgePointIds: [growth], prompt: '同一株树的两张观察卡，一张写“新叶三片”，另一张写“新叶五片”。还缺什么信息才能更好比较？', answer: '两次记录的日期和相同的观察范围', distractors: ['记录者最喜欢的季节', '树苗旁边同学的名字'], hint: '比较变化时要知道什么时候、在哪个范围内观察。', explanation: '日期和观察范围能帮助判断前后记录是否可比。' },
    { knowledgePointIds: [sharing], prompt: '伙伴不想公开自己写的春日观察卡，怎样分享更尊重他？', answer: '先询问是否愿意分享，也可以邀请他只讲一个发现', distractors: ['未经同意把观察卡念给全班听', '因为他不分享就不再和他合作'], hint: '分享要给伙伴选择的机会。', explanation: '征得同意并提供较小的分享方式，能尊重伙伴的意愿。' },
    { knowledgePointIds: [planting], prompt: '植树活动地点有石块，怎样调整准备步骤更稳妥？', answer: '先请成人一起检查地点，再决定是否换到合适位置', distractors: ['不检查就直接在石块上挖坑', '把树苗放在路边后自行离开'], hint: '开始劳动前先确认地点是否适合并听从成人安排。', explanation: '由成人协助检查并选合适地点，比在不适合处勉强种植更稳妥。' },
    { knowledgePointIds: [sensory, growth], prompt: '观察树苗时想记录叶子的颜色和数量，怎样写最有用？', answer: '注明日期，再写叶片颜色和数到的数量', distractors: ['只写“今天很好看”', '写“明天一定会多出十片叶子”'], hint: '记录可观察到的细节，不把预测写成结果。', explanation: '日期、颜色和数量是可核对的观察信息；未来变化只能作为预测。' },
    { knowledgePointIds: [evidence, sharing], prompt: '伙伴说“分享花种以后，大家都变开心了”。要让这句话更有依据，可以补充什么？', answer: '写下谁分享了什么，以及伙伴后来怎样回应', distractors: ['只把“大家”改成更大的字', '猜每个人心里都在想什么'], hint: '用能观察到的行动和回应支持判断。', explanation: '具体分享行动和可见回应能支持结论，不能替每个人断定内心想法。' },
    { knowledgePointIds: [growth, planting], prompt: '树苗刚栽好，如何安排后续照料记录？', answer: '按日期观察土壤和叶片，再根据记录决定是否需要照料', distractors: ['无论土壤如何，每天浇很多水', '只在种下当天记录一次就不再查看'], hint: '先观察实际情况，再决定下一步。', explanation: '持续记录并依据土壤、叶片状态调整照料，比固定过量浇水更合适。' },
    { knowledgePointIds: [sharing, evidence], prompt: '故事里有人把花种传给邻居，后来小路边出现花。哪种说法最谨慎？', answer: '故事把传递花种和后来出现花联系起来，但不必推断每个人的心情', distractors: ['所有邻居一定都非常喜欢送花的人', '小路边每一朵花都由同一个人亲手种下'], hint: '说清故事提供的行动和结果，不添加没有写出的想法。', explanation: '传递花种和出现花是情节线索；人物的全部感受和每朵花的来源未必都已说明。' },
    { knowledgePointIds: [planting, sharing], prompt: '小组只有一把小铲子，怎样合作完成种植准备？', answer: '商量轮流挖土、扶苗和整理工具，并注意安全距离', distractors: ['几个人同时拉扯小铲子', '谁先拿到就一直使用，不让别人参与'], hint: '先协商角色和顺序，避免争抢。', explanation: '分工轮流能让每个人参与，也能减少工具争抢和靠得太近的风险。' },
    { knowledgePointIds: [sensory, evidence], prompt: '同一天下午，花坛边闻到花香但没有看到花，记录怎样写更准确？', answer: '记下闻到花香，并说明当时没有看到花', distractors: ['写成“我看到花开在花坛里”', '确定香味来自某一种花'], hint: '分别记录实际感官信息和还未确认的来源。', explanation: '闻到香味是直接线索，具体来源和是否有花还需要继续观察。' },
    { knowledgePointIds: [growth, sharing], prompt: '伙伴认为树苗变高是因为小组浇水，怎样一起检查这个想法？', answer: '对照浇水日期和前后测量记录，也继续观察其他条件', distractors: ['只听声音最大的人决定原因', '因为大家一起浇过水，就不再查记录'], hint: '找能够核对的记录，也留意其他可能影响。', explanation: '记录可以帮助检查时间关系，但还要考虑光照等条件，不能只凭印象确定原因。' },
  ],
  high: [
    { knowledgePointIds: [sensory, evidence, growth], prompt: '小组准备制作春日观察报告，怎样让“树苗长高了”的结论更可信？', answer: '说明日期、测量位置和前后高度，并区分记录与推测', distractors: ['只写“大家都觉得它长高了”', '只放一张没有日期的照片并断定原因'], hint: '让读者能比较前后数据，也看清哪些是推想。', explanation: '日期和统一测量位置支持比较；数据说明变化，但原因仍需额外证据。' },
    { knowledgePointIds: [evidence, sharing], prompt: '导览伙伴说某处花是别人分享种子后长出来的。怎样核对这条信息？', answer: '回看记录或询问相关参与者，并把已确认和未确认部分分开', distractors: ['把伙伴的猜测直接写成事实', '因为花开在那里，就认定每个细节都正确'], hint: '传闻可以成为线索，但还需要可以核对的来源。', explanation: '记录或当事人信息能帮助核实来源，报告应区分事实与尚未确认的推断。' },
    { knowledgePointIds: [planting, growth], prompt: '植树后连续观察到叶片有些发蔫，下一步怎样记录和处理较合适？', answer: '记下日期、土壤和天气，先请成人一起检查再调整照料', distractors: ['马上大量浇水并剪掉所有叶片', '只记录“树苗不好”，不再观察'], hint: '先收集环境线索并请成人协助，再决定怎样照料。', explanation: '土壤和天气可能影响状态，先记录并共同检查，避免没有依据地过度处理。' },
    { knowledgePointIds: [sensory, evidence, poetry], prompt: '读完《咏柳》后，如果把春风想象成在轻轻说话，做分享时怎样表达更清楚？', answer: '先说这是一种想象，再指出风吹动树叶等观察线索', distractors: ['说自己真的听见春风讲话', '只背诵想象，不说明它从哪里来'], hint: '把自己的想象和现实观察联系起来，同时说清二者不同。', explanation: '说明这是自己根据风吹动树叶展开的想象，并用可观察的线索支持联想，表达会更清楚。' },
    { knowledgePointIds: [sharing, planting], prompt: '班级想把种下的花介绍给更多同学，怎样分享既友善又爱护植物？', answer: '设置观察路线并轮流介绍，不采摘花朵', distractors: ['每位同学摘一朵带走', '挤进花坛中围住花朵'], hint: '分享发现不需要带走或踩踏植物。', explanation: '安全路线和轮流介绍能让大家参与，也能保护花坛。' },
    { knowledgePointIds: [growth, evidence], prompt: '观察卡记录两周内新叶从三片变成五片。哪种结论最符合记录？', answer: '两次记录时新叶数量不同，后续还可继续观察', distractors: ['这株树每天固定长出两片新叶', '增加的新叶一定由浇水造成'], hint: '结论不要超过现有记录所能支持的范围。', explanation: '两次数据支持“记录时数量不同”，不足以说明每天变化规律或单一原因。' },
    { knowledgePointIds: [planting, sharing], prompt: '小组在植树时发现原定位置会挡住通道，怎样调整并完成活动？', answer: '暂停劳动，和成人及伙伴商量新位置后再继续', distractors: ['仍按原计划挖坑，不告诉任何人', '把树苗暂放通道中就去找工具'], hint: '发现安全或通行问题时，先暂停并共同调整。', explanation: '先暂停、协商安全位置，再继续栽种，可以保护行人并完成活动。' },
    { knowledgePointIds: [sensory, growth], prompt: '两位同学对“今天风更暖”意见不同，怎样收集更有帮助的线索？', answer: '在相近地点和时间记录各自感受及天气，再比较记录', distractors: ['让其中一人必须承认自己错了', '只看树叶颜色就决定风的温度'], hint: '把意见变成可以共同观察和比较的记录。', explanation: '一致的时间地点和感受记录能帮助比较，也不必把不同感受立刻判为对错。' },
    { knowledgePointIds: [evidence, growth], prompt: '有人根据一次浇水后叶片挺起，认为浇水就是唯一原因。还需要怎样检查？', answer: '继续记录土壤、天气和叶片变化，并比较不同时间的情况', distractors: ['只重复原来的结论，不收集新信息', '立即停止所有照料来证明猜想'], hint: '一次前后变化还不能排除其他条件。', explanation: '持续记录多个相关条件，才能更谨慎地判断变化和照料之间的关系。' },
    { knowledgePointIds: [sharing, evidence], prompt: '准备介绍“善意会带来变化”，怎样避免把自己的想法说成故事事实？', answer: '先讲故事写出的分享行动和后续变化，再说明自己的理解', distractors: ['替每个人说出没有写明的心情', '只讲自己的结论，不提情节依据'], hint: '先用情节线索，再把个人理解标明。', explanation: '行动和结果是可引用的情节，感受或意义的判断应作为自己的理解说明。' },
    { knowledgePointIds: [planting, growth], prompt: '小组要制定树苗照料计划，哪种安排能根据植物实际情况调整？', answer: '定期观察土壤和叶片，记录后再商量是否浇水', distractors: ['不看土壤，每天固定浇满一壶', '照料一次后就认定树苗不再需要观察'], hint: '计划需要观察结果，也留出调整的机会。', explanation: '观察记录能帮助判断照料需求，固定过量浇水或停止观察都不够可靠。' },
    { knowledgePointIds: [sensory, evidence, sharing], prompt: '春日导览中，伙伴指出你漏掉了一处鸟叫声。怎样把这条新线索纳入报告？', answer: '询问伙伴的观察时间和地点，核实后补充声音记录', distractors: ['不核对就写成每天都能听见', '因为自己没听到，就说伙伴一定记错'], hint: '先尊重伙伴提供的线索，再确认它的观察条件。', explanation: '时间和地点能帮助复核声音观察，既不盲目扩大，也不因自己没听见就否定伙伴。' },
    { knowledgePointIds: [planting, sharing, evidence], prompt: '活动结束后树苗旁出现工具和松土，小组要写劳动记录，怎样写更完整？', answer: '按准备、栽种、照料和整理的过程写，并注明共同分工', distractors: ['只写最后看到的树苗，不记劳动过程', '猜每位同学的心情代替实际行动'], hint: '记录可核对的步骤、结果和合作内容。', explanation: '按过程写出行动和分工，能呈现劳动顺序；不确定的心情不应代替实际记录。' },
    { knowledgePointIds: [sensory, evidence, growth], prompt: '春日报告里同时有观察、记录和想象，哪种结构最便于读者判断依据？', answer: '先写时间地点和观察，再列前后记录，最后单独写联想', distractors: ['把想象和记录混写，不标明来源', '先给结论，再省略观察条件和数据'], hint: '让读者先看到依据，再看到比较和想象。', explanation: '标明观察条件、记录和联想的不同，读者就能分辨证据与表达。' },
  ],
};

export const grade2Term2ChineseUnit01SupplementalActivities: Grade2Term2ChineseUnit01SupplementalActivity[] = Object.entries(drafts).flatMap(([difficulty, items]) => (
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
