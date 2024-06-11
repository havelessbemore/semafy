import type { BasicLockable } from "../types/basicLockable";
import type { Lockable } from "../types/lockable";
import type { SyncBasicLockable } from "../types/sync/syncBasicLockable";
import type { SyncLockable } from "../types/sync/syncLockable";
import { SyncTimedLockable } from "../types/sync/syncTimedLockable";
import type { TimedLockable } from "../types/timedLockable";

/**
 * A mutex ownership wrapper.
 *
 * Locking a UniqueLock exclusively locks the associated mutex.
 *
 * If the given mutex implements {@link Lockable}, then UniqueLock will too.
 * If the given mutex implements {@link TimedLockable}, then UniqueLock will too.
 * Otherwise, using attempted locking (e.g. `tryLock`) or timed methods
 * (e.g. `tryLockFor`, `tryLockUntil`) will result in errors.
 */
export class UniqueLock implements TimedLockable, SyncTimedLockable {
  /**
   * The associated basic lockable.
   */
  mutex: BasicLockable | SyncBasicLockable | undefined;

  /**
   * @param mutex - The basic lockable to associate.
   */
  constructor(mutex?: BasicLockable | SyncBasicLockable) {
    this.mutex = mutex;
  }

  get ownsLock(): boolean {
    return this.mutex?.ownsLock ?? false;
  }

  lock(): Promise<void> {
    return (this.mutex as Lockable).lock();
  }

  lockSync(): void {
    return (this.mutex as SyncLockable).lockSync();
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

  tryLockSync(): boolean {
    return (this.mutex as SyncLockable).tryLockSync();
  }

  tryLockFor(timeout: number): Promise<boolean> {
    return (this.mutex as TimedLockable).tryLockFor(timeout);
  }

  tryLockForSync(timeout: number): boolean {
    return (this.mutex as SyncTimedLockable).tryLockForSync(timeout);
  }

  tryLockUntil(timestamp: number): Promise<boolean> {
    return (this.mutex as TimedLockable).tryLockUntil(timestamp);
  }

  tryLockUntilSync(timestamp: number): boolean {
    return (this.mutex as SyncTimedLockable).tryLockUntilSync(timestamp);
  }

  unlock(): void | Promise<void> {
    return (this.mutex as Lockable).unlock();
  }

  unlockSync(): void {
    return (this.mutex as SyncLockable).unlockSync();
  }
}
