import { describe, expect, it } from 'vitest';
import { unit } from './review-02';

function question(id: string) {
  return Object.values(unit.difficultyTracks)
    .flatMap((track) => track.tasks)
    .flatMap((task) => task.sessions)
    .flatMap((session) => session.activities)
    .find((activity) => activity.id === `${unit.id}/${id}`);
}

describe('grade 6 English Revision 2 question cards', () => {
  it('uses quoted target words and accurate answers in vocabulary prompts', () => {
    const scared = question('basic/task-01/session-01/question-05');
    expect(scared?.kind).toBe('choice');
    if (scared?.kind !== 'choice') return;
    expect(scared.options.find(({ id }) => id === scared.correctOptionId)?.label).toBe('What does “scared” mean?');

    const race = question('basic/task-01/session-01/question-06');
    expect(race?.prompt).toContain('What does ‘race’ mean?');
    expect(race?.kind).toBe('choice');
    if (race?.kind !== 'choice') return;
    expect(race.options.find(({ id }) => id === race.correctOptionId)?.label).toBe('它的意思是“赛跑”。');

    const dumpling = question('basic/task-02/session-01/question-04');
    expect(dumpling?.kind).toBe('choice');
    if (dumpling?.kind !== 'choice') return;
    expect(dumpling.options.find(({ id }) => id === dumpling.correctOptionId)?.label).toBe('饺子');
  });

  it('matches each vocabulary sort to the words shown on its cards', () => {
    const cases = [
      ['basic/task-01/session-01/question-07', ['感受与健康', '比赛'], ['scared', 'ill', 'win', 'race']],
      ['basic/task-02/session-01/question-07', ['人物称呼', '事物名称'], ['inventor', 'poet', 'poem', 'dumpling']],
      ['advanced/task-01/session-01/question-07', ['人或物的名称', '表达愿望或感受的短语'], ['ice lantern', 'pen pal', 'look forward to', 'be afraid of']],
      ['advanced/task-02/session-01/question-07', ['感受与健康', '人物称呼'], ['ill', 'scared', 'poet', 'inventor']],
      ['high/task-01/session-01/question-07', ['比赛与结果', '作品与奖励'], ['win', 'race', 'poem', 'prize']],
      ['high/task-02/session-01/question-07', ['状态与感受', '人物称呼'], ['ill', 'scared', 'poet', 'inventor']],
    ] as const;

    for (const [id, expectedCategories, expectedLabels] of cases) {
      const activity = question(id);
      expect(activity?.kind, id).toBe('categorize');
      if (activity?.kind !== 'categorize') continue;
      expect(activity.categories.map(({ label }) => label), id).toEqual(expectedCategories);
      expect(activity.items.map(({ label }) => label), id).toEqual(expectedLabels);
      expect(activity.items.map(({ categoryId }) => categoryId), id).toHaveLength(expectedLabels.length);
      expect(new Set(activity.items.map(({ categoryId }) => categoryId)).size, id).toBe(2);
    }
  });

  it('keeps communication prompts grammatical and the high tier multi-condition', () => {
    const shortAnswer = question('advanced/task-01/session-01/question-05');
    expect(shortAnswer?.prompt).toContain('expression ‘ice lantern’');
    expect(shortAnswer?.kind).toBe('choice');
    if (shortAnswer?.kind !== 'choice') return;
    expect(shortAnswer.options.find(({ id }) => id === shortAnswer.correctOptionId)?.label).toBe('Yes, I do.');

    const combined = question('high/task-01/session-01/question-05');
    expect(combined?.prompt).toContain('A题');
    expect(combined?.prompt).toContain('B题');
    expect(combined?.kind).toBe('choice');
    if (combined?.kind !== 'choice') return;
    expect(combined.options.find(({ id }) => id === combined.correctOptionId)?.label).toContain('check its spelling and meaning');
  });

  it('renders 48 distinct cards with valid answer references and complete feedback', () => {
    const activities = Object.values(unit.difficultyTracks)
      .flatMap((track) => track.tasks)
      .flatMap((task) => task.sessions)
      .flatMap((session) => session.activities);
    expect(activities).toHaveLength(48);
    expect(new Set(activities.map(({ id }) => id)).size).toBe(48);

    for (const activity of activities) {
      expect(activity.prompt.trim(), activity.id).not.toBe('');
      expect(activity.hint.trim(), activity.id).not.toBe('');
      expect(activity.explanation.trim(), activity.id).not.toBe('');
      if (activity.kind === 'choice') {
        expect(activity.options.map(({ id }) => id), activity.id).toContain(activity.correctOptionId);
      }
      if (activity.kind === 'order') {
        expect(activity.correctOrder, activity.id).toHaveLength(activity.items.length);
        expect(new Set(activity.correctOrder).size, activity.id).toBe(activity.items.length);
      }
    }
  });
});
