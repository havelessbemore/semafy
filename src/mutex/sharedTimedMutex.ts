import { CV_TIMED_OUT } from "../types/cvStatus";
import { SharedTimedLockable } from "../types/sharedTimedLockable";
import { TimedLockable } from "../types/timedLockable";

import { READ_BITS, SharedMutex, WRITE_BIT } from "./sharedMutex";

/**
 * Provides synchronization across agents (main thread and workers)
 * to allow exclusive and shared access to resources / blocks of code.
 *
 * If one agent has acquired an exclusive lock, no other agents can acquire
 * the mutex. If one agent has acquired a shared lock, other agents can still
 * acquire the shared lock, but cannot acquire an exclusive lock. Within one
 * agent, only one lock (shared or exclusive) can be acquired at the same time.
 *
 * Shared mutexes are useful when shared data can be safely read by any number
 * of agents simultaneously, but should be written to by only one agent at a
 * time, and not readable by other agents during writing.
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
 * 1. {@link https://en.cppreference.com/w/cpp/thread/shared_timed_mutex | C++ std::shared_timed)mutex}
 * 1. {@link https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2406.html | Alexander Terekhov, Howard Hinnant. (2007-09-09). Mutex, Lock, Condition Variable Rationale}
 */
export class SharedTimedMutex
  extends SharedMutex
  implements TimedLockable, SharedTimedLockable
{
  async tryLockFor(timeout: number): Promise<boolean> {
    return this.tryLockUntil(performance.now() + timeout);
  }

  async tryLockUntil(timestamp: number): Promise<boolean> {
    // If already has lock
    if (this._isWriter || this._isReader) {
      return false;
    }

    // Try to acquire internal lock
    if (!(await this._mutex.tryLockUntil(timestamp))) {
      return false;
    }

    let notify = false;

    try {
      // Try to acquire write lock
      while (Atomics.or(this._mem, 0, WRITE_BIT) & WRITE_BIT) {
        const res = await this._gate1.waitUntil(this._mutex, timestamp);

        // If timed out, stop
        if (res === CV_TIMED_OUT) {
          return false;
        }
      }
      this._isWriter = true;

      // Wait until no readers
      while (Atomics.load(this._mem, 0) & READ_BITS) {
        const res = await this._gate2.waitUntil(this._mutex, timestamp);

        // If timed out, release write lock
        if (res === CV_TIMED_OUT) {
          notify = true;
          Atomics.and(this._mem, 0, READ_BITS);
          this._isWriter = false;
          return false;
        }
      }

      // Return success
      return true;
    } finally {
      // Release internal lock
      this._mutex.unlock();

      // Notify agents waiting on mutex
      if (notify) {
        this._gate1.notifyAll();
      }
    }
  }

  async tryLockSharedFor(timeout: number): Promise<boolean> {
    return this.tryLockSharedUntil(performance.now() + timeout);
  }

  async tryLockSharedUntil(timestamp: number): Promise<boolean> {
    // If already has lock
    if (this._isReader || this._isWriter) {
      return false;
    }

    // Try to acquire internal lock
    if (!(await this._mutex.tryLockUntil(timestamp))) {
      return false;
    }

    try {
      // Wait until there's no writer and there's read capacity
      let state = Atomics.load(this._mem, 0);
      while (state & WRITE_BIT || state === READ_BITS) {
        const res = await this._gate1.waitUntil(this._mutex, timestamp);

        // If timed out, stop
        if (res === CV_TIMED_OUT) {
          return false;
        }

        state = Atomics.load(this._mem, 0);
      }

      // Acquire a read lock
      Atomics.add(this._mem, 0, 1);
      this._isReader = true;

      // Return success
      return true;
    } finally {
      // Release internal lock
      this._mutex.unlock();
    }
  }
}
