import { ATOMICS_NOT_EQUAL, ATOMICS_TIMED_OUT } from "../types/atomicsStatus";
import type { BasicLockable } from "../types/basicLockable";
import { type CVStatus, CV_OK, CV_TIMED_OUT } from "../types/cvStatus";
import type { SharedResource } from "../types/sharedResource";

import { ERR_CV_VALUE } from "../errors/constants";
import { OwnershipError } from "../errors/ownershipError";

/**
 * A condition variable manages an atomic wait/block mechanism that
 * is tightly coupled with a mutex for safe cross-agent synchronization.
 *
 * Behavior is undefined if:
 *    - The shared memory location is modified externally.
 *
 * @privateRemarks
 * 1. {@link https://en.cppreference.com/w/cpp/thread/condition_variable | C++ std::condition_variable}
 * 1. {@link https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2406.html | Alexander Terekhov, Howard Hinnant. (2007-09-09). Mutex, Lock, Condition Variable Rationale}
 */
export class ConditionVariable implements SharedResource {
  /**
   * The size in bytes of the condition variable.
   */
  static readonly ByteLength = Int32Array.BYTES_PER_ELEMENT;

  /**
   * The shared atomic memory where the condition variable stores its state.
   */
  private _mem: Int32Array;

  constructor();
  /**
   * @param sharedBuffer The {@link SharedArrayBuffer} that backs the condition variable.
   * @param byteOffset The byte offset within `sharedBuffer`. Defaults to `0`.
   *
   * @throws A {@link RangeError} for any of the following:
   *  - `byteOffset` is negative or not a multiple of `4`.
   *  - The byte length of `sharedBuffer` is less than {@link ByteLength}.
   *  - The space in `sharedBuffer` starting from `byteOffset` is less than {@link ByteLength}.
   */
  constructor(sharedBuffer: SharedArrayBuffer, byteOffset?: number);
  constructor(sharedBuffer?: SharedArrayBuffer, byteOffset = 0) {
    // Sanitize input
    sharedBuffer ??= new SharedArrayBuffer(ConditionVariable.ByteLength);

    // Initialize properties
    this._mem = new Int32Array(sharedBuffer, byteOffset, 1);

    // Initialize shared memory location
    Atomics.store(this._mem, 0, 0);
  }

  get buffer(): SharedArrayBuffer {
    return this._mem.buffer as SharedArrayBuffer;
  }

  get byteLength(): number {
    return this._mem.byteLength;
  }

  get byteOffset(): number {
    return this._mem.byteOffset;
  }

  /**
   * Notify waiting agents that are blocked on this condition variable.
   *
   * @param count - The number of agents to notify.
   *
   * @returns The number of agents that were notified.
   */
  notify(count: number): number {
    return Atomics.notify(this._mem, 0, count);
  }

  /**
   * Notify all waiting agents that are blocked on this condition variable.
   *
   * @returns The number of agents that were notified.
   */
  notifyAll(): number {
    return Atomics.notify(this._mem, 0);
  }

  /**
   * Notify one waiting agent that is blocked on this condition variable.
   *
   * @returns The number of agents that were notified.
   */
  notifyOne(): number {
    return Atomics.notify(this._mem, 0, 1);
  }

  /**
   * Blocks the current agent until this condition variable is notified.
   * The associated mutex is released before blocking and re-acquired
   * after waking up.
   *
   * @param mutex The mutex that must be locked by the current agent.
   *
   * @throws An {@link OwnershipError} If the mutex is not owned by the caller.
   * @throws A {@link RangeError} If the shared memory data is unexpected.
   */
  async wait(mutex: BasicLockable): Promise<void> {
    await this.waitFor(mutex, Infinity);
  }

  /**
   * Blocks the current agent until this condition variable is notified,
   * or an optional timeout expires. The associated mutex is released
   * before blocking and re-acquired after waking up.
   *
   * @param mutex The mutex that must be locked by the current agent.
   * @param timeout A timeout in milliseconds after which the wait is aborted.
   *
   * @throws An {@link OwnershipError} If the mutex is not owned by the caller.
   * @throws A {@link RangeError} If the shared memory data is unexpected.
   *
   * @returns A {@link CVStatus} representing the result of the operation.
   */
  async waitFor(mutex: BasicLockable, timeout: number): Promise<CVStatus> {
    // Check mutex is owned
    if (!mutex.ownsLock) {
      throw new OwnershipError();
    }
    try {
      // Start waiting BEFORE releasing mutex
      const res = Atomics.waitAsync(this._mem, 0, 0, timeout);
      // Release mutex
      await mutex.unlock();
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
   * or until a specified point in time is reached. The associated mutex
   * is released before blocking and re-acquired after waking up.
   *
   * @param mutex The mutex that must be locked by the current agent.
   * @param timestamp The absolute time in milliseconds at which the wait is aborted.
   *
   * @throws A {@link OwnershipError} If the mutex is not owned by the caller.
   * @throws A {@link RangeError} If the shared memory data is unexpected.
   *
   * @returns A {@link CVStatus} representing the result of the operation.
   */
  async waitUntil(mutex: BasicLockable, timestamp: number): Promise<CVStatus> {
    return this.waitFor(mutex, timestamp - performance.now());
  }
}
