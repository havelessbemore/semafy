/**
 * Represents the possible status codes
 * returned by Condition Variable operations.
 */
export type CVStatus = typeof CV_OK | typeof CV_TIMED_OUT;

/**
 * Indicates that the condition variable
 * was awakened via notifyAll or notifyOne.
 */
export const CV_OK = "ok";

/**
 * Indicates the condition wariable
 * was awakened due to time expiration.
 */
export const CV_TIMED_OUT = "timed-out";
