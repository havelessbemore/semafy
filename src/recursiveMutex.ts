import { ATOMICS_TIMED_OUT } from "./types/atomicsStatus";

import { ERR_MUTEX_TIMEOUT, ERR_REC_MUTEX_OVERFLOW } from "./errors/constants";
import { MutexOwnershipError } from "./errors/mutexOwnershipError";
import { TimeoutError } from "./errors/timeoutError";

/**
 * Represents the mutex lock state.
 */
const LOCK_BIT = 1;

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
 * is defined by {@link RecursiveMutex.MAX}. Once reached, attempts
 * for additional locks will throw an error, and calls to `tryLock` methods
 * will return `false`.
 *
 * - Behavior is undefined if:
 *    - The mutex is destroyed while being owned
 *    - The agent is terminated while owning the mutex
 *    - The value at the mutex's shared memory location is unexpected.
 *
 * - Timeout precision for time-based methods may vary due to system load
 * and inherent limitations of JavaScript timing. Developers should
 * consider this possible variability in their applications.
 *
 * @privateRemarks
 * 1. {@link https://en.cppreference.com/w/cpp/thread/recursive_mutex | C++ std::recursive_mutex}
 */
export class RecursiveMutex {
  /**
   * The number of locks acquired by the agent.
   */
  private _depth: number;

  /**
   * The shared atomic memory for the mutex.
   */
  private _mem: Int32Array;

  /**
   * The maximum levels of recursive ownership.
   */
  static readonly MAX = Number.MAX_SAFE_INTEGER;

  /**
   * Creates a new instance of Mutex.
   */
  constructor();
  /**
   * Creates a new instance of Mutex.
   *
   * @param sharedBuffer The {@link SharedArrayBuffer} that backs the mutex.
   * @param byteOffset The byte offset within `sharedBuffer`. Defaults to `0`.
   *
   * Note: The shared memory location should not be modified outside
   * of this mutex. Doing so may cause unexpected behavior.
   */
  constructor(sharedBuffer: SharedArrayBuffer, byteOffset?: number);
  constructor(sharedBuffer?: SharedArrayBuffer, byteOffset = 0) {
    // Sanitize input
    sharedBuffer ??= new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT);

    // Initialize properties
    this._depth = 0;
    this._mem = new Int32Array(sharedBuffer, byteOffset, 1);

    // Initialize shared memory location
    Atomics.and(this._mem, 0, LOCK_BIT);
  }

  /**
   * Gets the underlying shared buffer.
   */
  get buffer(): SharedArrayBuffer {
    return this._mem.buffer as SharedArrayBuffer;
  }

  /**
   * Gets the byte offset in the underlying shared buffer.
   */
  get byteOffset(): number {
    return this._mem.byteOffset;
  }

  /**
   * Indicates whether the current agent owns the lock.
   */
  get ownsLock(): boolean {
    return this._depth > 0;
  }

  /**
   * Acquires the mutex, blocking until the lock is available.
   *
   * @throws A {@link RangeError} If the mutex is already locked the maximum amount of times.
   */
  async lock(): Promise<void> {
    // If at capacity
    if (this._depth === RecursiveMutex.MAX) {
      throw new RangeError(ERR_REC_MUTEX_OVERFLOW);
    }

    // Acquire lock if not owned
    if (this._depth === 0) {
      while (Atomics.or(this._mem, 0, LOCK_BIT)) {
        await Atomics.waitAsync(this._mem, 0, LOCK_BIT).value;
      }
    }

    // Increment ownership
    ++this._depth;
  }

  /**
   * Acquires the mutex and executes the provided callback,
   * automatically unlocking afterwards. Blocks until the lock is available.
   *
   * @param callbackfn The callback function.
   *
   * @throws A {@link RangeError} If the mutex is already locked the maximum amount of times.
   *
   * @returns A promise resolved to the return value of `callbackfn`.
   */
  async request<T>(callbackfn: () => T | Promise<T>): Promise<T> {
    // Acquire lock
    await this.lock();
    try {
      // Execute callback
      return await callbackfn();
    } finally {
      // Release lock
      this.unlock();
    }
  }

  /**
   * Attempts to acquire the mutex and execute the provided
   * callback, automatically unlocking afterwards. Blocks
   * until either the lock is available or the specified timeout elapses.
   *
   * @param timeout The timeout in milliseconds.
   *
   * @throws A {@link RangeError} If the mutex is already locked the maximum amount of times.
   * @throws A {@link TimeoutError} If the mutex could not be acquired within the specified time.
   *
   * @returns A promise with the return value from `callbackfn`.
   */
  async requestFor<T>(
    callbackfn: () => T | Promise<T>,
    timeout: number,
  ): Promise<T> {
    // If at capacity
    if (this._depth === RecursiveMutex.MAX) {
      throw new RangeError(ERR_REC_MUTEX_OVERFLOW);
    }
    // Try to acquire lock for a given amount of time
    if (!(await this.tryLockFor(timeout))) {
      throw new TimeoutError(ERR_MUTEX_TIMEOUT, timeout);
    }
    try {
      // Execute callback
      return await callbackfn();
    } finally {
      // Release lock
      this.unlock();
    }
  }

  /**
   * Attempts to acquire the mutex and execute the provided
   * callback, automatically unlocking afterwards. Blocks
   * until either the lock is available or the specified time elapses.
   *
   * @param timestamp The absolute time in milliseconds.
   *
   * @throws A {@link RangeError} If the mutex is already locked the maximum amount of times.
   * @throws A {@link TimeoutError} If the mutex could not be acquired within the specified time.
   *
   * @returns A promise with the return value from `callbackfn`.
   */
  async requestUntil<T>(
    callbackfn: () => T | Promise<T>,
    timestamp: number,
  ): Promise<T> {
    // If at capacity
    if (this._depth === RecursiveMutex.MAX) {
      throw new RangeError(ERR_REC_MUTEX_OVERFLOW);
    }
    // Try to acquire lock for a given amount of time
    if (!(await this.tryLockUntil(timestamp))) {
      throw new TimeoutError(ERR_MUTEX_TIMEOUT, undefined, timestamp);
    }
    try {
      // Execute callback
      return await callbackfn();
    } finally {
      // Release lock
      this.unlock();
    }
  }

  /**
   * Attempts to acquire the mutex without blocking.
   *
   * @returns `true` if the lock was successful, otherwise `false`.
   */
  tryLock(): boolean {
    // If at capacity
    if (this._depth === RecursiveMutex.MAX) {
      return false;
    }

    // Try to acquire lock if not owned
    if (this._depth === 0 && Atomics.or(this._mem, 0, LOCK_BIT)) {
      return false;
    }

    // Increment ownership
    ++this._depth;
    return true;
  }

  /**
   * Attempts to acquire the lock, blocking until either
   * the lock is acquired or the specified timeout elapses.
   *
   * @param timeout The timeout in milliseconds.
   *
   * @returns A promise resolved to `true` if the lock was succesful, otherwise `false`.
   */
  async tryLockFor(timeout: number): Promise<boolean> {
    return this.tryLockUntil(performance.now() + timeout);
  }

  /**
   * Attempts to acquire the lock, blocking until either
   * the lock is acquired or the specified point in time is reached.
   *
   * @param timestamp The absolute time in milliseconds.
   *
   * @returns A promise resolved to `true` if the lock was succesful, otherwise `false`.
   */
  async tryLockUntil(timestamp: number): Promise<boolean> {
    // If at capacity
    if (this._depth === RecursiveMutex.MAX) {
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

  /**
   * Releases the mutex if currently owned by the caller.
   *
   * @throws A {@link MutexOwnershipError} If the mutex is not owned by the caller.
   */
  unlock(): void {
    // Check if lock owned
    if (this._depth <= 0) {
      throw new MutexOwnershipError();
    }

    // Check if lock owned recursively
    if (this._depth > 1) {
      --this._depth;
      return;
    }

    // Release lock
    Atomics.store(this._mem, 0, 0);
    this._depth = 0;

    // Notify blocked agents
    Atomics.notify(this._mem, 0);
  }
}
