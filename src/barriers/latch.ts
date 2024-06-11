import type { Lockable } from "../types/lockable";

import { ConditionVariable } from "../condVars/conditionVariable";
import {
  ERR_LATCH_INPUT_OVERFLOW,
  ERR_LATCH_INPUT_UNDERFLOW,
  ERR_OVERFLOW,
  ERR_NEGATIVE_VALUE,
} from "../errors/constants";
import { lockGuard } from "../locks/lockGuard";
import { Mutex } from "../mutexes/mutex";
import { MAX_INT32_VALUE } from "../utils/constants";

/**
 * A synchronization primitive that allows one or more agents to wait until
 * a set of operations has been completed.
 *
 * @privateRemarks
 * 1. {@link https://en.cppreference.com/w/cpp/thread/latch | std::latch}
 */
export class Latch {
  /**
   * The maximum possible value of the internal counter.
   */
  static readonly Max = MAX_INT32_VALUE;

  /**
   * Condition variable to manage waiting agents.
   */
  protected _gate: ConditionVariable;

  /**
   * The shared atomic memory for the internal counter.
   */
  protected _mem: Int32Array;

  /**
   * Mutex to protect access to the internal counter.
   */
  protected _mutex: Lockable;

  /**
   * @param expected The initial value of the internal counter. Must be non-negative and
   * not exceed {@link Latch.Max}.
   *
   * @throws A {@link RangeError} if `expected` is negative or exceeds {@link Latch.Max}.
   */
  constructor(expected: number);
  /**
   * @param sharedBuffer The shared buffer that backs the latch.
   * @param byteOffset The byte offset within the shared buffer. Defaults to `0`.
   */
  constructor(sharedBuffer: SharedArrayBuffer, byteOffset?: number);
  constructor(sharedBuffer: number | SharedArrayBuffer, byteOffset = 0) {
    const bInt32 = Int32Array.BYTES_PER_ELEMENT;

    if (sharedBuffer instanceof SharedArrayBuffer) {
      this._mem = new Int32Array(sharedBuffer, byteOffset, 3);
      byteOffset += bInt32;
      this._mutex = new Mutex(sharedBuffer, byteOffset);
      byteOffset += bInt32;
      this._gate = new ConditionVariable(sharedBuffer, byteOffset);
      return;
    }

    // Check for underflow
    const expected = sharedBuffer;
    if (expected < 0) {
      throw new RangeError(ERR_NEGATIVE_VALUE, {
        cause: `${expected} < 0`,
      });
    }

    // Check for overflow
    if (expected > Latch.Max) {
      throw new RangeError(ERR_OVERFLOW, {
        cause: `${expected} > ${Latch.Max}`,
      });
    }

    sharedBuffer = new SharedArrayBuffer(3 * bInt32);
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
  async countDown(n = 1): Promise<void> {
    // Sanitize input
    if (n < 0) {
      throw new RangeError(ERR_LATCH_INPUT_UNDERFLOW, {
        cause: `${n} < 0`,
      });
    }

    // Acquire internal mutex
    await lockGuard(this._mutex, async () => {
      // Get the internal counter
      const value = Atomics.load(this._mem, 0);

      // Check for overflow
      if (n > value) {
        throw new RangeError(ERR_LATCH_INPUT_OVERFLOW, {
          cause: `${n} > ${value}`,
        });
      }

      // Decrement the internal counter
      if (Atomics.sub(this._mem, 0, n) === n) {
        // If zero reached, notify blocked agents
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
  async arriveAndWait(n = 1): Promise<void> {
    // Sanitize input
    if (n < 0) {
      throw new RangeError(ERR_LATCH_INPUT_UNDERFLOW, {
        cause: `${n} < 0`,
      });
    }

    // Acquire internal mutex
    await lockGuard(this._mutex, async () => {
      // Get the internal counter
      const value = Atomics.load(this._mem, 0);

      // Check for overflow
      if (n > value) {
        throw new RangeError(ERR_LATCH_INPUT_OVERFLOW, {
          cause: `${n} > ${value}`,
        });
      }

      // Decrement the internal counter
      if (Atomics.sub(this._mem, 0, n) === n) {
        // If zero reached, notify blocked agents
        this._gate.notifyAll();
        return;
      }

      // Wait until zero reached
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
  tryWait(): boolean {
    return Atomics.load(this._mem, 0) === 0;
  }

  /**
   * Wait until the counter reaches zero.
   *
   * @returns A promise that resolves once the internal count reaches zero,
   * allowing the agent to proceed.
   */
  async wait(): Promise<void> {
    // Acquire internal mutex
    await lockGuard(this._mutex, async () => {
      // Wait until zero reached
      while (Atomics.load(this._mem, 0) !== 0) {
        await this._gate.wait(this._mutex);
      }
    });
  }
}
