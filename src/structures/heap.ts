import { Comparator, Sorted } from './compare';

/**
 * @ignore
 */
export interface Heap<T> extends Iterable<T>, Sorted<T> {
    clear(): void;
    comparator(): Comparator<T>;
    peek(): T | undefined;
    pop(): T | undefined;
    push(value: T): void;
    pushPop(value: T): T;
    replace(value: T): T;
    readonly size: number;
}

/**
 * @ignore
 */
export class BinaryMinHeap<T> implements Heap<T> {
    protected _comparator: Comparator<T>;

    constructor(comparator: Comparator<T>, protected array: Array<T> = []) {
        this._comparator = comparator;
    }

    clear(): void {
        this.array.length = 0;
    }

    comparator(): Comparator<T> {
        return this._comparator;
    }

    peek(): T | undefined {
        return this.array.length > 0 ? this.array[0] : undefined;
    }

    pop(): T | undefined {
        if (this.array.length < 1) {
            return undefined;
        }

        // Get the root and the last value
        const value = this.array[0];
        const last = this.array.pop();

        // If value != last
        if (this.array.length > 0) {
            // Add the last value to
            // the root and update the heap
            this.array[0] = last!;
            this.sinkDown(0);
        }

        return value;
    }

    push(value: T): void {
        // Add new value to the end of the heap
        this.array.push(value);

        // Update the heap
        this.bubbleUp(this.array.length - 1);
    }

    // Push a new value to the heap and then pop the root
    pushPop(value: T): T {
        // If not empty and root < value
        if (this.array.length > 0 && this._comparator.compare(this.array[0], value) < 0) {
            // Swap the root and value
            const root = this.array[0];
            this.array[0] = value;
            value = root;

            // Update the heap
            this.sinkDown(0);
        }
        return value;
    }

    // Pop the root of the heap and then push a new value
    replace(value: T): T {
        // If not empty
        if (this.array.length > 0) {
            // Swap the root with value
            const root = this.array[0];
            this.array[0] = value;
            value = root;

            // Update the heap
            this.sinkDown(0);
        }

        return value;
    }

    get size(): number {
        return this.array.length;
    }

    protected bubbleUp(index: number): void {
        const value = this.array[index];

        // Until we reach the top of the heap
        while (index > 0) {
            // Get the parent
            const parentIndex = Math.floor((index + 1) / 2) - 1;
            const parent = this.array[parentIndex]!;

            // If the parent <= value, the heap is in order
            if (this._comparator.compare(parent, value) <= 0) {
                break;
            }

            // Swap the parent with value and continue
            this.array[parentIndex] = value;
            this.array[index] = parent;
            index = parentIndex;
        }
    }

    protected sinkDown(index: number): void {
        const n = this.array.length;
        const value = this.array[index];

        do {
            // Compute the left child's index
            let childIndex = 2 * index + 1;

            // If no children exist
            if (childIndex >= n) {
                break;
            }

            // Decide which child to compare with
            let child = this.array[childIndex];
            if (
                childIndex + 1 < n &&
                this._comparator.compare(this.array[childIndex + 1]!, child) <= 0
            ) {
                child = this.array[++childIndex]!;
            }

            // If value <= child
            if (this._comparator.compare(value, child) <= 0) {
                break;
            }

            // Swap value and child
            this.array[index] = child;
            this.array[childIndex] = value;
            index = childIndex;
        } while (true);
    }

    [Symbol.iterator](): Iterator<T> {
        return {
            next: () => {
                return this.size < 1
                    ? { done: true, value: null }
                    : { done: false, value: this.pop()! };
            },
        };
    }
}

/**
 * @ignore
 */
export class BinaryMaxHeap<T> extends BinaryMinHeap<T> {
    constructor(comparator: Comparator<T>, array: Array<T>) {
        comparator = { compare: (a, b) => comparator.compare(b, a) };
        super(comparator, array);
    }
}
