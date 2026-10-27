import type { ChoiceActivityDefinition, Difficulty } from '../../content/types';

export interface Grade1Term1EnglishUnit05SupplementalActivity {
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

const sourceUnitId = 'grade-1/term-1/english/unit-05';
const idPrefix = 'challenge-supplement-grade-1-term-1-english-unit-05';
const vocabularyHint = '把英文词卡和已经学过的中文颜色名称逐个核对。';
const questionHint = '先看句子是在询问信息，还是在说明一种颜色。';
const descriptionHint = '核对句子中的颜色词，再看它是否表达“它是……颜色”。';

const drafts: Record<Difficulty, ActivityDraft[]> = {
  basic: [
    { knowledgePointIds: ['colour-word-vocabulary'], prompt: '看到 red 词卡，它的中文意思是什么？', correct: '红色', distractors: ['蓝色', '黄色'], hint: vocabularyHint, explanation: 'red 表示“红色”。' },
    { knowledgePointIds: ['colour-word-vocabulary'], prompt: '哪张英文词卡表示“蓝色”？', correct: 'blue', distractors: ['green', 'red'], hint: vocabularyHint, explanation: 'blue 表示“蓝色”。' },
    { knowledgePointIds: ['colour-word-vocabulary'], prompt: 'yellow 对应哪种颜色？', correct: '黄色', distractors: ['绿色', '红色'], hint: vocabularyHint, explanation: 'yellow 表示“黄色”。' },
    { knowledgePointIds: ['colour-word-vocabulary'], prompt: '“绿色”对应哪个英文词？', correct: 'green', distractors: ['yellow', 'blue'], hint: vocabularyHint, explanation: 'green 表示“绿色”。' },
    { knowledgePointIds: ['colour-word-vocabulary'], prompt: '哪组词卡的英文和中文意思都配对正确？', correct: 'red＝红色；green＝绿色', distractors: ['red＝黄色；green＝蓝色', 'red＝绿色；green＝红色'], hint: vocabularyHint, explanation: 'red 是红色，green 是绿色。' },
    { knowledgePointIds: ['colour-question'], prompt: '“What colour is it?” 是在问什么？', correct: '它是什么颜色？', distractors: ['它在哪里？', '它有几个？'], hint: questionHint, explanation: 'What colour is it? 用来询问它是什么颜色。' },
    { knowledgePointIds: ['colour-question'], prompt: '什么时候可以使用 “What colour is it?”？', correct: '想询问某样东西的颜色时。', distractors: ['想询问某样东西的数量时。', '想说自己有某样东西时。'], hint: questionHint, explanation: '这句话的意思是“它是什么颜色？”，用于询问颜色。' },
    { knowledgePointIds: ['colour-question'], prompt: '下列哪句话是在询问颜色？', correct: 'What colour is it?', distractors: ["It's blue.", "It's green."], hint: questionHint, explanation: 'What colour is it? 是问句，询问它的颜色。' },
    { knowledgePointIds: ['colour-description'], prompt: '“It’s blue.” 的意思是什么？', correct: '它是蓝色的。', distractors: ['它是什么颜色？', '它是绿色的。'], hint: descriptionHint, explanation: "It's blue. 表示“它是蓝色的”。" },
    { knowledgePointIds: ['colour-description', 'colour-word-vocabulary'], prompt: '想用英文说“它是绿色的”，应选哪句话？', correct: "It's green.", distractors: ["It's red.", 'What colour is it?'], hint: descriptionHint, explanation: "green 表示“绿色”，It's green. 表示“它是绿色的”。" },
    { knowledgePointIds: ['colour-description', 'colour-word-vocabulary'], prompt: '想用英文说“它是黄色的”，哪句话符合？', correct: "It's yellow.", distractors: ["It's blue.", 'What colour is it?'], hint: descriptionHint, explanation: "yellow 表示“黄色”，It's yellow. 表示“它是黄色的”。" },
    { knowledgePointIds: ['colour-description', 'colour-word-vocabulary'], prompt: '句子 “It’s ___.” 要表达“它是红色的”，空格里应填什么？', correct: 'red', distractors: ['blue', 'green'], hint: descriptionHint, explanation: 'red 表示“红色”；填入后是 It’s red.。' },
    { knowledgePointIds: ['colour-question'], prompt: '哪句话完整地表达“它是什么颜色？”', correct: 'What colour is it?', distractors: ["It's yellow.", "It's red."], hint: questionHint, explanation: 'What colour is it? 对应“它是什么颜色？”。' },
    { knowledgePointIds: ['colour-description', 'colour-word-vocabulary'], prompt: '颜色词卡写着 yellow。要用完整句说“它是黄色的”，选哪句？', correct: "It's yellow.", distractors: ["It's green.", 'What colour is it?'], hint: '先核对词卡意思，再选择用来描述颜色的句子。', explanation: "yellow 表示“黄色”；It's yellow. 表示“它是黄色的”。" },
  ],
  advanced: [
    { knowledgePointIds: ['colour-word-vocabulary'], prompt: '两张核对卡写着“blue＝蓝色”“red＝黄色”。哪项只修正错误的词义？', correct: '把 red 的中文改为“红色”。', distractors: ['把 blue 的中文改为“黄色”。', '把 red 的中文改为“蓝色”。'], hint: '分别核对 blue 和 red 的中文意思，只改不对应的那一项。', explanation: 'blue 表示蓝色；red 表示红色，因此应修正 red 的中文意思。' },
    { knowledgePointIds: ['colour-question'], prompt: '展示一张颜色卡，想请伙伴说出它的颜色，应先问哪句话？', correct: 'What colour is it?', distractors: ["It's blue.", "It's yellow."], hint: '任务是先询问信息，选择问句。', explanation: 'What colour is it? 是询问颜色的问句。' },
    { knowledgePointIds: ['colour-description', 'colour-word-vocabulary'], prompt: '卡片上标着 green。要用英语完整描述卡片颜色，应选哪句？', correct: "It's green.", distractors: ["It's red.", 'What colour is it?'], hint: '把 green 词卡和描述句中的颜色词对应起来。', explanation: "green 表示绿色；It's green. 表示“它是绿色的”。" },
    { knowledgePointIds: ['colour-description', 'colour-word-vocabulary'], prompt: 'A 卡标为 red，B 卡标为 blue。哪组句子按 A、B 顺序描述正确？', correct: "A: It's red.；B: It's blue.", distractors: ["A: It's blue.；B: It's red.", "A: It's yellow.；B: It's green."], hint: '依次核对 A、B 卡片的颜色词，不要调换顺序。', explanation: "A 对应 red，B 对应 blue，因此句子顺序应为 It's red.、It's blue.。" },
    { knowledgePointIds: ['colour-question', 'colour-description', 'colour-word-vocabulary'], prompt: '伙伴先询问颜色，再说明卡片是黄色的。哪组句子顺序和内容都合适？', correct: "What colour is it? → It's yellow.", distractors: ["It's yellow. → What colour is it?", "What colour is it? → It's blue."], hint: '先选询问颜色的句子，再核对回答里的颜色词。', explanation: '先用 What colour is it? 询问，再用 It’s yellow. 描述黄色卡片。' },
    { knowledgePointIds: ['colour-description', 'colour-word-vocabulary'], prompt: '练习卡要求描述绿色，同伴写了 “It’s red.”。哪项能改正颜色词并保留句型？', correct: "把 red 改成 green，写成 “It's green.”。", distractors: ["把 red 改成 blue，写成 “It's blue.”。", '把句子改成 “What colour is it?”。'], hint: '保留描述句的结构，只根据练习要求替换颜色词。', explanation: "题目要求绿色，应使用 green，句子是 It's green.。" },
    { knowledgePointIds: ['colour-word-vocabulary'], prompt: '词卡顺序是 blue、yellow、green。哪项按相同顺序写出中文意思？', correct: '蓝色、黄色、绿色', distractors: ['黄色、蓝色、红色', '绿色、红色、黄色'], hint: '从左到右逐张核对英文词卡的中文意思。', explanation: 'blue、yellow、green 依次表示蓝色、黄色、绿色。' },
    { knowledgePointIds: ['colour-question', 'colour-description'], prompt: '“What colour is it?” 和 “It’s blue.” 的用途分别是什么？', correct: '前一句询问颜色，后一句描述蓝色。', distractors: ['前一句描述蓝色，后一句询问颜色。', '两句话都在询问颜色。'], hint: '看标点和句意，区分问句与说明颜色的句子。', explanation: 'What colour is it? 是问句；It’s blue. 是描述句。' },
    { knowledgePointIds: ['colour-description', 'colour-word-vocabulary'], prompt: '记录要求：颜色为 yellow，句子用 “It’s ….” 描述。哪条记录符合要求？', correct: "It's yellow.", distractors: ["It's green.", 'What colour is it?'], hint: '同时核对颜色词和句子是否用于描述。', explanation: "yellow 表示黄色；It's yellow. 符合颜色和句型要求。" },
    { knowledgePointIds: ['colour-question'], prompt: '要在问句 “What colour is it?” 后面加问号，应该放在哪里？', correct: '放在 it 后面：What colour is it?', distractors: ['放在 What 后面：What? colour is it', '放在 colour 后面：What colour? is it'], hint: '按完整问句的词序读一遍，再看问号标记整句话的位置。', explanation: '问号放在完整问句末尾：What colour is it?。' },
    { knowledgePointIds: ['colour-description', 'colour-word-vocabulary'], prompt: 'green 词卡旁需要配一条英文描述句。哪句与词卡一致？', correct: "It's green.", distractors: ["It's yellow.", 'What colour is it?'], hint: '描述句中的颜色词应和 green 词卡一致。', explanation: "green 表示绿色，It's green. 与词卡一致。" },
    { knowledgePointIds: ['colour-question', 'colour-description'], prompt: '一张练习卡写着“先问颜色，再说它是红色的”。哪项完整完成了两步？', correct: "What colour is it? → It's red.", distractors: ["It's red. → What colour is it?", "What colour is it? → It's blue."], hint: '先后检查句子用途和目标颜色。', explanation: '先询问颜色，再用 It’s red. 描述红色。' },
    { knowledgePointIds: ['colour-word-vocabulary'], prompt: '哪项把四张词卡都与中文意思对应正确？', correct: 'red＝红色；blue＝蓝色；yellow＝黄色；green＝绿色', distractors: ['red＝蓝色；blue＝红色；yellow＝绿色；green＝黄色', 'red＝黄色；blue＝绿色；yellow＝红色；green＝蓝色'], hint: '按 red、blue、yellow、green 的顺序逐项核对。', explanation: '四个词依次表示红色、蓝色、黄色和绿色。' },
    { knowledgePointIds: ['colour-question', 'colour-description'], prompt: '伙伴回答 “It’s green.”。如果要询问这句话里的 it 是什么颜色，应该问哪句？', correct: 'What colour is it?', distractors: ["It's yellow.", "It's red."], hint: '回答句在说明颜色；要询问颜色，选择对应的问句。', explanation: 'What colour is it? 用来询问 it 的颜色。' },
  ],
  high: [
    { knowledgePointIds: ['colour-description', 'colour-word-vocabulary'], prompt: 'A 卡标为 yellow，B 卡标为 green。哪组记录按卡片顺序都正确？', correct: "A: It's yellow.；B: It's green.", distractors: ["A: It's green.；B: It's yellow.", "A: It's red.；B: It's blue."], hint: '分别把两张卡的词和对应句子核对，不要交换 A、B。', explanation: 'A 是 yellow，B 是 green，描述句分别与两张卡对应。' },
    { knowledgePointIds: ['colour-description', 'colour-word-vocabulary'], prompt: 'A 卡的 red 描述句已经核对正确；B 卡为 blue，却写成 “It’s green.”。哪项只修正 B？', correct: '保留 A；把 B 的 green 改为 blue。', distractors: ['把 A 的 red 改为 yellow，B 保持不变。', '把 A、B 两句都改为 “It’s blue.”。'], hint: '保留已正确的 A，只检查 B 卡对应的颜色词。', explanation: 'B 卡是 blue，句子应为 It’s blue.；A 不需要修改。' },
    { knowledgePointIds: ['colour-word-vocabulary'], prompt: '核对记录：red＝红色，blue＝蓝色，yellow＝绿色，green＝黄色。哪项只交换两条错误的中文标签？', correct: 'yellow 改为“黄色”，green 改为“绿色”。', distractors: ['red 改为“绿色”，blue 改为“红色”。', 'blue 改为“黄色”，red 改为“蓝色”。'], hint: '先找出两项不匹配的词卡，再保留已经正确的 red 和 blue。', explanation: 'yellow 表示黄色，green 表示绿色；另外两项已正确。' },
    { knowledgePointIds: ['colour-question', 'colour-description', 'colour-word-vocabulary'], prompt: '伙伴展示 blue 卡并先问颜色。哪组对话顺序正确、回答也与卡片一致？', correct: "What colour is it? → It's blue.", distractors: ["It's blue. → What colour is it?", "What colour is it? → It's green."], hint: '先确认问句，再核对回答和 blue 卡是否一致。', explanation: '先问 What colour is it?，再用 It’s blue. 描述蓝色卡片。' },
    { knowledgePointIds: ['colour-question', 'colour-description', 'colour-word-vocabulary'], prompt: '三张卡依次标为 red、blue、yellow。哪组记录既保留顺序，又把每张卡描述正确？', correct: "A: It's red.；B: It's blue.；C: It's yellow.", distractors: ["A: It's blue.；B: It's red.；C: It's yellow.", "A: It's red.；B: It's yellow.；C: It's green."], hint: '从 A 到 C 逐张对应颜色词，检查顺序和描述是否都一致。', explanation: 'A、B、C 依次是 red、blue、yellow，三句描述与卡片顺序一致。' },
    { knowledgePointIds: ['colour-question', 'colour-description'], prompt: '练习卡要求：先询问颜色，再回答“它是绿色的”。哪项同时满足句子用途、顺序和答案？', correct: "What colour is it? → It's green.", distractors: ["It's green. → What colour is it?", "What colour is it? → It's yellow."], hint: '分三步核对：问句、先后顺序、描述句的颜色。', explanation: '问句在前，It’s green. 在后，回答了它是绿色的。' },
    { knowledgePointIds: ['colour-description', 'colour-word-vocabulary'], prompt: 'B 卡为 yellow。A 卡的句子 “It’s blue.” 已正确；B 卡写成 “It’s red.”。应怎样改？', correct: 'A 保持不变；把 B 的 red 改为 yellow。', distractors: ['把 A 的 blue 改为 yellow；B 保持不变。', '把 B 改为问句 “What colour is it?”。'], hint: '先保留 A，再按 B 卡上的词修改 B 的描述句。', explanation: 'A 已正确；B 是 yellow，应写成 It’s yellow.。' },
    { knowledgePointIds: ['colour-word-vocabulary', 'colour-description'], prompt: '词卡为 green，描述句为 “It’s green.”，中文备注却写着“它是蓝色的”。哪项只修正不一致的备注？', correct: '把中文备注改为“它是绿色的”。', distractors: ['把 green 改为 blue，句子和备注都不变。', '把描述句改成 “What colour is it?”。'], hint: '核对词卡、英文描述和中文备注三者，保留相互一致的两项。', explanation: 'green 和 It’s green. 都表示绿色，中文备注应改为“它是绿色的”。' },
    { knowledgePointIds: ['colour-question', 'colour-description'], prompt: '记录 A 是问句 “What colour is it?”；记录 B 是陈述句 “It’s yellow.”。哪项准确说明两句的作用？', correct: 'A 询问颜色；B 描述它是黄色的。', distractors: ['A 描述黄色；B 询问颜色。', 'A、B 都是询问颜色的问句。'], hint: '对照问号和句意，分别判断两条记录的用途。', explanation: 'What colour is it? 询问颜色；It’s yellow. 陈述黄色。' },
    { knowledgePointIds: ['colour-question', 'colour-description', 'colour-word-vocabulary'], prompt: '三步记录中第一步是询问颜色，第三步描述 red 卡为红色。哪项补全了中间步骤并保持顺序？', correct: "What colour is it? → 核对 red＝红色 → It's red.", distractors: ["It's red. → 核对 blue＝蓝色 → What colour is it?", "What colour is it? → 核对 green＝绿色 → It's yellow."], hint: '先按步骤排列，再检查中间词义和最后的颜色描述是否相同。', explanation: '先问颜色，核对 red 表示红色，再用 It’s red. 描述红色卡。' },
    { knowledgePointIds: ['colour-word-vocabulary', 'colour-description'], prompt: '四张卡的顺序为 green、red、blue、yellow。哪组句子按原顺序描述正确？', correct: "It's green.；It's red.；It's blue.；It's yellow.", distractors: ["It's red.；It's green.；It's blue.；It's yellow.", "It's green.；It's blue.；It's yellow.；It's red."], hint: '逐项对照四张卡，不要把正确的颜色词换到另一张卡上。', explanation: '句子按 green、red、blue、yellow 的卡片顺序排列。' },
    { knowledgePointIds: ['colour-question', 'colour-description', 'colour-word-vocabulary'], prompt: '检查一段练习：先问 “What colour is it?”，卡片是 blue，回答写成 “It’s yellow.”。哪项完整修正并说明原因？', correct: '把回答改为 “It’s blue.”，因为 blue 卡应对应蓝色描述。', distractors: ['把问句改成 “It’s blue.”，回答保留不变。', '把回答改为 “It’s green.”，问句保留不变。'], hint: '保留询问颜色的问句，再检查答案句是否与 blue 卡相符。', explanation: '问句正确；回答应按 blue 卡写成 It’s blue.。' },
    { knowledgePointIds: ['colour-question', 'colour-description', 'colour-word-vocabulary'], prompt: 'A、B 两张卡分别是 red 和 green。伙伴先问颜色，然后描述 A、B。哪段记录顺序和内容都通过核对？', correct: "What colour is it? → A: It's red.；B: It's green.", distractors: ["A: It's red.；B: It's green. → What colour is it?", "What colour is it? → A: It's green.；B: It's red."], hint: '检查问句位置，再依次核对 A、B 与各自的颜色词。', explanation: '先询问颜色，随后 A 对应 red、B 对应 green。' },
    { knowledgePointIds: ['colour-description', 'colour-word-vocabulary'], prompt: '复核表：red 卡写 “It’s red.”；blue 卡写 “It’s blue.”；yellow 卡写 “It’s green.”。哪项只改错的一条？', correct: '保留 red 和 blue 两条；把 yellow 卡的 green 改为 yellow。', distractors: ['把 red 卡的 red 改为 yellow，其余不变。', '把 blue 卡的 blue 改为 green，其余不变。'], hint: '逐条比较卡片和句子，只修改不匹配的一行。', explanation: 'red、blue 两行正确；yellow 卡应描述为 It’s yellow.。' },
  ],
};

const positionOffset: Record<Difficulty, number> = { basic: 0, advanced: 14, high: 28 };

function createActivity(difficulty: Difficulty, index: number, draft: ActivityDraft): Grade1Term1EnglishUnit05SupplementalActivity {
  const correctIndex = (positionOffset[difficulty] + index) % 3;
  const labels = [...draft.distractors];
  labels.splice(correctIndex, 0, draft.correct);
  return {
    difficulty,
    sourceUnitId,
    knowledgePointIds: [...draft.knowledgePointIds],
    activity: {
      id: `${idPrefix}-${difficulty}-${String(index + 1).padStart(2, '0')}`,
      kind: 'choice',
      prompt: draft.prompt,
      options: labels.map((label, optionIndex) => ({ id: `option-${optionIndex + 1}`, label })),
      correctOptionId: `option-${correctIndex + 1}`,
      hint: draft.hint,
      explanation: draft.explanation,
    },
  };
}

export const grade1Term1EnglishUnit05SupplementalActivities: Grade1Term1EnglishUnit05SupplementalActivity[] = (
  Object.entries(drafts) as Array<[Difficulty, ActivityDraft[]]>
).flatMap(([difficulty, activities]) => activities.map((activity, index) => createActivity(difficulty, index, activity)));
