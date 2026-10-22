import { useState } from 'react';
import { Button, Card, Upload } from 'animal-island-ui';
import type { UploadCustomRequestOptions } from 'animal-island-ui';
import { ArrowRightIcon } from 'naive-icons';
import { getChallengeGroupPath, getChallengeGrowthPath, getChallengeWrongQuestionsPath } from '../../app/router';
import type { LoadedPilotGroup } from '../content/pilotContent';
import type { ChallengeBackupMergeSummary } from '../domain/backupMerge';
import type { TaskProgress } from '../domain/types';

type BackupImportState =
  | { status: 'idle' }
  | { status: 'reading' }
  | { status: 'preview'; summary: ChallengeBackupMergeSummary }
  | { status: 'importing' }
  | { status: 'success' }
  | { status: 'error'; message: string };

export function getChallengeGroupTitle(group: LoadedPilotGroup['group']): string {
  const { definition } = group;
  if (definition.kind === 'unit') return '二年级上册数学 · 第二单元';
  return definition.stage === 'first-half' ? '二年级上册数学 · 前半学期' : '二年级上册数学 · 学期挑战';
}

interface ChallengeCenterProps {
  groups: LoadedPilotGroup[];
  progressByTaskId: Readonly<Record<string, TaskProgress>>;
  progressAvailable: boolean;
  onNavigate: (path: string) => void;
  onExportBackup: () => Promise<void>;
  onPrepareImportBackup: (file: File) => Promise<ChallengeBackupMergeSummary>;
  onConfirmImportBackup: () => Promise<void>;
  onCancelImportBackup: () => void;
}

export default function ChallengeCenter({
  groups,
  progressByTaskId,
  progressAvailable,
  onNavigate,
  onExportBackup,
  onPrepareImportBackup,
  onConfirmImportBackup,
  onCancelImportBackup,
}: ChallengeCenterProps) {
  const [backupExportState, setBackupExportState] = useState<'idle' | 'exporting' | 'success' | 'error'>('idle');
  const [backupImportState, setBackupImportState] = useState<BackupImportState>({ status: 'idle' });

  async function exportBackup() {
    setBackupExportState('exporting');
    try {
      await onExportBackup();
      setBackupExportState('success');
    } catch {
      setBackupExportState('error');
    }
  }

  function selectBackup({ file, onSuccess, onError }: UploadCustomRequestOptions) {
    setBackupImportState({ status: 'reading' });
    void onPrepareImportBackup(file).then((summary) => {
      setBackupImportState({ status: 'preview', summary });
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
    setBackupImportState({ status: 'importing' });
    try {
      await onConfirmImportBackup();
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
          <p>备份包含闯关记录和未完成答题，不包含课程进度或个人设置。导入前会预览合并结果。</p>
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
          {backupImportState.status === 'preview' && (
            <div className="challenge-backup-preview" role="group" aria-label="导入预览">
              <p role="status">
                预览：新增进行中答题 {backupImportState.summary.addedActiveAttempts} 项，保留本机冲突答题 {backupImportState.summary.preservedLocalActiveAttempts} 项，进行中任务成绩暂缓合并 {backupImportState.summary.preservedProgressForActiveTasks} 项；
                新增成绩 {backupImportState.summary.addedProgressRecords} 项，合并成绩 {backupImportState.summary.mergedProgressRecords} 项；
                新增错题 {backupImportState.summary.addedWrongQuestions} 项，合并错题 {backupImportState.summary.mergedWrongQuestions} 项。
                重复成绩与错题次数不会相加。
              </p>
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
                  <p className="challenge-card-description">
                    {group.definition.kind === 'unit'
                      ? '练习两位数加减法、进位退位和数量关系。'
                      : '按教材章节顺序覆盖上册前四个单元。'}
                  </p>
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
