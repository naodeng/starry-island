import type { ChoiceActivityDefinition, Difficulty } from '../../content/types';

export type Grade2Term1EnglishUnit05KnowledgePointId =
  | 'park-and-nature-vocabulary'
  | 'can-see-sentences'
  | 'questions-about-objects-and-observations';

export interface Grade2Term1EnglishUnit05SupplementalActivity {
  difficulty: Difficulty;
  sourceUnitId: string;
  knowledgePointIds: Grade2Term1EnglishUnit05KnowledgePointId[];
  activity: ChoiceActivityDefinition;
}

interface Draft {
  knowledgePointIds: Grade2Term1EnglishUnit05KnowledgePointId[];
  prompt: string;
  answer: string;
  distractors: [string, string];
  hint: string;
  explanation: string;
}

const sourceUnitId = 'grade-2/term-1/english/unit-05';
const idPrefix = 'challenge-supplement-grade-2-term-1-english-unit-05';
const vocabulary: Grade2Term1EnglishUnit05KnowledgePointId = 'park-and-nature-vocabulary';
const sentence: Grade2Term1EnglishUnit05KnowledgePointId = 'can-see-sentences';
const questions: Grade2Term1EnglishUnit05KnowledgePointId = 'questions-about-objects-and-observations';

const q = (
  knowledgePointIds: Grade2Term1EnglishUnit05KnowledgePointId[],
  prompt: string,
  answer: string,
  distractors: [string, string],
  hint: string,
  explanation: string,
): Draft => ({ knowledgePointIds, prompt, answer, distractors, hint, explanation });

const drafts: Record<Difficulty, Draft[]> = {
  basic: [
    q([vocabulary], '词卡 “lake” 对应哪个中文意思？', '湖', ['小船', '小山'], '认读 lake，再从中文词卡中找对应意思。', 'lake 表示“湖”。'),
    q([vocabulary], '哪张英文词卡对应“小船”？', 'boat', ['tree', 'flower'], '先找出表示小船的英文词。', 'boat 表示“小船”。'),
    q([vocabulary], '“树”对应哪张词卡？', 'tree', ['grass', 'hill'], '想一想公园里高高的植物词卡。', 'tree 表示“树”。'),
    q([vocabulary], '草地上的“草”对应哪个英文单词？', 'grass', ['flower', 'boat'], '这张词卡说的是草地上的植物。', 'grass 表示“草”。'),
    q([vocabulary], '“花”对应哪张英文词卡？', 'flower', ['lake', 'hill'], '从公园景物词卡中找“花”。', 'flower 表示“花”。'),
    q([vocabulary], '哪张词卡对应“小山”？', 'hill', ['tree', 'lake'], '小山是公园里的一种地形。', 'hill 表示“小山”。'),
    q([questions], '看到一件东西，想问“这是什么？”，应选哪句？', 'What is this?', ['What can you see?', 'Where are you?'], '这个问题要问眼前这件东西是什么。', 'What is this? 用来询问“这是什么？”。'),
    q([questions], '想问同伴“你能看见什么？”，应选哪句？', 'What can you see?', ['What is this?', 'Who is he?'], '问题是在询问能看见的事物。', 'What can you see? 表示“你能看见什么？”。'),
    q([vocabulary, sentence], '观察卡上画着一艘小船。哪句话符合卡片内容？', 'I can see a boat.', ['I can see a lake.', 'I can see a flower.'], '先认出小船的英文，再放进看见句型。', 'boat 表示小船；I can see a boat. 表示“我能看见一艘小船”。'),
    q([vocabulary, sentence], '图片里有一棵树。选择意思相同的句子。', 'I can see a tree.', ['I can see a hill.', 'I can see grass.'], '核对图片中的对象，再检查句子里的名词。', 'tree 表示树；句子中的 a tree 与图片相符。'),
    q([vocabulary, sentence], '观察记录写着“我能看见草”。哪句表达正确？', 'I can see grass.', ['I can see a grass.', 'I can see a hill.'], 'grass 在本单元句子里不在前面加 a。', '本单元用 I can see grass. 表达“我能看见草”。'),
    q([vocabulary, sentence], '花朵观察卡应配哪句话？', 'I can see a flower.', ['I can see a boat.', 'I can see a tree.'], 'flower 是花，留意句子中的名词。', 'I can see a flower. 表示“我能看见一朵花”。'),
    q([vocabulary, sentence], '小明能看见一个湖。哪句话与这条记录相符？', 'I can see a lake.', ['I can see a hill.', 'I can see grass.'], '把 lake 放入“我能看见……”句型。', 'lake 前用 a，I can see a lake. 表示“我能看见一个湖”。'),
    q([vocabulary, sentence], '观察图中是一座小山。选择与图意相符的句子。', 'I can see a hill.', ['I can see a boat.', 'I can see a flower.'], '找到小山的英文词，再读完整句子。', 'hill 表示小山；I can see a hill. 与图意相符。'),
  ],
  advanced: [
    q([vocabulary], '词义核对卡写着“草”。哪项把英文词和中文意思配对正确？', 'grass — 草', ['grass — 花', 'grass — 湖'], '对照 grass 的词义检查配对。', 'grass 对应“草”，不是花或湖。'),
    q([vocabulary], '湖面上有小船。哪组词按“湖、小船”的顺序填入观察卡？', 'lake；boat', ['boat；lake', 'hill；tree'], '按题目给出的顺序分别找湖和小船。', 'lake 表示湖，boat 表示小船。'),
    q([questions], '画面只突出一朵花，想问“这是什么？”。哪句话最合适？', 'What is this?', ['What can you see?', 'What is that?'], '选择本单元学习的、询问眼前物品的问句。', 'What is this? 是本单元询问“这是什么？”的句型。'),
    q([questions], '同伴正在看一幅公园图，你想问他能看见什么。应使用哪句？', 'What can you see?', ['What is this?', 'Where is the park?'], '这里询问的是能看见的内容，不是某一件东西的名称。', 'What can you see? 用来询问“你能看见什么？”。'),
    q([vocabulary, sentence], '观察卡画着一朵花而不是一棵树。哪句与图片匹配？', 'I can see a flower.', ['I can see a tree.', 'I can see a boat.'], '检查句子里的景物词是否和图片相同。', '图片是花，应使用 flower。'),
    q([vocabulary, sentence], '句子 “I can see a tree.” 的中文意思是哪项？', '我能看见一棵树。', ['我能看见一艘船。', '我能看见一座小山。'], '先认出 tree，再理解整句。', 'tree 表示树，整句表示“我能看见一棵树”。'),
    q([vocabulary, sentence], '句子卡写成 “I can see a grass.”。根据本单元学过的表达，应该改成哪句？', 'I can see grass.', ['I can see a hill.', 'I can see the grass.'], '本题只检查 grass 前是否需要 a。', '本单元用 I can see grass. 表达看见草，不在 grass 前加 a。'),
    q([vocabulary], '公园词卡要分成“植物”和“其他景物”。哪组分类符合词义？', '植物：tree、flower、grass；其他景物：lake、boat、hill。', ['植物：lake、boat、hill；其他景物：tree、flower、grass。', '植物：boat、tree、lake；其他景物：flower、grass、hill。'], '逐个判断六个词所指的是植物还是其他景物。', 'tree、flower、grass 是植物；lake、boat、hill 是其他景物。'),
    q([vocabulary, sentence], '记录写着“我能看见一个湖”，但英文卡选了 “I can see a hill.”。应换成哪句？', 'I can see a lake.', ['I can see a boat.', 'I can see grass.'], '保留“我能看见”的句型，只改成记录中的地点词。', '记录中的湖是 lake，因此句子应为 I can see a lake.。'),
    q([vocabulary, sentence], '图片画着草地，没有单独的一株植物。哪句既符合图片，也符合本单元表达？', 'I can see grass.', ['I can see a grass.', 'I can see a flower.'], '判断图片是 grass 还是单独一朵 flower。', 'grass 表示草；本单元表达不用 a grass。'),
    q([vocabulary, questions], '公园图中同时画着树和湖。想问同伴能看见什么，题目和回答哪组相符？', 'What can you see? — I can see a tree.', ['What is this? — I can see a lake.', 'What can you see? — I can see a boat.'], '先检查问句问的是看见什么，再对照图中对象。', 'What can you see? 询问能看见什么；图中有树，因此 I can see a tree. 符合。'),
    q([vocabulary, sentence], '把“湖、小山、花”按顺序记入三张卡。哪组句子按顺序对应三张卡？', 'I can see a lake.；I can see a hill.；I can see a flower.', ['I can see a boat.；I can see grass.；I can see a tree.', 'I can see a hill.；I can see a flower.；I can see a lake.'], '逐条核对三个名词，并保持记录顺序。', '三张卡依次是 lake、hill、flower，句子顺序也应相同。'),
    q([vocabulary, questions], '一张卡片只画一件东西，另一张卡片展示几种公园景物。哪组问句按“单件物品、观察多种景物”排序？', 'What is this?；What can you see?', ['What can you see?；What is this?', 'What is this?；Where are you?'], '前一个问题询问这是什么，后一个询问能看见什么。', 'What is this? 问一件东西是什么；What can you see? 问能看见什么。'),
    q([vocabulary, sentence], '观察记录是“湖、树、草”。哪组英文句子与三项记录逐一对应？', 'I can see a lake.；I can see a tree.；I can see grass.', ['I can see a boat.；I can see a flower.；I can see a hill.', 'I can see a tree.；I can see a lake.；I can see a grass.'], '按记录顺序检查词义，并留意 grass 的表达。', 'lake、tree、grass 依次对应湖、树、草；grass 前不加 a。'),
    q([vocabulary, sentence], '画面甲有草，画面乙有一棵树。哪组句子按甲、乙顺序描述了两幅画？', 'A：I can see grass.；B：I can see a tree.', ['A：I can see a tree.；B：I can see grass.', 'A：I can see a grass.；B：I can see a flower.'], '先按画面顺序确认两个景物，再检查 grass 的表达。', '甲对应 grass，乙对应 tree；grass 前不加 a。'),
    q([questions], '两张问句卡的意思哪项解释正确？', 'What is this? 问眼前这是什么；What can you see? 问能看见什么。', ['What is this? 问能看见什么；What can you see? 问这是什么。', '两句都在问“你在哪里？”。'], '逐句对照本单元两种不同的提问内容。', 'What is this? 询问眼前物品；What can you see? 询问能看见的事物。'),
    q([vocabulary], '公园照片的三个标注从左到右是树、小山、花。哪组英文词按标注顺序排列？', 'tree；hill；flower', ['flower；tree；hill', 'tree；lake；boat'], '保留图片从左到右的顺序，逐个核对词义。', 'tree、hill、flower 分别表示树、小山、花。'),
    q([vocabulary], '观察分类表有“水面景物、植物、水上物品”三栏。湖、花、小船应怎样填写？', '水面景物：lake；植物：flower；水上物品：boat。', ['水面景物：flower；植物：boat；水上物品：lake。', '水面景物：hill；植物：lake；水上物品：tree。'], '根据三个词的意思分别判断它指湖、花还是小船。', 'lake 是湖，flower 是花，boat 是小船，分别对应三栏。'),
  ],
  high: [
    q([vocabulary, sentence], '观察表 A 写“湖”，B 写“树”，C 写“草”。哪组句子按 A、B、C 顺序全部相符？', 'A：I can see a lake.；B：I can see a tree.；C：I can see grass.', ['A：I can see a boat.；B：I can see a flower.；C：I can see a hill.', 'A：I can see a tree.；B：I can see a lake.；C：I can see a grass.'], '逐项核对词义和顺序，并留意 grass 前不加 a。', 'lake、tree、grass 分别对应湖、树、草，句子顺序与观察表一致。'),
    q([vocabulary, sentence], '同伴把 A“花”写成 I can see a flower.，把 B“草”写成 I can see a grass.。哪项反馈只需改正 B？', 'A 保留；B 改为 I can see grass.', ['A 改为 I can see a tree.；B 保留。', 'A、B 都改成 I can see a hill.'], '先确认 A 的句子正确，再检查 grass 的表达。', 'A 与花朵相符；grass 前不加 a，因此只改正 B。'),
    q([vocabulary, sentence], '公园图的三条记录是：①一艘船；②一朵花；③一片草。哪组选句完整保留三条记录？', 'I can see a boat.；I can see a flower.；I can see grass.', ['I can see a lake.；I can see a tree.；I can see a grass.', 'I can see a boat.；I can see a hill.；I can see a flower.'], '按记录顺序选出三个景物词，并检查 grass 的用法。', 'boat、flower、grass 对应三条记录；grass 前不加 a。'),
    q([questions], '一张卡标注“眼前单个对象”，另一张标注“观察画面中的景物”。哪组句型按卡片顺序选对，并说明两问的区别？', 'A：What is this? 问眼前这是什么；B：What can you see? 问能看见什么。', ['A：What can you see? 问眼前这是什么；B：What is this? 问能看见什么。', 'A、B 都用 What is this?，两问意思相同。'], '先区分询问单个对象与询问可见内容，再为两张卡选择问句。', 'What is this? 询问眼前的东西是什么；What can you see? 询问能看见什么。'),
    q([vocabulary], '六张词卡要按“植物”和“湖面或地形等其他景物”整理。哪种分类全部正确？', '植物：tree、flower、grass；其他景物：lake、boat、hill。', ['植物：lake、boat、hill；其他景物：tree、flower、grass。', '植物：tree、boat、flower；其他景物：lake、grass、hill。'], '检查每个词的中文意思，再按词义归类。', 'tree、flower、grass 是植物；lake、boat、hill 是其他景物。'),
    q([vocabulary, sentence], '答题卡三项中，①湖—lake；②小船—boat；③小山—flower。只改正错误的一项应选哪项？', '把③的 flower 改为 hill。', ['把①的 lake 改为 tree。', '把②的 boat 改为 grass。'], '逐项核对词义，找出唯一配错的词卡。', 'lake 和 boat 两项正确；hill 才表示小山。'),
    q([vocabulary, questions], '观察清单写着“湖、船、花”。你想先询问同伴能看见什么，再记录一项回答。哪组问答符合清单？', 'What can you see? — I can see a boat.', ['What is this? — I can see grass.', 'What can you see? — I can see a hill.'], '问题要询问看见什么，回答中的景物也应出现在清单中。', 'What can you see? 询问看见什么；boat 在观察清单中。'),
    q([vocabulary, sentence], '三张记录卡依次写“树、湖、小山”，同伴的句子把前两项交换了。哪项按原顺序改正全部记录？', 'I can see a tree.；I can see a lake.；I can see a hill.', ['I can see a lake.；I can see a tree.；I can see a hill.', 'I can see a tree.；I can see grass.；I can see a boat.'], '保留记录卡顺序，逐句核对词义。', 'tree、lake、hill 依次对应树、湖、小山。'),
    q([vocabulary, sentence], '检查三句：A I can see a flower.；B I can see grass.；C I can see a lake.。观察卡依次是“花、草、湖”。哪项判断正确？', 'A、B、C 三句都与观察卡相符。', ['只有 A、C 符合；B 应改成 I can see a grass.', '只有 B 符合；A、C 应改成 tree 和 boat。'], '按顺序对照三个名词，特别检查 grass 的句子。', 'flower、grass、lake 与观察卡顺序一致，grass 前不用 a。'),
    q([questions, vocabulary, sentence], '一张图片只突出一个小山，另一张图片包含湖、树和花。哪组问题按“单个对象、多种观察内容”排列？', 'What is this?；What can you see?', ['What can you see?；What is this?', 'What is this?；Who is this?'], '根据图片呈现的是一件东西还是多种景物选择问句。', 'What is this? 询问这是什么；What can you see? 询问看见什么。'),
    q([vocabulary, sentence], '三项观察结果是“花、湖、草”，其中一条英文记录写错了：①I can see a flower.；②I can see a boat.；③I can see grass.。哪项只修正错误记录？', '把②改为 I can see a lake.', ['把①改为 I can see a tree.', '把③改为 I can see a grass.'], '逐项对照花、湖、草的英文词义。', '①花和③草正确；②应表达湖，即 I can see a lake.。'),
    q([vocabulary, sentence], '同伴把“我能看见一艘船”写成 I can see a lake.，又把“我能看见一个湖”写成 I can see a boat.。哪项能交换两句中的景物词并纠正记录？', '船：I can see a boat.；湖：I can see a lake.', ['船：I can see a hill.；湖：I can see a tree.', '船：I can see a lake.；湖：I can see a boat.'], '分别核对 boat 和 lake 的词义，不改变看见句型。', 'boat 是小船，lake 是湖，两个词应分别放回对应句子。'),
    q([vocabulary, sentence], '草地旁有一棵树和一朵花。记录要求依次写“草、树、花”，哪组选句既保持顺序又符合句型？', 'I can see grass.；I can see a tree.；I can see a flower.', ['I can see a grass.；I can see a flower.；I can see a tree.', 'I can see a hill.；I can see a tree.；I can see a lake.'], '按记录顺序逐项选择词语，并检查 grass 前是否加 a。', 'grass、tree、flower 顺序正确；grass 前不加 a。'),
    q([vocabulary, sentence], '记录 A“我能看见一座小山”、B“我能看见一朵花”、C“我能看见草”。哪组选句准确保留全部信息？', 'A：I can see a hill.；B：I can see a flower.；C：I can see grass.', ['A：I can see a tree.；B：I can see a boat.；C：I can see a grass.', 'A：I can see a hill.；B：I can see grass.；C：I can see a flower.'], '按 A、B、C 顺序核对景物词，再检查 grass 的表达。', 'hill、flower、grass 分别对应三条记录；C 的 grass 前不加 a。'),
    q([vocabulary, sentence], '观察清单依次是“湖、船、花”。哪组三句按清单顺序完整记录了所见景物？', 'I can see a lake.；I can see a boat.；I can see a flower.', ['I can see a boat.；I can see a lake.；I can see a tree.', 'I can see a hill.；I can see a flower.；I can see grass.'], '先按清单顺序核对三个名词，再检查每句都使用本单元看见句型。', '清单依次对应 lake、boat、flower，三句顺序一致。'),
    q([vocabulary, sentence], '三张拍摄卡按顺序是花朵、草地和湖上的小船。哪组句子按顺序完整记录三张卡？', 'I can see a flower.；I can see grass.；I can see a boat.', ['I can see a tree.；I can see a grass.；I can see a lake.', 'I can see a flower.；I can see a hill.；I can see a boat.'], '依次核对三张卡中的景物，并检查 grass 前是否加 a。', 'flower、grass、boat 与三张卡的顺序一致；grass 前不加 a。'),
  ],
};

export const grade2Term1EnglishUnit05SupplementalActivities: Grade2Term1EnglishUnit05SupplementalActivity[] =
  (Object.entries(drafts) as [Difficulty, Draft[]][]).flatMap(([difficulty, items]) => items.map((item, index) => {
    const correctOptionIndex = ((index + 1) % 3) as 0 | 1 | 2;
    const options = [...item.distractors];
    options.splice(correctOptionIndex, 0, item.answer);
    return {
      difficulty,
      sourceUnitId,
      knowledgePointIds: item.knowledgePointIds,
      activity: {
        id: `${idPrefix}-${difficulty}-${String(index + 1).padStart(2, '0')}`,
        kind: 'choice',
        prompt: item.prompt,
        options: options.map((label, optionIndex) => ({ id: `option-${optionIndex + 1}`, label })),
        correctOptionId: `option-${correctOptionIndex + 1}`,
        hint: item.hint,
        explanation: item.explanation,
      },
    };
  }));
