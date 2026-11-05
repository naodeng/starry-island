import { curriculumManifest } from '../content/curriculumManifest';

export interface CourseTrack {
  gradeId: string;
  termId: string;
}

const STORAGE_KEY = 'starry-island-course-track-v1';
const LEGACY_STORAGE_KEY = 'starry-island-course-selection-v1';

function isCourseTrack(value: unknown): value is CourseTrack {
  if (!value || typeof value !== 'object') return false;
  const track = value as Partial<CourseTrack>;
  const grade = curriculumManifest.grades.find((entry) => entry.id === track.gradeId);
  return Boolean(grade?.terms.some((entry) => entry.id === track.termId));
}

function readLegacyCourseTrack(): CourseTrack | null {
  try {
    const value = window.localStorage.getItem(LEGACY_STORAGE_KEY);
    if (value === null) return null;
    const parsed: unknown = JSON.parse(value);
    if (!isCourseTrack(parsed)) return null;
    return { gradeId: parsed.gradeId, termId: parsed.termId };
  } catch {
    return null;
  }
}

export function loadCourseTrack(): CourseTrack | null {
  try {
    if (typeof window === 'undefined') return null;
    const value = window.localStorage.getItem(STORAGE_KEY);
    if (value !== null) {
      const parsed: unknown = JSON.parse(value);
      if (isCourseTrack(parsed)) return { gradeId: parsed.gradeId, termId: parsed.termId };
    }

    const legacyTrack = readLegacyCourseTrack();
    if (legacyTrack) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(legacyTrack));
    return legacyTrack;
  } catch {
    return null;
  }
}

export function saveCourseTrack(track: CourseTrack): void {
  try {
    if (typeof window !== 'undefined' && isCourseTrack(track)) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ gradeId: track.gradeId, termId: track.termId }));
    }
  } catch {
    // Track selection remains usable for this session when browser storage is unavailable.
  }
}
