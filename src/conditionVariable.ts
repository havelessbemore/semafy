import { Mutex } from "./mutex";
import { ATOMICS_NOT_EQUAL } from "./utils/constants";
import { MutexError } from "./utils/mutexError";

const ERR_MEM_VALUE = "Unexpected value in atomic memory";
const ERR_MUTEX_NOT_OWNED = "Mutex must be locked by caller";

/**
 * Represents a condition variable similar to those used in C++.
 *
 * A condition variable manages an atomic wait/block mechanism that
 * is tightly coupled with a mutex for safe cross-agent synchronization.
 *
 * @see {@link https://en.cppreference.com/w/cpp/thread/condition_variable | C++ Condition Variable}
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
  constructor(sharedBuffer: SharedArrayBuffer, byteOffset = 0) {
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
   * @param timeout An optional timeout in milliseconds after which the wait is aborted.
   *
   * @throws {MutexError} If the mutex is not owned by the caller.
   * @throws {RangeError} If the condition variable's shared memory value is not expected.
   */
  async wait(mutex: Mutex, timeout?: number): Promise<void> {
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
  async waitUntil(mutex: Mutex, timestamp: number): Promise<void> {
    return this.wait(mutex, timestamp - performance.now());
  }
}
