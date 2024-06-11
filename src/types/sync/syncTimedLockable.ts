import type { SyncLockable } from "./syncLockable";

/**
 * Extends the {@link SyncLockable} interface to include timed blocking.
 */
export interface SyncTimedLockable extends SyncLockable {
  /**
   * Blocks for the provided duration or until a lock is acquired.
   *
   * @returns `true` if the lock was acquired, `false` otherwise.
   */
  tryLockForSync(timeout: number): boolean;

  /**
   * Blocks until the provided timestamp is reached or a lock is acquired.
   *
   * @returns `true` if the lock was acquired, `false` otherwise.
   */
  tryLockUntilSync(timestamp: number): boolean;
}
