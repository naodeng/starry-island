import type { ChoiceActivityDefinition, Difficulty } from '../../content/types';

interface ActivityDraft {
  knowledgePointIds: string[];
  prompt: string;
  answer: string;
  distractors: [string, string];
  hint: string;
  explanation: string;
}

export interface Grade1Term2MathUnit08SupplementalActivity {
  difficulty: Difficulty;
  sourceUnitId: string;
  knowledgePointIds: string[];
  activity: ChoiceActivityDefinition;
}

const sourceUnitId = 'grade-1/term-2/math/unit-08';
const idPrefix = 'challenge-supplement-grade-1-term-2-math-unit-08';
const shapes = ['plane-shape-recognition'];
const subtraction = ['subtraction-within-20'];
const classification = ['classification-standard'];
const numbers = ['number-sequence-to-100'];
const money = ['yuan-jiao-fen-conversion'];
const addition = ['two-digit-add-subtract-one'];
const patterns = ['repeating-shape-patterns'];

const drafts: Record<Difficulty, ActivityDraft[]> = {
  basic: [
    { knowledgePointIds: [...shapes, 'plane-shape-features'], prompt: '哪种平面图形有三条直边？', answer: '三角形', distractors: ['正方形', '圆形'], hint: '数一数每种图形的直边条数。', explanation: '三角形有三条直边；正方形有四条，圆形没有直边。' },
    { knowledgePointIds: [...shapes, 'plane-shape-features'], prompt: '长方形和正方形都有哪项特点？', answer: '都有四条直边', distractors: ['都有三条直边', '都没有直边'], hint: '观察它们外轮廓的边数。', explanation: '长方形和正方形都是四边形，都有四条直边。' },
    { knowledgePointIds: [...subtraction, 'subtraction-strategy'], prompt: '15−7 的得数是多少？', answer: '8', distractors: ['7', '9'], hint: '把 15 看成 10 和 5，再想怎样计算。', explanation: '15−7=8。可以先从 15 中拿走 5 得到 10，再拿走 2。' },
    { knowledgePointIds: [...classification, 'classification-recording'], prompt: '按颜色整理卡片：红色 4 张、蓝色 3 张。记录时哪种做法清楚？', answer: '分颜色记录，再核对两类数量', distractors: ['只记卡片总数，不分颜色', '红色和蓝色都记在同一格里'], hint: '整理前先确定分类标准。', explanation: '按颜色分类并分别记录，能看清每种颜色有多少张。' },
    { knowledgePointIds: ['two-digit-number-composition'], prompt: '46 里面有几个十和几个一？', answer: '4 个十和 6 个一', distractors: ['6 个十和 4 个一', '46 个十和 0 个一'], hint: '看十位和个位分别表示什么。', explanation: '46 的十位是 4，个位是 6，所以它由 4 个十和 6 个一组成。' },
    { knowledgePointIds: [...money, 'currency-denominations'], prompt: '3 元等于多少角？', answer: '30 角', distractors: ['13 角', '300 角'], hint: '1 元等于 10 角。', explanation: '3 元有 3 个 10 角，合起来是 30 角。' },
    { knowledgePointIds: [...addition, 'two-digit-number-composition'], prompt: '32 个贴纸又得到 5 个，现在一共有多少个？', answer: '37 个', distractors: ['27 个', '82 个'], hint: '把后来得到的 5 个和原来的数量合起来。', explanation: '32+5=37，一共有 37 个贴纸。' },
    { knowledgePointIds: [...patterns, 'pattern-rule-validation'], prompt: '图形按“圆、三角形、圆、三角形”轮流排，接下来是什么？', answer: '圆形', distractors: ['正方形', '三角形'], hint: '看看这两种图形怎样交替出现。', explanation: '圆形和三角形交替出现，三角形后面接圆形。' },
    { knowledgePointIds: [...numbers, 'number-comparison-to-100'], prompt: '数列 60、70、80 按相同规律继续，下一项是多少？', answer: '90', distractors: ['81', '100'], hint: '比较相邻两项每次增加多少。', explanation: '每次增加 10，80 再加 10 是 90。' },
    { knowledgePointIds: [...money, 'money-composition-and-comparison'], prompt: '哪种金额和 2 元一样多？', answer: '20 角', distractors: ['2 角', '200 角'], hint: '把元换成角时，每 1 元换成 10 角。', explanation: '2 元=20 角，所以两种金额一样多。' },
    { knowledgePointIds: [...subtraction, 'inverse-operation-check'], prompt: '13 个气球吹破 6 个，还剩几个？', answer: '7 个', distractors: ['19 个', '8 个'], hint: '吹破表示从原来的数量中拿走。', explanation: '13−6=7，还剩 7 个气球。' },
    { knowledgePointIds: [...classification, 'classification-results'], prompt: '桌上有 5 个圆片、2 个三角片。按图形整理后，三角片有几个？', answer: '2 个', distractors: ['5 个', '7 个'], hint: '只看三角片这一类。', explanation: '三角片这一类有 2 个；5 个圆片属于另一类。' },
    { knowledgePointIds: ['number-comparison-to-100'], prompt: '57 和 75 比，哪个数大？', answer: '75', distractors: ['57', '一样大'], hint: '先比较十位上的数字。', explanation: '75 有 7 个十，57 有 5 个十，所以 75 大。' },
    { knowledgePointIds: [...addition, 'two-digit-add-subtract-tens'], prompt: '25 再增加 30，结果是多少？', answer: '55', distractors: ['28', '85'], hint: '30 是 3 个十，个位上的数不变。', explanation: '25+30=55，25 加 3 个十得到 55。' },
    { knowledgePointIds: [...patterns, 'number-sequence-to-100'], prompt: '数列 3、6、9 每次增加 3，下一项是多少？', answer: '12', distractors: ['11', '13'], hint: '把 9 再增加 3。', explanation: '9+3=12，所以数列接着是 12。' },
    { knowledgePointIds: [...shapes, 'plane-shape-features'], prompt: '哪种平面图形的外轮廓没有直边？', answer: '圆形', distractors: ['三角形', '长方形'], hint: '观察外轮廓是弯曲的还是由直线围成的。', explanation: '圆形的外轮廓是弯曲的，没有直边。' },
    { knowledgePointIds: [...classification, 'classification-checking'], prompt: '数字卡片是 12、15、12、18。按数字整理后，哪一个数字出现了两次？', answer: '12', distractors: ['15', '18'], hint: '逐张核对卡片，不要漏掉相同的数。', explanation: '12 出现了两次，15 和 18 各出现一次。' },
    { knowledgePointIds: [...money, 'money-addition-and-change'], prompt: '2 元和 3 元合起来是多少？', answer: '5 元', distractors: ['5 角', '6 元'], hint: '把相同单位的金额相加。', explanation: '2 元+3 元=5 元。' },
    { knowledgePointIds: [...subtraction, 'subtraction-strategy'], prompt: '小篮里有 17 个梨，拿出 9 个后还剩多少个？', answer: '8 个', distractors: ['9 个', '26 个'], hint: '把拿出的数量从原有数量里减去。', explanation: '17−9=8，小篮里还剩 8 个梨。' },
    { knowledgePointIds: [...numbers, 'number-sequence-to-100'], prompt: '接着 91、92、93 往下数一个数，是多少？', answer: '94', distractors: ['95', '83'], hint: '每次数一个更大的相邻整数。', explanation: '93 后面一个数是 94。' },
    { knowledgePointIds: [...addition, 'inverse-operation-check'], prompt: '26+3=29。用哪道减法可以检查？', answer: '29−3=26', distractors: ['29+3=32', '26−3=23'], hint: '用和减去其中一个加数。', explanation: '29−3=26，能回到原来的 26，说明加法结果正确。' },
    { knowledgePointIds: [...patterns, 'pattern-rule-validation'], prompt: '彩旗按“红、黄、黄”一组重复。红旗后面依次是哪两种颜色？', answer: '黄、黄', distractors: ['红、黄', '蓝、黄'], hint: '先看一组里红旗后面的两面旗。', explanation: '每组是红、黄、黄，所以红旗后面接着两面黄旗。' },
    { knowledgePointIds: ['number-comparison-to-100'], prompt: '39 和 40 比，哪个数更大？', answer: '40', distractors: ['39', '一样大'], hint: '比较两个相邻整数的大小。', explanation: '40 比 39 多 1，所以 40 更大。' },
    { knowledgePointIds: [...classification, 'classification-results'], prompt: '记录卡上红色 4 个、绿色 3 个，一共有多少个？', answer: '7 个', distractors: ['1 个', '12 个'], hint: '把不同颜色的数量合起来。', explanation: '4+3=7，红色和绿色一共有 7 个。' },
    { knowledgePointIds: [...money, 'money-addition-and-change'], prompt: '买一本 6 元的书，付 10 元，应找回多少元？', answer: '4 元', distractors: ['5 元', '16 元'], hint: '用付出的钱减去书的价钱。', explanation: '10−6=4，应找回 4 元。' },
  ],
  advanced: [
    { knowledgePointIds: [...shapes, 'plane-shape-features'], prompt: '圆形、三角形、正方形中，哪种图形的边是弯曲的？', answer: '圆形', distractors: ['三角形', '正方形'], hint: '看一看边是不是由直线组成。', explanation: '圆形的边是弯曲的；三角形和正方形都有直边。' },
    { knowledgePointIds: [...subtraction, 'subtraction-strategy'], prompt: '计算 12−7 时，先从 12 里拿走 2 凑成 10，还要再拿走几个？', answer: '5 个', distractors: ['2 个', '7 个'], hint: '7 可以分成 2 和 5。', explanation: '先减去 2 得到 10，再减去 5 得到 5，因此 12−7=5。' },
    { knowledgePointIds: [...classification, 'classification-results'], prompt: '图形卡有 3 张三角形、4 张圆形和 1 张正方形。圆形卡有几张？', answer: '4 张', distractors: ['3 张', '8 张'], hint: '只数圆形这一类。', explanation: '记录中圆形有 4 张，其他两类不计入圆形数量。' },
    { knowledgePointIds: ['two-digit-number-composition'], prompt: '38 由几个十和几个一组成？', answer: '3 个十和 8 个一', distractors: ['8 个十和 3 个一', '38 个十'], hint: '十位表示几个十，个位表示几个一。', explanation: '38 的十位是 3，个位是 8，所以是 3 个十和 8 个一。' },
    { knowledgePointIds: [...money, 'currency-denominations'], prompt: '4 元 6 角合起来是多少角？', answer: '46 角', distractors: ['10 角', '406 角'], hint: '先把 4 元换成角，再加上 6 角。', explanation: '4 元=40 角，40 角+6 角=46 角。' },
    { knowledgePointIds: [...addition, 'two-digit-number-composition'], prompt: '47 个积木再添 2 个，下面哪项是现在的数量？', answer: '49 个', distractors: ['45 个', '67 个'], hint: '个位上的 7 再加 2，十位不变。', explanation: '47+2=49，十位仍是 4 个十。' },
    { knowledgePointIds: [...patterns, 'number-sequence-to-100'], prompt: '数列 5、10、15、20 按同一规律继续，下一项是多少？', answer: '25', distractors: ['22', '30'], hint: '比较相邻两项，每次增加 5。', explanation: '20+5=25，数列每次增加 5。' },
    { knowledgePointIds: [...numbers, 'number-comparison-to-100'], prompt: '把 62、26、60 按从小到大排列，顺序是什么？', answer: '26、60、62', distractors: ['60、26、62', '62、60、26'], hint: '先比较十位，再比较个位。', explanation: '26 最小；60 和 62 都有 6 个十，60 小于 62。' },
    { knowledgePointIds: [...subtraction, 'inverse-operation-check'], prompt: '篮里有 18 个桃子，拿走 9 个后还剩几个？', answer: '9 个', distractors: ['8 个', '27 个'], hint: '18 减去 9，可以从 10 减 9 再加回 8。', explanation: '18−9=9，篮里还剩 9 个桃子。' },
    { knowledgePointIds: [...money, 'money-addition-and-change'], prompt: '3 元再加 20 角，合起来是多少元？', answer: '5 元', distractors: ['23 元', '5 角'], hint: '先把 20 角换成元。', explanation: '20 角=2 元，3 元+2 元=5 元。' },
    { knowledgePointIds: [...addition, 'two-digit-add-subtract-tens'], prompt: '盒子里有 51 本练习册，又放进 30 本，现在有多少本？', answer: '81', distractors: ['54', '71'], hint: '增加 30 就是增加 3 个十。', explanation: '51+30=81，个位上的 1 不变，十位增加 3。' },
    { knowledgePointIds: [...patterns, 'pattern-rule-validation'], prompt: '图形按“△、□、□”一组重复。第六个图形是什么？', answer: '正方形', distractors: ['三角形', '圆形'], hint: '每三项为一组，第六项在第二组的第几个位置？', explanation: '第二组依次是三角形、正方形、正方形，第六项是正方形。' },
    { knowledgePointIds: [...shapes, 'plane-shape-features'], prompt: '三角形和长方形相比，哪一项说法正确？', answer: '三角形有 3 条直边，长方形有 4 条', distractors: ['两种图形都有 3 条直边', '长方形没有直边'], hint: '分别数一数两种图形的边。', explanation: '三角形有 3 条直边，长方形有 4 条直边。' },
    { knowledgePointIds: [...classification, 'classification-checking'], prompt: '记录了 4 个红片和 3 个蓝片。只看两类数量，哪项核对结果正确？', answer: '合计 7 个', distractors: ['合计 6 个', '合计 8 个'], hint: '把红片和蓝片的数量相加。', explanation: '4+3=7，分类记录合计应是 7 个。' },
    { knowledgePointIds: [...subtraction, 'subtraction-strategy'], prompt: '15−8 可以怎样算？', answer: '先减 5 得 10，再减 3 得 7', distractors: ['先减 8 得 10，再加 5 得 15', '先加 5 得 20，再减 8 得 12'], hint: '把 8 分成 5 和 3，先减到 10。', explanation: '15−5=10，10−3=7，所以 15−8=7。' },
    { knowledgePointIds: [...money, 'money-composition-and-comparison'], prompt: '5 元和 50 角相比，哪句话正确？', answer: '两种金额一样多', distractors: ['5 元比 50 角多', '50 角比 5 元多'], hint: '把 5 元换算成角再比较。', explanation: '5 元=50 角，两种金额一样多。' },
    { knowledgePointIds: ['number-comparison-to-100', 'tens-and-hundreds'], prompt: '图书角有 99 本故事书，班级书架有 100 本，哪边的本数更多？', answer: '班级书架本数更多', distractors: ['图书角本数更多', '两边数量一样多'], hint: '比较 99 和 100 的大小。', explanation: '100 比 99 多 1，所以班级书架的本数更多。' },
    { knowledgePointIds: [...addition, 'two-digit-add-subtract-one'], prompt: '从 34 开始先加 5，再减 3，最后是多少？', answer: '36', distractors: ['32', '42'], hint: '按顺序先完成加法，再做减法。', explanation: '34+5=39，39−3=36。' },
    { knowledgePointIds: [...patterns, 'number-sequence-to-100', 'pattern-rule-validation'], prompt: '数列 8、10、12、15 声称每次增加 2。哪一项不符合？', answer: '15 不符合，应该是 14', distractors: ['12 不符合，应该是 13', '每一项都符合'], hint: '检查最后一步增加了多少。', explanation: '12 加 2 应是 14，不是 15。' },
    { knowledgePointIds: [...shapes, 'plane-shape-composition'], prompt: '用两个同样大小的正方形边对边拼在一起，外轮廓最像哪种图形？', answer: '长方形', distractors: ['三角形', '圆形'], hint: '拼好后看外轮廓有几条边、边怎样排列。', explanation: '两个同样大小的正方形并排拼接，外轮廓是长方形。' },
    { knowledgePointIds: [...money, 'yuan-jiao-fen-conversion'], prompt: '3 元 5 角一共是多少角？', answer: '35 角', distractors: ['8 角', '305 角'], hint: '先把 3 元换成角。', explanation: '3 元=30 角，30 角+5 角=35 角。' },
    { knowledgePointIds: [...numbers, 'number-sequence-to-100'], prompt: '数列 70、60、50 每次减少 10，下一项是多少？', answer: '40', distractors: ['49', '30'], hint: '从 50 再减去 10。', explanation: '50−10=40，数列继续减少 10。' },
    { knowledgePointIds: [...addition, 'two-digit-add-subtract-tens'], prompt: '64 减去 20 后，个位上的 4 会怎样？', answer: '个位不变，结果是 44', distractors: ['个位变成 2，结果是 42', '结果是 62'], hint: '20 是 2 个十，不需要改变个位。', explanation: '64−20=44，减去 2 个十后个位仍是 4。' },
    { knowledgePointIds: [...patterns, 'pattern-rule-validation'], prompt: '彩带按“红、黄、黄”一组重复。第九个位置是什么颜色？', answer: '黄色', distractors: ['红色', '蓝色'], hint: '每三项为一组，第七项开始新的一组。', explanation: '第七项红色，第八和第九项都是黄色。' },
    { knowledgePointIds: [...classification, 'classification-recording', 'classification-results'], prompt: '积木按颜色记录：蓝色 4 块、红色 3 块。蓝色比红色多几块？', answer: '1 块', distractors: ['7 块', '2 块'], hint: '用较多的一类数量减去较少的一类。', explanation: '4−3=1，蓝色比红色多 1 块。' },
  ],
  high: [
    { knowledgePointIds: [...shapes, 'plane-shape-features'], prompt: '有 2 张三角形卡和 1 张正方形卡，按卡片外轮廓数直边，一共有几条？', answer: '10 条', distractors: ['7 条', '12 条'], hint: '先数两个三角形各有几条，再加上正方形的边数。', explanation: '两个三角形有 3+3=6 条直边，正方形有 4 条，合计 10 条。' },
    { knowledgePointIds: [...subtraction, 'subtraction-strategy', 'inverse-operation-check'], prompt: '小组有 18 个棋子，先拿走 9 个。用哪句话同时说明得数和核对方法？', answer: '还剩 9 个，因为 9+9=18', distractors: ['还剩 10 个，因为 10+9=19', '还剩 8 个，因为 8+9=17'], hint: '先算 18−9，再用剩下的和拿走的合起来核对。', explanation: '18−9=9，并且 9+9=18，结果正确。' },
    { knowledgePointIds: [...classification, 'classification-recording', 'classification-checking'], prompt: '整理卡片时记录圆形 5 张、三角形 4 张，实物合计 10 张。最需要先核对什么？', answer: '逐类重新清点，因为两类记录合计 9 张', distractors: ['不用检查，记录已经合计 10 张', '把圆形数量直接改成 6 张'], hint: '把记录的两类数量相加，与实物总数比较。', explanation: '5+4=9，与实物总数 10 不一致，应重新清点，不能猜改某一类。' },
    { knowledgePointIds: ['two-digit-number-composition'], prompt: '一个两位数有 7 个十，个位比十位少 3。这个数是多少？', answer: '74', distractors: ['73', '47'], hint: '十位是 7，个位要比 7 少 3。', explanation: '个位是 7−3=4，所以这个数是 74。' },
    { knowledgePointIds: [...money, 'currency-denominations', 'yuan-jiao-fen-conversion'], prompt: '5 元 2 角换成角是多少角？', answer: '52 角', distractors: ['25 角', '502 角'], hint: '把 5 元先换成 50 角，再加 2 角。', explanation: '5 元=50 角，50 角+2 角=52 角。' },
    { knowledgePointIds: [...addition, 'two-digit-add-subtract-one', 'two-digit-add-subtract-tens'], prompt: '盒中有 34 个珠子，添入 20 个后又取走 3 个，最后有几个？', answer: '51 个', distractors: ['57 个', '31 个'], hint: '按发生顺序计算：先加整十数，再减去 3。', explanation: '34+20=54，54−3=51。' },
    { knowledgePointIds: [...patterns, 'number-sequence-to-100', 'pattern-rule-validation'], prompt: '数列 4、7、10、13、17 中标注“每次加 3”。哪一项要修改？', answer: '17 应改成 16', distractors: ['13 应改成 14', '不用修改'], hint: '检查 13 后面按每次加 3 应得到多少。', explanation: '13+3=16，所以末项 17 不符合规则，应改成 16。' },
    { knowledgePointIds: [...numbers, 'number-sequence-to-100', 'number-comparison-to-100'], prompt: '数列 40、42、46 声称每次增加 2。应怎样改正？', answer: '46 改成 44', distractors: ['42 改成 43', '40 改成 41'], hint: '从第一项开始每次加 2，逐项核对。', explanation: '40、42 后面应是 44，因此 46 应改成 44。' },
    { knowledgePointIds: [...subtraction, 'subtraction-strategy'], prompt: '20 个贴纸先送出 6 个，再送出 5 个。还剩多少个？', answer: '9 个', distractors: ['11 个', '19 个'], hint: '可以先算一共送出多少个，再从 20 中减去。', explanation: '6+5=11，20−11=9，还剩 9 个。' },
    { knowledgePointIds: [...money, 'money-addition-and-change', 'money-composition-and-comparison'], prompt: '铅笔 3 元 5 角，橡皮 1 元。两样物品合起来多少钱？', answer: '4 元 5 角', distractors: ['4 元 1 角', '3 元 6 角'], hint: '把元和角分别相加。', explanation: '3 元 5 角+1 元=4 元 5 角。' },
    { knowledgePointIds: [...patterns, 'repeating-shape-patterns', 'pattern-rule-validation'], prompt: '图形按“圆、三角形、正方形”循环。第八个图形是什么？', answer: '三角形', distractors: ['圆形', '正方形'], hint: '每三项一组，第七项回到新一组的第一项。', explanation: '第七项是圆形，第八项是三角形。' },
    { knowledgePointIds: [...classification, 'classification-results', 'number-comparison-to-100'], prompt: '一排有 6 个红夹子，另一排有 4 个蓝夹子。两排合计多少个？哪排更多？', answer: '合计 10 个，红夹子更多', distractors: ['合计 10 个，蓝夹子更多', '合计 2 个，红夹子更多'], hint: '先把两排数量相加，再比较 6 和 4。', explanation: '6+4=10；6 大于 4，所以红夹子更多。' },
    { knowledgePointIds: [...shapes, 'plane-shape-composition'], prompt: '把两个同样大小的正方形并排拼成一个长方形后，外轮廓有几条直边？', answer: '4 条', distractors: ['6 条', '8 条'], hint: '只数拼好后最外面的边，里面相接的边不算。', explanation: '拼成的长方形外轮廓有 4 条直边，正方形相接的边在里面。' },
    { knowledgePointIds: [...addition, 'two-digit-add-subtract-one', 'inverse-operation-check'], prompt: '同伴把 29+4 算成 23。哪种改正和核对都正确？', answer: '29+4=33，再用 33−4=29 核对', distractors: ['29+4=25，再用 25−4=21 核对', '29+4=33，再用 33−4=28 核对'], hint: '从 29 再数 4 个得到和，再减回 4 检查。', explanation: '29+4=33，33−4=29，计算和逆运算核对都正确。' },
    { knowledgePointIds: ['number-comparison-to-100'], prompt: '68、86 和 80 中，哪个数最大？', answer: '86', distractors: ['68', '80'], hint: '先比较十位；十位相同时再比较个位。', explanation: '86 和 80 都有 8 个十，86 的个位 6 大于 80 的个位 0；68 只有 6 个十。' },
    { knowledgePointIds: [...money, 'money-addition-and-change', 'yuan-jiao-fen-conversion'], prompt: '付 8 元买一件 5 元 6 角的物品，应找回多少钱？', answer: '2 元 4 角', distractors: ['3 元 4 角', '2 元 6 角'], hint: '把 8 元看成 7 元 10 角，再减去 5 元 6 角。', explanation: '8 元−5 元 6 角=2 元 4 角。' },
    { knowledgePointIds: [...subtraction, 'subtraction-strategy', 'inverse-operation-check'], prompt: '16−9=7。哪一步可以说明这个得数正确？', answer: '7+9=16', distractors: ['7+8=15', '16+9=25'], hint: '用差加减数，检查能不能回到被减数。', explanation: '7+9=16，回到了原来的数，所以 16−9=7。' },
    { knowledgePointIds: [...addition, 'two-digit-add-subtract-tens', 'inverse-operation-check'], prompt: '43+5=48。先从 48 减去 40，结果是多少？', answer: '8', distractors: ['3', '88'], hint: '减去 4 个十后，再看个位剩下多少。', explanation: '48−40=8，48 有 4 个十和 8 个一，拿走 4 个十后剩 8。' },
    { knowledgePointIds: [...numbers, 'number-sequence-to-100', 'number-comparison-to-100'], prompt: '数列 92、82、72 每次减少 10，后面两项是什么？', answer: '62、52', distractors: ['63、53', '72、62'], hint: '连续两次各减去 10。', explanation: '72−10=62，62−10=52。' },
    { knowledgePointIds: [...patterns, 'number-sequence-to-100', 'pattern-rule-validation'], prompt: '数列 2、5、8、11 中，相邻两项每次相差多少？', answer: '3', distractors: ['2', '4'], hint: '用后一个数减去前一个数，连续核对几次。', explanation: '5−2、8−5、11−8 都等于 3，所以每次增加 3。' },
    { knowledgePointIds: [...money, 'money-composition-and-comparison', 'yuan-jiao-fen-conversion'], prompt: '钱包里有 2 张 1 元和 3 个 1 角硬币，一共是多少角？', answer: '23 角', distractors: ['5 角', '203 角'], hint: '先分别换成角，再把两部分合起来。', explanation: '2 元=20 角，20 角+3 角=23 角。' },
    { knowledgePointIds: [...shapes, 'plane-shape-features', 'classification-standard'], prompt: '把三角形、圆形、正方形按“有直边”和“没有直边”分组，哪项正确？', answer: '三角形和正方形有直边，圆形没有', distractors: ['三种图形都有直边', '圆形和三角形没有直边'], hint: '检查每种图形的外轮廓是直线还是弯曲线。', explanation: '三角形、正方形由直边围成；圆形的外轮廓是弯曲的。' },
    { knowledgePointIds: [...addition, 'two-digit-add-subtract-tens'], prompt: '小队有 52 人，来了 20 人后又离开 6 人，现在有多少人？', answer: '66 人', distractors: ['78 人', '46 人'], hint: '先增加 20，再减少 6。', explanation: '52+20=72，72−6=66。' },
    { knowledgePointIds: [...classification, 'classification-results', 'classification-checking'], prompt: '统计 31、13、31、30 四张数字卡，哪项汇报准确？', answer: '31 出现 2 次，13 和 30 各出现 1 次', distractors: ['13 出现 2 次，31 和 30 各出现 1 次', '四个数字都不相同'], hint: '按相同的数归到一类，再核对次数。', explanation: '两张卡片上写着 31，13 和 30 各有一张。' },
    { knowledgePointIds: [...patterns, 'repeating-shape-patterns', 'pattern-rule-validation'], prompt: '图案按“方形、圆形、圆形”循环，第十一项是哪种图形？', answer: '圆形', distractors: ['方形', '三角形'], hint: '每三项一组，第十项开始新一组。', explanation: '第十项是方形，第十一和第十二项是圆形。' },
  ],
};

function createActivity(draft: ActivityDraft, difficulty: Difficulty, index: number): Grade1Term2MathUnit08SupplementalActivity {
  const id = `${idPrefix}-${difficulty}-${String(index + 1).padStart(2, '0')}`;
  const correctOptionIndex = index % 3;
  const labels = [draft.answer, ...draft.distractors];
  [labels[0], labels[correctOptionIndex]] = [labels[correctOptionIndex]!, labels[0]!];
  const options = labels.map((label, optionIndex) => ({ id: `${id}/option-${String(optionIndex + 1).padStart(2, '0')}`, label }));
  const activity: ChoiceActivityDefinition = {
    id,
    kind: 'choice',
    prompt: draft.prompt,
    options,
    correctOptionId: options[correctOptionIndex]!.id,
    hint: draft.hint,
    explanation: draft.explanation,
  };
  return { difficulty, sourceUnitId, knowledgePointIds: [...new Set(draft.knowledgePointIds)], activity };
}

export const grade1Term2MathUnit08SupplementalActivities = (Object.entries(drafts) as [Difficulty, ActivityDraft[]][])
  .flatMap(([difficulty, items]) => items.map((draft, index) => createActivity(draft, difficulty, index)));
