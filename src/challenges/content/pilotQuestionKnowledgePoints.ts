import type { ActivityDefinition } from '../../content/types';

const PILOT_UNIT_IDS = new Set([
  'grade-2/term-1/math/unit-01',
  'grade-2/term-1/math/unit-02',
  'grade-2/term-1/math/unit-03',
  'grade-2/term-1/math/unit-04',
  'grade-3/term-1/english/unit-01',
]);

function activityText(activity: ActivityDefinition): string {
  const fields: string[] = [activity.prompt];
  if (activity.kind === 'arithmetic') fields.push(activity.expression);
  if (activity.kind === 'choice') fields.push(...activity.options.map(({ label }) => label));
  if (activity.kind === 'match') fields.push(...activity.pairs.flatMap(({ left, right }) => [left, right]));
  if (activity.kind === 'order') fields.push(...activity.items.map(({ label }) => label));
  if (activity.kind === 'categorize') {
    fields.push(...activity.categories.map(({ label }) => label));
    fields.push(...activity.items.map(({ label }) => label));
  }
  return fields.join(' ');
}

function englishActivityText(activity: ActivityDefinition): string {
  const fields = [activity.prompt, activity.hint, activity.explanation];
  if (activity.kind === 'choice') {
    const correctOption = activity.options.find(({ id }) => id === activity.correctOptionId);
    if (correctOption) fields.push(correctOption.label);
  }
  if (activity.kind === 'match') fields.push(...activity.pairs.flatMap(({ left, right }) => [left, right]));
  if (activity.kind === 'order') fields.push(...activity.items.map(({ label }) => label));
  if (activity.kind === 'categorize') {
    fields.push(...activity.categories.map(({ label }) => label));
    fields.push(...activity.items.map(({ label }) => label));
  }
  return fields.join(' ');
}

export function derivePilotQuestionKnowledgePointIds(
  sourceUnitId: string,
  activity: ActivityDefinition,
): string[] {
  if (!PILOT_UNIT_IDS.has(sourceUnitId)) throw new Error(`No pilot knowledge-point mapping exists for ${sourceUnitId}.`);

  const text = activityText(activity);
  switch (sourceUnitId) {
    case 'grade-3/term-1/english/unit-01': {
      const englishText = englishActivityText(activity);
      const ids: string[] = [];
      if (/\b(?:name|my|your|dear)\b|姓名|名字|称呼|自我介绍|介绍句子|介绍自己/i.test(englishText)) {
        ids.push('name-and-self-introduction');
      }
      if (/\b(?:age|old|year|class|grade)\b|年龄|几岁|岁数|班级|年级/i.test(englishText)) {
        ids.push('age-and-class');
      }
      if (ids.length === 0) throw new Error(`Could not classify English question ${activity.id}.`);
      return ids;
    }
    case 'grade-2/term-1/math/unit-01': {
      const ids: string[] = [];
      if (/(厘米|米|单位|换算|更适合|单位选择)/.test(text)) ids.push('length-units');
      if (/(直尺|线段|刻度|读数|从\s*0|估测|估计|复测|长度记录|测量步骤|测量方法|测量结果)/.test(text)) ids.push('measurement-and-estimation');
      if (ids.length === 0 && /校园测量活动|测量.*安全范围/.test(text)) return ['measurement-activity-planning'];
      if (ids.length === 0) throw new Error(`Could not classify length question ${activity.id}.`);
      return ids;
    }
    case 'grade-2/term-1/math/unit-02': {
      const ids: string[] = [];
      if (/[+]|加法|加上|相加|进位|进1|满十|增加|合起来|收到|放入|放进|装入|加入|相同加数/.test(text)) ids.push('two-digit-addition');
      if (/[-]|减法|减去|退位|退1|不够减|减少|还剩|剩下|用去|借出|剪去|送出/.test(text)) ids.push('two-digit-subtraction');
      if (/两步加减题|一个数加.*等于|结果.*不同|检查.*算式|核对|验算/.test(text)) {
        if (!ids.includes('two-digit-addition')) ids.push('two-digit-addition');
        if (!ids.includes('two-digit-subtraction')) ids.push('two-digit-subtraction');
      }
      if (ids.length === 0) throw new Error(`Could not classify addition/subtraction question ${activity.id}.`);
      return ids;
    }
    case 'grade-2/term-1/math/unit-03': {
      const ids: string[] = [];
      if (/(顶点|两条边|角的组成|角由|角.*组成|角.*部分|角.*出现|边相遇|物品.*角|观察.*角)/.test(text)) ids.push('angle-parts');
      if (/(直角|张开|比较|大小|小于|大于|参照|另一条边)/.test(text)) ids.push('angle-comparison');
      if (ids.length === 0) throw new Error(`Could not classify angle question ${activity.id}.`);
      return ids;
    }
    case 'grade-2/term-1/math/unit-04': {
      const ids: string[] = [];
      if (/(加数相同|相同加数|相加|每组|几组|每排|每袋|每辆|每盒|每行|每张|分组|重复相加|组数|每份)/.test(text)) ids.push('equal-groups-multiplication');
      if (/(乘法|乘|×|积|口诀|算式)/.test(text)) ids.push('multiplication-facts');
      if (ids.length === 0) throw new Error(`Could not classify multiplication question ${activity.id}.`);
      return ids;
    }
    default:
      throw new Error(`No pilot knowledge-point mapping exists for ${sourceUnitId}.`);
  }
}
