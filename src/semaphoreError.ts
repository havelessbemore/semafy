export class SemaphoreError extends Error {
    constructor(msg?: string) {
        super(msg || 'Unable to acquire semaphore');
    }
}
