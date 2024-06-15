import type { Lockable } from "../types/lockable";
import type { SharedResource } from "../types/sharedResource";
import type { SharedLockable } from "../types/sharedLockable";

import { OwnershipError } from "../errors/ownershipError";
import { RelockError } from "../errors/relockError";
import { lockGuard } from "../locks/lockGuard";

import { ConditionVariable } from "../condVars/conditionVariable";
import { TimedMutex } from "./timedMutex";

export const WRITE_BIT = 1 << 31;
export const READ_BITS = ~WRITE_BIT;

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
 * @privateRemarks
 * 1. {@link https://en.cppreference.com/w/cpp/thread/shared_mutex | C++ std::shared_mutex}
 * 1. {@link https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2406.html | Alexander Terekhov, Howard Hinnant. (2007-09-09). Mutex, Lock, Condition Variable Rationale}
 */
export class SharedMutex implements Lockable, SharedLockable, SharedResource {
  /**
   * The size in bytes of the mutex.
   */
  static readonly ByteLength = 4 * Int32Array.BYTES_PER_ELEMENT;

  protected _gate1: ConditionVariable;
  protected _gate2: ConditionVariable;
  protected _isReader: boolean;
  protected _isWriter: boolean;
  protected _mem: Int32Array;
  protected _mutex: TimedMutex;

  constructor();
  /**
   * @param sharedBuffer The {@link SharedArrayBuffer} that backs the mutex.
   * @param byteOffset The byte offset within `sharedBuffer`. Defaults to `0`.
   *
   * @throws A {@link RangeError} for any of the following:
   *  - `byteOffset` is negative or not a multiple of `4`.
   *  - The byte length of `sharedBuffer` is less than {@link ByteLength}.
   *  - The space in `sharedBuffer` starting from `byteOffset` is less than {@link ByteLength}.
   */
  constructor(sharedBuffer: SharedArrayBuffer, byteOffset?: number);
  constructor(sharedBuffer?: SharedArrayBuffer, byteOffset = 0) {
    const bInt32 = Int32Array.BYTES_PER_ELEMENT;

    // Sanitize input
    sharedBuffer ??= new SharedArrayBuffer(SharedMutex.ByteLength);

    // Initialize properties
    this._mem = new Int32Array(sharedBuffer, byteOffset, 4);
    byteOffset += bInt32;
    this._mutex = new TimedMutex(sharedBuffer, byteOffset);
    byteOffset += bInt32;
    this._gate1 = new ConditionVariable(sharedBuffer, byteOffset);
    byteOffset += bInt32;
    this._gate2 = new ConditionVariable(sharedBuffer, byteOffset);
    this._isReader = false;
    this._isWriter = false;
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

  get ownsLock(): boolean {
    return this._isWriter;
  }

  get ownsSharedLock(): boolean {
    return this._isReader;
  }

  // Exclusive

  /**
   * @throws A {@link RelockError} If the mutex is already locked by the caller.
   */
  async lock(): Promise<void> {
    // If already has lock
    if (this._isWriter || this._isReader) {
      throw new RelockError();
    }

    // Acquire internal lock
    await lockGuard(this._mutex, async () => {
      // Acquire write lock
      while (Atomics.or(this._mem, 0, WRITE_BIT) & WRITE_BIT) {
        await this._gate1.wait(this._mutex);
      }
      this._isWriter = true;

      // Wait until no readers
      while (Atomics.load(this._mem, 0) & READ_BITS) {
        await this._gate2.wait(this._mutex);
      }
    });
  }

  tryLock(): boolean {
    // If already has lock
    if (this._isWriter || this._isReader) {
      return false;
    }

    // Try to acquire internal lock
    if (this._mutex.tryLock()) {
      try {
        // Try to acquire write lock
        this._isWriter =
          Atomics.compareExchange(this._mem, 0, 0, WRITE_BIT) === 0;
      } finally {
        // Release internal lock
        this._mutex.unlock();
      }
    }

    // Return result
    return this._isWriter;
  }

  /**
   * @throws A {@link OwnershipError} If the mutex is not owned by the caller.
   */
  async unlock(): Promise<void> {
    // Check if write lock owned
    if (!this._isWriter) {
      throw new OwnershipError();
    }

    // Acquire internal lock
    await lockGuard(this._mutex, () => {
      // Release write lock
      Atomics.and(this._mem, 0, READ_BITS);
      this._isWriter = false;
    });

    // Notify agents waiting on mutex
    this._gate1.notifyAll();
  }

  // Shared

  /**
   * @throws A {@link RelockError} If the lock is already locked by the caller.
   */
  async lockShared(): Promise<void> {
    // If already has lock
    if (this._isReader || this._isWriter) {
      throw new RelockError();
    }

    // Acquire internal lock
    await lockGuard(this._mutex, async () => {
      // Wait until there's no writer and there's read capacity
      let state = Atomics.load(this._mem, 0);
      while (state & WRITE_BIT || (state & READ_BITS) === READ_BITS) {
        await this._gate1.wait(this._mutex);
        state = Atomics.load(this._mem, 0);
      }

      // Acquire a read lock
      Atomics.add(this._mem, 0, 1);
      this._isReader = true;
    });
  }

  tryLockShared(): boolean {
    // If already has lock
    if (this._isReader || this._isWriter) {
      return false;
    }

    // Try to acquire internal lock
    if (this._mutex.tryLock()) {
      try {
        // Check for writers and read capacity
        const state = Atomics.load(this._mem, 0);
        if (state & WRITE_BIT || (state & READ_BITS) === READ_BITS) {
          return false;
        }

        // Try to acquire read lock
        this._isReader =
          Atomics.compareExchange(this._mem, 0, state, state + 1) === state;
      } finally {
        // Release internal lock
        this._mutex.unlock();
      }
    }

    // Return result
    return this._isReader;
  }

  /**
   * @throws An {@link OwnershipError} If the mutex is not owned by the caller.
   */
  async unlockShared(): Promise<void> {
    // Check if read lock owned
    if (!this._isReader) {
      throw new OwnershipError();
    }

    // Acquire internal lock
    await lockGuard(this._mutex, () => {
      // Release read lock
      const state = Atomics.sub(this._mem, 0, 1);
      this._isReader = false;

      // If there are blocked writers
      if (state & WRITE_BIT) {
        // And no more readers
        if ((state & READ_BITS) === 1) {
          // Notify blocked writers
          this._gate2.notifyAll();
        }
      } else if (state === READ_BITS) {
        // If there are no writers
        // and readers no longer at capacity,
        // then notify blocked readers
        this._gate1.notifyAll();
      }
    });
  }
}
