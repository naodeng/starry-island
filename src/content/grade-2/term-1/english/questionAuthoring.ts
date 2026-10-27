import type { CompanionId } from '../../../types';

interface QuestionBase {
  prompt: string;
  hint: string;
  explanation: string;
}

export type EnglishQuestionSpec = QuestionBase & (
  | { kind: 'choice'; options: readonly [string, string, string]; correctOptionIndex: 0 | 1 | 2 }
  | { kind: 'match'; pairs: ReadonlyArray<readonly [string, string]> }
  | { kind: 'order'; items: readonly string[]; correctOrderIndices: readonly number[] }
  | { kind: 'categorize'; categories: readonly [string, string]; items: ReadonlyArray<{ label: string; categoryIndex: 0 | 1 }> }
);

export type EightEnglishQuestions = readonly [
  EnglishQuestionSpec, EnglishQuestionSpec, EnglishQuestionSpec, EnglishQuestionSpec,
  EnglishQuestionSpec, EnglishQuestionSpec, EnglishQuestionSpec, EnglishQuestionSpec,
];

export interface EnglishTaskSpec {
  title: string;
  objective: string;
  companionId: CompanionId;
  questions: EightEnglishQuestions;
}

export interface EnglishWordCard {
  word: string;
  meaning: string;
}

export interface EnglishChoiceQuestion {
  prompt: string;
  options: readonly [string, string, string];
  correctOptionIndex: 0 | 1 | 2;
  hint: string;
  explanation: string;
}

export interface EnglishLessonProfile {
  words: readonly [EnglishWordCard, EnglishWordCard, EnglishWordCard, EnglishWordCard];
  phraseQuestions: readonly [EnglishChoiceQuestion, EnglishChoiceQuestion];
  categories: readonly [string, string];
  categorizedWords: ReadonlyArray<{ label: string; categoryIndex: 0 | 1 }>;
  matchPrompt?: string;
  categorizePrompt?: string;
  orderedSentence: {
    prompt: string;
    items: readonly string[];
    correctOrderIndices: readonly number[];
  };
}

export function phraseQuestion(
  prompt: string,
  options: readonly [string, string, string],
  correctOptionIndex: 0 | 1 | 2,
  explanation: string,
): EnglishChoiceQuestion {
  return {
    prompt,
    options,
    correctOptionIndex,
    hint: '先读一读每个选项，想想哪一句最符合题意。',
    explanation,
  };
}

export function lessonProfile(
  words: EnglishLessonProfile['words'],
  phraseQuestions: EnglishLessonProfile['phraseQuestions'],
  categories: EnglishLessonProfile['categories'],
  categorizedWords: EnglishLessonProfile['categorizedWords'],
  orderedSentence: EnglishLessonProfile['orderedSentence'],
  activityPrompts: Pick<EnglishLessonProfile, 'matchPrompt' | 'categorizePrompt'> = {},
): EnglishLessonProfile {
  return { words, phraseQuestions, categories, categorizedWords, orderedSentence, ...activityPrompts };
}

export function choose(
  prompt: string,
  options: readonly [string, string, string],
  correctOptionIndex: 0 | 1 | 2,
  hint: string,
  explanation: string,
): EnglishQuestionSpec {
  return { kind: 'choice', prompt, options, correctOptionIndex, hint, explanation };
}

export function pair(
  prompt: string,
  pairs: ReadonlyArray<readonly [string, string]>,
  hint: string,
  explanation: string,
): EnglishQuestionSpec {
  return { kind: 'match', prompt, pairs, hint, explanation };
}

export function arrange(
  prompt: string,
  items: readonly string[],
  correctOrderIndices: readonly number[],
  hint: string,
  explanation: string,
): EnglishQuestionSpec {
  return { kind: 'order', prompt, items, correctOrderIndices, hint, explanation };
}

export function sortInto(
  prompt: string,
  categories: readonly [string, string],
  items: ReadonlyArray<{ label: string; categoryIndex: 0 | 1 }>,
  hint: string,
  explanation: string,
): EnglishQuestionSpec {
  return { kind: 'categorize', prompt, categories, items, hint, explanation };
}

export function makeTask(
  title: string,
  objective: string,
  companionId: CompanionId,
  profile: EnglishLessonProfile,
): EnglishTaskSpec {
  const [first, second, third, fourth] = profile.words;
  const hasClockTimes = profile.words.every(({ word }) => /^\d{1,2}:\d{2}$/.test(word));
  const cardName = hasClockTimes ? '时刻卡片' : '词卡';
  const firstPrompt = hasClockTimes
    ? `${cardName}“${first.word}”表示几点？`
    : `${cardName}“${first.word}”对应什么中文意思或信息？`;
  const secondPrompt = hasClockTimes
    ? `哪张${cardName}表示“${second.meaning}”？`
    : `哪张${cardName}对应“${second.meaning}”？`;
  const fourthPrompt = hasClockTimes
    ? `${cardName}“${fourth.word}”表示几点？`
    : `词卡“${fourth.word}”对应什么中文意思或信息？`;
  return {
    title,
    objective,
    companionId,
    questions: q8([
      choose(firstPrompt, [first.meaning, second.meaning, third.meaning], 0, `先读一读${cardName}，再核对它对应的信息。`, `“${first.word}”对应“${first.meaning}”。`),
      choose(secondPrompt, [first.word, second.word, third.word], 1, `在${cardName}中找到与这项信息相符的内容。`, `“${second.meaning}”对应${cardName}“${second.word}”。`),
      pair(hasClockTimes ? '把时刻卡片和对应的时间读数连起来。' : profile.matchPrompt ?? '把词卡和对应的中文意思或信息连起来。', profile.words.map(({ word, meaning }) => [word, meaning] as const), `先认出${cardName}，再逐个核对对应关系。`, hasClockTimes ? '对照时刻和读数，检查每一组是否匹配。' : '对照词义或信息检查每一组是否匹配。'),
      choose(fourthPrompt, [first.meaning, fourth.meaning, second.meaning], 1, `对照本次的${cardName}，检查对应的信息。`, `“${fourth.word}”对应“${fourth.meaning}”。`),
      choose(profile.phraseQuestions[0].prompt, profile.phraseQuestions[0].options, profile.phraseQuestions[0].correctOptionIndex, profile.phraseQuestions[0].hint, profile.phraseQuestions[0].explanation),
      choose(profile.phraseQuestions[1].prompt, profile.phraseQuestions[1].options, profile.phraseQuestions[1].correctOptionIndex, profile.phraseQuestions[1].hint, profile.phraseQuestions[1].explanation),
      sortInto(hasClockTimes ? '把时刻卡片按时间特点分类。' : profile.categorizePrompt ?? '把词卡放进合适的词语小队。', profile.categories, profile.categorizedWords, `先读懂每张${cardName}，再按类别整理。`, hasClockTimes ? '逐项对照时间读数完成分类，再检查一次。' : '逐项对照词义完成分类，再检查一次。'),
      arrange(profile.orderedSentence.prompt.replaceAll('词卡', cardName), profile.orderedSentence.items, profile.orderedSentence.correctOrderIndices, hasClockTimes ? '先检查英文表达的顺序，再核对时间读数和标点。' : '先找句子的开头，再看结尾标点或末尾的词。', hasClockTimes ? `把${cardName}排成完整、自然的英文表达。` : '把词卡排成自然、完整的英文表达。'),
    ]),
  };
}

export function q8(questions: readonly EnglishQuestionSpec[]): EightEnglishQuestions {
  if (questions.length !== 8) throw new Error(`英语场次需要 8 道题，当前收到 ${questions.length} 道。`);
  return questions as unknown as EightEnglishQuestions;
}
