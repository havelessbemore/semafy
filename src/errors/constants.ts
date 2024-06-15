// Generic
export const ERR_TIMEOUT = "Operation timed out";

export const ERR_NEGATIVE_VALUE = "Value cannot be negative";

export const ERR_OVERFLOW = "Cannot exceed maximum value";

// Barriers

export const ERR_LATCH_INPUT_UNDERFLOW =
  "Operation not permitted. Latch decrement cannot be negative";

export const ERR_LATCH_INPUT_OVERFLOW =
  "Operation not permitted. Latch decrement cannot exceed current count";

// Condition Variable
export const ERR_CV_VALUE = "Unexpected value in shared memory location";

// Mutex
export const ERR_LOCK = "A lock has encountered an error";

export const ERR_LOCK_OWNERSHIP =
  "Operation not permitted. Lock must be acquired first";

export const ERR_LOCK_RELOCK =
  "Attempted relock of already acquired lock. Deadlock would occur";

export const ERR_LOCK_TIMEOUT = "Timed out acquiring lock";

// Recursive Mutex

export const ERR_REC_MUTEX_OVERFLOW =
  "Operation not permitted. Additional lock would exceed the maximum levels of ownership";

// Mutex Management
export const ERR_MULTI_LOCK = "Failed to acquire all locks";

export const ERR_MULTI_UNLOCK = "Failed to unlock all locks";

// Semaphore
export const ERR_SEM_INPUT_NEG =
  "Operation not permitted. Semaphore release value cannot be negative";

export const ERR_SEM_INPUT_OVERFLOW =
  "Operation not permitted. Semaphore release would cause overflow";
