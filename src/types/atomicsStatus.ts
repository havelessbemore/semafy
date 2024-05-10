/**
 * Represents the possible status codes returned by {@link Atomics} operations.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Atomics| Atomics}
 */
export type AtomicsStatus =
  | typeof ATOMICS_NOT_EQUAL
  | typeof ATOMICS_OK
  | typeof ATOMICS_TIMED_OUT;

/**
 * Indicates that the expected value was not found at the atomic location.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Atomics/waitAsync | Atomics}
 */
export const ATOMICS_NOT_EQUAL = "not-equal";

/**
 * Indicates the {@link Atomics} operation completed successfully.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Atomics | Atomics}
 */
export const ATOMICS_OK = "ok";

/**
 * Indicates the {@link Atomics} operation
 * did not complete within the given time.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Atomics/waitAsync | Atomics}
 */
export const ATOMICS_TIMED_OUT = "timed-out";
