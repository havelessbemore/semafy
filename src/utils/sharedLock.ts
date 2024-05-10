import type { SharedLockable } from "../types/sharedLockable";
import type { SharedTimedLockable } from "../types/sharedTimedLockable";
import type { TimedLockable } from "../types/timedLockable";

/**
 * A shared mutex wrapper.
 *
 * Locking a SharedLock locks the associated shared mutex in shared mode.
 *
 * If the shared mutex implements {@link SharedTimedLockable}, then SharedLock
 * will also implement it. Otherwise, attempts to use timed methods
 * (`tryLockFor`, `tryLockUntil`) will result in errors.
 */
export class SharedLock implements TimedLockable {
  /**
   * The associated mutex.
   */
  protected _mutex: SharedLockable;

  /**
   * @param mutex - The shared mutex to associate.
   */
  constructor(mutex: SharedLockable) {
    this._mutex = mutex;
  }

  /**
   * The associated mutex.
   */
  get mutex(): SharedLockable {
    return this._mutex;
  }

  get ownsLock(): boolean {
    return this._mutex.ownsSharedLock;
  }

  lock(): Promise<void> {
    return this._mutex.lockShared();
  }

  tryLock(): boolean | Promise<boolean> {
    return this._mutex.tryLockShared();
  }

  tryLockFor(timeout: number): Promise<boolean> {
    return (this._mutex as SharedTimedLockable).tryLockSharedFor(timeout);
  }

  tryLockUntil(timestamp: number): Promise<boolean> {
    return (this._mutex as SharedTimedLockable).tryLockSharedUntil(timestamp);
  }

  unlock(): void | Promise<void> {
    return this._mutex.unlockShared();
  }
}
