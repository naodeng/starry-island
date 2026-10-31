import { useState } from 'react';
import { Button, Checkbox, Upload } from 'animal-island-ui';
import type { UploadCustomRequestOptions } from 'animal-island-ui';
import EmptyState from '../../components/shared/EmptyState';
import type { ChallengeBackupPreferences } from '../domain/backup';
import type { ChallengeBackupMergeSummary } from '../domain/backupMerge';
import './challenge.css';

export interface ChallengeBackupImportPreview {
  summary: ChallengeBackupMergeSummary;
  preferences: ChallengeBackupPreferences | null;
}

type BackupImportState =
  | { status: 'idle' }
  | { status: 'reading' }
  | { status: 'preview'; summary: ChallengeBackupMergeSummary; preferences: ChallengeBackupPreferences | null; applyPreferences: boolean }
  | { status: 'importing' }
  | { status: 'success' }
  | { status: 'error'; message: string };

interface ChallengeBackupPanelProps {
  onExportBackup: (includePreferences: boolean) => Promise<void>;
  onExportDiagnostics: () => Promise<void>;
  onPrepareImportBackup: (file: File) => Promise<ChallengeBackupImportPreview>;
  onConfirmImportBackup: (applyPreferences: boolean) => Promise<void>;
  onCancelImportBackup: () => void;
}

export default function ChallengeBackupPanel({
  onExportBackup,
  onExportDiagnostics,
  onPrepareImportBackup,
  onConfirmImportBackup,
  onCancelImportBackup,
}: ChallengeBackupPanelProps) {
  const [backupExportState, setBackupExportState] = useState<'idle' | 'exporting' | 'success' | 'error'>('idle');
  const [includePreferencesInBackup, setIncludePreferencesInBackup] = useState(false);
  const [diagnosticsExportState, setDiagnosticsExportState] = useState<'idle' | 'exporting' | 'success' | 'error'>('idle');
  const [backupImportState, setBackupImportState] = useState<BackupImportState>({ status: 'idle' });

  async function exportBackup() {
    setBackupExportState('exporting');
    try {
      await onExportBackup(includePreferencesInBackup);
      setBackupExportState('success');
    } catch {
      setBackupExportState('error');
    }
  }

  async function exportDiagnostics() {
    setDiagnosticsExportState('exporting');
    try {
      await onExportDiagnostics();
      setDiagnosticsExportState('success');
    } catch {
      setDiagnosticsExportState('error');
    }
  }

  function selectBackup({ file, onSuccess, onError }: UploadCustomRequestOptions) {
    setBackupImportState({ status: 'reading' });
    void onPrepareImportBackup(file).then((summary) => {
      setBackupImportState({ ...summary, status: 'preview', applyPreferences: false });
      onSuccess();
    }).catch((error: unknown) => {
      const message = error instanceof Error ? error.message : '备份文件无法读取；本机记录没有更改。';
      setBackupImportState({ status: 'error', message });
      onError(error);
    });
  }

  async function confirmBackupImport() {
    if (backupImportState.status !== 'preview') return;
    const applyPreferences = backupImportState.applyPreferences && backupImportState.preferences !== null;
    setBackupImportState({ status: 'importing' });
    try {
      await onConfirmImportBackup(applyPreferences);
      setBackupImportState({ status: 'success' });
    } catch (error) {
      setBackupImportState({
        status: 'error',
        message: error instanceof Error ? error.message : '备份没有导入；本机记录没有更改。',
      });
    }
  }

  function cancelBackupImport() {
    onCancelImportBackup();
    setBackupImportState({ status: 'idle' });
  }

  const importBusy = backupImportState.status === 'reading' || backupImportState.status === 'importing';

  return (
    <section className="challenge-backup-panel" aria-labelledby="challenge-backup-heading">
      <h2 id="challenge-backup-heading">闯关备份</h2>
      <p>备份包含闯关记录和未完成答题，不包含课程进度。主题和语音偏好可选携带；导入时会单独预览，默认不应用。</p>
      <Checkbox
        className="challenge-backup-preference-option"
        options={[{ label: '备份同时携带主题和语音偏好', value: 'preferences' }]}
        value={includePreferencesInBackup ? ['preferences'] : []}
        onChange={(values) => setIncludePreferencesInBackup(values.includes('preferences'))}
        disabled={backupExportState === 'exporting'}
      />
      <div className="challenge-hero-actions">
        <Button type="default" disabled={backupExportState === 'exporting'} onClick={() => void exportBackup()}>
          {backupExportState === 'exporting' ? '正在生成备份…' : '导出闯关备份'}
        </Button>
        <Upload
          accept=".json,application/json"
          aria-label="选择闯关备份文件"
          className="challenge-backup-upload"
          customRequest={selectBackup}
          disabled={importBusy}
          maxCount={1}
          showUploadList={false}
        >
          {backupImportState.status === 'reading' ? '正在检查备份…' : '选择闯关备份文件'}
        </Upload>
      </div>
      {backupImportState.status === 'idle' && (
        <EmptyState
          className="challenge-backup-empty"
          headingLevel={3}
          title="尚未选择备份文件"
          description="选择本机备份文件后，会先检查内容并展示安全合并预览。"
        />
      )}
      {backupExportState === 'success' && <p className="challenge-backup-status" role="status">闯关备份已生成并下载到此设备。</p>}
      {backupExportState === 'error' && <p className="challenge-backup-status" role="status">闯关备份没有生成；本机记录没有更改，可以稍后重试。</p>}
      <details className="challenge-diagnostics-panel">
        <summary id="challenge-diagnostics-heading">诊断信息（高级）</summary>
        <div className="challenge-diagnostics-content">
          <p>只有点击后才会生成并下载；不会自动上传。文件只包含应用与存储版本、浏览器能力和闯关数据条数，不包含姓名、题目、答案或课程进度。</p>
          <Button type="default" disabled={diagnosticsExportState === 'exporting'} onClick={() => void exportDiagnostics()}>
            {diagnosticsExportState === 'exporting' ? '正在生成诊断信息…' : '手动导出脱敏诊断信息'}
          </Button>
          {diagnosticsExportState === 'success' && <p className="challenge-backup-status" role="status">诊断信息已生成并下载到此设备；没有上传任何数据。</p>}
          {diagnosticsExportState === 'error' && <p className="challenge-backup-status" role="alert">诊断信息没有生成；本机记录没有更改，可以稍后重试。</p>}
        </div>
      </details>
      {backupImportState.status === 'preview' && (
        <div className="challenge-backup-preview" role="group" aria-label="导入预览">
          <p role="status">
            预览：新增进行中答题 {backupImportState.summary.addedActiveAttempts} 项，保留本机冲突答题 {backupImportState.summary.preservedLocalActiveAttempts} 项，进行中任务成绩暂缓合并 {backupImportState.summary.preservedProgressForActiveTasks} 项；
            新增成绩 {backupImportState.summary.addedProgressRecords} 项，合并成绩 {backupImportState.summary.mergedProgressRecords} 项；
            新增错题 {backupImportState.summary.addedWrongQuestions} 项，合并错题 {backupImportState.summary.mergedWrongQuestions} 项。
            重复成绩与错题次数不会相加。
          </p>
          {backupImportState.preferences ? (
            <>
              <p>备份设置：主题为{backupImportState.preferences.theme === 'system' ? '跟随系统' : backupImportState.preferences.theme === 'light' ? '浅色' : '深色'}，语音{backupImportState.preferences.soundEnabled ? '已开启' : '已关闭'}。</p>
              <Checkbox
                className="challenge-backup-preference-option"
                options={[{ label: '应用备份中的主题和语音偏好', value: 'preferences' }]}
                value={backupImportState.applyPreferences ? ['preferences'] : []}
                onChange={(values) => setBackupImportState((current) => current.status === 'preview'
                  ? { ...current, applyPreferences: values.includes('preferences') }
                  : current)}
                disabled={importBusy}
              />
            </>
          ) : (
            <p>此备份不包含主题和语音偏好，导入不会更改本机设置。</p>
          )}
          {backupImportState.summary.preservedProgressForActiveTasks > 0 && (
            <p>本机正在进行的任务保留原成绩以保护当前答题；完成任务后，可以重新导入备份合并这些成绩。</p>
          )}
          <div className="challenge-hero-actions">
            <Button type="primary" disabled={importBusy} onClick={() => void confirmBackupImport()}>确认安全合并</Button>
            <Button type="default" disabled={importBusy} onClick={cancelBackupImport}>取消</Button>
          </div>
        </div>
      )}
      {backupImportState.status === 'success' && <p className="challenge-backup-status" role="status">闯关备份已安全合并到此设备；课程进度没有改变。</p>}
      {backupImportState.status === 'error' && <p className="challenge-backup-status" role="alert">{backupImportState.message}</p>}
    </section>
  );
}
