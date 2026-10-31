import type { ChoiceActivityDefinition, Difficulty } from '../../content/types';

export interface Grade1Term2MathUnit02SupplementalActivity {
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

const sourceUnitId = 'grade-1/term-2/math/unit-02';
const idPrefix = 'challenge-supplement-grade-1-term-2-math-unit-02';
const subtraction = ['subtraction-within-20'];
const strategy = ['subtraction-within-20', 'subtraction-strategy'];
const inverseCheck = ['subtraction-within-20', 'inverse-operation-check'];

const drafts: Record<Difficulty, ActivityDraft[]> = {
  basic: [
    { knowledgePointIds: subtraction, prompt: '13减去5，差是多少？', options: ['8', '7', '9'], correctOptionIndex: 0, hint: '想一想13减去5后还剩多少。', explanation: '13减去5等于8。' },
    { knowledgePointIds: subtraction, prompt: '把12个积木拿走7个，桌上还剩几个？', options: ['6个', '5个', '4个'], correctOptionIndex: 1, hint: '从12个中去掉7个。', explanation: '12减去7等于5，还剩5个积木。' },
    { knowledgePointIds: subtraction, prompt: '14颗珠子中拿走6颗，剩下几颗？', options: ['7颗', '8颗', '9颗'], correctOptionIndex: 1, hint: '用原来的珠子数减去拿走的数量。', explanation: '14减去6等于8，剩下8颗珠子。' },
    { knowledgePointIds: subtraction, prompt: '15 − 8 的结果是几？', options: ['7', '6', '8'], correctOptionIndex: 0, hint: '按本单元的方法计算，再检查差。', explanation: '15减去8等于7。' },
    { knowledgePointIds: subtraction, prompt: '小盒里有11张贴纸，送出4张后还留几张？', options: ['6张', '7张', '8张'], correctOptionIndex: 1, hint: '送出后留下的数量要用减法求。', explanation: '11减去4等于7，还留下7张贴纸。' },
    { knowledgePointIds: subtraction, prompt: '小华有14个小苹果，拿走5个后还剩多少个？', options: ['8个', '9个', '10个'], correctOptionIndex: 1, hint: '用14减去拿走的5个。', explanation: '14减去5等于9，还剩9个小苹果。' },
    { knowledgePointIds: subtraction, prompt: '16个棋子拿掉9个，余下几个？', options: ['6个', '7个', '8个'], correctOptionIndex: 1, hint: '把拿掉的棋子数从原数中减去。', explanation: '16减去9等于7，余下7个棋子。' },
    { knowledgePointIds: subtraction, prompt: '17减去8以后还剩多少？', options: ['8', '9', '10'], correctOptionIndex: 1, hint: '先看清被减数和减数，再计算。', explanation: '17减去8等于9。' },
    { knowledgePointIds: strategy, prompt: '用破十法计算13−5，哪一步接得正确？', options: ['13拆成10和3；10−5=5；5+3=8', '13拆成10和3；10−3=7；7−5=2', '13拆成10和3；10+5=15；15+3=18'], correctOptionIndex: 0, hint: '先把13拆成10和3，再从10里减去5。', explanation: '10减去5得5，再加上拆出的3，结果是8。' },
    { knowledgePointIds: strategy, prompt: '用平十法算14−6，先减4到10后，还要怎样做？', options: ['再减2，得8', '再减4，得6', '再加2，得12'], correctOptionIndex: 0, hint: '6可以分成4和2；先减4后还要减去剩下的部分。', explanation: '14先减4得10，再减2得8。' },
    { knowledgePointIds: subtraction, prompt: '有一个数减去6等于8，这个数是几？', options: ['12', '14', '15'], correctOptionIndex: 1, hint: '想想哪个数减去6会得到8。', explanation: '14减去6等于8，所以这个数是14。' },
    { knowledgePointIds: subtraction, prompt: '哪道减法的差是7？', options: ['13−6', '14−8', '15−7'], correctOptionIndex: 0, hint: '分别算出三道减法的差。', explanation: '13减去6等于7；另外两道的差分别是6和8。' },
    { knowledgePointIds: inverseCheck, prompt: '13−5=8，用加法验算时哪道算式正确？', options: ['8+5=13', '8+5=12', '13+5=8'], correctOptionIndex: 0, hint: '把差和减数相加，看能不能回到被减数。', explanation: '8加5等于13，回到了被减数，验算正确。' },
    { knowledgePointIds: subtraction, prompt: '小军有13块积木，送给朋友5块。哪道算式表示还剩的积木？', options: ['13−5', '13+5', '5−13'], correctOptionIndex: 0, hint: '送出后剩下的数量，要从原来的13块中去掉5块。', explanation: '送给朋友5块后求剩余，用13−5表示。' },
  ],
  advanced: [
    { knowledgePointIds: strategy, prompt: '用破十法算15−7，哪种拆分能得到正确结果？', options: ['15拆成10和5，10−7=3，再加5得8', '15拆成10和5，10−5=5，再加7得12', '15拆成10和5，10−7=3，再减5得−2'], correctOptionIndex: 0, hint: '先从10里减去7，再把拆开的5加回来。', explanation: '10减去7得3，3加上5等于8。' },
    { knowledgePointIds: strategy, prompt: '用平十法算16−8，先减6到10后，再做什么？', options: ['再减2，得8', '再减2，得6', '再加2，得12'], correctOptionIndex: 0, hint: '8可以分成6和2。', explanation: '16先减6得10，再减2得8。' },
    { knowledgePointIds: strategy, prompt: '计算13−5时，先减3凑成10，还要怎样算？', options: ['10−2=8', '10−3=7', '10+2=12'], correctOptionIndex: 0, hint: '5已经减去3，还剩2没有减。', explanation: '13先减3得10，5还剩2；10再减2得8。' },
    { knowledgePointIds: subtraction, prompt: '书架上有16本绘本，先拿走7本，又拿走2本，剩下几本？', options: ['6本', '7本', '8本'], correctOptionIndex: 1, hint: '按两次拿走的先后顺序计算。', explanation: '16减去7剩9本，9再减去2，剩7本。' },
    { knowledgePointIds: subtraction, prompt: '□−6=8，方框里应填几？', options: ['13', '14', '15'], correctOptionIndex: 1, hint: '想一个数减去6等于8。', explanation: '14减去6等于8，所以方框里填14。' },
    { knowledgePointIds: inverseCheck, prompt: '要验算14−6=8，哪道加法能回到原来的数？', options: ['8+6=14', '8+6=15', '14+6=8'], correctOptionIndex: 0, hint: '把算出的差与减数相加。', explanation: '8加6等于14，回到了被减数。' },
    { knowledgePointIds: inverseCheck, prompt: '同伴说15−8=8，哪句话能指出正确结果？', options: ['正确结果是7，因为7+8=15', '正确结果是8，因为8+8=15', '正确结果是9，因为9+8=15'], correctOptionIndex: 0, hint: '用差加上减数，检查是否回到15。', explanation: '7加8等于15，所以15减去8等于7。' },
    { knowledgePointIds: subtraction, prompt: '比较15−8和14−7，哪项说法正确？', options: ['两个差都是7', '15−8的差更大', '14−7的差更大'], correctOptionIndex: 0, hint: '分别求出两个算式的差。', explanation: '15减去8和14减去7都等于7。' },
    { knowledgePointIds: subtraction, prompt: '16−9和16−8相比，哪个差更大？', options: ['16−8，因为减去的数较小', '16−9，因为减去的数较大', '两个差一样大'], correctOptionIndex: 0, hint: '被减数相同，比较减去的数量。', explanation: '16减去8等于8，16减去9等于7，所以16减去8的差更大。' },
    { knowledgePointIds: strategy, prompt: '用平十法算17−9，先减7到10后还要减几？', options: ['减2，结果是8', '减9，结果是1', '加2，结果是12'], correctOptionIndex: 0, hint: '9可以分成7和剩下的一部分。', explanation: '9分成7和2；17先减7得10，再减2得8。' },
    { knowledgePointIds: inverseCheck, prompt: '小树原有15片叶子，被风吹掉一些后还剩7片。风吹掉了几片？', options: ['8片', '7片', '22片'], correctOptionIndex: 0, hint: '从原有叶片数中减去剩下的数量。', explanation: '15减去7等于8，风吹掉了8片叶子。' },
    { knowledgePointIds: subtraction, prompt: '甲盒有14颗珠子，拿走8颗；乙盒有13颗，拿走6颗。哪个盒子剩得多，多几颗？', options: ['乙盒多1颗', '甲盒多1颗', '一样多'], correctOptionIndex: 0, hint: '先分别算出两个盒子剩下的珠子，再比较。', explanation: '甲盒剩6颗，乙盒剩7颗，乙盒多1颗。' },
    { knowledgePointIds: subtraction, prompt: '有一道减法，差是6，被减数是14，减数是多少？', options: ['8', '7', '9'], correctOptionIndex: 0, hint: '想一想14减去几会得到6。', explanation: '14减去8等于6，所以减数是8。' },
    { knowledgePointIds: inverseCheck, prompt: '15−□=7，方框里应填几？', options: ['7', '8', '9'], correctOptionIndex: 1, hint: '想一想15减去几会得到7。', explanation: '15减去8等于7，所以方框里填8。' },
  ],
  high: [
    { knowledgePointIds: inverseCheck, prompt: '小林把14−6算成9。哪种验算能发现错误并得到正确的差？', options: ['8+6=14，所以差应是8', '9+6=14，所以差应是9', '8+6=15，所以差应是8'], correctOptionIndex: 0, hint: '先重新计算，再把差与减数相加核对。', explanation: '14减去6等于8，且8加6回到14；9加6不等于14。' },
    { knowledgePointIds: subtraction, prompt: '篮子里有17个球，先拿走8个，再拿走2个，篮子里还剩几个？', options: ['6个', '7个', '8个'], correctOptionIndex: 1, hint: '把两次拿走的数量按顺序从17中减去。', explanation: '17减去8剩9个，再减去2，最后剩7个。' },
    { knowledgePointIds: strategy, prompt: '两位同学计算13−6：甲算(10−6)+3，乙算(13−3)−3。哪项判断正确？', options: ['两种方法都得到7', '只有甲的方法正确', '只有乙的方法正确'], correctOptionIndex: 0, hint: '分别算出甲、乙两种方法的结果。', explanation: '甲算4+3=7；乙先到10，再减3也得7。两种方法都正确。' },
    { knowledgePointIds: subtraction, prompt: '纸盒里有18张卡片，先用去9张做手工，又用去4张，剩下几张？', options: ['4张', '5张', '6张'], correctOptionIndex: 1, hint: '先算第一次用去后剩多少，再减去第二次用去的数量。', explanation: '18减去9剩9张，9再减去4，剩5张。' },
    { knowledgePointIds: subtraction, prompt: '□−8=6，方框里的数是多少？', options: ['13', '14', '15'], correctOptionIndex: 1, hint: '把6和8合起来找回被减数。', explanation: '6加8等于14，所以方框里是14。' },
    { knowledgePointIds: strategy, prompt: '用平十法算14−9，先减4到10后，怎样完成？', options: ['再减5，得5', '再减4，得6', '再加5，得15'], correctOptionIndex: 0, hint: '9减去已经减掉的4，还剩多少？', explanation: '9分成4和5；14先减4得10，再减5得5。' },
    { knowledgePointIds: strategy, prompt: '小亮计算13−6，把13拆成10和3，先算10−6=4，再算4−3=1。错在哪里？', options: ['拆出的3要加回来；4+3=7', '再减3，所以4−3=1', '10−6=4，所以答案就是4'], correctOptionIndex: 0, hint: '13拆成10和3后，先从10里减去6，还要处理拆出的3。', explanation: '13拆成10和3。10−6=4，再把拆出的3加回来，4+3=7。' },
    { knowledgePointIds: subtraction, prompt: '一盒彩纸有18张，先用去7张，后来又用去3张，还剩几张？', options: ['7张', '8张', '9张'], correctOptionIndex: 1, hint: '按先后顺序算两次用去后的剩余数量。', explanation: '18减去7剩11张，11再减3，剩8张。' },
    { knowledgePointIds: inverseCheck, prompt: '14−□=8，减数是多少？', options: ['5', '6', '7'], correctOptionIndex: 1, hint: '想想14减去多少会得到8。', explanation: '14减去6等于8，所以减数是6。' },
    { knowledgePointIds: subtraction, prompt: '12−5=8这道计算错在哪里？', options: ['差应是7，因为7+5=12', '差应是8，因为8+5=12', '差应是6，因为6+5=12'], correctOptionIndex: 0, hint: '用差加上5，检查能否回到12。', explanation: '7加5等于12，所以12减去5等于7。' },
    { knowledgePointIds: subtraction, prompt: '小安有16张卡片，送给同学8张；小乐有15张，送给同学7张。两人各剩几张？', options: ['两人都剩8张', '小安剩8张，小乐剩7张', '小安剩7张，小乐剩8张'], correctOptionIndex: 0, hint: '分别用原来的张数减去送出的张数。', explanation: '16减8等于8，15减7也等于8，两人各剩8张。' },
    { knowledgePointIds: subtraction, prompt: '15减去8等于7。若被减数仍是15，改为减去9，差会怎样？', options: ['差变成6，比原来少1', '差变成8，比原来多1', '差仍是7'], correctOptionIndex: 0, hint: '减数增加1，被减数不变时，重新计算差。', explanation: '15减去9等于6，比15减去8的差7少1。' },
    { knowledgePointIds: inverseCheck, prompt: '哪句话能用加法证明13−6=7？', options: ['7+6=13，回到了被减数', '7+6=12，没有回到被减数', '13+6=7，交换后就是验算'], correctOptionIndex: 0, hint: '把差和减数相加，再看是否等于13。', explanation: '7加6等于13，可以证明13减去6等于7。' },
    { knowledgePointIds: strategy, prompt: '计算13−6时，先把13拆成10和3，哪种过程正确？', options: ['10−6=4，再加3，得7', '10−3=7，再减6，得1', '10+6=16，再加3，得19'], correctOptionIndex: 0, hint: '从10里减去6后，别忘了加回拆出的3。', explanation: '13拆成10和3；10减6得4，4加3得7。' },
    { knowledgePointIds: inverseCheck, prompt: '小华有17张贴纸，送出一些后还剩9张。她送出了几张？', options: ['8张', '9张', '26张'], correctOptionIndex: 0, hint: '从原来数量中减去剩下的数量。', explanation: '17减去9等于8，小华送出了8张贴纸。' },
    { knowledgePointIds: strategy, prompt: '计算16−9时，小明先算10减9再加6，小红先从16减6到10再减3。哪句话说明两种方法都对？', options: ['小明算1+6=7；小红算10−3=7，结果相同', '小明得到1，小红得到10，所以只有小红对', '两人都把9减掉后，还要再减6'], correctOptionIndex: 0, hint: '分别算完两种方法，比较它们是否得到同一个差。', explanation: '小明算10减9得1，再加6得7；小红算16减6得10，再减3得7。两种方法都得到7。' },
    { knowledgePointIds: strategy, prompt: '有一道减法，15−8=7。如果被减数增加1、减数不变，新的差是多少？', options: ['8', '7', '6'], correctOptionIndex: 0, hint: '把新的被减数写出来，再计算新的差。', explanation: '被减数增加1后，算式变成16−8，结果是8。' },
    { knowledgePointIds: subtraction, prompt: '盒子里有16块橡皮，先送走7块，后来又放进3块。盒子里现在有几块？', options: ['12块', '10块', '13块'], correctOptionIndex: 0, hint: '先算送走后还剩几块，再加上放回来的数量。', explanation: '16−7=9，后来放进3块，9+3=12。' },
  ],
};

export const grade1Term2MathUnit02SupplementalActivities: Grade1Term2MathUnit02SupplementalActivity[] =
  (Object.entries(drafts) as [Difficulty, ActivityDraft[]][]).flatMap(([difficulty, items]) => items.map((draft, index) => {
    const answerPosition = (index % 3) as 0 | 1 | 2;
    const rotation = (draft.correctOptionIndex - answerPosition + 3) % 3;
    const rotatedOptions = [...draft.options.slice(rotation), ...draft.options.slice(0, rotation)];
    const options = rotatedOptions.map((label, optionIndex) => ({ id: `option-${optionIndex + 1}`, label }));
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
        correctOptionId: options[answerPosition]!.id,
      },
    };
  }));
