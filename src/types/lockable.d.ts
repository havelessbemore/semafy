import { BasicLockable } from "./basicLockable";

/**
 * Extends the {@link BasicLockable} interface to include attempted locking.
 */
export interface Lockable extends BasicLockable {
  /**
   * Attempts to acquire the lock for the current agent
   * without blocking until acquired. If an exception
   * is thrown, no lock is obtained.
   *
   * @returns `true` if the lock was acquired, `false` otherwise.
   */
  tryLock(): boolean | Promise<boolean>;
}
