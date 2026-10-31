import type { ChoiceActivityDefinition, Difficulty } from '../../content/types';

export interface Grade1Term1EnglishUnit02SupplementalActivity {
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

const sourceUnitId = 'grade-1/term-1/english/unit-02';
const idPrefix = 'challenge-supplement-grade-1-term-1-english-unit-02';

const drafts: Record<Difficulty, ActivityDraft[]> = {
  basic: [
    { knowledgePointIds: ['face-feature-vocabulary'], prompt: '词卡 eye 表示哪个面部部位？', options: ['眼睛', '耳朵', '鼻子'], correctOptionIndex: 0, hint: '逐项对照题干信息、词卡和类别要求。', explanation: 'eye 表示“眼睛”。' },
    { knowledgePointIds: ['face-feature-vocabulary'], prompt: '“耳朵”对应哪个英文词？', options: ['nose', 'ear', 'mouth'], correctOptionIndex: 1, hint: '逐项对照题干信息、词卡和类别要求。', explanation: 'ear 表示“耳朵”。' },
    { knowledgePointIds: ['face-feature-vocabulary'], prompt: '看到英文词 nose，应该想到哪个中文词？', options: ['鼻子', '嘴', '眼睛'], correctOptionIndex: 0, hint: '逐项对照题干信息、词卡和类别要求。', explanation: 'nose 表示“鼻子”。' },
    { knowledgePointIds: ['face-feature-vocabulary'], prompt: '哪张词卡表示“嘴”？', options: ['mouth', 'eye', 'ear'], correctOptionIndex: 0, hint: '逐项对照题干信息、词卡和类别要求。', explanation: 'mouth 表示“嘴”。' },
    { knowledgePointIds: ['face-action-instructions', 'face-feature-vocabulary'], prompt: '听到“Touch your eye.”，应该摸哪里？', options: ['眼睛', '鼻子', '嘴'], correctOptionIndex: 0, hint: '先辨认指令要求的动作，再核对动作对象。', explanation: 'eye 表示“眼睛”，Touch your eye. 是“摸摸你的眼睛”。' },
    { knowledgePointIds: ['face-action-instructions', 'face-feature-vocabulary'], prompt: '“Touch your ear.” 让你做什么？', options: ['摸摸耳朵', '摸摸鼻子', '摸摸嘴'], correctOptionIndex: 0, hint: '先辨认指令要求的动作，再核对动作对象。', explanation: 'Touch your ear. 的意思是“摸摸你的耳朵”。' },
    { knowledgePointIds: ['face-description-sentences', 'face-feature-vocabulary'], prompt: '想表达“这是我的鼻子”，哪句话合适？', options: ['This is my nose.', 'This is my ear.', 'This is my mouth.'], correctOptionIndex: 0, hint: '先看句子结构，再把题目要求与句末内容对应。', explanation: 'This is my nose. 的意思是“这是我的鼻子”。' },
    { knowledgePointIds: ['face-action-instructions', 'face-feature-vocabulary'], prompt: '“Touch your mouth.” 中的 mouth 是哪个部位？', options: ['嘴', '耳朵', '眼睛'], correctOptionIndex: 0, hint: '先辨认指令要求的动作，再核对动作对象。', explanation: 'mouth 表示“嘴”，Touch your mouth. 是“摸摸你的嘴”。' },
    { knowledgePointIds: ['face-feature-vocabulary'], prompt: '卡片上写着 ear。哪条中文记录准确？', options: ['耳朵', '眼睛', '鼻子'], correctOptionIndex: 0, hint: '逐项对照题干信息、词卡和类别要求。', explanation: 'ear 表示“耳朵”。' },
    { knowledgePointIds: ['face-feature-vocabulary'], prompt: '下面哪个词表示“鼻子”？', options: ['nose', 'mouth', 'eye'], correctOptionIndex: 0, hint: '逐项对照题干信息、词卡和类别要求。', explanation: 'nose 表示“鼻子”。' },
    { knowledgePointIds: ['face-feature-vocabulary'], prompt: '按课程中的“看或听的部位”分类，下面哪个词符合？', options: ['eye', 'nose', 'mouth'], correctOptionIndex: 0, hint: '逐项对照题干信息、词卡和类别要求。', explanation: 'eye 属于课程中的“看或听的部位”类别。' },
    { knowledgePointIds: ['face-description-sentences', 'face-feature-vocabulary'], prompt: '“This is my eye.” 表示什么？', options: ['这是我的眼睛。', '这是我的耳朵。', '这是我的嘴。'], correctOptionIndex: 0, hint: '先看句子结构，再把题目要求与句末内容对应。', explanation: 'This is my eye. 的意思是“这是我的眼睛”。' },
    { knowledgePointIds: ['face-feature-vocabulary'], prompt: '选择与“耳朵”意思相同的英文词卡。', options: ['ear', 'eye', 'mouth'], correctOptionIndex: 0, hint: '逐项对照题干信息、词卡和类别要求。', explanation: 'ear 表示“耳朵”。' },
    { knowledgePointIds: ['face-description-sentences', 'face-feature-vocabulary'], prompt: '哪句话表示“这是我的嘴”？', options: ['This is my mouth.', 'This is my nose.', 'This is my eye.'], correctOptionIndex: 0, hint: '先看句子结构，再把题目要求与句末内容对应。', explanation: 'mouth 表示“嘴”，This is my mouth. 表示“这是我的嘴”。' },
  ],
  advanced: [
    { knowledgePointIds: ['face-feature-vocabulary', 'face-action-instructions'], prompt: '老师说“Touch your mouth.”，哪项动作与指令一致？', options: ['摸摸嘴', '摸摸耳朵', '摸摸眼睛'], correctOptionIndex: 0, hint: '先辨认指令要求的动作，再核对动作对象。', explanation: 'mouth 表示“嘴”，所以应摸摸嘴。' },
    { knowledgePointIds: ['face-feature-vocabulary', 'face-description-sentences'], prompt: '要介绍自己的耳朵，哪句话中的部位词用对了？', options: ['This is my ear.', 'This is my nose.', 'This is my mouth.'], correctOptionIndex: 0, hint: '先看句子结构，再把题目要求与句末内容对应。', explanation: 'ear 表示“耳朵”，This is my ear. 表示“这是我的耳朵”。' },
    { knowledgePointIds: ['face-feature-vocabulary', 'face-action-instructions'], prompt: '把词卡 nose 放进“Touch your ___.”，哪句指令完整？', options: ['Touch your nose.', 'Touch nose your.', 'Your touch nose.'], correctOptionIndex: 0, hint: '先辨认指令要求的动作，再核对动作对象。', explanation: 'Touch your nose. 的词序正确，意思是“摸摸你的鼻子”。' },
    { knowledgePointIds: ['face-feature-vocabulary'], prompt: '课程把眼睛和耳朵放在同一类。哪组词卡属于“看或听的部位”？', options: ['eye、ear', 'nose、mouth', 'eye、mouth'], correctOptionIndex: 0, hint: '逐项对照题干信息、词卡和类别要求。', explanation: '课程将 eye 和 ear 归为“看或听的部位”。' },
    { knowledgePointIds: ['face-feature-vocabulary', 'face-description-sentences'], prompt: '卡片要求写“这是我的嘴”。哪句没有把部位词写错？', options: ['This is my mouth.', 'This is my eye.', 'This is my ear.'], correctOptionIndex: 0, hint: '先看句子结构，再把题目要求与句末内容对应。', explanation: 'mouth 表示“嘴”，所以 This is my mouth. 符合要求。' },
    { knowledgePointIds: ['face-description-sentences', 'face-feature-vocabulary'], prompt: '下面哪一组词卡能按顺序组成“This is my nose.”？', options: ['This → is → my → nose', 'my → This → nose → is', 'nose → my → is → This'], correctOptionIndex: 0, hint: '先看句子结构，再把题目要求与句末内容对应。', explanation: 'This is my nose. 的词序是 This → is → my → nose。' },
    { knowledgePointIds: ['face-feature-vocabulary', 'face-description-sentences'], prompt: '同伴把 ear 解释成“鼻子”。哪项改正了这条记录？', options: ['ear＝耳朵', 'ear＝鼻子', 'ear＝嘴'], correctOptionIndex: 0, hint: '先看句子结构，再把题目要求与句末内容对应。', explanation: 'ear 表示“耳朵”，不是“鼻子”。' },
    { knowledgePointIds: ['face-feature-vocabulary'], prompt: '下列哪组分类与课程中的两类面部词卡相符？', options: ['看或听：eye、ear；其他面部部位：nose、mouth', '看或听：nose、mouth；其他面部部位：eye、ear', '看或听：eye、nose；其他面部部位：ear、mouth'], correctOptionIndex: 0, hint: '逐项对照题干信息、词卡和类别要求。', explanation: '课程把 eye、ear 分在“看或听的部位”，nose、mouth 分在“其他面部部位”。' },
    { knowledgePointIds: ['face-feature-vocabulary', 'face-action-instructions'], prompt: '你听到“Touch your ear.”，并准备摸鼻子。怎样改正动作？', options: ['改为摸耳朵。', '继续摸鼻子。', '改为摸嘴。'], correctOptionIndex: 0, hint: '先辨认指令要求的动作，再核对动作对象。', explanation: 'ear 是耳朵，应按指令摸耳朵。' },
    { knowledgePointIds: ['face-feature-vocabulary'], prompt: '如果要从“看或听的部位”词卡中取一张，哪张可以选？', options: ['ear', 'nose', 'mouth'], correctOptionIndex: 0, hint: '逐项对照题干信息、词卡和类别要求。', explanation: 'ear 属于“看或听的部位”类别。' },
    { knowledgePointIds: ['face-description-sentences', 'face-feature-vocabulary'], prompt: '中文卡片写着“这是我的眼睛”。哪条英文句子意思一致？', options: ['This is my eye.', 'This is my ear.', 'This is my nose.'], correctOptionIndex: 0, hint: '先看句子结构，再把题目要求与句末内容对应。', explanation: 'eye 表示“眼睛”，This is my eye. 与中文卡片意思一致。' },
    { knowledgePointIds: ['face-feature-vocabulary', 'face-action-instructions'], prompt: '同伴听错了“Touch your nose.”，把它说成摸摸嘴。哪个词能帮他发现错误？', options: ['nose', 'mouth', 'eye'], correctOptionIndex: 0, hint: '先辨认指令要求的动作，再核对动作对象。', explanation: 'nose 表示“鼻子”，所以这条指令要求摸鼻子。' },
    { knowledgePointIds: ['face-description-sentences', 'face-feature-vocabulary'], prompt: '下面哪句话介绍的是耳朵，而不是眼睛或鼻子？', options: ['This is my ear.', 'This is my eye.', 'This is my nose.'], correctOptionIndex: 0, hint: '先看句子结构，再把题目要求与句末内容对应。', explanation: 'ear 表示“耳朵”，This is my ear. 介绍的是耳朵。' },
    { knowledgePointIds: ['face-action-instructions', 'face-feature-vocabulary'], prompt: '想按指令摸眼睛，三句话中应该选哪句？', options: ['Touch your eye.', 'Touch your ear.', 'Touch your mouth.'], correctOptionIndex: 0, hint: '先辨认指令要求的动作，再核对动作对象。', explanation: 'eye 表示“眼睛”，Touch your eye. 是摸眼睛的指令。' },
  ],
  high: [
    { knowledgePointIds: ['face-feature-vocabulary'], prompt: '记录员要把四张词卡分成课程中的两类。哪份记录完全正确？', options: ['看或听：eye、ear；其他面部部位：nose、mouth', '看或听：eye、nose；其他面部部位：ear、mouth', '看或听：nose、mouth；其他面部部位：eye、ear'], correctOptionIndex: 0, hint: '逐项对照题干信息、词卡和类别要求。', explanation: 'eye、ear 属于“看或听的部位”，nose、mouth 属于“其他面部部位”。' },
    { knowledgePointIds: ['face-feature-vocabulary', 'face-action-instructions', 'face-description-sentences'], prompt: '小卡片要求先读“这是我的鼻子”，再按“摸摸你的耳朵”行动。哪项完整符合两条要求？', options: ['This is my nose.；摸摸耳朵。', 'This is my ear.；摸摸鼻子。', 'This is my mouth.；摸摸眼睛。'], correctOptionIndex: 0, hint: '将题目要求拆开，逐项核对每种表达是否符合。', explanation: 'This is my nose. 表示“这是我的鼻子”；Touch your ear. 表示“摸摸你的耳朵”。' },
    { knowledgePointIds: ['face-feature-vocabulary', 'face-description-sentences'], prompt: '三张介绍卡中，哪张把中文部位与英文句子全部配对正确？', options: ['眼睛：This is my eye.', '耳朵：This is my nose.', '嘴：This is my ear.'], correctOptionIndex: 0, hint: '先看句子结构，再把题目要求与句末内容对应。', explanation: 'eye 表示“眼睛”，所以“眼睛：This is my eye.”配对正确。' },
    { knowledgePointIds: ['face-feature-vocabulary', 'face-action-instructions', 'face-description-sentences'], prompt: '老师先展示 nose 词卡，再说“Touch your mouth.”。哪项既读对词卡又听懂指令？', options: ['nose 是鼻子；摸摸嘴。', 'nose 是嘴；摸摸鼻子。', 'nose 是眼睛；摸摸耳朵。'], correctOptionIndex: 0, hint: '将题目要求拆开，逐项核对每种表达是否符合。', explanation: 'nose 表示“鼻子”；Touch your mouth. 是“摸摸你的嘴”。' },
    { knowledgePointIds: ['face-feature-vocabulary', 'face-description-sentences'], prompt: '图示对应“耳朵”，但句子写成“This is my eye.”。哪处替换可以改正整句？', options: ['把 eye 改成 ear。', '把 my 改成 nose。', '把 This 改成 mouth。'], correctOptionIndex: 0, hint: '先看句子结构，再把题目要求与句末内容对应。', explanation: '图示是耳朵，应写 This is my ear.，所以把 eye 改成 ear。' },
    { knowledgePointIds: ['face-feature-vocabulary'], prompt: '四张词卡中，eye 和 ear 已归为“看或听的部位”。剩下两张应是哪一组？', options: ['nose、mouth', 'eye、nose', 'ear、mouth'], correctOptionIndex: 0, hint: '逐项对照题干信息、词卡和类别要求。', explanation: 'nose 和 mouth 属于课程中的“其他面部部位”类别。' },
    { knowledgePointIds: ['face-feature-vocabulary', 'face-action-instructions', 'face-description-sentences'], prompt: '展示卡要求说“This is my eye.”，随后执行“Touch your nose.”。哪项记录了正确的句意和动作？', options: ['这是我的眼睛；摸摸鼻子。', '这是我的鼻子；摸摸眼睛。', '这是我的耳朵；摸摸嘴。'], correctOptionIndex: 0, hint: '将题目要求拆开，逐项核对每种表达是否符合。', explanation: 'eye 表示“眼睛”，nose 表示“鼻子”，两项记录都与要求一致。' },
    { knowledgePointIds: ['face-feature-vocabulary'], prompt: '小组要挑出一张属于“其他面部部位”的词卡，同时不选 eye 或 ear。哪张符合？', options: ['mouth', 'eye', 'ear'], correctOptionIndex: 0, hint: '逐项对照题干信息、词卡和类别要求。', explanation: 'mouth 属于“其他面部部位”，eye 和 ear 在另一类。' },
    { knowledgePointIds: ['face-feature-vocabulary', 'face-action-instructions', 'face-description-sentences'], prompt: '以下哪组把英文、词义和指令动作三者配得一致？', options: ['ear＝耳朵；Touch your ear.＝摸摸耳朵。', 'nose＝嘴；Touch your mouth.＝摸摸鼻子。', 'eye＝鼻子；Touch your eye.＝摸摸耳朵。'], correctOptionIndex: 0, hint: '将题目要求拆开，逐项核对每种表达是否符合。', explanation: 'ear 表示“耳朵”，Touch your ear. 的动作对象也是耳朵。' },
    { knowledgePointIds: ['face-feature-vocabulary', 'face-description-sentences'], prompt: '检查三条句子时，只能保留一条与中文卡片意思相同。哪条应保留？', options: ['“这是我的嘴。”— This is my mouth.', '“这是我的眼睛。”— This is my ear.', '“这是我的耳朵。”— This is my nose.'], correctOptionIndex: 0, hint: '先看句子结构，再把题目要求与句末内容对应。', explanation: 'mouth 表示“嘴”，第一条中文和英文意思相同。' },
    { knowledgePointIds: ['face-feature-vocabulary', 'face-action-instructions'], prompt: '先从“看或听的部位”选一张词卡，再照指令“Touch your nose.”行动。哪项两步都正确？', options: ['选 ear；摸摸鼻子。', '选 mouth；摸摸耳朵。', '选 nose；摸摸眼睛。'], correctOptionIndex: 0, hint: '先辨认指令要求的动作，再核对动作对象。', explanation: 'ear 属于“看或听的部位”；Touch your nose. 要求摸鼻子。' },
    { knowledgePointIds: ['face-feature-vocabulary', 'face-description-sentences'], prompt: '要分别介绍眼睛和耳朵，哪组句子两处部位词都正确？', options: ['This is my eye.；This is my ear.', 'This is my nose.；This is my mouth.', 'This is my ear.；This is my eye.'], correctOptionIndex: 0, hint: '先看句子结构，再把题目要求与句末内容对应。', explanation: '第一句用 eye 介绍眼睛，第二句用 ear 介绍耳朵。' },
    { knowledgePointIds: ['face-feature-vocabulary', 'face-action-instructions', 'face-description-sentences'], prompt: '一张任务卡给出“这是我的嘴”和“摸摸眼睛”两项要求。哪组英文与中文顺序都对应？', options: ['This is my mouth.；Touch your eye.＝摸摸眼睛。', 'This is my eye.；Touch your mouth.＝摸摸鼻子。', 'This is my ear.；Touch your nose.＝摸摸嘴。'], correctOptionIndex: 0, hint: '将题目要求拆开，逐项核对每种表达是否符合。', explanation: 'mouth 是嘴，eye 是眼睛；两条表达均按任务卡顺序匹配。' },
    { knowledgePointIds: ['face-feature-vocabulary'], prompt: '复核一张分类表：eye、ear 在“看或听”栏，nose、mouth 在“其他面部部位”栏。哪项检查结论正确？', options: ['四张词卡都放在课程对应的类别中。', 'nose 和 mouth 应与 eye、ear 放在“看或听”栏。', 'eye 和 ear 应移到“其他面部部位”栏。'], correctOptionIndex: 0, hint: '逐项对照题干信息、词卡和类别要求。', explanation: 'eye、ear 属于“看或听的部位”；nose、mouth 属于“其他面部部位”。' },
  ],
};

let supplementalIndex = 0;

export const grade1Term1EnglishUnit02SupplementalActivities: Grade1Term1EnglishUnit02SupplementalActivity[] =
  (Object.entries(drafts) as [Difficulty, ActivityDraft[]][]).flatMap(([difficulty, items]) => items.map((draft, index) => {
    const answerPosition = supplementalIndex++ % draft.options.length;
    const correctLabel = draft.options[draft.correctOptionIndex];
    const distractors = draft.options.filter((_, optionIndex) => optionIndex !== draft.correctOptionIndex);
    const orderedLabels = [...distractors];
    orderedLabels.splice(answerPosition, 0, correctLabel);
    const options = orderedLabels.map((label, optionIndex) => ({ id: `option-${optionIndex + 1}`, label }));
    return {
      difficulty,
      sourceUnitId,
      knowledgePointIds: [...draft.knowledgePointIds],
      activity: {
        id: `${idPrefix}-${difficulty}-${String(index + 1).padStart(2, '0')}`,
        kind: 'choice' as const,
        difficulty,
        prompt: draft.prompt,
        options,
        correctOptionId: `option-${answerPosition + 1}`,
        hint: draft.hint,
        explanation: draft.explanation,
        canReviseAnswer: true,
        feedback: { correct: '答对了，你认真观察了面部词卡。', incorrect: '没关系，核对词卡或指令后再试试。' },
      },
    };
  }));
