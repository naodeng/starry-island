import type { ChoiceActivityDefinition, Difficulty } from '../../content/types';

interface ActivityDraft {
  knowledgePointIds: string[];
  prompt: string;
  answer: string;
  distractors: [string, string];
  hint: string;
  explanation: string;
}

export interface Grade1Term2EnglishUnit04SupplementalActivity {
  difficulty: Difficulty;
  sourceUnitId: string;
  knowledgePointIds: string[];
  activity: ChoiceActivityDefinition;
}

const sourceUnitId = 'grade-1/term-2/english/unit-04';
const idPrefix = 'challenge-supplement-grade-1-term-2-english-unit-04';
const foodWords = ['food-word-meanings'];
const foodCategories = ['food-category-classification'];
const preferences = ['food-preference-expressions'];
const wordOrder = ['food-sentence-word-order'];

const drafts: Record<Difficulty, ActivityDraft[]> = {
  basic: [
    { knowledgePointIds: [...foodWords], prompt: 'rice 表示哪种食物？', answer: '米饭', distractors: ['面条', '鸡肉'], hint: '想一想本单元常见的主食词。', explanation: 'rice 表示“米饭”。' },
    { knowledgePointIds: [...foodWords], prompt: '“面条”对应哪个英文词？', answer: 'noodles', distractors: ['rice', 'egg'], hint: '核对表示面条的词卡。', explanation: 'noodles 表示“面条”。' },
    { knowledgePointIds: [...foodWords], prompt: 'chicken 的中文意思是什么？', answer: '鸡肉', distractors: ['鸡蛋', '米饭'], hint: '想一想做菜时常见的一种动物肉类。', explanation: 'chicken 表示“鸡肉”。' },
    { knowledgePointIds: [...foodWords], prompt: '哪个英文词表示“鸡蛋”？', answer: 'egg', distractors: ['chicken', 'noodles'], hint: '它是本单元“其他食物”组里的食物词。', explanation: 'egg 表示“鸡蛋”。' },
    { knowledgePointIds: [...foodCategories], prompt: 'rice 和 noodles 在本单元被放在哪一组？', answer: '米饭或面条', distractors: ['其他食物', '位置词'], hint: '留意这两个词共同表示哪类主食。', explanation: '本单元把 rice 和 noodles 放在“米饭或面条”组。' },
    { knowledgePointIds: [...foodCategories, ...foodWords], prompt: 'fish 应放进哪一组？', answer: '其他食物', distractors: ['米饭或面条', '玩具'], hint: 'fish 不是 rice，也不是 noodles。', explanation: '本单元把 fish 放在“其他食物”组。' },
    { knowledgePointIds: [...preferences], prompt: '“Do you like noodles?” 是在询问什么？', answer: '你喜欢面条吗？', distractors: ['你要面条吗？', '面条在哪里？'], hint: '看句子开头的 Do you like…?，它在询问喜好。', explanation: 'Do you like noodles? 是在问“你喜欢面条吗？”' },
    { knowledgePointIds: [...preferences], prompt: '想肯定回答“是的，我喜欢”，哪句合适？', answer: 'Yes, I do.', distractors: ['No, I don’t.', 'Thank you.'], hint: '选择表示肯定的回答。', explanation: 'Yes, I do. 表示“是的，我喜欢”。' },
    { knowledgePointIds: [...preferences], prompt: '“No, I don’t.” 表示哪种回答？', answer: '不，我不喜欢。', distractors: ['是的，我喜欢。', '你喜欢吗？'], hint: '注意句首的 No。', explanation: 'No, I don’t. 表示否定回答“不，我不喜欢”。' },
    { knowledgePointIds: [...preferences, ...foodWords], prompt: '要问“你喜欢米饭吗？”，哪句话正确？', answer: 'Do you like rice?', distractors: ['Do you like egg?', 'Do you like chicken?'], hint: '保留询问喜好的句型，把最后的食物词换成米饭。', explanation: 'rice 表示米饭，所以可以问 Do you like rice?。' },
    { knowledgePointIds: [...wordOrder, ...preferences], prompt: '把 Do / you / like / chicken / ? 排成问句，哪项正确？', answer: 'Do you like chicken?', distractors: ['You do like chicken?', 'Do like you chicken?'], hint: '问句先放 Do，再接 you 和 like。', explanation: '正确词序是 Do you like chicken?。' },
    { knowledgePointIds: [...wordOrder, ...preferences], prompt: '把 Yes, / I / do. 排成肯定回答，哪项正确？', answer: 'Yes, I do.', distractors: ['I yes, do.', 'Do, I yes.'], hint: '肯定回答先说 Yes，再按 I、do 的顺序排列。', explanation: 'Yes, I do. 是本单元的肯定回答。' },
    { knowledgePointIds: [...foodWords, ...preferences], prompt: '下面哪项正确配对了英文词和中文意思？', answer: 'noodles—面条', distractors: ['rice—鸡蛋', 'egg—鸡肉'], hint: '逐个核对三个词卡的意思。', explanation: 'noodles 表示面条；rice 表示米饭，egg 表示鸡蛋。' },
    { knowledgePointIds: [...foodCategories, ...foodWords], prompt: '哪一项中的两个词都属于“其他食物”？', answer: 'chicken 和 egg', distractors: ['rice 和 noodles', 'rice 和 chicken'], hint: '先回想米饭或面条组，再检查另外两项。', explanation: 'chicken 和 egg 都属于“其他食物”组。' },
  ],
  advanced: [
    { knowledgePointIds: [...foodWords], prompt: '哪组把 chicken 和 egg 的意思都配对正确？', answer: 'chicken—鸡肉；egg—鸡蛋', distractors: ['chicken—鸡蛋；egg—米饭', 'chicken—面条；egg—鸡肉'], hint: '分别检查两张词卡，不要只核对其中一个。', explanation: 'chicken 表示鸡肉，egg 表示鸡蛋。' },
    { knowledgePointIds: [...foodCategories, ...foodWords], prompt: '分类记录写着“米饭或面条：rice、noodles”。fish 应记录在哪组？', answer: '其他食物', distractors: ['米饭或面条', '问句'], hint: 'fish 不是记录中的两个主食词。', explanation: 'fish 属于“其他食物”组。' },
    { knowledgePointIds: [...foodCategories], prompt: '哪项把 rice、noodles、chicken 分成两组正确？', answer: 'rice 和 noodles；chicken', distractors: ['rice 和 chicken；noodles', 'noodles 和 chicken；rice'], hint: '先找出本单元“米饭或面条”组的两个词。', explanation: 'rice 和 noodles 放在一组，chicken 属于其他食物。' },
    { knowledgePointIds: [...preferences, ...foodWords], prompt: '记录要求问“你喜欢鸡肉吗？”，哪句符合？', answer: 'Do you like chicken?', distractors: ['Do you like rice?', 'Do you like noodles?'], hint: '检查问句最后的食物词是否与记录一致。', explanation: 'chicken 表示鸡肉，所以应问 Do you like chicken?。' },
    { knowledgePointIds: [...preferences], prompt: '同伴想肯定回答 Do you like rice?，应选哪句？', answer: 'Yes, I do.', distractors: ['No, I don’t.', 'Do you like rice?'], hint: '题目需要肯定回答，不是重复问句。', explanation: 'Yes, I do. 是对 Do you like…? 的肯定回答。' },
    { knowledgePointIds: [...preferences], prompt: '“No, I don’t.” 和 “Yes, I do.” 哪项说法正确？', answer: '前者是否定回答，后者是肯定回答', distractors: ['前者是肯定回答，后者是否定回答', '两句都在询问喜好'], hint: '分别看每句开头的 No 和 Yes。', explanation: 'No 表示否定，Yes 表示肯定。' },
    { knowledgePointIds: [...wordOrder, ...preferences], prompt: '卡片是 you / Do / noodles / like / ?，哪句排得正确？', answer: 'Do you like noodles?', distractors: ['Do like you noodles?', 'You like noodles do?'], hint: '问句从 Do 开始，you 和 like 依次放在后面。', explanation: '正确词序是 Do you like noodles?。' },
    { knowledgePointIds: [...foodWords, ...preferences], prompt: '“Do you like egg?” 问的是哪句话？', answer: '你喜欢鸡蛋吗？', distractors: ['你喜欢鸡肉吗？', '你喜欢米饭吗？'], hint: '先确认 egg 的意思，再读完整问句。', explanation: 'egg 表示鸡蛋，Do you like egg? 是在询问是否喜欢鸡蛋。' },
    { knowledgePointIds: [...foodWords, ...foodCategories], prompt: '词卡 chicken、rice、noodles 中，哪两个应放在同一组？', answer: 'rice 和 noodles', distractors: ['chicken 和 rice', 'chicken 和 noodles'], hint: '本单元有一组专门放米饭或面条。', explanation: 'rice 和 noodles 同属“米饭或面条”组。' },
    { knowledgePointIds: [...preferences, ...wordOrder], prompt: '草稿写成“You do like chicken?”，要按本单元的问句词序询问喜好，哪句合适？', answer: 'Do you like chicken?', distractors: ['Do like you chicken?', 'You like do chicken?'], hint: '把 Do 放到问句开头，再按 you、like、食物排列。', explanation: '本单元问句词序是 Do you like + 食物词?。' },
    { knowledgePointIds: [...foodWords], prompt: '已知 rice 表示米饭、noodles 表示面条，egg 对应什么？', answer: '鸡蛋', distractors: ['鸡肉', '鱼'], hint: '排除已经配对的两个词，再核对 egg。', explanation: 'egg 表示鸡蛋。' },
    { knowledgePointIds: [...foodCategories, ...foodWords], prompt: '哪项说明了 vegetable 和 rice 的分类？', answer: 'vegetable 属于其他食物，rice 属于米饭或面条组', distractors: ['vegetable 和 rice 都属于米饭或面条组', 'vegetable 属于米饭或面条组，rice 属于其他食物'], hint: 'rice 是主食词；vegetable 在另一个组。', explanation: '本单元把 rice 放在“米饭或面条”组，vegetable 放在“其他食物”组。' },
    { knowledgePointIds: [...preferences, ...foodWords], prompt: '想问伙伴是否喜欢 noodles，哪组句子和意思对应正确？', answer: 'Do you like noodles?—你喜欢面条吗？', distractors: ['Do you like rice?—你喜欢鸡肉吗？', 'Do you like egg?—你喜欢米饭吗？'], hint: '检查英文食物词与中文意思是否对应。', explanation: 'noodles 表示面条，整句是在询问是否喜欢面条。' },
    { knowledgePointIds: [...preferences, ...wordOrder], prompt: '卡片顺序是 like / Do / you / rice / ?，哪项按正确问句顺序重排？', answer: 'Do you like rice?', distractors: ['Do rice like you?', 'You do like rice?'], hint: '用 Do 开头，随后放 you 和 like。', explanation: '正确词序是 Do you like rice?。' },
    { knowledgePointIds: [...foodWords, ...foodCategories], prompt: '记录列出 rice、fish、noodles。哪两个词应放进同一组？', answer: 'rice 和 noodles', distractors: ['rice 和 fish', 'fish 和 noodles'], hint: '找出分别表示米饭和面条的词。', explanation: 'rice 和 noodles 属于“米饭或面条”组。' },
    { knowledgePointIds: [...foodCategories, ...foodWords], prompt: '想从两个小组各选一种食物，哪组词符合要求？', answer: 'noodles 和 egg', distractors: ['rice 和 noodles', 'chicken 和 egg'], hint: '一项应来自米饭或面条组，另一项来自其他食物组。', explanation: 'noodles 属于米饭或面条组，egg 属于其他食物组。' },
    { knowledgePointIds: [...preferences, ...foodWords], prompt: '小卡记着“喜欢鸡肉”，伙伴要用 Yes, I do. 回答。哪组对话符合记录？', answer: 'Do you like chicken? — Yes, I do.', distractors: ['Do you like egg? — Yes, I do.', 'Do you like chicken? — No, I don’t.'], hint: '同时核对问句里的食物和肯定回答。', explanation: 'chicken 表示鸡肉，Yes, I do. 是肯定回答。' },
    { knowledgePointIds: [...preferences, ...wordOrder], prompt: '词卡是 Do / you / like / fish / ?，哪句排得正确？', answer: 'Do you like fish?', distractors: ['Do fish like you?', 'You like do fish?'], hint: '按 Do、you、like、食物词的顺序排列。', explanation: '正确词序是 Do you like fish?。' },
    { knowledgePointIds: [...foodWords, ...preferences], prompt: '记录A：“Do you like egg?”记录B：“你喜欢鸡蛋吗？”哪项说明两条记录的意思一致？', answer: 'egg 表示鸡蛋；A问的正是B这句话', distractors: ['egg 表示鸡肉；A问的是鸡肉', 'egg 表示米饭；A问的是米饭'], hint: '先核对 egg 的词义，再读整句。', explanation: 'egg 表示鸡蛋，Do you like egg? 是在问“你喜欢鸡蛋吗？”' },
    { knowledgePointIds: [...preferences, ...foodWords], prompt: '同伴回答“No, I don’t.”，题目问的是“Do you like fish?”。哪项既保留问题又配上合适的回答？', answer: 'Do you like fish? — No, I don’t.', distractors: ['Do you like rice? — Yes, I do.', 'Do you like fish? — Yes, I do.'], hint: '检查问题中的食物，再看回答是否是否定。', explanation: 'fish 表示鱼；No, I don’t. 是否定回答。' },
  ],
  high: [
    { knowledgePointIds: [...foodWords, ...foodCategories], prompt: '记录A写“米饭或面条组：rice、noodles”，记录B写“其他食物：chicken、egg”。哪项两组都正确？', answer: 'A：rice、noodles；B：chicken、egg', distractors: ['A：rice、chicken；B：noodles、egg', 'A：chicken、egg；B：rice、noodles'], hint: '分别检查每组名称和其中的词卡。', explanation: 'rice 和 noodles 属于“米饭或面条”组，chicken 和 egg 属于“其他食物”组。' },
    { knowledgePointIds: [...preferences, ...foodWords], prompt: 'A问“Do you like rice?”，B要回答“是的，我喜欢。”哪组对话正确？', answer: 'A: Do you like rice? B: Yes, I do.', distractors: ['A: Do you like rice? B: No, I don’t.', 'A: Do you like noodles? B: Yes, I do.'], hint: '同时核对问题中的食物和回答的肯定意思。', explanation: '问题询问是否喜欢米饭，肯定回答是 Yes, I do.。' },
    { knowledgePointIds: [...wordOrder, ...preferences], prompt: '同伴把问句写成“Do like you egg?”，要保留 egg 并修正词序，哪项正确？', answer: 'Do you like egg?', distractors: ['You like do egg?', 'Do egg you like?'], hint: '问句开头用 Do，接下来按 you、like 的顺序排列。', explanation: 'Do you like egg? 保留了 egg，并按本单元词序排列。' },
    { knowledgePointIds: [...foodWords, ...preferences], prompt: '记录要求先问“你喜欢鸡肉吗？”，再肯定回答。哪组英文符合两步记录？', answer: 'Do you like chicken? — Yes, I do.', distractors: ['Do you like egg? — No, I don’t.', 'Do you like rice? — Yes, I do.'], hint: '先核对问句中的食物，再核对回答是否肯定。', explanation: 'chicken 表示鸡肉，Yes, I do. 表示肯定回答。' },
    { knowledgePointIds: [...foodWords, ...foodCategories], prompt: '同伴把 rice 放入“其他食物”组，把 egg 放入“米饭或面条”组。哪项同时改正两张词卡？', answer: 'rice 放回米饭或面条组，egg 放入其他食物组', distractors: ['rice 和 egg 都放入米饭或面条组', 'rice 放入其他食物组，egg 留在米饭或面条组'], hint: '根据两组名称分别核对 rice 和 egg。', explanation: 'rice 属于“米饭或面条”组，egg 属于“其他食物”组。' },
    { knowledgePointIds: [...preferences], prompt: '对话A的回答是“Yes, I do.”，对话B的回答是“No, I don’t.”。哪项正确说明两句的区别？', answer: 'A表示肯定，B表示否定', distractors: ['A表示否定，B表示肯定', '两句都是问句'], hint: '比较两句开头的 Yes 和 No。', explanation: 'Yes, I do. 是肯定回答；No, I don’t. 是否定回答。' },
    { knowledgePointIds: [...preferences, ...foodWords], prompt: '小卡上是 egg，提问“你喜欢鸡蛋吗？”后，想回答“不，我不喜欢。”应选哪组？', answer: 'Do you like egg? — No, I don’t.', distractors: ['Do you like chicken? — Yes, I do.', 'Do you like egg? — Yes, I do.'], hint: '检查问题里的食物，再检查回答是否表达否定。', explanation: 'egg 表示鸡蛋，No, I don’t. 表示“不，我不喜欢”。' },
    { knowledgePointIds: [...foodWords], prompt: '三张词卡分别是 rice、noodles、chicken。哪项中文顺序对应正确？', answer: '米饭、面条、鸡肉', distractors: ['面条、鸡蛋、米饭', '鸡肉、米饭、鸡蛋'], hint: '按词卡出现的顺序逐个核对词义。', explanation: 'rice、noodles、chicken 分别表示米饭、面条、鸡肉。' },
    { knowledgePointIds: [...foodCategories, ...foodWords], prompt: '六张食物词卡是 rice、noodles、vegetable、fish、chicken、egg。哪项分类符合本单元规则？', answer: 'rice、noodles；vegetable、fish、chicken、egg', distractors: ['rice、fish；noodles、vegetable、chicken、egg', 'chicken、egg；rice、noodles、vegetable、fish'], hint: '先找出分类名称中提到的两种主食，再安排其余词卡。', explanation: 'rice 和 noodles 放在“米饭或面条”组，其余四种属于“其他食物”组。' },
    { knowledgePointIds: [...preferences, ...wordOrder], prompt: '记录为“Do / you / like / noodles / ?”，哪项按正确顺序读出问句？', answer: 'Do you like noodles?', distractors: ['Do noodles like you?', 'You like do noodles?'], hint: '从 Do 开始，按 you、like 和食物词的顺序排列。', explanation: '正确问句是 Do you like noodles?。' },
    { knowledgePointIds: [...foodWords, ...preferences], prompt: '伙伴把“Do you like chicken?”译成“你喜欢鸡蛋吗？”。哪项指出了错误并给出正确意思？', answer: 'chicken 是鸡肉；这句问“你喜欢鸡肉吗？”', distractors: ['chicken 是鸡蛋；这句问“你喜欢鸡蛋吗？”', 'chicken 是米饭；这句问“你喜欢米饭吗？”'], hint: '先核对 chicken 的词义，再读整句。', explanation: 'chicken 表示鸡肉，所以问句是“你喜欢鸡肉吗？”' },
    { knowledgePointIds: [...preferences, ...foodWords], prompt: '小林喜欢面条，想先问伙伴是否也喜欢面条，再说“是的，我喜欢。”哪组句子符合？', answer: 'Do you like noodles? — Yes, I do.', distractors: ['Do you like rice? — No, I don’t.', 'Do you like noodles? — No, I don’t.'], hint: '检查问题里的 noodles，以及回答中的肯定意思。', explanation: '问句询问是否喜欢面条，Yes, I do. 是肯定回答。' },
    { knowledgePointIds: [...foodCategories, ...foodWords], prompt: '记录A把 fish 放在“其他食物”组，记录B把 noodles 放在“米饭或面条”组。哪项同时符合分类规则？', answer: 'A和B都正确', distractors: ['只有A正确', '只有B正确'], hint: '分别对照每个词卡和对应的小组名称。', explanation: 'fish 属于其他食物，noodles 属于米饭或面条组。' },
    { knowledgePointIds: [...preferences, ...wordOrder], prompt: '草稿“you / Do / like / rice / ?”要改成规范问句，哪项只调整了词序？', answer: 'Do you like rice?', distractors: ['Do rice like you?', 'You like rice do?'], hint: '保留原来的词卡，从 Do 开始排列。', explanation: 'Do you like rice? 使用本单元问句顺序，词卡内容不变。' },
    { knowledgePointIds: [...foodWords, ...preferences, ...foodCategories], prompt: '记录说“米饭或面条组里选一种；再问伙伴是否喜欢鸡蛋”。哪项符合两条要求？', answer: '选 noodles；问 Do you like egg?', distractors: ['选 chicken；问 Do you like rice?', '选 egg；问 Do you like chicken?'], hint: '分别核对所选食物的类别和问句最后的词。', explanation: 'noodles 属于米饭或面条组；Do you like egg? 询问是否喜欢鸡蛋。' },
    { knowledgePointIds: [...foodWords, ...foodCategories], prompt: '六张词卡分类后，哪项能从每组各举出一个例子？', answer: 'rice 和 vegetable', distractors: ['rice 和 noodles', 'chicken 和 egg'], hint: '先确定哪个词来自主食组，哪个词来自其他食物组。', explanation: 'rice 属于米饭或面条组，vegetable 属于其他食物组。' },
    { knowledgePointIds: [...preferences, ...foodWords], prompt: 'A问“Do you like noodles?”，B回答“No, I don’t.”。哪项准确说出对话内容？', answer: 'A问是否喜欢面条，B回答不喜欢', distractors: ['A问是否喜欢鸡肉，B回答喜欢', 'A回答是否喜欢面条，B提出问题'], hint: '先读懂问句，再辨认回答是肯定还是否定。', explanation: 'noodles 表示面条，No, I don’t. 表示否定回答。' },
    { knowledgePointIds: [...foodWords, ...foodCategories, ...preferences], prompt: '一张记录写着“egg 属于其他食物；Do you like egg? 是在问喜好”。哪项核对结果正确？', answer: '两条记录都正确', distractors: ['只有食物分类正确', '只有问句用途正确'], hint: '分别检查 egg 的分类和问句的交际作用。', explanation: 'egg 属于其他食物组，Do you like egg? 用来询问是否喜欢鸡蛋。' },
  ],
};

function createActivity(draft: ActivityDraft, difficulty: Difficulty, index: number): Grade1Term2EnglishUnit04SupplementalActivity {
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

export const grade1Term2EnglishUnit04SupplementalActivities = (Object.entries(drafts) as [Difficulty, ActivityDraft[]][])
  .flatMap(([difficulty, items]) => items.map((draft, index) => createActivity(draft, difficulty, index)));
