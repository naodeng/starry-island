import { Button } from '../ui';
import type { LearningPosition } from '../../achievements/position';
import { getGradeTitle } from '../../content/gradeTitle';
import type { ProgressState } from '../../storage/progress';
import type { CourseTrack } from '../../storage/courseTrack';
import SettingsPanel from './SettingsPanel';
import '../../styles/settings.css';

interface SettingsPageProps {
  progress: ProgressState;
  onApplyLearningStart: (position: LearningPosition) => void;
  onNavigate: (path: string) => void;
  track?: CourseTrack | null;
  onOpenTrackSettings?: () => void;
}

export default function SettingsPage({ progress, onApplyLearningStart, onNavigate, track, onOpenTrackSettings }: SettingsPageProps) {
  const trackGrade = track ? getGradeTitle(Number(track.gradeId.replace('grade-', ''))) : null;
  const trackTerm = track?.termId === 'term-1' ? '上学期' : track?.termId === 'term-2' ? '下学期' : null;
  const trackLabel = trackGrade && trackTerm ? `${trackGrade} · ${trackTerm}` : '尚未设置';

  return (
    <main className="achievement-page settings-page">
      <div className="catalog-shell settings-page-shell">
        <header className="settings-page-heading">
          <p className="eyebrow">星岛航线偏好</p>
          <h1>设置</h1>
          <p>调整这台设备上的显示、声音和学习赛道。学习起点单独设置。</p>
        </header>

        <section className="settings-track-section" aria-labelledby="settings-track-heading">
          <div>
            <h2 id="settings-track-heading">学习赛道</h2>
            <p>只影响页面展示；不会更改学习起点和已保存进度。</p>
          </div>
          <div className="settings-track-value">
            <strong>{trackLabel}</strong>
            <Button type="default" aria-label="调整学习赛道" onClick={onOpenTrackSettings}>调整赛道</Button>
          </div>
        </section>

        <SettingsPanel progress={progress} onApplyLearningStart={onApplyLearningStart} onNavigate={onNavigate} />

        <section className="settings-section settings-backup-link" aria-labelledby="settings-backup-heading">
          <div>
            <h2 id="settings-backup-heading">备份与恢复</h2>
            <p>管理本机保存的闯关记录、备份和恢复数据。课程进度单独保存在本机。</p>
          </div>
          <Button type="default" onClick={() => onNavigate('/settings/backup')}>打开备份与恢复</Button>
        </section>
      </div>
    </main>
  );
}
