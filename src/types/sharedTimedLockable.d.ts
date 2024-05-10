import { SharedLockable } from "./sharedLockable";

/**
 * Extends the {@link SharedLockable} interface to include timed blocking.
 */
export interface SharedTimedLockable extends SharedLockable {
  /**
   * Blocks for the provided duration or until a lock is acquired.
   *
   * @returns `true` if the lock was acquired, `false` otherwise.
   */
  tryLockSharedFor(timeout: number): Promise<boolean>;

  /**
   * Blocks until the provided timestamp is reached or a lock is acquired.
   *
   * @returns `true` if the lock was acquired, `false` otherwise.
   */
  tryLockSharedUntil(timestamp: number): Promise<boolean>;
}
