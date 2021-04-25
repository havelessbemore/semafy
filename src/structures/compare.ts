/**
 * @ignore
 */
export interface Comparable<T> {
    compareTo: ComparableFn<T>;
    comparator(): Comparator<T>;
}

/**
 * @ignore
 */
export interface ComparableFn<T> {
    (value: T): number;
}

/**
 * @ignore
 */
export interface Comparator<T> {
    compare: ComparatorFn<T>;
}

/**
 * @ignore
 */
export interface ComparatorFn<T> {
    (a: T, b: T): number;
}

/**
 * @ignore
 */
export interface Sorted<T> {
    comparator(): Comparator<T>;
}
