import { LinkedQueue, Queue } from './queue';
import { SemaphoreError } from './semaphoreError';

export interface RawSemaphoreCallback {
    (error: SemaphoreError | undefined, semaphore: RawSemaphore): void;
}

export class RawSemaphore {
    constructor(public value: number, public queue: Queue<RawSemaphoreCallback> = new LinkedQueue()) {}

    clear(): void {
        for (const callback of this.queue) {
            callback(new SemaphoreError(), this);
        }
    }

    post(): void {
        ++this.value;
        this.update();
    }

    tryWait(): boolean {
        if (this.value < 1) {
            return false;
        }
        --this.value;
        return true;
    }

    wait(callback?: null): Promise<RawSemaphore>;
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

    waitFor(callback?: null, ms?: number | null): Promise<RawSemaphore>;
    waitFor(callback: RawSemaphoreCallback, ms?: number | null): void;
    waitFor(callback?: RawSemaphoreCallback | null, ms?: number | null): void | Promise<RawSemaphore> {
        // Sanitize inputs
        if (callback == null) {
            return new Promise((resolve, reject) => {
                this.waitFor((err, sem) => (err ? reject(err) : resolve(sem)), ms);
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

    protected update(): void {
        if (this.value > 0 && this.queue.size > 0) {
            --this.value;
            this.queue.dequeue()!(undefined, this);
        }
    }
}
