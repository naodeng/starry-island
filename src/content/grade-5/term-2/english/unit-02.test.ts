import { describe, expect, it } from 'vitest';
import { unit } from './unit-02';

function question(id: string) {
  return Object.values(unit.difficultyTracks)
    .flatMap((track) => track.tasks)
    .flatMap((task) => task.sessions)
    .flatMap((session) => session.activities)
    .find((activity) => activity.id === `${unit.id}/${id}`);
}

describe('grade 5 English Unit 2 question cards', () => {
  it('shows the facts needed to answer calendar, holiday, and story questions on each card', () => {
    const evidence = [
      ['basic/task-01/session-01/question-01', 'Tree Planting Day is on March 12th'],
      ['basic/task-01/session-01/question-02', 'Children’s Day is on June 1st'],
      ['basic/task-01/session-01/question-03', 'Mother’s Day is on the second Sunday in May'],
      ['basic/task-01/session-01/question-04', 'New Year’s Day—January 1st'],
      ['basic/task-02/session-01/question-03', 'children plant trees with their classmates'],
      ['basic/task-02/session-01/question-05', '植树节前'],
      ['advanced/task-01/session-01/question-01', 'at midnight'],
      ['advanced/task-01/session-01/question-02', 'play games and have fun'],
      ['advanced/task-01/session-01/question-03', 'help clean the office'],
      ['advanced/task-01/session-01/question-04', 'Father’s Day—make cards for fathers'],
      ['advanced/task-01/session-01/question-05', 'Some children make cards for their fathers'],
      ['advanced/task-01/session-01/question-06', 'children can help their mothers do chores'],
      ['advanced/task-02/session-01/question-02', 'Halloween is on October 31st'],
      ['advanced/task-02/session-01/question-06', 'as part of the Dragon Boat Festival celebration'],
      ['advanced/task-02/session-01/question-07', 'costumes like monsters or famous people'],
      ['high/task-01/session-01/question-01', 'Tree Planting Day. Its calendar says the day is on March 12th'],
      ['high/task-02/session-01/question-01', 'Mary hopes her mother will enjoy a special day on Mother’s Day'],
      ['high/task-02/session-01/question-02', 'Mary wakes up at 5 o’clock'],
      ['high/task-02/session-01/question-03', 'Mary makes paper flowers and a card'],
      ['high/task-02/session-01/question-06', 'Mary’s mother cries because she is happy and knows Mary loves her'],
    ] as const;

    for (const [id, requiredText] of evidence) {
      expect(question(id)?.prompt, id).toContain(requiredText);
    }
  });

  it('keeps the holiday evidence categories and answer keys aligned', () => {
    const activity = question('advanced/task-01/session-01/question-05');
    expect(activity?.kind).toBe('categorize');
    if (activity?.kind !== 'categorize') return;

    const mentioned = activity.categories[0]?.id;
    const notMentioned = activity.categories[1]?.id;
    expect(activity.items.find((item) => item.label === 'Some children make cards for their fathers.')?.categoryId).toBe(mentioned);
    expect(activity.items.find((item) => item.label === 'Every family travels to another country on Christmas.')?.categoryId).toBe(notMentioned);
    expect(activity.items.find((item) => item.label === 'Children never play games on Children’s Day.')?.categoryId).toBe(notMentioned);
  });

  it('renders English sentence explanations with one terminal full stop', () => {
    expect(question('basic/task-01/session-01/question-08')?.explanation).toBe('完整表达为“It’s on March 12th.”');
    expect(question('basic/task-02/session-01/question-08')?.explanation).toBe('完整表达为“We’re going to make a poster about trees.”');
  });

  it('keeps the phonics match unambiguous and the calendar steps ordered by explicit cues', () => {
    const words = question('advanced/task-02/session-01/question-04');
    expect(words?.kind).toBe('match');
    if (words?.kind !== 'match') return;
    expect(words.pairs.find((item) => item.left === 'dress')?.right).toBe('连衣裙');

    const calendar = question('advanced/task-02/session-01/question-08');
    expect(calendar?.kind).toBe('order');
    if (calendar?.kind !== 'order') return;
    const orderedLabels = calendar.correctOrder.map((id) => calendar.items.find((item) => item.id === id)?.label);
    expect(orderedLabels).toEqual([
      '先写上年份、月份和日期',
      '接着填入自己知道的特别日子',
      '核对每个节日和日期是否对应',
      '确认无误后再和朋友分享日历',
    ]);
  });
});
