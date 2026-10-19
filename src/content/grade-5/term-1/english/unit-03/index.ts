import { buildEnglishUnit } from '../../../../grade-2/term-1/english/buildEnglishUnit';
import { arrange, choose, pair, q8, sortInto } from '../../../../grade-2/term-1/english/questionAuthoring';
import type { EightEnglishQuestions, EnglishTaskSpec } from '../../../../grade-2/term-1/english/questionAuthoring';

// 核对固定 TapX 快照：英语五年级上册目录 PDF 第6页；U3 印刷页26–37（PDF页31–42）。
function questionTask(
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
  formalUnitNumber: 3,
  entryId: 'unit-03',
  title: 'Unit 3 · Animals',
  sourceTopics: [
    '询问想看的动物及理由：What animals do you want to see? I want to see ... They are ...',
    '询问和介绍最喜欢的动物，结合大小、颜色和能力线索猜动物；What is your favourite animal? Can it fly?',
    '阅读老虎、大象、熊猫和企鹅的原创信息卡，提取栖息地、食物、外形及能力信息',
    '用一般现在时介绍动物的栖息地、食物和外形：It lives ... It eats ... It is ... It has ...',
    '比较小狗和小猫的来源、颜色、外形、食物及能力，区分相同信息与各自动物特点',
    'Let’s Spell：辨认 out、cloudy、ground、mouse、house、cow、down、brown、owl、bow 中的 ou、ow 拼写与读音',
    'Fun Time：了解藏羚羊和雪豹的栖息地、外形、食物及濒危原因，理解保护动物的倡议',
    'Story Time：按顺序理解小狗、猫、大象、蝴蝶和乌龟的交友故事，关注动物的优点并综合介绍喜欢的动物',
  ],
  basicTasks: [
    questionTask('认读动物名称并表达想看什么', '认读常见动物词汇，用 want to see 表达想看的动物，并用简单特点说明理由。', 'companion-01', q8([
      choose('Which animal has a long trunk?', ['A bee.', 'An elephant.', 'A sheep.'], 1, '找一找哪种动物有长鼻子。', '大象有长鼻子；蜜蜂和绵羊没有。'),
      choose('Which pair is shown as farm animals in this unit?', ['A horse and a cow.', 'A tiger and a panda.', 'A penguin and an elephant.'], 0, '回想农场和动物园里的动物分类。', '教材把马和奶牛列在农场动物一组。'),
      choose('Mia 想表达“我想看熊猫”，她可以说哪一句？', ['I see a panda.', 'I want to see pandas.', 'I have a panda.'], 1, '选择表达愿望的句子。', 'I want to see ... 表示“我想看……”。'),
      choose('“I want to see pandas.” “Why?” 哪个回答给出了合理理由？', ['They are cute.', 'They are school bags.', 'They are at twelve o’clock.'], 0, '理由应当说出熊猫的特点。', 'cute 表示可爱的，可以说明想看熊猫的理由。'),
      pair('把动物和相符的特点连起来。', [
        ['elephant', 'big and tall'],
        ['panda', 'cute'],
        ['bee', 'small'],
      ], '回忆课本对话中的动物描述词。', '大象很大、很高，熊猫很可爱，猜谜中的蝴蝶很小。'),
      sortInto('把动物放到“农场”或“动物园”一组。', ['farm', 'zoo'], [
        { label: 'horse', categoryIndex: 0 }, { label: 'cow', categoryIndex: 0 },
        { label: 'tiger', categoryIndex: 1 }, { label: 'panda', categoryIndex: 1 },
      ], '依据单元中的农场和动物园对话分类。', '马和奶牛在农场一组；老虎和熊猫在动物园一组。'),
      choose('Which sentence answers “What is your favourite animal?”', ['My favourite animal is a horse.', 'It is very tall.', 'I want to see the zoo.'], 0, '问题询问最喜欢的动物，回答要说出动物。', 'My favourite animal is ... 表示“我最喜欢的动物是……”。'),
      arrange('把词卡排成“我想看大象。”', ['elephants.', 'I', 'want', 'to', 'see'], [1, 2, 3, 4, 0], '先说“I”，再按 want to see 的顺序接上动物。', '句子是 I want to see elephants.。'),
    ])),
    questionTask('询问和介绍最喜欢的动物', '用 favourite animal、颜色、大小和能力等线索交流喜欢的动物，并读懂简单描述。', 'companion-02', q8([
      choose('What is Linda’s favourite animal?', ['The elephant.', 'The cow.', 'The tiger.'], 0, '阅读 Linda 和 Binbin 猜动物的对话。', 'Linda 说她最喜欢的动物是大象。'),
      choose('What is Binbin’s favourite animal?', ['A horse.', 'A bee.', 'A sheep.'], 1, '注意 Binbin 否认马之后说了什么。', 'Binbin 最喜欢的动物是蜜蜂。'),
      choose('Lily 的动物很多颜色，个子小，而且会飞。她最喜欢什么动物？', ['A butterfly.', 'An elephant.', 'A cow.'], 0, '综合颜色、大小和会飞三个线索。', '对话里的蝴蝶颜色多、个子小、会飞。'),
      pair('把问题和合适的回答连起来。', [
        ['What is your favourite animal?', 'My favourite animal is the bee.'],
        ['What colour is it?', 'It can be many colours.'],
        ['Can it fly?', 'Yes, it can.'],
      ], '看每个问题在询问动物、颜色还是能力。', '三组问答分别说出最喜欢的动物、颜色和会不会飞。'),
      choose('A penguin is a bird. Which sentence about it is supported by the reading?', ['It can fly high.', 'It cannot fly, but it can swim.', 'It lives in a tree.'], 1, '选择阅读中关于企鹅能力的两条信息。', '单元短文说企鹅不会飞，但会游泳。'),
      choose('Choose the correct answer: “What’s your favourite animal?”', ['My favourite animal is the panda.', 'I favourite animals panda.', 'It favourite is panda.'], 0, '选择语序和表达都完整的回答。', 'My favourite animal is the panda. 语序和表达完整。'),
      sortInto('把信息分到“最喜欢的动物”或“外形特点”。', ['favourite animal', 'appearance'], [
        { label: 'My favourite animal is a horse.', categoryIndex: 0 }, { label: 'I want to see tigers.', categoryIndex: 0 },
        { label: 'It is black and white.', categoryIndex: 1 }, { label: 'It is big and tall.', categoryIndex: 1 },
      ], '有些句子说喜欢什么，有些句子说动物长什么样。', '前两句表达偏好；黑白颜色和大小描述动物外形。'),
      arrange('把词卡排成“你最喜欢什么动物？”', ['animal?', 'What', 'your', 'is', 'favourite'], [1, 3, 2, 4, 0], '疑问词开头，接 is 和 your favourite animal。', '句子是 What is your favourite animal?。'),
    ])),
  ],
  advancedTasks: [
    questionTask('从动物信息中找依据', '阅读老虎、大象、熊猫和企鹅的信息，正确提取栖息地、食物、外形与能力。', 'companion-03', q8([
      choose('Which animal lives in the forest and eats other animals?', ['The tiger.', 'The panda.', 'The penguin.'], 0, '从栖息地和食物两条线索一起判断。', '短文说老虎住在森林里，以其他动物为食。'),
      choose('Where can an elephant live according to the reading?', ['On the ice only.', 'On grassland or in a forest.', 'In a bamboo forest only.'], 1, '注意大象栖息地给出了两种环境。', '短文说大象可以生活在草原或森林。'),
      choose('What does a panda eat in the unit’s reading?', ['Bamboo.', 'Small fish.', 'Leaves and grass only.'], 0, '选择熊猫信息卡中的食物。', '短文说熊猫生活在竹林并吃竹子。'),
      choose('Which animal is black and white, eats small fish and can swim?', ['A penguin.', 'A tiger.', 'A bee.'], 0, '把颜色、食物和能力三条线索合起来。', '企鹅是黑白色，会吃小鱼，也会游泳。'),
      choose('Which statement is true about both a tiger and an elephant?', ['They can both live in a forest.', 'They both eat only bamboo.', 'They both live on the ice.'], 0, '比较两种动物的栖息地资料。', '老虎生活在森林；大象也可以生活在森林。'),
      pair('把动物和阅读中的食物连起来。', [
        ['tiger', 'other animals'],
        ['elephant', 'leaves and grass'],
        ['penguin', 'small fish'],
      ], '用短文中直接提供的食物信息配对。', '老虎吃其他动物，大象吃树叶和草，企鹅吃小鱼。'),
      sortInto('把信息分到“home”或“food”。', ['home', 'food'], [
        { label: 'forest', categoryIndex: 0 }, { label: 'on the ice', categoryIndex: 0 },
        { label: 'bamboo', categoryIndex: 1 }, { label: 'small fish', categoryIndex: 1 },
      ], '栖息地回答住在哪里，食物回答吃什么。', '森林和冰面是栖息地；竹子和小鱼是食物。'),
      arrange('按清楚的顺序整理一段企鹅介绍。', [
        'It eats small fish.',
        'This is a penguin.',
        'It lives on the ice.',
        'It is black and white.',
      ], [1, 2, 0, 3], '先介绍动物，再依次说栖息地、食物和外形。', '介绍先说是企鹅，再介绍冰面栖息地、小鱼食物和黑白外形。'),
    ])),
    questionTask('比较小狗和小猫的资料', '从两段动物介绍中提取国家、颜色、外形、食物和能力，说明共同点与不同点。', 'companion-04', q8([
      choose('Where is the baby cat from?', ['America.', 'Australia.', 'Qinghai.'], 1, '在小猫介绍开头找它来自哪里。', '小猫的介绍说它来自澳大利亚。'),
      choose('Which detail describes the baby dog?', ['It is white with black ears and a black face.', 'It is brown and black with big ears.', 'It has blue eyes and long legs.'], 0, '辨认小狗介绍中的颜色和脸部特点。', '小狗是白色的，耳朵和脸是黑色的。'),
      choose('What does the reading say about the baby dog’s legs?', ['They are short but strong.', 'They are long and weak.', 'They are blue and small.'], 0, '选择介绍中对小狗腿的描述。', '小狗的腿不长，但很有力。'),
      choose('Which detail is the same for the baby dog and the baby cat?', ['They both have big brown eyes.', 'They are both from America.', 'They both eat bones.'], 0, '对照两段介绍中重复出现的信息。', '两段都提到动物有大大的棕色眼睛。'),
      choose('What can the baby cat do?', ['Climb trees and catch mice.', 'Fly over the sea.', 'Make a model plane.'], 0, '找到小猫介绍中的能力。', '小猫会爬树，也会抓老鼠。'),
      pair('把动物和资料连起来。', [
        ['baby dog', 'from America'],
        ['baby cat', 'from Australia'],
        ['both animals', 'have big brown eyes'],
      ], '检查每条资料出现在哪一段，或是否两段都出现。', '小狗来自美国，小猫来自澳大利亚，两者都有大棕眼睛。'),
      sortInto('把资料分到“same”或“different”。', ['same', 'different'], [
        { label: 'Both have big brown eyes.', categoryIndex: 0 }, { label: 'One is from America and one is from Australia.', categoryIndex: 1 },
        { label: 'The cat can climb trees and catch mice.', categoryIndex: 1 }, { label: 'Both descriptions name an animal.', categoryIndex: 0 },
      ], 'same 是共同点；different 是只有一只动物具有的特点或不同资料。', '两只动物都有大棕眼睛，也都被介绍为动物；国家和小猫的能力不同。'),
      choose('Which comparison uses information from both animal descriptions?', ['Both animals have big brown eyes.', 'Both animals are from Australia.', 'Both animals eat fish and milk.'], 0, '选择两段介绍都能支持的比较。', '两段都说小狗和小猫有大棕眼睛。'),
    ])),
  ],
  highTasks: [
    questionTask('了解野生动物并读懂拼读词', '从资料中归纳动物濒危原因和保护方式，辨认 ou、ow 在单元词汇中的拼写。', 'companion-01', q8([
      choose('Where do Tibetan antelopes live according to Fun Time?', ['In very high places such as Qinghai.', 'Only on the ice.', 'In the sea.'], 0, '从藏羚羊的信息中找栖息地线索。', '短文说藏羚羊生活在青海一类的高海拔地区。'),
      choose('Where do snow leopards live?', ['High in the mountains.', 'In a city classroom.', 'On a farm.'], 0, '根据雪豹信息选择它们生活的环境。', '短文说雪豹生活在高山上。'),
      choose('Why are Tibetan antelopes and snow leopards in danger?', ['Hunters kill them for their fur.', 'They eat small fish.', 'They cannot swim.'], 0, '找出 Fun Time 明确说明的濒危原因。', '短文说猎人为了漂亮的皮毛捕杀它们。'),
      choose('Which feature is true of both animals in Fun Time?', ['They are described as beautiful and have fur.', 'They both eat bamboo.', 'They both live on the ice.'], 0, '比较两种动物介绍里都出现的描述。', '藏羚羊和雪豹都被描述为美丽的动物，也都提到了皮毛。'),
      choose('Which sentence follows the unit’s message about animals?', ['Animals are our friends. Let’s take care of them.', 'Animals are toys. Let’s leave them in a classroom.', 'Animals are food. Let’s forget their homes.'], 0, '选择和保护动物倡议一致的话。', '单元倡议把动物当作朋友并照顾它们。'),
      choose('Which word has the same “ou” spelling as house?', ['mouse', 'food', 'tree'], 0, '比较 house 和选项中的字母组合。', 'house 和 mouse 都含有 ou，且该组合读音相同。'),
      choose('Which word completes “br__n” to make an animal colour word from Let’s Spell?', ['ou', 'ee', 'ow'], 2, '先认出单元拼读词 brown。', 'brown 的拼写是 b-r-o-w-n，空格处是 ow。'),
      sortInto('把句子分到“濒危信息”或“保护行动”。', ['danger information', 'care action'], [
        { label: 'Hunters kill wild animals for their fur.', categoryIndex: 0 }, { label: 'Many wild animals are in danger.', categoryIndex: 0 },
        { label: 'Treat animals as our friends.', categoryIndex: 1 }, { label: 'Take care of animals.', categoryIndex: 1 },
      ], '区分说明危险情况的句子和提出保护做法的句子。', '猎人捕杀和动物濒危说明危险；把动物当朋友并照顾动物是保护行动。'),
    ])),
    questionTask('复述动物故事并制作动物介绍', '按故事线索理解不同动物的优点与不足，选用有根据的信息完成简短动物介绍。', 'companion-03', q8([
      choose('Which animal does Cat first say is a favourite animal?', ['Elephant.', 'Turtle.', 'Cow.'], 0, '回想 Cat 第一次推荐给 Dog 的动物。', 'Cat 先说自己最喜欢大象，因为大象强壮又聪明。'),
      choose('Why does Dog say no to Elephant?', ['Elephant is too big and heavy.', 'Elephant is too small.', 'Elephant cannot swim.'], 0, '根据小狗的回答找它拒绝大象的理由。', '小狗担心大象太大、太重。'),
      choose('What good qualities does Cat mention about Butterfly?', ['She is friendly and beautiful.', 'She is strong and very heavy.', 'She is slow and cannot play football.'], 0, '从猫推荐蝴蝶时的话里找优点。', '猫说蝴蝶友好又美丽。'),
      choose('Why does Dog not choose Butterfly?', ['She is too small for the kind of friend Dog wants.', 'She lives on the ice.', 'She eats leaves and grass.'], 0, '小狗更喜欢什么样的玩伴？', '小狗说蝴蝶太小，而它喜欢和大动物玩。'),
      choose('What does Dog say about Turtle and football?', ['Turtle is too slow to play football.', 'Turtle is too big to sit on.', 'Turtle can fly to the goal.'], 0, '回忆小狗拒绝乌龟时提到的活动。', '小狗说乌龟太慢，不能和它踢足球。'),
      choose('What lesson does Cat give Dog?', ['Think about animals’ good qualities, not only their bad ones.', 'Choose a friend only by size.', 'Never play with animals.'], 0, '留意故事结尾猫提醒小狗的话。', '猫提醒小狗要看到动物的优点，不要只看缺点。'),
      arrange('按故事顺序排列前四个交友线索。', [
        'Dog says Elephant is too big and heavy.',
        'Cat tells Dog about Elephant.',
        'Cat suggests Butterfly as another friend.',
        'Dog says Butterfly is too small.',
      ], [1, 0, 2, 3], '先排第一次推荐，再排拒绝和下一次推荐。', '猫先推荐大象，小狗拒绝后，猫再推荐蝴蝶，小狗又以太小为由拒绝。'),
      choose('Which plan gives a useful animal-book introduction?', ['Name the animal and tell where it lives, what it eats, and what it is like.', 'Write only “I like animals” without naming one.', 'Guess facts that are not in the notes.'], 0, '动物介绍需要有清楚对象和相关资料。', '第一种计划说清动物，并用栖息地、食物和特点介绍它。'),
    ])),
  ],
});
