import type { ChoiceActivityDefinition, Difficulty } from '../../content/types';

export interface Grade2Term2MathUnit05SupplementalActivity {
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

const sourceUnitId = 'grade-2/term-2/math/unit-05';
const idPrefix = 'challenge-supplement-grade-2-term-2-math-unit-05';
const multiplicationBeforeAddition = 'mixed-operations-multiplication-division-before-addition-subtraction';
const sameLevelLeftToRight = 'mixed-operations-same-level-left-to-right';
const parenthesesFirst = 'mixed-operations-parentheses-first';

const drafts: Record<Difficulty, ActivityDraft[]> = {
  basic: [
    { knowledgePointIds: [multiplicationBeforeAddition], prompt: '计算7+5×6。', answer: '37', distractors: ['72', '42'], hint: '没有小括号时，先找乘法。', explanation: '先算5×6＝30，再算7＋30＝37。' },
    { knowledgePointIds: [multiplicationBeforeAddition], prompt: '计算48÷6+4。', answer: '12', distractors: ['6', '16'], hint: '先算除法，再把商与4相加。', explanation: '48÷6＝8，8＋4＝12。' },
    { knowledgePointIds: [multiplicationBeforeAddition], prompt: '计算42−18÷3。', answer: '36', distractors: ['8', '30'], hint: '减法前先完成除法。', explanation: '18÷3＝6，42−6＝36。' },
    { knowledgePointIds: [multiplicationBeforeAddition], prompt: '算式9+4×5没有小括号，第一步要算什么？', answer: '4×5', distractors: ['9+4', '把5加到9上'], hint: '乘法比加法先算。', explanation: '先算4×5，再把积加到9上。' },
    { knowledgePointIds: [parenthesesFirst], prompt: '算式(7+5)×3里，哪一部分要先算？', answer: '7+5', distractors: ['5×3', '7×3'], hint: '小括号标出了先算的部分。', explanation: '先算括号里的7＋5，得到12后再乘3。' },
    { knowledgePointIds: [sameLevelLeftToRight], prompt: '计算18−6+2时，第一步应怎样做？', answer: '先算18−6', distractors: ['先算6+2', '先算18+2'], hint: '加法和减法是同一级运算。', explanation: '同级运算从左往右，先算18−6＝12，再加2得14。' },
    { knowledgePointIds: [sameLevelLeftToRight], prompt: '不带小括号的算式24÷4×3，应按什么顺序计算？', answer: '从左往右，先算除法', distractors: ['先算4×3', '先把24和4相加'], hint: '乘法和除法同级，按算式从左到右。', explanation: '先算24÷4＝6，再算6×3＝18。' },
    { knowledgePointIds: [parenthesesFirst], prompt: '纸上有25颗珠子，其中8颗蓝色和7颗绿色先拿去做手工。还剩多少颗？', answer: '10颗', distractors: ['17颗', '2颗'], hint: '先把拿去做手工的两种颜色合起来，再从25颗中减掉。', explanation: '8＋7＝15颗，25−15＝10颗。' },
    { knowledgePointIds: [multiplicationBeforeAddition, parenthesesFirst], prompt: '两道算式分别是6+2×5和(6+2)×5，计算结果怎样？', answer: '6+2×5=16；(6+2)×5=40', distractors: ['两题都是40', '6+2×5=40；(6+2)×5=16'], hint: '第一题先乘，第二题先算括号。', explanation: '6＋2×5＝6＋10＝16；(6＋2)×5＝8×5＝40。' },
    { knowledgePointIds: [parenthesesFirst], prompt: '3个收纳盒，每盒放4支红笔和2支蓝笔。一共放了多少支笔？', answer: '(4+2)×3=18', distractors: ['4+2×3=10', '4×3+2=14'], hint: '先求每盒红笔和蓝笔的总数，再算3盒。', explanation: '每盒4＋2＝6支，3盒共6×3＝18支。' },
    { knowledgePointIds: [multiplicationBeforeAddition], prompt: '4盒饼干，每盒6块，拿走5块后还剩多少块？', answer: '4×6−5=19', distractors: ['4×(6−5)=4', '4+6−5=5'], hint: '先算4盒一共有多少块，再减去拿走的5块。', explanation: '4×6＝24，24−5＝19块。' },
    { knowledgePointIds: [multiplicationBeforeAddition], prompt: '小林把8+3×4算成44。哪项改正了他的第一步？', answer: '先算3×4，最后结果是20', distractors: ['先算8+3，最后结果是44', '先算8×4，最后结果是35'], hint: '先看乘法和加法谁先算。', explanation: '应先算3×4＝12，再算8＋12＝20。' },
    { knowledgePointIds: [sameLevelLeftToRight], prompt: '算式36÷6×2没有小括号，第一步应选哪条规则？', answer: '乘除同级，从左往右先做除法', distractors: ['乘法总比除法先算', '先把6和2相乘'], hint: '同一级运算不固定谁优先，要看左右位置。', explanation: '先算左边的36÷6＝6，再算6×2＝12。' },
    { knowledgePointIds: [parenthesesFirst], prompt: '算式5×(6+2)中，先算括号内的和，结果是多少？', answer: '40', distractors: ['32', '22'], hint: '先把括号里的6和2合起来。', explanation: '6＋2＝8，5×8＝40。' },
  ],
  advanced: [
    { knowledgePointIds: [multiplicationBeforeAddition, parenthesesFirst], prompt: '比较7+4×5和(7+4)×5，哪项计算与比较都正确？', answer: '7+4×5=27；(7+4)×5=55，后者大28', distractors: ['两题都是55', '7+4×5=55；(7+4)×5=27，前者大28'], hint: '先按各自的运算顺序求出两个结果，再比较。', explanation: '7＋4×5＝27，(7＋4)×5＝55；55−27＝28。' },
    { knowledgePointIds: [multiplicationBeforeAddition], prompt: '48张卡片先平均分给6组，每组后来再添7张。每组有多少张？', answer: '先48÷6=8，再8+7=15', distractors: ['先48÷6=8，再减去7张得1张', '先算48+6+7=61张'], hint: '先求每组原来的卡片数，再加上后来添的7张。', explanation: '48÷6＝8张，8＋7＝15张。' },
    { knowledgePointIds: [multiplicationBeforeAddition], prompt: '小安算30−18÷3时，先算了30−18。哪项改正了他的计算？', answer: '先算18÷3=6，再算30−6=24', distractors: ['先算30−18=12，再算12÷3=4', '先算18÷3=6，再把30+6=36'], hint: '乘除优先于加减，先完成除法。', explanation: '18÷3＝6，再算30−6＝24；不能先做30−18。' },
    { knowledgePointIds: [sameLevelLeftToRight], prompt: '两位同学计算20−5+2，一位按从左往右计算，另一位先算5+2。哪项说明正确？', answer: '20−5+2=17；20−(5+2)=13', distractors: ['两种顺序都是17', '20−5+2=13；20−(5+2)=17'], hint: '没有括号时同级运算从左往右；括号会改变先算的部分。', explanation: '20−5＝15，15＋2＝17；20−(5＋2)＝20−7＝13。' },
    { knowledgePointIds: [sameLevelLeftToRight], prompt: '48张贴纸平均分给6名同学，明明和另一位同学各得到一份。两人一共得到多少张？', answer: '48÷6×2=16张', distractors: ['48÷6+2=10张', '48÷6−2=6张'], hint: '先求一名同学得到几张，再求两份合起来。', explanation: '48÷6＝8张/人，8×2＝16张；两人共得到16张。' },
    { knowledgePointIds: [parenthesesFirst], prompt: '计算2×(8+5)，哪个中间结果正确？', answer: '先算8+5=13，再算2×13=26', distractors: ['先算2×8=16，再加5得21', '先算2+8=10，再乘5得50'], hint: '乘号旁边有小括号时，先算括号里面。', explanation: '括号里的和是13，2×13＝26。' },
    { knowledgePointIds: [multiplicationBeforeAddition], prompt: '一盒彩珠有42颗，拿出6颗后，剩下的每4颗装一袋。可以装几袋？', answer: '先算42−6=36，再算36÷4=9袋', distractors: ['先算42÷6=7，再减4袋', '先算42−6=36，再乘4得144袋'], hint: '先求剩下多少颗，再按每袋4颗分组。', explanation: '42−6＝36颗，36÷4＝9袋。' },
    { knowledgePointIds: [multiplicationBeforeAddition], prompt: '30个棋子每5个放一盒，每盒再添2个棋子。现在每盒有几个？', answer: '30÷5+2=8个/盒', distractors: ['30÷5−2=4个/盒', '30−5+2=27个/盒'], hint: '先求每盒原有几个，再把新添的2个加上。', explanation: '30÷5＝6个，6＋2＝8个/盒。' },
    { knowledgePointIds: [multiplicationBeforeAddition, sameLevelLeftToRight], prompt: '计算4+20÷5×2时，第一步应算哪一部分？', answer: '先算20÷5，再把商乘2', distractors: ['先算4+20', '先算5×2'], hint: '乘除比加法先算；乘除同级时从左往右。', explanation: '20÷5＝4，接着4×2＝8，最后4＋8＝12。' },
    { knowledgePointIds: [multiplicationBeforeAddition, parenthesesFirst], prompt: '比较36÷(3+3)与36÷3+3。哪项结果正确？', answer: '36÷(3+3)=6；36÷3+3=15', distractors: ['两题都等于6', '36÷(3+3)=15；36÷3+3=6'], hint: '括号会改变除法先算的部分。', explanation: '36÷6＝6；另一题先算36÷3＝12，再加3得15。' },
    { knowledgePointIds: [sameLevelLeftToRight], prompt: '计算12+6−4。', answer: '14', distractors: ['2', '22'], hint: '加法和减法同级，按从左到右计算。', explanation: '12＋6＝18，18−4＝14。' },
    { knowledgePointIds: [multiplicationBeforeAddition], prompt: '3排椅子，每排5把，旁边还放4把。一共有多少把椅子？', answer: '3×5+4=19', distractors: ['3×(5+4)=27', '3+5×4=23'], hint: '先求3排椅子的把数，再加旁边的4把。', explanation: '3×5＝15，15＋4＝19把。' },
    { knowledgePointIds: [parenthesesFirst], prompt: '18张贴纸先拿走6张，再把剩下的平均分给3人。每人几张？', answer: '(18−6)÷3=4', distractors: ['18−6÷3=16', '18÷3−6=0'], hint: '要先从18张里拿走6张，再分剩下的。', explanation: '18−6＝12，12÷3＝4张。' },
    { knowledgePointIds: [multiplicationBeforeAddition, parenthesesFirst], prompt: '计算8×(6−2)。', answer: '32', distractors: ['46', '40'], hint: '括号里先算6减2。', explanation: '6−2＝4，8×4＝32。' },
  ],
  high: [
    { knowledgePointIds: [multiplicationBeforeAddition], prompt: '5盘点心，每盘6块，先拿走4块送给值日生。还剩多少块？', answer: '5×6−4=26', distractors: ['5×(6−4)=10', '5+6−4=7'], hint: '先求5盘点心总数，再减去送走的4块。', explanation: '5×6＝30，30−4＝26块。' },
    { knowledgePointIds: [multiplicationBeforeAddition], prompt: '6颗星星原来摆在桌上，又放上4张星星贴纸，每张贴纸有5颗。桌上一共有多少颗星星？', answer: '先算4×5=20，再加原有6颗，得26颗', distractors: ['先算6+4，再乘5，得50颗', '先算6×4，再加5，得29颗'], hint: '先求4张贴纸上的星星数，再加桌上原有的6颗。', explanation: '4×5＝20颗，20＋6＝26颗。' },
    { knowledgePointIds: [parenthesesFirst], prompt: '4排座位，每排8个位置，其中每排有3个位置暂时不用。可用位置有多少个？', answer: '4×(8−3)=20', distractors: ['4×8−3=29', '(8−3)+4=9'], hint: '先求每排可用的位置，再计算4排。', explanation: '每排8−3＝5个可用位置，4排共有5×4＝20个。' },
    { knowledgePointIds: [multiplicationBeforeAddition, parenthesesFirst], prompt: '一间活动室有6把椅子，外面摆着3排、每排4把。另一间有3排、每排是6把椅子再加2把。哪项比较正确？', answer: '第一间6+4×3=18把；第二间(6+2)×3=24把', distractors: ['两间都用(6+2)×3，都是24把', '第一间(6+2)×3=24把；第二间6+4×3=18把'], hint: '把每句话中的“每排”数量先确定，再看第二间是否每一排都包含6把和2把。', explanation: '第一间已有6把，再加3排共12把，合计18把；第二间每排6＋2＝8把，3排共24把。' },
    { knowledgePointIds: [parenthesesFirst], prompt: '活动室有20把椅子，搬走8把后，把剩下的椅子平均排成3排。每排几把？', answer: '先算20−8=12，再算12÷3=4把/排', distractors: ['先算20−8=12，再算12×3=36把/排', '先算20−8−3=9把/排'], hint: '先算还剩多少把，再把剩下的平均排成3排。', explanation: '20−8＝12把，12÷3＝4把/排。' },
    { knowledgePointIds: [multiplicationBeforeAddition, parenthesesFirst], prompt: '计算36÷(3×2)+4。', answer: '10', distractors: ['36÷3×2+4=28', '36÷(3×2)−4=2'], hint: '先算括号里的乘法，再做除法，最后加4。', explanation: '3×2＝6，36÷6＝6，6＋4＝10。' },
    { knowledgePointIds: [multiplicationBeforeAddition, parenthesesFirst], prompt: '12颗绿色珠子和8颗黄色珠子平均分给4组，每组再添3颗。每组最后有几颗？', answer: '(12+8)÷4+3=8', distractors: ['12+8÷4+3=17', '(12+8)÷4−3=2'], hint: '先合计珠子，再平均分，最后给每组加3颗。', explanation: '12＋8＝20，20÷4＝5，5＋3＝8颗/组。' },
    { knowledgePointIds: [multiplicationBeforeAddition, parenthesesFirst], prompt: '同学把18−6×2算成24，因为他先做了减法。哪项检查正确？', answer: '应先算6×2，18−12=6', distractors: ['先算18−6，再乘2，结果是24', '两种顺序都符合没有括号的算式'], hint: '没有小括号时，乘法比减法先算。', explanation: '6×2＝12，18−12＝6；只有写成(18−6)×2才会先算减法。' },
    { knowledgePointIds: [multiplicationBeforeAddition], prompt: '柜里已有8盒铅笔，另外有24支铅笔要按每盒6支装。装完后一共有几盒？', answer: '8+24÷6=12盒', distractors: ['8+24÷6=4盒', '8+24×6=152盒'], hint: '先用24支铅笔按每盒6支装盒，再把新装的盒数与原来的8盒相加。', explanation: '24÷6＝4盒新装的铅笔，8＋4＝12盒。' },
    { knowledgePointIds: [multiplicationBeforeAddition, parenthesesFirst], prompt: '比较6×4+5与6×(4+5)，哪项结果正确？', answer: '6×4+5=29；6×(4+5)=54，差25', distractors: ['两题都是54', '6×4+5=54；6×(4+5)=29，差25'], hint: '第一题先乘后加，第二题先算括号里的和。', explanation: '6×4＋5＝24＋5＝29；4＋5＝9，6×9＝54；54−29＝25。' },
    { knowledgePointIds: [multiplicationBeforeAddition], prompt: '18张图卡中有3组、每组4张需要先取出。还剩多少张？', answer: '18−3×4=6', distractors: ['(18−3)×4=60', '18−3+4=19'], hint: '先求3组一共取出几张，再从18张中减去。', explanation: '3×4＝12，18−12＝6张。' },
    { knowledgePointIds: [sameLevelLeftToRight], prompt: '小库里有20个球，借出6个后又归还3个。现在有多少个球？', answer: '20−6+3=17个', distractors: ['20−(6+3)=11个', '20+6−3=23个'], hint: '没有小括号时，加法和减法同级，从左往右计算。', explanation: '20−6＝14，14＋3＝17个。' },
    { knowledgePointIds: [sameLevelLeftToRight], prompt: '24张卡片先平均分给3个班，每个班再平均分给2个小组。每个小组几张？', answer: '24÷3÷2=4张/组', distractors: ['24÷3+2=10张/组', '24÷3−2=6张/组'], hint: '先求每班分到几张，再把每班的卡片平均分给2个小组。', explanation: '24÷3＝8张/班，8÷2＝4张/组。' },
    { knowledgePointIds: [parenthesesFirst], prompt: '3个美术袋，每袋装6支红笔和2支蓝笔。哪项列式能表示全部笔数？', answer: '3×(6+2)=24', distractors: ['3×6+2=20', '6+2×3=12'], hint: '每个袋里都有6支红笔和2支蓝笔，要先求每袋总数。', explanation: '每袋6＋2＝8支，3袋共有8×3＝24支。'},
  ],
};

export const grade2Term2MathUnit05SupplementalActivities: Grade2Term2MathUnit05SupplementalActivity[] = Object.entries(drafts).flatMap(([difficulty, items]) => (
  items.map((draft, index) => {
    const correctOptionIndex = (index % 3) as 0 | 1 | 2;
    const options = [...draft.distractors];
    options.splice(correctOptionIndex, 0, draft.answer);
    return {
      difficulty: difficulty as Difficulty,
      sourceUnitId,
      knowledgePointIds: draft.knowledgePointIds,
      activity: {
        id: `${idPrefix}-${difficulty}-${String(index + 1).padStart(2, '0')}`,
        kind: 'choice' as const,
        prompt: draft.prompt,
        options: options.map((label, optionIndex) => ({ id: `option-${optionIndex + 1}`, label })),
        correctOptionId: `option-${correctOptionIndex + 1}`,
        hint: draft.hint,
        explanation: draft.explanation,
      },
    };
  })
));
