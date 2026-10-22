import { useEffect, useState } from 'react';
import { Button } from 'animal-island-ui';
import type { ChallengeBackupMergeSummary } from '../domain/backupMerge';
import { hasChallengeDataToClear } from '../domain/recovery';
import { getChallengeErrorMessage } from '../domain/errors';
import type {
  ChallengeClearScope,
  ChallengeDataClearResult,
  ChallengeRecoveryPointSummary,
} from '../domain/recovery';
import type { ChallengeRecoveryRestoreResult } from '../storage/repository';

interface ChallengeDataManagementProps {
  initialRecoveryPoint: ChallengeRecoveryPointSummary | null;
  onClear: (scope: ChallengeClearScope) => Promise<ChallengeDataClearResult>;
  onRestore: () => Promise<ChallengeRecoveryRestoreResult | null>;
}

type PendingAction = { kind: 'clear'; scope: ChallengeClearScope } | { kind: 'restore' } | null;

function formatLocalTime(value: string): string {
  return new Date(value).toLocaleString('zh-CN', { dateStyle: 'medium', timeStyle: 'short' });
}

function describeClearedData(result: ChallengeDataClearResult): string {
  const parts: string[] = [];
  if (result.counts.attempts) parts.push(`${result.counts.attempts} 份未完成答题`);
  if (result.counts.taskProgress) parts.push(`${result.counts.taskProgress} 条成绩记录`);
  if (result.counts.recentQuestionAttempts) parts.push(`${result.counts.recentQuestionAttempts} 组最近题目记录`);
  if (result.counts.wrongQuestions) parts.push(`${result.counts.wrongQuestions} 条错题记录`);
  return parts.join('、');
}

function describeRestore(summary: ChallengeBackupMergeSummary): string {
  if (summary.preservedProgressForActiveTasks > 0) {
    return `已恢复可安全合并的闯关记录；${summary.preservedProgressForActiveTasks} 个任务仍在进行，恢复点会保留。完成挑战后可以再次恢复余下记录。`;
  }
  return '已恢复闯关记录；本机进行中的答题已安全保留，恢复点已消费。';
}

export default function ChallengeDataManagement({ initialRecoveryPoint, onClear, onRestore }: ChallengeDataManagementProps) {
  const [recoveryPoint, setRecoveryPoint] = useState(initialRecoveryPoint);
  const [pendingAction, setPendingAction] = useState<PendingAction>(null);
  const [confirmationPhrase, setConfirmationPhrase] = useState('');
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setRecoveryPoint(initialRecoveryPoint);
  }, [initialRecoveryPoint]);

  function requestClear(scope: ChallengeClearScope) {
    setConfirmationPhrase('');
    setStatus(null);
    setError(null);
    setPendingAction({ kind: 'clear', scope });
  }

  async function confirmClear() {
    if (pendingAction?.kind !== 'clear') return;
    setBusy(true);
    setError(null);
    try {
      const result = await onClear(pendingAction.scope);
      setPendingAction(null);
      if (!hasChallengeDataToClear(result.counts)) {
        setStatus('没有找到可清除的闯关记录；现有恢复点没有被替换。');
      } else {
        setRecoveryPoint(result.recoveryPoint);
        const removed = describeClearedData(result);
        setStatus(`已清除${removed ? ` ${removed}` : ''}；${result.recoveryPoint ? `已创建 24 小时恢复点，恢复点有效至 ${formatLocalTime(result.recoveryPoint.expiresAt)}。` : '未创建恢复点，请检查本机存储状态。'}`);
      }
    } catch (caughtError) {
      setError(getChallengeErrorMessage(caughtError, '清除没有完成；本机记录和原恢复点都保持不变，可以稍后重试。'));
    } finally {
      setBusy(false);
    }
  }

  async function confirmRestore() {
    setBusy(true);
    setError(null);
    try {
      const result = await onRestore();
      setPendingAction(null);
      if (!result) {
        setRecoveryPoint(null);
        setStatus('恢复点已过期或不存在；本机记录没有更改。');
        return;
      }
      setRecoveryPoint(result.recoveryPointRetained ? recoveryPoint : null);
      setStatus(describeRestore(result.summary));
    } catch (caughtError) {
      setError(getChallengeErrorMessage(caughtError, '恢复没有完成；恢复点仍保留，本机记录没有更改，可以稍后重试。'));
    } finally {
      setBusy(false);
    }
  }

  function cancelAction() {
    setPendingAction(null);
    setConfirmationPhrase('');
    setError(null);
  }

  const clearingScope = pendingAction?.kind === 'clear' ? pendingAction.scope : null;
  const fullClearConfirmed = confirmationPhrase === '清空闯关数据';

  return (
    <section className="challenge-data-management" aria-labelledby="challenge-data-management-heading">
      <h2 id="challenge-data-management-heading">数据管理与恢复</h2>
      <p>可以按类别清除闯关数据。清除前请先导出本机备份；24 小时恢复点不能替代长期备份，也不能防止浏览器清理或设备损坏。每次实际清除前都会在同一事务中创建或替换恢复点；课程进度和个人设置不受影响。</p>
      <div className="challenge-data-management-actions">
        <Button type="default" disabled={busy} onClick={() => requestClear('in-progress')}>清除未完成答题</Button>
        <Button type="default" disabled={busy} onClick={() => requestClear('wrong-questions')}>清除错题本</Button>
        <Button type="default" disabled={busy} onClick={() => requestClear('all')}>清除全部闯关数据</Button>
      </div>

      {recoveryPoint && (
        <div className="challenge-recovery-point">
          <p>本机有一个恢复点，有效至 {formatLocalTime(recoveryPoint.expiresAt)}。新清除操作会自动替换它。</p>
          <Button type="default" disabled={busy} onClick={() => { setStatus(null); setError(null); setPendingAction({ kind: 'restore' }); }}>
            恢复已清除的闯关记录
          </Button>
        </div>
      )}

      {clearingScope && (
        <div className="challenge-data-confirmation" role="group" aria-label="清除确认">
          <p>
            {clearingScope === 'in-progress' && '将清除本机所有未完成答题，并保留成绩和错题本。'}
            {clearingScope === 'wrong-questions' && '将清除本机错题本，并保留未完成答题和成绩。'}
            {clearingScope === 'all' && '将清除本机未完成答题、闯关成绩、最近题目记录和错题本。课程进度与个人设置不会改变。'}
            {' '}实际清除前会保存恢复点；新恢复点成功写入前，旧恢复点和现有数据不会被删除。
          </p>
          {clearingScope === 'all' && (
            <label className="challenge-data-confirmation-phrase">
              输入“清空闯关数据”以确认
              <input
                aria-label="输入“清空闯关数据”以确认"
                autoComplete="off"
                value={confirmationPhrase}
                onChange={(event) => setConfirmationPhrase(event.target.value)}
              />
            </label>
          )}
          <div className="challenge-data-management-actions">
            <Button type="primary" disabled={busy || (clearingScope === 'all' && !fullClearConfirmed)} onClick={() => void confirmClear()}>
              {clearingScope === 'in-progress' && '确认清除未完成答题'}
              {clearingScope === 'wrong-questions' && '确认清除错题本'}
              {clearingScope === 'all' && '确认清除全部闯关数据'}
            </Button>
            <Button type="default" disabled={busy} onClick={cancelAction}>取消</Button>
          </div>
        </div>
      )}

      {pendingAction?.kind === 'restore' && (
        <div className="challenge-data-confirmation" role="group" aria-label="恢复确认">
          <p>恢复会将恢复点中的记录安全合并到本机；进行中的答题优先保留。恢复全部成功后，这个恢复点会被消费。</p>
          <div className="challenge-data-management-actions">
            <Button type="primary" disabled={busy} onClick={() => void confirmRestore()}>确认恢复闯关记录</Button>
            <Button type="default" disabled={busy} onClick={cancelAction}>取消</Button>
          </div>
        </div>
      )}

      {status && <p className="challenge-data-management-status" role="status">{status}</p>}
      {error && <p className="challenge-data-management-status" role="alert">{error}</p>}
    </section>
  );
}
