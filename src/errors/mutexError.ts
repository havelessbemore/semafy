import { ERR_MUTEX } from "./constants";

/**
 * Represents a generic error originating from a mutex.
 */
export class MutexError extends Error {
  /**
   * Creates a new `MutexError`.
   *
   * @param message - An optional custom error message.
   */
  constructor(message?: string) {
    super(message ?? ERR_MUTEX);
    this.name = this.constructor.name;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
