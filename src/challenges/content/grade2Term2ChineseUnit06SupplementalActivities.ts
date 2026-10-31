import type { ChoiceActivityDefinition, Difficulty } from '../../content/types';

export interface Grade2Term2ChineseUnit06SupplementalActivity {
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

const sourceUnitId = 'grade-2/term-2/chinese/unit-06';
const idPrefix = 'challenge-supplement-grade-2-term-2-chinese-unit-06';
const weather = 'weather-sequence-observation';
const forecast = 'observation-vs-forecast';
const direction = 'natural-direction-cues';
const safety = 'safe-navigation-and-help-seeking';
const space = 'space-environment-adaptation';

export const grade2Term2ChineseUnit06CoreKnowledgePointIds = [
  weather,
  forecast,
  direction,
  safety,
  space,
] as const;

const drafts: Record<Difficulty, ActivityDraft[]> = {
  basic: [
    { knowledgePointIds: [weather], prompt: '观察一份天气记录：“午后乌云变厚，操场的风也变大。”哪项是已经观察到的现象？', answer: '乌云变厚，风变大', distractors: ['傍晚一定会下雨', '明天整天都不会出太阳'], hint: '选择已经看到或感受到的现象，不选对未来的判断。', explanation: '乌云变厚、风变大是当时记录到的现象；傍晚和明天的天气说法都是对未来的预测。' },
    { knowledgePointIds: [weather, forecast], prompt: '记录里先写了下午的天空变化，再把晚间天气记作一种预测。哪一项属于预测？', answer: '明晚可能有雨', distractors: ['下午看到乌云增多', '记录写下观察发生的时间'], hint: '天气预报说的是之后可能发生的情况。', explanation: '“明晚可能有雨”是针对未来的预测；乌云增多和记录时间属于已经观察或记录的内容。' },
    { knowledgePointIds: [weather], prompt: '一次雷雨观察中，哪种顺序更符合天气变化？', answer: '乌云聚拢，雨点落下，雨停后地面留下水迹', distractors: ['地面先有水迹，接着乌云消失，最后才下雨', '雨停后先出现乌云，随后才听到雨前的风声'], hint: '按雨前、雨中、雨后的时间顺序想一想。', explanation: '先有雨前的天空变化，再下雨，雨后才会看到地面水迹。' },
    { knowledgePointIds: [weather, forecast], prompt: '哪句话是在记录已经发生的天气现象？', answer: '窗外的雨点落在地面上', distractors: ['明天一定会下整天的雨', '所有地方很快都会变成晴天'], hint: '找已经看见或听见的事情，不选未来的判断。', explanation: '雨点落地是当下能观察到的现象；另外两句是对未来或其他地方的预测。' },
    { knowledgePointIds: [weather, safety], prompt: '雷雨时想观察天气，哪种做法更安全？', answer: '留在室内安全的位置，并听从成人安排', distractors: ['站到空旷高处看闪电', '躲在孤立的大树下继续观察'], hint: '雷雨时不要到空旷处或孤立的大树旁。', explanation: '在室内安全位置并听从成人指导，能避开雷雨带来的危险。' },
    { knowledgePointIds: [weather, forecast], prompt: '看到乌云变多，怎样把观察和天气猜想写在一起？', answer: '我看到乌云变多，猜想可能要下雨', distractors: ['乌云变多，所以每个地方一定马上下雨', '我已经知道明天整天的天气'], hint: '先写看见什么，再用“可能”说明猜想。', explanation: '乌云变多是观察线索，“可能要下雨”是有依据但还不确定的猜想。' },
    { knowledgePointIds: [weather], prompt: '雨停后想知道水洼是否变小，怎样观察更合适？', answer: '留在安全处，隔一段时间再记录水洼边缘', distractors: ['走到车道上踩水，看水有多深', '只凭记忆猜它有没有变化'], hint: '比较前后变化时，要再次观察并注意安全。', explanation: '在安全处再次记录边缘，能比较水洼的变化，不必踩水或靠近车道。' },
    { knowledgePointIds: [direction, safety], prompt: '在不熟悉的路线辨认方向，哪种做法更可靠？', answer: '对照地图方向标记，并请成人确认路线', distractors: ['只凭一次风吹来的方向决定路线', '离开同伴，朝看起来最短的路走'], hint: '用地图线索并让可信任的成人知道路线。', explanation: '地图标记能提供方位线索，成人确认可帮助儿童安全选择路线。' },
    { knowledgePointIds: [direction, safety], prompt: '晴朗的夜晚，哪项自然线索可以帮助了解北方的大致方向？', answer: '观察北极星所在的大致方位', distractors: ['观察一扇窗户的颜色', '听附近汽车声音的大小'], hint: '想想夜空中哪颗星常被用作方向线索。', explanation: '北极星能提供北方的大致方向线索；实际出行还要结合地图和成人指导。' },
    { knowledgePointIds: [safety, direction], prompt: '儿童在户外发现自己不确定路线，先做什么更安全？', answer: '停在安全地点，联系老师、家长或同行成人', distractors: ['独自往更深处继续寻找', '攀到高处走近路'], hint: '不确定时先停下，不要一个人继续冒险。', explanation: '停在安全处并联系可信任的成人，比盲目继续走更稳妥。' },
    { knowledgePointIds: [direction], prompt: '把地图和指南针用于路线判断时，哪种做法更清楚？', answer: '先看地图上的方向标记，再按说明使用指南针', distractors: ['不看地图标记，只转动指南针几次', '把地图上下随意翻转，直到出现熟悉的图形'], hint: '工具需要按标记和说明使用。', explanation: '地图方向标记和正确使用的指南针能提供可对照的方向信息。' },
    { knowledgePointIds: [space], prompt: '太空环境中物品容易飘动，哪种办法更适合整理用品？', answer: '把用品固定在指定位置，用完后放回去', distractors: ['把用品随手抛到舱内另一边', '不收拾工具，让它们自由飘动'], hint: '想想怎样避免用品飘走或找不到。', explanation: '固定和归位能让物品不容易飘走，也方便再次使用。' },
    { knowledgePointIds: [space, forecast], prompt: '哪句话是在描述太空生活中可以观察到的现象？', answer: '没有固定好的小物品可能会飘动', distractors: ['所有人在太空里都会长出翅膀', '太空里的每件物品都自己发光'], hint: '选符合特殊环境生活现象、而不是故事想象的说法。', explanation: '物品容易飘动是太空生活需要适应的现象；另外两句是没有依据的想象。' },
    { knowledgePointIds: [space], prompt: '想了解太空中怎样使用饮水用品，哪个来源更适合优先查阅？', answer: '可靠的航天科普读物或教育资料', distractors: ['没有说明来源的传言', '只听一个未经核实的猜测'], hint: '查找能说明资料来源、内容经过核对的介绍。', explanation: '可靠科普资料比无来源的传言更适合帮助了解太空生活。' },
  ],
  advanced: [
    { knowledgePointIds: [weather, forecast], prompt: '想比较一场雷雨前后的天气变化，怎样记录更便于回看？', answer: '写下同一地点的时间和现象，并按雨前、雨中、雨后排列', distractors: ['只记下最喜欢的一种天气，不写时间和地点', '每次换一个地点，再把记录当成同一处变化'], hint: '留下观察条件，再按发生顺序整理。', explanation: '同一地点、时间和阶段记录能帮助读者比较天气变化。' },
    { knowledgePointIds: [direction, safety, forecast], prompt: '走到路标附近后，地图和现场指示看起来不一致。下一步怎样做？', answer: '先停在安全位置，把差异告诉成人并一起核对路线', distractors: ['猜一条路继续走，之后再说', '不看现场指示，只跟着陌生人离开'], hint: '发现线索不一致时，先不要盲目前进。', explanation: '停下并让成人协助核对地图和现场指示，能减少走错路线的风险。' },
    { knowledgePointIds: [weather, forecast], prompt: '两天都记录到乌云变多，但只有一天后来下雨。怎样总结更准确？', answer: '乌云变多是观察到的线索，但不能单凭它确定每次都会下雨', distractors: ['只要有乌云，每个地方一定都会下雨', '那天没有下雨，说明记录的乌云不是真的'], hint: '比较记录时，别把一种线索说成必然结果。', explanation: '乌云可以作为天气变化的线索，但单凭它不能确定所有地方都会下雨。' },
    { knowledgePointIds: [direction, safety], prompt: '夜间云层遮住星星，儿童又不确定方向，哪种做法更稳妥？', answer: '留在安全地点，和成人一起查看地图或使用指南针', distractors: ['独自走向记得的大致方向', '离开队伍去寻找更亮的地方'], hint: '自然线索看不清时，使用工具并请成人协助。', explanation: '停留安全处并让成人协助使用地图或指南针，比独自寻找路线更安全。' },
    { knowledgePointIds: [direction, forecast, safety], prompt: '晴朗夜晚看到北极星，但地图显示的路线仍不清楚。怎样继续判断？', answer: '把星空线索与地图一起核对，并向同行成人确认', distractors: ['只凭星星直接走，不再看地图', '因为有星星就认为附近没有危险'], hint: '一个自然线索不能代替路线和安全信息。', explanation: '北极星提供方向线索，地图和成人确认还能帮助判断具体路线和安全情况。' },
    { knowledgePointIds: [space, forecast], prompt: '太空环境中小物品容易飘动，哪种安排最能回应这个现象？', answer: '用固定装置收好用品，并在使用后放回原处', distractors: ['把用品放在舱内中央，任它移动', '把用品越分散越好，避免互相碰到'], hint: '生活办法要解决用品飘动和寻找困难。', explanation: '固定并归位能减少用品飘走，也让需要时更容易找到。' },
    { knowledgePointIds: [space], prompt: '一篇太空生活介绍提到物品会飘动，哪种补充最能说明这是环境适应办法？', answer: '说明固定用品能减少飘动，方便宇航员安全使用', distractors: ['说物品飘动是因为它们会自己选择方向', '把生活办法写成太空里不需要整理'], hint: '把环境现象和对应的生活办法连起来。', explanation: '说明固定用品怎样帮助使用，能把现象和适应方法联系起来。' },
    { knowledgePointIds: [weather, forecast], prompt: '观察表写着“午后乌云变厚，傍晚必定会下雨”，怎样修改更准确？', answer: '我观察到午后乌云变厚，猜想傍晚可能下雨', distractors: ['只要乌云变厚，所有地方傍晚一定下雨', '乌云变厚是预测，傍晚下雨是观察'], hint: '先保留观察到的线索，再用表示不确定的词说明预测。', explanation: '乌云变厚是观察到的线索，但不能据此断定所有地方一定下雨；“可能”能更准确地表达预测。' },
    { knowledgePointIds: [safety, direction], prompt: '天气转坏时，户外活动小组还没有走到集合点。怎样安排更安全？', answer: '听从带队成人安排，停在安全位置并按计划联系集合', distractors: ['每个人分头寻找最快的路', '为了赶时间穿过没有确认的区域'], hint: '天气变化时，先遵守带队约定和安全指引。', explanation: '听从带队成人并停在安全处，能避免分散或进入未确认的区域。' },
    { knowledgePointIds: [space], prompt: '太空生活说明卡只写了“束带、收纳袋”，怎样补充能解释使用目的？', answer: '写清固定用品能减少飘动，使用后归位更方便', distractors: ['写成物品会自己选择要去的地方', '说明太空里不需要整理用品'], hint: '把生活环境、收纳办法和作用连起来。', explanation: '说明固定用品能减少飘动、方便再次找到，能解释太空生活中整理物品的作用。' },
    { knowledgePointIds: [weather, forecast], prompt: '想判断雨停后地面积水是否减少，哪种比较更可靠？', answer: '在安全地点、相近位置隔一段时间再观察并记录', distractors: ['只看一次水洼，再猜它之后的变化', '第一次在路边看，第二次到另一个街区比较'], hint: '让前后观察的位置相近，并留下时间信息。', explanation: '相近位置的重复观察能帮助比较水洼变化，避免把不同地点当成同一处。' },
    { knowledgePointIds: [direction], prompt: '同伴说某颗星能指方向，但你不确定是哪颗。怎样核实更合适？', answer: '查看可靠的星空图或请成人一起确认，再与地图对照', distractors: ['选最亮的星就认定它是方向标志', '不核实就把这条说法告诉其他人'], hint: '不确定的自然线索可以先查证。', explanation: '可靠星图、成人协助和地图对照能减少认错星或路线的可能。' },
    { knowledgePointIds: [weather, forecast], prompt: '记录里写“乌云变多，可能会下雨”。哪部分是观察，哪部分是推测？', answer: '“乌云变多”是观察，“可能会下雨”是推测', distractors: ['两部分都是已经发生的事实', '两部分都和观察没有关系'], hint: '看看哪部分已经看到，哪部分是在判断接下来。', explanation: '乌云变多是已经观察到的现象，是否下雨仍是对之后的推测。' },
    { knowledgePointIds: [weather, forecast], prompt: '把当天观察与次日预报放进一份天气记录，哪种标注最清楚？', answer: '分别标出观察的时间地点与预测内容，并说明预测尚未发生', distractors: ['把预报写成已经观察到的事实', '只写“明天一定下雨”，不说明依据'], hint: '把已发生的观察和对未来的预测分别标清。', explanation: '标出观察条件和预测时间，并说明预报不是已发生的事实，读者就能分辨两类信息。' },
  ],
  high: [
    { knowledgePointIds: [weather, forecast, safety], prompt: '小组要做一张雷雨观察卡，怎样安排才能同时记录变化和提醒安全？', answer: '写明时间地点，按雨前、雨中、雨后记现象，并加上安全观察方法', distractors: ['只写明天一定会怎样，不记录今天看到什么', '请同学到空旷处观察闪电，再把结果填上'], hint: '观察卡需要记录条件、天气顺序和安全做法。', explanation: '时间地点和天气阶段帮助回看变化，安全方法能避免为了观察而冒险。' },
    { knowledgePointIds: [direction, safety, forecast], prompt: '自然探索小组要走一段不熟悉的路线，哪份计划更完整？', answer: '先和成人看地图、确认集合点，沿约定路线结伴行走并及时报告变化', distractors: ['每个人自由选择方向，最后再找同伴', '只记住一条听来的近路，不准备求助办法'], hint: '路线、集合点、结伴和联系办法都要提前商量。', explanation: '提前核对路线并约定集合和联系，能帮助小组安全活动。' },
    { knowledgePointIds: [space], prompt: '想介绍太空中物品容易飘动的现象，怎样安排说明最清楚？', answer: '先说观察到的现象，再介绍固定用品的办法和它的作用', distractors: ['先写想象故事，再说那就是宇航员的真实经历', '只列用品名称，不说明环境和使用办法'], hint: '把环境现象、生活办法和作用连起来。', explanation: '现象、办法和作用相互连接，读者能理解太空生活怎样适应环境。' },
    { knowledgePointIds: [weather, forecast], prompt: '两份雷雨记录来自不同时间和地点，想比较天气变化应先做什么？', answer: '标清时间地点，再找出可以直接对照的现象', distractors: ['不看观察条件，直接判断哪一天的天气更差', '把两份记录合在一起，不区分来源'], hint: '比较之前先看记录条件是否相近。', explanation: '时间地点不同会影响观察结果，标清条件后再比较更有依据。' },
    { knowledgePointIds: [direction, safety], prompt: '户外活动时自然方向线索被云遮住，手机地图也无法确认位置。下一步怎样处理？', answer: '停在安全地点，联系带队成人并按约定等待帮助', distractors: ['离开队伍到更远处寻找信号', '随意选择一个方向继续走'], hint: '线索不足时不要独自扩大搜索范围。', explanation: '停在安全处并联系带队成人，能让团队更容易确认位置并帮助你。' },
    { knowledgePointIds: [direction, safety], prompt: '郊外活动时，原定路线被临时围挡挡住，地图上也无法确认绕行路线，怎样安排？', answer: '先停在安全地点，联系成人确认替代路线并按约定行动', distractors: ['离开队伍自行寻找能绕过去的小路', '不告诉同伴，随便选一条路继续走'], hint: '路线信息不清时先停下，和同行成人一起确认。', explanation: '停在安全地点并联系成人，能让团队一起核对替代路线，避免独自走入未确认区域。' },
    { knowledgePointIds: [weather, safety], prompt: '小组计划连续观察雷雨，哪种安排更适合儿童？', answer: '在成人安排的室内安全位置记录，并在天气平稳后再观察室外变化', distractors: ['雷雨最强时站到窗边近距离看闪电', '冒雨跑到低洼处测量积水'], hint: '持续观察不等于要靠近危险天气或积水。', explanation: '按成人安排在安全地点记录，天气平稳后再看室外变化，兼顾观察和安全。' },
    { knowledgePointIds: [forecast], prompt: '有人写“看到乌云就能确定所有地区都会下雨”。怎样修改更准确？', answer: '写成“我观察到乌云变多，这可能是天气变化的线索”', distractors: ['保留“所有地区一定下雨”的说法', '删除观察记录，只写自己喜欢晴天'], hint: '保留观察线索，但不要把它扩大成确定结论。', explanation: '乌云是天气线索，不足以确定所有地区都会下雨；使用“可能”更准确。' },
    { knowledgePointIds: [space, forecast], prompt: '制作太空生活插图时，想让读者分清事实和创作，哪种标注更好？', answer: '标明哪些内容来自科普资料，哪些是自己设计的画面', distractors: ['把所有装饰都说成真实设备', '不作说明，让读者把想象当成事实'], hint: '资料和创作可以同时出现，但要标清来源。', explanation: '标清资料内容和个人创作，既能发挥想象也不误导读者。' },
    { knowledgePointIds: [space, safety], prompt: '小组想演示太空中用品容易飘动，哪种课堂做法更合适？', answer: '用轻软道具在桌面演示，并按老师要求收好物品', distractors: ['把重物抛向同学，模拟物品飘动', '把工具随手放到高处让它掉下来'], hint: '演示要使用安全道具，并听从老师安排。', explanation: '轻软道具和整理步骤能表现现象，也避免抛掷或掉落物品伤到同学。' },
    { knowledgePointIds: [direction, safety], prompt: '指南写了地图路线和北极星线索，但没有说明遇到不确定时怎么办。补哪条最重要？', answer: '停在安全位置，联系同行成人并等待确认路线', distractors: ['继续走到更远处寻找更多星星', '遇到分岔时任选一条路线'], hint: '方向线索不确定时，先有安全的求助办法。', explanation: '停下并联系成人能防止儿童因猜测路线而独自走远。' },
    { knowledgePointIds: [weather, forecast], prompt: '连续观察几次后，发现自己的天气猜想不总是正确。怎样改进记录？', answer: '保留每次观察和猜想，回看哪些线索支持或不支持判断', distractors: ['删掉猜错的记录，只留下猜对的', '以后不再记录天气变化'], hint: '包括不符合猜想的结果，才能检查判断方法。', explanation: '保留完整记录能帮助比较线索和结果，改进下一次判断。' },
    { knowledgePointIds: [direction, safety], prompt: '活动路线上的自然标记和地图信息看起来不同，怎样处理最稳妥？', answer: '先留在安全处，向带队成人说明差异并一起核对资料', distractors: ['只相信自己先看到的标记，立刻改变路线', '不告诉同伴，独自去确认另一条路'], hint: '记录差异、停下并让成人一起核对。', explanation: '说明差异并共同核对，比独自改变路线更安全可靠。' },
    { knowledgePointIds: [weather, forecast], prompt: '天气展板要同时呈现今天的观察和明天的预报，怎样写不易混淆？', answer: '分别标出观察的时间地点与预测内容，并说明预测尚未发生', distractors: ['把预报写成已经观察到的事实', '只写“明天一定下雨”，不说明依据'], hint: '把已发生的观察和对未来的预测分别标清。', explanation: '标出观察条件和预测时间，并说明预报不是已发生的事实，读者就能分辨两类信息。' },
  ],
};

export const grade2Term2ChineseUnit06SupplementalActivities: Grade2Term2ChineseUnit06SupplementalActivity[] = Object.entries(drafts).flatMap(([difficulty, items]) => (
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
