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

'use strict';

const CV_OK = "ok";
const CV_TIMED_OUT = "timed-out";

const ERR_ARRAY_NOT_SHARED = "Typed array is not backed by a shared array buffer.";
const ERR_TIMEOUT = "Operation timed out.";
const ERR_CV_VALUE = "Unexpected value in shared memory location";
const ERR_MUTEX = "Mutex has encountered an error.";
const ERR_MUTEX_OWNERSHIP = "Operation not permitted. Mutex must be acquired first.";
const ERR_MUTEX_RELOCK = "Attempted relock of already acquired mutex. Deadlock would occur.";
const ERR_MUTEX_TIMEOUT = "Timed out acquiring mutex.";
const ERR_SEM_NEG_COUNT = "Operation not permitted. Cannot release a negative amount from the semaphore.";
const ERR_SEM_OVERFLOW = "Operation not permitted. Releasing the given amount from the semaphore would cause overflow.";

class MutexError extends Error {
  /**
   * Creates a new `MutexError`.
   *
   * @param message - An optional custom error message.
   */
  constructor(message) {
    super(message ?? ERR_MUTEX);
    this.name = this.constructor.name;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

class MutexOwnershipError extends MutexError {
  /**
   * Creates a new `MutexOwnershipError`.
   *
   * @param message - An optional custom error message.
   */
  constructor(message) {
    super(message ?? ERR_MUTEX_OWNERSHIP);
  }
}

class MutexRelockError extends MutexError {
  /**
   * Creates a new `MutexRelockError`.
   *
   * @param message - An optional custom error message.
   */
  constructor(message) {
    super(message ?? ERR_MUTEX_RELOCK);
  }
}

var __defProp$4 = Object.defineProperty;
var __defNormalProp$4 = (obj, key, value) => key in obj ? __defProp$4(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$4 = (obj, key, value) => __defNormalProp$4(obj, typeof key !== "symbol" ? key + "" : key, value);
class TimeoutError extends Error {
  /**
   * Create a new `TimeoutError`.
   *
   * @param message - A custom error message. Defaults to `undefined`.
   * @param timeout - The timeout duration in milliseconds. Defaults to `undefined`.
   * @param deadline - The absolute time in milliseconds. Defaults to `undefined`.
   */
  constructor(message, timeout, deadline) {
    super(message ?? ERR_TIMEOUT);
    /**
     * Absolute time in milliseconds after which the timeout error was thrown.
     * Can be `undefined` if not specified.
     */
    __publicField$4(this, "deadline");
    /**
     * Duration in milliseconds after which the timeout error was thrown.
     * Can be `undefined` if not specified.
     */
    __publicField$4(this, "timeout");
    this.deadline = deadline;
    this.timeout = timeout;
    this.name = TimeoutError.name;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, TimeoutError);
    }
  }
}

const ATOMICS_NOT_EQUAL = "not-equal";
const ATOMICS_TIMED_OUT = "timed-out";

var __defProp$3 = Object.defineProperty;
var __defNormalProp$3 = (obj, key, value) => key in obj ? __defProp$3(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$3 = (obj, key, value) => __defNormalProp$3(obj, key + "" , value);
class ConditionVariable {
  constructor(sb, byteOffset = 0) {
    /**
     * The shared atomic memory where the condition variable stores its state.
     */
    __publicField$3(this, "_mem");
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
    Atomics.store(this._mem, 0, 0);
  }
  /**
   * Gets the underlying shared memory location.
   */
  get handle() {
    return this._mem;
  }
  /**
   * Notify waiting workers that are blocked on this condition variable.
   *
   * @param count - The number of workers to notify.
   *
   * @returns The number of workers that were woken up.
   */
  notify(count) {
    return Atomics.notify(this._mem, 0, count);
  }
  /**
   * Notify all waiting workers that are blocked on this condition variable.
   *
   * @returns The number of workers that were woken up.
   */
  notifyAll() {
    return Atomics.notify(this._mem, 0);
  }
  /**
   * Notify one waiting worker that is blocked on this condition variable.
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
   * @param mutex The {@link Mutex} that must be locked by the current agent.
   *
   * @throws A {@link MutexOwnershipError} If the mutex is not owned by the caller.
   * @throws A {@link RangeError} If the condition variable's internal value is not expected.
   */
  async wait(mutex) {
    await this.waitFor(mutex, Infinity);
  }
  /**
   * Blocks the current worker until this condition variable is notified,
   * or an optional timeout expires. The associated mutex is atomically
   * released before blocking and re-acquired after waking up.
   *
   * @param mutex The mutex that must be locked by the current agent.
   * @param timeout An optional timeout in milliseconds after which the wait is aborted.
   *
   * @throws A {@link MutexOwnershipError} If the mutex is not owned by the caller.
   * @throws A {@link RangeError} If the condition variable's internal value is not expected.
   *
   * @returns A {@link CVStatus} representing the result of the operation.
   */
  async waitFor(mutex, timeout) {
    if (!mutex.ownsLock) {
      throw new MutexOwnershipError();
    }
    try {
      const res = Atomics.waitAsync(this._mem, 0, 0, timeout);
      mutex.unlock();
      const value = res.async ? await res.value : res.value;
      if (value === ATOMICS_NOT_EQUAL) {
        throw new RangeError(ERR_CV_VALUE);
      }
      return value === ATOMICS_TIMED_OUT ? CV_TIMED_OUT : CV_OK;
    } finally {
      await mutex.lock();
    }
  }
  /**
   * Blocks the current agent until this condition variable is notified,
   * or until a specified point in time is reached. This is a convenience
   * method for waiting within a deadline.
   *
   * @param mutex The {@link Mutex} that must be locked by the current agent.
   * @param timestamp The absolute time (in milliseconds) at which to stop waiting.
   *
   * @throws A {@link MutexOwnershipError} If the mutex is not owned by the caller.
   * @throws A {@link RangeError} If the condition variable's internal value is not expected.
   *
   * @returns A {@link CVStatus} representing the result of the operation.
   */
  async waitUntil(mutex, timestamp) {
    return this.waitFor(mutex, timestamp - performance.now());
  }
}

var __defProp$2 = Object.defineProperty;
var __defNormalProp$2 = (obj, key, value) => key in obj ? __defProp$2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$2 = (obj, key, value) => __defNormalProp$2(obj, typeof key !== "symbol" ? key + "" : key, value);
const LOCKED = 1;
const UNLOCKED = 0;
class Mutex {
  constructor(sb, byteOffset = 0) {
    /**
     * Indicates whether the current agent owns the lock.
     */
    __publicField$2(this, "_isOwner");
    /**
     * The shared atomic memory for the mutex.
     */
    __publicField$2(this, "_mem");
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
    Atomics.and(this._mem, 0, 1);
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
   * @throws A {@link MutexRelockError} If the mutex is already locked by the caller.
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
   * @throws A {@link MutexRelockError} If the mutex is already locked by the caller.
   *
   * @returns A promise resolved to the return value of `callbackfn`.
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
   * @throws A {@link MutexRelockError} If the mutex is already locked by the caller.
   * @throws A {@link TimeoutError} If the mutex could not be acquired within the specified time.
   *
   * @returns A promise with the return value from `callbackfn`.
   */
  async requestFor(callbackfn, timeout) {
    if (!await this.tryLockFor(timeout)) {
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
  async requestUntil(callbackfn, timestamp) {
    if (!await this.tryLockUntil(timestamp)) {
      throw new TimeoutError(ERR_MUTEX_TIMEOUT, void 0, timestamp);
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
  tryLock() {
    if (this._isOwner) {
      throw new MutexRelockError();
    }
    return this._isOwner = Atomics.compareExchange(this._mem, 0, UNLOCKED, LOCKED) === UNLOCKED;
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
  async tryLockFor(timeout) {
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
   * @throws A {@link MutexOwnershipError} If the mutex is not owned by the caller.
   */
  unlock() {
    if (!this._isOwner) {
      throw new MutexOwnershipError();
    }
    Atomics.store(this._mem, 0, UNLOCKED);
    this._isOwner = false;
    Atomics.notify(this._mem, 0);
  }
}

var __defProp$1 = Object.defineProperty;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$1 = (obj, key, value) => __defNormalProp$1(obj, typeof key !== "symbol" ? key + "" : key, value);
const _Semaphore = class _Semaphore {
  /**
   * Creates a new instance of a Semaphore.
   *
   * @param sharedBuffer The shared buffer that backs the semaphore.
   * @param byteOffset The byte offset within the shared buffer.
   */
  constructor(sharedBuffer, byteOffset = 0) {
    __publicField$1(this, "_gate");
    __publicField$1(this, "_mem");
    __publicField$1(this, "_mutex");
    const bInt32 = Int32Array.BYTES_PER_ELEMENT;
    sharedBuffer ?? (sharedBuffer = new SharedArrayBuffer(bInt32));
    this._mutex = new Mutex(sharedBuffer, byteOffset);
    byteOffset += bInt32;
    this._mem = new Int32Array(sharedBuffer, byteOffset, 1);
    byteOffset += bInt32;
    this._gate = new ConditionVariable(sharedBuffer, byteOffset);
  }
  /**
   * Acquires the semaphore, blocking until it is available.
   *
   * @returns A promise that resolves when acquisition is successful.
   */
  acquire() {
    return this._mutex.request(async () => {
      while (Atomics.load(this._mem, 0) <= 0) {
        await this._gate.wait(this._mutex);
      }
      Atomics.sub(this._mem, 0, 1);
    });
  }
  /**
   * Attempts to acquire the semaphore.
   *
   * @returns A promise resolving to `true` if successful, otherwise `false`.
   */
  tryAcquire() {
    return this._mutex.request(() => {
      if (Atomics.load(this._mem, 0) <= 0) {
        return false;
      }
      Atomics.sub(this._mem, 0, 1);
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
  tryAcquireFor(timeout) {
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
  async tryAcquireUntil(timestamp) {
    if (!await this._mutex.tryLockUntil(timestamp)) {
      return false;
    }
    try {
      while (Atomics.load(this._mem, 0) <= 0) {
        const status = await this._gate.waitUntil(this._mutex, timestamp);
        if (status === CV_TIMED_OUT) {
          return false;
        }
      }
      Atomics.sub(this._mem, 0, 1);
      return true;
    } finally {
      this._mutex.unlock();
    }
  }
  /**
   * Releases a specified number of units back to the semaphore.
   *
   * @param count The number of units to release. Defaults to 1.
   *
   * @throws {RangeError} If `count` is negative or would cause the semaphore to overflow.
   */
  release(count = 1) {
    if (count < 0) {
      throw new RangeError(ERR_SEM_NEG_COUNT);
    }
    return this._mutex.request(() => {
      const state = Atomics.load(this._mem, 0);
      if (count > _Semaphore.MAX - state) {
        throw new RangeError(ERR_SEM_OVERFLOW);
      }
      Atomics.add(this._mem, 0, count);
      this._gate.notifyAll();
    });
  }
};
/**
 * The maximum possible value of the internal counter
 */
__publicField$1(_Semaphore, "MAX", ~(1 << 31));
let Semaphore = _Semaphore;

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
  // Exclusive
  /**
   * Acquires the mutex, blocking until the lock is available.
   *
   * @throws A {@link MutexRelockError} If the mutex is already locked by the caller.
   */
  async lock() {
    if (this._isWriter || this._isReader) {
      throw new MutexRelockError();
    }
    await this._mutex.lock();
    try {
      while (Atomics.or(this._state, 0, WRITE_BIT) & WRITE_BIT) {
        await this._gate1.wait(this._mutex);
      }
      this._isWriter = true;
      while (Atomics.load(this._state, 0) & READ_BITS) {
        await this._gate2.wait(this._mutex);
      }
    } finally {
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
  async request(callbackfn) {
    await this.lock();
    try {
      return await callbackfn();
    } finally {
      await this.unlock();
    }
  }
  /**
   * Attempts to acquire the mutex without blocking.
   *
   * @throws A {@link MutexRelockError} If the mutex is already locked by the caller.
   *
   * @returns A promise resolved to `true` if the lock was successful, otherwise `false`.
   */
  async tryLock() {
    if (this._isWriter || this._isReader) {
      throw new MutexRelockError();
    }
    await this._mutex.lock();
    try {
      return this._isWriter = Atomics.compareExchange(this._state, 0, 0, WRITE_BIT) === 0;
    } finally {
      this._mutex.unlock();
    }
  }
  /**
   * Releases the mutex if currently owned by the caller.
   *
   * @throws A {@link MutexOwnershipError} If the mutex is not owned by the caller.
   */
  async unlock() {
    if (!this._isWriter) {
      throw new MutexOwnershipError();
    }
    await this._mutex.lock();
    try {
      Atomics.and(this._state, 0, READ_BITS);
      this._isWriter = false;
    } finally {
      await this._mutex.unlock();
    }
    this._gate1.notifyAll();
  }
  // Shared
  /**
   * Acquires the mutex for shared ownership, blocking until a lock is available.
   *
   * @throws A {@link MutexRelockError} If the mutex is already locked by the caller.
   */
  async lockShared() {
    if (this._isReader || this._isWriter) {
      throw new MutexRelockError();
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
  async requestShared(callbackfn) {
    await this.lockShared();
    try {
      return await callbackfn();
    } finally {
      await this.unlockShared();
    }
  }
  /**
   * Attempts to acquire the mutex for shared ownership without blocking.
   *
   * @throws A {@link MutexRelockError} If the mutex is already locked by the caller.
   *
   * @returns A promise resolved to `true` if the lock was successful, otherwise `false`.
   */
  async tryLockShared() {
    if (this._isReader || this._isWriter) {
      throw new MutexRelockError();
    }
    await this._mutex.lock();
    try {
      const state = Atomics.load(this._state, 0);
      if (state & WRITE_BIT || state === READ_BITS) {
        return false;
      }
      Atomics.add(this._state, 0, 1);
      this._isReader = true;
      return true;
    } finally {
      await this._mutex.unlock();
    }
  }
  /**
   * Releases the mutex if currently owned by the caller.
   *
   * @throws A {@link MutexOwnershipError} If the mutex is not owned by the caller.
   */
  async unlockShared() {
    if (!this._isReader) {
      throw new MutexOwnershipError();
    }
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
  }
}

exports.CV_OK = CV_OK;
exports.CV_TIMED_OUT = CV_TIMED_OUT;
exports.ConditionVariable = ConditionVariable;
exports.Mutex = Mutex;
exports.MutexError = MutexError;
exports.MutexOwnershipError = MutexOwnershipError;
exports.MutexRelockError = MutexRelockError;
exports.Semaphore = Semaphore;
exports.SharedMutex = SharedMutex;
exports.TimeoutError = TimeoutError;
//# sourceMappingURL=semafy.cjs.map
