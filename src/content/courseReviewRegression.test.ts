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
    expect(secondTask.explanation).toContain('表示');
  });

  it('adds evidence checking to high-tier English vocabulary and sentence items', () => {
    const unit = curriculum.units['grade-6/term-1/english/unit-01'];
    const highTask = unit?.difficultyTracks.high?.tasks[0];
    const questions = highTask?.sessions.flatMap(({ activities }) => activities) ?? [];

    expect(questions[0]?.prompt).toContain('核对词卡记录');
    expect(questions[4]?.prompt).toContain('同时符合题意并给出核对理由');
    expect(questions[0]?.explanation).toContain('逐项核对');
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
