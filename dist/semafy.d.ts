/**
 * Represents the possible status codes
 * returned by {@link ConditionVariable} operations.
 */
type CVStatus = typeof CV_OK | typeof CV_TIMED_OUT;
/**
 * Indicates the {@link ConditionVariable} operation completed successfully.
 */
declare const CV_OK = "ok";
/**
 * Indicates the {@link ConditionVariable}
 * operation did not complete within the given time.
 */
declare const CV_TIMED_OUT = "timed-out";

/**
 * Represents a generic error originating from a mutex.
 */
declare class MutexError extends Error {
    /**
     * Creates a new `MutexError`.
     *
     * @param message - An optional custom error message.
     */
    constructor(message?: string);
}

/**
 * Represents an ownership error originating from a mutex.
 */
declare class MutexOwnershipError extends MutexError {
    /**
     * Creates a new `MutexOwnershipError`.
     *
     * @param message - An optional custom error message.
     */
    constructor(message?: string);
}

/**
 * Represents an error relocking a mutex.
 */
declare class MutexRelockError extends MutexError {
    /**
     * Creates a new `MutexRelockError`.
     *
     * @param message - An optional custom error message.
     */
    constructor(message?: string);
}

/**
 * Represents an error that occurs when a process exceeds a set timeout.
 */
declare class TimeoutError extends Error {
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
    constructor(message?: string, timeout?: number, deadline?: number);
}

/**
 * Provides synchronization across agents (main thread and workers)
 * to allow exclusive access to shared resources / blocks of code.
 *
 * A mutex is owned from the time an agent successfully locks it
 * and until the agent unlocks it. During ownership, any other agents
 * attempting to lock the mutex will block (or receive `false` from
 * `tryLock` methods). When unlocked, any blocked agent will have
 * the chance to acquire owernship.
 *
 * A locked mutex should not be relocked by the owner. Attempts
 * for additional locks will throw an error, and calls to `tryLock`
 * methods will return `false`.
 *
 * - Behavior is undefined if:
 *    - The mutex is destroyed while being owned
 *    - The agent is terminated while owning the mutex
 *    - The value at the mutex's shared memory location is unexpected.
 *
 * - Timeout precision for time-based methods may vary due to system load
 * and inherent limitations of JavaScript timing. Developers should
 * consider this possible variability in their applications.
 *
 * @privateRemarks
 * 1. {@link https://en.cppreference.com/w/cpp/thread/unique_lock | C++ std::unique_lock}
 */
declare class Mutex {
    /**
     * Indicates whether the current agent owns the lock.
     */
    private _isOwner;
    /**
     * The shared atomic memory for the mutex.
     */
    private _mem;
    /**
     * Creates a new instance of Mutex.
     */
    constructor();
    /**
     * Creates a new instance of Mutex.
     *
     * @param sharedBuffer The {@link SharedArrayBuffer} that backs the mutex.
     * @param byteOffset The byte offset within `sharedBuffer`. Defaults to `0`.
     *
     * Note: The shared memory location should not be modified outside
     * of this mutex. Doing so may cause unexpected behavior.
     */
    constructor(sharedBuffer: SharedArrayBuffer, byteOffset?: number);
    /**
     * Gets the underlying shared buffer.
     */
    get buffer(): SharedArrayBuffer;
    /**
     * Gets the byte offset in the underlying shared buffer.
     */
    get byteOffset(): number;
    /**
     * Indicates whether the current agent owns the lock.
     */
    get ownsLock(): boolean;
    /**
     * Acquires the mutex, blocking until the lock is available.
     *
     * @throws A {@link MutexRelockError} If the mutex is already locked by the caller.
     */
    lock(): Promise<void>;
    /**
     * Acquires the mutex and executes the provided callback, automatically
     * unlocking afterwards. Blocks until the lock is available.
     *
     * @param callbackfn The callback function.
     *
     * @throws A {@link MutexRelockError} If the mutex is already locked by the caller.
     *
     * @returns A promise resolved to the return value of `callbackfn`.
     */
    request<T>(callbackfn: () => T | Promise<T>): Promise<T>;
    /**
     * Attempts to acquire the mutex and execute the provided
     * callback, automatically unlocking afterwards. Blocks
     * until either the lock is available or the specified timeout elapses.
     *
     * @param timeout The timeout in milliseconds.
     *
     * @throws A {@link MutexRelockError} If the mutex is already locked by the caller.
     * @throws A {@link TimeoutError} If the mutex could not be acquired within the specified time.
     *
     * @returns A promise with the return value from `callbackfn`.
     */
    requestFor<T>(callbackfn: () => T | Promise<T>, timeout: number): Promise<T>;
    /**
     * Attempts to acquire the mutex and execute the provided
     * callback, automatically unlocking afterwards. Blocks
     * until either the lock is available or the specified time elapses.
     *
     * @param timestamp The absolute time in milliseconds.
     *
     * @throws A {@link MutexRelockError} If the mutex is already locked by the caller.
     * @throws A {@link TimeoutError} If the mutex could not be acquired within the specified time.
     *
     * @returns A promise with the return value from `callbackfn`.
     */
    requestUntil<T>(callbackfn: () => T | Promise<T>, timestamp: number): Promise<T>;
    /**
     * Attempts to acquire the mutex without blocking.
     *
     * @returns `true` if the lock was successful, otherwise `false`.
     */
    tryLock(): boolean;
    /**
     * Attempts to acquire the lock, blocking until either
     * the lock is acquired or the specified timeout elapses.
     *
     * @param timeout The timeout in milliseconds.
     *
     * @returns A promise resolved to `true` if the lock was succesful, otherwise `false`.
     */
    tryLockFor(timeout: number): Promise<boolean>;
    /**
     * Attempts to acquire the lock, blocking until either
     * the lock is acquired or the specified point in time is reached.
     *
     * @param timestamp The absolute time in milliseconds.
     *
     * @returns A promise resolved to `true` if the lock was succesful, otherwise `false`.
     */
    tryLockUntil(timestamp: number): Promise<boolean>;
    /**
     * Releases the mutex if currently owned by the caller.
     *
     * @throws A {@link MutexOwnershipError} If the mutex is not owned by the caller.
     */
    unlock(): void;
}

/**
 * Represents a condition variable similar to those used in C++.
 *
 * A condition variable manages an atomic wait/block mechanism that
 * is tightly coupled with a mutex for safe cross-agent synchronization.
 *
 * @privateRemarks
 * 1. {@link https://en.cppreference.com/w/cpp/thread/condition_variable | C++ std::condition_variable}
 * 1. {@link https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2406.html | Alexander Terekhov, Howard Hinnant. (2007-09-09). Mutex, Lock, Condition Variable Rationale}
 */
declare class ConditionVariable {
    /**
     * The shared atomic memory where the condition variable stores its state.
     */
    private _mem;
    /**
     * Creates a new instance of ConditionVariable.
     */
    constructor();
    /**
     * Creates a new instance of ConditionVariable.
     *
     * @param sharedBuffer The {@link SharedArrayBuffer} that backs the condition variable.
     * @param byteOffset The byte offset within `sharedBuffer`. Defaults to `0`.
     *
     * Note: The shared memory location should not be modified outside
     * of this condition variable. Doing so may cause errors.
     */
    constructor(sharedBuffer: SharedArrayBuffer, byteOffset?: number);
    /**
     * Gets the underlying shared buffer.
     */
    get buffer(): SharedArrayBuffer;
    /**
     * Gets the byte offset in the underlying shared buffer.
     */
    get byteOffset(): number;
    /**
     * Notify waiting workers that are blocked on this condition variable.
     *
     * @param count - The number of workers to notify.
     *
     * @returns The number of workers that were woken up.
     */
    notify(count: number): number;
    /**
     * Notify all waiting workers that are blocked on this condition variable.
     *
     * @returns The number of workers that were woken up.
     */
    notifyAll(): number;
    /**
     * Notify one waiting worker that is blocked on this condition variable.
     *
     * @returns The number of workers that were woken up.
     */
    notifyOne(): number;
    /**
     * Blocks the current worker until this condition variable is notified,
     * or an optional timeout expires. The associated mutex is atomically
     * released before blocking and re-acquired after waking up.
     *
     * @param mutex The {@link Mutex} that must be locked by the current agent.
     *
     * @throws A {@link MutexOwnershipError} If the mutex is not owned by the caller.
     * @throws A {@link RangeError} If the condition variable's internal value is not expected.
     */
    wait(mutex: Mutex): Promise<void>;
    /**
     * Blocks the current worker until this condition variable is notified,
     * or an optional timeout expires. The associated mutex is atomically
     * released before blocking and re-acquired after waking up.
     *
     * @param mutex The mutex that must be locked by the current agent.
     * @param timeout An optional timeout in milliseconds after which the wait is aborted.
     *
     * @throws A {@link MutexOwnershipError} If the mutex is not owned by the caller.
     * @throws A {@link RangeError} If the condition variable's internal value is not expected.
     *
     * @returns A {@link CVStatus} representing the result of the operation.
     */
    waitFor(mutex: Mutex, timeout: number): Promise<CVStatus>;
    /**
     * Blocks the current agent until this condition variable is notified,
     * or until a specified point in time is reached. This is a convenience
     * method for waiting within a deadline.
     *
     * @param mutex The {@link Mutex} that must be locked by the current agent.
     * @param timestamp The absolute time (in milliseconds) at which to stop waiting.
     *
     * @throws A {@link MutexOwnershipError} If the mutex is not owned by the caller.
     * @throws A {@link RangeError} If the condition variable's internal value is not expected.
     *
     * @returns A {@link CVStatus} representing the result of the operation.
     */
    waitUntil(mutex: Mutex, timestamp: number): Promise<CVStatus>;
}

/**
 * Provides synchronization across agents (main thread and workers)
 * to allow exclusive recursive access to shared resources / blocks of code.
 *
 * A mutex is owned once an agent successfully locks it.
 * During ownership, the agent may acquire additional locks from the
 * mutex. Ownership ends when the agent releases all aquired locks.
 *
 * While owned, any other agents attempting to lock the mutex will
 * block (or receive `false` from `tryLock` methods). When unlocked,
 * any blocked agent will have the chance to acquire owernship.
 *
 * The maximum number of times a mutex can be locked recursively
 * is defined by {@link RecursiveMutex.MAX}. Once reached, attempts
 * for additional locks will throw an error, and calls to `tryLock` methods
 * will return `false`.
 *
 * - Behavior is undefined if:
 *    - The mutex is destroyed while being owned
 *    - The agent is terminated while owning the mutex
 *    - The value at the mutex's shared memory location is unexpected.
 *
 * - Timeout precision for time-based methods may vary due to system load
 * and inherent limitations of JavaScript timing. Developers should
 * consider this possible variability in their applications.
 *
 * @privateRemarks
 * 1. {@link https://en.cppreference.com/w/cpp/thread/recursive_mutex | C++ std::recursive_mutex}
 */
declare class RecursiveMutex {
    /**
     * The number of locks acquired by the agent.
     */
    private _depth;
    /**
     * The shared atomic memory for the mutex.
     */
    private _mem;
    /**
     * The maximum levels of recursive ownership.
     */
    static readonly MAX: number;
    /**
     * Creates a new instance of Mutex.
     */
    constructor();
    /**
     * Creates a new instance of Mutex.
     *
     * @param sharedBuffer The {@link SharedArrayBuffer} that backs the mutex.
     * @param byteOffset The byte offset within `sharedBuffer`. Defaults to `0`.
     *
     * Note: The shared memory location should not be modified outside
     * of this mutex. Doing so may cause unexpected behavior.
     */
    constructor(sharedBuffer: SharedArrayBuffer, byteOffset?: number);
    /**
     * Gets the underlying shared buffer.
     */
    get buffer(): SharedArrayBuffer;
    /**
     * Gets the byte offset in the underlying shared buffer.
     */
    get byteOffset(): number;
    /**
     * Indicates whether the current agent owns the lock.
     */
    get ownsLock(): boolean;
    /**
     * Acquires the mutex, blocking until the lock is available.
     *
     * @throws A {@link RangeError} If the mutex is already locked the maximum amount of times.
     */
    lock(): Promise<void>;
    /**
     * Acquires the mutex and executes the provided callback,
     * automatically unlocking afterwards. Blocks until the lock is available.
     *
     * @param callbackfn The callback function.
     *
     * @throws A {@link RangeError} If the mutex is already locked the maximum amount of times.
     *
     * @returns A promise resolved to the return value of `callbackfn`.
     */
    request<T>(callbackfn: () => T | Promise<T>): Promise<T>;
    /**
     * Attempts to acquire the mutex and execute the provided
     * callback, automatically unlocking afterwards. Blocks
     * until either the lock is available or the specified timeout elapses.
     *
     * @param timeout The timeout in milliseconds.
     *
     * @throws A {@link RangeError} If the mutex is already locked the maximum amount of times.
     * @throws A {@link TimeoutError} If the mutex could not be acquired within the specified time.
     *
     * @returns A promise with the return value from `callbackfn`.
     */
    requestFor<T>(callbackfn: () => T | Promise<T>, timeout: number): Promise<T>;
    /**
     * Attempts to acquire the mutex and execute the provided
     * callback, automatically unlocking afterwards. Blocks
     * until either the lock is available or the specified time elapses.
     *
     * @param timestamp The absolute time in milliseconds.
     *
     * @throws A {@link RangeError} If the mutex is already locked the maximum amount of times.
     * @throws A {@link TimeoutError} If the mutex could not be acquired within the specified time.
     *
     * @returns A promise with the return value from `callbackfn`.
     */
    requestUntil<T>(callbackfn: () => T | Promise<T>, timestamp: number): Promise<T>;
    /**
     * Attempts to acquire the mutex without blocking.
     *
     * @returns `true` if the lock was successful, otherwise `false`.
     */
    tryLock(): boolean;
    /**
     * Attempts to acquire the lock, blocking until either
     * the lock is acquired or the specified timeout elapses.
     *
     * @param timeout The timeout in milliseconds.
     *
     * @returns A promise resolved to `true` if the lock was succesful, otherwise `false`.
     */
    tryLockFor(timeout: number): Promise<boolean>;
    /**
     * Attempts to acquire the lock, blocking until either
     * the lock is acquired or the specified point in time is reached.
     *
     * @param timestamp The absolute time in milliseconds.
     *
     * @returns A promise resolved to `true` if the lock was succesful, otherwise `false`.
     */
    tryLockUntil(timestamp: number): Promise<boolean>;
    /**
     * Releases the mutex if currently owned by the caller.
     *
     * @throws A {@link MutexOwnershipError} If the mutex is not owned by the caller.
     */
    unlock(): void;
}

/**
 * A counting semaphore based on shared memory and atomics, allowing for
 * cross-agent synchronization.
 *
 * @see {@link https://en.cppreference.com/w/cpp/thread/counting_semaphore | C++ std::counting_semaphore}
 */
declare class Semaphore {
    private _gate;
    private _mem;
    private _mutex;
    /**
     * The maximum possible value of the internal counter
     */
    static readonly MAX: number;
    /**
     * Creates a new instance of a Semaphore.
     */
    constructor();
    /**
     * Creates a new instance of a Semaphore.
     *
     * @param sharedBuffer The shared buffer that backs the semaphore.
     * @param byteOffset The byte offset within the shared buffer. Defaults to `0`.
     */
    constructor(sharedBuffer: SharedArrayBuffer, byteOffset?: number);
    /**
     * Gets the underlying shared buffer.
     */
    get buffer(): SharedArrayBuffer;
    /**
     * Gets the byte offset in the underlying shared buffer.
     */
    get byteOffset(): number;
    /**
     * Acquires the semaphore, blocking until it is available.
     *
     * @returns A promise that resolves when acquisition is successful.
     */
    acquire(): Promise<void>;
    /**
     * Attempts to acquire the semaphore.
     *
     * @returns A promise resolving to `true` if successful, otherwise `false`.
     */
    tryAcquire(): Promise<boolean>;
    /**
     * Attempts to acquire the semaphore, blocking until either
     * success or the specified timeout elapses.
     *
     * @param timeout The maximum duration in milliseconds to wait.
     *
     * @returns A promise resolving to `true` if successful, otherwise `false`.
     */
    tryAcquireFor(timeout: number): Promise<boolean>;
    /**
     * Attempts to acquire the lock, blocking until either
     * the lock is acquired or the specified point in time is reached.
     *
     * @param timestamp The absolute time in milliseconds to wait until.
     *
     * @returns A promise resolved to `true` if succesful, otherwise `false`.
     */
    tryAcquireUntil(timestamp: number): Promise<boolean>;
    /**
     * Releases a specified number of units back to the semaphore.
     *
     * @param count The number of units to release. Defaults to 1.
     *
     * @throws {RangeError} If `count` is negative or would cause the semaphore to overflow.
     */
    release(count?: number): Promise<void>;
}

/**
 * Provides synchronization across agents (main thread and workers)
 * to allow exclusive and shared access to resources / blocks of code.
 *
 * If one agent has acquired an exclusive lock, no other agents can acquire
 * the mutex. If one agent has acquired a shared lock, other agents can still
 * acquire the shared lock, but cannot acquire an exclusive lock. Within one
 * agent, only one lock (shared or exclusive) can be acquired at the same time.
 *
 * Shared mutexes are useful when shared data can be safely read by any number
 * of agents simultaneously, but should be written to by only one agent at a
 * time, and not readable by other agents during writing.
 *
 * @privateRemarks
 * 1. {@link https://en.cppreference.com/w/cpp/thread/shared_mutex | C++ std::shared_mutex}
 * 1. {@link https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2406.html | Alexander Terekhov, Howard Hinnant. (2007-09-09). Mutex, Lock, Condition Variable Rationale}
 */
declare class SharedMutex {
    private _gate1;
    private _gate2;
    private _isReader;
    private _isWriter;
    private _mem;
    private _mutex;
    /**
     * Creates a new instance of a SharedMutex.
     */
    constructor();
    /**
     * Creates a new instance of a SharedMutex.
     *
     * @param sharedBuffer The shared buffer that backs the mutex.
     * @param byteOffset The byte offset within the shared buffer. Defaults to `0`.
     */
    constructor(sharedBuffer: SharedArrayBuffer, byteOffset?: number);
    /**
     * Gets the underlying shared buffer.
     */
    get buffer(): SharedArrayBuffer;
    /**
     * Gets the byte offset in the underlying shared buffer.
     */
    get byteOffset(): number;
    /**
     * Indicates whether the current agent owns the lock.
     */
    get ownsLock(): boolean;
    /**
     * Acquires the mutex, blocking until the lock is available.
     *
     * @throws A {@link MutexRelockError} If the mutex is already locked by the caller.
     */
    lock(): Promise<void>;
    /**
     * Acquires the mutex and executes the provided callback, automatically
     * unlocking afterwards. Blocks until the lock is available.
     *
     * @param callbackfn The callback function.
     *
     * @throws A {@link MutexRelockError} If the mutex is already locked by the caller.
     *
     * @returns A promise resolved to the return value of `callbackfn`.
     */
    request<T>(callbackfn: () => T | Promise<T>): Promise<T>;
    /**
     * Attempts to acquire the mutex without blocking.
     *
     * @returns A promise resolved to `true` if the lock was successful, otherwise `false`.
     */
    tryLock(): Promise<boolean>;
    /**
     * Releases the mutex if currently owned by the caller.
     *
     * @throws A {@link MutexOwnershipError} If the mutex is not owned by the caller.
     */
    unlock(): Promise<void>;
    /**
     * Indicates whether the current agent owns a shared lock.
     */
    get ownsSharedLock(): boolean;
    /**
     * Acquires the mutex for shared ownership, blocking until a lock is available.
     *
     * @throws A {@link MutexRelockError} If the mutex is already locked by the caller.
     */
    lockShared(): Promise<void>;
    /**
     * Acquires the mutex for shared ownership and executes the provided
     * callback, automatically unlocking afterwards. Blocks until a lock
     * is available.
     *
     * @param callbackfn The callback function.
     *
     * @throws A {@link MutexRelockError} If the mutex is already locked by the caller.
     *
     * @returns A promise resolved to the return value of `callbackfn`.
     */
    requestShared<T>(callbackfn: () => T | Promise<T>): Promise<T>;
    /**
     * Attempts to acquire the mutex for shared ownership without blocking.
     *
     * @returns A promise resolved to `true` if the lock was successful, otherwise `false`.
     */
    tryLockShared(): Promise<boolean>;
    /**
     * Releases the mutex if currently owned by the caller.
     *
     * @throws A {@link MutexOwnershipError} If the mutex is not owned by the caller.
     */
    unlockShared(): Promise<void>;
}

export { type CVStatus, CV_OK, CV_TIMED_OUT, ConditionVariable, Mutex, MutexError, MutexOwnershipError, MutexRelockError, RecursiveMutex, Semaphore, SharedMutex, TimeoutError };
