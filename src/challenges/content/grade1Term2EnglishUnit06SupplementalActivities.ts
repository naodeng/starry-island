import type { ChoiceActivityDefinition, Difficulty } from '../../content/types';

interface ActivityDraft {
  knowledgePointIds: string[];
  prompt: string;
  answer: string;
  distractors: [string, string];
  hint: string;
  explanation: string;
}

export interface Grade1Term2EnglishUnit06SupplementalActivity {
  difficulty: Difficulty;
  sourceUnitId: string;
  knowledgePointIds: string[];
  activity: ChoiceActivityDefinition;
}

const sourceUnitId = 'grade-1/term-2/english/unit-06';
const idPrefix = 'challenge-supplement-grade-1-term-2-english-unit-06';
const words = ['clothes-word-meanings'];
const categories = ['clothes-category-classification'];
const sentences = ['clothes-description-sentences'];
const wordOrder = ['clothes-description-word-order'];

const drafts: Record<Difficulty, ActivityDraft[]> = {
  basic: [
    { knowledgePointIds: [...words], prompt: 'shirt 的中文意思是什么？', answer: '衬衫', distractors: ['T 恤衫', '裙子'], hint: '回想本单元的衣物词卡。', explanation: 'shirt 表示“衬衫”。' },
    { knowledgePointIds: [...words], prompt: '哪个英文词表示“T 恤衫”？', answer: 'T-shirt', distractors: ['shirt', 'skirt'], hint: '注意这个词中间有一个连字符。', explanation: 'T-shirt 表示“T 恤衫”。' },
    { knowledgePointIds: [...words], prompt: 'skirt 的意思是什么？', answer: '裙子', distractors: ['连衣裙', '袜子'], hint: '在衣物词卡中找出对应的中文意思。', explanation: 'skirt 表示“裙子”。' },
    { knowledgePointIds: [...words], prompt: '“连衣裙”对应哪个英文词？', answer: 'dress', distractors: ['skirt', 'shirt'], hint: '它和 skirt 表示两种不同的衣物。', explanation: 'dress 表示“连衣裙”。' },
    { knowledgePointIds: [...words], prompt: 'socks 表示什么？', answer: '袜子', distractors: ['短裤', '衬衫'], hint: '想一想穿在脚上的衣物。', explanation: 'socks 表示“袜子”。' },
    { knowledgePointIds: [...words], prompt: '哪个词表示“短裤”？', answer: 'shorts', distractors: ['socks', 'skirt'], hint: '注意它和 socks 是不同的衣物词。', explanation: 'shorts 表示“短裤”。' },
    { knowledgePointIds: [...words, ...categories], prompt: '哪两个词表示上衣？', answer: 'shirt 和 T-shirt', distractors: ['skirt 和 dress', 'socks 和 shorts'], hint: '回想本单元“上衣”这一组的两张词卡。', explanation: 'shirt 和 T-shirt 都表示上衣。' },
    { knowledgePointIds: [...words, ...categories], prompt: '哪一组都是“其他衣物”？', answer: 'skirt 和 dress', distractors: ['shirt 和 T-shirt', 'T-shirt 和 socks'], hint: '先把上衣的两个词放在一起，再看剩下的衣物。', explanation: 'skirt 和 dress 都属于“其他衣物”。' },
    { knowledgePointIds: [...words, ...sentences], prompt: '“This is my shirt.” 是什么意思？', answer: '这是我的衬衫。', distractors: ['这是我的裙子。', '这是我的连衣裙。'], hint: '认出句子最后的衣物词。', explanation: 'shirt 表示衬衫，所以 This is my shirt. 是“这是我的衬衫。”' },
    { knowledgePointIds: [...words, ...sentences], prompt: '想说“这是我的 T 恤衫”，应选哪句话？', answer: 'This is my T-shirt.', distractors: ['This is my shirt.', 'This is my dress.'], hint: '在句子最后选择表示 T 恤衫的词。', explanation: 'This is my T-shirt. 的意思是“这是我的 T 恤衫。”' },
    { knowledgePointIds: [...words, ...sentences], prompt: '要把 skirt 放进“This is my ___.”，空格填什么？', answer: 'skirt', distractors: ['shirt', 'dress'], hint: '空格应填题目指定的衣物词。', explanation: 'skirt 填入后是 This is my skirt.' },
    { knowledgePointIds: [...words, ...sentences], prompt: '想介绍一件连衣裙，句子末尾应选哪个词？', answer: 'dress', distractors: ['skirt', 'shirt'], hint: '找出表示“连衣裙”的词。', explanation: 'dress 表示连衣裙，句子可以说 This is my dress.' },
    { knowledgePointIds: [...words], prompt: '哪张词卡与“衬衫”配对正确？', answer: 'shirt', distractors: ['dress', 'shorts'], hint: '核对四张主要衣物词卡的中文意思。', explanation: 'shirt 对应“衬衫”。' },
    { knowledgePointIds: [...words, ...categories], prompt: '与 shorts 同属“其他衣物”的词是哪一个？', answer: 'dress', distractors: ['shirt', 'T-shirt'], hint: '回想衣物分组，再找一张与短裤同组的词卡。', explanation: 'dress 和 shorts 都属于“其他衣物”。' },
  ],
  advanced: [
    { knowledgePointIds: [...words], prompt: '哪组中文意思依次对应 shirt 和 T-shirt？', answer: '衬衫和 T 恤衫', distractors: ['裙子和连衣裙', '袜子和短裤'], hint: '按题目给出的英文顺序核对词义。', explanation: 'shirt 表示衬衫，T-shirt 表示 T 恤衫。' },
    { knowledgePointIds: [...words], prompt: '哪组衣物词与中文意思都配对正确？', answer: 'skirt—裙子；dress—连衣裙', distractors: ['skirt—连衣裙；dress—裙子', 'skirt—衬衫；dress—短裤'], hint: '分别读出两个英文词，再检查中文意思。', explanation: 'skirt 是裙子，dress 是连衣裙。' },
    { knowledgePointIds: [...words, ...categories], prompt: '衣物名称 shirt 和 T-shirt 应放在哪类？', answer: '上衣', distractors: ['其他衣物', '句子'], hint: '对照本单元给衣物分组的规则判断。', explanation: 'shirt 和 T-shirt 都是上衣。' },
    { knowledgePointIds: [...words, ...categories], prompt: '哪组词卡都应放入“其他衣物”？', answer: 'socks 和 shorts', distractors: ['shirt 和 skirt', 'T-shirt 和 dress'], hint: '这两张卡都不属于 shirt、T-shirt 所在的上衣组。', explanation: 'socks 和 shorts 都属于“其他衣物”。' },
    { knowledgePointIds: [...words, ...sentences, ...wordOrder], prompt: '词卡是 my / skirt / This / is / .，哪句话排列后能表达“这是我的裙子”？', answer: 'This is my skirt.', distractors: ['This my is skirt.', 'My is skirt This.'], hint: '句子从 This is my 开始，再接表示裙子的词。', explanation: '正确词序是 This is my skirt.' },
    { knowledgePointIds: [...words, ...sentences], prompt: '要表达“这是我的连衣裙”，有人写了“This is my skirt.”，应换掉哪个词？', answer: '把 skirt 换成 dress', distractors: ['把 This 换成 dress', '把 my 换成 dress'], hint: '保留句子的开头，只检查表示衣物的词。', explanation: 'dress 表示连衣裙，应把 skirt 换成 dress。' },
    { knowledgePointIds: [...words, ...sentences], prompt: '读到“This is my shirt.”，句子介绍的是哪件衣物？', answer: '衬衫', distractors: ['裙子', '短裤'], hint: '把句子最后的英文词和中文意思对应起来。', explanation: 'shirt 表示衬衫。' },
    { knowledgePointIds: [...words, ...sentences], prompt: '读到“This is my T-shirt.”，句子介绍的是哪件衣物？', answer: 'T 恤衫', distractors: ['衬衫', '袜子'], hint: '留意句子最后的衣物词。', explanation: 'T-shirt 表示 T 恤衫。' },
    { knowledgePointIds: [...words], prompt: '哪一对英文词和中文意思配对正确？', answer: 'shirt—衬衫', distractors: ['shirt—裙子', 'shirt—短裤'], hint: '想一想 shirt 对应的中文词卡。', explanation: 'shirt 对应“衬衫”。' },
    { knowledgePointIds: [...words], prompt: '哪组配对把两种衣物都说对了？', answer: 'socks—袜子；shorts—短裤', distractors: ['socks—短裤；shorts—袜子', 'socks—裙子；shorts—连衣裙'], hint: '注意 socks 和 shorts 的拼写不同，意思也不同。', explanation: 'socks 表示袜子，shorts 表示短裤。' },
    { knowledgePointIds: [...words], prompt: '有张词卡把 shirt 配成“裙子”，应怎样改？', answer: '把“裙子”改成“衬衫”', distractors: ['把“衬衫”改成“短裤”', '把“裙子”改成“袜子”'], hint: '根据 shirt 的中文意思检查这张卡。', explanation: 'shirt 表示衬衫，应把配对改成 shirt—衬衫。' },
    { knowledgePointIds: [...words], prompt: '一张 T-shirt 词卡旁边写着“连衣裙”，正确的中文意思是什么？', answer: 'T 恤衫', distractors: ['连衣裙', '裙子'], hint: '核对 T-shirt 的词义，不要和 dress 混淆。', explanation: 'T-shirt 表示 T 恤衫。' },
    { knowledgePointIds: [...words, ...categories], prompt: '裙子、连衣裙、袜子和短裤应放在哪类？', answer: '其他衣物', distractors: ['上衣', '衣物名称以外的一类'], hint: '逐个检查它们是否属于 shirt、T-shirt 组成的上衣组。', explanation: '这四种衣物都属于“其他衣物”。' },
    { knowledgePointIds: [...words, ...categories], prompt: '哪两张卡各代表一件上衣和一件其他衣物？', answer: 'T-shirt 和 dress', distractors: ['shirt 和 T-shirt', 'skirt 和 shorts'], hint: '选择一张上衣词卡和一张其他衣物词卡。', explanation: 'T-shirt 是上衣，dress 属于其他衣物。' },
    { knowledgePointIds: [...words, ...sentences], prompt: '句子“This is my ___.”要介绍衬衫，空格应填什么？', answer: 'shirt', distractors: ['skirt', 'dress'], hint: '把中文衣物名称先对应到英文词。', explanation: 'shirt 表示衬衫，句子应为 This is my shirt.' },
    { knowledgePointIds: [...words, ...sentences], prompt: '哪句话介绍的是一件连衣裙？', answer: 'This is my dress.', distractors: ['This is my skirt.', 'This is my shirt.'], hint: '辨认句子最后的衣物词。', explanation: 'dress 表示连衣裙。' },
    { knowledgePointIds: [...words, ...sentences], prompt: '要介绍 T 恤衫，句子“This is my skirt.”中哪个衣物词应替换？', answer: '把 skirt 换成 T-shirt', distractors: ['把 This 换成 T-shirt', '把 my 换成 T-shirt'], hint: '保留 This is my，只替换表示衣物的词。', explanation: '把 skirt 换成 T-shirt 后，句子是 This is my T-shirt.' },
    { knowledgePointIds: [...words], prompt: 'T-shirt 和 dress 的中文意思依次是什么？', answer: 'T 恤衫和连衣裙', distractors: ['衬衫和裙子', '短裤和袜子'], hint: '按词卡先后顺序读出中文意思。', explanation: 'T-shirt 是 T 恤衫，dress 是连衣裙。' },
    { knowledgePointIds: [...words, ...categories], prompt: '两张分类卡要分别放入“上衣”和“其他衣物”，哪组正确？', answer: 'shirt—上衣；skirt—其他衣物', distractors: ['shirt—其他衣物；skirt—上衣', 'shirt—上衣；T-shirt—其他衣物'], hint: '分别核对 shirt 和 skirt 所属的两组。', explanation: 'shirt 是上衣，skirt 属于其他衣物。' },
    { knowledgePointIds: [...words, ...sentences], prompt: '要同时写出“衬衫”的英文词和介绍它的句子，哪项都正确？', answer: 'shirt；This is my shirt.', distractors: ['skirt；This is my dress.', 'shorts；This is my T-shirt.'], hint: '先检查词卡意思，再检查句子最后的衣物词。', explanation: 'shirt 表示衬衫，This is my shirt. 介绍的是衬衫。' },
    { knowledgePointIds: [...words], prompt: '三张配对卡已写好：shirt—衬衫、T-shirt—T 恤衫、dress—？。空格应填什么？', answer: '连衣裙', distractors: ['裙子', '短裤'], hint: '逐个核对每张英文词卡对应的中文意思。', explanation: 'dress 表示连衣裙。' },
    { knowledgePointIds: [...words], prompt: '卡片写着“skirt—连衣裙”，要改正中文意思，应换成什么？', answer: '裙子', distractors: ['衬衫', '袜子'], hint: '不要把 skirt 和 dress 的意思弄混。', explanation: 'skirt 表示裙子。' },
  ],
  high: [
    { knowledgePointIds: [...words], prompt: '要检查两张词卡，哪一组英文和中文都配对正确？', answer: 'skirt—裙子；dress—连衣裙', distractors: ['skirt—连衣裙；dress—裙子', 'skirt—短裤；dress—袜子'], hint: '将两张卡的英文词分别和中文意思核对。', explanation: 'skirt 表示裙子，dress 表示连衣裙。' },
    { knowledgePointIds: [...words, ...categories], prompt: '上衣组已经有 shirt 和 T-shirt，哪张卡不应放进这一组？', answer: 'skirt', distractors: ['shirt', 'T-shirt'], hint: '检查每个词是否属于本单元的上衣。', explanation: 'skirt 表示裙子，属于其他衣物。' },
    { knowledgePointIds: [...words, ...categories], prompt: '要给“其他衣物”组再添一张卡，哪张合适？', answer: 'dress', distractors: ['shirt', 'T-shirt'], hint: '先排除上衣组中的两个词。', explanation: 'dress 表示连衣裙，属于其他衣物。' },
    { knowledgePointIds: [...words, ...categories], prompt: '有人把 socks 和 shorts 都放进“上衣”，哪项检查结果正确？', answer: '两张都应改放到“其他衣物”', distractors: ['socks 留在上衣，shorts 改到其他衣物', '两张都应留在上衣'], hint: '分别回想袜子和短裤在本单元中的分组。', explanation: 'socks 和 shorts 都不属于上衣，应放入“其他衣物”。' },
    { knowledgePointIds: [...words, ...categories], prompt: '一个衣物盒中有 shirt、T-shirt、skirt，哪张卡和另外两张不在同一组？', answer: 'skirt', distractors: ['shirt', 'T-shirt'], hint: '比较三张卡所属的衣物类别。', explanation: 'shirt 和 T-shirt 是上衣；skirt 属于其他衣物。' },
    { knowledgePointIds: [...words, ...categories], prompt: '短裤、裙子、连衣裙和袜子应放在什么类别？', answer: '其他衣物', distractors: ['上衣', '只放短裤的一类'], hint: '对照 shirt 和 T-shirt 所在的分类组。', explanation: '这四种都属于“其他衣物”。' },
    { knowledgePointIds: [...words], prompt: '哪条记录正确写出了 shirt 和 T-shirt 的中文意思？', answer: 'shirt—衬衫；T-shirt—T 恤衫', distractors: ['shirt—T 恤衫；T-shirt—衬衫', 'shirt—裙子；T-shirt—连衣裙'], hint: '分别核对两种上衣词卡。', explanation: 'shirt 是衬衫，T-shirt 是 T 恤衫。' },
    { knowledgePointIds: [...words, ...sentences], prompt: '句子“This is my T-shirt.”旁边误写了“这是我的衬衫”，应改成什么？', answer: '这是我的 T 恤衫。', distractors: ['这是我的裙子。', '这是我的袜子。'], hint: '检查句子最后一个英文词的中文意思。', explanation: 'T-shirt 表示 T 恤衫。' },
    { knowledgePointIds: [...words, ...sentences], prompt: '要用句子介绍 dress，哪句话的衣物词与目标一致？', answer: 'This is my dress.', distractors: ['This is my skirt.', 'This is my shirt.'], hint: '句子最后的英文词需要表示连衣裙。', explanation: 'dress 表示连衣裙，因此选 This is my dress.' },
    { knowledgePointIds: [...words, ...sentences], prompt: '读句子“This is my shirt.”，哪项同时说对了它介绍的衣物？', answer: 'shirt，意思是衬衫', distractors: ['skirt，意思是裙子', 'dress，意思是连衣裙'], hint: '读出句子最后的词，再对应它的中文意思。', explanation: 'shirt 表示衬衫。' },
    { knowledgePointIds: [...words, ...categories], prompt: '要各选一张“上衣”和“其他衣物”词卡，哪组符合分类？', answer: 'T-shirt；socks', distractors: ['shirt；T-shirt', 'skirt；dress'], hint: '第一张应属于上衣，第二张应属于其他衣物。', explanation: 'T-shirt 是上衣，socks 属于其他衣物。' },
    { knowledgePointIds: [...words, ...sentences], prompt: '想介绍一件裙子，不小心选了“This is my dress.”。应把句尾哪个词换掉？', answer: '把 dress 换成 skirt', distractors: ['把 dress 换成 shirt', '把 dress 换成 shorts'], hint: '先确认中文“裙子”对应的英文词。', explanation: 'skirt 表示裙子，所以句子应为 This is my skirt.' },
    { knowledgePointIds: [...words, ...categories], prompt: '检查四张卡：shirt、T-shirt、dress、shorts。哪项分类都正确？', answer: 'shirt 和 T-shirt 是上衣；dress 和 shorts 是其他衣物', distractors: ['shirt 和 dress 是上衣；T-shirt 和 shorts 是其他衣物', '四张卡都属于上衣'], hint: '逐张按本单元的两类衣物检查。', explanation: 'shirt、T-shirt 是上衣；dress、shorts 属于其他衣物。' },
    { knowledgePointIds: [...words, ...sentences], prompt: '选择介绍“这是我的衬衫”的句子，并指出其中的衣物词。', answer: 'This is my shirt.；shirt', distractors: ['This is my skirt.；shirt', 'This is my shirt.；dress'], hint: '句子和指出的词都要对应“衬衫”。', explanation: 'This is my shirt. 介绍衬衫，其中的衣物词是 shirt。' },
    { knowledgePointIds: [...words, ...wordOrder], prompt: '打乱的词卡是 my / shirt / This / is / .，哪句顺序正确？', answer: 'This is my shirt.', distractors: ['This my is shirt.', 'My is This shirt.'], hint: '句子从 This 开始，衣物词放在 my 后面。', explanation: '正确词序是 This is my shirt.' },
    { knowledgePointIds: [...words, ...wordOrder], prompt: '要用 T-shirt 介绍衣物，哪组词卡顺序正确？', answer: 'This is my T-shirt.', distractors: ['This my T-shirt is.', 'My This is T-shirt.'], hint: '先排 This is my，再接衣物词。', explanation: '正确词序是 This is my T-shirt.' },
    { knowledgePointIds: [...words, ...wordOrder], prompt: '哪张句卡按正确顺序写出了“这是我的裙子”？', answer: 'This is my skirt.', distractors: ['This my skirt is.', 'My is skirt This.'], hint: '先放 This is my，最后放表示裙子的词。', explanation: '正确词序是 This is my skirt.' },
    { knowledgePointIds: [...words], prompt: '哪条记录同时正确写出 shorts 和 shirt 的中文意思？', answer: 'shorts—短裤；shirt—衬衫', distractors: ['shorts—袜子；shirt—裙子', 'shorts—裙子；shirt—短裤'], hint: '分别核对两张英文词卡对应的中文意思。', explanation: 'shorts 表示短裤，shirt 表示衬衫。' },
    { knowledgePointIds: [...words, ...sentences], prompt: '原句“This is my shirt.”要改成介绍 T-shirt，只需换掉哪个衣物词？', answer: '把 shirt 换成 T-shirt', distractors: ['把 This 换成 T-shirt', '把 my 换成 T-shirt'], hint: '保留句子开头和 my，只替换表示衣物的词。', explanation: '把 shirt 换成 T-shirt 后，句子是 This is my T-shirt.' },
    { knowledgePointIds: [...words, ...sentences], prompt: '检查“This is my T-shirt.”和目标“这是我的 T 恤衫”，哪项判断正确？', answer: '句子中的 T-shirt 与目标衣物一致', distractors: ['句子介绍的是裙子', '句子介绍的是衬衫'], hint: '先看英文句子的衣物词，再对照中文目标。', explanation: 'T-shirt 表示 T 恤衫，句子与目标一致。' },
  ],
};

function createActivity(draft: ActivityDraft, difficulty: Difficulty, index: number): Grade1Term2EnglishUnit06SupplementalActivity {
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

export const grade1Term2EnglishUnit06SupplementalActivities = (Object.entries(drafts) as [Difficulty, ActivityDraft[]][])
  .flatMap(([difficulty, items]) => items.map((draft, index) => createActivity(draft, difficulty, index)));
