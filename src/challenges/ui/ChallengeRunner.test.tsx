import { afterEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render as renderBase, screen, waitFor } from '@testing-library/react';
import type { ReactNode } from 'react';
import { IDBFactory } from 'fake-indexeddb';
import type { ChoiceActivityDefinition } from '../../content/types';
import type { ChallengeAttempt, ChallengeGroupManifest, ChallengeQuestionSnapshot, ChallengeTaskDefinition } from '../domain/types';
import { assemblePaper } from '../domain/assemble';
import { submitFirstAnswer } from '../domain/attempt';
import { createChallengeRepository } from '../storage/indexedDbRepository';
import { RevisionConflictError } from '../storage/repository';
import type { ChallengeRepository } from '../storage/repository';
import type { LoadedPilotGroup } from '../content/pilotContent';
import { SoundProvider } from '../../sound/SoundProvider';
import ChallengeRunner from './ChallengeRunner';

const repositories: ChallengeRepository[] = [];

function render(ui: ReactNode) {
  return renderBase(<SoundProvider>{ui}</SoundProvider>);
}

function makeQuestion(questionId: string): ChallengeQuestionSnapshot {
  const activity: ChoiceActivityDefinition = {
    id: `activity-${questionId}`,
    kind: 'choice',
    prompt: `哪一个答案对应 ${questionId}？`,
    hint: '这是只在学习模式中使用的提示。',
    explanation: `解题说明 ${questionId}。`,
    options: [
      { id: 'correct', label: '正确答案' },
      { id: 'wrong', label: '另一个答案' },
    ],
    correctOptionId: 'correct',
  };
  return {
    questionId,
    activityId: activity.id,
    difficulty: 'basic',
    knowledgePointIds: ['addition'],
    lifecycle: 'active',
    approved: true,
    answerLeakageReviewed: true,
    approvedContentFingerprint: `approved-${questionId}`,
    contentFingerprint: `current-${questionId}`,
    activity,
  };
}

function makeLoadedGroup(targetCount: number, grade = 2): { loadedGroup: LoadedPilotGroup; task: ChallengeTaskDefinition } {
  const groupId = 'test-unit-group';
  const task: ChallengeTaskDefinition = {
    id: `${groupId}/basic-01`,
    difficulty: 'basic',
    targetCount,
    requiredKnowledgePointIds: ['addition'],
  };
  const tasks = [
    task,
    { id: `${groupId}/basic-02`, difficulty: 'basic', targetCount, requiredKnowledgePointIds: ['addition'] },
    { id: `${groupId}/advanced-01`, difficulty: 'advanced', targetCount, requiredKnowledgePointIds: ['addition'] },
    { id: `${groupId}/advanced-02`, difficulty: 'advanced', targetCount, requiredKnowledgePointIds: ['addition'] },
    { id: `${groupId}/high-01`, difficulty: 'high', targetCount, requiredKnowledgePointIds: ['addition'] },
  ] as ChallengeGroupManifest['definition']['tasks'];
  const group: ChallengeGroupManifest = {
    definition: {
      id: groupId,
      kind: 'unit',
      grade,
      semester: 1,
      subject: 'math',
      sourceUnitIds: ['grade-2/term-1/math/unit-02'],
      coreKnowledgePointIds: ['addition'],
      mappingEvidence: { source: 'test', checkedAt: '2026-10-21', notes: 'test' },
      tasks,
    },
    questionIds: [],
    releaseIntent: 'released',
  };
  return {
    loadedGroup: { group, status: 'ready', issues: [], learningTasks: [], disabledQuestionIds: [], candidates: Array.from({ length: Math.max(2, targetCount * 2) }, (_, index) => makeQuestion(`question-${index + 1}`)) },
    task,
  };
}

function makeRepository() {
  const repository = createChallengeRepository({ factory: new IDBFactory(), databaseName: `challenge-runner-${crypto.randomUUID()}` });
  repositories.push(repository);
  return repository;
}

function stubHoldingBrowserLock() {
  let requestFinished = false;
  const request = vi.fn((_name: string, _options: LockOptions, callback: (lock: Lock | null) => Promise<void>) =>
    callback({ name: 'starry-island:challenge:test' } as Lock).then(() => {
      requestFinished = true;
    }));
  const browserNavigator = Object.create(globalThis.navigator) as Navigator;
  Object.defineProperty(browserNavigator, 'locks', { configurable: true, value: { request } as unknown as LockManager });
  vi.stubGlobal('navigator', browserNavigator);
  return () => requestFinished;
}

afterEach(() => {
  for (const repository of repositories.splice(0)) repository.close();
  vi.unstubAllGlobals();
});

describe('ChallengeRunner', () => {
  it('does not offer a new challenge when its group is unavailable and no snapshot exists', async () => {
    const repository = makeRepository();
    const beginAttempt = vi.spyOn(repository, 'beginAttempt');
    const { loadedGroup, task } = makeLoadedGroup(1);
    loadedGroup.status = 'unavailable';
    loadedGroup.candidates = [];

    render(<ChallengeRunner loadedGroup={loadedGroup} task={task} repository={repository} manifestVersion="test-v1" taskTitle="基础闯关 1" onNavigate={vi.fn()} />);

    expect(await screen.findByRole('heading', { name: '这条挑战路线暂时不能开始' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: '开始挑战' })).not.toBeInTheDocument();
    expect(beginAttempt).not.toHaveBeenCalled();
  });

  it('restores an existing frozen snapshot even when the group is unavailable', async () => {
    const repository = makeRepository();
    const { loadedGroup, task } = makeLoadedGroup(1);
    const assemblySeed = 'frozen-unavailable-attempt';
    const activeAttempt: ChallengeAttempt = {
      attemptId: 'frozen-unavailable-attempt',
      taskId: task.id,
      difficulty: task.difficulty,
      status: 'in-progress',
      snapshotSchemaVersion: 1,
      questions: assemblePaper(task, loadedGroup.candidates, assemblySeed, []),
      assemblySeed,
      contentManifestVersion: 'test-v1',
      answers: {},
      currentIndex: 0,
      startedAt: new Date().toISOString(),
      elapsedMs: 0,
      revision: 0,
    };
    loadedGroup.status = 'unavailable';
    loadedGroup.candidates = [];
    await repository.beginAttempt(activeAttempt);

    render(<ChallengeRunner loadedGroup={loadedGroup} task={task} repository={repository} manifestVersion="test-v1" taskTitle="基础闯关 1" onNavigate={vi.fn()} />);

    expect(await screen.findByRole('heading', { name: activeAttempt.questions[0]!.activity.prompt })).toBeInTheDocument();
    expect(screen.getByText('已恢复上次保存的进度')).toBeInTheDocument();
  });

  it('safely pauses a fully answered snapshot that contains a disabled question', async () => {
    const lockRequestIsFinished = stubHoldingBrowserLock();
    const repository = makeRepository();
    const completeAttempt = vi.spyOn(repository, 'completeAttempt');
    const { loadedGroup, task } = makeLoadedGroup(1);
    const assemblySeed = 'disabled-complete-attempt';
    const questions = assemblePaper(task, loadedGroup.candidates, assemblySeed, []);
    const disabledQuestionId = questions[0]!.questionId;
    const initialAttempt: ChallengeAttempt = {
      attemptId: 'disabled-complete-attempt',
      taskId: task.id,
      difficulty: task.difficulty,
      status: 'in-progress',
      snapshotSchemaVersion: 1,
      questions,
      assemblySeed,
      contentManifestVersion: 'test-v1',
      answers: {},
      currentIndex: 0,
      startedAt: new Date().toISOString(),
      elapsedMs: 0,
      revision: 0,
    };
    loadedGroup.disabledQuestionIds = [disabledQuestionId];
    await repository.beginAttempt(initialAttempt);
    const completedAnswer = submitFirstAnswer(initialAttempt, disabledQuestionId, 'correct').attempt;
    const activeAttempt = await repository.saveAnswer(task.id, initialAttempt.revision, completedAnswer);

    render(<ChallengeRunner loadedGroup={loadedGroup} task={task} repository={repository} manifestVersion="test-v1" taskTitle="基础闯关 1" onNavigate={vi.fn()} />);

    expect(await screen.findByRole('heading', { name: '这次挑战暂时暂停' })).toBeInTheDocument();
    expect(screen.getByText(/题目已被标记停用/)).toBeInTheDocument();
    expect(await repository.getActiveAttempt(task.id)).toEqual(activeAttempt);
    expect(await repository.getTaskProgress(task.id)).toBeNull();
    expect(completeAttempt).not.toHaveBeenCalled();
    await waitFor(() => expect(lockRequestIsFinished()).toBe(true));
  });

  it('rechecks a concurrently created snapshot before restoring it from the start action', async () => {
    const repository = makeRepository();
    const completeAttempt = vi.spyOn(repository, 'completeAttempt');
    const { loadedGroup, task } = makeLoadedGroup(1);
    render(<ChallengeRunner loadedGroup={loadedGroup} task={task} repository={repository} manifestVersion="test-v1" taskTitle="基础闯关 1" onNavigate={vi.fn()} />);
    await screen.findByRole('button', { name: '开始挑战' });

    const assemblySeed = 'concurrent-disabled-attempt';
    const questions = assemblePaper(task, loadedGroup.candidates, assemblySeed, []);
    const disabledQuestionId = questions[0]!.questionId;
    const initialAttempt: ChallengeAttempt = {
      attemptId: 'concurrent-disabled-attempt',
      taskId: task.id,
      difficulty: task.difficulty,
      status: 'in-progress',
      snapshotSchemaVersion: 1,
      questions,
      assemblySeed,
      contentManifestVersion: 'test-v1',
      answers: {},
      currentIndex: 0,
      startedAt: new Date().toISOString(),
      elapsedMs: 0,
      revision: 0,
    };
    await repository.beginAttempt(initialAttempt);
    const completedAnswer = submitFirstAnswer(initialAttempt, disabledQuestionId, 'correct').attempt;
    const activeAttempt = await repository.saveAnswer(task.id, initialAttempt.revision, completedAnswer);
    loadedGroup.disabledQuestionIds.push(disabledQuestionId);

    await userClick(screen.getByRole('button', { name: '开始挑战' }));

    expect(await screen.findByRole('heading', { name: '这次挑战暂时暂停' })).toBeInTheDocument();
    expect(await repository.getActiveAttempt(task.id)).toEqual(activeAttempt);
    expect(await repository.getTaskProgress(task.id)).toBeNull();
    expect(completeAttempt).not.toHaveBeenCalled();
  });

  it('writes snapshot schema version 1 when starting a challenge', async () => {
    const repository = makeRepository();
    const { loadedGroup, task } = makeLoadedGroup(1);
    render(<ChallengeRunner loadedGroup={loadedGroup} task={task} repository={repository} manifestVersion="test-v1" taskTitle="基础闯关 1" onNavigate={vi.fn()} />);

    await userClick(await screen.findByRole('button', { name: '开始挑战' }));

    await waitFor(async () => {
      expect(await repository.getActiveAttempt(task.id)).toMatchObject({
        snapshotSchemaVersion: 1,
        contentManifestVersion: 'test-v1',
      });
    });
    const progress = screen.getByRole('progressbar');
    expect(progress).toHaveAttribute('aria-label', '已完成题数');
    expect(progress).toHaveAttribute('aria-valuenow', '0');
    expect(progress).toHaveAttribute('aria-valuetext', '已完成 0/1 题');
  });

  it('applies the challenge group grade tier to the question card', async () => {
    const { loadedGroup, task } = makeLoadedGroup(1, 4);
    render(<ChallengeRunner loadedGroup={loadedGroup} task={task} repository={makeRepository()} manifestVersion="test-v1" taskTitle="基础闯关 1" onNavigate={vi.fn()} />);

    await userClick(await screen.findByRole('button', { name: '开始挑战' }));

    expect(await screen.findByRole('region', { name: /哪一个答案对应/ })).toHaveAttribute('data-grade-tier', 'middle');
  });

  it('persists the final answer before showing the result and keeps completed review ephemeral', async () => {
    const lockRequestIsFinished = stubHoldingBrowserLock();
    const repository = makeRepository();
    const saveAnswer = vi.spyOn(repository, 'saveAnswer');
    const completeAttempt = vi.spyOn(repository, 'completeAttempt');
    const { loadedGroup, task } = makeLoadedGroup(1);
    const onNavigate = vi.fn();
    const view = render(<ChallengeRunner loadedGroup={loadedGroup} task={task} repository={repository} manifestVersion="test-v1" taskTitle="基础闯关 1" onNavigate={onNavigate} />);

    await userClick(await screen.findByRole('button', { name: '开始挑战' }));
    const active = await waitFor(async () => {
      const loaded = await repository.getActiveAttempt(task.id);
      expect(loaded).not.toBeNull();
      return loaded;
    });
    const currentQuestion = active!.questions[0]!;
    expect(await screen.findByRole('heading', { name: currentQuestion.activity.prompt })).toBeInTheDocument();
    expect(screen.queryByText(currentQuestion.activity.hint)).not.toBeInTheDocument();
    expect(screen.queryByText(currentQuestion.activity.explanation)).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: '另一个答案' }));
    fireEvent.click(screen.getByRole('button', { name: '提交答案' }));
    expect(await screen.findByText('0 分')).toBeInTheDocument();
    expect(saveAnswer).toHaveBeenCalledTimes(1);
    expect(completeAttempt).toHaveBeenCalledTimes(1);
    expect(saveAnswer.mock.invocationCallOrder[0]).toBeLessThan(completeAttempt.mock.invocationCallOrder[0]!);
    expect(screen.getByText(`解题说明 ${currentQuestion.questionId}。`)).toBeInTheDocument();
    expect(await repository.getActiveAttempt(task.id)).toBeNull();
    expect(await repository.getTaskProgress(task.id)).toMatchObject({ completedCount: 1, everPassed: false });
    await waitFor(() => expect(lockRequestIsFinished()).toBe(true));

    view.unmount();
    render(<ChallengeRunner loadedGroup={loadedGroup} task={task} repository={repository} manifestVersion="test-v1" taskTitle="基础闯关 1" onNavigate={onNavigate} />);
    expect(await screen.findByText(/最好成绩 0\/1 · 已完成 1 次/)).toBeInTheDocument();
    expect(screen.queryByText(`解题说明 ${currentQuestion.questionId}。`)).not.toBeInTheDocument();
  });

  it('restores the exact saved question order after a confirmed answer and reopening an active task', async () => {
    const repository = makeRepository();
    const { loadedGroup, task } = makeLoadedGroup(2);
    const onNavigate = vi.fn();
    const firstView = render(<ChallengeRunner loadedGroup={loadedGroup} task={task} repository={repository} manifestVersion="test-v1" taskTitle="基础闯关 1" onNavigate={onNavigate} />);
    await userClick(await screen.findByRole('button', { name: '开始挑战' }));
    const active = await waitFor(async () => {
      const loaded = await repository.getActiveAttempt(task.id);
      expect(loaded).not.toBeNull();
      return loaded;
    });
    const firstQuestion = active!.questions[0]!;
    const nextQuestion = active!.questions[1]!;
    expect(await screen.findByRole('heading', { name: firstQuestion.activity.prompt })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: '另一个答案' }));
    fireEvent.click(screen.getByRole('button', { name: '提交答案' }));
    expect(await screen.findByRole('heading', { name: nextQuestion.activity.prompt })).toBeInTheDocument();
    expect(await repository.getActiveAttempt(task.id)).toMatchObject({ currentIndex: 1, answers: { [firstQuestion.questionId]: 'wrong' } });
    expect(screen.queryByText(firstQuestion.activity.explanation)).not.toBeInTheDocument();
    firstView.unmount();

    render(<ChallengeRunner loadedGroup={loadedGroup} task={task} repository={repository} manifestVersion="test-v1" taskTitle="基础闯关 1" onNavigate={onNavigate} />);
    expect(await screen.findByRole('heading', { name: nextQuestion.activity.prompt })).toBeInTheDocument();
    expect(screen.getByText('已恢复上次保存的进度')).toBeInTheDocument();
    expect(screen.queryByText(firstQuestion.activity.prompt)).not.toBeInTheDocument();
  });

  it('keeps the current answer pending after a write failure and advances only after retry saves it', async () => {
    const repository = makeRepository();
    const saveAnswer = repository.saveAnswer.bind(repository);
    vi.spyOn(repository, 'saveAnswer')
      .mockRejectedValueOnce(new Error('temporary storage failure'))
      .mockImplementationOnce(saveAnswer);
    const { loadedGroup, task } = makeLoadedGroup(2);
    render(<ChallengeRunner loadedGroup={loadedGroup} task={task} repository={repository} manifestVersion="test-v1" taskTitle="基础闯关 1" onNavigate={vi.fn()} />);

    await userClick(await screen.findByRole('button', { name: '开始挑战' }));
    const active = await waitFor(async () => {
      const loaded = await repository.getActiveAttempt(task.id);
      expect(loaded).not.toBeNull();
      return loaded;
    });
    const firstQuestion = active!.questions[0]!;
    const nextQuestion = active!.questions[1]!;
    expect(await screen.findByRole('heading', { name: firstQuestion.activity.prompt })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: '另一个答案' }));
    fireEvent.click(screen.getByRole('button', { name: '提交答案' }));
    expect(await screen.findByRole('alert')).toHaveTextContent('答案还没有保存成功');
    expect(screen.getByRole('heading', { name: firstQuestion.activity.prompt })).toBeInTheDocument();
    expect(await repository.getActiveAttempt(task.id)).toMatchObject({ currentIndex: 0, answers: {} });

    await userClick(screen.getByRole('button', { name: '重试保存答案' }));
    expect(await screen.findByRole('heading', { name: nextQuestion.activity.prompt })).toBeInTheDocument();
    expect(await repository.getActiveAttempt(task.id)).toMatchObject({ currentIndex: 1, answers: { [firstQuestion.questionId]: 'wrong' } });
  });

  it('does not mistake another tab answer with the same revision for this page write', async () => {
    const repository = makeRepository();
    const saveAnswer = repository.saveAnswer.bind(repository);
    vi.spyOn(repository, 'saveAnswer').mockImplementationOnce(async (taskId, expectedRevision) => {
      const staleAttempt = await repository.getActiveAttempt(taskId);
      if (!staleAttempt) throw new Error('Expected the other tab to have an active attempt.');
      const competingAnswer = submitFirstAnswer(staleAttempt, staleAttempt.questions[0]!.questionId, 'correct').attempt;
      await saveAnswer(taskId, expectedRevision, competingAnswer);
      throw new RevisionConflictError();
    });
    const { loadedGroup, task } = makeLoadedGroup(2);
    render(<ChallengeRunner loadedGroup={loadedGroup} task={task} repository={repository} manifestVersion="test-v1" taskTitle="基础闯关 1" onNavigate={vi.fn()} />);

    await userClick(await screen.findByRole('button', { name: '开始挑战' }));
    const active = await waitFor(async () => {
      const loaded = await repository.getActiveAttempt(task.id);
      expect(loaded).not.toBeNull();
      return loaded;
    });
    const firstQuestion = active!.questions[0]!;

    fireEvent.click(screen.getByRole('button', { name: '另一个答案' }));
    fireEvent.click(screen.getByRole('button', { name: '提交答案' }));

    expect(await screen.findByRole('alert')).toHaveTextContent('另一个页面发生了变化');
    expect(screen.getByRole('heading', { name: firstQuestion.activity.prompt })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '重试保存答案' })).toBeInTheDocument();
    expect(await repository.getActiveAttempt(task.id)).toMatchObject({
      currentIndex: 1,
      answers: { [firstQuestion.questionId]: 'correct' },
    });
  });

  it('recognizes an exact saved snapshot when the write confirmation is lost', async () => {
    const repository = makeRepository();
    const saveAnswer = repository.saveAnswer.bind(repository);
    vi.spyOn(repository, 'saveAnswer').mockImplementationOnce(async (taskId, expectedRevision, nextAttempt) => {
      await saveAnswer(taskId, expectedRevision, nextAttempt);
      throw new Error('write committed but confirmation was lost');
    });
    const { loadedGroup, task } = makeLoadedGroup(2);
    render(<ChallengeRunner loadedGroup={loadedGroup} task={task} repository={repository} manifestVersion="test-v1" taskTitle="基础闯关 1" onNavigate={vi.fn()} />);

    await userClick(await screen.findByRole('button', { name: '开始挑战' }));
    const active = await waitFor(async () => {
      const loaded = await repository.getActiveAttempt(task.id);
      expect(loaded).not.toBeNull();
      return loaded;
    });
    const firstQuestion = active!.questions[0]!;
    const nextQuestion = active!.questions[1]!;

    fireEvent.click(screen.getByRole('button', { name: '另一个答案' }));
    fireEvent.click(screen.getByRole('button', { name: '提交答案' }));

    expect(await screen.findByRole('heading', { name: nextQuestion.activity.prompt })).toBeInTheDocument();
    expect(await repository.getActiveAttempt(task.id)).toMatchObject({
      currentIndex: 1,
      answers: { [firstQuestion.questionId]: 'wrong' },
    });
  });

  it('releases the writer lease when starting fails before an attempt is saved', async () => {
    const lockRequestIsFinished = stubHoldingBrowserLock();

    const repository = makeRepository();
    vi.spyOn(repository, 'beginAttempt').mockRejectedValue(new Error('challenge could not be saved'));
    const { loadedGroup, task } = makeLoadedGroup(2);
    render(<ChallengeRunner loadedGroup={loadedGroup} task={task} repository={repository} manifestVersion="test-v1" taskTitle="基础闯关 1" onNavigate={vi.fn()} />);

    await userClick(await screen.findByRole('button', { name: '开始挑战' }));

    expect(await screen.findByRole('alert')).toHaveTextContent('题目暂时无法准备好，请稍后重试。');
    expect(screen.getByRole('alert')).not.toHaveTextContent('challenge could not be saved');
    await waitFor(() => expect(lockRequestIsFinished()).toBe(true));
  });

  it('releases a waiting lease when the previous attempt disappears before takeover', async () => {
    const repository = makeRepository();
    const { loadedGroup, task } = makeLoadedGroup(2);
    const assemblySeed = 'active-attempt-seed';
    const activeAttempt = {
      attemptId: 'active-attempt',
      taskId: task.id,
      difficulty: task.difficulty,
      status: 'in-progress' as const,
      questions: assemblePaper(task, loadedGroup.candidates, assemblySeed, []),
      assemblySeed,
      contentManifestVersion: 'test-v1',
      snapshotSchemaVersion: 1,
      answers: {},
      currentIndex: 0,
      startedAt: new Date().toISOString(),
      elapsedMs: 0,
      revision: 0,
    };
    await repository.beginAttempt(activeAttempt);
    vi.spyOn(repository, 'getActiveAttempt')
      .mockResolvedValueOnce(activeAttempt)
      .mockResolvedValueOnce(null);
    const lockRequestIsFinished = stubHoldingBrowserLock();

    render(<ChallengeRunner loadedGroup={loadedGroup} task={task} repository={repository} manifestVersion="test-v1" taskTitle="基础闯关 1" onNavigate={vi.fn()} />);

    expect(await screen.findByRole('button', { name: '开始挑战' })).toBeInTheDocument();
    await waitFor(() => expect(lockRequestIsFinished()).toBe(true));
  });

  it('releases the writer lease after a confirmed discard without creating task progress', async () => {
    vi.stubGlobal('confirm', vi.fn(() => true));
    const lockRequestIsFinished = stubHoldingBrowserLock();
    const repository = makeRepository();
    const { loadedGroup, task } = makeLoadedGroup(2);
    render(<ChallengeRunner loadedGroup={loadedGroup} task={task} repository={repository} manifestVersion="test-v1" taskTitle="基础闯关 1" onNavigate={vi.fn()} />);

    await userClick(await screen.findByRole('button', { name: '开始挑战' }));
    await waitFor(async () => expect(await repository.getActiveAttempt(task.id)).not.toBeNull());
    await userClick(screen.getByRole('button', { name: '放弃本次闯关' }));

    expect(await screen.findByRole('button', { name: '开始挑战' })).toBeInTheDocument();
    expect(await repository.getActiveAttempt(task.id)).toBeNull();
    expect(await repository.getTaskProgress(task.id)).toBeNull();
    await waitFor(() => expect(lockRequestIsFinished()).toBe(true));
  });
});

async function userClick(element: HTMLElement) {
  fireEvent.click(element);
}
