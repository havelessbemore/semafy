[semafy - v1.0.5](../README.md) / Queue

# Interface: Queue<T\>

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

* *Iterable*<T\>

  ↳ **Queue**

## Table of contents

### Properties

- [size](queue.md#size)

### Methods

- [[Symbol.iterator]](queue.md#[symbol.iterator])
- [clear](queue.md#clear)
- [dequeue](queue.md#dequeue)
- [enqueue](queue.md#enqueue)
- [peek](queue.md#peek)

## Properties

### size

• `Readonly` **size**: *number*

The number of elements in this queue

Defined in: [src/queue.ts:57](https://github.com/havelessbemore/semafy/blob/0d52aa3/src/queue.ts#L57)

## Methods

### [Symbol.iterator]

▸ **[Symbol.iterator]**(): *Iterator*<T, any, undefined\>

**Returns:** *Iterator*<T, any, undefined\>

Inherited from: Iterable.__@iterator

Defined in: node_modules/typescript/lib/lib.es2015.iterable.d.ts:51

___

### clear

▸ **clear**(): *void*

Removes all elements from this queue

**Returns:** *void*

Defined in: [src/queue.ts:33](https://github.com/havelessbemore/semafy/blob/0d52aa3/src/queue.ts#L33)

___

### dequeue

▸ **dequeue**(): ``null`` \| T

Retrieves and removes the head of this queue

**Returns:** ``null`` \| T

The value at the head of the queue or `null` if this queue is empty.

Defined in: [src/queue.ts:39](https://github.com/havelessbemore/semafy/blob/0d52aa3/src/queue.ts#L39)

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

Defined in: [src/queue.ts:47](https://github.com/havelessbemore/semafy/blob/0d52aa3/src/queue.ts#L47)

___

### peek

▸ **peek**(): ``null`` \| T

Retrieves, but does not remove, the head of this queue

**Returns:** ``null`` \| T

The value at the head of the queue or `null` if this queue is empty.

Defined in: [src/queue.ts:53](https://github.com/havelessbemore/semafy/blob/0d52aa3/src/queue.ts#L53)
