import type { ChoiceActivityDefinition, Difficulty } from '../../content/types';

export interface Grade1Term1EnglishUnit04SupplementalActivity {
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

const sourceUnitId = 'grade-1/term-1/english/unit-04';
const idPrefix = 'challenge-supplement-grade-1-term-1-english-unit-04';
const wordHint = '先看题目给出的数词或数字，再核对两边的意思。';
const sequenceHint = '按从小到大的数数顺序，逐个检查相邻数词。';
const sentenceHint = '把数量问题和陈述句分开看，再核对句中的数词。';

const drafts: Record<Difficulty, ActivityDraft[]> = {
  basic: [
    { knowledgePointIds: ['number-word-vocabulary'], prompt: '“一”对应哪个英文数词？', correct: 'one', distractors: ['two', 'four'], hint: wordHint, explanation: 'one 表示“一”。' },
    { knowledgePointIds: ['number-word-vocabulary'], prompt: '英文数词 six 表示几？', correct: '六', distractors: ['三', '九'], hint: wordHint, explanation: 'six 表示“六”。' },
    { knowledgePointIds: ['number-word-vocabulary'], prompt: '哪张词卡表示“十”？', correct: 'ten', distractors: ['two', 'six'], hint: wordHint, explanation: 'ten 表示“十”。' },
    { knowledgePointIds: ['number-word-vocabulary'], prompt: '数字 3 应与哪个英文数词配对？', correct: 'three', distractors: ['five', 'seven'], hint: wordHint, explanation: 'three 表示“三”，对应数字 3。' },
    { knowledgePointIds: ['number-word-vocabulary'], prompt: '数字 8 的英文数词是哪一个？', correct: 'eight', distractors: ['six', 'ten'], hint: wordHint, explanation: 'eight 表示“八”，对应数字 8。' },
    { knowledgePointIds: ['number-sequence'], prompt: '数词顺序是 one, two, __, four。空格里应填什么？', correct: 'three', distractors: ['five', 'seven'], hint: sequenceHint, explanation: 'one、two、three、four 按顺序相邻，空格应填 three。' },
    { knowledgePointIds: ['number-sequence'], prompt: '按数数顺序，three 后面紧接着哪个数词？', correct: 'four', distractors: ['two', 'six'], hint: sequenceHint, explanation: 'three 后面是 four。' },
    { knowledgePointIds: ['number-sequence'], prompt: 'six 前面的一个数词是什么？', correct: 'five', distractors: ['seven', 'three'], hint: sequenceHint, explanation: 'five、six 是相邻数词，five 在 six 前面。' },
    { knowledgePointIds: ['quantity-question'], prompt: '“How many books?” 想知道什么？', correct: '书有多少本。', distractors: ['书是什么颜色。', '书放在哪里。'], hint: sentenceHint, explanation: 'How many books? 是在询问书的数量。' },
    { knowledgePointIds: ['quantity-sentence'], prompt: '“I have two books.” 表示什么？', correct: '我有两本书。', distractors: ['我有四本书。', '有多少本书？'], hint: sentenceHint, explanation: 'two 表示“两”，I have two books. 表示“我有两本书”。' },
    { knowledgePointIds: ['quantity-question', 'quantity-sentence'], prompt: '问题是“How many books?”，哪句话回答“我有三本书”？', correct: 'I have three books.', distractors: ['I have five books.', 'How many books?'], hint: sentenceHint, explanation: 'three 表示“三”，I have three books. 表示“我有三本书”。' },
    { knowledgePointIds: ['quantity-question'], prompt: '看到“How many books?”，应该准备回答哪类信息？', correct: '书的数量。', distractors: ['书的颜色。', '书的大小。'], hint: sentenceHint, explanation: 'How many 用来询问数量。' },
    { knowledgePointIds: ['number-word-vocabulary'], prompt: 'five 这张英文词卡应放到哪个数字下面？', correct: '5', distractors: ['2', '8'], hint: wordHint, explanation: 'five 表示“五”，对应数字 5。' },
    { knowledgePointIds: ['number-word-vocabulary'], prompt: '数字 10 的英文数词是哪张？', correct: 'ten', distractors: ['one', 'eight'], hint: wordHint, explanation: 'ten 表示“十”，对应数字 10。' },
  ],
  advanced: [
    { knowledgePointIds: ['number-sequence'], prompt: '数词从 six 往后数：six, seven, __, nine。空格应填哪一个？', correct: 'eight', distractors: ['five', 'ten'], hint: sequenceHint, explanation: 'six、seven、eight、nine 顺序相邻。' },
    { knowledgePointIds: ['number-sequence'], prompt: 'eight 后面接着 nine。哪一行按顺序写对了这两个数词？', correct: 'eight, nine', distractors: ['nine, eight', 'eight, six'], hint: sequenceHint, explanation: '按从小到大的顺序，eight 在 nine 前面。' },
    { knowledgePointIds: ['number-word-vocabulary'], prompt: '哪组词卡的英文和中文意思都配对正确？', correct: 'two＝二；seven＝七', distractors: ['two＝三；seven＝九', 'two＝一；seven＝六'], hint: wordHint, explanation: 'two 表示“二”，seven 表示“七”。' },
    { knowledgePointIds: ['quantity-sentence', 'number-word-vocabulary'], prompt: '记录要表达“我有四本书”，哪句话中的数词正确？', correct: 'I have four books.', distractors: ['I have six books.', 'How many books?'], hint: sentenceHint, explanation: 'four 表示“四”，I have four books. 表达“我有四本书”。' },
    { knowledgePointIds: ['quantity-question', 'quantity-sentence'], prompt: '小朋友想问“有多少本书？”，应选哪句话？', correct: 'How many books?', distractors: ['I have three books.', 'I have five books.'], hint: sentenceHint, explanation: 'How many books? 是数量问题；I have…books. 是陈述有几本书。' },
    { knowledgePointIds: ['number-word-vocabulary'], prompt: '哪张词卡表示数字 9，而不是数字 6？', correct: 'nine', distractors: ['six', 'four'], hint: wordHint, explanation: 'nine 表示“九”，six 表示“六”。' },
    { knowledgePointIds: ['number-sequence'], prompt: '数词卡写成 one, two, four。要补回漏掉的相邻数词，应选哪张？', correct: 'three', distractors: ['five', 'eight'], hint: sequenceHint, explanation: 'two 后面是 three，four 接在 three 后面。' },
    { knowledgePointIds: ['number-word-vocabulary', 'number-sequence'], prompt: '图卡上有 6 个圆点。数点后应选哪张英文记录卡？', correct: 'six', distractors: ['four', 'eight'], hint: '先数清圆点，再核对英文数词和数量。', explanation: 'six 表示“六”，与 6 个圆点相符。' },
    { knowledgePointIds: ['quantity-question', 'quantity-sentence'], prompt: '同伴问“How many books?”，哪句直接回答书的数量？', correct: 'I have four books.', distractors: ['I have four pencils.', 'How many books?'], hint: '检查回答是否说出书的数量，而不是重复提问或换成其他物品。', explanation: 'I have four books. 说出了书的数量；另一个陈述句说的是铅笔。' },
    { knowledgePointIds: ['quantity-sentence', 'number-word-vocabulary'], prompt: '句子“I have five books.”中的 five 表示几？', correct: '五', distractors: ['三', '七'], hint: wordHint, explanation: 'five 表示“五”，句子说有五本书。' },
    { knowledgePointIds: ['number-sequence'], prompt: 'nine 前面紧挨着哪个数词？', correct: 'eight', distractors: ['ten', 'six'], hint: sequenceHint, explanation: 'eight、nine、ten 顺序相邻，eight 在 nine 前面。' },
    { knowledgePointIds: ['number-sequence'], prompt: '要把 five、six、seven 按数数顺序排好，哪一行正确？', correct: 'five, six, seven', distractors: ['six, five, seven', 'five, seven, six'], hint: sequenceHint, explanation: '从小到大依次是 five、six、seven。' },
    { knowledgePointIds: ['number-word-vocabulary'], prompt: '哪张词卡表示“七”？', correct: 'seven', distractors: ['six', 'ten'], hint: wordHint, explanation: 'seven 表示“七”。' },
    { knowledgePointIds: ['number-sequence', 'number-word-vocabulary'], prompt: 'four 后面是 five。哪项同时写对数词顺序和 five 的中文意思？', correct: 'four, five；five 表示“五”。', distractors: ['five, four；five 表示“四”。', 'four, six；six 表示“八”。'], hint: '先看两个数词的先后，再核对英文词卡的中文意思。', explanation: 'four 后面是 five，five 表示“五”。' },
    { knowledgePointIds: ['number-word-vocabulary'], prompt: '“one to five”和“six to ten”两组词卡中，five 和 six 分别应放在哪组？', correct: 'five 放在 one to five；six 放在 six to ten。', distractors: ['five 放在 six to ten；six 放在 one to five。', 'five 和 six 都放在 one to five。'], hint: '看清两组数词的范围，再分别核对 five 和 six。', explanation: 'five 属于 one to five；six 是 six to ten 的第一个数词。' },
    { knowledgePointIds: ['number-sequence'], prompt: '数词卡是 three、four、six。要让数数顺序连续，four 和 six 之间应放哪张卡？', correct: 'five', distractors: ['seven', 'two'], hint: '从 four 接着往后数，再核对 six 前面的数词。', explanation: 'three、four、five、six 顺序连续，缺少的是 five。' },
    { knowledgePointIds: ['quantity-question', 'quantity-sentence'], prompt: '“How many books?”旁边的图卡画着七本书，哪句话与图卡的数量相符？', correct: 'I have seven books.', distractors: ['I have five books.', 'I have nine books.'], hint: '先数图卡里的书，再核对答句中的数词。', explanation: '图卡有七本书，seven 表示“七”，I have seven books. 数量相符。' },
    { knowledgePointIds: ['number-word-vocabulary', 'quantity-sentence'], prompt: '句子“I have eight books.”旁边的数字卡和中文词义应是哪一组？', correct: '8；八。', distractors: ['6；六。', '9；九。'], hint: '在句子中找到数词，再核对数字和中文意思。', explanation: 'eight 表示“八”，对应数字 8。' },
    { knowledgePointIds: ['number-sequence', 'number-word-vocabulary'], prompt: '从 six 开始向前数两个数词，先后顺序是哪一项？', correct: 'five, four', distractors: ['seven, eight', 'four, five'], hint: '从 six 往回数时，每次退到前一个数词。', explanation: 'six 前面是 five，five 前面是 four，所以先后是 five、four。' },
    { knowledgePointIds: ['number-word-vocabulary', 'quantity-sentence'], prompt: '图卡上有十本书。哪一项同时选对英文数词和数量句？', correct: 'ten；I have ten books.', distractors: ['eight；I have eight books.', 'six；I have six books.'], hint: '先数清图卡，再分别核对数词和句子里的数量。', explanation: '十本书对应 ten；I have ten books. 表示“我有十本书”。' },
  ],
  high: [
    { knowledgePointIds: ['number-word-vocabulary', 'quantity-sentence'], prompt: 'A 卡记着 2 本书，B 卡记着 4 本书。哪组英文按顺序记录正确？', correct: 'A：I have two books.；B：I have four books.', distractors: ['A：I have four books.；B：I have two books.', 'A：How many books?；B：I have six books.'], hint: '分别核对两张卡的数量，再看句子是否按 A、B 顺序对应。', explanation: 'two 表示“两”，four 表示“四”，两句话与各自记录相符。' },
    { knowledgePointIds: ['number-sequence', 'number-word-vocabulary'], prompt: 'A 题的 one 已核对正确，B 题的 four 误写成 two。哪项只修正 B 题并保留 A 题？', correct: 'A 保留 one；B 把 two 改为 four。', distractors: ['A 把 one 改为 two；B 保留 two。', 'A 保留 one；B 把 four 改为 six。'], hint: '保留已确认的 A 项，只核对并更正 B 项的数词。', explanation: 'A 项 one 正确；B 项对应数字 4，应写 four。' },
    { knowledgePointIds: ['number-word-vocabulary', 'number-sequence'], prompt: '已知 two 表示“二”、three 表示“三”。four 的意思和它在 three 后的位置是哪项？', correct: 'four 表示“四”，排在 three 后面。', distractors: ['four 表示“六”，排在 two 前面。', 'four 表示“二”，排在 three 前面。'], hint: '分别检查数词的中文意思和数数顺序。', explanation: 'four 表示“四”，顺序是 two、three、four。' },
    { knowledgePointIds: ['quantity-question', 'quantity-sentence', 'number-word-vocabulary'], prompt: '桌上有 3 本书。哪条记录既答了“How many books?”，又写对数量？', correct: 'I have three books.', distractors: ['I have five books.', 'How many books?'], hint: '先确认书的数量，再选出用陈述句回答数量问题的记录。', explanation: 'three 表示“三”，I have three books. 回答有三本书。' },
    { knowledgePointIds: ['number-sequence'], prompt: '同伴数数时说“one, two, four, five”，哪项指出漏掉的数词并补在正确位置？', correct: 'three；放在 two 和 four 之间。', distractors: ['six；放在 five 后面。', 'one；放在 two 和 four 之间。'], hint: '从 one 开始逐个核对相邻数词，找出顺序断开的地方。', explanation: 'one、two、three、four、five 顺序连续，漏掉的是 three。' },
    { knowledgePointIds: ['number-word-vocabulary', 'number-sequence'], prompt: '词卡 seven 已对应数字 7。若再取它后面的一个数词，哪条记录两处都正确？', correct: 'seven＝七；后一个数词是 eight。', distractors: ['seven＝六；后一个数词是 nine。', 'seven＝八；前一个数词是 six。'], hint: '先核对 seven 的词义，再按顺序找它后面的数词。', explanation: 'seven 表示“七”，后面是 eight。' },
    { knowledgePointIds: ['quantity-question', 'quantity-sentence', 'number-word-vocabulary'], prompt: 'How many books? 的答案记录是“I have three books.”。哪项准确说明书的数量？', correct: 'three，表示三本书。', distractors: ['five，表示五本书。', 'two，表示两本书。'], hint: '在回答句中找到数词，再核对它的中文意思。', explanation: '回答句中的 three 表示“三”，所以是三本书。' },
    { knowledgePointIds: ['quantity-sentence', 'number-word-vocabulary'], prompt: '记录中有 5 本书和 3 支铅笔。哪句话准确描述书的数量？', correct: 'I have five books.', distractors: ['I have three books.', 'How many books?'], hint: '题目问的是书，分别核对物品名称和数量词。', explanation: '记录里有五本书，five 表示“五”；three 对应的是铅笔数量。' },
    { knowledgePointIds: ['number-sequence', 'quantity-question'], prompt: '数数卡为 six、seven、eight；问题“How many books?”问的是数量。哪项同时复核两条记录？', correct: '顺序正确；问题在问书有多少本。', distractors: ['顺序应为 six、eight、seven；问题在问书的颜色。', '顺序正确；问题在问书放在哪里。'], hint: '分别核对数词先后和 How many 的提问内容。', explanation: 'six、seven、eight 顺序正确；How many books? 询问书的数量。' },
    { knowledgePointIds: ['quantity-question', 'quantity-sentence'], prompt: 'A 卡问“How many books?”，B 卡答“I have two books.”。哪项判断正确？', correct: 'B 用 two 回答 A 的数量问题。', distractors: ['B 是另一个数量问题，没有回答 A。', 'B 说有 four books，与 two 的意思相同。'], hint: '辨别问句和陈述句，再核对 two 表示的数量。', explanation: 'How many books? 询问数量；I have two books. 回答有两本书。' },
    { knowledgePointIds: ['number-word-vocabulary', 'number-sequence'], prompt: '数字卡依次为 8、9、10。哪张英文数词记录既拼写正确又顺序对应？', correct: 'eight, nine, ten', distractors: ['eight, ten, nine', 'six, seven, eight'], hint: '核对每个数词的拼写，再检查它们对应的数字顺序。', explanation: 'eight、nine、ten 分别表示八、九、十，顺序与数字卡一致。' },
    { knowledgePointIds: ['number-word-vocabulary', 'quantity-sentence'], prompt: '同伴写下“I have four books.”，词卡 four 却标成“六”。哪项只修正错误的词义记录？', correct: '把 four 的中文改为“四”。', distractors: ['把 four 的中文改为“六”，句子不变。', '把 books 改成 How many，其他不检查。'], hint: '保留句子，单独核对数词 four 的中文意思。', explanation: 'four 表示“四”；应修正词义标签，句子本身表达有四本书。' },
    { knowledgePointIds: ['number-sequence', 'number-word-vocabulary'], prompt: 'A 组是 three、four、five；B 组是 six、eight、nine。哪项指出唯一缺少的相邻数词？', correct: 'B 组缺少 seven，应该放在 six 和 eight 之间。', distractors: ['A 组缺少 two，应该放在 three 和 four 之间。', 'B 组缺少 ten，应该放在 six 和 eight 之间。'], hint: '检查两组各自相邻数词之间是否有空缺。', explanation: 'six、seven、eight 顺序连续，B 组应在 six 和 eight 之间补 seven。' },
    { knowledgePointIds: ['quantity-question', 'quantity-sentence', 'number-sequence'], prompt: '数卡按顺序写着 two、three、four；回答“How many books?”的句子应说有四本书。哪张卡符合两项要求？', correct: 'I have four books.', distractors: ['I have two books.', 'How many books?'], hint: '先核对数量要求，再从数卡中选出对应的英文数词。', explanation: '四对应 four，I have four books. 回答了有四本书。' },
    { knowledgePointIds: ['number-word-vocabulary', 'quantity-sentence'], prompt: '记录 A 有四本书，写着“I have four books.”；记录 B 有七本书，却写着“I have six books.”。只改哪一处能让 B 正确？', correct: '把 B 句中的 six 改成 seven。', distractors: ['把 A 句中的 four 改成 five。', '把 B 句中的 books 改成 How many。'], hint: '保留已经对应的 A 记录，单独核对 B 的书本数量和数词。', explanation: 'B 有七本书，seven 表示“七”，所以应把 six 改为 seven。' },
    { knowledgePointIds: ['number-word-vocabulary', 'quantity-sentence'], prompt: '三处记录是“数字 5”“数词 five”“I have six books.”。哪项只修正不一致的地方？', correct: '把句子中的 six 改成 five。', distractors: ['把数字 5 改成 6，保留 five。', '把数词 five 改成 eight，保留句子。'], hint: '先比较数字卡和数词卡，再检查句子里的数量是否一致。', explanation: '数字 5 与 five 对应；句子中的 six 不一致，应改成 five。' },
    { knowledgePointIds: ['number-word-vocabulary', 'quantity-question', 'quantity-sentence'], prompt: '图卡有八本书，旁边问“How many books?”，记录句是“I have eight books.”。哪项复核说明正确？', correct: '问句在问书的数量，答句和图卡都表示八本书。', distractors: ['问句在问书的颜色，答句表示六本书。', '答句在询问数量，图卡表示九本书。'], hint: '分别核对问句的用途、答句的数词和图卡数量。', explanation: 'How many books? 询问书的数量；eight 表示“八”，与图卡相符。' },
    { knowledgePointIds: ['number-sequence', 'number-word-vocabulary'], prompt: '数词卡是 five、six、eight、nine。哪一项补全中间的数数顺序，并写出对应数字？', correct: '在 six 和 eight 之间放 seven；对应数字 7。', distractors: ['在 five 和 six 之间放 four；对应数字 4。', '在 eight 和 nine 之间放 ten；对应数字 10。'], hint: '从 five 开始逐个向后数，再核对数词和数字的对应。', explanation: 'five、six、seven、eight、nine 顺序连续；seven 对应数字 7。' },
    { knowledgePointIds: ['number-word-vocabulary', 'quantity-sentence'], prompt: '两张记录卡分别有三本和六本书。哪一组句子按卡片顺序记录正确？', correct: 'A：I have three books.；B：I have six books.', distractors: ['A：I have six books.；B：I have three books.', 'A：How many books?；B：I have six books.'], hint: '先分别数两张卡上的书，再检查 A、B 句子的顺序。', explanation: 'three 表示“三”，six 表示“六”，两句话与 A、B 卡片的数量相符。' },
    { knowledgePointIds: ['number-word-vocabulary', 'quantity-question', 'quantity-sentence'], prompt: '安安问“How many books?”，答句是“I have four books.”，数字卡也写着 4。哪项把问句、答句和数词记录都核对正确？', correct: '问句询问数量；four 表示 4，答句说有四本书。', distractors: ['问句说明数量；four 表示 6，答句说有六本书。', '问句询问颜色；four 表示 4，答句没有说明数量。'], hint: '分别检查问句的意思、数词对应的数字和答句的数量。', explanation: 'How many books? 询问数量；four 表示“四”，与数字卡和答句一致。' },
  ],
};

const positionOffset: Record<Difficulty, number> = { basic: 0, advanced: 14, high: 28 };

function createActivity(difficulty: Difficulty, index: number, draft: ActivityDraft): Grade1Term1EnglishUnit04SupplementalActivity {
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

export const grade1Term1EnglishUnit04SupplementalActivities: Grade1Term1EnglishUnit04SupplementalActivity[] = (
  Object.entries(drafts) as Array<[Difficulty, ActivityDraft[]]>
).flatMap(([difficulty, activities]) => activities.map((activity, index) => createActivity(difficulty, index, activity)));
