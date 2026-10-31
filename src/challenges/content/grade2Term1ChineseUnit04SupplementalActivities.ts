import type { ChoiceActivityDefinition, Difficulty } from '../../content/types';

export interface Grade2Term1ChineseUnit04SupplementalActivity {
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

const sourceUnitId = 'grade-2/term-1/chinese/unit-04';
const idPrefix = 'challenge-supplement-grade-2-term-1-chinese-unit-04';
const location = 'landscape-location-and-features';
const imagination = 'observation-and-imagination';
const travel = 'travel-order-and-description';
const regional = 'regional-products-and-hospitality';
const organization = 'landscape-information-organization';

const drafts: Record<Difficulty, ActivityDraft[]> = {
  basic: [
    { knowledgePointIds: [location], prompt: '介绍一处风景时，先告诉听众什么最能帮他们找到位置？', answer: '先说清风景在哪里', distractors: ['先说自己最喜欢什么颜色', '先说今天是星期几'], hint: '想想听众最先需要知道哪条地点信息。', explanation: '先说清风景所在的位置，听众才容易跟着介绍想象画面。' },
    { knowledgePointIds: [imagination], prompt: '看到一块有尖角的石头，想把观察和想象说清楚，怎样表达更合适？', answer: '先记录看见的石头外形，再说它像什么', distractors: ['说石头一定会变成小动物', '不观察石头就直接给它起名字'], hint: '把眼睛看到的和脑海想到的分开说。', explanation: '先说明石头的实际外形，再用“像”表达联想，能分清观察和想象。' },
    { knowledgePointIds: [organization], prompt: '制作一张风景介绍卡，哪种安排能让听众更容易听懂？', answer: '地点、主要景物、一个细节、自己的发现', distractors: ['自己的发现、无关事情、地点、景物', '只写“很美”，不说地点和景物'], hint: '先帮助听众找到地方，再带他们看景物。', explanation: '从地点到景物和细节，再分享发现，信息有顺序也更具体。' },
    { knowledgePointIds: [imagination], prompt: '哪句话是在记录湖边直接看到的景象？', answer: '湖面有波纹', distractors: ['湖面像一面会跳舞的镜子', '湖里的小鱼正在开音乐会'], hint: '找一找哪句话只说看见的现象，没有加入联想。', explanation: '“湖面有波纹”描述可以直接观察到的现象，另外两句加入了想象。' },
    { knowledgePointIds: [location], prompt: '想看清石头表面的纹路，站在哪个位置观察更合适？', answer: '近处', distractors: ['很远的山顶', '只看地图上的符号'], hint: '细小的纹路需要从能看清的位置观察。', explanation: '靠近石头观察，比较容易发现表面纹路和形状细节。' },
    { knowledgePointIds: [organization, location], prompt: '要记录山峰和湖的位置关系，哪种办法更清楚？', answer: '先画出山峰和湖的位置，再标上关键词', distractors: ['只写“景色很美”，不画也不标', '把词语随意写在纸的边角'], hint: '图画可以表现位置，词语可以补充特点。', explanation: '示意图保留景物的位置关系，关键词补充景物特点，记录会更清楚。' },
    { knowledgePointIds: [imagination], prompt: '哪句话既说明看见的线索，也把联想说成自己的想法？', answer: '我看见石头有尖角，它让我想到一只小鸟', distractors: ['这块石头肯定就是一只小鸟', '每个人看到这块石头都会想到小鸟'], hint: '看一看哪句话先说观察，再用自己的联想来表达。', explanation: '“看见石头有尖角”是观察，“让我想到”表示这是个人联想，不是石头变成了小鸟。' },
    { knowledgePointIds: [travel, location], prompt: '向朋友介绍一个地方，开头怎样安排更合适？', answer: '先说地点，再介绍那里的一种景物或物产', distractors: ['先说结束时的感受，再猜朋友住在哪里', '先列出所有喜欢的颜色，不说介绍地点'], hint: '先让朋友知道你要介绍哪里。', explanation: '先点明地点，再选择相关景物或物产，介绍对象就清楚了。' },
    { knowledgePointIds: [regional], prompt: '介绍《葡萄沟》提到的地方物产，哪句话更具体？', answer: '当地种着许多葡萄，成熟后果实香甜', distractors: ['那里有很多好东西', '果园很热闹，却没说种着什么'], hint: '说出物产名称，再补充一个能帮助了解它的特点。', explanation: '说出葡萄和成熟后的特点，听众就能知道当地物产是什么样。' },
    { knowledgePointIds: [travel, organization], prompt: '游览路线是“湖边—果园—村口”，怎样介绍顺序最清楚？', answer: '先到湖边，再沿小路走到果园，最后介绍村口', distractors: ['先说村口，再说湖边，最后不提果园', '只说三个地点名称，不说明先后'], hint: '让听众听到每一处地点是怎样接上的。', explanation: '按实际游览先后介绍并用顺序词连接，听众更容易跟上路线。' },
    { knowledgePointIds: [location, organization], prompt: '“湖面映着远处的山”主要是在介绍哪类信息？', answer: '景色', distractors: ['当地物产', '待客交流'], hint: '想想这句话说的是风景、东西，还是人与人的交流。', explanation: '湖面和远山组成风景画面，这句话主要介绍景色。' },
    { knowledgePointIds: [travel], prompt: '哪组词语能帮助听众听懂游览地点的先后？', answer: '先到、接着来到、最后看到', distractors: ['红色、圆圆的、很甜', '昨天、蓝色、三只'], hint: '找一找表示先后顺序和地点变化的词。', explanation: '“先到、接着来到、最后看到”能清楚标出路线顺序。' },
    { knowledgePointIds: [regional], prompt: '同学介绍了当地的水果，怎样回应更友好，也能继续了解？', answer: '我听到你说葡萄沟的葡萄很甜，我还想知道当地人怎样照料葡萄', distractors: ['葡萄沟的葡萄很好吃。', '我喜欢苹果，你猜我最喜欢哪一种？'], hint: '先回应听到的信息，再提出一个和介绍内容有关的问题。', explanation: '先复述对方分享的葡萄信息，再提出相关问题，交流会更具体。' },
    { knowledgePointIds: [organization, regional], prompt: '一段地方介绍怎样安排开头、主体和结尾？', answer: '开头点明地点，主体介绍景物、物产和待客情况，结尾分享感受或邀请交流', distractors: ['开头点明地点，主体只说“很美”，结尾换成无关话题', '先说个人感受，再跳过地点和主要内容，突然结束'], hint: '从介绍对象开始，想想中间要讲什么，最后怎样自然收束。', explanation: '开头点题，主体提供景物和地方特点，结尾用感受或邀请收束，介绍才完整。' },
  ],
  advanced: [
    { knowledgePointIds: [location, organization], prompt: '介绍稿只有“这里很美”，怎样修改能让画面更清楚？', answer: '补充具体景物和它的一处特点', distractors: ['多写几个感叹号，不增加信息', '换成一个和地点无关的动物名字'], hint: '让听众知道哪里有什么、看起来怎样。', explanation: '具体的景物和特点能把笼统感受变成可以想象的画面。' },
    { knowledgePointIds: [regional], prompt: '介绍《葡萄沟》的葡萄颜色丰富时，哪个词最贴切？', answer: '五光十色', distractors: ['隐隐约约', '一望无边'], hint: '想一想哪个词能表示颜色多样、明亮鲜艳。', explanation: '“五光十色”能形容颜色丰富鲜艳，适合介绍葡萄的多种颜色。' },
    { knowledgePointIds: [imagination, organization], prompt: '怎样区分下列两种表达：“看见石面有弯弯纹路”“纹路让我想到一条小路”？', answer: '看到石面有弯弯纹路→观察依据；纹路让我想到一条小路→想象表达；湖面有几圈波纹→观察依据；波纹像轻轻荡开的圆环→想象表达', distractors: ['四句话都是想象，因为都在介绍风景', '四句话都是事实，因为都和风景有关'], hint: '判断句子是在说看见的线索，还是由线索想到的画面。', explanation: '纹路和波纹是可以观察的线索；“让我想到”和“像”表达的是联想。' },
    { knowledgePointIds: [organization], prompt: '一段风景描写想从整体写到细节，哪种顺序更清楚？', answer: '说明大致地点 → 描写主要景物轮廓 → 补充近处的一处细节 → 说出自己注意到的变化', distractors: ['先说细小纹路 → 再猜地点 → 插入无关事情 → 结束', '先说结论 → 重复结论 → 不介绍景物'], hint: '从大画面开始，再带听众观察更细的地方。', explanation: '先定位和介绍整体，再补充局部与发现，描述层次清楚。' },
    { knowledgePointIds: [imagination], prompt: '同一地点早晚看起来颜色不同，记录时怎样做便于比较？', answer: '标记观察时间再比较', distractors: ['任选一张当作唯一正确的样子', '不记时间，只凭记忆说变化'], hint: '除了地点，还要记下可能影响画面的条件。', explanation: '记录时间后再比较，能看出同一地点在不同时间的变化。' },
    { knowledgePointIds: [travel], prompt: '介绍卡要回答“在哪里、看起来怎样、怎样继续游览”，怎样配信息？', answer: '地点→在哪里；特点→看起来怎样；路线词→怎样继续游览', distractors: ['地点→有多少；特点→谁来做客；路线词→是什么颜色', '地点→结束感受；特点→怎样到达；路线词→物产名称'], hint: '把信息和听众可能提出的问题一一对应。', explanation: '地点、特点和路线词分别帮助听众定位、想象和跟上游览顺序。' },
    { knowledgePointIds: [imagination], prompt: '介绍石头像小兔后，伙伴仍看不出为什么。加哪句话最能补足观察依据？', answer: '石头上方有两个尖尖的凸起，我把它们想成兔耳', distractors: ['这块石头就是兔子，它一定会动', '每个人都应该看出那是兔耳'], hint: '描述能观察到的外形，再用“我把它想成”表达联想。', explanation: '两个凸起是可见的外形线索，后半句说明兔耳是个人联想。' },
    { knowledgePointIds: [organization], prompt: '风景分享后，伙伴提出的问题提醒你路线不清楚。接下来怎样修改？', answer: '听伙伴提出的问题 → 检查地点和顺序 → 补充观察细节 → 再次分享', distractors: ['不听问题，直接重复原稿', '删掉所有地点和景物，只留下结尾'], hint: '先利用反馈找到不清楚的地方，再有针对性地调整。', explanation: '听反馈、检查顺序、补充信息并再次分享，可以让介绍更容易理解。' },
    { knowledgePointIds: [imagination], prompt: '看到湖面有波纹，哪句话把观察和想象连接得更清楚？', answer: '我看见湖面有波纹，像一圈圈圆环', distractors: ['湖面一定是一个圆形', '我没看见湖面，却知道它在跳舞'], hint: '先说明实际看到的线索，再表达“像什么”。', explanation: '先交代波纹这一观察，再用“像”提出联想，表达更有依据。' },
    { knowledgePointIds: [location, imagination], prompt: '把观察记录配上合理的描写，哪组连接都恰当？', answer: '山石表面有尖角→外形；湖水映出岸边树木→倒影；葡萄串挨在一起→排列', distractors: ['山石表面有尖角→味道；湖水映出树木→路线；葡萄串挨在一起→天气', '山石表面有尖角→问候；湖水映出树木→物产；葡萄串挨在一起→人物动作'], hint: '找每条观察最直接说明的景物特点。', explanation: '尖角是外形，水面映出树木是倒影，果实挨在一起说明排列。' },
    { knowledgePointIds: [imagination, organization], prompt: '同学们观察同一块奇石，有人想到小兔，有人想到小鸟。怎样把两种说法记录得准确又尊重不同想法？', answer: '分别写下各自看到的轮廓线索，并注明“有人想到……”，不要求大家想成一样', distractors: ['只保留多数人的联想，删掉其他观察', '把小兔和小鸟都说成石头真实会变成的动物'], hint: '先记录看得见的线索，再标清是谁的想法。', explanation: '不同人可以有不同联想，分别记录线索和想法能避免把个人感觉当成事实。' },
    { knowledgePointIds: [imagination, organization], prompt: '准备介绍一处山水，怎样把观察和想象说得有条理？', answer: '先说看见的景物，再说明它让自己想到什么', distractors: ['只说想象，不交代看到的景物', '把联想说成大家都确认的事实'], hint: '让听众听出事实线索和联想之间的关系。', explanation: '先交代观察，再说明联想，能让想象有线索并保持表达准确。' },
    { knowledgePointIds: [travel, regional], prompt: '介绍湖区游览时，哪种内容安排更完整？', answer: '先介绍湖区，再按游览顺序说岸边景物和当地物产', distractors: ['只列物产名称，不说地点和路线', '先讲结尾，再跳到无关的颜色和数字'], hint: '让地点、游览顺序和地方特点连起来。', explanation: '先点明地点，再按路线介绍景物与物产，听众更容易了解这个地方。' },
    { knowledgePointIds: [location, organization], prompt: '同一段介绍同时出现“湖边”“水面有波纹”“波纹像圆环”，怎样整理？', answer: '地点“湖边”；特点“水面有波纹”；联想“波纹像圆环”', distractors: ['地点“波纹像圆环”；特点“湖边”；联想“水面有波纹”', '三项都归为地点，不再区分'], hint: '分清在哪里、观察到什么、由此想到什么。', explanation: '湖边是地点，波纹是观察到的特点，像圆环是由观察产生的联想。' },
  ],
  high: [
    { knowledgePointIds: [travel, location, regional], prompt: '设计一条给伙伴参观的山水路线，怎样组织介绍更容易跟随？', answer: '先说路线和地点，再介绍沿途景物、特点与物产', distractors: ['先介绍结尾感受，再随机列出景物和物产', '只写景物名称，不标地点也不说顺序'], hint: '让伙伴知道从哪里出发、沿途看什么。', explanation: '地点和路线帮助定位，沿途景物、特点和物产补足介绍内容。' },
    { knowledgePointIds: [organization, imagination], prompt: '虚构地图上既有湖边小桥，也有“像月亮的山洞”这个想象。怎样标注更清楚？', answer: '标出湖边的实际景物，并把“像……”的想象单独标明', distractors: ['把想象的山洞标成现实中一定存在的地点', '删掉地图上的地点和说明，让伙伴自己猜'], hint: '地图上的实际位置和创意联想可以分别说明。', explanation: '实际景物提供地图依据，想象内容要说明是创意，伙伴就不会混淆。' },
    { knowledgePointIds: [travel, organization], prompt: '小导游要带伙伴依次参观入口、山石、湖边，怎样安排介绍顺序？', answer: '先标清起点和路线，再按游览顺序介绍景物', distractors: ['从湖边开始，之后跳回入口，再随意说山石', '按景物名称笔画多少排序，不说明路线'], hint: '地图路线和口头介绍要对应同一顺序。', explanation: '先标起点和路线，再依次介绍景物，听众能一边看图一边跟随。' },
    { knowledgePointIds: [organization, location], prompt: '导览句子有“从入口沿小路到湖边”“湖边有石桥”“我觉得这里很宁静”，怎样分类？', answer: '位置→从入口沿小路到湖边；景物→湖边有石桥；感受→我觉得这里很宁静', distractors: ['位置→我觉得很宁静；景物→从入口沿小路；感受→湖边有石桥', '三句都归为景物，不再区分'], hint: '分清路线位置、眼前事物和个人感受。', explanation: '第一句说明位置路线，第二句介绍具体景物，第三句表达个人感受。' },
    { knowledgePointIds: [organization, location], prompt: '伙伴没看懂地图里的一个符号，怎样修改最有帮助？', answer: '给符号加上容易理解的图例，并在地图上保持相同用法', distractors: ['再加几个没有说明的新符号', '把图例删掉，只让伙伴猜'], hint: '符号要有说明，地图中的用法也要一致。', explanation: '清楚的图例和一致的符号能帮助伙伴读懂地图。' },
    { knowledgePointIds: [regional, travel], prompt: '设计一处待客点，怎样把地方介绍和友好交流都照顾到？', answer: '先说明所在地点和当地物产，再用礼貌的话邀请伙伴了解', distractors: ['只说“快来”，不说明地点和介绍内容', '替伙伴决定他一定喜欢哪种物产'], hint: '先让伙伴知道这里有什么，再留出友好交流的空间。', explanation: '地点和物产帮助了解地方，礼貌邀请让伙伴可以选择并继续交流。' },
    { knowledgePointIds: [imagination], prompt: '介绍虚构山水时，怎样表达能让伙伴分清观察和创意？', answer: '把亲眼看到的景物和想象出来的地点分别标注', distractors: ['把想象中的所有景物都说成亲眼见过', '不说哪些内容是创意，让伙伴自行判断'], hint: '清楚交代真实观察，也给创意内容作说明。', explanation: '分别说明实际观察与想象内容，介绍仍然可以有创意，也不会造成误解。' },
    { knowledgePointIds: [organization, travel], prompt: '讲解词把地点、景物、感受混在一句里，怎样整理更清楚？', answer: '先交代地点和路线，再介绍景物，最后分享感受', distractors: ['先说感受，再省略地点和景物', '重复说“很好看”，不补充路线'], hint: '听众需要先定位，再看景物，最后听个人感受。', explanation: '按照地点路线、景物、感受的顺序组织，信息层次更清楚。' },
    { knowledgePointIds: [location, organization], prompt: '介绍一块山石的观察路线，怎样安排能让伙伴一步步看懂？', answer: '先交代在哪儿，再按位置和外形介绍石头，最后说明自己的联想', distractors: ['先说联想，再不说明石头在哪儿或长什么样', '只讲一串形状词，不说它们对应石头哪里'], hint: '让地点、可见外形和想象之间有清楚的顺序。', explanation: '先定位，再介绍观察到的外形，最后说明联想，伙伴就能跟上描述。' },
    { knowledgePointIds: [regional, organization], prompt: '介绍站展示景点和地方物产，怎样让每类信息都清楚？', answer: '把景点信息和地方物产分开列出，并分别写明具体特点', distractors: ['只说“这里很棒”，不提任何景物或物产', '把物产当成景物位置，不作说明'], hint: '给不同内容分好类，再补充各自的特点。', explanation: '把景点和物产分开整理并写明特点，听众更容易了解当地特色。' },
    { knowledgePointIds: [travel], prompt: '介绍站的地图要让第一次来的人不迷路，先补充什么？', answer: '先说明地点和路线，再补充沿途景物的特点', distractors: ['只标结尾景点，不标出发位置', '添加与路线无关的颜色和装饰'], hint: '读图者要先知道从哪里走、沿途有什么。', explanation: '地点和路线支持读者移动，沿途景物特点补充画面信息。' },
    { knowledgePointIds: [imagination], prompt: '石面有弯曲纹路，有人觉得像一条河。怎样把这段描述说完整？', answer: '把观察到的纹路和由纹路想到的画面分别说清楚', distractors: ['只说“有一条河”，不说明它是石头纹路', '说纹路会变成真的河流'], hint: '先给出观察线索，再说明联想到的画面。', explanation: '说清纹路是实际观察，把河流标成联想，表达准确又有画面。' },
    { knowledgePointIds: [travel, organization], prompt: '地图标了路线和景点说明，伙伴边走边看时却找不到它们的对应位置，怎样改进？', answer: '给路线拐点和景点使用相同编号，并在图例中说明对应关系', distractors: ['把所有路线和景点说明都删掉', '把景点说明随意放在地图外，不作标记'], hint: '让地图上的地点和文字说明能互相找到。', explanation: '路线拐点和景点采用对应编号，读图者更容易把位置与说明配起来。' },
    { knowledgePointIds: [imagination, organization], prompt: '伙伴听完风景介绍后还有问题，交流时怎样回应更合适？', answer: '先听完介绍，再复述听到的信息，并提出具体问题', distractors: ['打断介绍，直接说对方肯定错了', '不回应内容，只换成自己的话题'], hint: '先确认听懂了什么，再提出想了解的内容。', explanation: '听完、复述再提问，既尊重分享者，也能让交流聚焦。' },
  ],
};

export const grade2Term1ChineseUnit04SupplementalActivities: Grade2Term1ChineseUnit04SupplementalActivity[] = Object.entries(drafts).flatMap(([difficulty, items]) => (
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
