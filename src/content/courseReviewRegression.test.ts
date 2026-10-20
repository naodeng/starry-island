import { describe, expect, it } from 'vitest';
import { curriculum } from './curriculum';
import type { ActivityDefinition } from './types';

function activityById(questionId: string): ActivityDefinition {
  for (const unit of Object.values(curriculum.units)) {
    for (const track of Object.values(unit.difficultyTracks)) {
      for (const task of track.tasks) {
        for (const session of task.sessions) {
          const activity = session.activities.find(({ id }) => id === questionId);
          if (activity) return activity;
        }
      }
    }
  }

  throw new Error(`课程题目不存在：${questionId}`);
}

function allActivities(): ActivityDefinition[] {
  return Object.values(curriculum.units)
    .flatMap((unit) => Object.values(unit.difficultyTracks))
    .flatMap(({ tasks }) => tasks)
    .flatMap(({ sessions }) => sessions)
    .flatMap(({ activities }) => activities);
}

describe('course review regression cases', () => {
  it('states the original relation in the grade-one inverse check', () => {
    const advanced = activityById('grade-1/term-2/math/unit-06/advanced/task-02/session-01/question-04');
    const high = activityById('grade-1/term-2/math/unit-06/high/task-02/session-01/question-04');

    expect(advanced.kind).toBe('choice');
    expect(advanced.prompt).toContain('30 + 10 = 40');
    expect(advanced.prompt).toContain('40 - 10 = ?');
    if (advanced.kind === 'choice') {
      expect(advanced.options.find(({ id }) => id === advanced.correctOptionId)?.label).toBe('30');
      expect(advanced.explanation).toContain('回到了原算式中的 30');
    }

    expect(high.kind).toBe('choice');
    expect(high.prompt).toContain('50 + 20 = 70');
    expect(high.prompt).toContain('70 - 20 = ?');
    if (high.kind === 'choice') {
      expect(high.options.find(({ id }) => id === high.correctOptionId)?.label).toBe('50');
      expect(high.explanation).toContain('回到了原算式中的 50');
    }
  });

  it('checks grade-three multiplication by splitting the factor within the unit scope', () => {
    const advanced = activityById('grade-3/term-1/math/unit-06/advanced/task-02/session-01/question-04');
    const high = activityById('grade-3/term-1/math/unit-06/high/task-02/session-01/question-04');

    expect(advanced.kind).toBe('choice');
    expect(advanced.prompt).toContain('28 × 4 = 112');
    expect(advanced.prompt).toContain('把 28 拆成 20 和 8');
    expect(advanced.prompt).toContain('20 × 4 + 8 × 4 = ?');
    expect(advanced.prompt).not.toContain('÷');
    if (advanced.kind === 'choice') {
      expect(advanced.options.find(({ id }) => id === advanced.correctOptionId)?.label).toBe('112');
      expect(advanced.explanation).toContain('与原算式 28 × 4 = 112 一致');
    }

    expect(high.kind).toBe('choice');
    expect(high.prompt).toContain('46 × 4 = 184');
    expect(high.prompt).toContain('把 46 拆成 40 和 6');
    expect(high.prompt).toContain('40 × 4 + 6 × 4 = ?');
    expect(high.prompt).not.toContain('÷');
    if (high.kind === 'choice') {
      expect(high.options.find(({ id }) => id === high.correctOptionId)?.label).toBe('184');
      expect(high.explanation).toContain('与原算式 46 × 4 = 184 一致');
    }
  });

  it('keeps generated prompts free of adjacent question and sentence punctuation', () => {
    const malformed = allActivities().filter(({ prompt }) => /[？?][，。]/u.test(prompt));

    expect(malformed.map(({ id }) => id)).toEqual([]);
  });

  it('separates both source questions in the grade-four high-tier evidence prompt', () => {
    const activity = activityById('grade-4/term-1/english/review-01/high/task-01/session-01/question-05');

    expect(activity.prompt).toContain('以下两题：（A题：');
    expect(activity.prompt).toContain('；B题：');
    expect(activity.prompt).toContain('）。哪组答案按顺序同时符合两题的要求？');
  });

  it('asks learners to arrange the grade-one and grade-three English word cards', () => {
    const questions = allActivities().filter(({ id }) => /^grade-[13]\/term-[12]\/english\/.+\/advanced\/task-\d{2}\/session-01\/question-06$/u.test(id));

    expect(questions).toHaveLength(64);
    for (const question of questions) {
      expect(question.kind).toBe('order');
      expect(question.prompt).toMatch(/Arrange the word cards/u);
      expect(question.prompt).not.toMatch(/Choose the word cards/u);
    }
  });

  it('describes You are welcome as a response to thanks', () => {
    const activity = activityById('grade-2/term-1/english/unit-06/high/task-01/session-01/question-08');

    expect(activity.kind).toBe('order');
    expect(activity.prompt).toContain('回应感谢');
  });

  it('uses weather words for the second grade-two seasons lesson', () => {
    const seasons = activityById('grade-2/term-2/english/unit-03/basic/task-01/session-01/question-07');
    const weather = activityById('grade-2/term-2/english/unit-03/basic/task-02/session-01/question-07');

    expect(seasons.kind).toBe('categorize');
    expect(weather.kind).toBe('categorize');
    if (seasons.kind === 'categorize' && weather.kind === 'categorize') {
      expect(seasons.items.map(({ label }) => label)).toEqual(['spring', 'summer', 'autumn', 'winter']);
      expect(weather.items.map(({ label }) => label)).toEqual(['warm', 'hot', 'cool', 'cold']);
      expect(seasons.categories.map(({ label }) => label)).toEqual(['春天和夏天', '秋天和冬天']);
      expect(weather.categories.map(({ label }) => label)).toEqual(['温暖或炎热的天气', '凉爽或寒冷的天气']);
      const weatherCategories = new Map(weather.categories.map(({ id, label }) => [id, label]));
      expect(weather.items.map(({ label, categoryId }) => [label, weatherCategories.get(categoryId)])).toEqual([
        ['warm', '温暖或炎热的天气'],
        ['hot', '温暖或炎热的天气'],
        ['cool', '凉爽或寒冷的天气'],
        ['cold', '凉爽或寒冷的天气'],
      ]);
    }
  });

  it('includes the statistics data on each grade-three comparison activity card', () => {
    const categories = [
      activityById('grade-3/term-2/math/unit-03/basic/task-01/session-01/question-04'),
      activityById('grade-3/term-2/math/unit-03/basic/task-02/session-01/question-04'),
    ];
    const orderedActivities = [
      activityById('grade-3/term-2/math/unit-03/basic/task-01/session-01/question-05'),
      activityById('grade-3/term-2/math/unit-03/basic/task-02/session-01/question-05'),
    ];

    for (const activity of categories) {
      expect(activity.kind).toBe('categorize');
      if (activity.kind === 'categorize') {
        expect(activity.items.length).toBeGreaterThan(0);
        expect(activity.items.every(({ label }) => /一班 \d+ 人、二班 \d+ 人/u.test(label))).toBe(true);
        const categories = new Map(activity.categories.map(({ id, label }) => [id, label]));
        for (const item of activity.items) {
          const [classOne = 0, classTwo = 0] = item.label.match(/\d+/gu)?.map(Number) ?? [];
          const expected = classOne > classTwo ? '一班更多' : classOne < classTwo ? '二班更多' : '两班一样多';
          expect(categories.get(item.categoryId)).toBe(expected);
        }
      }
    }

    for (const activity of orderedActivities) {
      expect(activity.kind).toBe('order');
      if (activity.kind === 'order') {
        expect(activity.items.length).toBeGreaterThan(0);
        expect(activity.items.every(({ label }) => /（\d+ 人）$/u.test(label))).toBe(true);
        const totalsById = new Map(activity.items.map(({ id, label }) => [id, Number(label.match(/（(\d+) 人）$/u)?.[1]) ]));
        const orderedTotals = activity.correctOrder.map((id) => totalsById.get(id));
        expect(orderedTotals.every((total) => total !== undefined)).toBe(true);
        expect(orderedTotals).toEqual([...orderedTotals].sort((left, right) => (left ?? 0) - (right ?? 0)));
      }
    }
  });

  it('keeps bar-chart comparison prompts self-contained', () => {
    const prompts = [
      activityById('grade-4/term-1/math/unit-07/basic/task-01/session-01/question-03').prompt,
      activityById('grade-4/term-1/math/unit-07/basic/task-01/session-01/question-08').prompt,
      activityById('grade-4/term-1/math/unit-07/basic/task-02/session-01/question-03').prompt,
      activityById('grade-4/term-1/math/unit-07/basic/task-02/session-01/question-08').prompt,
    ];

    expect(prompts[0]).toContain('科普书8本、绘本5本、故事书7本、漫画书4本');
    expect(prompts[1]).toContain('科普书8本、绘本5本、故事书7本、漫画书4本');
    expect(prompts[2]).toContain('周一回收3个、周二5个、周三2个、周四6个');
    expect(prompts[3]).toContain('周一回收3个、周二5个、周三2个、周四6个');
  });

  it('matches the grade-five coordinate question instruction to its ordering activity', () => {
    const activity = activityById('grade-5/term-1/math/unit-02/basic/task-02/session-01/question-06');

    expect(activity.kind).toBe('order');
    expect(activity.prompt).toContain('步骤排好');
  });

  it('separates the grade-five trial from the previous experiment record', () => {
    const activity = activityById('grade-5/term-1/math/unit-04/advanced/task-01/session-01/question-03');

    expect(activity.prompt).toContain('另一次20次试验');
    expect(activity.prompt).not.toContain('刚才');
  });

  it('keeps the grade-five card probability question independent of the prior prompt', () => {
    const activity = activityById('grade-5/term-1/math/unit-04/advanced/task-02/session-01/question-04');

    expect(activity.prompt).toContain('5张讲故事卡、3张唱歌卡、1张跳舞卡');
    expect(activity.prompt).not.toContain('上题');
  });

  it('makes each repaired cross-question math prompt self-contained', () => {
    const cubeChange = activityById('grade-4/term-2/math/unit-02/basic/task-01/session-01/question-05');
    const cubePosition = activityById('grade-4/term-2/math/unit-02/basic/task-02/session-01/question-08');
    const chickens = activityById('grade-4/term-2/math/unit-09/advanced/task-02/session-01/question-02');
    const cookingSchedule = activityById('grade-4/term-1/math/unit-08/advanced/task-02/session-01/question-07');
    const treeSpacing = activityById('grade-5/term-1/math/unit-07/high/task-01/session-01/question-02');
    const budget = activityById('grade-6/term-2/math/integrated-practice-01/high/task-01/session-01/question-02');
    const suppliesBudget = activityById('grade-4/term-1/math/unit-04/high/task-01/session-01/question-02');
    const fieldArea = activityById('grade-4/term-1/math/unit-09/high/task-01/session-01/question-03');
    const mealBudget = activityById('grade-4/term-2/math/integrated-practice-01/advanced/task-01/session-01/question-02');
    const artBudget = activityById('grade-4/term-2/math/unit-10/high/task-01/session-01/question-02');
    const waterSaving = activityById('grade-6/term-1/math/integrated-practice-02/advanced/task-02/session-01/question-02');
    const waterTarget = activityById('grade-6/term-1/math/integrated-practice-02/high/task-01/session-01/question-02');
    const cylinderBase = activityById('grade-6/term-2/math/unit-03/advanced/task-01/session-01/question-02');
    const cylinderSurface = activityById('grade-6/term-2/math/unit-03/advanced/task-01/session-01/question-03');
    const bucketVolume = activityById('grade-6/term-2/math/unit-06/high/task-01/session-01/question-02');
    const sportsVotes = activityById('grade-2/term-2/math/unit-01/advanced/task-02/session-01/question-02');
    const readingVotes = activityById('grade-2/term-2/math/unit-01/high/task-01/session-01/question-02');
    const seating = activityById('grade-2/term-2/math/unit-06/high/task-02/session-01/question-02');
    const shapeReason = activityById('grade-2/term-2/math/unit-09/advanced/task-01/session-01/question-02');

    expect(cubeChange.prompt).toContain('左、中、右三摞原来分别高1、2、1格');
    expect(cubePosition.prompt).toContain('甲2、1、1格，乙1、2、1格，丙1、1、2格');
    expect(chickens.prompt).toContain('比实际多10条');
    expect(chickens.kind).toBe('choice');
    if (chickens.kind === 'choice') {
      expect(chickens.options.find(({ id }) => id === chickens.correctOptionId)?.label).toBe('5');
      expect(chickens.explanation).toContain('10÷2=5');
    }
    expect(cookingSchedule.prompt).toContain('每道菜需4分钟');
    expect(treeSpacing.prompt).toContain('一条72米的直路');
    expect(budget.prompt).toContain('原价200元打八折');
    expect(budget.prompt).toContain('袜子40元');
    expect(budget.kind).toBe('choice');
    if (budget.kind === 'choice') {
      expect(budget.options.find(({ id }) => id === budget.correctOptionId)?.label).toContain('超出10元');
      expect(budget.explanation).toContain('共200元');
    }

    expect(suppliesBudget.prompt).toContain('24盒彩笔（每盒135元）和16本画册（每本28元）');
    expect(fieldArea.prompt).toContain('30,000平方米');
    expect(mealBudget.prompt).toContain('米饭2元、青菜两份每份3元、豆腐4元');
    expect(mealBudget.kind).toBe('choice');
    if (mealBudget.kind === 'choice') expect(mealBudget.options.find(({ id }) => id === mealBudget.correctOptionId)?.label).toBe('4');
    expect(artBudget.prompt).toContain('8盒彩纸（每盒7.5元）');
    expect(artBudget.prompt).toContain('一把12元的剪刀');
    expect(waterSaving.prompt).toContain('B家庭原用水300升，节约20%');
    expect(waterTarget.prompt).toContain('目标周用水量最多560升');
    expect(cylinderBase.prompt).toContain('底面半径2厘米');
    expect(cylinderBase.kind).toBe('arithmetic');
    if (cylinderBase.kind === 'arithmetic') expect(cylinderBase.correctAnswer).toBe(25.12);
    expect(cylinderSurface.prompt).toContain('高5厘米');
    expect(cylinderSurface.kind).toBe('arithmetic');
    if (cylinderSurface.kind === 'arithmetic') expect(cylinderSurface.correctAnswer).toBe(87.92);
    expect(bucketVolume.prompt).toContain('底面积为500平方厘米，水深20厘米');
    expect(sportsVotes.prompt).toContain('跳绳8票、跑步6票、拍球5票');
    expect(readingVotes.prompt).toContain('童话10票、科普8票、诗歌6票');
    expect(seating.prompt).toContain('37名伙伴乘车，每辆车最多坐8人');
    expect(seating.prompt).toContain('坐满4辆后还剩5人');
    expect(shapeReason.prompt).toContain('甲拿圆形，乙不拿方形');
  });

  it('assigns differences and changes to the grade-four bar chart topic, not the mean', () => {
    const sourceTopics = curriculum.units['grade-4/term-2/math/unit-08'].sourceTopics;

    expect(sourceTopics[0]?.split('；')[0]).toBe('平均数表示一组数据的总体水平');
    expect(sourceTopics[0]?.split('；')[1]).toContain('条形统计图比较数据之间的差异和变化');
    expect(sourceTopics.some((topic) => topic.includes('条形统计图') && topic.includes('差异和变化'))).toBe(true);
  });

  it('uses a distinct scene-reading target in the second grade-five Chinese task', () => {
    const activity = activityById('grade-5/term-1/chinese/unit-01/basic/task-02/session-01/question-01');

    expect(activity.kind).toBe('choice');
    expect(activity.prompt).toContain('水田');
    expect(activity.prompt).toContain('枝头');
    expect(activity.prompt).toContain('黄昏');
  });

  it('preserves the two money steps in the grade-five Chinese reading sequence', () => {
    const activity = activityById('grade-5/term-1/chinese/unit-06/basic/task-01/session-01/question-08');

    expect(activity.kind).toBe('order');
    if (activity.kind === 'order') {
      const ordered = activity.correctOrder.map((id) => activity.items.find(({ id: itemId }) => itemId === id)?.label ?? '');
      expect(ordered).toEqual([
        '孩子渴望买《青年近卫军》',
        '母亲第一次给钱后，孩子买了水果罐头',
        '母亲数落后又凑钱支持孩子买书',
        '孩子买到书后继续阅读',
      ]);
    }
  });

  it('puts tuition fundraising before the exam and quilt mending after admission', () => {
    const activity = activityById('grade-5/term-1/chinese/unit-06/basic/task-02/session-01/question-08');

    expect(activity.kind).toBe('order');
    if (activity.kind === 'order') {
      const ordered = activity.correctOrder.map((id) => activity.items.find(({ id: itemId }) => itemId === id)?.label ?? '');
      expect(ordered).toEqual([
        '父亲制作玩具、带孩子逛庙会',
        '父亲卖掉家中物品筹学费',
        '父亲陪孩子乘船送考',
        '考取后，父亲陪孩子去学校并缝补棉被',
      ]);
    }
  });

  it('matches the grade-four observation explanation to all four classifications', () => {
    const activity = activityById('grade-4/term-1/chinese/unit-03/advanced/task-01/session-01/question-03');

    expect(activity.kind).toBe('categorize');
    expect(activity.explanation).toContain('前两项都记录3片叶子');
    expect(activity.explanation).toContain('周三数量变为4片');
    expect(activity.explanation).not.toContain('前三项');
  });

  it('keeps character actions within the grade-five textbook excerpt', () => {
    const pairActivity = activityById('grade-5/term-2/chinese/unit-02/advanced/task-02/session-01/question-04');
    const categoryActivity = activityById('grade-5/term-2/chinese/unit-02/advanced/task-02/session-01/question-05');

    expect(pairActivity.kind).toBe('match');
    expect(pairActivity.kind === 'match' ? pairActivity.pairs.map(({ right }) => right).join(' ') : '')
      .not.toContain('松开线轴让风筝飞远');
    expect(categoryActivity.kind).toBe('categorize');
    expect(categoryActivity.kind === 'categorize'
      ? categoryActivity.items.map(({ label }) => label).join(' ')
      : '').not.toContain('黛玉松开线轴让风筝飞走');
  });

  it('does not call a 270-degree clockwise route the shorter route', () => {
    const activity = activityById('grade-5/term-2/math/unit-05/high/task-01/session-01/question-05');

    expect(activity.kind).toBe('order');
    expect(activity.prompt).not.toContain('较短');
    expect(activity.explanation).toContain('270°');
  });

  it('asks for final position change when a full turn is keyed as zero degrees', () => {
    const activity = activityById('grade-5/term-2/math/unit-05/high/task-02/session-01/question-08');

    expect(activity.kind).toBe('choice');
    expect(activity.prompt).toContain('最终位置变化');
    if (activity.kind === 'choice') {
      expect(activity.options.find(({ id }) => id === activity.correctOptionId)?.label).toBe('0');
    }
  });

  it('specifies that the remaining colored part is red before subtracting the fractions', () => {
    const activity = activityById('grade-5/term-2/math/unit-06/advanced/task-01/session-01/question-06');

    expect(activity.kind).toBe('arithmetic');
    expect(activity.prompt).toContain('其余涂色部分都涂红色');
    if (activity.kind === 'arithmetic') expect(activity.correctAnswer).toBe(3);
  });

  it('explains the false fraction addition as incorrect without contradicting the category key', () => {
    const activity = activityById('grade-5/term-2/math/unit-06/high/task-02/session-01/question-04');

    expect(activity.kind).toBe('categorize');
    if (activity.kind === 'categorize') {
      const falseEquation = activity.items.find(({ label }) => label === '1/3+1/6=2/9');
      const category = activity.categories.find(({ id }) => id === falseEquation?.categoryId);
      expect(category?.label).toBe('错误');
      expect(activity.explanation).not.toContain('前三个数学规则正确');
      expect(activity.explanation).toContain('1/3+1/6=1/2');
    }
  });

  it('asks the pigeonhole principle guarantee for at least one category', () => {
    const activity = activityById('grade-6/term-2/math/unit-05/advanced/task-01/session-01/question-08');

    expect(activity.prompt).toContain('至少有一个类别');
  });

  it('classifies division by two separately from multiplying by one-half', () => {
    const activity = activityById('grade-6/term-1/math/unit-03/basic/task-02/session-01/question-07');

    expect(activity.kind).toBe('categorize');
    if (activity.kind === 'categorize') {
      expect(activity.categories.map(({ label }) => label)).toEqual([
        '除以2（可改写成乘1/2）',
        '其他算式',
      ]);
      const expression = activity.items.find(({ label }) => label === '4/7×1/2');
      const category = activity.categories.find(({ id }) => id === expression?.categoryId);
      expect(category?.label).toBe('其他算式');
    }
  });

  it('explains the complete 5-by-5 to 6-by-6 border count as 11 new cells', () => {
    const activity = activityById('grade-6/term-1/math/unit-08/basic/task-02/session-01/question-07');

    expect(activity.kind).toBe('choice');
    expect(activity.explanation).toContain('36−25=11');
    expect(activity.explanation).not.toContain('新增一行5格和新增一列6格');
  });

  it('pairs the triangular sequence with its next increase of five', () => {
    const match = activityById('grade-6/term-1/math/unit-08/advanced/task-02/session-01/question-04');
    const categories = activityById('grade-6/term-1/math/unit-08/advanced/task-02/session-01/question-05');

    expect(match.kind).toBe('match');
    if (match.kind === 'match') {
      expect(match.pairs.find(({ left }) => left === '1、3、6、10')?.right).toBe('5');
    }
    expect(categories.explanation).toContain('第1、3个数列');
    expect(categories.explanation).toContain('第2、4个数列');
  });

  it('requires two congruent triangles for the parallelogram composition', () => {
    const activity = activityById('grade-5/term-1/math/unit-08/high/task-01/session-01/question-05');

    expect(activity.kind).toBe('match');
    if (activity.kind === 'match') {
      expect(activity.pairs.find(({ left }) => left.includes('三角形'))?.left).toContain('完全相同');
    }
    expect(activity.explanation).toContain('完全相同的三角形');
  });

  it('states the whole length in the grade-five fraction remainder scenario', () => {
    const activity = activityById('grade-5/term-2/math/unit-06/advanced/task-01/session-01/question-05');

    expect(activity.kind).toBe('match');
    if (activity.kind === 'match') {
      expect(activity.pairs.find(({ left }) => left.includes('用掉1/2米'))?.left).toContain('1米长');
    }
  });

  it('keeps the grade-four term-two review within that textbook scope', () => {
    const ids = [
      'grade-4/term-2/math/unit-10/advanced/task-02/session-01/question-01',
      'grade-4/term-2/math/unit-10/advanced/task-02/session-01/question-05',
      'grade-4/term-2/math/unit-10/high/task-01/session-01/question-06',
      'grade-4/term-2/math/unit-10/high/task-02/session-01/question-05',
    ];

    for (const id of ids) {
      const activity = activityById(id);
      expect(JSON.stringify(activity)).not.toContain('平行四边形');
    }
  });

  it('uses the response to thanks for the second grade-two holiday dialogue', () => {
    const activity = activityById('grade-2/term-1/english/unit-06/basic/task-02/session-01/question-06');

    expect(activity.kind).toBe('choice');
    if (activity.kind === 'choice') {
      expect(activity.options.find(({ id }) => id === activity.correctOptionId)?.label).toBe('You are welcome.');
    }
  });

  it('keeps English targets and plausible responses in generated high-tier questions', () => {
    const activities = [
      activityById('grade-2/term-1/english/unit-06/high/task-02/session-01/question-01'),
      activityById('grade-2/term-1/english/unit-06/high/task-02/session-01/question-02'),
      activityById('grade-2/term-1/english/unit-06/high/task-02/session-01/question-05'),
      activityById('grade-2/term-1/english/unit-06/high/task-02/session-01/question-06'),
    ];

    for (const activity of activities) {
      expect(activity.kind).toBe('choice');
      if (activity.kind !== 'choice') continue;
      const correct = activity.options.find(({ id }) => id === activity.correctOptionId)?.label ?? '';
      expect(correct).toMatch(/[a-z]/i);
      expect(correct).not.toContain('依据是');
      expect(correct).not.toContain('逐题圈出');
      expect(correct).not.toContain('不读题目');
    }
  });

  it('shows currency units in generated high-tier money questions', () => {
    for (const task of ['01', '02']) {
      const activity = activityById(`grade-1/term-2/math/unit-05/high/task-${task}/session-01/question-04`);
      expect(activity.prompt).toContain('角');
      expect(activity.explanation).toContain('角');
    }
  });

  it('describes the grade-two willow scene without saying the sister rides the branch', () => {
    const activity = activityById('grade-2/term-2/chinese/unit-02/advanced/task-02/session-01/question-05');

    expect(activity.kind).toBe('choice');
    expect(activity.kind).toBe('choice');
    if (activity.kind === 'choice') {
      expect(activity.options.find(({ id }) => id === activity.correctOptionId)?.label).toContain('把柳条当作马');
      expect(activity.options.find(({ id }) => id === activity.correctOptionId)?.label).toContain('自己跑回家');
    }
    expect(activity.explanation).not.toContain('骑着回家');
  });

  it('orders the second grade-one pinyin task by its answer key, not the scrambled card order', () => {
    const activity = activityById('grade-1/term-1/chinese/unit-02/basic/task-02/session-01/question-05');

    expect(activity.kind).toBe('order');
    if (activity.kind === 'order') {
      const ordered = activity.correctOrder.map((id) => activity.items.find(({ id: itemId }) => itemId === id)?.label ?? '');
      expect(ordered).toEqual([
        '认清音节 pa 的声母 p',
        '找到和它相拼的单韵母 a',
        '按要求给 a 标上第四声',
        '读出 pà 并核对调号',
      ]);
    }
  });

  it('gives the second basic Chinese task a checking objective instead of repeating the first task scenario', () => {
    const firstTask = activityById('grade-1/term-2/chinese/unit-05/basic/task-01/session-01/question-06');
    const secondTask = activityById('grade-1/term-2/chinese/unit-05/basic/task-02/session-01/question-06');

    expect(firstTask.prompt).not.toBe(secondTask.prompt);
    expect(secondTask.prompt).toContain('哪条记录最有用');
    expect(secondTask.explanation).toContain('记录具体线索和处理结果');
  });

  it('uses one category name when both grade-three Chinese terms share a category', () => {
    const activity = activityById('grade-3/term-2/chinese/unit-08/advanced/task-02/session-01/question-08');

    expect(activity.explanation).toContain('“结局”符合“情节变化”');
    expect(activity.explanation).toContain('“开端”符合“故事顺序”');
  });

  it('classifies the tree-spacing case with both endpoints empty as unequal', () => {
    const activity = activityById('grade-5/term-1/math/unit-07/basic/task-02/session-01/question-06');

    expect(activity.kind).toBe('categorize');
    if (activity.kind === 'categorize') {
      const item = activity.items.find(({ label }) => label === '直线两端都不栽树');
      const category = activity.categories.find(({ id }) => id === item?.categoryId);
      expect(category?.label).toBe('不相等');
      expect(activity.explanation).toContain('两端都不栽时间隔数比棵数多1');
    }
  });

  it('uses a two-step equation form that matches the grade-five equation method', () => {
    const activity = activityById('grade-5/term-1/math/unit-05/advanced/task-01/session-01/question-04');

    expect(activity.prompt).toContain('2x+12=40');
    expect(activity.prompt).not.toContain('40−2x=12');
  });

  it('classifies the more numerous blue outcome as more likely', () => {
    const activity = allActivities().find((candidate) => candidate.id.startsWith('grade-5/term-1/math/unit-04/')
      && candidate.kind === 'categorize'
      && candidate.items.some(({ label }) => label === '红1颗、蓝5颗：摸蓝球'));

    expect(activity).toBeDefined();
    if (!activity || activity.kind !== 'categorize') return;
    expect(activity.kind).toBe('categorize');
    if (activity.kind === 'categorize') {
      const item = activity.items.find(({ label }) => label.includes('红1颗、蓝5颗'));
      expect(item?.label).toContain('摸蓝球');
      const category = activity.categories.find(({ id }) => id === item?.categoryId);
      expect(category?.label).toBe('更容易');
    }
  });

  it('does not call a two-column grade-four block model a three-column model', () => {
    const activity = activityById('grade-4/term-2/math/unit-02/high/task-01/session-01/question-08');

    expect(activity.prompt).toContain('左、右两列');
    expect(activity.prompt).not.toContain('左中右三列');
  });

  it('reconciles the grade-four symmetry transformation with its keyed position', () => {
    const activity = activityById('grade-4/term-2/math/unit-07/high/task-01/session-01/question-06');

    expect(activity.kind).toBe('match');
    if (activity.kind === 'match') {
      const pair = activity.pairs.find(({ left }) => left.includes('轴左侧4格的点'));
      expect(pair?.left).toContain('向左平移6格');
      expect(pair?.right).toBe('轴左侧2格');
    }
  });

  it('uses an exact count for the grade-six 95 percent explanation', () => {
    const activity = allActivities().find((candidate) => candidate.id.startsWith('grade-6/term-1/math/unit-06/')
      && candidate.prompt.includes('合格率95%'));

    expect(activity).toBeDefined();
    if (!activity) return;
    expect(activity.explanation).toContain('占参加检测人数的95/100');
    expect(activity.explanation).not.toContain('约占');
  });

  it('states equal worker efficiency in the grade-six inverse-proportion problem', () => {
    const activity = allActivities().find((candidate) => candidate.id.startsWith('grade-6/term-2/math/unit-06/')
      && candidate.prompt.includes('效率相同'));

    expect(activity).toBeDefined();
    if (!activity) return;
    expect(activity.prompt).toContain('效率相同');
    expect(activity.explanation).toContain('24人天');
  });

  it('uses categorization instead of duplicate matching targets for the grade-one pinyin supplement', () => {
    const activity = activityById('grade-1/term-1/chinese/unit-03/basic/task-01/session-01/question-03');

    expect(activity.kind).toBe('categorize');
    if (activity.kind === 'categorize') {
      expect(activity.categories.map(({ label }) => label)).toEqual(['韵母', '整体认读音节']);
      expect(activity.items).toHaveLength(2);
      const categoryIds = new Set(activity.categories.map(({ id }) => id));
      expect(activity.items.every(({ categoryId }) => categoryIds.has(categoryId))).toBe(true);
    }
  });

  it('defines minute as a time unit in grade-one daily-life Chinese vocabulary', () => {
    const unit = curriculum.units['grade-1/term-2/chinese/unit-07'];
    const explanations = Object.values(unit.difficultyTracks)
      .flatMap(({ tasks }) => tasks)
      .flatMap(({ sessions }) => sessions)
      .flatMap(({ activities }) => activities.map(({ explanation }) => explanation));

    expect(explanations.some((explanation) => explanation.includes('分钟') && explanation.includes('表示时间的单位'))).toBe(true);
  });

  it('keeps the original grade-one English requirement in a repair prompt', () => {
    const activity = activityById('grade-1/term-1/english/unit-02/basic/task-02/session-01/question-04');

    expect(activity.prompt).toContain('题目要求：');
    expect(activity.prompt).toContain('这是我的眼睛');
    expect(activity.prompt).toContain('同伴选了');
  });

  it('uses error checking for the second English task vocabulary match', () => {
    const firstTask = activityById('grade-2/term-1/english/unit-01/basic/task-01/session-01/question-03');
    const secondTask = activityById('grade-2/term-1/english/unit-01/basic/task-02/session-01/question-03');

    expect(firstTask.kind).toBe('match');
    expect(secondTask.kind).toBe('choice');
    expect(secondTask.prompt).toContain('同伴把词卡');
    expect(secondTask.explanation).toContain('对应');
  });

  it('uses paired word meanings and response purposes in high-tier English items', () => {
    const unit = curriculum.units['grade-6/term-1/english/unit-01'];
    const highTask = unit?.difficultyTracks.high?.tasks[0];
    const questions = highTask?.sessions.flatMap(({ activities }) => activities) ?? [];

    expect(questions[0]?.prompt).toContain('两条记录');
    expect(questions[0]?.prompt).toContain('同时符合两题');
    expect(questions[4]?.prompt).toContain('两条记录');
    expect(questions[4]?.explanation).toContain('A应为');
    expect(questions[4]?.explanation).toContain('B应为');
  });

  it('uses nested Chinese quotation marks correctly throughout English questions', () => {
    const englishActivities = Object.entries(curriculum.units)
      .filter(([, unit]) => unit.subject === 'english')
      .flatMap(([, unit]) => Object.values(unit.difficultyTracks))
      .flatMap(({ tasks }) => tasks)
      .flatMap(({ sessions }) => sessions)
      .flatMap(({ activities }) => activities);
    const questionText = englishActivities.flatMap((activity) => {
      const values = [activity.prompt, activity.hint, activity.explanation];
      if (activity.kind === 'choice') values.push(...activity.options.map(({ label }) => label));
      if (activity.kind === 'match') values.push(...activity.pairs.flatMap(({ left, right }) => [left, right]));
      if (activity.kind === 'order') values.push(...activity.items.map(({ label }) => label));
      if (activity.kind === 'categorize') {
        values.push(...activity.categories.map(({ label }) => label), ...activity.items.map(({ label }) => label));
      }
      return values;
    });
    const nestedQuotes = questionText.filter((value) => /“[^”]*“/.test(value));
    const unbalancedQuotes = questionText.filter((value) => {
      const opening = (value.match(/“/gu) ?? []).length;
      const closing = (value.match(/”/gu) ?? []).length;
      return opening !== closing;
    });

    expect(nestedQuotes.slice(0, 5), `found ${nestedQuotes.length} strings with nested opening quotes`).toEqual([]);
    expect(unbalancedQuotes.slice(0, 5), `found ${unbalancedQuotes.length} strings with unbalanced Chinese quotation marks`).toEqual([]);
  });

  it('calls numeric clock cards time cards rather than vocabulary words', () => {
    const unit = curriculum.units['grade-2/term-2/english/unit-04'];
    const activities = Object.values(unit.difficultyTracks)
      .flatMap(({ tasks }) => tasks)
      .flatMap(({ sessions }) => sessions)
      .flatMap(({ activities: sessionActivities }) => sessionActivities);

    for (const activity of activities) {
      const text = `${activity.prompt} ${activity.hint} ${activity.explanation}`;
      expect(text).not.toContain('词卡');
      expect(text).not.toContain('英文词卡');
    }

    expect(activityById('grade-2/term-2/english/unit-04/basic/task-01/session-01/question-01').prompt).toContain('表示几点');
    expect(activityById('grade-2/term-2/english/unit-04/basic/task-01/session-01/question-04').prompt).toContain('表示几点');
  });

  it('uses an actual two-step expression in the grade-two mixed-operation task', () => {
    const activity = activityById('grade-2/term-1/math/unit-02/advanced/task-01/session-01/question-01');

    expect(activity.kind).toBe('arithmetic');
    if (activity.kind === 'arithmetic') {
      expect(activity.expression).toBe('28 + 19 - 16');
      expect(activity.correctAnswer).toBe(31);
    }
  });

  it('covers multiplication by tens and hundreds in the grade-three multiplication unit', () => {
    const tens = activityById('grade-3/term-1/math/unit-06/basic/task-01/session-01/question-01');
    const hundreds = activityById('grade-3/term-1/math/unit-06/basic/task-01/session-01/question-02');

    expect(tens.kind).toBe('arithmetic');
    expect(hundreds.kind).toBe('arithmetic');
    if (tens.kind === 'arithmetic') expect(tens.expression).toMatch(/(?:10|20|30|40|50|60|70|80|90) × [2-9]/);
    if (hundreds.kind === 'arithmetic') expect(hundreds.expression).toMatch(/(?:100|200|300|400|500|600|700|800) × [2-9]/);
  });

  it('rounds the grade-five decimal product to the requested place', () => {
    const activity = activityById('grade-5/term-1/math/unit-01/advanced/task-01/session-01/question-05');

    expect(activity.kind).toBe('arithmetic');
    if (activity.kind === 'arithmetic') {
      expect(activity.prompt).toContain('得数保留一位小数');
      expect(activity.expression).toBe('0.076 × 28');
      expect(activity.correctAnswer).toBe(2.1);
      expect(activity.explanation).toContain('2.128');
      expect(activity.explanation).toContain('得2.1');
    }
  });

  it('labels the answer unit in a grade-three elapsed-time difference', () => {
    const activity = activityById('grade-3/term-1/math/unit-01/high/task-01/session-01/question-08');

    expect(activity.kind).toBe('choice');
    if (activity.kind === 'choice') {
      expect(activity.options.every(({ label }) => label.endsWith('分钟'))).toBe(true);
    }
  });

  it('includes price and payment before asking how to check grade-one change', () => {
    const activity = activityById('grade-1/term-2/math/unit-05/advanced/task-01/session-01/question-08');

    expect(activity.prompt).toContain('标价');
    expect(activity.prompt).toContain('顾客付');
    expect(activity.prompt).toContain('找回');
  });

  it('does not expose an unexpanded placeholder in grade-three set reasoning', () => {
    const activity = activityById('grade-3/term-1/math/unit-09/high/task-01/session-01/question-08');

    expect(activity.kind).toBe('choice');
    expect(activity.prompt).not.toContain('${both}');
    if (activity.kind === 'choice') expect(activity.options.every(({ label }) => !label.includes('${both}'))).toBe(true);
  });

  it('keeps the revised grade-two basic task aligned to story evidence and feelings', () => {
    const sequence = activityById('grade-2/term-1/chinese/unit-03/basic/task-02/session-01/question-03');
    const classification = activityById('grade-2/term-1/chinese/unit-03/basic/task-02/session-01/question-04');
    const evidence = activityById('grade-2/term-1/chinese/unit-03/basic/task-02/session-01/question-07');

    expect(sequence.kind).toBe('order');
    expect(sequence.prompt).toContain('人物行动');
    expect(classification.kind).toBe('categorize');
    expect(classification.prompt).toContain('故事明确写到的事');
    expect(evidence.kind).toBe('choice');
    expect(evidence.prompt).toContain('故事线索支持');
  });

  it.each([
    ['grade-4/term-1/english/unit-01/advanced/task-02/session-01/question-08', 'I often play basketball.'],
    ['grade-4/term-1/english/unit-06/basic/task-02/session-01/question-08', 'What do you want to be in the future?'],
    ['grade-4/term-2/english/unit-01/advanced/task-02/session-01/question-08', 'The cinema is across from the school.'],
    ['grade-4/term-2/english/unit-03/advanced/task-01/session-01/question-08', 'What do you want to do there?'],
    ['grade-4/term-2/english/unit-03/high/task-01/session-01/question-08', 'They go to Thailand by plane.'],
  ])('uses the corrected English word order for %s', (questionId, expectedSentence) => {
    const activity = activityById(questionId);

    expect(activity.kind).toBe('order');
    if (activity.kind === 'order') {
      expect(activity.correctOrder.map((id) => activity.items.find(({ id: itemId }) => itemId === id)?.label).join(' ')
        .replace(/ ([?.!,])/g, '$1')).toBe(expectedSentence);
    }
  });

  it('uses the correct order for the grade-four safety reminder', () => {
    const activity = allActivities().find((candidate) => candidate.kind === 'order'
      && candidate.items.some(({ label }) => label === "Don't")
      && candidate.items.some(({ label }) => label === 'window.'));

    expect(activity).toBeDefined();
    if (activity?.kind === 'order') {
      expect(activity.correctOrder.map((id) => activity.items.find(({ id: itemId }) => itemId === id)?.label).join(' ')
        .replace(/ ([?.!,])/g, '$1')).toBe("Don't throw things out of the window.");
    }
  });
});
