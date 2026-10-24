import { Button, Card, Progress } from 'animal-island-ui';
import { getSubjectTitle } from '../../app/router';
import type { ChallengeGrowthGroup, ChallengeGrowthSummary } from '../domain/growth';

interface ChallengeGrowthProps {
  summary: ChallengeGrowthSummary;
  status: 'loading' | 'ready' | 'error';
  onRetry: () => void;
}

function getGroupTitle(group: ChallengeGrowthGroup): string {
  const term = group.semester === 1 ? '上册' : '下册';
  const gradeName = ['一', '二', '三', '四', '五', '六'][group.grade - 1] ?? String(group.grade);
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
  return `${gradeName}年级${term} · ${getSubjectTitle(group.subject)} · ${scope}`;
}

export default function ChallengeGrowth({ summary, status, onRetry }: ChallengeGrowthProps) {
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
      <h2>闯关成长记录</h2>
      <p className="challenge-growth-intro">看看已经完成的挑战、通过的任务和点亮的组徽章。这里只显示本机汇总，不推测挑战发生时间。</p>

        <section className="challenge-section" aria-label="闯关成长摘要" aria-labelledby="challenge-growth-summary-heading">
          <div className="challenge-section-heading">
            <div>
              <p className="eyebrow">本机累计记录</p>
              <h2 id="challenge-growth-summary-heading">一步一步积累</h2>
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
          {summary.groups.length === 0 ? (
            <p className="challenge-inline-note" role="status">完成一场挑战后，成长记录会出现在这里。</p>
          ) : (
            <ul className="challenge-growth-list">
              {summary.groups.map((group) => {
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
        </section>

        <p className="challenge-growth-note">只统计此设备保存的数据；不保存完整作答历史，也不统计连续学习天数。</p>
    </div>
  );
}
