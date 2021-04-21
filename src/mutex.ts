import { Semaphore } from './semaphore';

/**
 * A convenience class for defining a binary {@link Semaphore} (aka `new Semaphore(1);`).
 *
 * Has the same methods as {@link Semaphore}
 */
export class Mutex extends Semaphore {
    constructor() {
        super(1);
    }
}
