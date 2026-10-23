import type { ChoiceActivityDefinition, Difficulty } from '../../content/types';

export interface Grade1MathUnit07SupplementalActivity {
  difficulty: Difficulty;
  sourceUnitId: string;
  knowledgePointIds: string[];
  activity: ChoiceActivityDefinition;
}

interface ActivityDraft {
  knowledgePointIds: string[];
  prompt: string;
  options: [string, string, string];
  correctOptionIndex: 0 | 1 | 2;
  hint: string;
  explanation: string;
}

const sourceUnitId = 'grade-1/term-1/math/unit-07';
const idPrefix = 'challenge-supplement-grade-1-term-1-math-unit-07';
const whole = 'clock-whole-hour-reading';
const half = 'clock-half-hour-reading';
const hands = 'clock-hand-roles';

const drafts: Record<Difficulty, ActivityDraft[]> = {
  basic: [
    { knowledgePointIds: [whole, hands], prompt: '钟面上，短针指着 4，长针指着 12。这个时刻怎样读？', options: ['4 时整', '4 时半', '5 时整'], correctOptionIndex: 0, hint: '长针先帮你判断是不是整时。', explanation: '长针指着 12 表示整时，再看短针指着 4，所以是 4 时整。' },
    { knowledgePointIds: [half, hands], prompt: '一个钟面上，时针在 6 和 7 之间，分针指着 6。表示几时半？', options: ['6 时半', '7 时半', '6 时整'], correctOptionIndex: 0, hint: '先看分针指向，再看时针走过了哪个数。', explanation: '分针指向 6 表示半时；时针还在 6 和 7 之间，所以是 6 时半。' },
    { knowledgePointIds: [hands], prompt: '钟面上较短的一根指针叫什么？', options: ['时针', '分针', '秒针'], correctOptionIndex: 0, hint: '读几时要看较短的那根指针。', explanation: '较短的指针是时针，较长的指针是分针。' },
    { knowledgePointIds: [whole, hands], prompt: '短针指向 9，长针指向 12。钟面表示什么时刻？', options: ['9 时整', '9 时半', '12 时整'], correctOptionIndex: 0, hint: '先用长针判断整时或半时。', explanation: '长针指向 12 是整时，短针指向 9，所以是 9 时整。' },
    { knowledgePointIds: [half, hands], prompt: '读出几时半时，分针应该指向钟面上的哪个数？', options: ['6', '12', '3'], correctOptionIndex: 0, hint: '半时的长针走到钟面的另一侧。', explanation: '几时半时，分针指向 6。' },
    { knowledgePointIds: [whole, hands], prompt: '要读准一个整时时刻，先检查哪项指针信息？', options: ['分针是否指向 12', '时针是否指向 6', '分针是否指向 3'], correctOptionIndex: 0, hint: '整时和半时的分针位置不同。', explanation: '分针指向 12 表示整时，然后再看时针读出小时。' },
    { knowledgePointIds: [half, hands], prompt: '时针在 8 和 9 之间、分针指向 6，这个钟面表示什么？', options: ['8 时半', '9 时半', '8 时整'], correctOptionIndex: 0, hint: '时针还没有走到 9。', explanation: '分针指向 6 表示半时，时针还在 8 和 9 之间，所以是 8 时半。' },
    { knowledgePointIds: [whole, hands], prompt: '早上到校时，时针指着 7，分针指着 12。可以怎样读这个钟面？', options: ['7 时整', '7 时半', '12 时整'], correctOptionIndex: 0, hint: '先看分针指在哪里。', explanation: '分针指向 12 是整时，时针指向 7，所以是 7 时整。' },
    { knowledgePointIds: [hands], prompt: '钟面上较长的一根指针叫什么？', options: ['分针', '时针', '秒针'], correctOptionIndex: 0, hint: '它和较短的时针配合读出时刻。', explanation: '较长的指针是分针，较短的指针是时针。' },
    { knowledgePointIds: [half, hands], prompt: '钟面表示 10 时半时，分针指向哪里？', options: ['6', '10', '12'], correctOptionIndex: 0, hint: '不论是几时半，分针的位置相同。', explanation: '10 时半属于半时，分针指向 6。' },
    { knowledgePointIds: [whole, hands], prompt: '短针指向 11，长针指向 12。时刻是几时？', options: ['11 时整', '12 时整', '11 时半'], correctOptionIndex: 0, hint: '长针指着 12，再读短针指向的数。', explanation: '这是整时，短针指向 11，所以读作 11 时整。' },
    { knowledgePointIds: [whole, hands], prompt: '午餐前，钟面上的时针指着 12，分针也指着 12。这个时刻是？', options: ['12 时整', '12 时半', '6 时整'], correctOptionIndex: 0, hint: '两根指针都指着 12。', explanation: '分针指向 12 是整时，时针也指向 12，因此是 12 时整。' },
    { knowledgePointIds: [half, hands], prompt: '一根短针走到 10 和 11 之间，长针指着 6。现在是几时半？', options: ['10 时半', '11 时半', '10 时整'], correctOptionIndex: 0, hint: '半时的时针停在前后两个数之间。', explanation: '时针在 10 和 11 之间，分针指向 6，所以读作 10 时半。' },
    { knowledgePointIds: [whole, half, hands], prompt: '下面哪个钟面表示半时？', options: ['时针在 2 和 3 之间，分针指向 6', '时针指向 2，分针指向 12', '时针指向 3，分针指向 12'], correctOptionIndex: 0, hint: '半时要同时看分针和时针的位置。', explanation: '分针指向 6，时针在相邻两个数之间，表示半时。' },
    { knowledgePointIds: [whole, hands], prompt: '钟面上时针指着 5，分针指着 12。应读作什么？', options: ['5 时整', '5 时半', '12 时整'], correctOptionIndex: 0, hint: '分针指着 12 时是整时。', explanation: '分针指向 12 表示整时，时针指向 5，读作 5 时整。' },
  ],
  advanced: [
    { knowledgePointIds: [half, hands], prompt: '短针刚走过 5，还在 5 和 6 之间；长针指着 6。正确读法是？', options: ['5 时半', '6 时半', '5 时整'], correctOptionIndex: 0, hint: '短针还没走到 6。', explanation: '分针指向 6 表示半时，时针刚走过 5，所以是 5 时半。' },
    { knowledgePointIds: [whole, half, hands], prompt: '同学把“时针在 2 和 3 之间、分针指向 6”读成 3 时半。应该怎样改？', options: ['改成 2 时半', '改成 3 时整', '改成 6 时半'], correctOptionIndex: 0, hint: '半时的时针指在前一个数和后一个数之间。', explanation: '时针还在 2 和 3 之间，分针指向 6，应读作 2 时半。' },
    { knowledgePointIds: [whole, hands], prompt: '一张钟面卡上，分针指着 12，时针指着 8。卡片应标成？', options: ['8 时整', '8 时半', '12 时整'], correctOptionIndex: 0, hint: '分针指向 12 是整时。', explanation: '分针指向 12 表示整时，时针指向 8，因此标作 8 时整。' },
    { knowledgePointIds: [half, hands], prompt: '钟面表示 11 时半，时针应该在哪两个数之间？', options: ['11 和 12 之间', '10 和 11 之间', '指向 12'], correctOptionIndex: 0, hint: '半时的时针还没有到下一个数。', explanation: '11 时半时，时针在 11 和 12 之间。' },
    { knowledgePointIds: [whole, half, hands], prompt: '哪组指针位置表示 6 时整？', options: ['时针指向 6，分针指向 12', '时针在 6 和 7 之间，分针指向 6', '时针指向 12，分针指向 6'], correctOptionIndex: 0, hint: '先确认整时的分针位置。', explanation: '整时的分针指向 12，时针指向 6，表示 6 时整。' },
    { knowledgePointIds: [whole, half], prompt: '一个钟面的分针指向 6。只根据这条信息，可以确定什么？', options: ['这是半时，还要看时针读几时', '这是 6 时整', '这是 12 时整'], correctOptionIndex: 0, hint: '分针帮助判断整时或半时，时针告诉你小时数。', explanation: '分针指向 6 表示半时，但还要看时针所在的位置才能读完整时刻。' },
    { knowledgePointIds: [hands], prompt: '伙伴读钟面时只盯着长针看。要读出“几时”，还需要重点观察哪根？', options: ['时针', '分针', '秒针'], correctOptionIndex: 0, hint: '短针告诉我们小时数。', explanation: '分针可以判断整时或半时，还要看时针才能知道是几时。' },
    { knowledgePointIds: [whole, half, hands], prompt: '读钟面的合理顺序是哪一项？', options: ['先看分针是否指向 12 或 6，再看时针位置', '只看时针长度，不看它指向哪里', '先把钟面上的数字相加'], correctOptionIndex: 0, hint: '结合两根指针，不能只看其中一根。', explanation: '先根据分针判断整时或半时，再结合时针位置读出时刻。' },
    { knowledgePointIds: [half, hands], prompt: '时针在 3 和 4 之间，分针指向 6。下面哪句话说得对？', options: ['现在是 3 时半', '现在是 4 时半', '现在是 3 时整'], correctOptionIndex: 0, hint: '时针所在的前一个数是小时数。', explanation: '分针指向 6 是半时，时针还在 3 和 4 之间，因此是 3 时半。' },
    { knowledgePointIds: [whole, half], prompt: '要找出 9 时半的钟面，分针和时针应分别满足什么？', options: ['分针指向 6，时针在 9 和 10 之间', '分针指向 12，时针指向 9', '分针指向 9，时针指向 6'], correctOptionIndex: 0, hint: '整时和半时的分针位置不同。', explanation: '9 时半时分针指向 6，时针在 9 和 10 之间。' },
    { knowledgePointIds: [whole, half, hands], prompt: '同伴说“分针指向 6，所以是 6 时”。怎样指出他的错误？', options: ['6 是分针所在位置；还要看时针并读作半时', '分针指向 6 一定是 6 时整', '不用看时针也能知道是 12 时'], correctOptionIndex: 0, hint: '别把分针指着的数字当成小时数。', explanation: '分针指向 6 表示半时；小时数要看时针所在的两个数之间。' },
    { knowledgePointIds: [whole, hands], prompt: '校园钟表显示短针指向 10、长针指向 12。哪张文字卡正确？', options: ['10 时整', '10 时半', '12 时半'], correctOptionIndex: 0, hint: '长针指向 12 时，先判断为整时。', explanation: '长针指向 12 是整时，短针指向 10，读作 10 时整。' },
    { knowledgePointIds: [half, hands], prompt: '看到短针走过 7、还没到 8，长针正对着 6。读时要选？', options: ['7 时半', '8 时半', '7 时整'], correctOptionIndex: 0, hint: '短针经过的数是小时数。', explanation: '时针刚走过 7，分针指向 6，钟面表示 7 时半。' },
    { knowledgePointIds: [whole, half, hands], prompt: '哪一句能同时说明整时和半时的区别？', options: ['分针指向 12 是整时，指向 6 是半时', '时针指向 12 就都是半时', '分针指向哪个数，小时数就是几'], correctOptionIndex: 0, hint: '比较两种时刻的分针位置。', explanation: '整时的分针指向 12，半时的分针指向 6；还需看时针读小时。' },
    { knowledgePointIds: [whole, half], prompt: '小组要找“4 时整”的钟面，哪种时针和分针位置合适？', options: ['时针在 4，分针在 12', '时针在 4 和 5 之间，分针在 6', '时针在 5，分针在 6'], correctOptionIndex: 0, hint: '整时的时针指着小时数。', explanation: '4 时整时，时针指向 4，分针指向 12。' },
  ],
  high: [
    { knowledgePointIds: [whole, half, hands], prompt: '伙伴把“时针在 8 和 9 之间、分针指向 6”读成 9 时半。检查时应先看什么？', options: ['时针还在 8 和 9 之间，所以是 8 时半', '分针指向 6，所以是 6 时整', '只看 9 这个数，所以是 9 时整'], correctOptionIndex: 0, hint: '先判断分针表示整时还是半时，再看时针经过了哪个数。', explanation: '分针指向 6 表示半时，时针还未到 9，因此应读作 8 时半。' },
    { knowledgePointIds: [whole, half, hands], prompt: '选出能把 2 时整、2 时半、3 时整按先后顺序排好的卡片。', options: ['2 时整 → 2 时半 → 3 时整', '2 时半 → 2 时整 → 3 时整', '3 时整 → 2 时半 → 2 时整'], correctOptionIndex: 0, hint: '先比较小时，再比较同一小时里的整时和半时。', explanation: '2 时整先于 2 时半，接着才到 3 时整。' },
    { knowledgePointIds: [whole, half], prompt: '一个钟面分针指向 6。要进一步判断是 4 时半还是 5 时半，还要观察什么？', options: ['时针是在 4 和 5 之间，还是在 5 和 6 之间', '钟面上数字的颜色', '分针有多长'], correctOptionIndex: 0, hint: '半时相同的分针位置，需要由时针区分小时。', explanation: '时针在 4 和 5 之间是 4 时半；在 5 和 6 之间是 5 时半。' },
    { knowledgePointIds: [half, hands], prompt: '一个钟面表示 6 时半。短针和长针的位置应怎样描述？', options: ['短针在 6 和 7 之间，长针指向 6', '短针指向 7，长针指向 12', '短针指向 6，长针指向 12'], correctOptionIndex: 0, hint: '半时的时针没有走到下一个数字。', explanation: '6 时半时，时针在 6 和 7 之间，分针指向 6。' },
    { knowledgePointIds: [whole, half, hands], prompt: '同伴看到分针指向 12，就说时针一定指向 12。怎样解释？', options: ['分针指向 12 表示整时，时针还要单独看它指向几', '分针和时针总是指向同一个数', '分针指向 12 表示半时'], correctOptionIndex: 0, hint: '两根指针各有不同作用。', explanation: '分针指向 12 表示整时，但时针可以指向钟面上的不同小时数。' },
    { knowledgePointIds: [whole, half], prompt: '下面哪一个读法与指针位置不相符？', options: ['时针在 6 和 7 之间、分针指向 6：6 时半', '时针指向 9、分针指向 12：9 时整', '时针在 2 和 3 之间、分针指向 12：2 时半'], correctOptionIndex: 2, hint: '半时的分针应指向 6。', explanation: '分针指向 12 表示整时，所以第三项应读 2 时整，不是 2 时半。' },
    { knowledgePointIds: [whole, half, hands], prompt: '两位同学读同一钟面：短针在 10 和 11 之间，长针指着 6。哪种判断完整？', options: ['这是 10 时半，短针位置确定小时，长针位置确定半时', '这是 11 时半，只看短针后面的数', '这是 6 时整，只看长针指向的数'], correctOptionIndex: 0, hint: '把两根指针提供的信息合起来。', explanation: '长针指向 6 表示半时，短针还在 10 和 11 之间，所以是 10 时半。' },
    { knowledgePointIds: [whole, half, hands], prompt: '要检查同学是否把 7 时整误读成 7 时半，最关键要核对哪一点？', options: ['分针是指向 12 还是指向 6', '时针是不是较短', '钟面有几个数字'], correctOptionIndex: 0, hint: '两种读法的小时数相同，区别在分针位置。', explanation: '7 时整的分针指向 12，7 时半的分针指向 6。' },
    { knowledgePointIds: [whole, half, hands], prompt: '作息卡写着“8 时整开始读书，8 时半休息，9 时整结束”。同伴却把第一项读成 8 时半。哪项修改能让三张卡的顺序和时刻都一致？', options: ['第一张分针改指 12、时针指 8；顺序是 8 时整→8 时半→9 时整', '第一张分针改指 6；顺序是 8 时半→8 时整→9 时整', '第一张时针改指 9、分针指 12；顺序是 8 时整→9 时整→8 时半'], correctOptionIndex: 0, hint: '先核对第一张是整时还是半时，再检查三项的先后。', explanation: '8 时整的分针指 12、时针指 8；之后才是 8 时半和 9 时整。' },
    { knowledgePointIds: [whole, half, hands], prompt: '一张钟面卡上两根指针都指着 6。哪项判断更合理？', options: ['不能据此读成 6 时半；半时的时针应在两个数字之间', '一定是 6 时半', '一定是 12 时整'], correctOptionIndex: 0, hint: '半时的短针不会正好停在小时数字上。', explanation: '6 时半时，时针在 6 和 7 之间；两针都指 6 不符合这个位置。' },
    { knowledgePointIds: [whole, half, hands], prompt: '值日生把“7 时半”画成时针指向 7、分针指向 12。要让钟面和文字相符，怎样改？', options: ['分针改指 6，时针移到 7 和 8 之间', '只把时针改指 8，分针仍指 12', '两根指针都保持原样，因为分针指 12 表示半时'], correctOptionIndex: 0, hint: '分别核对半时的分针位置和时针所在区间。', explanation: '7 时半时分针指 6，时针在 7 和 8 之间；原图画成了 7 时整。' },
    { knowledgePointIds: [whole, half, hands], prompt: '同学说“短针在 4 和 5 之间，所以一定是 4 时半”。还要确认什么才能读准？', options: ['长针是否指向 6', '钟面是不是圆形', '短针的颜色'], correctOptionIndex: 0, hint: '时针位置给出小时，分针还要说明整时或半时。', explanation: '短针在 4 和 5 之间说明时刻经过 4；分针指向 6 才能确认是 4 时半。' },
    { knowledgePointIds: [whole, half], prompt: '下面两条读钟方法，哪条不会把指针的作用弄混？', options: ['先看分针判断整时或半时，再看时针读小时', '分针指到几，小时就读几', '只要时针在两个数之间，就读后一个数的半时'], correctOptionIndex: 0, hint: '分针和时针提供的信息不同。', explanation: '分针帮助判断整时或半时，时针所在位置帮助读出小时。' },
    { knowledgePointIds: [whole, half, hands], prompt: '两张钟面卡：甲的时针在 9 和 10 之间、分针指向 6；乙的时针指向 9、分针指向 12。小明说两张都是 9 时整，哪项判断正确？', options: ['不对；甲是 9 时半，乙是 9 时整，两根指针的信息都要看', '正确；只要时针在 9 附近，两张都是 9 时整', '不对；甲是 6 时半，乙是 12 时整'], correctOptionIndex: 0, hint: '先用分针判断整时或半时，再用时针确定小时。', explanation: '甲的分针指 6、时针在 9 和 10 之间，是 9 时半；乙的分针指 12、时针指 9，是 9 时整。' },
    { knowledgePointIds: [whole, half, hands], prompt: '整理读钟记录时，发现短针指向 1、长针指向 12，却写成“1 时半”。应怎样修正？', options: ['改为 1 时整，因为分针指向 12', '改为 12 时半，因为长针指向 12', '保留原记录，因为时针指向 1'], correctOptionIndex: 0, hint: '不要把分针指向的数字当作小时数。', explanation: '分针指向 12 表示整时，时针指向 1，所以应记为 1 时整。' },
  ],
};

export const grade1MathUnit07SupplementalActivities: Grade1MathUnit07SupplementalActivity[] =
  (Object.entries(drafts) as [Difficulty, ActivityDraft[]][]).flatMap(([difficulty, items]) => items.map((draft, index) => {
    const options = draft.options.map((label, optionIndex) => ({ id: `option-${optionIndex + 1}`, label }));
    return {
      difficulty,
      sourceUnitId,
      knowledgePointIds: [...draft.knowledgePointIds],
      activity: {
        id: `${idPrefix}-${difficulty}-${String(index + 1).padStart(2, '0')}`,
        kind: 'choice',
        prompt: draft.prompt,
        hint: draft.hint,
        explanation: draft.explanation,
        options,
        correctOptionId: options[draft.correctOptionIndex]!.id,
      },
    };
  }));
