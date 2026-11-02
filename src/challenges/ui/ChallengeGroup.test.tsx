import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import pilotManifest from '../content/pilotManifest';
import type { LoadedPilotGroup } from '../content/pilotContent';
import type { ChallengeGroupManifest } from '../domain/types';
import ChallengeGroup from './ChallengeGroup';
import { getChallengeTaskTitle } from './challengeLabels';

const group = pilotManifest.groups.find(({ definition }) => definition.id === 'grade-1-term-1-math-unit-01') as unknown as ChallengeGroupManifest;
const loadedGroup: LoadedPilotGroup = {
  group,
  status: 'ready',
  candidates: [],
  disabledQuestionIds: [],
  learningTasks: [],
  issues: [],
};

describe('ChallengeGroup', () => {
  it('shows all five tasks by default and keeps group progress independent of filtering', () => {
    const progress = {
      taskId: group.definition.tasks[0].id,
      bestCorrect: 12,
      bestTotal: 15,
      latestCorrect: 12,
      latestTotal: 15,
      completedCount: 1,
      everPassed: true,
      updatedAt: '2026-11-02T00:00:00.000Z',
      revision: 1,
    };
    render(<ChallengeGroup loadedGroup={loadedGroup} progressByTaskId={{ [progress.taskId]: progress }} onNavigate={vi.fn()} />);

    expect(screen.getByRole('combobox', { name: '任务难度' })).toHaveTextContent('全部难度');
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(5);
    expect(screen.getByText('1/5 个任务已通过')).toBeInTheDocument();
  });

  it.each([
    ['基础', 'basic', 2],
    ['进阶', 'advanced', 2],
    ['高阶', 'high', 1],
  ] as const)('filters tasks to the %s difficulty and can restore all tasks', async (label, difficulty, expectedCount) => {
    const user = userEvent.setup();
    render(<ChallengeGroup loadedGroup={loadedGroup} progressByTaskId={{}} onNavigate={vi.fn()} />);

    await user.click(screen.getByRole('combobox', { name: '任务难度' }));
    await user.click(await screen.findByRole('option', { name: label }));

    expect(screen.getAllByRole('heading', { level: 3 }).map(({ textContent }) => textContent)).toEqual(
      group.definition.tasks
        .filter((task) => task.difficulty === difficulty)
        .map((task) => getChallengeTaskTitle(group, task)),
    );
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(expectedCount);
    expect(screen.getByRole('status')).toHaveTextContent(`正在显示 ${expectedCount} 个任务，共 5 个`);

    await user.click(screen.getByRole('button', { name: '显示全部难度' }));
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(5);
  });
});
