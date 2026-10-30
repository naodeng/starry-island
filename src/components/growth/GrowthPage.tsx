import { useEffect, useState } from 'react';
import type { MouseEvent, KeyboardEvent } from 'react';
import { Button, Card } from 'animal-island-ui';
import { ArrowRightIcon, BookIcon, CompassIcon } from 'naive-icons';
import { getCompletedUnitCount, getCosmicRank } from '../../achievements/progress';
import EmptyState from '../shared/EmptyState';
import AchievementDashboard from '../achievements/AchievementDashboard';
import type { ChallengeGrowthSummary } from '../../challenges/domain/growth';
import ChallengeGrowth from '../../challenges/ui/ChallengeGrowth';
import { loadChallengeGrowthSummary } from '../../challenges/domain/growthSummaryReader';
import { resolveLearningSessionDestination } from '../../app/continueLearning';
import type { LearningSessionDestination } from '../../app/continueLearning';
import type { ProgressState, RecentCompletion } from '../../storage/progress';
import '../../challenges/ui/challenge.css';
import '../../styles/growth.css';

type GrowthView = 'overview' | 'learning' | 'challenge';
type ChallengeSummaryState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'ready'; summary: ChallengeGrowthSummary };

interface GrowthPageProps {
  progress: ProgressState;
  initialView: GrowthView;
  onNavigate: (path: string) => void;
}

interface RecentLearningActivity {
  completion: RecentCompletion;
  destination: LearningSessionDestination;
}

const GROWTH_VIEWS: ReadonlyArray<{ id: GrowthView; label: string }> = [
  { id: 'overview', label: '成长概览' },
  { id: 'learning', label: '学习星图' },
  { id: 'challenge', label: '闯关成长' },
];

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

function getCourseLocation(destination: LearningSessionDestination): string {
  return `${destination.gradeTitle}${destination.termTitle} · ${destination.subjectTitle} · ${destination.unitTitle}`;
}

function handleCourseLinkClick(event: MouseEvent<HTMLAnchorElement>, path: string, onNavigate: (path: string) => void) {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  onNavigate(path);
}

export default function GrowthPage({ progress, initialView, onNavigate }: GrowthPageProps) {
  const [activeView, setActiveView] = useState<GrowthView>(initialView);
  const [challengeState, setChallengeState] = useState<ChallengeSummaryState>({ status: 'idle' });
  const [challengeReadAttempt, setChallengeReadAttempt] = useState(0);
  const [recentActivities, setRecentActivities] = useState<RecentLearningActivity[]>([]);
  const completedUnitTotal = getCompletedUnitCount(progress.completedSessionIds, progress.learningStart);
  const learningRank = getCosmicRank(completedUnitTotal).title;

  useEffect(() => {
    setActiveView(initialView);
  }, [initialView]);

  useEffect(() => {
    if (activeView === 'learning') {
      setChallengeState({ status: 'idle' });
      return;
    }

    let cancelled = false;
    setChallengeState({ status: 'loading' });
    void loadChallengeGrowthSummary().then((summary) => {
      if (!cancelled) setChallengeState({ status: 'ready', summary });
    }).catch(() => {
      if (!cancelled) setChallengeState({ status: 'error' });
    });
    return () => { cancelled = true; };
  }, [activeView, challengeReadAttempt]);

  useEffect(() => {
    if (activeView !== 'overview') {
      setRecentActivities([]);
      return;
    }

    let cancelled = false;
    const completions = progress.recentCompletions.slice(0, 3);
    void Promise.all(completions.map(async (completion) => ({
      completion,
      destination: await resolveLearningSessionDestination(completion.sessionId),
    }))).then((resolved) => {
      if (cancelled) return;
      setRecentActivities(resolved.filter((entry): entry is RecentLearningActivity => entry.destination !== null));
    }).catch(() => {
      if (!cancelled) setRecentActivities([]);
    });

    return () => { cancelled = true; };
  }, [activeView, progress.recentCompletions]);

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, currentIndex: number) {
    let nextIndex: number | null = null;
    if (event.key === 'ArrowRight') nextIndex = (currentIndex + 1) % GROWTH_VIEWS.length;
    else if (event.key === 'ArrowLeft') nextIndex = (currentIndex + GROWTH_VIEWS.length - 1) % GROWTH_VIEWS.length;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = GROWTH_VIEWS.length - 1;
    if (nextIndex === null) return;

    event.preventDefault();
    const nextView = GROWTH_VIEWS[nextIndex]!;
    setActiveView(nextView.id);
    event.currentTarget.parentElement
      ?.querySelector<HTMLButtonElement>(`[data-growth-tab="${nextView.id}"]`)
      ?.focus();
  }

  const selectedTabId = `growth-tab-${activeView}`;
  const challengeStatus = challengeState.status === 'ready'
    ? 'ready'
    : challengeState.status === 'error' ? 'error' : 'loading';
  const challengeSummary = challengeState.status === 'ready'
    ? challengeState.summary
    : { completedAttempts: 0, passedTaskCount: 0, earnedBadgeCount: 0, groups: [] };
  const hasChallengeGrowth = challengeState.status === 'ready' && (
    challengeState.summary.completedAttempts > 0
    || challengeState.summary.passedTaskCount > 0
    || challengeState.summary.earnedBadgeCount > 0
  );

  return (
    <main className="achievement-page growth-page">
      <div className="catalog-shell growth-shell">
        <header className="achievement-page-heading growth-page-heading">
          <p className="eyebrow">课程学习与闯关挑战</p>
          <h1>成长中心</h1>
          <p>把每一次学习和闯关的进步，留在各自的成长记录里。</p>
        </header>

        <div className="growth-tabs" role="tablist" aria-label="成长视图">
          {GROWTH_VIEWS.map((view, index) => (
            <Button
              key={view.id}
              id={`growth-tab-${view.id}`}
              data-growth-tab={view.id}
              className="growth-tab"
              type={activeView === view.id ? 'primary' : 'default'}
              role="tab"
              aria-selected={activeView === view.id}
              aria-controls="growth-view-panel"
              tabIndex={activeView === view.id ? 0 : -1}
              onClick={() => setActiveView(view.id)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
            >
              {view.label}
            </Button>
          ))}
        </div>

        <div
          id="growth-view-panel"
          className="growth-view-panel"
          role="tabpanel"
          tabIndex={0}
          aria-labelledby={selectedTabId}
        >
          {activeView === 'overview' ? (
            <div className="growth-overview">
              <section className="growth-overview-metrics" aria-label="成长概览摘要">
                <article className="growth-summary-domain" role="region" aria-label="课程学习成长摘要">
                  <div className="growth-summary-domain-title">
                    <BookIcon size={20} aria-hidden="true" />
                    <h2 id="growth-learning-summary-heading">课程学习</h2>
                  </div>
                  {completedUnitTotal === 0 ? (
                    <EmptyState
                      className="growth-summary-card growth-summary-empty"
                      headingLevel={3}
                      title="还没有课程进度"
                      description={`当前头衔：${learningRank}；已点亮 0 座知识岛。完成一个完整课程单元后，这些进度会更新。`}
                      action={{ label: '查看学习星图', onAction: () => setActiveView('learning') }}
                    />
                  ) : (
                    <Card className="growth-summary-card" color="default">
                      <p>当前头衔</p>
                      <strong>{learningRank}</strong>
                      <span>已点亮 {completedUnitTotal} 座知识岛</span>
                      <Button type="text" onClick={() => setActiveView('learning')}>
                        查看学习星图 <ArrowRightIcon size={16} aria-hidden="true" />
                      </Button>
                    </Card>
                  )}
                </article>

                <article className="growth-summary-domain" role="region" aria-label="闯关成长摘要">
                  <div className="growth-summary-domain-title">
                    <CompassIcon size={20} aria-hidden="true" />
                    <h2 id="growth-challenge-summary-heading">闯关挑战</h2>
                  </div>
                  {challengeState.status === 'ready' && !hasChallengeGrowth ? (
                    <EmptyState
                      className="growth-summary-card growth-summary-empty"
                      headingLevel={3}
                      title="还没有闯关成果"
                      description="本机累计记录：0 次挑战、0 个任务、0 枚徽章。完成并提交一次挑战后，这些记录会显示在这里。"
                      action={{ label: '查看闯关课程', onAction: () => onNavigate('/challenges') }}
                    />
                  ) : (
                    <Card className="growth-summary-card" color="default">
                      {challengeState.status === 'idle' || challengeState.status === 'loading' ? (
                        <p className="growth-summary-status" aria-busy="true">正在读取闯关成长摘要…</p>
                      ) : challengeState.status === 'error' ? (
                        <div className="growth-summary-error" role="alert">
                          <p>闯关成长数据暂时无法读取，学习星图和近期课程记录仍可查看。</p>
                          <Button type="text" onClick={() => setChallengeReadAttempt((attempt) => attempt + 1)}>重新读取闯关进度</Button>
                        </div>
                      ) : (
                        <>
                          <p>本机累计记录</p>
                          <ul aria-label="闯关成长计数">
                            <li>{challengeState.summary.completedAttempts} 次挑战</li>
                            <li>{challengeState.summary.passedTaskCount} 个任务</li>
                            <li>{challengeState.summary.earnedBadgeCount} 枚徽章</li>
                          </ul>
                          <Button type="text" onClick={() => setActiveView('challenge')}>
                            查看闯关成长 <ArrowRightIcon size={16} aria-hidden="true" />
                          </Button>
                        </>
                      )}
                    </Card>
                  )}
                </article>
              </section>

              <section className="growth-recent-section" aria-labelledby="growth-recent-heading">
                <div className="growth-section-heading">
                  <div>
                    <p className="eyebrow">有时间记录的课程活动</p>
                    <h2 id="growth-recent-heading">最近课程学习</h2>
                  </div>
                  <span>最多显示 3 条</span>
                </div>
                {recentActivities.length === 0 ? (
                  <EmptyState
                    className="growth-recent-empty-state"
                    headingLevel={3}
                    title="暂时没有课程学习记录"
                    description="完成一场课程学习后，完成时间和课程链接会显示在这里。"
                  />
                ) : (
                  <ol className="growth-recent-list">
                    {recentActivities.map(({ completion, destination }) => {
                      const time = formatCompletionTime(completion.completedAt);
                      if (!time) return null;
                      return (
                        <li key={`${completion.sessionId}-${completion.completedAt}`}>
                          <a href={destination.path} onClick={(event) => handleCourseLinkClick(event, destination.path, onNavigate)}>
                            <span>
                              <strong>{destination.sessionTitle}</strong>
                              <small>{getCourseLocation(destination)}</small>
                            </span>
                            <time dateTime={completion.completedAt}>{time}</time>
                          </a>
                        </li>
                      );
                    })}
                  </ol>
                )}
              </section>
            </div>
          ) : activeView === 'learning' ? (
            <section className="growth-learning-view" aria-label="学习星图">
              <AchievementDashboard completedSessionIds={progress.completedSessionIds} learningStart={progress.learningStart} />
            </section>
          ) : (
            <section className="growth-challenge-view" aria-label="闯关成长">
              <ChallengeGrowth
                summary={challengeSummary}
                status={challengeStatus}
                onRetry={() => setChallengeReadAttempt((attempt) => attempt + 1)}
              />
            </section>
          )}
        </div>
      </div>
    </main>
  );
}
