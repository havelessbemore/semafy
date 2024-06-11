import type { Lockable } from "../types/lockable";
import type { SharedResource } from "../types/sharedResource";
import type { SyncLockable } from "../types/sync/syncLockable";

import { OwnershipError } from "../errors/ownershipError";
import { RelockError } from "../errors/relockError";

/**
 * Represents the mutex lock state.
 */
export const LOCK_BIT = 1;

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
 * @privateRemarks
 * 1. {@link https://en.cppreference.com/w/cpp/thread/mutex | C++ std::mutex}
 */
export class Mutex implements Lockable, SyncLockable, SharedResource {
  /**
   * Indicates whether the current agent owns the lock.
   */
  protected _isOwner: boolean;

  /**
   * The shared memory for the mutex.
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
    this._isOwner = false;
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
    return this._isOwner;
  }

  /**
   * @throws A {@link RelockError} If the lock is already locked by the caller.
   */
  async lock(): Promise<void> {
    // If already has lock
    if (this._isOwner) {
      throw new RelockError();
    }

    // Acquire lock
    while (Atomics.or(this._mem, 0, LOCK_BIT)) {
      const res = Atomics.waitAsync(this._mem, 0, LOCK_BIT);
      if (res.async) {
        await res.value;
      }
    }
    this._isOwner = true;
  }

  /**
   * @throws A {@link RelockError} If the lock is already locked by the caller.
   */
  lockSync(): void {
    // If already has lock
    if (this._isOwner) {
      throw new RelockError();
    }

    // Acquire lock
    while (Atomics.or(this._mem, 0, LOCK_BIT)) {
      Atomics.wait(this._mem, 0, LOCK_BIT);
    }
    this._isOwner = true;
  }

  tryLock(): boolean {
    return this.tryLockSync();
  }

  tryLockSync(): boolean {
    // If already has lock
    if (this._isOwner) {
      return false;
    }
    // Try to acquire lock
    return (this._isOwner = Atomics.or(this._mem, 0, LOCK_BIT) === 0);
  }

  /**
   * @throws An {@link OwnershipError} If the mutex is not owned by the caller.
   */
  unlock(): void {
    return this.unlockSync();
  }

  /**
   * @throws An {@link OwnershipError} If the mutex is not owned by the caller.
   */
  unlockSync(): void {
    // Check if lock owned
    if (!this._isOwner) {
      throw new OwnershipError();
    }
    // Release lock
    Atomics.store(this._mem, 0, 0);
    this._isOwner = false;
    // Notify blocked agents
    Atomics.notify(this._mem, 0);
  }
}
