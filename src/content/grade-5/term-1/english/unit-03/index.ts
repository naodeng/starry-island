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
      choose('Which pair are farm animals?', ['A horse and a cow.', 'A tiger and a panda.', 'A penguin and an elephant.'], 0, '找出常见的农场动物。', '马和奶牛是农场动物；老虎、熊猫、企鹅和大象不是这一组。'),
      choose('Mia 想表达“我想看熊猫”，她可以说哪一句？', ['I see a panda.', 'I want to see pandas.', 'I have a panda.'], 1, '选择表达愿望的句子。', 'I want to see ... 表示“我想看……”。'),
      choose('“I want to see pandas.” “Why?” 哪个回答给出了合理理由？', ['They are cute.', 'They are school bags.', 'They are at twelve o’clock.'], 0, '理由应当说出熊猫的特点。', 'cute 表示可爱的，可以说明想看熊猫的理由。'),
      pair('把动物和相符的特点连起来。', [
        ['elephant', 'big and tall'],
        ['panda', 'cute'],
        ['bee', 'small'],
      ], '把动物名称与它们的特点联系起来。', '大象很大、很高，熊猫很可爱，蜜蜂很小。'),
      sortInto('把动物按常见生活环境分到“农场”或“动物园”一组。', ['farm', 'zoo'], [
        { label: 'horse', categoryIndex: 0 }, { label: 'cow', categoryIndex: 0 },
        { label: 'tiger', categoryIndex: 1 }, { label: 'panda', categoryIndex: 1 },
      ], '用常见动物知识判断它们通常生活在哪里。', '马和奶牛在农场一组；老虎和熊猫在动物园一组。'),
      choose('Which sentence answers “What is your favourite animal?”', ['My favourite animal is a horse.', 'It is very tall.', 'I want to see the zoo.'], 0, '问题询问最喜欢的动物，回答要说出动物。', 'My favourite animal is ... 表示“我最喜欢的动物是……”。'),
      arrange('把词卡排成“我想看大象。”', ['elephants.', 'I', 'want', 'to', 'see'], [1, 2, 3, 4, 0], '先说“I”，再按 want to see 的顺序接上动物。', '句子是 I want to see elephants.。'),
    ])),
    questionTask('询问和介绍最喜欢的动物', '用 favourite animal、颜色、大小和能力等线索交流喜欢的动物，并读懂简单描述。', 'companion-02', q8([
      choose('Linda says, “My favourite animal is the elephant.” What is her favourite animal?', ['The elephant.', 'The cow.', 'The tiger.'], 0, '从 Linda 的话中找出她最喜欢的动物。', 'Linda 说她最喜欢的动物是大象。'),
      choose('Binbin says, “It is not a horse. My favourite animal is the bee.” What is his favourite animal?', ['A horse.', 'A bee.', 'A sheep.'], 1, '从 Binbin 的话中找出他最喜欢的动物。', 'Binbin 说他最喜欢的动物是蜜蜂。'),
      choose('Lily 的动物很多颜色，个子小，而且会飞。她最喜欢什么动物？', ['A butterfly.', 'An elephant.', 'A cow.'], 0, '综合颜色、大小和会飞三个线索。', '对话里的蝴蝶颜色多、个子小、会飞。'),
      pair('把问题和合适的回答连起来。', [
        ['What is your favourite animal?', 'My favourite animal is the bee.'],
        ['What colour is it?', 'It can be many colours.'],
        ['Can it fly?', 'Yes, it can.'],
      ], '看每个问题在询问动物、颜色还是能力。', '三组问答分别说出最喜欢的动物、颜色和会不会飞。'),
      choose('The animal card says, “A penguin cannot fly, but it can swim.” Which sentence repeats both facts?', ['It can fly high.', 'It cannot fly, but it can swim.', 'It lives in a tree.'], 1, '选择与题干资料一致的两条能力信息。', '题干说明企鹅不会飞，但会游泳。'),
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
      choose('The animal cards say a tiger lives in a forest and eats other animals. Which animal is described?', ['The tiger.', 'The panda.', 'The penguin.'], 0, '根据题干里的栖息地和食物线索判断。', '题干说老虎住在森林里，以其他动物为食。'),
      choose('The elephant card says elephants can live on grassland or in a forest. Where can an elephant live?', ['On the ice only.', 'On grassland or in a forest.', 'In a bamboo forest only.'], 1, '从题干给出的动物资料中找出两种栖息地。', '题干说大象可以生活在草原或森林。'),
      choose('The panda card says pandas live in bamboo forests and eat bamboo. What does a panda eat?', ['Bamboo.', 'Small fish.', 'Leaves and grass only.'], 0, '从题干给出的熊猫资料中找出食物。', '题干说熊猫生活在竹林并吃竹子。'),
      choose('An animal card says an animal is black and white, eats small fish and can swim. Which animal is it?', ['A penguin.', 'A tiger.', 'A bee.'], 0, '把题干里的颜色、食物和能力线索合起来。', '企鹅是黑白色，会吃小鱼，也会游泳。'),
      choose('The cards say tigers live in forests and elephants can also live in forests. Which statement is true about both?', ['They can both live in a forest.', 'They both eat only bamboo.', 'They both live on the ice.'], 0, '比较题干给出的两种动物栖息地资料。', '题干说明老虎生活在森林，大象也可以生活在森林。'),
      pair('The animal cards say tigers eat other animals, elephants eat leaves and grass, and penguins eat small fish. Match each animal with its food.', [
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
      choose('The baby cat’s profile says it is from Australia. Where is the baby cat from?', ['America.', 'Australia.', 'Qinghai.'], 1, '从题干给出的小猫资料中找出它的来源地。', '题干说小猫来自澳大利亚。'),
      choose('The baby dog’s profile says it is white with black ears and a black face. Which detail describes the dog?', ['It is white with black ears and a black face.', 'It is brown and black with big ears.', 'It has blue eyes and long legs.'], 0, '核对题干中小狗的颜色和脸部特点。', '题干说小狗是白色的，耳朵和脸是黑色的。'),
      choose('The baby dog’s profile says its legs are short but strong. What does it say about the dog’s legs?', ['They are short but strong.', 'They are long and weak.', 'They are blue and small.'], 0, '选择与题干资料一致的腿部描述。', '题干说小狗的腿不长，但很有力。'),
      choose('The baby dog’s and baby cat’s profiles both say they have big brown eyes. Which detail is the same for both?', ['They both have big brown eyes.', 'They are both from America.', 'They both eat bones.'], 0, '比较题干中两段资料的共同点。', '题干说两只动物都有大大的棕色眼睛。'),
      choose('The baby cat’s profile says it can climb trees and catch mice. What can it do?', ['Climb trees and catch mice.', 'Fly over the sea.', 'Make a model plane.'], 0, '从题干给出的小猫资料中找出它的能力。', '题干说小猫会爬树，也会抓老鼠。'),
      pair('The profiles say the baby dog is from America, the baby cat is from Australia, and both have big brown eyes. Match each animal or pair with the information.', [
        ['baby dog', 'from America'],
        ['baby cat', 'from Australia'],
        ['both animals', 'have big brown eyes'],
      ], '检查每条资料出现在哪一段，或是否两段都出现。', '小狗来自美国，小猫来自澳大利亚，两者都有大棕眼睛。'),
      sortInto('把资料分到“same”或“different”。', ['same', 'different'], [
        { label: 'Both have big brown eyes.', categoryIndex: 0 }, { label: 'One is from America and one is from Australia.', categoryIndex: 1 },
        { label: 'The cat can climb trees and catch mice.', categoryIndex: 1 }, { label: 'Both descriptions name an animal.', categoryIndex: 0 },
      ], 'same 是共同点；different 是只有一只动物具有的特点或不同资料。', '两只动物都有大棕眼睛，也都被介绍为动物；国家和小猫的能力不同。'),
      choose('The profiles say both animals have big brown eyes, but the dog is from America and the cat is from Australia. Which comparison uses information from both?', ['Both animals have big brown eyes.', 'Both animals are from Australia.', 'Both animals eat fish and milk.'], 0, '选择题干资料支持的比较。', '题干说两只动物都有大棕眼睛，但来源地不同。'),
    ])),
  ],
  highTasks: [
    questionTask('了解野生动物并读懂拼读词', '从资料中归纳动物濒危原因和保护方式，辨认 ou、ow 在单元词汇中的拼写。', 'companion-01', q8([
      choose('Fun Time says Tibetan antelopes live in very high places such as Qinghai. Where do they live?', ['In very high places such as Qinghai.', 'Only on the ice.', 'In the sea.'], 0, '从题干给出的资料中找栖息地线索。', '题干说藏羚羊生活在青海一类的高海拔地区。'),
      choose('Fun Time says snow leopards live high in the mountains. Where do they live?', ['High in the mountains.', 'In a city classroom.', 'On a farm.'], 0, '根据题干给出的资料选择雪豹的生活环境。', '题干说雪豹生活在高山上。'),
      choose('Fun Time says hunters kill Tibetan antelopes and snow leopards for their fur. Why are they in danger?', ['Hunters kill them for their fur.', 'They eat small fish.', 'They cannot swim.'], 0, '根据题干给出的资料找出濒危原因。', '题干说猎人为了它们的皮毛捕杀它们。'),
      choose('Fun Time describes both Tibetan antelopes and snow leopards as beautiful animals with fur. Which feature is true of both?', ['They are described as beautiful and have fur.', 'They both eat bamboo.', 'They both live on the ice.'], 0, '比较题干中两种动物的共同描述。', '题干说藏羚羊和雪豹都美丽并且有皮毛。'),
      choose('The unit’s message is “Animals are our friends. Let’s take care of them.” Which sentence follows this message?', ['Animals are our friends. Let’s take care of them.', 'Animals are toys. Let’s leave them in a classroom.', 'Animals are food. Let’s forget their homes.'], 0, '选择与题干中的保护动物倡议一致的话。', '题干倡议把动物当作朋友并照顾它们。'),
      choose('Which word has the same “ou” spelling as house?', ['mouse', 'food', 'tree'], 0, '比较 house 和选项中的字母组合。', 'house 和 mouse 都含有 ou，且该组合读音相同。'),
      choose('Which word completes “br__n” to make an animal colour word from Let’s Spell?', ['ou', 'ee', 'ow'], 2, '先认出单元拼读词 brown。', 'brown 的拼写是 b-r-o-w-n，空格处是 ow。'),
      sortInto('把句子分到“濒危信息”或“保护行动”。', ['danger information', 'care action'], [
        { label: 'Hunters kill wild animals for their fur.', categoryIndex: 0 }, { label: 'Many wild animals are in danger.', categoryIndex: 0 },
        { label: 'Treat animals as our friends.', categoryIndex: 1 }, { label: 'Take care of animals.', categoryIndex: 1 },
      ], '区分说明危险情况的句子和提出保护做法的句子。', '猎人捕杀和动物濒危说明危险；把动物当朋友并照顾动物是保护行动。'),
    ])),
    questionTask('复述动物故事并制作动物介绍', '按故事线索理解不同动物的优点与不足，选用有根据的信息完成简短动物介绍。', 'companion-03', q8([
      choose('In the story, Cat first says Elephant is her favourite because he is strong and clever. Which animal does Cat first say she likes?', ['Elephant.', 'Turtle.', 'Cow.'], 0, '根据题干给出的故事线索作答。', 'Cat 先说自己最喜欢大象，因为大象强壮又聪明。'),
      choose('In the story, Dog says no because Elephant is too big and heavy. Why does Dog reject Elephant?', ['Elephant is too big and heavy.', 'Elephant is too small.', 'Elephant cannot swim.'], 0, '根据题干给出的故事线索作答。', '小狗担心大象太大、太重。'),
      choose('In the story, Cat describes Butterfly as friendly and beautiful. What good qualities does Cat mention?', ['She is friendly and beautiful.', 'She is strong and very heavy.', 'She is slow and cannot play football.'], 0, '根据题干给出的故事线索找蝴蝶的优点。', 'Cat 说蝴蝶友好又美丽。'),
      choose('In the story, Dog says Butterfly is too small and that he likes playing with big animals. Why does he not choose Butterfly?', ['She is too small for the kind of friend Dog wants.', 'She lives on the ice.', 'She eats leaves and grass.'], 0, '根据题干给出的故事线索作答。', '小狗说蝴蝶太小，而它喜欢和大动物玩。'),
      choose('In the story, Dog says Turtle is too slow to play football. What does Dog say about Turtle and football?', ['Turtle is too slow to play football.', 'Turtle is too big to sit on.', 'Turtle can fly to the goal.'], 0, '根据题干给出的故事线索作答。', '小狗说乌龟太慢，不能和它踢足球。'),
      choose('At the end of the story, Cat tells Dog, “Think about animals’ good qualities, not only their bad ones.” What lesson does she give him?', ['Think about animals’ good qualities, not only their bad ones.', 'Choose a friend only by size.', 'Never play with animals.'], 0, '根据题干中猫的话找出故事的道理。', '猫提醒小狗要看到动物的优点，不要只看缺点。'),
      arrange('In the story, Cat first tells Dog about Elephant; Dog rejects Elephant as too big and heavy; Cat then suggests Butterfly; Dog rejects her as too small. Put the first four friendship events in order.', [
        'Dog says Elephant is too big and heavy.',
        'Cat tells Dog about Elephant.',
        'Cat suggests Butterfly as another friend.',
        'Dog says Butterfly is too small.',
      ], [1, 0, 2, 3], '先排第一次推荐，再排拒绝和下一次推荐。', '猫先推荐大象，小狗拒绝后，猫再推荐蝴蝶，小狗又以太小为由拒绝。'),
      choose('Which plan gives a useful animal-book introduction?', ['Name the animal and tell where it lives, what it eats, and what it is like.', 'Write only “I like animals” without naming one.', 'Guess facts that are not in the notes.'], 0, '动物介绍需要有清楚对象和相关资料。', '第一种计划说清动物，并用栖息地、食物和特点介绍它。'),
    ])),
  ],
});
