import { ConditionVariable } from "./conditionVariable";
import { MutexOwnershipError } from "./errors/mutexOwnershipError";
import { MutexRelockError } from "./errors/mutexRelockError";
import { Mutex } from "./mutex";
import { Lockable } from "./types/lockable";

const WRITE_BIT = 1 << 31;
const READ_BITS = ~WRITE_BIT;

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
 * @privateRemarks
 * 1. {@link https://en.cppreference.com/w/cpp/thread/shared_mutex | C++ std::shared_mutex}
 * 1. {@link https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2406.html | Alexander Terekhov, Howard Hinnant. (2007-09-09). Mutex, Lock, Condition Variable Rationale}
 */
export class SharedMutex implements Lockable {
  private _gate1: ConditionVariable;
  private _gate2: ConditionVariable;
  private _isReader: boolean;
  private _isWriter: boolean;
  private _mem: Int32Array;
  private _mutex: Mutex;

  /**
   * Creates a new instance of a SharedMutex.
   */
  constructor();
  /**
   * Creates a new instance of a SharedMutex.
   *
   * @param sharedBuffer The shared buffer that backs the mutex.
   * @param byteOffset The byte offset within the shared buffer. Defaults to `0`.
   */
  constructor(sharedBuffer: SharedArrayBuffer, byteOffset?: number);
  constructor(sharedBuffer?: SharedArrayBuffer, byteOffset = 0) {
    const bInt32 = Int32Array.BYTES_PER_ELEMENT;

    // Sanitize input
    sharedBuffer ??= new SharedArrayBuffer(4 * bInt32);

    // Initialize properties
    this._mem = new Int32Array(sharedBuffer, byteOffset, 1);
    byteOffset += bInt32;
    this._mutex = new Mutex(sharedBuffer, byteOffset);
    byteOffset += bInt32;
    this._gate1 = new ConditionVariable(sharedBuffer, byteOffset);
    byteOffset += bInt32;
    this._gate2 = new ConditionVariable(sharedBuffer, byteOffset);
    this._isReader = false;
    this._isWriter = false;
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

  // Exclusive

  /**
   * Indicates whether the current agent owns the lock.
   */
  get ownsLock(): boolean {
    return this._isWriter;
  }

  /**
   * Acquires the mutex, blocking until the lock is available.
   *
   * @throws A {@link MutexRelockError} If the mutex is already locked by the caller.
   */
  async lock(): Promise<void> {
    // If already has lock
    if (this._isWriter || this._isReader) {
      throw new MutexRelockError();
    }

    // Acquire internal lock
    await this._mutex.lock();
    try {
      // Acquire write lock
      while (Atomics.or(this._mem, 0, WRITE_BIT) & WRITE_BIT) {
        await this._gate1.wait(this._mutex);
      }
      this._isWriter = true;

      // Wait until no readers
      while (Atomics.load(this._mem, 0) & READ_BITS) {
        await this._gate2.wait(this._mutex);
      }
    } finally {
      // Release internal lock
      await this._mutex.unlock();
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
    // Acquire write lock
    await this.lock();
    try {
      // Execute callback
      return await callbackfn();
    } finally {
      // Release write lock
      await this.unlock();
    }
  }

  /**
   * Attempts to acquire the mutex without blocking.
   *
   * @returns A promise resolved to `true` if the lock was successful, otherwise `false`.
   */
  async tryLock(): Promise<boolean> {
    // If already has lock
    if (this._isWriter || this._isReader) {
      return false;
    }

    // Acquire internal lock
    await this._mutex.lock();

    try {
      // Try to acquire write lock
      return (this._isWriter =
        Atomics.compareExchange(this._mem, 0, 0, WRITE_BIT) === 0);
    } finally {
      // Release internal lock
      this._mutex.unlock();
    }
  }

  /**
   * Releases the mutex if currently owned by the caller.
   *
   * @throws A {@link MutexOwnershipError} If the mutex is not owned by the caller.
   */
  async unlock(): Promise<void> {
    // Check if write lock owned
    if (!this._isWriter) {
      throw new MutexOwnershipError();
    }

    // Acquire internal lock
    await this._mutex.lock();

    try {
      // Release write lock
      Atomics.and(this._mem, 0, READ_BITS);
      this._isWriter = false;
    } finally {
      // Release internal lock
      await this._mutex.unlock();
    }

    // Notify agents waiting on mutex
    this._gate1.notifyAll();
  }

  // Shared

  /**
   * Indicates whether the current agent owns a shared lock.
   */
  get ownsSharedLock(): boolean {
    return this._isReader;
  }

  /**
   * Acquires the mutex for shared ownership, blocking until a lock is available.
   *
   * @throws A {@link MutexRelockError} If the mutex is already locked by the caller.
   */
  async lockShared(): Promise<void> {
    // If already has lock
    if (this._isReader || this._isWriter) {
      throw new MutexRelockError();
    }

    // Acquire internal lock
    await this._mutex.lock();

    try {
      // Wait until there's no writer and there's read capacity
      let state = Atomics.load(this._mem, 0);
      while (state & WRITE_BIT || state === READ_BITS) {
        await this._gate1.wait(this._mutex);
        state = Atomics.load(this._mem, 0);
      }
      // Acquire a read lock
      Atomics.add(this._mem, 0, 1);
      this._isReader = true;
    } finally {
      // Release internal lock
      await this._mutex.unlock();
    }
  }

  /**
   * Acquires the mutex for shared ownership and executes the provided
   * callback, automatically unlocking afterwards. Blocks until a lock
   * is available.
   *
   * @param callbackfn The callback function.
   *
   * @throws A {@link MutexRelockError} If the mutex is already locked by the caller.
   *
   * @returns A promise resolved to the return value of `callbackfn`.
   */
  async requestShared<T>(callbackfn: () => T | Promise<T>): Promise<T> {
    // Acquire read lock
    await this.lockShared();
    try {
      // Execute callback
      return await callbackfn();
    } finally {
      // Release read lock
      await this.unlockShared();
    }
  }

  /**
   * Attempts to acquire the mutex for shared ownership without blocking.
   *
   * @returns A promise resolved to `true` if the lock was successful, otherwise `false`.
   */
  async tryLockShared(): Promise<boolean> {
    // If already has lock
    if (this._isReader || this._isWriter) {
      return false;
    }

    // Acquire internal lock
    await this._mutex.lock();

    try {
      // Check for active / blocked writers and read capacity
      const state = Atomics.load(this._mem, 0);
      if (state & WRITE_BIT || state === READ_BITS) {
        return false;
      }
      // Acquire a read lock
      Atomics.add(this._mem, 0, 1);
      this._isReader = true;
      // Return success
      return true;
    } finally {
      // Release internal lock
      await this._mutex.unlock();
    }
  }

  /**
   * Releases the mutex if currently owned by the caller.
   *
   * @throws A {@link MutexOwnershipError} If the mutex is not owned by the caller.
   */
  async unlockShared(): Promise<void> {
    // Check if read lock owned
    if (!this._isReader) {
      throw new MutexOwnershipError();
    }

    // Acquire internal lock
    await this._mutex.lock();

    try {
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
        // then notify blocked agents
        this._gate1.notifyAll();
      }
    } finally {
      // Release internal lock
      await this._mutex.unlock();
    }
  }
}
