import type { ChoiceActivityDefinition, Difficulty } from '../../content/types';

export interface Grade1Term1EnglishUnit01SupplementalActivity {
  difficulty: Difficulty;
  sourceUnitId: string;
  knowledgePointIds: string[];
  activity: ChoiceActivityDefinition;
}

interface ActivityDraft {
  knowledgePointIds: string[];
  prompt: string;
  options: [string, string, string];
  correctOptionIndex: 0 | 1 | 2;
  hint: string;
  explanation: string;
}

const sourceUnitId = 'grade-1/term-1/english/unit-01';
const idPrefix = 'challenge-supplement-grade-1-term-1-english-unit-01';

const drafts: Record<Difficulty, ActivityDraft[]> = {
  basic: [
    { knowledgePointIds: ['school-supplies-and-sentences'], prompt: 'Which English word means “老师”？', options: ['pencil', 'teacher', 'book'], correctOptionIndex: 1, hint: '回想课堂里认识的人和学习用品词卡。', explanation: 'teacher 表示“老师”。' },
    { knowledgePointIds: ['school-supplies-and-sentences'], prompt: '“铅笔”对应哪个英文词？', options: ['book', 'pencil', 'schoolbag'], correctOptionIndex: 1, hint: '把中文意思和三个英文词卡逐一核对。', explanation: 'pencil 表示“铅笔”。' },
    { knowledgePointIds: ['school-supplies-and-sentences'], prompt: '想表达“我有一本书”，哪句话合适？', options: ['I have a book.', 'I have a ruler.', 'I have a pencil.'], correctOptionIndex: 0, hint: '找到表示“书”的英文词，再读完整句话。', explanation: 'book 表示“书”；I have a book. 的意思是“我有一本书”。' },
    { knowledgePointIds: ['greetings-and-farewells'], prompt: '同学对你说“Hello!”，你也想友好地打招呼，哪句合适？', options: ['Goodbye!', 'Hi!', 'Close your eyes.'], correctOptionIndex: 1, hint: '选择一句问候语，不要选告别或课堂指令。', explanation: 'Hi! 可以用来向同学打招呼。' },
    { knowledgePointIds: ['greetings-and-farewells'], prompt: '放学准备离开时，哪句话可以向同学告别？', options: ['Bye!', 'Good morning!', 'Show me your book.'], correctOptionIndex: 0, hint: '想一想哪句话表示“再见”。', explanation: 'Bye! 可以用来表示“再见”。' },
    { knowledgePointIds: ['classroom-instructions'], prompt: '老师说“Stand up.”，你应该做什么？', options: ['坐下来', '站起来', '闭上眼睛'], correctOptionIndex: 1, hint: '听清指令中的动作。', explanation: 'Stand up. 的意思是“站起来”。' },
    { knowledgePointIds: ['classroom-instructions'], prompt: '听到“Sit down, please.”，应该怎样做？', options: ['请坐下', '请站起来', '请睁开眼睛'], correctOptionIndex: 0, hint: 'Sit down 和 Stand up 表示不同动作。', explanation: 'Sit down, please. 的意思是“请坐下”。' },
    { knowledgePointIds: ['classroom-instructions', 'school-supplies-and-sentences'], prompt: '老师说“Show me your book.”，你应该给老师看什么？', options: ['书', '尺子', '书包'], correctOptionIndex: 0, hint: '找出指令里表示物品的单词。', explanation: 'book 表示“书”，这句话是“给我看看你的书”。' },
    { knowledgePointIds: ['classroom-instructions'], prompt: '“Open your eyes.” 是让你做什么？', options: ['闭上眼睛', '睁开眼睛', '坐下来'], correctOptionIndex: 1, hint: 'Open 和 Close 表示相反的动作。', explanation: 'Open your eyes. 的意思是“睁开眼睛”。' },
    { knowledgePointIds: ['classroom-instructions'], prompt: '“Close your eyes.” 的意思是什么？', options: ['闭上眼睛', '睁开眼睛', '站起来'], correctOptionIndex: 0, hint: 'Close 表示“闭上”。', explanation: 'Close your eyes. 的意思是“闭上眼睛”。' },
    { knowledgePointIds: ['school-supplies-and-sentences'], prompt: '“尺子”对应哪个英文词？', options: ['ruler', 'pencil', 'teacher'], correctOptionIndex: 0, hint: '回想用来测量或画直线的学习用品词卡。', explanation: 'ruler 表示“尺子”。' },
    { knowledgePointIds: ['school-supplies-and-sentences'], prompt: '哪件物品适合装书和文具，带去学校？', options: ['schoolbag', 'ruler', 'pencil'], correctOptionIndex: 0, hint: '想一想可以把学习用品装在什么里面。', explanation: 'schoolbag 表示“书包”，可以用来装学习用品。' },
    { knowledgePointIds: ['school-supplies-and-sentences'], prompt: '“I have a pencil.” 表示什么？', options: ['我有一支铅笔。', '我有一本书。', '我有一把尺子。'], correctOptionIndex: 0, hint: '先找出 pencil 的中文意思。', explanation: 'pencil 表示“铅笔”，I have a pencil. 的意思是“我有一支铅笔”。' },
    { knowledgePointIds: ['school-supplies-and-sentences'], prompt: '想在本子上写字，哪件学习用品最合适？', options: ['pencil', 'schoolbag', 'teacher'], correctOptionIndex: 0, hint: '选择可以用来写字的文具。', explanation: 'pencil 表示“铅笔”，可以用来写字。' },
  ],
  advanced: [
    { knowledgePointIds: ['greetings-and-farewells'], prompt: '下午遇见同学，对方说“Good afternoon!”。哪句回应也符合这个问候情境？', options: ['Good afternoon!', 'Good morning!', 'Goodbye!'], correctOptionIndex: 0, hint: '核对时间问候和告别语的用途。', explanation: 'Good afternoon! 是下午问候语，可以用同样的问候回应。' },
    { knowledgePointIds: ['greetings-and-farewells'], prompt: '同学收拾书包准备离开教室，你想向他告别，哪句合适？', options: ['Goodbye.', 'Good morning!', 'Open your eyes.'], correctOptionIndex: 0, hint: '离开时要选择告别语。', explanation: 'Goodbye. 表示“再见”，适合告别时使用。' },
    { knowledgePointIds: ['classroom-instructions', 'school-supplies-and-sentences'], prompt: '老师想看你的铅笔，哪句指令说出了正确的物品？', options: ['Show me your pencil.', 'Show me your book.', 'Sit down, please.'], correctOptionIndex: 0, hint: '比较每句里的物品名称和老师要看的东西。', explanation: 'pencil 表示“铅笔”，Show me your pencil. 符合要求。' },
    { knowledgePointIds: ['classroom-instructions'], prompt: '老师先请大家站起来。哪句指令表达了这个动作？', options: ['Sit down.', 'Stand up.', 'Close your eyes.'], correctOptionIndex: 1, hint: '把“站起来”和“坐下”区分开。', explanation: 'Stand up. 的意思是“站起来”。' },
    { knowledgePointIds: ['classroom-instructions'], prompt: '老师说“Open your eyes.”，哪项动作符合指令？', options: ['睁开眼睛', '闭上眼睛', '展示书包'], correctOptionIndex: 0, hint: 'Open 表示打开或睁开。', explanation: 'Open your eyes. 是“睁开眼睛”。' },
    { knowledgePointIds: ['school-supplies-and-sentences'], prompt: '收拾书包时，你找到了要带去学校的书包。它的英文词卡是哪张？', options: ['schoolbag', 'book', 'ruler'], correctOptionIndex: 0, hint: '查看表示“书包”的词卡。', explanation: 'schoolbag 表示“书包”。' },
    { knowledgePointIds: ['school-supplies-and-sentences'], prompt: '哪句话的词序和表达都正确？', options: ['I have a ruler.', 'I has a ruler.', 'I have ruler a.'], correctOptionIndex: 0, hint: '核对 I have 的搭配，并按学过的句子顺序读一遍。', explanation: 'I have a ruler. 表示“我有一把尺子”，词序正确。' },
    { knowledgePointIds: ['school-supplies-and-sentences'], prompt: '看到句子“I have a book.”，可以知道说话的人有什么？', options: ['一本书', '一支铅笔', '一个书包'], correctOptionIndex: 0, hint: 'book 是本单元学过的学习用品词。', explanation: 'book 表示“书”，所以这句话表示“我有一本书”。' },
    { knowledgePointIds: ['school-supplies-and-sentences'], prompt: '要借一把尺子画直线，应该找哪张英文词卡？', options: ['ruler', 'schoolbag', 'teacher'], correctOptionIndex: 0, hint: '尺子的英文词以 r 开头。', explanation: 'ruler 表示“尺子”，适合用来画直线。' },
    { knowledgePointIds: ['classroom-instructions', 'school-supplies-and-sentences'], prompt: '老师说“Show me your book.”，下面哪项做法与指令一致？', options: ['拿起书给老师看', '拿起尺子给老师看', '坐下来闭上眼睛'], correctOptionIndex: 0, hint: '先确认 book 表示什么，再看动作是否符合 Show me。', explanation: 'book 表示“书”；Show me your book. 是“给我看看你的书”。' },
    { knowledgePointIds: ['greetings-and-farewells'], prompt: '哪句话适合刚见面时使用，而不是分别时使用？', options: ['Hello!', 'Goodbye.', 'Bye!'], correctOptionIndex: 0, hint: '把问候语和告别语分开判断。', explanation: 'Hello! 用来打招呼；Goodbye. 和 Bye! 用来告别。' },
    { knowledgePointIds: ['school-supplies-and-sentences'], prompt: '想告诉同学“我有一个书包”，哪句话表达准确？', options: ['I have a schoolbag.', 'I have a pencil.', 'I have a teacher.'], correctOptionIndex: 0, hint: '先把中文里的物品和英文词卡对应起来。', explanation: 'schoolbag 表示“书包”，I have a schoolbag. 表示“我有一个书包”。' },
    { knowledgePointIds: ['classroom-instructions'], prompt: '老师让你闭上眼睛，应该听到哪句指令？', options: ['Close your eyes.', 'Open your eyes.', 'Stand up.'], correctOptionIndex: 0, hint: '分清 Close 和 Open。', explanation: 'Close your eyes. 的意思是“闭上眼睛”。' },
    { knowledgePointIds: ['classroom-instructions'], prompt: '你正站着，老师请你坐下。哪句指令对应这个要求？', options: ['Sit down, please.', 'Stand up.', 'Show me your pencil.'], correctOptionIndex: 0, hint: '选择表示坐下的指令。', explanation: 'Sit down, please. 的意思是“请坐下”。' },
  ],
  high: [
    { knowledgePointIds: ['greetings-and-farewells'], prompt: '下午刚见到老师，后来放学分别。哪组表达按顺序合适？', options: ['Good afternoon! → Goodbye.', 'Good morning! → Hello!', 'Bye! → Good afternoon!'], correctOptionIndex: 0, hint: '第一句要符合下午问候，第二句要用于告别。', explanation: '下午见面可以说 Good afternoon!；分别时可以说 Goodbye.。' },
    { knowledgePointIds: ['school-supplies-and-sentences'], prompt: '记录 A 要表达“书”，记录 B 要表达“尺子”。哪组答案都正确？', options: ['A：book；B：ruler', 'A：ruler；B：pencil', 'A：schoolbag；B：book'], correctOptionIndex: 0, hint: '分别核对两张词卡的中文意思。', explanation: 'book 表示“书”，ruler 表示“尺子”。' },
    { knowledgePointIds: ['classroom-instructions', 'school-supplies-and-sentences'], prompt: '老师要你展示铅笔，但你拿起了书。哪句指令能帮助你检查物品是否拿对？', options: ['Show me your pencil.', 'Show me your book.', 'Sit down, please.'], correctOptionIndex: 0, hint: '对照老师要求的物品和你手里的物品。', explanation: '老师要看 pencil（铅笔），所以应按 Show me your pencil. 找出铅笔。' },
    { knowledgePointIds: ['school-supplies-and-sentences'], prompt: '同伴写下“I have a schoolbag.”，却把它解释成“我有一本书”。哪项改正了意思？', options: ['“我有一个书包。”', '“我有一把尺子。”', '“我有一支铅笔。”'], correctOptionIndex: 0, hint: '先核对 schoolbag 的意思。', explanation: 'schoolbag 表示“书包”，所以句子意思是“我有一个书包”。' },
    { knowledgePointIds: ['classroom-instructions', 'school-supplies-and-sentences'], prompt: '桌上有 book、pencil 和 ruler。闭眼前看见三样都在，睁眼后 pencil 不见了。老师问“What’s missing?”，答案是什么？', options: ['pencil', 'book', 'ruler'], correctOptionIndex: 0, hint: '比较前后变化，找出少掉的那件物品。', explanation: '消失的是 pencil，所以“What’s missing?”可以回答 pencil。' },
    { knowledgePointIds: ['school-supplies-and-sentences'], prompt: '题目要求表达“我有一把尺子”。哪条记录同时满足物品和句子意思？', options: ['I have a ruler.', 'I have a book.', 'I have a schoolbag.'], correctOptionIndex: 0, hint: '同时核对 I have 句式和 ruler 的词义。', explanation: 'ruler 表示“尺子”，I have a ruler. 符合题意。' },
    { knowledgePointIds: ['greetings-and-farewells', 'classroom-instructions'], prompt: '早晨走进教室先向老师问好，随后老师请你坐下。哪组表达符合两个情境？', options: ['Good morning! → Sit down, please.', 'Goodbye. → Stand up.', 'Good afternoon! → Close your eyes.'], correctOptionIndex: 0, hint: '按先后顺序核对问候场景和课堂动作。', explanation: '早晨可以说 Good morning!；Sit down, please. 表示请坐下。' },
    { knowledgePointIds: ['classroom-instructions', 'school-supplies-and-sentences'], prompt: '老师先说“Show me your book.”，再说“Open your eyes.”。哪项按顺序记录了两条指令？', options: ['展示你的书；睁开眼睛', '展示你的尺子；闭上眼睛', '坐下；展示你的书包'], correctOptionIndex: 0, hint: '依次看清每条指令里的动作和物品。', explanation: 'Show me your book. 是展示书；Open your eyes. 是睁开眼睛。' },
    { knowledgePointIds: ['school-supplies-and-sentences'], prompt: '要写下“我有一本书”和“我有一支铅笔”，哪组句子和意思都配对正确？', options: ['I have a book.＝我有一本书；I have a pencil.＝我有一支铅笔。', 'I have a ruler.＝我有一本书；I have a pencil.＝我有一个书包。', 'I have a schoolbag.＝我有一支铅笔；I have a book.＝我有一把尺子。'], correctOptionIndex: 0, hint: '逐句核对物品词，不要只看句子开头相同。', explanation: 'book 是书，pencil 是铅笔；两句的词义都匹配。' },
    { knowledgePointIds: ['greetings-and-farewells'], prompt: '同学刚到教室时说“Goodbye!”。如果他是来和大家打招呼，哪句更合适？', options: ['Hello!', 'Bye!', 'Goodbye.'], correctOptionIndex: 0, hint: '来见面时问候，离开时告别。', explanation: 'Hello! 用来打招呼；Goodbye. 和 Bye! 用来告别。' },
    { knowledgePointIds: ['classroom-instructions', 'school-supplies-and-sentences'], prompt: '老师说“Show me your ruler.”，同伴拿起 pencil。哪项说明了问题并给出正确做法？', options: ['拿错了；应拿 ruler（尺子）给老师看。', '拿对了；pencil 就是 ruler。', '拿错了；应把书包给老师看。'], correctOptionIndex: 0, hint: '比较指令中的物品词和手里物品的词义。', explanation: 'ruler 表示“尺子”，pencil 表示“铅笔”；应展示尺子。' },
    { knowledgePointIds: ['greetings-and-farewells', 'classroom-instructions'], prompt: '老师下午来到教室，同学准备离开。哪项把问候和告别分别放在合适的情境？', options: ['问候：Good afternoon!；告别：Bye!', '问候：Goodbye.；告别：Hello!', '问候：Sit down.；告别：Good morning!'], correctOptionIndex: 0, hint: '看清哪句用于下午问候，哪句用于告别。', explanation: 'Good afternoon! 用于下午问候，Bye! 用于告别。' },
    { knowledgePointIds: ['school-supplies-and-sentences'], prompt: '卡片上写着“I have a book.”，旁边配了 schoolbag 的图。怎样改正一处才能让句子和图一致？', options: ['把 book 改成 schoolbag。', '把 I have 改成 Stand up。', '把 a 改成 ruler。'], correctOptionIndex: 0, hint: '保留句子开头，检查图里物品对应的英文词。', explanation: '图里是 schoolbag（书包），应改为 I have a schoolbag.。' },
    { knowledgePointIds: ['classroom-instructions'], prompt: '老师先让大家闭上眼睛，再让大家睁开眼睛。哪组指令和动作顺序正确？', options: ['Close your eyes. → Open your eyes.', 'Open your eyes. → Sit down.', 'Stand up. → Close your book.'], correctOptionIndex: 0, hint: '先对应“闭上”，再对应“睁开”。', explanation: 'Close your eyes. 是闭上眼睛；Open your eyes. 是睁开眼睛。' },
  ],
};

export const grade1Term1EnglishUnit01SupplementalActivities: Grade1Term1EnglishUnit01SupplementalActivity[] =
  (Object.entries(drafts) as [Difficulty, ActivityDraft[]][]).flatMap(([difficulty, items]) => items.map((draft, index) => {
    const options = draft.options.map((label, optionIndex) => ({ id: `option-${optionIndex + 1}`, label }));
    return {
      difficulty,
      sourceUnitId,
      knowledgePointIds: [...draft.knowledgePointIds],
      activity: {
        id: `${idPrefix}-${difficulty}-${String(index + 1).padStart(2, '0')}`,
        kind: 'choice',
        prompt: draft.prompt,
        hint: draft.hint,
        explanation: draft.explanation,
        options,
        correctOptionId: options[draft.correctOptionIndex]!.id,
      },
    };
  }));
