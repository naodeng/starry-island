import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import type { ChoiceActivityDefinition } from '../../content/types';
import ChallengeActivityRenderer from './ChallengeActivityRenderer';

const activity: ChoiceActivityDefinition = {
  id: 'challenge-choice-1',
  kind: 'choice',
  prompt: '哪一个算式表示数量增加？',
  hint: '把原有数量和新放入的数量合起来。',
  explanation: '增加可以用加法表示。',
  options: [
    { id: 'add', label: '24 + 18' },
    { id: 'subtract', label: '24 - 18' },
  ],
  correctOptionId: 'add',
};

describe('ChallengeActivityRenderer', () => {
  it('does not render hints or explanations and locks after one submitted answer', () => {
    const onAnswer = vi.fn();
    render(<ChallengeActivityRenderer activity={activity} onAnswer={onAnswer} disabled={false} />);
    const question = screen.getByRole('region', { name: activity.prompt });
    const controls = within(question);

    expect(controls.queryByText(activity.hint)).not.toBeInTheDocument();
    expect(controls.queryByText(activity.explanation)).not.toBeInTheDocument();
    fireEvent.click(controls.getByRole('button', { name: /24 \+ 18/ }));
    fireEvent.click(controls.getByRole('button', { name: '提交答案' }));

    expect(onAnswer).toHaveBeenCalledTimes(1);
    expect(onAnswer).toHaveBeenCalledWith('add');
    expect(controls.getByRole('button', { name: '提交答案' })).toBeDisabled();
  });
});
