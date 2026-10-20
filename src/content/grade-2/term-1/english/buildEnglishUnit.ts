import type { ActivityDefinition, CatalogEntryType, CurriculumUnit } from '../../../types';
import { buildDifficultyTracks, formatCurriculumSequence } from '../../../taskAssembly';
import { q8 } from './questionAuthoring';
import type { EnglishQuestionSpec, EnglishTaskSpec } from './questionAuthoring';

export interface EnglishUnitSpec {
  grade?: 1 | 2 | 3 | 4 | 5 | 6;
  term?: 1 | 2;
  formalUnitNumber: number | null;
  entryId: string;
  type?: 'unit' | 'review';
  title: string;
  sourceTopics: readonly string[];
  basicTasks: readonly [EnglishTaskSpec, EnglishTaskSpec, ...EnglishTaskSpec[]];
  advancedTasks: readonly [EnglishTaskSpec, EnglishTaskSpec];
  highTasks: readonly [EnglishTaskSpec, EnglishTaskSpec];
}

function normalizeChineseQuoteNesting(text: string): string {
  let depth = 0;
  for (const mark of text.match(/[“”]/gu) ?? []) {
    if (mark === '“') {
      depth += 1;
    } else {
      depth -= 1;
      if (depth < 0) return text;
    }
  }
  if (depth !== 0) return text;

  depth = 0;
  return text.replace(/[“”]/gu, (mark) => {
    if (mark === '“') {
      const opening = depth % 2 === 0 ? '“' : '‘';
      depth += 1;
      return opening;
    }
    depth -= 1;
    return depth % 2 === 0 ? '”' : '’';
  });
}

function createActivity(question: EnglishQuestionSpec, id: string): ActivityDefinition {
  const quoted = (text: string) => normalizeChineseQuoteNesting(text);
  const base = { id, prompt: quoted(question.prompt), hint: quoted(question.hint), explanation: quoted(question.explanation) };
  if (question.kind === 'choice') {
    return {
      ...base,
      kind: 'choice',
      options: question.options.map((label, index) => ({ id: `${id}/option-${formatCurriculumSequence(index + 1)}`, label: quoted(label) })),
      correctOptionId: `${id}/option-${formatCurriculumSequence(question.correctOptionIndex + 1)}`,
    };
  }
  if (question.kind === 'match') {
    return { ...base, kind: 'match', pairs: question.pairs.map(([left, right], index) => ({ id: `${id}/pair-${formatCurriculumSequence(index + 1)}`, left: quoted(left), right: quoted(right) })) };
  }
  if (question.kind === 'order') {
    return {
      ...base,
      kind: 'order',
      items: question.items.map((label, index) => ({ id: `${id}/item-${formatCurriculumSequence(index + 1)}`, label: quoted(label) })),
      correctOrder: question.correctOrderIndices.map((index) => `${id}/item-${formatCurriculumSequence(index + 1)}`),
    };
  }
  return {
    ...base,
    kind: 'categorize',
    categories: question.categories.map((label, index) => ({ id: `${id}/category-${formatCurriculumSequence(index + 1)}`, label: quoted(label) })),
    items: question.items.map((item, index) => ({
      id: `${id}/item-${formatCurriculumSequence(index + 1)}`,
      label: quoted(item.label),
      categoryId: `${id}/category-${formatCurriculumSequence(item.categoryIndex + 1)}`,
    })),
  };
}

function reviewSecondTaskMatch(task: EnglishTaskSpec, taskIndex: number): EnglishTaskSpec {
  if (taskIndex !== 1) return task;
  const matchQuestion = task.questions[2];
  if (matchQuestion.kind !== 'match' || matchQuestion.pairs.length < 3) return task;

  const reverseMatchOrder = matchQuestion.prompt.includes('Chinese meaning with its English word');
  const englishMeaningPairs = matchQuestion.pairs.map(([left, right]) => {
    if (reverseMatchOrder) return [right, left] as const;
    const leftHasEnglish = /[a-z0-9]/i.test(left);
    const rightHasEnglish = /[a-z0-9]/i.test(right);
    if (leftHasEnglish && !rightHasEnglish) return [left, right] as const;
    if (!leftHasEnglish && rightHasEnglish) return [right, left] as const;
    return null;
  });
  if (englishMeaningPairs.some((pair) => pair === null)) return task;
  const resolvedPairs = englishMeaningPairs as Array<readonly [string, string]>;
  const target = resolvedPairs[2]!;
  const distractors = resolvedPairs.filter((_, index) => index !== 2).map(([, meaning]) => meaning).slice(0, 2);
  if (new Set([target[1], ...distractors]).size !== 3) return task;

  const questions = [...task.questions] as EnglishQuestionSpec[];
  const cardName = matchQuestion.prompt.includes('时刻卡片') ? '时刻卡片' : '词卡';
  const matchEvidence = cardName === '时刻卡片' ? '对应的时间读数' : '对应的中文意思';
  questions[2] = {
    kind: 'choice',
    prompt: `同伴把${cardName}“${target[0]}”连到了“${distractors[0]}”。哪一项能改正并核对这组配对？`,
    options: [`${target[0]} — ${target[1]}`, `${target[0]} — ${distractors[1]}`, `${target[0]} — ${distractors[0]}`],
    correctOptionIndex: 0,
    hint: `先核对这张${cardName}的${matchEvidence}，再检查连线。`,
    explanation: `“${target[0]}”对应“${target[1]}”，应与这项${matchEvidence}相符。`,
  };
  return { ...task, questions: q8(questions) };
}

function addHighTierEvidenceCheck(task: EnglishTaskSpec, taskIndex: number, sourceTask: EnglishTaskSpec): EnglishTaskSpec {
  const questions = [...task.questions] as EnglishQuestionSpec[];
  const firstQuestion = sourceTask.questions[0]!;
  const secondQuestion = sourceTask.questions[1]!;
  const firstPhrase = sourceTask.questions[4]!;
  const secondPhrase = sourceTask.questions[5]!;

  if (firstQuestion.kind === 'choice' && secondQuestion.kind === 'choice') {
    const answerA = firstQuestion.options[firstQuestion.correctOptionIndex];
    const answerB = secondQuestion.options[secondQuestion.correctOptionIndex];
    const wrongA = firstQuestion.options.filter((_, index) => index !== firstQuestion.correctOptionIndex);
    const wrongB = secondQuestion.options.filter((_, index) => index !== secondQuestion.correctOptionIndex);
    const record = (valueA: string, valueB: string) => `A：“${valueA}”；B：“${valueB}”`;
    const pairedOptions = [
      record(answerA, answerB),
      record(answerA, wrongB[0]!),
      record(wrongA[0]!, answerB),
      record(wrongA[0]!, wrongB[0]!),
      record(answerB, answerA),
      record(answerA, wrongB[1]!),
      record(wrongA[1]!, answerB),
    ];
    const uniquePairedOptions = [...new Set(pairedOptions)];
    if (uniquePairedOptions.length >= 3) {
      questions[0] = {
        kind: 'choice',
        prompt: `两条记录分别对应：A「${firstQuestion.prompt}」B「${secondQuestion.prompt}」。哪组答案按顺序同时符合两题的要求？`,
        options: uniquePairedOptions.slice(0, 3) as [string, string, string],
        correctOptionIndex: 0,
        hint: '分别核对两道题的对象和意思，再检查A、B的答案顺序。',
        explanation: `A应为“${answerA}”，B应为“${answerB}”；两条记录都要符合各自题意。`,
      };
      questions[1] = {
        kind: 'choice',
        prompt: `同伴给B题「${secondQuestion.prompt}」选了“${wrongB[0]}”，A题“${answerA}”已核对正确。哪项只改正B题并保留A题？`,
        options: [
          `A保留“${answerA}”；B从“${wrongB[0]}”改为“${answerB}”。`,
          `A保留“${answerA}”；B从“${wrongB[0]}”改为“${wrongB[1]}”。`,
          `A从“${answerA}”改为“${wrongA[0]}”；B仍选“${wrongB[0]}”。`,
        ],
        correctOptionIndex: 0,
        hint: '先确认已核对无误的A题，再根据B题的目标修正答案。',
        explanation: `A题记录“${answerA}”无需更改；B题应改为“${answerB}”，以符合题目要求。`,
      };
    }
  }

  if (firstPhrase.kind === 'choice' && secondPhrase.kind === 'choice') {
    const answerA = firstPhrase.options[firstPhrase.correctOptionIndex];
    const answerB = secondPhrase.options[secondPhrase.correctOptionIndex];
    const wrongA = firstPhrase.options.find((_, index) => index !== firstPhrase.correctOptionIndex)!;
    const wrongB = secondPhrase.options.find((_, index) => index !== secondPhrase.correctOptionIndex)!;
    const pairedOptions = [
      `A：${answerA}；B：${answerB}`,
      `A：${answerA}；B：${wrongB}`,
      `A：${wrongA}；B：${answerB}`,
    ] as const;
    questions[4] = {
      kind: 'choice',
      prompt: `两条记录分别对应以下两题：（A题：${firstPhrase.prompt}；B题：${secondPhrase.prompt}）。哪组答案按顺序同时符合两题的要求？`,
      options: pairedOptions,
      correctOptionIndex: 0,
      hint: '分别核对两道题的对象和意思，再检查A、B的答案顺序。',
      explanation: `A应为“${answerA}”，B应为“${answerB}”；两条记录都要符合各自题意。`,
    };

    const targetPhrase = taskIndex === 0 ? firstPhrase : secondPhrase;
    const otherPhrase = taskIndex === 0 ? secondPhrase : firstPhrase;
    const targetAnswer = targetPhrase.options[targetPhrase.correctOptionIndex];
    const otherAnswer = otherPhrase.options[otherPhrase.correctOptionIndex];
    const targetWrong = targetPhrase.options.find((_, index) => index !== targetPhrase.correctOptionIndex)!;
    const otherWrong = otherPhrase.options.find((_, index) => index !== otherPhrase.correctOptionIndex)!;
    const correctedRecord = taskIndex === 0
      ? `A改为“${targetAnswer}”，B保留“${otherAnswer}”。`
      : `A保留“${otherAnswer}”，B改为“${targetAnswer}”。`;
    const unchangedRecord = taskIndex === 0
      ? `A保留“${targetWrong}”，B保留“${otherAnswer}”。`
      : `A保留“${otherAnswer}”，B保留“${targetWrong}”。`;
    const wrongOtherRecord = taskIndex === 0
      ? `A改为“${targetAnswer}”，B改为“${otherWrong}”。`
      : `A改为“${otherWrong}”，B改为“${targetAnswer}”。`;
    questions[5] = {
      kind: 'choice',
      prompt: `同伴的答题记录中有一处错误：（A题：${firstPhrase.prompt}；B题：${secondPhrase.prompt}）。哪项反馈只改正错选的一项并保留正确的一项？`,
      options: [correctedRecord, unchangedRecord, wrongOtherRecord],
      correctOptionIndex: 0,
      hint: '先确认哪一项与题目要求不符，再保留已经核对正确的记录。',
      explanation: `核对后，A应为“${answerA}”，B应为“${answerB}”；只修改错误的一项。`,
    };
  }

  return { ...task, questions: q8(questions) };
}

export function buildEnglishUnit(spec: EnglishUnitSpec): CurriculumUnit {
  const grade = spec.grade ?? 2;
  const term = spec.term ?? 1;
  const type: CatalogEntryType = spec.type ?? 'unit';
  const textbookEditionId = `grade-${grade}/term-${term}/english`;
  const id = `${textbookEditionId}/${spec.entryId}`;
  const basicTasks = spec.basicTasks.map((task, index) => reviewSecondTaskMatch(task, index));
  const advancedTasks = spec.advancedTasks.map((task, index) => reviewSecondTaskMatch(task, index));
  const highTasks = spec.highTasks.map((task, index) => addHighTierEvidenceCheck(reviewSecondTaskMatch(task, index), index, task));
  return {
    id,
    subject: 'english',
    title: spec.title,
    type,
    formalUnitNumber: spec.formalUnitNumber,
    achievementEligible: type === 'unit' && spec.formalUnitNumber !== null,
    textbookEditionId,
    sourceTopics: [...spec.sourceTopics],
    difficultyTracks: buildDifficultyTracks(id, {
      basic: basicTasks,
      advanced: advancedTasks,
      high: highTasks,
    }, createActivity),
  };
}
