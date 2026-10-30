import { afterEach, describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { StrictMode } from 'react';
import { IDBFactory } from 'fake-indexeddb';
import type { ChoiceActivityDefinition } from '../../content/types';
import ThemeProvider from '../../theme/ThemeProvider';
import { SoundProvider } from '../../sound/SoundProvider';
import type { ChallengeAttempt, ChallengeGroupManifest, ChallengeQuestionSnapshot } from '../domain/types';
import { createChallengeRepository } from '../storage/indexedDbRepository';
import type { ChallengeRepository } from '../storage/repository';
import { loadPilotChallengeContent } from '../content/pilotContent';
import ChallengePage from './ChallengePage';

vi.mock('../content/pilotContent', () => ({ loadPilotChallengeContent: vi.fn() }));

const repositories: ChallengeRepository[] = [];

function makeUnavailableGroup(): { loadedGroup: Awaited<ReturnType<typeof loadPilotChallengeContent>>['groups'][number]; taskId: string } {
  const groupId = 'unavailable-test-group';
  const taskId = `${groupId}/basic-01`;
  const tasks = [
    { id: taskId, difficulty: 'basic', targetCount: 1, requiredKnowledgePointIds: ['addition'] },
    { id: `${groupId}/basic-02`, difficulty: 'basic', targetCount: 1, requiredKnowledgePointIds: ['addition'] },
    { id: `${groupId}/advanced-01`, difficulty: 'advanced', targetCount: 1, requiredKnowledgePointIds: ['addition'] },
    { id: `${groupId}/advanced-02`, difficulty: 'advanced', targetCount: 1, requiredKnowledgePointIds: ['addition'] },
    { id: `${groupId}/high-01`, difficulty: 'high', targetCount: 1, requiredKnowledgePointIds: ['addition'] },
  ] as ChallengeGroupManifest['definition']['tasks'];
  const group: ChallengeGroupManifest = {
    definition: {
      id: groupId,
      kind: 'unit',
      grade: 2,
      semester: 1,
      subject: 'math',
      sourceUnitIds: ['grade-2/term-1/math/unit-02'],
      coreKnowledgePointIds: ['addition'],
      mappingEvidence: { source: 'test', checkedAt: '2026-10-22', notes: 'test' },
      tasks,
    },
    questionIds: [],
    releaseIntent: 'released',
  };
  return {
    loadedGroup: {
      group,
      status: 'unavailable',
      candidates: [],
      disabledQuestionIds: [],
      learningTasks: [],
      issues: [],
    },
    taskId,
  };
}

function makeSavedQuestion(): ChallengeQuestionSnapshot {
  const activity: ChoiceActivityDefinition = {
    id: 'frozen-activity',
    kind: 'choice',
    prompt: '这是已保存挑战中的原题。',
    hint: '提示',
    explanation: '讲解',
    options: [{ id: 'correct', label: '答案' }, { id: 'wrong', label: '另一个答案' }],
    correctOptionId: 'correct',
  };
  return {
    questionId: 'frozen-question',
    activityId: activity.id,
    difficulty: 'basic',
    knowledgePointIds: ['addition'],
    lifecycle: 'active',
    approved: true,
    answerLeakageReviewed: true,
    approvedContentFingerprint: 'approved-fingerprint',
    contentFingerprint: 'frozen-fingerprint',
    activity,
  };
}

function makeRepository() {
  const repository = createChallengeRepository({ factory: new IDBFactory(), databaseName: `challenge-page-${crypto.randomUUID()}` });
  repositories.push(repository);
  return repository;
}

afterEach(() => {
  for (const repository of repositories.splice(0)) repository.close();
  vi.unstubAllGlobals();
  vi.useRealTimers();
  vi.clearAllMocks();
});

describe('ChallengePage', () => {
  it('restores a saved snapshot from an unavailable group route', async () => {
    const repository = makeRepository();
    const { loadedGroup, taskId } = makeUnavailableGroup();
    const task = loadedGroup.group.definition.tasks[0]!;
    const activeAttempt: ChallengeAttempt = {
      attemptId: 'frozen-page-attempt',
      taskId,
      difficulty: task.difficulty,
      status: 'in-progress',
      snapshotSchemaVersion: 1,
      questions: [makeSavedQuestion()],
      assemblySeed: 'frozen-seed',
      contentManifestVersion: 'old-manifest',
      answers: {},
      currentIndex: 0,
      startedAt: new Date().toISOString(),
      elapsedMs: 0,
      revision: 0,
    };
    await repository.beginAttempt(activeAttempt);
    vi.mocked(loadPilotChallengeContent).mockResolvedValue({
      manifestVersion: 'current-manifest',
      groups: [loadedGroup],
      validation: {
        errors: [],
        globalIssues: [],
        groupIssuesById: {},
        informationalIssues: [],
        contentChanges: [],
        groupStatusById: { [loadedGroup.group.definition.id]: 'unavailable' },
        questionUniqueness: { exactDuplicateGroups: [], similarQuestionPairs: [], currentFingerprintByQuestionId: {} },
      },
    });

    render(
      <ThemeProvider>
        <SoundProvider>
          <ChallengePage route={{ kind: 'challengeTask', taskId }} onNavigate={vi.fn()} repository={repository} />
        </SoundProvider>
      </ThemeProvider>,
    );

    expect(await screen.findByRole('heading', { name: '这是已保存挑战中的原题。' })).toBeInTheDocument();
    expect(screen.getByText('已恢复上次保存的进度')).toBeInTheDocument();
    expect(await repository.getActiveAttempt(taskId)).toEqual(activeAttempt);
    expect(await repository.getTaskProgress(taskId)).toBeNull();
  });

  it('returnsToTheCourseCatalogWhenChallengeContentCannotLoad', async () => {
    const onNavigate = vi.fn();
    vi.mocked(loadPilotChallengeContent).mockRejectedValueOnce(new Error('content unavailable'));

    render(
      <ThemeProvider>
        <SoundProvider>
          <ChallengePage route={{ kind: 'challengeCenter' }} onNavigate={onNavigate} />
        </SoundProvider>
      </ThemeProvider>,
    );

    expect(await screen.findByRole('heading', { name: '挑战暂时没有打开' })).toBeInTheDocument();
    expect(screen.getByText('闯关题库暂时没有载入。你的课程进度没有变化，可以稍后重新打开。')).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: '暂无可用挑战路线' })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: '返回课程目录' }));

    expect(onNavigate).toHaveBeenCalledWith('/courses');
  });

  it('opensTheWrongQuestionPageWhenStrictModeReplaysOwnedRepositoryEffects', async () => {
    vi.stubGlobal('indexedDB', new IDBFactory());

    render(
      <StrictMode>
        <ThemeProvider>
          <SoundProvider>
            <ChallengePage route={{ kind: 'challengeWrongQuestions' }} onNavigate={vi.fn()} />
          </SoundProvider>
        </ThemeProvider>
      </StrictMode>,
    );

    expect(await screen.findByRole('heading', { name: '错题本', level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '错题本还是空的' })).toBeInTheDocument();
  });

  it('showsAnAnimatedLoadingStateWhileOpeningWrongQuestions', () => {
    const repository = makeRepository();
    vi.spyOn(repository, 'getWrongQuestions').mockImplementation(() => new Promise(() => {}));

    render(
      <ThemeProvider>
        <SoundProvider>
          <ChallengePage route={{ kind: 'challengeWrongQuestions' }} onNavigate={vi.fn()} repository={repository} />
        </SoundProvider>
      </ThemeProvider>,
    );

    const heading = screen.getByRole('heading', { name: '正在打开错题本…' });
    expect(heading.closest('.loading-state')).not.toBeNull();
    expect(screen.getByRole('main')).toHaveAttribute('aria-busy', 'true');
  });

  it('offersProgressRetryWhenStoredProgressNeverFinishesReading', async () => {
    const repository = makeRepository();
    const getAllTaskProgress = vi.spyOn(repository, 'getAllTaskProgress')
      .mockImplementationOnce(() => new Promise(() => {}))
      .mockResolvedValueOnce([]);
    const { loadedGroup } = makeUnavailableGroup();
    loadedGroup.status = 'ready';
    vi.mocked(loadPilotChallengeContent).mockResolvedValueOnce({
      manifestVersion: 'current-manifest',
      groups: [loadedGroup],
      validation: {
        errors: [],
        globalIssues: [],
        groupIssuesById: {},
        informationalIssues: [],
        contentChanges: [],
        groupStatusById: { [loadedGroup.group.definition.id]: 'ready' },
        questionUniqueness: { exactDuplicateGroups: [], similarQuestionPairs: [], currentFingerprintByQuestionId: {} },
      },
    });
    vi.useFakeTimers();

    render(
      <ThemeProvider>
        <SoundProvider>
          <ChallengePage route={{ kind: 'challengeCenter' }} onNavigate={vi.fn()} repository={repository} />
        </SoundProvider>
      </ThemeProvider>,
    );

    await act(async () => { await Promise.resolve(); });
    expect(screen.getByRole('heading', { name: '闯关中心' })).toBeInTheDocument();
    await act(async () => { await vi.advanceTimersByTimeAsync(10_000); });

    expect(screen.getByText('本机进度暂时没有读出；可以继续挑战，成绩没有被更改。')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: '重新读取进度' }));
    await act(async () => { await Promise.resolve(); await Promise.resolve(); });

    expect(getAllTaskProgress).toHaveBeenCalledTimes(2);
    expect(screen.getByText('0/5 个任务已通过')).toBeInTheDocument();
  });

  it('showsARecoverableErrorWhenWrongQuestionReadsNeverFinish', async () => {
    const repository = makeRepository();
    vi.spyOn(repository, 'getWrongQuestions').mockImplementation(() => new Promise(() => {}));
    vi.useFakeTimers();

    render(
      <ThemeProvider>
        <SoundProvider>
          <ChallengePage route={{ kind: 'challengeWrongQuestions' }} onNavigate={vi.fn()} repository={repository} />
        </SoundProvider>
      </ThemeProvider>,
    );

    await act(async () => {
      await vi.advanceTimersByTimeAsync(10_000);
    });

    expect(screen.getByRole('heading', { name: '错题本暂时无法打开' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '重新读取' })).toBeInTheDocument();
  });

  it('keepsTheContentQualityGateVisibleForAnUnavailableRegisteredRoute', async () => {
    const repository = makeRepository();
    const { loadedGroup } = makeUnavailableGroup();
    vi.mocked(loadPilotChallengeContent).mockResolvedValueOnce({
      manifestVersion: 'current-manifest',
      groups: [loadedGroup],
      validation: {
        errors: [],
        globalIssues: [],
        groupIssuesById: {},
        informationalIssues: [],
        contentChanges: [],
        groupStatusById: { [loadedGroup.group.definition.id]: 'unavailable' },
        questionUniqueness: { exactDuplicateGroups: [], similarQuestionPairs: [], currentFingerprintByQuestionId: {} },
      },
    });

    render(
      <ThemeProvider>
        <SoundProvider>
          <ChallengePage
            route={{ kind: 'challengeGroup', groupId: loadedGroup.group.definition.id }}
            onNavigate={vi.fn()}
            repository={repository}
          />
        </SoundProvider>
      </ThemeProvider>,
    );

    expect(await screen.findByRole('heading', { name: '二年级上册数学 · 第二单元' })).toBeInTheDocument();
    expect(screen.getByText('这条挑战路线还没有通过内容质量检查，暂时不能开始。')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: '开始挑战' })).not.toBeInTheDocument();
  });
});
