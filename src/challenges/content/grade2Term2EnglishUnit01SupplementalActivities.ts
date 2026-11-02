import type { ChoiceActivityDefinition, Difficulty } from '../../content/types';

export type Grade2Term2EnglishUnit01KnowledgePointId =
  | 'playtime-activity-vocabulary'
  | 'can-cannot-ability-statements'
  | 'can-ability-questions-and-answers'
  | 'ability-records-and-activity-planning';

export interface Grade2Term2EnglishUnit01SupplementalActivity {
  difficulty: Difficulty;
  sourceUnitId: string;
  knowledgePointIds: Grade2Term2EnglishUnit01KnowledgePointId[];
  activity: ChoiceActivityDefinition;
}

interface Draft {
  knowledgePointIds: Grade2Term2EnglishUnit01KnowledgePointId[];
  prompt: string;
  answer: string;
  distractors: [string, string];
  hint: string;
  explanation: string;
}

const sourceUnitId = 'grade-2/term-2/english/unit-01';
const idPrefix = 'challenge-supplement-grade-2-term-2-english-unit-01';
const vocabulary: Grade2Term2EnglishUnit01KnowledgePointId = 'playtime-activity-vocabulary';
const statements: Grade2Term2EnglishUnit01KnowledgePointId = 'can-cannot-ability-statements';
const questions: Grade2Term2EnglishUnit01KnowledgePointId = 'can-ability-questions-and-answers';
const planning: Grade2Term2EnglishUnit01KnowledgePointId = 'ability-records-and-activity-planning';

const q = (
  knowledgePointIds: Grade2Term2EnglishUnit01KnowledgePointId[],
  prompt: string,
  answer: string,
  distractors: [string, string],
  hint: string,
  explanation: string,
): Draft => ({ knowledgePointIds, prompt, answer, distractors, hint, explanation });

const drafts: Record<Difficulty, Draft[]> = {
  basic: [
    q([vocabulary], '活动词卡上写着 swim。它表示哪种活动？', '游泳', ['踢足球', '放风筝'], '回想这个词卡在本单元活动表中的中文意思。', 'swim 表示“游泳”。'),
    q([vocabulary], '要给“骑自行车”这项活动找英文标签，应选哪张词卡？', 'ride a bike', ['fly a kite', 'play football'], '先找表示“骑”的动词，再看后面接的物品。', 'ride a bike 表示“骑自行车”。'),
    q([vocabulary], '球场活动记录里出现 play football。它表示什么？', '踢足球', ['游泳', '骑自行车'], '注意 football 是本单元的球类活动词。', 'play football 表示“踢足球”。'),
    q([vocabulary], '风筝活动照片需要配一张英文词卡，哪张符合照片内容？', 'fly a kite', ['ride a bike', 'swim'], '把照片里的风筝和活动词卡逐项对应。', 'fly a kite 表示“放风筝”。'),
    q([vocabulary], '四项活动要放进“球类活动”栏，哪项适合放在这一栏？', 'play football', ['swim', 'ride a bike'], '看看哪项活动名称中包含球类运动。', '本单元的球类活动是 play football，另外两项放在其他活动栏。'),
    q([vocabulary], '把活动分成“球类活动”和“其他活动”两栏，哪组都属于“其他活动”？', 'swim、ride a bike、fly a kite', ['play football、swim、ride a bike', 'fly a kite、play football、ride a bike'], '先找出唯一的球类活动，再检查剩下三项。', 'swim、ride a bike 和 fly a kite 都属于其他活动。'),
    q([vocabulary], '小队要核对两张双语词卡，哪组英文和中文都对应正确？', 'swim—游泳；fly a kite—放风筝', ['swim—踢足球；fly a kite—骑自行车', 'ride a bike—放风筝；play football—游泳'], '逐张读出活动词，再检查两边的意思。', 'swim 表示“游泳”，fly a kite 表示“放风筝”。'),
    q([statements, planning], '能力卡显示：游泳打勾，踢足球画圈表示暂时不会。哪组记录符合卡片？', 'I can swim.；I cannot play football.', ['I cannot swim.；I can play football.', 'I can swim.；I can play football.'], '打勾表示会，画圈表示不会；两项都要对照。', '肯定能力用 can，否定能力用 cannot。'),
    q([statements, planning], '活动表显示这位同学会放风筝，还不会骑自行车。哪组句子记录了两项信息？', 'I can fly a kite.；I cannot ride a bike.', ['I cannot fly a kite.；I can ride a bike.', 'I can fly a kite.；I can ride a bike.'], '分别看清放风筝和骑车旁边的能力标记。', '会做的活动用 can，不会做的活动用 cannot。'),
    q([statements], '想在记录卡上写“我们不会游泳”，哪句话符合这个意思？', 'We cannot swim.', ['We can swim.', 'We cannot fly a kite.'], '否定能力时，注意 can 后面的否定形式。', 'We cannot swim. 表示“我们不会游泳”。'),
    q([statements], '卡片显示她会放风筝。哪句可以记录这项能力？', 'She can fly a kite.', ['She cannot fly a kite.', 'He can fly a kite.'], '对照人物和能力两项信息，不要交换主语。', 'She can fly a kite. 表示“她会放风筝”。'),
    q([statements], '能力记录显示这位同学会踢足球。哪句完整表达这项能力？', 'I can play football.', ['I cannot play football.', 'I can swim.'], '对照“会”这项标记，并检查句子里的活动。', 'I can play football. 表示“我会踢足球”。'),
    q([questions], '采访卡要询问同伴会不会游泳，哪句是合适的问句？', 'Can your friend swim?', ['Your friend can swim.', 'Your friend cannot swim.'], '询问能力时，注意问句开头的词和句末标点。', 'Can your friend swim? 用来询问同伴会不会游泳。'),
    q([questions], '交流卡要求先提出问题，了解对方会不会踢足球。哪句符合要求？', 'Can you play football?', ['You can play football.', 'You cannot play football.'], '把问句和陈述能力的句子区分开。', 'Can you play football? 是询问能力的问句。'),
  ],
  advanced: [
    q([vocabulary], '整理活动墙时，要把“游泳”和“骑自行车”按顺序写成英文词组。哪组标签正确？', 'swim；ride a bike', ['ride a bike；fly a kite', 'play football；swim'], '逐项把中文活动换成英文词组，并保留原顺序。', '游泳是 swim，骑自行车是 ride a bike。'),
    q([vocabulary], '活动登记员发现风筝卡被连到了“游泳”。哪项改动能修正这一处？', '把 fly a kite 连到放风筝。', ['把 fly a kite 连到踢足球。', '把 ride a bike 连到放风筝。'], '只改错连线，并重新核对词卡的意思。', 'fly a kite 表示“放风筝”，不是游泳或踢足球。'),
    q([vocabulary], '两张词卡分别要贴“踢足球”和“骑自行车”的标签，哪组顺序正确？', 'play football；ride a bike', ['swim；fly a kite', 'ride a bike；play football'], '先认出踢足球的词组，再按卡片顺序检查第二项。', 'play football 表示“踢足球”，ride a bike 表示“骑自行车”。'),
    q([vocabulary], '活动分栏表中，哪一组安排符合“球类活动”与“其他活动”的分类？', '球类：play football；其他：swim、fly a kite', ['球类：swim；其他：play football、ride a bike', '球类：ride a bike；其他：fly a kite、play football'], '在本单元的四项活动中，先找出球类活动。', 'play football 放在球类栏；游泳、放风筝等放在其他活动栏。'),
    q([questions], '采访伙伴时要问“你会放风筝吗？”，哪张问句卡表达了这个意思？', 'Can you fly a kite?', ['Can you ride a bike?', 'Can you play football?'], '保留问句结构，再核对问题中询问的活动。', 'Can you fly a kite? 询问对方会不会放风筝。'),
    q([questions, statements], '采访记录要先询问是否会游泳，再询问是否会骑自行车。哪组问题顺序正确？', 'Can you swim?；Can you ride a bike?', ['Can you ride a bike?；Can you fly a kite?', 'Can you play football?；Can you swim?'], '依照记录卡给出的活动顺序，逐个检查问句。', '两句分别询问游泳和骑自行车，顺序与记录一致。'),
    q([questions, statements], '活动采访栏只收“询问能力”的句子，哪一项应放进采访栏？', 'Can your friend play football?', ['Your friend can play football.', 'Your friend cannot play football.'], '问句是在询问，陈述句是在说明会或不会。', 'Can your friend play football? 是询问对方能力的问句。'),
    q([statements, planning], '活动卡显示：她会骑自行车，不会游泳。哪组句子同时保留人物和两项记录？', 'She can ride a bike.；She cannot swim.', ['She cannot ride a bike.；She can swim.', 'He can ride a bike.；He cannot swim.'], '分别核对人物、肯定标记和否定标记。', 'She can ride a bike. 表示她会骑车；She cannot swim. 表示她不会游泳。'),
    q([statements], '记录说明他不会放风筝。哪句话没有把“会”和“不会”写反？', 'He cannot fly a kite.', ['He can fly a kite.', 'He cannot ride a bike.'], '找到对应的活动，再检查句子是否用了否定形式。', 'He cannot fly a kite. 表示他不会放风筝。'),
    q([statements, planning], '两项能力记录是“会踢足球”“不会骑自行车”。哪组句子都符合记录？', 'We can play football.；We cannot ride a bike.', ['We cannot play football.；We can ride a bike.', 'We can play football.；We can ride a bike.'], '逐句对照两项能力标记，不要只检查第一句。', 'can 对应会做，cannot 对应不会做。'),
    q([statements], '人物卡标记她暂时不会游泳，哪句能准确写出这项能力？', 'She cannot swim.', ['She can swim.', 'She cannot fly a kite.'], '看清人物卡给出的活动和“会/不会”标记。', 'She cannot swim. 表示“她不会游泳”。'),
    q([statements], '句子“She can ride a bike.”对应哪张能力卡？', '她会骑自行车。', ['她不会骑自行车。', '她会放风筝。'], '先看句子中的活动，再判断 can 表示会还是不会。', 'ride a bike 表示骑自行车，can 表示会，所以意思是她会骑车。'),
    q([questions], '调查表需要询问“他会踢足球吗？”，哪句问句与人物和活动都相符？', 'Can he play football?', ['Can she play football?', 'Can he swim?'], '检查问句开头、人物和活动三个部分。', 'Can he play football? 询问他会不会踢足球。'),
    q([questions, statements], '同伴的能力记录写着“会游泳”。如果要把它改写成问句询问同伴，哪句合适？', 'Can your friend swim?', ['Your friend can swim.', 'Your friend cannot swim.'], '将陈述变为询问时，留意句首顺序和问号。', 'Can your friend swim? 是询问同伴是否会游泳。'),
  ],
  high: [
    q([statements, planning], '记录卡显示：这位同学会游泳，不会放风筝。哪组介绍同时符合两项记录？', 'I can swim.；I cannot fly a kite.', ['I cannot swim.；I can fly a kite.', 'I can swim.；I cannot ride a bike.'], '逐项对照活动和能力标记。', '第一项是会游泳，第二项是不会放风筝；两句都保留了记录信息。'),
    q([statements, planning], '分工表写着：甲会踢足球；乙不会骑自行车。甲、乙各用自己的口吻填写活动记录，哪组按甲、乙顺序正确？', 'A: I can play football.；B: I cannot ride a bike.', ['A: I cannot play football.；B: I can ride a bike.', 'A: I can play football.；B: I can ride a bike.'], '先分别检查甲、乙，再核对每人的活动和能力。', '甲会踢足球，乙不会骑自行车；两栏都与卡片记录一致。'),
    q([statements, planning], '活动卡上“踢足球”打勾、“游泳”画圈。哪组句子适合贴到这张能力卡的记录栏？', 'I can play football.；I cannot swim.', ['I cannot play football.；I can swim.', 'I can play football.；I can swim.'], '打勾和画圈代表相反的能力信息，需分别转成句子。', '会踢足球用 can，不会游泳用 cannot。'),
    q([vocabulary, statements, planning], '小队要按卡片给出的顺序记录“会游泳、不会骑车、会放风筝”。哪组句子全部符合？', 'I can swim.；I cannot ride a bike.；I can fly a kite.', ['I cannot swim.；I can ride a bike.；I cannot fly a kite.', 'I can swim.；I cannot fly a kite.；I can ride a bike.'], '按三张卡片的顺序逐项转换，并检查每项的能力标记。', '所选句子依次记录游泳、骑车和放风筝，且会与不会没有颠倒。'),
    q([statements, planning], '检查表中 A 行符合“会骑自行车”，B 行符合“不会游泳”。哪项审核意见准确？', '保留两行；A用 can，B用 cannot。', ['A改用 cannot；B改用 can。', '交换两行的活动名称即可。'], '先判断两行的活动是否正确，再只核对肯定或否定形式。', '骑车项标记为会，游泳项标记为不会，因此两行分别使用 can 和 cannot。'),
    q([vocabulary, statements, planning], '任务分配卡显示她会骑自行车，但不会踢足球。哪项安排不违反卡片信息？', '让她负责骑自行车活动。', ['让她负责踢足球活动。', '把踢足球改记成她会做的活动。'], '选一项她已标记为会的活动，不要改动原记录。', '她会骑自行车，可以安排这项活动；卡片显示她不会踢足球。'),
    q([questions, planning], '活动采访要询问她会不会骑自行车，哪张卡同时问对了人物和活动？', 'Can she ride a bike?', ['Can she swim?', 'Can he ride a bike?'], '核对问句指向的人物和要询问的活动。', 'Can she ride a bike? 询问她会不会骑自行车。'),
    q([statements, planning], '两张能力卡分别是“会放风筝”和“不会游泳”。哪组介绍没有交换两张卡的内容？', 'I can fly a kite.；I cannot swim.', ['I cannot fly a kite.；I can swim.', 'I can ride a bike.；I cannot play football.'], '按卡片顺序核对活动，再检查会与不会。', '第一张卡对应 can fly a kite，第二张卡对应 cannot swim。'),
    q([vocabulary, statements, planning], '活动分配前发现一条记录写成“She cannot play football.”，但卡片标记她会踢足球。哪项改动最少且正确？', '只把 cannot 改成 can。', ['把 play football 改成 swim。', '把 She 改成 He，并保留 cannot。'], '保留人物和活动，只修正与能力标记不一致的部分。', '卡片标记她会踢足球，所以只需把否定形式改为肯定形式。'),
    q([statements, planning], '小组计划需要一项“会做”的活动和一项“不会做”的活动。记录显示他会游泳、不会踢足球。哪组计划记录匹配？', 'He can swim.；He cannot play football.', ['He cannot swim.；He can play football.', 'He can fly a kite.；He cannot ride a bike.'], '检查两句是否来自给定的两项记录，而不只是句式正确。', '两句话分别对应会游泳和不会踢足球，与计划信息一致。'),
    q([questions, statements, planning], '要询问小队伙伴是否会游泳，并把他的回答记录成“我会游泳”。哪组先问后记的顺序正确？', 'Can you swim?；I can swim.', ['I can swim.；Can you swim?', 'Can you ride a bike?；I cannot swim.'], '先选择询问能力的问句，再对照题目给出的肯定记录。', 'Can you swim? 是问句；I can swim. 记录了会游泳。'),
    q([vocabulary, statements, planning], '核对三张记录：A“会放风筝”、B“不会骑车”、C“会踢足球”。哪组按 A、B、C 顺序准确？', 'I can fly a kite.；I cannot ride a bike.；I can play football.', ['I cannot fly a kite.；I can ride a bike.；I cannot play football.', 'I can swim.；I cannot ride a bike.；I can fly a kite.'], '逐张核对活动词和能力标记，并保持 A、B、C 顺序。', '三句分别记录放风筝、骑车和踢足球，肯定或否定也与卡片一致。'),
    q([questions, statements, planning], '伙伴的卡片写着“不会放风筝”。若要确认这项信息，再把已知记录留下，哪组做法合适？', '先问 Can you fly a kite?；记录仍写 cannot。', ['先写 I can fly a kite.；再把记录改成 can。', '询问是否会游泳；把放风筝记录删除。'], '问句要询问卡片上的活动；在没有新信息前保留原记录。', 'Can you fly a kite? 询问是否会放风筝；原卡片仍标记为不会。'),
    q([vocabulary, statements, planning], '两位同学要分别完成游泳和骑自行车活动。甲会游泳但不会骑车，乙会骑车。哪种分工符合记录？', '甲参加游泳，乙参加骑自行车。', ['甲参加骑自行车，乙参加游泳。', '两人都安排骑自行车，不查看能力记录。'], '每项活动安排给卡片上标记为会的同学。', '甲会游泳，乙会骑自行车；按能力分配后，两项任务都有人可以完成。'),
  ],
};

const positionOffset: Record<Difficulty, number> = { basic: 0, advanced: 1, high: 2 };

function createActivity(difficulty: Difficulty, index: number, draft: Draft): Grade2Term2EnglishUnit01SupplementalActivity {
  const correctIndex = ((index + positionOffset[difficulty]) % 3) as 0 | 1 | 2;
  const labels = [...draft.distractors];
  labels.splice(correctIndex, 0, draft.answer);
  return {
    difficulty,
    sourceUnitId,
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

export const grade2Term2EnglishUnit01SupplementalActivities: Grade2Term2EnglishUnit01SupplementalActivity[] = (
  Object.entries(drafts) as Array<[Difficulty, Draft[]]>
).flatMap(([difficulty, activities]) => activities.map((activity, index) => createActivity(difficulty, index, activity)));
