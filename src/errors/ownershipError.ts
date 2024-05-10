import { ERR_LOCK_OWNERSHIP } from "./constants";
import { LockError } from "./lockError";

/**
 * Represents an ownership error originating from a lock.
 */
export class OwnershipError extends LockError {
  /**
   * @param message - An optional custom error message.
   */
  constructor(message?: string) {
    super(message ?? ERR_LOCK_OWNERSHIP);
  }
}
