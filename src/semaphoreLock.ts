import { SemaphoreCallback } from './semaphore';
import { RawSemaphore } from './rawSemaphore';

/**
 * Represents a lock (acquisition) on a semaphore.
 *
 * Usage imposes the following restrictions:
 * 1. A semaphore must first be acquired (locked) before it can be released (unlocked)
 * 1. If locked, the lock can be unlocked once at most
 * 1. Once unlocked, the lock is exhausted. If needed, a new lock must be acquired via the semaphore
 */
export class SemaphoreLock {
    /**
     * Whether or not the semaphore is acquired
     */
    protected isAcquired: boolean;
    /**
     * The semaphore being locked
     */
    protected semaphore: RawSemaphore;

    /**
     *
     * @param semaphore - The semaphore being locked
     * @param isAcquired - Whether or not the semaphore is acquired
     */
    constructor(semaphore: RawSemaphore, isAcquired = true) {
        this.semaphore = semaphore;
        this.isAcquired = isAcquired;
    }

    /**
     * Check if locked
     */
    isLocked(): boolean {
        return this.isAcquired;
    }

    /**
     * If locked, then unlock
     */
    unlock(): void {
        if (this.isAcquired) {
            this.isAcquired = false;
            this.semaphore.post();
        }
    }
}
