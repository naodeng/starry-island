import { buildEnglishUnit } from '../../../../grade-2/term-1/english/buildEnglishUnit';
import { arrange, choose, pair, q8, sortInto } from '../../../../grade-2/term-1/english/questionAuthoring';
import type { EightEnglishQuestions, EnglishTaskSpec } from '../../../../grade-2/term-1/english/questionAuthoring';

// 核对固定 TapX 快照：英语五年级上册目录 PDF 第6页；U4 印刷页44–55（PDF页49–60）。
function task(
  title: string,
  objective: string,
  companionId: EnglishTaskSpec['companionId'],
  questions: EightEnglishQuestions,
): EnglishTaskSpec {
  return { title, objective, companionId, questions };
}

export const unit = buildEnglishUnit({
  grade: 5,
  term: 1,
  formalUnitNumber: 4,
  entryId: 'unit-04',
  title: 'Unit 4 · Shopping Day',
  sourceTopics: [
    '识别文具、衣物和礼物词汇：pencil、sharpener、scissors、pencil box、crayons、eraser、exercise book、present、model car、pants、cap、sweater',
    '在购物对话中表达需求和回应帮助：Can I help you? Yes, please. I want to buy ... I’ll take it/them.',
    '按单复数询问价格：How much is it? / How much are the pants? 并用完整句子回答价格',
    '询问若干商品的总价：How much is it all together? 根据已知标价计算简单合计',
    '辨认 th 在 three、thin、mouth、maths 与 this、that、father、mother 等词中的拼写和读音',
    '理解在线购物的基本步骤，知道付款、地址等操作需要在家长帮助下完成',
    '阅读原创购物情境，比较学校用品的颜色、价格和预算；理解故事中储蓄、劳动和价格变化的信息',
  ],
  basicTasks: [
    task('认读购物物品并表达需求', '认读常见文具、衣物和礼物名称，在熟悉的商店情境中表达想买的物品。', 'companion-01', q8([
      choose('Which word means “橡皮”？', ['eraser', 'sweater', 'present'], 0, '想一想哪件文具用来擦掉铅笔痕迹。', 'eraser 是“橡皮”；sweater 是毛衣，present 是礼物。'),
      choose('A pair of scissors is used for what?', ['Cutting paper.', 'Drinking water.', 'Wearing on your head.'], 0, '联系剪刀的常见用途。', 'scissors 是剪刀，可以用来剪纸。'),
      pair('把英文词语和中文意思连起来。', [
        ['pencil box', '铅笔盒'], ['box of crayons', '一盒蜡笔'], ['model car', '汽车模型'],
      ], '先认出文具和玩具的英文词，再核对中文意思。', 'pencil box 是铅笔盒，box of crayons 是一盒蜡笔，model car 是汽车模型。'),
      choose('Which item can you wear when the weather is cool?', ['a sweater', 'an exercise book', 'a pencil sharpener'], 0, '找一找哪一项是衣物。', 'sweater 是毛衣，天气凉时可以穿。'),
      choose('A customer says, “I want to buy a present.” What does the customer want?', ['A gift.', 'A ruler.', 'A pair of pants.'], 0, 'present 在购物情境中指什么？', 'present 表示“礼物”。'),
      choose('店员问 “Can I help you?” 小林想买一盒彩笔，哪句回答合适？', ['Yes, please. I want to buy a box of crayons.', 'No, I am a box of crayons.', 'It is under the desk.'], 0, '先礼貌回应，再说出想买的东西。', '购物时可以先说 Yes, please，再用 I want to buy ... 表达需求。'),
      sortInto('把物品分到“文具”或“衣物”。', ['文具', '衣物'], [
        { label: 'an exercise book', categoryIndex: 0 }, { label: 'a sharpener', categoryIndex: 0 },
        { label: 'a cap', categoryIndex: 1 }, { label: 'a pair of pants', categoryIndex: 1 },
      ], '先判断物品是学习用品还是穿戴用品。', 'exercise book 和 sharpener 是文具；cap 和 pants 是衣物。'),
      arrange('把词卡排成一句自然的购物表达。', ['buy', 'I', 'a model car', 'want to'], [1, 3, 0, 2], '先找主语 I，再把 want to 放在动词前。', '完整句子是 I want to buy a model car.，表示“我想买一辆汽车模型”。'),
    ])),
    task('询问价格并读懂商品标价', '使用 is/are 区分单件和复数商品的价格问句，并从商品标签中获取价格。', 'companion-02', q8([
      choose('How do you ask the price of one pencil box?', ['How much is the pencil box?', 'How many is the pencil box?', 'How much are the pencil box?'], 0, 'pencil box 是一件物品，选择与单数搭配的问法。', '询问一件物品的价格可以说 How much is the pencil box?'),
      choose('Which question asks the price of a pair of pants?', ['How much are the pants?', 'How much is the pants?', 'How many are the pants?'], 0, 'pants 通常以复数形式出现。', 'pants 用复数形式，因此问价格时用 How much are the pants?'),
      choose('A box of crayons costs 16 yuan. Which answer is correct?', ['It is 16 yuan.', 'They are 16 yuan.', 'It has 16 yuan.'], 0, '这里询问的是一盒彩笔，回答时可用 it。', '一盒彩笔是一件商品，可以回答 It is 16 yuan.'),
      choose('A pair of pants costs 90 yuan. How can you answer?', ['They are 90 yuan.', 'It is 90 yuan.', 'They has 90 yuan.'], 0, 'pants 用复数，注意回答时的 be 动词。', '询问 pants 使用 are，回答可以用 They are 90 yuan.'),
      pair('Price tags: a pencil box—20 yuan, an eraser—2 yuan, and a model car—30 yuan. 把商品和标价连起来。', [
        ['a pencil box', '20 yuan'], ['an eraser', '2 yuan'], ['a model car', '30 yuan'],
      ], '逐项看商品名称，按题干提供的价签配对。', '题干中的三个标签分别是 pencil box 20 yuan、eraser 2 yuan、model car 30 yuan。'),
      choose('店员想问“毛衣多少钱？”，应说哪一句？', ['How much is the sweater?', 'How many is the sweater?', 'How much are the sweater?'], 0, 'sweater 是一件衣物，用 is 询问价格。', 'How much is the sweater? 是询问一件毛衣价格的自然表达。'),
      sortInto('把问句分到“询问单数商品”或“询问复数商品”。', ['单数商品', '复数商品'], [
        { label: 'How much is the cap?', categoryIndex: 0 }, { label: 'How much is the exercise book?', categoryIndex: 0 },
        { label: 'How much are the scissors?', categoryIndex: 1 }, { label: 'How much are the pants?', categoryIndex: 1 },
      ], '观察问句中的 is 或 are，并留意商品是否用复数形式。', 'cap 和 exercise book 与 is 搭配；scissors 和 pants 以复数形式出现，与 are 搭配。'),
      arrange('把购物对话排成合理顺序。', ['How much is the exercise book?', 'It is 5 yuan.', 'I’ll take it.', 'Thank you.'], [0, 1, 2, 3], '先询问价格，再听店员回答，决定购买后礼貌致谢。', '顾客先询问价格，店员说明是5元，顾客确认购买并道谢。'),
    ])),
  ],
  advancedTasks: [
    task('根据需要和预算选择书包', '读懂 Lucy 购物故事中的颜色偏好、商品价格与预算，说明选择依据。', 'companion-03', q8([
      choose('Lucy says she likes blue and does not like orange. Which colour does she like for her new schoolbag?', ['Blue.', 'Orange.', 'Green.'], 0, '根据题干给出的颜色偏好作答。', 'Lucy 喜欢蓝色，不喜欢橙色。'),
      choose('Lucy does not like orange. The orange schoolbag costs 70 yuan. Why does she not choose it?', ['She does not like its colour.', 'It costs 110 yuan.', 'It is a model car.'], 0, '题干给出了价格和她拒绝的原因。', 'Lucy 不喜欢橙色，所以即使价格在预算内也不选它。'),
      choose('A blue schoolbag at Headstart costs 110 yuan. Lucy has 100 yuan. What is true?', ['It costs 10 yuan more than her money.', 'She has 10 yuan left after buying it.', 'It costs 60 yuan.'], 0, '把 110 yuan 和 100 yuan 比较。', '110 比 100 多 10，因此这只书包超出她的预算 10 元。'),
      choose('Lucy finds a small blue schoolbag for 60 yuan at Kids Right. Which schoolbag does she choose there?', ['A small blue one for 60 yuan.', 'An orange one for 70 yuan.', 'A blue one for 110 yuan.'], 0, '根据题干给出的商品信息作答。', '她选择 Kids Right 的小号蓝色书包，价格是 60 元。'),
      pair('Story facts: Lucy has 100 yuan and likes blue, not orange. A blue schoolbag at Headstart costs 110 yuan; a small blue one at Kids Right costs 60 yuan. Match each fact with a judgment.', [
        ['Lucy 有 100 元', '110 元的书包超出预算'], ['她更喜欢蓝色', '颜色会影响她的选择'], ['小号蓝色书包 60 元', '她有足够的钱购买'],
      ], '把偏好、预算和商品价格分开核对。', '预算为 100 元，110 元超出预算；60 元不超过预算，且蓝色符合她的偏好。'),
      choose('Lucy has 100 yuan and chooses a schoolbag for 60 yuan. How much money is left?', ['40 yuan.', '30 yuan.', '10 yuan.'], 0, '用题干中的钱数减去书包价格。', '100−60=40，因此她还剩 40 元。'),
      sortInto('Lucy has 100 yuan and likes blue, not orange. The orange schoolbag costs 70 yuan, the blue one at Headstart costs 110 yuan, and the small blue one at Kids Right costs 60 yuan. Sort the choices into “fits Lucy’s needs” or “does not fit”.', ['符合需要', '不符合'], [
        { label: '喜欢的蓝色', categoryIndex: 0 }, { label: '价格不超过 100 元', categoryIndex: 0 },
        { label: '不喜欢的橙色', categoryIndex: 1 }, { label: '价格为 110 元，超过预算', categoryIndex: 1 },
      ], '同时检查颜色偏好和预算限制。', '蓝色且不超过预算的选择符合故事中的需要；橙色和超预算的选择不符合。'),
      arrange('整理 Lucy 选择书包时的判断步骤。', ['找到符合颜色偏好的款式', '先确认自己有 100 元预算', '比较书包价格是否在预算内', '决定购买合适的蓝色书包'], [1, 0, 2, 3], '先明确限制和偏好，再比较选项并作出决定。', '她先知道自己的 100 元预算和蓝色偏好，再比较价格，最后选中合适的书包。'),
    ])),
    task('理解在线购物和 th 词语', '识别 th 拼写词语，并按安全、清楚的顺序描述在线购物中的家长协助步骤。', 'companion-04', q8([
      choose('Which word has “th” at the beginning?', ['three', 'green', 'house'], 0, '查看三个单词的开头字母。', 'three 的开头是 th；green 和 house 没有以 th 开头。'),
      choose('Which word has “th” in the middle?', ['mother', 'pencil', 'cloud'], 0, '找出表示“母亲”的单词。', 'mother 的中间包含 th。'),
      choose('Which pair has “th” in both words?', ['thin and mouth', 'chair and pencil', 'cloud and house'], 0, '逐个检查每个单词是否写有 th。', 'thin 和 mouth 都含有字母组合 th。'),
      choose('Online shopping asks for payment or delivery details. What should a child do?', ['Ask a parent to help.', 'Use a stranger’s card.', 'Share private details with anyone.'], 0, '想一想教材提醒孩子在线购物时需要谁的帮助。', '在线付款或填写配送信息时，孩子应请家长帮助。'),
      pair('把在线购物步骤和合适的说明连起来。', [
        ['选择合适的网站', '先确认购物地点可靠'], ['查找想买的商品', '比较商品信息'], ['付款和填写配送信息', '请家长协助完成'],
      ], '根据步骤作用匹配信息，不自行填写真实支付资料。', '先选择网站并查找商品；付款和配送信息等操作需要家长帮助。'),
      sortInto('把词语分到“含 th”或“不含 th”。', ['含 th', '不含 th'], [
        { label: 'this', categoryIndex: 0 }, { label: 'maths', categoryIndex: 0 },
        { label: 'sharpener', categoryIndex: 1 }, { label: 'crayons', categoryIndex: 1 },
      ], '按字母拼写查找连续的 t 和 h。', 'this 和 maths 含有 th；sharpener 和 crayons 不含 th。'),
      choose('After an online order is placed, what may happen next?', ['The buyer waits a few days for delivery.', 'The item must arrive before the order.', 'The child should send a password to a stranger.'], 0, '在线订购后，商品通常需要运输时间。', '订购完成后可能要等待几天，商品才送到。'),
      arrange('整理安全的在线购物过程。', ['请家长一起核对商品和网站', '找到需要的商品并比较信息', '由家长帮助付款和填写配送信息', '等待商品送达并核对收到的物品'], [1, 0, 2, 3], '先查找和比较，再让家长核对并协助付款，最后等待收货。', '先找商品，再请家长核对；付款和配送信息由家长协助，收到后核对商品。'),
    ])),
  ],
  highTasks: [
    task('合并购物清单并核算总价', '综合使用价格问句、单复数表达和加法核对多件商品是否符合预算。', 'companion-01', q8([
      choose('A pencil box costs 20 yuan and a pink exercise book costs 5 yuan. What is the total?', ['25 yuan.', '15 yuan.', '30 yuan.'], 0, '把两件商品的价格相加。', '20+5=25，因此总价是 25 元。'),
      choose('Mia buys a 16-yuan box of crayons and a 2-yuan eraser. How much does she pay?', ['18 yuan.', '14 yuan.', '20 yuan.'], 0, '分别读出两张商品价签，再相加。', '16+2=18，Mia 需要付 18 元。'),
      choose('A child has 30 yuan and wants an exercise book for 5 yuan and a model car for 30 yuan. Can the child buy both?', ['No. The total is 35 yuan.', 'Yes. The total is 25 yuan.', 'Yes. The total is 30 yuan.'], 0, '先算总价，再和 30 元比较。', '5+30=35，超过 30 元预算，因此不能同时购买。'),
      choose('A shopper buys a sweater for 80 yuan and has 100 yuan. How much money is left?', ['20 yuan.', '30 yuan.', '180 yuan.'], 0, '用预算减去毛衣价格。', '100−80=20，购买后还剩 20 元。'),
      pair('把购物问题和正确的计算结果连起来。', [
        ['20 yuan + 5 yuan', '25 yuan'], ['16 yuan + 2 yuan', '18 yuan'], ['100 yuan − 60 yuan', '40 yuan'],
      ], '逐项列式，注意区分合计和剩余金额。', '三项计算依次是 25 元、18 元和 40 元。'),
      sortInto('把购买方案分到“在 30 元预算内”或“超过预算”。', ['预算内', '超过预算'], [
        { label: '一本 5 元练习本和一块 2 元橡皮', categoryIndex: 0 },
        { label: '一盒彩笔 16 元和一块橡皮 2 元', categoryIndex: 0 },
        { label: '毛衣 80 元', categoryIndex: 1 },
        { label: '汽车模型 30 元和练习本 5 元', categoryIndex: 1 },
      ], '先把每种方案的商品价格相加，再和 30 元比较。', '7 元和 18 元不超过预算；80 元和 35 元超过预算。'),
      choose('Which question asks for the total price of several items?', ['How much is it all together?', 'How old is the shop?', 'How many colours are there?'], 0, '找到询问“总共多少钱”的表达。', 'How much is it all together? 用来询问几件商品的总价。'),
      arrange('整理在商店完成一次购买的对话步骤。', ['顾客询问商品价格', '顾客说出想买的商品', '店员说明价格', '顾客确认购买并询问总价'], [1, 0, 2, 3], '从表达需求开始，再问价、听回答并确认购买。', '顾客先说需要，再询问价格；店员回答后，顾客确认购买并可询问总价。'),
    ])),
    task('读懂储蓄买小狗的故事', '根据 Peter 的目标价格、储蓄和劳动所得计算金额，并区分价格变化与最终购买结果。', 'companion-03', q8([
      choose('The brown puppy costs $35 at first. Peter has $25 at first. How much does the puppy cost?', ['$35.', '$25.', '$32.'], 0, '从题干给出的故事资料中找出小狗的标价。', '题干说小狗起初的价格是 35 美元。'),
      choose('The brown puppy costs $35 at first. Peter has $25 at first. How much money does Peter have?', ['$25.', '$35.', '$2.'], 0, '从题干给出的故事资料中找出 Peter 起初有多少钱。', '题干说 Peter 一开始有 25 美元。'),
      choose('Peter saves 2 dollars and earns 5 dollars by washing cars. How much does he have then?', ['$32.', '$30.', '$37.'], 0, '把 25、2 和 5 相加。', '25+2+5=32，因此他后来有 32 美元。'),
      choose('The puppy’s price drops to 32 dollars, but it is gone when Peter returns the next day. What happens when he returns?', ['The puppy is gone.', 'He buys two puppies.', 'The price goes back to 35 dollars.'], 0, '根据题干给出的故事结尾作答。', '虽然价格降到 32 美元，Peter 回去时小狗已经不在了。'),
      pair('把金额变化和故事信息连起来。', [
        ['$25', 'Peter 原来有的钱'], ['$2 + $5', '节省和洗车所得'], ['$32', '后来存到的钱，也是降价后的价格'],
      ], '把原有金额、增加的钱和新价格分清楚。', 'Peter 原有 25 美元，再增加 2 美元和 5 美元，合计 32 美元；降价后价格也为 32 美元。'),
      sortInto('把故事信息分到“帮助 Peter 接近目标”或“影响最终购买”。', ['接近目标', '影响最终购买'], [
        { label: '少买冰淇淋，留下 2 美元', categoryIndex: 0 }, { label: '洗车挣得 5 美元', categoryIndex: 0 },
        { label: '小狗降价到 32 美元', categoryIndex: 1 }, { label: 'Peter 回店时小狗已不在', categoryIndex: 1 },
      ], '区分存钱过程与返回商店时发生的事情。', '节省和劳动增加了存款；价格下降和小狗售出影响了他最终能否买到。'),
      choose('Peter has 32 dollars and the puppy costs 32 dollars. Before knowing it is gone, how much more money would he need?', ['$0.', '$2.', '$3.'], 0, '比较存款和降价后的价格。', '两者都是 32 美元，金额刚好相同，不需要再增加钱。'),
      arrange('整理 Peter 为目标攒钱的过程。', ['他先有 25 美元', '他省下 2 美元并通过洗车挣得 5 美元', '存款增加到 32 美元', '他第二天回去时发现小狗已经不在'], [0, 1, 2, 3], '按故事发生顺序排列已有的钱、增加的钱和结尾。', 'Peter 先有 25 美元，随后节省和劳动增加 7 美元，存款达到 32 美元，最后回店时小狗已不在。'),
    ])),
  ],
});
