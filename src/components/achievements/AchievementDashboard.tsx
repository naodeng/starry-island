import { useState } from 'react';
import type { KeyboardEvent } from 'react';
import { Button, Card } from 'animal-island-ui';
import { ArrowRightIcon, CheckCircleIcon, CheckIcon, ClockIcon, CompassIcon, FlameIcon, GlobeIcon, KeyIcon, LockIcon, MapIcon, MoonIcon, RefreshIcon, RocketIcon, ShieldIcon, StarIcon, TrophyIcon, WaterCupIcon } from 'naive-icons';
import { COSMIC_RANKS, getCompletedUnitCount, getCosmicRank, getLearningUnitProgress } from '../../achievements/progress';
import type { LearningPosition } from '../../achievements/position';
import { getExplorationZones } from '../../achievements/exploration';
import { loadCourseSelection } from '../../storage/courseSelection';
import { getGradeTitle } from '../../content/gradeTitle';
import { curriculumManifest } from '../../content/curriculumManifest';

const RANK_ICONS = [RocketIcon, MoonIcon, StarIcon, GlobeIcon, TrophyIcon] as const;
const ZONE_ICONS = [MoonIcon, FlameIcon, RocketIcon, RefreshIcon, GlobeIcon, CompassIcon, ShieldIcon, StarIcon, KeyIcon, MapIcon, WaterCupIcon, TrophyIcon] as const;
const GRADE_LEVELS = [1, 2, 3, 4, 5, 6] as const;
const TERM_LEVELS = [1, 2] as const;

type GradeLevel = typeof GRADE_LEVELS[number];
type TermLevel = typeof TERM_LEVELS[number];

function getInitialSchoolScope(learningStart: LearningPosition | null): { grade: GradeLevel; term: TermLevel } {
  const selection = loadCourseSelection();
  const selectedGrade = Number(selection?.gradeId.match(/^grade-(\d+)$/)?.[1]);
  const selectedTerm = Number(selection?.termId.match(/^term-(\d+)$/)?.[1]);
  const startGrade = learningStart?.grade;
  const startTerm = learningStart?.term;
  const defaultGrade = Number(curriculumManifest.grades[0]?.id.match(/^grade-(\d+)$/)?.[1]);
  const defaultTerm = Number(curriculumManifest.grades[0]?.terms[0]?.id.match(/^term-(\d+)$/)?.[1]);
  const grade = GRADE_LEVELS.includes(selectedGrade as GradeLevel)
    ? selectedGrade as GradeLevel
    : GRADE_LEVELS.includes(startGrade as GradeLevel) ? startGrade as GradeLevel
      : GRADE_LEVELS.includes(defaultGrade as GradeLevel) ? defaultGrade as GradeLevel : 1;
  const term = TERM_LEVELS.includes(selectedTerm as TermLevel)
    ? selectedTerm as TermLevel
    : TERM_LEVELS.includes(startTerm as TermLevel) ? startTerm as TermLevel
      : TERM_LEVELS.includes(defaultTerm as TermLevel) ? defaultTerm as TermLevel : 1;
  return { grade, term };
}

interface AchievementDashboardProps {
  completedSessionIds: string[];
  learningStart: LearningPosition | null;
}

export default function AchievementDashboard({ completedSessionIds, learningStart }: AchievementDashboardProps) {
  const units = getLearningUnitProgress(completedSessionIds, learningStart);
  const zones = getExplorationZones(completedSessionIds, learningStart);
  const completedUnitCount = getCompletedUnitCount(completedSessionIds, learningStart);
  const currentRank = getCosmicRank(completedUnitCount);
  const nextRank = COSMIC_RANKS.find((rank) => rank.unitsRequired > completedUnitCount);
  const rankProgress = nextRank
    ? Math.round(((completedUnitCount - currentRank.unitsRequired) / (nextRank.unitsRequired - currentRank.unitsRequired)) * 100)
    : 100;
  const progressGroups = units.reduce<Array<{
    key: string;
    gradeTitle: string;
    termTitle: string;
    subjectTitle: string;
    units: typeof units;
  }>>((groups, entry) => {
    const key = `${entry.gradeTitle}|${entry.termTitle}|${entry.subjectTitle}`;
    const existing = groups.find((group) => group.key === key);
    if (existing) existing.units.push(entry);
    else groups.push({
      key,
      gradeTitle: entry.gradeTitle,
      termTitle: entry.termTitle,
      subjectTitle: entry.subjectTitle,
      units: [entry],
    });
    return groups;
  }, []);
  const [selectedScope, setSelectedScope] = useState(() => getInitialSchoolScope(learningStart));
  const [expandedZoneId, setExpandedZoneId] = useState<string | null>(null);
  const [expandedRecordGroupKey, setExpandedRecordGroupKey] = useState<string | null>(null);
  const gradeTitle = getGradeTitle(selectedScope.grade);
  const termTitle = selectedScope.term === 1 ? '上学期' : '下学期';
  const visibleZones = zones.filter((zone) => zone.gradeId === `grade-${selectedScope.grade}` && zone.termId === `term-${selectedScope.term}`);
  const visibleProgressGroups = progressGroups.filter((group) => group.gradeTitle === gradeTitle && group.termTitle === termTitle);
  const visibleUnitCount = visibleProgressGroups.reduce((total, group) => total + group.units.length, 0);

  function handleScopeTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, currentIndex: number, options: readonly number[], select: (value: number) => void, attribute: 'grade' | 'term') {
    let nextIndex: number | null = null;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (currentIndex + 1) % options.length;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (currentIndex + options.length - 1) % options.length;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = options.length - 1;
    if (nextIndex === null) return;

    event.preventDefault();
    const value = options[nextIndex]!;
    select(value);
    event.currentTarget.parentElement
      ?.querySelector<HTMLButtonElement>(`[data-${attribute}-tab="${value}"]`)
      ?.focus();
  }

  function updateScope(nextScope: { grade?: GradeLevel; term?: TermLevel }) {
    setSelectedScope((current) => ({ ...current, ...nextScope }));
    setExpandedZoneId(null);
    setExpandedRecordGroupKey(null);
  }

  return (
    <>
      <div className="achievement-scope-controls" aria-label="筛选学习星图">
        <div className="achievement-scope-control">
          <span className="achievement-scope-label" id="achievement-grade-label">年级</span>
          <div className="achievement-scope-tabs achievement-grade-tabs" role="tablist" aria-labelledby="achievement-grade-label">
            {GRADE_LEVELS.map((grade, index) => (
              <Button
                key={grade}
                id={`achievement-grade-tab-${grade}`}
                data-grade-tab={grade}
                className="achievement-scope-tab"
                type={selectedScope.grade === grade ? 'primary' : 'default'}
                role="tab"
                aria-label={getGradeTitle(grade)}
                aria-selected={selectedScope.grade === grade}
                aria-controls="achievement-filter-panel"
                tabIndex={selectedScope.grade === grade ? 0 : -1}
                onClick={() => updateScope({ grade })}
                onKeyDown={(event) => handleScopeTabKeyDown(event, index, GRADE_LEVELS, (value) => updateScope({ grade: value as GradeLevel }), 'grade')}
              >
                {getGradeTitle(grade)}
              </Button>
            ))}
          </div>
        </div>
        <div className="achievement-scope-control">
          <span className="achievement-scope-label" id="achievement-term-label">学期</span>
          <div className="achievement-scope-tabs achievement-term-tabs" role="tablist" aria-labelledby="achievement-term-label">
            {TERM_LEVELS.map((term, index) => (
              <Button
                key={term}
                id={`achievement-term-tab-${term}`}
                data-term-tab={term}
                className="achievement-scope-tab"
                type={selectedScope.term === term ? 'primary' : 'default'}
                role="tab"
                aria-selected={selectedScope.term === term}
                aria-controls="achievement-filter-panel"
                tabIndex={selectedScope.term === term ? 0 : -1}
                onClick={() => updateScope({ term })}
                onKeyDown={(event) => handleScopeTabKeyDown(event, index, TERM_LEVELS, (value) => updateScope({ term: value as TermLevel }), 'term')}
              >
                {term === 1 ? '上学期' : '下学期'}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div
        className="achievement-filter-panel"
        id="achievement-filter-panel"
        role="tabpanel"
        aria-labelledby={`achievement-grade-tab-${selectedScope.grade} achievement-term-tab-${selectedScope.term}`}
        tabIndex={0}
      >
        <section className="exploration-map" aria-labelledby="exploration-map-heading">
          <div className="exploration-map-heading">
            <div>
              <p className="eyebrow">{gradeTitle} · {termTitle}</p>
              <h3 id="exploration-map-heading">本学期星区</h3>
              <p>每个单元都是一个探索节点。完成完整单元，就会点亮一颗星。</p>
            </div>
            <span className="exploration-map-count" aria-label={`${visibleZones.length} 个星区`}><StarIcon size={16} aria-hidden="true" /> {visibleZones.length} 星区</span>
          </div>

          <div className={`exploration-zone-grid${visibleZones.length === 1 ? ' is-single' : ''}`}>
            {visibleZones.map((zone) => {
              const ZoneIcon = ZONE_ICONS[(zone.number - 1) % ZONE_ICONS.length];
              const groupedUnits = zone.units.reduce<Record<string, typeof zone.units>>((groups, unit) => {
                (groups[unit.subjectTitle] ??= []).push(unit);
                return groups;
              }, {});
              const zoneState = zone.isOpen ? 'is-open' : 'is-locked';
              const expanded = expandedZoneId === zone.id;
              const zoneUnitsId = `exploration-zone-units-${zone.number}`;

              return (
                <article
                  className={`exploration-zone ${zoneState}${expanded ? ' is-expanded' : ''}`}
                  key={zone.id}
                  aria-label={`第${zone.number}星区：${zone.title}，${zone.gradeTitle}${zone.termTitle}`}
                >
                  <header className="exploration-zone-header">
                    <span className="exploration-zone-symbol" aria-hidden="true">
                      {zone.hasCurriculum || zone.isStartZone ? <ZoneIcon size={24} /> : <LockIcon size={20} />}
                    </span>
                    <div className="exploration-zone-heading-copy">
                    <span className="exploration-zone-kicker">第{zone.number}星区</span>
                      <h4>{zone.title}</h4>
                    </div>
                    <span className={`exploration-zone-status ${zone.isOpen ? 'is-open' : 'is-locked'}`}>
                      {zone.isStartZone ? '当前起点' : zone.hasCurriculum ? '课程已开放' : '待解锁'}
                    </span>
                  </header>

                  <p className="exploration-zone-style">{zone.visualStyle}</p>
                  <p className="exploration-zone-artifact">
                    {zone.isStartZone
                      ? `当前学习起点：第 ${zone.startUnit} 单元 · ${zone.unitArtifact}`
                      : zone.hasCurriculum
                        ? `单元节点：${zone.unitArtifact}`
                        : `未来节点：${zone.unitArtifact}`}
                  </p>

                  {zone.hasCurriculum ? (
                    <div className="exploration-zone-progress-summary">
                      已点亮 {zone.completedUnitCount} / {zone.availableUnitCount} 个单元
                    </div>
                  ) : null}
                  {zone.hasCurriculum ? (
                    <Button
                      type="default"
                      className="exploration-zone-toggle"
                      aria-label={`${expanded ? '收起' : '查看'}第${zone.number}星区的单元进度`}
                      aria-expanded={expanded}
                      aria-controls={zoneUnitsId}
                      onClick={() => setExpandedZoneId(expanded ? null : zone.id)}
                    >
                      <span className="button-label-with-icon">{expanded ? '收起单元' : '查看单元进度'} <ArrowRightIcon size={16} aria-hidden="true" /></span>
                    </Button>
                  ) : null}

                  {zone.hasCurriculum ? (
                    <div className="exploration-subject-groups" id={zoneUnitsId} hidden={!expanded}>
                      {Object.entries(groupedUnits).map(([subjectTitle, subjectUnits]) => (
                        <section className="exploration-subject-group" key={subjectTitle} aria-label={`${subjectTitle}单元节点`}>
                          <h5>{subjectTitle}</h5>
                          <ul className="exploration-unit-nodes">
                            {subjectUnits.map((unit) => (
                              <li
                                className={`exploration-unit-node is-${unit.state}`}
                                key={unit.id}
                                aria-label={`${subjectTitle}，${unit.title}，${unit.state === 'complete' ? '已点亮' : unit.state === 'available' ? `已完成${unit.completedSessions}场，共${unit.totalSessions}场` : '正在准备'}`}
                              >
                                <span className="exploration-node-symbol" aria-hidden="true">
                                  {unit.state === 'complete'
                                    ? <CheckCircleIcon size={16} />
                                    : unit.state === 'available'
                                      ? <StarIcon size={16} />
                                      : <LockIcon size={15} />}
                                </span>
                                <span className="exploration-node-title">{unit.title}</span>
                                <span className="exploration-node-state">
                                  {unit.state === 'complete'
                                    ? '已点亮'
                                    : unit.state === 'available'
                                      ? `${unit.completedSessions}/${unit.totalSessions} 场`
                                      : '即将开放'}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </section>
                      ))}
                      <p className="exploration-zone-note">{zone.isOpen ? '已接入的课程会显示闯关进度；灰色节点会在相应单元加入后逐步开放。' : '课程目录已规划，完成内容准备后就能出发探索。'}</p>
                    </div>
                  ) : null}
                  {zone.isStartZone && !zone.hasCurriculum ? (
                    <p className="exploration-zone-note">这片星区的课程还未接入；准备好内容后，就能从第 {zone.startUnit} 单元开始探索。</p>
                  ) : null}
                </article>
              );
            })}
          </div>
          <p className="exploration-map-note">课程会在核实人教版教材后逐步开放；灰色节点仅作课程预告，暂不计入头衔。</p>
        </section>

        <section className="achievement-course-progress" aria-labelledby="achievement-course-progress-heading">
          <div className="achievement-detail-heading">
            <div>
              <p className="eyebrow">{gradeTitle} · {termTitle}</p>
              <h3 id="achievement-course-progress-heading">课程闯关记录</h3>
              <p>当前学期已登记 {visibleUnitCount} 个单元，选择学科查看每场游戏的完成情况。</p>
            </div>
            <span className="achievement-record-total">{visibleProgressGroups.length} 门课程</span>
          </div>

          <div className="achievement-progress-group-list" aria-label={`${gradeTitle}${termTitle}课程进度`}>
            {visibleProgressGroups.length > 0 ? visibleProgressGroups.map((group, index) => {
              const expanded = expandedRecordGroupKey === group.key;
              const recordGroupId = `achievement-record-group-${index + 1}`;
              const completedInGroup = group.units.filter((entry) => entry.completed).length;
              return (
                <section className={`achievement-progress-group${expanded ? ' is-expanded' : ''}`} key={group.key}>
                  <header className="achievement-progress-group-heading">
                    <div className="achievement-progress-group-title">
                      <h4>{group.subjectTitle}</h4>
                    </div>
                    <span className="achievement-progress-group-count">{completedInGroup} / {group.units.length} 个单元点亮</span>
                    <Button
                      type="default"
                      className="achievement-progress-group-toggle"
                      aria-label={`${expanded ? '收起' : '查看'}${group.gradeTitle}${group.termTitle}${group.subjectTitle}进度`}
                      aria-expanded={expanded}
                      aria-controls={recordGroupId}
                      onClick={() => setExpandedRecordGroupKey(expanded ? null : group.key)}
                    >
                      <span className="button-label-with-icon">{expanded ? '收起记录' : '查看进度'} <ArrowRightIcon size={16} aria-hidden="true" /></span>
                    </Button>
                  </header>
                  <div className="achievement-unit-grid" id={recordGroupId} aria-label={`${group.gradeTitle} ${group.termTitle} ${group.subjectTitle}课程完成情况`} hidden={!expanded}>
                    {group.units.map((entry) => {
                      const basicSessions = entry.basicSessions;
                      const doneCount = entry.completedSessionIds.length;
                      return (
                        <article className={`achievement-unit ${entry.completed ? 'is-complete' : 'is-pending'}`} key={entry.key}>
                          <header className="achievement-unit-header">
                            <span className="achievement-unit-check" aria-hidden="true">
                              {entry.completed ? <CheckCircleIcon size={18} /> : <ClockIcon size={17} />}
                            </span>
                            <div>
                              <span className="achievement-unit-subject">{entry.gradeTitle} · {entry.termTitle} · {entry.subjectTitle}</span>
                              <h5>{entry.title}</h5>
                            </div>
                            <span className="achievement-unit-count">{doneCount} / {basicSessions.length}</span>
                          </header>
                          <ul className="achievement-session-list">
                            {basicSessions.map((session) => {
                              const complete = entry.completedSessionIds.includes(session.id);
                              return (
                                <li className={complete ? 'is-complete' : 'is-pending'} key={session.id}>
                                  <span aria-hidden="true">{complete ? <CheckIcon size={14} /> : <ClockIcon size={14} />}</span>
                                  <span>{session.title}</span>
                                  <span className="achievement-session-state">{complete ? '已完成' : '待探索'}</span>
                                </li>
                              );
                            })}
                          </ul>
                        </article>
                      );
                    })}
                  </div>
                </section>
              );
            }) : (
              <p className="achievement-filter-empty">这个学期的课程正在准备中，接入后会显示每场游戏的完成情况。</p>
            )}
          </div>
          <p className="achievement-kindness">不用着急赶路。做完眼前的一小场，就已经向下一枚徽章更近一步啦。</p>
        </section>
      </div>

      <section className="achievement-section achievement-journey-section" aria-labelledby="achievement-heading">
        <div className="achievement-section-heading">
          <div>
            <p className="eyebrow">全部年级累计</p>
            <h2 id="achievement-heading">当前头衔：{currentRank.title}</h2>
            <p>已完整点亮 <strong>{completedUnitCount}</strong> 座知识岛。</p>
          </div>
          <span className="achievement-progress-orbit" aria-hidden="true"><StarIcon size={28} /></span>
        </div>

        <div className="achievement-next-rank" aria-live="polite">
          <span className="achievement-next-rank-icon" aria-hidden="true"><TrophyIcon size={21} /></span>
          {nextRank ? (
            <div className="achievement-next-rank-copy">
              <div className="achievement-next-rank-label">
                <strong>下一站：{nextRank.title}</strong>
                <span>{nextRank.unitsRequired - completedUnitCount} 个完整单元后解锁</span>
              </div>
              <div className="achievement-next-rank-track" role="progressbar" aria-label={`距离${nextRank.title}的进度`} aria-valuenow={rankProgress} aria-valuemin={0} aria-valuemax={100}>
                <span style={{ transform: `scaleX(${rankProgress / 100})` }} />
              </div>
            </div>
          ) : (
            <p className="achievement-next-rank-complete">所有头衔都已点亮，继续探索新的知识星球吧！</p>
          )}
        </div>

        <details className="achievement-rank-details">
          <summary>全部头衔（{COSMIC_RANKS.length}）</summary>
          <div className="achievement-badge-grid" aria-label="单元成就">
            {COSMIC_RANKS.map((rank, index) => {
              const RankIcon = RANK_ICONS[index] ?? StarIcon;
              const unlocked = completedUnitCount >= rank.unitsRequired;
              const current = currentRank.id === rank.id;
              const remaining = Math.max(0, rank.unitsRequired - completedUnitCount);
              return (
                <Card
                  key={rank.id}
                  className={`achievement-badge ${current ? 'is-current' : unlocked ? 'is-unlocked' : 'is-locked'}`}
                  color="default"
                  aria-label={`${rank.title}，${current ? '当前头衔' : unlocked ? '已获得' : `还需完成${remaining}个单元`}`}
                >
                  <span className="achievement-badge-symbol" aria-hidden="true"><RankIcon size={25} /></span>
                  <span className="achievement-badge-state">
                    {current || unlocked ? <CheckCircleIcon size={15} aria-hidden="true" /> : null}
                    {current ? '当前头衔' : unlocked ? '已获得' : `还差 ${remaining} 个单元`}
                  </span>
                  <strong>{rank.title}</strong>
                  <span className="achievement-badge-description">{rank.description}</span>
                </Card>
              );
            })}
          </div>
        </details>
      </section>
    </>
  );
}
