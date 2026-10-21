import { describe, expect, it } from 'vitest';
import grade2LedgerText from '../../docs/curriculum/grade-2-question-review.tsv?raw';
import addedLedgerText from '../../docs/curriculum/grade-1-and-3-question-review.tsv?raw';
import grade4To6LedgerText from '../../docs/curriculum/grade-4-to-6-question-review.tsv?raw';
import { curriculum } from './curriculum';
import { textbooks } from './textbooks';

type ReviewRow = Record<string, string>;

const questionIdPattern = /grade-[1-6]\/term-[12]\/chinese\/(?:unit-\d{2}|integrated-practice-\d{2})\/(?:basic|advanced|high)\/task-\d{2}\/session-\d{2}\/question-\d{2}|grade-[1-6]\/term-[12]\/math\/(?:unit-\d{2}|integrated-practice-\d{2})\/(?:basic|advanced|high)\/task-\d{2}\/session-\d{2}\/question-\d{2}|grade-[1-6]\/term-[12]\/english\/(?:unit-\d{2}|review-\d{2})\/(?:basic|advanced|high)\/task-\d{2}\/session-\d{2}\/question-\d{2}/;
const questionIdRangePattern = /(grade-[1-6]\/term-[12]\/chinese\/(?:unit-\d{2}|integrated-practice-\d{2})|grade-[1-6]\/term-[12]\/math\/(?:unit-\d{2}|integrated-practice-\d{2})|grade-[1-6]\/term-[12]\/english\/(?:unit-\d{2}|review-\d{2}))\/\{basic\|advanced\|high\}\/task-\{01\|02\}\/session-01\/question-\{01\.\.08\}/;

function parseRows(ledgerText: string): ReviewRow[] {
  const [headerLine, ...dataLines] = ledgerText.trim().split(/\r?\n/);
  if (!headerLine) return [];
  const headers = headerLine.replace(/^\uFEFF/, '').split('\t');

  return dataLines.map((line) => Object.fromEntries(
    line.split('\t').map((value, index) => [headers[index] ?? `column-${index}`, value]),
  ));
}

function readRows(): ReviewRow[] {
  return [...parseRows(grade2LedgerText), ...parseRows(addedLedgerText), ...parseRows(grade4To6LedgerText)];
}

function questionCount(unitKey: string): number {
  return Object.values(curriculum.units[unitKey]?.difficultyTracks ?? {})
    .flatMap(({ tasks }) => tasks)
    .flatMap(({ sessions }) => sessions)
    .reduce((total, session) => total + session.activities.length, 0);
}

describe('curriculum question review ledger', () => {
  it('requires source, topic, and repair evidence in every consistent ledger row', () => {
    const ledgers = [grade2LedgerText, addedLedgerText, grade4To6LedgerText];
    for (const ledger of ledgers) {
      const [headerLine, ...dataLines] = ledger.trim().split(/\r?\n/u);
      const headers = headerLine?.replace(/^\uFEFF/u, '').split('\t') ?? [];
      expect(headers).toContain('教材版本/来源');
      expect(headers).toContain('单元或主题依据');

      dataLines.forEach((line, index) => {
        const values = line.split('\t');
        expect(values, `ledger row ${index + 2}`).toHaveLength(headers.length);
        const row = Object.fromEntries(headers.map((header, column) => [header, values[column]]));
        const courseId = row['课程ID'] ?? '';
        const textbook = textbooks[courseId.split('/').slice(0, 3).join('/')];
        const unit = curriculum.units[courseId];
        expect(row['教材版本/来源']?.trim(), `source for ${courseId}`).toBe(
          `${textbook?.series}；${textbook?.sourceKind}；固定提交 ${textbook?.tapxCommit}；${textbook?.sourceUrl}`,
        );
        expect(row['单元或主题依据']?.trim(), `topic basis for ${courseId}`).toBe(unit?.sourceTopics.join('；'));
        expect(row['修复记录']?.trim(), `repair record for ${courseId}`).toBeTruthy();
      });
    }
  });

  it('listsEveryPlayableEntryExactlyOnce', () => {
    const rows = readRows();
    const ids = rows.map(({ '课程ID': id }) => id);

    expect(new Set(ids).size).toBe(ids.length);
    expect([...ids].sort()).toEqual(Object.keys(curriculum.units).sort());
  });

  it('requiresEveryQuestionToBeReviewed', () => {
    const rowsById = new Map(readRows().map((row) => [row['课程ID'], row]));

    Object.keys(curriculum.units).forEach((unitKey) => {
      const row = rowsById.get(unitKey);
      const expectedCount = questionCount(unitKey);
      expect(row, `missing review row for ${unitKey}`).toBeDefined();
      expect(Number(row?.['题目总数']), `question total for ${unitKey}`).toBe(expectedCount);
      expect(Number(row?.['已审数量']), `reviewed question total for ${unitKey}`).toBe(expectedCount);
    });
  });

  it('records the current full question review and fix recheck for every course', () => {
    readRows().forEach((row) => {
      const unitId = row['课程ID'];
      const questionTotal = row['题目总数'];
      const evidence = row['复核证据']?.trim();
      expect(evidence, `${unitId} current full review`).toContain('本轮全量复核：2026-10-20至2026-10-21');
      expect(evidence, `${unitId} current question count`).toContain(`逐题复核：${questionTotal}/${questionTotal}`);
      expect(evidence, `${unitId} current answer and prompt recheck`).toContain('并复核本轮修复后的所有受影响题目');
      expect(evidence, `${unitId} current review rules`).toContain('course-content-review-rules.md');

      if (questionTotal === '56') {
        expect(evidence, `${unitId} current basic task range`).toContain(
          `${unitId}/basic/task-{01..03}/session-01/question-{01..08}`,
        );
        expect(evidence, `${unitId} current advanced/high task ranges`).toContain(
          `${unitId}/{advanced|high}/task-{01|02}/session-01/question-{01..08}`,
        );
      } else {
        expect(evidence, `${unitId} current exact ID range`).toContain(
          `${unitId}/{basic|advanced|high}/task-{01|02}/session-01/question-{01..08}`,
        );
      }
    });
  });

  it('records a dated question ID range for each grade 1 and grade 3 audit', () => {
    readRows().filter(({ '课程ID': id }) => id.startsWith('grade-1/') || id.startsWith('grade-3/')).forEach((row) => {
      const unitId = row['课程ID'];
      const evidence = row['复核证据']?.trim();
      expect(evidence, `${unitId} review evidence`).toBeTruthy();
      expect(evidence, `${unitId} audit date`).toContain('2026-10-16');
      expect(evidence, `${unitId} exact ID range`).toContain(
        `${unitId}/{basic|advanced|high}/task-{01|02}/session-01/question-{01..08}`,
      );
      expect(evidence, `${unitId} audit report reference`).toContain('grade-1-and-3-question-audit-report.md');
    });
  });

  it('records a dated question ID range and source evidence for each grade 2 audit', () => {
    const grade2Rows = readRows().filter(({ '课程ID': id }) => id.startsWith('grade-2/'));

    expect(grade2Rows).toHaveLength(53);
    grade2Rows.forEach((row) => {
      const unitId = row['课程ID'];
      const questionTotal = row['题目总数'];
      const evidence = row['复核证据']?.trim();
      expect(evidence, `${unitId} review evidence`).toBeTruthy();
      expect(evidence, `${unitId} original audit date`).toContain('2026-10-15');
      expect(evidence, `${unitId} question total`).toContain(`已审：${questionTotal}/${questionTotal}`);
      expect(evidence, `${unitId} textbook source`).toContain('grade-2-textbook-inventory.md');
      expect(evidence, `${unitId} question review rule`).toContain('course-content-review-rules.md');
      expect(evidence, `${unitId} original audit basis`).toContain('已有逐题审校台账与审校记录');
      expect(evidence, `${unitId} current re-review`).toContain('本轮复读：2026-10-19');
      expect(evidence, `${unitId} current review dimensions`).toContain('逐题复核题干、答案、解释及题型键');

      if (questionTotal === '56') {
        expect(evidence, `${unitId} third basic task range`).toContain(
          `${unitId}/basic/task-{01..03}/session-01/question-{01..08}`,
        );
        expect(evidence, `${unitId} advanced/high task ranges`).toContain(
          `${unitId}/{advanced|high}/task-{01|02}/session-01/question-{01..08}`,
        );
      } else {
        expect(evidence, `${unitId} basic task range`).toContain(
          `${unitId}/basic/task-{01|02}/session-01/question-{01..08}`,
        );
        expect(evidence, `${unitId} advanced and high task range`).toContain(
          `${unitId}/{advanced|high}/task-{01|02}/session-01/question-{01..08}`,
        );
      }
    });
  });

  it('records source evidence and the complete question range for each grade 4 to 6 audit', () => {
    readRows().filter(({ '课程ID': id }) => id.startsWith('grade-4/') || id.startsWith('grade-5/') || id.startsWith('grade-6/')).forEach((row) => {
      const unitId = row['课程ID'];
      const evidence = row['复核证据']?.trim();
      expect(evidence, `${unitId} review evidence`).toBeTruthy();
      expect(evidence, `${unitId} audit date`).toContain('2026-10-19');
      expect(evidence, `${unitId} exact ID range`).toContain(
        `${unitId}/{basic|advanced|high}/task-{01|02}/session-01/question-{01..08}`,
      );
      expect(evidence, `${unitId} fixed snapshot evidence`).toContain('5a80345f2043ba6f8db8d7be9cf3db82725ff1f7');
    });
  });

  it('requiresAllEditorialDimensionsComplete', () => {
    readRows().forEach((row) => {
      expect(row['答案正确性'], row['课程ID']).toBe('完成');
      expect(row['题目清晰度'], row['课程ID']).toBe('完成');
      expect(row['年龄适配'], row['课程ID']).toBe('完成');
      expect(row['教材主题对齐'], row['课程ID']).toBe('完成');
      expect(row['难度归属'], row['课程ID']).toBe('完成');
      expect(row['状态'], row['课程ID']).toBe('完成');
    });
  });

  it('recordsQuestionIdsForRepairs', () => {
    const knownQuestionIds = new Set(Object.values(curriculum.units)
      .flatMap(({ difficultyTracks }) => Object.values(difficultyTracks))
      .flatMap(({ tasks }) => tasks)
      .flatMap(({ sessions }) => sessions)
      .flatMap(({ activities }) => activities.map(({ id }) => id)));

    readRows().forEach((row) => {
      const record = row['修复记录']?.trim();
      if (!record || record === '无') return;

      record.split('；').forEach((repair) => {
        const exactId = repair.match(questionIdPattern);
        const idRange = repair.match(questionIdRangePattern);
        expect(exactId || idRange, `repair record needs a question ID or supported ID range: ${row['课程ID']} / ${repair}`).toBeTruthy();
        const idPrefix = exactId?.[0] ?? idRange?.[0];
        expect(idPrefix?.startsWith(`${row['课程ID']}/`), `repair ID must belong to ${row['课程ID']}`).toBe(true);
        const expandedIds = exactId ? [exactId[0]] : ['basic', 'advanced', 'high'].flatMap((difficulty) => [1, 2]
          .flatMap((task) => Array.from({ length: 8 }, (_, question) => `${idRange?.[1]}/${difficulty}/task-${String(task).padStart(2, '0')}/session-01/question-${String(question + 1).padStart(2, '0')}`)));
        expandedIds.forEach((id) => expect(knownQuestionIds.has(id), `repair ID must exist in the curriculum: ${id}`).toBe(true));
        expect(repair.replace(questionIdPattern, '').replace(questionIdRangePattern, '').replace(/[：:，,。\s]/g, '').length,
          `repair record needs a reason: ${row['课程ID']} / ${repair}`).toBeGreaterThan(0);
      });
    });
  });
});
