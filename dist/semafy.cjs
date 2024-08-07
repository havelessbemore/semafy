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

const ERR_TIMEOUT = "Operation timed out";
const ERR_NEGATIVE_VALUE = "Value cannot be negative";
const ERR_OVERFLOW = "Cannot exceed maximum value";
const ERR_LATCH_INPUT_UNDERFLOW = "Operation not permitted. Latch decrement cannot be negative";
const ERR_LATCH_INPUT_OVERFLOW = "Operation not permitted. Latch decrement cannot exceed current count";
const ERR_CV_VALUE = "Unexpected value in shared memory location";
const ERR_LOCK = "A lock has encountered an error";
const ERR_LOCK_OWNERSHIP = "Operation not permitted. Lock must be acquired first";
const ERR_LOCK_RELOCK = "Attempted relock of already acquired lock. Deadlock would occur";
const ERR_REC_MUTEX_OVERFLOW = "Operation not permitted. Additional lock would exceed the maximum levels of ownership";
const ERR_MULTI_LOCK = "Failed to acquire all locks";
const ERR_MULTI_UNLOCK = "Failed to unlock all locks";
const ERR_SEM_INPUT_NEG = "Operation not permitted. Semaphore release value cannot be negative";
const ERR_SEM_INPUT_OVERFLOW = "Operation not permitted. Semaphore release would cause overflow";

class LockError extends Error {
  /**
   * @param message - An optional custom error message.
   */
  constructor(message) {
    super(message ?? ERR_LOCK);
    this.name = this.constructor.name;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

class MultiLockError extends LockError {
  /**
   * @param locks - The array of all lockable objects that were part of the operation.
   * @param numLocked - The number of locks successfully updated before failure.
   * @param lockErrors - An array of [index, error] pairs that contain the index of the lock in
   * the `locks` array and the error that occurred while attempting to lock it. Useful for
   * understanding why lock acquisition failed.
   * @param unlockErrors - An array of [index, error] pairs that contain the index of the lock in
   * the `locks` array and the error that occurred while attempting rollback. Useful for
   * debugging unexpected issues during unlocking.
   * @param message - An optional custom error message that describes the error.
   */
  constructor(locks, numLocked, lockErrors = [], unlockErrors = [], message) {
    super(message ?? ERR_MULTI_LOCK);
    this.locks = locks;
    this.numLocked = numLocked;
    this.lockErrors = lockErrors;
    this.unlockErrors = unlockErrors;
  }
}

class MultiUnlockError extends LockError {
  /**
   * @param locks - The array of all lockable objects that were part of the operation.
   * @param numUnlocked - The number of unlocks successfully updated before failure.
   * @param unlockErrors - An array of [index, error] pairs that contain the index of the lock in
   * the `locks` array and the error that occurred while attempting to unlock it. Useful for
   * debugging unexpected issues during unlocking.
   * @param message - An optional custom error message that describes the error.
   */
  constructor(locks, numUnlocked, unlockErrors = [], message) {
    super(message ?? ERR_MULTI_UNLOCK);
    this.locks = locks;
    this.numUnlocked = numUnlocked;
    this.unlockErrors = unlockErrors;
  }
}

class OwnershipError extends LockError {
  /**
   * @param message - An optional custom error message.
   */
  constructor(message) {
    super(message ?? ERR_LOCK_OWNERSHIP);
  }
}

class RelockError extends LockError {
  /**
   * @param message - An optional custom error message.
   */
  constructor(message) {
    super(message ?? ERR_LOCK_RELOCK);
  }
}

var __defProp$a = Object.defineProperty;
var __defNormalProp$a = (obj, key, value) => key in obj ? __defProp$a(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$a = (obj, key, value) => __defNormalProp$a(obj, typeof key !== "symbol" ? key + "" : key, value);
class TimeoutError extends Error {
  /**
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
    __publicField$a(this, "deadline");
    /**
     * Duration in milliseconds after which the timeout error was thrown.
     * Can be `undefined` if not specified.
     */
    __publicField$a(this, "timeout");
    this.deadline = deadline;
    this.timeout = timeout;
    this.name = TimeoutError.name;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, TimeoutError);
    }
  }
}

var __defProp$9 = Object.defineProperty;
var __defNormalProp$9 = (obj, key, value) => key in obj ? __defProp$9(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$9 = (obj, key, value) => __defNormalProp$9(obj, typeof key !== "symbol" ? key + "" : key, value);
const LOCK_BIT$1 = 1;
const _Mutex = class _Mutex {
  constructor(sharedBuffer, byteOffset = 0) {
    /**
     * Indicates whether the current agent owns the lock.
     */
    __publicField$9(this, "_isOwner");
    /**
     * The shared memory for the mutex.
     */
    __publicField$9(this, "_mem");
    sharedBuffer ?? (sharedBuffer = new SharedArrayBuffer(_Mutex.ByteLength));
    this._isOwner = false;
    this._mem = new Int32Array(sharedBuffer, byteOffset, 1);
    Atomics.and(this._mem, 0, LOCK_BIT$1);
  }
  get buffer() {
    return this._mem.buffer;
  }
  get byteLength() {
    return this._mem.byteLength;
  }
  get byteOffset() {
    return this._mem.byteOffset;
  }
  get ownsLock() {
    return this._isOwner;
  }
  /**
   * @throws A {@link RelockError} If the lock is already locked by the caller.
   */
  async lock() {
    if (this._isOwner) {
      throw new RelockError();
    }
    while (Atomics.or(this._mem, 0, LOCK_BIT$1)) {
      const res = Atomics.waitAsync(this._mem, 0, LOCK_BIT$1);
      if (res.async) {
        await res.value;
      }
    }
    this._isOwner = true;
  }
  /**
   * @throws A {@link RelockError} If the lock is already locked by the caller.
   */
  lockSync() {
    if (this._isOwner) {
      throw new RelockError();
    }
    while (Atomics.or(this._mem, 0, LOCK_BIT$1)) {
      Atomics.wait(this._mem, 0, LOCK_BIT$1);
    }
    this._isOwner = true;
  }
  tryLock() {
    return this.tryLockSync();
  }
  tryLockSync() {
    if (this._isOwner) {
      return false;
    }
    return this._isOwner = Atomics.or(this._mem, 0, LOCK_BIT$1) === 0;
  }
  /**
   * @throws An {@link OwnershipError} If the mutex is not owned by the caller.
   */
  unlock() {
    return this.unlockSync();
  }
  /**
   * @throws An {@link OwnershipError} If the mutex is not owned by the caller.
   */
  unlockSync() {
    if (!this._isOwner) {
      throw new OwnershipError();
    }
    Atomics.store(this._mem, 0, 0);
    this._isOwner = false;
    Atomics.notify(this._mem, 0);
  }
};
/**
 * The size in bytes of the mutex.
 */
__publicField$9(_Mutex, "ByteLength", Int32Array.BYTES_PER_ELEMENT);
let Mutex = _Mutex;

const MAX_INT32_VALUE = 2147483647;

var __defProp$8 = Object.defineProperty;
var __defNormalProp$8 = (obj, key, value) => key in obj ? __defProp$8(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$8 = (obj, key, value) => __defNormalProp$8(obj, typeof key !== "symbol" ? key + "" : key, value);
const LOCK_BIT = 1;
const _RecursiveMutex = class _RecursiveMutex {
  constructor(sharedBuffer, byteOffset = 0) {
    /**
     * The number of locks acquired by the agent.
     */
    __publicField$8(this, "_depth");
    /**
     * The shared atomic memory for the mutex.
     */
    __publicField$8(this, "_mem");
    sharedBuffer ?? (sharedBuffer = new SharedArrayBuffer(_RecursiveMutex.ByteLength));
    this._depth = 0;
    this._mem = new Int32Array(sharedBuffer, byteOffset, 1);
    Atomics.and(this._mem, 0, LOCK_BIT);
  }
  get buffer() {
    return this._mem.buffer;
  }
  get byteLength() {
    return this._mem.byteLength;
  }
  get byteOffset() {
    return this._mem.byteOffset;
  }
  get ownsLock() {
    return this._depth > 0;
  }
  /**
   * @throws A {@link RangeError} If the mutex is already locked the maximum amount of times.
   */
  async lock() {
    if (this._depth === _RecursiveMutex.Max) {
      throw new RangeError(ERR_REC_MUTEX_OVERFLOW);
    }
    if (this._depth === 0) {
      while (Atomics.or(this._mem, 0, LOCK_BIT)) {
        await Atomics.waitAsync(this._mem, 0, LOCK_BIT).value;
      }
    }
    ++this._depth;
  }
  /**
   * @throws A {@link RangeError} If the mutex is already locked the maximum amount of times.
   */
  lockSync() {
    if (this._depth === _RecursiveMutex.Max) {
      throw new RangeError(ERR_REC_MUTEX_OVERFLOW);
    }
    if (this._depth === 0) {
      while (Atomics.or(this._mem, 0, LOCK_BIT)) {
        Atomics.wait(this._mem, 0, LOCK_BIT);
      }
    }
    ++this._depth;
  }
  tryLock() {
    return this.tryLockSync();
  }
  tryLockSync() {
    if (this._depth === _RecursiveMutex.Max) {
      return false;
    }
    if (this._depth === 0 && Atomics.or(this._mem, 0, LOCK_BIT)) {
      return false;
    }
    ++this._depth;
    return true;
  }
  /**
   * @throws A {@link OwnershipError} If the mutex is not owned by the caller.
   */
  unlock() {
    return this.unlockSync();
  }
  /**
   * @throws A {@link OwnershipError} If the mutex is not owned by the caller.
   */
  unlockSync() {
    if (this._depth <= 0) {
      throw new OwnershipError();
    }
    if (this._depth > 1) {
      --this._depth;
      return;
    }
    Atomics.store(this._mem, 0, 0);
    this._depth = 0;
    Atomics.notify(this._mem, 0);
  }
};
/**
 * The size in bytes of the mutex.
 */
__publicField$8(_RecursiveMutex, "ByteLength", Int32Array.BYTES_PER_ELEMENT);
/**
 * The maximum levels of recursive ownership.
 */
__publicField$8(_RecursiveMutex, "Max", MAX_INT32_VALUE);
let RecursiveMutex = _RecursiveMutex;

const ATOMICS_NOT_EQUAL = "not-equal";
const ATOMICS_TIMED_OUT = "timed-out";

class RecursiveTimedMutex extends RecursiveMutex {
  async tryLockFor(timeout) {
    return this.tryLockUntil(performance.now() + timeout);
  }
  tryLockForSync(timeout) {
    return this.tryLockUntilSync(performance.now() + timeout);
  }
  async tryLockUntil(timestamp) {
    if (this._depth === RecursiveTimedMutex.Max) {
      return false;
    }
    if (this._depth === 0) {
      while (Atomics.or(this._mem, 0, LOCK_BIT)) {
        const timeout = timestamp - performance.now();
        const res = Atomics.waitAsync(this._mem, 0, LOCK_BIT, timeout);
        const value = res.async ? await res.value : res.value;
        if (value === ATOMICS_TIMED_OUT) {
          return false;
        }
      }
    }
    ++this._depth;
    return true;
  }
  tryLockUntilSync(timestamp) {
    if (this._depth === RecursiveTimedMutex.Max) {
      return false;
    }
    if (this._depth === 0) {
      while (Atomics.or(this._mem, 0, LOCK_BIT)) {
        const timeout = timestamp - performance.now();
        const value = Atomics.wait(this._mem, 0, LOCK_BIT, timeout);
        if (value === ATOMICS_TIMED_OUT) {
          return false;
        }
      }
    }
    ++this._depth;
    return true;
  }
}

async function lockGuard(mutex, callbackfn) {
  await mutex.lock();
  try {
    return await callbackfn();
  } finally {
    await mutex.unlock();
  }
}
function lockGuardSync(mutex, callbackfn) {
  mutex.lockSync();
  try {
    return callbackfn();
  } finally {
    mutex.unlockSync();
  }
}

var __defProp$7 = Object.defineProperty;
var __defNormalProp$7 = (obj, key, value) => key in obj ? __defProp$7(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$7 = (obj, key, value) => __defNormalProp$7(obj, typeof key !== "symbol" ? key + "" : key, value);
const _ConditionVariable = class _ConditionVariable {
  constructor(sharedBuffer, byteOffset = 0) {
    /**
     * The shared atomic memory where the condition variable stores its state.
     */
    __publicField$7(this, "_mem");
    sharedBuffer ?? (sharedBuffer = new SharedArrayBuffer(_ConditionVariable.ByteLength));
    this._mem = new Int32Array(sharedBuffer, byteOffset, 1);
    Atomics.store(this._mem, 0, 0);
  }
  get buffer() {
    return this._mem.buffer;
  }
  get byteLength() {
    return this._mem.byteLength;
  }
  get byteOffset() {
    return this._mem.byteOffset;
  }
  /**
   * Notify waiting agents that are blocked on this condition variable.
   *
   * @param count - The number of agents to notify.
   *
   * @returns The number of agents that were notified.
   */
  notify(count) {
    return Atomics.notify(this._mem, 0, count);
  }
  /**
   * Notify all waiting agents that are blocked on this condition variable.
   *
   * @returns The number of agents that were notified.
   */
  notifyAll() {
    return Atomics.notify(this._mem, 0);
  }
  /**
   * Notify one waiting agent that is blocked on this condition variable.
   *
   * @returns The number of agents that were notified.
   */
  notifyOne() {
    return Atomics.notify(this._mem, 0, 1);
  }
  /**
   * Blocks the current agent until this condition variable is notified.
   * The associated mutex is released before blocking and re-acquired
   * after waking up.
   *
   * @param mutex The mutex that must be locked by the current agent.
   *
   * @throws An {@link OwnershipError} If the mutex is not owned by the caller.
   * @throws A {@link RangeError} If the shared memory data is unexpected.
   */
  async wait(mutex) {
    await this.waitFor(mutex, Infinity);
  }
  /**
   * Blocks the current agent until this condition variable is notified,
   * or an optional timeout expires. The associated mutex is released
   * before blocking and re-acquired after waking up.
   *
   * @param mutex The mutex that must be locked by the current agent.
   * @param timeout A timeout in milliseconds after which the wait is aborted.
   *
   * @throws An {@link OwnershipError} If the mutex is not owned by the caller.
   * @throws A {@link RangeError} If the shared memory data is unexpected.
   *
   * @returns A {@link CVStatus} representing the result of the operation.
   */
  async waitFor(mutex, timeout) {
    if (!mutex.ownsLock) {
      throw new OwnershipError();
    }
    try {
      const res = Atomics.waitAsync(this._mem, 0, 0, timeout);
      await mutex.unlock();
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
   * or until a specified point in time is reached. The associated mutex
   * is released before blocking and re-acquired after waking up.
   *
   * @param mutex The mutex that must be locked by the current agent.
   * @param timestamp The absolute time in milliseconds at which the wait is aborted.
   *
   * @throws A {@link OwnershipError} If the mutex is not owned by the caller.
   * @throws A {@link RangeError} If the shared memory data is unexpected.
   *
   * @returns A {@link CVStatus} representing the result of the operation.
   */
  async waitUntil(mutex, timestamp) {
    return this.waitFor(mutex, timestamp - performance.now());
  }
};
/**
 * The size in bytes of the condition variable.
 */
__publicField$7(_ConditionVariable, "ByteLength", Int32Array.BYTES_PER_ELEMENT);
let ConditionVariable = _ConditionVariable;

class TimedMutex extends Mutex {
  async tryLockFor(timeout) {
    return this.tryLockUntil(performance.now() + timeout);
  }
  tryLockForSync(timeout) {
    return this.tryLockUntilSync(performance.now() + timeout);
  }
  async tryLockUntil(timestamp) {
    if (this._isOwner) {
      return false;
    }
    while (Atomics.or(this._mem, 0, LOCK_BIT$1)) {
      const timeout = timestamp - performance.now();
      const res = Atomics.waitAsync(this._mem, 0, LOCK_BIT$1, timeout);
      const value = res.async ? await res.value : res.value;
      if (value === ATOMICS_TIMED_OUT) {
        return false;
      }
    }
    return this._isOwner = true;
  }
  tryLockUntilSync(timestamp) {
    if (this._isOwner) {
      return false;
    }
    while (Atomics.or(this._mem, 0, LOCK_BIT$1)) {
      const timeout = timestamp - performance.now();
      const value = Atomics.wait(this._mem, 0, LOCK_BIT$1, timeout);
      if (value === ATOMICS_TIMED_OUT) {
        return false;
      }
    }
    return this._isOwner = true;
  }
}

var __defProp$6 = Object.defineProperty;
var __defNormalProp$6 = (obj, key, value) => key in obj ? __defProp$6(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$6 = (obj, key, value) => __defNormalProp$6(obj, typeof key !== "symbol" ? key + "" : key, value);
const WRITE_BIT = 1 << 31;
const READ_BITS = ~WRITE_BIT;
const _SharedMutex = class _SharedMutex {
  constructor(sharedBuffer, byteOffset = 0) {
    __publicField$6(this, "_gate1");
    __publicField$6(this, "_gate2");
    __publicField$6(this, "_isReader");
    __publicField$6(this, "_isWriter");
    __publicField$6(this, "_mem");
    __publicField$6(this, "_mutex");
    const bInt32 = Int32Array.BYTES_PER_ELEMENT;
    sharedBuffer ?? (sharedBuffer = new SharedArrayBuffer(_SharedMutex.ByteLength));
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
  get buffer() {
    return this._mem.buffer;
  }
  get byteLength() {
    return this._mem.byteLength;
  }
  get byteOffset() {
    return this._mem.byteOffset;
  }
  get ownsLock() {
    return this._isWriter;
  }
  get ownsSharedLock() {
    return this._isReader;
  }
  // Exclusive
  /**
   * @throws A {@link RelockError} If the mutex is already locked by the caller.
   */
  async lock() {
    if (this._isWriter || this._isReader) {
      throw new RelockError();
    }
    await lockGuard(this._mutex, async () => {
      while (Atomics.or(this._mem, 0, WRITE_BIT) & WRITE_BIT) {
        await this._gate1.wait(this._mutex);
      }
      this._isWriter = true;
      while (Atomics.load(this._mem, 0) & READ_BITS) {
        await this._gate2.wait(this._mutex);
      }
    });
  }
  tryLock() {
    if (this._isWriter || this._isReader) {
      return false;
    }
    if (this._mutex.tryLock()) {
      try {
        this._isWriter = Atomics.compareExchange(this._mem, 0, 0, WRITE_BIT) === 0;
      } finally {
        this._mutex.unlock();
      }
    }
    return this._isWriter;
  }
  /**
   * @throws A {@link OwnershipError} If the mutex is not owned by the caller.
   */
  async unlock() {
    if (!this._isWriter) {
      throw new OwnershipError();
    }
    await lockGuard(this._mutex, () => {
      Atomics.and(this._mem, 0, READ_BITS);
      this._isWriter = false;
    });
    this._gate1.notifyAll();
  }
  // Shared
  /**
   * @throws A {@link RelockError} If the lock is already locked by the caller.
   */
  async lockShared() {
    if (this._isReader || this._isWriter) {
      throw new RelockError();
    }
    await lockGuard(this._mutex, async () => {
      let state = Atomics.load(this._mem, 0);
      while (state & WRITE_BIT || (state & READ_BITS) === READ_BITS) {
        await this._gate1.wait(this._mutex);
        state = Atomics.load(this._mem, 0);
      }
      Atomics.add(this._mem, 0, 1);
      this._isReader = true;
    });
  }
  tryLockShared() {
    if (this._isReader || this._isWriter) {
      return false;
    }
    if (this._mutex.tryLock()) {
      try {
        const state = Atomics.load(this._mem, 0);
        if (state & WRITE_BIT || (state & READ_BITS) === READ_BITS) {
          return false;
        }
        this._isReader = Atomics.compareExchange(this._mem, 0, state, state + 1) === state;
      } finally {
        this._mutex.unlock();
      }
    }
    return this._isReader;
  }
  /**
   * @throws An {@link OwnershipError} If the mutex is not owned by the caller.
   */
  async unlockShared() {
    if (!this._isReader) {
      throw new OwnershipError();
    }
    await lockGuard(this._mutex, () => {
      const state = Atomics.sub(this._mem, 0, 1);
      this._isReader = false;
      if (state & WRITE_BIT) {
        if ((state & READ_BITS) === 1) {
          this._gate2.notifyAll();
        }
      } else if (state === READ_BITS) {
        this._gate1.notifyAll();
      }
    });
  }
};
/**
 * The size in bytes of the mutex.
 */
__publicField$6(_SharedMutex, "ByteLength", 4 * Int32Array.BYTES_PER_ELEMENT);
let SharedMutex = _SharedMutex;

class SharedTimedMutex extends SharedMutex {
  async tryLockFor(timeout) {
    return this.tryLockUntil(performance.now() + timeout);
  }
  async tryLockUntil(timestamp) {
    if (this._isWriter || this._isReader) {
      return false;
    }
    if (!await this._mutex.tryLockUntil(timestamp)) {
      return false;
    }
    let notify = false;
    try {
      while (Atomics.or(this._mem, 0, WRITE_BIT) & WRITE_BIT) {
        const res = await this._gate1.waitUntil(this._mutex, timestamp);
        if (res === CV_TIMED_OUT) {
          return false;
        }
      }
      this._isWriter = true;
      while (Atomics.load(this._mem, 0) & READ_BITS) {
        const res = await this._gate2.waitUntil(this._mutex, timestamp);
        if (res === CV_TIMED_OUT) {
          notify = true;
          Atomics.and(this._mem, 0, READ_BITS);
          this._isWriter = false;
          return false;
        }
      }
      return true;
    } finally {
      await this._mutex.unlock();
      if (notify) {
        this._gate1.notifyAll();
      }
    }
  }
  async tryLockSharedFor(timeout) {
    return this.tryLockSharedUntil(performance.now() + timeout);
  }
  async tryLockSharedUntil(timestamp) {
    if (this._isReader || this._isWriter) {
      return false;
    }
    if (!await this._mutex.tryLockUntil(timestamp)) {
      return false;
    }
    try {
      let state = Atomics.load(this._mem, 0);
      while (state & WRITE_BIT || state === READ_BITS) {
        const res = await this._gate1.waitUntil(this._mutex, timestamp);
        if (res === CV_TIMED_OUT) {
          return false;
        }
        state = Atomics.load(this._mem, 0);
      }
      Atomics.add(this._mem, 0, 1);
      this._isReader = true;
      return true;
    } finally {
      await this._mutex.unlock();
    }
  }
}

async function lock(...locks) {
  const N = locks.length;
  const lockErrors = [];
  let numLocked = N;
  for (let i = 0; i < N; ++i) {
    try {
      await locks[i].lock();
    } catch (err) {
      lockErrors.push([i, err]);
      numLocked = i;
      break;
    }
  }
  if (numLocked === N) {
    return;
  }
  const unlockErrors = [];
  for (let i = numLocked - 1; i >= 0; --i) {
    try {
      await locks[i].unlock();
    } catch (err) {
      unlockErrors.push([i, err]);
    }
  }
  throw new MultiLockError(locks, numLocked, lockErrors, unlockErrors);
}

async function tryLock(...locks) {
  const N = locks.length;
  const lockErrors = [];
  let numLocked = N;
  for (let i = 0; i < N; ++i) {
    try {
      if (!await locks[i].tryLock()) {
        numLocked = i;
        break;
      }
    } catch (err) {
      lockErrors.push([i, err]);
      numLocked = i;
      break;
    }
  }
  if (numLocked === N) {
    return -1;
  }
  if (numLocked < 1 && lockErrors.length < 1) {
    return numLocked;
  }
  const unlockErrors = [];
  for (let i = numLocked - 1; i >= 0; --i) {
    try {
      await locks[i].unlock();
    } catch (err) {
      unlockErrors.push([i, err]);
    }
  }
  if (lockErrors.length > 0) {
    throw new MultiLockError(locks, numLocked, lockErrors, unlockErrors);
  }
  if (unlockErrors.length > 0) {
    const numUnlocked = numLocked - unlockErrors.length;
    throw new MultiUnlockError(locks, numUnlocked, unlockErrors);
  }
  return numLocked;
}

var __defProp$5 = Object.defineProperty;
var __defNormalProp$5 = (obj, key, value) => key in obj ? __defProp$5(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$5 = (obj, key, value) => __defNormalProp$5(obj, typeof key !== "symbol" ? key + "" : key, value);
class MultiLock {
  /**
   * @param mutexes - The basic lockables to associate.
   */
  constructor(...mutexes) {
    /**
     * Indicates whether the current agent owns the lock.
     */
    __publicField$5(this, "_isOwner");
    /**
     * The associated basic lockable.
     */
    __publicField$5(this, "mutexes");
    this._isOwner = false;
    this.mutexes = mutexes;
  }
  get ownsLock() {
    return this._isOwner;
  }
  async lock() {
    await lock(...this.mutexes);
    this._isOwner = true;
  }
  /**
   * Exchange internal state
   */
  swap(other) {
    const tIsOwner = this._isOwner;
    this._isOwner = other._isOwner;
    other._isOwner = tIsOwner;
    const tMutexes = this.mutexes;
    this.mutexes = other.mutexes;
    other.mutexes = tMutexes;
  }
  async tryLock() {
    const res = await tryLock(...this.mutexes);
    return this._isOwner = res < 0;
  }
  async unlock() {
    const locks = this.mutexes;
    const N = locks.length;
    const unlockErrors = [];
    for (let i = N - 1; i >= 0; --i) {
      try {
        await locks[i].unlock();
      } catch (err) {
        unlockErrors.push([i, err]);
      }
    }
    this._isOwner = false;
    if (unlockErrors.length > 0) {
      const unlocked = N - unlockErrors.length;
      throw new MultiUnlockError(Array.from(locks), unlocked, unlockErrors);
    }
  }
}

var __defProp$4 = Object.defineProperty;
var __defNormalProp$4 = (obj, key, value) => key in obj ? __defProp$4(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$4 = (obj, key, value) => __defNormalProp$4(obj, key + "" , value);
class SharedLock {
  /**
   * @param mutex - The shared lockable to associate.
   */
  constructor(mutex) {
    /**
     * The associated mutex.
     */
    __publicField$4(this, "mutex");
    this.mutex = mutex;
  }
  get ownsLock() {
    return this.mutex?.ownsSharedLock ?? false;
  }
  lock() {
    return this.mutex.lockShared();
  }
  /**
   * Exchanges the internal states of the shared locks.
   */
  swap(other) {
    const temp = this.mutex;
    this.mutex = other.mutex;
    other.mutex = temp;
  }
  tryLock() {
    return this.mutex.tryLockShared();
  }
  tryLockFor(timeout) {
    return this.mutex.tryLockSharedFor(timeout);
  }
  tryLockUntil(timestamp) {
    return this.mutex.tryLockSharedUntil(timestamp);
  }
  unlock() {
    return this.mutex.unlockShared();
  }
}

var __defProp$3 = Object.defineProperty;
var __defNormalProp$3 = (obj, key, value) => key in obj ? __defProp$3(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$3 = (obj, key, value) => __defNormalProp$3(obj, key + "" , value);
class UniqueLock {
  /**
   * @param mutex - The basic lockable to associate.
   */
  constructor(mutex) {
    /**
     * The associated basic lockable.
     */
    __publicField$3(this, "mutex");
    this.mutex = mutex;
  }
  get ownsLock() {
    return this.mutex?.ownsLock ?? false;
  }
  lock() {
    return this.mutex.lock();
  }
  lockSync() {
    return this.mutex.lockSync();
  }
  /**
   * Exchanges the internal states of the unique locks.
   */
  swap(other) {
    const temp = this.mutex;
    this.mutex = other.mutex;
    other.mutex = temp;
  }
  tryLock() {
    return this.mutex.tryLock();
  }
  tryLockSync() {
    return this.mutex.tryLockSync();
  }
  tryLockFor(timeout) {
    return this.mutex.tryLockFor(timeout);
  }
  tryLockForSync(timeout) {
    return this.mutex.tryLockForSync(timeout);
  }
  tryLockUntil(timestamp) {
    return this.mutex.tryLockUntil(timestamp);
  }
  tryLockUntilSync(timestamp) {
    return this.mutex.tryLockUntilSync(timestamp);
  }
  unlock() {
    return this.mutex.unlock();
  }
  unlockSync() {
    return this.mutex.unlockSync();
  }
}

function callOnce(flag, callbackfn) {
  return flag.set() ? callbackfn() : void 0;
}

var __defProp$2 = Object.defineProperty;
var __defNormalProp$2 = (obj, key, value) => key in obj ? __defProp$2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$2 = (obj, key, value) => __defNormalProp$2(obj, typeof key !== "symbol" ? key + "" : key, value);
const _OnceFlag = class _OnceFlag {
  constructor(sharedBuffer, byteOffset = 0, bitOffset = 0) {
    /**
     * The bit within the shared memory used to set the flag.
     */
    __publicField$2(this, "_bit");
    /**
     * The offset for the bit within the 32-bit integer of the shared memory.
     */
    __publicField$2(this, "_bitOffset");
    /**
     * The shared memory buffer used for the flag.
     */
    __publicField$2(this, "_mem");
    sharedBuffer ?? (sharedBuffer = new SharedArrayBuffer(_OnceFlag.ByteLength));
    if (bitOffset < 0) {
      throw new RangeError("Invalid bit offset", {
        cause: `${bitOffset} < 0`
      });
    }
    if (bitOffset >= 32) {
      throw new RangeError("Invalid bit offset", {
        cause: `${bitOffset} >= 32`
      });
    }
    this._bit = 1 << bitOffset;
    this._bitOffset = bitOffset;
    this._mem = new Int32Array(sharedBuffer, byteOffset, 1);
  }
  get buffer() {
    return this._mem.buffer;
  }
  get byteLength() {
    return this._mem.byteLength;
  }
  get byteOffset() {
    return this._mem.byteOffset;
  }
  /**
   * The bit offset for the flag within shared memory, relative to `byteOffset`.
   */
  get bitOffset() {
    return this._bitOffset;
  }
  /**
   * Resets the flag state to `false`.
   *
   * @returns `true` if the flag was previously set, `false` otherwise.
   */
  clear() {
    return (Atomics.and(this._mem, 0, ~this._bit) & this._bit) !== 0;
  }
  /**
   * Checks if the flag is currently set.
   *
   * @returns `true` if the flag is set, `false` otherwise.
   */
  isSet() {
    return (Atomics.load(this._mem, 0) & this._bit) !== 0;
  }
  /**
   * Sets the flag to `true`. This operation is atomic and thread-safe.
   *
   * @returns `true` if the flag was set, `false` if it was already set.
   */
  set() {
    return (Atomics.or(this._mem, 0, this._bit) & this._bit) === 0;
  }
};
/**
 * The size in bytes of the flag.
 */
__publicField$2(_OnceFlag, "ByteLength", Int32Array.BYTES_PER_ELEMENT);
let OnceFlag = _OnceFlag;

var __defProp$1 = Object.defineProperty;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$1 = (obj, key, value) => __defNormalProp$1(obj, typeof key !== "symbol" ? key + "" : key, value);
const _CountingSemaphore = class _CountingSemaphore {
  constructor(sharedBuffer, byteOffset = 0) {
    __publicField$1(this, "_gate");
    __publicField$1(this, "_mem");
    __publicField$1(this, "_mutex");
    const bInt32 = Int32Array.BYTES_PER_ELEMENT;
    if (sharedBuffer instanceof SharedArrayBuffer) {
      this._mem = new Int32Array(sharedBuffer, byteOffset, 3);
      byteOffset += bInt32;
      this._mutex = new TimedMutex(sharedBuffer, byteOffset);
      byteOffset += bInt32;
      this._gate = new ConditionVariable(sharedBuffer, byteOffset);
      return;
    }
    const desired = sharedBuffer;
    if (desired < 0) {
      throw new RangeError(ERR_NEGATIVE_VALUE, {
        cause: `${desired} < 0`
      });
    }
    if (desired > _CountingSemaphore.Max) {
      throw new RangeError(ERR_OVERFLOW, {
        cause: `${desired} > ${_CountingSemaphore.Max}`
      });
    }
    sharedBuffer = new SharedArrayBuffer(_CountingSemaphore.ByteLength);
    this._mem = new Int32Array(sharedBuffer, 0, 3);
    byteOffset += bInt32;
    this._mutex = new TimedMutex(sharedBuffer, byteOffset);
    byteOffset += bInt32;
    this._gate = new ConditionVariable(sharedBuffer, byteOffset);
    this._mem[0] = desired;
  }
  get buffer() {
    return this._mem.buffer;
  }
  get byteLength() {
    return this._mem.byteLength;
  }
  get byteOffset() {
    return this._mem.byteOffset;
  }
  /**
   * Acquires the semaphore, blocking until it is available.
   *
   * @returns A promise that resolves when acquisition is successful.
   */
  acquire() {
    return lockGuard(this._mutex, async () => {
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
    return lockGuard(this._mutex, () => {
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
      await this._mutex.unlock();
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
      throw new RangeError(ERR_SEM_INPUT_NEG, {
        cause: `${count} < 0`
      });
    }
    return lockGuard(this._mutex, () => {
      const state = Atomics.load(this._mem, 0);
      if (count > _CountingSemaphore.Max - state) {
        throw new RangeError(ERR_SEM_INPUT_OVERFLOW, {
          cause: `${count} > ${_CountingSemaphore.Max - state}`
        });
      }
      Atomics.add(this._mem, 0, count);
      this._gate.notifyAll();
    });
  }
};
/**
 * The size in bytes of the semaphore.
 */
__publicField$1(_CountingSemaphore, "ByteLength", 3 * Int32Array.BYTES_PER_ELEMENT);
/**
 * The maximum possible value of the internal counter
 */
__publicField$1(_CountingSemaphore, "Max", MAX_INT32_VALUE);
let CountingSemaphore = _CountingSemaphore;

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
const _Latch = class _Latch {
  constructor(sharedBuffer, byteOffset = 0) {
    /**
     * Condition variable to manage waiting agents.
     */
    __publicField(this, "_gate");
    /**
     * The shared atomic memory for the internal counter.
     */
    __publicField(this, "_mem");
    /**
     * Mutex to protect access to the internal counter.
     */
    __publicField(this, "_mutex");
    const bInt32 = Int32Array.BYTES_PER_ELEMENT;
    if (sharedBuffer instanceof SharedArrayBuffer) {
      this._mem = new Int32Array(sharedBuffer, byteOffset, 3);
      byteOffset += bInt32;
      this._mutex = new Mutex(sharedBuffer, byteOffset);
      byteOffset += bInt32;
      this._gate = new ConditionVariable(sharedBuffer, byteOffset);
      return;
    }
    const expected = sharedBuffer;
    if (expected < 0) {
      throw new RangeError(ERR_NEGATIVE_VALUE, {
        cause: `${expected} < 0`
      });
    }
    if (expected > _Latch.Max) {
      throw new RangeError(ERR_OVERFLOW, {
        cause: `${expected} > ${_Latch.Max}`
      });
    }
    sharedBuffer = new SharedArrayBuffer(_Latch.ByteLength);
    this._mem = new Int32Array(sharedBuffer, 0, 3);
    byteOffset += bInt32;
    this._mutex = new Mutex(sharedBuffer, byteOffset);
    byteOffset += bInt32;
    this._gate = new ConditionVariable(sharedBuffer, byteOffset);
    this._mem[0] = expected;
  }
  /**
   * Decrements the counter by a specified amount.
   *
   * If the counter reaches zero, waiting agents are notified.
   *
   * @param n The amount to decrement the counter.
   *
   * @throws A {@link RangeError} If `n` is negative or exceeds the current count.
   */
  async countDown(n = 1) {
    if (n < 0) {
      throw new RangeError(ERR_LATCH_INPUT_UNDERFLOW, {
        cause: `${n} < 0`
      });
    }
    await lockGuard(this._mutex, async () => {
      const value = Atomics.load(this._mem, 0);
      if (n > value) {
        throw new RangeError(ERR_LATCH_INPUT_OVERFLOW, {
          cause: `${n} > ${value}`
        });
      }
      if (Atomics.sub(this._mem, 0, n) === n) {
        this._gate.notifyAll();
      }
    });
  }
  /**
   * Decrements the counter by a specified amount, then waits for it to reach zero.
   *
   * If the counter is decremented to zero, waiting agents are notified.
   *
   * @param n The amount to decrement the counter.
   *
   * @throws A {@link RangeError} If `n` is negative or exceeds the current count.
   *
   * @returns A promise that resolves once the internal count reaches zero,
   * allowing the agent to proceed.
   */
  async arriveAndWait(n = 1) {
    if (n < 0) {
      throw new RangeError(ERR_LATCH_INPUT_UNDERFLOW, {
        cause: `${n} < 0`
      });
    }
    await lockGuard(this._mutex, async () => {
      const value = Atomics.load(this._mem, 0);
      if (n > value) {
        throw new RangeError(ERR_LATCH_INPUT_OVERFLOW, {
          cause: `${n} > ${value}`
        });
      }
      if (Atomics.sub(this._mem, 0, n) === n) {
        this._gate.notifyAll();
        return;
      }
      do {
        await this._gate.wait(this._mutex);
      } while (Atomics.load(this._mem, 0) !== 0);
    });
  }
  /**
   * Tests if the counter has reached zero.
   *
   * @returns `true` if the current count is zero, otherwise `false`.
   */
  tryWait() {
    return Atomics.load(this._mem, 0) === 0;
  }
  /**
   * Wait until the counter reaches zero.
   *
   * @returns A promise that resolves once the internal count reaches zero,
   * allowing the agent to proceed.
   */
  async wait() {
    await lockGuard(this._mutex, async () => {
      while (Atomics.load(this._mem, 0) !== 0) {
        await this._gate.wait(this._mutex);
      }
    });
  }
};
/**
 * The size in bytes of the latch.
 */
__publicField(_Latch, "ByteLength", 3 * Int32Array.BYTES_PER_ELEMENT);
/**
 * The maximum possible value of the internal counter.
 */
__publicField(_Latch, "Max", MAX_INT32_VALUE);
let Latch = _Latch;

exports.CV_OK = CV_OK;
exports.CV_TIMED_OUT = CV_TIMED_OUT;
exports.ConditionVariable = ConditionVariable;
exports.CountingSemaphore = CountingSemaphore;
exports.Latch = Latch;
exports.LockError = LockError;
exports.MultiLock = MultiLock;
exports.MultiLockError = MultiLockError;
exports.MultiUnlockError = MultiUnlockError;
exports.Mutex = Mutex;
exports.OnceFlag = OnceFlag;
exports.OwnershipError = OwnershipError;
exports.RecursiveMutex = RecursiveMutex;
exports.RecursiveTimedMutex = RecursiveTimedMutex;
exports.RelockError = RelockError;
exports.SharedLock = SharedLock;
exports.SharedMutex = SharedMutex;
exports.SharedTimedMutex = SharedTimedMutex;
exports.TimedMutex = TimedMutex;
exports.TimeoutError = TimeoutError;
exports.UniqueLock = UniqueLock;
exports.callOnce = callOnce;
exports.lock = lock;
exports.lockGuard = lockGuard;
exports.lockGuardSync = lockGuardSync;
exports.tryLock = tryLock;
//# sourceMappingURL=semafy.cjs.map
