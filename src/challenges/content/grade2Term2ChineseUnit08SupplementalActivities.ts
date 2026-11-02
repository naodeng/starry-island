import type { ChoiceActivityDefinition, Difficulty } from '../../content/types';

export interface Grade2Term2ChineseUnit08SupplementalActivity {
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

const sourceUnitId = 'grade-2/term-2/chinese/unit-08';
const idPrefix = 'challenge-supplement-grade-2-term-2-chinese-unit-08';
const ancientLife = 'ancient-life-and-natural-environment';
const imagination = 'imagination-vs-verifiable-facts';
const myth = 'myth-character-challenge-and-solution';
const sequence = 'story-event-order-and-consequence';
const textEvidence = 'text-evidence-and-faithful-retelling';
const originalStory = 'original-imaginative-story-writing';

export const grade2Term2ChineseUnit08CoreKnowledgePointIds = [
  ancientLife,
  imagination,
  myth,
  sequence,
  textEvidence,
  originalStory,
] as const;

const drafts: Record<Difficulty, ActivityDraft[]> = {
  basic: [
    {
      knowledgePointIds: [ancientLife, textEvidence],
      prompt: '为远古生活主题画图，哪种准备能让画面和阅读内容连起来？',
      answer: '先找出写到的地点和景物，再根据线索补充画面',
      distractors: ['先画所有自己喜欢的动物，不看故事写了什么', '把现代街道直接说成故事里的远古环境'],
      hint: '先从文字中找一找环境线索。',
      explanation: '地点和景物线索能帮助想象；补充的画面仍是自己的创作。',
    },
    {
      knowledgePointIds: [imagination],
      prompt: '一则故事写月亮悄悄和孩子说话，怎样介绍这句话？',
      answer: '这是作者的想象表达，不等于月亮真的会说话',
      distractors: ['这是已经证明的自然科学事实', '这是每个人每天都会听见的声音'],
      hint: '想想月亮会说话是在故事里，还是可以直接观察到。',
      explanation: '故事可以让自然事物像人物一样说话，这是想象表达，不是事实证明。',
    },
    {
      knowledgePointIds: [myth, imagination],
      prompt: '神话里出现神奇的太阳故事，想了解现实中的太阳现象，怎样做？',
      answer: '查阅科普资料并说明来源，不只依据神话情节',
      distractors: ['把神话情节当成太阳的科学说明', '只听没有出处的说法，不再核对'],
      hint: '故事帮助我们阅读想象，科学问题可以另找资料。',
      explanation: '神话情节属于作品内容；了解自然现象应使用可靠科普资料。',
    },
    {
      knowledgePointIds: [myth, sequence],
      prompt: '向同伴讲一个神话，怎样安排人物行动的先后更清楚？',
      answer: '先交代困难，再讲行动，最后说结果',
      distractors: ['先讲结尾，再跳着说几件不相关的事', '只说人物名字，不提遇到什么事情'],
      hint: '听众需要知道人物为什么行动以及后来怎样。',
      explanation: '困难、行动和结果按顺序说，能帮助听众理解故事发展。',
    },
    {
      knowledgePointIds: [myth, textEvidence],
      prompt: '读到一位人物帮助大家解决困难，想知道他为什么这样做，先找什么？',
      answer: '回看人物遇到的困难和后来的结果',
      distractors: ['只看故事插图的颜色', '先猜人物的心思，再说猜想就是课文内容'],
      hint: '人物行动前后的故事线索可以帮助理解原因。',
      explanation: '困难和结果是理解行动的线索；人物心里怎么想不能只靠猜。',
    },
    {
      knowledgePointIds: [textEvidence, imagination],
      prompt: '复述故事时，怎样让听众分清发生的事和自己的感受？',
      answer: '保留主要事情，用自己的话讲，不把个人感受说成情节',
      distractors: ['把自己的感受加进故事，说成角色做过的事', '删掉故事里的主要行动，只留下心情'],
      hint: '可以用自己的话讲故事，也可以另外说说自己的想法。',
      explanation: '复述要依据故事内容；个人感受可以分享，但要和情节分开。',
    },
    {
      knowledgePointIds: [originalStory, ancientLife],
      prompt: '开始创作一段远古主题的小故事，先安排什么更合适？',
      answer: '先想人物和故事发生的自然环境',
      distractors: ['先写很多结尾，再随便挑一个人物', '只列景物名称，不想故事发生了什么'],
      hint: '先确定谁在什么地方，故事才有起点。',
      explanation: '人物和环境能帮助读者进入故事，再继续想后面的行动。',
    },
    {
      knowledgePointIds: [originalStory, imagination],
      prompt: '自己的故事里画了会跳舞的树，怎样让读者明白这是什么内容？',
      answer: '把想象画面注明是故事创作',
      distractors: ['说树真的会跳舞，并且已经被科学证明', '不作说明，让读者以为是亲眼观察的事实'],
      hint: '创作有趣，也可以告诉读者它是想象。',
      explanation: '标明这是故事创作，读者就能欣赏想象而不把它当成事实。',
    },
    {
      knowledgePointIds: [textEvidence, sequence],
      prompt: '课文里的人物做了重要行动，向低年级小朋友讲述时怎样准备？',
      answer: '先看故事中行动的线索，再用自己的话描述',
      distractors: ['不看故事内容，按自己喜欢的顺序讲', '把不记得的行动随意换成另一个故事'],
      hint: '回到文字里找和行动有关的内容。',
      explanation: '先找到故事线索再复述，能保留原来事件的大意。',
    },
    {
      knowledgePointIds: [myth, sequence],
      prompt: '制作一张神话故事小卡，哪种写法最容易看懂？',
      answer: '把人物遇到的困难和行动按先后写清楚',
      distractors: ['只写神话有多神奇，不提人物做了什么', '把结尾放在开头，再把行动打乱'],
      hint: '让读者知道事情从哪里开始，后来怎样发展。',
      explanation: '按先后写出困难和行动，读者更容易了解故事过程。',
    },
    {
      knowledgePointIds: [imagination, textEvidence],
      prompt: '同学说一个远古生活细节一定是真的，但目前只在想象故事里看到，怎样记？',
      answer: '把未确认的内容标成待查，不先说成历史事实',
      distractors: ['因为故事写了，就说所有人都这样生活', '不查资料，直接把细节放进历史介绍'],
      hint: '故事画面可以启发想象，历史说法还要找依据。',
      explanation: '只在想象故事里出现的细节不能直接当成历史事实，先标出待查更准确。',
    },
    {
      knowledgePointIds: [originalStory, sequence, myth],
      prompt: '构思一个人物解决困难的小故事，哪种安排更完整？',
      answer: '让人物遇到的困难能引出行动，结尾回应这个困难',
      distractors: ['让结尾出现与前面无关的新人物', '只写困难，不让人物采取行动'],
      hint: '想想困难、行动和结尾怎样连在一起。',
      explanation: '行动回应困难，结尾再说明结果，故事就比较完整。',
    },
    {
      knowledgePointIds: [sequence, myth],
      prompt: '想说明神话人物的做法为什么带来后来的变化，先做什么？',
      answer: '找出事件发生先后，再联系困难与行动',
      distractors: ['只读最后一句，就确定全部原因', '把自己的猜想当成故事里发生的事'],
      hint: '按照事情先后，把人物遇到的困难和做法连起来。',
      explanation: '先后顺序和人物行动能帮助读者理解变化；解释要有故事线索支持。',
    },
    {
      knowledgePointIds: [ancientLife, imagination, textEvidence],
      prompt: '给故事插画写说明时，怎样让读者分清原有线索和补充的画面？',
      answer: '依据文本中的自然景物补充想象，不把补充内容说成已证事实',
      distractors: ['把自己加画的景物说成课文已经写明', '只说画面好看，不讲它和故事有什么关系'],
      hint: '指出文字里的景物，也告诉读者哪里是自己补充的。',
      explanation: '文字线索能支持想象；额外补充的画面仍应标成创作。',
    },
  ],
  advanced: [
    {
      knowledgePointIds: [ancientLife, imagination, textEvidence],
      prompt: '展板把远古生活资料和同学的想象画放在一起，怎样标注更清楚？',
      answer: '把资料能支持的内容和自己想象的部分分开说明',
      distractors: ['不分来源，让读者猜哪些是真的', '把想象画都当作资料已经证明的生活'],
      hint: '让读者看出信息来自资料，还是来自创作。',
      explanation: '分别说明资料内容和想象部分，读者才不会把它们混为一谈。',
    },
    {
      knowledgePointIds: [imagination, textEvidence, sequence],
      prompt: '同学写的故事摘要多出一件原文没提到的行动，怎样修改？',
      answer: '回到故事核对事件，保留有依据的内容并标明补充想象',
      distractors: ['为了让故事更热闹，把新增行动说成课文内容', '只删掉故事结尾，不再核对前面的事'],
      hint: '检查摘要里哪些事情能在故事中找到。',
      explanation: '回文核对能保证复述忠于内容；额外创作的部分要清楚标明。',
    },
    {
      knowledgePointIds: [myth, sequence],
      prompt: '整理一位神话人物解决困难的故事卡，怎样排事件？',
      answer: '按困难出现、人物行动、结果变化整理',
      distractors: ['先写结果，再随意插入人物行动', '只写困难和结果，不说人物做了什么'],
      hint: '人物的行动发生在困难之后，结果要放在行动之后。',
      explanation: '困难、行动和结果的顺序能显示故事怎样发展。',
    },
    {
      knowledgePointIds: [imagination, textEvidence],
      prompt: '班级分享神话中的神奇画面，也想介绍白天和夜晚的自然现象，怎样安排？',
      answer: '标明神话画面属于故事；自然问题另查科普资料',
      distractors: ['把神话画面当作自然现象的证明', '因为故事有想象，就不再了解自然问题'],
      hint: '欣赏故事和了解自然知识可以分别使用不同资料。',
      explanation: '故事说明作品写了什么；自然现象应从科普资料或成人指导中了解。',
    },
    {
      knowledgePointIds: [originalStory, myth, sequence],
      prompt: '伙伴读原创故事时觉得人物行动来得突然，怎样改进？',
      answer: '补上促使人物行动的困难线索，再检查结尾是否回应',
      distractors: ['再加一个没有关系的神奇人物', '删掉所有行动，只留下故事标题'],
      hint: '故事前面要有线索，后面也要交代行动带来的变化。',
      explanation: '困难能说明行动的原因，结尾回应困难能让情节更连贯。',
    },
    {
      knowledgePointIds: [ancientLife, imagination, textEvidence],
      prompt: '同学画的远古环境比故事里写得更丰富，怎样在图旁作说明？',
      answer: '保留文字写到的景物，把额外添加的部分标成想象',
      distractors: ['说所有画面都直接来自故事文字', '删除文字线索，只留下自己喜欢的景物'],
      hint: '把故事提到的内容和自己加进去的景物分开。',
      explanation: '先保留故事线索，再标清补充想象，读者就能看出两者的来源。',
    },
    {
      knowledgePointIds: [imagination, textEvidence],
      prompt: '有人把神话情节介绍成真实历史，想进一步核对时怎样做？',
      answer: '查找可靠历史或博物馆资料，不只凭故事判断',
      distractors: ['只重复神话情节，不再找别的资料', '选最有趣的说法，不管有没有出处'],
      hint: '历史介绍要有可以继续查找的来源。',
      explanation: '神话是文学作品；要核对历史，需要查阅可靠的历史或博物馆资料。',
    },
    {
      knowledgePointIds: [myth, sequence, textEvidence],
      prompt: '向低年级同学讲神话时，怎样组织复述？',
      answer: '先交代人物和背景，再说困难、行动和结果',
      distractors: ['先说个人感受，再随意补几个故事事件', '只讲最神奇的一句话，不交代人物为什么行动'],
      hint: '听众先需要知道人物和事情发生的背景。',
      explanation: '人物、背景、困难、行动和结果按顺序介绍，复述会更容易听懂。',
    },
    {
      knowledgePointIds: [imagination, textEvidence],
      prompt: '做远古生活介绍卡时，哪项内容更适合列在“可以查找出处”一栏？',
      answer: '选择能在资料或说明牌中找到出处的内容，并标出来源',
      distractors: ['把故事里的神奇画面直接写成真实生活资料', '只写个人喜欢的想法，不说明从哪里来'],
      hint: '能查找来源的信息，才适合放进资料栏。',
      explanation: '资料栏应放能找到出处的内容；故事想象和个人感受要另作说明。',
    },
    {
      knowledgePointIds: [myth, sequence, textEvidence],
      prompt: '神话人物采取行动后，故事出现了结果。怎样说明这段变化？',
      answer: '回看行动前后的情节，说明结果怎样回应人物遇到的困难',
      distractors: ['只说结果很神奇，不提人物遇到什么', '把行动顺序打乱，再猜原因'],
      hint: '把困难、行动和结果放在一起理解。',
      explanation: '对照前后情节，能说明结果与困难、行动之间的联系。',
    },
    {
      knowledgePointIds: [originalStory, sequence, myth],
      prompt: '原创故事里人物突然改变主意，怎样补充能让变化更自然？',
      answer: '补上行动发生前的原因线索，再让结果接上后续情节',
      distractors: ['增加一个和故事无关的结尾', '删掉人物行动，不再解释变化'],
      hint: '前面有线索，后面的结果就更容易理解。',
      explanation: '行动前的线索能说明人物为什么改变，后续情节再交代结果。',
    },
    {
      knowledgePointIds: [ancientLife, imagination, textEvidence],
      prompt: '制作介绍卡时同时用了故事和生活资料，怎样组织信息？',
      answer: '把文字线索、补充的想象和实际生活资料分别标明',
      distractors: ['把所有内容混成一段，不标出来源', '删掉资料来源，只保留个人想象'],
      hint: '作品内容、自己的补充和资料说明要各有位置。',
      explanation: '分开标注三类内容，读者才能知道哪些来自作品、资料或创作。',
    },
    {
      knowledgePointIds: [ancientLife, imagination, textEvidence],
      prompt: '一句话说“所有古人都住在同一种地方”，怎样改得更稳妥？',
      answer: '不把一个故事的生活画面说成所有古人都一样，继续查找资料',
      distractors: ['保留“所有人都一样”，不用查看其他资料', '把一个想象画面当成全部历史记录'],
      hint: '一个故事画面不能代表所有人的生活。',
      explanation: '不同地方和时期的生活可能不同，范围很大的说法需要更多资料支持。',
    },
    {
      knowledgePointIds: [textEvidence, imagination],
      prompt: '复述故事时还想说说自己读后的感受，怎样安排更清楚？',
      answer: '按课文讲清事件，再另用“我觉得”表达个人感受',
      distractors: ['把感受说成故事里的人物实际做过的事', '只说“我觉得”，不讲故事发生了什么'],
      hint: '先说明作品内容，再告诉听众自己的想法。',
      explanation: '分开复述和感受，听众就能分清故事线索与个人想法。',
    },
  ],
  high: [
    {
      knowledgePointIds: [myth, imagination, textEvidence],
      prompt: '做一张神话主题展板，怎样同时介绍故事和现实资料？',
      answer: '先标注神话内容，再分开写可查资料和自己的想象',
      distractors: ['把神话情节、资料和想象混在一起，不标来源', '只放神奇故事，不让读者知道它属于作品'],
      hint: '不同来源的内容要让读者看得出来。',
      explanation: '标清故事、可查资料和个人想象，能保留趣味也避免误解。',
    },
    {
      knowledgePointIds: [originalStory, ancientLife, myth, sequence],
      prompt: '设计一段自然主题的原创故事，哪种计划更完整？',
      answer: '安排人物、自然环境、困难、行动和结果，再检查前后是否连贯',
      distractors: ['只选很多景物，不安排人物行动', '先写一个结尾，再把无关事件放到前面'],
      hint: '检查人物、环境和事件之间有没有联系。',
      explanation: '人物和环境搭起故事，困难、行动和结果组成发展顺序。',
    },
    {
      knowledgePointIds: [originalStory, textEvidence, sequence],
      prompt: '伙伴试读原创故事后说有一处不明白，怎样改进并确认？',
      answer: '请伙伴指出不清楚的地方，调整情节连接后再请人试读',
      distractors: ['怪伙伴没认真读，不再检查故事', '只换标题颜色，不处理不清楚的情节'],
      hint: '先找出具体问题，再修改并检查新的版本。',
      explanation: '依据读者反馈调整情节，再次试读能确认表达是否清楚。',
    },
    {
      knowledgePointIds: [myth, sequence, textEvidence],
      prompt: '给同学讲一个神话，怎样准备提纲能让故事顺序清楚？',
      answer: '先按故事线索列出人物和困难，再依事件顺序复述行动与结果',
      distractors: ['只抄最神奇的句子，不整理事件顺序', '先讲结果，再把人物困难放到最后'],
      hint: '提纲要帮助听众跟着故事一步步走。',
      explanation: '人物、困难、行动和结果有序排列，能支持清楚复述。',
    },
    {
      knowledgePointIds: [originalStory, ancientLife, imagination],
      prompt: '为自然主题绘本加入会说话的树，怎样避免把创作当成资料？',
      answer: '把景物想象标成创作，并另外说明哪些内容来自资料',
      distractors: ['把会说话的树说成资料记载的真实现象', '不告诉读者来源，让他自己判断'],
      hint: '创作画面和资料介绍可以同时出现，但要注明。',
      explanation: '说明哪些是想象、哪些来自资料，读者就不会把两类内容混淆。',
    },
    {
      knowledgePointIds: [ancientLife, textEvidence, imagination],
      prompt: '小组做远古生活资料页，怎样记录每条内容的依据？',
      answer: '每条古代生活信息都标清故事线索或可查资料的出处',
      distractors: ['只凭一幅想象图就写下所有生活情况', '把同学的猜想当作已经核实的资料'],
      hint: '读者需要知道信息来自作品，还是来自可以查找的资料。',
      explanation: '标明作品线索或资料出处，能帮助读者了解信息依据。',
    },
    {
      knowledgePointIds: [myth, imagination, textEvidence],
      prompt: '一段神话写了神奇的太阳画面，想介绍白天和夜晚的原因，怎样安排？',
      answer: '欣赏神话的想象画面，另用科普资料说明自然现象',
      distractors: ['把神话画面当作科学解释', '因为神话有想象，就不再了解自然现象'],
      hint: '文学故事和自然知识可以用不同来源了解。',
      explanation: '神话可以欣赏其想象；自然原因应另查可靠的科普资料。',
    },
    {
      knowledgePointIds: [originalStory, sequence, textEvidence],
      prompt: '读者说原创故事中的两件事接不上，怎样修改后再检查？',
      answer: '补上连接两个事件的线索，再按前后顺序试读',
      distractors: ['再添几件无关的事，让故事更长', '把两件事调换，不看它们之间的关系'],
      hint: '读者需要看到两件事为什么会接在一起。',
      explanation: '补充相关线索并按顺序试读，能检查故事是否连贯。',
    },
    {
      knowledgePointIds: [myth, imagination, textEvidence],
      prompt: '介绍神话中的人物行动时，怎样避免把神话说成自然科学证明？',
      answer: '说明人物遇到的困难和故事中的行动，不把神话当成科学证明',
      distractors: ['把故事里的每件事都当成科学实验结果', '删掉人物行动，只留一个结尾'],
      hint: '告诉读者这是作品里的故事内容。',
      explanation: '说明神话中的人物和行动，可以讲清故事而不把文学想象当成科学证据。',
    },
    {
      knowledgePointIds: [sequence, textEvidence, imagination],
      prompt: '分享神话时也想说个人感受，哪种版面安排更清楚？',
      answer: '按故事事件顺序介绍，再将个人感受放在单独一栏',
      distractors: ['把个人感受插进故事里，当成事件', '只写感受，不说明故事发生了什么'],
      hint: '故事内容和个人想法可以分开呈现。',
      explanation: '分栏介绍故事和感受，读者能看清哪些是作品内容、哪些是个人想法。',
    },
    {
      knowledgePointIds: [textEvidence, imagination, ancientLife],
      prompt: '一页分享同时有实地记录、课文情节和自己补画的画面，怎样标注？',
      answer: '把实际记录、课文情节和自己的联想用不同标记区分',
      distractors: ['把三种内容混写，不说明各自从哪里来', '把自己的联想说成实际观察到的记录'],
      hint: '为三种不同来源的信息分别做标记。',
      explanation: '区分实地记录、作品情节和个人联想，分享内容就更准确。',
    },
    {
      knowledgePointIds: [originalStory, myth, sequence],
      prompt: '想创作一个人物解决困难的小故事，怎样让结尾和开头连起来？',
      answer: '创作人物遇到困难后的行动，并让结尾回应开头的问题',
      distractors: ['让结尾出现和开头无关的新问题', '只写人物名字，不安排行动或结果'],
      hint: '开头提出的问题，要在后面的行动和结果中得到回应。',
      explanation: '困难引出行动，结尾回应开头，故事结构就更完整。',
    },
    {
      knowledgePointIds: [imagination, textEvidence, ancientLife],
      prompt: '同一页介绍里放了神话故事和博物馆资料，怎样帮助读者比较？',
      answer: '分别标明故事出处和资料来源，不把两类内容混写',
      distractors: ['只写一个标题，不指出两类内容', '把博物馆资料改写成神话情节'],
      hint: '让读者知道哪句来自作品，哪句来自资料。',
      explanation: '标明故事和资料各自来源，读者就能分辨作品想象与可查信息。',
    },
    {
      knowledgePointIds: [ancientLife, imagination, myth, sequence, textEvidence, originalStory],
      prompt: '完成一份远古故事与自然主题作品，哪种制作流程最完整？',
      answer: '先确定主题和资料，再设计情节、检查顺序并请伙伴试读',
      distractors: ['先写结论，再随意加入故事和资料', '只画封面，不检查故事顺序和内容来源'],
      hint: '把主题、依据、创作和检查依次安排。',
      explanation: '先选主题和资料，再创作、检查并听取反馈，作品会更清楚完整。',
    },
  ],
};

export const grade2Term2ChineseUnit08SupplementalActivities: Grade2Term2ChineseUnit08SupplementalActivity[] = Object.entries(drafts).flatMap(([difficulty, items]) => (
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
