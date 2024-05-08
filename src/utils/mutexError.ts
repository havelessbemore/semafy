/**
 * Represents an error originating from a mutex.
 */
export class MutexError extends Error {
  /**
   * Creates a new `MutexError`.
   *
   * @param message - A custom error message. Defaults to `undefined`.
   */
  constructor(message?: string) {
    super(message);
    this.name = MutexError.name;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, MutexError);
    }
  }
}
