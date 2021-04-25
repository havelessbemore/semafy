import { Heap } from './heap';
import { Comparator, Sorted } from './compare';

/**
 * @ignore
 */
export interface LinkedNode<T> {
    next?: LinkedNode<T>;
    value: T;
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

export interface SortedQueue<T> extends Queue<T>, Sorted<T> {}

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
            next: () => {
                return this.size < 1
                    ? { done: true, value: null }
                    : { done: false, value: this.dequeue()! };
            },
        };
    }
}

/**
 * @ignore
 */
export class LinkedQueue<T> implements Queue<T> {
    protected length: number;
    protected tail?: LinkedNode<T>;

    constructor() {
        this.length = 0;
    }

    clear(): void {
        this.length = 0;
        this.tail = undefined;
    }

    dequeue(): T | null {
        if (this.tail == null) {
            return null;
        }

        const head = this.tail.next!;
        this.tail.next = head.next;
        if (--this.length < 1) {
            this.tail = undefined;
        }

        return head.value;
    }

    enqueue(value: T): boolean {
        const tail: LinkedNode<T> = { value };

        if (this.tail == null) {
            tail.next = tail;
        } else {
            tail.next = this.tail.next;
            this.tail.next = tail;
        }

        this.tail = tail;
        ++this.length;
        return true;
    }

    peek(): T | null {
        return this.tail == null ? null : this.tail.next!.value;
    }

    get size(): number {
        return this.length;
    }

    [Symbol.iterator](): Iterator<T> {
        return {
            next: () => {
                return this.size < 1
                    ? { done: true, value: null }
                    : { done: false, value: this.dequeue()! };
            },
        };
    }
}

/**
 * @ignore
 */
export class PriorityQueue<T> implements SortedQueue<T> {
    constructor(protected heap: Heap<T>) {}

    clear(): void {
        this.heap.clear();
    }

    comparator(): Comparator<T> {
        return this.heap.comparator();
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
            next: () => {
                return this.size < 1
                    ? { done: true, value: null }
                    : { done: false, value: this.dequeue()! };
            },
        };
    }
}
