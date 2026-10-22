export type ChallengeErrorKind = 'conflict' | 'storage-full' | 'storage-unavailable' | 'invalid-state' | 'unknown';
export type ChallengeErrorRecovery = 'reload' | 'make-space' | 'retry';

export interface ChallengeErrorGuidance {
  kind: ChallengeErrorKind;
  recovery: ChallengeErrorRecovery;
  actionLabel: string;
  message: string;
}

const GUIDANCE: Record<ChallengeErrorKind, Omit<ChallengeErrorGuidance, 'kind'>> = {
  conflict: {
    recovery: 'reload',
    actionLabel: '重新读取后继续',
    message: '本机记录在另一个页面发生了变化。请重新读取后继续；已保存的答案不会重复提交。',
  },
  'storage-full': {
    recovery: 'make-space',
    actionLabel: '导出备份或清理空间',
    message: '设备可用空间不足，这一步没有完成。请先导出闯关备份或清理设备空间，再重试。',
  },
  'storage-unavailable': {
    recovery: 'retry',
    actionLabel: '稍后重试',
    message: '本机闯关记录暂时无法读取或保存。课程进度不受影响；请稍后重试。',
  },
  'invalid-state': {
    recovery: 'reload',
    actionLabel: '重新读取本机记录',
    message: '这次操作与已保存的挑战状态不一致。请重新读取本机记录后再继续。',
  },
  unknown: {
    recovery: 'retry',
    actionLabel: '重新读取后重试',
    message: '这一步暂时没有完成。请重新读取闯关记录后再试；课程进度不受影响。',
  },
};

function getErrorChain(error: unknown): Array<{ name: string; message: string }> {
  const chain: Array<{ name: string; message: string }> = [];
  const seen = new Set<object>();
  let current: unknown = error;
  while (typeof current === 'object' && current !== null && chain.length < 8 && !seen.has(current)) {
    seen.add(current);
    const candidate = current as { name?: unknown; message?: unknown; cause?: unknown };
    chain.push({
      name: typeof candidate.name === 'string' ? candidate.name : '',
      message: typeof candidate.message === 'string' ? candidate.message : '',
    });
    current = candidate.cause;
  }
  return chain;
}

export function classifyChallengeError(error: unknown): ChallengeErrorGuidance {
  const chain = getErrorChain(error);
  const names = new Set(chain.map(({ name }) => name));
  const messages = chain.map(({ message }) => message.toLowerCase()).join(' ');
  let kind: ChallengeErrorKind = 'unknown';

  if (names.has('RevisionConflictError') || /revision conflict|changed in another tab|another page/.test(messages)) {
    kind = 'conflict';
  } else if (names.has('QuotaExceededError') || names.has('IDBQuotaExceededError')) {
    kind = 'storage-full';
  } else if (
    names.has('InvalidAttemptTransitionError')
    || names.has('AttemptStateError')
    || names.has('DataError')
  ) {
    kind = 'invalid-state';
  } else if (
    names.has('ChallengeRepositoryError')
    || names.has('SecurityError')
    || names.has('InvalidStateError')
    || names.has('UnknownError')
    || /indexeddb|challenge database|storage is unavailable/.test(messages)
  ) {
    kind = 'storage-unavailable';
  }

  return { kind, ...GUIDANCE[kind] };
}

export function getChallengeErrorMessage(error: unknown, fallback: string): string {
  const guidance = classifyChallengeError(error);
  return guidance.kind === 'unknown' ? fallback : guidance.message;
}
