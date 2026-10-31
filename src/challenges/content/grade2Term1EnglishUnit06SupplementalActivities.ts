import type { ChoiceActivityDefinition, Difficulty } from '../../content/types';

export type Grade2Term1EnglishUnit06KnowledgePointId =
  | 'holiday-vocabulary'
  | 'holiday-greetings'
  | 'gratitude-and-polite-responses';

export interface Grade2Term1EnglishUnit06SupplementalActivity {
  difficulty: Difficulty;
  sourceUnitId: string;
  knowledgePointIds: Grade2Term1EnglishUnit06KnowledgePointId[];
  activity: ChoiceActivityDefinition;
}

interface Draft {
  knowledgePointIds: Grade2Term1EnglishUnit06KnowledgePointId[];
  prompt: string;
  answer: string;
  distractors: [string, string];
  hint: string;
  explanation: string;
}

const sourceUnitId = 'grade-2/term-1/english/unit-06';
const idPrefix = 'challenge-supplement-grade-2-term-1-english-unit-06';
const vocabulary: Grade2Term1EnglishUnit06KnowledgePointId = 'holiday-vocabulary';
const greetings: Grade2Term1EnglishUnit06KnowledgePointId = 'holiday-greetings';
const courtesy: Grade2Term1EnglishUnit06KnowledgePointId = 'gratitude-and-polite-responses';

const q = (
  knowledgePointIds: Grade2Term1EnglishUnit06KnowledgePointId[],
  prompt: string,
  answer: string,
  distractors: [string, string],
  hint: string,
  explanation: string,
): Draft => ({ knowledgePointIds, prompt, answer, distractors, hint, explanation });

const drafts: Record<Difficulty, Draft[]> = {
  basic: [
    q([vocabulary], '词卡 card 的中文意思是哪一个？', '卡片', ['礼物', '圣诞树'], '想一想可以写上节日祝福的物品。', 'card 表示“卡片”。'),
    q([vocabulary], '想找“礼物”的英文词卡，应拿哪张？', 'present', ['card', 'Father Christmas'], '礼物可以送给朋友。', 'present 表示“礼物”。'),
    q([vocabulary], 'Christmas tree 对应哪个中文名称？', '圣诞树', ['圣诞老人', '新年'], '这是节日里装饰的一棵树。', 'Christmas tree 表示“圣诞树”。'),
    q([vocabulary], 'Father Christmas 表示什么？', '圣诞老人', ['圣诞树', '礼物'], '这是节日人物，不是物品。', 'Father Christmas 表示“圣诞老人”。'),
    q([greetings], '圣诞节向朋友送上祝福，可以说哪句？', 'Merry Christmas!', ['Happy New Year!', 'Thank you.'], '选择圣诞节的祝福语。', 'Merry Christmas! 表示“圣诞快乐！”。'),
    q([greetings], '新年到来时，可以对朋友说什么？', 'Happy New Year!', ['Merry Christmas!', 'You are welcome.'], '选择新年祝福语。', 'Happy New Year! 表示“新年快乐！”。'),
    q([courtesy], '收到朋友送来的礼物，哪句话可以表达感谢？', 'Thank you.', ['Happy New Year!', 'Where are you going?'], '想一想收到礼物时怎样礼貌地说谢谢。', 'Thank you. 表示“谢谢你”。'),
    q([courtesy], '朋友对你说 Thank you.，你可以怎样回应？', 'You are welcome.', ['Merry Christmas!', 'What is this?'], '选择回应感谢的话。', 'You are welcome. 可以礼貌地回应别人的感谢。'),
    q([greetings], '在 Merry ____! 中，填入哪个词可以组成圣诞祝福？', 'Christmas', ['New', 'Year'], '圣诞祝福中包含 Christmas。', 'Merry Christmas! 表示“圣诞快乐！”。'),
    q([greetings], '在 Happy New ____! 中，填入哪个词可以组成新年祝福？', 'Year', ['Christmas', 'Card'], '句子说的是新年祝福。', 'Happy New Year! 表示“新年快乐！”。'),
    q([greetings], '哪句英文祝福表示“圣诞快乐”？', 'Merry Christmas!', ['Happy New Year!', 'You are welcome.'], '区分圣诞节和新年的祝福语。', 'Merry Christmas! 是圣诞节祝福。'),
    q([greetings], '哪句英文祝福表示“新年快乐”？', 'Happy New Year!', ['Merry Christmas!', 'Thank you.'], '句子中有 New Year。', 'Happy New Year! 是新年祝福。'),
    q([vocabulary], '选出表示“一份礼物”的英文词。', 'present', ['Christmas tree', 'Father Christmas'], '礼物可以送给别人。', 'present 表示“礼物”。'),
    q([courtesy], '在简短对话中，You are welcome. 可以怎样理解？', '不客气。', ['新年快乐。', '圣诞树。'], '这句话常用来回应别人的感谢。', 'You are welcome. 可以表示“不客气”。'),
    q([vocabulary], '下面哪张词卡表示节日人物，而不是节日物品？', 'Father Christmas', ['Christmas tree', 'card'], '想一想哪一个词指的是人。', 'Father Christmas 表示“圣诞老人”，是节日人物。'),
    q([greetings], '卡片写着 Happy New Year!，它表达的是什么？', '新年祝福', ['感谢', '回应感谢'], '看一看句子中提到的节日。', 'Happy New Year! 表达新年祝福。'),
  ],
  advanced: [
    q([greetings], '朋友对你说 Happy New Year!，你可以怎样回应这句祝福？', 'Happy New Year to you, too!', ['Merry Christmas!', 'You are welcome.'], '选择本单元学过的新年祝福回应。', 'Happy New Year to you, too! 表示“也祝你新年快乐！”。'),
    q([greetings], '想在圣诞节向朋友送上祝福，哪句表达合适？', 'Merry Christmas!', ['Happy New Year!', 'You are welcome.'], '选择对应圣诞节的祝福语。', 'Merry Christmas! 是圣诞节祝福。'),
    q([courtesy], '先表达感谢，再回应感谢，哪组短句按这个顺序排列？', '先说 Thank you.，再回应 You are welcome。', ['先说 You are welcome.，再说 Thank you.', '先说 Merry Christmas!，再说 Happy New Year!'], '按先感谢、再回应感谢的顺序选择。', 'Thank you. 表达感谢；You are welcome. 可以回应感谢。'),
    q([vocabulary], '小组按“礼物、卡片”的顺序摆词卡，哪组符合顺序？', 'present；card', ['card；present', 'Christmas tree；Father Christmas'], '先找礼物，再找卡片。', 'present 表示礼物，card 表示卡片。'),
    q([vocabulary], '整理人物和物品标签，哪项分类正确？', 'Father Christmas 是节日人物；Christmas tree 是节日物品。', ['Father Christmas 是节日物品；Christmas tree 是节日人物。', '两者都表示礼物。'], '区分人物和物品。', 'Father Christmas 是人物，Christmas tree 是物品。'),
    q([greetings], '贺卡原本写着 Happy New Year!，现在要改成圣诞祝福，应怎样修改？', '把 Happy New Year! 换成 Merry Christmas!', ['把 Merry Christmas! 换成 Thank you.', '把 present 换成 card。'], '根据新的节日情境替换祝福语。', '圣诞祝福使用 Merry Christmas!。'),
    q([greetings, courtesy], '先向朋友送上新年祝福，再谢谢朋友送来的卡片，哪组按顺序表达？', 'Happy New Year!；Thank you.', ['Thank you.；Merry Christmas!', 'You are welcome.；Happy New Year!'], '先选择新年祝福，再表达感谢。', 'Happy New Year! 是祝福；Thank you. 表达感谢。'),
    q([vocabulary, greetings], '哪项把节日物品和节日祝福分清了？', '卡片和礼物是物品；Merry Christmas! 是节日祝福。', ['卡片和礼物是祝福；Merry Christmas! 是物品。', '三项都是人物。'], '分别判断卡片、礼物和祝福语的作用。', 'card 和 present 是物品，Merry Christmas! 是祝福语。'),
    q([courtesy], '哪项同时写出回应语和它回应的话？', 'You are welcome. 可以回应 Thank you.', ['Thank you. 可以回应 You are welcome.', 'Happy New Year! 可以回应 Merry Christmas!'], '核对两句话在对话中的先后作用。', 'You are welcome. 是对 Thank you. 的礼貌回应。'),
    q([vocabulary, courtesy], '朋友送来礼物后，你先表示感谢；听到感谢的人再礼貌回应。哪组词句对应这两步？', '礼物：Thank you.；听到感谢：You are welcome。', ['礼物：Merry Christmas!；听到感谢：Happy New Year!', '礼物：You are welcome.；听到感谢：Thank you.'], '按先感谢、再回应感谢的顺序判断。', '收到礼物可说 Thank you.，回应感谢可说 You are welcome.。'),
    q([greetings, courtesy], '哪项正确说明了两句话的交流作用？', 'Merry Christmas! 表达节日问候；Thank you. 表达感谢。', ['Merry Christmas! 表达感谢；Thank you. 表达节日问候。', '两句都用于回应感谢。'], '区分节日问候和表达感谢。', 'Merry Christmas! 是节日问候；Thank you. 表达感谢。'),
    q([vocabulary], '节日布置清单要列出卡片、礼物和圣诞树，哪组词都符合？', 'card、present、Christmas tree', ['Father Christmas、Thank you.、Happy New Year!', 'Merry Christmas!、You are welcome.、card'], '清单要填写三种节日物品。', 'card、present 和 Christmas tree 都是节日物品。'),
    q([greetings], '分别根据圣诞节和新年场景选祝福，哪组配对正确？', '圣诞节：Merry Christmas!；新年：Happy New Year!', ['圣诞节：Happy New Year!；新年：Merry Christmas!', '两个场景都用 You are welcome.'], '将每句祝福和对应节日配对。', 'Merry Christmas! 对应圣诞节，Happy New Year! 对应新年。'),
    q([greetings], '为了不把两种节日祝福弄混，先做哪件事？', '先判断是圣诞节还是新年，再选择对应祝福。', ['先选任意一句，再判断节日。', '把感谢用语当成节日祝福。'], '先看清情境，再核对祝福语。', '先确认节日，才能选择相符的祝福语。'),
    q([greetings], '朋友回应“Happy New Year to you, too!”时，to you, too 表达什么？', '也祝你新年快乐。', ['谢谢你送来的礼物。', '圣诞树上有一张卡片。'], '注意 too 表示“也”，再结合前面的新年祝福。', 'to you, too 表示“你也一样”，这里是在回祝新年快乐。'),
    q([courtesy], '听到 You are welcome. 后，前一句最可能是哪句？', 'Thank you.', ['Merry Christmas!', 'Happy New Year!'], '判断这句话通常回应哪种表达。', 'You are welcome. 通常用来回应 Thank you.。'),
    q([vocabulary, greetings], '朋友要给圣诞节卡片挑一句祝福，哪句符合卡片主题？', 'Merry Christmas!', ['Happy New Year!', 'You are welcome.'], '先确认卡片对应的节日，再排除新年祝福和礼貌回应。', 'Merry Christmas! 是圣诞节祝福，适合写在圣诞卡片上。'),
    q([vocabulary], '手边有 card 和 present 两张词卡。哪项说明了它们各自指的物品？', 'card 是卡片，present 是礼物。', ['card 是礼物，present 是卡片。', 'card 是圣诞老人，present 是圣诞树。'], '逐个核对词卡的中文意思。', 'card 表示卡片，present 表示礼物。'),
    q([greetings, courtesy], '对话卡的上一句是 Thank you.，下一句应承担什么作用？', '礼貌地回应感谢。', ['送上新年祝福。', '介绍一棵圣诞树。'], '根据对话中 Thank you. 的作用推断下一句。', 'Thank you. 表达感谢，下一句可以礼貌回应这份感谢。'),
    q([vocabulary, courtesy], '朋友收到一张 card 后要说谢谢。哪组表达先后和物品都相符？', '物品是 card；收到后说 Thank you.', ['物品是 present；收到后说 You are welcome.', '物品是 Father Christmas；收到后说 Happy New Year!'], '先辨认卡片，再选择收到礼物或卡片时的感谢用语。', 'card 是卡片；收到卡片后可以说 Thank you. 表达感谢。'),
    q([greetings], '要把“圣诞节”和“新年”两张场景卡分开，哪句属于新年场景？', 'Happy New Year!', ['Merry Christmas!', 'You are welcome.'], '判断哪句话直接提到 New Year。', 'Happy New Year! 是新年祝福。'),
    q([vocabulary], '小朋友要给一张可以写节日祝福的小卡片贴上英文名称，选哪一个词？', 'card', ['present', 'Father Christmas'], '想一想哪种物品可以写字并送给朋友。', 'card 表示“卡片”，可以写上祝福。'),
    q([greetings], '朋友写下回应“Happy New Year to you, too!”。请选择这张对话卡的开场祝福。', 'Happy New Year!', ['Merry Christmas!', 'Thank you.'], '回应中保留了对方的新年祝福主题。', 'Happy New Year to you, too! 是对新年祝福的友好回应，开场祝福是 Happy New Year!。'),
  ],
  high: [
    q([vocabulary, courtesy], '朋友送你一份礼物，你先说谢谢；朋友再回应。哪组顺序合适？', '朋友送礼物：Thank you.；对方回应：You are welcome。', ['朋友送礼物：You are welcome.；对方回应：Thank you.', '朋友送礼物：Happy New Year!；对方回应：Merry Christmas!'], '先表达感谢，再回应感谢。', '收到礼物可说 Thank you.，回应感谢可说 You are welcome.。'),
    q([greetings], '要分别给圣诞节和新年贺卡配祝福，哪组配对都正确？', '圣诞节：Merry Christmas!；新年：Happy New Year!', ['圣诞节：Happy New Year!；新年：Merry Christmas!', '圣诞节：Thank you.；新年：You are welcome.'], '逐张贺卡核对节日和祝福语。', 'Merry Christmas! 对应圣诞节；Happy New Year! 对应新年。'),
    q([vocabulary], '要把三张物品词卡按“礼物、卡片、圣诞树”记录，哪组英文顺序相符？', 'present；card；Christmas tree', ['card；Christmas tree；present', 'Father Christmas；card；present'], '先按中文记录顺序核对每个词。', 'present、card、Christmas tree 依次表示礼物、卡片、圣诞树。'),
    q([greetings, courtesy], '整理四句话时，要分别标出节日祝福、感谢和感谢回应。哪项分类完整正确？', '节日祝福：Merry Christmas!、Happy New Year!；感谢：Thank you.；回应：You are welcome。', ['节日祝福：Thank you.；感谢：You are welcome.；回应：Happy New Year!', '四句话都属于节日祝福。'], '根据每句话在对话中的作用分类。', '两句节日祝福、感谢用语和感谢回应的功能各不相同。'),
    q([greetings, courtesy], '读到一句对话后要选合适的回应，先判断什么最有帮助？', '先判断对话表达的是祝福还是感谢，再选择相应回应。', ['先把所有句子都当成感谢。', '只看句子长短来选回应。'], '先弄清对方在表达什么，再选合适的话。', '回应要与对方表达的内容相配。'),
    q([vocabulary], '词义检查卡把 present 标成“卡片”、把 card 标成“礼物”。哪项能同时改正两处？', '把 present 配为礼物，把 card 配为卡片。', ['把 present 配为圣诞树，把 card 配为圣诞老人。', 'present 和 card 都配为新年。'], '分别核对 present 和 card 的中文意思。', 'present 是礼物，card 是卡片。'),
    q([greetings, courtesy], '圣诞聚会中，朋友先向你祝福，你随后感谢对方送来的卡片，最后对方回应感谢。哪组三句话按这段情境排列？', 'Merry Christmas!；Thank you.；You are welcome。', ['Thank you.；You are welcome.；Happy New Year!', 'You are welcome.；Merry Christmas!；Thank you.'], '依次对照祝福、感谢和回应感谢三个环节。', '三句话分别是圣诞祝福、表达感谢和回应感谢。'),
    q([greetings, courtesy], '要为新年问候和感谢回应各选一句，哪组用途对应正确？', '新年问候：Happy New Year!；回应感谢：You are welcome。', ['新年问候：You are welcome.；回应感谢：Merry Christmas!', '新年问候：Thank you.；回应感谢：Happy New Year!'], '把问候语和回应感谢的话分开判断。', 'Happy New Year! 是新年问候；You are welcome. 回应感谢。'),
    q([vocabulary], '整理“礼物、圣诞树、圣诞老人”三张词卡，哪组中文意思逐项对应？', 'present：礼物；Christmas tree：圣诞树；Father Christmas：圣诞老人。', ['present：卡片；Christmas tree：圣诞老人；Father Christmas：礼物。', 'present：圣诞树；Christmas tree：礼物；Father Christmas：卡片。'], '逐项检查三个英文词的意思。', 'present、Christmas tree 和 Father Christmas 分别表示礼物、圣诞树和圣诞老人。'),
    q([greetings], '同伴要回应新年祝福，选择哪句能保留“你也一样”的意思？', 'Happy New Year to you, too!', ['Merry Christmas!', 'Thank you.'], '选用本单元学过的新年祝福回应。', 'Happy New Year to you, too! 表示“也祝你新年快乐！”。'),
    q([courtesy], '把两句话和交流作用配对，哪项正确？', '把 Thank you. 配为感谢，把 You are welcome. 配为回应。', ['把 Thank you. 配为回应，把 You are welcome. 配为感谢。', '两句话都配为节日祝福。'], '根据对话中先后表达的作用配对。', 'Thank you. 表达感谢；You are welcome. 回应感谢。'),
    q([vocabulary, courtesy], '朋友送来礼物和卡片，你想先确认物品，再表达感谢。哪种做法符合顺序？', '先认出 present 和 card，再说 Thank you.', ['先说 You are welcome.，再把两样物品都叫作 Christmas tree。', '先说 Merry Christmas!，不查看物品。'], '按题目要求先辨认物品，再表达感谢。', 'present 是礼物，card 是卡片；收到礼物可说 Thank you.。'),
    q([vocabulary], '分类表有“节日物品”和“节日人物”两栏，哪种填法正确？', '物品：card、present、Christmas tree；人物：Father Christmas。', ['物品：Father Christmas；人物：card、present、Christmas tree。', '四项都填入“节日祝福”。'], '逐个判断词语指的是物品还是人物。', '前三项是物品，Father Christmas 是节日人物。'),
    q([greetings, courtesy], '卡片要写一句节日祝福，另一张对话卡要回应别人感谢。哪组分别满足两个目标？', '祝福卡：Merry Christmas!；回应卡：You are welcome。', ['祝福卡：Thank you.；回应卡：Happy New Year!', '祝福卡：You are welcome.；回应卡：Merry Christmas!'], '分别确认祝福和回应感谢的目标。', 'Merry Christmas! 是节日祝福；You are welcome. 回应感谢。'),
    q([vocabulary], '礼物盒旁放着一张 card。哪项把物品名称和用途都说明正确？', 'card 是卡片，可以写上节日祝福。', ['card 是礼物，应该说 You are welcome.', 'card 是圣诞老人，表示新年快乐。'], '先分清卡片和礼物，再想想卡片上可以写什么。', 'card 是卡片，卡片可以用来写节日祝福。'),
    q([greetings, courtesy], '小组要挑出一条节日问候和一条感谢回应，哪组符合这两个不同目标？', 'Merry Christmas!；You are welcome。', ['Thank you.；Happy New Year!', 'You are welcome。；Thank you.'], '分清节日问候、表达感谢和回应感谢。', 'Merry Christmas! 是节日问候；You are welcome. 回应别人的感谢。'),
    q([vocabulary, greetings], '整理卡片时，发现一张把 Christmas tree 标成“礼物”、把 present 标成“圣诞树”。应如何改正？', 'Christmas tree 标为圣诞树，present 标为礼物。', ['Christmas tree 标为礼物，present 标为圣诞树。', '两个词都标为 Father Christmas。'], '分别检查两个词组的含义。', 'Christmas tree 表示圣诞树，present 表示礼物。'),
    q([courtesy], '同伴收到 present 后说了 You are welcome.，哪项反馈能指出真正需要调整的表达？', '收到礼物时应说 Thank you.。', ['收到礼物时应说 Happy New Year!。', 'You are welcome. 是圣诞树的名称。'], '判断收到礼物的人需要感谢，还是回应别人的感谢。', '收到礼物时说 Thank you. 表达感谢；You are welcome. 用于回应感谢。'),
    q([greetings, courtesy], '两张便签分别记录节日祝福与表达感谢。哪项没有把它们的用途写反？', '圣诞祝福写 Merry Christmas!；感谢写 Thank you.。', ['圣诞祝福写 Thank you.；感谢写 Merry Christmas!。', '两张便签都写 You are welcome.。'], '分别核对节日问候和感谢的交流作用。', 'Merry Christmas! 是圣诞祝福；Thank you. 表达感谢。'),
    q([vocabulary, greetings, courtesy], '给节日物品、节日人物和新年祝福各选一项，哪组顺序正确？', 'card；Father Christmas；Happy New Year!', ['Father Christmas；Happy New Year!；card', 'Happy New Year!；card；Father Christmas'], '按物品、人物、祝福的顺序逐项核对。', 'card 是物品，Father Christmas 是人物，Happy New Year! 是新年祝福。'),
  ],
};

export const grade2Term1EnglishUnit06SupplementalActivities: Grade2Term1EnglishUnit06SupplementalActivity[] =
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
