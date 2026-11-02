import type { ChoiceActivityDefinition, Difficulty } from '../../content/types';

interface ActivityDraft {
  knowledgePointIds: string[];
  prompt: string;
  answer: string;
  distractors: [string, string];
  hint: string;
  explanation: string;
}

export interface Grade1Term2EnglishUnit03SupplementalActivity {
  difficulty: Difficulty;
  sourceUnitId: string;
  knowledgePointIds: string[];
  activity: ChoiceActivityDefinition;
}

const sourceUnitId = 'grade-1/term-2/english/unit-03';
const idPrefix = 'challenge-supplement-grade-1-term-2-english-unit-03';
const toyWords = ['toy-word-meanings'];
const toyTypes = ['toy-type-classification'];
const toySentences = ['toy-description-sentences'];
const toyWordOrder = ['toy-sentence-word-order'];

const drafts: Record<Difficulty, ActivityDraft[]> = {
  basic: [
    { knowledgePointIds: [...toyWords], prompt: 'ball 表示哪种玩具？', answer: '球', distractors: ['火车', '飞机'], hint: '想一想可以用脚踢或拍的圆形玩具。', explanation: 'ball 表示“球”。' },
    { knowledgePointIds: [...toyWords], prompt: 'doll 的中文意思是什么？', answer: '玩偶', distractors: ['小汽车', '玩具熊'], hint: '这是一个可以装扮或抱着玩的玩具。', explanation: 'doll 表示“玩偶”。' },
    { knowledgePointIds: [...toyWords], prompt: 'train 表示什么？', answer: '火车', distractors: ['球', '玩偶'], hint: '想一想在轨道上行驶的交通工具。', explanation: 'train 表示“火车”。' },
    { knowledgePointIds: [...toyWords], prompt: 'plane 表示哪种交通工具玩具？', answer: '飞机', distractors: ['玩具熊', '小汽车'], hint: '想一想能在天空中飞的交通工具。', explanation: 'plane 表示“飞机”。' },
    { knowledgePointIds: [...toyWords], prompt: 'bear 在本单元的玩具词卡中表示什么？', answer: '玩具熊', distractors: ['火车', '球'], hint: '它是毛茸茸的动物玩偶。', explanation: 'bear 表示“熊”；在本单元玩具词卡中指玩具熊。' },
    { knowledgePointIds: [...toyWords], prompt: 'car 的中文意思是什么？', answer: '小汽车', distractors: ['飞机', '玩偶'], hint: '想一想有车轮、能在路上行驶的玩具。', explanation: 'car 表示“小汽车”。' },
    { knowledgePointIds: [...toyTypes, ...toyWords], prompt: '哪组都是球、玩偶或动物玩具？', answer: 'ball、doll 和 bear', distractors: ['train、car 和 plane', 'ball、train 和 plane'], hint: '先把交通工具玩具和其他玩具分开。', explanation: 'ball、doll 和 bear 分别是球、玩偶和玩具熊。' },
    { knowledgePointIds: [...toyTypes, ...toyWords], prompt: '哪组三个词都表示交通工具玩具？', answer: 'train、car 和 plane', distractors: ['ball、doll 和 bear', 'doll、car 和 ball'], hint: '找出火车、小汽车和飞机对应的英文词。', explanation: 'train、car 和 plane 都表示交通工具。' },
    { knowledgePointIds: [...toySentences, ...toyWords], prompt: '小明拿着一个球向朋友介绍：“This is a ___.” 空格里应选哪个词？', answer: 'ball', distractors: ['doll', 'plane'], hint: '这句话需要填入表示手中玩具的英文名称。', explanation: 'ball 表示球，所以应说 This is a ball.' },
    { knowledgePointIds: [...toySentences], prompt: '“It is a plane.” 表示什么？', answer: '它是一架飞机。', distractors: ['它是一只玩具熊。', '这是一个球。'], hint: '句子中的 plane 表示飞机。', explanation: 'It is a plane. 的意思是“它是一架飞机”。' },
    { knowledgePointIds: [...toySentences], prompt: '想说“这是一个玩偶”，哪句话正确？', answer: 'This is a doll.', distractors: ['This is a car.', 'It is a train.'], hint: '先找出表示玩偶的英文词。', explanation: 'This is a doll. 表示“这是一个玩偶”。' },
    { knowledgePointIds: [...toySentences], prompt: '要说“它是一列火车”，应选哪句？', answer: 'It is a train.', distractors: ['It is a ball.', 'This is a plane.'], hint: '句子里需要表示火车的词。', explanation: 'It is a train. 表示“它是一列火车”。' },
    { knowledgePointIds: [...toySentences, ...toyWordOrder], prompt: '单词卡是 This / a / doll / is / .，哪句词序正确？', answer: 'This is a doll.', distractors: ['This a doll is.', 'Doll is a This.'], hint: '按“开头、is、a、玩具词、句号”的顺序读。', explanation: '正确词序是 This is a doll.。' },
    { knowledgePointIds: [...toySentences, ...toyWordOrder], prompt: '哪句话按正确词序表达“这是一个玩具熊”？', answer: 'This is a bear.', distractors: ['This a bear is.', 'Bear is This a.'], hint: '先放 This，再接 is a 和玩具名称。', explanation: 'This is a bear. 表示“这是一个玩具熊”。' },
  ],
  advanced: [
    { knowledgePointIds: [...toyWords], prompt: '哪一个英文词表示“小汽车”？', answer: 'car', distractors: ['plane', 'doll'], hint: '找出有车轮、在路上行驶的玩具名称。', explanation: 'car 表示“小汽车”。' },
    { knowledgePointIds: [...toyWords, ...toyTypes], prompt: '哪两个词都属于球、玩偶或动物玩具？', answer: 'ball 和 bear', distractors: ['train 和 plane', 'car 和 train'], hint: 'ball 是球；再找一个不是交通工具的词。', explanation: 'ball 和 bear 分别是球和玩具熊。' },
    { knowledgePointIds: [...toySentences], prompt: '卡片上写着“This is a train.”，这句话是什么意思？', answer: '这是一列火车。', distractors: ['这是一架飞机。', '这是一个球。'], hint: '读出句中的 train，再选择对应意思。', explanation: 'This is a train. 表示“这是一列火车”。' },
    { knowledgePointIds: [...toySentences], prompt: '想表达“它是一架飞机”，应选哪句话？', answer: 'It is a plane.', distractors: ['It is a doll.', 'This is a ball.'], hint: '先核对 plane 表示什么。', explanation: 'It is a plane. 表示“它是一架飞机”。' },
    { knowledgePointIds: [...toyTypes], prompt: '哪一组里没有交通工具玩具？', answer: 'ball、doll 和 bear', distractors: ['train、car 和 plane', 'car、doll 和 train'], hint: '交通工具玩具有 train、car 和 plane。', explanation: 'ball、doll 和 bear 都属于其他玩具。' },
    { knowledgePointIds: [...toyTypes], prompt: 'train、car、plane 可以按什么共同特点放在一组？', answer: '它们都是交通工具玩具。', distractors: ['它们都是球类玩具。', '它们都是玩偶。'], hint: '逐个读出这三个词的意思。', explanation: 'train、car 和 plane 分别是火车、小汽车和飞机。' },
    { knowledgePointIds: [...toySentences], prompt: '拿起一只玩具熊介绍它，哪句话符合“这是一个玩具熊”？', answer: 'This is a bear.', distractors: ['This is a plane.', 'It is a ball.'], hint: '选择表示玩具熊的词，并用 This is 开头。', explanation: 'This is a bear. 表示“这是一个玩具熊”。' },
    { knowledgePointIds: [...toySentences], prompt: '“It is a doll.” 中，it 后面说的是什么？', answer: '一个玩偶', distractors: ['一架飞机', '一辆小汽车'], hint: '认出句子末尾的 doll。', explanation: 'doll 表示玩偶，所以句子说“它是一个玩偶”。' },
    { knowledgePointIds: [...toySentences, ...toyWordOrder], prompt: '把 It / a / train / is / . 排成正确句子，应选哪句？', answer: 'It is a train.', distractors: ['It a train is.', 'Train is it a.'], hint: '句子从 It 开始，再接 is a 和玩具词。', explanation: '正确词序是 It is a train.。' },
    { knowledgePointIds: [...toySentences, ...toyWordOrder], prompt: '哪句话按“介绍对象、is、a、玩具名称”的顺序排列？', answer: 'This is a plane.', distractors: ['This a plane is.', 'Plane this is a.'], hint: '句首用 This，is 放在 a 和玩具名称之前。', explanation: 'This is a plane. 符合本单元的句子顺序。' },
    { knowledgePointIds: [...toyWords], prompt: '同伴把 plane 和“小汽车”配在一起。应把“小汽车”改成哪项？', answer: '飞机', distractors: ['玩具熊', '玩偶'], hint: 'plane 表示能在天空飞行的交通工具。', explanation: 'plane 表示“飞机”，不是“小汽车”。' },
    { knowledgePointIds: [...toySentences], prompt: '“This is a car.” 的意思是什么？', answer: '这是一辆小汽车。', distractors: ['这是一架飞机。', '这是一个玩偶。'], hint: '先认出 car 的意思。', explanation: 'This is a car. 表示“这是一辆小汽车”。' },
    { knowledgePointIds: [...toyWords, ...toyTypes], prompt: '哪一项把 bear 和 train 的意思配对正确？', answer: 'bear—玩具熊；train—火车', distractors: ['bear—火车；train—玩偶', 'bear—小汽车；train—飞机'], hint: '分别回想动物玩偶和轨道交通工具的词义。', explanation: 'bear 表示玩具熊，train 表示火车。' },
    { knowledgePointIds: [...toySentences], prompt: '哪句话介绍的是一个球，而不是飞机？', answer: 'This is a ball.', distractors: ['It is a plane.', 'This is a train.'], hint: '核对每句里的玩具名称。', explanation: 'ball 表示球，plane 表示飞机，train 表示火车。' },
    { knowledgePointIds: [...toyWords, ...toyTypes], prompt: 'ball、doll 和 bear 中，哪两个词表示球和玩偶？', answer: 'ball 和 doll', distractors: ['train 和 plane', 'bear 和 car'], hint: '先分别回想这两张词卡对应的中文意思。', explanation: 'ball 表示球，doll 表示玩偶。' },
    { knowledgePointIds: [...toyWords, ...toyTypes], prompt: '哪组由一个玩具熊和一个交通工具玩具组成？', answer: 'bear 和 car', distractors: ['ball 和 doll', 'train 和 plane'], hint: 'bear 是动物玩具，再找一个交通工具玩具。', explanation: 'bear 表示玩具熊，car 表示小汽车。' },
    { knowledgePointIds: [...toySentences, ...toyWords], prompt: '看到一辆小汽车，想用 It is... 介绍，哪句话符合？', answer: 'It is a car.', distractors: ['It is a plane.', 'It is a doll.'], hint: '选择与眼前小汽车相符的名称。', explanation: 'car 表示小汽车，所以可以说 It is a car.' },
    { knowledgePointIds: [...toySentences, ...toyWordOrder], prompt: '把 It / is / a / doll / . 排成句子，哪句词序正确？', answer: 'It is a doll.', distractors: ['It a doll is.', 'Doll is a It.'], hint: '按 It、is、a 和玩具名称的顺序排列。', explanation: '正确词序是 It is a doll.' },
    { knowledgePointIds: [...toyWords, ...toyTypes], prompt: '哪一组同时包含交通工具玩具和其他玩具？', answer: 'plane 和 doll', distractors: ['train 和 car', 'ball 和 bear'], hint: 'plane 是交通工具玩具；另一项应属于其他玩具。', explanation: 'plane 表示飞机，doll 表示玩偶。' },
    { knowledgePointIds: [...toySentences, ...toyWords], prompt: '想说“它是一只玩具熊”，应选哪句话？', answer: 'It is a bear.', distractors: ['It is a ball.', 'It is a plane.'], hint: '先找出表示玩具熊的英文词。', explanation: 'bear 表示玩具熊，所以句子是 It is a bear.' },
  ],
  high: [
    { knowledgePointIds: [...toySentences, ...toyWords], prompt: '卡片A写着“This is a doll.”，卡片B写着“It is a plane.”。哪项说对了两张卡的意思？', answer: 'A 是一个玩偶；B 是一架飞机。', distractors: ['A 是一列火车；B 是一个球。', 'A 是一架飞机；B 是一个玩偶。'], hint: '分别核对两句末尾的英文玩具词。', explanation: 'doll 表示玩偶，plane 表示飞机。' },
    { knowledgePointIds: [...toyWords, ...toyTypes], prompt: '词卡有 ball、doll、bear、train、car、plane。哪组三张放在“交通工具玩具”组？', answer: 'train、car、plane', distractors: ['ball、doll、bear', 'ball、train、doll'], hint: '先找出火车、小汽车和飞机的英文名称。', explanation: 'train、car 和 plane 都是交通工具玩具。' },
    { knowledgePointIds: [...toySentences], prompt: '小林拿着球说“This is a ball.”，这句话介绍的是什么？', answer: '他手里的球。', distractors: ['一列火车。', '一架飞机。'], hint: 'this 指向正在介绍的物品，ball 表示球。', explanation: 'This is a ball. 用来介绍眼前的球。' },
    { knowledgePointIds: [...toySentences, ...toyWordOrder], prompt: '四张卡是 This / is / a / plane，哪句按正确顺序表达“这是一架飞机”？', answer: 'This is a plane.', distractors: ['This a plane is.', 'Plane is a This.'], hint: '用 This 开头，再接 is a 和玩具名称。', explanation: '正确词序是 This is a plane.。' },
    { knowledgePointIds: [...toyWords, ...toyTypes], prompt: '哪组词由一个玩偶和一个交通工具玩具组成？', answer: 'doll 和 train', distractors: ['ball 和 bear', 'car 和 plane'], hint: 'doll 是玩偶；再选一个交通工具玩具。', explanation: 'doll 表示玩偶，train 表示火车。' },
    { knowledgePointIds: [...toySentences], prompt: '同伴看着一架飞机说“It is a plane.”，哪项解释正确？', answer: '它是一架飞机。', distractors: ['这是一个玩偶。', '它是一辆小汽车。'], hint: 'It 指代正在说的物品，plane 表示飞机。', explanation: 'It is a plane. 表示“它是一架飞机”。' },
    { knowledgePointIds: [...toySentences, ...toyWords], prompt: '哪句话介绍的是玩具熊？', answer: 'This is a bear.', distractors: ['This is a car.', 'It is a train.'], hint: '找出表示熊的玩具词。', explanation: 'bear 表示玩具熊。' },
    { knowledgePointIds: [...toySentences, ...toyWordOrder], prompt: '把 a / doll / It / is / . 排成一个正确句子，应选哪项？', answer: 'It is a doll.', distractors: ['It a doll is.', 'Doll is It a.'], hint: '先放 It，再按 is、a、玩具名称的顺序连接。', explanation: '正确词序是 It is a doll.。' },
    { knowledgePointIds: [...toyWords], prompt: '小卡上写着“火车”，应选哪个英文词？', answer: 'train', distractors: ['plane', 'bear'], hint: '它表示沿轨道行驶的交通工具。', explanation: 'train 表示“火车”。' },
    { knowledgePointIds: [...toySentences], prompt: '哪项同时选对句子和意思：“这是一个球”？', answer: 'This is a ball. — 这是一个球。', distractors: ['It is a plane. — 这是一列火车。', 'This is a doll. — 这是一个玩具熊。'], hint: '分别检查英文里的玩具词和中文意思。', explanation: 'ball 表示球，This is a ball. 表示“这是一个球”。' },
    { knowledgePointIds: [...toyTypes], prompt: '哪项把六张词卡分成了“其他玩具”和“交通工具玩具”？', answer: 'ball、doll、bear 是其他玩具；train、car、plane 是交通工具玩具', distractors: ['ball、train、bear 是交通工具玩具；car、doll、plane 是其他玩具', 'doll、car、bear 是其他玩具；train、ball、plane 是交通工具玩具'], hint: '逐个回想六张词卡所表示的物品，再看它们是否属于交通工具。', explanation: '球、玩偶和玩具熊属于其他玩具；火车、小汽车和飞机属于交通工具玩具。' },
    { knowledgePointIds: [...toySentences, ...toyWords], prompt: '先看到玩具熊，再把它介绍给伙伴，哪句话合适？', answer: 'This is a bear.', distractors: ['It is a plane.', 'This is a train.'], hint: '选择与眼前玩具一致的名称。', explanation: 'This is a bear. 表示“这是一个玩具熊”。' },
    { knowledgePointIds: [...toySentences, ...toyWordOrder], prompt: '伙伴写成“It plane is a.”，要表达“它是一架飞机”，应改成哪句？', answer: 'It is a plane.', distractors: ['It a plane is.', 'Plane it a is.'], hint: '从 It 开始，按 is a 和物品词的顺序读。', explanation: '正确词序是 It is a plane.。' },
    { knowledgePointIds: [...toyWords, ...toySentences], prompt: '哪项把英文玩具词和介绍句的意思都配对正确？', answer: 'car—小汽车；This is a car.—这是一辆小汽车。', distractors: ['plane—小汽车；This is a plane.—这是一列火车。', 'doll—玩偶；This is a doll.—这是一架飞机。'], hint: '先核对英文玩具词，再核对句子末尾的玩具名称。', explanation: 'car 表示小汽车；This is a car. 表示“这是一辆小汽车”。' },
    { knowledgePointIds: [...toySentences, ...toyWords], prompt: '图卡 A 是球，B 是玩具熊，C 是飞机。要给“This is a ball.”和“It is a plane.”分别找图，哪两个字母合适？', answer: 'A 和 C', distractors: ['A 和 B', 'B 和 C'], hint: '分别根据 ball 和 plane 找到对应的图卡。', explanation: 'ball 表示球，对应 A；plane 表示飞机，对应 C。' },
    { knowledgePointIds: [...toyWords, ...toyTypes], prompt: '四张词卡是 ball、train、doll、plane。哪两张表示交通工具玩具？', answer: 'train 和 plane', distractors: ['ball 和 doll', 'doll 和 plane'], hint: '找出火车和飞机对应的英文词。', explanation: 'train 表示火车，plane 表示飞机，二者都是交通工具玩具。' },
    { knowledgePointIds: [...toySentences, ...toyWordOrder], prompt: '把 This / is / a / car / . 排成正确句子，哪句词序正确？', answer: 'This is a car.', distractors: ['This a car is.', 'Car is a This.'], hint: 'This 开头，接着放 is、a 和玩具名称。', explanation: '正确词序是 This is a car.' },
    { knowledgePointIds: [...toyWords, ...toySentences], prompt: '图上画着一只玩具熊，旁边写着“It is a bear.”。句子里的 bear 指哪种玩具？', answer: '玩具熊。', distractors: ['球。', '火车。'], hint: '先认出句子末尾的 bear。', explanation: 'bear 表示熊；在本单元玩具词卡中指玩具熊。' },
  ],
};

function createActivity(draft: ActivityDraft, difficulty: Difficulty, index: number): Grade1Term2EnglishUnit03SupplementalActivity {
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
  return { activity, difficulty, sourceUnitId, knowledgePointIds: draft.knowledgePointIds };
}

export const grade1Term2EnglishUnit03SupplementalActivities = (Object.entries(drafts) as [Difficulty, ActivityDraft[]][])
  .flatMap(([difficulty, items]) => items.map((draft, index) => createActivity(draft, difficulty, index)));
