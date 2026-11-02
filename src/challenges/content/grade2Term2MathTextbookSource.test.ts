// @ts-expect-error Node.js is used only to inspect local curriculum manifests during Vitest.
import { existsSync, readFileSync } from 'node:fs';
// @ts-expect-error Node.js is used only to resolve local curriculum manifests during Vitest.
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

declare const process: { cwd(): string };

const isbn = '978-7-107-37176-9';
const units = Array.from({ length: 10 }, (_, index) => `unit-${String(index + 1).padStart(2, '0')}`);

function readTsv(path: string): Array<Record<string, string>> {
  const [headerLine = '', ...lines]: [string, ...string[]] = readFileSync(path, 'utf8').trim().split(/\r?\n/u) as [string, ...string[]];
  const headers = headerLine.split('\t');
  return lines.map((line: string) => Object.fromEntries(line.split('\t').map((value: string, index: number) => [headers[index], value])));
}

describe('二年级下册数学新教材来源与 AI 主审台账', () => {
  it('十个单元清单均指向用户提供的教材，且不再声明旧回退快照', () => {
    for (const unit of units) {
      const path = resolve(process.cwd(), `src/challenges/content/pilot-manifest-grade2-term2-math-${unit.replace('-', '')}.json`);
      expect(existsSync(path), path).toBe(true);
      const manifest = JSON.parse(readFileSync(path, 'utf8')) as {
        groups: Array<{ definition: { mappingEvidence: { source: string; notes: string } } }>;
        questions: Array<{ approvedBy: string }>;
      };
      const evidence = manifest.groups[0].definition.mappingEvidence;
      expect(`${evidence.source}\n${evidence.notes}`).toContain(isbn);
      expect(evidence.notes).toContain('用户提供的人教版');
      expect(evidence.notes).toContain('版次、印次未知');
      expect(evidence.notes).toContain('独立教育者复核未完成');
      expect(`${evidence.source}\n${evidence.notes}`).not.toMatch(/TapXWorld|5a80345f2043ba6f8db8d7be9cf3db82725ff1f7/u);
      expect(manifest.questions).toHaveLength(90);
      expect(manifest.questions.every((question: { approvedBy: string }) => question.approvedBy === 'AI 主审（非独立教师复核）')).toBe(true);
    }
  });

  it('单元、阶段和实践逐题台账记录 AI 主审及零名独立教育者', () => {
    const paths = [
      ...units.map((unit) => `docs/challenges/grade-2-term-2-math-${unit}-question-review.tsv`),
      'docs/challenges/grade-2-term-2-math-integrated-practice-01-question-review.tsv',
      'docs/challenges/grade-2-term-2-math-first-half-question-review.tsv',
      'docs/challenges/grade-2-term-2-math-second-half-question-review.tsv',
      'docs/challenges/grade-2-term-2-math-end-term-question-review.tsv',
    ];
    for (const relativePath of paths) {
      const path = resolve(process.cwd(), relativePath);
      const rows = readTsv(path);
      expect(rows.length, relativePath).toBeGreaterThan(0);
      expect(rows.every((row) => row['审核状态'].includes('AI 主审已复核')
        && row['审核状态'].includes('独立教育者复核数 0')), relativePath).toBe(true);
      expect(rows.every((row) => row['复核说明'].includes(isbn)), relativePath).toBe(true);
      expect(rows.some((row) => /TapXWorld|5a80345f2043ba6f8db8d7be9cf3db82725ff1f7/u.test(row['复核说明'])), relativePath).toBe(false);
    }
  });
});
