import type { ActivityDefinition } from '../../content/types';
import { grade1MathUnit01SupplementalActivities } from './grade1MathUnit01SupplementalActivities';
import { grade1MathUnit02SupplementalActivities } from './grade1MathUnit02SupplementalActivities';
import { grade1MathUnit03SupplementalActivities } from './grade1MathUnit03SupplementalActivities';
import { grade1MathUnit04SupplementalActivities } from './grade1MathUnit04SupplementalActivities';
import { grade1MathUnit05SupplementalActivities } from './grade1MathUnit05SupplementalActivities';

const PILOT_UNIT_IDS = new Set([
  'grade-1/term-1/math/unit-01',
  'grade-1/term-1/math/unit-02',
  'grade-1/term-1/math/unit-03',
  'grade-1/term-1/math/unit-04',
  'grade-1/term-1/math/unit-05',
  'grade-2/term-1/math/unit-01',
  'grade-2/term-1/math/unit-02',
  'grade-2/term-1/math/unit-03',
  'grade-2/term-1/math/unit-04',
  'grade-3/term-1/english/unit-01',
  'grade-5/term-1/chinese/unit-01',
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
    case 'grade-1/term-1/math/unit-02': {
      const supplemental = grade1MathUnit02SupplementalActivities.find(({ activity: candidate }) => candidate.id === activity.id);
      if (supplemental) return [...supplemental.knowledgePointIds];
      if (/路线|路线卡|路线顺序|步骤|出发|到达/u.test(text)) {
        const ids = ['route-sequence'];
        if (/参照物|参照方向|观察方向|面向/u.test(text)) ids.push('reference-point');
        return ids;
      }
      const ids: string[] = [];
      if (/参照物|参照方向|站在.*看|站到|转向|面对面|对.*来说|观察方向|起点/u.test(text)) {
        ids.push('reference-point');
      }
      if (/位置|上面|下面|左边|右边|前面|后面|里面|外面|上下|左右|里外/u.test(text)) {
        ids.push('relative-position');
      }
      if (ids.length === 0) throw new Error(`Could not classify Grade 1 math question ${activity.id}.`);
      return [...new Set(ids)];
    }
    case 'grade-1/term-1/math/unit-03': {
      const supplemental = grade1MathUnit03SupplementalActivities.find(({ activity: candidate }) => candidate.id === activity.id);
      if (supplemental) return [...supplemental.knowledgePointIds];

      const ids: string[] = [];
      if (/组成|拆开|合起来|合成|加起来|凑成|\+/u.test(text)) ids.push('number-composition-within-five');
      if (/[+]|加法|加上|相加|增加|又收到|又放上/u.test(text)) ids.push('addition-within-five');
      if (/[-−]|减法|减去|拿走|去掉|还剩|剩下|取走|用去/u.test(text)) ids.push('subtraction-within-five');
      if (/比较|大于|小于|不大于|不小于|更大|更小|从小到大|从大到小|按得数|分类标准/u.test(text)) {
        ids.push('comparison-within-five');
      }
      if (/检查|核对|验算|正确结果|算错|改正|错连|分错/u.test(text)) ids.push('checking-within-five');
      if (ids.length === 0) throw new Error(`Could not classify Grade 1 math question ${activity.id}.`);
      return [...new Set(ids)];
    }
    case 'grade-1/term-1/math/unit-04': {
      const supplemental = grade1MathUnit04SupplementalActivities.find(({ activity: candidate }) => candidate.id === activity.id);
      if (supplemental) return [...supplemental.knowledgePointIds];

      const fields = [activity.prompt];
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
      const geometryText = fields.join(' ');
      const ids: string[] = [];
      if (/最像|相似|辨认|立体图形|骰子|足球|水杯|盒子|整体形状|属于哪种|什么形状|球体|正方体|长方体|圆柱体/u.test(geometryText)) {
        ids.push('solid-shape-recognition');
      }
      if (/平平的面|平面|弯曲的面|弯曲面|侧面|底面|棱|顶点|表面|特征|外形/u.test(geometryText)) {
        ids.push('solid-shape-features');
      }
      if (/滚动|能滚|不能滚|叠|稳|底座|分类|分成|排列|步骤|观察|贴着桌面|接触桌面|轻轻推|正确排列/u.test(geometryText)) {
        ids.push('solid-shape-use');
      }
      if (ids.length === 0) throw new Error(`Could not classify solid-shape question ${activity.id}.`);
      return ids;
    }
    case 'grade-1/term-1/math/unit-05': {
      const supplemental = grade1MathUnit05SupplementalActivities.find(({ activity: candidate }) => candidate.id === activity.id);
      if (supplemental) return [...supplemental.knowledgePointIds];

      const ids: string[] = [];
      if (/从小到大|从大到小|前面|后面|数序|接着数|连续数|漏数/u.test(text)) ids.push('number-sequence-within-ten');
      if (/组成|合成|分成|合起来|合在一起|两部分|几和几/u.test(text)) ids.push('number-composition-within-ten');
      if (/[+]|加法|加上|相加|增加|又收到|又放上/u.test(text)) ids.push('addition-within-ten');
      if (/[-−]|减法|减去|拿走|去掉|还剩|剩下|取走|用去/u.test(text)) ids.push('subtraction-within-ten');
      if (/比较|大于|小于|不大于|不小于|更大|更小|按得数|得数.*比较|分类标准/u.test(text)) ids.push('comparison-within-ten');
      if (/检查|核对|验算|正确结果|算错|改正|错连|分错|逆运算/u.test(text)) ids.push('checking-within-ten');
      if (ids.length === 0) throw new Error(`Could not classify Grade 1 math question ${activity.id}.`);
      return [...new Set(ids)];
    }
    case 'grade-1/term-1/math/unit-01': {
      const supplemental = grade1MathUnit01SupplementalActivities.find(({ activity: candidate }) => candidate.id === activity.id);
      if (supplemental) return [...supplemental.knowledgePointIds];

      const ids: string[] = [];
      if (/空盘|一个也没有|没有.*(?:积木|苹果|卡片|球|物品)|还剩.*(?:0|没有)|(?:0|零).*(?:表示|开始|后面|前面|个)|表示.*(?:没有|空)/u.test(text)) {
        ids.push('zero-as-none');
      }
      if (/前面|后面|顺序|排列|紧挨着|接下来|从小到大|从大到小/u.test(text)
        || (activity.kind === 'arithmetic' && /\+\s*1/u.test(activity.expression))) {
        ids.push('number-sequence');
      }
      if (/数一数|点数|数出|漏数|重复数|逐个|一支一支|总数|一共|每个物品.*数|每.*点一次|数两排|数一排/u.test(text)) {
        ids.push('counting-one-to-one');
      }
      if (/比较|哪个数更大|哪个数更小|比.*(?:大|小)|更多|少|小于|分类|相同|一样多|哪边.*多/u.test(text)) {
        ids.push('quantity-comparison');
      }
      if (ids.length === 0) throw new Error(`Could not classify Grade 1 math question ${activity.id}.`);
      return [...new Set(ids)];
    }
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
    case 'grade-5/term-1/chinese/unit-01': {
      const ids: string[] = [];
      if (activity.id.startsWith('grade-5/term-1/chinese/unit-01/high/task-01/')) {
        ids.push('class-charter');
      }
      if (/班级公约|公约|班级规则|班级.*(建议|讨论|共同目标)|全班.*(讨论|表决)|同学.*意见|建议|规则|表决|倾听|约定|条目|共识/.test(text)) {
        if (!ids.includes('class-charter')) ids.push('class-charter');
      }
      if (/心爱之物|珍惜|珍贵|习作|写作|修改|结尾|开头|物品.*经历|经历.*物品/.test(text)) {
        ids.push('beloved-object-writing');
      }
      if (/白鹭|落花生|桂花|珍珠鸟|蝉|具体事物|借物|抒发感情|作者的感受|思乡|事物.*感情/.test(text)) {
        ids.push('object-and-emotion');
      }
      if (/线索|依据|语境|细节|上下文|篇目|课文|诗句|比较|证据|描写|理解|判断|词义|词语|搭配|温和/.test(text)) {
        ids.push('reading-evidence');
      }
      if (ids.length === 0) throw new Error(`Could not classify Chinese question ${activity.id}.`);
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
