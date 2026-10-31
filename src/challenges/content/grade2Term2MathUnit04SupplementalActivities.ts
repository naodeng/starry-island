import type { ChoiceActivityDefinition, Difficulty } from '../../content/types';

export interface Grade2Term2MathUnit04SupplementalActivity {
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

const sourceUnitId = 'grade-2/term-2/math/unit-04';
const idPrefix = 'challenge-supplement-grade-2-term-2-math-unit-04';
const facts = 'division-facts-from-multiplication';
const sharing = 'division-as-equal-sharing-and-grouping';
const quotientMeaning = 'meaning-and-units-of-quotients';
const allDivisionKnowledgePoints = [facts, sharing, quotientMeaning];

const drafts: Record<Difficulty, ActivityDraft[]> = {
  basic: [
    { knowledgePointIds: [facts], prompt: '空格×7=56，空格应填几？', answer: '8', distractors: ['7', '9'], hint: '找7的口诀里乘积是56的那一句。', explanation: '7×8＝56，所以空格里填8。' },
    { knowledgePointIds: [facts], prompt: '72÷9=□，商是多少？', answer: '8', distractors: ['7', '9'], hint: '找9乘几等于72。', explanation: '9×8＝72，所以72÷9＝8。' },
    { knowledgePointIds: [facts], prompt: '记录写着63÷7=8，理由是7×8=56。哪项修正正确？', answer: '63÷7=9，因为7×9=63', distractors: ['63÷7=8，因为7×8=56', '63÷7=7，因为7×7=49'], hint: '用除数乘商，检查能不能回到63。', explanation: '7×9＝63，能回到被除数，所以63÷7＝9。' },
    { knowledgePointIds: [facts, sharing, quotientMeaning], prompt: '64张卡片平均分成8份，每份几张？', answer: '每份8张', distractors: ['每份7张', '每份9张'], hint: '想8乘几等于64，再把结果说成每份的张数。', explanation: '64÷8＝8，每份8张；8份每份8张合起来是64张。' },
    { knowledgePointIds: [facts, sharing, quotientMeaning], prompt: '56颗珠子平均放在8个小盒里，每盒几颗？', answer: '每盒7颗', distractors: ['每盒8颗', '每盒9颗'], hint: '总数平均分成8份，求一份有多少。', explanation: '56÷8＝7，每盒7颗；8×7＝56可以核对总数。' },
    { knowledgePointIds: [facts, sharing, quotientMeaning], prompt: '72块拼片每9块装一盒，可以装几盒？', answer: '8盒', distractors: ['9盒', '7盒'], hint: '每盒放多少已经知道，要找能装成几盒。', explanation: '72÷9＝8，可以装8盒；答案的单位是盒。' },
    { knowledgePointIds: [facts, sharing, quotientMeaning], prompt: '45朵花平均分给9位同学，每人几朵？', answer: '每人5朵', distractors: ['每人4朵', '每人6朵'], hint: '把45平均分成9份，想9乘几等于45。', explanation: '45÷9＝5，每人分到5朵。' },
    { knowledgePointIds: [facts, sharing, quotientMeaning], prompt: '63个徽章平均放进7个小袋，每袋几枚？', answer: '每袋9枚', distractors: ['每袋7枚', '每袋8枚'], hint: '先确定已知的是小袋数，再求每袋的枚数。', explanation: '63÷7＝9，每袋放9枚；7×9＝63。' },
    { knowledgePointIds: [sharing, quotientMeaning], prompt: '54个豆子平均分给9个小组，算式54÷9=6中的6表示什么？', answer: '每组6个', distractors: ['有6个小组', '一共有6个豆子'], hint: '小组数已经是9，商表示每个小组分到的数量。', explanation: '54÷9＝6，6表示每组6个豆子。' },
    { knowledgePointIds: [quotientMeaning], prompt: '56个棋子每盒放8个，算式56÷8=7中的7表示什么？', answer: '盒数', distractors: ['每盒棋子的个数', '棋子的总数'], hint: '每盒的数量已经知道，商要数出可以装几盒。', explanation: '56÷8求能装几盒，商7表示7盒。' },
    { knowledgePointIds: [facts], prompt: '哪个算式的除数是8，商是9？', answer: '72÷8=9', distractors: ['72÷9=8', '63÷7=9'], hint: '同时检查除数和商，不要只看商是否为9。', explanation: '72÷8＝9，除数是8，商是9。' },
    { knowledgePointIds: [facts], prompt: '找出和8×8=64相对应的除法算式。', answer: '64÷8=8', distractors: ['64÷8=7', '8÷64=8'], hint: '积作被除数，一个乘数作除数，另一个乘数作商。', explanation: '8×8＝64，所以64÷8＝8。' },
    { knowledgePointIds: [facts, sharing, quotientMeaning], prompt: '72张图卡平均分给9位同学，每人分到8张。用哪道乘法检查总数？', answer: '9×8=72', distractors: ['8×8=72', '9×7=72'], hint: '同学人数乘每人分到的张数，应回到总张数。', explanation: '9位同学每人8张，共9×8＝72张。' },
    { knowledgePointIds: [facts, sharing, quotientMeaning], prompt: '45枚印章平均分成9份。哪句话完整说明分配结果并核对总数？', answer: '每份5枚，9×5=45', distractors: ['每份9枚，9×9=45', '每份4枚，9×4=45'], hint: '先用45除以9求每份数量，再用份数乘每份数量核对。', explanation: '45÷9＝5，9份每份5枚合起来是45枚。' },
  ],
  advanced: [
    { knowledgePointIds: [facts, sharing, quotientMeaning], prompt: '63枚贴纸平均分成7组，或平均分成9组。哪种分法每组更多？', answer: '分成7组时每组9枚，分成9组时每组7枚，前者更多', distractors: ['分成7组时每组7枚，分成9组时每组9枚，后者更多', '两种分法每组都一样多'], hint: '分别求63÷7和63÷9，再比较每份的数量。', explanation: '63÷7＝9，63÷9＝7；9比7大，所以分成7组时每组更多。' },
    { knowledgePointIds: [facts, sharing, quotientMeaning], prompt: '用8×9=72做了72张号码牌，平均分给8个小队，每队几张？', answer: '每队9张', distractors: ['每队8张', '每队10张'], hint: '先确认总数，再用小队数去平均分。', explanation: '8×9＝72，72÷8＝9，每队分到9张。' },
    { knowledgePointIds: [facts, sharing, quotientMeaning], prompt: '两道题都可以写63÷7=9：一题平均分给7位同学，另一题每7张装一盒。商9分别表示什么？', answer: '前题每人9张，后题能装9盒', distractors: ['前题9位同学，后题每盒9张', '两题都表示63张图卡'], hint: '分别看未知的是每人张数，还是可以装成几盒。', explanation: '平均分给7人时9表示每人9张；每盒7张时9表示9盒。' },
    { knowledgePointIds: [facts], prompt: '同学用8×8=72来验算72÷8=9。怎样改正验算？', answer: '应算8×9=72；除数8乘商9回到72', distractors: ['应算9×9=72；两个相同数相乘回到72', '应算72×8=9；被除数乘除数得到商'], hint: '验算除法时，用除数乘商。', explanation: '除数是8，商是9，应算8×9＝72；8×8并不是72。' },
    { knowledgePointIds: [facts], prompt: '由9×7=63，可以推出哪一组除法算式？', answer: '63÷9=7 和63÷7=9', distractors: ['63÷9=9 和63÷7=7', '9÷63=7 和7÷63=9'], hint: '把积63分别除以两个乘数。', explanation: '63÷9＝7，63÷7＝9，除数和商对应原来的两个乘数。' },
    { knowledgePointIds: [facts, sharing, quotientMeaning], prompt: '56支铅笔每8支装一袋。哪种列式和答案单位都合适？', answer: '56÷8=7，能装成7袋', distractors: ['56÷8=7，每袋7支', '56×8=7，能装成7袋'], hint: '每袋支数已知，要求的是袋数。', explanation: '56÷8＝7，表示能装成7袋；如果问每袋几支，题目已经给出8支。' },
    { knowledgePointIds: [facts], prompt: '比较72÷8和64÷8，哪道除法的商更大？', answer: '72÷8=9比64÷8=8大', distractors: ['64÷8=8比72÷8=9大', '两道算式的商一样大'], hint: '除数相同，分别用口诀求出两个商再比较。', explanation: '72÷8＝9，64÷8＝8，9比8大。' },
    { knowledgePointIds: [facts], prompt: '从9×9=81这个乘法事实，可以写出哪道除法？', answer: '9×9=81，所以81÷9=9', distractors: ['9×9=81，所以81÷8=9', '9×9=81，所以9÷81=9'], hint: '积作被除数，再除以乘法中的一个因数。', explanation: '81÷9＝9，因为9×9＝81。' },
    { knowledgePointIds: [facts, sharing, quotientMeaning], prompt: '56张贴纸平均分给7个小队。结果怎样写才同时说明商和它表示的数量？', answer: '56÷7=8，每队8张', distractors: ['56÷7=8，可以分成8队', '56÷7=7，每队8张'], hint: '小队数已经知道，商表示每队分到的张数。', explanation: '56÷7＝8，每队8张；8×7＝56张。' },
    { knowledgePointIds: [facts, sharing, quotientMeaning], prompt: '想让72÷9的商表示“盒子个数”，应该用哪道题？', answer: '72个棋子每9个装一盒，可以装几盒', distractors: ['72个棋子平均分给9位同学，每人几个', '72个棋子平均放在9个盒子里，每盒几个'], hint: '要让商表示份数，题目应给出每份放几个。', explanation: '每盒装9个时，72÷9求盒数；平均分给9人时，同一商表示每人拿到的个数。' },
    { knowledgePointIds: [facts, sharing, quotientMeaning], prompt: '想让72÷9的商表示“每人分到的张数”，哪道题符合？', answer: '72张图卡平均分给9位同学，每人几张', distractors: ['72张图卡每9张装一盒，可以装几盒', '72张图卡平均分成8份，每份几张'], hint: '要让商表示每人分到的量，已知条件应是人数。', explanation: '平均分给9位同学时，72÷9求每人分到的张数。' },
    { knowledgePointIds: [facts, sharing, quotientMeaning], prompt: '64人平均分成8组，商8应怎样解释？', answer: '每组8人，64人平均分成8组，商8表示每组的人数', distractors: ['商8表示有8个人参加，64人平均分成8组', '商8表示可以分成8组，每组8人'], hint: '题目已经给出组数，除法求的是每组人数。', explanation: '64÷8＝8；8表示每组8人，8组共64人。' },
    { knowledgePointIds: [facts, sharing, quotientMeaning], prompt: '56张卡片平均分给7人，或平均分给8人，哪项比较正确？', answer: '56÷7=8，56÷8=7，前者每份多1', distractors: ['56÷7=7，56÷8=8，后者每份多1', '两个结果都是7，每份一样多'], hint: '分别求出两道除法的商，再比较每人分到的卡片数。', explanation: '56÷7＝8，56÷8＝7；8比7多1。' },
    { knowledgePointIds: [facts, sharing, quotientMeaning], prompt: '63块橡皮每9块装一袋。哪项结果和验算都符合题意？', answer: '63÷9=7，9×7=63，商表示7袋', distractors: ['63÷9=7，9×9=63，商表示7块', '63÷7=9，9×7=63，商表示9袋'], hint: '先求袋数，再用每袋数量乘袋数核对总数。', explanation: '63÷9＝7，商7表示7袋；9×7＝63，正好回到总数。' },
  ],
  high: [
    { knowledgePointIds: allDivisionKnowledgePoints, prompt: '7盒彩笔每盒9支，把彩笔平均分给9个班，每班分到多少支？', answer: '先7×9=63，再63÷9=7支/班', distractors: ['先7×9=63，再63÷7=9支/班', '先7+9=16，再16÷9=7支/班'], hint: '先算出彩笔总数，再把总数平均分给9个班。', explanation: '7盒每盒9支，共63支；63支平均分给9个班，每班7支。' },
    { knowledgePointIds: allDivisionKnowledgePoints, prompt: '72枚棋子可以每袋装8枚，也可以每袋装9枚。两种装法各有几袋？', answer: '8个/袋装9袋；9个/袋装8袋', distractors: ['8个/袋装8袋；9个/袋装9袋', '8个/袋装7袋；9个/袋装7袋'], hint: '分别用72除以每袋的数量，结果要带上袋这个单位。', explanation: '72÷8＝9袋，72÷9＝8袋；每袋数量不同，袋数也不同。' },
    { knowledgePointIds: allDivisionKnowledgePoints, prompt: '56枚徽章平均分给8个小队，记录却写每队8枚。怎样修正记录？', answer: '每队应是7枚，因为8×8=64不等于56', distractors: ['每队应是8枚，因为8×8=56', '每队应是9枚，因为8×9=56'], hint: '用小队数乘记录中的每队数量，检查是否等于总数。', explanation: '8×8＝64，不是56；56÷8＝7，所以每队应是7枚。' },
    { knowledgePointIds: allDivisionKnowledgePoints, prompt: '81张卡片平均分给9个小组，哪句话能同时检查总数和每组数量？', answer: '9×9=81，说明9组每组9张正好是81张', distractors: ['9×8=81，说明9组每组8张正好是81张', '81×9=9，说明每组有9张'], hint: '组数乘每组张数应等于卡片总数。', explanation: '81÷9＝9，每组9张；9组一共9×9＝81张。' },
    { knowledgePointIds: allDivisionKnowledgePoints, prompt: '63个纽扣平均分给9位同学。哪项列式、答案和检查都正确？', answer: '63÷9=7，每人7个；9×7=63可验算', distractors: ['63÷9=7，每人9个；7×9=63可验算', '63÷7=9，每人7个；7×9=63可验算'], hint: '人数是已知的9，商应表示每人拿到的纽扣数。', explanation: '63÷9＝7，每人7个；9人每人7个共63个。' },
    { knowledgePointIds: allDivisionKnowledgePoints, prompt: '同一个算式72÷8=9可以出现在两种分配问题里。哪项正确解释了两个商？', answer: '每盒装8本时商9表示盒数；平均分给8队时商9表示每队本数', distractors: ['两题中的商9都表示8个小队', '每盒装8本时商9表示每盒本数；平均分给8队时表示总本数'], hint: '比较题目已知的是每份数量，还是份数。', explanation: '每份8本时，商求份数；平均分给8队时，商求每队本数。' },
    { knowledgePointIds: allDivisionKnowledgePoints, prompt: '72本书每9本装一箱，怎样求箱数并检查结果？', answer: '72÷9=8箱，再用8×9=72核对', distractors: ['72÷9=8本，再用8×8=72核对', '72×9=8箱，再用8+9=72核对'], hint: '先用总数除以每箱数量，验算时用箱数乘每箱本数。', explanation: '72÷9＝8箱；8箱每箱9本，共72本。' },
    { knowledgePointIds: allDivisionKnowledgePoints, prompt: '8个小组每组有7张任务卡，任务卡再平均分给7个展示台。每个展示台几张？', answer: '先算8×7=56，再算56÷7=8张/台', distractors: ['先算8×7=56，再算56÷8=7张/台', '先算8+7=15，再算15÷7=8张/台'], hint: '先求任务卡总数，再根据展示台数量平均分。', explanation: '8组每组7张，共56张；56张平均分给7个展示台，每台8张。' },
    { knowledgePointIds: allDivisionKnowledgePoints, prompt: '核对一张平均分记录时，哪两项都需要确认？', answer: '先核对总数，再确认每份数量相等', distractors: ['只核对总数，不比较每份数量', '只检查其中一份，不看物品总数'], hint: '平均分既要求总数对上，也要求各份一样多。', explanation: '各份数量相等并且合计回到总数，才能确认平均分记录正确。' },
    { knowledgePointIds: allDivisionKnowledgePoints, prompt: '72张卡片每8张装一盒。一位同学想用乘法复核自己的分盒结果，哪项说明正确？', answer: '72÷8=9，验算应写8×9=72', distractors: ['72÷8=9，验算应写8×8=72', '72÷9=8，验算应写9×9=72'], hint: '验算时，把每盒张数乘盒数，检查是否回到72张。', explanation: '72÷8＝9盒；8张每盒乘9盒，得到72张。' },
    { knowledgePointIds: allDivisionKnowledgePoints, prompt: '72个积木分别按“每盒8个”和“每盒9个”装盒，哪种装法用的盒子更少？', answer: '9个/袋只需8袋，比8个/袋的9袋少1袋', distractors: ['8个/袋只需8袋，比9个/袋的9袋少1袋', '两种装法都要9袋'], hint: '分别用72除以每盒的个数，再比较盒数。', explanation: '72÷8＝9袋，72÷9＝8袋；每盒装9个时少用1袋。' },
    { knowledgePointIds: allDivisionKnowledgePoints, prompt: '9个小队每队7张卡片，先想总数，再把卡片按每份7张重新分组。怎样求重新分成几份？', answer: '先用9×7=63求总数，再用63÷7=9求份数', distractors: ['先用9×7=63求总数，再用63÷9=7求份数', '先用9+7=16求总数，再用16÷7=9求份数'], hint: '重新分组时，除以的是每一份的张数。', explanation: '原有63张卡片，每份7张，可以重新分成9份。' },
    { knowledgePointIds: allDivisionKnowledgePoints, prompt: '已知8×9=72，哪组除法都能由它推出？', answer: '72÷9=8，72÷8=9；除数和商的位置互换', distractors: ['72÷9=9，72÷8=8；除数和商保持原样', '9÷72=8，8÷72=9；把乘数作被除数'], hint: '积分别除以两个乘数，得到另一个乘数。', explanation: '72÷9＝8，72÷8＝9；两个乘数轮流作除数和商。' },
    { knowledgePointIds: allDivisionKnowledgePoints, prompt: '两道题都算72÷9：一题平均分给9人，另一题每9个装一袋。哪句话能说明它们的答案单位不同？', answer: '两题的商都是8，但一道表示每份数量，另一道表示份数', distractors: ['两题的商都是9，单位也都表示人数', '一道求72个物品，另一道求9个物品'], hint: '分别看题目问每个人分到多少，还是能装成几袋。', explanation: '平均分给9人时，8表示每人8个；每袋9个时，8表示8袋。' },
  ],
};

export const grade2Term2MathUnit04SupplementalActivities: Grade2Term2MathUnit04SupplementalActivity[] = Object.entries(drafts).flatMap(([difficulty, items]) => (
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
