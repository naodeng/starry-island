import { describe, expect, it } from 'vitest';
import type { ActivityDefinition } from '../content/types';
import { getActivityAnswerSpeechText, getActivityQuestionSpeechText } from './activitySpeech';

const cases: Array<{
  name: string;
  activity: ActivityDefinition;
  question: string;
  answer: string;
}> = [
  {
    name: 'choice',
    activity: {
      id: 'choice-speech',
      kind: 'choice',
      prompt: '哪种方法表示数量增加？',
      hint: '把两部分合起来。',
      explanation: '增加可以用加法表示。',
      options: [
        { id: 'add', label: '加法' },
        { id: 'subtract', label: '减法' },
      ],
      correctOptionId: 'add',
    },
    question: '题目：哪种方法表示数量增加？选项一：加法；选项二：减法。',
    answer: '正确答案：加法。增加可以用加法表示。',
  },
  {
    name: 'match',
    activity: {
      id: 'match-speech',
      kind: 'match',
      prompt: '把词语配起来。',
      hint: '想想它们的意思。',
      explanation: '太阳和白天有关，月亮常在夜晚出现。',
      pairs: [
        { id: 'sun', left: '太阳', right: '白天' },
        { id: 'moon', left: '月亮', right: '夜晚' },
      ],
    },
    question: '题目：把词语配起来。左侧选项：太阳、月亮。右侧选项：白天、夜晚。',
    answer: '正确配对：太阳对应白天；月亮对应夜晚。太阳和白天有关，月亮常在夜晚出现。',
  },
  {
    name: 'order',
    activity: {
      id: 'order-speech',
      kind: 'order',
      prompt: '按先后顺序排列测量步骤。',
      hint: '先准备再测量。',
      explanation: '准备工具后开始测量，最后记录结果。',
      items: [
        { id: 'record', label: '记录结果' },
        { id: 'prepare', label: '准备工具' },
        { id: 'measure', label: '开始测量' },
      ],
      correctOrder: ['prepare', 'measure', 'record'],
    },
    question: '题目：按先后顺序排列测量步骤。待排序项目：记录结果、准备工具、开始测量。',
    answer: '正确顺序：准备工具、开始测量、记录结果。准备工具后开始测量，最后记录结果。',
  },
  {
    name: 'categorize',
    activity: {
      id: 'categorize-speech',
      kind: 'categorize',
      prompt: '按温度给现象分类。',
      hint: '比较冷热。',
      explanation: '冰块摸起来较冷，火焰温度高。',
      categories: [
        { id: 'cold', label: '冷' },
        { id: 'hot', label: '热' },
      ],
      items: [
        { id: 'ice', label: '冰块', categoryId: 'cold' },
        { id: 'flame', label: '火焰', categoryId: 'hot' },
      ],
    },
    question: '题目：按温度给现象分类。类别：冷、热。待分类项目：冰块、火焰。',
    answer: '正确分类：冷：冰块；热：火焰。冰块摸起来较冷，火焰温度高。',
  },
  {
    name: 'measurement',
    activity: {
      id: 'measurement-speech',
      kind: 'measurement',
      prompt: '把彩带调到指定长度。',
      hint: '观察尺子上的刻度。',
      explanation: '目标长度是8厘米。',
      objectLabel: '彩带',
      targetLengthCm: 8,
      minCm: 2,
      maxCm: 10,
    },
    question: '题目：把彩带调到指定长度。物体：彩带。可调范围：2到10厘米。',
    answer: '正确答案：彩带长8厘米。目标长度是8厘米。',
  },
  {
    name: 'arithmetic',
    activity: {
      id: 'arithmetic-speech',
      kind: 'arithmetic',
      prompt: '两盒彩笔合起来有多少支？',
      hint: '把两个数量相加。',
      explanation: '把两个数量合起来用加法。',
      expression: '26 + 18',
      correctAnswer: 44,
    },
    question: '题目：两盒彩笔合起来有多少支？算式：26加18。',
    answer: '正确答案：26加18等于44。把两个数量合起来用加法。',
  },
];

describe('activity speech text', () => {
  it.each(cases)('reads the question content for $name without revealing its answer', ({ activity, question }) => {
    expect(getActivityQuestionSpeechText(activity)).toBe(question);
  });

  it.each(cases)('reads the structured correct answer and explanation for $name', ({ activity, answer }) => {
    expect(getActivityAnswerSpeechText(activity)).toBe(answer);
  });
});
