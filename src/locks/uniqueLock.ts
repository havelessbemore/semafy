import { BasicLockable } from "../types/basicLockable";
import { Lockable } from "../types/lockable";
import type { TimedLockable } from "../types/timedLockable";

/**
 * A mutex ownership wrapper.
 *
 * Locking a UniqueLock exclusively locks the associated mutex.
 *
 * If the given mutex implements {@link Lockable}, then UniqueLock will too.
 * If the given mutex implements {@link TimedLockable}, then UniqueLock will too.
 * Otherwise, using attempted locking (`tryLock`) or timed methods
 * (`tryLockFor`, `tryLockUntil`) will result in errors.
 */
export class UniqueLock implements TimedLockable {
  /**
   * The associated basic lockable.
   */
  mutex: BasicLockable | undefined;

  /**
   * @param mutex - The basic lockable to associate.
   */
  constructor(mutex?: BasicLockable) {
    this.mutex = mutex;
  }

  get ownsLock(): boolean {
    return this.mutex?.ownsLock ?? false;
  }

  lock(): Promise<void> {
    return this.mutex!.lock();
  }

  /**
   * Exchanges the internal states of the unique locks.
   */
  swap(other: UniqueLock): void {
    const temp = this.mutex;
    this.mutex = other.mutex;
    other.mutex = temp;
  }

  tryLock(): boolean | Promise<boolean> {
    return (this.mutex as Lockable).tryLock();
  }

  tryLockFor(timeout: number): Promise<boolean> {
    return (this.mutex as TimedLockable).tryLockFor(timeout);
  }

  tryLockUntil(timestamp: number): Promise<boolean> {
    return (this.mutex as TimedLockable).tryLockUntil(timestamp);
  }

  unlock(): void | Promise<void> {
    return this.mutex!.unlock();
  }
}
