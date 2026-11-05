import { term1ChineseCards } from './term-1/chinese';
import { term1EnglishCards } from './term-1/english';
import { term1MathCards } from './term-1/math';
import { term2ChineseCards } from './term-2/chinese';
import { term2EnglishCards } from './term-2/english';
import { term2MathCards } from './term-2/math';
import type { KnowledgeCardDefinition } from '../types';

function addUnitKeys(
  term: 1 | 2,
  subject: 'chinese' | 'math' | 'english',
  units: Record<string, KnowledgeCardDefinition[]>,
) {
  return Object.fromEntries(Object.entries(units).map(([slug, cards]) => [
    `grade-2/term-${term}/${subject}/${slug}`,
    cards,
  ]));
}

export const knowledgeCardsByUnit: Record<string, KnowledgeCardDefinition[]> = {
  ...addUnitKeys(1, 'chinese', term1ChineseCards),
  ...addUnitKeys(1, 'math', term1MathCards),
  ...addUnitKeys(1, 'english', term1EnglishCards),
  ...addUnitKeys(2, 'chinese', term2ChineseCards),
  ...addUnitKeys(2, 'math', term2MathCards),
  ...addUnitKeys(2, 'english', term2EnglishCards),
};
