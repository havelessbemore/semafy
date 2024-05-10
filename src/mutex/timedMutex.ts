import { ATOMICS_TIMED_OUT } from "../types/atomicsStatus";
import type { TimedLockable } from "../types/timedLockable";

import { LOCK_BIT, Mutex } from "./mutex";

/**
 * Provides synchronization across agents (main thread and workers)
 * to allow exclusive access to shared resources / blocks of code.
 *
 * A mutex is owned from the time an agent successfully locks it
 * and until the agent unlocks it. During ownership, any other agents
 * attempting to lock the mutex will block (or receive `false` from
 * `tryLock` methods). When unlocked, any blocked agent will have
 * the chance to acquire owernship.
 *
 * A locked mutex should not be relocked by the owner. Attempts
 * for additional locks will throw an error, and calls to `tryLock`
 * methods will return `false`.
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
 * 1. {@link https://en.cppreference.com/w/cpp/thread/unique_lock | C++ std::unique_lock}
 */
export class TimedMutex extends Mutex implements TimedLockable {
  async tryLockFor(timeout: number): Promise<boolean> {
    return this.tryLockUntil(performance.now() + timeout);
  }

  async tryLockUntil(timestamp: number): Promise<boolean> {
    // If already has lock
    if (this._isOwner) {
      return false;
    }
    // Try to acquire lock for a given amount of time
    while (Atomics.or(this._mem, 0, LOCK_BIT)) {
      const timeout = timestamp - performance.now();
      const res = Atomics.waitAsync(this._mem, 0, LOCK_BIT, timeout);
      const value = res.async ? await res.value : res.value;
      // If time expired
      if (value === ATOMICS_TIMED_OUT) {
        return false;
      }
    }
    return (this._isOwner = true);
  }
}
