import { ATOMICS_TIMED_OUT } from "../types/atomicsStatus";
import type { SyncTimedLockable } from "../types/sync/syncTimedLockable";
import type { TimedLockable } from "../types/timedLockable";

import { LOCK_BIT, RecursiveMutex } from "./recursiveMutex";

/**
 * Provides synchronization across agents (main thread and workers)
 * to allow exclusive recursive access to shared resources / blocks of code.
 *
 * A mutex is owned once an agent successfully locks it.
 * During ownership, the agent may acquire additional locks from the
 * mutex. Ownership ends when the agent releases all aquired locks.
 *
 * While owned, any other agents attempting to lock the mutex will
 * block (or receive `false` from `tryLock` methods). When unlocked,
 * any blocked agent will have the chance to acquire owernship.
 *
 * The maximum number of times a mutex can be locked recursively
 * is defined by {@link RecursiveTimedMutex.Max}. Once reached, attempts
 * for additional locks will throw an error, and calls to `tryLock` methods
 * will return `false`.
 *
 * Behavior is undefined if:
 *    - The mutex is destroyed while being owned.
 *    - The agent is terminated while owning the mutex.
 *    - The mutex's shared memory location is modified externally.
 *
 * Timeout precision for time-based methods may vary due to system load
 * and inherent limitations of JavaScript timing. Developers should
 * consider this possible variability in their applications.
 *
 * @privateRemarks
 * 1. {@link https://en.cppreference.com/w/cpp/thread/recursive_mutex | C++ std::recursive_mutex}
 */
export class RecursiveTimedMutex
  extends RecursiveMutex
  implements TimedLockable, SyncTimedLockable
{
  async tryLockFor(timeout: number): Promise<boolean> {
    return this.tryLockUntil(performance.now() + timeout);
  }

  tryLockForSync(timeout: number): boolean {
    return this.tryLockUntilSync(performance.now() + timeout);
  }

  async tryLockUntil(timestamp: number): Promise<boolean> {
    // If at capacity
    if (this._depth === RecursiveTimedMutex.Max) {
      return false;
    }

    // If not owned, try to acquire lock for a given amount of time
    if (this._depth === 0) {
      while (Atomics.or(this._mem, 0, LOCK_BIT)) {
        const timeout = timestamp - performance.now();
        const res = Atomics.waitAsync(this._mem, 0, LOCK_BIT, timeout);
        const value = res.async ? await res.value : res.value;
        // If time expired
        if (value === ATOMICS_TIMED_OUT) {
          return false;
        }
      }
    }

    // Increment ownership
    ++this._depth;
    return true;
  }

  tryLockUntilSync(timestamp: number): boolean {
    // If at capacity
    if (this._depth === RecursiveTimedMutex.Max) {
      return false;
    }

    // If not owned, try to acquire lock for a given amount of time
    if (this._depth === 0) {
      while (Atomics.or(this._mem, 0, LOCK_BIT)) {
        const timeout = timestamp - performance.now();
        const value = Atomics.wait(this._mem, 0, LOCK_BIT, timeout);
        // If time expired
        if (value === ATOMICS_TIMED_OUT) {
          return false;
        }
      }
    }

    // Increment ownership
    ++this._depth;
    return true;
  }
}
