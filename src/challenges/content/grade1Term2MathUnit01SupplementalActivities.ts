import type { ChoiceActivityDefinition, Difficulty } from '../../content/types';

export interface Grade1Term2MathUnit01SupplementalActivity {
  difficulty: Difficulty;
  sourceUnitId: string;
  knowledgePointIds: string[];
  activity: ChoiceActivityDefinition;
}

interface ActivityDraft {
  knowledgePointIds: string[];
  prompt: string;
  options: [string, string, string];
  correctOptionIndex: 0 | 1 | 2;
  hint: string;
  explanation: string;
}

const sourceUnitId = 'grade-1/term-2/math/unit-01';
const idPrefix = 'challenge-supplement-grade-1-term-2-math-unit-01';
const recognition = ['plane-shape-recognition'];
const features = ['plane-shape-features'];
const composition = ['plane-shape-composition'];

const drafts: Record<Difficulty, ActivityDraft[]> = {
  basic: [
    { knowledgePointIds: recognition, prompt: '哪张图形卡的外轮廓是三角形？', options: ['△', '○', '□'], correctOptionIndex: 0, hint: '比较三张卡片的整体轮廓。', explanation: '△的整体轮廓是三角形。' },
    { knowledgePointIds: recognition, prompt: '哪张图形卡的外轮廓是正方形？', options: ['▭', '□', '○'], correctOptionIndex: 1, hint: '找一找四边看起来一样长的方形卡片。', explanation: '□表示正方形。' },
    { knowledgePointIds: recognition, prompt: '哪张图形卡的外轮廓是圆形？', options: ['△', '▭', '○'], correctOptionIndex: 2, hint: '圆形的边缘是弯曲的。', explanation: '○表示圆形。' },
    { knowledgePointIds: recognition, prompt: '哪张图形卡的外轮廓是长方形？', options: ['○', '▭', '△'], correctOptionIndex: 1, hint: '比较长方形卡和另外两张卡的整体形状。', explanation: '▭表示长方形。' },
    { knowledgePointIds: features, prompt: '哪种图形没有直边？', options: ['三角形', '圆形', '正方形'], correctOptionIndex: 1, hint: '看看图形边缘有没有直直的线段。', explanation: '圆形的边缘是曲线，没有直边。' },
    { knowledgePointIds: features, prompt: '哪种图形有三条直边？', options: ['圆形', '长方形', '三角形'], correctOptionIndex: 2, hint: '数一数每种图形的直边。', explanation: '三角形有三条直边。' },
    { knowledgePointIds: features, prompt: '哪张图形卡有四条直边？', options: ['正方形', '圆形', '三角形'], correctOptionIndex: 0, hint: '分别数一数图形卡边缘上的直线段。', explanation: '正方形有四条直边；圆形没有直边，三角形有三条直边。' },
    { knowledgePointIds: recognition, prompt: '把长方形图卡转一个方向后，它仍然是哪种图形？', options: ['长方形', '圆形', '三角形'], correctOptionIndex: 0, hint: '转动改变了摆放方向，再看整体轮廓。', explanation: '转动图卡不会改变它的整体轮廓，所以仍是长方形。' },
    { knowledgePointIds: composition, prompt: '把圆形图卡摆在三角形图卡旁边，哪项准确说出图案用到的图形？', options: ['圆形和三角形', '两个长方形', '圆形会变成正方形'], correctOptionIndex: 0, hint: '分别看一看两张图卡的整体轮廓。', explanation: '图案用了圆形图卡和三角形图卡；拼摆不会改变图卡本身的种类。' },
    { knowledgePointIds: recognition, prompt: '要从三张图卡中找出和圆盘外形最像的一张，应先比较什么？', options: ['图卡和圆盘的整体轮廓', '图卡的颜色', '图卡摆放的位置'], correctOptionIndex: 0, hint: '判断形状时要观察图形本身。', explanation: '比较整体轮廓能判断哪张图卡与圆盘的外形最像。' },
    { knowledgePointIds: features, prompt: '数一数三角形的直边，应该数到几条？', options: ['3 条', '4 条', '没有直边'], correctOptionIndex: 0, hint: '沿着三角形的外边数一圈。', explanation: '三角形有 3 条直边。' },
    { knowledgePointIds: features, prompt: '哪句话是在描述圆形的边缘？', options: ['有三条直边', '边缘是弯曲的', '有四个角'], correctOptionIndex: 1, hint: '想想圆形和方形卡片的边缘有什么不同。', explanation: '圆形的边缘是弯曲的，没有直边和角。' },
    { knowledgePointIds: composition, prompt: '想把两张图形卡拼成新图案，哪一步适合先做？', options: ['先选好图形卡，再试着摆放', '不看图卡就先猜结果', '只记下图卡的颜色'], correctOptionIndex: 0, hint: '先确定要用哪些卡片。', explanation: '先选卡片，再尝试摆放，才能观察拼出的图案。' },
    { knowledgePointIds: composition, prompt: '拼摆后想让伙伴看懂图案，哪种记录最有帮助？', options: ['画出每张卡的位置和整体轮廓', '只写“很好看”', '只写图卡的颜色'], correctOptionIndex: 0, hint: '伙伴需要知道卡片怎样摆在一起。', explanation: '记录卡片位置和拼成的整体轮廓，伙伴更容易照着拼。' },
    { knowledgePointIds: composition, prompt: '一幅拼图用了两张三角形图卡和一张圆形图卡。要让两种图形卡数量一样，还需要哪张？', options: ['圆形图卡', '三角形图卡', '正方形图卡'], correctOptionIndex: 0, hint: '先数一数每种图形卡各有几张。', explanation: '三角形图卡有两张，圆形图卡有一张；再加一张圆形图卡，两种图形卡就各有两张。' },
  ],
  advanced: [
    { knowledgePointIds: recognition, prompt: '正方形图卡斜着放在桌上，怎样判断它有没有变成另一种图形？', options: ['比较转动前后的整体轮廓', '只看它离桌边多远', '只比较卡片颜色'], correctOptionIndex: 0, hint: '摆放方向和图形轮廓是两件事。', explanation: '转动只改变摆放方向；比较整体轮廓可以判断图形仍是正方形。' },
    { knowledgePointIds: composition, prompt: '两张一样大的正方形卡沿一整条边对齐、并排拼好，外轮廓最像什么？', options: ['圆形', '长方形', '三角形'], correctOptionIndex: 1, hint: '观察两张方卡拼在一起后的外边界。', explanation: '两张正方形卡并排拼成的整体外轮廓是长方形。' },
    { knowledgePointIds: composition, prompt: '四张一样大的正方形卡排成两行、每行两张并沿边对齐，拼出的整体外轮廓是什么？', options: ['更大的正方形', '圆形', '三角形'], correctOptionIndex: 0, hint: '先看每一行的宽，再看两行合起来的高。', explanation: '两行两列的四张同样大小正方形卡拼成更大的正方形外轮廓。' },
    { knowledgePointIds: composition, prompt: '只知道用了两张三角形卡，还不能确定拼成什么。还需要知道什么？', options: ['三角形的形状和卡片怎样摆放', '卡片放在哪种颜色的桌上', '卡片由谁拿着'], correctOptionIndex: 0, hint: '不同三角形和不同摆法可能得到不同外轮廓。', explanation: '三角形形状和拼摆方式都会影响结果，缺少这些信息就不能确定拼成什么。' },
    { knowledgePointIds: features, prompt: '同伴说圆形有四条直边。怎样检查这句话？', options: ['沿圆形边缘观察有没有直线段', '只比较圆形卡片的颜色', '把圆形卡片转一个方向'], correctOptionIndex: 0, hint: '检查图形边缘本身。', explanation: '圆形边缘是曲线，没有四条直边。' },
    { knowledgePointIds: composition, prompt: '想比较两种拼法哪种更接近目标图案，怎样做更公平？', options: ['用同样的两张图卡，改变摆法后比较外轮廓', '每次换不同图卡，也不记录摆法', '只比较图卡的颜色'], correctOptionIndex: 0, hint: '保持图卡相同，再比较不同摆法的结果。', explanation: '用同样的两张图卡改变摆法并比较整体轮廓，才是在检查摆法的影响。' },
    { knowledgePointIds: composition, prompt: '拼图结果和预想的不一样，怎样找出原因？', options: ['对照记录检查卡片的位置和方向', '只检查卡片的颜色', '不看摆法，直接换一个答案'], correctOptionIndex: 0, hint: '把实际拼法和记录的拼法逐项比较。', explanation: '检查位置和方向能找到摆法差异，颜色不能说明轮廓为何不同。' },
    { knowledgePointIds: features, prompt: '想把图形分成“有直边”和“没有直边”两类，哪张卡应放在“没有直边”一组？', options: ['圆形卡', '正方形卡', '三角形卡'], correctOptionIndex: 0, hint: '观察边缘是曲线还是直线。', explanation: '圆形边缘是曲线，没有直边；另外两种图形都有直边。' },
    { knowledgePointIds: composition, prompt: '两张方形卡只在一个角上碰到，没有边对齐。能确定拼出的整体外轮廓是长方形吗？', options: ['不能，还要看卡片具体位置', '能，只要用了两张卡就一定是长方形', '能，因为卡片颜色相同'], correctOptionIndex: 0, hint: '是否沿边拼合、怎样摆放都会影响整体外轮廓。', explanation: '只在角上接触不能确定整体轮廓是长方形，还要知道卡片的位置和边是否对齐。' },
    { knowledgePointIds: features, prompt: '正方形卡和长方形卡都能看到直边。哪种观察还能帮助辨认它们各自的整体轮廓？', options: ['比较卡片整体的长短和形状', '只看卡片旁边的物品', '只看卡片颜色'], correctOptionIndex: 0, hint: '不要只看其中一条边或颜色。', explanation: '比较整体轮廓和边的相对长短，比只看颜色更能帮助辨认图形。' },
    { knowledgePointIds: recognition, prompt: '把“圆形、正方形、三角形”三张卡打乱后，哪种做法能重新按给定顺序摆好？', options: ['按图形名称逐张核对', '按卡片颜色深浅猜', '把卡片叠起来不检查'], correctOptionIndex: 0, hint: '逐张核对目标顺序中的图形名称。', explanation: '按名称逐张核对，能确认每个位置放的是要求的图形。' },
    { knowledgePointIds: composition, prompt: '拼成一个图案后，伙伴要重复拼一次。哪项信息最重要？', options: ['每张卡相对位置和摆放方向', '操作时谁先说话', '卡片放在桌子的哪一侧'], correctOptionIndex: 0, hint: '记录能复现拼法的信息。', explanation: '每张卡的位置和方向能帮助伙伴还原同一个拼图。' },
    { knowledgePointIds: features, prompt: '三角形卡和圆形卡都转动了方向，哪种方法仍可辨认它们？', options: ['观察整体轮廓和边缘特点', '只找卡片朝上的一边', '比较转动前后离桌边的距离'], correctOptionIndex: 0, hint: '从图形本身的外轮廓判断。', explanation: '转动不会改变图形本身，观察整体轮廓和边缘仍能辨认。' },
    { knowledgePointIds: composition, prompt: '同伴记录“用了两张卡，拼成了图案”，还缺哪项内容才能让你照着拼？', options: ['卡片的种类和摆放位置', '卡片的购入时间', '记录时的天气'], correctOptionIndex: 0, hint: '要知道用什么卡、怎样摆。', explanation: '只记录数量不够；卡片种类和摆放位置能帮助还原图案。' },
    { knowledgePointIds: composition, prompt: '一幅图案用了两张正方形图卡、两张圆形图卡和一张三角形图卡。哪两种图形卡数量一样？', options: ['正方形和圆形图卡', '圆形和三角形图卡', '正方形和三角形图卡'], correctOptionIndex: 0, hint: '分别数出三种图形卡的张数，再比较。', explanation: '正方形图卡有两张，圆形图卡也有两张；三角形图卡只有一张。' },
  ],
  high: [
    { knowledgePointIds: composition, prompt: '同伴说“任意两张三角形卡都能拼成正方形”。怎样判断这个说法是否可靠？', options: ['先核对卡片形状和摆放，再观察拼出的外轮廓', '只看两张卡是不是同一种颜色', '不看摆法，直接说一定正确'], correctOptionIndex: 0, hint: '拼出的轮廓取决于卡片形状和摆法。', explanation: '只有知道三角形卡的形状与摆放，才能检查是否拼成正方形；“任意”说法不能直接成立。' },
    { knowledgePointIds: composition, prompt: '两张一样大的正方形卡要拼成长方形，哪条记录能让别人准确复现？', options: ['两张卡沿整条边对齐并排放', '两张卡颜色相同', '两张卡放在同一张桌上'], correctOptionIndex: 0, hint: '记录决定整体轮廓的接触边和摆放方式。', explanation: '沿整条边对齐并排放，能说明两张卡如何组成长方形外轮廓。' },
    { knowledgePointIds: features, prompt: '小组要核对一张图形卡是不是圆形，哪组证据最直接？', options: ['它的边缘是连续弯曲的，没有直边和角', '它的颜色是蓝色', '它放在桌子的中央'], correctOptionIndex: 0, hint: '选择能描述图形边缘的观察。', explanation: '圆形的边缘连续弯曲，没有直边和角；颜色和位置不是判断依据。' },
    { knowledgePointIds: recognition, prompt: '图形卡转动后看起来“尖角朝上”，同伴因此把它从三角形改叫另一种图形。最好的检查方式是什么？', options: ['转回原方向并比较整体轮廓', '只看尖角朝哪个方向', '比较卡片背面的颜色'], correctOptionIndex: 0, hint: '方向变化不一定代表图形种类变化。', explanation: '转回原方向比较整体轮廓，可以发现摆放方向改变但图形仍是三角形。' },
    { knowledgePointIds: composition, prompt: '两张卡拼完后，外轮廓与预想不同。为了判断是卡片选错还是摆法不同，先记录什么？', options: ['每张卡的形状、方向和相接位置', '谁先拿起卡片', '卡片的颜色深浅'], correctOptionIndex: 0, hint: '记录能影响拼组外轮廓的信息。', explanation: '形状、方向和相接位置都可能影响整体轮廓，记录它们才能定位原因。' },
    { knowledgePointIds: features, prompt: '一张卡有四条直边，但题目没有说明各边长短。能确定它一定是正方形吗？', options: ['不能，还需要观察整体轮廓和边的关系', '能，四条直边一定是正方形', '能，只要卡片有四个角'], correctOptionIndex: 0, hint: '四条直边和四个角还不足以区分所有方形。', explanation: '长方形和正方形都有四条直边和四个角；还要观察整体轮廓及边的关系。' },
    { knowledgePointIds: composition, prompt: '要用四张一样大的正方形卡拼成更大的正方形，哪种摆法有明确依据？', options: ['排成两行两列，卡片边对齐', '排成一行后不检查外轮廓', '四张卡互相错开并只在角上接触'], correctOptionIndex: 0, hint: '让四张小方卡组成两行两列。', explanation: '两行两列且边对齐时，整体外轮廓是更大的正方形。' },
    { knowledgePointIds: recognition, prompt: '同一张正方形卡换了颜色并转了方向，怎样确认它还是原来的图形？', options: ['观察它的整体轮廓，不用颜色和方向判断', '只看新颜色', '只看它在桌面的位置'], correctOptionIndex: 0, hint: '颜色和摆放方向不是图形种类本身。', explanation: '比较整体轮廓，能确认卡片仍是正方形。' },
    { knowledgePointIds: composition, prompt: '两组同学都用了两张方形卡，但拼出的外轮廓不同。哪种解释合理？', options: ['两组卡片的大小或摆放方式可能不同', '只要用了两张卡，外轮廓就必须相同', '一定是其中一组卡片颜色不对'], correctOptionIndex: 0, hint: '比较卡片大小和相接、摆放方式。', explanation: '卡片大小或摆放方式不同，组合后的外轮廓可能不同；颜色不能决定轮廓。' },
    { knowledgePointIds: features, prompt: '伙伴把圆形、三角形和正方形按“有角”和“没有角”分类，哪张卡应单独放在“没有角”一组？', options: ['正方形', '圆形', '三角形'], correctOptionIndex: 1, hint: '观察边缘相接处有没有角。', explanation: '圆形边缘没有角；三角形和正方形都有角。' },
    { knowledgePointIds: composition, prompt: '拼图说明只写“把卡片放在一起”，伙伴仍拼不出来。还应补充什么？', options: ['每张卡的方向、相接边和先后调整步骤', '卡片的颜色和购买地点', '谁的手比较靠近桌边'], correctOptionIndex: 0, hint: '把能让别人还原拼法的信息写清楚。', explanation: '方向、相接边和调整步骤能帮助伙伴复现拼组过程。' },
    { knowledgePointIds: recognition, prompt: '一张三角形卡与一张圆形卡大小不同，想按“图形种类”分类时应依据什么？', options: ['整体轮廓和边缘特点', '卡片面积大小', '卡片放在桌上的位置'], correctOptionIndex: 0, hint: '分类标准是图形种类，不是卡片大小。', explanation: '根据整体轮廓和边缘特点辨认图形，大小和位置不改变它的种类。' },
    { knowledgePointIds: composition, prompt: '要比较两种拼法哪种能拼出长方形，最公平的检查方法是什么？', options: ['用同样的图形卡分别试拼，并比较外轮廓', '一组只看颜色，另一组只数卡片', '不实际拼摆，按谁先说判断'], correctOptionIndex: 0, hint: '比较时使用相同卡片和清楚的观察标准。', explanation: '使用同样的卡片实际试拼，再比较外轮廓，结果才可以核对。' },
    { knowledgePointIds: features, prompt: '同伴说“圆形和正方形都有直边”，哪条观察能直接发现错误？', options: ['逐段沿两张卡的边缘观察，圆形没有直边', '只比较卡片的面积', '只比较卡片离桌边的距离'], correctOptionIndex: 0, hint: '沿着图形边缘判断直线或曲线。', explanation: '正方形由直边围成，圆形边缘是曲线；逐段观察能发现说法错误。' },
  ],
};

export const grade1Term2MathUnit01SupplementalActivities: Grade1Term2MathUnit01SupplementalActivity[] = Object.entries(drafts).flatMap(([difficulty, items]) => (
  items.map((draft, index) => ({
    difficulty: difficulty as Difficulty,
    sourceUnitId,
    knowledgePointIds: draft.knowledgePointIds,
    activity: (() => {
      const correctOptionIndex = (index % 3) as 0 | 1 | 2;
      const offset = (draft.correctOptionIndex - correctOptionIndex + 3) % 3;
      const options = [...draft.options.slice(offset), ...draft.options.slice(0, offset)];
      return {
        id: `${idPrefix}-${difficulty}-${String(index + 1).padStart(2, '0')}`,
        kind: 'choice' as const,
        prompt: draft.prompt,
        options: options.map((label, optionIndex) => ({ id: `option-${optionIndex + 1}`, label })),
        correctOptionId: `option-${correctOptionIndex + 1}`,
        hint: draft.hint,
        explanation: draft.explanation,
      };
    })(),
  }))
));
