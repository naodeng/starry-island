import type { ChoiceActivityDefinition, Difficulty } from '../../content/types';

export interface Grade2Term1MathUnit01SupplementalActivity {
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

const sourceUnitId = 'grade-2/term-1/math/unit-01';
const idPrefix = 'challenge-supplement-grade-2-term-1-math-unit-01';
const units = 'length-units';
const measurement = 'measurement-and-estimation';

const drafts: Record<Difficulty, ActivityDraft[]> = {
  basic: [
    { knowledgePointIds: [units], prompt: '一本练习册的长边，记录长度时选哪个单位更合适？', answer: '厘米', distractors: ['米', '千米'], hint: '练习册是拿在手里的物品。', explanation: '练习册的边比较短，用厘米记录更合适。' },
    { knowledgePointIds: [units], prompt: '从教室走到操场要走一段较长的路，长度通常用什么单位记录？', answer: '米', distractors: ['厘米', '毫米'], hint: '较长的距离不适合用很小的单位逐个表示。', explanation: '教室到操场的路比较长，通常用米记录。' },
    { knowledgePointIds: [units], prompt: '一条6米长的绳子换成厘米记录，应该写多少厘米？', answer: '600厘米', distractors: ['60厘米', '106厘米'], hint: '每1米有100厘米。', explanation: '6个100厘米是600厘米。' },
    { knowledgePointIds: [units], prompt: '小木条长95厘米，另一根长1米，哪根更长？', answer: '1米长的木条', distractors: ['95厘米长的木条', '两根一样长'], hint: '先把1米换成厘米再比较。', explanation: '1米是100厘米，100厘米比95厘米长。' },
    { knowledgePointIds: [measurement], prompt: '尺子的起点对着4，终点对着10，刻度间隔有多少格？', answer: '6格', distractors: ['10格', '14格'], hint: '从终点刻度中减去起点刻度。', explanation: '10减4等于6，刻度间隔是6格。' },
    { knowledgePointIds: [measurement], prompt: '哪句话正确描述线段？', answer: '线段是直的，有两个端点', distractors: ['线段弯弯的，没有端点', '线段可以向一边一直延长'], hint: '观察它是不是直的，以及两头是否固定。', explanation: '线段是直的，两个端点都固定。' },
    { knowledgePointIds: [measurement], prompt: '没有用尺子，只看着窗台和桌子的高度差不多，这是估测。怎样记录更准确？', answer: '窗台高度约和桌子差不多', distractors: ['窗台高度肯定和桌子完全一样', '窗台高度是桌子的两倍'], hint: '没有实际读刻度时，不要把估计说成精确结果。', explanation: '估计应使用“约”等词，并避免说成已经精确量过。' },
    { knowledgePointIds: [measurement], prompt: '尺子的起点在3，终点在11，物体跨过几个刻度间隔？', answer: '8个', distractors: ['11个', '14个'], hint: '用终点数字减去起点数字。', explanation: '11减3等于8，物体跨过8个刻度间隔。' },
    { knowledgePointIds: [units], prompt: '一根绳子长1米30厘米，换成厘米是多少？', answer: '130厘米', distractors: ['103厘米', '30厘米'], hint: '先把1米换成厘米，再加上30厘米。', explanation: '1米是100厘米，100加30等于130厘米。' },
    { knowledgePointIds: [measurement], prompt: '小乐用眼睛估测彩带长度，没有读尺子刻度。哪种说法更合适？', answer: '彩带大约有这么长', distractors: ['彩带精确长这么多', '彩带一定刚好长这么多'], hint: '估测和直接测量的记录方式不同。', explanation: '没有读刻度时，用“大约”说明这是估测。' },
    { knowledgePointIds: [units, measurement], prompt: '小明写下“桌面宽60”，怎样补充才能让长度记录完整？', answer: '在60后写上厘米或米等合适单位', distractors: ['只写“很宽”', '把数字60删掉'], hint: '长度记录除了数值，还要说明使用的单位。', explanation: '写上合适的单位，别人才能知道60表示多长。' },
    { knowledgePointIds: [measurement], prompt: '直尺的起点刻度是2，终点刻度是9，读出的间隔是多少？', answer: '7格', distractors: ['9格', '11格'], hint: '长度看两端相隔多少，不只看终点数字。', explanation: '9减2等于7，起点到终点相隔7格。' },
    { knowledgePointIds: [units], prompt: '下面哪种长度用厘米表示比较合适？', answer: '一块橡皮的长边', distractors: ['学校操场的一圈', '两座城市之间的路程'], hint: '把物品的长短和单位大小放在一起想。', explanation: '橡皮较短，用厘米表示；更长的距离适合用米或更大的单位。' },
    { knowledgePointIds: [measurement], prompt: '判断一条线段的长度时，最需要看清什么？', answer: '线段两端分别对应的刻度', distractors: ['尺子的颜色', '线段旁边物品的名称'], hint: '长度由线段的两个端点确定。', explanation: '观察两端对应的刻度，才能判断线段跨过多少间隔。' },
    { knowledgePointIds: [units], prompt: '把95厘米、1米和1米20厘米按从短到长排列，哪项正确？', answer: '95厘米、1米、1米20厘米', distractors: ['1米、95厘米、1米20厘米', '1米20厘米、1米、95厘米'], hint: '先把米和厘米统一后再比较。', explanation: '1米是100厘米，1米20厘米是120厘米，所以顺序是95、100、120厘米。' },
    { knowledgePointIds: [units, measurement], prompt: '小组用一张约20厘米长的卡片作参照，估测蜡笔长度也差不多。怎样记录更准确？', answer: '蜡笔长约20厘米', distractors: ['蜡笔精确长20厘米', '蜡笔长约20米'], hint: '和参照物比较得到的是估测，不是尺子读数。', explanation: '用“约”表示估测，并选用适合短物品的厘米单位。' },
    { knowledgePointIds: [units, measurement], prompt: '尺子上的物体起点在2厘米刻度，终点在9厘米刻度。实际长度是多少？', answer: '7厘米', distractors: ['9厘米', '11厘米'], hint: '用终点刻度减去起点刻度。', explanation: '9减2等于7，物体长7厘米。' },
  ],
  advanced: [
    { knowledgePointIds: [units, measurement], prompt: '小组估计课桌长约1米，随后用尺子量出98厘米。怎样记录这两种结果？', answer: '估测约1米，测量结果98厘米', distractors: ['两种结果都写成精确的1米', '只保留估测，不记录尺子读数'], hint: '把估测和读刻度得到的结果分别写清。', explanation: '估测用“约”表示；直接测量记录尺子读出的98厘米。' },
    { knowledgePointIds: [units], prompt: '彩纸的测量结果是1米20厘米，包装带是115厘米。哪一个更长？', answer: '彩纸更长', distractors: ['包装带更长', '两者一样长'], hint: '把两种长度都换成厘米再比较。', explanation: '1米20厘米是120厘米，120厘米比115厘米长。' },
    { knowledgePointIds: [units], prompt: '两段纸带分别长45厘米和38厘米，合起来是多少厘米？', answer: '83厘米', distractors: ['73厘米', '813厘米'], hint: '两段长度单位相同，可以把数值相加。', explanation: '45加38等于83，两段合长83厘米。' },
    { knowledgePointIds: [units], prompt: '一根1米长的绳子剪去35厘米，剩下多少厘米？', answer: '65厘米', distractors: ['75厘米', '135厘米'], hint: '先把1米换成厘米，再减去剪掉的长度。', explanation: '1米是100厘米，100减35等于65厘米。' },
    { knowledgePointIds: [measurement], prompt: '尺子从刻度5开始对准物体一端，另一端在刻度14。物体跨过多少格？', answer: '9格', distractors: ['14格', '19格'], hint: '不能把终点刻度直接当作长度。', explanation: '14减5等于9，物体跨过9格。' },
    { knowledgePointIds: [units, measurement], prompt: '同一段木条的估测是约80厘米，尺子从0量到76厘米。哪项判断合适？', answer: '两种结果接近，估测不必和读数完全相同', distractors: ['估测不等于读数，所以一定量错了', '木条长度应写成80米'], hint: '估测是大致判断，尺子读数更具体。', explanation: '约80厘米与76厘米相近，估测和精确读数可以有少量差别。' },
    { knowledgePointIds: [units], prompt: '一条彩带长1米，另一条长95厘米。哪条更长？相差多少厘米？', answer: '1米长的彩带更长，长5厘米', distractors: ['95厘米长的彩带更长，长5厘米', '1米长的彩带更长，长15厘米'], hint: '先把1米换成100厘米，再比较两条彩带。', explanation: '1米是100厘米，100减95等于5厘米，所以1米长的彩带更长，长5厘米。' },
    { knowledgePointIds: [measurement], prompt: '同一根铅笔两次读数不同，复测前先检查哪一项？', answer: '铅笔是否从尺子的同一刻度起量', distractors: ['铅笔的颜色是否相同', '记录纸是不是更换了'], hint: '先核对两次测量的方法是否一致。', explanation: '起点不一致会让读数无法直接比较，应先对齐测量起点。' },
    { knowledgePointIds: [units, measurement], prompt: '小组的长度记录只写操场边长“约20”，这条记录还缺什么信息？', answer: '合适的长度单位', distractors: ['再写一个不同的数字', '把“约”字删掉'], hint: '数字本身不能说明表示厘米还是米。', explanation: '补上米等合适单位，读者才知道估测长度的大小。' },
    { knowledgePointIds: [measurement], prompt: '一条线段在直尺上从刻度2到刻度8，怎样算它的长度格数？', answer: '用8减2', distractors: ['用8加2', '只读终点8'], hint: '长度是两端刻度的差。', explanation: '线段跨过的格数等于终点刻度减去起点刻度。' },
    { knowledgePointIds: [units], prompt: '一根绳子长1米，另一根长88厘米。两根相差多少厘米？', answer: '12厘米', distractors: ['22厘米', '188厘米'], hint: '先把1米换成厘米，再求相差。', explanation: '1米是100厘米，100减88等于12厘米。' },
    { knowledgePointIds: [units, measurement], prompt: '记录书架高度时，小组先估约1米，再从0刻度量到97厘米。怎样解释这组数据？', answer: '估测和尺子读数接近，可同时保留并注明各自方法', distractors: ['把估测改成精确的97米', '只保留估测并说尺子无用'], hint: '数据要和得到它的方法对应。', explanation: '估测约1米与读数97厘米相近，分别注明方法更清楚。' },
    { knowledgePointIds: [measurement], prompt: '尺子没有从0刻度开始，记录员只抄下终点数字。还需要怎样处理？', answer: '再读起点，并用终点减去起点', distractors: ['把终点数字直接记作长度', '把起点和终点相加'], hint: '读数要考虑物体从哪个刻度开始。', explanation: '起点不是0时，要用终点减起点求出实际长度。' },
    { knowledgePointIds: [units], prompt: '一条彩带长1米25厘米，另一条长140厘米。哪条更长？', answer: '140厘米长的彩带', distractors: ['1米25厘米长的彩带', '两条一样长'], hint: '先把1米25厘米换成厘米。', explanation: '1米25厘米是125厘米，140厘米更长。' },
    { knowledgePointIds: [units, measurement], prompt: '长度记录显示一段绳子长1米40厘米，另一段长150厘米。两段相差多少厘米？', answer: '10厘米', distractors: ['50厘米', '110厘米'], hint: '把两段长度统一成厘米后再比较。', explanation: '1米40厘米是140厘米，150减140等于10厘米。' },
  ],
  high: [
    { knowledgePointIds: [units, measurement], prompt: '两组测同一张桌子，一组估约1米，另一组从尺子0刻度量到96厘米。怎样汇报最清楚？', answer: '分别说明估测和读数方法，并保留两项结果', distractors: ['把两项结果平均后说成精确长度', '只保留较大的结果，不说明方法'], hint: '先区分数据来自估计还是直接读刻度。', explanation: '说明方法和结果，才能看懂两组数据为什么略有差别。' },
    { knowledgePointIds: [units, measurement], prompt: '小组要比较课桌和门的高度，怎样设计记录表并统一测量方法？', answer: '每次写明对象、数值和单位，并用同一方法测量', distractors: ['只写数值，不写测量对象和单位', '测桌子用厘米，测门时不记录单位'], hint: '比较前要让记录的信息和测量方法一致。', explanation: '对象、数值、单位都记录清楚，并统一方法，数据才便于比较。' },
    { knowledgePointIds: [units], prompt: '一段绳子长2米，剪去75厘米后剩下多少厘米？', answer: '125厘米', distractors: ['175厘米', '275厘米'], hint: '把2米换成厘米后再减。', explanation: '2米是200厘米，200减75等于125厘米。' },
    { knowledgePointIds: [units, measurement], prompt: '小组记录同一条线段分别为7厘米和8厘米，复核刻度时发现第二次起点偏了一格。下一步怎样做？', answer: '重新对准同一端点和起点后再读数', distractors: ['把7和8相加作为线段长度', '任选一个结果并停止检查'], hint: '先让测量条件一致，再比较结果。', explanation: '起点偏移会改变读数，应统一端点和起点后重新测量。' },
    { knowledgePointIds: [measurement], prompt: '计划用直尺测量一张长桌的长度，桌边超过短尺长度。哪种做法更可靠？', answer: '沿直线分段量，记录每段后再合并长度', distractors: ['把短尺斜着放到桌边另一端', '只凭目测写下一个精确数值'], hint: '尺子不够长时，要保持方向和衔接一致。', explanation: '分段沿桌边测量并合并各段，能避免斜放或纯估测的偏差。' },
    { knowledgePointIds: [units], prompt: '小组的测量结果是一根木条长1米18厘米，另一根长126厘米。相差多少厘米？', answer: '8厘米', distractors: ['108厘米', '44厘米'], hint: '先把两根木条的长度都用厘米表示。', explanation: '1米18厘米是118厘米，126减118等于8厘米。' },
    { knowledgePointIds: [units, measurement], prompt: '想核对课桌估测长度约100厘米是否接近实际长度，哪组测量记录最有用？', answer: '估测值、尺子读数和各自使用的方法', distractors: ['只记最后一个数字，不写怎么得到', '只记物品名称和颜色'], hint: '比较结果前要知道每个数是怎样得来的。', explanation: '保留估测、读数和方法，才能判断两种结果是否接近。' },
    { knowledgePointIds: [units, measurement], prompt: '测量走廊后，两组的长度记录都写“约18”，但没有写单位。怎样补做最合理？', answer: '核实原记录使用的单位，再补记单位和估测依据', distractors: ['默认两组都用了厘米', '把数字改成18米并称为精确测量'], hint: '不能根据数字猜测原来的单位。', explanation: '先核对原始记录，才能准确补充单位和估测依据。' },
    { knowledgePointIds: [units, measurement], prompt: '一根丝带从尺子4厘米刻度量到16厘米，另一根从0刻度量到11厘米。哪根更长？', answer: '从4到16的丝带更长', distractors: ['从0到11的丝带更长', '两根一样长'], hint: '分别用终点刻度减起点刻度。', explanation: '第一根跨12厘米，第二根跨11厘米；第一根更长。' },
    { knowledgePointIds: [units, measurement], prompt: '要让另一位同学复查你的线段测量结果，记录中至少应保留什么？', answer: '线段两端位置、起点刻度和读出的长度单位', distractors: ['只写“量好了”', '只写尺子的颜色和使用者姓名'], hint: '复查需要能还原测量起点、终点和单位的信息。', explanation: '记录端点、起点刻度、读数和单位，别人才能复核。' },
    { knowledgePointIds: [units], prompt: '纸带A长1米5厘米，纸带B长105厘米。根据换算能得出什么？', answer: '两条纸带一样长', distractors: ['纸带A长5厘米', '纸带B比纸带A长100厘米'], hint: '把1米换成100厘米，再加上5厘米。', explanation: '1米5厘米是105厘米，两条纸带一样长。' },
    { knowledgePointIds: [units, measurement], prompt: '同学说“这段线段长10”，但图上起点在刻度3、终点在刻度10。怎样纠正？', answer: '相隔7格，并补上合适单位', distractors: ['长度是13格', '终点数字就是长度，不用看起点'], hint: '先用终点减去起点，再写单位。', explanation: '10减3等于7，线段跨7格；长度记录还应注明单位。' },
    { knowledgePointIds: [units, measurement], prompt: '小组计划分别估测和测量花坛边长，哪种流程更方便比较结果？', answer: '先记估测，再统一起点和单位读数，最后比较', distractors: ['先随意测一段，再把估测当作答案', '只讨论谁估得快，不记录结果'], hint: '把两种方法的结果分开记录后再比较。', explanation: '先分开记录估测和测量结果，统一单位后再比较更清楚。' },
    { knowledgePointIds: [units, measurement], prompt: '长桌从0刻度量得120厘米，分成两段再量得50厘米和70厘米。哪项核对正确？', answer: '两段合长120厘米，与整段读数一致', distractors: ['两段合长20厘米，与整段不同', '三次数字相加后才是桌长'], hint: '先把两段的读数相加，再和整段测量比较。', explanation: '50加70等于120厘米，分段结果与整段读数一致。' },
    { knowledgePointIds: [units], prompt: '小明把1米5厘米写成15厘米。哪项检查能说明这个记录有误？', answer: '1米是100厘米，合起来应是105厘米', distractors: ['1米只等于10厘米，所以15厘米正确', '厘米比米大，因此只写5厘米'], hint: '把米换成100厘米后再加上剩余厘米数。', explanation: '1米等于100厘米，100加5是105厘米，不是15厘米。' },
    { knowledgePointIds: [units, measurement], prompt: '两组测量同一段桌边，结果一个是82厘米、一个是约80厘米。怎样判断是否需要复测？', answer: '核对是否使用相同起点和方法，再看差异是否能由估测解释', distractors: ['只保留较大的数字，不查看方法', '把两个数字相加作为桌边长度'], hint: '比较前先区分直接读数和估测，并核对测量条件。', explanation: '82厘米与约80厘米接近；核对方法后再决定是否复测，比直接丢掉其中一个结果更合理。' },
  ],
};

export const grade2Term1MathUnit01SupplementalActivities: Grade2Term1MathUnit01SupplementalActivity[] = Object.entries(drafts).flatMap(([difficulty, items]) => (
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
