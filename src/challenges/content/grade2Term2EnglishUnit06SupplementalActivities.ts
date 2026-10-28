import type { ChoiceActivityDefinition, Difficulty } from '../../content/types';

export type Grade2Term2EnglishUnit06KnowledgePointId =
  | 'weekday-vocabulary-and-sequence'
  | 'day-question-and-answer'
  | 'weekday-activity-sentences'
  | 'week-plan-clue-and-reasoning';

export interface Grade2Term2EnglishUnit06SupplementalActivity {
  difficulty: Difficulty;
  sourceUnitId: string;
  sourceTaskId: string;
  knowledgePointIds: Grade2Term2EnglishUnit06KnowledgePointId[];
  activity: ChoiceActivityDefinition;
}

interface Draft {
  sourceTaskNumber: '01' | '02';
  knowledgePointIds: Grade2Term2EnglishUnit06KnowledgePointId[];
  prompt: string;
  answer: string;
  distractors: [string, string];
  hint: string;
  explanation: string;
}

const sourceUnitId = 'grade-2/term-2/english/unit-06';
const idPrefix = 'challenge-supplement-grade-2-term-2-english-unit-06';
const vocabulary: Grade2Term2EnglishUnit06KnowledgePointId = 'weekday-vocabulary-and-sequence';
const questions: Grade2Term2EnglishUnit06KnowledgePointId = 'day-question-and-answer';
const sentences: Grade2Term2EnglishUnit06KnowledgePointId = 'weekday-activity-sentences';
const reasoning: Grade2Term2EnglishUnit06KnowledgePointId = 'week-plan-clue-and-reasoning';

const q = (
  sourceTaskNumber: Draft['sourceTaskNumber'],
  knowledgePointIds: Grade2Term2EnglishUnit06KnowledgePointId[],
  prompt: string,
  answer: string,
  distractors: [string, string],
  hint: string,
  explanation: string,
): Draft => ({ sourceTaskNumber, knowledgePointIds, prompt, answer, distractors, hint, explanation });

const drafts: Record<Difficulty, Draft[]> = {
  basic: [
    q('01', [vocabulary, reasoning], '周历上要按一周先后放好 Monday、Wednesday、Sunday，哪一行正确？', 'Monday → Wednesday → Sunday', ['Wednesday → Monday → Sunday', 'Sunday → Wednesday → Monday'], '一周从 Monday 开始，按星期顺序逐张检查。', 'Monday 先于 Wednesday，Wednesday 先于 Sunday。'),
    q('01', [vocabulary, reasoning], '星期卡的顺序写着 Monday、Tuesday、___、Thursday。空格里应放哪一天？', 'Wednesday', ['Friday', 'Sunday'], '在 Tuesday 后面数一天，再看它是否排在 Thursday 前。', 'Tuesday 后面是 Wednesday，接着才是 Thursday。'),
    q('01', [questions, sentences], '日历标记为星期日。哪组对话先询问今天星期几，再准确回答？', "A: What day is it today? B: It's Sunday today.", ["A: It's Sunday today. B: What day is it today?", "A: What day is it today? B: It's Monday today."], '问句应先出现，回答里的星期要和日历标记相同。', "What day is it today? 询问星期；It's Sunday today. 报告星期日。"),
    q('01', [questions, sentences], '三句中哪句是在报告“今天是星期六”，不是在提出问题？', "It's Saturday today.", ['What day is it today?', "It's Sunday today."], '报告句说出一个星期名称；问句会提出问题。', "It's Saturday today. 报告今天是星期六。"),
    q('01', [sentences, reasoning], '日历卡写“星期三”，同伴却写“It\'s Thursday today.”。哪项改法与卡片相符？', "把 Thursday 改为 Wednesday：It's Wednesday today.", ["把 Thursday 改为 Friday：It's Friday today.", "把 Wednesday 改为 Monday：It's Monday today."], '保留 It’s … today. 的句子结构，把不符的星期改成卡片上的星期。', "日历是 Wednesday，所以报时句里的星期也应改成 Wednesday。"),
    q('01', [vocabulary, reasoning], '周一到周五的卡片已经排完；紧接在 Friday 后、周末开始的星期卡是哪张？', 'Saturday', ['Thursday', 'Monday'], '先找出 Friday 后面的相邻日期，再核对它属于周末。', 'Saturday 接在 Friday 后面，是周末的第一天。'),
    q('01', [sentences, reasoning], '在“Let\'s play football on Sunday.”里，on Sunday 告诉我们什么？', '活动安排在星期日。', ['今天正在踢足球。', '句子在询问星期几。'], '看 on 后面接的星期名称，它说明活动安排在哪一天。', 'on Sunday 表示活动安排在星期日。'),
    q('02', [vocabulary, reasoning], '哪一行把 Tuesday、Thursday、Saturday 三张星期卡按先后顺序排列？', 'Tuesday → Thursday → Saturday', ['Thursday → Tuesday → Saturday', 'Saturday → Thursday → Tuesday'], '从 Tuesday 开始，沿一周顺序向后检查每张卡。', 'Tuesday 先于 Thursday，Thursday 先于 Saturday。'),
    q('02', [vocabulary], '“星期五”对应哪张英文星期卡？', 'Friday', ['Thursday', 'Sunday'], '注意 Friday 排在 Thursday 后、Saturday 前。', 'Friday 表示星期五。'),
    q('02', [questions, sentences], '今日卡是星期三。两张卡准备分别放在“问句”和“回答”栏，哪种标法正确？', "问句：What day is it today?；回答：It's Wednesday today.", ["问句：It's Wednesday today.；回答：What day is it today?", "问句：What day is it today?；回答：It's Sunday today."], '问句询问星期；回答句报告同一个星期。', "What day is it today? 是问句；It's Wednesday today. 是回答。"),
    q('02', [sentences, reasoning], '句子“Let\'s play football ___ Saturday.”要表达星期六安排，空格应填哪个词？', 'on', ['in', 'at'], '回想星期名称前使用哪个介词表示活动安排在星期几。', '星期名称前用 on：Let\'s play football on Saturday.'),
    q('02', [vocabulary, reasoning], '把 Monday 到 Sunday 的七张英文词卡排成完整的一周，哪一行正确？', 'Monday → Tuesday → Wednesday → Thursday → Friday → Saturday → Sunday', ['Monday → Wednesday → Tuesday → Friday → Thursday → Sunday → Saturday', 'Sunday → Saturday → Friday → Thursday → Wednesday → Tuesday → Monday'], '先排好 Monday 到 Friday，再接 Saturday 和 Sunday。', '正确顺序是 Monday、Tuesday、Wednesday、Thursday、Friday、Saturday、Sunday。'),
    q('02', [vocabulary, reasoning], '从 Monday、Tuesday、Saturday 三张卡里，哪两张都表示星期一到星期五中的日子？', 'Monday and Tuesday', ['Tuesday and Saturday', 'Monday and Saturday'], '星期六属于周末；另外两张都在星期一到星期五的范围内。', 'Monday 和 Tuesday 都在星期一到星期五的范围内；Saturday 属于周末。'),
    q('02', [sentences, reasoning], '周历显示足球安排在“星期二之后、星期四之前”。哪句活动安排符合这条线索？', "Let's play football on Wednesday.", ["Let's play football on Monday.", "Let's play football on Saturday."], '先找出夹在 Tuesday 和 Thursday 中间的星期，再读活动句。', 'Wednesday 排在 Tuesday 之后、Thursday 之前，活动日期相符。'),
  ],
  advanced: [
    q('01', [vocabulary, reasoning], '四张周历卡 Saturday、Monday、Thursday、Wednesday 要按先后整理，哪行顺序正确？', 'Monday → Wednesday → Thursday → Saturday', ['Wednesday → Monday → Saturday → Thursday', 'Saturday → Thursday → Wednesday → Monday'], '从一周较早的日期开始，再逐张核对相邻位置。', 'Monday、Wednesday、Thursday 排在 Saturday 前，且这三天顺序正确。'),
    q('01', [vocabulary, reasoning], '从 Tuesday 起向后数两天（不把 Tuesday 算进去），落在哪个星期名称？', 'Thursday', ['Wednesday', 'Friday'], '先数 Wednesday 一天，再数下一天。', 'Tuesday 后一天是 Wednesday，第二天是 Thursday。'),
    q('01', [questions, sentences], '今天的日期卡是 Tuesday。哪组对话先提出星期问句，再报告卡片上的日期？', "A: What day is it today? B: It's Tuesday today.", ["A: It's Tuesday today. B: What day is it today?", "A: What day is it today? B: It's Sunday today."], '检查 A 是否询问星期，并核对 B 的星期名称。', "What day is it today? 询问星期；It's Tuesday today. 与卡片相符。"),
    q('01', [questions, sentences], '采访卡上有“What day is it today?”和“It\'s Friday today.”。哪项正确说明两句的用途？', '前一句询问今天星期几；后一句报告今天是星期五。', ['前一句报告今天是星期几；后一句询问星期。', '两句都是询问星期几的问句。'], '逐句判断是否提出问题，再看另一句是否报告了星期。', 'What day is it today? 是问句；It’s Friday today. 是报告句。'),
    q('01', [sentences, reasoning], '活动要安排在 Tuesday 之后、Friday 之前。哪句与这个星期线索相符？', "Let's play football on Thursday.", ["Let's play football on Monday.", "Let's play football on Saturday."], '先找出落在 Tuesday 和 Friday 之间的星期，再核对活动句。', 'Thursday 在 Tuesday 之后、Friday 之前；活动句把星期放在 on 后。'),
    q('01', [sentences, reasoning], '同伴写了“Let\'s play football in Sunday.”，只修正星期前的介词后，哪句正确？', "Let's play football on Sunday.", ["Let's play football at Sunday.", "Let's play football Sunday on."], '保留 Let\'s play football 和 Sunday，只改介词。', '表示星期几的活动安排时，用 on Sunday。'),
    q('01', [vocabulary, reasoning], '哪组词卡只包含星期一到星期五的星期名称？', 'Monday, Tuesday, Wednesday, Thursday, Friday', ['Monday, Tuesday, Saturday, Sunday, Friday', 'Wednesday, Thursday, Friday, Saturday, Sunday'], '先排除 Saturday 和 Sunday，再核对剩下的星期卡。', 'Monday 到 Friday 是星期一至星期五；Saturday、Sunday 是周末。'),
    q('02', [vocabulary, reasoning], '星期序列中，Thursday 前面紧邻哪一天？', 'Wednesday', ['Tuesday', 'Saturday'], '从 Wednesday 接着往后数，检查 Thursday 的前一张卡。', 'Wednesday 紧挨在 Thursday 前面。'),
    q('02', [questions, sentences, reasoning], '两条采访记录是：A问“今天星期几？”并答“星期日”；B问同样的问题并答“星期二”。哪组英文问答按顺序都匹配？', "A: What day is it today? B: It's Sunday today.；A: What day is it today? B: It's Tuesday today.", ["A: What day is it today? B: It's Tuesday today.；A: What day is it today? B: It's Sunday today.", "A: It's Sunday today. B: What day is it today?；A: It's Tuesday today. B: What day is it today."], '两组都要先提问；再分别对照星期日和星期二的记录。', '第一组报告 Sunday，第二组报告 Tuesday，顺序与两条记录相同。'),
    q('02', [sentences, reasoning], '词卡 Let\'s、play、football、on、Thursday 要排成活动安排，哪句自然完整？', "Let's play football on Thursday.", ["Let's football play on Thursday.", "Let's play on football Thursday."], '用完整的 Let\'s play football 句型，并把 on 放在星期名称前。', '正确语序是 Let’s play football on Thursday.，on 位于 Thursday 前。'),
    q('02', [vocabulary, reasoning], '星期路线从 Tuesday 出发，到 Saturday 之前，中间依序经过哪三天？', 'Wednesday → Thursday → Friday', ['Thursday → Wednesday → Friday', 'Wednesday → Friday → Thursday'], '从 Tuesday 的下一天开始，按顺序数到 Saturday 前一天。', 'Tuesday 与 Saturday 之间依次是 Wednesday、Thursday、Friday。'),
    q('02', [questions, sentences, reasoning], '今日卡是 Monday，活动卡安排在 Sunday。哪项英文记录分别说清今天和活动日期？', "It's Monday today.；Let's play football on Sunday.", ["It's Sunday today.；Let's play football on Monday.", "What day is it today?；Let's play football on Sunday."], 'today 句报告今天；on Sunday 说明活动安排的日期。', "It's Monday today. 报告今天；Let's play football on Sunday. 安排星期日活动"),
    q('02', [questions, sentences, reasoning], '今日卡是 Thursday，问句卡是“What day is it today?”。哪句回答既保留了问答功能，也符合日期卡？', "It's Thursday today.", ["It's Tuesday today.", 'What day is it today?'], '回答要报告星期，而不是重复问句；日期要和卡片一致。', "It's Thursday today. 回答了星期问句并匹配今日卡。"),
    q('02', [sentences, reasoning], '星期计划把 Thursday 放在 Wednesday 后、Saturday 前。哪条记录的星期顺序和活动表达都成立？', "Wednesday → Thursday → Saturday；Let's play football on Thursday.", ['Wednesday → Saturday → Thursday；Let\'s play football on Sunday.', "Thursday → Wednesday → Saturday；Let's play football on Thursday."], '检查三个星期的先后，再确认活动句中的日期是计划中的一天。', 'Wednesday、Thursday、Saturday 的顺序正确，活动也安排在 Thursday。'),
  ],
  high: [
    q('01', [vocabulary, reasoning], '计划员拿到 Sunday、Tuesday、Friday、Monday 四张卡，哪行按一周先后排好？', 'Monday → Tuesday → Friday → Sunday', ['Tuesday → Monday → Sunday → Friday', 'Sunday → Friday → Tuesday → Monday'], '先放一周较早的星期，再沿着周序往后排列。', 'Monday 在 Tuesday 前，Friday 在 Sunday 前。'),
    q('01', [questions, sentences, reasoning], '今日卡是 Saturday；再往后一天是 Sunday。哪项先问星期、再报告今日卡，并标出后一天？', "A: What day is it today? B: It's Saturday today.；后一天：Sunday", ["A: What day is it today? B: It's Sunday today.；后一天：Saturday", "A: It's Saturday today. B: What day is it today?；后一天：Sunday"], '先用问句和回答核对 Saturday，再按星期顺序找下一天。', '问答报告今天是 Saturday；Saturday 后面是 Sunday。'),
    q('01', [vocabulary, reasoning], '周历上的计划要求选出“周末第一天”与“工作日最后一天”，哪对日期符合顺序？', 'Saturday；Friday', ['Sunday；Thursday', 'Monday；Saturday'], '先辨认周末从哪一天开始，再找出 Friday 所在的工作日末尾位置。', 'Saturday 是周末第一天；Friday 是星期一到星期五中的最后一天。'),
    q('01', [questions, sentences, reasoning], '今日卡是 Friday，活动卡是 Thursday。哪项分别正确报告今天并安排活动？', "It's Friday today.；Let's play football on Thursday.", ["It's Thursday today.；Let's play football on Friday.", "What day is it today?；Let's play football on Thursday."], 'today 句报告 Friday；活动句则应保留 Thursday 这张活动卡。', "It's Friday today. 报告今天；Let's play football on Thursday. 保留活动日期。"),
    q('01', [vocabulary, reasoning], '哪组分类同时满足“工作日五张”和“周末两张”的数量与星期范围？', '工作日：Monday、Tuesday、Wednesday、Thursday、Friday；周末：Saturday、Sunday', ['工作日：Monday、Tuesday、Wednesday、Saturday、Sunday；周末：Thursday、Friday', '工作日：Tuesday、Thursday、Saturday、Sunday；周末：Monday、Wednesday、Friday'], '分别数一数两类卡片，并核对 Saturday、Sunday 是否放在周末。', '星期一至星期五是工作日，Saturday 和 Sunday 是周末，共五张和两张。'),
    q('01', [sentences, reasoning], '安排表写“星期二踢足球；星期六踢足球”。哪组句子两处日期和 on 的用法都正确？', "Let's play football on Tuesday.；Let's play football on Saturday.", ["Let's play football in Tuesday.；Let's play football on Saturday.", "Let's play football on Wednesday.；Let's play football on Friday."], '两句分别核对活动日期，再检查星期名称前的介词。', '两条计划对应 Tuesday 和 Saturday，星期名称前都使用 on。'),
    q('01', [vocabulary, questions, sentences, reasoning], '计划员要完成三步：辨认“星期四”，回答“今天星期几？”的问句，再安排星期日踢球。哪组记录三步都正确？', "星期四：Thursday；问答：What day is it today? — It's Thursday today.；活动：Let's play football on Sunday.", ["星期四：Wednesday；问答：What day is it today? — It's Thursday today.；活动：Let's play football on Sunday.", "星期四：Thursday；问答：It's Thursday today. — What day is it today?；活动：Let's play football on Saturday."], '依次核对星期词义、问答次序和活动日期。', 'Thursday 表示星期四；问句先出现并由 It’s Thursday today. 回答；活动安排为 on Sunday。'),
    q('02', [vocabulary, reasoning], '按一周顺序把 Tuesday、Thursday、Saturday、Sunday 放在路线图上，哪条路线正确？', 'Tuesday → Thursday → Saturday → Sunday', ['Thursday → Tuesday → Sunday → Saturday', 'Sunday → Saturday → Thursday → Tuesday'], '先排好周中日期，再接上连续的周末两天。', 'Tuesday、Thursday 在前；Saturday 接着是 Sunday。'),
    q('02', [vocabulary, sentences, reasoning], '今日卡是 Wednesday；活动安排在两天后。哪组顺序和两句记录都正确？', "Wednesday → Thursday → Friday；It's Wednesday today.；Let's play football on Friday.", ["Wednesday → Thursday → Saturday；It's Wednesday today.；Let's play football on Saturday.", "Wednesday → Friday → Thursday；It's Wednesday today.；Let's play football on Friday."], '从 Wednesday 数两天确定活动日，再分别核对 today 报告句和活动句。', 'Wednesday 后两天是 Friday；today 句报告 Wednesday，活动句安排 Friday。'),
    q('02', [sentences, reasoning], '检查句子“Let\'s play football on Sunday.”，哪项说明同时符合星期卡和句子用途？', 'Sunday 是活动安排的日期；这句话不是在报告今天星期几。', ['Sunday 表示今天的日期；这句话是在回答星期问句。', 'on Sunday 表示活动安排在 Monday。'], '分清活动日期和 today 报告句中的日期。', 'on Sunday 说明踢足球安排在星期日；句子提出活动计划。'),
    q('02', [vocabulary, reasoning], 'Today is Friday. 按周序数到第三天（不把 Friday 算入），应落在哪一天？', 'Monday', ['Sunday', 'Tuesday'], 'Friday 后面依次是 Saturday、Sunday、Monday。', '从 Saturday 开始数三天，第三天是 Monday。'),
    q('02', [vocabulary, reasoning], 'Thursday 前后紧挨着的星期名称依次是哪两天？', 'Wednesday → Thursday → Friday', ['Tuesday → Thursday → Saturday', 'Friday → Thursday → Wednesday'], '先找 Thursday 的前一天和后一天，再按一周顺序排列。', 'Wednesday 紧挨在 Thursday 前，Friday 紧挨在 Thursday 后。'),
    q('02', [vocabulary, sentences, reasoning], '足球活动分别安排在 Friday 和 Sunday。哪项正确区分这两个日期所在的类别？', 'Friday 是星期一到星期五中的工作日；Sunday 是周末。', ['Friday 是周末；Sunday 是星期一到星期五中的工作日。', 'Friday 和 Sunday 都是星期一到星期五中的工作日。'], '核对 Friday、Sunday 在一周中的位置，再判断各自类别。', 'Friday 属于星期一至星期五；Sunday 属于周末。'),
    q('02', [vocabulary, questions, sentences, reasoning], '核对三项周历记录：工作日范围、星期问答和周末活动。哪组全部准确？', 'Monday–Friday 是工作日；What day is it today? — It’s Saturday today.；Let’s play football on Sunday.', ['Monday–Sunday 都是周末；What day is it today? — It’s Saturday today.；Let’s play football on Sunday.', 'Monday–Friday 是工作日；It’s Saturday today. — What day is it today?；Let’s play football in Sunday.'], '分别检查星期分类、问答顺序和星期前的介词。', 'Monday 到 Friday 是工作日；问句先问，回答是 Saturday；活动安排用 on Sunday。'),
  ],
};

const correctPositionOffset: Record<Difficulty, number> = { basic: 0, advanced: 1, high: 2 };

function createActivity(difficulty: Difficulty, index: number, draft: Draft): Grade2Term2EnglishUnit06SupplementalActivity {
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

export const grade2Term2EnglishUnit06SupplementalActivities: Grade2Term2EnglishUnit06SupplementalActivity[] = (
  Object.entries(drafts) as Array<[Difficulty, Draft[]]>
).flatMap(([difficulty, activities]) => activities.map((activity, index) => createActivity(difficulty, index, activity)));
