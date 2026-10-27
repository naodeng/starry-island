import { Button, Card } from 'animal-island-ui';
import { ArrowRightIcon } from 'naive-icons';
import { getChallengeGroupPath, getChallengeGrowthPath, getChallengeWrongQuestionsPath } from '../../app/router';
import type { LoadedPilotGroup } from '../content/pilotContent';
import type { TaskProgress } from '../domain/types';

export function sortChallengeGroupsForDisplay(groups: readonly LoadedPilotGroup[]): LoadedPilotGroup[] {
  const subjectOrder = { chinese: 0, math: 1, english: 2 } as const;
  const stageOrder = { 'first-half': 0, 'second-half': 1, 'end-term': 2 } as const;
  const unitNumber = (group: LoadedPilotGroup) => Number(group.group.definition.sourceUnitIds[0]?.match(/\/unit-(\d+)$/u)?.[1] ?? Number.MAX_SAFE_INTEGER);

  return [...groups].sort((left, right) => {
    const a = left.group.definition;
    const b = right.group.definition;
    return a.grade - b.grade
      || a.semester - b.semester
      || subjectOrder[a.subject] - subjectOrder[b.subject]
      || (a.kind === 'unit' ? 0 : 1) - (b.kind === 'unit' ? 0 : 1)
      || (a.kind === 'unit' && b.kind === 'unit'
        ? unitNumber(left) - unitNumber(right)
        : (a.kind === 'semester' ? stageOrder[a.stage ?? 'first-half'] : 0)
          - (b.kind === 'semester' ? stageOrder[b.stage ?? 'first-half'] : 0))
      || a.id.localeCompare(b.id);
  });
}

export function getChallengeGroupTitle(group: LoadedPilotGroup['group']): string {
  const { definition } = group;
  const termLabel = definition.semester === 1 ? '上册' : '下册';
  const gradeLabel = ({ 1: '一', 2: '二', 3: '三', 4: '四', 5: '五', 6: '六' } as Record<number, string>)[definition.grade] ?? definition.grade;
  const subjectLabel = { chinese: '语文', math: '数学', english: '英语' }[definition.subject];
  const courseLabel = `${gradeLabel}年级${termLabel}${subjectLabel}`;

  if (definition.kind === 'unit') {
    const unitNumber = Number(definition.sourceUnitIds[0]?.match(/\/unit-(\d+)$/)?.[1]);
    const unitNumberLabel = ({ 1: '一', 2: '二', 3: '三', 4: '四', 5: '五', 6: '六', 7: '七', 8: '八', 9: '九', 10: '十' } as Record<number, string>)[unitNumber];
    return Number.isInteger(unitNumber) && unitNumber > 0
      ? `${courseLabel} · 第${unitNumberLabel ?? unitNumber}单元`
      : `${courseLabel} · 单元挑战`;
  }

  const stageLabels: Record<NonNullable<typeof definition.stage>, string> = {
    'first-half': '前半学期',
    'second-half': '后半学期',
    'end-term': '期末综合挑战',
  };
  const stageLabel = definition.stage ? stageLabels[definition.stage] : '学期挑战';
  return `${courseLabel} · ${stageLabel}`;
}

export function getChallengeGroupDescription(group: LoadedPilotGroup['group']): string {
  const { definition } = group;
  if (definition.kind === 'semester') {
    const orderedContent = definition.subject === 'chinese' ? '课程主题' : '教材章节';
    if (definition.stage === 'first-half') return `按${orderedContent}顺序练习${definition.semester === 1 ? '上' : '下'}册前半部分内容。`;
    if (definition.stage === 'second-half') return `按${orderedContent}顺序练习${definition.semester === 1 ? '上' : '下'}册后半部分内容。`;
    return `综合练习本册已登记的课程内容。`;
  }

  switch (definition.subject) {
    case 'math':
      if (definition.sourceUnitIds[0] === 'grade-1/term-2/math/unit-01') {
        return '练习三角形、长方形、正方形和圆的辨认、特征观察与简单拼组。';
      }
      if (definition.sourceUnitIds[0] === 'grade-1/term-2/math/unit-03') {
        return '练习按标准分类、记录数量、读取分类结果并检查记录。';
      }
      if (definition.sourceUnitIds[0] === 'grade-1/term-1/math/unit-01') {
        return '练习数一数、比一比和 0 的初步认识。';
      }
      if (definition.sourceUnitIds[0] === 'grade-1/term-1/math/unit-02') {
        return '练习上下、前后、左右、里外和按顺序描述路线。';
      }
      if (definition.sourceUnitIds[0] === 'grade-1/term-1/math/unit-03') {
        return '练习 5 以内数的组成、比较与加减法。';
      }
      if (definition.sourceUnitIds[0] === 'grade-1/term-1/math/unit-04') {
        return '认识球体、圆柱体、正方体和长方体，并观察它们的特点。';
      }
      return '练习两位数加减法、进位退位和数量关系。';
    case 'english':
      if (definition.sourceUnitIds[0] === 'grade-1/term-1/english/unit-01') {
        return '练习问候与告别、课堂指令和学习用品表达。';
      }
      if (definition.sourceUnitIds[0] === 'grade-1/term-1/english/unit-02') {
        return '练习眼、耳、鼻、口等面部词汇、相关指令和简单介绍句。';
      }
      if (definition.sourceUnitIds[0] === 'grade-1/term-1/english/unit-03') {
        return '练习常见动物名称，以及描述动物和表达喜好的简单句。';
      }
      if (definition.sourceUnitIds[0] === 'grade-1/term-1/english/unit-04') {
        return '练习 1～10 的英文数词、数数顺序和“How many books?”等数量表达。';
      }
      if (definition.sourceUnitIds[0] === 'grade-1/term-1/english/unit-05') {
        return '练习 red、blue、yellow、green 颜色词、询问颜色和描述颜色。';
      }
      if (definition.sourceUnitIds[0] === 'grade-1/term-1/english/unit-06') {
        return '练习 apple、pear、banana、orange 水果词，按类别分组并表达水果喜好。';
      }
      return '练习本单元的自我介绍、年龄和班级表达。';
    case 'chinese':
      return '阅读本单元课文，练习文本线索、表达方法与习作。';
  }
}

interface ChallengeCenterProps {
  groups: LoadedPilotGroup[];
  progressByTaskId: Readonly<Record<string, TaskProgress>>;
  progressAvailable: boolean;
  onNavigate: (path: string) => void;
}

export default function ChallengeCenter({ groups, progressByTaskId, progressAvailable, onNavigate }: ChallengeCenterProps) {
  return (
    <main className="challenge-page">
      <div className="challenge-shell">
        <header className="challenge-hero">
          <p className="eyebrow">独立练习 · 进度保存在本机</p>
          <h1>闯关中心</h1>
          <p>每道题只提交一次答案。完成挑战后，可以查看得分和解题讲解。</p>
          <div className="challenge-hero-actions">
            <Button type="default" onClick={() => onNavigate('/courses')}>返回课程目录</Button>
            <Button type="default" onClick={() => onNavigate(getChallengeGrowthPath())}>查看成长记录</Button>
            <Button type="default" onClick={() => onNavigate('/settings/backup')}>设置与数据管理</Button>
            <Button type="primary" onClick={() => onNavigate(getChallengeWrongQuestionsPath())}>打开错题本</Button>
          </div>
        </header>
        {!progressAvailable && <p className="challenge-inline-note" role="status">本机进度暂时没有读出；可以继续挑战，稍后再查看进度。</p>}
        <section className="challenge-section" aria-labelledby="challenge-groups-heading">
          <div className="challenge-section-heading">
            <div>
              <p className="eyebrow">已登记的路线</p>
              <h2 id="challenge-groups-heading">选择一条挑战航线</h2>
            </div>
          </div>
          <div className="challenge-card-grid">
            {sortChallengeGroupsForDisplay(groups).map(({ group, status, issues }) => {
              const taskProgress = group.definition.tasks.map(({ id }) => progressByTaskId[id]).filter(Boolean);
              const passedCount = taskProgress.filter(({ everPassed }) => everPassed).length;
              const progressLabel = status === 'ready'
                ? `${passedCount}/5 个任务已通过`
                : status === 'planned' ? '即将开放' : '暂不可用';
              return (
                <Card className="challenge-group-card" color="default" key={group.definition.id}>
                  <p className="eyebrow">{group.definition.kind === 'unit' ? '单元闯关' : '学期阶段闯关'}</p>
                  <h3>{getChallengeGroupTitle(group)}</h3>
                  <p className="challenge-card-description">{getChallengeGroupDescription(group)}</p>
                  <div className="challenge-card-progress">
                    <span>{progressLabel}</span>
                    {passedCount === 5 && <strong>徽章已点亮</strong>}
                  </div>
                  {status === 'ready' ? (
                    <Button type="primary" block icon={<ArrowRightIcon size={18} aria-hidden="true" />} onClick={() => onNavigate(getChallengeGroupPath(group.definition.id))}>
                      查看挑战任务
                    </Button>
                  ) : (
                    <div className="challenge-unavailable-note" role="note">
                      <strong>{status === 'planned' ? '这条路线正在准备中。' : '这条路线暂时不能开始。'}</strong>
                      {issues[0] && <span>内容质量门禁尚未通过。</span>}
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
