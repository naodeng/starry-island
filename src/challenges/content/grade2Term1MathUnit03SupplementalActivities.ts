import type { ChoiceActivityDefinition, Difficulty } from '../../content/types';

export interface Grade2Term1MathUnit03SupplementalActivity {
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

const sourceUnitId = 'grade-2/term-1/math/unit-03';
const idPrefix = 'challenge-supplement-grade-2-term-1-math-unit-03';
const parts = 'angle-parts';
const comparison = 'angle-comparison';

const drafts: Record<Difficulty, ActivityDraft[]> = {
  basic: [
    { knowledgePointIds: [parts], prompt: '角的基本组成应该选哪一项？', answer: '一个顶点和两条直边', distractors: ['两个圆心和一条弯线', '三个顶点和两条曲线'], hint: '观察两条边从哪里开始。', explanation: '角有一个顶点和从顶点伸出的两条直边。' },
    { knowledgePointIds: [parts], prompt: '两条边碰到一起的地方，数学上叫什么？', answer: '顶点', distractors: ['圆心', '终点线'], hint: '它是两条边相遇的位置。', explanation: '角的两条边相交的位置叫顶点。' },
    { knowledgePointIds: [parts], prompt: '角的两条边通常是什么样的线？', answer: '直的', distractors: ['弯曲的', '围成圆形的'], hint: '看看课本图形里从同一点伸出的边。', explanation: '角的两条边是直的，弯曲的边不能当作角的边。' },
    { knowledgePointIds: [parts], prompt: '看房间里的物品，哪个位置最容易找到一个角？', answer: '书本封面的方形拐角', distractors: ['圆盘的边缘', '软绳弯成的圆圈'], hint: '寻找两条直边相遇的地方。', explanation: '书本封面的拐角处有两条直边相遇，可以看到角。' },
    { knowledgePointIds: [parts], prompt: '张开的剪刀最容易看到什么几何图形？', answer: '两片刀刃之间形成的角', distractors: ['完整的圆形', '一条没有起点的弧线'], hint: '观察两片直边从连接处向外张开。', explanation: '两片刀刃在连接处相遇并向外张开，形成一个角。' },
    { knowledgePointIds: [parts], prompt: '下面哪处能找到两条直边相遇形成的图形？', answer: '方形纸张的拐角', distractors: ['圆形盘子的弧边', '弯弯的毛线中间'], hint: '观察边是不是直的，并且是否在一点相遇。', explanation: '方形纸张的拐角由两条直边相遇形成。' },
    { knowledgePointIds: [parts], prompt: '观察一个角，哪种特征能帮助分辨它？', answer: '从同一点伸出的两条直边', distractors: ['两条边一定一样长', '两条边一定围成一个圆'], hint: '顶点的位置相同，边向不同方向伸出。', explanation: '角的两条边从同一个顶点伸出，不要求边长相同。' },
    { knowledgePointIds: [comparison], prompt: '三角尺的方形拐角，与它大小相等的角叫什么？', answer: '直角', distractors: ['线段', '圆角'], hint: '它是一个常用的角大小参照。', explanation: '三角尺上的方形角是直角；与它一样大的角也叫直角。' },
    { knowledgePointIds: [comparison], prompt: '把一个角和三角尺方形角对齐后，两边完全重合，说明它们？', answer: '一样大', distractors: ['一个更大', '一个更小'], hint: '两边都重合时，张开的程度相同。', explanation: '顶点和两条边都对齐重合，说明两个角一样大。' },
    { knowledgePointIds: [comparison], prompt: '把顶点和一条边对齐后，另一条边落在方形角里面。它与方形角的大小关系是？', answer: '小于方形角', distractors: ['等于方形角', '大于方形角'], hint: '开口没有方形角那么宽。', explanation: '另一条边落在方形角里面，说明这个角比直角小。' },
    { knowledgePointIds: [comparison], prompt: '同样对齐后，另一条边落在方形角外侧。它与方形角的大小关系是？', answer: '大于方形角', distractors: ['等于方形角', '小于方形角'], hint: '另一条边比参照边张得更开。', explanation: '另一条边落在方形角外侧，说明这个角比直角大。' },
    { knowledgePointIds: [comparison], prompt: '小明只把角的两条边画长，开口没有变化。这个角的大小会？', answer: '保持原来的大小', distractors: ['一定变大', '一定变小'], hint: '比较边之间的张开程度有没有改变。', explanation: '角的大小由两边张开的程度决定，不由边画得多长决定。' },
    { knowledgePointIds: [comparison], prompt: '转动一张角卡片，开口没有改变。卡片上的角会？', answer: '大小不变，只改变方向', distractors: ['一定变大', '一定变小'], hint: '卡片转了方向，两边之间的张开程度仍相同。', explanation: '转动改变了角的朝向，没有改变两边之间的张开程度。' },
    { knowledgePointIds: [comparison], prompt: '想公平地比较两个角，先怎么摆放它们？', answer: '先对齐顶点和一条边，再比较另一条边', distractors: ['只把两条边拉得一样长', '把角放在同一张纸上看面积'], hint: '让两个角使用相同起点和一条共同边。', explanation: '先对齐顶点和一条边，再看另一条边的位置，比较才公平。' },
  ],
  advanced: [
    { knowledgePointIds: [parts, comparison], prompt: '两张角卡片画出的边长不同，怎样确认它们的角是否一样大？', answer: '先对齐顶点和一条边，再比较另一条边', distractors: ['比较哪张卡片上的边更长', '比较卡片谁占的地方更大'], hint: '把两个角放到同一比较位置。', explanation: '对齐顶点和一条边后，观察另一条边的张开位置，不看边长或卡片大小。' },
    { knowledgePointIds: [comparison], prompt: '两个角顶点和一条边对齐后，甲角的另一边在乙角外侧。哪项判断合适？', answer: '外侧的角更大', distractors: ['乙角更大', '两个角一定一样大'], hint: '固定一条边后，另一边张得更开表示角更大。', explanation: '顶点和一条边重合时，另一条边在外侧的角张开得更大。' },
    { knowledgePointIds: [comparison], prompt: '小雨把两个角转了不同方向，边长也不相同，但对齐后开口重合。怎么判断？', answer: '两个角一样大', distractors: ['画得长的角更大', '朝上的角更大'], hint: '只看对齐后的张开程度。', explanation: '方向和边长不同不影响结论；对齐后开口重合说明角一样大。' },
    { knowledgePointIds: [comparison], prompt: '一张角纸片旋转半圈，顶点和两条边仍保持原来的关系。角的大小？', answer: '大小不变，只改变方向', distractors: ['变成原来的两倍', '变成原来的一半'], hint: '旋转没有把两条边靠近或分开。', explanation: '旋转改变朝向，不改变两边之间的张开程度。' },
    { knowledgePointIds: [parts, comparison], prompt: '门打开时，哪项描述能同时指出角的组成？', answer: '门轴相接处是顶点，门和门框方向是两条边', distractors: ['门把手是圆心，门框是圆边', '门和地面组成一条曲线'], hint: '观察门转动的位置，以及门和门框的方向。', explanation: '门轴附近是两边相遇的点，门与门框方向形成两条边和一个角。' },
    { knowledgePointIds: [comparison], prompt: '把某个角与三角尺方形角对齐后，它的另一条边伸到参照边外面。这个角？', answer: '大于方形角', distractors: ['等于方形角', '小于方形角'], hint: '比较另一条边相对共同参照的位置。', explanation: '另一条边在方形角的外侧，表示角比直角大。' },
    { knowledgePointIds: [parts, comparison], prompt: '共同顶点和一条边重合后，甲角的另一条边在乙角外侧。哪项结论正确？', answer: '甲角比乙角大', distractors: ['乙角比甲角大', '两个角一样大'], hint: '对齐一条边后，看另一条边谁更靠外。', explanation: '顶点和一条边重合时，甲角的另一条边在外侧，说明甲角张开得更大。' },
    { knowledgePointIds: [comparison], prompt: '伙伴说“线条更长的角一定更大”，怎样回应更准确？', answer: '比较开口，不看边长', distractors: ['只要画在线上的角都一样大', '把两条边剪短就能让角变小'], hint: '角的大小不是由线段画了多远决定。', explanation: '两边张开程度决定角的大小，边长变化不一定改变角。' },
    { knowledgePointIds: [parts], prompt: '判断角是否由直边组成，下面哪项描述正确？', answer: '两条直边在一个点相遇', distractors: ['一条弯线围成一个圈', '两条曲线相互平行'], hint: '先找边相遇的点，再看边是不是直的。', explanation: '角由两条直边从同一个顶点伸出形成。' },
    { knowledgePointIds: [comparison], prompt: '小组把一个角的边延长，但没有改变边的方向。延长后角的大小怎样？', answer: '大小相同', distractors: ['边越长，角就越大', '边越长，角就越小'], hint: '两条边之间的开口保持不变。', explanation: '延长角边没有改变张开程度，所以角的大小相同。' },
    { knowledgePointIds: [comparison], prompt: '对齐顶点和一条边后，待比较角的另一条边落在方形角以内。它与直角相比？', answer: '小于方形角', distractors: ['等于方形角', '大于方形角'], hint: '另一条边没有张到参照边的位置。', explanation: '另一条边在直角范围内，说明这个角小于直角。' },
    { knowledgePointIds: [parts], prompt: '一个角转到朝左的位置后，仍能指出它的顶点。顶点在哪里？', answer: '两条边相遇的地方', distractors: ['两条边最远的端点', '角旁边的纸张中心'], hint: '无论朝向如何，都找两条边相交的位置。', explanation: '角的顶点始终是两条边相遇的位置，旋转不会改变它的定义。' },
    { knowledgePointIds: [parts], prompt: '想从圆盘边缘找出角，哪项判断更合适？', answer: '圆盘的弯曲边缘', distractors: ['两条直边相遇的位置', '方形拐角'], hint: '圆盘边缘没有两条直边在一点相遇。', explanation: '圆盘的弯曲边缘本身不是由两条直边相遇形成的角。' },
    { knowledgePointIds: [parts, comparison], prompt: '怎样用三角尺帮助比较两个角的张开程度？', answer: '使用同一个方形角作参照并先对齐', distractors: ['用三角尺量角边长度', '只看哪个角画得离纸边更近'], hint: '共同参照能让两次观察更公平。', explanation: '用同一个方形角作参照，再对齐顶点和一条边，可以比较另一条边的位置。' },
  ],
  high: [
    { knowledgePointIds: [parts, comparison], prompt: '小组准备制作角观察卡，哪套记录过程较完整？', answer: '选择安全物品、标出角的组成，再用共同参照比较', distractors: ['只写物品名称和自己猜的大小', '把边画得越长越好，不标明观察依据'], hint: '记录既要说明角在哪里，也要写清如何比较。', explanation: '安全选物、标出顶点与两边，并说明共同参照和比较结果，卡片才便于复核。' },
    { knowledgePointIds: [parts, comparison], prompt: '两个角的边长不同，顶点和一条边对齐后另一边重合。能得出什么结论？', answer: '一样大', distractors: ['边较长的角更大', '边较短的角更小'], hint: '对齐后两边之间的张开程度相同。', explanation: '另一条边重合说明张开程度相同；边长不同不影响角的大小。' },
    { knowledgePointIds: [parts, comparison], prompt: '同一个角画在大纸和小纸上，哪项事实不会随纸张改变？', answer: '纸张大小不会改变角的大小', distractors: ['大纸上的角一定更大', '小纸上的角一定更小'], hint: '比较图形时关注两条边的张开程度。', explanation: '纸张大小和图形占的位置不会改变角的张开程度。' },
    { knowledgePointIds: [parts, comparison], prompt: '两角对齐后，一条边重合，另一条边没有重合。判断大小时重点观察什么？', answer: '另一条边的位置', distractors: ['共同边画出的长度', '两张纸的颜色'], hint: '共同边已经对齐，差异在另一条边。', explanation: '固定顶点和一条边后，另一条边的位置显示开口大小。' },
    { knowledgePointIds: [parts, comparison], prompt: '在教室里做角观察活动，哪种安排更安全也更容易观察？', answer: '选择安全可观察的物品并保持距离', distractors: ['触碰电器内部的边角', '攀到高处观察窗框'], hint: '数学观察要遵守教室里的安全要求。', explanation: '选取桌面上的书本等安全物品观察，不触碰设备或攀爬。' },
    { knowledgePointIds: [parts, comparison], prompt: '一个角对齐方形角后，另一条边落在参照角里面。怎样报告结果？', answer: '小于参照角', distractors: ['大于参照角', '和参照角一样大'], hint: '另一条边张开的程度较小。', explanation: '另一条边落在参照角里面，说明这个角张开得更小。' },
    { knowledgePointIds: [parts, comparison], prompt: '伙伴想复查你的比较结论，记录里至少要说明哪些信息？', answer: '观察对象、对齐方法和另一条边的位置', distractors: ['纸张颜色、姓名和作答时间', '只写最后结论，不写比较过程'], hint: '别人需要知道你怎样摆放并观察两个角。', explanation: '记录对象、对齐方法和另一条边的位置，伙伴才能复现比较过程。' },
    { knowledgePointIds: [parts, comparison], prompt: '角卡片转向了另一边，但两条边之间没有靠近或分开。角发生了什么变化？', answer: '大小不变，只改变朝向', distractors: ['变大了', '变小了'], hint: '方向改变了，开口程度没有改变。', explanation: '旋转只改变角的朝向，不改变角的大小。' },
    { knowledgePointIds: [parts, comparison], prompt: '两角的顶点和一条边对齐后，另一条边也重合。比较结果是什么？', answer: '张开程度相同', distractors: ['左边的角更大', '边更长的角更大'], hint: '两条边都落在相同位置。', explanation: '两角边的位置重合，说明张开程度相同。' },
    { knowledgePointIds: [parts, comparison], prompt: '两个角的边画得长短不同；对齐后，甲角的另一条边比乙角更靠外。应怎样判断？', answer: '角的张开程度更大', distractors: ['甲角因为边长所以更大', '乙角因为边短所以更小'], hint: '依据另一条边的位置，而不是画出的长度。', explanation: '共同边对齐后，甲角的另一条边更靠外，说明甲角张开得更大。' },
    { knowledgePointIds: [parts, comparison], prompt: '一位同学描述角的组成，下面哪项说法正确？', answer: '一个顶点和两条直边', distractors: ['两个顶点和一条弧线', '三条直边围成一个圆'], hint: '从两条边相遇的位置开始观察。', explanation: '一个角由一个顶点和从那里伸出的两条直边组成。' },
    { knowledgePointIds: [parts, comparison], prompt: '看到一段弯弯的彩带，为什么不能只凭它的转弯处说那里有角？', answer: '弯曲边缘没有两条直边相交', distractors: ['角只会出现在三角尺上', '彩带颜色太浅看不清角'], hint: '角的边需要是直边，并从一个顶点伸出。', explanation: '弯曲的边不是两条直边在同一点相交，不能据此认作角。' },
    { knowledgePointIds: [parts, comparison], prompt: '比较两个不同方向的角，哪一步能减少只凭图形朝向造成的误判？', answer: '先对齐顶点和一条边，再比较张开程度', distractors: ['把两个角都转到朝上，不再观察边', '把图形画到同样大小的纸上'], hint: '让两个角有共同的起点和一条边。', explanation: '顶点和一条边对齐后再看另一条边，可以排除朝向带来的干扰。' },
    { knowledgePointIds: [parts, comparison], prompt: '想向伙伴说明一个角比方形角大，哪种证据最清楚？', answer: '用方形角作参照并说明观察到的边的位置', distractors: ['说它看起来更醒目', '把角边继续画长一些'], hint: '用共同参照和另一条边的位置支持判断。', explanation: '说明方形角参照怎样对齐，以及另一条边在哪里，能让伙伴复核结论。' },
  ],
};

export const grade2Term1MathUnit03SupplementalActivities: Grade2Term1MathUnit03SupplementalActivity[] = Object.entries(drafts).flatMap(([difficulty, items]) => (
  items.map((draft, index) => {
    const correctOptionIndex = ((index * 2 + 1) % 3) as 0 | 1 | 2;
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
