import type { ChoiceActivityDefinition, Difficulty } from '../../content/types';

interface ActivityDraft {
  knowledgePointIds: string[];
  prompt: string;
  answer: string;
  distractors: [string, string];
  hint: string;
  explanation: string;
}

export interface Grade1Term2EnglishUnit01SupplementalActivity {
  difficulty: Difficulty;
  sourceUnitId: string;
  knowledgePointIds: string[];
  activity: ChoiceActivityDefinition;
}

const sourceUnitId = 'grade-1/term-2/english/unit-01';
const idPrefix = 'challenge-supplement-grade-1-term-2-english-unit-01';
const classroomObjects = ['classroom-object-vocabulary'];
const positionWords = ['position-word-vocabulary'];
const locationQuestions = ['asking-about-location'];
const locationSentences = ['location-sentences-and-instructions'];

const drafts: Record<Difficulty, ActivityDraft[]> = {
  basic: [
    { knowledgePointIds: [...classroomObjects], prompt: '教室里，老师写字会用到哪件物品？', answer: 'blackboard', distractors: ['chair', 'desk'], hint: '想一想哪件物品是写字用的板。', explanation: 'blackboard 表示“黑板”，老师可以在黑板上写字。' },
    { knowledgePointIds: [...classroomObjects], prompt: '“The chair is under the desk.”中，哪一个词表示椅子？', answer: 'chair', distractors: ['desk', 'blackboard'], hint: '找出句子中表示可以坐的教室物品的词。', explanation: 'chair 表示“椅子”，desk 表示“书桌”。' },
    { knowledgePointIds: [...classroomObjects], prompt: '书本和铅笔盒可以放在哪件教室物品上？', answer: 'desk', distractors: ['chair', 'blackboard'], hint: '想一想教室里哪件物品有桌面。', explanation: 'desk 表示“书桌”，可以把书本和铅笔盒放在桌面上。' },
    { knowledgePointIds: [...positionWords, ...locationSentences], prompt: '“The pencil box is on the desk.”说明铅笔盒在哪里？', answer: '在桌子上', distractors: ['在桌子下面', '在书包里'], hint: '找一找句子中表示位置的词。', explanation: 'on 表示“在……上面”，所以铅笔盒在桌子上。' },
    { knowledgePointIds: [...positionWords, ...locationSentences], prompt: '要表达“椅子在桌子下面”，应选哪个位置词？', answer: 'under', distractors: ['on', 'in'], hint: '选一个表示上下位置关系的词。', explanation: 'under 表示“在……下面”，The chair is under the desk. 表示椅子在桌子下面。' },
    { knowledgePointIds: [...locationSentences], prompt: '老师说“Put your schoolbag on the chair.”，书包应放在哪里？', answer: '椅子上', distractors: ['椅子下面', '书包里'], hint: '听清指令里的位置词。', explanation: 'on the chair 表示“在椅子上”，应把书包放在椅子上。' },
    { knowledgePointIds: [...locationQuestions], prompt: '孩子想问“黑板在哪里？”，哪句话符合这个意思？', answer: 'Where is the blackboard?', distractors: ['Where is the chair?', 'The blackboard is on the desk.'], hint: '找出询问某件物品位置的句子。', explanation: 'Where is the blackboard? 是在问“黑板在哪里？”' },
    { knowledgePointIds: [...locationSentences, ...positionWords], prompt: '哪句话表示“书包在椅子下面”？', answer: 'The schoolbag is under the chair.', distractors: ['The schoolbag is on the chair.', 'The chair is under the desk.'], hint: '核对主语、位置词和物品名称。', explanation: 'The schoolbag is under the chair. 表示书包在椅子下面。' },
    { knowledgePointIds: [...positionWords, ...locationSentences], prompt: '“The pencil box is in the schoolbag.”中，in 表示什么？', answer: '在书包里面', distractors: ['在书包上面', '在书包下面'], hint: '想一想铅笔盒和书包是什么位置关系。', explanation: 'in 表示“在……里面”，铅笔盒在书包里。' },
    { knowledgePointIds: [...locationSentences, ...classroomObjects], prompt: '“The chair is on the desk.”的意思是什么？', answer: '椅子在桌子上', distractors: ['椅子在桌子下面', '桌子在椅子上'], hint: '先看清句子先说的是 chair 还是 desk。', explanation: 'The chair is on the desk. 表示椅子在桌子上。' },
    { knowledgePointIds: [...positionWords], prompt: '三个位置词中，哪一个表示物品在另一件物品的上面？', answer: 'on', distractors: ['under', 'in'], hint: '选一个表示上下关系的词。', explanation: 'on 表示“在……上面”；under 表示在下面，in 表示在里面。' },
    { knowledgePointIds: [...locationSentences, ...classroomObjects], prompt: '“The desk is under the blackboard.”表示什么？', answer: '书桌在黑板下面', distractors: ['黑板在书桌下面', '椅子在黑板下面'], hint: '按英文句子的先后顺序找物品和位置。', explanation: 'The desk 是书桌，under the blackboard 表示在黑板下面。' },
    { knowledgePointIds: [...locationQuestions, ...locationSentences], prompt: '回答“Where is the chair?”，哪句话提供了椅子的位置？', answer: 'The chair is under the desk.', distractors: ['This is a chair.', 'Where is the desk?'], hint: '问题在问位置，回答也要说明位置。', explanation: 'The chair is under the desk. 说明椅子在哪里。' },
    { knowledgePointIds: [...classroomObjects, ...positionWords], prompt: '哪一个词是教室物品的名称，不是位置词？', answer: 'blackboard', distractors: ['under', 'in'], hint: '分清物品名称和表示位置关系的词。', explanation: 'blackboard 表示“黑板”；under 和 in 都是位置词。' },
  ],
  advanced: [
    { knowledgePointIds: [...locationQuestions, ...locationSentences], prompt: '桌上的铅笔盒不见了，想问它现在在哪里，哪句话合适？', answer: 'Where is the pencil box?', distractors: ['What is the pencil box?', 'The pencil box is a desk.'], hint: '选择询问位置的句型。', explanation: 'Where is the pencil box? 是在问“铅笔盒在哪里？”' },
    { knowledgePointIds: [...locationSentences, ...positionWords], prompt: '老师要把书包从椅子上移到桌子上，哪条指令符合新位置？', answer: 'Put your schoolbag on the desk.', distractors: ['Put your schoolbag under the chair.', 'Put your pencil box in the schoolbag.'], hint: '同时核对要移动的物品和目标位置。', explanation: 'Put your schoolbag on the desk. 要求把书包放在桌子上。' },
    { knowledgePointIds: [...locationQuestions, ...classroomObjects], prompt: '有人问“Where is the desk?”，哪项回答了书桌的位置？', answer: 'The desk is under the blackboard.', distractors: ['The desk is a classroom object.', 'Where is the chair?'], hint: '回答位置问题时，要说出物品在哪里。', explanation: 'The desk is under the blackboard. 说明书桌在黑板下面。' },
    { knowledgePointIds: [...locationSentences, ...positionWords], prompt: '题目要求“椅子在桌子下面”，同伴写成“The chair is on the desk.”。改哪个词能改正位置？', answer: '把 on 改成 under', distractors: ['把 chair 改成 desk', '把 the 改成 is'], hint: '只检查表示位置关系的词。', explanation: 'on 表示在上面，under 表示在下面；把 on 改成 under。' },
    { knowledgePointIds: [...classroomObjects, ...positionWords], prompt: '哪一组把物品名称和位置词分得正确？', answer: 'desk 是物品；in 是位置词', distractors: ['under 是物品；chair 是位置词', 'on 是物品；blackboard 是位置词'], hint: '先判断词语指物品还是说明位置。', explanation: 'desk 表示书桌，in 表示在里面；chair 和 blackboard 也是物品名称。' },
    { knowledgePointIds: [...locationQuestions, ...locationSentences], prompt: '“The schoolbag is under the chair.”对应哪一个位置问题？', answer: 'Where is the schoolbag?', distractors: ['Where is the chair?', 'What is the schoolbag?'], hint: '问题中的物品要和句子里被说明位置的物品相同。', explanation: '句子说明书包的位置，所以可以问 Where is the schoolbag?。' },
    { knowledgePointIds: [...locationSentences, ...positionWords], prompt: '书包应放在椅子下面，铅笔盒应放进书包。哪项记录了两个位置？', answer: '书包在椅子下面；铅笔盒在书包里', distractors: ['书包在椅子上；铅笔盒在书包下面', '椅子在书包里；书包在铅笔盒上'], hint: '分别核对 under 和 in 表示的位置。', explanation: 'under the chair 是椅子下面，in the schoolbag 是书包里面。' },
    { knowledgePointIds: [...classroomObjects, ...locationSentences], prompt: '哪句话既说出黑板，也说明了它的位置？', answer: 'The blackboard is in the classroom.', distractors: ['Blackboard means “黑板”.', 'Where is the chair?'], hint: '选择一个完整的位置陈述句。', explanation: 'The blackboard is in the classroom. 说出了黑板及其所在位置。' },
    { knowledgePointIds: [...locationSentences, ...locationQuestions], prompt: '问题是“Where is the chair?”，同伴只回答“desk”。怎样补成完整的位置回答？', answer: 'The chair is under the desk.', distractors: ['Where is the desk?', 'The chair is a blackboard.'], hint: '回答要包含被询问的物品和它的位置。', explanation: 'The chair is under the desk. 是完整的位置回答。' },
    { knowledgePointIds: [...positionWords, ...locationSentences], prompt: '铅笔盒已经在书包里面，老师要把书包放在椅子上。完成后哪项正确？', answer: '铅笔盒仍在书包里，书包在椅子上', distractors: ['铅笔盒在椅子下面，书包在桌子上', '书包在铅笔盒里，椅子在桌子上'], hint: '分别保留 in 和 on 表示的关系。', explanation: 'in the schoolbag 表示铅笔盒在书包里；on the chair 表示书包在椅子上。' },
    { knowledgePointIds: [...locationQuestions], prompt: '要询问黑板的位置，哪句话的物品名称与问题目标一致？', answer: 'Where is the blackboard?', distractors: ['Where is the schoolbag?', 'The blackboard is under the desk.'], hint: '问题要询问 blackboard，而不是另一个物品。', explanation: 'Where is the blackboard? 询问的是黑板的位置。' },
    { knowledgePointIds: [...locationSentences, ...positionWords], prompt: '老师指着桌面说“Put the pencil box on the desk.”，同伴却把铅笔盒放进书包。哪项指出了应改的地方？', answer: '应把铅笔盒放在桌子上', distractors: ['应把桌子放进铅笔盒', '应把椅子放在书包下面'], hint: '比较指令中的 on the desk 和实际放置的位置。', explanation: '指令要求铅笔盒在桌子上，不是放进书包。' },
    { knowledgePointIds: [...locationQuestions, ...locationSentences], prompt: '同伴说“The chair is under the desk.”后，又问“Where is the desk?”。哪项能区分两句话的作用？', answer: '第一句说明椅子的位置，第二句询问书桌的位置', distractors: ['两句都在询问椅子的位置', '第一句询问书桌，第二句说明椅子'], hint: '看第一句是在陈述，还是以 Where is 开头提问。', explanation: 'The chair is under the desk. 是位置陈述；Where is the desk? 是位置问题。' },
    { knowledgePointIds: [...classroomObjects, ...positionWords], prompt: '“The desk is under the blackboard.”中，哪项说法正确？', answer: 'desk 和 blackboard 是物品，under 表示位置', distractors: ['desk 是位置词，under 是物品', 'blackboard 表示“在里面”'], hint: '把句子中的两个物品词与位置词分开。', explanation: 'desk 是书桌，blackboard 是黑板，under 表示“在……下面”。' },
    { knowledgePointIds: [...classroomObjects, ...locationSentences], prompt: '执行“Put your schoolbag under the chair.”时，哪件物品要移动？', answer: 'schoolbag', distractors: ['chair', 'desk'], hint: '看指令中 Put your 后面的物品名称。', explanation: 'Put your schoolbag under the chair. 要移动的是 schoolbag，也就是书包。' },
    { knowledgePointIds: [...positionWords, ...locationSentences], prompt: '短语“under the blackboard”说明哪个位置？', answer: '黑板下面', distractors: ['黑板上面', '黑板里面'], hint: '先理解 under 表示的方向，再看它后面的物品。', explanation: 'under the blackboard 表示在黑板下面。' },
    { knowledgePointIds: [...locationSentences, ...classroomObjects], prompt: '书桌在黑板下面。哪句话准确表达这个位置？', answer: 'The desk is under the blackboard.', distractors: ['The blackboard is under the desk.', 'The chair is under the blackboard.'], hint: '检查句子开头的物品和 under 后面的物品。', explanation: 'The desk is under the blackboard. 表示书桌在黑板下面。' },
    { knowledgePointIds: [...positionWords, ...locationSentences], prompt: '“The pencil box is on the desk.”中，哪一部分表示位置关系？', answer: 'on the desk', distractors: ['the pencil box', 'is on'], hint: '找出说明铅笔盒在哪里的词组。', explanation: 'on the desk 表示在书桌上，是句子中的位置短语。' },
    { knowledgePointIds: [...locationQuestions, ...locationSentences], prompt: '要把“The blackboard is in the classroom.”改成询问黑板在哪里，应该选哪句？', answer: 'Where is the blackboard?', distractors: ['Where is the chair?', 'The blackboard is under the desk.'], hint: '询问位置时用 Where is，并保留 blackboard。', explanation: 'Where is the blackboard? 是在询问黑板的位置。' },
    { knowledgePointIds: [...classroomObjects, ...locationSentences], prompt: '“Put my pencil box in the schoolbag.”中，哪个词表示“我的”？', answer: 'my', distractors: ['your', 'in'], hint: '注意表示所属关系的词。', explanation: 'my 表示“我的”，my pencil box 是“我的铅笔盒”。' },
  ],
  high: [
    { knowledgePointIds: [...locationSentences, ...positionWords], prompt: '铅笔盒在书包里，书包在椅子下面。哪句话能说明铅笔盒最后在哪里？', answer: '铅笔盒在椅子下面', distractors: ['铅笔盒在书桌上', '书包在铅笔盒下面'], hint: '先看铅笔盒和书包的关系，再看书包的位置。', explanation: '铅笔盒在书包里，书包在椅子下面，因此铅笔盒随书包一起在椅子下面。' },
    { knowledgePointIds: [...locationQuestions, ...locationSentences], prompt: 'A 问“Where is the chair?”，B 回答“The chair is under the desk.”。哪项同时说明问题和回答？', answer: 'A 在问椅子的位置，B 说椅子在桌子下面', distractors: ['A 在问桌子的名称，B 说椅子在桌子上', 'A 在问黑板的位置，B 说书包在椅子下面'], hint: '分别核对 Where is 提问的物品和回答中的位置。', explanation: '问题询问椅子在哪里，回答说明椅子在桌子下面。' },
    { knowledgePointIds: [...locationSentences, ...positionWords], prompt: '指令要求把书包放在椅子下面，记录却写“The schoolbag is on the chair.”。哪项修正了位置？', answer: '把 on 改成 under', distractors: ['把 schoolbag 改成 chair', '把 chair 改成 desk，保留 on'], hint: '保留书包和椅子，只核对上下关系。', explanation: '指令要求 under the chair，应把表示“在上面”的 on 改为 under。' },
    { knowledgePointIds: [...classroomObjects, ...positionWords], prompt: '要把两张词卡分别放进“教室物品”和“位置词”两栏，哪组分类全对？', answer: 'blackboard 放物品栏，under 放位置词栏', distractors: ['chair 放位置词栏，on 放物品栏', 'in 放物品栏，desk 放位置词栏'], hint: '判断每个词是在命名物品，还是在说明位置关系。', explanation: 'blackboard 是教室物品，under 是位置词。' },
    { knowledgePointIds: [...locationSentences, ...locationQuestions], prompt: '桌子在黑板下面，书包在椅子上。哪组问答都与记录相符？', answer: 'Where is the desk? — The desk is under the blackboard.', distractors: ['Where is the schoolbag? — The schoolbag is under the chair.', 'Where is the blackboard? — The blackboard is on the desk.'], hint: '先对照问题中的物品，再核对回答的位置关系。', explanation: '记录说明书桌在黑板下面，因此这组问答一致。' },
    { knowledgePointIds: [...locationSentences, ...positionWords], prompt: '铅笔盒先放进书包，书包再放到桌子上。哪项保留了两个位置关系？', answer: '铅笔盒在书包里，书包在桌子上', distractors: ['铅笔盒在桌子下面，书包在椅子上', '书包在铅笔盒里，桌子在书包下面'], hint: '依次检查 in the schoolbag 和 on the desk。', explanation: 'in 表示铅笔盒在书包里，on 表示书包在桌子上。' },
    { knowledgePointIds: [...locationQuestions, ...classroomObjects], prompt: '老师想确认“黑板在哪里？”，哪组问句和回答中的物品都对应黑板？', answer: 'Where is the blackboard? — The blackboard is in the classroom.', distractors: ['Where is the chair? — The desk is under the blackboard.', 'Where is the schoolbag? — The chair is on the desk.'], hint: '检查问句和回答都围绕同一件物品。', explanation: '问句和回答都谈到 blackboard，回答也说明了黑板的位置。' },
    { knowledgePointIds: [...locationSentences, ...locationQuestions], prompt: '同伴把“Where is the desk?”和“The chair is under the desk.”连在一起。哪项说明了不匹配的地方？', answer: '问题问书桌的位置，回答却说明椅子的位置', distractors: ['问题和回答都说明黑板的位置', '问题询问椅子，回答说明书包的位置'], hint: '比较 Where is 后面的物品和回答开头的物品。', explanation: 'Where is the desk? 问书桌，回答应说明 desk 的位置，而不是 chair 的位置。' },
    { knowledgePointIds: [...locationSentences, ...positionWords], prompt: '桌上原有书包，老师要求把书包移到椅子下面，并把铅笔盒放进书包。最后哪项正确？', answer: '书包在椅子下面，铅笔盒在书包里', distractors: ['书包在椅子上，铅笔盒在桌子下面', '铅笔盒在椅子上，书包在桌子里'], hint: '按指令顺序核对书包和铅笔盒各自的位置。', explanation: 'under the chair 表示书包在椅子下面；in the schoolbag 表示铅笔盒在书包里。' },
    { knowledgePointIds: [...classroomObjects, ...locationSentences], prompt: '“The desk is under the blackboard.”和“The blackboard is under the desk.”意思相同吗？', answer: '不同；第一句是书桌在黑板下面', distractors: ['相同；两句都说书桌在黑板下面', '不同；第一句是椅子在书桌下面'], hint: '逐句看清主语是谁，以及 under 后面是谁。', explanation: '交换 desk 和 blackboard 的位置会改变谁在谁下面，所以两句意思不同。' },
    { knowledgePointIds: [...locationQuestions, ...locationSentences], prompt: '需要先问桌子的位置，再根据记录回答“书桌在黑板下面”。哪组顺序正确？', answer: 'Where is the desk? — The desk is under the blackboard.', distractors: ['The desk is under the blackboard. — Where is the chair?', 'Where is the blackboard? — The chair is under the desk.'], hint: '先放询问 desk 的问题，再放对应的 desk 位置回答。', explanation: '先问 Where is the desk?，再回答 The desk is under the blackboard.。' },
    { knowledgePointIds: [...locationSentences, ...positionWords], prompt: '同伴按“Put the pencil box in the schoolbag.”做完后说“The pencil box is on the schoolbag.”。哪项找出了位置错误？', answer: 'in 表示在书包里面，不是 on 表示在书包上面', distractors: ['两个位置词都表示在书包下面', '应把 schoolbag 改成 chair，位置词不变'], hint: '区分“在里面”和“在上面”这两个位置关系。', explanation: 'in the schoolbag 是在书包里面；on the schoolbag 是在书包上面。' },
    { knowledgePointIds: [...classroomObjects, ...positionWords], prompt: '哪组词按“物品、位置、物品”的顺序排列？', answer: 'chair、under、desk', distractors: ['on、blackboard、in', 'in、under、chair'], hint: 'chair 和 desk 命名物品，under 表示位置关系。', explanation: 'chair 是椅子，under 是位置词，desk 是书桌。' },
    { knowledgePointIds: [...locationQuestions, ...locationSentences], prompt: '老师说“Where is the chair?”，记录员写了“Where is the desk?”。若要保留回答“The chair is on the desk.”，应怎样改问句？', answer: '把 desk 改成 chair：Where is the chair?', distractors: ['把 chair 改成 schoolbag：Where is the schoolbag?', '不改，问句与回答已经指同一件物品'], hint: '问句询问的物品应和回答中说明位置的物品一致。', explanation: '回答说明 chair 的位置，问句也应询问 chair。' },
    { knowledgePointIds: [...classroomObjects, ...positionWords], prompt: '书桌在黑板下面，椅子在书桌下面。哪件物品直接在黑板下面？', answer: '书桌', distractors: ['椅子', '黑板'], hint: '先找紧挨着 under the blackboard 的物品。', explanation: '书桌直接在黑板下面；椅子在书桌下面。' },
    { knowledgePointIds: [...locationSentences, ...positionWords], prompt: '记录“The desk is under the blackboard. The chair is under the desk.”中，哪项保留了两条位置关系？', answer: '书桌在黑板下面，椅子在书桌下面', distractors: ['黑板在书桌下面，椅子在黑板上面', '书桌在椅子下面，黑板在书桌上面'], hint: '分别核对两句话里 under 前后的物品。', explanation: '第一句是书桌在黑板下面，第二句是椅子在书桌下面。' },
    { knowledgePointIds: [...classroomObjects, ...locationSentences], prompt: '书包在椅子下面，铅笔盒在书包里。哪件物品直接在椅子下面？', answer: '书包', distractors: ['铅笔盒', '书桌'], hint: '分清直接放在椅子下的物品和容器内部的物品。', explanation: '书包直接在椅子下面，铅笔盒在书包里。' },
    { knowledgePointIds: [...classroomObjects, ...locationSentences], prompt: '记录“The blackboard is in the classroom.”和“The desk is under the blackboard.”，哪项复述了两条信息？', answer: '黑板在教室里，书桌在黑板下面', distractors: ['书桌在教室里，黑板在书桌下面', '黑板在书桌上面，书桌在教室里面'], hint: '分别核对 in the classroom 和 under the blackboard。', explanation: '第一句说明黑板在教室里，第二句说明书桌在黑板下面。' },
  ],
};

function createActivity(draft: ActivityDraft, difficulty: Difficulty, index: number): Grade1Term2EnglishUnit01SupplementalActivity {
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
  return { difficulty, sourceUnitId, knowledgePointIds: [...new Set(draft.knowledgePointIds)], activity };
}

export const grade1Term2EnglishUnit01SupplementalActivities = (Object.entries(drafts) as [Difficulty, ActivityDraft[]][])
  .flatMap(([difficulty, items]) => items.map((draft, index) => createActivity(draft, difficulty, index)));
