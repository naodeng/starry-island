export interface ChallengeWriterLease {
  release(): void;
}

interface AcquireWriterLeaseOptions {
  lockManager?: LockManager | null;
  signal?: AbortSignal;
}

function getBrowserLockManager(): LockManager | null {
  if (typeof navigator === 'undefined' || !navigator.locks) return null;
  return navigator.locks;
}

export async function acquireChallengeWriterLease(
  taskId: string,
  options: AcquireWriterLeaseOptions = {},
): Promise<ChallengeWriterLease | null> {
  const lockManager = options.lockManager === undefined ? getBrowserLockManager() : options.lockManager;
  if (!lockManager) return null;

  let acquired = false;
  let resolveAcquisition!: (lease: ChallengeWriterLease) => void;
  let rejectAcquisition!: (error: unknown) => void;
  const acquisition = new Promise<ChallengeWriterLease>((resolve, reject) => {
    resolveAcquisition = resolve;
    rejectAcquisition = reject;
  });

  const lockRequest = lockManager.request(
    `starry-island:challenge:${encodeURIComponent(taskId)}`,
    { mode: 'exclusive', signal: options.signal },
    async (lock) => {
      if (!lock) throw new Error('The challenge writer lock was not granted.');

      let releaseLock!: () => void;
      let released = false;
      const held = new Promise<void>((resolve) => { releaseLock = resolve; });
      acquired = true;
      resolveAcquisition({
        release() {
          if (released) return;
          released = true;
          releaseLock();
        },
      });
      await held;
    },
  );

  void lockRequest.catch((error: unknown) => {
    if (!acquired) rejectAcquisition(error);
  });

  return acquisition;
}
