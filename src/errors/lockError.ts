import { ERR_LOCK } from "./constants";

/**
 * Represents a generic error originating from a lock.
 */
export class LockError extends Error {
  /**
   * @param message - An optional custom error message.
   */
  constructor(message?: string) {
    super(message ?? ERR_LOCK);
    this.name = this.constructor.name;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
