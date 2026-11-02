import type { ChoiceActivityDefinition, Difficulty } from '../../content/types';

export type Grade2Term1EnglishUnit01KnowledgePointId =
  | 'family-member-vocabulary'
  | 'family-introduction'
  | 'he-she-pronouns';

export interface Grade2Term1EnglishUnit01SupplementalActivity {
  difficulty: Difficulty;
  sourceUnitId: string;
  knowledgePointIds: Grade2Term1EnglishUnit01KnowledgePointId[];
  activity: ChoiceActivityDefinition;
}

interface Draft {
  knowledgePointIds: Grade2Term1EnglishUnit01KnowledgePointId[];
  prompt: string;
  answer: string;
  distractors: [string, string];
  hint: string;
  explanation: string;
}

const sourceUnitId = 'grade-2/term-1/english/unit-01';
const idPrefix = 'challenge-supplement-grade-2-term-1-english-unit-01';
const vocabulary: Grade2Term1EnglishUnit01KnowledgePointId = 'family-member-vocabulary';
const introduction: Grade2Term1EnglishUnit01KnowledgePointId = 'family-introduction';
const pronouns: Grade2Term1EnglishUnit01KnowledgePointId = 'he-she-pronouns';

const q = (
  knowledgePointIds: Grade2Term1EnglishUnit01KnowledgePointId[],
  prompt: string,
  answer: string,
  distractors: [string, string],
  hint: string,
  explanation: string,
): Draft => ({ knowledgePointIds, prompt, answer, distractors, hint, explanation });

const drafts: Record<Difficulty, Draft[]> = {
  basic: [
    q([vocabulary], 'father 表示哪位家人？', '爸爸', ['妈妈', '姐姐或妹妹'], '想一想这个词表示父亲还是母亲。', 'father 表示“爸爸”。'),
    q([vocabulary], 'mother 表示哪位家人？', '妈妈', ['爸爸', '哥哥或弟弟'], '想一想这个词表示父亲还是母亲。', 'mother 表示“妈妈”。'),
    q([vocabulary], 'sister 表示哪位家人？', '姐姐或妹妹', ['哥哥或弟弟', '奶奶或外婆'], '这个词表示女性兄弟姐妹。', 'sister 表示“姐姐或妹妹”。'),
    q([vocabulary], 'brother 表示哪位家人？', '哥哥或弟弟', ['姐姐或妹妹', '爷爷或外公'], '这个词表示男性兄弟姐妹。', 'brother 表示“哥哥或弟弟”。'),
    q([vocabulary], 'grandfather 表示哪位家人？', '爷爷或外公', ['奶奶或外婆', '妈妈'], 'grandfather 指男性长辈；中文称呼可能随家庭关系而不同。', 'grandfather 可以表示“爷爷或外公”。'),
    q([vocabulary], 'grandmother 表示哪位家人？', '奶奶或外婆', ['爷爷或外公', '姐姐或妹妹'], 'grandmother 指女性长辈；中文称呼可能随家庭关系而不同。', 'grandmother 可以表示“奶奶或外婆”。'),
    q([introduction], '想表达“这是我的妈妈”，应选哪句话？', 'This is my mother.', ['This is my father.', 'This is my sister.'], '在句子里找出表示妈妈的词。', 'mother 表示“妈妈”，所以可以说 This is my mother.'),
    q([introduction], '想表达“这是我的哥哥或弟弟”，应选哪句话？', 'This is my brother.', ['This is my sister.', 'This is my grandfather.'], '哥哥或弟弟对应的英文词是 brother。', 'brother 表示“哥哥或弟弟”，所以可以说 This is my brother.'),
    q([introduction, pronouns], '哪句话表示“他是我的爸爸”？', 'He is my father.', ['She is my father.', 'He is my mother.'], 'father 表示爸爸，介绍这位男性家人时看清句首代词。', 'He is my father. 表示“他是我的爸爸”。'),
    q([introduction, pronouns], '哪句话表示“她是我的姐姐或妹妹”？', 'She is my sister.', ['He is my sister.', 'She is my brother.'], 'sister 表示姐姐或妹妹，介绍她时用 she。', 'She is my sister. 表示“她是我的姐姐或妹妹”。'),
    q([pronouns], '人物卡写着“grandfather”。介绍卡片中的这位家人时，句首应选哪个代词？', 'He', ['She', 'They'], 'grandfather 表示男性长辈。', 'grandfather 表示男性长辈，初步介绍时可用 he。'),
    q([pronouns], '人物卡写着“grandmother”。介绍卡片中的这位家人时，句首应选哪个代词？', 'She', ['He', 'They'], 'grandmother 表示女性长辈。', 'grandmother 表示女性长辈，初步介绍时可用 she。'),
    q([vocabulary, introduction], '词卡写着 sister。哪句话能介绍这位家人？', 'This is my sister.', ['This is my brother.', 'This is my father.'], '先读懂词卡，再选对应的介绍句。', 'sister 表示“姐姐或妹妹”，对应 This is my sister.'),
    q([vocabulary, pronouns], '介绍卡上写着 mother。哪组“家人词—代词”对应正确？', 'mother — she', ['mother — he', 'father — she'], 'mother 表示妈妈，father 表示爸爸。', 'mother 是女性家人，初步介绍时用 she；father 对应用 he。'),
  ],
  advanced: [
    q([vocabulary, introduction], '家庭介绍卡的中文是“这是我的外公”。哪句符合卡片内容？', 'This is my grandfather.', ['This is my grandmother.', 'This is my brother.'], '外公属于 grandfather 所表示的男性长辈。', 'grandfather 可以表示“爷爷或外公”。'),
    q([vocabulary, introduction], '一张人物卡标注“奶奶”。哪句既介绍这位家人，词义也正确？', 'This is my grandmother.', ['This is my grandfather.', 'This is my mother.'], '奶奶是女性长辈，注意 grandmother 的词尾。', 'grandmother 表示“奶奶或外婆”，grandfather 表示男性长辈。'),
    q([introduction, pronouns], '同伴写了“He is my mother.”。要保留 mother，哪处修改能让句子意思一致？', '把 He 改成 She。', ['把 mother 改成 brother。', '把 my 改成 father。'], 'mother 表示妈妈，应该核对句首代词。', 'mother 是女性家人；把 He 改成 She 后，句子与人物称呼一致。'),
    q([vocabulary, pronouns], '两张人物卡分别写着 father 和 sister。哪组代词按卡片顺序对应正确？', 'father：he；sister：she', ['father：she；sister：he', 'father：he；sister：he'], '分别根据两张卡上的家人词判断。', 'father 表示爸爸，对应用 he；sister 表示姐姐或妹妹，对应用 she。'),
    q([vocabulary, introduction], '想把“这是我的姐姐”写在介绍卡上，哪句包含正确的家人词？', 'This is my sister.', ['This is my brother.', 'This is my grandmother.'], '姐姐或妹妹对应 sister。', 'sister 表示“姐姐或妹妹”，所以句子中的家人词应为 sister。'),
    q([vocabulary, introduction], '阅读人物卡“爷爷”。哪句话没有把男性长辈和女性长辈的词弄混？', 'This is my grandfather.', ['This is my grandmother.', 'This is my sister.'], '先根据中文人物卡确定英文家人词。', '“爷爷”对应 grandfather，不是 grandmother 或 sister。'),
    q([vocabulary], '兄弟姐妹词卡要分成“男性”和“女性”两类。哪项分类正确？', 'brother 是男性，sister 是女性。', ['brother 是女性，sister 是男性。', 'brother 和 sister 都表示女性。'], '分别核对两个词表示哥哥弟弟还是姐姐妹妹。', 'brother 表示哥哥或弟弟；sister 表示姐姐或妹妹。'),
    q([introduction, pronouns], '人物卡标注“grandmother”。句子“___ is my grandmother.”应填哪个词？', 'She', ['He', 'My'], '句子介绍的是女性长辈。', 'grandmother 表示女性长辈，句首使用 She。'),
    q([vocabulary, introduction, pronouns], '介绍卡写着“爸爸”。哪句话同时选对称呼和句首代词？', 'He is my father.', ['She is my father.', 'He is my brother.'], '分别检查句首代词和表示爸爸的词。', 'father 表示爸爸，介绍他时用 He is my father.'),
    q([vocabulary, introduction], '卡片上写着“这是我的哥哥”。哪句保留了“这是我的”并选对家人词？', 'This is my brother.', ['He is my sister.', 'This is my grandfather.'], '哥哥或弟弟对应 brother。', 'This is my brother. 表示“这是我的哥哥或弟弟”。'),
    q([vocabulary, pronouns], '小组记录把 father 配成 he、mother 配成 she。哪项核对结论正确？', '两组都正确。', ['只有 father—he 正确。', '两组都需要交换代词。'], '分别确认男性与女性家人的代词。', 'father 对应 he，mother 对应 she，两组记录都正确。'),
    q([introduction, pronouns], '要介绍一位标注为 sister 的家人，哪句话可直接表达“她是我的姐姐或妹妹”？', 'She is my sister.', ['He is my sister.', 'She is my grandmother.'], '比较句首代词与句中的家人词。', 'sister 表示姐姐或妹妹，句首用 She 与人物称呼一致。'),
    q([vocabulary, introduction], '人物卡标注“外婆”。哪句介绍没有把她误写成男性长辈？', 'This is my grandmother.', ['This is my grandfather.', 'This is my father.'], 'grandmother 表示女性长辈。', '外婆对应 grandmother，不是 grandfather 或 father。'),
    q([vocabulary, introduction, pronouns], '记录 A 要介绍“妈妈”，记录 B 要介绍“爷爷”。哪组句子都符合人物卡？', 'A：She is my mother.；B：He is my grandfather.', ['A：He is my mother.；B：She is my grandfather.', 'A：She is my sister.；B：He is my father.'], '分别核对两张人物卡的家人词和代词。', 'mother 对应 she，grandfather 对应 he；两句都与卡片一致。'),
    q([vocabulary, pronouns], '人物卡按顺序是 mother、grandfather、sister。代词栏应按顺序填写哪组？', 'she、he、she', ['he、she、she', 'she、she、he'], '逐张读取家人词，再为每张卡选代词。', 'mother 和 sister 对应 she；grandfather 对应 he。'),
    q([vocabulary, pronouns], '检查表写着 father—he、sister—he、mother—she。只改错的一项，哪种改法正确？', '把 sister—he 改成 sister—she。', ['把 father—he 改成 father—she。', '把 mother—she 改成 mother—he。'], '三项中只有一项代词与家人词不一致。', 'sister 表示姐姐或妹妹，应与 she 配对；father—he 和 mother—she 都正确。'),
    q([vocabulary, introduction, pronouns], '卡片标注“brother”，介绍句写成“She is my brother.”。要保留 brother 这个家人词，哪项修改合适？', '把 She 改成 He。', ['把 brother 改成 mother。', '不用修改，句子已经一致。'], '先保留题目指定的家人词，再核对句首代词。', 'brother 表示哥哥或弟弟，介绍时用 He is my brother.。'),
    q([vocabulary, introduction, pronouns], '两张人物卡分别标注 grandfather 和 sister。哪组完整句子都符合卡片？', 'He is my grandfather.；She is my sister.', ['She is my grandfather.；He is my sister.', 'He is my father.；She is my mother.'], '逐句对照人物卡，分别核对家人词和代词。', 'grandfather 对应 he，sister 对应 she，两句都保留了卡片信息。'),
    q([vocabulary], '复核词语表中的三项：mother—妈妈、brother—哥哥或弟弟、grandmother—奶奶或外婆。哪项核对意见正确？', '三组配对都正确。', ['只有 mother—妈妈正确。', 'brother 和 grandmother 的中文意思需要交换。'], '逐个核对三个英文词对应的家庭成员。', 'mother、brother 和 grandmother 分别与给出的中文意思对应。'),
    q([vocabulary], '中文目录依次写着“妈妈、哥哥或弟弟、奶奶或外婆”。哪组英文词也按这个顺序排列？', 'mother、brother、grandmother', ['mother、sister、grandfather', 'father、brother、grandmother'], '逐项把中文称呼换成对应的英文家人词，再保留原顺序。', '妈妈对应 mother，哥哥或弟弟对应 brother，奶奶或外婆对应 grandmother。'),
    q([vocabulary, introduction, pronouns], '介绍卡依次对应爸爸、姐姐或妹妹、外婆。哪组句子按顺序与三张卡都相符？', 'He is my father.；She is my sister.；She is my grandmother.', ['She is my father.；He is my sister.；She is my grandmother.', 'He is my father.；She is my brother.；He is my grandmother.'], '逐张对照家人称呼，并检查句首代词和卡片顺序。', 'father 对应 he，sister 和 grandmother 对应 she；三句与卡片顺序一致。'),
    q([vocabulary, introduction], '相册要求给“妈妈、哥哥或弟弟、爷爷或外公”三张照片写英文家人标签。哪组标签按顺序都正确？', 'mother、brother、grandfather', ['father、sister、grandmother', 'mother、brother、grandmother'], '按照片顺序逐个核对三个中文称呼。', '妈妈对应 mother，哥哥或弟弟对应 brother，爷爷或外公对应 grandfather。'),
    q([vocabulary, introduction], '阅读介绍卡：“This is my mother. This is my sister.”第二句介绍哪位家人？', '姐姐或妹妹', ['妈妈', '奶奶或外婆'], '看第二句中的家人词，不要把第一句介绍的人物当作答案。', '第二句写着 This is my sister.，介绍的是姐姐或妹妹。'),
  ],
  high: [
    q([vocabulary, introduction, pronouns], '两张卡分别标注 father 和 grandmother。哪组介绍同时符合两张卡？', 'He is my father.；She is my grandmother.', ['She is my father.；He is my grandmother.', 'He is my brother.；She is my mother.'], '按顺序逐张核对家人词与句首代词。', 'father 是男性家人，对应用 he；grandmother 是女性长辈，对应用 she。'),
    q([introduction, pronouns], '人物卡明确写着“sister”。记录为“He is my sister.”。哪项反馈只修正不一致的部分？', '把 He 改成 She，保留 my sister。', ['把 sister 改成 father，保留 He。', '不必修改，句子已经一致。'], '先保留与人物卡相符的家人词，再检查代词。', 'sister 表示姐姐或妹妹，改用 She 后，其余内容可以保留。'),
    q([vocabulary, introduction, pronouns], '家庭介绍表中“妈妈”写为“She is my mother.”，“爷爷”写为“She is my grandfather.”。哪项指出并改正了错误？', '爷爷那行应把 She 改为 He。', ['妈妈那行应把 She 改为 He。', '两行都应把 mother 和 grandfather 交换。'], '逐行核对人物称呼和代词，不要改动正确的一行。', '妈妈对应 she，记录正确；grandfather 对应 he，爷爷那行应改为 He。'),
    q([vocabulary, pronouns], '三张人物卡依次是 father、sister、grandmother。哪组代词按顺序记录正确？', 'he、she、she', ['she、he、he', 'he、he、she'], '逐张卡片按家人词判断，不要调换顺序。', 'father 对应 he；sister 和 grandmother 对应 she。'),
    q([introduction, pronouns], '你要向同学介绍一张标注“姐姐”的卡片，目标是说“她是我的姐姐”。哪句最符合目标？', 'She is my sister.', ['This is my brother.', 'He is my sister.'], '同时检查句子意思和代词是否与 sister 相符。', 'She is my sister. 表示“她是我的姐姐或妹妹”。'),
    q([vocabulary, introduction, pronouns], '卡片甲标着 brother，卡片乙标着 grandmother。哪组完整介绍既没有换错称呼，也没有换错代词？', '甲：He is my brother.；乙：She is my grandmother.', ['甲：She is my brother.；乙：He is my grandmother.', '甲：He is my father.；乙：She is my sister.'], '分别核对两张卡中的名词和代词。', 'brother 对应 he，grandmother 对应 she；两句都保留了卡片称呼。'),
    q([vocabulary, introduction, pronouns], '记录员要检查 father、mother 两张卡。哪条检查说明能同时核对家人词和代词？', 'father 用 he 介绍，mother 用 she 介绍。', ['father 用 she 介绍，mother 用 he 介绍。', 'father 和 mother 都用 he 介绍。'], '分别依据父亲和母亲的英文词义判断代词。', 'father 是男性家人，mother 是女性家人，分别对应 he 和 she。'),
    q([vocabulary, introduction], '介绍卡要求表达“这是我的奶奶或外婆”。哪句保留“这是我的”结构且家人词正确？', 'This is my grandmother.', ['She is my grandfather.', 'This is my mother.'], '区分“这是我的”与“她是我的”，再核对长辈称呼。', 'This is my grandmother. 符合“这是我的奶奶或外婆”。'),
    q([vocabulary, introduction, pronouns], '人物资料：卡甲是 brother，卡乙是 mother。哪条双句记录两项都正确？', '甲：He is my brother.；乙：She is my mother.', ['甲：She is my brother.；乙：He is my mother.', '甲：He is my father.；乙：She is my sister.'], '分别读清两张卡片，再检查每句的代词和家人词。', 'brother 对应 he，mother 对应 she，两句都与人物资料一致。'),
    q([introduction, pronouns], '同伴已经正确写下“She is my sister.”，另一行把 grandmother 写成“He is my grandmother.”。应该怎样处理？', '保留第一行；第二行把 He 改为 She。', ['把第一行的 She 改为 He；第二行不改。', '交换 sister 和 grandmother 两个词。'], '先保留与人物卡相符的记录，只修正另一行的代词。', 'sister 对应 she，第一行正确；grandmother 也对应 she，第二行需改正代词。'),
    q([vocabulary, introduction, pronouns], '三条人物介绍依次对应 grandfather、mother、brother。哪组句子顺序和人物称呼都正确？', 'He is my grandfather.；She is my mother.；He is my brother.', ['She is my grandfather.；He is my mother.；She is my brother.', 'He is my father.；She is my sister.；He is my grandfather.'], '逐条对照给定的三张人物卡。', 'grandfather 和 brother 对应 he，mother 对应 she；家人词也依次匹配。'),
    q([vocabulary, introduction, pronouns], '家庭介绍板上有 grandmother、father、sister 三张卡。哪份核对结果三条都正确？', 'grandmother—She；father—He；sister—She', ['grandmother—He；father—She；sister—She', 'grandmother—She；father—He；sister—He'], '逐个检查女性长辈、男性家人和女性兄弟姐妹。', 'grandmother 与 sister 对应 she，father 对应 he。'),
    q([vocabulary, introduction, pronouns], '复核员发现“她是我的爸爸”写成“She is my father.”。在保留 father 这个目标词的前提下，哪项改动最直接？', '把 She 改成 He。', ['把 father 改成 sister。', '把 my 改成 grandmother。'], '题目要求保留 father，只需核对句首代词。', 'father 表示爸爸，介绍他时使用 He；保留目标词 father。'),
    q([vocabulary, introduction, pronouns], '记录 A 是“She is my grandmother.”，B 是“He is my brother.”，C 是“She is my father.”。哪项检查意见准确？', 'A、B 保留；C 把 She 改成 He。', ['A 改成 He；B 改成 She；C 保留。', '三条记录都需要交换家人词。'], '逐条确认家人词与代词是否一致，只修正不匹配的一条。', 'grandmother 与 brother 的代词分别正确；father 是男性家人，C 应改为 He is my father.'),
    q([vocabulary, introduction, pronouns], '按卡片顺序介绍 sister、grandfather、father。哪组句子同时保留顺序并选对代词？', 'She is my sister.；He is my grandfather.；He is my father.', ['He is my sister.；She is my grandfather.；He is my father.', 'She is my sister.；He is my father.；She is my grandfather.'], '先核对三张卡的顺序，再逐句确认代词。', 'sister 对应 she；grandfather 和 father 都对应 he，句子顺序与卡片一致。'),
    q([vocabulary, introduction, pronouns], '人物卡是 mother、sister、grandfather。记录中 A、C 正确，B 写成“He is my sister.”。哪项只修正不一致处？', '保留 A、C；把 B 的 He 改成 She。', ['把 A、C 的 She 都改成 He；B 保持不变。', '把 B 的 sister 改成 father。'], '对照每张卡片，只修改代词与家人词不匹配的那一行。', 'mother 和 grandfather 的介绍都正确；sister 对应 she，所以只改 B 的 He。'),
    q([vocabulary, introduction, pronouns], '按“___ is my …”句型介绍 father 和 sister，哪组代词按卡片顺序填写正确？', 'He、She', ['She、He', 'He、He'], 'father 是男性家人，sister 是女性兄弟姐妹。', 'father 对应 He，sister 对应 She，因此依次填写 He、She。'),
  ],
};

export const grade2Term1EnglishUnit01SupplementalActivities: Grade2Term1EnglishUnit01SupplementalActivity[] =
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
