import type { ChoiceActivityDefinition, Difficulty } from '../../content/types';

export interface Grade2Term1ChineseUnit06SupplementalActivity {
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

const sourceUnitId = 'grade-2/term-1/chinese/unit-06';
const idPrefix = 'challenge-supplement-grade-2-term-1-chinese-unit-06';
const sequence = 'story-event-sequence';
const character = 'character-action-and-quality';
const evidence = 'story-evidence-and-inference';
const cooperation = 'cooperation-and-respect';
const reflection = 'reflection-and-action-planning';

const drafts: Record<Difficulty, ActivityDraft[]> = {
  basic: [
    { knowledgePointIds: [sequence], prompt: '要把一段人物故事讲清楚，怎样安排线索？', answer: '先交代事情背景，再按顺序讲行动和结果', distractors: ['先说自己的感受，不讲故事经过', '先猜结尾，再补上想象的行动'], hint: '想想听众需要先知道什么，再了解后来发生的事。', explanation: '先有背景，再按发生顺序讲行动和结果，听众更容易听明白。' },
    { knowledgePointIds: [character], prompt: '想说明一个人做事认真，哪种线索最有用？', answer: '他按步骤检查并完成工作', distractors: ['故事插图用了很多颜色', '讲故事的人坐在第一排'], hint: '从人物做过的事情中找依据。', explanation: '按步骤检查并完成工作是能观察到的行动，可以支持对做事态度的理解。' },
    { knowledgePointIds: [evidence], prompt: '哪项属于能从故事里核对的信息？', answer: '人物和伙伴一起完成工作', distractors: ['我觉得这个故事最有趣', '人物心里一定只想着自己'], hint: '区分故事中发生的事和读者的想法。', explanation: '人物和伙伴一起工作的情节可以回到故事中核对；另外两项是感受或猜想。' },
    { knowledgePointIds: [sequence, evidence], prompt: '讲《八角楼上》的人物工作，哪类信息能帮助听众了解场景？', answer: '故事写到的环境和人物行动', distractors: ['读者喜欢什么颜色', '人物没有说过的心里话'], hint: '回想课程中怎样从环境和行动了解人物。', explanation: '环境和行动是理解人物工作场景的故事线索，不能用读者喜好或未写出的想法代替。' },
    { knowledgePointIds: [cooperation], prompt: '小组要一起完成一项工作，先做什么更合适？', answer: '听清任务，再和伙伴商量分工', distractors: ['不听安排，自己拿走所有材料', '让一个人做完，其他人不参与'], hint: '共同完成任务需要先了解要做什么。', explanation: '听清任务并商量分工，能让伙伴一起参与。' },
    { knowledgePointIds: [cooperation], prompt: '伙伴表达了不同想法，怎样回应更合适？', answer: '听完伙伴的理由，再礼貌说自己的想法', distractors: ['打断伙伴并要求他照做', '不听理由就说伙伴一定错了'], hint: '先听清楚，再表达自己的意见。', explanation: '认真倾听并礼貌表达，能让大家继续商量。' },
    { knowledgePointIds: [evidence], prompt: '“活动在节日里进行”和“我觉得很温暖”分别是什么？', answer: '前一句是故事信息，后一句是个人感受', distractors: ['两句都是故事信息', '两句都是人物行动'], hint: '一句能回到故事中核对，另一句在说读后的心情。', explanation: '活动时间是故事信息，“我觉得很温暖”是读者表达的个人感受。' },
    { knowledgePointIds: [sequence, character], prompt: '复述《朱德的扁担》相关故事时，哪种内容不能少？', answer: '人物和大家做了什么', distractors: ['讲述者坐在哪里', '故事书封面用了什么颜色'], hint: '复述时要保留故事里的主要行动。', explanation: '讲清人物和伙伴的行动，才能让听众了解事情经过。' },
    { knowledgePointIds: [sequence], prompt: '用“开始、后来、最后”讲一件事，怎样安排更清楚？', answer: '先说开头情况，再按发生顺序讲到结果', distractors: ['先讲结果，再猜一个开头', '把三部分随意交换顺序'], hint: '这些词能帮助听众跟上事情的先后。', explanation: '按事情发生的顺序讲，开头、经过和结果才连得起来。' },
    { knowledgePointIds: [character, evidence], prompt: '说“我很敬佩故事人物”，还应补充什么？', answer: '指出故事里让自己敬佩的行动', distractors: ['只说人物名字，不说理由', '说读者都必须有同一种感受'], hint: '让感受和一条故事线索连起来。', explanation: '指出具体行动，才能说明自己的敬佩从哪里来。' },
    { knowledgePointIds: [cooperation], prompt: '哪项做法能体现伙伴之间的合作？', answer: '轮流完成约好的工作', distractors: ['把伙伴的材料藏起来', '不商量就替伙伴作决定'], hint: '想想什么做法能让大家一起参与。', explanation: '轮流完成约好的工作能让伙伴共同参与。' },
    { knowledgePointIds: [evidence, reflection], prompt: '读完故事后还想了解人物为什么这样做，接下来可以问什么？', answer: '故事里还有哪些行动线索可以帮助理解？', distractors: ['谁的想法最受欢迎？', '我能不能不看故事就决定答案？'], hint: '提出一个能回到故事中寻找依据的问题。', explanation: '继续查找行动线索，有助于用故事依据理解人物。' },
    { knowledgePointIds: [cooperation, reflection], prompt: '伙伴帮你完成一项共同任务后，怎样感谢更具体？', answer: '说清伙伴做了哪件事，并向他表示谢谢', distractors: ['把功劳都算在自己身上', '假装没有看见伙伴的帮助'], hint: '把感谢和伙伴实际做的事连起来。', explanation: '说出具体帮助并表示感谢，能让伙伴知道他的付出被看见。' },
    { knowledgePointIds: [sequence, evidence], prompt: '整理人物故事笔记，怎样避免把感受当成故事事实？', answer: '分开记录故事信息和自己的读后感受', distractors: ['把两类内容混成一个结论', '只记自己最喜欢的部分'], hint: '给“故事里发生的事”和“我的感受”留不同位置。', explanation: '分开记录信息与感受，复述时就能找到故事依据。' },
  ],
  advanced: [
    { knowledgePointIds: [sequence, evidence], prompt: '想解释人物为什么这样做，哪组线索更完整？', answer: '结合事情背景、人物行动和后来结果', distractors: ['只看故事标题，不看经过', '只说自己的感受，不提故事内容'], hint: '把行动放回事情发生的背景中，再看后来怎样。', explanation: '背景、行动和结果连在一起，能支持更完整的理解。' },
    { knowledgePointIds: [character, evidence], prompt: '要说明人物做事认真，哪条证据更合适？', answer: '引用他按步骤检查并完成工作的行动', distractors: ['引用故事插图的颜色', '引用读者坐在教室哪一排'], hint: '品质判断要由人物行动支持。', explanation: '按步骤检查并完成工作的行动能支持“认真”这一理解。' },
    { knowledgePointIds: [evidence], prompt: '“人物和伙伴一起劳动”与“我觉得合作很可贵”分别是什么？', answer: '前一句是故事信息，后一句是个人评价', distractors: ['前一句是读者心情，后一句是故事行动', '两句都能直接当作故事发生的事'], hint: '一项能在故事里核对，另一项说的是个人理解。', explanation: '人物一起劳动是故事信息；认为合作可贵是读者作出的评价。' },
    { knowledgePointIds: [sequence, character], prompt: '复述人物故事时，怎样安排内容更有头有尾？', answer: '交代背景，按顺序讲行动和结果，再说自己的感受', distractors: ['先说感受，再省略故事经过', '只列人物名字和故事标题'], hint: '让听众先听懂发生了什么，再听你的想法。', explanation: '先讲清故事线索，再表达感受，分享会更完整。' },
    { knowledgePointIds: [evidence, reflection], prompt: '两位同学对人物行动有不同理解，怎样继续讨论？', answer: '回到故事，比较两种说法分别依据什么', distractors: ['要求大家跟着人数多的一方', '不看故事，只选自己喜欢的说法'], hint: '先找出每种理解背后的故事线索。', explanation: '比较各自依据，能让讨论回到故事内容，而不是只靠偏好。' },
    { knowledgePointIds: [sequence, evidence], prompt: '讲到人物行动和后来结果时，怎样避免弄混先后？', answer: '先记下行动，再按故事顺序补上后来的结果', distractors: ['先猜结果，再编一个行动', '省去事情经过，只留下最后一句'], hint: '留意故事中事情发生的先后。', explanation: '按先后记录行动和结果，听众才能跟上经过。' },
    { knowledgePointIds: [character], prompt: '哪项行动更能支持“愿意为大家出力”这一理解？', answer: '主动承担一项大家需要完成的工作', distractors: ['只挑自己喜欢的部分，不与伙伴商量', '不参与任务却说自己做了很多'], hint: '看人物有没有采取实际行动。', explanation: '主动承担共同任务是能观察到的行动，可以支持这一理解。' },
    { knowledgePointIds: [evidence, reflection], prompt: '分享读后感时，怎样把想法和依据说清楚？', answer: '先说故事里的行动，再说明它带给自己的感受', distractors: ['只说“我喜欢”，不提故事内容', '把自己的感受说成所有人都确认的事实'], hint: '让感受能找到对应的故事线索。', explanation: '先讲行动，再说明感受，听众能了解想法从哪里来。' },
    { knowledgePointIds: [cooperation, reflection], prompt: '小组合作的结果不理想，下一步怎样回顾更有帮助？', answer: '一起回看分工和实际发生的事，再商量调整', distractors: ['只责怪一个伙伴，不看经过', '马上放弃所有合作任务'], hint: '先了解事情经过，再找可以调整的地方。', explanation: '回看分工和实际情况，能帮助小组找到下一步办法。' },
    { knowledgePointIds: [evidence, character], prompt: '要支持“人物很关心伙伴”这一看法，应该找什么？', answer: '故事中他关心伙伴的一项具体行动', distractors: ['人物名字的字数', '读者最喜欢的颜色'], hint: '判断人物特点时，找能回到故事核对的行动。', explanation: '具体行动比名字或读者喜好更能支持人物特点的判断。' },
    { knowledgePointIds: [cooperation, character], prompt: '读到共同劳动的故事，想联系自己的生活，可以怎样表达？', answer: '先说故事中的合作行动，再说自己想尝试的一件小事', distractors: ['只评价谁做得最好，不提行动', '把故事人物没有做过的事加进复述'], hint: '把故事依据和自己的生活想法分开说。', explanation: '先复述故事线索，再提出自己的小行动，能分清故事与生活联系。' },
    { knowledgePointIds: [sequence, evidence], prompt: '比较两段人物故事时，怎样记录才不把细节混在一起？', answer: '分别记下每段故事的背景和人物行动', distractors: ['把两段故事合成一段，不标来源', '只记自己赞成的那段'], hint: '每条线索都要能回到它所属的故事。', explanation: '分开记录不同故事的背景和行动，比较时才不容易张冠李戴。' },
    { knowledgePointIds: [evidence, reflection], prompt: '从一条行动线索还不能确定人物的全部想法，怎样说更稳妥？', answer: '说明看到的行动，并把自己的理解说成一种想法', distractors: ['断定人物心里只有一个原因', '把猜测说成故事已经写明的事实'], hint: '区分故事写出的内容和读者的理解。', explanation: '行动可以核对；对内心想法的解释要说明是自己的理解。' },
    { knowledgePointIds: [cooperation, evidence], prompt: '伙伴提出一个合作办法，怎样判断它是否回应了大家的需要？', answer: '对照大家遇到的问题，看看办法能不能帮助解决', distractors: ['只看办法的名字是否好听', '不听大家的情况就立刻决定'], hint: '把办法和真实遇到的事情放在一起考虑。', explanation: '办法需要回应实际问题，才可能帮助大家合作。' },
  ],
  high: [
    { knowledgePointIds: [reflection, cooperation], prompt: '想让班级合作更顺利，怎样把行动计划写得清楚可做？', answer: '写明要解决的小问题、行动步骤、分工和回顾办法', distractors: ['只写一个口号，不说怎样做', '先选奖励，不说明要改善什么'], hint: '计划需要说清目标、行动和怎样回头检查。', explanation: '问题、步骤、分工和回顾办法齐全，伙伴才知道如何开始和检查。' },
    { knowledgePointIds: [cooperation, reflection], prompt: '“让大家更有礼貌”这个目标不够具体，怎样改写更容易行动？', answer: '约定轮流发言，先听完伙伴再回应', distractors: ['要求每个人都变得更好', '只写“要友善”，不说明做法'], hint: '把目标变成伙伴能看见的行动。', explanation: '轮流发言和认真倾听是可以实际尝试的行动。' },
    { knowledgePointIds: [cooperation], prompt: '小组准备共同完成任务，怎样分工更尊重伙伴？', answer: '先听每个人愿意做什么，再一起安排分工', distractors: ['不问伙伴就替他们决定', '只让一位同学做所有事情'], hint: '共同计划前先听听大家的想法。', explanation: '了解伙伴的意愿后再安排分工，能让大家更愿意参与。' },
    { knowledgePointIds: [cooperation, reflection], prompt: '试行合作办法时，有伙伴提出不同意见，怎样处理更合适？', answer: '先听清理由，再商量是否需要调整办法', distractors: ['不听理由，马上取消伙伴的参与', '假装没有听见，继续按原计划做'], hint: '反馈可以帮助小组改进计划。', explanation: '听取理由并共同商量，能让计划更适合实际情况。' },
    { knowledgePointIds: [evidence, reflection], prompt: '怎样判断一项合作办法有没有帮助大家？', answer: '记录行动前后的具体情况，再一起比较', distractors: ['只问谁最喜欢这个办法', '只挑一次成功的情况，不看其他记录'], hint: '用能观察到的情况来回顾结果。', explanation: '比较行动前后的具体记录，比只看喜好更有依据。' },
    { knowledgePointIds: [character, evidence], prompt: '想把人物故事中的合作精神介绍给伙伴，哪种讲法更有依据？', answer: '说出故事中伙伴共同完成的一项行动，再讲自己的理解', distractors: ['只说人物一定在想什么，不讲故事内容', '只说谁最优秀，不说明理由'], hint: '先找故事中能核对的合作行动。', explanation: '用具体行动支持理解，能避免把个人猜想说成故事事实。' },
    { knowledgePointIds: [reflection, evidence], prompt: '行动之后只看到一部分变化，怎样记录结论更准确？', answer: '写下已经观察到的变化，也记下还想继续了解的事', distractors: ['把部分变化说成问题已经完全解决', '删除和预想不同的记录'], hint: '让结论符合记录，也给后续观察留位置。', explanation: '区分已看到的变化和仍待了解的内容，结论才不会夸大。' },
    { knowledgePointIds: [cooperation, reflection], prompt: '有伙伴暂时不愿意承担分工，怎样继续合作？', answer: '听听伙伴的原因，再一起商量合适的分工', distractors: ['责备伙伴并替他决定', '不再让伙伴参加任何活动'], hint: '先了解情况，再寻找大家都能接受的办法。', explanation: '听取原因并调整分工，能保持尊重并继续解决问题。' },
    { knowledgePointIds: [character, evidence], prompt: '讲完人物故事后，怎样表达“我从中受到启发”？', answer: '指出一项故事行动，再说自己准备尝试什么', distractors: ['只说所有人都应该和我一样', '加入故事里没有出现的行动'], hint: '把故事中的线索和自己的打算分开说明。', explanation: '具体说出故事行动和个人打算，能清楚表达受到的启发。' },
    { knowledgePointIds: [evidence], prompt: '一项行动还没有记录结果，哪种说法更符合现有证据？', answer: '目前还不知道结果，需要继续观察', distractors: ['已经证明行动一定成功', '没有记录就能确定行动完全失败'], hint: '结论不能超过已经收集到的信息。', explanation: '没有结果记录时，应说明仍需了解，而不是先作出判断。' },
    { knowledgePointIds: [sequence, evidence], prompt: '比较两种合作办法时，怎样知道自己比较的是同一件事？', answer: '先说清共同目标，再分别记录两种办法的行动和结果', distractors: ['一次换目标、一次换任务，还直接比较结果', '只记自己最喜欢的办法'], hint: '先确定共同目标，再对照每种办法留下的记录。', explanation: '目标清楚并保留行动与结果，比较才有共同依据。' },
    { knowledgePointIds: [reflection, sequence], prompt: '小组记录一项合作行动，哪种顺序更方便之后回顾？', answer: '先记遇到的问题，再记行动、分工和后来情况', distractors: ['先写结论，再补没有核对的经过', '只记活动名称，不记行动和结果'], hint: '记录要让伙伴看得出事情怎样一步步发生。', explanation: '按问题、行动和结果的顺序记录，之后更容易回顾。' },
    { knowledgePointIds: [cooperation, character], prompt: '感谢伙伴时，哪种表达最能说明你注意到了他的贡献？', answer: '说出伙伴做的一件具体事情，并说明它怎样帮助小组', distractors: ['只说“你真棒”，不提做过什么', '把伙伴的工作说成自己完成的'], hint: '让感谢对应伙伴实际做过的事。', explanation: '具体指出贡献和帮助，能表达尊重，也能准确回顾合作过程。' },
    { knowledgePointIds: [reflection, evidence], prompt: '新记录和小组原来的想法不一样，下一步怎样做？', answer: '保留新记录，和原想法一起检查后再决定是否调整', distractors: ['删掉新记录，让原想法保持不变', '不看记录就立刻宣布谁对谁错'], hint: '新线索可以帮助小组重新检查计划。', explanation: '保留并核对新记录，能让调整建立在实际信息上。' },
  ],
};

export const grade2Term1ChineseUnit06SupplementalActivities: Grade2Term1ChineseUnit06SupplementalActivity[] = Object.entries(drafts).flatMap(([difficulty, items]) => (
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
