import { useState } from 'react';
import { Button, Card, Progress, Select } from '../../components/ui';
import { getSubjectTitle } from '../../app/router';
import { loadCourseTrack } from '../../storage/courseTrack';
import { getGradeTitle } from '../../content/gradeTitle';
import type { ChallengeGrowthGroup, ChallengeGrowthSummary } from '../domain/growth';

interface ChallengeGrowthProps {
  summary: ChallengeGrowthSummary;
  status: 'loading' | 'ready' | 'error';
  onRetry: () => void;
}

function getGroupTitle(group: ChallengeGrowthGroup): string {
  const term = group.semester === 1 ? '上册' : '下册';
  let scope = '学期挑战';
  if (group.kind === 'unit') {
    const lastUnit = group.sourceUnitIds[0]?.split('/').at(-1);
    const unitNumber = lastUnit?.match(/^unit-(\d+)$/)?.[1];
    scope = unitNumber ? `第${Number(unitNumber)}单元` : '单元挑战';
  } else if (group.stage === 'first-half') {
    scope = '前半学期';
  } else if (group.stage === 'second-half') {
    scope = '后半学期';
  } else if (group.stage === 'end-term') {
    scope = '期末综合';
  }
  return `${getGradeTitle(group.grade)}${term} · ${getSubjectTitle(group.subject)} · ${scope}`;
}

export default function ChallengeGrowth({ summary, status, onRetry }: ChallengeGrowthProps) {
  const [subjectFilter, setSubjectFilter] = useState('all');
  const savedTrack = loadCourseTrack();
  const trackGrade = savedTrack ? Number(savedTrack.gradeId.match(/^grade-(\d+)$/)?.[1]) : null;
  const trackSemester = savedTrack?.termId === 'term-1' ? 1 : savedTrack?.termId === 'term-2' ? 2 : null;
  const trackTitle = trackGrade !== null && trackSemester !== null
    ? `${getGradeTitle(trackGrade)} · ${trackSemester === 1 ? '上学期' : '下学期'}`
    : '全部已登记路线';
  const trackGroups = savedTrack && trackGrade !== null && trackSemester !== null
    ? summary.groups.filter((group) => group.grade === trackGrade && group.semester === trackSemester)
    : summary.groups;
  const subjectLabels = { chinese: '语文', math: '数学', english: '英语' } as const;
  const availableSubjects = (['chinese', 'math', 'english'] as const).filter((subject) => trackGroups.some((group) => group.subject === subject));
  const subjectOptions = [
    { key: 'all', label: '全部学科' },
    ...availableSubjects.map((subject) => ({ key: subject, label: subjectLabels[subject as keyof typeof subjectLabels] })),
  ];
  const filteredGroups = trackGroups.filter((group) => subjectFilter === 'all' || group.subject === subjectFilter);
  const hasActiveFilter = subjectFilter !== 'all';

  if (status === 'loading') {
    return (
      <section className="challenge-growth-view" aria-live="polite" aria-busy="true">
        <h2>闯关成长</h2>
        <p role="status">正在读取成长记录…</p>
      </section>
    );
  }

  if (status === 'error') {
    return (
      <section className="challenge-growth-view" aria-labelledby="challenge-growth-error-heading">
        <h2 id="challenge-growth-error-heading">闯关成长</h2>
        <Card className="challenge-message-card" color="default" role="alert">
          <p className="eyebrow">本机数据暂时没有读出</p>
          <h3>成长记录暂时无法打开</h3>
          <p>闯关记录没有被更改，稍后可以重试读取。</p>
          <Button type="primary" onClick={onRetry}>重新读取闯关进度</Button>
        </Card>
      </section>
    );
  }

  return (
    <div className="challenge-growth-view">
      <section className="challenge-section" aria-label="闯关成长摘要" aria-labelledby="challenge-growth-summary-heading">
        <div className="challenge-section-heading">
          <div>
            <p className="eyebrow">本机累计记录</p>
            <h2 id="challenge-growth-summary-heading">闯关累计</h2>
          </div>
        </div>
        <div className="challenge-growth-metrics">
          <Card className="challenge-growth-metric" color="default">
            <p>完成挑战</p>
            <strong>{summary.completedAttempts} 次</strong>
          </Card>
          <Card className="challenge-growth-metric" color="default">
            <p>曾经通过</p>
            <strong>{summary.passedTaskCount} 个任务</strong>
          </Card>
          <Card className="challenge-growth-metric" color="default">
            <p>点亮徽章</p>
            <strong>{summary.earnedBadgeCount} 枚徽章</strong>
          </Card>
        </div>
      </section>

      <section className="challenge-section" aria-labelledby="challenge-growth-groups-heading">
        <div className="challenge-section-heading">
          <div>
            <p className="eyebrow">已登记的挑战路线</p>
            <h2 id="challenge-growth-groups-heading">各路线进度</h2>
          </div>
        </div>
        <p className="challenge-track-context">当前赛道：{trackTitle}</p>
        {summary.groups.length === 0 ? (
          <p className="challenge-inline-note" role="status">完成一场挑战后，成长记录会出现在这里。</p>
        ) : (
          <>
            <div className="challenge-filters" role="group" aria-label="筛选成长路线">
              <label>
                <span>学科</span>
                <Select aria-label="成长记录学科" options={subjectOptions} value={subjectFilter} onChange={setSubjectFilter} />
              </label>
            </div>
            <div className="challenge-filter-summary">
              <p aria-live="polite">正在显示 {filteredGroups.length} 条路线，共 {trackGroups.length} 条</p>
              {hasActiveFilter && (
                <Button type="text" onClick={() => setSubjectFilter('all')}>
                  清除筛选
                </Button>
              )}
            </div>
            {trackGroups.length === 0 ? (
              <p className="challenge-inline-note" role="status">当前赛道还没有挑战记录。</p>
            ) : filteredGroups.length === 0 ? (
              <div className="challenge-filter-empty">
                <p className="challenge-inline-note" role="status">当前筛选条件下暂时没有登记的挑战路线。</p>
                <Button type="default" onClick={() => setSubjectFilter('all')}>显示当前赛道全部路线</Button>
              </div>
            ) : (
              <ul className="challenge-growth-list">
                {filteredGroups.map((group) => {
                  const progressText = `${group.passedTaskCount}/${group.taskCount} 个任务已通过`;
                  const percent = group.taskCount > 0 ? group.passedTaskCount / group.taskCount * 100 : 0;
                  return (
                    <li key={group.groupId}>
                      <Card className="challenge-growth-route" color="default">
                        <p className="eyebrow">{group.kind === 'unit' ? '单元闯关' : '学期阶段闯关'}</p>
                        <h3>{getGroupTitle(group)}</h3>
                        <p className="challenge-growth-progress-label">{progressText}</p>
                        <Progress
                          percent={percent}
                          size="small"
                          showInfo={false}
                          duration={0}
                          aria-label={`${getGroupTitle(group)}：${progressText}`}
                        />
                        {group.badgeEarned && <p className="challenge-growth-badge">组徽章已点亮</p>}
                      </Card>
                    </li>
                  );
                })}
              </ul>
            )}
          </>
        )}
      </section>

      <p className="challenge-growth-note">只统计此设备保存的数据；不保存完整作答历史，也不统计连续学习天数。</p>
    </div>
  );
}
