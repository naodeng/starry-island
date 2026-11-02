import type { ChoiceActivityDefinition, Difficulty } from '../../content/types';

export type Grade2Term1EnglishUnit04KnowledgePointId =
  | 'community-place-vocabulary'
  | 'location-and-destination-phrases'
  | 'place-purpose-and-sentences';

export interface Grade2Term1EnglishUnit04SupplementalActivity {
  difficulty: Difficulty;
  sourceUnitId: string;
  knowledgePointIds: Grade2Term1EnglishUnit04KnowledgePointId[];
  activity: ChoiceActivityDefinition;
}

interface Draft {
  knowledgePointIds: Grade2Term1EnglishUnit04KnowledgePointId[];
  prompt: string;
  answer: string;
  distractors: [string, string];
  hint: string;
  explanation: string;
}

const sourceUnitId = 'grade-2/term-1/english/unit-04';
const idPrefix = 'challenge-supplement-grade-2-term-1-english-unit-04';
const vocabulary: Grade2Term1EnglishUnit04KnowledgePointId = 'community-place-vocabulary';
const location: Grade2Term1EnglishUnit04KnowledgePointId = 'location-and-destination-phrases';
const purpose: Grade2Term1EnglishUnit04KnowledgePointId = 'place-purpose-and-sentences';

const q = (
  knowledgePointIds: Grade2Term1EnglishUnit04KnowledgePointId[],
  prompt: string,
  answer: string,
  distractors: [string, string],
  hint: string,
  explanation: string,
): Draft => ({ knowledgePointIds, prompt, answer, distractors, hint, explanation });

const drafts: Record<Difficulty, Draft[]> = {
  basic: [
    q([vocabulary, purpose], '朋友想买一本新书。根据本单元的地点词，应该选哪个地方？', 'bookshop', ['supermarket', 'zoo'], '先看一看这次活动要做什么，再找相应的地点词。', 'bookshop 表示书店，适合购买书籍。'),
    q([vocabulary, purpose], '要买日常用品时，哪张社区地点词卡最合适？', 'supermarket', ['bookshop', 'hospital'], '想一想“超市”对应的英文词卡。', 'supermarket 表示超市，是购买日常用品的地点。'),
    q([vocabulary, purpose], '活动卡写着“观察动物”。应该把目的地写成哪个英文地点词？', 'zoo', ['park', 'school'], '先从地点词卡中找出可以观察动物的地方。', 'zoo 表示动物园，符合观察动物的活动。'),
    q([vocabulary, purpose], '想在户外散步，地点选择卡上应勾选哪一项？', 'park', ['hospital', 'bookshop'], '这张卡要找适合休闲活动的地点。', 'park 表示公园，可以用于户外散步或休闲。'),
    q([vocabulary, purpose], '今天要去上课。地点词卡上应写哪个英语单词？', 'school', ['zoo', 'supermarket'], '从本单元的地点词中找学习的地方。', 'school 表示学校，是上课的地点。'),
    q([vocabulary, purpose], '需要去看医生，哪张地点卡对应这一去处？', 'hospital', ['bookshop', 'park'], '想一想本单元中看病的地点词。', 'hospital 表示医院。'),
    q([vocabulary, location], '目的地卡是 bookshop。哪句完整表达“我正要去书店”？', 'I am going to the bookshop.', ['I am at the bookshop.', 'I am going the bookshop.'], '要表达前往某地，留意 going 后面的词。', 'I am going to the bookshop. 表示我正要去书店。'),
    q([vocabulary, location], '位置记录写着“She — park”，表示她此刻在公园。哪句符合记录？', 'She is at the park.', ['She is going to the park.', 'Where is she?'], '记录说的是已经所在的位置，不是将要前往的地点。', 'She is at the park. 表示她在公园。'),
    q([location], '小星星想问同伴接下来要去哪里，应该选择哪句？', 'Where are you going?', ['Where are you?', 'Where is she?'], '要问目的地，句子里要包含表示前往的意思。', 'Where are you going? 用来询问“你要去哪里？”。'),
    q([vocabulary, location], '位置记录是“She — hospital”。选择表示她当前在医院的句子。', 'She is at the hospital.', ['She is going to the hospital.', 'She are at the hospital.'], '注意人物是 she，并确认记录说的是当前所在地点。', 'She is at the hospital. 表示她在医院。'),
    q([vocabulary, location], '地图标记说明 He 已经在 zoo。哪句描述他所在的位置？', 'He is at the zoo.', ['He is going to the zoo.', 'Where is he going?'], '已经在某地和正要去某地要用不同表达。', 'He is at the zoo. 表示他在动物园。'),
    q([location], '同伴说：“She is at the park.”如果想问她现在在哪里，应说哪句？', 'Where is she?', ['Where are you?', 'Where are you going?'], '问题要询问一位女孩当前的位置。', 'Where is she? 用来询问“她在哪里？”。'),
    q([vocabulary, location], '请把“我们正要去学校”写成英语句子，哪项符合本单元用法？', 'We are going to school.', ['We are at school.', 'Where are you going to school?'], '这句话表达前往学校，school 前通常不加 the。', 'We are going to school. 表示我们正要去学校。'),
    q([location], '句子要表达“此刻在书店”，地点短语前应选择哪个词？', 'at', ['going to', 'where'], '当前所在位置与前往目的地的表达不同。', 'at the bookshop 表示在书店。'),
  ],
  advanced: [
    q([vocabulary, location, purpose], '记录卡 A 的目的地是超市，记录卡 B 表示人在医院。哪组句子按 A、B 顺序同时符合两张卡？', 'A：I am going to the supermarket.；B：I am at the hospital.', ['A：I am at the supermarket.；B：I am going to the hospital.', 'A：I am going to the zoo.；B：I am at the bookshop.'], '分别辨认 A 的目的地和 B 的当前位置，再选对应表达。', 'going to the supermarket 表示前往超市；at the hospital 表示在医院。'),
    q([vocabulary, location], '目的地卡是动物园；同伴问“你正要去哪里？”。哪组提问和回答顺序正确？', 'Where are you going?；I am going to the zoo.', ['Where are you?；I am at the zoo.', 'Where is she?；I am going to the park.'], '先确认问句询问目的地，再根据卡片选择地点。', 'Where are you going? 可回答 I am going to the zoo.。'),
    q([vocabulary, purpose], '用途表：A 买书→bookshop；B 看病→hospital。记录写 A bookshop、B park。只修正 B，应该怎样改？', '把 B 的 park 改成 hospital。', ['把 A 的 bookshop 改成 zoo。', '把 B 的 park 改成 supermarket。'], 'A 已符合用途，检查 B 对应的地点词。', 'hospital 表示医院，与看病的用途相符。'),
    q([vocabulary, purpose], '小队依次要买书、购买日用品、观察动物。哪组地点词保持了三个目的的顺序？', 'bookshop → supermarket → zoo', ['supermarket → zoo → bookshop', 'zoo → bookshop → hospital'], '逐个将活动目的和地点词配对，再核对先后次序。', '买书去 bookshop，买日用品去 supermarket，观察动物去 zoo。'),
    q([vocabulary, location], '要表达“我们正要去学校”，哪句话词序正确，也符合本单元的 school 用法？', 'We are going to school.', ['We are going school.', 'We are going to the school.'], '检查 going 后是否有 to，也留意 school 前的用法。', '本单元用 We are going to school. 表示我们正要去学校。'),
    q([location], '甲要问同伴当前的位置，乙要问同伴的目的地。选择甲、乙顺序对应的两句问话。', 'A：Where are you?；B：Where are you going?', ['A：Where are you going?；B：Where are you?', 'A：Where is she?；B：Where are you?'], '区分询问“在哪里”和“要去哪里”。', 'Where are you? 问当前位置；Where are you going? 问目的地。'),
    q([vocabulary, purpose], '两张用途卡分别写“购买书籍”和“观察动物”。哪组地点配对都正确？', 'bookshop→买书；zoo→看动物。', ['supermarket→买书；park→看动物。', 'hospital→买书；school→看动物。'], '逐张核对地点词和卡片上的活动用途。', 'bookshop 对应买书，zoo 对应看动物。'),
    q([vocabulary, location], '地点记录写着“She 当前在医院”。哪句只表达她现在的位置，没有说她正要前往？', 'She is at the hospital.', ['She is going to the hospital.', 'Where is she going?'], '从句子中判断是当前位置还是前往方向。', 'at the hospital 表示在医院；going to 表示正要前往。'),
    q([vocabulary, location], '小敏现在在公园，之后正要去书店。哪组句子按“当前地点、前往地点”的顺序表达准确？', 'A：I am at the park.；B：I am going to the bookshop.', ['A：I am going to the park.；B：I am at the bookshop.', 'A：I am at the zoo.；B：I am going to the hospital.'], '先读清两条记录的状态，再分别选择 at 或 going to。', 'A 表示当前在公园，B 表示正要去书店。'),
    q([vocabulary, purpose], '用途卡把“学习”和“就医”分成两类。哪组地点说明与卡片一致？', 'school 用于学习；hospital 用于就医。', ['school 用于就医；hospital 用于学习。', 'bookshop 用于学习；zoo 用于就医。'], '核对两个英文地点词所对应的常见用途。', 'school 是学习的地方，hospital 是就医的地方。'),
    q([vocabulary, location], '答题卡的问题是“他在哪里？”，位置记录为动物园。选择正确的问答组合。', 'Where is he?；He is at the zoo.', ['Where is he going?；He is going to the park.', 'Where are you?；I am at the hospital.'], '问题问当前位置，回答要保留人物和地点信息。', 'Where is he? 可回答 He is at the zoo.。'),
    q([vocabulary, location, purpose], '活动 A 是买书；活动 B 的句子要表达“我正要去公园”。哪项同时填对地点词和完整句子？', 'A：书店；B：I am going to the park.', ['A：动物园；B：I am at the park.', 'A：医院；B：Where are you going?'], '分别完成用途选地点和目的地句子两项。', '买书可选 bookshop；I am going to the park. 表示正要去公园。'),
    q([vocabulary, location], '现在所在地点是书店。哪张英文短语卡表示“在书店”，而不是“正要去书店”？', 'at the bookshop', ['going to the bookshop', 'Where are you?'], '看短语表达的位置状态。', 'at the bookshop 表示在书店；going to the bookshop 表示正要去书店。'),
    q([vocabulary, location], '“正要前往超市”这一意思对应哪张地点短语卡？', 'going to the supermarket', ['at the supermarket', 'Where is she?'], '要表达前往某地，留意 going to。', 'going to the supermarket 表示正要去超市。'),
    q([vocabulary, location], '请校对两句话：“We are going school.”和“She is at hospital.”。哪项同时修正了前往表达和地点表达？', 'We are going to school.；She is at the hospital.', ['We are at school.；She is going hospital.', 'We are going to the zoo.；She is at the park.'], '分别检查 going 后的词和 hospital 前的表达。', '前往学校用 going to school；在医院用 at the hospital。'),
    q([vocabulary, location], '两张句子卡都写着 park：A 的中文是“在公园”；B 的中文是“正要去公园”。B 卡误填 at the park，只需替换哪段短语？', '把 at the park 换成 going to the park。', ['把 going to the park 换成 at the park。', '把 at the park 换成 at the bookshop。'], '保留地点 park，只调整它表示的位置状态。', 'at the park 表示在公园；going to the park 表示正要去公园。'),
    q([vocabulary, location], '行程卡只写了目的地“书店”；如果要用一句问话确认同伴准备去哪里，应选哪句？', 'Where are you going?', ['Where are you?', 'Where is she?'], '问题要确认目的地，而不是当前位置。', 'Where are you going? 询问对方准备去哪里。'),
  ],
  high: [
    q([vocabulary, location, purpose], '活动卡记录：A 我现在在动物园；B 她现在在公园；C 我们正要去学校。哪组英语句子按 A、B、C 顺序全部对应？', 'A：I am at the zoo.；B：She is at the park.；C：We are going to school.', ['A：I am going to the zoo.；B：She is at the park.；C：We are at school.', 'A：I am at the hospital.；B：She is going to the park.；C：We are going to the zoo.'], '逐项核对三张卡的地点、人物和当前/前往状态。', 'A、B 表示当前所在，用 at；C 表示前往学校，用 going to。'),
    q([vocabulary, location], '三张记录卡：A 正要去书店；B 已在医院；C 已在公园。句子把 A 写成“I am going to the park.”，B、C 均正确。哪项反馈只修正错误记录？', 'A改为“I am going to the bookshop.”；B、C保持原句。', ['A、B、C都改成 going to the zoo。', 'A保留原句；把 B 和 C 都改成 at the bookshop。'], '只改动与 A 目的地不符的词，保留已核对正确的记录。', 'A 的目的地应是 bookshop；B、C 的当前位置记录没有问题。'),
    q([vocabulary, purpose], '社区活动单：A 买书；B 买日用品；C 看动物。哪组地点词按 A、B、C 顺序与用途相配？', 'A：bookshop；B：supermarket；C：zoo。', ['A：supermarket；B：bookshop；C：park。', 'A：zoo；B：hospital；C：school。'], '分别把三项活动和地点用途配对。', '买书去 bookshop，买日用品去 supermarket，看动物去 zoo。'),
    q([location], '任务要按顺序完成三种提问：A 问“你在哪里？”；B 问“你正要去哪里？”；C 问“她在哪里？”。哪组问句对应正确？', 'A：Where are you?；B：Where are you going?；C：Where is she?', ['A：Where are you going?；B：Where is she?；C：Where are you?', 'A：Where is she?；B：Where are you?；C：Where are you going?'], '依次检查对象是 you 还是 she，以及问题问位置还是目的地。', 'A 问 you 的当前地点，B 问 you 的目的地，C 问 she 的当前地点。'),
    q([vocabulary, purpose], '请把六张地点卡放进三栏：购物（买书/日用品）、游览休闲（看动物/散步）、学习就医。哪种分类全部正确？', '购物：bookshop、supermarket；游览休闲：zoo、park；学习就医：school、hospital。', ['购物：zoo、park；游览休闲：school、hospital；学习就医：bookshop、supermarket。', '购物：school、zoo；游览休闲：hospital、bookshop；学习就医：park、supermarket。'], '每个地点只按题目给出的用途线索分类。', '书店和超市用于购物；动物园和公园用于游览休闲；学校和医院分别对应学习、就医。'),
    q([vocabulary, location], '状态卡先写“他已经在学校”，下一张卡写“他要去医院”。哪组句子保留了两种不同状态？', 'He is at school.；He is going to the hospital.', ['He is going to school.；He is at the hospital.', 'He is at the zoo.；He is going to the park.'], '第一句表示当前位置，第二句表示将前往的目的地。', 'at school 表示在学校；going to the hospital 表示正要去医院。'),
    q([vocabulary, purpose], '三位同学的活动卡：A 看动物；B 买一本书；C 去上课。地点安排哪项全部符合？', 'A→zoo；B→bookshop；C→school。', ['A→park；B→supermarket；C→hospital。', 'A→hospital；B→zoo；C→bookshop。'], '逐个根据活动目的选择地点，不要交换 A、B、C 的顺序。', 'zoo 对应看动物，bookshop 对应买书，school 对应上课。'),
    q([vocabulary, location], '阅读三句：A We are going to the park.；B She is at the hospital.；C He is going to school.。哪项分析准确？', 'A、C 用 going to 表示前往；B 用 at 表示所在地点。', ['A、B 用 at 表示前往；C 用 going to 表示当前位置。', '三句都只表示当前位置。'], '分别判断每句描述的是到达前的位置，还是正要前往。', 'going to 表示前往；at 表示当前在某地点。'),
    q([location], '问题表：A 问“你在哪里？”；B 问“你要去哪里？”；C 问“她在哪里？”。A、C 已写对，B 也误写成 Where are you?。哪项只改正 B？', '把 B 的 Where are you? 改为 Where are you going?。', ['把 A、B、C 全改成 Where is she?。', '把 A 改成 Where are you going?，B、C 保持不变。'], '先识别只有 B 询问目的地，再替换它的问句。', 'Where are you going? 询问目的地；A、C 的当前地点问句应保留。'),
    q([vocabulary, location], '记录 A 是“我已在超市”，记录 B 是“她正要去公园”。哪组句子与两条状态完全一致？', 'A：I am at the supermarket.；B：She is going to the park.', ['A：I am going to the supermarket.；B：She is at the park.', 'A：I am at the bookshop.；B：She is going to the zoo.'], '分开检查当前位置、目的地、人物和地点词。', 'A 用 at the supermarket，B 用 She is going to the park.。'),
    q([vocabulary, purpose], '社区词卡上有“school、hospital、bookshop、supermarket”。哪项同时把学习/就医和购物地点分对？', '学习/就医：school、hospital；购物：bookshop、supermarket。', ['学习/就医：bookshop、supermarket；购物：school、hospital。', '学习/就医：zoo、park；购物：school、bookshop。'], '把同一类用途的两个地点放在一起。', 'school 和 hospital 对应学习、就医；bookshop 和 supermarket 对应购物。'),
    q([vocabulary, location, purpose], '问题问“他在哪里？”，记录说他在医院；另一张卡写“我正要去动物园”。哪组文字保持了人物、地点和状态？', 'A：Where is he?；B：He is at the hospital.；C：I am going to the zoo.', ['A：Where are you going?；B：He is going to the hospital.；C：I am at the zoo.', 'A：Where is she?；B：He is at the park.；C：I am going to school.'], '逐项比对提问对象、当前位置和目的地。', 'A 问 he 的位置，B 表示 he 在医院，C 表示我正要去动物园。'),
    q([vocabulary, location, purpose], '地点提示写着“动物园”，状态提示写着“已经在这里”。哪句话同时符合用途和状态？', 'I am at the zoo.', ['I am going to the zoo.', 'I am at the bookshop.'], '先按地点提示选词，再区分已在此处和正要前往。', 'zoo 对应动物园；at the zoo 表示已经在动物园。'),
    q([vocabulary, location, purpose], '小向导要先判断活动目的，再根据卡片的“现在所在/正要去”选择表达。哪条操作顺序能分别得到“看动物—已在动物园”和“买书—正要去书店”？', '先按用途选地点，再根据“正在那里/正要前往”选 at 或 going to。', ['先随意选地点，再把所有句子都改成 going to。', '先选疑问句，再忽略卡片上的活动目的和状态。'], '两类提示分别决定地点词和句子中的状态表达。', '活动目的决定 zoo 或 bookshop；当前位置用 at，前往目的地用 going to。'),
    q([vocabulary, location, purpose], '记录卡：A 想上课且已经在学校；B 要去医院看医生；C 已经在公园。哪组选句同时符合三人的活动与当前位置/目的地？', 'We are at school.；She is going to the hospital.；I am at the park.', ['We are going to school.；She is at the hospital.；I am going to the park.', 'We are at the zoo.；She is going to the bookshop.；I am at the supermarket.'], '先根据活动和状态选择地点，再检查句子表达。', 'at school 表示在学校；going to the hospital 表示正要去医院；at the park 表示在公园。'),
    q([vocabulary, location, purpose], '两张活动卡分别是“已在动物园看动物”和“正要去书店买书”。哪组句子保留了两项用途及状态？', 'A：I am at the zoo.；B：I am going to the bookshop.', ['A：I am going to the zoo.；B：I am at the bookshop.', 'A：I am at the hospital.；B：I am going to the park.'], '逐项核对动物园/书店的用途，以及已经在/正要去的状态。', 'A 表示已经在动物园；B 表示正要去书店。'),
    q([vocabulary, location, purpose], '值班表有三条记录：A 人在动物园；B 正要去超市；C 已在学校。哪组地点短语按 A、B、C 顺序正确？', 'A：at the zoo；B：going to the supermarket；C：at school。', ['A：going to the zoo；B：at the supermarket；C：going to school。', 'A：at the hospital；B：going to the park；C：at the bookshop。'], '每条记录都要同时保留地点和当前位置/目的地状态。', 'A、C 是当前地点，用 at；B 是前往目的地，用 going to。'),
  ],
};

export const grade2Term1EnglishUnit04SupplementalActivities: Grade2Term1EnglishUnit04SupplementalActivity[] =
  (Object.entries(drafts) as [Difficulty, Draft[]][]).flatMap(([difficulty, items]) => items.map((item, index) => {
    const correctOptionIndex = ((index + 1) % 3) as 0 | 1 | 2;
    const options = [...item.distractors];
    options.splice(correctOptionIndex, 0, item.answer);
    return {
      difficulty,
      sourceUnitId,
      knowledgePointIds: item.knowledgePointIds,
      activity: {
        id: `${idPrefix}-${difficulty}-${String(index + 1).padStart(2, '0')}`,
        kind: 'choice',
        prompt: item.prompt,
        options: options.map((label, optionIndex) => ({ id: `option-${optionIndex + 1}`, label })),
        correctOptionId: `option-${correctOptionIndex + 1}`,
        hint: item.hint,
        explanation: item.explanation,
      },
    };
  }));
