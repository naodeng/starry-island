import type { ChoiceActivityDefinition, Difficulty } from '../../content/types';

export interface Grade2Term1MathUnit05SupplementalActivity {
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

const sourceUnitId = 'grade-2/term-1/math/unit-05';
const idPrefix = 'challenge-supplement-grade-2-term-1-math-unit-05';
const directions = 'object-view-directions';
const visibleInformation = 'visible-view-information';

const drafts: Record<Difficulty, ActivityDraft[]> = {
  basic: [
    { knowledgePointIds: [directions], prompt: '三块相同的小方块横着排成一行，观察者正对这一长边时，视图中会怎样排列？', answer: '三个正面左右并排', distractors: ['一个正面', '三个正面上下叠放'], hint: '观察者正对着方块的一整排。', explanation: '正对长边观察时，会看到三个方块的正面左右并排。' },
    { knowledgePointIds: [directions], prompt: '四块小方块排成一行，从这一行的短端朝里看，最先看到什么？', answer: '一个正面', distractors: ['四个正面左右并排', '四个顶面排成一行'], hint: '想象站在队伍的一端向里看。', explanation: '从短端观察时，最靠近观察者的方块挡住后面的方块。' },
    { knowledgePointIds: [directions], prompt: '桌上只放着一块小方块。从正面、侧面和上面观察，能看到的面数怎样？', answer: '每个方向各看到一个面', distractors: ['每个方向都看到三个面', '只有从正面才能看到面'], hint: '物体只有一块，而且没有其他方块挡住它。', explanation: '单独一块方块从这三个方向各能看到一个面。' },
    { knowledgePointIds: [directions], prompt: '两块小方块上下叠放，从正面观察时，两个正面会怎样？', answer: '两个正面上下排列', distractors: ['两个正面左右并排', '只能看到一个正面'], hint: '观察者站在方块前方，注意方块上下的位置。', explanation: '从正面看，上下叠放的两个方块面也会上下排列。' },
    { knowledgePointIds: [directions], prompt: '两块小方块上下叠放，观察者从正上方往下看，主要能看到什么？', answer: '上层方块的顶面', distractors: ['上下两个方块的正面', '下层方块的底面'], hint: '上面的方块会挡住下面方块的顶面。', explanation: '从上面往下看时，上层方块遮住下层方块的顶面。' },
    { knowledgePointIds: [directions], prompt: '三块方块排成一行，从正上方观察，顶面的位置会怎样？', answer: '三个顶面左右排成一行', distractors: ['一个顶面', '三个顶面上下叠在一起'], hint: '站到物体上方，沿着这一排往下看。', explanation: '从上面看，三个方块的顶面沿着原来的一行排列。' },
    { knowledgePointIds: [directions], prompt: '想看到一排方块朝着观察者的正面，应站在哪里？', answer: '站在这一排的正前方', distractors: ['站到方块的正上方', '站在这一排的短端'], hint: '观察方向要和要看的那一面相对。', explanation: '正对着方块正面观察，才能看到这一排的正面。' },
    { knowledgePointIds: [directions], prompt: '要查看方块摆放的行和列，哪种观察方式最合适？', answer: '从上方往下观察', distractors: ['只从方块短端观察', '只看最靠近自己的侧面'], hint: '行和列在桌面上怎样铺开，从上方更容易看清。', explanation: '俯视能看到方块在桌面上的行列位置。' },
    { knowledgePointIds: [visibleInformation], prompt: '从正面看到两个方块面左右并排，能确定桌上总共只有两块吗？', answer: '不能，还要观察其他方向', distractors: ['能，正面看到几个总数就是几个', '能，背面一定没有方块'], hint: '一个方向可能看不到被挡住或藏在后面的方块。', explanation: '正面视图只显示从正面能看到的信息，不能单独确定全部方块数量。' },
    { knowledgePointIds: [visibleInformation], prompt: '从上面看到一个顶面，能知道这个位置下面是否还叠着方块吗？', answer: '不能只凭这个视图判断', distractors: ['能，下面一定没有方块', '能，下面一定还有两块'], hint: '上面的方块可能挡住下面方块的顶面。', explanation: '顶面视图没有显示被上层挡住的部分，需要从其他方向观察。' },
    { knowledgePointIds: [directions], prompt: '同一排方块没有移动，观察者从正面改到短端，看到的形状可能怎样？', answer: '可能从多个面变成一个面', distractors: ['一定和原来完全相同', '方块会因此多出一排'], hint: '物体没变，但观察者站的位置变了。', explanation: '观察位置改变时，挡在前面的方块也不同，视图可能随之改变。' },
    { knowledgePointIds: [visibleInformation], prompt: '要让同伴看懂一张方块视图记录，最需要补上哪些信息？', answer: '观察方向和看到的排列', distractors: ['观察者的衣服颜色和身高', '桌子的大小和房间名称'], hint: '同伴要知道你从哪里看，以及看到了什么。', explanation: '写明观察方向和面的位置排列，别人才能理解或重复观察。' },
    { knowledgePointIds: [directions], prompt: '五块方块排成一行，观察者从这一行的短端看过去，哪种描述最准确？', answer: '主要看到最前面的方块，后面的方块被挡住', distractors: ['能看到五个正面排成一行', '能看到五个底面上下排列'], hint: '从一端看时，后面的方块和最前面的方块在同一视线方向。', explanation: '从短端观察时，前面的方块会遮挡后面方块的正面。' },
    { knowledgePointIds: [visibleInformation], prompt: '从正面看不到方块背后的位置，想确认那里有没有方块，接下来怎样做？', answer: '换到另一方向继续观察', distractors: ['直接说背后没有方块', '只把正面图画得更大'], hint: '没有看到的信息不能当作已经确认。', explanation: '从侧面或上面补充观察，才能获得原视图没有展示的信息。' },
  ],
  advanced: [
    { knowledgePointIds: [directions], prompt: '两块方块左右并排与两块方块上下叠放，从正面观察的排列有什么区别？', answer: '前一种左右排，后一种上下排', distractors: ['两种都只看到一个面', '前一种上下排，后一种左右排'], hint: '先比较方块在桌面上和竖直方向的位置。', explanation: '正面视图会保留方块在左右和上下方向的排列。' },
    { knowledgePointIds: [directions], prompt: '桌面上摆着两行方块，每行三个。站在正上方观察，怎样记录顶面？', answer: '两行顶面，每行三个', distractors: ['一行顶面，共两个', '三个顶面上下叠放'], hint: '从上面数桌面上的行和每行的个数。', explanation: '俯视时能记录为两行，每行三个顶面。' },
    { knowledgePointIds: [visibleInformation], prompt: '从正上方只看到一个顶面，能判断这一列方块的高度吗？', answer: '不能，顶面视图没有显示高度', distractors: ['能，只有一块方块', '能，方块一定叠了三层'], hint: '从上面看不到上下叠放的层数。', explanation: '同一个顶面下面可能有一块或多块方块，单看顶面不能判断高度。' },
    { knowledgePointIds: [visibleInformation], prompt: '从正面看到三个面横向排列，下面哪条结论有足够依据？', answer: '正面可见三个面横向排列', distractors: ['物体总共只有三块方块', '背后没有其他方块'], hint: '结论只说视图中实际看见的内容。', explanation: '正面视图能说明可见面的排列，不能说明被遮挡的背后。' },
    { knowledgePointIds: [directions, visibleInformation], prompt: '比较同一摆放从正面和侧面看到的形状时，哪种做法更公平？', answer: '保持方块不动，只改变观察位置', distractors: ['同时移动方块并更换观察位置', '每次都改变方块数量'], hint: '一次只改变一个条件，差异更容易解释。', explanation: '保持摆放不变、只改变观察方向，可以比较方向对视图的影响。' },
    { knowledgePointIds: [visibleInformation], prompt: '从上面看到一行三个顶面，能确认哪项？', answer: '上面可见的位置有三个顶面排成一行', distractors: ['整个物体只有三个方块', '每个顶面下面都只有一块'], hint: '只描述视图直接呈现的部分。', explanation: '俯视图显示顶面位置，不一定呈现下面叠放的方块。' },
    { knowledgePointIds: [directions], prompt: '正面视图里两个方块面上下排列，最可能是哪种摆法？', answer: '同一位置上下叠着两块方块', distractors: ['两块方块在桌面上左右并排', '两块方块相隔很远地放着'], hint: '正面看到的上下关系对应物体的上下位置。', explanation: '两个面在正面视图中上下排列，说明对应方块上下叠放。' },
    { knowledgePointIds: [directions, visibleInformation], prompt: '从上面看到两个顶面前后排成一列；只凭这个视图能确定方块的总数吗？', answer: '不能确定下面是否还叠着方块', distractors: ['能确定正好有两块', '能确定一共有四块'], hint: '俯视图主要显示顶面位置，不显示每个位置的高度。', explanation: '两个顶面说明有两个可见位置，不能单独确定下层是否还有方块。' },
    { knowledgePointIds: [visibleInformation], prompt: '从侧面只看到一个方块面，哪项说法最稳妥？', answer: '这个方向的视图中可见一个面', distractors: ['物体一共只有一个方块', '方块背面一定是空的'], hint: '把结论范围限制在当前观察方向。', explanation: '单个方向的视图只说明当前能看到的面。' },
    { knowledgePointIds: [directions], prompt: '正面视图有两个面左右排成一行，方块至少占了什么位置？', answer: '左右相邻的两个位置', distractors: ['上下相邻的两个位置', '前后重叠的两个位置'], hint: '正面视图中的左右方向对应观察者眼前的左右。', explanation: '两个面左右并排，表示正面可见的位置在左右方向相邻。' },
    { knowledgePointIds: [visibleInformation], prompt: '同伴想知道方块后面是否还有遮挡部分，哪种证据最有帮助？', answer: '再从侧面或后面观察', distractors: ['把正面视图重复抄一遍', '只记录方块的颜色'], hint: '要检查被挡住的位置，需要换一个视线方向。', explanation: '侧面或后面视图能补充正面看不到的信息。' },
    { knowledgePointIds: [directions, visibleInformation], prompt: '两位同学报告的视图不同，但他们观察的是同一组方块。先核对什么？', answer: '两人站的位置和观察方向', distractors: ['两人的书本颜色', '记录时使用的笔'], hint: '同一物体从不同位置看，视图可能不同。', explanation: '先统一摆放和观察方向，再判断报告是否不同。' },
    { knowledgePointIds: [directions], prompt: '正面看到两个面上下排列，侧面却只看到一个面。哪种观察解释合理？', answer: '从正面和侧面看到的方向不同', distractors: ['方块在观察时自动消失', '侧面视图会显示正面全部内容'], hint: '每个方向只显示面向观察者的一部分。', explanation: '正面与侧面显示的可见面不同，排列也可能不同。' },
    { knowledgePointIds: [visibleInformation], prompt: '一张观察记录写“从上面看到左右相邻的两个顶面”，下面哪句话应标成推测而不是观察结果？', answer: '每个顶面下面都没有其他方块', distractors: ['图上有两个可见顶面', '两个顶面左右相邻'], hint: '没有观察到的下层位置，不能直接写成事实。', explanation: '顶面图没有显示下层，关于下层是否有方块只能继续观察，不能直接断定。' },
  ],
  high: [
    { knowledgePointIds: [directions, visibleInformation], prompt: '正面、侧面和上面视图都显示同一组方块。要让同伴复摆模型，还必须说明什么？', answer: '方块怎样摆放以及每幅图的观察方向', distractors: ['观察者喜欢的颜色', '画图使用了几支笔'], hint: '复摆时要知道模型结构，也要知道每幅图从哪里看。', explanation: '摆放结构和观察方向能让同伴按相同条件搭建并核对视图。' },
    { knowledgePointIds: [visibleInformation], prompt: '正面图看到两个面左右并排，顶面图看到两个顶面前后排列。哪项结论不超出图示证据？', answer: '正面可见两个面左右并排，顶面可见两个顶面前后排列', distractors: ['物体背后没有方块', '每个位置下面都没有方块'], hint: '只记录两个方向分别显示的内容，不推测被遮挡的部分。', explanation: '可以分别记录正面和顶面视图中的排列，不能据此排除背后或下层的方块。' },
    { knowledgePointIds: [directions, visibleInformation], prompt: '顶面图只画出一个顶面，模型可能是一块方块，也可能是同一位置叠放多块。应补看哪个方向？', answer: '从正面或侧面观察高度', distractors: ['继续只从正上方看', '只观察桌面的颜色'], hint: '要区分上下层数，需要能显示高度的视图。', explanation: '正面或侧面视图可以显示上下叠放的层数。' },
    { knowledgePointIds: [visibleInformation], prompt: '观察报告中既有“看到两个顶面”，也有“背后没有方块”。怎样修改更严谨？', answer: '保留可见顶面的记录，把背后情况标为待观察', distractors: ['把两句话都写成确定事实', '删掉所有观察结果'], hint: '区分直接看见的内容和还没有验证的判断。', explanation: '顶面是直接观察结果，背后是否有方块需要换方向再确认。' },
    { knowledgePointIds: [directions, visibleInformation], prompt: '同一组方块的正面图和侧面图对不上，想排查原因，第一步做什么？', answer: '固定模型并确认每幅图的观察方向', distractors: ['先增加更多方块', '不核对条件就重画所有视图'], hint: '先排除模型移动或方向标错，再判断视图。', explanation: '固定摆放并核对观察方向，可以找出不一致来自操作还是记录。' },
    { knowledgePointIds: [directions], prompt: '从正面看是两个面上下排列，从上面看只有一个顶面。哪种摆法能同时符合？', answer: '同一位置上下叠放两块方块', distractors: ['两个方块左右并排在桌面上', '两个方块前后相隔放置'], hint: '上下叠放会改变正面高度，但上方只露出最上面的顶面。', explanation: '同一位置上下叠放时，正面可见两个高度，顶面只露出上层方块。' },
    { knowledgePointIds: [visibleInformation], prompt: '从上面看见两行、每行两个顶面。为什么仍不能直接断定模型恰好有四块？', answer: '顶面图没有显示这些位置下面是否还有方块', distractors: ['因为顶面图不能数行', '因为看到的顶面都不属于方块'], hint: '一个顶面下面可能还叠着方块。', explanation: '俯视图显示顶面位置，不显示这些位置的高度，因此总数可能更多。' },
    { knowledgePointIds: [directions, visibleInformation], prompt: '要判断“上下叠放”和“前后排放”是否可能有相同顶面图，哪种检查更有效？', answer: '再比较正面或侧面显示的高度和前后位置', distractors: ['只比较方块的颜色', '重复查看同一张顶面图'], hint: '顶面图的高度信息有限，换方向能补充线索。', explanation: '正面或侧面视图能提供顶面图没有显示的层数和排列信息。' },
    { knowledgePointIds: [directions], prompt: '正面图有三个面左右排列，侧面图有两个面上下排列。记录时怎样避免把方向弄反？', answer: '分别给两幅图标明正面和侧面观察方向', distractors: ['把两幅图都写成“上面看”', '只写“有几个面”'], hint: '相同的面数，方向不同，排列含义也不同。', explanation: '标明每幅图的观察方向，才能把排列和物体位置对应起来。' },
    { knowledgePointIds: [visibleInformation], prompt: '同伴根据一幅正面图说“背面没有方块”。你怎样回应最有依据？', answer: '正面图没有展示背面，需要再观察', distractors: ['正面图能看到整个物体', '背面一定和正面一样'], hint: '图没有显示的部分，还不能由这幅图确定。', explanation: '正面视图不能说明背面的情况，需要从其他方向补充观察。' },
    { knowledgePointIds: [directions, visibleInformation], prompt: '设计一张能被别人复核的多方向观察卡，哪些记录最完整？', answer: '固定的方块摆放、每次观察方向和可见排列', distractors: ['只写观察者姓名和日期', '只写模型有趣或好看'], hint: '别人需要知道如何摆、从哪里看，以及看到了什么。', explanation: '摆放、方向和可见排列共同构成可复核的观察记录。' },
    { knowledgePointIds: [directions], prompt: '同一组方块摆放保持不变，两位同学分别从正面和上面观察，为什么记录可能不同？', answer: '两人的观察方向不同', distractors: ['同一组方块会自动改变数量', '记录文字会改变视图'], hint: '观察者的位置和视线方向会影响看到的面。', explanation: '同一摆放从不同方向观察，可见的面和排列可能不同。' },
    { knowledgePointIds: [visibleInformation], prompt: '完成方块观察项目时，哪种顺序能让结论有依据？', answer: '固定摆放、确定方向、观察记录、再比较推想', distractors: ['先猜背面，再随意移动方块', '先写结论，之后才确定观察方向'], hint: '先收集可复核的观察结果，再进行比较和推想。', explanation: '先固定条件、记录视图，再根据证据比较，避免把猜测当成观察。' },
    { knowledgePointIds: [directions, visibleInformation], prompt: '如果只保留一幅视图，哪项说明能清楚表达它的能力和限制？', answer: '标出观察方向，并注明它只显示该方向可见部分', distractors: ['说明这幅图显示了物体全部信息', '不写方向，只给方块总数'], hint: '视图有用，但不能显示所有被挡住的位置。', explanation: '方向标签能解释可见内容，也提醒读者不要把未显示部分当成已确认事实。' },
  ],
};

export const grade2Term1MathUnit05SupplementalActivities: Grade2Term1MathUnit05SupplementalActivity[] = Object.entries(drafts).flatMap(([difficulty, items]) => (
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
