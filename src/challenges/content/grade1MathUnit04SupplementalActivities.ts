import type { ChoiceActivityDefinition, Difficulty } from '../../content/types';

export interface Grade1MathUnit04SupplementalActivity {
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

const sourceUnitId = 'grade-1/term-1/math/unit-04';
const idPrefix = 'challenge-supplement-grade-1-term-1-math-unit-04';

const drafts: Record<Difficulty, ActivityDraft[]> = {
  basic: [
    { knowledgePointIds: ['solid-shape-recognition'], prompt: '文具盒的整体外形最接近哪种立体图形？', options: ['长方体', '球体', '圆柱体'], correctOptionIndex: 0, hint: '看看文具盒是不是像一个长长的盒子。', explanation: '文具盒整体像长方体。球体像球，圆柱体像圆筒。' },
    { knowledgePointIds: ['solid-shape-recognition'], prompt: '玻璃弹珠拿在手里，外形最像什么？', options: ['正方体', '球体', '长方体'], correctOptionIndex: 1, hint: '弹珠表面弯弯的，没有平平的一面。', explanation: '玻璃弹珠整体接近球体。' },
    { knowledgePointIds: ['solid-shape-recognition', 'solid-shape-features'], prompt: '一只圆筒形茶叶罐的外形最像哪种立体图形？', options: ['圆柱体', '球体', '正方体'], correctOptionIndex: 0, hint: '观察罐子的圆形底和弯曲的侧面。', explanation: '圆筒形茶叶罐整体接近圆柱体。' },
    { knowledgePointIds: ['solid-shape-features'], prompt: '圆柱体的两个底面是什么样的？', options: ['两个平平的圆形', '两个弯弯的球面', '两个方方的平面'], correctOptionIndex: 0, hint: '想想圆筒上下两端的形状。', explanation: '圆柱体有两个平平的圆形底面，侧面是弯曲的。' },
    { knowledgePointIds: ['solid-shape-features'], prompt: '下面哪种说法符合球体的外形？', options: ['有两个平平的圆形底面', '有平平的面和直直的棱', '表面弯弯的，没有平平的面'], correctOptionIndex: 2, hint: '球面从不同方向看都是弯曲的。', explanation: '球体的表面是弯曲的，没有平平的面。' },
    { knowledgePointIds: ['solid-shape-features'], prompt: '把一个长方体盒子平放在桌上，哪一部分可以贴着桌面？', options: ['盒子平平的一面', '盒子的尖角', '盒子的颜色'], correctOptionIndex: 0, hint: '找一找盒子上平平的部分。', explanation: '长方体盒子有平平的面，平放时可以用一个面贴着桌面。' },
    { knowledgePointIds: ['solid-shape-use'], prompt: '轻轻推一下，哪种立体图形可能向各个方向滚动？', options: ['球体', '正方体', '长方体'], correctOptionIndex: 0, hint: '想想球在地上滚动时的样子。', explanation: '球体表面弯曲，轻轻推动后可能向各个方向滚动。' },
    { knowledgePointIds: ['solid-shape-use'], prompt: '把两块正方体积木上下叠放，怎样放更稳？', options: ['让一块的平平的面贴着另一块的平平的面', '让两块的角尖尖地顶在一起', '让两块只用一条边接触'], correctOptionIndex: 0, hint: '平平的面接触起来更稳。', explanation: '让两块积木的平平的面贴在一起，比只用角或一条边接触更稳。' },
    { knowledgePointIds: ['solid-shape-recognition'], prompt: '书桌上的橡皮盒像长方形盒子，最可能是哪种立体图形？', options: ['长方体', '圆柱体', '球体'], correctOptionIndex: 0, hint: '它有像盒子一样的整体外形。', explanation: '像长方形盒子的物体整体接近长方体。' },
    { knowledgePointIds: ['solid-shape-features'], prompt: '哪一组立体图形都有平平的面？', options: ['球体和圆柱体', '正方体和长方体', '球体和球体'], correctOptionIndex: 1, hint: '正方体和长方体都像积木或盒子。', explanation: '正方体和长方体都有平平的面；球体没有平平的面。' },
    { knowledgePointIds: ['solid-shape-features'], prompt: '小文找一种能用圆形底面立在桌上、侧面又是弯弯的形体。她应选哪种？', options: ['圆柱体', '球体', '正方体'], correctOptionIndex: 0, hint: '同时找有平平圆底和弯曲侧面的形体。', explanation: '圆柱体的底面是平平的圆形，侧面是弯曲的，符合两条线索。' },
    { knowledgePointIds: ['solid-shape-use'], prompt: '把圆柱形罐子直立放到桌上，桌面碰到罐子的哪一部分？', options: ['平平的圆形底面', '弯弯的侧面', '罐子的颜色'], correctOptionIndex: 0, hint: '圆柱直立时，先看它朝下的一端。', explanation: '圆柱直立时，平平的圆形底面可以贴着桌面。' },
    { knowledgePointIds: ['solid-shape-use'], prompt: '分辨两个颜色一样的立体积木，哪种办法更可靠？', options: ['只比较哪个颜色更亮', '观察它们平平的面和弯曲的部分', '只比较哪个看起来更大'], correctOptionIndex: 1, hint: '颜色和大小不能说明它们的形状。', explanation: '观察平面和弯曲的部分，能帮助辨认立体图形。' },
    { knowledgePointIds: ['solid-shape-recognition', 'solid-shape-features'], prompt: '一个立体图形没有平平的面，最可能是哪一种？', options: ['长方体', '球体', '圆柱体'], correctOptionIndex: 1, hint: '比较球体、圆柱体和长方体的表面。', explanation: '球体没有平平的面；圆柱体和长方体都有平平的面。' },
  ],
  advanced: [
    { knowledgePointIds: ['solid-shape-recognition', 'solid-shape-features'], prompt: '一件物品有两个平平的圆形底面，中间一圈是弯弯的。它最像什么？', options: ['圆柱体', '球体', '正方体'], correctOptionIndex: 0, hint: '把两端的形状和中间侧面的样子一起考虑。', explanation: '两个圆形平底和弯曲的侧面是圆柱体的外形特征。' },
    { knowledgePointIds: ['solid-shape-use', 'solid-shape-features'], prompt: '球和圆柱都可能滚动。观察哪一点能把它们分开？', options: ['圆柱有平平的圆形底面，球没有平平的面', '球有两个圆形底面，圆柱没有', '只看哪个颜色更深'], correctOptionIndex: 0, hint: '同时观察它们的底面和弯曲部分。', explanation: '圆柱有平平的圆形底面；球体表面弯曲，没有平平的面。' },
    { knowledgePointIds: ['solid-shape-features'], prompt: '哪一种立体图形既有平平的面，也有弯弯的面？', options: ['正方体', '圆柱体', '球体'], correctOptionIndex: 1, hint: '圆柱的两端是平面，中间侧面是弯曲的。', explanation: '圆柱体既有平平的圆形底面，也有弯曲的侧面。' },
    { knowledgePointIds: ['solid-shape-use'], prompt: '想比较球和圆柱哪一个更容易滚，怎样做才公平？', options: ['放在同一张平桌上，分别轻轻推一下', '一个放在桌上，一个放在斜坡上', '只听同学猜哪个会滚'], correctOptionIndex: 0, hint: '比较时，两个物体要在相同的地方用相近的力推动。', explanation: '在同一张平桌上分别轻轻推动，比较条件更接近，观察更公平。' },
    { knowledgePointIds: ['solid-shape-use', 'solid-shape-features'], prompt: '小组想让积木塔站得稳，哪种安排更合适？', options: ['把球体放在最下面', '把有平平的面的长方体放在下面', '把积木的尖角朝下'], correctOptionIndex: 1, hint: '平平的底面更容易稳稳地贴住桌面。', explanation: '长方体有平平的面，放在下面作底座通常比球体或尖角更稳。' },
    { knowledgePointIds: ['solid-shape-recognition', 'solid-shape-features'], prompt: '有个物体侧面弯弯的，两端各有一个平平的圆面。它属于哪种图形？', options: ['球体', '长方体', '圆柱体'], correctOptionIndex: 2, hint: '逐条核对“弯曲侧面”和“两个圆形平面”。', explanation: '圆柱体的侧面弯曲，两端是平平的圆形底面。' },
    { knowledgePointIds: ['solid-shape-recognition', 'solid-shape-use'], prompt: '圆筒形笔筒和篮球的形状不同。哪项辨认最合适？', options: ['笔筒像圆柱，篮球像球体', '笔筒像球体，篮球像长方体', '它们都是正方体'], correctOptionIndex: 0, hint: '分别观察笔筒的圆形底和篮球的整体外形。', explanation: '圆筒形笔筒整体像圆柱体，篮球整体像球体。' },
    { knowledgePointIds: ['solid-shape-use'], prompt: '把一个圆柱体侧着放，再轻轻推它，最可能看到什么？', options: ['它可能沿弯曲的侧面滚动', '它一定像长方体一样不动', '它会变成球体'], correctOptionIndex: 0, hint: '圆柱体侧面是弯曲的。', explanation: '圆柱体侧着放时，弯曲的侧面接触桌面，轻推后可能滚动。' },
    { knowledgePointIds: ['solid-shape-features', 'solid-shape-use'], prompt: '球体和圆柱体都能滚。哪条观察记录能说明圆柱体还有平平的面？', options: ['圆柱直立时，圆形底面贴着桌面', '球体的颜色比圆柱深', '两个物体的大小不一样'], correctOptionIndex: 0, hint: '要找能直接观察到底面的证据。', explanation: '圆柱直立时，圆形底面能贴着桌面，说明它有平平的面。' },
    { knowledgePointIds: ['solid-shape-recognition', 'solid-shape-features'], prompt: '长方形礼盒整体像哪种立体图形？', options: ['长方体', '球体', '圆柱体'], correctOptionIndex: 0, hint: '把礼盒当作一个整体，看看它像不像长长的盒子。', explanation: '长方形礼盒整体接近长方体。' },
    { knowledgePointIds: ['solid-shape-use', 'solid-shape-features'], prompt: '要把“有平平的面”和“没有平平的面”分成两组，球体该放哪里？', options: ['有平平的面', '没有平平的面', '两组都放'], correctOptionIndex: 1, hint: '球体表面是弯曲的。', explanation: '球体没有平平的面，应放在“没有平平的面”一组。' },
    { knowledgePointIds: ['solid-shape-recognition', 'solid-shape-features'], prompt: '一块积木的外形方方的，和骰子整体相似，最像什么？', options: ['正方体', '圆柱体', '球体'], correctOptionIndex: 0, hint: '想想骰子和方方的积木的整体外形。', explanation: '骰子整体接近正方体。' },
    { knowledgePointIds: ['solid-shape-use'], prompt: '观察圆柱体能不能滚动，哪一步应该先做？', options: ['先把圆柱侧着放在平桌面上', '先说出最后的结论', '先换一个颜色相近的物体'], correctOptionIndex: 0, hint: '先摆好要观察的物体，再轻轻推动。', explanation: '先把圆柱侧着放在平桌面上，才能继续观察推动后的情况。' },
    { knowledgePointIds: ['solid-shape-features', 'solid-shape-recognition'], prompt: '转动一个立体物体后，判断形状时最应该记录什么？', options: ['看到的平平的面和弯曲部分', '物体的颜色变化', '谁拿物体的时间更长'], correctOptionIndex: 0, hint: '形状要根据物体本身的外形来判断。', explanation: '从不同方向观察平面和弯曲部分，有助于辨认形状。' },
  ],
  high: [
    { knowledgePointIds: ['solid-shape-use', 'solid-shape-features'], prompt: '小组要比较球和圆柱的滚动情况，哪套步骤更合理？', options: ['放在同一张平桌上 → 分别轻轻推 → 记录结果 → 比较观察', '先宣布答案 → 再找一个物体 → 只看颜色', '一个放桌上、一个拿在手里 → 直接比较'], correctOptionIndex: 0, hint: '比较前先让两个物体处在相同的观察条件下。', explanation: '先用相同桌面和相近的推动方式观察，再记录和比较，结论更有依据。' },
    { knowledgePointIds: ['solid-shape-recognition', 'solid-shape-features'], prompt: '一种立体图形能滚动，直立时又能用平平的圆面贴桌。它最可能是什么？', options: ['圆柱体', '球体', '长方体'], correctOptionIndex: 0, hint: '把“能滚”和“有平平的圆面”两条线索放在一起。', explanation: '圆柱体有弯曲的侧面，也有平平的圆形底面，符合两条线索。' },
    { knowledgePointIds: ['solid-shape-use', 'solid-shape-features'], prompt: '同伴说“球体也有一个平平的底面”。哪项观察能检查这句话？', options: ['把球转一转，看看有没有平平的面', '只看球的颜色', '比较球和盒子的大小'], correctOptionIndex: 0, hint: '检查形状特征要观察表面，而不是颜色和大小。', explanation: '球体转到不同方向，表面仍是弯曲的，没有平平的面。' },
    { knowledgePointIds: ['solid-shape-recognition', 'solid-shape-features'], prompt: '小组把骰子、圆筒罐和球分开记录。哪项记录正确？', options: ['骰子像正方体，圆筒罐像圆柱体，球像球体', '骰子像球体，圆筒罐像长方体，球像圆柱体', '三个物体都像长方体'], correctOptionIndex: 0, hint: '逐个观察三个物体的整体外形。', explanation: '骰子整体接近正方体，圆筒罐接近圆柱体，球接近球体。' },
    { knowledgePointIds: ['solid-shape-use'], prompt: '要搭一个不容易倒的积木塔，先后怎样安排更合理？', options: ['先放平平的长方体作底座，再把积木稳稳叠上去', '先用球作底座，再把长方体尖角朝下放', '先把所有积木放在圆柱的弯曲侧面上'], correctOptionIndex: 0, hint: '先选一个能平稳贴住桌面的底座。', explanation: '长方体有平平的面，先作底座并让平面接触，更容易搭稳。' },
    { knowledgePointIds: ['solid-shape-use', 'solid-shape-features'], prompt: '观察发现甲物体有弯曲的面但没有平平的面，乙物体既有弯曲的面，也有平平的圆面。哪项判断正确？', options: ['甲像球体，乙像圆柱体', '甲像圆柱体，乙像球体', '甲和乙都像正方体'], correctOptionIndex: 0, hint: '利用“有没有平平的面”区分球体和圆柱体。', explanation: '球体没有平平的面；圆柱体既有弯曲的侧面，也有平平的圆形底面。' },
    { knowledgePointIds: ['solid-shape-recognition', 'solid-shape-use'], prompt: '观察桌上的书盒时，哪条证据最能支持“它像长方体”？', options: ['它整体像长长的盒子，有平平的面', '它的颜色是蓝色', '它比弹珠大'], correctOptionIndex: 0, hint: '用整体外形和平面特征说明，不用颜色或大小猜。', explanation: '整体像长长的盒子并有平平的面，是它接近长方体的外形证据。' },
    { knowledgePointIds: ['solid-shape-use'], prompt: '小组要按“能滚动”和“通常不滚动”分类。哪种做法更可靠？', options: ['在同一张平桌上轻推各物体，再按观察结果分类', '只按物体颜色分类', '先把所有物体放进任意一组'], correctOptionIndex: 0, hint: '分类标准是滚动情况，先按同样方法观察。', explanation: '用同一张平桌和相近的推动方式观察，再按滚动情况分类，依据更一致。' },
    { knowledgePointIds: ['solid-shape-features', 'solid-shape-use'], prompt: '圆柱体侧着放和直立放，哪项比较结果合理？', options: ['侧着时弯曲的侧面能接触桌面，直立时圆形底面能贴桌面', '两种放法都只让球面贴桌面', '圆柱体一放到桌上就变成正方体'], correctOptionIndex: 0, hint: '先分清圆柱的侧面和两个圆形底面。', explanation: '圆柱侧着时侧面朝下，直立时一个圆形底面朝下。' },
    { knowledgePointIds: ['solid-shape-recognition', 'solid-shape-features'], prompt: '一个物体两端都是平平的圆面，中间一圈弯弯的。按线索判断，它是什么？', options: ['圆柱体', '球体', '长方体'], correctOptionIndex: 0, hint: '核对两端的形状和中间侧面的样子。', explanation: '两个平平的圆形底面和弯曲侧面是圆柱体的特征。' },
    { knowledgePointIds: ['solid-shape-use', 'solid-shape-features'], prompt: '同伴用“看起来更大”来判断两个物体的形状。怎样改进更合适？', options: ['转动并观察平平的面、弯曲的面和整体外形', '继续只比较大小', '换成比较物体的颜色'], correctOptionIndex: 0, hint: '大小和颜色不能代替形状特征。', explanation: '观察物体的平面、弯曲面和整体外形，才是辨认立体图形的依据。' },
    { knowledgePointIds: ['solid-shape-recognition', 'solid-shape-use'], prompt: '一组物品中有长方体盒子、圆柱罐和球。要找“有平平的面且整体像圆筒”的物品，应选哪一个？', options: ['圆柱罐', '长方体盒子', '球'], correctOptionIndex: 0, hint: '同时使用“有平平的面”和“像圆筒”两条线索。', explanation: '圆柱罐有平平的圆形底面，整体也像圆筒，符合两条线索。' },
    { knowledgePointIds: ['solid-shape-use', 'solid-shape-features'], prompt: '记录球、圆柱和长方体的观察结果，哪一行没有把特征弄混？', options: ['球没有平平的面；圆柱有平平的圆底和弯曲的侧面；长方体有平平的面', '球有两个圆形平底；圆柱没有平平的面；长方体全是弯曲面', '球和长方体都没有平平的面；圆柱只有方形面'], correctOptionIndex: 0, hint: '逐一核对球、圆柱和长方体的表面特点。', explanation: '球体没有平平的面，圆柱体有平底和弯曲侧面，长方体有平平的面。' },
    { knowledgePointIds: ['solid-shape-recognition', 'solid-shape-features'], prompt: '只看到一个物体一端的圆形平面，还不能确定它是圆柱体。接下来应观察什么？', options: ['另一端和周围侧面的样子', '物体的颜色', '物体拿起来有多重'], correctOptionIndex: 0, hint: '圆柱体的判断要同时看两端和中间侧面。', explanation: '还要观察另一端是否也是圆形平面，以及侧面是否弯曲；颜色和轻重不能说明形状。' },
  ],
};

export const grade1MathUnit04SupplementalActivities: Grade1MathUnit04SupplementalActivity[] =
  (Object.entries(drafts) as [Difficulty, ActivityDraft[]][]).flatMap(([difficulty, items]) => items.map((draft, index) => {
    const options = draft.options.map((label, optionIndex) => ({ id: `option-${optionIndex + 1}`, label }));
    return {
      difficulty,
      sourceUnitId,
      knowledgePointIds: [...draft.knowledgePointIds],
      activity: {
        id: `${idPrefix}-${difficulty}-${String(index + 1).padStart(2, '0')}`,
        kind: 'choice',
        prompt: draft.prompt,
        hint: draft.hint,
        explanation: draft.explanation,
        options,
        correctOptionId: options[draft.correctOptionIndex]!.id,
      },
    };
  }));
