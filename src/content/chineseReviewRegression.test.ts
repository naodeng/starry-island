import { describe, expect, it } from 'vitest';
import { curriculum } from './curriculum';
import { unit as grade1Term2ChineseUnit01 } from './grade-1/term-2/chinese/unit-01';
import { unit as grade2Term1ChineseUnit01 } from './grade-2/term-1/chinese/unit-01';
import { unit as grade2Term1ChineseUnit02 } from './grade-2/term-1/chinese/unit-02';
import { unit as grade2Term1ChineseUnit06 } from './grade-2/term-1/chinese/unit-06';
import { unit as grade2Term1ChineseUnit05 } from './grade-2/term-1/chinese/unit-05';
import { unit as grade2Term1ChineseUnit07 } from './grade-2/term-1/chinese/unit-07';
import { unit as grade2Term1ChineseUnit08 } from './grade-2/term-1/chinese/unit-08';
import { unit as grade2Term2ChineseUnit04 } from './grade-2/term-2/chinese/unit-04';
import { unit as grade2Term2ChineseUnit05 } from './grade-2/term-2/chinese/unit-05';
import { unit as grade2Term2ChineseUnit06 } from './grade-2/term-2/chinese/unit-06';
import { unit as grade2Term2ChineseUnit08 } from './grade-2/term-2/chinese/unit-08';
import { unit as grade3Term1ChineseUnit01 } from './grade-3/term-1/chinese/unit-01';
import { unit as grade3Term1ChineseUnit02 } from './grade-3/term-1/chinese/unit-02';
import { unit as grade2Term2ChineseUnit01 } from './grade-2/term-2/chinese/unit-01';
import { unit as grade2Term2ChineseUnit02 } from './grade-2/term-2/chinese/unit-02';
import { unit as grade5Term2ChineseUnit01 } from './grade-5/term-2/chinese/unit-01';
import { unit as grade5Term2ChineseUnit02 } from './grade-5/term-2/chinese/unit-02';
import { unit as grade5Term2ChineseUnit04 } from './grade-5/term-2/chinese/unit-04';
import { unit as grade5Term2ChineseUnit05 } from './grade-5/term-2/chinese/unit-05';
import { unit as grade5Term2ChineseUnit06 } from './grade-5/term-2/chinese/unit-06';
import { unit as grade5Term2ChineseUnit07 } from './grade-5/term-2/chinese/unit-07';
import { unit as grade5Term2ChineseUnit08 } from './grade-5/term-2/chinese/unit-08';
import { unit as grade5Term2ChineseIntegratedPractice01 } from './grade-5/term-2/chinese/integrated-practice-01';
import { unit as grade5Term1ChineseUnit01 } from './grade-5/term-1/chinese/unit-01';
import { unit as grade5Term1ChineseUnit05 } from './grade-5/term-1/chinese/unit-05';
import { unit as grade5Term1ChineseUnit07 } from './grade-5/term-1/chinese/unit-07';
import { unit as grade5Term1ChineseUnit08 } from './grade-5/term-1/chinese/unit-08';
import { unit as grade4Term1ChineseUnit01 } from './grade-4/term-1/chinese/unit-01';
import { unit as grade4Term1ChineseUnit02 } from './grade-4/term-1/chinese/unit-02';
import { unit as grade4Term1ChineseUnit03 } from './grade-4/term-1/chinese/unit-03';
import { unit as grade4Term1ChineseUnit05 } from './grade-4/term-1/chinese/unit-05';
import { unit as grade4Term1ChineseUnit06 } from './grade-4/term-1/chinese/unit-06';
import { unit as grade4Term1ChineseUnit08 } from './grade-4/term-1/chinese/unit-08';
import { unit as grade4Term2ChineseUnit01 } from './grade-4/term-2/chinese/unit-01';
import { unit as grade4Term2ChineseUnit02 } from './grade-4/term-2/chinese/unit-02';
import { unit as grade4Term2ChineseUnit03 } from './grade-4/term-2/chinese/unit-03';
import { unit as grade4Term2ChineseUnit04 } from './grade-4/term-2/chinese/unit-04';
import { unit as grade4Term2ChineseUnit05 } from './grade-4/term-2/chinese/unit-05';
import { unit as grade4Term2ChineseUnit06 } from './grade-4/term-2/chinese/unit-06';
import { unit as grade4Term2ChineseUnit07 } from './grade-4/term-2/chinese/unit-07';
import { unit as grade4Term2ChineseUnit08 } from './grade-4/term-2/chinese/unit-08';
import { unit as grade6Term1ChineseUnit01 } from './grade-6/term-1/chinese/unit-01';
import { unit as grade6Term1ChineseUnit02 } from './grade-6/term-1/chinese/unit-02';
import { unit as grade6Term1ChineseUnit03 } from './grade-6/term-1/chinese/unit-03';
import { unit as grade6Term1ChineseUnit04 } from './grade-6/term-1/chinese/unit-04';
import { unit as grade6Term1ChineseUnit05 } from './grade-6/term-1/chinese/unit-05';
import { unit as grade6Term1ChineseUnit07 } from './grade-6/term-1/chinese/unit-07';
import { unit as grade6Term1ChineseUnit08 } from './grade-6/term-1/chinese/unit-08';
import { unit as grade6Term2ChineseIntegratedPractice01 } from './grade-6/term-2/chinese/integrated-practice-01';
import { unit as grade6Term2ChineseUnit01 } from './grade-6/term-2/chinese/unit-01';
import { unit as grade6Term2ChineseUnit02 } from './grade-6/term-2/chinese/unit-02';
import { unit as grade6Term2ChineseUnit03 } from './grade-6/term-2/chinese/unit-03';
import { unit as grade6Term2ChineseUnit04 } from './grade-6/term-2/chinese/unit-04';
import { unit as grade6Term2ChineseUnit05 } from './grade-6/term-2/chinese/unit-05';
import { unit as grade6Term2ChineseUnit06 } from './grade-6/term-2/chinese/unit-06';

describe('Chinese course review regressions', () => {
  it('keys the Grade 4 Huang Jiguang and Qian Xuesen comparison to the supported claim', () => {
    const activity = grade4Term2ChineseUnit07.difficultyTracks.advanced.tasks[0]!.sessions[0]!.activities[6]!;

    expect(activity.kind).toBe('choice');
    if (activity.kind !== 'choice') return;

    expect(activity.options.find((option) => option.id === activity.correctOptionId)?.label)
      .toBe('两人都在困难面前坚持目标，但一个执行战斗任务，一个克服阻力坚持回国');
    expect(activity.hint).toContain('分别关注黄继光面对的战斗任务和钱学森回国受阻的经历');
    expect(activity.explanation).toContain('两人的处境和行动不同');
  });

  it('keeps Grade 4 fairy-tale explanations, reading order, and bookmark classification self-contained', () => {
    const storyCategories = grade4Term2ChineseUnit08.difficultyTracks.basic.tasks[0]!.sessions[0]!.activities[2]!;
    const readingOrder = grade4Term2ChineseUnit08.difficultyTracks.basic.tasks[0]!.sessions[0]!.activities[7]!;
    const bookmark = grade4Term2ChineseUnit08.difficultyTracks.high.tasks[1]!.sessions[0]!.activities[4]!;

    expect(storyCategories.kind).toBe('categorize');
    if (storyCategories.kind === 'categorize') {
      expect(storyCategories.explanation).toContain('大向日葵和常想自己有宝葫芦');
      expect(storyCategories.explanation).not.toContain('水蜜桃');
    }

    expect(readingOrder.kind).toBe('order');
    if (readingOrder.kind === 'order') {
      expect(readingOrder.prompt).toContain('先回看故事来源、再找具体愿望、最后联系作答');
      expect(readingOrder.correctOrder.map((id) => readingOrder.items.find((item) => item.id === id)?.label)).toEqual([
        '回看奶奶讲的宝葫芦故事有什么特点',
        '找出王葆想要的东西',
        '把故事特点和王葆的愿望联系起来',
        '用自己的话回答，并说明这是节选支持的理解',
      ]);
    }

    expect(bookmark.kind).toBe('categorize');
    if (bookmark.kind === 'categorize') {
      expect(bookmark.items.find((item) => item.label.includes('没有按本页要求写格言'))?.categoryId)
        .toBe(bookmark.categories.find((category) => category.label === '与本页提示无关')?.id);
    }
  });

  it('makes the Grade 5 treasured-object revision request one concrete action', () => {
    const activity = grade5Term1ChineseUnit01.difficultyTracks.high.tasks[1]!.sessions[0]!.activities[6]!;

    expect(activity.kind).toBe('choice');
    if (activity.kind !== 'choice') return;

    expect(activity.options.find((option) => option.id === activity.correctOptionId)?.label)
      .toBe('讲述一件与木盒有关的具体经历，说明它为什么对自己有意义');
    expect(activity.hint).toContain('用一件具体经历');
    expect(activity.explanation).toContain('具体经历能解释木盒珍贵的原因');
    expect(activity.options.find((option) => option.id === activity.correctOptionId)?.label).not.toContain('或');
  });

  it('gives Grade 5 information-writing questions one determinate correction action', () => {
    const concreteMeasure = grade5Term1ChineseUnit05.difficultyTracks.high.tasks[1]!.sessions[0]!.activities[2]!;
    const conflictingSources = grade5Term1ChineseUnit05.difficultyTracks.high.tasks[1]!.sessions[0]!.activities[3]!;

    expect(concreteMeasure.kind).toBe('choice');
    if (concreteMeasure.kind === 'choice') {
      expect(concreteMeasure.options.find((option) => option.id === concreteMeasure.correctOptionId)?.label)
        .toBe('测量物品重量并写明数值和单位');
      expect(concreteMeasure.options.find((option) => option.id === concreteMeasure.correctOptionId)?.label).not.toContain('或');
    }

    expect(conflictingSources.kind).toBe('choice');
    if (conflictingSources.kind === 'choice') {
      expect(conflictingSources.options.find((option) => option.id === conflictingSources.correctOptionId)?.label)
        .toBe('先标记为待核实，暂不把冲突信息写成确定事实');
      expect(conflictingSources.options.find((option) => option.id === conflictingSources.correctOptionId)?.label).not.toContain('或');
    }
  });

  it('covers all four seasons and classifies observed versus inferred details accurately in Grade 5 Unit 7', () => {
    const seasonPairs = grade5Term1ChineseUnit07.difficultyTracks.basic.tasks[0]!.sessions[0]!.activities[3]!;
    const moonClassification = grade5Term1ChineseUnit07.difficultyTracks.advanced.tasks[1]!.sessions[0]!.activities[4]!;
    const evidenceClassification = grade5Term1ChineseUnit07.difficultyTracks.high.tasks[0]!.sessions[0]!.activities[4]!;
    const revision = grade5Term1ChineseUnit07.difficultyTracks.high.tasks[0]!.sessions[0]!.activities[5]!;

    expect(seasonPairs.kind).toBe('match');
    if (seasonPairs.kind === 'match') {
      expect(seasonPairs.pairs.map(({ left, right }) => [left, right])).toEqual([
        ['春天', '黎明'], ['夏天', '夜晚'], ['秋天', '黄昏'], ['冬天', '早晨'],
      ]);
    }

    expect(moonClassification.kind).toBe('categorize');
    if (moonClassification.kind === 'categorize') {
      const childrenImagining = moonClassification.categories.find(({ label }) => label === '孩子的想象')?.id;
      expect(moonClassification.items.find(({ label }) => label === '孩子们争着说月亮属于自己')?.categoryId)
        .toBe(childrenImagining);
      expect(moonClassification.items.some(({ label }) => label === '把月亮说成属于每一个人')).toBe(false);
    }

    expect(evidenceClassification.kind).toBe('categorize');
    if (evidenceClassification.kind === 'categorize') {
      const unsupported = evidenceClassification.categories.find(({ label }) => label === '缺少依据')?.id;
      expect(evidenceClassification.items.find(({ label }) => label === '只看见一片乌云就断定整晚都会下暴雨')?.categoryId)
        .toBe(unsupported);
    }

    expect(revision.kind).toBe('choice');
    if (revision.kind === 'choice') {
      expect(revision.prompt).toContain('怎样修改更具体');
      const answer = revision.options.find(({ id }) => id === revision.correctOptionId)?.label;
      expect(answer).toBe('补写天空颜色、亮起的灯和景物变化等观察细节');
      expect(answer).not.toContain('或');
    }
  });

  it('gives Grade 5 Unit 8 revision prompts one determinate correction action', () => {
    const example = grade5Term1ChineseUnit08.difficultyTracks.high.tasks[0]!.sessions[0]!.activities[1]!;
    const characterEvidence = grade5Term1ChineseUnit08.difficultyTracks.advanced.tasks[1]!.sessions[0]!.activities[7]!;
    const readingEvidence = grade5Term1ChineseUnit08.difficultyTracks.high.tasks[1]!.sessions[0]!.activities[5]!;

    for (const activity of [example, characterEvidence, readingEvidence]) {
      expect(activity.kind).toBe('choice');
      if (activity.kind !== 'choice') continue;
      const answer = activity.options.find(({ id }) => id === activity.correctOptionId)?.label;
      expect(answer).toBeTruthy();
      expect(answer).not.toContain('或');
    }

    expect(example.kind === 'choice' && example.options.find(({ id }) => id === example.correctOptionId)?.label)
      .toBe('举出一个吸引自己的具体情节');
    expect(characterEvidence.kind === 'choice' && characterEvidence.options.find(({ id }) => id === characterEvidence.correctOptionId)?.label)
      .toBe('换成书中能表现该人物勇敢的具体行动');
    expect(readingEvidence.kind === 'choice' && readingEvidence.options.find(({ id }) => id === readingEvidence.correctOptionId)?.label)
      .toBe('换成书中能直接支持该观点的情节');
  });

  it('states the Grade 5 Chinese-character history accurately and makes survey revisions singular', () => {
    const smallSeal = grade5Term2ChineseIntegratedPractice01.difficultyTracks.advanced.tasks[1]!.sessions[0]!.activities[0]!;
    const surveyLocation = grade5Term2ChineseIntegratedPractice01.difficultyTracks.high.tasks[0]!.sessions[0]!.activities[7]!;
    const presentationTrim = grade5Term2ChineseIntegratedPractice01.difficultyTracks.high.tasks[1]!.sessions[0]!.activities[7]!;

    expect(smallSeal.kind).toBe('choice');
    if (smallSeal.kind === 'choice') {
      expect(smallSeal.options.find(({ id }) => id === smallSeal.correctOptionId)?.label)
        .toBe('小篆从战国时期秦国文字发展而来，秦统一后得到推行，成为最早的统一文字。');
      expect(smallSeal.explanation).toContain('从战国时期秦国文字发展而来');
    }

    for (const activity of [surveyLocation, presentationTrim]) {
      expect(activity.kind).toBe('choice');
      if (activity.kind !== 'choice') continue;
      const answer = activity.options.find(({ id }) => id === activity.correctOptionId)?.label;
      expect(answer).toBeTruthy();
      expect(answer).not.toContain('或');
    }

    expect(surveyLocation.kind === 'choice' && surveyLocation.options.find(({ id }) => id === surveyLocation.correctOptionId)?.label)
      .toBe('补写实地查看的具体地点。');
    expect(presentationTrim.kind === 'choice' && presentationTrim.options.find(({ id }) => id === presentationTrim.correctOptionId)?.label)
      .toBe('将字体变化资料精简到一个最能说明活动主题的例子。');
  });

  it('classifies the parade direction as a concrete detail in the Grade 6 ceremony scene', () => {
    const activity = grade6Term1ChineseUnit02.difficultyTracks.advanced.tasks[0]!.sessions[0]!.activities[6]!;

    expect(activity.kind).toBe('categorize');
    if (activity.kind !== 'categorize') return;

    const categories = activity.categories;
    const parade = activity.items.find((item) => item.label === '游行队伍分东西两个方向出发');
    expect(parade?.categoryId).toBe(categories[1]?.id);
  });

  it('matches each Grade 6 hero’s situation with the corresponding action', () => {
    const activity = grade6Term1ChineseUnit02.difficultyTracks.high.tasks[0]!.sessions[0]!.activities[5]!;

    expect(activity.id).toBe('grade-6/term-1/chinese/unit-02/high/task-01/session-01/question-06');
    expect(activity.kind).toBe('match');
    if (activity.kind !== 'match') return;

    expect(activity.prompt).toBe('把课文中的处境和人物行动配对。');
    expect(activity.pairs.map(({ left, right }) => [left, right])).toEqual([
      ['棋盘陀三面悬崖、敌人紧追', '五壮士选择把敌人引向顶峰'],
      ['潜伏点距敌人前沿很近', '邱少云必须严格保持隐蔽'],
      ['后续部队在黑暗中找不到突破口', '郝副营长点燃书本举火照亮道路'],
    ]);
  });

  it('keeps the Grade 6 request dialogue classification broad enough for both clear examples', () => {
    const activity = grade6Term1ChineseUnit04.difficultyTracks.advanced.tasks[1]!.sessions[0]!.activities[6]!;

    expect(activity.id).toBe('grade-6/term-1/chinese/unit-04/advanced/task-02/session-01/question-07');
    expect(activity.kind).toBe('categorize');
    if (activity.kind !== 'categorize') return;

    expect(activity.categories.map(({ label }) => label)).toEqual(['清楚有效', '含糊或没有回应']);
    expect(activity.items.find(({ label }) => label === '说明需要借用教室两小时')?.categoryId)
      .toBe(activity.categories[0]?.id);
    expect(activity.items.find(({ label }) => label === '听到时间顾虑后提出错峰方案')?.categoryId)
      .toBe(activity.categories[0]?.id);
  });

  it('orders the Grade 6 “Look Forward” story by determinate events', () => {
    const activity = grade6Term1ChineseUnit05.difficultyTracks.basic.tasks[1]!.sessions[0]!.activities[4]!;

    expect(activity.id).toBe('grade-6/term-1/chinese/unit-05/basic/task-02/session-01/question-05');
    expect(activity.kind).toBe('order');
    if (activity.kind !== 'order') return;

    expect(activity.correctOrder.map((id) => activity.items.find((item) => item.id === id)?.label)).toEqual([
      '主人公得到新雨衣，开始盼下雨',
      '放学路上看见下雨，盼着能穿雨衣出门',
      '她想借买酱油出门穿雨衣，却没能如愿',
      '后来她终于穿上新雨衣，愿望实现',
    ]);
    expect(activity.hint).toContain('最后如愿穿上');
    expect(activity.explanation).toContain('想借买酱油出门，没能如愿');
  });

  it('uses the sound actually present in the Grade 6 “Xijiang Yue” poem', () => {
    const activity = grade6Term1ChineseUnit01.difficultyTracks.advanced.tasks[0]!.sessions[0]!.activities[6]!;

    expect(activity.kind).toBe('categorize');
    if (activity.kind !== 'categorize') return;

    expect(activity.items.map((item) => item.label)).toContain('黄沙道中的蝉鸣');
    expect(activity.items.map((item) => item.label).join(' ')).not.toContain('莺啼');
  });

  it('separates adult farming from the children’s play and imitation in the Grade 5 poems', () => {
    const activity = grade5Term2ChineseUnit01.difficultyTracks.basic.tasks[0]!.sessions[0]!.activities[4]!;

    expect(activity.kind).toBe('categorize');
    if (activity.kind !== 'categorize') return;

    expect(activity.categories.map((category) => category.label)).toEqual(['成人劳作', '童年活动']);
    expect(activity.items.find((item) => item.label === '学种瓜')?.categoryId).toBe(activity.categories[1]?.id);
  });

  it('makes Grade 5 Unit 1 growth-story revisions ask for one specific action', () => {
    const feeling = grade5Term2ChineseUnit01.difficultyTracks.high.tasks[1]!.sessions[0]!.activities[5]!;
    const action = grade5Term2ChineseUnit01.difficultyTracks.high.tasks[1]!.sessions[0]!.activities[7]!;

    expect(feeling.id).toBe('grade-5/term-2/chinese/unit-01/high/task-02/session-01/question-06');
    expect(feeling.kind).toBe('choice');
    if (feeling.kind === 'choice') {
      expect(feeling.prompt).toContain('没有写出“我”当时的感受');
      expect(feeling.options.find(({ id }) => id === feeling.correctOptionId)?.label)
        .toBe('补写关键时刻自己的真实感受');
      expect(feeling.hint).toContain('当时的心情');
      expect(feeling.explanation).toContain('真实感受能说明');
    }

    expect(action.id).toBe('grade-5/term-2/chinese/unit-01/high/task-02/session-01/question-08');
    expect(action.kind).toBe('choice');
    if (action.kind === 'choice') {
      expect(action.prompt).toContain('没有写清我做了什么');
      expect(action.options.find(({ id }) => id === action.correctOptionId)?.label)
        .toBe('补写“我”当时做的一项具体动作');
      expect(action.hint).toContain('行动细节');
      expect(action.explanation).toContain('具体动作');
    }
  });

  it('keeps Grade 5 Unit 2 inference classification supported and revision advice singular', () => {
    const inference = grade5Term2ChineseUnit02.difficultyTracks.advanced.tasks[0]!.sessions[0]!.activities[4]!;
    const rehearsal = grade5Term2ChineseUnit02.difficultyTracks.high.tasks[0]!.sessions[0]!.activities[7]!;
    const reflection = grade5Term2ChineseUnit02.difficultyTracks.high.tasks[1]!.sessions[0]!.activities[7]!;

    expect(inference.id).toBe('grade-5/term-2/chinese/unit-02/advanced/task-01/session-01/question-05');
    expect(inference.kind).toBe('categorize');
    if (inference.kind === 'categorize') {
      expect(inference.items.find(({ label }) => label === '石猴愿意冒险探明洞内情形')?.categoryId)
        .toBe(inference.categories.find(({ label }) => label === '根据线索作出的理解')?.id);
      expect(inference.explanation).toContain('都能从石猴的行动推知');
    }

    expect(rehearsal.id).toBe('grade-5/term-2/chinese/unit-02/high/task-01/session-01/question-08');
    expect(rehearsal.kind).toBe('choice');
    if (rehearsal.kind === 'choice') {
      expect(rehearsal.options.find(({ id }) => id === rehearsal.correctOptionId)?.label)
        .toBe('提高关键台词的音量，再从观众位置听一次');
    }

    expect(reflection.id).toBe('grade-5/term-2/chinese/unit-02/high/task-02/session-01/question-08');
    expect(reflection.kind).toBe('choice');
    if (reflection.kind === 'choice') {
      const answer = reflection.options.find(({ id }) => id === reflection.correctOptionId)?.label;
      expect(reflection.prompt).toContain('没有写出自己的真实感受');
      expect(answer).toBe('补写读到一个具体情节时产生的真实感受');
      expect(answer).not.toContain('或');
    }
  });

  it('keeps Grade 5 Unit 4 text-comparison work classifiable and revision requests singular', () => {
    const poetryAnalysis = grade5Term2ChineseUnit04.difficultyTracks.basic.tasks[0]!.sessions[0]!.activities[2]!;
    const comparisons = [
      grade5Term2ChineseUnit04.difficultyTracks.advanced.tasks[0]!.sessions[0]!.activities[2]!,
      grade5Term2ChineseUnit04.difficultyTracks.advanced.tasks[1]!.sessions[0]!.activities[2]!,
      grade5Term2ChineseUnit04.difficultyTracks.high.tasks[1]!.sessions[0]!.activities[2]!,
    ];
    expect(poetryAnalysis.kind).toBe('categorize');
    if (poetryAnalysis.kind === 'categorize') {
      expect(poetryAnalysis.categories.map(({ label }) => label)).toEqual(['读懂单首诗', '横向比较']);
      expect(poetryAnalysis.items.find(({ label }) => label === '比较三首诗各自的情感指向')?.categoryId)
        .toBe(poetryAnalysis.categories.find(({ label }) => label === '横向比较')?.id);
    }

    for (const activity of comparisons) {
      expect(activity.kind).toBe('categorize');
      if (activity.kind === 'categorize') {
        expect(activity.categories.map(({ label }) => label)).toEqual(['逐篇整理', '综合比较']);
        expect(activity.items.filter(({ label }) => label.startsWith('比较两篇'))).toHaveLength(1);
        expect(activity.items.filter(({ label }) => label.startsWith('比较两篇'))[0]?.categoryId)
          .toBe(activity.categories.find(({ label }) => label === '综合比较')?.id);
      }
    }

    const characterRevision = grade5Term2ChineseUnit04.difficultyTracks.high.tasks[0]!.sessions[0]!.activities[5]!;
    const comparisonRevision = grade5Term2ChineseUnit04.difficultyTracks.high.tasks[1]!.sessions[0]!.activities[5]!;

    expect(characterRevision.id).toBe('grade-5/term-2/chinese/unit-04/high/task-01/session-01/question-06');
    expect(characterRevision.kind).toBe('choice');
    if (characterRevision.kind === 'choice') {
      expect(characterRevision.prompt).toContain('读不出主人公的难过');
      expect(characterRevision.options.find(({ id }) => id === characterRevision.correctOptionId)?.label)
        .toBe('补写主人公难过时的一个具体动作');
    }

    expect(comparisonRevision.id).toBe('grade-5/term-2/chinese/unit-04/high/task-02/session-01/question-06');
    expect(comparisonRevision.kind).toBe('choice');
    if (comparisonRevision.kind === 'choice') {
      expect(comparisonRevision.options.find(({ id }) => id === comparisonRevision.correctOptionId)?.label)
        .toBe('补上两人各自处境中的具体选择作为依据');
    }
  });

  it('keeps Grade 5 Unit 5 comparison preparation separable and revision advice singular', () => {
    const comparison = grade5Term2ChineseUnit05.difficultyTracks.advanced.tasks[1]!.sessions[0]!.activities[2]!;
    const revision = grade5Term2ChineseUnit05.difficultyTracks.high.tasks[1]!.sessions[0]!.activities[7]!;

    expect(comparison.id).toBe('grade-5/term-2/chinese/unit-05/advanced/task-02/session-01/question-03');
    expect(comparison.kind).toBe('categorize');
    if (comparison.kind === 'categorize') {
      expect(comparison.categories.map(({ label }) => label)).toEqual(['逐篇整理', '综合比较']);
      expect(comparison.items.find(({ label }) => label === '比较习作要求与课文片段的写人方式')?.categoryId)
        .toBe(comparison.categories.find(({ label }) => label === '综合比较')?.id);
    }

    expect(revision.id).toBe('grade-5/term-2/chinese/unit-05/high/task-02/session-01/question-08');
    expect(revision.kind).toBe('choice');
    if (revision.kind === 'choice') {
      expect(revision.prompt).toContain('只有“他很棒”');
      expect(revision.options.find(({ id }) => id === revision.correctOptionId)?.label)
        .toBe('补写一件能表现人物本领的具体事例');
    }
  });

  it('keeps seasonal farm examples tied to the course and distinguishes tree from animal observations', () => {
    const seasons = grade2Term1ChineseUnit02.difficultyTracks.basic.tasks[2]!.sessions[0]!.activities[1]!;
    const observationPairs = grade2Term1ChineseUnit02.difficultyTracks.basic.tasks[1]!.sessions[0]!.activities[6]!;

    expect(seasons.kind).toBe('categorize');
    if (seasons.kind === 'categorize') {
      expect(seasons.items.map((item) => item.label)).toContain('一年农事忙完');
      expect(seasons.items.map((item) => item.label)).not.toContain('整理农具');
    }

    expect(observationPairs.kind).toBe('match');
    if (observationPairs.kind !== 'match') return;
    expect(observationPairs.pairs.map(({ left, right }) => [left, right])).toContainEqual([
      '麻雀有羽毛并能展翅', '观察鸟类外形',
    ]);
    expect(observationPairs.pairs.map(({ left, right }) => [left, right])).toContainEqual([
      '青蛙会游动并寻找食物', '观察动物活动',
    ]);
  });

  it('anchors the tadpole growth judgment and rain sequence in enough context', () => {
    const growthQuestion = grade2Term1ChineseUnit01.difficultyTracks.basic.tasks[0]!.sessions[0]!.activities[1]!;
    const rainOrder = grade2Term1ChineseUnit01.difficultyTracks.basic.tasks[1]!.sessions[0]!.activities[3]!;

    expect(growthQuestion.prompt).toContain('一只小蝌蚪');
    expect(rainOrder.kind).toBe('order');
    if (rainOrder.kind !== 'order') return;

    expect(rainOrder.prompt).toContain('雨后水洼慢慢变小');
    expect(rainOrder.correctOrder.map((id) => rainOrder.items.find((item) => item.id === id)?.label)).toEqual([
      '天空聚起云', '雨点落下', '地面出现水洼', '阳光出来后，水洼慢慢变小',
    ]);
  });

  it('keeps the season classification categories mutually exclusive', () => {
    const activities = ['basic', 'advanced', 'high'].flatMap((difficulty) =>
      grade1Term2ChineseUnit01.difficultyTracks[difficulty as 'basic' | 'advanced' | 'high'].tasks.flatMap((task) =>
        task.sessions.flatMap((session) => session.activities),
      ),
    );
    const winterClassifications = activities.filter((activity) =>
      activity.kind === 'categorize' && activity.items.some((item) => item.label === '冬雪'),
    );

    expect(winterClassifications.length).toBeGreaterThan(0);
    for (const activity of winterClassifications) {
      if (activity.kind !== 'categorize') continue;
      expect(activity.categories.map((category) => category.label)).toEqual(['天气现象', '植物']);
      expect(activity.items.find((item) => item.label === '冬雪')?.categoryId).toBe(activity.categories[0]?.id);
    }
  });

  it('gives the custom claim a source before classifying it as verifiable information', () => {
    const activity = grade6Term2ChineseUnit01.difficultyTracks.high.tasks[1]!.sessions[0]!.activities[6]!;

    expect(activity.kind).toBe('categorize');
    if (activity.kind !== 'categorize') return;

    const sourcedClaim = activity.items.find((item) => item.label.includes('这项活动通常在除夕前准备'));
    expect(sourcedClaim?.label).toContain('介绍册记载');
    expect(sourcedClaim?.categoryId).toBe(activity.categories[0]?.id);
  });

  it('keeps the Grade 6 summary practice self-contained in each story question', () => {
    const activities = grade6Term2ChineseUnit02.difficultyTracks.advanced.tasks[1]!.sessions[0]!.activities;
    const prompts = activities.map((activity) => activity.prompt);

    expect(prompts[1]).toContain('故事写到小禾发现种子、带回科学角种下');
    expect(prompts[2]).toContain('小禾发现操场角落的种子');
    expect(prompts[3]).toContain('这段故事写到小禾发现种子');
    expect(prompts[7]).toContain('故事写到小禾发现一颗种子');
  });

  it('keeps Grade 6 Unit 2 explanations grammatical and labels the later cave message accurately', () => {
    const nilsExplanation = grade6Term2ChineseUnit02.difficultyTracks.basic.tasks[1]!.sessions[0]!.activities[3]!;
    const cavePairs = grade6Term2ChineseUnit02.difficultyTracks.advanced.tasks[0]!.sessions[0]!.activities[5]!;

    expect(nilsExplanation.id).toBe('grade-6/term-2/chinese/unit-02/basic/task-02/session-01/question-04');
    expect(nilsExplanation.explanation).toContain('他必须重新面对');
    expect(nilsExplanation.explanation).not.toContain('他必需重新面对');

    expect(cavePairs.id).toBe('grade-6/term-2/chinese/unit-02/advanced/task-01/session-01/question-06');
    expect(cavePairs.kind).toBe('match');
    if (cavePairs.kind !== 'match') return;

    expect(cavePairs.prompt).toContain('山洞探索线索和脱险后消息');
    expect(cavePairs.pairs.find(({ left }) => left === '洞口被封的消息')?.right)
      .toBe('让汤姆担心印第安·乔仍被困其中');
  });

  it('uses a determinate sequence for the group craft activity', () => {
    const activity = grade2Term2ChineseUnit02.difficultyTracks.basic.tasks[0]!.sessions[0]!.activities[6]!;

    expect(activity.kind).toBe('order');
    if (activity.kind !== 'order') return;

    expect(activity.items.map((item) => item.label)).toEqual([
      '检查作品并收好材料', '商量目标和分工', '按分工准备需要的材料', '合作完成制作',
    ]);
    expect(activity.correctOrder.map((id) => activity.items.find((item) => item.id === id)?.label)).toEqual([
      '商量目标和分工', '按分工准备需要的材料', '合作完成制作', '检查作品并收好材料',
    ]);
  });

  it('makes Grade 4 nature-imagery and recommendation sequences determinate', () => {
    const activities = [
      grade4Term1ChineseUnit01.difficultyTracks.basic.tasks[0]!.sessions[0]!.activities[3]!,
      grade4Term1ChineseUnit01.difficultyTracks.basic.tasks[1]!.sessions[0]!.activities[5]!,
      grade4Term1ChineseUnit01.difficultyTracks.advanced.tasks[1]!.sessions[0]!.activities[3]!,
    ];

    expect(activities.every((activity) => activity.kind === 'order')).toBe(true);
    const expected = [
      ['先找到描写景物的词句', '再圈出词句中看到或听到的细节', '把相关细节连成脑中的画面', '最后用自己的话说出画面'],
      ['我想推荐校园东侧的小花园。', '在那里，可以观察到形状各异的叶片。', '这些叶片的形状不同，很适合课间慢慢比较。', '听完介绍，如果你也感兴趣，我们再一起去看看。'],
      ['先说清地点在哪里', '接着列出那里能观察到的景物', '再用具体细节说明这些景物有什么特点', '最后根据这些特点说明为什么值得去看看'],
    ];

    activities.forEach((activity, index) => {
      if (activity.kind !== 'order') return;
      expect(activity.items.map((item) => item.label)).toEqual(expected[index]);
      expect(activity.correctOrder.map((id) => activity.items.find((item) => item.id === id)?.label)).toEqual(expected[index]);
    });
  });

  it('states the ordering principle for the Grade 4 question and inquiry steps', () => {
    const activities = [
      grade4Term1ChineseUnit02.difficultyTracks.basic.tasks[0]!.sessions[0]!.activities[6]!,
      grade4Term1ChineseUnit02.difficultyTracks.high.tasks[0]!.sessions[0]!.activities[2]!,
      grade4Term1ChineseUnit02.difficultyTracks.high.tasks[1]!.sessions[0]!.activities[3]!,
    ];
    const expected = [
      ['发现自己不明白的地方', '找到相关的词句或段落', '说清具体想问什么', '读一读，检查问题是否明白'],
      ['先读出清晨和中午的观察信息', '提出关于水珠变化的问题', '回到句子寻找支持答案的线索', '把无法由短文解决的疑问标出来另查'],
      ['说清本次阅读要解决的目标', '检查每个问题是否对应目标和材料', '合并重复问题并标记待查问题', '选出不同角度的关键问题分工讨论'],
    ];

    expect(activities.every((activity) => activity.kind === 'order')).toBe(true);
    activities.forEach((activity, index) => {
      if (activity.kind !== 'order') return;
      expect(activity.items.map((item) => item.label)).toEqual(expected[index]);
      expect(activity.prompt).toContain('顺序');
      expect(activity.correctOrder.map((id) => activity.items.find((item) => item.id === id)?.label)).toEqual(expected[index]);
    });
  });

  it('keeps Grade 4 observation records internally consistent and their review sequence explicit', () => {
    const recordOrder = grade4Term1ChineseUnit03.difficultyTracks.basic.tasks[1]!.sessions[0]!.activities[5]!;
    const reportOrder = grade4Term1ChineseUnit03.difficultyTracks.high.tasks[1]!.sessions[0]!.activities[5]!;
    const conflictingRecord = grade4Term1ChineseUnit03.difficultyTracks.high.tasks[1]!.sessions[0]!.activities[6]!;

    expect(recordOrder.kind).toBe('order');
    if (recordOrder.kind === 'order') {
      expect(recordOrder.prompt).toContain('背景—对象—细节—核实');
      expect(recordOrder.correctOrder.map((id) => recordOrder.items.find((item) => item.id === id)?.label)).toEqual([
        '交代观察的时间或位置', '写明观察对象', '选出最清楚的颜色、形状或动作细节', '检查句子有没有把猜想写成事实',
      ]);
    }

    expect(reportOrder.kind).toBe('order');
    if (reportOrder.kind === 'order') {
      expect(reportOrder.prompt).toContain('核对对象日期—提取证据—检查结论—修订表达');
      expect(reportOrder.correctOrder.map((id) => reportOrder.items.find((item) => item.id === id)?.label)).toEqual([
        '核对每条记录有没有日期和对象', '圈出可以直接观察到的细节', '检查结论是否能从这些细节推出', '改写没有依据的原因或绝对判断',
      ]);
    }

    expect(conflictingRecord.prompt).toContain('同一株植物');
    expect(conflictingRecord.prompt).not.toContain('同一片叶子');
  });

  it('keeps Grade 4 event-writing fixes singular and tied to the stated story', () => {
    const cause = grade4Term1ChineseUnit05.difficultyTracks.basic.tasks[0]!.sessions[0]!.activities[5]!;
    const planning = grade4Term1ChineseUnit05.difficultyTracks.high.tasks[0]!.sessions[0]!.activities[1]!;
    const openingFix = grade4Term1ChineseUnit05.difficultyTracks.high.tasks[1]!.sessions[0]!.activities[2]!;
    const cardContinuity = grade4Term1ChineseUnit05.difficultyTracks.advanced.tasks[1]!.sessions[0]!.activities[5]!;
    const borrowedItem = grade4Term1ChineseUnit05.difficultyTracks.high.tasks[1]!.sessions[0]!.activities[5]!;

    expect(cause.kind).toBe('choice');
    if (cause.kind === 'choice') {
      expect(cause.options[cause.options.findIndex((option) => option.id === cause.correctOptionId)]?.label).toContain('她看见纸屑散落在操场边');
      expect(cause.options[cause.options.findIndex((option) => option.id === cause.correctOptionId)]?.label).not.toContain('或');
    }

    expect(planning.kind).toBe('order');
    if (planning.kind === 'order') expect(planning.prompt).toContain('了解读者需要—选择信息—安排路线—请读者试读');

    expect(openingFix.kind).toBe('match');
    if (openingFix.kind === 'match') {
      expect(openingFix.pairs.find(({ left }) => left.includes('为了班级朗读会'))?.right).toBe('补写一项准备朗读会的行动，呼应开头目的');
    }

    expect(cardContinuity.kind).toBe('choice');
    if (cardContinuity.kind === 'choice') {
      expect(cardContinuity.prompt).toContain('若保留两件事的先后顺序');
      expect(cardContinuity.options.find((option) => option.id === cardContinuity.correctOptionId)?.label).toContain('做了一张新卡片');
    }

    expect(borrowedItem.kind).toBe('choice');
    if (borrowedItem.kind === 'choice') {
      expect(borrowedItem.prompt).toContain('同一把借来的放大镜');
      expect(borrowedItem.options.find((option) => option.id === borrowedItem.correctOptionId)?.label).toContain('自己的图画本');
    }
  });

  it('makes the Grade 4 blindfolded guessing game self-contained', () => {
    const activity = grade4Term1ChineseUnit06.difficultyTracks.advanced.tasks[1]!.sessions[0]!.activities[5]!;

    expect(activity.kind).toBe('choice');
    if (activity.kind !== 'choice') return;

    expect(activity.prompt).toContain('蒙眼猜物');
    expect(activity.options.find((option) => option.id === activity.correctOptionId)?.label).toBe('说明每轮谁蒙眼、怎样摸取物品并轮流猜。');
  });

  it('gives the Grade 4 continuity question one concrete revision action', () => {
    const activity = grade4Term1ChineseUnit08.difficultyTracks.high.tasks[1]!.sessions[0]!.activities[4]!;

    expect(activity.kind).toBe('choice');
    if (activity.kind !== 'choice') return;

    const answer = activity.options.find((option) => option.id === activity.correctOptionId)?.label;
    expect(answer).toBe('把后一句改为“后来我又在家里找另一份作品”，明确两次提到的不是同一份作品');
    expect(answer).not.toContain('或');
    expect(activity.hint).toContain('另一份作品');
    expect(activity.explanation).toContain('先前交给老师的作品');
  });

  it('makes Grade 4 paradise introductions ordered by an explicit principle and avoids inferring a ripple cause', () => {
    const introductionOrder = grade4Term2ChineseUnit01.difficultyTracks.advanced.tasks[1]!.sessions[0]!.activities[1]!;
    const waterInference = grade4Term2ChineseUnit01.difficultyTracks.high.tasks[0]!.sessions[0]!.activities[6]!;

    expect(introductionOrder.kind).toBe('order');
    if (introductionOrder.kind === 'order') {
      expect(introductionOrder.prompt).toContain('地点—常做的活动—景物特点—个人感受');
      expect(introductionOrder.correctOrder.map((id) => introductionOrder.items.find((item) => item.id === id)?.label)).toEqual([
        '说清楚乐园在哪里', '介绍自己常在那里做什么', '写一两处能表现特点的景物细节', '说明这个地方给自己带来的感受',
      ]);
    }

    expect(waterInference.kind).toBe('match');
    if (waterInference.kind !== 'match') return;

    const ripplePair = waterInference.pairs.find(({ left }) => left.includes('水面出现一圈圈波纹'));
    expect(ripplePair?.right).toBe('水面从平静变成有波纹');
    expect(ripplePair?.right).not.toContain('风');
    expect(waterInference.explanation).toContain('不能据此断定具体原因');
  });

  it('states the full sequence for Grade 4 science-news and invention writing tasks', () => {
    const newsOrder = grade4Term2ChineseUnit02.difficultyTracks.advanced.tasks[1]!.sessions[0]!.activities[1]!;
    const evidenceOrder = grade4Term2ChineseUnit02.difficultyTracks.high.tasks[0]!.sessions[0]!.activities[3]!;
    const inventionOrder = grade4Term2ChineseUnit02.difficultyTracks.high.tasks[1]!.sessions[0]!.activities[3]!;

    expect(newsOrder.kind).toBe('order');
    if (newsOrder.kind === 'order') expect(newsOrder.prompt).toContain('交代来源与主题—整理主要事实—用自己的话转述—分开表达个人看法');

    expect(evidenceOrder.kind).toBe('order');
    if (evidenceOrder.kind === 'order') expect(evidenceOrder.prompt).toContain('拆解说法—确认来源—比较证据范围—记录未解问题');

    expect(inventionOrder.kind).toBe('order');
    if (inventionOrder.kind === 'order') expect(inventionOrder.prompt).toContain('先说明需要—介绍名称和外形—解释各部分功能—说明使用与检验');
  });

  it('ties Grade 4 poetry line breaks and comparison to explicit reading sequences', () => {
    const lineBreak = grade4Term2ChineseUnit03.difficultyTracks.basic.tasks[1]!.sessions[0]!.activities[7]!;
    const comparison = grade4Term2ChineseUnit03.difficultyTracks.high.tasks[0]!.sessions[0]!.activities[3]!;

    expect(lineBreak.kind).toBe('choice');
    if (lineBreak.kind === 'choice') expect(lineBreak.prompt).toContain('先写湿着的石阶，再写阳光慢慢照上来');

    expect(comparison.kind).toBe('order');
    if (comparison.kind === 'order') {
      expect(comparison.prompt).toContain('找出两首诗的突出意象—比较特点—说明画面和情感效果—回到诗句核对');
      expect(comparison.correctOrder.map((id) => comparison.items.find((item) => item.id === id)?.label)).toEqual([
        '找出两首诗各自反复出现或特别突出的意象', '比较意象的颜色、动作或出现位置有什么不同',
        '说明这些差异怎样影响画面和情感', '回到诗句核对说明，删去无依据的情节猜测',
      ]);
    }
  });

  it('keeps Grade 4 animal-writing claims testable and comparison steps explicit', () => {
    const comparisonOrder = grade4Term2ChineseUnit04.difficultyTracks.advanced.tasks[0]!.sessions[0]!.activities[3]!;
    const draftReview = grade4Term2ChineseUnit04.difficultyTracks.high.tasks[1]!.sessions[0]!.activities[2]!;

    expect(comparisonOrder.kind).toBe('order');
    if (comparisonOrder.kind === 'order') {
      expect(comparisonOrder.prompt).toContain('确定文章—找描写线索—分析表达作用—用例子说明异同');
      expect(comparisonOrder.correctOrder.map((id) => comparisonOrder.items.find((item) => item.id === id)?.label)).toEqual([
        '确定要比较的两篇动物文章', '找出各自反复出现的行为或描写角度',
        '比较语气和细节怎样帮助表现动物特点', '用具体描写说明相同点和不同点',
      ]);
    }

    expect(draftReview.kind).toBe('categorize');
    if (draftReview.kind !== 'categorize') return;

    const testableGuess = draftReview.items.find((item) => item.label.includes('我猜它听见门铃'));
    expect(testableGuess?.categoryId).toBe(draftReview.categories.find((category) => category.label === '可保留但需核实')?.id);
    expect(draftReview.explanation).toContain('核实前不能当作事实');
  });

  it('states the sequence for checking and writing Grade 4 travel essays', () => {
    const reviewOrder = grade4Term2ChineseUnit05.difficultyTracks.advanced.tasks[0]!.sessions[0]!.activities[3]!;
    const essayOrder = grade4Term2ChineseUnit05.difficultyTracks.advanced.tasks[1]!.sessions[0]!.activities[3]!;

    expect(reviewOrder.kind).toBe('order');
    if (reviewOrder.kind === 'order') {
      expect(reviewOrder.prompt).toContain('找时间、地点和移动词—排列先后—核对实际经过—说明表达作用');
      expect(reviewOrder.correctOrder.map((id) => reviewOrder.items.find((item) => item.id === id)?.label)).toEqual([
        '圈出表示时间、地点和移动的词语', '根据线索排出景物或游览地点的先后',
        '检查前后句是否符合实际经过的过程', '说明这种顺序怎样帮助读者理解内容',
      ]);
    }

    expect(essayOrder.kind).toBe('order');
    if (essayOrder.kind === 'order') {
      expect(essayOrder.prompt).toContain('明确地点与读者—整理路线—选择重点景物—按路线写作并衔接—检查');
      expect(essayOrder.correctOrder.map((id) => essayOrder.items.find((item) => item.id === id)?.label)).toEqual([
        '确定地点和希望读者了解的内容', '整理实际游览路线和经过地点',
        '选出印象深刻的景物并补上观察细节', '按路线写经过，用合适的语句连接地点',
        '读一遍，检查顺序、重点和事实依据',
      ]);
    }
  });

  it('keeps Grade 4 story evidence concrete and long-text writing sequences explicit', () => {
    const evidenceCategory = grade4Term2ChineseUnit06.difficultyTracks.basic.tasks[0]!.sessions[0]!.activities[3]!;
    const longTextOrder = grade4Term2ChineseUnit06.difficultyTracks.basic.tasks[1]!.sessions[0]!.activities[1]!;
    const essayOrder = grade4Term2ChineseUnit06.difficultyTracks.advanced.tasks[1]!.sessions[0]!.activities[1]!;

    expect(evidenceCategory.kind).toBe('categorize');
    if (evidenceCategory.kind === 'categorize') {
      const action = evidenceCategory.items.find((item) => item.label.includes('老妇人持续磨铁杵'));
      expect(action?.categoryId).toBe(evidenceCategory.categories.find((category) => category.label === '故事中的做法')?.id);
      expect(evidenceCategory.explanation).toContain('说明用意');
    }

    expect(longTextOrder.kind).toBe('order');
    if (longTextOrder.kind === 'order') expect(longTextOrder.prompt).toContain('辨认文章分部—概括各部分—按顺序连接—回读检查遗漏');

    expect(essayOrder.kind).toBe('order');
    if (essayOrder.kind === 'order') expect(essayOrder.prompt).toContain('回想经历—写关键过程—朗读交换意见—依据反馈检查—筛选细节并修改');
  });

  it('uses a place rather than a route instruction in the Grade 2 spring guide location category', () => {
    const activity = grade2Term2ChineseUnit01.difficultyTracks.high.tasks[0]!.sessions[0]!.activities[3]!;

    expect(activity.kind).toBe('categorize');
    if (activity.kind !== 'categorize') return;

    expect(activity.items.map((item) => item.label)).toContain('教学楼旁的小树');
    expect(activity.items.map((item) => item.label)).not.toContain('沿着操场外侧小路走');
    expect(activity.items.find((item) => item.label === '教学楼旁的小树')?.categoryId).toBe(activity.categories[0]?.id);
  });

  it('provides an identifiable record or story clue in each evidence example', () => {
    const activity = grade2Term1ChineseUnit05.difficultyTracks.advanced.tasks[0]!.sessions[0]!.activities[3]!;

    expect(activity.kind).toBe('categorize');
    if (activity.kind !== 'categorize') return;

    expect(activity.items.map((item) => item.label)).toContain('课文写到寒号鸟拖延做窝，后来遇到寒冷');
    const verifiableItem = activity.items.find((item) => item.label.includes('寒号鸟'));
    expect(verifiableItem?.categoryId).toBe(activity.categories[0]?.id);
  });

  it('distinguishes carefulness from perseverance in the Grade 2 character evidence match', () => {
    const activity = grade2Term1ChineseUnit06.difficultyTracks.advanced.tasks[0]!.sessions[0]!.activities[5]!;

    expect(activity.kind).toBe('match');
    if (activity.kind !== 'match') return;

    expect(activity.pairs.map(({ left, right }) => [left, right])).toContainEqual([
      '每一步都仔细检查并完成工作', '认真',
    ]);
    expect(activity.pairs.map(({ left, right }) => [left, right])).toContainEqual([
      '遇到困难仍继续想办法', '坚持',
    ]);
  });

  it('uses a safe response to slippery ground in the Grade 2 weather observation task', () => {
    const activity = grade2Term1ChineseUnit07.difficultyTracks.advanced.tasks[1]!.sessions[0]!.activities[7]!;

    expect(activity.kind).toBe('categorize');
    if (activity.kind !== 'categorize') return;

    const safeResponse = activity.items.find((item) => item.label.includes('绕开湿滑地面'));
    expect(safeResponse?.label).toContain('请老师查看');
    expect(safeResponse?.categoryId).toBe(activity.categories.find((category) => category.label === '友好行动')?.id);
    expect(activity.items.map((item) => item.label)).not.toContain('大家一起整理湿滑区域旁的物品');
  });

  it('states the review sequence for the Grade 2 story check', () => {
    const activity = grade2Term1ChineseUnit08.difficultyTracks.high.tasks[0]!.sessions[0]!.activities[6]!;

    expect(activity.kind).toBe('order');
    if (activity.kind !== 'order') return;

    expect(activity.prompt).toContain('由整体到具体');
    expect(activity.hint).toContain('先读完整篇');
    expect(activity.correctOrder.map((id) => activity.items.find((item) => item.id === id)?.label)).toEqual([
      '读一遍故事顺序', '检查人物行动有没有理由', '看看结尾有没有回应目标', '修改一处最不清楚的地方',
    ]);
  });

  it('states a unique organizing principle for Grade 2 imagination and story orders', () => {
    const activities = [
      grade2Term2ChineseUnit04.difficultyTracks.basic.tasks[0]!.sessions[0]!.activities[3]!,
      grade2Term2ChineseUnit04.difficultyTracks.advanced.tasks[0]!.sessions[0]!.activities[2]!,
      grade2Term2ChineseUnit04.difficultyTracks.advanced.tasks[0]!.sessions[0]!.activities[6]!,
      grade2Term2ChineseUnit04.difficultyTracks.advanced.tasks[1]!.sessions[0]!.activities[2]!,
      grade2Term2ChineseUnit04.difficultyTracks.high.tasks[0]!.sessions[0]!.activities[2]!,
    ];

    expect(activities.every((activity) => activity.kind === 'order')).toBe(true);
    for (const activity of activities) {
      if (activity.kind !== 'order') continue;
      expect(activity.prompt).toContain('顺序');
      expect(activity.hint).not.toBe('');
    }
    expect(activities.map((activity) => activity.prompt)).toEqual([
      expect.stringContaining('地点、景物细节、联想、动作'),
      expect.stringContaining('发现细节—想到办法—采取行动—观察结果'),
      expect.stringContaining('整体顺序—行动原因—场景信息—结尾回应'),
      expect.stringContaining('观察景物—展开联想—发现问题—采取行动'),
      expect.stringContaining('约定目标和规则—分享点子—连接情节—决定取舍'),
    ]);
  });

  it('states the reflection sequence for the Grade 2 fable writing task', () => {
    const activity = grade2Term2ChineseUnit05.difficultyTracks.high.tasks[0]!.sessions[0]!.activities[6]!;

    expect(activity.kind).toBe('order');
    if (activity.kind !== 'order') return;

    expect(activity.prompt).toContain('回顾情节—发现可改进处—总结经验—检查连贯性');
    expect(activity.correctOrder.map((id) => activity.items.find((item) => item.id === id)?.label)).toEqual([
      '读一遍角色行动和结果', '找一处可以调整的选择', '写下角色学到的经验', '再读一遍看是否连贯',
    ]);
  });

  it('makes the Grade 2 thunderstorm order and location category unambiguous', () => {
    const stormOrder = grade2Term2ChineseUnit06.difficultyTracks.basic.tasks[0]!.sessions[0]!.activities[0]!;
    const locationCategory = grade2Term2ChineseUnit06.difficultyTracks.basic.tasks[0]!.sessions[0]!.activities[3]!;

    expect(stormOrder.kind).toBe('order');
    if (stormOrder.kind === 'order') {
      expect(stormOrder.items.map((item) => item.label)).toContain('乌云聚拢后，雷声从远处传来');
      expect(stormOrder.items.map((item) => item.label)).toContain('听见雷声后，雨点落下来');
      expect(stormOrder.correctOrder.map((id) => stormOrder.items.find((item) => item.id === id)?.label)).toEqual([
        '乌云渐渐聚拢', '乌云聚拢后，雷声从远处传来', '听见雷声后，雨点落下来', '雨停后地面还留着水迹',
      ]);
    }

    expect(locationCategory.kind).toBe('categorize');
    if (locationCategory.kind !== 'categorize') return;

    const lightning = locationCategory.items.find((item) => item.label === '闪电划过天空');
    expect(lightning?.categoryId).toBe(locationCategory.categories.find((category) => category.label === '天空变化')?.id);
    expect(locationCategory.items.map((item) => item.label)).not.toContain('雨点落在窗外');
  });

  it('uses Grade 2 language for distinguishing old-story imagination from evidence', () => {
    const basicRead = grade2Term2ChineseUnit08.difficultyTracks.basic.tasks[0]!.sessions[0]!.activities[0]!;
    const basicSort = grade2Term2ChineseUnit08.difficultyTracks.basic.tasks[0]!.sessions[0]!.activities[7]!;
    const advancedSort = grade2Term2ChineseUnit08.difficultyTracks.advanced.tasks[0]!.sessions[0]!.activities[3]!;
    const highSort = grade2Term2ChineseUnit08.difficultyTracks.high.tasks[0]!.sessions[0]!.activities[3]!;

    expect(basicRead.prompt).not.toContain('想象文字');
    expect(basicRead.kind).toBe('choice');
    if (basicRead.kind === 'choice') {
      expect(basicRead.options.map((option) => option.label)).toContain('把每个画面都当成真实历史记录');
    }
    expect(basicSort.kind).toBe('categorize');
    if (basicSort.kind === 'categorize') {
      expect(basicSort.items.map((item) => item.label)).toContain('资料介绍古人生活过的地点');
      expect(basicSort.items.map((item) => item.label)).toContain('博物馆说明牌介绍的一件古代物品');
    }
    expect(advancedSort.kind).toBe('categorize');
    if (advancedSort.kind === 'categorize') {
      expect(advancedSort.categories.map((category) => category.label)).toEqual([
        '故事里写的', '需要查一查的自然问题',
      ]);
      expect(advancedSort.items.map((item) => item.label)).toContain('天空为什么会下雨');
    }
    expect(highSort.kind).toBe('categorize');
    if (highSort.kind === 'categorize') {
      expect(highSort.items.map((item) => item.label)).toContain('科普书说水变冷后会结成冰');
    }
  });

  it('keeps the Grade 3 school-reading tasks concrete and distinct', () => {
    const wordContext = grade3Term1ChineseUnit01.difficultyTracks.basic.tasks[1]!.sessions[0]!.activities[5]!;
    const paragraphChoice = grade3Term1ChineseUnit01.difficultyTracks.advanced.tasks[0]!.sessions[0]!.activities[7]!;

    expect(wordContext.prompt).toContain('阅览室');
    expect(wordContext.explanation).toContain('“看书”提供了推想线索');
    expect(paragraphChoice.prompt).toContain('哪组最适合放在同一段');
    expect(paragraphChoice.explanation).toContain('课间读书和分享');
    if (wordContext.kind === 'choice' && paragraphChoice.kind === 'choice') {
      expect(wordContext.prompt).not.toBe(paragraphChoice.prompt);
      expect(wordContext.options.map((option) => option.label)).toContain(
        '她记下“看书”这个线索，猜“阅览室”是看书的地方，再查字典核对。',
      );
      expect(paragraphChoice.options.map((option) => option.label)).toContain(
        '课间我在图书角读故事书。读完后，我把有趣的情节讲给同学听。',
      );
    }
  });

  it('gives the second Grade 3 high task a distinct, self-contained notice-reading goal', () => {
    const firstTask = grade3Term1ChineseUnit01.difficultyTracks.high.tasks[0]!;
    const noticeTask = grade3Term1ChineseUnit01.difficultyTracks.high.tasks[1]!;
    const firstActivities = firstTask.sessions[0]!.activities;
    const activities = noticeTask.sessions[0]!.activities;

    expect(noticeTask.title).toContain('校园通知信息核对员');
    expect(noticeTask.objective).toContain('区分明确信息与个人想法');
    expect(activities).toHaveLength(8);
    expect(activities.map((activity) => activity.kind)).toEqual([
      'choice', 'match', 'order', 'categorize', 'choice', 'choice', 'choice', 'choice',
    ]);
    expect(activities.map((activity) => activity.prompt)).not.toContainEqual(
      expect.stringMatching(/在本组词卡中表示什么|哪一个词语表示|介绍.*词卡|分类标准/),
    );
    expect(activities.map((activity) => activity.prompt)).not.toEqual(firstActivities.map((activity) => activity.prompt));
    expect(activities.map((activity) => activity.id)).toEqual(
      Array.from({ length: 8 }, (_, index) =>
        `grade-3/term-1/chinese/unit-01/high/task-02/session-01/question-${String(index + 1).padStart(2, '0')}`,
      ),
    );

    const correctChoice = (index: number) => {
      const activity = activities[index]!;
      expect(activity.kind).toBe('choice');
      if (activity.kind !== 'choice') return undefined;
      return activity.options.find((option) => option.id === activity.correctOptionId)?.label;
    };

    expect(correctChoice(0)).toBe('故事分享安排在周五午间。');
    expect(correctChoice(4)).toBe('带一本自己读过的书。');
    expect(correctChoice(5)).toBe('通知没有写活动时长，可以向老师询问。');
    expect(correctChoice(6)).toBe('周五午间，三年级同学可以在图书角参加故事分享；要带一本读过的书，结束后把书放回书架。');
    expect(correctChoice(7)).toBe('活动结束后把书放回书架。');

    const matching = activities[1]!;
    expect(matching.kind).toBe('match');
    if (matching.kind === 'match') {
      expect(matching.pairs.map(({ left, right }) => [left, right])).toEqual([
        ['周五午间', '活动时间'],
        ['图书角', '活动地点'],
        ['带一本读过的书', '准备物品'],
      ]);
    }

    const order = activities[2]!;
    expect(order.kind).toBe('order');
    if (order.kind === 'order') {
      expect(order.correctOrder.map((id) => order.items.find((item) => item.id === id)?.label)).toEqual([
        '先说这是故事分享活动',
        '再说活动时间和地点',
        '补充要带一本读过的书',
        '最后说活动结束后把书放回书架',
      ]);
    }

    const classification = activities[3]!;
    expect(classification.kind).toBe('categorize');
    if (classification.kind === 'categorize') {
      const stated = classification.categories.find((category) => category.label === '通知明确写出的信息')?.id;
      const personal = classification.categories.find((category) => category.label === '个人想法')?.id;
      expect(classification.items.map(({ label, categoryId }) => [label, categoryId])).toEqual([
        ['活动安排在周五午间', stated],
        ['活动地点是图书角', stated],
        ['我觉得故事分享很有趣', personal],
        ['我想下次分享动物故事', personal],
      ]);
    }
  });

  it('keeps the Grade 3 autumn questions concrete and avoids repeating evidence checks', () => {
    const basicFollowup = grade3Term1ChineseUnit02.difficultyTracks.basic.tasks[1]!.sessions[0]!.activities[5]!;
    const advancedFirstMethod = grade3Term1ChineseUnit02.difficultyTracks.advanced.tasks[0]!.sessions[0]!.activities[5]!;
    const advancedFirstReason = grade3Term1ChineseUnit02.difficultyTracks.advanced.tasks[0]!.sessions[0]!.activities[7]!;
    const advancedSecondEvidence = grade3Term1ChineseUnit02.difficultyTracks.advanced.tasks[1]!.sessions[0]!.activities[5]!;
    const highFirstScenario = grade3Term1ChineseUnit02.difficultyTracks.high.tasks[0]!.sessions[0]!.activities[5]!;

    expect(basicFollowup.id).toBe('grade-3/term-1/chinese/unit-02/basic/task-02/session-01/question-06');
    expect(basicFollowup.prompt).toContain('哪句话说明这样做的好处');
    expect(basicFollowup.prompt).not.toContain('是否解决了');
    expect(basicFollowup.kind).toBe('choice');
    if (basicFollowup.kind === 'choice') {
      expect(basicFollowup.options.find((option) => option.id === basicFollowup.correctOptionId)?.label)
        .toBe('具体记录地点、特征和日期，方便比较。');
      expect(basicFollowup.explanation).toContain('具体记录地点、特征和日期');
    }

    expect(advancedFirstMethod.prompt).toContain('哪种做法能先提供需要的线索');
    expect(advancedFirstReason.id).toBe('grade-3/term-1/chinese/unit-02/advanced/task-01/session-01/question-08');
    expect(advancedFirstReason.prompt).toContain('哪条说明最贴切');
    expect(advancedSecondEvidence.prompt).toContain('哪种记录最便于伙伴核对你的判断');
    expect(advancedFirstReason.prompt).not.toBe(advancedSecondEvidence.prompt);
    if (advancedFirstReason.kind === 'choice' && advancedSecondEvidence.kind === 'choice') {
      expect(advancedFirstReason.options.find((option) => option.id === advancedFirstReason.correctOptionId)?.label)
        .toBe('具体记录地点、特征和日期，方便比较。');
      expect(advancedSecondEvidence.options.find((option) => option.id === advancedSecondEvidence.correctOptionId)?.label)
        .toBe('写下观察到的具体线索，并说明它怎样支持结论。');
    }

    expect(highFirstScenario.id).toBe('grade-3/term-1/chinese/unit-02/high/task-01/session-01/question-06');
    expect(highFirstScenario.prompt).toContain('同伴选了“只写‘很漂亮’”');
    expect(highFirstScenario.prompt).not.toContain('“只写“很漂亮””');
  });

  it('checks every generated Grade 3 scenario question that uses the shared templates', () => {
    const grade3Courses = Object.entries(curriculum.units)
      .filter(([id]) => /^grade-3\/term-[12]\/chinese\/unit-\d+$/.test(id));
    const genericBasicQuestions: string[] = [];
    const quoteHelperQuestions: Array<{ id: string; activity: (typeof grade3Courses)[number][1]['difficultyTracks']['basic']['tasks'][number]['sessions'][number]['activities'][number] }> = [];

    expect(grade3Courses).toHaveLength(16);

    const addQuoteHelperQuestion = (activity: (typeof grade3Courses)[number][1]['difficultyTracks']['basic']['tasks'][number]['sessions'][number]['activities'][number]) => {
      quoteHelperQuestions.push({ id: activity.id, activity });
    };

    for (const [courseId, unit] of grade3Courses) {
      const basicTaskTwo = unit.difficultyTracks.basic.tasks[1]!.sessions[0]!.activities[5]!;
      const advancedTaskOneQuestionSix = unit.difficultyTracks.advanced.tasks[0]!.sessions[0]!.activities[5]!;
      const advancedTaskOneQuestionEight = unit.difficultyTracks.advanced.tasks[0]!.sessions[0]!.activities[7]!;
      const advancedTaskTwoQuestionSix = unit.difficultyTracks.advanced.tasks[1]!.sessions[0]!.activities[5]!;
      const highTaskOneQuestionSix = unit.difficultyTracks.high.tasks[0]!.sessions[0]!.activities[5]!;
      const highTaskTwoQuestionSix = unit.difficultyTracks.high.tasks[1]!.sessions[0]!.activities[5]!;

      if (courseId !== 'grade-3/term-1/chinese/unit-01') {
        genericBasicQuestions.push(basicTaskTwo.id);
        expect(basicTaskTwo.id).toMatch(/\/basic\/task-02\/session-01\/question-06$/);
        expect(basicTaskTwo.kind).toBe('choice');
        expect(basicTaskTwo.prompt).toContain('哪句话说明这样做的好处');
        expect(basicTaskTwo.prompt).not.toContain('是否解决了');
        if (basicTaskTwo.kind === 'choice') {
          const correct = basicTaskTwo.options.find((option) => option.id === basicTaskTwo.correctOptionId)?.label;
          expect(new Set(basicTaskTwo.options.map(({ label }) => label)).size).toBe(3);
          expect(correct).toBeTruthy();
          expect(basicTaskTwo.explanation).toContain(correct!);
          expect(basicTaskTwo.hint).toContain('做法');
        }
        addQuoteHelperQuestion(basicTaskTwo);
      }

      addQuoteHelperQuestion(advancedTaskOneQuestionSix);
      if (courseId !== 'grade-3/term-1/chinese/unit-01') addQuoteHelperQuestion(advancedTaskOneQuestionEight);
      if (courseId !== 'grade-3/term-2/chinese/unit-05') addQuoteHelperQuestion(advancedTaskTwoQuestionSix);
      addQuoteHelperQuestion(highTaskOneQuestionSix);
      if (courseId !== 'grade-3/term-1/chinese/unit-01' && courseId !== 'grade-3/term-2/chinese/unit-05') {
        addQuoteHelperQuestion(highTaskTwoQuestionSix);
      }

      expect(highTaskOneQuestionSix.kind).toBe('choice');
      if (highTaskOneQuestionSix.kind === 'choice') {
        expect(highTaskOneQuestionSix.options.map(({ label }) => label)).not.toContain('不核对观察、词义或题目条件。');
        expect(highTaskOneQuestionSix.options.map(({ label }) => label)).toContain('不核对找到的线索，也不看题目条件。');
      }
    }

    expect(genericBasicQuestions).toHaveLength(15);
    expect(quoteHelperQuestions).toHaveLength(91);
    for (const { id, activity } of quoteHelperQuestions) {
      expect(id).toContain('grade-3/term-');
      expect(activity.kind).toBe('choice');
      expect(activity.prompt.match(/“/g)?.length ?? 0).toBe(activity.prompt.match(/”/g)?.length ?? 0);
      expect(activity.prompt).not.toMatch(/“[^”]*“|”[^“]*”/);
      expect(activity.hint.trim().length).toBeGreaterThan(0);
      expect(activity.explanation.trim().length).toBeGreaterThan(0);
      if (activity.kind === 'choice') {
        expect(new Set(activity.options.map(({ label }) => label)).size).toBe(3);
        expect(activity.options.filter((option) => option.id === activity.correctOptionId)).toHaveLength(1);
      }
    }
  });

  it('classifies Grade 5 Unit 6 story conditions and solutions without an ambiguous order', () => {
    const activity = grade5Term2ChineseUnit06.difficultyTracks.high.tasks[0]!.sessions[0]!.activities[2]!;

    expect(activity.id).toBe('grade-5/term-2/chinese/unit-06/high/task-01/session-01/question-03');
    expect(activity.kind).toBe('categorize');
    if (activity.kind !== 'categorize') return;

    expect(activity.categories.map(({ label }) => label)).toEqual(['问题条件', '解决问题的办法']);
    expect(activity.items.map(({ label, categoryId }) => [label, activity.categories.find(({ id }) => id === categoryId)?.label]))
      .toEqual([
        ['楚人先夸盾坚固，称没有东西能刺穿它。', '问题条件'],
        ['齐威王和田忌的马都分上、中、下三等。', '问题条件'],
        ['旁人追问楚人用自己的矛刺自己的盾会怎样。', '解决问题的办法'],
        ['孙膑让田忌调整马匹出场次序，以下等马先对齐威王上等马。', '解决问题的办法'],
      ]);
    expect(activity.hint).toContain('先找故事里出现的说法或比赛条件');
    expect(activity.explanation).toContain('后两项分别是旁人检验矛盾的追问和孙膑利用等级差异安排对阵的办法');
  });

  it('keeps Grade 5 Unit 7 classifications self-contained and revision choices singular', () => {
    const pastureReading = grade5Term2ChineseUnit07.difficultyTracks.basic.tasks[1]!.sessions[0]!.activities[2]!;
    const pyramidComparison = grade5Term2ChineseUnit07.difficultyTracks.advanced.tasks[1]!.sessions[0]!.activities[2]!;
    const pyramidEvidence = grade5Term2ChineseUnit07.difficultyTracks.advanced.tasks[1]!.sessions[0]!.activities[6]!;
    const lectureFirstStep = grade5Term2ChineseUnit07.difficultyTracks.high.tasks[0]!.sessions[0]!.activities[0]!;
    const lectureRephrase = grade5Term2ChineseUnit07.difficultyTracks.high.tasks[0]!.sessions[0]!.activities[3]!;
    const lectureLocation = grade5Term2ChineseUnit07.difficultyTracks.high.tasks[0]!.sessions[0]!.activities[5]!;
    const heritageFirstStep = grade5Term2ChineseUnit07.difficultyTracks.high.tasks[1]!.sessions[0]!.activities[0]!;
    const heritagePreparation = grade5Term2ChineseUnit07.difficultyTracks.high.tasks[1]!.sessions[0]!.activities[2]!;
    const removeIrrelevantInfo = grade5Term2ChineseUnit07.difficultyTracks.high.tasks[1]!.sessions[0]!.activities[3]!;
    const verifyRumor = grade5Term2ChineseUnit07.difficultyTracks.high.tasks[1]!.sessions[0]!.activities[5]!;
    const addSpecificFact = grade5Term2ChineseUnit07.difficultyTracks.high.tasks[1]!.sessions[0]!.activities[7]!;

    expect(pastureReading.kind).toBe('order');
    if (pastureReading.kind === 'order') {
      expect(pastureReading.prompt).toContain('由观察细节到概括整体');
      expect(pastureReading.correctOrder.map((id) => pastureReading.items.find(({ id: itemId }) => itemId === id)?.label))
        .toEqual([
          '观察牧场中出现的牲畜和环境',
          '留意动物在不同时段的活动状态',
          '比较热闹活动与安静画面',
          '用多处景物归纳牧场整体氛围',
        ]);
    }

    expect(pyramidComparison.id).toBe('grade-5/term-2/chinese/unit-07/advanced/task-02/session-01/question-03');
    expect(pyramidComparison.kind).toBe('categorize');
    if (pyramidComparison.kind === 'categorize') {
      expect(pyramidComparison.categories.map(({ label }) => label)).toEqual(['介绍表达方式', '联系依据和效果']);
      expect(pyramidComparison.items.map(({ label, categoryId }) => [label, pyramidComparison.categories.find(({ id }) => id === categoryId)?.label]))
        .toEqual([
          ['指出《金字塔夕照》借景物和联想写感受。', '介绍表达方式'],
          ['指出《不可思议的金字塔》用图文资料介绍信息。', '介绍表达方式'],
          ['分别找到能支持概括的文本依据。', '联系依据和效果'],
          ['说明两种写法各自适合呈现什么内容。', '联系依据和效果'],
        ]);
    }

    expect(pyramidEvidence.kind).toBe('categorize');
    if (pyramidEvidence.kind === 'categorize') {
      expect(pyramidEvidence.categories.map(({ label }) => label)).toEqual(['文中直接提供的信息', '文中没有直接说明']);
      expect(pyramidEvidence.items.find(({ label }) => label.startsWith('每块石材'))?.categoryId)
        .toBe(pyramidEvidence.categories.find(({ label }) => label === '文中没有直接说明')?.id);
      expect(pyramidEvidence.explanation).toContain('也不能说成已证实事实');
    }

    const correctChoice = (activity: typeof lectureFirstStep): string | undefined =>
      activity.kind === 'choice' ? activity.options.find(({ id }) => id === activity.correctOptionId)?.label : undefined;

    expect(correctChoice(lectureFirstStep)).toBe('明确听众是谁、最需要了解什么。');
    expect(correctChoice(lectureRephrase)).toBe('把这句话换成更简单、清楚的说法。');
    expect(correctChoice(lectureLocation)).toBe('图书馆在校园里的具体位置。');
    expect(correctChoice(heritageFirstStep)).toBe('感兴趣的文化遗产对象。');
    expect(correctChoice(removeIrrelevantInfo)).toBe('从介绍初稿中删去这段无关内容。');
    expect(correctChoice(verifyRumor)).toBe('在找到可靠出处并核实前，不把传闻写成确定事实。');
    expect(correctChoice(addSpecificFact)).toBe('从已核实的资料中补充一条最能体现对象特点的具体信息。');

    expect(heritagePreparation.id).toBe('grade-5/term-2/chinese/unit-07/high/task-02/session-01/question-03');
    expect(heritagePreparation.kind).toBe('categorize');
    if (heritagePreparation.kind === 'categorize') {
      expect(heritagePreparation.categories.map(({ label }) => label)).toEqual(['整理资料', '组织表达']);
      expect(heritagePreparation.items.find(({ label }) => label.startsWith('用自己的话'))?.categoryId)
        .toBe(heritagePreparation.categories.find(({ label }) => label === '组织表达')?.id);
    }
  });

  it('keeps Grade 5 Unit 8 story evidence accurate and revision prompts self-contained', () => {
    const fingerReading = grade5Term2ChineseUnit08.difficultyTracks.basic.tasks[1]!.sessions[0]!.activities[2]!;
    const teacherMatch = grade5Term2ChineseUnit08.difficultyTracks.advanced.tasks[0]!.sessions[0]!.activities[4]!;
    const teacherMisunderstanding = grade5Term2ChineseUnit08.difficultyTracks.advanced.tasks[0]!.sessions[0]!.activities[5]!;
    const teacherEvidence = grade5Term2ChineseUnit08.difficultyTracks.advanced.tasks[0]!.sessions[0]!.activities[6]!;
    const cartoonSteps = grade5Term2ChineseUnit08.difficultyTracks.advanced.tasks[1]!.sessions[0]!.activities[2]!;
    const cartoonRevision = grade5Term2ChineseUnit08.difficultyTracks.advanced.tasks[1]!.sessions[0]!.activities[5]!;
    const jokePractice = grade5Term2ChineseUnit08.difficultyTracks.high.tasks[0]!.sessions[0]!.activities[1]!;
    const jokeLaugh = grade5Term2ChineseUnit08.difficultyTracks.high.tasks[0]!.sessions[0]!.activities[3]!;
    const jokeIdentity = grade5Term2ChineseUnit08.difficultyTracks.high.tasks[0]!.sessions[0]!.activities[5]!;
    const jokeStory = grade5Term2ChineseUnit08.difficultyTracks.high.tasks[0]!.sessions[0]!.activities[7]!;
    const cartoonEvidence = grade5Term2ChineseUnit08.difficultyTracks.high.tasks[1]!.sessions[0]!.activities[5]!;

    expect(fingerReading.kind).toBe('order');
    expect(fingerReading.prompt).toContain('从观察细节到概括主旨');

    expect(teacherMatch.kind).toBe('match');
    if (teacherMatch.kind === 'match') {
      expect(teacherMatch.pairs.find(({ left }) => left === '课堂上笑出声')?.right)
        .toBe('让老师误以为“我”的笑不怀好意');
    }

    expect(teacherMisunderstanding.kind).toBe('choice');
    if (teacherMisunderstanding.kind === 'choice') {
      expect(teacherMisunderstanding.options.find(({ id }) => id === teacherMisunderstanding.correctOptionId)?.label)
        .toContain('笑不怀好意');
    }
    expect(teacherEvidence.kind).toBe('categorize');
    if (teacherEvidence.kind === 'categorize') {
      expect(teacherEvidence.items.find(({ label }) => label.includes('老师误以为'))?.categoryId)
        .toBe(teacherEvidence.categories.find(({ label }) => label === '课文明确写到')?.id);
      expect(teacherEvidence.items.find(({ label }) => label.includes('老师误以为'))?.label)
        .toContain('笑不怀好意');
    }

    expect(cartoonSteps.id).toBe('grade-5/term-2/chinese/unit-08/advanced/task-02/session-01/question-03');
    expect(cartoonSteps.kind).toBe('categorize');
    if (cartoonSteps.kind === 'categorize') {
      expect(cartoonSteps.categories.map(({ label }) => label)).toEqual(['收集漫画依据', '解释并检查启示']);
      expect(cartoonSteps.items.map(({ label, categoryId }) => [label, cartoonSteps.categories.find(({ id }) => id === categoryId)?.label]))
        .toEqual([
          ['观察人物、动作、物品及画面关系。', '收集漫画依据'],
          ['留意标题或文字提示。', '收集漫画依据'],
          ['联系生活中的人或事，解释画面含义并提出启示。', '解释并检查启示'],
          ['检查启示是否由画面和生活联系支持。', '解释并检查启示'],
        ]);
    }
    expect(cartoonRevision.kind).toBe('choice');
    if (cartoonRevision.kind === 'choice') {
      expect(cartoonRevision.options.find(({ id }) => id === cartoonRevision.correctOptionId)?.label)
        .toBe('补写一句，指出哪项画面细节支持这条启示。');
    }

    const correctChoice = (activity: typeof jokePractice): string | undefined =>
      activity.kind === 'choice' ? activity.options.find(({ id }) => id === activity.correctOptionId)?.label : undefined;

    expect(correctChoice(jokePractice)).toBe('删去多余的“然后”，用一句清楚的话衔接情节。');
    expect(correctChoice(jokeLaugh)).toBe('练习在包袱前停顿，稳住语气再把故事讲完。');
    expect(correctChoice(jokeIdentity)).toBe('给人物第一次出场处补上清楚的身份或称呼。');
    expect(correctChoice(jokeStory)).toBe('把关键情节按先后顺序重新讲清，交代人物和关键动作。');
    expect(cartoonEvidence.kind).toBe('choice');
    if (cartoonEvidence.kind === 'choice') {
      expect(cartoonEvidence.prompt).toContain('水龙头还在流水，人物已经离开');
      expect(cartoonEvidence.options.find(({ id }) => id === cartoonEvidence.correctOptionId)?.label)
        .toBe('补写一句说明这项画面细节怎样支持节约用水的启示。');
    }
  });

  it('keeps Grade 6 Unit 3 bamboo-person categories and life-writing checks precise', () => {
    const bambooMaterial = grade6Term1ChineseUnit03.difficultyTracks.basic.tasks[0]!.sessions[0]!.activities[0]!;
    const bambooClassification = grade6Term1ChineseUnit03.difficultyTracks.basic.tasks[0]!.sessions[0]!.activities[6]!;
    const writingSteps = grade6Term1ChineseUnit03.difficultyTracks.advanced.tasks[1]!.sessions[0]!.activities[4]!;
    const writingCheck = grade6Term1ChineseUnit03.difficultyTracks.advanced.tasks[1]!.sessions[0]!.activities[7]!;

    expect(bambooMaterial.kind).toBe('choice');
    if (bambooMaterial.kind === 'choice') {
      expect(bambooMaterial.options.find(({ id }) => id === bambooMaterial.correctOptionId)?.label).toBe('锯成一截的毛笔杆');
    }

    expect(bambooClassification.id).toBe('grade-6/term-1/chinese/unit-03/basic/task-01/session-01/question-07');
    expect(bambooClassification.kind).toBe('categorize');
    if (bambooClassification.kind === 'categorize') {
      expect(bambooClassification.categories.map(({ label }) => label)).toEqual(['玩具材料与结构', '操纵与游戏']);
      expect(bambooClassification.items.find(({ label }) => label === '线绳牵动玩具')?.categoryId)
        .toBe(bambooClassification.categories.find(({ label }) => label === '操纵与游戏')?.id);
    }

    expect(writingSteps.id).toBe('grade-6/term-1/chinese/unit-03/advanced/task-02/session-01/question-05');
    expect(writingSteps.kind).toBe('categorize');
    if (writingSteps.kind === 'categorize') {
      expect(writingSteps.categories.map(({ label }) => label)).toEqual(['确定主题和经历', '展开重点内容']);
      expect(writingSteps.items.find(({ label }) => label.startsWith('选择最能体现主题'))?.categoryId)
        .toBe(writingSteps.categories.find(({ label }) => label === '确定主题和经历')?.id);
    }

    expect(writingCheck.kind).toBe('choice');
    if (writingCheck.kind === 'choice') {
      expect(writingCheck.options.find(({ id }) => id === writingCheck.correctOptionId)?.label)
        .toBe('经历中的关键细节是否写清它怎样体现中心感受');
    }
  });

  it('keeps Grade 6 Unit 7 story facts, opera interpretation, and preparation order precise', () => {
    const paintingStory = grade6Term1ChineseUnit07.difficultyTracks.basic.tasks[0]!.sessions[0]!.activities[4]!;
    const staticPose = grade6Term1ChineseUnit07.difficultyTracks.advanced.tasks[0]!.sessions[0]!.activities[1]!;
    const calligraphySteps = grade6Term1ChineseUnit07.difficultyTracks.advanced.tasks[1]!.sessions[0]!.activities[4]!;

    expect(paintingStory.id).toBe('grade-6/term-1/chinese/unit-07/basic/task-01/session-01/question-05');
    expect(paintingStory.kind).toBe('order');
    if (paintingStory.kind === 'order') {
      expect(paintingStory.correctOrder.map((id) => paintingStory.items.find((item) => item.id === id)?.label)).toEqual([
        '杜处士展示戴嵩的画',
        '牧童见画后拍手大笑',
        '牧童指出画中斗牛尾巴画错',
        '杜处士笑着认可牧童的判断',
      ]);
      expect(paintingStory.items.map(({ label }) => label).join(' ')).not.toContain('众人笑');
      expect(paintingStory.explanation).toContain('杜处士笑着认可');
    }

    expect(staticPose.id).toBe('grade-6/term-1/chinese/unit-07/advanced/task-01/session-01/question-02');
    expect(staticPose.kind).toBe('choice');
    if (staticPose.kind === 'choice') {
      expect(staticPose.options.find(({ id }) => id === staticPose.correctOptionId)?.label).toBe('突出人物的武艺和必胜信心');
      expect(staticPose.explanation).toContain('人物武艺和必胜信心');
    }

    expect(calligraphySteps.id).toBe('grade-6/term-1/chinese/unit-07/advanced/task-02/session-01/question-05');
    expect(calligraphySteps.kind).toBe('order');
    if (calligraphySteps.kind === 'order') {
      expect(calligraphySteps.correctOrder.map((id) => calligraphySteps.items.find((item) => item.id === id)?.label)).toEqual([
        '确定想分享的作品或体验',
        '围绕分享对象搜集并观察相关材料',
        '筛选材料并整理成有顺序的讲述要点',
        '用整理好的要点试讲，检查表达是否清楚',
      ]);
      expect(calligraphySteps.explanation).toContain('分享对象决定材料范围');
    }
  });

  it('makes Grade 6 Unit 8 evidence and personal-writing revisions concrete', () => {
    const evidenceRevision = grade6Term1ChineseUnit08.difficultyTracks.high.tasks[0]!.sessions[0]!.activities[7]!;
    const writingDetail = grade6Term1ChineseUnit08.difficultyTracks.high.tasks[1]!.sessions[0]!.activities[2]!;
    const writingRevision = grade6Term1ChineseUnit08.difficultyTracks.high.tasks[1]!.sessions[0]!.activities[7]!;

    expect(evidenceRevision.id).toBe('grade-6/term-1/chinese/unit-08/high/task-01/session-01/question-08');
    expect(evidenceRevision.kind).toBe('choice');
    if (evidenceRevision.kind === 'choice') {
      const answer = evidenceRevision.options.find(({ id }) => id === evidenceRevision.correctOptionId)?.label;
      expect(evidenceRevision.prompt).toContain('“关心普通人”');
      expect(answer).toBe('补上一条能直接支持这项评价的可核查事件');
      expect(answer).not.toContain('或');
    }

    expect(writingDetail.id).toBe('grade-6/term-1/chinese/unit-08/high/task-02/session-01/question-03');
    expect(writingDetail.kind).toBe('choice');
    if (writingDetail.kind === 'choice') {
      expect(writingDetail.options.find(({ id }) => id === writingDetail.correctOptionId)?.label)
        .toBe('写清对方当时做的一件具体事情');
    }

    expect(writingRevision.id).toBe('grade-6/term-1/chinese/unit-08/high/task-02/session-01/question-08');
    expect(writingRevision.kind).toBe('choice');
    if (writingRevision.kind === 'choice') {
      const answer = writingRevision.options.find(({ id }) => id === writingRevision.correctOptionId)?.label;
      expect(answer).toBe('补写对方帮助自己的一件具体行动');
      expect(answer).not.toContain('或');
    }
  });

  it('keeps Grade 6 graduation-book editing and event corrections determinate', () => {
    const duplicatePhotos = grade6Term2ChineseIntegratedPractice01.difficultyTracks.advanced.tasks[0]!.sessions[0]!.activities[3]!;
    const growthComparison = grade6Term2ChineseIntegratedPractice01.difficultyTracks.advanced.tasks[0]!.sessions[0]!.activities[7]!;
    const farewellMessage = grade6Term2ChineseIntegratedPractice01.difficultyTracks.advanced.tasks[1]!.sessions[0]!.activities[3]!;
    const propChange = grade6Term2ChineseIntegratedPractice01.difficultyTracks.high.tasks[0]!.sessions[0]!.activities[7]!;

    for (const activity of [duplicatePhotos, growthComparison, farewellMessage, propChange]) {
      expect(activity.kind).toBe('choice');
      if (activity.kind !== 'choice') continue;
      expect(activity.id).toContain('grade-6/term-2/chinese/integrated-practice-01/');
      expect(activity.options.find(({ id }) => id === activity.correctOptionId)?.label).toBeTruthy();
    }

    expect(duplicatePhotos.kind === 'choice' && duplicatePhotos.options.find(({ id }) => id === duplicatePhotos.correctOptionId)?.label)
      .toBe('保留更能表现活动特点的一张，删去内容重复的一张');
    expect(growthComparison.kind === 'choice' && growthComparison.options.find(({ id }) => id === growthComparison.correctOptionId)?.label)
      .toBe('补入一组标明年级的早期与后期作品对照');
    expect(farewellMessage.kind === 'choice' && farewellMessage.options.find(({ id }) => id === farewellMessage.correctOptionId)?.label)
      .toBe('补写一件两人共同经历的具体事情');
    expect(farewellMessage.kind === 'choice' && farewellMessage.options.find(({ id }) => id === farewellMessage.correctOptionId)?.label)
      .not.toContain('或');
    expect(propChange.kind === 'choice' && propChange.options.find(({ id }) => id === propChange.correctOptionId)?.label)
      .toBe('在流程表中为道具更换加入足够的换场时间');
  });

  it('limits Grade 6 Unit 1 folk-custom claims to the speaker’s evidence', () => {
    const evidenceScope = grade6Term2ChineseUnit01.difficultyTracks.high.tasks[0]!.sessions[0]!.activities[2]!;

    expect(evidenceScope.id).toBe('grade-6/term-2/chinese/unit-01/high/task-01/session-01/question-03');
    expect(evidenceScope.kind).toBe('choice');
    if (evidenceScope.kind !== 'choice') return;

    const answer = evidenceScope.options.find(({ id }) => id === evidenceScope.correctOptionId)?.label;
    expect(evidenceScope.prompt).toContain('只能确认家里多年这样做');
    expect(answer).toBe('说明这是自家的经历，不能据此断定所有家庭一直如此');
    expect(evidenceScope.explanation).toContain('不把局部做法扩大');
  });

  it('keeps Grade 6 Unit 3 emotion-classification examples self-contained', () => {
    const expressionTypes = grade6Term2ChineseUnit03.difficultyTracks.high.tasks[1]!.sessions[0]!.activities[6]!;

    expect(expressionTypes.id).toBe('grade-6/term-2/chinese/unit-03/high/task-02/session-01/question-07');
    expect(expressionTypes.kind).toBe('categorize');
    if (expressionTypes.kind !== 'categorize') return;

    const card = expressionTypes.items.find(({ label }) => label.includes('把卡片读了一遍又一遍'));
    expect(card?.categoryId).toBe('grade-6/term-2/chinese/unit-03/high/task-02/session-01/question-07/category-02');
    expect(expressionTypes.explanation).toContain('迟迟不收卡片的动作');
  });

  it('keeps Grade 6 Unit 4 source handling and wish-writing steps determinate', () => {
    const sourceCheck = grade6Term2ChineseUnit04.difficultyTracks.high.tasks[0]!.sessions[0]!.activities[3]!;
    const themeRevision = grade6Term2ChineseUnit04.difficultyTracks.high.tasks[0]!.sessions[0]!.activities[7]!;
    const gratitude = grade6Term2ChineseUnit04.difficultyTracks.high.tasks[1]!.sessions[0]!.activities[2]!;
    const writingSteps = grade6Term2ChineseUnit04.difficultyTracks.high.tasks[1]!.sessions[0]!.activities[4]!;
    const importance = grade6Term2ChineseUnit04.difficultyTracks.high.tasks[1]!.sessions[0]!.activities[7]!;

    expect(sourceCheck.id).toBe('grade-6/term-2/chinese/unit-04/high/task-01/session-01/question-04');
    expect(sourceCheck.kind).toBe('choice');
    if (sourceCheck.kind === 'choice') {
      expect(sourceCheck.options.find(({ id }) => id === sourceCheck.correctOptionId)?.label)
        .toBe('暂不收入，直到能从可靠来源核实作者和诗句');
    }

    expect(themeRevision.id).toBe('grade-6/term-2/chinese/unit-04/high/task-01/session-01/question-08');
    expect(themeRevision.kind).toBe('choice');
    if (themeRevision.kind === 'choice') {
      expect(themeRevision.options.find(({ id }) => id === themeRevision.correctOptionId)?.label)
        .toBe('把主题改为“坚守与理想”，不限定诗作表达相同心情');
    }

    expect(gratitude.id).toBe('grade-6/term-2/chinese/unit-04/high/task-02/session-01/question-03');
    expect(gratitude.kind).toBe('choice');
    if (gratitude.kind === 'choice') {
      expect(gratitude.prompt).toContain('以后有机会当面感谢老师');
      expect(gratitude.options.find(({ id }) => id === gratitude.correctOptionId)?.label)
        .toBe('写清老师帮助自己的一件具体经历');
    }

    expect(writingSteps.id).toBe('grade-6/term-2/chinese/unit-04/high/task-02/session-01/question-05');
    expect(writingSteps.kind).toBe('order');
    if (writingSteps.kind === 'order') {
      expect(writingSteps.correctOrder.map((id) => writingSteps.items.find((item) => item.id === id)?.label)).toEqual([
        '明确最想交流的心愿',
        '挑选能说明心愿的材料',
        '选择适合的表达形式',
        '按表达需要组织经历、理由和愿望',
        '读后修改语句，检查心愿是否清楚',
      ]);
    }

    expect(importance.id).toBe('grade-6/term-2/chinese/unit-04/high/task-02/session-01/question-08');
    expect(importance.kind).toBe('choice');
    if (importance.kind === 'choice') {
      const answer = importance.options.find(({ id }) => id === importance.correctOptionId)?.label;
      expect(answer).toBe('补写一件相关经历，说明它怎样使自己产生这个心愿');
      expect(answer).not.toContain('并说明希望');
    }
  });

  it('aligns Grade 6 Unit 5 science-fiction classification with its actual two categories', () => {
    const storyMaterial = grade6Term2ChineseUnit05.difficultyTracks.high.tasks[1]!.sessions[0]!.activities[6]!;

    expect(storyMaterial.id).toBe('grade-6/term-2/chinese/unit-05/high/task-02/session-01/question-07');
    expect(storyMaterial.kind).toBe('categorize');
    if (storyMaterial.kind !== 'categorize') return;

    expect(storyMaterial.prompt).toBe('按是否推动科幻故事主线分类。');
    expect(storyMaterial.categories.map(({ label }) => label)).toEqual([
      '推动故事的设定或事件',
      '与主线无关的细节',
    ]);
  });

  it('keeps Grade 6 Unit 6 poem ordering tied to each poem’s actual verse sequence', () => {
    const farewellPoem = grade6Term2ChineseUnit06.difficultyTracks.basic.tasks[1]!.sessions[0]!.activities[4]!;
    const boatPoem = grade6Term2ChineseUnit06.difficultyTracks.advanced.tasks[1]!.sessions[0]!.activities[4]!;

    expect(farewellPoem.id).toBe('grade-6/term-2/chinese/unit-06/basic/task-02/session-01/question-05');
    expect(farewellPoem.kind).toBe('order');
    if (farewellPoem.kind === 'order') {
      expect(farewellPoem.correctOrder.map((id) => farewellPoem.items.find((item) => item.id === id)?.label)).toEqual([
        '渭城清晨下雨润尘',
        '青色客舍和新柳映入眼中',
        '劝友人再饮一杯酒',
        '想到友人西出阳关将少有故人',
      ]);
    }

    expect(boatPoem.id).toBe('grade-6/term-2/chinese/unit-06/advanced/task-02/session-01/question-05');
    expect(boatPoem.kind).toBe('order');
    if (boatPoem.kind === 'order') {
      expect(boatPoem.prompt).toContain('《泊船瓜洲》');
      expect(boatPoem.correctOrder.map((id) => boatPoem.items.find((item) => item.id === id)?.label)).toEqual([
        '京口瓜洲一水间',
        '钟山只隔数重山',
        '春风又绿江南岸',
        '明月何时照我还',
      ]);
    }
  });
});
