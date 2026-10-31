import type { ChoiceActivityDefinition, Difficulty } from '../../content/types';

interface ActivityDraft {
  knowledgePointIds: string[];
  prompt: string;
  answer: string;
  distractors: [string, string];
  hint: string;
  explanation: string;
}

export interface Grade1Term2EnglishUnit05SupplementalActivity {
  difficulty: Difficulty;
  sourceUnitId: string;
  knowledgePointIds: string[];
  activity: ChoiceActivityDefinition;
}

const sourceUnitId = 'grade-1/term-2/english/unit-05';
const idPrefix = 'challenge-supplement-grade-1-term-2-english-unit-05';
const words = ['drink-word-meanings'];
const categories = ['drink-category-classification'];
const requests = ['drink-polite-requests'];
const wordOrder = ['drink-request-word-order'];

const drafts: Record<Difficulty, ActivityDraft[]> = {
  basic: [
    { knowledgePointIds: [...words], prompt: 'water 表示哪种饮品？', answer: '水', distractors: ['果汁', '茶'], hint: '回想本单元的饮品词卡。', explanation: 'water 表示“水”。' },
    { knowledgePointIds: [...words], prompt: '哪个英文词的意思是“果汁”？', answer: 'juice', distractors: ['water', 'milk'], hint: '核对表示果汁的英文词。', explanation: 'juice 表示“果汁”。' },
    { knowledgePointIds: [...words], prompt: 'milk 的中文意思是什么？', answer: '牛奶', distractors: ['茶', '水'], hint: '想一想早餐时常见的饮品。', explanation: 'milk 表示“牛奶”。' },
    { knowledgePointIds: [...words], prompt: '“茶”对应哪个英文词？', answer: 'tea', distractors: ['juice', 'milk'], hint: '在四张词卡中找出对应茶的词。', explanation: 'tea 表示“茶”。' },
    { knowledgePointIds: [...words, ...categories], prompt: '下面哪一对都是饮品词语？', answer: 'water 和 milk', distractors: ['Can I have tea? 和 juice', 'Can I have water? 和 tea'], hint: '区分饮品名称和完整请求句。', explanation: 'water 和 milk 都是饮品名称。' },
    { knowledgePointIds: [...categories, ...requests], prompt: '“Can I have tea?” 应放在哪类词卡中？', answer: '礼貌请求句', distractors: ['饮品词语', '颜色词语'], hint: '读一读整句话，判断它是在说饮品名称还是提出请求。', explanation: 'Can I have tea? 是礼貌地请求喝茶。' },
    { knowledgePointIds: [...words, ...requests], prompt: '“Can I have water?” 的意思是什么？', answer: '我可以喝点水吗？', distractors: ['我可以喝点果汁吗？', '我可以喝点牛奶吗？'], hint: '先认出问句末尾的饮品名称。', explanation: 'Can I have water? 是“我可以喝点水吗？”' },
    { knowledgePointIds: [...words, ...requests], prompt: '想礼貌地要果汁，哪句话符合这个情境？', answer: 'Can I have juice?', distractors: ['Can I have water?', 'Can I have milk?'], hint: '先确认情境中需要哪种饮品。', explanation: 'Can I have juice? 可以礼貌地请求果汁。' },
    { knowledgePointIds: [...words, ...requests], prompt: '小朋友想礼貌地要牛奶，应该选哪句？', answer: 'Can I have milk?', distractors: ['Can I have tea?', 'Can I have water?'], hint: '把需要的饮品词放进请求句。', explanation: 'Can I have milk? 可以礼貌地请求牛奶。' },
    { knowledgePointIds: [...words, ...requests], prompt: '哪句是在礼貌地请求水？', answer: 'Can I have water?', distractors: ['Can I have juice?', 'Can I have milk?'], hint: '找出句子中表示水的词。', explanation: 'water 表示水，Can I have water? 是礼貌请求。' },
    { knowledgePointIds: [...requests, ...wordOrder], prompt: '词卡顺序是 have / Can / tea / I / ?，哪句词序正确？', answer: 'Can I have tea?', distractors: ['Can have I tea?', 'Have I Can tea?'], hint: '问句从 Can 开始，接着排列 I 和 have。', explanation: '请求句的正确词序是 Can I have tea?。' },
    { knowledgePointIds: [...words, ...requests], prompt: '“Can I have milk?” 可以用来做什么？', answer: '礼貌地请求牛奶', distractors: ['说自己喜欢牛奶', '询问牛奶的颜色'], hint: '看看句子是不是在询问能否得到一种饮品。', explanation: 'Can I have milk? 用来礼貌地请求牛奶。' },
    { knowledgePointIds: [...words, ...requests], prompt: '有人想礼貌地要茶喝，哪张句卡最合适？', answer: 'Can I have tea?', distractors: ['Can I have water?', 'Have I tea?'], hint: '检查请求句中的饮品词是否符合情境。', explanation: 'tea 表示茶，Can I have tea? 符合要茶喝的情境。' },
    { knowledgePointIds: [...words, ...requests, ...wordOrder], prompt: '哪张问句卡把 water 放在 have 后面，并以问号结尾？', answer: 'Can I have water?', distractors: ['Can water have I?', 'I have water Can?'], hint: '按请求句的词序读一遍，再检查末尾标点。', explanation: 'Can I have water? 的词序和问号都正确。' },
  ],
  advanced: [
    { knowledgePointIds: [...words], prompt: '哪一组中文意思依次对应 milk 和 tea？', answer: '牛奶和茶', distractors: ['水和茶', '果汁和牛奶'], hint: '分别回忆两个英文词卡的意思。', explanation: 'milk 表示牛奶，tea 表示茶。' },
    { knowledgePointIds: [...words, ...requests], prompt: '读句卡“Can I have juice?”，哪项说出了它的请求内容？', answer: '“Can I have juice?”是请求喝果汁', distractors: ['“Can I have juice?”是询问果汁颜色', '“Can I have juice?”是说我喜欢水'], hint: '先读懂 juice 的意思，再判断整句用途。', explanation: 'juice 表示果汁，Can I have juice? 是礼貌地请求果汁。' },
    { knowledgePointIds: [...words], prompt: '两张词卡的配对都正确的是哪一项？', answer: 'milk—牛奶；water—水', distractors: ['milk—茶；water—果汁', 'milk—水；water—牛奶'], hint: '分别核对 milk 和 water 的中文意思。', explanation: 'milk 对应牛奶，water 对应水。' },
    { knowledgePointIds: [...words, ...categories], prompt: '哪组卡片全部是饮品名称，没有混入请求句？', answer: 'water 和 juice', distractors: ['Can I have tea? 和 water', 'Can I have milk? 和 juice'], hint: '检查每项是一个饮品词，还是一整句请求。', explanation: 'water 和 juice 都是饮品名称。' },
    { knowledgePointIds: [...categories, ...requests], prompt: '“Can I have tea?” 的句子类别是什么？', answer: '礼貌请求句', distractors: ['饮品词语', '颜色描述句'], hint: '这张卡表达的是一句完整的话。', explanation: 'Can I have tea? 用来礼貌地请求饮品。' },
    { knowledgePointIds: [...words, ...requests], prompt: '“Can I have milk?” 可以怎样翻译？', answer: '我可以喝点牛奶吗？', distractors: ['我可以喝点茶吗？', '我喜欢牛奶。'], hint: '先认出 milk，再留意句子是在提出请求。', explanation: 'milk 表示牛奶，整句是在礼貌地询问能否喝牛奶。' },
    { knowledgePointIds: [...words, ...requests], prompt: '在茶水桌前想礼貌地要茶，哪句符合要求？', answer: 'Can I have tea?', distractors: ['Can I have milk?', 'Can I have juice?'], hint: '请求句要包含 tea，并保留完整问句。', explanation: 'Can I have tea? 用于礼貌地请求茶。' },
    { knowledgePointIds: [...words, ...categories, ...requests], prompt: '哪两张卡都属于礼貌请求句？', answer: 'Can I have water? 和 Can I have tea?', distractors: ['water 和 milk', 'Can I have juice? 和 tea'], hint: '比较卡片是完整问句还是饮品名称。', explanation: 'Can I have water? 和 Can I have tea? 都是在礼貌地请求饮品。' },
    { knowledgePointIds: [...words], prompt: '同伴写成“juice—茶”，怎样改正这张词卡？', answer: 'juice—果汁', distractors: ['juice—牛奶', 'juice—水'], hint: '回忆 juice 对应的中文饮品名称。', explanation: 'juice 应与“果汁”配对。' },
    { knowledgePointIds: [...requests, ...wordOrder], prompt: '词卡是 milk / ? / have / I / Can，按正确顺序组成哪句？', answer: 'Can I have milk?', distractors: ['Can have I milk?', 'I Can milk have?'], hint: '先放请求句开头的 Can，再排列 I 和 have。', explanation: '正确词序是 Can I have milk?。' },
    { knowledgePointIds: [...words, ...requests], prompt: '要礼貌地请求水，哪句话把 water 放在正确位置？', answer: 'Can I have water?', distractors: ['Can I water have?', 'Have I Can water?'], hint: '饮品词跟在 have 后面。', explanation: 'Can I have water? 用正确词序礼貌地请求水。' },
    { knowledgePointIds: [...words, ...requests], prompt: '看到句卡“Can I have milk?”，哪句话说明了它的意思？', answer: '我可以喝点牛奶吗？', distractors: ['牛奶是什么颜色？', '我喜欢喝茶。'], hint: '逐个读懂句子中的请求词和饮品词。', explanation: 'Can I have milk? 是礼貌地询问能否喝牛奶。' },
    { knowledgePointIds: [...words], prompt: '记录A写 milk—牛奶，记录B写 tea—果汁。哪项只改正B？', answer: 'A保留 milk—牛奶；B改为 tea—茶', distractors: ['A改为 milk—茶；B保留 tea—果汁', 'A保留 milk—牛奶；B改为 tea—水'], hint: '先确认A，再单独核对B中的 tea。', explanation: 'A的配对正确；tea 表示茶，因此B应改成 tea—茶。' },
    { knowledgePointIds: [...categories, ...requests], prompt: '“Can I have juice?” 和 “Can I have milk?” 都是什么类型的句子？', answer: '两句都在礼貌地请求饮品', distractors: ['两句都是饮品名称', '两句都在询问颜色'], hint: '注意两句都以问号结尾，并使用相同的请求开头。', explanation: '两句话都用 Can I have…? 礼貌地请求饮品。' },
    { knowledgePointIds: [...words, ...categories, ...requests], prompt: '哪项同时正确说明 water 和 Can I have water?？', answer: 'water 是饮品词，Can I have water? 是礼貌请求', distractors: ['water 是请求句，Can I have water? 是饮品词', '两项都是饮品名称'], hint: '分别判断一个词和一整句的类别。', explanation: 'water 是表示水的饮品词；Can I have water? 是请求句。' },
    { knowledgePointIds: [...words, ...requests, ...wordOrder], prompt: '把 juice 放在 have 后面，哪张词卡是完整的礼貌问句？', answer: 'Can I have juice?', distractors: ['Can juice have I?', 'I Can juice have?'], hint: '请求句按 Can、I、have、饮品词排列。', explanation: 'Can I have juice? 的词序正确，是完整请求问句。' },
    { knowledgePointIds: [...words, ...requests], prompt: '伙伴要茶，不是水。哪句请求符合他的需要？', answer: 'Can I have tea?', distractors: ['Can I have water?', 'Can I have milk?'], hint: '对照情境要求和问句里的饮品词。', explanation: 'tea 表示茶，Can I have tea? 符合要茶的情境。' },
    { knowledgePointIds: [...words, ...categories, ...requests], prompt: '哪项把两种饮品词和一张请求句卡分得正确？', answer: 'water 和 milk；Can I have tea?', distractors: ['Can I have water? 和 milk；tea', 'water 和 Can I have milk?；tea'], hint: '把单个饮品名称与完整问句分开。', explanation: 'water、milk 是饮品词，Can I have tea? 是礼貌请求句。' },
    { knowledgePointIds: [...words, ...requests], prompt: '同伴读到“Can I have tea?”，哪项说明了句子的用途？', answer: '“Can I have tea?”用于礼貌地要茶', distractors: ['“Can I have tea?”表示茶的颜色', '“Can I have tea?”表示我有一杯水'], hint: '结合开头的请求表达和 tea 的词义判断。', explanation: 'Can I have tea? 是礼貌地请求喝茶。' },
    { knowledgePointIds: [...words, ...categories], prompt: '两张分类标签分别是“饮品词语”和“礼貌请求句”，哪项说出它们的区别？', answer: '饮品词语和礼貌请求句', distractors: ['两种不同的饮品', '两种颜色描述'], hint: '一个标签说的是单词，另一个标签说的是完整句子。', explanation: 'water、juice 等是饮品词语；Can I have…? 是礼貌请求句。' },
  ],
  high: [
    { knowledgePointIds: [...words, ...categories, ...requests], prompt: '核对两张记录：A“water—水”；B“Can I have tea?—礼貌请求”。哪项两条都正确？', answer: 'water—水；Can I have tea?—礼貌请求', distractors: ['water—茶；Can I have tea?—饮品词语', 'water—水；Can I have tea?—颜色描述'], hint: '分别检查词义和完整句子的用途。', explanation: 'water 表示水；Can I have tea? 是礼貌请求句。' },
    { knowledgePointIds: [...words, ...requests], prompt: '记录要求“juice 表示果汁”，并用问句礼貌地要牛奶。哪项符合两项要求？', answer: 'juice—果汁；Can I have milk?', distractors: ['juice—牛奶；Can I have tea?', 'juice—果汁；Have I Can milk?'], hint: '先核对 juice 的词义，再检查请求句中的饮品。', explanation: 'juice 表示果汁；Can I have milk? 礼貌地请求牛奶。' },
    { knowledgePointIds: [...words, ...requests], prompt: '卡片内容是 milk 和“我想礼貌地要牛奶”。哪组选词与句子都对？', answer: 'milk—牛奶；Can I have milk?', distractors: ['milk—茶；Can I have water?', 'milk—牛奶；Can have I milk?'], hint: '两部分都要对应牛奶，并检查问句词序。', explanation: 'milk 表示牛奶；正确请求句是 Can I have milk?。' },
    { knowledgePointIds: [...words, ...requests], prompt: '要先读懂 tea，再礼貌地请求水喝，哪条记录正确？', answer: 'tea—茶；Can I have water?', distractors: ['tea—水；Can I have milk?', 'tea—茶；Can water I have?'], hint: '分别核对 tea 的中文意思和 water 请求句。', explanation: 'tea 表示茶；请求水的词序是 Can I have water?。' },
    { knowledgePointIds: [...words, ...categories, ...requests], prompt: '哪项把四个饮品词放在一组，并把两张完整问句放在另一组？', answer: 'water、juice、milk、tea；Can I have water?、Can I have tea?', distractors: ['water、juice、Can I have milk?、tea；Can I have water?、milk', 'Can I have water?、Can I have tea?；water、juice、milk、tea'], hint: '先找出四个单词，再识别两张句子卡。', explanation: '四个单词是饮品词，两句 Can I have…? 是礼貌请求句。' },
    { knowledgePointIds: [...words, ...requests, ...wordOrder], prompt: '草稿写成“Can have I milk?”，要保留 milk 并改成请求问句，选哪句？', answer: 'Can I have milk?', distractors: ['Can milk I have?', 'I have Can milk?'], hint: '把 Can 放在开头，再按 I、have 的顺序排列。', explanation: '正确词序是 Can I have milk?。' },
    { knowledgePointIds: [...words, ...requests], prompt: '同伴把“Can I have water?”解释为“我可以喝点牛奶吗？”。哪项修正准确？', answer: '“Can I have water?”应译为“我可以喝点水吗？”', distractors: ['“Can I have water?”应译为“我可以喝点茶吗？”', '“Can I have water?”应译为“我喜欢牛奶。”'], hint: '重新核对 water 的意思，再读完整问句。', explanation: 'water 表示水，因此问句是“我可以喝点水吗？”' },
    { knowledgePointIds: [...words, ...categories, ...requests], prompt: '小组任务要选一张礼貌请求句卡和一个饮品词 water。哪组卡片符合要求？', answer: 'Can I have juice?；water', distractors: ['juice；Can I have tea?', 'Can I have milk?；Can I have water?'], hint: '一项应是完整请求句，另一项应是单个饮品词。', explanation: 'Can I have juice? 是礼貌请求句，water 是饮品词。' },
    { knowledgePointIds: [...words, ...requests], prompt: '要礼貌地请求牛奶，并认出表示茶的英文词，哪组记录都正确？', answer: 'Can I have milk?；tea', distractors: ['Can I have tea?；juice', 'Have I can milk?；water'], hint: '分别核对请求中的饮品和第二张词卡的含义。', explanation: 'Can I have milk? 礼貌地请求牛奶；tea 表示茶。' },
    { knowledgePointIds: [...words, ...requests], prompt: '读一读“Can I have tea?”，哪项是准确的中文意思和交际作用？', answer: '“Can I have tea?”表示礼貌地请求喝茶', distractors: ['“Can I have tea?”表示茶是什么颜色', '“Can I have tea?”表示我喜欢牛奶'], hint: '结合 tea 的意思和 Can I have…? 的作用判断。', explanation: 'tea 表示茶，这句话礼貌地请求喝茶。' },
    { knowledgePointIds: [...words], prompt: '哪一组依次列出了本单元四个饮品词的正确中文意思？', answer: '水、果汁、牛奶、茶', distractors: ['水、茶、牛奶、果汁', '果汁、牛奶、水、茶'], hint: '按题目中的英文顺序逐一对应中文。', explanation: 'water、juice、milk、tea 依次表示水、果汁、牛奶和茶。' },
    { knowledgePointIds: [...words, ...categories, ...requests], prompt: '哪两张句卡都能礼貌地请求饮品，而不是只写饮品名称？', answer: 'Can I have water? 和 Can I have tea?', distractors: ['water 和 tea', 'Can I have juice? 和 milk'], hint: '比较每张卡是否以完整问句表达请求。', explanation: 'Can I have water? 和 Can I have tea? 都是礼貌请求句。' },
    { knowledgePointIds: [...words, ...requests], prompt: '小卡要求“礼貌地请求果汁”，旁边还要标明 juice 的意思。哪项符合？', answer: '“Can I have juice?”是礼貌请求；juice 是果汁', distractors: ['“Can I have water?”是礼貌请求；juice 是牛奶', '“Have I can juice?”是礼貌请求；juice 是茶'], hint: '分别检查句子的请求对象和 juice 的词义。', explanation: 'Can I have juice? 礼貌地请求果汁，juice 表示果汁。' },
    { knowledgePointIds: [...words, ...requests, ...wordOrder], prompt: '想礼貌地要茶喝，哪张卡词序和饮品都正确？', answer: 'Can I have tea?', distractors: ['Can tea have I?', 'Have Can I tea?'], hint: '核对 tea 是否跟在 have 后面。', explanation: 'Can I have tea? 词序正确，并请求茶。' },
    { knowledgePointIds: [...words, ...categories, ...requests], prompt: 'A卡写 water，B卡写“Can I have milk?”。哪项把两张卡放入正确类别？', answer: '饮品词 water；请求句 Can I have milk?', distractors: ['请求句 water；饮品词 Can I have milk?', '两张卡都是饮品词语'], hint: '一个是饮品名称，另一个是完整问句。', explanation: 'water 是饮品词；Can I have milk? 是礼貌请求句。' },
    { knowledgePointIds: [...words, ...categories, ...requests], prompt: '哪条记录同时正确配对 tea 和 juice，并提出礼貌的牛奶请求？', answer: 'tea—茶；juice—果汁；Can I have milk?', distractors: ['tea—果汁；juice—茶；Can I have water?', 'tea—茶；juice—牛奶；Have I can milk?'], hint: '检查两个词卡的意思，再核对请求句。', explanation: 'tea 表示茶，juice 表示果汁，Can I have milk? 礼貌地请求牛奶。' },
    { knowledgePointIds: [...words, ...requests, ...wordOrder], prompt: '要分别礼貌地请求水和茶，哪组两句的词序都正确？', answer: 'Can I have water?；Can I have tea?', distractors: ['Can water I have?；Can tea I have?', 'Have I can water?；Have I can tea?'], hint: '两句都从 Can 开始，并让饮品词跟在 have 后面。', explanation: '两句都使用 Can I have + 饮品词的正确词序。' },
    { knowledgePointIds: [...words, ...categories, ...requests], prompt: '最后检查一张饮品词卡和一张请求句卡，哪项的类别与内容完全对应？', answer: 'water—饮品词语；Can I have water?—礼貌请求句', distractors: ['water—礼貌请求句；Can I have water?—饮品词语', '两张卡都是饮品名称'], hint: '分别比较单词和完整句子的形式与用途。', explanation: 'water 是表示水的饮品词，Can I have water? 是礼貌请求句。' },
  ],
};

function createActivity(draft: ActivityDraft, difficulty: Difficulty, index: number): Grade1Term2EnglishUnit05SupplementalActivity {
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

export const grade1Term2EnglishUnit05SupplementalActivities = (Object.entries(drafts) as [Difficulty, ActivityDraft[]][])
  .flatMap(([difficulty, items]) => items.map((draft, index) => createActivity(draft, difficulty, index)));
