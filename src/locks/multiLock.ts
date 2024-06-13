import type { BasicLockable } from "../types/basicLockable";
import type { Lockable } from "../types/lockable";

import { MultiUnlockError } from "../errors/multiUnlockError";
import { lock } from "./lock";
import { tryLock } from "./tryLock";

/**
 * A mutex ownership wrapper.
 *
 * Locking a MultiLock exclusively locks the associated mutexes.
 *
 * If the given mutexes implement {@link Lockable}, then MultiLock will too.
 * Otherwise, using attempted locking (`tryLock`) will result in errors.
 */
export class MultiLock implements Lockable {
  /**
   * Indicates whether the current agent owns the lock.
   */
  protected _isOwner: boolean;

  /**
   * The associated basic lockable.
   */
  mutexes: BasicLockable[];

  /**
   * @param mutexes - The basic lockables to associate.
   */
  constructor(...mutexes: BasicLockable[]) {
    this._isOwner = false;
    this.mutexes = mutexes;
  }

  get ownsLock(): boolean {
    return this._isOwner;
  }

  async lock(): Promise<void> {
    await lock(...this.mutexes);
    this._isOwner = true;
  }

  /**
   * Exchange internal state
   */
  swap(other: MultiLock): void {
    // Swap ownership
    const tIsOwner = this._isOwner;
    this._isOwner = other._isOwner;
    other._isOwner = tIsOwner;
    // Swap mutexes
    const tMutex = this.mutexes;
    this.mutexes = other.mutexes;
    other.mutexes = tMutex;
  }

  async tryLock(): Promise<boolean> {
    const res = await tryLock(...(this.mutexes as Lockable[]));
    return (this._isOwner = res < 0);
  }

  async unlock(): Promise<void> {
    const locks = this.mutexes;
    const N = locks.length;

    // Unlock all locks. Collect any errors
    const unlockErrors: [number, unknown][] = [];
    for (let i = N - 1; i >= 0; --i) {
      try {
        await locks[i].unlock();
      } catch (err) {
        unlockErrors.push([i, err]);
      }
    }

    // Update state
    this._isOwner = false;

    // Throw any errors
    if (unlockErrors.length > 0) {
      const unlocked = N - unlockErrors.length;
      throw new MultiUnlockError(Array.from(locks), unlocked, unlockErrors);
    }
  }
}
