export interface LinkedNode<T> {
    next?: LinkedNode<T>;
    value: T;
}

export interface Queue<T> extends Iterable<T> {
    clear(): void;
    dequeue(): T | null;
    enqueue(val: T): boolean;
    peek(): T | null;
    readonly size: number;
}

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
