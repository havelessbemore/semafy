import type { Lockable } from "../types/lockable";
import type { SharedResource } from "../types/sharedResource";

import { ERR_REC_MUTEX_OVERFLOW } from "../errors/constants";
import { OwnershipError } from "../errors/ownershipError";
import { MAX_INT32_VALUE } from "../utils/constants";

/**
 * Represents the mutex lock state.
 */
export const LOCK_BIT = 1;

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
 * is defined by {@link RecursiveMutex.Max}. Once reached, attempts
 * for additional locks will throw an error, and calls to `tryLock` methods
 * will return `false`.
 *
 * Behavior is undefined if:
 *    - The mutex is destroyed while being owned.
 *    - The agent is terminated while owning the mutex.
 *    - The mutex's shared memory location is modified externally.
 *
 * @privateRemarks
 * 1. {@link https://en.cppreference.com/w/cpp/thread/recursive_mutex | C++ std::recursive_mutex}
 */
export class RecursiveMutex implements Lockable, SharedResource {
  /**
   * The maximum levels of recursive ownership.
   */
  static readonly Max = MAX_INT32_VALUE;

  /**
   * The number of locks acquired by the agent.
   */
  protected _depth: number;

  /**
   * The shared atomic memory for the mutex.
   */
  protected _mem: Int32Array;

  constructor();
  /**
   * @param sharedBuffer The {@link SharedArrayBuffer} that backs the mutex.
   * @param byteOffset The byte offset within `sharedBuffer`. Defaults to `0`.
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
    return this._depth > 0;
  }

  /**
   * @throws A {@link RangeError} If the mutex is already locked the maximum amount of times.
   */
  async lock(): Promise<void> {
    // If at capacity
    if (this._depth === RecursiveMutex.Max) {
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

  tryLock(): boolean {
    // If at capacity
    if (this._depth === RecursiveMutex.Max) {
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
   * @throws A {@link OwnershipError} If the mutex is not owned by the caller.
   */
  unlock(): void {
    // Check if lock owned
    if (this._depth <= 0) {
      throw new OwnershipError();
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
