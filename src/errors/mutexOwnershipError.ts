import { ERR_MUTEX_OWNERSHIP } from "./constants";
import { MutexError } from "./mutexError";

/**
 * Represents an ownership error originating from a mutex.
 */
export class MutexOwnershipError extends MutexError {
  /**
   * Creates a new `MutexOwnershipError`.
   *
   * @param message - An optional custom error message.
   */
  constructor(message?: string) {
    super(message ?? ERR_MUTEX_OWNERSHIP);
  }
}
