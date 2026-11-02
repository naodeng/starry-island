import type { ActivityDefinition } from '../content/types';

export function getActivityQuestionSpeechText(_activity: ActivityDefinition): string {
  const activity = _activity;
  switch (activity.kind) {
    case 'choice':
      return `题目：${activity.prompt}${activity.options.map((option, index) => `选项${toChineseCount(index + 1)}：${option.label}`).join('；')}。`;
    case 'match':
      return `题目：${activity.prompt}左侧选项：${activity.pairs.map(({ left }) => left).join('、')}。右侧选项：${activity.pairs.map(({ right }) => right).join('、')}。`;
    case 'order':
      return `题目：${activity.prompt}待排序项目：${activity.items.map(({ label }) => label).join('、')}。`;
    case 'categorize':
      return `题目：${activity.prompt}类别：${activity.categories.map(({ label }) => label).join('、')}。待分类项目：${activity.items.map(({ label }) => label).join('、')}。`;
    case 'measurement':
      return `题目：${activity.prompt}物体：${activity.objectLabel}。可调范围：${activity.minCm}到${activity.maxCm}厘米。`;
    case 'arithmetic':
      return `题目：${activity.prompt}算式：${toSpokenExpression(activity.expression)}。`;
  }
}

export function getActivityAnswerSpeechText(_activity: ActivityDefinition): string {
  const activity = _activity;
  let answer: string;
  switch (activity.kind) {
    case 'choice': {
      const option = activity.options.find(({ id }) => id === activity.correctOptionId);
      answer = `正确答案：${option?.label ?? '未找到对应选项'}。`;
      break;
    }
    case 'match':
      answer = `正确配对：${activity.pairs.map(({ left, right }) => `${left}对应${right}`).join('；')}。`;
      break;
    case 'order': {
      const labels = new Map(activity.items.map(({ id, label }) => [id, label]));
      answer = `正确顺序：${activity.correctOrder.map((id) => labels.get(id) ?? id).join('、')}。`;
      break;
    }
    case 'categorize': {
      const categories = activity.categories.map((category) => {
        const labels = activity.items
          .filter(({ categoryId }) => categoryId === category.id)
          .map(({ label }) => label);
        return `${category.label}：${labels.join('、')}`;
      });
      answer = `正确分类：${categories.join('；')}。`;
      break;
    }
    case 'measurement':
      answer = `正确答案：${activity.objectLabel}长${activity.targetLengthCm}厘米。`;
      break;
    case 'arithmetic':
      answer = `正确答案：${toSpokenExpression(activity.expression)}等于${activity.correctAnswer}。`;
      break;
  }
  return `${answer}${activity.explanation}`;
}

function toSpokenExpression(expression: string): string {
  return expression
    .replace(/\s*\+\s*/gu, '加')
    .replace(/\s*-\s*/gu, '减')
    .replace(/\s*×\s*/gu, '乘')
    .replace(/\s*÷\s*/gu, '除以')
    .replace(/\s*=\s*/gu, '等于')
    .trim();
}

function toChineseCount(value: number): string {
  return ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'][value] ?? String(value);
}
