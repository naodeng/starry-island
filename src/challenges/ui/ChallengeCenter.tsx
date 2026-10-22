import { useState } from 'react';
import { Button, Card, Checkbox, Upload } from 'animal-island-ui';
import type { UploadCustomRequestOptions } from 'animal-island-ui';
import { ArrowRightIcon } from 'naive-icons';
import { getChallengeGroupPath, getChallengeGrowthPath, getChallengeWrongQuestionsPath } from '../../app/router';
import type { LoadedPilotGroup } from '../content/pilotContent';
import type { ChallengeBackupPreferences } from '../domain/backup';
import type { ChallengeBackupMergeSummary } from '../domain/backupMerge';
import type { ChallengeClearScope, ChallengeDataClearResult, ChallengeRecoveryPointSummary } from '../domain/recovery';
import type { TaskProgress } from '../domain/types';
import type {
  ChallengeRecoveryRestoreResult,
  QuarantineRecoveryPreview,
  QuarantinedRecordPage,
  QuarantineRestoreResult,
} from '../storage/repository';
import ChallengeDataManagement from './ChallengeDataManagement';

type BackupImportState =
  | { status: 'idle' }
  | { status: 'reading' }
  | { status: 'preview'; summary: ChallengeBackupMergeSummary; preferences: ChallengeBackupPreferences | null; applyPreferences: boolean }
  | { status: 'importing' }
  | { status: 'success' }
  | { status: 'error'; message: string };

export interface ChallengeBackupImportPreview {
  summary: ChallengeBackupMergeSummary;
  preferences: ChallengeBackupPreferences | null;
}

export function getChallengeGroupTitle(group: LoadedPilotGroup['group']): string {
  const { definition } = group;
  const termLabel = definition.semester === 1 ? '上册' : '下册';
  const gradeLabel = ({ 1: '一', 2: '二', 3: '三', 4: '四', 5: '五', 6: '六' } as Record<number, string>)[definition.grade] ?? definition.grade;
  const subjectLabel = { chinese: '语文', math: '数学', english: '英语' }[definition.subject];
  const courseLabel = `${gradeLabel}年级${termLabel}${subjectLabel}`;

  if (definition.kind === 'unit') {
    const unitNumber = Number(definition.sourceUnitIds[0]?.match(/\/unit-(\d+)$/)?.[1]);
    const unitNumberLabel = ({ 1: '一', 2: '二', 3: '三', 4: '四', 5: '五', 6: '六', 7: '七', 8: '八', 9: '九', 10: '十' } as Record<number, string>)[unitNumber];
    return Number.isInteger(unitNumber) && unitNumber > 0
      ? `${courseLabel} · 第${unitNumberLabel ?? unitNumber}单元`
      : `${courseLabel} · 单元挑战`;
  }

  const stageLabels: Record<NonNullable<typeof definition.stage>, string> = {
    'first-half': '前半学期',
    'second-half': '后半学期',
    'end-term': '期末综合挑战',
  };
  const stageLabel = definition.stage ? stageLabels[definition.stage] : '学期挑战';
  return `${courseLabel} · ${stageLabel}`;
}

export function getChallengeGroupDescription(group: LoadedPilotGroup['group']): string {
  const { definition } = group;
  if (definition.kind === 'semester') return '按教材章节顺序覆盖上册前四个单元。';

  switch (definition.subject) {
    case 'math':
      return '练习两位数加减法、进位退位和数量关系。';
    case 'english':
      return '练习本单元的自我介绍、年龄和班级表达。';
    case 'chinese':
      return '阅读本单元课文，练习文本线索、表达方法与习作。';
  }
}

interface ChallengeCenterProps {
  groups: LoadedPilotGroup[];
  progressByTaskId: Readonly<Record<string, TaskProgress>>;
  progressAvailable: boolean;
  onNavigate: (path: string) => void;
  onExportBackup: (includePreferences: boolean) => Promise<void>;
  onExportDiagnostics: () => Promise<void>;
  onPrepareImportBackup: (file: File) => Promise<ChallengeBackupImportPreview>;
  onConfirmImportBackup: (applyPreferences: boolean) => Promise<void>;
  onCancelImportBackup: () => void;
  initialRecoveryPoint: ChallengeRecoveryPointSummary | null;
  quarantinedRecordCount: number | null;
  onClearChallengeData: (scope: ChallengeClearScope) => Promise<ChallengeDataClearResult>;
  onRestoreRecoveryPoint: () => Promise<ChallengeRecoveryRestoreResult | null>;
  onExportQuarantinedRecords: () => Promise<void>;
  onLoadQuarantinedRecordPage: (afterKey?: IDBValidKey) => Promise<QuarantinedRecordPage>;
  onPreviewQuarantinedRecord: (quarantineId: IDBValidKey) => Promise<QuarantineRecoveryPreview>;
  onCancelQuarantinedRecordPreview: (token: string) => void;
  onConfirmQuarantinedRecordRestore: (token: string) => Promise<QuarantineRestoreResult>;
}

export default function ChallengeCenter({
  groups,
  progressByTaskId,
  progressAvailable,
  onNavigate,
  onExportBackup,
  onExportDiagnostics,
  onPrepareImportBackup,
  onConfirmImportBackup,
  onCancelImportBackup,
  initialRecoveryPoint,
  quarantinedRecordCount,
  onClearChallengeData,
  onRestoreRecoveryPoint,
  onExportQuarantinedRecords,
  onLoadQuarantinedRecordPage,
  onPreviewQuarantinedRecord,
  onCancelQuarantinedRecordPreview,
  onConfirmQuarantinedRecordRestore,
}: ChallengeCenterProps) {
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
      setBackupImportState({
        status: 'error',
        message,
      });
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
    <main className="challenge-page">
      <div className="challenge-shell">
        <header className="challenge-hero">
          <p className="eyebrow">独立练习 · 进度保存在本机</p>
          <h1>闯关中心</h1>
          <p>每道题只提交一次答案。完成挑战后，可以查看得分和解题讲解。</p>
          <div className="challenge-hero-actions">
            <Button type="default" onClick={() => onNavigate('/')}>返回课程目录</Button>
            <Button type="default" onClick={() => onNavigate(getChallengeGrowthPath())}>查看成长记录</Button>
            <Button type="primary" onClick={() => onNavigate(getChallengeWrongQuestionsPath())}>打开错题本</Button>
          </div>
        </header>
        <section className="challenge-backup-panel" aria-labelledby="challenge-backup-heading">
          <h2 id="challenge-backup-heading">本机备份</h2>
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
          {backupExportState === 'success' && <p className="challenge-backup-status" role="status">闯关备份已生成并下载到此设备。</p>}
          {backupExportState === 'error' && <p className="challenge-backup-status" role="status">闯关备份没有生成；本机记录没有更改，可以稍后重试。</p>}
          <section className="challenge-diagnostics-panel" aria-labelledby="challenge-diagnostics-heading">
            <h3 id="challenge-diagnostics-heading">诊断信息</h3>
            <p>只有点击后才会生成并下载；不会自动上传。文件只包含应用与存储版本、浏览器能力和闯关数据条数，不包含姓名、题目、答案或课程进度。</p>
            <Button type="default" disabled={diagnosticsExportState === 'exporting'} onClick={() => void exportDiagnostics()}>
              {diagnosticsExportState === 'exporting' ? '正在生成诊断信息…' : '手动导出脱敏诊断信息'}
            </Button>
            {diagnosticsExportState === 'success' && <p className="challenge-backup-status" role="status">诊断信息已生成并下载到此设备；没有上传任何数据。</p>}
            {diagnosticsExportState === 'error' && <p className="challenge-backup-status" role="alert">诊断信息没有生成；本机记录没有更改，可以稍后重试。</p>}
          </section>
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
        <ChallengeDataManagement
          initialRecoveryPoint={initialRecoveryPoint}
          quarantinedRecordCount={quarantinedRecordCount}
          onClear={onClearChallengeData}
          onRestore={onRestoreRecoveryPoint}
          onExportQuarantinedRecords={onExportQuarantinedRecords}
          onLoadQuarantinedRecordPage={onLoadQuarantinedRecordPage}
          onPreviewQuarantinedRecord={onPreviewQuarantinedRecord}
          onCancelQuarantinedRecordPreview={onCancelQuarantinedRecordPreview}
          onConfirmQuarantinedRecordRestore={onConfirmQuarantinedRecordRestore}
        />
        {!progressAvailable && <p className="challenge-inline-note" role="status">本机进度暂时没有读出；可以继续挑战，稍后再查看进度。</p>}
        <section className="challenge-section" aria-labelledby="challenge-groups-heading">
          <div className="challenge-section-heading">
            <div>
              <p className="eyebrow">已登记的路线</p>
              <h2 id="challenge-groups-heading">选择一条挑战航线</h2>
            </div>
          </div>
          <div className="challenge-card-grid">
            {groups.map(({ group, status, issues }) => {
              const taskProgress = group.definition.tasks.map(({ id }) => progressByTaskId[id]).filter(Boolean);
              const passedCount = taskProgress.filter(({ everPassed }) => everPassed).length;
              const progressLabel = status === 'ready'
                ? `${passedCount}/5 个任务已通过`
                : status === 'planned' ? '即将开放' : '暂不可用';
              return (
                <Card className="challenge-group-card" color="default" key={group.definition.id}>
                  <p className="eyebrow">{group.definition.kind === 'unit' ? '单元闯关' : '学期阶段闯关'}</p>
                  <h3>{getChallengeGroupTitle(group)}</h3>
                  <p className="challenge-card-description">{getChallengeGroupDescription(group)}</p>
                  <div className="challenge-card-progress">
                    <span>{progressLabel}</span>
                    {passedCount === 5 && <strong>徽章已点亮</strong>}
                  </div>
                  {status === 'ready' ? (
                    <Button type="primary" block icon={<ArrowRightIcon size={18} aria-hidden="true" />} onClick={() => onNavigate(getChallengeGroupPath(group.definition.id))}>
                      查看挑战任务
                    </Button>
                  ) : (
                    <div className="challenge-unavailable-note" role="note">
                      <strong>{status === 'planned' ? '这条路线正在准备中。' : '这条路线暂时不能开始。'}</strong>
                      {issues[0] && <span>内容质量门禁尚未通过。</span>}
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
