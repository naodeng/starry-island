import type { ChoiceActivityDefinition, Difficulty } from '../../content/types';

interface ActivityDraft {
  knowledgePointIds: string[];
  prompt: string;
  answer: string;
  distractors: [string, string];
  hint: string;
  explanation: string;
}

export interface Grade1Term2MathUnit06SupplementalActivity {
  difficulty: Difficulty;
  sourceUnitId: string;
  knowledgePointIds: string[];
  activity: ChoiceActivityDefinition;
}

const sourceUnitId = 'grade-1/term-2/math/unit-06';
const idPrefix = 'challenge-supplement-grade-1-term-2-math-unit-06';
const oneDigit = ['two-digit-add-subtract-one'];
const tens = ['tens-add-subtract'];
const twoDigitAndTens = ['two-digit-add-subtract-tens'];
const oneDigitAndTens = [...oneDigit, ...tens];
const allPoints = [...oneDigit, ...tens, ...twoDigitAndTens];

const drafts: Record<Difficulty, ActivityDraft[]> = {
  basic: [
    { knowledgePointIds: oneDigit, prompt: '文具盒里有 46 支铅笔，又放进 3 支。用哪个算式算现在的数量？', answer: '46 + 3', distractors: ['46 - 3', '40 + 3'], hint: '新放进来的铅笔要和原来的数量合在一起。', explanation: '把原来的 46 支和新放进来的 3 支合起来，列式为 46 + 3。' },
    { knowledgePointIds: oneDigit, prompt: '书架上有 68 本书，借出 5 本后还剩多少本？', answer: '63 本', distractors: ['73 本', '13 本'], hint: '借出表示从原来的数量中拿走。', explanation: '68 - 5 = 63，书架上还剩 63 本。' },
    { knowledgePointIds: oneDigit, prompt: '□ + 4 = 57，方框里应填几？', answer: '53', distractors: ['61', '43'], hint: '想一想 57 去掉加上的 4，还剩多少。', explanation: '57 - 4 = 53，所以 53 + 4 = 57。' },
    { knowledgePointIds: oneDigit, prompt: '一盒彩笔有 75 支，送给同学 2 支，还剩几支？', answer: '73 支', distractors: ['77 支', '55 支'], hint: '送出去的数量要从原来的数量中减去。', explanation: '75 - 2 = 73，还剩 73 支。' },
    { knowledgePointIds: oneDigit, prompt: '哪道算式的结果是 49？', answer: '45 + 4', distractors: ['45 - 4', '40 + 4'], hint: '从 45 开始再数 4 个。', explanation: '45 + 4 = 49。' },
    { knowledgePointIds: tens, prompt: '四十加上三十，结果是多少？', answer: '70', distractors: ['43', '100'], hint: '3 个十加 4 个十，一共有几个十？', explanation: '40 是 4 个十，30 是 3 个十，合起来是 7 个十，也就是 70。' },
    { knowledgePointIds: tens, prompt: '操场边有 90 个标志牌，收走 40 个，还剩多少个？', answer: '50 个', distractors: ['130 个', '5 个'], hint: '都是整十数，可以看成几个十相减。', explanation: '9 个十减去 4 个十，剩下 5 个十，也就是 50 个。' },
    { knowledgePointIds: twoDigitAndTens, prompt: '56 个积木再添 20 个，下面哪个数表示总数？', answer: '76', distractors: ['58', '36'], hint: '添 20 个就是增加 2 个十。', explanation: '56 + 20 = 76，个位不变，十位增加 2。' },
    { knowledgePointIds: twoDigitAndTens, prompt: '82 减去 30 后，个位上的 2 会怎样？', answer: '个位仍是 2，结果是 52', distractors: ['个位变成 5，结果是 25', '个位变成 0，结果是 50'], hint: '30 是 3 个十，只需要从 82 中减去 3 个十。', explanation: '82 有 8 个十和 2 个一，减去 3 个十后是 5 个十和 2 个一，即 52。' },
    { knowledgePointIds: twoDigitAndTens, prompt: '把 47 加上 30，哪个结果正确？', answer: '77', distractors: ['50', '74'], hint: '47 加 3 个十，个位不变。', explanation: '47 加上 30 是 7 个十和 7 个一，等于 77。' },
    { knowledgePointIds: oneDigitAndTens, prompt: '哪句话和算式 36 + 5 相符？', answer: '36 个贴纸又得到 5 个', distractors: ['36 个贴纸拿走 5 个', '36 个贴纸又得到 50 个'], hint: '算式中的加号表示把两份数量合起来。', explanation: '36 + 5 表示原有 36 个，再增加 5 个。' },
    { knowledgePointIds: tens, prompt: '70 - 20 的得数与哪一个数相同？', answer: '50', distractors: ['90', '7'], hint: '从 7 个十里拿走 2 个十。', explanation: '7 个十减 2 个十是 5 个十，所以 70 - 20 = 50。' },
    { knowledgePointIds: oneDigit, prompt: '同伴算 53 + 4 时把个位算成 8。正确结果应是多少？', answer: '57', distractors: ['58', '17'], hint: '十位上的 5 个十不变，再算个位。', explanation: '53 是 5 个十和 3 个一；3 + 4 = 7，所以结果是 57。' },
    { knowledgePointIds: twoDigitAndTens, prompt: '小车上有 24 个球，再装上 40 个，合计多少个？', answer: '64 个', distractors: ['28 个', '44 个'], hint: '增加的是 4 个十，个位上的数量不变。', explanation: '24 + 40 = 64。' },
    { knowledgePointIds: tens, prompt: '一条彩带长 60 厘米，剪去 20 厘米，还剩多长？', answer: '40 厘米', distractors: ['80 厘米', '4 厘米'], hint: '用原来的长度减去剪掉的长度。', explanation: '60 - 20 = 40，剩下 40 厘米。' },
    { knowledgePointIds: oneDigit, prompt: '篮子里原有 41 个橘子，又放入 6 个。现在有几个？', answer: '47 个', distractors: ['35 个', '101 个'], hint: '把原来的橘子和新放入的橘子合在一起。', explanation: '41 + 6 = 47。' },
    { knowledgePointIds: twoDigitAndTens, prompt: '□ - 20 = 35，方框里原来是多少？', answer: '55', distractors: ['15', '37'], hint: '想一想 35 再添上 2 个十是多少。', explanation: '35 + 20 = 55，所以 55 - 20 = 35。' },
    { knowledgePointIds: oneDigit, prompt: '哪道算式可以表示“有 62 张卡片，送出 1 张”？', answer: '62 - 1', distractors: ['62 + 1', '60 - 1'], hint: '送出一张后，卡片数量减少。', explanation: '数量减少 1 张，用减法表示为 62 - 1。' },
    { knowledgePointIds: tens, prompt: '把 20 和 60 合起来，结果里有几个十？', answer: '8 个十', distractors: ['8 个一', '26 个十'], hint: '20 是 2 个十，60 是 6 个十。', explanation: '2 个十加 6 个十是 8 个十，合起来是 80。' },
    { knowledgePointIds: twoDigitAndTens, prompt: '从 95 中减去 40，结果是多少？', answer: '55', distractors: ['59', '45'], hint: '减去 40 就是减去 4 个十。', explanation: '95 - 40 = 55，个位上的 5 不变。' },
    { knowledgePointIds: oneDigit, prompt: '小明有 64 张卡片，小红比他少 3 张。小红有几张？', answer: '61 张', distractors: ['67 张', '34 张'], hint: '“少 3 张”表示从 64 张中减去 3 张。', explanation: '64 - 3 = 61，小红有 61 张。' },
    { knowledgePointIds: twoDigitAndTens, prompt: '28 + 40 可以看成 28 再加上几个十？', answer: '4 个十', distractors: ['4 个一', '40 个十'], hint: '40 正好是 4 个十。', explanation: '28 + 40 就是给 28 增加 4 个十。' },
    { knowledgePointIds: tens, prompt: '九十减去六十，得数是多少？', answer: '30', distractors: ['150', '3'], hint: '9 个十减去 6 个十。', explanation: '9 个十减 6 个十，剩 3 个十，也就是 30。' },
    { knowledgePointIds: oneDigit, prompt: '一条数线上从 72 向后走 5 格，会到哪里？', answer: '77', distractors: ['67', '75'], hint: '每向后走一格，数就增加 1。', explanation: '72 向后走 5 格：73、74、75、76、77。' },
    { knowledgePointIds: allPoints, prompt: '下面哪组算式和结果都对应正确？', answer: '45 + 3 = 48；70 - 20 = 50', distractors: ['45 - 3 = 48；70 + 20 = 50', '45 + 3 = 53；70 - 20 = 70'], hint: '分别看清个位计算和整十数计算。', explanation: '45 加 3 是 48；7 个十减 2 个十是 5 个十，即 50。' },
  ],
  advanced: [
    { knowledgePointIds: twoDigitAndTens, prompt: '图书角原有 47 本故事书，又放上 20 本。总数应怎样计算？', answer: '47 + 20 = 67', distractors: ['47 + 2 = 49', '47 - 20 = 27'], hint: '新放上的是 2 个十。', explanation: '47 加 20 是增加 2 个十，得到 67 本。' },
    { knowledgePointIds: twoDigitAndTens, prompt: '从 76 个纸杯中取走 30 个，剩下的纸杯数是？', answer: '46 个', distractors: ['73 个', '106 个'], hint: '减去 30 要从十位里减去 3 个十。', explanation: '76 - 30 = 46。' },
    { knowledgePointIds: oneDigitAndTens, prompt: '小组有 35 张画纸，又拿来 4 张。哪种想法能算出总数？', answer: '35 有 3 个十和 5 个一，再加 4 个一', distractors: ['把 35 看成 3 个一和 5 个十，再加 4 个十', '把 35 减去 4 个一'], hint: '增加的是个位数量，先看 35 的十位和个位。', explanation: '35 是 3 个十和 5 个一，增加 4 个一后是 39。' },
    { knowledgePointIds: oneDigit, prompt: '□ + 6 = 58。用逆向想法，方框里填什么？', answer: '52', distractors: ['64', '46'], hint: '从 58 中去掉后来加上的 6。', explanation: '58 - 6 = 52，因此 52 + 6 = 58。' },
    { knowledgePointIds: oneDigit, prompt: '小队有 87 个贴纸，分给别的小队 5 个。检查剩余数量时应列？', answer: '87 - 5 = 82', distractors: ['87 + 5 = 92', '80 - 5 = 75'], hint: '分出去后数量变少。', explanation: '87 - 5 = 82，剩下 82 个贴纸。' },
    { knowledgePointIds: oneDigitAndTens, prompt: '比较 42 + 5 和 42 + 30，哪句话正确？', answer: '42 + 30 更大，因为它多加了 3 个十', distractors: ['42 + 5 更大，因为 5 比 3 大', '两道算式的结果相同'], hint: '分别看增加的是几个一或几个十。', explanation: '42 + 5 = 47，42 + 30 = 72，后者增加了更多数量。' },
    { knowledgePointIds: twoDigitAndTens, prompt: '先在 28 上加 4 个十，再读出结果，应该是多少？', answer: '68', distractors: ['32', '48'], hint: '28 的个位不变，十位增加 4。', explanation: '28 + 40 = 68。' },
    { knowledgePointIds: tens, prompt: '把 80 - 50 想成“几个十减几个十”，得数是多少？', answer: '3 个十，也就是 30', distractors: ['13 个十，也就是 130', '3 个一，也就是 3'], hint: '8 个十减去 5 个十。', explanation: '8 个十减 5 个十是 3 个十，得数为 30。' },
    { knowledgePointIds: oneDigitAndTens, prompt: '同伴写 63 + 4 = 68。哪一步需要改正？', answer: '个位 3 加 4 是 7，结果应为 67', distractors: ['十位 6 应改成 5，结果是 57', '63 + 4 应改成 63 - 4'], hint: '分别检查十位和个位。', explanation: '63 是 6 个十和 3 个一，3 + 4 = 7，所以结果是 67。' },
    { knowledgePointIds: twoDigitAndTens, prompt: '小雨算出 76 - 30 = 46，怎样用加法检查？', answer: '46 + 30 = 76', distractors: ['76 + 30 = 106', '46 - 30 = 16'], hint: '用差加上减数，看能不能回到被减数。', explanation: '46 + 30 = 76，回到了原来的 76，所以减法计算正确。' },
    { knowledgePointIds: oneDigit, prompt: '有 69 颗珠子，拿走几颗后还剩 64 颗？', answer: '5 颗', distractors: ['13 颗', '3 颗'], hint: '想 64 加多少会回到 69。', explanation: '69 - 64 = 5，所以拿走了 5 颗。' },
    { knowledgePointIds: twoDigitAndTens, prompt: '哪一个算式表示把 34 增加 5 个十？', answer: '34 + 50', distractors: ['34 + 5', '34 - 50'], hint: '一个十是 10，5 个十是多少？', explanation: '5 个十是 50，把 34 增加 5 个十就是 34 + 50。' },
    { knowledgePointIds: tens, prompt: '操场上有 60 名同学，另一队来了 30 名。你可以先算几个十？', answer: '6 个十加 3 个十，合成 9 个十', distractors: ['6 个一加 3 个一，合成 9 个一', '60 个十加 30 个十'], hint: '把每个整十数看作几个十。', explanation: '60 是 6 个十，30 是 3 个十，合起来是 9 个十，即 90 名。' },
    { knowledgePointIds: oneDigitAndTens, prompt: '两个结果分别是 54 + 3 和 54 + 20。它们的个位有什么不同？', answer: '前者个位增加 3，后者个位不变', distractors: ['两者都让个位增加 2', '前者个位不变，后者个位增加 3'], hint: '一个加数是个位数，另一个是整十数。', explanation: '54 + 3 = 57，个位增加；54 + 20 = 74，个位仍是 4。' },
    { knowledgePointIds: twoDigitAndTens, prompt: '小组有 61 枚棋子，老师又给 30 枚。哪一步最方便？', answer: '先给十位增加 3 个十，得到 91', distractors: ['先把个位 1 加 3，得到 64', '把 61 减去 30，得到 31'], hint: '30 是几个十？', explanation: '61 + 30 是增加 3 个十，十位从 6 个十变成 9 个十，结果是 91。' },
    { knowledgePointIds: oneDigit, prompt: '有 75 张书签，要拿走多少张才剩 72 张？', answer: '3 张', distractors: ['7 张', '13 张'], hint: '从 75 数回到 72。', explanation: '75 - 72 = 3，所以拿走 3 张。' },
    { knowledgePointIds: twoDigitAndTens, prompt: '操场上原有一些同学，又来了 30 人后共有 74 人。原来有多少人？', answer: '44 人', distractors: ['40 人', '74 人'], hint: '用现在的人数减去后来增加的 3 个十。', explanation: '74 - 30 = 44，操场上原来有 44 人。' },
    { knowledgePointIds: oneDigitAndTens, prompt: '小明说 48 + 1 和 48 + 10 都只让个位增加。哪句话能纠正他？', answer: '加 1 个一会改变个位，加 1 个十会改变十位', distractors: ['两道算式都只改变个位', '加 1 个十会让个位减少 1'], hint: '分别看加数 1 和 10 表示几个一或几个十。', explanation: '48 + 1 = 49，48 + 10 = 58；加 10 改变的是十位。' },
    { knowledgePointIds: twoDigitAndTens, prompt: '从 93 中减去 50 后，下面哪个数位信息正确？', answer: '十位少 5 个十，个位仍是 3', distractors: ['个位少 5，十位仍是 9', '十位和个位都变成 0'], hint: '50 是 5 个十。', explanation: '93 有 9 个十和 3 个一，减去 5 个十后为 43。' },
    { knowledgePointIds: oneDigit, prompt: '哪种说法能说明 86 - 4 的结果？', answer: '86 有 8 个十和 6 个一，去掉 4 个一还剩 82', distractors: ['去掉 4 个十，所以还剩 46', '把 86 和 4 合起来，所以是 90'], hint: '减去的是几个一，十位应怎样处理？', explanation: '86 - 4 = 82，十位上的 8 个十不变。' },
    { knowledgePointIds: twoDigitAndTens, prompt: '小林算 42 + 30 时，先把 42 拆成 40 和 2。应怎样继续？', answer: '40 + 30 = 70，再加 2 得 72', distractors: ['40 + 2 = 42，再减去 30 得 12', '42 + 3 = 45'], hint: '把整十数和整十数先合起来。', explanation: '42 + 30 = 40 + 30 + 2 = 70 + 2 = 72。' },
    { knowledgePointIds: oneDigitAndTens, prompt: '两道算式分别是 57 + 2 和 57 + 20。哪一种比较方法合适？', answer: '计算后比较 59 和 77', distractors: ['只看 2 和 20 就说结果相同', '把 57 从两道算式中都去掉'], hint: '先分别判断加的是几个一或几个十。', explanation: '57 + 2 = 59，57 + 20 = 77，结果不同。' },
    { knowledgePointIds: tens, prompt: '九十减去四十后，再加上二十，结果是多少？', answer: '70', distractors: ['30', '150'], hint: '先计算 90 - 40，再把 20 加回去。', explanation: '90 - 40 = 50，50 + 20 = 70。' },
    { knowledgePointIds: oneDigitAndTens, prompt: '篮子里有 72 个球，拿走 2 个后又放进 20 个。现在有几个？', answer: '90 个', distractors: ['50 个', '94 个'], hint: '按事情发生的顺序先减 2，再加 20。', explanation: '72 - 2 = 70，70 + 20 = 90。' },
    { knowledgePointIds: allPoints, prompt: '下面哪组把数量变化和算式都配对正确？', answer: '添 4 个：36 + 4；拿走 20 个：36 - 20', distractors: ['添 4 个：36 - 4；拿走 20 个：36 + 20', '添 40 个：36 + 4；拿走 2 个十：36 - 2'], hint: '先分清增加还是减少，再看数量是几个一或几个十。', explanation: '增加 4 用 36 + 4；拿走 20 用 36 - 20。' },
  ],
  high: [
    { knowledgePointIds: oneDigitAndTens, prompt: '先算 58 + 20 = 78。接下来最多再加几个一，结果还不超过 80？', answer: '最多 2 个一', distractors: ['最多 1 个一', '最多 3 个一'], hint: '先算 80 比 78 多几个。', explanation: '80 - 78 = 2，所以最多再加 2 个一，结果不超过 80。' },
    { knowledgePointIds: oneDigit, prompt: '小队有 63 人，离开 4 人后，小华写成 67 人。怎样改？', answer: '应计算 63 - 4 = 59 人', distractors: ['应计算 63 + 4 = 67 人', '应计算 60 - 4 = 56 人'], hint: '离开表示人数减少；再检查个位。', explanation: '63 - 4 = 59，离开后人数应减少。' },
    { knowledgePointIds: twoDigitAndTens, prompt: '计算 72 + 20 时，哪种方法最清楚？', answer: '把 20 看成 2 个十，给 72 增加 2 个十，得 92', distractors: ['把 20 看成 2 个一，得 74', '把 72 减去 2 个十，得 52'], hint: '先说清 20 表示几个十。', explanation: '72 + 20 是增加 2 个十，得到 92。' },
    { knowledgePointIds: twoDigitAndTens, prompt: '小林算 58 - 20 时说“个位 8 不变，十位 5 减 2”。结果应为？', answer: '38', distractors: ['56', '48'], hint: '按小林说的先算 5 个十减 2 个十。', explanation: '58 有 5 个十和 8 个一，减去 2 个十后是 3 个十和 8 个一，即 38。' },
    { knowledgePointIds: oneDigitAndTens, prompt: '两条记录都从 46 开始：一条增加 3，另一条增加 30。哪条结果更大？', answer: '增加 30 的结果更大，分别是 49 和 76', distractors: ['增加 3 的结果更大，分别是 79 和 49', '两条结果相同'], hint: '3 个一和 3 个十并不相同。', explanation: '46 + 3 = 49，46 + 30 = 76，增加 30 得到的结果更大。' },
    { knowledgePointIds: oneDigitAndTens, prompt: '47 + 5 = 52。用哪道减法可以检查答案？', answer: '52 - 5 = 47', distractors: ['52 + 5 = 57', '47 - 5 = 42'], hint: '用和减去后来加上的数。', explanation: '52 - 5 回到 47，说明加法结果正确。' },
    { knowledgePointIds: twoDigitAndTens, prompt: '同伴算 36 + 30 = 66，却把理由写成“36 加 3”。哪项评价准确？', answer: '结果对，但理由不对；应加 3 个十，也就是 30', distractors: ['结果和理由都对，3 和 30 一样多', '结果应是 39，因为只加了 3'], hint: '区分 3 个一和 3 个十。', explanation: '36 + 30 = 66；加数 30 表示 3 个十，不是 3 个一。' },
    { knowledgePointIds: oneDigit, prompt: '小明说 84 - 3 = 81，因为 4 个一减 3 个一还剩 1 个一。这个理由完整吗？', answer: '完整，十位 8 个十不变，个位剩 1', distractors: ['不完整，84 应先减去 30', '不完整，十位也要减 3'], hint: '看减数 3 表示几个一。', explanation: '84 - 3 = 81；减去 3 个一后，十位上的 8 个十保持不变。' },
    { knowledgePointIds: oneDigitAndTens, prompt: '哪组可以用同一个结果 57 说明两种不同的变化？', answer: '54 + 3 和 77 - 20', distractors: ['54 + 30 和 77 - 2', '57 + 3 和 77 - 20'], hint: '分别算一算，注意一个加个位数、一个减整十数。', explanation: '54 + 3 = 57，77 - 20 = 57。' },
    { knowledgePointIds: tens, prompt: '小组算出 80 - 30 = 50。哪道加法能检查它？', answer: '50 + 30 = 80', distractors: ['80 + 30 = 110', '50 - 30 = 20'], hint: '差加上减数，应回到被减数。', explanation: '50 + 30 = 80，回到了原来的数。' },
    { knowledgePointIds: oneDigitAndTens, prompt: '一盒彩笔原有 43 支，又添 5 支；另一盒有 43 支，又添 50 支。哪句比较正确？', answer: '第二盒多，因为添了 5 个十而不是 5 个一', distractors: ['第一盒多，因为 5 比 50 大', '两盒一样多，因为都从 43 开始'], hint: '5 和 50 表示的计数单位不同。', explanation: '43 + 5 = 48；43 + 50 = 93，第二盒数量更多。' },
    { knowledgePointIds: twoDigitAndTens, prompt: '□ - 40 = 36。用“加回去”的想法，方框里应是多少？', answer: '76', distractors: ['4', '64'], hint: '把 36 再加上拿走的 40。', explanation: '36 + 40 = 76，所以 76 - 40 = 36。' },
    { knowledgePointIds: allPoints, prompt: '做两步变化：先从 64 中拿走 4，再增加 30。结果是多少？', answer: '90', distractors: ['30', '98'], hint: '按先后顺序计算，第一步会得到整十数。', explanation: '64 - 4 = 60，60 + 30 = 90。' },
    { knowledgePointIds: oneDigitAndTens, prompt: '比较 72 + 3 和 72 + 20，哪句话能说明两种变化？', answer: '前者增加 3 个一，后者增加 2 个十', distractors: ['前者增加 3 个十，后者增加 2 个一', '两道算式都只增加个位数'], hint: '看每个加数表示几个一或几个十。', explanation: '72 + 3 是增加 3 个一；72 + 20 是增加 2 个十。' },
    { knowledgePointIds: oneDigit, prompt: '从 59 个圆片中拿走 6 个，有人说结果是 53。用加法怎样核对？', answer: '53 + 6 = 59', distractors: ['59 + 6 = 65', '53 - 6 = 47'], hint: '剩下的数量加上拿走的数量，应回到原数。', explanation: '53 + 6 = 59，和原来的 59 个相同。' },
    { knowledgePointIds: twoDigitAndTens, prompt: '70 + 20 与 90 - 20 都得 90 吗？', answer: '不是；70 + 20 = 90，90 - 20 = 70', distractors: ['是，两道算式都等于 90', '不是；两道算式都等于 70'], hint: '一题增加 2 个十，一题拿走 2 个十。', explanation: '70 + 20 = 90；90 - 20 = 70。' },
    { knowledgePointIds: oneDigitAndTens, prompt: '盒中有 58 个纽扣，拿走 8 个后再放入 20 个。小雨说总数是 70，怎样判断？', answer: '先算 58 - 8 = 50，再算 50 + 20 = 70，小雨正确', distractors: ['先算 58 + 8 = 66，再减 20 得 46', '只看最后的 20，所以总数是 20'], hint: '把题目中的两次变化按顺序记录。', explanation: '58 - 8 = 50，50 + 20 = 70。' },
    { knowledgePointIds: oneDigitAndTens, prompt: '如果 65 + 4 = 69，那么 69 - 40 应是多少？', answer: '29', distractors: ['65', '33'], hint: '减去的是 4 个十，不是 4 个一。', explanation: '69 - 40 = 29；减去 4 个十，个位上的 9 不变。' },
    { knowledgePointIds: twoDigitAndTens, prompt: '小队有 81 人，走了 30 人后又来了 10 人。最终人数是多少？', answer: '61 人', distractors: ['41 人', '121 人'], hint: '先减去离开的人数，再加上后来到的人数。', explanation: '81 - 30 = 51，51 + 10 = 61。' },
    { knowledgePointIds: oneDigitAndTens, prompt: '下面哪个判断同时用到了“加一位数”和“减整十数”？', answer: '42 + 6 = 48，之后 48 - 20 = 28', distractors: ['42 + 60 = 102，之后 102 - 2 = 100', '42 - 6 = 36，之后 36 + 2 = 38'], hint: '先确认每一步的运算对象和单位。', explanation: '第一步增加 6 个一，第二步减少 2 个十，两步都符合题目所说的变化。' },
    { knowledgePointIds: allPoints, prompt: '小组想检查 38 + 2 + 40 = 80。哪种拆分最便于核对？', answer: '先算 38 + 2 = 40，再算 40 + 40 = 80', distractors: ['先算 38 + 40 = 68，再加 2 得 70', '先算 2 + 40 = 42，再减去 38'], hint: '先把个位凑成整十，再加上整十数。', explanation: '38 + 2 = 40，40 + 40 = 80，结果正确。' },
    { knowledgePointIds: tens, prompt: '有 100 张卡片，送走 30 张后又收回 20 张。剩下多少张？', answer: '90 张', distractors: ['50 张', '150 张'], hint: '两次都是整十数变化，按顺序计算。', explanation: '100 - 30 = 70，70 + 20 = 90。' },
    { knowledgePointIds: allPoints, prompt: '哪种说法能同时解释 56 + 3 = 59 和 59 - 20 = 39？', answer: '先增加 3 个一，再拿走 2 个十', distractors: ['先增加 3 个十，再拿走 2 个一', '两步都只改变个位'], hint: '每一步都要区分一和十。', explanation: '56 + 3 增加 3 个一得到 59；59 - 20 减去 2 个十得到 39。' },
    { knowledgePointIds: oneDigitAndTens, prompt: '从 65 开始，先增加 30，再拿走一些，最后是 90。拿走了几个？', answer: '5 个', distractors: ['4 个', '6 个'], hint: '先算增加 30 后的数量，再看它比 90 多多少。', explanation: '65 + 30 = 95，95 - 90 = 5，所以拿走了 5 个。' },
    { knowledgePointIds: allPoints, prompt: '小雨从一个数开始，先加 20，再减 6，最后得到 70。她开始时是多少？', answer: '56', distractors: ['50', '76'], hint: '按相反顺序把后两步还原：先加回 6，再减去 20。', explanation: '70 + 6 = 76，76 - 20 = 56；检查：56 + 20 = 76，76 - 6 = 70。' },
  ],
};

function createActivity(draft: ActivityDraft, difficulty: Difficulty, index: number): Grade1Term2MathUnit06SupplementalActivity {
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

export const grade1Term2MathUnit06SupplementalActivities = (Object.entries(drafts) as [Difficulty, ActivityDraft[]][])
  .flatMap(([difficulty, items]) => items.map((draft, index) => createActivity(draft, difficulty, index)));
