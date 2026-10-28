import { curriculumManifest } from '../content/curriculumManifest';
import type { SubjectId } from '../content/types';

export interface CourseSelection {
  gradeId: string;
  termId: string;
  subjectId: SubjectId;
}

const STORAGE_KEY = 'starry-island-course-selection-v1';

function isValidCourseSelection(value: unknown): value is CourseSelection {
  if (!value || typeof value !== 'object') return false;
  const selection = value as Partial<CourseSelection>;
  const grade = curriculumManifest.grades.find((entry) => entry.id === selection.gradeId);
  const term = grade?.terms.find((entry) => entry.id === selection.termId);
  return Boolean(term?.subjects.some((entry) => entry.id === selection.subjectId));
}

export function loadCourseSelection(): CourseSelection | null {
  try {
    if (typeof window === 'undefined') return null;
    const value = window.localStorage.getItem(STORAGE_KEY);
    if (value === null) return null;
    const parsed: unknown = JSON.parse(value);
    return isValidCourseSelection(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function saveCourseSelection(selection: CourseSelection): void {
  try {
    if (typeof window !== 'undefined' && isValidCourseSelection(selection)) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(selection));
    }
  } catch {
    // Course browsing remains usable when browser storage is unavailable.
  }
}
