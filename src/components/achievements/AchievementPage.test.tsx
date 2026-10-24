import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import AchievementPage from './AchievementPage';

describe('AchievementPage', () => {
  it('returnsToTheCourseCatalogFromItsBreadcrumb', () => {
    const onNavigate = vi.fn();
    render(<AchievementPage progress={{ schemaVersion: 4, completedSessionIds: [], recentCompletions: [], learningStart: null }} onNavigate={onNavigate} />);

    fireEvent.click(screen.getAllByRole('link', { name: '课程目录' })[0]!);

    expect(onNavigate).toHaveBeenCalledWith('/courses');
  });
});
