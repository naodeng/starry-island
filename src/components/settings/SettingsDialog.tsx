import { Button, Modal } from 'animal-island-ui';
import { CloseIcon } from 'naive-icons';
import type { LearningPosition } from '../../achievements/position';
import type { ProgressState } from '../../storage/progress';
import ProjectLegalFooter from '../layout/ProjectLegalFooter';
import SettingsPanel from './SettingsPanel';

interface SettingsDialogProps {
  open: boolean;
  progress: ProgressState;
  onClose: () => void;
  onApplyLearningStart: (position: LearningPosition) => void;
  onNavigate: (path: string) => void;
}

export default function SettingsDialog({ open, progress, onClose, onApplyLearningStart, onNavigate }: SettingsDialogProps) {
  return (
    <Modal
      open={open}
      variant="game"
      title="设置"
      width="min(760px, calc(100vw - 24px))"
      className="settings-modal"
      typewriter={false}
      footer={null}
      onClose={onClose}
    >
      <div className="settings-modal-content">
        <header className="settings-dialog-header">
          <p className="eyebrow">飞船控制台</p>
          <Button type="default" className="settings-dialog-close" aria-label="关闭设置" icon={<CloseIcon size={18} aria-hidden="true" />} onClick={onClose}>关闭</Button>
        </header>
        <SettingsPanel active={open} progress={progress} onApplyLearningStart={onApplyLearningStart} onNavigate={onNavigate} />
      </div>
      <ProjectLegalFooter placement="dialog" />
    </Modal>
  );
}
