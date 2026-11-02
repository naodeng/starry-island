import type { ChoiceActivityDefinition, Difficulty } from '../../content/types';

export interface Grade2Term2MathUnit02SupplementalActivity {
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

const sourceUnitId = 'grade-2/term-2/math/unit-02';
const idPrefix = 'challenge-supplement-grade-2-term-2-math-unit-02';
const sharing = 'division-as-equal-sharing-and-grouping';
const facts = 'division-facts-from-multiplication';
const quotientMeaning = 'meaning-and-units-of-quotients';

const drafts: Record<Difficulty, ActivityDraft[]> = {
  basic: [
    { knowledgePointIds: [sharing, quotientMeaning], prompt: '小林把18张卡平均分给3个小组，要回答每组分到几张。哪种题意相符？', answer: '18张卡平均分成3份，每份几张', distractors: ['18张卡每份放3张，可以分成几份', '把3张卡分给18个同学，每人一样多'], hint: '看题目问的是每一份有多少，还是能分成几份。', explanation: '题目已知分成3份，所求是每份张数；如果每份放3张，才是在求份数。' },
    { knowledgePointIds: [sharing, quotientMeaning], prompt: '18个棋子每盒放6个，算式18÷6中的商表示什么？', answer: '盒数', distractors: ['每盒棋子的数量', '棋子的总数'], hint: '每盒放多少已经知道，题目要数能装几盒。', explanation: '18÷6求的是每6个装一盒能装几盒，商的单位是盒。' },
    { knowledgePointIds: [facts], prompt: '已知6乘4等于24，哪个除法算式的商是4？', answer: '24÷6=4', distractors: ['24÷4=4', '6÷24=4'], hint: '把积24作被除数，再用其中一个乘数作除数。', explanation: '因为6×4＝24，所以24÷6＝4。' },
    { knowledgePointIds: [sharing, quotientMeaning], prompt: '把20朵花平均放进4个花瓶，每瓶放几朵？', answer: '每瓶5朵', distractors: ['每瓶4朵', '每瓶6朵'], hint: '把20平均分成4份，想4乘几等于20。', explanation: '20÷4＝5，每瓶放5朵；4×5＝20可以检查总数。' },
    { knowledgePointIds: [sharing, quotientMeaning], prompt: '一共有30张卡片，每5张装进一个袋子。题目要算什么？', answer: '袋数', distractors: ['每袋卡片的张数', '卡片一共有多少张'], hint: '每袋放多少张已经给出，要找能装几个袋子。', explanation: '30÷5求可以装几袋，商表示袋数。' },
    { knowledgePointIds: [sharing, quotientMeaning], prompt: '28个棋子平均分给4个小队，28÷4的商表示什么？', answer: '每队棋子的数量', distractors: ['参加分配的小队数', '棋子的总数'], hint: '小队数已经知道，想想每队分到多少。', explanation: '28÷4求每队分到的棋子数，商的单位是个/队。' },
    { knowledgePointIds: [facts], prompt: '用乘法验算24÷6=4，哪道算式能回到原来的总数？', answer: '6×4=24', distractors: ['24×6=4', '24+6=4'], hint: '除数乘商，应该等于被除数。', explanation: '6×4＝24，乘法结果回到被除数，验算正确。' },
    { knowledgePointIds: [sharing, quotientMeaning], prompt: '下面哪个问题所求的是每一份的数量？', answer: '每份有几个', distractors: ['一共分成几份', '总数一共有几个'], hint: '找出题目中“每份”后面要填写的数量。', explanation: '求每份有几个，是把总数平均分后求一份的数量。' },
    { knowledgePointIds: [sharing, quotientMeaning], prompt: '一条16厘米彩带，每4厘米剪成一段，可以剪成几段？', answer: '4段', distractors: ['12段', '20段'], hint: '用彩带总长除以每段长度。', explanation: '16÷4＝4，可以剪成4段；商的单位是段。' },
    { knowledgePointIds: [sharing, quotientMeaning], prompt: '15个点心平均分给3位同学，选哪道算式求每人分到的点心数？', answer: '15÷3', distractors: ['15×3', '15+3'], hint: '已知总数和人数，平均分后要找每人多少。', explanation: '用15除以3求每人分到的数量，算式是15÷3。' },
    { knowledgePointIds: [sharing, quotientMeaning], prompt: '20个橘子平均分给5位同学，算式20÷5中5表示什么？', answer: '参加分配的同学人数', distractors: ['橘子的总数', '每人分到的橘子数'], hint: '除数5对应题目里已经知道的哪一项？', explanation: '5表示参加平均分的同学人数，商4表示每位同学分到4个。' },
    { knowledgePointIds: [sharing, quotientMeaning], prompt: '两题都用18÷3：一题问每人分到几张，另一题问每袋放3张能装几袋。怎样描述这两题？', answer: '求每份数量和求份数是两种不同问题', distractors: ['两题都是求总数', '两题都在求每份放3张'], hint: '比较两题中未知的是每一份有多少，还是份数有多少。', explanation: '一个问题求每份数量，另一个问题求份数；相同算式可以表示不同的平均分问题。' },
    { knowledgePointIds: [facts], prompt: '用乘法口诀求42÷6，哪道乘法能帮助找到商？', answer: '6×7=42', distractors: ['6×6=42', '7×7=42'], hint: '想6乘几等于42。', explanation: '6×7＝42，所以42÷6的商是7。' },
    { knowledgePointIds: [sharing, quotientMeaning], prompt: '把24颗糖平均分给4位伙伴，怎样完整地报告每个人分到多少？', answer: '每人6颗', distractors: ['一共24颗', '分成4份'], hint: '把算出的商和对应的对象、单位说完整。', explanation: '24÷4＝6，每人分到6颗。' },
  ],
  advanced: [
    { knowledgePointIds: [sharing, quotientMeaning], prompt: '两道卡片题都写24÷6：一题把卡片平均分成6份，一题每6张放一袋。两题分别在求什么？', answer: '一题求每份数量，另一题求份数', distractors: ['两题都求卡片总数', '两题都求每份放几张'], hint: '第一题已知份数，第二题已知每份数量。', explanation: '平均分成6份时求每份数量；每份6张时求能分成几份。' },
    { knowledgePointIds: [sharing, quotientMeaning], prompt: '20张卡片平均分给5个小队，和20张卡片每5张装一袋，算出的4代表的量有什么不同？', answer: '每组4张和4袋的单位不同', distractors: ['两题中的4都表示卡片总数', '两题中的4都表示小队人数'], hint: '分别看每道题已经知道几份、或每份放多少。', explanation: '平均分给5队时，4表示每队4张；每袋5张时，4表示装成4袋。' },
    { knowledgePointIds: [facts], prompt: '如果6×7=42，能直接推出哪道除法算式？', answer: '42÷6=7', distractors: ['42÷7=7', '6÷42=7'], hint: '积作被除数，一个乘数作除数，另一个乘数作商。', explanation: '6×7＝42，因此42÷6＝7。' },
    { knowledgePointIds: [sharing, facts], prompt: '4张桌子各准备6条彩带，共有多少条；再平均分给3个活动台，每台几条？', answer: '每台8条', distractors: ['每台6条', '每台24条'], hint: '先求4桌一共有多少条，再把总数平均分成3份。', explanation: '4×6＝24条，24÷3＝8条，每个活动台分到8条。' },
    { knowledgePointIds: [sharing, quotientMeaning], prompt: '两题的商都是7：28个棋子平均分给4队，和28个棋子每4个放一盒。商7分别表示什么？', answer: '两个商都是7，但一个表示每组数量，一个表示组数', distractors: ['两个商都表示棋子总数', '两个商都表示每队人数'], hint: '看每题问的是分到每队多少，还是能装几盒。', explanation: '第一题的7表示每队7个，第二题的7表示能装7盒；要结合问题理解商。' },
    { knowledgePointIds: [sharing, quotientMeaning], prompt: '35个零件平均分给5个小队，一位同学说“商7表示7个小队”。怎样改正？', answer: '商7表示每队7个，不是队伍数', distractors: ['商7表示零件总数', '商7表示每队5个'], hint: '小队数已经是5，除法要找的是每队的零件数。', explanation: '35÷5＝7，7表示每队分到7个零件；队伍数是已知的5。' },
    { knowledgePointIds: [sharing, facts, quotientMeaning], prompt: '6篮苹果每篮8个，把苹果全部平均分给3张桌子，每张桌子放多少个？', answer: '16个/桌', distractors: ['14个/桌', '48个/桌'], hint: '先求苹果总数，再除以桌子的数量。', explanation: '6×8＝48个，48÷3＝16个，每张桌子放16个。' },
    { knowledgePointIds: [sharing, quotientMeaning], prompt: '36颗珠子每4颗串成一串，应该列什么算式求串数？', answer: '36÷4', distractors: ['36×4', '36+4'], hint: '知道总数和每串数量，要找可以分成几串。', explanation: '用总数36除以每串4颗，36÷4求串数。' },
    { knowledgePointIds: [facts, quotientMeaning], prompt: '36个贴纸平均分给4组，或平均分给6组。哪种分法每组得到的更多？', answer: '36÷4的商是9，比36÷6的6大', distractors: ['两种分法每组一样多', '36÷6分得更多，因为6比4大'], hint: '分别用乘法口诀求出两道除法的商，再比较。', explanation: '36÷4＝9，36÷6＝6；9比6大，所以分成4组时每组更多。' },
    { knowledgePointIds: [sharing, quotientMeaning], prompt: '20个苹果平均分给5位同学，算式20÷5=4中5和4分别表示什么？', answer: '5表示同学人数，4表示每人数量', distractors: ['4表示参加分配的同学人数', '5表示每人分到的数量'], hint: '在平均分情境中，除数对应已知份数，商对应每份数量。', explanation: '20÷5＝4；5是参加分配的同学人数，4是每人分到的苹果数。' },
    { knowledgePointIds: [facts], prompt: '用乘法验算48÷6=8，哪道乘法正确？', answer: '6×8=48', distractors: ['48×6=8', '48+6=8'], hint: '除数乘商应该等于被除数。', explanation: '6×8＝48，结果回到被除数，验算正确。' },
    { knowledgePointIds: [sharing, quotientMeaning], prompt: '32个苹果每篮放8个，商表示哪种数量？', answer: '4篮', distractors: ['每篮32个', '每篮8个'], hint: '每篮放多少已经知道，要看能装成几篮。', explanation: '32÷8＝4，商表示可以装成4篮。' },
    { knowledgePointIds: [sharing, facts, quotientMeaning], prompt: '24张卡平均分成4份，每份6张；要检查总数是否相符，怎样做？', answer: '4×6=24，再看每份是不是一样多', distractors: ['24÷6=4，不用检查每份是否相同', '只比较第一份和总数'], hint: '既要核对总数，也要检查每一份数量相等。', explanation: '4份每份6张合计24张；还要确认4份确实一样多，才符合平均分。' },
    { knowledgePointIds: [sharing, quotientMeaning], prompt: '45本书平均放在5个书架上，每架放几本？答案怎样写才完整？', answer: '每架9本', distractors: ['9个书架', '每架5本'], hint: '商要说明是每个书架分到的本数。', explanation: '45÷5＝9，每架放9本；“本”是数量单位，“每架”说明分配对象。' },
  ],
  high: [
    { knowledgePointIds: [sharing, facts, quotientMeaning], prompt: '5盒画笔每盒8支，把画笔平均分给4张桌子，每张桌子分到多少支？', answer: '每桌10支', distractors: ['每桌8支', '每桌40支'], hint: '先求画笔总数，再平均分给4张桌子，并带上对应单位。', explanation: '5×8＝40支，40÷4＝10支，每桌10支。' },
    { knowledgePointIds: [sharing, facts, quotientMeaning], prompt: '72张路线卡平均分给8队。哪种列式、商和验算都正确？', answer: '72÷8=9，9×8=72', distractors: ['72÷8=8，8×8=72', '72×8=9，9÷8=72'], hint: '先想8乘几等于72，再用8乘商核对。', explanation: '8×9＝72，所以72÷8＝9；9×8也等于72。' },
    { knowledgePointIds: [sharing, quotientMeaning], prompt: '两道问题都用36÷6：一题问平均分给6人后每人多少，另一题问每盒6个能装几盒。怎样理解这两个商？', answer: '同一个商可以表示每份数量，也可以表示份数', distractors: ['商永远只表示人数', '商永远只表示物品总数'], hint: '除法的意思要结合题目问的是每份多少还是几份。', explanation: '平均分给6人时，商表示每人拿到的数量；每6个装一盒时，商表示盒数。' },
    { knowledgePointIds: [sharing, quotientMeaning], prompt: '24个球要平均分给4队，记录表写各队为5个、7个、6个、6个。怎样调整才符合平均分？', answer: '每队都调整为6个球，合计24个球', distractors: ['保留5个、7个、6个、6个，因为合计是24个', '每队都分7个，不用核对总数'], hint: '平均分要同时满足总数正确和每份一样多。', explanation: '5、7、6、6虽然合计24，但每队不一样多；4队各6个球，既相等又合计24个球。' },
    { knowledgePointIds: [sharing, facts, quotientMeaning], prompt: '42颗豆子平均分给6个小组，每组7颗。怎样说明7的意思并检查结果？', answer: '商7表示每份数量，6×7=42可验算', distractors: ['商7表示小组数，7×6=7可验算', '商7表示豆子总数，42÷7=6可验算'], hint: '小组数已知，商表示每组得到的豆子数。', explanation: '42÷6＝7，7表示每组7颗；6×7＝42可检查总数。' },
    { knowledgePointIds: [sharing, quotientMeaning], prompt: '两题都写49÷7：第一题把49根木条平均分成7组，第二题每7根装一捆。除数7在两题中分别表示什么？', answer: '第一题的7表示组数，第二题的7表示每份数量', distractors: ['第一题的7表示每份数量，第二题的7表示组数', '两题中的7都表示木条总数'], hint: '平均分成7组时，7是份数；每份7根时，7是每份数量。', explanation: '第一题已知分成7组，第二题已知每捆7根；除数含义由题目条件决定。' },
    { knowledgePointIds: [sharing, facts, quotientMeaning], prompt: '56根木条平均分给7队，和56根木条每7根扎一捆，两个商都等于8。怎样把答案说清楚？', answer: '第一题8根/队，第二题8袋', distractors: ['两题都说8队', '两题都说8根木条总数'], hint: '商的数值相同，也要按题意说明不同单位。', explanation: '平均分给7队时每队8根；每捆7根时可以扎8袋。' },
    { knowledgePointIds: [sharing, facts, quotientMeaning], prompt: '4盒苹果每盒5个，把苹果平均分给2个班，每班分到多少个？', answer: '每班10个苹果', distractors: ['每班5个苹果', '每班20个苹果'], hint: '先求4盒一共有多少个，再把总数平均分成2份。', explanation: '4×5＝20个，20÷2＝10个；每班分到10个苹果。' },
    { knowledgePointIds: [sharing, facts, quotientMeaning], prompt: '24张卡分给4队，方案是每队6张，而且总数刚好用完。怎样确认它符合平均分？', answer: '每队都分6张，合计24张，方案符合平均分', distractors: ['只要总数是24就可以，不用比较各队', '只检查一队有没有拿到卡'], hint: '检查总数是否正确，也检查每一份是否一样多。', explanation: '4队每队6张合计24张，且每队一样多，所以方案符合平均分。' },
    { knowledgePointIds: [sharing, quotientMeaning], prompt: '两个问题都算24÷6=4：一个是平均分给6人，另一个是每盒放6个。答案怎样写能看出商的单位？', answer: '前题写每人4个，后题写4袋', distractors: ['两题都只写数字4', '前题写4人，后题写每袋4个'], hint: '把商和题目中的分配对象、每份条件对应起来。', explanation: '第一题的4表示每人4个；第二题的4表示可以装4袋，答案单位不同。' },
    { knowledgePointIds: [facts, quotientMeaning], prompt: '一位同学说72÷8=9。用哪句话说明这个商正确？', answer: '9×8=72，所以72÷8=9', distractors: ['72×8=9，所以72÷8=9', '9+8=72，所以72÷8=9'], hint: '用除数乘商，检查是否回到被除数。', explanation: '除数8乘商9等于72，所以72÷8＝9。' },
    { knowledgePointIds: [sharing, quotientMeaning], prompt: '比较两道问题：63个棋子平均分成9组；63个棋子每9个装一袋。两题的商分别表示什么？', answer: '每份的数量；可以分成的组数', distractors: ['棋子的总数；每份的数量', '参加分配的人数；棋子的总数'], hint: '第一题已知组数，第二题已知每袋个数。', explanation: '平均分成9组时求每组多少；每袋9个时求可以装成几袋。' },
    { knowledgePointIds: [sharing, quotientMeaning], prompt: '解决平均分问题时，怎样先判断该用哪种除法并写出完整结果？', answer: '先看题目已知份数还是每份数量，再确定商的单位', distractors: ['只看总数，任何题都把商叫“份数”', '不读问题，直接把被除数写作答案'], hint: '先分清已知的是几份还是每份多少，再看题目问什么。', explanation: '判断已知条件后确定商表示每份数量或份数，并配上相应单位。' },
    { knowledgePointIds: [sharing, facts, quotientMeaning], prompt: '要让另一个小组复核你的平均分计算，记录里应写哪些内容？', answer: '写清总数、分组条件、商的单位，并用乘法核对', distractors: ['只写商，不写题目问的是每份还是几份', '只写被除数，不写分组条件和验算'], hint: '复核者需要知道总数、怎么分、商表示什么，以及如何检查。', explanation: '完整记录条件、算式、结果单位和乘法验算，别人才能复核平均分是否正确。' },
  ],
};

export const grade2Term2MathUnit02SupplementalActivities: Grade2Term2MathUnit02SupplementalActivity[] = Object.entries(drafts).flatMap(([difficulty, items]) => (
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
