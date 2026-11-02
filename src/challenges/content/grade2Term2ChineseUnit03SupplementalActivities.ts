import type { ChoiceActivityDefinition, Difficulty } from '../../content/types';

export interface Grade2Term2ChineseUnit03SupplementalActivity {
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

const sourceUnitId = 'grade-2/term-2/chinese/unit-03';
const idPrefix = 'challenge-supplement-grade-2-term-2-chinese-unit-03';
const geography = 'cultural-presentation';
const festivals = 'festival-customs';
const characters = 'character-components';
const food = 'food-vocabulary';
const sources = 'culture-source-checking';
const respect = 'cultural-respect';

const drafts: Record<Difficulty, ActivityDraft[]> = {
  basic: [
    { knowledgePointIds: [geography, sources], prompt: '一张介绍河流位置的卡片要配地图，怎样确认地点信息？', answer: '对照地图或可靠介绍确认地点和河流位置', distractors: ['只凭颜色猜出河流名称', '把地图上最近的城市当成答案'], hint: '把文字说的地点和地图标注放在一起看。', explanation: '对照地名和地图标注，能帮助我们核实位置关系。' },
    { knowledgePointIds: [festivals, respect], prompt: '介绍一个节日时，怎样说习俗更合适？', answer: '核对节日和常见活动，也说明各地做法可能不同', distractors: ['说每个家庭都必须用同一种方式庆祝', '把听来的一件事说成所有地方的规定'], hint: '节日常有一些活动，不同地区和家庭也可能有差异。', explanation: '介绍常见活动时说明范围，能尊重不同地方和家庭的做法。' },
    { knowledgePointIds: [characters], prompt: '看到一个字带木字旁，这个部件可以怎样帮助认字？', answer: '可能和树木有关，还要结合整个字和词语判断', distractors: ['可以确定这个字只表示一种树', '不用读词语也能知道这个字的全部意思'], hint: '部件能提供线索，但通常还要看字和词语。', explanation: '偏旁可能提示字义的一部分，结合词语能让判断更准确。' },
    { knowledgePointIds: [food], prompt: '整理“煮面、炒菜、烤红薯”时，按什么线索分类？', answer: '按词语里表示制作方法的动作归类', distractors: ['按词语里食物有几个字来归类', '按自己最喜欢哪种食物来归类'], hint: '留意“煮、炒、烤”这些词语说了什么。', explanation: '动词表示不同的烹饪方法，可以作为整理美食词语的线索。' },
    { knowledgePointIds: [respect, festivals], prompt: '同学说他家中秋节的安排和你家不一样，怎样回应？', answer: '认真听他的分享，并说明不同家庭做法可能不一样', distractors: ['告诉他只有你家的做法才正确', '没听完就说他的经验不重要'], hint: '先听听同学说的是他家怎样做。', explanation: '尊重并倾听不同家庭的经验，能帮助大家更好地认识节日。' },
    { knowledgePointIds: [food], prompt: '一张美食卡片想让别人知道食物是什么、怎样做，写什么？', answer: '写出食物名称和一种制作方法', distractors: ['只写自己的座位在哪里', '只写今天是星期几'], hint: '介绍食物时可以说出名称和做法。', explanation: '名称和制作方法能帮助读者了解一种食物。' },
    { knowledgePointIds: [sources], prompt: '想知道一个地方美食的来历，先怎样查找？', answer: '先找可靠介绍或询问熟悉当地的人', distractors: ['只相信没有说明来源的转发消息', '根据食物颜色想象它的来历'], hint: '先想想信息从哪里来、能不能核实。', explanation: '查找有来源的介绍或询问熟悉当地的人，比猜测更可靠。' },
    { knowledgePointIds: [geography, sources], prompt: '介绍卡写着一个地名，怎样让读者知道它在哪里？', answer: '说清楚具体地点，再核对地图或介绍资料', distractors: ['只说“离这里不远”而不标地点', '画一个没有地名的圆圈当作位置'], hint: '可以使用地名和地图上的标记。', explanation: '具体地名配合地图或可靠资料，位置说明会更清楚。' },
    { knowledgePointIds: [characters, sources], prompt: '看到不熟悉的字带有某个偏旁，接下来怎样理解更稳妥？', answer: '先看偏旁提供的线索，再结合词语和句子理解', distractors: ['只看偏旁就给整个词语定意思', '跳过这个字，不读前后的词语'], hint: '把字形线索和它出现的词语一起看。', explanation: '偏旁与上下文相互参照，能减少只凭一个部件猜字义的情况。' },
    { knowledgePointIds: [festivals, sources], prompt: '两张节日介绍卡写的时间不同，先做什么？', answer: '查找可信的节日介绍并核对时间线索', distractors: ['随便选一张，不再查看内容', '把两张卡的时间都当作没有意义'], hint: '先看看资料来源和说法的范围。', explanation: '核对可靠资料能帮助我们理解不同说法是否有具体背景。' },
    { knowledgePointIds: [geography], prompt: '地图旁边有方向标和图例，查看地点时先看什么？', answer: '先看图例和地名，再确认地图上的位置', distractors: ['只看地图的边框形状', '不看方向标，随手指一个地方'], hint: '地图上的符号和方向标各有作用。', explanation: '了解图例、方向和地名后，再读位置会更准确。' },
    { knowledgePointIds: [food, respect], prompt: '介绍一种地方美食时，哪种说法更尊重不同地方？', answer: '说清这是某地常见做法，不代表所有地方都一样', distractors: ['说全国每个地方做法都完全相同', '说没尝过的地方食物一定不好吃'], hint: '说明做法属于哪个地方，也给差异留出空间。', explanation: '说明地点和范围能避免把一种经验说成所有地方的共同做法。' },
    { knowledgePointIds: [sources], prompt: '把一张节日图片放进介绍卡前，先检查什么？', answer: '先确认图片内容与要介绍的节日或美食有关', distractors: ['只看图片颜色是不是很鲜艳', '不看图片内容，放进任何主题都可以'], hint: '图片也要支持正在介绍的主题。', explanation: '核对图片和主题是否相关，能让介绍信息更准确。' },
    { knowledgePointIds: [geography, festivals, characters, food], prompt: '小组要做传统文化展板，怎样分工更清楚？', answer: '按地点、节日、汉字和美食分工，再合在一起检查', distractors: ['每个人都只画同一张装饰图', '不商量内容，最后把所有材料随意贴上'], hint: '让不同伙伴负责不同信息，最后一起检查。', explanation: '分工整理并共同核对，可以让展板内容更完整、更清楚。' },
  ],
  advanced: [
    { knowledgePointIds: [geography, sources], prompt: '两份地图对同一地点的标注看起来不同，怎样核对？', answer: '先核对地图、地名和文字来源是否指向同一地点', distractors: ['只相信颜色更深的那张地图', '把两处不同地名当作同一个地点'], hint: '资料可能标注了不同范围或不同地点。', explanation: '比较地名、地图范围和来源，能判断资料是否在介绍同一地点。' },
    { knowledgePointIds: [festivals, respect, sources], prompt: '两位同学说的节日习俗不同，怎样了解原因？', answer: '比较不同资料说明的地区和习俗范围', distractors: ['要求其中一位收回自己的家庭经验', '认定两人中一定有人没有过过节'], hint: '习俗可能因地方或家庭而不同。', explanation: '了解各自说法的地区和范围，可以在尊重经验的同时继续查证。' },
    { knowledgePointIds: [characters, sources], prompt: '一个字的偏旁让你想到一种意思，怎样进一步确认？', answer: '结合部件、整个字和上下文，再查字典确认', distractors: ['只凭偏旁写下确定答案，不再核对', '只看字的笔画多少决定意思'], hint: '认字时可以把字形、词语和工具书放在一起。', explanation: '结合部件与语境，再查字典核对，判断会比单看偏旁可靠。' },
    { knowledgePointIds: [food, sources], prompt: '记录一种家常菜时，怎样分清信息和体验？', answer: '把菜名、烹饪动作和个人感受分开记录', distractors: ['把个人喜欢说成这道菜唯一的特点', '把没有核对的做法写成每家都一样'], hint: '哪些是可以查证的内容，哪些是自己的感受？', explanation: '分开记录名称、做法和感受，能让介绍更清楚也更诚实。' },
    { knowledgePointIds: [sources, respect], prompt: '一张介绍卡同时用了资料和家人讲述，怎样标注更清楚？', answer: '说明资料中的说法，并标出自己的家庭经验', distractors: ['把家庭经验写成所有人的统一做法', '不说明来源，让读者猜内容从哪里来'], hint: '资料和亲身经验都可以分享，但要说清分别来自哪里。', explanation: '分清资料和个人经验，有助于读者理解信息范围。' },
    { knowledgePointIds: [geography, sources], prompt: '要在地图上介绍从一个地点到另一个地点，先核对什么？', answer: '查清地图图例和方向后再介绍路线', distractors: ['不看方向标，只凭记忆画路线', '把地图上任意两点说成相邻地点'], hint: '看懂地图符号和方向再描述位置。', explanation: '先确认图例和方向，可以减少路线说明中的误解。' },
    { knowledgePointIds: [festivals, respect], prompt: '伙伴讲了当地少见的节庆做法，你怎样继续交流？', answer: '先了解同学说的是哪个地区，再查资料比较其他地方的做法', distractors: ['说少见的做法就一定不真实', '要求伙伴只讲你熟悉的习俗'], hint: '先听清楚经验发生的地方，再找资料比较。', explanation: '了解地点背景并核对其他地区的介绍，能兼顾尊重伙伴和认识差异。' },
    { knowledgePointIds: [characters, sources], prompt: '比较两个带相同偏旁的汉字，怎样避免只看偏旁下结论？', answer: '将相同偏旁的字放一起观察，再比较词语中的具体意思', distractors: ['把两个字的全部意思认作相同', '不读词语，只按偏旁给它们分类'], hint: '相同部件是观察起点，不一定代表意思完全一样。', explanation: '比较部件的同时看不同词语，有助于理解字义线索和语境。' },
    { knowledgePointIds: [sources, geography, festivals], prompt: '两条资料对某地节庆活动的介绍不同，怎样记录发现？', answer: '找到两条可靠资料，标清共同点和不同点', distractors: ['只留下更热闹的说法', '把不同说法混成一个没有来源的结论'], hint: '保留来源并比较它们各自说明的内容。', explanation: '分别记录来源和差异，能让后续核对有据可查。' },
    { knowledgePointIds: [food, sources], prompt: '一份美食介绍中的做法看不明白，下一步怎样做？', answer: '先核对食材或做法的来源，不确定的地方注明还要查证', distractors: ['根据菜名猜一种做法并写成确定事实', '省略所有信息，让读者自己猜'], hint: '不确定时继续查证，也可以标明还没确认。', explanation: '核对来源并如实记录未确认之处，比把猜想写成事实更可靠。' },
    { knowledgePointIds: [geography, festivals, sources], prompt: '介绍某地的节日活动时，怎样把时间和地点说明得更可靠？', answer: '用地图、节日名称和季节线索互相核对', distractors: ['只写季节，不说明介绍的是哪个地方', '只写地名，不检查活动和节日是否对应'], hint: '多个相关线索可以一起检查。', explanation: '地点、节日和时间线索互相支持时，介绍更容易核对。' },
    { knowledgePointIds: [respect, festivals], prompt: '讨论节日习俗时，伙伴有不同经验，怎样安排交流？', answer: '先听完伙伴的经验，再讨论哪些内容可以作为共同介绍', distractors: ['只让经验相同的人发言', '用投票决定哪位同学的家庭经验正确'], hint: '先倾听，再分清共同信息和个人经验。', explanation: '倾听并区分经验范围，既尊重伙伴，也能整理出准确内容。' },
    { knowledgePointIds: [sources, geography, characters, food], prompt: '展板上的一条资料找不到依据，怎样处理？', answer: '让每条展板信息都能找到对应资料或明确标为个人体验', distractors: ['保留资料并说一定是真的', '把找不到来源的内容改成更肯定的语气'], hint: '每条信息需要有清楚的依据或范围说明。', explanation: '补上来源或标明个人体验，能避免读者把未经核实的内容当作事实。' },
    { knowledgePointIds: [geography, festivals, characters, food, respect], prompt: '展板完成后，小组用什么办法做最后检查？', answer: '共同检查地名、节日、字义和美食词语是否准确易读', distractors: ['只检查标题颜色，不再读正文', '只检查是否贴满整面展板'], hint: '一起从内容准确和读者能否看懂两方面检查。', explanation: '核对关键内容并检查表达是否清楚，能帮助展板更准确易读。' },
  ],
  high: [
    { knowledgePointIds: [geography, sources], prompt: '小组想介绍一处地理位置，怎样准备展板信息？', answer: '选择一个地点，查地图和介绍资料后标明信息来源', distractors: ['只凭想象画出位置并说它一定准确', '抄下没有出处的地名，不再确认'], hint: '先确定地点，再用资料核对并留下来源。', explanation: '地图和文字资料互相核对、标明来源，能让地点介绍更可信。' },
    { knowledgePointIds: [festivals, respect], prompt: '介绍节日习俗时，怎样既分享发现又尊重不同家庭？', answer: '把节日习俗写成当地示例，并邀请伙伴补充不同经验', distractors: ['把当地做法说成每个家庭都必须照做', '删除所有不同的经验，只留下一个答案'], hint: '说明做法属于哪里，也给伙伴补充经验的机会。', explanation: '用具体范围介绍习俗并欢迎不同经验，能让文化交流更尊重。' },
    { knowledgePointIds: [characters, sources], prompt: '展板要介绍一个不熟悉的汉字，怎样写出可靠说明？', answer: '展示偏旁线索、词语语境和查证结果，不把猜想写成结论', distractors: ['只写偏旁的名称就断定全部字义', '用自己想象的意思替代查证'], hint: '保留观察过程，也写清最终依据。', explanation: '把字形观察、词语语境和查证放在一起，可以避免夸大偏旁线索。' },
    { knowledgePointIds: [food, sources], prompt: '介绍一道地方美食时，怎样区分资料和自己的体验？', answer: '先核对菜名和制作方法，再把个人感受单独标出', distractors: ['把“我喜欢”写成所有人都喜欢', '把没查过的做法说成这道菜唯一的做法'], hint: '可以分别说明可核实的信息和自己的感受。', explanation: '核实名称和做法，再单独表达体验，能让介绍不混淆事实与感受。' },
    { knowledgePointIds: [geography, festivals, food, sources], prompt: '小组计划做一张“家乡文化”介绍卡，怎样选取资料？', answer: '同时介绍地点、节庆或美食中的一个主题，并标注来源范围', distractors: ['堆放很多信息，不说明它们来自哪里', '把一个家庭的体验说成整座城市的统一习惯'], hint: '选择清楚主题，说明信息对应的地点和来源。', explanation: '主题明确并交代资料范围，能帮助读者理解介绍适用于哪里。' },
    { knowledgePointIds: [sources, respect], prompt: '怎样组织展板，能让读者分清已核实的信息和个人经验？', answer: '把展板分成资料、个人体验和待确认问题三部分', distractors: ['把猜测、资料和体验混写成一段', '删除所有问题，只留下不确定的说法'], hint: '不同类型的信息可以用不同栏目呈现。', explanation: '分开呈现资料、体验和待确认问题，能准确表达知道什么、还要查什么。' },
    { knowledgePointIds: [geography, sources], prompt: '展板试展后，怎样检查地点介绍是否清楚？', answer: '邀请伙伴从地图位置、文字准确和页面易读三个方面提出建议', distractors: ['只问大家最喜欢哪种颜色', '只数展板上的图画有多少张'], hint: '请读者检查位置线索，也检查文字是否容易理解。', explanation: '从位置、准确性和可读性收集反馈，能帮助小组有针对性地修改。' },
    { knowledgePointIds: [festivals, respect, sources], prompt: '介绍一种节庆活动时发现不同地区做法不相同，怎样展示？', answer: '先查清同一习俗在不同地区的做法，再用具体地点作说明', distractors: ['只展示一种做法并称它适用于所有地方', '把地区差异删掉，让内容看起来一样'], hint: '比较时需要说明每种做法对应的地点。', explanation: '用具体地点说明差异，能让介绍更准确，也能尊重不同地方的文化。' },
    { knowledgePointIds: [characters, sources], prompt: '遇到一个不认识的字，怎样把探索步骤整理给伙伴？', answer: '把看不懂的字圈出，查部件和字典，再用上下文检查理解', distractors: ['猜一个意思直接告诉伙伴，不做核对', '只抄字典里的一个词，不看它出现的句子'], hint: '把发现、查找和核对的步骤都记录下来。', explanation: '先观察部件，再查字典并回到上下文检查，能让认字过程可复查。' },
    { knowledgePointIds: [food, sources], prompt: '展台介绍两种家常美食，怎样让信息和体验都清楚？', answer: '每种美食都写清名称、做法来源和体验者的感受', distractors: ['把个人口味说成这道菜的客观特点', '只放照片，不说明名称或制作信息'], hint: '让读者知道名称、信息从哪来，以及是谁的体验。', explanation: '分别呈现名称、来源和个人感受，能让美食介绍既清楚又准确。' },
    { knowledgePointIds: [festivals, sources, respect], prompt: '展板要写一种节日习俗，怎样核对内容并保留差异？', answer: '分别核对节日时间、常见习俗及不同地区的说明', distractors: ['只问一个人，就断定所有地区都这样', '只写自己最熟悉的活动，不说明范围'], hint: '节日名称、常见活动和地点范围都要检查。', explanation: '核对多个信息点并说明地区差异，可以避免把个别经验扩大成普遍结论。' },
    { knowledgePointIds: [sources, respect], prompt: '两份可靠介绍仍有说法不一致，小组下一步怎样做？', answer: '遇到说法不一致时保存来源，询问老师后再决定怎样展示', distractors: ['随便选一个说法并删除另一份资料', '为了省事把两个说法都写成确定事实'], hint: '保留资料线索，再请老师帮助判断。', explanation: '保留来源并继续请教，能让不确定的内容得到进一步核实。' },
    { knowledgePointIds: [geography, festivals, characters, food, sources], prompt: '小组四人合作制作文化介绍，怎样让资料可以互相核对？', answer: '每人负责一类资料，标注来源后一起检查是否互相矛盾', distractors: ['每人各做一张，最后不看彼此内容', '不分工，由一位伙伴猜完所有信息'], hint: '清楚分工后，还要把不同资料放在一起检查。', explanation: '分工、标注来源和交叉检查能帮助小组发现遗漏或不一致。' },
    { knowledgePointIds: [geography, respect], prompt: '为介绍某个区域画图，怎样避免用标签概括当地居民？', answer: '用清楚的图例和地名说明区域，不用刻板印象概括居民', distractors: ['用一个夸张人物代表所有当地人', '只凭一张照片判断每个人的生活方式'], hint: '介绍地图上的区域，不要替所有居民作同一种判断。', explanation: '用地图线索介绍地点，避免把个别印象扩大到当地所有人。' },
  ],
};

export const grade2Term2ChineseUnit03SupplementalActivities: Grade2Term2ChineseUnit03SupplementalActivity[] = Object.entries(drafts).flatMap(([difficulty, items]) => (
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
