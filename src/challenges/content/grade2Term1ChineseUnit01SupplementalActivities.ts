import type { ChoiceActivityDefinition, Difficulty } from '../../content/types';

export interface Grade2Term1ChineseUnit01SupplementalActivity {
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

const sourceUnitId = 'grade-2/term-1/chinese/unit-01';
const idPrefix = 'challenge-supplement-grade-2-term-1-chinese-unit-01';
const growth = 'growth-sequence';
const water = 'water-observation';
const seeds = 'seed-dispersal';
const evidence = 'observation-evidence';

const drafts: Record<Difficulty, ActivityDraft[]> = {
  basic: [
    { knowledgePointIds: [growth, evidence], prompt: '观察记录先写“后腿出现了”，下一次写“前腿也出现了”。哪句话按记录顺序说得对？', options: ['先看到后腿，再看到前腿', '先看到前腿，再看到后腿', '记录没有写先后'], hint: '按两条记录出现的先后读一遍。', explanation: '记录先写后腿出现，后来写前腿出现，所以后腿变化在前。' },
    { knowledgePointIds: [growth, evidence], prompt: '连续两天观察同一只小蝌蚪，今天发现尾巴比昨天短。哪一项是直接看到的？', options: ['今天的尾巴比昨天短', '它一定马上离开水边', '它已经长成了另一种动物'], hint: '直接观察的内容能在记录中找到。', explanation: '尾巴变短是观察到的变化；后两项是没有记录支持的推测。' },
    { knowledgePointIds: [water, evidence], prompt: '早晨和下午都观察同一处小水洼，下午边缘向里缩了。下一次记录哪项最方便比较？', options: ['仍在同一位置、相近时间记下水洼边缘', '换到另一处水洼，只记颜色', '只写“今天很好看”'], hint: '比较变化时尽量保持观察位置和记录方式一致。', explanation: '在同一位置用相近方式记录边缘，才能看清水洼大小的变化。' },
    { knowledgePointIds: [water, evidence], prompt: '观察到窗玻璃靠屋内的一面有小水珠。哪句话只记录了看到的现象？', options: ['玻璃内侧出现了小水珠', '一定是窗外下了大雨', '水珠肯定是有人洒上去的'], hint: '把看到的现象和原因猜想分开。', explanation: '玻璃内侧出现水珠是可直接观察的现象；原因还需要更多线索。' },
    { knowledgePointIds: [seeds, evidence], prompt: '一粒很轻、带细绒毛的种子离开母株后飘了一小段。哪种传播办法最符合这条线索？', options: ['随风移动', '靠果荚弹开', '靠硬壳在地上滚动'], hint: '想想细绒毛和轻轻的种子容易受到什么影响。', explanation: '轻并带绒毛的种子容易被风带动。' },
    { knowledgePointIds: [seeds, evidence], prompt: '一粒种子的小钩子挂在布料上。观察时可以怎样记录这条线索？', options: ['记录种子挂在布料上的位置和样子', '直接写它一定已经发芽', '只记录布料的颜色'], hint: '记录与种子移动有关的可见特点。', explanation: '挂在布料上是直接观察到的线索；是否发芽不能由此确定。' },
  ],
  advanced: [
    { knowledgePointIds: [growth, evidence], prompt: '想比较同一只小蝌蚪这周的变化，哪种记录最能说明成长顺序？', options: ['每天在相近时间记录腿和尾巴的变化', '每次换一只小蝌蚪，只记颜色', '只在最后一天写“长大了”'], hint: '连续记录同一对象的变化，比只写结果更有用。', explanation: '同一只小蝌蚪、相近时间和具体身体变化能帮助整理成长顺序。' },
    { knowledgePointIds: [growth, evidence], prompt: '记录写着“先长出后腿，之后前腿也出现”。要检查这段成长顺序，最有用的材料是什么？', options: ['按日期整理的身体变化记录', '观察当天的天气图案', '水盆的颜色卡'], hint: '核对顺序要看同一对象前后的记录。', explanation: '按日期记录身体变化，能核对后腿和前腿出现的先后。' },
    { knowledgePointIds: [water, evidence], prompt: '想了解阳光下水洼边缘怎样变化，哪种观察安排更方便比较？', options: ['在同一处地面定时标记边缘位置', '每天换不同地点，随意记录', '只在水洼消失后回想大小'], hint: '固定地点和记录时间会让前后记录更可比。', explanation: '固定位置并定时记录边缘位置，便于发现水洼的变化。' },
    { knowledgePointIds: [water, evidence], prompt: '一个透明杯装水后放在窗边，几天后水面变低。要继续观察，先补记哪组信息更有帮助？', options: ['每天相近时间的水面高度和杯子位置', '每次换不同的杯子并不记日期', '只记录杯子的图案'], hint: '让水面变化能和日期、位置对应起来。', explanation: '日期、水面高度和固定位置能帮助比较连续观察结果。' },
    { knowledgePointIds: [water, evidence], prompt: '冷天和暖天的水面变化可能不同。要比较两天的记录，哪项做法更合适？', options: ['用同一个容器、相同水量并记录每天情况', '两天使用不同容器且不记录水量', '只挑变化最大的一天来讲'], hint: '比较前先尽量保持容器和起始条件一致。', explanation: '相同容器和起始水量能减少无关差异，逐日记录才能比较。' },
    { knowledgePointIds: [seeds, evidence], prompt: '要看看带绒毛和表面光滑的两种种子哪种更容易被风带动，怎样试比较公平？', options: ['用相近大小的种子，在同一地点和同一阵风中观察', '一种种子放在室内，另一种放在室外', '每种只观察一次且不记下位置'], hint: '比较时让地点和风的条件尽量相同。', explanation: '相同地点和风的条件便于比较种子特点与移动情况。' },
    { knowledgePointIds: [seeds, evidence], prompt: '想检查带钩种子是否容易挂住布料，哪种记录更有依据？', options: ['让种子轻轻经过同一块布料并记下是否挂住', '把种子放在桌上，只猜它会不会挂住', '换不同布料但不记录用的是哪块'], hint: '把要比较的材料和观察结果都记下来。', explanation: '使用同一块布料并记录种子是否挂住，能直接检查这条线索。' },
    { knowledgePointIds: [seeds, evidence], prompt: '观察到干燥的果荚裂开，附近出现几粒种子。下一次怎样记录能帮助核对传播线索？', options: ['记下果荚状态和种子出现的位置', '只记果荚是什么颜色', '直接写种子已经长成新植物'], hint: '把果荚变化和种子落点联系起来记录。', explanation: '果荚状态与周围种子位置能帮助核对种子是否从果荚散出。' },
    { knowledgePointIds: [growth, water, evidence], prompt: '伙伴说“小蝌蚪尾巴变短是因为天气变暖”。现有记录只有尾巴变化，下一步怎样更稳妥？', options: ['继续记录天气和身体变化，再比较前后线索', '马上把原因写成肯定结论', '删掉尾巴变化的记录'], hint: '现有记录说明变化，原因还需要其他线索。', explanation: '同时记录天气与身体变化，才有材料比较原因；当前证据不足以确定因果。' },
    { knowledgePointIds: [water, seeds, evidence], prompt: '想看看雨后地面变干时，落在地上的轻种子位置有没有变化。哪项安排最清楚？', options: ['在固定小区域标记种子位置，并记录天气和观察时间', '每次换一块地，只记种子颜色', '等几天后只凭记忆说位置变了'], hint: '位置、天气和时间都应能在记录中找到。', explanation: '固定区域并记录天气和时间，能帮助核对种子位置是否改变。' },
    { knowledgePointIds: [growth, water, seeds, evidence], prompt: '同组同学记录了小蝌蚪、雨后水洼和种子移动。整理汇报时怎样避免把猜想说成事实？', options: ['先列可见记录，再单独写出需要继续验证的猜想', '把所有猜想都改成确定事实', '只保留自己喜欢的那条记录'], hint: '把观察到的内容和还要验证的想法分开。', explanation: '先呈现可见记录，再标出待验证猜想，表达更准确。' },
    { knowledgePointIds: [water, seeds, evidence], prompt: '雨后两次观察都看到水洼边缘向里缩，种子落点没有变化。哪项表述符合现有记录？', options: ['这两次水洼变小，种子位置未变', '水洼变小一定把种子带走了', '所有雨后的种子都会移动'], hint: '逐项对照两次记录，不添加没有看到的变化。', explanation: '只能报告水洼边缘变化和种子位置未变，记录不支持种子被水带走。' },
    { knowledgePointIds: [seeds, evidence], prompt: '要比较同一种子的落点在有风和无风时是否不同，哪项计划更清楚？', options: ['固定种子的起点和观察区域，分别记录风况与落点', '每次换不同种子和地点，不记录风况', '只挑落得最远的一粒说明'], hint: '保持起点与区域一致，并记下要比较的风况。', explanation: '固定种子起点和区域、分别记录风况和落点，才便于比较。' },
    { knowledgePointIds: [growth, evidence], prompt: '要说明小蝌蚪的腿先后怎样变化，哪组记录最能支持结论？', options: ['同一只小蝌蚪按日期记录后腿、前腿和尾巴变化', '不同小蝌蚪各拍一张但不写日期', '只写最后看到的样子'], hint: '结论涉及先后，需要连续且可排序的记录。', explanation: '同一对象的日期记录能排列身体变化顺序。' },
  ],
  high: [
    { knowledgePointIds: [growth, evidence], prompt: '两张成长记录卡的日期不同，一张只写“长大了”，另一张画出腿和尾巴的变化。要比较顺序应先做什么？', options: ['按日期排列并查看具体身体变化', '只比较两张卡的颜色', '先认定内容较多的卡一定正确'], hint: '时间和具体观察内容都能帮助核对顺序。', explanation: '按日期排列并比较身体变化，才能用记录检查成长顺序。' },
    { knowledgePointIds: [growth, water, evidence], prompt: '一周内观察小蝌蚪和水洼，伙伴认为水洼变小与小蝌蚪变化有关。怎样核对这项猜想？', options: ['分别连续记录两种变化，再检查它们是否同时出现', '只看某一天并直接认定有关', '停止记录其中一种变化'], hint: '两种变化都要有连续记录，才有材料比较。', explanation: '分别记录两种变化再比较时间，才能检查是否有联系；同时发生也不自动证明原因。' },
    { knowledgePointIds: [water, evidence], prompt: '两处水洼大小不同，想比较阳光照射后各自的变化，哪项做法更可靠？', options: ['分别记录起始大小、观察时刻和之后的边缘位置', '只记录较小的一处并推断另一处', '每天改变观察时刻且不记起始情况'], hint: '比较不同对象时要记录起点和共同的观察条件。', explanation: '记录起始大小、时刻和后续边缘位置，才能按证据比较变化。' },
    { knowledgePointIds: [water, evidence], prompt: '透明杯里的水面下降，但记录没有写杯子是否被移动。哪项结论目前最稳妥？', options: ['只确认水面位置变了，原因还需继续核对', '水一定全部变成了云', '一定有人喝掉了一部分'], hint: '记录没有说明的事情不能当作已知原因。', explanation: '可以确认水面变化，但缺少杯子是否移动等信息，不能确定原因。' },
    { knowledgePointIds: [seeds, evidence], prompt: '两种种子在同一阵风里移动距离不同。要判断种子特点是否相关，还应补充什么记录？', options: ['种子的形状、起始位置和移动后的落点', '观察者喜欢哪一种种子', '只记风的颜色'], hint: '把种子特征和移动结果都留下来。', explanation: '种子特征、起点和落点能支持比较；喜好不能说明移动原因。' },
    { knowledgePointIds: [seeds, evidence], prompt: '带钩种子挂在衣袖上。要向伙伴说明它可能怎样移动，哪组证据最直接？', options: ['记录钩子与布料接触的位置，并说明是在轻轻经过时挂住的', '只说“种子会飞很远”', '只记录衣袖的图案'], hint: '让伙伴能看到支持推测的具体线索。', explanation: '接触位置和挂住的过程能支持“可能随衣物移动”的推测。' },
    { knowledgePointIds: [seeds, growth, evidence], prompt: '小组想观察种子落地后是否发芽，并比较不同种子。哪项记录计划更完整？', options: ['标记每粒种子的位置，并定期记下是否出现芽', '只挑发芽的一粒，忘记其他种子', '每天换位置又不记录日期'], hint: '比较需要明确对象、位置和连续记录。', explanation: '标记位置并定期记录每粒种子的变化，才能比较观察结果。' },
    { knowledgePointIds: [water, seeds, evidence], prompt: '雨后两天种子的位置看起来变了，但小组没有画下第一天的位置。怎样改进下一次观察？', options: ['先画好种子起始位置，并在相同区域再次记录', '只在最后一天写“移动了”', '把不同区域的种子混在一起'], hint: '比较移动前后需要保留起点。', explanation: '先记录起始位置，再在同一区域复查，才知道位置是否改变。' },
    { knowledgePointIds: [growth, water, seeds, evidence], prompt: '观察卡同时记录天气、水洼和种子，但日期漏写了。哪项修订最能帮助比较变化？', options: ['补上每次观察的日期和时间', '只补上卡片颜色', '把不同日期的记录合并成一句'], hint: '变化过程需要能看出记录先后。', explanation: '日期和时间能帮助还原先后，也便于比较天气、水洼和种子的记录。' },
    { knowledgePointIds: [growth, evidence], prompt: '一条结论说“小蝌蚪先长后腿，后长前腿”，但只附了最后一张照片。还缺什么证据？', options: ['能按时间查看的中间阶段记录', '更多关于照片边框颜色的说明', '观察者的姓名列表'], hint: '要证明先后，就要看过程中的记录。', explanation: '一张最后的照片看不出先后，需要补充中间阶段的时间记录。' },
    { knowledgePointIds: [water, evidence], prompt: '同学说“下午的水洼一定比早晨小”，只有一天的记录。怎样让结论更谨慎？', options: ['说明这一天观察到的结果，并继续记录更多日期', '把“一天”改成“每天”', '删去早晨的记录'], hint: '一次观察不能直接代表所有日子。', explanation: '应先报告这一天的观察，并增加记录后再判断是否常见。' },
    { knowledgePointIds: [seeds, water, evidence], prompt: '小组比较风大和风小的时候种子移动情况，却在不同地点观察。要让结论更可靠，先改哪项？', options: ['尽量使用同一地点和相似起点，再记录风的情况', '继续换地点，但不记种子落点', '只选择移动最远的一次'], hint: '比较风的影响时，地点和起点也会带来差异。', explanation: '固定地点和起点、记录风况及落点，才能更好比较风的影响。' },
    { knowledgePointIds: [growth, water, seeds, evidence], prompt: '汇报时一项观察与原猜想不一致。怎样处理最有依据？', options: ['保留这条记录，说明它和原猜想不同，并提出后续核对办法', '删掉不一致的记录', '把记录改成符合猜想的样子'], hint: '真实记录能帮助修正猜想。', explanation: '保留不一致的记录并继续核对，结论才是根据证据形成的。' },
    { knowledgePointIds: [growth, water, seeds, evidence], prompt: '伙伴想用一张观察卡同时研究小蝌蚪、水洼和种子。怎样让记录仍然清楚？', options: ['分设对象、条件、日期和观察结果栏目', '把所有结果写成一句话', '只记录最有趣的对象'], hint: '不同对象的记录要能分别找到。', explanation: '分设栏目能区分对象、条件、时间和结果，减少信息混在一起。' },
  ],
};

export const grade2Term1ChineseUnit01SupplementalActivities: Grade2Term1ChineseUnit01SupplementalActivity[] = Object.entries(drafts).flatMap(([difficulty, items]) => (
  items.map((draft, index) => {
    const correctOptionIndex = (index % 3) as 0 | 1 | 2;
    const options = [...draft.options.slice(correctOptionIndex), ...draft.options.slice(0, correctOptionIndex)];
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
