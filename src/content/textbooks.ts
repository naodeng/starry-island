import type { TextbookEdition } from './types';

export const TAPX_TEXTBOOK_COMMIT = '5a80345f2043ba6f8db8d7be9cf3db82725ff1f7';

const checkedAt = '2026-10-14';
const pepEvidence = {
  chinese: 'https://www.pep.com.cn/bks/xxyw/jzjd/202507/W020250716532280620290.pdf',
  math: 'https://www.pep.com.cn/rjyx/qnbjsjc/sytj/202605/t20260514_2006676.shtml',
  english: 'https://www.pep.com.cn/xw/zt/hd/12/xjcjs/xx/202409/t20240920_1995564.html',
};

function tapxPdfUrl(path: string): string {
  const encodedPath = path.split('/').map(encodeURIComponent).join('/');
  return `https://github.com/TapXWorld/ChinaTextbook/blob/${TAPX_TEXTBOOK_COMMIT}/${encodedPath}`;
}

const reasons = {
  chinese: '人教社公开了 2025 年语文修订说明，但未找到本册完整新版学生用书和目录；按用户授权采用学校使用的 TapXWorld 固定快照。',
  math: '人教社公开了新课标数学教材资源信息，但未找到本册完整新版学生用书和目录；按用户授权采用学校使用的 TapXWorld 固定快照。',
  english: '人教社公开说明设有一、二年级英语预备级，但未找到本册完整新版学生用书和目录；按用户授权采用 TapXWorld 固定快照。学校是否开设尚未确认。',
};

const addedBookReasons = {
  chinese: '人教社公开了语文修订教材信息，但未取得本册完整新版学生用书和目录；本课程按用户裁定使用 TapXWorld 固定快照中的整册目录，不将回退版本称为最新版。',
  math: '人教社公开了新版数学教材资源入口，但未取得本册完整新版学生用书和目录；按用户裁定使用 TapXWorld 固定快照中的整册目录。',
  english: '人教社介绍了新版小学英语教材的不同起点，但未取得本册完整新版学生用书和目录；按站内现有一年级起点序列使用 TapXWorld 固定快照。学校是否开设英语尚未确认。',
};

function addedBook(
  grade: 1 | 3,
  term: 1 | 2,
  subject: 'chinese' | 'math' | 'english',
  series: string,
  path: string,
  edition: string | null = null,
  isbn: string | null = null,
) {
  return {
    id: `grade-${grade}/term-${term}/${subject}`,
    subject,
    grade,
    term,
    series,
    edition,
    printing: null,
    isbn,
    sourceKind: 'tapx-fallback' as const,
    sourceUrl: tapxPdfUrl(path),
    latestPepEvidenceUrl: pepEvidence[subject],
    fallbackReason: addedBookReasons[subject],
    checkedAt: '2026-10-15',
    tapxCommit: TAPX_TEXTBOOK_COMMIT,
    verificationStatus: 'verified' as const,
    ...(subject === 'english' ? { schoolOfferingStatus: 'unconfirmed' as const } : {}),
  };
}

const upperGradeReasons = {
  chinese: '人教社已公开小学语文修订说明，但尚未取得本册完整新版学生书和目录；按项目教材规则使用 TapXWorld 固定快照中的整册目录，不将回退册次称为最新版。已知差异列在四至六年级教材清单中。',
  math: '人教社已公开新版小学数学教材资源入口，但网页未提供本册完整新版学生书目录；按项目教材规则使用 TapXWorld 固定快照中的整册目录，未知差异不作推测。',
  english: '人教社说明小学英语有三年级起点和一年级起点两个系列，但未找到本册一年级起点新版的完整学生书目录；沿用站内一年级起点固定快照，不混入三年级起点目录。学校是否开设尚未确认。',
} as const;

function upperGradePepEvidence(grade: 4 | 5 | 6, term: 1 | 2, subject: 'chinese' | 'math' | 'english'): string {
  if (subject === 'math') return pepEvidence.math;
  if (subject === 'english') return pepEvidence.english;
  if (grade === 4 && term === 2) return 'https://www.pep.com.cn/bks/xxyw/jzjd/202510/W020251016520796433248.pdf';
  if (grade === 5 && term === 2) return 'https://www.pep.com.cn/bks/xxyw/jzjd/202505/W020250531413572751916.pdf';
  if (grade === 6 && term === 2) return 'https://www.pep.com.cn/bks/xxyw/jzjd/202510/W020251016523033877268.pdf';
  return 'https://www.pep.com.cn/bks/xxyw/jzjd/202505/W020250531414714349226.pdf';
}

function upperGradeBook(
  grade: 4 | 5 | 6,
  term: 1 | 2,
  subject: 'chinese' | 'math' | 'english',
  path: string,
  edition: string | null = null,
  isbn: string | null = null,
) {
  const gradeName = ({ 4: '四', 5: '五', 6: '六' } as const)[grade];
  const gradeLabel = `${gradeName}年级${term === 1 ? '上' : '下'}册`;
  const subjectLabel = subject === 'chinese'
    ? `语文（${gradeLabel}）`
    : subject === 'math'
      ? `数学（${gradeLabel}）`
      : `英语（一年级起点，${gradeLabel}）`;

  return {
    id: `grade-${grade}/term-${term}/${subject}`,
    subject,
    grade,
    term,
    series: `义务教育教科书·${subjectLabel}`,
    edition,
    printing: null,
    isbn,
    sourceKind: 'tapx-fallback' as const,
    sourceUrl: tapxPdfUrl(path),
    latestPepEvidenceUrl: upperGradePepEvidence(grade, term, subject),
    fallbackReason: upperGradeReasons[subject],
    checkedAt: '2026-10-18',
    tapxCommit: TAPX_TEXTBOOK_COMMIT,
    verificationStatus: 'verified' as const,
    ...(subject === 'english' ? { schoolOfferingStatus: 'unconfirmed' as const } : {}),
  };
}

export const textbooks: Record<string, TextbookEdition> = {
  'grade-2/term-1/chinese': {
    id: 'grade-2/term-1/chinese',
    subject: 'chinese',
    grade: 2,
    term: 1,
    series: '义务教育教科书·语文（二年级上册）',
    edition: null,
    printing: null,
    isbn: null,
    sourceKind: 'tapx-fallback',
    sourceUrl: tapxPdfUrl('小学/语文/统编版/义务教育教科书·语文二年级上册.pdf'),
    latestPepEvidenceUrl: pepEvidence.chinese,
    fallbackReason: reasons.chinese,
    checkedAt,
    tapxCommit: TAPX_TEXTBOOK_COMMIT,
    verificationStatus: 'verified',
  },
  'grade-2/term-2/chinese': {
    id: 'grade-2/term-2/chinese',
    subject: 'chinese',
    grade: 2,
    term: 2,
    series: '义务教育教科书·语文（二年级下册）',
    edition: '2017年12月第1版',
    printing: null,
    isbn: '978-7-107-32383-6',
    sourceKind: 'tapx-fallback',
    sourceUrl: tapxPdfUrl('小学/语文/统编版/义务教育教科书·语文二年级下册.pdf'),
    latestPepEvidenceUrl: pepEvidence.chinese,
    fallbackReason: reasons.chinese,
    checkedAt,
    tapxCommit: TAPX_TEXTBOOK_COMMIT,
    verificationStatus: 'verified',
  },
  'grade-2/term-1/math': {
    id: 'grade-2/term-1/math',
    subject: 'math',
    grade: 2,
    term: 1,
    series: '义务教育教科书·数学（二年级上册）',
    edition: '2022年8月第2版',
    printing: null,
    isbn: '978-7-107-36923-0',
    sourceKind: 'tapx-fallback',
    sourceUrl: tapxPdfUrl('小学/数学/人教版/义务教育教科书 · 数学二年级上册.pdf'),
    latestPepEvidenceUrl: pepEvidence.math,
    fallbackReason: reasons.math,
    checkedAt,
    tapxCommit: TAPX_TEXTBOOK_COMMIT,
    verificationStatus: 'verified',
  },
  'grade-2/term-2/math': {
    id: 'grade-2/term-2/math',
    subject: 'math',
    grade: 2,
    term: 2,
    series: '义务教育教科书·数学（二年级下册）',
    edition: null,
    printing: null,
    isbn: null,
    sourceKind: 'tapx-fallback',
    sourceUrl: tapxPdfUrl('小学/数学/人教版/义务教育教科书·数学二年级下册.pdf'),
    latestPepEvidenceUrl: pepEvidence.math,
    fallbackReason: reasons.math,
    checkedAt,
    tapxCommit: TAPX_TEXTBOOK_COMMIT,
    verificationStatus: 'verified',
  },
  'grade-2/term-1/english': {
    id: 'grade-2/term-1/english',
    subject: 'english',
    grade: 2,
    term: 1,
    series: '义务教育教科书·英语（一年级起点，二年级上册）',
    edition: null,
    printing: null,
    isbn: null,
    sourceKind: 'tapx-fallback',
    sourceUrl: tapxPdfUrl('小学/英语/人教版（一年级起点）（主编：吴欣）/义务教育教科书·英语（一年级起点）二年级上册.pdf'),
    latestPepEvidenceUrl: pepEvidence.english,
    fallbackReason: reasons.english,
    checkedAt,
    tapxCommit: TAPX_TEXTBOOK_COMMIT,
    verificationStatus: 'verified',
    schoolOfferingStatus: 'unconfirmed',
  },
  'grade-2/term-2/english': {
    id: 'grade-2/term-2/english',
    subject: 'english',
    grade: 2,
    term: 2,
    series: '义务教育教科书·英语（一年级起点，二年级下册）',
    edition: '2013年10月第1版',
    printing: null,
    isbn: '978-7-107-27396-4',
    sourceKind: 'tapx-fallback',
    sourceUrl: tapxPdfUrl('小学/英语/人教版（一年级起点）（主编：吴欣）/义务教育教科书·英语（一年级起点）二年级下册.pdf'),
    latestPepEvidenceUrl: pepEvidence.english,
    fallbackReason: reasons.english,
    checkedAt,
    tapxCommit: TAPX_TEXTBOOK_COMMIT,
    verificationStatus: 'verified',
    schoolOfferingStatus: 'unconfirmed',
  },
  'grade-1/term-1/chinese': addedBook(1, 1, 'chinese', '义务教育教科书·语文（一年级上册）', '小学/语文/统编版/义务教育教科书·语文一年级上册.pdf'),
  'grade-1/term-2/chinese': addedBook(1, 2, 'chinese', '义务教育教科书·语文（一年级下册）', '小学/语文/统编版/义务教育教科书·语文一年级下册.pdf'),
  'grade-3/term-1/chinese': addedBook(3, 1, 'chinese', '义务教育教科书·语文（三年级上册）', '小学/语文/统编版/义务教育教科书·语文三年级上册.pdf'),
  'grade-3/term-2/chinese': addedBook(3, 2, 'chinese', '义务教育教科书·语文（三年级下册）', '小学/语文/统编版/义务教育教科书·语文三年级下册.pdf'),
  'grade-1/term-1/math': addedBook(1, 1, 'math', '义务教育教科书·数学（一年级上册）', '小学/数学/人教版/义务教育教科书 · 数学一年级上册.pdf', '2022年8月第2版', '978-7-107-36922-3'),
  'grade-1/term-2/math': addedBook(1, 2, 'math', '义务教育教科书·数学（一年级下册）', '小学/数学/人教版/义务教育教科书·数学一年级下册.pdf'),
  'grade-3/term-1/math': addedBook(3, 1, 'math', '义务教育教科书·数学（三年级上册）', '小学/数学/人教版/义务教育教科书 · 数学三年级上册.pdf', '2022年8月第2版', '978-7-107-36924-7'),
  'grade-3/term-2/math': addedBook(3, 2, 'math', '义务教育教科书·数学（三年级下册）', '小学/数学/人教版/义务教育教科书·数学三年级下册.pdf'),
  'grade-1/term-1/english': addedBook(1, 1, 'english', '义务教育教科书·英语（一年级起点，一年级上册）', '小学/英语/人教版（一年级起点）（主编：吴欣）/义务教育教科书·英语（一年级起点）一年级上册.pdf'),
  'grade-1/term-2/english': addedBook(1, 2, 'english', '义务教育教科书·英语（一年级起点，一年级下册）', '小学/英语/人教版（一年级起点）（主编：吴欣）/义务教育教科书·英语（一年级起点）一年级下册.pdf'),
  'grade-3/term-1/english': addedBook(3, 1, 'english', '义务教育教科书·英语（一年级起点，三年级上册）', '小学/英语/人教版（一年级起点）（主编：吴欣）/义务教育教科书·英语（一年级起点）三年级上册.pdf'),
  'grade-3/term-2/english': addedBook(3, 2, 'english', '义务教育教科书·英语（一年级起点，三年级下册）', '小学/英语/人教版（一年级起点）（主编：吴欣）/义务教育教科书·英语（一年级起点）三年级下册.pdf'),
  'grade-4/term-1/chinese': upperGradeBook(4, 1, 'chinese', '小学/语文/统编版/义务教育教科书·语文四年级上册.pdf'),
  'grade-4/term-2/chinese': upperGradeBook(4, 2, 'chinese', '小学/语文/统编版/义务教育教科书·语文四年级下册.pdf', '2019年12月第1版', '978-7-107-34120-5'),
  'grade-5/term-1/chinese': upperGradeBook(5, 1, 'chinese', '小学/语文/统编版/义务教育教科书·语文五年级上册.pdf'),
  'grade-5/term-2/chinese': upperGradeBook(5, 2, 'chinese', '小学/语文/统编版/义务教育教科书·语文五年级下册.pdf'),
  'grade-6/term-1/chinese': upperGradeBook(6, 1, 'chinese', '小学/语文/统编版/义务教育教科书·语文六年级上册.pdf'),
  'grade-6/term-2/chinese': upperGradeBook(6, 2, 'chinese', '小学/语文/统编版/义务教育教科书·语文六年级下册.pdf', '2019年12月第1版', '978-7-107-34191-5'),
  'grade-4/term-1/math': upperGradeBook(4, 1, 'math', '小学/数学/人教版/义务教育教科书 · 数学四年级上册.pdf', '2022年8月第2版', '978-7-107-36927-8'),
  'grade-4/term-2/math': upperGradeBook(4, 2, 'math', '小学/数学/人教版/义务教育教科书·数学四年级下册.pdf'),
  'grade-5/term-1/math': upperGradeBook(5, 1, 'math', '小学/数学/人教版/义务教育教科书 · 数学五年级上册.pdf'),
  'grade-5/term-2/math': upperGradeBook(5, 2, 'math', '小学/数学/人教版/义务教育教科书·数学五年级下册.pdf'),
  'grade-6/term-1/math': upperGradeBook(6, 1, 'math', '小学/数学/人教版/义务教育教科书 · 数学六年级上册.pdf', '2022年8月第2版', '978-7-107-36925-4'),
  'grade-6/term-2/math': upperGradeBook(6, 2, 'math', '小学/数学/人教版/义务教育教科书·数学六年级下册.pdf'),
  'grade-4/term-1/english': upperGradeBook(4, 1, 'english', '小学/英语/人教版（一年级起点）（主编：吴欣）/义务教育教科书·英语（一年级起点）四年级上册.pdf'),
  'grade-4/term-2/english': upperGradeBook(4, 2, 'english', '小学/英语/人教版（一年级起点）（主编：吴欣）/义务教育教科书·英语（一年级起点）四年级下册.pdf', '2014年10月第1版', '978-7-107-29067-1'),
  'grade-5/term-1/english': upperGradeBook(5, 1, 'english', '小学/英语/人教版（一年级起点）（主编：吴欣）/义务教育教科书·英语（一年级起点）五年级上册.pdf'),
  'grade-5/term-2/english': upperGradeBook(5, 2, 'english', '小学/英语/人教版（一年级起点）（主编：吴欣）/义务教育教科书·英语（一年级起点）五年级下册.pdf', '2014年10月第1版', '978-7-107-29104-3'),
  'grade-6/term-1/english': upperGradeBook(6, 1, 'english', '小学/英语/人教版（一年级起点）（主编：吴欣）/义务教育教科书·英语（一年级起点）六年级上册.pdf'),
  'grade-6/term-2/english': upperGradeBook(6, 2, 'english', '小学/英语/人教版（一年级起点）（主编：吴欣）/义务教育教科书·英语（一年级起点）六年级下册.pdf', '2014年10月第1版', '978-7-107-29089-3'),
};
