import { useState } from 'react';
import { Button } from 'animal-island-ui';
import EmptyState from '../../components/shared/EmptyState';
import { getChallengeCenterPath } from '../../app/router';
import type { WrongQuestionRecord } from '../domain/types';
import { formatCorrectAnswer } from './ChallengeResult';

type WrongQuestionFilter = 'all' | 'learning' | 'mastered';

interface ChallengeWrongQuestionsProps {
  records: WrongQuestionRecord[];
  onNavigate: (path: string) => void;
}

export default function ChallengeWrongQuestions({ records, onNavigate }: ChallengeWrongQuestionsProps) {
  const [filter, setFilter] = useState<WrongQuestionFilter>('all');
  const visibleRecords = records.filter((record) => (
    filter === 'all' || (filter === 'mastered' ? record.correctAttemptStreak >= 2 : record.correctAttemptStreak < 2)
  ));

  return (
    <main className="challenge-page">
      <div className="challenge-shell">
        <header className="challenge-subpage-heading">
          <p className="eyebrow">本机保存 · 不记录完整作答历史</p>
          <h1>错题本</h1>
          <p>挑战中答错的题会保存在这里。之后在两次独立挑战中连续答对，就会标记为已掌握。</p>
          <Button type="default" onClick={() => onNavigate(getChallengeCenterPath())}>返回闯关中心</Button>
        </header>

        <section className="challenge-section" aria-labelledby="wrong-questions-heading">
          <div className="challenge-section-heading">
            <div>
              <p className="eyebrow">共 {records.length} 道错题</p>
              <h2 id="wrong-questions-heading">回顾与巩固</h2>
            </div>
            <div className="challenge-filter-actions" aria-label="错题筛选">
              <Button type={filter === 'all' ? 'primary' : 'default'} aria-pressed={filter === 'all'} onClick={() => setFilter('all')}>全部</Button>
              <Button type={filter === 'learning' ? 'primary' : 'default'} aria-pressed={filter === 'learning'} onClick={() => setFilter('learning')}>待掌握</Button>
              <Button type={filter === 'mastered' ? 'primary' : 'default'} aria-pressed={filter === 'mastered'} onClick={() => setFilter('mastered')}>已掌握</Button>
            </div>
          </div>

          {visibleRecords.length ? (
            <ol className="challenge-wrong-question-list">
              {visibleRecords.map(({ question, wrongCount, lastWrongAt, correctAttemptStreak }) => {
                const mastered = correctAttemptStreak >= 2;
                return (
                  <li key={question.questionId}>
                    <div className="challenge-wrong-question-status">
                      <strong>{mastered ? '已掌握' : `连续答对 ${correctAttemptStreak}/2 次`}</strong>
                      <span>答错 {wrongCount} 次 · 最近一次 {new Date(lastWrongAt).toLocaleDateString('zh-CN')}</span>
                    </div>
                    <h3>{question.activity.prompt}</h3>
                    <p><strong>参考答案：</strong>{formatCorrectAnswer(question.activity)}</p>
                    <p><strong>解题说明：</strong>{question.activity.explanation}</p>
                  </li>
                );
              })}
            </ol>
          ) : (
            <div className="challenge-wrong-empty-status" role="status">
              <EmptyState
                className="challenge-wrong-empty"
                headingLevel={3}
                title={records.length === 0 ? '错题本还是空的' : '这个分类暂时没有题目'}
                description={records.length === 0
                  ? '完成挑战后，答错的题会出现在这里；答对两次后会标记为已掌握。'
                  : '试试切换到“全部”或其他分类。'}
              />
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
