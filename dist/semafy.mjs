/*!
 * semafy
 * https://github.com/havelessbemore/semafy
 *
 * MIT License
 *
 * Copyright (C) 2024-2024 Michael Rojas <dev.michael.rojas@gmail.com> (https://github.com/havelessbemore)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

const ATOMICS_NOT_EQUAL = "not-equal";
const ATOMICS_TIMED_OUT = "timed-out";

class MutexError extends Error {
  /**
   * Creates a new `MutexError`.
   *
   * @param message - A custom error message. Defaults to `undefined`.
   */
  constructor(message) {
    super(message);
    this.name = MutexError.name;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, MutexError);
    }
  }
}

var __defProp$3 = Object.defineProperty;
var __defNormalProp$3 = (obj, key, value) => key in obj ? __defProp$3(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$3 = (obj, key, value) => __defNormalProp$3(obj, key + "" , value);
const ERR_MEM_VALUE = "Unexpected value in atomic memory";
const ERR_MUTEX_NOT_OWNED = "Mutex must be locked by caller";
class ConditionVariable {
  /**
   * Creates a new instance of ConditionVariable.
   *
   * @param sharedBuffer The shared buffer that backs the condition variable.
   * @param byteOffset The byte offset within the shared buffer.
   *
   * Note: The value at the shared memory location should not be
   * modified outside of this condition variable.
   */
  constructor(sharedBuffer, byteOffset = 0) {
    /**
     * The shared atomic memory where the condition variable stores its state.
     */
    __publicField$3(this, "_mem");
    this._mem = new Int32Array(sharedBuffer, byteOffset, 1);
    Atomics.store(this._mem, 0, 0);
  }
  /**
   * Gets the underlying atomic handle.
   */
  get handle() {
    return this._mem;
  }
  /**
   * Wakes up all waiting workers that are blocked on this condition variable.
   *
   * @returns The number of workers that were woken up.
   */
  notifyAll() {
    return Atomics.notify(this._mem, 0);
  }
  /**
   * Wakes up one waiting worker that is blocked on this condition variable.
   *
   * @returns The number of workers that were woken up.
   */
  notifyOne() {
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
  async wait(mutex, timeout) {
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
  async waitUntil(mutex, timestamp) {
    return this.wait(mutex, timestamp - performance.now());
  }
}

var __defProp$2 = Object.defineProperty;
var __defNormalProp$2 = (obj, key, value) => key in obj ? __defProp$2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$2 = (obj, key, value) => __defNormalProp$2(obj, typeof key !== "symbol" ? key + "" : key, value);
class TimeoutError extends Error {
  /**
   * Create a new `TimeoutError`.
   *
   * @param message - A custom error message. Defaults to `undefined`.
   * @param timeout - The timeout duration in milliseconds. Defaults to `undefined`.
   * @param timeout - The absolute time in milliseconds. Defaults to `undefined`.
   */
  constructor(message, timeout, timestamp) {
    super(message);
    /**
     * Duration in milliseconds after which the timeout error was thrown.
     * Can be `undefined` if not specified.
     */
    __publicField$2(this, "timeout");
    /**
     * Absolute time in milliseconds after which the timeout error was thrown.
     * Can be `undefined` if not specified.
     */
    __publicField$2(this, "timestamp");
    this.timeout = timeout;
    this.timestamp = timestamp;
    this.name = TimeoutError.name;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, TimeoutError);
    }
  }
}

var __defProp$1 = Object.defineProperty;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$1 = (obj, key, value) => __defNormalProp$1(obj, typeof key !== "symbol" ? key + "" : key, value);
const ERR_RELOCK = "Attempted relock of owned mutex. Deadlock would occur.";
const ERR_TIMEOUT = "Could not acquire mutex. Operation timed out.";
const ERR_UNLOCK_UNOWNED = "Attempted unlock of unowned mutex. Operation not permitted.";
const LOCKED = 1;
const UNLOCKED = 0;
class Mutex {
  /**
   * Creates a new instance of Mutex.
   *
   * @param sharedBuffer The shared buffer that backs the mutex.
   * @param byteOffset The byte offset within the shared buffer.
   *
   * Note: The value at the shared memory location should be
   * initialized to zero, and should not be modified outside of this mutex.
   */
  constructor(sharedBuffer, byteOffset) {
    /**
     * Indicates whether the current agent owns the lock.
     */
    __publicField$1(this, "_isOwner");
    /**
     * The shared atomic memory for the mutex.
     */
    __publicField$1(this, "_mem");
    this._isOwner = false;
    this._mem = new Int32Array(sharedBuffer, byteOffset, 1);
  }
  /**
   * Gets the underlying atomic handle.
   */
  get handle() {
    return this._mem;
  }
  /**
   * Indicates whether the current agent owns the lock.
   */
  get ownsLock() {
    return this._isOwner;
  }
  /**
   * Acquires the mutex, blocking until the lock is available.
   *
   * @throws {MutexError} If the mutex is already owned by the caller.
   */
  async lock() {
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
   * @throws {MutexError} If the mutex is already owned by the caller.
   *
   * @returns A promise with the return value from `callbackfn`.
   */
  async request(callbackfn) {
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
   * @throws {MutexError} If the mutex is already owned by the caller.
   * @throws {TimeoutError} If the mutex could not be acquired within the specified time.
   *
   * @returns A promise with the return value from `callbackfn`.
   */
  async requestFor(callbackfn, timeout) {
    if (!await this.tryLockFor(timeout)) {
      throw new TimeoutError(ERR_TIMEOUT, timeout);
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
   * @throws {MutexError} If the mutex is already owned by the caller.
   * @throws {TimeoutError} If the mutex could not be acquired within the specified time.
   *
   * @returns A promise with the return value from `callbackfn`.
   */
  async requestUntil(callbackfn, timestamp) {
    if (!await this.tryLockUntil(timestamp)) {
      throw new TimeoutError(ERR_TIMEOUT);
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
   * @throws {MutexError} If the mutex is already owned by the caller.
   *
   * @returns `true` if the lock was successful, otherwise `false`.
   */
  tryLock() {
    if (this._isOwner) {
      throw new MutexError(ERR_RELOCK);
    }
    return this._isOwner = Atomics.compareExchange(this._mem, 0, UNLOCKED, LOCKED) === UNLOCKED;
  }
  /**
   * Attempts to acquire the lock, blocking until either
   * the lock is acquired or the specified timeout elapses.
   *
   * @param timeout The timeout in milliseconds.
   *
   * @throws {MutexError} If the mutex is already owned by the caller.
   *
   * @returns A promise resolved to `true` if the lock was succesful, otherwise `false`
   */
  async tryLockFor(timeout) {
    return this.tryLockUntil(performance.now() + timeout);
  }
  /**
   * Attempts to acquire the lock, blocking until either
   * the lock is acquired or the specified point in time is reached.
   *
   * @param timestamp The absolute time in milliseconds.
   *
   * @throws {MutexError} If the mutex is already owned by the caller.
   *
   * @returns A promise resolved to `true` if the lock was succesful, otherwise `false`
   */
  async tryLockUntil(timestamp) {
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
   * @throws {MutexError} If the mutex is not owned by the caller.
   */
  unlock() {
    if (!this._isOwner) {
      throw new MutexError(ERR_UNLOCK_UNOWNED);
    }
    Atomics.store(this._mem, 0, UNLOCKED);
    this._isOwner = false;
    Atomics.notify(this._mem, 0);
  }
}

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
const WRITE_BIT = 1 << 31;
const READ_BITS = ~WRITE_BIT;
class SharedMutex {
  constructor(sharedBuffer, byteOffset = 0) {
    __publicField(this, "_gate1");
    __publicField(this, "_gate2");
    __publicField(this, "_isReader");
    __publicField(this, "_isWriter");
    __publicField(this, "_mutex");
    __publicField(this, "_state");
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
  async lock() {
    if (this._isWriter) {
      return;
    }
    await this._mutex.lock();
    try {
      while (Atomics.or(this._state, 0, WRITE_BIT) & WRITE_BIT) {
        await this._gate1.wait(this._mutex);
      }
      this._isWriter = true;
      if (this._isReader) {
        Atomics.sub(this._state, 0, 1);
        this._isReader = false;
      }
      while (Atomics.load(this._state, 0) & READ_BITS) {
        await this._gate2.wait(this._mutex);
      }
    } finally {
      await this._mutex.unlock();
    }
  }
  async request(callbackfn) {
    await this.lock();
    try {
      return await callbackfn();
    } finally {
      await this.unlock();
    }
  }
  async tryLock() {
    if (this._isWriter) {
      return true;
    }
    await this._mutex.lock();
    try {
      const exp = +this._isReader;
      const act = Atomics.compareExchange(this._state, 0, exp, WRITE_BIT);
      if (act !== exp) {
        return false;
      }
      this._isWriter = true;
      this._isReader = false;
    } finally {
      this._mutex.unlock();
    }
    return true;
  }
  async unlock() {
    if (!this._isWriter) {
      return false;
    }
    await this._mutex.lock();
    try {
      Atomics.and(this._state, 0, READ_BITS);
      this._isWriter = false;
    } finally {
      await this._mutex.unlock();
    }
    this._gate1.notifyAll();
    return true;
  }
  // Reader
  async lockShared() {
    if (this._isReader) {
      return;
    }
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
      await this._mutex.unlock();
    }
  }
  async requestShared(callbackfn) {
    await this.lockShared();
    try {
      return await callbackfn();
    } finally {
      await this.unlockShared();
    }
  }
  async tryLockShared() {
    if (this._isReader) {
      return true;
    }
    return true;
  }
  async unlockShared() {
    if (!this._isReader) {
      return false;
    }
    return true;
  }
}

export { ConditionVariable, Mutex, SharedMutex, TimeoutError };
//# sourceMappingURL=semafy.mjs.map
