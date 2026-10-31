import { useEffect, useState } from 'react';
import { Button, Card } from 'animal-island-ui';
import packageJson from '../../../package.json';
import { createChallengeBackup, isChallengeBackupData, parseChallengeBackup } from '../domain/backup';
import type { ChallengeBackupData, ChallengeBackupImport, ChallengeBackupPreferences } from '../domain/backup';
import { mergeChallengeBackupData } from '../domain/backupMerge';
import type { ChallengeClearScope, ChallengeRecoveryPointSummary } from '../domain/recovery';
import { createChallengeDiagnosticReport } from '../domain/diagnostics';
import type { ChallengeRecoveryRestoreResult, ChallengeRepository } from '../storage/repository';
import { RevisionConflictError } from '../storage/repository';
import { CHALLENGE_DATABASE_VERSION } from '../storage/indexedDbRepository';
import { useTheme } from '../../theme/ThemeProvider';
import { useSound } from '../../sound/SoundProvider';
import ChallengeBackupPanel from './ChallengeBackupPanel';
import type { ChallengeBackupImportPreview } from './ChallengeBackupPanel';
import ChallengeDataManagement from './ChallengeDataManagement';
import useChallengeRepository from './useChallengeRepository';
import readWithTimeout from './readWithTimeout';
import LoadingState from '../../components/shared/LoadingState';
import './challenge.css';

function downloadJsonFile(filename: string, value: unknown) {
  const blob = new Blob([JSON.stringify(value, null, 2)], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.hidden = true;
  document.body.append(anchor);
  try {
    anchor.click();
  } finally {
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 0);
  }
}

interface PendingBackupImport {
  imported: ChallengeBackupData;
  expectedLocal: ChallengeBackupData;
  preferences: ChallengeBackupPreferences | null;
}

type DataReadState =
  | { status: 'loading' }
  | { status: 'ready'; recoveryPoint: ChallengeRecoveryPointSummary | null; quarantinedRecordCount: number }
  | { status: 'error' };

interface ChallengeDataManagementPageProps {
  onNavigate: (path: string) => void;
  repository?: ChallengeRepository;
}

const MAX_BACKUP_FILE_BYTES = 10 * 1024 * 1024;

export default function ChallengeDataManagementPage({ onNavigate, repository: providedRepository }: ChallengeDataManagementPageProps) {
  const repository = useChallengeRepository(providedRepository);
  const { preference: themePreference, setPreference: setThemePreference } = useTheme();
  const { enabled: soundEnabled, setEnabled: setSoundEnabled } = useSound();
  const [readState, setReadState] = useState<DataReadState>({ status: 'loading' });
  const [pendingBackupImport, setPendingBackupImport] = useState<PendingBackupImport | null>(null);

  async function readManagementState(showLoading = false) {
    if (showLoading) setReadState({ status: 'loading' });
    try {
      const [point, count] = await readWithTimeout(Promise.all([
        repository.getRecoveryPoint(),
        repository.getQuarantinedRecordCount(),
      ]));
      setReadState({
        status: 'ready',
        recoveryPoint: point ? { createdAt: point.createdAt, expiresAt: point.expiresAt } : null,
        quarantinedRecordCount: count,
      });
    } catch {
      setReadState({ status: 'error' });
    }
  }

  useEffect(() => {
    void readManagementState(true);
  }, [repository]);

  async function clearChallengeData(scope: ChallengeClearScope) {
    const result = await repository.clearChallengeData(scope);
    await readManagementState();
    return result;
  }

  async function restoreChallengeData(): Promise<ChallengeRecoveryRestoreResult | null> {
    const result = await repository.restoreRecoveryPoint();
    await readManagementState();
    return result;
  }

  async function restoreQuarantinedRecord(token: string) {
    const result = await repository.confirmQuarantinedRecordRestore(token);
    if (result.status === 'restored') {
      await readManagementState();
    }
    return result;
  }

  async function exportBackup(includePreferences: boolean) {
    const snapshot = await repository.getBackupSnapshot();
    const backup = await createChallengeBackup(snapshot, {
      ...(includePreferences ? { preferences: { theme: themePreference, soundEnabled } } : {}),
    });
    downloadJsonFile(`starry-island-challenges-${backup.createdAt.replace(/[:.]/g, '-')}.json`, backup);
  }

  async function exportDiagnostics() {
    const snapshot = await repository.getBackupSnapshot();
    const generatedAt = new Date().toISOString();
    const report = createChallengeDiagnosticReport({
      generatedAt,
      appVersion: packageJson.version,
      storageSchemaVersion: CHALLENGE_DATABASE_VERSION,
      capabilities: {
        indexedDB: typeof globalThis.indexedDB !== 'undefined',
        webLocks: typeof navigator !== 'undefined' && 'locks' in navigator,
      },
      recordCounts: {
        activeAttempts: snapshot.attempts.length,
        taskProgress: snapshot.taskProgress.length,
        recentCompletionGroups: snapshot.recentQuestionAttempts.length,
        wrongQuestions: snapshot.wrongQuestions.length,
      },
    });
    downloadJsonFile(`starry-island-diagnostics-${generatedAt.replace(/[:.]/g, '-')}.json`, report);
  }

  async function exportQuarantinedRecords() {
    const records = await repository.getQuarantinedRecords();
    const exportedAt = new Date().toISOString();
    downloadJsonFile(`starry-island-quarantined-data-${exportedAt.replace(/[:.]/g, '-')}.json`, {
      format: 'starry-island-challenge-quarantine',
      version: 1,
      exportedAt,
      records,
    });
  }

  async function prepareBackupImport(file: File): Promise<ChallengeBackupImportPreview> {
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
    let backup: ChallengeBackupImport;
    try {
      backup = await parseChallengeBackup(parsed);
    } catch {
      throw new Error('备份格式或完整性校验无效；本机记录没有更改。');
    }
    const imported: ChallengeBackupData = backup.data;
    let expectedLocal: ChallengeBackupData;
    try {
      expectedLocal = await repository.getBackupSnapshot();
    } catch {
      throw new Error('本机闯关记录暂时无法读取，不能生成安全预览；现有记录没有更改。');
    }
    if (!isChallengeBackupData(expectedLocal)) {
      throw new Error('本机闯关记录结构异常，暂时不能安全合并；现有记录没有更改。');
    }
    const plan = mergeChallengeBackupData(expectedLocal, imported);
    setPendingBackupImport({ imported, expectedLocal, preferences: backup.preferences ?? null });
    return { summary: plan.summary, preferences: backup.preferences ?? null };
  }

  async function confirmBackupImport(applyPreferences: boolean) {
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
    if (applyPreferences && pendingBackupImport.preferences) {
      setThemePreference(pendingBackupImport.preferences.theme);
      setSoundEnabled(pendingBackupImport.preferences.soundEnabled);
    }
    setPendingBackupImport(null);
  }

  function renderContent() {
    if (readState.status === 'loading') {
      return (
        <main className="challenge-page" aria-live="polite" aria-busy="true">
          <div className="challenge-shell">
            <Card className="challenge-message-card challenge-loading-card" color="default">
              <LoadingState title="正在读取本机数据…" description="正在安全检查闯关记录，不会更改现有数据。" headingLevel={1} />
            </Card>
          </div>
        </main>
      );
    }
    if (readState.status === 'error') {
      return (
        <main className="challenge-page">
          <div className="challenge-shell">
            <Card className="challenge-message-card" color="default">
              <p className="eyebrow">本机数据暂时没有读出</p>
              <h1>备份与恢复暂时无法打开</h1>
              <p>现有闯关记录没有被更改。请稍后重试；不要清除此网站数据。</p>
              <div className="challenge-hero-actions">
                <Button type="primary" onClick={() => void readManagementState(true)}>重新读取</Button>
                <Button type="default" onClick={() => onNavigate('/settings')}>返回设置</Button>
              </div>
            </Card>
          </div>
        </main>
      );
    }
    return (
      <main className="challenge-page">
        <div className="challenge-shell">
          <header className="challenge-hero">
            <p className="eyebrow">只在本机处理闯关数据</p>
            <h1>备份与恢复</h1>
            <p>闯关记录与课程学习进度分别保存。这里的导出、导入和恢复操作不会改动课程进度。</p>
            <div className="challenge-hero-actions">
              <Button type="default" onClick={() => onNavigate('/settings')}>返回设置</Button>
              <Button type="default" onClick={() => onNavigate('/challenges')}>返回闯关中心</Button>
            </div>
          </header>
          <ChallengeBackupPanel
            onExportBackup={exportBackup}
            onExportDiagnostics={exportDiagnostics}
            onPrepareImportBackup={prepareBackupImport}
            onConfirmImportBackup={confirmBackupImport}
            onCancelImportBackup={() => setPendingBackupImport(null)}
          />
          <ChallengeDataManagement
            initialRecoveryPoint={readState.recoveryPoint}
            quarantinedRecordCount={readState.quarantinedRecordCount}
            onClear={clearChallengeData}
            onRestore={restoreChallengeData}
            onExportQuarantinedRecords={exportQuarantinedRecords}
            onLoadQuarantinedRecordPage={(afterKey) => repository.getQuarantinedRecordPage(afterKey)}
            onPreviewQuarantinedRecord={(quarantineId) => repository.previewQuarantinedRecord(quarantineId)}
            onCancelQuarantinedRecordPreview={(token) => repository.cancelQuarantinedRecordPreview(token)}
            onConfirmQuarantinedRecordRestore={restoreQuarantinedRecord}
          />
        </div>
      </main>
    );
  }

  return renderContent();
}
