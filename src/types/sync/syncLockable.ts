import type { SyncBasicLockable } from "./syncBasicLockable";

/**
 * Extends the {@link SyncBasicLockable} interface to include attempted locking.
 */
export interface SyncLockable extends SyncBasicLockable {
  /**
   * Attempts to acquire the lock for the current agent
   * without blocking until acquired. If an exception
   * is thrown, no lock is obtained.
   *
   * @returns `true` if the lock was acquired, `false` otherwise.
   */
  tryLockSync(): boolean;
}
