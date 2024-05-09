import { ATOMICS_NOT_EQUAL, ATOMICS_TIMED_OUT } from "./types/atomicsStatus";
import { type CVStatus, CV_OK, CV_TIMED_OUT } from "./types/cvStatus";

import { ERR_ARRAY_NOT_SHARED, ERR_CV_VALUE } from "./errors/constants";
import { MutexOwnershipError } from "./errors/mutexOwnershipError";

import { Mutex } from "./mutex";

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
   */
  constructor();
  /**
   * Creates a new instance of ConditionVariable.
   *
   * @param handle The shared memory location that backs the condition variable.
   *
   * Note: The shared memory location should not be modified outside
   * of this condition variable. Doing so may cause errors.
   */
  constructor(handle: Int32Array);
  /**
   * Creates a new instance of ConditionVariable.
   *
   * @param sharedBuffer The {@link SharedArrayBuffer} that backs the condition variable.
   * @param byteOffset The byte offset within `sharedBuffer`.
   *
   * Note: The shared memory location should not be modified outside
   * of this condition variable. Doing so may cause errors.
   */
  constructor(sharedBuffer: SharedArrayBuffer, byteOffset?: number);
  constructor(sb?: Int32Array | SharedArrayBuffer, byteOffset = 0) {
    if (sb instanceof SharedArrayBuffer) {
      this._mem = new Int32Array(sb, byteOffset ?? 0, 1);
    } else if (sb instanceof Int32Array) {
      if (sb.buffer instanceof SharedArrayBuffer) {
        this._mem = sb;
      } else {
        throw new TypeError(ERR_ARRAY_NOT_SHARED);
      }
    } else {
      sb = new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT);
      this._mem = new Int32Array(sb, 0, 1);
    }

    // Initialize shared memory location
    Atomics.store(this._mem, 0, 0);
  }

  /**
   * Gets the underlying shared memory location.
   */
  get handle(): Int32Array {
    return this._mem;
  }

  /**
   * Notify waiting workers that are blocked on this condition variable.
   *
   * @param count - The number of workers to notify.
   *
   * @returns The number of workers that were woken up.
   */
  notify(count: number): number {
    return Atomics.notify(this._mem, 0, count);
  }

  /**
   * Notify all waiting workers that are blocked on this condition variable.
   *
   * @returns The number of workers that were woken up.
   */
  notifyAll(): number {
    return Atomics.notify(this._mem, 0);
  }

  /**
   * Notify one waiting worker that is blocked on this condition variable.
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
   * @param mutex The {@link Mutex} that must be locked by the current agent.
   *
   * @throws A {@link MutexOwnershipError} If the mutex is not owned by the caller.
   * @throws A {@link RangeError} If the condition variable's internal value is not expected.
   */
  async wait(mutex: Mutex): Promise<void> {
    await this.waitFor(mutex, Infinity);
  }

  /**
   * Blocks the current worker until this condition variable is notified,
   * or an optional timeout expires. The associated mutex is atomically
   * released before blocking and re-acquired after waking up.
   *
   * @param mutex The mutex that must be locked by the current agent.
   * @param timeout An optional timeout in milliseconds after which the wait is aborted.
   *
   * @throws A {@link MutexOwnershipError} If the mutex is not owned by the caller.
   * @throws A {@link RangeError} If the condition variable's internal value is not expected.
   *
   * @returns A {@link CVStatus} representing the result of the operation.
   */
  async waitFor(mutex: Mutex, timeout: number): Promise<CVStatus> {
    // Check mutex is owned
    if (!mutex.ownsLock) {
      throw new MutexOwnershipError();
    }
    try {
      // Start waiting BEFORE releasing mutex
      const res = Atomics.waitAsync(this._mem, 0, 0, timeout);
      // Release mutex
      mutex.unlock();
      // Wait for notification
      const value = res.async ? await res.value : res.value;
      // Check for unexpected value at shared memory location
      if (value === ATOMICS_NOT_EQUAL) {
        throw new RangeError(ERR_CV_VALUE);
      }
      // Return status
      return value === ATOMICS_TIMED_OUT ? CV_TIMED_OUT : CV_OK;
    } finally {
      // Re-acquire mutex
      await mutex.lock();
    }
  }

  /**
   * Blocks the current agent until this condition variable is notified,
   * or until a specified point in time is reached. This is a convenience
   * method for waiting within a deadline.
   *
   * @param mutex The {@link Mutex} that must be locked by the current agent.
   * @param timestamp The absolute time (in milliseconds) at which to stop waiting.
   *
   * @throws A {@link MutexOwnershipError} If the mutex is not owned by the caller.
   * @throws A {@link RangeError} If the condition variable's internal value is not expected.
   *
   * @returns A {@link CVStatus} representing the result of the operation.
   */
  async waitUntil(mutex: Mutex, timestamp: number): Promise<CVStatus> {
    return this.waitFor(mutex, timestamp - performance.now());
  }
}
