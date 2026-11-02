import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CourseCatalog from './CourseCatalog';
import ThemeProvider from '../../theme/ThemeProvider';
import { SoundProvider } from '../../sound/SoundProvider';
import { curriculumManifest } from '../../content/curriculumManifest';

const progress = { schemaVersion: 4 as const, completedSessionIds: [], recentCompletions: [], learningStart: null };

function renderCatalog(onNavigate = vi.fn()) {
  return render(
    <SoundProvider>
      <ThemeProvider>
        <CourseCatalog progress={progress} onNavigate={onNavigate} />
      </ThemeProvider>
    </SoundProvider>,
  );
}

describe('CourseCatalog', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('remembersTheLastSelectedCourseAcrossCatalogVisits', async () => {
    const user = userEvent.setup();
    const firstVisit = renderCatalog();

    await user.click(screen.getByRole('combobox', { name: '年级' }));
    await user.click(await screen.findByRole('option', { name: '二年级' }));
    await user.click(screen.getByRole('combobox', { name: '学期' }));
    await user.click(await screen.findByRole('option', { name: '下学期' }));
    await user.click(screen.getByRole('button', { name: '数学' }));

    firstVisit.unmount();
    renderCatalog();

    expect(screen.getByRole('combobox', { name: '年级' })).toHaveTextContent('二年级');
    expect(screen.getByRole('combobox', { name: '学期' })).toHaveTextContent('下学期');
    expect(screen.getByRole('button', { name: '数学' })).toHaveAttribute('aria-pressed', 'true');
  });

  it('tracksTheSelectedCourseInControlsAndLetsLearnersSwitchSubject', async () => {
    const user = userEvent.setup();
    renderCatalog();

    expect(screen.getByRole('combobox', { name: '年级' })).toHaveTextContent('一年级');
    expect(screen.getByRole('combobox', { name: '学期' })).toHaveTextContent('上学期');
    expect(screen.getByRole('button', { name: '语文' })).toHaveAttribute('aria-pressed', 'true');

    await user.click(screen.getByRole('button', { name: '英语' }));
    expect(screen.getByRole('button', { name: '英语' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: '语文' })).toHaveAttribute('aria-pressed', 'false');
  });

  it('offersRegistryDrivenGradeAndTermControls', () => {
    renderCatalog();

    expect(screen.getByRole('combobox', { name: '年级' })).toHaveTextContent('一年级');
    expect(screen.getByRole('combobox', { name: '学期' })).toHaveTextContent('上学期');
    expect(screen.getByRole('button', { name: '语文' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '数学' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '英语' })).toBeInTheDocument();
  });

  it('keepsTheCatalogHeroFocusedOnCourseChoiceInsteadOfRepeatingTheBrandAndProgressPanels', () => {
    renderCatalog();

    expect(screen.getByRole('heading', { level: 1, name: '课程目录' })).toBeInTheDocument();
    expect(document.querySelector('.catalog-brand-logo')).toBeNull();
    expect(document.querySelector('.companion-roster')).toBeNull();
    expect(screen.queryByRole('button', { name: '成就详情' })).not.toBeInTheDocument();
    expect(screen.queryByText('当前探索航线')).not.toBeInTheDocument();
    expect(screen.getByText('云岛号 · 学习伙伴')).toBeInTheDocument();
  });

  it('explainsWhenTheSelectedSubjectHasNoRegisteredUnitsAndKeepsSelectionAvailable', () => {
    const selectedSubject = curriculumManifest.grades[0]!.terms[0]!.subjects[0]!;
    const registeredUnits = selectedSubject.units;
    selectedSubject.units = [];

    try {
      renderCatalog();

      expect(screen.getByRole('heading', { level: 3, name: '正在准备语文课程' })).toBeInTheDocument();
      expect(screen.getByText('这个学期的课程内容正在核对教材版本，准备好后就会开放。')).toBeInTheDocument();
      expect(screen.getByRole('combobox', { name: '年级' })).toBeInTheDocument();
      expect(screen.getByRole('combobox', { name: '学期' })).toBeInTheDocument();
      expect(screen.getByRole('group', { name: '选择学科' })).toBeInTheDocument();
    } finally {
      selectedSubject.units = registeredUnits;
    }
  });

  it('offersAnIndependentChallengeCenterEntry', async () => {
    const user = userEvent.setup();
    const onNavigate = vi.fn();
    renderCatalog(onNavigate);

    await user.click(screen.getByRole('button', { name: '进入闯关中心' }));

    expect(onNavigate).toHaveBeenCalledWith('/challenges');
  });

  it('doesNotDuplicateTheGlobalSettingsEntry', () => {
    renderCatalog();

    expect(screen.queryByRole('button', { name: '设置' })).not.toBeInTheDocument();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('opensVerifiedChineseAndMathUnits', async () => {
    const user = userEvent.setup();
    const onNavigate = vi.fn();
    renderCatalog(onNavigate);

    expect(screen.getAllByRole('button', { name: /进入单元/ })).toHaveLength(8);
    expect(screen.queryByText('筹备中')).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: '数学' }));
    expect(screen.getByRole('button', { name: '数学' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.queryByText('筹备中')).not.toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /进入单元/ })).toHaveLength(10);
    expect(onNavigate).not.toHaveBeenCalled();
  });

  it('opensAllVerifiedGradeOneSecondTermMathEntries', async () => {
    const user = userEvent.setup();
    renderCatalog();

    await user.click(screen.getByRole('combobox', { name: '学期' }));
    await user.click(await screen.findByRole('option', { name: '下学期' }));
    await user.click(screen.getByRole('button', { name: '数学' }));

    expect(screen.getAllByRole('button', { name: /进入单元/ })).toHaveLength(9);
    expect(screen.getByText('第八单元 · 总复习')).toBeInTheDocument();
    expect(screen.getByText('综合实践 · 摆一摆，想一想')).toBeInTheDocument();
  });

  it('showsTheSchoolOfferingNoticeForPreparatoryEnglish', async () => {
    const user = userEvent.setup();
    renderCatalog();

    await user.click(screen.getByRole('button', { name: '英语' }));

    expect(screen.getByText('英语预备级是否属于学校本学期实际开设课程，请以学校安排为准。')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /进入单元/ })).toHaveLength(8);
    expect(screen.getAllByText('复习站')).toHaveLength(2);
    expect(screen.queryByText('UNIT w-1')).not.toBeInTheDocument();
  });

  it('showsSecondTermEnglishWithItsSchoolOfferingNotice', async () => {
    const user = userEvent.setup();
    renderCatalog();

    await user.click(screen.getByRole('combobox', { name: '学期' }));
    await user.click(await screen.findByRole('option', { name: '下学期' }));
    await user.click(screen.getByRole('button', { name: '英语' }));

    expect(screen.getByText('英语预备级是否属于学校本学期实际开设课程，请以学校安排为准。')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /进入单元/ })).toHaveLength(8);
    expect(screen.getAllByText('复习站')).toHaveLength(2);
    expect(screen.getByText('第一单元 · Classroom')).toBeInTheDocument();
  });

  it('doesNotRepeatTheThemeGroupLabelAboveItsTitle', async () => {
    const user = userEvent.setup();
    renderCatalog();

    await user.click(screen.getByRole('combobox', { name: '年级' }));
    await user.click(await screen.findByRole('option', { name: '六年级' }));
    await user.click(screen.getByRole('combobox', { name: '学期' }));
    await user.click(await screen.findByRole('option', { name: '下学期' }));

    expect(screen.getByRole('heading', { name: /古诗词诵读 ·/ })).not.toHaveTextContent('主题组');
    expect(screen.queryByText('主题组', { selector: '.unit-number' })).not.toBeInTheDocument();
  });
});
