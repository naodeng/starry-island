import type { ChoiceActivityDefinition, Difficulty } from '../../content/types';

export interface Grade1MathUnit08SupplementalActivity {
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

const sourceUnitId = 'grade-1/term-1/math/unit-08';
const idPrefix = 'challenge-supplement-grade-1-term-1-math-unit-08';
const makeTen = 'make-ten-strategy';
const carry = 'carry-addition-within-twenty';
const modeling = 'addition-situation-modeling';
const checking = 'addition-checking';

const drafts: Record<Difficulty, ActivityDraft[]> = {
  basic: [
    { knowledgePointIds: [makeTen, carry], prompt: '用凑十法计算：8 + 5 = ?', options: ['12', '13', '14'], correctOptionIndex: 1, hint: '把 5 分成 2 和 3，先凑成 10。', explanation: '8 + 5 = 8 + 2 + 3 = 10 + 3 = 13。' },
    { knowledgePointIds: [makeTen, carry], prompt: '计算：9 + 4 = ?', options: ['13', '12', '14'], correctOptionIndex: 0, hint: '9 再加 1 就是 10。', explanation: '把 4 分成 1 和 3：9 + 4 = 10 + 3 = 13。' },
    { knowledgePointIds: [makeTen], prompt: '9 + □ = 10，方框里填几？', options: ['2', '1', '3'], correctOptionIndex: 1, hint: '想一想 9 再添几个就是 10。', explanation: '9 再添 1 就是 10，所以方框里填 1。' },
    { knowledgePointIds: [makeTen, carry], prompt: '计算：7 + 5 = ?', options: ['11', '13', '12'], correctOptionIndex: 2, hint: '先把 5 分成能让 7 凑成 10 的两部分。', explanation: '把 5 分成 3 和 2：7 + 5 = 7 + 3 + 2 = 10 + 2 = 12。' },
    { knowledgePointIds: [modeling, carry], prompt: '盘子里有 8 个苹果，又放进 5 个。现在有多少个苹果？', options: ['13 个', '12 个', '14 个'], correctOptionIndex: 0, hint: '把原来的数量和放进来的数量合起来。', explanation: '合起来用加法：8 + 5 = 13，现在有 13 个苹果。' },
    { knowledgePointIds: [makeTen, carry], prompt: '计算：6 + 8 = ?', options: ['13', '14', '15'], correctOptionIndex: 1, hint: '把 8 分成 4 和 4，先让 6 凑成 10。', explanation: '6 + 8 = 6 + 4 + 4 = 10 + 4 = 14。' },
    { knowledgePointIds: [makeTen, carry], prompt: '9 + 7 可以先算 9 + 1。接下来还要加几？', options: ['5', '7', '6'], correctOptionIndex: 2, hint: '把 7 分成凑成 10 的部分和剩下的部分。', explanation: '7 分成 1 和 6；9 + 1 凑成 10 后，还要加 6。' },
    { knowledgePointIds: [makeTen, carry], prompt: '计算：8 + 3 = ?', options: ['11', '10', '12'], correctOptionIndex: 0, hint: '把 3 分成 2 和 1，先凑成 10。', explanation: '8 + 3 = 8 + 2 + 1 = 10 + 1 = 11。' },
    { knowledgePointIds: [makeTen, carry], prompt: '计算：7 + 6 = ?', options: ['12', '13', '14'], correctOptionIndex: 1, hint: '7 还需要 3 才能凑成 10。', explanation: '把 6 分成 3 和 3：7 + 6 = 10 + 3 = 13。' },
    { knowledgePointIds: [makeTen], prompt: '8 凑成 10，还需要添几？', options: ['3', '2', '1'], correctOptionIndex: 1, hint: '从 8 接着数到 10。', explanation: '8 + 2 = 10，所以还需要添 2。' },
    { knowledgePointIds: [modeling, carry], prompt: '小青有 9 张贴纸，又得到 5 张。哪道算式能表示现在有多少张？', options: ['9 + 5', '9 - 5', '5 - 9'], correctOptionIndex: 0, hint: '得到一些后，贴纸的总数增加了。', explanation: '把原有的 9 张和新得到的 5 张合起来，用 9 + 5 表示。' },
    { knowledgePointIds: [checking, carry], prompt: '小安算出 8 + 4 = 12。用减法检查时，哪道算式能回到 8？', options: ['12 - 4 = 8', '12 - 3 = 8', '8 - 4 = 12'], correctOptionIndex: 0, hint: '从和里减去一个加数，应得到另一个加数。', explanation: '12 - 4 = 8，回到了另一个加数，检查成立。' },
    { knowledgePointIds: [makeTen, carry], prompt: '计算：9 + 6 = ?', options: ['14', '15', '16'], correctOptionIndex: 1, hint: '把 6 分成 1 和 5，先凑成 10。', explanation: '9 + 6 = 9 + 1 + 5 = 10 + 5 = 15。' },
    { knowledgePointIds: [modeling, carry], prompt: '盒子里有 7 支铅笔，又放进 8 支。现在一共有几支？', options: ['14 支', '16 支', '15 支'], correctOptionIndex: 2, hint: '先把两个数量合起来，再计算。', explanation: '7 + 8 = 7 + 3 + 5 = 10 + 5 = 15，一共有 15 支。' },
  ],
  advanced: [
    { knowledgePointIds: [makeTen, carry], prompt: '计算 8 + 7 时，下面哪种拆分能先凑成 10？', options: ['7 分成 2 和 5', '7 分成 1 和 6', '7 分成 3 和 4'], correctOptionIndex: 0, hint: '8 还差几就到 10？', explanation: '8 还差 2 到 10，所以把 7 分成 2 和 5，得到 10 + 5 = 15。' },
    { knowledgePointIds: [makeTen, carry], prompt: '9 + 6 = 9 + 1 + □，方框里填几？', options: ['4', '5', '6'], correctOptionIndex: 1, hint: '先用 1 把 9 凑成 10。', explanation: '6 分出 1 后还剩 5，所以方框里填 5。' },
    { knowledgePointIds: [modeling, carry], prompt: '书架上原有 7 本书，又放上 6 本。应列哪道算式求现在有几本？', options: ['7 + 6', '7 - 6', '6 - 7'], correctOptionIndex: 0, hint: '“又放上”表示数量合起来。', explanation: '原有 7 本，又放上 6 本，求总数用 7 + 6。' },
    { knowledgePointIds: [checking, carry], prompt: '8 + 6 = 14。用逆运算检查时，哪道算式正确？', options: ['14 - 6 = 8', '14 - 5 = 8', '8 - 6 = 14'], correctOptionIndex: 0, hint: '从和中减去一个加数，检查能否得到另一个加数。', explanation: '14 - 6 = 8，检查回到另一个加数，原计算正确。' },
    { knowledgePointIds: [checking, carry], prompt: '同学把 8 + 5 算成 12。用逆运算能发现什么？', options: ['12 - 5 = 7，不是 8，所以结果不对', '12 - 5 = 8，所以结果正确', '8 - 5 = 3，所以结果正确'], correctOptionIndex: 0, hint: '如果和是 12，减去 5 后应回到 8。', explanation: '12 - 5 = 7，没有回到 8；正确的和是 13。' },
    { knowledgePointIds: [makeTen, carry], prompt: '计算 9 + 8 时，先算 9 + 1 = 10，还剩下多少要加？', options: ['6', '8', '7'], correctOptionIndex: 2, hint: '把 8 分成先凑十的 1 和另一部分。', explanation: '8 分成 1 和 7，先加 1 凑成 10，还剩 7。' },
    { knowledgePointIds: [makeTen, carry], prompt: '6 + □ = 14，可以把 14 看成 10 和 4。方框里应填几？', options: ['7', '8', '9'], correctOptionIndex: 1, hint: '6 先凑成 10，还要再加上 4。', explanation: '6 + 4 凑成 10，再加 4 是 14，因此一共加了 8。' },
    { knowledgePointIds: [makeTen, carry], prompt: '计算 7 + 8 时，先把 8 分成 3 和 5。第一步得到什么？', options: ['7 + 3 = 10', '7 + 5 = 12', '8 + 5 = 13'], correctOptionIndex: 0, hint: '先找能让 7 凑成 10 的那一部分。', explanation: '7 + 3 = 10，之后再把剩下的 5 加上。' },
    { knowledgePointIds: [modeling, carry], prompt: '篮子里有 9 个梨，又放进 8 个。下面哪道算式表示梨的总数？', options: ['9 + 8', '9 - 8', '8 - 9'], correctOptionIndex: 0, hint: '放进篮子的梨和原来的梨合在一起。', explanation: '求合起来的总数用加法，算式是 9 + 8。' },
    { knowledgePointIds: [checking, carry], prompt: '下面哪道算式的得数是 16？', options: ['8 + 7', '9 + 5', '8 + 8'], correctOptionIndex: 2, hint: '分别用凑十法算出三个得数。', explanation: '8 + 8 = 8 + 2 + 6 = 16；另外两道分别是 15 和 14。' },
    { knowledgePointIds: [checking, carry], prompt: '小乐算 7 + 8 = 15。哪道减法可以检查这个结果？', options: ['15 - 8 = 7', '15 - 7 = 7', '8 - 7 = 15'], correctOptionIndex: 0, hint: '用和减去一个加数，应该得到另一个加数。', explanation: '15 - 8 = 7，回到了另一个加数，计算检查成立。' },
    { knowledgePointIds: [makeTen, carry], prompt: '7 + 8 可以把 8 拆成 3 和 5。下面接着怎样算？', options: ['7 + 3 = 10，再算 10 + 5 = 15', '7 + 5 = 12，再算 12 + 3 = 14', '8 + 5 = 13，再算 13 + 3 = 16'], correctOptionIndex: 0, hint: '先用 3 帮 7 凑成整十数。', explanation: '7 + 3 = 10，10 + 5 = 15，所以 7 + 8 = 15。' },
    { knowledgePointIds: [modeling, carry], prompt: '小林有 8 张卡片，又收到 7 张。哪道算式表示收到后的张数？', options: ['8 + 7', '8 - 7', '7 - 8'], correctOptionIndex: 0, hint: '收到卡片后，原来的和新来的要合起来。', explanation: '收到后求总数，用 8 + 7 表示。' },
    { knowledgePointIds: [checking, carry], prompt: '9 + 7 = 16。哪道算式能检查加法结果？', options: ['16 - 7 = 9', '16 - 6 = 9', '9 - 7 = 16'], correctOptionIndex: 0, hint: '从和中减去 7，看看能否回到另一个加数。', explanation: '16 - 7 = 9，回到另一个加数，所以 9 + 7 = 16。' },
    { knowledgePointIds: [makeTen, carry], prompt: '用凑十法算 9 + 8，凑成 10 后应接着算哪道？', options: ['10 + 7', '10 + 8', '10 + 6'], correctOptionIndex: 0, hint: '从 8 里拿出 1 给 9，看看 8 还剩多少。', explanation: '8 分成 1 和 7，9 + 1 = 10 后，还要加上剩下的 7，所以接着算 10 + 7。' },
    { knowledgePointIds: [modeling, carry], prompt: '餐桌上有 8 个面包，又放上 6 个。哪道算式表示面包总数？', options: ['8 + 6', '8 - 6', '6 - 8'], correctOptionIndex: 0, hint: '新放上来的和原来的合在一起。', explanation: '求总数要把 8 个和 6 个合起来，算式是 8 + 6。' },
  ],
  high: [
    { knowledgePointIds: [makeTen, carry], prompt: '计算 8 + 7 + 5，可以怎样分步算并保持每步都不超过 20？', options: ['先算 8 + 7 = 15，再算 15 + 5 = 20', '先算 8 + 5 = 12，再算 12 + 7 = 18', '先算 7 + 5 = 11，再算 11 + 8 = 18'], correctOptionIndex: 0, hint: '先把前两个数用凑十法合起来，再加最后一个数。', explanation: '8 + 7 = 15，15 + 5 = 20，所以三数合起来是 20。' },
    { knowledgePointIds: [makeTen, carry], prompt: '计算 7 + 6 时，哪种拆分能先凑成 10？', options: ['把 6 分成 3 和 3', '把 6 分成 2 和 4', '把 7 分成 1 和 6'], correctOptionIndex: 0, hint: '7 还需要 3 才到 10。', explanation: '把 6 分成 3 和 3，先算 7 + 3 = 10，再加 3 得 13。' },
    { knowledgePointIds: [checking, carry], prompt: '同学把 9 + 8 算成 18。用逆运算检查后，正确判断是什么？', options: ['18 - 8 = 10，不是 9，应改成 17', '18 - 8 = 9，所以 18 正确', '18 - 9 = 8，所以 18 正确'], correctOptionIndex: 0, hint: '把同学的和减去一个加数，看能否回到另一个加数。', explanation: '18 - 8 = 10，不能回到 9；实际 9 + 8 = 17。' },
    { knowledgePointIds: [modeling, makeTen, carry], prompt: '盒子里有 8 支笔，又放进 7 支，后来再放进 5 支。哪个算式表示现在的总数？', options: ['8 + 7 + 5', '8 + 7 - 5', '8 - 7 + 5'], correctOptionIndex: 0, hint: '三次数量都是放进盒子里的，要把它们相加。', explanation: '原有 8 支，先后放进 7 支和 5 支，总数用 8 + 7 + 5 表示，结果是 20。' },
    { knowledgePointIds: [makeTen, carry], prompt: '9 + □ = 15。把 9 凑成 10 后，方框里的数应拆成哪两部分？', options: ['1 和 5', '1 和 6', '2 和 5'], correctOptionIndex: 0, hint: '先看 9 凑到 10 要用去几，再看 15 比 10 多几。', explanation: '9 需要 1 凑成 10；15 比 10 多 5，所以方框里的 6 拆成 1 和 5。' },
    { knowledgePointIds: [makeTen, carry], prompt: '8 + □ = 13。8 先加几凑成 10？还剩下几要加？', options: ['先加 2，再加 3', '先加 3，再加 2', '先加 1，再加 4'], correctOptionIndex: 0, hint: '把 13 分成 10 和剩下的数。', explanation: '8 先加 2 凑成 10，13 还比 10 多 3，所以再加 3，方框里是 5。' },
    { knowledgePointIds: [makeTen, carry, checking], prompt: '同学计算 8 + 7 时写成 8 + 2 + 5 = 10 + 5。哪项检查说明结果是 15？', options: ['15 - 7 = 8', '15 - 7 = 9', '15 - 8 = 8'], correctOptionIndex: 0, hint: '拆分后还要核对结果是否回到原来的加数。', explanation: '8 + 7 = 15，15 - 7 = 8，逆运算核对成立。' },
    { knowledgePointIds: [modeling, carry], prompt: '书架有 7 本故事书，又添 6 本，后来再添 5 本。哪道算式表示现在的本数？', options: ['7 + 6 + 5', '7 + 6 - 5', '7 - 6 + 5'], correctOptionIndex: 0, hint: '两次添入都让书的总数增加。', explanation: '先后添入的书都要加上：7 + 6 + 5 = 13 + 5 = 18。' },
    { knowledgePointIds: [checking, carry], prompt: '要检查 7 + 8 = 15，下面哪项逆运算检查正确？', options: ['15 - 7 = 8', '15 - 7 = 9', '15 - 8 = 8'], correctOptionIndex: 0, hint: '减去一个加数后，应得到另一个加数。', explanation: '15 - 7 = 8，回到另一个加数，检查正确。' },
    { knowledgePointIds: [modeling, makeTen, carry], prompt: '同学买了 8 张贴纸，又买 5 张，朋友再送 7 张。怎样列式求贴纸总数？', options: ['8 + 5 + 7', '8 + 5 - 7', '8 - 5 + 7'], correctOptionIndex: 0, hint: '买到和收到的贴纸都要合并计算。', explanation: '三部分贴纸都合起来：8 + 5 + 7 = 13 + 7 = 20。' },
    { knowledgePointIds: [checking, carry], prompt: '小明说 8 + 5 = 14。哪项检查能发现答案不对？', options: ['14 - 5 = 9，不是 8；正确的和是 13', '14 - 5 = 8，所以答案正确', '8 - 5 = 3，所以 14 正确'], correctOptionIndex: 0, hint: '如果和是 14，减去 5 后应该回到 8。', explanation: '14 - 5 = 9，没有回到 8；8 + 5 的正确结果是 13。' },
    { knowledgePointIds: [modeling, checking, carry], prompt: '篮子里有 9 个橙子，又放进 8 个。小组写出 9 + 8 = 16。哪个步骤能同时改正并核对？', options: ['改成 17，再算 17 - 8 = 9', '改成 16，再算 16 - 8 = 9', '改成 18，再算 18 - 8 = 9'], correctOptionIndex: 0, hint: '先用凑十法求和，再减去放进来的数量检查。', explanation: '9 + 8 = 17；17 - 8 = 9，回到原有的 9 个，检查通过。' },
    { knowledgePointIds: [makeTen, carry, checking], prompt: '计算 9 + 7 时，先用 1 凑成 10。哪条完整过程正确？', options: ['9 + 7 = 9 + 1 + 6 = 10 + 6 = 16', '9 + 7 = 9 + 1 + 7 = 10 + 7 = 17', '9 + 7 = 9 + 2 + 6 = 11 + 6 = 17'], correctOptionIndex: 0, hint: '从 7 里取出 1 后，记得算清还剩多少。', explanation: '7 分成 1 和 6，9 + 1 = 10，再加 6 得 16。' },
    { knowledgePointIds: [modeling, checking, carry], prompt: '小组要核实“6 个红球、7 个蓝球和 5 个黄球一共有多少个”。哪组算式与检查都正确？', options: ['6 + 7 + 5 = 18，18 - 5 = 13', '6 + 7 + 5 = 19，19 - 5 = 14', '6 + 7 + 5 = 18，18 - 5 = 12'], correctOptionIndex: 0, hint: '先把三种颜色的球合起来，再减去一种颜色核对另外两种。', explanation: '6 + 7 = 13，13 + 5 = 18；18 - 5 = 13，与前两个数量合起来一致。' },
    { knowledgePointIds: [makeTen, carry], prompt: '8 + 9 可以先算 8 + 2 = 10。还要把 9 分出的哪一部分加上？', options: ['6', '7', '8'], correctOptionIndex: 1, hint: '把 9 分成凑成 10 的部分和剩下的部分。', explanation: '9 分成 2 和 7，8 + 2 = 10 后，还要加上 7，得数是 17。' },
    { knowledgePointIds: [checking, carry], prompt: '先算 8 + 7 = 15，再加 4 得 19。哪道逆运算可以检查最后一步？', options: ['19 - 4 = 15', '19 - 5 = 15', '15 - 4 = 19'], correctOptionIndex: 0, hint: '从最后的和里减去后来加上的数。', explanation: '19 - 4 = 15，回到了上一步的得数，检查成立。' },
    { knowledgePointIds: [modeling, carry], prompt: '小盒里有 6 张卡片，先放进 7 张，又放进 7 张。哪道算式表示卡片总数？', options: ['6 + 7 + 7', '6 + 7 - 7', '6 - 7 + 7'], correctOptionIndex: 0, hint: '两次放进来的卡片都要和原来的合起来。', explanation: '6 + 7 = 13，13 + 7 = 20，所以总数用 6 + 7 + 7 表示。' },
  ],
};

export const grade1MathUnit08SupplementalActivities: Grade1MathUnit08SupplementalActivity[] =
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
