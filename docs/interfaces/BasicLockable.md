[**semafy**](../README.md)

***

[semafy](../globals.md) / BasicLockable

# Interface: BasicLockable

Defined in: [src/types/basicLockable.ts:5](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/types/basicLockable.ts#L5)

The base interface for types that provide exclusive
blocking for agents (i.e. main thread, workers).

## Extended by

- [`Lockable`](Lockable.md)

## Properties

### ownsLock

> **ownsLock**: `Readonly`\<`boolean`\>

Defined in: [src/types/basicLockable.ts:9](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/types/basicLockable.ts#L9)

Indicates whether the current agent owns the lock.

## Methods

### lock()

> **lock**(): `Promise`\<`void`\>

Defined in: [src/types/basicLockable.ts:15](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/types/basicLockable.ts#L15)

Blocks until the lock can be acquired for the current agent.
If an exception is thrown, no lock is acquired.

#### Returns

`Promise`\<`void`\>

***

### unlock()

> **unlock**(): `void` \| `Promise`\<`void`\>

Defined in: [src/types/basicLockable.ts:20](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/types/basicLockable.ts#L20)

Releases the lock held by the current agent.

#### Returns

`void` \| `Promise`\<`void`\>
