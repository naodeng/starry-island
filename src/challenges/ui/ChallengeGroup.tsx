import { Button, Card } from 'animal-island-ui';
import { ArrowRightIcon } from 'naive-icons';
import { getChallengeCenterPath, getChallengeTaskPath } from '../../app/router';
import type { LoadedPilotGroup } from '../content/pilotContent';
import type { TaskProgress } from '../domain/types';
import { getChallengeGroupTitle } from './ChallengeCenter';
import { getChallengeTaskTitle } from './challengeLabels';

interface ChallengeGroupProps {
  loadedGroup: LoadedPilotGroup;
  progressByTaskId: Readonly<Record<string, TaskProgress>>;
  onNavigate: (path: string) => void;
}

export default function ChallengeGroup({ loadedGroup, progressByTaskId, onNavigate }: ChallengeGroupProps) {
  const { group } = loadedGroup;
  if (loadedGroup.status !== 'ready') {
    return (
      <main className="challenge-page">
        <div className="challenge-shell">
          <Card className="challenge-message-card" color="default">
            <p className="eyebrow">内容审核中</p>
            <h1>{getChallengeGroupTitle(group)}</h1>
            <p>这条挑战路线还没有通过内容质量检查，暂时不能开始。</p>
            <Button type="primary" onClick={() => onNavigate(getChallengeCenterPath())}>返回闯关中心</Button>
          </Card>
        </div>
      </main>
    );
  }
  return (
    <main className="challenge-page">
      <div className="challenge-shell">
        <header className="challenge-subpage-heading">
          <Button type="text" onClick={() => onNavigate(getChallengeCenterPath())}>返回闯关中心</Button>
          <p className="eyebrow">{group.definition.kind === 'unit' ? '单元挑战' : '学期阶段挑战'}</p>
          <h1>{getChallengeGroupTitle(group)}</h1>
          <p>每题提交一次答案。所有任务均可自由选择，不会影响课程学习进度。</p>
        </header>
        <section className="challenge-section" aria-labelledby="challenge-task-list-heading">
          <div className="challenge-section-heading">
            <div>
              <p className="eyebrow">五个挑战任务</p>
              <h2 id="challenge-task-list-heading">选择一个任务开始</h2>
            </div>
            <p className="challenge-group-progress">
              {group.definition.tasks.filter(({ id }) => progressByTaskId[id]?.everPassed).length}/5 个任务已通过
            </p>
          </div>
          <div className="challenge-task-grid">
            {group.definition.tasks.map((task) => {
              const progress = progressByTaskId[task.id];
              return (
                <Card className="challenge-task-card" color="default" key={task.id}>
                  <p className="eyebrow">{task.difficulty === 'basic' ? '稳稳练习' : task.difficulty === 'advanced' ? '连起知识' : '灵活运用'}</p>
                  <h3>{getChallengeTaskTitle(group, task)}</h3>
                  <p>{task.targetCount} 道题 · {task.requiredKnowledgePointIds.length} 个核心知识点</p>
                  <div className="challenge-card-progress">
                    <span>{progress?.everPassed ? '已经通过' : progress ? `最近 ${progress.latestCorrect}/${progress.latestTotal}` : '还没有挑战记录'}</span>
                    {progress && <span>已完成 {progress.completedCount} 次</span>}
                  </div>
                  <Button type="primary" block icon={<ArrowRightIcon size={18} aria-hidden="true" />} onClick={() => onNavigate(getChallengeTaskPath(task.id))}>
                    {progress?.everPassed ? '再次挑战' : '开始挑战'}
                  </Button>
                </Card>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
