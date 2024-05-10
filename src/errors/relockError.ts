import { ERR_LOCK_RELOCK } from "./constants";
import { LockError } from "./lockError";

/**
 * Represents an error relocking a lock.
 */
export class RelockError extends LockError {
  /**
   * @param message - An optional custom error message.
   */
  constructor(message?: string) {
    super(message ?? ERR_LOCK_RELOCK);
  }
}
