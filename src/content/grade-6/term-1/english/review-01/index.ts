import { buildEnglishUnit } from '../../../../grade-2/term-1/english/buildEnglishUnit';
import { arrange, choose, lessonProfile, makeTask, pair, phraseQuestion, q8, sortInto } from '../../../../grade-2/term-1/english/questionAuthoring';
import type { EightEnglishQuestions, EnglishTaskSpec } from '../../../../grade-2/term-1/english/questionAuthoring';

// Revision 1 复习 U1–U3 的中国景点、世界城市和动物类别；例句与便笺为原创。
const profile1 = lessonProfile(
  [
    { word: 'morning tea', meaning: '早茶' }, { word: 'the Potala Palace', meaning: '布达拉宫' },
    { word: 'London', meaning: '伦敦' }, { word: 'the CN Tower', meaning: '加拿大国家电视塔' },
  ],
  [
    phraseQuestion('你不明白短语 “morning tea” 的意思，哪句可以请同伴解释？', ['What does “morning tea” mean?', 'Where is “morning tea”?', 'How are you?'], 0, '先说清你想询问短语的意思。 What does “morning tea” mean? 是完整、语序正确的词义问句。'),
    phraseQuestion('朋友问：How do you say ‘the CN Tower’ in Chinese? 哪个中文名称正确？', ['布达拉宫', '伦敦', '加拿大国家电视塔'], 2, '回答名称时要核对英文地标和中文名称是否匹配。 the CN Tower 对应“加拿大国家电视塔”。'),
  ],
  ['中国地点和饮食', '动物类别和名称'],
  [
    { label: 'morning tea', categoryIndex: 0 }, { label: 'the Potala Palace', categoryIndex: 0 },
    { label: 'reptile', categoryIndex: 1 }, { label: 'bird', categoryIndex: 1 },
  ],
  { prompt: '把词卡排成“我想学会这个表达”。', items: ['phrase', 'this', 'learn', 'I', 'would', 'like', 'to', '.'], correctOrderIndices: [3, 4, 5, 6, 2, 1, 0, 7] },
);

function customTask(title: string, objective: string, companionId: EnglishTaskSpec['companionId'], questions: EightEnglishQuestions): EnglishTaskSpec {
  return { title, objective, companionId, questions };
}

const basicTask2 = customTask(
  '读懂动物类别和简单描述',
  '认读常见动物类别与名称，依据题面给出的分类信息判断词义和句子。',
  'companion-02',
  q8([
    choose('What does “mammal” mean?', ['哺乳动物', '爬行动物', '长江'], 0, '先读目标词，再核对它表示的动物类别。', 'mammal 表示“哺乳动物”。'),
    choose('An animal card says, “A penguin is a bird.” Which group is the penguin in?', ['A mammal.', 'A bird.', 'A reptile.'], 1, '根据卡片给出的分类信息作答。', '卡片明确说 penguin is a bird。'),
    pair('把动物词语和对应的类别或意思连起来。', [
      ['reptile', '爬行动物'], ['mammal', '哺乳动物'], ['penguin', '企鹅'],
    ], '逐组核对英文词语和中文意思。', 'reptile 是爬行动物，mammal 是哺乳动物，penguin 是企鹅。'),
    choose('A fact card says, “A whale is a mammal.” What kind of animal is a whale?', ['A reptile.', 'A bird.', 'A mammal.'], 2, '找出事实卡中 whale 对应的类别。', '事实卡说明 whale 属于 mammal。'),
    choose('Which sentence correctly says that penguins are birds?', ['Penguins is birds.', 'Penguins are birds.', 'Penguin are a bird.'], 1, '检查复数主语 penguins 对应的 be 动词。', '复数 penguins 使用 are；“Penguins are birds.” 语法正确。'),
    choose('The class card says “whale — 哺乳动物.” Which pair copies it correctly?', ['whale — bird', 'whale — mammal', 'whale — reptile'], 1, '核对动物名称和类别是否一致。', 'whale 对应 mammal（哺乳动物）。'),
    sortInto('把词语分到“动物类别”或“动物名称、身体部位”。', ['动物类别', '动物名称、身体部位'], [
      { label: 'mammal', categoryIndex: 0 }, { label: 'reptile', categoryIndex: 0 },
      { label: 'whale', categoryIndex: 1 }, { label: 'tusk', categoryIndex: 1 },
    ], '类别概括动物类型；名称或身体部位指具体对象。', 'mammal 和 reptile 是动物类别；whale 是动物，tusk 是身体部位。'),
    arrange('把词卡排成“鲸是哺乳动物”。', ['mammal.', 'a', 'is', 'whale', 'A'], [4, 3, 2, 1, 0], '先找主语，再放 be 动词和类别。', '完整句子是 “A whale is a mammal.”'),
  ]),
);

const advancedTask1 = customTask(
  '在对话中交流景点和动物信息',
  '结合问答目的和题面事实卡，选择自然的旅行问答和动物类别表达。',
  'companion-03',
  q8([
    choose('A: “Where did you go on your trip?” B: “___” Which answer fits?', ['I went to London.', 'I go to London tomorrow.', 'I am go to London.'], 0, '问题询问已经完成的旅行地点。', 'I went to London. 用过去式回答了去过的地点。'),
    choose('A: “What did you see in Toronto?” B: “___” Which answer fits?', ['I saw the CN Tower.', 'I see the CN Tower yesterday.', 'I am see a reptile.'], 0, '问题询问在多伦多看到的景点。', 'I saw the CN Tower. 用过去式回答看到了什么。'),
    pair('把关于景点或动物的问句和合适回答连起来。', [
      ['Where did you go?', 'I went to London.'],
      ['What did you see in Toronto?', 'I saw the CN Tower.'],
      ['What kind of animal is a whale?', 'A whale is a mammal.'],
    ], '判断问句询问地点、景点还是动物类别。', '地点、景点和动物类别分别对应伦敦、加拿大国家电视塔和哺乳动物。'),
    choose('Which question asks about an animal’s group?', ['What kind of animal is a whale?', 'Where is London?', 'What did you eat?'], 0, '选择询问动物类别的问题。', 'What kind of animal is a whale? 询问鲸属于哪类动物。'),
    choose('A card says, “A penguin is a mammal.” Which sentence corrects the animal group?', ['A penguin is a bird.', 'A penguin is a reptile.', 'A penguin is a city.'], 0, '根据学过的动物类别核对 penguin。', '企鹅属于鸟类；A penguin is a bird. 更正了卡片。'),
    choose('The fact card says, “A whale is a mammal.” Which sentence reports it correctly?', ['A whale is a reptile.', 'A whale is a mammal.', 'A whale is a bird.'], 1, '在选项中找到与事实卡一致的类别。', '鲸是哺乳动物，与事实卡一致。'),
    sortInto('把句子分到“提问”或“回答”。', ['提问', '回答'], [
      { label: 'Where did you go?', categoryIndex: 0 }, { label: 'What kind of animal is a whale?', categoryIndex: 0 },
      { label: 'I went to London.', categoryIndex: 1 }, { label: 'A whale is a mammal.', categoryIndex: 1 },
    ], '问句询问信息；回答提供地点或类别。', '前两句在提问，后两句提供旅行地点和动物类别。'),
    arrange('按询问旅行地点、回答地点、询问动物、回答类别的顺序整理对话。', [
      'Where did you go?', 'I went to London.', 'What kind of animal is a whale?', 'A whale is a mammal.',
    ], [0, 1, 2, 3], '先谈旅行地点，再交流动物类别。', '对话先问去哪里，再询问鲸的动物类别。'),
  ]),
);

const advancedTask2 = customTask(
  '阅读地点与动物资料并准确转述',
  '从题面提供的原创资料卡提取地点和动物类别，只报告材料明确支持的信息。',
  'companion-04',
  q8([
    choose('A class fact card says: “The Potala Palace is in Lhasa. The CN Tower is in Toronto.” Where is the CN Tower?', ['In Lhasa.', 'In Toronto.', 'In London.'], 1, '在事实卡中找 CN Tower 对应的城市。', '资料卡说加拿大国家电视塔在多伦多。'),
    choose('An animal card says: “A penguin is a bird. A whale is a mammal.” What kind of animal is a whale?', ['A bird.', 'A mammal.', 'A reptile.'], 1, '把 whale 和卡片中的动物类别对应起来。', '资料卡将 whale 列为 mammal。'),
    pair('资料卡写着：Potala Palace—Lhasa；CN Tower—Toronto；whale—mammal。把对象和卡片中的信息连起来。', [
      ['the Potala Palace', 'Lhasa'], ['the CN Tower', 'Toronto'], ['whale', 'mammal'],
    ], '根据资料卡逐项查找对应信息。', '布达拉宫对应拉萨，CN Tower 对应多伦多，whale 对应 mammal。'),
    choose('According to the class card, where is the Potala Palace?', ['In Lhasa.', 'In Toronto.', 'In London.'], 0, '回到题面资料卡找布达拉宫的位置。', '资料卡说布达拉宫在拉萨。'),
    choose('A class display lists “London—city in the UK; Yangtze River—China; penguin—bird.” Which summary matches the display?', ['London is a city in the UK, the Yangtze River is in China, and a penguin is a bird.', 'London is in China, the Yangtze River is in the UK, and a penguin is a mammal.', 'London is an animal, the Yangtze River is a city, and a penguin is a reptile.'], 0, '逐项核对城市、河流和动物类别。', '第一项分别保留了资料卡中的城市、河流和动物类别信息。'),
    sortInto('资料卡写着：“London—city in the UK; Yangtze River—China; penguin—bird; whale—mammal.”把信息分到“卡片提到”或“卡片未提到”。', ['卡片提到', '卡片未提到'], [
      { label: 'London is a city in the UK.', categoryIndex: 0 }, { label: 'A whale is a mammal.', categoryIndex: 0 },
      { label: 'The Yangtze River is in Canada.', categoryIndex: 1 }, { label: 'A penguin is a reptile.', categoryIndex: 1 },
    ], '只依据这张卡片，不要用没有写出的地点或类别替换原信息。', '伦敦、鲸和哺乳动物都在卡片中；加拿大和爬行动物不符合卡片内容。'),
    choose('The card says “the Yangtze River—China.” What can you report?', ['The Yangtze River is in China.', 'The Yangtze River is in Canada.', 'The Yangtze River is in London.'], 0, '只转述题面卡片明确写出的地点。', '卡片把 Yangtze River 和 China 配在一起。'),
    arrange('按核对课堂资料卡的步骤排序。', [
      'First, read the place and animal names.',
      'Next, find each matching fact on the source card.',
      'Then, check the English name and information together.',
      'Finally, share only facts the card supports.',
    ], [0, 1, 2, 3], '先读对象，再查证、核对，最后分享有依据的信息。', '步骤依次是读名称、查对应事实、核对信息、分享有依据的内容。'),
  ]),
);

const highTask1 = customTask(
  '按展板要求核对地点与动物资料',
  '综合两个分类与对应关系要求，比较展板方案并找出全部符合条件的记录。',
  'companion-01',
  q8([
    choose('A display needs a Chinese landmark matched with its city, and an animal matched with its group. Which pair meets both requirements?', ['The Potala Palace—Lhasa; whale—mammal.', 'The Potala Palace—Toronto; whale—bird.', 'The CN Tower—Lhasa; penguin—mammal.'], 0, '同时核对地标与城市、动物与类别两组关系。', '第一项的布达拉宫和拉萨、鲸和哺乳动物都正确配对。'),
    choose('The display must include the CN Tower in Toronto and a penguin classified as a bird. Which line meets both conditions?', ['CN Tower—Toronto; penguin—bird.', 'CN Tower—London; penguin—bird.', 'CN Tower—Toronto; penguin—mammal.'], 0, '分别检查地标地点和企鹅类别。', '第一项同时符合 CN Tower 位于多伦多、企鹅属于鸟类。'),
    choose('A research card must include a Chinese landmark in Lhasa, a Canadian landmark in Toronto, and a mammal. Which set meets all three requirements?', ['Potala Palace—Lhasa; CN Tower—Toronto; whale—mammal.', 'Potala Palace—London; CN Tower—Toronto; penguin—mammal.', 'Potala Palace—Lhasa; CN Tower—Lhasa; reptile—bird.'], 0, '逐项核对两处地点和动物类别。', '只有第一项的景点位置和动物类别都准确。'),
    pair('把展板要求和符合的条目连起来。', [
      ['布达拉宫所在城市', 'Lhasa'], ['CN Tower 所在城市', 'Toronto'], ['鲸的动物类别', 'mammal'],
    ], '逐项核对地标或动物与对应信息。', '布达拉宫在拉萨，CN Tower 在多伦多，鲸属于哺乳动物。'),
    choose('A display must show the Potala Palace in Lhasa and a whale as a mammal. Which line meets both requirements?', ['Potala Palace—Lhasa; whale—mammal.', 'Potala Palace—Toronto; whale—mammal.', 'Potala Palace—Lhasa; whale—reptile.'], 0, '同时核对景点地点和动物类别。', '第一项没有把任何一个地点或类别配错。'),
    choose('The display also needs London as a city in the UK and the Yangtze River in China. Which record satisfies both?', ['London—city in the UK; Yangtze River—China.', 'London—city in Canada; Yangtze River—China.', 'London—city in the UK; Yangtze River—Canada.'], 0, '分别核对城市所在国家和河流所在国家。', '第一项同时保留了伦敦和长江对应的地点信息。'),
    sortInto('展板要求是“地标地点准确，动物类别准确”。把条目分到“符合要求”或“至少一项不符”。', ['符合要求', '至少一项不符'], [
      { label: 'Potala Palace—Lhasa; whale—mammal.', categoryIndex: 0 },
      { label: 'CN Tower—Toronto; penguin—bird.', categoryIndex: 0 },
      { label: 'Potala Palace—Toronto; whale—mammal.', categoryIndex: 1 },
      { label: 'CN Tower—Toronto; penguin—mammal.', categoryIndex: 1 },
    ], '分开检查每一条的地点和动物类别。', '前两项的地点、类别均正确；后两项各有一处错配。'),
    arrange('按完成展板事实核查的顺序整理步骤。', [
      'First, list the places and animal names.',
      'Next, check each place against its city or country.',
      'Then, check each animal against its group.',
      'Finally, share the display after both checks are complete.',
    ], [0, 1, 2, 3], '先列对象，再分别核对地点和动物类别。', '先列出名称，核对地点，核对类别，最后分享展板。'),
  ]),
);

const highTask2 = customTask(
  '校对资料卡并保留有依据的信息',
  '综合地点和动物类别资料，找出并更正错误记录，同时保留已经核对正确的内容。',
  'companion-02',
  q8([
    choose('A source card says: “The Potala Palace is in Lhasa. The CN Tower is in Toronto. A penguin is a bird.” Which statement reports a fact correctly?', ['The Potala Palace is in Lhasa.', 'The CN Tower is in London.', 'A penguin is a mammal.'], 0, '从题面资料卡核对地点和类别。', '第一项准确保留布达拉宫在拉萨这一信息。'),
    choose('The same source card says the CN Tower is in Toronto and a penguin is a bird. Which two facts match it?', ['CN Tower—Toronto; penguin—bird.', 'CN Tower—Lhasa; penguin—bird.', 'CN Tower—Toronto; penguin—reptile.'], 0, '分别核对 CN Tower 的城市和企鹅的类别。', '第一项的两条信息都与题面资料卡一致。'),
    choose('A student wrote, “A penguin is a mammal.” Which correction matches the animal fact card?', ['A penguin is a bird.', 'A penguin is a reptile.', 'A penguin is a city.'], 0, '根据事实卡更正企鹅的动物类别。', '企鹅是鸟类。'),
    pair('资料卡写着：London—UK；Yangtze River—China；whale—mammal。把名称和资料卡中的信息连起来。', [
      ['London', 'UK'], ['Yangtze River', 'China'], ['whale', 'mammal'],
    ], '按资料卡逐项核对。', '伦敦对应英国，长江对应中国，鲸对应哺乳动物。'),
    choose('A fact card says: “London is in the UK. The Yangtze River is in China. A whale is a mammal.” Which summary keeps all three facts correct?', ['London—UK; Yangtze River—China; whale—mammal.', 'London—China; Yangtze River—UK; whale—bird.', 'London—UK; Yangtze River—Canada; whale—reptile.'], 0, '分别核对城市、河流和动物类别三项信息。', '第一项三组关系都与资料卡一致。'),
    choose('A note says, “The Potala Palace is in Toronto.” The source card says it is in Lhasa. Which edit fixes the place and keeps the landmark?', ['The Potala Palace is in Lhasa.', 'The Potala Palace is in London.', 'The CN Tower is in Lhasa.'], 0, '只改正地标所在城市，并保留原地标名称。', '资料卡说布达拉宫在拉萨，因此应把 Toronto 改为 Lhasa。'),
    sortInto('把陈述分到“与资料卡一致”或“与资料卡不一致”。资料卡写着：Potala Palace—Lhasa；CN Tower—Toronto；whale—mammal；penguin—bird。', ['与资料卡一致', '与资料卡不一致'], [
      { label: 'The CN Tower is in Toronto.', categoryIndex: 0 }, { label: 'A whale is a mammal.', categoryIndex: 0 },
      { label: 'The Potala Palace is in London.', categoryIndex: 1 }, { label: 'A penguin is a reptile.', categoryIndex: 1 },
    ], '只依据资料卡中的四条信息判断。', '多伦多和鲸的类别符合资料卡；伦敦和爬行动物与对应条目不符。'),
    arrange('按校对后分享地点与动物资料的顺序整理步骤。', [
      'First, read the source card carefully.',
      'Next, compare each copied fact with the source.',
      'Then, correct any place or animal mismatch.',
      'Finally, share the checked information.',
    ], [0, 1, 2, 3], '先读来源，再逐项对照、修改，最后分享。', '校对顺序是读来源、比较信息、改正错配、分享核对后的内容。'),
  ]),
);

export const unit = buildEnglishUnit({
  grade: 6,
  term: 1,
  formalUnitNumber: null,
  entryId: 'review-01',
  type: 'review',
  title: 'Revision 1 · Units 1–3',
  sourceTopics: [
    '复习已开课 U1–U3：中国景点与饮食、世界城市和动物类别。',
    '练习围绕目录主题设计原创词卡、问答、信息核对和简短表达；核心词卡与固定快照附录单元词表对照；教材正文未逐页核对；例句、资料卡和扩展词均为原创。',
  ],
  basicTasks: [
    makeTask('认读中国地点和文化词语', '准确辨认饮食、地标和城市的英文形式与中文名称。', 'companion-01', profile1),
    basicTask2,
  ],
  advancedTasks: [advancedTask1, advancedTask2],
  highTasks: [highTask1, highTask2],
});
