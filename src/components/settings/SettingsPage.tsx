import { Button } from 'animal-island-ui';
import type { LearningPosition } from '../../achievements/position';
import type { ProgressState } from '../../storage/progress';
import SettingsPanel from './SettingsPanel';
import '../../styles/settings.css';

interface SettingsPageProps {
  progress: ProgressState;
  onApplyLearningStart: (position: LearningPosition) => void;
  onNavigate: (path: string) => void;
}

export default function SettingsPage({ progress, onApplyLearningStart, onNavigate }: SettingsPageProps) {
  return (
    <main className="achievement-page settings-page">
      <div className="catalog-shell settings-page-shell">
        <header className="settings-page-heading">
          <p className="eyebrow">星岛航线偏好</p>
          <h1>设置</h1>
          <p>调整这台设备上的显示、声音和课程起点。</p>
        </header>

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
