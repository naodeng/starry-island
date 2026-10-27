import type { ChoiceActivityDefinition, Difficulty } from '../../content/types';

export interface Grade2Term1MathUnit08SupplementalActivity {
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

const sourceUnitId = 'grade-2/term-1/math/unit-08';
const idPrefix = 'challenge-supplement-grade-2-term-1-math-unit-08';
const enumerationCore = 'systematic-pairing-and-enumeration';
const completeRecordCore = 'complete-and-nonduplicated-records';
const pairing = 'two-category-pairing';
const counting = 'combination-counting';
const orderedListing = 'ordered-listing';
const listAndLines = 'list-and-line-representation';
const duplicateCheck = 'duplicate-and-omission-checking';
const explainAndVerify = 'explain-and-verify';

function draft(
  knowledgePointIds: string[],
  prompt: string,
  answer: string,
  distractors: [string, string],
  hint: string,
  explanation: string,
): ActivityDraft {
  return {
    knowledgePointIds: [...new Set([enumerationCore, completeRecordCore, ...knowledgePointIds])],
    prompt,
    answer,
    distractors,
    hint,
    explanation,
  };
}

const drafts: Record<Difficulty, ActivityDraft[]> = {
  basic: [
    draft([pairing, counting], '有2顶帽子和3条围巾，每次各选一种，共有几种搭配？', '6种', ['5种', '8种'], '给每顶帽子分别配上3条围巾。', '2顶帽子各配3条围巾，一共有6种搭配。'),
    draft([pairing, counting], '3种饮料分别可以配2种点心，一共有多少种选法？', '6种', ['5种', '9种'], '每种饮料都要和两种点心各配一次。', '3种饮料各有2种配法，共有6种选法。'),
    draft([orderedListing], '想把每种上衣和裤子的搭配都列出来，哪种做法更有条理？', '先固定一件上衣，再逐一搭配裤子', ['想到哪组就写哪组', '只记录第一组搭配'], '先固定一类，再按顺序更换另一类。', '固定一件上衣后逐条搭配裤子，可以看出有没有漏项。'),
    draft([listAndLines, duplicateCheck], '两件上衣各配两条裤子共应有4组，清单已有3组且没有重复。还要怎样检查？', '找出还没有出现的那一组搭配', ['再抄一遍已有搭配', '删掉一件上衣的记录'], '逐件上衣检查两条裤子是否都配过。', '没有重复但只列出3组，说明还缺少1组，应找出遗漏的搭配。'),
    draft([duplicateCheck], '记录中“黄帽配蓝巾”出现了两次，应该怎样处理？', '保留一组，再检查其他搭配', ['把它算成两种搭配', '删掉所有蓝色围巾'], '相同的两类选择只算一组。', '重复记录不会产生新的搭配，保留一组后再检查清单。'),
    draft([listAndLines, orderedListing], '用连线图表示两类选项时，怎样减少遗漏？', '检查每个第一类选项都连到所有第二类选项', ['只给最喜欢的选项画线', '先数选项颜色再结束'], '从一个选项开始，逐个检查它连到哪些选项。', '逐项核对连线，能发现没有连到的组合。'),
    draft([pairing, counting], '4种面包各能搭配2种饮料，每次各选一种，有几种组合？', '8种', ['6种', '10种'], '每种面包都配两种饮料。', '4种面包各有2种搭配，共有8种组合。'),
    draft([duplicateCheck, explainAndVerify], '清单写着“红上衣配蓝裤子”两次，这两条记录代表几种不同搭配？', '1种', ['2种', '3种'], '比较两条记录里的上衣和裤子。', '两类选择都相同，是同一种搭配，只能算1种。'),
    draft([orderedListing], '有3种颜色的卡纸和2种贴纸形状，列清单时怎样开始？', '先固定一种颜色，再逐一搭配两种形状', ['先把颜色和形状混在一起写', '只列出一种颜色和一种形状'], '每次只固定一类选项。', '固定一种颜色并列出两种形状，再换下一种颜色。'),
    draft([pairing, counting], '2种帽子配4种围巾，与4种帽子配2种围巾，搭配总数怎样？', '两种情况都是8种', ['第一种多2种', '第二种多2种'], '分别按每一种帽子搭配围巾来数。', '2乘4和4乘2都得到8种搭配。'),
    draft([pairing, duplicateCheck], '“绿帽配红巾”和“红帽配绿巾”算同一种搭配吗？', '不是，帽子和围巾的配对不同', ['是，只要颜色相同就算一种', '是，两种物品可以交换'], '分别检查帽子和围巾选了什么。', '两组的帽子与围巾对应关系不同，因此是两种搭配。'),
    draft([counting, explainAndVerify], '有3条路线和2个出发时间，每条路线都能配每个时间，怎样数总数？', '3种路线各配2个时间，共6种', ['3种路线只算3种', '2个时间只算2种'], '每条路线都要和两个时间分别配对。', '3条路线各有2种时间选择，共有6种路线和时间组合。'),
    draft([orderedListing, duplicateCheck], '一份搭配清单按什么顺序检查更容易发现漏项？', '按第一类选项逐个检查第二类是否都出现', ['只看清单最后一行', '只检查搭配总数写得是否整齐'], '从第一类的第一个选项开始逐项核对。', '按固定顺序检查每个选项是否都配过，可以发现遗漏。'),
    draft([listAndLines, completeRecordCore], '怎样的搭配记录能让伙伴看清所有结果？', '每组都写出第一类和第二类的具体选择', ['只写“有很多种”', '只写总数，不写任何搭配'], '伙伴需要看见每一种两类物品的对应关系。', '写出每组具体选择，伙伴才能检查记录是否完整。'),
  ],
  advanced: [
    draft([pairing, counting], '3件外套和4把雨伞各选一种，全部搭配一共有多少种？', '12种', ['7种', '16种'], '固定一件外套，它可以配4把雨伞。', '3件外套各有4种雨伞选择，共有12种搭配。'),
    draft([duplicateCheck], '两件上衣各配两条裤子，应有4组。清单写了4行，其中两行完全相同，说明什么？', '至少漏了一组不同搭配', ['清单一定完整', '重复的一行能代替其他组合'], '重复的记录不能补上缺少的组合。', '4行中有两行相同，最多只有3组不同搭配，因此至少有一组遗漏。'),
    draft([orderedListing, listAndLines], '有3种起点和2条路线，每个起点都可选两条路线。怎样列得不漏？', '先固定一个起点，再列出两条路线后换下一个起点', ['先随意写6组再停止', '只记录路线较短的起点'], '一次检查一个起点的所有路线。', '按起点分组并列出两条路线，完成后再换下一个起点。'),
    draft([pairing, counting], '有4种果汁、3种杯子图案，每次各选一种。下面哪种数法正确？', '4种果汁各配3种图案，共12种', ['4种果汁只配其中一种图案，共4种', '把4和3相加，共7种'], '每种果汁都要与每种图案配一次。', '4种果汁各有3种图案选择，所以总数是4乘3，即12种。'),
    draft([duplicateCheck, explainAndVerify], '“蓝帽配白巾”与“蓝帽配黄巾”要不要分别记录？', '要，围巾不同就是不同搭配', ['不要，同一顶帽子只能记一次', '不要，颜色不同不影响搭配'], '比较两组中的帽子和围巾。', '虽然帽子相同，围巾不同，所以是两种不同搭配。'),
    draft([listAndLines, duplicateCheck], '连线图中一个起点连到3条路线，另一个起点只连到2条；题目说两条路线都可从每个起点出发。少了什么？', '第二个起点到第三条路线的连线', ['第一个起点到第四条路线的连线', '没有少，连线数已经相同'], '每个起点都应连到题目给出的两条路线。', '第二个起点还应连到第三条路线，才能满足每个起点都可选全部路线。'),
    draft([pairing, counting], '2种帽子配3条围巾与3种帽子配2条围巾，哪项正确？', '两边搭配总数相同，都是6种', ['2种帽子那边多1种', '3种帽子那边多1种'], '分别按一种帽子可以配几条围巾来数。', '2乘3和3乘2都等于6，搭配总数相同。'),
    draft([orderedListing], '把3种帽子与2条围巾搭配，哪份清单符合“先按帽子分组”的顺序？', '每顶帽子下面都列蓝巾和黄巾', ['先列完蓝巾的组合，再随意补几顶帽子', '只列最喜欢的帽子和围巾'], '每个帽子小组里都要出现两条围巾。', '先固定帽子，再列出蓝巾和黄巾，能保持顺序并检查完整。'),
    draft([duplicateCheck], '一张表有3种上衣、2条裤子，表中每件上衣只配了一条裤子。若要补完整，应怎样做？', '让每件上衣再和另一条裤子搭配', ['删去一条裤子', '把每件上衣的记录抄两遍'], '检查每件上衣是否配过两条裤子。', '每件上衣都应分别配两条裤子，少的一条裤子搭配需要补上。'),
    draft([pairing, counting], '4种颜色各能配3种图形贴纸，其中一组颜色和图形不能使用。还剩多少种搭配？', '11种', ['7种', '12种'], '先数所有搭配，再去掉不能使用的那一组。', '4乘3共有12种，去掉1种不能使用的搭配，剩11种。'),
    draft([explainAndVerify, duplicateCheck], '同伴说“有3种第一类选项和2种第二类选项，所以有5种搭配”。怎样检查这个说法？', '逐一列出每种第一类与两种第二类的搭配', ['直接接受5，不需要列举', '只数第一类选项'], '每种第一类都要和第二类的两个选项分别搭配。', '逐项列出会发现每种第一类各有2种搭配，总数是6种，不是5种。'),
    draft([orderedListing, completeRecordCore], '要列出“3种路线×2个时间”的全部组合，检查列表完整性的关键是什么？', '每条路线都出现两个不同时间', ['每个时间只出现一次', '清单行数必须是3行'], '按路线分组，逐一核对两个时间。', '每条路线要配两个时间，3条路线共6组，逐组检查可防遗漏。'),
    draft([pairing, explainAndVerify], '某清单把每种帽子和每种围巾配过，但只写搭配数量，没有写具体配对。伙伴如何验证？', '请清单补上具体配对，再逐项核对', ['只看总数是否为偶数', '根据帽子颜色猜出围巾'], '验证需要看到各组选项之间的对应关系。', '只有具体列出每组搭配，伙伴才能查出遗漏或重复。'),
    draft([listAndLines, orderedListing], '表格已经列出每件上衣对应的两条裤子，下一步怎样确认搭配数？', '按表格逐行数不同组合，并检查重复', ['只数上衣数量', '任意挑一行乘以表格颜色数'], '每个不同的上衣和裤子配对算一组。', '逐行计数并核对重复项，可以确认组合总数。'),
  ],
  high: [
    draft([pairing, counting, explainAndVerify], '小组有3件上衣和2条裤子，其中一件上衣不能配其中一条裤子。还可以怎样搭？', '5种', ['4种', '6种'], '先数没有限制时的搭配，再去掉不合适的一组。', '原有3乘2共6种，去掉1种不能搭配的情况，还剩5种。'),
    draft([orderedListing, listAndLines], '用表格列2种帽子和3条围巾，怎样安排行列更容易检查？', '帽子按行分组，每行列出3条围巾', ['只写围巾名称，不写帽子', '把6组搭配混写在一行'], '让一类选项作为分组，每组列出另一类的全部选项。', '每顶帽子占一组，逐一写出3条围巾，能看出是否漏项。'),
    draft([duplicateCheck, counting], '一份3种路线和2个时间的清单有6行，其中两行相同。怎样判断它是否完整？', '先删去重复项，再检查是否仍有6种不同配对', ['因为有6行，所以一定完整', '保留重复行并把总数改成7'], '行数不等于不同搭配数，先检查重复。', '去重后如果少于6组，就还需要找出遗漏的路线和时间配对。'),
    draft([pairing, counting], '小组先选1种帽子，再选1条围巾；2顶帽子和3条围巾各有几个选项？', '共有6种搭配', ['共有5种搭配', '共有8种搭配'], '每顶帽子都要和三条围巾分别搭配。', '两顶帽子各配三条围巾，总数为2乘3等于6。'),
    draft([explainAndVerify, orderedListing], '伙伴算出3种上衣和2条裤子有6种搭配。哪种说明最容易让大家核对？', '按上衣分组，逐组列出两条裤子的搭配', ['只报出6，不展示记录', '只列出一件上衣的两种搭配'], '说明中要能看到每件上衣都参与了搭配。', '按上衣分组并列出全部裤子，能让伙伴检查6组是否齐全。'),
    draft([duplicateCheck, listAndLines], '连线图有3个第一类选项，每个都应连向2个第二类选项。图上只有5条线，可能是什么情况？', '有一条搭配连线遗漏了', ['一定多画了一条线', '每个选项都已经连过两次'], '完整图应有3组、每组2条线。', '3组各2条线应有6条，图上只有5条，说明可能少画一条。'),
    draft([pairing, counting], '安排表列出3条路线与4个出发时间。若每条路线都能配任一时间，应有多少种安排？', '12种', ['7种', '10种'], '固定一条路线，再分别配4个时间。', '3条路线各有4个时间选择，共3乘4等于12种。'),
    draft([orderedListing, duplicateCheck], '三种帽子配两条围巾的清单里，哪种检查顺序最可靠？', '逐顶检查，并确认每顶都配过两条围巾', ['只检查第一顶帽子', '只比较围巾颜色是否相同'], '每种帽子都需要完成相同的检查。', '逐顶确认两条围巾都有搭配，才能同时发现遗漏和重复。'),
    draft([counting, explainAndVerify], '有2种背包和4种水壶图案。有人把总数算成2加4，错在哪里？', '把两类选项相加了，没有列出每个背包与水壶的配对', ['忘了给背包涂颜色', '把水壶图案数得太多'], '每组搭配要包含一个背包和一个水壶图案。', '题目要求两类各选一个，应逐项配对；2加4不是搭配总数。'),
    draft([pairing, duplicateCheck], '“路线甲配上午”和“路线甲配下午”在出发时间上不同，应如何记录？', '作为两种不同的路线与时间搭配', ['合并成一组，因为路线相同', '只保留上午，不记录下午'], '比较两类选择是否完全一样。', '出发时间不同，虽然路线相同，仍是两个不同组合。'),
    draft([listAndLines, explainAndVerify], '伙伴只写“共有8种搭配”，你还需要哪项证据来判断有没有漏掉？', '看见按顺序列出的8组具体搭配', ['知道伙伴最喜欢哪种颜色', '只确认总数写得很大'], '检查每种组合是否出现在记录里。', '具体列表能逐项检查是否有重复或遗漏，单独一个总数不能说明过程。'),
    draft([counting, duplicateCheck], '2种上衣和3条裤子的完整清单有6组。删去重复项后只剩5组，下一步应该做什么？', '查找并补上缺少的那组搭配', ['把重复项重新加回去', '把题目改成5组'], '完整清单应有6组不同的配对。', '去重后只有5组，说明还少一种不同搭配，需要重新逐项核对并补齐。'),
    draft([orderedListing, pairing, explainAndVerify], '怎样向伙伴说明“2种帽子和3条围巾共有6种搭配”，并让伙伴检查？', '分两组列出每顶帽子搭配的3条围巾', ['只说2加3等于5', '只展示一顶帽子的搭配'], '每顶帽子都要展示完整的围巾选择。', '列出两顶帽子各自与三条围巾的配对，共六组，伙伴可以逐项核对。'),
    draft([listAndLines, completeRecordCore], '组合清单已按顺序列好，如何邀请伙伴做一次有效复核？', '让伙伴逐项检查两类选择是否都出现且没有重复', ['让伙伴只看标题', '请伙伴随便猜总数'], '复核要检查每组配对、遗漏和重复。', '逐项核对选项与配对，并检查重复和遗漏，才能验证清单。'),
  ],
};

export const grade2Term1MathUnit08SupplementalActivities: Grade2Term1MathUnit08SupplementalActivity[] = Object.entries(drafts).flatMap(([difficulty, items]) => (
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
