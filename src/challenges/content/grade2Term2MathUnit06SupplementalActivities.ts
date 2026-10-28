import type { ChoiceActivityDefinition, Difficulty } from '../../content/types';

export interface Grade2Term2MathUnit06SupplementalActivity {
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

const sourceUnitId = 'grade-2/term-2/math/unit-06';
const idPrefix = 'challenge-supplement-grade-2-term-2-math-unit-06';
const quotient = 'quotient-and-remainder-meaning';
const remainderRule = 'remainder-less-than-divisor';
const checking = 'remainder-division-checking';
const context = 'interpreting-remainder-in-context';

const drafts: Record<Difficulty, ActivityDraft[]> = {
  basic: [
    { knowledgePointIds: [quotient], prompt: '23÷7的商和余数怎样表示？', answer: '3余2', distractors: ['2余5', '4余3'], hint: '找7的口诀中最接近23但不超过23的积。', explanation: '7×3＝21，23－21＝2，所以商3、余数2。' },
    { knowledgePointIds: [quotient], prompt: '23个积木每5个摆一组，摆完后余数是多少？', answer: '余数3', distractors: ['余数4', '余数5'], hint: '先用5的乘法口诀找出不超过23的最大积。', explanation: '5×4＝20，23－20＝3，余数是3。' },
    { knowledgePointIds: [checking], prompt: '有余数除法可以用哪种关系检查？', answer: '除数×商+余数=被除数', distractors: ['除数+商×余数=被除数', '被除数×除数+商=余数'], hint: '完整组的总数加上剩下的数量，应回到原来的总数。', explanation: '每组数量乘完整组数，再加余数，等于被除数。' },
    { knowledgePointIds: [remainderRule], prompt: '在有余数除法里，余数和除数相比应怎样？', answer: '余数比除数小', distractors: ['余数和除数一样大', '余数比除数大'], hint: '如果剩下的数量还能再装满一组，就说明还可以继续分。', explanation: '余数比除数小，才表示剩下的部分不能再组成一整组。' },
    { knowledgePointIds: [remainderRule], prompt: '除数是6时，哪条规则能帮助检查余数是否合理？', answer: '余数小于除数', distractors: ['余数必须大于6', '余数必须和商相同'], hint: '把余数和每组的数量6比较。', explanation: '除数是6，余数只能是0、1、2、3、4或5。' },
    { knowledgePointIds: [quotient, context], prompt: '17个梨每篮放5个，17÷5=3余2中的余数2表示什么？', answer: '还剩2个梨，未装满一篮', distractors: ['装满了2篮梨', '每篮有2个梨'], hint: '商3表示装满的篮数，再看还没有装满一篮的梨。', explanation: '5个一篮，装满3篮用了15个，还剩2个梨。' },
    { knowledgePointIds: [quotient], prompt: '27÷6的商和余数是什么？', answer: '4余3', distractors: ['3余4', '5余1'], hint: '6乘4等于24，再看27还差多少。', explanation: '27－24＝3，所以27÷6＝4余3。' },
    { knowledgePointIds: [quotient], prompt: '31÷6的商和余数是什么？', answer: '5余1', distractors: ['4余7', '6余5'], hint: '6×5＝30，先用这个最接近31但没有超过31的积。', explanation: '31－30＝1，所以商5、余数1。' },
    { knowledgePointIds: [quotient], prompt: '17÷5=3余2中，商3和余数2分别表示什么？', answer: '商表示完整组数，余数表示剩余数量', distractors: ['商表示剩余数量，余数表示完整组数', '商表示总数，余数表示每组数量'], hint: '先看分出了几组，再看还剩多少没有成组。', explanation: '商3表示分成3个完整组，余数2表示还剩2个。' },
    { knowledgePointIds: [checking], prompt: '已知除数是5、商是4、余数是2，用哪道算式还原被除数？', answer: '除数×商+余数=原来的总数', distractors: ['除数+商+余数=原来的总数', '除数×余数+商=原来的总数'], hint: '先算4个完整组里一共有多少，再加上剩余的2个。', explanation: '5×4＝20，20＋2＝22；原来的总数是22。' },
    { knowledgePointIds: [quotient], prompt: '14÷4的商和余数是什么？', answer: '3余2', distractors: ['2余3', '4余2'], hint: '4×3＝12，找出14中有几个完整的4。', explanation: '14－12＝2，所以14÷4＝3余2。' },
    { knowledgePointIds: [remainderRule], prompt: '除数是4时，下面哪个余数符合“余数小于除数”？', answer: '余数3', distractors: ['余数4', '余数5'], hint: '把每个余数和除数4比较。', explanation: '3小于4，符合余数小于除数的要求；4和5都不符合。' },
    { knowledgePointIds: [quotient, remainderRule], prompt: '9个果子每4个放一盘，可以放几满盘，还剩几个？', answer: '9÷4=2余1', distractors: ['9÷4=1余5', '9÷4=3余3'], hint: '先找4乘几最接近9但不超过9。', explanation: '4×2＝8，9－8＝1，所以可以放2满盘，余1个。' },
    { knowledgePointIds: [checking], prompt: '检查“总数÷每组数量=商余数”时，哪一步能确认总数没有算错？', answer: '商×除数后再加余数', distractors: ['商加除数后再减余数', '被除数乘余数后减商'], hint: '把完整组里的数量和剩余数量合起来。', explanation: '商×除数＋余数应等于被除数；同时余数还要小于除数。' },
  ],
  advanced: [
    { knowledgePointIds: [quotient, context], prompt: '27枚徽章每盒装6枚，能装满几盒，还剩几枚？', answer: '4盒余3个', distractors: ['3盒余9个', '5盒余3个'], hint: '先算6乘几最接近27但不超过27。', explanation: '6×4＝24，27－24＝3，可以装满4盒，还剩3枚。' },
    { knowledgePointIds: [quotient, context], prompt: '42位同学乘车，每辆车最多坐8人。可以坐满几辆，还剩几人？', answer: '5辆坐满，还剩2人', distractors: ['4辆坐满，还剩10人', '6辆坐满，还剩6人'], hint: '8×5＝40，先数坐满的车辆，再看剩下的人数。', explanation: '42－40＝2，所以坐满5辆后还剩2人。' },
    { knowledgePointIds: [context], prompt: '42位同学乘车，每辆车最多坐8人，算得5余2。余下的2人怎么办？', answer: '剩下的同学还需要安排座位', distractors: ['把2位同学从总人数中去掉', '让一辆车超过最多乘坐人数'], hint: '余数表示还有同学没有坐进已坐满的车辆。', explanation: '同学也要安全出发，应继续安排座位或车辆，不能忽略。' },
    { knowledgePointIds: [remainderRule], prompt: '除数是7时，下面哪项是检查余数的正确规则？', answer: '余数必须小于7', distractors: ['余数可以等于7', '余数一定大于7'], hint: '如果还剩7个，就能再组成一整组7个。', explanation: '余数必须比除数7小；等于或大于7时，还能继续分组。' },
    { knowledgePointIds: [quotient, remainderRule], prompt: '31张卡片每袋装5张，商和余数是什么？', answer: '6袋余1张', distractors: ['5袋余6张', '7袋余1张'], hint: '先用5乘一个数，得到最接近31且不超过31的积。', explanation: '5×6＝30，31－30＝1，所以装满6袋后还剩1张。' },
    { knowledgePointIds: [quotient, context], prompt: '28个小球每组放8个，可以分成几组完整小组，还剩几个？', answer: '3组余4个', distractors: ['4组余4个', '2组余12个'], hint: '8×3＝24，4组需要32个，已经超过28个。', explanation: '28－24＝4，所以能分成3组完整小组，还剩4个。' },
    { knowledgePointIds: [context], prompt: '17张卡片每袋装5张，算式17÷5=3余2中的余数2表示什么？', answer: '余数表示尚未装满一袋的卡片数', distractors: ['已经装满的卡片袋数', '每袋卡片的总数'], hint: '商3数的是装满的袋数；余数说的是没有装满一袋的卡片。', explanation: '装满3袋用了15张，还剩2张卡片，不足一袋。' },
    { knowledgePointIds: [remainderRule], prompt: '除数是8，下面哪个数可以作余数？', answer: '余数6', distractors: ['余数8', '余数10'], hint: '把每个可能的余数和除数8比较。', explanation: '6小于8，可以作余数；余数8或10都不小于除数。' },
    { knowledgePointIds: [quotient], prompt: '38÷9的商和余数是什么？', answer: '4余2', distractors: ['3余11', '5余7'], hint: '9×4＝36，再从38中减去36。', explanation: '38－36＝2，所以38÷9＝4余2。' },
    { knowledgePointIds: [quotient], prompt: '32块橡皮每盒放6块，能放几满盒，还剩几块？', answer: '5盒余2块', distractors: ['4盒余8块', '6盒余4块'], hint: '6×5＝30，检查还剩下多少。', explanation: '32－30＝2，所以可以装满5盒，还剩2块。' },
    { knowledgePointIds: [checking], prompt: '被除数是31、除数是7、商是4、余数是3。哪道乘加算式可以验算？', answer: '7×4+3=31', distractors: ['7×3+4=31', '31×7+4=3'], hint: '用除数乘商，再加余数，看是否回到31。', explanation: '7×4＝28，28＋3＝31，和被除数相同。' },
    { knowledgePointIds: [context], prompt: '29位同学乘车，每辆车最多坐6人。坐满4辆后还剩5人，至少需要几辆车？', answer: '至少需要第5辆车', distractors: ['4辆就够，不用安排剩下的人', '需要第6辆车，因为余数是5'], hint: '4辆车坐了24人，还剩5人；一辆车还可以坐下这5人。', explanation: '29÷6＝4余5，余下5人可以坐在第5辆车上，因此至少需要5辆。' },
    { knowledgePointIds: [context], prompt: '回答“19张贴纸每袋装4张”时，除了商和余数，还应写清什么？', answer: '余数配上题目中的物品或人数单位', distractors: ['把余数当成袋数，不写单位', '只写一个数字，不说明剩下什么'], hint: '让读答案的人知道剩下的是贴纸、人数还是别的东西。', explanation: '商和余数都要联系情境说明；这里余数表示剩下的贴纸张数。' },
    { knowledgePointIds: [quotient, context], prompt: '解决“23本故事书每箱装5本”的问题，怎样写出完整的解题过程？', answer: '先求完整组数，再解释余数怎么办', distractors: ['只写除法算式，不看还剩几本', '先把总数减去每箱数量，再把结果当作箱数'], hint: '先求能装满的箱数，再说明剩下的书还够不够一箱。', explanation: '23÷5＝4余3，能装满4箱，还剩3本故事书；余数小于5，不能再装满一箱。' },
  ],
  high: [
    { knowledgePointIds: [quotient, context], prompt: '47个礼物每箱装9个，最多能装满几箱，还剩几个？', answer: '5箱余2个', distractors: ['4箱余11个', '6箱余1个'], hint: '先找9乘几最接近47且没有超过47。', explanation: '9×5＝45，47－45＝2，所以装满5箱，还剩2个礼物。' },
    { knowledgePointIds: [quotient, context], prompt: '35位探索员每8人组成一队，可以组成几支完整小队，还剩几人？', answer: '4组余3人', distractors: ['3组余11人', '5组余5人'], hint: '8×4＝32，检查35减去32还剩几人。', explanation: '35－32＝3，能组成4支完整小队，还剩3位探索员。' },
    { knowledgePointIds: [checking], prompt: '一个分组方案中，完整组共有36件物品，另外剩下4件。用什么关系核对原来的总数？', answer: '整组数量加余数等于总数', distractors: ['整组数量减余数等于总数', '余数减整组数量等于总数'], hint: '原来的物品包括分进完整组里的和还没有成组的。', explanation: '完整组里的物品数加上余数，等于最初的被除数。' },
    { knowledgePointIds: [context], prompt: '一车最多坐8人，35人乘车后算得4余3。方案还缺少哪一步？', answer: '为剩下的3位同学安排座位', distractors: ['把3位同学忽略', '让已满的车辆再多坐3人'], hint: '商只告诉你坐满的车辆数，余数还是没有安排的同学。', explanation: '4辆车坐满32人，剩下3人还要安排座位，不能超出每辆车的容量。' },
    { knowledgePointIds: [quotient, context], prompt: '50张卡片每盒放8张，最多能装满几盒，还剩几张？', answer: '6盒余2张', distractors: ['5盒余10张', '7盒余6张'], hint: '8×6＝48，7盒则需要56张，超过50张。', explanation: '50－48＝2，因此装满6盒，余2张卡片。' },
    { knowledgePointIds: [remainderRule, checking], prompt: '把“每箱装8个”改成“每箱装9个”后，原来的商和余数还能直接照用吗？', answer: '重新计算商和余数', distractors: ['可以，改了除数也不影响结果', '只改余数，不必检查商'], hint: '每组的大小变了，完整组数和剩余数量都可能改变。', explanation: '除数改变后，要重新按新的每箱数量分组，并检查余数是否小于新除数。' },
    { knowledgePointIds: [remainderRule], prompt: '除数是8，同学把结果写成“商5余9”。先比较哪两个数能发现问题？', answer: '余数9和除数8', distractors: ['商5和被除数', '余数9和商5'], hint: '检查余数有没有大到还可以再组成一组8。', explanation: '9大于8，余数不小于除数，还能再分一组，所以原记录不正确。' },
    { knowledgePointIds: [checking, context], prompt: '整理一份有余数的装箱计划，哪种步骤顺序完整？', answer: '先求商和余数，再核对并安排剩余部分', distractors: ['先安排余数，再写商，最后不检查', '只求商，余数留到最后不处理'], hint: '先从总数和每箱容量算起，最后检查结果并说明剩余物品去向。', explanation: '先求完整箱数和余数，再用乘加关系验算，并说明剩下的物品如何处理。' },
    { knowledgePointIds: [quotient, context], prompt: '41位伙伴每辆车坐8人，坐满几辆后还剩几人？', answer: '5辆坐满，还剩1人', distractors: ['4辆坐满，还剩9人', '6辆坐满，还剩7人'], hint: '8×5＝40，剩下的1位伙伴也要计入答案。', explanation: '41－40＝1，所以坐满5辆后还剩1位伙伴。' },
    { knowledgePointIds: [context], prompt: '33位同学每辆车坐8人，坐满4辆后还剩1人。怎样完成安排？', answer: '再安排一辆车给剩下的人', distractors: ['不安排，少一个人没关系', '让一辆车坐9人，超过容量'], hint: '每辆车最多8人，剩下的同学也需要座位。', explanation: '4辆车坐32人，还剩1人；需要再安排一辆车，不能超载或忽略同学。' },
    { knowledgePointIds: [context], prompt: '30张卡片每袋装7张，装满4袋后还剩2张。剩下的卡片可以怎样处理？', answer: '把剩下的卡片收好', distractors: ['把余数改成7张', '把已装好的4袋拆开重新数'], hint: '先确认2小于每袋的7张，再决定如何收放。', explanation: '4袋用了28张，剩下2张不足一袋，可以记录或收好。' },
    { knowledgePointIds: [context], prompt: '31位同学乘车，每辆车最多坐6人。要让所有同学都有座位，至少需要几辆车？', answer: '至少需要第6辆车', distractors: ['5辆即可，剩下1人不用安排', '需要第7辆车'], hint: '先算坐满几辆和还剩几人，再检查还需要多少座位。', explanation: '31÷6＝5余1，5辆坐满30人，剩下1人还需要一辆车，所以至少要6辆。' },
    { knowledgePointIds: [remainderRule], prompt: '除数是8，哪种说法能判断余数8是否合理？', answer: '不可能，余数必须小于除数', distractors: ['可以，余数能和除数一样大', '可以，余数越大越好'], hint: '如果还剩8个，而每组也有8个，就能再组成一组。', explanation: '余数必须小于除数8；余数等于8时，商还可以增加1。' },
    { knowledgePointIds: [quotient, context], prompt: '39张贴纸每包放7张，能装满几包，还剩几张？', answer: '5包余4张', distractors: ['4包余11张', '6包余3张'], hint: '7×5＝35，6包需要42张，超过39张。', explanation: '39－35＝4，所以装满5包，还剩4张贴纸。' },
  ],
};

export const grade2Term2MathUnit06SupplementalActivities: Grade2Term2MathUnit06SupplementalActivity[] = Object.entries(drafts).flatMap(([difficulty, items]) => (
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
