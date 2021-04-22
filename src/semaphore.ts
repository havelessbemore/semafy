import { RawSemaphore } from './rawSemaphore';
import { SemaphoreError } from './semaphoreError';
import { SemaphoreLock } from './semaphoreLock';

/**
 * Defines the arguments to expect in a callback function passed to {@link Semaphore} methods.
 *
 * @param error - A {@link SemaphoreError} if the semaphore could not be acquired. Otherwise, this is `undefined`
 * @param lock - A {@link SemaphoreLock} to the {@link Semaphore} being acquired. If acquired, the lock will be locked. Otherwise, the lock will be unlocked.
 */
export interface SemaphoreCallback {
    (error: SemaphoreError | undefined, lock: SemaphoreLock): void;
}

export class Semaphore {
    /**
     * The underlying raw semaphore
     */
    protected semaphore: RawSemaphore;

    /**
     * Creates a semaphore object
     *
     * @param value - The max number of calls allowed to acquire the semaphore concurrently
     */
    constructor(value: number);
    /**
     * Creates a semaphore object
     *
     * @param semaphore - The underlying {@link RawSemaphore}
     */
    constructor(semaphore: RawSemaphore);
    constructor(input: number | RawSemaphore) {
        if (typeof input === 'number') {
            this.semaphore = new RawSemaphore(input);
        } else {
            this.semaphore = input;
        }
    }

    /**
     * Rejects all calls waiting for the semaphore. Rejected calls receive a {@link SemaphoreError}
     */
    clear(): void {
        this.semaphore.clear();
    }

    /**
     * Try to acquire the semaphore if immediately available.
     *
     * @returns {@link SemaphoreLock} and decrements the semaphore's {@link value} if the semaphore could be acquired.
     * Otherwise, returns `undefined`
     */
    tryWait(): SemaphoreLock | undefined {
        if (this.semaphore.tryWait()) {
            return new SemaphoreLock(this.semaphore);
        }
    }

    /**
     * The number of calls allowed to acquire the semaphore concurrently
     */
    get value(): number {
        return this.semaphore.value;
    }

    /**
     * Acquire (lock) the semaphore.
     *
     * If the semaphore's {@link value} is greater than zero, then the semaphore is acquired
     * and its {@link value} is decremented. Otherwise, the call blocks until the semaphore
     * can be acquired or the call is rejected.
     */
    wait(callback?: null): Promise<SemaphoreLock>;
    /**
     * Acquire (lock) the semaphore.
     *
     * If the semaphore's {@link value} is greater than zero, then the semaphore is acquired
     * and its {@link value} is decremented. Otherwise, the call blocks until the semaphore
     * can be acquired or the call is rejected.
     *
     * @param callback - A function to call once acquisition is successful or rejected
     */
    wait(callback: SemaphoreCallback): void;
    wait(callback?: SemaphoreCallback | null): void | Promise<SemaphoreLock> {
        // Sanitize inputs
        if (callback == null) {
            return new Promise((resolve, reject) => {
                this.wait((err, lock) => (err ? reject(err) : resolve(lock!)));
            });
        }

        // Add to semaphore
        this.semaphore.wait((error, sem) => {
            callback(error, new SemaphoreLock(sem, error == null));
        });
    }

    /**
     * Acquire (lock) the semaphore within a time limit.
     *
     * It's the same as {@link wait | wait()} except that there's a limit on the amount of time a call
     * can block to acquire the semaphore. If the timeout expires before the semaphore is
     * acquired, then the call is rejected.
     *
     * @param ms - The maximum time (in milliseconds) to wait to acquire the semaphore. Defaults to 0
     */
    waitFor(ms?: number | null, callback?: null): Promise<SemaphoreLock>;
    /**
     * Acquire (lock) the semaphore within a time limit.
     *
     * It's the same as {@link wait | wait()} except that there's a limit on the amount of time a call
     * can block to acquire the semaphore. If the timeout expires before the semaphore is
     * acquired, then the call is rejected.
     *
     * @param ms - The maximum time (in milliseconds) to wait to acquire the semaphore. Defaults to 0
     * @param callback - A function to call once acquisition is successful or rejected
     */
    waitFor(ms: number | null | undefined, callback: SemaphoreCallback): void;
    waitFor(ms?: number | null, callback?: SemaphoreCallback | null): void | Promise<SemaphoreLock> {
        // Sanitize inputs
        if (callback == null) {
            return new Promise((resolve, reject) => {
                this.waitFor(ms, (err, lock) => (err ? reject(err) : resolve(lock!)));
            });
        }

        // Add to semaphore
        this.semaphore.waitFor(ms, (error, sem) => {
            callback(error, new SemaphoreLock(sem, error == null));
        });
    }
}
