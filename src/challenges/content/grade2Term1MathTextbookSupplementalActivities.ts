import type { ActivityDefinition } from '../../content/types';
import type { Difficulty } from '../../content/types';

export interface Grade2Term1MathTextbookSupplementalActivity {
  difficulty: Difficulty;
  sourceUnitId: string;
  knowledgePointIds: string[];
  activity: ActivityDefinition;
}

type Draft = {
  prompt: string;
  answer: string;
  distractors: readonly [string, string];
  hint: string;
  explanation: string;
};

const unitIds = {
  classification: 'grade-2/term-1/math/unit-01',
  multiplication: 'grade-2/term-1/math/unit-02',
  division: 'grade-2/term-1/math/unit-03',
  length: 'grade-2/term-1/math/unit-04',
  multiplicationDivision: 'grade-2/term-1/math/unit-05',
  review: 'grade-2/term-1/math/unit-06',
} as const;

const knowledgePoints: Record<keyof typeof unitIds, string[]> = {
  classification: ['classification-standards', 'classification-counts-and-comparison', 'complete-and-nonduplicated-records'],
  multiplication: ['equal-groups-multiplication', 'multiplication-facts'],
  division: ['equal-sharing-and-grouping', 'division-facts-and-multiplication-check'],
  length: ['length-units', 'measurement-and-estimation'],
  multiplicationDivision: ['multiplication-facts-7-9', 'division-facts-7-9'],
  review: ['term-review-method-selection', 'term-review-result-checking'],
};

function makeChoiceActivity(id: string, draft: Draft, correctIndex: number): ActivityDefinition {
  const labels = [...draft.distractors];
  labels.splice(correctIndex, 0, draft.answer);
  if (new Set(labels).size !== 3) throw new Error(`题目选项重复：${id}`);
  return {
    id,
    kind: 'choice',
    prompt: draft.prompt,
    options: labels.map((label, index) => ({ id: `${id}/option-${index + 1}`, label })),
    correctOptionId: `${id}/option-${correctIndex + 1}`,
    hint: draft.hint,
    explanation: draft.explanation,
  };
}

function makeRows(
  key: keyof typeof unitIds,
  difficulty: Difficulty,
  count: number,
  makeDraft: (index: number) => Draft,
): Grade2Term1MathTextbookSupplementalActivity[] {
  const sourceUnitId = unitIds[key];
  return Array.from({ length: count }, (_, index) => {
    const sequence = String(index + 1).padStart(2, '0');
    const id = `challenge-supplement-grade-2-term-1-math-unit-${sourceUnitId.slice(-2)}-${difficulty}-${sequence}`;
    const draft = makeDraft(index);
    return {
      difficulty,
      sourceUnitId,
      knowledgePointIds: [...knowledgePoints[key]],
      activity: makeChoiceActivity(id, draft, index % 3),
    };
  });
}

const classificationThemes = [
  '彩球', '文具', '校园树叶', '运动用品', '图书角物品', '教室用品', '交通标志卡',
  '天气记录卡', '积木', '书签', '画具', '种子包', '校园活动卡', '图书卡片',
];

function classificationDraft(difficulty: Difficulty, index: number): Draft {
  const theme = classificationThemes[index]!;
  const firstCount = 2 + ((index + (difficulty === 'high' ? 2 : 0)) % 5);
  const secondCount = 1 + ((index * 2 + (difficulty === 'advanced' ? 1 : 0)) % 4);
  const total = firstCount + secondCount;
  if (difficulty === 'basic') {
    return {
      prompt: `按同一标准整理${theme}，第一类有${firstCount}件，第二类有${secondCount}件，一共有多少件？`,
      answer: String(total), distractors: [String(total - 1), String(total + 1)],
      hint: '把两类的数量合起来。', explanation: `${firstCount}加${secondCount}等于${total}件。`,
    };
  }
  if (difficulty === 'advanced') {
    const firstIsLarger = firstCount > secondCount;
    return {
      prompt: `统计${theme}后，第一类有${firstCount}件、第二类有${secondCount}件。哪种比较结果正确？`,
      answer: firstIsLarger ? '第一类更多' : firstCount === secondCount ? '两类一样多' : '第二类更多',
      distractors: firstIsLarger ? ['第二类更多', '两类一样多'] : firstCount === secondCount ? ['第一类更多', '第二类更多'] : ['第一类更多', '两类一样多'],
      hint: '比较两个类别的数量。',
      explanation: firstIsLarger ? `${firstCount}大于${secondCount}，第一类更多。` : firstCount === secondCount ? `两类各有${firstCount}件，一样多。` : `${secondCount}大于${firstCount}，第二类更多。`,
    };
  }
  return {
    prompt: `把${theme}从按颜色改为按用途分类，原来的物品总数会怎样？`,
    answer: '总数不变，各类数量可能变化',
    distractors: ['总数一定增加', '总数一定减少'],
    hint: '改变的是分类标准，物品本身没有增减。',
    explanation: '换一个分类标准会改变各类的数量，但不会让物品增加或减少。',
  };
}

const multiplicationContexts = ['卡片', '积木', '贴纸', '花盆', '书签', '彩笔', '棋子', '小旗', '图书', '画纸', '图案', '种子包', '纸杯', '星星贴'];
function multiplicationDraft(difficulty: Difficulty, index: number, factorOffset: number): Draft {
  const first = 1 + ((index + factorOffset) % 6);
  const second = 1 + ((index * 5 + factorOffset * 2) % 6);
  const product = first * second;
  const context = multiplicationContexts[(index + factorOffset) % multiplicationContexts.length]!;
  if (difficulty === 'basic') {
    return {
      prompt: `${first}组${context}，每组${second}个，一共有多少个？`,
      answer: String(product), distractors: [String(product + first), String(product - 1)],
      hint: '用组数乘每组数量。', explanation: `${first}乘${second}等于${product}。`,
    };
  }
  if (difficulty === 'advanced') {
    return {
      prompt: `把每次增加${second}张${context}、连续增加${first}次写成乘法，得数是多少？`,
      answer: String(product), distractors: [String(product + 1), String(product + 2)],
      hint: '相同加数的个数是第一个因数。', explanation: `${second}相加${first}次是${first}乘${second}，得${product}。`,
    };
  }
  return {
    prompt: `${first}个小组各拿到${second}张${context}卡，记录总数时应是多少张？`,
    answer: String(product), distractors: [String(first + second), String(product - second)],
    hint: '每组数量相同，可以用乘法求总数。', explanation: `${first}组每组${second}张，共${product}张。`,
  };
}

const divisionObjects = ['星星贴纸', '棋子', '图书卡', '小积木', '彩笔', '种子包', '卡片', '游戏筹码', '贴画', '纸花', '彩绳', '图案章', '计数片', '书签'];
function divisionDraft(difficulty: Difficulty, index: number, divisorOffset: number): Draft {
  const divisor = 1 + ((index + divisorOffset) % 6);
  const quotient = 1 + ((index * 3 + divisorOffset) % 6);
  const dividend = divisor * quotient;
  const object = divisionObjects[(index + divisorOffset) % divisionObjects.length]!;
  if (difficulty === 'basic') {
    return {
      prompt: `${dividend}个${object}平均分给${divisor}组，每组几个？`,
      answer: String(quotient), distractors: [String(quotient + 1), String(Math.max(0, quotient - 1))],
      hint: '把总数平均分成指定的份数。', explanation: `${dividend}除以${divisor}等于${quotient}。`,
    };
  }
  if (difficulty === 'advanced') {
    return {
      prompt: `${dividend}个${object}每${quotient}个放一袋，可以装几袋？`,
      answer: String(divisor), distractors: [String(divisor + 1), String(Math.max(0, divisor - 1))],
      hint: '每袋的数量已知，求可以分成几袋。', explanation: `${dividend}除以每袋${quotient}个等于${divisor}袋。`,
    };
  }
  return {
      prompt: `检查${dividend}个${object}平均分成${divisor}组、每组${quotient}个，哪道乘法算式能验证结果？`,
    answer: `${divisor} × ${quotient} = ${dividend}`,
    distractors: [`${divisor} + ${quotient} = ${dividend}`, `${dividend} × ${divisor} = ${quotient}`],
    hint: '用除数乘商，看看是否等于被除数。', explanation: `${divisor}乘${quotient}等于${dividend}，所以除法算式正确。`,
  };
}

const lengthObjects = [
  { name: '橡皮短边', unit: '厘米' },
  { name: '铅笔长度', unit: '厘米' },
  { name: '书本宽度', unit: '厘米' },
  { name: '课桌高度', unit: '厘米' },
  { name: '教室门高', unit: '米' },
  { name: '操场一圈', unit: '米' },
  { name: '书签长边', unit: '厘米' },
  { name: '约2米长的彩带', unit: '米' },
  { name: '走廊长度', unit: '米' },
  { name: '窗台宽度', unit: '厘米' },
  { name: '花坛边长', unit: '米' },
  { name: '尺子长度', unit: '厘米' },
  { name: '纸条长度', unit: '厘米' },
  { name: '黑板宽度', unit: '米' },
  { name: '杯垫宽度', unit: '厘米' },
  { name: '跳绳长度', unit: '米' },
  { name: '地垫短边', unit: '厘米' },
  { name: '操场直道长度', unit: '米' },
];
function lengthDraft(difficulty: Difficulty, index: number): Draft {
  const object = lengthObjects[index]!;
  if (difficulty === 'basic' && index % 2 === 0) {
    const meters = 1 + Math.floor(index / 2);
    return {
      prompt: `把${meters}米换成厘米，得数是多少？`, answer: String(meters * 100),
      distractors: [String(meters * 10), String(meters * 1000)],
      hint: '1米等于100厘米。', explanation: `${meters}米等于${meters * 100}厘米。`,
    };
  }
  if (difficulty === 'basic') {
    const answer = object.unit;
    return {
      prompt: `测量${object.name}时，通常优先选哪个长度单位？`, answer,
      distractors: answer === '厘米' ? ['米', '千米'] : ['厘米', '毫米'],
      hint: '先估一估对象大约有多长。', explanation: answer === '厘米' ? `${object.name}较短，用厘米记录更方便。` : `${object.name}较长，用米作单位通常更方便。`,
    };
  }
  if (difficulty === 'advanced') {
    const start = 1 + index;
    const length = 4 + (index % 5);
    const end = start + length;
    return {
      prompt: `线段从直尺${start}厘米刻度到${end}厘米刻度，长多少厘米？`, answer: String(length),
      distractors: [String(end), String(start + end)],
      hint: '用终点刻度减去起点刻度。', explanation: `${end}减${start}等于${length}厘米。`,
    };
  }
  if (index % 2 === 0) {
    const meters = 2 + (index % 4);
    const centimeters = 15 + (index * 7) % 70;
    const answer = meters * 100 + centimeters;
    return {
      prompt: `${meters}米${centimeters}厘米一共是多少厘米？`, answer: String(answer),
      distractors: [String(meters * 10 + centimeters), String(meters * 100 - centimeters)],
      hint: '先把米换成厘米，再加上剩余厘米数。', explanation: `${meters}米是${meters * 100}厘米，再加${centimeters}厘米，共${answer}厘米。`,
    };
  }
  return {
    prompt: `测量${object.name}时，尺子的起点没有对准0刻度，怎样处理更合适？`,
    answer: '记录起点和终点刻度，再用终点减起点',
    distractors: ['直接把终点数字当作长度', '把起点和终点数字相加'],
    hint: '长度是两个刻度之间的距离。',
    explanation: '起点不在0时，要用终点刻度减去起点刻度，不能只读终点。',
  };
}

const factorContexts = ['贴纸', '棋子', '卡片', '积木', '花盆', '彩笔', '种子包', '书签', '小旗', '图书', '纸杯', '画片', '星星牌', '图案片'];
function multiplicationDivisionDraft(difficulty: Difficulty, index: number, factorOffset: number): Draft {
  const first = 7 + ((index + factorOffset) % 3);
  const second = 1 + ((index * 4 + factorOffset) % 9);
  const product = first * second;
  const context = factorContexts[(index + factorOffset) % factorContexts.length]!;
  if (difficulty === 'basic') {
    return {
      prompt: `${first}组${context}，每组${second}个，一共有多少个？`, answer: String(product),
      distractors: [String(first + second), String(product + first)],
      hint: '用7、8或9的乘法口诀。', explanation: `${first}乘${second}等于${product}。`,
    };
  }
  if (difficulty === 'advanced') {
    return {
      prompt: `${product}个${context}平均分成${first}组，每组几个？`, answer: String(second),
      distractors: [String(second + 1), String(Math.max(0, second - 1))],
      hint: `想一想${first}乘几等于${product}。`,
      explanation: `${first}乘${second}等于${product}，所以${product}除以${first}等于${second}。`,
    };
  }
  return {
    prompt: `有${product}个${context}，每${second}个分一组。哪项记录的组数正确？`, answer: String(first),
    distractors: [String(first + 1), String(Math.max(0, first - 1))],
    hint: '用总数除以每组的数量。', explanation: `${product}除以${second}等于${first}组。`,
  };
}

function reviewDraft(difficulty: Difficulty, index: number): Draft {
  const kind = index % 5;
  const a = 2 + ((index * 3 + (difficulty === 'high' ? 1 : 0)) % 8);
  const b = 1 + ((index * 2) % 6);
  if (kind === 0) {
    const total = a + b;
    return {
      prompt: `整理校园卡片时，两类分别有${a}张和${b}张。换一种分类标准后，卡片总数是多少张？`,
      answer: String(total), distractors: [String(total + 1), String(Math.max(0, total - 1))],
      hint: '分类标准会变，但卡片没有增减。', explanation: `${a}加${b}等于${total}张，分类前后总数相同。`,
    };
  }
  if (kind === 1) {
    const factor = 1 + (index % 9);
    const each = 1 + ((index * 4 + 1) % 9);
    const total = factor * each;
    return {
      prompt: `${factor}组学习用品，每组${each}件，一共有多少件？`, answer: String(total),
      distractors: [String(factor + each), String(total + factor)],
      hint: '用组数乘每组数量。', explanation: `${factor}乘${each}等于${total}件。`,
    };
  }
  if (kind === 2) {
    const meters = 1 + (index % 4);
    return {
      prompt: `${meters}米等于多少厘米？`, answer: String(meters * 100),
      distractors: [String(meters * 10), String(meters * 1000)],
      hint: '1米等于100厘米。', explanation: `${meters}米等于${meters * 100}厘米。`,
    };
  }
  if (kind === 3) {
    const divisor = 1 + (index % 9);
    const quotient = 1 + ((index * 5) % 9);
    const dividend = divisor * quotient;
    return {
      prompt: `${dividend}张卡片平均分给${divisor}个小组，每组几张？`, answer: String(quotient),
      distractors: [String(quotient + 1), String(Math.max(0, quotient - 1))],
      hint: '想乘法口诀中除数乘几等于总数。', explanation: `${dividend}除以${divisor}等于${quotient}张。`,
    };
  }
  const directions = [['旗台', '教学楼', '北'], ['校门', '图书角', '东'], ['操场', '教学楼', '西'], ['花园', '教学楼', '南']] as const;
  const [place, reference, answer] = directions[index % directions.length]!;
  return {
    prompt: `${place}在${reference}的${answer}面；从${place}走回${reference}，应朝哪个方向？`,
    answer: answer === '北' ? '南' : answer === '南' ? '北' : answer === '东' ? '西' : '东',
    distractors: answer === '北' || answer === '南' ? ['东', '西'] : ['北', '南'],
    hint: '返回原处时，行走方向与来时相反。',
    explanation: `${place}在${reference}${answer}面，返回${reference}应向${answer === '北' ? '南' : answer === '南' ? '北' : answer === '东' ? '西' : '东'}走。`,
  };
}

function buildAll(): Grade2Term1MathTextbookSupplementalActivity[] {
  const result: Grade2Term1MathTextbookSupplementalActivity[] = [];
  const levels: Difficulty[] = ['basic', 'advanced', 'high'];
  for (const difficulty of levels) {
    result.push(...makeRows('classification', difficulty, 14, (index) => classificationDraft(difficulty, index)));
    result.push(...makeRows('multiplication', difficulty, 14, (index) => multiplicationDraft(difficulty, index, levels.indexOf(difficulty) * 9)));
    result.push(...makeRows('division', difficulty, 14, (index) => divisionDraft(difficulty, index, levels.indexOf(difficulty) * 4)));
    const lengthQuestionCount = difficulty === 'basic' ? 17 : 15;
    result.push(...makeRows('length', difficulty, lengthQuestionCount, (index) => lengthDraft(difficulty, index)));
    result.push(...makeRows('multiplicationDivision', difficulty, 14, (index) => multiplicationDivisionDraft(difficulty, index, levels.indexOf(difficulty) * 3)));
    result.push(...makeRows('review', difficulty, 14, (index) => reviewDraft(difficulty, index + levels.indexOf(difficulty) * 5)));
  }
  return result;
}

export const grade2Term1MathTextbookSupplementalActivities = buildAll();
