import type { ChoiceActivityDefinition, Difficulty } from '../../content/types';

export interface Grade1Term1EnglishUnit06SupplementalActivity {
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

const sourceUnitId = 'grade-1/term-1/english/unit-06';
const idPrefix = 'challenge-supplement-grade-1-term-1-english-unit-06';
const wordHint = '把英文水果词和已经学过的中文意思逐项核对。';
const categoryHint = '先把词卡的英文意思译成中文，再依据题目给出的分组标准归类。';
const preferenceHint = '分清询问句和表达自己喜好的回答句，再根据题意选择。';

const drafts: Record<Difficulty, ActivityDraft[]> = {
  basic: [
    { knowledgePointIds: ['fruit-word-vocabulary'], prompt: 'apple 的中文意思是什么？', correct: '苹果', distractors: ['梨', '香蕉'], hint: wordHint, explanation: 'apple 表示“苹果”。' },
    { knowledgePointIds: ['fruit-word-vocabulary'], prompt: '哪一个英文词表示“梨”？', correct: 'pear', distractors: ['orange', 'apple'], hint: wordHint, explanation: 'pear 表示“梨”。' },
    { knowledgePointIds: ['fruit-word-vocabulary'], prompt: 'banana 对应哪种水果？', correct: '香蕉', distractors: ['橙子', '苹果'], hint: wordHint, explanation: 'banana 表示“香蕉”。' },
    { knowledgePointIds: ['fruit-word-vocabulary'], prompt: '“橙子”对应哪个英文词？', correct: 'orange', distractors: ['pear', 'banana'], hint: wordHint, explanation: 'orange 表示“橙子”。' },
    { knowledgePointIds: ['fruit-word-vocabulary'], prompt: '哪组英文和中文水果词配对正确？', correct: 'pear＝梨；orange＝橙子', distractors: ['pear＝香蕉；orange＝苹果', 'pear＝苹果；orange＝梨'], hint: wordHint, explanation: 'pear 是梨，orange 是橙子。' },
    { knowledgePointIds: ['fruit-preferences'], prompt: '“What fruit do you like?” 是在问什么？', correct: '你喜欢什么水果？', distractors: ['你有几个苹果？', '这是什么颜色？'], hint: preferenceHint, explanation: 'What fruit do you like? 用来询问喜欢什么水果。' },
    { knowledgePointIds: ['fruit-preferences'], prompt: '想问伙伴喜欢什么水果，应选哪句话？', correct: 'What fruit do you like?', distractors: ['I like bananas.', 'I like apples.'], hint: preferenceHint, explanation: 'What fruit do you like? 是询问水果喜好的问句。' },
    { knowledgePointIds: ['fruit-preferences'], prompt: '“I like bananas.” 表示什么？', correct: '我喜欢香蕉。', distractors: ['你喜欢什么水果？', '我喜欢梨。'], hint: preferenceHint, explanation: 'I like bananas. 表示“我喜欢香蕉”。' },
    { knowledgePointIds: ['fruit-preferences', 'fruit-word-vocabulary'], prompt: '想说“我喜欢苹果”，哪句话符合？', correct: 'I like apples.', distractors: ['I like pears.', 'What fruit do you like?'], hint: '先核对 apple 的意思，再选择表示自己喜欢苹果的句子。', explanation: 'apple 是苹果；I like apples. 表示“我喜欢苹果”。' },
    { knowledgePointIds: ['fruit-preferences', 'fruit-word-vocabulary'], prompt: '想用英语说“我喜欢梨”，应选哪句话？', correct: 'I like pears.', distractors: ['I like oranges.', 'What fruit do you like?'], hint: '把 pear 词卡和句子里的水果词对应起来。', explanation: 'pear 是梨；I like pears. 表示“我喜欢梨”。' },
    { knowledgePointIds: ['fruit-classification'], prompt: '按“苹果”和“其他水果”分组，pear 应放在哪组？', correct: '其他水果', distractors: ['苹果', '两组都不属于'], hint: categoryHint, explanation: 'pear 是梨，应放在“其他水果”组。' },
    { knowledgePointIds: ['fruit-classification'], prompt: '按“苹果”和“其他水果”分组，apple 应放在哪组？', correct: '苹果', distractors: ['其他水果', '两组都不属于'], hint: categoryHint, explanation: 'apple 表示苹果，应放在“苹果”组。' },
    { knowledgePointIds: ['fruit-preferences', 'fruit-word-vocabulary'], prompt: '伙伴问 “What fruit do you like?”，想回答“我喜欢橙子”，哪句合适？', correct: 'I like oranges.', distractors: ['What fruit do you like?', 'I like bananas.'], hint: '先看伙伴在询问喜好，再核对回答里的水果词。', explanation: 'orange 是橙子；I like oranges. 可以回答自己喜欢橙子。' },
    { knowledgePointIds: ['fruit-preferences', 'fruit-word-vocabulary'], prompt: '水果卡写着 banana。想说“我喜欢香蕉”，应选哪句？', correct: 'I like bananas.', distractors: ['I like apples.', 'What fruit do you like?'], hint: '把 banana 词卡和喜好句中的水果词对照。', explanation: 'banana 表示香蕉；I like bananas. 与卡片内容相符。' },
    { knowledgePointIds: ['fruit-classification', 'fruit-word-vocabulary'], prompt: '同伴把 pear 放进“苹果”组。哪项能把这张卡放回合适的小组？', correct: '把 pear 放到“其他水果”组。', distractors: ['把 pear 留在“苹果”组。', '把 apple 放到“其他水果”组。'], hint: '先核对 pear 的中文意思，再按两组名称分类。', explanation: 'pear 表示梨，应放在“其他水果”组。' },
  ],
  advanced: [
    { knowledgePointIds: ['fruit-word-vocabulary'], prompt: '核对卡写着“apple＝苹果”“banana＝梨”。哪项只改正错误的词义？', correct: '把 banana 的中文改为“香蕉”。', distractors: ['把 apple 的中文改为“苹果”。', '把 banana 的中文改为“橙子”。'], hint: '保留已经正确的 apple，再核对 banana 的中文意思。', explanation: 'apple 是苹果；banana 是香蕉，因此只需改正 banana 的词义。' },
    { knowledgePointIds: ['fruit-preferences'], prompt: '想询问伙伴喜欢哪种水果，哪句是问句？', correct: 'What fruit do you like?', distractors: ['I like pears.', 'I like oranges.'], hint: '选择询问伙伴喜好的句子，不选说明自己喜好的句子。', explanation: 'What fruit do you like? 是询问水果喜好的问句。' },
    { knowledgePointIds: ['fruit-preferences', 'fruit-word-vocabulary'], prompt: '伙伴问 “What fruit do you like?”，你想回答喜欢梨，应选哪句？', correct: 'I like pears.', distractors: ['I like apples.', 'What fruit do you like?'], hint: '回答要说明自己喜欢的水果，并与 pear 卡对应。', explanation: 'pear 表示梨；I like pears. 回答了喜欢的水果。' },
    { knowledgePointIds: ['fruit-preferences', 'fruit-word-vocabulary'], prompt: 'A 卡写 apple，B 卡写 orange。哪组喜好句按 A、B 顺序对应正确？', correct: 'A: I like apples.；B: I like oranges.', distractors: ['A: I like oranges.；B: I like apples.', 'A: I like pears.；B: I like bananas.'], hint: '依次核对 A、B 卡片上的水果词，不要交换顺序。', explanation: 'A 是 apple，B 是 orange，两句分别对应 apples 和 oranges。' },
    { knowledgePointIds: ['fruit-classification', 'fruit-word-vocabulary'], prompt: '记录表要把水果分成“苹果”和“其他水果”。哪项分类正确？', correct: 'apple 放“苹果”；pear 放“其他水果”。', distractors: ['apple 放“其他水果”；pear 放“苹果”。', 'apple 和 pear 都放“苹果”。'], hint: '分别核对 apple 和 pear 的中文意思，再选择分组。', explanation: 'apple 是苹果，pear 是梨；梨属于“其他水果”。' },
    { knowledgePointIds: ['fruit-preferences'], prompt: '哪句话可以回答 “What fruit do you like?”？', correct: 'I like bananas.', distractors: ['What fruit do you like?', 'Apple means 苹果.'], hint: '问题在询问喜好，回答要说明自己喜欢什么水果。', explanation: 'I like bananas. 说明了自己喜欢香蕉，可以回答这句问话。' },
    { knowledgePointIds: ['fruit-word-vocabulary'], prompt: '核对词卡：apple＝苹果、pear＝梨、orange＝香蕉。哪项只改正错误的一项？', correct: '把 orange 的中文改为“橙子”。', distractors: ['把 apple 的中文改为“梨”。', '把 pear 的中文改为“橙子”。'], hint: '逐张核对三张卡，找出英文词和中文意思不匹配的一项。', explanation: 'apple 和 pear 的词义正确；orange 表示橙子。' },
    { knowledgePointIds: ['fruit-preferences', 'fruit-word-vocabulary'], prompt: '卡片是 banana，伙伴问喜欢什么水果。哪项回答和卡片相符？', correct: 'I like bananas.', distractors: ['I like pears.', 'What fruit do you like?'], hint: '回答喜好时，选择与 banana 卡对应的水果词。', explanation: 'banana 是香蕉，I like bananas. 与卡片相符。' },
    { knowledgePointIds: ['fruit-classification'], prompt: '“苹果”和“其他水果”两组中，哪组应放入 pear、banana 和 orange？', correct: '其他水果', distractors: ['苹果', '不需要分类'], hint: categoryHint, explanation: 'pear、banana 和 orange 分别是梨、香蕉和橙子，都放在“其他水果”组。' },
    { knowledgePointIds: ['fruit-preferences', 'fruit-word-vocabulary'], prompt: '伙伴说 “I like oranges.”，这句话表达了什么？', correct: '伙伴喜欢橙子。', distractors: ['伙伴在问喜欢什么水果。', '伙伴喜欢苹果。'], hint: '先认出 orange 的意思，再判断 I like… 表达的是谁的喜好。', explanation: 'orange 表示橙子；I like oranges. 表达说话者喜欢橙子。' },
    { knowledgePointIds: ['fruit-word-vocabulary', 'fruit-classification'], prompt: '哪项把 apple 和“苹果”对应起来，并放入合适的小组？', correct: 'apple＝苹果；放入“苹果”组。', distractors: ['apple＝梨；放入“其他水果”组。', 'apple＝香蕉；放入“苹果”组。'], hint: '同时核对 apple 的词义和它对应的分类名称。', explanation: 'apple 表示苹果，因此放在“苹果”组。' },
    { knowledgePointIds: ['fruit-preferences', 'fruit-word-vocabulary'], prompt: '问题是 “What fruit do you like?”，卡片指定 pear。哪组问答内容都符合？', correct: 'What fruit do you like? → I like pears.', distractors: ['I like pears. → What fruit do you like?', 'What fruit do you like? → I like oranges.'], hint: '先确认问句在前，再核对回答与 pear 卡是否一致。', explanation: '先询问喜好，再用 I like pears. 回答喜欢梨。' },
    { knowledgePointIds: ['fruit-word-vocabulary'], prompt: '四张词卡依次是 apple、pear、banana、orange。哪组中文意思按顺序对应？', correct: '苹果、梨、香蕉、橙子', distractors: ['梨、苹果、橙子、香蕉', '苹果、香蕉、梨、橙子'], hint: '从左到右逐张核对英文词和中文意思。', explanation: 'apple、pear、banana、orange 依次表示苹果、梨、香蕉和橙子。' },
    { knowledgePointIds: ['fruit-preferences', 'fruit-word-vocabulary'], prompt: '伙伴问喜欢什么水果，水果卡是 orange。哪项完整表达了卡片上的喜好？', correct: '回答：I like oranges.', distractors: ['提问：What fruit do you like?', '回答：I like apples.'], hint: '选择回答句，并检查水果词是否与 orange 卡一致。', explanation: 'orange 是橙子；I like oranges. 表达喜欢橙子。' },
    { knowledgePointIds: ['fruit-word-vocabulary'], prompt: 'pear 和 banana 两张卡按这个顺序出现，中文标签应怎样排列？', correct: '梨、香蕉', distractors: ['香蕉、梨', '梨、橙子'], hint: '从左到右分别回忆 pear 和 banana 的意思。', explanation: 'pear 表示梨，banana 表示香蕉，按卡片顺序是梨、香蕉。' },
    { knowledgePointIds: ['fruit-word-vocabulary'], prompt: 'orange 词卡旁边误贴了“香蕉”。哪张标签可以替换它？', correct: '橙子', distractors: ['苹果', '梨'], hint: '核对 orange 词卡对应的中文意思。', explanation: 'orange 表示橙子，应贴上“橙子”标签。' },
    { knowledgePointIds: ['fruit-classification', 'fruit-word-vocabulary'], prompt: '分组牌是“苹果”和“其他水果”。apple 与 banana 应分别放在哪里？', correct: 'apple 放“苹果”；banana 放“其他水果”。', distractors: ['apple 放“其他水果”；banana 放“苹果”。', '两张卡都放“苹果”。'], hint: '分别核对 apple、banana 的意思，再看分组牌。', explanation: 'apple 是苹果；banana 是香蕉，属于“其他水果”。' },
    { knowledgePointIds: ['fruit-word-vocabulary'], prompt: '核对表中 apple＝苹果、pear＝梨、banana＝橙子。哪项只改正错误的一张？', correct: '把 banana 的意思改为“香蕉”。', distractors: ['把 apple 的意思改为“梨”。', '把 pear 的意思改为“橙子”。'], hint: '逐项核对三组词义，只找出不匹配的一组。', explanation: 'apple 是苹果、pear 是梨，banana 表示香蕉。' },
    { knowledgePointIds: ['fruit-preferences'], prompt: '两句话中，一句在问伙伴喜欢什么水果，一句在说自己喜欢香蕉。哪组对应正确？', correct: '提问：What fruit do you like?；回答：I like bananas.', distractors: ['提问：I like bananas.；回答：What fruit do you like?', '提问：What fruit do you like?；回答：I like apples.'], hint: '辨认哪句提出问题，再核对回答是否说喜欢香蕉。', explanation: 'What fruit do you like? 是问句；I like bananas. 是说自己喜欢香蕉。' },
    { knowledgePointIds: ['fruit-classification', 'fruit-preferences', 'fruit-word-vocabulary'], prompt: '记录需要把 pear 放进正确的水果组，并写出喜欢 pear 的句子。哪项两处都正确？', correct: 'pear 放“其他水果”；I like pears.', distractors: ['pear 放“苹果”；I like oranges.', 'pear 放“其他水果”；What fruit do you like?'], hint: '先判断 pear 的分组，再选表达自己喜欢梨的句子。', explanation: 'pear 是梨，属于“其他水果”；I like pears. 表示喜欢梨。' },
    { knowledgePointIds: ['fruit-preferences', 'fruit-word-vocabulary'], prompt: '句子卡写着 “I like bananas.”，应该配哪张水果卡？', correct: 'banana', distractors: ['pear', 'orange'], hint: '从喜好句中找出水果词，再与水果卡核对。', explanation: 'bananas 表示香蕉，应配 banana 水果卡。' },
    { knowledgePointIds: ['fruit-word-vocabulary', 'fruit-classification'], prompt: 'apple、pear、orange 三张卡要分到“苹果”和“其他水果”两组。哪项分组正确？', correct: '苹果：apple；其他水果：pear、orange。', distractors: ['苹果：pear；其他水果：apple、orange。', '苹果：apple、pear；其他水果：orange。'], hint: '先找出表示苹果的词，再把另外两种放到另一组。', explanation: 'apple 是苹果；pear 和 orange 分别是梨和橙子，都属于“其他水果”。' },
  ],
  high: [
    { knowledgePointIds: ['fruit-preferences', 'fruit-word-vocabulary'], prompt: 'A 卡是 banana，B 卡是 pear。伙伴先问水果喜好，哪组回答按 A、B 顺序正确？', correct: 'A: I like bananas.；B: I like pears.', distractors: ['A: I like pears.；B: I like bananas.', 'A: I like apples.；B: I like oranges.'], hint: '先把两张卡与水果词对应，再按 A、B 顺序检查喜好句。', explanation: 'A 是 banana，B 是 pear，分别对应 bananas 和 pears。' },
    { knowledgePointIds: ['fruit-word-vocabulary'], prompt: '记录表中 apple＝苹果、pear＝梨、banana＝橙子、orange＝香蕉。哪项只交换两条错误的中文标签？', correct: 'banana 改为“香蕉”，orange 改为“橙子”。', distractors: ['apple 改为“梨”，pear 改为“苹果”。', 'pear 改为“香蕉”，banana 改为“梨”。'], hint: '保留 apple 和 pear 的正确词义，再核对 banana 与 orange。', explanation: 'banana 是香蕉，orange 是橙子；前两项已经正确。' },
    { knowledgePointIds: ['fruit-preferences', 'fruit-word-vocabulary'], prompt: '伙伴展示 orange 卡并问喜欢什么水果。哪段对话顺序正确且水果一致？', correct: 'What fruit do you like? → I like oranges.', distractors: ['I like oranges. → What fruit do you like?', 'What fruit do you like? → I like pears.'], hint: '检查先后顺序，再核对回答里的水果是否为橙子。', explanation: '先问喜好，再用 I like oranges. 回答 orange 卡。' },
    { knowledgePointIds: ['fruit-classification', 'fruit-word-vocabulary'], prompt: '四张卡是 apple、pear、banana、orange。哪项按“苹果”和“其他水果”分组正确？', correct: '苹果：apple；其他水果：pear、banana、orange。', distractors: ['苹果：pear；其他水果：apple、banana、orange。', '苹果：apple、pear；其他水果：banana、orange。'], hint: '先认出 apple，再把其余三种水果放进“其他水果”组。', explanation: 'apple 是苹果；pear、banana 和 orange 是其他水果。' },
    { knowledgePointIds: ['fruit-preferences', 'fruit-word-vocabulary'], prompt: 'A、B、C 卡依次是 apple、orange、banana。哪组喜好句保留顺序并都对应正确？', correct: 'A: I like apples.；B: I like oranges.；C: I like bananas.', distractors: ['A: I like oranges.；B: I like apples.；C: I like bananas.', 'A: I like apples.；B: I like pears.；C: I like oranges.'], hint: '从 A 到 C 逐张核对水果词，不要交换卡片顺序。', explanation: 'A、B、C 依次是 apple、orange、banana，三句分别对应 apples、oranges、bananas。' },
    { knowledgePointIds: ['fruit-preferences'], prompt: '练习要求先询问水果喜好，再回答喜欢梨。哪项同时符合句子用途、顺序和答案？', correct: 'What fruit do you like? → I like pears.', distractors: ['I like pears. → What fruit do you like?', 'What fruit do you like? → I like bananas.'], hint: '分两步核对：先选问句，再检查回答是不是喜欢梨。', explanation: '问句在前，I like pears. 在后，回答喜欢梨。' },
    { knowledgePointIds: ['fruit-word-vocabulary', 'fruit-classification'], prompt: '分类表有“苹果”和“其他水果”两组，记录 pear、banana、orange。哪项只需补上正确分组？', correct: '三张卡都放入“其他水果”组。', distractors: ['三张卡都放入“苹果”组。', 'pear 放“苹果”；banana 和 orange 放“其他水果”。'], hint: '核对 pear、banana、orange 的词义，它们都不是 apple。', explanation: '三种词分别表示梨、香蕉和橙子，应放在“其他水果”组。' },
    { knowledgePointIds: ['fruit-preferences', 'fruit-word-vocabulary'], prompt: '卡片写 pear，回答写 “I like apples.”。哪项只改正与卡片不一致的水果词？', correct: '把 apples 改为 pears，写成 “I like pears.”。', distractors: ['把 pear 卡改成 orange，保留原句。', '把回答改成 “What fruit do you like?”。'], hint: '保留喜好句，只把句中的水果改成 pear 卡对应的词。', explanation: 'pear 是梨，I like pears. 与卡片一致。' },
    { knowledgePointIds: ['fruit-preferences', 'fruit-word-vocabulary'], prompt: '两张练习卡分别要求：先写询问喜好的问句，再按 orange、apple 的顺序各写一句喜好回答。哪组记录符合？', correct: 'What fruit do you like? → I like oranges.；I like apples.', distractors: ['I like apples.；I like oranges. → What fruit do you like?', 'What fruit do you like? → I like bananas.；I like pears.'], hint: '先放询问喜好的句子，再按 orange、apple 的顺序核对两个回答。', explanation: '先询问，再依次用 I like oranges. 和 I like apples. 对应两张练习卡。' },
    { knowledgePointIds: ['fruit-word-vocabulary'], prompt: '果篮里依次摆着 apple、pear、banana、orange。哪组中文标签和水果排列顺序相符？', correct: '苹果、梨、香蕉、橙子', distractors: ['梨、苹果、橙子、香蕉', '苹果、香蕉、梨、橙子'], hint: '从左到右逐张核对英文词和中文意思。', explanation: 'apple、pear、banana、orange 依次表示苹果、梨、香蕉和橙子。' },
    { knowledgePointIds: ['fruit-preferences', 'fruit-word-vocabulary'], prompt: '练习卡要求：问伙伴喜欢什么水果；对方选择 banana。哪段记录包含合适的问句和回答？', correct: 'What fruit do you like? → I like bananas.', distractors: ['I like bananas. → What fruit do you like?', 'What fruit do you like? → I like oranges.'], hint: '检查是否先询问，再核对回答是否选择了 banana。', explanation: '先问 What fruit do you like?，再用 I like bananas. 回答。' },
    { knowledgePointIds: ['fruit-preferences', 'fruit-classification', 'fruit-word-vocabulary'], prompt: '记录要求把 apple 放进“苹果”组、orange 放进“其他水果”组，并写出喜欢 orange 的句子。哪项全部正确？', correct: 'apple 属于“苹果”；orange 属于“其他水果”；I like oranges.', distractors: ['apple 属于“其他水果”；orange 属于“苹果”；I like apples.', '两个词都属于“苹果”；I like pears.'], hint: '分别核对两个词义和分组，再检查喜好句中的水果词。', explanation: 'apple 是苹果；orange 是其他水果；I like oranges. 表示喜欢橙子。' },
    { knowledgePointIds: ['fruit-preferences', 'fruit-word-vocabulary'], prompt: 'A、B 两张练习卡分别指定 pear 和 banana，要求先写询问喜好的问句，再按卡片顺序各写一句回答。哪项符合？', correct: 'What fruit do you like? → A: I like pears.；B: I like bananas.', distractors: ['A: I like pears.；B: I like bananas. → What fruit do you like?', 'What fruit do you like? → A: I like bananas.；B: I like pears.'], hint: '把问句放在前面，再逐张核对 A、B 与回答中的水果词。', explanation: '先询问喜好；A 是 pear，B 是 banana，回答按练习卡顺序排列。' },
    { knowledgePointIds: ['fruit-preferences', 'fruit-classification', 'fruit-word-vocabulary'], prompt: '四张水果卡中只有 apple 属于“苹果”组；伙伴问喜欢什么水果并选择 banana。哪项记录全部符合？', correct: 'apple 放“苹果”组；其余三种放“其他水果”；I like bananas.', distractors: ['pear 放“苹果”组；其余三种放“其他水果”；I like pears.', 'apple 放“其他水果”组；其余三种放“苹果”；I like oranges.'], hint: '先完成 apple 与其他水果的分组，再核对 banana 对应的喜好句。', explanation: 'apple 单独属于“苹果”组；banana 属于“其他水果”，喜好句应为 I like bananas.。' },
    { knowledgePointIds: ['fruit-preferences', 'fruit-classification', 'fruit-word-vocabulary'], prompt: '记录要求先回答“喜欢什么水果”，回答 pear；再把 pear 和 apple 分组。哪项顺序与内容都符合？', correct: 'I like pears.；苹果：apple；其他水果：pear。', distractors: ['What fruit do you like?；苹果：pear；其他水果：apple。', 'I like apples.；苹果：pear；其他水果：apple。'], hint: '先选表达喜欢梨的回答，再核对 apple 与 pear 的分组。', explanation: 'I like pears. 表示喜欢梨；apple 是苹果，pear 属于“其他水果”。' },
    { knowledgePointIds: ['fruit-preferences', 'fruit-word-vocabulary'], prompt: 'A 卡是 orange，B 卡是 pear。问句已经写好，哪组回答按 A、B 顺序都正确？', correct: 'A: I like oranges.；B: I like pears.', distractors: ['A: I like pears.；B: I like oranges.', 'A: I like apples.；B: I like bananas.'], hint: '按 A、B 顺序把卡片上的水果词和喜好句对应。', explanation: 'A 是 orange，B 是 pear，分别对应 oranges 和 pears。' },
    { knowledgePointIds: ['fruit-word-vocabulary', 'fruit-classification'], prompt: '分类记录中 pear、banana 都放在“苹果”组，apple 放在“其他水果”组。哪项能同时改正这三张卡？', correct: 'apple 放“苹果”；pear、banana 放“其他水果”。', distractors: ['pear 放“苹果”；apple、banana 放“其他水果”。', '三张卡都放“其他水果”。'], hint: '先找出表示 apple 的卡，再判断另外两种水果属于哪组。', explanation: 'apple 是苹果；pear 是梨，banana 是香蕉，后两者都属于“其他水果”。' },
    { knowledgePointIds: ['fruit-preferences', 'fruit-word-vocabulary'], prompt: 'A 卡 apple 配 I like apples.，B 卡 banana 配 I like oranges.。哪项只改正 B 卡的喜好句？', correct: '把 B 的 I like oranges. 改为 I like bananas.', distractors: ['把 A 的 I like apples. 改为 I like pears.', '把 B 的 banana 卡改为 orange。'], hint: '保留 A 卡已经配对正确的记录，核对 B 卡和喜好句中的水果词。', explanation: 'A 卡与 I like apples. 相符；banana 卡应配 I like bananas.。' },
    { knowledgePointIds: ['fruit-word-vocabulary', 'fruit-classification'], prompt: 'pear、orange 两张卡按顺序出现。哪项先写对中文意思，再把两张卡都放进正确的小组？', correct: '梨、橙子；两张卡都放“其他水果”。', distractors: ['梨、香蕉；只把 orange 放“其他水果”。', '橙子、梨；把 pear 放“苹果”组。'], hint: '按卡片顺序核对中文词义，再检查两种水果属于哪一组。', explanation: 'pear 是梨，orange 是橙子；两者都属于“其他水果”。' },
  ],
};

const positionOffset: Record<Difficulty, number> = { basic: 0, advanced: 15, high: 37 };

function createActivity(difficulty: Difficulty, index: number, draft: ActivityDraft): Grade1Term1EnglishUnit06SupplementalActivity {
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

export const grade1Term1EnglishUnit06SupplementalActivities: Grade1Term1EnglishUnit06SupplementalActivity[] = (
  Object.entries(drafts) as Array<[Difficulty, ActivityDraft[]]>
).flatMap(([difficulty, activities]) => activities.map((activity, index) => createActivity(difficulty, index, activity)));
