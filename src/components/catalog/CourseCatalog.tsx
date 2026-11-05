import { useState } from 'react';
import { Button, Card } from '../ui';
import { ArrowRightIcon, StarIcon } from 'naive-icons';
import { curriculumManifest } from '../../content/curriculumManifest';
import type { CatalogUnitEntry, SubjectId } from '../../content/types';
import type { ProgressState } from '../../storage/progress';
import { getUnitPath } from '../../app/router';
import HeroGuide from '../mascots/HeroGuide';
import { getGradeTitle } from '../../content/gradeTitle';
import { loadCourseTrack } from '../../storage/courseTrack';
import type { CourseTrack } from '../../storage/courseTrack';
import EmptyState from '../shared/EmptyState';

interface CourseCatalogProps {
  progress: ProgressState;
  onNavigate: (path: string) => void;
  track?: CourseTrack | null;
}

export default function CourseCatalog({ progress, onNavigate, track }: CourseCatalogProps) {
  void progress;
  const currentTrack = track === undefined ? loadCourseTrack() : track;
  const fallbackGrade = curriculumManifest.grades[0]!;
  const grade = curriculumManifest.grades.find((entry) => entry.id === currentTrack?.gradeId) ?? fallbackGrade;
  const term = grade.terms.find((entry) => entry.id === currentTrack?.termId) ?? grade.terms[0];
  const [subjectId, setSubjectId] = useState<SubjectId>(term?.subjects[0]?.id ?? 'chinese');
  const subject = term?.subjects.find((entry) => entry.id === subjectId) ?? term?.subjects[0];
  const trackLabel = currentTrack
    ? `${getGradeTitle(Number(currentTrack.gradeId.replace('grade-', '')))} · ${term?.title ?? ''}`
    : '尚未设置';
  const subjectTextbook = subject?.units[0]
    ? curriculumManifest.textbooks[subject.units[0].textbookEditionId]
    : undefined;
  const guideId = subject?.id === 'chinese' ? 'companion-02' : subject?.id === 'english' ? 'companion-03' : 'companion-01';

  if (!grade || !term || !subject) {
    return (
      <main className="catalog-page">
        <div className="catalog-shell">
          <h1>课程目录正在准备中</h1>
          <p>核对好教材和课程后，这里就会出现新的学习路线。</p>
        </div>
      </main>
    );
  }

  function openUnit(unit: CatalogUnitEntry) {
    if (unit.status === 'active') onNavigate(getUnitPath(unit.curriculumUnitKey!));
  }

  return (
    <main className="catalog-page">
      <div className="catalog-shell">
        <header className="catalog-hero">
          <div className="catalog-hero-copy">
            <div className="catalog-brand-lockup">
              <h1 className="catalog-brand-heading">课程目录</h1>
              <div className="catalog-hero-message">
                <p className="catalog-lead">快乐学习，点亮每一颗知识星球。选好课程，和伙伴一起出发！</p>
                <div className="catalog-meta" aria-label="课程信息">
                  <span>每场约20分钟</span>
                  <span>进度保存在本机</span>
                </div>
              </div>
            </div>
          </div>
          <aside className="catalog-hero-crew" aria-label="学习伙伴小队">
            <p className="catalog-hero-crew-heading">星岛伙伴 · 一起探索</p>
            <HeroGuide mood="welcome" subject={subject.id} companionId={guideId} compact />
          </aside>
        </header>

        <section className="catalog-section" aria-labelledby="subject-heading">
          <div className="catalog-track-context" role="note" aria-label="当前学习赛道">
            <span className="eyebrow">当前赛道</span>
            <strong>{trackLabel}</strong>
            <span>学科可在本页选择；调整年级和学期可点首页“赛道”或前往设置</span>
          </div>
          <div className="catalog-section-heading">
            <div>
              <p className="eyebrow">学习地图</p>
              <h2 id="subject-heading">今天想探索哪座星球</h2>
            </div>
            <div className="subject-switch" role="group" aria-label="选择学科">
              {term.subjects.map((entry) => (
                <Button
                  key={entry.id}
                  type={subject.id === entry.id ? 'primary' : 'default'}
                  aria-pressed={subject.id === entry.id}
                  onClick={() => setSubjectId(entry.id)}
                >
                  {entry.title}
                </Button>
              ))}
            </div>
          </div>
          {subject.id === 'english' && subjectTextbook?.schoolOfferingStatus === 'unconfirmed' ? (
            <p className="catalog-source-disclosure" role="note">
              英语预备级是否属于学校本学期实际开设课程，请以学校安排为准。
            </p>
          ) : null}
          {subject.units.length ? (
            <div className="unit-grid">
              {subject.units.map((unit) => {
                const active = unit.status === 'active'
                  && curriculumManifest.textbooks[unit.textbookEditionId]?.verificationStatus === 'verified';
                return (
                  <Card
                    key={unit.id}
                    className={`unit-card ${active ? 'unit-card-active' : 'unit-card-soon'}`}
                    color="default"
                    aria-label={`${unit.title}${active ? '' : '，筹备中'}`}
                  >
                    <div className="unit-card-topline">
                      {unit.formalUnitNumber === null && unit.type !== 'theme' && (
                        <span className="unit-number">
                          {unit.type === 'review' ? '复习站' : '实践站'}
                        </span>
                      )}
                      <span className={`unit-status ${active ? 'is-active' : 'is-soon'}`}>{active ? '已开放' : '筹备中'}</span>
                    </div>
                    <h3>{unit.title}</h3>
                    {active ? (
                      <Button type="primary" block icon={<ArrowRightIcon size={18} aria-hidden="true" />} onClick={() => openUnit(unit)}>进入单元</Button>
                    ) : null}
                  </Card>
                );
              })}
            </div>
          ) : (
            <EmptyState
              className="catalog-empty-state"
              title={`正在准备${subject.title}课程`}
              description="这个学期的课程内容正在核对教材版本，准备好后就会开放。"
              headingLevel={3}
            />
          )}
        </section>
        <section className="catalog-challenge-entry" aria-labelledby="challenge-entry-heading">
          <Card className="catalog-challenge-entry-card" color="default">
            <div>
              <p className="eyebrow">独立闯关 · 记录保存在本机</p>
              <h2 id="challenge-entry-heading">想检验自己的学习成果？</h2>
              <p>每题提交一次答案，完成后可以查看得分和讲解。</p>
            </div>
            <Button type="primary" icon={<ArrowRightIcon size={18} aria-hidden="true" />} onClick={() => onNavigate('/challenges')}>
              进入闯关中心
            </Button>
          </Card>
        </section>
        <footer className="catalog-footer">
          <span>学习靠好奇心，每次完成一点点就很棒。</span>
          <span className="footer-orbit" aria-hidden="true"><StarIcon size={22} /></span>
        </footer>
      </div>
    </main>
  );
}
