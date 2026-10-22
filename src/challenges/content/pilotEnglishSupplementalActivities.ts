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
    { knowledgePointIds: ['name-and-self-introduction'], prompt: '哪句话可以告诉伙伴说话者叫什么？', options: ['How old are you?', 'My name is Amy.', 'I like blue.'], correctOptionIndex: 1, hint: '找一找包含介绍姓名线索的句子。', explanation: 'My name is Amy. 表示“我的名字叫 Amy”。' },
    { knowledgePointIds: ['name-and-self-introduction'], prompt: '给 Amy 写信，哪种英文称呼适合放在开头？', options: ['Old Amy', 'Dear Amy', 'Age Amy'], correctOptionIndex: 1, hint: '这个称呼常用来礼貌地叫对方。', explanation: 'Dear Amy 是写信时对 Amy 的称呼。' },
    { knowledgePointIds: ['name-and-self-introduction'], prompt: '同伴想介绍自己的名字，哪句话最符合这个目的？', options: ['My name is Ben.', 'How old are you?', 'Your name is Ben.'], correctOptionIndex: 0, hint: '选能直接说明说话者姓名的表达。', explanation: 'My name is Ben. 是自我介绍姓名的表达。' },
    { knowledgePointIds: ['age-and-class'], prompt: '表示“年龄”的英文词是哪一个？', options: ['name', 'age', 'my'], correctOptionIndex: 1, hint: '这个词和一个人几岁有关。', explanation: 'age 表示“年龄”。' },
    { knowledgePointIds: ['age-and-class'], prompt: '哪句话是在询问对方几岁？', options: ['How old are you?', 'What is your name?', 'Dear Amy'], correctOptionIndex: 0, hint: '留意询问岁数时会用到的词。', explanation: 'How old are you? 是在询问年龄。' },
    { knowledgePointIds: ['age-and-class'], prompt: '表示“年”的英文词是哪一个？', options: ['year', 'grade', 'name'], correctOptionIndex: 0, hint: '这个词也出现在表示年龄的短语里。', explanation: 'year 表示“年”。' },
    { knowledgePointIds: ['age-and-class'], prompt: '表示学校里的“班级”的英文词是哪一个？', options: ['class', 'age', 'your'], correctOptionIndex: 0, hint: '这个词和同学们一起学习的集体有关。', explanation: 'class 表示“班级”。' },
    { knowledgePointIds: ['age-and-class'], prompt: '表示“年级”的英文词是哪一个？', options: ['old', 'grade', 'my'], correctOptionIndex: 1, hint: '注意它和 class 的意思不同。', explanation: 'grade 表示“年级”。' },
    { knowledgePointIds: ['age-and-class'], prompt: '“How old are you?”最适合放在哪个主题小组？', options: ['姓名与称呼', '年龄与班级', '学习用品'], correctOptionIndex: 1, hint: '这句话想知道对方几岁。', explanation: '这句话询问年龄，属于“年龄与班级”主题。' },
    { knowledgePointIds: ['age-and-class'], prompt: '询问一个人几岁时，哪个词提示问题和岁数有关？', options: ['name', 'old', 'dear'], correctOptionIndex: 1, hint: '回想本单元询问年龄的句子。', explanation: 'How old are you? 中的 old 与询问年龄有关。' },
  ],
  advanced: [
    { knowledgePointIds: ['name-and-self-introduction'], prompt: 'my 和 your 分别表示谁的？哪条对应关系正确？', options: ['my=你的；your=我的', 'my=我的；your=你的', 'name=年龄；dear=班级'], correctOptionIndex: 1, hint: '分别判断两个词指的是谁。', explanation: 'my 表示“我的”，your 表示“你的”。' },
    { knowledgePointIds: ['name-and-self-introduction'], prompt: '伙伴用英语介绍自己叫 Amy，哪句话表达了相同的姓名信息？', options: ['My name is Amy.', 'How old are you?', 'I am eight years old.'], correctOptionIndex: 0, hint: '选择介绍姓名的完整句子。', explanation: 'My name is Amy. 表示“我的名字叫 Amy”。' },
    { knowledgePointIds: ['name-and-self-introduction'], prompt: '哪句话适合用来向新伙伴介绍自己叫什么？', options: ['My name is Leo.', 'How old are you?', 'I am eight years old.'], correctOptionIndex: 0, hint: '句子要说明说话者的姓名。', explanation: 'My name is Leo. 可以用于自我介绍姓名。' },
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
    { knowledgePointIds: bothPoints, prompt: '信息卡写着 Name: Amy，Age: 8。哪条中文记录对应正确？', options: ['姓名是 Amy，年龄是 8 岁', '年龄是 Amy，姓名是 8 岁', '班级是 Amy，年级是 8 岁'], correctOptionIndex: 0, hint: '先分别读懂两个英文栏目的意思。', explanation: 'Name 表示姓名，Age 表示年龄。' },
    { knowledgePointIds: bothPoints, prompt: '伙伴要检查“姓名”和“年龄”两项词义，哪条记录同时正确？', options: ['name=名字；age=年龄', 'name=年龄；age=名字', 'name=班级；age=年级'], correctOptionIndex: 0, hint: '把每个英文词分别和个人信息对应。', explanation: 'name 表示“名字”，age 表示“年龄”。' },
    { knowledgePointIds: bothPoints, prompt: '复习卡把 Name 和 Age 的中文标签写反了，哪条改正能让两项都正确？', options: ['Name=姓名；Age=年龄', 'Name=年龄；Age=姓名', 'Name=班级；Age=年级'], correctOptionIndex: 0, hint: '一个标签对应“叫什么”，另一个对应“几岁”。', explanation: 'Name 对应姓名，Age 对应年龄。' },
    { knowledgePointIds: bothPoints, prompt: '小卡片写着“my name”和“your age”，哪条理解同时正确？', options: ['我的名字；你的年龄', '我的年龄；你的名字', '你的班级；我的年级'], correctOptionIndex: 0, hint: '分别核对所属对象和个人信息类别。', explanation: 'my 表示“我的”，your 表示“你的”；name 是名字，age 是年龄。' },
    { knowledgePointIds: bothPoints, prompt: '哪组配对同时说明了姓名表达和年龄表达？', options: ['My name is Amy. — 介绍姓名；How old are you? — 询问年龄', 'My name is Amy. — 询问年龄；How old are you? — 介绍姓名', '两句话都表示班级'], correctOptionIndex: 0, hint: '逐句判断它是在介绍还是提问。', explanation: 'My name is Amy. 介绍姓名；How old are you? 询问年龄。' },
    { knowledgePointIds: bothPoints, prompt: '词卡有 name、age、class。哪条分类记录同时符合词义？', options: ['name 放姓名组；age 和 class 放年龄与班级组', 'age 放姓名组；name 和 class 放年龄与班级组', '三个词都放姓名组'], correctOptionIndex: 0, hint: '结合两个主题组的名称分类。', explanation: 'name 与姓名有关；age 和 class 分别表示年龄和班级。' },
    { knowledgePointIds: bothPoints, prompt: '同伴写“Dear Amy”，并把 old 解释成“姓名”。哪项核对结果正确？', options: ['Dear 是称呼；old 与年龄有关', 'Dear 表示年龄；old 表示称呼', 'Dear 和 old 都表示班级'], correctOptionIndex: 0, hint: '一个词用于称呼，另一个出现在询问岁数的表达里。', explanation: 'Dear Amy 是对 Amy 的称呼；How old are you? 用来询问年龄。' },
    { knowledgePointIds: bothPoints, prompt: '记录里有 name、class、grade 三个词，哪条解释同时正确？', options: ['name=名字；class=班级；grade=年级', 'name=年龄；class=年级；grade=名字', 'name=班级；class=名字；grade=年龄'], correctOptionIndex: 0, hint: '分别核对个人称呼、班级和年级。', explanation: 'name 是名字，class 是班级，grade 是年级。' },
    { knowledgePointIds: bothPoints, prompt: '同伴想核对姓名与年龄，哪组词义记录没有写反？', options: ['your=你的；age=年龄', 'your=我的；age=名字', 'your=年级；age=班级'], correctOptionIndex: 0, hint: '一项表示所属对象，一项表示个人岁数。', explanation: 'your 表示“你的”，age 表示“年龄”。' },
    { knowledgePointIds: bothPoints, prompt: '个人卡写着 Name: 8，Age: Amy。要让姓名和年龄都对应正确，怎样调整？', options: ['把 Amy 和 8 的位置互换', '保留原样，只把 Name 改成 Class', '删掉 Age，改用 Grade'], correctOptionIndex: 0, hint: '先判断哪项是姓名，哪项是数字年龄。', explanation: 'Amy 是姓名，8 表示年龄；交换两项内容后，姓名和年龄才对应正确。' },
    { knowledgePointIds: bothPoints, prompt: '一张词义卡要同时放入 name 和 year，哪项说明正确？', options: ['name=名字；year=年', 'name=年龄；year=名字', 'name=班级；year=称呼'], correctOptionIndex: 0, hint: 'name 与称呼相关，year 表示时间单位。', explanation: 'name 表示“名字”，year 表示“年”。' },
    { knowledgePointIds: bothPoints, prompt: '同伴把 my、name、age 三个词放进个人信息表，哪条解释全部正确？', options: ['my=我的；name=名字；age=年龄', 'my=你的；name=年龄；age=名字', 'my=年级；name=班级；age=我的'], correctOptionIndex: 0, hint: '分别检查所属对象、称呼内容和岁数。', explanation: 'my 是“我的”，name 是“名字”，age 是“年龄”。' },
    { knowledgePointIds: bothPoints, prompt: '记录“姓名与年龄”时，哪组词语最适合分别填写这两项？', options: ['name；age', 'class；grade', 'dear；your'], correctOptionIndex: 0, hint: '选择直接表示名字和岁数的词。', explanation: 'name 表示名字，age 表示年龄。' },
    { knowledgePointIds: bothPoints, prompt: '伙伴读到“Name: Li Ming; Class: 3”，哪条解释同时正确？', options: ['姓名是 Li Ming；班级信息是 3', '年龄是 Li Ming；姓名信息是 3', '年级是 Li Ming；年龄信息是 3'], correctOptionIndex: 0, hint: '先分别判断 Name 和 Class 表示什么。', explanation: 'Name 表示姓名，Class 表示班级。' },
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
