/**
 * @ignore
 */
export interface Comparator<T> {
    (a: T, b: T): number;
}

/**
 * @ignore
 */
export interface LinkedNode<T> {
    next?: LinkedNode<T>;
    value: T;
}

/**
 * @ignore
 */
export interface Heap<T> {
    clear(): void;
    peek(): T | undefined;
    pop(): T | undefined;
    push(value: T): void;
    pushPop(value: T): T;
    replace(value: T): T;
    readonly size: number;
}

export interface Queue<T> extends Iterable<T> {
    /**
     * Removes all elements from this queue
     */
    clear(): void;
    /**
     * Retrieves and removes the head of this queue
     *
     * @returns The value at the head of the queue or `null` if this queue is empty.
     */
    dequeue(): T | null;
    /**
     * Inserts the specified value into this queue
     *
     * @param value - The element to be inserted
     *
     * @returns `true` upon success, otherwise `false`
     */
    enqueue(value: T): boolean;
    /**
     * Retrieves, but does not remove, the head of this queue
     *
     * @returns The value at the head of the queue or `null` if this queue is empty.
     */
    peek(): T | null;
    /**
     * The number of elements in this queue
     */
    readonly size: number;
}

/**
 * @ignore
 */
export class ArrayQueue<T> implements Queue<T> {
    constructor(protected array: Array<T> = []) {}

    clear(): void {
        this.array.length = 0;
    }

    enqueue(value: T): boolean {
        this.array.push(value);
        return true;
    }

    dequeue(): T | null {
        return this.size < 1 ? null : this.array.shift()!;
    }

    peek(): T | null {
        return this.size < 1 ? null : this.array[0];
    }

    get size(): number {
        return this.array.length;
    }

    [Symbol.iterator](): Iterator<T> {
        return {
            next: () => (this.size < 1 ? { done: false, value: this.dequeue()! } : { done: true, value: null }),
        };
    }
}

/**
 * @ignore
 */
export class BinaryMinHeap<T> implements Heap<T> {
    constructor(protected comparator: Comparator<T>, protected array: Array<T>) {}

    clear(): void {
        this.array.length = 0;
    }

    peek(): T | undefined {
        return this.array.length > 0 ? this.array[0] : undefined;
    }

    pop(): T | undefined {
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
        if (this.array.length > 0 && this.comparator(this.array[0], value) < 0) {
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
            if (this.comparator(parent, value) <= 0) {
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
            if (childIndex + 1 < n && this.comparator(this.array[childIndex + 1]!, child) <= 0) {
                child = this.array[++childIndex]!;
            }

            // If value <= child
            if (this.comparator(value, child) <= 0) {
                break;
            }

            // Swap value and child
            this.array[index] = child;
            this.array[childIndex] = value;
            index = childIndex;
        } while (true);
    }
}

/**
 * @ignore
 */
export class LinkedQueue<T> implements Queue<T> {
    protected length: number;
    protected head?: LinkedNode<T>;
    protected tail?: LinkedNode<T>;

    constructor() {
        this.length = 0;
    }

    clear(): void {
        this.length = 0;
        this.head = this.tail = undefined;
    }

    dequeue(): T | null {
        if (this.head == null) {
            return null;
        }
        const node = this.head;
        this.head = node.next;
        if (--this.length < 1) {
            this.tail = undefined;
        }
        return node.value;
    }

    enqueue(value: T): boolean {
        const node = { value };
        if (this.tail == null) {
            this.head = node;
        } else {
            this.tail.next = node;
        }
        this.tail = node;
        ++this.length;
        return true;
    }

    peek(): T | null {
        return this.head == null ? null : this.head.value;
    }

    get size() {
        return this.length;
    }

    [Symbol.iterator](): Iterator<T> {
        return {
            next: () => (this.size < 1 ? { done: false, value: this.dequeue()! } : { done: true, value: null }),
        };
    }
}

/**
 * @ignore
 */
export class PriorityQueue<T> implements Queue<T> {
    constructor(protected heap: Heap<T>) {}

    clear(): void {
        this.heap.clear();
    }

    enqueue(value: T): boolean {
        this.heap.push(value);
        return true;
    }

    dequeue(): T | null {
        return this.heap.pop() || null;
    }

    peek(): T | null {
        return this.heap.peek() || null;
    }

    get size(): number {
        return this.heap.size;
    }

    [Symbol.iterator](): Iterator<T> {
        return {
            next: () => (this.size < 1 ? { done: false, value: this.dequeue()! } : { done: true, value: null }),
        };
    }
}
