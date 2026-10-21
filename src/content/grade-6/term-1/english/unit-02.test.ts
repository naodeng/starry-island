import { describe, expect, it } from 'vitest';
import { unit } from './unit-02';

function question(id: string) {
  return Object.values(unit.difficultyTracks)
    .flatMap((track) => track.tasks)
    .flatMap((task) => task.sessions)
    .flatMap((session) => session.activities)
    .find((activity) => activity.id === `${unit.id}/${id}`);
}

describe('grade 6 English Unit 2 question cards', () => {
  it('asks for city names and uses the complete Sydney Opera House name', () => {
    const london = question('basic/task-01/session-01/question-05');
    expect(london?.kind).toBe('choice');
    if (london?.kind !== 'choice') return;
    expect(london.prompt).toContain('地名“London”的中文名称');
    expect(london.options.find(({ id }) => id === london.correctOptionId)?.label).toBe('How do you say “London” in Chinese?');

    const washington = question('basic/task-01/session-01/question-06');
    expect(washington?.prompt).toContain('How do you say ‘Washington’ in Chinese?');
    expect(washington?.kind).toBe('choice');
    if (washington?.kind !== 'choice') return;
    expect(washington.options.find(({ id }) => id === washington.correctOptionId)?.label).toBe('华盛顿');

    for (const task of Object.values(unit.difficultyTracks).flatMap(({ tasks }) => tasks)) {
      for (const session of task.sessions) {
        for (const activity of session.activities) {
          const content = [activity.prompt, activity.hint, activity.explanation].join(' ');
          expect(content).not.toContain('the Opera House');
          if (activity.kind === 'choice') {
            expect(activity.options.some(({ label }) => label.includes('the Opera House'))).toBe(false);
          }
        }
      }
    }
  });

  it('uses place-name language for landmarks and keeps the high-tier checks distinct', () => {
    const name = question('basic/task-02/session-01/question-05');
    expect(name?.prompt).toContain('the British Museum 这个名称');
    expect(name?.kind).toBe('choice');
    if (name?.kind !== 'choice') return;
    expect(name.options.find(({ id }) => id === name.correctOptionId)?.label).toBe('I know the name “the British Museum”.');

    const landmark = question('high/task-02/session-01/question-05');
    expect(landmark?.prompt).toContain('加拿大国家电视塔”这个地标');
    expect(landmark?.prompt).toContain('A题');
    expect(landmark?.prompt).toContain('B题');
    expect(landmark?.kind).toBe('choice');
    if (landmark?.kind !== 'choice') return;
    expect(landmark.options.find(({ id }) => id === landmark.correctOptionId)?.label).toContain('This card is about the name');
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
