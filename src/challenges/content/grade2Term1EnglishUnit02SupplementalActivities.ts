import type { ChoiceActivityDefinition, Difficulty } from '../../content/types';

export type Grade2Term1EnglishUnit02KnowledgePointId =
  | 'people-vocabulary'
  | 'friend-classmate-vocabulary'
  | 'he-she-pronouns';

export interface Grade2Term1EnglishUnit02SupplementalActivity {
  difficulty: Difficulty;
  sourceUnitId: string;
  knowledgePointIds: Grade2Term1EnglishUnit02KnowledgePointId[];
  activity: ChoiceActivityDefinition;
}

interface Draft {
  knowledgePointIds: Grade2Term1EnglishUnit02KnowledgePointId[];
  prompt: string;
  answer: string;
  distractors: [string, string];
  hint: string;
  explanation: string;
}

const sourceUnitId = 'grade-2/term-1/english/unit-02';
const idPrefix = 'challenge-supplement-grade-2-term-1-english-unit-02';
const people: Grade2Term1EnglishUnit02KnowledgePointId = 'people-vocabulary';
const relationships: Grade2Term1EnglishUnit02KnowledgePointId = 'friend-classmate-vocabulary';
const pronouns: Grade2Term1EnglishUnit02KnowledgePointId = 'he-she-pronouns';

const q = (
  knowledgePointIds: Grade2Term1EnglishUnit02KnowledgePointId[],
  prompt: string,
  answer: string,
  distractors: [string, string],
  hint: string,
  explanation: string,
): Draft => ({ knowledgePointIds, prompt, answer, distractors, hint, explanation });

const drafts: Record<Difficulty, Draft[]> = {
  basic: [
    q([people], '图卡画着一位小男孩。给图卡贴英文人物词，应选哪个？', 'boy', ['girl', 'man'], '先辨认图卡中人物的年龄和性别。', 'boy 表示男孩。'),
    q([people], '图卡画着一位小女孩。给图卡贴英文人物词，应选哪个？', 'girl', ['boy', 'woman'], '先辨认图卡中人物的年龄和性别。', 'girl 表示女孩。'),
    q([people], '图卡画着一位成年男士。给图卡贴英文人物词，应选哪个？', 'man', ['boy', 'woman'], '这位人物是成年男性。', 'man 表示男人或男士。'),
    q([people], '图卡画着一位成年女士。给图卡贴英文人物词，应选哪个？', 'woman', ['girl', 'man'], '这位人物是成年女性。', 'woman 表示女人或女士。'),
    q([relationships], '王同学和你在同一个班。介绍他的班级身份，哪个英文词最合适？', 'classmate', ['friend', 'boy'], '想一想哪个词表示同班同学。', 'classmate 表示同班同学。'),
    q([relationships], '课间常和你一起玩的伙伴，可以称作什么？', 'friend', ['classmate', 'woman'], '想一想哪个词表示朋友。', 'friend 表示朋友。'),
    q([people, pronouns], '中文卡片写着“他是一个男孩”。哪句英文介绍符合卡片？', 'He is a boy.', ['She is a girl.', 'He is a man.'], '先找表示男孩的词，再看句首代词。', '“他是一个男孩”可以说 He is a boy.'),
    q([people, pronouns], '中文卡片写着“她是一个女孩”。哪句英文介绍符合卡片？', 'She is a girl.', ['He is a boy.', 'She is a woman.'], '先找表示女孩的词，再看句首代词。', '“她是一个女孩”可以说 She is a girl.'),
    q([relationships, pronouns], '中文卡片写着“他是我的朋友”。哪句英文介绍符合卡片？', 'He is my friend.', ['She is my friend.', 'He is my classmate.'], 'friend 表示朋友，介绍他时要留意句首。', '“他是我的朋友”可以说 He is my friend.'),
    q([relationships, pronouns], '中文卡片写着“她是我的同班同学”。哪句英文介绍符合卡片？', 'She is my classmate.', ['He is my classmate.', 'She is my friend.'], 'classmate 表示同班同学，介绍她时要留意句首。', '“她是我的同班同学”可以说 She is my classmate.'),
    q([people, pronouns], '中文说明是“他是一位男士”。哪句英文介绍符合说明？', 'He is a man.', ['She is a woman.', 'He is a boy.'], '说明中的人物是成年男性。', 'man 表示男士，介绍他时用 he。'),
    q([people, pronouns], '中文说明是“她是一位女士”。哪句英文介绍符合说明？', 'She is a woman.', ['He is a man.', 'She is a girl.'], '说明中的人物是成年女性。', 'woman 表示女士，介绍她时用 she。'),
    q([people, pronouns], '班级照片里是一位男孩。用英文代词介绍这位人物，句首应选哪个词？', 'He', ['She', 'My'], '男孩对应“他”的代词。', '介绍男性人物时可以用 He。'),
    q([people, pronouns], '班级照片里是一位女孩。用英文代词介绍这位人物，句首应选哪个词？', 'She', ['He', 'My'], '女孩对应“她”的代词。', '介绍女性人物时可以用 She。'),
    q([people, pronouns], '人物卡顺序是 woman、boy。哪组代词按卡片顺序填写正确？', 'She；He', ['He；She', 'She；She'], '先按顺序辨认两个人物，再分别选择代词。', 'woman 对应 She，boy 对应 He；按原顺序填写为 She、He。'),
    q([relationships], '资料卡 A 写着“和你同班”，资料卡 B 写着“常一起玩”。哪组英文关系词按卡片顺序正确？', 'classmate；friend', ['friend；classmate', 'boy；girl'], 'A 描述班级关系，B 描述朋友关系。', '同班同学对应 classmate，朋友对应 friend，顺序为 classmate、friend。'),
  ],
  advanced: [
    q([people], '两张人物卡依次是“小男孩”和“成年女士”。英文词卡应按顺序选哪组？', 'boy；woman', ['girl；man', 'man；girl'], '按顺序分别辨认人物的年龄和性别。', '小男孩对应 boy，成年女士对应 woman。'),
    q([relationships], '小林和你同班，放学后也常一起玩。哪项能同时描述这两种关系？', '他是我的同班同学，也是我的朋友。', ['他是我的男孩，也是我的女士。', '他是我的朋友，所以不是我的同班同学。'], '一个人可以同时拥有班级关系和朋友关系。', 'classmate 和 friend 表示不同关系，同一个人可以同时是同班同学和朋友。'),
    q([relationships, pronouns], '中文资料写着“他是我的同班同学”。哪句完整英文与资料一致？', 'He is my classmate.', ['She is my classmate.', 'He is my friend.'], '同时核对句首代词和班级身份词。', 'classmate 表示同班同学，he 对应“他”。'),
    q([relationships, pronouns], '中文资料写着“她是我的朋友”。哪句完整英文与资料一致？', 'She is my friend.', ['He is my friend.', 'She is my classmate.'], '同时核对句首代词和朋友关系词。', 'friend 表示朋友，she 对应“她”。'),
    q([people, pronouns], '人物卡是成年男性。哪句介绍同时选对人物词和代词？', 'He is a man.', ['She is a man.', 'He is a boy.'], '人物是成年男性，不是男孩。', 'man 表示成年男性，介绍时用 he。'),
    q([people, pronouns], '人物卡是女孩。哪句介绍同时选对人物词和代词？', 'She is a girl.', ['He is a girl.', 'She is a woman.'], '人物是女孩，不是成年女士。', 'girl 表示女孩，介绍时用 she。'),
    q([people, relationships], '词卡上依次画着男孩和一位同班同学。哪组英文词按顺序贴对了？', 'boy；classmate', ['man；friend', 'woman；classmate'], '第一张是人物称呼，第二张表示同班关系。', '男孩对应 boy，同班同学对应 classmate。'),
    q([people, pronouns], '人物卡写着“男孩”，句子要保留 boy。原句“She is a boy.”应怎样改？', '把 She 改成 He。', ['把 boy 改成 woman。', '不用修改，句子已符合人物卡。'], '保留题目指定的 boy，只检查句首代词。', 'boy 表示男孩，介绍时用 He is a boy.'),
    q([people, pronouns], '人物卡写着“女孩”，句子要保留 girl。原句“He is a girl.”应怎样改？', '把 He 改成 She。', ['把 girl 改成 man。', '不用修改，句子已符合人物卡。'], '保留题目指定的 girl，只检查句首代词。', 'girl 表示女孩，介绍时用 She is a girl.'),
    q([relationships, pronouns], '两张卡依次写着“朋友”“同班同学”，人物都是女性。哪组英文按顺序都正确？', 'She is my friend.；She is my classmate.', ['He is my friend.；She is my classmate.', 'She is my classmate.；He is my friend.'], '先保留关系词顺序，再核对两句都介绍女性。', '朋友对应 friend，同班同学对应 classmate；介绍两位女性都用 she。'),
    q([people, relationships], '人物词语栏要放入“男孩、女孩、男人、女人”，而关系词语栏放入“朋友、同班同学”。哪项整理方法正确？', '四个称呼放入人物词语栏，两个关系放入关系词语栏。', ['把 friend 放入人物词语栏，把 boy 放入关系词语栏。', '把 man 和 classmate 都放入关系词语栏。'], '分清描述人物本身的词和表示同伴关系的词。', 'boy、girl、man、woman 表示人物；friend、classmate 表示关系。'),
    q([people], '阅读两句：“This is a boy. This is a woman.”第二句介绍哪类人物？', '成年女性', ['男孩', '成年男性'], '只看第二句中的人物词。', 'woman 表示成年女性。'),
    q([people, relationships], '记录员要把“女孩、朋友”分别换成英文。哪组词按中文顺序正确？', 'girl；friend', ['boy；classmate', 'woman；friend'], '第一个表示女孩，第二个表示朋友。', '女孩对应 girl，朋友对应 friend。'),
    q([people, pronouns], '人物卡按顺序是“女士、男孩”。哪组代词按顺序填写正确？', 'She；He', ['He；She', 'She；She'], '女士对应 she，男孩对应 he。', 'woman 对应 She，boy 对应 He。'),
    q([people, relationships, pronouns], '资料是“女孩同班同学、男孩朋友”。哪组句子按顺序同时符合称呼、关系和代词？', 'She is my classmate.；He is my friend.', ['He is my classmate.；She is my friend.', 'She is my friend.；He is my classmate.'], '逐句核对人物性别与关系词，保留资料顺序。', '女孩对应 she，男孩对应 he；classmate 和 friend 也与资料顺序匹配。'),
    q([relationships], '小安和你在同班，但你们还不熟。哪项最准确地表达已经知道的信息？', 'classmate', ['friend', 'woman'], '题目只说明同一个班，没有说明已经成为朋友。', 'classmate 表示同班同学；friend 表示朋友，题目没有提供朋友关系。'),
    q([people], '词语表里要找“成年男性”和“成年女性”两个英文词。哪组符合要求？', 'man；woman', ['boy；girl', 'girl；man'], '成年人物与男孩、女孩使用不同的词。', 'man 表示成年男性，woman 表示成年女性。'),
    q([people, relationships], '小组检查两张卡：A 是一位男孩，B 表示一位同班同学。哪条核对意见正确？', 'A 是人物称呼，B 是同班关系。', ['A 表示朋友关系，B 表示成年女性。', 'A 和 B 都是表示年龄的词。'], '分辨人物本身和人与班级之间的关系。', 'boy 表示男孩，classmate 表示同班同学，类别不同。'),
    q([relationships, pronouns], '两句介绍中，第一句表达“他是我的朋友”，第二句表达“她是我的同班同学”。哪组句子按顺序正确？', 'He is my friend.；She is my classmate.', ['She is my friend.；He is my classmate.', 'He is my classmate.；She is my friend.'], '核对代词、关系词和句子顺序。', '第一句用 He 和 friend，第二句用 She 和 classmate。'),
    q([people, relationships, pronouns], '图卡顺序是女孩、成年男士、朋友。哪组英文词按顺序与卡片相符？', 'girl；man；friend', ['woman；boy；classmate', 'girl；woman；friend'], '逐张读出人物称呼或关系信息。', '女孩对应 girl，成年男士对应 man，朋友对应 friend。'),
    q([relationships, pronouns], '资料卡写着“她是我的朋友”，记录却是“She is my classmate.”。要保留人物代词，哪项修改能让关系与资料一致？', '把 classmate 改成 friend。', ['把 She 改成 He。', '把 my 改成 boy。'], '资料已经说明是朋友，检查句中的关系词。', 'friend 表示朋友；将 classmate 改为 friend 后，句子与资料一致。'),
  ],
  high: [
    q([people, relationships, pronouns], '展示卡依次写着“男孩的朋友”“女孩的同班同学”。哪组句子同时符合人物、关系与顺序？', 'He is my friend.；She is my classmate.', ['She is my friend.；He is my classmate.', 'He is my classmate.；She is my friend.'], '逐条检查人物代词、关系词和卡片顺序。', '男孩介绍用 he，女孩用 she；friend 和 classmate 依照卡片顺序填写。'),
    q([people, relationships, pronouns], '小组记录 A「She is my friend.」对应女孩朋友，B「He is my classmate.」对应男孩同学。哪项检查结论正确？', 'A、B 两条都符合记录。', ['只有 A 符合，B 的 He 应改为 She。', '只有 B 符合，A 的 friend 应改为 classmate。'], '逐条对照人物卡和关系词，不要只看一句。', 'A 中 she 和 friend 正确，B 中 he 和 classmate 也正确。'),
    q([people, relationships, pronouns], 'A 卡是女士朋友，B 卡是男孩同班同学。哪组句子按顺序正确？', 'She is my friend.；He is my classmate.', ['He is my friend.；She is my classmate.', 'She is my classmate.；He is my friend.'], '分别核对两张卡的性别信息和关系信息。', '女士用 she，男孩用 he；friend 和 classmate 与卡片顺序对应。'),
    q([people, pronouns], '校对三句：A「He is a boy.」B「She is a woman.」C「She is a man.」。哪项只指出不一致的一句？', '只有 C 的代词与人物词不一致。', ['只有 A 不一致。', 'A、B、C 都不一致。'], '逐句核对 he/she 与 boy、woman、man 的对应。', 'boy 对应 he，woman 对应 she；man 是男性人物，C 应使用 he。'),
    q([people, relationships], '名册要求按“人物称呼、关系称呼、人物称呼”排列：成年女士、同班同学、男孩。哪组词符合顺序？', 'woman；classmate；boy', ['girl；friend；man', 'woman；boy；classmate'], '按题目给出的三类顺序逐一匹配。', '成年女士对应 woman，同班同学对应 classmate，男孩对应 boy。'),
    q([people, relationships, pronouns], '同伴写了两条介绍：女孩朋友“She is my friend.”；男孩同学“She is my classmate.”。要保留两种关系词，哪项修改准确？', '把第二句的 She 改成 He。', ['把第一句的 She 改成 He。', '把第二句的 classmate 改成 woman。'], '两条关系词都符合卡片，检查第二位人物的性别。', '女孩朋友使用 she；男孩同班同学应使用 he。'),
    q([people, relationships], '四张卡分别是 boy、girl、friend、classmate。哪项分组既区分人物称呼和关系，又没有漏卡？', 'boy 和 girl 是人物称呼；friend 和 classmate 是关系词。', ['boy 和 friend 是人物称呼；girl 和 classmate 是关系词。', '四张卡都只表示人物性别。'], '根据词义整理两类卡片。', 'boy、girl 表示人物，friend、classmate 表示同伴关系。'),
    q([people, pronouns], '照片顺序是成年女士、男孩、成年男士。哪组代词按顺序填写正确？', 'She；He；He', ['He；She；She', 'She；She；He'], 'woman 对应 she，boy 和 man 对应 he。', '成年女士用 She；男孩和成年男士用 He。'),
    q([relationships, pronouns], '阅读介绍：“He is my friend. She is my classmate.”。哪项按顺序说明两句中的关系？', '第一句介绍朋友，第二句介绍同班同学。', ['第一句介绍同班同学，第二句介绍朋友。', '两句都只说明人物年龄。'], '分别读两句中的关系词。', 'friend 表示朋友，classmate 表示同班同学。'),
    q([people, relationships, pronouns], '检查 A「男孩朋友—He is my friend.」、B「女孩同学—She is my classmate.」、C「男士朋友—She is my friend.」。哪条只需改代词？', 'C 的 She 改为 He。', ['A 的 He 改为 She。', 'B 的 classmate 改为 woman。'], 'A、B 对照人物都匹配，检查 C 的人物性别。', 'man 表示男性，C 应用 He；A、B 与资料一致。'),
    q([people, relationships], '小明在班里认识一位男孩；小红在同一个班，也和这位男孩常一起玩。哪项信息可以同时成立？', '这位男孩可以既是同班同学，也是朋友。', ['只要是同班同学，就不能是朋友。', 'friend 表示男孩，classmate 表示女孩。'], '班级关系和朋友关系并不互相排斥。', 'classmate 和 friend 表示两种不同关系，同一个人可以同时符合。'),
    q([people, relationships, pronouns], '三张人物卡是“男孩朋友、女士同学、女孩朋友”。哪组介绍按顺序全部正确？', 'He is my friend.；She is my classmate.；She is my friend.', ['She is my friend.；He is my classmate.；He is my friend.', 'He is my classmate.；She is my friend.；She is my classmate.'], '逐张核对人物性别和关系词，再检查顺序。', '男孩用 he，女士和女孩用 she；三种关系称呼也按卡片顺序匹配。'),
    q([people, pronouns], '三位人物的介绍分别是“她是女孩”“他是男士”“她是女士”。哪组句子按中文顺序正确？', 'She is a girl.；He is a man.；She is a woman.', ['He is a girl.；She is a man.；He is a woman.', 'She is a woman.；He is a boy.；She is a girl.'], '分别核对年龄称呼和 he/she，再保留原顺序。', 'girl 和 woman 对应 she，man 对应 he；名词也按中文顺序匹配。'),
    q([people, relationships], '词语卡按顺序是“朋友、女人、同班同学”。哪组英文词保持顺序且词义正确？', 'friend；woman；classmate', ['classmate；girl；friend', 'friend；man；boy'], '第一和第三张表示关系，中间一张表示人物。', '朋友对应 friend，女人对应 woman，同班同学对应 classmate。'),
    q([people, relationships, pronouns], 'A「女孩朋友」和B「成年男士同班同学」要各写一句介绍。哪组既保留身份又用对代词？', 'A：She is my friend.；B：He is my classmate.', ['A：He is my friend.；B：She is my classmate.', 'A：She is my classmate.；B：He is my friend.'], '分别核对性别、关系和 A/B 顺序。', '女孩朋友用 She 和 friend；成年男士同班同学用 He 和 classmate。'),
    q([people, relationships, pronouns], '核对单上已有“man—He”“friend—朋友”“classmate—同班同学”。哪项总结能同时保留三条信息？', 'man 是成年男性；He 表示“他”；friend 和 classmate 表示不同同伴关系。', ['man 表示男孩；He 表示“她”；friend 和 classmate 意思相同。', 'man 表示成年女性；friend 表示同班同学；classmate 表示朋友。'], '逐项核对人物词、代词和两种关系词。', 'man 表示成年男性，He 表示“他”；friend 是朋友，classmate 是同班同学。'),
    q([people, relationships, pronouns], '资料是 A“男孩同班同学”、B“女士朋友”、C“男士朋友”。哪条句子的人物和代词正确，但关系词仍需修改？', 'C：把 He is my classmate. 改为 He is my friend。', ['A：把 He is my classmate. 改为 She is my classmate。', 'B：把 She is my friend. 改为 He is my classmate。'], '逐条检查人物代词和关系词；只找关系词与资料不一致的一条。', 'A、B 的人物和关系均正确；C 的 man 用 He 正确，但资料说是朋友，应把 classmate 改为 friend。'),
  ],
};

export const grade2Term1EnglishUnit02SupplementalActivities: Grade2Term1EnglishUnit02SupplementalActivity[] =
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
