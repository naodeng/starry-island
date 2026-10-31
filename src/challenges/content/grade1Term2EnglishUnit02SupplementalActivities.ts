import type { ChoiceActivityDefinition, Difficulty } from '../../content/types';

interface ActivityDraft {
  knowledgePointIds: string[];
  prompt: string;
  answer: string;
  distractors: [string, string];
  hint: string;
  explanation: string;
}

export interface Grade1Term2EnglishUnit02SupplementalActivity {
  difficulty: Difficulty;
  sourceUnitId: string;
  knowledgePointIds: string[];
  activity: ChoiceActivityDefinition;
}

const sourceUnitId = 'grade-1/term-2/english/unit-02';
const idPrefix = 'challenge-supplement-grade-1-term-2-english-unit-02';
const roomObjects = ['room-object-vocabulary'];
const positionWords = ['position-word-vocabulary'];
const locationSentences = ['room-location-sentences'];
const sentenceOrder = ['room-sentence-word-order'];

const drafts: Record<Difficulty, ActivityDraft[]> = {
  basic: [
    { knowledgePointIds: [...roomObjects], prompt: 'light 表示哪件房间物品？', answer: '灯', distractors: ['床', '门'], hint: '想一想晚上照亮房间的物品。', explanation: 'light 表示“灯”。' },
    { knowledgePointIds: [...roomObjects], prompt: '哪一个英文词表示“床”？', answer: 'bed', distractors: ['box', 'door'], hint: '先回想本单元的房间物品词卡。', explanation: 'bed 表示“床”。' },
    { knowledgePointIds: [...roomObjects], prompt: 'door 的中文意思是什么？', answer: '门', distractors: ['灯', '盒子'], hint: '房间进出时会经过哪件物品？', explanation: 'door 表示“门”。' },
    { knowledgePointIds: [...roomObjects], prompt: '盒子对应哪个英文词？', answer: 'box', distractors: ['bed', 'light'], hint: '找出本单元表示盒子的词。', explanation: 'box 表示“盒子”。' },
    { knowledgePointIds: [...roomObjects, ...positionWords], prompt: '哪一个是房间物品，不是位置词？', answer: 'bed', distractors: ['near', 'behind'], hint: '床能摆在房间里；另外两个词表示位置。', explanation: 'bed 表示“床”，是房间物品；near 和 behind 表示位置。' },
    { knowledgePointIds: [...positionWords], prompt: 'near 表示物品在另一件物品的什么位置？', answer: '旁边或靠近', distractors: ['后面', '上方'], hint: '想一想两个物品挨得比较近时怎么说。', explanation: 'near 表示“靠近、在……旁边”。' },
    { knowledgePointIds: [...positionWords], prompt: 'behind 表示什么位置关系？', answer: '在……后面', distractors: ['在……旁边', '在……前面'], hint: '想一想被另一件物品挡在后方的位置。', explanation: 'behind 表示“在……后面”。' },
    { knowledgePointIds: [...locationSentences, ...positionWords], prompt: '“The box is near the bed.”说明盒子在哪里？', answer: '在床旁边', distractors: ['在门后面', '在灯上面'], hint: '看清 near 后面提到的是哪件房间物品。', explanation: 'near the bed 表示在床旁边。' },
    { knowledgePointIds: [...locationSentences, ...positionWords], prompt: '“The box is behind the door.”中，盒子在哪里？', answer: '在门后面', distractors: ['在床旁边', '在灯旁边'], hint: '先找句子里的位置词，再看它连接的物品。', explanation: 'behind the door 表示在门后面。' },
    { knowledgePointIds: [...roomObjects, ...locationSentences], prompt: '“The ___ is near the bed.”要表达盒子在床旁边，空格填什么？', answer: 'box', distractors: ['near', 'behind'], hint: '空格里需要填一件房间物品。', explanation: 'box 是“盒子”，The box is near the bed. 表示盒子在床旁边。' },
    { knowledgePointIds: [...positionWords, ...locationSentences], prompt: '要说盒子在床旁边，“The box is ___ the bed.”应填哪个词？', answer: 'near', distractors: ['behind', 'door'], hint: '题目说的是在旁边，不是在后面。', explanation: 'near the bed 表示在床旁边。' },
    { knowledgePointIds: [...roomObjects], prompt: '下面哪组英文词和中文意思配对正确？', answer: 'light—灯', distractors: ['bed—门', 'door—盒子'], hint: '逐个回想本单元的房间物品词义。', explanation: 'light 表示灯；bed 表示床，door 表示门。' },
    { knowledgePointIds: [...locationSentences], prompt: '哪句话说明盒子在门后面？', answer: 'The box is behind the door.', distractors: ['The box is near the bed.', 'The bed is behind the box.'], hint: '核对句子里的物品和位置词。', explanation: 'The box is behind the door. 表示盒子在门后面。' },
    { knowledgePointIds: [...positionWords], prompt: 'near 和 behind 都属于哪一类词？', answer: '位置词', distractors: ['房间物品词', '颜色词'], hint: '它们都帮助说明物品在哪里。', explanation: 'near 和 behind 都表示位置关系。' },
  ],
  advanced: [
    { knowledgePointIds: [...roomObjects, ...locationSentences], prompt: '记录写着“The box is near the bed.”，哪项准确复述了盒子的位置？', answer: '盒子在床旁边', distractors: ['盒子在门后面', '床在盒子旁边'], hint: '先确认句子的主语，再看 near 后的物品。', explanation: 'The box 是盒子，near the bed 表示在床旁边。' },
    { knowledgePointIds: [...positionWords, ...locationSentences], prompt: '要把“盒子在门后面”写成英文，哪句合适？', answer: 'The box is behind the door.', distractors: ['The box is near the bed.', 'The bed is behind the box.'], hint: '注意题目要求的物品和“后面”关系。', explanation: 'behind the door 表示在门后面，句子主语是盒子。' },
    { knowledgePointIds: [...locationSentences, ...sentenceOrder], prompt: '单词卡是 The、bed、near、is、box、the、.，哪句排得正确？', answer: 'The box is near the bed.', distractors: ['The bed near is the box.', 'Near the box is bed the.'], hint: '先说物品，再用 is near 连接位置。', explanation: '正确词序是 The box is near the bed.。' },
    { knowledgePointIds: [...locationSentences, ...positionWords], prompt: '同伴要表达盒子在床旁边，却写成“The box is behind the bed.”，改哪个词？', answer: '把 behind 改成 near', distractors: ['把 box 改成 bed', '把 is 改成 door'], hint: '只核对表示位置关系的词。', explanation: 'near 表示旁边；behind 表示后面。' },
    { knowledgePointIds: [...roomObjects], prompt: '哪两个词都表示房间里的物品？', answer: 'light 和 door', distractors: ['near 和 behind', 'bed 和 near'], hint: '位置词不是物品名称。', explanation: 'light 是灯，door 是门；near 和 behind 是位置词。' },
    { knowledgePointIds: [...locationSentences, ...positionWords], prompt: '房间记录是“The bed is near the door.”，哪项没有改变记录中的位置关系？', answer: '床在门旁边', distractors: ['床在门后面', '门在床后面'], hint: 'near 表示靠近，并留意句子先说的是 bed。', explanation: 'The bed is near the door. 表示床在门旁边。' },
    { knowledgePointIds: [...roomObjects, ...positionWords], prompt: '要完成“The light is ___ the bed.”，并让句子表示灯在床后面，应填什么？', answer: 'behind', distractors: ['near', 'box'], hint: '题目要求“后面”，不是“旁边”。', explanation: 'behind the bed 表示在床后面。' },
    { knowledgePointIds: [...locationSentences, ...sentenceOrder], prompt: '把“bed / The / behind / door / is / the / .”排成句子，哪项正确？', answer: 'The bed is behind the door.', distractors: ['The behind is bed the door.', 'Behind the door bed is the.'], hint: '句子从物品名称开始，再接 is behind。', explanation: '正确词序是 The bed is behind the door.。' },
    { knowledgePointIds: [...roomObjects, ...locationSentences], prompt: '小卡写着“door”，旁边的中文意思应选哪项？', answer: '门', distractors: ['盒子', '床'], hint: 'door 是房间里可以开合的一处。', explanation: 'door 表示“门”。' },
    { knowledgePointIds: [...locationSentences, ...positionWords], prompt: '哪句话表示灯靠近门，而不是在门后面？', answer: 'The light is near the door.', distractors: ['The light is behind the door.', 'The door is near the light.'], hint: '核对 near 和 behind 的区别，再看主语。', explanation: 'near the door 表示灯靠近门。' },
    { knowledgePointIds: [...roomObjects, ...positionWords], prompt: '两张词卡分别是“bed”和“behind”，哪项分类正确？', answer: 'bed 是房间物品，behind 是位置词', distractors: ['bed 是位置词，behind 是房间物品', '两个都是房间物品'], hint: '一个命名物品，一个说明位置。', explanation: 'bed 表示床，behind 表示在后面。' },
    { knowledgePointIds: [...locationSentences], prompt: '“The box is behind the door.”中的 is 把哪两部分连起来？', answer: '盒子和它的位置说明', distractors: ['门和床的名称', '两个位置词'], hint: '找出句子说的物品，以及后面描述的内容。', explanation: '句子先说盒子，再说明盒子在门后面。' },
    { knowledgePointIds: [...locationSentences, ...positionWords], prompt: '记录是“The box is near the door.”，哪项符合记录？', answer: '盒子靠近门', distractors: ['盒子在门后面', '门靠近床'], hint: 'near the door 表示盒子在门旁边。', explanation: 'near 表示靠近，所以盒子靠近门。' },
    { knowledgePointIds: [...locationSentences, ...sentenceOrder], prompt: '单词卡 box / behind / The / door / is / the / .，要写“盒子在门后面”，应选哪句？', answer: 'The box is behind the door.', distractors: ['The door is behind the box.', 'The box behind is door the.'], hint: '物品 box 放在句首，接 is behind。', explanation: '正确词序是 The box is behind the door.。' },
    { knowledgePointIds: [...roomObjects], prompt: '哪项把四个房间物品词都配对正确？', answer: 'light—灯，bed—床，door—门，box—盒子', distractors: ['light—床，bed—灯，door—盒子，box—门', 'light—门，bed—盒子，door—灯，box—床'], hint: '逐个核对四个词卡的中文意思。', explanation: 'light、bed、door、box 分别表示灯、床、门、盒子。' },
    { knowledgePointIds: [...locationSentences, ...positionWords], prompt: '同伴把“near”解释成“在后面”。哪项改正了这个词义？', answer: 'near 表示靠近或在旁边', distractors: ['near 表示在前面', 'near 表示房间物品'], hint: '区别靠近和被挡在后方这两种位置。', explanation: 'near 表示靠近；behind 才表示在后面。' },
    { knowledgePointIds: [...locationSentences, ...roomObjects], prompt: '句子“The bed is behind the light.”说的是哪件物品在后面？', answer: '床在灯后面', distractors: ['灯在床后面', '盒子在灯旁边'], hint: '先找句子开头的物品，再读 behind 后面的词。', explanation: 'The bed 是床，句子说明床在灯后面。' },
    { knowledgePointIds: [...locationSentences, ...sentenceOrder], prompt: '想把 light、near、door 组成“灯在门旁边”，哪句词序正确？', answer: 'The light is near the door.', distractors: ['The near is light the door.', 'The door near light is the.'], hint: '先说 light，再说 is near the door。', explanation: '正确词序是 The light is near the door.。' },
    { knowledgePointIds: [...positionWords, ...locationSentences], prompt: '“The box is behind the bed.”和“The box is near the bed.”，两句相同在哪里？', answer: '都在说盒子相对床的位置', distractors: ['都说盒子在床后面', '都说床在门旁边'], hint: '比较两句共同提到的物品。', explanation: '两句都描述盒子和床的位置关系，但 near 与 behind 表示的位置不同。' },
    { knowledgePointIds: [...locationSentences, ...roomObjects], prompt: '要核对“盒子在门后面”，哪组物品和位置词都要检查？', answer: 'box、door 和 behind', distractors: ['bed、light 和 near', 'door、bed 和 light'], hint: '找出句子里说的物品、参照物和位置关系。', explanation: 'The box is behind the door. 包含 box、door 和 behind。' },
  ],
  high: [
    { knowledgePointIds: [...roomObjects, ...locationSentences], prompt: '记录A：“The box is near the bed.”记录B：“The bed is behind the door.”，哪项同时复述了两条记录？', answer: '盒子在床旁边，床在门后面', distractors: ['盒子在门后面，床在盒子旁边', '床在门旁边，盒子在床后面'], hint: '分别检查每句的主语和位置词。', explanation: 'A 说明盒子在床旁边；B 说明床在门后面。' },
    { knowledgePointIds: [...locationSentences, ...positionWords], prompt: '需要记录“灯在门旁边，盒子在床后面”，哪组句子都符合？', answer: 'The light is near the door. The box is behind the bed.', distractors: ['The light is behind the door. The box is near the bed.', 'The door is near the light. The bed is behind the box.'], hint: '逐句核对物品、参照物和 near/behind。', explanation: 'near 表示旁边，behind 表示后面，两句话都与记录一致。' },
    { knowledgePointIds: [...roomObjects, ...positionWords], prompt: '同伴说“bed 是位置词，near 是房间物品”。哪项一次改正了两处分类？', answer: 'bed 是房间物品，near 是位置词', distractors: ['bed 和 near 都是房间物品', 'bed 是位置词，near 是颜色词'], hint: '床能摆在房间里；near 描述物品之间的关系。', explanation: 'bed 表示床，near 表示靠近的位置关系。' },
    { knowledgePointIds: [...locationSentences, ...sentenceOrder], prompt: '词卡是 door / The / near / box / is / the / .，要表达盒子在门旁边，哪句正确？', answer: 'The box is near the door.', distractors: ['The door is behind the box.', 'The near box is the door.'], hint: '先说明盒子，再用 is near the door 描述位置。', explanation: '正确词序是 The box is near the door.。' },
    { knowledgePointIds: [...locationSentences, ...positionWords], prompt: '题目要求“床在灯后面”，草稿却写“The light is behind the bed.”。哪项指出了问题？', answer: '主语和参照物顺序反了，草稿说的是灯在床后面', distractors: ['behind 应改成 near，其他不变', 'bed 应改成 door，句子就相同'], hint: 'behind 表示后面，先核对句首物品，再看它后面的参照物。', explanation: '题目要求床在灯后面；The light is behind the bed. 却表示灯在床后面。' },
    { knowledgePointIds: [...roomObjects, ...locationSentences], prompt: '“light”表示灯，“bed”表示床。若记录要求床在灯后面，哪句话符合？', answer: 'The bed is behind the light.', distractors: ['The light is behind the bed.', 'The box is near the door.'], hint: '先按要求确定句首物品，再选表示后面的词。', explanation: 'The bed is behind the light. 表示床在灯后面。' },
    { knowledgePointIds: [...locationSentences, ...sentenceOrder], prompt: '四张卡是 The box、is、behind the door、.，按本单元“物品、is、位置说明”的句型顺序连接后应选哪句？', answer: 'The box is behind the door.', distractors: ['The box behind is the door.', 'The behind box is door the.'], hint: '按“物品、is、位置说明、句号”的顺序连接。', explanation: '本单元用“物品 + is + 位置说明”表达位置，正确句子是 The box is behind the door.。' },
    { knowledgePointIds: [...locationSentences, ...positionWords], prompt: '记录一说“盒子在床旁边”，记录二说“盒子在床后面”。哪项说明了两条记录的差别？', answer: 'near 和 behind 表示不同位置', distractors: ['box 和 bed 表示不同位置词', '两条记录的意思完全相同'], hint: '比较表示位置关系的词，而不是物品名称。', explanation: 'near 表示旁边，behind 表示后面，因此两条记录不同。' },
    { knowledgePointIds: [...roomObjects, ...locationSentences], prompt: '房间记录为“床在门旁边，盒子在灯后面”。哪项把两条信息都对应正确？', answer: 'The bed is near the door. The box is behind the light.', distractors: ['The door is near the bed. The light is behind the box.', 'The bed is behind the door. The box is near the light.'], hint: '分别核对每句开头的物品和位置词。', explanation: '第一句以 bed 为主语并用 near，第二句以 box 为主语并用 behind。' },
    { knowledgePointIds: [...locationSentences, ...roomObjects], prompt: '句子“The door is behind the box.”中，哪件物品在后面？', answer: '门在盒子后面', distractors: ['盒子在门后面', '盒子在床旁边'], hint: '句子先说 door，再看 behind 后面的物品。', explanation: 'The door 是主语，所以句子说门在盒子后面。' },
    { knowledgePointIds: [...roomObjects, ...locationSentences], prompt: '已知“The box is near the bed.”，现在要把床换成门，哪句只更换了参照物？', answer: 'The box is near the door.', distractors: ['The door is behind the box.', 'The bed is near the box.'], hint: '保留 box 和 near，只替换 bed。', explanation: 'The box is near the door. 保留了盒子和 near，只把 bed 换成 door。' },
    { knowledgePointIds: [...locationSentences, ...positionWords], prompt: '记录要表达灯在床后面，哪组主语和位置词正确？', answer: 'The light is behind the bed.', distractors: ['The bed is near the light.', 'The light is near the bed.'], hint: '检查句首物品是 light，再检查位置词是 behind。', explanation: 'The light is behind the bed. 表示灯在床后面。' },
    { knowledgePointIds: [...locationSentences, ...sentenceOrder], prompt: '同伴把句子写成“The near is box the bed.”。要表达盒子在床旁边，哪项改写正确？', answer: 'The box is near the bed.', distractors: ['The bed near is the box.', 'Near is the bed box the.'], hint: '先放物品名称，再接 is near 和参照物。', explanation: '正确句子是 The box is near the bed.。' },
    { knowledgePointIds: [...roomObjects, ...positionWords], prompt: '三张词卡是 box、door、behind，哪项把它们分别归到正确类别？', answer: 'box、door 是房间物品；behind 是位置词', distractors: ['box 是位置词；door、behind 是物品', 'box、behind 是物品；door 是位置词'], hint: '判断每个词是在命名东西，还是说明东西在哪里。', explanation: 'box 和 door 是房间物品，behind 表示位置。' },
    { knowledgePointIds: [...locationSentences, ...positionWords], prompt: '记录是“The bed is near the light.”，哪句只改变了位置词？', answer: 'The bed is behind the light.', distractors: ['The door is near the light.', 'The bed is near the door.'], hint: '保留 bed 和 light，只替换表示位置的词。', explanation: 'behind 替换了 near，句中的两件物品保持不变。' },
    { knowledgePointIds: [...locationSentences, ...roomObjects], prompt: 'A说“床在门后面”，B说“盒子在灯旁边”。哪组英文按顺序对应A、B？', answer: 'The bed is behind the door.；The box is near the light.', distractors: ['The door is behind the bed.；The light is near the box.', 'The bed is near the door.；The box is behind the light.'], hint: '先核对A的床和门，再核对B的盒子和灯。', explanation: '第一句描述床在门后面，第二句描述盒子在灯旁边。' },
    { knowledgePointIds: [...locationSentences, ...positionWords], prompt: '记录“The box is behind the bed.”，同伴把 behind 换成 near。改后的句子表示什么？', answer: '盒子在床旁边', distractors: ['盒子在床后面', '床在盒子后面'], hint: '改词后重新读一遍位置关系。', explanation: 'The box is near the bed. 表示盒子在床旁边。' },
    { knowledgePointIds: [...roomObjects, ...locationSentences], prompt: '要复述“灯在门旁边，床在盒子后面”，哪项没有交换物品？', answer: 'The light is near the door. The bed is behind the box.', distractors: ['The door is near the light. The box is behind the bed.', 'The light is behind the door. The bed is near the box.'], hint: '每句话都先核对原记录中位于哪件物品。', explanation: '第一句以 light 为主语，第二句以 bed 为主语，位置词也符合记录。' },
  ],
};

function createActivity(draft: ActivityDraft, difficulty: Difficulty, index: number): Grade1Term2EnglishUnit02SupplementalActivity {
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

export const grade1Term2EnglishUnit02SupplementalActivities = (Object.entries(drafts) as [Difficulty, ActivityDraft[]][])
  .flatMap(([difficulty, items]) => items.map((draft, index) => createActivity(draft, difficulty, index)));
