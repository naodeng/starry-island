import { useEffect, useMemo, useState } from 'react';
import { Button, Card } from 'animal-island-ui';
import type { AppRoute } from '../../app/router';
import type { TaskProgress } from '../domain/types';
import type { ChallengeRepository } from '../storage/repository';
import { createChallengeRepository } from '../storage/indexedDbRepository';
import { loadPilotChallengeContent } from '../content/pilotContent';
import type { LoadedPilotContent } from '../content/pilotContent';
import ChallengeCenter from './ChallengeCenter';
import ChallengeGroup from './ChallengeGroup';
import ChallengeRunner from './ChallengeRunner';
import { getChallengeTaskTitle } from './challengeLabels';
import './challenge.css';

type ChallengeRoute = Extract<AppRoute, { kind: 'challengeCenter' | 'challengeGroup' | 'challengeTask' }>;

interface ChallengePageProps {
  route: ChallengeRoute;
  onNavigate: (path: string) => void;
  repository?: ChallengeRepository;
}

export default function ChallengePage({ route, onNavigate, repository: providedRepository }: ChallengePageProps) {
  const repository = useMemo(() => providedRepository ?? createChallengeRepository(), [providedRepository]);
  const [content, setContent] = useState<LoadedPilotContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [contentError, setContentError] = useState<string | null>(null);
  const [progressByTaskId, setProgressByTaskId] = useState<Record<string, TaskProgress>>({});
  const [progressAvailable, setProgressAvailable] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setContentError(null);
    loadPilotChallengeContent().then(async (loadedContent) => {
      if (cancelled) return;
      setContent(loadedContent);
      setLoading(false);
    }).catch(() => {
      if (cancelled) return;
      setContentError('闯关题库暂时没有载入。你的课程进度没有变化，可以稍后重新打开。');
      setLoading(false);
    });
    return () => { cancelled = true; };
  }, [repository]);

  useEffect(() => {
    if (!content) return;
    let cancelled = false;
    Promise.all(content.groups.map(async ({ group }) => {
      try {
        return await repository.getGroupProgress(group.definition.tasks.map(({ id }) => id));
      } catch {
        return null;
      }
    })).then((entries) => {
      if (cancelled) return;
      const progress: Record<string, TaskProgress> = {};
      let available = true;
      for (const entry of entries) {
        if (entry === null) available = false;
        else for (const item of entry) progress[item.taskId] = item;
      }
      setProgressByTaskId(progress);
      setProgressAvailable(available);
    });
    return () => { cancelled = true; };
  }, [content, repository, route]);

  useEffect(() => () => {
    if (!providedRepository) repository.close();
  }, [providedRepository, repository]);

  if (loading) {
    return <main className="challenge-page" aria-live="polite" aria-busy="true"><div className="challenge-shell"><h1>正在准备闯关航线…</h1></div></main>;
  }
  if (!content || contentError) {
    return (
      <main className="challenge-page">
        <div className="challenge-shell">
          <Card className="challenge-message-card" color="default">
            <p className="eyebrow">闯关中心</p>
            <h1>挑战暂时没有打开</h1>
            <p>{contentError}</p>
            <Button type="primary" onClick={() => onNavigate('/')}>返回课程目录</Button>
          </Card>
        </div>
      </main>
    );
  }

  if (route.kind === 'challengeCenter') {
    return <ChallengeCenter groups={content.groups} progressByTaskId={progressByTaskId} progressAvailable={progressAvailable} onNavigate={onNavigate} />;
  }

  if (route.kind === 'challengeGroup') {
    const loadedGroup = content.groups.find(({ group }) => group.definition.id === route.groupId);
    if (!loadedGroup) return <ChallengeNotFound onNavigate={onNavigate} />;
    return <ChallengeGroup loadedGroup={loadedGroup} progressByTaskId={progressByTaskId} onNavigate={onNavigate} />;
  }

  const taskGroup = content.groups.find(({ group }) => group.definition.tasks.some(({ id }) => id === route.taskId));
  const task = taskGroup?.group.definition.tasks.find(({ id }) => id === route.taskId);
  if (!taskGroup || !task) return <ChallengeNotFound onNavigate={onNavigate} />;
  if (taskGroup.status !== 'ready') {
    return (
      <main className="challenge-page">
        <div className="challenge-shell">
          <Card className="challenge-message-card" color="default">
            <p className="eyebrow">内容审核中</p>
            <h1>这条挑战路线暂时不能开始</h1>
            <p>题库通过必要的内容质量检查后才会开放。</p>
            <Button type="primary" onClick={() => onNavigate(`/challenges/group/${encodeURIComponent(taskGroup.group.definition.id)}`)}>返回挑战任务</Button>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <ChallengeRunner
      loadedGroup={taskGroup}
      task={task}
      taskTitle={getChallengeTaskTitle(taskGroup.group, task)}
      key={task.id}
      repository={repository}
      manifestVersion={content.manifestVersion}
      onNavigate={onNavigate}
    />
  );
}

function ChallengeNotFound({ onNavigate }: { onNavigate: (path: string) => void }) {
  return (
    <main className="challenge-page">
      <div className="challenge-shell">
        <Card className="challenge-message-card" color="default">
          <p className="eyebrow">路线暂时中断</p>
          <h1>没有找到这条挑战路线</h1>
          <p>从闯关中心重新选择一条已经登记的路线吧。</p>
          <Button type="primary" onClick={() => onNavigate('/challenges')}>返回闯关中心</Button>
        </Card>
      </div>
    </main>
  );
}
