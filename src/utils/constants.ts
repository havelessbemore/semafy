/**
 * Indicates that the expected and actual
 * values were not equal in an atomic operation.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Atomics/waitAsync | Atomics}
 */
export const ATOMICS_NOT_EQUAL = "not-equal";

/**
 * Indicates that the atomic operation completed successfully.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Atomics | Atomics}
 */
export const ATOMICS_OK = "ok";

/**
 * Indicates that the atomic operation did not
 * complete within a designated time duration.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Atomics/waitAsync | Atomics}
 */
export const ATOMICS_TIMED_OUT = "timed-out";
