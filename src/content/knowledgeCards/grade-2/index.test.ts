import { describe, expect, it } from 'vitest';
// @ts-expect-error Node.js is used only to inspect the local knowledge-card review ledger during Vitest.
import { readFileSync } from 'node:fs';
import { curriculum } from '../../curriculum';
import { knowledgeCardsByUnit } from './index';

function readReviewLedger(): Map<string, Record<string, string | undefined>> {
  const rows = (readFileSync('docs/curriculum/knowledge-card-review.tsv', 'utf8') as string)
    .replace(/^\uFEFF/, '')
    .trim()
    .split(/\r?\n/)
    .map((line) => line.split('\t'));
  const header = rows[0]!;
  return new Map(rows.slice(1).map((values) => [
    values[0]!,
    Object.fromEntries(header.map((key, index) => [key, values[index]])),
  ]));
}

describe('grade 2 knowledge cards', () => {
  it('coversEveryRegisteredTopicExactlyOnceWithCompleteExplanationsAndExamples', () => {
    const grade = curriculum.grades.find(({ id }) => id === 'grade-2');
    expect(grade).toBeDefined();

    const units = grade!.terms.flatMap((term) => term.subjects.flatMap((subject) => subject.units
      .filter((entry) => entry.status === 'active'
        && curriculum.textbooks[entry.textbookEditionId]?.verificationStatus === 'verified')
      .map((entry) => curriculum.units[entry.curriculumUnitKey!]!)));

    expect(units).toHaveLength(51);
    expect(Object.keys(knowledgeCardsByUnit).sort()).toEqual(units.map(({ id }) => id).sort());

    const cards = units.flatMap((unit) => {
      const unitCards = knowledgeCardsByUnit[unit.id]!;
      expect(unitCards.map(({ topic }) => topic)).toEqual(unit.sourceTopics);
      return unitCards;
    });

    expect(cards).toHaveLength(153);
    expect(new Set(cards.map(({ id }) => id)).size).toBe(153);
    for (const card of cards) {
      expect(card.id).toBeTruthy();
      expect(card.explanation.trim()).not.toBe('');
      expect(card.example.prompt.trim()).not.toBe('');
      expect(card.example.answer.trim()).not.toBe('');
      expect(card.example.reasoning.trim()).not.toBe('');
    }
  });

  it('usesAnUnambiguousMeasureWordExampleForABattleship', () => {
    const card = knowledgeCardsByUnit['grade-2/term-1/chinese/unit-02']!
      .find(({ topic }) => topic === '《场景歌》：场景词语、数量表达和常用量词');

    expect(card?.example.prompt).toContain('军舰');
    expect(card?.example.answer).toBe('一艘军舰。');
    expect(card?.example.reasoning).toContain('“艘”');
  });

  it('recordsReviewEvidenceForEveryKnowledgeCardSet', () => {
    const reviews = readReviewLedger();

    expect(reviews.size).toBe(51);
    for (const [unitKey, cards] of Object.entries(knowledgeCardsByUnit)) {
      const review = reviews.get(`${unitKey}#knowledge-cards`);

      expect(review?.['卡片总数']).toBe(String(cards.length));
      expect(review?.['已审数量']).toBe(String(cards.length));
      expect(review?.['单元或主题依据']?.split('；')).toEqual(cards.map(({ topic }) => topic));
      expect(review?.['复核范围与证据']).toContain(`卡片ID范围：${unitKey}/knowledge-{01..${String(cards.length).padStart(2, '0')}}`);
      expect(review?.['状态']).toBe('AI主审完成；独立教育者复核未完成（0）');
    }
  });

  it('recordsContentCorrectionsInTheReviewLedger', () => {
    const reviews = readReviewLedger();

    expect(reviews.get('grade-2/term-1/chinese/unit-04#knowledge-cards')?.['修复记录']).toContain('knowledge-02');
    expect(reviews.get('grade-2/term-1/math/integrated-practice-02#knowledge-cards')?.['修复记录']).toContain('knowledge-03');
    expect(reviews.get('grade-2/term-2/math/unit-06#knowledge-cards')?.['修复记录']).toContain('knowledge-01');
    expect(reviews.get('grade-2/term-2/math/unit-06#knowledge-cards')?.['修复记录']).toContain('knowledge-02');
  });

  it('keepsTheRockShapeExampleConsistentWithItsMushroomComparison', () => {
    const card = knowledgeCardsByUnit['grade-2/term-1/chinese/unit-04']!
      .find(({ topic }) => topic === '《黄山奇石》：观察外形并展开合理想象');

    expect(card?.example.prompt).toContain('上宽下窄');
    expect(card?.example.answer).toContain('蘑菇');
    expect(card?.example.reasoning).toContain('上部较宽、下部较窄');
  });

  it('distinguishesTheTwoCorridorsInTheBodyMeasurementExample', () => {
    const card = knowledgeCardsByUnit['grade-2/term-1/math/integrated-practice-02']!
      .find(({ topic }) => topic === '说明身体尺因人而异并记录测量方法');

    expect(card?.example.prompt).toContain('另一条不同的走廊');
    expect(card?.example.answer).toBe('不能直接确定。');
  });

  it('explainsBothMeaningsOfTheQuotientAndUsesAConcreteRemainderContext', () => {
    const cards = knowledgeCardsByUnit['grade-2/term-2/math/unit-06']!;
    const quotientCard = cards.find(({ topic }) => topic === '认识有余数除法的商和余数');
    const remainderCard = cards.find(({ topic }) => topic === '理解余数必须小于除数并解决简单问题');

    expect(quotientCard?.explanation).toContain('平均分时，商也可以表示每份的数量');
    expect(remainderCard?.example.prompt).toContain('每盒装5颗');
    expect(remainderCard?.example.reasoning).toContain('不够再装一盒');
  });
});
