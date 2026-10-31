import type { ChoiceActivityDefinition, Difficulty } from '../../content/types';

export interface Grade2Term1MathUnit06SupplementalActivity {
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

const sourceUnitId = 'grade-2/term-1/math/unit-06';
const idPrefix = 'challenge-supplement-grade-2-term-1-math-unit-06';
const multiplicationFacts = 'multiplication-facts';
const equalGroups = 'equal-groups-multiplication';

const drafts: Record<Difficulty, ActivityDraft[]> = {
  basic: [
    { knowledgePointIds: [multiplicationFacts], prompt: '7 × 2 等于多少？', answer: '14', distractors: ['12', '16'], hint: '用7的乘法口诀计算。', explanation: '7乘2等于14。' },
    { knowledgePointIds: [multiplicationFacts], prompt: '7 × 4 等于多少？', answer: '28', distractors: ['24', '32'], hint: '回忆“七四”的口诀。', explanation: '7乘4等于28。' },
    { knowledgePointIds: [multiplicationFacts], prompt: '7 × 8 等于多少？', answer: '56', distractors: ['54', '64'], hint: '先找“七八”的口诀。', explanation: '7乘8等于56。' },
    { knowledgePointIds: [multiplicationFacts], prompt: '8 × 3 等于多少？', answer: '24', distractors: ['21', '27'], hint: '回忆“三八”的口诀。', explanation: '8乘3等于24。' },
    { knowledgePointIds: [multiplicationFacts], prompt: '8 × 5 等于多少？', answer: '40', distractors: ['35', '45'], hint: '从“八五”的口诀回忆。', explanation: '8乘5等于40。' },
    { knowledgePointIds: [multiplicationFacts], prompt: '8 × 9 等于多少？', answer: '72', distractors: ['64', '81'], hint: '从“八九”的口诀回忆。', explanation: '8乘9等于72。' },
    { knowledgePointIds: [multiplicationFacts], prompt: '9 × 2 等于多少？', answer: '18', distractors: ['16', '20'], hint: '先想“二九”的口诀。', explanation: '9乘2等于18。' },
    { knowledgePointIds: [multiplicationFacts], prompt: '9 × 4 等于多少？', answer: '36', distractors: ['32', '40'], hint: '回想“四九”的口诀。', explanation: '9乘4等于36。' },
    { knowledgePointIds: [multiplicationFacts], prompt: '9 × 7 等于多少？', answer: '63', distractors: ['56', '72'], hint: '从“七九”的口诀回忆。', explanation: '9乘7等于63。' },
    { knowledgePointIds: [equalGroups], prompt: '7排座位，每排有6个座位，一共有多少个？', answer: '42', distractors: ['13', '49'], hint: '这是7组，每组6个。', explanation: '7组、每组6个，列式7乘6，等于42个座位。' },
    { knowledgePointIds: [equalGroups], prompt: '8个盒子，每个盒子放7枚棋子，一共放了多少枚？', answer: '56', distractors: ['15', '64'], hint: '用盒子数乘每盒的枚数。', explanation: '8组、每组7枚，8乘7等于56枚。' },
    { knowledgePointIds: [equalGroups], prompt: '9支队伍，每队有5名队员，一共有多少名队员？', answer: '45', distractors: ['14', '54'], hint: '每队人数相同，可以用乘法求总数。', explanation: '9组、每组5人，9乘5等于45人。' },
    { knowledgePointIds: [equalGroups], prompt: '8组，每组9个球，求一共有多少个球，应该选哪个算式？', answer: '8 × 9', distractors: ['8 + 9', '9 - 8'], hint: '组数在前，每组的数量在后。', explanation: '8组、每组9个，列式8乘9。' },
    { knowledgePointIds: [multiplicationFacts, equalGroups], prompt: '9组，每组7朵花；7组，每组9朵花。两种摆法的总数怎样？', answer: '总数相同，都是63朵', distractors: ['第一种多9朵', '第二种多7朵'], hint: '分别用口诀计算，再比较两个积。', explanation: '9乘7和7乘9都等于63，两种摆法的总数相同。' },
  ],
  advanced: [
    { knowledgePointIds: [multiplicationFacts], prompt: '7 × 9 和 9 × 7 的得数有什么关系？', answer: '得数相同，都是63', distractors: ['7 × 9 多2', '9 × 7 多2'], hint: '分别用口诀求积后比较。', explanation: '七九六十三，九七也得六十三。' },
    { knowledgePointIds: [multiplicationFacts], prompt: '8 × 6 等于多少？', answer: '48', distractors: ['42', '54'], hint: '想一想六八四十八。', explanation: '8乘6等于48。' },
    { knowledgePointIds: [multiplicationFacts], prompt: '9 × 8 等于多少？', answer: '72', distractors: ['64', '81'], hint: '想一想八九七十二。', explanation: '9乘8等于72。' },
    { knowledgePointIds: [multiplicationFacts], prompt: '7 × 7 等于多少？', answer: '49', distractors: ['42', '56'], hint: '想一想七七四十九。', explanation: '7乘7等于49。' },
    { knowledgePointIds: [multiplicationFacts], prompt: '8 × 8 等于多少？', answer: '64', distractors: ['56', '72'], hint: '想一想八八六十四。', explanation: '8乘8等于64。' },
    { knowledgePointIds: [multiplicationFacts], prompt: '7 × □ = 42，方框里应填几？', answer: '6', distractors: ['5', '7'], hint: '想想几七四十二。', explanation: '六七四十二，所以方框里填6。' },
    { knowledgePointIds: [multiplicationFacts], prompt: '9 × □ = 72，方框里应填几？', answer: '8', distractors: ['7', '9'], hint: '想想几九七十二。', explanation: '八九七十二，所以方框里填8。' },
    { knowledgePointIds: [multiplicationFacts], prompt: '哪道算式和 8 × 7 的得数相同？', answer: '7 × 8', distractors: ['7 × 9', '8 × 9'], hint: '分别用口诀求积。', explanation: '8乘7和7乘8都等于56。' },
    { knowledgePointIds: [equalGroups], prompt: '7行，每行8颗棋子；8行，每行7颗棋子。哪项说法正确？', answer: '两种摆法都是56颗', distractors: ['第一种多1颗', '第二种多8颗'], hint: '分别用行数乘每行颗数。', explanation: '7乘8和8乘7都等于56。' },
    { knowledgePointIds: [equalGroups, multiplicationFacts], prompt: '9组，每组7个，列式后算得72。哪项检查结果正确？', answer: '算式应为9 × 7，得数是63', distractors: ['算式应为7 × 9，得数是72', '算式应为9 + 7，得数是63'], hint: '先核对两个因数，再用七九的口诀验算。', explanation: '9组、每组7个列成9乘7；七九六十三，不是72。' },
    { knowledgePointIds: [multiplicationFacts], prompt: '下面哪组算式的积最大？', answer: '8 × 9', distractors: ['7 × 9', '8 × 8'], hint: '分别用乘法口诀求积后比较。', explanation: '7乘9得63，8乘8得64，8乘9得72，72最大。' },
    { knowledgePointIds: [equalGroups], prompt: '8盒卡片，每盒7张。哪种算式和总数对应？', answer: '8 × 7 = 56', distractors: ['8 + 7 = 15', '8 × 9 = 72'], hint: '把盒子数作为组数，每盒张数作为每组数量。', explanation: '8组、每组7张，列式8乘7，得56张。' },
    { knowledgePointIds: [multiplicationFacts], prompt: '把 8 × 7、9 × 7、8 × 8 按积从小到大排列，哪项正确？', answer: '8 × 7，9 × 7，8 × 8', distractors: ['9 × 7，8 × 7，8 × 8', '8 × 8，9 × 7，8 × 7'], hint: '先求出三个积，再按大小排列。', explanation: '56小于63，63小于64，因此顺序是8乘7、9乘7、8乘8。' },
    { knowledgePointIds: [equalGroups], prompt: '9排座位，每排6个。用乘法表示后，哪项还写出了正确总数？', answer: '9 × 6 = 54个', distractors: ['9 + 6 = 15个', '9 × 7 = 63个'], hint: '按9组、每组6个列式并用口诀核对。', explanation: '9组、每组6个，九六五十四，共54个。' },
  ],
  high: [
    { knowledgePointIds: [equalGroups, multiplicationFacts], prompt: '9层书架，每层放8本书。后来又放满1层，每层仍放8本。现在一共有多少本？', answer: '80本', distractors: ['72本', '81本'], hint: '先算原来的9层，再加上新放满的一层。', explanation: '原来9层有72本，再加1层8本，一共80本。' },
    { knowledgePointIds: [multiplicationFacts], prompt: '7 × 8 与 8 × 7 哪项比较结论有依据？', answer: '两个积相同，都是56', distractors: ['7 × 8 比 8 × 7 多1', '8 × 7 比 7 × 8 多8'], hint: '分别按乘法口诀求出两个积。', explanation: '七八五十六，八七也得五十六。' },
    { knowledgePointIds: [equalGroups, multiplicationFacts], prompt: '8组，每组7个已经摆好；再摆1组同样多的物品。总数是多少？', answer: '63个', distractors: ['56个', '64个'], hint: '现在有9组，每组7个。', explanation: '9组、每组7个，九七六十三，共63个。' },
    { knowledgePointIds: [equalGroups, multiplicationFacts], prompt: '9盒，每盒6颗珠子，其中一盒少放了1颗。实际有多少颗？', answer: '53颗', distractors: ['54颗', '52颗'], hint: '先算9盒都装满，再少算1颗。', explanation: '九六五十四，少1颗是53颗。' },
    { knowledgePointIds: [multiplicationFacts], prompt: '下面两种分组的总数相差多少：9组每组7个，8组每组8个？', answer: '相差1个，8组每组8个多', distractors: ['相差7个，9组每组7个多', '相差8个，两种一样多'], hint: '先分别计算两种分组的总数。', explanation: '9乘7是63，8乘8是64，后者多1个。' },
    { knowledgePointIds: [equalGroups, multiplicationFacts], prompt: '7队，每队9人。临时增加2队，每队人数不变。现在有多少人？', answer: '81人', distractors: ['63人', '79人'], hint: '现在是9队，每队9人。', explanation: '9队、每队9人，九的乘法口诀得81人。' },
    { knowledgePointIds: [equalGroups], prompt: '72个贴纸装进9个盒子。要把它们看成数量相同的分组，先核对哪项？', answer: '每个盒子的贴纸数是否相同', distractors: ['盒子的颜色是否相同', '贴纸的图案是否相同'], hint: '确认每组里的数量是否一致。', explanation: '只有每个盒子的数量相同，才能把9盒看成9个相同的组。' },
    { knowledgePointIds: [equalGroups, multiplicationFacts], prompt: '8个小组每组分到7张星星贴纸，记录成54张，怎样改正？', answer: '改为8 × 7 = 56张', distractors: ['改为8 × 8 = 64张', '改为7 + 8 = 15张'], hint: '按8组、每组7张重新用口诀计算。', explanation: '八七五十六，8个小组每组7张，共56张星星贴纸。' },
    { knowledgePointIds: [multiplicationFacts], prompt: '比较 7 × 9、8 × 8 和 8 × 9，哪项从小到大排列正确？', answer: '7 × 9，8 × 8，8 × 9', distractors: ['8 × 8，7 × 9，8 × 9', '8 × 9，8 × 8，7 × 9'], hint: '先求出三个积，再按大小排列。', explanation: '63小于64，小于72，顺序是7乘9、8乘8、8乘9。' },
    { knowledgePointIds: [equalGroups, multiplicationFacts], prompt: '9排，每排8人。检查时发现其中一排少1人，实际有多少人？', answer: '71人', distractors: ['72人', '70人'], hint: '先算9排都满员，再少1人。', explanation: '九八七十二，少1人是71人。' },
    { knowledgePointIds: [equalGroups, multiplicationFacts], prompt: '一盒彩笔有8支，先取出7盒，后来又取出1盒。两次一共取出多少支？', answer: '64支', distractors: ['56支', '72支'], hint: '合起来是8盒，每盒8支。', explanation: '两次共取出8盒，八八六十四，一共64支。' },
    { knowledgePointIds: [equalGroups], prompt: '8袋，每袋9颗；9袋，每袋8颗。想比较总数，哪种记录最清楚？', answer: '分别写8 × 9和9 × 8，再比较两个积', distractors: ['只写“袋子很多”', '只记录袋子的颜色'], hint: '记录组数和每组数量，再用口诀求总数。', explanation: '把两种分组的因数和乘积写清楚，便于比较和复核。' },
    { knowledgePointIds: [equalGroups, multiplicationFacts], prompt: '9盒，每盒7张卡片；又拿来2张。现在一共有多少张？', answer: '65张', distractors: ['63张', '72张'], hint: '先用乘法算9盒，再加上另外2张。', explanation: '九七六十三，再加2张，一共65张。' },
    { knowledgePointIds: [equalGroups, multiplicationFacts], prompt: '8组，每组9个；移走1整组后，还剩多少个？', answer: '63个', distractors: ['72个', '64个'], hint: '移走一组9个，变成7组、每组9个。', explanation: '7组、每组9个，七九六十三，还剩63个。' },
  ],
};

export const grade2Term1MathUnit06SupplementalActivities: Grade2Term1MathUnit06SupplementalActivity[] = Object.entries(drafts).flatMap(([difficulty, items]) => (
  items.map((draft, index) => {
    const correctOptionIndex = ((index * 2 + 1) % 3) as 0 | 1 | 2;
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
