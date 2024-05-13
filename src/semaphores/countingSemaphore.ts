import { CV_TIMED_OUT } from "../types/cvStatus";
import type { SharedResource } from "../types/sharedResource";
import type { TimedLockable } from "../types/timedLockable";

import { ConditionVariable } from "../condVars/conditionVariable";
import { ERR_SEM_NEG_COUNT, ERR_SEM_OVERFLOW } from "../errors/constants";
import { lockGuard } from "../locks/lockGuard";
import { TimedMutex } from "../mutexes/timedMutex";
import { MAX_INT32_VALUE } from "../utils/constants";

/**
 * A counting semaphore based on shared memory and atomics, allowing for
 * cross-agent synchronization.
 *
 * @privateRemarks
 * 1. {@link https://en.cppreference.com/w/cpp/thread/counting_semaphore | C++ std::counting_semaphore}
 */
export class CountingSemaphore implements SharedResource {
  /**
   * The maximum possible value of the internal counter
   */
  static readonly Max = MAX_INT32_VALUE;

  private _gate: ConditionVariable;
  private _mem: Int32Array;
  private _mutex: TimedLockable;

  constructor();
  /**
   * @param sharedBuffer The shared buffer that backs the semaphore.
   * @param byteOffset The byte offset within the shared buffer. Defaults to `0`.
   */
  constructor(sharedBuffer: SharedArrayBuffer, byteOffset?: number);
  constructor(sharedBuffer?: SharedArrayBuffer, byteOffset = 0) {
    const bInt32 = Int32Array.BYTES_PER_ELEMENT;

    // Sanitize input
    sharedBuffer ??= new SharedArrayBuffer(3 * bInt32);

    // Initialize properties
    this._mem = new Int32Array(sharedBuffer, byteOffset, 3);
    byteOffset += bInt32;
    this._mutex = new TimedMutex(sharedBuffer, byteOffset);
    byteOffset += bInt32;
    this._gate = new ConditionVariable(sharedBuffer, byteOffset);
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
   * Acquires the semaphore, blocking until it is available.
   *
   * @returns A promise that resolves when acquisition is successful.
   */
  acquire(): Promise<void> {
    // Acquire the internal mutex within scope
    return lockGuard(this._mutex, async () => {
      // Wait until internal counter has capacity
      while (Atomics.load(this._mem, 0) <= 0) {
        await this._gate.wait(this._mutex);
      }
      // Decrement internal counter
      Atomics.sub(this._mem, 0, 1);
    });
  }

  /**
   * Attempts to acquire the semaphore.
   *
   * @returns A promise resolving to `true` if successful, otherwise `false`.
   */
  tryAcquire(): Promise<boolean> {
    // Acquire the internal mutex within scope
    return lockGuard(this._mutex, () => {
      // Check internal counter
      if (Atomics.load(this._mem, 0) <= 0) {
        return false;
      }
      // Decrement internal counter
      Atomics.sub(this._mem, 0, 1);
      // Return success
      return true;
    });
  }

  /**
   * Attempts to acquire the semaphore, blocking until either
   * success or the specified timeout elapses.
   *
   * @param timeout The maximum duration in milliseconds to wait.
   *
   * @returns A promise resolving to `true` if successful, otherwise `false`.
   */
  tryAcquireFor(timeout: number): Promise<boolean> {
    return this.tryAcquireUntil(performance.now() + timeout);
  }

  /**
   * Attempts to acquire the lock, blocking until either
   * the lock is acquired or the specified point in time is reached.
   *
   * @param timestamp The absolute time in milliseconds to wait until.
   *
   * @returns A promise resolved to `true` if succesful, otherwise `false`.
   */
  async tryAcquireUntil(timestamp: number): Promise<boolean> {
    // Acquire the internal mutex within scope
    if (!(await this._mutex.tryLockUntil(timestamp))) {
      return false;
    }

    try {
      // Wait until internal counter has capacity
      while (Atomics.load(this._mem, 0) <= 0) {
        const status = await this._gate.waitUntil(this._mutex, timestamp);

        // Stop if timed out
        if (status === CV_TIMED_OUT) {
          return false;
        }
      }

      // Decrement internal counter
      Atomics.sub(this._mem, 0, 1);

      // Return success
      return true;
    } finally {
      // Release internal mutex
      await this._mutex.unlock();
    }
  }

  /**
   * Releases a specified number of units back to the semaphore.
   *
   * @param count The number of units to release. Defaults to 1.
   *
   * @throws {RangeError} If `count` is negative or would cause the semaphore to overflow.
   */
  release(count = 1): Promise<void> {
    // Sanitize input
    if (count < 0) {
      throw new RangeError(ERR_SEM_NEG_COUNT);
    }

    // Acquire internal mutex within scope
    return lockGuard(this._mutex, () => {
      // Get the internal counter
      const state = Atomics.load(this._mem, 0);

      // Check for overflow
      if (count > CountingSemaphore.Max - state) {
        throw new RangeError(ERR_SEM_OVERFLOW);
      }

      // Increment the internal counter
      Atomics.add(this._mem, 0, count);

      // Notify blocked agents
      this._gate.notifyAll();
    });
  }
}
