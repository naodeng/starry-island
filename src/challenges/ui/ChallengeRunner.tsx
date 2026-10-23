import { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Card } from 'animal-island-ui';
import { getChallengeGroupPath } from '../../app/router';
import type { ChallengeRepository } from '../storage/repository';
import { acquireChallengeWriterLease, type ChallengeWriterLease } from '../storage/writerLock';
import type { LoadedPilotGroup } from '../content/pilotContent';
import type { ChallengeAnswer, ChallengeAttempt, ChallengeResult as ChallengeResultData, ChallengeTaskDefinition, TaskProgress } from '../domain/types';
import { CURRENT_ATTEMPT_SNAPSHOT_SCHEMA_VERSION } from '../domain/snapshotSchema';
import { assemblePaper } from '../domain/assemble';
import { finalizeAttempt, submitFirstAnswer } from '../domain/attempt';
import { classifyChallengeError, getChallengeErrorMessage } from '../domain/errors';
import { getChallengeDensityTier } from './densityTier';
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

function stableSerialize(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(stableSerialize).join(',')}]`;
  if (typeof value === 'object' && value !== null) {
    const record = value as Record<string, unknown>;
    return `{${Object.keys(record).sort().map((key) => `${JSON.stringify(key)}:${stableSerialize(record[key])}`).join(',')}}`;
  }
  return JSON.stringify(value) ?? 'undefined';
}

function isSameAttemptSnapshot(left: ChallengeAttempt, right: ChallengeAttempt): boolean {
  return stableSerialize(left) === stableSerialize(right);
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
  const [safetyPaused, setSafetyPaused] = useState(false);
  const [restored, setRestored] = useState(false);
  const [pendingAnswer, setPendingAnswer] = useState<PendingAnswer | null>(null);
  const [completedResult, setCompletedResult] = useState<CompletedResult | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [waitingForWriter, setWaitingForWriter] = useState(false);
  const [reloadRevision, setReloadRevision] = useState(0);
  const writerLeaseRef = useRef<ChallengeWriterLease | null>(null);
  const lockControllerRef = useRef<AbortController | null>(null);

  function confirmPendingAnswerAbandonment(): boolean {
    return !pendingAnswer || window.confirm('本题答案尚未保存。重新读取或离开本页会放弃这个答案，已确认保存的进度仍会保留。要继续吗？');
  }

  const reload = useCallback(() => {
    if (!confirmPendingAnswerAbandonment()) return;
    setReloadRevision((revision) => revision + 1);
  }, [pendingAnswer]);

  function releaseWriterLease() {
    writerLeaseRef.current?.release();
    writerLeaseRef.current = null;
  }

  function containsDisabledQuestion(savedAttempt: ChallengeAttempt): boolean {
    return savedAttempt.questions.some(({ questionId }) => loadedGroup.disabledQuestionIds.includes(questionId));
  }

  useEffect(() => {
    let cancelled = false;
    const lockController = new AbortController();
    lockControllerRef.current = lockController;
    setLoadState('loading');
    setLoadError(null);
    setAttempt(null);
    setProgress(null);
    setSafetyPaused(false);
    setWaitingForWriter(false);
    setPendingAnswer(null);
    setCompletedResult(null);
    setSaveError(null);
    const load = async () => {
      let active = await repository.getActiveAttempt(task.id);
      if (active) {
        setWaitingForWriter(true);
        const lease = await acquireChallengeWriterLease(task.id, { signal: lockController.signal });
        if (cancelled) {
          lease?.release();
          return;
        }
        writerLeaseRef.current = lease;
        active = await repository.getActiveAttempt(task.id);
        if (!active) releaseWriterLease();
      }
      if (active && containsDisabledQuestion(active)) {
        releaseWriterLease();
        if (cancelled) return;
        setWaitingForWriter(false);
        setSafetyPaused(true);
        setLoadState('ready');
        return;
      }
      const savedProgress = await repository.getTaskProgress(task.id);
      if (cancelled) return;
      setWaitingForWriter(false);
      setProgress(savedProgress);
      if (active) {
        if (active.currentIndex === active.questions.length) {
          const completed = await completeSavedAttempt(repository, active, savedProgress);
          if (cancelled) return;
          setProgress(completed.progress);
          setCompletedResult(completed);
          setRestored(true);
          releaseWriterLease();
          setLoadState('ready');
          return;
        }
        setAttempt(active);
        setRestored(true);
      }
      setLoadState('ready');
    };
    void load().catch((error: unknown) => {
      if (cancelled) return;
      releaseWriterLease();
      setWaitingForWriter(false);
      setLoadError(getChallengeErrorMessage(error, '本机闯关记录暂时没有读出来。重新读取后可以继续，课程学习进度不会受影响。'));
      setLoadState('error');
    });
    return () => {
      cancelled = true;
      lockControllerRef.current?.abort();
      lockControllerRef.current = null;
      lockController.abort();
      releaseWriterLease();
    };
  }, [loadedGroup.disabledQuestionIds, repository, task.id, reloadRevision]);

  async function startAttempt() {
    if (busy) return;
    setBusy(true);
    setWaitingForWriter(true);
    setSaveError(null);
    let lockAcquired = false;
    const lockController = new AbortController();
    lockControllerRef.current = lockController;
    try {
      const lease = await acquireChallengeWriterLease(task.id, { signal: lockController.signal });
      if (lockController.signal.aborted) {
        lease?.release();
        return;
      }
      writerLeaseRef.current = lease;
      lockAcquired = true;
      setWaitingForWriter(false);

      const existing = await repository.getActiveAttempt(task.id);
      if (existing) {
        if (containsDisabledQuestion(existing)) {
          setSafetyPaused(true);
          setLoadState('ready');
          releaseWriterLease();
          return;
        }
        const savedProgress = await repository.getTaskProgress(task.id);
        setProgress(savedProgress);
        if (existing.currentIndex === existing.questions.length) {
          const completed = await completeSavedAttempt(repository, existing, savedProgress);
          setProgress(completed.progress);
          setCompletedResult(completed);
          releaseWriterLease();
        } else {
          setAttempt(existing);
          setRestored(true);
        }
        setLoadState('ready');
        return;
      }

      if (loadedGroup.status !== 'ready') {
        releaseWriterLease();
        setLoadState('ready');
        return;
      }

      const recentIds = await repository.getRecentQuestionIds();
      const seed = crypto.randomUUID();
      const questions = assemblePaper(task, loadedGroup.candidates, seed, recentIds);
      const startedAt = new Date().toISOString();
      const nextAttempt: ChallengeAttempt = {
        attemptId: crypto.randomUUID(),
        taskId: task.id,
        difficulty: task.difficulty,
        status: 'in-progress',
        snapshotSchemaVersion: CURRENT_ATTEMPT_SNAPSHOT_SCHEMA_VERSION,
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
      if (lockController.signal.aborted) return;
      if (!lockAcquired) {
        setSaveError(getChallengeErrorMessage(error, '暂时无法锁定本次挑战，请稍后重试。'));
        return;
      }
      const existing = await repository.getActiveAttempt(task.id).catch(() => null);
      if (existing) {
        if (containsDisabledQuestion(existing)) {
          setSafetyPaused(true);
          setLoadState('ready');
          releaseWriterLease();
          return;
        }
        setAttempt(existing);
        setRestored(true);
        setLoadState('ready');
        setSaveError('另一个页面已经开始了这个任务，已载入那里的作答进度。');
      } else {
        releaseWriterLease();
        setSaveError(getChallengeErrorMessage(error, '题目暂时无法准备好，请稍后重试。'));
      }
    } finally {
      if (lockControllerRef.current === lockController) lockControllerRef.current = null;
      setWaitingForWriter(false);
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
        releaseWriterLease();
      }
    } catch (error) {
      const guidance = classifyChallengeError(error);
      const current = await repository.getActiveAttempt(task.id).catch(() => null);
      if (current && isSameAttemptSnapshot(current, pending.nextAttempt)) {
        setAttempt(current);
        setPendingAnswer(null);
        setSaveError(current.currentIndex === current.questions.length
          ? guidance.kind === 'storage-full'
            ? `全部答案都已保存，但成绩还没有写入。${guidance.message}`
            : '全部答案已保存，但成绩暂时没有完成记录。请重试保存成绩。'
          : null);
      } else {
        setPendingAnswer(pending);
        setSaveError(guidance.kind === 'storage-full'
          ? `本题答案尚未保存。这个答案暂时只保留在当前页面内，关闭或刷新会丢失；已确认保存的答案仍在本机。${guidance.message}`
          : getChallengeErrorMessage(error, '答案还没有保存成功。请重试保存，或退出后再恢复这次挑战。'));
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
      releaseWriterLease();
    } catch (error) {
      setSaveError(getChallengeErrorMessage(error, '挑战结果还没有保存成功。请重试完成保存。'));
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
      releaseWriterLease();
    } catch (error) {
      setSaveError(getChallengeErrorMessage(error, '这次挑战没有放弃成功。请重新读取本机进度后再试。'));
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
        learningTasks={loadedGroup.learningTasks}
        onNavigate={onNavigate}
        onBack={() => onNavigate(getChallengeGroupPath(loadedGroup.group.definition.id))}
      />
    );
  }

  if (loadState === 'loading') {
    return <ChallengeLoading message={waitingForWriter
      ? '这次挑战正在另一个页面进行，当前页面会在它结束或关闭后自动接管。'
      : '正在读取本机闯关记录…'} />;
  }
  if (loadState === 'error') {
    return (
      <ChallengeMessage title="暂时无法读取挑战" message={loadError ?? '请重新读取本机进度。'} onAction={reload} actionLabel="重新读取" />
    );
  }

  if (safetyPaused) {
    return <ChallengeMessage
      title="这次挑战暂时暂停"
      message="这次挑战中的题目已被标记停用。本机已保留原作答记录，不会继续答题或登记成绩。请返回挑战任务，等待题库更新后再继续。"
      onAction={() => onNavigate(getChallengeGroupPath(loadedGroup.group.definition.id))}
      actionLabel="返回挑战任务"
    />;
  }

  if (!attempt && loadedGroup.status !== 'ready') {
    return <ChallengeMessage
      title="这条挑战路线暂时不能开始"
      message="题库通过必要的内容质量检查后才会开放。"
      onAction={() => onNavigate(getChallengeGroupPath(loadedGroup.group.definition.id))}
      actionLabel="返回挑战任务"
    />;
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
            <Button type="primary" disabled={busy} onClick={() => void startAttempt()}>{busy ? (waitingForWriter ? '正在等待另一页面…' : '正在准备题目…') : progress ? '再次挑战' : '开始挑战'}</Button>
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
          <Button type="text" onClick={() => {
            if (!confirmPendingAnswerAbandonment()) return;
            onNavigate(getChallengeGroupPath(loadedGroup.group.definition.id));
          }}>返回任务列表</Button>
          <p className="eyebrow">{task.difficulty === 'basic' ? '基础闯关' : task.difficulty === 'advanced' ? '进阶闯关' : '高阶闯关'}</p>
          <h1>{taskTitle}</h1>
          <div className="challenge-runner-progress" role="progressbar" aria-label="已完成题数" aria-valuemin={0} aria-valuemax={attempt.questions.length} aria-valuenow={attempt.currentIndex} aria-valuetext={`已完成 ${attempt.currentIndex}/${attempt.questions.length} 题`}>
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
            <ChallengeActivityRenderer key={question.questionId} activity={question.activity} disabled={busy || Boolean(pendingAnswer)} densityTier={getChallengeDensityTier(loadedGroup.group.definition.grade)} onAnswer={submitAnswer} />
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
