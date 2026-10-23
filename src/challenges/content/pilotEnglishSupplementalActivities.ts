import type { ChoiceActivityDefinition, Difficulty } from '../../content/types';

export type EnglishKnowledgePointId = 'name-and-self-introduction' | 'age-and-class';

export interface EnglishSupplementalChallengeActivity {
  difficulty: Difficulty;
  sourceUnitId: string;
  knowledgePointIds: EnglishKnowledgePointId[];
  activity: ChoiceActivityDefinition;
}

interface EnglishChoiceDraft {
  knowledgePointIds: EnglishKnowledgePointId[];
  prompt: string;
  options: [string, string, string];
  correctOptionIndex: 0 | 1 | 2;
  hint: string;
  explanation: string;
}

const sourceUnitId = 'grade-3/term-1/english/unit-01';
const bothPoints: EnglishKnowledgePointId[] = ['name-and-self-introduction', 'age-and-class'];

const drafts: Record<Difficulty, EnglishChoiceDraft[]> = {
  basic: [
    { knowledgePointIds: ['name-and-self-introduction'], prompt: '表示“名字”的英文词是哪一个？', options: ['age', 'name', 'class'], correctOptionIndex: 1, hint: '想一想，哪一个词能告诉别人你叫什么。', explanation: 'name 表示“名字”。' },
    { knowledgePointIds: ['name-and-self-introduction'], prompt: '表示“我的”的英文词是哪一个？', options: ['my', 'your', 'old'], correctOptionIndex: 0, hint: '区分说话者自己的东西和对方的东西。', explanation: 'my 表示“我的”。' },
    { knowledgePointIds: ['name-and-self-introduction'], prompt: '表示“你的”的英文词是哪一个？', options: ['dear', 'your', 'year'], correctOptionIndex: 1, hint: '这个词指向正在听你说话的人。', explanation: 'your 表示“你的”。' },
    { knowledgePointIds: ['name-and-self-introduction'], prompt: '哪组词都适合放在“姓名与称呼”主题里？', options: ['age and year', 'my and name', 'class and grade'], correctOptionIndex: 1, hint: '一组是表达所属，另一个直接表示称呼内容。', explanation: 'my 表示“我的”，name 表示“名字”，两者都与姓名表达有关。' },
    { knowledgePointIds: ['name-and-self-introduction'], prompt: '哪句话可以告诉伙伴说话者叫什么？', options: ['How old are you?', 'My name is Amy.', 'Dear Amy'], correctOptionIndex: 1, hint: '找一找包含介绍姓名线索的句子。', explanation: 'My name is Amy. 表示“我的名字叫 Amy”。' },
    { knowledgePointIds: ['name-and-self-introduction'], prompt: '给 Amy 写信，哪种英文称呼适合放在开头？', options: ['Old Amy', 'Dear Amy', 'Age Amy'], correctOptionIndex: 1, hint: '这个称呼常用来礼貌地叫对方。', explanation: 'Dear Amy 是写信时对 Amy 的称呼。' },
    { knowledgePointIds: ['name-and-self-introduction'], prompt: '同伴想介绍自己的名字，哪句话最符合这个目的？', options: ['My name is Ben.', 'How old are you?', 'Dear Ben'], correctOptionIndex: 0, hint: '选能直接说明说话者姓名的表达。', explanation: 'My name is Ben. 是自我介绍姓名的表达。' },
    { knowledgePointIds: ['age-and-class'], prompt: '表示“年龄”的英文词是哪一个？', options: ['name', 'age', 'my'], correctOptionIndex: 1, hint: '这个词和一个人几岁有关。', explanation: 'age 表示“年龄”。' },
    { knowledgePointIds: ['age-and-class'], prompt: '哪句话是在询问对方几岁？', options: ['How old are you?', 'My name is Amy.', 'Dear Amy'], correctOptionIndex: 0, hint: '留意询问岁数时会用到的词。', explanation: 'How old are you? 是在询问年龄。' },
    { knowledgePointIds: ['age-and-class'], prompt: '表示“年”的英文词是哪一个？', options: ['year', 'grade', 'name'], correctOptionIndex: 0, hint: '这个词也出现在表示年龄的短语里。', explanation: 'year 表示“年”。' },
    { knowledgePointIds: ['age-and-class'], prompt: '表示学校里的“班级”的英文词是哪一个？', options: ['class', 'age', 'your'], correctOptionIndex: 0, hint: '这个词和同学们一起学习的集体有关。', explanation: 'class 表示“班级”。' },
    { knowledgePointIds: ['age-and-class'], prompt: '表示“年级”的英文词是哪一个？', options: ['old', 'grade', 'my'], correctOptionIndex: 1, hint: '注意它和 class 的意思不同。', explanation: 'grade 表示“年级”。' },
    { knowledgePointIds: ['age-and-class'], prompt: '“How old are you?”最适合放在哪个主题小组？', options: ['姓名与称呼', '年龄与班级', '学习用品'], correctOptionIndex: 1, hint: '这句话想知道对方几岁。', explanation: '这句话询问年龄，属于“年龄与班级”主题。' },
    { knowledgePointIds: ['age-and-class'], prompt: '询问一个人几岁时，哪个词提示问题和岁数有关？', options: ['name', 'old', 'dear'], correctOptionIndex: 1, hint: '回想本单元询问年龄的句子。', explanation: 'How old are you? 中的 old 与询问年龄有关。' },
  ],
  advanced: [
    { knowledgePointIds: ['name-and-self-introduction'], prompt: 'my 和 your 分别表示谁的？哪条对应关系正确？', options: ['my=你的；your=我的', 'my=我的；your=你的', 'name=年龄；dear=班级'], correctOptionIndex: 1, hint: '分别判断两个词指的是谁。', explanation: 'my 表示“我的”，your 表示“你的”。' },
    { knowledgePointIds: ['name-and-self-introduction'], prompt: '伙伴用英语介绍自己叫 Amy，哪句话表达了相同的姓名信息？', options: ['My name is Amy.', 'How old are you?', 'Dear Amy'], correctOptionIndex: 0, hint: '选择介绍姓名的完整句子。', explanation: 'My name is Amy. 表示“我的名字叫 Amy”。' },
    { knowledgePointIds: ['name-and-self-introduction'], prompt: '哪句话适合用来向新伙伴介绍自己叫什么？', options: ['My name is Leo.', 'How old are you?', 'Dear Leo'], correctOptionIndex: 0, hint: '句子要说明说话者的姓名。', explanation: 'My name is Leo. 可以用于自我介绍姓名。' },
    { knowledgePointIds: ['name-and-self-introduction'], prompt: '写信时想礼貌地称呼 Sam，应该选择哪项？', options: ['Age Sam', 'Dear Sam', 'Class Sam'], correctOptionIndex: 1, hint: '用表示亲切称呼的词开头。', explanation: 'Dear Sam 是给 Sam 写信时使用的称呼。' },
    { knowledgePointIds: bothPoints, prompt: '哪一组只包含“姓名与称呼”相关的词？', options: ['my, your, name', 'age, old, year', 'class, grade, old'], correctOptionIndex: 0, hint: '先排除表示年龄或学校班级的信息。', explanation: 'my、your 和 name 都用于姓名表达或称呼。' },
    { knowledgePointIds: bothPoints, prompt: '同伴把 name 解释成“年龄”，哪条改正最准确？', options: ['name 表示“名字”', 'name 表示“年级”', 'name 表示“班级”'], correctOptionIndex: 0, hint: '把这个词和自我介绍中的信息对应起来。', explanation: 'name 表示“名字”，不是年龄、年级或班级。' },
    { knowledgePointIds: ['name-and-self-introduction'], prompt: '“Your name”里的两个词合起来是什么意思？', options: ['你的名字', '我的年龄', '你的班级'], correctOptionIndex: 0, hint: '分别核对所属对象和称呼信息。', explanation: 'your 表示“你的”，name 表示“名字”。' },
    { knowledgePointIds: ['age-and-class'], prompt: '在询问岁数的语境里，old 最接近哪种意思？', options: ['名字', '年龄相关', '班级名称'], correctOptionIndex: 1, hint: '结合 How old are you? 这句话判断。', explanation: 'How old are you? 用来询问年龄。' },
    { knowledgePointIds: ['age-and-class'], prompt: '哪项把年龄和班级两个词分别对应正确？', options: ['age=年级；class=年龄', 'age=年龄；class=班级', 'year=姓名；grade=称呼'], correctOptionIndex: 1, hint: '分清个人岁数和学校里的学习集体。', explanation: 'age 表示“年龄”，class 表示“班级”。' },
    { knowledgePointIds: bothPoints, prompt: '哪句话是在询问一个人的年龄，而不是介绍姓名？', options: ['How old are you?', 'My name is Amy.', 'Dear Amy'], correctOptionIndex: 0, hint: '看哪句话在向对方提问。', explanation: 'How old are you? 询问年龄；My name is Amy. 介绍姓名。' },
    { knowledgePointIds: ['age-and-class'], prompt: '小林把 grade 解释成“班级”，哪条改正最准确？', options: ['grade 表示“年级”', 'grade 表示“年龄”', 'grade 表示“名字”'], correctOptionIndex: 0, hint: 'grade 和 class 都与学校有关，但意思不同。', explanation: 'grade 表示“年级”，class 表示“班级”。' },
    { knowledgePointIds: ['age-and-class'], prompt: '哪一组只包含年龄或学校班级信息相关的词？', options: ['my, your, name', 'age, old, year', 'dear, name, my'], correctOptionIndex: 1, hint: '这些词都与岁数有关。', explanation: 'age、old 和 year 都与年龄表达有关。' },
    { knowledgePointIds: ['age-and-class'], prompt: '同伴想说“班级”，应该选哪个英文词？', options: ['class', 'grade', 'age'], correctOptionIndex: 0, hint: '不要把班级和年级混在一起。', explanation: 'class 表示“班级”，grade 表示“年级”。' },
    { knowledgePointIds: ['age-and-class'], prompt: '“年”这个意思对应哪个词？', options: ['name', 'year', 'your'], correctOptionIndex: 1, hint: '这个词可以和数字一起表示多少年。', explanation: 'year 表示“年”。' },
  ],
  high: [
    { knowledgePointIds: bothPoints, prompt: '信息卡写着 Name: Amy，Age: 8。Amy 说 “My name is Amy.”。哪项区分了句子和卡片提供的信息？', options: ['句子介绍姓名 Amy；年龄 8 来自信息卡。', '句子介绍年龄 8；姓名 Amy 来自信息卡。', '句子介绍班级 8；姓名 Amy 来自信息卡。'], correctOptionIndex: 0, hint: '先看句子直接介绍了什么，再看信息卡的另一栏。', explanation: 'My name is Amy. 直接介绍姓名；年龄 8 是信息卡提供的内容。' },
    { knowledgePointIds: ['age-and-class'], prompt: 'Ben 的信息卡写 Age: 9。Sam 问 “How old are you?”，这个问题要核对哪类信息，卡片上的数据是什么？', options: ['年龄；9 岁', '姓名；9 岁', '班级；9 班'], correctOptionIndex: 0, hint: '结合 old 的词义和信息卡上的 Age 栏。', explanation: 'How old are you? 询问年龄；Ben 的 Age 栏写着 9。' },
    { knowledgePointIds: bothPoints, prompt: 'Amy 说 “My name is Amy.”，信息卡还写着 Age: 8。哪张卡片的栏目名称和信息对应正确？', options: ['Name=姓名，Age=年龄', 'Name=年龄，Age=姓名', 'Name=班级，Age=年级'], correctOptionIndex: 0, hint: '句子里的 Amy 是姓名，Age 栏记录岁数。', explanation: 'My name is Amy. 介绍姓名；Age 表示年龄，所以两栏对应姓名和年龄。' },
    { knowledgePointIds: ['name-and-self-introduction'], prompt: 'Amy 说 “My name is Amy.”，词卡说明 my=我的、your=你的。哪项区分了说话人和听话人？', options: ['My name 中 my 指 Amy 自己；your name 中 your 指听话人。', 'my 指听话人；your 指说话人自己。', 'my 和 your 都表示“年龄”。'], correctOptionIndex: 0, hint: '看 my 和 your 分别指向说话者还是正在听的人。', explanation: 'Amy 说 My name is Amy. 时，my 指 Amy 自己；your 指听话人。' },
    { knowledgePointIds: bothPoints, prompt: '对话要先介绍姓名，再向伙伴询问年龄。哪种顺序符合这个交流目的？', options: ['My name is Amy. → How old are you?', 'How old are you? → My name is Amy.', 'How old are you? → How old are you?'], correctOptionIndex: 0, hint: '先看哪句话是在介绍姓名，再看哪句话是在询问年龄。', explanation: '先用 My name is Amy. 介绍姓名，再用 How old are you? 询问伙伴年龄。' },
    { knowledgePointIds: bothPoints, prompt: '介绍卡记录 Name: Amy、Age: 8、Class: 2。哪种对应关系让三项信息各归其位？', options: ['Amy—姓名；8—年龄；2—班级', 'Amy—年龄；8—班级；2—姓名', 'Amy—班级；8—姓名；2—年龄'], correctOptionIndex: 0, hint: '把姓名、岁数和班级分别核对。', explanation: 'Name 记录姓名 Amy，Age 记录 8 岁，Class 记录 2 班。' },
    { knowledgePointIds: bothPoints, prompt: 'Amy 说 “My name is Amy.”，Sam 问 “How old are you?”。若信息卡写 Age: 8，哪项理解了问句和卡片之间的关系？', options: ['Sam 在问年龄，卡片记录 Amy 是 8 岁。', 'Sam 在问姓名，卡片记录 Amy 是 8 岁。', 'Sam 在问班级，卡片记录 Amy 是 8 班。'], correctOptionIndex: 0, hint: '先判断问句询问哪项，再读取 Age 栏。', explanation: 'How old are you? 询问年龄，Age: 8 表示年龄是 8 岁。' },
    { knowledgePointIds: bothPoints, prompt: '个人卡写 Name: Li Ming、Age: 9、Grade: 3、Class: 2。哪项没有把四类信息混淆？', options: ['姓名 Li Ming；年龄 9；年级 3；班级 2', '姓名 9；年龄 Li Ming；年级 2；班级 3', '姓名 Li Ming；年龄 3；年级 9；班级 2'], correctOptionIndex: 0, hint: '逐项看 Name、Age、Grade 和 Class 的栏目名称。', explanation: 'Name、Age、Grade、Class 分别记录姓名、年龄、年级和班级。' },
    { knowledgePointIds: ['age-and-class'], prompt: 'Amy 的信息卡写 Age: 8。Sam 问她 “How old are you?”。哪项同时指出 you 指向谁、问句想了解什么？', options: ['you 指 Amy；Sam 想了解她的年龄。', 'you 指 Sam；Sam 想了解 Amy 的姓名。', 'you 指信息卡；Sam 想了解班级。'], correctOptionIndex: 0, hint: 'Sam 正在和 Amy 说话；再判断问句询问哪类信息。', explanation: '问句中的 you 指听话人 Amy；How old are you? 询问年龄。' },
    { knowledgePointIds: bothPoints, prompt: '信息卡写 Name: Ben、Age: 8。Ben 说 “My name is Ben.”。仅根据这句话，哪项能直接确认？', options: ['姓名是 Ben；年龄还需查看信息卡。', '年龄是 8 岁；姓名还需查看信息卡。', '姓名和年龄都由这句话直接说明。'], correctOptionIndex: 0, hint: '区分句子直接表达的内容和卡片额外提供的信息。', explanation: '这句话直接介绍姓名 Ben；年龄 8 是信息卡提供的，不能从这句话单独推出。' },
    { knowledgePointIds: ['age-and-class'], prompt: '在 “How old are you?” 里，old 与本单元的哪个个人信息主题有关？年数单位 year 表示什么？', options: ['old 与年龄有关；year 表示“年”。', 'old 与姓名有关；year 表示“班级”。', 'old 与班级有关；year 表示“名字”。'], correctOptionIndex: 0, hint: '结合问句的意思和 year 的词义分别判断。', explanation: 'How old are you? 询问年龄；year 表示“年”。' },
    { knowledgePointIds: bothPoints, prompt: '三项信息是 “My name is Ben.”、Age: 9、Class: 2。哪项把句子内容和卡片栏目整理正确？', options: ['姓名 Ben；年龄 9；班级 2', '姓名 9；年龄 Ben；班级 2', '姓名 Ben；年龄 2；班级 9'], correctOptionIndex: 0, hint: '句子介绍姓名；再按卡片标签读取另外两项。', explanation: 'My name is Ben. 介绍姓名；Age: 9 和 Class: 2 分别表示年龄和班级。' },
    { knowledgePointIds: bothPoints, prompt: '句子 “My name is Li Ming.” 中，my 和 name 分别提示什么？个人卡另写 Age: 9，这项属于哪个主题？', options: ['my=我的；name=名字；Age 属于年龄主题', 'my=你的；name=年龄；Age 属于姓名主题', 'my=班级；name=年级；Age 属于班级主题'], correctOptionIndex: 0, hint: '先理解自我介绍句，再看 Age 栏的含义。', explanation: 'my 表示“我的”，name 表示“名字”；Age 表示年龄。' },
    { knowledgePointIds: bothPoints, prompt: '信息卡写 Name: Li Ming、Age: 9、Class: 3。Li Ming 说 “My name is Li Ming.”，哪项没有把句子信息和卡片信息混在一起？', options: ['句子介绍姓名 Li Ming；卡片记录年龄 9 岁和 3 班。', '句子介绍年龄 9 岁；卡片记录姓名 3 和班级 Li Ming。', '句子介绍班级 3；卡片记录姓名 9 和年龄 Li Ming。'], correctOptionIndex: 0, hint: '识别句子中的 name，再读取卡片上的 Age 和 Class。', explanation: 'My name is Li Ming. 介绍姓名；Age: 9 与 Class: 3 是卡片记录的年龄和班级。' },
  ],
};

export const pilotEnglishSupplementalActivities: EnglishSupplementalChallengeActivity[] = Object.entries(drafts).flatMap(([difficulty, items]) => (
  items.map((draft, index) => {
    const activity: ChoiceActivityDefinition = {
      id: `challenge-supplement-grade-3-term-1-english-unit-01-${difficulty}-${String(index + 1).padStart(2, '0')}`,
      kind: 'choice',
      prompt: draft.prompt,
      options: draft.options.map((label, optionIndex) => ({ id: `option-${optionIndex + 1}`, label })),
      correctOptionId: `option-${draft.correctOptionIndex + 1}`,
      hint: draft.hint,
      explanation: draft.explanation,
    };
    return {
      difficulty: difficulty as Difficulty,
      sourceUnitId,
      knowledgePointIds: [...draft.knowledgePointIds],
      activity,
    };
  })
));
