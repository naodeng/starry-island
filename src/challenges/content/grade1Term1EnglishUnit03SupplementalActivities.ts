import type { ChoiceActivityDefinition, Difficulty } from '../../content/types';

export interface Grade1Term1EnglishUnit03SupplementalActivity {
  difficulty: Difficulty;
  sourceUnitId: string;
  knowledgePointIds: string[];
  activity: ChoiceActivityDefinition;
}

interface ActivityDraft {
  knowledgePointIds: string[];
  prompt: string;
  correct: string;
  distractors: [string, string];
  hint: string;
  explanation: string;
}

const sourceUnitId = 'grade-1/term-1/english/unit-03';
const idPrefix = 'challenge-supplement-grade-1-term-1-english-unit-03';
const hintForWord = '先看题干要求，再逐项核对词卡和中文记录。';
const hintForSentence = '把句子中的词和题目要求逐项对应，再检查整句意思。';

const drafts: Record<Difficulty, ActivityDraft[]> = {
  basic: [
    { knowledgePointIds: ['animal-word-vocabulary'], prompt: '英文词 cat 表示哪种动物？', correct: '猫', distractors: ['狗', '鸟'], hint: hintForWord, explanation: 'cat 表示“猫”。' },
    { knowledgePointIds: ['animal-word-vocabulary'], prompt: '看到 dog 词卡，应该读作哪种动物？', correct: '狗', distractors: ['老虎', '猫'], hint: hintForWord, explanation: 'dog 表示“狗”。' },
    { knowledgePointIds: ['animal-word-vocabulary'], prompt: '哪张中文卡片与 bird 相符？', correct: '鸟', distractors: ['猫', '老虎'], hint: hintForWord, explanation: 'bird 表示“鸟”。' },
    { knowledgePointIds: ['animal-word-vocabulary'], prompt: '词卡 tiger 对应哪种动物？', correct: '老虎', distractors: ['狗', '鸟'], hint: hintForWord, explanation: 'tiger 表示“老虎”。' },
    { knowledgePointIds: ['animal-word-vocabulary'], prompt: '“猫”对应哪个英文词？', correct: 'cat', distractors: ['dog', 'bird'], hint: hintForWord, explanation: '“猫”对应 cat。' },
    { knowledgePointIds: ['animal-word-vocabulary'], prompt: '“狗”这张词卡应该和哪个英文词配在一起？', correct: 'dog', distractors: ['tiger', 'cat'], hint: hintForWord, explanation: '“狗”对应 dog。' },
    { knowledgePointIds: ['animal-word-vocabulary'], prompt: '如果图卡画着一只鸟，哪张英文词卡最合适？', correct: 'bird', distractors: ['cat', 'tiger'], hint: hintForWord, explanation: 'bird 表示“鸟”。' },
    { knowledgePointIds: ['animal-word-vocabulary'], prompt: '“老虎”对应哪张英文词卡？', correct: 'tiger', distractors: ['dog', 'bird'], hint: hintForWord, explanation: '“老虎”对应 tiger。' },
    { knowledgePointIds: ['animal-word-vocabulary'], prompt: '记录员写下 cat。哪条中文记录正确？', correct: '猫', distractors: ['鸟', '老虎'], hint: hintForWord, explanation: 'cat 的中文意思是“猫”。' },
    { knowledgePointIds: ['animal-word-vocabulary'], prompt: '下面哪组词义对应正确？', correct: 'bird＝鸟', distractors: ['dog＝猫', 'tiger＝狗'], hint: hintForWord, explanation: 'bird 表示“鸟”，另外两组把词义配错了。' },
    { knowledgePointIds: ['animal-description-sentences'], prompt: '“It is a cat.” 表示什么？', correct: '它是一只猫。', distractors: ['它是一只狗。', '它是一只鸟。'], hint: hintForSentence, explanation: 'cat 表示“猫”，It is a cat. 的意思是“它是一只猫”。' },
    { knowledgePointIds: ['animal-preference-sentences'], prompt: '同伴把 “I like cats.” 译成“这是一只猫”，应该改成哪一项？', correct: '我喜欢猫。', distractors: ['我有一只猫。', '这是一只猫。'], hint: hintForSentence, explanation: 'I like cats. 表达“我喜欢猫”，不是描述眼前的一只猫。' },
    { knowledgePointIds: ['animal-description-sentences', 'animal-word-vocabulary'], prompt: '想说“这是一只狗”，应该选哪句话？', correct: 'It is a dog.', distractors: ['It is a cat.', 'It is a bird.'], hint: hintForSentence, explanation: 'dog 表示“狗”，It is a dog. 是“这是一只狗”。' },
    { knowledgePointIds: ['animal-description-sentences', 'animal-word-vocabulary'], prompt: '句子“这是一只老虎”对应哪条英文表达？', correct: 'It is a tiger.', distractors: ['It is a bird.', 'It is a dog.'], hint: hintForSentence, explanation: 'tiger 表示“老虎”，It is a tiger. 表示“这是一只老虎”。' },
    { knowledgePointIds: ['animal-word-vocabulary'], prompt: '图片卡上是一只老虎，哪张英文词卡与图片相符？', correct: 'tiger', distractors: ['cat', 'bird'], hint: hintForWord, explanation: '老虎对应 tiger。' },
    { knowledgePointIds: ['animal-word-vocabulary'], prompt: '词义记录把 bird 写成“老虎”。bird 的中文意思应该是什么？', correct: '鸟', distractors: ['狗', '猫'], hint: hintForWord, explanation: 'bird 表示“鸟”，不是“老虎”。' },
    { knowledgePointIds: ['animal-description-sentences', 'animal-word-vocabulary'], prompt: '想描述图卡上的鸟，哪句话符合图意？', correct: 'It is a bird.', distractors: ['It is a dog.', 'I like cats.'], hint: hintForSentence, explanation: 'bird 表示“鸟”，It is a bird. 描述图卡上的鸟。' },
    { knowledgePointIds: ['animal-description-sentences', 'animal-word-vocabulary'], prompt: '请选择表达“它是一只猫”的句子。', correct: 'It is a cat.', distractors: ['I like cats.', 'It is a dog.'], hint: hintForSentence, explanation: 'It is a cat. 描述一只猫；I like cats. 表达喜好。' },
  ],
  advanced: [
    { knowledgePointIds: ['animal-word-vocabulary', 'animal-description-sentences'], prompt: '图卡是“鸟”，旁边的句子应选哪一条？', correct: 'It is a bird.', distractors: ['It is a cat.', 'It is a tiger.'], hint: hintForSentence, explanation: 'bird 表示“鸟”，所以句子应为 It is a bird.' },
    { knowledgePointIds: ['animal-word-vocabulary'], prompt: '一张词义检查卡写着“dog＝老虎”。改成哪项才正确？', correct: 'dog＝狗', distractors: ['dog＝鸟', 'dog＝猫'], hint: hintForWord, explanation: 'dog 表示“狗”，不是老虎、鸟或猫。' },
    { knowledgePointIds: ['animal-description-sentences'], prompt: '图片记录为“这是一只猫”。哪句话与记录意思一致？', correct: 'It is a cat.', distractors: ['It is a dog.', 'It is a bird.'], hint: hintForSentence, explanation: 'It is a cat. 表示“这是一只猫”。' },
    { knowledgePointIds: ['animal-preference-sentences'], prompt: '想表达“我喜欢猫”，应从句子卡中选哪张？', correct: 'I like cats.', distractors: ['It is a cat.', 'It is a dog.'], hint: hintForSentence, explanation: 'I like cats. 表示“我喜欢猫”；It is a cat. 是描述句。' },
    { knowledgePointIds: ['animal-word-vocabulary', 'animal-description-sentences'], prompt: '小组先读 tiger 词卡，再选一句说明它是什么动物。哪项两步都正确？', correct: 'tiger＝老虎；It is a tiger.', distractors: ['tiger＝猫；It is a cat.', 'tiger＝鸟；It is a dog.'], hint: '先核对词卡意思，再核对句子末尾的动物词。', explanation: 'tiger 表示“老虎”，It is a tiger. 表示“这是一只老虎”。' },
    { knowledgePointIds: ['animal-word-vocabulary'], prompt: '以下哪份词卡记录把两种动物都配对正确？', correct: 'cat＝猫；bird＝鸟', distractors: ['cat＝狗；bird＝老虎', 'cat＝鸟；bird＝猫'], hint: hintForWord, explanation: 'cat 表示“猫”，bird 表示“鸟”。' },
    { knowledgePointIds: ['animal-description-sentences'], prompt: '同伴要用英语描述图卡上的狗，哪句话符合句型和词义？', correct: 'It is a dog.', distractors: ['It is a cat.', 'I like cats.'], hint: hintForSentence, explanation: 'It is a dog. 表示“这是一只狗”；I like cats. 表达的是喜好。' },
    { knowledgePointIds: ['animal-word-vocabulary'], prompt: '只看中文“老虎”，下面哪张英文词卡可以放进对应栏？', correct: 'tiger', distractors: ['bird', 'dog'], hint: hintForWord, explanation: '“老虎”对应 tiger。' },
    { knowledgePointIds: ['animal-preference-sentences', 'animal-word-vocabulary'], prompt: '句子卡想表达喜欢猫。哪一项既写对句意，也写对动物词？', correct: 'I like cats.＝我喜欢猫。', distractors: ['I like cats.＝我喜欢狗。', 'It is a cat.＝我喜欢猫。'], hint: '分别检查句型表达的意思和动物词的词义。', explanation: 'I like cats. 表达“我喜欢猫”，其中 cats 指猫。' },
    { knowledgePointIds: ['animal-description-sentences', 'animal-word-vocabulary'], prompt: '哪张句子卡是在说“它是一只鸟”，而不是说喜好？', correct: 'It is a bird.', distractors: ['I like cats.', 'It is a dog.'], hint: hintForSentence, explanation: 'It is a bird. 描述动物；I like cats. 表达喜好。' },
    { knowledgePointIds: ['animal-word-vocabulary'], prompt: '两张图卡分别是猫和狗，哪组英文标签顺序正确？', correct: 'cat、dog', distractors: ['dog、bird', 'tiger、cat'], hint: hintForWord, explanation: '猫对应 cat，狗对应 dog。' },
    { knowledgePointIds: ['animal-description-sentences', 'animal-word-vocabulary'], prompt: '记录写着“这是一只老虎”，哪项英文句子与中文一致？', correct: 'It is a tiger.', distractors: ['It is a cat.', 'It is a bird.'], hint: hintForSentence, explanation: 'It is a tiger. 表示“这是一只老虎”。' },
    { knowledgePointIds: ['animal-preference-sentences', 'animal-description-sentences'], prompt: '需要挑一张“表达喜好”的句子卡，哪张符合？', correct: 'I like cats.', distractors: ['It is a cat.', 'It is a bird.'], hint: '看句子是在表达喜欢，还是在描述某个动物。', explanation: 'I like cats. 表达喜好；It is… 描述动物。' },
    { knowledgePointIds: ['animal-word-vocabulary'], prompt: '哪行词义表中没有把 cat、dog、bird、tiger 的意思弄混？', correct: 'cat＝猫；dog＝狗；bird＝鸟；tiger＝老虎', distractors: ['cat＝狗；dog＝猫；bird＝鸟；tiger＝老虎', 'cat＝猫；dog＝鸟；bird＝狗；tiger＝老虎'], hint: '逐个核对每一组词和中文意思，不要只看其中一项。', explanation: '正确词义依次是猫、狗、鸟、老虎。' },
    { knowledgePointIds: ['animal-word-vocabulary', 'animal-description-sentences'], prompt: '图卡是狗，记录员已写对 dog＝狗。哪句话补全了这张记录卡？', correct: 'It is a dog.', distractors: ['It is a cat.', 'I like cats.'], hint: '保留已核对的词义，再看哪句话描述同一种动物。', explanation: 'dog 表示“狗”，It is a dog. 描述狗。' },
    { knowledgePointIds: ['animal-word-vocabulary', 'animal-description-sentences'], prompt: '鸟的词义记录正确，句子却写成 “It is a cat.”。应把句子改成什么？', correct: 'It is a bird.', distractors: ['It is a dog.', 'I like cats.'], hint: '保留正确词义，再检查描述句中的关键词。', explanation: 'bird 表示“鸟”，所以描述句应为 It is a bird.' },
    { knowledgePointIds: ['animal-preference-sentences', 'animal-description-sentences'], prompt: '哪一项把“表达喜好”和“描述动物”两种用途分清了？', correct: 'I like cats. 表达喜好；It is a cat. 描述动物。', distractors: ['I like cats. 描述眼前的猫；It is a cat. 表达喜好。', '两句话都表示“它是一只猫”。'], hint: '比较两句话分别在说喜欢什么，还是说明它是什么。', explanation: 'I like cats. 表达喜好；It is a cat. 描述动物。' },
    { knowledgePointIds: ['animal-word-vocabulary', 'animal-description-sentences'], prompt: '记录卡写着“猫；cat；It is a dog.”，哪一处需要改正？', correct: '把句子改为 It is a cat.', distractors: ['把 cat 改为 dog。', '把中文“猫”改为“鸟”。'], hint: '先保留互相对应的中文和英文词，再核对描述句。', explanation: '“猫”和 cat 已经对应；描述句应改为 It is a cat.' },
    { knowledgePointIds: ['animal-preference-sentences', 'animal-word-vocabulary'], prompt: '小组记录“喜欢猫”的表达和 cat 的词义，哪项两处都正确？', correct: 'I like cats.；cat＝猫', distractors: ['I like cats.；cat＝狗', 'It is a cat.；cat＝猫'], hint: '分别检查句子表达的意思和单词的中文意思。', explanation: 'I like cats. 表达喜欢猫，cat 表示“猫”。' },
    { knowledgePointIds: ['animal-word-vocabulary', 'animal-description-sentences'], prompt: '两张图卡分别是猫和鸟。哪组英文词卡与描述句按顺序对应？', correct: 'cat；It is a cat. / bird；It is a bird.', distractors: ['cat；It is a bird. / bird；It is a cat.', 'dog；It is a dog. / tiger；It is a tiger.'], hint: '分别检查每张图卡的动物名称和描述句末的词。', explanation: '猫对应 cat 和 It is a cat.；鸟对应 bird 和 It is a bird.' },
    { knowledgePointIds: ['animal-preference-sentences', 'animal-description-sentences'], prompt: '需要给一张“我喜欢猫”的表达卡和一张“这是一只狗”的描述卡配标签，哪组正确？', correct: '喜好：I like cats.；描述：It is a dog.', distractors: ['喜好：It is a dog.；描述：I like cats.', '喜好：I like cats.；描述：It is a cat.'], hint: '先判断每句话表达喜好还是描述，再核对动物名称。', explanation: 'I like cats. 表达喜好；It is a dog. 描述狗。' },
    { knowledgePointIds: ['animal-word-vocabulary', 'animal-preference-sentences', 'animal-description-sentences'], prompt: '记录员要同时写出 dog 的词义、一句描述狗的话和一句表达喜欢猫的话。哪张卡全部正确？', correct: 'dog＝狗；It is a dog.；I like cats.', distractors: ['dog＝猫；It is a cat.；I like cats.', 'dog＝狗；It is a dog.；It is a cat.'], hint: '把词义、描述句和喜好句分开核对，再检查三项。', explanation: 'dog 表示“狗”；It is a dog. 描述狗；I like cats. 表达喜欢猫。' },
    { knowledgePointIds: ['animal-word-vocabulary', 'animal-description-sentences'], prompt: '图卡是鸟，检查记录“bird＝鸟；It is a bird.”后，哪项判断正确？', correct: '词义和描述句都与图卡一致。', distractors: ['词义正确，但描述句说的是猫。', '描述句正确，但 bird 表示老虎。'], hint: '分别核对词义和完整句子指向的动物。', explanation: 'bird 表示“鸟”，It is a bird. 也描述鸟。' },
    { knowledgePointIds: ['animal-word-vocabulary', 'animal-preference-sentences'], prompt: '任务是保留“我喜欢猫”这句话，同时找出意思为“狗”的词卡。哪项符合两条要求？', correct: 'I like cats.；dog＝狗', distractors: ['It is a dog.；cat＝狗', 'I like cats.；bird＝猫'], hint: '句子和词卡各有一个要求，逐一检查。', explanation: 'I like cats. 表达喜欢猫，dog 表示“狗”。' },
    { knowledgePointIds: ['animal-word-vocabulary', 'animal-description-sentences'], prompt: '小组要给猫、狗两张图卡各配一条描述句，哪组顺序没有配错？', correct: '猫：It is a cat.；狗：It is a dog.', distractors: ['猫：It is a dog.；狗：It is a cat.', '猫：I like cats.；狗：It is a cat.'], hint: '先核对每个句子末尾的动物词，再与图卡比较。', explanation: 'cat 描述猫，dog 描述狗。' },
    { knowledgePointIds: ['animal-word-vocabulary', 'animal-preference-sentences', 'animal-description-sentences'], prompt: '请检查记录：cat＝猫；I like cats.＝我喜欢猫；It is a cat.＝它是一只狗。哪项评价准确？', correct: '词义和喜好句正确；描述句应译为“它是一只猫”。', distractors: ['词卡和描述句正确；喜好句应改为“我喜欢狗”。', '三项记录都正确，不需要修改。'], hint: '分别核对词义、喜好表达和描述句。', explanation: 'cat 表示“猫”；I like cats. 表达喜欢猫；It is a cat. 应译为“它是一只猫”，原记录把猫误写成狗。' },
  ],
  high: [
    { knowledgePointIds: ['animal-word-vocabulary', 'animal-description-sentences'], prompt: '两条要求是“词卡 dog 表示狗”和“它是一只狗”。哪张记录卡同时满足？', correct: 'dog＝狗；It is a dog.', distractors: ['dog＝猫；It is a cat.', 'dog＝鸟；It is a tiger.'], hint: '把词义和整句意思分开核对，再看两项是否都一致。', explanation: 'dog 表示“狗”，It is a dog. 表示“这是一只狗”。' },
    { knowledgePointIds: ['animal-word-vocabulary', 'animal-preference-sentences'], prompt: '小组要选出词义为“猫”的词卡，并配上一句表达喜欢猫的话。哪组完整正确？', correct: 'cat；I like cats.', distractors: ['dog；It is a dog.', 'bird；I like cats.'], hint: '分别检查词卡的中文意思和句子表达的意思。', explanation: 'cat 表示“猫”，I like cats. 表示“我喜欢猫”。' },
    { knowledgePointIds: ['animal-word-vocabulary', 'animal-description-sentences'], prompt: '图卡是老虎，标签和描述句都要对应图意。哪项没有矛盾？', correct: 'tiger；It is a tiger.', distractors: ['cat；It is a dog.', 'bird；It is a cat.'], hint: '标签和句子都要与同一张图卡相符。', explanation: 'tiger 表示“老虎”，It is a tiger. 也描述老虎。' },
    { knowledgePointIds: ['animal-preference-sentences', 'animal-description-sentences'], prompt: '哪一项把“我喜欢猫”和“这是一只猫”两种意思区分正确？', correct: 'I like cats.＝我喜欢猫；It is a cat.＝这是一只猫。', distractors: ['I like cats.＝这是一只猫；It is a cat.＝我喜欢猫。', '两句话都表示“这是一只猫”。'], hint: '注意一句表达喜好，另一句描述眼前的动物。', explanation: 'I like cats. 表达喜好；It is a cat. 描述动物。' },
    { knowledgePointIds: ['animal-word-vocabulary', 'animal-description-sentences'], prompt: '记录员需要写下“鸟”的英文词义和对应描述句。哪项两部分都正确？', correct: 'bird＝鸟；It is a bird.', distractors: ['bird＝猫；It is a cat.', 'bird＝老虎；It is a dog.'], hint: '先核对单词意思，再核对句中重复出现的动物词。', explanation: 'bird 表示“鸟”，It is a bird. 表示“这是一只鸟”。' },
    { knowledgePointIds: ['animal-word-vocabulary', 'animal-preference-sentences'], prompt: '想保留“我喜欢猫”这句，同时选出意思为“狗”的词卡。哪组符合？', correct: 'I like cats.；dog＝狗', distractors: ['It is a dog.；cat＝狗', 'I like cats.；bird＝猫'], hint: '句子和词卡各有一个要求，逐一检查。', explanation: 'I like cats. 表达喜欢猫，dog 表示“狗”。' },
    { knowledgePointIds: ['animal-word-vocabulary', 'animal-description-sentences'], prompt: '图卡是猫，记录中还要有正确的英文动物词。哪一行所有信息一致？', correct: '猫；cat；It is a cat.', distractors: ['猫；dog；It is a dog.', '猫；bird；It is a tiger.'], hint: '中文、英文词和完整句子都应指向同一种动物。', explanation: '猫对应 cat，It is a cat. 表示“这是一只猫”。' },
    { knowledgePointIds: ['animal-preference-sentences'], prompt: '三张句子卡中，哪张表达的是喜好而不是单纯描述？', correct: 'I like cats.', distractors: ['It is a cat.', 'It is a bird.'], hint: '检查句子是否在说“喜欢”，而不是“它是……”。', explanation: 'I like cats. 表达“我喜欢猫”。' },
    { knowledgePointIds: ['animal-word-vocabulary', 'animal-description-sentences'], prompt: '小卡片写着“这是一只狗”。下列哪项把英文句子和中文意思配对正确？', correct: 'It is a dog.＝这是一只狗。', distractors: ['It is a dog.＝这是一只猫。', 'It is a cat.＝这是一只狗。'], hint: '对照句末的动物词和中文卡上的动物名称。', explanation: 'dog 表示“狗”，It is a dog. 与中文卡意思一致。' },
    { knowledgePointIds: ['animal-word-vocabulary', 'animal-description-sentences'], prompt: '图卡是鸟，以下哪条记录的中文、英文单词和描述句都相符？', correct: '鸟；bird；It is a bird.', distractors: ['鸟；cat；It is a cat.', '鸟；dog；It is a tiger.'], hint: '从中文到词卡，再到句子逐项检查，三处应指向同一动物。', explanation: '鸟对应 bird，It is a bird. 表示“这是一只鸟”。' },
    { knowledgePointIds: ['animal-word-vocabulary', 'animal-description-sentences'], prompt: 'A 图卡是狗，B 图卡是老虎。哪份记录按顺序同时写对词义和描述句？', correct: 'A：dog＝狗；It is a dog.；B：tiger＝老虎；It is a tiger.', distractors: ['A：dog＝猫；It is a cat.；B：tiger＝鸟；It is a bird.', 'A：dog＝狗；It is a tiger.；B：tiger＝老虎；It is a dog.'], hint: '先逐张核对词义，再检查对应句子是否仍指向同一张图卡。', explanation: 'A 是狗，B 是老虎；两张词卡和描述句都要与各自图卡对应。' },
    { knowledgePointIds: ['animal-word-vocabulary', 'animal-preference-sentences', 'animal-description-sentences'], prompt: '小组记录猫的词义和喜好句都正确，狗的图卡旁却写了“It is a cat.”。哪项只修正错误并保留已确认信息？', correct: '保留 cat＝猫 和 I like cats.；把描述句改为 It is a dog.', distractors: ['把 cat＝猫 改成 dog＝狗，描述句不变。', '把 I like cats. 改成 It is a dog.，其余不检查。'], hint: '先标出已经正确的两项，只修正图卡不相符的描述句。', explanation: 'cat＝猫 和 I like cats. 都正确；狗图卡应配 It is a dog.' },
    { knowledgePointIds: ['animal-word-vocabulary', 'animal-preference-sentences', 'animal-description-sentences'], prompt: 'A 卡要表达喜欢猫，B 卡要描述一只鸟。哪组句子顺序符合两张卡的目标？', correct: 'A：I like cats.；B：It is a bird.', distractors: ['A：It is a cat.；B：I like cats.', 'A：It is a dog.；B：It is a tiger.'], hint: '分别看A卡的喜好目标和B卡的动物图，再核对两句。', explanation: 'I like cats. 表达喜欢猫；It is a bird. 描述鸟。' },
    { knowledgePointIds: ['animal-word-vocabulary', 'animal-description-sentences'], prompt: '两位同伴检查一张猫图卡。甲写“cat＝猫”，乙写“It is a dog.”。哪项反馈最准确？', correct: '保留甲的词义记录，把乙的句子改为 It is a cat.', distractors: ['把甲的 cat 改成 dog，保留乙的句子。', '保留两项，因为两种动物都在本单元。'], hint: '对照图卡判断哪一项已经正确，哪一项和图意冲突。', explanation: '猫图卡对应 cat；描述句也应是 It is a cat.' },
    { knowledgePointIds: ['animal-preference-sentences', 'animal-description-sentences'], prompt: '一张卡写着“I like cats.”，另一张狗图旁写着“It is a dog.”。哪项正确说明两张卡的用途？', correct: '第一张表达喜好，第二张描述图卡上的动物。', distractors: ['第一张描述一只猫，第二张表达喜好。', '两张卡都只是在给动物命名。'], hint: '分别判断句子是在说喜欢什么，还是说明图卡是什么。', explanation: 'I like cats. 表达喜好；It is a dog. 描述狗。' },
    { knowledgePointIds: ['animal-word-vocabulary', 'animal-preference-sentences', 'animal-description-sentences'], prompt: '请检查三项记录：bird＝鸟；It is a bird.；I like cats.＝我喜欢狗。哪项需要改正？', correct: '把最后一句的中文改成“我喜欢猫”。', distractors: ['把 bird 改成 cat，其他不变。', '把 It is a bird. 改成 I like cats.'], hint: '先保留已经对应的词义和描述句，再核对喜好句的中文意思。', explanation: 'bird＝鸟和 It is a bird. 都正确；I like cats. 表达喜欢猫。' },
    { knowledgePointIds: ['animal-word-vocabulary', 'animal-description-sentences'], prompt: '一只老虎图卡的词义已经写成 tiger＝老虎。描述句空缺，哪项补上后整张卡一致？', correct: 'It is a tiger.', distractors: ['It is a cat.', 'I like cats.'], hint: '描述句中的动物名称应与图卡和词义相同。', explanation: 'tiger 表示“老虎”，It is a tiger. 描述老虎。' },
    { knowledgePointIds: ['animal-word-vocabulary', 'animal-preference-sentences'], prompt: '需要保留“我喜欢猫”的句子，并把错误的 tiger＝猫 改正。哪张记录卡完成了两处检查？', correct: 'I like cats.；tiger＝老虎', distractors: ['It is a cat.；tiger＝猫', 'I like cats.；tiger＝鸟'], hint: '一项检查句意，另一项核对词义。', explanation: 'I like cats. 表达喜欢猫，tiger 表示“老虎”。' },
    { knowledgePointIds: ['animal-word-vocabulary', 'animal-preference-sentences', 'animal-description-sentences'], prompt: '最后检查：猫图卡标为 cat，旁边写“I like cats.”；狗图卡标为 dog，旁边写“It is a dog.”。哪项结论正确？', correct: '两张卡的词义、句意和图卡都一致。', distractors: ['只有猫卡正确，狗的描述句说的是猫。', '两句都表达喜好，没有描述动物。'], hint: '分别核对每张图卡上的词和句子表达的意思。', explanation: 'cat 对应猫，I like cats. 表达喜欢猫；dog 对应狗，It is a dog. 描述狗。' },
    { knowledgePointIds: ['animal-word-vocabulary', 'animal-preference-sentences', 'animal-description-sentences'], prompt: '检查记录：词卡 tiger＝老虎；句子 It is a tiger.；句子 I like cats.＝我喜欢猫。哪项评价准确？', correct: '三条记录的词义和句意都正确。', distractors: ['只有 tiger 的词义正确，两个句子都错。', 'It is a tiger. 表达“我喜欢猫”。'], hint: '分别核对单词、描述句和喜好句的意思。', explanation: 'tiger 表示“老虎”；It is a tiger. 描述老虎；I like cats. 表达喜欢猫。' },
  ],
};

const positionOffset: Record<Difficulty, number> = { basic: 0, advanced: 14, high: 28 };

function createActivity(difficulty: Difficulty, index: number, draft: ActivityDraft): Grade1Term1EnglishUnit03SupplementalActivity {
  const correctIndex = (positionOffset[difficulty] + index) % 3;
  const labels = [...draft.distractors];
  labels.splice(correctIndex, 0, draft.correct);
  const activityId = `${idPrefix}-${difficulty}-${String(index + 1).padStart(2, '0')}`;
  return {
    difficulty,
    sourceUnitId,
    knowledgePointIds: [...draft.knowledgePointIds],
    activity: {
      id: activityId,
      kind: 'choice',
      prompt: draft.prompt,
      options: labels.map((label, optionIndex) => ({ id: `option-${optionIndex + 1}`, label })),
      correctOptionId: `option-${correctIndex + 1}`,
      hint: draft.hint,
      explanation: draft.explanation,
    },
  };
}

export const grade1Term1EnglishUnit03SupplementalActivities: Grade1Term1EnglishUnit03SupplementalActivity[] = (
  Object.entries(drafts) as Array<[Difficulty, ActivityDraft[]]>
).flatMap(([difficulty, activities]) => activities.map((activity, index) => createActivity(difficulty, index, activity)));
