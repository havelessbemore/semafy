import { RawSemaphore } from './rawSemaphore';

/**
 * Represents acquisition of a semaphore.
 *
 * Usage imposes the following restrictions:
 * 1. Only a call that has acquired the semaphore (aka decremented its value) can release it (aka increment its value)
 * 1. If acquired, a call can release the semaphore once at most
 */
export class SemaphoreLock {
    /**
     *
     * @param semaphore - The semaphore being locked
     * @param isEnabled - Whether or not the semaphore is acquired
     */
    constructor(protected semaphore: RawSemaphore, protected isEnabled: boolean = true) {}

    /**
     * Check if the {@link semaphore} is locked
     */
    isLocked(): boolean {
        return this.isEnabled;
    }

    /**
     * If locked, release the {@link semaphore} and increment its {@link Semaphore.value | value}
     */
    unlock() {
        if (this.isEnabled) {
            this.isEnabled = false;
            this.semaphore.post();
        }
    }
}
