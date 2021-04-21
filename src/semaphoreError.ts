/**
 * Indicates an error when a semaphore cannot be acquired.
 *
 * This can be encountered when:
 *    - A semaphore is cleared and all pending calls are rejected.
 *    - A semaphore could not be acquired within a given time limit.
 */
export class SemaphoreError extends Error {
    constructor(msg?: string) {
        super(msg || 'Unable to acquire semaphore');
    }
}
