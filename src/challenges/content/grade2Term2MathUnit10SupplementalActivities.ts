import type { ChoiceActivityDefinition, Difficulty } from '../../content/types';

export interface Grade2Term2MathUnit10SupplementalActivity {
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

const sourceUnitId = 'grade-2/term-2/math/unit-10';
const idPrefix = 'challenge-supplement-grade-2-term-2-math-unit-10';
const number = 'number-composition-and-place-value';
const zero = 'zero-as-placeholder';
const reading = 'reading-and-writing-within-10000';
const comparing = 'comparing-and-ordering-within-10000';
const multiplication = 'multiplication-facts';
const division = 'division-facts-from-multiplication';
const sharing = 'division-as-equal-sharing-and-grouping';
const remainder = 'quotient-and-remainder-meaning';
const remainderBound = 'remainder-less-than-divisor';
const remainderContext = 'interpreting-remainder-in-context';
const twoDigitArithmetic = 'two-digit-addition-and-subtraction';
const largeAddition = 'addition-and-subtraction-within-10000';
const mixedOperations = 'mixed-operations-multiplication-division-before-addition-subtraction';
const parentheses = 'mixed-operations-parentheses-first';
const sameLevel = 'mixed-operations-same-level-left-to-right';
const symmetry = 'axis-symmetry-and-symmetry-axis';
const translation = 'translation-direction-and-orientation';
const rotation = 'rotation-around-fixed-center';
const massConversion = 'mass-unit-conversion';
const massComparison = 'mass-comparison-and-estimation';
const survey = 'survey-design-and-data-collection';
const organizeData = 'organizing-survey-data';
const tables = 'reading-and-reasoning-with-statistical-tables';
const integratedReview = 'integrated-review-and-answer-checking';

const drafts: Record<Difficulty, ActivityDraft[]> = {
  basic: [
    { knowledgePointIds: [multiplication], prompt: '6盒彩笔每盒8支，一共有多少支？', answer: '48', distractors: ['42', '54'], hint: '求6个8是多少。', explanation: '6盒，每盒8支，用6乘8，得到48支。' },
    { knowledgePointIds: [division], prompt: '45÷5等于多少？', answer: '9', distractors: ['8', '10'], hint: '想哪个数乘5等于45。', explanation: '5乘9等于45，所以45÷5=9。' },
    { knowledgePointIds: [reading, zero], prompt: '“五千零七十二”写成数字是多少？', answer: '5,072', distractors: ['5,720', '5,702'], hint: '按千、百、十、个的顺序写出数字，空着的数位用0占位。', explanation: '五千零七十二由5个千、0个百、7个十和2个一组成，写作5,072。' },
    { knowledgePointIds: [number, zero], prompt: '5,072中的0占在哪个数位？', answer: '百位', distractors: ['十位', '个位'], hint: '从右往左依次看各个数位，找到0所在的位置。', explanation: '5,072从右往左是个位2、十位7、百位0、千位5，因此0占百位。' },
    { knowledgePointIds: [massConversion], prompt: '4千克等于多少克？', answer: '4,000克', distractors: ['400克', '4,400克'], hint: '每1千克是1,000克。', explanation: '4千克有4个1,000克，等于4,000克。' },
    { knowledgePointIds: [symmetry], prompt: '一个图形沿一条直线对折后，两边能够完全重合，这个图形有什么特点？', answer: '轴对称', distractors: ['平移', '旋转'], hint: '想想对折后图形的两部分是什么关系。', explanation: '沿着一条直线对折后两边完全重合，说明图形具有轴对称特点。' },
    { knowledgePointIds: [rotation], prompt: '风车叶片绕着中间的轴转动，属于哪种运动？', answer: '旋转', distractors: ['平移', '轴对称'], hint: '观察叶片是不是绕一个固定位置转动。', explanation: '风车叶片绕固定的轴转动，属于旋转。' },
    { knowledgePointIds: [sharing], prompt: '12个棋子平均放进3个盒子，每个盒子放几个？', answer: '4个', distractors: ['3个', '5个'], hint: '把12个棋子平均分成3份。', explanation: '12÷3=4，每个盒子放4个棋子。' },
    { knowledgePointIds: [massConversion], prompt: '1千克200克合多少克？', answer: '1,200克', distractors: ['1,020克', '200克'], hint: '先把1千克换成克，再加上200克。', explanation: '1千克是1,000克，1,000克加200克等于1,200克。' },
    { knowledgePointIds: [mixedOperations], prompt: '计算12+3×4，先算乘法，再算加法，结果是多少？', answer: '24', distractors: ['60', '36'], hint: '没有括号时，乘法先于加法。', explanation: '先算3×4=12，再算12+12=24。' },
    { knowledgePointIds: [tables], prompt: '调查记录：足球10票、篮球10票、跳绳8票。哪两项并列最多？', answer: '足球和篮球并列最多', distractors: ['只有足球最多', '跳绳最多'], hint: '比较三项记录，留意是否有相同的最大数量。', explanation: '足球和篮球各有10票，都是三项中最多的，因此并列最多。' },
    { knowledgePointIds: [translation], prompt: '小车沿直线向前滑动，车头方向没有改变，属于哪种运动？', answer: '平移', distractors: ['旋转', '轴对称'], hint: '观察小车是整体换位置，还是绕一个点转动。', explanation: '小车沿直线整体移动，方向没有改变，属于平移。' },
    { knowledgePointIds: [comparing], prompt: '4,090和4,900相比，哪个数更大？', answer: '4,900', distractors: ['4,090', '两个数一样大'], hint: '千位相同后，继续比较百位。', explanation: '千位都是4，百位上的9大于0，所以4,900更大。' },
    { knowledgePointIds: [survey, organizeData], prompt: '开始做一次班级兴趣调查前，第一步应该做什么？', answer: '先确定调查问题', distractors: ['先公布调查结果', '先随意填写数据'], hint: '先想清楚这次调查想了解什么。', explanation: '明确调查问题后，才能决定收集哪些信息并按规则记录。' },
  ],
  advanced: [
    { knowledgePointIds: [multiplication, twoDigitArithmetic], prompt: '4盒彩笔每盒8支，又拿来7支，现在一共有多少支？', answer: '39', distractors: ['32', '43'], hint: '先算4盒有多少支，再把新拿来的7支加上。', explanation: '4×8=32，32+7=39支。' },
    { knowledgePointIds: [mixedOperations], prompt: '计算16+3×5，结果是多少？', answer: '31', distractors: ['95', '35'], hint: '没有括号时，先算乘法。', explanation: '先算3×5=15，再算16+15=31。' },
    { knowledgePointIds: [remainder, remainderBound, remainderContext], prompt: '49张贴纸每8张装一袋，最多装满几袋，还剩几张？', answer: '6袋，还剩1张', distractors: ['5袋，还剩9张', '7袋，还剩1张'], hint: '先找出8的乘法口诀中不超过49的最大积，再看差多少。', explanation: '8×6=48，49−48=1，所以装满6袋，还剩1张。' },
    { knowledgePointIds: [massConversion, massComparison], prompt: '一箱水果重2千克，另一箱重1,400克。第一箱比第二箱重多少克？', answer: '600克', distractors: ['400克', '600千克'], hint: '先把2千克换成克，再相减。', explanation: '2千克是2,000克，2,000−1,400=600克。' },
    { knowledgePointIds: [mixedOperations, parentheses], prompt: '算式(18+12)÷5中，第一步先算什么？', answer: '先算括号里的加法', distractors: ['先算除法', '先算18除以5'], hint: '先看算式里有没有括号。', explanation: '有括号时先算括号里面，第一步是18+12。' },
    { knowledgePointIds: [tables], prompt: '借阅表记录：科普书14本、故事书11本、画册8本。哪类书借得最多？', answer: '科普书', distractors: ['故事书', '画册'], hint: '比较表中三类书的数量。', explanation: '14本比11本和8本都多，所以科普书借得最多。' },
    { knowledgePointIds: [translation, rotation], prompt: '棋子向左移动两格，朝向没有改变，属于哪种运动？', answer: '平移', distractors: ['旋转', '轴对称'], hint: '位置变了，朝向有没有变？', explanation: '棋子整体换了位置而朝向不变，属于平移。' },
    { knowledgePointIds: [division, sharing], prompt: '48颗棋子平均分给8名伙伴，每人分到几颗？', answer: '6', distractors: ['5', '8'], hint: '想哪个数乘8等于48。', explanation: '8×6=48，所以48÷8=6，每人分到6颗。' },
    { knowledgePointIds: [reading, zero], prompt: '5,080应该怎样读？', answer: '五千零八十', distractors: ['五千八百', '五千零八'], hint: '百位没有计数单位，十位有8个十。', explanation: '5,080由5个千和8个十组成，读作五千零八十。' },
    { knowledgePointIds: [massConversion], prompt: '1千克和250克合起来是多少克？', answer: '1,250克', distractors: ['1,025克', '250克'], hint: '先把千克换成克。', explanation: '1千克是1,000克，1,000+250=1,250克。' },
    { knowledgePointIds: [survey, organizeData], prompt: '已经收集好一班同学最喜欢的运动，下一步怎样整理更清楚？', answer: '把数据分类记录', distractors: ['删掉数量较少的记录', '不分类直接猜结果'], hint: '把相同类别放在一起，方便查看数量。', explanation: '按运动类别分类记录，才能清楚比较各项数量。' },
    { knowledgePointIds: [symmetry], prompt: '把对称图形折叠后能使两边重合的那条直线叫什么？', answer: '对称轴', distractors: ['旋转中心', '平移路线'], hint: '它是图形对折后两边重合的那条线。', explanation: '能把轴对称图形分成两边重合部分的直线叫对称轴。' },
    { knowledgePointIds: [massConversion, twoDigitArithmetic], prompt: '2千克比1,550克重多少克？', answer: '450克', distractors: ['550克', '450千克'], hint: '先把2千克换成克，再计算相差多少。', explanation: '2千克是2,000克，2,000−1,550=450克。' },
    { knowledgePointIds: [sameLevel], prompt: '计算18−6+4，按同级加减从左往右计算，结果是多少？', answer: '16', distractors: ['8', '10'], hint: '加法和减法是同一级运算，按从左往右的顺序计算。', explanation: '先算18−6=12，再算12+4=16。' },
  ],
  high: [
    { knowledgePointIds: [remainder, remainderBound, remainderContext], prompt: '53张卡片每8张装一盒，最多装满几盒，还剩几张？', answer: '6盒，还剩5张', distractors: ['7盒，还剩3张', '5盒，还剩13张'], hint: '先用8的乘法口诀找出不超过53的最大积。', explanation: '8×6=48，53−48=5，所以装满6盒，还剩5张。' },
    { knowledgePointIds: [multiplication], prompt: '每名伙伴发9张卡片，发给6名伙伴，一共需要多少张？', answer: '54', distractors: ['15', '45'], hint: '求6个9是多少。', explanation: '9×6=54，一共需要54张卡片。' },
    { knowledgePointIds: [largeAddition], prompt: '图书角原有2,450本书，又整理好1,275本。现在一共有多少本？', answer: '3,725', distractors: ['3,625', '3,715'], hint: '按千、百、十、个位对齐后相加。', explanation: '2,450+1,275=3,725本。' },
    { knowledgePointIds: [tables], prompt: '调查表记录：红色贴纸16张、黄色12张、蓝色16张。哪两种颜色并列最多？', answer: '红色和蓝色并列最多', distractors: ['只有红色最多', '黄色和蓝色并列最多'], hint: '先找最大数量，再检查是否有两项相同。', explanation: '红色和蓝色都是16张，比黄色的12张多，因此并列最多。' },
    { knowledgePointIds: [massConversion], prompt: '一袋米重1千克250克，一袋豆子重1千克400克，两袋合重多少克？', answer: '2,650克', distractors: ['2,150克', '2,650千克'], hint: '把两袋的质量都写成克后再相加。', explanation: '1千克250克是1,250克，1千克400克是1,400克，合计2,650克。' },
    { knowledgePointIds: [mixedOperations, parentheses], prompt: '算式(15+9)÷3+4中，第一步应该算什么？', answer: '先计算括号里的内容', distractors: ['先算除法', '先算最后的加法'], hint: '计算时先看有没有括号。', explanation: '有括号时先计算括号里面的15+9。' },
    { knowledgePointIds: [largeAddition], prompt: '计算3,450+350，结果是多少？', answer: '3,800', distractors: ['3,500', '3,850'], hint: '把相同数位对齐，注意百位满十后的进位。', explanation: '3,450+350=3,800。' },
    { knowledgePointIds: [twoDigitArithmetic, integratedReview], prompt: '活动室需要24把椅子，已经摆好23把，还需要多少把？', answer: '1把', distractors: ['2把', '23把'], hint: '用需要的总数减去已经摆好的数量。', explanation: '24−23=1，还需要1把椅子。' },
    { knowledgePointIds: [remainder, remainderBound, remainderContext], prompt: '43名同学每组8人，最多能分成几个完整小组，还剩几人？', answer: '5组，还剩3人', distractors: ['6组，还剩5人', '4组，还剩11人'], hint: '找出8的乘法口诀中不超过43的最大积。', explanation: '8×5=40，43−40=3，所以分成5个完整小组，还剩3人。' },
    { knowledgePointIds: [translation, rotation], prompt: '一支笔沿桌面向前滑动，笔尖方向没有改变，属于哪种运动？', answer: '平移', distractors: ['旋转', '轴对称'], hint: '笔整体改变位置，还是绕着某一点转动？', explanation: '笔沿直线整体移动且方向不变，属于平移。' },
    { knowledgePointIds: [sharing, division], prompt: '56块积木平均放进8个盒子，每个盒子放几块？', answer: '7块', distractors: ['6块', '8块'], hint: '想哪个数乘8等于56。', explanation: '56÷8=7，每个盒子放7块积木。' },
    { knowledgePointIds: [massConversion], prompt: '1千克250克和1千克500克合起来是多少克？', answer: '2,750克', distractors: ['2,250克', '2,750千克'], hint: '先把两段千克质量换成克，再合并。', explanation: '1,250克加1,500克等于2,750克。' },
    { knowledgePointIds: [number, zero], prompt: '5,072中数字7在什么数位，表示多少？', answer: '70', distractors: ['700', '7'], hint: '从右往左数，找到数字7所在的位置。', explanation: '7在十位，表示7个十，也就是70。' },
    { knowledgePointIds: [survey, organizeData], prompt: '准备调查同学最喜欢的课间活动，怎样开始才能让记录清楚？', answer: '先明确调查问题和记录规则', distractors: ['先挑一个结果写进表格', '只问一位同学就当作全班结果'], hint: '先想清楚要了解什么，以及怎样记录每种回答。', explanation: '明确问题和记录规则后，再收集并分类整理数据，结果才容易核对。' },
  ],
};

export const grade2Term2MathUnit10SupplementalActivities: Grade2Term2MathUnit10SupplementalActivity[] = Object.entries(drafts).flatMap(([difficulty, items]) => (
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
