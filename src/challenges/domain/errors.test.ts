import { describe, expect, it } from 'vitest';
import { classifyChallengeError, getChallengeErrorMessage } from './errors';

describe('challenge error recovery guidance', () => {
  it('classifies cross-tab revision conflicts as a reload action', () => {
    const result = classifyChallengeError(Object.assign(new Error('stale revision'), { name: 'RevisionConflictError' }));

    expect(result).toMatchObject({
      kind: 'conflict',
      recovery: 'reload',
      actionLabel: '重新读取后继续',
    });
    expect(result.message).toContain('另一个页面发生了变化');
  });

  it('finds quota failures wrapped in repository errors without exposing internal messages', () => {
    const wrapped = Object.assign(new Error('Could not commit transaction'), {
      name: 'ChallengeRepositoryError',
      cause: new DOMException('private storage detail', 'QuotaExceededError'),
    });
    const result = classifyChallengeError(wrapped);

    expect(result).toMatchObject({ kind: 'storage-full', recovery: 'make-space', actionLabel: '导出备份或清理空间' });
    expect(result.message).toContain('设备可用空间不足');
    expect(result.message).not.toContain('private storage detail');
  });

  it('classifies invalid transitions and provides a safe fallback for unknown errors', () => {
    expect(classifyChallengeError(Object.assign(new Error('internal invariant'), { name: 'InvalidAttemptTransitionError' })).kind)
      .toBe('invalid-state');
    expect(getChallengeErrorMessage(new Error('secret internal details'), '这一步没有完成。'))
      .toBe('这一步没有完成。');
  });

  it('classifies unavailable browser storage without revealing browser error text', () => {
    const result = classifyChallengeError(new DOMException('private database detail', 'UnknownError'));

    expect(result.kind).toBe('storage-unavailable');
    expect(result.message).toContain('本机闯关记录暂时无法读取或保存');
    expect(result.message).not.toContain('private database detail');
  });
});
