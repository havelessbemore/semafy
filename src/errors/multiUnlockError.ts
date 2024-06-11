import type { BasicLockable } from "../types/basicLockable";

import { ERR_MULTI_UNLOCK } from "./constants";
import { LockError } from "./lockError";

/**
 * Represents an error that occurs when attempting to unlock multiple {@link BasicLockable} objects simultaneously.
 *
 * This error provides detailed information about the failure of unlocking operations, including specifics
 * about any errors that occurred. It ensures that any partial state due to errors can be adequately handled.
 */
export class MultiUnlockError extends LockError {
  /**
   * @param locks - The array of all lockable objects that were part of the operation.
   * @param numUnlocked - The number of unlocks successfully updated before failure.
   * @param unlockErrors - An array of [index, error] pairs that contain the index of the lock in
   * the `locks` array and the error that occurred while attempting to unlock it. Useful for
   * debugging unexpected issues during unlocking.
   * @param message - An optional custom error message that describes the error.
   */
  constructor(
    public locks: BasicLockable[],
    public numUnlocked: number,
    public unlockErrors: [number, unknown][] = [],
    message?: string,
  ) {
    super(message ?? ERR_MULTI_UNLOCK);
  }
}
