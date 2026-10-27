import type { ChoiceActivityDefinition, Difficulty } from '../../content/types';

export interface Grade2Term1ChineseUnit08SupplementalActivity {
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

const sourceUnitId = 'grade-2/term-1/chinese/unit-08';
const idPrefix = 'challenge-supplement-grade-2-term-1-chinese-unit-08';
const clues = 'fairy-tale-story-clues';
const repair = 'friendly-communication-repair';
const consequence = 'action-and-consequence';
const inference = 'fact-inference-and-perspective';
const responsible = 'responsible-action-adjustment';

const drafts: Record<Difficulty, ActivityDraft[]> = {
  basic: [
    { knowledgePointIds: [clues], prompt: '讲一段童话时，怎样让伙伴听清事情经过？', answer: '先交代发生的情况，再按先后讲行动和结果', distractors: ['只讲最后的结果，不说前面发生了什么', '把想到的内容都当成故事里写过的事'], hint: '听众需要知道事情从哪里开始。', explanation: '先交代情况，再讲行动和结果，故事经过会更清楚。' },
    { knowledgePointIds: [repair], prompt: '伙伴看到你放出的纸船后没有回应，你想知道原因，先怎样做？', answer: '先问伙伴愿不愿意说，再认真听他说完', distractors: ['不询问就认定伙伴不喜欢自己', '让其他同学替伙伴回答'], hint: '还不知道原因时，先给对方表达的机会。', explanation: '友好询问并认真倾听，才能知道伙伴真实的想法。' },
    { knowledgePointIds: [consequence], prompt: '风娃娃帮忙后，想知道事情有没有变好，接下来观察什么？', answer: '行动后观察变化，再判断结果是否符合原目标', distractors: ['只看自己用了多大力气', '还没观察就说事情一定成功了'], hint: '把做这件事前想达到的结果和后来情况对照。', explanation: '观察结果后再和目标比较，才能了解行动的影响。' },
    { knowledgePointIds: [inference], prompt: '读到“伙伴把纸船放进水里”，怎样分清故事事实和自己的想法？', answer: '区分故事写出的行动和自己对原因的推想', distractors: ['把伙伴为什么这样做直接当成故事事实', '不看故事内容，只说自己的猜测'], hint: '先找故事明确写出的事，再说还不确定的原因。', explanation: '行动是故事写出的内容，行动原因可能需要更多线索判断。' },
    { knowledgePointIds: [clues, inference], prompt: '读童话时对角色的做法不明白，怎样核对自己的理解？', answer: '回到故事前后线索，核对自己的理解', distractors: ['只看角色名字就决定他为什么行动', '把第一个想到的原因当成唯一答案'], hint: '行动前后的事情可能提供解释。', explanation: '前后线索能帮助我们判断角色的做法是否有依据。' },
    { knowledgePointIds: [repair], prompt: '你发现自己打断了伙伴，想把话说开，怎样回应更好？', answer: '承认刚才没有听完，并问伙伴还想补充什么', distractors: ['让伙伴别再提这件事', '说自己着急，所以伙伴不应该生气'], hint: '修复交流要先看看自己的行动给对方带来了什么影响。', explanation: '承认打断并邀请伙伴继续表达，能让交流重新开始。' },
    { knowledgePointIds: [consequence], prompt: '角色做完一件事后要判断有没有影响周围，先做什么？', answer: '看看行动之后出现了什么变化', distractors: ['只记住自己原来想做什么', '只听旁人猜测，不看实际情况'], hint: '行动结果要从行动之后发生的事中寻找。', explanation: '观察行动之后的变化，才能判断它带来了什么结果。' },
    { knowledgePointIds: [repair, inference], prompt: '两位伙伴因为一张留言卡产生误会，怎样开始解决？', answer: '先说清误会，再听伙伴的想法并商量办法', distractors: ['不问清楚就把卡片丢掉', '要求伙伴马上承认都是自己的错'], hint: '先了解双方怎样理解这张卡片。', explanation: '说清误会、互相倾听并商量办法，有助于修复关系。' },
    { knowledgePointIds: [clues, consequence], prompt: '童话里的角色做了一个决定，读者想知道它带来什么结果，应怎样读？', answer: '把角色做的事和事情结果联系起来', distractors: ['只看故事中出现了几个人物', '只按自己喜欢的结尾判断结果'], hint: '找一找行动之后发生了什么。', explanation: '前后联系起来，能看出行动和结果之间的关系。' },
    { knowledgePointIds: [responsible, repair], prompt: '伙伴想自己先试一试，怎样帮忙更尊重他的想法？', answer: '先征求伙伴意见，再决定是否一起行动', distractors: ['不询问就替伙伴完成所有事情', '因为他没有马上接受帮助就离开'], hint: '帮助前先确认对方愿不愿意。', explanation: '先询问伙伴的意见，再决定怎样行动，能尊重对方的选择。' },
    { knowledgePointIds: [inference], prompt: '风吹动了窗边的纸，想记录这件事时怎样写更准确？', answer: '保留看到的现象，把还没证实的原因说成猜想', distractors: ['把猜到的原因写成已经看到的事实', '不写观察结果，只写喜欢的解释'], hint: '“看见了什么”和“为什么会这样”不是同一件事。', explanation: '先记录现象，再把未证实的原因标成猜想，表达更准确。' },
    { knowledgePointIds: [clues], prompt: '复述一个角色帮助伙伴的情节，先补充什么信息？', answer: '说明角色遇到的情况和采取的办法', distractors: ['只告诉听众这个角色叫什么', '先猜角色心里所有没有说出的想法'], hint: '听众要知道角色为什么开始行动。', explanation: '交代遇到的情况和行动，伙伴才容易理解情节。' },
    { knowledgePointIds: [responsible, consequence], prompt: '风大时纸张被吹得到处跑，整理之前怎样做更安全？', answer: '先停下并查看周围，再和成人商量下一步', distractors: ['跑到车行的地方追纸', '推开周围的人，自己先去抢'], hint: '先照顾周围的人和环境，再处理物品。', explanation: '先停下查看情况并请成人协助，比追逐或推挤更安全。' },
    { knowledgePointIds: [clues, inference], prompt: '复述故事时怎样让听众分清事情的发展？', answer: '复述一件事时，分清开头、经过和结果', distractors: ['想到哪儿就说到哪儿，不说明先后', '只说自己最喜欢的一个人物'], hint: '用故事发生的顺序组织内容。', explanation: '开头、经过和结果能帮助听众跟上故事发展。' },
  ],
  advanced: [
    { knowledgePointIds: [clues, inference], prompt: '角色做法看起来突然改变，怎样解释更有根据？', answer: '核对角色行动前后的线索，再说明可能的原因', distractors: ['只按自己的经验给角色下结论', '把猜到的原因说成故事明确写出的事实'], hint: '看看改变之前和之后分别发生了什么。', explanation: '结合前后线索提出可能原因，并保留推想与事实的区别。' },
    { knowledgePointIds: [repair, inference], prompt: '一位伙伴以为留言卡是在生气，另一位说自己只是着急，怎样找出误会？', answer: '说明双方各自知道什么，再寻找误会从哪里开始', distractors: ['只听其中一人说法就判定谁错了', '不看留言内容，只根据表情猜测'], hint: '比较两个人当时看到或听到的信息。', explanation: '了解双方掌握的线索，能找到不同理解出现的位置。' },
    { knowledgePointIds: [consequence], prompt: '角色原想把风筝送到伙伴身边，风筝却挂在树枝上，接下来怎样判断行动结果？', answer: '比较行动前的目标和行动后的实际变化', distractors: ['因为出发时有好意，就说结果已经成功', '只看风筝颜色，不管它现在在哪里'], hint: '把原来的打算和后来发生的事情放在一起看。', explanation: '目标和实际结果不同，说明行动没有按计划完成，还需要调整。' },
    { knowledgePointIds: [inference, clues], prompt: '怎样在读书记录中区分故事里发生的事和自己的判断？', answer: '先标出故事明确写出的事，再说明自己的推想', distractors: ['把读者的推想写成角色说过的话', '只保留猜想，不写故事线索'], hint: '哪些内容能回到故事中找到，哪些是你自己想到的？', explanation: '先记录可核对的情节，再说明推想，能让理解更清楚。' },
    { knowledgePointIds: [clues], prompt: '想说明角色为什么把消息送出去，怎样让判断更具体？', answer: '给出具体行动和结果作为判断依据', distractors: ['只说“我觉得他有原因”', '用故事外的经历替代情节线索'], hint: '指出哪件事支持你的想法。', explanation: '具体行动和后续结果能为对角色的理解提供依据。' },
    { knowledgePointIds: [repair], prompt: '伙伴误会了你的话，你想说明感受又不想打断他，怎样做？', answer: '表达自己的感受，也留出时间听伙伴说明', distractors: ['不停重复自己的解释，不让伙伴回应', '不说明自己的感受，直接要求伙伴道歉'], hint: '交流需要表达，也需要听对方说完。', explanation: '说清自己的感受并听取伙伴的想法，有助于互相理解。' },
    { knowledgePointIds: [consequence, responsible], prompt: '行动后的变化和原来想的不一样，先怎样处理？', answer: '发现结果不合预期时，先检查条件再调整办法', distractors: ['为了证明原计划正确，忽略新的变化', '不看条件，马上重复相同的行动'], hint: '想一想周围情况是否与原来不同。', explanation: '先核对条件和结果，再调整下一步，行动会更合适。' },
    { knowledgePointIds: [clues, repair], prompt: '复述纸船和风筝故事里的关系变化，怎样连起内容？', answer: '把发生的事、人物行动和关系变化按顺序连起来', distractors: ['只说最后的关系，不讲中间行动', '把两个人的行动混在一起，不交代先后'], hint: '从事情发生到人物回应，再看关系如何改变。', explanation: '事件、行动和关系变化按顺序讲，听众能理解情节。' },
    { knowledgePointIds: [inference, consequence], prompt: '角色说自己是为了帮忙，读者判断行动是否合适，重点要根据什么？', answer: '结合角色实际行动和行动后的影响判断，不替角色断定动机', distractors: ['只听角色说法，不看行动带来的结果', '只按结果猜角色一开始的全部想法'], hint: '分别看角色的说法、行动和后来发生的事。', explanation: '行动和结果可以核对帮助是否合适，但不能随意替角色断定心情。' },
    { knowledgePointIds: [responsible, consequence], prompt: '计划放风筝之前和放完以后，各要注意什么？', answer: '行动前考虑环境和他人，行动后检查影响', distractors: ['只考虑自己想怎么玩，不看周围', '只记录结果，不管行动前是否安全'], hint: '有些事情开始前要计划，结束后也要检查。', explanation: '先留意环境和他人，再观察结果，能减少风险并了解影响。' },
    { knowledgePointIds: [repair, clues], prompt: '想确认朋友有没有收到纸船上的消息，怎样做比较合适？', answer: '指出消息传递的过程，并核对对方是否收到', distractors: ['只凭自己放出了纸船就认定朋友看见了', '不询问朋友，直接替朋友回答'], hint: '送出消息和对方收到消息是两件事。', explanation: '核对消息是否送达，能分清自己的行动和对方的回应。' },
    { knowledgePointIds: [clues, inference], prompt: '角色先拒绝一个办法，后来又改变主意，怎样理解变化？', answer: '结合前后情节解释角色为什么改变做法', distractors: ['只看最后选择，不看前面的困难', '把自己的喜好当成角色改变的理由'], hint: '改变可能与新出现的情况有关。', explanation: '比较前后情节，才能找到支持角色变化的线索。' },
    { knowledgePointIds: [repair], prompt: '伙伴说刚才的话让他不舒服，怎样继续对话更有帮助？', answer: '先听取伙伴的感受，再讨论怎样修复关系', distractors: ['马上说伙伴太敏感，不需要解释', '要求伙伴先道歉，自己不再听'], hint: '先了解对方受到什么影响。', explanation: '先倾听感受，再一起商量办法，能回应实际影响。' },
    { knowledgePointIds: [consequence, responsible], prompt: '整理一次“目标没有实现”的经历，记录哪些内容？', answer: '记录目标、行动、结果和下一次的改进办法', distractors: ['只写“没做好”，不说明发生了什么', '删掉不符合原想法的结果'], hint: '回看目标、做法和结果之间的联系。', explanation: '保留目标、行动和结果，再提出改进办法，复盘才完整。' },
  ],
  high: [
    { knowledgePointIds: [clues, consequence, responsible], prompt: '小组想复盘一次没有按计划完成的帮忙，怎样组织记录？', answer: '按情境、行动、结果和后续调整组织复盘', distractors: ['只评价谁做得最好，不记录经过', '只写最终结果，不提行动前的条件'], hint: '让记录能看出事情怎样一步步发展。', explanation: '情境、行动、结果和调整能帮助小组找到下一步办法。' },
    { knowledgePointIds: [repair, inference], prompt: '两个伙伴对一张留言卡的意思理解不同，怎样讨论更公平？', answer: '先分别写出两人的线索，再依据故事判断误会', distractors: ['先认定一方故意不友好', '只采用声音最大的人解释'], hint: '听听双方分别看到了什么。', explanation: '把双方线索摆出来再回到故事核对，能减少偏听和猜测。' },
    { knowledgePointIds: [consequence, responsible], prompt: '原本想让朋友开心，行动后却让朋友不方便，怎样回顾这件事？', answer: '比较行动目标、实际影响和需要修正的地方', distractors: ['只强调自己出发点好，不看对方感受', '把结果都归给伙伴，不检查自己的做法'], hint: '好意也需要结合行动后的实际影响来看。', explanation: '对照目标和影响，能发现哪里需要调整，而不是只看出发点。' },
    { knowledgePointIds: [inference, clues], prompt: '制作童话人物介绍卡时，怎样避免把自己的猜测写成故事事实？', answer: '把故事事实、人物想法和读者推测分开说明', distractors: ['把读者想到的内容都说成故事原句', '只写人物想法，不写支持它的情节'], hint: '分别标明故事写了什么、角色可能怎么想、你是怎样推测的。', explanation: '区分事实与想法，并标出推测身份，能让介绍准确。' },
    { knowledgePointIds: [clues, inference], prompt: '你认为角色改变主意是因为发现新情况，怎样支持这个判断？', answer: '用两处前后线索支持对人物行动的解释', distractors: ['只说“我知道他怎么想”', '只引用故事结尾，不看改变前发生的事'], hint: '找出改变之前和之后能对照的内容。', explanation: '前后两处线索能支持判断，也让推想可以被核对。' },
    { knowledgePointIds: [repair, responsible], prompt: '一次误会让两位伙伴不愿一起玩，怎样设计修复步骤？', answer: '设计先倾听、再表达、最后共同商量的修复步骤', distractors: ['先要求一方承认全部错误，再结束对话', '让第三个人替双方作决定，不听他们意见'], hint: '修复关系要让双方都有机会表达和回应。', explanation: '先听、再说、一起商量，能让办法回应双方的需要。' },
    { knowledgePointIds: [consequence, inference], prompt: '故事里一阵风吹动了树叶，怎样描述结果才不夸大？', answer: '只说明观察到的变化，把未验证的部分保留为推想', distractors: ['把一片叶子的变化说成整片森林都会改变', '把可能发生的事写成已经发生的事'], hint: '结论的范围要和观察到的内容相符合。', explanation: '根据实际观察说明变化，并把未验证部分留作推想。' },
    { knowledgePointIds: [clues, repair], prompt: '要给伙伴讲清一段误会怎样被解决，哪些内容要按顺序说？', answer: '用开头、关键行动、结果和关系变化讲清故事', distractors: ['只说谁先道歉，不提误会和后续', '先说关系变化，再随意补故事开头'], hint: '听众需要知道误会从哪里开始，后来怎样改变。', explanation: '按开头、行动、结果和关系变化复述，内容更完整。' },
    { knowledgePointIds: [inference, clues], prompt: '同伴觉得角色故意让别人着急，你怎样帮助他核对判断？', answer: '补充可核对的情节证据，并说明结论的限度', distractors: ['让同伴相信自己的直觉，不用看故事', '把角色没有说出的想法当作确定事实'], hint: '找证据，也要说清哪些部分仍然是推想。', explanation: '情节证据能支持理解，但不能证明故事没有写出的所有想法。' },
    { knowledgePointIds: [repair, responsible], prompt: '准备替伙伴把纸船放到水里，怎样先确认行动合适？', answer: '先确认伙伴意愿，再采取不会妨碍他人的行动', distractors: ['不问伙伴就替他决定，也不看周围环境', '为了快点完成，把其他人的物品推开'], hint: '行动前既要尊重伙伴，也要留意周围。', explanation: '确认伙伴愿意并观察环境，能让行动兼顾他人和安全。' },
    { knowledgePointIds: [consequence, responsible], prompt: '复盘一次风娃娃式的帮忙，怎样保留对下一次有用的信息？', answer: '既记录不合目标的影响，也保留有效的做法', distractors: ['只记录成功部分，不提出现的问题', '因为结果不好就说所有行动都没有用'], hint: '一次行动可能有不同结果，分别看清楚再总结。', explanation: '同时记录问题和有效做法，才能知道下一次该调整什么。' },
    { knowledgePointIds: [clues, inference, consequence], prompt: '角色看到新线索后换了办法，怎样说明这个变化？', answer: '联系角色的处境和后续变化解释做法调整', distractors: ['只说角色突然改变，不讲新线索', '把后来的结果当成角色最初的想法'], hint: '把新线索、处境和行动变化放在一起。', explanation: '新线索可能改变角色选择，前后关系要依据故事来说明。' },
    { knowledgePointIds: [responsible, consequence], prompt: '计划在有风的操场放风筝，怎样让行动计划更周全？', answer: '列出安全条件、行动步骤和停止后求助的办法', distractors: ['只写怎样把风筝放得更高', '不管场地是否拥挤，坚持继续放'], hint: '计划里还要写清什么时候先停下来。', explanation: '检查安全条件并准备停止和求助办法，能应对变化。' },
    { knowledgePointIds: [clues, repair, consequence, inference, responsible], prompt: '想分享本单元“行动会带来结果”的阅读收获，怎样安排分享卡？', answer: '整合故事线索、沟通修复与行动复盘制作分享卡', distractors: ['只摘录一个人物名字，不说明行动', '只写自己喜欢的结尾，不联系故事线索'], hint: '把读故事、听伙伴和检查行动结果的方法连起来。', explanation: '整合线索、沟通和复盘方法，能呈现本单元的综合学习收获。' },
  ],
};

export const grade2Term1ChineseUnit08SupplementalActivities: Grade2Term1ChineseUnit08SupplementalActivity[] = Object.entries(drafts).flatMap(([difficulty, items]) => (
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
