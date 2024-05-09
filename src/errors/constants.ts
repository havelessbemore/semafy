// Generic
export const ERR_ARRAY_NOT_SHARED =
  "Typed array is not backed by a shared array buffer.";

export const ERR_TIMEOUT = "Operation timed out.";

// Condition Variable
export const ERR_CV_VALUE = "Unexpected value in shared memory location";

// Mutex
export const ERR_MUTEX = "Mutex has encountered an error.";

export const ERR_MUTEX_OWNERSHIP =
  "Operation not permitted. Mutex must be acquired first.";

export const ERR_MUTEX_RELOCK =
  "Attempted relock of already acquired mutex. Deadlock would occur.";

export const ERR_MUTEX_TIMEOUT = "Timed out acquiring mutex.";

// Semaphore
export const ERR_SEM_NEG_COUNT =
  "Operation not permitted. Cannot release a negative amount from the semaphore.";

export const ERR_SEM_OVERFLOW =
  "Operation not permitted. Releasing the given amount from the semaphore would cause overflow.";