/**
 * Provides shared blocking semantics for agents (i.e. main thread, workers).
 */
export interface SharedLockable {
  /**
   * Blocks until a shared lock can be acquired for the current
   * agent. If an exception is thrown, no lock is acquired.
   */
  lockShared(): Promise<void>;

  /**
   * Attempts to acquire a shared lock for the current agent
   * without blocking until acquired. If an exception
   * is thrown, no lock is obtained.
   *
   * @returns `true` if the lock was acquired, `false` otherwise.
   */
  tryLockShared(): boolean | Promise<boolean>;

  /**
   * Releases the shared lock held by the current agent.
   */
  unlockShared(): void | Promise<void>;
}
