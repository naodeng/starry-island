import type { ChoiceActivityDefinition, Difficulty } from '../../content/types';

export interface Grade2Term1ChineseUnit03SupplementalActivity {
  difficulty: Difficulty;
  sourceUnitId: string;
  knowledgePointIds: string[];
  activity: ChoiceActivityDefinition;
}

interface ActivityDraft {
  knowledgePointIds: string[];
  prompt: string;
  options: [string, string, string];
  hint: string;
  explanation: string;
}

const sourceUnitId = 'grade-2/term-1/chinese/unit-03';
const idPrefix = 'challenge-supplement-grade-2-term-1-chinese-unit-03';
const problem = 'problem-solving-sequence';
const evidence = 'evidence-based-inference';
const letter = 'letter-communication';
const observation = 'observation-and-feelings';
const story = 'story-sequence-and-revision';

const drafts: Record<Difficulty, ActivityDraft[]> = {
  basic: [
    { knowledgePointIds: [problem], prompt: '小组要找一支不见的水彩笔，开始查找前先做什么？', options: ['回想最后一次看见它的时间和地点', '先判断是谁拿走了它', '把桌上的东西都换个位置'], hint: '先找已经知道的线索。', explanation: '最后看见的时间和地点能帮助大家有方向地寻找。' },
    { knowledgePointIds: [problem, evidence], prompt: '调整纸盒后，书本不再滑下来。怎样检查这个办法有没有帮助？', options: ['对照调整前后的记录，看看书本是否更稳', '只看纸盒是什么颜色', '不再观察就马上宣布成功'], hint: '把尝试前后的情况放在一起看。', explanation: '比较调整前后的结果，才能判断办法是否有帮助。' },
    { knowledgePointIds: [letter], prompt: '给朋友写信时，开头先写哪一项能让朋友知道你在和谁说话？', options: ['称呼', '事情的结尾', '自己的签名日期'], hint: '先想一想信件开头怎样说明交流对象。', explanation: '称呼能说明信是写给谁的。' },
    { knowledgePointIds: [evidence, observation], prompt: '小雨把湿伞放在门边。想推想她这样做的原因，哪句话表达得最谨慎？', options: ['她可能想让滴水的伞不挡路', '她肯定不喜欢下雨', '她一定要把伞送给朋友'], hint: '原因还没有直接写明，要用“可能”表达推想。', explanation: '湿伞放在门边提供了动作线索，但不能确定小雨的真实想法；用“可能”更谨慎。' },
    { knowledgePointIds: [story], prompt: '编写一次洒水后的处理故事，哪一件事放在开始最合适？', options: ['发现桌面被打湿，先停下来查看情况', '把用过的抹布洗净收好', '确认桌面已经擦干'], hint: '故事开头先交代问题或事情的起因。', explanation: '发现桌面被打湿是后续处理和检查结果的起点。' },
    { knowledgePointIds: [problem, evidence], prompt: '第一次试着摆放积木后，桥还是会倒。接下来怎样做更合适？', options: ['看看哪一步不稳，再调整后重新试一试', '不记录结果，马上换一个完全不同的目标', '认定所有搭法都不行'], hint: '先从这次结果里找可以改进的地方。', explanation: '观察哪里不稳，再有针对地调整，能让下一次尝试更有方向。' },
    { knowledgePointIds: [letter], prompt: '写信告诉奶奶最近读了一本有趣的书，正文里最需要写什么？', options: ['书名或读书时的一件具体事情', '一串和读书无关的天气词', '只重复“我写信了”'], hint: '想想收信人需要知道哪件事。', explanation: '写清书名或具体事情，奶奶才能了解你想分享的内容。' },
    { knowledgePointIds: [observation, evidence], prompt: '看见妈妈轻轻把被子拉到孩子肩上，怎样表达更有根据？', options: ['我看到她拉好被子，觉得她很关心孩子', '她一定整晚都没有睡', '她以后每天都会这样做'], hint: '先说看到的动作，再说自己的感受。', explanation: '动作是观察到的细节；“很关心”是有动作支持的感受，不能把未发生的事说成事实。' },
    { knowledgePointIds: [problem], prompt: '遇到问题后，哪组步骤比较完整？', options: ['弄清问题 → 想办法 → 试一试 → 检查结果', '猜一个答案 → 不去尝试 → 忘掉问题', '先宣布成功 → 再决定要解决什么'], hint: '做完尝试后还要看结果。', explanation: '先明确问题，再尝试办法并检查结果，过程才完整。' },
    { knowledgePointIds: [observation, evidence], prompt: '写人物观察记录时，哪种写法把细节和感受分清楚了？', options: ['我看到他收好画纸；我觉得他很珍惜作品', '他收好画纸，所以他肯定成为了画家', '他很珍惜作品，这是所有人都能看见的动作'], hint: '动作可以看见，感受要用“我觉得”等词表达。', explanation: '先记录具体动作，再用“我觉得”表达感受，能分清事实和想法。' },
    { knowledgePointIds: [letter], prompt: '一封信想告诉朋友“我们今天去图书馆了”，怎样写更清楚？', options: ['写明今天去了哪里，并补充一件在那里做的事', '只写“今天真好”，不说发生了什么', '把称呼和正文都省掉'], hint: '给收信人足够的信息，才能明白你在分享什么。', explanation: '地点和一件具体事情能让信的内容更清楚。' },
    { knowledgePointIds: [story, problem], prompt: '图书角有一本书没有归还标记，小组想弄清它应该放在哪里。哪一步最适合先做？', options: ['查看书名和借阅记录，再请老师一起确认', '把它放进最近的书架，不再核对', '先替不认识的同学写上名字'], hint: '先找能核对的信息，再决定下一步。', explanation: '书名和借阅记录能提供线索，核对后再归还更稳妥。' },
    { knowledgePointIds: [story], prompt: '伙伴读不懂故事里“他就这样做了”指什么。怎样修改更清楚？', options: ['补上人物具体做了什么', '把“这样”再写两遍', '删去前后所有事情'], hint: '读者需要知道“这样”具体指哪一个动作。', explanation: '写出人物的具体行动，读者才容易跟上故事。' },
    { knowledgePointIds: [observation, evidence], prompt: '同学读完信后没有马上说话。只凭这一点，哪种判断比较稳妥？', options: ['能确认他暂时没有说话；原因还需要更多线索', '他一定不喜欢这封信', '他肯定已经忘了信的内容'], hint: '不要把没有写明的原因说成确定事实。', explanation: '没有说话是能观察到的情况；沉默的原因不能只凭这一点确定。' },
  ],
  advanced: [
    { knowledgePointIds: [problem, story], prompt: '小组要让滚动的球停在标记线前。哪种做法最能根据目标检查办法？', options: ['先记录球停下的位置，再调整挡板并比较新位置', '换一张更漂亮的标记纸，不再看球停在哪里', '只改变游戏规则，然后说挡板已经有效'], hint: '办法要围绕目标，结果要能观察。', explanation: '记录停球位置并比较调整后的结果，可以检验挡板是否帮助球停在目标附近。' },
    { knowledgePointIds: [evidence, observation], prompt: '小华把自己的信折好放进书包。仅凭这个动作，哪句话最有依据？', options: ['能确认他把信放进了书包；还不能确定他为什么这样做', '他一定不愿意把信寄出去', '他肯定已经收到了回信'], hint: '区分实际动作与对原因、结果的猜想。', explanation: '放进书包是题目给出的动作；寄信意愿和回信情况都没有线索支持。' },
    { knowledgePointIds: [letter], prompt: '信里写“那件事让我很开心”，朋友不知道“那件事”是什么。补充哪项最有帮助？', options: ['写出具体事情和大致时间', '再写一次“我很开心”', '只补上信纸的颜色'], hint: '读者需要知道代词指向哪件事。', explanation: '补上具体事情和时间，能让收信人理解“那件事”指什么。' },
    { knowledgePointIds: [story, problem], prompt: '一盆花放在桌边后有些摇晃。小雨处理后，第二天再查看。哪项行动最能帮助花盆站稳？', options: ['在花盆旁边加支撑', '把花盆的颜色画得更亮', '把它移到更窄的桌角'], hint: '选择能减少摇晃、还能观察结果的办法。', explanation: '增加支撑能帮助花盆保持稳定；颜色不会改变花盆是否摇晃，放到窄桌角反而不安全。' },
    { knowledgePointIds: [evidence, observation], prompt: '故事只写“乐乐把纸轻轻收进文件夹”。哪种读书记录最谨慎？', options: ['他把纸收进文件夹；他是否喜欢这张纸还需要更多线索', '他讨厌这张纸，所以把它藏起来了', '他长大后一定会当作家'], hint: '保留写明的动作，把没有说明的想法标成未知。', explanation: '题目只提供收纸的动作，不能据此确定人物的喜好或将来。' },
    { knowledgePointIds: [problem, evidence], prompt: '小组试过两种整理卡片的方法。怎样选出更适合“快速找到指定卡片”的方法？', options: ['用同一张卡片分别查找，记录哪种方法更快、更少出错', '看哪种方法的名称比较特别', '只问最先提出办法的人'], hint: '比较时让目标和检查方式保持一致。', explanation: '使用相同任务测试并记录结果，能比较方法是否帮助快速、准确地查找。' },
    { knowledgePointIds: [letter], prompt: '写信时用了“昨天那次活动”，但收信人没参加活动。怎样补充能帮助对方理解？', options: ['写出活动名称和一件具体经过', '只写“你知道的那次”', '删掉所有活动相关内容'], hint: '不要假定收信人知道你没写出的背景。', explanation: '交代活动名称和经过，能让没有参加的人也看懂。' },
    { knowledgePointIds: [observation, evidence], prompt: '你想写出姐姐关心弟弟。哪种句子有观察细节支持？', options: ['我看到她把水杯放到弟弟手边，觉得她很体贴', '她一定每天都替弟弟做所有事情', '姐姐天生就比别人更关心人'], hint: '用看得见的行为支持感受，不扩大到没有出现的情况。', explanation: '放水杯是具体动作，能支持“我觉得她很体贴”；“每天都”或“天生就”超出了已知信息。' },
    { knowledgePointIds: [story], prompt: '故事先写“阿成回到座位”，后面却直接写“他把借来的书还给同学”，读者不清楚两件事怎样连起来。补哪句最合适？', options: ['补充他先从书包里拿出借来的书，再走到同学身边', '补充教室墙壁是什么颜色', '把“回到座位”重复一遍'], hint: '补上能连接前后行动的中间步骤。', explanation: '拿出书并走向同学能连接回座位与归还图书两件事。' },
    { knowledgePointIds: [evidence, letter], prompt: '信里写“我已经把卡片交给小林”，没有提到小林怎样回应。哪种转述准确？', options: ['卡片已经交给小林；他的回应还不知道', '小林一定很喜欢卡片', '小林已经写信感谢了'], hint: '只转述信中写明的内容。', explanation: '信只说明卡片已交出，没有交代小林的想法或后续行动。' },
    { knowledgePointIds: [problem], prompt: '第一次试着用纸条固定作品，边角还是翘起来。下一轮怎样调整更容易知道原因？', options: ['先检查翘起的位置，只改变固定方式后再观察', '同时更换纸张、桌面和摆放方向', '不记录变化，直接宣布作品无法固定'], hint: '一次调整一处，并记录结果。', explanation: '一次只改固定方式，能更清楚地观察这项改变是否有效。' },
    { knowledgePointIds: [letter], prompt: '信的正文感谢朋友帮忙，但没有说是哪件事。怎样补充最清楚？', options: ['写明朋友帮忙的具体事情，再表达感谢', '只重复“谢谢”很多次', '把结尾改成一个没有对象的问题'], hint: '感谢要让收信人知道原因。', explanation: '写明具体事情，感谢才有清楚的缘由。' },
    { knowledgePointIds: [observation, evidence], prompt: '看到同学把散落的书本一本本放回架上，怎样表达观察和推想？', options: ['我看到他在整理书；他可能想让书架更整齐', '他一定是老师安排的', '他已经整理好了所有教室'], hint: '把能看到的行为和带有“可能”的推想分开。', explanation: '整理书本是观察到的行为；目的可以推想，但不能说成确定事实。' },
    { knowledgePointIds: [problem, evidence], prompt: '盒子稍微倾斜时，卡片会滑到一边。小组想知道倾斜是否是原因，怎样验证更清楚？', options: ['每次只改变盒子的倾斜程度，重复放卡片并记录结果', '同时换盒子、卡片和桌面，再比较一次', '只凭一次滑动就认定所有盒子都会这样'], hint: '重复观察，并尽量一次只改变一个条件。', explanation: '控制其他条件、改变倾斜程度并记录多次结果，才能更有依据地判断。' },
  ],
  high: [
    { knowledgePointIds: [problem, evidence, story], prompt: '小组希望纸桥能多承受几枚积木。哪种记录最能帮助他们改进办法？', options: ['记下每次桥面做法和承重数量，再比较调整前后的结果', '只记录谁先搭完，不记桥的情况', '每次同时换纸张、积木和桌子，然后猜是哪项起作用'], hint: '把办法和可观察的结果对应起来。', explanation: '记录搭法和承重结果，比较改变前后，能帮助判断哪种调整有用。' },
    { knowledgePointIds: [evidence, observation], prompt: '读书记录只写“玲玲停下来观察画纸上的污点”。从这条记录能得出什么？', options: ['她停下来观察污点；具体想法还要看后续线索', '她已经决定不再画画', '她一定觉得整张画都没有用了'], hint: '不要把还没写出的想法当作已发生的事。', explanation: '记录说明她停下来观察；她之后怎样想，还需要后续行动或语言作依据。' },
    { knowledgePointIds: [letter, story], prompt: '想给远方的朋友写信，介绍昨天的班级活动并邀请他下次参加。哪种安排最清楚？', options: ['写称呼和问候，按活动经过先后分享，再说明邀请并礼貌结束', '不写称呼，先写邀请，再用“那件事”代替活动经过', '只写活动名称，不说明发生了什么或想邀请对方做什么'], hint: '让收信人依次知道你在和谁说、发生了什么、希望做什么。', explanation: '按交流对象、事情经过和邀请意图组织，朋友更容易理解信的内容。' },
    { knowledgePointIds: [story, evidence], prompt: '故事里，小文先听到窗外有声响，接着走到窗边查看，最后发现是树枝碰到玻璃。哪条补充最适合作为“查看后”的结论？', options: ['他看见树枝正碰着玻璃', '他一开始就知道是谁发出声音', '附近每个人都听见了同一种声音'], hint: '结论应来自查看时真正发现的线索。', explanation: '看见树枝碰玻璃能解释声音；另外两种说法没有故事线索支持。' },
    { knowledgePointIds: [observation, evidence], prompt: '玲玲停笔看着画纸上的污点，后来询问伙伴可以怎样处理。怎样写读书记录更准确？', options: ['写下她询问办法的行动，并把“可能在思考”标为推想', '写成她从一开始就知道该怎样修改', '写成每个人遇到污点都应该继续作画'], hint: '区分故事写出的行动和读者作出的推想。', explanation: '询问办法是故事行动；“可能在思考”是合理但仍需标明的推想，不能推广成人人都适用的规则。' },
    { knowledgePointIds: [story, problem], prompt: '故事草稿写了“发现书签不见了，后来书又回到了书架”，中间少了关键经过。怎样补写才能让读者看懂？', options: ['写出人物怎样寻找书签，以及怎样找到并放回书', '增加一段和书签无关的天气描写', '把开头和结尾各重复一遍'], hint: '补上能解释结果怎样发生的行动。', explanation: '寻找、找到并放回是连接问题与结果的关键行动。' },
    { knowledgePointIds: [problem, observation], prompt: '图书角的书不容易找到，小组想调整标签。怎样既解决问题又检查效果？', options: ['先按书的类别设计标签，试找几本书，再按查找情况修改', '只把标签画得更大，不让同学试找', '把书随意换位置，然后不告诉任何人'], hint: '先围绕查找困难提出办法，再请使用者试一试。', explanation: '分类标签回应查找问题；实际试找能提供是否清楚的观察证据。' },
    { knowledgePointIds: [story], prompt: '一段故事先写“伙伴提出办法”，下一句却是“大家决定保留这张画”，中间缺少什么信息最关键？', options: ['大家怎样试用办法，以及画面发生了什么变化', '每个人书包的颜色', '故事发生在星期几但与情节无关'], hint: '让读者看到办法怎样带来后面的决定。', explanation: '尝试过程和画面变化能说明伙伴为什么决定保留这张画。' },
    { knowledgePointIds: [letter, evidence], prompt: '写信向同学建议把活动用品分类收好。哪种写法清楚又礼貌？', options: ['说明看到用品散放的情况，提出分类建议，并用商量的语气询问', '直接说“你做得很差”，不说明具体事情', '把建议写成已经发生的事实'], hint: '先说清依据，再提出建议，语气要尊重对方。', explanation: '具体情况说明建议的缘由，商量语气有助于友好交流。' },
    { knowledgePointIds: [observation, evidence], prompt: '记录写着“她把画纸收好”。哪种后续句把事实与推测分开了？', options: ['我看到她收好画纸；她可能想保护作品', '她收好画纸，所以她肯定再也不画了', '她收好画纸，说明所有人都喜欢这幅画'], hint: '用“我看到”记录事实，用“可能”表达推想。', explanation: '收好画纸是已知动作；保护作品是有可能的解释，不能进一步扩大。' },
    { knowledgePointIds: [story, evidence], prompt: '故事开头写“伙伴不知道怎样整理散落的卡片”，结尾写“大家很快找到了需要的卡片”。哪种结尾补充能让前后更连贯？', options: ['说明大家怎样分类并试找卡片，再写找到后的结果', '补充大家最喜欢的颜色', '只重复“大家找到了卡片”'], hint: '让结尾回应开头的问题，并交代办法和结果的联系。', explanation: '分类、试找和找到结果连成解决过程，能回应开头提出的困难。' },
    { knowledgePointIds: [observation, letter], prompt: '想在信里写“妈妈很关心我”，怎样补充能让读者知道你为什么这样想？', options: ['写一件看见的具体行动，再说它让你有什么感受', '只把“关心”重复几遍', '替妈妈写一句她没有说过的话'], hint: '用亲眼看到的事情支持自己的感受。', explanation: '具体行动能说明感受的依据，也避免替别人编造没有说过的话。' },
    { knowledgePointIds: [letter], prompt: '信里感谢同学帮你整理了课桌，但没有说对方做了什么。怎样改得更完整？', options: ['写清同学帮忙整理的具体物品或步骤，再表达感谢', '只写“你真好”，不提事情', '把感谢改成和对方无关的故事'], hint: '让收信人知道感谢是因为哪件具体事情。', explanation: '具体说明整理物品或步骤，感谢的缘由才清楚。' },
    { knowledgePointIds: [evidence, observation, story], prompt: '两位同学对故事人物为什么停下脚步有不同想法。怎样比较两种解释更公平？', options: ['各自找出动作、语言或前后情节作依据，再说明哪种解释更贴合', '只选择先说出的想法，不再看故事', '把其中一人的猜想直接写成故事事实'], hint: '比较解释时回到共同的故事线索。', explanation: '用相同的文本线索检验不同解释，既尊重证据，也不会把推想当成事实。' },
  ],
};

export const grade2Term1ChineseUnit03SupplementalActivities: Grade2Term1ChineseUnit03SupplementalActivity[] = Object.entries(drafts).flatMap(([difficulty, items]) => (
  items.map((draft, index) => {
    const correctOptionIndex = (index % 3) as 0 | 1 | 2;
    const options = [...draft.options.slice(1)];
    options.splice(correctOptionIndex, 0, draft.options[0]);
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
