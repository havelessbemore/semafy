import { RawSemaphore } from './rawSemaphore';
import { SemaphoreError } from './semaphoreError';

export interface SafeSemaphoreCallback {
    (error: SemaphoreError | undefined, lock: SemaphoreLock): void;
}

export class SemaphoreLock {
    constructor(protected semaphore: RawSemaphore, protected isEnabled: boolean = true) {}

    isLocked(): boolean {
        return this.isEnabled;
    }

    unlock() {
        if (this.isEnabled) {
            this.isEnabled = false;
            this.semaphore.post();
        }
    }
}

export class Semaphore {
    public semaphore: RawSemaphore;

    constructor(value: number);
    constructor(semaphore: RawSemaphore);
    constructor(input: number | RawSemaphore) {
        if (typeof input === 'number') {
            this.semaphore = new RawSemaphore(input);
        } else {
            this.semaphore = input;
        }
    }

    clear(): void {
        this.semaphore.clear();
    }

    tryWait(): SemaphoreLock | undefined {
        if (this.semaphore.tryWait()) {
            return new SemaphoreLock(this.semaphore);
        }
    }

    get value(): number {
        return this.semaphore.value;
    }

    wait(callback?: null): Promise<SemaphoreLock>;
    wait(callback: SafeSemaphoreCallback): void;
    wait(callback?: SafeSemaphoreCallback | null): void | Promise<SemaphoreLock> {
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

    waitFor(callback?: null, ms?: number | null): Promise<SemaphoreLock>;
    waitFor(callback: SafeSemaphoreCallback, ms?: number | null): void;
    waitFor(callback?: SafeSemaphoreCallback | null, ms?: number | null): void | Promise<SemaphoreLock> {
        // Sanitize inputs
        if (callback == null) {
            return new Promise((resolve, reject) => {
                this.waitFor((err, lock) => (err ? reject(err) : resolve(lock!)), ms);
            });
        }

        // Add to semaphore
        this.semaphore.waitFor((error, sem) => {
            callback(error, new SemaphoreLock(sem, error == null));
        }, ms);
    }
}
