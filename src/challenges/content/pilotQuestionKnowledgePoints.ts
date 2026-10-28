import type { ActivityDefinition } from '../../content/types';
import pilotManifest from './pilotManifest';
import { grade1Term1EnglishUnit01SupplementalActivities } from './grade1Term1EnglishUnit01SupplementalActivities';
import { grade1Term1EnglishUnit02SupplementalActivities } from './grade1Term1EnglishUnit02SupplementalActivities';
import { grade1Term1EnglishUnit03SupplementalActivities } from './grade1Term1EnglishUnit03SupplementalActivities';
import { grade1Term1EnglishUnit04SupplementalActivities } from './grade1Term1EnglishUnit04SupplementalActivities';
import { grade1Term1EnglishUnit05SupplementalActivities } from './grade1Term1EnglishUnit05SupplementalActivities';
import { grade1Term1EnglishUnit06SupplementalActivities } from './grade1Term1EnglishUnit06SupplementalActivities';
import { grade1Term2EnglishUnit01SupplementalActivities } from './grade1Term2EnglishUnit01SupplementalActivities';
import { grade1Term2EnglishUnit02SupplementalActivities } from './grade1Term2EnglishUnit02SupplementalActivities';
import { grade1Term2EnglishUnit03SupplementalActivities } from './grade1Term2EnglishUnit03SupplementalActivities';
import { grade1Term2EnglishUnit04SupplementalActivities } from './grade1Term2EnglishUnit04SupplementalActivities';
import { grade1Term2EnglishUnit05SupplementalActivities } from './grade1Term2EnglishUnit05SupplementalActivities';
import { grade1Term2EnglishUnit06SupplementalActivities } from './grade1Term2EnglishUnit06SupplementalActivities';
import { grade1MathUnit01SupplementalActivities } from './grade1MathUnit01SupplementalActivities';
import { grade1MathUnit02SupplementalActivities } from './grade1MathUnit02SupplementalActivities';
import { grade1MathUnit03SupplementalActivities } from './grade1MathUnit03SupplementalActivities';
import { grade1MathUnit04SupplementalActivities } from './grade1MathUnit04SupplementalActivities';
import { grade1MathUnit05SupplementalActivities } from './grade1MathUnit05SupplementalActivities';
import { grade1MathUnit06SupplementalActivities } from './grade1MathUnit06SupplementalActivities';
import { grade1MathUnit07SupplementalActivities } from './grade1MathUnit07SupplementalActivities';
import { grade1MathUnit08SupplementalActivities } from './grade1MathUnit08SupplementalActivities';
import { grade1MathUnit09SupplementalActivities } from './grade1MathUnit09SupplementalActivities';
import { grade1Term2MathUnit01SupplementalActivities } from './grade1Term2MathUnit01SupplementalActivities';
import { grade1Term2MathUnit02SupplementalActivities } from './grade1Term2MathUnit02SupplementalActivities';
import { grade1Term2MathUnit03SupplementalActivities } from './grade1Term2MathUnit03SupplementalActivities';
import { grade1Term2MathUnit04SupplementalActivities } from './grade1Term2MathUnit04SupplementalActivities';
import { grade1Term2MathUnit05SupplementalActivities } from './grade1Term2MathUnit05SupplementalActivities';
import { grade1Term2MathUnit06SupplementalActivities } from './grade1Term2MathUnit06SupplementalActivities';
import { grade1Term2MathUnit07SupplementalActivities } from './grade1Term2MathUnit07SupplementalActivities';
import { grade1Term2MathUnit08SupplementalActivities } from './grade1Term2MathUnit08SupplementalActivities';
import { grade2Term1ChineseUnit01SupplementalActivities } from './grade2Term1ChineseUnit01SupplementalActivities';
import { grade2Term1ChineseUnit02SupplementalActivities } from './grade2Term1ChineseUnit02SupplementalActivities';
import { grade2Term1ChineseUnit03SupplementalActivities } from './grade2Term1ChineseUnit03SupplementalActivities';
import { grade2Term1ChineseUnit04SupplementalActivities } from './grade2Term1ChineseUnit04SupplementalActivities';
import { grade2Term1ChineseUnit05SupplementalActivities } from './grade2Term1ChineseUnit05SupplementalActivities';
import { grade2Term1ChineseUnit06SupplementalActivities } from './grade2Term1ChineseUnit06SupplementalActivities';
import { grade2Term1ChineseUnit07SupplementalActivities } from './grade2Term1ChineseUnit07SupplementalActivities';
import { grade2Term1ChineseUnit08SupplementalActivities } from './grade2Term1ChineseUnit08SupplementalActivities';
import { grade2Term2ChineseUnit01SupplementalActivities } from './grade2Term2ChineseUnit01SupplementalActivities';
import { grade2Term2ChineseUnit02SupplementalActivities } from './grade2Term2ChineseUnit02SupplementalActivities';
import { grade2Term2ChineseUnit03SupplementalActivities } from './grade2Term2ChineseUnit03SupplementalActivities';
import { grade2Term1MathUnit03SupplementalActivities } from './grade2Term1MathUnit03SupplementalActivities';
import { grade2Term1MathUnit04SupplementalActivities } from './grade2Term1MathUnit04SupplementalActivities';
import { grade2Term1MathUnit05SupplementalActivities } from './grade2Term1MathUnit05SupplementalActivities';
import { grade2Term1MathUnit06SupplementalActivities } from './grade2Term1MathUnit06SupplementalActivities';
import { grade2Term1MathUnit07SupplementalActivities } from './grade2Term1MathUnit07SupplementalActivities';
import { grade2Term1MathUnit08SupplementalActivities } from './grade2Term1MathUnit08SupplementalActivities';
import { grade2Term1MathUnit09SupplementalActivities } from './grade2Term1MathUnit09SupplementalActivities';
import { grade2Term1EnglishUnit01SupplementalActivities } from './grade2Term1EnglishUnit01SupplementalActivities';
import { grade2Term1EnglishUnit02SupplementalActivities } from './grade2Term1EnglishUnit02SupplementalActivities';
import { grade2Term1EnglishUnit03SupplementalActivities } from './grade2Term1EnglishUnit03SupplementalActivities';
import { grade2Term1EnglishUnit04SupplementalActivities } from './grade2Term1EnglishUnit04SupplementalActivities';
import { grade2Term1EnglishUnit05SupplementalActivities } from './grade2Term1EnglishUnit05SupplementalActivities';
import { grade2Term1EnglishUnit06SupplementalActivities } from './grade2Term1EnglishUnit06SupplementalActivities';

const PILOT_UNIT_IDS = new Set([
  'grade-1/term-2/chinese/unit-01',
  'grade-1/term-2/chinese/unit-02',
  'grade-1/term-2/chinese/unit-03',
  'grade-1/term-2/chinese/unit-04',
  'grade-1/term-2/chinese/unit-05',
  'grade-1/term-2/chinese/unit-06',
  'grade-1/term-2/chinese/unit-07',
  'grade-1/term-2/chinese/unit-08',
  'grade-1/term-1/chinese/unit-01',
  'grade-1/term-1/chinese/unit-02',
  'grade-1/term-1/chinese/unit-03',
  'grade-1/term-1/chinese/unit-04',
  'grade-1/term-1/chinese/unit-05',
  'grade-1/term-1/chinese/unit-06',
  'grade-1/term-1/chinese/unit-07',
  'grade-1/term-1/chinese/unit-08',
  'grade-1/term-1/math/unit-01',
  'grade-1/term-1/math/unit-02',
  'grade-1/term-1/math/unit-03',
  'grade-1/term-1/math/unit-04',
  'grade-1/term-1/math/unit-05',
  'grade-1/term-1/math/unit-06',
  'grade-1/term-1/math/unit-07',
  'grade-1/term-1/math/unit-08',
  'grade-1/term-1/math/unit-09',
  'grade-1/term-2/math/unit-01',
  'grade-1/term-2/math/unit-02',
  'grade-1/term-2/math/unit-03',
  'grade-1/term-2/math/unit-04',
  'grade-1/term-2/math/unit-05',
  'grade-1/term-2/math/unit-06',
  'grade-1/term-2/math/unit-07',
  'grade-1/term-2/math/unit-08',
  'grade-1/term-2/english/unit-01',
  'grade-1/term-2/english/unit-02',
  'grade-1/term-2/english/unit-03',
  'grade-1/term-2/english/unit-04',
  'grade-1/term-2/english/unit-05',
  'grade-1/term-2/english/unit-06',
  'grade-1/term-1/english/unit-01',
  'grade-1/term-1/english/unit-02',
  'grade-1/term-1/english/unit-03',
  'grade-1/term-1/english/unit-04',
  'grade-1/term-1/english/unit-05',
  'grade-1/term-1/english/unit-06',
  'grade-2/term-1/math/unit-01',
  'grade-2/term-1/math/unit-02',
  'grade-2/term-1/math/unit-03',
  'grade-2/term-1/math/unit-04',
  'grade-2/term-1/math/unit-05',
  'grade-2/term-1/math/unit-06',
  'grade-2/term-1/math/unit-07',
  'grade-2/term-1/math/unit-08',
  'grade-2/term-1/math/unit-09',
  'grade-2/term-1/english/unit-01',
  'grade-2/term-1/english/unit-02',
  'grade-2/term-1/english/unit-03',
  'grade-2/term-1/english/unit-04',
  'grade-2/term-1/english/unit-05',
  'grade-2/term-1/english/unit-06',
  'grade-2/term-1/chinese/unit-01',
  'grade-2/term-1/chinese/unit-02',
  'grade-2/term-1/chinese/unit-03',
  'grade-2/term-1/chinese/unit-04',
  'grade-2/term-1/chinese/unit-05',
  'grade-2/term-1/chinese/unit-06',
  'grade-2/term-1/chinese/unit-07',
  'grade-2/term-1/chinese/unit-08',
  'grade-2/term-2/chinese/unit-01',
  'grade-2/term-2/chinese/unit-02',
  'grade-2/term-2/chinese/unit-03',
  ...(['chinese', 'math', 'english'] as const).flatMap((subject) => {
    const unitCount = subject === 'chinese' ? 8 : subject === 'math' ? 10 : 6;
    return Array.from({ length: unitCount }, (_, index) =>
      `grade-2/term-2/${subject}/unit-${String(index + 1).padStart(2, '0')}`);
  }),
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
    case 'grade-1/term-2/chinese/unit-01':
      return ['seasonal-weather-and-nature-observation'];
    case 'grade-1/term-2/chinese/unit-02':
      return ['family-relationships-shared-experience-and-wishes'];
    case 'grade-1/term-2/chinese/unit-03':
      return ['friendship-cooperation-and-game-rules'];
    case 'grade-1/term-2/chinese/unit-04':
      return ['night-observation-festivals-and-politeness'];
    case 'grade-1/term-2/chinese/unit-05':
      return ['animal-features-campus-and-life-literacy'];
    case 'grade-1/term-2/chinese/unit-06':
      return ['pond-life-weather-and-sequential-observation'];
    case 'grade-1/term-2/chinese/unit-07':
      return ['stationery-organization-time-order-and-habits'];
    case 'grade-1/term-2/chinese/unit-08':
      return ['animal-story-clues-and-cause-effect'];
    case 'grade-1/term-1/chinese/unit-01':
      return ['daily-life-literacy-and-character-meanings'];
    case 'grade-1/term-1/chinese/unit-02':
      return ['initials-finals-and-tone-marking'];
    case 'grade-1/term-1/chinese/unit-03':
      return ['compound-nasal-finals-and-whole-syllables'];
    case 'grade-1/term-1/chinese/unit-04':
      return ['seasons-weather-and-natural-observation'];
    case 'grade-1/term-1/chinese/unit-05':
      return ['common-character-meanings-in-daily-life'];
    case 'grade-1/term-1/chinese/unit-06':
      return ['shadow-observation-and-animal-features'];
    case 'grade-1/term-1/chinese/unit-07':
      return ['size-and-distance-comparison'];
    case 'grade-1/term-1/chinese/unit-08':
      return ['nature-imagination-and-story-sequence'];
    case 'grade-1/term-1/english/unit-01': {
      const supplemental = grade1Term1EnglishUnit01SupplementalActivities.find(({ activity: candidate }) => candidate.id === activity.id);
      if (supplemental) return [...supplemental.knowledgePointIds];

      const englishText = englishActivityText(activity);
      const ids: string[] = [];
      if (/\b(?:good morning|good afternoon|goodbye|bye|hello|hi)\b/i.test(englishText)) {
        ids.push('greetings-and-farewells');
      }
      if (/\b(?:stand up|sit down|close your eyes|open your eyes|show me|what's missing)\b/i.test(englishText)) {
        ids.push('classroom-instructions');
      }
      if (/\b(?:book|ruler|pencil|schoolbag|teacher|i have)\b/i.test(englishText)) {
        ids.push('school-supplies-and-sentences');
      }
      if (ids.length === 0) throw new Error(`Could not classify Grade 1 English question ${activity.id}.`);
      return [...new Set(ids)];
    }
    case 'grade-1/term-1/english/unit-02': {
      const supplemental = grade1Term1EnglishUnit02SupplementalActivities.find(({ activity: candidate }) => candidate.id === activity.id);
      if (supplemental) return [...supplemental.knowledgePointIds];

      const englishText = englishActivityText(activity);
      const ids: string[] = [];
      if (/\b(?:eye|ear|nose|mouth)\b/i.test(englishText)) ids.push('face-feature-vocabulary');
      if (/\bTouch your (?:eye|ear|nose|mouth)\b/i.test(englishText)) ids.push('face-action-instructions');
      if (/\bThis is my (?:eye|ear|nose|mouth)\b/i.test(englishText)) ids.push('face-description-sentences');
      if (/介绍句子|词语.*意思|词序|关键词|词语顺序/u.test(englishText)) ids.push('face-description-sentences');
      if (ids.length === 0) throw new Error(`Could not classify Grade 1 English question ${activity.id}.`);
      return [...new Set(ids)];
    }
    case 'grade-1/term-1/english/unit-03': {
      const supplemental = grade1Term1EnglishUnit03SupplementalActivities.find(({ activity: candidate }) => candidate.id === activity.id);
      if (supplemental) return [...supplemental.knowledgePointIds];

      const englishText = englishActivityText(activity);
      const ids: string[] = [];
      if (/\b(?:cat|cats|dog|dogs|bird|tiger|monkey)\b|动物词|动物名称/iu.test(englishText)) ids.push('animal-word-vocabulary');
      if (/\bI like cats?\b/i.test(englishText)) ids.push('animal-preference-sentences');
      if (/\bIt is a (?:cat|dog|bird|tiger)\b/i.test(englishText)) ids.push('animal-description-sentences');
      if (/关键词|词序|词语.*意思|词语顺序|介绍句子/u.test(englishText)) ids.push('animal-description-sentences');
      if (ids.length === 0) throw new Error(`Could not classify Grade 1 English question ${activity.id}.`);
      return [...new Set(ids)];
    }
    case 'grade-1/term-1/english/unit-04': {
      const supplemental = grade1Term1EnglishUnit04SupplementalActivities.find(({ activity: candidate }) => candidate.id === activity.id);
      if (supplemental) return [...supplemental.knowledgePointIds];

      const englishText = englishActivityText(activity);
      const ids: string[] = [];
      if (/\b(?:one|two|three|four|five|six|seven|eight|nine|ten)\b|数词|数词卡|数字/u.test(englishText)) {
        ids.push('number-word-vocabulary');
      }
      if (/顺序|接着|后面|前面|数数|排列|排序|\b(?:one|two|three|four|five|six|seven|eight|nine|ten)\s*,/iu.test(englishText)) {
        ids.push('number-sequence');
      }
      if (/\bHow many\b|多少本|询问.*数量|问.*数量/iu.test(englishText)) {
        ids.push('quantity-question');
      }
      if (/\bI have\b|我有\d|回答.*数量|陈述.*数量/iu.test(englishText)) {
        ids.push('quantity-sentence');
      }
      if (ids.length === 0) throw new Error(`Could not classify Grade 1 English question ${activity.id}.`);
      return [...new Set(ids)];
    }
    case 'grade-1/term-1/english/unit-05': {
      const supplemental = grade1Term1EnglishUnit05SupplementalActivities.find(({ activity: candidate }) => candidate.id === activity.id);
      if (supplemental) return [...supplemental.knowledgePointIds];

      const englishText = englishActivityText(activity);
      const ids: string[] = [];
      if (/\b(?:red|blue|yellow|green)\b|颜色词|词卡|英文词/u.test(englishText)) {
        ids.push('colour-word-vocabulary');
      }
      if (/\bWhat colour is it\b|询问颜色|问.*颜色|颜色.*问句/u.test(englishText)) {
        ids.push('colour-question');
      }
      if (/\bIt(?:'|’)s\s+(?:red|blue|yellow|green)\b|描述颜色|描述.*颜色|说它是|陈述.*颜色|介绍句子|句子前|词序|关键词/u.test(englishText)) {
        ids.push('colour-description');
      }
      if (ids.length === 0) throw new Error(`Could not classify Grade 1 English question ${activity.id}.`);
      return [...new Set(ids)];
    }
    case 'grade-1/term-1/english/unit-06': {
      const supplemental = grade1Term1EnglishUnit06SupplementalActivities.find(({ activity: candidate }) => candidate.id === activity.id);
      if (supplemental) return [...supplemental.knowledgePointIds];

      const englishText = englishActivityText(activity);
      const ids: string[] = [];
      if (/\b(?:apple|pear|banana|orange)s?\b|水果词|英文词|词卡|词义|词语.*意思|匹配.*中文|配对正确/iu.test(englishText)) {
        ids.push('fruit-word-vocabulary');
      }
      if (activity.kind === 'categorize' || /belongs to which group|苹果.*其他水果|其他水果.*苹果|水果.*分组|分.*水果/u.test(englishText)) {
        ids.push('fruit-classification');
      }
      if (/\bWhat fruit do you like\b|\bI like (?:apples|pears|bananas|oranges)\b|喜欢.*水果|水果.*喜好|询问.*喜好|表达.*喜好/iu.test(englishText)) {
        ids.push('fruit-preferences');
      }
      if (ids.length === 0) throw new Error(`Could not classify Grade 1 English question ${activity.id}.`);
      return [...new Set(ids)];
    }
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
    case 'grade-1/term-1/math/unit-06': {
      const supplemental = grade1MathUnit06SupplementalActivities.find(({ activity: candidate }) => candidate.id === activity.id);
      if (supplemental) return [...supplemental.knowledgePointIds];

      const ids: string[] = [];
      if (/十位|个位|几个十|几个一|数位|整十数|数和.*信息|写数|合起来|组成|\b10\s*\+/u.test(text)
        || (activity.kind === 'arithmetic' && /^\s*10\s*\+/u.test(activity.expression))) {
        ids.push('teen-number-composition');
      }
      if (/前面|后面|紧挨着|接着数|数到|往前|往后|顺序|排列|从小到大|从大到小|向前退|漏数/u.test(text)) {
        ids.push('number-sequence-eleven-to-twenty');
      }
      if (/比较|比.*大|比.*小|大于|小于|多少|从小到大|从大到小|最小|最大/u.test(text)) {
        ids.push('number-comparison-eleven-to-twenty');
      }
      if (ids.length === 0) throw new Error(`Could not classify Grade 1 math question ${activity.id}.`);
      return [...new Set(ids)];
    }
    case 'grade-1/term-1/math/unit-07': {
      const supplemental = grade1MathUnit07SupplementalActivities.find(({ activity: candidate }) => candidate.id === activity.id);
      if (supplemental) return [...supplemental.knowledgePointIds];

      const ids: string[] = [];
      if (/整时|几时|指向\s*12|表示.*时刻/u.test(text)) ids.push('clock-whole-hour-reading');
      if (/半时|时半|指向\s*6|两个数字之间|和.*之间/u.test(text)) ids.push('clock-half-hour-reading');
      if (/时针|分针|短针|长针|指针/u.test(text)) ids.push('clock-hand-roles');
      if (ids.length === 0) throw new Error(`Could not classify Grade 1 clock question ${activity.id}.`);
      return [...new Set(ids)];
    }
    case 'grade-1/term-1/math/unit-08': {
      const supplemental = grade1MathUnit08SupplementalActivities.find(({ activity: candidate }) => candidate.id === activity.id);
      if (supplemental) return [...supplemental.knowledgePointIds];

      const ids: string[] = [];
      const additions = [...text.matchAll(/(\d{1,2})\s*\+\s*(\d{1,2})/gu)]
        .map(([, left, right]) => [Number(left), Number(right)] as const);
      if (additions.length > 0 || /加法|相加|合起来|一共|总数/u.test(text)) ids.push('addition-within-twenty');
      if (additions.some(([left, right]) => left < 10 && right < 10 && left + right > 10 && left + right <= 20)) {
        ids.push('carry-addition-within-twenty');
        ids.push('make-ten-strategy');
      }
      if (/凑十|凑成\s*(?:10|十)|拆成.*(?:10|十)/u.test(text)) ids.push('make-ten-strategy');
      if (/原有|书架|苹果|贴纸|卡片|梨|铅笔|书本|收到|放进|添|得到|一共|总数|合起来|数量/u.test(text)) {
        ids.push('addition-situation-modeling');
      }
      if (/检查|核对|验算|逆运算|改正|算成|正确结果|结果不对|应改|分错|错连/u.test(text)) {
        ids.push('addition-checking');
      }
      if (ids.length === 0) throw new Error(`Could not classify Grade 1 addition question ${activity.id}.`);
      return [...new Set(ids)];
    }
    case 'grade-1/term-1/math/unit-09': {
      const supplemental = grade1MathUnit09SupplementalActivities.find(({ activity: candidate }) => candidate.id === activity.id);
      if (supplemental) return [...supplemental.knowledgePointIds];

      const correctOption = activity.kind === 'choice'
        ? activity.options.find(({ id }) => id === activity.correctOptionId)?.label ?? ''
        : '';
      const reviewText = activity.kind === 'choice' ? `${activity.prompt} ${correctOption}` : text;
      const ids: string[] = [];
      const additions = [...reviewText.matchAll(/(\d{1,2})\s*\+\s*(\d{1,2})/gu)];
      const subtractions = [...reviewText.matchAll(/(\d{1,2})\s*[-−]\s*(\d{1,2})/gu)];
      const isAdditionCheck = /检查|核对|验算|改正|算成/u.test(reviewText) && additions.length > 0;
      if (additions.length > 0 || /加法|相加|合起来|一共|总数/u.test(reviewText)) ids.push('addition-within-twenty');
      if (/从小到大|从大到小|接着数|数到|漏数|按顺序|连续数|十位|个位|几个一|一十/u.test(reviewText)) {
        ids.push('number-sequence-eleven-to-twenty');
      }
      const promptNumbers = [...activity.prompt.matchAll(/(\d{1,2})/gu)].map(([, value]) => Number(value));
      if (/比较|比.*大|比.*小|更多|更少/u.test(activity.prompt)) {
        ids.push(promptNumbers.some((value) => value > 10) ? 'number-comparison-eleven-to-twenty' : 'comparison-within-ten');
      }
      const hasTeenNumberTakeaway = /拿出|拿走|取出|用去|吃掉/u.test(reviewText)
        && ([...reviewText.matchAll(/(\d{1,2})/gu)].some(([, value]) => Number(value) > 10)
          || (/原有|又放/u.test(activity.prompt) && promptNumbers.length >= 2 && promptNumbers[0]! + promptNumbers[1]! > 10));
      if ((subtractions.some(([, left, right]) => Number(left) > 10 && Number(right) > 0) || hasTeenNumberTakeaway)
        && !isAdditionCheck) {
        throw new Error(`Question ${activity.id} is outside the Grade 1 Term 1 review scope.`);
      }
      if (subtractions.some(([, left, right]) => Number(left) <= 10 && Number(right) <= Number(left))
        || (/拿出|拿走|取出|吃掉|还剩/u.test(reviewText) && /\b(?:[1-9]|10)\b/u.test(reviewText))) {
        ids.push('subtraction-within-ten');
      }
      if (isAdditionCheck || /检查|核对|验算|改正|算成/u.test(reviewText)) ids.push('addition-checking');
      if (/又放|又来|一共|总数|两排|合起来/u.test(reviewText) && additions.length > 0) ids.push('addition-situation-modeling');
      if (/参照物|位置|左边|右边|前面|后面|里面|外面|上下|左右/u.test(reviewText)) ids.push('relative-position');
      if (/立体图形|正方体|长方体|圆柱体|球体|整体外形|骰子/u.test(reviewText)) ids.push('solid-shape-recognition');
      if (/平平的面|平面|弯曲的面|弯曲面|圆形底|棱|表面/u.test(reviewText)) ids.push('solid-shape-features');
      if (/滚动|能滚|不能滚|叠放|放稳|稳稳/u.test(reviewText)) ids.push('solid-shape-use');
      if (/半时|时半|分针指向\s*6|两个数字之间/u.test(reviewText)) ids.push('clock-half-hour-reading');
      else if (/时刻|整时|分针指向\s*12|\d{1,2}\s*时|时针|分针/u.test(reviewText)) ids.push('clock-whole-hour-reading');
      if (ids.length === 0) throw new Error(`Could not classify Grade 1 math review question ${activity.id}.`);
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
    case 'grade-1/term-2/math/unit-01': {
      const supplemental = grade1Term2MathUnit01SupplementalActivities.find(({ activity: candidate }) => candidate.id === activity.id);
      if (supplemental) return [...supplemental.knowledgePointIds];

      const ids: string[] = [];
      if (/图形卡|图形|三角形|长方形|正方形|圆形|整体轮廓|辨认|转动/u.test(text)) {
        ids.push('plane-shape-recognition');
      }
      if (/直边|边缘|边数|直线|曲线|有角|没有角|四条边|三条边|整体轮廓|外轮廓/u.test(text)) {
        ids.push('plane-shape-features');
      }
      if (/拼|摆|组合|整体图案|拼组|拼摆|拼图/u.test(text)) {
        ids.push('plane-shape-composition');
      }
      if (ids.length === 0) throw new Error(`Could not classify Grade 1 Term 2 math shape question ${activity.id}.`);
      return [...new Set(ids)];
    }
    case 'grade-1/term-2/math/unit-02': {
      const supplemental = grade1Term2MathUnit02SupplementalActivities.find(({ activity: candidate }) => candidate.id === activity.id);
      if (supplemental) return [...supplemental.knowledgePointIds];

      const ids = ['subtraction-within-20'];
      if (activity.kind === 'arithmetic' && /[-−]/u.test(activity.expression)) ids.push('subtraction-strategy');
      if (/逆运算|验算|检查|核对|改正|错误|合理/u.test(text)) ids.push('inverse-operation-check');
      return ids;
    }
    case 'grade-1/term-2/math/unit-03': {
      const supplemental = grade1Term2MathUnit03SupplementalActivities.find(({ activity: candidate }) => candidate.id === activity.id);
      if (supplemental) return [...supplemental.knowledgePointIds];

      const ids: string[] = [];
      if (/分类|分组|按颜色|分类标准|哪组|红色组|蓝色组|符合.*标准/u.test(text)) {
        ids.push('classification-standard');
      }
      if (/记录|整理|清点|计数|数.*次|做一个记号|重复数|漏记|步骤|逐组/u.test(text)) {
        ids.push('classification-recording');
      }
      if (/一共|总数|数量|多几|相差|多少|一样多|比.*多|比.*少/u.test(text)
        || activity.kind === 'arithmetic') {
        ids.push('classification-results');
      }
      if (/核对|检查|错误|错连|分错|不一致|漏记|重复|怎样核对|检查.*正确/u.test(text)) {
        ids.push('classification-checking');
      }
      if (ids.length === 0) throw new Error(`Could not classify Grade 1 Term 2 math classification question ${activity.id}.`);
      return [...new Set(ids)];
    }
    case 'grade-1/term-2/math/unit-04': {
      const supplemental = grade1Term2MathUnit04SupplementalActivities.find(({ activity: candidate }) => candidate.id === activity.id);
      if (supplemental) return [...supplemental.knowledgePointIds];

      const correctOption = activity.kind === 'choice'
        ? activity.options.find(({ id }) => id === activity.correctOptionId)?.label ?? ''
        : '';
      const numberText = activity.kind === 'choice' ? `${activity.prompt} ${correctOption}` : text;
      const ids: string[] = [];
      if (/十位|个位|几个十|几个一|数位|组成|合起来|写数|读作|写作/u.test(numberText)
        || (activity.kind === 'arithmetic' && /^\s*\d{2}\s*\+\s*\d/u.test(activity.expression))) {
        ids.push('two-digit-number-composition');
      }
      if (/前面|后面|紧挨着|接着数|数到|往前|往后|顺序|排列|从小到大|从大到小|倒着数|连续数|漏数/u.test(numberText)) {
        ids.push('number-sequence-to-100');
      }
      if (/比较|比.*大|比.*小|大于|小于|更大|更小|最大|最小|多几个|少几个|更多|更少/u.test(numberText)) {
        ids.push('number-comparison-to-100');
      }
      if (/整十|十个十|10个十|一个十|多少个十|百|一百|捆|又拿到\s*10|退\s*10|减去\s*10|加上\s*10|比\d+多一个十|多一个十|减一个十|加一个十/u.test(numberText)) {
        ids.push('tens-and-hundreds');
      }
      if (ids.length === 0) throw new Error(`Could not classify Grade 1 Term 2 math number question ${activity.id}.`);
      return [...new Set(ids)];
    }
    case 'grade-1/term-2/math/unit-05': {
      const supplemental = grade1Term2MathUnit05SupplementalActivities.find(({ activity: candidate }) => candidate.id === activity.id);
      if (supplemental) return [...supplemental.knowledgePointIds];

      const questionNumber = activity.id.match(/\/question-(\d{2})$/u)?.[1];
      const knowledgePointsByQuestion: Record<string, string[]> = {
        '01': ['currency-denominations', 'yuan-jiao-fen-conversion'],
        '02': ['currency-denominations', 'yuan-jiao-fen-conversion'],
        '03': ['currency-denominations', 'yuan-jiao-fen-conversion'],
        '04': ['money-addition-and-change'],
        '05': ['yuan-jiao-fen-conversion', 'money-composition-and-comparison'],
        '06': ['money-composition-and-comparison'],
        '07': ['money-addition-and-change'],
        '08': ['money-addition-and-change'],
      };
      const ids = questionNumber ? knowledgePointsByQuestion[questionNumber] : undefined;
      if (!ids) throw new Error(`Could not classify Grade 1 Term 2 math money question ${activity.id}.`);
      return [...ids];
    }
    case 'grade-1/term-2/math/unit-06': {
      const supplemental = grade1Term2MathUnit06SupplementalActivities.find(({ activity: candidate }) => candidate.id === activity.id);
      if (supplemental) return [...supplemental.knowledgePointIds];

      const ids = new Set<string>();
      for (const [, leftText, operator, rightText] of text.matchAll(/(\d{1,3})\s*([+-])\s*(\d{1,3})/gu)) {
        const left = Number(leftText);
        const right = Number(rightText);
        if (left >= 10 && right < 10) ids.add('two-digit-add-subtract-one');
        if (left >= 10 && right >= 10 && left % 10 === 0 && right % 10 === 0) ids.add('tens-add-subtract');
        if (left >= 10 && right >= 10 && right % 10 === 0 && left % 10 !== 0) ids.add('two-digit-add-subtract-tens');
        if (operator !== '+' && operator !== '-') throw new Error(`Unsupported Grade 1 Term 2 math operation in ${activity.id}.`);
      }
      if (ids.size === 0 && activity.kind === 'order' && /步骤|运算/u.test(text)) {
        ids.add('two-digit-add-subtract-one');
        ids.add('tens-add-subtract');
        ids.add('two-digit-add-subtract-tens');
      }
      if (ids.size === 0) throw new Error(`Could not classify Grade 1 Term 2 math addition and subtraction question ${activity.id}.`);
      return [...ids];
    }
    case 'grade-1/term-2/math/unit-07': {
      const supplemental = grade1Term2MathUnit07SupplementalActivities.find(({ activity: candidate }) => candidate.id === activity.id);
      if (supplemental) return [...supplemental.knowledgePointIds];

      const questionNumber = activity.id.match(/\/question-(\d{2})$/u)?.[1];
      const taskNumber = activity.id.match(/\/task-(\d{2})\//u)?.[1];
      const ids = new Set<string>();
      if (questionNumber === '03') ids.add('repeating-shape-patterns');
      if (['01', '02', '03', '04', '05', '06'].includes(questionNumber ?? '')) ids.add('number-patterns');
      if (questionNumber === '03' || questionNumber === '06' || questionNumber === '07' || questionNumber === '08') {
        ids.add('pattern-rule-validation');
      }
      if (questionNumber === '08' && taskNumber === '01' && activity.id.startsWith('grade-1/term-2/math/unit-07/basic/')) {
        ids.add('repeating-shape-patterns');
        ids.add('pattern-rule-validation');
      }
      if (ids.size === 0) throw new Error(`Could not classify Grade 1 Term 2 math pattern question ${activity.id}.`);
      return [...ids];
    }
    case 'grade-1/term-2/math/unit-08': {
      const supplemental = grade1Term2MathUnit08SupplementalActivities.find(({ activity: candidate }) => candidate.id === activity.id);
      if (supplemental) return [...supplemental.knowledgePointIds];

      const correctChoice = activity.kind === 'choice'
        ? activity.options.find(({ id }) => id === activity.correctOptionId)?.label ?? ''
        : text;
      const reviewText = `${activity.prompt} ${correctChoice} ${activity.hint} ${activity.explanation}`;
      const ids = new Set<string>();
      if (/三角形|正方形|长方形|圆形|平面图形|直边/u.test(reviewText)) {
        ids.add('plane-shape-recognition');
        if (/边|特点|区别/u.test(reviewText)) ids.add('plane-shape-features');
      }
      if (/拼成|拼在一起|组成图形/u.test(reviewText)) ids.add('plane-shape-composition');

      if (/分类|分组|整理|记录|清点|统计|按颜色/u.test(reviewText)) {
        ids.add('classification-standard');
        if (/记录|逐排|按顺序点/u.test(reviewText)) ids.add('classification-recording');
        if (/数量|总数|合计|有几个|多几/u.test(reviewText)) ids.add('classification-results');
        if (/核对|清点|合计/u.test(reviewText)) ids.add('classification-checking');
      }

      const hasCurrencyAmounts = /\d+\s*(?:元|角|分)/u.test(reviewText)
        || /人民币|金额|硬币|纸币|找零|找回|付钱|花钱|多少钱/u.test(reviewText);
      const hasYuanAndSubYuanAmounts = /\d+\s*元/u.test(reviewText) && /\d+\s*(?:角|分)/u.test(reviewText);
      if (hasCurrencyAmounts) {
        ids.add('currency-denominations');
        if (/换算|换成|等于|是多少角|几角|几分/u.test(reviewText)
          || hasYuanAndSubYuanAmounts) {
          ids.add('yuan-jiao-fen-conversion');
        }
        if (/一样多|比较|合起来|一共|总额/u.test(reviewText) || hasYuanAndSubYuanAmounts) {
          ids.add('money-composition-and-comparison');
        }
        if (/一样多|比较|合起来|一共|总额/u.test(reviewText)) ids.add('money-composition-and-comparison');
        if (/找回|找零|再加|合起来|付/u.test(reviewText)) ids.add('money-addition-and-change');
      }

      const arithmetic = [...reviewText.matchAll(/(\d{1,3})\s*([+−-])\s*(\d{1,3})/gu)];
      for (const [, leftText, operator, rightText] of arithmetic) {
        const left = Number(leftText);
        const right = Number(rightText);
        if (left >= 10 && right < 10) ids.add('two-digit-add-subtract-one');
        if (left >= 10 && right >= 10 && left % 10 === 0 && right % 10 === 0) ids.add('tens-add-subtract');
        if (left >= 10 && right >= 10 && right % 10 === 0 && left % 10 !== 0) ids.add('two-digit-add-subtract-tens');
        if (operator !== '+' && operator !== '-' && operator !== '−') {
          throw new Error(`Unsupported Grade 1 Term 2 math review operation in ${activity.id}.`);
        }
      }
      if (ids.has('two-digit-add-subtract-one') || ids.has('tens-add-subtract') || ids.has('two-digit-add-subtract-tens')) {
        if (/检查|核对|正确|错误/u.test(reviewText)) ids.add('inverse-operation-check');
      }
      if (/\d+\s*[−-]\s*\d+|退位|减法|拿走|取出|减去/u.test(reviewText)) {
        const withinTwenty = [...reviewText.matchAll(/(\d+)\s*[−-]\s*(\d+)/gu)]
          .some(([, left, right]) => Number(left) <= 20 && Number(right) <= 20);
        if (withinTwenty) {
          ids.add('subtraction-within-20');
          if (/凑|破十|平十|方法|先/u.test(reviewText)) ids.add('subtraction-strategy');
        }
      }

      if (/检查|核对|算式|得数/u.test(reviewText)) ids.add('inverse-operation-check');
      if (/比较|从小到大|从大到小|哪个数更大|哪个数大/u.test(reviewText)) ids.add('number-comparison-to-100');
      if (/数列|按顺序|下一项|接着.*数|每次增加|每次减少/u.test(reviewText)) ids.add('number-sequence-to-100');
      if (/十位|个位|几个十|几个一|两位数|组成/u.test(reviewText)) ids.add('two-digit-number-composition');
      if (/一百|100/u.test(reviewText)) ids.add('tens-and-hundreds');

      if (/循环|规律|重复|交替|一组/u.test(reviewText)) {
        ids.add('repeating-shape-patterns');
        if (/数列|增加|减少|相差|下一项/u.test(reviewText)) ids.add('number-patterns');
        if (/核对|符合|不符合|规则|应该/u.test(reviewText)) ids.add('pattern-rule-validation');
      }

      if (ids.size === 0) throw new Error(`Could not classify Grade 1 Term 2 math review question ${activity.id}.`);
      return [...ids];
    }
    case 'grade-1/term-2/english/unit-01': {
      const supplemental = grade1Term2EnglishUnit01SupplementalActivities.find(({ activity: candidate }) => candidate.id === activity.id);
      if (supplemental) return [...supplemental.knowledgePointIds];

      const englishText = englishActivityText(activity);
      const ids: string[] = [];
      if (/\b(?:chair|desk|blackboard|schoolbag|pencil box)\b|椅子|书桌|黑板|书包|铅笔盒/iu.test(englishText)) {
        ids.push('classroom-object-vocabulary');
      }
      if (/\b(?:on|under|in)\b|上面|下面|里面|位置词/iu.test(englishText)) {
        ids.push('position-word-vocabulary');
      }
      if (/\bwhere is\b|在哪里|询问地点/iu.test(englishText)) {
        ids.push('asking-about-location');
      }
      if (/\b(?:put your|put my|the (?:chair|desk|blackboard|schoolbag|pencil box) is)\b|位置指令/iu.test(englishText)) {
        ids.push('location-sentences-and-instructions');
      }
      if (ids.length === 0) throw new Error(`Could not classify Grade 1 Term 2 English question ${activity.id}.`);
      return [...new Set(ids)];
    }
    case 'grade-1/term-2/english/unit-02': {
      const supplemental = grade1Term2EnglishUnit02SupplementalActivities.find(({ activity: candidate }) => candidate.id === activity.id);
      if (supplemental) return [...supplemental.knowledgePointIds];

      const englishText = englishActivityText(activity);
      const ids: string[] = [];
      if (/\b(?:light|bed|door|box)\b|灯|床|门|盒子/iu.test(englishText)) ids.push('room-object-vocabulary');
      if (/\b(?:near|behind)\b|旁边|靠近|后面|位置词/iu.test(englishText)) ids.push('position-word-vocabulary');
      if (/\b(?:the (?:light|bed|door|box) is|is (?:near|behind))\b|房间物品.*位置|位置关系|描述位置/u.test(englishText)) {
        ids.push('room-location-sentences');
      }
      if (activity.kind === 'order' || /word cards in (?:the )?correct order|正确词序|单词卡.*顺序/iu.test(englishText)) {
        ids.push('room-sentence-word-order');
      }
      if (ids.length === 0) throw new Error(`Could not classify Grade 1 Term 2 English Unit 2 question ${activity.id}.`);
      return [...new Set(ids)];
    }
    case 'grade-1/term-2/english/unit-03': {
      const supplemental = grade1Term2EnglishUnit03SupplementalActivities.find(({ activity: candidate }) => candidate.id === activity.id);
      if (supplemental) return [...supplemental.knowledgePointIds];

      const englishText = englishActivityText(activity);
      const ids: string[] = [];
      if (/\b(?:ball|doll|train|plane|bear|car)\b|玩具词|玩具名称|英文词|词卡/iu.test(englishText)) {
        ids.push('toy-word-meanings');
      }
      if (/分类|归类|小组|类别|哪组|放进.*组/iu.test(englishText)) {
        ids.push('toy-type-classification');
      }
      if (/\bThis is(?: a)?\b|\bIt is(?: a)?\b|介绍.*玩具|描述.*玩具/iu.test(englishText)) {
        ids.push('toy-description-sentences');
      }
      if (/词序|词卡.*顺序|单词卡|按.*顺序|排列成句|排列词语/iu.test(englishText)) {
        ids.push('toy-sentence-word-order');
      }
      if (ids.length === 0) throw new Error(`Could not classify Grade 1 English question ${activity.id}.`);
      return [...new Set(ids)];
    }
    case 'grade-1/term-2/english/unit-04': {
      const supplemental = grade1Term2EnglishUnit04SupplementalActivities.find(({ activity: candidate }) => candidate.id === activity.id);
      if (supplemental) return [...supplemental.knowledgePointIds];

      const englishText = englishActivityText(activity);
      const ids: string[] = [];
      if (/\b(?:rice|noodles|chicken|egg|vegetable|fish)\b|米饭|面条|鸡肉|鸡蛋|蔬菜|鱼/iu.test(englishText)) {
        ids.push('food-word-meanings');
      }
      if (/\b(?:group|classify|category)\b|分类|归类|小组|类别|哪组|放入|放进/iu.test(englishText)) {
        ids.push('food-category-classification');
      }
      if (/\b(?:do you like|yes, i do|no, i don.t)\b|喜好|肯定回答|否定回答|询问是否喜欢/iu.test(englishText)) {
        ids.push('food-preference-expressions');
      }
      if (activity.kind === 'order' || /word cards in (?:the )?correct order|排列.*词序|正确词序|按.*顺序/iu.test(englishText)) {
        ids.push('food-sentence-word-order');
      }
      if (ids.length === 0) throw new Error(`Could not classify Grade 1 English question ${activity.id}.`);
      return [...new Set(ids)];
    }
    case 'grade-1/term-2/english/unit-05': {
      const supplemental = grade1Term2EnglishUnit05SupplementalActivities.find(({ activity: candidate }) => candidate.id === activity.id);
      if (supplemental) return [...supplemental.knowledgePointIds];

      const englishText = englishActivityText(activity);
      const ids: string[] = [];
      if (/\b(?:water|juice|milk|tea)\b|水|果汁|牛奶|茶/iu.test(englishText)) {
        ids.push('drink-word-meanings');
      }
      if (/\b(?:group|classify|category|belongs to)\b|分类|归类|小组|类别|哪组|放入|放进/iu.test(englishText)) {
        ids.push('drink-category-classification');
      }
      if (/\b(?:can i have|polite|request)\b|礼貌|请求|要.*喝|提出请求/iu.test(englishText)) {
        ids.push('drink-polite-requests');
      }
      if (activity.kind === 'order' || /word cards in (?:the )?correct order|正确词序|词卡.*顺序|按.*顺序/iu.test(englishText)) {
        ids.push('drink-request-word-order');
      }
      if (ids.length === 0) throw new Error(`Could not classify Grade 1 Term 2 English Unit 5 question ${activity.id}.`);
      return [...new Set(ids)];
    }
    case 'grade-1/term-2/english/unit-06': {
      const supplemental = grade1Term2EnglishUnit06SupplementalActivities.find(({ activity: candidate }) => candidate.id === activity.id);
      if (supplemental) return [...supplemental.knowledgePointIds];

      const englishText = englishActivityText(activity);
      const ids: string[] = [];
      if (/\b(?:shirt|T-shirt|skirt|dress|socks|shorts)\b|衬衫|T\s*恤衫|裙子|连衣裙|袜子|短裤/iu.test(englishText)) {
        ids.push('clothes-word-meanings');
      }
      if (activity.kind === 'categorize' || /\b(?:group|classify|category|belongs to)\b|分类|归类|上衣|其他衣物|哪一组|哪类|放入|放进/iu.test(englishText)) {
        ids.push('clothes-category-classification');
      }
      if (/\bthis is my\b|这是我的|介绍.*句子|读到.*句子|句子.*介绍/iu.test(englishText)) {
        ids.push('clothes-description-sentences');
      }
      if (activity.kind === 'order' || /\b(?:word cards in (?:the )?correct order|arrange.*correct order)\b|排列.*词序|正确词序|词卡.*顺序|按.*顺序/iu.test(englishText)) {
        ids.push('clothes-description-word-order');
      }
      if (ids.length === 0) throw new Error(`Could not classify Grade 1 Term 2 English Unit 6 question ${activity.id}.`);
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
      if (activity.kind === 'measurement') ids.push('measurement-and-estimation');
      if (/(直尺|线段|刻度|读数|从\s*0|估测|估计|复测|长度记录|起点.*终点|终点.*起点|测量.*(?:方法|步骤|准确|读数|起点|终点))/.test(text)) {
        if (!ids.includes('measurement-and-estimation')) ids.push('measurement-and-estimation');
      }
      if (ids.length === 0 && /(校园.*测量|测量.*校园|测量活动)/.test(text)) {
        return ['measurement-activity-planning'];
      }
      if (ids.length === 0) throw new Error(`Could not classify length question ${activity.id}.`);
      return ids;
    }
    case 'grade-2/term-1/english/unit-01': {
      const supplemental = grade2Term1EnglishUnit01SupplementalActivities.find(({ activity: candidate }) => candidate.id === activity.id);
      if (supplemental) return [...supplemental.knowledgePointIds];

      const ids: string[] = [];
      if (/\b(?:father|mother|sister|brother|grandfather|grandmother)\b|爸爸|妈妈|姐姐|妹妹|哥哥|弟弟|爷爷|奶奶|外公|外婆/iu.test(text)) {
        ids.push('family-member-vocabulary');
      }
      if (/\b(?:this is my|introduce|introduction)\b|介绍|这是我的|他是我的|她是我的/iu.test(text)
        || activity.kind === 'order') {
        ids.push('family-introduction');
      }
      if (/\b(?:he|she)\b|\b(?:pronoun|pronouns)\b|代词|他是|她是/iu.test(text)) {
        ids.push('he-she-pronouns');
      }
      if (ids.length === 0) throw new Error(`Could not classify Grade 2 English family question ${activity.id}.`);
      return [...new Set(ids)];
    }
    case 'grade-2/term-1/english/unit-02': {
      const supplemental = grade2Term1EnglishUnit02SupplementalActivities.find(({ activity: candidate }) => candidate.id === activity.id);
      if (supplemental) return [...supplemental.knowledgePointIds];

      const ids: string[] = [];
      if (/\b(?:boy|girl|man|woman)\b|男孩|女孩|男士|女士|男人|女人/iu.test(text)) ids.push('people-vocabulary');
      if (/\b(?:friend|classmate)\b|朋友|同班同学/iu.test(text)) ids.push('friend-classmate-vocabulary');
      if (/\b(?:he|she)\b|代词|他|她/iu.test(text)) ids.push('he-she-pronouns');
      if (ids.length === 0) throw new Error(`Could not classify Grade 2 English unit 2 question ${activity.id}.`);
      return [...new Set(ids)];
    }
    case 'grade-2/term-1/english/unit-03': {
      const supplemental = grade2Term1EnglishUnit03SupplementalActivities.find(({ activity: candidate }) => candidate.id === activity.id);
      if (supplemental) return [...supplemental.knowledgePointIds];

      const ids: string[] = [];
      if (/\b(?:big|thin|tall|short)\b|身高|身材较矮|瘦|高的|大小|体型|较高/iu.test(text)) ids.push('height-and-size-words');
      if (/\b(?:handsome|pretty)\b|英俊|漂亮|外貌/iu.test(text)) ids.push('appearance-words');
      if (activity.kind === 'order' || ids.length > 1 || /同一.{0,12}人物|分别.{0,12}描述|同时.{0,12}符合|两条记录|两张卡/iu.test(text)) {
        ids.push('friendly-description');
      }
      if (ids.length === 0) throw new Error(`Could not classify Grade 2 English unit 3 question ${activity.id}.`);
      return [...new Set(ids)];
    }
    case 'grade-2/term-1/english/unit-04': {
      const supplemental = grade2Term1EnglishUnit04SupplementalActivities.find(({ activity: candidate }) => candidate.id === activity.id);
      if (supplemental) return [...supplemental.knowledgePointIds];

      const ids: string[] = [];
      if (/\b(?:bookshop|supermarket|zoo|park|school|hospital)\b|书店|超市|动物园|公园|学校|医院/iu.test(text)) {
        ids.push('community-place-vocabulary');
      }
      if (/\b(?:where are you|where is she|where is he|where are you going|going to|at school|at the)\b|要去哪里|正要去|正要前往|在哪里|当前位置|前往/iu.test(text)) {
        ids.push('location-and-destination-phrases');
      }
      if (/\b(?:buy|buying|shop|shopping|see animals|go to class)\b|买书|购买书籍|日常用品|日用品|看动物|户外散步|休闲|上课|看医生|就医|学习|用途|购物|活动目的/iu.test(text)) {
        ids.push('place-purpose-and-sentences');
      }
      if (ids.length === 0) throw new Error(`Could not classify Grade 2 English community question ${activity.id}.`);
      return [...new Set(ids)];
    }
    case 'grade-2/term-1/english/unit-05': {
      const supplemental = grade2Term1EnglishUnit05SupplementalActivities.find(({ activity: candidate }) => candidate.id === activity.id);
      if (supplemental) return [...supplemental.knowledgePointIds];

      const ids: string[] = [];
      if (/\b(?:lake|boat|tree|grass|flower|hill)\b|湖|小船|树|草|花|小山/iu.test(text)) {
        ids.push('park-and-nature-vocabulary');
      }
      if (/\bI can see\b|我能看见|排成.{0,12}句|句子卡/iu.test(text)) ids.push('can-see-sentences');
      if (/\bWhat is this\b|\bWhat can you see\b|这是什么|你能看见什么|询问.{0,8}(?:东西|事物|看见)/iu.test(text)) {
        ids.push('questions-about-objects-and-observations');
      }
      if (activity.kind === 'match' || activity.kind === 'categorize') ids.push('park-and-nature-vocabulary');
      if (activity.kind === 'order') ids.push('can-see-sentences');
      if (ids.length === 0) throw new Error(`Could not classify Grade 2 English park question ${activity.id}.`);
      return [...new Set(ids)];
    }
    case 'grade-2/term-1/english/unit-06': {
      const supplemental = grade2Term1EnglishUnit06SupplementalActivities.find(({ activity: candidate }) => candidate.id === activity.id);
      if (supplemental) return [...supplemental.knowledgePointIds];

      const ids: string[] = [];
      if (/\b(?:card|present|christmas tree|father christmas)\b|卡片|礼物|圣诞树|圣诞老人|节日人物|节日物品/iu.test(text)) {
        ids.push('holiday-vocabulary');
      }
      if (/\b(?:merry christmas|happy new year)\b|圣诞快乐|新年快乐|节日祝福|新年祝福/iu.test(text)) {
        ids.push('holiday-greetings');
      }
      if (/\b(?:thank you|you are welcome)\b|谢谢|感谢|不客气|回应感谢|表达感谢/iu.test(text)) {
        ids.push('gratitude-and-polite-responses');
      }
      if (ids.length === 0) throw new Error(`Could not classify Grade 2 English holiday question ${activity.id}.`);
      return [...new Set(ids)];
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
      const supplemental = grade2Term1MathUnit03SupplementalActivities.find(({ activity: candidate }) => candidate.id === activity.id);
      if (supplemental) return [...supplemental.knowledgePointIds];

      const ids: string[] = [];
      if (/(顶点|两条边|角的组成|角由|角.*组成|角.*部分|角.*出现|边相遇|物品.*角|观察.*角)/.test(text)) ids.push('angle-parts');
      if (/(直角|张开|比较|大小|小于|大于|参照|另一条边)/.test(text)) ids.push('angle-comparison');
      if (ids.length === 0) throw new Error(`Could not classify angle question ${activity.id}.`);
      return ids;
    }
    case 'grade-2/term-1/math/unit-04': {
      const supplemental = grade2Term1MathUnit04SupplementalActivities.find(({ activity: candidate }) => candidate.id === activity.id);
      if (supplemental) return [...supplemental.knowledgePointIds];
      const ids: string[] = [];
      if (/(加数相同|相同加数|相加|每组|几组|每排|每袋|每辆|每盒|每行|每张|分组|重复相加|组数|每份)/.test(text)) ids.push('equal-groups-multiplication');
      if (/(乘法|乘|×|积|口诀|算式)/.test(text)) ids.push('multiplication-facts');
      if (ids.length === 0) throw new Error(`Could not classify multiplication question ${activity.id}.`);
      return ids;
    }
    case 'grade-2/term-1/math/unit-05': {
      const supplemental = grade2Term1MathUnit05SupplementalActivities.find(({ activity: candidate }) => candidate.id === activity.id);
      if (supplemental) return [...supplemental.knowledgePointIds];
      const ids: string[] = [];
      if (/(正面|侧面|上面|上方|俯视|从.*看|观察方向|观察位置|观察者|视图)/.test(text)) {
        ids.push('object-view-directions');
      }
      if (/(摆放|排列|遮挡|挡住|可见|不能|不一定|背面|背后|记录|报告|确认|复核|推想|总数|全部|模型)/.test(text)) {
        ids.push('visible-view-information');
      }
      if (ids.length === 0 && /(观察|物体|方块)/.test(text)) ids.push('object-view-directions');
      if (ids.length === 0) throw new Error(`Could not classify object-view question ${activity.id}.`);
      return ids;
    }
    case 'grade-2/term-1/math/unit-06': {
      const supplemental = grade2Term1MathUnit06SupplementalActivities.find(({ activity: candidate }) => candidate.id === activity.id);
      if (supplemental) return [...supplemental.knowledgePointIds];
      const ids: string[] = [];
      if (/(加数相同|相同加数|相加|每组|几组|每个|每人|每排|每袋|每辆|每盒|每行|每张|每队|每层|每箱|每份|分组|重复相加|组数)/.test(text)) {
        ids.push('equal-groups-multiplication');
      }
      if (/(乘法|乘|×|积|口诀|算式)/.test(text)) ids.push('multiplication-facts');
      if (ids.length === 0) throw new Error(`Could not classify multiplication question ${activity.id}.`);
      return ids;
    }
    case 'grade-2/term-1/math/unit-07': {
      const supplemental = grade2Term1MathUnit07SupplementalActivities.find(({ activity: candidate }) => candidate.id === activity.id);
      if (supplemental) return [...supplemental.knowledgePointIds];

      const ids: string[] = ['clock-reading-and-time-units', 'time-relationships-and-application'];
      if (/(时针|分针|指针|长针|短针|钟面|几时几分|读.*钟面|数字.*分钟|整时|半时|时刻|\d{1,2}\s*时(?:\d{1,2}\s*分)?)/u.test(text)) ids.push('clock-five-minute-reading');
      if (/(时针|分针|指针|长针|短针)/u.test(text)) ids.push('clock-hand-roles');
      if (/(小时|1时|一小时|半小时|刻钟|60分|60分钟|分钟数|时长.*分钟|分钟.*时)/u.test(text)) {
        ids.push('hour-minute-conversion');
      }
      if (/(经过|再过|开始|结束|持续|时长|重叠|间隔|多久|共用|相差.*分钟)/u.test(text)) {
        ids.push('elapsed-time-calculation');
      }
      if (/(时间表|安排|记录|活动|时刻|栏目|合理|完整|首尾相接|可执行|信息)/u.test(text)) {
        ids.push('time-schedule-planning');
      }
      if (ids.length === 0) throw new Error(`Could not classify time question ${activity.id}.`);
      return [...new Set(ids)];
    }
    case 'grade-2/term-1/math/unit-08': {
      const supplemental = grade2Term1MathUnit08SupplementalActivities.find(({ activity: candidate }) => candidate.id === activity.id);
      if (supplemental) return [...supplemental.knowledgePointIds];

      const text = activityText(activity);
      const ids: string[] = ['systematic-pairing-and-enumeration', 'complete-and-nonduplicated-records'];
      if (/(搭配|组合|配对|各选|选.*种|路线.*时间|上衣.*裤子)/u.test(text)) ids.push('two-category-pairing');
      if (/(几种|多少种|总数|乘|数量|共有|一共)/u.test(text)) ids.push('combination-counting');
      if (activity.kind === 'order' || /(顺序|固定|逐一|列出|清单|列表|排列)/u.test(text)) ids.push('ordered-listing');
      if (activity.kind === 'match' || /(连线|表格|列表|清单|记录)/u.test(text)) ids.push('list-and-line-representation');
      if (activity.kind === 'categorize' || /(重复|遗漏|漏掉|漏项|完整|核对|检查|去重)/u.test(text)) ids.push('duplicate-and-omission-checking');
      if (/(说明|解释|伙伴|怎样|为什么|如何|验证|复核)/u.test(text)) ids.push('explain-and-verify');
      return [...new Set(ids)];
    }
    case 'grade-2/term-1/math/unit-09': {
      const supplemental = grade2Term1MathUnit09SupplementalActivities.find(({ activity: candidate }) => candidate.id === activity.id);
      if (supplemental) return [...supplemental.knowledgePointIds];

      const text = activityText(activity);
      const ids: string[] = ['term-review-method-selection', 'term-review-result-checking'];
      if (/(米|厘米|线段|测量|刻度|长度|单位)/u.test(text)) ids.push('length-units-and-measurement');
      if (activity.kind === 'arithmetic' || /(加法|减法|相加|加上|减去|进位|退位|被减数|差和减数|[+−-])/u.test(text)) {
        ids.push('two-digit-addition-and-subtraction');
      }
      if (/(乘法|乘|每组|每排|每盒|口诀|几个相同|相同加数|一共.*个)/u.test(text)) {
        ids.push('multiplication-facts-and-equal-groups');
      }
      if (/(角|张开程度|直角)/u.test(text)) ids.push('angle-comparison-by-opening');
      if (/(方块|正方体|观察方向|顶面|底面|正面|侧面|背面)/u.test(text)) ids.push('solid-figure-observation');
      if (/(钟面|时针|分针|时刻|时间|分钟|小时|时长|经过多久)/u.test(text)) ids.push('clock-reading-and-elapsed-time');
      if (/(搭配|组合|配对|连线|路线.*时间|上衣.*裤子)/u.test(text)) ids.push('systematic-pairing-and-enumeration');
      if (/(检查|核对|验算|方法|策略|解释|伙伴|顺序|是否|怎样|为什么|证据)/u.test(text)
        || ids.length === 2) {
        ids.push('problem-solving-and-verification');
      }
      return [...new Set(ids)];
    }
    case 'grade-2/term-1/chinese/unit-01': {
      const supplemental = grade2Term1ChineseUnit01SupplementalActivities.find(({ activity: candidate }) => candidate.id === activity.id);
      if (supplemental) return [...supplemental.knowledgePointIds];

      const text = activityText(activity);
      const ids: string[] = [];
      if (/(小蝌蚪|成长|后腿|前腿|尾巴|成长阶段)/.test(text)) ids.push('growth-sequence');
      if (/(水|云|雨|冰|雪|水洼|水珠)/.test(text)) ids.push('water-observation');
      if (/(种子|果荚|绒毛|传播|风吹)/.test(text)) ids.push('seed-dispersal');
      if (/(观察|记录|线索|证据|推测|结论|研究|办法|比较|验证|分享|表达)/.test(text)
        || ids.length === 0) {
        ids.push('observation-evidence');
      }
      return [...new Set(ids)];
    }
    case 'grade-2/term-1/chinese/unit-02': {
      const supplemental = grade2Term1ChineseUnit02SupplementalActivities.find(({ activity: candidate }) => candidate.id === activity.id);
      if (supplemental) return [...supplemental.knowledgePointIds];
      const match = activity.id.match(/\/(basic|advanced|high)\/task-(\d+)\/session-\d+\/question-(\d+)$/u);
      if (!match) throw new Error(`Could not identify the source task for Chinese scene question ${activity.id}.`);
      const sourceQuestionKnowledgePoints: Record<string, string[]> = {
        'basic:1:1': ['measure-word-use'], 'basic:1:2': ['measure-word-use'], 'basic:1:3': ['scene-vocabulary'], 'basic:1:4': ['scene-vocabulary', 'clear-description'],
        'basic:1:5': ['scene-vocabulary', 'measure-word-use', 'clear-description'], 'basic:1:6': ['measure-word-use'], 'basic:1:7': ['scene-vocabulary'], 'basic:1:8': ['measure-word-use'],
        'basic:2:1': ['tree-animal-classification'], 'basic:2:2': ['radical-clues'], 'basic:2:3': ['radical-clues', 'tree-animal-classification'], 'basic:2:4': ['tree-animal-classification', 'clear-description'],
        'basic:2:5': ['tree-animal-classification'], 'basic:2:6': ['radical-clues'], 'basic:2:7': ['tree-animal-classification', 'clear-description'], 'basic:2:8': ['radical-clues'],
        'basic:3:1': ['seasonal-farming-sequence'], 'basic:3:2': ['seasonal-farming-sequence'], 'basic:3:3': ['seasonal-farming-sequence'], 'basic:3:4': ['seasonal-farming-sequence'],
        'basic:3:5': ['seasonal-farming-sequence', 'clear-description'], 'basic:3:6': ['seasonal-farming-sequence'], 'basic:3:7': ['seasonal-farming-sequence', 'clear-description'], 'basic:3:8': ['seasonal-farming-sequence'],
        'advanced:1:1': ['measure-word-use', 'tree-animal-classification'], 'advanced:1:2': ['tree-animal-classification', 'radical-clues'], 'advanced:1:3': ['scene-vocabulary', 'tree-animal-classification'], 'advanced:1:4': ['tree-animal-classification', 'clear-description'],
        'advanced:1:5': ['tree-animal-classification', 'radical-clues'], 'advanced:1:6': ['scene-vocabulary', 'clear-description'], 'advanced:1:7': ['scene-vocabulary', 'tree-animal-classification'], 'advanced:1:8': ['scene-vocabulary', 'clear-description'],
        'advanced:2:1': ['radical-clues', 'tree-animal-classification'], 'advanced:2:2': ['scene-vocabulary', 'tree-animal-classification', 'radical-clues'], 'advanced:2:3': ['scene-vocabulary', 'tree-animal-classification'], 'advanced:2:4': ['measure-word-use'],
        'advanced:2:5': ['tree-animal-classification', 'clear-description'], 'advanced:2:6': ['tree-animal-classification', 'clear-description'], 'advanced:2:7': ['measure-word-use'], 'advanced:2:8': ['tree-animal-classification', 'clear-description'],
        'high:1:1': ['scene-vocabulary', 'clear-description'], 'high:1:2': ['clear-description'], 'high:1:3': ['clear-description'], 'high:1:4': ['seasonal-farming-sequence', 'clear-description'],
        'high:1:5': ['clear-description'], 'high:1:6': ['clear-description'], 'high:1:7': ['clear-description'], 'high:1:8': ['clear-description'],
        'high:2:1': ['seasonal-farming-sequence', 'clear-description'], 'high:2:2': ['seasonal-farming-sequence', 'clear-description'], 'high:2:3': ['clear-description'], 'high:2:4': ['seasonal-farming-sequence', 'clear-description'],
        'high:2:5': ['seasonal-farming-sequence', 'clear-description'], 'high:2:6': ['clear-description'], 'high:2:7': ['clear-description'], 'high:2:8': ['scene-vocabulary', 'clear-description'],
      };
      const ids = sourceQuestionKnowledgePoints[`${match[1]}:${Number(match[2])}:${Number(match[3])}`];
      if (!ids) throw new Error(`No knowledge-point mapping exists for Chinese scene question ${activity.id}.`);
      return ids;
    }
    case 'grade-2/term-1/chinese/unit-03': {
      const supplemental = grade2Term1ChineseUnit03SupplementalActivities.find(({ activity: candidate }) => candidate.id === activity.id);
      if (supplemental) return [...supplemental.knowledgePointIds];
      const match = activity.id.match(/\/(basic|advanced|high)\/task-(\d+)\/session-\d+\/question-(\d+)$/u);
      if (!match) throw new Error(`Could not identify the source task for Chinese learning question ${activity.id}.`);
      const sourceQuestionKnowledgePoints: Record<string, string[]> = {
        'basic:1:1': ['problem-solving-sequence'], 'basic:1:2': ['story-sequence-and-revision'], 'basic:1:3': ['problem-solving-sequence'], 'basic:1:4': ['problem-solving-sequence', 'evidence-based-inference'],
        'basic:1:5': ['problem-solving-sequence'], 'basic:1:6': ['story-sequence-and-revision'], 'basic:1:7': ['problem-solving-sequence'], 'basic:1:8': ['problem-solving-sequence'],
        'basic:2:1': ['evidence-based-inference', 'observation-and-feelings'], 'basic:2:2': ['observation-and-feelings'], 'basic:2:3': ['evidence-based-inference', 'observation-and-feelings'], 'basic:2:4': ['evidence-based-inference'],
        'basic:2:5': ['evidence-based-inference'], 'basic:2:6': ['observation-and-feelings'], 'basic:2:7': ['evidence-based-inference'], 'basic:2:8': ['observation-and-feelings'],
        'advanced:1:1': ['problem-solving-sequence'], 'advanced:1:2': ['story-sequence-and-revision'], 'advanced:1:3': ['problem-solving-sequence', 'story-sequence-and-revision'], 'advanced:1:4': ['problem-solving-sequence', 'evidence-based-inference'],
        'advanced:1:5': ['observation-and-feelings'], 'advanced:1:6': ['letter-communication'], 'advanced:1:7': ['evidence-based-inference'], 'advanced:1:8': ['evidence-based-inference'],
        'advanced:2:1': ['problem-solving-sequence'], 'advanced:2:2': ['story-sequence-and-revision'], 'advanced:2:3': ['evidence-based-inference'], 'advanced:2:4': ['story-sequence-and-revision', 'problem-solving-sequence'],
        'advanced:2:5': ['evidence-based-inference'], 'advanced:2:6': ['letter-communication'], 'advanced:2:7': ['evidence-based-inference'], 'advanced:2:8': ['problem-solving-sequence'],
        'high:1:1': ['story-sequence-and-revision'], 'high:1:2': ['observation-and-feelings'], 'high:1:3': ['letter-communication', 'story-sequence-and-revision'], 'high:1:4': ['story-sequence-and-revision'],
        'high:1:5': ['evidence-based-inference'], 'high:1:6': ['story-sequence-and-revision'], 'high:1:7': ['story-sequence-and-revision'], 'high:1:8': ['story-sequence-and-revision'],
        'high:2:1': ['story-sequence-and-revision'], 'high:2:2': ['story-sequence-and-revision'], 'high:2:3': ['observation-and-feelings'], 'high:2:4': ['story-sequence-and-revision'],
        'high:2:5': ['observation-and-feelings'], 'high:2:6': ['story-sequence-and-revision'], 'high:2:7': ['story-sequence-and-revision'], 'high:2:8': ['letter-communication'],
      };
      const ids = sourceQuestionKnowledgePoints[`${match[1]}:${Number(match[2])}:${Number(match[3])}`];
      if (!ids) throw new Error(`No knowledge-point mapping exists for Chinese learning question ${activity.id}.`);
      return ids;
    }
    case 'grade-2/term-1/chinese/unit-04': {
      const supplemental = grade2Term1ChineseUnit04SupplementalActivities.find(({ activity: candidate }) => candidate.id === activity.id);
      if (supplemental) return [...supplemental.knowledgePointIds];
      const match = activity.id.match(/\/(basic|advanced|high)\/task-(\d+)\/session-\d+\/question-(\d+)$/u);
      if (!match) throw new Error(`Could not identify the source task for Chinese learning question ${activity.id}.`);
      const sourceQuestionKnowledgePoints: Record<string, string[]> = {
        'basic:1:1': ['landscape-location-and-features'], 'basic:1:2': ['landscape-location-and-features'], 'basic:1:3': ['landscape-location-and-features'], 'basic:1:4': ['landscape-information-organization', 'travel-order-and-description'],
        'basic:1:5': ['observation-and-imagination'], 'basic:1:6': ['observation-and-imagination'], 'basic:1:7': ['observation-and-imagination'], 'basic:1:8': ['landscape-information-organization', 'landscape-location-and-features'],
        'basic:2:1': ['landscape-location-and-features', 'regional-products-and-hospitality'], 'basic:2:2': ['regional-products-and-hospitality'], 'basic:2:3': ['travel-order-and-description', 'landscape-information-organization'], 'basic:2:4': ['regional-products-and-hospitality', 'landscape-information-organization'],
        'basic:2:5': ['observation-and-imagination'], 'basic:2:6': ['travel-order-and-description'], 'basic:2:7': ['regional-products-and-hospitality'], 'basic:2:8': ['landscape-information-organization'],
        'advanced:1:1': ['landscape-location-and-features', 'landscape-information-organization'], 'advanced:1:2': ['observation-and-imagination'], 'advanced:1:3': ['observation-and-imagination'], 'advanced:1:4': ['landscape-information-organization'],
        'advanced:1:5': ['observation-and-imagination'], 'advanced:1:6': ['travel-order-and-description'], 'advanced:1:7': ['observation-and-imagination'], 'advanced:1:8': ['landscape-information-organization'],
        'advanced:2:1': ['observation-and-imagination'], 'advanced:2:2': ['landscape-location-and-features', 'observation-and-imagination'], 'advanced:2:3': ['observation-and-imagination'], 'advanced:2:4': ['landscape-information-organization'],
        'advanced:2:5': ['regional-products-and-hospitality'], 'advanced:2:6': ['travel-order-and-description'], 'advanced:2:7': ['observation-and-imagination'], 'advanced:2:8': ['landscape-information-organization', 'observation-and-imagination'],
        'high:1:1': ['travel-order-and-description', 'landscape-location-and-features', 'landscape-information-organization'], 'high:1:2': ['landscape-information-organization', 'landscape-location-and-features'], 'high:1:3': ['travel-order-and-description', 'landscape-information-organization'], 'high:1:4': ['landscape-information-organization', 'observation-and-imagination'],
        'high:1:5': ['landscape-information-organization', 'landscape-location-and-features'], 'high:1:6': ['regional-products-and-hospitality', 'travel-order-and-description'], 'high:1:7': ['observation-and-imagination'], 'high:1:8': ['landscape-information-organization', 'travel-order-and-description'],
        'high:2:1': ['landscape-location-and-features', 'landscape-information-organization'], 'high:2:2': ['landscape-information-organization', 'travel-order-and-description'], 'high:2:3': ['landscape-information-organization', 'regional-products-and-hospitality'], 'high:2:4': ['travel-order-and-description', 'landscape-information-organization'],
        'high:2:5': ['landscape-location-and-features', 'landscape-information-organization'], 'high:2:6': ['landscape-information-organization', 'travel-order-and-description'], 'high:2:7': ['observation-and-imagination', 'landscape-information-organization'], 'high:2:8': ['landscape-information-organization', 'travel-order-and-description'],
      };
      const ids = sourceQuestionKnowledgePoints[`${match[1]}:${Number(match[2])}:${Number(match[3])}`];
      if (!ids) throw new Error(`No knowledge-point mapping exists for Chinese learning question ${activity.id}.`);
      return ids;
    }
    case 'grade-2/term-1/chinese/unit-05': {
      const supplemental = grade2Term1ChineseUnit05SupplementalActivities.find(({ activity: candidate }) => candidate.id === activity.id);
      if (supplemental) return [...supplemental.knowledgePointIds];
      const match = activity.id.match(/\/(basic|advanced|high)\/task-(\d+)\/session-\d+\/question-(\d+)$/u);
      if (!match) throw new Error(`Could not identify the source task for Chinese learning question ${activity.id}.`);
      const sourceQuestionKnowledgePoints: Record<string, string[]> = {
        'basic:1:1': ['observation-position-and-viewpoint'], 'basic:1:2': ['observation-position-and-viewpoint'], 'basic:1:3': ['evidence-based-inference'], 'basic:1:4': ['evidence-based-inference'],
        'basic:1:5': ['observation-position-and-viewpoint', 'evidence-based-inference'], 'basic:1:6': ['evidence-based-inference'], 'basic:1:7': ['observation-position-and-viewpoint'], 'basic:1:8': ['observation-position-and-viewpoint'],
        'basic:2:1': ['plant-observation-and-change'], 'basic:2:2': ['plant-observation-and-change', 'problem-solving-sequence'], 'basic:2:3': ['plant-observation-and-change', 'evidence-based-inference'], 'basic:2:4': ['plant-observation-and-change', 'evidence-based-inference'],
        'basic:2:5': ['plant-observation-and-change'], 'basic:2:6': ['plant-observation-and-change'], 'basic:2:7': ['plant-observation-and-change', 'problem-solving-sequence'], 'basic:2:8': ['plant-observation-and-change', 'evidence-based-inference'],
        'advanced:1:1': ['action-time-and-result'], 'advanced:1:2': ['evidence-based-inference', 'problem-solving-sequence'], 'advanced:1:3': ['action-time-and-result', 'observation-position-and-viewpoint', 'plant-observation-and-change'], 'advanced:1:4': ['evidence-based-inference'],
        'advanced:1:5': ['problem-solving-sequence'], 'advanced:1:6': ['evidence-based-inference'], 'advanced:1:7': ['evidence-based-inference', 'problem-solving-sequence'], 'advanced:1:8': ['action-time-and-result', 'evidence-based-inference'],
        'advanced:2:1': ['observation-position-and-viewpoint'], 'advanced:2:2': ['observation-position-and-viewpoint', 'action-time-and-result', 'plant-observation-and-change'], 'advanced:2:3': ['evidence-based-inference'], 'advanced:2:4': ['observation-position-and-viewpoint', 'problem-solving-sequence'],
        'advanced:2:5': ['plant-observation-and-change'], 'advanced:2:6': ['problem-solving-sequence'], 'advanced:2:7': ['observation-position-and-viewpoint', 'evidence-based-inference'], 'advanced:2:8': ['evidence-based-inference'],
        'high:1:1': ['problem-solving-sequence'], 'high:1:2': ['problem-solving-sequence', 'plant-observation-and-change'], 'high:1:3': ['problem-solving-sequence'], 'high:1:4': ['problem-solving-sequence', 'evidence-based-inference'],
        'high:1:5': ['problem-solving-sequence', 'evidence-based-inference'], 'high:1:6': ['problem-solving-sequence'], 'high:1:7': ['problem-solving-sequence'], 'high:1:8': ['evidence-based-inference', 'problem-solving-sequence'],
        'high:2:1': ['problem-solving-sequence'], 'high:2:2': ['problem-solving-sequence', 'plant-observation-and-change'], 'high:2:3': ['problem-solving-sequence', 'evidence-based-inference'], 'high:2:4': ['problem-solving-sequence'],
        'high:2:5': ['evidence-based-inference'], 'high:2:6': ['problem-solving-sequence'], 'high:2:7': ['evidence-based-inference', 'problem-solving-sequence'], 'high:2:8': ['problem-solving-sequence'],
      };
      const ids = sourceQuestionKnowledgePoints[`${match[1]}:${Number(match[2])}:${Number(match[3])}`];
      if (!ids) throw new Error(`No knowledge-point mapping exists for Chinese learning question ${activity.id}.`);
      return ids;
    }
    case 'grade-2/term-1/chinese/unit-06': {
      const supplemental = grade2Term1ChineseUnit06SupplementalActivities.find(({ activity: candidate }) => candidate.id === activity.id);
      if (supplemental) return [...supplemental.knowledgePointIds];
      const match = activity.id.match(/\/(basic|advanced|high)\/task-(\d+)\/session-\d+\/question-(\d+)$/u);
      if (!match) throw new Error(`Could not identify the source task for Chinese learning question ${activity.id}.`);
      const sourceQuestionKnowledgePoints: Record<string, string[]> = {
        'basic:1:1': ['story-event-sequence'], 'basic:1:2': ['character-action-and-quality'], 'basic:1:3': ['character-action-and-quality'], 'basic:1:4': ['story-evidence-and-inference'],
        'basic:1:5': ['cooperation-and-respect'], 'basic:1:6': ['story-event-sequence'], 'basic:1:7': ['story-event-sequence', 'character-action-and-quality', 'reflection-and-action-planning'], 'basic:1:8': ['character-action-and-quality', 'story-evidence-and-inference'],
        'basic:2:1': ['cooperation-and-respect'], 'basic:2:2': ['cooperation-and-respect'], 'basic:2:3': ['cooperation-and-respect'], 'basic:2:4': ['story-event-sequence', 'cooperation-and-respect'],
        'basic:2:5': ['cooperation-and-respect'], 'basic:2:6': ['cooperation-and-respect'], 'basic:2:7': ['character-action-and-quality', 'reflection-and-action-planning'], 'basic:2:8': ['cooperation-and-respect'],
        'advanced:1:1': ['character-action-and-quality', 'story-evidence-and-inference'], 'advanced:1:2': ['story-event-sequence'], 'advanced:1:3': ['story-event-sequence', 'story-evidence-and-inference'], 'advanced:1:4': ['story-evidence-and-inference'],
        'advanced:1:5': ['story-evidence-and-inference'], 'advanced:1:6': ['character-action-and-quality'], 'advanced:1:7': ['story-event-sequence', 'character-action-and-quality', 'story-evidence-and-inference'], 'advanced:1:8': ['story-evidence-and-inference'],
        'advanced:2:1': ['character-action-and-quality'], 'advanced:2:2': ['story-event-sequence'], 'advanced:2:3': ['story-evidence-and-inference'], 'advanced:2:4': ['story-event-sequence', 'story-evidence-and-inference'],
        'advanced:2:5': ['story-evidence-and-inference', 'reflection-and-action-planning'], 'advanced:2:6': ['character-action-and-quality'], 'advanced:2:7': ['character-action-and-quality', 'story-evidence-and-inference'], 'advanced:2:8': ['story-event-sequence', 'story-evidence-and-inference'],
        'high:1:1': ['reflection-and-action-planning'], 'high:1:2': ['reflection-and-action-planning', 'cooperation-and-respect'], 'high:1:3': ['story-event-sequence', 'reflection-and-action-planning'], 'high:1:4': ['reflection-and-action-planning'],
        'high:1:5': ['cooperation-and-respect', 'reflection-and-action-planning'], 'high:1:6': ['cooperation-and-respect'], 'high:1:7': ['cooperation-and-respect'], 'high:1:8': ['reflection-and-action-planning'],
        'high:2:1': ['reflection-and-action-planning', 'story-evidence-and-inference'], 'high:2:2': ['reflection-and-action-planning'], 'high:2:3': ['reflection-and-action-planning', 'cooperation-and-respect'], 'high:2:4': ['story-event-sequence', 'reflection-and-action-planning'],
        'high:2:5': ['reflection-and-action-planning', 'story-evidence-and-inference'], 'high:2:6': ['reflection-and-action-planning'], 'high:2:7': ['cooperation-and-respect'], 'high:2:8': ['reflection-and-action-planning'],
      };
      const ids = sourceQuestionKnowledgePoints[`${match[1]}:${Number(match[2])}:${Number(match[3])}`];
      if (!ids) throw new Error(`No knowledge-point mapping exists for Chinese learning question ${activity.id}.`);
      return ids;
    }
    case 'grade-2/term-1/chinese/unit-07': {
      const supplemental = grade2Term1ChineseUnit07SupplementalActivities.find(({ activity: candidate }) => candidate.id === activity.id);
      if (supplemental) return [...supplemental.knowledgePointIds];
      const match = activity.id.match(/\/(basic|advanced|high)\/task-(\d+)\/session-\d+\/question-(\d+)$/u);
      if (!match) throw new Error(`Could not identify the source task for Chinese learning question ${activity.id}.`);
      const sourceQuestionKnowledgePoints: Record<string, string[]> = {
        'basic:1:1': ['seasonal-scenery-clues', 'weather-observation-and-change'], 'basic:1:2': ['weather-observation-and-change'],
        'basic:1:3': ['fog-and-visibility-inference', 'care-and-safe-action'], 'basic:1:4': ['weather-observation-and-change', 'fog-and-visibility-inference'],
        'basic:1:5': ['weather-observation-and-change', 'care-and-safe-action'], 'basic:1:6': ['seasonal-scenery-clues'],
        'basic:1:7': ['weather-observation-and-change'], 'basic:1:8': ['fog-and-visibility-inference'],
        'basic:2:1': ['story-event-sequence'], 'basic:2:2': ['care-and-safe-action'], 'basic:2:3': ['care-and-safe-action'],
        'basic:2:4': ['weather-observation-and-change', 'story-event-sequence'], 'basic:2:5': ['story-event-sequence'],
        'basic:2:6': ['story-event-sequence'], 'basic:2:7': ['story-event-sequence', 'care-and-safe-action'],
        'basic:2:8': ['story-event-sequence', 'care-and-safe-action'],
        'advanced:1:1': ['fog-and-visibility-inference', 'weather-observation-and-change'],
        'advanced:1:2': ['story-event-sequence'], 'advanced:1:3': ['weather-observation-and-change', 'fog-and-visibility-inference'],
        'advanced:1:4': ['story-event-sequence', 'care-and-safe-action'], 'advanced:1:5': ['care-and-safe-action'],
        'advanced:1:6': ['story-event-sequence'], 'advanced:1:7': ['weather-observation-and-change'],
        'advanced:1:8': ['story-event-sequence'], 'advanced:2:1': ['fog-and-visibility-inference'],
        'advanced:2:2': ['seasonal-scenery-clues', 'weather-observation-and-change'],
        'advanced:2:3': ['weather-observation-and-change', 'fog-and-visibility-inference'],
        'advanced:2:4': ['weather-observation-and-change'], 'advanced:2:5': ['weather-observation-and-change'],
        'advanced:2:6': ['story-event-sequence'], 'advanced:2:7': ['care-and-safe-action', 'fog-and-visibility-inference'],
        'advanced:2:8': ['weather-observation-and-change', 'care-and-safe-action'],
        'high:1:1': ['weather-observation-and-change', 'fog-and-visibility-inference', 'care-and-safe-action'],
        'high:1:2': ['seasonal-scenery-clues', 'weather-observation-and-change'],
        'high:1:3': ['weather-observation-and-change', 'story-event-sequence'],
        'high:1:4': ['care-and-safe-action'], 'high:1:5': ['seasonal-scenery-clues', 'weather-observation-and-change'],
        'high:1:6': ['story-event-sequence'], 'high:1:7': ['care-and-safe-action'],
        'high:1:8': ['weather-observation-and-change', 'story-event-sequence'],
        'high:2:1': ['weather-observation-and-change', 'fog-and-visibility-inference'],
        'high:2:2': ['weather-observation-and-change'], 'high:2:3': ['fog-and-visibility-inference', 'weather-observation-and-change'],
        'high:2:4': ['story-event-sequence', 'care-and-safe-action'],
        'high:2:5': ['weather-observation-and-change', 'seasonal-scenery-clues'],
        'high:2:6': ['story-event-sequence'], 'high:2:7': ['care-and-safe-action'],
        'high:2:8': ['weather-observation-and-change', 'care-and-safe-action'],
      };
      const ids = sourceQuestionKnowledgePoints[`${match[1]}:${Number(match[2])}:${Number(match[3])}`];
      if (!ids) throw new Error(`No knowledge-point mapping exists for Chinese learning question ${activity.id}.`);
      return ids;
    }
    case 'grade-2/term-1/chinese/unit-08': {
      const supplemental = grade2Term1ChineseUnit08SupplementalActivities.find(({ activity: candidate }) => candidate.id === activity.id);
      if (supplemental) return [...supplemental.knowledgePointIds];
      const match = activity.id.match(/\/(basic|advanced|high)\/task-(\d+)\/session-\d+\/question-(\d+)$/u);
      if (!match) throw new Error(`Could not identify the source task for Chinese learning question ${activity.id}.`);
      const sourceQuestionKnowledgePoints: Record<string, string[]> = {
        'basic:1:1': ['fairy-tale-story-clues'], 'basic:1:2': ['fairy-tale-story-clues'],
        'basic:1:3': ['fairy-tale-story-clues'], 'basic:1:4': ['fact-inference-and-perspective'],
        'basic:1:5': ['fairy-tale-story-clues', 'fact-inference-and-perspective'], 'basic:1:6': ['fairy-tale-story-clues'],
        'basic:1:7': ['fairy-tale-story-clues', 'action-and-consequence'], 'basic:1:8': ['fairy-tale-story-clues', 'fact-inference-and-perspective'],
        'basic:2:1': ['friendly-communication-repair'], 'basic:2:2': ['friendly-communication-repair'],
        'basic:2:3': ['friendly-communication-repair'], 'basic:2:4': ['friendly-communication-repair'],
        'basic:2:5': ['friendly-communication-repair'], 'basic:2:6': ['friendly-communication-repair'],
        'basic:2:7': ['friendly-communication-repair', 'responsible-action-adjustment'], 'basic:2:8': ['friendly-communication-repair'],
        'advanced:1:1': ['action-and-consequence'], 'advanced:1:2': ['responsible-action-adjustment', 'action-and-consequence'],
        'advanced:1:3': ['responsible-action-adjustment'], 'advanced:1:4': ['action-and-consequence', 'responsible-action-adjustment'],
        'advanced:1:5': ['friendly-communication-repair', 'responsible-action-adjustment'], 'advanced:1:6': ['action-and-consequence', 'fairy-tale-story-clues'],
        'advanced:1:7': ['action-and-consequence'], 'advanced:1:8': ['action-and-consequence', 'responsible-action-adjustment'],
        'advanced:2:1': ['action-and-consequence', 'fact-inference-and-perspective'], 'advanced:2:2': ['action-and-consequence'],
        'advanced:2:3': ['responsible-action-adjustment', 'action-and-consequence'], 'advanced:2:4': ['action-and-consequence', 'responsible-action-adjustment'],
        'advanced:2:5': ['friendly-communication-repair'], 'advanced:2:6': ['fact-inference-and-perspective', 'fairy-tale-story-clues'],
        'advanced:2:7': ['fact-inference-and-perspective'], 'advanced:2:8': ['action-and-consequence', 'fairy-tale-story-clues'],
        'high:1:1': ['fairy-tale-story-clues'], 'high:1:2': ['fairy-tale-story-clues'],
        'high:1:3': ['friendly-communication-repair'], 'high:1:4': ['fact-inference-and-perspective'],
        'high:1:5': ['friendly-communication-repair', 'fairy-tale-story-clues'], 'high:1:6': ['fairy-tale-story-clues', 'action-and-consequence'],
        'high:1:7': ['fairy-tale-story-clues', 'fact-inference-and-perspective'], 'high:1:8': ['friendly-communication-repair'],
        'high:2:1': ['friendly-communication-repair', 'fairy-tale-story-clues'], 'high:2:2': ['fairy-tale-story-clues'],
        'high:2:3': ['friendly-communication-repair'], 'high:2:4': ['fairy-tale-story-clues', 'friendly-communication-repair'],
        'high:2:5': ['friendly-communication-repair'], 'high:2:6': ['fairy-tale-story-clues', 'action-and-consequence'],
        'high:2:7': ['fact-inference-and-perspective'], 'high:2:8': ['fairy-tale-story-clues', 'fact-inference-and-perspective'],
      };
      const ids = sourceQuestionKnowledgePoints[`${match[1]}:${Number(match[2])}:${Number(match[3])}`];
      if (!ids) throw new Error(`No knowledge-point mapping exists for Chinese learning question ${activity.id}.`);
      return ids;
    }
    case 'grade-2/term-2/chinese/unit-01': {
      const supplemental = grade2Term2ChineseUnit01SupplementalActivities.find(({ activity: candidate }) => candidate.id === activity.id);
      if (supplemental) return [...supplemental.knowledgePointIds];
      const match = activity.id.match(/\/(basic|advanced|high)\/task-(\d+)\/session-\d+\/question-(\d+)$/u);
      if (!match) throw new Error(`Could not identify the source task for Chinese learning question ${activity.id}.`);
      const sourceQuestionKnowledgePoints: Record<string, string[]> = {
        'basic:1:1': ['spring-sensory-observation'], 'basic:1:2': ['observation-facts-and-inference'],
        'basic:1:3': ['spring-sensory-observation', 'plant-growth-recording'], 'basic:1:4': ['plant-growth-recording'],
        'basic:1:5': ['observation-facts-and-inference'], 'basic:1:6': ['spring-sensory-observation'],
        'basic:1:7': ['spring-poetry-imagery', 'spring-sensory-observation'],
        'basic:1:8': ['spring-poetry-imagery', 'observation-facts-and-inference'],
        'basic:2:1': ['planting-sequence-and-care'], 'basic:2:2': ['planting-sequence-and-care'],
        'basic:2:3': ['plant-growth-recording'], 'basic:2:4': ['sharing-kindness-and-consequence'],
        'basic:2:5': ['sharing-kindness-and-consequence'],
        'basic:2:6': ['sharing-kindness-and-consequence', 'observation-facts-and-inference'],
        'basic:2:7': ['planting-sequence-and-care'],
        'basic:2:8': ['planting-sequence-and-care', 'sharing-kindness-and-consequence'],
        'advanced:1:1': ['plant-growth-recording'], 'advanced:1:2': ['plant-growth-recording', 'observation-facts-and-inference'],
        'advanced:1:3': ['plant-growth-recording', 'planting-sequence-and-care'],
        'advanced:1:4': ['plant-growth-recording', 'observation-facts-and-inference'],
        'advanced:1:5': ['plant-growth-recording'], 'advanced:1:6': ['sharing-kindness-and-consequence'],
        'advanced:1:7': ['plant-growth-recording', 'observation-facts-and-inference'],
        'advanced:1:8': ['observation-facts-and-inference', 'spring-sensory-observation'],
        'advanced:2:1': ['spring-poetry-imagery', 'spring-sensory-observation'],
        'advanced:2:2': ['spring-sensory-observation'],
        'advanced:2:3': ['plant-growth-recording', 'spring-sensory-observation'],
        'advanced:2:4': ['spring-poetry-imagery', 'observation-facts-and-inference'],
        'advanced:2:5': ['observation-facts-and-inference'],
        'advanced:2:6': ['sharing-kindness-and-consequence', 'observation-facts-and-inference'],
        'advanced:2:7': ['planting-sequence-and-care'],
        'advanced:2:8': ['planting-sequence-and-care', 'plant-growth-recording'],
        'high:1:1': ['spring-sensory-observation'], 'high:1:2': ['spring-sensory-observation'],
        'high:1:3': ['spring-poetry-imagery', 'sharing-kindness-and-consequence'],
        'high:1:4': ['observation-facts-and-inference'],
        'high:1:5': ['spring-sensory-observation', 'sharing-kindness-and-consequence'],
        'high:1:6': ['observation-facts-and-inference', 'plant-growth-recording'],
        'high:1:7': ['observation-facts-and-inference'],
        'high:1:8': ['sharing-kindness-and-consequence', 'planting-sequence-and-care'],
        'high:2:1': ['observation-facts-and-inference'],
        'high:2:2': ['spring-poetry-imagery', 'observation-facts-and-inference'],
        'high:2:3': ['observation-facts-and-inference', 'sharing-kindness-and-consequence'],
        'high:2:4': ['spring-poetry-imagery', 'observation-facts-and-inference'],
        'high:2:5': ['planting-sequence-and-care', 'sharing-kindness-and-consequence'],
        'high:2:6': ['spring-sensory-observation'],
        'high:2:7': ['spring-sensory-observation', 'spring-poetry-imagery'],
        'high:2:8': ['planting-sequence-and-care', 'plant-growth-recording'],
      };
      const ids = sourceQuestionKnowledgePoints[`${match[1]}:${Number(match[2])}:${Number(match[3])}`];
      if (!ids) throw new Error(`No knowledge-point mapping exists for Chinese learning question ${activity.id}.`);
      return ids;
    }
    case 'grade-2/term-2/chinese/unit-02': {
      const supplemental = grade2Term2ChineseUnit02SupplementalActivities.find(({ activity: candidate }) => candidate.id === activity.id);
      if (supplemental) return [...supplemental.knowledgePointIds];
      const match = activity.id.match(/\/(basic|advanced|high)\/task-(\d+)\/session-\d+\/question-(\d+)$/u);
      if (!match) throw new Error(`Could not identify the source task for Chinese learning question ${activity.id}.`);
      const sourceQuestionKnowledgePoints: Record<string, string[]> = {
        'basic:1:1': ['food-labor-chain'], 'basic:1:2': ['food-labor-chain', 'respect-for-labor'],
        'basic:1:3': ['respect-for-labor'], 'basic:1:4': ['fair-cooperation'],
        'basic:1:5': ['fair-cooperation'], 'basic:1:6': ['food-labor-chain', 'respect-for-labor'],
        'basic:1:7': ['fair-cooperation', 'respect-for-labor'], 'basic:1:8': ['fair-cooperation'],
        'basic:2:1': ['respectful-help'], 'basic:2:2': ['respectful-help'],
        'basic:2:3': ['respectful-help', 'independent-growth'], 'basic:2:4': ['independent-growth'],
        'basic:2:5': ['independent-growth'], 'basic:2:6': ['respectful-help'],
        'basic:2:7': ['independent-growth'], 'basic:2:8': ['independent-growth'],
        'advanced:1:1': ['respectful-help'], 'advanced:1:2': ['fair-cooperation'],
        'advanced:1:3': ['respectful-help'], 'advanced:1:4': ['respectful-help'],
        'advanced:1:5': ['fair-cooperation', 'respect-for-labor'], 'advanced:1:6': ['food-labor-chain', 'respect-for-labor'],
        'advanced:1:7': ['independent-growth', 'respectful-help'], 'advanced:1:8': ['respectful-help', 'independent-growth'],
        'advanced:2:1': ['respectful-help'], 'advanced:2:2': ['food-labor-chain', 'respect-for-labor'],
        'advanced:2:3': ['respectful-help', 'fair-cooperation'], 'advanced:2:4': ['respectful-help'],
        'advanced:2:5': ['story-action-evidence', 'independent-growth'],
        'advanced:2:6': ['story-action-evidence', 'food-labor-chain', 'respectful-help'],
        'advanced:2:7': ['food-labor-chain'], 'advanced:2:8': ['fair-cooperation', 'respectful-help'],
        'high:1:1': ['fair-cooperation', 'respectful-help'], 'high:1:2': ['fair-cooperation', 'respect-for-labor'],
        'high:1:3': ['fair-cooperation', 'respect-for-labor'], 'high:1:4': ['fair-cooperation'],
        'high:1:5': ['respectful-help'], 'high:1:6': ['fair-cooperation', 'respect-for-labor'],
        'high:1:7': ['fair-cooperation', 'respect-for-labor'], 'high:1:8': ['fair-cooperation', 'respect-for-labor'],
        'high:2:1': ['story-action-evidence'], 'high:2:2': ['story-action-evidence', 'respectful-help'],
        'high:2:3': ['story-action-evidence', 'food-labor-chain'], 'high:2:4': ['story-action-evidence', 'independent-growth'],
        'high:2:5': ['respectful-help'], 'high:2:6': ['story-action-evidence', 'food-labor-chain'],
        'high:2:7': ['story-action-evidence', 'independent-growth'], 'high:2:8': ['story-action-evidence', 'respectful-help'],
      };
      const ids = sourceQuestionKnowledgePoints[`${match[1]}:${Number(match[2])}:${Number(match[3])}`];
      if (!ids) throw new Error(`No knowledge-point mapping exists for Chinese learning question ${activity.id}.`);
      return ids;
    }
    case 'grade-2/term-2/chinese/unit-03': {
      const supplemental = grade2Term2ChineseUnit03SupplementalActivities.find(({ activity: candidate }) => candidate.id === activity.id);
      if (supplemental) return [...supplemental.knowledgePointIds];
      const match = activity.id.match(/\/(basic|advanced|high)\/task-(\d+)\/session-\d+\/question-(\d+)$/u);
      if (!match) throw new Error(`Could not identify the source task for Chinese learning question ${activity.id}.`);
      const sourceQuestionKnowledgePoints: Record<string, string[]> = {
        'basic:1:1': ['festival-customs'], 'basic:1:2': ['culture-source-checking', 'festival-customs'],
        'basic:1:3': ['festival-customs'], 'basic:1:4': ['festival-customs', 'cultural-respect'],
        'basic:1:5': ['cultural-respect'], 'basic:1:6': ['festival-customs', 'cultural-respect'],
        'basic:1:7': ['culture-source-checking', 'festival-customs'], 'basic:1:8': ['festival-customs', 'cultural-respect'],
        'basic:2:1': ['character-components'], 'basic:2:2': ['character-components'],
        'basic:2:3': ['food-vocabulary'], 'basic:2:4': ['food-vocabulary'],
        'basic:2:5': ['character-components', 'culture-source-checking'], 'basic:2:6': ['food-vocabulary'],
        'basic:2:7': ['food-vocabulary'], 'basic:2:8': ['food-vocabulary', 'culture-source-checking'],
        'advanced:1:1': ['character-components', 'culture-source-checking'],
        'advanced:1:2': ['culture-source-checking'], 'advanced:1:3': ['culture-source-checking'],
        'advanced:1:4': ['culture-source-checking'], 'advanced:1:5': ['culture-source-checking', 'festival-customs'],
        'advanced:1:6': ['culture-source-checking'], 'advanced:1:7': ['character-components', 'culture-source-checking'],
        'advanced:1:8': ['cultural-respect'], 'advanced:2:1': ['character-components', 'culture-source-checking'],
        'advanced:2:2': ['festival-customs'], 'advanced:2:3': ['festival-customs', 'cultural-respect'],
        'advanced:2:4': ['food-vocabulary'], 'advanced:2:5': ['cultural-respect', 'festival-customs'],
        'advanced:2:6': ['food-vocabulary'], 'advanced:2:7': ['character-components', 'culture-source-checking'],
        'advanced:2:8': ['food-vocabulary', 'culture-source-checking'],
        'high:1:1': ['culture-source-checking', 'cultural-presentation'],
        'high:1:2': ['culture-source-checking', 'cultural-presentation'],
        'high:1:3': ['culture-source-checking', 'cultural-presentation'],
        'high:1:4': ['culture-source-checking', 'cultural-presentation'],
        'high:1:5': ['culture-source-checking', 'cultural-presentation'],
        'high:1:6': ['culture-source-checking', 'cultural-presentation'],
        'high:1:7': ['culture-source-checking', 'cultural-respect', 'cultural-presentation'],
        'high:1:8': ['cultural-respect', 'festival-customs', 'cultural-presentation'],
        'high:2:1': ['food-vocabulary', 'cultural-presentation'],
        'high:2:2': ['culture-source-checking', 'cultural-presentation'],
        'high:2:3': ['culture-source-checking', 'cultural-presentation'],
        'high:2:4': ['culture-source-checking', 'cultural-presentation'],
        'high:2:5': ['cultural-respect', 'cultural-presentation'],
        'high:2:6': ['culture-source-checking', 'cultural-presentation'],
        'high:2:7': ['culture-source-checking', 'cultural-presentation'],
        'high:2:8': ['culture-source-checking', 'cultural-presentation'],
      };
      const ids = sourceQuestionKnowledgePoints[`${match[1]}:${Number(match[2])}:${Number(match[3])}`];
      if (!ids) throw new Error(`No knowledge-point mapping exists for Chinese learning question ${activity.id}.`);
      return ids;
    }
    default:
      {
        const manifestQuestion = pilotManifest.questions.find(({ activityId }) => activityId === activity.id);
        if (manifestQuestion) return [...manifestQuestion.knowledgePointIds];
      }
      throw new Error(`No pilot knowledge-point mapping exists for ${sourceUnitId}.`);
  }
}
