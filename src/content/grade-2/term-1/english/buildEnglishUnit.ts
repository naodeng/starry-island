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

function createActivity(question: EnglishQuestionSpec, id: string): ActivityDefinition {
  const base = { id, prompt: question.prompt, hint: question.hint, explanation: question.explanation };
  if (question.kind === 'choice') {
    return {
      ...base,
      kind: 'choice',
      options: question.options.map((label, index) => ({ id: `${id}/option-${formatCurriculumSequence(index + 1)}`, label })),
      correctOptionId: `${id}/option-${formatCurriculumSequence(question.correctOptionIndex + 1)}`,
    };
  }
  if (question.kind === 'match') {
    return { ...base, kind: 'match', pairs: question.pairs.map(([left, right], index) => ({ id: `${id}/pair-${formatCurriculumSequence(index + 1)}`, left, right })) };
  }
  if (question.kind === 'order') {
    return {
      ...base,
      kind: 'order',
      items: question.items.map((label, index) => ({ id: `${id}/item-${formatCurriculumSequence(index + 1)}`, label })),
      correctOrder: question.correctOrderIndices.map((index) => `${id}/item-${formatCurriculumSequence(index + 1)}`),
    };
  }
  return {
    ...base,
    kind: 'categorize',
    categories: question.categories.map((label, index) => ({ id: `${id}/category-${formatCurriculumSequence(index + 1)}`, label })),
    items: question.items.map((item, index) => ({
      id: `${id}/item-${formatCurriculumSequence(index + 1)}`,
      label: item.label,
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
  questions[2] = {
    kind: 'choice',
    prompt: `同伴把词卡“${target[0]}”连到了“${distractors[0]}”。哪一项能改正并核对这组配对？`,
    options: [`${target[0]} — ${target[1]}`, `${target[0]} — ${distractors[1]}`, `${target[0]} — ${distractors[0]}`],
    correctOptionIndex: 0,
    hint: '先查这张英文词卡的中文意思，再检查连线。',
    explanation: `“${target[0]}”表示“${target[1]}”，应与这项中文意思对应。`,
  };
  return { ...task, questions: q8(questions) };
}

function addHighTierEvidenceCheck(task: EnglishTaskSpec, taskIndex: number): EnglishTaskSpec {
  const questions = [...task.questions] as EnglishQuestionSpec[];
  for (const questionIndex of [0, 1, 4, 5]) {
    const question = questions[questionIndex]!;
    if (question.kind !== 'choice') continue;

    if (taskIndex === 1 && questionIndex < 2) {
      const pairedQuestion = task.questions[questionIndex === 0 ? 1 : 0]!;
      questions[questionIndex] = {
        kind: 'choice',
        prompt: questionIndex === 0
          ? `准备核对两题：${question.prompt}；${pairedQuestion.prompt}。先怎样分开记录，避免把词义混在一起？`
          : `核对完这两题：${pairedQuestion.prompt}；${question.prompt}。若两个答案相同，先检查什么？`,
        options: questionIndex === 0
          ? [
            '逐题圈出目标词，再分别查找对应的中文意思或信息。',
            '把两题都写成同一个答案，不必查看词卡。',
            '只按选项长度选择，不比较词义。',
          ]
          : [
            '回看两题各自的目标词卡和释义，确认有没有混用。',
            '直接把其中一题改成不同答案。',
            '不看题目，按字母顺序选择。',
          ],
        correctOptionIndex: 0,
        hint: '每道题都要把目标词和自己的中文意思对应起来。',
        explanation: questionIndex === 0
          ? '逐题核对目标词卡，能避免把两道题的中文意思互相套用。'
          : '答案相同时先回看两道题各自的目标词卡和释义，再判断是否有混用。',
      };
      continue;
    }

    const answer = question.options[question.correctOptionIndex];
    const distractors = question.options.filter((_, index) => index !== question.correctOptionIndex);
    if (questionIndex < 2) {
      questions[questionIndex] = {
        kind: 'choice',
        prompt: `核对词卡记录：${question.prompt} 哪条记录写出了正确意思并说明了核对方法？`,
        options: [
          `“${answer}”正确；再对照词卡逐项核实词义或信息。`,
          `“${distractors[0]}”正确；只看英文单词的首字母。`,
          `“${distractors[1]}”正确；不必核对英文词卡。`,
        ],
        correctOptionIndex: 0,
        hint: '先核对词义，再确认记录与英文词卡相符。',
        explanation: `答案是“${answer}”；将它与词卡对应的中文意思或信息逐项核对，才能确认记录准确。`,
      };
    } else {
      questions[questionIndex] = {
        kind: 'choice',
        prompt: `同伴完成这道题时需要说明依据：${question.prompt} 哪条记录同时符合题意并给出核对理由？`,
        options: [
          `选择“${answer}”，依据是：${question.explanation}`,
          `选择“${distractors[0]}”，因为只看词句长度，不用核对题意。`,
          `选择“${distractors[1]}”，不读题目也能确定答案。`,
        ],
        correctOptionIndex: 0,
        hint: '把题目要求、英语表达和解释依据一起核对。',
        explanation: `“${answer}”符合题意。${question.explanation}`,
      };
    }
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
  const highTasks = spec.highTasks.map((task, index) => addHighTierEvidenceCheck(reviewSecondTaskMatch(task, index), index));
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
