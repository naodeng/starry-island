import { useEffect, useState } from 'react';
import type { MouseEvent } from 'react';
import { Button, Card, Select } from 'animal-island-ui';
import { ArrowRightIcon, BookIcon, CompassIcon } from 'naive-icons';
import { getCompletedUnitCount, getCosmicRank } from '../../achievements/progress';
import { resolveContinueLearningDestination, resolveLearningSessionDestination } from '../../app/continueLearning';
import type { ContinueLearningDestination, LearningSessionDestination } from '../../app/continueLearning';
import type { ChallengeGrowthSummary } from '../../challenges/domain/growth';
import { loadChallengeGrowthSummary } from '../../challenges/domain/growthSummaryReader';
import type { ProgressState, RecentCompletion } from '../../storage/progress';
import { curriculumManifest } from '../../content/curriculumManifest';
import { loadCourseSelection, saveCourseSelection } from '../../storage/courseSelection';
import type { CourseSelection } from '../../storage/courseSelection';
import '../../styles/home-dashboard.css';

interface HomeDashboardProps {
  progress: ProgressState;
  onNavigate: (path: string) => void;
}

type ContinueState = { status: 'loading' } | { status: 'ready'; destination: ContinueLearningDestination | null };
type ChallengeSummaryState =
  | { status: 'loading' }
  | { status: 'ready'; summary: ChallengeGrowthSummary }
  | { status: 'error' };

interface RecentDestination {
  event: RecentCompletion;
  destination: LearningSessionDestination;
}

function formatCompletionTime(value: string): string | null {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat('zh-CN', {
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

function handleCourseLinkClick(event: MouseEvent<HTMLAnchorElement>, path: string, onNavigate: (path: string) => void) {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  onNavigate(path);
}

function getCourseLocation(destination: LearningSessionDestination): string {
  return `${destination.gradeTitle}${destination.termTitle} · ${destination.subjectTitle} · ${destination.unitTitle}`;
}

function getInitialCourseSelection(progress: ProgressState): CourseSelection {
  const savedSelection = loadCourseSelection();
  if (savedSelection) return savedSelection;

  const grade = curriculumManifest.grades.find(({ id }) => id === `grade-${progress.learningStart?.grade}`)
    ?? curriculumManifest.grades[0]!;
  const term = grade.terms.find(({ id }) => id === `term-${progress.learningStart?.term}`)
    ?? grade.terms[0]!;
  const subject = term.subjects[0]!;
  return { gradeId: grade.id, termId: term.id, subjectId: subject.id };
}

export default function HomeDashboard({ progress, onNavigate }: HomeDashboardProps) {
  const [courseSelection, setCourseSelection] = useState(() => getInitialCourseSelection(progress));
  const [continueState, setContinueState] = useState<ContinueState>({ status: 'loading' });
  const [recentDestinations, setRecentDestinations] = useState<RecentDestination[]>([]);
  const [challengeState, setChallengeState] = useState<ChallengeSummaryState>({ status: 'loading' });
  const [challengeReadAttempt, setChallengeReadAttempt] = useState(0);
  const completedUnitCount = getCompletedUnitCount(progress.completedSessionIds, progress.learningStart);
  const currentRank = getCosmicRank(completedUnitCount);

  useEffect(() => {
    saveCourseSelection(courseSelection);
  }, [courseSelection]);

  useEffect(() => {
    let cancelled = false;
    setContinueState({ status: 'loading' });
    void resolveContinueLearningDestination(progress).then((destination) => {
      if (!cancelled) setContinueState({ status: 'ready', destination });
    }).catch(() => {
      if (!cancelled) setContinueState({ status: 'ready', destination: null });
    });

    return () => { cancelled = true; };
  }, [progress.completedSessionIds, progress.learningStart]);

  useEffect(() => {
    let cancelled = false;
    const events = progress.recentCompletions.slice(0, 3);
    void Promise.all(events.map(async (event) => ({
      event,
      destination: await resolveLearningSessionDestination(event.sessionId),
    }))).then((resolved) => {
      if (cancelled) return;
      setRecentDestinations(resolved.filter((item): item is RecentDestination => item.destination !== null));
    }).catch(() => {
      if (!cancelled) setRecentDestinations([]);
    });

    return () => { cancelled = true; };
  }, [progress.recentCompletions]);

  useEffect(() => {
    let cancelled = false;
    setChallengeState({ status: 'loading' });
    void loadChallengeGrowthSummary().then((summary) => {
      if (!cancelled) setChallengeState({ status: 'ready', summary });
    }).catch(() => {
      if (!cancelled) setChallengeState({ status: 'error' });
    });

    return () => { cancelled = true; };
  }, [challengeReadAttempt]);

  const destination = continueState.status === 'ready' ? continueState.destination : null;
  const continueLabel = continueState.status === 'loading'
    ? '正在寻找下一场…'
    : destination
      ? '继续学习'
      : '浏览课程';
  const selectedGrade = curriculumManifest.grades.find(({ id }) => id === courseSelection.gradeId) ?? curriculumManifest.grades[0]!;
  const selectedTerm = selectedGrade.terms.find(({ id }) => id === courseSelection.termId) ?? selectedGrade.terms[0]!;

  function updateCourseSelection(nextGradeId: string, nextTermId?: string) {
    const nextGrade = curriculumManifest.grades.find(({ id }) => id === nextGradeId);
    const nextTerm = nextGrade?.terms.find(({ id }) => id === (nextTermId ?? courseSelection.termId))
      ?? nextGrade?.terms[0];
    if (!nextGrade || !nextTerm) return;
    const nextSubject = nextTerm.subjects.find(({ id }) => id === courseSelection.subjectId)
      ?? nextTerm.subjects[0];
    if (!nextSubject) return;
    const nextSelection = { gradeId: nextGrade.id, termId: nextTerm.id, subjectId: nextSubject.id };
    setCourseSelection(nextSelection);
  }

  return (
    <main className="home-dashboard">
      <div className="catalog-shell home-dashboard-shell">
        <header className="home-dashboard-heading">
          <h1>今天，想从哪里出发？</h1>
          <p>按自己的节奏继续学习，或去闯关试试所学。</p>
          <div className="home-current-course" role="group" aria-label="当前课程选择">
            <span className="eyebrow">当前课程</span>
            <label>
              <span id="home-current-grade-label">年级</span>
              <Select
                aria-label="当前年级"
                options={curriculumManifest.grades.map(({ id, title }) => ({ key: id, label: title }))}
                value={selectedGrade.id}
                onChange={(gradeId) => updateCourseSelection(gradeId)}
              />
            </label>
            <label>
              <span id="home-current-term-label">学期</span>
              <Select
                aria-label="当前学期"
                options={selectedGrade.terms.map(({ id, title }) => ({ key: id, label: title }))}
                value={selectedTerm.id}
                onChange={(termId) => updateCourseSelection(selectedGrade.id, termId)}
              />
            </label>
            <span className="home-current-course-note">课程目录和闯关中心会沿用此选择。</span>
          </div>
        </header>

        <div className="home-dashboard-content">
          <section className="home-dashboard-continue" aria-labelledby="home-continue-heading">
            <Card className="home-continue-panel" color="default">
              <div className="home-continue-copy">
                <h2 id="home-continue-heading">继续学习</h2>
                {destination ? (
                  <p>{getCourseLocation(destination)} · {destination.sessionTitle}</p>
                ) : continueState.status === 'loading' ? (
                  <p className="home-loading-copy" aria-busy="true">正在为你查找已开放课程中的下一场基础版学习。</p>
                ) : (
                  <p>暂时没有可继续的基础版场次，可以浏览课程目录并自己选择下一项任务。</p>
                )}
              </div>
              <Button
                type="primary"
                disabled={continueState.status === 'loading'}
                icon={<ArrowRightIcon size={18} aria-hidden="true" />}
                onClick={() => onNavigate(destination ? destination.path : '/courses')}
              >
                {continueLabel}
              </Button>
            </Card>
          </section>

          <section className="home-dashboard-progress" aria-labelledby="home-progress-heading">
            <h2 id="home-progress-heading">当前进度</h2>
            <div className="home-progress-domains">
              <article className="home-progress-domain home-progress-course" aria-labelledby="home-course-progress-heading">
                <div className="home-domain-title">
                  <BookIcon size={20} aria-hidden="true" />
                  <h3 id="home-course-progress-heading">课程学习</h3>
                </div>
                <p className="home-progress-rank">{currentRank.title}</p>
                <p className="home-progress-count">已点亮 {completedUnitCount} 座完整知识岛</p>
                <Button type="text" onClick={() => onNavigate('/achievements')}>
                  查看学习成长 <ArrowRightIcon size={16} aria-hidden="true" />
                </Button>
              </article>

              <article className="home-progress-domain home-progress-challenge" aria-labelledby="home-challenge-progress-heading">
                <div className="home-domain-title">
                  <CompassIcon size={20} aria-hidden="true" />
                  <h3 id="home-challenge-progress-heading">闯关挑战</h3>
                </div>
                {challengeState.status === 'loading' ? (
                  <p className="home-loading-copy" aria-busy="true">正在读取闯关进度…</p>
                ) : challengeState.status === 'error' ? (
                  <div className="home-progress-error" role="alert">
                    <p>闯关进度暂时无法读取，课程学习仍可继续。</p>
                    <Button type="text" onClick={() => setChallengeReadAttempt((attempt) => attempt + 1)}>重新读取</Button>
                  </div>
                ) : (
                  <>
                    {challengeState.summary.completedAttempts === 0
                      && challengeState.summary.passedTaskCount === 0
                      && challengeState.summary.earnedBadgeCount === 0 ? (
                        <div className="home-inline-empty home-challenge-empty">
                          <div role="status">
                            <h4>还没有闯关成果</h4>
                            <p>完成并提交一次挑战后，成绩和徽章会显示在这里。</p>
                          </div>
                          <Button type="default" onClick={() => onNavigate('/challenges')}>开始挑战</Button>
                        </div>
                      ) : (
                        <>
                          <ul className="home-challenge-counts" aria-label="闯关成长摘要">
                            <li>已完成 <strong>{challengeState.summary.completedAttempts}</strong> 次挑战</li>
                            <li>通过 <strong>{challengeState.summary.passedTaskCount}</strong> 个任务</li>
                            <li>点亮 <strong>{challengeState.summary.earnedBadgeCount}</strong> 枚徽章</li>
                          </ul>
                          <Button type="text" onClick={() => onNavigate('/challenges/growth')}>
                            查看闯关成长 <ArrowRightIcon size={16} aria-hidden="true" />
                          </Button>
                        </>
                      )}
                  </>
                )}
              </article>
            </div>
          </section>

          <section className="home-dashboard-recent" aria-labelledby="home-recent-heading">
            <div className="home-section-heading">
              <h2 id="home-recent-heading">最近学习记录</h2>
              <span>最多显示 3 条</span>
            </div>
            {recentDestinations.length === 0 ? (
              <div className="home-inline-empty home-recent-empty" role="status">
                <BookIcon size={24} aria-hidden="true" />
                <div>
                  <h3>还没有学习记录</h3>
                  <p>完成一场学习后，最近记录会显示在这里。</p>
                </div>
              </div>
            ) : (
              <ol className="home-recent-list">
                {recentDestinations.map(({ event, destination: recentDestination }) => {
                  const time = formatCompletionTime(event.completedAt);
                  if (!time) return null;
                  return (
                    <li key={`${event.sessionId}-${event.completedAt}`}>
                      <a
                        href={recentDestination.path}
                        onClick={(event) => handleCourseLinkClick(event, recentDestination.path, onNavigate)}
                      >
                        <span className="home-recent-copy">
                          <strong>{recentDestination.sessionTitle}</strong>
                          <span>{getCourseLocation(recentDestination)}</span>
                        </span>
                        <time dateTime={event.completedAt}>{time}</time>
                      </a>
                    </li>
                  );
                })}
              </ol>
            )}
          </section>

          <section className="home-dashboard-challenge-entry" aria-labelledby="home-challenge-entry-heading">
            <div>
              <h2 id="home-challenge-entry-heading">闯关入口</h2>
              <p>这是课程学习之外的独立练习，闯关成绩单独保存在本机。</p>
            </div>
            <Button type="default" onClick={() => onNavigate('/challenges')}>
              进入闯关中心 <ArrowRightIcon size={17} aria-hidden="true" />
            </Button>
          </section>
        </div>
      </div>
    </main>
  );
}
