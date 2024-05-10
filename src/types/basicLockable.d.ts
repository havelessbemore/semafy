/**
 * The base interface for types that provide exclusive
 * blocking for agents (i.e. main thread, workers).
 */
export interface BasicLockable {
  /**
   * Blocks until a lock can be acquired for the current agent.
   * If an exception is thrown, no lock is acquired.
   */
  lock(): Promise<void>;

  /**
   * Releases the lock held by the current agent.
   */
  unlock(): void | Promise<void>;
}
