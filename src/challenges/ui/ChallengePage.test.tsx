import { afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
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
});
