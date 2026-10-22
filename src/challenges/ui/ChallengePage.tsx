import { useEffect, useMemo, useState } from 'react';
import { Button, Card } from 'animal-island-ui';
import type { AppRoute } from '../../app/router';
import { createChallengeBackup, isChallengeBackupData, parseChallengeBackup } from '../domain/backup';
import type { ChallengeBackup, ChallengeBackupData } from '../domain/backup';
import { mergeChallengeBackupData } from '../domain/backupMerge';
import type { ChallengeBackupMergeSummary } from '../domain/backupMerge';
import type { TaskProgress, WrongQuestionRecord } from '../domain/types';
import type { ChallengeClearScope, ChallengeRecoveryPointSummary } from '../domain/recovery';
import { deriveChallengeGrowth } from '../domain/growth';
import type { ChallengeRecoveryRestoreResult, ChallengeRepository } from '../storage/repository';
import { RevisionConflictError } from '../storage/repository';
import { createChallengeRepository } from '../storage/indexedDbRepository';
import { loadPilotChallengeContent } from '../content/pilotContent';
import type { LoadedPilotContent } from '../content/pilotContent';
import ChallengeCenter from './ChallengeCenter';
import ChallengeGroup from './ChallengeGroup';
import ChallengeGrowth from './ChallengeGrowth';
import ChallengeRunner from './ChallengeRunner';
import ChallengeWrongQuestions from './ChallengeWrongQuestions';
import { getChallengeTaskTitle } from './challengeLabels';
import './challenge.css';

function downloadChallengeBackup(backup: Awaited<ReturnType<typeof createChallengeBackup>>) {
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `starry-island-challenges-${backup.createdAt.replace(/[:.]/g, '-')}.json`;
  anchor.hidden = true;
  document.body.append(anchor);
  try {
    anchor.click();
  } finally {
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 0);
  }
}

type ChallengeRoute = Extract<AppRoute, { kind: 'challengeCenter' | 'challengeGrowth' | 'challengeWrongQuestions' | 'challengeGroup' | 'challengeTask' }>;

type WrongQuestionState =
  | { status: 'loading' }
  | { status: 'ready'; records: WrongQuestionRecord[] }
  | { status: 'error' };

interface PendingBackupImport {
  imported: ChallengeBackupData;
  expectedLocal: ChallengeBackupData;
}

const MAX_BACKUP_FILE_BYTES = 10 * 1024 * 1024;

interface ChallengePageProps {
  route: ChallengeRoute;
  onNavigate: (path: string) => void;
  repository?: ChallengeRepository;
}

export default function ChallengePage({ route, onNavigate, repository: providedRepository }: ChallengePageProps) {
  const repository = useMemo(() => providedRepository ?? createChallengeRepository(), [providedRepository]);
  const [content, setContent] = useState<LoadedPilotContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [contentError, setContentError] = useState<string | null>(null);
  const [progressByTaskId, setProgressByTaskId] = useState<Record<string, TaskProgress>>({});
  const [progressAvailable, setProgressAvailable] = useState(true);
  const [progressLoading, setProgressLoading] = useState(true);
  const [wrongQuestionState, setWrongQuestionState] = useState<WrongQuestionState>({ status: 'loading' });
  const [pendingBackupImport, setPendingBackupImport] = useState<PendingBackupImport | null>(null);
  const [recoveryPoint, setRecoveryPoint] = useState<ChallengeRecoveryPointSummary | null>(null);

  async function refreshTaskProgress() {
    const progress = await repository.getAllTaskProgress().catch(() => null);
    if (!progress) return;
    const progressById: Record<string, TaskProgress> = {};
    for (const item of progress) progressById[item.taskId] = item;
    setProgressByTaskId(progressById);
    setProgressAvailable(true);
  }

  async function clearChallengeData(scope: ChallengeClearScope) {
    const result = await repository.clearChallengeData(scope);
    if (result.recoveryPoint) setRecoveryPoint(result.recoveryPoint);
    await refreshTaskProgress();
    return result;
  }

  async function restoreChallengeData(): Promise<ChallengeRecoveryRestoreResult | null> {
    const result = await repository.restoreRecoveryPoint();
    await refreshTaskProgress();
    if (!result || !result.recoveryPointRetained) setRecoveryPoint(null);
    return result;
  }

  async function exportBackup() {
    const snapshot = await repository.getBackupSnapshot();
    const backup = await createChallengeBackup(snapshot);
    downloadChallengeBackup(backup);
  }

  async function prepareBackupImport(file: File): Promise<ChallengeBackupMergeSummary> {
    setPendingBackupImport(null);
    if (file.size > MAX_BACKUP_FILE_BYTES) {
      throw new Error('备份文件超过 10 MB，无法安全读取；本机记录没有更改。');
    }
    let parsed: unknown;
    try {
      parsed = JSON.parse(await file.text());
    } catch {
      throw new Error('备份文件不是有效的 JSON；本机记录没有更改。');
    }
    let backup: ChallengeBackup;
    try {
      backup = await parseChallengeBackup(parsed);
    } catch {
      throw new Error('备份格式或完整性校验无效；本机记录没有更改。');
    }
    let expectedLocal: ChallengeBackupData;
    try {
      expectedLocal = await repository.getBackupSnapshot();
    } catch {
      throw new Error('本机闯关记录暂时无法读取，不能生成安全预览；现有记录没有更改。');
    }
    if (!isChallengeBackupData(expectedLocal)) {
      throw new Error('本机闯关记录结构异常，暂时不能安全合并；现有记录没有更改。');
    }
    const plan = mergeChallengeBackupData(expectedLocal, backup.data);
    setPendingBackupImport({ imported: backup.data, expectedLocal });
    return plan.summary;
  }

  async function confirmBackupImport() {
    if (!pendingBackupImport) throw new Error('请重新选择备份文件并预览合并内容。');
    try {
      await repository.mergeBackupData(pendingBackupImport.imported, pendingBackupImport.expectedLocal);
    } catch (error) {
      setPendingBackupImport(null);
      if (error instanceof RevisionConflictError) {
        throw new Error('预览后本机记录发生变化，请重新选择文件并查看最新预览。');
      }
      throw new Error('备份没有导入；本机记录没有更改，可以重新预览后再试。');
    }
    setPendingBackupImport(null);
    const progress = await repository.getAllTaskProgress().catch(() => null);
    if (progress) {
      const progressById: Record<string, TaskProgress> = {};
      for (const item of progress) progressById[item.taskId] = item;
      setProgressByTaskId(progressById);
      setProgressAvailable(true);
    }
  }

  useEffect(() => {
    let cancelled = false;
    if (route.kind === 'challengeWrongQuestions') {
      setContent(null);
      setContentError(null);
      setLoading(false);
      return () => { cancelled = true; };
    }
    setLoading(true);
    setContentError(null);
    loadPilotChallengeContent().then(async (loadedContent) => {
      if (cancelled) return;
      setContent(loadedContent);
      setLoading(false);
    }).catch(() => {
      if (cancelled) return;
      setContentError('闯关题库暂时没有载入。你的课程进度没有变化，可以稍后重新打开。');
      setLoading(false);
    });
    return () => { cancelled = true; };
  }, [repository, route.kind]);

  useEffect(() => {
    if (route.kind !== 'challengeWrongQuestions') return;
    let cancelled = false;
    setWrongQuestionState({ status: 'loading' });
    repository.getWrongQuestions().then((records) => {
      if (!cancelled) setWrongQuestionState({ status: 'ready', records });
    }).catch(() => {
      if (!cancelled) setWrongQuestionState({ status: 'error' });
    });
    return () => { cancelled = true; };
  }, [repository, route.kind]);

  useEffect(() => {
    if (route.kind !== 'challengeCenter') return;
    let cancelled = false;
    repository.getRecoveryPoint().then((point) => {
      if (!cancelled) setRecoveryPoint(point ? { createdAt: point.createdAt, expiresAt: point.expiresAt } : null);
    }).catch(() => {
      if (!cancelled) setRecoveryPoint(null);
    });
    return () => { cancelled = true; };
  }, [repository, route.kind]);

  useEffect(() => {
    if (!content) return;
    let cancelled = false;
    setProgressLoading(true);
    repository.getAllTaskProgress().then((entries) => {
      if (cancelled) return;
      const progress: Record<string, TaskProgress> = {};
      for (const item of entries) progress[item.taskId] = item;
      setProgressByTaskId(progress);
      setProgressAvailable(true);
      setProgressLoading(false);
    }).catch(() => {
      if (cancelled) return;
      setProgressAvailable(false);
      setProgressLoading(false);
    });
    return () => { cancelled = true; };
  }, [content, repository, route]);

  useEffect(() => () => {
    if (!providedRepository) repository.close();
  }, [providedRepository, repository]);

  if (route.kind === 'challengeWrongQuestions') {
    if (wrongQuestionState.status === 'loading') {
      return <main className="challenge-page" aria-live="polite" aria-busy="true"><div className="challenge-shell"><h1>正在打开错题本…</h1></div></main>;
    }
    if (wrongQuestionState.status === 'error') {
      return (
        <main className="challenge-page">
          <div className="challenge-shell">
            <Card className="challenge-message-card" color="default">
              <p className="eyebrow">本机数据暂时没有读出</p>
              <h1>错题本暂时无法打开</h1>
              <p>现有闯关记录没有被更改。可以返回闯关中心后再试一次。</p>
              <Button type="primary" onClick={() => onNavigate('/challenges')}>返回闯关中心</Button>
            </Card>
          </div>
        </main>
      );
    }
    return <ChallengeWrongQuestions records={wrongQuestionState.records} onNavigate={onNavigate} />;
  }

  if (loading) {
    return <main className="challenge-page" aria-live="polite" aria-busy="true"><div className="challenge-shell"><h1>正在准备闯关航线…</h1></div></main>;
  }
  if (!content || contentError) {
    return (
      <main className="challenge-page">
        <div className="challenge-shell">
          <Card className="challenge-message-card" color="default">
            <p className="eyebrow">闯关中心</p>
            <h1>挑战暂时没有打开</h1>
            <p>{contentError}</p>
            <Button type="primary" onClick={() => onNavigate('/')}>返回课程目录</Button>
          </Card>
        </div>
      </main>
    );
  }

  if (route.kind === 'challengeCenter') {
    return (
      <ChallengeCenter
        groups={content.groups}
        progressByTaskId={progressByTaskId}
        progressAvailable={progressAvailable}
        onNavigate={onNavigate}
        onExportBackup={exportBackup}
        onPrepareImportBackup={prepareBackupImport}
        onConfirmImportBackup={confirmBackupImport}
        onCancelImportBackup={() => setPendingBackupImport(null)}
        initialRecoveryPoint={recoveryPoint}
        onClearChallengeData={clearChallengeData}
        onRestoreRecoveryPoint={restoreChallengeData}
      />
    );
  }

  if (route.kind === 'challengeGrowth') {
    const summary = deriveChallengeGrowth(content.groups.map(({ group }) => group.definition), Object.values(progressByTaskId));
    return <ChallengeGrowth summary={summary} status={progressLoading ? 'loading' : progressAvailable ? 'ready' : 'error'} onNavigate={onNavigate} />;
  }

  if (route.kind === 'challengeGroup') {
    const loadedGroup = content.groups.find(({ group }) => group.definition.id === route.groupId);
    if (!loadedGroup) return <ChallengeNotFound onNavigate={onNavigate} />;
    return <ChallengeGroup loadedGroup={loadedGroup} progressByTaskId={progressByTaskId} onNavigate={onNavigate} />;
  }

  const taskGroup = content.groups.find(({ group }) => group.definition.tasks.some(({ id }) => id === route.taskId));
  const task = taskGroup?.group.definition.tasks.find(({ id }) => id === route.taskId);
  if (!taskGroup || !task) return <ChallengeNotFound onNavigate={onNavigate} />;
  if (taskGroup.status !== 'ready') {
    return (
      <main className="challenge-page">
        <div className="challenge-shell">
          <Card className="challenge-message-card" color="default">
            <p className="eyebrow">内容审核中</p>
            <h1>这条挑战路线暂时不能开始</h1>
            <p>题库通过必要的内容质量检查后才会开放。</p>
            <Button type="primary" onClick={() => onNavigate(`/challenges/group/${encodeURIComponent(taskGroup.group.definition.id)}`)}>返回挑战任务</Button>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <ChallengeRunner
      loadedGroup={taskGroup}
      task={task}
      taskTitle={getChallengeTaskTitle(taskGroup.group, task)}
      key={task.id}
      repository={repository}
      manifestVersion={content.manifestVersion}
      onNavigate={onNavigate}
    />
  );
}

function ChallengeNotFound({ onNavigate }: { onNavigate: (path: string) => void }) {
  return (
    <main className="challenge-page">
      <div className="challenge-shell">
        <Card className="challenge-message-card" color="default">
          <p className="eyebrow">路线暂时中断</p>
          <h1>没有找到这条挑战路线</h1>
          <p>从闯关中心重新选择一条已经登记的路线吧。</p>
          <Button type="primary" onClick={() => onNavigate('/challenges')}>返回闯关中心</Button>
        </Card>
      </div>
    </main>
  );
}
