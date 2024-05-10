import type { SharedLockable } from "../types/sharedLockable";
import type { SharedTimedLockable } from "../types/sharedTimedLockable";
import type { TimedLockable } from "../types/timedLockable";

export class SharedLock implements TimedLockable {
  protected _mutex: SharedLockable;

  constructor(mutex: SharedLockable) {
    this._mutex = mutex;
  }

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
