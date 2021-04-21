import { LinkedQueue, Queue } from './queue';
import { SemaphoreError } from './semaphoreError';

/**
 * Defines the arguments to expect in a callback function passed to {@link RawSemaphore} methods.
 *
 * @param error - A {@link SemaphoreError} if the semaphore could not be acquired. Otherwise, this is `undefined`
 * @param semaphore - The semaphore being acquired
 */
export interface RawSemaphoreCallback {
    (error: SemaphoreError | undefined, semaphore: RawSemaphore): void;
}

/**
 * Related to an [unnamed POSIX semaphore](https://man7.org/linux/man-pages/man7/sem_overview.7.html)
 */
export class RawSemaphore {
    /**
     * The underlying queue to keep track of pending calls
     */
    public queue: Queue<RawSemaphoreCallback>;
    /**
     * The number of calls allowed to acquire the semaphore concurrently
     */
    public value: number;

    /**
     * @param value - The initial number of calls allowed to acquire the semaphore concurrently
     * @param queue - The underlying queue to keep track of pending calls
     */
    constructor(value: number, queue: Queue<RawSemaphoreCallback> = new LinkedQueue()) {
        this.value = value;
        this.queue = queue;
    }

    /**
     * Rejects all calls waiting for the semaphore. Rejected calls receive a {@link SemaphoreError}
     */
    clear(): void {
        for (const callback of this.queue) {
            callback(new SemaphoreError(), this);
        }
    }

    /**
     * Increment the semaphore's {@link value} by 1
     */
    post(): void {
        ++this.value;
        this.update();
    }

    /**
     * Try to acquire the semaphore if immediately available.
     *
     * @returns `true` and decrements the semaphore's {@link value} if the semaphore could be acquired.
     *
     * Otherwise, returns `false`
     */
    tryWait(): boolean {
        if (this.value < 1) {
            return false;
        }
        --this.value;
        return true;
    }

    /**
     * Acquire (lock) the semaphore.
     *
     * If the semaphore's {@link value} is greater than zero, then the semaphore is acquired
     * and its {@link value} is decremented. Otherwise, the call blocks until the semaphore
     * can be acquired or the call is rejected.
     */
    wait(callback?: null): Promise<RawSemaphore>;
    /**
     * Acquire (lock) the semaphore.
     *
     * If the semaphore's {@link value} is greater than zero, then the semaphore is acquired
     * and its {@link value} is decremented. Otherwise, the call blocks until the semaphore
     * can be acquired or the call is rejected.
     *
     * @param callback - A function to call acquisition is successful or rejected
     */
    wait(callback: RawSemaphoreCallback): void;
    wait(callback?: RawSemaphoreCallback | null): void | Promise<RawSemaphore> {
        // Sanitize inputs
        if (callback == null) {
            return new Promise((resolve, reject) => {
                this.wait((err, sem) => (err ? reject(err) : resolve(sem)));
            });
        }

        // Add to queue
        this.queue.enqueue(callback);
        this.update();
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
    waitFor(ms?: number | null, callback?: null): Promise<RawSemaphore>;
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
    waitFor(ms: number | null | undefined, callback: RawSemaphoreCallback): void;
    waitFor(ms?: number | null, callback?: RawSemaphoreCallback | null): void | Promise<RawSemaphore> {
        // Sanitize inputs
        if (callback == null) {
            return new Promise((resolve, reject) => {
                this.waitFor(ms, (err, sem) => (err ? reject(err) : resolve(sem)));
            });
        }
        ms = ms == null ? 0 : ms;

        // Setup timeout
        let handle: NodeJS.Timeout | undefined;
        const handler: RawSemaphoreCallback = (error, semaphore) => {
            if (handle !== undefined) {
                clearTimeout(handle);
                handle = undefined;
                callback(error, semaphore);
            }
        };
        handle = setTimeout(() => handler(new SemaphoreError(), this), ms);

        // Add to queue
        this.queue.enqueue(handler);
        this.update();
    }

    /**
     * @ignore
     */
    protected update(): void {
        if (this.value > 0 && this.queue.size > 0) {
            --this.value;
            this.queue.dequeue()!(undefined, this);
        }
    }
}
