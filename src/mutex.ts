import { ATOMICS_TIMED_OUT } from "./types/atomicsStatus";

import { ERR_ARRAY_NOT_SHARED, ERR_MUTEX_TIMEOUT } from "./errors/constants";
import { MutexRelockError } from "./errors/mutexRelockError";
import { MutexOwnershipError } from "./errors/mutexOwnershipError";
import { TimeoutError } from "./errors/timeoutError";

/**
 * Represents the mutex lock state.
 */
const LOCKED = 1;

/**
 * Represents the mutex unlocked state.
 */
const UNLOCKED = 0;

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
 * 1. {@link https://en.cppreference.com/w/cpp/thread/unique_lock | C++ std::unique_lock}
 */
export class Mutex {
  /**
   * Indicates whether the current agent owns the lock.
   */
  private _isOwner: boolean;

  /**
   * The shared atomic memory for the mutex.
   */
  private _mem: Int32Array;

  /**
   * Creates a new instance of Mutex.
   */
  constructor();
  /**
   * Creates a new instance of Mutex.
   *
   * @param handle The shared memory location that backs the mutex.
   *
   * Note: The shared memory location should not be modified outside
   * of this mutex. Doing so may cause unexpected behavior.
   */
  constructor(handle: Int32Array);
  /**
   * Creates a new instance of Mutex.
   *
   * @param sharedBuffer The {@link SharedArrayBuffer} that backs the mutex.
   * @param byteOffset The byte offset within `sharedBuffer`.
   *
   * Note: The shared memory location should not be modified outside
   * of this mutex. Doing so may cause unexpected behavior.
   */
  constructor(sharedBuffer: SharedArrayBuffer, byteOffset?: number);
  constructor(sb?: Int32Array | SharedArrayBuffer, byteOffset = 0) {
    this._isOwner = false;
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
    Atomics.and(this._mem, 0, 1);
  }

  /**
   * Gets the underlying atomic handle.
   */
  get handle(): Int32Array {
    return this._mem;
  }

  /**
   * Indicates whether the current agent owns the lock.
   */
  get ownsLock(): boolean {
    return this._isOwner;
  }

  /**
   * Acquires the mutex, blocking until the lock is available.
   *
   * @throws A {@link MutexRelockError} If the mutex is already locked by the caller.
   */
  async lock(): Promise<void> {
    while (!this.tryLock()) {
      await Atomics.waitAsync(this._mem, 0, LOCKED).value;
    }
  }

  /**
   * Acquires the mutex and executes the provided callback, automatically
   * unlocking afterwards. Blocks until the lock is available.
   *
   * @param callbackfn The callback function.
   *
   * @throws A {@link MutexRelockError} If the mutex is already locked by the caller.
   *
   * @returns A promise resolved to the return value of `callbackfn`.
   */
  async request<T>(callbackfn: () => T | Promise<T>): Promise<T> {
    await this.lock();
    try {
      return await callbackfn();
    } finally {
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
   * @throws A {@link MutexRelockError} If the mutex is already locked by the caller.
   * @throws A {@link TimeoutError} If the mutex could not be acquired within the specified time.
   *
   * @returns A promise with the return value from `callbackfn`.
   */
  async requestFor<T>(
    callbackfn: () => T | Promise<T>,
    timeout: number,
  ): Promise<T> {
    if (!(await this.tryLockFor(timeout))) {
      throw new TimeoutError(ERR_MUTEX_TIMEOUT, timeout);
    }
    try {
      return await callbackfn();
    } finally {
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
   * @throws A {@link MutexRelockError} If the mutex is already locked by the caller.
   * @throws A {@link TimeoutError} If the mutex could not be acquired within the specified time.
   *
   * @returns A promise with the return value from `callbackfn`.
   */
  async requestUntil<T>(
    callbackfn: () => T | Promise<T>,
    timestamp: number,
  ): Promise<T> {
    if (!(await this.tryLockUntil(timestamp))) {
      throw new TimeoutError(ERR_MUTEX_TIMEOUT, undefined, timestamp);
    }
    try {
      return await callbackfn();
    } finally {
      this.unlock();
    }
  }

  /**
   * Attempts to acquire the mutex without blocking.
   *
   * @throws A {@link MutexRelockError} If the mutex is already locked by the caller.
   *
   * @returns `true` if the lock was successful, otherwise `false`.
   */
  tryLock(): boolean {
    if (this._isOwner) {
      throw new MutexRelockError();
    }
    return (this._isOwner =
      Atomics.compareExchange(this._mem, 0, UNLOCKED, LOCKED) === UNLOCKED);
  }

  /**
   * Attempts to acquire the lock, blocking until either
   * the lock is acquired or the specified timeout elapses.
   *
   * @param timeout The timeout in milliseconds.
   *
   * @throws A {@link MutexRelockError} If the mutex is already locked by the caller.
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
   * @throws A {@link MutexRelockError} If the mutex is already locked by the caller.
   *
   * @returns A promise resolved to `true` if the lock was succesful, otherwise `false`.
   */
  async tryLockUntil(timestamp: number): Promise<boolean> {
    while (!this.tryLock()) {
      const timeout = timestamp - performance.now();
      const res = Atomics.waitAsync(this._mem, 0, LOCKED, timeout);
      const value = res.async ? await res.value : res.value;
      if (value === ATOMICS_TIMED_OUT) {
        return false;
      }
    }
    return true;
  }

  /**
   * Releases the mutex if currently owned by the caller.
   *
   * @throws A {@link MutexOwnershipError} If the mutex is not owned by the caller.
   */
  unlock(): void {
    if (!this._isOwner) {
      throw new MutexOwnershipError();
    }
    Atomics.store(this._mem, 0, UNLOCKED);
    this._isOwner = false;
    Atomics.notify(this._mem, 0);
  }
}
