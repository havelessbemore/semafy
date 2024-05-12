// Generic
export const ERR_TIMEOUT = "Operation timed out.";

// Condition Variable
export const ERR_CV_VALUE = "Unexpected value in shared memory location";

// Mutex
export const ERR_LOCK = "A lock has encountered an error.";

export const ERR_LOCK_OWNERSHIP =
  "Operation not permitted. Lock must be acquired first.";

export const ERR_LOCK_RELOCK =
  "Attempted relock of already acquired lock. Deadlock would occur.";

export const ERR_LOCK_TIMEOUT = "Timed out acquiring lock.";

// Recursive Mutex

export const ERR_REC_MUTEX_OVERFLOW =
  "Operation not permitted. Additional lock would excee the RecursiveMutex's maximum levels of ownership.";

// Mutex Management
export const ERR_MULTI_LOCK = "Failed to acquire all locks.";

export const ERR_MULTI_UNLOCK = "Failed to unlock all locks.";

// Semaphore
export const ERR_SEM_NEG_COUNT =
  "Operation not permitted. Cannot release a negative amount from the semaphore.";

export const ERR_SEM_OVERFLOW =
  "Operation not permitted. Releasing the given amount from the semaphore would cause overflow.";
