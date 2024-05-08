/**
 * Represents an error that occurs when a process exceeds a set timeout.
 */
export class TimeoutError extends Error {
  /**
   * Duration in milliseconds after which the timeout error was thrown.
   * Can be `undefined` if not specified.
   */
  public timeout?: number;

  /**
   * Absolute time in milliseconds after which the timeout error was thrown.
   * Can be `undefined` if not specified.
   */
  public timestamp?: number;

  /**
   * Create a new `TimeoutError`.
   *
   * @param message - A custom error message. Defaults to `undefined`.
   * @param timeout - The timeout duration in milliseconds. Defaults to `undefined`.
   * @param timeout - The absolute time in milliseconds. Defaults to `undefined`.
   */
  constructor(message?: string, timeout?: number, timestamp?: number) {
    super(message);
    this.timeout = timeout;
    this.timestamp = timestamp;
    this.name = TimeoutError.name;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, TimeoutError);
    }
  }
}
