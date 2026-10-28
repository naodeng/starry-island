import { useEffect, useState } from 'react';
import { Button } from 'animal-island-ui';
import type { ChallengeBackupMergeSummary } from '../domain/backupMerge';
import type { QuarantineNormalization } from '../domain/quarantineRecovery';
import { hasChallengeDataToClear } from '../domain/recovery';
import { getChallengeErrorMessage } from '../domain/errors';
import type {
  ChallengeClearScope,
  ChallengeDataClearResult,
  ChallengeRecoveryPointSummary,
} from '../domain/recovery';
import type {
  ChallengeRecoveryRestoreResult,
  QuarantineRecoveryBlockReason,
  QuarantineRecoveryPreview,
  QuarantinedRecordPage,
  QuarantinedRecordSummary,
  QuarantineRestoreResult,
} from '../storage/repository';

interface ChallengeDataManagementProps {
  initialRecoveryPoint: ChallengeRecoveryPointSummary | null;
  quarantinedRecordCount: number | null;
  onClear: (scope: ChallengeClearScope) => Promise<ChallengeDataClearResult>;
  onRestore: () => Promise<ChallengeRecoveryRestoreResult | null>;
  onExportQuarantinedRecords: () => Promise<void>;
  onLoadQuarantinedRecordPage: (afterKey?: IDBValidKey) => Promise<QuarantinedRecordPage>;
  onPreviewQuarantinedRecord: (quarantineId: IDBValidKey) => Promise<QuarantineRecoveryPreview>;
  onCancelQuarantinedRecordPreview: (token: string) => void;
  onConfirmQuarantinedRecordRestore: (token: string) => Promise<QuarantineRestoreResult>;
}

type PendingAction = { kind: 'clear'; scope: ChallengeClearScope } | { kind: 'restore' } | null;
type QuarantineListState =
  | { status: 'closed' }
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'ready'; page: QuarantinedRecordPage; cursors: Array<IDBValidKey | undefined> };

const SOURCE_STORE_LABELS: Readonly<Record<string, string>> = {
  attempts: '闯关答题',
  taskProgress: '闯关成绩',
  wrongQuestions: '错题记录',
  challengeMeta: '闯关元数据',
};

const BLOCK_REASON_LABELS: Readonly<Record<QuarantineRecoveryBlockReason, string>> = {
  'unsupported-source': '数据来源不支持安全恢复，原记录仍保存在隔离区。',
  'unknown-reason': '隔离原因无法确认，原记录仍保存在隔离区。',
  'invalid-record': '记录未通过完整性校验，暂时不能恢复。',
  'unsupported-snapshot-version': '快照版本不受支持，原记录仍保存在隔离区。',
  'source-key-mismatch': '记录与原存储键不一致，暂时不能恢复。',
  'inactive-recovery-point': '恢复点已过期或尚未生效，原记录仍保存在隔离区。',
  'uncomparable-value': '记录结构无法安全比较，原记录仍保存在隔离区。',
  'target-conflict': '目标位置已有记录，原隔离记录仍保留；不会覆盖或合并。',
};

function sourceStoreLabel(sourceStore: string): string {
  return SOURCE_STORE_LABELS[sourceStore] ?? '其他闯关数据';
}

function safeKeyLabel(key: IDBValidKey): string {
  if (typeof key === 'string') return key;
  if (typeof key === 'number' && Number.isFinite(key)) return String(key);
  return '复合键';
}

function formatQuarantineTime(value: string): string {
  const date = new Date(value);
  return Number.isFinite(date.getTime())
    ? date.toLocaleString('zh-CN', { dateStyle: 'medium', timeStyle: 'short' })
    : '时间无法读取';
}

function describeNormalization(normalization: QuarantineNormalization): string {
  if (normalization === 'attempt-snapshot-v1') return '只补入已知结构版本 1';
  if (normalization === 'recovery-point-snapshot-v1') return '按现有规则整理恢复点中的旧版答题快照';
  return '不修改记录内容';
}

function describeBlockedRecord(item: QuarantinedRecordSummary): string {
  return BLOCK_REASON_LABELS[item.blockReason ?? 'invalid-record'];
}

function formatLocalTime(value: string): string {
  return new Date(value).toLocaleString('zh-CN', { dateStyle: 'medium', timeStyle: 'short' });
}

function describeClearedData(result: ChallengeDataClearResult): string {
  const parts: string[] = [];
  if (result.counts.attempts) parts.push(`${result.counts.attempts} 份未完成答题`);
  if (result.counts.taskProgress) parts.push(`${result.counts.taskProgress} 条成绩记录`);
  if (result.counts.recentQuestionAttempts) parts.push(`${result.counts.recentQuestionAttempts} 组最近题目记录`);
  if (result.counts.wrongQuestions) parts.push(`${result.counts.wrongQuestions} 条错题记录`);
  if (result.counts.quarantinedRecords) parts.push(`${result.counts.quarantinedRecords} 条隔离区原始记录（永久删除）`);
  return parts.join('、');
}

function hasRecoverableDataToClear(counts: ChallengeDataClearResult['counts']): boolean {
  return counts.attempts > 0
    || counts.taskProgress > 0
    || counts.recentQuestionAttempts > 0
    || counts.wrongQuestions > 0;
}

function describeRestore(summary: ChallengeBackupMergeSummary): string {
  if (summary.preservedProgressForActiveTasks > 0) {
    return `已恢复可安全合并的闯关记录；${summary.preservedProgressForActiveTasks} 个任务仍在进行，恢复点会保留。完成挑战后可以再次恢复余下记录。`;
  }
  return '已恢复闯关记录；本机进行中的答题已安全保留，恢复点已消费。';
}

export default function ChallengeDataManagement({
  initialRecoveryPoint,
  quarantinedRecordCount,
  onClear,
  onRestore,
  onExportQuarantinedRecords,
  onLoadQuarantinedRecordPage,
  onPreviewQuarantinedRecord,
  onCancelQuarantinedRecordPreview,
  onConfirmQuarantinedRecordRestore,
}: ChallengeDataManagementProps) {
  const [recoveryPoint, setRecoveryPoint] = useState(initialRecoveryPoint);
  const [pendingAction, setPendingAction] = useState<PendingAction>(null);
  const [confirmationPhrase, setConfirmationPhrase] = useState('');
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [quarantineList, setQuarantineList] = useState<QuarantineListState>({ status: 'closed' });
  const [quarantinePreview, setQuarantinePreview] = useState<QuarantineRecoveryPreview | null>(null);
  const [quarantineBusy, setQuarantineBusy] = useState(false);
  const [quarantineStatus, setQuarantineStatus] = useState<string | null>(null);
  const [quarantineError, setQuarantineError] = useState<string | null>(null);

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
        const onlyQuarantinedRecords = result.counts.quarantinedRecords > 0 && !hasRecoverableDataToClear(result.counts);
        setRecoveryPoint(result.recoveryPoint ?? (onlyQuarantinedRecords ? recoveryPoint : null));
        const removed = describeClearedData(result);
        const recoveryNotice = result.recoveryPoint
          ? `已创建 24 小时恢复点，恢复点有效至 ${formatLocalTime(result.recoveryPoint.expiresAt)}。`
          : result.counts.quarantinedRecords > 0 && !hasRecoverableDataToClear(result.counts)
            ? '隔离区原始记录已永久删除，且没有纳入恢复点。'
            : '未创建恢复点，请检查本机存储状态。';
        setStatus(`已清除${removed ? ` ${removed}` : ''}；${recoveryNotice}`);
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

  async function exportQuarantinedRecords() {
    setBusy(true);
    setError(null);
    try {
      await onExportQuarantinedRecords();
      setStatus('隔离记录已下载到此设备；文件可能包含题目和作答内容，没有上传任何数据。');
    } catch {
      setError('隔离记录没有导出；本机数据没有更改，可以稍后重试。');
    } finally {
      setBusy(false);
    }
  }

  async function loadQuarantinedPage(afterKey: IDBValidKey | undefined, cursors: Array<IDBValidKey | undefined>) {
    setQuarantineBusy(true);
    setQuarantineError(null);
    setQuarantineStatus(null);
    setQuarantinePreview(null);
    try {
      const page = await onLoadQuarantinedRecordPage(afterKey);
      setQuarantineList({ status: 'ready', page, cursors });
    } catch {
      setQuarantineList({ status: 'error' });
      setQuarantineError('隔离记录暂时无法读取；本机数据没有更改，可以稍后重试。');
    } finally {
      setQuarantineBusy(false);
    }
  }

  function cancelQuarantinePreview() {
    if (quarantinePreview?.status === 'eligible') {
      onCancelQuarantinedRecordPreview(quarantinePreview.token);
    }
    setQuarantinePreview(null);
    setQuarantineError(null);
    setQuarantineStatus(null);
  }

  async function toggleQuarantineList() {
    if (quarantineList.status !== 'closed') {
      cancelQuarantinePreview();
      setQuarantineList({ status: 'closed' });
      return;
    }
    await loadQuarantinedPage(undefined, [undefined]);
  }

  async function previewQuarantinedRecord(item: QuarantinedRecordSummary) {
    if (item.status !== 'eligible' || quarantineBusy) return;
    cancelQuarantinePreview();
    setQuarantineBusy(true);
    setQuarantineError(null);
    setQuarantineStatus(null);
    try {
      setQuarantinePreview(await onPreviewQuarantinedRecord(item.quarantineId));
    } catch {
      setQuarantineError('记录暂时无法检查；原隔离记录仍保留，可以稍后重试。');
    } finally {
      setQuarantineBusy(false);
    }
  }

  async function confirmQuarantineRestore() {
    if (quarantinePreview?.status !== 'eligible' || quarantineBusy) return;
    setQuarantineBusy(true);
    setQuarantineError(null);
    setQuarantineStatus(null);
    try {
      const result = await onConfirmQuarantinedRecordRestore(quarantinePreview.token);
      if (result.status === 'restored') {
        setQuarantinePreview(null);
        const cursors = quarantineList.status === 'ready' ? quarantineList.cursors : [undefined];
        const afterKey = cursors[cursors.length - 1];
        await loadQuarantinedPage(afterKey, cursors);
        setQuarantineStatus(`已恢复一条${sourceStoreLabel(quarantinePreview.sourceStore)}记录；其余隔离记录没有改变。`);
      } else if (result.status === 'stale-preview') {
        setQuarantinePreview(null);
        setQuarantineError('预览已失效；隔离记录仍保留，请重新检查后再试。');
      } else {
        setQuarantinePreview(null);
        setQuarantineError(BLOCK_REASON_LABELS['target-conflict']);
      }
    } catch {
      setQuarantinePreview(null);
      setQuarantineError('恢复没有完成；原隔离记录仍保留，可以重新检查后再试。');
    } finally {
      setQuarantineBusy(false);
    }
  }

  async function loadAdjacentQuarantinePage(direction: 'previous' | 'next') {
    if (quarantineList.status !== 'ready' || quarantineBusy) return;
    cancelQuarantinePreview();
    if (direction === 'next' && quarantineList.page.nextCursor !== null) {
      const cursors = [...quarantineList.cursors, quarantineList.page.nextCursor];
      await loadQuarantinedPage(quarantineList.page.nextCursor, cursors);
    } else if (direction === 'previous' && quarantineList.cursors.length > 1) {
      const cursors = quarantineList.cursors.slice(0, -1);
      await loadQuarantinedPage(cursors[cursors.length - 1], cursors);
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
      <p>可以按类别清除闯关数据。清除前请先导出本机备份；24 小时恢复点不能替代长期备份，也不能防止浏览器清理或设备损坏。可恢复的闯关记录会在同一事务中保存到恢复点；隔离区原始记录不进入恢复点。课程进度和个人设置不受影响。</p>
      <div className="challenge-data-management-actions">
        <Button type="default" disabled={busy} onClick={() => requestClear('in-progress')}>清除未完成答题</Button>
        <Button type="default" disabled={busy} onClick={() => requestClear('wrong-questions')}>清除错题本</Button>
        <Button type="default" disabled={busy} onClick={() => requestClear('all')}>清除全部闯关数据</Button>
      </div>

      {quarantinedRecordCount !== null && quarantinedRecordCount > 0 && (
        <div className="challenge-recovery-point" aria-labelledby="challenge-quarantine-heading">
          <h3 id="challenge-quarantine-heading">已隔离的异常记录</h3>
          <p>发现 {quarantinedRecordCount} 条结构异常的闯关记录。它们已从答题、成绩和普通备份中隔离，原始内容仍保存在本机。选择导出时，文件可能包含题目和作答内容；文件只下载到此设备，不会自动上传。</p>
          <Button type="default" disabled={busy} onClick={() => void exportQuarantinedRecords()}>导出隔离记录</Button>
          <Button type="default" disabled={quarantineBusy} onClick={() => void toggleQuarantineList()}>
            {quarantineList.status === 'closed' ? '检查可恢复记录' : '收起隔离记录'}
          </Button>
          {quarantineList.status === 'loading' && <p className="challenge-quarantine-status" role="status">正在读取安全摘要…</p>}
          {quarantineList.status === 'error' && (
            <div className="challenge-quarantine-status">
              <Button type="default" disabled={quarantineBusy} onClick={() => void loadQuarantinedPage(undefined, [undefined])}>重新读取隔离记录</Button>
            </div>
          )}
          {quarantineList.status === 'ready' && (
            <div className="challenge-quarantine-browser" aria-label="隔离记录检查">
              {quarantineList.page.items.length > 0 ? (
                <ul className="challenge-quarantine-list" aria-label="隔离记录列表">
                  {quarantineList.page.items.map((item) => (
                    <li className="challenge-quarantine-item" key={safeKeyLabel(item.quarantineId)}>
                      <div>
                        <h4>隔离记录 {safeKeyLabel(item.quarantineId)}</h4>
                        <p>类别：{sourceStoreLabel(item.sourceStore)} · 记录键：{safeKeyLabel(item.sourceKey)}</p>
                        <p>隔离时间：{formatQuarantineTime(item.quarantinedAt)}</p>
                        {item.status === 'eligible' ? (
                          <p>记录可安全预览；确认前会再次检查。</p>
                        ) : (
                          <p>{describeBlockedRecord(item)}</p>
                        )}
                      </div>
                      {item.status === 'eligible' && (
                        <Button type="default" disabled={quarantineBusy} onClick={() => void previewQuarantinedRecord(item)}>
                          预览隔离记录 {safeKeyLabel(item.quarantineId)}
                        </Button>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="challenge-quarantine-status" role="status">当前没有隔离记录。</p>
              )}
              <div className="challenge-data-management-actions" aria-label="隔离记录分页">
                <Button type="default" disabled={quarantineBusy || quarantineList.cursors.length <= 1} onClick={() => void loadAdjacentQuarantinePage('previous')}>上一页</Button>
                <span className="challenge-quarantine-page-number">第 {quarantineList.cursors.length} 页</span>
                <Button type="default" disabled={quarantineBusy || quarantineList.page.nextCursor === null} onClick={() => void loadAdjacentQuarantinePage('next')}>下一页</Button>
              </div>
            </div>
          )}
          {quarantinePreview && (
            <div className="challenge-quarantine-preview" role="group" aria-label="恢复预览">
              {quarantinePreview.status === 'eligible' ? (
                <>
                  <h4>恢复预览：{sourceStoreLabel(quarantinePreview.sourceStore)}</h4>
                  <p>目标记录类别：{sourceStoreLabel(quarantinePreview.targetStore)}</p>
                  <p>目标记录键：{safeKeyLabel(quarantinePreview.targetKey)}</p>
                  <p>记录转换：{describeNormalization(quarantinePreview.normalization)}</p>
                  <p>预览有效至 {formatQuarantineTime(quarantinePreview.expiresAt)}。确认后会写回指定闯关数据，并仅在事务成功后删除对应隔离副本。</p>
                  <div className="challenge-data-management-actions">
                    <Button type="primary" disabled={quarantineBusy} onClick={() => void confirmQuarantineRestore()}>确认恢复这条记录</Button>
                    <Button type="default" disabled={quarantineBusy} onClick={cancelQuarantinePreview}>取消恢复预览</Button>
                  </div>
                </>
              ) : (
                <>
                  <h4>这条记录暂时不能恢复</h4>
                  <p role="alert">{BLOCK_REASON_LABELS[quarantinePreview.reason]}</p>
                  <Button type="default" disabled={quarantineBusy} onClick={cancelQuarantinePreview}>关闭预览</Button>
                </>
              )}
            </div>
          )}
        </div>
      )}
      {quarantineStatus && <p className="challenge-quarantine-status" role="status">{quarantineStatus}</p>}
      {quarantineError && <p className="challenge-quarantine-status" role="alert">{quarantineError}</p>}

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
            {clearingScope === 'all' && '将清除本机未完成答题、闯关成绩、最近题目记录和错题本；如有隔离区原始记录，也会永久删除且不会纳入恢复点。课程进度与个人设置不会改变。'}
            {clearingScope !== 'all' && '实际清除前会保存恢复点；新恢复点成功写入前，旧恢复点和现有数据不会被删除。'}
            {clearingScope === 'all' && '可恢复记录与恢复点会在同一事务中处理；新恢复点成功写入前，旧恢复点和现有记录不会被删除。'}
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
