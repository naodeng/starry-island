import { useState } from 'react';
import { Button, Card } from 'animal-island-ui';
import { ArrowRightIcon } from 'naive-icons';
import { getChallengeGroupPath, getChallengeGrowthPath, getChallengeWrongQuestionsPath } from '../../app/router';
import type { LoadedPilotGroup } from '../content/pilotContent';
import type { TaskProgress } from '../domain/types';

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
}

export default function ChallengeCenter({ groups, progressByTaskId, progressAvailable, onNavigate, onExportBackup }: ChallengeCenterProps) {
  const [backupExportState, setBackupExportState] = useState<'idle' | 'exporting' | 'success' | 'error'>('idle');

  async function exportBackup() {
    setBackupExportState('exporting');
    try {
      await onExportBackup();
      setBackupExportState('success');
    } catch {
      setBackupExportState('error');
    }
  }

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
            <Button type="default" disabled={backupExportState === 'exporting'} onClick={() => void exportBackup()}>
              {backupExportState === 'exporting' ? '正在生成备份…' : '导出闯关备份'}
            </Button>
            <Button type="primary" onClick={() => onNavigate(getChallengeWrongQuestionsPath())}>打开错题本</Button>
          </div>
          <p className="challenge-backup-note">备份包含本机闯关记录和未完成答题，不包含课程进度或个人设置。</p>
          {backupExportState === 'success' && <p className="challenge-backup-status" role="status">闯关备份已生成并下载到此设备。</p>}
          {backupExportState === 'error' && <p className="challenge-backup-status" role="status">闯关备份没有生成；本机记录没有更改，可以稍后重试。</p>}
        </header>
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
