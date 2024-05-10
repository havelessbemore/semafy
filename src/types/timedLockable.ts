import { Lockable } from "./lockable";

/**
 * Extends the {@link Lockable} interface to include timed blocking.
 */
export interface TimedLockable extends Lockable {
  /**
   * Blocks for the provided duration or until a lock is acquired.
   *
   * @returns `true` if the lock was acquired, `false` otherwise.
   */
  tryLockFor(timeout: number): Promise<boolean>;

  /**
   * Blocks until the provided timestamp is reached or a lock is acquired.
   *
   * @returns `true` if the lock was acquired, `false` otherwise.
   */
  tryLockUntil(timestamp: number): Promise<boolean>;
}
