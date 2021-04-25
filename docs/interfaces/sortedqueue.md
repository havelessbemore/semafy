[semafy - v1.0.6](../README.md) / SortedQueue

# Interface: SortedQueue<T\>

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

* [*Queue*](queue.md)<T\>

* *Sorted*<T\>

  ↳ **SortedQueue**

## Table of contents

### Properties

- [size](sortedqueue.md#size)

### Methods

- [[Symbol.iterator]](sortedqueue.md#[symbol.iterator])
- [clear](sortedqueue.md#clear)
- [comparator](sortedqueue.md#comparator)
- [dequeue](sortedqueue.md#dequeue)
- [enqueue](sortedqueue.md#enqueue)
- [peek](sortedqueue.md#peek)

## Properties

### size

• `Readonly` **size**: *number*

The number of elements in this queue

Inherited from: [Queue](queue.md).[size](queue.md#size)

Defined in: [src/structures/queue.ts:40](https://github.com/havelessbemore/semafy/blob/9e5af2a/src/structures/queue.ts#L40)

## Methods

### [Symbol.iterator]

▸ **[Symbol.iterator]**(): *Iterator*<T, any, undefined\>

**Returns:** *Iterator*<T, any, undefined\>

Inherited from: [Queue](queue.md)

Defined in: node_modules/typescript/lib/lib.es2015.iterable.d.ts:51

___

### clear

▸ **clear**(): *void*

Removes all elements from this queue

**Returns:** *void*

Inherited from: [Queue](queue.md)

Defined in: [src/structures/queue.ts:16](https://github.com/havelessbemore/semafy/blob/9e5af2a/src/structures/queue.ts#L16)

___

### comparator

▸ **comparator**(): *Comparator*<T\>

**Returns:** *Comparator*<T\>

Inherited from: Sorted.comparator

Defined in: [src/structures/compare.ts:34](https://github.com/havelessbemore/semafy/blob/9e5af2a/src/structures/compare.ts#L34)

___

### dequeue

▸ **dequeue**(): ``null`` \| T

Retrieves and removes the head of this queue

**Returns:** ``null`` \| T

The value at the head of the queue or `null` if this queue is empty.

Inherited from: [Queue](queue.md)

Defined in: [src/structures/queue.ts:22](https://github.com/havelessbemore/semafy/blob/9e5af2a/src/structures/queue.ts#L22)

___

### enqueue

▸ **enqueue**(`value`: T): *boolean*

Inserts the specified value into this queue

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | T | The element to be inserted |

**Returns:** *boolean*

`true` upon success, otherwise `false`

Inherited from: [Queue](queue.md)

Defined in: [src/structures/queue.ts:30](https://github.com/havelessbemore/semafy/blob/9e5af2a/src/structures/queue.ts#L30)

___

### peek

▸ **peek**(): ``null`` \| T

Retrieves, but does not remove, the head of this queue

**Returns:** ``null`` \| T

The value at the head of the queue or `null` if this queue is empty.

Inherited from: [Queue](queue.md)

Defined in: [src/structures/queue.ts:36](https://github.com/havelessbemore/semafy/blob/9e5af2a/src/structures/queue.ts#L36)
