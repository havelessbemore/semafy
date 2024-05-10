/**
 * Represents the possible status codes
 * returned by {@link ConditionVariable} operations.
 */
export type CVStatus = typeof CV_OK | typeof CV_TIMED_OUT;

/**
 * The {@link ConditionVariable} was awakened via notification.
 */
export const CV_OK = "ok";

/**
 * The {@link ConditionVariable} was awakened by timeout expiration.
 */
export const CV_TIMED_OUT = "timed-out";
