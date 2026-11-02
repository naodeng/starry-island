import type { ChoiceActivityDefinition, Difficulty } from '../../content/types';

export interface Grade1Term2MathUnit04SupplementalActivity {
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

const sourceUnitId = 'grade-1/term-2/math/unit-04';
const idPrefix = 'challenge-supplement-grade-1-term-2-math-unit-04';
const composition = ['two-digit-number-composition'];
const sequence = ['number-sequence-to-100'];
const comparison = ['number-comparison-to-100'];
const tens = ['tens-and-hundreds'];

const drafts: Record<Difficulty, ActivityDraft[]> = {
  basic: [
    { knowledgePointIds: composition, prompt: '4个十和6个一合起来是多少？', answer: '46', distractors: ['64', '40'], hint: '十位上的4表示4个十，个位上的6表示6个一。', explanation: '4个十是40，6个一是6，合起来是46。' },
    { knowledgePointIds: composition, prompt: '数位表里十位上是7，个位上是2，这个数是多少？', answer: '72', distractors: ['27', '70'], hint: '先看十位，再看个位，按数位顺序写数。', explanation: '十位上是7、个位上是2，组成的数是72。' },
    { knowledgePointIds: composition, prompt: '58里面有几个十和几个一？', answer: '5个十和8个一', distractors: ['8个十和5个一', '5个十和8个十'], hint: '十位上的数字表示几个十，个位上的数字表示几个一。', explanation: '58的十位是5，个位是8，所以有5个十和8个一。' },
    { knowledgePointIds: composition, prompt: '6个十和0个一写成哪个数？', answer: '60', distractors: ['6', '66'], hint: '个位没有一，要在个位写0占位。', explanation: '6个十是60，个位是0，所以写作60。' },
    { knowledgePointIds: composition, prompt: '数字9在数“39”里表示什么？', answer: '9个一', distractors: ['9个十', '3个一'], hint: '看一看9所在的是十位还是个位。', explanation: '39的9在个位，表示9个一。' },
    { knowledgePointIds: composition, prompt: '有8捆小棒，每捆10根，另外还有3根，一共是多少根？', answer: '83根', distractors: ['38根', '80根'], hint: '8捆是8个十，再加上3个一。', explanation: '8个十是80，80加3等于83。' },
    { knowledgePointIds: composition, prompt: '哪个数由2个十和9个一组成？', answer: '29', distractors: ['92', '20'], hint: '十位写2，个位写9。', explanation: '2个十和9个一组成29。' },
    { knowledgePointIds: composition, prompt: '“六十七”应该写成哪个数？', answer: '67', distractors: ['607', '76'], hint: '六十在十位写6，七个一在个位写7。', explanation: '六十七有6个十和7个一，写作67。' },
    { knowledgePointIds: sequence, prompt: '按顺序数：36，37，38，接下来是几？', answer: '39', distractors: ['40', '38'], hint: '每次往后数一个数。', explanation: '38后面紧挨着的数是39。' },
    { knowledgePointIds: sequence, prompt: '49后面紧挨着的数是几？', answer: '50', distractors: ['48', '59'], hint: '从49再往后数一个。', explanation: '49再往后一个数就是50。' },
    { knowledgePointIds: sequence, prompt: '哪个数在70的前面？', answer: '69', distractors: ['71', '60'], hint: '从70往回数一个。', explanation: '70前面紧挨着的数是69。' },
    { knowledgePointIds: sequence, prompt: '数数时漏掉了一个数：81，82，□，84。方框里填几？', answer: '83', distractors: ['82', '85'], hint: '82后面、84前面的数是什么？', explanation: '81、82、83、84是连续的数，所以方框里是83。' },
    { knowledgePointIds: sequence, prompt: '从小到大排：42、24、40，最前面应该是哪一个？', answer: '24', distractors: ['40', '42'], hint: '先比较十位，十位较小的数排在前面。', explanation: '24的十位是2，比40和42的十位都小，所以排在最前面。' },
    { knowledgePointIds: sequence, prompt: '从96接着往后数两个数，第二个数是几？', answer: '98', distractors: ['97', '99'], hint: '先数97，再数一个。', explanation: '96后面是97，再往后一个是98。' },
    { knowledgePointIds: sequence, prompt: '从小到大排，哪一组数的顺序正确？', answer: '57、58、59', distractors: ['58、57、59', '59、58、57'], hint: '相邻的数每次增加1。', explanation: '57、58、59依次增加1，顺序正确。' },
    { knowledgePointIds: sequence, prompt: '数到100前面的一个数是几？', answer: '99', distractors: ['98', '90'], hint: '从99再往后数一个就是100。', explanation: '99后面是100，所以100前面的一个数是99。' },
    { knowledgePointIds: comparison, prompt: '哪个数更大：63还是36？', answer: '63', distractors: ['36', '一样大'], hint: '先比较十位上的数字。', explanation: '63有6个十，36有3个十，6个十比3个十多，所以63更大。' },
    { knowledgePointIds: comparison, prompt: '在“48 □ 51”中，应该填“＞”还是“＜”？', answer: '＜', distractors: ['＞', '＝'], hint: '48不到50，51超过50。', explanation: '48比51小，所以48＜51。' },
    { knowledgePointIds: comparison, prompt: '下面哪个数最小：75、57、70？', answer: '57', distractors: ['70', '75'], hint: '先看十位，十位小的数更小。', explanation: '57的十位是5，另外两个数的十位是7，所以57最小。' },
    { knowledgePointIds: comparison, prompt: '小雨有28张卡片，小禾有32张。谁的卡片更多？', answer: '小禾', distractors: ['小雨', '两人一样多'], hint: '比较28和32的十位。', explanation: '32有3个十，28有2个十，所以小禾的卡片更多。' },
    { knowledgePointIds: tens, prompt: '10个十合起来是几？', answer: '100', distractors: ['10', '90'], hint: '一个十是10，数十个十就是10、20……', explanation: '10个十是100，也就是一百。' },
    { knowledgePointIds: tens, prompt: '80里面有几个十？', answer: '8个十', distractors: ['80个十', '8个一'], hint: '一个十是10，数一数80里有几个10。', explanation: '80由8个十组成，所以里面有8个十。' },
    { knowledgePointIds: tens, prompt: '比40多一个十的数是几？', answer: '50', distractors: ['41', '30'], hint: '一个十是10，40再加10。', explanation: '40加一个十是50。' },
    { knowledgePointIds: tens, prompt: '100里面有几个一？', answer: '100个一', distractors: ['10个一', '1个一'], hint: '数一数一共有多少个单独的1。', explanation: '100由100个一组成，也可以说是10个十。' },
  ],
  advanced: [
    { knowledgePointIds: composition, prompt: '小明用5捆小棒和7根散棒摆数，摆出的数是多少？', answer: '57', distractors: ['75', '12'], hint: '一捆是一个十，散棒表示几个一。', explanation: '5捆是5个十，另有7个一，合起来是57。' },
    { knowledgePointIds: composition, prompt: '一个两位数，十位上的数比个位上的数多3，个位是4。这个数是多少？', answer: '74', distractors: ['47', '34'], hint: '十位数字是4加3。', explanation: '十位是7，个位是4，所以这个数是74。' },
    { knowledgePointIds: composition, prompt: '数位表上的十位是8，个位上的数比十位少5。这个数是几？', answer: '83', distractors: ['85', '38'], hint: '先算个位数字，再按十位、个位写数。', explanation: '8减5等于3，十位是8、个位是3，组成83。' },
    { knowledgePointIds: composition, prompt: '哪一组小棒能摆出“六十三”：6捆和几根？', answer: '3根', distractors: ['6根', '30根'], hint: '六十三由6个十和3个一组成。', explanation: '6捆表示6个十，还要3根表示3个一，合起来是63。' },
    { knowledgePointIds: composition, prompt: '一个两位数由9个十和5个一组成。把个位上的数字和十位上的数字交换后，得到几？', answer: '59', distractors: ['95', '50'], hint: '原数是95，交换两个数字的位置。', explanation: '95交换十位和个位后，十位变成5、个位变成9，得到59。' },
    { knowledgePointIds: composition, prompt: '十位上是4，个位上的数字比十位大2。这个数是多少？', answer: '46', distractors: ['64', '42'], hint: '个位是4加2，再把两个数字放回数位。', explanation: '个位数字是6，所以十位4、个位6，组成46。' },
    { knowledgePointIds: composition, prompt: '数“82”里，十位上的数字比个位上的数字大多少？', answer: '6', distractors: ['2', '10'], hint: '比较十位数字8和个位数字2。', explanation: '8比2大6，所以十位上的数字比个位上的数字大6。' },
    { knowledgePointIds: sequence, prompt: '按每次增加2的规律接着写：34，36，38，□。', answer: '40', distractors: ['39', '42'], hint: '每一步都比前一个数多2。', explanation: '38加2等于40，所以方框里填40。', },
    { knowledgePointIds: sequence, prompt: '从67后面开始，每次往后数一个，数到70要经过几个数？', answer: '3个数：68、69、70', distractors: ['2个数：68、69', '4个数：67、68、69、70'], hint: '不把67算进去，接着数68、69、70。', explanation: '从67后面继续数，经过68、69、70，一共3个数。' },
    { knowledgePointIds: sequence, prompt: '把61、16、60、19从小到大排列，第二个数是哪一个？', answer: '19', distractors: ['16', '60'], hint: '先排十位较小的16和19，再看60和61。', explanation: '顺序是16、19、60、61，第二个数是19。' },
    { knowledgePointIds: sequence, prompt: '从88往前退，连续数三个数，不把88算进去，第三个数是几？', answer: '85', distractors: ['86', '84'], hint: '88前面依次是87、86，再往前一个。', explanation: '不把88算进去，往前数是87、86、85，第三个数是85。' },
    { knowledgePointIds: sequence, prompt: '在40和50之间，个位是7的数是哪一个？', answer: '47', distractors: ['37', '57'], hint: '40多的数十位是4，个位写7。', explanation: '40和50之间十位都是4，个位是7的数是47。' },
    { knowledgePointIds: sequence, prompt: '把93、39、90、99按从大到小排列，排在第二的是几？', answer: '93', distractors: ['90', '99'], hint: '先比较十位，再比较十位相同的个位。', explanation: '从大到小是99、93、90、39，第二个是93。' },
    { knowledgePointIds: sequence, prompt: '从一个数往后数，得到76、77、78。这个数可能是几？', answer: '75', distractors: ['79', '74'], hint: '76前面紧挨着的数是75。', explanation: '75后面依次是76、77、78，所以起点是75。' },
    { knowledgePointIds: comparison, prompt: '用4、8组成一个两位数，哪个数更大：48还是84？', answer: '84', distractors: ['48', '一样大'], hint: '先看十位上的数字4和8。', explanation: '84的十位是8，48的十位是4，8个十比4个十多，所以84更大。' },
    { knowledgePointIds: comparison, prompt: '在□里填一个数字，使“6□＞65”成立，下面哪个数字可以填？', answer: '7', distractors: ['4', '5'], hint: '十位相同，比较个位；个位要比5大。', explanation: '填7后是67，67比65大；填4或5都不大于65。' },
    { knowledgePointIds: comparison, prompt: '图书角有46本故事书、64本科普书。哪类书多？多多少本？', answer: '科普书多18本', distractors: ['故事书多18本', '科普书多20本'], hint: '64比46多多少？可以从46数到64。', explanation: '64减46等于18，科普书多18本。' },
    { knowledgePointIds: comparison, prompt: '三个数中，哪个数最接近60：56、68、43？', answer: '56', distractors: ['68', '43'], hint: '分别看它们和60相差多少。', explanation: '56和60相差4，68相差8，43相差17，所以56最接近60。' },
    { knowledgePointIds: comparison, prompt: '小兔排队：小花前面是52号，后面是54号。小花的号码比50大多少？', answer: '3', distractors: ['2', '4'], hint: '小花的号码是53，再算53比50多多少。', explanation: '52、53、54连续，小花是53；53比50多3。' },
    { knowledgePointIds: comparison, prompt: '下面哪个比较结果正确？', answer: '78＞69', distractors: ['58＞85', '46＝64'], hint: '先比十位，再比个位。', explanation: '78有7个十，69有6个十，所以78＞69。' },
    { knowledgePointIds: comparison, prompt: '从45、54、50中选出一个比50小的数。', answer: '45', distractors: ['54', '50'], hint: '比50小的数，十位小于5，或十位相同且个位小于0。', explanation: '45的十位是4，比50小；54更大，50与50相等。' },
    { knowledgePointIds: tens, prompt: '小林有6个十，后来又得到2个十，现在有多少？', answer: '80', distractors: ['62', '8'], hint: '6个十再加2个十，一共几个十？', explanation: '6个十加2个十是8个十，8个十是80。' },
    { knowledgePointIds: tens, prompt: '一根彩带长70厘米，剪掉一个十厘米，还剩多少厘米？', answer: '60厘米', distractors: ['69厘米', '7厘米'], hint: '一个十是10，70减去10。', explanation: '70减10等于60，还剩60厘米。' },
    { knowledgePointIds: tens, prompt: '□个十合起来是100，方框里填几？', answer: '10', distractors: ['1', '9'], hint: '一个十是10，继续数十个十。', explanation: '10个十是100，所以方框里填10。' },
    { knowledgePointIds: tens, prompt: '90再添上一个十，是多少？', answer: '100', distractors: ['91', '99'], hint: '90有9个十，再添1个十。', explanation: '9个十再添1个十是10个十，也就是100。' },
    { knowledgePointIds: tens, prompt: '小盒里有7捆每捆10支的铅笔，取走一捆，还剩多少支？', answer: '60支', distractors: ['69支', '7支'], hint: '7捆是70支，取走一捆就是取走10支。', explanation: '70减10等于60，还剩60支。' },
    { knowledgePointIds: tens, prompt: '用整十数表示：3个十和另外5个十合起来是多少？', answer: '80', distractors: ['35', '8'], hint: '把十的个数相加，再写成整十数。', explanation: '3个十加5个十是8个十，也就是80。' },
    { knowledgePointIds: tens, prompt: '100比80多几个十？', answer: '2个十', distractors: ['20个十', '1个十'], hint: '100减80等于多少，再看里面有几个十。', explanation: '100减80等于20，20是2个十。' },
  ],
  high: [
    { knowledgePointIds: composition, prompt: '小亮说“十位是5、个位是3的数是35”。他错在哪里？', answer: '两个数位写反了，正确数是53', distractors: ['正确数是35，十位可以放3', '正确数是8，因为5加3等于8'], hint: '十位上的数字要放在十位，个位上的数字要放在个位。', explanation: '十位是5、个位是3，应写成53；35把两个数位写反了。' },
    { knowledgePointIds: composition, prompt: '一个数有4个十和一些一，个位数字比十位数字多2。这个数是多少？', answer: '46', distractors: ['64', '42'], hint: '个位数字是4加2，再按十位、个位写数。', explanation: '个位数字是6，十位是4，所以这个数是46。' },
    { knowledgePointIds: composition, prompt: '用数字2和9组成两个不同的两位数。它们相差多少？', answer: '63', distractors: ['7', '81'], hint: '两个数是29和92，再用大数减小数。', explanation: '92减29等于63，两个数相差63。' },
    { knowledgePointIds: composition, prompt: '一个两位数十位和个位上的数字合起来是9，十位是6。这个数是多少？', answer: '63', distractors: ['69', '36'], hint: '个位数字是9减6。', explanation: '9减6等于3，十位6、个位3，组成63。' },
    { knowledgePointIds: composition, prompt: '小芳把“八个十和四个一”写成48。她应该怎样改？', answer: '改成84', distractors: ['改成804', '不用改，48正确'], hint: '先确定十位应该写几，再写个位。', explanation: '八个十写在十位是8，四个一写在个位是4，所以应写84。' },
    { knowledgePointIds: composition, prompt: '哪个数比“5个十和8个一”组成的数少3个一？', answer: '55', distractors: ['58', '28'], hint: '先写出58，再从个位的8个一里去掉3个一。', explanation: '58少3个一是55。' },
    { knowledgePointIds: composition, prompt: '数“71”里的7个十换成70个一，数的大小会变吗？', answer: '不会，还是71', distractors: ['会变成141', '会变成8'], hint: '7个十就是70，原数是70加1。', explanation: '7个十等于70个一，70加1仍是71，数的大小不变。' },
    { knowledgePointIds: sequence, prompt: '一列数从47开始，每次加1，把47算作第1个数。第4个数是多少？', answer: '50', distractors: ['51', '49'], hint: '依次是47、48、49、50。', explanation: '依次数出47、48、49、50，第4个数是50。' },
    { knowledgePointIds: sequence, prompt: '小明从60开始倒着数，把60算作第1个数。数到第4个数时停下，是几？', answer: '57', distractors: ['56', '58'], hint: '依次是60、59、58、57。', explanation: '从60开始数四个数是60、59、58、57，最后停在57。' },
    { knowledgePointIds: sequence, prompt: '数列里有两个空格：72，□，□，75。应该依次填什么？', answer: '73、74', distractors: ['74、73', '73、75'], hint: '把72到75之间的连续数补齐。', explanation: '72、73、74、75是连续的数，所以依次填73、74。' },
    { knowledgePointIds: sequence, prompt: '从29往后数，数到32时，一共向后数了几个数？', answer: '3个数', distractors: ['4个数', '2个数'], hint: '29后面依次是30、31、32，不把29算进去。', explanation: '从29继续数经过30、31、32，一共3个数。' },
    { knowledgePointIds: sequence, prompt: '把48、84、80、44从大到小排列，第三个数是几？', answer: '48', distractors: ['44', '80'], hint: '先排十位较大的8，再排十位是4的两个数。', explanation: '顺序是84、80、48、44，第三个数是48。' },
    { knowledgePointIds: sequence, prompt: '从小到大排三个连续数，最小的是98。最大的数是多少？', answer: '100', distractors: ['99', '101'], hint: '98后面依次是99，再后面是100。', explanation: '三个连续数是98、99、100，最大的是100。' },
    { knowledgePointIds: sequence, prompt: '按每次减少1的规律填空：65，64，□，62。', answer: '63', distractors: ['61', '64'], hint: '每一步都比前一个数少1。', explanation: '64少1是63，方框里应填63。' },
    { knowledgePointIds: comparison, prompt: '用数字4、7组成两位数，哪一个数最接近50？', answer: '47', distractors: ['74', '两个数一样近'], hint: '比较47和74分别离50多远。', explanation: '47离50差3，74离50差24，所以47更接近50。' },
    { knowledgePointIds: comparison, prompt: '小兔的号码比62大，比66小，个位是5。小兔的号码是几？', answer: '65', distractors: ['64', '63'], hint: '先找出62和66之间的数，再看哪个个位是5。', explanation: '62和66之间有63、64、65，其中个位是5的是65。' },
    { knowledgePointIds: comparison, prompt: '把“58＞□”补完整，方框里最大可以填几？', answer: '57', distractors: ['58', '59'], hint: '方框里的数要比58小，最大的是它前面紧挨着的数。', explanation: '比58小的最大整数组成数是57，所以最大填57。' },
    { knowledgePointIds: comparison, prompt: '有三张号码卡：46、64、60。哪张卡放在46和64之间？', answer: '60', distractors: ['46', '64'], hint: '按从小到大排列这三个数。', explanation: '46＜60＜64，所以60在46和64之间。' },
    { knowledgePointIds: comparison, prompt: '小雨说“52比49小，因为2比9小”。怎样说明她错了？', answer: '先比较十位，52有5个十，49有4个十，所以52更大', distractors: ['她说得对，只看个位就可以', '两个数一样大，因为都只有两个数字'], hint: '比较两位数时，先看十位。', explanation: '十位上的5比4大，所以52比49大，不应先用个位判断。' },
    { knowledgePointIds: comparison, prompt: '□里填哪个数字，能让“□3＜53”成立？', answer: '4', distractors: ['5', '6'], hint: '十位要比5小。', explanation: '填4得到43，43＜53；填5得到53相等，填6则更大。' },
    { knowledgePointIds: comparison, prompt: '连续三个数是□、79、□。这三个数中哪个最大？', answer: '80', distractors: ['78', '79'], hint: '79前后紧挨着的数分别是多少？', explanation: '这三个数是78、79、80，最大的是80。' },
    { knowledgePointIds: tens, prompt: '小军有9捆小棒，又添1捆。他说现在是“910”。怎样改正？', answer: '9个十加1个十是10个十，也就是100', distractors: ['9捆加1捆写成91', '9加1等于10，所以是10根'], hint: '先把捆数合起来，再把10个十换成一百。', explanation: '9捆加1捆是10捆；10个十是100，不写成910。' },
    { knowledgePointIds: tens, prompt: '一盒彩笔有40支。再放进几支整十支的彩笔，能正好变成100支？', answer: '60支', distractors: ['6支', '50支'], hint: '100比40多多少？', explanation: '100减40等于60，需要再放进60支，也就是6个十。' },
    { knowledgePointIds: tens, prompt: '小华把80减一个十算成79，错在哪里？', answer: '一个十是10，80减10应是70', distractors: ['80减一个十等于80', '一个十是1，所以79正确'], hint: '想想一个十里面有几个一。', explanation: '一个十是10，不是1；80减10等于70。' },
    { knowledgePointIds: tens, prompt: '有100颗珠子，每10颗穿成一串。可以穿成几串？', answer: '10串', distractors: ['100串', '1串'], hint: '每串一捆十个，看看100里有几个10。', explanation: '100里面有10个十，所以可以穿成10串。' },
    { knowledgePointIds: tens, prompt: '60、70、80、90、□，每次增加一个十。方框里应填哪个整十数？', answer: '100', distractors: ['95', '110'], hint: '每次增加一个十，90再加10是多少？', explanation: '90再加10是100，数列为60、70、80、90、100。' },
    { knowledgePointIds: tens, prompt: '一根绳子长100厘米，剪去3个十厘米，还剩多少厘米？', answer: '70厘米', distractors: ['97厘米', '30厘米'], hint: '3个十是30，再从100里减去30。', explanation: '3个十是30，100减30等于70厘米。' },
  ],
};

function createActivity(draft: ActivityDraft, difficulty: Difficulty, index: number): Grade1Term2MathUnit04SupplementalActivity {
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

export const grade1Term2MathUnit04SupplementalActivities = (Object.entries(drafts) as [Difficulty, ActivityDraft[]][])
  .flatMap(([difficulty, items]) => items.map((draft, index) => createActivity(draft, difficulty, index)));
