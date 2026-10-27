import type { ChoiceActivityDefinition, Difficulty } from '../../content/types';

export interface Grade2Term1MathUnit07SupplementalActivity {
  difficulty: Difficulty;
  sourceUnitId: string;
  knowledgePointIds: string[];
  activity: ChoiceActivityDefinition;
}

interface ActivityDraft {
  knowledgePointIds: string[];
  prompt: string;
  answer: string;
  distractors: [string, string];
  hint: string;
  explanation: string;
}

const sourceUnitId = 'grade-2/term-1/math/unit-07';
const idPrefix = 'challenge-supplement-grade-2-term-1-math-unit-07';
const clockReadingCore = 'clock-reading-and-time-units';
const timeReasoningCore = 'time-relationships-and-application';
const hands = 'clock-hand-roles';
const fiveMinuteReading = 'clock-five-minute-reading';
const conversion = 'hour-minute-conversion';
const elapsed = 'elapsed-time-calculation';
const schedule = 'time-schedule-planning';

function draft(
  knowledgePointIds: string[],
  prompt: string,
  answer: string,
  distractors: [string, string],
  hint: string,
  explanation: string,
): ActivityDraft {
  return {
    knowledgePointIds: [...new Set([clockReadingCore, timeReasoningCore, ...knowledgePointIds])],
    prompt,
    answer,
    distractors,
    hint,
    explanation,
  };
}

const drafts: Record<Difficulty, ActivityDraft[]> = {
  basic: [
    draft([fiveMinuteReading], '分针从12走到1，走过了多少分钟？', '5分', ['1分', '10分'], '数一个相邻数字间隔。', '分针从一个数字走到下一个数字，经过5分钟。'),
    draft([fiveMinuteReading], '分针从数字4走到数字7，经过多久？', '15分', ['3分', '20分'], '先数经过几个数字间隔，再按每格5分计算。', '经过3个数字间隔，每个间隔5分钟，共15分钟。'),
    draft([fiveMinuteReading], '分针指在数字9上时，对应分钟数是？', '45分', ['9分', '50分'], '每经过一个数字，分钟数增加5。', '分针从12走到9经过9个间隔，9乘5是45分钟。'),
    draft([hands, fiveMinuteReading], '钟面为3时35分，分针应对准哪个数字？', '7', ['5', '8'], '把35分钟按每个数字代表5分钟换算。', '35分钟里有7个5分钟，分针指向数字7。'),
    draft([fiveMinuteReading], '分针走到数字2，经过多少分钟？', '10分', ['2分', '15分'], '从12开始数到数字2有两个间隔。', '两个数字间隔各是5分钟，共10分钟。'),
    draft([hands, conversion], '时针从7走到8，过了多久？', '1时', ['1分', '5时'], '时针每走过一个数字间隔表示1小时。', '时针从一个数字走到下一个数字，经过1小时。'),
    draft([hands, fiveMinuteReading], '钟面2时30分还可以怎样读？', '2时半', ['3时半', '2时整'], '分针指向6时表示半时。', '2时30分就是2时半。'),
    draft([conversion], '一刻钟换成分钟数是？', '15分', ['10分', '30分'], '一刻钟是一个小时的四分之一。', '1小时有60分钟，四分之一小时是15分钟。'),
    draft([conversion], '30分与半小时的长短关系是？', '相等', ['30分更长', '半小时更长'], '把半小时换成分钟比较。', '半小时是30分钟，两段时间相等。'),
    draft([conversion], '从1时整再过60分是哪个时刻？', '2时', ['1时半', '3时'], '60分钟等于1小时。', '从1时再过1小时，到2时。'),
    draft([hands, conversion], '分针绕钟面完整走一圈经过多久？', '1时', ['1分', '12时'], '分针走一圈时，时针也前进一个数字间隔。', '分针走一圈是60分钟，也就是1小时。'),
    draft([schedule], '3时40分描述的是哪类时间信息？', '钟面上的时间点', ['一段持续时间', '长度单位'], '想一想这个表达回答“什么时候”还是“多久”。', '3时40分表示钟面上的一个时间点。'),
    draft([fiveMinuteReading], '钟面上两个相邻数字之间有多少个小格？', '5个', ['1个', '10个'], '数一数指针从一个数字走到下一个数字经过的小格。', '相邻数字之间有5个小格。'),
    draft([hands, conversion], '分针转完一圈时，时针会移动几个数字间隔？', '1个数字间隔', ['5个数字间隔', '12个数字间隔'], '分针走一圈正好经过1小时。', '分针一圈是60分钟，也就是1小时；这段时间里时针移动一个数字间隔。'),
  ],
  advanced: [
    draft([elapsed, conversion], '活动在3时40分结束，持续30分钟，开始时刻是？', '3时10分', ['3时20分', '3时30分'], '从结束时刻往前倒退30分钟。', '40分减去30分是10分，开始时刻是3时10分。'),
    draft([elapsed, conversion], '活动从10时45分开始，持续40分钟，结束时刻是？', '11时25分', ['11时15分', '11时35分'], '先从10时45分数到11时，再继续数剩余时间。', '从10时45分到11时是15分钟，还剩25分钟，所以结束于11时25分。'),
    draft([elapsed], '4时50分再过20分钟是几时几分？', '5时10分', ['5时', '5时20分'], '先数到下一个整时，再继续数剩余分钟。', '从4时50分到5时还差10分钟，再过10分钟是5时10分。'),
    draft([conversion], '90分钟等于多少时多少分？', '1时30分', ['1时20分', '2时30分'], '先用60分钟换成1小时，再看剩下多少分。', '90分钟可以分成60分钟和30分钟，等于1时30分。'),
    draft([elapsed], '读书从3时20分开始，到4时整结束，经过多久？', '40分', ['30分', '50分'], '先数到4时整，看看还要经过多少分钟。', '从3时20分到4时整，经过40分钟。'),
    draft([elapsed], '停车从8时15分到8时45分，共停了多久？', '30分', ['20分', '40分'], '两个时刻都在8时这一小时内。', '45分减15分，停车30分钟。'),
    draft([schedule], '“活动从4时开始，持续25分钟”中的25分钟表示什么？', '活动时长', ['活动开始时刻', '活动结束时刻'], '它说明活动要持续多久。', '25分钟描述持续的时间长度，是活动时长。'),
    draft([conversion, elapsed], '比1小时少15分钟的时间是？', '45分', ['30分', '60分'], '1小时有60分钟，用60减15。', '60分钟减15分钟等于45分钟。'),
    draft([elapsed], '11时55分再过10分钟，时刻变成？', '12时5分', ['12时10分', '11时65分'], '先数到12时，再继续数剩下的分钟。', '从11时55分到12时是5分钟，还剩5分钟，所以是12时5分。'),
    draft([elapsed], '活动从2时35分开始，到3时5分结束，经过多少分钟？', '30分', ['20分', '40分'], '先数到3时，再加上3时后的5分钟。', '从2时35分到3时是25分钟，再加5分钟，共30分钟。'),
    draft([conversion], '60分钟比45分钟多多少分钟？', '15分', ['10分', '20分'], '把两个分钟数相减。', '60减45等于15，60分钟多15分钟。'),
    draft([elapsed], '7时5分开始的活动持续45分钟，结束时刻是？', '7时50分', ['7时45分', '8时5分'], '同一个小时内，把开始的分钟数和时长相加。', '5分加45分是50分，结束时刻为7时50分。'),
    draft([fiveMinuteReading, hands], '读到几时几分时，怎样确定分针所指的分钟数？', '先看分针并按5分间隔读出分钟', ['只看时针的位置', '把钟面数字直接当成分钟数'], '数字间隔表示5分钟，先判断分针走过几个间隔。', '先读分针所指的数字，再用数字乘5得到分钟数。'),
    draft([elapsed, schedule], '比较两项活动谁持续得更久，先要做什么？', '先计算经过时间再比较结束时刻', ['只比较开始时刻', '只比较钟面上的小时数'], '需要知道每项活动各持续了多久。', '分别用结束时刻和开始时刻求出经过时间，再比较时长。'),
  ],
  high: [
    draft([elapsed, schedule], '活动从8时40分开始，持续35分钟，结束时刻是？', '9时15分', ['9时5分', '9时25分'], '先数到9时，再继续数剩余分钟。', '从8时40分到9时是20分钟，还剩15分钟，结束于9时15分。'),
    draft([elapsed, schedule], '活动甲在2时30分结束，活动乙从2时30分开始，两项活动的时间关系是？', '两项活动首尾相接，没有重叠', ['两项活动重叠5分钟', '两项活动之间间隔30分钟'], '比较前一项的结束时刻和后一项的开始时刻。', '乙在甲结束的同一时刻开始，两项活动首尾相接，没有重叠。'),
    draft([elapsed, schedule], '活动从10时50分开始，持续25分钟，结束时刻是？', '11时15分', ['11时5分', '11时25分'], '从10时50分先数到11时。', '到11时用了10分钟，还剩15分钟，所以结束于11时15分。'),
    draft([elapsed, schedule], '一项活动4时30分结束，下一项4时25分开始，发生了什么？', '重叠5分钟', ['间隔5分钟', '两项活动首尾相接'], '比较后一项的开始时间和前一项的结束时间。', '4时25分比4时30分早5分钟，两项活动重叠5分钟。'),
    draft([elapsed], '活动从9时15分开始，到10时5分结束，经过多久？', '50分', ['40分', '60分'], '先数到10时，再加上10时后的5分钟。', '从9时15分到10时是45分钟，再加5分钟，共50分钟。'),
    draft([elapsed], '晨读从8时20分开始，到9时整结束，持续多久？', '40分', ['30分', '50分'], '从8时20分数到9时整。', '60分钟减去已经过去的20分钟，经过40分钟。'),
    draft([elapsed, schedule], '活动从2时40分开始，持续30分钟，结束时刻是？', '3时10分', ['3时', '3时20分'], '从2时40分先数到3时。', '到3时用了20分钟，还剩10分钟，结束于3时10分。'),
    draft([elapsed, schedule], '活动从11时45分开始，12时5分结束，经过多久？', '20分', ['10分', '30分'], '先数到12时，再继续数到12时5分。', '从11时45分到12时是15分钟，再加5分钟，共20分钟。'),
    draft([conversion], '2小时合起来是多少分钟？', '120分', ['100分', '90分'], '每小时有60分钟，算两个60。', '2个60分钟是120分钟。'),
    draft([elapsed], '6时55分再过15分钟，钟面是？', '7时10分', ['7时5分', '7时15分'], '先数到7时，再加上剩下的分钟。', '从6时55分到7时是5分钟，还剩10分钟，所以是7时10分。'),
    draft([elapsed, schedule], '活动甲用20分钟，活动乙用15分钟，两项顺次进行共用多久？', '35分', ['25分', '40分'], '顺次进行时，把两段时长相加。', '20分钟加15分钟等于35分钟。'),
    draft([schedule], '一张清楚的活动安排表至少要记录哪些信息？', '记录开始时刻、持续时间和结束时刻', ['只写活动名称和地点', '只写“上午”或“下午”'], '读者要能看出什么时候开始、持续多久和什么时候结束。', '开始时刻、持续时间和结束时刻能让活动安排完整清楚。'),
    draft([elapsed, schedule], '活动甲5时10分结束，活动乙5时5分开始，时间上有什么问题？', '后一项活动开始早于前一项结束', ['两项活动之间间隔5分钟', '两项活动正好首尾相接'], '按时间先后比较5时5分和5时10分。', '乙开始时甲还没有结束，因此后一项活动开始早于前一项结束。'),
    draft([elapsed, schedule], '发现时间表中的两项活动重叠，怎样调整更合适？', '先核对时间是否重叠，再调整其中一项', ['把两项活动都缩短到1分钟', '删掉开始和结束时刻'], '保留活动内容，商量修改其中一项的时段。', '先确认重叠情况，再合理调整其中一项的时间安排。'),
  ],
};

export const grade2Term1MathUnit07SupplementalActivities: Grade2Term1MathUnit07SupplementalActivity[] = Object.entries(drafts).flatMap(([difficulty, items]) => (
  items.map((item, index) => {
    const correctOptionIndex = ((index * 2 + 1) % 3) as 0 | 1 | 2;
    const options = [...item.distractors];
    options.splice(correctOptionIndex, 0, item.answer);
    return {
      difficulty: difficulty as Difficulty,
      sourceUnitId,
      knowledgePointIds: item.knowledgePointIds,
      activity: {
        id: `${idPrefix}-${difficulty}-${String(index + 1).padStart(2, '0')}`,
        kind: 'choice' as const,
        prompt: item.prompt,
        options: options.map((label, optionIndex) => ({ id: `option-${optionIndex + 1}`, label })),
        correctOptionId: `option-${correctOptionIndex + 1}`,
        hint: item.hint,
        explanation: item.explanation,
      },
    };
  })
));
