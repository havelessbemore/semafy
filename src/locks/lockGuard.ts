import type { BasicLockable } from "../types/basicLockable";

/**
 * Acquires the mutex and executes the provided callback, automatically
 * unlocking afterwards. Blocks until the lock is available.
 *
 * @param mutex The mutex to acquire.
 * @param callbackfn The callback function.
 *
 * @returns A promise resolved to the return value of `callbackfn`.
 */
export async function lockGuard<T>(
  mutex: BasicLockable,
  callbackfn: () => T | Promise<T>,
): Promise<T> {
  // Acquire lock
  await mutex.lock();
  try {
    // Execute callback
    return await callbackfn();
  } finally {
    // Release lock
    await mutex.unlock();
  }
}
