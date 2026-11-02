import type { ChoiceActivityDefinition, Difficulty } from '../../content/types';

export interface Grade2Term1MathUnit04SupplementalActivity {
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

const sourceUnitId = 'grade-2/term-1/math/unit-04';
const idPrefix = 'challenge-supplement-grade-2-term-1-math-unit-04';
const groups = 'equal-groups-multiplication';
const facts = 'multiplication-facts';

const drafts: Record<Difficulty, ActivityDraft[]> = {
  basic: [
    { knowledgePointIds: [groups], prompt: '4个2相加，哪道乘法算式表示这个意思？', answer: '4 × 2', distractors: ['4 + 2', '4 - 2'], hint: '数一数有几份相同的2。', explanation: '4个2相加可以写成4乘2。' },
    { knowledgePointIds: [groups], prompt: '3 + 3 + 3 + 3可以怎样写成乘法？', answer: '4 × 3', distractors: ['3 × 3', '4 + 3'], hint: '相同的加数3出现了几次？', explanation: '加数3出现4次，所以可以写成4乘3。' },
    { knowledgePointIds: [groups], prompt: '算式2 × 5中的2表示什么？', answer: '有2组', distractors: ['每组有2个', '一共有5组'], hint: '按“组数乘每组数量”读这个算式。', explanation: '第一个因数表示组数，2乘5表示有2组、每组5个。' },
    { knowledgePointIds: [groups, facts], prompt: '每袋装6颗星星，3袋一共有多少颗？', answer: '18颗', distractors: ['9颗', '24颗'], hint: '用3个6相加，也可以用口诀计算。', explanation: '3组、每组6颗，列式3乘6，结果是18颗。' },
    { knowledgePointIds: [groups], prompt: '5个4相加，下面哪一项写出了相同的加数？', answer: '4 + 4 + 4 + 4 + 4', distractors: ['5 + 4 + 4', '4 + 4 + 4'], hint: '一共有5个加数，每个加数都是4。', explanation: '5个4相加就是把4连续相加5次。' },
    { knowledgePointIds: [groups], prompt: '5组积木，每组4块，哪道算式表示积木总数？', answer: '5 × 4', distractors: ['5 + 4', '5 × 5'], hint: '第一个数写组数，第二个数写每组数量。', explanation: '5组、每组4块，应写成5乘4。' },
    { knowledgePointIds: [groups], prompt: '哪种情况是每组数量相同，可以用乘法表示？', answer: '4盘，每盘放3个橘子', distractors: ['一个篮子放2个苹果，另一个放5个', '桌上有3本书和4支笔'], hint: '乘法情境里的每组要有同样多的物品。', explanation: '每盘都放3个，属于几个相同数量的分组。' },
    { knowledgePointIds: [facts], prompt: '每行摆6颗星星，摆成2行，一共摆了多少颗？', answer: '12颗', distractors: ['8颗', '14颗'], hint: '用2个6相加，也可以想乘法口诀。', explanation: '2行、每行6颗，2乘6等于12颗。' },
    { knowledgePointIds: [facts], prompt: '三盒彩珠，每盒5颗。彩珠一共有多少颗？', answer: '15颗', distractors: ['8颗', '20颗'], hint: '可以想三五十五。', explanation: '3盒、每盒5颗，三五十五，一共有15颗。' },
    { knowledgePointIds: [facts], prompt: '有4条彩纸，每条剪成4张小卡片，一共能剪出几张？', answer: '16张', distractors: ['8张', '20张'], hint: '4个4相加，也可以想四四得几。', explanation: '4条彩纸各剪出4张，4乘4等于16张。' },
    { knowledgePointIds: [facts], prompt: '5只小篮子，每只放2颗橡果。篮子里共有多少颗橡果？', answer: '10颗', distractors: ['7颗', '12颗'], hint: '可以想二五一十。', explanation: '5只篮子、每只2颗，5乘2等于10颗。' },
    { knowledgePointIds: [facts], prompt: '6辆玩具车，每辆车上摆3块积木。积木一共有多少块？', answer: '18块', distractors: ['9块', '24块'], hint: '可以想三六十八。', explanation: '6辆车、每辆3块，6乘3等于18块。' },
    { knowledgePointIds: [facts], prompt: '3组每组2颗和2组每组3颗，分别摆成点子图后总数怎样？', answer: '积相同，都是6', distractors: ['3 × 2的积更大', '2 × 3的积更大'], hint: '分别数一数两幅图里的点子。', explanation: '3乘2与2乘3都等于6，两幅图的点子总数相同。' },
    { knowledgePointIds: [groups], prompt: '6个盒子，每盒有2枚星星贴纸，哪道算式表示一共有几枚？', answer: '6 × 2', distractors: ['6 + 2', '2 × 2'], hint: '先看有几盒，再看每盒有几枚。', explanation: '6盒、每盒2枚，列式6乘2。' },
    { knowledgePointIds: [groups], prompt: '小卡片上写着6 + 6 + 6 + 6。改写成乘法后，前一个因数表示什么？', answer: '相同加数出现的次数', distractors: ['每个加数的大小', '所有加数相加的结果'], hint: '先数一数，加数6重复了几次。', explanation: '第一个因数表示相同加数出现的次数；这里是4个6，写成4乘6。' },
    { knowledgePointIds: [groups], prompt: '哪条连加算式能表示3组、每组4颗棋子？', answer: '4 + 4 + 4', distractors: ['3 + 4', '4 + 4'], hint: '把每组的4颗棋子连续数3次。', explanation: '3组、每组4颗，可以写成4加4加4，也可以写成3乘4。' },
    { knowledgePointIds: [groups], prompt: '在算式5 × 3中，第一个因数5告诉我们什么？', answer: '一共有5组', distractors: ['每组有5个', '一共有3组'], hint: '组数写在算式的第一个位置。', explanation: '5乘3表示5组、每组3个，所以5表示组数。' },
    { knowledgePointIds: [groups], prompt: '四行座位，每行6个座位。求座位总数应该列哪道乘法？', answer: '4 × 6', distractors: ['4 + 6', '6 × 6'], hint: '用行数乘每行座位数。', explanation: '4行、每行6个，列式4乘6。' },
    { knowledgePointIds: [facts], prompt: '两行各摆4枚棋子，点子图里一共有多少枚棋子？', answer: '8枚', distractors: ['6枚', '10枚'], hint: '把两个4合起来，也可以想乘法口诀。', explanation: '2组、每组4枚，二四得八，一共有8枚。' },
    { knowledgePointIds: [facts], prompt: '计算4 × 5时，哪句乘法口诀最合适？', answer: '四五二十', distractors: ['四四十六', '三五十五'], hint: '口诀里要同时有4和5。', explanation: '四五二十，所以4乘5等于20。' },
    { knowledgePointIds: [groups], prompt: '要用点子图表示2 × 4，哪种摆法符合算式？', answer: '2行，每行4个点', distractors: ['4行，每行4个点', '2行，每行2个点'], hint: '第一个数表示行数，第二个数表示每行点数。', explanation: '2乘4表示2组、每组4个，画成2行、每行4个点。' },
    { knowledgePointIds: [groups], prompt: '加法2 + 2 + 2 + 2 + 2 + 2可以写成哪道乘法？', answer: '6 × 2', distractors: ['2 × 2', '6 + 2'], hint: '数一数相同加数2出现了几次。', explanation: '一共有6个2，所以写成6乘2。' },
    { knowledgePointIds: [groups], prompt: '把4 + 4 + 4写成4 × 3，合适吗？', answer: '不合适，应写成3 × 4', distractors: ['合适，因为4和3都出现了', '不合适，应写成4 × 4'], hint: '第一个因数表示相同加数出现的次数。', explanation: '4出现了3次，按“加数个数乘每个加数”应写成3乘4。' },
    { knowledgePointIds: [groups, facts], prompt: '5个4相加，哪项同时写出了乘法算式和积？', answer: '5 × 4 = 20', distractors: ['4 + 5 = 9', '5 × 5 = 25'], hint: '数清有5个4，再想五四二十。', explanation: '5个4相加写成5乘4，积是20。' },
    { knowledgePointIds: [facts], prompt: '想用口诀“四四十六”检查4 × 4，积应该填多少？', answer: '16', distractors: ['12', '20'], hint: '读一读四四十六。', explanation: '四四十六，所以4乘4的积是16。' },
    { knowledgePointIds: [groups], prompt: '算式2 × 6和下面哪幅分组图相对应？', answer: '2组，每组6个', distractors: ['6组，每组2个', '2组，每组2个'], hint: '按“组数乘每组数量”读算式。', explanation: '2乘6表示2组、每组6个。' },
  ],
  advanced: [
    { knowledgePointIds: [groups], prompt: '把2 + 2 + 2 + 2 + 2 + 2写成乘法，哪道算式正确？', answer: '6 × 2', distractors: ['2 × 2', '6 + 2'], hint: '数一数相同加数2出现了几次。', explanation: '加数2出现6次，因此写成6乘2。' },
    { knowledgePointIds: [groups], prompt: '下面哪段故事能用3 × 5表示？', answer: '3排彩旗，每排5面', distractors: ['3面红旗和5面蓝旗', '3盒彩笔，每盒里装的支数都不同'], hint: '算式表示3组，每组5个。', explanation: '3乘5表示3组相同数量的5，第一种故事符合。' },
    { knowledgePointIds: [facts], prompt: '小象搬来6篮积木，每篮4块。哪句口诀可以算出积木总数？', answer: '四六二十四', distractors: ['四五二十', '六六三十六'], hint: '先按“6组、每组4个”列式。', explanation: '六乘四可以想四六二十四，积木一共有24块。' },
    { knowledgePointIds: [facts], prompt: '3组卡片，每组有6张。计算卡片总数时应想哪句口诀？', answer: '三六十八', distractors: ['三五十五', '三四十二'], hint: '先数清有几组、每组几张。', explanation: '三乘六可以想三六十八，卡片一共有18张。' },
    { knowledgePointIds: [facts], prompt: '4 × 5和5 × 4的积分别是多少？', answer: '都是20', distractors: ['分别是20和9', '分别是9和20'], hint: '分别想四五二十和五四二十。', explanation: '四五二十，五四也二十，两道算式的积相同。' },
    { knowledgePointIds: [groups], prompt: '4 × 3表示4组物品，每组有几个？', answer: '每组有3个', distractors: ['每组有4个', '一共有3组'], hint: '读算式时，第一个因数是组数。', explanation: '4乘3表示4组、每组3个。' },
    { knowledgePointIds: [groups], prompt: '5 + 5 + 5 + 5可以写成哪道乘法算式？', answer: '4 × 5', distractors: ['5 × 5', '4 × 4'], hint: '相同加数5一共出现了4次。', explanation: '四个5相加写成4乘5。' },
    { knowledgePointIds: [groups], prompt: '6组同学，每组4人，哪道算式表示同学总人数？', answer: '6 × 4', distractors: ['6 + 4', '4 × 4'], hint: '把组数和每组人数分别对应两个因数。', explanation: '6组、每组4人，列式6乘4。' },
    { knowledgePointIds: [facts], prompt: '6 × 5的得数是多少？', answer: '30', distractors: ['25', '35'], hint: '想五六三十。', explanation: '五六三十，所以6乘5等于30。' },
    { knowledgePointIds: [groups], prompt: '3 + 3 + 3 + 3表示几个3？对应的乘法算式是什么？', answer: '4个3，写成4 × 3', distractors: ['3个4，写成3 × 4', '4个4，写成4 × 4'], hint: '先数重复出现的加数，再写每个加数。', explanation: '3出现了4次，所以是4个3，写成4乘3。' },
    { knowledgePointIds: [groups, facts], prompt: '4盒卡片，每盒5张，一共有多少张？', answer: '20张', distractors: ['9张', '25张'], hint: '用4乘5，再用口诀求积。', explanation: '四五二十，4盒、每盒5张共20张。' },
    { knowledgePointIds: [groups], prompt: '5排座位，每排2个，哪个算式能表示全部座位？', answer: '5 × 2', distractors: ['5 + 2', '2 × 2'], hint: '按排数乘每排座位数来列式。', explanation: '5排、每排2个，列式5乘2。' },
    { knowledgePointIds: [facts], prompt: '比较3 × 5和3 + 5，哪项判断正确？', answer: '3 × 5等于15，3 + 5等于8', distractors: ['两道算式都等于15', '两道算式都等于8'], hint: '分别用乘法口诀和加法计算。', explanation: '三五十五，而3加5等于8。' },
    { knowledgePointIds: [groups], prompt: '小组题说“2组，每组6个”，哪道算式把两个数量对应正确？', answer: '2 × 6', distractors: ['6 × 6', '2 + 6'], hint: '组数放在前面，每组个数放在后面。', explanation: '2组、每组6个，正确列式是2乘6。' },
    { knowledgePointIds: [groups], prompt: '算式的第一个因数是5，第二个因数是6。它表示几个6？', answer: '5个6', distractors: ['6个5', '5和6相加'], hint: '第一个因数表示相同加数出现的次数。', explanation: '5乘6表示5个6相加。' },
    { knowledgePointIds: [facts], prompt: '计算5 × 6时，应该想哪句乘法口诀？', answer: '五六三十', distractors: ['五五二十五', '四五二十'], hint: '口诀里要同时出现5和6。', explanation: '五六三十，所以5乘6等于30。' },
    { knowledgePointIds: [groups, facts], prompt: '5张桌子，每张坐4人。算出教室里能坐多少人，选哪项？', answer: '20人', distractors: ['9人', '25人'], hint: '用桌子张数乘每张桌子旁的人数。', explanation: '5张桌子、每张4人，五四二十，一共能坐20人。' },
    { knowledgePointIds: [groups, facts], prompt: '把6 + 6 + 6 + 6改写成乘法并求积，哪项完整？', answer: '4 × 6 = 24', distractors: ['6 × 6 = 36', '4 + 6 = 10'], hint: '加数6出现了4次，再用口诀求积。', explanation: '4个6写成4乘6，四六二十四。' },
    { knowledgePointIds: [groups], prompt: '5 + 5 + 5 + 5中，乘法算式的第一个因数应该是几？', answer: '4', distractors: ['5', '20'], hint: '第一个因数表示相同加数重复的次数。', explanation: '加数5出现4次，所以第一个因数是4，算式写成4乘5。' },
    { knowledgePointIds: [groups], prompt: '算式3 × 6表示几个6相加？', answer: '3个6', distractors: ['6个3', '3个3'], hint: '第一个因数表示有几份。', explanation: '3乘6表示3个6相加。' },
    { knowledgePointIds: [groups, facts], prompt: '小林把3 × 6算成12，因为他只加了两个6。怎样改正？', answer: '再加一个6，积改为18', distractors: ['少加一个6，积改为6', '把3 × 6改成3 + 6'], hint: '3乘6表示3个6相加。', explanation: '3个6是6加6加6，三六十八，正确的积是18。' },
  ],
  high: [
    { knowledgePointIds: [groups], prompt: '设计一个能用4 × 5解决的问题，哪项信息最完整？', answer: '有4组，每组5个，求一共有多少个', distractors: ['有4个和5个，求哪个更多', '有5组，物品数量每组都不同'], hint: '题目需要交代组数、每组数量和所求总数。', explanation: '4乘5表示4组、每组5个，并求总数。' },
    { knowledgePointIds: [groups, facts], prompt: '6排展示卡，每排4张，展示卡共有多少张？', answer: '24张', distractors: ['20张', '28张'], hint: '先把排数和每排张数写成乘法。', explanation: '6乘4等于24，展示卡一共有24张。' },
    { knowledgePointIds: [groups], prompt: '哪幅摆放可以用4 × 5表示？', answer: '4行，每行摆5颗棋子', distractors: ['4行，棋子总数是5颗', '5行，每行摆4颗后只数其中一行'], hint: '第一个数说有几组，第二个数说每组几个。', explanation: '4行、每行5颗就是4组5颗，表示4乘5。' },
    { knowledgePointIds: [facts], prompt: '6 × 3和3 × 6分别用口诀计算，结果怎样？', answer: '都等于18', distractors: ['一个是18，一个是9', '一个是18，一个是21'], hint: '分别用三六十八和六三十八核对。', explanation: '6乘3与3乘6都等于18。' },
    { knowledgePointIds: [groups], prompt: '在5 × 4这个分组算式里，4表示什么？', answer: '每组有4个', distractors: ['一共有4组', '有5个组，每组数量不同'], hint: '按“组数乘每组数量”读算式。', explanation: '5乘4表示5组、每组4个，因此4表示每组数量。' },
    { knowledgePointIds: [groups, facts], prompt: '6组手工材料，每组6张彩纸，一共有多少张？', answer: '36张', distractors: ['12张', '30张'], hint: '用六六三十六这句口诀。', explanation: '6组、每组6张，6乘6等于36张。' },
    { knowledgePointIds: [groups], prompt: '把2连续相加6次，怎样用乘法表示？', answer: '6 × 2', distractors: ['2 × 2', '6 + 2'], hint: '相同加数2重复了6次。', explanation: '6个2相加写成6乘2。' },
    { knowledgePointIds: [groups, facts], prompt: '5组小队，每组4人。有人把总人数写成19，怎样检查并改正？', answer: '算5 × 4，改为20人', distractors: ['算5 + 4，改为9人', '把组数改成20组'], hint: '用五四二十这句口诀检查总数。', explanation: '5乘4等于20，组数和每组人数不变，总数应改为20人。' },
    { knowledgePointIds: [facts], prompt: '3 × 6和4 × 5相比，哪项正确？', answer: '3 × 6是18，4 × 5是20', distractors: ['两道算式都是18', '3 × 6是20，4 × 5是18'], hint: '分别用三六十八和四五二十。', explanation: '三六十八，四五二十，所以4乘5的积大2。' },
    { knowledgePointIds: [groups], prompt: '想表达“3组，每组5个”，哪种说法和算式都对应？', answer: '3组5个，列式3 × 5', distractors: ['5组3个，列式3 × 5', '3组5个，列式3 + 5'], hint: '让情境中的组数和每组数依次对应因数。', explanation: '3组、每组5个应列式3乘5。' },
    { knowledgePointIds: [groups, facts], prompt: '4行书架，每行放6本书。哪一步能正确求出总本数？', answer: '用4 × 6，得到24本', distractors: ['用4 + 6，得到10本', '用6 × 6，得到36本'], hint: '把行数和每行本数写成乘法，再算积。', explanation: '4乘6等于24，书架上共有24本书。' },
    { knowledgePointIds: [facts], prompt: '用相同加数检查2 × 5的积，哪种方法正确？', answer: '5 + 5，得10', distractors: ['2 + 5，得7', '5 + 5 + 5，得15'], hint: '2乘5表示2个5。', explanation: '2个5相加是10，所以2乘5等于10。' },
    { knowledgePointIds: [groups], prompt: '一个问题要表示5盘点心、每盘6块。下面哪项没有把两个数量颠倒？', answer: '5组，每组6块，列式5 × 6', distractors: ['6组，每组5块，列式5 × 6', '5组，每组6块，列式5 + 6'], hint: '先确认盘数，再确认每盘块数。', explanation: '5盘、每盘6块应表示成5乘6。' },
    { knowledgePointIds: [groups, facts], prompt: '同学写出“6组，每组3个”。哪项复核理由最合适？', answer: '3 × 6也等于18，但要按约定把组数写在前面', distractors: ['6 + 3等于18', '18组，每组6个'], hint: '先检查总数，再看算式是否按情境顺序表达。', explanation: '组数是6、每组3个，按“组数乘每组数量”应写6乘3，得18。' },
    { knowledgePointIds: [groups, facts], prompt: '花圃有4排花盆，每排5盆，后来又添了3盆。下面哪道算式能求出花盆总数？', answer: '4 × 5 + 3', distractors: ['4 + 5 + 3', '4 × (5 + 3)'], hint: '先算原来4排花盆的总数，再加上新添的3盆。', explanation: '4乘5等于20盆，再加3盆，一共23盆。' },
    { knowledgePointIds: [groups, facts], prompt: '一张桌子两边各摆6把椅子，像这样的桌子有2张。一共摆了多少把椅子？', answer: '24把', distractors: ['12把', '18把'], hint: '先算每张桌子两边的椅子数，再想2张桌子。', explanation: '每张桌子两边共有12把，2张桌子共24把；也可以看成4组、每组6把。' },
  ],
};

export const grade2Term1MathUnit04SupplementalActivities: Grade2Term1MathUnit04SupplementalActivity[] = Object.entries(drafts).flatMap(([difficulty, items]) => (
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
