const GRADE_TITLES: Record<number, string> = {
  1: '一年级',
  2: '二年级',
  3: '三年级',
  4: '四年级',
  5: '五年级',
  6: '六年级',
};

export function getGradeTitle(gradeNumber: number): string {
  return GRADE_TITLES[gradeNumber] ?? `${gradeNumber}年级`;
}
