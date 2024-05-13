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
  mutex: SharedLockable | undefined;

  /**
   * @param mutex - The shared lockable to associate.
   */
  constructor(mutex?: SharedLockable) {
    this.mutex = mutex;
  }

  get ownsLock(): boolean {
    return this.mutex?.ownsSharedLock ?? false;
  }

  lock(): Promise<void> {
    return this.mutex!.lockShared();
  }

  /**
   * Exchanges the internal states of the shared locks.
   */
  swap(other: SharedLock): void {
    const temp = this.mutex;
    this.mutex = other.mutex;
    other.mutex = temp;
  }

  tryLock(): boolean | Promise<boolean> {
    return this.mutex!.tryLockShared();
  }

  tryLockFor(timeout: number): Promise<boolean> {
    return (this.mutex as SharedTimedLockable).tryLockSharedFor(timeout);
  }

  tryLockUntil(timestamp: number): Promise<boolean> {
    return (this.mutex as SharedTimedLockable).tryLockSharedUntil(timestamp);
  }

  unlock(): void | Promise<void> {
    return this.mutex!.unlockShared();
  }
}
