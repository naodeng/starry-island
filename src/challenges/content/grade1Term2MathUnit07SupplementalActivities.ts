import type { ChoiceActivityDefinition, Difficulty } from '../../content/types';

interface ActivityDraft {
  knowledgePointIds: string[];
  prompt: string;
  answer: string;
  distractors: [string, string];
  hint: string;
  explanation: string;
}

export interface Grade1Term2MathUnit07SupplementalActivity {
  difficulty: Difficulty;
  sourceUnitId: string;
  knowledgePointIds: string[];
  activity: ChoiceActivityDefinition;
}

const sourceUnitId = 'grade-1/term-2/math/unit-07';
const idPrefix = 'challenge-supplement-grade-1-term-2-math-unit-07';
const shapes = ['repeating-shape-patterns'];
const numbers = ['number-patterns'];
const checking = ['pattern-rule-validation'];
const shapeAndChecking = [...shapes, ...checking];
const numberAndChecking = [...numbers, ...checking];

const drafts: Record<Difficulty, ActivityDraft[]> = {
  basic: [
    { knowledgePointIds: numbers, prompt: '数列 12、14、16、（ ）按相同的步子继续，空格里填几？', answer: '18', distractors: ['17', '20'], hint: '看一看每次增加了多少。', explanation: '16 比 14 多 2，下一项再加 2，是 18。' },
    { knowledgePointIds: shapes, prompt: '彩旗按“红、黄、红、黄……”排列，接下来一面是什么颜色？', answer: '红色', distractors: ['蓝色', '黄色'], hint: '从开头把重复的两种颜色读一遍。', explanation: '红、黄两面一组，黄旗后面接着红旗。' },
    { knowledgePointIds: numberAndChecking, prompt: '从 5 开始，每次添 3：5、8、11、（ ）。', answer: '14', distractors: ['13', '15'], hint: '把上一项再增加 3。', explanation: '11 加 3 等于 14，所以数列接着是 14。' },
    { knowledgePointIds: shapes, prompt: '图案“○、□、☆、○、□、☆”按一组重复，下一项应是？', answer: '○', distractors: ['□', '△'], hint: '找出重复的三项，再从第一项开始接。', explanation: '每三种图形重复一次，☆后面回到○。' },
    { knowledgePointIds: numbers, prompt: '小兔每次向前跳 2 格，从 6 出发跳三次会到几？', answer: '12', distractors: ['10', '11'], hint: '依次说出每次跳到的数。', explanation: '6、8、10、12，跳三次后到 12。' },
    { knowledgePointIds: shapeAndChecking, prompt: '“圆、圆、三角形、圆、圆、三角形”重复排列。三角形后面该接什么？', answer: '圆形', distractors: ['正方形', '三角形'], hint: '每组是两个圆形和一个三角形。', explanation: '一组三个图形结束后，下一组从圆形开始。' },
    { knowledgePointIds: numbers, prompt: '下面哪串数是每次减少 1？', answer: '9、8、7', distractors: ['9、7、5', '9、10、11'], hint: '分别比较第二个数和第一个数、第三个数和第二个数。', explanation: '9 到 8 少 1，8 到 7 也少 1。' },
    { knowledgePointIds: shapes, prompt: '积木按“蓝、蓝、白”一组摆放。第二组的最后一块是什么颜色？', answer: '白色', distractors: ['蓝色', '红色'], hint: '先找到一组里排在第三个位置的积木。', explanation: '每组第三块都是白色，第二组的最后一块也是白色。' },
    { knowledgePointIds: numberAndChecking, prompt: '数列 2、5、8、11 中，相邻两个数每次相差多少？', answer: '3', distractors: ['2', '4'], hint: '用后一个数减去前一个数。', explanation: '5−2、8−5、11−8 都是 3。' },
    { knowledgePointIds: numbers, prompt: '把 10、8、9 按“每次增加 1”的规律排起来，顺序是什么？', answer: '8、9、10', distractors: ['10、9、8', '8、10、9'], hint: '从最小的数开始，每次加 1。', explanation: '8 后面是 9，再后面是 10，每次增加 1。' },
    { knowledgePointIds: shapes, prompt: '珠子顺序是“星星、圆形、星星、圆形”。接下来应该穿哪颗？', answer: '星星', distractors: ['三角形', '圆形'], hint: '观察相邻的两种图形怎样轮流出现。', explanation: '星星和圆形交替出现，圆形后面是星星。' },
    { knowledgePointIds: numbers, prompt: '从 20 开始倒着每次数 2 个数：20、18、16、（ ）。', answer: '14', distractors: ['15', '12'], hint: '从 16 再减去 2。', explanation: '16 减 2 得 14，数列继续减少 2。' },
    { knowledgePointIds: numberAndChecking, prompt: '乐乐说“4、6、8”每次增加 2。哪一项最能支持他的说法？', answer: '6 比 4 多 2，8 比 6 多 2', distractors: ['8 是这组数里最大的', '4 和 8 都是偶数'], hint: '规律要能说明每一对相邻数怎样变化。', explanation: '两次相邻变化都增加 2，才说明符合这条规律。' },
    { knowledgePointIds: shapes, prompt: '按“△、□、□”循环摆图形，第一轮结束后，下一项是哪种图形？', answer: '三角形', distractors: ['圆形', '正方形'], hint: '一轮有三项，结束后回到这一轮的开头。', explanation: '每轮从三角形开始，第一轮结束后下一项仍是三角形。' },
    { knowledgePointIds: numbers, prompt: '连续的数 13、14、15 后面，接哪个数？', answer: '16', distractors: ['17', '14'], hint: '每次向后数一个数。', explanation: '这个数列每次增加 1，15 后面是 16。' },
    { knowledgePointIds: shapeAndChecking, prompt: '“黄、绿、绿、黄、绿、绿”按三项重复。哪句话说出了完整规律？', answer: '每组先黄，再连续两个绿', distractors: ['黄和绿各出现一次', '每组先绿，再连续两个黄'], hint: '按排列顺序读完一整组。', explanation: '一组有一个黄和两个绿，顺序是黄、绿、绿。' },
    { knowledgePointIds: numbers, prompt: '数列 4、7、10、（ ）每次增加 3，下一项是多少？', answer: '13', distractors: ['12', '14'], hint: '在最后一个已知数后再加 3。', explanation: '10 加 3 等于 13。' },
    { knowledgePointIds: shapes, prompt: '图形排成“□、△、○、□、△、○”。第七个图形是什么？', answer: '正方形', distractors: ['三角形', '圆形'], hint: '每三项为一组，数到第七项时新的一组刚开始。', explanation: '前六项是两组，第七项回到每组开头的正方形。' },
    { knowledgePointIds: numberAndChecking, prompt: '一串数是 3、6、9、12。下一项选哪一个才符合规律？', answer: '15', distractors: ['14', '16'], hint: '检查相邻两项都增加多少。', explanation: '每次增加 3，12 再加 3 是 15。' },
    { knowledgePointIds: numbers, prompt: '小车每次多装 5 个积木，原有 5 个，后来是 10 个、15 个，再后来有几个？', answer: '20 个', distractors: ['18 个', '25 个'], hint: '从 15 个再增加 5 个。', explanation: '15 加 5 是 20，积木数量每次增加 5 个。' },
    { knowledgePointIds: shapes, prompt: '贴纸按“月亮、月亮、太阳”重复。第四张贴纸是什么？', answer: '月亮', distractors: ['星星', '太阳'], hint: '前三张是一组，第四张回到下一组开头。', explanation: '每组以两个月亮开始，第四张是下一组的第一张月亮。' },
    { knowledgePointIds: numberAndChecking, prompt: '下面哪组数没有按“每次增加 2”排列？', answer: '2、4、7', distractors: ['2、4、6', '3、5、7'], hint: '看最后两项之间增加了几。', explanation: '7 比 4 多 3，不是多 2；另外两组每次都增加 2。' },
    { knowledgePointIds: numbers, prompt: '从 1 起每次数 3 个数，数列是 1、4、7、（ ）。', answer: '10', distractors: ['9', '11'], hint: '给 7 再添上 3。', explanation: '7 加 3 得 10。' },
    { knowledgePointIds: shapeAndChecking, prompt: '有人把“正方形、圆形、正方形、圆形”说成“两个图形交替”。怎样核对？', answer: '看每个正方形后面是不是圆形，每个圆形后面是不是正方形', distractors: ['只数一共有几个正方形', '只看第一个图形是什么'], hint: '要检查排列里的每一次相邻变化。', explanation: '交替表示两种图形轮流出现，所以要逐个看相邻图形是否轮换。' },
    { knowledgePointIds: shapes, prompt: '风车叶片按“绿、黄、黄、绿、黄、黄”涂色，接下来一片涂什么颜色？', answer: '绿色', distractors: ['黄色', '蓝色'], hint: '每三片一组，第三片后回到下一组开头。', explanation: '每组都是绿、黄、黄，下一片是新一组的绿色。' },
  ],
  advanced: [
    { knowledgePointIds: numbers, prompt: '数列从 6 开始，每次加 4。第三次增加后会得到多少？', answer: '18', distractors: ['14', '22'], hint: '先从 6 加三次 4。', explanation: '6、10、14、18，第三次增加后是 18。' },
    { knowledgePointIds: shapes, prompt: '桌面按“红圆、蓝三角、黄圆、红圆、蓝三角、黄圆”摆卡片，下一张是什么？', answer: '红圆', distractors: ['蓝三角', '黄圆'], hint: '找出一轮中三张卡片的先后顺序。', explanation: '三张卡片按固定次序重复，黄圆后面回到红圆。' },
    { knowledgePointIds: numberAndChecking, prompt: '小宁说 7、11、15、19 每次增加 4。哪种核对能确认全部步骤？', answer: '分别算 11−7、15−11、19−15，结果都是 4', distractors: ['只算 19−7 是 12', '看这组数都是奇数'], hint: '每一对相邻数都要检查。', explanation: '三次相邻变化都等于 4，整组数符合“每次增加 4”。' },
    { knowledgePointIds: numbers, prompt: '把 22、14、18、10 排成每次增加 4 的数列，应从哪个数开始？', answer: '10', distractors: ['14', '22'], hint: '先找出这组数里最小的一项。', explanation: '按每次增加 4 排列是 10、14、18、22，所以从 10 开始。' },
    { knowledgePointIds: shapeAndChecking, prompt: '图案“红、蓝、蓝、红、蓝、蓝”被说成每三项重复。接下来两项是什么？', answer: '红、蓝', distractors: ['蓝、红', '红、红'], hint: '先回到下一组的开头，再接着排。', explanation: '下一组仍是红、蓝、蓝，因此后两项为红、蓝。' },
    { knowledgePointIds: numbers, prompt: '一串数从 30 开始，每次少 5。连续减少两次以后是多少？', answer: '20', distractors: ['25', '15'], hint: '30 减一次 5，再减一次 5。', explanation: '30、25、20，连续减少两次后是 20。' },
    { knowledgePointIds: shapes, prompt: '纸片依次是“△、○、□、○、△、○、□、○”。这组图案里每四张重复，下一张应是？', answer: '三角形', distractors: ['圆形', '正方形'], hint: '最后一张是这一轮的第四张，接下来开启新一轮。', explanation: '每轮从三角形开始，所以圆形之后下一轮的第一张是三角形。' },
    { knowledgePointIds: numberAndChecking, prompt: '给数列 8、12、16、（ ）补上一项，再用相邻变化说明理由。', answer: '20；每次增加 4', distractors: ['18；每次增加 2', '24；每次增加 8'], hint: '先算相邻两项相差多少，再沿用这个变化。', explanation: '12−8 和 16−12 都是 4，所以下一项是 16+4=20。' },
    { knowledgePointIds: numbers, prompt: '从 2 开始，每一项都比前一项多 3。写到第四项应该是哪组？', answer: '2、5、8、11', distractors: ['2、5、9、12', '2、4、7、10'], hint: '每一步都在上一项上加 3。', explanation: '2+3=5，5+3=8，8+3=11。' },
    { knowledgePointIds: shapes, prompt: '一排纽扣按“黑、白、白、黑、白、白”排列。第八颗纽扣是什么颜色？', answer: '白色', distractors: ['黑色', '红色'], hint: '每三颗是一组，分别看第七、八、九颗的位置。', explanation: '第七颗回到新一组的黑色，第八颗是白色。' },
    { knowledgePointIds: numberAndChecking, prompt: '数列 5、9、13、17 中，把每次增加量说成 3 对吗？', answer: '不对；相邻两项每次增加 4', distractors: ['对；只要数变大就算增加 3', '不对；相邻两项每次增加 5'], hint: '分别比较 9 与 5、13 与 9。', explanation: '9−5=4，13−9=4，继续检查也是增加 4。' },
    { knowledgePointIds: numbers, prompt: '把 11、17、14、20 按每次增加 3 排好，第二个数是什么？', answer: '14', distractors: ['17', '20'], hint: '先找最小项，再每次加 3。', explanation: '数列是 11、14、17、20，第二项是 14。' },
    { knowledgePointIds: shapes, prompt: '窗花按“圆、方、三角、方”循环。连续出现两次后，紧跟在第八项后面的是？', answer: '圆形', distractors: ['正方形', '三角形'], hint: '八项刚好排完两轮，下一项从第一种图形开始。', explanation: '每轮四项，第八项结束第二轮，下一项回到圆形。' },
    { knowledgePointIds: numberAndChecking, prompt: '哪组数能证明“从 4 开始，每次加 5”这条规则？', answer: '4、9、14、19', distractors: ['4、9、15、20', '4、8、13、18'], hint: '逐步检查是否每次都加 5。', explanation: '9−4、14−9、19−14 都是 5。' },
    { knowledgePointIds: shapes, prompt: '“黄星、绿星、绿星、黄星、绿星、绿星”按三张一组。第十一张是什么？', answer: '绿星', distractors: ['黄星', '红星'], hint: '第十张是新一组的第一张，继续数到第十一张。', explanation: '第十张黄星，第十一张和第十二张是绿星。' },
    { knowledgePointIds: numbers, prompt: '数列 40、36、32、28 按照原来的变化再写两项，结果是哪组？', answer: '24、20', distractors: ['25、21', '26、22'], hint: '相邻项都减少 4。', explanation: '28−4=24，24−4=20。' },
    { knowledgePointIds: numberAndChecking, prompt: '小组把数列 3、7、11、15 写成“每次加 4”。哪项证据最完整？', answer: '连续三次相邻两项的差都是 4', distractors: ['最后一项比第一项大', '前三项都是奇数'], hint: '规则应该解释每一个相邻变化。', explanation: '每对相邻数都差 4，证据覆盖了整个数列。' },
    { knowledgePointIds: shapes, prompt: '彩条按“红、蓝、黄、黄”重复。第六个位置上的颜色是哪一种？', answer: '蓝色', distractors: ['红色', '黄色'], hint: '第四项是黄色，下一轮从第一项重新开始。', explanation: '第五项是红色，第六项是蓝色。' },
    { knowledgePointIds: numbers, prompt: '有一组数每次增加 6，第二项是 18，第一项是 12。第三项应是多少？', answer: '24', distractors: ['22', '30'], hint: '从第二项开始再增加 6。', explanation: '18+6=24，第三项是 24。' },
    { knowledgePointIds: numberAndChecking, prompt: '同伴写下 6、10、14、19，并标注“每次增加 4”。错在什么地方？', answer: '最后一步增加了 5，19 应改为 18', distractors: ['第一步增加了 5，6 应改为 5', '这组数每次都增加 4'], hint: '重点检查第三项到第四项的变化。', explanation: '14 到 19 增加 5；按每次加 4，最后一项应是 18。' },
    { knowledgePointIds: shapes, prompt: '小卡片排成“○、○、△、□、○、○、△、□”。第十张卡片是什么？', answer: '圆形', distractors: ['三角形', '正方形'], hint: '每四张卡片组成一轮，第九张开始新一轮。', explanation: '第九张和第十张都是圆形，所以第十张是圆形。' },
    { knowledgePointIds: numbers, prompt: '从 7 出发按每次增加 8 的规律前进两步，停在哪个数？', answer: '23', distractors: ['15', '31'], hint: '第一步加 8，第二步再加 8。', explanation: '7+8=15，15+8=23。' },
    { knowledgePointIds: numberAndChecking, prompt: '为了判断 12、16、20、24 是否每次增加 4，应该检查什么？', answer: '四个数之间的每一对相邻差都等于 4', distractors: ['只检查 12 和 24 的差', '看看这些数是否都比 10 大'], hint: '不要漏掉中间任意一步。', explanation: '逐对检查 16−12、20−16、24−20，都是 4，才能确认规律。' },
    { knowledgePointIds: shapeAndChecking, prompt: '图案“□、○、○、△、□、○、○、△”重复。第十项是什么？', answer: '圆形', distractors: ['正方形', '三角形'], hint: '每轮四项，第九项是下一轮第一项。', explanation: '第九项是正方形，第十项是圆形。' },
    { knowledgePointIds: numberAndChecking, prompt: '小车依次停在 8、13、18 号站点，每次增加 5 站。下一站比第一站大多少？', answer: '15', distractors: ['10', '20'], hint: '先按每次增加 5 找到下一站，再和 8 比较。', explanation: '下一站是 23，23−8=15。' },
  ],
  high: [
    { knowledgePointIds: numberAndChecking, prompt: '一个数列从 9 开始，每次增加 3。有人把第四项写成 20，应该怎样修改？', answer: '第四项改成 18，因为 9、12、15、18', distractors: ['第四项改成 17，因为每次增加 2', '20 正确，因为数一直在变大'], hint: '把每一步都按增加 3 列出来。', explanation: '9 到 12、12 到 15、15 到 18，每步都加 3，第四项是 18。' },
    { knowledgePointIds: numbers, prompt: '数列有四项：第一项 15，之后每次减少 3。第四项是多少？', answer: '6', distractors: ['9', '3'], hint: '从第一项开始连续减三次。', explanation: '15、12、9、6，第四项是 6。' },
    { knowledgePointIds: shapeAndChecking, prompt: '一串图形写作“△、○、△、□、△、○、△、○”。哪一项破坏了每四项重复的规律？', answer: '第八项应是正方形，不应是圆形', distractors: ['第二项应是正方形', '没有错误，图形完全重复'], hint: '把前四项作为一组，再与后四项逐个对照。', explanation: '第一组是三角形、圆形、三角形、正方形，第二组第四项应为正方形。' },
    { knowledgePointIds: numberAndChecking, prompt: '数列 8、13、18、23 的规则是每次增加 5。若下一项写成 29，差了多少？', answer: '多了 1；下一项应为 28', distractors: ['少了 1；下一项应为 30', '没有差；29 符合规则'], hint: '先用 23 加 5 得到应有的下一项。', explanation: '23+5=28，29 比 28 多 1。' },
    { knowledgePointIds: numbers, prompt: '从 5 出发，先连续增加 4 两次，再减少 3，最后是多少？', answer: '10', distractors: ['13', '9'], hint: '按题目给的顺序完成两次增加，再减去 3。', explanation: '5+4+4=13，13−3=10。' },
    { knowledgePointIds: numberAndChecking, prompt: '把 4、9、14、20 标为“每次加 5”，要使规则成立最少改动哪项？', answer: '把 20 改成 19', distractors: ['把 14 改成 15', '不用改，20 符合规律'], hint: '前三项已经按每次加 5 排好，检查最后一步。', explanation: '14 加 5 得 19，因此末项改成 19 就符合规律。' },
    { knowledgePointIds: shapes, prompt: '每三格按“红、黄、蓝”重复。第十七格是什么颜色？', answer: '黄色', distractors: ['红色', '蓝色'], hint: '每三格为一组，先找出第十六格属于新组的哪个位置。', explanation: '第十六格是红色，第十七格是黄色。' },
    { knowledgePointIds: numberAndChecking, prompt: '同学说 10、14、18、22 每次增加 4。若漏写一项，哪种核对能发现？', answer: '逐对比较已写出的相邻项，并按每次加 4 检查应有项', distractors: ['只看数列第一项和最后一项', '只确认每个数都是偶数'], hint: '有无漏项要检查相邻的变化是否仍符合规则。', explanation: '逐对检查才能确认中间有没有跳过应出现的数。' },
    { knowledgePointIds: shapes, prompt: '图形按“○、△、△、□、○、△、△、□”排列。第十五个图形是什么？', answer: '三角形', distractors: ['圆形', '正方形'], hint: '每四项一组，第十三项开始新的一组。', explanation: '第十三项圆形，第十四和第十五项是三角形。' },
    { knowledgePointIds: numbers, prompt: '数列 2、7、12、17 中，按相同变化连续再写三项，最后一项是多少？', answer: '32', distractors: ['27', '37'], hint: '每一项都比前一项多 5，连续写三次。', explanation: '17+5=22，22+5=27，27+5=32。' },
    { knowledgePointIds: numberAndChecking, prompt: '一组数是 28、24、20、16。有人说“每次增加 4”，怎么判断？', answer: '不符合增加 4；相邻数每次减少 4', distractors: ['符合增加 4，因为 28 与 16 相差 12', '不符合；相邻数每次减少 3'], hint: '按排列顺序比较后一个数和前一个数。', explanation: '24 比 28 少 4，后面也都少 4，所以是每次减少 4。' },
    { knowledgePointIds: shapes, prompt: '一列珠子按“蓝、蓝、绿、红、绿”循环。第十二颗是什么颜色？', answer: '蓝色', distractors: ['绿色', '红色'], hint: '五颗一轮，第十一颗回到新一轮的第一颗。', explanation: '第十一颗蓝色，第十二颗也蓝色。' },
    { knowledgePointIds: numberAndChecking, prompt: '数列 6、10、14、18、23 被标注为每步加 4。错项和应改成什么？', answer: '23 是错项，应改为 22', distractors: ['18 是错项，应改为 19', '没有错项，末项只要变大即可'], hint: '检查末尾 18 到 23 增加了多少。', explanation: '23−18=5；按每次加 4，18 后应是 22。' },
    { knowledgePointIds: numbers, prompt: '从 36 开始，每次减少 6。第二次减少后，再往下两项分别是多少？', answer: '18、12', distractors: ['24、18', '20、14'], hint: '36、30、24 后，继续按每次减 6。', explanation: '24−6=18，18−6=12。' },
    { knowledgePointIds: shapeAndChecking, prompt: '连续八张卡片声称每三张循环一次。前七张是“□、☆、○、□、☆、○、□”，第八张应核对为？', answer: '星形', distractors: ['圆形', '正方形'], hint: '第七张是新一轮的第一张，接着轮到第二种图形。', explanation: '循环顺序是正方形、星形、圆形，第八张是星形。' },
    { knowledgePointIds: numbers, prompt: '一个数列每次增加 9，第二项 29，第一项比第二项少 9。第三项是多少？', answer: '38', distractors: ['37', '47'], hint: '从已知的第二项继续增加 9。', explanation: '29+9=38，第三项是 38。' },
    { knowledgePointIds: numberAndChecking, prompt: '要验证 11、17、23、29 符合每次加 6，下面的记录哪项正确？', answer: '17−11=6，23−17=6，29−23=6', distractors: ['29−11=18，所以每次增加 6', '只需确认 11 和 29 都是奇数'], hint: '把所有相邻两项的差逐个列出。', explanation: '三个相邻差都为 6，才完整验证了每次增加 6。' },
    { knowledgePointIds: shapes, prompt: '灯牌按“绿、红、红、绿、红、红”变化。第十七次出现的颜色是什么？', answer: '红色', distractors: ['绿色', '黄色'], hint: '每三次为一组，第十六次回到一组的第一项。', explanation: '第十六次是绿，第十七次是红。' },
    { knowledgePointIds: numberAndChecking, prompt: '数列 5、11、17、24 有人说每次增加 6。最小的改正是什么？', answer: '把 24 改成 23', distractors: ['把 17 改成 18', '保持不变，因为前三项增加 6'], hint: '检查最后一对相邻数是否也增加 6。', explanation: '24−17=7，按规律下一项应为 23。' },
    { knowledgePointIds: shapeAndChecking, prompt: '每四个图形一轮：“圆、三角、方、方”。前九项是“圆、三角、方、方、圆、三角、方、方、圆”。第十项应是什么？', answer: '三角形', distractors: ['圆形', '正方形'], hint: '第九项是新一轮第一项。', explanation: '每轮的第二项是三角形，所以第十项是三角形。' },
    { knowledgePointIds: numberAndChecking, prompt: '从 13 开始每次增加 5。写出的四项是 13、18、23、29，哪句话正确？', answer: '末项应是 28；29 比应有的数多 1', distractors: ['第三项应是 22；其他项正确', '四项正确，因为数一直增加'], hint: '逐步从 13 增加 5。', explanation: '13、18、23、28，每次加 5，末项应为 28。' },
    { knowledgePointIds: numbers, prompt: '从 42 开始，先减少 8 两次，再增加 5，最后得到多少？', answer: '31', distractors: ['39', '29'], hint: '按顺序先减 8，再减 8，最后加 5。', explanation: '42−8=34，34−8=26，26+5=31。' },
    { knowledgePointIds: shapeAndChecking, prompt: '小伙伴记录的循环图形是“△、□、○”，连续排了七项“△、□、○、△、□、○、□”。应怎样改？', answer: '第七项改成三角形', distractors: ['第四项改成正方形', '最后一项正确，不用改'], hint: '前六项正好是两轮，下一项从每轮开头开始。', explanation: '每轮从三角形开始，第七项应为三角形。' },
    { knowledgePointIds: numberAndChecking, prompt: '给数列 8、15、22、（ ）补项后，逐项核实每次增加 7。空格填什么？', answer: '29', distractors: ['28', '30'], hint: '每一步加 7，检查 15−8 和 22−15。', explanation: '两次相邻变化都是 7，22+7=29。' },
    { knowledgePointIds: numbers, prompt: '如果一串数每次减少 8，第一项是 50，第五项是多少？', answer: '18', distractors: ['26', '10'], hint: '从第一项到第五项要减少四次。', explanation: '50、42、34、26、18，减少四次后是 18。' },
  ],
};

function createActivity(draft: ActivityDraft, difficulty: Difficulty, index: number): Grade1Term2MathUnit07SupplementalActivity {
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
  return { difficulty, sourceUnitId, knowledgePointIds: draft.knowledgePointIds, activity };
}

export const grade1Term2MathUnit07SupplementalActivities = (Object.entries(drafts) as [Difficulty, ActivityDraft[]][])
  .flatMap(([difficulty, items]) => items.map((draft, index) => createActivity(draft, difficulty, index)));
