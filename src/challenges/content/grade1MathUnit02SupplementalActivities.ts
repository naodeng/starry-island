import type { ChoiceActivityDefinition, Difficulty } from '../../content/types';

export interface Grade1MathUnit02SupplementalActivity {
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

const sourceUnitId = 'grade-1/term-1/math/unit-02';
const idPrefix = 'challenge-supplement-grade-1-term-1-math-unit-02';

const drafts: Record<Difficulty, ActivityDraft[]> = {
  basic: [
    { knowledgePointIds: ['relative-position'], prompt: '以小桌为参照，小书放在桌子的上面。小书在哪里？', options: ['桌子上面', '桌子下面', '桌子里面'], correctOptionIndex: 0, hint: '先找出题目指定的参照物，再读位置词。', explanation: '小桌是参照物，小书在它的上面。' },
    { knowledgePointIds: ['relative-position'], prompt: '小球在椅子的下面。以小球为参照，椅子在什么位置？', options: ['小球上面', '小球下面', '小球里面'], correctOptionIndex: 0, hint: '把“谁在谁下面”倒过来说一说。', explanation: '小球在椅子下面，反过来就是椅子在小球上面。' },
    { knowledgePointIds: ['relative-position'], prompt: '小猫站在小树的左边。以小猫为参照，小树在哪边？', options: ['左边', '右边', '后面'], correctOptionIndex: 1, hint: '两边互换时，左边和右边也要互换。', explanation: '小猫在小树左边，所以小树在小猫右边。' },
    { knowledgePointIds: ['relative-position'], prompt: '铅笔放在笔袋里面。笔袋在铅笔的什么位置？', options: ['里面', '外面', '上面'], correctOptionIndex: 1, hint: '想一想笔袋和铅笔谁装着谁。', explanation: '铅笔在笔袋里面，笔袋在铅笔外面。' },
    { knowledgePointIds: ['relative-position'], prompt: '小狗排在小兔的前面。小兔在小狗的哪边？', options: ['前面', '后面', '左边'], correctOptionIndex: 1, hint: '把“谁在谁前面”反过来说。', explanation: '小狗在小兔前面，小兔就在小狗后面。' },
    { knowledgePointIds: ['reference-point'], prompt: '小明面向黑板站着，窗户在他的左边。题目说的是窗户相对谁的位置？', options: ['小明', '黑板', '教室门'], correctOptionIndex: 0, hint: '看句子里是谁在观察窗户的位置。', explanation: '窗户在小明的左边，参照物是小明。' },
    { knowledgePointIds: ['reference-point', 'relative-position'], prompt: '从教室门口面向教室里面看，书架在右边。书架相对门口在哪边？', options: ['右边', '左边', '后面'], correctOptionIndex: 0, hint: '观察方向已经说明，不要换一个人的视角。', explanation: '题目规定从门口面向教室里面看，书架在右边。' },
    { knowledgePointIds: ['route-sequence'], prompt: '小猫从门口出发，先向左走，再向前走。向左走之后，下一步是什么？', options: ['到达门口', '向前走', '向右走'], correctOptionIndex: 1, hint: '按题目给出的先后顺序找第二步。', explanation: '路线先向左，再向前，所以第二步是向前走。' },
    { knowledgePointIds: ['reference-point'], prompt: '要让同学找到水杯，只说“在那边”不够。还应说明什么？', options: ['水杯的颜色', '以什么为参照、在什么位置', '谁先喝水'], correctOptionIndex: 1, hint: '位置描述要让别人知道从哪里看、物品在哪里。', explanation: '说明参照物和相对位置，别人才能找到水杯。' },
    { knowledgePointIds: ['relative-position'], prompt: '把位置关系分到“左右”一类。哪句话符合？', options: ['球在盒子里面', '书在桌子左边', '小狗在小猫后面'], correctOptionIndex: 1, hint: '左右是一组方向词。', explanation: '“左边”属于左右位置关系。' },
    { knowledgePointIds: ['relative-position'], prompt: '小树在滑梯的右边。以小树为参照，滑梯在哪边？', options: ['左边', '右边', '上面'], correctOptionIndex: 0, hint: '把参照物和被比较的物体交换。', explanation: '小树在滑梯右边，滑梯就在小树左边。' },
    { knowledgePointIds: ['relative-position'], prompt: '盒子在桌子的下面。以盒子为参照，桌子在哪里？', options: ['上面', '下面', '里面'], correctOptionIndex: 0, hint: '上下位置互换后，方向词也互换。', explanation: '盒子在桌子下面，桌子在盒子上面。' },
    { knowledgePointIds: ['reference-point', 'relative-position'], prompt: '小红和小明都面向黑板站着。两人的左手分别朝向哪里？', options: ['同一个方向', '相反方向', '黑板上方'], correctOptionIndex: 0, hint: '先看两人的身体朝向是否相同，再比较左右。', explanation: '两人都面向黑板，朝向相同，所以两人的左手也朝向同一个方向。' },
    { knowledgePointIds: ['route-sequence'], prompt: '从起点出发，先向右走到书架，再向前走到桌子。哪一步先发生？', options: ['向前走到桌子', '向右走到书架', '到达桌子后出发'], correctOptionIndex: 1, hint: '找“先”字后面的动作。', explanation: '路线先向右走到书架，再向前走到桌子。' },
  ],
  advanced: [
    { knowledgePointIds: ['relative-position'], prompt: '铅笔在笔袋里面，笔袋在书包里面。铅笔相对书包在哪里？', options: ['书包里面', '书包外面', '书包上面'], correctOptionIndex: 0, hint: '先看笔袋在哪里，再把铅笔的位置继续往外找。', explanation: '铅笔在笔袋里面，笔袋又在书包里面，所以铅笔也在书包里面。' },
    { knowledgePointIds: ['relative-position'], prompt: '小兔、小熊和小猫排成一列。小兔在小熊后面，小猫在小兔后面。谁排在最前面？', options: ['小猫排在最前面', '小熊排在最前面', '小兔排在最前面'], correctOptionIndex: 1, hint: '按从前到后的关系把三只小动物排一排。', explanation: '从前到后是小熊、小兔、小猫，所以小熊排在最前面。' },
    { knowledgePointIds: ['relative-position', 'reference-point'], prompt: '小红站在教室里面向黑板，桌子在她和黑板之间。以小红为参照，桌子在哪里？', options: ['正前方', '正后方', '左边'], correctOptionIndex: 0, hint: '先确定小红面向哪里，再判断桌子的方向。', explanation: '小红面向黑板，桌子在她和黑板之间，所以桌子在小红正前方。' },
    { knowledgePointIds: ['reference-point', 'relative-position'], prompt: '小明面向窗户，窗户在他的正前方。他向左转后，窗户在他的哪边？', options: ['右边', '左边', '后面'], correctOptionIndex: 0, hint: '小明转向左边后，原来正前方的窗户会落在身体哪侧？', explanation: '原来正前方的窗户在左转后位于小明右边。' },
    { knowledgePointIds: ['reference-point'], prompt: '同学说“球在左边”，伙伴不知道从谁的位置看。补充哪项最有用？', options: ['说清观察者和参照物', '说球的颜色', '说球是谁买的'], correctOptionIndex: 0, hint: '左右要结合观察者的位置和方向来理解。', explanation: '说明观察者和参照物，才能确定“左边”指哪里。' },
    { knowledgePointIds: ['route-sequence'], prompt: '小明从门口出发，先向右走到书架，再向前走到窗边。到书架后应该怎么走？', options: ['向前走到窗边', '回到门口', '向左走到起点'], correctOptionIndex: 0, hint: '按路线的第二步继续走。', explanation: '到书架后，路线要求再向前走到窗边。' },
    { knowledgePointIds: ['relative-position'], prompt: '球在盒子里面。交换“球”和“盒子”，再把“里面”换成“外面”，哪句话表示同一个位置事实？', options: ['球在盒子外面', '盒子在球外面', '球在盒子上面'], correctOptionIndex: 1, hint: '按题目要求，交换两个物体名称，再换位置词。', explanation: '球在盒子里面，交换物体并把“里面”换成“外面”，就是盒子在球外面。' },
    { knowledgePointIds: ['relative-position'], prompt: '小红和小明面对面站着，球在小红的左边。站在小明的位置看，球在哪边？', options: ['左边', '右边', '上面'], correctOptionIndex: 1, hint: '两个人面对面时，左右方向相反。', explanation: '小红和小明面对面，小红的左边是小明的右边。' },
    { knowledgePointIds: ['route-sequence'], prompt: '路线卡要写“从起点向前走到树旁，再向右走到椅子旁”。哪一项是路线的终点？', options: ['起点', '树旁', '椅子旁'], correctOptionIndex: 2, hint: '看最后到达的地点。', explanation: '路线最后到达椅子旁，所以终点是椅子旁。' },
    { knowledgePointIds: ['reference-point', 'relative-position'], prompt: '以书桌为参照，书包在书桌左边。只改变参照物为书包后，书桌在哪里？', options: ['书包左边', '书包右边', '书包里面'], correctOptionIndex: 1, hint: '把两个物体交换，左右关系也随之交换。', explanation: '书包在书桌左边，书桌就在书包右边。' },
    { knowledgePointIds: ['relative-position'], prompt: '铅笔放在笔袋里面，笔袋放在桌子下面。以桌子为参照，铅笔在哪里？', options: ['桌子下面', '桌子里面', '桌子上面'], correctOptionIndex: 0, hint: '先看笔袋相对桌子的位置，再判断里面的铅笔。', explanation: '笔袋在桌子下面，放在笔袋里面的铅笔也在桌子下面。' },
    { knowledgePointIds: ['reference-point'], prompt: '要说明窗户在教室左边，哪种说法更清楚？', options: ['窗户在那里', '面向黑板时，窗户在观察者左边', '窗户很明亮'], correctOptionIndex: 1, hint: '清楚的描述要交代观察方向。', explanation: '说明面向黑板并指出左边，位置关系就更明确。' },
    { knowledgePointIds: ['route-sequence'], prompt: '路线是“从门口出发 → 向左走到书架 → 向前走到桌子”。向前走之前先要到哪里？', options: ['书架', '门口外面', '桌子后面'], correctOptionIndex: 0, hint: '找到路线中紧挨着向前走之前的地点。', explanation: '先向左走到书架，然后才向前走到桌子。' },
    { knowledgePointIds: ['relative-position', 'reference-point'], prompt: '小猫在小狗的左边。小狗向小猫的方向走，应该朝哪边走？', options: ['向左', '向右', '向后'], correctOptionIndex: 0, hint: '先把小猫相对小狗的位置说出来。', explanation: '小猫在小狗左边，小狗要向左才能朝小猫走。' },
  ],
  high: [
    { knowledgePointIds: ['route-sequence', 'reference-point'], prompt: '从门口面向教室里面出发，先向右走到储物柜；到储物柜后原地向左转，再向前走到窗边。哪张路线卡完整保留起点、转向和终点？', options: ['门口 → 向右到储物柜 → 左转后向前到窗边', '门口 → 向左到储物柜 → 左转后向前到窗边', '窗边 → 向右到储物柜 → 门口'], correctOptionIndex: 0, hint: '按行走顺序检查起点、到达地点、转向和最后地点。', explanation: '路线从门口开始，先向右到储物柜，再原地左转并向前到窗边。' },
    { knowledgePointIds: ['route-sequence', 'reference-point', 'relative-position'], prompt: '从门口面向教室里面看，书架在正前方，窗户在左边，桌子在右边。小明要依次到书架、窗户、桌子；每到一站都先回到面向教室里面的方向再出发。哪张路线卡同时写对地点顺序和方向？', options: ['门口 → 向前到书架 → 向左到窗户 → 向右到桌子', '门口 → 向左到书架 → 向前到窗户 → 向右到桌子', '门口 → 向前到书架 → 向右到窗户 → 向左到桌子'], correctOptionIndex: 0, hint: '先按指定顺序列出地点，再逐一对照每个地点相对门口的方向。', explanation: '书架在正前方，窗户在左边，桌子在右边；按要求依次到达即可。' },
    { knowledgePointIds: ['relative-position', 'reference-point', 'route-sequence'], prompt: '小红面向黑板时，门口在她身后，书架在她左边，窗户在右边。她原地转身面向门口后，要先到窗户，再到书架。哪张路线卡既写对方向又保留先后顺序？', options: ['先向左到窗户，再向右到书架', '先向右到窗户，再向左到书架', '先向左到书架，再向右到窗户'], correctOptionIndex: 0, hint: '门口在身后，转身后左右互换；再核对先到窗户、后到书架的顺序。', explanation: '小红原地转身后，窗户在左边、书架在右边；按要求先到窗户，再到书架。' },
    { knowledgePointIds: ['relative-position'], prompt: '小球在椅子下面，椅子在桌子下面。小组要按这两个关系排出位置顺序，哪张摆放卡正确，并说明小球相对桌子的位置？', options: ['从上到下：桌子、椅子、小球；小球在桌子下面', '从上到下：小球、椅子、桌子；小球在桌子上面', '从上到下：桌子、小球、椅子；小球在桌子下面'], correctOptionIndex: 0, hint: '先把椅子放在桌子下面，再把小球放在椅子下面。', explanation: '桌子在上、椅子在中间、小球在下，所以小球也在桌子下面。' },
    { knowledgePointIds: ['route-sequence'], prompt: '路线要求从门口先向前到树旁，再向右到小屋。小明的卡片写成“先向右到树旁，再向左到小屋”。哪项修改能同时纠正两步方向、保留地点顺序，并到达正确终点？', options: ['先把第一步改为向前，再把第二步改为向右；小屋是终点', '交换树旁和小屋的先后顺序；树旁是终点', '保留两步方向，只把门口改为终点'], correctOptionIndex: 0, hint: '分别核对到达树旁和小屋的方向，再检查地点顺序与最后地点。', explanation: '路线应从门口向前到树旁，再向右到小屋；两步方向和先后顺序都要符合要求。' },
    { knowledgePointIds: ['relative-position', 'reference-point', 'route-sequence'], prompt: '从门口面向教室里面，椅子在左边，书架在正前方。路线卡要先到椅子、再到书架，怎样安排？', options: ['先向左到椅子，再向前到书架', '先向前到书架，再向左到椅子', '向右到椅子，再向后到书架'], correctOptionIndex: 0, hint: '先按位置找到第一站，再依照路线顺序安排下一站。', explanation: '椅子在左边，书架在正前方；先向左到椅子，再向前到书架。' },
    { knowledgePointIds: ['relative-position', 'reference-point'], prompt: '小明面向黑板，桌子在正前方，书柜在左边。他向右转后，桌子和书柜分别在哪里？', options: ['桌子在左边，书柜在后面', '桌子在右边，书柜在前面', '桌子在后面，书柜在右边'], correctOptionIndex: 0, hint: '分别判断两个物体转向后相对小明的位置。', explanation: '右转后，原来正前方的桌子在左边；原来左边的书柜在后面。' },
    { knowledgePointIds: ['route-sequence', 'reference-point', 'relative-position'], prompt: '从门口面向教室里面看，窗户在左边，书架在正前方。路线要求先到窗户、再到书架，最后回到门口；每到一站后都先转回面向教室里面的方向。小组比较三张路线卡，哪张满足地点顺序并走完回程？', options: ['甲：门口 → 向左到窗户 → 转回面向教室里面再向前到书架 → 向后回到门口', '乙：门口 → 向前到书架 → 向左到窗户 → 向后回到门口', '丙：门口 → 向左到窗户 → 转回面向教室里面再向前到书架'], correctOptionIndex: 0, hint: '同时检查中间地点的先后、每站出发前的朝向，以及最后有没有回到门口。', explanation: '甲先向左到窗户，转回面向教室里面后向前到书架，再向后回到门口；乙调换了地点顺序，丙少了回程。' },
    { knowledgePointIds: ['route-sequence'], prompt: '路线卡甲写着“门口 → 向前到书架 → 向右到窗边”；路线卡乙写着“门口 → 向右到书架 → 向前到窗边”。题目要求第一步向前到书架，哪张卡符合？', options: ['甲，因为第一步是向前到书架。', '乙，因为两张卡的终点都是窗边。', '两张卡都符合，因为起点一样。'], correctOptionIndex: 0, hint: '先核对题目规定的第一步，再看两张卡的顺序。', explanation: '甲先向前到书架，符合要求；终点相同不能代替核对步骤顺序。' },
    { knowledgePointIds: ['reference-point', 'relative-position'], prompt: '小明面向黑板时，桌子在正前方，书柜在左边。他先转身面向门口，再向右转。小红说：“桌子在左边，书柜在前面。”她说得对吗？', options: ['不对：桌子在右边，书柜在正前方。', '对：桌子在左边，书柜在正前方。', '不对：桌子在后面，书柜在右边。'], correctOptionIndex: 0, hint: '先确定两次转向后的朝向，再分别判断两件物品的位置。', explanation: '两次转向后，小明面向原来的左边；桌子在他的右边，书柜在正前方。' },
    { knowledgePointIds: ['route-sequence'], prompt: '路线计划是“从门口出发，先向左到书架，再向前到桌子”。伙伴的卡片写成“门口 → 向前到书架 → 向左到桌子”。哪项最准确地说明卡片的问题？', options: ['起点门口不对，应该从桌子出发', '到书架的第一步方向、到桌子的第二步方向都和计划不一致', '书架不能放在路线中间，必须直接到桌子'], correctOptionIndex: 1, hint: '分别对照计划和卡片中的起点、地点顺序、每一步方向。', explanation: '起点和地点顺序一致，但到书架、到桌子的两步方向都与计划不同。' },
    { knowledgePointIds: ['relative-position', 'reference-point'], prompt: '从门口面向教室里面看，小猫在小树右边，花盆在小树前面，而且小猫和花盆的左右位置不一样。小明想判断小猫和花盆谁更靠右，只知道这些话还不够。还需要补充什么信息？', options: ['需要知道花盆在小猫的左边还是右边', '需要知道小猫是什么颜色', '需要知道小树有多高'], correctOptionIndex: 0, hint: '两者左右位置不一样时，要直接比较谁更靠右，需要知道花盆相对小猫在哪边。', explanation: '已知两者左右位置不一样，还要知道花盆相对小猫在左边还是右边，才能判断谁更靠右。' },
    { knowledgePointIds: ['relative-position', 'reference-point'], prompt: '小明和小红面对面站着，描述同一张桌子的位置：两人都说“桌子在我左边”。哪项判断正确？', options: ['两句话不能同时正确；面对面时，同一张桌子应在一人左边、另一人右边', '两句话一定同时正确，因为桌子没有移动', '只看桌子的颜色就能判断'], correctOptionIndex: 0, hint: '先比较两人的观察方向，再判断同一张桌子的左右。', explanation: '两人面对面，左右方向相反；同一张桌子不能同时在两人的左边。' },
    { knowledgePointIds: ['relative-position', 'reference-point', 'route-sequence'], prompt: '从门口面向教室里面看，椅子在左边，书架在正前方。路线要求先到椅子、再到书架，最后回到门口。哪张路线卡符合地点和先后顺序？', options: ['门口 → 椅子 → 书架 → 门口', '门口 → 书架 → 椅子 → 门口', '椅子 → 门口 → 书架 → 门口'], correctOptionIndex: 0, hint: '检查路线从哪里开始、先后经过哪些地点，以及最后停在哪里。', explanation: '正确路线从门口出发，先到左边的椅子，再到正前方的书架，最后回到门口。' },
  ],
};

export const grade1MathUnit02SupplementalActivities: Grade1MathUnit02SupplementalActivity[] =
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
