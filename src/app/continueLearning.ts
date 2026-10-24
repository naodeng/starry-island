import { getEffectiveCompletedSessionIds, getKnownCurriculumPositions } from '../achievements/position';
import type { KnownCurriculumPosition } from '../achievements/position';
import { curriculumManifest, getUnitManifest } from '../content/curriculumManifest';
import type { CurriculumProgressSource } from '../content/curriculumManifest';
import { loadUnit as loadCurriculumUnit } from '../content/unitLoader';
import type { CurriculumUnit, Difficulty, LearningSession, LearningTask } from '../content/types';
import type { ProgressState } from '../storage/progress';
import { getSessionPath, getSubjectTitle, resolveRoute } from './router';

export interface LearningSessionDestination {
  path: string;
  grade: number;
  gradeTitle: string;
  term: 1 | 2;
  termTitle: string;
  subject: KnownCurriculumPosition['subject'];
  subjectTitle: string;
  unitTitle: string;
  difficulty: Difficulty;
  taskTitle: string;
  sessionTitle: string;
}

export type ContinueLearningDestination = LearningSessionDestination;

export interface ContinueLearningOptions {
  source?: CurriculumProgressSource;
  loadUnit?: (unitKey: string) => Promise<CurriculumUnit | undefined>;
}

const DIFFICULTIES: readonly Difficulty[] = ['basic', 'advanced', 'high'];

function findSessionOwner(unit: CurriculumUnit, sessionId: string): { difficulty: Difficulty; task: LearningTask; session: LearningSession } | null {
  for (const difficulty of DIFFICULTIES) {
    const task = unit.difficultyTracks[difficulty].tasks.find((candidate) => candidate.sessions.some((session) => session.id === sessionId));
    const session = task?.sessions.find((candidate) => candidate.id === sessionId);
    if (task && session) return { difficulty, task, session };
  }
  return null;
}

async function resolveSessionInPosition(
  sessionId: string,
  position: KnownCurriculumPosition,
  loadUnit: (unitKey: string) => Promise<CurriculumUnit | undefined>,
): Promise<LearningSessionDestination | null> {
  if (!position.curriculumUnitKey) return null;
  let unit: CurriculumUnit | undefined;
  try {
    unit = await loadUnit(position.curriculumUnitKey);
  } catch {
    return null;
  }
  if (!unit) return null;

  const owner = findSessionOwner(unit, sessionId);
  if (!owner) return null;
  const path = getSessionPath(position.key, owner.difficulty, owner.task.id, owner.session.id);
  const route = resolveRoute(path, undefined, unit);
  if (route.kind !== 'session' || route.session.id !== sessionId) return null;

  return {
    path,
    grade: position.grade,
    gradeTitle: `${position.grade}年级`,
    term: position.term,
    termTitle: position.term === 1 ? '上册' : '下册',
    subject: position.subject,
    subjectTitle: getSubjectTitle(position.subject),
    unitTitle: position.title,
    difficulty: owner.difficulty,
    taskTitle: owner.task.title,
    sessionTitle: owner.session.title,
  };
}

export async function resolveLearningSessionDestination(
  sessionId: string,
  options: ContinueLearningOptions = {},
): Promise<LearningSessionDestination | null> {
  if (!sessionId.trim()) return null;
  const source = options.source ?? curriculumManifest;
  const loadUnit = options.loadUnit ?? loadCurriculumUnit;
  const matchingPositions = getKnownCurriculumPositions(source).filter((position) => {
    const manifest = position.curriculumUnitKey ? getUnitManifest(position.curriculumUnitKey, source) : undefined;
    return manifest && Object.values(manifest.sessionIds).some((sessionIds) => sessionIds.includes(sessionId));
  });
  if (matchingPositions.length !== 1) return null;
  return resolveSessionInPosition(sessionId, matchingPositions[0]!, loadUnit);
}

export async function resolveContinueLearningDestination(
  progress: ProgressState,
  options: ContinueLearningOptions = {},
): Promise<ContinueLearningDestination | null> {
  const source = options.source ?? curriculumManifest;
  const loadUnit = options.loadUnit ?? loadCurriculumUnit;
  const completedSessionIds = new Set(getEffectiveCompletedSessionIds(
    progress.completedSessionIds,
    progress.learningStart,
    source,
  ));

  for (const position of getKnownCurriculumPositions(source)) {
    if (!position.curriculumUnitKey) continue;
    const manifest = getUnitManifest(position.curriculumUnitKey, source);
    const nextSessionIds = manifest?.sessionIds.basic.filter((sessionId) => !completedSessionIds.has(sessionId)) ?? [];
    if (nextSessionIds.length === 0) continue;

    let unit: CurriculumUnit | undefined;
    try {
      unit = await loadUnit(position.curriculumUnitKey);
    } catch {
      continue;
    }
    if (!unit) continue;

    for (const sessionId of nextSessionIds) {
      const owner = findSessionOwner(unit, sessionId);
      if (!owner || owner.difficulty !== 'basic') continue;
      const path = getSessionPath(position.key, owner.difficulty, owner.task.id, owner.session.id);
      const route = resolveRoute(path, undefined, unit);
      if (route.kind !== 'session' || route.session.id !== sessionId) continue;

      return {
        path,
        grade: position.grade,
        gradeTitle: `${position.grade}年级`,
        term: position.term,
        termTitle: position.term === 1 ? '上册' : '下册',
        subject: position.subject,
        subjectTitle: getSubjectTitle(position.subject),
        unitTitle: position.title,
        difficulty: owner.difficulty,
        taskTitle: owner.task.title,
        sessionTitle: owner.session.title,
      };
    }
  }

  return null;
}
