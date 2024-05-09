import { ERR_MUTEX_RELOCK } from "./constants";
import { MutexError } from "./mutexError";

/**
 * Represents an error relocking a mutex.
 */
export class MutexRelockError extends MutexError {
  /**
   * Creates a new `MutexRelockError`.
   *
   * @param message - An optional custom error message.
   */
  constructor(message?: string) {
    super(message ?? ERR_MUTEX_RELOCK);
  }
}
