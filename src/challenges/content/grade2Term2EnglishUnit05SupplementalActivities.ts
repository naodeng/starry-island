import type { ChoiceActivityDefinition, Difficulty } from '../../content/types';

export type Grade2Term2EnglishUnit05KnowledgePointId =
  | 'daily-routine-vocabulary'
  | 'daily-time-question-and-answer'
  | 'routine-schedule-sentences'
  | 'daily-routine-clue-and-reasoning';

export interface Grade2Term2EnglishUnit05SupplementalActivity {
  difficulty: Difficulty;
  sourceUnitId: string;
  sourceTaskId: string;
  knowledgePointIds: Grade2Term2EnglishUnit05KnowledgePointId[];
  activity: ChoiceActivityDefinition;
}

interface Draft {
  sourceTaskNumber: '01' | '02';
  knowledgePointIds: Grade2Term2EnglishUnit05KnowledgePointId[];
  prompt: string;
  answer: string;
  distractors: [string, string];
  hint: string;
  explanation: string;
}

const sourceUnitId = 'grade-2/term-2/english/unit-05';
const idPrefix = 'challenge-supplement-grade-2-term-2-english-unit-05';
const vocabulary: Grade2Term2EnglishUnit05KnowledgePointId = 'daily-routine-vocabulary';
const questions: Grade2Term2EnglishUnit05KnowledgePointId = 'daily-time-question-and-answer';
const sentences: Grade2Term2EnglishUnit05KnowledgePointId = 'routine-schedule-sentences';
const reasoning: Grade2Term2EnglishUnit05KnowledgePointId = 'daily-routine-clue-and-reasoning';

const q = (
  sourceTaskNumber: Draft['sourceTaskNumber'],
  knowledgePointIds: Grade2Term2EnglishUnit05KnowledgePointId[],
  prompt: string,
  answer: string,
  distractors: [string, string],
  hint: string,
  explanation: string,
): Draft => ({ sourceTaskNumber, knowledgePointIds, prompt, answer, distractors, hint, explanation });

const drafts: Record<Difficulty, Draft[]> = {
  basic: [
    q('01', [vocabulary], '词卡上写着“get up”，应该和哪项中文意思放在一起？', '起床', ['去上学', '吃早餐'], '先认清 get up 这张词卡，再找对应的活动。', 'get up 表示“起床”。'),
    q('01', [vocabulary], '“吃早餐”对应哪张英文词卡？', 'eat breakfast', ['get up', 'go home'], '在词卡中找到表示吃早餐的活动词组。', 'eat breakfast 表示“吃早餐”。'),
    q('01', [questions], '小记者想问朋友每天什么时候去上学，哪句问话合适？', 'When do you go to school every day?', ['What do you eat every day?', 'Where do you go after school?'], '题目要问活动发生的时间，所以要选 When 开头的问句。', 'When do you…every day? 用来询问每天做某件事的时间。'),
    q('01', [questions, sentences], '伙伴问“When do you get up every day?”。哪句回答同时说清活动和时间？', 'I get up at 6:30.', ['I eat breakfast at 6:30.', 'When do you get up at 6:30?'], '回答要保留 get up，并用 at 接上时间。', 'I get up at 6:30. 回答了起床时间。'),
    q('01', [sentences], '要表达“我八点去上学”，应该选哪句？', 'I go to school at 8:00.', ['I go home at 8:00.', 'I get up at 8:00.'], '核对句子里的活动，再看 at 后面的时间。', 'go to school 表示去上学；完整句是 I go to school at 8:00.'),
    q('01', [sentences], '句子“I ___ at 7:00.”要表达“我七点吃早餐”，空格里选哪项？', 'eat breakfast', ['go to school', 'get up'], '先确定要说的活动，再把它放在 I 后面。', 'I eat breakfast at 7:00. 表示“我七点吃早餐”。'),
    q('01', [questions, sentences, reasoning], '记录卡A要问“你每天什么时候起床？”，记录卡B要答“我六点半起床。”。哪组顺序正确？', 'A: When do you get up every day? B: I get up at 6:30.', ['A: I get up at 6:30. B: When do you get up every day?', 'A: When do you eat breakfast every day? B: I get up at 6:30.'], '先放询问起床时间的问句，再放报告起床时间的回答。', 'A 询问每天的起床时间；B 用 I get up at 6:30. 作答。'),
    q('02', [vocabulary], '哪张英文词卡表示“回家”？', 'go home', ['go to school', 'get up'], '区分回家和去上学这两个活动词组。', 'go home 表示“回家”。'),
    q('02', [vocabulary], '词卡“go to school”表示哪项活动？', '去上学', ['回家', '吃早餐'], '看词组中的 school，再核对中文意思。', 'go to school 表示“去上学”。'),
    q('02', [questions, sentences], '对方问“When do you eat breakfast every day?”，哪句回答符合问句？', 'I eat breakfast at 7:00.', ['I get up at 7:00.', 'When do you eat breakfast every day?'], '回答要说出吃早餐的时间，不能把问句再说一遍。', 'I eat breakfast at 7:00. 回答了每天什么时候吃早餐。'),
    q('02', [sentences], '按本单元的 at + 时间表达补完整句子：“I go home ___ four.”', 'at', ['on', 'in'], '句子要用本单元练习的 at 来连接活动和时间。', 'I go home at four. 中，at four 表示时间。'),
    q('02', [vocabulary, reasoning], '两组词义配对中，哪一组都正确？', 'get up — 起床；eat breakfast — 吃早餐', ['get up — 回家；eat breakfast — 吃早餐', 'get up — 起床；eat breakfast — 去上学'], '分别核对两张英文词卡的中文意思。', 'get up 是起床，eat breakfast 是吃早餐。'),
    q('02', [questions], '要了解朋友每天什么时候吃早餐，应该选哪句英文问话？', 'When do you eat breakfast every day?', ['What do you eat every day?', 'Where do you eat breakfast every day?'], '想知道时间要用 When；What 和 Where 问的是其他信息。', 'When do you eat breakfast every day? 询问每天吃早餐的时间。'),
    q('02', [reasoning, sentences], '时间表A写“我七点吃早餐”，对应 I eat breakfast at 7:00.；时间表B写“我七点半去上学”，却对应 I go home at 7:30.。哪项反馈正确？', '记录A正确；记录B应改为 I go to school at 7:30.', ['记录A应改为 I get up at 7:00.；记录B正确。', '记录A正确；记录B也正确。'], '先看每张时间表写的活动，再检查英文句子是否报告同一活动和时间。', 'A 的活动和时间相符；B 要把 go home 改为 go to school。'),
  ],
  advanced: [
    q('01', [questions, sentences], '采访卡有两组问答：先问起床时间，再问早餐时间。哪组按这个顺序都问答正确？', 'A: When do you get up every day? B: I get up at 6:30.；A: When do you eat breakfast every day? B: I eat breakfast at seven.', ['A: When do you eat breakfast every day? B: I get up at 6:30.；A: When do you get up every day? B: I eat breakfast at seven.', 'A: I get up at 6:30. B: When do you get up every day?；A: I eat breakfast at seven. B: When do you eat breakfast every day?'], '依次核对活动名称、问句功能和对应时间回答。', '第一组问起床并答 6:30，第二组问早餐并答 at seven。'),
    q('01', [vocabulary, sentences], '安排卡写着“我去上学；8:00”。哪项同时给出正确词义和完整报时句？', '“我去上学”对应 go to school；句子使用 I go to school at 8:00.', ['“我去上学”对应 go home；句子使用 I go home at 8:00.', '“我去上学”对应 get up；句子使用 I get up at 8:00.'], '先核对中文活动对应的英文词组，再检查句子里的活动和时间。', 'go to school 对应去上学；I go to school at 8:00. 报告了这项安排。'),
    q('01', [sentences], '早餐记录写着“eat breakfast；7:00”。哪句报告与这两项信息一致？', 'I eat breakfast at 7:00.', ['I get up at 7:00.', 'I eat breakfast at 8:00.'], '句子中的活动和 at 后面的时间都要与记录卡相符。', 'I eat breakfast at 7:00. 与活动和时间记录一致。'),
    q('01', [vocabulary, sentences], '要把“我六点半起床”和“我七点吃早餐”写在活动卡上，哪组句子与两项安排都相符？', 'get up at 6:30；eat breakfast at seven', ['eat breakfast at 6:30；go to school at seven', 'go home at 6:30；get up at seven'], '分别核对两项活动和时间，不要把先后两张卡调换。', '起床卡对应 6:30，早餐卡对应 at seven。'),
    q('01', [questions], '读到“When do you go home every day?”，这句话最适合放在哪张卡上？', '询问每天什么时候回家的问句', ['报告“我每天回家”的陈述句', '询问每天吃什么的问句'], 'When do you…every day? 在询问某项日常活动的时间。', '这句话询问每天什么时候回家。'),
    q('01', [reasoning, questions, sentences], '采访先询问早餐时间，再报告“我七点吃早餐”。哪组文字按这个顺序表达清楚？', '先问“When do you eat breakfast every day?”，再回答“I eat breakfast at 7:00.”', ['先回答“I eat breakfast at 7:00.”，再问“When do you eat breakfast every day?”', '先问“When do you get up every day?”，再回答“I go home at four.”'], '问句要先出现，回答要回应同一项活动。', '第一组选对了早餐问句，接着报告 at 7:00。'),
    q('01', [questions, sentences], '把采访中的句子按“问句”和“回答”标记，哪组标签正确？', '问题是 When do you get up every day?；回答是 I get up at 6:30.', ['问题是 I get up at 6:30.；回答是 When do you get up every day?', '问题是 When do you eat breakfast every day?；回答是 I get up at 6:30.'], '问句询问活动时间；回答要报告相同活动的时间。', 'When do you get up every day? 提问；I get up at 6:30. 回答。'),
    q('02', [sentences], '“我四点回家”要写成一个完整句子，哪句合适？', 'I go home at four.', ['I go to school at four.', 'I get up at four.'], '选择表示回家的活动，再把时间放在 at 后面。', 'I go home at four. 表示“我四点回家”。'),
    q('02', [reasoning, sentences], '时间表第一行“我八点去上学”已写成 I go to school at 8:00.；第二行“我七点起床”却写成 I eat breakfast at 7:00.。哪项找出了需要改的记录？', '第二条记录有误：把 I eat breakfast at 7:00. 改为 I get up at 7:00.', ['第一条记录有误：把 I go to school at 8:00. 改为 I go home at 8:00.', '两条记录都正确，不用修改。'], '逐行对照中文活动和英文活动词组，再核对时间。', '第一行相符；第二行要把 eat breakfast 改为 get up。'),
    q('02', [questions], '要回答“When do you go home every day?”，哪句回应了“回家”的时间？', 'I go home at four.', ['I go to school at four.', 'When do you go home every day?'], '回答应报告 go home 的时间，而不是换成另一项活动或重复提问。', 'I go home at four. 回答每天什么时候回家。'),
    q('02', [questions, sentences], '对话A是“When do you eat breakfast every day?”，对话B是“I eat breakfast at 7:00.”。哪项说明了两句的功能？', 'A是问句；B是回答句。', ['A是回答句；B是问句。', 'A和B都是询问时间的问句。'], '检查哪句话提出问题，哪句话报告活动时间。', 'A 用 When 提问；B 用 I…at… 报告早餐时间。'),
    q('02', [vocabulary, reasoning], '三张校对卡是：A get up—起床；B go home—去上学；C eat breakfast—吃早餐。哪项反馈只需要修正一张卡？', 'A和C正确；B应改为 go home — 回家。', ['A和B正确；C应改为 eat breakfast — 去上学。', 'B和C正确；A应改为 get up — 回家。'], '逐组核对英文活动与中文意思，找出唯一不一致的一张卡。', 'A、C配对正确；go home 表示回家，不是去上学。'),
    q('02', [questions, sentences], '这组采访卡先问早餐时间，再记录“我七点吃早餐”。哪份记录的两句都对应早餐活动？', 'A: When do you eat breakfast every day? B: I eat breakfast at seven.', ['A: When do you get up every day? B: I eat breakfast at seven.', 'A: When do you eat breakfast every day? B: I go home at four.'], '核对问句和回答是否都说同一项活动。', '问句询问早餐时间，回答报告 at seven。'),
    q('02', [questions, sentences, reasoning], '小组要记录每天回家的问答，哪组先提问再给出正确回答？', 'A: When do you go home every day? B: I go home at four.', ['A: I go home at four. B: When do you go home every day?', 'A: When do you go home every day? B: I go to school at four.'], '检查对话顺序，并确认回答中的活动和时间。', '先问每天回家的时间，再回答 I go home at four.。'),
  ],
  high: [
    q('01', [vocabulary, sentences, reasoning], '活动记录要求两步核对：找出“get up”的词义，再写出“我六点半起床”；然后找出“eat breakfast”的词义，再写出“我七点吃早餐”。哪组答案按顺序全部相符？', 'get up — 起床；I get up at 6:30.；eat breakfast — 吃早餐；I eat breakfast at seven.', ['get up — 吃早餐；I get up at 6:30.；eat breakfast — 起床；I eat breakfast at seven.', 'get up — 起床；I eat breakfast at 6:30.；eat breakfast — 吃早餐；I get up at seven.'], '按题目顺序逐项检查词义、活动和时间。', '两组词义正确，句子也分别报告起床和吃早餐的时间。'),
    q('01', [vocabulary, sentences, reasoning], '校对表A的目标是“我八点去上学”，答案 I go to school at 8:00. 已核对正确；表B的目标是“我六点半起床”，却选了 eat breakfast。哪项只修正B？', 'A保留 I go to school at 8:00.；B改为 get up.', ['A改为 I go home at 8:00.；B保留 eat breakfast。', 'A保留 I go to school at 8:00.；B改为 go home。'], '先保留已核对正确的A，再看B目标中的活动词。', 'A 的活动和时间一致；B 要用 get up 表示起床。'),
    q('01', [vocabulary, reasoning], '按一天中的活动顺序排卡片，哪组顺序符合“起床、吃早餐、去上学、回家”？', 'get up → eat breakfast → go to school → go home', ['eat breakfast → get up → go home → go to school', 'go to school → get up → eat breakfast → go home'], '先排早晨开始的活动，再放上学和放学后的活动。', '起床后吃早餐，再去上学，放学后回家。'),
    q('01', [sentences, reasoning], '四张安排卡分别写着“起床：6:30、早餐：7:00、上学：8:00、回家：four”。哪组英文句子逐项对应这些安排？', 'I get up at 6:30.；I eat breakfast at 7:00.；I go to school at 8:00.；I go home at four.', ['I get up at 7:00.；I eat breakfast at 6:30.；I go to school at 8:00.；I go home at four.', 'I get up at 6:30.；I eat breakfast at 7:00.；I go to school at four.；I go home at 8:00.'], '逐项核对活动和时间，确认没有把两张安排卡交换。', '正确选项依次保留了四项活动对应的时间。'),
    q('01', [questions, sentences, reasoning], '采访A问“When do you go home every day?”，B却答“I go to school at four.”。哪项保留正确问句并修正不相符的回答？', 'A保留 When do you go home every day?；B改为 I go home at four.', ['A改为 When do you go to school every day?；B保留 I go to school at four.', 'A保留 When do you go home every day?；B改为 I get up at four.'], '问句已经说明要了解回家时间；回答也要报告回家。', '保留回家问句，把回答中的 go to school 改成 go home。'),
    q('01', [questions, sentences, reasoning], '早餐采访的回答“I eat breakfast at seven.”正确；起床采访却把“我六点半起床”记成“I eat breakfast at 6:30.”。哪项反馈保留正确答案并修正错误答案？', '先保留正确的早餐回答；把起床回答改为 I get up at 6:30.', ['把早餐回答改为 I get up at seven.；起床回答保留 I eat breakfast at 6:30.', '两句都保留，因为时间数字相同。'], '分别核对每个回答中的活动，再判断时间数字是否属于正确活动。', '早餐回答不用改；起床回答应使用 get up。'),
    q('01', [vocabulary, reasoning], '将词卡分到“早晨活动”和“放学后的活动”两栏，哪项整理正确？', 'get up 和 eat breakfast 属于早晨活动；go home 属于放学后的活动。', ['go home 属于早晨活动；get up 属于放学后的活动。', 'eat breakfast 和 go to school 都属于放学后的活动。'], '根据词卡所表示的日常活动判断类别。', 'get up、eat breakfast 是早晨活动；go home 对应放学后回家。'),
    q('02', [vocabulary, sentences, reasoning], '时间表A写“我八点去上学”，记录为 I go to school at 8:00.；B写“我七点起床”，却记录为 I eat breakfast at seven.。哪项改动能保留A并修正B？', '把 B 的 I eat breakfast at seven. 改为 I get up at seven.', ['把 A 的 I go to school at 8:00. 改为 I get up at 8:00.；B保留。', 'A和B都改为 I go home at four.'], 'A已经匹配；B需要把英文活动改成目标“起床”。', 'B 的时间 seven 正确，活动应由 eat breakfast 改为 get up。'),
    q('02', [questions, sentences, reasoning], '两张采访卡分别要问起床时间和上学时间。哪组问答按顺序都对应目标活动？', 'A: When do you get up every day? B: I get up at 6:30.；A: When do you go to school every day? B: I go to school at 8:00.', ['A: When do you go to school every day? B: I get up at 6:30.；A: When do you get up every day? B: I go to school at 8:00.', 'A: I get up at 6:30. B: When do you get up every day?；A: I go to school at 8:00. B: When do you go to school every day?'], '两组都要先问对应活动，再用相同活动的句子回答。', '第一组问起床、答 6:30；第二组问上学、答 8:00。'),
    q('02', [questions, sentences], '读两句记录：“When do you eat breakfast every day?” 和 “I eat breakfast at 7:00.”。哪项说明了它们各自的用途？', 'When do you eat breakfast every day? 是问句；I eat breakfast at 7:00. 是回答。', ['When do you eat breakfast every day? 是回答；I eat breakfast at 7:00. 是问句。', '两句都是报告早餐时间的陈述句。'], '第一句提出问题，第二句用 I…at… 报告活动时间。', '前一句询问每天什么时候吃早餐，后一句回答 at 7:00。'),
    q('02', [sentences, reasoning], '在“I go home at four.”中，at four 提供了哪类信息？', 'at four 表示句子中的时间。', ['at four 表示活动名称。', 'at four 表示这是一个问句。'], '看 at 后面的词组，它补充的是活动发生的时间。', 'at four 表示四点，说明回家的时间。'),
    q('02', [sentences, reasoning], '哪条中英记录的活动和时间彼此对应？', '“I go to school at 8:00.”和“我八点去上学。”相符。', ['“I go home at four.”和“我八点去上学。”相符。', '“I get up at 6:30.”和“我七点吃早餐。”相符。'], '同时核对英文活动、英文时间和中文记录。', 'go to school at 8:00 与“八点去上学”相符。'),
    q('02', [vocabulary, reasoning], '按照“get up 后、go to school 前”的日常顺序，哪张活动卡应放在中间？', 'eat breakfast', ['go home', 'go to school'], '先找出起床和去上学之间的早晨活动。', '根据本单元的日常活动顺序，起床后吃早餐，再去上学。'),
    q('02', [vocabulary, sentences, reasoning], '校对两项安排：A目标“我八点去上学”，误写为 I go home at 8:00.；B目标“我四点回家”，误写为 I get up at four.。哪组修改能让两项都对应？', '先把错误的 go home at 8:00 改为 go to school at 8:00；再把错误的 get up at four 改为 go home at four.', ['把A改为 get up at 8:00；把B改为 go to school at four。', '只把A改为 go to school at four；B保留 get up at four。'], '逐项保留给定时间，只把与目标活动不符的词组换正确。', 'A应报告上学时间，B应报告回家时间；修正后各自与目标一致。'),
  ],
};

const correctPositionOffset: Record<Difficulty, number> = { basic: 0, advanced: 1, high: 2 };

function createActivity(difficulty: Difficulty, index: number, draft: Draft): Grade2Term2EnglishUnit05SupplementalActivity {
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

export const grade2Term2EnglishUnit05SupplementalActivities: Grade2Term2EnglishUnit05SupplementalActivity[] = (
  Object.entries(drafts) as Array<[Difficulty, Draft[]]>
).flatMap(([difficulty, activities]) => activities.map((activity, index) => createActivity(difficulty, index, activity)));
