[semafy - v1.0.1](../README.md) / [Exports](../modules.md) / Queue

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

Defined in: [src/queue.ts:37](https://github.com/havelessbemore/semafy/blob/03d6228/src/queue.ts#L37)

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

Defined in: [src/queue.ts:13](https://github.com/havelessbemore/semafy/blob/03d6228/src/queue.ts#L13)

___

### dequeue

▸ **dequeue**(): ``null`` \| T

Retrieves and removes the head of this queue

**Returns:** ``null`` \| T

The value at the head of the queue or `null` if this queue is empty.

Defined in: [src/queue.ts:19](https://github.com/havelessbemore/semafy/blob/03d6228/src/queue.ts#L19)

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

Defined in: [src/queue.ts:27](https://github.com/havelessbemore/semafy/blob/03d6228/src/queue.ts#L27)

___

### peek

▸ **peek**(): ``null`` \| T

Retrieves, but does not remove, the head of this queue

**Returns:** ``null`` \| T

The value at the head of the queue or `null` if this queue is empty.

Defined in: [src/queue.ts:33](https://github.com/havelessbemore/semafy/blob/03d6228/src/queue.ts#L33)
