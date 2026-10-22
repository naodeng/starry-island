import type { Difficulty } from '../../content/types';
import type { ChallengeQuestionSnapshot } from './types';

export interface LearningTaskReference {
  unitKey: string;
  difficulty: Difficulty;
  taskId: string;
  title: string;
  activityIds: string[];
  knowledgePointIds: string[];
}

export interface StudyRecommendation {
  knowledgePointId: string;
  title: string;
  incorrectCount: number;
  learningTask?: LearningTaskReference;
}

const KNOWLEDGE_POINT_TITLES: Readonly<Record<string, string>> = {
  'length-units': '长度单位',
  'measurement-and-estimation': '测量与估测',
  'measurement-activity-planning': '测量活动规划',
  'two-digit-addition': '两位数加法',
  'two-digit-subtraction': '两位数减法',
  'angle-parts': '角的组成',
  'angle-comparison': '角的大小比较',
  'equal-groups-multiplication': '认识几个几相加',
  'multiplication-facts': '乘法口诀',
  'name-and-self-introduction': '姓名与自我介绍',
  'age-and-class': '年龄与班级',
};

const DIFFICULTY_ORDER: Readonly<Record<Difficulty, number>> = { basic: 0, advanced: 1, high: 2 };

function findLearningTask(
  knowledgePointId: string,
  incorrectQuestions: ChallengeQuestionSnapshot[],
  learningTasks: LearningTaskReference[],
): LearningTaskReference | undefined {
  return learningTasks
    .map((learningTask, index) => ({
      learningTask,
      index,
      directMatches: incorrectQuestions.filter((question) => learningTask.activityIds.includes(question.activityId)).length,
      focusSize: learningTask.knowledgePointIds.length,
    }))
    .filter(({ learningTask }) => learningTask.knowledgePointIds.includes(knowledgePointId))
    .sort((left, right) => right.directMatches - left.directMatches
      || left.focusSize - right.focusSize
      || DIFFICULTY_ORDER[left.learningTask.difficulty] - DIFFICULTY_ORDER[right.learningTask.difficulty]
      || left.index - right.index)[0]?.learningTask;
}

export function getStudyRecommendations(
  incorrectQuestions: ChallengeQuestionSnapshot[],
  learningTasks: LearningTaskReference[],
): StudyRecommendation[] {
  const questionsByKnowledgePoint = new Map<string, ChallengeQuestionSnapshot[]>();
  for (const question of incorrectQuestions) {
    for (const knowledgePointId of new Set(question.knowledgePointIds)) {
      const questions = questionsByKnowledgePoint.get(knowledgePointId) ?? [];
      questions.push(question);
      questionsByKnowledgePoint.set(knowledgePointId, questions);
    }
  }

  return [...questionsByKnowledgePoint]
    .map(([knowledgePointId, questions], index) => ({
      knowledgePointId,
      title: KNOWLEDGE_POINT_TITLES[knowledgePointId] ?? '相关知识点',
      incorrectCount: questions.length,
      learningTask: findLearningTask(knowledgePointId, questions, learningTasks),
      index,
    }))
    .sort((left, right) => right.incorrectCount - left.incorrectCount || left.index - right.index)
    .map(({ index: _index, ...recommendation }) => recommendation);
}
