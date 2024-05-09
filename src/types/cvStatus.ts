/**
 * Represents the possible status codes
 * returned by {@link ConditionVariable} operations.
 */
export type CVStatus = typeof CV_OK | typeof CV_TIMED_OUT;

/**
 * Indicates the {@link ConditionVariable} operation completed successfully.
 */
export const CV_OK = "ok";

/**
 * Indicates the {@link ConditionVariable}
 * operation did not complete within the given time.
 */
export const CV_TIMED_OUT = "timed-out";
