import { useCallback, useEffect, useState } from 'react';
import { Button, Card } from 'animal-island-ui';
import { getChallengeGroupPath } from '../../app/router';
import type { ChallengeRepository } from '../storage/repository';
import type { LoadedPilotGroup } from '../content/pilotContent';
import type { ChallengeAnswer, ChallengeAttempt, ChallengeResult as ChallengeResultData, ChallengeTaskDefinition, TaskProgress } from '../domain/types';
import { assemblePaper } from '../domain/assemble';
import { finalizeAttempt, submitFirstAnswer } from '../domain/attempt';
import ChallengeActivityRenderer from './ChallengeActivityRenderer';
import ChallengeResult from './ChallengeResult';

interface ChallengeRunnerProps {
  loadedGroup: LoadedPilotGroup;
  task: ChallengeTaskDefinition;
  repository: ChallengeRepository;
  manifestVersion: string;
  taskTitle: string;
  onNavigate: (path: string) => void;
}

interface PendingAnswer {
  nextAttempt: ChallengeAttempt;
}

interface CompletedResult {
  attempt: ChallengeAttempt;
  result: ChallengeResultData;
  progress: TaskProgress;
}

type LoadState = 'loading' | 'ready' | 'error';

async function completeSavedAttempt(
  repository: ChallengeRepository,
  attempt: ChallengeAttempt,
  previousProgress: TaskProgress | null,
): Promise<CompletedResult> {
  const update = finalizeAttempt(attempt, previousProgress, new Date().toISOString());
  await repository.completeAttempt(attempt.taskId, attempt.revision, update.completedAttempt, update.progress);
  return { attempt: update.completedAttempt, result: update.result, progress: update.progress };
}

export default function ChallengeRunner({ loadedGroup, task, repository, manifestVersion, taskTitle, onNavigate }: ChallengeRunnerProps) {
  const [loadState, setLoadState] = useState<LoadState>('loading');
  const [loadError, setLoadError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState<ChallengeAttempt | null>(null);
  const [progress, setProgress] = useState<TaskProgress | null>(null);
  const [restored, setRestored] = useState(false);
  const [pendingAnswer, setPendingAnswer] = useState<PendingAnswer | null>(null);
  const [completedResult, setCompletedResult] = useState<CompletedResult | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [reloadRevision, setReloadRevision] = useState(0);

  const reload = useCallback(() => setReloadRevision((revision) => revision + 1), []);

  useEffect(() => {
    let cancelled = false;
    setLoadState('loading');
    setLoadError(null);
    setAttempt(null);
    setProgress(null);
    setPendingAnswer(null);
    setCompletedResult(null);
    setSaveError(null);
    repository.getActiveAttempt(task.id).then(async (active) => {
      const savedProgress = await repository.getTaskProgress(task.id);
      if (cancelled) return;
      setProgress(savedProgress);
      if (active) {
        if (active.currentIndex === active.questions.length) {
          const completed = await completeSavedAttempt(repository, active, savedProgress);
          if (cancelled) return;
          setProgress(completed.progress);
          setCompletedResult(completed);
          setRestored(true);
          setLoadState('ready');
          return;
        }
        setAttempt(active);
        setRestored(true);
      }
      setLoadState('ready');
    }).catch(() => {
      if (cancelled) return;
      setLoadError('本机闯关记录暂时没有读出来。重新读取后可以继续，课程学习进度不会受影响。');
      setLoadState('error');
    });
    return () => { cancelled = true; };
  }, [repository, task.id, reloadRevision]);

  async function startAttempt() {
    if (busy) return;
    setBusy(true);
    setSaveError(null);
    try {
      const recentIds = await repository.getRecentQuestionIds();
      const seed = crypto.randomUUID();
      const questions = assemblePaper(task, loadedGroup.candidates, seed, recentIds);
      const startedAt = new Date().toISOString();
      const nextAttempt: ChallengeAttempt = {
        attemptId: crypto.randomUUID(),
        taskId: task.id,
        difficulty: task.difficulty,
        status: 'in-progress',
        questions,
        assemblySeed: seed,
        contentManifestVersion: manifestVersion,
        answers: {},
        currentIndex: 0,
        startedAt,
        elapsedMs: 0,
        revision: 0,
      };
      await repository.beginAttempt(nextAttempt);
      setAttempt(nextAttempt);
      setRestored(false);
    } catch (error) {
      const existing = await repository.getActiveAttempt(task.id).catch(() => null);
      if (existing) {
        setAttempt(existing);
        setRestored(true);
        setLoadState('ready');
        setSaveError('另一个页面已经开始了这个任务，已载入那里的作答进度。');
      } else {
        setSaveError(error instanceof Error ? error.message : '题目暂时无法准备好，请稍后重试。');
      }
    } finally {
      setBusy(false);
    }
  }

  async function persistPendingAnswer(pending: PendingAnswer) {
    if (!attempt || busy) return;
    setBusy(true);
    setSaveError(null);
    try {
      const saved = await repository.saveAnswer(task.id, attempt.revision, pending.nextAttempt);
      setAttempt(saved);
      setPendingAnswer(null);
      if (saved.currentIndex === saved.questions.length) {
        const completed = await completeSavedAttempt(repository, saved, await repository.getTaskProgress(task.id));
        setProgress(completed.progress);
        setCompletedResult(completed);
      }
    } catch (error) {
      const current = await repository.getActiveAttempt(task.id).catch(() => null);
      if (current?.revision === pending.nextAttempt.revision) {
        setAttempt(current);
        setPendingAnswer(null);
        setSaveError('全部答案已保存，但成绩暂时没有完成记录。请重试保存成绩。');
      } else {
        setPendingAnswer(pending);
        setSaveError(error instanceof Error && error.name === 'RevisionConflictError'
          ? '这个任务在另一个页面发生了变化。请重新读取已保存进度后继续。'
          : '答案还没有保存成功。请重试保存，或退出后再恢复这次挑战。');
      }
    } finally {
      setBusy(false);
    }
  }

  function submitAnswer(answer: ChallengeAnswer) {
    if (!attempt || busy || pendingAnswer) return;
    const question = attempt.questions[attempt.currentIndex];
    if (!question) return;
    const transition = submitFirstAnswer(attempt, question.questionId, answer);
    const elapsedMs = Math.max(attempt.elapsedMs, Date.now() - Date.parse(attempt.startedAt));
    void persistPendingAnswer({
      nextAttempt: { ...transition.attempt, elapsedMs },
    });
  }

  async function retryComplete() {
    if (!attempt || attempt.currentIndex !== attempt.questions.length || busy) return;
    setBusy(true);
    setSaveError(null);
    try {
      const savedProgress = await repository.getTaskProgress(task.id);
      const completed = await completeSavedAttempt(repository, attempt, savedProgress);
      setProgress(completed.progress);
      setCompletedResult(completed);
    } catch (error) {
      setSaveError(error instanceof Error && error.name === 'RevisionConflictError'
        ? '另一页面已更改这次挑战。重新读取本机进度后再继续。'
        : '挑战结果还没有保存成功。请重试完成保存。');
    } finally {
      setBusy(false);
    }
  }

  async function discardAttempt() {
    if (!attempt || busy) return;
    const confirmed = window.confirm('放弃后，这次未完成的闯关记录会删除，也不会计入成绩。要放弃吗？');
    if (!confirmed) return;
    setBusy(true);
    setSaveError(null);
    try {
      await repository.discardAttempt(task.id, attempt.revision);
      setAttempt(null);
      setPendingAnswer(null);
      setRestored(false);
    } catch {
      setSaveError('这次挑战在另一个页面发生了变化。请重新读取本机进度。');
    } finally {
      setBusy(false);
    }
  }

  if (completedResult) {
    return (
      <ChallengeResult
        attempt={completedResult.attempt}
        result={completedResult.result}
        progress={completedResult.progress}
        taskTitle={taskTitle}
        onBack={() => onNavigate(getChallengeGroupPath(loadedGroup.group.definition.id))}
      />
    );
  }

  if (loadState === 'loading') {
    return <ChallengeLoading message="正在读取本机闯关记录…" />;
  }
  if (loadState === 'error') {
    return (
      <ChallengeMessage title="暂时无法读取挑战" message={loadError ?? '请重新读取本机进度。'} onAction={reload} actionLabel="重新读取" />
    );
  }

  if (!attempt) {
    return (
      <main className="challenge-page">
        <div className="challenge-shell">
          <header className="challenge-subpage-heading">
            <Button type="text" onClick={() => onNavigate(getChallengeGroupPath(loadedGroup.group.definition.id))}>返回任务列表</Button>
            <p className="eyebrow">{task.difficulty === 'basic' ? '基础闯关' : task.difficulty === 'advanced' ? '进阶闯关' : '高阶闯关'}</p>
            <h1>{taskTitle}</h1>
          <p>{task.targetCount} 道题 · 不限时 · 首次提交后不能修改答案</p>
          </header>
          {progress && <p className="challenge-inline-note">最好成绩 {progress.bestCorrect}/{progress.bestTotal} · 已完成 {progress.completedCount} 次</p>}
          {saveError && <p className="challenge-error" role="alert">{saveError}</p>}
          <Card className="challenge-start-card" color="default">
            <h2>准备开始了吗？</h2>
            <ul>
              <li>每道题只提交一次答案。</li>
              <li>完成全部题目后，可以查看成绩和解题讲解。</li>
              <li>离开或刷新后可以继续这次挑战。</li>
            </ul>
            <Button type="primary" disabled={busy} onClick={() => void startAttempt()}>{busy ? '正在准备题目…' : progress ? '再次挑战' : '开始挑战'}</Button>
          </Card>
        </div>
      </main>
    );
  }

  const question = attempt.questions[attempt.currentIndex];
  return (
    <main className="challenge-page">
      <div className="challenge-shell">
        <header className="challenge-runner-heading">
          <Button type="text" onClick={() => onNavigate(getChallengeGroupPath(loadedGroup.group.definition.id))}>返回任务列表</Button>
          <p className="eyebrow">{task.difficulty === 'basic' ? '基础闯关' : task.difficulty === 'advanced' ? '进阶闯关' : '高阶闯关'}</p>
          <h1>{taskTitle}</h1>
          <div className="challenge-runner-progress" role="progressbar" aria-label={`题目进度 ${Math.min(attempt.currentIndex + 1, attempt.questions.length)}/${attempt.questions.length}`} aria-valuemin={0} aria-valuemax={attempt.questions.length} aria-valuenow={attempt.currentIndex}>
            <span>已完成 {attempt.currentIndex}/{attempt.questions.length} 题</span>
            {restored && <strong>已恢复上次保存的进度</strong>}
          </div>
        </header>
        {saveError && <p className="challenge-error" role="alert">{saveError}</p>}
        {pendingAnswer && (
          <div className="challenge-save-actions">
            <Button type="primary" disabled={busy} onClick={() => void persistPendingAnswer(pendingAnswer)}>重试保存答案</Button>
            <Button type="default" disabled={busy} onClick={reload}>重新读取已保存进度</Button>
          </div>
        )}
        {attempt.currentIndex === attempt.questions.length ? (
          <ChallengeMessage title="答案已保存，正在完成本次挑战" message="本次成绩还没有写入成功。可以重试保存，不会重复提交题目。" onAction={() => void retryComplete()} actionLabel={busy ? '正在保存成绩…' : '重试保存成绩'} />
        ) : question ? (
          <>
            <ChallengeActivityRenderer key={question.questionId} activity={question.activity} disabled={busy || Boolean(pendingAnswer)} onAnswer={submitAnswer} />
            <div className="challenge-runner-footer">
              <Button type="default" disabled={busy} onClick={() => void discardAttempt()}>放弃本次闯关</Button>
              <span>答案确认保存后会进入下一题，完成后再显示结果。</span>
            </div>
          </>
        ) : (
          <ChallengeMessage title="题目状态需要恢复" message="已保存的题目进度不完整。重新读取后可以继续检查。" onAction={reload} actionLabel="重新读取进度" />
        )}
      </div>
    </main>
  );
}

function ChallengeLoading({ message }: { message: string }) {
  return <main className="challenge-page" aria-live="polite" aria-busy="true"><div className="challenge-shell"><h1>{message}</h1></div></main>;
}

function ChallengeMessage({ title, message, onAction, actionLabel }: { title: string; message: string; onAction: () => void; actionLabel: string }) {
  return (
    <main className="challenge-page">
      <div className="challenge-shell">
        <Card className="challenge-message-card" color="default">
          <p className="eyebrow">本机闯关记录</p>
          <h1>{title}</h1>
          <p>{message}</p>
          <Button type="primary" onClick={onAction}>{actionLabel}</Button>
        </Card>
      </div>
    </main>
  );
}
