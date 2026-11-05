import { useEffect, useState } from 'react';
import { Button, Modal } from '../ui';
import { curriculumManifest } from '../../content/curriculumManifest';
import type { CourseTrack } from '../../storage/courseTrack';
import '../../styles/course-track.css';

interface CourseTrackDialogProps {
  open: boolean;
  required: boolean;
  track: CourseTrack | null;
  onClose: () => void;
  onSave: (track: CourseTrack) => void;
}

export default function CourseTrackDialog({ open, required, track, onClose, onSave }: CourseTrackDialogProps) {
  const [gradeId, setGradeId] = useState(track?.gradeId ?? '');
  const [termId, setTermId] = useState(track?.termId ?? '');
  const selectedGrade = curriculumManifest.grades.find(({ id }) => id === gradeId);
  const selectedTerm = selectedGrade?.terms.find(({ id }) => id === termId);

  useEffect(() => {
    if (!open) return;
    setGradeId(track?.gradeId ?? '');
    setTermId(track?.termId ?? '');
  }, [open, track]);

  function selectGrade(nextGradeId: string) {
    const nextGrade = curriculumManifest.grades.find(({ id }) => id === nextGradeId);
    if (!nextGrade) return;
    const nextTerm = termId
      ? nextGrade.terms.find(({ id }) => id === termId) ?? nextGrade.terms[0]
      : undefined;
    setGradeId(nextGrade.id);
    setTermId(nextTerm?.id ?? '');
  }

  function saveSelection() {
    if (!selectedGrade || !selectedTerm) return;
    onSave({ gradeId: selectedGrade.id, termId: selectedTerm.id });
  }

  return (
    <Modal
      open={open}
      title={required ? '先选好学习赛道' : '调整学习赛道'}
      width="min(520px, calc(100vw - 24px))"
      className="course-track-modal"
      footer={null}
      maskClosable={!required}
      onClose={required ? () => undefined : onClose}
    >
      <p className="eyebrow course-track-eyebrow">星岛航线</p>
      <p className="course-track-description">
        {required
          ? '选好年级和学期，星岛就会为你展示对应课程。'
          : '修改后，课程目录、知识卡片、闯关和成长页面会按新的年级与学期展示。'}
      </p>

      <fieldset className="course-track-fieldset">
        <legend>选择年级</legend>
        <div className="course-track-options course-track-options--grades">
          {curriculumManifest.grades.map(({ id, title }) => (
            <Button
              key={id}
              type="default"
              className="course-track-option"
              aria-pressed={gradeId === id}
              onClick={() => selectGrade(id)}
            >
              {title}
            </Button>
          ))}
        </div>
      </fieldset>

      <fieldset className="course-track-fieldset">
        <legend>选择学期</legend>
        <div className="course-track-options course-track-options--terms">
          {selectedGrade?.terms.map(({ id, title }) => (
            <Button
              key={id}
              type="default"
              className="course-track-option"
              aria-pressed={termId === id}
              onClick={() => setTermId(id)}
            >
              {title}
            </Button>
          ))}
        </div>
      </fieldset>

      <p className="course-track-note">
        这里只设置年级和学期。学科、单元等在对应页面筛选；切换赛道不会更改已保存的学习进度。
      </p>

      <footer className="course-track-actions">
        {!required && <Button onClick={onClose}>取消</Button>}
        <Button type="primary" disabled={!selectedGrade || !selectedTerm} onClick={saveSelection}>
          {required ? '开始学习' : '保存设置'}
        </Button>
      </footer>
    </Modal>
  );
}
