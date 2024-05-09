/**
 * Represents an error that occurs when a process exceeds a set timeout.
 */
export class TimeoutError extends Error {
  /**
   * Absolute time in milliseconds after which the timeout error was thrown.
   * Can be `undefined` if not specified.
   */
  deadline?: number;

  /**
   * Duration in milliseconds after which the timeout error was thrown.
   * Can be `undefined` if not specified.
   */
  timeout?: number;

  /**
   * Create a new `TimeoutError`.
   *
   * @param message - A custom error message. Defaults to `undefined`.
   * @param timeout - The timeout duration in milliseconds. Defaults to `undefined`.
   * @param deadline - The absolute time in milliseconds. Defaults to `undefined`.
   */
  constructor(
    message = "Operation timed out",
    timeout?: number,
    deadline?: number,
  ) {
    super(message);
    this.deadline = deadline;
    this.timeout = timeout;
    this.name = TimeoutError.name;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, TimeoutError);
    }
  }
}
