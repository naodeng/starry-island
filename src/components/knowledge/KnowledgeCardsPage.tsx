import { useEffect, useState } from 'react';
import { ArrowRightIcon } from 'naive-icons';
import { getKnowledgePath, getUnitPath } from '../../app/router';
import { curriculumManifest } from '../../content/curriculumManifest';
import { knowledgeCardsByUnit } from '../../content/knowledgeCards/grade-2';
import type { KnowledgeCardDefinition } from '../../content/knowledgeCards/types';
import type { CatalogSubjectEntry, CatalogTermEntry, CatalogUnitEntry, SubjectId, TermId } from '../../content/types';
import { loadCourseTrack } from '../../storage/courseTrack';
import type { CourseTrack } from '../../storage/courseTrack';
import CourseBreadcrumbs from '../catalog/CourseBreadcrumbs';
import { Button, Card, Select } from '../ui';

interface KnowledgeCardsPageProps {
  unitKey?: string;
  onNavigate: (path: string) => void;
  track?: CourseTrack | null;
}

interface KnowledgeSelection {
  gradeId: string;
  termId: TermId;
  subjectId: SubjectId;
  unitId: string;
}

type KnowledgeViewMode = 'review' | 'all';

function getUnitKey(gradeId: string, termId: TermId, subjectId: SubjectId, entry: CatalogUnitEntry): string {
  return entry.curriculumUnitKey ?? `${gradeId}/${termId}/${subjectId}/${entry.id}`;
}

function getAvailableUnits(gradeId: string, term: CatalogTermEntry, subject: CatalogSubjectEntry): CatalogUnitEntry[] {
  return subject.units.filter((entry) => {
    const textbook = curriculumManifest.textbooks[entry.textbookEditionId];
    const unitKey = getUnitKey(gradeId, term.id, subject.id, entry);
    return entry.status === 'active'
      && textbook?.verificationStatus === 'verified'
      && Boolean(knowledgeCardsByUnit[unitKey]);
  });
}

function findUnitByKey(unitKey?: string): KnowledgeSelection | null {
  if (!unitKey) return null;
  for (const grade of curriculumManifest.grades) {
    for (const term of grade.terms) {
      for (const subject of term.subjects) {
        const entry = subject.units.find((candidate) => getUnitKey(grade.id, term.id, subject.id, candidate) === unitKey);
        if (entry && getAvailableUnits(grade.id, term, subject).includes(entry)) {
          return { gradeId: grade.id, termId: term.id, subjectId: subject.id, unitId: entry.id };
        }
      }
    }
  }
  return null;
}

function getInitialSelection(unitKey: string | undefined, track: CourseTrack | null): KnowledgeSelection {
  const directSelection = findUnitByKey(unitKey);
  if (directSelection) return directSelection;

  const grade = curriculumManifest.grades.find(({ id }) => id === track?.gradeId) ?? curriculumManifest.grades[0]!;
  const term = grade.terms.find(({ id }) => id === track?.termId) ?? grade.terms[0]!;
  const subject = term.subjects[0]!;
  const firstUnit = getAvailableUnits(grade.id, term, subject)[0];
  return { gradeId: grade.id, termId: term.id, subjectId: subject.id, unitId: firstUnit?.id ?? '' };
}

function getUnitTypeLabel(type: CatalogUnitEntry['type']): string | null {
  if (type === 'review') return '复习条目';
  if (type === 'integrated-practice') return '综合实践';
  if (type === 'theme') return '主题学习';
  return null;
}

function getTextbookNotes(textbookId: string, subjectId: SubjectId): string[] {
  const textbook = curriculumManifest.textbooks[textbookId];
  const notes: string[] = [];
  if (textbook?.sourceKind === 'tapx-fallback') {
    notes.push('本课程依据 TapXWorld 固定快照设计，可能与人教社后续修订版存在差异。');
  } else if (textbook?.sourceKind === 'user-provided') {
    notes.push(textbook.isbn
      ? `本课程依据你提供的人教版教材（ISBN ${textbook.isbn}）设计。`
      : '本课程依据你提供的人教版教材设计。');
  } else if (textbook?.sourceKind === 'pep-latest') {
    notes.push('本课程依据人教社公开最新版教材设计。');
  }
  if (subjectId === 'english' && textbook?.schoolOfferingStatus === 'unconfirmed') {
    notes.push('英语是否为学校本学期开设课程，请以学校安排为准。');
  }
  return notes;
}

function KnowledgeCardView({ card, mode }: { card: KnowledgeCardDefinition; mode: KnowledgeViewMode }) {
  const headingId = `knowledge-topic-${card.id}`;
  const explanationId = `${headingId}-explanation`;
  const exampleId = `${headingId}-example`;
  const isReview = mode === 'review';
  return (
    <Card className={`knowledge-card ${isReview ? 'knowledge-card--review' : 'knowledge-card--all'}`} color="default">
      <article aria-labelledby={headingId}>
        {!isReview && <p className="knowledge-card-kicker">知识点</p>}
        <h3 id={headingId}>{card.topic}</h3>
        <div className="knowledge-card-content">
          <section className="knowledge-lesson" aria-labelledby={explanationId}>
            <h4 id={explanationId}>知识讲解</h4>
            <p className="knowledge-card-explanation">{card.explanation}</p>
          </section>
          <section className="knowledge-example" aria-labelledby={exampleId}>
            <p id={exampleId} className="knowledge-example-label">{isReview ? '试一试' : '例题'}</p>
            <p className="knowledge-example-prompt">{card.example.prompt}</p>
            <details className="knowledge-answer">
              <summary>查看答案和思路</summary>
              <div className="knowledge-answer-content">
                <p><strong>参考答案：</strong>{card.example.answer}</p>
                <p><strong>想一想：</strong>{card.example.reasoning}</p>
              </div>
            </details>
          </section>
        </div>
      </article>
    </Card>
  );
}

export default function KnowledgeCardsPage({ unitKey, onNavigate, track }: KnowledgeCardsPageProps) {
  const currentTrack = track === undefined ? loadCourseTrack() : track;
  const [selection, setSelection] = useState(() => getInitialSelection(unitKey, currentTrack));
  const [viewMode, setViewMode] = useState<KnowledgeViewMode>('review');
  const [reviewIndex, setReviewIndex] = useState(0);
  useEffect(() => {
    const routeSelection = findUnitByKey(unitKey);
    if (routeSelection) {
      setSelection(routeSelection);
      setReviewIndex(0);
      return;
    }
    if (unitKey) return;
    setSelection((current) => {
      if (current.gradeId === currentTrack?.gradeId && current.termId === currentTrack?.termId) return current;
      return getInitialSelection(undefined, currentTrack);
    });
    setReviewIndex(0);
  }, [unitKey, currentTrack?.gradeId, currentTrack?.termId]);

  const grade = curriculumManifest.grades.find(({ id }) => id === selection.gradeId) ?? curriculumManifest.grades[0]!;
  const term = grade.terms.find(({ id }) => id === selection.termId) ?? grade.terms[0]!;
  const subject = term.subjects.find(({ id }) => id === selection.subjectId) ?? term.subjects[0]!;
  const entries = getAvailableUnits(grade.id, term, subject);
  const selectedUnit = entries.find(({ id }) => id === selection.unitId) ?? entries[0];
  const selectedUnitKey = selectedUnit ? getUnitKey(grade.id, term.id, subject.id, selectedUnit) : '';
  const cards = knowledgeCardsByUnit[selectedUnitKey] ?? [];

  function persistSelection(next: KnowledgeSelection) {
    setSelection(next);
    setReviewIndex(0);
    if (unitKey) onNavigate(getKnowledgePath());
  }

  function handleSubjectChange(nextSubjectId: SubjectId) {
    const nextSubject = term.subjects.find(({ id }) => id === nextSubjectId);
    if (!nextSubject) return;
    const firstUnit = getAvailableUnits(grade.id, term, nextSubject)[0];
    persistSelection({ gradeId: grade.id, termId: term.id, subjectId: nextSubject.id, unitId: firstUnit?.id ?? '' });
  }

  function handleUnitChange(nextUnitId: string) {
    if (!entries.some(({ id }) => id === nextUnitId)) return;
    persistSelection({ ...selection, gradeId: grade.id, termId: term.id, unitId: nextUnitId });
  }

  const textbookNotes = selectedUnit ? getTextbookNotes(selectedUnit.textbookEditionId, subject.id) : [];
  const currentIndex = Math.min(reviewIndex, Math.max(cards.length - 1, 0));
  const currentCard = cards[currentIndex];

  return (
    <main className="catalog-page knowledge-page">
      <div className="catalog-shell">
        <CourseBreadcrumbs items={[{ label: '课程目录', path: '/courses' }, { label: '知识卡片' }]} onNavigate={onNavigate} />
        <header className="knowledge-hero">
          <div>
            <p className="eyebrow">{grade.title} · {term.title} · 知识回顾</p>
            <h1>知识卡片</h1>
            <p className="catalog-lead">在当前赛道选择学科和课程条目，先试着回答，再打开答案和思路。</p>
          </div>
          <span className="knowledge-grade-badge">{grade.title}</span>
        </header>

        {entries.length ? (
          <section className="knowledge-filters" aria-label="筛选知识卡片">
            <div className="knowledge-track-context" role="note" aria-label="当前学习赛道">
              <span>当前赛道</span>
              <strong>{grade.title} · {term.title}</strong>
            </div>
            <div className="knowledge-subject-switch" role="group" aria-label="选择学科">
              {term.subjects.map((entry) => (
                <Button
                  key={entry.id}
                  type={entry.id === subject.id ? 'primary' : 'default'}
                  aria-pressed={entry.id === subject.id}
                  onClick={() => handleSubjectChange(entry.id)}
                >
                  {entry.title}
                </Button>
              ))}
            </div>
            <label className="knowledge-filter knowledge-filter--unit">
              <span>课程条目</span>
              <Select
                aria-label="课程条目"
                options={entries.map(({ id, title }) => ({ key: id, label: title }))}
                value={selectedUnit?.id ?? ''}
                onChange={handleUnitChange}
              />
            </label>
          </section>
        ) : (
          <section className="knowledge-filters knowledge-filters--empty" aria-label="当前赛道的知识卡片" role="status">
            <div>
              <strong>当前赛道还没有知识卡片</strong>
              <p>可以先到课程目录学习已开放的课程。</p>
            </div>
            <Button onClick={() => onNavigate('/courses')}>浏览课程目录</Button>
          </section>
        )}

        {selectedUnit ? (
          <>
            <section className="knowledge-unit-heading" aria-labelledby="knowledge-unit-title">
              <div>
                <p className="eyebrow">{grade.title} · {term.title} · {subject.title}</p>
                <div className="knowledge-unit-title-row">
                  <h2 id="knowledge-unit-title">{selectedUnit.title}</h2>
                  {getUnitTypeLabel(selectedUnit.type) && <span className="knowledge-entry-type">{getUnitTypeLabel(selectedUnit.type)}</span>}
                </div>
                <p className="knowledge-unit-count">{cards.length} 张知识卡片</p>
                {textbookNotes.map((note) => <p className="knowledge-source-note" role="note" key={note}>{note}</p>)}
              </div>
              <Button
                type="primary"
                icon={<ArrowRightIcon size={18} aria-hidden="true" />}
                onClick={() => onNavigate(getUnitPath(selectedUnitKey))}
              >
                进入本单元课程
              </Button>
            </section>

            {cards.length > 0 ? (
              <>
                <div className="knowledge-card-view-switch" role="group" aria-label="卡片浏览方式">
                  <Button
                    type={viewMode === 'review' ? 'primary' : 'default'}
                    aria-pressed={viewMode === 'review'}
                    onClick={() => setViewMode('review')}
                  >
                    逐张复习
                  </Button>
                  <Button
                    type={viewMode === 'all' ? 'primary' : 'default'}
                    aria-pressed={viewMode === 'all'}
                    onClick={() => setViewMode('all')}
                  >
                    全部浏览
                  </Button>
                </div>

                {viewMode === 'review' && currentCard ? (
                  <section className="knowledge-review" aria-label="逐张复习知识卡片">
                    <div
                      className="knowledge-review-progress"
                      role="progressbar"
                      aria-label="知识卡片复习进度"
                      aria-valuemin={1}
                      aria-valuemax={cards.length}
                      aria-valuenow={currentIndex + 1}
                      aria-valuetext={`第 ${currentIndex + 1} 张，共 ${cards.length} 张`}
                    >
                      <span style={{ transform: `scaleX(${(currentIndex + 1) / cards.length})` }} />
                    </div>
                    <KnowledgeCardView card={currentCard} mode="review" key={currentCard.id} />
                    <nav className="knowledge-review-navigation" aria-label="切换知识卡片">
                      <Button disabled={currentIndex === 0} onClick={() => setReviewIndex((index) => Math.max(index - 1, 0))}>
                        上一张
                      </Button>
                      <p aria-live="polite">第 {currentIndex + 1} 张，共 {cards.length} 张</p>
                      <Button disabled={currentIndex >= cards.length - 1} onClick={() => setReviewIndex((index) => Math.min(index + 1, cards.length - 1))}>
                        下一张
                      </Button>
                    </nav>
                  </section>
                ) : (
                  <section className="knowledge-card-grid" aria-label={`${selectedUnit.title}知识卡片`}>
                    {cards.map((card) => <KnowledgeCardView card={card} mode="all" key={card.id} />)}
                  </section>
                )}
              </>
            ) : (
              <div className="catalog-empty-state" role="status">这个课程条目的知识卡片正在整理中。</div>
            )}
          </>
        ) : entries.length > 0 ? (
          <div className="catalog-empty-state" role="status">这个课程条目的知识卡片正在整理中。</div>
        ) : null}
      </div>
    </main>
  );
}
