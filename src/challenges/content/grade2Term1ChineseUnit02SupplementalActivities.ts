import type { ChoiceActivityDefinition, Difficulty } from '../../content/types';

export interface Grade2Term1ChineseUnit02SupplementalActivity {
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

const sourceUnitId = 'grade-2/term-1/chinese/unit-02';
const idPrefix = 'challenge-supplement-grade-2-term-1-chinese-unit-02';
const scene = 'scene-vocabulary';
const measure = 'measure-word-use';
const classification = 'tree-animal-classification';
const radical = 'radical-clues';
const seasons = 'seasonal-farming-sequence';
const expression = 'clear-description';

const drafts: Record<Difficulty, ActivityDraft[]> = {
  basic: [
    { knowledgePointIds: [measure, scene], prompt: '小路旁的牌子上写着“三__柳树”。哪一个量词最合适？', options: ['棵', '艘', '条'], hint: '想想人们怎样数一株株树。', explanation: '数树木通常用“棵”，所以“三棵柳树”合适。' },
    { knowledgePointIds: [scene], prompt: '“池塘边、果园里、田野上”这几个词主要告诉我们什么？', options: ['事物可能出现的地点', '一天中的时间顺序', '天气的冷热程度'], hint: '想想这些词能回答“在哪里”。', explanation: '池塘边、果园里和田野上都表示地点或场景。' },
    { knowledgePointIds: [classification], prompt: '哪一组里的词语都表示动物？', options: ['麻雀、白鹭', '松树、银杏', '麦苗、稻谷'], hint: '想想哪些名称会指会活动的动物。', explanation: '麻雀和白鹭都是鸟类动物；另外两组是植物或农作物。' },
    { knowledgePointIds: [radical, classification], prompt: '看到“松”带木字旁，先可以把它和哪类事物联系起来？', options: ['树木或木本植物', '天气变化', '数量多少'], hint: '偏旁能提供一条字义线索。', explanation: '木字旁常提示字义与树木或木本植物有关，还要结合整个词判断。' },
    { knowledgePointIds: [seasons], prompt: '种下种子后，经过照料，作物成熟了。哪项顺序更合乎农事过程？', options: ['播种、照料、收获', '收获、播种、照料', '照料、收获、播种'], hint: '先开始种植，再帮助作物生长，最后收取成熟作物。', explanation: '播种后要照料作物，成熟后才能收获。' },
    { knowledgePointIds: [expression, scene], prompt: '想让伙伴想象出校园一角，哪句话提供的信息更清楚？', options: ['操场边有两棵高高的树', '那里有一些东西', '我今天很高兴'], hint: '找出地点、事物和具体特点。', explanation: '这句话说明了地点、数量和事物特点，画面更具体。' },
  ],
  advanced: [
    { knowledgePointIds: [measure, scene], prompt: '介绍河边的景物时，哪句话里的量词和事物搭配合适？', options: ['河面上有两艘小船', '河边长着两艘柳树', '岸上停着两条石桥'], hint: '量词要符合事物的常见说法。', explanation: '“艘”常用于船；“柳树”常用“棵”，“石桥”常用“座”。' },
    { knowledgePointIds: [scene, classification], prompt: '把“石桥、柳树、麻雀”按“地点里的事物”整理，哪种做法最清楚？', options: ['先写地点，再列出桥、树和鸟', '只写“很多东西”', '把三个名称都当成地点'], hint: '地点和地点里的事物承担不同作用。', explanation: '先交代地点，再列出其中的事物，信息关系更清楚。' },
    { knowledgePointIds: [radical, classification], prompt: '有个带木字旁的词不表示树木。怎样判断它在句子中的意思？', options: ['结合整个词和句子线索', '只凭偏旁就下结论', '不读词语直接猜'], hint: '偏旁是提示，不是判断词义的唯一依据。', explanation: '偏旁只能提供线索，还要结合完整词语和句子理解。' },
    { knowledgePointIds: [seasons], prompt: '一张卡写着“春天播种、夏天照料、秋天收获”。卡片按什么顺序组织？', options: ['按一年中的时间顺序', '按事物的大小顺序', '按地点远近顺序'], hint: '留意春、夏、秋在一年中的先后。', explanation: '春、夏、秋是时间线索，卡片按农事发生的季节先后排列。' },
    { knowledgePointIds: [expression, scene], prompt: '“那边有一棵树”没有说明“那边”在哪里。怎样修改能补足地点？', options: ['写成“池塘边有一棵树”', '改成“树很特别”', '删去整句话'], hint: '把模糊的地点换成可以想象的具体场景。', explanation: '“池塘边”说明了具体位置，伙伴更容易想象画面。' },
    { knowledgePointIds: [radical, classification], prompt: '“枫树”和“白鹭”放在一起时，哪条分类依据最合适？', options: ['树木和动物', '颜色深浅', '名称字数'], hint: '看一看两个名称分别表示什么事物。', explanation: '枫树是树木，白鹭是动物，按事物类别分类更有意义。' },
    { knowledgePointIds: [scene, expression], prompt: '听众想知道小桥周围有什么，哪条介绍最能回答这个问题？', options: ['小桥旁有一条小河和几棵柳树', '小桥的名字很好听', '我喜欢春天'], hint: '选择直接说出地点和周围事物的句子。', explanation: '这句话说明了小桥旁的具体事物，回答了听众的问题。' },
    { knowledgePointIds: [seasons, expression], prompt: '把“天气转凉，田里的谷物成熟了”放进四季介绍，最适合归在哪个季节？', options: ['秋天', '春天', '夏天'], hint: '把天气和谷物成熟联系起来想。', explanation: '题目给出的转凉和谷物成熟是秋季常见线索。' },
    { knowledgePointIds: [measure, scene], prompt: '给“石桥、稻田、小鱼”分别找量词，哪组搭配合适？', options: ['一座石桥、一片稻田、一条小鱼', '一艘石桥、一棵稻田、一座小鱼', '一只石桥、一条稻田、一艘小鱼'], hint: '分别考虑桥、田地和鱼的常用量词。', explanation: '“座”可数石桥，“片”可数稻田，“条”可数小鱼。' },
    { knowledgePointIds: [classification, radical], prompt: '同一个词既可以按地点整理，也可以按事物类别整理。该怎样选择？', options: ['根据这次分类要回答的问题来定', '每个词只能有一种特点', '把所有词放在同一类'], hint: '先说清楚这次整理想看地点还是类别。', explanation: '一个词可能有多种特点，分类标准要配合当前目标。' },
    { knowledgePointIds: [expression, scene], prompt: '同伴听不懂“那里很热闹”指哪里。补充哪项最能让介绍具体？', options: ['地点和看到的事物', '自己的名字', '句子的颜色'], hint: '听众需要知道画面发生在哪里。', explanation: '补充地点和具体事物，才能让“热闹”的场景清楚起来。' },
    { knowledgePointIds: [seasons], prompt: '一张农事流程卡要按“作物从种下到收成”的先后摆放。哪一项应放在最前？', options: ['播种', '收获', '插秧'], hint: '先找出开始种植的步骤，不能先收成。', explanation: '播种是开始种植；之后作物继续生长，成熟后才能收获。' },
    { knowledgePointIds: [radical, expression], prompt: '用偏旁帮助认字后，怎样向同学说明自己的判断更完整？', options: ['说出偏旁线索，再用整个词或句子核对', '只报偏旁名称', '不看词语就说答案'], hint: '说明线索，也说明怎样确认。', explanation: '先说偏旁提供的线索，再结合完整词语核对，判断更稳妥。' },
    { knowledgePointIds: [measure, expression], prompt: '“白鹭站在河边”这句话里，哪一部分同时告诉听众数量和事物？', options: ['三只白鹭', '河边', '站在'], hint: '找出数量、量词和事物名称连在一起的部分。', explanation: '“三只白鹭”说明数量和事物，“河边”说明地点。' },
    { knowledgePointIds: [measure, scene, classification], prompt: '小组要给图画加上“桥、柳树、白鹭”的数量标签，哪句话中的量词都搭配正确？', options: ['两座石桥、三棵柳树、四只白鹭', '两只石桥、三座柳树、四棵白鹭', '两棵石桥、三艘柳树、四座白鹭'], hint: '分别想想怎样数桥、树和鸟。', explanation: '石桥常用“座”、柳树常用“棵”、白鹭常用“只”，三个量词都和事物搭配。' },
  ],
  high: [
    { knowledgePointIds: [scene, expression, measure], prompt: '小组要介绍池塘一角，已有“柳树、小船、白鹭”三个词。哪种开头最能帮伙伴进入画面？', options: ['先说池塘边，再用合适量词介绍三样事物', '先说自己最喜欢的颜色', '把三个词语按笔画多少排列'], hint: '先交代场景，再说场景里的事物。', explanation: '地点加上数量和事物名称，能建立清楚的画面。' },
    { knowledgePointIds: [radical, classification, expression], prompt: '一张识字卡把“枫树”归入树木类，理由只写“它带木字旁”。怎样补充得更可靠？', options: ['再核对“枫树”这个完整词确实指一种树', '删掉词语，只保留偏旁', '说所有带木字旁的词都一定是树'], hint: '偏旁能提示，但完整词义要一并检查。', explanation: '结合完整词确认“枫树”指树木，避免把偏旁当成绝对规则。' },
    { knowledgePointIds: [scene, expression], prompt: '伙伴的介绍是“那里有很多东西”，听众仍不知道画面。最有帮助的修改是什么？', options: ['说清地点，并选两三样具体事物和特点', '把“很多”重复几次', '只加上“很好看”'], hint: '地点、事物和可观察的特点能共同组成画面。', explanation: '补充具体地点、事物和特点，信息比笼统感受更清楚。' },
    { knowledgePointIds: [seasons, expression], prompt: '小组要介绍一年的农事卡，卡上有“播种、照料、收获”。怎样让顺序和理由都容易理解？', options: ['按作物生长过程排列，并说明每步观察到的变化', '按词语长短排列，不说明依据', '先写收获，再写播种且不解释'], hint: '顺序要符合从种下到成熟的过程。', explanation: '按生长过程排列，并用变化说明顺序，听众更容易理解。' },
    { knowledgePointIds: [classification, radical], prompt: '词语卡上既有“松树”，也有“麻雀”。如果目标是练习偏旁，怎样整理更贴近目标？', options: ['先找偏旁线索，再核对词义并分组', '只按动物和树木分组，不观察字形', '按卡片颜色分类'], hint: '分类方法要服务“偏旁线索”这个目标。', explanation: '观察偏旁并用词义核对，才能练习识字线索；单按类别不够贴合目标。' },
    { knowledgePointIds: [seasons, expression], prompt: '一段四季介绍里先写秋天收获，再写春天播种。听众想了解农事先后，怎样改更合适？', options: ['按春天播种、后续照料、成熟收获的顺序重新组织', '保留原顺序，只把句子说得更快', '删掉所有季节词'], hint: '先后顺序应对应作物生长的过程。', explanation: '按播种、照料、收获组织，能让农事过程更容易跟上。' },
    { knowledgePointIds: [scene, classification, expression], prompt: '介绍“树林边的田地”时，小组想同时说明地点和事物类别。哪种做法最清楚？', options: ['先标明地点，再把树木、动物和农作物分别列出', '把地点和所有事物混成一串词', '只说“那里什么都有”'], hint: '地点标签与事物类别可以分开整理。', explanation: '先说明地点，再按类别整理事物，听众能看清它们的关系。' },
    { knowledgePointIds: [radical, classification, expression], prompt: '有人认为“一个字带鸟字旁，就一定是鸟名”。怎样回应更准确？', options: ['偏旁可作线索，还要看完整词语的意思', '鸟字旁能决定所有词义', '偏旁完全不能提供线索'], hint: '既不把线索说成绝对规则，也不忽略它的作用。', explanation: '偏旁常能提示字义范围，但判断词义还要结合整个词语。' },
    { knowledgePointIds: [seasons, scene, expression], prompt: '小组要比较同一地点春天和秋天的景象，哪种记录方便看出变化？', options: ['地点保持相同，分别记下季节、植物和天气线索', '每次换地点，只写“很好看”', '只保存秋天的一张图，不记季节'], hint: '比较前后时尽量保留共同地点，并记下变化线索。', explanation: '同一地点的季节、植物和天气记录可以帮助比较景象变化。' },
    { knowledgePointIds: [measure, classification, scene], prompt: '一张词语地图按地点分区，但“柳树”和“白鹭”也需要区分类别。怎样扩展最清楚？', options: ['在每个地点下面再标出树木或动物类别', '把所有卡片移到地图外', '只保留量词，不写事物名称'], hint: '地点和类别是两种不同的整理线索。', explanation: '先保留地点分区，再标注事物类别，可以同时呈现两类信息。' },
    { knowledgePointIds: [seasons, radical, expression], prompt: '卡片记录“谷物成熟，正在收获”。伙伴问“你怎么知道这一幅是秋天？”哪种回答有依据？', options: ['指出卡片上的成熟谷物和收获活动', '只说“大家都这么说”', '只说词语里有一个季节字'], hint: '用卡片上看得到的季节和农事线索支持判断。', explanation: '成熟谷物和收获活动是卡片给出的线索，能支持秋季判断。' },
    { knowledgePointIds: [scene, measure, expression], prompt: '介绍牌要同时写地点、数量和事物。哪句把三类信息都表达出来？', options: ['池塘边停着两艘小船', '有两艘', '池塘边很安静'], hint: '检查句子是否说出了在哪里、有多少、是什么。', explanation: '“池塘边”是地点，“两艘”说明数量，“小船”是事物。' },
    { knowledgePointIds: [seasons, scene, expression], prompt: '四季卡记录“天气转凉，谷物成熟”，并有一栏标出收获活动。季节栏应该怎样补全？', options: ['根据转凉和谷物成熟的线索填写秋天', '只根据地点随便选一个季节', '把收获活动删掉'], hint: '把天气和农事线索放在一起判断。', explanation: '天气转凉、谷物成熟和收获活动共同支持填写秋天。' },
    { knowledgePointIds: [classification, radical, scene, expression], prompt: '伙伴把树木、动物、地点词放在一起展示，观众不易看懂。怎样重排内容更有条理？', options: ['先按地点分区，再在区内标注树木或动物', '按词语笔画多少随意排列', '删掉所有地点词和类别词'], hint: '先选一个主要整理标准，再用另一个标准补充。', explanation: '地点作为主分区，类别作为次级标签，层次更清楚。' },
  ],
};

export const grade2Term1ChineseUnit02SupplementalActivities: Grade2Term1ChineseUnit02SupplementalActivity[] = Object.entries(drafts).flatMap(([difficulty, items]) => (
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
