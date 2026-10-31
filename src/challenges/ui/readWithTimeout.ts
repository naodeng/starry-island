const LOCAL_DATA_READ_TIMEOUT_MS = 10_000;

export class LocalDataReadTimeoutError extends Error {
  constructor() {
    super('本机数据读取超时。');
    this.name = 'LocalDataReadTimeoutError';
  }
}

export default function readWithTimeout<T>(read: Promise<T>, timeoutMs = LOCAL_DATA_READ_TIMEOUT_MS): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timeoutId = globalThis.setTimeout(
      () => reject(new LocalDataReadTimeoutError()),
      timeoutMs,
    );

    read.then(
      (value) => {
        globalThis.clearTimeout(timeoutId);
        resolve(value);
      },
      (error: unknown) => {
        globalThis.clearTimeout(timeoutId);
        reject(error);
      },
    );
  });
}
