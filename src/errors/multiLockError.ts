import { Lockable } from "../types/lockable";
import { ERR_MULTI_LOCK } from "./constants";
import { LockError } from "./lockError";

/**
 * Represents an error that occurs when attempting to lock multiple {@link Lockable} objects simultaneously.
 *
 * This error provides detailed information about the failure of locking operations, including specifics
 * about any errors that occurred. It ensures that any partial state due to errors can be adequately handled.
 */
export class MultiLockError extends LockError {
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
  constructor(
    public locks: Lockable[],
    public numLocked: number,
    public lockErrors: [number, unknown][] = [],
    public unlockErrors: [number, unknown][] = [],
    message?: string,
  ) {
    super(message ?? ERR_MULTI_LOCK);
  }
}
