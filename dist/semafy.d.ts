/**
 * The base interface for types that provide exclusive
 * blocking for agents (i.e. main thread, workers).
 */
interface BasicLockable {
    /**
     * Indicates whether the current agent owns the lock.
     */
    ownsLock: Readonly<boolean>;
    /**
     * Blocks until the lock can be acquired for the current agent.
     * If an exception is thrown, no lock is acquired.
     */
    lock(): Promise<void>;
    /**
     * Releases the lock held by the current agent.
     */
    unlock(): void | Promise<void>;
}

/**
 * Represents the possible status codes
 * returned by {@link ConditionVariable} operations.
 */
type CVStatus = typeof CV_OK | typeof CV_TIMED_OUT;
/**
 * The {@link ConditionVariable} was awakened via notification.
 */
declare const CV_OK = "ok";
/**
 * The {@link ConditionVariable} was awakened by timeout expiration.
 */
declare const CV_TIMED_OUT = "timed-out";

/**
 * Extends the {@link BasicLockable} interface to include attempted locking.
 */
interface Lockable extends BasicLockable {
    /**
     * Attempts to acquire the lock for the current agent
     * without blocking until acquired. If an exception
     * is thrown, no lock is obtained.
     *
     * @returns `true` if the lock was acquired, `false` otherwise.
     */
    tryLock(): boolean | Promise<boolean>;
}

/**
 * Provides shared blocking semantics for agents (i.e. main thread, workers).
 */
interface SharedLockable {
    /**
     * Indicates whether the current agent owns a shared lock.
     */
    ownsSharedLock: Readonly<boolean>;
    /**
     * Blocks until a shared lock can be acquired for the current
     * agent. If an exception is thrown, no lock is acquired.
     */
    lockShared(): Promise<void>;
    /**
     * Attempts to acquire a shared lock for the current agent
     * without blocking until acquired. If an exception
     * is thrown, no lock is obtained.
     *
     * @returns `true` if the lock was acquired, `false` otherwise.
     */
    tryLockShared(): boolean | Promise<boolean>;
    /**
     * Releases the shared lock held by the current agent.
     */
    unlockShared(): void | Promise<void>;
}

/**
 * Represents a shared resource that is backed by a {@link SharedArrayBuffer}.
 *
 * This resource can be shared across different execution contexts, such as
 * web workers or the main thread, enabling data sharing and manipulation.
 */
interface SharedResource {
    /**
     * The underlying {@link SharedArrayBuffer}
     * and primary storage for shared data.
     */
    buffer: Readonly<SharedArrayBuffer>;
    /**
     * The total length in bytes being used from the {@link SharedArrayBuffer}.
     */
    byteLength: Readonly<number>;
    /**
     * The byte offset within the {@link SharedArrayBuffer} where data begins.
     */
    byteOffset: Readonly<number>;
}

/**
 * Extends the {@link SharedLockable} interface to include timed blocking.
 */
interface SharedTimedLockable extends SharedLockable {
    /**
     * Blocks for the provided duration or until a lock is acquired.
     *
     * @returns `true` if the lock was acquired, `false` otherwise.
     */
    tryLockSharedFor(timeout: number): Promise<boolean>;
    /**
     * Blocks until the provided timestamp is reached or a lock is acquired.
     *
     * @returns `true` if the lock was acquired, `false` otherwise.
     */
    tryLockSharedUntil(timestamp: number): Promise<boolean>;
}

/**
 * Extends the {@link Lockable} interface to include timed blocking.
 */
interface TimedLockable extends Lockable {
    /**
     * Blocks for the provided duration or until a lock is acquired.
     *
     * @returns `true` if the lock was acquired, `false` otherwise.
     */
    tryLockFor(timeout: number): Promise<boolean>;
    /**
     * Blocks until the provided timestamp is reached or a lock is acquired.
     *
     * @returns `true` if the lock was acquired, `false` otherwise.
     */
    tryLockUntil(timestamp: number): Promise<boolean>;
}

/**
 * Represents a generic error originating from a lock.
 */
declare class LockError extends Error {
    /**
     * @param message - An optional custom error message.
     */
    constructor(message?: string);
}

/**
 * Represents an ownership error originating from a lock.
 */
declare class OwnershipError extends LockError {
    /**
     * @param message - An optional custom error message.
     */
    constructor(message?: string);
}

/**
 * Represents an error relocking a lock.
 */
declare class RelockError extends LockError {
    /**
     * @param message - An optional custom error message.
     */
    constructor(message?: string);
}

/**
 * Represents an error that occurs when a process exceeds a set time.
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
 * Behavior is undefined if:
 *    - The mutex is destroyed while being owned.
 *    - The agent is terminated while owning the mutex.
 *    - The mutex's shared memory location is modified externally.
 *
 * @privateRemarks
 * 1. {@link https://en.cppreference.com/w/cpp/thread/mutex | C++ std::mutex}
 */
declare class Mutex implements Lockable, SharedResource {
    /**
     * Indicates whether the current agent owns the lock.
     */
    protected _isOwner: boolean;
    /**
     * The shared memory for the mutex.
     */
    protected _mem: Int32Array;
    constructor();
    /**
     * @param sharedBuffer The {@link SharedArrayBuffer} that backs the mutex.
     * @param byteOffset The byte offset within `sharedBuffer`. Defaults to `0`.
     */
    constructor(sharedBuffer: SharedArrayBuffer, byteOffset?: number);
    get buffer(): SharedArrayBuffer;
    get byteLength(): number;
    get byteOffset(): number;
    get ownsLock(): boolean;
    /**
     * @throws A {@link RelockError} If the lock is already locked by the caller.
     */
    lock(): Promise<void>;
    tryLock(): boolean;
    /**
     * @throws An {@link OwnershipError} If the mutex is not owned by the caller.
     */
    unlock(): void;
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
 * Behavior is undefined if:
 *    - The mutex is destroyed while being owned.
 *    - The agent is terminated while owning the mutex.
 *    - The mutex's shared memory location is modified externally.
 *
 * @privateRemarks
 * 1. {@link https://en.cppreference.com/w/cpp/thread/recursive_mutex | C++ std::recursive_mutex}
 */
declare class RecursiveMutex implements Lockable, SharedResource {
    /**
     * The number of locks acquired by the agent.
     */
    protected _depth: number;
    /**
     * The shared atomic memory for the mutex.
     */
    protected _mem: Int32Array;
    /**
     * The maximum levels of recursive ownership.
     */
    static readonly MAX: number;
    constructor();
    /**
     * @param sharedBuffer The {@link SharedArrayBuffer} that backs the mutex.
     * @param byteOffset The byte offset within `sharedBuffer`. Defaults to `0`.
     */
    constructor(sharedBuffer: SharedArrayBuffer, byteOffset?: number);
    get buffer(): SharedArrayBuffer;
    get byteLength(): number;
    get byteOffset(): number;
    get ownsLock(): boolean;
    /**
     * @throws A {@link RangeError} If the mutex is already locked the maximum amount of times.
     */
    lock(): Promise<void>;
    tryLock(): boolean;
    /**
     * @throws A {@link OwnershipError} If the mutex is not owned by the caller.
     */
    unlock(): void;
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
 * Behavior is undefined if:
 *    - The mutex is destroyed while being owned.
 *    - The agent is terminated while owning the mutex.
 *    - The mutex's shared memory location is modified externally.
 *
 * Timeout precision for time-based methods may vary due to system load
 * and inherent limitations of JavaScript timing. Developers should
 * consider this possible variability in their applications.
 *
 * @privateRemarks
 * 1. {@link https://en.cppreference.com/w/cpp/thread/recursive_mutex | C++ std::recursive_mutex}
 */
declare class RecursiveTimedMutex extends RecursiveMutex implements TimedLockable {
    tryLockFor(timeout: number): Promise<boolean>;
    tryLockUntil(timestamp: number): Promise<boolean>;
}

/**
 * A condition variable manages an atomic wait/block mechanism that
 * is tightly coupled with a mutex for safe cross-agent synchronization.
 *
 * Behavior is undefined if:
 *    - The shared memory location is modified externally.
 *
 * @privateRemarks
 * 1. {@link https://en.cppreference.com/w/cpp/thread/condition_variable | C++ std::condition_variable}
 * 1. {@link https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2406.html | Alexander Terekhov, Howard Hinnant. (2007-09-09). Mutex, Lock, Condition Variable Rationale}
 */
declare class ConditionVariable implements SharedResource {
    /**
     * The shared atomic memory where the condition variable stores its state.
     */
    private _mem;
    constructor();
    /**
     * @param sharedBuffer The {@link SharedArrayBuffer} that backs the condition variable.
     * @param byteOffset The byte offset within `sharedBuffer`. Defaults to `0`.
     */
    constructor(sharedBuffer: SharedArrayBuffer, byteOffset?: number);
    get buffer(): SharedArrayBuffer;
    get byteLength(): number;
    get byteOffset(): number;
    /**
     * Notify waiting agents that are blocked on this condition variable.
     *
     * @param count - The number of agents to notify.
     *
     * @returns The number of agents that were notified.
     */
    notify(count: number): number;
    /**
     * Notify all waiting agents that are blocked on this condition variable.
     *
     * @returns The number of agents that were notified.
     */
    notifyAll(): number;
    /**
     * Notify one waiting agent that is blocked on this condition variable.
     *
     * @returns The number of agents that were notified.
     */
    notifyOne(): number;
    /**
     * Blocks the current agent until this condition variable is notified.
     * The associated mutex is released before blocking and re-acquired
     * after waking up.
     *
     * @param mutex The mutex that must be locked by the current agent.
     *
     * @throws An {@link OwnershipError} If the mutex is not owned by the caller.
     * @throws A {@link RangeError} If the shared memory data is unexpected.
     */
    wait(mutex: BasicLockable): Promise<void>;
    /**
     * Blocks the current agent until this condition variable is notified,
     * or an optional timeout expires. The associated mutex is released
     * before blocking and re-acquired after waking up.
     *
     * @param mutex The mutex that must be locked by the current agent.
     * @param timeout A timeout in milliseconds after which the wait is aborted.
     *
     * @throws An {@link OwnershipError} If the mutex is not owned by the caller.
     * @throws A {@link RangeError} If the shared memory data is unexpected.
     *
     * @returns A {@link CVStatus} representing the result of the operation.
     */
    waitFor(mutex: BasicLockable, timeout: number): Promise<CVStatus>;
    /**
     * Blocks the current agent until this condition variable is notified,
     * or until a specified point in time is reached. The associated mutex
     * is released before blocking and re-acquired after waking up.
     *
     * @param mutex The mutex that must be locked by the current agent.
     * @param timestamp The absolute time in milliseconds at which the wait is aborted.
     *
     * @throws A {@link OwnershipError} If the mutex is not owned by the caller.
     * @throws A {@link RangeError} If the shared memory data is unexpected.
     *
     * @returns A {@link CVStatus} representing the result of the operation.
     */
    waitUntil(mutex: BasicLockable, timestamp: number): Promise<CVStatus>;
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
 * Behavior is undefined if:
 *    - The mutex is destroyed while being owned.
 *    - The agent is terminated while owning the mutex.
 *    - The mutex's shared memory location is modified externally.
 *
 * @privateRemarks
 * 1. {@link https://en.cppreference.com/w/cpp/thread/shared_mutex | C++ std::shared_mutex}
 * 1. {@link https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2406.html | Alexander Terekhov, Howard Hinnant. (2007-09-09). Mutex, Lock, Condition Variable Rationale}
 */
declare class SharedMutex implements Lockable, SharedLockable, SharedResource {
    protected _gate1: ConditionVariable;
    protected _gate2: ConditionVariable;
    protected _isReader: boolean;
    protected _isWriter: boolean;
    protected _mem: Int32Array;
    protected _mutex: Mutex;
    constructor();
    /**
     * @param sharedBuffer The shared buffer that backs the mutex.
     * @param byteOffset The byte offset within the shared buffer. Defaults to `0`.
     */
    constructor(sharedBuffer: SharedArrayBuffer, byteOffset?: number);
    get buffer(): SharedArrayBuffer;
    get byteLength(): number;
    get byteOffset(): number;
    get ownsLock(): boolean;
    get ownsSharedLock(): boolean;
    /**
     * @throws A {@link RelockError} If the mutex is already locked by the caller.
     */
    lock(): Promise<void>;
    tryLock(): Promise<boolean>;
    /**
     * @throws A {@link OwnershipError} If the mutex is not owned by the caller.
     */
    unlock(): Promise<void>;
    /**
     * @throws A {@link RelockError} If the lock is already locked by the caller.
     */
    lockShared(): Promise<void>;
    tryLockShared(): Promise<boolean>;
    /**
     * @throws An {@link OwnershipError} If the mutex is not owned by the caller.
     */
    unlockShared(): Promise<void>;
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
 * Behavior is undefined if:
 *    - The mutex is destroyed while being owned.
 *    - The agent is terminated while owning the mutex.
 *    - The mutex's shared memory location is modified externally.
 *
 * Timeout precision for time-based methods may vary due to system load
 * and inherent limitations of JavaScript timing. Developers should
 * consider this possible variability in their applications.
 *
 * @privateRemarks
 * 1. {@link https://en.cppreference.com/w/cpp/thread/unique_lock | C++ std::unique_lock}
 */
declare class TimedMutex extends Mutex implements TimedLockable {
    tryLockFor(timeout: number): Promise<boolean>;
    tryLockUntil(timestamp: number): Promise<boolean>;
}

/**
 * Acquires the mutex and executes the provided callback, automatically
 * unlocking afterwards. Blocks until the lock is available.
 *
 * @param mutex The mutex to acquire.
 * @param callbackfn The callback function.
 *
 * @returns A promise resolved to the return value of `callbackfn`.
 */
declare function lockGuard<T>(mutex: BasicLockable, callbackfn: () => T | Promise<T>): Promise<T>;

/**
 * A shared mutex wrapper.
 *
 * Locking a SharedLock locks the associated shared mutex in shared mode.
 *
 * If the shared mutex implements {@link SharedTimedLockable}, then SharedLock
 * will also implement it. Otherwise, attempts to use timed methods
 * (`tryLockFor`, `tryLockUntil`) will result in errors.
 */
declare class SharedLock implements TimedLockable {
    /**
     * The associated mutex.
     */
    protected _mutex: SharedLockable;
    /**
     * @param mutex - The shared mutex to associate.
     */
    constructor(mutex: SharedLockable);
    /**
     * The associated mutex.
     */
    get mutex(): SharedLockable;
    get ownsLock(): boolean;
    lock(): Promise<void>;
    tryLock(): boolean | Promise<boolean>;
    tryLockFor(timeout: number): Promise<boolean>;
    tryLockUntil(timestamp: number): Promise<boolean>;
    unlock(): void | Promise<void>;
}

/**
 * A counting semaphore based on shared memory and atomics, allowing for
 * cross-agent synchronization.
 *
 * @privateRemarks
 * 1. {@link https://en.cppreference.com/w/cpp/thread/counting_semaphore | C++ std::counting_semaphore}
 */
declare class CountingSemaphore implements SharedResource {
    private _gate;
    private _mem;
    private _mutex;
    /**
     * The maximum possible value of the internal counter
     */
    static readonly MAX: number;
    constructor();
    /**
     * @param sharedBuffer The shared buffer that backs the semaphore.
     * @param byteOffset The byte offset within the shared buffer. Defaults to `0`.
     */
    constructor(sharedBuffer: SharedArrayBuffer, byteOffset?: number);
    get buffer(): SharedArrayBuffer;
    get byteLength(): number;
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

export { type BasicLockable, type CVStatus, CV_OK, CV_TIMED_OUT, ConditionVariable, CountingSemaphore, LockError, type Lockable, Mutex, OwnershipError, RecursiveMutex, RecursiveTimedMutex, RelockError, SharedLock, type SharedLockable, SharedMutex, type SharedResource, type SharedTimedLockable, type TimedLockable, TimedMutex, TimeoutError, lockGuard };
