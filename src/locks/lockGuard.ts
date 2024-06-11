import type { BasicLockable } from "../types/basicLockable";
import type { SyncBasicLockable } from "../types/sync/syncBasicLockable";

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

/**
 * Acquires the mutex and executes the provided callback, automatically
 * unlocking afterwards. Blocks until the lock is available.
 *
 * @param mutex The mutex to acquire.
 * @param callbackfn The callback function.
 *
 * @returns The return value of `callbackfn`.
 */
export function lockGuardSync<T>(
  mutex: SyncBasicLockable,
  callbackfn: () => T,
): T {
  // Acquire lock
  mutex.lockSync();
  try {
    // Execute callback
    return callbackfn();
  } finally {
    // Release lock
    mutex.unlockSync();
  }
}
