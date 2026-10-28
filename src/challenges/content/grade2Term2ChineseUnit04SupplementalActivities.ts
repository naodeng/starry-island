import type { ChoiceActivityDefinition, Difficulty } from '../../content/types';

export interface Grade2Term2ChineseUnit04SupplementalActivity {
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

const sourceUnitId = 'grade-2/term-2/chinese/unit-04';
const idPrefix = 'challenge-supplement-grade-2-term-2-chinese-unit-04';
const sensory = 'sensory-imagery-details';
const observation = 'observation-and-imagination';
const story = 'story-elements-and-sequence';
const cooperation = 'cooperative-storytelling';
const viewpoint = 'viewpoint-observation';
const expression = 'clear-story-expression';

export const grade2Term2ChineseUnit04CoreKnowledgePointIds = [
  sensory,
  observation,
  story,
  cooperation,
  viewpoint,
  expression,
] as const;

const drafts: Record<Difficulty, ActivityDraft[]> = {
  basic: [
    { knowledgePointIds: [sensory, observation], prompt: '一片叶子边缘弯弯的，哪种想象最能看出它来自观察？', answer: '它像一艘弯弯的小船', distractors: ['它一定会带我们去海边', '它正在给远方的朋友写信'], hint: '看看叶子的形状，再用“像”说出联想。', explanation: '“像一艘弯弯的小船”联系了叶子的形状，也让读者知道这是联想。' },
    { knowledgePointIds: [sensory], prompt: '想写雨点落在屋檐下的声音，哪句话抓住了听到的线索？', answer: '雨点敲在屋檐上，发出轻轻的答答声', distractors: ['屋檐下的墙面是深灰色的', '屋檐摸起来有些凉'], hint: '想想耳朵能听见什么。', explanation: '“轻轻的答答声”写出了听到的声音，另外两句写的是颜色或触感。' },
    { knowledgePointIds: [observation, expression], prompt: '哪句话是在记录能直接看到的事情？', answer: '窗台上有一颗透明的小水珠', distractors: ['昨晚一定下过一场雨', '水珠是从花盆边滚下来的'], hint: '先找不需要猜测就能看见的内容。', explanation: '窗台上的水珠可以直接观察；下雨或水珠从哪里来都需要更多线索确认。' },
    { knowledgePointIds: [observation, expression], prompt: '想写自己的联想，怎样提醒读者它不是已经看到的事实？', answer: '我觉得那片云像一只慢慢游动的鲸鱼', distractors: ['那片云就是一只鲸鱼', '我亲眼看见鲸鱼游过天空'], hint: '可以用表示想法或比较的词语。', explanation: '“我觉得”和“像”说明这是观察后的联想，不会把想象写成事实。' },
    { knowledgePointIds: [story, expression], prompt: '故事开头要让读者知道事情在哪里发生，哪句话最合适？', answer: '放学后，小队在校园的小花园集合', distractors: ['他们最后找到了丢失的风筝', '大家决定把线索画在纸上'], hint: '开头先交代一个地点或时间。', explanation: '这句话交代了时间和地点，另外两句是在讲行动或结果。' },
    { knowledgePointIds: [story], prompt: '小队先发现地上有一串脚印，接下来哪一步最顺？', answer: '沿着脚印看看它通向哪里', distractors: ['马上宣布已经找到宝物', '把故事地点改成海底'], hint: '让下一步行动回应刚发现的线索。', explanation: '沿线观察能继续利用脚印线索，故事也会自然向前发展。' },
    { knowledgePointIds: [cooperation], prompt: '三位伙伴一起编故事，怎样安排能让每个人都有机会？', answer: '轮流补充一句，并先听完伙伴的话', distractors: ['由说得最快的人一直讲', '大家同时抢着把自己的结尾说完'], hint: '合作时既要轮到自己，也要给别人表达时间。', explanation: '轮流表达和认真倾听能让每位伙伴参与创作。' },
    { knowledgePointIds: [cooperation, expression], prompt: '伙伴提出故事要加入一座桥，你怎样确认自己听懂了？', answer: '复述他的想法，再问大家要不要把桥接进情节', distractors: ['不回应就把地点换成山洞', '告诉伙伴只能采用我的想法'], hint: '先说说自己听到的内容，再一起商量。', explanation: '复述能确认理解，接着商量能把不同想法放进共同故事。' },
    { knowledgePointIds: [viewpoint, sensory], prompt: '从一只小甲虫的高度看花园，哪项细节更容易先被发现？', answer: '草根旁的小缝和一颗圆圆的露珠', distractors: ['远处屋顶上钟面的数字', '整座城市里最高的楼有几层'], hint: '角色变小后，身边的东西看起来会更大。', explanation: '草根和露珠就在小甲虫附近，符合低处角色的观察范围。' },
    { knowledgePointIds: [viewpoint, story], prompt: '故事人物站在山坡上向下看，哪种信息最能帮助他认路？', answer: '小路、池塘和树丛之间的位置', distractors: ['脚边石子的细小纹路', '一只蚂蚁触角的长度'], hint: '站得高时，先看到不同地点怎样排列。', explanation: '从高处更容易看出道路和地点的关系，便于说明路线。' },
    { knowledgePointIds: [story, expression], prompt: '小雨看到天色变暗，决定把画纸收进书包。怎样补写能让行动更有理由？', answer: '她想到可能要下雨，想先保护画纸', distractors: ['她忽然不喜欢画画了', '书包已经变成了一艘小船'], hint: '把看到的线索和人物的想法连起来。', explanation: '天色变暗是线索，“可能要下雨”说明了收画纸的理由。' },
    { knowledgePointIds: [story, viewpoint], prompt: '小队遇到一条窄窄的小路，接下来哪件事最像在解决眼前的问题？', answer: '先看看路面是否平稳，再决定怎样通过', distractors: ['不看路面就闭眼向前跑', '突然讲起与小路无关的早餐'], hint: '角色的行动要回应刚遇到的困难。', explanation: '观察路面后再决定，能让行动回应小路带来的困难。' },
    { knowledgePointIds: [sensory, expression], prompt: '要让读者想象同一片小池塘，哪组细节最连贯？', answer: '水面亮亮的，岸边传来青蛙的叫声', distractors: ['水面亮亮的，教室里摆着三把椅子', '池塘很安静，远处正在搬一张书桌'], hint: '选出属于同一个画面的细节。', explanation: '水面和岸边的声音都属于池塘场景，细节能组成一个连贯画面。' },
    { knowledgePointIds: [observation, expression], prompt: '观察小花后又想象它在和风打招呼，怎样记下来更清楚？', answer: '先写花瓣随风轻轻摇动，再写我觉得它像在打招呼', distractors: ['把想象写成亲眼看见花开口说话', '只写“很有趣”，不说看到什么'], hint: '把观察到的动作和自己的联想分开说。', explanation: '先记录花瓣摇动这个观察，再标明“我觉得”是自己的想象。' },
  ],
  advanced: [
    { knowledgePointIds: [sensory, observation], prompt: '石阶上有一小片湿痕，想把它写进故事，哪句既有画面又保留了观察依据？', answer: '湿痕亮亮的，我觉得它像一面小镜子', distractors: ['湿痕肯定是昨夜的雨水留下的', '有人刚刚用水擦过石阶'], hint: '先写能看到的样子，再用词语标出联想。', explanation: '亮亮的湿痕是观察，“我觉得像”表示联想，没有把原因猜测当成事实。' },
    { knowledgePointIds: [observation, story], prompt: '早晨发现花盆边的泥土有一道浅浅的沟，哪种续写最谨慎？', answer: '记下这道沟，再观察周围有没有新的线索', distractors: ['认定是小动物昨夜挖出来的', '认定花盆边的土是被水冲开的'], hint: '目前只知道看见了沟，原因还需要线索。', explanation: '记录观察并继续寻找线索，不会把尚未确认的原因写成确定事实。' },
    { knowledgePointIds: [sensory, story, expression], prompt: '小队想写一段“风经过花园”的画面，哪种安排把感官细节和行动连在一起？', answer: '先听见树叶沙沙响，再看见风把一片叶子送到小路边', distractors: ['先决定风喜欢哪种颜色，再让所有景物换名字', '只列出十种花的名称，不写它们发生了什么'], hint: '让听到或看到的细节推动接下来的事情。', explanation: '声音和叶子移动都来自花园观察，也让故事有了连续的变化。' },
    { knowledgePointIds: [viewpoint, sensory], prompt: '同一场小雨里，小鸟和贴近地面的蚂蚁会注意到不同细节。哪项更像蚂蚁的观察？', answer: '一滴水落在身边，地面出现了浅浅的小水洼', distractors: ['云层覆盖了远处整座山', '高高的树梢上有几片叶子'], hint: '根据角色的高度和所在位置来选细节。', explanation: '地面的水滴和小水洼离蚂蚁很近，符合它的观察位置。' },
    { knowledgePointIds: [story, expression], prompt: '角色发现门口被一堆落叶挡住，哪种情节顺序最清楚？', answer: '先发现落叶挡路，再商量办法，清开后继续前进', distractors: ['先继续前进，再突然发现自己还在门外', '先说已经到家，之后才出现挡路的落叶'], hint: '按发现问题、想办法、看到结果的顺序安排。', explanation: '问题、办法和结果依次出现，读者能看懂角色怎样继续前进。' },
    { knowledgePointIds: [cooperation, story], prompt: '伙伴们分别想到“找路标”和“问花园管理员”，怎样决定要不要放进故事？', answer: '先说清共同目标，再比较两个办法怎样帮助角色找到路', distractors: ['只采用先说出口的办法，不听其他人说明', '把两个办法都写进去，却不交代角色做了什么'], hint: '回到大家一起创作的故事目标来商量。', explanation: '围绕找到路这个共同目标比较办法，能尊重不同点子并保持情节清楚。' },
    { knowledgePointIds: [story, expression], prompt: '故事里角色突然跑到池塘边，读者不知道原因。补哪句话最能接上前面的线索？', answer: '他听见池塘边传来求助声，便想去看看发生了什么', distractors: ['补充池塘边有几朵颜色不同的花', '写出角色跑步时穿着哪双鞋'], hint: '给行动补一个能解释它的线索或想法。', explanation: '求助声解释了角色为什么改变方向，也把前后情节连起来。' },
    { knowledgePointIds: [viewpoint, story], prompt: '小蚂蚁要绕开一块湿滑的石头，哪种观察顺序更适合它决定路线？', answer: '先看石头旁边哪里干燥，再试着走一小段并回头检查', distractors: ['先猜石头后面一定有桥，再不看路就前进', '先数远处房子的窗户，再决定是否绕路'], hint: '从身边能看到的路面开始，再确认行动结果。', explanation: '观察近处路面并小心确认，能让角色的路线选择有依据。' },
    { knowledgePointIds: [story, viewpoint, expression], prompt: '一段故事有地点、角色和困难，却没有说明角色做了什么。应该补充哪项？', answer: '角色尝试的办法，以及办法带来的变化', distractors: ['再加几个没有关系的新地点', '把困难改成已经解决，却不说明经过'], hint: '读者还需要知道人物怎样回应困难。', explanation: '交代角色行动和变化，能补齐故事从困难到结果的过程。' },
    { knowledgePointIds: [sensory, observation], prompt: '想让读者看见“光落在窗台上”，哪组描写最能支持这个画面？', answer: '窗沿有一条细细的亮边，旁边的灰尘慢慢浮动', distractors: ['窗台上摆着两本蓝色封面的书', '屋外传来伙伴们说话的声音'], hint: '挑选眼睛能看到、又属于同一处的细节。', explanation: '亮边和浮动的灰尘都是可见线索，能帮助读者想象窗台的光。' },
    { knowledgePointIds: [cooperation, expression], prompt: '两个伙伴对故事结尾有不同想法，怎样讨论能让故事仍然连贯？', answer: '分别说出结尾怎样回应困难，再一起选择或连接合适的部分', distractors: ['把两个结尾挨在一起，不说明前后关系', '只让一位伙伴决定，其他人不再发言'], hint: '先说清点子和故事目标之间的关系。', explanation: '比较两个结尾怎样回应困难，再共同决定，能保留合作也保证情节连贯。' },
    { knowledgePointIds: [observation, expression], prompt: '小兔看见树影摇动，猜想是风吹树枝。哪种写法最清楚地区分观察和猜测？', answer: '我看见树影在摇动，猜想可能是风吹动了树枝', distractors: ['我看见树影摇动，是有人正在晃树枝', '树影在摇动，说明附近每棵树也在摇'], hint: '用“看见”和“猜想”说明信息从哪里来。', explanation: '这句话把能观察到的树影变化和对原因的猜测分开了。' },
    { knowledgePointIds: [story, expression], prompt: '小组准备讲一个角色迷路后找到回家办法的故事，哪种开头最容易让读者跟上？', answer: '先交代角色在哪里、要去哪里，再说他遇到了什么', distractors: ['先写最后回家的结果，之后才介绍角色', '连续列出几个地点名称，不说明谁去了哪里'], hint: '开头给出角色、地点和目标中的关键信息。', explanation: '角色、地点和目标能帮助读者理解后面出现的困难。' },
    { knowledgePointIds: [story, cooperation], prompt: '故事已经出现角色、地点和问题，伙伴想再加入一只会说话的鲸鱼。怎样先判断这个点子是否适合？', answer: '看看鲸鱼怎样帮助情节发展，并商量它是否符合大家的故事方向', distractors: ['只要新奇，就不必考虑前面发生了什么', '因为点子不同，就马上拒绝伙伴发言'], hint: '新点子要能和已有情节及共同目标接起来。', explanation: '检查点子与故事方向的联系，再一起商量，能让创意和连贯兼顾。' },
  ],
  high: [
    { knowledgePointIds: [story, cooperation, expression], prompt: '小组准备创编一个角色寻找丢失彩纸的故事，哪份计划最能帮助大家合作完成？', answer: '先商量角色和地点，再轮流补充线索与办法，最后检查结尾是否解决问题', distractors: ['每人各写一段，不商量角色和地点，最后直接拼在一起', '只挑选最有趣的句子，不管它们有没有前后联系'], hint: '计划要包括共同方向、轮流创作和检查故事结果。', explanation: '共同商量、轮流补充和检查结尾，让想法能组成一个完整故事。' },
    { knowledgePointIds: [cooperation, story], prompt: '伙伴想让故事在树洞结束，另一位想让角色回到小屋。怎样比较两个点子？', answer: '听每个人说明理由，再看哪个结尾更回应角色遇到的困难', distractors: ['把结尾交给声音最大的人决定', '两个结尾都放进去，不说明角色怎样到达'], hint: '用已有情节和共同目标来判断，而不是比谁先说。', explanation: '听取理由并对照故事困难，能公平地选择或调整结尾。' },
    { knowledgePointIds: [viewpoint, sensory, story], prompt: '小小的蜗牛要穿过雨后的花园，哪种行动安排既利用近处线索，也让故事一步步向前？', answer: '先观察脚边哪里不滑，再沿着安全的叶片边缘慢慢前进', distractors: ['不看地面就冲向远处的屋顶', '先说自己已经走完整座花园，再返回起点'], hint: '让角色根据身边看见的情况选择下一步。', explanation: '蜗牛先观察脚边，再作出行动，符合角色的视角和情节顺序。' },
    { knowledgePointIds: [observation, expression], prompt: '伙伴说“风把小花叫醒了”，讨论时怎样既保留想象又不把它说成观察事实？', answer: '先说明这是一个想象，再补充看到花瓣轻轻摇动的线索', distractors: ['说自己亲耳听见小花真的开口', '把所有想象都删掉，只留下一个地点'], hint: '可以同时写出想象和支持它的真实观察。', explanation: '标明“想象”并给出花瓣摇动的观察，表达有创意也更清楚。' },
    { knowledgePointIds: [story, sensory, expression], prompt: '要把一次寻找小铃铛的经历画成四格故事，哪种安排最清楚？', answer: '介绍地点和角色、发现铃铛不见、沿声音线索寻找、说明找到后的结果', distractors: ['四格分别画四处风景，不出现寻找过程', '先画找到铃铛，再画角色发现它不见'], hint: '按事情发生的顺序安排每一格。', explanation: '四格依次交代背景、问题、行动和结果，读者能跟上寻找过程。' },
    { knowledgePointIds: [story, expression], prompt: '故事写了角色捡到一片羽毛，接着突然到了操场。怎样修改才能让两个场景接起来？', answer: '补上羽毛上的颜色线索，并说明角色沿着线索去了操场', distractors: ['在两个场景中间再加几种无关动物', '删掉操场并保留羽毛，却不解释故事接下来发生什么'], hint: '找一个前后都能用到的线索连接场景。', explanation: '羽毛的线索引出角色的行动，使新场景有了来由。' },
    { knowledgePointIds: [observation, story, expression], prompt: '两位读者对故事角色为什么停下有不同看法，怎样交流更有根据？', answer: '各自找出角色前后的行动线索，再说明哪种理解得到支持', distractors: ['只坚持自己的感觉，不回看故事', '把其中一个猜想说成大家都看到的事实'], hint: '回到故事写出的线索，再解释自己的理解。', explanation: '用前后行动作依据并标明自己的理解，能尊重不同看法又避免把猜测当事实。' },
    { knowledgePointIds: [viewpoint, sensory], prompt: '同一座花园从小鸟和小蚂蚁的视角讲述，哪种改写最能体现视角变化？', answer: '小鸟先看见小路和花坛，小蚂蚁先注意身旁的泥土和细缝', distractors: ['两个角色都只介绍远处的楼房颜色', '把所有景物写得一样大，不提角色在哪里'], hint: '根据角色所在高度和距离挑选会注意的细节。', explanation: '角色位置不同，看到的范围和细节也不同，改写体现了视角变化。' },
    { knowledgePointIds: [story, cooperation], prompt: '伙伴提出的两个情节都很有趣，但它们没有连接点。小组下一步怎样处理？', answer: '找共同线索把它们连起来，连不起来时再商量保留哪个', distractors: ['不作说明地把情节并排放进故事', '要求提出其中一个点子的伙伴退出创作'], hint: '回到故事目标，寻找能连接的地方或一起取舍。', explanation: '先尝试找共同线索，必要时共同取舍，能让合作和情节连贯兼顾。' },
    { knowledgePointIds: [story, expression], prompt: '角色发现门口有一条水迹，后来故事写到他找回了帽子。哪项修改能让结尾回应前面的线索？', answer: '补充他沿着水迹找到被雨淋湿的帽子，并说明接下来怎样处理', distractors: ['只写帽子的颜色，不说明水迹和帽子的关系', '突然换成另一个角色获得奖品'], hint: '让结尾回应前面出现的线索或困难。', explanation: '水迹帮助角色找到帽子，结尾再交代处理办法，前后就能连接起来。' },
    { knowledgePointIds: [cooperation, expression], prompt: '一次共同创作后，小组发现一位伙伴的想法没有进入故事。怎样复盘并改进下一次？', answer: '先听他说想补充什么，再安排轮流发言并共同检查每个点子', distractors: ['只让写得最快的人决定所有内容', '把故事删掉重来，但不询问伙伴想法'], hint: '复盘要听到伙伴的实际想法，并提出下次可实行的办法。', explanation: '先听取遗漏的想法，再改进发言方式并一起检查，能让伙伴真正参与。' },
    { knowledgePointIds: [sensory, story, expression], prompt: '故事的目标是让角色找到安静的休息处，哪组细节最值得保留？', answer: '树叶挡住刺眼的阳光，旁边的小路没有吵闹声', distractors: ['花坛里有几种颜色鲜艳的花', '远处的墙上画着一幅大图画'], hint: '选与角色寻找安静休息处有关的环境线索。', explanation: '遮阳和安静都帮助读者理解休息处为什么合适，其他细节与目标关系较弱。' },
    { knowledgePointIds: [observation, viewpoint], prompt: '小虫子觉得草叶上的圆珠像一颗大弹珠。怎样写能让读者明白大小感来自角色视角？', answer: '对小虫子来说，草叶上的露珠像一颗大弹珠', distractors: ['露珠就是一颗真正的弹珠', '所有人看到的露珠都和房子一样大'], hint: '说明是谁在看，并用比较词表达想象。', explanation: '“对小虫子来说”和“像”交代了角色视角和联想，不会误写成事实。' },
    { knowledgePointIds: [story, cooperation, expression], prompt: '互读后，伙伴说“不知道角色为什么转身”。怎样把反馈变成具体修改？', answer: '回看前文的线索，补一句说明角色听见或看见了什么', distractors: ['告诉伙伴再读一遍就会懂，不作修改', '增加几句角色衣服的颜色描写'], hint: '找出读者不清楚的行动原因，再补上相关线索。', explanation: '补充角色转身前听到或看到的线索，能直接回应读者的疑问。' },
  ],
};

export const grade2Term2ChineseUnit04SupplementalActivities: Grade2Term2ChineseUnit04SupplementalActivity[] = Object.entries(drafts).flatMap(([difficulty, items]) => (
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
