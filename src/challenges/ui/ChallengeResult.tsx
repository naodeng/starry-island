import { Button, Card } from 'animal-island-ui';
import type { ActivityDefinition } from '../../content/types';
import { submitAnswer } from '../../learning/answers';
import type { ChallengeAttempt, ChallengeResult as ChallengeResultData, TaskProgress } from '../domain/types';

interface ChallengeResultProps {
  attempt: ChallengeAttempt;
  result: ChallengeResultData;
  progress: TaskProgress;
  taskTitle: string;
  onBack: () => void;
}

export function formatCorrectAnswer(activity: ActivityDefinition): string {
  switch (activity.kind) {
    case 'choice':
      return activity.options.find(({ id }) => id === activity.correctOptionId)?.label ?? '参考选项';
    case 'arithmetic':
      return String(activity.correctAnswer);
    case 'match':
      return activity.pairs.map(({ left, right }) => `${left}：${right}`).join('；');
    case 'order': {
      const labels = new Map(activity.items.map(({ id, label }) => [id, label]));
      return activity.correctOrder.map((id) => labels.get(id) ?? id).join('、');
    }
    case 'categorize': {
      const categories = new Map(activity.categories.map(({ id, label }) => [id, label]));
      return activity.items.map((item) => `${item.label}：${categories.get(item.categoryId) ?? item.categoryId}`).join('；');
    }
    case 'measurement':
      return `${activity.targetLengthCm} 厘米`;
  }
}

function formatElapsed(elapsedMs: number): string {
  const totalSeconds = Math.floor(elapsedMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return minutes > 0 ? `${minutes} 分 ${seconds} 秒` : `${seconds} 秒`;
}

export default function ChallengeResult({ attempt, result, progress, taskTitle, onBack }: ChallengeResultProps) {
  const incorrectQuestions = attempt.questions.filter((question) => !submitAnswer(question.activity, attempt.answers[question.questionId]));
  return (
    <main className="challenge-page">
      <div className="challenge-shell">
        <header className="challenge-result-hero">
          <p className="eyebrow">本次闯关完成</p>
          <h1>{taskTitle}</h1>
          <p className="challenge-result-score">{result.scorePercent} 分</p>
          <p>{result.passed ? '挑战通过，做得很棒！' : '这次先积累经验，准备好后还可以再挑战。'}</p>
          <div className="challenge-result-stats" aria-label="本次闯关结果">
            <span>{result.correctCount}/{result.totalCount} 题答对</span>
            <span>{result.stars} 颗星</span>
            <span>用时 {formatElapsed(result.elapsedMs)}</span>
          </div>
        </header>
        <section className="challenge-result-summary" aria-labelledby="challenge-best-heading">
          <Card color="default">
            <p className="eyebrow">本机保存的任务记录</p>
            <h2 id="challenge-best-heading">{progress.everPassed ? '已通过' : '继续练习'}</h2>
            <p>最好成绩 {progress.bestCorrect}/{progress.bestTotal} · 已完成 {progress.completedCount} 次</p>
          </Card>
        </section>
        <section className="challenge-section" aria-labelledby="challenge-review-heading">
          <div className="challenge-section-heading">
            <div>
              <p className="eyebrow">本次答案回顾</p>
              <h2 id="challenge-review-heading">{incorrectQuestions.length ? '再看看这些题' : '全部答对了'}</h2>
            </div>
          </div>
          {incorrectQuestions.length ? (
            <ol className="challenge-review-list">
              {incorrectQuestions.map((question, index) => (
                <li key={question.questionId}>
                  <span className="challenge-review-number">第 {index + 1} 题</span>
                  <h3>{question.activity.prompt}</h3>
                  <p><strong>参考答案：</strong>{formatCorrectAnswer(question.activity)}</p>
                  <p><strong>解题说明：</strong>{question.activity.explanation}</p>
                </li>
              ))}
            </ol>
          ) : (
            <p className="challenge-inline-note">你认真完成了每一道题，继续保持好奇心！</p>
          )}
        </section>
        <div className="challenge-result-actions">
          <Button type="primary" onClick={onBack}>返回任务</Button>
        </div>
      </div>
    </main>
  );
}
