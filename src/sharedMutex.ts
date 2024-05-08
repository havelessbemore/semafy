import { ConditionVariable } from "./conditionVariable";
import { Mutex } from "./mutex";

const WRITE_BIT = 1 << 31;
const READ_BITS = ~WRITE_BIT;

/**
 * @privateRemarks
 * Citations:
 * 1. {@link https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2406.html | Alexander Terekhov, Howard Hinnant. (2007-09-09). Mutex, Lock, Condition Variable Rationale}
 */
export class SharedMutex {
  private _gate1: ConditionVariable;
  private _gate2: ConditionVariable;
  private _isReader: boolean;
  private _isWriter: boolean;
  private _mutex: Mutex;
  private _state: Int32Array;

  constructor(sharedBuffer: SharedArrayBuffer, byteOffset = 0) {
    const bInt32 = Int32Array.BYTES_PER_ELEMENT;
    this._mutex = new Mutex(sharedBuffer, byteOffset);
    byteOffset += bInt32;
    this._state = new Int32Array(sharedBuffer, byteOffset, 1);
    byteOffset += bInt32;
    this._gate1 = new ConditionVariable(sharedBuffer, byteOffset);
    byteOffset += bInt32;
    this._gate2 = new ConditionVariable(sharedBuffer, byteOffset);
    this._isReader = false;
    this._isWriter = false;
  }

  // Writer

  async lock(): Promise<void> {
    // If already has write lock
    if (this._isWriter) {
      return;
    }

    // Acquire internal lock
    await this._mutex.lock();
    try {
      // Acquire write lock
      while (Atomics.or(this._state, 0, WRITE_BIT) & WRITE_BIT) {
        await this._gate1.wait(this._mutex);
      }
      this._isWriter = true;

      // Release read lock
      if (this._isReader) {
        Atomics.sub(this._state, 0, 1);
        this._isReader = false;
      }

      // Wait until no readers
      while (Atomics.load(this._state, 0) & READ_BITS) {
        await this._gate2.wait(this._mutex);
      }
    } finally {
      // Release internal lock
      await this._mutex.unlock();
    }
  }

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

  async tryLock(): Promise<boolean> {
    // If already has write lock
    if (this._isWriter) {
      return true;
    }

    // Acquire internal lock
    await this._mutex.lock();

    try {
      // Try to acquire write lock
      const exp = +this._isReader;
      const act = Atomics.compareExchange(this._state, 0, exp, WRITE_BIT);

      // Check if write lock acquired
      if (act !== exp) {
        return false;
      }

      // Update state
      this._isWriter = true;
      this._isReader = false;
    } finally {
      // Release internal lock
      this._mutex.unlock();
    }

    return true;
  }

  async unlock(): Promise<boolean> {
    // Check if owns write lock
    if (!this._isWriter) {
      return false;
    }

    // Acquire internal lock
    await this._mutex.lock();

    try {
      // Release write lock
      Atomics.and(this._state, 0, READ_BITS);
      this._isWriter = false;
    } finally {
      // Release internal lock
      await this._mutex.unlock();
    }

    // Notify agents waiting for write lock
    this._gate1.notifyAll();

    return true;
  }

  // Reader

  async lockShared(): Promise<void> {
    // If already has read lock
    if (this._isReader) {
      return;
    }

    // Acquire internal lock
    await this._mutex.lock();

    try {
      let state = Atomics.load(this._state, 0);
      while (state & WRITE_BIT || state === READ_BITS) {
        await this._gate1.wait(this._mutex);
        state = Atomics.load(this._state, 0);
      }
      Atomics.add(this._state, 0, 1);
      this._isReader = true;
    } finally {
      // Release internal lock
      await this._mutex.unlock();
    }
  }

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

  async tryLockShared(): Promise<boolean> {
    if (this._isReader) {
      return true;
    }
    /*
    try {
      await this._mutex.lock();
      let state = Atomics.load(this._state, 0);
      if (state & WRITE_BIT || state === READ_BITS) {
        return false;
      }
      Atomics.add(this._state, 0, 1);
    } finally {
      await this._mutex.unlock();
    }
    */
    return true;
  }

  async unlockShared(): Promise<boolean> {
    if (!this._isReader) {
      return false;
    }
    /*
    await this._mutex.lock();
    try {
      const state = Atomics.sub(this._state, 0, 1);
      this._isReader = false;
      if (state & WRITE_BIT) {
        if ((state & READ_BITS) === 1) {
          this._gate2.notifyAll();
        }
      } else if (state === READ_BITS) {
        this._gate1.notifyAll();
      }
    } finally {
      await this._mutex.unlock();
    }
    */
    return true;
  }
}
