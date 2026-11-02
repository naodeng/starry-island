import { describe, expect, it, vi } from 'vitest';
import { acquireChallengeWriterLease } from './writerLock';

function createSerialLockManager() {
  const queues = new Map<string, Array<() => void>>();
  const held = new Set<string>();
  const request = vi.fn((name: string, _options: LockOptions, callback: (lock: Lock | null) => Promise<void>) => new Promise<void>((resolve, reject) => {
    const enter = () => {
      held.add(name);
      Promise.resolve(callback({ name } as Lock)).then(resolve, reject).finally(() => {
        held.delete(name);
        queues.get(name)?.shift()?.();
      });
    };
    if (held.has(name)) {
      const queue = queues.get(name) ?? [];
      queue.push(enter);
      queues.set(name, queue);
    } else {
      enter();
    }
  }));

  return { manager: { request } as unknown as LockManager, request };
}

describe('acquireChallengeWriterLease', () => {
  it('falls back when the browser does not expose Web Locks', async () => {
    const unsupportedNavigator = Object.create(globalThis.navigator) as Navigator;
    Object.defineProperty(unsupportedNavigator, 'locks', { configurable: true, value: undefined });
    vi.stubGlobal('navigator', unsupportedNavigator);

    try {
      await expect(acquireChallengeWriterLease('task-1')).resolves.toBeNull();
    } finally {
      vi.unstubAllGlobals();
    }
  });

  it('queues a second writer until the current lease is released', async () => {
    const { manager } = createSerialLockManager();
    const first = await acquireChallengeWriterLease('task-1', { lockManager: manager });
    expect(first).not.toBeNull();

    let secondAcquired = false;
    const secondPromise = acquireChallengeWriterLease('task-1', { lockManager: manager }).then((lease) => {
      secondAcquired = true;
      return lease;
    });
    await Promise.resolve();
    expect(secondAcquired).toBe(false);

    first!.release();
    const second = await secondPromise;
    expect(second).not.toBeNull();
    expect(secondAcquired).toBe(true);
    second!.release();
  });

  it('rejects an aborted request that is waiting for a writer lease', async () => {
    const request = vi.fn((_name: string, options: LockOptions) => new Promise<void>((_resolve, reject) => {
      options.signal?.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')), { once: true });
    }));
    const controller = new AbortController();
    const acquisition = acquireChallengeWriterLease('task-1', {
      lockManager: { request } as unknown as LockManager,
      signal: controller.signal,
    });

    controller.abort();
    await expect(acquisition).rejects.toMatchObject({ name: 'AbortError' });
  });
});
