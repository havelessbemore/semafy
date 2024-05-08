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
 * - Behavior is undefined if:
 *    - The mutex is destroyed while being owned
 *    - The agent is terminated while owning the mutex
 *    - The value at the mutex's shared memory location is unexpected.
 *
 * - Timeout precision for time-based methods may vary due to system load
 * and inherent limitations of JavaScript timing. Developers should
 * consider this possible variability in their applications.
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
     *
     * @param sharedBuffer The shared buffer that backs the mutex.
     * @param byteOffset The byte offset within the shared buffer.
     *
     * Note: The value at the shared memory location should be
     * initialized to zero, and should not be modified outside of this mutex.
     */
    constructor(sharedBuffer: SharedArrayBuffer, byteOffset?: number);
    /**
     * Gets the underlying atomic handle.
     */
    get handle(): Int32Array;
    /**
     * Indicates whether the current agent owns the lock.
     */
    get ownsLock(): boolean;
    /**
     * Acquires the mutex, blocking until the lock is available.
     *
     * @throws {MutexError} If the mutex is already owned by the caller.
     */
    lock(): Promise<void>;
    /**
     * Acquires the mutex and executes the provided callback, automatically
     * unlocking afterwards. Blocks until the lock is available.
     *
     * @param callbackfn The callback function.
     *
     * @throws {MutexError} If the mutex is already owned by the caller.
     *
     * @returns A promise with the return value from `callbackfn`.
     */
    request<T>(callbackfn: () => T | Promise<T>): Promise<T>;
    /**
     * Attempts to acquire the mutex and execute the provided
     * callback, automatically unlocking afterwards. Blocks
     * until either the lock is available or the specified timeout elapses.
     *
     * @param timeout The timeout in milliseconds.
     *
     * @throws {MutexError} If the mutex is already owned by the caller.
     * @throws {TimeoutError} If the mutex could not be acquired within the specified time.
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
     * @throws {MutexError} If the mutex is already owned by the caller.
     * @throws {TimeoutError} If the mutex could not be acquired within the specified time.
     *
     * @returns A promise with the return value from `callbackfn`.
     */
    requestUntil<T>(callbackfn: () => T | Promise<T>, timestamp: number): Promise<T>;
    /**
     * Attempts to acquire the mutex without blocking.
     *
     * @throws {MutexError} If the mutex is already owned by the caller.
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
     * @throws {MutexError} If the mutex is already owned by the caller.
     *
     * @returns A promise resolved to `true` if the lock was succesful, otherwise `false`
     */
    tryLockFor(timeout: number): Promise<boolean>;
    /**
     * Attempts to acquire the lock, blocking until either
     * the lock is acquired or the specified point in time is reached.
     *
     * @param timestamp The absolute time in milliseconds.
     *
     * @throws {MutexError} If the mutex is already owned by the caller.
     *
     * @returns A promise resolved to `true` if the lock was succesful, otherwise `false`
     */
    tryLockUntil(timestamp: number): Promise<boolean>;
    /**
     * Releases the mutex if currently owned by the caller.
     *
     * @throws {MutexError} If the mutex is not owned by the caller.
     */
    unlock(): void;
}

/**
 * Represents a condition variable similar to those used in C++.
 *
 * A condition variable manages an atomic wait/block mechanism that
 * is tightly coupled with a mutex for safe cross-agent synchronization.
 *
 * @see {@link https://en.cppreference.com/w/cpp/thread/condition_variable | C++ Condition Variable}
 */
declare class ConditionVariable {
    /**
     * The shared atomic memory where the condition variable stores its state.
     */
    private _mem;
    /**
     * Creates a new instance of ConditionVariable.
     *
     * @param sharedBuffer The shared buffer that backs the condition variable.
     * @param byteOffset The byte offset within the shared buffer.
     *
     * Note: The value at the shared memory location should not be
     * modified outside of this condition variable.
     */
    constructor(sharedBuffer: SharedArrayBuffer, byteOffset?: number);
    /**
     * Gets the underlying atomic handle.
     */
    get handle(): Int32Array;
    /**
     * Wakes up all waiting workers that are blocked on this condition variable.
     *
     * @returns The number of workers that were woken up.
     */
    notifyAll(): number;
    /**
     * Wakes up one waiting worker that is blocked on this condition variable.
     *
     * @returns The number of workers that were woken up.
     */
    notifyOne(): number;
    /**
     * Blocks the current worker until this condition variable is notified,
     * or an optional timeout expires. The associated mutex is atomically
     * released before blocking and re-acquired after waking up.
     *
     * @param mutex The mutex that must be locked by the current thread.
     * @param timeout An optional timeout in milliseconds after which the wait is aborted.
     *
     * @throws {MutexError} If the mutex is not owned by the caller.
     * @throws {RangeError} If the condition variable's shared memory value is not expected.
     */
    wait(mutex: Mutex, timeout?: number): Promise<void>;
    /**
     * Blocks the current thread until this condition variable is notified,
     * or until a specified point in time is reached. This is a convenience
     * method for waiting within a deadline.
     *
     * @param mutex The mutex that must be locked by the current thread.
     * @param timestamp The absolute time (in milliseconds) at which to stop waiting.
     *
     * @throws {MutexError} If the mutex is not owned by the caller.
     * @throws {RangeError} If the condition variable's shared memory value is not expected.
     */
    waitUntil(mutex: Mutex, timestamp: number): Promise<void>;
}

/**
 * @privateRemarks
 * Citations:
 * 1. {@link https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2406.html | Alexander Terekhov, Howard Hinnant. (2007-09-09). Mutex, Lock, Condition Variable Rationale}
 */
declare class SharedMutex {
    private _gate1;
    private _gate2;
    private _isReader;
    private _isWriter;
    private _mutex;
    private _state;
    constructor(sharedBuffer: SharedArrayBuffer, byteOffset?: number);
    lock(): Promise<void>;
    request<T>(callbackfn: () => T | Promise<T>): Promise<T>;
    tryLock(): Promise<boolean>;
    unlock(): Promise<boolean>;
    lockShared(): Promise<void>;
    requestShared<T>(callbackfn: () => T | Promise<T>): Promise<T>;
    tryLockShared(): Promise<boolean>;
    unlockShared(): Promise<boolean>;
}

/**
 * Represents an error that occurs when a process exceeds a set timeout.
 */
declare class TimeoutError extends Error {
    /**
     * Duration in milliseconds after which the timeout error was thrown.
     * Can be `undefined` if not specified.
     */
    timeout?: number;
    /**
     * Absolute time in milliseconds after which the timeout error was thrown.
     * Can be `undefined` if not specified.
     */
    timestamp?: number;
    /**
     * Create a new `TimeoutError`.
     *
     * @param message - A custom error message. Defaults to `undefined`.
     * @param timeout - The timeout duration in milliseconds. Defaults to `undefined`.
     * @param timeout - The absolute time in milliseconds. Defaults to `undefined`.
     */
    constructor(message?: string, timeout?: number, timestamp?: number);
}

export { ConditionVariable, Mutex, SharedMutex, TimeoutError };
