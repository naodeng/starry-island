import type { ChoiceActivityDefinition, Difficulty } from '../../content/types';

export type Grade2Term2EnglishUnit04KnowledgePointId =
  | 'digital-time-vocabulary'
  | 'time-question-and-answer'
  | 'time-report-sentences'
  | 'time-clue-and-report-reasoning';

export interface Grade2Term2EnglishUnit04SupplementalActivity {
  difficulty: Difficulty;
  sourceUnitId: string;
  sourceTaskId: string;
  knowledgePointIds: Grade2Term2EnglishUnit04KnowledgePointId[];
  activity: ChoiceActivityDefinition;
}

interface Draft {
  sourceTaskNumber: '01' | '02';
  knowledgePointIds: Grade2Term2EnglishUnit04KnowledgePointId[];
  prompt: string;
  answer: string;
  distractors: [string, string];
  hint: string;
  explanation: string;
}

const sourceUnitId = 'grade-2/term-2/english/unit-04';
const idPrefix = 'challenge-supplement-grade-2-term-2-english-unit-04';
const vocabulary: Grade2Term2EnglishUnit04KnowledgePointId = 'digital-time-vocabulary';
const questions: Grade2Term2EnglishUnit04KnowledgePointId = 'time-question-and-answer';
const reports: Grade2Term2EnglishUnit04KnowledgePointId = 'time-report-sentences';
const reasoning: Grade2Term2EnglishUnit04KnowledgePointId = 'time-clue-and-report-reasoning';

const q = (
  sourceTaskNumber: Draft['sourceTaskNumber'],
  knowledgePointIds: Grade2Term2EnglishUnit04KnowledgePointId[],
  prompt: string,
  answer: string,
  distractors: [string, string],
  hint: string,
  explanation: string,
): Draft => ({ sourceTaskNumber, knowledgePointIds, prompt, answer, distractors, hint, explanation });

const drafts: Record<Difficulty, Draft[]> = {
  basic: [
    q('01', [vocabulary], '屏幕上的时刻是 7:40。它表示几点？', '七点四十分', ['十一点三十分', '两点五十分'], '逐位看清小时和分钟，再选对应的中文读数。', '7:40 表示七点四十分。'),
    q('01', [vocabulary], '要找到“十一点三十分”这张时刻卡，应选哪个数字？', '11:30', ['2:50', '5:00'], '先找表示十一点和三十分的数字卡。', '11:30 表示十一点三十分。'),
    q('01', [vocabulary, reasoning], '校对员检查 2:50 的中文读数，哪组配对正确？', '2:50—两点五十分', ['2:50—七点四十分', '5:00—两点五十分'], '保留 2:50，再分别核对小时和分钟。', '2:50 对应两点五十分。'),
    q('01', [reports, reasoning], '钟面显示 5:00，英文播报条应放哪一句？', "It's 5:00.", ["It's 7:40.", "It's 2:50."], '报时句中的数字要与钟面完全相同。', "It's 5:00. 报告钟面显示的五点整。"),
    q('01', [questions], '小组想知道伙伴的钟面时间，应该先说哪句问话？', 'What time is it?', ["It's 5:00.", "It's 2:50."], '选择询问时间的句子，不选报告时间的句子。', 'What time is it? 用来询问现在的时间。'),
    q('01', [reports], '数字时刻卡显示 11:30，报时栏哪句准确？', "It's 11:30.", ["It's 7:40.", "It's 5:00."], '对照 11:30，检查句子中的两个数字。', "It's 11:30. 与时刻卡相同。"),
    q('01', [vocabulary, reasoning], '在“整点、非整点”两栏中，5:00 应放在哪一栏？', '整点', ['非整点', '时间问句'], '5:00 的分钟数是什么？', '5:00 的分钟数为 00，所以它表示整点。'),
    q('02', [reports], '卡片句子缺一个开头：“___ 7:40.” 要报告 7:40，选哪个开头？', "It's", ['What time is', 'time'], '报时句使用本单元练习的 It’s + 数字时间。', "It's 7:40. 是完整的报时句。"),
    q('02', [questions, reports], '钟面显示 2:50，伙伴问“What time is it?”，选择合适回答。', "It's 2:50.", ["It's 5:00.", 'What time is it?'], '回答要报出钟面显示的时间。', "It's 2:50. 回答了问句，也与钟面一致。"),
    q('02', [questions, reports], '把这两张卡分别放到“询问时间”和“报告时间”栏：“What time is it?”、“It\'s 7:40.”。哪组标签正确？', "问句：What time is it?；报时句：It's 7:40.", ["问句：It's 7:40.；报时句：What time is it?", "问句：What time is it?；报时句：It's 5:00."], '问句是在提问；报时句要陈述一个时刻，并保留卡上的数字。', 'What time is it? 是问句；It’s 7:40. 是报告卡上的时间。'),
    q('02', [reports, reasoning], '钟面是 7:40，草稿写“It\'s 5:00.”。只改报时里的时间，完整句应是哪句？', "It's 7:40.", ["It's 5:00.", 'What time is it?'], '保留报时句的结构，只替换不一致的时间数字。', "钟面显示 7:40，所以报时句应为 It's 7:40."),
    q('02', [reports, reasoning], '哪条记录的钟面数字和报时句完全相同？', "钟面 11:30；报时句 It's 11:30.", ["钟面 11:30；报时句 It's 2:50.", "钟面 7:40；报时句 It's 5:00."], '把每一行的钟面数字与句子数字逐个比较。', '只有第一条记录的两个时刻都是 11:30。'),
    q('02', [reports], '选出把 It’s、5:00 和句点排成完整报时句的顺序。', "It's → 5:00 → .", ['5:00 → It’s → .', "It's → . → 5:00"], '先放句子开头，再放时间，最后放句点。', "词卡按 It's、5:00、句点排列后，句子是 It's 5:00."),
    q('02', [vocabulary, reports], '一张记录要同时写中文读数和英文报时，时刻为 7:40，哪行正确？', "七点四十分；It's 7:40.", ["十一点三十分；It's 7:40.", "七点四十分；It's 11:30."], '中文读数和英文报时都要对应 7:40。', '7:40 表示七点四十分，报时句是 It’s 7:40.'),
  ],
  advanced: [
    q('01', [vocabulary, reports, reasoning], '广播单先读 7:40，再读 11:30；哪两句按这个顺序报对了？', "It's 7:40.；It's 11:30.", ["It's 11:30.；It's 7:40.", "It's 7:40.；It's 5:00."], '先确认第一句，再检查第二句，并保留记录顺序。', '两句依次报告 7:40 和 11:30。'),
    q('01', [questions, reports], '钟面是 5:00，伙伴问“What time is it?”。哪个回答既答了问题，也报准时刻？', "It's 5:00.", ["It's 7:40.", 'What time is it?'], '回答要是报时句，而且数字要与钟面相同。', "It's 5:00. 是对时间问句的回答，数字也与钟面一致。"),
    q('01', [vocabulary, reports, reasoning], '时刻卡是 2:50，旁边的报时草稿却写“It\'s 7:40.”。哪项指出了不一致之处？', '报时句中的 7:40 与钟面 2:50 不同。', ['报时句中的 7:40 与钟面 2:50 相同。', 'What time is it? 是一条时间报告。'], '把两处时间数字逐位比较。', '钟面显示 2:50，报时句却写 7:40，因此两者不一致。'),
    q('01', [vocabulary, questions, reports], '分拣四张卡：11:30、2:50、What time is it?、It\'s 5:00.。哪组分类正确？', '数字：11:30、2:50；句子：What time is it?、It\'s 5:00.', ['数字：What time is it?、11:30；句子：2:50、It\'s 5:00.', '数字：11:30、It\'s 5:00.；句子：What time is it?、2:50'], '数字卡只写时刻；句子卡包含询问或报时表达。', '11:30 和 2:50 是数字时刻；另两张卡是英文句子。'),
    q('01', [reports, reasoning], '两条校对记录中，哪一行的钟面和报时需要修改？第一行：钟面 2:50、句子 It\'s 2:50.；第二行：钟面 7:40、句子 It\'s 11:30.', '第二行需要修改。', ['第一行需要修改。', '两行都不需要修改。'], '逐行比较钟面和句子里的数字。', '第一行时刻一致；第二行的钟面 7:40 与报时 11:30 不同。'),
    q('01', [questions, reports, reasoning], '钟面显示 11:30；对话是“A: What time is it? B: It\'s 11:30.”。哪项评价同时核对了问答和钟面？', '问句合适，回答也与钟面一致。', ['问句合适，但回答应是 It\'s 7:40.', '问句是在报告时间，回答是在提问。'], '先看 A 是否提问，再核对 B 的数字。', 'A 询问时间；B 报告 11:30，和钟面相同。'),
    q('01', [reports, reasoning], '报时前为什么要把句子中的数字和钟面比较？', '这样报时句里的数字才能与钟面一致。', ['这样可以把 What time is it? 改成一个时间数字。', '这样可以把 5:00 说成 7:40。'], '比较的目的是检查两处时间是否相同。', '钟面与报时句中的数字相同，报告才准确。'),
    q('02', [vocabulary, reports], '时间卡上写着“It\'s 11:30.”，要找出对应的数字时刻，应选哪张？', '11:30', ['7:40', '2:50'], '把句子中的小时和分钟与候选卡对照。', '句子报告的数字是 11:30。'),
    q('02', [questions, reports], '把“What time is it?”与 2:50 的时间回答组成完整问答，哪项合适？', "A: What time is it? B: It's 2:50.", ["A: It's 2:50. B: What time is it?", "A: What time is it? B: It's 5:00."], '问句放在前面，回答要使用 2:50。', 'A 先询问时间，B 再准确报告 2:50。'),
    q('02', [vocabulary, reasoning], '把 5:00、7:40、11:30、2:50 分到“整点”和“非整点”，哪组正确？', '整点：5:00；非整点：7:40、11:30、2:50。', ['整点：5:00、7:40；非整点：11:30、2:50。', '整点：11:30；非整点：5:00、7:40、2:50。'], '整点的分钟数为 00；其余三张卡不是整点。', '5:00 的分钟数是 00；其他时刻的分钟数不是 00。'),
    q('02', [reports, reasoning], '记录员写“钟面 7:40；It 7:40.”，怎样改成完整的报时句？', "It's 7:40.", ['It 7:40.', 'What time is 7:40?'], '检查本单元报时句开头的完整写法。', "完整报时句使用 It's，再接数字时间。"),
    q('02', [reports, reasoning], '三行记录中，哪一行的钟面和英文报时完全吻合？A：2:50 / It\'s 5:00；B：11:30 / It\'s 11:30；C：7:40 / It\'s 2:50。', 'B 行正确。', ['A 行正确。', 'C 行正确。'], '逐行比较数字时刻和报时句。', '只有 B 行的数字时刻和报时句都写着 11:30。'),
    q('02', [questions, reports], '问时间和回答时间分别要放在不同位置，哪组标签与句子功能对应？', "问句：What time is it?；回答：It's 11:30.", ["问句：It's 11:30.；回答：What time is it?", "问句：11:30；回答：What time is it?"], '问句提出问题；回答报告一个数字时刻。', 'What time is it? 是问句，It’s 11:30. 是回答。'),
    q('02', [reports, reasoning], '两张钟面卡依次显示 5:00、2:50。按相同顺序填写报时栏，哪组句子正确？', "It's 5:00.；It's 2:50.", ["It's 2:50.；It's 5:00.", "It's 5:00.；It's 7:40."], '逐张配对后，不要调换两张卡的顺序。', '第一张卡对应 It’s 5:00.，第二张对应 It’s 2:50.。'),
  ],
  high: [
    q('01', [vocabulary, reports, reasoning], '三条校对记录是“5:00—It\'s 5:00.”、“11:30—It\'s 11:30.”、“7:40—It\'s 2:50.”。哪条记录需要修正？', '第三条记录需修改。', ['第一条记录需修改。', '第二条记录需修改。'], '逐条核对数字时刻与报时句，找到唯一不相同的一行。', '前两行数字相同；第三行的钟面 7:40 与句子 2:50 不同。'),
    q('01', [vocabulary, reports, reasoning], '哪组选项把“七点四十分”、数字卡和报时句都对应到同一时刻？', "七点四十分；7:40；It's 7:40.", ["七点四十分；11:30；It's 7:40.", "十一点三十分；7:40；It's 11:30."], '同时检查中文读数、数字和报时句中的时间。', '三种写法都表示 7:40。'),
    q('01', [questions, reports, reasoning], '问题卡问“What time is it?”，钟面显示 11:30。哪段对话既保留问句，也答对了时间？', "A: What time is it? B: It's 11:30.", ["A: What time is it? B: It's 5:00.", "A: It's 11:30. B: What time is it?"], '对话先提问，回答中的时间要与钟面一致。', '问句询问时间；回答准确报告 11:30。'),
    q('01', [reports, reasoning], '检查两张播报卡：第一张钟面 2:50、句子“It\'s 2:50.”；第二张钟面 5:00、句子“It\'s 5:00.”。哪项总结正确？', '两条报时句都与各自钟面相同。', ['只有第一条相同。', '只有第二条相同。'], '分别比较每张卡上的两个数字。', '两张卡的钟面数字都与对应报时句一致。'),
    q('01', [vocabulary, reports, reasoning], '四行展签中有几行的数字时刻与报时句一致？依次是：5:00 / It\'s 5:00；2:50 / It\'s 2:50；7:40 / It\'s 11:30；11:30 / It\'s 11:30。', '3条记录相符。', ['2条记录相符。', '4条记录相符。'], '逐行比较数字时刻与报时句中的时间。', '第一、二、四行相符，共三行。'),
    q('01', [questions, reports, reasoning], '钟面显示 5:00，伙伴问“What time is it?”，回答写成“It\'s 2:50.”。哪项指出了两处信息的状态？', '问句合适，回答应改为 It\'s 5:00.', ['问句应改为 It\'s 5:00，回答保留。', '问句和回答都与钟面相同。'], '问句在询问时间；再单独核对回答里的数字。', '问句正确，但回答 2:50 与钟面 5:00 不一致。'),
    q('01', [reports, reasoning], '钟面和报时句都写 2:50，哪项说明了这条消息为何相符？', '钟面和报时句中的数字都是 2:50，因此信息相符。', ['钟面是 2:50，但报时句是 5:00。', 'What time is it? 是一条报时句。'], '找出钟面和句子里相同的数字。', '钟面显示 2:50，报时句也报告 2:50。'),
    q('02', [vocabulary, reports], '句子“It\'s 11:30.”需要配一张数字卡和一张中文读数卡，哪组都对应正确？', '11:30；十一点三十分', ['7:40；十一点三十分', '11:30；两点五十分'], '数字卡和中文读数都要与句子中的 11:30 对应。', '11:30 表示十一点三十分。'),
    q('02', [vocabulary, reports, reasoning], '记录卡上已有数字“2:50”和中文读数“两点五十分”，英文报时栏还空着。哪句补入后能保留两项信息？', "It's 2:50.", ["It's 5:00.", 'What time is it?'], '先核对两项已知读数，再选择报告它们的句子。', "2:50 对应两点五十分，正确英文报时是 It's 2:50."),
    q('02', [questions, reports], '记录卡已经写好报时句“It\'s 5:00.”；若要改成询问钟面时间的问句，应换成哪句？', 'What time is it?', ["It's 5:00.", 'What time it is?'], '新句子要提出问题，而不是继续报告时间。', 'What time is it? 是询问时间的句子。'),
    q('02', [vocabulary, reports, reasoning], '候选配对中，哪一项的数字卡和报时句不相符？', '11:30 和 It\'s 2:50 不相符。', ['5:00 和 It\'s 5:00 相符。', '2:50 和 It\'s 2:50 相符。'], '选出两处数字不同的配对。', '11:30 与 2:50 是不同的时刻。'),
    q('02', [questions, reports], '看见句子“It\'s 5:00.”，这张卡应该说明它的用途是什么？', '这是报时句，用来报告时间。', ['这是问句，用来询问时间。', '这是数字时刻卡，不是句子。'], '句子直接给出一个时刻，判断它是在提问还是报告。', 'It’s 5:00. 陈述钟面时间，是报时句。'),
    q('02', [questions, reports, reasoning], '钟面显示 7:40；对话是“A: What time is it? B: It\'s 7:40.”。这份记录应如何处理？', '问句和报时都与钟面相符，可以保留。', ['保留问句，把回答改成 It\'s 11:30.', '把问句改成 It\'s 7:40.，回答改成 What time is it?'], '核对问句功能和回答数字这两点。', '问句是在询问时间，回答报告 7:40，与钟面一致。'),
    q('02', [reports, reasoning], '两张钟面分别是 7:40 和 11:30，草稿报时却分别写“It\'s 5:00.”和“It\'s 2:50.”。哪组修改能让两条报告都准确？', "把两条报时分别改为 It's 7:40. 和 It's 11:30.", ["把两条报时分别改为 It's 5:00. 和 It's 2:50.", "把两条报时分别改为 It's 11:30. 和 It's 7:40."], '每句分别跟对应钟面比对，并保留两张卡的先后顺序。', '第一张钟面是 7:40，第二张是 11:30，修正后的两句按顺序对应它们。'),
  ],
};

const correctPositionOffset: Record<Difficulty, number> = { basic: 0, advanced: 1, high: 2 };

function createActivity(difficulty: Difficulty, index: number, draft: Draft): Grade2Term2EnglishUnit04SupplementalActivity {
  const correctIndex = ((index + correctPositionOffset[difficulty]) % 3) as 0 | 1 | 2;
  const labels = [...draft.distractors];
  labels.splice(correctIndex, 0, draft.answer);
  return {
    difficulty,
    sourceUnitId,
    sourceTaskId: `${sourceUnitId}/${difficulty}/task-${draft.sourceTaskNumber}`,
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

export const grade2Term2EnglishUnit04SupplementalActivities: Grade2Term2EnglishUnit04SupplementalActivity[] = (
  Object.entries(drafts) as Array<[Difficulty, Draft[]]>
).flatMap(([difficulty, activities]) => activities.map((activity, index) => createActivity(difficulty, index, activity)));
