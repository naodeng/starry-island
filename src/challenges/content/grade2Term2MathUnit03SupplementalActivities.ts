import type { ChoiceActivityDefinition, Difficulty } from '../../content/types';

export interface Grade2Term2MathUnit03SupplementalActivity {
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

const sourceUnitId = 'grade-2/term-2/math/unit-03';
const idPrefix = 'challenge-supplement-grade-2-term-2-math-unit-03';
const symmetry = 'axis-symmetry-and-symmetry-axis';
const translation = 'translation-direction-and-orientation';
const rotation = 'rotation-around-fixed-center';

const drafts: Record<Difficulty, ActivityDraft[]> = {
  basic: [
    { knowledgePointIds: [translation], prompt: '一枚箭头贴纸沿直线向右滑动，尖端始终朝着原方向。它做什么运动？', answer: '平移', distractors: ['旋转', '轴对称'], hint: '它的位置变了，但朝向没有变。', explanation: '物体沿直线移动、朝向不变，属于平移。' },
    { knowledgePointIds: [rotation], prompt: '纸风车的叶片绕着中间的点转动。它做什么运动？', answer: '旋转', distractors: ['平移', '对称'], hint: '留意叶片是否围着一个固定位置转。', explanation: '物体绕固定点转动，是旋转现象。' },
    { knowledgePointIds: [symmetry], prompt: '图案沿一条直线对折后，两侧对应部分完全重合。对应点到这条线的距离有什么关系？', answer: '两侧对应点到对称轴的距离相等', distractors: ['两侧对应点到对称轴的距离不同', '只有一侧的点到对称轴有距离'], hint: '回想对称图形沿对称轴折叠后两边的对应情况。', explanation: '对称轴两侧的对应点到轴的距离相等，折叠后才能重合。' },
    { knowledgePointIds: [rotation], prompt: '风车绕中心旋转时，哪个位置保持不动？', answer: '旋转中心仍在原处', distractors: ['叶片尖端沿直线移动', '风车的朝向始终不变'], hint: '观察风车围着哪个固定位置转动。', explanation: '风车旋转时围绕固定的中心转动，旋转中心仍在原处。' },
    { knowledgePointIds: [rotation], prompt: '门打开时绕着合页转动。这是什么运动？', answer: '旋转', distractors: ['平移', '轴对称'], hint: '合页位置不动，门围着它转。', explanation: '门绕合页转动，属于旋转现象。' },
    { knowledgePointIds: [symmetry], prompt: '要判断图案是否关于一条线对称，下面哪一步最能直接检查？', answer: '沿可能的折痕对折，看两边能否完全重合', distractors: ['只比较两边颜色是否一样', '数一数图案里有几种形状'], hint: '观察图案两侧的对应部分。', explanation: '对折后两侧能完全重合，才说明图案关于这条线轴对称。' },
    { knowledgePointIds: [symmetry], prompt: '沿着已经找到的对称轴对折后，两边的图案应怎样？', answer: '完全重合', distractors: ['只在颜色上相同', '一边要比另一边长'], hint: '想象把折起的一边盖在另一边上。', explanation: '轴对称的两侧对应，折叠后能够完全重合。' },
    { knowledgePointIds: [rotation], prompt: '小纸片绕一个图钉转动，图钉的位置代表什么？', answer: '固定的中心点', distractors: ['平移的终点', '对称轴'], hint: '找一找转动时一直留在原处的位置。', explanation: '纸片绕着不动的图钉转，图钉所在处就是转动中心。' },
    { knowledgePointIds: [symmetry], prompt: '对折后图案两侧分开，能说它关于这条折痕轴对称吗？', answer: '不能', distractors: ['能，只要颜色一样', '能，只要两边都画了图案'], hint: '检查折痕两侧能否叠在一起。', explanation: '关于这条线轴对称，需要折叠后两边完全重合。' },
    { knowledgePointIds: [translation], prompt: '棋子沿直线向前滑动，中途没有转向。运动中什么发生变化、什么保持不变？', answer: '位置改变，朝向保持不变', distractors: ['位置和朝向都不变', '位置不变，朝向改变'], hint: '分别观察棋子所在处和它面向的方向。', explanation: '平移改变物体的位置，物体的朝向保持不变。' },
    { knowledgePointIds: [translation], prompt: '把纸星形往旁边平移，图形的朝向会怎样？', answer: '保持原来的朝向', distractors: ['自动转向另一边', '变成另一种形状'], hint: '平移只改变图形所在的位置。', explanation: '平移时图形不转动，所以朝向保持原样。' },
    { knowledgePointIds: [symmetry], prompt: '画纸上先画出图案一半，想沿一条线补出另一半，先标出哪条线？', answer: '对称轴', distractors: ['小车行驶路线', '风车的转动方向'], hint: '沿这条线折叠时，两边应当能够重合。', explanation: '先确定对称轴，才能按两侧对应关系补出另一半。' },
    { knowledgePointIds: [translation], prompt: '一个三角形沿直线向右平移两格后，大小和形状有什么变化？', answer: '大小和形状不变，只改变位置', distractors: ['大小不变，形状改变', '形状不变，大小改变'], hint: '平移会改变图形的位置，但不会把它拉伸或压扁。', explanation: '平移只改变图形的位置，图形的大小和形状都保持不变。' },
    { knowledgePointIds: [rotation], prompt: '书签绕着一个固定的小圆点转动，小圆点的位置会怎样？', answer: '转动中心仍在原处', distractors: ['沿直线移动到旁边', '和书签一起转动'], hint: '观察书签围着哪个位置转。', explanation: '旋转围绕固定中心进行，中心位置保持不变。' },
  ],
  advanced: [
    { knowledgePointIds: [translation, rotation], prompt: '有三种动作：①纸片沿直线滑动且朝向不变；②书签沿直线滑动且朝向不变；③纸风车绕中心转动。怎样分类？', answer: '前两种是平移，后一种是旋转', distractors: ['三种都是旋转', '前两种是轴对称，后一种是平移'], hint: '分别看物体是直线移动，还是围着固定位置转。', explanation: '前两种改变位置但不改变朝向，是平移；风车绕中心转，是旋转。' },
    { knowledgePointIds: [rotation], prompt: '一个玩具不停地绕着同一个点转。哪条线索最能说明它在旋转？', answer: '物体绕固定中心转动', distractors: ['物体沿直线移动且朝向不变', '物体沿一条线折叠后两边重合'], hint: '指出运动时始终不变的位置。', explanation: '围着固定中心转动，是旋转的特征。' },
    { knowledgePointIds: [symmetry], prompt: '已知图案关于中线轴对称，只画出左半边。伙伴要补出右半边，怎样做？', answer: '沿对称轴折叠，让另一边与已知一边重合', distractors: ['把左半边随意转一圈', '只照着左边的颜色涂右边'], hint: '先确认折痕的位置，再找两侧对应的部分。', explanation: '沿对称轴折叠，另一侧应落在已知图案对应的位置上。' },
    { knowledgePointIds: [symmetry], prompt: '纸片两侧涂成同一种颜色，但轮廓和位置不对应。仅凭颜色相同，能判断沿中线对称吗？', answer: '不能，只颜色相同还要检查两边形状和位置', distractors: ['能，颜色相同就够了', '能，只要两侧各有一个图案'], hint: '除了颜色，还要比较两侧的形状和对应位置。', explanation: '轴对称要看两边形状和位置能否对应，颜色相同本身不能证明。' },
    { knowledgePointIds: [symmetry, translation, rotation], prompt: '小美折纸后发现两边重合；小明把图案沿直线挪到旁边。两人的观察分别关注什么？', answer: '对称看折叠后两边是否对应，平移和旋转描述位置怎样变化', distractors: ['两人都只是在观察颜色', '对称和平移都表示绕固定点转动'], hint: '想想一个在比较两侧，一个在观察位置变化。', explanation: '轴对称描述两侧能否对应重合；平移和旋转描述图形运动方式。' },
    { knowledgePointIds: [translation], prompt: '小车沿直轨向前滑，车头始终对准同一方向。描述这段运动最关键的两条线索是什么？', answer: '移动路线是直线，图形朝向始终不变', distractors: ['车子绕固定中心转动，朝向不断变化', '车子折叠后两边完全重合'], hint: '同时观察路线和车子的朝向。', explanation: '直线移动、朝向不变，是平移的特征。' },
    { knowledgePointIds: [translation], prompt: '把同一枚贴纸沿桌面直线移到另一处，不让它转动。它属于什么运动？', answer: '平移', distractors: ['旋转', '轴对称'], hint: '看贴纸是否绕某个点转了方向。', explanation: '贴纸沿直线移动且保持原朝向，是平移。' },
    { knowledgePointIds: [translation, rotation], prompt: '小纸船先绕书钉转动，再沿桌面直线滑到边上。它经历了什么顺序？', answer: '先旋转，后平移', distractors: ['先平移，后旋转', '只有平移，没有转动'], hint: '按动作发生的先后次序判断。', explanation: '小纸船先绕固定点转动，之后再直线移动。' },
    { knowledgePointIds: [symmetry], prompt: '剪纸沿标出的中线折起，两侧正好盖在一起。观察结果说明什么？', answer: '对折后两边完全重合', distractors: ['图案发生了平移', '图案绕固定点转动'], hint: '判断时要看折叠后两侧的对应情况。', explanation: '两侧完全重合，说明图案关于这条线轴对称。' },
    { knowledgePointIds: [symmetry], prompt: '伙伴想检查一幅图案的两边是否轴对称，应该按什么步骤？', answer: '先确认折痕，再比较两边对应部分', distractors: ['先数颜色，再把图案向旁边移动', '先找到转动中心，再比较移动路线'], hint: '先找可能的对称轴，再通过折叠观察。', explanation: '找到折痕并比较两边是否对应重合，可以检查轴对称。' },
    { knowledgePointIds: [translation, rotation], prompt: '比较“纸片直线滑动且朝向不变”和“风车绕中心转动”，哪句话准确？', answer: '平移不改变图形朝向，旋转绕固定中心进行', distractors: ['平移要绕中心转，旋转时朝向一定不变', '两种运动都只是沿直线改变位置'], hint: '分别关注图形朝向和是否绕固定点转动。', explanation: '平移不改变朝向；旋转围绕固定中心转动。' },
    { knowledgePointIds: [symmetry], prompt: '只画出轴对称图案的一边，图纸上已给出折叠用的参考线，怎样开始补画？', answer: '先标明对称轴，再沿轴补出对应一侧', distractors: ['把已画一边旋转后直接贴到任意位置', '先把图案沿直线移到纸边'], hint: '对应的一侧要以参考线为准。', explanation: '把参考线作为对称轴，再根据两边对应关系补画。' },
    { knowledgePointIds: [translation, rotation], prompt: '要判断物体是直线移动还是绕点转动，先看哪些线索？', answer: '先看是否直线移动，再看是否绕固定点转动', distractors: ['只看物体颜色，再猜它去了哪里', '只看图案两边是否对折重合'], hint: '观察运动路线和有没有不动的中心。', explanation: '直线移动且朝向不变是平移；绕固定中心转动是旋转。' },
    { knowledgePointIds: [translation, rotation], prompt: '甲把图案沿直线移到旁边且朝向不变；乙让图案绕一个固定点转动。哪句话说明正确？', answer: '平移沿直线移动且方向不变，旋转绕固定点转动', distractors: ['平移绕固定点转动，旋转时沿直线且方向不变', '甲和乙都只是轴对称'], hint: '分别描述甲的路线和乙不动的中心。', explanation: '甲是平移，乙是旋转，判断时要依据不同的运动特征。' },
  ],
  high: [
    { knowledgePointIds: [symmetry], prompt: '伙伴把剪纸沿画出的轴折起，两侧完全对上。怎样记录检查结果？', answer: '沿标出的轴折叠后，两侧图案可以完全重合', distractors: ['图案沿直线移到旁边且朝向不变', '图案绕一个固定点转动'], hint: '说明你折了哪里，以及两侧的结果。', explanation: '折叠后两边完全重合，说明图案关于这条线轴对称。' },
    { knowledgePointIds: [translation], prompt: '用同一张贴纸排成一行，但不让图案转向。怎样移动才符合设计？', answer: '每次沿同一方向直线移动，图案朝向保持不变', distractors: ['每次绕中心转动到不同方向', '每次折叠贴纸，让两边重合'], hint: '排成一行时，想好统一的移动方向和朝向。', explanation: '沿同一方向平移并保持朝向，能让图案整齐排成一行。' },
    { knowledgePointIds: [rotation], prompt: '装饰图上两片纸叶围着花心换位置。哪一点要保持明确？', answer: '叶片围绕花心转动，花心位置不变', distractors: ['叶片沿直线移动，花心跟着移动', '叶片折起来后两侧完全重合'], hint: '旋转时要指出物体围着哪里转。', explanation: '花心是固定的转动中心，纸叶围着它转动。' },
    { knowledgePointIds: [translation, rotation], prompt: '要向伙伴说明怎样辨认两种图形运动，哪句话同时说清关键特征？', answer: '沿直线移动时朝向不变；绕固定点转动时中心不动', distractors: ['平移时绕中心转动；旋转时只沿直线移动', '只要图案换了位置，两种运动就一样'], hint: '比较移动时的朝向和转动时不动的位置。', explanation: '平移沿直线改变位置而不改变朝向；旋转绕固定中心转动。' },
    { knowledgePointIds: [symmetry, translation, rotation], prompt: '小组准备先确认剪纸两侧相同，再把完成的图案挪到卡片另一边。应按什么顺序进行？', answer: '先沿轴对折检查，再将图案沿直线移到旁边', distractors: ['先绕固定点转动，再随意补画两侧', '先把图案移走，不检查两边'], hint: '先检查图案本身，再移动它的位置。', explanation: '先用对折检查轴对称，再按要求平移图案。' },
    { knowledgePointIds: [translation, rotation], prompt: '伙伴写“把图案动到旁边就行”。为了让别人照着做并判断运动类型，还应怎样说明？', answer: '先说明物体怎样移动，再指出是否改变朝向或绕点转动', distractors: ['只说图案是什么颜色', '只写“做得整齐一些”'], hint: '补上可观察的路线、朝向或转动中心。', explanation: '说清路线、朝向或中心，伙伴才能判断和照着完成运动。' },
    { knowledgePointIds: [translation], prompt: '要把相同的贴纸排成一列，并让尖角都朝上，怎样做更合适？', answer: '让每个复制图案沿同一方向移动并保持相同朝向', distractors: ['让每张贴纸绕不同点转到任意方向', '每张贴纸折叠出不同的形状'], hint: '所有贴纸沿同一条直线方向移动，朝向别改变。', explanation: '同方向平移并保持朝向，复制图案就能整齐排列。' },
    { knowledgePointIds: [symmetry], prompt: '完成蝴蝶图案后，一侧翅膀看起来更宽。下一步怎样检查和修正？', answer: '对折检查两边对应，必要时修正一侧图案', distractors: ['只把两侧涂成同一种颜色', '把整幅图案绕点转动'], hint: '比较折叠后两边的形状和位置。', explanation: '通过对折检查对应情况，再调整不重合的一侧。' },
    { knowledgePointIds: [rotation], prompt: '纸花方案要让花瓣依次绕一个纽扣摆放。说明中哪一个信息最重要？', answer: '标明固定中心和转动前后的位置', distractors: ['只标出花瓣的颜色', '说明整张纸向左平移'], hint: '说清图案围着哪里转，以及起点和终点在哪里。', explanation: '固定中心和转动前后的图案位置，能让伙伴看懂旋转方案。' },
    { knowledgePointIds: [symmetry], prompt: '图案左右涂成同一种颜色，但轮廓不同。怎样判断能否轴对称？', answer: '对称需要两边形状、位置对应，颜色相同还不够', distractors: ['只要颜色相同就一定对称', '只要两边都有图案就一定对称'], hint: '除了颜色，还要检查折起来能否重合。', explanation: '轴对称要看两边的形状和位置是否对应，不能只看颜色。' },
    { knowledgePointIds: [translation, rotation], prompt: '一张星形卡片先被直线推到旁边，再绕中心点转动。怎样记录先后两步？', answer: '先直线移动且不改变朝向，再绕固定点转动', distractors: ['先对折图案，再沿轴补画另一侧', '先绕固定点转动，再保持原地不动'], hint: '按发生顺序写出路线和转动动作。', explanation: '先平移，随后绕中心旋转，记录时要保留动作顺序。' },
    { knowledgePointIds: [symmetry], prompt: '小组用对折检查半幅图案补得是否恰当，说明里应写什么？', answer: '说明折痕并检查折叠后两边能否重合', distractors: ['只写图案用了几种颜色', '只说明图案向哪个方向移动'], hint: '写清对折的位置和观察结果。', explanation: '说明折痕并比较两侧是否重合，能检查补画结果。' },
    { knowledgePointIds: [translation, rotation], prompt: '玩具沿直线向右移动时，星形图案同时转了方向。为什么不能只把这段运动叫作平移？', answer: '平移时朝向不变；图案转了方向，说明还发生了转动', distractors: ['只要位置变化，所有运动都叫平移', '只要图案有颜色，就属于旋转'], hint: '平移时图案的朝向不会改变。', explanation: '图案在移动中又转了方向，说明除了位置改变还有转动，不能只按平移描述。' },
    { knowledgePointIds: [translation, rotation], prompt: '图A把图案向右直线移动且朝向不变；图B绕固定钮转动。比较时哪句话准确？', answer: '第一幅是平移，第二幅是旋转，转动中心保持不动', distractors: ['第一幅是旋转，第二幅是平移', '两幅都是轴对称图案'], hint: '看图A的朝向和图B不动的位置。', explanation: '图A符合平移特征；图B绕固定钮转动，属于旋转。' },
  ],
};

export const grade2Term2MathUnit03SupplementalActivities: Grade2Term2MathUnit03SupplementalActivity[] = Object.entries(drafts).flatMap(([difficulty, items]) => (
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
