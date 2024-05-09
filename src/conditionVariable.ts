import { ATOMICS_NOT_EQUAL, ATOMICS_TIMED_OUT } from "./types/atomics";
import { type CVStatus, CV_OK, CV_TIMED_OUT } from "./types/conditionVariable";

import { Mutex } from "./mutex";
import { MutexError } from "./utils/mutexError";

const ERR_MEM_VALUE = "Unexpected value in atomic memory";
const ERR_MUTEX_NOT_OWNED = "Mutex must be locked by caller";

/**
 * Represents a condition variable similar to those used in C++.
 *
 * A condition variable manages an atomic wait/block mechanism that
 * is tightly coupled with a mutex for safe cross-agent synchronization.
 *
 * @privateRemarks
 * 1. {@link https://en.cppreference.com/w/cpp/thread/condition_variable | C++ std::condition_variable}
 * 1. {@link https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2406.html | Alexander Terekhov, Howard Hinnant. (2007-09-09). Mutex, Lock, Condition Variable Rationale}
 */
export class ConditionVariable {
  /**
   * The shared atomic memory where the condition variable stores its state.
   */
  private _mem: Int32Array;

  /**
   * Creates a new instance of ConditionVariable.
   *
   * @param sharedBuffer The shared buffer that backs the condition variable.
   * @param byteOffset The byte offset within the shared buffer.
   *
   * Note: The value at the shared memory location should not be
   * modified outside of this condition variable.
   */
  constructor(sharedBuffer?: SharedArrayBuffer, byteOffset = 0) {
    sharedBuffer ??= new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT);
    this._mem = new Int32Array(sharedBuffer, byteOffset, 1);
    Atomics.store(this._mem, 0, 0);
  }

  /**
   * Gets the underlying atomic handle.
   */
  get handle(): Int32Array {
    return this._mem;
  }

  /**
   * Wakes up all waiting workers that are blocked on this condition variable.
   *
   * @returns The number of workers that were woken up.
   */
  notifyAll(): number {
    return Atomics.notify(this._mem, 0);
  }

  /**
   * Wakes up one waiting worker that is blocked on this condition variable.
   *
   * @returns The number of workers that were woken up.
   */
  notifyOne(): number {
    return Atomics.notify(this._mem, 0, 1);
  }

  /**
   * Blocks the current worker until this condition variable is notified,
   * or an optional timeout expires. The associated mutex is atomically
   * released before blocking and re-acquired after waking up.
   *
   * @param mutex The mutex that must be locked by the current thread.
   *
   * @throws {MutexError} If the mutex is not owned by the caller.
   * @throws {RangeError} If the condition variable's shared memory value is not expected.
   */
  async wait(mutex: Mutex): Promise<void> {
    await this.waitFor(mutex, Infinity);
  }

  /**
   * Blocks the current worker until this condition variable is notified,
   * or an optional timeout expires. The associated mutex is atomically
   * released before blocking and re-acquired after waking up.
   *
   * @param mutex The mutex that must be locked by the current thread.
   * @param timeout An optional timeout in milliseconds after which the wait is aborted.
   *
   * @throws {MutexError} If the mutex is not owned by the caller.
   * @throws {RangeError} If the condition variable's shared memory value is not expected.
   */
  async waitFor(mutex: Mutex, timeout: number): Promise<CVStatus> {
    if (!mutex.ownsLock) {
      throw new MutexError(ERR_MUTEX_NOT_OWNED);
    }
    try {
      const res = Atomics.waitAsync(this._mem, 0, 0, timeout);
      mutex.unlock();
      const value = res.async ? await res.value : res.value;
      if (value === ATOMICS_NOT_EQUAL) {
        throw new RangeError(ERR_MEM_VALUE);
      }
      return value === ATOMICS_TIMED_OUT ? CV_TIMED_OUT : CV_OK;
    } finally {
      await mutex.lock();
    }
  }

  /**
   * Blocks the current thread until this condition variable is notified,
   * or until a specified point in time is reached. This is a convenience
   * method for waiting within a deadline.
   *
   * @param mutex The mutex that must be locked by the current thread.
   * @param timestamp The absolute time (in milliseconds) at which to stop waiting.
   *
   * @throws {MutexError} If the mutex is not owned by the caller.
   * @throws {RangeError} If the condition variable's shared memory value is not expected.
   */
  async waitUntil(mutex: Mutex, timestamp: number): Promise<CVStatus> {
    return this.waitFor(mutex, timestamp - performance.now());
  }
}
